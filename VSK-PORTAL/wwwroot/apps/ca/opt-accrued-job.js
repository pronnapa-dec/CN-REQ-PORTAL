'use strict';

const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const application_id = objProfile[0]['application'];
const user_id = objProfile[0]['username'];

const url_link = "http://localhost" + "/file_daily_cashier/";
const url_api = "http://localhost:49705";
const url_job = "http://localhost:57916/";

//const url_link = "http://192.168.1.247:8899" + "/file_daily_cashier/";
//const url_api = "http://192.168.1.247:8899/ca-api";
//const url_job = "http://192.168.1.247:8099/";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const url_invoice_get = url_api + '/v1/INVOICE_GET';
const url_invoice_vsk_get = url_api + '/v1/INVOICE_VSK_GET';
const url_customer_get = url_api + '/v1/CUSTOMER_GET';

const url_daily_cashier_check = url_api + '/v1/DAILY_CASHIER_CHECK';
const url_daily_cashier_sync = url_api + '/v1/DAILY_CASHIER_SYNC';
const url_daily_cashier_job = url_api + '/v1/DAILY_CASHIER_JOB';
const url_daily_cashier_detail = url_api + '/v1/DAILY_CASHIER_DETAIL';
const url_daily_cashier_action = url_api + '/v1/DAILY_CASHIER_ACTION';
const url_daily_cashier_history = url_api + '/v1/DAILY_CASHIER_HISTORY';
const url_daily_cashier_update_status = url_api + '/v1/DAILY_CASHIER_UPDATE_STATUS';

const url_daily_cashier_file_list = url_api + '/v1/DAILY_CASHIER_FILE_LIST';
const url_daily_cashier_file_upload = url_api + '/v1/DAILY_CASHIER_FILE_UPLOAD';
const url_daily_cashier_file_delete = url_api + '/v1/DAILY_CASHIER_FILE_DELETE';

const url_accrued_create = url_api + '/v1/ACCRUED_CREATE';
const url_accrued_list = url_api + '/v1/ACCRUED_LIST';
const url_accrued_remark = url_api + '/v1/ACCRUED_REMARK';
const url_accrued_delete = url_api + '/v1/ACCRUED_DELETE';
const url_accrued_receive_create = url_api + '/v1/ACCRUED_RECEIVE_CREATE';
const url_accrued_receive_list = url_api + '/v1/ACCRUED_RECEIVE_LIST';
const url_accrued_receive_delete = url_api + '/v1/ACCRUED_RECEIVE_DELETE';

const url_receive_bill_create = url_api + '/v1/RECEIVE_BILL_CREATE';
const url_receive_bill_list = url_api + '/v1/RECEIVE_BILL_LIST';
const url_receive_bill_delete = url_api + '/v1/RECEIVE_BILL_DELETE';
const url_receive_bill_verify_list = url_api + '/v1/RECEIVE_BILL_VERIFY_LIST';
const url_receive_bill_verify_upload = url_api + '/v1/RECEIVE_BILL_VERIFY_UPLOAD';
const url_receive_bill_verify_upload_check = url_api + '/v1/RECEIVE_BILL_VERIFY_UPLOAD_CHECK';

const url_master_get = url_api + '/v1/DAILY_CASHIER_MASTER';

//const url_bill = 'http://192.168.1.247/vsk-api-bill/api/acc';
const url_bill = 'http://192.168.1.247/vsk-api-bill/api/acc/Salefile_Get';

let oTable = $('#tbl-list').DataTable();
let table_accrued, table_accrued_receive;
let table_history_cash, table_history_coupons, table_history_edc
let table_file_list, table_customer, table_accrued_customer, table_receive_bill, table_bill_receive_verify, table_check_upload_bill
let action_status;
let ref_id;
let check_user, check_branch;
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


$(document).ready(async function () {

    //if (application_id.substring(0, 3) != 'VSK') {
    //}
    if (user_id != 'nutre.t' && user_id != 'sudarut.s' && user_id != 'tawan.s'  && user_id != 'paranyou.l' && user_id != 'rawipon.n' && user_id != 'pornpimol.c') {

        $('.tabs-menu ul li').eq(2).addClass('d-none')

    } else {

        $('.tabs-menu ul li').eq(2).removeClass('d-none')

    }

    $('#acc_description').parent().parent().addClass('d-none')
    $('#branch_accrued').val(application_id.substring(0, 3))
    $('#branch_accrued_receive').val(application_id.substring(0, 3))
    $('#accrued_customer_branch').val(application_id.substring(0, 3))
    $('#branch_receive_bill').val(application_id.substring(0, 3))
    $('#branch').val(application_id.substring(0, 3))
    $('#branch').prop('disabled', true)
    $('#text_user').val(user_id)

    $('#save-cash').addClass('save_all')
    $('#save-edc').addClass('save_all')
    $('#save-coupons').addClass('save_all')

    await $.init();
    //await $.Check_Job();
    await $.Master_Get();

    if (action_status == 'ACC') {

        $('.cashier-save').addClass('d-none')

    } else {

    }

});


