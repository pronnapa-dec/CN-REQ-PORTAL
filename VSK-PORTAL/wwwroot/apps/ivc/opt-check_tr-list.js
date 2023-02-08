'use strict';

let fs = firebase.firestore();
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const user_id = objProfile[0]['username'];
const url_api = "http://localhost:49705";
const url_job = "http://localhost:57916";
//const url_api = "http://192.168.1.247:8089";

const url_check_tr_list = url_api + '/api/Check_Tr_List';
const url_check_tr_view = url_api + '/api/Check_Tr_View';
const url_master_data_get = url_api + "/api/MasterData_Get";

const url_check_tr_remark_list = url_api + '/api/Check_Tr_Remark_List';
const url_check_tr_remark_create = url_api + '/api/Check_Tr_Remark_Create';
const url_check_tr_remark_delete = url_api + '/api/Check_Tr_Remark_Delete';

let table_list, table_view, table_remark;
var name;
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

    $(".tablekk-responsive").LoadingOverlay("show", {
        image: '',
        custom: customElement
    });

    await $.init();
    await $.List();
    await $.Master_Get('USER_TR_SCAN');

});

$.init = function () {

    $('#tr_status').select2();

    $('.date-rangepicker').daterangepicker({
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


    $('#btn-item_create').off('click').on('click', async function (evt) {

        evt.preventDefault();

        let url = url_job + "/ivc/opt/tr_check_job";

        console.log(url)

        window.open(url, '_blank');

    });

    $('#btn-report_check_tr').off('click').on('click', async function (evt) {

        evt.preventDefault();

        let url_report = "http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_CHECK_TR_DETAIL&rs:Command=Render"

        console.log(url_report)

        window.open(url_report, '_blank');

    });

    $('#modal-frm_remark').off('hidden.bs.modal').on('hidden.bs.modal', async function () {

        await setTimeout(function () {

            $('#frm_remark').find('input').val('')
            $('#frm_remark').find('textarea').val('')
            $('#frm_remark').find('select').trigger('change').val('')
            $('#frm_remark').find('#remark_tr_qty').val('1')
            $("#frm_remark").parsley().reset();

        }, 100);

    });

    $('.btn-action').off('click').on('click', async function (evt) {

        evt.preventDefault();

        let action_id = evt.target.id

        if (action_id == 'bth-save_remark') {

            $('#frm_remark').parsley().validate();

            if ($('#frm_remark').parsley().isValid()) {

                await $.Remark_Create();

            }

        } else if (action_id == 'bth-delete_remark') {

            await $.Remark_Delete();

        }

    });

    $('#frm_search').submit(async function (e) {

        e.preventDefault();

        await $(".tablekk-responsive").LoadingOverlay("show", {
            image: '',
            custom: customElement
        });

        await $.List();

    });

};

$.List = async function () {

    let url = new URL(url_check_tr_list);

    var trndate_start;
    var trndate_end;

    trndate_start = $('#job_date').val() != '' ? moment($('#job_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment().add(-1, 'days').format('YYYY-MM-DD') + ' 00:00'; // moment('1991-01-01').format('YYYY-MM-DD') + ' 00:00';  //ถ้าไม่เลือกจะเป็นค่าว่าง
    trndate_end = $('#job_date').val() != '' ? moment($('#job_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';

    if ($('#frm_search').find('#tr_number').val() != '') {
        trndate_start = '1990-01-01'
        trndate_end = moment().format('YYYY-MM-DD')
    }

    url.search = new URLSearchParams({

        trndate_start: trndate_start,
        trndate_end: trndate_end,
        tr_number: $('#frm_search').find('#tr_number').val() === '' ? '' : $('#frm_search').find('#tr_number').val(),
        created_by: $('#frm_search').find('#tr_user').val() === '' ? '' : $('#frm_search').find('#tr_user').val(),
        tr_status: $('#frm_search').find('#tr_status').val() === '' ? '' : $('#frm_search').find('#tr_status').val(),

    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            $(".tablekk-responsive").LoadingOverlay("hide", true);

            swal({
                title: "ขออภัย",
                text: "เกิดข้อผิดพลาด",
                type: 'error',
                timer: 2000,
                showConfirmButton: false
            });

        } else {

            table_list = $('#table-list').DataTable({
                data: result.data,
                dom: '<Bf<t>lip>', //'Bfrtlip',//'Bfrltip', //dom: 'Bfrtip',
                deferRender: true,
                "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                //ordering: true,
                pageLength: 10,
                bDestroy: true,
                autoWidth: true,
                buttons: [
                    'copyHtml5',
                    {
                        extend: 'excelHtml5',
                        title: '',
                        filename: 'TR_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                        exportOptions: {
                            columns: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12,13]
                        }
                    },
                ],
                columns: [
                    {
                        title: "<span class='tx-12'>#</span>",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + (meta.row + 1) + '</span>';
                        }
                    },
                    {
                        title: "<span class='tx-12'>temp_id</span>",
                        data: "tr_detail_id",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    },
                    {
                        title: "<span class='tx-12'>วันที่เอกสาร</span>",
                        data: "tr_date",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '<span/>';
                        }
                    },
                    {
                        title: "<span class='tx-12'>เลขที่เอกสาร</span>",
                        data: "tr_number",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            let url = url_job + "/ivc/opt/tr_check_job?tr_number=" + data + ""
                            return '<div data-placement="top" data-toggle="tooltip-primary">' + '<a href="' + url + '" target="_blank"><b>' + '<span style="font-size:11px;" class="tx-bold">' + data + '</span>' + '</div>'
                        }
                    },
                    {
                        title: "<span class='tx-12'>คลัง</span>",
                        data: "tr_detail_empcod",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    },
                    {
                        title: "<span class='tx-12'>สินค้า</span>",
                        data: "tr_qty",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    },
                    {
                        title: "<span class='tx-12'>ตรวจสอบ</span>",
                        data: "tr_detail_qty",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    },
                    {
                        title: "<span class='tx-12'>ขาด</span>",
                        data: "tr_detail_qty_remark",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    },
                    {
                        title: "<span class='tx-12'>ทั้งหมด</span>",
                        data: "tr_detail_trnqty",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    },
                    {
                        title: "<span class='tx-12'>สถานะ</span>",
                        data: "tr_status",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            let status
                            if (data == 'SUCCESS') {
                                status = '<span class="badge badge-success">' + 'SUCCESS' + '</span>'
                            } else if (data == 'PENDING') {
                                status = '<span class="badge badge-warning">' + 'PENDING' + '</span>'
                            } else {
                                status = '<span class="badge badge-danger">' + 'ERROR' + '</span>'
                            }
                            return status;
                        }
                    },
                    {
                        title: "<span class='tx-12'>บันทึกโดย</span>",
                        data: "created_by",
                        class: "tx-center  align-middle",
                        width: "100px",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    },
                    {
                        title: "<span class='tx-12'>เวลาที่สร้าง</span>",
                        data: "created_datetime",
                        width: "70px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + moment(data).format('DD/MM/YYYY HH:mm') + '<span/>';
                        }
                    }, //1 
                    {
                        title: "<span class='tx-12'>แก้ไขโดย</span>",
                        data: "updated_by",
                        class: "tx-center  align-middle",
                        width: "100px",
                        render: function (data, type, row, meta) {
                            if (data == null) {
                                return ''
                            } else {
                                return '<span class="tx-12">' + data + '</span>';
                            }
                        }
                    },
                    {
                        title: "<span class='tx-12'>เวลาที่แก้ไข</span>",
                        data: "updated_datetime",
                        width: "70px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data == null || data == '0001-01-01T00:00:00') {
                                return ''
                            } else {
                                return '<span class="tx-12">' + moment(data).format('DD/MM/YYYY HH:mm') + '<span/>';
                            }
                        }
                    },
                ],
                rowCallback: function (row, data) {

                },
                initComplete: function (settings, json) {

                    $(".tablekk-responsive").LoadingOverlay("hide", true);

                    $.contextMenu({
                        selector: '#table-list tbody tr',
                        callback: async function (key, options) {

                            let citem = table_list.row(this).data();

                            if (key === 'Viwe') {

                                await $('#modal-frm_job').modal({
                                    keyboard: false,
                                    backdrop: 'static'
                                });

                                await $.View(citem);

                            } else {

                                alert('ERROR');

                            }
                        },
                        items: {
                            "Viwe": { name: "Viwe", icon: "fas fa-search" },
                        }
                    });


                },

            });

        }
    })

};

