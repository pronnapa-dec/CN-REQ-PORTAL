'use strict';

const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const user_id = objProfile[0]['username'];
const application_id = objProfile[0]['application'];
const url_api = "http://localhost:49705";
//const url_api = "http://192.168.1.247:8899/ca-api";

let url_image = 'http://localhost/image_slip/'
//let url_image = 'http://192.168.1.247:8899/image_slip/'

let url_slip = 'http://localhost:57916/'
//let url_slip = 'http://192.168.1.247:8099/'

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const url_slip_list = url_api + '/v1/Slip_List';
const url_slip_delete = url_api + '/v1/Slip_Delete';
const url_slip_detail = url_api + '/v1/Slip_Detail';
const url_slip_create = url_api + '/v1/Slip_Create';
const url_slip_upload = url_api + '/v1/Slip_Upload';
const url_slip_update = url_api + '/v1/Slip_Update';
const url_slip_bill_create = url_api + '/v1/Slip_Bill_Create';
const url_slip_bill_list = url_api + '/v1/Slip_Bill_List';
const url_slip_bill_delete = url_api + '/v1/Slip_Bill_Delete';
const url_master_get = url_api + '/v1/Slip_Master';

let oTable = $('#tbl-list').DataTable();
let table_bill;
let tbl_slip;
/*let add_data = {};*/
/*let add_img = {};*/

let customElement = $("<div>", {
    "css": {
        "border": "2px solid",
        "font-size": "14px",
        "text-align": "center",
        "padding": '7px'

    },
    "text": 'Please Wait...'
});

firebase.auth().onAuthStateChanged(async function (user) {

    if (user) {

    } else {

        window.location.assign('./login');

    }

});

