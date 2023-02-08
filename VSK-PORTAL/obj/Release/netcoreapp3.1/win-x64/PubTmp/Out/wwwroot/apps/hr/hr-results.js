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
let quarter_dataSet = [];

const url_api = "http://localhost:49705/";
const url_results_get = url_api + '/api/Hr_Results_Get';
const url_employee_get = url_api + '/api/Hr_Employee_Get';
const url_employee_create = url_api + '/api/Hr_Employee_Create';
const url_employee_update = url_api + '/api/Hr_Employee_Update';
const url_employee_delete = url_api + '/api/Hr_Employee_Delete';
const url_Job_Get = url_api + '/api/Hr_Job_Get';
const url_quarter_get = url_api + '/api/Hr_Quarter_Get';
const url_report_pms_get = url_api + '/api/Hr_Report_Pms';
const objProfile = JSON.parse(localStorage.getItem('objProfile'));
let validator, table, options, item_action, item_id, deatailCondition;


firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
        var full_mail = user.email;
        var name = full_mail.replace("@vskautoparts.com", "");

        //console.log('user', user.email);

        $.init = function () {

            $('.data_form').select2({
                width: '100%',
                height: '40px'
            });

            $('.data_assess_by').select2({
                width: '100%',
                height: '40px'
            });

            $('.updated_status').select2({
                width: '100%',
                height: '40px'
            });

            $('#frm_search input').removeClass('select2-selection__placeholder');

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

            $('#modal-frm_opt').on('hidden.bs.modal', function () {

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

            $.Quarter_Get();
        };

        $.List = async function () {

            let url = new URL(url_results_get);

            url.search = new URLSearchParams({

                data_leader_assess: $('#frm_search').find('#data_leader_assess').val() === '' ? '' : $('#frm_search').find('#data_leader_assess').val(),
                data_employee_assess: $('#frm_search').find('#data_employee_assess').val() === '' ? '' : $('#frm_search').find('#data_employee_assess').val(),
                data_form: $('#frm_search').find('#data_form').val() === '' ? '' : $('#frm_search').find('#data_form').val(),
                data_quarter: $('#frm_search').find('#data_quarter').val() === '' ? '' : $('#frm_search').find('#data_quarter').val(),
                data_assess_by: $('#frm_search').find('#data_assess_by').val() === '' ? '' : $('#frm_search').find('#data_assess_by').val(),
                updated_status: $('#frm_search').find('#updated_status').val() === '' ? '' : $('#frm_search').find('#updated_status').val(),
                employee_sec: $('#frm_search').find('#employee_sec').val() === '' ? '' : $('#frm_search').find('#employee_sec').val(),
                employee_dept: $('#frm_search').find('#employee_dept').val() === '' ? '' : $('#frm_search').find('#employee_dept').val(),
                employee_pos: $('#frm_search').find('#employee_pos').val() === '' ? '' : $('#frm_search').find('#employee_pos').val(),
                record_status: 1,

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
                                title: "<span style='font-size:11px;'>ประเมินโดย <br> Evaluated by</span>",
                                data: "data_assess_by",
                                class: "tx-center",
                                width: "100px",
                                // visible: false,
                                render: function (data, type, row, meta) {
                                    if (data == 2) {
                                        return '<span class="label text-danger ">' + '<i class="fas fa-user-tie"></i>' + '</br>' + 'หัวหน้าประเมิน' + '</span >'
                                    } else if (data == 1) {
                                        return '<span class="label text-primary ">' + '<i class="fas fa-user"></i>' + '</br>' + 'ตนเองประเมิน' + '</span >'
                                    } else {
                                        return '-'
                                    }
                                }
                            }, //8
                            {
                                title: "<span style='font-size:11px;'>วันที่ทำแบบประเมิน <br> Assessment date</span>",
                                data: "created_date",
                                class: "tx-center",
                                width: "120px",
                                // visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY HH:mm') + '<span/>';
                                }
                            }, //0
                            {
                                title: "<span style='font-size:11px;'>ผู้ถูกประเมิน <br> Assessor</span>",
                                data: "employee_name",
                                width: "130px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //1 
                            {
                                title: "<span style='font-size:11px;'>ผู้ทำการประเมิน <br> Leader</span>",
                                data: "leader_name",
                                width: "130px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //2
                            {
                                title: "<span style='font-size:11px;'>คะแนน PMS <br> Score</span>",
                                data: "data_score_pms",
                                class: "tx-center",
                                width: "70px",
                                //visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px; font-weight:bold; color:#eb5e34;">' + data + '</span>';
                                }
                            }, //4
                            {
                                title: "<span style='font-size:11px;'>เปอร์เซ็น PMS <br> Percentage</span>",
                                data: "data_percent_pms",
                                class: "tx-center",
                                width: "70px",
                                //visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px; font-weight:bold; color:#1a94eb;">' + data + ' %' + '</span>';
                                }
                            }, //5 
                            {
                                title: "<span style='font-size:11px;'>คะแนนเวลา <br> Time score</span>",
                                data: "time_score",
                                class: "tx-center",
                                width: "100px",
                                //visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px; font-weight:bold; color:#;">' + data + '</span>';
                                }
                            }, //5
                            {
                                title: "<span style='font-size:11px;'>ฟอร์มประเมิน <br> Assessment form</span>",
                                data: "data_form",
                                class: "tx-center",
                                width: "100px",
                                // visible: false,
                                render: function (data, type, row, meta) {
                                    if (data == 1) {
                                        return '<span style="font-size:11px;  color:#0800ff;">ระดับปฏิบัติการ</span >'
                                    } else if (data == 2) {
                                        return '<span style="font-size:11px;  color:#990000;">ระดับบริหาร</span >'
                                    } else {
                                        return '<span style="font-size:11px;  color:#4d485e;">ไม่มีแบบประเมิน</span >'
                                    }
                                }
                            }, //6
                            {
                                title: "<span style='font-size:11px;'>รอบประเมิน <br> Quarter</span>",
                                data: "quarter_name",
                                class: "tx-center",
                                width: "100px",
                                // visible: false,
                                render: function (data, type, row, meta) {
                                    if (data == 'ธ.ค. - มี.ค.') {
                                        return '<span class="badge badge-primary">' + data + '</span >'
                                    } else if (data == 'เม.ย. - ก.ค.') {
                                        return '<span class="badge badge-danger">' + data + '</span >'
                                    } else if (data == 'ส.ค. - พ.ย.') {
                                        return '<span class="badge badge-warning">' + data + '</span >'
                                    }
                                }
                            }, //6
                            {
                                title: "<span style='font-size:11px;'>สถานะ <br> Status</span>",
                                data: "updated_status",
                                class: "tx-center",
                                width: "100px",
                                // visible: false,
                                render: function (data, type, row, meta) {
                                    if (data == 1) {
                                        return '<span class="label text-success">' + '<div class="dot-label bg-success mr-0"></div>' + 'สำเร็จ' + '</span >'
                                    } else if (data == 2) {
                                        return '<span class="label text-danger">' + '<div class="dot-label bg-danger mr-0"></div>' + 'ยกเลิก' + '</span >'
                                    } else if (data == 0) {
                                        return '<span class="label text-secondary">' + '<div class="dot-label bg-secondary mr-0"></div>' + 'รอ' + '</span >'
                                    } else {
                                        return '-'
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
                                        data_id: data['data_id'],
                                        data_leader_assess: data['data_leader_assess'],
                                        leader_name: data['leader_name'],
                                        data_employee_assess: data['data_employee_assess'],
                                        employee_name: data['employee_name'],
                                        data_form: data['data_form'],
                                        data_form_name: data['data_form_name'],
                                        data_quarter: data['data_quarter'],
                                        quarter_name: data['quarter_name'],
                                        data_assess_by: data['data_assess_by'],
                                        assess_by: data['assess_by'],
                                        data_score_pms: data['data_score_pms'],
                                        data_percent_pms: data['data_percent_pms'],
                                        time_score: data['time_score'],
                                        updated_status: data['updated_status'],
                                        updated_command: data['updated_command'],
                                        data_c_good: data['data_c_good'],
                                        data_c_fail: data['data_c_fail'],
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

                                    $('#modal-frm_opt').modal({

                                        keyboard: false,
                                        backdrop: 'static'

                                    });

                                    if (key === 'view') {
                                        //console.log(citem);
                                        $.Details(citem);
                                        $('#modal-frm_opt').modal('hide');


                                    } else if (key === 'report') {

                                        $.Report(citem);
                                        $('#btn-delete').addClass('hide');
                                        $('#modal-frm_data').modal('hide');

                                    } else if (key === 'edit') {

                                        await $.Details(citem);
                                        await $.Edit(citem);
                                        $('#modal-frm_opt').modal('hide');

                                    } else if (key === 'delete') {

                                        await $.Details(citem);
                                        await $.Delete(citem);
                                        $('#btn-delete').removeClass('hide');
                                        $('#btn-submit').addClass('hide');
                                        $('#modal-frm_opt').modal('hide');

                                    } else {

                                        alert('ERROR');

                                    }
                                },
                                items: {
                                    "view": { name: "View", icon: "fas fa-search" },
                                    "report": { name: "Report", icon: "fas fa-search" },
                                    "edit": { name: "Edit", icon: "edit" },
                                    "delete": { name: "Delete", icon: "delete" },
                                }
                            });



                        },
                    });


                }
            })

        };

        $.Details = async function (citem) {

            let update_status = citem['updated_status'];
            console.log('ดู', citem['data_id']);

            $('#btn-submit').hide();
            //$('#frm_opt').find('#data_pms').html(citem['created_date']);
            $('#data_pms').html(moment(citem['created_date']).format('DD/MM/YYYY HH:mm'));
            
            $('#quarter_pms').html(citem['quarter_name']);
            $('#assessor_pms').html(citem['leader_name']);
            $('#assess_pms').html(citem['employee_name']);
            $('#score_pms').html(citem['data_score_pms']);
            $('#percentage_pms').html(citem['data_percent_pms']);
            $('#score_time').html(citem['time_score']);
            $('.update_status').val(citem['updated_status']);
            $('#remark_pms').val(citem['updated_command']).prop('disabled', true);

            if (update_status == 0) {
                $('#update_status_0').prop("checked", true).prop('disabled', false);
                $('#update_status_1').prop("checked", false).prop('disabled', true);
                $('#update_status_2').prop("checked", false).prop('disabled', true);
            } else if (update_status == 1) {
                $('#update_status_0').prop("checked", false).prop('disabled', true);
                $('#update_status_1').prop("checked", true).prop('disabled', false);
                $('#update_status_2').prop("checked", false).prop('disabled', true);
            } else if (update_status == 2) {
                $('#update_status_0').prop("checked", false).prop('disabled', true);
                $('#update_status_1').prop("checked", false).prop('disabled', true);
                $('#update_status_2').prop("checked", true).prop('disabled', false);
            } 

           

        };

        $.Report = async function (citem) {

            let Get_report_pms = new URL(url_report_pms_get);

            Get_report_pms.search = new URLSearchParams({

                data_id: citem['data_id'],

            });


            fetch(Get_report_pms).then(function (response) {

                return response.json();

            }).then(function (result) {

                if (result.status === 'Error') {

                    $.LoadingOverlay("hide");

                    $("#global-loader").fadeOut("slow");

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'ไม่สามารถเรียกข้อมูล เวลาาของพนักงานได้'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    })

                } else {

                    $.each(result.data, function (key, val) {

                       

                        let pms_item = ({
                            score_id: val['score_id'],
                            sc_data_id: val['sc_data_id'],
                            sc_topic: val['sc_topic'],
                            sc_weight: val['sc_weight'],
                            sc_score: val['sc_score'],
                            sc_comment: val['sc_comment'],
                            sc_order: val['sc_order'],
                            record_status: val['record_status'],
                            created_by: val['created_by'],
                            created_date: val['created_date'],
                            updated_by: val['updated_by'],
                            updated_date: val['updated_date'],
                           
                        });

                        //$('#assessment-list').append('<tr style="background-color:#F8F8FF; font-weight:bold">' +
                        //    '<td align = "center" style = "font-weight:bold">' + 'l' + '</td>' +
                        //    '<td class="kt-align-center kt-font-bold kt-hidden">50%</td>' +
                        //    '<td class="kt-align-center kt-font-bold"></td>' +
                        //    '<td colspan="6" class="kt-align-center kt-hidden" title="(1.1) + (1.2) + (1.3)" data-toggle="tooltip" data-placement="top"><span class="sum_total" id="sum_total' + '55' + '">0</span>%</td>' +
                        //    '<td colspan="6" class="kt-align-center" title="(1.1) + (1.2) + (1.3)" data-toggle="tooltip" data-placement="top"><span class="" ' + '' + '></span></td>' +
                        //    '</tr >');

                        //$('#assessment-list').append('<tr >' +
                        //    '<td valign="middle" style="vertical-align:middle;">' + pms_item['sc_topic'] + '</td>' + 
                        //    '<td valign="middle" style="vertical-align:middle;" class="text-center custom-hide">' + pms_item['sc_weight'] + '</td>' +
                        //    '<td><input type="text" class="form-control c_1_1_1 comment" id="' + pms_item['sc_score'] + '" required /></td>'+
                        //    '<td><input type="text" class="form-control c_1_1_1 comment" id="' + pms_item['sc_comment'] + '" required /></td>'+
                        //    '</tr >')

                    });


                }

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

                    $('#employee_dept').select2({
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

                    $('#employee_pos').select2({
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

        $.Quarter_Get = function () {

            let quarter_get = new URL(url_quarter_get);

            quarter_get.search = new URLSearchParams({

                quarter_id: ''

            });
            fetch(quarter_get).then(function (response) {
                return response.json();
            }).then(function (result) {
                if (result.status === 'Error') {



                    $("#global-loader").fadeOut("slow");

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'ไม่สามารถเรียกข้อมูล รอบประเมินได้',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            //location.reload();
                        }
                    })
                } else {

                    $.each(result.data, function (key, val) {
                        quarter_dataSet.push({ id: val['quarter_id'], text: val['quarter_name'] + val['quarter_year'] });

                    });

                    $('.data_quarter').select2({
                        width: '100%',
                        height: '40px',
                        data: quarter_dataSet,
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

                    $('#data_employee_assess').select2({
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

                    $('#data_leader_assess').select2({
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