'use strict';

const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const application_id = objProfile[0]['application'];
const user_id = objProfile[0]['username'];
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const url_api = "http://localhost:49705";
//const url_api = "http://192.168.1.247:8899/ivc-api";
//const url_job = "http://192.168.1.247:8099";
const url_master_data_get = url_api + "/api/MasterData_Get";
const url_loscan_import_data_tmp = url_api + "/api/Loscan_Import_Data_Tmp";
const url_loscan_import_data_check = url_api + "/api/Loscan_Import_Data_Check";
const url_loscan_import_data_tmptran = url_api + "/api/Loscan_Import_Data_TmpTran";
const url_loscan_import_data_tmpverify = url_api + "/api/Loscan_Import_Data_TmpVerify";
const url_loscan_import_data_upload = url_api + "/api/Loscan_Import_Data_Upload";
const url_loscan_list = url_api + "/api/Loscan_List";
const url_loscan_detail = url_api + "/api/Loscan_Detail";
const url_loscan_delete = url_api + "/api/Loscan_Delete";

let template_url = 'http://192.168.1.247/template/';
var temp_id;
let table_upload, table_loscan_list, table_detail;

const customElement = $("<div>", {
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

    await $.init();
    await $.Loscan_List();
    await $.Master_Get('USER_SCAN');

});

$.init = async function () {

    $('#frm_upload').find('#scan_date').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        },
    });

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

    $('#modal-frm_upload').off('shown.bs.modal').on('shown.bs.modal', async function (evt) {

        evt.preventDefault();

        temp_id = $.uuid();

    });

    $('#modal-frm_upload').off('hidden.bs.modal').on('hidden.bs.modal', async function (evt) {

        evt.preventDefault();

        temp_id = ''

        await location.reload();

    });

    $('#frm_upload').find('#user_scan').on('change', async function (evt) {

        evt.preventDefault();

        if ($('#frm_upload').find('#job_date').val() !== '' && $(this).val() !== '') {

            $('.custom-file').parent().removeClass('d-none')

            await $.File_Ready();

        } else {

            $('.custom-file').parent().addClass('d-none')

        }

    });

    $('.btn-action').off('click').on('click', async function (evt) {

        evt.preventDefault();

        let action_id = evt.target.id

        if (action_id == 'btn-upload') {

            $('#' + action_id).prop('disabled', true);

            await $.File_Check();

        }

    });

    $('#frm_search').submit(async function (evt) {

        evt.preventDefault();

        $(".card-body").LoadingOverlay("show", {
            image: '',
            custom: customElement
        });

        $.Loscan_List();

    });

    $('#btn-report_verify').off('click').on('click', async function (e) {

        e.preventDefault();

        let url = 'http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_VERIFY_LOSCAN_TR&rs:Command=Render';

        window.open(url, '_blank');

    });

    $('#btn-report_loscan').off('click').on('click', async function (e) {

        e.preventDefault();

        let url = 'http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_LOSCAN&rs:Command=Render';

        window.open(url, '_blank');

    });

    $('#btn_downloadtemplate').on('click', function (evt) {

        location.href = template_url + 'Template_Loscan.xlsx';

    });
};

