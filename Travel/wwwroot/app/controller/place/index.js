var PlaceController = function () {
    this.initialize = function () {
        loadData();
        registerEvents();
    }

    function registerEvents() {
        //Init validation
        $('#frmMaintainance').validate({
            errorClass: 'text-danger',
            ignore: [],
            lang: 'vi',
            rules: {
                txtNameM: { required: true },
                txtImageM: { required: true }
            }
        });

        $('#txt-search-keyword').keypress(function (e) {
            if (e.which === 13) {
                e.preventDefault();
                loadData();
            }
        });
        $("#btn-search").on('click', function () {
            loadData();
        });

        $("#btn-create").on('click', function () {
            resetFormMaintainance();
            $('#modal-add-edit').modal('show');
        });

        $('body').on('click', '.btn-edit', function (e) {
            e.preventDefault();
            resetFormMaintainance();
            var that = $(this).data('id');
            $.ajax({
                type: "GET",
                url: "/Admin/Place/GetById",
                data: { id: that },
                dataType: "json",
                beforeSend: function () {
                    travel.startLoading();
                },
                success: function (response) {
                    resetFormMaintainance();
                    var data = response;
                    $('#modal_title').text('Chỉnh sửa Đia điểm');
                    $('#hidIdM').val(data.Id);
                    $('#txtNameM').val(data.Name);
                    $('#txtDescriptionM').val(data.Description);
                    $('#txtImageM').val(data.Image);
                    document.getElementById("imageShowM").src = data.Image;
                    document.getElementById("imageShowM").style.visibility = "visible";
                    if (data.Status == 0)
                        $('#ckStatusM').prop('checked', true);
                    else
                        $('#ckStatusM').prop('checked', false);
                    $('#modal-add-edit').modal('show');
                    travel.stopLoading();
                },
                error: function () {
                    travel.notify('Có lỗi xảy ra', 'error');
                    travel.stopLoading();
                }
            });
        });

        $('#btnSaveM').on('click', function (e) {
            if ($('#frmMaintainance').valid()) {
                e.preventDefault();
                var id = $('#hidIdM').val();
                var name = $('#txtNameM').val();
                var image = $('#txtImageM').val();
                var description = $('#txtDescriptionM').val();
                var status = $('#ckStatusM').prop('checked') === true ? 0 : 1;

                $.ajax({
                    type: "POST",
                    url: "/Admin/Place/SaveEntity",
                    data: {
                        Id: id,
                        Name: name,
                        Image: image,
                        Description: description,
                        Status: status,
                    },
                    dataType: "json",
                    beforeSend: function () {
                        travel.startLoading();
                    },
                    success: function () {
                        travel.notify('Thành công', 'success');
                        $('#modal-add-edit').modal('hide');
                        resetFormMaintainance();

                        travel.stopLoading();
                        loadData(true);
                    },
                    error: function () {
                        travel.notify('Đã có lỗi xảy ra, vui lòng kiễm tra lại!', 'error');
                        travel.stopLoading();
                    }
                });
                return false;
            }
            return false;
        });

        $('body').on('click', '.btn-delete', function (e) {
            e.preventDefault();
            var that = $(this).data('id');
            travel.confirm('Are you sure to delete?', function () {
                $.ajax({
                    type: "POST",
                    url: "/Admin/Place/Delete",
                    data: { id: that },
                    dataType: "json",
                    beforeSend: function () {
                        travel.startLoading();
                    },
                    success: function () {
                        travel.notify('Xóa thành công', 'success');
                        travel.stopLoading();
                        loadData();
                    },
                    error: function () {
                        travel.notify('Đã có lỗi xảy ra, vui lòng kiễm tra lại!', 'error');
                        travel.stopLoading();
                    }
                });
            });
        });
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
                        document.getElementById("imageShowM").style.visibility = "visible";
                        $('#txtImageM').val(path);
                        document.getElementById("imageShowM").src = path;
                        travel.notify('Upload hình thành công!', 'success');
                    },
                    error: function () {
                        travel.notify('Có lỗi khi upload hình ảnh!', 'error');
                    }
                });
            }
        });

    };

    function resetFormMaintainance() {
        $('#hidIdM').val(0);
        $('#txtNameM').val('');
        $('#modal_title').text('Thêm mới Đia điểm');
        $('#hidDateCreated').val(travel.dateFormatJson(Date.now()));
        $('#txtImageM').val('');
        document.getElementById("imageShowM").style.visibility="hidden";
        $('#txtDescriptionM').val('');
        $('#ckStatusM').prop('checked', true);
    }


    function loadData(isPageChanged) {
        $.ajax({
            type: "GET",
            url: "/Admin/Place/GetAllPaging",
            data: {
                keyword: $('#txt-search-keyword').val(),
                page: travel.configs.pageIndex,
                pageSize: travel.configs.pageSize
            },
            dataType: "json",
            beforeSend: function () {
                travel.startLoading();
            },
            success: function (response) {
                var template = $('#table-template').html();
                var render = "";
                if (response.RowCount > 0) {
                    $.each(response.Results, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            Name: item.Name,
                            Image: item.Image == null ? '<img src="/admin-side/images/user.png" width=25' : '<img src="' + item.Image + '" width=25 />',
                            Description: item.Description,
                            DateModified: travel.dateFormatJson(item.DateModified),
                            Status: travel.getStatus(item.Status)
                        });
                    });
                    $("#lbl-total-records").text(response.RowCount);
                    if (render != undefined) {
                        $('#tbl-content').html(render);
                    }
                    wrapPaging(response.RowCount, function () {
                        loadData();
                    }, isPageChanged);
                }
                else {
                    $('#tbl-content').html('');
                }
                travel.stopLoading();
            },
            error: function (status) {
                console.log(status);
            }
        });
    };

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
            first: 'Đầu',
            prev: 'Trước',
            next: 'Tiếp',
            last: 'Cuối',
            onPageClick: function (event, p) {
                travel.configs.pageIndex = p;
                setTimeout(callBack(), 200);
            }
        });
    }
}