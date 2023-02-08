'use strict';

const url_api = "http://localhost:49705/";

const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const user_id = objProfile[0]['username'];
const api_key = "cOaI7TF@3am9Gc?89hqC(18)h{{G$dsaVt0$FnxpCf0vO%I2{Fp8?Y7rBcRqNNzv";

const URL_TRP_SALEFILE_BRANCH_GET = url_api + '/v1/TRP_SALEFILE_BRANCH_GET';

const url_employee_movemax_get = "https://vsk.movemax.me/public-api/tms/v1/employee";
const url_vehicle_movemax_get = "https://vsk.movemax.me/public-api/tms/v1/vehicle";
const url_routeline_movemax_get = "https://vsk.movemax.me/public-api/tms/v1/routeline";
const url_manifestnote_shippingnote_create = "https://vsk.movemax.me/public-api/tms/v1/manifestnote/shippingnote/create";

const url_vsk_manifestnote_create = url_api + '/v1/MM_ManiFestNote_Create';
const url_vsk_manifestnote_get = url_api + '/v1/MM_ManifestNoteBike_Get';
const url_vsk_manifestnotejob_create = url_api + '/v1/MM_ManifestNoteJobCreate';
const url_vsk_manifestnotejob_list = url_api + '/v1/MM_ManifestNote_List';
const url_vsk_shippingnotebookingmuli_get = url_api + '/v1/MM_ShippingNoteBookingMulit_Get';
const url_vsk_productmulit_get = url_api + '/v1/MM_ProductMulit_Get';
const url_vsk_productmulit_delete = url_api + '/v1/MM_ProductMulit_Delete';

const url_vsk_product_p_mulit_get = url_api + '/v1/MM_ProductPMulit_Get';
const url_vsk_product_br_mulit_get = url_api + '/v1/MM_ProductBRMulit_Get';
const url_vsk_product_ref_mulit_get = url_api + '/v1/MM_ProductRefMulit_Get';

let ref_id = $.uuid();
let pay_type = 'DC01', driver_raw;
let DriverMessengerList, PlateList, RoutelineList, MM_manifestNoteList, MM_manifestNoteMulit, ProductMulitList = [];
let table_list
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
        "timeOut": "1000", // in milliseconds
        "extendedTimeOut": "1000", // in milliseconds
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "show",
        "hideMethod": "hide"
    };

    await $.init();
    await $.Master_Get();

});

