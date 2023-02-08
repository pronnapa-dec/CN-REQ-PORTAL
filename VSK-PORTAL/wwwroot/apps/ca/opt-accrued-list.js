'use strict';

const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const application_id = objProfile[0]['application'];
const user_id = objProfile[0]['username'];
const url_link = "http://localhost" + "/file_daily_cashier/";
const url_job = "http://localhost:57916/";
const url_api = "http://localhost:49705";

//const url_link = "http://192.168.1.247:8899" + "/file_daily_cashier/";
//const url_api = "http://192.168.1.247:8899/ca-api";
//const url_job = "http://192.168.1.247:8099/";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const url_daily_cashier_list = url_api + '/v1/DAILY_CASHIER_LIST';

const url_master_get = url_api + '/v1/DAILY_CASHIER_MASTER';

let oTable = $('#tbl-list').DataTable();
let table_accrued, table_accrued_receive;
let table_history_cash, table_history_coupons, table_history_edc
let table_file_list
let table_list
let action_status;
let ref_id;
let pay_status = '';

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

function toThaiDateString(date) {
    let monthNames = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
        "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
        "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    let dayNames = ["วันอาทิตย์ที่", "วันจันทร์ที่", "วันอังคารที่", "วันพุธที่", "วันพฤหัสบดีที่", "วันศุกร์ที่", "วันเสาร์ที่"];

    let year = date.getFullYear() + 543;
    let month = monthNames[date.getMonth()];
    let numOfDay = date.getDate();
    let dayth = dayNames[date.getDay()]

    let hour = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let second = date.getSeconds().toString().padStart(2, "0");

    return `${dayth} ${numOfDay} ${month} ${year} ` +
        `${hour}:${minutes}:${second} น.`;
}

$(document).ready(async function () {

    var datetime = null,
        date = new Date();

    var update = function () {
        date = new Date();
        datetime.html(toThaiDateString(date));
    };
    datetime = $('.time-today')
    update();
    setInterval(update, 1000);

    $('#branch').removeAttr('required')

    if (user_id == 'sudarut.s') {
        $('#branch').val('')
    }else{
        $('#branch').val(application_id.substring(0, 3))
    }

    await $.init();
    await $.Master_Get();
    await $.Daily_Cashier_List();

});

