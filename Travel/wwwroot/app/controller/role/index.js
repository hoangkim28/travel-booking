﻿var RoleController = function () {
    var self = this;

    this.initialize = function () {
        loadData();
        registerEvents();
    }

    function registerEvents() {
        //Init validation
        $('#frmMaintainance').validate({
            errorClass: 'red',
            ignore: [],
            lang: 'vi',
            rules: {
                txtName: { required: true }
            }
        });

        $('#txt-search-keyword').keypress(function (e) {
            if (e.which == 13) {
                e.preventDefault();
                loadData();
            }
        });
        $("#btn-search").on('click', function () {
            loadData();
        });

        $("#ddl-show-page").on('change', function () {
            travel.configs.pageSize = $(this).val();
            travel.configs.pageIndex = 1;
            loadData(true);
        });

        $("#btn-create").on('click', function () {
            resetFormMaintainance();
            $('#modal-add-edit').modal('show');
        });
        //Grant permission
        $('body').on('click', '.btn-grant', function () {
            $('#hidRoleId').val($(this).data('id'));
            $.when(loadFunctionList())
                .done(fillPermission($('#hidRoleId').val()));
            $('#modal-grantpermission').modal('show');
        });

        $('body').on('click', '.btn-edit', function (e) {
            e.preventDefault();
            var that = $(this).data('id');
            $.ajax({
                type: "GET",
                url: "/Admin/Role/GetById",
                data: { id: that },
                dataType: "json",
                beforeSend: function () {
                    travel.startLoading();
                },
                success: function (response) {
                    var data = response;
                    $('#hidId').val(data.Id);
                    $('#txtName').val(data.Name);
                    $('#txtDescription').val(data.Description);
                    $('#modal-add-edit').modal('show');
                    travel.stopLoading();
                },
                error: function (status) {
                    travel.notify('Có lỗi xảy ra', 'error');
                    travel.stopLoading();
                }
            });
        });

        $('#btnSave').on('click', function (e) {
            if ($('#frmMaintainance').valid()) {
                e.preventDefault();
                var id = $('#hidId').val();
                var name = $('#txtName').val();
                var description = $('#txtDescription').val();

                $.ajax({
                    type: "POST",
                    url: "/Admin/Role/SaveEntity",
                    data: {
                        Id: id,
                        Name: name,
                        Description: description,
                    },
                    dataType: "json",
                    beforeSend: function () {
                        travel.startLoading();
                    },
                    success: function (response) {
                        travel.notify('Thành công!', 'success');
                        $('#modal-add-edit').modal('hide');
                        resetFormMaintainance();
                        travel.stopLoading();
                        loadData(true);
                    },
                    error: function () {
                        travel.notify('Có lỗi!', 'error');
                        travel.stopLoading();
                    }
                });
                return false;
            }
        });

        $('body').on('click', '.btn-delete', function (e) {
            e.preventDefault();
            var that = $(this).data('id');
            travel.confirm('Xác nhận xóa?', function () {
                $.ajax({
                    type: "POST",
                    url: "/Admin/Role/Delete",
                    data: { id: that },
                    beforeSend: function () {
                        travel.startLoading();
                    },
                    success: function (response) {
                        travel.notify('Xóa thành công!', 'success');
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

        $("#btnSavePermission").off('click').on('click', function () {
            var listPermmission = [];
            $.each($('#tblFunction tbody tr'), function (i, item) {
                listPermmission.push({
                    RoleId: $('#hidRoleId').val(),
                    FunctionId: $(item).data('id'),
                    CanRead: $(item).find('.ckView').first().prop('checked'),
                    CanCreate: $(item).find('.ckAdd').first().prop('checked'),
                    CanUpdate: $(item).find('.ckEdit').first().prop('checked'),
                    CanDelete: $(item).find('.ckDelete').first().prop('checked'),
                });
            });
            $.ajax({
                type: "POST",
                url: "/admin/role/SavePermission",
                data: {
                    listPermmission: listPermmission,
                    roleId: $('#hidRoleId').val()
                },
                beforeSend: function () {
                    travel.startLoading();
                },
                success: function (response) {
                    travel.notify('Thành công', 'success');
                    $('#modal-grantpermission').modal('hide');
                    travel.stopLoading();
                },
                error: function () {
                    travel.notify('Lưu thất bại! Vui lòng kiễm tra lại!', 'error');
                    travel.stopLoading();
                }
            });
        });
    };

    function loadFunctionList(callback) {
        var strUrl = "/admin/Function/GetAll";
        return $.ajax({
            type: "GET",
            url: strUrl,
            dataType: "json",
            beforeSend: function () {
                travel.startLoading();
            },
            success: function (response) {
                var template = $('#result-data-function').html();
                var render = "";
                $.each(response, function (i, item) {
                    render += Mustache.render(template, {
                        Name: item.Name,
                        treegridparent: item.ParentId != null ? "treegrid-parent-" + item.ParentId : "",
                        Id: item.Id,
                        AllowCreate: item.AllowCreate ? "checked" : "",
                        AllowEdit: item.AllowEdit ? "checked" : "",
                        AllowView: item.AllowView ? "checked" : "",
                        AllowDelete: item.AllowDelete ? "checked" : "",
                        Status: travel.getStatus(item.Status),
                    });
                });
                if (render != undefined) {
                    $('#lst-data-function').html(render);
                }
                $('.tree').treegrid();

                $('#ckCheckAllView').on('click', function () {
                    $('.ckView').prop('checked', $(this).prop('checked'));
                });

                $('#ckCheckAllCreate').on('click', function () {
                    $('.ckAdd').prop('checked', $(this).prop('checked'));
                });
                $('#ckCheckAllEdit').on('click', function () {
                    $('.ckEdit').prop('checked', $(this).prop('checked'));
                });
                $('#ckCheckAllDelete').on('click', function () {
                    $('.ckDelete').prop('checked', $(this).prop('checked'));
                });

                $('.ckView').on('click', function () {
                    if ($('.ckView:checked').length == response.length) {
                        $('#ckCheckAllView').prop('checked', true);
                    } else {
                        $('#ckCheckAllView').prop('checked', false);
                    }
                });
                $('.ckAdd').on('click', function () {
                    if ($('.ckAdd:checked').length == response.length) {
                        $('#ckCheckAllCreate').prop('checked', true);
                    } else {
                        $('#ckCheckAllCreate').prop('checked', false);
                    }
                });
                $('.ckEdit').on('click', function () {
                    if ($('.ckEdit:checked').length == response.length) {
                        $('#ckCheckAllEdit').prop('checked', true);
                    } else {
                        $('#ckCheckAllEdit').prop('checked', false);
                    }
                });
                $('.ckDelete').on('click', function () {
                    if ($('.ckDelete:checked').length == response.length) {
                        $('#ckCheckAllDelete').prop('checked', true);
                    } else {
                        $('#ckCheckAllDelete').prop('checked', false);
                    }
                });
                if (callback != undefined) {
                    callback();
                }
                travel.stopLoading();
            },
            error: function (status) {
                console.log(status);
            }
        });
    }

    function fillPermission(roleId) {
        var strUrl = "/Admin/Role/ListAllFunction";
        return $.ajax({
            type: "POST",
            url: strUrl,
            data: {
                roleId: roleId
            },
            dataType: "json",
            beforeSend: function () {
                travel.stopLoading();
            },
            success: function (response) {
                var litsPermission = response;
                $.each($('#tblFunction tbody tr'), function (i, item) {
                    $.each(litsPermission, function (j, jitem) {
                        if (jitem.FunctionId == $(item).data('id')) {
                            $(item).find('.ckView').first().prop('checked', jitem.CanRead);
                            $(item).find('.ckAdd').first().prop('checked', jitem.CanCreate);
                            $(item).find('.ckEdit').first().prop('checked', jitem.CanUpdate);
                            $(item).find('.ckDelete').first().prop('checked', jitem.CanDelete);
                        }
                    });
                });

                if ($('.ckView:checked').length == $('#tblFunction tbody tr .ckView').length) {
                    $('#ckCheckAllView').prop('checked', true);
                } else {
                    $('#ckCheckAllView').prop('checked', false);
                }
                if ($('.ckAdd:checked').length == $('#tblFunction tbody tr .ckAdd').length) {
                    $('#ckCheckAllCreate').prop('checked', true);
                } else {
                    $('#ckCheckAllCreate').prop('checked', false);
                }
                if ($('.ckEdit:checked').length == $('#tblFunction tbody tr .ckEdit').length) {
                    $('#ckCheckAllEdit').prop('checked', true);
                } else {
                    $('#ckCheckAllEdit').prop('checked', false);
                }
                if ($('.ckDelete:checked').length == $('#tblFunction tbody tr .ckDelete').length) {
                    $('#ckCheckAllDelete').prop('checked', true);
                } else {
                    $('#ckCheckAllDelete').prop('checked', false);
                }
                travel.stopLoading();
            },
            error: function (status) {
                console.log(status);
            }
        });
    }

    function resetFormMaintainance() {
        $('#hidId').val('');
        $('#txtName').val('');
        $('#txtDescription').val('');
    }

    function loadData(isPageChanged) {
        $.ajax({
            type: "GET",
            url: "/admin/role/GetAllPaging",
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
                            Name: item.Name,
                            Id: item.Id,
                            Description: item.Description
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
        if ($('#paginationUL a').length === 0 || changePageSize === true) {
            $('#paginationUL').empty();
            $('#paginationUL').removeData("twbs-pagination");
            $('#paginationUL').unbind("page");
        }
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