$.init = async function () {

    DriverMessengerList = await $.MM_Employee_Get("" /*code*/, "" /*positionName*/, "พนักงานขับรถมอเตอร์ไซค์" /*groupName*/);
    RoutelineList = await $.MM_Routeline_Get("" /*code*/, "" /*name*/);
    PlateList = await $.MM_Plate_Get("" /*licensePlate*/, "" /*name*/, "" /*province*/, "" /*vehicleBrandName*/, "" /*vehicleModelName*/, "" /*vehicleKind*/);

    console.log('DriverMessengerList', DriverMessengerList.data);
    console.log('RoutelineList', RoutelineList.data);
    console.log('PlateList', PlateList.data);

    $('#job_date').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        },
    });

    $('#job_status').select2()

    $('#frm_data').find('.chk_data_input').off('select2:select').on('select2:select', function (evt) {

        evt.preventDefault();

        $(this).on('select2:select', function (evt) {
            evt.preventDefault();
        });

        let job_date = $('#job_date').val()
        let route_no = $('#route_no').val()
        let job_plate = $('#job_plate').val()
        let driver_id = $('#driver_id').val()
        let job_status = $('#job_status').val()

        if (job_date != '' && route_no != '' && job_plate != '' && driver_id != '' && job_status != '') {

            $('#job_inv').prop("disabled", false);
            $('#job_inv').focus();

        } else {

            $('#job_inv').prop('disabled', true);

        }

    });

    $('#driver_id').off('select2:select').on('select2:select', async function (e) {

        e.preventDefault();

        $('#job_plate').val('').trigger('change')

        var data = e.params.data;

        let email = data.email == undefined ? '' : data.email
        let tel = data.tel == undefined ? '' : data.tel.replace('-', '')
        let para = email != '' ? email : tel

        let plate_get = PlateList.data

        function isCherries(fruit) {

            return fruit.licensePlate == para;
        }

        let plate_data = plate_get.find(isCherries)

        let licensePlate

        if (plate_data != undefined) {
            licensePlate = plate_data.licensePlate == undefined ? '' : plate_data.licensePlate
        } else {
            licensePlate = ''
        }

        if (tel != '') {

            //$('#job_plate').val(licensePlate.replace('-', '')).trigger('change')
            $('#job_plate').val(licensePlate).trigger('change')
            $('#job_inv').prop("disabled", false).focus();

        } else {

            $('#job_plate').val('').trigger('change')
            $('#job_inv').val('').prop("disabled", true)
        }

    });

    //$('#btn-upload').hide();

    //$('#btn-report').hide();

    $('#btn-report').off('click').on('click', function (evt) {

        evt.preventDefault();

        $(this).on('click', function (evt) {
            evt.preventDefault();
        });

        let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY-MM-DD')
        let driver_id = $('#driver_id').val()
        let route_no = $('#route_no').val()
        let job_plate = $('#job_plate').val()

        //let url_report = "http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_TRP_TMS_JOB&rs:Command=Render&ref_id=" + ref_id + "&rs:Format=pdf"

        let url_report = "http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_MM_JOB_SHIPPING&rs:Command=Render&documentDate=" + job_date + "&endRouteLineCode=" + route_no + "&driverCode=" + driver_id + "&vehicleCode=" + job_plate +"&rs:Format=pdf"

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
            let job_pk_no = $('#tbl-job-detail tbody tr').eq(i).find('td').eq(3).html()
            let route_no = ''
            let route_name = ''

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
                route_no: $('#frm_data').find('#route_no').find(":selected").val(),
                route_name: $('#frm_data').find('#route_no').find(":selected").html(),
                driver_id: $('#frm_data').find('#driver_id').val(),
                driver_fullname: $.trim(driver[1]),
                job_plate: $('#job_plate').find(":selected").val(),
                plate_name: $('#job_plate').find(":selected").html(),
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

        console.log(add_data)

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

                        $.job_no_tms(ref_id, 'TR')

                    }
                }
            });

        }, 300);

    })

    $('#job_inv').off('keyup').on('keyup', function (e) {

        let newStr = $('#job_inv').val();

        $('#job_inv').val(newStr.replace(" ", "").toUpperCase());

        var code = (e.keyCode ? e.keyCode : e.which);

        if ($(this).val().length > 0) {

            if (code === 13) {

                $('#btn-job_inv').trigger("click");
            }
        }

    });

    $('#btn-job_inv').off('click').on('click', async function (evt) {

        evt.preventDefault();

        $('#job_inv').prop('disabled', true);

        if ($('#job_inv').val().length > 0) {

            driver_raw = $('#driver_id :selected').text();

            const driver = driver_raw.split(":");
            let driver_code = $.trim(driver[0]);

            if ($('#job_inv').val().substr(0, 3).toUpperCase() === 'REF') {

                $.ProductMulitRef_Get($('#job_inv').val());

            } else if ($('#job_inv').val().substr(0, 2).toUpperCase() === 'IV') {

                $.ProductMulit_Get($('#job_inv').val());

            } else if ($('#job_inv').val().substr(0, 2).toUpperCase() === 'BR') {

                $.ProductMulitBR_Get($('#job_inv').val());

            } else if ($('#job_inv').val().substr(0, 1).toUpperCase() === 'P') {

                $.ProductMulitP_Get($('#job_inv').val());

            } else {

                toastr.error('ไม่พบข้อมูล');
                $('#job_inv').val('').prop('disabled', false);
                $('#job_inv').focus();
                $.LoadingOverlay("hide");

            }

        } else {

            $('#job_inv').val('').prop('disabled', false);
            $('#job_inv').focus();
            toastr.error('ไม่พบข้อมูล');

        }

    });

    $('#btn-add_job').off('click').on('click', async function (evt) {

        evt.preventDefault();

        $('#frm_data').parsley().validate();

        if ($('#frm_data').parsley().isValid()) {

            $(this).prop('disabled', true);

            $('#job_date').prop("disabled", true);
            $('#route_no').prop("disabled", true);
            $('#job_plate').prop("disabled", true);
            $('#driver_id').prop("disabled", true);
            $('#job_status').prop("disabled", true);
            $('#job_inv').prop("disabled", true);
            $('#btn-job_inv').prop("disabled", true);

            $('.delete_inv_item').prop("disabled", true);

            let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY-MM-DD')
            let driver_id = $('#driver_id').val()
            let route_no = $('#route_no').val()
            let job_plate = $('#job_plate').val()

            $("#global-loader").fadeIn();

            MM_manifestNoteMulit = await $.MM_manifestNoteMulit_Create(ref_id, route_no, driver_id, job_plate, job_date, user_id);

        }

        //console.log('MM_manifestNoteMulit', MM_manifestNoteMulit)

    });

};

