'use strict';

let fs = firebase.firestore();
let role_code, mode;
const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const user_id = objProfile[0]['username'];
const empcode = objProfile[0]['empcode'];
let empid;
const customElement = $("<div>", {
    "css": {
        "border": "2px solid",
        "font-size": "14px",
        "text-align": "center",
        "padding": '7px'
    },

    "text": 'Please Wait...'
});

const url_api = "http://localhost:49705/";
let template_url = 'http://192.168.1.247/template/';
let url_image_employee = 'http://localhost/image_employee/'
const url_job_list = url_api + '/api/Hr_Job_List';
const url_job_create = url_api + '/api/Hr_Job_Create';
const url_job_update = url_api + '/api/Hr_Job_Update';
const url_job_delete = url_api + '/api/Hr_Job_Delete';
const url_Job_Get = url_api + '/api/Hr_Job_Get';

let table, table_list

$(document).ready(async function () {

    await $.Job_Sec();

    await $.Job_Dept();

    await $.Job_Pos();

    await $.init();

    await $.List();

});

$.init = function () {

    $('#frm_search').submit(async function (e) {

        e.preventDefault();

        $("#global-loader").fadeIn("slow");

        $.List();

    });

    $('.reset').on("click", function (e) {

        $('#frm_search').find('select').val('').trigger('change');

        e.preventDefault();

    });

    $('#modal-frm_data').off('shown.bs.modal').on('shown.bs.modal', async function (e) {

        e.preventDefault();

        $('#btn-delete').addClass('hide');
        $('#btn-submit').removeClass('hide');

        $.Create();

    });


    $('#modal-frm_data').on('hidden.bs.modal', function () {

        $("#frm_data").parsley().reset();

    });

    $('#btn-create').click(function (e) {

        e.preventDefault();

        $("#frm_data").parsley().reset();
        $("#frm_data").find('input , select').prop("disabled", false);
        $("#frm_data").find('input, select').val('');
        $("#frm_data").find('select').val('').trigger('change');


    });


};

$.List = async function () {

    let url = new URL(url_job_list);

    url.search = new URLSearchParams({

        job_type: $('#frm_search').find('#job_type').val() === '' ? '' : $('#frm_search').find('#job_type').val(),
        job_name: $('#frm_search').find('#job_name').val() === '' ? '' : $('#frm_search').find('#job_name').val(),

    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            $("#global-loader").fadeOut("slow");

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
                dom: 'Bfrtlip',
                deferRender: true,
                autoWidth: true,
                ordering: true,
                pageLength: 10,
                bDestroy: true,
                lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                buttons: [
                    'copyHtml5',
                    {
                        extend: 'excelHtml5',
                        title: '',
                        //filename: 'CarModelMix_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                        //exportOptions: {
                        //    columns: [1, 3, 4, 5, 6, 7, 8, 9, 13, 10, 11, 12, 14, 15, 16, 17, 18, 19, 25, 26]
                        //}
                    },
                ],
                columns: [
                    {
                        title: "<div class='tx-11 text-center'>job_id</div>",
                        data: "job_id",
                        visible: false,
                        class: "tx-left align-middle",
                        render: function (data, type, row, meta) {
                            return '<span >' + data + '</span>';
                        }
                    }, //1 
                    {
                        title: "<div class='tx-11 text-center'>job type</div>",
                        data: "job_type",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            let job_txt = ''
                            if (data == 1) {
                                job_txt = '<span class="badge badge-primary">ฝ่าย</span>' }
                            else if (data == 2) { job_txt = '<span class="badge badge-warning">แผนก</span>' }
                            else if (data == 3) { job_txt = '<span class="badge badge-success">ตำแหน่ง</span>' }
                            return job_txt ;
                        }
                    }, //2
                    {
                        title: "<div class='tx-11 text-center'>job name</div>",
                        data: "job_name",
                        class: "tx-left align-middle",
                        render: function (data, type, row, meta) {
                            return '<span >' + data + '</span>';
                        }
                    }, //3
                    {
                        title: "<div class='tx-11 text-center'>created by</div>",
                        data: "created_by",
                        class: "tx-left align-middle",
                        render: function (data, type, row, meta) {
                            return '<span >' + data + '</span>';
                        }
                    }, //3
                    {
                        title: "<div class='tx-11 text-center'>created date</div>",
                        data: "created_date",
                        class: "tx-left align-middle",
                        render: function (data, type, row, meta) {
                            return '<span >' + moment(data).format('DD/MM/YYYY hh:mm:ss') + '<span/>';
                        }
                    }, //7
                    {
                        title: "<div class='tx-11 text-center'>updated by</div>",
                        data: "updated_by",
                        class: "tx-left align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span >' + data + '</span>';
                        }
                    }, //3
                    {
                        title: "<div class='tx-11 text-center'>updated date</div>",
                        data: "updated_date",
                        class: "tx-left align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span >' + moment(data).format('DD/MM/YYYY hh:mm:ss') + '<span/>';
                        }
                    }, //7

                ],
                //"order": [[1, "desc"]],
                "initComplete": function (settings, json) {

                    $("#global-loader").fadeOut("slow");
                    $(".loader-spinner").addClass("d-none");

                    $.contextMenu({
                        selector: '#table-list tbody tr',
                        callback: async function (key, options) {

                            let citem = table_list.row(this).data();

                            if (key === 'edit') {

                                await $.Details(citem);
                                await $.Edit(citem);
                                $('#btn-delete').addClass('hide');
                                $('#btn-submit').removeClass('hide');

                            } else if (key === 'delete') {

                                await $.Details(citem);
                                await $.Delete(citem);
                                $('#btn-delete').removeClass('hide');
                                $('#btn-submit').addClass('hide');

                            }

                        },
                        items: {
                            "edit": { name: "Edit", icon: "edit" },
                            "delete": { name: "Delete", icon: "delete" },
                        }
                    });
                },
            });
        }
    })

};

