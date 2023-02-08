'use strict';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const user_id = objProfile[0]['username'];
const url_auth_api = "http://192.168.1.247:8089";
const url_api = "http://localhost:49705";
const url_job = "http://localhost:57916";

const url_api_stmas = "http://192.168.1.247:8899/disc-api";
//const url_api = "http://192.168.1.247:8089";
const url_org_sys_employee_get = url_auth_api + '/v2/OrgSysEmployeeGet';
const url_auth_sys_user_get = url_auth_api + '/v2/AuthSysUserGet';

const url_stock_request_list = url_api + '/api/STOCK_REQUEST_LIST';
const url_stock_request_data_create = url_api + '/api/STOCK_REQUEST_DATA_CREATE';
const url_stock_request_data_delete = url_api + '/api/STOCK_REQUEST_DATA_DELETE';
const url_stock_request_data_update = url_api + '/api/STOCK_REQUEST_DATA_UPDATE';
const url_stock_request_data_detail = url_api + '/api/STOCK_REQUEST_DATA_DETAIL';
const url_stock_request_item_create = url_api + '/api/STOCK_REQUEST_ITEM_CREATE';
const url_stock_request_item_delete = url_api + '/api/STOCK_REQUEST_ITEM_DELETE';
const url_stock_request_log_list = url_api + '/api/STOCK_REQUEST_LOG_LIST';

const url_stmas_select2_search = url_api_stmas + "/v1/stmas_select2_search";

let url_frm_memo = 'http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fFRM_MEMO_STOCK_REQUEST&rs:Command=Render&rs:Format=pdf';
let url_report = 'http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_STOCK_REQUEST_LIST&rs:Command=Render';
let table_item, table_list, table_history, table_remark;
var ref_job_id, ref_job_no, job_type;
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

    $.Master_Data();

    $.List();

    $('.fc-datepicker').daterangepicker({
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

    $('.select2-no-search').select2({
        minimumResultsForSearch: Infinity,
    });

    $('#modal-frm_job').off('shown.bs.modal').on('shown.bs.modal', async function (e) {

        e.preventDefault();

        if ($('#job_type').val() == 'STOCK_REQUEST') {

            $('#job_item_text').removeAttr('required');
            $('#job_item_select2').attr('required');

        } else if ($('#job_type').val() == 'PRODUCT_REQUEST') {

            $('#job_item_select2').removeAttr('required');
            $('#job_item_text').attr('required');

        }

    });

    $('#modal-frm_job').off('hidden.bs.modal').on('hidden.bs.modal', async function () {

        await setTimeout(function () {

            window.history.pushState({}, document.title, "/" + "ivc/opt/stock_request");

            location.reload();

        }, 100);

    });

    $('#modal-frm_approval').off('shown.bs.modal').on('shown.bs.modal', async function (e) {

        e.preventDefault();

        await $('#frm_approval').parsley().reset();

        $('#frm_approval').find('#p_job_user_approval').val("").trigger('change');


    });

    $('#btn-report_stock_request').off('click').on('click', async function (evt) {

        evt.preventDefault();

        window.open(url_report, '_blank');

    });

    $('#job_type').on('change', function (e) {

        e.preventDefault();

        job_type = $(this).val();

        if (job_type == 'STOCK_REQUEST') {

            //$('#job_branch_end').val().trigger('change');

            $('#job_item_select2').parent().removeClass('d-none');
            $('#job_item_text').parent().addClass('d-none');

        } else if (job_type == 'PRODUCT_REQUEST') {

            $('#job_branch_end').val('VSK').trigger('change');

            $('#job_item_text').parent().removeClass('d-none');
            $('#job_item_select2').parent().addClass('d-none');

        }

    });

    $('.btn-action').off('click').on('click', function (e) {

        e.preventDefault();

        let action = $(this).attr('id')

        if (action == 'btn-save_data') {

            $('#btn-save_data').prop('disabled', true);

            $('#frm_data').parsley().validate();

            if ($('#frm_data').parsley().isValid()) {

                $('#frm_data').parsley().reset();

                $.Data_Create();

            } else {

                $('#btn-save_data').prop('disabled', false);

            }

        } else if (action == 'btn-edit_data') {

            $('#frm_data').find('#btn-edit_data').addClass('d-none');
            $('#frm_data').find('#btn-update_data_start').removeClass('d-none');

            $('#job_date').prop('disabled', false);
            $('#job_branch_start').prop('disabled', false);
            $('#job_branch_end').prop('disabled', false);
            $('#job_user_start').prop('disabled', false);
            $('#job_cause').prop('disabled', false);
            $('#frm_data').find('textarea').prop('disabled', false);

        } else if (action == 'btn-update_data_start') {

            $('#frm_data').parsley().validate();

            if ($('#frm_data').parsley().isValid()) {

                swal({
                    title: "โปรดยืนยันอีกครั้ง !",
                    text: "ต้องการการแก้ไขหัวเอกสารนี้หรือไม่",
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

                        $.Data_Update_Start();

                    } else {

                        swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                        //$.Data_Detail();

                    }

                });

            }

        } else if (action == 'btn-update_data_end') {

            if ($('#job_user_end').val() != '') {

                swal({
                    title: "โปรดยืนยันอีกครั้ง !",
                    text: "ต้องการการบันทึกรับเอกสารนี้หรือไม่",
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

                        $.Data_Update_End();

                    } else {

                        swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                    }

                });

            } else {

                swal("กรอกข้อมูลไม่ครบ", "กรุณาระบุผู้รับเอกสาร", "error");

            }

        } else if (action == 'btn-approval_data') {

            if ($('#job_user_approval').val() != '') {

                if (user_id == 'potjana.s' || user_id == 'paranyou.l') { //|| user_id == 'paranyou.l'

                    swal({
                        title: "โปรดยืนยันอีกครั้ง !",
                        text: "ต้องการการบันทึกรับเอกสารนี้หรือไม่",
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

                            $.Data_Update_Approval();

                        } else {

                            swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                        }

                    });

                } else {

                    swal("ไม่พบสิทธ์การอนุมัติ", "กรุณาติดต่อเจ้าหน้าที่", "error");

                }

            } else {

                swal("กรอกข้อมูลไม่ครบ", "กรุณาระบุผู้รับเอกสาร", "error");
            }

        } else if (action == 'btn-reset_data') {

            $('#frm_data').trigger('reset');
            $('#frm_data').parsley().reset();

        } else if (action == 'btn-save_item') {

            $('#btn-save_item').prop('disabled', true);

            $('#frm_item').parsley().validate();

            if ($('#frm_item').parsley().isValid()) {

                $('#frm_item').parsley().reset();

                $.Item_Create();

            } else {

                $('#btn-save_item').prop('disabled', false);

            }

        } else if (action == 'btn-reset_item') {

            $('#frm_item').trigger('reset');
            $('#frm_item').parsley().reset();

            $("#job_item_select2 option").remove();
            $("#job_item_select2").append("<option value=''>- เลือกสินค้า -</option>");
            $('#item_qty').val('1');
            $('#job_unit').val('');

        } else if (action == 'btn-save_job') {

            swal({
                title: "โปรดยืนยันอีกครั้ง !",
                text: "ต้องการการบันทึกเอกสารนี้หรือไม่",
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

                    $('#btn-save_job').prop('disabled', true);

                    $.Data_Job_Create();

                } else {

                    swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                    //$.Data_Detail();

                }

            });

        } else if (action == 'btn-item_create') {

            $('#modal-frm_job').modal({
                keyboard: false,
                backdrop: 'static'
            });

        } else if (action == 'btn-history_job') {

            $('#modal-history_job').modal({
                keyboard: false,
                backdrop: 'static'
            });

            $.History()

        } else if (action == 'btn-cancel_data') {


            if ($('#job_status').val() == 'OPEN') {

                $.Data_Delete();

            } else {

                if (user_id == 'potjana.s') { //|| user_id == 'paranyou.l'

                    $.Data_Delete();

                } else {

                    swal("ไม่พบสิทธ์การอนุมัติ", "กรุณาติดต่อเจ้าหน้าที่", "error");

                }

            }

        } else if (action == 'btn-report_sr') {

            let job_no = $('#job_no').val();

            $.Frm_Memo(job_no);

        }

    });

    $('#frm_search').submit(async function (e) {

        e.preventDefault();

        await $.List();

    });

});

