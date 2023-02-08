'use strict';

let fs = firebase.firestore();
let oTable, role_code, mode;
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
const url_employee_get = url_api + '/api/Hr_Employee_Get';
const url_employee_import_create = url_api + '/api/Hr_Employee_Import_Create';
const url_employee_import_verify = url_api + '/api/Hr_Employee_Import_Verify';
const url_employee_import_upload = url_api + '/api/Hr_Employee_Import_Upload';
const url_employee_create = url_api + '/api/Hr_Employee_Create';
const url_employee_update = url_api + '/api/Hr_Employee_Update';
const url_employee_delete = url_api + '/api/Hr_Employee_Delete';
const url_Job_Get = url_api + '/api/Hr_Job_Get';

let validator, table, options, item_action, item_id, deatailCondition, table_import


$(document).ready(async function () {

    //$('#modal-import').modal({
    //    keyboard: false,
    //    backdrop: 'static'
    //});


    await $.Job_Sec();

    await $.Job_Dept();

    await $.Job_Pos();

    await $.Employee_Get();

    await $.Leader_Get();

    await $.init();

    await $.List();

});

$.init = function () {

    //$('#btn-emp_import').hide()

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

        $.List();

    });

    $('.reset').on("click", function (e) {

        $('#frm_search').find('select').val('').trigger('change');

        e.preventDefault();

    });

    $('#modal-frm_data').on('hidden.bs.modal', function () {

        $("#frm_data").parsley().reset();

    });

    $('#modal-import').off('shown.bs.modal').on('shown.bs.modal', async function (e) {

        e.preventDefault();


        $('#frm-import').find('input').val('');
        $('#frm-import').find('.counter').html('0');
        $('#frm-import').find('input').prop('disabled', false);
        $('#frm-import').find('#btn-upload').prop('disabled', true);


        $.Import_Create()

    });

    $('#modal-import').off('hidden.bs.modal').on('hidden.bs.modal', async function () {

        await setTimeout(function () {

            location.reload();

        }, 100);

    });

    $('#btn-emp_create').click(function (e) {

        e.preventDefault();

        $("#frm_data").parsley().reset();
        $("#frm_data").find('input , select').prop("disabled", false);
        $("#frm_data").find('input, select').val('');
        $("#frm_data").find('select').val('').trigger('change');

        setTimeout(function () {

            $.Create();

            $.Ck_Employee_code();

        }, 300);

    });

    $('#btn-emp_import').click(function (e) {

        e.preventDefault();

    });

    $('#btn_downloadtemplate').on('click', function (evt) {

        location.href = template_url + 'HR_Template_Employee_Import.xlsx';

    });

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

            swal({
                title: "ขออภัย",
                text: "เกิดข้อผิดพลาด",
                type: 'error',
                timer: 2000,
                showConfirmButton: false
            });

            toastr.error('ขออภัย!');

        } else {

            oTable = $('#tbl-list').DataTable({
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
                        filename: 'CarModelMix_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                        exportOptions: {
                            columns: [1, 3, 4, 5, 6, 7, 8, 9, 13, 10, 11, 12, 14, 15, 16, 17, 18, 19, 25, 26]
                        }
                    },
                ],

                columns: [
                    {
                        title: "<div class='tx-11 text-center'>PHOTO</div>",
                        data: "employee_photo",
                        //width: "10px",
                        //visible: false,
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {

                            let photo = data == null || data == '' ? '../../assets/img/faces/1.jpg' : url_image_employee + data
                            return '<img alt="avatar" class="rounded-circle avatar-md " src="' + photo + '">'
                        }
                    }, //1 
                    {
                        title: "<div class='tx-11 text-center'>code</div>",
                        data: "employee_code",
                        //width: "5%",
                        //visible: false,
                        class: "tx-left align-middle",
                        render: function (data, type, row, meta) {
                            return '<span >' + data + '</span>';
                        }
                    }, //1 
                    {
                        title: "<div class='tx-11 text-center'>Prefix</div>",
                        data: "employee_prefix",
                        //width: "200px",
                        visible: false,
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span >' + data + '</span>';
                        }
                    }, //2
                    {
                        title: "<div class='tx-11 text-center'>Name</div>",
                        data: "employee_name",
                        class: "tx-left align-middle",
                        width: "130px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span >' + row.employee_prefix + '</span>' + '  ' + '<span >' + data + '</span>';
                        }
                    }, //3
                    {
                        title: "<div class='tx-11 text-center'>Section</div>",
                        data: "employee_sec",
                        class: "tx-left align-middle",
                        // width: "70px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;  color:;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<div class='tx-11 text-center'>Department</div>",
                        data: "employee_dept",
                        class: "tx-left align-middle",
                        //width: "70px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;  color:;">' + data + '</span>';
                        }
                    }, //5
                    {
                        title: "<div class='tx-11 text-center'>Position</div>",
                        data: "employee_pos",
                        class: "tx-left align-middle",
                        //width: "100px",
                        // visible: false,
                        render: function (data, type, row, meta) {
                            return '<span >' + data + '</span>';

                        }
                    }, //6
                    {
                        title: "<div class='tx-11 text-center'>Start date</div>",
                        data: "employee_job_startdate",
                        class: "tx-left align-middle",
                        //width: "100px",
                        // visible: false,
                        render: function (data, type, row, meta) {
                            return '<span >' + moment(data).format('DD/MM/YYYY') + '<span/>';
                        }
                    }, //7
                    {
                        title: "<div class='tx-11 text-center'>Assessment form</div>",
                        data: "employee_form",
                        class: "tx-left align-middle",
                        //width: "100px",
                        // visible: false,
                        render: function (data, type, row, meta) {
                            if (data == 1) {
                                return '<span class="tx-dark">ระดับปฏิบัติการ</span >'
                            } else if (data == 2) {
                                return '<span class="tx-dark">ระดับหัวหน้างาน</span >'
                            } else if (data == 3) {
                                return '<span class="tx-dark">ระดับบริหาร</span >'
                            } else {
                                return '<span class="tx-dark">ไม่มีแบบประเมิน</span >'
                            }
                        }
                    }, //8
                    {
                        title: "<div class='tx-11 text-center'>Assessor No: 1</div>",
                        data: "leader_name_1",
                        class: "tx-left align-middle",
                        //width: "100px",
                        // visible: false,
                        render: function (data, type, row, meta) {
                            let cdata = (data == null || data == '') ? '' : data;
                            return '<span>' + cdata + '</span>';
                        }
                    }, //6
                    {
                        title: "<div class='tx-11 text-center'>Assessor No: 2</div>",
                        data: "leader_name_2",
                        class: "tx-left align-middle",
                        //width: "100px",
                        // visible: false,
                        render: function (data, type, row, meta) {
                            let cdata = (data == null || data == '') ? '' : data;
                            return '<span>' + cdata + '</span>';
                        }
                    }, //6
                    {
                        title: "<div class='tx-11 text-center'>Assessor No: 3</div>",
                        data: "leader_name_3",
                        class: "tx-left align-middle",
                        //width: "100px",
                        // visible: false,
                        render: function (data, type, row, meta) {
                            let cdata = (data == null || data == '') ? '' : data;
                            return '<span>' + cdata + '</span>';
                        }
                    }, //6
                ],
                //"order": [[1, "desc"]],
                "initComplete": function (settings, json) {

                    $("#global-loader").fadeOut("slow");
                    $(".loader-spinner").addClass("d-none");

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
                                employee_prefix_th: data['employee_prefix_th'],
                                employee_first_name_th: data['employee_first_name_th'],
                                employee_last_name_th: data['employee_last_name_th'],
                                employee_full_name_th: data['employee_full_name_th'],
                                employee_prefix_en: data['employee_prefix_en'],
                                employee_first_name_en: data['employee_first_name_en'],
                                employee_last_name_en: data['employee_last_name_en'],
                                employee_full_name_en: data['employee_full_name_en'],
                                employee_photo: data['employee_photo'],
                                employee_nickname_th: data['employee_nickname_th'],
                                employee_nickname_en: data['employee_nickname_en'],
                            };

                            if (key === 'view') {

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

                        if (val['employee_code'] == $("#frm_data").find('#employee_code').val()) {

                            swal({
                                title: "ขออภัย",
                                text: "รหัสพนักงานซ้ำ",
                                type: 'warning',
                                timer: 2000,
                                showConfirmButton: false
                            });

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

$.Import_Create = async function () {

    $('#customFile').on('change', async function (e) {

        e.preventDefault();

        $(this).prop('disabled', true);

        var path = $(this).val();
        var fileName = path.replace(/^.*\\/, "");
        $(this).next('.custom-file-label').html(fileName);

        if ($(this).val() != '') {

            $("#global-loader").fadeIn("slow");

            let uuid = $.uuid();

            let i = 0;

            readXlsxFile(this.files[0], { dateFormat: 'YYYY/MM/DD_hh:mm:ss' }).then(async function (result) {

                console.log('result', result)

                let count_length = result.length - 2;

                if (result.length > 2) {

                    var citem_import = [];

                    $.each(result, async function (key, val) {

                        if (i > 1) {

                            citem_import.push({

                                temp_id: uuid,
                                employee_code: $.trim(val[0]),
                                employee_prefix_th: $.trim(val[1]),
                                employee_first_name_th: $.trim(val[2]),
                                employee_last_name_th: $.trim(val[3]),
                                employee_nickname_th: $.trim(val[4]),
                                employee_prefix_en: $.trim(val[5]),
                                employee_first_name_en: $.trim(val[6]),
                                employee_last_name_en: $.trim(val[7]),
                                employee_nickname_en: $.trim(val[8]),
                                employee_job_startdate: val[9],
                                employee_sec: $.trim(val[10]),
                                employee_dept: $.trim(val[11]),
                                employee_pos: $.trim(val[12]),
                                employee_level: $.trim(val[13]),
                                employee_form: $.trim(val[14]),
                                employee_leader_asses1: $.trim(val[15]),
                                employee_leader_asses2: $.trim(val[16]),
                                action_type: $.trim(val[17]),
                                created_by: user_id

                            });

                        }

                        i++

                    });

                    console.log('citem_import', citem_import)

                    await $.ajax({
                        url: url_employee_import_create,
                        type: 'POST',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify(citem_import),
                        success: function (data) {

                            if (data.status === 'Error') {

                                $("#global-loader").fadeOut("slow");

                                toastr.error('Error, Please contact administrator.');

                            } else {

                                //$("#global-loader").fadeOut("slow");

                                $.Import_Verify(uuid);

                            }
                        }

                    });

                } else {

                    $("#global-loader").fadeOut("slow");

                }

            }).then(function () {

                //$("#global-loader").fadeOut("slow");

            })

        }

    });

};

$.Import_Verify = function (uuid) {

    let url = new URL(url_employee_import_verify);

    url.search = new URLSearchParams({
        temp_id: uuid,
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log(result.data)

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

            if (result.length > 0) {

                let total_item = 0;
                let total_complete = 0;
                let total_incomplete = 0;

                $.each(result.data, function (key, val) {

                    if (val['event_status'] != 'SUCCESS') {
                        total_incomplete += parseFloat(1)
                    } else {
                        total_complete += parseFloat(1)
                    }

                    total_item++

                });

                $('#total-item').html(total_item)
                $('#total-complete').html(total_complete)
                $('#total-incomplete').html(total_incomplete)

            } 

            table_import = $('#table_import').DataTable({
                data: result.data,
                dom: '<Bf<t>lip>',
                bDestroy: true,
                deferRender: true,
                autoWidth: true,
                colReorder: true,
                scrollX: true,
                scrollCollapse: true,
                lengthMenu: [
                    [10, 25, 50, 100, -1],
                    ['10 rows', '25 rows', '50 rows', '100 rows', 'Show all']
                ],
                buttons: [
                    'copyHtml5',
                    {
                        extend: 'excelHtml5',
                        filename: 'REPORT_VALIDATE_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                        exportOptions: {
                            modifier: {
                                order: 'current',
                                page: 'all',
                                search: 'none'
                            },
                            //columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                        },
                    },
                ],
                columns: [
                    {
                        title: "คำสั่ง",
                        data: "action_type",
                        class: "tx-left",
                        width: "30px",
                        render: function (data, type, row, meta) {
                            let tx_color
                            if (data == 'CREATE') { tx_color = 'text-success' }
                            else if (data == 'UPDATE') { tx_color = 'text-warning' }
                            else if (data == 'DELETE') { tx_color = 'text-danger' }
                            else { tx_color = 'text-secondary' }
                            return '<span class="' + tx_color + '">' + data;
                        }
                    }, //6
                    {
                        title: "สถานะ",
                        data: "event_status",
                        class: "tx-left",
                        width: "50px",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //1
                    {
                        title: "รหัส",
                        data: "employee_code",
                        class: "tx-left",
                        width: "30px",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //2
                    {
                        title: "คำนำหน้า-ไทย",
                        data: "employee_prefix_th",
                        class: "tx-left",
                        width: "30px",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //3
                    {
                        title: "ชื่อ-ไทย",
                        data: "employee_first_name_th",
                        class: "tx-left",
                        width: "50px",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //4
                    {
                        title: "นามสกุล-ไทย",
                        data: "employee_last_name_th",
                        class: "tx-left",
                        width: "70px",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //5
                    {
                        title: "ชื่อเล่น-ไทย",
                        data: "employee_nickname_th",
                        class: "tx-left",
                        width: "30px",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //8
                    {
                        title: "ชื่อเต็ม-ไทย",
                        data: "employee_full_name_th",
                        class: "tx-left",
                        width: "140px",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "คำนำหน้า-อังกฤษ",
                        data: "employee_prefix_en",
                        class: "tx-left",
                        width: "30px",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //7
                    {
                        title: "ชื่อ-อังกฤษ",
                        data: "employee_first_name_en",
                        class: "tx-left",
                        width: "50px",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //8
                    {
                        title: "นามสกุล-อังกฤษ",
                        data: "employee_last_name_en",
                        class: "tx-left",
                        width: "70px",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //8
                    {
                        title: "ชื่อเล่น-อังกฤษ",
                        data: "employee_nickname_en",
                        class: "tx-left",
                        width: "30px",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //8
                    {
                        title: "ชื่อเต็ม-อังกฤษ",
                        data: "employee_full_name_en",
                        class: "tx-left",
                        width: "140px",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //8
                    {
                        title: "วันที่เริ่มงาน",
                        data: "employee_job_startdate",
                        class: "tx-right",
                        width: "40px",
                        render: function (data, type, row, meta) {
                            return '<span >' + moment(data).format('DD/MM/YYYY') + '<span/>';
                        }
                    }, //
                    {
                        title: "ระดับ",
                        data: "employee_level",
                        class: "tx-center",
                        width: "40px",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //8
                    {
                        title: "ฟอร์ม",
                        data: "employee_form",
                        class: "tx-left",
                        width: "40px",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "ฝ่าย",
                        data: "employee_sec",
                        class: "tx-left",
                        width: "70px",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "แผนก",
                        data: "employee_dept",
                        class: "tx-left",
                        width: "50px",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "ตำแหน่ง",
                        data: "employee_pos",
                        class: "tx-left",
                        width: "90px",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "ผู้ประเมินคนที่ 1",
                        data: "employee_leader_asses1",
                        class: "tx-left",
                        width: "90px",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "ผู้ประเมินคนที่ 2",
                        data: "employee_leader_asses2",
                        class: "tx-left",
                        width: "90px",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                ],
                rowCallback: function (row, data) {

                    if ((data.event_status) != 'SUCCESS') {
                        $('td:eq(1)', row).addClass('tx-danger');
                        $('td:eq(1)', row).parent().addClass('bg-danger-transparent');
                    } else {
                        $('td:eq(1)', row).addClass('tx-success');
                        $('td:eq(1)', row).parent().addClass('bg-success-transparent');
                    }

                },
                initComplete: function (settings, json) {

                    $("#global-loader").fadeOut("slow");
                    //$('.modal-body').LoadingOverlay("hide")

                    $('#btn-upload').prop('disabled', false);

                    $.Import_Upload(uuid)

                },

            });
        }

    });

};

$.Import_Upload = function (uuid) {

    $('#btn-upload').off('click').on('click', function (e) {

        e.preventDefault();

        //$('#btn-upload').prop('disabled', true)
        $(this).prop('disabled', true)

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
            closeOnCancel: false,
            showLoaderOnConfirm: true
        },
            function (isConfirm) {

                if (isConfirm) {

                    let url = new URL(url_employee_import_upload);

                    url.search = new URLSearchParams({
                        temp_id: uuid,
                        created_by: user_id
                    });

                    fetch(url).then(function (response) {
                        return response.json();
                    }).then(function (result) {

                        if (result.status === 'Error') {

                            $('#btn-upload').prop('disabled', false)

                            swal("เกิดข้อผิดพลาด", "กรุณาติดต่อเจ้าหน้าที่", "error");

                        } else {

                            swal({
                                title: "สำเร็จ!",
                                text: "ทำรายการสำเร็จ",
                                type: 'success',
                                timer: 2000,
                                showConfirmButton: false
                            });

                        }

                        $.LoadingOverlay("hide");

                    });

                } else {

                    swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                }

            });

    })

};

$.Create = async function () {

    $('#btn-submit').show();

    $("#btn-submit").off('click').on('click', function (e) {

        e.preventDefault();

        $('#frm_data').parsley().validate();

        if ($('#frm_data').parsley().isValid()) {

            $('.btn-save_form').prop('disabled', true);

            let start_date = moment($('#frm_data').find('#employee_job_startdate').val(), 'DD-MM-YYYY').format('YYYY/MM/DD')
            let employee_prefix_th = $('#frm_data').find('#employee_prefix_th').val();
            let employee_first_name_th = $('#frm_data').find('#employee_first_name_th').val();
            let employee_last_name_th = $('#frm_data').find('#employee_last_name_th').val();
            let employee_nickname_th = $('#frm_data').find('#employee_nickname_th').val();
            let employee_prefix_en = $('#frm_data').find('#employee_prefix_en').val();
            let employee_first_name_en = $('#frm_data').find('#employee_first_name_en').val();
            let employee_last_name_en = $('#frm_data').find('#employee_last_name_en').val();
            let employee_nickname_en = $('#frm_data').find('#employee_nickname_en').val();

            // Model & Repo
            let add_data = {

                employee_code: $('#frm_data').find('#employee_code').val(),
                employee_prefix: employee_prefix_th,
                employee_name: employee_first_name_th + ' ' + employee_last_name_th,
                employee_nickname: employee_nickname_th,
                employee_sec: $('#frm_data').find('#employee_sec_id').val(),
                employee_dept: $('#frm_data').find('#employee_dept_id').val(),
                employee_pos: $('#frm_data').find('#employee_pos_id').val(),
                employee_job_startdate: start_date,
                employee_leader_asses1: $('#frm_data').find('#employee_leader_asses1').val(),
                employee_leader_asses2: $('#frm_data').find('#employee_leader_asses2').val(),
                employee_leader_asses3: $('#frm_data').find('#employee_leader_asses3').val(),
                employee_form: $('#frm_data').find('#employee_form_id').val(),
                created_by: user_id,
                employee_prefix_th: $('#frm_data').find('#employee_prefix_th').val(),
                employee_first_name_th: $('#frm_data').find('#employee_first_name_th').val(),
                employee_last_name_th: $('#frm_data').find('#employee_last_name_th').val(),
                employee_nickname_th: $('#frm_data').find('#employee_nickname_th').val(),
                employee_prefix_en: $('#frm_data').find('#employee_prefix_en').val(),
                employee_first_name_en: $('#frm_data').find('#employee_first_name_en').val(),
                employee_last_name_en: $('#frm_data').find('#employee_last_name_en').val(),
                employee_nickname_en: $('#frm_data').find('#employee_nickname_en').val(),
                employee_full_name_th: employee_prefix_th + ' ' + employee_first_name_th + ' ' + employee_last_name_th,
                employee_full_name_en: employee_prefix_en + ' ' + employee_first_name_en + ' ' + employee_last_name_en
            };

            console.log('add_data', add_data)

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

                    swal({
                        title: 'Well done!',
                        text: 'You clicked the button!',
                        type: 'success',
                        confirmButtonColor: '#57a94f'
                    })

                    await $.List();

                    await setTimeout(function () {

                        $('.btn-save_form').prop('disabled', false);

                        $('#modal-frm_data').modal('hide');

                    }, 1000);

                });

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
    //$("input[name~='employee_code']").val(citem['employee_code']).prop('disabled', true);
    $('#frm_data').find('#employee_code').val(citem['employee_code']).prop('disabled', true);

    $('#frm_data').find('#employee_prefix_th').val(citem['employee_prefix_th']).trigger('change').prop('disabled', true);
    $('#frm_data').find('#employee_first_name_th').val(citem['employee_first_name_th']).prop('disabled', true);
    $('#frm_data').find('#employee_last_name_th').val(citem['employee_last_name_th']).prop('disabled', true);
    $('#frm_data').find('#employee_nickname_th').val(citem['employee_nickname_th']).prop('disabled', true);

    $('#frm_data').find('#employee_prefix_en').val(citem['employee_prefix_en']).trigger('change').prop('disabled', true);
    $('#frm_data').find('#employee_first_name_en').val(citem['employee_first_name_en']).prop('disabled', true);
    $('#frm_data').find('#employee_last_name_en').val(citem['employee_last_name_en']).prop('disabled', true);
    $('#frm_data').find('#employee_nickname_en').val(citem['employee_nickname_en']).prop('disabled', true);


    $('#frm_data').find('#employee_nickname').val(citem['employee_nickname']).prop('disabled', true);
    $('#frm_data').find('.employee_sec').val(citem['employee_sec_id']).trigger('change').prop('disabled', true);
    $('#frm_data').find('.employee_dept').val(citem['employee_dept_id']).trigger('change').prop('disabled', true);
    $('#frm_data').find('.employee_pos').val(citem['employee_pos_id']).trigger('change').prop('disabled', true);
    $('#frm_data').find('#employee_job_startdate').val(moment(citem['employee_job_startdate'], 'YYYY-MM-DD').format('DD/MM/YYYY')).prop('disabled', true);
    $('#frm_data').find('#employee_leader_asses1').val(citem['employee_leader_asses1']).trigger('change').prop('disabled', true);
    $('#frm_data').find('#employee_leader_asses2').val(citem['employee_leader_asses2']).trigger('change').prop('disabled', true);
    $('#frm_data').find('#employee_leader_asses3').val(citem['employee_leader_asses3']).trigger('change').prop('disabled', true);
    $('#frm_data').find('#employee_form_id').val(citem['employee_form']).trigger('change').prop('disabled', true);

    $('#frm_data').find('#employee_photo').attr('src', citem['employee_photo'] == null ? '../../assets/img/ecommerce/01.jpg' : url_image_employee + citem['employee_photo'])

};

$.Edit = async function (citem) {

    setTimeout(function () {

        $('#frm_data').find('#employee_job_startdate').removeAttr('disabled');
        $('#frm_data').find('select').removeAttr('disabled');
        $('#frm_data').find('input').removeAttr('disabled');
        $('#btn-submit').show();

    }, 100);


    $("#btn-submit").off('click').on('click', function (e) {

        e.preventDefault();

        $('#frm_data').parsley().validate();

        if ($('#frm_data').parsley().isValid()) {

            let start_date = moment($('#frm_data').find('#employee_job_startdate').val(), 'DD-MM-YYYY').format('YYYY/MM/DD')
            let employee_prefix_th = $('#frm_data').find('#employee_prefix_th').val();
            let employee_first_name_th = $('#frm_data').find('#employee_first_name_th').val();
            let employee_last_name_th = $('#frm_data').find('#employee_last_name_th').val();
            let employee_nickname_th = $('#frm_data').find('#employee_nickname_th').val();
            let employee_prefix_en = $('#frm_data').find('#employee_prefix_en').val();
            let employee_first_name_en = $('#frm_data').find('#employee_first_name_en').val();
            let employee_last_name_en = $('#frm_data').find('#employee_last_name_en').val();
            let employee_nickname_en = $('#frm_data').find('#employee_nickname_en').val();

            // Model & Repo
            let add_data = {
                employee_id: citem['employee_id'],
                employee_code: citem['employee_code'],
                employee_prefix: employee_prefix_th,
                employee_name: employee_first_name_th + ' ' + employee_last_name_th,
                employee_nickname: employee_nickname_th,
                employee_sec: $('#frm_data').find('#employee_sec_id').val(),
                employee_dept: $('#frm_data').find('#employee_dept_id').val(),
                employee_pos: $('#frm_data').find('#employee_pos_id').val(),
                employee_job_startdate: start_date,
                employee_leader_asses1: $('#frm_data').find('#employee_leader_asses1').val(),
                employee_leader_asses2: $('#frm_data').find('#employee_leader_asses2').val(),
                employee_leader_asses3: $('#frm_data').find('#employee_leader_asses3').val(),
                employee_form: $('#frm_data').find('#employee_form_id').val(),
                created_by: user_id,
                employee_prefix_th: $('#frm_data').find('#employee_prefix_th').val(),
                employee_first_name_th: $('#frm_data').find('#employee_first_name_th').val(),
                employee_last_name_th: $('#frm_data').find('#employee_last_name_th').val(),
                employee_nickname_th: $('#frm_data').find('#employee_nickname_th').val(),
                employee_prefix_en: $('#frm_data').find('#employee_prefix_en').val(),
                employee_first_name_en: $('#frm_data').find('#employee_first_name_en').val(),
                employee_last_name_en: $('#frm_data').find('#employee_last_name_en').val(),
                employee_nickname_en: $('#frm_data').find('#employee_nickname_en').val(),
                employee_full_name_th: employee_prefix_th + ' ' + employee_first_name_th + ' ' + employee_last_name_th,
                employee_full_name_en: employee_prefix_en + ' ' + employee_first_name_en + ' ' + employee_last_name_en
            };

            var params = [];
            for (const i in add_data) {
                params.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            fetch(url_employee_update, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params.join("&"),
            }).then(data => {

                toastr.success('Save Successfully!', async function () {

                    swal(
                        {
                            title: 'Well done!',
                            text: 'You clicked the button!',
                            type: 'success',
                            timer: 1000
                        }
                    )

                    await $.List();

                    $('#modal-frm_data').modal('hide');

                });

            }).catch((error) => {

                console.error('Error:', error);
            });

            return false;

        }
    })

};

$.Delete = async function (citem) {

    $('#btn-delete').on('click', function (e) {
        e.preventDefault

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

                let delete_data = {
                    employee_id: citem['employee_id'],
                    updated_by: name
                };

                var params = [];
                for (const i in delete_data) {
                    params.push(i + "=" + encodeURIComponent(delete_data[i]));
                }

                fetch(url_employee_delete, {
                    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                    // mode: 'no-cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    body: params.join("&"),
                }).then(data => {

                    toastr.success('Save Successfully!', async function () {

                        swal("Deleted!", "Your imaginary file has been deleted.", "success");

                        await $.List();

                        $('#modal-frm_data').modal('hide');

                    });

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