$.init = async function () {

    $("#loading-tabs").LoadingOverlay("show", {
        image: '',
        custom: customElement
    });

    $('.show-today').html(moment().format('DD/MM/YYYY'))
    $('#btn-save_job').prop('disabled', true)
    $('#keywords_accrued').prop('disabled', true)
    $('#keywords_arrears').prop('disabled', true)

    $('#modal-frm_data').off('hidden.bs.modal').on('hidden.bs.modal', async function () {

        await setTimeout(function () {

            $('#detectImageForm').find('input').val('')

            $('.dropify-clear').trigger('click');

        }, 100);

    });

    $('#modal-frm_upload').off('shown.bs.modal').on('shown.bs.modal', async function () {

        $('#frm_upload').find('input').val('')
        $('#frm_upload').find('textarea').val('')
        $('#frm_upload').find('select').trigger('change').val('')
        $("#frm_upload").parsley().reset();
        $('.dropify-clear').trigger('click');

        $('#frm_upload').find('#document_date').prop('disabled', true)
        let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')
        $('#frm_upload').find('#document_date').val($('#job_date').val())

    });

    $('#modal-frm_upload').off('hidden.bs.modal').on('hidden.bs.modal', async function () {

        await setTimeout(function () {

            $('#frm_upload').find('input').val('')
            $('#frm_upload').find('textarea').val('')
            $('#frm_upload').find('select').trigger('change').val('')
            $("#frm_upload").parsley().reset();
            $('.dropify-clear').trigger('click');

        }, 100);

    });

    $('#modal-frm_cus').off('shown.bs.modal').on('shown.bs.modal', async function () {

        let branch = $('#branch').val()

        let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')

        let url = new URL(url_customer_get);

        url.search = new URLSearchParams({
            mode: 'customer_today',
            ref_id: ref_id,
            invdate: job_date,
        });

        fetch(url).then(function (response) {
            return response.json();
        }).then(function (result) {

            if (result.status === 'Error') {

                toastr.error('Oops! An Error Occurred');

            } else {

                $("#arrears-customer option").remove();
                $("#arrears-customer").append("<option value='' selected>--- เลือกลูกค้า ---</option>").attr("value", '')

                let Master_dataSet = [];

                $.each(result.data, function (key, val) {

                    Master_dataSet.push({ id: val['invcode'], text: val['invcode'] + ' : ' + val['invname'] });

                });

                $('#arrears-customer').select2({
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


        $('#accrued_customer_date').val(moment().add(-1, 'days').format('DD/MM/YYYY') + ' - ' + moment().add(-1, 'days').format('DD/MM/YYYY'))

        $.Daily_Cashier_Customer_List()

    });

    $('#modal-frm_cus_acr').off('shown.bs.modal').on('shown.bs.modal', async function () {

        let branch = $('#branch').val()

        let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')

        let url = new URL(url_customer_get);

        url.search = new URLSearchParams({
            mode: 'customer_main_accrued',
            invdate: job_date,
        });

        fetch(url).then(function (response) {
            return response.json();
        }).then(function (result) {

            if (result.status === 'Error') {

                toastr.error('Oops! An Error Occurred');

            } else {

                $("#accrued_customer option").remove();
                $("#accrued_customer").append("<option value='' selected>--- เลือกลูกค้า ---</option>").attr("value", '')

                let Master_dataSet = [];

                $.each(result.data, function (key, val) {

                    Master_dataSet.push({ id: val['invcode'], text: val['invcode'] + ' : ' + val['invname'] });

                });

                $('#accrued_customer').select2({
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

        $.Daily_Cashier_Customer_Accrued_List()

    });

    $('#modal-bill_receive_verify').off('shown.bs.modal').on('shown.bs.modal', async function () {

        let branch = $('#branch').val()

        let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')

        $.Receive_Bill_Verify_List()

    });

    $('#modal-frm_remark').off('hidden.bs.modal').on('hidden.bs.modal', async function () {

        await setTimeout(function () {

            $('#frm_remark').find('input').val('')
            $('#frm_remark').find('textarea').val('')
            $('#frm_remark').find('select').trigger('change').val('')
            $("#frm_remark").parsley().reset();

        }, 100);

    });

    $('#frm_data').find('#job_date').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        },
    });

    $('#accrued_customer_date').daterangepicker({
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

    $('#job_date').off('change').on('change', async function (e) {

        e.preventDefault();

        let job_date = moment($('#frm_data').find('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')
        let branch = $('#branch').val()
        let check_user = user_id

        if (urlParams.get('job_date') === null) {

            setTimeout(async function () {

                await $.Daily_Update_JobDate();

            }, 300);

        } else {

            await window.history.pushState({}, document.title, "/" + "csh/opt/accrued_job");
            await setTimeout(async function () {

                await location.reload();

            }, 100);

        }

    });

    $('#btn-accrued').off('click').on('click', async function (e) {

        e.preventDefault();

        $('#keywords_accrued').removeClass('parsley-error');

        this.value = this.value.toUpperCase().replace(' ', '').trim();

        if (this.value != '') {

            $('#keywords_accrued').addClass('parsley-error');

        } else {

            $.LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            if (check_user != user_id) {

                toastr.error('Error, ผู้ใช้งานไม่ตรงกัน');
                $.LoadingOverlay("hide", true);

            } else {

                $.Invoice();

            }
        }

    });

    $('#keywords_accrued').keyup(async function (e) {

        e.preventDefault();

        $('#keywords_accrued').removeClass('parsley-error');

        this.value = this.value.toUpperCase().replace(' ', '').trim();

        if (e.keyCode == 13) {

            $.LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            if (check_user != user_id) {

                toastr.error('Error, ผู้ใช้งานไม่ตรงกัน');
                $.LoadingOverlay("hide", true);

            } else {

                $.Invoice();

            }
        }

    });

    $('#btn-accrued_receive').off('click').on('click', async function (e) {

        e.preventDefault();

        $('#keywords_accrued_receive').removeClass('parsley-error');

        this.value = this.value.toUpperCase().replace(' ', '').trim();

        if (this.value != '') {

            $.LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            if (check_user != user_id) {

                toastr.error('Error, ผู้ใช้งานไม่ตรงกัน');
                $.LoadingOverlay("hide", true);

            } else {

                $.Accrued_Receive_Create(this.value);

            }

        } else {

            $('#keywords_accrued_receive').addClass('parsley-error');

        }

    });

    $('#keywords_accrued_receive').keyup(async function (e) {

        e.preventDefault();

        $('#keywords_accrued_receive').removeClass('parsley-error');

        this.value = this.value.toUpperCase().replace(' ', '').trim();

        if (e.keyCode == 13) {

            $.LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            if (check_user != user_id) {

                toastr.error('Error, ผู้ใช้งานไม่ตรงกัน');
                $.LoadingOverlay("hide", true);

            } else {

                $.Accrued_Receive_Create(this.value);

            }

        }

    });

    $('#btn-receive_bill').off('click').on('click', async function (e) {

        e.preventDefault();

        $('#keywords_receive_bill').removeClass('parsley-error');

        this.value = this.value.toUpperCase().replace(' ', '').trim();

        if (this.value != '') {

            $.LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            if (check_user != user_id) {

                toastr.error('Error, ผู้ใช้งานไม่ตรงกัน');

                $.LoadingOverlay("hide", true);

            } else {

                $.Accrued_Receive_Create(this.value);

            }

        } else {

            $('#keywords_receive_bill').addClass('parsley-error');

        }

    });

    $('#keywords_receive_bill').keyup(async function (e) {

        e.preventDefault();

        $('#keywords_receive_bill').removeClass('parsley-error');

        this.value = this.value.toUpperCase().replace(' ', '').trim();

        if (e.keyCode == 13) {

            $.LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            if (check_user != user_id) {

                toastr.error('Error, ผู้ใช้งานไม่ตรงกัน');
                $.LoadingOverlay("hide", true);

            } else {

                $.Receive_Bill_Create(this.value);

            }

        }

    });

    $('.nav li a').click(function () {
        var data = $(this).attr("href");
        //console.log(data);
        if (data == '#invoice_accrued') {
            //toastr["info"]("ค้างชำระ")
            $("#loading-tabs").LoadingOverlay("show", {
                image: '',
                custom: customElement
            });
            $.Accrued_List();
        } else if (data == '#invoice_accrued_receive') {
            $("#loading-tabs").LoadingOverlay("show", {
                image: '',
                custom: customElement
            });
            //toastr["info"]("รับชำระ ค้างรับ")
            pay_status = ''
            $.Accrued_Receive_List();
        } else if (data == '#document_all') {
            $("#loading-tabs").LoadingOverlay("show", {
                image: '',
                custom: customElement
            });
            //toastr["info"]("เอกสาร")
            $.Daily_Cashier_File_List()
        } else if (data == '#receive_bill') {
            $("#loading-tabs").LoadingOverlay("show", {
                image: '',
                custom: customElement
            });
            //toastr["info"]("เอกสาร")
            $.Receive_Bill_List()
        }
    });

    $('.accrued_receive-cilck a').on('click', async function (e) {

        e.preventDefault();

        var contentId = $(this).attr('id');

        if (contentId == 'accrued_receive-primary') {

            pay_status = 'ACCRUED_TOTAL_LIST'//'pending_payment'

            $.Accrued_List_Total(pay_status);

        } else if (contentId == 'accrued_receive-success') {

            pay_status = 'success_payment'

            $.Accrued_Receive_List();

        } else {

            alert('ERROR')
        }

    });

    $('.cashier-save a').off('click').on('click', async function (e) {

        e.preventDefault();

        var contentId = $(this).attr('id');

        //if (action_status === 'CSH') {

        if (check_user != user_id) {

            toastr.error('Error, ผู้ใช้งานไม่ตรงกัน');

        } else {

            if (contentId == 'save-cash') {

                $.Daily_Cashier_Action('CASH', $('#cash').val());

            } else if (contentId == 'save-coupons') {

                $.Daily_Cashier_Action('COUPONS', $('#coupons').val());

            } else if (contentId == 'save-edc') {

                $.Daily_Cashier_Action('EDC', $('#edc').val());

            } else {

                alert('ERROR')
            }

        }

    });

    $('.cashier-history a').off('click').on('click', async function (e) {

        e.preventDefault();

        var contentId = $(this).attr('id');

        if (contentId == 'history-cash') {

            $.Daily_Cashier_History('cash');

        } else if (contentId == 'history-coupons') {

            $.Daily_Cashier_History('coupons');

        } else if (contentId == 'history-edc') {

            $.Daily_Cashier_History('edc');

        } else {

            alert('ERROR')
        }

    });

    $('#btn-upload_file').off('click').on('click', async function (e) {

        e.preventDefault();

        $('#frm_upload').parsley().validate();

        if ($('#frm_upload').parsley().isValid()) {

            //    if (check_user != user_id) {

            //        toastr.error('Error, ผู้ใช้งานไม่ตรงกัน');

            //    } else {

            $.Daily_Cashier_File_Upload();

            //    }

        }

    });

    $('#btn-update_status').off('click').on('click', async function (e) {

        e.preventDefault();

        if (check_user != user_id) {

            toastr.error('Error, ผู้ใช้งานไม่ตรงกัน');

        } else {

            swal({
                title: "ส่งข้อมูลบันทึกประจำวัน !",
                text: "ท่านต้องการบันทึกเอกสารนี้หรือไม่",
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

                    if (action_status == 'CSH') {

                        $.Daily_Cashier_Update_Status('CSH_UPDATE', $('#csh_description').val());

                    } else if (action_status == 'ACC') {

                        $.Daily_Cashier_Update_Status('ACC_UPDATE', $('#acc_description').val());

                    } else {

                        toastr.error('เกิดข้อผิดพลาด! สิทธิ์การใช้งาน');
                    }


                } else {

                    swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                }

            });

        }

    });

    $('#btn-update_appove').off('click').on('click', async function (e) {

        e.preventDefault();

        if (user_id != 'sudarut.s' && user_id != 'tawan.s' ) {

            toastr.error('ไม่พบสิทธิ์ในการอนุมัติ กรุณาติดต่อเจ้าหน้าที่!');

        } else {

            swal({
                title: "อนุมัติข้อมูลบันทึกประจำวัน !",
                text: "ท่านต้องการบันทึกเอกสารนี้หรือไม่",
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

                    $.Daily_Cashier_Update_Status('ACC_UPDATE', $('#acc_description').val());

                } else {

                    swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                }

            });


        }
    });

    $('#btn-update_unappove').off('click').on('click', async function (e) {

        e.preventDefault();

        if (user_id != 'sudarut.s' && user_id != 'tawan.s' ) {

            toastr.error('ไม่พบสิทธิ์ในการอนุมัติ กรุณาติดต่อเจ้าหน้าที่!');

        } else {

            swal({
                title: "ไม่อนุมัติข้อมูลบันทึกประจำวัน !",
                text: "ท่านต้องการบันทึกเอกสารนี้หรือไม่",
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

                    $.Daily_Cashier_Update_Status('ACC_UNUPDATE', $('#acc_description').val());

                } else {

                    swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                }

            });

        }
    });

    $('#btn-bill_upload').off('click').on('click', async function (e) {

        e.preventDefault();

        if (user_id !== 'kantipa.k' && user_id !== 'paranyou.l' && user_id !== 'nutre.t') {

            toastr.error('ไม่พบสิทธิ์ในการอนุมัติ กรุณาติดต่อเจ้าหน้าที่!');

        } else {

            let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')

            let url = new URL(url_receive_bill_verify_upload_check);

            url.search = new URLSearchParams({
                job_date: job_date,
            });

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {

                console.log(result.data)

                if (result.length > 0) {

                    table_check_upload_bill = $('#table-check_upload_bill').DataTable({
                        data: result.data,
                        dom: '<f<t>lip>',
                        deferRender: true,
                        ordering: true,
                        pageLength: 10,
                        bDestroy: true,
                        autoWidth: false,
                        columns: [
                            {
                                title: "<span class='tx-12'>ref_id</span>",
                                data: "ref_id",
                                class: "tx-center align-middle",
                                visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span class="tx-12">' + data + '</span>';
                                }
                            },
                            {
                                title: "<span class='tx-12'>วันที่เอกสาร</span>",
                                data: "job_date",
                                class: "tx-center align-middle",
                                render: function (data, type, row, meta) {
                                    let url_packing_job = url_job + "csh/opt/accrued_job?job_date=" + moment(data, 'YYYY/MM/DD hh:mm:ss').format('YYYY/MM/DD') + "&branch=" + row.branch + "&created_by=" + row.created_by
                                    return '<div data-placement="top" data-toggle="tooltip-primary">' + '<a href="' + url_packing_job + '" target="_blank"><b>' + '<span style="font-size:11px;" class="tx-bold">' + moment(data, 'YYYY/MM/DD').format('DD/MM/YYYY') + '</span>' + '</div>'
                                }
                            },
                            {
                                title: "<span class='tx-12'>สาขา</span>",
                                data: "branch",
                                class: "tx-center align-middle",
                                render: function (data, type, row, meta) {
                                    return '<span class="tx-12 tx-bold">' + data + '</span>';
                                }
                            },
                            {
                                title: "<span class='tx-12'>แคชเชียร์</span>",
                                data: "created_by",
                                class: "tx-center align-middle",
                                render: function (data, type, row, meta) {
                                    let url_packing_job = url_job + "csh/opt/accrued_job?job_date=" + moment(row.job_date, 'YYYY/MM/DD hh:mm:ss').format('YYYY/MM/DD') + "&branch=" + row.branch + "&created_by=" + data
                                    return '<div data-placement="top" data-toggle="tooltip-primary">' + '<a href="' + url_packing_job + '" target="_blank"><b>' + '<span style="font-size:11px;" class="tx-bold">' + data + '</span>' + '</div>'

                                }
                            },
                            {
                                title: "<span class='tx-12'>ค้าง</span>",
                                class: "tx-center align-middle",
                                render: function (data, type, row, meta) {
                                    const date1 = new Date(row.job_date);
                                    const date2 = new Date();
                                    const diffTime = Math.abs(date2 - date1);
                                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                    return '<span class="tx-12 tx-bold tx-danger">' + diffDays + '</span> วัน';
                                }
                            },
                        ],
                        initComplete: function (settings, json) {

                            $("#global-loader").fadeOut("slow");

                            $('#modal-check_upload_bill').modal({
                                keyboard: false,
                                backdrop: 'static'
                            });

                        },
                    });

                } else {

                    swal({
                        title: "อัพโหลดข้อมูลบิล !",
                        text: "ท่านต้องการบันทึกเอกสารนี้หรือไม่",
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

                            $.Receive_Bill_Verify_Upload();

                        } else {

                            swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                        }

                    });

                }

            });

        }

    });

    $('#btn-arrears').off('click').on('click', async function (e) {

        e.preventDefault();

        $.Daily_Cashier_Customer_List()

    });

    $('#btn-accrued_customer').off('click').on('click', async function (e) {

        e.preventDefault();

        $.Daily_Cashier_Customer_Accrued_List()

    });

    $('#bth-save_remark').off('click').on('click', async function (e) {

        e.preventDefault();

        $('#frm_remark').parsley().validate();

        if ($('#frm_remark').parsley().isValid()) {

            $('.modal-remark').LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            if (check_user != user_id) {

                toastr.error('Error, ผู้ใช้งานไม่ตรงกัน');

                $.LoadingOverlay("hide", true);

            } else {

                await $.Accrued_Remark();

            }

        }

    });

    $('#btn-export-receive_bill').off('click').on('click', function (e) {

        e.preventDefault();

        $(this).on('click', function (e) {
            e.preventDefault();
        });

        let url = 'http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_CA_DAILY_CASHIER_BILL_RECEIVE_TODAY&rs:Command=Render&ref_id=' + ref_id + "&rs:Format=excel";

        window.open(url, '_blank');

        return false;

    });

    $('#btn-export-non-receive_bill').off('click').on('click', function (e) {

        e.preventDefault();

        $(this).on('click', function (e) {
            e.preventDefault();
        });

        //let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')
        //window.location = 'http://192.168.1.247/vsk-api-bill/exportfile/CashiernonComplate_Export' +
        //    '?created_start_date=' + job_date +
        //    '&created_end_date=' + job_date;

        let url = 'http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_CA_DAILY_CASHIER_SELL&rs:Command=Render'

        window.open(url, '_blank');

        return false;

    });

    $('#btn-export-report_1').off('click').on('click', function (e) {

        e.preventDefault();

        $(this).on('click', function (e) {
            e.preventDefault();
        });

        //let url = "http://192.168.1.247/vsk-ca/ca-report/Pages/RPT_CA/RPT_CASH_BY_CREATE_DATE"
        let url = "http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_CA_DAILY_CASHIER_BILL_RECEIVE&rs:Command=Render"

        window.open(url, '_blank');

        return false;

    });

    if (urlParams.get('job_date') === null) {

        await $.Check_Job();

    } else {

        await $.Daily_Cashier_Detail();

    }
};


$.Check_Job = async function () {

    let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')

    let branch = $('#branch').val()

    fetch(url_daily_cashier_check + '?job_date=' + job_date + '&branch=' + branch + '&created_by=' + user_id).then(function (response) {

        return response.json();

    }).then(function (result) {

        if (result.data[0]['pMessage'] != null) {

            //swal({
            //    title: "เปิดบันทึกเอกสารประจำวัน",
            //    text: moment().format('DD/MM/YYYY') + " ของบัญชี " + user_id + " นี้ใช่หรือไม่",
            //    type: "warning",
            //    showCancelButton: true,
            //    confirmButtonClass: "btn-danger",
            //    confirmButtonText: "ใช่, ยันยืน",
            //    cancelButtonText: "ไม่, ยกเลิก",
            //    cancelButtonColor: '#d33',
            //    closeOnConfirm: false,
            //    closeOnCancel: false
            //}, function (isConfirm) {

            //    if (isConfirm) {

            //        toastr.warning('กำลังดำเนินการ');

            $.Daily_Cashier_Job()

            //    } else {

            //        swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

            //    }

            //});

        } else {

            $.Daily_Cashier_Detail()

        }

    });

};

$.Invoice = async function () {

    let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')

    $.LoadingOverlay("hide", true);

    fetch(url_invoice_get + '?number=' + $('#keywords_accrued').val() + '&branch=' + $('#branch_accrued').val()).then(function (response) {

        return response.json();

    }).then(function (result) {

        //console.log('result', result.data)

        if (result.length > 0) {

            if (moment(result.data[0]['invdate']).format('YYYY/MM/DD') != job_date) {

                toastr.error('วันที่บิลไม่ให้ตรงกัน');
                $('#keywords_accrued').addClass('parsley-error');

            } else {

                let invsumtt = result.data[0]['invsumtt']

                if (result.data[0]['invnumber'].substring(0, 2) == 'CN') {

                    invsumtt = -(invsumtt)

                } else {

                    invsumtt = result.data[0]['invsumtt']
                }

                //alert(invsumtt)

                let val_inv = {
                    invnumber: result.data[0]['invnumber'],
                    invpo: result.data[0]['invpo'],
                    invcode: result.data[0]['invcode'],
                    invname: result.data[0]['invname'],
                    invdate: result.data[0]['invdate'],
                    invsumtt: invsumtt,//result.data[0]['invsumtt'],
                    invpay: result.data[0]['invpay'],
                    invuserid: result.data[0]['invuserid'],
                }

                if (result.data[0]['invpay'] == 'paycash' || result.data[0]['invpay'] == 'paytran') {

                    $.Accrued_Create(val_inv)

                } else {

                    toastr.error('ไม่ใช่ประเภทบิลเงินสดหรือเงินโอน ' + $('#keywords_accrued').val());
           
                    $('#keywords_accrued').focus()

                    $('#keywords_accrued').removeClass('parsley-error');

                    $('#keywords_accrued').val('')
                }
               
            }

        } else {

            toastr.error('ไม่พบข้อมูล กรุณาตรวจสอบ');

        }

    });

};


$.Daily_Update_JobDate = async function () {

    let job_date = moment($('#frm_data').find('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')
    let branch = $('#branch').val()
    let check_user = user_id

    fetch(url_daily_cashier_check + '?job_date=' + job_date + '&branch=' + branch + '&created_by=' + check_user).then(function (response) {

        return response.json();

    }).then(async function (result) {

        if (result.data[0]['pMessage'] == null) {

            //toastr.error(result.data[0]['pMessage']);

            //$('input').prop('disabled', true)
            //$('textarea').prop('disabled', true)
            //$('button').prop('disabled', true)
            //$('#job_date').prop('disabled', false)
            //$('#btn-reset').prop('disabled', false)
            //$('.cancelBtn').prop('disabled', false)

            //swal("ไม่สำเร็จ!", "ไม่พบเอกสาร", "error");

            $.LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            await $.Daily_Cashier_Detail()


        } else {

            $('input').prop('disabled', false)
            $('textarea').prop('disabled', false)
            $('button').prop('disabled', false)
            $('.update-def').prop('disabled', true)

            $.LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            await $.Daily_Cashier_Job()


        }

    });

    return false;

};


$.Daily_Cashier_Job = async function () {

    if (user_id == 'sudarut.s' || user_id != 'tawan.s'  || user_id == 'paranyou.l' || user_id == 'pornpimol.c' || user_id == 'rawipon.n') {

        toastr.error('ไม่พบสิทธิ์ในการเปิดเอกสาร กรุณาติดต่อเจ้าหน้าที่!');
        $('#btn-update_status').prop('disabled', true);

    } else {

        let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD') //moment(val['salefile_startdate'], 'YYYY/MM/DD').format('DD/MM/YYYY'),
        let branch = $('#branch').val()
        let gen_ref_id = $.uuid();

        let url = new URL(url_daily_cashier_job);

        url.search = new URLSearchParams({
            mode: 'CREATE',
            ref_id: gen_ref_id,
            job_date: job_date,
            branch: branch,
            created_by: user_id,

        });

        fetch(url).then(function (response) {
            return response.json();
        }).then(function (result) {

            //console.log(result.data)

            if (result.data[0]['pMessage'] != null) {

                toastr.error(result.data[0]['pMessage']);

            } else {

                toastr.success('ดำเนินการสำเร็จ');

                swal({
                    title: "สำเร็จ!",
                    text: "ทำรายการสำเร็จ",
                    type: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });

                $.Daily_Cashier_Detail()
            }

        });

        return false;

    }
};

$.Daily_Cashier_Detail = async function () {

    let job_date
    let branch

    if (urlParams.get('job_date') === null) {

        job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')
        check_branch = $('#branch').val()
        check_user = user_id

    } else {

        job_date = urlParams.get('job_date')//moment(urlParams.get('job_date'), 'DD/MM/YYYY').format('YYYY/MM/DD')
        check_branch = urlParams.get('branch')
        check_user = urlParams.get('created_by')

        $('#job_date').val(moment(urlParams.get('job_date'), 'YYYY/MM/DD').format('DD/MM/YYYY'))
        $('#branch').val(check_branch)

    }

    let url = new URL(url_daily_cashier_detail);

    url.search = new URLSearchParams({
        job_date: job_date,
        branch: check_branch,
        created_by: check_user,
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        $.LoadingOverlay("hide", true);

        if (result.status === 'Error') {

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

            if (result.length > 0) {

                check_user = result.data[0]['created_by']

                check_branch = result.data[0]['branch']

                $('#text_user').val(result.data[0]['created_by'])

                if (result.data[0]['confirm_status'] == 'COMPLETE') {

                    $('#btn-update_appove').addClass('d-none')
                    $('#btn-update_unappove').addClass('d-none')
                    $('#btn-update_status').addClass('d-none')

                    $.each(result.data, function (key, val) {

                        ref_id = val['ref_id'];
                        action_status = val['action_status'];

                        let sum_accrued = numberWithCommas(val['sum_accrued'])
                        let sum_accrued_receive = numberWithCommas(val['sum_accrued_receive'])

                        $('#btn-save_job').prop('disabled', false)
                        $('#keywords_accrued').prop('disabled', false)
                        $('#keywords_arrears').prop('disabled', false)

                        $('#cash').val(val['cash'].toFixed(2));
                        $('#accrued').val(val['sum_accrued'].toFixed(2));
                        $('#accrued_receive').val(val['sum_accrued_receive'].toFixed(2));
                        $('#transfer_payment').val(val['transfer_payment'].toFixed(2));
                        //$('#accrued').val(val['accrued'].toFixed(2));
                        //$('#accrued_receive').val(val['accrued_receive'].toFixed(2));
                        //$('#transfer_payment').val(val['transfer_payment'].toFixed(2));
                        $('#edc').val(val['edc'].toFixed(2));
                        $('#coupons').val(val['coupons'].toFixed(2));

                        $('#csh_description').val(val['csh_description']);
                        $('#acc_description').val(val['acc_description']);

                        $('.alert').removeClass('d-none')
                        $('#alert_head').html('การอนุมัติสำเร็จ!')
                        $('#alert_detail').html(' โดย ' + val['acc_saveby'] + ' เวลา ' + moment(val['acc_dateby'], 'YYYY/MM/DD hh:mm:ss').format('DD/MM/YYYY hh:mm:ss'))
                    });

                    //$.Daily_Cashier_Sync_Transfer_Payment();
                    $.Accrued_List();
                    $.Accrued_Receive_List();
                    $.Daily_Cashier_File_List();
                    $.Daily_Cashier_Sync_Accrued()

                    $('input').prop('disabled', true)
                    $('textarea').prop('disabled', true)
                    $('#btn-accrued').prop('disabled', true)

                    $('#btn-customer_accrued').prop('disabled', false)
                    $('#btn-accrued_receive').prop('disabled', true)
                    $('#document_upload').prop('disabled', true)
                    $('.cashier-save').addClass('d-none')
                    $('#btn-bill_upload').addClass('d-none')
                    $('.acc_description').removeClass('d-none')

                    $('#accrued_customer_date').prop('disabled', false)
                    $('#btn-customer_accrued').prop('disabled', false)

                } else {

                    if (result.data[0]['action_status'] == 'ACC') {

                        $('#btn-update_appove').removeClass('d-none')
                        $('#btn-update_unappove').removeClass('d-none')
                        $('#btn-update_status').addClass('d-none')

                        $.each(result.data, function (key, val) {

                            ref_id = val['ref_id'];
                            action_status = val['action_status'];

                            let sum_accrued = numberWithCommas(val['sum_accrued'])
                            let sum_accrued_receive = numberWithCommas(val['sum_accrued_receive'])

                            $('#btn-save_job').prop('disabled', false)
                            $('#keywords_accrued').prop('disabled', false)
                            $('#keywords_arrears').prop('disabled', false)

                            $('#cash').val(val['cash'].toFixed(2));
                            $('#accrued').val(val['sum_accrued'].toFixed(2));
                            $('#accrued_receive').val(val['sum_accrued_receive'].toFixed(2));

                            $('#edc').val(val['edc'].toFixed(2));
                            $('#coupons').val(val['coupons'].toFixed(2));
                            $('#csh_description').val(val['csh_description']);
                            $('#acc_description').val(val['acc_description']);

                            $('.alert').removeClass('d-none')
                            $('.alert').addClass('alert-warning')
                            $('#alert_head').html('ขออนุมัติ!')
                            $('#alert_detail').html(' โดย ' + val['csh_saveby'] + ' เวลา ' + moment(val['csh_dateby'], 'YYYY/MM/DD hh:mm:ss').format('DD/MM/YYYY hh:mm:ss'))

                        });

                        $.Daily_Cashier_Sync_Transfer_Payment();
                        $.Accrued_List();
                        $.Accrued_Receive_List();
                        $.Daily_Cashier_File_List();
                        $.Daily_Cashier_Sync_Accrued()

                        $('input').prop('disabled', true)
                        $('textarea').prop('disabled', true)
                        $('#btn-accrued').prop('disabled', true)
                        $('#btn-accrued_receive').prop('disabled', true)
                        $('#document_upload').prop('disabled', true)
                        $('.cashier-save').addClass('d-none')
                        $('.acc_description').removeClass('d-none')
                        $('#acc_description').prop('disabled', false)
                        $('#btn-bill_upload').addClass('d-none')

                        //$('#frm_cus_acr')
                        $('#accrued_customer_date').prop('disabled', false)
                        $('#btn-customer_accrued').prop('disabled', false)

                    } else {

                        $('#btn-update_appove').addClass('d-none')
                        $('#btn-update_unappove').addClass('d-none')
                        $('#btn-update_status').removeClass('d-none')

                        $('.alert').addClass('d-none')

                        $('input').prop('disabled', false)
                        $('textarea').prop('disabled', false)
                        $('button').prop('disabled', false)
                        $('.update-def').prop('disabled', true)
                        //$('#job_date').prop('disabled', false)
                        //$('#btn-reset').prop('disabled', false)
                        //$('.cancelBtn').prop('disabled', false)

                        $.each(result.data, function (key, val) {

                            ref_id = val['ref_id'];
                            action_status = val['action_status'];

                            $('#btn-save_job').prop('disabled', false)
                            $('#keywords_accrued').prop('disabled', false)
                            $('#keywords_arrears').prop('disabled', false)

                            //$('#cash').val(numberWithCommas(val['cash'].toFixed(2)));
                            $('#cash').val(val['cash'].toFixed(2));
                            $('#accrued').val(val['sum_accrued'].toFixed(2));
                            $('#accrued_receive').val(val['sum_accrued_receive'].toFixed(2));

                            $('#edc').val(val['edc'].toFixed(2));
                            //$('#transfer_payment').val(numberWithCommas(val['transfer_payment'].toFixed(2)));
                            $('#coupons').val(val['coupons'].toFixed(2));
                            $('#csh_description').val(val['csh_description']);
                            $('#acc_description').val(val['acc_description']);
                            $('.acc_description').removeClass('d-none')
                            $('#acc_description').prop('disabled', true)

                        });

                        $.Daily_Cashier_Sync_Transfer_Payment();
                        $.Accrued_List();
                        $.Accrued_Receive_List();
                        $.Daily_Cashier_File_List();
                        $.Daily_Cashier_Sync_Accrued()

                    }

                }

                $('#job_date').prop('disabled', false)
                $('#document_remark').prop('disabled', false)
                $('#document_file').prop('disabled', false)

            } else {

                swal(
                    {
                        title: 'ไม่พบเอกสาร!',
                        text: 'กรุณาติดต่อเจ้าหน้าที่!',
                        type: 'warning',
                        timer: 2000,
                        showConfirmButton: false
                    }
                )

                $('input').prop('disabled', true)
                $('textarea').prop('disabled', true)
                $('button').prop('disabled', true)
                $('#job_date').prop('disabled', false)
                $('#btn-reset').prop('disabled', false)
                $('.cancelBtn').prop('disabled', false)

                $('.alert').removeClass('d-none')
                $('.alert').addClass('alert-danger')
                $('#alert_head').html('ไม่พบเอกสาร!')
                $('#alert_detail').html('กรุณาติดต่อเจ้าหน้าที่')

                $('#document_upload').prop('disabled', false)

            }

        }

    });

};

$.Daily_Cashier_Action = async function (mode, contentId) {

    let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD') //moment(val['salefile_startdate'], 'YYYY/MM/DD').format('DD/MM/YYYY'),
    let branch = $('#branch').val()
    let gen_ref_id = $.uuid();

    let url = new URL(url_daily_cashier_action);

    url.search = new URLSearchParams({
        mode: mode,
        ref_id: ref_id,
        job_date: job_date,
        cash_amount: contentId,
        branch: branch,
        created_by: user_id,
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        //console.log(result.data)

        if (result.data[0]['pMessage'] != null) {

            toastr.error(result.data[0]['pMessage']);

        } else {

            toastr.success('บันทึกเงิน ' + mode + ' สำเร็จ')

        }

    });

    return false;

};

$.Daily_Cashier_History = async function (mode) {

    let url = new URL(url_daily_cashier_history);

    url.search = new URLSearchParams({
        mode: mode,
        ref_id: ref_id,
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        //console.log(result.data)

        if (result.length > 0) {

            let i = result.length;

            var data_inv = [];

            $.each(result.data, function (key, val) {

                data_inv.push([
                    i,
                    val['job_date'],
                    val['cash_amount'],
                    val['created_by'],
                    val['created_datetime'],
                ])

                i--;

            });

            if (mode == 'cash') {

                table_history_cash = $('#tbl-history_cash').DataTable({
                    "data": data_inv,
                    "dom": 'rtip',
                    autoWidth: true,
                    "bDestroy": true,
                    "deferRender": true,
                    "order": [[0, "desc"]],
                    "ordering": false,
                    "pageLength": 10,
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
                        "render": function (data, type, row, meta) {
                            return data.toFixed(2);
                        },
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
                        "render": function (data, type, row, meta) {
                            return (data != '0001-01-01T00:00:00' ? moment(data).format('DD/MM/YYYY') : '-');
                        }
                    },
                    ],
                    "initComplete": function (settings, json) {

                    }
                });

                table_history_cash.columns.adjust();

            } else if (mode == 'coupons') {

                table_history_coupons = $('#tbl-history_coupons').DataTable({
                    "data": data_inv,
                    "dom": 'rtip',
                    autoWidth: true,
                    "bDestroy": true,
                    "deferRender": true,
                    "order": [[0, "desc"]],
                    "ordering": false,
                    "pageLength": 10,
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
                        "render": function (data, type, row, meta) {
                            return data.toFixed(2);
                        },
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
                        "render": function (data, type, row, meta) {
                            return (data != '0001-01-01T00:00:00' ? moment(data).format('DD/MM/YYYY') : '-');
                        }
                    },
                    ],
                    "initComplete": function (settings, json) {

                    }
                });

                table_history_coupons.columns.adjust();

            } else if (mode == 'edc') {

                table_history_edc = $('#tbl-history_edc').DataTable({
                    "data": data_inv,
                    "dom": 'rtip',
                    autoWidth: true,
                    "bDestroy": true,
                    "deferRender": true,
                    "order": [[0, "desc"]],
                    "ordering": false,
                    "pageLength": 10,
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
                        "render": function (data, type, row, meta) {
                            return data.toFixed(2);
                        },
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
                        "render": function (data, type, row, meta) {
                            return (data != '0001-01-01T00:00:00' ? moment(data).format('DD/MM/YYYY') : '-');
                        }
                    },
                    ],
                    "initComplete": function (settings, json) {

                    }
                });

                table_history_edc.columns.adjust();

            }

        }

    });

}

