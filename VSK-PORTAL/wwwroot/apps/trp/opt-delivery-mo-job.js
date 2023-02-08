'use strict';

//const url_api = "http://192.168.1.247:8899/trp-api/";
const url_api = "http://localhost:49705";
const url_report = "http://192.168.1.247/tms-rpt/ViewReport?";

const url_cn = "http://192.168.1.247/intranet/pur-api/v1/Cn_Pre_Job_Get?record_status=1&mode=search&cn_pre_job_datetime_start=2020-01-29"

const url_supplier = "http://192.168.1.247/vsk-api-acc/api/ACC/VSK_Apmas_GET?";
const url_br = 'http://192.168.1.247/intranet/br-api/api/Br_Brtra_Get_v1?';

const url_Packing_Invoice = 'http://192.168.1.247:8899/trp-api' + '/v1/Trp_Packing_Invoice';
const url_Packing_Check_Address = 'http://192.168.1.247:8899/trp-api' + '/v1/Trp_Packing_Check_Address';

const URL_TRP_SALEFILE_BRANCH_GET = url_api + '/v1/TRP_SALEFILE_BRANCH_GET';
const URL_TMS_JOB_MO_CHECK = url_api + '/v1/TMS_JOB_MO_CHECK';
const URL_TMS_JOB_MO_ADD = url_api + '/v1/TMS_JOB_MO_ADD';
const URL_TMS_JOB_MO_UPDATE = url_api + '/v1/TMS_JOB_MO_UPDATE';
const URL_TMS_JOB_MO_LIST = url_api + '/v1/TMS_JOB_MO_LIST';
const URL_TMS_JOB_MO_DRIVER_DASHBOARD = url_api + '/v1/TMS_JOB_MO_DRIVER_DASHBOARD';
const URL_TMS_JOB_MO_DRIVER_TIME_LIST = url_api + '/v1/TMS_JOB_MO_DRIVER_TIME_LIST';
const URL_TMS_JOB_MO_DRIVER_TIME_DETAIL = url_api + '/v1/TMS_JOB_MO_DRIVER_TIME_DETAIL';

const url_trp_tms_job_express_list = url_api + '/v1/trp_tms_job_express_list';

let cn_salefile_number, cn_pre_job_jobno, cn_route_no, cn_route_name;

let add_data = [];
let citem_job = [];
let ref_id
let pay_type = 'DC01';
let table_list;
let table_time;
let driver_raw;
let objDriver = JSON.parse(localStorage.getItem('objTRPDriver'));
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

$.init = function () {

    $('.fc-datepicker').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        },
    });

    $('#btn-modal-add_job').on('click', async function (evt) {

        evt.preventDefault();

        $('#modal-frm_add_job').modal({
            keyboard: false,
            backdrop: 'static'
        });

        //$('#md_driver_id').focus();

        if ($('#md_driver_id').val() != '') {
            $('#md_job_inv').focus();
        } else {
            $('#md_driver_id').focus();
        }

    });

    $('#btn-modal-close_job').on('click', async function (evt) {

        evt.preventDefault();

        $('#modal-frm_close_job').modal({
            keyboard: false,
            backdrop: 'static'
        });

    });

    $('#modal-frm_close_job').off('shown.bs.modal').on('shown.bs.modal', async function (e) {

        e.preventDefault();

        $('#chk_number').focus()

    });

    $('#card-title-pages').html('บันทึกการนำส่งสินค้าด่วนพิเศษ-ประจำวัน ' + moment(new Date()).format('DD-MM-YYYY'))

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

    $(".driver_id").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                url: 'https://vsk.tms-vcargo.com/api/tms/public/v1/driver/search',
                data: JSON.stringify({
                    code: typeof request.term !== 'undefined' ? request.term : ' '
                }),
                success: function (result) {
                    $('#driver_id').removeClass('ui-autocomplete-loading');
                    response($.map(result.object, function (item) {
                        return {
                            label: item.code + ' : ' + item.firstNameTh + ' ' + item.lastNameTh,
                            value: item.code
                        }
                    }));
                },
                error: function (data) {
                    $('#driver_id').removeClass('ui-autocomplete-loading');
                }
            });
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

        if ($('#job_inv').val().length > 0) {

            //$('#number-close_job').prop('disabled', true);

            await $("#global-loader").fadeIn();

            //let driver_raw = $('#frm_data').find('#driver_id').val();
            //const driver = driver_raw.split(":");

            driver_raw = $('#frm_data').find('#driver_id').val();

            const driver = driver_raw.split(":");

            if ($('#job_inv').val().substr(0, 3).toUpperCase() === 'REF') {

                console.log('REF');

                $.job_ref();

            } else if ($('#job_inv').val().substr(0, 2).toUpperCase() === 'IV') {

                console.log('INV');

                $.job_inv($('#job_inv').val())

            } else if ($('#job_inv').val().substr(0, 2).toUpperCase() === 'BR') {

                console.log('BR');

                $.job_br()


            } else if ($('#job_inv').val().substr(0, 1).toUpperCase() === 'P') {

                console.log('Supplier')

                $.job_supplier()

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

                driver_raw = $('.driver_id').val();

                const driver = driver_raw.split(":");

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

            $.list();

        } else if (action == 'btn-search_reset') {

            $(".loader-spinner").removeClass("d-none");

            $("#sh_emmas_code option").remove();
            $("#sh_emmas_code").append("<option value=''>- เลือกลูกค้า -</option>");
            $('#sh_driver_id').val('').trigger('change');

            $.list();

        } else if (action == 'btn-search_action3') {

            $(".loader-spinner").removeClass("d-none");
            $("#global-loader").fadeIn();
            $.time_list();

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

            $.list();

        } else if (data == '#tab_dashboard') {

            $("#global-loader").fadeIn();

            $.dashboard_driver();
        } else if (data == '#tab_item') {

            $("#global-loader").fadeIn();

            $.time_list();
        }

    });

    $.Driver_Get()
};

