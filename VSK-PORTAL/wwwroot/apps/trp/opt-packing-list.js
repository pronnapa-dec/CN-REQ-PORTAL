'use strict';

const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const user_id = objProfile[0]['username'];
const url_api = "http://localhost:49705";
const url_job = "http://localhost:57916";
const url_print_pc = "http://localhost/mpck/mod/step_5/print_pc.html";

//const url_print_pc = "'http://192.168.1.247:8080/mpck/mod/step_5/print_pc.html";
//const url_api = "http://192.168.1.247:8899/trp-api";
//let url_job = 'http://192.168.1.247:8099'
//let url_trp = 'http://192.168.1.247:8099/'

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const url_Trp_Packing_List = url_api + '/v1/Trp_Packing_List';
const url_Trp_Packing_Detail = url_api + '/v1/Trp_Packing_Detail';
const url_Trp_Packing_Box_Check = url_api + '/v1/Trp_Packing_Box_Check';
const url_Trp_Packing_Share_Box_Create = url_api + '/v1/Trp_Packing_Share_Box_Create';
const url_Trp_Packing_Share_Box_Detail = url_api + '/v1/Trp_Packing_Share_Box_Detail';
const url_Trp_Packing_Share_Box_Delete = url_api + '/v1/Trp_Packing_Share_Box_Delete';
const url_Trp_Packing_Job_Temp_Delete = url_api + '/v1/Trp_Packing_Job_Temp_Delete';
const url_Packing_Master = url_api + '/v1/Trp_Packing_Master';

const url_Trp_Packing_Remark_Create = url_api + '/v1/Trp_Packing_Remark_Create';
const url_Trp_Packing_Remark_Delete = url_api + '/v1/Trp_Packing_Remark_Delete';
const url_Trp_Packing_Remark_List = url_api + '/v1/Trp_Packing_Remark_List';

const url_master_get = url_api + '/v1/Slip_Master';

let oTable = $('#tbl-list').DataTable();
let table_bill, table_inv, table_description, tbl_packing;
let checkbox;
let box_trans_id;

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

    var datetime = null,
        date = new Date();

    var update = function () {
        date = new Date();
        datetime.html(toThaiDateString(date));
    };
    datetime = $('.time-today')
    update();
    setInterval(update, 1000);

    await $.init();
    await $.Master_Get();
    await $.Packing_List();

});

