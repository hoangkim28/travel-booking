var CartController = function () {
    this.initialize = function () {
        registerEvents();
        loadData();
    }

    function registerEvents() {
        $('body').on('click', '.btn-delete', function (e) {
            e.preventDefault();
            var id = $(this).data('id');
            $.ajax({
                url: '/Cart/RemoveFromCart',
                type: 'post',
                data: {
                    TourId: id
                },
                success: function () {
                    travel.notify('Đã xóa.', 'success');
                    loadHeaderCart();
                    loadData();
                }
            });
        });
        $('body').on('change', '.txtQuantity', function (e) {
            e.preventDefault();
            var id = $(this).data('id');
            var q = $(this).val();
            if (q > 0) {
                $.ajax({
                    url: '/Cart/UpdateCart',
                    type: 'post',
                    data: {
                        TourId: id,
                        quantity: q
                    },
                    success: function (respone) {
                        if (respone.success) {
                            travel.notify(respone.responseText, 'success');
                        } else {
                            travel.notify(respone.responseText, 'error');
                        }
                        loadHeaderCart();
                        loadData(true);
                    }
                });
            } else {
                travel.notify('Vui lòng nhập đúng số lượng', 'error');
            }
        });
        $('#btnClearAll').on('click', function (e) {
            e.preventDefault();
            $.ajax({
                url: '/Cart/ClearCart',
                type: 'post',
                success: function (respone) {
                    travel.notify(respone.responseText, 'success');
                    loadHeaderCart();
                    loadData();
                }
            });
        });

        $('body').on('click', '.remove-cart', function (e) {
            e.preventDefault();
            var id = $(this).data('id');
            $.ajax({
                url: '/Cart/RemoveFromCart',
                type: 'post',
                data: {
                    TourId: id
                },
                success: function (response) {
                    travel.notify(response.responseText, 'success');
                    loadHeaderCart();
                    loadData(true);
                }
            });
        });
    }

    function loadData() {
        $.ajax({
            url: '/Cart/GetCart',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                var template = $('#template-cart').html();
                var render = "";
                var totalAmount = 0;
                $.each(response, function (i, item) {
                    render += Mustache.render(template,
                        {
                            TourId: item.Tour.Id,
                            TourName: item.Tour.Name,
                            Image: item.Tour.Image,
                            Price: travel.formatNumber(item.Price, 0),
                            Quantity: item.Quantity,
                            Amount: travel.formatNumber(item.Price * item.Quantity, 0),
                            Url: '/' + item.Tour.SeoAlias + "-p." + item.Tour.Id + ".html"
                        });
                    totalAmount += item.Price * item.Quantity;
                });
                $('#lblTotalAmount').text(travel.formatNumber(totalAmount, 0) + " đ");
                if (render !== "")
                    $('#table-cart-content').html(render);
                else {
                    $('#table-cart-content').html(render);
                    travel.notify('Giỏ hàng trống!', 'error')
                }
            }
        });
        return false;
    }
}