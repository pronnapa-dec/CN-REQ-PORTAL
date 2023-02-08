'use strict';
/*
const url_api = "http://localhost:49705/";
const url_report = "http://localhost:55233/ViewReport?";
*/
//const url_api = "http://192.168.1.247/tms-api/";
//const url_api = "http://192.168.1.247/tms-api-test/";

const url_api = "http://localhost:49705/";
const url_trp_tms_job_add = url_api + "/v1/trp_tms_job_add";
const url_report = "http://192.168.1.247/tms-rpt-test/ViewReport?";

const URL_TRP_SALEFILE_BRANCH_GET = url_api + '/v1/TRP_SALEFILE_BRANCH_GET';
const URL_TMS_JOB_TR_ADD = url_api + '/v1/TMS_JOB_TR_ADD';
const URL_TMS_JOB_TR_JOBNO_GET = url_api + '/v1/TMS_JOB_TR_JOBNO_GET';
const URL_TMS_JOB_MO_UPDATE = url_api + '/v1/TMS_JOB_MO_UPDATE';

//const objProfile = JSON.parse(localStorage.getItem('objProfile'));
const objProfile = JSON.parse(localStorage.getItem('objAuth'));

const user_id = objProfile[0]['username'];
let oTable, mode;

let name, validator, table, options, item_action, item_id;
let shippingNoteList = [];
let manifestNoteList = [];
let ref_id = $.uuid();
let pay_type = 'DC01';
let driver_raw;


function numberWithCommas(x) {

    return x != null ? parseFloat(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
}

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

    toastr.options = {
        "closeButton": false, // true/false
        "debug": false, // true/false
        "newestOnTop": false, // true/false
        "progressBar": true, // true/false
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300", // in milliseconds
        "hideDuration": "500", // in milliseconds
        "timeOut": "900", // in milliseconds
        "extendedTimeOut": "900", // in milliseconds
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    await $.init();
    await $.Driver_Get();

});