$.init = async function () {

    $('#branch').val(application_id.substring(0, 3))

    await setTimeout(function () {
        $.LoadingOverlay("hide");
        $('#btn-save_exit').hide()
    }, 1000);

    console.log(urlParams.get('refno'))

    $('#btn-export-rt-v1').on('click', function (evt) {

        evt.preventDefault();

        let url = 'http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_CA_CSH_SLIP&rs:Command=Render';

        window.open(url, '_blank');
        //alert('button 1')

    });

    $('#btn-export-rt-v2').on('click', function (evt) {

        evt.preventDefault();

        let url = 'http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2FReport+Project1%2FRPT_CA_CSH_SLIP_VERIFY&rs:Command=Render';

        window.open(url, '_blank');
        //alert('button 1')

    });

    $('#slip_job_datetime').daterangepicker({
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

    $('#modal-frm_data').off('hidden.bs.modal').on('hidden.bs.modal', async function () {

        await setTimeout(function () {

            $('#detectImageForm').find('input').val('')
            $('#sum_qty_item').html('0.00');
            $('#sum_qty_current').html('0.00');
            $('#sum_qty_total').html('0.00');
            $('.dropify-clear').trigger('click');

        }, 100);

    });

    $('#btn-save_exit').off('click').on('click', async function (e) {

        e.preventDefault();

        await $('#detectImageForm').parsley().validate();

        await $.Slip_Create();
    });

    $('#btn-item_create').off('click').on('click', async function (e) {

        e.preventDefault();

        //let url_bankslip = url_slip + "csh/opt/bankslip";
        let url_bankslip = url_slip + "csh/opt/bankslip";

        console.log(url_bankslip)

        window.open(url_bankslip, '_blank');

    });

    $(".img-gallery").lightGallery({ rel: true });

    $('#frm_search').submit(async function (e) {

        e.preventDefault();

        $(".card-body").LoadingOverlay("show", {
            image: '',
            custom: customElement
        });

        $.Slip_List();

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

$.clear_input = async function () {

    $('#frm_search').trigger('reset');
    $('#frm_search').find('input').val('');
    $("#frm_search").parsley().reset();
    $("#bankslip_emmas option").remove();
    $('#bankslip_emmas')
        .append($("<option value=''>--- Select ---</option>")).prop('disabled', false);

};

$.Slip_List = async function () {

    let url = new URL(url_slip_list);

    let trndate_start;
    let trndate_end;

    trndate_start = $('#slip_job_datetime').val() != '' ? moment($('#slip_job_datetime').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment().add(-1, 'days').format('YYYY-MM-DD') + ' 00:00';
    trndate_end = $('#slip_job_datetime').val() != '' ? moment($('#slip_job_datetime').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';

    console.log(trndate_start)
    console.log(trndate_end)
    url.search = new URLSearchParams({

        //slip_datetime_start: trndate_start,
        //slip_datetime_end: trndate_end,
        slip_jobdate_start: trndate_start,
        slip_jobdate_end: trndate_end,
        slip_refno: $('#frm_search').find('#slip_refno').val() === '' ? '' : $('#frm_search').find('#slip_refno').val(),
        slip_bank: $('#frm_search').find('#slip_bank').val() === '' ? '' : $('#frm_search').find('#slip_bank').val(),
        created_by: $('#frm_search').find('#slip_user').val() === '' ? '' : $('#frm_search').find('#slip_user').val(),
        slip_cuscode: $('#frm_search').find('#slip_cusname').val() === '' ? '' : $('#frm_search').find('#slip_cusname').val(),
        slip_bill: $('#frm_search').find('#bill_no').val() === '' ? '' : $('#frm_search').find('#bill_no').val(),
        slip_total: $('#frm_search').find('#slip_total').val() === '' ? '' : $('#frm_search').find('#slip_total').val(),
        branch: $('#frm_search').find('#branch').val() === '' ? '' : $('#frm_search').find('#branch').val(),

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

            tbl_slip = $('#tbl-slip').DataTable({
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
                        filename: 'Report_Bankslip_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                        exportOptions: {
                            columns: [2, 4, 5, 6, 9, 7, 8, 11, 13, 15, 17, 18, 21]
                        }
                    },
                ],
                columns: [
                    {
                        title: "<span style='font-size:11px;'>trans_id</span>",
                        data: "trans_id",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>รูปภาพ</span>",
                        data: "images",
                        class: "tx-center",
                        //width: "300px",
                        //visible: false,
                        render: function (data, type, row, meta) {

                            return "<div class='carousel-inner tx-center' style='width: 50px!important; height: 80px!important;'>" +
                                "<div class='tx-center'>" +
                                "<img src=" + url_image + row.image_no + '/' + row.image_name + " alt='img' class=''>" +
                                "</div>" +
                                "</div>";
                        }
                    },//1
                    {
                        title: "<span style='font-size:11px;'>วันที่เอกสาร</span>",
                        data: "slip_jobdate",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data, 'YYYY/MM/DD').format('DD/MM/YYYY') + '<span/>';
                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>เลขที่เอกสาร</span>",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + row.slip_jobno + '<br>' + row.slip_refno + '</span>';
                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>เลขที่เอกสาร</span>",
                        data: "slip_jobno",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>เลขที่อ้างอิง</span>",
                        data: "slip_refno",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //5

                    {
                        title: "<span style='font-size:11px;'>ธนาคาร</span>",
                        data: "slip_bank",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //6
                    {
                        title: "<span style='font-size:11px;'>รหัสลูกค้า</span>",
                        data: "slip_cuscode",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //7
                    {
                        title: "<span style='font-size:11px;'>ชื่อลูกค้า</span>",
                        data: "slip_cuslname",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //8
                    {
                        title: "<span style='font-size:11px;'>ต้นทาง</span>",
                        data: "slip_cusname",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //9
                    {
                        title: "<span style='font-size:11px;'>ลูกค้า</span>",

                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + row.slip_cuscode + '<br>' + row.slip_cuslname + '</span>';
                        }
                    }, //10
                    {
                        title: "<span style='font-size:11px;'>ยอดเงินโอน</span>",
                        data: "slip_total",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //11
                    {
                        title: "<span style='font-size:11px;'>ยอดเงินบิล</span>",
                        data: "sum_bill",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data.toFixed(2) + '</span>';
                        }
                    }, //12
                    {
                        title: "<span style='font-size:11px;'>บิล</span>",
                        data: "count_bill",
                        class: "tx-center align-middle font-weight-bold",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //13
                    {
                        title: "<span style='font-size:11px;'>record_status</span>",
                        data: "record_status",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //14
                    {
                        title: "<span style='font-size:11px;'>วันที่สลิป</span>",
                        data: "slip_datetime",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                            // return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '<span/>';
                        }
                    }, //15
                    {
                        title: "<span style='font-size:11px;'>ผู้ตรวจสอบ</span>",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + row.created_by + '<br>' + moment(row.created_date).format("DD/MM/YYYY HH:mm:ss") + '</span>';
                        }
                    }, //16
                    {
                        title: "<span style='font-size:11px;'>ผู้สร้างเอกสาร</span>",
                        data: "created_by",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //17
                    {
                        title: "<span style='font-size:11px;'>วันที่สร้างเอกสาร</span>",
                        data: "created_date",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format("DD/MM/YYYY HH:mm:ss") + '<span/>';
                        }
                    }, //18
                    {
                        title: "<span style='font-size:11px;'>image_no</span>",
                        data: "image_no",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //19
                    {
                        title: "<span style='font-size:11px;'>image_name</span>",
                        data: "image_name",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //20
                    {
                        title: "<span style='font-size:11px;'>สาขา</span>",
                        data: "branch",
                        class: "tx-center align-middle font-weight-bold",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //21
                ],
                "initComplete": function (settings, json) {

                    $("#global-loader").fadeOut("slow");

                    $.contextMenu({
                        selector: '#tbl-slip tbody tr',
                        callback: async function (key, options) {

                            let citem = tbl_slip.row(this).data();

                            if (key === 'view') {

                                await $.Slip_Detail(citem);
                                //await $.Slip_Bill_List(citem);

                            } else if (key === 'edit') {

                                await $.Slip_Update(citem);

                            } else if (key === 'delete') {

                                await $.Slip_Delete(citem);

                            } else {

                                alert('ERROR');

                            }
                        },
                        items: {
                            "view": { name: "View", icon: "fas fa-search" },
                            "edit": { name: "Edit", icon: "edit" },
                            "delete": { name: "Delete", icon: "delete" },
                        }
                    });

                },
            });

        }
    })

};

$.Slip_Detail = async function (citem) {

    $(".model-body").LoadingOverlay("show", {
        image: '',
        custom: customElement
    });

    await $('#modal-frm_data').modal({
        keyboard: false,
        backdrop: 'static'
    });

    fetch(url_slip_detail + '?slip_jobno=' + citem['slip_jobno']).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log('result', result.data)

        if (result.length > 0) {

            $.each(result.data, function (key, val) {

                var slip_jobdate = moment(val['slip_jobdate'], 'YYYY/MM/DD').format('DD/MM/YYYY')
                var slip_datetime = val['slip_datetime'];

                $('#bankslip_date').val(slip_jobdate);
                $('#bankslip_jobno').val(val['slip_jobno']);
                $('#bankslip_ref').val(val['slip_refno']);
                $('#bankslip_number').val(val['slip_bank']);
                $('#bankslip_payindate').val(slip_datetime);
                $('#bankslip_total').val(val['slip_total']);

                $('#bankslip_gallery').attr('data-src', url_image + val['image_no'] + '/' + val['image_name']);
                $('#bankslip_image').attr('src', url_image + val['image_no'] + '/' + val['image_name']);

                $("#bankslip_emmas option").remove();

                if (citem['slip_cuscode'] != '') {

                    fetch('http://192.168.1.247/vsk-api-acc/api/ACC/VSK_Emmas_Select2_GET?search=' + citem['slip_cuscode']).then(function (response) {
                        return response.json();
                    }).then(function (result) {
                        console.log('emmas', result.data)
                        if (result.length > 0) {

                            $('#bankslip_emmas')
                                .append($("<option>--- Select ---</option>")
                                    .attr("value", result.data[0]['id'])
                                    .text(result.data[0]['text'])
                                    .attr('name', result.data[0]['text']));

                        }

                    });

                }

                $('#sum_qty_total').html(val['slip_total']).css("color", "#138D75")

                $.Slip_Bill_List(citem);
            });


        } else {

            swal({
                title: "ขออภัย",
                text: "เกิดข้อผิดพลาด",
                type: 'error',
                timer: 2000,
                showConfirmButton: false
            });

            toastr.error('ไม่พบข้อมูลใบงาน');
        }

    });

};

$.Slip_Update = async function (citem) {

    if (user_id != citem['created_by']) {

        toastr.error('Error, ผู้ใช้งานไม่ตรงกัน');

    } else {

        //let url_bankslip = "http://192.168.1.247:8099/csh/opt/bankslip?jobno=" + citem['slip_jobno'];

        let url_bankslip = url_slip + "csh/opt/bankslip?jobno=" + citem['slip_jobno'];

        console.log(url_bankslip)

        window.open(url_bankslip, '_blank');

    }

};

$.Slip_Delete = async function (citem) {

    console.log('citem', citem)
    if (user_id != citem['created_by']) {

        toastr.error('Error, ผู้ใช้งานไม่ตรงกัน');

    } else {

        swal({
            title: "คุณแน่ใจหรือไม่",
            text: "ที่จะทำการอัพเดตข้อมูลนี้",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "ใช่, ยันยืน",
            cancelButtonText: "ไม่, ยกเลิก",
            cancelButtonColor: '#d33',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {

            if (isConfirm) {

                let data_update = {
                    trans_id: citem['trans_id'],
                    ref_id: citem['slip_jobno'],
                    updated_by: user_id,
                };

                var params = [];
                for (const i in data_update) {
                    params.push(i + "=" + encodeURIComponent(data_update[i]));
                }

                fetch(url_slip_delete, {
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

                        swal({
                            title: "สำเร็จ!",
                            text: "ทำรายการสำเร็จ",
                            type: 'success',
                            timer: 2000,
                            showConfirmButton: false
                        });

                        toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {
                            //table_bill.destroy();
                            //await location.reload();
                            $.Slip_List();

                        }, 1000);

                    }

                }).catch(error => {

                    toastr.error('Error, Please contact administrator.');

                });

            } else {

                swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

            }

        });
    }
};

$.Slip_Bill_List = async function (citem) {

    $(".card-body").LoadingOverlay("hide", true);

    console.log('Slip_Bill_Detail data', citem);

    let data_jobno = $('#bankslip_jobno').val();
    let bankslip_total = $('#bankslip_total').val();

    $('#tbl-bill tbody').empty();

    fetch(url_slip_bill_list + '?ref_id=' + citem['slip_jobno']).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log('result', result.data);

        if (result.length > 0) {

            let i = result.length;
            var data_slip_bill = [];
            let sum_qty_current = 0;
            let sum_qty_total = 0;

            $.each(result.data, function (key, val) {

                let data = JSON.stringify(val);

                sum_qty_current += parseFloat(val['bill_invtotal'])

                let bill_invtotal = val['bill_invtotal']

                data_slip_bill.push([
                    i,
                    val['bill_invdate'],
                    val['bill_no'],
                    val['bill_invcode'],
                    val['bill_invname'],
                    bill_invtotal.toFixed(2),
                    val['bill_invpay'],
                    val['bill_userid'],
                    val['bill_branch'],
                    val['created_by'],
                    val['created_datetime'],
                    "<div class='d-flex flex-row justify-content-center'>" +
                    //"<button onclick='$.Slip_Bill_Delete(" + data + ");' data-item='" + data + "' style='margin: .25rem .125rem; ' class='btn btn-outline-danger btn-sm delete-item delete_item' data-action='delete' id='delete_item" + i + "' type='button' >Delete</button>" +
                    "</div>",
                    val['trans_id'],
                    val['ref_id'],
                    val['record_status'],

                ])

                i--;

            });

            $('#sum_qty_current').html(sum_qty_current).css("color", "#F39C12");
            let sum_qty_item = (bankslip_total - sum_qty_current)
            $('#text_qty_item').html('')
            if (sum_qty_item < 0) {
                $('#text_qty_item').html('ยอดส่วนต่าง')
            } else {
                $('#text_qty_item').html('ยอดคงเหลือ')
            }
            $('#sum_qty_item').html(sum_qty_item.toFixed(2));

            console.log('data_slip_bill', data_slip_bill)

            table_bill = $('#tbl-bill').DataTable({
                "data": data_slip_bill,
                "dom": 'ifrtp',
                "bDestroy": true,
                "deferRender": true,
                "order": [[0, "desc"]],
                "ordering": false,
                "pageLength": 5,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false,
                },
                {
                    "targets": [0],
                    "searchable": false,
                    "class": "tx-center",
                },
                {
                    "targets": [1],
                    "searchable": false,
                    "class": "tx-center",
                    "render": function (data, type, row, meta) {
                        return (data != '0001-01-01T00:00:00' ? moment(data).format('DD/MM/YYYY') : '-');
                    }
                },
                {
                    "targets": [2],
                    "searchable": false,
                    "class": "tx-center",
                },
                {
                    "targets": [3],
                    "searchable": false,
                    "class": "tx-center",
                },
                {
                    "targets": [4],
                    "searchable": false,
                    "class": "tx-center",

                },
                {
                    "targets": [5],
                    "searchable": false,
                    "class": "tx-right",

                },
                {
                    "targets": [6],
                    "searchable": false,
                    "class": "tx-center",
                    "render": function (data, type, row, meta) {
                        let status
                        if (data == 'paycash') {
                            status = '<span class="tx-primary">' + 'เงินสด' + '</span>'
                        } else if (data == 'paytran') {
                            status = '<span class="tx-success">' + 'เงินโอน' + '</span>'
                        } else if (data == 'paycard') {
                            status = '<span class="tx-warning">' + 'เครดิต' + '</span>'
                        } else if (data == 'payoth') {
                            status = '<span class="tx-dark">' + 'อื่นๆ' + '</span>'
                        } else {
                            status = '<span class="tx-danger">' + '' + '</span>'
                        }
                        return status;
                    },
                    //"visible": false

                },
                {
                    "targets": [7],
                    "searchable": false,
                    "class": "tx-center",
                    //"visible": false

                },
                {
                    "targets": [8],
                    "searchable": false,
                    "class": "tx-center font-weight-bold",
                    //"visible": false

                },
                {
                    "targets": [9],
                    "searchable": false,
                    "class": "tx-center",
                    //"visible": false

                },
                {
                    "targets": [10],
                    "searchable": false,
                    "class": "tx-center",
                    "render": function (data, type, row, meta) {
                        return (data != '0001-01-01T00:00:00' ? moment(data).format('DD/MM/YYYY HH:mm:ss') : '-');
                    }

                },
                {
                    "targets": [11],
                    "searchable": false,
                    "class": "tx-center",
                    "visible": false
                },
                {
                    "targets": [12],
                    "searchable": false,
                    "visible": false

                },
                {
                    "targets": [13],
                    "searchable": false,
                    "visible": false

                },
                {
                    "targets": [14],
                    "searchable": false,
                    "visible": false

                }],
                "initComplete": function (settings, json) {

                }
            });

            table_bill.columns.adjust();

            //$.LoadingOverlay("hide");

        }

    });

};

$.Master_Get = async function () {

    let url_Master = new URL(url_master_get);

    url_Master.search = new URLSearchParams({
        mode: 'user',
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

            $('#frm_search').find('#slip_user').select2({
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

$(document).ready(async function () {

    await $.init();
    await $.Master_Get();
    await $.Slip_List();

});