$.Master_Get = async function (mode) {

    if (mode == 'USER_SCAN') {

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

$.File_Ready = async function () {

    $('#frm_upload').find('#customFile').off('change').on('change', async function (evt) {

        evt.preventDefault();

        $(".modal-body").LoadingOverlay("show", {
            image: '',
            custom: customElement
        });

        var path = $(this).val();
        var fileName = path.replace(/^.*\\/, "");
        $(this).next('.custom-file-label').html(fileName);

        if ($(this).val() !== '') {

            $('#frm_upload').find("#customFile").prop('disabled', true);
            $('#frm_upload').find('#scan_date').prop('disabled', true);
            $('#frm_upload').find('#user_scan').prop('disabled', true);

            readXlsxFile(this.files[0], { dateFormat: 'YYYY/MM/DD_hh:mm:ss' }).then(async function (result) {

                if (result.length > 2) {

                    toastr.warning('กำลังตรวจสอบข้อมูล');

                    let citem_upload = [];
                    let citem_ = [];
                    var evens = [];
                    var odds = [];

                    let count_error = 0

                    await $.each(result, async function (key, val) {

                        if (($.trim(key) % 2) != 1) {

                            if ($.trim(val) !== "Loscan") {
                                odds.push($.trim(val));
                            }
                            //let raw = $.trim(val)
                            //if (raw.substring(0, 1) != 'F') {
                            //    count_error ++
                            //}
                            //evens.push({ a: $.trim(val) });
                        }
                        else {
                            evens.push($.trim(val));
                            //odds.push({ b: $.trim(val) });
                        }

                    });

                    let arr_scan = [];
                    let scan_date = moment($('#frm_upload').find('#scan_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')
                    let user_scan = $('#frm_upload').find('#user_scan').val()

                    for (let i = 0; i < evens.length; i++) {

                        arr_scan.push({
                            temp_id: temp_id,
                            scan_date: scan_date,
                            user_scan: user_scan,
                            wh: evens[i].substring(0, 2),
                            location: evens[i],
                            barcode: odds[i],
                            remarks: '',
                            action_type: 'CREATE',
                            created_by: user_id
                        });

                    }

                    console.log('arr_scan', arr_scan);

                    let count_length = arr_scan.length

                    let add_data = {
                        temp_id: temp_id,
                        countitem_all: count_length,
                        created_by: user_id,
                    };

                    console.log('add_data', add_data)

                    var params = [];
                    for (const i in add_data) {
                        params.push(i + "=" + encodeURIComponent(add_data[i]));
                    }

                    fetch(url_loscan_import_data_tmp, {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        // mode: 'no-cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        body: params.join("&"),
                    }).then(data => {
                        return data.json();
                    }).then(result => {

                        console.log(result.data)

                        if (result.status === 'Error') {

                            $(".modal-body").LoadingOverlay("hide", true);

                            toastr.error('เกิดข้อผิดพลาด!');

                            swal(
                                {
                                    title: 'เกิดข้อผิดพลาด!',
                                    text: 'กรุณาติดต่อเจ้าหน้าที่!',
                                    type: 'error',
                                    confirmButtonColor: '#57a94f'
                                }
                            )

                        } else {

                            $.ajax({
                                url: url_loscan_import_data_tmptran,
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                data: JSON.stringify(arr_scan),
                                success: function (result_tmptran) {

                                    if (result_tmptran.status === 'Error') {

                                        $(".modal-body").LoadingOverlay("hide", true);

                                        toastr.error('เกิดข้อผิดพลาด!');

                                        swal(
                                            {
                                                title: 'เกิดข้อผิดพลาด!',
                                                text: 'กรุณาติดต่อเจ้าหน้าที่!',
                                                type: 'error',
                                                confirmButtonColor: '#57a94f'
                                            }
                                        )

                                    } else {

                                        fetch(url_loscan_import_data_tmpverify + '?temp_id=' + temp_id).then(function (response) {

                                            return response.json();

                                        }).then(function (result_tmpverify) {

                                            if (result_tmpverify.status === 'Error') {

                                                $(".modal-body").LoadingOverlay("hide", true);

                                                toastr.error('เกิดข้อผิดพลาด!');

                                                swal(
                                                    {
                                                        title: 'เกิดข้อผิดพลาด!',
                                                        text: 'กรุณาติดต่อเจ้าหน้าที่!',
                                                        type: 'error',
                                                        confirmButtonColor: '#57a94f'
                                                    }
                                                )

                                            } else {

                                                console.log('result_tmpverify', result_tmpverify.data)

                                                $('#table-upload').parent().parent().removeClass('d-none')

                                                table_upload = $('#table-upload').DataTable({
                                                    data: result_tmpverify.data,
                                                    dom: 'Bfrtip',
                                                    language: {
                                                        search: "_INPUT_",
                                                        searchPlaceholder: "ค้นหา..."
                                                    },
                                                    deferRender: true,
                                                    ordering: true,
                                                    pageLength: 10,
                                                    bDestroy: true,
                                                    //autoWidth: true,
                                                    buttons: [
                                                        'copyHtml5',
                                                        {
                                                            extend: 'excelHtml5',
                                                            title: '',
                                                            filename: 'LOSCAN_VERIFY_' + fileName + '_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                                                            exportOptions: {
                                                                columns: [0, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
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
                                                        }, //0
                                                        {
                                                            title: "<span class='tx-12'>trans_id</span>",
                                                            data: "trans_id",
                                                            class: "tx-center align-middle",
                                                            visible: false,
                                                            render: function (data, type, row, meta) {
                                                                return '<span class="tx-12">' + data + '</span>';
                                                            }
                                                        }, //1
                                                        {
                                                            title: "<span class='tx-12'>temp_id</span>",
                                                            data: "temp_id",
                                                            class: "tx-center align-middle",
                                                            visible: false,
                                                            render: function (data, type, row, meta) {
                                                                return '<span class="tx-12">' + data + '</span>';
                                                            }
                                                        }, //2
                                                        {
                                                            title: "<span class='tx-12'>วันที่สแกน</span>",
                                                            data: "scan_date",
                                                            class: "tx-center align-middle",
                                                            visible: false,
                                                            render: function (data, type, row, meta) {
                                                                return '<span class="tx-12">' + moment(data, 'YYYY/MM/DD').format('DD/MM/YYYY') + '</span>';
                                                            }
                                                        }, //3
                                                        {
                                                            title: "<span class='tx-12'>ผู้สแกน</span>",
                                                            data: "user_scan",
                                                            class: "tx-center align-middle",
                                                            visible: false,
                                                            render: function (data, type, row, meta) {
                                                                return '<span class="tx-12">' + data + '</span>';
                                                            }
                                                        }, //4
                                                        {
                                                            title: "<span class='tx-12'>รหัสสินค้า</span>",
                                                            data: "code",
                                                            class: "tx-left align-middle",
                                                            width: "150px",
                                                            //visible: false,
                                                            render: function (data, type, row, meta) {
                                                                return '<span class="tx-12">' + data + '</span>';
                                                            }
                                                        }, //6
                                                        {
                                                            title: "<span class='tx-12'>ชื่อสินค้า</span>",
                                                            data: "name",
                                                            class: "tx-left align-middle",
                                                            //visible: false,
                                                            render: function (data, type, row, meta) {
                                                                return '<span class="tx-12">' + data + '</span>';
                                                            }
                                                        }, //6
                                                        {
                                                            title: "<span class='tx-12'>เลขอะไหล่</span>",
                                                            data: "spcodes",
                                                            class: "tx-left align-middle",
                                                            render: function (data, type, row, meta) {
                                                                return '<span class="tx-12">' + data + '</span>';
                                                            }
                                                        }, //6
                                                        {
                                                            title: "<span class='tx-12'>บาร์โค้ด</span>",
                                                            data: "barcode",
                                                            class: "tx-left align-middle",
                                                            render: function (data, type, row, meta) {
                                                                return '<span class="tx-12">' + data + '</span>';
                                                            }
                                                        }, //6
                                                        {
                                                            title: "<span class='tx-12'>คลัง</span>",
                                                            data: "wh",
                                                            class: "tx-left align-middle",
                                                            render: function (data, type, row, meta) {
                                                                return '<span class="tx-12">' + data + '</span>';
                                                            }
                                                        }, //5
                                                        {
                                                            title: "<span class='tx-12'>ที่ตั้ง</span>",
                                                            class: "tx-left align-middle",
                                                            data: "location",
                                                            render: function (data, type, row, meta) {
                                                                let status
                                                                if (row.text_status == 'INVALID_ADDRESS') {
                                                                    status = '<span class="tx-12 tx-bold tx-orange">' + data + '</span>'
                                                                } else {
                                                                    status = '<span class="tx-12 tx-bold">' + data + '</span>'
                                                                }
                                                                return status;
                                                            }
                                                        }, //row
                                                        {
                                                            title: "<span class='tx-12'>ที่ตั้ง (DATA)</span>",
                                                            class: "tx-left align-middle",
                                                            data: "glocat",
                                                            render: function (data, type, row, meta) {
                                                                return '<span class="tx-12 tx-bold">' + data + '</span>';
                                                            }
                                                        }, //row
                                                        {
                                                            title: "<span class='tx-12'>สถานะ</span>",
                                                            data: "text_status",
                                                            class: "tx-center align-middle",
                                                            render: function (data, type, row, meta) {
                                                                let status
                                                                if (data == 'SUCCESS') {
                                                                    status = '<span class="badge badge-success">' + 'SUCCESS' + '</span>'
                                                                } else if (data == 'INVALID_ADDRESS' || data == 'DUPLICATE_BARCODE') {
                                                                    status = '<span class="badge badge-warning">' + 'WARNING' + '</span>'
                                                                } else {
                                                                    status = '<span class="badge badge-danger">' + 'ERROR' + '</span>'
                                                                }
                                                                return status;
                                                            },
                                                        }, //8
                                                        {
                                                            title: "<span class='tx-12'>รายละเอียด</span>",
                                                            data: "text_status",
                                                            class: "tx-left align-middle",
                                                            render: function (data, type, row, meta) {
                                                                let status
                                                                if (data == 'INVALID_ADDRESS') {
                                                                    status = '<span class="">' + 'ที่อยู่สินค้าไม่ตรงกัน' + '</span>'
                                                                } else if (data == 'INVALID_WH') {
                                                                    status = '<span class="">' + 'ไม่พบคลัง' + '</span>'
                                                                } else if (data == 'INVALID_BARCODE') {
                                                                    status = '<span class="">' + 'ไม่พบบาร์โค้ด' + '</span>'
                                                                } else if (data == 'INVALID_LOCATION') {
                                                                    status = '<span class="">' + 'ไม่พบที่อยู่สินค้า' + '</span>'
                                                                } else if (data == 'DUPLICATE_BARCODE') {
                                                                    status = '<span class="">' + 'พบบาร์โค้ดนี้ ถูกสร้างแล้ว' + '</span>'
                                                                } else {
                                                                    status = '<span class="">' + 'ข้อมูลสมบรูณ์' + '</span>'
                                                                }
                                                                return status;
                                                            },
                                                        }, //8
                                                        {
                                                            title: "<span class='tx-12'>จัดการ</span>",
                                                            data: "action_type",
                                                            class: "tx-center align-middle",
                                                            visible: false,
                                                            render: function (data, type, row, meta) {
                                                                return '<span class="tx-12">' + data + '</span>';
                                                            }
                                                        }, //7
                                                    ],
                                                    "initComplete": function (settings, json) {

                                                        $('#frm_upload').find('#table-upload').parent().parent().removeClass('d-none')
                                                        $('#btn-upload').removeClass('d-none')

                                                        let item_success = 0;
                                                        let item_warning = 0;
                                                        let i = 0
                                                        let count_error = 0;

                                                        $.each(result_tmpverify.data, function (key, val) {

                                                            if (val['text_status'] != 'SUCCESS') {
                                                                item_warning++
                                                            } else if (val['text_status'] == 'SUCCESS') {
                                                                item_success++
                                                            }

                                                            if (val['text_status'] != 'SUCCESS' && val['text_status'] != 'INVALID_ADDRESS' && val['text_status'] != 'DUPLICATE_BARCODE') {
                                                                count_error++
                                                            }

                                                            i++

                                                        });

                                                        $('#frm_upload').find('#item_total').html(i);
                                                        $('#frm_upload').find('#item_success').html(item_success);
                                                        $('#frm_upload').find('#item_warning').html(item_warning);

                                                        if (count_error > 0) {

                                                            $('#btn-upload').prop('disabled', true)
                                                        }

                                                        $(".modal-body").LoadingOverlay("hide", true);
                                                    },

                                                });

                                            }

                                        });

                                    }

                                }

                            });

                        }

                    });

                } else {

                    $(".modal-body").LoadingOverlay("hide", true);

                    toastr.error('ไม่พบช้อมูลในเอกสาร');

                }

            }).catch((error) => {

                $(".modal-body").LoadingOverlay("hide", true);
                toastr.error(error, 'Error writing document');
                $('#customFile').prop('disabled', false)

            });

        }

    });

};

$.File_Check = async function () {

    let scan_date = moment($('#frm_upload').find('#scan_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')
    let user_scan = $('#frm_upload').find('#user_scan').val();

    let url = new URL(url_loscan_import_data_check);

    url.search = new URLSearchParams({
        scan_date: scan_date,
        user_scan: user_scan,
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            $(".modal-body").LoadingOverlay("hide", true);

            toastr.error('เกิดข้อผิดพลาด!');

            swal(
                {
                    title: 'เกิดข้อผิดพลาด!',
                    text: 'กรุณาติดต่อเจ้าหน้าที่!',
                    type: 'error',
                    confirmButtonColor: '#57a94f'
                }
            )

        } else {

            if (result.data[0]['pMessage'] == 'DUPLICATE') {

                $(".modal-body").LoadingOverlay("hide", true);

                swal({
                    title: "พบผู้สแกนอัพโหลดข้อมูลแล้ว !",
                    text: "ท่านต้องการบันทึกเอกสารนี้หรือไม่",
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

                        $.Loscan_Delete('UPLOAD', scan_date, user_scan);

                    } else {

                        swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                        $('#modal-frm_upload').find('#user_scan').trigger('change').val('')

                    }

                });

            } else {

                $(".modal-body").LoadingOverlay("show", {
                    image: '',
                    custom: customElement
                });

                $.File_Upload();

            }

        }

    });

};

$.File_Upload = async function () {

    let url = new URL(url_loscan_import_data_upload);

    url.search = new URLSearchParams({
        temp_id: temp_id,
        countitem_incomplete: $('#item_warning').html(),
        countitem_complete: $('#item_success').html(),
        countitem_updated: $('#item_total').html(),
        updated_by: user_id
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        if (result.status === 'Error') {

            $(".modal-body").LoadingOverlay("hide", true);

            toastr.error('เกิดข้อผิดพลาด!');

            swal(
                {
                    title: 'เกิดข้อผิดพลาด!',
                    text: 'กรุณาติดต่อเจ้าหน้าที่!',
                    type: 'error',
                    confirmButtonColor: '#57a94f'
                }
            )

        } else {

            $(".modal-body").LoadingOverlay("hide", true);

            toastr.success('อัพโหลดสำเร็จ');

            swal({
                title: "สำเร็จ!",
                text: "ทำรายการสำเร็จ",
                type: 'success',
                timer: 2000,
                showConfirmButton: false
            });

        }

        return false;

    });

};

$.Loscan_List = async function () {

    let url = new URL(url_loscan_list);

    let trndate_start = $('#job_date').val() != '' ? moment($('#job_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment().add(-1, 'days').format('YYYY-MM-DD') + ' 00:00';
    let trndate_end = $('#job_date').val() != '' ? moment($('#job_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';

    url.search = new URLSearchParams({
        job_date_start: trndate_start,
        job_date_end: trndate_end,
        wh: $('#frm_search').find('#wh').val(),
        user_scan: $('#frm_search').find('#user_scan').val(),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        $(".card-body").LoadingOverlay("hide", true);

        if (result.status === 'Error') {

            swal({
                title: "ขออภัย",
                text: "เกิดข้อผิดพลาด",
                type: 'error',
                timer: 2000,
                showConfirmButton: false
            });

            toastr.error('ขออภัย!');

        } else {

            table_loscan_list = $('#table_loscan_list').DataTable({
                data: result.data,
                dom: 'Bfrtip',
                deferRender: true,
                //ordering: true,
                pageLength: 10,
                bDestroy: true,
                autoWidth: false,
                buttons: [
                    'copyHtml5',
                    {
                        extend: 'excelHtml5',
                        title: '',
                        filename: 'LOSCAN_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                        exportOptions: {
                            columns: [2, 3, 5, 6, 7, 8, 9]
                        }
                    },
                ],
                order: [[10, 'asc']],
                columns: [
                    {
                        title: "<span class='tx-12'>#</span>",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            let action_download = 'download_file'
                            let action_delete = 'delete_file'
                            return '<a class="' + action_download + '" href="javascript:void(0)" data-toggle="tooltip" title="" data-original-title="Download item"><i class="las la-download tx-primary tx-20"></i></a>'
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>temp_id</span>",
                        data: "temp_id",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //0
                    {
                        title: "<span class='tx-12'>วันที่เอกสาร</span>",
                        data: "scan_date",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + moment(data, 'YYYY/MM/DD').format('DD/MM/YYYY') + '</span>';
                        }
                    }, //0
                    {
                        title: "<span class='tx-12'>ผู้ตรวจสอบ</span>",
                        data: "user_scan",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12 tx-bold">' + data + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>คลัง</span>",
                        data: "wh",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>สินค้า</span>",
                        data: "item_qty",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + numberWithCommas(data) + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>ไม่สมบรูณ์</span>",
                        data: "item_warning",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + numberWithCommas(data) + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>สมบรูณ์</span>",
                        data: "item_success",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + numberWithCommas(data) + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>ผู้อัพโหลด</span>",
                        data: "created_by",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>เวลาอัพโหลด</span>",
                        data: "created_datetime",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + moment(data, 'YYYY/MM/DD h:mm:ss').format('DD/MM/YYYY h:mm:ss a') + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>อัพโหลด โดย/เวลา</span>",
                        data: "scan_date",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + row.created_by + '<br>' + moment(row.created_datetime, 'YYYY/MM/DD h:mm:ss').format('DD/MM/YYYY h:mm:ss a') + '</span>';

                        }
                    }, //0
                ],
                "initComplete": function (settings, json) {

                    $.contextMenu({
                        selector: '#table_loscan_list tbody tr',
                        callback: async function (key, options) {

                            let citem = table_loscan_list.row(this).data();

                            if (key === 'view') {

                                await $('#modal-frm_detail').modal({
                                    keyboard: false,
                                    backdrop: 'static'
                                });

                                await $.Loscan_Detail(citem);

                            } else if (key === 'delete') {

                                await $.Loscan_Delete('SINGLE', citem['scan_date'], citem['user_scan']);

                            } else {

                                alert('ERROR');

                            }
                        },
                        items: {
                            "view": { name: "View", icon: "fas fa-search" },
                            "delete": { name: "Delete", icon: "delete" },
                        }
                    });

                },
            });

        }
    })

};

$.Loscan_Detail = async function (citem) {

    $(".modal-body").LoadingOverlay("show", {
        image: '',
        custom: customElement
    });

    let url = new URL(url_loscan_detail);

    url.search = new URLSearchParams({
        scan_date: moment(citem['scan_date'], 'YYYY/MM/DD').format('YYYY/MM/DD'),
        user_scan: citem['user_scan']
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            $(".modal-body").LoadingOverlay("hide", true);

            toastr.error('เกิดข้อผิดพลาด!');

            swal(
                {
                    title: 'เกิดข้อผิดพลาด!',
                    text: 'กรุณาติดต่อเจ้าหน้าที่!',
                    type: 'error',
                    confirmButtonColor: '#57a94f'
                }
            )

        } else {

            console.log('result', result.data)

            $('#frm_detail').find('#scan_date').val(moment(citem['scan_date'], 'YYYY/MM/DD').format('YYYY/MM/DD')).prop('disabled', true)
            $('#frm_detail').find('#user_scan').val(citem['user_scan']).prop('disabled', true)

            let item_success = 0;
            let item_warning = 0;
            let i = 0

            $.each(result.data, function (key, val) {

                if (val['text_status'] == 'INVALID_ADDRESS') {
                    item_warning++
                } else if (val['text_status'] == 'SUCCESS') {
                    item_success++
                }

                i++

            });

            $('#frm_detail').find('.item_total').html(i);
            $('#frm_detail').find('.item_success').html(item_success);
            $('#frm_detail').find('.item_warning').html(item_warning);

            table_detail = $('#table_detail').DataTable({
                data: result.data,
                dom: 'Bfrtip',
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
                        filename: 'LOSCAN_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                        exportOptions: {
                            columns: [0, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13]
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
                    }, //0
                    {
                        title: "<span class='tx-12'>trans_id</span>",
                        data: "trans_id",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //1
                    {
                        title: "<span class='tx-12'>temp_id</span>",
                        data: "temp_id",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //2
                    {
                        title: "<span class='tx-12'>วันที่สแกน</span>",
                        data: "scan_date",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + moment(data, 'YYYY/MM/DD').format('DD/MM/YYYY') + '</span>';
                        }
                    }, //3
                    {
                        title: "<span class='tx-12'>ผู้สแกน</span>",
                        data: "user_scan",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<span class='tx-12'>รหัสสินค้า</span>",
                        data: "code",
                        class: "tx-left align-middle",
                        width: "150px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //6
                    {
                        title: "<span class='tx-12'>ชื่อสินค้า</span>",
                        data: "name",
                        class: "tx-left align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //6
                    {
                        title: "<span class='tx-12'>เลขอะไหล่</span>",
                        data: "spcodes",
                        class: "tx-left align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //6
                    {
                        title: "<span class='tx-12'>บาร์โค้ด</span>",
                        data: "barcode",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //6
                    {
                        title: "<span class='tx-12'>คลัง</span>",
                        data: "wh",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //5
                    {
                        title: "<span class='tx-12'>ที่ตั้ง</span>",
                        class: "tx-center align-middle",
                        data: "location",
                        render: function (data, type, row, meta) {
                            let status
                            if (row.text_status == 'INVALID_ADDRESS') {
                                status = '<span class="tx-12 tx-bold tx-orange">' + data + '</span>'
                            } else {
                                status = '<span class="tx-12 tx-bold">' + data + '</span>'
                            }
                            return status;
                        }
                    }, //row
                    {
                        title: "<span class='tx-12'>ที่ตั้ง (DATA)</span>",
                        class: "tx-center align-middle",
                        data: "glocat",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12 tx-bold">' + data + '</span>';
                        }
                    }, //row
                    {
                        title: "<span class='tx-12'>สถานะ</span>",
                        data: "text_status",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            let status
                            if (data == 'INVALID_ADDRESS') {
                                status = '<span class="badge badge-warning">' + 'WARNING' + '</span>'
                            } else {
                                status = '<span class="badge badge-success">' + 'SUCCESS' + '</span>'
                            }
                            return status;
                        },
                    }, //8
                    {
                        title: "<span class='tx-12'>รายละเอียด</span>",
                        data: "text_status",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            let status
                            if (data == 'INVALID_ADDRESS') {
                                status = '<span class="">' + 'ที่อยู่สินค้าไม่ตรงกัน' + '</span>'
                            } else {
                                status = '<span class="">' + 'ข้อมูลสมบรูณ์' + '</span>'
                            }
                            return status;
                        },
                    }, //8
                    {
                        title: "<span class='tx-12'>จัดการ</span>",
                        data: "action_type",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //7
                ],
                "initComplete": function (settings, json) {

                    $(".modal-body").LoadingOverlay("hide", true);

                },

            });

        }

    });

};

$.Loscan_Delete = async function (mode, scan_date, user_scan) {

    let data_update = {
        scan_date: scan_date,
        user_scan: user_scan,
    };

    var params = [];
    for (const i in data_update) {
        params.push(i + "=" + encodeURIComponent(data_update[i]));
    }

    fetch(url_loscan_delete, {
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

            if (result.length > 0) {

                toastr.error('ลบไม่สำเร็จ');

            } else {

                toastr.warning('ลบเสำเร็จ');

                if (mode == 'UPLOAD') {

                    $.File_Upload();

                } else {

                    $.Loscan_List();
                }

            }

        }

    }).catch(error => {

        toastr.error('Error, Please contact administrator.');

    });

};