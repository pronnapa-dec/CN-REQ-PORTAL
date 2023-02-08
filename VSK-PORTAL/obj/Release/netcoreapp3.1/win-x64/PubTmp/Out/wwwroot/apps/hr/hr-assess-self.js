'use strict';

let fs = firebase.firestore();
let collection = 'mrp_opt_purchaseplan';
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const objProfile = JSON.parse(localStorage.getItem('objProfile'));
let mode;
let inventorycode_dataset = [];
let invfrecode_dataset = [];
let part1 = {};
let part2_1 = {};
let part2_2 = {};
let part2_3 = {};
let part2_4 = {};
let part_more = {};
//let oTable = $('#tbl-list').DataTable({ "order": [[0, "asc"]], "pageLength": 100 });
let validator, table, options, item_action, item_id;
var data_id, data_form;
let role_code;
let code;
var asse_total_1_opt = 0;
var asse_percent_1_opt = 0;
var asse_total_1_manage = 0;
var asse_percent_1_manage = 0;

const url_api = "http://localhost:49705/";
const url_hr_employee_detail = url_api + '/api/Hr_Employee_Detail';
const url_hr_employee_time = url_api + '/api/Hr_Employee_Time';
const url_hr_quarter = url_api + '/api/Hr_Quarter_Get';
const url_hr_create_data = url_api + '/api/Hr_Create_Data';
const url_hr_create_score = url_api + '/api/Hr_Create_Score';
const url_hr_check_data = url_api + '/api/Hr_Check_Data';