$.init = function () {

    $('#frm_data').find('.chk_data_input').off('select2:select').on('select2:select', function (evt) {

        evt.preventDefault();

        $(this).on('select2:select', function (evt) {
            evt.preventDefault();
        });

        let driver_id = $('#driver_id').val()
        //let freight = $('#freight').val()

        if (driver_id != '') {

            $('#job_inv').val('').prop('disabled', false);
            $('#job_inv').focus();

        } else {

            $('#job_inv').prop('disabled', true);

        }

    });

    $('#btn-upload').hide();

    $('#btn-report').hide();

    $('#btn-report').off('click').on('click', function (evt) {

        evt.preventDefault();

        $(this).on('click', function (evt) {
            evt.preventDefault();
        });

        let url_report = "http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_TRP_TMS_JOB&rs:Command=Render&ref_id=" + ref_id + "&rs:Format=pdf"

        window.open(url_report, '_blank');

        return false;

    });

    $('#btn-upload').off('click').on('click', function (evt) {

        evt.preventDefault();

        $(this).on('click', function (evt) {
            evt.preventDefault();
        });

        $('#btn-upload').prop('disabled', true)

        $("#global-loader").fadeIn("slow");

        let add_data = [];

        let driver_raw = $('#frm_data').find('#driver_id :selected').text();

        const driver = driver_raw.split(":");

        for (let i = 0; i < $('#tbl-job-detail tbody tr').length; i++) {

            let uuid = $.uuid();
            let job_date = moment().format('YYYY/MM/DD')
            let job_invoice_date = moment($('#tbl-job-detail tbody tr').eq(i).find('td').eq(2).html(), 'DD/MM/YYYY').format('YYYY/MM/DD')

            add_data.push({
                tran_id: uuid,
                job_date: job_date,
                job_invoice_no: $('#tbl-job-detail tbody tr').eq(i).find('td').eq(1).html(),
                job_invoice_date: job_invoice_date,
                job_pk_no: $('#tbl-job-detail tbody tr').eq(i).find('td').eq(3).html(),
                job_qty: $('#tbl-job-detail tbody tr').eq(i).find('td').eq(4).html(),
                invnet: $('#tbl-job-detail tbody tr').eq(i).find('td').eq(8).html(),
                invcode: $('#tbl-job-detail tbody tr').eq(i).find('td').eq(5).html(),
                job_delivery_name: $('#tbl-job-detail tbody tr').eq(i).find('td').eq(6).html(),
                job_delivery_addr: $('#tbl-job-detail tbody tr').eq(i).find('td').eq(7).html(),
                route_no: '00/0',
                route_name: 'ส่งสินค้าด่วน',
                driver_id: $('#frm_data').find('#driver_id').val(),
                driver_fullname: $.trim(driver[1]),
                job_plate: $('#frm_data').find('#driver_id').val(),
                plate_name: $('#frm_data').find('#driver_id').val(),
                created_by: user_id,
                ref_id: ref_id,
                cod_price: $('#tbl-job-detail tbody tr').eq(i).find('td').eq(8).html().replace(',', ''),
                delivery_type: pay_type,
                created_timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
                batch_no: $('#tbl-job-detail tbody tr').eq(i).find('td').eq(0).html(),
                job_emmas_addres: $('#tbl-job-detail tbody tr').eq(i).find('td').eq(11).html(),
                inv_description: $('#tbl-job-detail tbody tr').eq(i).find('td').eq(12).text(),
                job_status: 'PENDING',
                HHID: $('#frm_data').find('#driver_id').val(),
            });

        };

        //console.log(add_data)

        setTimeout(function () {

            $.ajax({
                url: URL_TMS_JOB_TR_ADD,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(add_data),
                success: function (data) {
                    if (data.status === 'Error') {
                        $.LoadingOverlay("hide", true);
                        toastr.error('Error, Please contact administrator.');
                    } else {

                        //console.log('data', data)

                        $.job_no_tms(ref_id, 'MO')

                    }
                }
            });

        }, 300);
        
    })

    $('#job_inv').off('keyup').on('keyup', function (e) {

        var code = (e.keyCode ? e.keyCode : e.which);

        let val_replace = $(this).val()

        $('#job_inv').val(val_replace.toUpperCase().trim().replace(' ', ''))

        if ($(this).val().length > 0) {

            if (code === 13) {

                $('#job_inv').prop('disabled', true);
                $('#btn-job_inv').trigger("click");

            }
        }

    });

    $('#btn-job_inv').off('click').on('click', async function (evt) {

        evt.preventDefault();

        if ($('#job_inv').val().length > 0) {

            if ($('#job_inv').val().substr(0, 3).toUpperCase() === 'REF') {

                console.log('REF');

                //$.job_ref();

            } else if ($('#job_inv').val().substr(0, 2).toUpperCase() === 'IV') {

                console.log('INV');

                $.job_inv($('#job_inv').val())

                //$("#global-loader").fadeIn("slow");

            } else if ($('#job_inv').val().substr(0, 2).toUpperCase() === 'BR') {

                console.log('BR');

                //$.job_br()


            } else if ($('#job_inv').val().substr(0, 1).toUpperCase() === 'P') {

                console.log('Supplier')

                //$.job_supplier()

            } else {

                $('#job_inv').val('').prop('disabled', false);
                $('#job_inv').focus();
                $("#global-loader").fadeOut("slow");
                toastr.error('ไม่พบข้อมูล');
                console.log('ERROR')

            }

        } else {

            $('#job_inv').val('').prop('disabled', false);
            $('#job_inv').focus();
            toastr.error('ไม่พบข้อมูล');

        }

    });

    $("#tbl-job-detail").on('click', '.delete_inv', function () {

        $(this).closest('tr').remove();

        let count_tr_job_detail = $('#tbl-job-detail tbody tr').length;

        //console.log('tr data', $('#tbl-job-detail tbody tr').length);

        for (let i = 0; i < count_tr_job_detail; i++) {

            $('#tbl-job-detail tbody tr:eq(' + i + ') td').eq(0).html(i + 1);

        }

    })

};

$.job_inv = async function (number) {

    let url = new URL(URL_TRP_SALEFILE_BRANCH_GET);

    url.search = new URLSearchParams({
        branch: $('#frm_data').find('#inv_branch').val(),
        number: $('#job_inv').val()
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        //console.log('result', result.data)

        if (result.status === 'Error') {

            $("#global-loader").fadeOut("slow");

            toastr.error('เกิดข้อผิดพลาด! การดึงข้อมูลบิลล้มเหลว');

            $('#job_inv').val('').prop('disabled', false);
            $('#job_inv').focus();

        } else {

            if (result.length == 0) {

                toastr.error('เกิดข้อผิดพลาด! การแสดงข้อมูลบิลล้มเหลว');

                $('#job_inv').val('').prop('disabled', false);
                $('#job_inv').focus();

                $("#global-loader").fadeOut("slow");

            } else {

                $.job_check(result);

            }

        }

    });

}