$.View = async function (citem) {

    let url = new URL(url_check_tr_view);

    url.search = new URLSearchParams({
        tr_number: citem['tr_number'],
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            table_view = $('#table_view').DataTable({
                data: result.data,
                dom: 'Bfrtip',
                deferRender: true,
                bDestroy: true,
                autoWidth: false,
                scrollY: '40vh',
                scrollCollapse: true,
                paging: false,
                buttons: [
                    'copyHtml5',
                    {
                        extend: 'excelHtml5',
                        title: '',
                        filename: 'SCAN_TR_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                        exportOptions: {
                            columns: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                        }
                    },
                ],
                columns: [
                    {
                        title: "<span class='tx-12'>#</span>",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + (meta.row + 1) + '</span>';
                        }
                    },
                    {
                        title: "<span class='tx-12'>temp_id</span>",
                        data: "tr_detail_id",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    },
                    {
                        title: "<span class='tx-12'>สถานที่</span>",
                        data: "tr_detail_location",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    },
                    {
                        title: "<span class='tx-12'>ชื่อสินค้า</span>",
                        data: "tr_detail_stkname",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12 tx-left mg-l-2 ">' + data + '</span>';
                        }
                    },
                    {
                        title: "<span class='tx-12'>บาร์โค้ด</span>",
                        data: "tr_detail_gbarcode",
                        class: "tx-center align-middle tr_gbarcode",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    },
                    {
                        title: "<span class='tx-12'>เลขอะไหล่</span>",
                        data: "tr_detail_spcodes",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    },
                    {
                        title: "<span class='tx-12'>ตรวจสอบ</span>",
                        data: "tr_detail_qty",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    },
                    {
                        title: "<span class='tx-12'>ขาด</span>",
                        data: "tr_detail_qty_remark",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    },
                    {
                        title: "<span class='tx-12'>ทั้งหมด</span>",
                        data: "tr_detail_trnqty",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    },
                    {
                        title: "<span class='tx-12'>หน่วยนับ</span>",
                        data: "tr_detail_stkunit",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    },
                    {
                        title: "<span class='tx-12'>สาเหตุ</span>",
                        data: "tr_detail_remark",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            let v_date = data == null ? '' : data
                            return '<span class="tx-12">' + v_date + '</span>';
                        }
                    },
                ],
                rowCallback: function (row, data) {

                    if ((data.tr_detail_qty + data.tr_detail_qty_remark) == 0) {
                        $('td:eq(5)', row).addClass('tx-danger');
                        $('td:eq(1)', row).parent().addClass('bg-danger-transparent');
                    } else if ((data.tr_detail_qty + data.tr_detail_qty_remark) < data.tr_detail_trnqty) {
                        //$('td:eq(5)', row).addClass('tx-orange');
                        $('td:eq(1)', row).parent().addClass('bg-warning-transparent');
                    } else if ((data.tr_detail_qty + data.tr_detail_qty_remark) == data.tr_detail_trnqty) {
                        //$('td:eq(5)', row).addClass('tx-success');
                        $('td:eq(1)', row).parent().addClass('bg-success-transparent');
                    } else {
                        ''
                    }

                },
                initComplete: function (settings, json) {

                    //$.contextMenu({
                    //    selector: '#table_view tbody tr',
                    //    callback: async function (key, options) {

                    //        let citem = table_view.row(this).data();

                    //        if (key === 'Remark') {
                    //            let mode;
                    //            if (citem['tr_detail_qty'] == citem['tr_detail_trnqty']) {
                    //                mode = 'scan'
                    //                toastr.warning('สินค้าครบแล้ว')
                    //            } else if (citem['tr_detail_qty'] + citem['tr_detail_qty_remark'] == citem['tr_detail_trnqty'] && citem['tr_detail_qty_remark'] > 0) {
                    //                mode = 'scan_remark'
                    //                await $.Remark_Detail(mode, citem);
                    //                await $.Remark_List(citem);
                    //            } else {
                    //                mode = ''
                    //                await $.Remark_Detail(mode, citem);
                    //                await $.Remark_List(citem);
                    //            }
                    //        } else {
                    //            alert('ERROR');
                    //        }
                    //    },
                    //    items: {
                    //        //"Remark": { name: "Remark", icon: "fas fa-edit" }
                    //    }
                    //});

                    let i = 0;
                    let item_current = 0;
                    let item_balance = 0;
                    let item_cn = 0;

                    $.each(result.data, function (key, val) {

                        let add_qty = val['tr_detail_qty'];
                        let cost_qty = val['tr_detail_trnqty'];
                        let cn_qty = val['tr_detail_qty_remark'];

                        item_current += parseFloat(add_qty)
                        item_balance += parseFloat(cost_qty)
                        item_cn += parseFloat(cn_qty)

                        i++
                    });

                    const maxDate = new Date(
                        Math.max(
                            ...result.data.map(element => {
                                return new Date(element.updated_datetime);
                            }),
                        ),
                    );

                    $('#frm_job').find('#tr_number').val(result.data[0]['tr_detail_no']);
                    $('#frm_job').find('#tr_wh').val(result.data[0]['tr_detail_empcod']);
                    $('#frm_job').find('#tr_date').val(moment(result.data[0]['tr_detail_trndate']).format('DD/MM/YYYY'));
                    $('#frm_job').find('#tr_created_by').val(user_id);
                    //$('.time-today').html('ตรวจสอบล่าสุด : ' + moment(maxDate).format('DD/MM/YYYY hh:mm:ss a'));
                    $('.item_total').html(i + ' / ' + item_balance);
                    $('.item_current').html(item_current);
                    $('.item_balance').html(item_balance - (item_current + item_cn));
                    $('.item_cn').html(item_cn);

                },
            });

        }

    });

    return false;

};

