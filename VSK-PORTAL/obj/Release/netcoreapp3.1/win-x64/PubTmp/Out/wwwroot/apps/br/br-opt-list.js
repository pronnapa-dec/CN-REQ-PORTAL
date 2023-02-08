'use strict';

let fs = firebase.firestore();
let oTable, history_Table, role_code, mode;
let inventorycode_dataset = [];
let invfrecode_dataset = [];

let chk_br_Table;
let invname_dataSet = [];
let invname_dataSet_list = [];
let job_comment_dataSet = [];
const url_api = "http://localhost:49705/";
//const url_api = "http://192.168.1.247/intranet/br-api";
const url_brtra_get = url_api + '/api/Br_Brtra_Get';
const url_brtra_history = url_api + '/api/Br_Brtra_History';
const url_brtra_lov = url_api + '/api/Br_Brtra_Lov';

const objProfile = JSON.parse(localStorage.getItem('objProfile'));
let validator, table, options, item_action, item_id, deatailCondition;
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

$.init = function () {

    $.LoadingOverlay("show", {
        image: '',
        custom: customElement
    });

    //var d = new Date();
    var Yesterday  = moment().add(-1, 'days').format('DD/MM/YYYY');
    var Tomorrow  = moment().add(1, 'days').format('DD/MM/YYYY');

    $('#br_chk_date').html(Yesterday + ' - ' + Tomorrow )

    $.Load_comment();

    $.Chk_br();
    
    $('.fc-datepicker').datepicker({
        dateFormat: 'dd/mm/yy',
        autoclose: true,
    });

    $('.date-picker').daterangepicker({
        autoUpdateInput: false,
        showDropdowns: true,
        opens: "right",
        locale: { cancelLabel: 'Clear' },
    }, function (start, end, label) {
        //console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });

    $('.date-picker').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('DD/MM/YYYY') + '-' + picker.endDate.format('DD/MM/YYYY'));
    });

    $('#frm_search').submit(async function (e) {

        e.preventDefault();

        oTable.destroy();

        $.List();

    });


    $('#modal-frm_history').on('hidden.bs.modal', function () {

        history_Table.destroy();
    });


};