$.Data_Create = async function () {

    let citem = {
        job_date: moment($('#job_date').val(), 'DD/MM/YYYY').format("YYYY/MM/DD"),
        job_branch_start: $('#job_branch_start').val(),
        job_branch_end: $('#job_branch_end').val(),
        job_user_start: $('#job_user_start').val(),
        //job_user_end: $('#job_user_end').val(),
        job_status: $('#job_status').val(),
        job_remark: $('#job_remark').val(),
        job_type: $('#job_type').val(),
        job_cause: $('#job_cause').val(),
        created_by: user_id,
    };

    var params = [];
    for (const i in citem) {
        params.push(i + "=" + encodeURIComponent(citem[i]));
    }

    fetch(url_stock_request_data_create, {
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

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            if (result.length > 0) {

                $('#job_no').val(result.data[0]['job_no']);

                if ((result.data[0]['pMessage']) != null) {

                    toastr.error(result.data[0]['pMessage'])

                } else {

                    toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {

                        //$('#btn-save_data').prop('disabled', false);

                        //window.location.assign(window.location.href + '?job_no=' + result.data[0]['job_no'])

                        $.Data_Detail(result.data[0]['job_no']);

                    }, 100);

                }

            } else {

                swal({
                    title: "ขออภัย",
                    text: "เกิดข้อผิดพลาด",
                    type: 'error',
                    timer: 2000,
                    showConfirmButton: false
                });

            }

        }

    });

    return false;

};

$.Data_Delete = async function () {

    swal({
        title: "โปรดยืนยันอีกครั้ง !",
        text: "ต้องการลบเอกสารนี้หรือไม่",
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

            let citem = {
                job_no: $('#job_no').val(),
                job_status: $('#job_status').val(),
                updated_by: user_id,
            };

            var params = [];
            for (const i in citem) {
                params.push(i + "=" + encodeURIComponent(citem[i]));
            }

            fetch(url_stock_request_data_delete, {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
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

                    toastr.error('Oops! An Error Occurred');

                } else {

                    if (result.length > 0) {

                        toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {

                            $('#modal-frm_job').modal('hide');

                        }, 100);

                    } else {

                        swal({
                            title: "ขออภัย",
                            text: "เกิดข้อผิดพลาด",
                            type: 'error',
                            timer: 2000,
                            showConfirmButton: false
                        });

                    }

                }

            });

        } else {

            swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

        }

    });

    return false;

};