$.Daily_Cashier_Update_Status = async function (mode, description) {

    let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD') //moment(val['salefile_startdate'], 'YYYY/MM/DD').format('DD/MM/YYYY'),
    let branch = $('#branch').val()

    let url = new URL(url_daily_cashier_update_status);

    if (mode == 'CSH_UPDATE') {

        $('.save_all').trigger('click');

    }

    url.search = new URLSearchParams({
        mode: mode,
        job_date: job_date,
        branch: branch,
        ref_id: ref_id,
        description: description,
        transfer_payment: $('#frm_data').find('#transfer_payment').val(),
        accrued: $('#frm_data').find('#accrued').val(),
        accrued_receive: $('#frm_data').find('#accrued_receive').val(),
        updated_by: user_id,
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        console.log('result', result.data)

        if (result.status === 'Error') {

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

            swal({
                title: "สำเร็จ!",
                text: "ทำรายการสำเร็จ",
                type: 'success',
                timer: 2000,
                showConfirmButton: false
            });

            await setTimeout(async function () {

                await location.reload();

            }, 300);

        }

        $("#loading-tabs").LoadingOverlay("hide", true);

    });

}


$.Daily_Cashier_Sync_Transfer_Payment = async function () {

    let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')
    let branch = $('#branch').val()

    let url = new URL(url_daily_cashier_sync);

    url.search = new URLSearchParams({
        mode: 'transfer_payment_today',
        job_date: job_date,
        branch: check_branch,
        created_by: check_user,
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        //console.log('result', result.data)
        if (result.status === 'Error') {

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

            if (result.length > 0) {

                $.each(result.data, function (key, val) {

                    $('#transfer_payment').val(val['transfer_payment'].toFixed(2));

                });

            } else {

                swal("มาแล้วลูกจ๋าาาาา", "ไม่พบข้อมูล", "error");
            }

        }
    });

};

$.Daily_Cashier_Sync_Cash = async function () {

    let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')
    let branch = $('#branch').val()

    fetch(url_daily_cashier_sync + '?mode=' + 'cash_today' + '&job_date=' + job_date + '&branch=' + branch).then(function (response) {

        return response.json();

    }).then(function (result) {

        //console.log('result', result.data)
        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            if (result.length > 0) {

                $.each(result.data, function (key, val) {

                    $('#cash').val((val['cash']));

                });

            } else {

                swal("มาแล้วลูกจ๋าาาาา", "ไม่พบข้อมูล", "error");
            }

        }
    });

};

$.Daily_Cashier_Sync_Accrued = async function () {

    let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')
    let branch = $('#branch').val()

    fetch(url_accrued_receive_list + '?mode=' + 'ACCRUED_TOTAL' + '&job_date=' + job_date + '&branch=' + branch + '&created_by=' + check_user).then(function (response) {

        return response.json();

    }).then(function (result) {

        //console.log('result', result.data)
        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            if (result.length > 0) {

                $.each(result.data, function (key, val) {

                    $('#accrued_receive_total').html(numberWithCommas(val['accrued_receive_total'].toFixed(2)))
                    $('.accrued_receive_total_bill').html(' ' + numberWithCommas(val['accrued_receive_total_bill']) + ' บิล')

                });

            } else {

                swal("มาแล้วลูกจ๋าาาาา", "ไม่พบข้อมูล", "error");
            }

        }
    });

};