$.init = async function () {

    //$('.breadcrumb-header').find('.right-content').append('<div class="pd-l-10 mb-6 mb-xl-0"><button id="btn-export" class="btn btn-primary btn-with-icon btn-block" ><i class="las la-file-pdf"></i> ฟอร์มนำส่งเงิน </button></div>')
    //$('.breadcrumb-header').find('.right-content').append('<div class="pd-l-10 mb-6 mb-xl-0"><button id="btn-report_verify" class="btn btn-warning tx-dark btn-with-icon btn-block" ><i class="las la-clipboard-check"></i> รายงานตรวจสอบ </button></div>')

    $('#job_date').daterangepicker({
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

    $('#btn-item_create').off('click').on('click', async function (e) {

        e.preventDefault();

        let url_bankslip = url_job + "csh/opt/accrued_job";

        console.log(url_bankslip)

        window.open(url_bankslip, '_blank');

    });

    $('#btn-export').off('click').on('click', async function (e) {

        e.preventDefault();

        let url_report = "http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_CA_CSH_CASHIER_TO_SEND_MONEY&rs:Command=Render&rs:Format=pdf"
     
        console.log(url_report)

        window.open(url_report, '_blank');

    });

    $('#btn-report_daily_cashier_today').off('click').on('click', async function (e) {

        e.preventDefault();

        let url = 'http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_CA_DAILY_CASHIER_TODAY&rs:Command=Render';

        window.open(url, '_blank');

    });

    $('#btn-report_verify').off('click').on('click', async function (e) {

        e.preventDefault();

        let url = 'http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_CA_DAILY_CASHIER_VERIFY_FULL&rs:Command=Render';

        window.open(url, '_blank');

    });

    $('#frm_search').submit(async function (e) {

        e.preventDefault();

        $(".card-body").LoadingOverlay("show", {
            image: '',
            custom: customElement
        });

        $.Daily_Cashier_List();

    });

    $('#slip_cusname').select2({
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

};

$.Daily_Cashier_List = async function () {

    let url = new URL(url_daily_cashier_list);

    let trndate_start;
    let trndate_end;

    trndate_start = $('#job_date').val() != '' ? moment($('#job_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment().add(-1, 'days').format('YYYY-MM-DD') + ' 00:00';
    trndate_end = $('#job_date').val() != '' ? moment($('#job_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';

    url.search = new URLSearchParams({
        mode: '',
        job_date_start: trndate_start,
        job_date_end: trndate_end,
        branch: $('#frm_search').find('#branch').val(),
        confirm_status: $('#frm_search').find('#status').val(),
        created_by: $('#frm_search').find('#cashier_user').val(),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        $(".card-body").LoadingOverlay("hide", true);

        if (result.status === 'Error') {

            $("#global-loader").fadeOut("slow");

            swal({
                title: "ขออภัย",
                text: "เกิดข้อผิดพลาด",
                type: 'error',
                timer: 2000,
                showConfirmButton: false
            });

            toastr.error('ขออภัย!');

        } else {

            table_list = $('#table-list').DataTable({
                data: result.data,
                dom: 'Bfrtip',
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
                        filename: 'REPORT_CA_DAILY_CASHIER_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                        exportOptions: {
                            columns: [2,3, 4, 5, 6,7,8, 9,10,15,16,17]
                        }
                    },
                ],
                columns: [
                    {
                        title: "<span class='tx-12'>trans_id</span>",
                        data: "trans_id",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //0
                    {
                        title: "<span class='tx-12'>ref_id</span>",
                        data: "ref_id",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //0
                    {
                        title: "<span class='tx-12'>วันที่เอกสาร</span>",
                        data: "job_date",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            //return '<span class="tx-12">' + moment(data, 'YYYY/MM/DD').format('DD/MM/YYYY') + '</span>';
                            let url_packing_job = url_job + "csh/opt/accrued_job?job_date=" + moment(data, 'YYYY/MM/DD hh:mm:ss').format('YYYY/MM/DD') + "&branch=" + row.branch + "&created_by=" + row.created_by

                            return '<div data-placement="top" data-toggle="tooltip-primary">' + '<a href="' + url_packing_job + '" target="_blank"><b>' + '<span style="font-size:11px;" class="tx-bold">' + moment(data, 'YYYY/MM/DD').format('DD/MM/YYYY') + '</span>' + '</div>'

                        }
                    }, //0
                    {
                        title: "<span class='tx-12'>สาขา</span>",
                        data: "branch",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12 tx-bold">' + data + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>แคชเชียร์</span>",
                        data: "created_by",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            //return '<span class="tx-12 tx-bold">' + data + '</span>';
                            let url_packing_job = url_job + "csh/opt/accrued_job?job_date=" + moment(row.job_date, 'YYYY/MM/DD hh:mm:ss').format('YYYY/MM/DD') + "&branch=" + row.branch + "&created_by=" + data

                            return '<div data-placement="top" data-toggle="tooltip-primary">' + '<a href="' + url_packing_job + '" target="_blank"><b>' + '<span style="font-size:11px;" class="tx-bold">' + data + '</span>' + '</div>'

                        }
                    }, //
                    {
                        title: "<span class='tx-12'>เงินสด</span>",
                        data: "cash",
                        class: "tx-right align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + numberWithCommas(data.toFixed(2)) + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>เงินโอน</span>",
                        data: "transfer_payment",
                        class: "tx-right align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + numberWithCommas(data.toFixed(2)) + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>บัตร</span>",
                        data: "edc",
                        class: "tx-right align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + numberWithCommas(data.toFixed(2)) + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>คูปอง</span>",
                        data: "coupons",
                        class: "tx-right align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + numberWithCommas(data.toFixed(2)) + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>ค้างรับ</span>",
                        data: "accrued",
                        class: "tx-right align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + numberWithCommas(data.toFixed(2)) + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>รับชำระ</span>",
                        data: "accrued_receive",
                        class: "tx-right align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + numberWithCommas(data.toFixed(2)) + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>ชื่อแคชเชียร์</span>",
                        data: "csh_saveby",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>เวลาแคชเชียร์</span>",
                        data: "csh_dateby",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>ชื่อบัญชี</span>",
                        data: "acc_saveby",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>เวลาบัญชี</span>",
                        data: "acc_dateby",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>ส่งยอด</span>",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            //  if (row.csh_saveby == '' || row.csh_saveby == null ) {
                            if (row.confirm_status == 'PROCESS') {
                                return '-'
                            } else if (row.confirm_status == 'APPROVAL') {
                                return '<span class="tx-12">' + row.csh_saveby + '</span>' +
                                    '<br>' +
                                    '<span class="tx-12">' + moment(row.csh_dateby).format("DD/MM/YYYY HH:mm:ss") + '</span>';
                            } else if (row.confirm_status == 'COMPLETE') {
                                return '<span class="tx-12">' + row.csh_saveby + '</span>' +
                                    '<br>' +
                                    '<span class="tx-12">' + moment(row.csh_dateby).format("DD/MM/YYYY HH:mm:ss") + '</span>';
                            } else {
                                '-'
                            }
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>อนุมัติ</span>",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            if (row.confirm_status == 'PROCESS') {
                                return '-'
                            } else if (row.confirm_status == 'APPROVAL') {
                                return '-'
                            } else if (row.confirm_status == 'COMPLETE') {
                                return '<span class="tx-12">' + row.acc_saveby + '</span>' +
                                    '<br>' +
                                    '<span class="tx-12">' + moment(row.acc_dateby).format("DD/MM/YYYY HH:mm:ss") + '</span>';
                            } else {
                                '-'
                            }
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>สถานะ</span>",
                        data: "confirm_status",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            let status
                            if (data == 'PROCESS') {
                                status = '<span class="tx-primary">' + 'PROCESS' + '</span>'
                            } else if (data == 'APPROVAL') {
                                status = '<span class="tx-warning">' + 'APPROVAL' + '</span>'
                            } else if (data == 'COMPLETE') {
                                status = '<span class="tx-success">' + 'COMPLETE' + '</span>'
                            } else {
                                status = '<span class="tx-danger">' + '' + '</span>'
                            }
                            return status;
                            //return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //

                ],
                "initComplete": function (settings, json) {

                    $("#global-loader").fadeOut("slow");

                    //$.contextMenu({
                    //    selector: '#table-list tbody tr',
                    //    callback: async function (key, options) {

                    //        let citem = table_list.row(this).data();

                    //        if (key === 'view') {

                    //            //await $.Slip_Detail(citem);

                    //        } else if (key === 'edit') {

                    //            //await $.Slip_Update(citem);

                    //        } else if (key === 'delete') {

                    //            //await $.Slip_Delete(citem);

                    //        } else {

                    //            alert('ERROR');

                    //        }
                    //    },
                    //    items: {
                    //        "view": { name: "View", icon: "fas fa-search" },
                    //        "edit": { name: "Edit", icon: "edit" },
                    //        "delete": { name: "Delete", icon: "delete" },
                    //    }
                    //});

                },
            });

        }
    })

};

$.Master_Get = async function () {

    let url_Master = new URL(url_master_get);

    url_Master.search = new URLSearchParams({
        mode: 'cashier_user',
    });
    fetch(url_Master).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            let Master_dataSet = [];

            //$("#search_employee option").remove();
            //$("#search_employee").append("<option value='' selected>--SELECT ALL--</option>").attr("value", '')

            $.each(result.data, function (key, val) {

                Master_dataSet.push({ id: val['id'], text: val['text'] });

            });

            $('#frm_search').find('#cashier_user').select2({
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

        }

    });

}