$.list = async function () {

    let url = new URL(URL_TMS_JOB_MO_LIST);

    url.search = new URLSearchParams({
        job_date: moment().format('YYYY-MM-DD'), //moment($('#show_date').val(), 'DD-MM-YYYY').format('YYYY-MM-DD')        
        invcode: $('#sh_emmas_code').val(),
        driver_id: $('#sh_driver_id').val(),
        derivery_status: $('#sh_derivery_status').val(),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        //$('#tbl-job-detail').find('tbody .tr_job_list').remove();

        let count_total = 0;
        let count_close = 0;
        let count_express = 0;
        let count_supplier = 0;
        let count_cn = 0;
        let count_br = 0;
        var cod_today = 0;
        let i = result.length;
        var data_table = [];

        $.each(result.data, function (key, val_list) {

            if (val_list['record_status'] == 0) {

                count_close++;

            } else {

                if (val_list['route_name'] === 'ส่งสินค้าด่วน') {
                    count_express++;
                } else if (val_list['route_name'] === 'รับสินค้า Supplier') {
                    count_supplier++;
                } else if (val_list['route_name'] === 'จัดส่งสินค้าสาขา') {
                    count_br++;
                } else if (val_list['route_name'] === 'รับคืนสินค้าลูกค้า') {
                    count_cn++;
                }

                cod_today += Number(val_list['cod_price']);
            }

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
                    exportOptions: {
                        columns: [2, 3, 4, 5, 8, 9, 10, 11, 13, 14, 15, 17, 19, 20, 21]
                    }
                },
            ],
            lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
            columns: [
                {
                    title: "#",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
                        return (meta.row) + 1;
                    }
                }, //0
                {
                    title: "trans_id",
                    data: "trans_id",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //0
                {
                    title: "<div class='text-center'>เลขที่เอกสาร</div>",
                    data: "job_no",
                    class: "tx-left align-middle",
                    //width: "190px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //4
                {
                    title: "<div class='text-center'>วันที่เอกสาร</div>",
                    data: "job_date",
                    class: "align-middle",
                    width: "45px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-center tx-12">' + moment(data, 'YYYY/MM/DD').format('DD/MM/YYYY') + '<span/>';
                    }
                }, //2
                {
                    title: "<div class='text-center'>เลขที่ใบสั่งซื้อ</div>",
                    data: "job_invoice_no",
                    class: "tx-left align-middle",
                    //width: "190px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //4
                {
                    title: "<div class='text-center'>เลขที่ใบสั่งจัด</div>",
                    data: "job_pk_no",
                    class: "tx-left align-middle",
                    //width: "190px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //4
                {
                    title: "<div class='text-center'>เลขที่อ้างอิง</div>",
                    class: "tx-left align-end",
                    width: "130px",
                    //visible: false,
                    render: function (data, type, row, meta) {

                        let job_type;

                        if (row.route_name === 'ส่งสินค้าด่วน') {
                            job_type = 'primary'
                        } else if (row.route_name === 'รับสินค้า Supplier') {
                            job_type = 'info'
                        } else if (row.route_name === 'จัดส่งสินค้าสาขา') {
                            job_type = 'warning'
                        } else if (row.route_name === 'รับคืนสินค้าลูกค้า') {
                            job_type = 'dark'
                        }

                        return '<span class="tx-12 tx-bold mr-1 mb-1">เอกสาร : </span> <span style="font-size:13px;" class="text-primary tx-bold">' + row.job_no + '</span>' +
                            '<br>' +
                            '<hr class="mb-1 mt-1">' +
                            '<span class="tx-12 tx-bold mr-2">สั่งซื้อ : </span> <span class="tx-12 tx-bold">' + row.job_invoice_no + '</span>' +
                            '<br>' +
                            '<span class="tx-12 tx-bold mr-2">สั่งจัด : </span> <span class="tx-12 tx-secondary tx-bold">' + row.job_pk_no + '</span>' +
                            '<br>' +
                            '<div class="tx-center">' +
                            '<span class="mt-1 w-100 badge badge-' + job_type + '">' + row.route_name + '</span>' +
                            '<\div>'
                    }
                }, //4
                {
                    title: "<div class='text-center'>ลูกค้า ที่อยู่</div>",
                    class: "tx-left align-end",
                    width: "550px",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        let job_emmas_addres = ''
                        let d_job_emmas_addres = (row.job_emmas_addres == null) ? '' : row.job_emmas_addres
                        if (row.job_emmas_addres == row.job_delivery_addr) {
                            job_emmas_addres == ''
                        } else {
                            job_emmas_addres = '<br><span class="tx-12 tx-left">' + d_job_emmas_addres + '</span>'
                        }

                        return '<span class="tx-12 tx-left tx-bold mb-1 mr-1">' + row.invcode + '</span>' +
                            '<br>' +
                            '<span class="tx-12 tx-left">' + row.job_delivery_name + '</span>' +
                            job_emmas_addres +
                            '<hr class="mb-1 mt-1">' +
                            '<span class="tx-12 tx-bold">จัดส่ง : </span>' + '<span class="tx-12 tx-left">' + row.job_delivery_addr + '</span>';
                    }
                }, //4
                {
                    title: "<div class='text-center'>รหัสลูกค้า</div>",
                    data: "invcode",
                    class: "tx-left align-middle",
                    //width: "190px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //4
                {
                    title: "<div class='text-center'>ชื่อลูกค้า</div>",
                    data: "job_delivery_name",
                    class: "tx-left align-middle",
                    //width: "190px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //4
                {
                    title: "<div class='text-center'>ที่อยู่เดิมลูกค้า</div>",
                    data: "job_emmas_addres",
                    class: "tx-left align-middle",
                    //width: "190px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //4
                {
                    title: "<div class='text-center'>ที่อยู่จัดส่ง</div>",
                    data: "job_delivery_addr",
                    class: "tx-left align-middle",
                    //width: "190px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //4
                {
                    title: "<div class='text-center'>ข้อมูลพนักงาน</div>",
                    class: "tx-center align-end",
                    width: "100px",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12 tx-right tx-bold mb-1">' + row.driver_id + '</span>' +
                            '<br>' +
                            '<hr class="mb-1 mt-1">' +
                            '<span class="tx-12 tx-left">' + row.driver_fullname + '</span>';
                    }
                }, //4
                {
                    title: "<div class='text-center'>รหัสพนักงาน</div>",
                    data: "driver_id",
                    class: "tx-center align-middle",
                    //width: "190px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //4
                {
                    title: "<div class='text-center'>ชื่อพนักงาน</div>",
                    data: "driver_fullname",
                    class: "tx-center align-middle",
                    //width: "190px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //4

                {
                    title: "<div class='text-center'>ประเภท</div>",
                    data: "route_name",
                    class: "tx-center align-middle",
                    //width: "190px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //4
                {
                    title: "ประเภท",
                    class: "tx-center align-middle",
                    //width: "190px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        let job_type;

                        if (row.route_name === 'ส่งสินค้าด่วน') {
                            job_type = 'primary'
                        } else if (row.route_name === 'รับสินค้า Supplier') {
                            job_type = 'info'
                        } else if (row.route_name === 'จัดส่งสินค้าสาขา') {
                            job_type = 'wanring'
                        } else if (row.route_name === 'รับคืนสินค้าลูกค้า') {
                            job_type = 'dark'
                        }

                        return '<span class="badge badge-' + job_type + '">' + row.route_name + '</span>';
                    }
                }, //4
                {
                    title: "COD",
                    data: "cod_price",
                    class: "tx-right align-end",
                    render: function (data, type, row, meta) {

                        let cod_price_full = numberWithCommas(data);

                        cod_price_full = cod_price_full > '0' ? '<p class="tx-bold tx-danger"><u class="tx-bold tx-success mr-1">' + cod_price_full + '</u>฿</p>' : cod_price_full

                        return cod_price_full;
                    }
                }, //4
                {
                    title: "สร้าง",
                    data: "created_by",
                    class: "tx-center align-end",
                    //width: "190px",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + row.created_by + '<hr class="mb-1 mt-1">' + moment(row.created_date).format("DD/MM/YYYY HH:mm:ss") + '</span>';
                    }
                }, //4
                {
                    title: "ผู้สร้างเอกสาร",
                    data: "created_by",
                    class: "tx-center align-middle",
                    //width: "190px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //4
                {
                    title: "เวลาที่สร้าง",
                    data: "created_date",
                    class: "tx-center align-middle",
                    //width: "190px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + moment(data).format("DD/MM/YYYY HH:mm:ss") + '<span/>';
                    }
                }, //4
                {
                    title: "สถานะ",
                    data: "record_status",
                    class: "tx-center align-end",
                    //width: "190px",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        let tx, cl
                        if (data == 1) {
                            tx = 'ใช้งาน'
                            cl = 'success'
                        } else {
                            tx = 'ไม่ใช้งาน'
                            cl = 'danger'
                        }
                        return '<div class="row justify-content-center">' +
                            '<div class="col-12">' +
                            '<div class="d-flex align-self-center mb-3"><div class="col-12 "><a class="tx-danger tx-17  btn-action job-delete" href="javascript:void(0)" data-toggle="tooltip" title="" data-original-title="Remove item"><i class="fa fa-trash"></i></a></div></div>' +
                            '</div>' +
                            '<div class="col-12">' +
                            '<span class="tx-12 w-100 badge badge-' + cl + '">' + tx + '</span>' +
                            '</div >' +

                            '</div >';
                    }
                }, //4

            ],
            rowCallback: function (row, data) {

                if (data.record_status == 0) {
                    $('td:eq(1)', row).parent().addClass('bg-danger-transparent');
                    $('td:eq(1)', row).parent().addClass('text-danger');
                    //$('td:eq(1)', row).parent().addClass('tx-line-through');
                    $('td:eq(1)', row).parent().css("text-decoration-line", "line-through");
                    $('td:eq(1)', row).find('span').css("text-decoration-line", "line-through");
                    $('td:eq(0)', row).find('a').removeClass('btn-report').removeAttr('href');
                }

            },
            initComplete: function (settings, json) {

                $(".loader-spinner").addClass("d-none");

                $("#global-loader").fadeOut();

                $('#table-list tbody').off('click', '.job-delete').on('click', '.job-delete', async function (e) {

                    e.preventDefault()

                    var data = table_list.row($(this).parents('tr')).data();

                    if (data.record_status == 1) {

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

                                $.close_job(data.job_no);

                            } else {

                                swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                            }

                        });
                    }

                });

            }
        });

    });

}