$.Remark_Detail = async function (mode, citem) {

    await $('#modal-frm_remark').modal({
        keyboard: false,
        backdrop: 'static'
    });

    console.log('Remark_Detail', citem)

    if (mode == 'scan_remark') {

        $("#remark_tr_qty").prop('disabled', true);
        $("#remark_cause").prop('disabled', true);
        $('#bth-save_remark').addClass('d-none');
        $('#bth-delete_remark').removeClass('d-none');

        $("#remark_cause").val(citem['tr_detail_remark'])
        $("#remark_tr_qty").val(citem['tr_detail_qty_remark'])
    }
    else {
        $("#remark_tr_qty").prop('disabled', false);
        $("#remark_cause").prop('disabled', false);
        $('#bth-save_remark').removeClass('d-none');
        $('#bth-delete_remark').addClass('d-none');
    }

    $('#remark_tr_number').val(citem['tr_detail_no'])
    $('#remark_tr_item').val(citem['tr_detail_stkcode'] + ' : ' + citem['tr_detail_stkname'])
    $('#remark_tr_barcode').val(citem['tr_detail_gbarcode'])

    let tr_detail_qty = citem['tr_detail_qty']
    let tr_detail_trnqty = citem['tr_detail_trnqty']
    let tr_detail_qty_remark = citem['tr_detail_qty_remark']
    let max_qty = (tr_detail_trnqty - tr_detail_qty)

    $("#remark_tr_qty").attr({
        "max": max_qty
    });

    return false;

};

