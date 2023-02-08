'use strict';

let validator, oTable, table, options, item_action, item_id;

let objProfile = JSON.parse(localStorage.getItem('objProfile'));
//console.log("objProfile", objProfile);
let template_url = 'http://192.168.1.247/template/';
const url_api = 'http://localhost:49705';
const url_data_tran_create = url_api + '/api/ImportData_Tran_Create';
const url_import_data_create = url_api + '/api/ImportData_Create';
const url_import_data_update = url_api + '/api/ImportData_Update';
const url_import_data_update_data = url_api + '/api/ImportData_Update_Data';
const url_import_data_template_get = url_api + '/api/ImportData_TemplateGet';

let temp_id = $.uuid();
let temp_table = [];
let count_length = 0;
let chk_index = 0
var user_code;
var full_name;

function objectPropInArray(list, prop, val) {
    if (list.length > 0) {
        for (i in list) {
            if (list[i][prop] === val) {
                return true;
            }
        }
    }
    return false;
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
firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        var name = user.email.replace("@vskautoparts.com", "");
        let user_fname = objProfile.auth_user_profile[0]['user_fname'];
        let code_raw = objProfile.auth_user_profile[0]['user_lname'];
        user_code = code_raw.substring(code_raw.length - 5, code_raw.length);
        full_name = user_fname + '-' + user_code
        //full_name = 
        $.init = function () {

            console.log('name', name);
            console.log('full_name', full_name);

            $('.chk_code').hide();


            $('.btn_error_stmas_exp').hide();

            toastr.warning('อยู่ระหว่างการทดสอบการใช้งานเท่านั้น (UAT Mode)');

            $('.container').find('.breadcrumb-header').append('<div class="d-flex my-xl-auto right-content"><div class= "mb-3 mb-xl-0" ><h4 style="color: red;">UAT Version</h4></div ></div >');

            $.fntemptable = function (currentindex) {

                $('#tbl-list-temp tbody').empty();

                $('.btn_error_stmas_exp').show();

                $('#wizards').find('.btn_error_stmas_exp').on('click', function (evt) {
                    /* if (authorize == 'ITM-MIS-01' || authorize == 'ITM-PIT-01' || authorize == 'ITM-PIT-02' || authorize == 'ITM-PM-01' || authorize == 'ITM-PM-02' || authorize == 'ITM-PUR-01' || authorize == 'ITM-PUR-02' || authorize == 'ITM-PM-03') {*/

                    location.href = 'http://192.168.1.159/ReportServer/Pages/ReportViewer.aspx?%2fReport-Template-Stmas-Exp%2fError-Stmas-Exp&rs:Command=Render&temp_id=' + temp_id + '&rs:Format=excel';
                    temp_id
                    console.log("...downloadtemplate_error...");

                    //} else {
                    //    toastr.error("No Template for your permission.");
                    //}
                });

                if (currentindex == 0) {

                    let i = 1;

                    $.each(temp_table, function (key, val) {

                        var code1 = "";
                        var code2 = "";
                        var code3 = "";
                        var code4 = "";
                        var code5 = "";
                        var code = "";
                        var recordstatus_txt = "";
                        var name_txt = "";
                        var status_txt = "";
                        var results = "";

                        if (val['code'] == null) { var val_code = ''; } else { var val_code = val['code']; }
                        if (val['coderef'] == null) { var val_coderef = ''; } else { var val_coderef = val['coderef']; }
                        if (val['chrcode'] == null) { var val_chrcode = ''; } else { var val_chrcode = val['chrcode']; }
                        if (val['code_a'] == null) { var val_code_a = ''; } else { var val_code_a = val['code_a']; }
                        if (val['code_b'] == null) { var val_code_b = ''; } else { var val_code_b = val['code_b']; }
                        if (val['code_c'] == null) { var val_code_c = ''; } else { var val_code_c = val['code_c']; }
                        if (val['code_d'] == null) { var val_code_d = ''; } else { var val_code_d = val['code_d']; }
                        if (val['code_e'] == null) { var val_code_e = ''; } else { var val_code_e = val['code_e']; }
                        if (val['gzone'] == null) { var val_gzone = ''; } else { var val_gzone = val['gzone']; }
                        if (val['gbarcode'] == null) { var val_gbarcode = ''; } else { var val_gbarcode = val['gbarcode']; }
                        if (val['spcodes'] == null) { var val_spcodes = ''; } else { var val_spcodes = val['spcodes']; }
                        if (val['carmodel'] == null) { var val_carmodel = ''; } else { var val_carmodel = val['carmodel']; }
                        if (val['carfmyear'] == null) { var val_carfmyear = ''; } else { var val_carfmyear = val['carfmyear']; }
                        if (val['cartoyear'] == null) { var val_cartoyear = ''; } else { var val_cartoyear = val['cartoyear']; }
                        if (val['gmodel'] == null) { var val_gmodel = ''; } else { var val_gmodel = val['gmodel']; }
                        if (val['carbrand'] == null) { var val_carbrand = ''; } else { var val_carbrand = val['carbrand']; }
                        if (val['carGeneration'] == null) { var val_carGeneration = ''; } else { var val_carGeneration = val['carGeneration']; }
                        if (val['carEngine'] == null) { var val_carEngine = ''; } else { var val_carEngine = val['carEngine']; }
                        if (val['carBody'] == null) { var val_carBody = ''; } else { var val_carBody = val['carBody']; }
                        if (val['codeOem'] == null) { var val_codeOem = ''; } else { var val_codeOem = val['codeOem']; }
                        if (val['UOM'] == null) { var val_UOM = ''; } else { var val_UOM = val['UOM']; }
                        if (val['gdescript'] == null) { var val_gremark = ''; } else { var val_gremark = val['gdescript']; }
                        //if (val['cartoyear'] == null) { var val_cartoyear = ''; } else { var val_cartoyear = val['cartoyear']; }
                        //if (val['gdescript'] == null) { var val_gdescript = ''; } else { var val_gdescript = val['gdescript']; }
                        //if (val['stdmargin'] == null) { var val_stdmargin = ''; } else { var val_stdmargin = val['stdmargin']; }
                        if (val['stmas_name_compare'] == null) { var val_stmas_name_compare = ''; } else { var val_stmas_name_compare = val['stmas_name_compare']; }
                        if (val['stmas_exp_name_compare'] == null) { var val_stmas_exp_name_compare = ''; } else { var val_stmas_exp_name_compare = val['stmas_exp_name_compare']; }
                        if (val['stmas_name'] == null) { var val_stmas_name = ''; } else { var val_stmas_name = val['stmas_name']; }
                        if (val['action_type'] == null) { var action_type = ''; } else { var action_type = val['action_type']; }
                        var status = val['record_status'];
                        var bg_row;
                        if (action_type == 'create') {

                            code1 = val_code_a.trim().length !== 6 || val['record_status'] == 6 || val['record_status'] == 11 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_a + '</span>' : val_code_a
                            code2 = val_code_b.trim().length !== 4 || val['record_status'] == 7 || val['record_status'] == 12 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_b + '</span>' : val_code_b
                            code3 = val_code_c.trim().length !== 4 || val['record_status'] == 8 || val['record_status'] == 13 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_c + '</span>' : val_code_c
                            code4 = val_code_d.trim().length !== 3 || val['record_status'] == 9 || val['record_status'] == 14 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_d + '</span>' : val_code_d
                            code5 = val_code_e.trim().length !== 4 || val['record_status'] == 15/*|| val['record_status'] == 3 */ ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_e + '</span>' : val_code_e

                            //var code = "";

                            code = code1 + '-' + code2 + '-' + code3 + '-' + code4 + '-' + code5

                            if (val['record_status'] == 0) {
                                name_txt = val['name'];
                                recordstatus_txt = '<span style="color:red ;font-weight: bold;text-align: center;">ERROR</span>';
                                status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">รหัสสินค้าไม่ครบ 25 ตัว</span>';

                            } else if (val['record_status'] == 1) {
                                name_txt = val['name'];
                                recordstatus_txt = '<span style="color: green;font-weight: bold;text-align: center;">OK</span>';
                                status_txt = '<span style="color: green; font-weight: bold;text-align: center;">สามารถนำเข้าได้</span>';

                            } else if (val['record_status'] == 2) {
                                name_txt = val['name'];
                                recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                                status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">มีรหัสซ้ำใน excel</span>';

                            } else if (val['record_status'] == 6 || val['record_status'] == 7 || val['record_status'] == 8 || val['record_status'] == 9) {
                                name_txt = val['name'];
                                recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;">ERROR</span>';
                                status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">รหัสสินค้าไม่ตรง</span>';

                            } else if (val['record_status'] == 4) {
                                name_txt = '<span style="color: red;font-weight: bold;text-align: center;">' + val['name']; + '</span>';
                                recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                                status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">ชื่อสินค้าซ้ำ</span>';

                            } else if (val['record_status'] == 5) {
                                name_txt = val['name'];
                                code = '<span style="color: red;font-weight: bold;text-align: center;">' + code1 + '-' + code2 + '-' + code3 + '-' + code4 + '-' + code5 + '</span>';
                                recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                                status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">รหัสสินค้าซ้ำ</span>';

                            } else if (val['record_status'] == 11 || val['record_status'] == 12 || val['record_status'] == 13 || val['record_status'] == 14 || val['record_status'] == 15) {
                                name_txt = val['name'];
                                recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;">ERROR</span>';
                                status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">ไม่พบข้อมูลรหัสสินค้า</span>';

                            } else if (val['record_status'] == 3) {
                                val_stmas_name = '<span style="color: #414241 ;font-weight: bold;text-align: center;">ไม่พบข้อมูล</span>';
                                recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;">ERROR</span>';
                                status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">ไม่พบข้อมูลสินค้าหลัก</span>';
                                val_coderef = '<span style="color: red;font-weight: bold;text-align: center;">' + val_coderef + '</span>';
                            }

                            if (val['name'].trim() == val_stmas_exp_name_compare) {
                                results = '<span style="color: green;font-weight: bold;text-align: center;">ชื่อสินค้าตรงกัน</span>';
                            } else {
                                results = '<span style="color: red;font-weight: bold;text-align: center;">ชื่อสินค้าไม่ตรงกัน</span>';
                                val_stmas_exp_name_compare = '<span style="color: red;font-weight: bold;text-align: center;">' + val_stmas_exp_name_compare + '</span>';
                            }

                            if (val_code.trim().length != 25) {
                                //Swal.fire(
                                //    'มีรหัสสินค้าพ่วงไม่ครบ',
                                //    'ระบบไม่สามารถทำงานต่อได้ กรุณาตรวจสอบข้อมูล',
                                //    'warning'
                                //)
                                //$('.actions').hide();
                                //$('.chk_code').show();
                                code = '<span style="color: red;font-weight: bold;text-align: center;">' + code + '</span>';
                            }

                            //if (status == 1) {
                            //    bg_row = '#66FF99';
                            //} else if (status == 0 || status == 3 || status == 6 || status == 7 || status == 8 || status == 9 || status == 11 || status == 12 || status == 13 || status == 14 || status == 15) {
                            //    bg_row = '#FFC0CB';
                            //} else if (status == 2 || status == 4 || status == 5) {
                            //    bg_row = '#FFFFCC';
                            //}

                        } else if (action_type == 'delete') {

                            code1 = val_code_a.trim().length !== 6 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_a + '</span>' : val_code_a
                            code2 = val_code_b.trim().length !== 4 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_b + '</span>' : val_code_b
                            code3 = val_code_c.trim().length !== 4 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_c + '</span>' : val_code_c
                            code4 = val_code_d.trim().length !== 3 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_d + '</span>' : val_code_d
                            code5 = val_code_e.trim().length !== 4 /*|| val['record_status'] == 3 */ ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_e + '</span>' : val_code_e

                            //var code = "";

                            code = code1 + '-' + code2 + '-' + code3 + '-' + code4 + '-' + code5

                            if (val['record_status'] == 0 || val['record_status'] == 3) {
                                name_txt = val['name'];
                                recordstatus_txt = '<span style="color:red ;font-weight: bold;text-align: center;">ERROR</span>';
                                status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">ไม่พบรายการสินค้า</span>';
                            } else if (val['record_status'] == 1) {
                                name_txt = val['name'];
                                recordstatus_txt = '<span style="color: green;font-weight: bold;text-align: center;">OK</span>';
                                status_txt = '<span style="color: green; font-weight: bold;text-align: center;">สามารถลบได้</span>';
                            } else if (val['record_status'] == 2) {
                                name_txt = val['name'];
                                recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                                status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">มีรหัสซ้ำใน excel</span>';
                            }

                            if (val_code.trim().length != 25) {
                                code = '<span style="color: red;font-weight: bold;text-align: center;">' + code + '</span>';
                            }

                            //if (status == 1) {
                            //    bg_row = '#66FF99';
                            //} else if (status !== 1 || status !== 2) {
                            //    bg_row = '#FFC0CB';
                            //} else if (status == 2) {
                            //    bg_row = '#FFFFCC';
                            //}

                        }

                        $('#tbl-list-temp tbody').append('<tr>' +
                            '<td class="tx-center">' + i + '</td>' +
                            '<td class="tx-center">' + recordstatus_txt + '</td>' +
                            '<td class="tx-center style="width: 150px;"">' + status_txt + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + val_coderef + '</td>' +
                            //'<td class="tx-center" style="width: 150px;">' + val_stmas_name_compare + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + val_stmas_name + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + code + '</td>' +
                            '<td style="width: 150px;">' + name_txt + '</td>' +
                            '<td style="width: 150px;">' + val_stmas_exp_name_compare + '</td>' +
                            '<td style="width: 150px;">' + results + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + val_chrcode + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + val_gbarcode + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + val_spcodes + '</td>' +
                            '<td class="tx-center">' + val_code_a + '</td>' +
                            '<td class="tx-center">' + val_code_b + '</td>' +
                            '<td class="tx-center">' + val_code_c + '</td>' +
                            '<td class="tx-center">' + val_code_d + '</td>' +
                            '<td class="tx-center">' + val_code_e + '</td>' +
                            '<td class="tx-center">' + val_gzone + '</td>' +
                            '<td class="tx-center">' + val_carmodel + '</td>' +
                            '<td class="tx-center">' + val_carfmyear + '</td>' +
                            '<td class="tx-center">' + val_cartoyear + '</td>' +
                            '<td class="tx-center">' + val_gmodel + '</td>' +
                            '<td class="tx-center">' + val_carbrand + '</td>' +
                            '<td class="tx-center">' + val_carGeneration + '</td>' +
                            '<td class="tx-center">' + val_carEngine + '</td>' +
                            '<td class="tx-center">' + val_carBody + '</td>' +
                            '<td class="tx-center">' + val_codeOem + '</td>' +
                            //'<td class="tx-center">' + val['serviceyear'] + '</td>' +
                            '<td class="tx-center">' + val_UOM + '</td>' +
                            '<td class="tx-center">' + val_gremark + '</td>' +
                            '</tr>');
                        i++
                    });

                } else if (currentindex == 1) {

                    let i = 1;

                    $.each(temp_table, function (key, val) {

                        var recordstatus_txt = "";
                        var name_txt = "";
                        var status_txt = "";
                        var prefsuppliername_txt = "";
                        if (val['action_type'] == null) { var action_type = ''; } else { var action_type = val['action_type']; }
                        if (action_type == 'create') {

                            if (val['record_status'] == 1) {
                                name_txt = val['name'];
                                status_txt = '<span style="color: green; font-weight: bold;text-align: center;">สามารถนำเข้าได้</span>';
                                recordstatus_txt = '<span style="color: green;font-weight: bold;text-align: center;"><i class="fa fa-check"></i></span>';
                            } else {
                                name_txt = val['name'];
                                status_txt = '<span style="color: red; font-weight: bold;text-align: center;">ไม่สามารถนำเข้าได้</span>';
                                recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;"><i class="fas fa-times"></i></span>';
                            }

                        } else if (action_type == 'delete') {

                            if (val['record_status'] == 1) {
                                name_txt = val['name'];
                                status_txt = '<span style="color: green; font-weight: bold;text-align: center;">สามารถลบรายการได้</span>';
                                recordstatus_txt = '<span style="color: green;font-weight: bold;text-align: center;"><i class="fa fa-check"></i></span>';
                            } else {
                                name_txt = val['name'];
                                status_txt = '<span style="color: red; font-weight: bold;text-align: center;">ไม่สามารถลบรายการได้</span>';
                                recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;"><i class="fas fa-times"></i></span>';
                            }

                        }
                        //console.log("lifecyclereviewdate", val['lifecyclereviewdate']);

                        if (val['code'] == null) { var val_code = ''; } else { var val_code = val['code']; }
                        if (val['coderef'] == null) { var val_coderef = ''; } else { var val_coderef = val['coderef']; }
                        if (val['chrcode'] == null) { var val_chrcode = ''; } else { var val_chrcode = val['chrcode']; }
                        if (val['code_a'] == null) { var val_code_a = ''; } else { var val_code_a = val['code_a']; }
                        if (val['code_b'] == null) { var val_code_b = ''; } else { var val_code_b = val['code_b']; }
                        if (val['code_c'] == null) { var val_code_c = ''; } else { var val_code_c = val['code_c']; }
                        if (val['code_d'] == null) { var val_code_d = ''; } else { var val_code_d = val['code_d']; }
                        if (val['code_e'] == null) { var val_code_e = ''; } else { var val_code_e = val['code_e']; }
                        if (val['gzone'] == null) { var val_gzone = ''; } else { var val_gzone = val['gzone']; }
                        if (val['gbarcode'] == null) { var val_gbarcode = ''; } else { var val_gbarcode = val['gbarcode']; }
                        if (val['spcodes'] == null) { var val_spcodes = ''; } else { var val_spcodes = val['spcodes']; }
                        if (val['carmodel'] == null) { var val_carmodel = ''; } else { var val_carmodel = val['carmodel']; }
                        if (val['carfmyear'] == null) { var val_carfmyear = ''; } else { var val_carfmyear = val['carfmyear']; }
                        if (val['cartoyear'] == null) { var val_cartoyear = ''; } else { var val_cartoyear = val['cartoyear']; }
                        if (val['gmodel'] == null) { var val_gmodel = ''; } else { var val_gmodel = val['gmodel']; }
                        if (val['carbrand'] == null) { var val_carbrand = ''; } else { var val_carbrand = val['carbrand']; }
                        if (val['carGeneration'] == null) { var val_carGeneration = ''; } else { var val_carGeneration = val['carGeneration']; }
                        if (val['carEngine'] == null) { var val_carEngine = ''; } else { var val_carEngine = val['carEngine']; }
                        if (val['carBody'] == null) { var val_carBody = ''; } else { var val_carBody = val['carBody']; }
                        if (val['codeOem'] == null) { var val_codeOem = ''; } else { var val_codeOem = val['codeOem']; }
                        if (val['UOM'] == null) { var val_UOM = ''; } else { var val_UOM = val['UOM']; }
                        if (val['gdescript'] == null) { var val_gremark = ''; } else { var val_gremark = val['gdescript']; }
                        if (val['stmas_name_compare'] == null) { var val_stmas_name_compare = ''; } else { var val_stmas_name_compare = val['stmas_name_compare']; }
                        if (val['stmas_exp_name_compare'] == null) { var val_stmas_exp_name_compare = ''; } else { var val_stmas_exp_name_compare = val['stmas_exp_name_compare']; }
                        if (val['stmas_name'] == null) { var val_stmas_name = ''; } else { var val_stmas_name = val['stmas_name']; }
                        //if (val['cartoyear'] == null) { var val_cartoyear = ''; } else { var val_cartoyear = val['cartoyear']; }
                        //if (val['gdescript'] == null) { var val_gdescript = ''; } else { var val_gdescript = val['gdescript']; }
                        //if (val['stdmargin'] == null) { var val_stdmargin = ''; } else { var val_stdmargin = val['stdmargin']; }


                        $('#tbl-list-temp tbody').append('<tr>' +
                            '<td class="tx-center">' + i + '</td>' +
                            '<td class="tx-center">' + recordstatus_txt + '</td>' +
                            '<td class="tx-center style="width: 150px;"">' + status_txt + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + val_coderef + '</td>' +
                            //'<td class="tx-center" style="width: 150px;">' + val_stmas_name_compare + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + val_stmas_name + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + val_code + '</td>' +
                            '<td style="width: 150px;">' + name_txt + '</td>' +
                            '<td style="width: 150px;">' + val_stmas_exp_name_compare + '</td>' +
                            '<td style="width: 150px;">' + status_txt + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + val_chrcode + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + val_gbarcode + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + val_spcodes + '</td>' +
                            '<td class="tx-center">' + val_code_a + '</td>' +
                            '<td class="tx-center">' + val_code_b + '</td>' +
                            '<td class="tx-center">' + val_code_c + '</td>' +
                            '<td class="tx-center">' + val_code_d + '</td>' +
                            '<td class="tx-center">' + val_code_e + '</td>' +
                            '<td class="tx-center">' + val_gzone + '</td>' +
                            '<td class="tx-center">' + val_carmodel + '</td>' +
                            '<td class="tx-center">' + val_carfmyear + '</td>' +
                            '<td class="tx-center">' + val_cartoyear + '</td>' +
                            '<td class="tx-center">' + val_gmodel + '</td>' +
                            '<td class="tx-center">' + val_carbrand + '</td>' +
                            '<td class="tx-center">' + val_carGeneration + '</td>' +
                            '<td class="tx-center">' + val_carEngine + '</td>' +
                            '<td class="tx-center">' + val_carBody + '</td>' +
                            '<td class="tx-center">' + val_codeOem + '</td>' +
                            //'<td class="tx-center">' + val['serviceyear'] + '</td>' +
                            '<td class="tx-center">' + val_UOM + '</td>' +
                            '<td class="tx-center">' + val_gremark + '</td>' +
                            '</tr>');
                        i++
                    });
                }
            };


            $.fnupdatedata = function (template_id) {

                $.LoadingOverlay("show", {
                    image: '',
                    custom: customElement
                });

                fetch(url_import_data_update_data + '?temp_id=' + template_id + '&updated_by=' + name + '&updated_by2=' + full_name).then(function (response) {
                    return response.json();
                }).then(function (result) {

                    if (result.status === 'Error') {
                        $.LoadingOverlay("hide");
                        $.addLogEvent(template_id, 'VSM', 'create', '/master/stmas_exp_import', 'ERROR');
                        toastr.error(data.error_message);
                        $('.actions').hide();

                    } else {

                        $.addLogEvent(template_id, 'VSM', 'create', '/master/stmas_exp_import', 'OK');

                        $.LoadingOverlay("hide");
                        console.log("updated");
                        toastr.success('Updated data successfully');
                        setTimeout(function () {
                            Swal.fire(
                                'การเพิ่มรายการสินค้าสำเร็จ!',
                                //'Your file has been deleted.',
                                'success'
                            )
                            $('.actions').hide();

                            //setTimeout(function () {

                            //    location.reload();
                            //}, 3000);

                        }, 300);




                    }
                }).catch(error => {
                    $.LoadingOverlay("hide");
                    toastr.error('Error, Please contact administrator.');
                });

                //setTimeout(function () {
                //    $.LoadingOverlay("hide");
                //}, 2000);

            };


            $('#wizard1').steps({
                headerTag: 'h3',
                bodyTag: 'section',
                autoFocus: true,
                titleTemplate: '<span class="number">#index#<\/span> <span class="title">#title#<\/span>',
                onStepChanged: function () {
                    var chk_index = $('#wizard1').steps('getCurrentIndex');
                    console.log("onStepChanged:currentIndex", chk_index);

                    if (chk_index == 0 || chk_index == 1) { $.fntemptable(chk_index); }
                    if (chk_index == 2) {

                        Swal.fire({
                            title: 'คุณแน่ใจหรือไม่?',
                            text: "ที่จะทำการเพิ่มรายการสินค้า",
                            icon: 'warning',
                            showDenyButton: true,
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'ใช่ฉันแน่',
                            denyButtonText: `ยกเลิก`,
                        }).then((result) => {
                            if (result.isConfirmed) {

                                setTimeout(function () {

                                    $.fnupdatedata(temp_id);

                                }, 300);

                            } else if (result.isDenied) {

                                $.fntemptable(chk_index);
                            }
                        })


                        //$.fnupdatedata(temp_id);
                    }

                },
                onFinishing: function () {
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                }
            });


            $('#wizards').find('#btn_downloadtemplate').on('click', function (evt) {
                /* if (authorize == 'ITM-MIS-01' || authorize == 'ITM-PIT-01' || authorize == 'ITM-PIT-02' || authorize == 'ITM-PM-01' || authorize == 'ITM-PM-02' || authorize == 'ITM-PUR-01' || authorize == 'ITM-PUR-02' || authorize == 'ITM-PM-03') {*/

                location.href = template_url + 'Import_Data_StmasExp-UAT.xlsx';

                console.log("...downloadtemplate...");

                //} else {
                //    toastr.error("No Template for your permission.");
                //}
            });


            $('#customFile').on('change', function (evt) {

                evt.preventDefault();

                if ($(this).val() !== '') {

                    let i = 0;

                    $('#customFile').prop('disabled', true);

                    readXlsxFile(this.files[0], { dateFormat: 'YYYY/MM/DD_hh:mm:ss' }).then(async function (result) {

                        //console.log("Length: ", result.length);

                        if (result.length > 2) {

                            $.LoadingOverlay("show", {
                                image: '',
                                custom: customElement
                            });
                            $('.actions').show();
                            //count_length = result.length ;
                            count_length = result.length - 2;
                            //console.log("count_length", count_length);
                            console.log("result", result);

                            let add_data = {
                                'temp_id': temp_id,
                                'countitem_all': count_length,
                                'created_by': name,
                                'created_by2': full_name,
                            };

                            var params = [];
                            for (const i in add_data) {
                                params.push(i + "=" + encodeURIComponent(add_data[i]));
                            }

                            fetch(url_import_data_create, {
                                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                                //mode: 'no-cors', // no-cors, *cors, same-origin
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
                                    //alert('สำ')
                                    let count_row = 0;
                                    let count_index = 0;
                                    var citem_updateprice_tran_create = [];
                                    //console.log('temp_id', temp_id)
                                    $.each(result, function (key, val) {

                                        if (i > 1) {

                                            citem_updateprice_tran_create.push({

                                                //'coderef': val[0],
                                                //'stmas_name_compare': val[1],
                                                //'stmas_code_compare': val[2],
                                                //'stmas_exp_name_compare': val[3],
                                                //'code_a': val[4],
                                                //'code_a_compare': val[5],
                                                //'code_b': val[6],
                                                //'code_b_compare': val[7],
                                                //'code_c': val[8],
                                                //'code_c_compare': val[9],
                                                //'code_d': val[10],
                                                //'code_d_compare': val[11],
                                                //'code_e': val[12],
                                                //'code_e_compare': val[13],
                                                //'action_type': val[14],
                                                //'created_by': name,
                                                //'created_by2': full_name,
                                                //'temp_id': temp_id,

                                                'coderef': val[0],
                                                'stmas_name_compare': val[1],
                                                'stmas_exp_name_compare': val[2],
                                                'code_a_name': val[3],
                                                'code_e_name': val[4],
                                                'code_c_name': val[5],
                                                'code_b_name': val[6],
                                                'code_d_name': val[7],
                                                'gdescript': val[8],
                                                'action_type': val[9],
                                                'created_by': name,
                                                'created_by2': full_name,
                                                'temp_id': temp_id,
                                            });

                                        }

                                        i++

                                    });


                                    console.log("citem_updateprice_tran_create", citem_updateprice_tran_create)


                                    $.ajax({
                                        url: url_data_tran_create,
                                        type: 'POST',
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        data: JSON.stringify(citem_updateprice_tran_create),
                                        success: function (data) {

                                            console.log("citem_updateprice_tran_create", data);

                                            fetch(url_import_data_template_get + '?temp_id=' + temp_id + '&created_by=' + name + '&created_by2=' + full_name).then(function (response) {
                                                return response.json();
                                            }).then(function (result) {

                                                console.log("ItemMaster_ImportUpdateData_TemplateGet", result.data);

                                                temp_table = result.data;
                                                let i = 1;

                                                $.each(result.data, function (key, val) {
                                                    var code1 = "";
                                                    var code2 = "";
                                                    var code3 = "";
                                                    var code4 = "";
                                                    var code5 = "";
                                                    var code = "";
                                                    var recordstatus_txt = "";
                                                    var name_txt = "";
                                                    var status_txt = "";
                                                    var results = "";
                                                    var bg_row;

                                                    if (val['code'] == null) { var val_code = ''; } else { var val_code = val['code']; }
                                                    if (val['coderef'] == null) { var val_coderef = ''; } else { var val_coderef = val['coderef']; }
                                                    if (val['chrcode'] == null) { var val_chrcode = ''; } else { var val_chrcode = val['chrcode']; }
                                                    if (val['code_a'] == null) { var val_code_a = ''; } else { var val_code_a = val['code_a']; }
                                                    if (val['code_b'] == null) { var val_code_b = ''; } else { var val_code_b = val['code_b']; }
                                                    if (val['code_c'] == null) { var val_code_c = ''; } else { var val_code_c = val['code_c']; }
                                                    if (val['code_d'] == null) { var val_code_d = ''; } else { var val_code_d = val['code_d']; }
                                                    if (val['code_e'] == null) { var val_code_e = ''; } else { var val_code_e = val['code_e']; }
                                                    if (val['gzone'] == null) { var val_gzone = ''; } else { var val_gzone = val['gzone']; }
                                                    if (val['gbarcode'] == null) { var val_gbarcode = ''; } else { var val_gbarcode = val['gbarcode']; }
                                                    if (val['spcodes'] == null) { var val_spcodes = ''; } else { var val_spcodes = val['spcodes']; }
                                                    if (val['carmodel'] == null) { var val_carmodel = ''; } else { var val_carmodel = val['carmodel']; }
                                                    if (val['carfmyear'] == null) { var val_carfmyear = ''; } else { var val_carfmyear = val['carfmyear']; }
                                                    if (val['cartoyear'] == null) { var val_cartoyear = ''; } else { var val_cartoyear = val['cartoyear']; }
                                                    if (val['gmodel'] == null) { var val_gmodel = ''; } else { var val_gmodel = val['gmodel']; }
                                                    if (val['carbrand'] == null) { var val_carbrand = ''; } else { var val_carbrand = val['carbrand']; }
                                                    if (val['carGeneration'] == null) { var val_carGeneration = ''; } else { var val_carGeneration = val['carGeneration']; }
                                                    if (val['carEngine'] == null) { var val_carEngine = ''; } else { var val_carEngine = val['carEngine']; }
                                                    if (val['carBody'] == null) { var val_carBody = ''; } else { var val_carBody = val['carBody']; }
                                                    if (val['codeOem'] == null) { var val_codeOem = ''; } else { var val_codeOem = val['codeOem']; }
                                                    if (val['UOM'] == null) { var val_UOM = ''; } else { var val_UOM = val['UOM']; }
                                                    if (val['gdescript'] == null) { var val_gremark = ''; } else { var val_gremark = val['gdescript']; }
                                                    //if (val['cartoyear'] == null) { var val_cartoyear = ''; } else { var val_cartoyear = val['cartoyear']; }
                                                    //if (val['gdescript'] == null) { var val_gdescript = ''; } else { var val_gdescript = val['gdescript']; }
                                                    //if (val['stdmargin'] == null) { var val_stdmargin = ''; } else { var val_stdmargin = val['stdmargin']; }
                                                    if (val['stmas_name_compare'] == null) { var val_stmas_name_compare = ''; } else { var val_stmas_name_compare = val['stmas_name_compare']; }
                                                    if (val['stmas_exp_name_compare'] == null) { var val_stmas_exp_name_compare = ''; } else { var val_stmas_exp_name_compare = val['stmas_exp_name_compare']; }
                                                    if (val['stmas_code_compare'] == null) { var val_stmas_code_compare = ''; } else { var val_stmas_code_compare = val['stmas_code_compare']; }
                                                    if (val['stmas_name'] == null) { var val_stmas_name = ''; } else { var val_stmas_name = val['stmas_name']; }
                                                    if (val['action_type'] == null) { var action_type = ''; } else { var action_type = val['action_type']; }
                                                    var status = val['record_status'];
                                                    //var coderef_raw = val_coderef.trim()
                                                    //var code1_raw = coderef_raw.substring(1, 6);
                                                    //var code2_raw = coderef_raw.substring(7, 11);
                                                    //var code3_raw = coderef_raw.substring(12, 16);
                                                    //var code4_raw = coderef_raw.substring(17, 20);

                                                    //console.log('coderef_raw',coderef_raw)
                                                    //console.log('code1_raw', code1_raw)
                                                    //console.log('code2_raw', code2_raw)
                                                    //console.log('code3_raw', code3_raw)
                                                    //console.log('code4_raw', code4_raw)

                                                    if (val_code.trim().length != 25) {
                                                        Swal.fire(
                                                            'มีรหัสสินค้าพ่วงไม่ครบ',
                                                            'ระบบไม่สามารถทำงานต่อได้ กรุณาตรวจสอบข้อมูล',
                                                            'warning'
                                                        )
                                                        $('.actions').hide();
                                                        $('.chk_code').show();
                                                        code = '<span style="color: red;font-weight: bold;text-align: center;">' + code + '</span>';
                                                    }


                                                    if (action_type == 'create') {

                                                        code1 = val_code_a.trim().length !== 6 || val['record_status'] == 6 || val['record_status'] == 11 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_a + '</span>' : val_code_a
                                                        code2 = val_code_b.trim().length !== 4 || val['record_status'] == 7 || val['record_status'] == 12 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_b + '</span>' : val_code_b
                                                        code3 = val_code_c.trim().length !== 4 || val['record_status'] == 8 || val['record_status'] == 13 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_c + '</span>' : val_code_c
                                                        code4 = val_code_d.trim().length !== 3 || val['record_status'] == 9 || val['record_status'] == 14 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_d + '</span>' : val_code_d
                                                        code5 = val_code_e.trim().length !== 4 || val['record_status'] == 15/*|| val['record_status'] == 3 */ ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_e + '</span>' : val_code_e

                                                        code = code1 + '-' + code2 + '-' + code3 + '-' + code4 + '-' + code5

                                                        if (val['record_status'] == 0) {
                                                            name_txt = val['name'];
                                                            recordstatus_txt = '<span style="color:red ;font-weight: bold;text-align: center;">ERROR</span>';
                                                            status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">รหัสสินค้าไม่ครบ 25 ตัว</span>';

                                                        } else if (val['record_status'] == 1) {
                                                            name_txt = val['name'];
                                                            recordstatus_txt = '<span style="color: green;font-weight: bold;text-align: center;">OK</span>';
                                                            status_txt = '<span style="color: green; font-weight: bold;text-align: center;">สามารถนำเข้าได้</span>';

                                                        } else if (val['record_status'] == 2) {
                                                            name_txt = val['name'];
                                                            recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                                                            status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">มีรหัสซ้ำใน excel</span>';

                                                        } else if (val['record_status'] == 6 || val['record_status'] == 7 || val['record_status'] == 8 || val['record_status'] == 9) {
                                                            name_txt = val['name'];
                                                            recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;">ERROR</span>';
                                                            status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">รหัสสินค้าไม่ตรง</span>';

                                                        } else if (val['record_status'] == 4) {
                                                            name_txt = '<span style="color: red;font-weight: bold;text-align: center;">' + val['name']; + '</span>';
                                                            recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                                                            status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">ชื่อสินค้าซ้ำ</span>';

                                                        } else if (val['record_status'] == 5) {
                                                            name_txt = val['name'];
                                                            code = '<span style="color: red;font-weight: bold;text-align: center;">' + code1 + '-' + code2 + '-' + code3 + '-' + code4 + '-' + code5 + '</span>';
                                                            recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                                                            status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">รหัสสินค้าซ้ำ</span>';

                                                        } else if (val['record_status'] == 11 || val['record_status'] == 12 || val['record_status'] == 13 || val['record_status'] == 14 || val['record_status'] == 15) {
                                                            name_txt = val['name'];
                                                            recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;">ERROR</span>';
                                                            status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">ไม่พบข้อมูลรหัสสินค้า</span>';

                                                        } else if (val['record_status'] == 3) {
                                                            val_stmas_name = '<span style="color: #414241 ;font-weight: bold;text-align: center;">ไม่พบข้อมูล</span>';
                                                            recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;">ERROR</span>';
                                                            status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">ไม่พบข้อมูลสินค้าหลัก</span>';
                                                            val_coderef = '<span style="color: red;font-weight: bold;text-align: center;">' + val_coderef + '</span>';
                                                        }

                                                        if (val['name'].trim() == val_stmas_exp_name_compare) {
                                                            results = '<span style="color: green;font-weight: bold;text-align: center;">ชื่อสินค้าตรงกัน</span>';
                                                        } else {
                                                            results = '<span style="color: red;font-weight: bold;text-align: center;">ชื่อสินค้าไม่ตรงกัน</span>';
                                                            val_stmas_exp_name_compare = '<span style="color: red;font-weight: bold;text-align: center;">' + val_stmas_exp_name_compare + '</span>';
                                                        }

                                                        if (val_code.trim().length != 25) {
                                                            //Swal.fire(
                                                            //    'มีรหัสสินค้าพ่วงไม่ครบ',
                                                            //    'ระบบไม่สามารถทำงานต่อได้ กรุณาตรวจสอบข้อมูล',
                                                            //    'warning'
                                                            //)
                                                            //$('.actions').hide();
                                                            //$('.chk_code').show();
                                                            code = '<span style="color: red;font-weight: bold;text-align: center;">' + code + '</span>';
                                                        }

                                                        if (status == 1) {
                                                            bg_row = '#66FF99';
                                                        } else if (status == 0 || status == 3 || status == 6 || status == 7 || status == 8 || status == 9 || status == 11 || status == 12 || status == 13 || status == 14 || status == 15) {
                                                            bg_row = '#FFC0CB';
                                                        } else if (status == 2 || status == 4 || status == 5) {
                                                            bg_row = '#FFFFCC';
                                                        }

                                                    } else if (action_type == 'delete') {

                                                        code1 = val_code_a.trim().length !== 6 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_a + '</span>' : val_code_a
                                                        code2 = val_code_b.trim().length !== 4 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_b + '</span>' : val_code_b
                                                        code3 = val_code_c.trim().length !== 4 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_c + '</span>' : val_code_c
                                                        code4 = val_code_d.trim().length !== 3 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_d + '</span>' : val_code_d
                                                        code5 = val_code_e.trim().length !== 4 /*|| val['record_status'] == 3 */ ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_e + '</span>' : val_code_e

                                                        //var code = "";

                                                        code = code1 + '-' + code2 + '-' + code3 + '-' + code4 + '-' + code5

                                                        if (val['record_status'] == 0 || val['record_status'] == 3) {
                                                            name_txt = val['name'];
                                                            recordstatus_txt = '<span style="color:red ;font-weight: bold;text-align: center;">ERROR</span>';
                                                            status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">ไม่พบรายการสินค้า</span>';
                                                        } else if (val['record_status'] == 1) {
                                                            name_txt = val['name'];
                                                            recordstatus_txt = '<span style="color: green;font-weight: bold;text-align: center;">OK</span>';
                                                            status_txt = '<span style="color: green; font-weight: bold;text-align: center;">สามารถลบได้</span>';
                                                        } else if (val['record_status'] == 2) {
                                                            name_txt = val['name'];
                                                            recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                                                            status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">มีรหัสซ้ำใน excel</span>';
                                                        }

                                                        if (val_code.trim().length != 25) {
                                                            code = '<span style="color: red;font-weight: bold;text-align: center;">' + code + '</span>';
                                                        }

                                                        if (status == 1) {
                                                            bg_row = '#66FF99';
                                                        } else if (status !== 1 || status !== 2) {
                                                            bg_row = '#FFC0CB';
                                                        } else if (status == 2) {
                                                            bg_row = '#FFFFCC';
                                                        }

                                                    }


                                                    $('#tbl-list-temp tbody').append('<tr style="background-color: ' + bg_row + ';">' +
                                                        '<td class="tx-center">' + i + '</td>' +
                                                        '<td class="tx-center">' + recordstatus_txt + '</td>' +
                                                        '<td class="tx-center style="width: 150px;"">' + status_txt + '</td>' +
                                                        '<td class="tx-center" style="width: 150px;">' + val_coderef + '</td>' +
                                                        '<td class="tx-center" style="width: 150px;">' + val_stmas_name + '</td>' +
                                                        //'<td class="tx-center" style="width: 150px;">' + val_stmas_name_compare + '</td>' +
                                                        '<td class="tx-center" style="width: 150px;">' + code + '</td>' +
                                                        '<td style="width: 150px;">' + name_txt + '</td>' +
                                                        '<td style="width: 150px;">' + val_stmas_exp_name_compare + '</td>' +
                                                        '<td style="width: 150px;">' + results + '</td>' +
                                                        '<td class="tx-center" style="width: 150px;">' + val_chrcode + '</td>' +
                                                        '<td class="tx-center" style="width: 150px;">' + val_gbarcode + '</td>' +
                                                        '<td class="tx-center" style="width: 150px;">' + val_spcodes + '</td>' +
                                                        '<td class="tx-center">' + val_code_a + '</td>' +
                                                        '<td class="tx-center">' + val_code_b + '</td>' +
                                                        '<td class="tx-center">' + val_code_c + '</td>' +
                                                        '<td class="tx-center">' + val_code_d + '</td>' +
                                                        '<td class="tx-center">' + val_code_e + '</td>' +
                                                        '<td class="tx-center">' + val_gzone + '</td>' +
                                                        '<td class="tx-center">' + val_carmodel + '</td>' +
                                                        '<td class="tx-center">' + val_carfmyear + '</td>' +
                                                        '<td class="tx-center">' + val_cartoyear + '</td>' +
                                                        '<td class="tx-center">' + val_gmodel + '</td>' +
                                                        '<td class="tx-center">' + val_carbrand + '</td>' +
                                                        '<td class="tx-center">' + val_carGeneration + '</td>' +
                                                        '<td class="tx-center">' + val_carEngine + '</td>' +
                                                        '<td class="tx-center">' + val_carBody + '</td>' +
                                                        '<td class="tx-center">' + val_codeOem + '</td>' +
                                                        //'<td class="tx-center">' + val['serviceyear'] + '</td>' +
                                                        '<td class="tx-center">' + val_UOM + '</td>' +
                                                        '<td class="tx-center">' + val_gremark + '</td>' +
                                                        '</tr>');
                                                    i++
                                                });

                                                //$('#tbl-list-temp').DataTable({
                                                //    paging: false,
                                                //    dom: 'Brti',
                                                //    buttons: [
                                                //        'copyHtml5',
                                                //        {
                                                //            extend: 'excelHtml5',
                                                //            title: '',
                                                //            filename: 'Export_UpdateDataTemplate_' + authorize,
                                                //            exportOptions: {
                                                //                columns: [0, 1, 2, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 39, 40, 41, 42, 9, 10,]
                                                //            }
                                                //        },
                                                //    ],
                                                //});


                                                fetch(url_import_data_update + '?temp_id=' + temp_id + '&updated_by=' + name + '&updated_by2=' + full_name).then(function (response) {
                                                    return response.json();
                                                }).then(function (result) {

                                                    $.each(result.data, function (key, val) {

                                                        $("#wizards").find("#countitem_all").html(val['countitem_all']);
                                                        $("#wizards").find("#countitem_incomplete").html(val['countitem_incomplete']);
                                                        $("#wizards").find("#countitem_complete").html(val['countitem_complete']);
                                                        $("#wizards").find("#countitem_problem").html(val['countitem_incomplete']);

                                                        console.log("success");
                                                        $.LoadingOverlay("hide");

                                                    });

                                                });

                                            });
                                            $('.btn_error_stmas_exp').show();
                                            $('#wizards').find('.btn_error_stmas_exp').on('click', function (evt) {
                                                /* if (authorize == 'ITM-MIS-01' || authorize == 'ITM-PIT-01' || authorize == 'ITM-PIT-02' || authorize == 'ITM-PM-01' || authorize == 'ITM-PM-02' || authorize == 'ITM-PUR-01' || authorize == 'ITM-PUR-02' || authorize == 'ITM-PM-03') {*/

                                                location.href = 'http://192.168.1.159/ReportServer/Pages/ReportViewer.aspx?%2fReport-Template-Stmas-Exp%2fError-Stmas-Exp&rs:Command=Render&temp_id=' + temp_id + '&rs:Format=excel';
                                                temp_id
                                                console.log("...downloadtemplate_error...");

                                                //} else {
                                                //    toastr.error("No Template for your permission.");
                                                //}
                                            });

                                        }
                                    });

                                }

                            });

                        } else {
                            toastr.error('Data not found. Please make sure your data start at row 3');
                        }

                    }).catch(error => {
                        $.LoadingOverlay("hide");
                        toastr.error('Error writing document');
                        //console.error("Error writing document: ", error);
                    });

                }

                $.LoadingOverlay("hide");

            });


        };


        $(document).ready(async function () {

            await $.init();
            $('.actions').hide();
            $.addLogEvent('', 'VSM', 'visit', '/master/stmas_exp_import', 'OK');

        });



    } else {

        window.location.assign('./login');

    }

}); 'use strict';