$.dashboard_driver = async function () {

    let url = new URL(URL_TMS_JOB_MO_DRIVER_DASHBOARD);

    url.search = new URLSearchParams({
        job_date: moment().format('YYYY-MM-DD'), //moment($('#show_date').val(), 'DD-MM-YYYY').format('YYYY-MM-DD')        
        mode: '',
        ref_id: '',
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        //$('#tbl-job-detail').find('tbody .tr_job_list').remove();
        $('#card_driver').empty();
        let card_driver = '';

        $.each(result.data, function (key, val) {

            let driver_id = val['driver_id']
            let driver_fullname = val['driver_fullname']
            let job_total = val['job_total']
            let ptice_total = val['ptice_total']
            let h_darivery_success = val['h_darivery_success']
            let h_darivery_pending = val['h_darivery_pending']
            let h_darivery_failed = val['h_darivery_failed']

            let bg_color = '';
            let bd_color = '';

            if (job_total > 0) {
                bg_color = 'dark'
            } else {
                bg_color = 'dark'
            }

            if (h_darivery_pending > 0) {
                bd_color = 'warning'
            }


            card_driver = '<div class="col-sm-12 col-xl-4 col-lg-12 card_driver ' + driver_id + '"> ' +
                '<div class="card user-wideget user-wideget-widget widget-user"> ' +
                '<div class="widget-user-header bg-' + bg_color + ' "> ' +
                '<h3 class="widget-user-username tx-black">' + driver_fullname + '</h3> ' +
                '<h5 class="widget-user-desc">' + driver_id + '</h5> ' +
                '</div> ' +
                '<div class="widget-user-image ">' +
                '<img src="../../assets/img/faces/17.jpg" style="width:90px;height:90px;" class="brround bd bd-' + bd_color + '" alt="User Avatar"> ' +
                '</div> ' +
                '<div class="user-wideget-footer"> ' +
                '<div class="row"> ' +
                '<div class="col-sm-3 border-right"> ' +
                '<div class="description-block"> ' +
                '<h5 class="description-header">' + job_total + '</h5> ' +
                '<span class="description-text">JOB</span> ' +
                '</div> ' +
                '</div> ' +
                '<div class="col-sm-3 border-right"> ' +
                '<div class="description-block"> ' +
                '<h5 class="description-header">' + h_darivery_pending + '</h5> ' +
                '<span class="description-text">PENNIG</span> ' +
                '</div> ' +
                '</div> ' +
                '<div class="col-sm-3 border-right"> ' +
                '<div class="description-block"> ' +
                '<h5 class="description-header">' + h_darivery_failed + '</h5> ' +
                '<span class="description-text">FAILED</span> ' +
                '</div> ' +
                '</div> ' +
                '<div class="col-sm-3"> ' +
                '<div class="description-block"> ' +
                '<h5 class="description-header">' + h_darivery_success + '</h5> ' +
                '<span class="description-text">SUCCESS</span> ' +
                '</div> ' +
                '</div> ' +
                '<div class="col-sm-12"> ' +
                '<div class="description-block"> ' +
                '<h5 class="description-header">' + numberWithCommas(ptice_total) + '</h5> ' +
                '<span class="description-text">COD</span> ' +
                '</div> ' +
                '</div> ' +
                '</div> ' +
                '</div> ' +
                '</div> ' +
                '</div> ';

            $('#card_driver').append(card_driver);

        });

        //$('#card_driver').append(card_driver);

        $("#global-loader").fadeOut();

    });

}

