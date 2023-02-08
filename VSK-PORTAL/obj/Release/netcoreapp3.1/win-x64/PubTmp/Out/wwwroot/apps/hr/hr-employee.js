'use strict';

let fs = firebase.firestore();
let oTable, history_Table, role_code, mode;
let inventorycode_dataset = [];
let invfrecode_dataset = [];

let invname_dataSet = [];
let invname_dataSet_list = [];
let job_sec_dataSet = [];
let job_detp_dataSet = [];
let job_pos_dataSet = [];

const url_api = "http://localhost:49705/";
const url_employee_get = url_api + '/api/Hr_Employee_Get';
const url_employee_create = url_api + '/api/Hr_Employee_Create';
const url_employee_update = url_api + '/api/Hr_Employee_Update';
const url_employee_delete = url_api + '/api/Hr_Employee_Delete';
const url_Job_Get = url_api + '/api/Hr_Job_Get';

const objProfile = JSON.parse(localStorage.getItem('objProfile'));
let validator, table, options, item_action, item_id, deatailCondition;


firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
        var full_mail = user.email;
        var name = full_mail.replace("@vskautoparts.com", "");

        //console.log('user', user.email);

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

                $("#global-loader").fadeIn("slow");

                oTable.destroy();

                $.List();

            });

            $('.reset').on("click", function (e) {

                $('#frm_search').find('select').val('').trigger('change');

                e.preventDefault();

            });

            $('#modal-frm_history').on('hidden.bs.modal', function () {

                history_Table.destroy();
            });

            $('#modal-frm_data').on('hidden.bs.modal', function () {




            });

            $('#btn-emp_create').click(function (e) {

                e.preventDefault();

                $.Create();

                $.Ck_Employee_code();

            });

            $.Job_Sec();

            $.Job_Dept();

            $.Job_Pos();

            $.Employee_Get();

            $.Leader_Get();
        };

        $.List = async function () {

            let url = new URL(url_employee_get);

            url.search = new URLSearchParams({

                employee_id: $('#frm_search').find('#employee_name').val() === '' ? '' : $('#frm_search').find('#employee_name').val(),
                employee_form: $('#frm_search').find('#employee_form').val() === '' ? '' : $('#frm_search').find('#employee_form').val(),
                employee_sec: $('#frm_search').find('#employee_sec').val() === '' ? '' : $('#frm_search').find('#employee_sec').val(),
                employee_dept: $('#frm_search').find('#employee_dept').val() === '' ? '' : $('#frm_search').find('#employee_dept').val(),
                employee_pos: $('#frm_search').find('#employee_pos').val() === '' ? '' : $('#frm_search').find('#employee_pos').val(),

            });

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {

                if (result.status === 'Error') {

                    $("#global-loader").fadeOut("slow");

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

                    oTable = $('#tbl-list').DataTable({
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
                                title: "<span style='font-size:11px;'>รหัสพนักงาน <br> Employee code</span>",
                                data: "employee_code",
                                width: "70px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //1 
                            {
                                title: "<span style='font-size:11px;'>คำนำหน้า <br> Prefix</span>",
                                data: "employee_prefix",
                                width: "300px",
                                visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //2
                            {
                                title: "<span style='font-size:11px;'>ชื่อ <br> Name</span>",
                                data: "employee_name",
                                class: "tx-center",
                                width: "70px",
                                //visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + row.employee_prefix + '</span>' + '  ' + '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //3
                            {
                                title: "<span style='font-size:11px;'>ฝ่าย <br> Section</span>",
                                data: "employee_sec",
                                class: "tx-center",
                                width: "70px",
                                //visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;  color:;">' + data + '</span>';
                                }
                            }, //4
                            {
                                title: "<span style='font-size:11px;'>แผนก <br> Department</span>",
                                data: "employee_dept",
                                class: "tx-center",
                                width: "70px",
                                //visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;  color:;">' + data + '</span>';
                                }
                            }, //5
                            {
                                title: "<span style='font-size:11px;'>ตำแหน่ง <br> Position</span>",
                                data: "employee_pos",
                                class: "tx-center",
                                width: "100px",
                                // visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';

                                }
                            }, //6
                            {
                                title: "<span style='font-size:11px;'>วันที่เริ่มงาน <br> Start date</span>",
                                data: "employee_job_startdate",
                                class: "tx-center",
                                width: "100px",
                                // visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '<span/>';
                                }
                            }, //7
                            {
                                title: "<span style='font-size:11px;'>แบบฟอร์ม <br> Assessment form</span>",
                                data: "employee_form",
                                class: "tx-center",
                                width: "100px",
                                // visible: false,
                                render: function (data, type, row, meta) {
                                    if (data == 1) {
                                        return '<span class="badge badge-primary">ระดับปฏิบัติการ</span >'
                                    } else if (data == 2) {
                                        return '<span class="badge badge-danger">ระดับบริหาร</span >'
                                    } else {
                                        return '<span class="badge badge-secondary">ไม่มีแบบประเมิน</span >'
                                    }
                                }
                            }, //8
                        ],
                        //"order": [[1, "desc"]],
                        "initComplete": function (settings, json) {

                            $("#global-loader").fadeOut("slow");

                            $.contextMenu({
                                selector: '#tbl-list tbody tr',
                                callback: async function (key, options) {

                                    let data = oTable.row(this).data();
                                    let citem = {
                                        employee_id: data['employee_id'],
                                        user_id: data['user_id'],
                                        employee_code: data['employee_code'],
                                        employee_prefix: data['employee_prefix'],
                                        employee_name: data['employee_name'],
                                        employee_nickname: data['employee_nickname'],
                                        employee_sec: data['employee_sec'],
                                        employee_dept: data['employee_dept'],
                                        employee_pos: data['employee_pos'],
                                        employee_sec_id: data['employee_sec_id'],
                                        employee_dept_id: data['employee_dept_id'],
                                        employee_pos_id: data['employee_pos_id'],
                                        employee_job_startdate: data['employee_job_startdate'],
                                        employee_leader_asses1: data['employee_leader_asses1'],
                                        employee_leader_asses2: data['employee_leader_asses2'],
                                        employee_leader_asses3: data['employee_leader_asses3'],
                                        employee_form: data['employee_form'],
                                        created_by: data['created_by'],
                                        created_date: data['created_date'],
                                        updated_by: data['updated_by'],
                                        updated_date: data['updated_date'],
                                        record_status: data['record_status'],
                                    };

                                    $('#modal-frm_data').modal({

                                        keyboard: false,
                                        backdrop: 'static'

                                    });

                                    if (key === 'view') {
                                        //console.log(citem);
                                        $.Details(citem);
                                        $('#btn-delete').addClass('hide');


                                    } else if (key === 'edit') {

                                        await $.Details(citem);
                                        await $.Edit(citem);
                                        $('#btn-delete').addClass('hide');

                                    } else if (key === 'delete') {

                                        await $.Details(citem);
                                        await $.Delete(citem);
                                        $('#btn-delete').removeClass('hide');
                                        $('#btn-submit').addClass('hide');


                                    }
                                    else if (key === 'create') {
                                        $('#btn-delete').addClass('hide');

                                        //$.Create();

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

        $.Ck_Employee_code = async function () {


            $("#frm_data").find('#employee_code').off('keyup').on('keyup', function (evt) {

                evt.preventDefault();


                if ($(this).val().length === 5) {

                    let get_ck = new URL(url_employee_get);

                    get_ck.search = new URLSearchParams({

                        employee_code: $(this).val()

                    });

                    fetch(get_ck).then(function (response) {
                        return response.json();
                    }).then(function (result) {
                        if (result.status === 'Error') {

                            $.LoadingOverlay("hide");

                            $("#global-loader").fadeOut("slow");

                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong!'
                            }).then((result) => {

                                if (result.isConfirmed) {

                                    location.reload();

                                }
                            })

                        } else {

                            $.each(result.data, function (key, val) {

                                if (val['employee_code'] == $("#frm_data").find('#employee_code').val()) {

                                    Swal.fire({
                                        icon: 'warning',
                                        title: 'Oops...',
                                        text: 'รหัสพนักงานซ้ำ'
                                    })

                                    $("#frm_data").find('#btn-submit').prop('disabled', true);


                                } else {


                                    $("#frm_data").find('#btn-submit').prop('disabled', false);
                                }



                            });


                        }

                    });


                } else {

                    $("#frm_data").find('#btn-submit').prop('disabled', false);
                }


            });

        };

        $.Create = async function () {

            $('#btn-submit').show();
            $('#frm_data input').val('');
            $('#frm_data select').val('');
            $("input[name~='employee_code']").val('').prop('readonly', false);
            $("input[name~='employee_name']").val('').prop('readonly', false);
            $("input[name~='employee_nickname']").val('').prop('readonly', false);
            $('#frm_data').find('#employee_prefix').prop('disabled', false);
            $('#frm_data').find('.employee_sec').prop('disabled', false);
            $('#frm_data').find('.employee_dept').prop('disabled', false);
            $('#frm_data').find('.employee_pos').prop('disabled', false);
            $('#frm_data').find('#employee_job_startdate').prop('disabled', false);
            $('#frm_data').find('#employee_leader_asses1').prop('disabled', false);
            $('#frm_data').find('#employee_leader_asses2').prop('disabled', false);
            $('#frm_data').find('#employee_leader_asses3').prop('disabled', false);
            $('#frm_data').find('#employee_form_id').val('').trigger('change').prop('disabled', false);
            $('#frm_data').parsley().on('form:submit', function () {
                $.LoadingOverlay("show");

                $('.btn-save_form').prop('disabled', true);
                let start_date = moment($('#frm_data').find('#employee_job_startdate').val(), 'DD-MM-YYYY').format('YYYY/MM/DD')
                // Model & Repo
                let add_data = {

                    employee_code: $('#frm_data').find('#employee_code').val(),
                    employee_prefix: $('#frm_data').find('#employee_prefix').val(),
                    employee_name: $('#frm_data').find('#employee_name').val(),
                    employee_nickname: $('#frm_data').find('#employee_nickname').val(),
                    employee_sec: $('#frm_data').find('#employee_sec_id').val(),
                    employee_dept: $('#frm_data').find('#employee_dept_id').val(),
                    employee_pos: $('#frm_data').find('#employee_pos_id').val(),
                    employee_job_startdate: start_date,
                    employee_leader_asses1: $('#frm_data').find('#employee_leader_asses1').val(),
                    employee_leader_asses2: $('#frm_data').find('#employee_leader_asses2').val(),
                    employee_leader_asses3: $('#frm_data').find('#employee_leader_asses3').val(),
                    employee_form: $('#frm_data').find('#employee_form_id').val(),
                    created_by: name
                };

                var params = [];
                for (const i in add_data) {
                    params.push(i + "=" + encodeURIComponent(add_data[i]));
                }

                fetch(url_employee_create, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    // mode: 'no-cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    body: params.join("&"),
                }).then(data => {

                    toastr.success('Save Successfully!', async function () {

                        $.LoadingOverlay("hide");

                        await oTable.destroy();

                        await $.List();

                        await setTimeout(function () {

                            $('.btn-save_form').prop('disabled', false);

                            // $("#frm_data").parsley().reset();

                            $('#modal-frm_data').modal('hide');

                        }, 1000);

                    });

                }).catch((error) => {
                    $.LoadingOverlay("hide");

                    console.error('Error:', error);
                });

                return false;

            });

        };

        $.Details = async function (citem) {

            $('#frm_data input').removeClass('parsley-error');
            console.log('ดู', citem['employee_code']);
            $('#btn-submit').hide();
            $("input[name~='employee_code']").val(citem['employee_code']).prop('readonly', true);
            $('#frm_data').find('#employee_prefix').val(citem['employee_prefix']).trigger('change').prop('disabled', true);
            $('#frm_data').find('#employee_name').val(citem['employee_name']).prop('readonly', true);
            $('#frm_data').find('#employee_nickname').val(citem['employee_nickname']).prop('readonly', true);
            $('#frm_data').find('.employee_sec').val(citem['employee_sec_id']).trigger('change').prop('disabled', true);
            $('#frm_data').find('.employee_dept').val(citem['employee_dept_id']).trigger('change').prop('disabled', true);
            $('#frm_data').find('.employee_pos').val(citem['employee_pos_id']).trigger('change').prop('disabled', true);
            $('#frm_data').find('#employee_job_startdate').val(moment(citem['employee_job_startdate'], 'YYYY-MM-DD').format('DD/MM/YYYY')).prop('disabled', true);
            $('#frm_data').find('#employee_leader_asses1').val(citem['employee_leader_asses1']).trigger('change').prop('disabled', true);
            $('#frm_data').find('#employee_leader_asses2').val(citem['employee_leader_asses2']).trigger('change').prop('disabled', true);
            $('#frm_data').find('#employee_leader_asses3').val(citem['employee_leader_asses3']).trigger('change').prop('disabled', true);
            $('#frm_data').find('#employee_form_id').val(citem['employee_form']).trigger('change').prop('disabled', true);



        };

        $.Edit = async function (citem) {

            setTimeout(function () {

                $('#frm_data').find('#employee_job_startdate').removeAttr('disabled');
                $('#frm_data').find('select').removeAttr('disabled');
                $('#frm_data').find('input').removeAttr('readonly');
                $('#btn-submit').show();
            }, 100);

            $('#frm_data').parsley().on('form:submit', function () {

                $.LoadingOverlay("show");

                //$('.btn-save_form').prop('disabled', true);
                let start_date = moment($('#frm_data').find('#employee_job_startdate').val(), 'DD-MM-YYYY').format('YYYY/MM/DD')
                // Model & Repo
                let add_data = {
                    employee_id: citem['employee_id'],
                    employee_code: $('#frm_data').find('#employee_code').val(),
                    employee_prefix: $('#frm_data').find('#employee_prefix').val(),
                    employee_name: $('#frm_data').find('#employee_name').val(),
                    employee_nickname: $('#frm_data').find('#employee_nickname').val(),
                    employee_sec: $('#frm_data').find('#employee_sec_id').val(),
                    employee_dept: $('#frm_data').find('#employee_dept_id').val(),
                    employee_pos: $('#frm_data').find('#employee_pos_id').val(),
                    employee_job_startdate: start_date,
                    employee_leader_asses1: $('#frm_data').find('#employee_leader_asses1').val(),
                    employee_leader_asses2: $('#frm_data').find('#employee_leader_asses2').val(),
                    employee_leader_asses3: $('#frm_data').find('#employee_leader_asses3').val(),
                    employee_form: $('#frm_data').find('#employee_form_id').val(),
                    updated_by: name
                };

                var params = [];
                for (const i in add_data) {
                    params.push(i + "=" + encodeURIComponent(add_data[i]));
                }

                fetch(url_employee_update, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    // mode: 'no-cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    body: params.join("&"),
                }).then(data => {

                    toastr.success('Save Successfully!', async function () {

                        $.LoadingOverlay("hide");

                        await oTable.destroy();

                        await $.List();

                        //await setTimeout(function () {

                        $('#modal-frm_data').modal('hide');

                        //}, 1000);

                    });

                }).catch((error) => {

                    $.LoadingOverlay("hide");

                    console.error('Error:', error);
                });

                return false;

            });

        };

        $.Delete = async function (citem) {

            //$('#btn-submit').show().html("Delete");
            //$('#btn-delete').removeClass('hide');
            //$('#btn-submit').addClass('hide');

            $('#btn-delete').on('click', function (e) {
                e.preventDefault

                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        let delete_data = {
                            employee_id: citem['employee_id'],
                            updated_by: name
                        };

                        var params = [];
                        for (const i in delete_data) {
                            params.push(i + "=" + encodeURIComponent(delete_data[i]));
                        }

                        fetch(url_employee_delete, {
                            method: 'POST', // *GET, POST, PUT, DELETE, etc.
                            // mode: 'no-cors', // no-cors, *cors, same-origin
                            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                            credentials: 'same-origin', // include, *same-origin, omit
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                            body: params.join("&"),
                        }).then(data => {


                            toastr.success('Save Successfully!', async function () {
                                Swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                )

                                $.LoadingOverlay("hide");

                                await oTable.destroy();

                                await $.List();

                                //await setTimeout(function () {

                                $('#modal-frm_data').modal('hide');

                                //}, 1000);

                                Swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                )
                            });

                        }).catch((error) => {

                            $.LoadingOverlay("hide");

                            console.error('Error:', error);
                        });
                    }
                })


            });

        };

        $.Job_Sec = function () {

            let Job_Sec_Get = new URL(url_Job_Get);

            Job_Sec_Get.search = new URLSearchParams({

                job_type: 1

            });
            fetch(Job_Sec_Get).then(function (response) {
                return response.json();
            }).then(function (result) {
                if (result.status === 'Error') {

                    $.LoadingOverlay("hide");

                    $("#global-loader").fadeOut("slow");

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

                    $.each(result.data, function (key, val) {
                        job_sec_dataSet.push({ id: val['job_id'], text: val['job_name'] });

                    });

                    $('.employee_sec').select2({
                        width: '100%',
                        height: '40px',
                        data: job_sec_dataSet,
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

        $.Job_Dept = function () {

            let Job_Dept_Get = new URL(url_Job_Get);

            Job_Dept_Get.search = new URLSearchParams({

                job_type: 2

            });
            fetch(Job_Dept_Get).then(function (response) {
                return response.json();
            }).then(function (result) {
                if (result.status === 'Error') {

                    $.LoadingOverlay("hide");

                    $("#global-loader").fadeOut("slow");

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

                    $.each(result.data, function (key, val) {
                        job_detp_dataSet.push({ id: val['job_id'], text: val['job_name'] });

                    });

                    $('.employee_dept').select2({
                        width: '100%',
                        height: '40px',
                        data: job_detp_dataSet,
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

        $.Job_Pos = function () {

            let Job_Pos_Get = new URL(url_Job_Get);

            Job_Pos_Get.search = new URLSearchParams({

                job_type: 3

            });
            fetch(Job_Pos_Get).then(function (response) {
                return response.json();
            }).then(function (result) {
                if (result.status === 'Error') {

                    $.LoadingOverlay("hide");

                    $("#global-loader").fadeOut("slow");

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

                    $.each(result.data, function (key, val) {
                        job_pos_dataSet.push({ id: val['job_id'], text: val['job_name'] });

                    });

                    $('.employee_pos').select2({
                        width: '100%',
                        height: '40px',
                        data: job_pos_dataSet,
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

        $.Employee_Get = function () {

            let employee_dataSet = [];

            let Employee_Get = new URL(url_employee_get);

            Employee_Get.search = new URLSearchParams({

                record_status: 1

            });

            fetch(Employee_Get).then(function (response) {
                return response.json();
            }).then(function (result) {

                if (result.status === 'Error') {

                    $.LoadingOverlay("hide");

                    $("#global-loader").fadeOut("slow");

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

                    $.each(result.data, function (key, val) {
                        employee_dataSet.push({ id: val['employee_id'], text: val['employee_code'] + ' ' + val['employee_name'] });

                    });

                    $('#employee_name').select2({
                        width: '100%',
                        height: '40px',
                        data: employee_dataSet,
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

        $.Leader_Get = function () {

            let employee_dataSet1 = [];

            let Leader_Get = new URL(url_employee_get);

            Leader_Get.search = new URLSearchParams({

                record_status: 1

            });
            fetch(Leader_Get).then(function (response) {
                return response.json();
            }).then(function (result) {
                if (result.status === 'Error') {

                    $.LoadingOverlay("hide");

                    $("#global-loader").fadeOut("slow");

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

                    $.each(result.data, function (key, val) {
                        employee_dataSet1.push({ id: val['employee_code'], text: val['employee_code'] + ' ' + val['employee_name'] });

                    });

                    $('#employee_leader_asses1').select2({
                        width: '100%',
                        height: '40px',
                        data: employee_dataSet1,
                        templateResult: function (data) {
                            return data.text;
                        },
                        sorter: function (data) {
                            return data.sort(function (a, b) {
                                return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                            });
                        }
                    });

                    $('#employee_leader_asses2').select2({
                        width: '100%',
                        height: '40px',
                        data: employee_dataSet1,
                        templateResult: function (data) {
                            return data.text;
                        },
                        sorter: function (data) {
                            return data.sort(function (a, b) {
                                return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                            });
                        }
                    });

                    $('#employee_leader_asses2').select2({
                        width: '100%',
                        height: '40px',
                        data: employee_dataSet1,
                        templateResult: function (data) {
                            return data.text;
                        },
                        sorter: function (data) {
                            return data.sort(function (a, b) {
                                return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                            });
                        }
                    });

                    $('#employee_leader_asses3').select2({
                        width: '100%',
                        height: '40px',
                        data: employee_dataSet1,
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

    } else {

        window.location.assign('./login');

    }

});