$.Data_Detail = async function (data) {

    await $('#frm_data').parsley().reset();

    let url = new URL(url_stock_request_data_detail);

    url.search = new URLSearchParams({
        job_no: data
    });

    await fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log('result', result.data)

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            if (result.length > 0) {

                if (result.data[0]['detail_item_name'] != null) {
                    //$('#table-item').empty();
                    setTimeout(function () {
                        $.Data_Item_List(result);
                    }, 100);
                }

                let job_id;
                let job_no;
                let job_date;
                let job_branch_start;
                let job_branch_end;
                let job_user_start;
                let job_user_end;
                let job_user_approval;
                let job_status = '';
                let job_remark;
                let job_type;
                let job_cause;
                let event_status;
                let job_approval_datetime;
                let job_approval_by;
                let job_created_by;
                let job_created_datetime;
                let job_updated_by;
                let job_updated_datetime;

                $.each(result.data, function (key, val) {

                    ref_job_id = val['job_id'];
                    job_no = val['job_no'];
                    job_id = val['job_id'];
                    job_date = moment(val['job_date'], 'YYYY-MM-DD').format("DD/MM/YYYY");
                    job_branch_start = val['job_branch_start'];
                    job_branch_end = val['job_branch_end'];
                    job_user_start = val['job_user_start'];
                    job_user_end = val['job_user_end'];
                    job_user_approval = val['job_user_approval'];
                    job_status = val['job_status'];
                    job_remark = val['job_remark'];
                    job_type = val['job_type'];
                    job_cause = val['job_cause'];
                    event_status = val['event_status'];
                    job_approval_by = val['job_approval_by'];
                    job_approval_datetime = val['job_approval_datetime'];
                    job_created_by = val['job_created_byjob_created_by'];
                    job_created_datetime = val['job_created_datetime'];
                    job_updated_by = val['job_updated_by'];
                    job_updated_datetime = val['job_updated_datetime'];

                });

                $('.text-status').html(job_status);
                $('#job_no').val(data);
                $('#job_date').val(job_date);
                $('#job_branch_start').val(job_branch_start).trigger('change');
                $('#job_branch_end').val(job_branch_end).trigger('change');
                $('#job_user_start').val(job_user_start).trigger('change');
                $('#job_user_end').val(job_user_end).trigger('change');
                $('#job_user_approval').val(job_user_approval).trigger('change');
                $('#job_status').val(job_status).trigger('change');
                $('#job_remark').val(job_remark);
                $('#job_type').val(job_type).trigger('change');
                $('#job_cause').val(job_cause);

                $('#frm_data').find('input').prop('disabled', true);
                $('#frm_data').find('select').prop('disabled', true);
                $('#frm_data').find('textarea').prop('disabled', true);

                if (job_status == 'OPEN') {

                    //$('#btn-report_sr').addClass('d-none');

                    //if (event_status == 'DATA_START') {

                        if (result.data[0]['detail_item_name'] != null) {

                            $('#btn-save_job').removeClass('d-none');
                        }

                        $('#frm_data').find('#btn-save_data').addClass('d-none');
                        $('#frm_data').find('#btn-update_data_start').addClass('d-none');
                        $('#frm_data').find('#btn-edit_data').removeClass('d-none');

                        $('#frm_item').find('input').prop('disabled', false);
                        $('#frm_item').find('select').prop('disabled', false);
                        $('#frm_item').find('button').prop('disabled', false);

                        if (job_type == 'STOCK_REQUEST') {

                            $('#frm_item').find('#job_unit').prop('disabled', true);

                        } else if (job_type == 'PRODUCT_REQUEST') {

                            $('#frm_item').find('#job_unit').prop('disabled', false);

                        }

                        $('#btn-cancel_data').removeClass('d-none');

                    //}

                } else if (job_status == 'ON_PROCESS') {

                    //$('#frm_data').find('#btn-edit_data').addClass('d-none');
                    //$('#frm_data').find('#btn-save_data').addClass('d-none');
                    //$('#frm_data').find('#btn-save_job').addClass('d-none');
                    $('#frm_data').find('.btn-save').addClass('d-none');
                    $('#frm_item').find('input').prop('disabled', true);
                    $('#frm_item').find('select').prop('disabled', true);
                    $('#frm_item').find('button').prop('disabled', true);
                    $('#frm_item').find('#job_unit').prop('disabled', true);
                    $('#frm_item').find('.remove-item').prop('disabled', true);

                    $('#frm_data').find('#job_user_end').prop('disabled', false);
                    $('#frm_data').find('#job_remark').prop('disabled', false);
                    $('#frm_data').find('#btn-update_data_end').removeClass('d-none');
                    $('#btn-report_sr').removeClass('d-none');
                    $('#btn-cancel_data').removeClass('d-none');

                } else if (job_status == 'RECEIVE') {

                    $('#frm_data').find('.btn-save').addClass('d-none');
                    $('#frm_item').find('input').prop('disabled', true);
                    $('#frm_item').find('select').prop('disabled', true);
                    $('#frm_item').find('button').prop('disabled', true);
                    $('#frm_item').find('#job_unit').prop('disabled', true);
                    $('#frm_item').find('.remove-item').prop('disabled', true);

                    $('#frm_data').find('#job_user_approval').prop('disabled', false);
                    $('#frm_data').find('#job_user_approval').val('potjana.s').trigger('change');
                    $('#frm_data').find('#job_remark').prop('disabled', false);
                    $('#frm_data').find('#btn-approval_data').removeClass('d-none');
                    $('#btn-report_sr').removeClass('d-none');
                    $('#btn-cancel_data').removeClass('d-none');

                } else if (job_status == 'APPROVAL') {

                    $('#frm_data').find('.btn-save').addClass('d-none');
                    $('#frm_item').find('input').prop('disabled', true);
                    $('#frm_item').find('select').prop('disabled', true);
                    $('#frm_item').find('button').prop('disabled', true);
                    $('#frm_item').find('#job_unit').prop('disabled', true);
                    $('#frm_item').find('.remove-item').prop('disabled', true);
                    $('#btn-save_job').addClass('d-none');
                    $('#btn-report_sr').removeClass('d-none');
                    $('#btn-cancel_data').removeClass('d-none');

                } else {

                    //$('#btn-report_sr').addClass('d-none');

                }

                //if (job_status == 'OPEN') {

                //    $('#frm_data').find('#btn-save_data').addClass('d-none');
                //    $('#frm_data').find('#btn-edit_data').removeClass('d-none');

                //    $('#frm_data').find('#job_user_end').prop('disabled', false);
                //    $('#frm_data').find('#job_user_end option').remove();
                //    $('#frm_data').find('#job_user_end').append("<option value='RECEIVE' selected>RECEIVE</option>")
                //    $('#frm_data').find('#job_user_end').append("<option value='CANCAL'>CANCAL</option>")

                //}

            } else {

                toastr.error('Not found data.');

                swal({
                    title: "ขออภัย",
                    text: "ไม่พบเลขที่เอกสาร",
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonClass: "btn btn-danger",
                    confirmButtonText: "OK",
                    closeOnConfirm: false
                },
                    function () {

                        window.history.pushState({}, document.title, "/" + "ivc/opt/stock_request");

                        location.reload();

                    });

            }

        }

    }).then(async function () {

        await $('#modal-frm_job').modal({
            keyboard: false,
            backdrop: 'static'
        });

    });

    return false;

};