$.ProductMulit_Get = async function (NUMBER) {

    let url = new URL(url_vsk_productmulit_get);

    url.search = new URLSearchParams({
        NUMBER: NUMBER,
        REF_ID: ref_id,
        CREATE_BY: user_id
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        //console.log('result', result.data)

        if (result.status === 'Error') {

            $("#global-loader").fadeOut("slow");

            toastr.error('เกิดข้อผิดพลาด! การดึงข้อมูลบิลล้มเหลว');

            $('#job_inv').val('').prop('disabled', false).focus();

        } else {

            if (result.length == 0) {

                toastr.error('เกิดข้อผิดพลาด! การแสดงข้อมูลบิลล้มเหลว');

                $('#job_inv').val('').prop('disabled', false).focus();

                $("#global-loader").fadeOut("slow");

            } else {

                if (result.data[0]['pMessage'] != '') {

                    toastr.error('เกิดข้อผิดพลาด! การแสดงข้อมูลบิลล้มเหลว');

                    $('#job_inv').val('').prop('disabled', false).focus();

                    $("#global-loader").fadeOut("slow");

                } else {

                    $("#global-loader").fadeOut("slow");

                    $('#job_inv').val('').prop('disabled', false).focus();

                    toastr.success('เพิ่มบิลสำเร็จ');

                    $.ProductMulit_List(result);
                }
            }

        }

    });

};

$.ProductMulitP_Get = async function (NUMBER) {

    let url = new URL(url_vsk_product_p_mulit_get);

    url.search = new URLSearchParams({
        NUMBER: NUMBER,
        REF_ID: ref_id,
        CREATE_BY: user_id
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

            if (result.data[0]['pMessage'] != '') {

                toastr.error('เกิดข้อผิดพลาด! การแสดงข้อมูลบิลล้มเหลว');

                $('#job_inv').val('').prop('disabled', false).focus();

                $("#global-loader").fadeOut("slow");

            } else {

                $("#global-loader").fadeOut("slow");

                $('#job_inv').val('').prop('disabled', false).focus();

                toastr.success('เพิ่มบิลสำเร็จ');

                $.ProductMulit_List(result);

            }

        }

    });

};

$.ProductMulitBR_Get = async function (NUMBER) {

    let url = new URL(url_vsk_product_br_mulit_get);

    url.search = new URLSearchParams({
        NUMBER: NUMBER,
        REF_ID: ref_id,
        CREATE_BY: user_id
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

            if (result.data[0]['pMessage'] != '') {

                toastr.error('เกิดข้อผิดพลาด! การแสดงข้อมูลบิลล้มเหลว');

                $('#job_inv').val('').prop('disabled', false).focus();

                $("#global-loader").fadeOut("slow");

            } else {

                $("#global-loader").fadeOut("slow");

                $('#job_inv').val('').prop('disabled', false).focus();

                toastr.success('เพิ่มบิลสำเร็จ');

                $.ProductMulit_List(result);

            }

        }

    });

};

$.ProductMulitRef_Get = async function (NUMBER) {

    let url = new URL(url_vsk_product_ref_mulit_get);

    url.search = new URLSearchParams({
        NUMBER: NUMBER,
        REF_ID: ref_id,
        CREATE_BY: user_id
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


            if (result.data[0]['pMessage'] != '') {

                toastr.error('เกิดข้อผิดพลาด! การแสดงข้อมูลบิลล้มเหลว');

                $('#job_inv').val('').prop('disabled', false).focus();

                $("#global-loader").fadeOut("slow");

            } else {

                $("#global-loader").fadeOut("slow");

                $('#job_inv').val('').prop('disabled', false).focus();

                toastr.success('เพิ่มบิลสำเร็จ');

                $.ProductMulit_List(result);

            }

        }

    });

};


