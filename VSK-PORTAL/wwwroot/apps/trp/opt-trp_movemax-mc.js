'use strict';

//const url_api = "http://192.168.1.247:8899/trp-api/";
const url_api = "http://localhost:49705";

const url_employee_movemax_get = "https://vsk.movemax.me/public-api/tms/v1/employee";
const url_vehicle_movemax_get = "https://vsk.movemax.me/public-api/tms/v1/vehicle";
const url_routeline_movemax_get = "https://vsk.movemax.me/public-api/tms/v1/routeline";

const url_manifestnote_shippingnote_create = "https://vsk.movemax.me/public-api/tms/v1/manifestnote/shippingnote/create";
const url_manifestnote_close_manifast = "https://vsk.movemax.me/public-api/tms/v1/manifestnote/close-manifest";

const url_vsk_manifestnote_create = url_api + '/v1/MM_ManiFestNote_Create';
const url_vsk_manifestnote_get = url_api + '/v1/MM_ManifestNoteBike_Get';
const url_vsk_manifestnote_br_get = url_api + '/v1/MM_ShippingNoteBR_Get';
const url_vsk_manifestnote_p_get = url_api + '/v1/MM_ShippingNoteP_Get';
const url_vsk_manifestnote_ref_get = url_api + '/v1/MM_ShippingNoteRef_Get';
const url_vsk_manifestnotejob_create = url_api + '/v1/MM_ManifestNoteJobCreate';
const url_vsk_manifestnotejob_list = url_api + '/v1/MM_ManifestNote_List';
const url_vsk_shippingnotebookingmuli_get = url_api + '/v1/MM_ShippingNoteBookingMulit_Get';
const url_vsk_productmulit_get = url_api + '/v1/MM_ProductMulit_Get';
const url_vsk_productmulit_delete = url_api + '/v1/MM_ProductMulit_Delete';

const url_vsk_product_p_mulit_get = url_api + '/v1/MM_ProductPMulit_Get';
const url_vsk_product_br_mulit_get = url_api + '/v1/MM_ProductBRMulit_Get';
const url_vsk_product_ref_mulit_get = url_api + '/v1/MM_ProductRefMulit_Get';

const url_vsk_productbr_get = url_api + '/v1/MM_ProductBR_Get';

const api_key = "cOaI7TF@3am9Gc?89hqC(18)h{{G$dsaVt0$FnxpCf0vO%I2{Fp8?Y7rBcRqNNzv";

const URL_TRP_SALEFILE_BRANCH_GET = url_api + '/v1/TRP_SALEFILE_BRANCH_GET';

let add_data = [];
let citem_job = [];
let pay_type = 'DC01';
let table_list, table_time, table_multi_list;

let driver_raw, number_type = '';

let DriverMessengerList, PlateList, RoutelineList, MM_manifestNoteList, MM_manifestNoteMulit, ProductMulitList = [];
let ref_id = '';

const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const user_id = objProfile[0]['username'];

let customElement = $("<div>", {
    "css": {
        "border": "2px solid",
        "font-size": "14px",
        "text-align": "center",
        "padding": '7px'

    },
    "text": 'Please Wait...'
});

