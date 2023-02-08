'use strict';
/*
const url_api = "http://localhost:49705/";
const url_report = "http://localhost:55233/ViewReport?";
*/
const url_api = "http://192.168.1.247/tms-api/";
const url_report = "http://192.168.1.247/tms-rpt/ViewReport?";

const url_cn = "http://192.168.1.247/intranet/pur-api/v1/Cn_Pre_Job_Get?record_status=1&mode=search&cn_pre_job_datetime_start=2020-01-29"
const url_supplier = "http://192.168.1.247/vsk-api-acc/api/ACC/VSK_Apmas_GET?";
const url_br = 'http://192.168.1.247/intranet/br-api/api/Br_Brtra_Get_v1?';
const objProfile = JSON.parse(localStorage.getItem('objProfile'));

let oTable, mode;
let name, validator, table, options, item_action, item_id;
let cn_salefile_number, cn_pre_job_jobno, cn_route_no, cn_route_name;
let add_data = [];
let citem_job = [];

let objDriver = JSON.parse(localStorage.getItem('objTRPDriver'));

let customElement = $("<div>", {
    "css": {
        "border": "2px solid",
        "font-size": "14px",
        "text-align": "center",
        "padding": '7px'

    },
    "text": 'Please Wait...'
});

$.init = function () {


    //$('#card-title-pages').html('บันทึกการนำส่งสินค้าด่วนพิเศษ-ประจำวัน ' + moment(new Date()).format('DD-MM-YYYY'))

    $('#driver_id').focus();

    let today = moment().format('YYYY-MM-DD');
    document.getElementById("job_date").value = today;

    $('#btn-report').off('click').on('click', function (evt) {

        evt.preventDefault();

        $(this).on('click', function (evt) {
            evt.preventDefault();
        });

        let get_data = {

            job_date: moment($('#frm_data').find('#job_date').val(), 'DD/MM/YYYY').format('YYYY-MM-DD'),
            route_no: $('#frm_data').find('#route_no').find(":selected").val(),
            driver_id: $('#frm_data').find('#driver_id').val(),
            job_plate: $('#job_plate').find(":selected").val(),

        };

        var params = [];
        for (const i in get_data) {
            params.push(i + "=" + encodeURIComponent(get_data[i]));
        }

        window.open(url_report + params.join("&"));

        return false;

    });

    $('#driver_id').off('keyup').on('keyup', function (e) {

        var code = (e.keyCode ? e.keyCode : e.which);

        if ($(this).val().length > 0) {

            if (code === 13) {

                e.preventDefault();

                $.LoadingOverlay("show", {
                    image: '',
                    custom: customElement
                });

                if ($('#driver_id').val().length == 10) {
                    $('#driver_id').prop("disabled", true);
                    $('#job_inv').prop("disabled", false);
                    $('#job_inv').focus();
                }

                $.LoadingOverlay("hide");
            }

        }

    });

    let get_data = {
        job_date: moment().format('YYYY-MM-DD'),
    };

    var params = [];
    for (const i in get_data) {
        params.push(i + "=" + encodeURIComponent(get_data[i]));
    }

    fetch(url_api + '/v1/trp_tms_job_express_list' + '?' + params.join("&")).then(function (response) {

        return response.json();

    }).then(function (result_list) {

        $('#tbl-job-detail').find('tbody .tr_job_list').remove();

        let count_express = 0;
        let count_supplier = 0;
        let count_cn = 0;
        let count_br = 0;

        $.each(result_list.data, function (key, val_list) {

            if (val_list['route_name'] === 'ส่งสินค้าด่วน') {
                count_express++;
            } else if (val_list['route_name'] === 'รับสินค้า Supplier') {
                count_supplier++;
            } else if (val_list['route_name'] === 'จัดส่งสินค้าสาขา') {
                count_br++;
            } else if (val_list['route_name'] === 'รับคืนสินค้าลูกค้า') {
                count_cn++;
            }

            $('#tbl-job-detail').find('tbody').append(
                '<tr class="row tr_job_list">' +
                '<td class="tx-center col-sm-1">' + val_list['job_no'] + '</td>' +
                '<td class="tx-center col-sm-1">' + val_list['job_invoice_no'] + '</td>' +
                '<td class="tx-center col-sm-1">' + val_list['job_pk_no'] + '</td>' +
                '<td class="tx-left col-sm-2">' + val_list['job_delivery_name'] + '</td>' +
                '<td class="tx-left col-sm-3">' + val_list['job_delivery_addr'] + '</td>' +
                '<td class="tx-center col-sm-1">' + val_list['driver_id'] + '</td>' +
                '<td class="tx-center col-sm-1">' + val_list['route_name'] + '</td>' +
                '<td class="tx-center col-sm-1">' + val_list['created_by'] + '</td>' +
                '<td class="tx-center col-sm-1">' + moment(val_list['created_date']).format('DD/MM/YYYY HH:mm:ss') + '</td>' +
                '</tr>'
            );

        });

        $('#card-title-pages').html('บันทึกการนำส่งสินค้าด่วนพิเศษ-ประจำวัน ' + moment(new Date()).format('DD-MM-YYYY') +
            ' <span class="badge badge-pill badge-primary">ส่งสินค้าด่วน ' + count_express + '</span>' +
            ' <span class="badge badge-pill badge-success">รับสินค้า Supplier ' + count_supplier + '</span>' +
            ' <span class="badge badge-pill badge-info">จัดส่งสินค้าสาขา ' + count_br + '</span>' +
            ' <span class="badge badge-pill badge-danger">รับสินค้าคืน ' + count_cn + '</span>'
        )

    });

    $('#job_inv').off('keyup').on('keyup', async function (e) {

        var code = (e.keyCode ? e.keyCode : e.which);

        if ($(this).val().length > 0) {

            if (code === 13) {

                $.LoadingOverlay("show", {
                    image: '',
                    custom: customElement
                });

                if ($('#job_inv').val().substr(0, 3).toUpperCase() === 'REF' || $('#job_inv').val().substr(0, 2).toUpperCase() === 'IV') {

                    if ($('#job_inv').val().substr(0, 3).toUpperCase() === 'REF') {

                        console.log('REF');

                        await fetch(url_cn + '&cn_pre_job_jobno=' + $('#job_inv').val() + '&cn_pre_job_assige=TRP').then(function (response) {

                            return response.json();

                        }).then(function (result) {

                            console.log(result);

                           
                            let driver_name = objDriver.filter(obj => obj.id === $('#frm_data').find('#driver_id').val());

                            let cn_data = {
                                cn_pre_job_id: result.data['0']['cn_pre_job_id'],
                                cn_pre_job_detail_assige: 'TRP',
                                cn_pre_job_detail_driver: driver_name[0]['text'],
                                cn_pre_job_detail_pickup_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                                cn_pre_job_detail_status: 'on_process',
                                cn_pre_job_detail_remark: 'เข้ารับสินค้า :' + driver_name[0]['text'],
                                cn_pre_job_detail_item_condition: '',
                                cn_pre_job_detail_comment: result.data['0']['cn_pre_job_comment'],
                                created_by: name,
                                updated_by: name,
                                record_status: '1',
                                pMessage: ''
                            };

                            var params = [];
                            for (const i in cn_data) {
                                params.push(i + "=" + encodeURIComponent(cn_data[i]));
                            }

                            console.log('cn_data',cn_data)
                            
                            fetch('http://192.168.1.247/intranet/pur-api/v1/Cn_Pre_Job_Detail_Create', {
                                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                                // mode: 'no-cors', // no-cors, *cors, same-origin
                                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                                credentials: 'same-origin', // include, *same-origin, omit
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                                body: params.join("&"),
                            }).then(data => {
                                console.log('OK')
                                resStatus = data.status
                                return data.json();
                            })
                            
                            cn_salefile_number = result.data['0']['salefile_number']
                            cn_pre_job_jobno = result.data['0']['cn_pre_job_jobno']
                            cn_route_no = 'CUS'
                            cn_route_name = 'รับคืนสินค้าลูกค้า'
                          
                        });

                    }

                    await fetch(url_api + '/v1/trp_salefile_get?number=' + ($('#job_inv').val().substr(0, 3).toUpperCase() === 'REF' ? cn_salefile_number : $('#job_inv').val())).then(function (response) {

                        return response.json();

                    }).then(async function (result) {

                        console.log(result)

                        let uuid = $.uuid();

                        if ($('#job_inv').val().substr(0, 3).toUpperCase() === 'REF') {

                            add_data = {
                                tran_id: uuid,
                                job_date: moment().format('YYYY-MM-DD'),
                                job_invoice_no: $.trim(result.data['0']['number']),
                                job_invoice_date: $.trim(result.data['0']['invdate']),
                                job_pk_no: $.trim(cn_pre_job_jobno),
                                job_qty: $.trim(result.data['0']['item']),
                                invnet: $.trim(result.data['0']['invnet']),
                                invcode: $.trim(result.data['0']['invcode']),
                                job_delivery_name: $.trim(($.trim(result.data['0']['evname']) == '' ? result.data['0']['invname'] : result.data['0']['evname'])),
                                job_delivery_addr: $.trim(result.data['0']['evname']) + $.trim(result.data['0']['evadd']),
                                route_no: cn_route_no,
                                route_name: cn_route_name,
                                driver_id: $('#frm_data').find('#driver_id').val(),
                                driver_fullname: $('#frm_data').find('#driver_id').val(),
                                job_plate: $('#frm_data').find('#driver_id').val(),
                                plate_name: $('#frm_data').find('#driver_id').val(),
                                created_by: name
                            };

                        } else {

                            add_data = {
                                tran_id: uuid,
                                job_date: moment().format('YYYY-MM-DD'),
                                job_invoice_no: $.trim(result.data['0']['number']),
                                job_invoice_date: $.trim(result.data['0']['invdate']),
                                job_pk_no: $.trim(result.data['0']['invpo']),
                                job_qty: $.trim(result.data['0']['item']),
                                invnet: $.trim(result.data['0']['invnet']),
                                invcode: $.trim(result.data['0']['invcode']),
                                job_delivery_name: $.trim(($.trim(result.data['0']['evname']) == '' ? result.data['0']['invname'] : result.data['0']['evname'])),
                                job_delivery_addr: $.trim(result.data['0']['evname']) + $.trim(result.data['0']['evadd']),
                                route_no: '00/0',
                                route_name: 'ส่งสินค้าด่วน',
                                driver_id: $('#frm_data').find('#driver_id').val(),
                                driver_fullname: $('#frm_data').find('#driver_id').val(),
                                job_plate: $('#frm_data').find('#driver_id').val(),
                                plate_name: $('#frm_data').find('#driver_id').val(),
                                created_by: name
                            };
                        }

                        var params = [];
                        for (const i in add_data) {
                            params.push(i + "=" + encodeURIComponent(add_data[i]));
                        }

                        await fetch(url_api + '/v1/trp_tms_job_express_add', {
                            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                            // mode: 'no-cors', // no-cors, *cors, same-origin
                            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                            credentials: 'same-origin', // include, *same-origin, omit
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                            body: params.join("&"),
                        }).then(result_export => {

                            return result_export.json();

                        }).then(result_export => {

                            //console.log(data);
                            let resStatus = result_export.status;

                            if (result_export.status === 'Error') {

                                toastr.error(result_export.error_message);
                                $.LoadingOverlay("hide");

                            } else {

                                citem_job = [
                                    {
                                        "deliveryProjectCode": result_export.data[0]['deliveryProjectCode'],
                                        "underDistributionCenterCode": result_export.data[0]['underDistributionCenterCode'],
                                        "vehicleLicensePlate": result_export.data[0]['vehicleLicensePlate'],
                                        "vehicleFuelUseRate": result_export.data[0]['vehicleFuelUseRate'],
                                        "vehiclePercentReFuel": result_export.data[0]['vehiclePercentReFuel'],
                                        "addOnVehicleLicensePlate": result_export.data[0]['addOnVehicleLicensePlate'],
                                        "driverCode": result_export.data[0]['driverCode'],
                                        "driverName": result_export.data[0]['driverName'],
                                        "manifestNoteCreateDate": result_export.data[0]['manifestNoteCreateDate'],
                                        "manifestNoteStartType": result_export.data[0]['manifestNoteStartType'],
                                        "startDistributionCenterCode": result_export.data[0]['startDistributionCenterCode'],
                                        "endRouteLineCode": result_export.data[0]['endRouteLineCode'],
                                        "receiveProductDate": result_export.data[0]['receiveProductDate'],
                                        "shippingNoteList": [
                                            {
                                                "shippingNoteCode": result_export.data[0]['shippingNoteCode'],
                                                "shippingNoteDescription": result_export.data[0]['shippingNoteDescription'],
                                                "deliveryDate": result_export.data[0]['deliveryDate'],
                                                "packageNumber": result_export.data[0]['packageNumber'],
                                                "productAmount": result_export.data[0]['productAmount'],
                                                "codPrice": result_export.data[0]['codPrice'],
                                                "weight": result_export.data[0]['weight'],
                                                "volume": result_export.data[0]['volume'],
                                                "senderName": result_export.data[0]['senderName'],
                                                "receiverName": result_export.data[0]['receiverName'],
                                                "actualReceiverName": result_export.data[0]['actualReceiverName'],
                                                "receiverContact": result_export.data[0]['receiverContact'],
                                                "receiverAddress": result_export.data[0]['receiverAddress'],
                                                "endRouteLineCode": result_export.data[0]['endRouteLineCode'],
                                                "lat": result_export.data[0]['lat'],
                                                "lng": result_export.data[0]['lng'],
                                                "productCode": result_export.data[0]['productCode'],
                                                "deliveryProjectCode": result_export.data[0]['deliveryProjectCode'],
                                                "startConsumerDistributionCenterCode": result_export.data[0]['startConsumerDistributionCenterCode'],
                                            }
                                        ]
                                    }
                                ];


                            }

                        });


                    });

                } else if ($('#job_inv').val().substr(0, 1).toUpperCase() === 'P' || $('#job_inv').val().substr(0, 2).toUpperCase() === 'BR') {


                    if ($('#job_inv').val().substr(0, 2).toUpperCase() === 'BR') {

                        console.log('BR')

                        await fetch(url_br + 'job_no=' + $('#job_inv').val()).then(function (response) {

                            return response.json();

                        }).then(async function (result_br) {

                            console.log(result_br);

                            let uuid = $.uuid();

                            add_data = {
                                tran_id: uuid,
                                job_date: moment().format('YYYY-MM-DD'),
                                job_invoice_no: '-',
                                job_invoice_date: moment().format('YYYY-MM-DD'),
                                job_pk_no: $.trim(result_br.data['0']['bl_job_no']),
                                job_qty: '1',
                                invnet: '0',
                                invcode: $.trim(result_br.data['0']['bl_job_no']),
                                job_delivery_name: $.trim(result_br.data['0']['bl_invname']),
                                job_delivery_addr: $.trim(result_br.data['0']['bl_invname']),
                                route_no: 'BR',
                                route_name: 'จัดส่งสินค้าสาขา',
                                driver_id: $('#frm_data').find('#driver_id').val(),
                                driver_fullname: $('#frm_data').find('#driver_id').val(),
                                job_plate: $('#frm_data').find('#driver_id').val(),
                                plate_name: $('#frm_data').find('#driver_id').val(),
                                created_by: name
                            };

                            var params = [];
                            for (const i in add_data) {
                                params.push(i + "=" + encodeURIComponent(add_data[i]));
                            }

                            await fetch(url_api + '/v1/trp_tms_job_express_add', {
                                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                                // mode: 'no-cors', // no-cors, *cors, same-origin
                                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                                credentials: 'same-origin', // include, *same-origin, omit
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                                body: params.join("&"),
                            }).then(result_export => {

                                return result_export.json();

                            }).then(result_export => {

                                //console.log(data);
                                let resStatus = result_export.status;

                                if (result_export.status === 'Error') {

                                    toastr.error(result_export.error_message);
                                    $.LoadingOverlay("hide");

                                } else {

                                    citem_job = [
                                        {
                                            "deliveryProjectCode": result_export.data[0]['deliveryProjectCode'],
                                            "underDistributionCenterCode": result_export.data[0]['underDistributionCenterCode'],
                                            "vehicleLicensePlate": $('#frm_data').find('#driver_id').val(),
                                            "vehicleFuelUseRate": result_export.data[0]['vehicleFuelUseRate'],
                                            "vehiclePercentReFuel": result_export.data[0]['vehiclePercentReFuel'],
                                            "addOnVehicleLicensePlate": result_export.data[0]['addOnVehicleLicensePlate'],
                                            "driverCode": $('#frm_data').find('#driver_id').val(),
                                            "driverName": result_export.data[0]['driverName'],/// ติดไว้สักครู่
                                            "manifestNoteCreateDate": moment().format('YYYY-MM-DD'),
                                            "manifestNoteStartType": result_export.data[0]['manifestNoteStartType'],
                                            "startDistributionCenterCode": 'VSM',
                                            "endRouteLineCode": 'BR',
                                            "receiveProductDate": $('#frm_data').find('#driver_id').val(),
                                            "shippingNoteList": [
                                                {
                                                    "shippingNoteCode": result_export.data[0]['shippingNoteCode'],
                                                    "shippingNoteDescription": result_export.data[0]['shippingNoteDescription'],
                                                    "deliveryDate": moment().format('YYYY-MM-DD'),
                                                    "packageNumber": $('#job_inv').val(),
                                                    "productAmount": result_export.data[0]['productAmount'],
                                                    "codPrice": result_export.data[0]['codPrice'],
                                                    "weight": result_export.data[0]['weight'],
                                                    "volume": result_export.data[0]['volume'],
                                                    "senderName": result_export.data[0]['senderName'],
                                                    "receiverName": $.trim(result_br.data['0']['bl_invname']),
                                                    "actualReceiverName": $.trim(result_br.data['0']['bl_invname']),
                                                    "receiverContact": 0,
                                                    "receiverAddress": result_export.data[0]['receiverAddress'],
                                                    "endRouteLineCode": result_export.data[0]['endRouteLineCode'],
                                                    "lat": result_export.data[0]['lat'],
                                                    "lng": result_export.data[0]['lng'],
                                                    "productCode": $.trim(result_br.data['0']['bl_job_no']),
                                                    "deliveryProjectCode": result_export.data[0]['deliveryProjectCode'],
                                                    "startConsumerDistributionCenterCode": result_export.data[0]['startConsumerDistributionCenterCode'],
                                                }
                                            ]
                                        }
                                    ];

                                }

                            });

                        });

                    } else if ($('#job_inv').val().substr(0, 1).toUpperCase() === 'P') {

                        console.log('Supplier')

                        await fetch(url_supplier + 'apmas_code=' + $('#job_inv').val()).then(function (response) {

                            return response.json();

                        }).then(async function (result_supplier) {

                            console.log(result_supplier);
                            citem_job = [];

                            let uuid = $.uuid();

                            add_data = {
                                tran_id: uuid,
                                job_date: moment().format('YYYY-MM-DD'),
                                job_invoice_no: '-',
                                job_invoice_date: moment().format('YYYY-MM-DD'),
                                job_pk_no: $.trim(result_supplier.data['0']['code']),
                                job_qty: '1',
                                invnet: '0',
                                invcode: $.trim(result_supplier.data['0']['code']),
                                job_delivery_name: $.trim(result_supplier.data['0']['lname']),
                                job_delivery_addr: $.trim(result_supplier.data['0']['paddress']),
                                route_no: 'SUP',
                                route_name: 'รับสินค้า Supplier',
                                driver_id: $('#frm_data').find('#driver_id').val(),
                                driver_fullname: $('#frm_data').find('#driver_id').val(),
                                job_plate: $('#frm_data').find('#driver_id').val(),
                                plate_name: $('#frm_data').find('#driver_id').val(),
                                created_by: name
                            };

                            var params = [];
                            for (const i in add_data) {
                                params.push(i + "=" + encodeURIComponent(add_data[i]));
                            }

                            await fetch(url_api + '/v1/trp_tms_job_express_add', {
                                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                                // mode: 'no-cors', // no-cors, *cors, same-origin
                                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                                credentials: 'same-origin', // include, *same-origin, omit
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                                body: params.join("&"),
                            }).then(result_export => {

                                return result_export.json();

                            }).then(result_export => {

                                //console.log(data);
                                let resStatus = result_export.status;

                                if (result_export.status === 'Error') {

                                    toastr.error(result_export.error_message);
                                    $.LoadingOverlay("hide");

                                } else {

                                    citem_job = [
                                        {
                                            "deliveryProjectCode": result_export.data[0]['deliveryProjectCode'],
                                            "underDistributionCenterCode": result_export.data[0]['underDistributionCenterCode'],
                                            "vehicleLicensePlate": $('#frm_data').find('#driver_id').val(),
                                            "vehicleFuelUseRate": result_export.data[0]['vehicleFuelUseRate'],
                                            "vehiclePercentReFuel": result_export.data[0]['vehiclePercentReFuel'],
                                            "addOnVehicleLicensePlate": result_export.data[0]['addOnVehicleLicensePlate'],
                                            "driverCode": $('#frm_data').find('#driver_id').val(),
                                            "driverName": result_export.data[0]['driverName'],/// ติดไว้สักครู่
                                            "manifestNoteCreateDate": moment().format('YYYY-MM-DD'),
                                            "manifestNoteStartType": result_export.data[0]['manifestNoteStartType'],
                                            "startDistributionCenterCode": 'VSM',
                                            "endRouteLineCode": result_export.data[0]['endRouteLineCode'],
                                            "receiveProductDate": $('#frm_data').find('#driver_id').val(),
                                            "shippingNoteList": [
                                                {
                                                    "shippingNoteCode": result_export.data[0]['shippingNoteCode'],
                                                    "shippingNoteDescription": result_export.data[0]['shippingNoteDescription'],
                                                    "deliveryDate": moment().format('YYYY-MM-DD'),
                                                    "packageNumber": $('#job_inv').val(),
                                                    "productAmount": result_export.data[0]['productAmount'],
                                                    "codPrice": result_export.data[0]['codPrice'],
                                                    "weight": result_export.data[0]['weight'],
                                                    "volume": result_export.data[0]['volume'],
                                                    "senderName": result_export.data[0]['senderName'],
                                                    "receiverName": $.trim(result_supplier.data['0']['lname']),
                                                    "actualReceiverName": $.trim(result_supplier.data['0']['lname']),
                                                    "receiverContact": 0,
                                                    "receiverAddress": result_export.data[0]['receiverAddress'],
                                                    "endRouteLineCode": result_export.data[0]['endRouteLineCode'],
                                                    "lat": result_export.data[0]['lat'],
                                                    "lng": result_export.data[0]['lng'],
                                                    "productCode": $.trim(result_supplier.data['0']['code']),
                                                    "deliveryProjectCode": result_export.data[0]['deliveryProjectCode'],
                                                    "startConsumerDistributionCenterCode": result_export.data[0]['startConsumerDistributionCenterCode'],

                                                }
                                            ]
                                        }
                                    ];

                                    console.log(citem_job)

                                }

                            });

                        });

                    }

                } else {

                    console.log('ERROR')

                }


                await $.ajax({
                    async: false,
                    url: 'https://vsk.tms-vcargo.com/api/tms/public/v1/manifestnote/create-shipping-note-and-create-manifest-customer',
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    data: JSON.stringify({ 'manifestNoteList': citem_job }),
                    success: function (result) {
                        citem_job = [];
                    }

                });

                console.log(citem_job)

                await toastr.success('Save Successfully!', async function () {

                    add_data = [];

                    let get_data = {
                        job_date: moment().format('YYYY-MM-DD'),
                    };

                    var params = [];
                    for (const i in get_data) {
                        params.push(i + "=" + encodeURIComponent(get_data[i]));
                    }

                    fetch(url_api + '/v1/trp_tms_job_express_list' + '?' + params.join("&")).then(function (response) {

                        return response.json();

                    }).then(function (result_list) {

                        $('#tbl-job-detail').find('tbody .tr_job_list').remove();

                        let count_express = 0;
                        let count_supplier = 0;
                        let count_cn = 0;
                        let count_br = 0;

                        $.each(result_list.data, function (key, val_list) {

                            $('#tbl-job-detail').find('tbody').append(
                                '<tr class="row tr_job_list">' +
                                '<td class="tx-center col-sm-1">' + val_list['job_no'] + '</td>' +
                                '<td class="tx-center col-sm-1">' + val_list['job_invoice_no'] + '</td>' +
                                '<td class="tx-center col-sm-1">' + val_list['job_pk_no'] + '</td>' +
                                '<td class="tx-left col-sm-2">' + val_list['job_delivery_name'] + '</td>' +
                                '<td class="tx-left col-sm-3">' + val_list['job_delivery_addr'] + '</td>' +
                                '<td class="tx-center col-sm-1">' + val_list['driver_id'] + '</td>' +
                                '<td class="tx-center col-sm-1">' + val_list['route_name'] + '</td>' +
                                '<td class="tx-center col-sm-1">' + val_list['created_by'] + '</td>' +
                                '<td class="tx-center col-sm-1">' + moment(val_list['created_date']).format('DD/MM/YYYY HH:mm:ss') + '</td>' +
                                '</tr>'
                            );
                        });

                        $('#card-title-pages').html('บันทึกการนำส่งสินค้าด่วนพิเศษ-ประจำวัน ' + moment(new Date()).format('DD-MM-YYYY') +
                            ' <span class="badge badge-pill badge-primary">ส่งสินค้าด่วน ' + count_express + '</span>' +
                            ' <span class="badge badge-pill badge-success">รับสินค้า Supplier ' + count_supplier + '</span>' +
                            ' <span class="badge badge-pill badge-info">จัดส่งสินค้าสาขา ' + count_br + '</span>' + 
                            ' <span class="badge badge-pill badge-danger">รับสินค้าคืน ' + count_cn + '</span>'
                        )

                    });

                });

                await $('#job_inv').val('')
                await $('#driver_id').prop("disabled", false);
                await $('#driver_id').val('');
                await $('#driver_id').focus();
                await $.LoadingOverlay("hide");

            }
        }

    });

};

$(document).ready(async function () {

    await $.init();

    // alert('hello')
    //$.LoadingOverlay("show");
});

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        console.log(user);
        var full_mail = user.email;
        name = full_mail.replace("@vskautoparts.com", "");

    } else {

        window.location.assign('./login');

    }

});