$.Data_Update_Start = async function () {

    let citem = {
        job_no: $('#job_no').val(),
        job_date: moment($('#job_date').val(), 'DD/MM/YYYY').format("YYYY/MM/DD"),
        job_branch_start: $('#job_branch_start').val(),
        job_branch_end: $('#job_branch_end').val(),
        job_user_start: $('#job_user_start').val(),
        job_status: $('#job_status').val(),
        job_cause: $('#job_cause').val(),
        job_remark: $('#job_remark').val(),
        updated_by: user_id,
    };

    var params = [];
    for (const i in citem) {
        params.push(i + "=" + encodeURIComponent(citem[i]));
    }

    fetch(url_stock_request_data_update, {
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

        if (result.length > 0) {

            // $('#job_no').val(result.data[0]['job_no']);

            swal({
                title: "สำเร็จ!",
                text: "ทำรายการสำเร็จ",
                type: 'success',
                timer: 1000,
                showConfirmButton: false
            });

            toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {

                //$('#btn-save_data').prop('disabled', false);

                //window.location.assign(window.location.href + '?job_no=' + result.data[0]['job_no'])

                $.Data_Detail($('#job_no').val());

            }, 100);

        } else {

            swal({
                title: "ขออภัย",
                text: "เกิดข้อผิดพลาด",
                type: 'error',
                timer: 2000,
                showConfirmButton: false
            });

        }

    });

    return false;

};

$.Data_Update_End = async function () {

    let citem = {
        job_no: $('#job_no').val(),
        job_date: moment($('#job_date').val(), 'DD/MM/YYYY').format("YYYY/MM/DD"),
        job_user_end: $('#job_user_end').val(),
        job_status: 'RECEIVE',
        job_remark: $('#job_remark').val(),
        updated_by: user_id,
    };

    var params = [];
    for (const i in citem) {
        params.push(i + "=" + encodeURIComponent(citem[i]));
    }

    fetch(url_stock_request_data_update, {
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

        if (result.length > 0) {

            // $('#job_no').val(result.data[0]['job_no']);

            swal({
                title: "สำเร็จ!",
                text: "ทำรายการสำเร็จ",
                type: 'success',
                timer: 1000,
                showConfirmButton: false
            });

            toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {

                //$('#btn-save_data').prop('disabled', false);

                //window.location.assign(window.location.href + '?job_no=' + result.data[0]['job_no'])

                //$.Data_Detail();

                $('#modal-frm_job').modal('hide');

            }, 100);

        } else {

            swal({
                title: "ขออภัย",
                text: "เกิดข้อผิดพลาด",
                type: 'error',
                timer: 2000,
                showConfirmButton: false
            });

        }

    });

    return false;

};

$.Data_Update_Approval = async function () {

    let citem = {
        job_no: $('#job_no').val(),
        job_date: moment($('#job_date').val(), 'DD/MM/YYYY').format("YYYY/MM/DD"),
        job_user_approval: $('#job_user_approval').val(),
        job_status: 'APPROVAL',
        job_remark: $('#job_remark').val(),
        updated_by: user_id,
    };

    var params = [];
    for (const i in citem) {
        params.push(i + "=" + encodeURIComponent(citem[i]));
    }

    fetch(url_stock_request_data_update, {
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

        if (result.length > 0) {

            // $('#job_no').val(result.data[0]['job_no']);

            swal({
                title: "สำเร็จ!",
                text: "ทำรายการสำเร็จ",
                type: 'success',
                timer: 1000,
                showConfirmButton: false
            });

            toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {

                //$('#btn-save_data').prop('disabled', false);

                //window.location.assign(window.location.href + '?job_no=' + result.data[0]['job_no'])

                $.Data_Detail($('#job_no').val());

            }, 100);

        } else {

            swal({
                title: "ขออภัย",
                text: "เกิดข้อผิดพลาด",
                type: 'error',
                timer: 2000,
                showConfirmButton: false
            });

        }

    });

    return false;

};

