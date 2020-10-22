var BillController = function () {
    var cachedObj = {
        Tours: [],
        paymentMethods: [],
        billStatuses: []
    }
    this.initialize = function () {
        $.when(
            loadBillStatus(),
            loadPaymentMethod(),
            loadTours())
            .done(function () {
                loadData();
            });

        registerEvents();
    }

    function registerEvents() {
        $('#txtFromDate, #txtToDate').datepicker({
            autoclose: true,
            format: 'dd/mm/yyyy'
        });
        //Init validation
        $('#frmMaintainance').validate({
            errorClass: 'red',
            ignore: [],
            lang: 'VN-vi',
            rules: {
                txtCustomerName: { required: true },
                txtCustomerAddress: { required: true },
                txtCustomerMobile: { required: true },
                ddlBillStatus: { required: true }
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
        $("#btn-search").on('change', function () {
            loadData();
        });
        $("#btn-reset").on('click', function () {
            $('#txtFromDate').val('');
            $('#txtToDate').val('');
            $('#txtSearchKeyword').val('');
            travel.notify('Đã xóa', 'success');
            loadData();
        });

        $("#btnCancel").on('click', function (e) {
            e.preventDefault();
            var that = $('#hidId').val();
            travel.confirm('Xác nhận hủy đơn hàng?', function () {
                $.ajax({
                    type: "POST",
                    url: "/Admin/Bill/CancelBill",
                    data: {
                        billId: that
                    },
                    dataType: "json",
                    beforeSend: function () {
                        travel.startLoading();
                    }
                });
                $('#modal-detail').modal('hide');
                travel.notify('Đã hủy đơn hàng!', 'success');
                loadData(true);
                resetFormMaintainance();
                travel.stopLoading();
            });
        });
        $("#btn-create").on('click', function () {
            document.getElementById("btnSave").style.visibility = "visible";
            document.getElementById("btnCancel").style.visibility = "hidden";
            document.getElementById("btnPending").style.visibility = "hidden";
            document.getElementById("btnConfirm").style.visibility = "hidden";
            resetFormMaintainance();
            $('#ddlBillStatus').val(0);
            $('#modal-detail').modal('show');
        });
        $("ddlBillStatusFillter").on('change', function () {
            loadData(true);
        });
        $('#ddlBillStatusFillter').on('change', function () {
            loadData(true);
        });

        $('#btnConfirm').on('click', function (e) {
            var that = $('#hidId').val();
            $.ajax({
                type: "POST",
                url: "/Admin/Bill/ConfirmBill",
                data: {
                    billId: that
                },
                dataType: "json",
                beforeSend: function () {
                    loadData(true);
                    travel.startLoading();
                }
            });
            travel.notify('Thành công!', 'success');
            $('#modal-detail').modal('hide');
            resetFormMaintainance();
            loadData(true);
            travel.stopLoading();
        });

        $('body').on('click', '.btn-view', function (e) {
            e.preventDefault();
            var that = $(this).data('id');
            $.ajax({
                type: "GET",
                url: "/Admin/Bill/GetById",
                data: { id: that },
                beforeSend: function () {
                    travel.startLoading();
                },
                success: function (response) {
                    var data = response;
                    $('#hidId').val(data.Id);
                    $('#txtCustomerName').val(data.CustomerName);
                    $('#txtCustomerAddress').val(data.CustomerAddress);
                    $('#txtCustomerMobile').val(data.CustomerMobile);
                    $('#txtCustomerMessage').val(data.CustomerMessage);
                    $('#ddlPaymentMethod').val(data.PaymentMethod);
                    $('#customerId').val(data.CustomerId);
                    $('#txtCustomerEmail').val(data.CustomerEmail);
                    $('#ddlBillStatus').val(data.BillStatus);
                    var billDetails = data.BillDetails;
                    if (data.BillDetails != null && data.BillDetails.length > 0) {
                        var render = '';
                        var templateDetails = $('#template-table-bill-details').html();

                        $.each(billDetails, function (i, item) {
                            var Tours = getTourOptions(item.TourId);

                            render += Mustache.render(templateDetails,
                                {
                                    Id: item.Id,
                                    Tours: Tours,
                                    Quantity: item.Quantity
                                });
                        });
                        $('#tbl-bill-details').html(render);
                    }
                    switch (data.BillStatus) {
                        case 0:
                            document.getElementById("btnCancel").style.visibility = "hidden";
                            document.getElementById("btnPending").style.visibility = "hidden";
                            document.getElementById("btnConfirm").style.visibility = "visible";
                            document.getElementById("btnSave").style.visibility = "visible";
                            break;
                        case 1:
                            document.getElementById("btnCancel").style.visibility = "visible";
                            document.getElementById("btnPending").style.visibility = "visible";
                            document.getElementById("btnConfirm").style.visibility = "hidden";
                            document.getElementById("btnSave").style.visibility = "visible";
                            break;
                        case 2, 3, 4:
                            document.getElementById("btnCancel").style.visibility = "hidden";
                            document.getElementById("btnPending").style.visibility = "hidden";
                            document.getElementById("btnConfirm").style.visibility = "hidden";
                            document.getElementById("btnSave").style.visibility = "visible";
                            break;
                        default:
                    }
                    $('#BillId').text(data.Id);
                    $('#modal-detail').modal('show');
                    travel.stopLoading();
                },
                error: function (e) {
                    travel.notify('Lỗi! Vui lòng kiễm tra lại!', 'error');
                    travel.stopLoading();
                }
            });
        });

        $('#btnSave').on('click', function (e) {
            if ($('#frmMaintainance').valid()) {
                e.preventDefault();
                var id = $('#hidId').val();
                var userId = $('#userId').val();
                var customerId = $('#customerId').val();
                var customerName = $('#txtCustomerName').val();
                var customerEmail = $('#txtCustomerEmail').val();
                var customerAddress = $('#txtCustomerAddress').val();
                var customerId = $('#customerId').val();
                var customerMobile = $('#txtCustomerMobile').val();
                var customerMessage = $('#txtCustomerMessage').val();
                var paymentMethod = $('#ddlPaymentMethod').val();
                var billStatus = $('#ddlBillStatus').val();
                //bill detail

                var billDetails = [];
                $.each($('#tbl-bill-details tr'), function (i, item) {
                    billDetails.push({
                        Id: $(item).data('id'),
                        TourId: $(item).find('select.ddlTourId').first().val(),
                        Quantity: $(item).find('input.txtQuantity').first().val(),
                        BillId: id
                    });
                });

                $.ajax({
                    type: "POST",
                    url: "/Admin/Bill/SaveEntity",
                    data: {
                        Id: id,
                        BillStatus: billStatus,
                        CustomerAddress: customerAddress,
                        CustomerId: customerId,
                        UserId: userId,
                        CustomerMessage: customerMessage,
                        CustomerMobile: customerMobile,
                        CustomerEmail: customerEmail,
                        CustomerName: customerName,
                        PaymentMethod: paymentMethod,
                        Status: 1,
                        BillDetails: billDetails
                    },
                    dataType: "json",
                    beforeSend: function () {
                        travel.startLoading();
                    },
                    success: function (response) {
                        travel.notify('Thành công!', 'success');
                        $('#modal-detail').modal('hide');
                        resetFormMaintainance();
                        travel.stopLoading();
                        loadData(true);
                    },
                    error: function () {
                        travel.notify('Lỗi! Vui lòng kiễm tra lại!', 'error');
                        travel.stopLoading();
                    }
                });
                return false;
            }
        });

        $('#btnAddDetail').on('click', function () {
            var template = $('#template-table-bill-details').html();
            var Tours = getTourOptions(null);
            var render = Mustache.render(template,
                {
                    Id: 0,
                    Tours: Tours,
                    Quantity: 1,
                    Total: 0
                });
            $('#tbl-bill-details').append(render);
        });

        $('body').on('click', '.btn-delete-detail', function () {
            $(this).parent().parent().remove();
        });

        $("#btnExport").on('click', function () {
            var that = $('#hidId').val();
            travel.confirm('Xuất file?', function () {
                $.ajax({
                    type: "POST",
                    url: "/Admin/Bill/ExportExcel",
                    data: { billId: that },
                    beforeSend: function () {
                        travel.startLoading();
                    },
                    success: function (response) {
                        window.location.href = response;

                        travel.stopLoading();
                    }
                });
            });
        });
    };

    function loadBillStatus() {
        return $.ajax({
            type: "GET",
            url: "/admin/bill/GetBillStatus",
            dataType: "json",
            success: function (response) {
                cachedObj.billStatuses = response;
                var render = "";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Value + "'>" + item.Name + "</option>";
                });
                $('#ddlBillStatus').html(render);
                $('#ddlBillStatusFillter').html(render);
                
            }
        });
    }

    function loadPaymentMethod() {
        return $.ajax({
            type: "GET",
            url: "/admin/bill/GetPaymentMethod",
            dataType: "json",
            success: function (response) {
                cachedObj.paymentMethods = response;
                var render = "";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Value + "'>" + item.Name + "</option>";
                });
                $('#ddlPaymentMethod').html(render);
            }
        });
    }

    function loadTours() {
        return $.ajax({
            type: "GET",
            url: "/Admin/Tour/GetAll",
            dataType: "json",
            success: function (response) {
                cachedObj.Tours = response;
            },
            error: function () {
                travel.notify('Lỗi! Vui lòng kiễm tra lại!', 'error');
            }
        });
    }


    function getTourOptions(selectedId) {
        var Tours = "<select class='form-control ddlTourId'>";
        $.each(cachedObj.Tours, function (i, Tour) {
            if (selectedId === Tour.Id)
                Tours += '<option value="' + Tour.Id + '" selected="select">' + Tour.Name + '</option>';
            else
                Tours += '<option value="' + Tour.Id + '">' + Tour.Name + '</option>';
        });
        Tours += "</select>";
        return Tours;
    }

    function resetFormMaintainance() {
        $('#hidId').val(0);
        $('#txtCustomerName').val('');

        $('#txtCustomerAddress').val('');
        $('#txtCustomerMobile').val('');
        $('#txtCustomerMessage').val('');
        $('#ddlPaymentMethod').val('');
        $('#ddlCustomerId').val('');
        $('#ddlBillStatus').val('');
        $('#tbl-bill-details').html('');
    }

    function loadData(isPageChanged) {
        $.ajax({
            type: "GET",
            url: "/admin/bill/GetAllPaging",
            data: {
                status: $('#ddlBillStatusFillter').val(),
                startDate: $('#txtFromDate').val(),
                endDate: $('#txtToDate').val(),
                keyword: $('#txtSearchKeyword').val(),
                page: travel.configs.pageIndex,
                pageSize: travel.configs.pageSize
            },
            dataType: "json",
            beforeSend: function () {
                travel.startLoading();
            },
            success: function (response) {
                if (response.RowCount < 1) {
                    travel.notify('Không có dữ liệu!', 'primary');
                }
                var template = $('#table-template').html();
                var render = "";
                if (response.RowCount > 0) {
                    $.each(response.Results, function (i, item) {
                        render += Mustache.render(template, {
                            CustomerName: item.CustomerName,
                            Id: item.Id,
                            PaymentMethod: getPaymentMethodName(item.PaymentMethod),
                            DateCreated: travel.dateFormatJson(item.DateCreated),
                            BillStatus: getBillStatusName(item.BillStatus),
                            DateCreated: travel.dateFormatJson(item.DateCreated),
                            CustomerEmail: item.CustomerEmail,
                            CustomerPhone: item.CustomerMobile
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
                    $("#lbl-total-records").text('0');
                    $('#tbl-content').html('');
                }
                travel.stopLoading();
            },
            error: function (status) {
                console.log(status);
            }
        });
    };
    function getPaymentMethodName(paymentMethod) {
        var method = $.grep(cachedObj.paymentMethods, function (element, index) {
            return element.Value == paymentMethod;
        });
        if (method.length > 0)
            return method[0].Name;
        else return '';
    }
    function getBillStatusName(status) {
        var status = $.grep(cachedObj.billStatuses, function (element, index) {
            return element.Value == status;
        });
        if (status.length > 0)
            return status[0].Name;
        else return '';
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