$.time_list = async function () {

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
                    console.log(data)
                    //$.Frm_Memo(data.job_no);

                    if (row.child.isShown()) {

                        row.child.hide();
                        tr.removeClass('shown');

                    }
                    else {

                        $.item_detail(row.child, data);
                        $("#global-loader").fadeIn();
                        tr.addClass('shown');
                    }

                });

            }
        });

    });

}

$.item_detail = function format(callback, citem) {

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


$.job_ref = async function () {

    driver_raw = $('#frm_data').find('#driver_id').val();

    const driver = driver_raw.split(":");

    await fetch(url_cn + '&cn_pre_job_jobno=' + $('#job_inv').val() + '&cn_pre_job_assige=TRP').then(function (response) {

        return response.json();

    }).then(function (result) {

        console.log(result);

        let cn_data = {
            cn_pre_job_id: result.data['0']['cn_pre_job_id'],
            cn_pre_job_detail_assige: 'TRP',
            cn_pre_job_detail_driver: driver[1], //driver_name[0]['text'],
            cn_pre_job_detail_pickup_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            cn_pre_job_detail_status: 'on_process',
            cn_pre_job_detail_remark: 'เข้ารับสินค้า :' + driver[1],
            cn_pre_job_detail_item_condition: '',
            cn_pre_job_detail_comment: result.data['0']['cn_pre_job_comment'],
            created_by: user_id,
            updated_by: user_id,
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

    });

    await fetch(url_api + '/v1/trp_salefile_get?number=' + cn_salefile_number).then(function (response) {

        return response.json();

    }).then(async function (result) {

        console.log(result)

        if (result.length > 0) {

            const driver = driver_raw.split(":");

            let uuid = $.uuid();

            ref_id = uuid;

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
                driver_id: $.trim(driver[0]),
                driver_fullname: $.trim(driver[1]),
                job_plate: $.trim(driver[0]),
                plate_name: $.trim(driver[0]),
                created_by: user_id,
                ref_id: ref_id,
                cod_price: 0,
                delivery_type: pay_type,
                job_status: 'PENDING',
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
                    $("#global-loader").fadeOut();

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

                    toastr.success('Save Successfully!', async function () {

                        //swal({
                        //    title: "สำเร็จ!",
                        //    text: "ทำรายการสำเร็จ",
                        //    type: 'success',
                        //    timer: 2000,
                        //    showConfirmButton: false
                        //});

                        $.upload_tms();

                    });

                }

            });

        } else {

            $("#global-loader").fadeOut();
            toastr.error('ไม่พบข้อมูลเลขที่บิล');
            $('#job_inv').val('')

        }

    });

}