$.job_check = async function (result_inv) {

    let order = $('#tbl-job-detail tbody tr').length;

    let i = order < 0 ? 0 : order + 1;

    let uuid = $.uuid();

    if (order > 0) {

        let invoice_no_data = [];

        let check_inv = 0

        for (let i = 0; i < $('#tbl-job-detail tbody tr').length; i++) {
            invoice_no_data.push({
                job_invoice_no: $('#tbl-job-detail tbody tr').eq(i).find('td').eq(1).html(),
            });
        };

        $.each(invoice_no_data, function (key, val) {

            if ($.trim(val['job_invoice_no']) == $.trim($('#job_inv').val())) {
                check_inv = 1
            }

        });

        setTimeout(function () {

            if (check_inv == 1) {

                toastr.warning('พบเลขที่บิลซ้ำ');

                $('#job_inv').val('').prop('disabled', false);
                $('#job_inv').focus();

                $("#global-loader").fadeOut("slow");

            } else {

                $.job_create(result_inv);

            }

        }, 100);

    } else {

        //alert(2)
        $.job_create(result_inv);

    }

}

$.job_create = async function (result_inv) {

    //console.log('result_inv', result_inv);

    let cod_price
    let descript = result_inv.data['0']['descript'].toUpperCase();
    let ck_cod = descript.search("<COD>")
    if (ck_cod >= 0) {
        cod_price = result_inv.data['0']['invsumtt']
        pay_type = 'DC02'
    } else {
        cod_price = 0
        pay_type = 'DC01'
    }

    let shippingNoteDescription

    let job_invoice_no = $.trim(result_inv.data[0]['number']);

    let job_pk_no = $.trim(result_inv.data[0]['invpo']);

    if (job_invoice_no == '' || job_invoice_no == null || job_invoice_no == '-') {

        shippingNoteDescription = job_pk_no

    } else {

        shippingNoteDescription = job_invoice_no

    }

    //verify addr start

    let receiverAddress = ''

    let job_delivery_addr = $.trim(result_inv.data[0]['e_delivery_address']);
    let status_verify_addr = 0

    if ($.trim(result_inv.data['0']['emlocation']) != '') {

        if (job_delivery_addr.search(/จ\./) >= 0) {
            status_verify_addr = 1
            console.log('a1', status_verify_addr)
        } else if (job_delivery_addr.search("จังหวัด.") >= 0) {
            status_verify_addr = 1
            console.log('a2', status_verify_addr)
        } else if (job_delivery_addr.search("เขต") >= 0) {
            status_verify_addr = 1
            console.log('a3', status_verify_addr)
        } else if (job_delivery_addr.search("แขวง") >= 0) {
            status_verify_addr = 1
            console.log('a4', status_verify_addr)
        } else if (job_delivery_addr.search(/อ\./) >= 0) {
            status_verify_addr = 1
            console.log('a5', status_verify_addr)
        } else if (job_delivery_addr.search("อำเภอ") >= 0) {
            status_verify_addr = 1
            console.log('a6', status_verify_addr)
        } else if (job_delivery_addr.search(/ต\./) >= 0) {
            status_verify_addr = 1
            console.log('a7', status_verify_addr)
        } else if (job_delivery_addr.search("ตำบล") >= 0) {
            status_verify_addr = 1
            console.log('a8', status_verify_addr)
        } else {
            status_verify_addr = 0
            console.log('a9', status_verify_addr)
        }

        //console.log('emlocation != null', status_verify_addr)

    } else {

        if (job_delivery_addr.search("กรุงเทพฯ") >= 0) {
            status_verify_addr = 1
            receiverAddress = job_delivery_addr.replace('กรุงเทพฯ', 'กรุงเทพมหานคร')
            console.log('b1', status_verify_addr)
        } else if (job_delivery_addr.search(" กรุงเทพ ") >= 0) {
            status_verify_addr = 1
            receiverAddress = job_delivery_addr.replace(' กรุงเทพ ', 'กรุงเทพมหานคร')
            console.log('b2', status_verify_addr)
        } else if (job_delivery_addr.search(/กทม\./) >= 0) {
            status_verify_addr = 1
            receiverAddress = job_delivery_addr.replace('กทม.', 'กรุงเทพมหานคร')
            console.log('b3', status_verify_addr)
        } else if (job_delivery_addr.search(/จ\./) >= 0) {
            status_verify_addr = 1
            console.log('b4', status_verify_addr)
        } else if (job_delivery_addr.search("จังหวัด.") >= 0) {
            status_verify_addr = 1
            console.log('b5', status_verify_addr)
        } else if (job_delivery_addr.search("เขต") >= 0) {
            status_verify_addr = 1
            console.log('b6', status_verify_addr)
        } else if (job_delivery_addr.search("แขวง") >= 0) {
            status_verify_addr = 1
            console.log('b7', status_verify_addr)
        } else if (job_delivery_addr.search(/อ\./) >= 0) {
            status_verify_addr = 1
            console.log('b8', status_verify_addr)
        } else if (job_delivery_addr.search("อำเภอ") >= 0) {
            status_verify_addr = 1
            console.log('b9', status_verify_addr)
        } else if (job_delivery_addr.search(/ต\./) >= 0) {
            status_verify_addr = 1
            console.log('b10', status_verify_addr)
        } else if (job_delivery_addr.search("ตำบล") >= 0) {
            status_verify_addr = 1
            console.log('b11', status_verify_addr)
        } else {
            status_verify_addr = 0
            console.log('b12', status_verify_addr)
        }

        //console.log('emlocation = null', status_verify_addr)

    }

    if (job_delivery_addr.search("COD") >= 0 || job_delivery_addr.search("cod") >= 0) {

        receiverAddress = '87/18-21 หมู่ 13 ถนนสุวินทวงศ์ แขวง มีนบุรี เขต มีนบุรี กรุงเทพมหานคร 10510';

    } else {

        if (status_verify_addr == 1) {

            receiverAddress = job_delivery_addr.replace('กรุงเทพฯ', 'กรุงเทพมหานคร').replace(' กรุงเทพ ', 'กรุงเทพมหานคร').replace('กทม.', 'กรุงเทพมหานคร');

        } else {

            receiverAddress = '87/18-21 หมู่ 13 ถนนสุวินทวงศ์ แขวง มีนบุรี เขต มีนบุรี กรุงเทพมหานคร 10510';

        }

    }

    let uuid = $.uuid();
    let order = $('#tbl-job-detail tbody tr').length;
    let i = order < 0 ? 0 : order + 1;

    $('#tbl-job-detail tbody').prepend('<tr class="' + $.trim(result_inv.data['0']['invcode']) + '">' +
        '<td class="tx-center">' + i + '</td>' +
        '<td class="tx-left inv_no">' + $.trim(result_inv.data['0']['number']) + '</td>' +
        '<td class="tx-left">' + moment(result_inv.data['0']['invdate']).format('DD/MM/YYYY') + '</td>' +
        '<td class="tx-left">' + $.trim(result_inv.data['0']['invpo']) + '</td>' +
        '<td class="tx-center">' + $.trim(result_inv.data['0']['item']) + '</td>' +
        '<td class="tx-left">' + $.trim(result_inv.data['0']['invcode']) + '</td>' +
        '<td class="tx-left">' + $.trim(result_inv.data['0']['invname']) + '</td>' +
        '<td class="tx-left">' + receiverAddress + '</td>' +
        '<td class="tx-right">' + cod_price + '</td>' +
        '<td class="tx-left">' + user_id + '</td>' +
        '<td class="tx-center delete_inv">' + "<a class='delete_inv_item' id='delete_item" + uuid + "' type='button'><i class='si si-trash text-danger mr-2' data-toggle='tooltip' title='Delete' data-placement='top' data-original-title='Delete'></i></a>" + '</td>' +
        '<td class="tx-left d-none">' + $.trim(result_inv.data['0']['emmas_addres']) + '</td>' +
        '<td class="tx-left d-none">' + $.trim(result_inv.data['0']['descript']) + '</td>'

    );

    i++
    $('#job_inv').val('').prop('disabled', false);
    $('#job_inv').focus();

    toastr.success('เพิ่มบิลสำเร็จ');

    if (order > 0) {

        $('#btn-upload').show();

    }

    $("#global-loader").fadeOut("slow");

}

