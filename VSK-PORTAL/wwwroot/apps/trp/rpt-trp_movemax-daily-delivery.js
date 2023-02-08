'use strict';

const url_api = "http://localhost:49705/";
const api_key = "cOaI7TF@3am9Gc?89hqC(18)h{{G$dsaVt0$FnxpCf0vO%I2{Fp8?Y7rBcRqNNzv";
const url_trp_tms_job_search = url_api + 'v1/trp_tms_job_search';
const url_tms_job_get = 'https://vsk.tms-vcargo.com/api/tms/v1/public/dailydelivery/report';
const url_employee_movemax_get = "https://vsk.movemax.me/public-api/tms/v1/employee";
const url_vehicle_movemax_get = "https://vsk.movemax.me/public-api/tms/v1/vehicle";
const url_routeline_movemax_get = "https://vsk.movemax.me/public-api/tms/v1/routeline";
const url_shipmentdaily_movemax_get = "https://vsk.movemax.me/public-api/tms/v1/shipmentdaily/search";
const url_manifestnote_close_manifast = "https://vsk.movemax.me/public-api/tms/v1/manifestnote/close-manifest";

const url_vsk_shipmentdaily_create = url_api + '/v1/MM_ShipmentDaily_Create';
const url_vsk_manifestnotejob_list = url_api + '/v1/MM_ManifestNote_List';

const URL_TMS_JOB_DELIVERY_DAILY_LIST = url_api + '/v1/TMS_JOB_DELIVERY_DAILY_LIST';

const objProfile = JSON.parse(localStorage.getItem('objProfile'));

let ShipmentdailyList,DriverMessengerList, PlateList, RoutelineList, MM_manifestNoteList, MM_manifestNoteMulit, ProductMulitList = [];
let table_list;
let driver_plate_list = [];

let customElement = $("<div>", {
    "css": {
        "border": "2px solid",
        "font-size": "14px",
        "text-align": "center",
        "padding": '7px'

    },
    "text": 'Please Wait...'
});

$(document).ready(async function () {

    await $.init();
    await $.list();
    await $.master_get();
});


$.init = async function () {

    DriverMessengerList = await $.MM_Employee_Get("" /*code*/, "" /*positionName*/, "พนักงานขับรถมอเตอร์ไซค์" /*groupName*/);
    RoutelineList = await $.MM_Routeline_Get("" /*code*/, "" /*name*/);
    PlateList = await $.MM_Plate_Get("" /*licensePlate*/, "" /*name*/, "" /*province*/, "" /*vehicleBrandName*/, "" /*vehicleModelName*/, "" /*vehicleKind*/);

    console.log('DriverMessengerList', DriverMessengerList.data);
    console.log('RoutelineList', RoutelineList.data);
    console.log('PlateList', PlateList.data);

    $('#delivery_type').select2()

    $('.date-picker').daterangepicker({
        locale: {
            format: 'DD/MM/YYYY'
        },
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    });

    $('#frm_data').submit(async function (e) {

        e.preventDefault();

        $("#global-loader").fadeIn("slow");

        //ShipmentdailyList = await $.MM_Shipmentdaily_Get();

        //console.log('ShipmentdailyList', ShipmentdailyList.data);

        await $.list(); //after search

    });

    $('#btn-refresh-movemax').off('click').on('click', function (e) {

        e.preventDefault();

        swal({
            title: 'Are you sure?',
            text: "Want to Synchronize from VSM Data ?!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, ok",
            cancelButtonText: "No, cancel",
            cancelButtonColor: '#d33',
            closeOnConfirm: true,
            closeOnCancel: true
        },
            async function (isConfirm) {

                if (isConfirm) {

                    ShipmentdailyList = await $.MM_Shipmentdaily_Get();

                    console.log('ShipmentdailyList', ShipmentdailyList.data);

                    await $.MM_Shipmentdaily_Sync();

                    //await $.list();

                    await $('#frm_data').submit();

                } else {

                    await swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                }

            });

    })

    ShipmentdailyList = await $.MM_Shipmentdaily_Get();

    console.log('ShipmentdailyList', ShipmentdailyList.data);
};