$.job_inv = async function (number) {

    let url = new URL(URL_TRP_SALEFILE_BRANCH_GET);

    url.search = new URLSearchParams({
        branch: $('#frm_data').find('#inv_branch').val(),
        number: $('#frm_data').find('#job_inv').val()
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        console.log('result', result.data)

        if (result.status === 'Error') {

            $("#global-loader").fadeOut();

            toastr.error('Oops! An Error Occurred');

            swal({
                title: 'เกิดข้อผิดพลาด!',
                text: 'การดึงข้อมูลบิลล้มเหลว',
                type: 'error',
                confirmButtonColor: '#57a94f'
            })

        } else {

            if (result.length == 0) {

                swal({
                    title: 'เกิดข้อผิดพลาด!',
                    text: 'การแสดงข้อมูลบิลล้มเหลว',
                    type: 'error',
                    confirmButtonColor: '#57a94f'
                })

                $("#global-loader").fadeOut();

            } else {

                $.job_check(result);

            }

        }

    });

}

$.job_check = async function (result_inv) {

    const driver = driver_raw.split(":");

    let url = new URL(URL_TMS_JOB_MO_CHECK);

    url.search = new URLSearchParams({
        job_date: moment().format('YYYY-MM-DD'), //moment($('#show_date').val(), 'DD-MM-YYYY').format('YYYY-MM-DD')
        job_invoice_no: $.trim(result_inv.data['0']['number']),
        job_pk_no: $.trim(result_inv.data['0']['invpo']),
        route_no: '00/0',
        driver_id: $.trim(driver[0]),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        console.log('result', result.data)

        if (result.status === 'Error') {

            $("#global-loader").fadeOut();

            toastr.error('Oops! An Error Occurred');

            swal({
                title: 'เกิดข้อผิดพลาด!',
                text: 'การตรวจสอบข้อมูลบิลล้มเหลว',
                type: 'error',
                confirmButtonColor: '#57a94f'
            })

        } else {

            if (result.length == 0) {

                $("#global-loader").fadeOut();

                swal({
                    title: 'เกิดข้อผิดพลาด!',
                    text: 'การแสดงข้อมูลบิลล้มเหลว',
                    type: 'error',
                    confirmButtonColor: '#57a94f'
                })

            } else {

                if (result.data[0]['pMessage'] == 'DUPLICATE') {

                    $("#global-loader").fadeOut();

                    swal({
                        title: "พบข้อมูลนี้ถูกสร้างแล้ว !",
                        text: "จะทำการอัพโหลดข้อมูลนี้หรือไม่",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "ใช่, ยันยืน",
                        cancelButtonText: "ไม่, ยกเลิก",
                        cancelButtonColor: '#d33',
                        showLoaderOnConfirm: true,
                        closeOnConfirm: false,
                        closeOnCancel: false
                    }, function (isConfirm) {

                        if (isConfirm) {

                            $.job_create(result_inv);

                        } else {

                            swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");
                            $('#driver_id').val('').prop('disabled', false)
                            $('#job_inv').val('').prop('disabled', true)

                        }

                    });

                } else {

                    $.job_create(result_inv);

                }

            }

        }

    });

}