$.job_no_tms = async function (ref_id,mode) {

    let url = new URL(URL_TMS_JOB_TR_JOBNO_GET);

    url.search = new URLSearchParams({   
        mode: mode, // MO
        ref_id: ref_id,
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        $.each(result.data, function (key, val) {

            shippingNoteList.push({
                "shippingNoteCode": val['job_no'],
                "shippingNoteDescription": val['bill_list'],
                //"shippingNoteDescription": val['job_no'],
                "deliveryDate": val['job_date'],
                "packageNumber": val['job_no'],
                "productAmount": val['job_qty'], //i,
                "codPrice": val['cod_price'],
                "weight": 1,
                "volume": 1,
                "senderName": 'VSK',
                "receiverName": val['job_delivery_name'],
                "actualReceiverName": val['job_delivery_name'],
                "receiverContact": 0,
                "receiverAddress": val['job_delivery_addr'] ,//"87/18-21 หมู่ 13 ถนนสุวินทวงศ์ แขวง มีนบุรี เขต มีนบุรี กรุงเทพมหานคร 10510",
                "endRouteLineCode": val['route_no'],
                "lat": 13.8163198,
                "lng": 100.7228919,
                "productCode": val['job_no'],
                "deliveryProjectCode": 'VSM-001',
                "startConsumerDistributionCenterCode": 'DCC-001',
            });

            //i++

        });

        manifestNoteList = [
            {
                "deliveryProjectCode": 'VSM-001',
                "underDistributionCenterCode": 'VSM',
                "vehicleLicensePlate": result.data[0]['job_plate'],
                "vehicleFuelUseRate": 0,
                "vehiclePercentReFuel": 0,
                "addOnVehicleLicensePlate": result.data[0]['driver_id'],
                "driverCode": result.data[0]['driver_id'],
                "driverName": result.data[0]['driver_fullname'],
                "manifestNoteCreateDate": result.data[0]['job_date'],
                "manifestNoteStartType": 1,
                "startDistributionCenterCode": 'VSM',
                "endRouteLineCode": result.data[0]['route_no'],
                "receiveProductDate": result.data[0]['job_date'],
                "shippingNoteList": shippingNoteList
            }
        ];

        $.upload_tms(ref_id);

    });

}

