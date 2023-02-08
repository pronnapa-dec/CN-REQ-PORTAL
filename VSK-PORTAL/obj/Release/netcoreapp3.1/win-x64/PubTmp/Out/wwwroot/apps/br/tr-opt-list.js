'use strict';

let fs = firebase.firestore();
let oTable, hTable, role_code;
let job_comment_dataSet = [];
let item_dataSet = [];
const url_api = "http://localhost:49705/";
//const url_api = "http://192.168.1.247/intranet/br-api";

const url_tr_get = url_api + '/api/Tr_Get';
const url_tr_history = url_api + '/api/Tr_History';
const url_tr_item = url_api + '/api/Tr_Item';
const url_brtra_lov = url_api + '/api/Br_Brtra_Lov';
const url_tr_remark = url_api + '/api/Tr_Remark';

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

        $.LoadingOverlay("show", {
            image: '',
            custom: customElement
        });

        await oTable.destroy();

        await $.List();

    });

    $('#r_remark').append(
        '<option value="ผิดคลัง">ผิดคลัง</option>' +
        '<option value="จัดให้สาขา">จัดให้สาขา</option>' +
        '<option value="ติดจอง">ติดจอง</option>' +
        '<option value="อื่นๆ">อื่นๆ</option>'
    );

    $('#modal-frm_history').on('hidden.bs.modal', async function () {


        $('#frm_history').find('input').val('').prop('disabled', false);
        $('#frm_history').find('select').val('').trigger('change.select2').prop('disabled', false);
        $("#frm_history").parsley().reset();
        $.LoadingOverlay("hide");

        await hTable.destroy();
        await oTable.destroy();
        await $.List();
    });

    $.User_Checker();
};