$.Data_Approval = async function (citem) {

    $('#p_job_no').val(citem.job_no);
    $('#p_job_date').val(moment(citem.job_date, 'YYYY-MM-DD').format('DD/MM/YYYY'));
    $('#p_job_status').val(citem.job_status).trigger('change');
    $('#p_job_remark').val(citem.job_remark);

    $('#p_job_user_approval').prop('disabled', false);

    $('#btn-approval').off('click').on('click', async function (e) {

        e.preventDefault();

        $('#frm_approval').parsley().validate();

        if ($('#frm_approval').parsley().isValid()) {

            swal({
                title: "โปรดยืนยันอีกครั้ง !",
                text: "ต้องการการอนุมัติเอกสารนี้หรือไม่",
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

                    let data = {
                        job_no: $('#p_job_no').val(),
                        job_date: moment($('#p_job_date').val(), 'DD/MM/YYYY').format("YYYY/MM/DD"),
                        job_user_approval: $('#p_job_user_approval').val(),
                        job_status: 'APPROVAL',
                        job_remark: $('#p_job_remark').val(),
                        updated_by: user_id,
                    };

                    var params = [];
                    for (const i in data) {
                        params.push(i + "=" + encodeURIComponent(data[i]));
                    }

                    fetch(url_stock_request_data_update, {
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

                        if (result.length > 0) {

                            // $('#job_no').val(result.data[0]['job_no']);

                            swal({
                                title: "สำเร็จ!",
                                text: "ทำรายการสำเร็จ",
                                type: 'success',
                                timer: 1000,
                                showConfirmButton: false
                            });

                            toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {

                                await $.List();

                                await $('#modal-frm_approval').modal('hide');

                            }, 100);

                        } else {

                            swal({
                                title: "ขออภัย",
                                text: "เกิดข้อผิดพลาด",
                                type: 'error',
                                timer: 2000,
                                showConfirmButton: false
                            });

                        }

                    });

                } else {

                    swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                }

            });

        }

    });

    return false;

};

$.Data_Job_Create = async function () {

    let citem = {
        job_no: $('#job_no').val(),
        job_date: moment($('#job_date').val(), 'DD/MM/YYYY').format("YYYY/MM/DD"), // ใส่กันมัน ERROR
        job_status: 'ON_PROCESS',
        updated_by: user_id,
    };

    var params = [];
    for (const i in citem) {
        params.push(i + "=" + encodeURIComponent(citem[i]));
    }

    fetch(url_stock_request_data_update, {
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

        if (result.length > 0) {

            swal({
                title: "สำเร็จ!",
                text: "ทำรายการสำเร็จ",
                type: 'success',
                timer: 1000,
                showConfirmButton: false
            });

            toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {

                $('#modal-frm_job').modal('hide');

                //$('#btn-save_data').prop('disabled', false);

                //window.location.assign(window.location.href + '?job_no=' + result.data[0]['job_no'])

                //$.Data_Detail();

            }, 100);

        } else {

            $('#btn-save_job').prop('disabled', true);

            swal({
                title: "ขออภัย",
                text: "เกิดข้อผิดพลาด",
                type: 'error',
                timer: 2000,
                showConfirmButton: false
            });

        }

    });

    return false;

};