$.ProductMulit_List = async function (result) {

    if (result.length > 0) {
        $('#btn-add_job').prop('disabled', false);
    } else {
        $('#btn-add_job').prop('disabled', true);
    }

    table_list = $('#table_list').DataTable({
        "data": result.data,
        dom: '<Bf<t>lip>',
        language: {
            search: "_INPUT_",
            searchPlaceholder: "ค้นหา..."
        },
        deferRender: true,
        ordering: true,
        pageLength: -1,
        bDestroy: true,
        autoWidth: false,
        //buttons: [
        //    'copyHtml5',
        //    {
        //        extend: 'excelHtml5',
        //        title: '',
        //        filename: 'REPORT_TRP_MO_' + moment().format("YYYY/MM/DD hh:ss:mm"),
        //        //exportOptions: {
        //        //    columns: [2, 3, 4, 5, 8, 9, 10, 11, 13, 14, 15, 17, 19, 20, 21]
        //        //}
        //    },
        //],
        lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        columns: [
            {
                title: "#",
                class: "tx-center align-middle",
                width: "5%",
                render: function (data, type, row, meta) {
                    return (meta.row) + 1;
                }
            }, //0
            {
                title: "<div class='text-center'>document</div>",
                data: "f_driverCode",
                class: "tx-left align-top",
                width: "15%",
                //visible: false,
                render: function (data, type, row, meta) {

                    let date = moment(row.date, 'YYYY/MM/DD').format('DD/MM/YYYY');
                    let orderNo = row.orderNo;
                    let packageNo = row.packageNo;

                    let dt = ''

                    dt += '<span class="tx-12 tx-bold mr-1 mb-1">วันที่บิล : </span>' + '<span class="text-primary tx-bold tx-12">' + date + '</span>'
                    dt += '<br>'
                    dt += '<hr class="mb-1 mt-1">'
                    dt += '<span class="tx-12 tx-bold mr-2">สั่งซื้อ : </span> <span class="tx-12 tx-bold">' + orderNo + '</span>'
                    dt += '<br>'
                    dt += '<span class="tx-12 tx-bold mr-2">สั่งจัด : </span> <span class="tx-12 tx-secondary tx-bold">' + packageNo + '</span>'

                    return dt;
                }
            },
            {
                title: "<div class='text-center'>CUSTOMER</div>",
                data: "f_driverCode",
                class: "tx-left align-top",
                width: "60%",
                //visible: false,
                render: function (data, type, row, meta) {

                    let code = row.code;
                    let name = row.name;
                    let invcode = row.invcode;
                    let invname = row.invname;
                    let evname = row.evname;
                    let evadd = row.evadd;
                    let eaddress = row.eaddress;
                    let elocation = row.elocation;
                    let con_ev = evname == '' ? '-' : evname + ' ' + evadd
                    let dt = ''

                    dt += '<span class="tx-12 tx-bold mr-1 mb-1">รหัส : </span> <span class="tx-12 tx-left tx-bold mb-1 mr-1">' + invcode + '</span>'
                    dt += '<br>'
                    dt += '<span class="tx-12 tx-bold mr-1 mb-1">ชื่อ : </span><span class="tx-12 tx-left">' + invname + '</span>'
                    dt += '<br>'
                    dt += '<span class="tx-12 tx-bold mr-1 mb-1">ที่อยู่ : </span><span class="tx-12 tx-left">' + eaddress + ' ' + elocation + '</span>'
                    dt += '<br>'
                    dt += '<span class="tx-12 tx-bold mr-1 mb-1">อู่ : </span><span class="tx-12 tx-left">' + con_ev + '</span>'
                    //dt += '<br>'
                    //dt += '<span class="tx-12 tx-bold mr-1 mb-1">ที่อยู่ : </span><span class="tx-12 tx-left">' + d_job_emmas_addres + '</span>'
                    //dt += '<hr class="mb-1 mt-1">'
                    //dt += '<span class="tx-12 tx-bold">จัดส่ง : </span>' + '<span class="tx-12 tx-left">' + job_delivery_addr + '</span>';

                    return dt;
                }
            },
            {
                title: "<div class='text-center'>COD</div>",
                class: "tx-right align-end",
                width: "10%",
                render: function (data, type, row, meta) {

                    let cod_price_full = numberWithCommas(row.cod);

                    cod_price_full = cod_price_full > '0' ? '<p class="tx-bold tx-danger"><u class="tx-bold tx-success mr-1">' + cod_price_full + '</u>฿</p>' : cod_price_full

                    return cod_price_full;
                }
            }, //4
            {
                title: "<div class='text-center'>ACTION</div>",
                class: "tx-left align-top",
                width: "15%",
                //visible: false,
                render: function (data, type, row, meta) {

                    let created_by = row.created_by
                    let created_date = moment(row.created_date).format("DD/MM/YYYY HH:mm:ss")

                    return '<div class="row justify-content-center">' +
                        '<div class="col-12">' +
                        '<button class="btn btn-sm btn-danger btn-rounded w-100 btn-action delete_inv_item">' + 'DELETE' + '</button>' +
                        '<hr class="mb-1 mt-1">' +
                        '<span class="tx-12 w-100 badge badge-warning">' + created_by + '</span>' +
                        '<span class="tx-9 w-100 badge bd bd-1 bd-warning">' + created_date + '</span>' +

                        '</div >' +

                        '</div >';
                }
            }, //
            {
                data: "invcode",
                visible: false,
            }, //invcode
            {
                data: "invname",
                visible: false,
            }, //invname
            {
                data: "evname",
                visible: false,
            }, //evname
            {
                data: "evadd",
                visible: false,
            }, //evadd
            {
                data: "eaddress",
                visible: false,
            }, //eaddress
            {
                data: "elocation",
                visible: false,
            }, //elocation
            {
                data: "code",
                visible: false,
            }, //code
            {
                data: "name",
                visible: false,
            }, //name
            {
                data: "date",
                visible: false,
            }, //date
            {
                data: "orderNo",
                visible: false,
            }, //orderNo
            {
                data: "packageNo",
                visible: false,
            }, //packageNo
            {
                data: "cod",
                visible: false,
            }, //cod
            {
                data: "description",
                visible: false,
            }, //description
            {
                data: "qty",
                visible: false,
            }, //qty
            {
                data: "unitCode",
                visible: false,
            }, //unitCode
            {
                data: "hasCalWeightPerUnit",
                visible: false,
            }, //hasCalWeightPerUnit
            {
                data: "weightPerUnit",
                visible: false,
            }, //weightPerUnit
            {
                data: "volumeType",
                visible: false,
            }, //volumeType
            {
                data: "boxSizeWidth",
                visible: false,
            }, //boxSizeWidth
            {
                data: "boxSizeLength",
                visible: false,
            }, //boxSizeLength
            {
                data: "boxSizeHeight",
                visible: false,
            }, //boxSizeHeight
            {
                data: "hasCalVolumePerUnit",
                visible: false,
            }, //hasCalVolumePerUnit
            {
                data: "volumePerUnit",
                visible: false,
            }, //volumePerUnit
            {
                data: "created_by",
                visible: false,
            }, //created_by
            {
                data: "created_date",
                visible: false,
            }, //created_date
            {
                data: "ref_id",
                visible: false,
            }, //ref_id

        ],
        rowCallback: function (row, data) {

            //if (data.record_status == 0) {
            //    $('td:eq(1)', row).parent().addClass('bg-danger-transparent');
            //    $('td:eq(1)', row).parent().addClass('text-danger');
            //    //$('td:eq(1)', row).parent().addClass('tx-line-through');
            //    $('td:eq(1)', row).parent().css("text-decoration-line", "line-through");
            //    $('td:eq(1)', row).find('span').css("text-decoration-line", "line-through");
            //    $('td:eq(0)', row).find('a').removeClass('btn-report').removeAttr('href');
            //}

        },
        initComplete: function (settings, json) {

            $(".loader-spinner").addClass("d-none");

            $("#global-loader").fadeOut();

            $('#table_list tbody').off('click', '.delete_inv_item').on('click', '.delete_inv_item', async function (e) {

                e.preventDefault()

                var data = table_list.row($(this).parents('tr')).data();

                $.ProductMulit_Delete(data);

            });

        }

    });

};