$.Remark_List = async function (citem) {

    let url = new URL(url_check_tr_remark_list);

    url.search = new URLSearchParams({
        tr_number: citem['tr_detail_no'],
        tr_remark_gbarcode: citem['tr_detail_gbarcode'],
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            table_remark = $('#table_remark').DataTable({
                data: result.data,
                dom: 'frtip',
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "ค้นหา..."
                },
                deferRender: true,
                ordering: true,
                scrollY: '50vh',
                scrollCollapse: true,
                paging: false,
                bDestroy: true,
                autoWidth: false,
                columns: [
                    {
                        title: "<span class='tx-12'>#</span>",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + (meta.row + 1) + '</span>';
                        }
                    }, //0
                    {
                        title: "<span class='tx-12'>สาเหตุ</span>",
                        data: "tr_remark_detail",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //1
                    {
                        title: "<span class='tx-12'>จำนวน</span>",
                        data: "tr_remark_qty",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //2
                    {
                        title: "<span class='tx-12'>ผู้บันทึก</span>",
                        data: "created_by",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //11
                    {
                        title: "<span class='tx-12'>เวลาบันทึก</span>",
                        data: "created_datetime",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + moment(data, 'YYYY/MM/DD hh:mm:ss').format('DD/MM/YYYY hh:mm:ss') + '</span>';
                        }
                    }, //12
                    {
                        title: "<span class='tx-12'>สถานะ</span>",
                        data: "record_status",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            let status
                            if (data == 1) {
                                status = '<span class="tx-12 tx-success">' + '<i class="las la-check"></i>' + '</span>';
                            } else {
                                status = '<span class="tx-12 tx-danger">' + '<i class="las la-times"></i>' + '</span>';
                            }

                            return status;
                        }
                    }, //12
                ],
                "initComplete": function (settings, json) {


                },
            });

        }

    });

    return false;

};