$.Data_Item_List = async function (result) {

    console.log('data_list', result)

    table_item = $('#table-item').DataTable({
        data: result.data,
        dom: 'Bfrtip',
        bDestroy: true,
        autoWidth: false,
        scrollY: 400,
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        buttons: [
            {
                extend: 'excelHtml5',
                title: '',
                filename: 'Stock_Request-Item_' + result.data[0]['job_no'],
                exportOptions: {
                    columns: [0, 2, 3, 4, 5, 6, 7]
                }
            },
        ],
        columns: [
            {
                title: "<span class='tx-12'>#</span>",
                class: "tx-center align-middle",
                width: "10%",
                render: function (data, type, row, meta) {
                    return '<span class="tx-12">' + (meta.row + 1) + '</span>';
                }
            },
            {
                title: "<div class='text-center'>รายละเอียดสินค้า</div>",
                width: "70%",
                render: function (data, type, row, meta) {

                    let detail = '';
                    let detail_item_code = row.detail_item_code == null ? row.detail_item_name : row.detail_item_code;
                    let detail_barcode = row.detail_barcode == null ? '' : row.detail_barcode;
                    let detail_spcodes = row.detail_spcodes == null ? '' : row.detail_spcodes;
                    let detail_item_name = row.detail_item_name == null ? '' : row.detail_item_name;

                    detail += '<div class="d-flex">'
                    detail += '<img class="ml-2 mt-1 img-sm bg-warning d-flex align-items-center justify-content-center text-white" src="../../assets/img/faces/3.jpg" alt="Profile Image">'
                    detail += '<div class="ml-2">'
                    detail += '<p class="mb-0 font-weight-medium">' + detail_item_code + '</p>'
                    detail += '<p class="mb-0 text-muted tx-11">' + detail_barcode + ' / ' + detail_spcodes + '</p>'
                    detail += '<p class="mb-0 text-muted tx-12">' + detail_item_name + '</p>'
                    detail += '</div>'
                    detail += '</div>'

                    return detail;
                }
            },
            {
                title: "<span class='tx-12'>รหัสสินค้า</span>",
                data: "detail_item_code",
                class: "tx-center align-middle",
                visible: false,
                render: function (data, type, row, meta) {
                    return '<span class="tx-12 tx-left mg-l-2 ">' + data + '</span>';
                }
            },
            {
                title: "<span class='tx-12'>ชื่อสินค้า</span>",
                data: "detail_item_name",
                class: "tx-center align-middle",
                visible: false,
                render: function (data, type, row, meta) {
                    return '<span class="tx-12 tx-left mg-l-2 ">' + data + '</span>';
                }
            },
            {
                title: "<span class='tx-12'>บาร์โค้ด</span>",
                data: "detail_barcode",
                class: "tx-center align-middle tr_gbarcode",
                visible: false,
                render: function (data, type, row, meta) {
                    return '<span class="tx-12">' + data + '</span>';
                }
            },
            {
                title: "<span class='tx-12'>เลขอะไหล่</span>",
                data: "detail_spcodes",
                class: "tx-center align-middle",
                visible: false,
                render: function (data, type, row, meta) {
                    return '<span class="tx-12">' + data + '</span>';
                }
            },
            {
                title: "<span class='tx-12'>จำนวน</span>",
                data: "detail_qty",
                class: "tx-center align-middle",
                width: "10%",
                render: function (data, type, row, meta) {
                    return '<span class="tx-12">' + data + '</span>';
                }
            },
            {
                title: "<span class='tx-12'>หน่วย</span>",
                data: "detail_unit",
                class: "tx-center align-middle",
                visible: false,
                render: function (data, type, row, meta) {
                    return '<span class="tx-12">' + data + '</span>';
                }
            },
            {
                title: "<span class='tx-12'>event_status</span>",
                data: "event_status",
                class: "tx-center align-middle",
                visible: false,
                render: function (data, type, row, meta) {
                    return '<span class="tx-12">' + data + '</span>';
                }
            },
            {
                //title: '-',
                class: "tx-center align-middle",
                width: "10%",
                render: function (data, type, row, meta) {

                    let box = ''
                    let remove
                    if (row.event_status == 'PENDING') {
                        remove = 'remove-item'
                    }

                    box += '<a class="' + remove + '-item text-danger" href="javascript:void(0)" data-toggle="tooltip" title="" data-original-title="Remove item"><i class="fa fa-trash"></i></a>'

                    return box;
                }
            },
        ],
        rowCallback: function (row, data) {

        },
        initComplete: function (settings, json) {

            $('#table-item tbody').off('click', '.remove-item').on('click', '.remove-item', async function (e) {

                $(this).on('click', function (e) {
                    e.preventDefault();
                });

                var citem = table_item.row($(this).parents('tr')).data();

                await $.Item_Delete(citem);

            });

        },
    });

    return false;

};

$.Item_Create = async function () {

    //let detail_item_code;
    //if ($('#job_type').val() == 'STOCK_REQUEST') {
    //    detail_item_code = $('#job_item_select2').val()
    //} else if ($('#job_type').val() == 'PRODUCT_REQUEST') {
    //    detail_item_code = $('#job_item_text').val()
    //}

    let citem = {
        job_type: $('#job_type').val(),
        detail_ref_id: ref_job_id,
        detail_job_no: $('#job_no').val(),
        detail_item_code: $('#job_item_select2').val(),
        detail_item_name: $('#job_item_text').val(),
        detail_unit: $('#job_unit').val(),
        detail_qty: $('#item_qty').val(),
        created_by: user_id,
    };

    var params = [];
    for (const i in citem) {
        params.push(i + "=" + encodeURIComponent(citem[i]));
    }

    fetch(url_stock_request_item_create, {
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

        if (result.status === 'Error') {

            $('#btn-save_item').prop('disabled', false);

            toastr.error('Oops! An Error Occurred');

        } else {

            if (result.length > 0) {

                if ((result.data[0]['pMessage']) != null) {

                    $('#btn-save_item').prop('disabled', false);

                    toastr.error(result.data[0]['pMessage'])

                } else {

                    toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {

                        $('#btn-reset_item').trigger('click');

                        await $.Data_Detail($('#job_no').val());

                    }, 100);

                }

            } else {

                swal({
                    title: "ขออภัย",
                    text: "เกิดข้อผิดพลาด",
                    type: 'error',
                    timer: 2000,
                    showConfirmButton: false
                });

            }
        }

    });

    return false;

};

$.Item_Delete = async function (citem) {

    let data = {
        detail_job_no: $('#job_no').val(),
        detail_item_code: citem['detail_item_code'],
        updated_by: user_id,
    };

    var params = [];
    for (const i in data) {
        params.push(i + "=" + encodeURIComponent(data[i]));
    }

    fetch(url_stock_request_item_delete, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
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

            $('#btn-save_item').prop('disabled', false);

            toastr.error('Oops! An Error Occurred');

        } else {

            if (result.length > 0) {

                if ((result.data[0]['pMessage']) != null) {

                    // $('#btn-save_item').prop('disabled', false);

                    toastr.error(result.data[0]['pMessage'])

                } else {

                    toastr.success('นำออกสำเร็จ!', async function () {

                        $.Data_Detail($('#job_no').val());

                    }, 100);

                }

            } else {

                swal({
                    title: "ขออภัย",
                    text: "เกิดข้อผิดพลาด",
                    type: 'error',
                    timer: 2000,
                    showConfirmButton: false
                });

            }
        }

    });

    return false;

};