$.upload_tms = async function (ref_id) {

    await $.ajax({
        async: false,
        url: 'https://vsk.tms-vcargo.com/api/tms/public/v1/manifestnote/create-shipping-note-and-create-manifest-customer',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({ 'manifestNoteList': manifestNoteList }),
        success: function (result) {
            //console.log(result)
            //console.log(result.statusCode)

            //citem_job = [];

            $.job_update('MO', ref_id)

        },
        error: function (xhr, ajaxOptions, thrownError) {

            //alert(xhr.status);
            $("#global-loader").fadeOut("slow");

            swal({
                title: 'เกิดข้อผิดพลาด!',
                text: 'ไม่สามารถส่งข้อมูลขึ้น TMS ',
                type: 'error',
                confirmButtonColor: '#57a94f'
            })

            //console.log(xhr.status)

            if (xhr.status == 400) {

                $('#modal-frm_add_job').modal({
                    keyboard: false,
                    backdrop: 'static'
                });

            }

        }

    });

}

$.job_update = async function (mode, data) {

    let data_update = {
        mode: mode,
        ref_id: data,
        updated_by: user_id,
    };

    var params = [];
    for (const i in data_update) {
        params.push(i + "=" + encodeURIComponent(data_update[i]));
    }

    fetch(URL_TMS_JOB_MO_UPDATE, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params.join("&"),
    }).then(data => {
        return data.json();
    }).then(result => {

        //console.log('result', result.data)

        if (result.status === 'Error') {

            swal({
                title: 'เกิดข้อผิดพลาด!',
                text: 'การสร้างข้อมูลล้มเหลว',
                type: 'error',
                confirmButtonColor: '#57a94f'
            })

            $("#global-loader").fadeOut("slow");

        } else {

            $("#global-loader").fadeOut("slow");

            swal({
                title: "สำเร็จ!",
                text: "ทำรายการสำเร็จ",
                type: 'success',
                timer: 500,
                showConfirmButton: false
            });


            toastr.success('Save Successfully!', async function () {
                $('#frm_data').find('#job_inv').prop("disabled", true);
                $('#frm_data').find('#job_date').prop("disabled", true);

                $('#frm_data').find('#driver_id').prop("disabled", true);
                $('#frm_data').find('#btn-reset').removeClass('d-none');
                $('#frm_data').find('.delete_inv_item').prop("disabled", true);
                $('#btn-upload').hide();
                $('#btn-report').show();
            });

            $.LoadingOverlay("hide");

            //console.log('manifestNoteList', manifestNoteList)

            shippingNoteList = [];
            manifestNoteList = [];

        }

    });

}