$.List = async function () {

    let url = new URL(url_tr_get);
    var trndate_start;
    var trndate_end;

    trndate_start = $('#job_date').val() != '' ? moment($('#job_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment().add(-1, 'days').format('YYYY-MM-DD') + ' 00:00'; //moment('1991-01-01').format('YYYY-MM-DD') + ' 00:00';  //ถ้าไม่เลือกจะเป็นค่าว่าง
    trndate_end = $('#job_date').val() != '' ? moment($('#job_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';

    url.search = new URLSearchParams({

        trndate_start: trndate_start,
        trndate_end: trndate_end,
        tranfer_number: $('#frm_search').find('#job_no').val() === '' ? '' : $('#frm_search').find('#job_no').val(),
        created_by: $('#frm_search').find('#created_by').val() === '' ? '' : $('#frm_search').find('#created_by').val(),
        tr_status_qty: $('#frm_search').find('#status_qty').val() === '' ? '' : $('#frm_search').find('#status_qty').val(),

    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'ไม่สามารถเรียกข้อมูลรายการได้',
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            })

        } else {

            $.LoadingOverlay("hide");

            oTable = $('#tbl-list').DataTable({

                data: result.data,
                scrollY: "450px",
                scrollX: false,
                scrollCollapse: true,
                autoWidth: true,
                colReorder: true,

                columns: [
                    {
                        title: "<span style='font-size:11px;'>วันที่ TR</span>",
                        data: "tr_date",
                        width: "70px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '<span/>';
                        }
                    }, //0 
                    {
                        title: "<span style='font-size:11px;'>เลขที่ TR</span>",
                        data: "tr_no",
                        width: "70px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<div data-placement="top" data-toggle="tooltip-primary">' + '<a href="http://localhost:57916/tr/tr_job?tranfer_number=' + data + '" target="_blank"><b>' + data + '<b></a></div>'

                        }
                    }, //1
                    {
                        title: "<span style='font-size:11px;'>จำนวนรายการ</span>",
                        data: "tr_count_suk",
                        class: "tx-center",
                        width: "70px",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;  color:;">' + data + '</span>';
                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>จำนวนตรวจสอบ</span>",
                        data: "tr_sum_qty",
                        class: "tx-center",
                        width: "70px",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;  color:#5300BE;">' + data + '</span>';
                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>จำนวนหมายเหตุ</span>",
                        data: "tr_remark_qty",
                        class: "tx-center",
                        width: "70px",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;  color:black;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>จำนวนปัจจุบัน</span>",
                        data: "qty",
                        class: "tx-center",
                        width: "70px",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;  color:OrangeRed;">' + data + '</span>';
                        }
                    }, //5
                    {
                        title: "<span style='font-size:11px;'>จำนวนทั้งหมด</span>",
                        data: "tr_qty",
                        class: "tx-center",
                        width: "70px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;  color:DarkGreen;">' + data + '</span>';
                        }
                    }, //6
                    {
                        title: "<span style='font-size:11px;'>สถานะ</span>",
                        data: "tr_status_qty",
                        class: "tx-center job_status",
                        width: "50px",
                        render: function (data, type, row, meta) {
                            if (data == 'success') {
                                return '<span class="label text-success">' + '<div class="dot-label bg-success mr-1"></div>' + 'สำเร็จ' + '</span >'
                            } else if (data == 'pending') {
                                return '<span class="label text-danger">' + '<div class="dot-label bg-danger  mr-1"></div>' + 'ไม่สำเร็จ' + '</span >'
                            }
                        }
                    }, //7
                    {
                        title: "<span style='font-size:11px;'>บันทึกโดย</span>",
                        data: "created_by",
                        class: "tx-center",
                        width: "100px",
                        // visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //8
                    {
                        title: "<span style='font-size:11px;'>เวลาที่สร้าง</span>",
                        data: "created_date",
                        width: "70px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY HH:mm') + '<span/>';
                        }
                    }, //9 
                    {
                        title: "<span style='font-size:11px;'>เวลาที่สิ้นสุด</span>",
                        data: "time_final",
                        width: "70px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            //return '<span style="font-size:11px;">' + moment(data, 'YYYY-MM-DD HH:mm').format('DD/MM/YYYY HH:mm') + '<span/>';
                            if (data == '1900-01-01T00:00:00') {
                                return '-'
                            } else {
                                return '<span style="font-size:11px;">' + moment(data, 'YYYY-MM-DD HH:mm').format('DD/MM/YYYY HH:mm') + '<span/>';
                                // return '<span style="font-size:11px;">' + data + '<span/>';
                            }
                        }
                    }, //10 
                    {
                        title: "<span style='font-size:11px;'>ระยะเวลา</span>",
                        data: "diff_time",
                        width: "70px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data == 9876) {
                                return '-'
                            } else {
                                return '<span style="font-size:11px; color:Green;" >' + data + ' นาที' + '</span>';
                            }
                        }
                    }, //11 
                ],

                "order": [[1, "desc"]],

                "initComplete": function (settings, json) {

                    $.contextMenu({
                        selector: '#tbl-list tbody tr',
                        callback: async function (key, options) {

                            let data = oTable.row(this).data();
                            let citem = {
                                tr_date: data['tr_date'],
                                tr_no: data['tr_no'],
                                tr_qty: data['tr_qty'],
                                tr_remark_qty: data['tr_remark_qty'],
                                tr_sum_qty: data['tr_sum_qty'],
                                tr_status_qty: data['tr_status_qty'],
                                created_by: data['created_by'],
                                record_status: data['record_status'],
                            };

                            $('#modal-frm_data').modal({

                                keyboard: false,
                                backdrop: 'static'

                            });

                            if (key === 'history') {

                                await $.List_History(citem);

                                await $.Item_Remark(citem);
                                await $.Load_item(citem);

                            } else {

                                alert('ERROR');

                            }

                        },
                        items: {

                            "history": { name: "View", icon: "fas fa-history" },

                        }
                    });

                },
            });


        }
    })

};

