var loginController = function () {
    this.initialize = function () {
        registerEvents();
    }

    var registerEvents = function () {
        $('#loginForm').validate({
            errorClass: 'text-danger text-left',
            ignore: [],
            lang: 'VN-vi',
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 6
                }
            }
        });
        $('#btnLogin').on('click', function (e) {
            if ($('#loginForm').validate()) {
                e.preventDefault();
                var email = $('#txtEmail').val();
                var password = $('#txtPassword').val();
                login(email, password);
            }
        });
        $(document).keypress(function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                var email = $('#txtEmail').val();
                var password = $('#txtPassword').val();
                login(email, password);
                event.preventDefault();
            }
        });
    }

    var login = function (email, password) {
        $.ajax({
            type: 'POST',
            data: {
                Email: email,
                Password: password
            },
            dateType: 'json',
            url: '/admin/login/authen',
            success: function (res) {
                if (res.Success) {
                    travel.notify('Đăng nhập thành công', 'success');
                    window.location.href = "/Admin/Home/Index";
                }
                else {
                    travel.notify('Đăng nhập không đúng', 'error');
                }
            }
        })
    }
}