$.job_create = async function (result_inv) {

    console.log('result_inv', result_inv);

    const driver = driver_raw.split(":");

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

    let uuid = $.uuid();

    add_data = {

        job_date: moment().format('YYYY-MM-DD'), //moment($('#show_date').val(), 'DD-MM-YYYY').format('YYYY-MM-DD')
        job_invoice_no: $.trim(result_inv.data['0']['number']),
        job_invoice_date: $.trim(result_inv.data['0']['invdate']),
        job_pk_no: $.trim(result_inv.data['0']['invpo']),
        job_qty: $.trim(result_inv.data['0']['item']),
        invnet: $.trim(result_inv.data['0']['invnet']),
        invcode: $.trim(result_inv.data['0']['invcode']),
        job_delivery_name: $.trim(result_inv.data['0']['invname']),
        job_delivery_addr: $.trim(result_inv.data['0']['e_delivery_address']), //$('#route_no').val()
        job_emmas_addres: $.trim(result_inv.data['0']['emmas_addres']), //$('#route_no').val()
        route_no: '00/0',
        route_name: 'ส่งสินค้าด่วน',
        driver_id: $.trim(driver[0]),
        driver_fullname: $.trim(driver[1]),
        HHID: $.trim(driver[0]),
        job_status: 'PENDING',
        job_plate: $.trim(driver[0]),
        plate_name: $.trim(driver[0]),
        cod_price: cod_price,
        delivery_type: pay_type,
        batch_no: 1,
        ref_id: uuid,
        created_by: user_id,
        inv_description: $.trim(result_inv.data['0']['descript']),

    };

    //console.log('add_data', add_data);

    var params = [];
    for (const i in add_data) {
        params.push(i + "=" + encodeURIComponent(add_data[i]));
    }

    fetch(URL_TMS_JOB_MO_ADD, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params.join("&"),
    }).then(data => {
        return data.json();
    }).then(result => {

        if (result.status === 'Error') {

            swal({
                title: 'เกิดข้อผิดพลาด!',
                text: 'การสร้างข้อมูลล้มเหลว',
                type: 'error',
                confirmButtonColor: '#57a94f'
            })

            $("#global-loader").fadeOut();

        } else {

            if (result.length == 0) {

                $("#global-loader").fadeOut();

                swal({
                    title: 'เกิดข้อผิดพลาด!',
                    text: 'การแสดงข้อมูลบิลล้มเหลว',
                    type: 'error',
                    confirmButtonColor: '#57a94f'
                })

            } else {

                //console.log('result_add', result.data);
                ref_id = result.data[0]['ref_id']

                let shippingNoteDescription
                let job_invoice_no = result.data[0]['job_invoice_no']
                let job_pk_no = result.data[0]['job_pk_no']

                if (job_invoice_no == '' || job_invoice_no == null || job_invoice_no == '-') {
                    shippingNoteDescription = job_pk_no
                } else {
                    shippingNoteDescription = job_invoice_no
                }

                //verify addr start

                let receiverAddress = ''
                let job_delivery_addr = result.data[0]['job_delivery_addr']
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
                        console.log('a5 job_delivery_addr', job_delivery_addr)
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

                    console.log('emlocation != null', status_verify_addr)

                } else {

                    if (job_delivery_addr.search("กรุงเทพฯ") >= 0) {
                        status_verify_addr = 1
                        receiverAddress = job_delivery_addr.replace('กรุงเทพฯ', 'กรุงเทพมหานคร')
                        console.log('b1', status_verify_addr)
                        console.log('b1 job_delivery_addr', job_delivery_addr)
                    } else if (job_delivery_addr.search(" กรุงเทพ ") >= 0) {
                        status_verify_addr = 1
                        receiverAddress = job_delivery_addr.replace('กรุงเทพ', 'กรุงเทพมหานคร')
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
                        console.log('b8 job_delivery_addr', job_delivery_addr)
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
                        console.log('b12 job_delivery_addr', job_delivery_addr)
                    }

                    console.log('emlocation = null', status_verify_addr)

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

                //verify addr end

                citem_job = [
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
                        "shippingNoteList": [
                            {
                                "shippingNoteCode": result.data[0]['job_no'],
                                "shippingNoteDescription": shippingNoteDescription,
                                "deliveryDate": result.data[0]['job_date'],
                                "packageNumber": job_pk_no,
                                "productAmount": 1,
                                "codPrice": cod_price,
                                "weight": 1,
                                "volume": 1,
                                "senderName": 'VSM',
                                "receiverName": result.data[0]['job_delivery_name'],
                                "actualReceiverName": result.data[0]['job_delivery_name'],
                                "receiverContact": 0,
                                "receiverAddress": receiverAddress,
                                "endRouteLineCode": result.data[0]['route_no'],
                                "lat": '13.8163198',
                                "lng": '100.7228919',
                                "productCode": shippingNoteDescription,
                                "deliveryProjectCode": 'VSM-001',
                                "startConsumerDistributionCenterCode": 'DCC-001',
                            }
                        ]
                    }
                ];

                console.log('citem_job', citem_job)

                $.upload_tms();

            }

        }

    });

}

