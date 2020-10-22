var HomeController = function () {
    this.initialize = function () {
        registerEvents();
    }
    function registerEvents() {
        $('body').on('click', '.btnTourDetail', function (e) {
            e.preventDefault();
            var that = $(this).data('id');
            $.ajax({
                type: "GET",
                url: "/Tour/GetById",
                data: { id: that },
                dataType: "json",
                beforeSend: function () {
                    travel.startLoading();
                },
                success: function (response) {
                    var data = response;
                    var link = data.SeoAlias + '-' + 'p.' + data.Id + 'html';
                    $('#addToCart2').data('id', data.Id);
                    $('#TourName').text(data.Name);
                    $('#TourName').attr("href", (link));
                    $('#quick-desc').text(data.Description);
                    if (!(data.PromotionPrice > 0 || data.PromotionPrice == null)) {
                        $('#new-price').text(travel.formatNumber(data.PromotionPrice) + "đ");
                        $('#old-price').text(travel.formatNumber(data.Price) + "đ");
                    }else
                    $('#new-price').text(travel.formatNumber(data.Price) + "đ");
                    if (data.PromotionPrice == 0 || data.PromotionPrice == null) {
                        $('#promotion').hide();
                    } else {
                        $('#promotion').text('-' + Math.round(100 - (data.PromotionPrice / data.Price) * 100) + '%');
                    }
                    $("#Tour-image").attr("src", (data.Image));
                    $('#TourModal').modal('show');
                    travel.stopLoading();
                },
                error: function () {
                    travel.notify('Có lỗi xảy ra', 'error');
                    travel.stopLoading();
                }
            });
        });
        $('body').on('click', '.btnAddToCart', function (e) {
            e.preventDefault();
            var id = $(this).data('id');
            var quantity = 1
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
                    console.log(response);
                    travel.notify('Có lỗi xảy ra', 'error');
                }
            });
        });
    }

}