$.ProductMulit_Delete = async function (citem) {

    //console.log('citem', citem)

    let data = {
        NUMBER: citem['orderNo'],
        REF_ID: citem['ref_id'],
        CREATE_BY: user_id,
    };

    var params = [];
    for (const i in data) {
        params.push(i + "=" + encodeURIComponent(data[i]));
    }

    fetch(url_vsk_productmulit_delete + '?' + params.join("&"), {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }).then(data => {
        return data.json();
    }).then(result => {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            toastr.success('Invoice delete success.');

            $.ProductMulit_List(result);

        }

    }).catch(error => {

        toastr.error('Error, Please contact administrator.');

    });

};

$.MM_manifestNoteMulitList_Get = async function (REF_ID, ROUTE, DRIVER, VEHICLE, JOBDATE, CREATE_BY) {

    let data = {
        REF_ID: REF_ID,
        ROUTE: ROUTE,
        DRIVER: DRIVER,
        VEHICLE: VEHICLE,
        JOBDATE: JOBDATE,
        CREATE_BY: CREATE_BY
    };

    var params = [];
    for (const i in data) {
        params.push(i + "=" + encodeURIComponent(data[i]));
    }

    let result = await fetch(url_vsk_shippingnotebookingmuli_get + '?' + params.join("&"))
        .then((response) => {
            return response.json();
        }).then((data) => {
            return data;
        });

    return result;

};