$.Upload_TMS_v1 = async function () {

    fetch(url_api + '/v1/trp_tms_job_get' + '?' + 'ref_id=' + ref_id).then(function (response) {

        return response.json();

    }).then(function (result) {

        if (result.length > 0) {

            //let i = 1

            $.each(result.data, function (key, val) {

                shippingNoteList.push({
                    "shippingNoteCode": val['job_no'],
                    "shippingNoteDescription": val['bill_list'],
                    //"shippingNoteDescription": val['job_no'],
                    "deliveryDate": val['job_date'],
                    "packageNumber": val['job_no'],
                    "productAmount": val['job_qty'], //i,
                    "codPrice": val['cod_price'],
                    "weight": 1,
                    "volume": 1,
                    "senderName": 'VSK',
                    "receiverName": val['job_delivery_name'] + ' ' + val['job_delivery_addr'],
                    "actualReceiverName": val['job_delivery_name'] + ' ' + val['job_delivery_addr'],
                    "receiverContact": 0,
                    "receiverAddress": "87/18-21 หมู่ 13 ถนนสุวินทวงศ์ แขวง มีนบุรี เขต มีนบุรี กรุงเทพมหานคร 10510",
                    "endRouteLineCode": val['route_no'],
                    "lat": 13.8163198,
                    "lng": 100.7228919,
                    "productCode": val['job_no'],
                    "deliveryProjectCode": 'VSM-001',
                    "startConsumerDistributionCenterCode": 'DCC-001',
                });

                //i++

            });

            manifestNoteList = [
                {
                    "deliveryProjectCode": 'VSM-001',
                    "underDistributionCenterCode": 'VSM',
                    "vehicleLicensePlate": result.data[0]['driver_id'],
                    "vehicleFuelUseRate": 0,
                    "vehiclePercentReFuel": 0,
                    "addOnVehicleLicensePlate": '',
                    "driverCode": result.data[0]['driver_id'],
                    "driverName": "",
                    "manifestNoteCreateDate": result.data[0]['job_date'],
                    "manifestNoteStartType": 1,
                    "startDistributionCenterCode": 'VSM',
                    "endRouteLineCode": result.data[0]['route_no'],
                    "receiveProductDate": result.data[0]['job_date'],
                    "shippingNoteList": shippingNoteList
                }
            ];

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
                            $('#frm_data').find('#job_date').prop("disabled", true);

                            $('#frm_data').find('#driver_id').prop("disabled", true);
                            $('#frm_data').find('#btn-reset').removeClass('d-none');
                            $('#frm_data').find('.delete_inv_item').prop("disabled", true);
                            $('#btn-upload').hide();
                            $('#btn-report').show();
                        });

                        $.LoadingOverlay("hide");

                        //console.log('manifestNoteList', manifestNoteList)

                        shippingNoteList = [];
                        manifestNoteList = [];

                    });

                }

            });

        } else {
            $.LoadingOverlay("hide", true);
            toastr.error('เกิดข้อผิดพลาดระหว่างอัปโหลด');

        }

    })

}

$.Driver_Get = async function () {

    $.ajax({
        async: false,
        url: 'https://vsk.tms-vcargo.com/api/tms/public/v1/driver/search',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({ 'code': '', 'name': '' }),
        success: function (result) {

            if (result.object.length > 0) {

                let Master_dataSet = [];

                $.each(result.object, function (key, val) {

                    Master_dataSet.push({ id: val['code'], text: (val['code'] + ' : ' + val['firstNameTh'] + ' ' + val['lastNameTh']) });

                });

                $('#frm_data').find('#driver_id').select2({
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

        }

    });

}