$.job_create_V1 = async function () {

    await fetch(url_api + '/v1/trp_salefile_get?number=' + $('#md_job_inv').val()).then(function (response) {

        return response.json();

    }).then(async function (result) {

        console.log(result)

        if (result.length > 0) {

            const driver = driver_raw.split(":");

            let cod_price
            let descript = result.data['0']['descript'].toUpperCase()
            let ck_cod = descript.search("<COD>")
            if (ck_cod >= 0) {
                cod_price = result.data['0']['invsumtt']
                pay_type = 'DC02'
            } else {
                cod_price = 0
                pay_type = 'DC01'
            }

            fetch(url_api + '/v1/trp_tms_job_express_check' +
                '?job_date=' + moment().format('YYYY-MM-DD') +
                '&route_no=' + '00/0' +
                '&driver_id=' + $.trim(driver[0]) +
                '&job_plate=' + $.trim(driver[0]) +
                '&job_invoice_no=' + result.data['0']['number'] +
                '&job_pk_no=' + result.data['0']['invpo']
            ).then(function (response) {
                return response.json();
            }).then(function (result_chk) {

                $("#global-loader").fadeOut();

                console.log('result_chk', result_chk.data)

                if (result_chk.data['0']['chk_job'] > 0) {

                    swal({
                        title: "พบข้อมูลนี้ถูกสร้างแล้ว !",
                        text: "จะทำการอัพโหลดข้อมูลนี้หรือไม่",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "ใช่, ยันยืน",
                        cancelButtonText: "ไม่, ยกเลิก",
                        cancelButtonColor: '#d33',
                        showLoaderOnConfirm: true,
                        closeOnConfirm: false,
                        closeOnCancel: false
                    }, function (isConfirm) {

                        if (isConfirm) {

                            let uuid = $.uuid();

                            ref_id = uuid;

                            add_data = {
                                //tran_id: uuid,
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
                                driver_id: $.trim(driver[0]),
                                driver_fullname: $.trim(driver[1]),
                                job_plate: $.trim(driver[0]),
                                plate_name: $.trim(driver[0]),
                                created_by: user_id,
                                cod_price: cod_price,
                                delivery_type: pay_type,
                                ref_id: ref_id,
                            };

                            var params = [];
                            for (const i in add_data) {
                                params.push(i + "=" + encodeURIComponent(add_data[i]));
                            }

                            fetch(url_api + '/v1/trp_tms_job_express_add', {
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
                                    $("#global-loader").fadeOut();

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

                                    toastr.success('Save Successfully!', async function () {

                                        swal({
                                            title: "สำเร็จ!",
                                            text: "ทำรายการสำเร็จ",
                                            type: 'success',
                                            timer: 2000,
                                            showConfirmButton: false
                                        });

                                        $.upload_tms();

                                    });

                                }

                            });

                        } else {

                            swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");
                            $('#driver_id').val('').prop('disabled', false)
                            $('#job_inv').val('').prop('disabled', true)
                        }

                    });

                } else {

                    let uuid = $.uuid();

                    ref_id = uuid;

                    add_data = {
                        //tran_id: uuid,
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
                        driver_id: $.trim(driver[0]),
                        driver_fullname: $.trim(driver[1]),
                        job_plate: $.trim(driver[0]),
                        plate_name: $.trim(driver[0]),
                        created_by: user_id,
                        cod_price: cod_price,
                        delivery_type: pay_type,
                        ref_id: ref_id,
                    };

                    var params = [];
                    for (const i in add_data) {
                        params.push(i + "=" + encodeURIComponent(add_data[i]));
                    }

                    fetch(url_api + '/v1/trp_tms_job_express_add', {
                        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                        // mode: 'no-cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        body: params.join("&"),
                    }).then(result_export => {

                        return result_export.json();

                    }).then(result_export => {

                        let resStatus = result_export.status;

                        if (result_export.status === 'Error') {

                            toastr.error(result_export.error_message);
                            $("#global-loader").fadeOut();

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

                            toastr.success('Save Successfully!', async function () {

                                $.upload_tms();

                            });

                        }

                    });
                }

            });

        } else {

            $("#global-loader").fadeOut();
            toastr.error('ไม่พบข้อมูลเลขที่บิล');
            $('#job_inv').val('')

        }

    });

}

$.job_update = async function (mode, data) {

    let c_data = ''
    if (mode == 'CLOSE') { c_data = data } else { c_data = ref_id }

    console.log('mode', mode)
    console.log('c_data', c_data)
    console.log('ref_id', ref_id)

    let data_update = {
        mode: mode,
        ref_id: c_data,
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

        console.log('result', result.data)

        if (result.status === 'Error') {

            swal({
                title: 'เกิดข้อผิดพลาด!',
                text: 'การสร้างข้อมูลล้มเหลว',
                type: 'error',
                confirmButtonColor: '#57a94f'
            })

            $("#global-loader").fadeOut();

            $('#number-close_job').prop('disabled', false);

        } else {

            $("#global-loader").fadeOut();

            swal({
                title: "สำเร็จ!",
                text: "ทำรายการสำเร็จ",
                type: 'success',
                timer: 500,
                showConfirmButton: false
            });

            $.list();

            if (mode == 'CLOSE') {

                $('#number-close_job').val('');
                $('#number-close_job').focus();
                $('#number-close_job').prop('disabled', false);
                $('#modal-cancel_job').modal('hide');

                //$.list();
            }

        }

    });

}

$.job_br = async function () {

    const driver = driver_raw.split(":");

    await fetch(url_br + 'job_no=' + $('#job_inv').val()).then(function (response) {

        return response.json();

    }).then(async function (result_br) {

        console.log(result_br);

        let uuid = $.uuid();

        ref_id = uuid;

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
            driver_id: $.trim(driver[0]),
            driver_fullname: $.trim(driver[1]),
            job_plate: $.trim(driver[0]),
            plate_name: $.trim(driver[0]),
            created_by: user_id,
            cod_price: 0,
            delivery_type: pay_type,
            ref_id: ref_id
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
                $("#global-loader").fadeOut();

            } else {

                citem_job = [
                    {
                        "deliveryProjectCode": result_export.data[0]['deliveryProjectCode'],
                        "underDistributionCenterCode": result_export.data[0]['underDistributionCenterCode'],
                        "vehicleLicensePlate": driver[0], //$('#frm_data').find('#driver_id').val(),
                        "vehicleFuelUseRate": result_export.data[0]['vehicleFuelUseRate'],
                        "vehiclePercentReFuel": result_export.data[0]['vehiclePercentReFuel'],
                        "addOnVehicleLicensePlate": result_export.data[0]['addOnVehicleLicensePlate'],
                        "driverCode": driver[0],// $('#frm_data').find('#driver_id').val(),
                        "driverName": result_export.data[0]['driverName'],/// ติดไว้สักครู่
                        "manifestNoteCreateDate": moment().format('YYYY-MM-DD'),
                        "manifestNoteStartType": result_export.data[0]['manifestNoteStartType'],
                        "startDistributionCenterCode": 'VSM',
                        "endRouteLineCode": 'BR',
                        "receiveProductDate": driver[0],//$('#frm_data').find('#driver_id').val(),
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

                toastr.success('Save Successfully!', async function () {

                    //swal({
                    //    title: "สำเร็จ!",
                    //    text: "ทำรายการสำเร็จ",
                    //    type: 'success',
                    //    timer: 2000,
                    //    showConfirmButton: false
                    //});

                    $.upload_tms();

                });

            }

        });

    });

}