$.Frm_Memo = async function (data) {


    let url = url_frm_memo + "&job_no=" + data + "";

    window.open(url, '_blank');


    return false;

};

$.List = async function () {

    let url = new URL(url_stock_request_list);

    var trndate_start = $('#search_job_date').val() != '' ? moment($('#search_job_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment().add(-1, 'days').format('YYYY-MM-DD') + ' 00:00';
    var trndate_end = $('#search_job_date').val() != '' ? moment($('#search_job_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';

    url.search = new URLSearchParams({
        job_no: $('#search_job_no').val(),
        job_status: $('#search_job_status').val(),
        trndate_start: trndate_start,
        trndate_end: trndate_end,
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log('result', result.data)

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
                    {
                        extend: 'excelHtml5',
                        title: '',
                        filename: 'List_Stock_Request_' + trndate_start + ' - ' + trndate_end,
                        exportOptions: {
                            columns: [2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 17, 18, 19]
                        }
                    },
                ],
                columns: [
                    {
                        title: "trans_id",
                        data: "trans_id",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //0
                    {
                        title: "ปริ้น",
                        class: "tx-center align-middle",
                        // visible: false,
                        width: "30px",
                        render: function (data, type, row, meta) {
                            let url = ''
                            if (row.job_status != 'OPEN') {
                                url = '<span style="font-size:11px;">' + '<a class="btn-report" href="' + url_frm_memo + '?job_no=' + row.job_no + '" target="_blank"><i class="las la-print tx-18" data-toggle="tooltip" title="" data-original-title="print"></i></a>' + '</span>';
                            } else {
                                url = '<span style="font-size:11px;">' + '<a class="text-danger"><i class="las la-print tx-18"></i></a>' + '</span>';
                            }
                            return url;
                        }
                    }, //1
                    {
                        title: "<div class='text-center'>วันที่</div>",
                        data: "job_date",
                        class: "align-middle",
                        width: "45px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-center" style="font-size:11px;">' + moment(data, 'YYYY/MM/DD').format('DD/MM/YYYY') + '<span/>';
                        }
                    }, //2
                    {
                        title: "<div class='text-center'>เลขที่</div>",
                        data: "job_no",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "ประเภท",
                        data: "job_type",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            let job_type;
                            if (data == 'STOCK_REQUEST') {
                                job_type = 'primary'
                            } else {
                                job_type = 'info'
                            }
                            return '<span class="tx-' + job_type + '">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "สาเหตุ",
                        data: "job_cause",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "สาขาต้นทาง",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + row.job_branch_start + '<br>' + row.job_user_start + '</span>';
                        }
                    }, //4
                    {
                        title: "สาขาต้นทาง",
                        data: "job_branch_start",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "ผู้ขอ",
                        data: "job_user_start",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "สาขาปลายทาง",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + row.job_branch_end + '<br>' + row.job_user_end + '</span>';
                        }
                    }, //4
                    {
                        title: "สาขาปลายทาง",
                        data: "job_branch_end",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "ผู้รับ",
                        data: "job_user_end",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "ผู้อนุมัติ",
                        data: "job_user_approval",
                        class: "tx-center align-middle",
                        //width: "190px",
                        // visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //4

                    {
                        title: "หมายเหตุ",
                        data: "job_remark",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "สินค้า",
                        data: "item_qty",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "สถานะ",
                        data: "job_status",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            let text_status
                            if (data == 'OPEN') {
                                text_status = 'danger'
                            } else if (data == 'ON_PROCESS') {
                                text_status = 'warning'
                            } else if (data == 'RECEIVE') {
                                text_status = 'primary'
                            } else if (data == 'APPROVAL') {
                                text_status = 'success'
                            }
                            return '<span class="tx-' + text_status + '" style="font-size:11px;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "ผู้สร้างเอกสาร",
                        data: "created_by",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + row.created_by + '<br>' + moment(row.created_datetime).format("DD/MM/YYYY HH:mm:ss") + '</span>';
                        }
                    }, //4
                    {
                        title: "ผู้สร้างเอกสาร",
                        data: "created_by",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "เวลาที่สร้าง",
                        data: "created_datetime",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format("DD/MM/YYYY HH:mm:ss") + '<span/>';
                        }
                    }, //4
                    {
                        title: "record_status",
                        data: "record_status",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            let tx
                            if (data == 1) {
                                tx = 'ใช้งาน'
                            } else {
                                tx = 'ไม่ใช้งาน'
                            }
                            return '<span style="font-size:11px;">' + tx + '</span>';
                        }
                    }, //4
                ],
                rowCallback: function (row, data) {
                    if (data.record_status == 0) {
                        $('td:eq(1)', row).parent().addClass('bg-danger-transparent');
                        $('td:eq(1)', row).parent().addClass('text-danger');
                        //$('td:eq(1)', row).parent().addClass('tx-line-through');
                        $('td:eq(1)', row).parent().css("text-decoration-line", "line-through");
                        $('td:eq(0)', row).find('a').removeClass('btn-report').removeAttr('href');
                    }
                },
                initComplete: function (settings, json) {

                    $('#table-list tbody').off('click', '.btn-report').on('click', '.btn-report', async function (e) {

                        e.preventDefault()

                        var data = table_list.row($(this).parents('tr')).data();

                        $.Frm_Memo(data.job_no);

                    });

                    $.contextMenu({
                        selector: '#table-list tbody tr',
                        callback: async function (key, options) {

                            let citem = table_list.row(this).data();

                            if (key === 'view') {

                            } else if (key === 'edit') {

                                if (citem.record_status == 0) {

                                    swal("เอกสารถูกยกเลิก", "กรุณาติดต่อเจ้าหน้าที่", "error");

                                } else {

                                    $.Data_Detail(citem.job_no);

                                }
                            } else if (key === 'approval') {

                                if (citem.record_status == 0) {

                                    swal("เอกสารถูกยกเลิก", "กรุณาติดต่อเจ้าหน้าที่", "error");

                                } else {

                                    if (citem.job_status == 'ON_PROCESS' || citem.job_status == 'RECEIVE') {

                                        await $('#modal-frm_approval').modal({
                                            keyboard: false,
                                            backdrop: 'static'
                                        });

                                        await $.Data_Approval(citem);

                                    } else {

                                        swal("ผิดเงื่อนไขการอนุมัติ", "กรุณาติดต่อเจ้าหน้าที่", "error");

                                    }

                                }

                            } else if (key === 'delete') {


                            } else {

                                alert('ERROR');

                            }
                        },
                        items: {
                            //"view": { name: "View", icon: "fas fa-search" },
                            "edit": { name: "Edit", icon: "edit" },
                            "approval": { name: "Approval", icon: "fas fa-check" },
                            //"delete": { name: "Delete", icon: "delete" },
                        }
                    });


                },
            });

        }

    });

    return false;

};