$.List = async function () {

    $.Load_comment();

    let url = new URL(url_brtra_get);
    var trndate_start;
    var trndate_end;

    trndate_start = $('#job_date').val() != '' ? moment($('#job_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment('1991-01-01').format('YYYY-MM-DD') + ' 00:00';  //ถ้าไม่เลือกจะเป็นค่าว่าง
    trndate_end = $('#job_date').val() != '' ? moment($('#job_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';

    url.search = new URLSearchParams({
        action_type: 'get_vsm_br_job',
        trndate_start: trndate_start,
        trndate_end: trndate_end,
        job_no: $('#frm_search').find('#job_no').val() === '' ? '' : $('#frm_search').find('#job_no').val(),
        created_by: $('#frm_search').find('#created_by').val() === '' ? '' : $('#frm_search').find('#created_by').val(),
        invname: $('#frm_search').find('#invname').val() === '' ? '' : $('#frm_search').find('#invname').val(),
        status_qty: $('#frm_search').find('#status_qty').val() === '' ? '' : $('#frm_search').find('#status_qty').val(),

    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }).then((result) => {
                if (result.isConfirmed) {

                    location.reload();

                }
            })

            $.LoadingOverlay("hide");

        } else {
          
            oTable = $('#tbl-list').DataTable({
                data: result.data,
                "bDestroy": true,
                dom: 'iBfrtp',
                buttons: [
                    'copy', 'excel'
                ],
                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 rows', '25 rows', '50 rows', 'Show all']
                ],
                columns: [
                    {
                        title: "<span style='font-size:11px;'>วันที่ BR</span>",
                        data: "bl_job_date",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '<span/>';
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>เลขที่ BR</span>",
                        data: "bl_job_no",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            // return '<div data-placement="top" data-toggle="tooltip-primary">' + '<a href="http://localhost:57916/br/br_job?brtra_number=' + data + '" target="_blank"><b>' + data + '<b></a></div>'
                            return '<div data-placement="top" data-toggle="tooltip-primary">' + '<a href="http://192.168.1.247/intranet/br-api?brtra_number=' + data + '" target="_blank"><b>' + data + '<b></a></div>'

                        }
                    }, //1
                    {
                        title: "<span style='font-size:11px;'>สาขา</span>",
                        data: "bl_invname",
                        width: "300px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>จำนวนปัจจุบัน</span>",
                        data: "bl_job_detail_qty",
                        class: "tx-center",
                        width: "70px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;  color:OrangeRed;">' + data + '</span>';
                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>จำนวนย่อย</span>",
                        data: "bl_job_qty",
                        class: "tx-center",
                        width: "70px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;  color:Blue;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>จำนวนหลัก</span>",
                        data: "bl_job_detail_oldqty",
                        class: "tx-center",
                        width: "70px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;  color:DarkGreen;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>สถานะ</span>",
                        data: "bl_status_qty",
                        class: "tx-center job_status",
                        width: "50px",
                        render: function (data, type, row, meta) {
                            if (data == 'success') {
                                return '<span class="badge badge-primary">สำเร็จ</span >'
                            } else if (data == 'pending') {
                                return '<span class="badge badge-danger">ไม่สำเร็จ</span >'

                            }
                        }
                    }, //5
                    {
                        title: "<span style='font-size:11px;'>บันทึกโดย</span>",
                        data: "bl_created_by",
                        class: "tx-center",
                        width: "100px",
                        // visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //6
                    {
                        title: "<span style='font-size:11px;'>เวลาที่สร้าง</span>",
                        data: "bl_created_date",
                        class: "tx-center",
                        width: "100px",
                        // visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY hh:mm:ss') + '</span>';
                        }
                    }, //7
                    {
                        title: "<span style='font-size:11px;'>เวลาที่สิ้นสุด</span>",
                        data: "bl_time_final",
                        class: "tx-center",
                        width: "100px",
                        // visible: false,
                        render: function (data, type, row, meta) {

                            return '<span style="font-size:11px;">' + data + '</span>';

                        }
                    }, //8
                    {
                        title: "<span style='font-size:11px;'>ใช้เวลา/นาที</span>",
                        data: "diff_time_final",
                        class: "tx-center",
                        width: "100px",
                        // visible: false,
                        render: function (data, type, row, meta) {
                            if (data == 9876) {
                                return '-'
                            } else {
                                return '<span style="font-size:11px; color:Green;" >' + data + ' นาที' + '</span>';
                            }
                        }
                    }, //9
                ],
                "order": [[1, "desc"]],
                "initComplete": function (settings, json) {

                    $.contextMenu({
                        selector: '#tbl-list tbody tr',
                        callback: async function (key, options) {

                            let data = oTable.row(this).data();
                            let citem = {
                                job_date: data['bl_job_date'],
                                job_no: data['bl_job_no'],
                                invname: data['bl_invname'],
                                job_qty: data['bl_job_qty'],
                                job_detail_qty: data['bl_job_detail_qty'],
                                created_by: data['bl_created_by'],
                                record_status: data['bl_record_status'],
                                bl_time_final: data['bl_time_final'],
                            };

                            $('#modal-frm_data').modal({

                                keyboard: false,
                                backdrop: 'static'

                            });

                            if (key === 'history') {

                                $.History(citem);

                            } else {

                                alert('ERROR');

                            }

                        },
                        items: {

                            "history": { name: "History", icon: "fas fa-history" },

                        }
                    });

                },
                
            });

            $.LoadingOverlay("hide");
        }
    })

};