$.Daily_Cashier_Customer_List = async function () {

    let branch = $('#branch').val()
    let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')

    let url = new URL(url_customer_get);

    url.search = new URLSearchParams({
        mode: 'customer_today',
        ref_id: ref_id,
        invdate: job_date,
        invcode: $('#arrears-customer').val() == '' ? '' : $('#arrears-customer').val(),
        branch: branch
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            let invsumtt = 0;

            $.each(result.data, function (key, val) {

                invsumtt += parseFloat(val['invsumtt'])

            });

            $('#arrears-amount').val(invsumtt.toFixed(2));

            table_customer = $('#tbl-customer').DataTable({
                data: result.data,
                dom: 'frtip',
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "ค้นหา..."
                },
                deferRender: true,
                ordering: true,
                pageLength: 10,
                bDestroy: true,
                autoWidth: true,
                order: [[2, "asc"]],
                columns: [
                    {
                        title: "<span class='tx-12'>#</span>",
                        //searchable: false,
                        class: "details-control tx-center align-middle",
                        width: "5%",
                        render: function (data, type, row, meta) {
                            return '<i class="si si si-plus show-detail tx-primary"></i>'
                        }
                    }, //3
                    {
                        title: "<span class='tx-12'>วันที่บิล</span>",
                        data: "invdate",
                        class: "tx-center align-middle",
                        width: "15%",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + moment(data, 'YYYY/MM/DD').format('DD/MM/YYYY') + '</span>';
                        }
                    }, //3
                    {
                        title: "<span class='tx-12'>รหัสลูกค้า</span>",
                        data: "invcode",
                        class: "tx-center tx-bold align-middle",
                        //visible: false,
                        width: "10%",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<span class='tx-12'>ชื่อลูกค้า</span>",
                        data: "invname",
                        class: "tx-left align-middle",
                        // visible: false,
                        width: "45%",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //5
                    {
                        title: "<span class='tx-12'>จำนวนบิล</span>",
                        data: "count_bill",
                        class: "tx-right align-middle",
                        // visible: false,
                        width: "10%",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //5
                    {
                        title: "<span class='tx-12'>ยอดรวม/วัน</span>",
                        data: "invsumtt",
                        class: "tx-right align-middle",
                        width: "15%",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12 tx-bold">' + numberWithCommas(data.toFixed(2)) + '</span>' + ' ' + ' บาท';
                        }
                    }, //7

                ],
                "initComplete": function (settings, json) {

                    $('#arrears-amount')

                    $('#tbl-customer tbody').off('click').on('click', 'td.details-control .show-detail', function (e) {
                        e.preventDefault();

                        var tr = $(this).closest('tr');
                        var row = table_customer.row(tr);

                        if (row.child.isShown()) {

                            row.child.hide();
                            tr.removeClass('shown');

                        } else {

                            var citem = table_customer.row($(this).parents('tr')).data();

                            console.log('citem', citem)

                            $.Daily_Cashier_Customer_SubList(row.child, citem)

                            tr.addClass('shown');
                        }
                    });

                },

            });

        }
        $("#loading-tabs").LoadingOverlay("hide", true);

    });

}

$.Daily_Cashier_Customer_SubList = async function (callback, citem) {

    //$(".modal-body").LoadingOverlay("show", {
    //    image: '',
    //    custom: customElement
    //});
    let branch = $('#branch').val()

    let url = new URL(url_customer_get);

    url.search = new URLSearchParams({
        mode: 'single_customer',
        invdate: citem['invdate'],
        branch: branch,
        invcode: citem['invcode'],
        ref_id: ref_id,
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            //$(".modal-body").LoadingOverlay("hide", true);

            var data = result.data;

            var thead = "<th class='border-bottom-0'><div class='tx-center'><input type='checkbox' name='select_all' value='1' id='select-all' disabled></div></th>" +
                "<th class='border-bottom-0 tx-center'>เลขที่บิล</th>" +
                "<th class='border-bottom-0 tx-center'>เลขที่ใบสั่งจัด</th>" +
                "<th class='border-bottom-0 tx-center'>ประเภท</th>" +
                "<th class='border-bottom-0 tx-center'>ยอดเงิน</th>" +
                "<th class='border-bottom-0 tx-center'>จัดการ</th>";

            var tbody = '';
            let i = result.length
            let image = ''

            $.each(result.data, function (key, val) {

                let citem = JSON.stringify(val)

                let status
                if (val['invpay'] == 'paycash') {
                    status = '<span class="tx-primary">' + 'เงินสด' + '</span>'
                } else if (val['invpay'] == 'paytran') {
                    status = '<span class="tx-success">' + 'เงินโอน' + '</span>'
                } else if (val['invpay'] == 'paycard') {
                    status = '<span class="tx-warning">' + 'เครดิต' + '</span>'
                } else if (val['invpay'] == 'payoth') {
                    status = '<span class="tx-dark">' + 'อื่นๆ' + '</span>'
                } else {
                    status = '<span class="tx-danger">' + '' + '</span>'
                }

                tbody += "<tr class='bg-primary-transparent'>" +
                    "<td class='tx-center'>" + '<input type="checkbox" class="select-action" name="select-action" disabled>' + "</td>" +
                    "<td class='tx-center tx-bold'>" + val['invnumber'] + "</td>" +
                    "<td class='tx-center'>" + val['invpo'] + "</td>" +
                    "<td class='tx-center'>" + status + "</td>" +
                    "<td class='tx-right tx-primary'>" + numberWithCommas(val['invsumtt'].toFixed(2)) + "</td>" +
                    //"<td class='tx-center'>" + "<a class='remove-from-cart delete_accrued' onclick='$.Accrued_Delete('" + citem + "')' data-item='" + citem + "' s href='javascript: void(0);' data-toggle='tooltip' title='' data-original-title='Remove item'><i class='las la-trash'></i></a>" + "</td>" +
                    "<td class='tx-center d-flex flex-row justify-content-center'>" + "<button class='btn btn-outline-danger btn-block btn-icon bd-0 tx-12' onclick='$.Accrued_Delete(" + citem + ");' data-item='" + citem + "'><i class='las la-trash'></i></button>" + "</td>" +
                    "</tr>";
                i--

            });

            callback($('<table id="tbl-customer-sub' + citem['invcode'] + '" class="table table_customer_sub text-md-nowrap">' + thead + tbody + '</table>')).show();

            //$('#select-all').on('click', function () {
            //    // Get all rows with search applied
            //    var rows = $('#table_customer_sub').rows({ 'search': 'applied' }).nodes();
            //    // Check/uncheck checkboxes for all rows in the table
            //    $('input[type="checkbox"]', rows).prop('checked', this.checked);
            //});

            //$('#tbl-customer-sub tbody').on('change', 'input[type="checkbox"]', function () {
            //    // If checkbox is not checked
            //    if (!this.checked) {
            //        var el = $('#select-all').get(0);
            //        // If "Select all" control is checked and has 'indeterminate' property
            //        if (el && el.checked && ('indeterminate' in el)) {
            //            // Set visual state of "Select all" control
            //            // as 'indeterminate'
            //            el.indeterminate = true;
            //        }
            //    }
            //});


            //$('#tbl-customer-sub tbody').off('click', '.delete_accrued').on('click', '.delete_accrued', async function (e) {

            //    e.preventDefault();

            //    $(this).on('click', function (e) {
            //        e.preventDefault();
            //    });
            //    alert('ดักไว้ก่อน')

            //    //var citem = table_customer.row($(this).parents('tr')).data();
            //    var citem = table_customer.row($(this)).data();

            //    console.log('citem', citem)

            //    if (check_user != user_id) {

            //        toastr.error('Error, ผู้ใช้งานไม่ตรงกัน');

            //    } else {

            //        //await $.Accrued_Delete(citem);

            //    }

            //});

        }
    });

};