$.Remark_Create = async function () {

    let add_data = {
        tr_number: $('#remark_tr_number').val(),
        tr_scan: $('#remark_tr_barcode').val(),
        r_remark: $('#frm_remark').find('#remark_cause').val() == 'อื่นๆ' ? $('#frm_remark').find('#remark_more').val() : $('#frm_remark').find('#remark_cause').val(),
        r_qty: $('#remark_tr_qty').val(),
        created_by: user_id,
    };

    var params = [];
    for (const i in add_data) {
        params.push(i + "=" + encodeURIComponent(add_data[i]));
    }

    fetch(url_check_tr_remark_create, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params.join("&"),
    }).then(result => {
        return result.json();
    }).then(result => {

        if (result.status === 'Error') {

            $.LoadingOverlay("hide", true);

            toastr.error('Oops! An Error Occurred');

        } else {

            toastr.success('บันทึกสำเร็จ')

            $.List(result)
            $.View(result)

            $('#modal-frm_remark').modal('hide');


        }

    });

};

$.Remark_Delete = async function () {

    let add_data = {
        tr_number: $('#remark_tr_number').val(),
        tr_scan: $('#remark_tr_barcode').val(),
        created_by: user_id,
    };

    var params = [];
    for (const i in add_data) {
        params.push(i + "=" + encodeURIComponent(add_data[i]));
    }

    fetch(url_check_tr_remark_delete, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params.join("&"),
    }).then(data => {
        return data.json();
    }).then(result => {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            if (result.data[0]['tr_detail_qty_remark'] > 0) {

                toastr.error('ลบไม่สำเร็จ');

            } else {

                toastr.warning('ลบสำเร็จ');
                $.List(result)
                $('#modal-frm_remark').modal('hide');
            }
        }

    }).catch(error => {

        toastr.error('Error, Please contact administrator.');

    });

};

$.Master_Get = async function (mode) {

    if (mode == 'USER_TR_SCAN') {

        let url_master = new URL(url_master_data_get);

        url_master.search = new URLSearchParams({
            mode: mode,
        });

        fetch(url_master).then(function (response) {
            return response.json();
        }).then(function (result) {

            if (result.status === 'Error') {

                toastr.error('Oops! An Error Occurred');

            } else {

                let Master_dataSet = [];

                $.each(result.data, function (key, val) {

                    Master_dataSet.push({ id: val['id'], text: val['text'] });

                });

                $('.user_scan').select2({
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
}