$.list = async function () {

    let job_start_date = $('#job_date').val() != '' ? moment($('#job_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00:00.000' : moment().format('YYYY-MM-DD') + ' 00:00:00.000';  //ถ้าไม่เลือกจะเป็นค่าว่าง
    let job_end_date = $('#job_date').val() != '' ? moment($('#job_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59:59.000' : moment().format('YYYY-MM-DD') + ' 23:59:59.000';

    let url = new URL(url_vsk_manifestnotejob_list);

    url.search = new URLSearchParams({
        job_start_date: job_start_date,
        job_end_date: job_end_date,
        f_driverCode: $('#driver_id').val(),
        currentStatus: $('#sh_derivery_status').val(),
        f_endRouteLineCode: $('#route_no').val(),
        f_vehicleCode: $('#job_plate').val(),
        f_receiver_code: $('#emmas_code').val(),
        manifestNoteNumber: $('#job_no').val(),
        shippingNoteNumber: $('#job_ref').val(),
        p_orderNo: $('#job_inv').val(),
        p_packageNo: $('#job_pk').val(),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        if (result.status === 'Error') {

            $("#global-loader").fadeOut("slow");

        } else {

            if (result.length > 0) {

                let last_updatetime = moment(result.data[0]['last_updatetime'], 'YYYY/MM/DD hh:mm:ss').format('DD-MM-YYYY hh:mm:ss');
                $('.last-time').html(last_updatetime);

            }

            table_list = $('#table-list').DataTable({
                "data": result.data,
                dom: '<Bf<t>lip>',
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "ค้นหา..."
                },
                deferRender: true,
                ordering: true,
                pageLength: 10,
                bDestroy: true,
                autoWidth: false,
                buttons: [
                    'copyHtml5',
                    {
                        extend: 'excelHtml5',
                        title: '',
                        filename: 'REPORT_Job_Daily_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                        exportOptions: {
                            columns: [2, 3, 4, 5, 8, 9, 10, 11, 13, 14, 15, 17, 19, 20, 21, 24]
                        }
                    },
                ],
                lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                columns: [
                    {
                        title: "#",
                        class: "tx-center align-middle",
                        width: "5%",
                        render: function (data, type, row, meta) {
                            // return (meta.row) + 1;
                            return '<a href="javascript:void(0)"><i class="si si si-plus show-detail tx-primary tx-15"></i></a>';
                        }
                    }, //0

                    {
                        title: "<div class='text-center'>DOCUMENT</div>",
                        class: "tx-left align-top",
                        width: "25%",
                        //visible: false,
                        render: function (data, type, row, meta) {

                            let documentDate = moment(row.f_documentDate, 'YYYY/MM/DD').format('DD/MM/YYYY');
                            //let manifestNoteNumber = row.manifestNoteNumber;
                            //let shippingNoteNumber = row.shippingNoteNumber;
                            let f_endRouteLineCode = row.f_endRouteLineCode;
                            let manifestNoteNumber = row.r_mm_manifestNoteNumber;
                            let shippingNoteNumber = row.f_code;
                            let routeLineName = row.routeLineName;
                            let p_orderNo = row.p_orderNo;
                            let p_packageNo = row.p_packageNo;
                            let cod = row.cod;

                            let routeline_get = RoutelineList.data
                            function isCherries(fruit) {
                                return fruit.code === f_endRouteLineCode;
                            }
                            let route_data = routeline_get.find(isCherries)
                            let route_concat = $.trim(route_data.nameTh);

                            let dt = ''
                            dt += '<div class="media mt-0" >'
                            //dt += '<div class="d-flex mr-3">'
                            dt += '<div class="tx-center mr-1">'
                            dt += '<a href="https://motoridersuniverse.com/uploads/blogs/83/0e/960/44011061ba1959c830e.jpg" target="_blank">'
                            dt += '<img class="media-object avatar avatar-md brround w-7 h-7" alt="64x64" src="https://motoridersuniverse.com/uploads/blogs/83/0e/960/44011061ba1959c830e.jpg">'
                            dt += '</a>'
                            //dt += '<span class="mt-3 tx-dark badge badge-success-transparent bd bd-success">' + cod + ' ฿</span>'
                            dt += '</div>'
                            dt += '<div class="media-body">'
                            dt += '<div class="d-flex">'
                            dt += '<a class="mr-1 tx-14"><i class="las la-book text-warning"></i></a>' + '<span class="tx-14 tx-bold mt-0 mb-0 font-weight-semibold">' + manifestNoteNumber + '</span>'
                            dt += '</div>'

                            dt += '<div class="d-flex mb-1">'
                            dt += '<a class="mr-1 tx-13"><i class="las la-caret-right tx-dark"></i></a>' + '<a href="https://vsk.movemax.me/#/tracking?code=' + shippingNoteNumber + '" target="_blank"><span class="tx-13 text-primary mb-0"><u>' + shippingNoteNumber + '</u></span></a>'
                            dt += '<span class="tx-12 ml-auto">'
                            dt += '<a class="mr-1 tx-14"><i class="las la-calendar-day  tx-primary"></i></a>' + '<span class="mt-0  font-weight-semibold tx-12">' + documentDate + '</span>'
                            dt += '</span>'
                            dt += '</div>'

                            dt += '<div class="d-flex mb-1">'
                            dt += '<a class="mr-1 tx-12"><i class="las la-file-invoice-dollar tx-purple"></i></a>' + '<span class="tx-12">' + p_orderNo + '</span>'
                            dt += '<span class="tx-12 ml-auto">'
                            dt += '<a class="mr-1 tx-12"><i class="las la-receipt tx-info"></i></a>' + '<span class="font-weight-semibold tx-12">' + p_packageNo + '</span>'
                            dt += '</span>'
                            dt += '</div>'

                            //dt += '<div class="d-sm-flex justify-content-between align-items-center">'
                            //dt += '<div class="d-flex align-items-center" >'
                            //dt += '<i class="las la-file-invoice-dollar text-purple tx-14 mr-1"></i>'
                            //dt += '<span class="tx-12">' + p_orderNo + '</span>'
                            //dt += '</div >'
                            //dt += '<a class="mr-1 tx-12"><i class="las la-receipt tx-info"></i></a>' + '<span class="tx-12 mb-0">' + p_packageNo + '</span>'
                            //dt += '</div >'


                            dt += '<hr class="mb-1 mt-1">'
                            dt += '<div class="d-flex">'
                            dt += '<a class="mr-1 tx-12"><i class="las la-money-bill tx-success"></i></a>' + '<p class="mb-0 tx-13">' + cod + ' ฿</p>'
                            dt += '<span class="tx-12 ml-auto">'
                            dt += '<span class="badge bd bd-primary tx-primary "><u>' + route_concat + '</u></span>'
                            dt += '</span>'
                            dt += '</div>'
                            dt += '</div>';


                            //dt += '<div class="d-sm-flex justify-content-between align-items-center">'
                            //dt += '<div class="d-flex align-items-center" >'
                            //dt += '<i class="las la-money-bill text-success tx-14 mr-1"></i>'
                            //dt += '<p class="mb-0 tx-13">' + cod + ' ฿</p>'
                            //dt += '</div >'
                            //dt += '<span class="badge bd bd-primary tx-primary "><u>' + routeLineName + '</u></span>'
                            //dt += '</div >'

                            //dt += '<hr class="mb-1 mt-1">'
                            //dt += '<div class="d-flex">'
                            //dt += '<a class="mr-1 tx-12"><i class="las la-file-invoice-dollar tx-success"></i></a>' + '<span class="tx-12 mb-0">' + p_orderNo + '</span>'
                            //dt += '<span class="tx-12 ml-auto">'
                            //dt += '<a class="mr-1 tx-12"><i class="las la-receipt tx-info"></i></a>' + '<span class="tx-12 mb-0">' + p_packageNo + '</span>'
                            //dt += '</span>'
                            //dt += '</div>'
                            //dt += '</div>';

                            return dt;
                        }
                    }, //
                    {
                        title: "<div class='text-center'>DRIVER</div>",
                        class: "tx-left align-top",
                        width: "20%",
                        //visible: false,
                        render: function (data, type, row, meta) {

                            let f_code = row.f_code;

                            let f_driverCode = row.f_driverCode;
                            let f_vehicleCode = row.f_vehicleCode;
                            let p_orderNo = row.p_orderNo;
                            let p_packageNo = row.p_packageNo;

                            let driver_code = f_driverCode
                            let driver_get = DriverMessengerList.data
                            function isCherries(fruit) {
                                return fruit.code === driver_code;
                            }
                            let emp_data = driver_get.find(isCherries)
                            let driver_concat = $.trim(emp_data.firstnameTh + ' ' + emp_data.lastnameTh);
                            //let driver_concat = $.trim(emp_data.firstnameTh + ' ' + emp_data.lastnameTh + ' (' + emp_data.nicknameTh + ')' );
                            let driver_call = $.trim(emp_data.tel);

                            let dt = ''
                            dt += '<div class="media mt-0" >'
                            dt += '<div class="media-body">'
                            dt += '<div class="d-flex">'
                            dt += '<a class="mr-1 tx-15"><i class="las la-id-card-alt text-dark"></i></a>' + '<span class="tx-14 mt-0 mb-0 mr-1 tx-bold">' + f_driverCode + '</span>' //+ '<span class="tx-14 mt-0 mb-0">' + driver_concat + '</span>'
                            dt += '<span class="tx-12 ml-auto">'
                            dt += '<span class="mt-0 mb-0 font-weight-semibold tx-14">' + driver_concat + '</span>'
                            dt += '</span>'
                            dt += '</div>'
                            dt += '<hr class="mb-1 mt-1">'
                            dt += '<div class="d-flex">'
                            dt += '<a class="mr-1 tx-15"><i class="las la-phone tx-dark"></i></a>' + '<span class="tx-14 text-muted mb-0">' + driver_call + '</span>'
                            dt += '<span class="tx-12 ml-auto">'
                            dt += '<a class="mr-1 tx-15"><i class="las la-motorcycle tx-primary tx-bold"></i></a>' + '<span class="mt-0 mb-0 font-weight-semibold tx-14">' + f_vehicleCode + '</span>'
                            dt += '</span>'
                            dt += '</div>'
                            //dt += '<div class="d-flex">'
                            //dt += '<a class="mr-1 tx-13"><i class="las la-motorcycle tx-dark tx-bold"></i></a>' + '<span class="tx-13 text-muted mb-0">' + f_vehicleCode + '</span>'
                            //dt += '</div>'

                            dt += '</div>';

                            return dt;
                        }
                    }, //   
                    {
                        title: "<div class='text-center'>customer</div>",
                        class: "tx-left align-top",
                        width: "35%",
                        //visible: false,
                        render: function (data, type, row, meta) {

                            let f_receiver_code = row.f_receiver_code;
                            let f_receiver_name = row.f_receiver_name;
                            //let f_receiver_addressDescription = row.f_receiver_addressDescription;
                            let f_receiver_address = row.f_receiver_addressDescription + row.f_receiver_address;

                            let dt = ''
                            dt += '<div class="media mt-0" >'
                            dt += '<div class="media-body">'
                            dt += '<div class="d-flex">'
                            dt += '<a class="mr-1 tx-15"><i class="las la-user-tie text-dark"></i></a>' + '<span class="tx-14 mt-0 mb-0 mr-1 tx-bold">' + f_receiver_code + '</span>' + '<span class="tx-14 mt-0 mb-0">' + f_receiver_name + '</span>'
                            dt += '</div>'
                            dt += '<hr class="mb-1 mt-1">'
                            dt += '<div class="d-flex">'
                            dt += '<a class="mr-1 tx-15"><i class="las la-map tx-primary tx-bold"></i></a>' + '<span class="mt-0 mb-0 font-weight-semibold tx-13">' + f_receiver_address + '</span>'
                            dt += '</div>'
                            //dt += '<div class="d-flex">'
                            //dt += '<a class="mr-1 tx-15"><i class="las la-motorcycle tx-primary tx-bold"></i></a>' + '<span class="mt-0 mb-0 font-weight-semibold tx-14">' + f_receiver_address + '</span>'
                            //dt += '</div>'
                            dt += '</div>';

                            return dt;
                        }
                    }, //
                    {
                        title: "<div class='text-center'>ACTION</div>",
                        class: "tx-left align-middle",
                        width: "20%",
                        //visible: false,
                        render: function (data, type, row, meta) {

                            let currentStatusText = row.currentStatusText
                            let currentStatusDateText = row.currentStatusDateText
                            let currentStatusTimeText = row.currentStatusTimeText
                            let f_created_by = row.f_created_by
                            let f_created_date = moment(row.f_created_date).format("DD-MM-YYYY")
                            let f_created_time = moment(row.f_created_date).format("HH:mm")

                            let tx, cl = ''
                            let currentStatus = row.currentStatus
                            if (currentStatus == '1' || currentStatus == '2') {
                                cl = 'dark'
                            } else if (currentStatus == '3' || currentStatus == '4') {
                                cl = 'success'
                            } else if (currentStatus == '5') {
                                cl = 'danger'
                            } else {
                                cl = 'secondary'
                            }

                            return '<div class="row justify-content-center">' +
                                '<div class="col-12">' +
                                '<span class="tx-12 w-50 badge bg-purple tx-white">' + 'เปิดเอกสาร' + '</span>' +
                                '<span class="tx-12 w-50 badge badge-primary">' + 'สถานะ' + '</span>' +
                                '<span class="tx-12 w-50 badge badge-warning">' + f_created_by + '</span>' +
                                '<span class="tx-12 w-50 badge badge-' + cl + '">' + currentStatusText + '</span>' +
                                '<span class="tx-9 w-50 badge bd bd-1 bd-warning">' + f_created_date + '</span>' +
                                '<span class="tx-12 w-50 badge bd bd-1 bd-' + cl + '">' + currentStatusDateText + '</span>' +
                                '<span class="tx-9 w-50 badge bd bd-1 bd-warning">' + f_created_time + '</span>' +
                                '<span class="tx-9 w-50 badge bd bd-1 bd-' + cl + '">' + currentStatusTimeText + '</span>' +
                                //'<hr class="mb-1 mt-1">' +
                                '<button class="btn btn-sm btn-danger w-100 btn-action job-delete mt-1">' + 'DELETE' + '</button>' +
                                '</div >' +

                                '</div >';
                        }
                    }, //
                    {
                        data: "f_documentDate",
                        visible: false,
                    }, //f_documentDate  
                    {
                        data: "f_trans_id",
                        visible: false,
                    }, //f_trans_id
                    {
                        data: "f_endRouteLineCode",
                        visible: false,
                    }, //f_endRouteLineCode
                    {
                        data: "f_driverCode",
                        visible: false,
                    }, //f_driverCode
                    {
                        data: "f_vehicleCode",
                        visible: false,
                    }, //f_vehicleCode
                    {
                        data: "f_vehicleFuelUseRate",
                        visible: false,
                    }, //f_vehicleFuelUseRate
                    {
                        data: "f_vehiclePercentReFuel",
                        visible: false,
                    }, //f_vehiclePercentReFuel
                    {
                        data: "f_startType",
                        visible: false,
                    }, //f_startType
                    {
                        data: "f_code",
                        visible: false,
                    }, //f_code
                    {
                        data: "f_receiver_code",
                        visible: false,
                    }, //f_receiver_code
                    {
                        data: "f_receiver_name",
                        visible: false,
                    }, //f_receiver_name
                    {
                        data: "f_receiver_addressDescription",
                        visible: false,
                    }, //f_receiver_addressDescription
                    {
                        data: "f_receiver_address",
                        visible: false,
                    }, //f_receiver_address
                    {
                        data: "f_created_by",
                        visible: false,
                    }, //f_created_by
                    {
                        data: "f_created_date",
                        visible: false,
                    }, //f_created_date
                    {
                        data: "p_trans_id",
                        visible: false,
                    }, //p_trans_id
                    {
                        data: "p_shippingNoteResCode",
                        visible: false,
                    }, //p_shippingNoteResCode
                    {
                        data: "p_code",
                        visible: false,
                    }, //p_code
                    {
                        data: "p_name",
                        visible: false,
                    }, //p_name
                    {
                        data: "p_orderNo",
                        visible: false,
                    }, //p_orderNo
                    {
                        data: "p_packageNo",
                        visible: false,
                    }, //p_packageNo
                    {
                        data: "p_cod",
                        visible: false,
                    }, //p_cod
                    {
                        data: "p_description",
                        visible: false,
                    }, //p_description
                    {
                        data: "p_qty",
                        visible: false,
                    }, //p_qty
                    {
                        data: "p_unitCode",
                        visible: false,
                    }, //p_unitCode
                    {
                        data: "r_trans_id",
                        visible: false,
                    }, //r_trans_id
                    {
                        data: "r_mm_manifestNoteId",
                        visible: false,
                    }, //r_mm_manifestNoteId
                    {
                        data: "r_mm_shippingNoteResId",
                        visible: false,
                    }, //r_mm_shippingNoteResId
                    {
                        data: "r_mm_shippingNoteResCode",
                        visible: false,
                    }, //r_mm_shippingNoteResCode
                    {
                        data: "r_created_datetime",
                        visible: false,
                    }, //r_created_datetime
                    {
                        data: "cod",
                        visible: false,
                    }, //cod
                    {
                        data: "currentStatus",
                        visible: false,
                    }, //currentStatus 
                    {
                        data: "currentStatusText",
                        visible: false,
                    }, //currentStatusText
                    {
                        data: "currentStatusDateText",
                        visible: false,
                    }, //currentStatusText
                    {
                        data: "currentStatusTimeText",
                        visible: false,
                    }, //currentStatusText
                    {
                        data: "driverName",
                        visible: false,
                    }, //currentStatusText
                    {
                        data: "endRouteLineId",
                        visible: false,
                    }, //currentStatusText
                    {
                        data: "routeLineName",
                        visible: false,
                    }, //currentStatusText
                    {
                        data: "startDeliveryDateText",
                        visible: false,
                    }, //currentStatusText   
                    {
                        data: "endDeliveryDateText",
                        visible: false,
                    }, //currentStatusText
                    {
                        data: "manifestNoteDocumentDateText",
                        visible: false,
                    }, //currentStatusText
                    {
                        data: "manifestNoteNumber",
                        visible: false,
                    }, //currentStatusText
                    {
                        data: "manifestNoteTypeName",
                        visible: false,
                    }, //currentStatusText
                    {
                        data: "paymentTypeName",
                        visible: false,
                    }, //currentStatusText
                    {
                        data: "productName",
                        visible: false,
                    }, //currentStatusText
                    {
                        data: "qty",
                        visible: false,
                    }, //currentStatusText
                    {
                        data: "receiverName",
                        visible: false,
                    }, //currentStatusText
                    {
                        data: "receiverAddress",
                        visible: false,
                    }, //currentStatusText
                    {
                        data: "senderName",
                        visible: false,
                    }, //currentStatusText
                    {
                        data: "shippingNoteNumber",
                        visible: false,
                    }, //currentStatusText
                    {
                        data: "vehicleLicensePlate",
                        visible: false,
                    }, //currentStatusText
                ],
                initComplete: function (settings, json) {

                    $(".loader-spinner").addClass("d-none");

                    $("#global-loader").fadeOut("slow");

                    $('#table-list tbody').off('click', '.show-detail').on('click', '.show-detail', async function (e) {

                        e.preventDefault()

                        var data = table_list.row($(this).parents('tr')).data();
                        var tr = $(this).closest('tr');
                        var row = table_list.row(tr);
                        console.log(data)
                        //$.Frm_Memo(data.job_no);

                        if (row.child.isShown()) {

                            row.child.hide();
                            tr.removeClass('shown');

                        }
                        else {

                            $.pck_inv(row.child, data);
                            tr.addClass('shown');
                        }

                    });

                    $('#table-list tbody').off('click', '.job-delete').on('click', '.job-delete', async function (e) {

                        e.preventDefault()

                        var data = table_list.row($(this).parents('tr')).data();

                        /*if (data.record_status == 1) {*/

                        swal({
                            title: "โปรดยืนยันอีกครั้ง !",
                            text: "ต้องการการลบเอกสารนี้หรือไม่",
                            type: "warning",
                            showCancelButton: true,
                            showLoaderOnConfirm: true,
                            confirmButtonClass: "btn-danger",
                            confirmButtonText: "ใช่, ยันยืน",
                            cancelButtonText: "ไม่, ยกเลิก",
                            cancelButtonColor: '#d33',
                            closeOnConfirm: false,
                            closeOnCancel: false

                        }, function (isConfirm) {

                            if (isConfirm) {

                                $.MM_ManifestNote_Close(data.r_mm_manifestNoteNumber, data.f_code);

                            } else {

                                swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                            }

                        });
                        /*}*/

                    });

                },
            });

        }
    })

};


$.MM_Shipmentdaily_Get = async function () {

    let shippingNoteNumber = ""
    let manifestNoteNumber
    let vehicleLicense
    let driverName
    let deliveryProjectCode
    let startDocumentDate
    let endDocumentDate
    let underDistributionCenterCode

    let job_start_date = $('#job_date').val() != '' ? moment($('#job_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + 'T00:00:00.00Z' : moment().format('YYYY-MM-DD') + ' 00:00:00.000';  //ถ้าไม่เลือกจะเป็นค่าว่าง
    let job_end_date = $('#job_date').val() != '' ? moment($('#job_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + 'T23:59:59.00Z' : moment().format('YYYY-MM-DD') + ' 23:59:59.000';

    let result = await fetch(url_shipmentdaily_movemax_get, {
        method: "POST",
        headers: {
            Authorization: api_key,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "shippingNoteNumber": "",
            "manifestNoteNumber": "",
            "vehicleLicense": "",
            "driverName": "",
            "deliveryProjectCode": 'VSM-001',
            "startDocumentDate": job_start_date,
            "endDocumentDate": job_end_date,
            "underDistributionCenterCode": 'VSM'
        }),
    }).then((response) => {
        return response.json();
    }).then((data) => {
        return data;

        //console.log(data)
    });

    return result;

};

$.MM_Shipmentdaily_Sync = async function () {

    var data_list = [];

    let ref_id = $.uuid();

    $.each(ShipmentdailyList.data, function (key, val) {

        data_list.push({
            'cod': val['cod'],
            'currentStatus': val['currentStatus'],
            'currentStatusDate': val['currentStatusDate'],
            'currentStatusDateText': val['currentStatusDateText'],
            'currentStatusText': val['currentStatusText'],
            'currentStatusTimeText': val['currentStatusTimeText'],
            'deliveryPrice': val['deliveryPrice'],
            'deliveryProjectId': val['deliveryProjectId'],
            'deliveryProjectName': val['deliveryProjectName'],
            'driverName': val['driverName'],
            'endDeliveryDate': val['endDeliveryDate'],
            'endDeliveryDateText': val['endDeliveryDateText'],
            'endRouteLineId': val['endRouteLineId'],
            'id': val['id'],
            'manifestNoteDocumentDate': val['manifestNoteDocumentDate'],
            'manifestNoteDocumentDateText': val['manifestNoteDocumentDateText'],
            'manifestNoteNumber': val['manifestNoteNumber'],
            'manifestNoteTypeName': val['manifestNoteTypeName'],
            'manifestNoteUnderDcName': val['manifestNoteUnderDcName'],
            'merchantName': val['merchantName'],
            'paymentTypeName': val['paymentTypeName'],
            'pointAddress': val['pointAddress'],
            'pointCode': val['pointCode'],
            'pointName': val['pointName'],
            'productName': val['productName'],
            'qty': val['qty'],
            'qtyPics': val['qtyPics'],
            'receiverAddress': val['receiverAddress'],
            'receiverName': val['receiverName'],
            'routeLineName': val['routeLineName'],
            'senderAddress': val['senderAddress'],
            'senderName': val['senderName'],
            'shippingNoteDate': val['shippingNoteDate'],
            'shippingNoteDateText': val['shippingNoteDateText'],
            'shippingNoteNumber': val['shippingNoteNumber'],
            'startDeliveryDate': val['startDeliveryDate'],
            'startDeliveryDateText': val['startDeliveryDateText'],
            'underDistributionCenterId': val['underDistributionCenterId'],
            'vehicleLicensePlate': val['vehicleLicensePlate'],
            'volume': val['volume'],
            'weight': val['weight'],
            'ref_id': ref_id,
            'last_updatetime': moment().format(),
        });

    });

    fetch(url_vsk_shipmentdaily_create, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data_list),
    }).then((response) => {
        return response.json();
    }).then((data) => {

        $("#global-loader").fadeOut("slow");

        swal({
            title: "สำเร็จ!",
            text: "ทำรายการสำเร็จ",
            type: 'success',
            timer: 500,
            showConfirmButton: false
        });

        toastr.success('Save Successfully!', function () {

            $.list();

        });

        $.LoadingOverlay("hide");

        return data;
    }).catch((data) => {
        return data;
    })

};


$.MM_Employee_Get = async function (code, positionName, groupName) {

    let result = await fetch(url_employee_movemax_get, {
        method: "POST",
        headers: {
            Authorization: api_key,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: null,
            code: code == "" ? null : code,
            firstname: null,
            lastname: null,
            positionName: positionName == "" ? null : positionName,
            groupName: groupName == "" ? null : groupName,
            employeeType: 1,
            distributionCenterCode: null,
            companyAcronym: null,
            subCode: null,
            pagination: {
                limitItem: 100,
                currentPage: 1,
            },
        }),
    }).then((response) => {
        return response.json();
    }).then((data) => {
        return data;

        //console.log(data)
    });

    return result;

};

$.MM_Plate_Get = async function (licensePlate, name, province, vehicleBrandName, vehicleModelName, vehicleKind) {

    let result = await fetch(url_vehicle_movemax_get, {
        method: "POST",
        headers: {
            Authorization: api_key,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: null,
            licensePlate: licensePlate == "" ? null : licensePlate,
            name: name == "" ? null : name,
            province: province == "" ? null : province,
            vehicleBrandName: vehicleBrandName == "" ? null : vehicleBrandName,
            vehicleModelName: vehicleModelName == "" ? null : vehicleModelName,
            vehicleKind: vehicleKind == "" ? null : vehicleKind,
            vehicleTypeCode: null,
            vehicleGroupName: null,
            ownerType: null,
            vehicleCompanyAcronym: null,
            vehicleSubCode: null,
            pagination: {
                limitItem: 1000,
                currentPage: 1,
            },
        }),
    }).then((response) => {
        return response.json();
    }).then((data) => {
        return data;

        //console.log(data)
    });

    return result;

};

$.MM_Routeline_Get = async function (code, name) {

    let result = await fetch(url_routeline_movemax_get, {
        method: "POST",
        headers: {
            Authorization: api_key,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: null,
            code: code == "" ? null : code,
            name: null,
            pagination: {
                totalItem: 0,
                limitItem: 100,
                currentPage: 1,
            },
        }),
    }).then((response) => {
        return response.json();
    }).then((data) => {
        return data;

        //console.log(data)
    });

    return result;

};