$.Create = async function () {

    $('#btn-submit').show();

    $("#btn-submit").off('click').on('click', function (e) {

        e.preventDefault();

        $('#frm_data').parsley().validate();

        if ($('#frm_data').parsley().isValid()) {

            $('.btn-save_form').prop('disabled', true);

            let add_data = {

                job_type: $('#frm_data').find('#job_type').val(),
                job_name: $('#frm_data').find('#job_name').val(),
                created_by: user_id,
            };

            console.log('add_data', add_data)

            var params = [];
            for (const i in add_data) {
                params.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            fetch(url_job_create, {
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

                    swal(
                        {
                            title: 'เกิดข้อผิดพลาด!',
                            text: 'กรุณาติดต่อเจ้าหน้าที่!',
                            type: 'error',
                            confirmButtonColor: '#57a94f'
                        }
                    )

                    $('.btn-save_form').prop('disabled', false);

                } else {

                    if (result.data[0]['verify_status'] != null) {

                        toastr.error(result.data[0]['verify_status']);

                        $('#frm_data').find('#job_name').addClass('parsley-error');

                        $('.btn-save_form').prop('disabled', false);

                    } else {

                        toastr.success('Save Successfully!', async function () {

                            swal({
                                title: "สำเร็จ!",
                                text: "ทำรายการสำเร็จ",
                                type: 'success',
                                timer: 1000,
                                showConfirmButton: false
                            });

                            await $.List();

                            await setTimeout(function () {

                                $('#frm_data').find('#job_name').removeClass('parsley-error');

                                $('.btn-save_form').prop('disabled', false);

                                $('#modal-frm_data').modal('hide');

                            }, 100);

                        });
                    }

                }

            }).catch((error) => {

                console.error('Error:', error);
            });

            return false;
        }

    });

};

$.Details = async function (citem) {

    $('#modal-frm_data').modal({
        keyboard: false,
        backdrop: 'static'
    });

    $('#frm_data input').removeClass('parsley-error');

    console.log('ดู', citem);

    $('#btn-submit').hide();

    $('#frm_data').find('#job_type').val(citem['job_type']).trigger('change').prop('disabled', true);
    $('#frm_data').find('#job_name').val(citem['job_name']).prop('disabled', true);

};