$.History = async function (citem) {

    let url_history = new URL(url_brtra_history);

    //let add_qty = val['job_detail_qty'];
    //let cost_qty = val['trnqty'];
    let job_detail_qty = citem['job_detail_qty'];
    let job_qty = citem['job_qty'];
    let sum_qty_item = (job_qty - job_detail_qty);


    $('#modal-frm_data').modal('hide');
    $('#no_br').html(citem['job_no'])

    $('#sum_qty_current').html(citem['job_detail_qty']).css("color", "#F39C12");
    $('#sum_qty_total').html(citem['job_qty']).css("color", "#138D75");
    //alert(citem['record_status']);
    $('#sum_qty_item').html(sum_qty_item).css("color", "#8A0006");

    url_history.search = new URLSearchParams({
        br_job_no: citem['job_no'],
        record_status: '1',
    });

    fetch(url_history).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                //footer: '<a href>Why do I have this issue?</a>'
            }).then((result) => {
                if (result.isConfirmed) {

                    location.reload();

                }
            })


        } else {

            $('#modal-frm_history').modal('show');

            $('#tbl-list-history').css({ "width": "100%" });

            history_Table = $('#tbl-list-history').DataTable({
                data: result.data,
                scrollY: "450px",
                scrollX: false,
                scrollCollapse: true,
                autoWidth: true,
                paging: false,
                dom: 'iBfrtp',
                colReorder: true,
                buttons: [
                    'copy', 'excel'
                ],
                columns: [
                    {
                        title: "<span style='font-size:11px;'>เลขที่ BR</span>",
                        data: "br_job_no",
                        //width: "70px",
                        visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span">' + data + '</span>';
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>ชื่อสินค้า</span>",
                        data: "stkname",
                        //width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span">' + data + '</span>';
                        }
                    }, //1
                     {
                        title: "<span style='font-size:11px;'>บาร์โค้ด</span>",
                        data: "gbarcode",
                        width: "100px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span">' + data + '</span>';
                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>เลขอะไหล่</span>",
                        data: "spcodes",
                        width: "100px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span">' + data + '</span>';
                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>จำนวนปัจจุบัน</span>",
                        data: "job_detail_qty",
                        width: "80px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data == row.trnqty) {
                                return '<span style="font-size:11px;  color:DarkGreen;">' + data + '</span>'
                            } else if (data < row.trnqty) {
                                return '<span style="font-size:11px;  color:Orange;">' + data + '</span>'
                            } else if (data == '0') {
                                return '<span style="font-size:11px;  color:Red;">' + data + '</span>'
                            }
                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>จำนวนทั้งหมด</span>",
                        data: "trnqty",
                        width: "80px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;  color:#002259;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>หน่วย</span>",
                        data: "stkunit",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span">' + data + '</span>';
                        }
                    }, //5

                ],


            });

            $.LoadingOverlay("hide");
        }
    })
};

$.Load_comment = function () {
    let Get_comment = new URL(url_brtra_lov);

    Get_comment.search = new URLSearchParams({
        lov_code: 'BR_USER',
    });

    fetch(Get_comment).then(function (response) {
        return response.json();
    }).then(function (result) {
        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                //footer: '<a href>Why do I have this issue?</a>'
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            })
        } else {

            $.each(result.data, function (key, val) {
                job_comment_dataSet.push({ id: val['lov2'], text: val['lov2'] });

            });

            $('.created_by').select2({
                width: '100%',
                height: '40px',
                data: job_comment_dataSet,
                templateResult: function (data) {
                    return data.text;
                },
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    });
                }
            });

            $.LoadingOverlay("hide");
        }

    });

}

$.Chk_br = async function (citem) {

    let url_chk_br = new URL(url_brtra_get);

    //trndate_start = $('#job_date').val() != '' ? moment($('#job_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment('1991-01-01').format('YYYY-MM-DD') + ' 00:00';
    //trndate_end = $('#job_date').val() != '' ? moment($('#job_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';

    url_chk_br.search = new URLSearchParams({

        action_type: 'chk_br_job',
        trndate_start: '1991-01-01 00:00',
        trndate_end: moment().format('YYYY-MM-DD') + ' 23:59',
    });

    fetch(url_chk_br).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                //footer: '<a href>Why do I have this issue?</a>'
            }).then((result) => {
                if (result.isConfirmed) {

                    location.reload();

                }
            })


        } else {

            $('#tbl-list-chk').css({ "height": "70px" });

            chk_br_Table = $('#tbl-list-chk').DataTable({
                data: result.data,
                scrollY: '20vh',
                scrollX: false,
                scrollCollapse: true,
                autoWidth: true,
                paging: false,
                colReorder: true,
                "ordering": false,
                columns: [
                    {
                        title: "<span style='font-size:11px;'>วันที่ BR</span>",
                        data: "brfile_invdate",
                        //width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '</span>';
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>เลขที่ BR VSM</span>",
                        data: "brfile_number",
                        //width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //1
                    {
                        title: "<span style='font-size:11px;'>เลขที่ BR KLH</span>",
                        data: "br_job_no",
                        width: "100px",
                        visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data == null) {
                                return '<span style="font-size:11px;">' + ' ' + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>สถานะ</span>",
                        data: "status_chk_br",
                        width: "100px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {

                            if (data == 1) {
                                return '<span class="tx-primary">' + '<i class="fas fa-check"></i>' + '</span>';
                            } else {
                                return '<span class="text-danger">' + '<i class="fas fa-times"></i>' + '</span>';
                            }
                        }
                    }, //2

                ],


            });

            $.LoadingOverlay("hide");

        }
    })
};

$(document).ready(async function () {

    await $.init();
    await $.List();
    //$.LoadingOverlay("show");
});

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
        var full_mail = user.email;
        name = full_mail.replace("@vskautoparts.com", "");

        //console.log('user', user.email);

    } else {

        window.location.assign('./login');

    }

});