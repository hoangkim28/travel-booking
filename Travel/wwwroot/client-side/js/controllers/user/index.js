var UserController = function () {
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
            Travel.configs.pageSize = $(this).val();
            Travel.configs.pageIndex = 1;
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
                    Travel.startLoading();
                },
                success: function (response) {
                    var data = response;
                    $('#hidId').val(data.Id);
                    $('#txtFullName').val(data.FullName);
                    $('#txtUserName').val(data.UserName);
                    $('#txtEmail').val(data.Email);
                    $('#txtAddress').val(data.Address);
                    $('#txtPhoneNumber').val(data.PhoneNumber);
                    $('#txtPassword').val(data.Password);
                    $('#ckStatus').prop('checked', data.Status === 1);
                    initRoleList(data.Roles);
                    disableFieldEdit(true);
                    $('#modal-add-edit').modal('show');
                    Travel.stopLoading();
                },
                error: function () {
                    Travel.notify('Có lỗi xảy ra', 'error');
                    Travel.stopLoading();
                }
            });
        });

        $('#btnSave').on('click', function (e) {
            $.ajax({
                type: "GET",
                url: "/Admin/User/GetById",
                data: { id: that },
                dataType: "json",
                beforeSend: function () {
                    Travel.startLoading();
                },
                success: function (response) {
                    var data = response;
                    $('#hidId').val(data.Id);
                    $('#txtFullName').val(data.FullName);
                    $('#txtUserName').val(data.UserName);
                    $('#txtEmail').val(data.Email);
                    $('#txtAddress').val(data.Address);
                    $('#txtPhoneNumber').val(data.PhoneNumber);
                    $('#txtPassword').val(data.Password);
                    $('#ckStatus').prop('checked', data.Status === 1);
                    initRoleList(data.Roles);
                    disableFieldEdit(true);
                    $('#modal-add-edit').modal('show');
                    Travel.stopLoading();
                },
                error: function () {
                    Travel.notify('Có lỗi xảy ra', 'error');
                    Travel.stopLoading();
                }
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
    var that = $('#hidId').val();
    function loadData(isPageChanged) {
        $.ajax({
            type: "GET",
            url: "/Admin/User/GetById",
            data: { id: that },
            dataType: "json",
            beforeSend: function () {
                Travel.startLoading();
            },
            success: function (response) {
                var data = response;
                $('#hidId').val(data.Id);
                $('#txtFullName').val(data.FullName);
                $('#txtUserName').val(data.UserName);
                $('#txtEmail').val(data.Email);
                $('#txtAddress').val(data.Address);
                $('#txtPhoneNumber').val(data.PhoneNumber);
                $('#txtPassword').val(data.Password);
                $('#ckStatus').prop('checked', data.Status === 1);
                disableFieldEdit(true);
                Travel.stopLoading();
            },
            error: function () {
                Travel.notify('Có lỗi xảy ra', 'error');
                Travel.stopLoading();
            }
        });
    };

    function wrapPaging(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / Travel.configs.pageSize);
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
                Travel.configs.pageIndex = p;
                setTimeout(callBack(), 200);
            }
        });
    }
}