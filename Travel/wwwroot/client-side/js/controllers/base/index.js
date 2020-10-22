var BaseController = function () {
    this.initialize = function () {
        registerEvents();
    }

    function registerEvents() {
        $('#addToCart').on('click', function (e) {
            e.preventDefault();
            var id = $(this).data('id');
            var quantity = $('#qtybutton').val();
            $.ajax({
                url: '/Cart/AddToCart',
                type: 'post',
                data: {
                    TourId: id,
                    quantity: quantity
                },
                success: function (response) {
                    travel.notify('Đã thêm', 'success');
                    loadHeaderCart();
                },
                error: function (response) {
                    console.log(response);
                    travel.notify('Có lỗi xảy ra', 'error');
                }
            });
        });
        $('#addToCart2').on('click', function (e) {
            e.preventDefault();
            var id = $(this).data('id');
            var quantity = 1;
            $.ajax({
                url: '/Cart/AddToCart',
                type: 'post',
                data: {
                    TourId: id,
                    quantity: quantity,
                },
                success: function (response) {
                    travel.notify('Đã thêm', 'success');
                    loadHeaderCart();
                },
                error: function (response) {
                    travel.notify('Có lỗi xảy ra', 'error');
                }
            });
        });
    }

    function loadHeaderCart() {
        totalQty = 0;
        $.ajax({
            url: '/Cart/GetCart',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                $.each(response, function (i, item) {
                    totalQty +=  item.Quantity;
                });
                $('#cart-item-display').text(totalQty);
               
            }
        });
        return false;
    }

}