let validator, oTable, table, options, item_action, item_id;

let objProfile = JSON.parse(localStorage.getItem('objProfile'));
//console.log("objProfile", objProfile);
let template_url = 'http://192.168.1.247/template/';
const url_api = 'http://localhost:49705';
const url_data_tran_create = url_api + '/api/ImportData_Tran_Create';
const url_import_data_create = url_api + '/api/ImportData_Create';
const url_import_data_update = url_api + '/api/ImportData_Update';
const url_import_data_update_data = url_api + '/api/ImportData_Update_Data';
const url_import_data_template_get = url_api + '/api/ImportData_TemplateGet';

let temp_id = $.uuid();
let temp_table = [];
let count_length = 0;
let chk_index = 0
var user_code;
var full_name;

function objectPropInArray(list, prop, val) {
    if (list.length > 0) {
        for (i in list) {
            if (list[i][prop] === val) {
                return true;
            }
        }
    }
    return false;
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
firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        var name = user.email.replace("@vskautoparts.com", "");
        let user_fname = objProfile.auth_user_profile[0]['user_fname'];
        let code_raw = objProfile.auth_user_profile[0]['user_lname'];
        user_code = code_raw.substring(code_raw.length - 5, code_raw.length);
        full_name = user_fname + '-' + user_code
        //full_name = 
        $.init = function () {

            console.log('name', name);
            console.log('full_name', full_name);

            $('.chk_code').hide();


            $('.btn_error_stmas_exp').hide();

            toastr.warning('อยู่ระหว่างการทดสอบการใช้งานเท่านั้น (UAT Mode)');

            $('.container').find('.breadcrumb-header').append('<div class="d-flex my-xl-auto right-content"><div class= "mb-3 mb-xl-0" ><h4 style="color: red;">UAT Version</h4></div ></div >');

            $.fntemptable = function (currentindex) {

                $('#tbl-list-temp tbody').empty();

                $('.btn_error_stmas_exp').show();

                $('#wizards').find('.btn_error_stmas_exp').on('click', function (evt) {
                    /* if (authorize == 'ITM-MIS-01' || authorize == 'ITM-PIT-01' || authorize == 'ITM-PIT-02' || authorize == 'ITM-PM-01' || authorize == 'ITM-PM-02' || authorize == 'ITM-PUR-01' || authorize == 'ITM-PUR-02' || authorize == 'ITM-PM-03') {*/

                    location.href = 'http://192.168.1.159/ReportServer/Pages/ReportViewer.aspx?%2fReport-Template-Stmas-Exp%2fError-Stmas-Exp&rs:Command=Render&temp_id=' + temp_id + '&rs:Format=excel';
                    temp_id
                    console.log("...downloadtemplate_error...");

                    //} else {
                    //    toastr.error("No Template for your permission.");
                    //}
                });

                if (currentindex == 0) {

                    let i = 1;

                    $.each(temp_table, function (key, val) {

                        var code1 = "";
                        var code2 = "";
                        var code3 = "";
                        var code4 = "";
                        var code5 = "";
                        var code = "";
                        var recordstatus_txt = "";
                        var name_txt = "";
                        var status_txt = "";
                        var results = "";

                        if (val['code'] == null) { var val_code = ''; } else { var val_code = val['code']; }
                        if (val['coderef'] == null) { var val_coderef = ''; } else { var val_coderef = val['coderef']; }
                        if (val['chrcode'] == null) { var val_chrcode = ''; } else { var val_chrcode = val['chrcode']; }
                        if (val['code_a'] == null) { var val_code_a = ''; } else { var val_code_a = val['code_a']; }
                        if (val['code_b'] == null) { var val_code_b = ''; } else { var val_code_b = val['code_b']; }
                        if (val['code_c'] == null) { var val_code_c = ''; } else { var val_code_c = val['code_c']; }
                        if (val['code_d'] == null) { var val_code_d = ''; } else { var val_code_d = val['code_d']; }
                        if (val['code_e'] == null) { var val_code_e = ''; } else { var val_code_e = val['code_e']; }
                        if (val['gzone'] == null) { var val_gzone = ''; } else { var val_gzone = val['gzone']; }
                        if (val['gbarcode'] == null) { var val_gbarcode = ''; } else { var val_gbarcode = val['gbarcode']; }
                        if (val['spcodes'] == null) { var val_spcodes = ''; } else { var val_spcodes = val['spcodes']; }
                        if (val['carmodel'] == null) { var val_carmodel = ''; } else { var val_carmodel = val['carmodel']; }
                        if (val['carfmyear'] == null) { var val_carfmyear = ''; } else { var val_carfmyear = val['carfmyear']; }
                        if (val['cartoyear'] == null) { var val_cartoyear = ''; } else { var val_cartoyear = val['cartoyear']; }
                        if (val['gmodel'] == null) { var val_gmodel = ''; } else { var val_gmodel = val['gmodel']; }
                        if (val['carbrand'] == null) { var val_carbrand = ''; } else { var val_carbrand = val['carbrand']; }
                        if (val['carGeneration'] == null) { var val_carGeneration = ''; } else { var val_carGeneration = val['carGeneration']; }
                        if (val['carEngine'] == null) { var val_carEngine = ''; } else { var val_carEngine = val['carEngine']; }
                        if (val['carBody'] == null) { var val_carBody = ''; } else { var val_carBody = val['carBody']; }
                        if (val['codeOem'] == null) { var val_codeOem = ''; } else { var val_codeOem = val['codeOem']; }
                        if (val['UOM'] == null) { var val_UOM = ''; } else { var val_UOM = val['UOM']; }
                        if (val['gdescript'] == null) { var val_gremark = ''; } else { var val_gremark = val['gdescript']; }
                        //if (val['cartoyear'] == null) { var val_cartoyear = ''; } else { var val_cartoyear = val['cartoyear']; }
                        //if (val['gdescript'] == null) { var val_gdescript = ''; } else { var val_gdescript = val['gdescript']; }
                        //if (val['stdmargin'] == null) { var val_stdmargin = ''; } else { var val_stdmargin = val['stdmargin']; }
                        if (val['stmas_name_compare'] == null) { var val_stmas_name_compare = ''; } else { var val_stmas_name_compare = val['stmas_name_compare']; }
                        if (val['stmas_exp_name_compare'] == null) { var val_stmas_exp_name_compare = ''; } else { var val_stmas_exp_name_compare = val['stmas_exp_name_compare']; }
                        if (val['stmas_name'] == null) { var val_stmas_name = ''; } else { var val_stmas_name = val['stmas_name']; }
                        if (val['action_type'] == null) { var action_type = ''; } else { var action_type = val['action_type']; }
                        var status = val['record_status'];
                        var bg_row;
                        if (action_type == 'create') {

                            code1 = val_code_a.trim().length !== 6 || val['record_status'] == 6 || val['record_status'] == 11 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_a + '</span>' : val_code_a
                            code2 = val_code_b.trim().length !== 4 || val['record_status'] == 7 || val['record_status'] == 12 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_b + '</span>' : val_code_b
                            code3 = val_code_c.trim().length !== 4 || val['record_status'] == 8 || val['record_status'] == 13 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_c + '</span>' : val_code_c
                            code4 = val_code_d.trim().length !== 3 || val['record_status'] == 9 || val['record_status'] == 14 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_d + '</span>' : val_code_d
                            code5 = val_code_e.trim().length !== 4 || val['record_status'] == 15/*|| val['record_status'] == 3 */ ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_e + '</span>' : val_code_e

                            //var code = "";

                            code = code1 + '-' + code2 + '-' + code3 + '-' + code4 + '-' + code5

                            if (val['record_status'] == 0) {
                                name_txt = val['name'];
                                recordstatus_txt = '<span style="color:red ;font-weight: bold;text-align: center;">ERROR</span>';
                                status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">รหัสสินค้าไม่ครบ 25 ตัว</span>';

                            } else if (val['record_status'] == 1) {
                                name_txt = val['name'];
                                recordstatus_txt = '<span style="color: green;font-weight: bold;text-align: center;">OK</span>';
                                status_txt = '<span style="color: green; font-weight: bold;text-align: center;">สามารถนำเข้าได้</span>';

                            } else if (val['record_status'] == 2) {
                                name_txt = val['name'];
                                recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                                status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">มีรหัสซ้ำใน excel</span>';

                            } else if (val['record_status'] == 6 || val['record_status'] == 7 || val['record_status'] == 8 || val['record_status'] == 9) {
                                name_txt = val['name'];
                                recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;">ERROR</span>';
                                status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">รหัสสินค้าไม่ตรง</span>';

                            } else if (val['record_status'] == 4) {
                                name_txt = '<span style="color: red;font-weight: bold;text-align: center;">' + val['name']; + '</span>';
                                recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                                status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">ชื่อสินค้าซ้ำ</span>';

                            } else if (val['record_status'] == 5) {
                                name_txt = val['name'];
                                code = '<span style="color: red;font-weight: bold;text-align: center;">' + code1 + '-' + code2 + '-' + code3 + '-' + code4 + '-' + code5 + '</span>';
                                recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                                status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">รหัสสินค้าซ้ำ</span>';

                            } else if (val['record_status'] == 11 || val['record_status'] == 12 || val['record_status'] == 13 || val['record_status'] == 14 || val['record_status'] == 15) {
                                name_txt = val['name'];
                                recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;">ERROR</span>';
                                status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">ไม่พบข้อมูลรหัสสินค้า</span>';

                            } else if (val['record_status'] == 3) {
                                val_stmas_name = '<span style="color: #414241 ;font-weight: bold;text-align: center;">ไม่พบข้อมูล</span>';
                                recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;">ERROR</span>';
                                status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">ไม่พบข้อมูลสินค้าหลัก</span>';
                                val_coderef = '<span style="color: red;font-weight: bold;text-align: center;">' + val_coderef + '</span>';
                            }

                            if (val['name'].trim() == val_stmas_exp_name_compare) {
                                results = '<span style="color: green;font-weight: bold;text-align: center;">ชื่อสินค้าตรงกัน</span>';
                            } else {
                                results = '<span style="color: red;font-weight: bold;text-align: center;">ชื่อสินค้าไม่ตรงกัน</span>';
                                val_stmas_exp_name_compare = '<span style="color: red;font-weight: bold;text-align: center;">' + val_stmas_exp_name_compare + '</span>';
                            }

                            if (val_code.trim().length != 25) {
                                //Swal.fire(
                                //    'มีรหัสสินค้าพ่วงไม่ครบ',
                                //    'ระบบไม่สามารถทำงานต่อได้ กรุณาตรวจสอบข้อมูล',
                                //    'warning'
                                //)
                                //$('.actions').hide();
                                //$('.chk_code').show();
                                code = '<span style="color: red;font-weight: bold;text-align: center;">' + code + '</span>';
                            }

                            //if (status == 1) {
                            //    bg_row = '#66FF99';
                            //} else if (status == 0 || status == 3 || status == 6 || status == 7 || status == 8 || status == 9 || status == 11 || status == 12 || status == 13 || status == 14 || status == 15) {
                            //    bg_row = '#FFC0CB';
                            //} else if (status == 2 || status == 4 || status == 5) {
                            //    bg_row = '#FFFFCC';
                            //}

                        } else if (action_type == 'delete') {

                            code1 = val_code_a.trim().length !== 6 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_a + '</span>' : val_code_a
                            code2 = val_code_b.trim().length !== 4 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_b + '</span>' : val_code_b
                            code3 = val_code_c.trim().length !== 4 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_c + '</span>' : val_code_c
                            code4 = val_code_d.trim().length !== 3 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_d + '</span>' : val_code_d
                            code5 = val_code_e.trim().length !== 4 /*|| val['record_status'] == 3 */ ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_e + '</span>' : val_code_e

                            //var code = "";

                            code = code1 + '-' + code2 + '-' + code3 + '-' + code4 + '-' + code5

                            if (val['record_status'] == 0 || val['record_status'] == 3) {
                                name_txt = val['name'];
                                recordstatus_txt = '<span style="color:red ;font-weight: bold;text-align: center;">ERROR</span>';
                                status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">ไม่พบรายการสินค้า</span>';
                            } else if (val['record_status'] == 1) {
                                name_txt = val['name'];
                                recordstatus_txt = '<span style="color: green;font-weight: bold;text-align: center;">OK</span>';
                                status_txt = '<span style="color: green; font-weight: bold;text-align: center;">สามารถลบได้</span>';
                            } else if (val['record_status'] == 2) {
                                name_txt = val['name'];
                                recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                                status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">มีรหัสซ้ำใน excel</span>';
                            }

                            if (val_code.trim().length != 25) {
                                code = '<span style="color: red;font-weight: bold;text-align: center;">' + code + '</span>';
                            }

                            //if (status == 1) {
                            //    bg_row = '#66FF99';
                            //} else if (status !== 1 || status !== 2) {
                            //    bg_row = '#FFC0CB';
                            //} else if (status == 2) {
                            //    bg_row = '#FFFFCC';
                            //}

                        }

                        $('#tbl-list-temp tbody').append('<tr>' +
                            '<td class="tx-center">' + i + '</td>' +
                            '<td class="tx-center">' + recordstatus_txt + '</td>' +
                            '<td class="tx-center style="width: 150px;"">' + status_txt + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + val_coderef + '</td>' +
                            //'<td class="tx-center" style="width: 150px;">' + val_stmas_name_compare + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + val_stmas_name + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + code + '</td>' +
                            '<td style="width: 150px;">' + name_txt + '</td>' +
                            '<td style="width: 150px;">' + val_stmas_exp_name_compare + '</td>' +
                            '<td style="width: 150px;">' + results + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + val_chrcode + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + val_gbarcode + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + val_spcodes + '</td>' +
                            '<td class="tx-center">' + val_code_a + '</td>' +
                            '<td class="tx-center">' + val_code_b + '</td>' +
                            '<td class="tx-center">' + val_code_c + '</td>' +
                            '<td class="tx-center">' + val_code_d + '</td>' +
                            '<td class="tx-center">' + val_code_e + '</td>' +
                            '<td class="tx-center">' + val_gzone + '</td>' +
                            '<td class="tx-center">' + val_carmodel + '</td>' +
                            '<td class="tx-center">' + val_carfmyear + '</td>' +
                            '<td class="tx-center">' + val_cartoyear + '</td>' +
                            '<td class="tx-center">' + val_gmodel + '</td>' +
                            '<td class="tx-center">' + val_carbrand + '</td>' +
                            '<td class="tx-center">' + val_carGeneration + '</td>' +
                            '<td class="tx-center">' + val_carEngine + '</td>' +
                            '<td class="tx-center">' + val_carBody + '</td>' +
                            '<td class="tx-center">' + val_codeOem + '</td>' +
                            //'<td class="tx-center">' + val['serviceyear'] + '</td>' +
                            '<td class="tx-center">' + val_UOM + '</td>' +
                            '<td class="tx-center">' + val_gremark + '</td>' +
                            '</tr>');
                        i++
                    });

                } else if (currentindex == 1) {

                    let i = 1;

                    $.each(temp_table, function (key, val) {

                        var recordstatus_txt = "";
                        var name_txt = "";
                        var status_txt = "";
                        var prefsuppliername_txt = "";
                        if (val['action_type'] == null) { var action_type = ''; } else { var action_type = val['action_type']; }
                        if (action_type == 'create') {

                            if (val['record_status'] == 1) {
                                name_txt = val['name'];
                                status_txt = '<span style="color: green; font-weight: bold;text-align: center;">สามารถนำเข้าได้</span>';
                                recordstatus_txt = '<span style="color: green;font-weight: bold;text-align: center;"><i class="fa fa-check"></i></span>';
                            } else {
                                name_txt = val['name'];
                                status_txt = '<span style="color: red; font-weight: bold;text-align: center;">ไม่สามารถนำเข้าได้</span>';
                                recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;"><i class="fas fa-times"></i></span>';
                            }

                        } else if (action_type == 'delete') {

                            if (val['record_status'] == 1) {
                                name_txt = val['name'];
                                status_txt = '<span style="color: green; font-weight: bold;text-align: center;">สามารถลบรายการได้</span>';
                                recordstatus_txt = '<span style="color: green;font-weight: bold;text-align: center;"><i class="fa fa-check"></i></span>';
                            } else {
                                name_txt = val['name'];
                                status_txt = '<span style="color: red; font-weight: bold;text-align: center;">ไม่สามารถลบรายการได้</span>';
                                recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;"><i class="fas fa-times"></i></span>';
                            }

                        }
                        //console.log("lifecyclereviewdate", val['lifecyclereviewdate']);

                        if (val['code'] == null) { var val_code = ''; } else { var val_code = val['code']; }
                        if (val['coderef'] == null) { var val_coderef = ''; } else { var val_coderef = val['coderef']; }
                        if (val['chrcode'] == null) { var val_chrcode = ''; } else { var val_chrcode = val['chrcode']; }
                        if (val['code_a'] == null) { var val_code_a = ''; } else { var val_code_a = val['code_a']; }
                        if (val['code_b'] == null) { var val_code_b = ''; } else { var val_code_b = val['code_b']; }
                        if (val['code_c'] == null) { var val_code_c = ''; } else { var val_code_c = val['code_c']; }
                        if (val['code_d'] == null) { var val_code_d = ''; } else { var val_code_d = val['code_d']; }
                        if (val['code_e'] == null) { var val_code_e = ''; } else { var val_code_e = val['code_e']; }
                        if (val['gzone'] == null) { var val_gzone = ''; } else { var val_gzone = val['gzone']; }
                        if (val['gbarcode'] == null) { var val_gbarcode = ''; } else { var val_gbarcode = val['gbarcode']; }
                        if (val['spcodes'] == null) { var val_spcodes = ''; } else { var val_spcodes = val['spcodes']; }
                        if (val['carmodel'] == null) { var val_carmodel = ''; } else { var val_carmodel = val['carmodel']; }
                        if (val['carfmyear'] == null) { var val_carfmyear = ''; } else { var val_carfmyear = val['carfmyear']; }
                        if (val['cartoyear'] == null) { var val_cartoyear = ''; } else { var val_cartoyear = val['cartoyear']; }
                        if (val['gmodel'] == null) { var val_gmodel = ''; } else { var val_gmodel = val['gmodel']; }
                        if (val['carbrand'] == null) { var val_carbrand = ''; } else { var val_carbrand = val['carbrand']; }
                        if (val['carGeneration'] == null) { var val_carGeneration = ''; } else { var val_carGeneration = val['carGeneration']; }
                        if (val['carEngine'] == null) { var val_carEngine = ''; } else { var val_carEngine = val['carEngine']; }
                        if (val['carBody'] == null) { var val_carBody = ''; } else { var val_carBody = val['carBody']; }
                        if (val['codeOem'] == null) { var val_codeOem = ''; } else { var val_codeOem = val['codeOem']; }
                        if (val['UOM'] == null) { var val_UOM = ''; } else { var val_UOM = val['UOM']; }
                        if (val['gdescript'] == null) { var val_gremark = ''; } else { var val_gremark = val['gdescript']; }
                        if (val['stmas_name_compare'] == null) { var val_stmas_name_compare = ''; } else { var val_stmas_name_compare = val['stmas_name_compare']; }
                        if (val['stmas_exp_name_compare'] == null) { var val_stmas_exp_name_compare = ''; } else { var val_stmas_exp_name_compare = val['stmas_exp_name_compare']; }
                        if (val['stmas_name'] == null) { var val_stmas_name = ''; } else { var val_stmas_name = val['stmas_name']; }
                        //if (val['cartoyear'] == null) { var val_cartoyear = ''; } else { var val_cartoyear = val['cartoyear']; }
                        //if (val['gdescript'] == null) { var val_gdescript = ''; } else { var val_gdescript = val['gdescript']; }
                        //if (val['stdmargin'] == null) { var val_stdmargin = ''; } else { var val_stdmargin = val['stdmargin']; }


                        $('#tbl-list-temp tbody').append('<tr>' +
                            '<td class="tx-center">' + i + '</td>' +
                            '<td class="tx-center">' + recordstatus_txt + '</td>' +
                            '<td class="tx-center style="width: 150px;"">' + status_txt + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + val_coderef + '</td>' +
                            //'<td class="tx-center" style="width: 150px;">' + val_stmas_name_compare + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + val_stmas_name + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + val_code + '</td>' +
                            '<td style="width: 150px;">' + name_txt + '</td>' +
                            '<td style="width: 150px;">' + val_stmas_exp_name_compare + '</td>' +
                            '<td style="width: 150px;">' + status_txt + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + val_chrcode + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + val_gbarcode + '</td>' +
                            '<td class="tx-center" style="width: 150px;">' + val_spcodes + '</td>' +
                            '<td class="tx-center">' + val_code_a + '</td>' +
                            '<td class="tx-center">' + val_code_b + '</td>' +
                            '<td class="tx-center">' + val_code_c + '</td>' +
                            '<td class="tx-center">' + val_code_d + '</td>' +
                            '<td class="tx-center">' + val_code_e + '</td>' +
                            '<td class="tx-center">' + val_gzone + '</td>' +
                            '<td class="tx-center">' + val_carmodel + '</td>' +
                            '<td class="tx-center">' + val_carfmyear + '</td>' +
                            '<td class="tx-center">' + val_cartoyear + '</td>' +
                            '<td class="tx-center">' + val_gmodel + '</td>' +
                            '<td class="tx-center">' + val_carbrand + '</td>' +
                            '<td class="tx-center">' + val_carGeneration + '</td>' +
                            '<td class="tx-center">' + val_carEngine + '</td>' +
                            '<td class="tx-center">' + val_carBody + '</td>' +
                            '<td class="tx-center">' + val_codeOem + '</td>' +
                            //'<td class="tx-center">' + val['serviceyear'] + '</td>' +
                            '<td class="tx-center">' + val_UOM + '</td>' +
                            '<td class="tx-center">' + val_gremark + '</td>' +
                            '</tr>');
                        i++
                    });
                }
            };


            $.fnupdatedata = function (template_id) {

                $.LoadingOverlay("show", {
                    image: '',
                    custom: customElement
                });

                fetch(url_import_data_update_data + '?temp_id=' + template_id + '&updated_by=' + name + '&updated_by2=' + full_name).then(function (response) {
                    return response.json();
                }).then(function (result) {

                    if (result.status === 'Error') {
                        $.LoadingOverlay("hide");
                        $.addLogEvent(template_id, 'VSM', 'create', '/master/stmas_exp_import', 'ERROR');
                        toastr.error(data.error_message);
                        $('.actions').hide();

                    } else {

                        $.addLogEvent(template_id, 'VSM', 'create', '/master/stmas_exp_import', 'OK');

                        $.LoadingOverlay("hide");
                        console.log("updated");
                        toastr.success('Updated data successfully');
                        setTimeout(function () {
                            Swal.fire(
                                'การเพิ่มรายการสินค้าสำเร็จ!',
                                //'Your file has been deleted.',
                                'success'
                            )
                            $('.actions').hide();

                            //setTimeout(function () {

                            //    location.reload();
                            //}, 3000);

                        }, 300);




                    }
                }).catch(error => {
                    $.LoadingOverlay("hide");
                    toastr.error('Error, Please contact administrator.');
                });

                //setTimeout(function () {
                //    $.LoadingOverlay("hide");
                //}, 2000);

            };


            $('#wizard1').steps({
                headerTag: 'h3',
                bodyTag: 'section',
                autoFocus: true,
                titleTemplate: '<span class="number">#index#<\/span> <span class="title">#title#<\/span>',
                onStepChanged: function () {
                    var chk_index = $('#wizard1').steps('getCurrentIndex');
                    console.log("onStepChanged:currentIndex", chk_index);

                    if (chk_index == 0 || chk_index == 1) { $.fntemptable(chk_index); }
                    if (chk_index == 2) {

                        Swal.fire({
                            title: 'คุณแน่ใจหรือไม่?',
                            text: "ที่จะทำการเพิ่มรายการสินค้า",
                            icon: 'warning',
                            showDenyButton: true,
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'ใช่ฉันแน่',
                            denyButtonText: `ยกเลิก`,
                        }).then((result) => {
                            if (result.isConfirmed) {

                                setTimeout(function () {

                                    $.fnupdatedata(temp_id);

                                }, 300);

                            } else if (result.isDenied) {

                                $.fntemptable(chk_index);
                            }
                        })


                        //$.fnupdatedata(temp_id);
                    }

                },
                onFinishing: function () {
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                }
            });


            $('#wizards').find('#btn_downloadtemplate').on('click', function (evt) {
                /* if (authorize == 'ITM-MIS-01' || authorize == 'ITM-PIT-01' || authorize == 'ITM-PIT-02' || authorize == 'ITM-PM-01' || authorize == 'ITM-PM-02' || authorize == 'ITM-PUR-01' || authorize == 'ITM-PUR-02' || authorize == 'ITM-PM-03') {*/

                location.href = template_url + 'Import_Data_StmasExp-UAT.xlsx';

                console.log("...downloadtemplate...");

                //} else {
                //    toastr.error("No Template for your permission.");
                //}
            });


            $('#customFile').on('change', function (evt) {

                evt.preventDefault();

                if ($(this).val() !== '') {

                    let i = 0;

                    $('#customFile').prop('disabled', true);

                    readXlsxFile(this.files[0], { dateFormat: 'YYYY/MM/DD_hh:mm:ss' }).then(async function (result) {

                        //console.log("Length: ", result.length);

                        if (result.length > 2) {

                            $.LoadingOverlay("show", {
                                image: '',
                                custom: customElement
                            });
                            $('.actions').show();
                            //count_length = result.length ;
                            count_length = result.length - 2;
                            //console.log("count_length", count_length);
                            console.log("result", result);

                            let add_data = {
                                'temp_id': temp_id,
                                'countitem_all': count_length,
                                'created_by': name,
                                'created_by2': full_name,
                            };

                            var params = [];
                            for (const i in add_data) {
                                params.push(i + "=" + encodeURIComponent(add_data[i]));
                            }

                            fetch(url_import_data_create, {
                                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                                //mode: 'no-cors', // no-cors, *cors, same-origin
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
                                    //alert('สำ')
                                    let count_row = 0;
                                    let count_index = 0;
                                    var citem_updateprice_tran_create = [];
                                    //console.log('temp_id', temp_id)
                                    $.each(result, function (key, val) {

                                        if (i > 1) {

                                            citem_updateprice_tran_create.push({

                                                //'coderef': val[0],
                                                //'stmas_name_compare': val[1],
                                                //'stmas_code_compare': val[2],
                                                //'stmas_exp_name_compare': val[3],
                                                //'code_a': val[4],
                                                //'code_a_compare': val[5],
                                                //'code_b': val[6],
                                                //'code_b_compare': val[7],
                                                //'code_c': val[8],
                                                //'code_c_compare': val[9],
                                                //'code_d': val[10],
                                                //'code_d_compare': val[11],
                                                //'code_e': val[12],
                                                //'code_e_compare': val[13],
                                                //'action_type': val[14],
                                                //'created_by': name,
                                                //'created_by2': full_name,
                                                //'temp_id': temp_id,

                                                'coderef': val[0],
                                                'stmas_name_compare': val[1],
                                                'stmas_exp_name_compare': val[2],
                                                'code_a_name': val[3],
                                                'code_e_name': val[4],
                                                'code_c_name': val[5],
                                                'code_b_name': val[6],
                                                'code_d_name': val[7],
                                                'gdescript': val[8],
                                                'action_type': val[9],
                                                'created_by': name,
                                                'created_by2': full_name,
                                                'temp_id': temp_id,
                                            });

                                        }

                                        i++

                                    });


                                    console.log("citem_updateprice_tran_create", citem_updateprice_tran_create)


                                    $.ajax({
                                        url: url_data_tran_create,
                                        type: 'POST',
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        data: JSON.stringify(citem_updateprice_tran_create),
                                        success: function (data) {

                                            console.log("citem_updateprice_tran_create", data);

                                            fetch(url_import_data_template_get + '?temp_id=' + temp_id + '&created_by=' + name + '&created_by2=' + full_name).then(function (response) {
                                                return response.json();
                                            }).then(function (result) {

                                                console.log("ItemMaster_ImportUpdateData_TemplateGet", result.data);

                                                temp_table = result.data;
                                                let i = 1;

                                                $.each(result.data, function (key, val) {
                                                    var code1 = "";
                                                    var code2 = "";
                                                    var code3 = "";
                                                    var code4 = "";
                                                    var code5 = "";
                                                    var code = "";
                                                    var recordstatus_txt = "";
                                                    var name_txt = "";
                                                    var status_txt = "";
                                                    var results = "";
                                                    var bg_row;

                                                    if (val['code'] == null) { var val_code = ''; } else { var val_code = val['code']; }
                                                    if (val['coderef'] == null) { var val_coderef = ''; } else { var val_coderef = val['coderef']; }
                                                    if (val['chrcode'] == null) { var val_chrcode = ''; } else { var val_chrcode = val['chrcode']; }
                                                    if (val['code_a'] == null) { var val_code_a = ''; } else { var val_code_a = val['code_a']; }
                                                    if (val['code_b'] == null) { var val_code_b = ''; } else { var val_code_b = val['code_b']; }
                                                    if (val['code_c'] == null) { var val_code_c = ''; } else { var val_code_c = val['code_c']; }
                                                    if (val['code_d'] == null) { var val_code_d = ''; } else { var val_code_d = val['code_d']; }
                                                    if (val['code_e'] == null) { var val_code_e = ''; } else { var val_code_e = val['code_e']; }
                                                    if (val['gzone'] == null) { var val_gzone = ''; } else { var val_gzone = val['gzone']; }
                                                    if (val['gbarcode'] == null) { var val_gbarcode = ''; } else { var val_gbarcode = val['gbarcode']; }
                                                    if (val['spcodes'] == null) { var val_spcodes = ''; } else { var val_spcodes = val['spcodes']; }
                                                    if (val['carmodel'] == null) { var val_carmodel = ''; } else { var val_carmodel = val['carmodel']; }
                                                    if (val['carfmyear'] == null) { var val_carfmyear = ''; } else { var val_carfmyear = val['carfmyear']; }
                                                    if (val['cartoyear'] == null) { var val_cartoyear = ''; } else { var val_cartoyear = val['cartoyear']; }
                                                    if (val['gmodel'] == null) { var val_gmodel = ''; } else { var val_gmodel = val['gmodel']; }
                                                    if (val['carbrand'] == null) { var val_carbrand = ''; } else { var val_carbrand = val['carbrand']; }
                                                    if (val['carGeneration'] == null) { var val_carGeneration = ''; } else { var val_carGeneration = val['carGeneration']; }
                                                    if (val['carEngine'] == null) { var val_carEngine = ''; } else { var val_carEngine = val['carEngine']; }
                                                    if (val['carBody'] == null) { var val_carBody = ''; } else { var val_carBody = val['carBody']; }
                                                    if (val['codeOem'] == null) { var val_codeOem = ''; } else { var val_codeOem = val['codeOem']; }
                                                    if (val['UOM'] == null) { var val_UOM = ''; } else { var val_UOM = val['UOM']; }
                                                    if (val['gdescript'] == null) { var val_gremark = ''; } else { var val_gremark = val['gdescript']; }
                                                    //if (val['cartoyear'] == null) { var val_cartoyear = ''; } else { var val_cartoyear = val['cartoyear']; }
                                                    //if (val['gdescript'] == null) { var val_gdescript = ''; } else { var val_gdescript = val['gdescript']; }
                                                    //if (val['stdmargin'] == null) { var val_stdmargin = ''; } else { var val_stdmargin = val['stdmargin']; }
                                                    if (val['stmas_name_compare'] == null) { var val_stmas_name_compare = ''; } else { var val_stmas_name_compare = val['stmas_name_compare']; }
                                                    if (val['stmas_exp_name_compare'] == null) { var val_stmas_exp_name_compare = ''; } else { var val_stmas_exp_name_compare = val['stmas_exp_name_compare']; }
                                                    if (val['stmas_code_compare'] == null) { var val_stmas_code_compare = ''; } else { var val_stmas_code_compare = val['stmas_code_compare']; }
                                                    if (val['stmas_name'] == null) { var val_stmas_name = ''; } else { var val_stmas_name = val['stmas_name']; }
                                                    if (val['action_type'] == null) { var action_type = ''; } else { var action_type = val['action_type']; }
                                                    var status = val['record_status'];
                                                    //var coderef_raw = val_coderef.trim()
                                                    //var code1_raw = coderef_raw.substring(1, 6);
                                                    //var code2_raw = coderef_raw.substring(7, 11);
                                                    //var code3_raw = coderef_raw.substring(12, 16);
                                                    //var code4_raw = coderef_raw.substring(17, 20);

                                                    //console.log('coderef_raw',coderef_raw)
                                                    //console.log('code1_raw', code1_raw)
                                                    //console.log('code2_raw', code2_raw)
                                                    //console.log('code3_raw', code3_raw)
                                                    //console.log('code4_raw', code4_raw)

                                                    if (val_code.trim().length != 25) {
                                                        Swal.fire(
                                                            'มีรหัสสินค้าพ่วงไม่ครบ',
                                                            'ระบบไม่สามารถทำงานต่อได้ กรุณาตรวจสอบข้อมูล',
                                                            'warning'
                                                        )
                                                        $('.actions').hide();
                                                        $('.chk_code').show();
                                                        code = '<span style="color: red;font-weight: bold;text-align: center;">' + code + '</span>';
                                                    }


                                                    if (action_type == 'create') {

                                                        code1 = val_code_a.trim().length !== 6 || val['record_status'] == 6 || val['record_status'] == 11 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_a + '</span>' : val_code_a
                                                        code2 = val_code_b.trim().length !== 4 || val['record_status'] == 7 || val['record_status'] == 12 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_b + '</span>' : val_code_b
                                                        code3 = val_code_c.trim().length !== 4 || val['record_status'] == 8 || val['record_status'] == 13 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_c + '</span>' : val_code_c
                                                        code4 = val_code_d.trim().length !== 3 || val['record_status'] == 9 || val['record_status'] == 14 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_d + '</span>' : val_code_d
                                                        code5 = val_code_e.trim().length !== 4 || val['record_status'] == 15/*|| val['record_status'] == 3 */ ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_e + '</span>' : val_code_e

                                                        code = code1 + '-' + code2 + '-' + code3 + '-' + code4 + '-' + code5

                                                        if (val['record_status'] == 0) {
                                                            name_txt = val['name'];
                                                            recordstatus_txt = '<span style="color:red ;font-weight: bold;text-align: center;">ERROR</span>';
                                                            status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">รหัสสินค้าไม่ครบ 25 ตัว</span>';

                                                        } else if (val['record_status'] == 1) {
                                                            name_txt = val['name'];
                                                            recordstatus_txt = '<span style="color: green;font-weight: bold;text-align: center;">OK</span>';
                                                            status_txt = '<span style="color: green; font-weight: bold;text-align: center;">สามารถนำเข้าได้</span>';

                                                        } else if (val['record_status'] == 2) {
                                                            name_txt = val['name'];
                                                            recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                                                            status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">มีรหัสซ้ำใน excel</span>';

                                                        } else if (val['record_status'] == 6 || val['record_status'] == 7 || val['record_status'] == 8 || val['record_status'] == 9) {
                                                            name_txt = val['name'];
                                                            recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;">ERROR</span>';
                                                            status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">รหัสสินค้าไม่ตรง</span>';

                                                        } else if (val['record_status'] == 4) {
                                                            name_txt = '<span style="color: red;font-weight: bold;text-align: center;">' + val['name']; + '</span>';
                                                            recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                                                            status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">ชื่อสินค้าซ้ำ</span>';

                                                        } else if (val['record_status'] == 5) {
                                                            name_txt = val['name'];
                                                            code = '<span style="color: red;font-weight: bold;text-align: center;">' + code1 + '-' + code2 + '-' + code3 + '-' + code4 + '-' + code5 + '</span>';
                                                            recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                                                            status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">รหัสสินค้าซ้ำ</span>';

                                                        } else if (val['record_status'] == 11 || val['record_status'] == 12 || val['record_status'] == 13 || val['record_status'] == 14 || val['record_status'] == 15) {
                                                            name_txt = val['name'];
                                                            recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;">ERROR</span>';
                                                            status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">ไม่พบข้อมูลรหัสสินค้า</span>';

                                                        } else if (val['record_status'] == 3) {
                                                            val_stmas_name = '<span style="color: #414241 ;font-weight: bold;text-align: center;">ไม่พบข้อมูล</span>';
                                                            recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;">ERROR</span>';
                                                            status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">ไม่พบข้อมูลสินค้าหลัก</span>';
                                                            val_coderef = '<span style="color: red;font-weight: bold;text-align: center;">' + val_coderef + '</span>';
                                                        }

                                                        if (val['name'].trim() == val_stmas_exp_name_compare) {
                                                            results = '<span style="color: green;font-weight: bold;text-align: center;">ชื่อสินค้าตรงกัน</span>';
                                                        } else {
                                                            results = '<span style="color: red;font-weight: bold;text-align: center;">ชื่อสินค้าไม่ตรงกัน</span>';
                                                            val_stmas_exp_name_compare = '<span style="color: red;font-weight: bold;text-align: center;">' + val_stmas_exp_name_compare + '</span>';
                                                        }

                                                        if (val_code.trim().length != 25) {
                                                            //Swal.fire(
                                                            //    'มีรหัสสินค้าพ่วงไม่ครบ',
                                                            //    'ระบบไม่สามารถทำงานต่อได้ กรุณาตรวจสอบข้อมูล',
                                                            //    'warning'
                                                            //)
                                                            //$('.actions').hide();
                                                            //$('.chk_code').show();
                                                            code = '<span style="color: red;font-weight: bold;text-align: center;">' + code + '</span>';
                                                        }

                                                        if (status == 1) {
                                                            bg_row = '#66FF99';
                                                        } else if (status == 0 || status == 3 || status == 6 || status == 7 || status == 8 || status == 9 || status == 11 || status == 12 || status == 13 || status == 14 || status == 15) {
                                                            bg_row = '#FFC0CB';
                                                        } else if (status == 2 || status == 4 || status == 5) {
                                                            bg_row = '#FFFFCC';
                                                        }

                                                    } else if (action_type == 'delete') {

                                                        code1 = val_code_a.trim().length !== 6 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_a + '</span>' : val_code_a
                                                        code2 = val_code_b.trim().length !== 4 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_b + '</span>' : val_code_b
                                                        code3 = val_code_c.trim().length !== 4 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_c + '</span>' : val_code_c
                                                        code4 = val_code_d.trim().length !== 3 ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_d + '</span>' : val_code_d
                                                        code5 = val_code_e.trim().length !== 4 /*|| val['record_status'] == 3 */ ? '<span style="color:red ;font-weight: bold;text-align: center;">' + val_code_e + '</span>' : val_code_e

                                                        //var code = "";

                                                        code = code1 + '-' + code2 + '-' + code3 + '-' + code4 + '-' + code5

                                                        if (val['record_status'] == 0 || val['record_status'] == 3) {
                                                            name_txt = val['name'];
                                                            recordstatus_txt = '<span style="color:red ;font-weight: bold;text-align: center;">ERROR</span>';
                                                            status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">ไม่พบรายการสินค้า</span>';
                                                        } else if (val['record_status'] == 1) {
                                                            name_txt = val['name'];
                                                            recordstatus_txt = '<span style="color: green;font-weight: bold;text-align: center;">OK</span>';
                                                            status_txt = '<span style="color: green; font-weight: bold;text-align: center;">สามารถลบได้</span>';
                                                        } else if (val['record_status'] == 2) {
                                                            name_txt = val['name'];
                                                            recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                                                            status_txt = '<span style="color: #414241 ;font-weight: bold;text-align: center;">มีรหัสซ้ำใน excel</span>';
                                                        }

                                                        if (val_code.trim().length != 25) {
                                                            code = '<span style="color: red;font-weight: bold;text-align: center;">' + code + '</span>';
                                                        }

                                                        if (status == 1) {
                                                            bg_row = '#66FF99';
                                                        } else if (status !== 1 || status !== 2) {
                                                            bg_row = '#FFC0CB';
                                                        } else if (status == 2) {
                                                            bg_row = '#FFFFCC';
                                                        }

                                                    }


                                                    $('#tbl-list-temp tbody').append('<tr style="background-color: ' + bg_row + ';">' +
                                                        '<td class="tx-center">' + i + '</td>' +
                                                        '<td class="tx-center">' + recordstatus_txt + '</td>' +
                                                        '<td class="tx-center style="width: 150px;"">' + status_txt + '</td>' +
                                                        '<td class="tx-center" style="width: 150px;">' + val_coderef + '</td>' +
                                                        '<td class="tx-center" style="width: 150px;">' + val_stmas_name + '</td>' +
                                                        //'<td class="tx-center" style="width: 150px;">' + val_stmas_name_compare + '</td>' +
                                                        '<td class="tx-center" style="width: 150px;">' + code + '</td>' +
                                                        '<td style="width: 150px;">' + name_txt + '</td>' +
                                                        '<td style="width: 150px;">' + val_stmas_exp_name_compare + '</td>' +
                                                        '<td style="width: 150px;">' + results + '</td>' +
                                                        '<td class="tx-center" style="width: 150px;">' + val_chrcode + '</td>' +
                                                        '<td class="tx-center" style="width: 150px;">' + val_gbarcode + '</td>' +
                                                        '<td class="tx-center" style="width: 150px;">' + val_spcodes + '</td>' +
                                                        '<td class="tx-center">' + val_code_a + '</td>' +
                                                        '<td class="tx-center">' + val_code_b + '</td>' +
                                                        '<td class="tx-center">' + val_code_c + '</td>' +
                                                        '<td class="tx-center">' + val_code_d + '</td>' +
                                                        '<td class="tx-center">' + val_code_e + '</td>' +
                                                        '<td class="tx-center">' + val_gzone + '</td>' +
                                                        '<td class="tx-center">' + val_carmodel + '</td>' +
                                                        '<td class="tx-center">' + val_carfmyear + '</td>' +
                                                        '<td class="tx-center">' + val_cartoyear + '</td>' +
                                                        '<td class="tx-center">' + val_gmodel + '</td>' +
                                                        '<td class="tx-center">' + val_carbrand + '</td>' +
                                                        '<td class="tx-center">' + val_carGeneration + '</td>' +
                                                        '<td class="tx-center">' + val_carEngine + '</td>' +
                                                        '<td class="tx-center">' + val_carBody + '</td>' +
                                                        '<td class="tx-center">' + val_codeOem + '</td>' +
                                                        //'<td class="tx-center">' + val['serviceyear'] + '</td>' +
                                                        '<td class="tx-center">' + val_UOM + '</td>' +
                                                        '<td class="tx-center">' + val_gremark + '</td>' +
                                                        '</tr>');
                                                    i++
                                                });

                                                //$('#tbl-list-temp').DataTable({
                                                //    paging: false,
                                                //    dom: 'Brti',
                                                //    buttons: [
                                                //        'copyHtml5',
                                                //        {
                                                //            extend: 'excelHtml5',
                                                //            title: '',
                                                //            filename: 'Export_UpdateDataTemplate_' + authorize,
                                                //            exportOptions: {
                                                //                columns: [0, 1, 2, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 39, 40, 41, 42, 9, 10,]
                                                //            }
                                                //        },
                                                //    ],
                                                //});


                                                fetch(url_import_data_update + '?temp_id=' + temp_id + '&updated_by=' + name + '&updated_by2=' + full_name).then(function (response) {
                                                    return response.json();
                                                }).then(function (result) {

                                                    $.each(result.data, function (key, val) {

                                                        $("#wizards").find("#countitem_all").html(val['countitem_all']);
                                                        $("#wizards").find("#countitem_incomplete").html(val['countitem_incomplete']);
                                                        $("#wizards").find("#countitem_complete").html(val['countitem_complete']);
                                                        $("#wizards").find("#countitem_problem").html(val['countitem_incomplete']);

                                                        console.log("success");
                                                        $.LoadingOverlay("hide");

                                                    });

                                                });

                                            });
                                            $('.btn_error_stmas_exp').show();
                                            $('#wizards').find('.btn_error_stmas_exp').on('click', function (evt) {
                                                /* if (authorize == 'ITM-MIS-01' || authorize == 'ITM-PIT-01' || authorize == 'ITM-PIT-02' || authorize == 'ITM-PM-01' || authorize == 'ITM-PM-02' || authorize == 'ITM-PUR-01' || authorize == 'ITM-PUR-02' || authorize == 'ITM-PM-03') {*/

                                                location.href = 'http://192.168.1.159/ReportServer/Pages/ReportViewer.aspx?%2fReport-Template-Stmas-Exp%2fError-Stmas-Exp&rs:Command=Render&temp_id=' + temp_id + '&rs:Format=excel';
                                                temp_id
                                                console.log("...downloadtemplate_error...");

                                                //} else {
                                                //    toastr.error("No Template for your permission.");
                                                //}
                                            });

                                        }
                                    });

                                }

                            });

                        } else {
                            toastr.error('Data not found. Please make sure your data start at row 3');
                        }

                    }).catch(error => {
                        $.LoadingOverlay("hide");
                        toastr.error('Error writing document');
                        //console.error("Error writing document: ", error);
                    });

                }

                $.LoadingOverlay("hide");

            });


        };


        $(document).ready(async function () {

            await $.init();
            $('.actions').hide();
            $.addLogEvent('', 'VSM', 'visit', '/master/stmas_exp_import', 'OK');

        });



    } else {

        window.location.assign('./login');

    }

});