$.History = async function () {

    let url = new URL(url_stock_request_log_list);

    url.search = new URLSearchParams({
        job_no: $('#job_no').val(),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log('result', result.data)

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

            table_history = $('#table-history_job').DataTable({
                data: result.data,
                dom: 'frtip',
                deferRender: true,
                ordering: false,
                pageLength: 10,
                bDestroy: true,
                columns: [
                    {
                        title: "<div class='text-center'>กิจกรรม</div>",
                        data: "event_status",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<div class='text-center'>สถานะ</div>",
                        data: "job_status",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            let text_status
                            if (data == 'OPEN') {
                                text_status = 'danger'
                            } else if (data == 'ON_PROCESS') {
                                text_status = 'warning'
                            } else if (data == 'RECEIVE') {
                                text_status = 'primary'
                            } else if (data == 'APPROVAL') {
                                text_status = 'success'
                            }
                            return '<span class="badge badge-' + text_status + '">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "ผู้สร้างเอกสาร",
                        data: "created_by",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "เวลาที่สร้าง",
                        data: "created_datetime",
                        class: "tx-center align-middle",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format("DD/MM/YYYY HH:mm:ss") + '<span/>';
                        }
                    }, //4
                ],
                "initComplete": function (settings, json) {

                },
            });

        }

    });

    return false;

};


$.Master_Data = async function () {

    // USER START

    let url = new URL(url_auth_sys_user_get);

    url.search = new URLSearchParams({
        record_status: 1,
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        $.each(result.data, function (key, val) {

            let user_username = val['user_username']
            let employee_code = val['employee_code']
            let employee_fullname = val['employee_fullname']

            if (val['record_status'] == true) {

                $('.user_auth').append('<option value="' + user_username + '">' + employee_code + ' ' + employee_fullname + '</option>');
                $('.user_approval').append('<option value="' + user_username + '">' + employee_code + ' ' + employee_fullname + '</option>');

            }

        });

    }).then(function () {

        $('.user_auth').select2({
            dropdownParent: $('#modal-frm_job'),
            templateResult: function (data) {
                return data.text;
            },
            sorter: function (data) {
                return data.sort(function (a, b) {
                    return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                });
            }
        });

        $('.user_approval').select2({
            dropdownParent: $('#modal-frm_approval'),
            templateResult: function (data) {
                return data.text;
            },
            sorter: function (data) {
                return data.sort(function (a, b) {
                    return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                });
            }
        });

    });

    $('.user_auth').off('click').on('click', async function (e) {

        e.preventDefault


    });

    // USER END


    //ITEM START

    $('#job_item_select2').select2({
        width: 'resolve',
        delay: 300,
        dropdownAutoWidth: true,
        minimumInputLength: 2,
        minimumResultsForSearch: 10,
        width: '100%',
        height: '40px',
        ajax: {
            url: url_stmas_select2_search,
            dataType: 'json',
            data: function (params) {
                var query = {
                    id: "RTRIM(code)",
                    text: "CONCAT(RTRIM(code),' - ',RTRIM(CHRCODE),' - ',RTRIM(name),' / ',RTRIM(gbarcode),' / ',RTRIM(SPCODES))",
                    keywords: typeof params.term !== 'undefined' ? params.term : ' ',
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
                        console.log(item)
                        return {
                            text: item.text,
                            id: item.id,
                            uom: item.UOM,
                            avgsalecost: item.AvgSalecost,
                            name: item.name
                        }
                    })
                };
            },
        },
        escapeMarkup: function (markup) {
            return markup;
        },
        select: function (event, ui) {

            let uom = ui.item.UOM;

            console.log(uom)
        }
    });

    $('#job_item_select2').on('select2:select', async function (e) {

        e.preventDefault

        var data = e.params.data;
        var uom = data.uom;

        $('#job_unit').val(uom.trim());

    });

    //ITEM END
};
