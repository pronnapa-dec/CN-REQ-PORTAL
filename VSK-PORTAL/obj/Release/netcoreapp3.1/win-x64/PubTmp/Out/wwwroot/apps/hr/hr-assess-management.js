'use strict';

let fs = firebase.firestore();
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const objProfile = JSON.parse(localStorage.getItem('objProfile'));
let mode;
let code;

let validator, table, options, item_action, item_id;
var data_id, data_form;
//let oTable = $('#tbl-list').DataTable({ "order": [[0, "asc"]], "pageLength": 100 });
var asse_total_1 = 0;
var asse_percent_1 = 0;
let data_leader;
const url_api = "http://localhost:49705/";
const url_hr_employee_detail = url_api + '/api/Hr_Employee_Detail';
const url_hr_employee_time = url_api + '/api/Hr_Employee_Time';
const url_hr_quarter = url_api + '/api/Hr_Quarter_Get';
const url_hr_create_data = url_api + '/api/Hr_Create_Data';
const url_hr_create_score = url_api + '/api/Hr_Create_Score';
const url_hr_check_data = url_api + '/api/Hr_Check_Data';
const url_employee_get = url_api + '/api/Hr_Employee_Get';

firebase.auth().onAuthStateChanged(function (user) {

    var full_mail = user.email;
    var uid = user.uid;
    var name = full_mail.replace("@vskautoparts.com", "");

    if (user) {

        $.init = function () {

            $('#modal-frm_data').on('hidden.bs.modal', function () {

                $("#frm_data").parsley().reset();

            });
            let code_raw = objProfile.auth_user_profile[0]['user_lname'];

            code = code_raw.substring(code_raw.length - 5, code_raw.length);
            $('#frm_detail').find('.empdetail').hide();
            $('#page_self').hide();

            $('#emp_assess').change(function () {

                var asses = $('#frm_detail').find('#emp_assess').val();

                if (asses !== "") {

                    $('#btn-save_form').prop("disabled", false);
                    $('#page_self').show();

                    $('.custom-select').on('change', function (e) {

                        e.preventDefault();

                        $('#emp_assess').prop('disabled', true);
                    });


                    let Get_Emp_Detail = new URL(url_hr_employee_detail);

                    Get_Emp_Detail.search = new URLSearchParams({

                        employee_code: $('#frm_detail').find('#emp_assess').val(),

                    });

                    fetch(Get_Emp_Detail).then(function (response) {

                        return response.json();

                    }).then(function (result) {

                        if (result.status === 'Error') {

                            $.LoadingOverlay("hide");

                            $("#global-loader").fadeOut("slow");

                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'ไม่สามารถเรียกข้อมูล รายละเอียดของพนักงานได้'
                            })

                        } else {

                            console.log('Get_Detail', result.data);

                            $('#frm_detail').find('.empdetail').show();

                            $.each(result.data, function (key, val) {

                                let eitem = ({
                                    employee_code: val['employee_code'],
                                    employee_prefix: val['employee_prefix'],
                                    employee_name: val['employee_name'],
                                    employee_sec: val['employee_sec'],
                                    employee_dept: val['employee_dept'],
                                    employee_pos: val['employee_pos'],
                                    quarter_id: val['quarter_id'],
                                    quarter_name: val['quarter_name'],
                                    employee_form: val['employee_form']

                                });

                                var employee_job_startdate = moment(val['employee_job_startdate']).format('DD/MM/YYYY');
                                var date_now = moment();
                                var date_end = moment(val['employee_job_startdate']);
                                var duration = moment.duration(date_now.diff(date_end));
                                var days = duration.asDays();
                                var years = date_now.diff(date_end, 'year');
                                date_end.add(years, 'years');
                                var months = date_now.diff(date_end, 'months');
                                date_end.add(months, 'months');
                                var days = date_now.diff(date_end, 'days');

                                data_form = val['employee_form']

                                $('#frm_data').find('.custom-hide').addClass('d-none');

                                $('#frm_detail').find('#h_employee_code').html(eitem['employee_code']);
                                $('#frm_detail').find('#h_employee_assess').html(eitem['employee_name']);
                                $('#frm_detail').find('#h_employee_sec').html(eitem['employee_sec']);
                                $('#frm_detail').find('#h_employee_dept').html(eitem['employee_dept']);
                                $('#frm_detail').find('#h_employee_pos').html(eitem['employee_pos']);
                                $('#frm_detail').find('#h_employee_job_startdate').html(employee_job_startdate);
                                $('#frm_detail').find('#h_job_old').html(years + ' ปี ' + months + ' เดือน ' + days + ' วัน');
                                $('#frm_detail').find('#h_data_quarter').html(eitem['quarter_name']);

                                $.Time(eitem);
                                $.Check_Data(eitem);
                                $.Create(eitem);
                            });



                        }

                    });

                }
            });

        };

        $.List = async function () {

            let Get_Detail = new URL(url_hr_employee_detail);

            Get_Detail.search = new URLSearchParams({

                employee_code: code

            });

            fetch(Get_Detail).then(function (response) {
                return response.json();
            }).then(function (result) {
                if (result.status === 'Error') {

                    $.LoadingOverlay("hide");

                    $("#global-loader").fadeOut("slow");

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'ไม่สามารถเรียกข้อมูล รายละเอียดของพนักงานได้'
                    })

                } else {

                    //console.log('Get_Detail', result.data);

                    $.each(result.data, function (key, val) {

                        let citem = ({
                            employee_code: val['employee_code'],
                            employee_prefix: val['employee_prefix'],
                            employee_name: val['employee_name'],
                            employee_sec: val['employee_sec'],
                            employee_dept: val['employee_dept'],
                            employee_pos: val['employee_pos'],
                            quarter_id: val['quarter_id'],
                            quarter_name: val['quarter_name'],
                            employee_form: val['employee_form']
                        });

                        var employee_job_startdate = moment(val['employee_job_startdate']).format('DD/MM/YYYY');
                        var date_now = moment();
                        var date_end = moment(val['employee_job_startdate']);
                        var duration = moment.duration(date_now.diff(date_end));
                        var days = duration.asDays();
                        var years = date_now.diff(date_end, 'year');
                        date_end.add(years, 'years');
                        var months = date_now.diff(date_end, 'months');
                        date_end.add(months, 'months');
                        var days = date_now.diff(date_end, 'days');

                        data_form = val['employee_form']
                        data_leader = val['employee_code'],

                            $('#frm_data').find('.custom-select').prepend('<option value="" selected></option>');
                        $('#frm_data').find('.custom-select').attr('required', true);
                        $('#frm_data').find('.custom-select-c').prepend('<option value="" selected></option>');
                        $('#frm_data').find('.custom-select-c').attr('required', true);
                        $('#frm_data').find('.custom-hide').addClass('d-none');
                        $('#frm_detail').find('#emp_assessor').html((citem['employee_prefix']) + ' ' + (citem['employee_name']));

                        $.Employee_Get(citem);
                    });



                }

            });


            //FORM ภาค 1 ผลการปฎิบัติงานตาม KPIs

            var ans_1_1_1 = 0;
            var ans_1_1_2 = 0;
            var ans_1_1_3 = 0;

            const sum_1_1 = function () {

                $('#sum_1_1').html(ans_1_1_1 + ans_1_1_2 + ans_1_1_3);

            };

            $('#s_1_1_1').on('change', function (e) {

                e.preventDefault();

                ans_1_1_1 = ($(this).val() / 10) * 30;

                $('#sum_1_1').html(ans_1_1_1);

                sum_1_1();

                //console.log('ans_1_1_1', ans_1_1_1)
            });

            $('#s_1_1_2').on('change', function (e) {

                e.preventDefault();

                ans_1_1_2 = ($(this).val() / 10) * 10;

                $('#sum_1_1').html(ans_1_1_2);

                sum_1_1();

                //console.log('ans_1_1_2', ans_1_1_2)
            });

            $('#s_1_1_3').on('change', function (e) {

                e.preventDefault();

                ans_1_1_3 = ($(this).val() / 10) * 10;

                $('#sum_1_1').html(ans_1_1_3);

                sum_1_1();

                //console.log('ans_1_1_3', ans_1_1_3)
            });

            //FORM ภาค 2 คุณสมบัติเฉพาะตัว

            const sum_1_2 = function () {

                var sum_1_2_1 = $('#sum_1_2_1').html();
                var sum_1_2_2 = $('#sum_1_2_2').html();
                var sum_1_2_3 = $('#sum_1_2_3').html();
                var sum_1_2_4 = $('#sum_1_2_4').html();

                $('#sum_1_2').html(Number(sum_1_2_1) + Number(sum_1_2_2) + Number(sum_1_2_3) + Number(sum_1_2_4));

            };

            //2.1 ความรู้ ความสามารถ(Knowledge, Ability)

            var ans_1_2_1_1 = 0;
            var ans_1_2_1_2 = 0;
            var ans_1_2_1_3 = 0;
            var ans_1_2_1_4 = 0;

            const sum_1_2_1 = function () {

                $('#sum_1_2_1').html(ans_1_2_1_1 + ans_1_2_1_2 + ans_1_2_1_3 + ans_1_2_1_4);

                sum_1_2();

            };

            $('.1_2_1_1').on('change', function (e) {

                e.preventDefault();

                ans_1_2_1_1 = ($(this).val() / 10) * 2.5;

                $('#sum_1_2_1_1').html(ans_1_2_1_1);

                sum_1_2_1();

            });

            $('.1_2_1_2').on('change', function (e) {

                e.preventDefault();

                ans_1_2_1_2 = ($(this).val() / 10) * 2.5;

                $('#sum_1_2_1_2').html(ans_1_2_1_2);

                sum_1_2_1();

            });

            $('.1_2_1_3').on('change', function (e) {

                e.preventDefault();

                ans_1_2_1_3 = ($(this).val() / 10) * 2.5;

                $('#sum_1_2_1_3').html(ans_1_2_1_3);

                sum_1_2_1();

            });

            $('.1_2_1_4').on('change', function (e) {

                e.preventDefault();

                ans_1_2_1_4 = ($(this).val() / 10) * 2.5;

                $('#sum_1_2_1_4').html(ans_1_2_1_4);

                sum_1_2_1();

            });

            //2.2 การตัดสินใจและแก้ไขปัญหา (Problem Solving & Decision Making)

            var ans_1_2_2_1 = 0;
            var ans_1_2_2_2 = 0;
            var ans_1_2_2_3 = 0;
            var ans_1_2_2_4 = 0;

            const sum_1_2_2 = function () {

                $('#sum_1_2_2').html(ans_1_2_2_1 + ans_1_2_2_2 + ans_1_2_2_3 + ans_1_2_2_4);
                sum_1_2();
            };

            $('.1_2_2_1').on('change', function (e) {

                e.preventDefault();

                ans_1_2_2_1 = ($(this).val() / 10) * 2.5;

                $('#sum_1_2_2_1').html(ans_1_2_2_1);

                sum_1_2_2();

            });

            $('.1_2_2_2').on('change', function (e) {

                e.preventDefault();

                ans_1_2_2_2 = ($(this).val() / 10) * 2.5;

                $('#sum_1_2_2_2').html(ans_1_2_2_2);

                sum_1_2_2();

            });

            $('.1_2_2_3').on('change', function (e) {

                e.preventDefault();

                ans_1_2_2_3 = ($(this).val() / 10) * 2.5;

                $('#sum_1_2_2_3').html(ans_1_2_2_3);

                sum_1_2_2();

            });

            $('.1_2_2_4').on('change', function (e) {

                e.preventDefault();

                ans_1_2_2_4 = ($(this).val() / 10) * 2.5;

                $('#sum_1_2_2_4').html(ans_1_2_2_4);

                sum_1_2_2();

            });

            //2.3 การทำงานร่วมกันเป็นทีม (Collaboration)

            var ans_1_2_3_1 = 0;
            var ans_1_2_3_2 = 0;
            var ans_1_2_3_3 = 0;
            var ans_1_2_3_4 = 0;

            const sum_1_2_3 = function () {

                $('#sum_1_2_3').html(ans_1_2_3_1 + ans_1_2_3_2 + ans_1_2_3_3 + ans_1_2_3_4);
                sum_1_2();
            };

            $('.1_2_3_1').on('change', function (e) {

                e.preventDefault();

                ans_1_2_3_1 = ($(this).val() / 10) * 2.5;

                $('#sum_1_2_3_1').html(ans_1_2_3_1);

                sum_1_2_3();

            });

            $('.1_2_3_2').on('change', function (e) {

                e.preventDefault();

                ans_1_2_3_2 = ($(this).val() / 10) * 2.5;

                $('#sum_1_2_3_2').html(ans_1_2_3_2);

                sum_1_2_3();

            });

            $('.1_2_3_3').on('change', function (e) {

                e.preventDefault();

                ans_1_2_3_3 = ($(this).val() / 10) * 2.5;

                $('#sum_1_2_3_3').html(ans_1_2_3_3);

                sum_1_2_3();

            });

            $('.1_2_3_4').on('change', function (e) {

                e.preventDefault();

                ans_1_2_3_4 = ($(this).val() / 10) * 2.5;

                $('#sum_1_2_3_4').html(ans_1_2_3_4);

                sum_1_2_3();

            });

            //2.4 ทัศนคติและการยอมรับ (Attitude)

            var ans_1_2_4_1 = 0;
            var ans_1_2_4_2 = 0;
            var ans_1_2_4_3 = 0;
            var ans_1_2_4_4 = 0;

            const sum_1_2_4 = function () {

                $('#sum_1_2_4').html((ans_1_2_4_1 + ans_1_2_4_2 + ans_1_2_4_3 + ans_1_2_4_4));
                sum_1_2();
            };

            $('.1_2_4_1').on('change', function (e) {

                e.preventDefault();

                ans_1_2_4_1 = ($(this).val() / 10) * 5;

                $('#sum_1_2_4_1').html(ans_1_2_4_1);

                sum_1_2_4();

            });

            $('.1_2_4_2').on('change', function (e) {

                e.preventDefault();

                ans_1_2_4_2 = ($(this).val() / 10) * 5;

                $('#sum_1_2_4_2').html(ans_1_2_4_2);

                sum_1_2_4();

            });

            $('.1_2_4_3').on('change', function (e) {

                e.preventDefault();

                ans_1_2_4_3 = ($(this).val() / 10) * 5;

                $('#sum_1_2_4_3').html(ans_1_2_4_3);

                sum_1_2_4();

            });

            $('.1_2_4_4').on('change', function (e) {

                e.preventDefault();

                ans_1_2_4_4 = ($(this).val() / 10) * 5;

                $('#sum_1_2_4_4').html(ans_1_2_4_4);

                sum_1_2_4();

            });


            $('.custom-select').on('change', function (e) {

                e.preventDefault();

                //$('#emp_assess').prop('disabled', true);

                asse_total_1 = Number($('#s_1_1_1').val()) + Number($('#s_1_1_2').val()) + Number($('#s_1_1_3').val()) +
                    Number($('#s_1_2_1_1').val()) + Number($('#s_1_2_1_2').val()) + Number($('#s_1_2_1_3').val()) + Number($('#s_1_2_1_4').val()) +
                    Number($('#s_1_2_2_1').val()) + Number($('#s_1_2_2_2').val()) + Number($('#s_1_2_2_3').val()) + Number($('#s_1_2_2_4').val()) +
                    Number($('#s_1_2_3_1').val()) + Number($('#s_1_2_3_2').val()) + Number($('#s_1_2_3_3').val()) + Number($('#s_1_2_3_4').val()) +
                    Number($('#s_1_2_4_1').val()) + Number($('#s_1_2_4_2').val()) + Number($('#s_1_2_4_3').val()) + Number($('#s_1_2_4_4').val());

                asse_percent_1 = Number($('#sum_1_1').html()) + Number($('#sum_1_2').html());

                $('#asse_total_1').html(asse_total_1);
                $('#asse_percent_1').html(asse_percent_1.toFixed(2));

                //console.log('hi', asse_total_1)

            });

        };

        $.Create = async function (eitem) {

            $('#btn-save_form').click(function (e) {

                e.preventDefault

                $('#frm_data').parsley().on('form:submit', function () {
                    Swal.fire({
                        icon: 'info',
                        title: 'ท่านต้องการบันทึก ' + '<br>' + 'แบบประเมิน ใช่ไหม?',
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: `บันทึก`,
                        denyButtonText: `ไม่บันทึก`,
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {

                            data_id = $.uuid();

                            let add_data = {
                                data_id: data_id,
                                data_leader_assess: data_leader,
                                data_employee_assess: $('#frm_detail').find('#emp_assess').val(),
                                data_form: 2,
                                data_quarter: eitem['quarter_id'],
                                data_assess_by: 2,
                                data_score_pms: asse_total_1,
                                data_percent_pms: asse_percent_1,
                                record_status: 1,
                                created_by: name,
                                data_c_good: $('#frm_data').find('#comment_1_1').val() === undefined ? '' : $('#frm_data').find('#comment_1_1').val(),
                                data_c_fail: $('#frm_data').find('#comment_1_2').val() === undefined ? '' : $('#frm_data').find('#comment_1_2').val(),
                            };

                            var params = [];
                            for (const i in add_data) {
                                params.push(i + "=" + encodeURIComponent(add_data[i]));
                            }

                            fetch(url_hr_create_data, {
                                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                                // mode: 'no-cors', // no-cors, *cors, same-origin
                                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                                credentials: 'same-origin', // include, *same-origin, omit
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                                body: params.join("&"),
                            }).then(data => {
                                return data.json();
                            }).then(data => {

                                if (data.status === 'Error') {
                                    toastr.error(data.error_message);

                                } else {
                                    let i = 1;
                                    let choice_citem = [];

                                    $('.choice').each(function () {

                                        choice_citem.push({
                                            sc_data_id: data_id,
                                            sc_topic: $(this).find('td').eq(0).html(),
                                            sc_weight: $(this).find('td').eq(1).html(),
                                            sc_score: $(this).find('.custom-select').val() === undefined ? '' : $(this).find('.custom-select').val(),
                                            sc_comment: $(this).find('td').eq(3).val() === undefined ? '' : $(this).find('.comment').val(),
                                            sc_order: i++,
                                            record_status: "1",
                                            created_by: name,
                                        })

                                    });

                                    console.log(choice_citem);

                                    $.ajax({
                                        url: 'http://localhost:49705/api/Hr_Create_Score',
                                        type: 'POST',
                                        contentType: "application/json; charset=utf-8",
                                        data: JSON.stringify(choice_citem),
                                        success: function (result) {

                                            $("#global-loader").fadeOut("slow");

                                            Swal.fire('Saved!', '', 'success')

                                             setTimeout(function () {

                                                location.reload();

                                            }, 1000);

                                        }
                                    });
                                }

                            }).catch((error) => {
                                toastr.error(error, 'Error writing document');
                            });




                        } else if (result.isDenied) {
                            Swal.fire('Changes are not saved', '', 'info')
                        }
                    })

                    return false;

                });





            });
        };

        $.Time = async function (eitem) {

            let Get_Time = new URL(url_hr_employee_time);

            Get_Time.search = new URLSearchParams({

                employee_code: eitem['employee_code'],
                data_quarter: eitem['quarter_id']

            });


            fetch(Get_Time).then(function (response) {
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

                    //console.log('Get_time', result.data);
                    $('#tbl-list').find('tbody tr').remove();

                    $.each(result.data, function (key, val) {

                        var time_id = val['time_id']
                        var time_employee_code = val['time_employee_code']
                        var time_employee_name = val['time_employee_name']
                        var time_employee_pos = val['time_employee_pos']
                        var time_late_count = val['time_late_count']
                        var time_late_time = val['time_late_time']
                        var time_absent_count = val['time_absent_count']
                        var time_absent_time = val['time_absent_time']
                        var time_sick_leave = val['time_sick_leave']
                        var time_personal_leave = val['time_personal_leave']
                        var time_maternity_leave = val['time_maternity_leave']
                        var time_ordination_leave = val['time_ordination_leave']
                        var time_wage_leave = val['time_wage_leave']
                        var time_funeral_wedding_leave = val['time_funeral_wedding_leave']
                        var time_warning_leave = val['time_warning_leave']
                        var time_probate_leave = val['time_probate_leave']
                        var time_data_quarter = val['time_data_quarter']
                        var time_score = val['time_score']
                        var created_by = val['created_by']
                        var created_date = val['created_date']
                        var updated_by = val['updated_by']
                        var updated_date = val['updated_date']
                        var record_status = val['record_status']


                        $('#tbl-list').find('tbody').append('<tr>' +
                            '<td style="text-align:center">' + time_late_count + '</td>' +
                            '<td style="text-align:center">' + time_late_time + '</td>' +
                            '<td style="text-align:center">' + time_absent_count + '</td>' +
                            '<td style="text-align:center">' + time_absent_time + '</td>' +
                            '<td style="text-align:center">' + time_sick_leave + '</td>' +
                            '<td style="text-align:center">' + time_personal_leave + '</td>' +
                            '<td style="text-align:center">' + time_maternity_leave + '</td>' +
                            '<td style="text-align:center">' + time_ordination_leave + '</td>' +
                            '<td style="text-align:center">' + time_wage_leave + '</td>' +
                            '<td style="text-align:center">' + time_funeral_wedding_leave + '</td>' +
                            '<td style="text-align:center">' + time_warning_leave + '</td>' +
                            '<td style="text-align:center">' + time_probate_leave + '</td>' +
                            '<td style="text-align:center">' + eitem['quarter_name'] + '</td>' +
                            '</tr>'
                        )

                    });

                    // oTable = $('#tbl-list').DataTable({ "order": [[1, "asc"]], "pageLength": 100, "columnDefs": [{ "targets": [1, 6], "width": "45px" }, { "targets": [3], "width": "350px" }, { "targets": [5], "width": "90px" }] });
                }

            });

        };

        $.Check_Data = async function (eitem) {

            let Get_Ck_Data = new URL(url_hr_check_data);

            Get_Ck_Data.search = new URLSearchParams({

                data_employee_assess: $('#frm_detail').find('#emp_assess').val(),
                data_quarter: eitem['quarter_id'],
                data_leader_assess: data_leader

            });


            fetch(Get_Ck_Data).then(function (response) {
                return response.json();
            }).then(function (result) {
                if (result.status === 'Error') {

                    $.LoadingOverlay("hide");

                    $("#global-loader").fadeOut("slow");

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'ไม่สามารถเรียกข้อมูล CheckData'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    })

                } else {

                    //console.log('Get_time', result.data);

                    $.each(result.data, function (key, val) {

                        var status = val['status'];

                        if (status == 'codedup') {

                            Swal.fire({
                                icon: 'warning',
                                title: 'โอย หน่ออ',
                                text: 'ท่านได้ทำแบบประเมินแล้ว'
                            })
                            $('.chkdup').removeClass('d-none');
                            $('#alert').html(moment(val['created_date']).format('DD/MM/YYYY HH:mm:ss') + ' น. ' + '<strong>' + ' รอบประเมิน ' + '</strong>' + val['data_quarter']);
                            //Swal.fire(
                            //    'The Internet?',
                            //    'That thing is still around?',
                            //    'ไม่สามารถเรียกข้อมูล CheckData'
                            //)
                            $('#page_self').hide();
                            $('#btn-save_form').prop("disabled", true);

                        } else {

                            $('.chkdup').addClass('d-none');
                            // alert(';')
                        }

                    });


                }

            });

        };

        $.Employee_Get = async function (citem) {

            let employee_dataSet = [];

            let Employee_Get = new URL(url_employee_get);

            Employee_Get.search = new URLSearchParams({

                employee_leader: citem['employee_code'],

                employee_form: 2,

            });

            fetch(Employee_Get).then(function (response) {

                return response.json();

            }).then(function (result) {

                if (result.status === 'Error') {

                    $.LoadingOverlay("hide");

                    $("#global-loader").fadeOut("slow");

                    Swal.fire({
                        icon: 'warning',
                        title: 'มันเป็นหยั่งง',
                        text: 'มันเฮ็ด Data ที่เจ้าเลือกบ่ได้',
                    })

                } else {

                    $.each(result.data, function (key, val) {

                        employee_dataSet.push({ id: val['employee_code'], text: val['employee_code'] + ' ' + val['employee_prefix'] + ' ' + val['employee_name'], data: val });

                    });

                    console.log(employee_dataSet);

                    $('#emp_assess').select2({
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

        $(document).ready(async function () {

            await $.init();
            await $.List();

        });

    } else {

        window.location.assign('./login');

    }

});