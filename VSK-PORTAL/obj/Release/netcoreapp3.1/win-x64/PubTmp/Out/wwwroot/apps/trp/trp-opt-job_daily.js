'use strict';

const url_api = "http://localhost:49705/";
const url_report = "http://localhost:55233/ViewReport?";
/*
const url_api = "http://192.168.1.247/tms-api/";
const url_report = "http://192.168.1.247/tms-rpt/ViewReport?";
*/
const objProfile = JSON.parse(localStorage.getItem('objProfile'));
const url_cn = "http://192.168.1.247/intranet/pur-api/v1/Cn_Pre_Job_Get?record_status=1&mode=search&cn_pre_job_datetime_start=2020-01-29"

let oTable, mode;

let name, validator, table, options, item_action, item_id;
let cn_salefile_number, cn_pre_job_jobno, cn_route_no, cn_route_name;
let shippingNoteList = [];
let manifestNoteList = [];
let ref_id = $.uuid();


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

    let today = moment().format('YYYY-MM-DD');
    document.getElementById("job_date").value = today;
    $('#btn-upload').hide();

    $('#btn-report').off('click').on('click', function (evt) {

        evt.preventDefault();

        $(this).on('click', function (evt) {
            evt.preventDefault();
        });

        let get_data = {
            job_date: $('#frm_data').find('#job_date').val(),
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

    fetch('http://192.168.1.247/vsk-api-job/api/TRP/TRP_Lov_Get?lov_type=Route%20No').then(function (response) {

        return response.json();

    }).then(function (result) {

        let driver_route_list = [];

        if (result.length > 0) {

            console.log(result)

            $.each(result.data, function (key, val) {
                if (val['active_flag'] === 'Y') {
                    driver_route_list.push({ id: val['lov2'], text: val['lov1'] });
                }
            });

            $('#route_no').select2({
                width: '100%',
                height: '40px',
                data: driver_route_list,
                templateResult: function (data) {
                    return data.text;
                },
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    });
                }
            });

        }
    });

    fetch('https://vsk.tms-vcargo.com/api/tms/public/v1/vehicle/search', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ code: "", name: "" })
    }).then(function (response) {

        return response.json();

    }).then(function (result) {

        console.log(result)
        
        let driver_plate_list = [];

        if (result.statusCode === 200) {

            console.log('result.object',result.object)

            $.each(result.object, function (key, val) {

                driver_plate_list.push({ id: val['vehicleLicensePlate'], text: val['vehicleLicensePlate'] });

            });

            $('#job_plate').select2({
                width: '100%',
                height: '40px',
                data: driver_plate_list,
                templateResult: function (data) {
                    return data.text;
                },
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    });
                }
            });

        }
    });

    fetch('https://vsk.tms-vcargo.com/api/tms/public/v1/driver/search', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ code: "", name: "" })
    }).then(function (response) {

        return response.json();

    }).then(function (result) {

        console.log(result)

        let driver_list = [];

        if (result.statusCode === 200) {

            console.log('result.object', result.object)

            $.each(result.object, function (key, val) {

                driver_list.push({ id: val['code'], text: val['code'] + ' ' + val['firstNameTh'] + ' ' + val['lastNameTh'] });

            });

            $('#driver_id').select2({
                width: '100%',
                height: '40px',
                data: driver_list,
                templateResult: function (data) {
                    return data.text;
                },
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    });
                }
            });

        }
    });

    /*
    $('#driver_id').off('keyup').on('keyup', function (e) {

        var code = (e.keyCode ? e.keyCode : e.which);

        if ($(this).val().length > 0) {

            if (code === 13) {

                e.preventDefault();

                $.LoadingOverlay("show", {
                    image: '',
                    custom: customElement
                });

                if ($('#route_no').val().length > 0 && $('#route_no').val().length > 0) {

                    var driver_code = "";
                    var driver_code_len = 0;

                    driver_code = $('#frm_data').find('#driver_id').val();
                    driver_code_len = driver_code.length;

                    if (driver_code_len == 6) {

                        if (driver_code.charAt(0) == "d" || driver_code.charAt(0) == "D") {

                            fetch('http://192.168.1.247/vsk-api-job/api/TRP/TRP_Driver_Get_ByCode?driver_code=' + driver_code).then(function (response) {

                                return response.json();

                            }).then(function (result) {

                                if (result.data.length > 0) {

                                    $('#frm_data').find('#driver_name').removeClass('is-invalid');

                                    $.each(result.data, function (key, val) {

                                        $('#frm_data').find('#driver_id').val(val['driver_code']).addClass('d-none');
                                        $('#frm_data').find('#driver_name').val(val['driver_fullname']).removeClass('d-none').prop('disabled', true);

                                    });

                                    $('#frm_data').find('#job_inv').prop("disabled", false);
                                    $('#frm_data').find('#job_date').prop("disabled", true);
                                    $('#frm_data').find('#route_no').prop("disabled", true);
                                    $('#frm_data').find('#job_plate').prop("disabled", true);
                                    $('#frm_data').find('#driver_id').prop("disabled", true);
                                    $('#frm_data').find('#job_status').prop("disabled", true);

                                    let get_data = {

                                        job_date: $('#frm_data').find('#job_date').val(),
                                        route_no: $('#frm_data').find('#route_no').find(":selected").val(),
                                        driver_id: $('#frm_data').find('#driver_id').val(),
                                        job_plate: $('#job_plate').find(":selected").val(),

                                    };

                                    var params = [];
                                    for (const i in get_data) {
                                        params.push(i + "=" + encodeURIComponent(get_data[i]));
                                    }

                                    fetch(url_api + '/v1/trp_tms_job_list' + '?' + params.join("&")).then(function (response) {

                                        return response.json();

                                    }).then(function (result_list) {

                                        $('#tbl-job-detail').find('tbody .tr_job_list').remove();

                                        $.each(result_list.data, function (key, val_list) {

                                            $('#tbl-job-detail').find('tbody').append(
                                                '<tr class="row tr_job_list">' +
                                                '<td class="d-none">uuid</td>' +
                                                '<td class="tx-center col-sm-1">' + $('#job_date').val() + '</td>' +
                                                '<td class="tx-center col-sm-1">' + val_list['job_no'] + '</td>' +
                                                '<td class="tx-center col-sm-1">' + val_list['job_invoice_no'] + '</td>' +
                                                '<td class="tx-center col-sm-1">' + val_list['job_pk_no'] + '</td>' +
                                                '<td class="tx-left col-sm-3">' + val_list['job_delivery_name'] + '<br/>' + val_list['job_delivery_addr'] + '</td>' +
                                                '<td class="tx-left col-sm-1">' + $('#route_no').children("option:selected").html() + '</td>' +
                                                '<td class="tx-center col-sm-1">' + $('#job_status').children("option:selected").html() + '</td>' +
                                                '<td class="tx-center col-sm-1">' + name + '</td>' +
                                                '<td class="tx-center col-sm-2">' + moment(val_list['created_date']).format('DD/MM/YYYY HH:mm:ss') + '</td>' +
                                                '</tr>'
                                            );
                                        });

                                    });

                                    $('#job_inv').focus();

                                    $.LoadingOverlay("hide");

                                } else if (result.data.length == 0) {

                                    let message = "ไม่พบข้อมูล";
                                    toastr.error(message);
                                    $('#frm_data').find('#driver_name').val('');
                                    $('#frm_data').find('#driver_name').addClass('is-invalid');
                                    $('#frm_data').find('#driver_name').focus();
                                    $('#frm_data').find('#job_inv').prop("disabled", true);
                                    $.LoadingOverlay("hide");

                                }

                            });

                        }

                    } else {
                        $.LoadingOverlay("hide");
                    }



                }

            }

        }

    });
    */

    $('#btn-upload').on('click', function (e) {

        e.preventDefault();

        $.LoadingOverlay("show", {
            image: '',
            custom: customElement
        });


        $.ajax({
            async: false,
            url: 'https://vsk.tms-vcargo.com/api/tms/public/v1/manifestnote/create-shipping-note-and-create-manifest-customer',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ 'manifestNoteList': manifestNoteList }),
            success: function (result) {

                let ref_data = {
                    ref_id: ref_id
                };

                var params = [];
                for (const i in ref_data) {
                    params.push(i + "=" + encodeURIComponent(ref_data[i]));
                }

                fetch(url_api + '/v1/trp_tms_job_upload_add', {
                    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                    // mode: 'no-cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    body: params.join("&"),
                }).then(function (result) {

                    toastr.success('Save Successfully!', async function () {

                        $('#frm_data').find('#job_inv').prop("disabled", true);

                        $.LoadingOverlay("hide");

                    });

                    console.log('manifestNoteList', manifestNoteList)

                    shippingNoteList = [];
                    manifestNoteList = [];

                });

            }
        });


    })

    $('#job_inv').off('keyup').on('keyup', async function (e) {

        var code = (e.keyCode ? e.keyCode : e.which);

        if ($(this).val().length > 0) {

            if (code === 13) {

                $.LoadingOverlay("show", {
                    image: '',
                    custom: customElement
                });

                if ($('#job_inv').val().substr(0, 3).toUpperCase() === 'REF') {

                    console.log('REF');

                    await fetch(url_cn + '&cn_pre_job_jobno=' + $('#job_inv').val() + '&cn_pre_job_assige=TRP').then(function (response) {

                        return response.json();

                    }).then(function (result) {

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

                        console.log('cn_data', cn_data)

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

                    })
                }

                await fetch(url_api + '/v1/trp_salefile_get?number=' + ($('#job_inv').val().substr(0, 3).toUpperCase() === 'REF' ? cn_salefile_number : $('#job_inv').val())).then(function (response) {

                    return response.json();

                }).then(function (result) {

                    console.log(result)

                    $.each(result.data, function (key, val) {

                        let uuid = $.uuid();

                        let add_data = {
                            tran_id: uuid,
                            job_date: $('#frm_data').find('#job_date').val(),
                            job_invoice_no: $.trim(val['number']),
                            job_invoice_date: $.trim(val['invdate']),
                            job_pk_no: $.trim(val['invpo']),
                            job_qty: $.trim(val['item']),
                            invnet: $.trim(val['invnet']),
                            invcode: $.trim(val['invcode']),
                            job_delivery_name: $.trim(($.trim(val['evname']) == '' ? val['invname'] : val['evname'])),
                            job_delivery_addr: $.trim(val['evadd']),
                            route_no: $('#frm_data').find('#route_no').find(":selected").val(),
                            route_name: $('#frm_data').find('#route_no').find(":selected").html(),
                            driver_id: $('#frm_data').find('#driver_id').val(),
                            driver_fullname: $('#frm_data').find('#driver_name').val(),
                            job_plate: $('#job_plate').find(":selected").val(),
                            plate_name: $('#job_plate').find(":selected").html(),
                            created_by: name,
                            ref_id: ref_id
                        };

                        var params = [];
                        for (const i in add_data) {
                            params.push(i + "=" + encodeURIComponent(add_data[i]));
                        }

                        fetch(url_api + '/v1/trp_tms_job_add', {
                            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                            // mode: 'no-cors', // no-cors, *cors, same-origin
                            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                            credentials: 'same-origin', // include, *same-origin, omit
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                            body: params.join("&"),
                        }).then(data => {

                            return data.json();

                        }).then(data => {

                            let resStatus = data.status;

                            if (data.status === 'Error') {

                                toastr.error(data.error_message);
                                $.LoadingOverlay("hide");

                            } else {

                                let get_data = {
                                    tran_id: uuid,
                                    job_date: $('#frm_data').find('#job_date').val(),
                                    job_invoice_no: $.trim(val['number']),
                                    job_invoice_date: $.trim(val['invdate']),
                                    job_pk_no: $.trim(val['invpo']),
                                    job_qty: $.trim(val['item']),
                                    invnet: $.trim(val['invnet']),
                                    invcode: $.trim(val['invcode']),
                                    job_delivery_name: $.trim(($.trim(val['evname']) == '' ? val['invname'] : val['evname'])),
                                    job_delivery_addr: $.trim(val['evadd']),
                                    route_no: $('#frm_data').find('#route_no').find(":selected").val(),
                                    route_name: $('#frm_data').find('#route_no').find(":selected").html(),
                                    driver_id: $('#frm_data').find('#driver_id').val(),
                                    driver_fullname: $('#frm_data').find('#driver_name').val(),
                                    job_plate: $('#job_plate').find(":selected").val(),
                                    plate_name: $('#job_plate').find(":selected").html(),
                                    ref_id: ref_id
                                };

                                var params = [];
                                for (const i in get_data) {
                                    params.push(i + "=" + encodeURIComponent(get_data[i]));
                                }

                                fetch(url_api + '/v1/trp_tms_job_get' + '?' + params.join("&")).then(function (response) {

                                    return response.json();

                                }).then(function (result_export) {

                                    if (result_export.data[0]['chk_drop'] === 0) {

                                        console.log('result_export', result_export)

                                        shippingNoteList.push({
                                            "shippingNoteCode": result_export.data[0]['shippingNoteCode'],
                                            "shippingNoteDescription": result_export.data[0]['shippingNoteDescription'],
                                            "deliveryDate": result_export.data[0]['deliveryDate'],
                                            "packageNumber": result_export.data[0]['shippingNoteCode'],
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
                                            "productCode": result_export.data[0]['shippingNoteCode'],
                                            "deliveryProjectCode": result_export.data[0]['deliveryProjectCode'],
                                            "startConsumerDistributionCenterCode": result_export.data[0]['startConsumerDistributionCenterCode'],
                                        });

                                        manifestNoteList = [
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
                                                "shippingNoteList": shippingNoteList
                                            }
                                        ];

                                        $('#btn-upload').show();
                                        console.log('citem_job', manifestNoteList)


                                    } else {

                                        console.log(result_export.data[0]['chk_drop'])

                                    }

                                    toastr.success('Save Successfully!', async function () {

                                        let get_data = {
                                            tran_id: uuid,
                                            job_date: $('#frm_data').find('#job_date').val(),
                                            job_invoice_no: $.trim(val['number']),
                                            job_invoice_date: $.trim(val['invdate']),
                                            job_pk_no: $.trim(val['invpo']),
                                            job_qty: $.trim(val['item']),
                                            invnet: $.trim(val['invnet']),
                                            invcode: $.trim(val['invcode']),
                                            job_delivery_name: $.trim(($.trim(val['evname']) == '' ? val['invname'] : val['evname'])),
                                            job_delivery_addr: $.trim(val['evadd']),
                                            route_no: $('#frm_data').find('#route_no').find(":selected").val(),
                                            route_name: $('#frm_data').find('#route_no').find(":selected").html(),
                                            driver_id: $('#frm_data').find('#driver_id').val(),
                                            driver_fullname: $('#frm_data').find('#driver_name').val(),
                                            job_plate: $('#job_plate').find(":selected").val(),
                                            plate_name: $('#job_plate').find(":selected").html(),
                                            ref_id: ref_id
                                        };

                                        var params = [];
                                        for (const i in get_data) {
                                            params.push(i + "=" + encodeURIComponent(get_data[i]));
                                        }

                                        fetch(url_api + '/v1/trp_tms_job_list' + '?' + params.join("&")).then(function (response) {

                                            return response.json();

                                        }).then(function (result_list) {

                                            $('#tbl-job-detail').find('tbody .tr_job_list').remove();

                                            $.each(result_list.data, function (key, val_list) {

                                                $('#tbl-job-detail').find('tbody').append(
                                                    '<tr class="row tr_job_list">' +
                                                    '<td class="d-none">uuid</td>' +
                                                    '<td class="tx-center col-sm-1">' + $('#job_date').val() + '</td>' +
                                                    '<td class="tx-center col-sm-1">' + val_list['job_no'] + '</td>' +
                                                    '<td class="tx-center col-sm-1">' + val_list['job_invoice_no'] + '</td>' +
                                                    '<td class="tx-center col-sm-1">' + val_list['job_pk_no'] + '</td>' +
                                                    '<td class="tx-left col-sm-3">' + val_list['job_delivery_name'] + '<br/>' + val_list['job_delivery_addr'] + '</td>' +
                                                    '<td class="tx-left col-sm-1">' + $('#route_no').children("option:selected").html() + '</td>' +
                                                    '<td class="tx-center col-sm-1">' + $('#job_status').children("option:selected").html() + '</td>' +
                                                    '<td class="tx-center col-sm-1">' + name + '</td>' +
                                                    '<td class="tx-center col-sm-2">' + moment(val_list['created_date']).format('DD/MM/YYYY HH:mm:ss') + '</td>' +
                                                    '</tr>'
                                                );
                                            });

                                        });

                                    });

                                })


                            }

                        });


                    });

                    $('#job_inv').val('')
                    $.LoadingOverlay("hide");

                });
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