$.MM_ManifestNote_Close = async function (manifestNoteNumber, shippingNoteNumber) {

    //let result = await fetch(url_manifestnote_close_manifast, {
    //    method: "POST",
    //    headers: {
    //        Authorization: api_key,
    //        "Content-Type": "application/json",
    //    },
    //    body: JSON.stringify({
    //        manifestNoteNumber: manifestNoteNumber,
    //        shipmentList: {
    //            shippingNoteNumber: shippingNoteNumber,
    //            state: 3,
    //        },
    //    }),
    //}).then((response) => {
    //    return response.json();
    //}).then((data) => {
    //    return data;

    //    //console.log(data)
    //});

    //return result;

    let citem = [
        {
            "manifestNoteNumber": manifestNoteNumber,
            "shipmentList": [
                {
                    "shippingNoteNumber": shippingNoteNumber,
                    "state": 3,
                }
            ]
        }
    ];

    let result = await fetch(url_manifestnote_close_manifast, {
        method: "POST",
        headers: {
            Authorization: api_key,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(citem),
    }).then((response) => {

        console.log('response', response)

        $("#global-loader").fadeOut();

        if (response.status == 200) {

            swal({
                title: "สำเร็จ!",
                text: "ทำรายการสำเร็จ",
                type: 'success',
                timer: 500,
                showConfirmButton: false
            });

        } else {

            swal({
                title: 'เกิดข้อผิดพลาด!',
                text: 'ไม่สามารถส่งข้อมูลขึ้น MOVEMAX กรุณาติดต่อเจ้าหน้าที่',
                type: 'error',
                confirmButtonColor: '#57a94f'
            })

        }

        return response.json();

    }).then((data) => {

        console.log('then', data)

        return data;

    }).catch((data) => {

        return data;

    });

    return result;
    console.log('result', result)
};


$.list_movemax = async function () {

    table_list = $('#table-list').DataTable({
        "data": ShipmentdailyList.data,
        dom: '<Bf<t>lip>',
        language: {
            search: "_INPUT_",
            searchPlaceholder: "ค้นหา..."
        },
        deferRender: true,
        ordering: true,
        pageLength: 10,
        bDestroy: true,
        autoWidth: false,
        buttons: [
            'copyHtml5',
            {
                extend: 'excelHtml5',
                title: '',
                filename: 'REPORT_Job_Daily_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                exportOptions: {
                    columns: [2, 3, 4, 5, 8, 9, 10, 11, 13, 14, 15, 17, 19, 20, 21, 24]
                }
            },
        ],
        lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        columns: [
            {
                title: "#",
                class: "tx-center align-middle",
                render: function (data, type, row, meta) {
                    // return (meta.row) + 1;
                    return '<a href="javascript:void(0)"><i class="si si si-plus show-detail tx-primary tx-15"></i></a>';
                }
            }, //0

            {
                title: "<div class='text-center'>document</div>",
                class: "tx-left align-top",
                width: "30%",
                //visible: false,
                render: function (data, type, row, meta) {

                    let documentDate = moment(row.documentDate, 'YYYY/MM/DD').format('DD/MM/YYYY');
                    let manifestNoteNumber = row.manifestNoteNumber;
                    let shippingNoteNumber = row.shippingNoteNumber;
                    let routeLineName = row.routeLineName;
                    let p_orderNo = row.p_orderNo;
                    let p_packageNo = row.p_packageNo;
                    let cod = row.cod;


                    //let job_type;
                    //let tx_type;
                    //if (row.f_endRouteLineCode == "00/0") {
                    //    tx_type = 'ส่งสินค้าด่วน'
                    //    job_type = 'primary'
                    //} else {
                    //    tx_type = '-'
                    //    job_type = 'dark'
                    //}

                    let dt = ''
                    dt += '<div class="media mt-0" >'
                    //dt += '<div class="d-flex mr-3">'
                    dt += '<div class="tx-center mr-1">'
                    dt += '<a href="https://motoridersuniverse.com/uploads/blogs/83/0e/960/44011061ba1959c830e.jpg" target="_blank">'
                    dt += '<img class="media-object avatar avatar-md brround w-7 h-7" alt="64x64" src="https://motoridersuniverse.com/uploads/blogs/83/0e/960/44011061ba1959c830e.jpg">'
                    dt += '</a>'
                    dt += '<span class="mt-1 tx-dark badge badge-success-transparent bd bd-success">' + cod + ' ฿</span>'
                    dt += '</div>'
                    dt += '<div class="media-body">'
                    dt += '<div class="d-flex">'
                    dt += '<a class="mr-1 tx-14"><i class="las la-book text-warning"></i></a>' + '<span class="tx-14 mt-0 mb-0 font-weight-semibold">' + manifestNoteNumber + '</span>'
                    dt += '<span class="tx-12 ml-auto">'
                    dt += '<a class="mr-1 tx-14"><i class="las la-calendar-day  tx-primary"></i></a>' + '<span class="mt-0 mb-0 font-weight-semibold tx-12">' + documentDate + '</span>'
                    dt += '</span>'
                    dt += '</div>'
                    dt += '<div class="d-flex">'
                    dt += '<a class="mr-1 tx-13"><i class="las la-caret-right tx-dark"></i></a>' + '<span class="tx-13 text-muted mb-0"><u>' + shippingNoteNumber + '</u></span>'
                    dt += '<span class="tx-12 ml-auto">'
                    dt += '<span class="mt-1 w-100 badge badge-primary">' + routeLineName + '</span>'
                    dt += '</span>'
                    dt += '</div>'
                    dt += '<hr class="mb-1 mt-1">'
                    dt += '<div class="d-flex">'
                    dt += '<a class="mr-1 tx-13"><i class="las la-file-invoice-dollar tx-success"></i></a>' + '<span class="tx-13 mb-0">' + p_orderNo + '</span>'
                    dt += '<span class="tx-12 ml-auto">'
                    dt += '<a class="mr-1 tx-13"><i class="las la-receipt tx-info"></i></a>' + '<span class="tx-13 mb-0">' + p_packageNo + '</span>'
                    dt += '</span>'
                    dt += '</div>'
                    dt += '</div>';

                    return dt;
                }
            }, //
            {
                title: "<div class='text-center'>ลูกค้า ที่อยู่</div>",
                class: "tx-left align-end",
                width: "500px",
                visible: false,
                render: function (data, type, row, meta) {
                    let job_emmas_addres = ''
                    let d_job_emmas_addres = (row.job_emmas_addres == null) ? '' : row.job_emmas_addres
                    if (row.job_emmas_addres == row.job_delivery_addr) {
                        job_emmas_addres == ''
                    } else {
                        job_emmas_addres = d_job_emmas_addres
                    }

                    return '<span class="tx-12 tx-bold mr-1 mb-1">รหัส : </span> <span class="tx-12 tx-left tx-bold mb-1 mr-1">' + row.invcode + '</span>' +
                        '<br>' +
                        '<span class="tx-12 tx-bold mr-1 mb-1">ชื่อ : </span><span class="tx-12 tx-left">' + row.job_delivery_name + '</span>' +
                        '<br>' +
                        '<span class="tx-12 tx-bold mr-1 mb-1">ที่อยู่ : </span><span class="tx-12 tx-left">' + d_job_emmas_addres + '</span>' +
                        '<hr class="mb-1 mt-1">' +
                        '<span class="tx-12 tx-bold">จัดส่ง : </span>' + '<span class="tx-12 tx-left">' + row.job_delivery_addr + '</span>';
                }
            }, //show
            {
                title: "<div class='text-center'>ข้อมูลพนักงาน</div>",
                class: "tx-left align-end",
                width: "130px",
                visible: false,
                render: function (data, type, row, meta) {
                    return '<span class="tx-12 tx-bold mr-1 mb-1">เบอร์ : </span> <span class="tx-12 tx-right mb-1">' + row.driver_id + '</span>' +
                        '<br>' +
                        '<hr class="mb-1 mt-1">' +
                        '<span class="tx-12 tx-bold mr-1 mb-1">ชื่อ : </span> <span class="tx-12 tx-left">' + row.driver_fullname + '</span>' +
                        '<br>' +
                        '<span class="tx-12 tx-bold mr-1 mb-1">ทะเบียน : </span> <span class="tx-12 tx-left">' + row.plate_name + '</span>';

                }
            }, //show
            {
                title: "สถานะ",
                class: "tx-center align-end",
                //width: "190px",
                visible: false,
                render: function (data, type, row, meta) {
                    let tx, cl = ''
                    if (row.statusId == '1' || row.statusId == '2') {
                        cl = 'dark'
                    } else if (row.statusId == '3' || row.statusId == '4') {
                        cl = 'success'
                    } else if (row.statusId == '5') {
                        cl = 'danger'
                    } else {
                        cl = 'secondary'
                    }
                    let status = row.status == null ? '-' : row.status

                    return '<div class="row justify-content-center">' +
                        '<div class="col-12">' +
                        '<span class="tx-12 w-100 badge badge-primary">' + 'เปิดเอกสาร' + '</span>' +
                        '<span class="tx-12 w-50 badge badge-warning">' + row.created_by + '</span>' +
                        '<span class="tx-9 w-50 badge badge-warning">' + moment(row.created_datetime).format("DD/MM/YYYY HH:mm:ss") + '</span>' +
                        '<hr class="mb-1 mt-1">' +
                        '<span class="tx-12 w-100 badge badge-' + cl + '">' + status + '</span>' +
                        '<span class="tx-9 w-100 badge bd bd-1 bd-' + cl + '">' + moment(row.currentStatusDate).format("DD/MM/YYYY HH:mm:ss") + '</span>' +
                        '</div >' +

                        '</div >';
                }
            }, //show
            {
                data: "p_orderNo",
                visible: false,
            }, //cod       
            {
                data: "p_packageNo",
                visible: false,
            }, //cod   
            {
                data: "cod",
                visible: false,
            }, //cod
            {
                data: "currentStatus",
                visible: false,
            }, //currentStatus 
            {
                data: "currentStatusText",
                visible: false,
            }, //currentStatusText
            {
                data: "currentStatusDateText",
                visible: false,
            }, //currentStatusText
            {
                data: "currentStatusTimeText",
                visible: false,
            }, //currentStatusText
            {
                data: "driverName",
                visible: false,
            }, //currentStatusText
            {
                data: "endRouteLineId",
                visible: false,
            }, //currentStatusText
            {
                data: "routeLineName",
                visible: false,
            }, //currentStatusText
            {
                data: "startDeliveryDateText",
                visible: false,
            }, //currentStatusText   
            {
                data: "endDeliveryDateText",
                visible: false,
            }, //currentStatusText
            {
                data: "manifestNoteDocumentDateText",
                visible: false,
            }, //currentStatusText
            {
                data: "manifestNoteNumber",
                visible: false,
            }, //currentStatusText
            {
                data: "manifestNoteTypeName",
                visible: false,
            }, //currentStatusText
            {
                data: "paymentTypeName",
                visible: false,
            }, //currentStatusText
            {
                data: "productName",
                visible: false,
            }, //currentStatusText
            {
                data: "qty",
                visible: false,
            }, //currentStatusText
            {
                data: "receiverName",
                visible: false,
            }, //currentStatusText
            {
                data: "receiverAddress",
                visible: false,
            }, //currentStatusText
            {
                data: "senderName",
                visible: false,
            }, //currentStatusText
            {
                data: "shippingNoteNumber",
                visible: false,
            }, //currentStatusText
            {
                data: "vehicleLicensePlate",
                visible: false,
            }, //currentStatusText
        ],
        initComplete: function (settings, json) {

            $(".loader-spinner").addClass("d-none");

            $("#global-loader").fadeOut("slow");

        },
    });

};