firebase.auth().onAuthStateChanged(function (user) {

    var full_mail = user.email;
    var uid = user.uid;
    var name = full_mail.replace("@vskautoparts.com", "");

    if (user) {

        $.init = function () {

            //$('.chkdup').addClass('d-none');
            //$('.chkdup').hide();

            $('#modal-frm_data').on('hidden.bs.modal', function () {

                //$('#site_code').val('').trigger('change').prop('disabled', false);
                //$('#schedule_note').val('').prop('disabled', false);
                //$('.schedule_day').prop('checked', false).prop('disabled', true);
                //$('#schedule_all').prop('checked', false).prop('disabled', true);
                //$('.record_status').prop('disabled', true);
                $("#frm_data").parsley().reset();

            });

            role_code = objProfile.auth_role[0]['role_code'];

            let code_raw = objProfile.auth_user_profile[0]['user_lname'];

            code = code_raw.substring(code_raw.length - 5, code_raw.length);

            //console.log(code)

            if (role_code === 'HR-DEV') {

                $('#page_opt').removeClass('d-none');

                $('#page_manage').removeClass('d-none');

            } else if (role_code === 'HR-LEADER') {

                $('#page_manage').removeClass('d-none');

            } else if (role_code === 'HR-EMPLOYEE') {

                $('#page_opt').removeClass('d-none');

            }



        };

        $.List = async function () {

            let Get_Detail = new URL(url_hr_employee_detail);

            Get_Detail.search = new URLSearchParams({

                employee_code: code,

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
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    })

                } else {

                    //console.log('Get_Detail', result.data);

                    $.each(result.data, function (key, val) {

                        let citem = ({
                            employee_code: val['employee_code'],
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

                        $('#frm_detail').find('#h_employee_code').html(citem['employee_code']);
                        $('#frm_detail').find('#h_employee_assess').html(citem['employee_name']);
                        $('#frm_detail').find('#h_employee_sec').html(citem['employee_sec']);
                        $('#frm_detail').find('#h_employee_dept').html(citem['employee_dept']);
                        $('#frm_detail').find('#h_employee_pos').html(citem['employee_pos']);
                        $('#frm_detail').find('#h_employee_job_startdate').html(employee_job_startdate);
                        $('#frm_detail').find('#h_job_old').html(years + ' ปี ' + months + ' เดือน ' + days + ' วัน');
                        $('#frm_detail').find('#h_data_quarter').html(citem['quarter_name']);

                        if (role_code === 'HR-LEADER') {
                            $('#frm_manage').find('.custom-select').prepend('<option value="" selected></option>');
                            $('#frm_manage').find('.custom-select').attr('required', true);
                            $('#frm_manage').find('.custom-select-c').prepend('<option value="" selected></option>');
                            $('#frm_manage').find('.custom-select-c').attr('required', true);
                            $('#frm_manage').find('.custom-hide').addClass('d-none');
                            //alert('55');
                        } else if (role_code === 'HR-EMPLOYEE') {
                            $('#frm_opt').find('.custom-select').prepend('<option value="" selected></option>');
                            $('#frm_opt').find('.custom-select').attr('required', true);
                            $('#frm_opt').find('.custom-select-c').prepend('<option value="" selected></option>');
                            $('#frm_opt').find('.custom-select-c').attr('required', true);
                            $('#frm_opt').find('.custom-hide').addClass('d-none');
                        }






                        $.Time(citem);
                        $.Create(citem);
                        $.Check_Data(citem);

                    });



                }

            });

            if (role_code === 'HR-LEADER') {

                //FORM ภาค 1 ผลการปฎิบัติงานตาม KPIs

                var ans_1_1_1 = 0;
                var ans_1_1_2 = 0;
                var ans_1_1_3 = 0;

                const sum_1_1 = function () {

                    $('#frm_manage').find('#sum_1_1').html(ans_1_1_1 + ans_1_1_2 + ans_1_1_3);

                };

                $('#frm_manage').find('#s_1_1_1').on('change', function (e) {

                    e.preventDefault();

                    ans_1_1_1 = ($(this).val() / 10) * 30;

                    $('#frm_manage').find('#sum_1_1').html(ans_1_1_1);

                    sum_1_1();

                    //console.log('ans_1_1_1', ans_1_1_1)
                });

                $('#frm_manage').find('#s_1_1_2').on('change', function (e) {

                    e.preventDefault();

                    ans_1_1_2 = ($(this).val() / 10) * 10;

                    $('#frm_manage').find('#sum_1_1').html(ans_1_1_2);

                    sum_1_1();

                    //console.log('ans_1_1_2', ans_1_1_2)
                });

                $('#frm_manage').find('#s_1_1_3').on('change', function (e) {

                    e.preventDefault();

                    ans_1_1_3 = ($(this).val() / 10) * 10;

                    $('#frm_manage').find('#sum_1_1').html(ans_1_1_3);

                    sum_1_1();

                    //console.log('ans_1_1_3', ans_1_1_3)
                });

                //FORM ภาค 2 คุณสมบัติเฉพาะตัว

                const sum_1_2 = function () {

                    var sum_1_2_1 = $('#frm_manage').find('#sum_1_2_1').html();
                    var sum_1_2_2 = $('#frm_manage').find('#sum_1_2_2').html();
                    var sum_1_2_3 = $('#frm_manage').find('#sum_1_2_3').html();
                    var sum_1_2_4 = $('#frm_manage').find('#sum_1_2_4').html();

                    $('#frm_manage').find('#sum_1_2').html(Number(sum_1_2_1) + Number(sum_1_2_2) + Number(sum_1_2_3) + Number(sum_1_2_4));

                };

                //2.1 ความรู้ ความสามารถ(Knowledge, Ability)

                var ans_1_2_1_1 = 0;
                var ans_1_2_1_2 = 0;
                var ans_1_2_1_3 = 0;
                var ans_1_2_1_4 = 0;

                const sum_1_2_1 = function () {

                    $('#frm_manage').find('#sum_1_2_1').html(ans_1_2_1_1 + ans_1_2_1_2 + ans_1_2_1_3 + ans_1_2_1_4);

                    sum_1_2();

                };

                $('#frm_manage').find('.1_2_1_1').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_1_1 = ($(this).val() / 10) * 2.5;

                    $('#frm_manage').find('#sum_1_2_1_1').html(ans_1_2_1_1);

                    sum_1_2_1();

                });

                $('#frm_manage').find('.1_2_1_2').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_1_2 = ($(this).val() / 10) * 2.5;

                    $('#frm_manage').find('#sum_1_2_1_2').html(ans_1_2_1_2);

                    sum_1_2_1();

                });

                $('#frm_manage').find('.1_2_1_3').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_1_3 = ($(this).val() / 10) * 2.5;

                    $('#frm_manage').find('#sum_1_2_1_3').html(ans_1_2_1_3);

                    sum_1_2_1();

                });

                $('#frm_manage').find('.1_2_1_4').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_1_4 = ($(this).val() / 10) * 2.5;

                    $('#frm_manage').find('#sum_1_2_1_4').html(ans_1_2_1_4);

                    sum_1_2_1();

                });

                //2.2 การตัดสินใจและแก้ไขปัญหา (Problem Solving & Decision Making)

                var ans_1_2_2_1 = 0;
                var ans_1_2_2_2 = 0;
                var ans_1_2_2_3 = 0;
                var ans_1_2_2_4 = 0;

                const sum_1_2_2 = function () {

                    $('#frm_manage').find('#sum_1_2_2').html(ans_1_2_2_1 + ans_1_2_2_2 + ans_1_2_2_3 + ans_1_2_2_4);
                    sum_1_2();
                };

                $('#frm_manage').find('.1_2_2_1').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_2_1 = ($(this).val() / 10) * 2.5;

                    $('#frm_manage').find('#sum_1_2_2_1').html(ans_1_2_2_1);

                    sum_1_2_2();

                });

                $('#frm_manage').find('.1_2_2_2').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_2_2 = ($(this).val() / 10) * 2.5;

                    $('#frm_manage').find('#sum_1_2_2_2').html(ans_1_2_2_2);

                    sum_1_2_2();

                });

                $('#frm_manage').find('.1_2_2_3').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_2_3 = ($(this).val() / 10) * 2.5;

                    $('#frm_manage').find('#sum_1_2_2_3').html(ans_1_2_2_3);

                    sum_1_2_2();

                });

                $('#frm_manage').find('.1_2_2_4').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_2_4 = ($(this).val() / 10) * 2.5;

                    $('#frm_manage').find('#sum_1_2_2_4').html(ans_1_2_2_4);

                    sum_1_2_2();

                });

                //2.3 การทำงานร่วมกันเป็นทีม (Collaboration)

                var ans_1_2_3_1 = 0;
                var ans_1_2_3_2 = 0;
                var ans_1_2_3_3 = 0;
                var ans_1_2_3_4 = 0;

                const sum_1_2_3 = function () {

                    $('#frm_manage').find('#sum_1_2_3').html(ans_1_2_3_1 + ans_1_2_3_2 + ans_1_2_3_3 + ans_1_2_3_4);
                    sum_1_2();
                };

                $('#frm_manage').find('.1_2_3_1').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_3_1 = ($(this).val() / 10) * 2.5;

                    $('#frm_manage').find('#sum_1_2_3_1').html(ans_1_2_3_1);

                    sum_1_2_3();

                });

                $('#frm_manage').find('.1_2_3_2').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_3_2 = ($(this).val() / 10) * 2.5;

                    $('#frm_manage').find('#sum_1_2_3_2').html(ans_1_2_3_2);

                    sum_1_2_3();

                });

                $('#frm_manage').find('.1_2_3_3').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_3_3 = ($(this).val() / 10) * 2.5;

                    $('#frm_manage').find('#sum_1_2_3_3').html(ans_1_2_3_3);

                    sum_1_2_3();

                });

                $('#frm_manage').find('.1_2_3_4').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_3_4 = ($(this).val() / 10) * 2.5;

                    $('#frm_manage').find('#sum_1_2_3_4').html(ans_1_2_3_4);

                    sum_1_2_3();

                });

                //2.4 ทัศนคติและการยอมรับ (Attitude)

                var ans_1_2_4_1 = 0;
                var ans_1_2_4_2 = 0;
                var ans_1_2_4_3 = 0;
                var ans_1_2_4_4 = 0;

                const sum_1_2_4 = function () {

                    $('#frm_manage').find('#sum_1_2_4').html((ans_1_2_4_1 + ans_1_2_4_2 + ans_1_2_4_3 + ans_1_2_4_4));
                    sum_1_2();
                };

                $('#frm_manage').find('.1_2_4_1').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_4_1 = ($(this).val() / 10) * 5;

                    $('#frm_manage').find('#sum_1_2_4_1').html(ans_1_2_4_1);

                    sum_1_2_4();

                });

                $('#frm_manage').find('.1_2_4_2').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_4_2 = ($(this).val() / 10) * 5;

                    $('#frm_manage').find('#sum_1_2_4_2').html(ans_1_2_4_2);

                    sum_1_2_4();

                });

                $('#frm_manage').find('.1_2_4_3').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_4_3 = ($(this).val() / 10) * 5;

                    $('#frm_manage').find('#sum_1_2_4_3').html(ans_1_2_4_3);

                    sum_1_2_4();

                });

                $('#frm_manage').find('.1_2_4_4').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_4_4 = ($(this).val() / 10) * 5;

                    $('#frm_manage').find('#sum_1_2_4_4').html(ans_1_2_4_4);

                    sum_1_2_4();

                });


                $('#frm_manage').find('.custom-select').on('change', function (e) {

                    e.preventDefault();

                    //$('#emp_assess').prop('disabled', true);

                    asse_total_1_manage = Number($('#frm_manage').find('#s_1_1_1').val()) + Number($('#frm_manage').find('#s_1_1_2').val()) + Number($('#frm_manage').find('#s_1_1_3').val()) +
                        Number($('#frm_manage').find('#s_1_2_1_1').val()) + Number($('#frm_manage').find('#s_1_2_1_2').val()) + Number($('#frm_manage').find('#s_1_2_1_3').val()) + Number($('#frm_manage').find('#s_1_2_1_4').val()) +
                        Number($('#frm_manage').find('#s_1_2_2_1').val()) + Number($('#frm_manage').find('#s_1_2_2_2').val()) + Number($('#frm_manage').find('#s_1_2_2_3').val()) + Number($('#frm_manage').find('#s_1_2_2_4').val()) +
                        Number($('#frm_manage').find('#s_1_2_3_1').val()) + Number($('#frm_manage').find('#s_1_2_3_2').val()) + Number($('#frm_manage').find('#s_1_2_3_3').val()) + Number($('#frm_manage').find('#s_1_2_3_4').val()) +
                        Number($('#frm_manage').find('#s_1_2_4_1').val()) + Number($('#frm_manage').find('#s_1_2_4_2').val()) + Number($('#frm_manage').find('#s_1_2_4_3').val()) + Number($('#frm_manage').find('#s_1_2_4_4').val());

                    asse_percent_1_manage = Number($('#frm_manage').find('#sum_1_1').html()) + Number($('#frm_manage').find('#sum_1_2').html());

                    $('#frm_manage').find('#asse_total_1').html(asse_total_1_manage);
                    $('#frm_manage').find('#asse_percent_1').html(asse_percent_1_manage.toFixed(2));

                    //console.log('hi', asse_total_1)

                });

            } else if (role_code === 'HR-EMPLOYEE') {

                //FORM ภาค 1 ผลการปฎิบัติงานตาม KPIs

                var ans_1_1_1 = 0;
                var ans_1_1_2 = 0;
                var ans_1_1_3 = 0;

                const sum_1_1 = function () {

                    $('#frm_opt').find('#sum_1_1').html(ans_1_1_1 + ans_1_1_2 + ans_1_1_3);

                };

                $('#frm_opt').find('#s_1_1_1').on('change', function (e) {

                    e.preventDefault();

                    ans_1_1_1 = ($(this).val() / 10) * 30;

                    $('#frm_opt').find('#sum_1_1').html(ans_1_1_1);

                    sum_1_1();

                    //console.log('ans_1_1_1', ans_1_1_1)
                });

                $('#frm_opt').find('#s_1_1_2').on('change', function (e) {

                    e.preventDefault();

                    ans_1_1_2 = ($(this).val() / 10) * 10;

                    $('#frm_opt').find('#sum_1_1').html(ans_1_1_2);

                    sum_1_1();

                    //console.log('ans_1_1_2', ans_1_1_2)
                });

                $('#frm_opt').find('#s_1_1_3').on('change', function (e) {

                    e.preventDefault();

                    ans_1_1_3 = ($(this).val() / 10) * 10;

                    $('#frm_opt').find('#sum_1_1').html(ans_1_1_3);

                    sum_1_1();

                    //console.log('ans_1_1_3', ans_1_1_3)
                });

                //FORM ภาค 2 คุณสมบัติเฉพาะตัว

                const sum_1_2 = function () {

                    var sum_1_2_1 = $('#frm_opt').find('#sum_1_2_1').html();
                    var sum_1_2_2 = $('#frm_opt').find('#sum_1_2_2').html();
                    var sum_1_2_3 = $('#frm_opt').find('#sum_1_2_3').html();
                    var sum_1_2_4 = $('#frm_opt').find('#sum_1_2_4').html();

                    $('#frm_opt').find('#sum_1_2').html(Number(sum_1_2_1) + Number(sum_1_2_2) + Number(sum_1_2_3) + Number(sum_1_2_4));

                };

                //2.1 ความรู้ ความสามารถ(Knowledge, Ability)

                var ans_1_2_1_1 = 0;
                var ans_1_2_1_2 = 0;
                var ans_1_2_1_3 = 0;
                var ans_1_2_1_4 = 0;

                const sum_1_2_1 = function () {

                    $('#frm_opt').find('#sum_1_2_1').html(ans_1_2_1_1 + ans_1_2_1_2 + ans_1_2_1_3 + ans_1_2_1_4);

                    sum_1_2();

                };

                $('#frm_opt').find('.1_2_1_1').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_1_1 = ($(this).val() / 10) * 2.5;

                    $('#frm_opt').find('#sum_1_2_1_1').html(ans_1_2_1_1);

                    sum_1_2_1();

                });

                $('#frm_opt').find('.1_2_1_2').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_1_2 = ($(this).val() / 10) * 2.5;

                    $('#frm_opt').find('#sum_1_2_1_2').html(ans_1_2_1_2);

                    sum_1_2_1();

                });

                $('#frm_opt').find('.1_2_1_3').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_1_3 = ($(this).val() / 10) * 2.5;

                    $('#frm_opt').find('#sum_1_2_1_3').html(ans_1_2_1_3);

                    sum_1_2_1();

                });

                $('#frm_opt').find('.1_2_1_4').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_1_4 = ($(this).val() / 10) * 2.5;

                    $('#frm_opt').find('#sum_1_2_1_4').html(ans_1_2_1_4);

                    sum_1_2_1();

                });

                //2.2 การตัดสินใจและแก้ไขปัญหา (Problem Solving & Decision Making)

                var ans_1_2_2_1 = 0;
                var ans_1_2_2_2 = 0;
                var ans_1_2_2_3 = 0;
                var ans_1_2_2_4 = 0;

                const sum_1_2_2 = function () {

                    $('#frm_opt').find('#sum_1_2_2').html(ans_1_2_2_1 + ans_1_2_2_2 + ans_1_2_2_3 + ans_1_2_2_4);
                    sum_1_2();
                };

                $('#frm_opt').find('.1_2_2_1').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_2_1 = ($(this).val() / 10) * 2.5;

                    $('#frm_opt').find('#sum_1_2_2_1').html(ans_1_2_2_1);

                    sum_1_2_2();

                });

                $('#frm_opt').find('.1_2_2_2').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_2_2 = ($(this).val() / 10) * 2.5;

                    $('#frm_opt').find('#sum_1_2_2_2').html(ans_1_2_2_2);

                    sum_1_2_2();

                });

                $('#frm_opt').find('.1_2_2_3').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_2_3 = ($(this).val() / 10) * 2.5;

                    $('#frm_opt').find('#sum_1_2_2_3').html(ans_1_2_2_3);

                    sum_1_2_2();

                });

                $('#frm_opt').find('.1_2_2_4').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_2_4 = ($(this).val() / 10) * 2.5;

                    $('#frm_opt').find('#sum_1_2_2_4').html(ans_1_2_2_4);

                    sum_1_2_2();

                });

                //2.3 การทำงานร่วมกันเป็นทีม (Collaboration)

                var ans_1_2_3_1 = 0;
                var ans_1_2_3_2 = 0;
                var ans_1_2_3_3 = 0;
                var ans_1_2_3_4 = 0;

                const sum_1_2_3 = function () {

                    $('#frm_opt').find('#sum_1_2_3').html(ans_1_2_3_1 + ans_1_2_3_2 + ans_1_2_3_3 + ans_1_2_3_4);
                    sum_1_2();
                };

                $('#frm_opt').find('.1_2_3_1').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_3_1 = ($(this).val() / 10) * 2.5;

                    $('#frm_opt').find('#sum_1_2_3_1').html(ans_1_2_3_1);

                    sum_1_2_3();

                });

                $('#frm_opt').find('.1_2_3_2').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_3_2 = ($(this).val() / 10) * 2.5;

                    $('#frm_opt').find('#sum_1_2_3_2').html(ans_1_2_3_2);

                    sum_1_2_3();

                });

                $('#frm_opt').find('.1_2_3_3').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_3_3 = ($(this).val() / 10) * 2.5;

                    $('#frm_opt').find('#sum_1_2_3_3').html(ans_1_2_3_3);

                    sum_1_2_3();

                });

                $('#frm_opt').find('.1_2_3_4').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_3_4 = ($(this).val() / 10) * 2.5;

                    $('#frm_opt').find('#sum_1_2_3_4').html(ans_1_2_3_4);

                    sum_1_2_3();

                });

                //2.4 ทัศนคติและการยอมรับ (Attitude)

                var ans_1_2_4_1 = 0;
                var ans_1_2_4_2 = 0;
                var ans_1_2_4_3 = 0;
                var ans_1_2_4_4 = 0;
                var ans_1_2_4_5 = 0;
                var ans_1_2_4_6 = 0;

                const sum_1_2_4 = function () {

                    $('#frm_opt').find('#sum_1_2_4').html((ans_1_2_4_1 + ans_1_2_4_2 + ans_1_2_4_3 + ans_1_2_4_4 + ans_1_2_4_5 + ans_1_2_4_6));
                    sum_1_2();
                };

                $('#frm_opt').find('.1_2_4_1').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_4_1 = ($(this).val() / 10) * 5;

                    $('#frm_opt').find('#sum_1_2_4_1').html(ans_1_2_4_1);

                    sum_1_2_4();

                });

                $('#frm_opt').find('.1_2_4_2').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_4_2 = ($(this).val() / 10) * 3;

                    $('#frm_opt').find('#sum_1_2_4_2').html(ans_1_2_4_2);

                    sum_1_2_4();

                });

                $('#frm_opt').find('.1_2_4_3').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_4_3 = ($(this).val() / 10) * 3;

                    $('#frm_opt').find('#sum_1_2_4_3').html(ans_1_2_4_3);

                    sum_1_2_4();

                });

                $('#frm_opt').find('.1_2_4_4').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_4_4 = ($(this).val() / 10) * 3;

                    $('#frm_opt').find('#sum_1_2_4_4').html(ans_1_2_4_4);

                    sum_1_2_4();

                });

                $('#frm_opt').find('.1_2_4_5').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_4_5 = ($(this).val() / 10) * 3;

                    $('#frm_opt').find('#sum_1_2_4_5').html(ans_1_2_4_5);

                    sum_1_2_4();

                });

                $('#frm_opt').find('.1_2_4_6').on('change', function (e) {

                    e.preventDefault();

                    ans_1_2_4_6 = ($(this).val() / 10) * 3;

                    $('#frm_opt').find('#sum_1_2_4_6').html(ans_1_2_4_6);

                    sum_1_2_4();

                });

                $('#frm_opt').find('.custom-select').on('change', function (e) {

                    e.preventDefault();

                    asse_total_1_opt = Number($('#frm_opt').find('#s_1_1_1').val()) + Number($('#frm_opt').find('#s_1_1_2').val()) + Number($('#frm_opt').find('#s_1_1_3').val()) +
                        Number($('#frm_opt').find('#s_1_2_1_1').val()) + Number($('#frm_opt').find('#s_1_2_1_2').val()) + Number($('#frm_opt').find('#s_1_2_1_3').val()) + Number($('#frm_opt').find('#s_1_2_1_4').val()) +
                        Number($('#frm_opt').find('#s_1_2_2_1').val()) + Number($('#frm_opt').find('#s_1_2_2_2').val()) + Number($('#frm_opt').find('#s_1_2_2_3').val()) + Number($('#frm_opt').find('#s_1_2_2_4').val()) +
                        Number($('#frm_opt').find('#s_1_2_3_1').val()) + Number($('#frm_opt').find('#s_1_2_3_2').val()) + Number($('#frm_opt').find('#s_1_2_3_3').val()) + Number($('#frm_opt').find('#s_1_2_3_4').val()) +
                        Number($('#frm_opt').find('#s_1_2_4_1').val()) + Number($('#frm_opt').find('#s_1_2_4_2').val()) + Number($('#frm_opt').find('#s_1_2_4_3').val()) + Number($('#frm_opt').find('#s_1_2_4_4').val()) +
                        Number($('#frm_opt').find('#s_1_2_4_5').val()) + Number($('#frm_opt').find('#s_1_2_4_6').val());

                    asse_percent_1_opt = Number($('#frm_opt').find('#sum_1_1').html()) + Number($('#frm_opt').find('#sum_1_2').html());

                    $('#frm_opt').find('#asse_total_1').html(asse_total_1_opt);
                    $('#frm_opt').find('#asse_percent_1').html(asse_percent_1_opt.toFixed(2));

                    //console.log('hi', asse_total_1)

                });

            }
        };

        $.Create = async function (citem) {

            if (role_code === 'HR-LEADER') {

                $('#frm_manage').find('#btn-save_form').click(function (e) {

                    $('#frm_manage').parsley().on('form:submit', function () {

                        Swal.fire({
                            icon: 'info',
                            title: 'ท่านต้องการบันทึก ' + '<br>' + 'แบบประเมิน ใช่ไหม?',
                            showDenyButton: true,
                            showCancelButton: true,
                            confirmButtonText: `บันทึก`,
                            denyButtonText: `ไม่บันทึก`,
                        }).then((result) => {

                            if (result.isConfirmed) {

                                data_id = $.uuid();

                                let add_data = {
                                    data_id: data_id,
                                    data_leader_assess: citem['employee_code'],
                                    data_employee_assess: citem['employee_code'],
                                    data_form: citem['employee_form'],
                                    data_quarter: citem['quarter_id'],
                                    data_assess_by: '1',
                                    data_score_pms: asse_total_1_manage,
                                    data_percent_pms: asse_percent_1_manage,
                                    record_status: '1',
                                    created_by: name,
                                    data_c_good: $('#frm_manage').find('#comment_1_1').val() === undefined ? '' : $('#frm_manage').find('#comment_1_1').val(),
                                    data_c_fail: $('#frm_manage').find('#comment_1_2').val() === undefined ? '' : $('#frm_manage').find('#comment_1_2').val(),
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

                                        $('#frm_manage').find('.choice').each(function () {

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

            } else if (role_code === 'HR-EMPLOYEE') {

                $('#btn-save_form').click(function (e) {

                    $('#frm_opt').parsley().on('form:submit', function () {

                        Swal.fire({
                            icon: 'info',
                            title: 'ท่านต้องการบันทึก ' + '<br>' + 'แบบประเมิน ใช่ไหม?',
                            showDenyButton: true,
                            showCancelButton: true,
                            confirmButtonText: `บันทึก`,
                            denyButtonText: `ไม่บันทึก`,

                        }).then((result) => {

                            if (result.isConfirmed) {

                                data_id = $.uuid();

                                let add_data = {
                                    data_id: data_id,
                                    data_leader_assess: citem['employee_code'],
                                    data_employee_assess: citem['employee_code'],
                                    data_form: citem['employee_form'],
                                    data_quarter: citem['quarter_id'],
                                    data_assess_by: '1',
                                    data_score_pms: asse_total_1_opt,
                                    data_percent_pms: asse_percent_1_opt,
                                    record_status: '1',
                                    created_by: name,
                                    data_c_good: $('#frm_opt').find('#comment_1_1').val() === undefined ? '' : $('#frm_opt').find('#comment_1_1').val(),
                                    data_c_fail: $('#frm_opt').find('#comment_1_2').val() === undefined ? '' : $('#frm_opt').find('#comment_1_2').val(),
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

                                        $('#frm_opt').find('.choice').each(function () {

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

            }


        };

        $.Time = async function (citem) {

            let Get_Time = new URL(url_hr_employee_time);

            Get_Time.search = new URLSearchParams({

                employee_code: citem['employee_code'],
                data_quarter: citem['quarter_id']

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
                            '<td style="text-align:center">' + citem['quarter_name'] + '</td>' +
                            '</tr>'
                        )

                    });


                }

            });

        };

        $.Check_Data = async function (citem) {

            let Get_Ck_Data = new URL(url_hr_check_data);

            Get_Ck_Data.search = new URLSearchParams({

                data_employee_assess: citem['employee_code'],
                data_quarter: citem['quarter_id'],
                data_leader_assess: citem['employee_code']

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

                            //$('.chkdup').show();
                            $('.chkdup').removeClass('d-none');
                            $('#alert').html(moment(val['created_date']).format('DD/MM/YYYY HH:mm:ss') + ' น. ' + '<strong>' + ' รอบประเมิน ' + '</strong>' + val['data_quarter']);

                            if (role_code === 'HR-LEADER') {

                                $('#frm_manage').find('#btn-save_form').prop("disabled", true);
                                $('#frm_manage').find('.custom-select').prop("disabled", true);
                                $('#frm_manage').find('.comment').prop("disabled", true);
                                $('#frm_manage').find('#comment_1_1').prop("readonly", true);
                                $('#frm_manage').find('#comment_1_2').prop("readonly", true);
                                $('#page_manage').hide();
                                $('#chk-manage').show();

                            } else if (role_code === 'HR-EMPLOYEE') {

                                $('#frm_opt').find('#btn-save_form').prop("disabled", true);
                                $('#frm_opt').find('.custom-select').prop("disabled", true);
                                $('#frm_opt').find('.comment').prop("disabled", true);
                                $('#frm_opt').find('#comment_1_1').prop("readonly", true);
                                $('#frm_opt').find('#comment_1_2').prop("readonly", true);
                                $('#page_opt').hide();
                                $('#chk-manage').show();
                            }

                        }

                    });


                }

            });

        };

        $(document).ready(async function () {

            await $.init();
            await $.List();

        });

    } else {

        window.location.assign('./login');

    }

});