function numberWithCommas(x) {

    return x != null ? parseFloat(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
}

$(document).ready(async function () {

    await $.Init();

    await $.Master_Get();

    await $.List();

});

$.Init = async function () {

    DriverMessengerList = await $.MM_Employee_Get("" /*code*/, "" /*positionName*/, "พนักงานขับรถมอเตอร์ไซค์" /*groupName*/);
    PlateList = await $.MM_Plate_Get("" /*licensePlate*/, "" /*name*/, "" /*province*/, "" /*vehicleBrandName*/, "" /*vehicleModelName*/, "" /*vehicleKind*/);
    RoutelineList = await $.MM_Routeline_Get("" /*code*/, "" /*name*/);

    //console.log('DriverMessengerList', DriverMessengerList.data);
    //console.log('RoutelineList', RoutelineList.data);
    //console.log('PlateList', PlateList.data);

    $('.fc-datepicker').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        },
    });

    $('#btn-modal-close_job').on('click', async function (evt) {

        evt.preventDefault();

        $('#modal-frm_close_job').modal({
            keyboard: false,
            backdrop: 'static'
        });

    });

    $('#btn-modal-multi_job').on('click', async function (evt) {

        evt.preventDefault();

        $('#modal-frm_job_multi').modal({
            keyboard: false,
            backdrop: 'static'
        });

    });

    $('#modal-frm_job_multi').off('shown.bs.modal').on('shown.bs.modal', async function (e) {

        e.preventDefault();

        ref_id = $.uuid();

        $('#mt_driver_id').off('select2:select').on('select2:select', async function (e) {

            e.preventDefault();

            $('#mt_job_plate').val('').trigger('change').prop('disabled', true);

            if (this.value != '') {
                $('#mt_job_plate').prop("disabled", false);
            } else {
                $('#mt_job_plate').prop("disabled", true);
            }

            var data = e.params.data;

            let email = data.email == undefined ? '' : data.email
            let tel = data.tel == undefined ? '' : data.tel.replace('-', '')
            let para = email != '' ? email : tel
            //PlateList = await $.MM_Plate_Get(email != '' ? email : tel /*licensePlate*/, "" /*name*/, "" /*province*/, "" /*vehicleBrandName*/, "" /*vehicleModelName*/, "" /*vehicleKind*/);

            let plate_get = PlateList.data
            //console.log('plate_get', plate_get)
            function isCherries(fruit) {

                return fruit.licensePlate == para;
            }

            let plate_data = plate_get.find(isCherries)

            console.log('plate_data', plate_data)

            let licensePlate = plate_data.licensePlate == undefined ? '' : plate_data.licensePlate
            //let licensePlate = PlateList.data[0]['licensePlate'] == undefined ? '' : PlateList.data[0]['licensePlate']

            if (tel != '') {

                //$('#mt_job_plate').val(licensePlate.replace('-', '')).trigger('change')
                $('#mt_job_plate').val(licensePlate).trigger('change')
                $('#mt_job_inv').prop("disabled", false).focus();

            } else {

                $('#mt_job_plate').val('').trigger('change')
                $('#mt_job_inv').val('').prop("disabled", true)
            }

        });

        $('#mt_job_plate').off('select2:select').on('select2:select', async function (e) {

            e.preventDefault();

            if (this.value != '') {

                $('#mt_job_inv').prop("disabled", false);
                $('#mt_job_inv').focus();

            } else {

                $('#mt_job_inv').prop("disabled", true);

            }

        });

        $('#mt_job_inv').off('keyup').on('keyup', async function (e) {

            var code = (e.keyCode ? e.keyCode : e.which);

            let val_replace = $(this).val()

            $('#mt_job_inv').val(val_replace.toUpperCase().trim().replace(' ', ''))

            if ($(this).val().length > 0) {

                if (code === 13) {

                    $('#btn-mt_job_inv').trigger("click");

                }
            }

        });

        $('#btn-mt_job_inv').off('click').on('click', async function (evt) {

            evt.preventDefault();

            driver_raw = $('#mt_driver_id :selected').text();
            const driver = driver_raw.split(":");
            let driver_code = $.trim(driver[0]);
            let driver_name = $.trim(driver[1]);

            let NUMBER = $('#job_inv').val();
            let ROUTE = "00/0";
            let DRIVER = driver_code;
            let CREATE_BY = user_id;

            if ($('#mt_job_inv').val().length > 0) {

                await $("#global-loader").fadeIn();

                if ($('#mt_job_inv').val().substr(0, 3).toUpperCase() === 'REF') {

                    $.ProductMulitRef_Get($('#mt_job_inv').val());

                } else if ($('#mt_job_inv').val().substr(0, 2).toUpperCase() === 'IV') {

                    $.ProductMulit_Get($('#mt_job_inv').val());

                } else if ($('#mt_job_inv').val().substr(0, 2).toUpperCase() === 'BR') {

                    $.ProductMulitBR_Get($('#mt_job_inv').val());

                } else if ($('#mt_job_inv').val().substr(0, 1).toUpperCase() === 'P') {

                    $.ProductMulitP_Get($('#mt_job_inv').val());

                } else {

                    $("#global-loader").fadeOut();
                    toastr.error('ไม่พบข้อมูล');
                    console.log('ERROR')

                }

            } else {

                $('#number-close_job').prop('disabled', false);

                toastr.error('ไม่พบข้อมูล');

            }

        });

        $('#btn-modal-add_job').off('click').on('click', async function (evt) {

            evt.preventDefault();

            $('#frm_job_multi').parsley().validate();

            if ($('#frm_job_multi').parsley().isValid()) {

                $(this).prop('disabled', true);

                $('#mt_job_plate').prop("disabled", true);
                $('#mt_job_inv').prop("disabled", true);
                $('#btn-mt_job_inv').prop("disabled", true);
                $('#mt_driver_id').prop("disabled", true);

                $('.delete_inv_item').prop("disabled", true);

                let mt_job_date = moment($('#mt_job_date').val(), 'DD/MM/YYYY').format('YYYY-MM-DD')
                let mt_driver_id = $('#mt_driver_id').val()
                let mt_job_plate = $('#mt_job_plate').val()

                $("#global-loader").fadeIn();

                //if (data_iv.length > 0) {

                //    MM_manifestNoteMulit = await $.MM_manifestNoteMulit_Create(ref_id, "00/0", mt_driver_id, "2ขร-6332", mt_job_date, user_id);

                //}

                //if (data_cn.length > 0) {

                //    MM_manifestNoteCN = await $.MM_manifestNoteMulit_Create(ref_id, "00/0", mt_driver_id, "2ขร-6332", mt_job_date, user_id);

                //}

                MM_manifestNoteMulit = await $.MM_manifestNoteMulit_Create(ref_id, "00/0", mt_driver_id, "2ขร-6332", mt_job_date, user_id);

            }

            //console.log('MM_manifestNoteMulit', MM_manifestNoteMulit)

        });

    });

    $('#modal-frm_job_multi').off('hidden.bs.modal').on('hidden.bs.modal', async function () {

        await setTimeout(function () {

            location.reload();

        }, 100);

    });

    $('#modal-frm_close_job').off('shown.bs.modal').on('shown.bs.modal', async function (e) {

        e.preventDefault();

        $('#chk_number').focus()

    });

    $('#card-title-pages').html('บันทึกการนำส่งสินค้าด่วนพิเศษ-ประจำวัน ' + moment(new Date()).format('DD-MM-YYYY'))

    $('#driver_id').focus();

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

    $(".driver_id").autocomplete({
        source: function (request, response) {
            response($.map(DriverMessengerList.data, function (value, key) {
                let text = value.code + ' : ' + value.firstnameTh + ' ' + value.lastnameTh + ' ' + value.email
                return {
                    label: text,
                    value: value.code
                }
            }));
        },
        minLength: 1,
        open: function () { },
        close: function () { },
        focus: function (event, ui) { },
        select: function (event, ui) { }
    });

    $('.driver_id').off('keyup').on('keyup', function (e) {

        var code = (e.keyCode ? e.keyCode : e.which);

        let val_replace = $(this).val()

        $('.driver_id').val(val_replace.trim().replace(' ', ''))

        if ($(this).val().length > 0) {

            if (code === 13) {

                e.preventDefault();

                $("#global-loader").fadeIn();

                if ($('.driver_id').val().length == 10) {

                    $.ajax({
                        async: false,
                        url: 'https://vsk.tms-vcargo.com/api/tms/public/v1/driver/search',
                        type: 'POST',
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        data: JSON.stringify({ 'code': $('#frm_data').find('#driver_id').val() }),
                        success: function (result) {

                            if (result.object.length > 0) {

                                $.each(result.object, function (key, val) {

                                    $('.driver_id').val(val['code'] + ' : ' + val['firstNameTh'] + ' ' + val['lastNameTh'])
                                    $('.driver_id').prop("disabled", true);
                                    $('.job_inv').prop("disabled", false);
                                    //$('.job_inv').focus();

                                    if ($('.modal.show').length > 0) {
                                        $('#md_job_inv').focus();
                                    } else {
                                        $('#job_inv').focus();
                                    }

                                });

                            } else {

                                $('.driver_id').val('')

                                $('.driver_id').prop("disabled", false);
                                $('.job_inv').prop("disabled", true);
                                $('.driver_id').focus();
                                toastr.error('ไม่พบข้อมูลพนักงาน');

                            }

                        }

                    });

                } else if ($('.driver_id').val().length == 5) {

                    let driver_get = DriverMessengerList.data

                    let driver_code = $('#driver_id').val();

                    function isCherries(fruit) {

                        return fruit.code === driver_code;

                    }

                    const emp_data = driver_get.find(isCherries)

                    console.log('emp_data', emp_data);

                    if (emp_data != undefined) {

                        let driver_concat = $.trim(emp_data.code + ' : ' + emp_data.firstnameTh + ' ' + emp_data.lastnameTh);

                        driver_raw = driver_concat;

                        $('#driver_id').val(driver_concat).prop("disabled", true);

                        $('.job_inv').prop("disabled", false);

                        let email = emp_data.email == undefined ? '' : emp_data.email
                        let tel = emp_data.tel == undefined ? '' : emp_data.tel.replace('-', '')
                        let para = email != '' ? email : tel
                        //PlateList = await $.MM_Plate_Get(email != '' ? email : tel /*licensePlate*/, "" /*name*/, "" /*province*/, "" /*vehicleBrandName*/, "" /*vehicleModelName*/, "" /*vehicleKind*/);

                        let plate_get = PlateList.data
                        console.log('plate_get', plate_get)
                        function isCherries(fruit) {

                            return fruit.licensePlate == para;
                        }

                        let plate_data = plate_get.find(isCherries)
                        let licensePlate = plate_data.licensePlate == undefined ? '' : plate_data.licensePlate
                        $('#job_plate').val(licensePlate).trigger('change')

                        if ($('.modal.show').length > 0) {

                            $('#md_job_inv').focus();

                        } else {

                            $('#job_inv').focus();

                        }

                    } else {

                        $('.driver_id').val('').prop("disabled", false).focus();
                        $('.job_inv').prop("disabled", true);
                        toastr.error('ไม่พบข้อมูลพนักงาน00');

                    }

                } else {

                    toastr.error('กรุณากรอกข้อมูลให้ถูกต้อง');

                }

                $("#global-loader").fadeOut();

            }

        }

    });

    $('#job_inv').off('keyup').on('keyup', async function (e) {

        var code = (e.keyCode ? e.keyCode : e.which);

        let val_replace = $(this).val()

        $('#job_inv').val(val_replace.toUpperCase().trim().replace(' ', ''))

        if ($(this).val().length > 0) {

            if (code === 13) {

                $('#btn-job_inv').trigger("click");

            }
        }

    });

    $('#btn-job_inv').off('click').on('click', async function (evt) {

        evt.preventDefault();

        const driver = driver_raw.split(":");
        let driver_code = $.trim(driver[0]);
        let driver_name = $.trim(driver[1]);

        //ref_id = $.uuid();

        let NUMBER = $('#job_inv').val();
        let ROUTE = "00/0";
        let DRIVER = driver_code;
        let CREATE_BY = user_id;

        if ($('#job_inv').val().length > 0) {

            await $("#global-loader").fadeIn();

            if ($('#job_inv').val().substr(0, 3).toUpperCase() === 'REF') {

                number_type = 'REF'

                $.Inv($.uuid(), NUMBER, ROUTE, DRIVER, CREATE_BY);

            } else if ($('#job_inv').val().substr(0, 2).toUpperCase() === 'IV') {

                number_type = 'IV'

                $.Inv('', NUMBER, ROUTE, DRIVER, CREATE_BY);

            } else if ($('#job_inv').val().substr(0, 2).toUpperCase() === 'BR') {

                number_type = 'BR'

                $.Inv($.uuid(), NUMBER, ROUTE, DRIVER, CREATE_BY);

            } else if ($('#job_inv').val().substr(0, 1).toUpperCase() === 'P') {

                number_type = 'P'

                $.Inv($.uuid(), NUMBER, ROUTE, DRIVER, CREATE_BY);

            } else {

                $("#global-loader").fadeOut();
                toastr.error('ไม่พบข้อมูล');
                console.log('ERROR')

            }

        } else {

            $('#number-close_job').prop('disabled', false);

            toastr.error('ไม่พบข้อมูล');

        }

    });

    $('#md_job_inv').off('keyup').on('keyup', async function (e) {

        var code = (e.keyCode ? e.keyCode : e.which);

        let val_replace = $(this).val()

        $('#md_job_inv').val(val_replace.toUpperCase().trim().replace(' ', ''))

        if ($(this).val().length > 0) {

            if (code === 13) {

                $("#global-loader").fadeIn();

                if ($('#md_job_inv').val().substr(0, 3).toUpperCase() === 'REF') {

                    console.log('REF');

                    $.job_ref();

                } else if ($('#md_job_inv').val().substr(0, 2).toUpperCase() === 'IV') {

                    console.log('INV');

                    $.job_create_V1($('#md_job_inv').val())

                } else if ($('#md_job_inv').val().substr(0, 2).toUpperCase() === 'BR') {

                    console.log('BR');

                    $.job_br()

                } else if ($('#md_job_inv').val().substr(0, 1).toUpperCase() === 'P') {

                    console.log('Supplier')

                    $.job_supplier()

                } else {

                    $("#global-loader").fadeOut();
                    toastr.error('ไม่พบข้อมูล');
                    console.log('ERROR')

                }

            }
        }

    });

    $('#number-close_job').off('keyup').on('keyup', async function (e) {

        var code = (e.keyCode ? e.keyCode : e.which);

        let val_replace = $(this).val()

        $('#number-close_job').val(val_replace.toUpperCase().trim().replace(' ', ''))

        if ($(this).val().length > 0) {

            if (code === 13) {

                $("#global-loader").fadeIn();

                $('#btn-submit_close_job').trigger("click");

            }

        } else {

            toastr.error('ไม่พบข้อมูล');
        }

    });

    $('#btn-submit_close_job').off('click').on('click', async function (evt) {

        evt.preventDefault();

        if ($('#number-close_job').val().length > 0) {

            $('#number-close_job').prop('disabled', true);

            $.close_job($('#number-close_job').val());

        } else {

            $('#number-close_job').prop('disabled', false);

            toastr.error('ไม่พบข้อมูล');

        }

    });

    $('.btn-action').off('click').on('click', function (e) {

        e.preventDefault();

        let action = $(this).attr('id')

        if (action == 'btn-search_action') {

            $(".loader-spinner").removeClass("d-none");

            $.List();

        } else if (action == 'btn-search_reset') {

            $(".loader-spinner").removeClass("d-none");

            $("#sh_emmas_code option").remove();
            $("#sh_emmas_code").append("<option value=''>- เลือกลูกค้า -</option>");
            $('#sh_driver_id').val('').trigger('change');

            $.List();

        } else if (action == 'btn-search_action3') {

            $(".loader-spinner").removeClass("d-none");
            $("#global-loader").fadeIn();
            $.Time_List();

        } else if (action == 'btn-search_reset3') {

            $(".loader-spinner").removeClass("d-none");

            $('#sh3_derivery_status').val('').trigger('change');
            $('#sh3_driver_id').val('').trigger('change');

        }

    });

    $('.nav li a').click(function () {

        var data = $(this).attr("href");

        if (data == '#tab_list') {

            $("#global-loader").fadeIn();

            $.List();

        } else if (data == '#tab_dashboard') {

            $("#global-loader").fadeIn();

            $.Dashboard_Driver();
        } else if (data == '#tab_item') {

            $("#global-loader").fadeIn();

            $.Time_List();
        }

    });

};