$.MM_manifestNoteMulit_Create = async function (REF_ID, ROUTE, DRIVER, VEHICLE, JOBDATE, CREATE_BY) {

    let MM_manifestNoteMulitList_Get = await $.MM_manifestNoteMulitList_Get(REF_ID, ROUTE, DRIVER, VEHICLE, JOBDATE, CREATE_BY);

    let manifestNoteList = MM_manifestNoteMulitList_Get.manifestNoteList;

    let citem_shippingnotebookinglist = []

    $.each(manifestNoteList, function (key, val) {

        let dt_arr = JSON.parse(val['ProductList']);

        let ProductList = [];

        $.each(dt_arr.ProductList, function (key, val) {

            ProductList.push({
                "code": val['code'],
                "name": val['name'],
                "orderNo": val['orderNo'],
                "packageNo": val['packageNo'],
                "cod": val['cod'],
                "description": val['description'],
                "qty": val['qty'],
                "unitCode": val['unitCode'],
                "hasCalWeightPerUnit": val['hasCalWeightPerUnitอ'],
                "weightPerUnit": val['weightPerUnit'],
                "volumeType": val['volumeType'],
                "boxSizeWidth": val['boxSizeWidth'],
                "boxSizeLength": val['boxSizeLength'],
                "boxSizeHeight": val['boxSizeHeight'],
                "hasCalVolumePerUnit": val['hasCalVolumePerUnit'],
                "volumePerUnit": val['volumePerUnit']
            });

        })

        citem_shippingnotebookinglist.push({

            shippingNote: {
                "code": val['code'],
                "startDeliveryDate": val['startDeliveryDate'],
                "endDeliveryDate": val['endDeliveryDate'],
                "paymentType": val['paymentType'],
                "merchantCode": val['merchantCode'],
                "deliverProjectCode": val['deliveryProjectCode'],
                "distributionCenterCode": val['distributionCenterCode'],
                "sender": {
                    "name": val['sender_name'],
                    "addressDescription": val['sender_addressDescription'],
                    "address": val['sender_address'],
                },
                "receiver": {
                    "name": val['receiver_code'] + ' ' + val['receiver_name'],
                    "code": null,
                    "addressDescription": val['receiver_addressDescription'],
                    "address": val['receiver_address'],
                    "lat": val['receiver_lat'],
                    "lng": val['receiver_lng'],
                    "contactTel": val['receiver_contactTel'],
                },
                "shipmentPriceType": val['shipmentPriceType'],
                "deliveryPrice": val['deliveryPrice'],
                "productList": ProductList

            },
            "pickUpAddressText": manifestNoteList[0]['pickUpAddressText'],
            "pickUpAddress": manifestNoteList[0]['pickUpAddress'],
            "sendAddressText": manifestNoteList[0]['sendAddressText'],
            "sendAddress": manifestNoteList[0]['sendAddress']

        });

    });

    let citem_manifestNote = {

        "manifestNoteList": [
            {
                "deliveryProjectCode": manifestNoteList[0]['deliveryProjectCode'],
                "merchantCode": manifestNoteList[0]['merchantCode'],
                "endRouteLineCode": manifestNoteList[0]['endRouteLineCode'],
                "companyAcronym": manifestNoteList[0]['companyAcronym'],
                "coopfirmCode": manifestNoteList[0]['coopfirmCode'],
                "driverCode": manifestNoteList[0]['driverCode'],
                "vehicleCode": manifestNoteList[0]['vehicleCode'],
                "addOnVehicleCode": manifestNoteList[0]['addOnVehicleCode'],
                "vehicleTypeCode": manifestNoteList[0]['vehicleTypeCode'],
                "fuelTypeCode": manifestNoteList[0]['fuelTypeCode'],
                "vehicleFuelUseRate": manifestNoteList[0]['vehicleFuelUseRate'],
                "vehiclePercentReFuel": manifestNoteList[0]['vehiclePercentReFuel'],
                "startDistributionCenterCode": manifestNoteList[0]['startDistributionCenterCode'],
                "startConsumerDistributionCenterCode": manifestNoteList[0]['startConsumerDistributionCenterCode'],
                "underDistributionCenterCode": manifestNoteList[0]['underDistributionCenterCode'],
                "startType": manifestNoteList[0]['startType'],
                "documentDate": manifestNoteList[0]['documentDate'],
                "receiveProductDate": manifestNoteList[0]['receiveProductDate'],
                "hasSubApprove": manifestNoteList[0]['hasSubApprove'],
                "useMilkrun": manifestNoteList[0]['useMilkrun'],
                "totalDistance": manifestNoteList[0]['totalDistance'],

                "shippingNoteBookingList": citem_shippingnotebookinglist
            }
        ]
    };

    let result = await fetch(url_manifestnote_shippingnote_create, {
        method: "POST",
        headers: {
            Authorization: api_key,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(citem_manifestNote),
    }).then((response) => {

        $("#global-loader").fadeOut();

        if (response.status != '500') {

            swal({
                title: "สำเร็จ!",
                text: "ทำรายการสำเร็จ",
                type: 'success',
                timer: 500,
                showConfirmButton: false
            });

        } else {

            if (response.status == 400) {

                $('.delete_inv_item').prop("disabled", false);
            }

            swal({
                title: 'เกิดข้อผิดพลาด!',
                text: 'ไม่สามารถส่งข้อมูลขึ้น MOVEMAX กรุณาติดต่อเจ้าหน้าที่',
                type: 'error',
                confirmButtonColor: '#57a94f'
            })

        }

        return response.json();

    }).then((data) => {

        var data_list = [];

        $.each(data[0].shippingNoteRes, function (key, val) {
            data_list.push({
                'mm_manifestNoteId': data[0]['id'],
                'mm_manifestNoteNumber': data[0]['manifestNoteNumber'],
                'mm_shippingNoteResId': val['id'],
                'mm_shippingNoteResCode': val['code'],
                'ref_id': ref_id,
            });
        });

        fetch(url_vsk_manifestnotejob_create, {
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

                $('#btn-add_job').prop('disabled', true)
                $('#btn-report').removeClass('d-none')

            });

            $.LoadingOverlay("hide");

            return data;
        }).catch((data) => {
            return data;
        })

        return data;

    }).catch((data) => {

        $("#global-loader").fadeOut();

        swal({
            title: 'เกิดข้อผิดพลาด!',
            text: 'ไม่สามารถส่งข้อมูลขึ้น MOVEMAX กรุณาติดต่อเจ้าหน้าที่',
            type: 'error',
            confirmButtonColor: '#57a94f'
        })

        return data;

    });

    return result;

};

$.Master_Get = async function () {

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

}

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