$.pck_inv = function format(callback, citem) {

    let url = new URL(URL_TMS_JOB_DELIVERY_DAILY_LIST);

    let job_start_date = $('#job_date').val() != '' ? moment($('#job_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00:00.000' : moment().format('YYYY-MM-DD') + ' 00:00:00.000';  //ถ้าไม่เลือกจะเป็นค่าว่าง
    let job_end_date = $('#job_date').val() != '' ? moment($('#job_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59:59.000' : moment().format('YYYY-MM-DD') + ' 23:59:59.000';

    url.search = new URLSearchParams({
        mode: 'PCK_INV',
        job_start_date: job_start_date,
        job_end_date: job_end_date,
        ref_id: citem.job_pk_no,

    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        //$(".modal-body").LoadingOverlay("hide", true);

        if (result.length > 0) {

            let line_data = [];

            var data = result.data;
            var thead;


            thead = "<tr class='bg-warning tx-dark'>" + "<th class='border-bottom-0'>#</th>" +
                "<th class='border-bottom-0 tx-center'>วันที่บิล</th>" +
                "<th class='border-bottom-0 tx-center'>ใบซื้อ</th>" +
                "<th class='border-bottom-0 tx-center'>ใบจัด</th>" +
                "<th class='border-bottom-0 tx-center'>รหัส</th>" +
                "<th class='border-bottom-0 tx-center'>ชื่อ</th>" +
                "<th class='border-bottom-0 tx-center'>จำนวน</th>" + "</tr>";


            var tbody = '';

            let i = result.length

            $.each(data, function (key, val) {

                let salefile_number = val.salefile_number == null ? '' : val.salefile_number
                let salefile_name = val.salefile_name == null ? '' : val.salefile_name
                let salefile_invcode = val.salefile_invcode == null ? '' : val.salefile_invcode
                let salefile_invpo = val.salefile_invpo == null ? '' : val.salefile_invpo
                let salefile_item = val.salefile_item == null ? '' : val.salefile_item
                let salefile_startdate = val.salefile_startdate == null ? '' : val.salefile_startdate

                tbody += "<tr>" +
                    "<td>" + '<span class="tx-primary">' + i + '</span>' + "</td>" +
                    "<td>" + moment(salefile_startdate).format("DD/MM/YYYY") + "</td>" +
                    "<td>" + salefile_number + "</td>" +
                    "<td>" + salefile_invpo + "</td>" +
                    "<td>" + salefile_invcode + "</td>" +
                    "<td>" + salefile_name + "</td>" +
                    "<td>" + salefile_item + "</td>" +
                    "</tr>";

                i--

            });

            callback($('<table id="table-pck_inv" class="table text-md-nowrap mb-0">' + thead + tbody + '</table>')).show();

        }
    });


};

$.master_get = async function () {

    if (DriverMessengerList.data != undefined) {

        let Master_dataSet = [];

        $.each(DriverMessengerList.data, function (key, val) {

            Master_dataSet.push({ id: val['code'], text: (val['code'] + ' : ' + val['firstnameTh'] + ' ' + val['lastnameTh']), tel: val['tel'], email: val['email'] });

        });

        $('#driver_id').select2({
            width: '100%',
            height: '40px',
            data: Master_dataSet,
            templateResult: function (data) {
                return data.text;
            },
            sorter: function (data) {
                return data.sort(function (a, b) {
                    return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                });
            }
        });

    } else {

        toastr.warning('ไม่พบข้อมูลพนักงาน');

    }

    if (RoutelineList.data.length != undefined) {

        let Master_dataSet = [];

        $.each(RoutelineList.data, function (key, val) {

            Master_dataSet.push({ id: val['code'], text: val['nameTh'] });

        });

        $('#route_no').select2({
            width: '100%',
            height: '40px',
            data: Master_dataSet,
            templateResult: function (data) {
                return data.text;
            },
            sorter: function (data) {
                return data.sort(function (a, b) {
                    return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                });
            }
        });

    } else {

        toastr.warning('ไม่พบข้อมูลทะเบียนรถ');

    }

    if (PlateList.data.length != undefined) {

        let Master_dataSet = [];

        $.each(PlateList.data, function (key, val) {

            Master_dataSet.push({ id: val['licensePlate'], text: val['licensePlate'] });

        });

        $('#job_plate').select2({
            width: '100%',
            height: '40px',
            data: Master_dataSet,
            templateResult: function (data) {
                return data.text;
            },
            sorter: function (data) {
                return data.sort(function (a, b) {
                    return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                });
            }
        });

    } else {

        toastr.warning('ไม่พบข้อมูลทะเบียนรถ');

    }


    $('#emmas_code').select2({
        minimumInputLength: 1,
        minimumResultsForSearch: 10,
        dropdownAutoWidth: true,
        delay: 500,
        ajax: {
            url: 'http://192.168.1.247/vsk-api-acc/api/ACC/VSK_Emmas_Select2_GET',
            dataType: 'json',
            width: 'resolve',
            data: function (params) {
                var query = {
                    search: typeof params.term !== 'undefined' ? params.term : ' ',
                }
                //console.log(params);
                return query;
            },
            matcher: function (params, data) {
                return matchStart(params, data);
            },
            processResults: function (data, search) {
                //console.log(data);
                return {
                    results: $.map(data.data, function (item) {
                        return {
                            text: item.text,
                            id: item.id
                        }
                    })
                };
            },
        },
        escapeMarkup: function (markup) {
            return markup;
        },
    })

}