$.List_History = async function (citem) {

    let url_history = new URL(url_tr_history);
    url_history.search = new URLSearchParams({

        tr_job_no: citem['tr_no'],
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
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            })


        } else {

            $.LoadingOverlay("hide");

            let qty_remark;
            $.each(result.data, function (index, item) {
                qty_remark = item.qty_remark
            });

            let job_detail_qty = citem['tr_sum_qty'];
            let job_qty = citem['tr_qty'];
            let sum_qty_item = (job_qty - job_detail_qty);

            $('#modal-frm_data').modal('hide');
            $('#frm_history').find('#no_br').html(citem['tr_no'])

            $('#frm_history').find('#sum_qty_current').html(citem['tr_sum_qty']).css("color", "#F39C12");
            $('#frm_history').find('#sum_qty_total').html(citem['tr_qty']).css("color", "#138D75");
            $('#frm_history').find('#sum_qty_other').html(qty_remark);
            $('#sum_qty_item').html(sum_qty_item).css("color", "#8A0006");

            $('#frm_history').find('#r_item').prepend('<option value="" selected></option>');

            $('#modal-frm_history').modal('show');

            $('#tbl-list').css({ "width": "100%" });

            $('.r_remark_more').hide();

            $('.r_remark_qty_if').hide();

            hTable = $('#tbl-list-history').DataTable({
                data: result.data,
                scrollY: "450px",
                scrollX: false,
                scrollCollapse: true,
                autoWidth: true,
                paging: false,
                colReorder: true,
                destroy: true,
                dom: 'Bfrtip',
                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 rows', '25 rows', '50 rows', 'Show all']
                ],
                buttons: [
                    'pageLength', 'copy', 'excel', 'colvis'
                    , {
                        extend: 'excel',
                        text: 'Save in EXCEL',
                        filename: 'stmas_exp',
                        customize: function (xlsx) {
                            var sheet = xlsx.xl.worksheets['sheet1.xml'];
                            $('row c[r^="G"] ', sheet).each(function () {
                                if ($(this).text() !== "needed Adjustment") {
                                    $(this).attr('s', '20');
                                }
                            });
                        }
                    }
                ],
                columns: [
                    {
                        title: "<span style='font-size:11px;'>เลขที่ TR</span>",
                        data: "tr_detail_no",
                        //width: "70px",
                        visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span">' + data + '</span>';
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>ลำดับ</span>",
                        data: "tr_detail_item",
                        //width: "70px",
                        visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span">' + data + '</span>';
                        }
                    }, //1
                    {
                        title: "<span style='font-size:11px;'>สถานที่</span>",
                        data: "tr_detail_location",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span">' + data + '</span>';
                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>ชื่อสินค้า</span>",
                        data: "tr_detail_stkname",
                        width: "170px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span">' + data + '</span>';
                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>เลขบาร์โค้ด</span>",
                        data: "tr_detail_gbarcode",
                        width: "100px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>เลขอะไหล่</span>",
                        data: "tr_detail_spcodes",
                        width: "100px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span">' + data + '</span>';
                        }
                    }, //5
                    {
                        title: "<span style='font-size:11px;'>จำนวนปัจจุบัน</span>",
                        data: "tr_detail_qty",
                        width: "80px",
                        //visible: false,
                        class: "tx-center qty_now",
                        render: function (data, type, row, meta) {

                            if (data == row.tr_detail_trnqty) {
                                return '<span style="font-size:11px;  color:DarkGreen;">' + data + '</span>'
                            } else if (data == 0) {
                                return '<span style="font-size:11px;  color:Red;">' + data + '</span>'
                            } else if (data < row.tr_detail_trnqty) {
                                return '<span style="font-size:11px;  color:#EE5A00;">' + data + '</span>'
                            }
                        }
                    }, //6
                    {
                        title: "<span style='font-size:11px;'>จำนวนทั้งหมด</span>",
                        data: "tr_detail_trnqty",
                        width: "80px",
                        //visible: false,
                        class: "tx-center qty_total",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;  color:#002259;">' + data + '</span>';
                        }
                    }, //7
                    {
                        title: "<span style='font-size:11px;'>หน่วย</span>",
                        data: "tr_detail_stkunit",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //8
                    {
                        title: "<span style='font-size:11px;'>จำนวนแก้ไข</span>",
                        data: "tr_remark_qty",
                        width: "80px",
                        //visible: false,
                        class: "tx-center qty_now",
                        render: function (data, type, row, meta) {
                            if (data == 0) {
                                return '<span style="font-size:11px;  color:Red;">' + data + '</span>'
                            } else {
                                return '<span style="font-size:11px;  color:#002259;">' + data + '</span>'
                            }
                        }
                    }, //9
                    {
                        title: "<span style='font-size:11px;'>หมายเหตุ</span>",
                        data: "tr_remark_status",
                        width: "80px",
                        //visible: false,
                        class: "tx-center qty_now",
                        render: function (data, type, row, meta) {

                            if (data == null || data == '') {
                                return ''
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>'
                            }
                        }
                    }, //10

                ],

            });


        }
    })
};