$.Daily_Cashier_Customer_Accrued_List = async function () {

    let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')
    let branch = $('#accrued_customer_branch').val()
    let trndate_start = $('#accrued_customer_date').val() != '' ? moment($('#accrued_customer_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment().add(-1, 'days').format('YYYY-MM-DD') + ' 00:00';
    let trndate_end = $('#accrued_customer_date').val() != '' ? moment($('#accrued_customer_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';

    let url = new URL(url_customer_get);

    url.search = new URLSearchParams({
        mode: 'customer_main_accrued',
        invdate: job_date,
        invdate_start: trndate_start,
        invdate_end: trndate_end,
        branch: branch,
        invcode: $('#accrued_customer').val() == '' ? '' : $('#accrued_customer').val(),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            let invsumtt = 0;
            $.each(result.data, function (key, val) {
                invsumtt += parseFloat(val['invsumtt'])
            });

            $('#customer_amount').val(invsumtt.toFixed(2));

            table_accrued_customer = $('#tbl-accrued_customer').DataTable({
                data: result.data,
                //dom: 'frtip',
                dom: '<f<t>lip>',
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "ค้นหา..."
                },
                deferRender: true,
                ordering: true,
                pageLength: 10,
                bDestroy: true,
                autoWidth: true,
                order: [[1, "asc"]],
                columns: [
                    {
                        title: "<span class='tx-12'>#</span>",
                        //searchable: false,
                        class: "details-control tx-center",
                        "width": "5%",
                        render: function (data, type, row, meta) {
                            return '<i class="si si si-plus show-detail tx-primary"></i>'
                        }
                    }, //3
                    //{
                    //    title: "<span class='tx-12'>วันที่บิล</span>",
                    //    data: "invdate",
                    //    class: "tx-center align-middle",
                    //    render: function (data, type, row, meta) {
                    //        return '<span class="tx-12">' + moment(data, 'YYYY/MM/DD').format('DD/MM/YYYY') + '</span>';
                    //    }
                    //}, //3
                    {
                        title: "<span class='tx-12'>รหัสลูกค้า</span>",
                        data: "invcode",
                        class: "tx-center tx-bold",
                        "width": "15%",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<span class='tx-12'>ชื่อลูกค้า</span>",
                        data: "invname",
                        class: "tx-left",
                        // visible: false,
                        "width": "55%",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //5
                    {
                        title: "<span class='tx-12'>จำนวนบิล</span>",
                        data: "count_bill",
                        class: "tx-right",
                        "width": "10%",
                        // visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //5
                    {
                        title: "<span class='tx-12'>ยอดรวม/วัน</span>",
                        data: "invsumtt",
                        class: "tx-right align-middle",
                        "width": "15%",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12 tx-bold">' + numberWithCommas(data.toFixed(2)) + '</span>' + ' ' + ' บาท';
                        }
                    }, //7

                ],
                "initComplete": function (settings, json) {

                    $('#tbl-accrued_customer tbody').off('click').on('click', 'td.details-control .show-detail', async function (e) {
                        e.preventDefault();

                        var tr = $(this).closest('tr');
                        var row = table_accrued_customer.row(tr);

                        if (row.child.isShown()) {

                            row.child.hide();
                            tr.removeClass('shown');

                        } else {

                            var citem = table_accrued_customer.row($(this).parents('tr')).data();

                            console.log('citem', citem)

                            tr.addClass('shown');

                            await $.Daily_Cashier_Customer_Accrued_SubList(row.child, citem)
                        }
                    });

                },

            });

        }
        $("#loading-tabs").LoadingOverlay("hide", true);

    });

}

$.Daily_Cashier_Customer_Accrued_SubList = async function (callback, citem) {

    let url = new URL(url_customer_get);
    let trndate_start = $('#accrued_customer_date').val() != '' ? moment($('#accrued_customer_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment().add(-1, 'days').format('YYYY-MM-DD') + ' 00:00';
    let trndate_end = $('#accrued_customer_date').val() != '' ? moment($('#accrued_customer_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';

    url.search = new URLSearchParams({
        mode: 'customer_sub_accrued',
        invdate_start: trndate_start,
        invdate_end: trndate_end,
        invcode: citem['invcode'],
        branch: $('#accrued_customer_branch').val()
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            var data = result.data;

            var thead = "<th class='border-bottom-0'><div class='tx-center'><input type='checkbox' name='select_all' value='1' id='select-all' disabled></div></th>" +
                "<th class='border-bottom-0 tx-center'>วันที่บิล</th>" +
                "<th class='border-bottom-0 tx-center'>เลขที่บิล</th>" +
                "<th class='border-bottom-0 tx-center'>เลขที่ใบสั่งจัด</th>" +
                "<th class='border-bottom-0 tx-center'>ประเภท</th>" +
                "<th class='border-bottom-0 tx-center'>ยอดเงิน</th>" +
                "<th class='border-bottom-0 tx-center'>จัดการ</th>";

            var tbody = '';

            let i = result.length

            $.each(result.data, function (key, val) {

                let citem = JSON.stringify(val)

                let status
                if (val['invpay'] == 'paycash') {
                    status = '<span class="tx-primary">' + 'เงินสด' + '</span>'
                } else if (val['invpay'] == 'paytran') {
                    status = '<span class="tx-success">' + 'เงินโอน' + '</span>'
                } else if (val['invpay'] == 'paycard') {
                    status = '<span class="tx-warning">' + 'เครดิต' + '</span>'
                } else if (val['invpay'] == 'payoth') {
                    status = '<span class="tx-dark">' + 'อื่นๆ' + '</span>'
                } else {
                    status = '<span class="tx-danger">' + '' + '</span>'
                }

                tbody += "<tr class='bg-primary-transparent'>" +
                    "<td class='tx-center'>" + '<input type="checkbox" class="select-action" name="select-action" disabled>' + "</td>" +
                    "<td class='tx-center'>" + moment(val['invdate'], 'YYYY-MM-DD').format('DD/MM/YYYY') + "</td>" +
                    "<td class='tx-center tx-bold'>" + val['invnumber'] + "</td>" +
                    "<td class='tx-center'>" + val['invpo'] + "</td>" +
                    "<td class='tx-center'>" + status + "</td>" +
                    "<td class='tx-right tx-primary'>" + numberWithCommas(val['invsumtt'].toFixed(2)) + "</td>" +
                    //"<td class='tx-center'>" + "<a class='remove-from-cart delete_accrued' onclick='$.Accrued_Delete('" + citem + "')' data-item='" + citem + "' s href='javascript: void(0);' data-toggle='tooltip' title='' data-original-title='Remove item'><i class='las la-trash'></i></a>" + "</td>" +
                    "<td class='tx-center d-flex flex-row justify-content-center'>" +
                    "<button class='btn btn-outline-success btn-block btn-icon bd-0 tx-12' onclick='$.Accrued_Receive_Update(" + citem + "); return false;'><i class='las la-hand-holding-usd'></i></button>" +
                    "</td>" +
                    "</tr>";
                i--

            });

            callback($('<table id="tbl-customer-accrued-sub' + citem['invcode'] + '" class="table table_customer_accrued_sub text-md-nowrap">' + thead + tbody + '</table>')).show();

        }
    });

};


$.Daily_Cashier_File_Upload = async function () {

    var document_type = $('#document_type').val()
    let raw_document_date = moment($('#document_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')
    let document_date = raw_document_date.toString()
    var file_data = new FormData();
    var pic_file = $('#modal-frm_upload').find('#document_file').get(0).files
    file_data.append("postedFile", pic_file[0]);
    file_data.append("pathname", "" + ref_id + "/" + "" + document_type + ""); //file_data.append("pathname", "" + ref_id + " / " + "" + document_date.replace(/\/+/g, '-') + "");

    console.log(' pic_file[0]', pic_file[0])
    console.log(' pathname', "" + ref_id + "/" + "" + document_type + "")
    console.log(' file_data', file_data)

    $.ajax({
        url: url_api + '/FileUploads/UploadFile',
        type: 'POST',
        data: file_data,
        contentType: false,
        processData: false,
        success: function (file_name) {

            console.log('file_name', file_name)
            let add_data = {
                ref_id: ref_id,
                job_date: moment($('#document_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD'),
                branch: $('#branch').val(),
                file_date: moment($('#document_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD'),
                file_type: $('#document_type').val(),
                file_remark: $('#document_remark').val(),
                file_name: file_name.replace(' ', ''),
                file_folder: ref_id,
                file_path: ref_id + '/' + $('#document_type').val(),
                created_by: user_id,
            };

            console.log('add_data', add_data)
            var params = [];
            for (const i in add_data) {
                params.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            fetch(url_daily_cashier_file_upload, {
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

                    if (result.data[0]['pMessage'] != null) {

                        toastr.error(result.data[0]['pMessage']);

                    } else {

                        toastr.success('บันทึกสำเร็จ')

                        swal({
                            title: "สำเร็จ!",
                            text: "ทำรายการสำเร็จ",
                            type: 'success',
                            timer: 2000,
                            showConfirmButton: false
                        });

                        $.Daily_Cashier_File_List()

                        $('#modal-frm_upload').modal('hide');
                    }

                }
            });

        }
    });

};

$.Daily_Cashier_File_List = async function () {

    $('#document_upload').prop('disabled', false)

    let branch = $('#branch').val()
    let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')

    let url = new URL(url_daily_cashier_file_list);

    url.search = new URLSearchParams({
        // ref_id: ref_id,
        branch: branch,
        job_date: job_date,
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log('result', result.data)

        table_file_list = $('#tbl-file').DataTable({
            data: result.data,
            //dom: 'frtip',
            dom: '<f<t>lip>',
            language: {
                search: "_INPUT_",
                searchPlaceholder: "ค้นหา..."
            },
            deferRender: true,
            ordering: true,
            pageLength: 10,
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
                //{
                //    title: "<span class='tx-12'>ตัวอย่าง</span>",
                //    class: "tx-center d-flex flex-row justify-content-center",
                //    render: function (data, type, row, meta) {
                //        //return '<span class="tx-12">' + (meta.row + 1) + '</span>';
                //        return "<button class='btn btn-outline-danger btn-block btn-icon bd-0 tx-12 open-pdf' data-iframe='true'><i class='las la-image' data-src='file:///C:/Users/MIS-TAN/Downloads/RPT_TRP_PACKING_PRODUCT_COVER_SHEET%20(15).pdf'></i></button>"
                //    }
                //}, //0
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
                    title: "<span class='tx-12'>ref_id</span>",
                    data: "ref_id",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //2
                {
                    title: "<span class='tx-12'>วันที่เอกสาร</span>",
                    data: "file_date",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + moment(data, 'YYYY/MM/DD').format('DD/MM/YYYY') + '</span>';
                    }
                }, //3
                {
                    title: "<span class='tx-12'>ประเภทเอกสาร</span>",
                    data: "file_type",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //4
                {
                    title: "<span class='tx-12'>ประเภทเอกสาร</span>",
                    data: "file_type_name",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //4
                {
                    title: "<span class='tx-12'>หมายเหตุ</span>",
                    data: "file_remark",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //5
                {
                    title: "<span class='tx-12'>ชื่อเอกสาร</span>",
                    data: "file_name",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //6
                {
                    title: "<span class='tx-12'>ไฟล์</span>",
                    data: "file_folder",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //7
                {
                    title: "<span class='tx-12'>ที่อยู่</span>",
                    data: "file_path",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //8
                {
                    title: "<span class='tx-12'>ผู้บันทึก</span>",
                    data: "created_by",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //11
                {
                    title: "<span class='tx-12'>เวลาบันทึก</span>",
                    data: "created_datetime",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + moment(data, 'YYYY/MM/DD hh:mm:ss').format('DD/MM/YYYY hh:mm:ss') + '</span>';
                    }
                }, //12
                {
                    title: "<span class='tx-12'>event_status</span>",
                    data: "event_status",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //11
                {
                    title: "<span class='tx-12'>จัดการ</span>",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
                        let action_download = 'download_file'
                        let action_delete = 'delete_file'
                        //if (row.event_status == 'SUCCESS') {
                        //    action_download = 'download_file'
                        //    action_delete = ''
                        //} else {
                        //    action_download = 'download_file'
                        //    action_delete = 'delete_file'
                        //}
                        return '<a class="' + action_download + '" href="javascript:void(0)" data-toggle="tooltip" title="" data-original-title="Download item"><i class="las la-download tx-primary tx-20"></i></a>' +
                            '<a class="' + action_delete + ' mg-l-10" href="javascript:void(0)" data-toggle="tooltip" title="" data-original-title="Remove item"><i class="las la-trash tx-danger tx-20"></i></a>'
                    }
                }, //13
            ],
            "initComplete": function (settings, json) {

                $('#tbl-file tbody').off('click', '.delete_file').on('click', '.delete_file', async function (e) {

                    e.preventDefault();

                    $(this).on('click', function (e) {
                        e.preventDefault();
                    });

                    var citem = table_file_list.row($(this).parents('tr')).data();

                    console.log('citem', citem)

                    if (citem['created_by'] != user_id) {

                        toastr.error('Error, ผู้ใช้งานไม่ตรงกัน');

                    } else {

                        if (citem['event_status'] == 'PENDING') {
                            await $.Daily_Cashier_File_Delete(citem);
                        }

                    }

                });

                $('#tbl-file tbody').off('click', '.download_file').on('click', '.download_file', async function (e) {

                    e.preventDefault();

                    $(this).on('click', function (e) {
                        e.preventDefault();
                    });

                    var citem = table_file_list.row($(this).parents('tr')).data();

                    console.log('citem', citem)

                    window.open(url_link + citem['ref_id'] + '/' + citem['file_type'] + '/' + citem['file_name'], '_blank');

                });

                //$('#tbl-file tbody').off('click', '.open-pdf').on('click', '.open-pdf', async function (e) {

                //    e.preventDefault();

                //    $(this).on('click', function (e) {
                //        e.preventDefault();
                //    });

                //    //var citem = table_file_list.row($(this).parents('tr')).data();

                //    //console.log('citem', citem)

                //    //window.open(url_link + citem['ref_id'] + '/' + citem['file_type'] + '/' + citem['file_name'], '_blank');

                //});

                //$('.open-pdf').lightGallery({
                //    selector: 'this',
                //});

            },
        });

        $("#loading-tabs").LoadingOverlay("hide", true);

    });

}

$.Daily_Cashier_File_Delete = async function (citem) {

    //console.log('citem', citem)

    let data_update = {
        trans_id: citem['trans_id'],
        ref_id: citem['ref_id'],
        updated_by: user_id,
    };

    var params = [];
    for (const i in data_update) {
        params.push(i + "=" + encodeURIComponent(data_update[i]));
    }

    fetch(url_daily_cashier_file_delete, {
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
                type: "warning",
                showConfirmButton: false,
                timer: 1000
            })

            toastr.warning('ลบรายการสำเร็จ');

            $.Daily_Cashier_File_List()

        }

    }).catch(error => {

        toastr.error('Error, Please contact administrator.');

    });

};


$.Accrued_Create = async function (val_inv) {

    let branch = $('#branch_accrued').val()

    let url = new URL(url_accrued_create);

    url.search = new URLSearchParams({
        ref_id: ref_id,
        invdate: val_inv['invdate'],
        invnumber: val_inv['invnumber'],
        invpo: val_inv['invpo'],
        invcode: val_inv['invcode'],
        invname: val_inv['invname'],
        invsumtt: val_inv['invsumtt'],
        invpay: val_inv['invpay'],
        invuserid: val_inv['invuserid'],
        invbranch: branch,
        created_by: user_id
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        $.LoadingOverlay("hide", true);

        //console.log('result', result.data)

        if (result.data[0]['pMessage'] != null) {

            toastr.error(result.data[0]['pMessage']);

        } else {

            $('#keywords_accrued').focus()

            $('#keywords_accrued').removeClass('parsley-error');

            toastr.success('บันทึกเลขที่บิล ' + $('#keywords_accrued').val())

            $('#keywords_accrued').val('')

            $.Daily_Cashier_Detail()

        }

    });

};

$.Accrued_List = async function () {

    let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')
    let branch = $('#branch').val()
    let url = new URL(url_accrued_list);

    url.search = new URLSearchParams({
        ref_id: ref_id,
        //branch: branch,
        job_date: job_date,
        //created_by: check_user,
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            let accrued_today = 0;
            let i = 0
            $.each(result.data, function (key, val) {

                accrued_today += parseFloat(val['invsumtt'])

                i++
            });

            $('#accrued_today').html(numberWithCommas(accrued_today.toFixed(2)));
            $('.accrued_bill_today').html(i + ' บิล');

            table_accrued = $('#tbl-accrued').DataTable({
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
                buttons: [
                    'copyHtml5',
                    {
                        extend: 'excelHtml5',
                        title: '',
                        filename: 'REPORT_CA_ACCRUED_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                        exportOptions: {
                            columns: [3, 4, 6, 7, 8, 9, 10, 11, 12, 15, 16]
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
                        title: "<span class='tx-12'>ref_id</span>",
                        data: "ref_id",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //2
                    {
                        title: "<span class='tx-12'>วันที่บิล</span>",
                        data: "invdate",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + moment(data, 'YYYY/MM/DD').format('DD/MM/YYYY') + '</span>';
                        }
                    }, //3
                    {
                        title: "<span class='tx-12'>รหัสลูกค้า</span>",
                        data: "invcode",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<span class='tx-12'>ชื่อลูกค้า</span>",
                        data: "invname",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //5
                    {
                        title: "<span class='tx-12'>ลูกค้า</span>",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12 tx-bold">' + row.invcode + '</span>' +
                                '<br>' +
                                '<span class="tx-12">' + row.invname + '</span>';
                        }
                    }, //row
                    {
                        title: "<span class='tx-12'>เลขที่บิล</span>",
                        data: "invnumber",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //6
                    {
                        title: "<span class='tx-12'>ใบสั่งจัด</span>",
                        data: "invpo",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //7
                    {
                        title: "<span class='tx-12'>ประเภท</span>",
                        data: "invpay",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
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
                    }, //8
                    {
                        title: "<span class='tx-12'>ยอดเงิน</span>",
                        data: "invsumtt",
                        class: "tx-right align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + numberWithCommas(data.toFixed(2)) + '</span>';
                        }
                    }, //9
                    {
                        title: "<span class='tx-12'>สาขา</span>",
                        data: "invbranch",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12 tx-bold">' + data + '</span>';
                        }
                    }, //10
                    {
                        title: "<span class='tx-12'>ผู้ออกบิล</span>",
                        data: "invuserid",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //10
                    {
                        title: "<span class='tx-12'>ผู้บันทึก</span>",
                        data: "created_by",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //11
                    {
                        title: "<span class='tx-12'>เวลาบันทึก</span>",
                        data: "created_datetime",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + moment(data, 'YYYY/MM/DD hh:mm:ss').format('DD/MM/YYYY hh:mm:ss') + '</span>';
                        }
                    }, //12
                    {
                        title: "<span class='tx-12'>บันทึกโดย</span>",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12 tx-bold">' + row.created_by + '</span>' +
                                '<br>' +
                                '<span class="tx-12">' + moment(row.created_datetime, 'YYYY/MM/DD hh:mm:ss').format('DD/MM/YYYY hh:mm:ss') + '</span>';
                        }
                    }, //row
                    {
                        title: "<span class='tx-12'>หมายเหตุ</span>",
                        class: "tx-center align-middle",
                        data: "invremark",
                        render: function (data, type, row, meta) {
                            let remark = (data == '' || data == null ? '' : data)
                            return '<span class="tx-12">' + remark + '</span>';
                        }
                    }, //row
                    {
                        title: "<span class='tx-12'>event_status</span>",
                        data: "event_status",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //11
                    {
                        title: "<span class='tx-12'>จัดการ</span>",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            let action_show = ''
                            if (row.event_status == 'SUCCESS') {
                                action_show = ''
                            } else {
                                action_show = 'delete_accrued'
                            }
                            return '<a class="tx-primary remove-from-cart ' + 'remark_accued' + '" href="javascript: void(0);" data-toggle="tooltip" title="หมายเหตุ"><i class="las la-edit"></i></a>' +
                                '<a class="mg-l-10 remove-from-cart ' + action_show + '" href="javascript: void(0);" data-toggle="tooltip" title="ลบรายการ" data-original-title="Remove item"><i class="las la-trash"></i></a>';
                        }
                    }, //13
                ],
                "initComplete": function (settings, json) {

                    $('#tbl-accrued tbody').off('click', '.remark_accued').on('click', '.remark_accued', async function (e) {

                        e.preventDefault();

                        $(this).on('click', function (e) {
                            e.preventDefault();
                        });

                        var citem = table_accrued.row($(this).parents('tr')).data();

                        console.log('citem', citem)

                        if (check_user != user_id) {

                            toastr.error('Error, ผู้ใช้งานไม่ตรงกัน');

                        } else {

                            $('#frm_remark').find('input').prop('disabled', true)
                            $('#frm_remark').find('#r_invremark').prop('disabled', false)

                            $('#frm_remark').find('#r_invdate').val(moment(citem['invdate'], 'YYYY/MM/DD').format('DD/MM/YYYY'))
                            $('#frm_remark').find('#r_invnumber').val(citem['invnumber'])
                            $('#frm_remark').find('#r_invpo').val(citem['invpo'])
                            $('#frm_remark').find('#r_invcode').val(citem['invcode'])
                            $('#frm_remark').find('#r_invname').val(citem['invname'])
                            $('#frm_remark').find('#r_invbranch').val(citem['invbranch'])
                            $('#frm_remark').find('#r_invpay').val(citem['invpay'])
                            $('#frm_remark').find('#r_invsumtt').val(citem['invsumtt'].toFixed(2))
                            $('#frm_remark').find('#r_invremark').val(citem['invremark'])

                            await $('#modal-frm_remark').modal({
                                keyboard: false,
                                backdrop: 'static'
                            });

                        }

                    });

                    $('#tbl-accrued tbody').off('click', '.delete_accrued').on('click', '.delete_accrued', async function (e) {

                        e.preventDefault();

                        $(this).on('click', function (e) {
                            e.preventDefault();
                        });

                        var citem = table_accrued.row($(this).parents('tr')).data();

                        console.log('citem', citem)

                        if (check_user != user_id) {

                            toastr.error('Error, ผู้ใช้งานไม่ตรงกัน');

                        } else {

                            await $.Accrued_Delete(citem);

                        }

                    });

                },
            });

            $("#loading-tabs").LoadingOverlay("hide", true);

        }
    });

}

$.Accrued_Remark = async function (citem) {

    //console.log('citem', citem)

    let data_update = {
        ref_id: ref_id,
        invnumber: $('#r_invnumber').val(),
        invbranch: $('#r_invbranch').val(),
        invremark: $('#r_invremark').val(),
        created_by: user_id,
    };

    var params = [];
    for (const i in data_update) {
        params.push(i + "=" + encodeURIComponent(data_update[i]));
    }

    fetch(url_accrued_remark, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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

            if (result.data[0]['pMessage'] != null) {

                toastr.error(result.data[0]['pMessage']);

            } else {

                if (result.length > 0) {

                    toastr.success('บันทึกสำเร็จ');

                    $.Daily_Cashier_Detail()

                    $('#modal-frm_remark').modal('hide');

                } else {

                    toastr.error('บันทึกไม่สำเร็จ');

                }
            }

            $('.modal-remark').LoadingOverlay("hide", true);

        }

    }).catch(error => {

        toastr.error('Error, Please contact administrator.');

    });

};

$.Accrued_Delete = async function (citem) {

    //console.log('citem', citem)

    let data_update = {
        trans_id: citem['trans_id'],
        ref_id: citem['ref_id'],
        updated_by: user_id,
    };

    var params = [];
    for (const i in data_update) {
        params.push(i + "=" + encodeURIComponent(data_update[i]));
    }

    fetch(url_accrued_delete, {
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

                //swal({
                //    title: "สำเร็จ!",
                //    text: "ทำรายการสำเร็จ",
                //    type: "warning",
                //    showConfirmButton: false,
                //    timer: 1000
                //})

                toastr.warning('ลบเลขที่ INV สำเร็จ');

                $.Daily_Cashier_Customer_List()

            } else {

                //swal({
                //    title: "ไม่สำเร็จ!",
                //    text: "ทำรายการไม่สำเร็จ",
                //    type: "error",
                //    showConfirmButton: false,
                //    timer: 1000
                //})

                toastr.error('ลบเลขที่ INV ไม่สำเร็จ');

            }

            $.Daily_Cashier_Detail()

        }

    }).catch(error => {

        toastr.error('Error, Please contact administrator.');

    });

};


$.Accrued_List_Total = async function () {

    let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')

    let branch = $('#branch').val()

    let url = new URL(url_accrued_receive_list);

    url.search = new URLSearchParams({

        mode: 'ACCRUED_TOTAL_LIST',
        job_date: job_date,
        branch: branch,
        created_by: check_user
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        let i = result.length;

        var data_inv = [];

        let accrued_receive_total = 0;
        let accrued_receive_today = 0;

        $.each(result.data, function (key, val) {

            let data = JSON.stringify(val)
            let val_disabled
            if (val['pay_status'] == 'pending_payment') {
                accrued_receive_total += parseFloat(val['invsumtt'])
                val_disabled = ''
            } else if (val['pay_status'] == 'success_payment') {
                accrued_receive_today += parseFloat(val['invsumtt'])
                val_disabled = 'disabled'
            } else {
                console.log('ERROR pay_status', val['invnumber'], ':', val['pay_status'])
            }

        });

        $('#accrued_receive_today').html(numberWithCommas(accrued_receive_today.toFixed(2)));

        table_accrued_receive = $('#tbl-accrued_receive').DataTable({
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
            buttons: [
                'copyHtml5',
                {
                    extend: 'excelHtml5',
                    title: '',
                    filename: 'REPORT_CA_ACCRUED_RECEIVE_TOTAL_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                    exportOptions: {
                        columns: [3, 4, 6, 7, 8, 9, 10, 11, 12, 15, 16]
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
                    title: "<span class='tx-12'>ref_id</span>",
                    data: "ref_id",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //2
                {
                    title: "<span class='tx-12'>วันที่บิล</span>",
                    data: "invdate",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + moment(data, 'YYYY/MM/DD').format('DD/MM/YYYY') + '</span>';
                    }
                }, //3
                {
                    title: "<span class='tx-12'>รหัสลูกค้า</span>",
                    data: "invcode",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //4
                {
                    title: "<span class='tx-12'>ชื่อลูกค้า</span>",
                    data: "invname",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //5
                {
                    title: "<span class='tx-12'>ลูกค้า</span>",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12 tx-bold">' + row.invcode + '</span>' +
                            '<br>' +
                            '<span class="tx-12">' + row.invname + '</span>';
                    }
                }, //row
                {
                    title: "<span class='tx-12'>เลขที่บิล</span>",
                    data: "invnumber",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //6
                {
                    title: "<span class='tx-12'>ใบสั่งจัด</span>",
                    data: "invpo",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //7
                {
                    title: "<span class='tx-12'>ประเภท</span>",
                    data: "invpay",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
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
                }, //8
                {
                    title: "<span class='tx-12'>ยอดเงิน</span>",
                    data: "invsumtt",
                    class: "tx-right align-middle",
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + numberWithCommas(data.toFixed(2)) + '</span>';
                    }
                }, //9
                {
                    title: "<span class='tx-12'>สาขา</span>",
                    data: "invbranch",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12 tx-bold">' + data + '</span>';
                    }
                }, //10
                {
                    title: "<span class='tx-12'>ผู้ออกบิล</span>",
                    data: "invuserid",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //10
                {
                    title: "<span class='tx-12'>สถานะ</span>",
                    data: "pay_status",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //10
                {
                    title: "<span class='tx-12'>บันทึกโดย</span>",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12 tx-bold">' + row.created_by + '</span>' +
                            '<br>' +
                            '<span class="tx-12">' + moment(row.created_datetime, 'YYYY/MM/DD hh:mm:ss').format('DD/MM/YYYY hh:mm:ss') + '</span>';
                    }
                }, //row
                {
                    title: "<span class='tx-12'>ผู้บันทึก</span>",
                    data: "created_by",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //11
                {
                    title: "<span class='tx-12'>เวลาบันทึก</span>",
                    data: "created_datetime",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + moment(data, 'YYYY/MM/DD hh:mm:ss').format('DD/MM/YYYY hh:mm:ss') + '</span>';
                    }
                }, //12
                {
                    title: "<span class='tx-12'>วัน/เวลา ค้าง</span>",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + row.created_by + '</span>' +
                            '<br>' +
                            '<span class="tx-12">' + moment(row.created_datetime, 'YYYY/MM/DD hh:mm:ss').format('DD/MM/YYYY hh:mm:ss') + '</span>';
                    }
                }, //row
                {
                    title: "<span class='tx-12'>event_status</span>",
                    data: "event_status",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //11
                {
                    title: "<span class='tx-12'>จัดการ</span>",
                    class: "tx-center align-middle ml-auto",
                    render: function (data, type, row, meta) {
                        let action_update = ''
                        let action_delete = ''
                        if (row.pay_status == 'SUCCESS') {
                            action_update = ''
                            action_delete = ''
                        } else {
                            action_update = 'update_accrued_receive'
                            action_delete = 'delete_accrued_receive'
                        }
                        return '<a class="' + action_update + '" href="javascript:void(0)" data-toggle="tooltip" title="" data-original-title="Remove item"><i class="las la-hand-holding-usd tx-success tx-20"></i></a>' //+
                        // return '<a class="' + action_delete + ' mg-l-7" href="javascript:void(0)" data-toggle="tooltip" title="" data-original-title="Remove item"><i class="las la-trash tx-danger tx-20"></i></a>'
                    }
                }, //13
            ],
            "initComplete": function (settings, json) {

                $('#tbl-accrued_receive tbody').off('click', '.update_accrued_receive').on('click', '.update_accrued_receive', async function (e) {

                    e.preventDefault();

                    $(this).on('click', function (e) {
                        e.preventDefault();
                    });

                    var citem = table_accrued_receive.row($(this).parents('tr')).data();

                    console.log('citem', citem)

                    await $.Accrued_Receive_Update(citem);

                });

            },

        });

        $("#loading-tabs").LoadingOverlay("hide", true);

        let url_accrued_receive = new URL(url_accrued_receive_list);

        url_accrued_receive.search = new URLSearchParams({
            ref_id: ref_id,
            mode: 'ACCRUED_RECEIVE_TODAY',
            job_date: job_date,
        });

        fetch(url_accrued_receive).then(function (response) {
            return response.json();
        }).then(async function (result) {

            let i = 0;
            let accrued_receive_today = 0;

            $.each(result.data, function (key, val) {

                accrued_receive_today += parseFloat(val['invsumtt'])

                i++
            });

            $('#accrued_receive_today').html(numberWithCommas(accrued_receive_today.toFixed(2)));
            $('.accrued_receive_today_bill').html(i + ' บิล');

        });

    });

}


$.Accrued_Receive_Create = async function (val_inv) {

    let branch = $('#branch_accrued_receive').val()
    let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')

    let url = new URL(url_accrued_receive_create);

    url.search = new URLSearchParams({
        ref_id: ref_id,
        invnumber: val_inv,
        invbranch: branch,
        job_date: job_date,
        created_by: user_id
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        $.LoadingOverlay("hide", true);

        if (result.status === 'Error') {

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
            //console.log('result', result.data)
            if (result.data[0]['pMessage'] != null) {

                if (result.data[0]['pMessage'] == 'บิลรับชำระแล้ว') {
                    toastr.warning(result.data[0]['pMessage']);
                } else {
                    toastr.error(result.data[0]['pMessage']);
                }

            } else {

                $('#keywords_accrued_receive').focus()

                $('#keywords_accrued_receive').removeClass('parsley-error');

                toastr.success('บันทึกเลขที่บิล ' + $('#keywords_accrued_receive').val())

                $('#keywords_accrued_receive').val('')

                $.Daily_Cashier_Detail()

            }

        }

    });

};

$.Accrued_Receive_List = async function () {

    let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')
    let branch = $('#branch').val()
    let url = new URL(url_accrued_receive_list);

    url.search = new URLSearchParams({
        ref_id: ref_id,
        mode: 'ACCRUED_RECEIVE_TODAY',
        job_date: job_date,
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        let i = 0;
        var data_inv = [];
        let accrued_receive_total_bill = 0;
        let accrued_receive_today = 0;

        $.each(result.data, function (key, val) {
            let data = JSON.stringify(val)
            let val_disabled
            if (val['pay_status'] == 'pending_payment') {
                accrued_receive_total += parseFloat(val['invsumtt'])
                val_disabled = ''
            } else if (val['pay_status'] == 'success_payment') {
                accrued_receive_today += parseFloat(val['invsumtt'])
                val_disabled = 'disabled'
            } else {
                console.log('ERROR pay_status', val['invnumber'], ':', val['pay_status'])
            }
            i++
        });

        $('#accrued_receive_today').html(numberWithCommas(accrued_receive_today.toFixed(2)));
        $('.accrued_receive_today_bill').html(i + ' บิล');

        table_accrued_receive = $('#tbl-accrued_receive').DataTable({
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
            buttons: [
                'copyHtml5',
                {
                    extend: 'excelHtml5',
                    title: '',
                    filename: 'REPORT_CA_ACCRUED_RECEIVE_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                    exportOptions: {
                        columns: [3, 4, 6, 7, 8, 9, 10, 11, 12, 15, 16]
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
                    title: "<span class='tx-12'>ref_id</span>",
                    data: "ref_id",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //2
                {
                    title: "<span class='tx-12'>วันที่บิล</span>",
                    data: "invdate",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + moment(data, 'YYYY/MM/DD').format('DD/MM/YYYY') + '</span>';
                    }
                }, //3
                {
                    title: "<span class='tx-12'>รหัสลูกค้า</span>",
                    data: "invcode",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //4
                {
                    title: "<span class='tx-12'>ชื่อลูกค้า</span>",
                    data: "invname",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //5
                {
                    title: "<span class='tx-12'>ลูกค้า</span>",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12 tx-bold">' + row.invcode + '</span>' +
                            '<br>' +
                            '<span class="tx-12">' + row.invname + '</span>';
                    }
                }, //row
                {
                    title: "<span class='tx-12'>เลขที่บิล</span>",
                    data: "invnumber",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //6
                {
                    title: "<span class='tx-12'>ใบสั่งจัด</span>",
                    data: "invpo",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //7
                {
                    title: "<span class='tx-12'>ประเภท</span>",
                    data: "invpay",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
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
                }, //8
                {
                    title: "<span class='tx-12'>ยอดเงิน</span>",
                    data: "invsumtt",
                    class: "tx-right align-middle",
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + numberWithCommas(data.toFixed(2)) + '</span>';
                    }
                }, //9
                {
                    title: "<span class='tx-12'>สาขา</span>",
                    data: "invbranch",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12 tx-bold">' + data + '</span>';
                    }
                }, //10
                {
                    title: "<span class='tx-12'>ผู้ออกบิล</span>",
                    data: "invuserid",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //10
                {
                    title: "<span class='tx-12'>สถานะ</span>",
                    data: "pay_status",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        let status
                        if (data == 'pending_payment') {
                            status = '<span class="badge bg-danger-transparent text-danger">' + 'ค้างชำระ' + '</span>'
                        } else if (data == 'success_payment') {
                            status = '<span class="badge bg-success-transparent text-success">' + 'ชำระแล้ว' + '</span>'
                        } else {
                            status = '<span class="badge bg-primary-transparent text-secondary">' + '-' + '</span>'
                        }
                        return status;
                    },
                }, //10
                {
                    title: "<span class='tx-12'>บันทึกโดย</span>",
                    class: "tx-center align-middle",
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12 tx-bold">' + row.created_by + '</span>' +
                            '<br>' +
                            '<span class="tx-12">' + moment(row.created_datetime, 'YYYY/MM/DD hh:mm:ss').format('DD/MM/YYYY hh:mm:ss') + '</span>';
                    }
                }, //row
                {
                    title: "<span class='tx-12'>ผู้บันทึก</span>",
                    data: "created_by",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //11
                {
                    title: "<span class='tx-12'>เวลาบันทึก</span>",
                    data: "created_datetime",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + moment(data, 'YYYY/MM/DD hh:mm:ss').format('DD/MM/YYYY hh:mm:ss') + '</span>';
                    }
                }, //12
                {
                    title: "<span class='tx-12'>วัน/เวลา ค้าง</span>",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + row.created_by + '</span>' +
                            '<br>' +
                            '<span class="tx-12">' + moment(row.created_datetime, 'YYYY/MM/DD hh:mm:ss').format('DD/MM/YYYY hh:mm:ss') + '</span>';
                    }
                }, //row
                {
                    title: "<span class='tx-12'>event_status</span>",
                    data: "event_status",
                    class: "tx-center align-middle",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span class="tx-12">' + data + '</span>';
                    }
                }, //11
                {
                    title: "<span class='tx-12'>จัดการ</span>",
                    class: "tx-center align-middle ml-auto",
                    render: function (data, type, row, meta) {
                        let action_update = ''
                        let action_delete = ''
                        if (row.event_status == 'SUCCESS') {
                            action_update = ''
                            action_delete = ''
                        } else {
                            action_update = 'update_accrued_receive'
                            action_delete = 'delete_accrued_receive'
                        }
                        //  return '<a class="' + action_update + '" href="javascript:void(0)" data-toggle="tooltip" title="" data-original-title="Remove item"><i class="las la-hand-holding-usd tx-success tx-20"></i></a>' +
                        return '<a class="' + action_delete + ' mg-l-7" href="javascript:void(0)" data-toggle="tooltip" title="" data-original-title="Remove item"><i class="las la-trash tx-danger tx-20"></i></a>'
                    }
                }, //13
            ],
            "initComplete": function (settings, json) {

                $('#tbl-accrued_receive tbody').off('click', '.update_accrued_receive').on('click', '.update_accrued_receive', async function (e) {

                    e.preventDefault();

                    $(this).on('click', function (e) {
                        e.preventDefault();
                    });

                    var citem = table_accrued_receive.row($(this).parents('tr')).data();

                    console.log('citem', citem)

                    await $.Accrued_Receive_Update(citem['invnumber']);

                });

                $('#tbl-accrued_receive tbody').off('click', '.delete_accrued_receive').on('click', '.delete_accrued_receive', async function (e) {

                    e.preventDefault();

                    $(this).on('click', function (e) {
                        e.preventDefault();
                    });

                    var citem = table_accrued_receive.row($(this).parents('tr')).data();

                    console.log('citem', citem)

                    if (check_user != user_id) {

                        toastr.error('Error, ผู้ใช้งานไม่ตรงกัน');

                    } else {

                        await $.Accrued_Receive_Delete(citem);

                    }

                });

            },

        });
        //}

        $("#loading-tabs").LoadingOverlay("hide", true);

    });

}

$.Accrued_Receive_Update = async function (citem) {

    console.log('citem', citem)

    let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')

    if (action_status != 'CSH') {

        toastr.error('ไม่สามารถชำระในสถานะนี้ได้');

    } else {

        let url = new URL(url_accrued_receive_create);

        url.search = new URLSearchParams({
            ref_id: ref_id,
            invnumber: citem['invnumber'],
            invbranch: citem['invbranch'],
            job_date: job_date,
            created_by: user_id
        });

        fetch(url).then(function (response) {
            return response.json();
        }).then(async function (result) {

            if (result.status === 'Error') {

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

                $.LoadingOverlay("hide", true);

                if (result.data[0]['pMessage'] != null) {

                    toastr.error(result.data[0]['pMessage']);

                } else {

                    $('#keywords_accrued_receive').focus()

                    $('#keywords_accrued_receive').removeClass('parsley-error');

                    toastr.success('รับชำระบิลสำเร็จ');

                    $('#keywords_accrued_receive').val('')

                    //$.Daily_Cashier_Detail()
                    $.Daily_Cashier_Customer_Accrued_List()
                    $.Daily_Cashier_Sync_Accrued()
                    $.Accrued_Receive_List()
                }

            }

            return false;

        });

    }
};

$.Accrued_Receive_Delete = async function (citem) {

    let data_update = {
        invnumber: citem['invnumber'],
        ref_id: citem['ref_id'],
        updated_by: user_id,
    };

    var params = [];
    for (const i in data_update) {
        params.push(i + "=" + encodeURIComponent(data_update[i]));
    }

    fetch(url_accrued_receive_delete, {
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

            toastr.warning('ยกเลิกบิลรับชำระ');

            $.Daily_Cashier_Detail()
        }

    }).catch(error => {

        toastr.error('Error, Please contact administrator.');

    });

};


$.Receive_Bill_Create = async function (val_inv) {

    let branch = $('#branch_accrued_receive').val()
    let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')

    let url = new URL(url_invoice_vsk_get);

    url.search = new URLSearchParams({
        number: $('#keywords_receive_bill').val(),
        branch: branch
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result_inv) {

        $.LoadingOverlay("hide", true);

        if (result_inv.status === 'Error') {

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

            console.log('result_inv', result_inv.data)

            if (result_inv.length > 0) {

                //if (result_inv.data[0]['invtype'] == 'CH') {

                if (result_inv.data[0]['invdue'] > 0) {

                    toastr.error('ไม่ใช่ประเภทบิลเงินสดหรือเงินโอน ' + $('#keywords_receive_bill').val());

                    $('#keywords_receive_bill').focus()

                    $('#keywords_receive_bill').addClass('parsley-error');

                    $('#keywords_receive_bill').val('')

                } else {

                    let add_data = {
                        ref_id: ref_id,
                        invdate: result_inv.data[0]['invdate'],
                        invnumber: result_inv.data[0]['invnumber'],
                        invpo: result_inv.data[0]['invpo'],
                        invcode: result_inv.data[0]['invcode'],
                        invname: result_inv.data[0]['invname'],
                        invsumtt: result_inv.data[0]['invsumtt'],
                        invpay: result_inv.data[0]['invpay'],
                        invuserid: result_inv.data[0]['invuserid'],
                        invpaych: result_inv.data[0]['invpaych'],
                        invpaytr: result_inv.data[0]['invpaytr'],
                        invpaycr: result_inv.data[0]['invpaycr'],
                        invpayoth: result_inv.data[0]['invpayoth'],
                        invtoption: result_inv.data[0]['invtoption'],
                        invdue: result_inv.data[0]['invdue'],
                        invtype: result_inv.data[0]['invtype'],
                        invbranch: branch,
                        created_by: user_id
                    };

                    console.log('add_data', add_data)

                    var params = [];
                    for (const i in add_data) {
                        params.push(i + "=" + encodeURIComponent(add_data[i]));
                    }

                    fetch(url_receive_bill_create, {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        // mode: 'no-cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        body: params.join("&"),
                    }).then(data => {
                        return data.json();
                    }).then(result_data => {

                        console.log(result_data.data)

                        if (result_data.status === 'Error') {

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

                            if (result_data.data[0]['pMessage'] != null) {

                                toastr.error(result_data.data[0]['pMessage']);

                            } else {

                                $('#keywords_receive_bill').focus()

                                $('#keywords_receive_bill').removeClass('parsley-error');

                                toastr.success('บันทึกเลขที่บิล ' + $('#keywords_receive_bill').val())

                                $('#keywords_receive_bill').val('')

                                $.Receive_Bill_List()

                            }

                        }

                    });

                }

            } else {

                toastr.error('ไม่พบข้อมูล กรุณาตรวจสอบ');
            }


        }

    });

};

$.Receive_Bill_List = async function () {

    let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')
    let url = new URL(url_receive_bill_list);

    url.search = new URLSearchParams({
        ref_id: ref_id,
        //mode: mode
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        $.LoadingOverlay("hide", true);

        if (result.status === 'Error') {

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

            $('#btn-bill_upload').prop('disabled', true)

            if (result.length > 0) {
                if (result.data[0]['upload_by'] == null || result.data[0]['upload_by'] == '') {
                    $('#btn-bill_upload').prop('disabled', false)
                } else {
                    $('#btn-bill_upload').prop('disabled', true)
                }
            }

            let i = 0;
            var data_inv = [];

            let sum_ch = 0; let sum_tr = 0; let sum_cr = 0; let sum_other = 0;
            let bill_ch = 0; let bill_tr = 0; let bill_cr = 0; let bill_other = 0;
            let sum_total = 0; let sum_bill = 0;
            let accrued_receive_today = 0;

            $.each(result.data, function (key, val) {

                if (val['invtype'] == 'CH') {
                    sum_ch += parseFloat(val['invsumtt'])
                    bill_ch++
                } else if (val['invtype'] == 'TR') {
                    sum_tr += parseFloat(val['invsumtt'])
                    bill_tr++
                } else if (val['invtype'] == 'CR') {
                    sum_cr += parseFloat(val['invsumtt'])
                    bill_cr++
                } else if (val['invtype'] == 'OTHER') {
                    sum_other += parseFloat(val['invsumtt'])
                    bill_other++
                } else {
                    console.log('error')
                }

                sum_total += parseFloat(val['invsumtt'])
                sum_bill++

            });

            $('#receive_bill_cash_total').html(numberWithCommas(sum_ch.toFixed(2)));
            $('#receive_bill_cash_bill').html(bill_ch + ' บิล');

            $('#receive_bill_transfer_payment_total').html(numberWithCommas(sum_tr.toFixed(2)));
            $('#receive_bill_transfer_payment_bill').html(bill_tr + ' บิล');

            $('#receive_bill_credit_card_total').html(numberWithCommas(sum_cr.toFixed(2)));
            $('#receive_bill_credit_card_bill').html(bill_cr + ' บิล');

            $('#receive_bill_other_total').html(numberWithCommas(sum_other.toFixed(2)));
            $('#receive_bill_other_bill').html(bill_other + ' บิล');

            $('#receive_bill_sum_total').html(numberWithCommas(sum_total.toFixed(2)));
            $('#receive_bill_sum_bill').html(sum_bill + ' บิล');


            table_receive_bill = $('#tbl-receive_bill').DataTable({
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
                buttons: [
                    'copyHtml5',
                    {
                        extend: 'excelHtml5',
                        title: '',
                        filename: 'REPORT_CA_BILL_RECEIVE_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                        exportOptions: {
                            columns: [3, 4, 6, 7, 8, 9, 10, 11, 12, 15, 16, 18]
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
                        title: "<span class='tx-12'>ref_id</span>",
                        data: "ref_id",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //2
                    {
                        title: "<span class='tx-12'>วันที่บิล</span>",
                        data: "invdate",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + moment(data, 'YYYY/MM/DD').format('DD/MM/YYYY') + '</span>';
                        }
                    }, //3
                    {
                        title: "<span class='tx-12'>รหัสลูกค้า</span>",
                        data: "invcode",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<span class='tx-12'>ชื่อลูกค้า</span>",
                        data: "invname",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //5
                    {
                        title: "<span class='tx-12'>ลูกค้า</span>",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12 tx-bold">' + row.invcode + '</span>' +
                                '<br>' +
                                '<span class="tx-12">' + row.invname + '</span>';
                        }
                    }, //row
                    {
                        title: "<span class='tx-12'>เลขที่บิล</span>",
                        data: "invnumber",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //6
                    {
                        title: "<span class='tx-12'>ใบสั่งจัด</span>",
                        data: "invpo",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //7
                    {
                        title: "<span class='tx-12'>ประเภท</span>",
                        data: "invpay",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
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
                    }, //8
                    {
                        title: "<span class='tx-12'>ยอดเงิน</span>",
                        data: "invsumtt",
                        class: "tx-right align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + numberWithCommas(data.toFixed(2)) + '</span>';
                        }
                    }, //9
                    {
                        title: "<span class='tx-12'>สาขา</span>",
                        data: "invbranch",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12 tx-bold">' + data + '</span>';
                        }
                    }, //10
                    {
                        title: "<span class='tx-12'>ผู้ออกบิล</span>",
                        data: "invuserid",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //10
                    {
                        title: "<span class='tx-12'>สถานะ</span>",
                        data: "pay_status",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            let status
                            if (data == 'pending_payment') {
                                status = '<span class="badge bg-danger-transparent text-danger">' + 'ค้างชำระ' + '</span>'
                            } else if (data == 'success_payment') {
                                status = '<span class="badge bg-success-transparent text-success">' + 'ชำระแล้ว' + '</span>'
                            } else {
                                status = '<span class="badge bg-primary-transparent text-secondary">' + '-' + '</span>'
                            }
                            return status;
                        },
                    }, //10
                    {
                        title: "<span class='tx-12'>บันทึกโดย</span>",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12 tx-bold">' + row.created_by + '</span>' +
                                '<br>' +
                                '<span class="tx-12">' + moment(row.created_datetime, 'YYYY/MM/DD hh:mm:ss').format('DD/MM/YYYY hh:mm:ss') + '</span>';
                        }
                    }, //row
                    {
                        title: "<span class='tx-12'>ผู้บันทึก</span>",
                        data: "created_by",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //11
                    {
                        title: "<span class='tx-12'>เวลาบันทึก</span>",
                        data: "created_datetime",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + moment(data, 'YYYY/MM/DD hh:mm:ss').format('DD/MM/YYYY') + '</span>';
                        }
                    }, //12
                    {
                        title: "<span class='tx-12'>วัน/เวลา ค้าง</span>",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + row.created_by + '</span>' +
                                '<br>' +
                                '<span class="tx-12">' + moment(row.created_datetime, 'YYYY/MM/DD hh:mm:ss').format('DD/MM/YYYY hh:mm:ss') + '</span>';
                        }
                    }, //row
                    {
                        title: "<span class='tx-12'>event_status</span>",
                        data: "event_status",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //11
                    {
                        title: "<span class='tx-12'>จัดการ</span>",
                        class: "tx-center align-middle ml-auto",
                        render: function (data, type, row, meta) {
                            let action_update = ''
                            let action_delete = ''
                            if (row.event_status == 'SUCCESS') {
                                action_update = ''
                                action_delete = ''
                            } else {
                                action_update = 'update_receive_bill'
                                action_delete = 'delete_receive_bill'
                            }
                            //  return '<a class="' + action_update + '" href="javascript:void(0)" data-toggle="tooltip" title="" data-original-title="Remove item"><i class="las la-hand-holding-usd tx-success tx-20"></i></a>' +
                            return '<a class="' + action_delete + ' mg-l-7" href="javascript:void(0)" data-toggle="tooltip" title="" data-original-title="Remove item"><i class="las la-trash tx-danger tx-20"></i></a>'
                        }
                    }, //13
                ],
                "initComplete": function (settings, json) {

                    $('#tbl-receive_bill tbody').off('click', '.delete_receive_bill').on('click', '.delete_receive_bill', async function (e) {

                        e.preventDefault();

                        $(this).on('click', function (e) {
                            e.preventDefault();
                        });

                        var citem = table_receive_bill.row($(this).parents('tr')).data();

                        console.log('citem', citem)

                        if (check_user != user_id) {

                            toastr.error('Error, ผู้ใช้งานไม่ตรงกัน');

                        } else {

                            await $.Receive_Bill_Delete(citem);

                        }

                    });

                },

            });


            $("#loading-tabs").LoadingOverlay("hide", true);

        }
    });

}

$.Receive_Bill_Delete = async function (citem) {

    //console.log('citem', citem)

    let data_update = {
        trans_id: citem['trans_id'],
        ref_id: citem['ref_id'],
        updated_by: user_id,
    };

    var params = [];
    for (const i in data_update) {
        params.push(i + "=" + encodeURIComponent(data_update[i]));
    }

    fetch(url_receive_bill_delete, {
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

            //swal({
            //    title: "สำเร็จ!",
            //    text: "ทำรายการสำเร็จ",
            //    type: "warning",
            //    showConfirmButton: false,
            //    timer: 1000
            //})

            toastr.warning('ลบเลขที่ INV สำเร็จ');

            $.Receive_Bill_List()

        }

    }).catch(error => {

        toastr.error('Error, Please contact administrator.');

    });

};

$.Receive_Bill_Verify_List = async function () {

    let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')
    let url = new URL(url_receive_bill_verify_list);

    url.search = new URLSearchParams({
        ref_id: ref_id,
        job_date: job_date
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        $.LoadingOverlay("hide", true);

        if (result.status === 'Error') {

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

            let i = 0;

            let parameter_1 = 0; let parameter_2 = 0; let parameter_3 = 0; let parameter_4 = 0;

            $.each(result.data, function (key, val) {

                if (val['check_type'] == 'ACCRUED_TODAY_DELETE') {
                    parameter_2++
                } else if (val['check_type'] == 'ACCRUED_DAYBEFORE_CREATE' || val['check_type'] == 'CREATE_NEW_FROM_ACCURATE') {
                    parameter_3++
                } else if (val['check_type'] == 'ACCRUED_DAYBEFORE_UPDATE') {
                    parameter_4++
                } else {
                    console.log('error')
                }

                i++

            });

            $('.parameter_1').html(numberWithCommas(i));
            $('.parameter_2').html(numberWithCommas(parameter_2));
            $('.parameter_3').html(numberWithCommas(parameter_3));
            $('.parameter_4').html(numberWithCommas(parameter_4));


            table_bill_receive_verify = $('#tbl-bill_receive_verify').DataTable({
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
                buttons: [
                    'copyHtml5',
                    {
                        extend: 'excelHtml5',
                        title: '',
                        filename: 'REPORT_CA_BILL_RECEIVE_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                        //exportOptions: {
                        //    columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 16, 17]
                        //}
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
                        title: "<span class='tx-12'>วันที่บิล</span>",
                        data: "invdate",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + moment(data, 'YYYY/MM/DD').format('DD/MM/YYYY') + '</span>';
                        }
                    }, //3
                    {
                        title: "<span class='tx-12'>รหัสลูกค้า</span>",
                        data: "invcode",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<span class='tx-12'>ชื่อลูกค้า</span>",
                        data: "invname",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //5
                    {
                        title: "<span class='tx-12'>ลูกค้า</span>",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12 tx-bold">' + row.invcode + '</span>' +
                                '<br>' +
                                '<span class="tx-12">' + row.invname + '</span>';
                        }
                    }, //row
                    {
                        title: "<span class='tx-12'>เลขที่บิล</span>",
                        data: "invnumber",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //6
                    {
                        title: "<span class='tx-12'>ใบสั่งจัด</span>",
                        data: "invpo",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //7
                    {
                        title: "<span class='tx-12'>ประเภท</span>",
                        data: "invpay",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
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
                    }, //8
                    {
                        title: "<span class='tx-12'>ยอดเงิน</span>",
                        data: "invsumtt",
                        class: "tx-right align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + numberWithCommas(data.toFixed(2)) + '</span>';
                        }
                    }, //9
                    {
                        title: "<span class='tx-12'>สาขา</span>",
                        data: "invbranch",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12 tx-bold">' + data + '</span>';
                        }
                    }, //10
                    {
                        title: "<span class='tx-12'>ผู้ออกบิล</span>",
                        data: "invuserid",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //10
                    {
                        title: "<span class='tx-12'>สถานะ</span>",
                        data: "check_type",
                        class: "tx-center align-middle",
                        //render: function (data, type, row, meta) {
                        //    return '<span class="tx-12">' + data + '</span>';
                        //}
                        render: function (data, type, row, meta) {
                            let status
                            if (data == 'CREATE_NEW_FROM_ACCURATE' || data == 'ACCRUED_DAYBEFORE_CREATE') {
                                status = '<span class="text-danger">' + 'ค้างชำระ' + '</span>'
                            } else if (data == 'ACCRUED_TODAY_DELETE') {
                                status = '<span class="text-success">' + 'ชำระแล้ว / วันนี้' + '</span>'
                            } else if (data == 'ACCRUED_DAYBEFORE_UPDATE') {
                                status = '<span class="text-info">' + 'ชำระแล้ว / ย้อนหลัง' + '</span>'
                            } else {
                                status = '<span class="badge bg-primary-transparent text-secondary">' + '-' + '</span>'
                            }
                            return status;
                        },
                    }, //10
                ],
                "initComplete": function (settings, json) {



                },

            });

            $("#loading-tabs").LoadingOverlay("hide", true);

        }
    });

}

$.Receive_Bill_Verify_Upload = async function () {

    let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD') //moment(val['salefile_startdate'], 'YYYY/MM/DD').format('DD/MM/YYYY'),
    let branch = $('#branch').val()

    let url = new URL(url_receive_bill_verify_upload);

    url.search = new URLSearchParams({
        job_date: job_date,
        ref_id: ref_id,
        created_by: user_id,
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log('result', result.data)

        if (result.status === 'Error') {

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

            swal({
                title: "สำเร็จ!",
                text: "ทำรายการสำเร็จ",
                type: 'success',
                timer: 2000,
                showConfirmButton: false
            });

            setTimeout(function () {

                location.reload();

            }, 500);

        }


        $("#loading-tabs").LoadingOverlay("hide", true);


        return false;
    });

}


$.Receive_Bill_Create_Old = async function (val_inv) {

    let branch = $('#branch_accrued_receive').val()
    let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')

    let url = new URL('http://192.168.1.247/vsk-api-bill/api/acc/Salefile_Get');

    url.search = new URLSearchParams({
        invcode: $('#keywords_receive_bill').val()
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        $.LoadingOverlay("hide", true);

        if (result.status === 'Error') {

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

            if (result.length > 0) {

                let url_acc_bill_create = new URL('http://192.168.1.247/vsk-api-bill/api/acc/ACC_Bill_Create');

                let add_data = {
                    bill_invcode: $('#keywords_receive_bill').val(),
                    record_status: $('#status_receive_bill').val(),
                    created_by: user_id
                };

                console.log('add_data', add_data)

                var params = [];
                for (const i in add_data) {
                    params.push(i + "=" + encodeURIComponent(add_data[i]));
                }

                fetch(url_acc_bill_create, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    // mode: 'no-cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    body: params.join("&"),
                }).then(data => {
                    return data.json();
                }).then(result_data => {

                    console.log(result_data.data)

                    if (result_data.status === 'Error') {

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

                        $('#keywords_receive_bill').focus()

                        $('#keywords_receive_bill').removeClass('parsley-error');

                        toastr.success('บันทึกเลขที่บิล ' + $('#keywords_receive_bill').val())

                        $('#keywords_receive_bill').val('')

                        $.Receive_Bill_List()

                    }

                });

            } else {

                toastr.error('ไม่พบข้อมูล กรุณาตรวจสอบ');
            }


        }

    });

};

$.Receive_Bill_List_Old = async function () {

    let job_date = moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY/MM/DD')
    let url = new URL('http://192.168.1.247/vsk-api-bill/api/acc/ACC_Bill_Get');

    url.search = new URLSearchParams({
        created_date: job_date, //'2022-05-14',//
        created_by: check_user
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        $.LoadingOverlay("hide", true);

        if (result.status === 'Error') {

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

            let i = 0;
            var data_inv = [];

            let sum_ch = 0; let sum_tr = 0; let sum_cr = 0; let sum_other = 0;
            let bill_ch = 0; let bill_tr = 0; let bill_cr = 0; let bill_other = 0;
            let sum_total = 0; let sum_bill = 0;
            let accrued_receive_today = 0;

            $.each(result.data, function (key, val) {

                //if (val['bill_paych'] > '0') {
                //    sum_paych += parseFloat(val['bill_paych'])
                //    bill_paych++
                //} else if (val['bill_paycr'] > '0') {
                //    sum_paycr += parseFloat(val['bill_paycr'])
                //    bill_paycr++
                //} else {
                //    console.log('ERROR pay_status')
                //}

                if (val['bill_invpay'] == 'CH') {
                    sum_ch += parseFloat(val['bill_invtotal'])
                    bill_ch++
                } else if (val['bill_invpay'] == 'TR') {
                    sum_tr += parseFloat(val['bill_invtotal'])
                    bill_tr++
                } else if (val['bill_invpay'] == 'CR') {
                    sum_cr += parseFloat(val['bill_invtotal'])
                    bill_cr++
                } else if (val['bill_invpay'] == 'OTHER') {
                    sum_other += parseFloat(val['bill_invtotal'])
                    bill_other++
                } else {
                    console.log('error')
                }

                sum_total += parseFloat(val['bill_invtotal'])
                sum_bill++


            });

            $('#receive_bill_cash_total').html(numberWithCommas(sum_ch.toFixed(2)));
            $('#receive_bill_cash_bill').html(bill_ch + ' บิล');

            $('#receive_bill_transfer_payment_total').html(numberWithCommas(sum_tr.toFixed(2)));
            $('#receive_bill_transfer_payment_bill').html(bill_tr + ' บิล');

            $('#receive_bill_credit_card_total').html(numberWithCommas(sum_cr.toFixed(2)));
            $('#receive_bill_credit_card_bill').html(bill_cr + ' บิล');

            $('#receive_bill_other_total').html(numberWithCommas(sum_other.toFixed(2)));
            $('#receive_bill_other_bill').html(bill_other + ' บิล');

            //$('#receive_bill_credit_total').html(numberWithCommas(0.toFixed(2)));
            //$('#receive_bill_credit_bill').html(0 + ' บิล');

            $('#receive_bill_sum_total').html(numberWithCommas(sum_total.toFixed(2)));
            $('#receive_bill_sum_bill').html(sum_bill + ' บิล');


            table_receive_bill = $('#tbl-receive_bill').DataTable({
                data: result.data,
                dom: '<f<t>lip>',
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "ค้นหา..."
                },
                deferRender: true,
                ordering: true,
                pageLength: 10,
                bDestroy: true,
                autoWidth: false,
                columns: [
                    {
                        title: "<span class='tx-12'>#</span>",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + (meta.row + 1) + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>วันที่ใบเสร็จ</span>",
                        data: "bill_invdate",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + moment(data, 'YYYY/MM/DD').format('DD/MM/YYYY') + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>เลขที่บิล</span>",
                        data: "bill_invcode",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>ชื่อลูกค้า</span>",
                        data: "bill_invname",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>กำหนด</span>",
                        data: "bill_invdue",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + ' วัน' + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>เป็นเงิน</span>",
                        data: "bill_invtotal",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + numberWithCommas(data.toFixed(2)) + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>เงินสด</span>",
                        data: "bill_paych",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + numberWithCommas(data.toFixed(2)) + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>เงินโอน</span>",
                        data: "bill_paytr",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + numberWithCommas(data.toFixed(2)) + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>บัตรเครดิต</span>",
                        data: "bill_paycr",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + numberWithCommas(data.toFixed(2)) + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>อื่นๆ</span>",
                        data: "bill_payoth",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + numberWithCommas(data.toFixed(2)) + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>ส่งต่อ</span>",
                        data: "bill_admin",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            let status
                            if (data == 'ACC') {
                                status = '<span class="tx-primary">' + 'ACC' + '</span>'
                            } else if (data == 'FLT') {
                                status = '<span class="tx-warning">' + 'FLT' + '</span>'
                            } else if (data == 'ISR') {
                                status = '<span class="tx-success">' + 'ISR' + '</span>'
                            } else if (data == 'ONL') {
                                status = '<span class="tx-danger">' + 'ONL' + '</span>'
                            } else {
                                status = '<span class="tx-dark">' + '' + '</span>'
                            }
                            return status;
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>ผู้ดูแล</span>",
                        data: "bill_accuser",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>จัดส่ง</span>",
                        data: "bill_toption",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            let status
                            if (data == '1') {
                                status = '<span class="tx-primary">' + 'รับเอง' + '</span>'
                            } else if (data == '2') {
                                status = '<span class="tx-warning">' + 'มอเตอร์ไซค์' + '</span>'
                            } else if (data == '3') {
                                status = '<span class="tx-success">' + 'ขนส่ง' + '</span>'
                            } else {
                                status = '<span class="tx-dark">' + '' + '</span>'
                            }
                            return status;
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>ผู้บันทึก</span>",
                        data: "created_by",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>เวลาบันทึก</span>",
                        data: "created_date",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + moment(data, 'YYYY/MM/DD hh:mm:ss').format('DD/MM/YYYY hh:mm:ss') + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>วัน/เวลา ค้าง</span>",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + row.created_by + '</span>' +
                                '<br>' +
                                '<span class="tx-12">' + moment(row.created_date, 'YYYY/MM/DD hh:mm:ss').format('DD/MM/YYYY hh:mm:ss') + '</span>';
                        }
                    }, //
                    {
                        title: "<span class='tx-12'>สถานะ</span>",
                        data: "record_status",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            let status
                            if (data == '1') {
                                status = '<span class="badge bg-primary-transparent text-primary">' + 'สำเร็จ' + '</span>'
                            } else if (data == '0') {
                                status = '<span class="badge bg-danger-transparent text-danger">' + 'ยกเลิก' + '</span>'
                            }
                            return status;
                        },
                    }, //
                ],
                "initComplete": function (settings, json) {


                },

            });
            //}

            $("#loading-tabs").LoadingOverlay("hide", true);

        }
    });

    //$.ajax({
    //    async: false,
    //    url: url_bill,
    //    //url: api_config['url'] + api_config['service'] + api_config['controller'] + '/Salefile_Get',
    //    type: 'GET',
    //    data: {
    //        invcode: $('#frm_data').find('#keywords_receive_bill').val()
    //    },
    //    success: function (result) {

    //        console.log(result);

    //        if (result.data.length > 0) {

    //            $.LoadingOverlay("show");

    //            //$.ajax({
    //            //    async: false,
    //            //    url: api_config['url'] + api_config['service'] + api_config['controller'] + '/ACC_Bill_Create',
    //            //    type: 'POST',
    //            //    data: {
    //            //        bill_invcode: $('#frm_search').find('#job_inv').val(),
    //            //        record_status: $('#frm_search').find(".job_status:checked").val(),
    //            //        created_by: EmpProfile.employee_username
    //            //    },
    //            //    success: function (result) {

    //            //        table.destroy();

    //            //        options.data.source.read.params = {
    //            //            created_date: $.DateToDB($('#frm_search').find('#created_date').val()),
    //            //            created_by: EmpProfile.employee_username
    //            //        };

    //            //        table = $(".my_datatable").KTDatatable(options);

    //            //        $('#frm_search').find('#job_inv').val('');
    //            //        $.BillSum();

    //            //        toastr.success("Save Complete");

    //            //        $.LoadingOverlay("hide");

    //            //    }

    //            //});


    //        } else {

    //            alert('ไม่พบข้อมูล !!!');
    //            $('#frm_search').find('#job_inv').focus();

    //        }

    //    }

    //});

}


$.Master_Get = async function () {

    let url_Master = new URL(url_master_get);

    url_Master.search = new URLSearchParams({
        mode: 'file_type',
    });
    fetch(url_Master).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            let Master_dataSet = [];

            $.each(result.data, function (key, val) {

                Master_dataSet.push({ id: val['id'], text: val['text'] });

            });

            $('#frm_upload').find('#document_type').select2({
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
