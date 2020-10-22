var tourCategoryController = function () {
    this.initialize = function () {
        loadData();
        loadCategories();
        registerEvents();
    }

    function registerEvents() {
        //todo: binding events to controls
        $('#ddlShowPage').on('change', function () {
            travel.configs.pageSize = $(this).val();
            travel.configs.pageIndex = 1;
            loadData(true);
        });

        $('#btnSearch').on('click', function () {
            loadData();
        });

        $('#ddlCategorySearch').on('change', function () {
            loadData();
        });

        $('#txtKeyword').on('change', function () {
            loadData();
        });

        $('#txtKeyword').on('keypress', function (e) {
            if (e.which === 13) {
                loadData();
            }
        });
        $('#btnCreate').on('click', function () {
            resetFormMaintainance();
            $('#modal-add-edit').modal('show');
        });

        $('#btnDelete').on('click', function (e) {
            e.preventDefault();
            var that = parseInt($('#hidIdM').val());
            travel.confirm('Xác nhận xóa?', function () {
                $.ajax({
                    type: "POST",
                    url: "/Admin/TourCategory/Delete",
                    data: { id: that },
                    dataType: "json",
                    beforeSend: function () {
                        travel.startLoading();
                    },
                    success: function (response) {
                        travel.notify('Thành công', 'success');
                        $('#modal-add-edit').modal('hide');
                        travel.stopLoading();
                        loadData();
                    },
                    error: function (status) {
                        travel.notify('Có lỗi trong quá trình xóa!', 'error');
                        travel.stopLoading();
                    }
                });
            });
        });

        $('body').off('click').on('click', '.btn-edit', function (e) {
            e.preventDefault();
            var that = $(this).data('id');
            $.ajax({
                type: "GET",
                url: "/Admin/TourCategory/GetById",
                data: { id: that },
                dataType: "json",
                beforeSend: function () {
                    travel.startLoading();
                },
                success: function (response) {
                    var data = response;
                    resetFormMaintainance();
                    $('#hidIdM').val(data.Id);
                    $('#txtNameM').val(data.Name);
                    initTreeDropDownCategory(data.ParentId);
                    $('#txtDescM').val(data.Description);
                    $('#txtImageM').val(data.Image);
                    document.getElementById("imageShowM").src = data.Image;
                    document.getElementById("imageShowM").style.visibility = "visible";
                    $('#txtSeoKeywordM').val(data.SeoKeywords);
                    $('#txtSeoDescriptionM').val(data.SeoDescription);
                    $('#txtSeoPageTitleM').val(data.SeoPageTitle);
                    $('#txtSeoAliasM').val(data.SeoAlias);
                    $('#ckStatusM').prop('checked', data.Status == 0);
                    $('#ckShowHomeM').prop('checked', data.HomeFlag);
                    $('#txtOrderM').val(data.SortOrder);
                    $('#txtHomeOrderM').val(data.HomeOrder);
                    $('#btnDelete').show();
                    $('#modal-add-edit').modal('show');
                    travel.stopLoading();
                },
                error: function (status) {
                    travel.notify('Có lỗi xảy ra', 'error');
                    travel.stopLoading();
                }
            });
        });

        $('body').on('click', '.btnSave', function (e) {
            if ($('#frmMaintainance').valid()) {
                e.preventDefault();
                var id = parseInt($('#hidIdM').val());
                var name = $('#txtNameM').val();
                var parentId = $('#ddlCategoryIdM').combotree('getValue');
                var description = $('#txtDescM').val();
                var image = $('#txtImageM').val();
                var order = parseInt($('#txtOrderM').val());
                var homeOrder = $('#txtHomeOrderM').val();
                var seoKeyword = $('#txtSeoKeywordM').val();
                var seoMetaDescription = $('#txtSeoDescriptionM').val();
                var seoPageTitle = $('#txtSeoPageTitleM').val();
                var seoAlias = $('#txtSeoAliasM').val();
                var status = $('#ckStatusM').prop('checked') == true ? 0 : 1;
                var showHome = $('#ckShowHomeM').prop('checked');
                $.ajax({
                    type: "POST",
                    url: "/Admin/TourCategory/SaveEntity",
                    data: {
                        Id: id,
                        Name: name,
                        Description: description,
                        ParentId: parentId,
                        HomeOrder: homeOrder,
                        SortOrder: order,
                        HomeFlag: showHome,
                        Image: image,
                        Status: status,
                        SeoPageTitle: seoPageTitle,
                        SeoAlias: seoAlias,
                        SeoKeywords: seoKeyword,
                        SeoDescription: seoMetaDescription
                    },
                    dataType: "json",
                    beforeSend: function () {
                        travel.startLoading();
                    },
                    success: function (response) {
                        travel.notify('Thành công!', 'success');
                        $('#modal-add-edit').modal('hide');
                        travel.stopLoading();
                        loadData(true);
                    },
                    error: function () {
                        travel.notify('Có lỗi khi lưu! Vui lòng kiễm tra lại!', 'error');
                        travel.stopLoading();
                    }
                });
            }
            return false;
        });
        // Upload Image
        $('#btnSelectImg').on('click', function () {
            $('#fileInputImage').click();
        });
        $("#fileInputImage").on('change', function () {
            var fileUpload = $(this).get(0);
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
                    travel.notify('Upload hình thành công!', 'success');
                },
                error: function () {
                    travel.notify('Có lỗi khi upload hình ảnh!', 'error');
                }
            });
        });
    }

    function loadCategories() {
        $.ajax({
            type: 'GET',
            url: '/admin/Tourcategory/GetAllCategories',
            dataType: 'json',
            success: function (response) {
                var render = "<option value=''>Chọn Danh mục cha</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Name + "</option>"
                });
                $('#ddlCategorySearch').html(render);
            },
            error: function (status) {
                travel.notify('Không tải được danh sách!', 'error');
            }
        });
    }

    function loadData(isPageChanged) {
        var template = $('#table-template').html();
        var render = "";
        $.ajax({
            type: 'GET',
            data: {
                parentId: $('#ddlCategorySearch').val(),
                keyword: $('#txtKeyword').val(),
                page: travel.configs.pageIndex,
                pageSize: travel.configs.pageSize
            },
            url: '/admin/Tourcategory/GetAllPaging',
            dataType: 'json',
            success: function (response) {
                $.each(response.Results, function (i, item) {
                    render += Mustache.render(template, {
                        Id: item.Id,
                        Name: item.Name,
                        Description: item.Description,
                        Image: item.Image == null ? '<img class="text-center" src="/admin-side/images/Tourcategory/50x50.png" width=25' : '<img class="text-center" src="' + item.Image + '" width=25 />',
                        DateModified: travel.dateTimeFormatJson(item.DateModified),
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
                travel.notify('Không tải được dữ liệu!', 'error');
            }
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
                if (selectedId != undefined) {
                    $('#ddlCategoryIdM').combotree('setValue', selectedId);
                }
            }
        });
    }

    function resetFormMaintainance() {
        $('#hidIdM').val(0);
        $('#txtNameM').val('');
        initTreeDropDownCategory('');
        $('#txtDescM').val('');
        $('#txtUnitM').val('');
        $('#txtPriceM').val('0');
        $('#txtOriginalPriceM').val('');
        $('#txtPromotionPriceM').val('');
        $('#txtImageM').val('');
        $('#txtTagM').val('');
        $('#txtMetakeywordM').val('');
        $('#txtMetaDescriptionM').val('');
        $('#txtSeoPageTitleM').val('');
        $('#txtSeoAliasM').val('');
        $('#txtOrderM').val('0');
        $('#ckStatusM').prop('checked', true);
        $('#ckHotM').prop('checked', false);
        $('#ckShowHomeM').prop('checked', false);
        $('#btnDelete').hide();
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