$.Item_Remark = async function (citem) {

    let qty;

    $('#frm_history input').removeClass('parsley-error');
    $('#frm_history input').removeClass('parsley-success');
    $('#r_item').val('').trigger('change');

    $('#frm_history').find('#r_item').empty();

    $("#r_item").change(function () {
       /* alert('ho')*/
        $('#r_qty').val('');

        let Get_item_qty = new URL(url_tr_item);

        Get_item_qty.search = new URLSearchParams({
            tr_job_no: citem['tr_no'],
            tr_detail_id: $(this).val(),
            record_status: '1',
        });
       
        fetch(Get_item_qty).then(function (response) {
            return response.json();
        }).then(function (result) {
            if (result.status === 'Error') {

                $.LoadingOverlay("hide");

                alert('list_item_qty')

            } else {

                $.LoadingOverlay("hide");

                $.each(result.data, function (key, val) {

                    $('#frm_history').find('#r_qty_list_now').val(val['tr_detail_qty'])
                    $('#frm_history').find('#r_qty_list_old').val(val['tr_detail_trnqty'])

                    qty = (val['tr_detail_trnqty'] - val['tr_detail_qty']);

                });

                $("#r_qty").attr({
                    "max": qty,
                    "min": 1
                });

            }
        });

        $("#r_qty").on("keypress keyup blur", function (event) {

            $(this).val($(this).val().replace(/[^\d].+/, ""));

            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
            
            //let max = qty;
            //let max = qty;
            let max = parseInt($(this).attr('max'));
            let min = parseInt($(this).attr('min'));

            //console.log(qty);

            if ($("#r_qty").val() > max) {
                $("#r_qty").val(max);
            }
            else if ($("#r_qty").val() < min) {
                $("#r_qty").val(min);
            }

        });


    });

    $("#r_remark").change(function () {

        var other = $(this).val();

        if (other == 'อื่นๆ') {
            $('.r_remark_more').show();
        } else {
            $('.r_remark_more').hide();
            $('#r_remark_more').val('')
        }
        
    });

    $('#frm_history').parsley().on('form:submit', function () {

        $.LoadingOverlay("show", {
            image: '',
            custom: customElement
        });

        let add_data = {

            tranfer_no: citem['tr_no'],
            tr_detail_id: $('#frm_history').find('#r_item').val(),
            r_remark: $('#frm_history').find('#r_remark').val() == 'อื่นๆ' ? $('#frm_history').find('#r_remark_more').val() : $('#frm_history').find('#r_remark').val(),
            r_qty: $('#frm_history').find('#r_qty').val(),
            updated_by: name

        };

        var params = [];
        for (const i in add_data) {
            params.push(i + "=" + encodeURIComponent(add_data[i]));
        }

        fetch(url_tr_remark, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            // mode: 'no-cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            body: params.join("&"),
        }).then(data => {

            toastr.success('Save Successfully!', async function () {

                $.LoadingOverlay("hide");

                $('#modal-frm_history').modal('hide');

                $("#frm_history").parsley().reset();
                $('#r_item').val('').trigger('change');
                $('#r_remark').val('');
                $('#r_qty').val('');

                $('#frm_history input').removeClass('parsley-error');
                $('#frm_history input').removeClass('parsley-success');
    
                $.List_History(citem);

            });

        }).catch((error) => {

            $.LoadingOverlay("hide");

            console.error('Error:', error);
        });

        return false;

    });


}

$.User_Checker = function () {

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
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            })
        } else {

            $.LoadingOverlay("hide");

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
        }

    });

}

$.Load_item = async function (citem) {

    $("#r_item").empty();

    item_dataSet = [];

    let Get_item = new URL(url_tr_item);

    Get_item.search = new URLSearchParams({

        tr_job_no: citem['tr_no'],
        record_status: '1',

    });

    fetch(Get_item).then(function (response) {

        return response.json();

    }).then(function (result) {

        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'ไม่สามารถเรียกรายการได้',
            }).then((result) => {

                if (result.isConfirmed) {

                    location.reload();

                }
            })

        } else {

            $.LoadingOverlay("hide");

            $.each(result.data, function (key, val) {

                item_dataSet.push({ id: val['tr_detail_id'], text: val['tr_detail_gbarcode'] + ' : ' + val['tr_detail_stkname'] + '[' + val['tr_detail_location'] + ']' + val['tr_detail_location'] });

            });

            $('#r_item').select2({
                width: '100%',
                height: '40px',
                data: item_dataSet,
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

$(document).ready(async function () {

    await $.init();
    await $.List();

});

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
        var full_mail = user.email;
        name = full_mail.replace("@vskautoparts.com", "");
    } else {

        window.location.assign('./login');

    }

});