$.Edit = async function (citem) {

    setTimeout(function () {

        $('#frm_data').find('select').prop('disabled', false);
        $('#frm_data').find('input').prop('disabled', false);
        $('#btn-submit').show();

    }, 100);

    $("#btn-submit").off('click').on('click', function (e) {

        e.preventDefault();

        $('#frm_data').parsley().validate();

        if ($('#frm_data').parsley().isValid()) {

            $('.btn-save_form').prop('disabled', true);

            let add_data = {

                job_id: citem['job_id'],
                job_type: $('#frm_data').find('#job_type').val(),
                job_name: $('#frm_data').find('#job_name').val(),
                updated_by: user_id,
            };

            console.log('add_data', add_data)

            var params = [];
            for (const i in add_data) {
                params.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            fetch(url_job_update, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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

                    swal(
                        {
                            title: 'เกิดข้อผิดพลาด!',
                            text: 'กรุณาติดต่อเจ้าหน้าที่!',
                            type: 'error',
                            confirmButtonColor: '#57a94f'
                        }
                    )

                    $('.btn-save_form').prop('disabled', false);

                } else {

                    if (result.data[0]['verify_status'] != null) {

                        toastr.error(result.data[0]['verify_status']);

                        $('.btn-save_form').prop('disabled', false);

                    } else {

                        toastr.success('Save Successfully!', async function () {

                            swal({
                                title: "สำเร็จ!",
                                text: "ทำรายการสำเร็จ",
                                type: 'success',
                                timer: 1000,
                                showConfirmButton: false
                            });

                            await $.List();

                            await setTimeout(function () {

                                $('.btn-save_form').prop('disabled', false);

                                $('#modal-frm_data').modal('hide');

                            }, 100);

                        });
                    }

                }

            }).catch((error) => {

                console.error('Error:', error);
            });

            return false;
        }

    })

};

$.Delete = async function (citem) {

    $('#btn-delete').on('click', function (e) {

        e.preventDefault();

        swal({
            title: "คุณแน่ใจหรือไม่",
            text: "ที่จะทำการอัพเดตข้อมูลนี้",
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

                let delete_data = {
                    job_id: citem['job_id'],
                    updated_by: user_id
                };

                var params = [];
                for (const i in delete_data) {
                    params.push(i + "=" + encodeURIComponent(delete_data[i]));
                }

                fetch(url_job_delete, {
                    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
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

                        swal(
                            {
                                title: 'เกิดข้อผิดพลาด!',
                                text: 'กรุณาติดต่อเจ้าหน้าที่!',
                                type: 'error',
                                confirmButtonColor: '#57a94f'
                            }
                        )

                        $('.btn-save_form').prop('disabled', false);

                    } else {

                        if (result.data[0]['verify_status'] != null) {

                            toastr.error(result.data[0]['verify_status']);

                            $('.btn-save_form').prop('disabled', false);

                        } else {

                            toastr.success('Save Successfully!', async function () {

                                swal({
                                    title: "สำเร็จ!",
                                    text: "ทำรายการสำเร็จ",
                                    type: 'success',
                                    timer: 1000,
                                    showConfirmButton: false
                                });

                                await $.List();

                                await setTimeout(function () {

                                    $('.btn-save_form').prop('disabled', false);

                                    $('#modal-frm_data').modal('hide');

                                }, 100);

                            });
                        }

                    }

                }).catch((error) => {

                    console.error('Error:', error);

                });

            } else {

                swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

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

            let job_sec_dataSet = [];

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

            let job_detp_dataSet = [];

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

            let job_pos_dataSet = [];

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

    let Employee_Get = new URL(url_employee_get);

    Employee_Get.search = new URLSearchParams({

        record_status: 1

    });

    fetch(Employee_Get).then(function (response) {
        return response.json();
    }).then(function (result) {

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

            let employee_dataSet = [];

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

            $.each(result.data, function (key, val) {

                employee_dataSet1.push({ id: val['employee_id'], text: val['employee_code'] + ' ' + val['employee_name'] });

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