$.job_supplier = async function () {

    const driver = driver_raw.split(":");

    await fetch(url_supplier + 'apmas_code=' + $('#job_inv').val()).then(function (response) {

        return response.json();

    }).then(async function (result_supplier) {

        console.log(result_supplier);
        citem_job = [];

        let uuid = $.uuid();

        ref_id = uuid;

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
            driver_id: $.trim(driver[0]),
            driver_fullname: $.trim(driver[1]),
            job_plate: $.trim(driver[0]),
            plate_name: $.trim(driver[0]),
            created_by: user_id,
            cod_price: 0,
            delivery_type: pay_type,
            ref_id: ref_id
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
                $("#global-loader").fadeOut();

            } else {

                citem_job = [
                    {
                        "deliveryProjectCode": result_export.data[0]['deliveryProjectCode'],
                        "underDistributionCenterCode": result_export.data[0]['underDistributionCenterCode'],
                        "vehicleLicensePlate": driver[0],//$('#frm_data').find('#driver_id').val(),
                        "vehicleFuelUseRate": result_export.data[0]['vehicleFuelUseRate'],
                        "vehiclePercentReFuel": result_export.data[0]['vehiclePercentReFuel'],
                        "addOnVehicleLicensePlate": result_export.data[0]['addOnVehicleLicensePlate'],
                        "driverCode": driver[0],//$('#frm_data').find('#driver_id').val(),
                        "driverName": result_export.data[0]['driverName'],/// ติดไว้สักครู่
                        "manifestNoteCreateDate": moment().format('YYYY-MM-DD'),
                        "manifestNoteStartType": result_export.data[0]['manifestNoteStartType'],
                        "startDistributionCenterCode": 'VSM',
                        "endRouteLineCode": result_export.data[0]['endRouteLineCode'],
                        "receiveProductDate": driver[0],//$('#frm_data').find('#driver_id').val(),
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

                toastr.success('Save Successfully!', async function () {

                    //swal({
                    //    title: "สำเร็จ!",
                    //    text: "ทำรายการสำเร็จ",
                    //    type: 'success',
                    //    timer: 2000,
                    //    showConfirmButton: false
                    //});

                    $.upload_tms();

                });

            }

        });

    });

}

$.upload_tms = async function () {

    await $.ajax({
        async: false,
        url: 'https://vsk.tms-vcargo.com/api/tms/public/v1/manifestnote/create-shipping-note-and-create-manifest-customer',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({ 'manifestNoteList': citem_job }),
        success: function (result) {
            //console.log(result)
            //console.log(result.statusCode)

            citem_job = [];

            $.job_update('MO',)

        },
        error: function (xhr, ajaxOptions, thrownError) {

            //alert(xhr.status);
            $("#global-loader").fadeOut();

            swal({
                title: 'เกิดข้อผิดพลาด!',
                text: 'ไม่สามารถส่งข้อมูลขึ้น TMS ',
                type: 'error',
                confirmButtonColor: '#57a94f'
            })

            console.log(xhr.status)

            if (xhr.status == 400) {

                $('#modal-frm_add_job').modal({
                    keyboard: false,
                    backdrop: 'static'
                });

            }

        }

    });

    await $('.job_inv').val('').prop("disabled", true);
    await $('.driver_id').prop("disabled", false);
    await $('.driver_id').val('');
    await $('.driver_id').focus();
    await $("#global-loader").fadeOut();
    //await $.list();

}

$.close_job = function (number) {

    $.ajax({
        async: false,
        url: 'https://vsk.tms-vcargo.com/api/tms/public/v1/manifestnote/close-manifest/shippingnote',
        type: 'POST',
        contentType: "application/json; charset=utf-8",

        dataType: 'json',
        data: JSON.stringify(
            [{
                'shipingNoteNumber': number,
                //'state': 3,
                'state': 4,
                //'closeShipmentDate': moment().format(),
                'closeShipmentDate': moment().format('YYYY-MM-DD'),
            }]
        ),
        success: function (result) {

            $("#global-loader").fadeOut();

            $.job_update('CLOSE', number);

        },
        error: function (xhr, ajaxOptions, thrownError) {

            //alert(xhr.status);
            $("#global-loader").fadeOut();

            swal({
                title: 'เกิดข้อผิดพลาด!',
                text: 'ไม่สามารถส่งข้อมูลขึ้น TMS ',
                type: 'error',
                confirmButtonColor: '#57a94f'
            })

            $('#number-close_job').val('');
            $('#number-close_job').focus();

        }

    });

};

$.Driver_Get = async function () {

    $.ajax({
        async: false,
        url: 'https://vsk.tms-vcargo.com/api/tms/public/v1/routeline/search',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({ 'code': '', 'name': '' }),
        success: function (result) {

            if (result.object.length > 0) {

                let Master_dataSet = [];

                $.each(result.object, function (key, val) {

                    Master_dataSet.push({ id: val['routeLineCode'], text: (val['routeLineNameTh']) });

                });

                $('#frm_data').find('#route_no').select2({
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

        }

    });

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
                console.log(data);
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

$(document).ready(async function () {

    await $.init();
    await $.list();

});