$.List = async function () {

    let job_start_date = $('#job_date').val() != '' ? moment($('#job_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00:00.000' : moment().format('YYYY-MM-DD') + ' 00:00:00.000';  //ถ้าไม่เลือกจะเป็นค่าว่าง
    let job_end_date = $('#job_date').val() != '' ? moment($('#job_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59:59.000' : moment().format('YYYY-MM-DD') + ' 23:59:59.000';

    let url = new URL(url_vsk_manifestnotejob_list);

    url.search = new URLSearchParams({
        job_start_date: job_start_date,
        job_end_date: job_start_date,
        f_receiver_code: $('#sh_emmas_code').val(),
        f_driverCode: $('#sh_driver_id').val(),
        currentStatus: $('#sh_derivery_status').val(),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        if (result.status === 'Error') {

            $("#global-loader").fadeOut("slow");

        } else {

            let count_total = 0;
            let count_close = 0;
            let count_express = 0;
            let count_supplier = 0;
            let count_cn = 0;
            let count_br = 0;
            var cod_today = 0;
            let i = result.length;

            $.each(result.data, function (key, val) {

                //if (val['route_name'] === 'ส่งสินค้าด่วน') {
                //    count_express++;
                //} else if (val['route_name'] === 'รับสินค้า Supplier') {
                //    count_supplier++;
                //} else if (val['route_name'] === 'จัดส่งสินค้าสาขา') {
                //    count_br++;
                //} else if (val['route_name'] === 'รับคืนสินค้าลูกค้า') {
                //    count_cn++;
                //}

                cod_today += Number(val['p_cod']);

                count_total++;

            });

            $('#count_total').html(i);
            $('#count_close').html(count_close);
            $('#count_express').html(count_express);
            $('#count_supplier').html(count_supplier);
            $('#count_br').html(count_br);
            $('#count_cn').html(count_cn);
            $('#cod_today').html(cod_today.toFixed(2));

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
                            return (meta.row) + 1;
                            //return '<a href="javascript:void(0)"><i class="si si si-plus show-detail tx-primary tx-15"></i></a>';
                        }
                    }, //0

                    {
                        title: "<div class='text-center'>document</div>",
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
                            dt += '<div class="d-flex">'
                            dt += '<a class="mr-1 tx-13"><i class="las la-caret-right tx-dark"></i></a>' + '<span class="tx-13 text-muted mb-0"><u>' + shippingNoteNumber + '</u></span>'
                            dt += '<span class="tx-12 ml-auto">'
                            dt += '<a class="mr-1 tx-14"><i class="las la-calendar-day  tx-primary"></i></a>' + '<span class="mt-0 mb-0 font-weight-semibold tx-12">' + documentDate + '</span>'
                            dt += '</span>'
                            //dt += '<span class="tx-12 ml-auto">'
                            //dt += '<span class="mt-1 w-100 badge badge-primary">' + routeLineName + '</span>'
                            //dt += '</span>'
                            dt += '</div>'

                            dt += '<div class="d-sm-flex justify-content-between align-items-center">'
                            dt += '<div class="d-flex align-items-center" >'
                            dt += '<i class="las la-money-bill text-success tx-14 mr-1"></i>'
                            dt += '<p class="mb-0 tx-13">' + cod + ' ฿</p>'
                            dt += '</div >'
                            dt += '<span class="badge bd bd-primary tx-primary "><u>' + route_concat + '</u></span>'
                            dt += '</div >'


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

$.List_V1 = async function () {

    let job_start_date = $('#job_date').val() != '' ? moment($('#job_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00:00.000' : moment().format('YYYY-MM-DD') + ' 00:00:00.000';  //ถ้าไม่เลือกจะเป็นค่าว่าง
    let job_end_date = $('#job_date').val() != '' ? moment($('#job_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59:59.000' : moment().format('YYYY-MM-DD') + ' 23:59:59.000';

    let url = new URL(url_vsk_manifestnotejob_list);

    url.search = new URLSearchParams({
        job_start_date: job_start_date,
        job_end_date: job_start_date,
        p_code: $('#sh_emmas_code').val(),
        f_driverCode: $('#sh_driver_id').val(),
        currentStatus: $('#sh_derivery_status').val(),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        let count_total = 0;
        let count_close = 0;
        let count_express = 0;
        let count_supplier = 0;
        let count_cn = 0;
        let count_br = 0;
        var cod_today = 0;
        let i = result.length;

        $.each(result.data, function (key, val) {

            //if (val['route_name'] === 'ส่งสินค้าด่วน') {
            //    count_express++;
            //} else if (val['route_name'] === 'รับสินค้า Supplier') {
            //    count_supplier++;
            //} else if (val['route_name'] === 'จัดส่งสินค้าสาขา') {
            //    count_br++;
            //} else if (val['route_name'] === 'รับคืนสินค้าลูกค้า') {
            //    count_cn++;
            //}

            cod_today += Number(val['p_cod']);

            count_total++;

        });

        $('#count_total').html(i);
        $('#count_close').html(count_close);
        $('#count_express').html(count_express);
        $('#count_supplier').html(count_supplier);
        $('#count_br').html(count_br);
        $('#count_cn').html(count_cn);
        $('#cod_today').html(cod_today.toFixed(2));

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
                    filename: 'REPORT_TRP_MO_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                    //exportOptions: {
                    //    columns: [2, 3, 4, 5, 8, 9, 10, 11, 13, 14, 15, 17, 19, 20, 21]
                    //}
                },
            ],
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
                    width: "30%",
                    //visible: false,
                    render: function (data, type, row, meta) {

                        let f_documentDate = moment(row.f_documentDate, 'YYYY/MM/DD').format('DD/MM/YYYY');
                        let r_mm_manifestNoteNumber = row.r_mm_manifestNoteNumber;
                        let f_endRouteLineCode = row.f_endRouteLineCode;
                        let f_code = row.f_code;
                        let p_orderNo = row.p_orderNo;
                        let p_packageNo = row.p_packageNo;
                        let p_cod = row.p_cod;

                        let job_type;
                        let tx_type;
                        if (row.f_endRouteLineCode == "00/0") {
                            tx_type = 'ส่งสินค้าด่วน'
                            job_type = 'primary'
                        } else {
                            tx_type = '-'
                            job_type = 'dark'
                        }

                        let dt = ''
                        dt += '<div class="media mt-0" >'
                        //dt += '<div class="d-flex mr-3">'
                        dt += '<div class="tx-center mr-1">'
                        dt += '<a href="https://motoridersuniverse.com/uploads/blogs/83/0e/960/44011061ba1959c830e.jpg" target="_blank">'
                        dt += '<img class="media-object avatar avatar-md brround w-7 h-7" alt="64x64" src="https://motoridersuniverse.com/uploads/blogs/83/0e/960/44011061ba1959c830e.jpg">'
                        dt += '</a>'
                        dt += '<span class="mt-1 tx-dark badge badge-success-transparent bd bd-success">' + p_cod + ' ฿</span>'
                        dt += '</div>'
                        dt += '<div class="media-body">'
                        dt += '<div class="d-flex">'
                        dt += '<a class="mr-1 tx-14"><i class="las la-book text-warning"></i></a>' + '<span class="tx-14 mt-0 mb-0 font-weight-semibold">' + r_mm_manifestNoteNumber + '</span>'
                        dt += '<span class="tx-12 ml-auto">'
                        dt += '<a class="mr-1 tx-14"><i class="las la-calendar-day  tx-primary"></i></a>' + '<span class="mt-0 mb-0 font-weight-semibold tx-12">' + f_documentDate + '</span>'
                        dt += '</span>'
                        dt += '</div>'
                        dt += '<div class="d-flex">'
                        dt += '<a class="mr-1 tx-13"><i class="las la-caret-right tx-dark"></i></a>' + '<span class="tx-13 text-muted mb-0"><u>' + f_code + '</u></span>'
                        dt += '<span class="tx-12 ml-auto">'
                        dt += '<span class="mt-1 w-100 badge badge-' + job_type + '">' + tx_type + '</span>'
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
                    width: "15%",
                    //visible: false,
                    render: function (data, type, row, meta) {

                        let f_created_by = row.f_created_by
                        let f_created_date = moment(row.f_created_date).format("DD/MM/YYYY HH:mm:ss")

                        return '<div class="row justify-content-center">' +
                            '<div class="col-12">' +
                            '<span class="tx-12 w-100 badge badge-primary">' + 'เปิดเอกสาร' + '</span>' +
                            '<span class="tx-12 w-100 badge badge-warning">' + f_created_by + '</span>' +
                            '<span class="tx-9 w-100 badge bd bd-1 bd-warning">' + f_created_date + '</span>' +
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

            }
        });

    });

}

$.Time_List = async function () {

    let url = new URL(URL_TMS_JOB_MO_DRIVER_TIME_LIST);

    url.search = new URLSearchParams({
        job_date: moment().format('YYYY-MM-DD'), //moment($('#show_date').val(), 'DD-MM-YYYY').format('YYYY-MM-DD')        
        driver_id: $('#sh3_driver_id').val(),
        derivery_status: $('#sh3_derivery_status').val(),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        //$('#tbl-job-detail').find('tbody .tr_job_list').remove();

        $.each(result.data, function (key, val) {

            $('#last_update').html('Last Updatetime : ' + moment(val.last_update).format("DD/MM/YYYY HH:mm:ss a"));

        });

        table_time = $('#table-time').DataTable({
            data: result.data,
            dom: '<f<t>lip>',
            language: {
                search: "_INPUT_",
                searchPlaceholder: "ค้นหา..."
            },
            deferRender: true,
            ordering: true,
            pageLength: -1,
            bDestroy: true,
            autoWidth: false,
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
                    title: "driver_id",
                    data: "driver_id",
                    class: "tx-center align-middle",
                    visible: false,
                }, //0
                {
                    title: "driver_fullname",
                    data: "driver_fullname",
                    class: "tx-center align-middle",
                    visible: false,
                }, //0

                {
                    title: "driver_time_start",
                    data: "driver_time_start",
                    class: "tx-center align-middle",
                    visible: false,
                }, //4    
                {
                    title: "Driver",
                    class: "align-middle",
                    width: "25%",
                    render: function (data, type, row, meta) {

                        let driver_id = row.driver_id;
                        let driver_fullname = row.driver_fullname;
                        let job_no = row.job_no;
                        let cod_price = row.cod_price;
                        let h_darivery_success = row.h_darivery_success;
                        let h_darivery_pending = row.h_darivery_pending;
                        let h_darivery_failed = row.h_darivery_failed;
                        let driver_time_start = row.driver_time_start;
                        let color_status_driver, text_status_driver, img_status_driver, link
                        if (h_darivery_pending > 0) {
                            text_status_driver = 'delivery'
                            color_status_driver = 'danger'
                            img_status_driver = 'https://cdn-icons-png.flaticon.com/512/2830/2830305.png'
                            link = 'show-detail'
                        } else {
                            text_status_driver = 'ready'
                            color_status_driver = 'success'
                            img_status_driver = 'https://cdn-icons-png.flaticon.com/512/2982/2982693.png'
                            link = ''
                        }

                        let show_display = ''

                        show_display += '<div class="media mt-0">';
                        show_display += '<a class="' + link + '" href="javascript:void(0);"><img class="avatar-lg mr-3 my-auto" src="' + img_status_driver + '" alt="Image description"></a>';
                        show_display += '<div class="media-body">';
                        show_display += '<div class="d-flex align-items-center">';
                        show_display += '<div class="mt-1">';
                        show_display += '<h5 class="mb-1 tx-15">' + driver_fullname + '</h5>';
                        show_display += '<p class="b-0 tx-13 text-muted mb-0">User ID: ' + driver_id + '<span class="text-' + color_status_driver + ' ml-2">' + text_status_driver.toUpperCase() + '</span></p>';
                        show_display += '<p class="b-0 tx-13 mb-0">COD: <span class="text-primary ml-2">' + cod_price + '.-</span></p>';
                        show_display += '</div>';
                        show_display += '</div>';
                        show_display += '</div>';
                        show_display += '</div>';

                        return show_display;
                    }
                }, //4
                {
                    title: "JOB",
                    data: "job_no",
                    width: "3%",
                    class: "tx-right align-middle",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-18  tx-bold">' + data + '<span/>';
                    }
                }, //0
                {
                    title: "COD",
                    data: "cod_price",
                    width: "3%",
                    class: "tx-right align-middle",
                    visible: false,
                }, //0
                {
                    title: "SUCCESS",
                    data: "h_darivery_success",
                    width: "3%",
                    class: "tx-right align-middle",
                    // visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-18">' + data + '<span/>';
                    }
                }, //0
                {
                    title: "FAILED",
                    data: "h_darivery_failed",
                    width: "3%",
                    class: "tx-right align-middle",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-18">' + data + '<span/>';
                    }
                }, //0
                {
                    title: "PENDING",
                    data: "h_darivery_pending",
                    width: "3%",
                    class: "tx-right align-middle",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-18">' + data + '<span/>';
                    }
                }, //0
                {
                    title: "JOB START",
                    data: "driver_time_start",
                    //width: "3%",
                    class: "tx-right align-middle",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-15">' + moment(data).format("HH:mm:ss") + '<span/>';
                    }
                }, //0
                {
                    title: "TIME",
                    class: "tx-right align-middle",
                    render: function (data, type, row, meta) {

                        let start = moment(row.driver_time_start)
                        let end = moment()

                        if (moment(row.driver_time_start).format('YYYY') != '1900') {

                            var duration = moment.duration(end.diff(start, 'seconds'));
                            return '<span class="tx-15 tx-bold timer-countup-' + row.driver_id + '">' + moment.utc(duration * 1000).format("HH:mm:ss"); + '<span/>';

                        } else {

                            return '<span class="tx-15">-<span/>';

                        }

                    }
                }, //0
            ],
            rowCallback: function (row, data) {

                let start = moment(data.driver_time_start)
                let end = moment()
                var duration = moment.duration(end.diff(start, 'seconds'));
                let time = moment.utc(duration * 1000).format("HH:mm:ss")
                let secs = moment(time, 'HH:mm:ss').diff(moment().startOf('day'), 'seconds');
                let i = secs;

                if (moment(data.driver_time_start).format('YYYY') != '1900') {

                    setInterval(function () {

                        const formatted = moment.utc(i * 1000).format('HH:mm:ss');

                        $('.timer-countup-' + data.driver_id).html(formatted)

                        i++;

                    }, (1000));

                }

                if (data.h_darivery_pending > 0) {
                    $('td:eq(1)', row).parent().addClass('bg-danger-transparent');
                } else {
                    $('td:eq(1)', row).parent().addClass('bg-success-transparent');
                }


            },
            initComplete: function (settings, json) {

                $(".loader-spinner").addClass("d-none");

                $("#global-loader").fadeOut();

                $('#table-time tbody').off('click', '.show-detail').on('click', '.show-detail', async function (e) {

                    e.preventDefault()

                    var data = table_time.row($(this).parents('tr')).data();
                    var tr = $(this).closest('tr');
                    var row = table_time.row(tr);
                    //console.log(data)
                    //$.Frm_Memo(data.job_no);

                    if (row.child.isShown()) {

                        row.child.hide();
                        tr.removeClass('shown');

                    }
                    else {

                        $.Item_Detail(row.child, data);
                        $("#global-loader").fadeIn();
                        tr.addClass('shown');
                    }

                });

            }
        });

    });

}

$.Item_Detail = function format(callback, citem) {

    let url = new URL(URL_TMS_JOB_MO_DRIVER_TIME_DETAIL);

    url.search = new URLSearchParams({

        job_date: moment().format('YYYY-MM-DD'), //moment($('#show_date').val(), 'DD-MM-YYYY').format('YYYY-MM-DD')        
        driver_id: citem.driver_id,
        ref_id: '',

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
                "<th class='border-bottom-0 tx-center'>เลขที่อ้างอิง</th>" +
                "<th class='border-bottom-0 tx-center'>ลูกค้า ที่อยู่</th>" +
                "<th class='border-bottom-0 tx-right'>ยอดเงิน</th>" +
                "<th class='border-bottom-0 tx-center'>สถานะ</th>" +
                "</tr>";

            var tbody = '';

            let i = result.length

            $.each(data, function (key, val) {

                let job_type;
                let job_date = val.job_date == null ? '' : val.job_date
                let job_no = val.job_no == null ? '' : val.job_no
                let job_invoice_no = val.job_invoice_no == null ? '' : val.job_invoice_no
                let job_invoice_date = val.job_invoice_date == null ? '' : val.job_invoice_date
                let job_pk_no = val.job_pk_no == null ? '' : val.job_pk_no
                let job_qty = val.job_qty == null ? '' : val.job_qty
                let cod_price = val.cod_price == null ? '' : val.cod_price
                let invcode = val.invcode == null ? '' : val.invcode
                let job_delivery_name = val.job_delivery_name == null ? '' : val.job_delivery_name
                let job_delivery_addr = val.job_delivery_addr == null ? '' : val.job_delivery_addr
                let route_name = val.route_name == null ? '' : val.route_name
                let driver_id = val.driver_id == null ? '' : val.driver_id
                let driver_fullname = val.driver_fullname == null ? '' : val.driver_fullname
                let plate_name = val.plate_name == null ? '' : val.plate_name
                let ref_id = val.ref_id == null ? '' : val.ref_id
                let delivery_type = val.delivery_type == null ? '' : val.delivery_type
                let batch_no = val.batch_no == null ? '' : val.batch_no
                let inv_description = val.inv_description == null ? '' : val.inv_description
                //let job_emmas_addres = val.job_emmas_addres == null ? '' : val.job_emmas_addres

                let job_emmas_addres = ''
                let d_job_emmas_addres = (val.job_emmas_addres == null) ? '' : val.job_emmas_addres
                if (val.job_emmas_addres == val.job_delivery_addr) {
                    job_emmas_addres == ''
                } else {
                    job_emmas_addres = d_job_emmas_addres
                }

                if (val.route_name === 'ส่งสินค้าด่วน') {
                    job_type = 'primary'
                } else if (val.route_name === 'รับสินค้า Supplier') {
                    job_type = 'info'
                } else if (val.route_name === 'จัดส่งสินค้าสาขา') {
                    job_type = 'warning'
                } else if (val.route_name === 'รับคืนสินค้าลูกค้า') {
                    job_type = 'dark'
                }

                let tx, cl = ''

                let status = val.status == null ? '-' : val.status

                if (val.statusId == '1' || val.statusId == '2') {
                    cl = 'dark'
                } else if (val.statusId == '3' || val.statusId == '4') {
                    cl = 'success'
                } else if (val.statusId == '5') {
                    cl = 'danger'
                } else {
                    cl = 'secondary'
                }

                let col_1 = '<span class="tx-12 tx-bold mr-1 mb-1">เอกสาร : </span> <span style="font-size:13px;" class="text-primary tx-bold">' + job_no + '</span>' +
                    '<br>' +
                    '<hr class="mb-1 mt-1">' +
                    '<span class="tx-12 tx-bold mr-2">สั่งซื้อ : </span> <span class="tx-12 tx-bold">' + job_invoice_no + '</span>' +
                    '<br>' +
                    '<span class="tx-12 tx-bold mr-2">สั่งจัด : </span> <span class="tx-12 tx-secondary tx-bold">' + job_pk_no + '</span>' +
                    '<br>' +
                    '<div class="tx-center">' +
                    '<span class="mt-1 w-100 badge badge-primary">' + route_name + '</span>' +
                    '<\div>';

                let col_2 = '<span class="tx-12 tx-bold mr-1 mb-1">รหัส : </span> <span class="tx-12 tx-left tx-bold mb-1 mr-1">' + invcode + '</span>' +
                    '<br>' +
                    '<span class="tx-12 tx-bold mr-1 mb-1">ชื่อ : </span><span class="tx-12 tx-left">' + job_delivery_name + '</span>' +
                    '<br>' +
                    '<span class="tx-12 tx-bold mr-1 mb-1">ที่อยู่ : </span><span class="tx-12 tx-left">' + d_job_emmas_addres + '</span>' +
                    '<hr class="mb-1 mt-1">' +
                    '<span class="tx-12 tx-bold">จัดส่ง : </span>' + '<span class="tx-12 tx-left">' + job_delivery_addr + '</span>';


                let col_3 = '<div class="row justify-content-center">' +
                    '<div class="col-12">' +
                    '<span class="tx-12 w-100 badge badge-primary">' + 'เปิดเอกสาร' + '</span>' +
                    '<span class="tx-12 w-50 badge badge-warning">' + val.created_by + '</span>' +
                    '<span class="tx-9 w-50 badge badge-warning">' + moment(val.created_datetime).format("DD/MM/YYYY HH:mm:ss") + '</span>' +
                    '<hr class="mb-1 mt-1">' +
                    '<span class="tx-12 w-100 badge badge-' + cl + '">' + status + '</span>' +
                    '<span class="tx-9 w-100 badge bd bd-1 bd-' + cl + '">' + moment(val.currentStatusDate).format("DD/MM/YYYY HH:mm:ss") + '</span>' +
                    '</div >' +
                    '</div >';

                tbody += "<tr>" +
                    "<td>" + '<span class="tx-primary">' + i + '</span>' + "</td>" +
                    "<td>" + col_1 + "</td>" +
                    "<td>" + col_2 + "</td>" +
                    "<td class='tx-right'>" + '<span class="tx-primary tx-right">' + numberWithCommas(cod_price) + '</span>' + "</td>" +
                    "<td>" + col_3 + "</td>" +
                    "</tr>";

                i--

            });

            callback($('<table id="table-item_detail" class="table text-md-nowrap mb-0">' + thead + tbody + '</table>')).show();

            $("#global-loader").fadeOut();

        }
    });

};

