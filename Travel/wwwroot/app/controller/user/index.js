﻿var UserController = function () {
    this.initialize = function () {
        loadData();
        registerEvents();
    }

    function registerEvents() {
        //Init validation
        $('#frmMaintainance').validate({
            errorClass: 'text-danger',
            ignore: [],
            lang: 'en',
            rules: {
                txtFullName: { required: true },
                txtUserName: { required: true },
                txtPassword: {
                    required: true,
                    minlength: 6
                },
                txtConfirmPassword: {
                    equalTo: "#txtPassword"
                },
                txtEmail: {
                    required: true,
                    email: true
                }
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
        $("#ddl-show-page").on('change', function () {
            travel.configs.pageSize = $(this).val();
            travel.configs.pageIndex = 1;
            loadData(true);
        });

        $("#btn-create").on('click', function () {
            resetFormMaintainance();
            initRoleList();
            $('#modal-add-edit').modal('show');
        });

        $('body').on('click', '.btn-edit', function (e) {
            e.preventDefault();
            var that = $(this).data('id');
            $.ajax({
                type: "GET",
                url: "/Admin/User/GetById",
                data: { id: that },
                dataType: "json",
                beforeSend: function () {
                    travel.startLoading();
                },
                success: function (response) {
                    var data = response;
                    resetFormMaintainance();
                    $('#hidId').val(data.Id);
                    $('#txtFullName').val(data.FullName);
                    $('#txtUserName').val(data.UserName);
                    $('#txtEmail').val(data.Email);
                    $('#txtAddress').val(data.Address);
                    $('#txtPhoneNumber').val(data.PhoneNumber);
                    $('#txtPassword').val(data.Password);
                    if (data.Status == 0)
                        $('#ckStatusM').prop('checked', true);
                    else
                        $('#ckStatusM').prop('checked', false);
                    initRoleList(data.Roles);
                    disableFieldEdit(true);
                    $('#modal-add-edit').modal('show');
                    travel.stopLoading();
                },
                error: function () {
                    travel.notify('Có lỗi xảy ra', 'error');
                    travel.stopLoading();
                }
            });
        });

        $('#btnSave').on('click', function (e) {
            if ($('#frmMaintainance').valid()) {
                e.preventDefault();
                var id = $('#hidId').val();
                var fullName = $('#txtFullName').val();
                var userName = $('#txtUserName').val();
                var password = $('#txtPassword').val();
                var email = $('#txtEmail').val();
                var address = $('#txtAddress').val();
                var phoneNumber = $('#txtPhoneNumber').val();
                var roles = [];
                var status = $('#ckStatus').prop('checked') == true ? 0 : 1;
                $.each($('input[name="ckRoles"]'), function (i, item) {
                    if ($(item).prop('checked') === true)
                        roles.push($(item).prop('value'));
                });
                var status = $('#ckStatus').prop('checked') === true ? 0 : 1;
                $.ajax({
                    type: "POST",
                    url: "/Admin/User/SaveEntity",
                    data: {
                        Id: id,
                        FullName: fullName,
                        UserName: userName,
                        Password: password,
                        Email: email,
                        PhoneNumber: phoneNumber,
                        Address: address,
                        Status: status,
                        Address: address,
                        Roles: roles
                    },
                    dataType: "json",
                    beforeSend: function () {
                        travel.startLoading();
                    },
                    success: function () {
                        travel.notify('Lưu thành công!', 'success');
                        $('#modal-add-edit').modal('hide');
                        resetFormMaintainance();
                        loadData(true);
                        travel.stopLoading();
                    },
                    error: function () {
                        travel.notify('Lỗi!', 'error');
                        travel.stopLoading();
                    }
                });
            }
            return false;
        });

        $('body').on('click', '.btn-delete', function (e) {
            e.preventDefault();
            var that = $(this).data('id');
            travel.confirm('Xác nhận xóa?', function () {
                $.ajax({
                    type: "POST",
                    url: "/Admin/User/Delete",
                    data: { id: that },
                    beforeSend: function () {
                        travel.startLoading();
                    },
                    success: function () {
                        travel.notify('Xóa thành công!', 'success');
                        travel.stopLoading();
                        loadData();
                    },
                    error: function () {
                        travel.notify('Lỗi!', 'error');
                        travel.stopLoading();
                    }
                });
            });
        });
    };

    function disableFieldEdit(disabled) {
        $('#txtUserName').prop('disabled', disabled);
        $('#txtPassword').prop('disabled', disabled);
        $('#txtEmail').prop('disabled', disabled);
        $('#txtConfirmPassword').prop('disabled', disabled);
    }

    function resetFormMaintainance() {
        disableFieldEdit(false);
        $('#hidId').val('');
        initRoleList();
        $('#txtFullName').val('');
        $('#txtUserName').val('');
        $('#txtPassword').val('');
        $('#txtConfirmPassword').val('');
        $('input[name="ckRoles"]').removeAttr('checked');
        $('#txtEmail').val('');
        $('#txtAddress').val('');
        $('#txtPhoneNumber').val('');
        $('#ckStatus').prop('checked', true);
    }

    function initRoleList(selectedRoles) {
        $.ajax({
            url: "/Admin/Role/GetAll",
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function (response) {
                var template = $('#role-template').html();
                var data = response;
                var render = '';
                $.each(data, function (i, item) {
                    var checked = '';
                    if (selectedRoles !== undefined && selectedRoles.indexOf(item.Name) !== -1)
                        checked = 'checked';
                    render += Mustache.render(template,
                        {
                            Name: item.Name,
                            Description: item.Description,
                            Checked: checked
                        });
                });
                $('#list-roles').html(render);
            }
        });
    }

    function loadData(isPageChanged) {
        $.ajax({
            type: "GET",
            url: "/admin/user/GetAllPaging",
            data: {
                categoryId: $('#ddl-category-search').val(),
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
                            FullName: item.FullName,
                            Id: item.Id,
                            Email: item.Email,
                            Avatar: item.Avatar === undefined ? '<img src="/admin-side/images/user.png" width=25 />' : '<img src="' + item.Avatar + '" width=25 />',
                            DateCreated: travel.dateFormatJson(item.DateCreated),
                            PhoneNumber: item.PhoneNumber,
                            Address: item.Address,
                            Status: travel.getStatus(item.Status)
                        });
                    });
                    $("#lbl-total-records").text(response.RowCount);
                    if (render !== undefined) {
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