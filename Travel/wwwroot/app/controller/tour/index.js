var TourController = function () {
    var imageManagement = new ImageManagement();
    this.initialize = function () {
        loadCategories();
        loadDiemDi();
        loadDiemDen();
        loadData();
        registerEvents();
        registerControls();
        imageManagement.initialize();
    }

    function registerEvents() {
        //Init validation
        $('#frmMaintainance').validate({
            errorClass: 'red',
            ignore: [],
            lang: 'vi',
            rules: {
                txtNameM: { required: true },
                ddlCategoryIdM: { required: true },
                txtPriceM: {
                    required: true,
                    number: true
                },
                txtImageM: {
                    required: true
                },
                txtUnitM: {
                    required: true
                }
            }
        });
        //todo: binding events to controls
        $('#ddlShowPage').on('change', function () {
            travel.configs.pageSize = $(this).val();
            travel.configs.pageIndex = 1;
            loadData(true);
        });

        $('#ddlCategorySearch').on('change', function () {
            travel.notify('Tải xong dữ liệu...', 'success');
            loadData();
        });

        $('#btnSearch').on('click', function () {
            loadData();
        });

        $('#txtKeyword').on('keypress', function (e) {
            if (e.which === 13) {
                loadData();
            }
        });

        $('#txtKeyword').on('change', function () {
            loadData();
        });

        $("#btnCreate").on('click', function () {
            resetFormMaintainance();
            initTreeDropDownCategory();
            loadDiemDi();
            loadDiemDen();
            $('#modal-add-edit').modal('show');
        });

        $('body').on('click', '.btn-edit', function (e) {
            e.preventDefault();
            var that = $(this).data('id');
            $.ajax({
                type: "GET",
                url: "/Admin/Tour/GetById",
                data: { id: that },
                dataType: "json",
                beforeSend: function () {
                    travel.startLoading();
                },
                success: function (response) {
                    var data = response;
                    $('#hidDateCreatedM').val(data.DateCreated);
                    $('#hidViewCountM').val(data.ViewCount);
                    $('#hidLikeM').val(data.Like);
                    $('#hidIdM').val(data.Id);
                    $('#txtNameM').val(data.Name);
                    initTreeDropDownCategory(data.CategoryId);
                    if (data.TourPlace != null) {
                        initTreeDropDownPlace(data.TourPlace.Depart, data.TourPlace.Destination);
                    }
                    else {
                        initTreeDropDownPlace('');
                    }
                    $('#txtDescM').val(data.Description);
                    $('#txtUnitM').val(data.Unit);

                    $('#txtPriceM').val(data.Price);
                    $('#txtOriginalPriceM').val(data.OriginalPrice);
                    $('#txtPromotionPriceM').val(data.PromotionPrice);

                    $('#txtImageM').val(data.Image);
                    document.getElementById("imageShowM").src = data.Image;
                    document.getElementById("imageShowM").style.visibility = "visible";

                    
                    $('#txtCodeM').val(data.Code);

                    document.getElementById('txtDepartureM').value = travel.dateTimeFormatInputDate(data.Departure);


                    $('#txtDurationM').val(data.Duration);
                    $('#txtSeatM').val(data.Seat);
                    $('#txtSeatAvailabilityM').val(data.SeatAvailability);

                    $('#txtTagM').val(data.Tags);
                    $('#txtMetakeywordM').val(data.SeoKeywords);
                    $('#txtMetaDescriptionM').val(data.SeoDescription);
                    $('#txtSeoPageTitleM').val(data.SeoPageTitle);
                    $('#txtSeoAliasM').val(data.SeoAlias);

                    CKEDITOR.instances.txtContentM.setData(data.Content);

                    if (data.Status == 0)
                        $('#ckStatusM').prop('checked', true);
                    else
                        $('#ckStatusM').prop('checked', false);

                    if (data.HotFlag == 0)
                        $('#ckHotM').prop('checked', true);
                    else
                        $('#ckHotM').prop('checked', false);

                    if (data.HomeFlag == 0)
                        $('#ckShowHomeM').prop('checked', true);
                    else
                        $('#ckShowHomeM').prop('checked', false);

                    $('#modal-add-edit').modal('show');
                    travel.stopLoading();
                },
                error: function (status) {
                    travel.notify('Có lỗi xảy ra', 'error');
                    travel.stopLoading();
                }
            });
        });

        $('body').on('click', '.btn-delete', function (e) {
            e.preventDefault();
            var that = $(this).data('id');
            travel.confirm('Xác nhận xóa?', function () {
                $.ajax({
                    type: "POST",
                    url: "/Admin/Tour/DeleteAsync",
                    data: { id: that },
                    dataType: "json",
                    beforeSend: function () {
                        travel.startLoading();
                    },
                    success: function (response) {
                        travel.notify('Xóa thành công', 'success');
                        travel.stopLoading();
                        loadData();
                    },
                    error: function (status) {
                        travel.notify('Lỗi xóa!', 'error');
                        travel.notify('Vui lòng kiễm tra trong hóa đơn, nếu cần ẩn có thể thay đổi trạng thái tour', 'error');
                        console.log(status);
                        travel.stopLoading();
                    }
                });
            });
        });

        $('body').on('click', '.btn-status', function (e) {
            e.preventDefault();
            var that = $(this).data('id');
            travel.confirm('Đổi trang thái tour?', function () {
                $.ajax({
                    type: "POST",
                    url: "/Admin/Tour/ChangStatusAsync",
                    data: { id: that },
                    dataType: "json",
                    beforeSend: function () {
                        travel.startLoading();
                    },
                    success: function (response) {
                        travel.notify('Thay đổi thành công', 'success');
                        loadData();
                        travel.stopLoading();
                    },
                    error: function (status) {
                        travel.notify('Lỗi!', 'error');
                        loadData();
                        travel.stopLoading();
                    }
                });
            });
        });

        $('#btnSave').on('click', function (e) {
            if ($('#frmMaintainance').valid()) {
                e.preventDefault();
                var id = $('#hidIdM').val();
                var name = $('#txtNameM').val();
                var categoryId = $('#ddlCategoryIdM').combotree('getValue');

                var description = $('#txtDescM').val();

                var price = $('#txtPriceM').val();
                var originalPrice = $('#txtOriginalPriceM').val();
                var promotionPrice = $('#txtPromotionPriceM').val();

                var image = $('#txtImageM').val();

                var depart = $('#txtDepartM').combotree('getValue'); 
                var destination = $('#txtDestinationM').combotree('getValue');

                var code = $('#txtCodeM').val();

                var departure = $('#txtDepartureM').val();
                var duration = $('#txtDurationM').val();
                var seat = $('#txtSeatM').val();
                var seatAvailability = $('#txtSeatAvailabilityM').val();                

                var tags = $('#txtTagM').val();
                var seoKeyword = $('#txtMetakeywordM').val();
                var seoMetaDescription = $('#txtMetaDescriptionM').val();
                var seoPageTitle = $('#txtSeoPageTitleM').val();
                var seoAlias = $('#txtSeoAliasM').val();

                var content = CKEDITOR.instances.txtContentM.getData();
                var status = $('#ckStatusM').prop('checked') == true ? 0 : 1;
                var hot = $('#ckHotM').prop('checked');
                var showHome = $('#ckShowHomeM').prop('checked');
                var dateCreated = $('#hidDateCreatedM').val();
                var view =  $('#hidViewCountM').val();
                var like = $('#hidLikeM').val();
                $.ajax({
                    type: "POST",
                    url: "/Admin/Tour/SaveEntity",
                    data: {
                        Id: id,
                        Name: name,
                        Code: code,
                        CategoryId: categoryId,
                        Image: image,
                        Depart: depart,
                        Destination: destination,
                        Departure: departure,
                        Duration: duration,
                        Seat: seat,
                        SeatAvailability: seatAvailability,
                        Price: price,
                        OriginalPrice: originalPrice,
                        PromotionPrice: promotionPrice,
                        Description: description,
                        Content: content,
                        HomeFlag: showHome,
                        HotFlag: hot,
                        Tags: tags,
                        Status: status,
                        SeoPageTitle: seoPageTitle,
                        SeoAlias: seoAlias,
                        SeoKeywords: seoKeyword,
                        SeoDescription: seoMetaDescription,
                        DateCreated: dateCreated,
                        Like: like,
                        ViewCount: view
                    },
                    dataType: "json",
                    beforeSend: function () {
                        travel.startLoading();
                    },
                    success: function (response) {
                        travel.notify('Thành công', 'success');
                        $('#modal-add-edit').modal('hide');
                        resetFormMaintainance();

                        travel.stopLoading();
                        loadData(true);
                    },
                    error: function (response) {
                        travel.notify('Có lỗi khi cập nhật!', 'error');
                        console.log(response);
                        travel.stopLoading();
                    }
                });
                return false;
            }
        });

        //Import via Excel
        $('#btn-import').on('click', function () {
            initTreeDropDownCategory();
            $('#modal-import-excel').modal('show');
        });
        //Upload Image
        $('#btnSelectImg').on('click', function () {
            $('#fileInputImage').click();
        });

        $("#fileInputImage").on('change', function () {
            var fileUpload = $(this).get(0);
            var filePath = fileUpload.value;
            var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.tiff|\.bmp)$/i;
            if (!allowedExtensions.exec(filePath)) {
                travel.notify('Hãy chọn file hình .jpeg/.jpg/.png/.gif/.tiff/.bmp .', 'error')
                fileInput.value = '';
                return false;
            } else {
                var files = fileUpload.files;
                var data = new FormData();
                for (var i = 0; i < files.length; i++) {
                    data.append(files[i].name, files[i]);
                }
                $.ajax({
                    type: "POST",
                    url: "/Admin/Upload/UploadImage",
                    contentType: false,
                    processData: false,
                    data: data,
                    success: function (path) {
                        $('#txtImageM').val(path);
                        document.getElementById("imageShowM").style.visibility = "visible";
                        document.getElementById("imageShowM").src = path;
                        travel.notify('Upload hình thành công!', 'success');
                    },
                    error: function () {
                        travel.notify('Có lỗi khi upload hình ảnh!', 'error');
                    }
                });
            }
        });

        $('#btnImportExcel').on('click', function () {
            var fileUpload = $("#fileInputExcel").get(0);
            var allowedExtensions = /(\.xls|\.xlsx)$/i;
            var files = fileUpload.files;
            var filePath = fileUpload.value;
            var categoryId = $('#ddlCategoryIdImportExcel').combotree('getValue');
            if (!allowedExtensions.exec(filePath)) {
                travel.notify('Hãy chọn file Excel (.xlx hoặc .xlsx)', 'error')
                fileInput.value = '';
                return false;
            } else {
                // Create FormData object
                var fileData = new FormData();
                // Looping over all files and add it to FormData object
                for (var i = 0; i < files.length; i++) {
                    fileData.append("files", files[i]);
                }
                if (!categoryId) {
                    travel.notify('Hãy chọn Danh mục sản phẩm', 'error');
                    return false;
                } else {
                    // Adding one more key to FormData object
                    fileData.append('categoryId', $('#ddlCategoryIdImportExcel').combotree('getValue'));
                    $.ajax({
                        url: '/Admin/Tour/ImportExcelAsync',
                        type: 'POST',
                        data: fileData,
                        processData: false,  // tell jQuery not to process the data
                        contentType: false,  // tell jQuery not to set contentType
                        success: function (data) {
                            $('#modal-import-excel').modal('hide');
                            loadData(data);
                        }
                    });
                }
                return false;
            }
        });

        $('#btn-export').on('click', function () {
            $.ajax({
                type: "POST",
                url: "/Admin/Tour/ExportExcel",
                data: {
                    categoryId: $('#ddlCategorySearch').val(),
                    keyword: $('#txtKeyword').val(),
                    page: travel.configs.pageIndex,
                    pageSize: travel.configs.pageSize
                },
                beforeSend: function () {
                    travel.startLoading();
                },
                success: function (response) {
                    window.location.href = response;
                    travel.stopLoading();
                },
                error: function () {
                    travel.notify('Có lỗi xảy ra', 'error');
                    travel.stopLoading();
                }
            });
        });
    }

    function initTreeDropDownCategory(selectedId) {
        $.ajax({
            url: "/Admin/TourCategory/GetAll",
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function (response) {
                var data = [];
                $.each(response, function (i, item) {
                    data.push({
                        id: item.Id,
                        text: item.Name,
                        parentId: item.ParentId,
                        sortOrder: item.SortOrder
                    });
                });
                var arr = travel.unflattern(data);

                $('#ddlCategoryIdM').combotree({
                    data: arr
                });

                $('#ddlCategoryIdImportExcel').combotree({
                    data: arr
                });

                if (selectedId != undefined) {
                    $('#ddlCategoryIdM').combotree('setValue', selectedId);
                }
            }
        });
    }

    function initTreeDropDownPlace(selectedId1, selectedId2) {
        
        $.ajax({
            url: "/admin/place/GetAll",
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function (response) {
                var data = [];
                $.each(response, function (i, item) {
                    data.push({
                        id: item.Id,
                        text: item.Name,
                        parentId: item.ParentId,
                        sortOrder: item.SortOrder
                    });
                });

                $('#txtDepartM').combotree({
                    data: data
                });
                $('#txtDestinationM').combotree({
                    data: data
                });

                if (selectedId1 != undefined) {
                    $('#txtDepartM').combotree('setValue', selectedId1);
                }
                if (selectedId2 != undefined) {
                    $('#txtDestinationM').combotree('setValue', selectedId2);
                }
            }
        });
    }

    function resetFormMaintainance() {
        $('#hidIdM').val(0);
        $('#hidDateCreatedM').val((new Date()).toISOString());        
        $('#hidViewCountM').val(0);
        $('#hidLikeM').val(0);
        $('#txtNameM').val('');
        initTreeDropDownCategory('');
        initTreeDropDownPlace('');
        $('#txtDescM').val('');
        $('#txtUnitM').val('');

        $('#txtPriceM').val('0');
        $('#txtOriginalPriceM').val('');
        $('#txtPromotionPriceM').val('');
        $('#txtCodeM').val('');
        $('#txtImageM').val('');
        document.getElementById("imageShowM").style.visibility = "hidden";
        $('#txtDepartM').val('');
        $('#txtDestinationM').val('');

        $('#txtDepartureM').val('');
        $('#txtDurationM').val('');
        $('#txtSeatM').val('');

        $('#txtTagM').val('');
        $('#txtMetakeywordM').val('');
        $('#txtMetaDescriptionM').val('');
        $('#txtSeoPageTitleM').val('');
        $('#txtSeoAliasM').val('');

        CKEDITOR.instances.txtContentM.setData('');
        $('#ckStatusM').prop('checked', true);
        $('#ckHotM').prop('checked', false);
        $('#ckShowHomeM').prop('checked', false);
    }
    function loadCategories() {
        $.ajax({
            type: 'GET',
            url: '/admin/Tour/GetAllCategories',
            dataType: 'json',
            success: function (response) {
                var render = "<option value=''>Chọn danh mục</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Name + "</option>"
                });
                $('#ddlCategorySearch').html(render);
            },
            error: function (status) {
                travel.notify('Không thể tải danh sách sản phẩm!', 'error');
            }
        });
    }

    function loadDiemDi() {
        $.ajax({
            type: 'GET',
            url: '/admin/place/GetAll',
            dataType: 'json',
            success: function (response) {
                var render = "<option value=''>Chọn điểm đi</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Name + "</option>"
                });
                $('#txtDepartM').html(render);
            },
            error: function (status) {
                travel.notify('Không thể tải danh sách sản phẩm!', 'error');
            }
        });
    }

    function loadDiemDen() {
        $.ajax({
            type: 'GET',
            url: '/admin/place/GetAll',
            dataType: 'json',
            success: function (response) {
                var render = "<option value=''>Chọn điểm đến</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Name + "</option>"
                });
                $('#txtDestinationM').html(render);
            },
            error: function (status) {
                travel.notify('Không thể tải danh sách sản phẩm!', 'error');
            }
        });
    }

    function loadData(isPageChanged) {
        var template = $('#table-template').html();
        var render = "";
        $.ajax({
            type: 'GET',
            data: {
                categoryId: $('#ddlCategorySearch').val(),
                keyword: $('#txtKeyword').val(),
                page: travel.configs.pageIndex,
                pageSize: travel.configs.pageSize
            },
            url: '/admin/Tour/GetAllPaging',
            dataType: 'json',
            success: function (response) {
                $.each(response.Results, function (i, item) {
                    render += Mustache.render(template, {
                        Id: item.Id,
                        Name: item.Name,
                        Image: item.Image == null ? '<img src="/admin-side/images/user.png" width=45' : '<img src="' + item.Image + '" width=45 />',
                        CategoryName: item.TourCategory.Name,
                        Price: travel.formatNumber(item.Price, 0) + 'đ',
                        PromotionPrice: item.PromotionPrice == 0 ? '' : (travel.formatNumber(item.PromotionPrice, 0) + 'đ'),
                        OriginalPrice: travel.formatNumber(item.OriginalPrice, 0) + 'đ',
                        SeatAvailability: item.SeatAvailability == 0 ? 'Hết vé' : item.SeatAvailability,
                        Status: travel.getStatus(item.Status)
                    });
                    $('#lblTotalRecords').text(response.RowCount);
                    if (render != '') {
                        $('#table-content').html(render);
                    }
                    wrapPaging(response.RowCount, function () {
                        loadData();
                    }, isPageChanged);
                });
            },
            error: function (status) {
                travel.notify('Không tìm thấy!', 'error');
            }
        });
    }

    function registerControls() {
        CKEDITOR.replace('txtContentM', {});

        //Fix: cannot click on element ck in modal
        $.fn.modal.Constructor.prototype.enforceFocus = function () {
            lang: 'vi',
                $(document)
                    .off('focusin.bs.modal') // guard against infinite focus loop
                    .on('focusin.bs.modal', $.proxy(function (e) {
                        if (
                            this.$element[0] !== e.target && !this.$element.has(e.target).length
                            // CKEditor compatibility fix start.
                            && !$(e.target).closest('.cke_dialog, .cke').length
                            // CKEditor compatibility fix end.
                        ) {
                            this.$element.trigger('focus');
                        }
                    }, this));
        };
    }
    function wrapPaging(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / travel.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationUL a').length === 0 || changePageSize === true) {
            $('#paginationUL').empty();
            $('#paginationUL').removeData("twbs-pagination");
            $('#paginationUL').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationUL').twbsPagination({
            totalPages: totalsize,
            visiblePages: 7,
            first: 'Về Đầu',
            prev: 'Trước',
            next: 'Tiếp',
            last: 'Về Cuối',
            onPageClick: function (event, p) {
                travel.configs.pageIndex = p;
                setTimeout(callBack(), 200);
            }
        });
    }
}