$.Inv = async function (REF_ID, NUMBER, ROUTE, DRIVER, CREATE_BY) {

    MM_manifestNoteList = await $.MM_manifestNote_Create(REF_ID, NUMBER, ROUTE, DRIVER, CREATE_BY);

    //console.log('MM_manifestNoteList', MM_manifestNoteList)

    if (MM_manifestNoteList != undefined) {

        $('#job_inv').val('').prop('disabled', true)

        $('#driver_id').val('').prop('disabled', false)

        $('#job_plate').val('').trigger('change');

        setTimeout(function () {

            $('#driver_id').focus();

        }, 100);

    } else {

        $("#global-loader").fadeOut();
        //toastr.error('ไม่พบข้อมูล');
        console.log('ERROR')

    }

}

$.Br = async function (NUMBER, ROUTE, DRIVER, CREATE_BY) {

    MM_manifestNoteList = await $.MM_manifestNoteBR_Create(NUMBER, ROUTE, DRIVER, CREATE_BY);

    //console.log('MM_manifestNoteList', MM_manifestNoteList)

    if (MM_manifestNoteList != undefined) {

        $('#job_inv').val('').prop('disabled', true)

        $('#driver_id').val('').prop('disabled', false)

        $('#job_plate').val('').trigger('change');

        setTimeout(function () {

            $('#driver_id').focus();

        }, 100);

    } else {

        $("#global-loader").fadeOut();
        toastr.error('ไม่พบข้อมูล');
        console.log('ERROR')

    }

}


