var blogController = function () {
    this.initialize = function () {
        loadData();
        registerEvents();
        registerControls();
    }

    function registerEvents() {
        //Init validation
        $('#frmMaintainance').validate({
            errorClass: 'red',
            ignore: [],
            lang: 'vi',
            rules: {
                txtNameM: { required: true },
                txtImageM: {
                    required: true
                },
            }
        });
        //todo: binding events to controls
        $('#ddlShowPage').on('change', function () {
            travel.configs.pageSize = $(this).val();
            travel.configs.pageIndex = 1;
            loadData(true);
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
            $('#modal-add-edit').modal('show');
        });

        $('body').on('click', '.btn-edit', function (e) {
            e.preventDefault();
            var that = $(this).data('id');
            $.ajax({
                type: "GET",
                url: "/Admin/Blog/GetById",
                data: { id: that },
                dataType: "json",
                beforeSend: function () {
                    travel.startLoading();
                },
                success: function (response) {
                    var data = response;
                    $('#hidIdM').val(data.Id);
                    $('#txtNameM').val(data.Name);

                    $('#txtDescM').val(data.Description);

                    $('#txtImageM').val(data.Image);

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
                    $('#ckHotM').prop('checked', data.HotFlag);
                    $('#ckShowHomeM').prop('checked', data.HomeFlag);

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
                    url: "/Admin/blog/DeleteAsync",
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
                        travel.notify('Có lỗi khi xóa sản phẩm!', 'error');
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

                var description = $('#txtDescM').val();

                var image = $('#txtImageM').val();

                var tags = $('#txtTagM').val();
                var seoKeyword = $('#txtMetakeywordM').val();
                var seoMetaDescription = $('#txtMetaDescriptionM').val();
                var seoPageTitle = $('#txtSeoPageTitleM').val();
                var seoAlias = $('#txtSeoAliasM').val();

                var content = CKEDITOR.instances.txtContentM.getData();
                var status = $('#ckStatusM').prop('checked') == true ? 0 : 1;
                var hot = $('#ckHotM').prop('checked');
                var showHome = $('#ckShowHomeM').prop('checked');

                $.ajax({
                    type: "POST",
                    url: "/Admin/Blog/SaveEntity",
                    data: {
                        Id: id,
                        Name: name,
                        Image: image,
                        Description: description,
                        Content: content,
                        HomeFlag: showHome,
                        HotFlag: hot,
                        Tags: tags,
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
                        travel.notify('Thành công', 'success');
                        $('#modal-add-edit').modal('hide');
                        resetFormMaintainance();
                        loadData(true);
                        travel.stopLoading();
                    },
                    error: function () {
                        travel.notify('Có lỗi khi cập nhật!', 'error');
                        travel.stopLoading();
                    }
                });
                return false;
            }
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
                        travel.notify('Upload hình thành công!', 'success');
                    },
                    error: function () {
                        travel.notify('Có lỗi khi upload hình ảnh!', 'error');
                    }
                });
            }
        });
    }

    function resetFormMaintainance() {
        $('#hidIdM').val(0);
        $('#txtNameM').val('');

        $('#txtDescM').val('');
        $('#txtUnitM').val('');

        $('#txtImageM').val('');

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

    function loadData(isPageChanged) {
        var template = $('#table-template').html();
        var render = "";
        $.ajax({
            type: 'GET',
            data: {
                keyword: $('#txtKeyword').val(),
                page: travel.configs.pageIndex,
                pageSize: travel.configs.pageSize
            },
            url: '/admin/blog/GetAllPaging',
            dataType: 'json',
            success: function (response) {
                $.each(response.Results, function (i, item) {
                    render += Mustache.render(template, {
                        Id: item.Id,
                        Name: item.Name,
                        Image: item.Image == null ? '<img src="/admin-side/images/user.png" width=25' : '<img src="' + item.Image + '" width=25 />',
                        DateModified: travel.dateFormatJson(item.DateModified),
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
                setTimeout(callBack(), 0);
            }
        });
    }
}