$.init = async function () {

    $('.breadcrumb-header').find('.right-content').append('<div class="pd-l-10 mb-6 mb-xl-0"><button id="btn-pck_verify" class="btn btn-primary btn-with-icon btn-block" ><i class="far fa-file-excel"></i> Verify Checkbox </button></div>')

    $('#btn-pck_verify').on('click', function (evt) {

        evt.preventDefault();

        let url = 'http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_PACKING_VERIFY_CHECK_BOX&rs:Command=Render';

        window.open(url, '_blank');

    });

    $('#btn-export-rt').on('click', function (evt) {

        evt.preventDefault();

        let url = 'http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_CA_CSH_SLIP&rs:Command=Render';

        window.open(url, '_blank');
        //alert('button 1')

    });

    $('#packing_jobdate').daterangepicker({
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
            $('.dropify-clear').trigger('click');

        }, 100);

    });

    $('#modal-cancel_job').off('hidden.bs.modal').on('hidden.bs.modal', async function () {

        await setTimeout(function () {

            $('#frm-cancel_job').find('input').val('')
            $('#frm-cancel_job').find('textarea').val('').prop('disabled', false)
            $('#frm-cancel_job').find('button').prop('disabled', false)

        }, 100);

    });

    $('#btn-item_create').off('click').on('click', async function (e) {

        e.preventDefault();

        //let url_bankslip = url_slip + "csh/opt/bankslip";
        let url_packing_job = url_job + "/trp/packing_job";

        console.log(url_packing_job)

        window.open(url_packing_job, '_blank');

    });

    $(".img-gallery").lightGallery({ rel: true });

    $('#frm_search').submit(async function (e) {

        e.preventDefault();

        $.LoadingOverlay("show", {
            image: '',
            custom: customElement
        });

        $.Packing_List();

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

    $('#frm_remark').find('#job_no').off('select2:select').on('select2:select', function (evt) {

        evt.preventDefault();

        $(this).on('select2:select', function (evt) {
            evt.preventDefault();
        });


        $('#frm_remark').find('input').val('')
        $('#frm_remark').find('textarea').val('')
        $('#frm_remark').find('input[type="checkbox"]').prop('disabled', true)

        if ($(this).val() != '') {

            $.Packing_Comment_Detail($('#frm_remark').find('#job_no :selected').text());

            $('#frm_remark').find('#btn-save').removeClass('d-none')

        }

    });

    $('input[type="checkbox"]').click(function () {

        $('input[type="checkbox"]').not(this).prop("checked", false);

        $("input:checkbox:checked").each(function () {
            //alert($(this).attr('id'));
            //checkbox = $(this).attr('id')

            if ($(this).attr('id') == 'size_A') {
                checkbox = 'a'
            } else if ($(this).attr('id') == 'size_B') {
                checkbox = 'b'
            } else if ($(this).attr('id') == 'size_C') {
                checkbox = 'c'
            } else if ($(this).attr('id') == 'size_D') {
                checkbox = 'd'
            } else if ($(this).attr('id') == 'size_E') {
                checkbox = 'e'
            } else if ($(this).attr('id') == 'size_F') {
                checkbox = 'f'
            } else if ($(this).attr('id') == 'size_Z') {
                checkbox = 'z'
            } else {
                checkbox = 'NaN'
            }

        });

    });

    $('#frm_remark').find('#btn-delete').off('click').on('click', async function (e) {

        e.preventDefault();

        await $.Packing_Share_Box_Delete();

    });
};

$.Clear_Input = async function () {

    $('#frm_search').trigger('reset');
    $('#frm_search').find('input').val('');
    $("#frm_search").parsley().reset();
    $("#bankslip_emmas option").remove();
    $('#bankslip_emmas')
        .append($("<option value=''>--- Select ---</option>")).prop('disabled', false);

};

$.Box_Check_Get = async function (citem) {

    let url = new URL(url_Trp_Packing_Box_Check);

    url.search = new URLSearchParams({
        packing_job_date: moment(citem['packing_job_date']).format('YYYY-MM-DD'),
        emmas_code: citem['emmas_code'],
        packing_delivery_emlocation: citem['packing_delivery_emlocation'],

    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            let Master_dataSet = [];

            $('#frm_remark').find("#job_no option").remove();
            $('#frm_remark').find("#job_no").append("<option value=''>--SELECT--</option>").attr("value", '')

            $.each(result.data, function (key, val) {

                Master_dataSet.push({ id: val['packing_job_id'], text: val['packing_job_no'] });

                box_trans_id = val['box_trans_id']

            });

            $('#frm_remark').find('#job_no').select2({
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

$.Packing_List = async function () {

    let url = new URL(url_Trp_Packing_List);

    let trndate_start = $('#packing_jobdate').val() != '' ? moment($('#packing_jobdate').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment().add(-1, 'days').format('YYYY-MM-DD') + ' 00:00';
    let trndate_end = $('#packing_jobdate').val() != '' ? moment($('#packing_jobdate').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';

    url.search = new URLSearchParams({

        packing_jobdate_start: trndate_start,
        packing_jobdate_end: trndate_end,
        packing_job_no: $('#frm_search').find('#packing_job_no').val() === '' ? '' : $('#frm_search').find('#packing_job_no').val(),
        emmas_code: $('#frm_search').find('#emmas_code').val() === '' ? '' : $('#frm_search').find('#emmas_code').val(),
        packing_delivery_name: $('#frm_search').find('#packing_delivery_name').val() === '' ? '' : $('#frm_search').find('#packing_delivery_name').val(),
        lov_deliverycost_code: $('#frm_search').find('#lov_deliverycost_code').val() === '' ? '' : $('#frm_search').find('#lov_deliverycost_code').val(),
        created_by: $('#frm_search').find('#created_by').val() === '' ? '' : $('#frm_search').find('#created_by').val(),

    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            $.LoadingOverlay("hide", true);

            swal({
                title: "ขออภัย",
                text: "เกิดข้อผิดพลาด",
                type: 'error',
                timer: 2000,
                showConfirmButton: false
            });

            toastr.error('ขออภัย!');

        } else {

            tbl_packing = $('#tbl-packing').DataTable({
                data: result.data,
                dom: 'Bfrtlip',
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
                        filename: 'Report_Packing_' + moment().format("YYYY/MM/DD HH:mm:ss"),
                        exportOptions: {
                            columns: [5, 6, 27, 8, 9, 10, 11, 12, 13, 14, 15, 18, 21, 22, 23, 24, 19, 20]
                        }
                    },
                ],
                columns: [
                    {
                        title: "<span style='font-size:11px;'>ครั้ง</span>",
                        data: "packing_round",
                        class: "tx-center align-middle",
                        width: "30px",
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {
                                return '<span style="text-decoration: line-through; color:red;">' + data + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>ปริ้น</span>",
                        class: "tx-center align-middle",
                        width: "30px",
                        // visible: false,
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {
                                return '<span style="text-decoration: line-through; color:red;">' + '<i class="las la-print tx-18"></i>' + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + '<a href="' + url_print_pc + '?job_no=' + row.packing_job_no + '&temp_id=' + row.temp_id + '" target="_blank"><i class="las la-print tx-18" data-toggle="tooltip" title="" data-original-title="print"></i></a>' + '</span>';
                                //return '<span style="font-size:11px;">' + '<a href="' + 'http://192.168.1.247:8080/mpck/mod/step_5/print_pc.html?job_no=' + row.packing_job_no + '&temp_id=' + row.temp_id + '" target="_blank"><i class="las la-print tx-18" data-toggle="tooltip" title="" data-original-title="print"></i></a>' + '</span>';
                            }
                        }
                    }, //1
                    {
                        title: "<span style='font-size:11px;'>trans_id</span>",
                        data: "trans_id",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {
                                return '<span style="text-decoration: line-through; color:red;">' + data + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>temp_id</span>",
                        data: "temp_id",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {
                                return '<span style="text-decoration: line-through; color:red;">' + data + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>เลขที่เอกสาร</span>",
                        class: "tx-center align-middle",
                        //width: "190px",
                        // visible: false,
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {
                                return '<span style="text-decoration: line-through; color:red;">' + row.packing_job_no + '<br>' + moment(row.packing_job_date, 'YYYY/MM/DD').format('DD/MM/YYYY') + '</span>';
                            } else {
                                let url_packing_job = url_job + "/trp/packing_job?packing_job_no=" + row.packing_job_no

                                return '<div data-placement="top" data-toggle="tooltip-primary">' + '<a href="' + url_packing_job + '" target="_blank"><b>' + '<span style="font-size:11px;" class="tx-bold">' + row.packing_job_no + '</span>' + '</a>' + '<br>' + '<span style="font-size:11px;">' + moment(row.packing_job_date, 'YYYY/MM/DD').format('DD/MM/YYYY') + '</span>' + '</div>'
                                //return '<span style="font-size:11px;" class="tx-bold">' + row.packing_job_no + '</span>' + '<br>' + '<span style="font-size:11px;">' + moment(row.packing_job_date, 'YYYY/MM/DD').format('DD/MM/YYYY') + '</span>';
                                //return '<span style="font-size:11px;" class="tx-bold">' + row.packing_job_no + '</span>' + '<br>' + '<span style="font-size:11px;">' + moment(row.packing_job_date, 'YYYY/MM/DD').format('DD/MM/YYYY') + '</span>';
                                //return '<span style="font-size:11px;">' + '<a href="#"> onclick="' + $.Packing_Edit(row.packing_job_no); +'" <i class="las la-print tx-18" data-toggle="tooltip" title="" data-original-title="print"></i></a>' + '</span>';

                            }
                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>เลขที่เอกสาร</span>",
                        data: "packing_job_no",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {
                                return '<span style="text-decoration: line-through; color:red;">' + data + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //5
                    {
                        title: "<span style='font-size:11px;'>วันที่เอกสาร</span>",
                        data: "packing_job_date",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {
                                return '<span style="text-decoration: line-through; color:red;">' + moment(data, 'YYYY/MM/DD').format('DD/MM/YYYY') + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + moment(data, 'YYYY/MM/DD').format('DD/MM/YYYY') + '<span/>';
                            }
                        }
                    }, //6
                    {
                        title: "<span style='font-size:11px;'>ลูกค้า</span>",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {
                                return '<span style="text-decoration: line-through; color:red;">' + data + '<br>' + row.packing_delivery_name + '</span>';
                            } else {
                                return '<span style="font-size:11px;" class="tx-bold">' + row.emmas_code + '</span>' + '<br>' + '<span style="font-size:11px;">' + row.packing_delivery_name + '</span>';
                            }
                        }
                    }, //7
                    {
                        title: "<span style='font-size:11px;'>ผู้รับ</span>",
                        data: "packing_delivery_name",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {
                                return '<span style="text-decoration: line-through; color:red;">' + data + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //8
                    {
                        title: "<span style='font-size:11px;'>ที่อยู่จัดส่ง</span>",
                        data: "packing_delivery_emlocation",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {
                                return '<span style="text-decoration: line-through; color:red;">' + data + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //9
                    {
                        title: "<span style='font-size:11px;'>ผู้ส่ง</span>",
                        data: "emmas_sender_name",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {
                                return '<span style="text-decoration: line-through; color:red;">' + data + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //10
                    {
                        title: "<span style='font-size:11px;'>จัดส่ง</span>",
                        data: "lov_deliverycost_code",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {
                                return '<span style="text-decoration: line-through; color:red;">' + data + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //11
                    {
                        title: "<span style='font-size:11px;'>ขนส่ง</span>",
                        data: "vendor_id",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {
                                return '<span style="text-decoration: line-through; color:red;">' + data + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //12
                    {
                        title: "<span style='font-size:11px;'>กล่อง</span>",
                        data: "packing_box_qty",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {
                                return '<span style="text-decoration: line-through; color:red;">' + data + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //13
                    {
                        title: "<span style='font-size:11px;'>บิล</span>",
                        data: "count_inv",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {
                                return '<span style="text-decoration: line-through; color:red;">' + data + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //14
                    {
                        title: "<span style='font-size:11px;'>รายการ</span>",
                        data: "item_list",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {
                                return '<span style="text-decoration: line-through; color:red;">' + data + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //15
                    {
                        title: "<span style='font-size:11px;'>item_verify</span>",
                        data: "item_verify",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {
                                return '<span style="text-decoration: line-through; color:red;">' + data + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //16
                    {
                        title: "<span style='font-size:11px;'>item_total</span>",
                        data: "item_total",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {
                                return '<span style="text-decoration: line-through; color:red;">' + data + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //17
                    {
                        title: "<span style='font-size:11px;'>ตรวจสอบ</span>",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {

                                return '<span style="text-decoration: line-through; color:red;">' + row.item_verify + ' / ' + row.item_total + '</span>';

                            } else {

                                let tx_color
                                let job_item_qty = row.item_verify
                                let job_item_trnqty = row.item_total
                                if (job_item_qty == 0) {
                                    tx_color = 'tx-danger';
                                } else if (job_item_qty < job_item_trnqty) {
                                    tx_color = 'tx-warning';
                                } else {
                                    tx_color = 'tx-success';
                                }
                                return '<span style="font-size:11px;" class="' + tx_color + '">' + row.item_verify + '</span>' +
                                    ' / ' + '<span style="font-size:11px;" class="tx-primary">' + row.item_total + '</span>';
                            }

                        }
                    }, //18
                    {
                        title: "<span style='font-size:11px;'>created_by</span>",
                        data: "created_by",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {
                                return '<span style="text-decoration: line-through; color:red;">' + data + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //19
                    {
                        title: "<span style='font-size:11px;'>created_datetime</span>",
                        data: "created_datetime",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {
                                return '<span style="text-decoration: line-through; color:red;">' + moment(data).format("YYYY/MM/DD HH:mm:ss") + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + moment(data).format("DD/MM/YYYY HH:mm:ss") + '<span/>';
                            }
                        }
                    }, //20
                    {
                        title: "<span style='font-size:11px;'>สินค้า</span>",
                        class: "tx-center align-middle",
                        data: "packing_item_status",
                        render: function (data, type, row, meta) {
                            let status;
                            let url_packing_job = url_job + "/trp/packing_item?job_no=" + row.packing_job_no + '&temp_id=' + row.temp_id

                            if (row.record_status != 0) {
                                if (data == 'PENDING') {
                                    status = '<a class="badge badge-warning" href="' + url_packing_job + '" target="_blank">รอ</a>'
                                } else if (data == 'SUCCESS') {
                                    status = '<a class="badge badge-success" href="' + url_packing_job + '" target="_blank">สำเร็จ</a>'
                                } else {
                                    status = '<span class="badge badge-secondary">-</span>';
                                }
                            } else {
                                if (data == 'PENDING') {
                                    status = '<span style="text-decoration: line-through; color:red;" class="badge badge-secondary">รอ</span>';
                                } else if (data == 'SUCCESS') {
                                    status = '<span style="text-decoration: line-through; color:red;" class="badge badge-secondary">สำเร็จ</span>';
                                } else {
                                    status = '<span style="text-decoration: line-through; color:red;" class="badge badge-secondary">-</span>';
                                }
                            }
                            return status;
                        }
                    }, //21
                    {
                        title: "<span style='font-size:11px;'>กล่อง</span>",
                        class: "tx-center align-middle",
                        data: "packing_status",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            let status;
                            let url_packing_job = url_job + "/trp/packing_item?job_no=" + row.packing_job_no + '&temp_id=' + row.temp_id

                            if (row.record_status != 0) {
                                if (row.packing_item_status == 'SUCCESS' && data == 'PENDING') {
                                    status = '<a class="badge badge-warning" href="' + url_packing_job + '" target="_blank">รอ</a>'
                                } else if (row.packing_item_status == 'SUCCESS' && data == 'SUCCESS') {

                                    if (row.share_box > 0) {
                                        status = '<a class="badge badge-info share_box" href="javascript:void(0)" id="bth-share_box">ใช้ร่วม</a>'

                                    } else {
                                        status = '<a class="badge badge-success" href="' + url_packing_job + '" target="_blank">สำเร็จ</a>'
                                    }

                                } else {
                                    status = '<span class="badge badge-secondary">-</span>';
                                }
                            } else {
                                if (data != 'SUCCESS') {
                                    status = '<span style="text-decoration: line-through; color:red;" class="badge badge-secondary">รอ</span>';
                                } else {
                                    status = '<span style="text-decoration: line-through; color:red;" class="badge badge-secondary">สำเร็จ</span>';
                                }
                            }
                            return status;
                        }
                    }, //22
                    {
                        title: "<span style='font-size:11px;'>ข้อมูล</span>",
                        class: "tx-center align-middle",
                        data: "event_status",
                        render: function (data, type, row, meta) {
                            let status;
                            let url_packing_job = url_job + "/trp/packing_job?packing_job_no=" + row.packing_job_no

                            if (row.record_status != 0) {
                                if (data != 'SUCCESS') {
                                    status = '<a class="badge badge-warning" href="' + url_packing_job + '" target="_blank">รอ</a>'
                                } else {
                                    status = '<a class="badge badge-success" href="' + url_packing_job + '" target="_blank">สำเร็จ</a>'
                                }
                            } else {
                                if (data != 'SUCCESS') {
                                    status = '<span style="text-decoration: line-through; color:red;" class="badge badge-secondary">รอ</span>';
                                } else {
                                    status = '<span style="text-decoration: line-through; color:red;" class="badge badge-secondary">สำเร็จ</span>';
                                }
                            }
                            return status;
                        }
                    }, //23
                    {
                        title: "<span style='font-size:11px;'>สถานะ</span>",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            let status;
                            if (row.record_status == 0) {
                                status = '<span class="badge badge-danger">ยกเลิก</span>';
                            } else {
                                status = '<span class="badge badge-primary">ใช้งาน</span>';
                            }
                            return status;
                        }
                    }, //24
                    {
                        title: "<span style='font-size:11px;'>record_status</span>",
                        data: "record_status",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //25
                    {
                        title: "<span style='font-size:11px;'>ผู้ตรวจสอบ</span>",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {
                                return '<span style="text-decoration: line-through; color:red;">' + row.created_by + '<br>' + moment(row.created_datetime).format("DD/MM/YYYY HH:mm:ss") + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + row.created_by + '<br>' + moment(row.created_datetime).format("DD/MM/YYYY HH:mm:ss") + '</span>';
                            }
                        }
                    }, //26
                    {
                        title: "<span style='font-size:11px;'>emmas_code</span>",
                        data: "emmas_code",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            if (row.record_status == 0) {
                                return '<span style="text-decoration: line-through; color:red;">' + data + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //27
                    {
                        title: "<span style='font-size:11px;'>share_box</span>",
                        data: "share_box",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                    }, //28
                ],
                "initComplete": function (settings, json) {

                    $.LoadingOverlay("hide", true);

                    $('#tbl-packing tbody').off('click', '.share_box').on('click', '.share_box', async function (evt) {

                        evt.preventDefault();

                        $(this).on('click', function (evt) {
                            evt.preventDefault();
                        });

                        var citem = tbl_packing.row($(this).parents('tr')).data();

                        console.log('citem', citem)

                        await $.Packing_Share_Box_Detail(citem);

                        await $('#modal-frm_remark').modal({
                            keyboard: false,
                            backdrop: 'static'
                        });

                    });

                    $.contextMenu({
                        selector: '#tbl-packing tbody tr',
                        callback: async function (key, options) {

                            let citem = tbl_packing.row(this).data();

                            if (key === 'view') {

                                await $.Packing_Detail(citem);

                            } else if (key === 'edit') {

                                if (citem['record_status'] == 0) {

                                    toastr.error('รายการนี้ถูกยกเลิกแล้ว');

                                } else {

                                    await $.Packing_Edit(citem);

                                }

                            } else if (key === 'item') {

                                if (citem['record_status'] == 0) {

                                    toastr.error('รายการนี้ถูกยกเลิกแล้ว');

                                } else {

                                    if (citem['event_status'] != 'SUCCESS') {
                                        toastr.error('บิลยังไม่สมบรูณ์');
                                    } else {
                                        await $.Packing_Item(citem);
                                    }

                                }

                            } else if (key === 'share') {

                                if (citem['record_status'] == 0) {

                                    toastr.error('รายการนี้ถูกยกเลิกแล้ว');
                                    console.log('share 1')

                                } else {

                                    if (citem['event_status'] != 'SUCCESS') {

                                        toastr.error('บิลยังไม่สมบรูณ์');
                                        console.log('share 2')

                                    } else {

                                        $('#box_job_no').html(citem['packing_job_no'])

                                        if (citem['event_status'] == 'SUCCESS' && citem['packing_status'] == 'PENDING' && citem['packing_item_status'] == 'SUCCESS') {

                                            if (citem['share_box'] > 0) {

                                                $('#frm_remark').find('#btn-save').addClass('d-none')
                                                await $.Packing_Share_Box_Detail(citem);
                                                console.log('share 11')

                                            } else {

                                                $('#frm_remark').find('input').val('').prop('disabled', true);
                                                $('#frm_remark').find('textarea').val('').prop('disabled', false);
                                                $('#frm_remark').find('select').prop('disabled', false);
                                                $('#frm_remark').find('#btn-save').addClass('d-none')
                                                $('#frm_remark').find('.checkbox').attr('checked', false);

                                                await $.Box_Check_Get(citem);

                                                await $.Packing_Share_Box_Create(citem);
                                                console.log('share 11')

                                            }

                                            await $('#modal-frm_remark').modal({
                                                keyboard: false,
                                                backdrop: 'static'
                                            });

                                        } else if (citem['event_status'] == 'SUCCESS' && citem['packing_status'] == 'SUCCESS' && citem['packing_item_status'] == 'SUCCESS') {

                                            if (citem['share_box'] > 0) {

                                                $('#frm_remark').find('#btn-save').addClass('d-none')

                                                await $.Packing_Share_Box_Detail(citem);

                                                await $('#modal-frm_remark').modal({
                                                    keyboard: false,
                                                    backdrop: 'static'
                                                });
                                                console.log('share 21')

                                            } else {

                                                toastr.error('ไม่สามารถบรรจุกล่องร่วมได้');
                                                console.log('share 22')

                                            }

                                        } else {

                                            toastr.error('สินค้าไม่สมบรูณ์');
                                            console.log('share 31')

                                        }

                                        //await $.Packing_Comment(citem);

                                    }

                                }

                            } else if (key === 'delete') {

                                if (citem['record_status'] == 0) {

                                    toastr.error('รายการนี้ถูกยกเลิกแล้ว');

                                    await $.Packing_Delete_Remark(citem);

                                } else {

                                    if (user_id != 'suwannee.p' && user_id != 'paranyou.l') {

                                        toastr.error('ไม่พบสิทธิ์การยกเลิกเออกสาร');

                                    } else {

                                        await $.Packing_Delete(citem);

                                    }
                                }

                            } else if (key === 'remark') {

                                if (citem['record_status'] == 0) {

                                    toastr.error('รายการนี้ถูกยกเลิกแล้ว');

                                } else {

                                    //if (user_id != 'suwannee.p' && user_id != 'paranyou.l') {

                                    //    toastr.error('ไม่พบสิทธิ์การยกเลิกเออกสาร');

                                    //} else {
                                    //$('#description_job_no').val(citem['packing_job_no']);

                                    await $.Packing_Remark(citem);

                                    //}
                                }

                            } else {

                                alert('ERROR');

                            }
                        },
                        items: {
                            "view": { name: "รายละเอียด", icon: "fas fa-search" },
                            "edit": { name: "แก้ไข", icon: "fas fa-edit" },
                            "item": { name: "สินค้า", icon: "fas fa-box" },
                            "share": { name: "ใช้กล่องร่วม", icon: "fas fa-plus-square" },
                            "remark": { name: "หมายเหตุ/ใบปะ", icon: "fas fa-file-signature" },
                            "delete": { name: "ลบ", icon: "delete" },
                        }
                    });

                },
            });

        }
    })

};

$.Packing_Detail = async function (citem) {

    await $('#modal-frm_data').modal({
        keyboard: false,
        backdrop: 'static'
    });

    fetch(url_Trp_Packing_Detail + '?packing_job_no=' + citem['packing_job_no']).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log('result', result.data)

        if (result.length > 0) {

            $.each(result.data, function (key, val) {

                var packing_job_date = moment(val['packing_job_date'], 'YYYY/MM/DD').format('DD/MM/YYYY')


                $('#inv_date').val(packing_job_date);
                $('#pck_number').val(val['packing_job_no']);
                $('#pck_user').val(val['created_by']);
                $('#transport_start').val(val['emmas_sender_name']).trigger('change');
                $('#transport_end').val(val['packing_delivery_name']);
                $('#customer_code').val(val['emmas_code']);
                $('#delivery_address').val(val['packing_delivery_emlocation']);
                $('#shipping_company').val(val['vendor_id']).trigger('change');
                $('#freight').val(val['lov_deliverycost_code']);

                $('#pck_qty').val(val['packing_box_qty']);
                $('#size_A').val(val['packing_box_a']);
                $('#size_B').val(val['packing_box_b']);
                $('#size_C').val(val['packing_box_c']);
                $('#size_D').val(val['packing_box_d']);
                $('#size_E').val(val['packing_box_e']);
                $('#size_F').val(val['packing_box_f']);
                $('#size_Z').val(val['packing_box_z']);

                let i = result.length;

                var data_inv = [];

                $.each(result.data, function (key, val) {

                    let data = JSON.stringify(val)

                    data_inv.push([
                        val['packing_job_no'],
                        i,
                        val['salefile_startdate'],//moment(val['salefile_startdate'], 'YYYY/MM/DD').format('DD/MM/YYYY'),
                        //val['salefile_number'],
                        val['salefile_number'] + '<br>' + val['salefile_name'],
                        val['salefile_invpo'],
                        val['salefile_item'],
                        val['salefile_userid'],
                        "<div class='d-flex flex-row justify-content-center'>" +
                        "<button onclick='$.Invoice_Delete(" + data + ");' data-item='" + data + "' style='margin: .25rem .125rem; ' class='btn btn-outline-danger btn-sm delete_item' data-action='delete' id='delete_item" + i + "' type='button' disabled>ลบ</button>" +
                        "</div>",

                    ])

                    i--;

                });

                console.log('data_inv', data_inv)

                table_inv = $('#tbl-inv').DataTable({
                    "data": data_inv,
                    "dom": 'ifrtp',
                    autoWidth: true,
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
                        "visible": false

                    },
                    {
                        "targets": [1],
                        "searchable": false,
                        "class": "tx-center",
                    },
                    {
                        "targets": [2],
                        "searchable": false,
                        "class": "tx-center",
                        "render": function (data, type, row, meta) {
                            return (data != '0001-01-01T00:00:00' ? moment(data).format('DD/MM/YYYY HH:mm:ss') : '-');
                        }
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
                        "class": "tx-center",
                        //"visible": false

                    },
                    {
                        "targets": [6],
                        "searchable": false,
                        "class": "tx-center",
                        //"visible": false

                    },
                    {
                        "targets": [7],
                        "searchable": false,
                        "class": "tx-center",
                        //"visible": false

                    }],
                    "initComplete": function (settings, json) {

                    }
                });

                table_inv.columns.adjust();

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

$.Packing_Edit = async function (citem) {

    let url_packing_job = url_job + "/trp/packing_job?packing_job_no=" + citem['packing_job_no'];

    console.log(url_packing_job)

    window.open(url_packing_job, '_blank');

};

$.Packing_Item = async function (citem) {

    let url_packing_job = url_job + "/trp/packing_item?job_no=" + citem['packing_job_no'] + '&temp_id=' + citem['temp_id'];

    console.log(url_packing_job)

    window.open(url_packing_job, '_blank');

};

$.Packing_Delete = async function (citem) {

    console.log('citem', citem)

    $('#cancel_job_no').val(citem['packing_job_no']);

    await $('#modal-cancel_job').modal({
        keyboard: false,
        backdrop: 'static'
    });

    $('#btn-save_cancel').off('click').on('click', async function (e) {

        e.preventDefault();

        if ($('#cancel_txt').val() == '') {

            toastr.error('กรุณาป้อนข้อมูลก่อนบันทึก');
            $('#cancel_txt').addClass('bd-danger');

        } else {

            $('#cancel_txt').removeClass('bd-danger');

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

                    $('#btn-save_cancel').prop('disabled', true);

                    let data_update = {
                        temp_id: citem['temp_id'],
                        job_no: citem['packing_job_no'],
                        job_date: citem['packing_job_date'],
                        round: citem['packing_round'],
                        remark_date: moment().format("YYYY/MM/DD"),
                        remark_type: 'CANCEL_PACKING',
                        remark_text: $('#cancel_txt').val(),
                        created_by: user_id,
                    };

                    var params = [];
                    for (const i in data_update) {
                        params.push(i + "=" + encodeURIComponent(data_update[i]));
                    }

                    fetch(url_Trp_Packing_Remark_Create, {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        // mode: 'no-cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        body: params.join("&"),
                    }).then(data => {
                        return data.json();
                    }).then(result => {

                        console.log('result', result.data)

                        if (result.length > 0) {

                            $('#cancel_txt').prop('disabled', true);

                            let data_update = {
                                packing_job_no: citem['packing_job_no'],
                                updated_by: user_id,
                            };

                            var params = [];
                            for (const i in data_update) {
                                params.push(i + "=" + encodeURIComponent(data_update[i]));
                            }

                            fetch(url_Trp_Packing_Job_Temp_Delete, {
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
                                        $('#modal-cancel_job').modal('hide');
                                        $.Packing_List();

                                    }, 1000);

                                }

                            }).catch(error => {

                                toastr.error('Error, Please contact administrator.');

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

                            $('#btn-save_cancel').prop('disabled', false);
                        }

                    });

                } else {

                    swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                }

            });

        }

        return false;

    });
};

$.Packing_Delete_Remark = async function (citem) {

    console.log('citem', citem)

    $('#cancel_job_no').val(citem['packing_job_no']);

    await $('#modal-cancel_job').modal({
        keyboard: false,
        backdrop: 'static'
    });

    let url = new URL(url_Trp_Packing_Remark_List);

    url.search = new URLSearchParams({
        job_no: citem['packing_job_no'],
        //job_no: citem['packing_job_no'],
        remark_type: 'CANCEL_PACKING',
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log('result', result.data)

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $('#frm-cancel_job').find('input').prop('disabled', true)
            $('#frm-cancel_job').find('textarea').prop('disabled', true)
            $('#frm-cancel_job').find('#btn-save_cancel').prop('disabled', true)

            if (result.length > 0) {

                $('#cancel_txt').val(result.data[0]['remark_text']);

            }
        }

    });

};

$.Packing_Delete_OLD = async function (citem) {

    console.log('citem', citem)

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
                packing_job_no: citem['packing_job_no'],
                updated_by: user_id,
            };

            var params = [];
            for (const i in data_update) {
                params.push(i + "=" + encodeURIComponent(data_update[i]));
            }

            fetch(url_Trp_Packing_Job_Temp_Delete, {
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
                        $.Packing_List();

                    }, 1000);

                }

            }).catch(error => {

                toastr.error('Error, Please contact administrator.');

            });

        } else {

            swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

        }

    });

};

$.Packing_Comment_Detail = async function (job_no) {

    fetch(url_Trp_Packing_Detail + '?packing_job_no=' + job_no).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log('result', result.data)

        if (result.length > 0) {

            $.each(result.data, function (key, val) {

                $('#frm_remark').find('#invcode').val(val['emmas_code']);
                $('#frm_remark').find('#invname').val(val['emmas_sender_name']);
                $('#frm_remark').find('#invaddress').val(val['packing_delivery_emlocation']);
                $('#frm_remark').find('#pck_qty').val(val['packing_box_qty']);

                val['packing_box_a'] <= 0 ? $('#frm_remark').find('#size_A').prop('disabled', true) : $('#frm_remark').find('#size_A').prop('disabled', false);
                val['packing_box_b'] <= 0 ? $('#frm_remark').find('#size_B').prop('disabled', true) : $('#frm_remark').find('#size_B').prop('disabled', false);
                val['packing_box_c'] <= 0 ? $('#frm_remark').find('#size_C').prop('disabled', true) : $('#frm_remark').find('#size_C').prop('disabled', false);
                val['packing_box_d'] <= 0 ? $('#frm_remark').find('#size_D').prop('disabled', true) : $('#frm_remark').find('#size_D').prop('disabled', false);
                val['packing_box_e'] <= 0 ? $('#frm_remark').find('#size_E').prop('disabled', true) : $('#frm_remark').find('#size_E').prop('disabled', false);
                val['packing_box_f'] <= 0 ? $('#frm_remark').find('#size_F').prop('disabled', true) : $('#frm_remark').find('#size_F').prop('disabled', false);
                val['packing_box_z'] <= 0 ? $('#frm_remark').find('#size_Z').prop('disabled', true) : $('#frm_remark').find('#size_Z').prop('disabled', false);
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

$.Packing_Share_Box_Create = async function (citem) {

    $('#frm_remark').find('#btn-save').off('click').on('click', async function (e) {

        e.preventDefault();

        var numChecked = $("input:checkbox:checked").length;

        if (numChecked > 0) {

            let url = new URL(url_Trp_Packing_Share_Box_Create);

            url.search = new URLSearchParams({
                packing_job_id: citem['trans_id'],
                packing_job_no: citem['packing_job_no'],
                packing_share_job_id: $('#frm_remark').find('#job_no').val(),
                packing_share_job_no: $('#frm_remark').find('#job_no :selected').text(),
                packing_share_box_id: box_trans_id,
                packing_share_box_name: checkbox,
                packing_share_box_qty: $('#frm_remark').find('#pck_qty').val(),
                temp_id: citem['temp_id'],
                created_by: user_id,
                packing_share_desrcipt: $('#frm_remark').find('#remark').val(),
            });

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {

                console.log('result', result.data)

                if (result.length > 0) {

                    swal({
                        title: "สำเร็จ!",
                        text: "ทำรายการสำเร็จ",
                        type: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    });

                    $('#modal-frm_remark').modal('hide');

                    toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {
                        //table_bill.destroy();
                        //await location.reload();
                        $.Packing_List();

                    }, 1000);

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

        } else {

        }

    });

};

$.Packing_Share_Box_Detail = async function (citem) {

    $('#frm_remark').find('input').prop('disabled', true);
    $('#frm_remark').find('textarea').prop('disabled', true);
    $('#frm_remark').find('select').prop('disabled', true);
    $('#frm_remark').find('#btn-delete').removeClass('d-none')
    $('#box_job_no').html(citem['packing_job_no'])
    let url = new URL(url_Trp_Packing_Share_Box_Detail);

    url.search = new URLSearchParams({
        packing_job_no: citem['packing_job_no'],
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log('result', result.data)

        if (result.length > 0) {

            $.each(result.data, function (key, val) {

                $('#frm_remark').find("#job_no").append("<option value='" + val['packing_share_job_id'] + "' selected>" + val['packing_share_job_no'] + "</option>")

                $('#frm_remark').find('#invcode').val(val['emmas_code'])
                $('#frm_remark').find('#invname').val(val['emmas_sender_name'])
                $('#frm_remark').find('#invaddress').val(val['packing_delivery_emlocation'])
                $('#frm_remark').find('#pck_qty').val(val['packing_share_box_qty']);

                $('#frm_remark').find('#size_' + val['packing_share_box_name'].toUpperCase()).attr('checked', true);

                $('#frm_remark').find('#remark').val(val['packing_share_desrcipt']);

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

$.Packing_Share_Box_Delete = async function () {

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
                packing_job_no: $('#box_job_no').html(),
                updated_by: user_id,
            };

            var params = [];
            for (const i in data_update) {
                params.push(i + "=" + encodeURIComponent(data_update[i]));
            }

            fetch(url_Trp_Packing_Share_Box_Delete, {
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
                    $('#modal-frm_remark').modal('hide');
                    toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {
                        //table_bill.destroy();
                        //await location.reload();
                        $.Packing_List();

                    }, 1000);

                }

            }).catch(error => {

                toastr.error('Error, Please contact administrator.');

            });

        } else {

            swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

        }

    });

};

$.Packing_Remark = async function (citem) {

    await $('#modal-description').modal({
        keyboard: false,
        backdrop: 'static'
    });

    console.log('Packing_Remark', citem)

    $('#description_txt').removeClass('bd-danger');
    $('#description_job_no').val(citem['packing_job_no']);

    $.Packing_Remark_Create(citem)

    $.Packing_Remark_List(citem)

};

$.Packing_Remark_Create = async function (citem) {

    console.log('Packing_Remark_Create', citem)

    $('#btn-save_description').off('click').on('click', async function (e) {

        e.preventDefault();

        if ($('#description_txt').val() == '') {

            toastr.error('กรุณาป้อนข้อมูลก่อนบันทึก');
            $('#description_txt').addClass('bd-danger');

        } else {

            $('#description_txt').removeClass('bd-danger');

            let data_update = {
                temp_id: citem['temp_id'],
                job_no: citem['packing_job_no'],
                job_date: citem['packing_job_date'],
                round: citem['packing_round'],
                remark_date: moment().format("YYYY/MM/DD"),
                remark_type: 'COVER_SHEET',
                remark_text: $('#description_txt').val(),
                created_by: user_id,
            };

            var params = [];
            for (const i in data_update) {
                params.push(i + "=" + encodeURIComponent(data_update[i]));
            }

            fetch(url_Trp_Packing_Remark_Create, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params.join("&"),
            }).then(data => {
                return data.json();
            }).then(result => {

                console.log('result', result.data)

                if (result.length > 0) {

                    toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {

                        //$('#description_txt').prop('disabled', true);
                        $('#description_txt').val('');

                        $.Packing_Remark_List();

                    }, 500);

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

        }

        return false;

    });

};

$.Packing_Remark_List = async function (citem) {

    console.log('Packing_Remark_List', citem)

    let url = new URL(url_Trp_Packing_Remark_List);

    url.search = new URLSearchParams({
        job_no: $('#description_job_no').val(),
        //job_no: citem['packing_job_no'],
        remark_type: 'COVER_SHEET',
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log('result', result.data)

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            table_description = $('#table-description').DataTable({
                data: result.data,
                dom: 'frtlip',
                deferRender: true,
                ordering: true,
                pageLength: 5,
                bDestroy: true,
                autoWidth: false,
                lengthMenu: [
                    [5, 10, 25, 50, -1],
                    ['5 rows', '10 rows', '25 rows', '50 rows', 'Show all']
                ],
                columns: [
                    {
                        title: "ลำดับ",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return meta.row + 1
                        }
                    }, //0
                    {
                        title: "วันที่-เวลา",
                        data: "created_datetime",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data, 'YYYY/MM/DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss') + '<span/>';
                        }
                    }, //2
                    {
                        title: "หมายเหตุ",
                        data: "remark_text",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //2
                    {
                        title: "สถานะ",
                        data: "record_status",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            let status
                            if (data == 0) {
                                status = '<a class="badge badge-danger" href="javascript:void(0)">ไม่ใช้งาน</a>'
                            } else {
                                status = '<a class="badge badge-primary" href="javascript:void(0)">ใช้งาน</a>'
                            }
                            return status;
                        }
                    }, //2
                ],
                "initComplete": function (settings, json) {

                    $("#global-loader").fadeOut("slow");

                },
            });

        }

    });

};

$.Master_Get = async function () {

    let url_Master = new URL(url_Packing_Master);

    $('#emmas_code').select2({
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

    url_Master.search = new URLSearchParams({
        mode: 'VENDOR',
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

            $('#frm_data').find('#shipping_company').select2({
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

            $('#frm_search').find('#lov_deliverycost_code').select2({
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

            $('#frm_search').find('#created_by').select2({
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