$.Master_Get = async function () {

    $('#sh_emmas_code').select2({
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

    if (DriverMessengerList.data.length != undefined) {

        let Master_dataSet = [];

        $.each(DriverMessengerList.data, function (key, val) {

            Master_dataSet.push({ id: val['code'], text: (val['code'] + ' : ' + val['firstnameTh'] + ' ' + val['lastnameTh']), tel: val['tel'], email: val['email'] });

        });

        $('#mt_driver_id').select2({
            width: '100%',
            height: '40px',
            dropdownParent: $('#modal-frm_job_multi'),
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

        $('#sh_driver_id').select2({
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

        $('#sh3_driver_id').select2({
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

        $('#mt_job_plate').select2({
            width: '100%',
            height: '40px',
            dropdownParent: $('#modal-frm_job_multi'),
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

$.MM_manifestNoteList_Get = async function (REF_ID, NUMBER, ROUTE, DRIVER, CREATE_BY) {

    let data = {

        REF_ID: REF_ID,
        NUMBER: NUMBER,
        ROUTE: ROUTE,
        DRIVER: DRIVER,
        CREATE_BY: CREATE_BY

    };

    let url = ''

    if (number_type == 'IV') {

        url = url_vsk_manifestnote_get

    } else if (number_type == 'BR') {

        url = url_vsk_manifestnote_br_get

    } else if (number_type == 'P') {

        url = url_vsk_manifestnote_p_get

    } else if (number_type == 'REF') {

        url = url_vsk_manifestnote_ref_get

    }

    var params = [];
    for (const i in data) {
        params.push(i + "=" + encodeURIComponent(data[i]));
    }

    let result = await fetch(url + '?' + params.join("&"))
        .then((response) => {
            return response.json();
        }).then((data) => {
            return data;
        });

    return result;

};

$.MM_manifestNote_Create = async function (REF_ID, NUMBER, ROUTE, DRIVER, CREATE_BY) {

    let MM_manifestNoteList_Get = await $.MM_manifestNoteList_Get(REF_ID, NUMBER, ROUTE, DRIVER, CREATE_BY);
    let manifestNoteList = MM_manifestNoteList_Get.manifestNoteList;
    let ProductList = MM_manifestNoteList_Get.ProductList;

    console.log('MM_manifestNoteList_Get', MM_manifestNoteList_Get)
    console.log('manifestNoteList', manifestNoteList)

    if (manifestNoteList[0]['pMessage'] == 'NOT_FOUND') {

        //$("#global-loader").fadeOut();
        toastr.error('ไม่พบข้อมูล');

        $('#job_inv').val('').prop('disabled', false);
        $('#job_inv').focus();

    } else {

        let citem = {
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
                    "shippingNoteBookingList": [
                        {
                            "shippingNote": {
                                "code": manifestNoteList[0]['code'],
                                "startDeliveryDate": manifestNoteList[0]['startDeliveryDate'],
                                "endDeliveryDate": manifestNoteList[0]['endDeliveryDate'],
                                "paymentType": manifestNoteList[0]['paymentType'],
                                "merchantCode": manifestNoteList[0]['merchantCode'],
                                "deliverProjectCode": manifestNoteList[0]['deliveryProjectCode'],
                                "distributionCenterCode": manifestNoteList[0]['distributionCenterCode'],
                                "sender": {
                                    "name": manifestNoteList[0]['sender_name'],
                                    "addressDescription": manifestNoteList[0]['sender_addressDescription'],
                                    "address": manifestNoteList[0]['sender_address'],
                                },
                                "receiver": {
                                    "name": manifestNoteList[0]['receiver_code'] + ' ' + manifestNoteList[0]['receiver_name'],
                                    "code": null,
                                    "addressDescription": manifestNoteList[0]['receiver_addressDescription'],
                                    "address": manifestNoteList[0]['receiver_address'],
                                    "lat": manifestNoteList[0]['receiver_lat'],
                                    "lng": manifestNoteList[0]['receiver_lng'],
                                    "contactTel": manifestNoteList[0]['receiver_contactTel'],
                                },
                                "shipmentPriceType": manifestNoteList[0]['shipmentPriceType'],
                                "deliveryPrice": manifestNoteList[0]['deliveryPrice'],
                                "productList": ProductList,
                            },
                            "pickUpAddressText": manifestNoteList[0]['pickUpAddressText'],
                            "pickUpAddress": manifestNoteList[0]['pickUpAddress'],
                            "sendAddressText": manifestNoteList[0]['sendAddressText'],
                            "sendAddress": manifestNoteList[0]['sendAddress']
                        }
                    ]
                }
            ]
        };

        let result = await fetch(url_manifestnote_shippingnote_create, {
            method: "POST",
            headers: {
                Authorization: api_key,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(citem),
        }).then((response) => {

            //console.log('response', response.status);

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

            var data_list = [];

            $.each(data[0].shippingNoteRes, function (key, val) {
                data_list.push({
                    'mm_manifestNoteId': data[0]['id'],
                    'mm_manifestNoteNumber': data[0]['manifestNoteNumber'],
                    'mm_shippingNoteResId': val['id'],
                    'mm_shippingNoteResCode': val['code'],
                    'ref_id': '',
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
                $.List();
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

    }

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

            $('#mt_job_inv').val('').prop('disabled', false);
            $('#mt_job_inv').focus();

        } else {

            if (result.length == 0) {

                toastr.error('เกิดข้อผิดพลาด! การแสดงข้อมูลบิลล้มเหลว');

                $('#mt_job_inv').val('').prop('disabled', false);
                $('#mt_job_inv').focus();

                $("#global-loader").fadeOut("slow");

            } else {

                $("#global-loader").fadeOut("slow");

                $('#mt_job_inv').val('').prop('disabled', false).focus();

                if (result.length > 0) { $('#btn-modal-add_job ').prop('disabled', false); }

                $.ProductMulit_List(result);

            }

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

$.ProductMulit_List = async function (result) {

    table_multi_list = $('#table-multi_list').DataTable({
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
                width: "20%",
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
                width: "55%",
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

                    let dt = ''

                    dt += '<span class="tx-12 tx-bold mr-1 mb-1">รหัส : </span> <span class="tx-12 tx-left tx-bold mb-1 mr-1">' + invcode + '</span>'
                    dt += '<br>'
                    dt += '<span class="tx-12 tx-bold mr-1 mb-1">ชื่อ : </span><span class="tx-12 tx-left">' + invname + '</span>'
                    dt += '<br>'
                    dt += '<span class="tx-12 tx-bold mr-1 mb-1">ที่อยู่ : </span><span class="tx-12 tx-left">' + eaddress + ' ' + elocation + '</span>'
                    dt += '<br>'
                    dt += '<span class="tx-12 tx-bold mr-1 mb-1">อู่ : </span><span class="tx-12 tx-left">' + evname + ' ' + evadd + '</span>'
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
                        '<span class="btn btn-sm btn-danger btn-rounded w-100 btn-action delete_inv_item">' + 'DELETE' + '</span>' +
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

            $('#table-multi_list tbody').off('click', '.delete_inv_item').on('click', '.delete_inv_item', async function (e) {

                e.preventDefault()

                var data = table_multi_list.row($(this).parents('tr')).data();

                $.ProductMulit_Delete(data);

            });

        }

    });

};


$.ProductBR_Get = async function (NUMBER) {

    let url = new URL(url_vsk_productbr_get);

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

            $('#mt_job_inv').val('').prop('disabled', false);
            $('#mt_job_inv').focus();

        } else {

            if (result.length == 0) {

                toastr.error('เกิดข้อผิดพลาด! การแสดงข้อมูลบิลล้มเหลว');

                $('#mt_job_inv').val('').prop('disabled', false);
                $('#mt_job_inv').focus();

                $("#global-loader").fadeOut("slow");

            } else {

                $("#global-loader").fadeOut("slow");

                $('#mt_job_inv').val('').prop('disabled', false).focus();

                if (result.length > 0) { $('#btn-modal-add_job ').prop('disabled', false); }

                $.ProductMulit_List(result);

            }

        }

    });

};

$.ProductBR_List = async function (result) {

    table_multi_list = $('#table-multi_list').DataTable({
        data: result.data,
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
                width: "20%",
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
                width: "55%",
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

                    let dt = ''

                    dt += '<span class="tx-12 tx-bold mr-1 mb-1">รหัส : </span> <span class="tx-12 tx-left tx-bold mb-1 mr-1">' + invcode + '</span>'
                    dt += '<br>'
                    dt += '<span class="tx-12 tx-bold mr-1 mb-1">ชื่อ : </span><span class="tx-12 tx-left">' + invname + '</span>'
                    dt += '<br>'
                    dt += '<span class="tx-12 tx-bold mr-1 mb-1">ที่อยู่ : </span><span class="tx-12 tx-left">' + eaddress + ' ' + elocation + '</span>'
                    dt += '<br>'
                    dt += '<span class="tx-12 tx-bold mr-1 mb-1">อู่ : </span><span class="tx-12 tx-left">' + evname + ' ' + evadd + '</span>'
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
                        '<span class="btn btn-sm btn-danger btn-rounded w-100 btn-action delete_inv_item">' + 'DELETE' + '</span>' +
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

            $('#table-multi_list tbody').off('click', '.delete_inv_item').on('click', '.delete_inv_item', async function (e) {

                e.preventDefault()

                var data = table_multi_list.row($(this).parents('tr')).data();

                $.ProductMulit_Delete(data);

            });

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

            $('#mt_job_inv').val('').prop('disabled', false);
            $('#mt_job_inv').focus();

        } else {

            if (result.length == 0) {

                toastr.error('เกิดข้อผิดพลาด! การแสดงข้อมูลบิลล้มเหลว');

                $('#mt_job_inv').val('').prop('disabled', false);
                $('#mt_job_inv').focus();

                $("#global-loader").fadeOut("slow");

            } else {

                $("#global-loader").fadeOut("slow");

                $('#mt_job_inv').val('').prop('disabled', false).focus();

                if (result.length > 0) { $('#btn-modal-add_job ').prop('disabled', false); }

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

            $('#mt_job_inv').val('').prop('disabled', false);
            $('#mt_job_inv').focus();

        } else {

            if (result.length == 0) {

                toastr.error('เกิดข้อผิดพลาด! การแสดงข้อมูลบิลล้มเหลว');

                $('#mt_job_inv').val('').prop('disabled', false);
                $('#mt_job_inv').focus();

                $("#global-loader").fadeOut("slow");

            } else {

                $("#global-loader").fadeOut("slow");

                $('#mt_job_inv').val('').prop('disabled', false).focus();

                if (result.length > 0) { $('#btn-modal-add_job ').prop('disabled', false); }

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

            $('#mt_job_inv').val('').prop('disabled', false);
            $('#mt_job_inv').focus();

        } else {

            if (result.length == 0) {

                toastr.error('เกิดข้อผิดพลาด! การแสดงข้อมูลบิลล้มเหลว');

                $('#mt_job_inv').val('').prop('disabled', false);
                $('#mt_job_inv').focus();

                $("#global-loader").fadeOut("slow");

            } else {

                $("#global-loader").fadeOut("slow");

                $('#mt_job_inv').val('').prop('disabled', false).focus();

                if (result.length > 0) { $('#btn-modal-add_job ').prop('disabled', false); }

                $.ProductMulit_List(result);

            }

        }

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

            //fetch(url_vsk_manifestnote_create, {
            //    method: "POST",
            //    headers: {
            //        'Content-Type': 'application/json'
            //    },
            //    body: JSON.stringify({
            //        'ref_id': ref_id,
            //    }),
            //}).then((response) => {
            //    return response.json();
            //}).then((data) => {
            //    $.List();

            //    return data;
            //}).catch((data) => {
            //    return data;
            //})

            $.List();
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