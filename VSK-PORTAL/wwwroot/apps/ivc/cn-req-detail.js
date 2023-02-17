'use strict';

let fs = firebase.firestore();
const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const user_id = objProfile[0]['username'];

let collection = 'mrp_opt_purchaseplan';
let oTable, history_Table, history_status_Table, history_assige_Table, history_drive_Table, history_remark_Table, history_condition_Table, role_code, mode;
let inventorycode_dataset = [];
let invfrecode_dataset = [];

const url_api = "http://192.168.1.247/intranet/pur-api";
const url_api_uat = "http://localhost:49708";

//let export_cn_job = 'http://192.168.1.247/intranet/report/cn-rpt/Pages/RPT_CN/RPT_CN_JOB';
const lists_get = url_api_uat + '/api/Cn_Req_Job_Search_Get';
const api_soureupdate = url_api_uat + '/api/Cn_Req_Source_Update';
const api_assigeupdate = url_api_uat + '/api/Cn_Req_Assige_Update';
const api_driverupdate = url_api_uat + '/api/Cn_Req_Driver_Update';
const api_conditionupdate = url_api_uat + '/api/Cn_Req_Condition_Update';
const api_lists_history_souce = url_api_uat + '/api/Cn_Req_Source_Get';
const api_lists_history_status = url_api_uat + '/api/Cn_Req_Status_Get';
const api_lists_history_driver = url_api_uat + '/api/Cn_Req_Driver_Get';
const api_lists_history_condition = url_api_uat + '/api/Cn_Req_Condition_Get';
const api_lists_history_assige = url_api_uat + '/api/Cn_Req_Assige_Get';
const api_lists_history_remark = url_api_uat + '/api/Cn_Req_Remark_Get';

const url_cn_req_cause_get = url_api_uat + '/api/Cn_Req_Cause_Master_Get';
const url_cn_req_assige_get = url_api_uat + '/api/Cn_Req_Assige_Master_Get';
const url_cn_req_source_get = url_api_uat + '/api/Cn_Req_Source_Master_Get';
const url_cn_req_status_get = url_api_uat + '/api/Cn_Req_Status_Master_Get';

const api_status = url_api_uat + '/api/Cn_Req_Status_Update';

const api_key = "cOaI7TF@3am9Gc?89hqC(18)h{{G$dsaVt0$FnxpCf0vO%I2{Fp8?Y7rBcRqNNzv";
const url_employee_movemax_get = "https://vsk.movemax.me/public-api/tms/v1/employee";
const export_invoice = 'http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fRPT-CN-REQ%2fReportCnReqReinvoice&rs:Format=PDF';


let validator, table, options, item_action, item_id, deatailCondition;

let job_comment_dataSet = [], job_source_dataSet = [], job_status_dataSet = [];
let job_comment_dataSet_list = [], job_assige_dataSet_list = [], job_source_dataSet_list = [], job_status_dataSet_list = [];
let Master_dataSet = [];
let arraydriver = [];

let toDate = new Date();

var DriverMessengerList = [];

$.init = async function () {

    role_code = objProfile[0]['role'];

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
    $('#cn_date').val(moment().format('DD/MM/YYYY') + '-' + moment().format('DD/MM/YYYY'))

    await $.Load_cause();
    await $.Load_assige();
    await $.Load_source();
    await $.Driver_Get();
    await $.Load_status();
    await $.List();

    $('#frm_search').submit(async function (e) {

        e.preventDefault();

        $("#global-loader").fadeIn("slow");

        oTable.destroy();


        $.List();

    });

    $('#modal-frm_history').on('hidden.bs.modal', function () {

        history_Table.destroy();
        history_assige_Table.destroy();
        history_drive_Table.destroy();
        history_condition_Table.destroy();
        history_status_Table.destroy();

    });

};

$.List = async function () {

    let url = new URL(lists_get);
    var CNdate_start = $('#cn_date').val() != '' ? moment($('#cn_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment().format('YYYY-MM-DD') + ' 00:00';  //ถ้าไม่เลือกจะเป็นค่าว่าง
    var CNdate_end = $('#cn_date').val() != '' ? moment($('#cn_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';

    url.search = new URLSearchParams({
        cn_req_job_startdate: CNdate_start,
        cn_req_job_enddate: CNdate_end,
        cn_req_job_jobno: $('#cn_pre_job_jobno_search').val(),
        number: $('#invbook').val(),
        //invpo:
        //empcod:
        //empname:
        gbarcode: $('#barcode').val(),
        //PKuser:
        cn_req_job_cause: $('#cn_comment').val(),
        cn_req_job_lastassige: $('#cn_pre_job_assige_search').val(),
        created_by: $('#created_by_search').val(),
        record_status: $('#job_status_search').val(),
        // saleperson:
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {
        //oTable.destroy();
        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }, function (isConfirmed) {
                if (isConfirmed) {

                    location.reload();

                }
            })


        } else {
            oTable = $('#tbl-list').DataTable({
                data: result.data,
                scrollX: true,
                "pageLength": 100,
                scrollCollapse: true,
                //autoWidth: true,
                //paging: true,
                scrollY: "410px",
                scrollCollapse: true,
                paging: false,
                dom: 'lfrtlip',
                //dom: 'Bfrtlip',//'Bfrltip', //dom: 'Bfrtip',
                //"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                deferRender: true,
                ordering: true,
                //pageLength: 10,
                bDestroy: true,
                // autoWidth: false,
                columns: [
                    {
                        title: "<span style='font-size:11px;'>เลขที่อ้างอิง</span>",
                        data: "cn_req_job_jobno",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //0

                    {
                        title: "<span style='font-size:11px;'>วันที่/เวลา</span>",
                        data: "created_date",
                        width: "100px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '  ' + moment(data).format('hh:mm:ss') + '<span/>';
                        }
                    }, //1

                    {
                        title: "<span style='font-size:11px;'>CN No.</span>",
                        data: "",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + '' + '</span>';
                        }
                    }, //2


                    {
                        title: "<span style='font-size:11px;'>เวลา</span>",
                        data: "created_date",
                        class: "tx-center",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format('hh:mm:ss') + '<span/>';
                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>สถานะ</span>",
                        data: "cn_req_job_status",
                        class: "tx-center job_status",
                        width: "50px",
                        render: function (data, type, row, meta) {
                            if (row.record_status == '1') {
                                return '<span style="color:red; font-size:11px;">Open</span>';
                            } else if (row.record_status == '2') {
                                return '<span style="color:orange; font-size:11px;">On Process</span>';
                            } else if (row.record_status == '3') {
                                return '<span style="color:green; font-size:11px;">Receive</span>';
                            } else if (row.record_status == '4') {
                                return '<span style="color:green; font-size:11px;">Complete</span>';
                            } else if (row.record_status == '5') {
                                return '<span style="color:red; font-size:11px;">Rejected</span>';
                            } else if (row.record_status == "0") {
                                return '<span style="color:#FFC300; font-size:11px;">Cancel</span>';
                            } else {
                                return '<span style="color:#000; font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>ผู้รับผิดชอบ</span>",
                        data: "cn_req_job_lastassige",
                        class: "tx-center assige",
                        width: "70px",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //5
                    {
                        title: "<span class='tx-center' style='font-size:11px;'>ข้อมูลลูกค้า</span>",
                        data: "empname",
                        width: "200px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + row.empcod + ': ' + data + '</span>';
                        }
                    }, //7
                    {
                        title: "<span style='font-size:11px;'>เลขที่ใบเสร็จ</span>",
                        data: "number",
                        class: "tx-center",
                        width: "100px",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-uppercase" style="font-size:11px;">' + data + '</span>';
                        }
                    }, //8
                    {
                        title: "<span class='tx-center' style='font-size:11px;'>ข้อมูลสินค้า</span>",
                        data: "stkname",
                        class: "tx-left",
                        width: "400px",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + row.gbarcode + " :" + data + "(" + row.spcodes + ")" + '</span>';
                        }
                    }, //11
                    {
                        title: "<span style='font-size:11px;'>Qty.</span>",
                        data: "cn_req_job_qty",
                        width: "60px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //12
                    {
                        title: "<span style='font-size:11px;'>การรับแจ้ง</span>",
                        data: "cn_req_job_source",
                        class: "tx-center job_type",
                        width: "80px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return data == '1' ? '<span class="badge badge-info">รับคืน</span>' : data == '2' ? '<span class="badge badge-success">หน้างาน</span>' : '-';
                        }
                    }, //13
                    {
                        title: "<span style='font-size:11px;'>บันทึกโดย</span>",
                        data: "created_by",
                        class: "tx-center",
                        width: "100px",
                        // visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //14
                    {
                        title: "<span style='font-size:11px;'>สาเหตุ</span>",
                        data: "cn_req_job_cause",
                        class: "tx-center",
                        width: "250px",
                        render: function (data, type, row, meta) {
                            let job_comment_obj = job_comment_dataSet.find(obj => obj.id === data);
                            return '<span style="font-size:11px;">' + job_comment_obj.text + '</span>';
                        }

                    }, //15
                    {
                        title: "<span style='font-size:11px;'>สภาพสินค้า</span>",
                        data: "cn_req_job_last_item_condition",
                        class: "tx-center item_status",
                        width: "70px",
                        render: function (data, type, row, meta) {
                            if (data == '1') {
                                return '<span style="font-size:11px;">สมบูรณ์</span>';
                            } else if (data == '2') {
                                return '<span style="font-size:11px;">ไม่สมบูรณ์</span>';
                            } else {
                                return '<span style="font-size:11px;"></span>';
                            }
                        }
                    }, //17
                ],


                "order": [[1, "desc"]],
                "initComplete": function (settings, json) {

                    $("#global-loader").fadeOut("slow");


                    $('#tbl-list tbody tr').hover(function () {
                        $(this).css('cursor', 'pointer');
                    });

                    $.contextMenu({
                        selector: '#tbl-list tbody tr',
                        callback: async function (key, options) {

                            let data = oTable.row(this).data();

                            let citem = {
                                cn_req_job_id: data['cn_req_job_id'],
                                cn_req_job_jobno: data['cn_req_job_jobno'],
                                cn_req_job_date: data['cn_req_job_date'],
                                trndate: data['trndate'],
                                number: data['number'],
                                invpo: data['invpo'],
                                empcod: data['empcod'],
                                empname: data['empname'],
                                stkcod: data['stkcod'],
                                gbarcode: data['gbarcode'],
                                spcodes: data['spcodes'],
                                stkname: data['stkname'],
                                item: data['item'],
                                stkunit: data['stkunit'],
                                whdiscode: data['whdiscode'],
                                userid: data['userid'],
                                salegroup_uptodate: data['salegroup_uptodate'],
                                named: data['named'],
                                customerGrade: data['customerGrade'],
                                saleperson: data['saleperson'],
                                cn_req_job_qty: data['cn_req_job_qty'],
                                cn_req_job_cause: data['cn_req_job_cause'],
                                cn_req_job_lastassige: data['cn_req_job_lastassige'],
                                cn_req_job_source: data['cn_req_job_source'],
                                cn_req_job_note: data['cn_req_job_note'],
                                cn_req_job_last_item_condition: data['cn_req_job_last_item_condition'],
                                cn_req_job_lastdriver: data['cn_req_job_lastdriver'],
                                created_by: data['created_by'],
                                created_date: data['created_date'],
                                updated_by: data['updated_by'],
                                updated_date: data['updated_date'],
                                record_status: data['record_status'],
                                cn_req_job_status: data['cn_req_job_status'],

                            };

                            let cn_jobno = data['cn_req_job_jobno'];
                            let salefile_number = data['number'];
                            let gbarcode = data['gbarcode'];
                            let empcod = data['empcod'];

                            $('#modal-frm_data').modal({

                                keyboard: false,
                                backdrop: 'static'

                            });


                            if (key === 'view') {


                                $.Details(citem);
                                $('.hide_job_status').addClass('d-none');


                            } else if (key === 'edit1') {

                                await $.Details(citem);
                                await $.Souce_Update(citem);

                            } else if (key === 'edit2') {

                                await $.Details(citem);
                                await $.Status_Update(citem);

                            } else if (key === 'edit3') {

                                await $.Details(citem);
                                await $.Assige_Update(citem);

                            } else if (key === 'edit4') {

                                await $.Details(citem);
                                await $.Driver_Update(citem);


                            } else if (key === 'edit5') {

                                await $.Details(citem);
                                await $.Condition_Update(citem);

                            }
                            else if (key === 'history') {

                                await $.History(citem);
                            }
                            else if (key === 'invoice') {

                                $.Invoice(cn_jobno);

                            }
                            else if (key === 'cancel1') {

                                $.Cancel(citem, 'Cancel - บันทึกผิด');

                            }
                            else if (key === 'cancel2') {

                                $.Cancel(citem, 'Cancel - เปลี่ยนการรับแจ้ง');

                            }
                            else if (key === 'cancel3') {

                                $.Cancel(citem, 'Cancel - เปลี่ยนแปลงสาเหตุ');

                            }
                            else if (key === 'cancel4') {

                                $.Cancel(citem, 'Cancel - ยกเลิกรับคืน');

                            }
                            else if (key === 'reject1') {

                                $.Reject(citem, 'Reject - ยกเลิกสินค้า');

                            }

                            else {

                                alert('ERROR');

                            }

                        },

                        items: {
                            "view": { name: "View", icon: "fas fa-search" },
                            "sep1": "---------",
                            "edit1": { name: "Update - เปลี่ยนแปลง 'การรับแจ้ง'", icon: "edit change-status", },
                            "edit2": { name: "Update - เปลี่ยนแปลง 'สถานะ'", icon: "edit change-status", },
                            "edit3": { name: "Update - เปลี่ยนแปลง 'ผู้รับผิดชอบ'", icon: "edit change-status", },
                            "edit4": { name: "Update - เปลี่ยนแปลง 'คนขับรถ'", icon: "edit change-status", },
                            "edit5": { name: "Update - เปลี่ยนแปลง 'สภาพสินค้า'", icon: "edit change-status", },
                            "sep2": "---------",
                            "history": { name: "History - ประวัติรายการ", icon: "fas fa-history" },
                            "invoice": { name: "Invoice - สั่งพิมพ์ใบงาน", icon: "fas fa-copy" },
                            //"sep2": "---------",
                            //"cancel1": { name: "Cancel - บันทึกผิด", icon: "delete", disabled: true },
                            //"cancel2": { name: "Cancel - เปลี่ยนการรับแจ้ง", icon: "delete", disabled: true },
                            //"cancel3": { name: "Cancel - เปลี่ยนแปลงสาเหตุ", icon: "delete", disabled: true },
                            //"cancel4": { name: "Cancel - ยกเลิกรับคืน", icon: "delete", disabled: true },
                            //"sep3": "---------",
                            //"reject1": { name: "Reject - ยกเลิกสินค้า", icon: "delete reject-status", disabled: true },
                            // "delete": { name: "Delete", icon: "delete" },
                            // "sep1": "---------",
                            // "create": { name: "New Item", icon: "add" }
                        }

                    });


                    $("tbody").contextmenu(function (key) {
                        setTimeout(function () {
                            let Status_text = $('.context-menu-active .job_status span').html();
                            let type_text = $('.context-menu-active .job_type span').html();
                            let assige = $('.context-menu-active .assige span').html();
                            let item_status = $('.context-menu-active .item_status span').html();
                            //console.log("Status_text is ", Status_text);
                            //console.log("type_text is ", type_text);
                            //console.log("assige is ", assige);
                            //console.log("item_status is ", item_status);

                            if ((assige == "IVC" && role_code == "เจ้าหน้าที่ (IVC)" && Status_text == "Open") || (assige == "TRP" && role_code == "ผู้ใช้งานทั่วไป (IVC)" && Status_text == "Open") || (role_code == "IVC" && Status_text == "On Process") || (assige == "TRP" && Status_text == "On Process") || (role_code == "IVC" && Status_text == "Receive")) {// kung edit 25/11/20
                                $('.context-menu-icon-edit').removeClass('context-menu-disabled');

                            } else {
                                $('.context-menu-icon-edit').addClass('context-menu-disabled');

                                if (assige == "TRP" && Status_text == "Open" && role_code == "IVC" && role_code == "CN-ADMIN") {
                                    $('.context-menu-icon-edit').removeClass('context-menu-disabled');
                                }

                            }

                            if (role_code == "IVC") {
                                $('.context-menu-icon-edit').removeClass('context-menu-disabled');
                            }

                            if (role_code == "CN-ADMIN") {

                                $('.context-menu-icon-delete').removeClass('context-menu-disabled');

                                $('.change-status').removeClass('context-menu-disabled');


                            } else {

                                $('.context-menu-icon-delete').addClass('context-menu-disabled');

                                $('.change-status').addClass('context-menu-disabled');

                            }

                            if (name === 'ongkarn.s' || name === 'kritsana.j' || name === 'potjana.s' || name === 'praya.v' || name === 'preeyanuch.w' || name === 'prasaneeyaporn.m' || name === 'patsaraporn.s' || name === 'sayamon.s') {

                                $('#frm_data').find('#job_comment').prop('disabled', false)
                                $('#frm_data').find('#cn_qty').prop('disabled', false)
                                $('.context-menu-icon-delete').removeClass('context-menu-disabled');
                                $('.context-menu-icon-edit').removeClass('context-menu-disabled');
                                $('.change-status').removeClass('context-menu-disabled');
                                $('.reject-status').removeClass('context-menu-disabled');

                            }

                        }, 200);
                    });

                },
            });

        }
    })

    $("#frm_search #reset").on('click', function (event) {

        $("#frm_search select").val('').trigger('change');
        $("#frm_search input:not(#cn_date)").val('');
        event.preventDefault();

    });

};

$.Driver_Get = async function () {
    DriverMessengerList = await $.MM_Employee_Get("" /*code*/, "" /*positionName*/, "" /*groupName*/);

    let driver = DriverMessengerList.data
    let newDriver = []

    $.each(driver, function (index, value) {
        //    alert(index + ": " + value);
        let tel = $.type(value['tel']) === "undefined" ? '' : value['tel'] === "" ? '' : value['tel'] + " : ";

        newDriver.push({
            id: value['code'],
            text: value['code'] + " : " + tel + value['firstnameTh'] + " " + value['lastnameTh'],
            code: value['code'],
            tel: value['tel'],
            name: value['firstnameTh'] + " " + value['lastnameTh']
        });
    });


    $('#frm_data').find('#driver_id').select2({
        width: '100%',
        height: '40px',
        data: newDriver,
        templateResult: function (data) {
            return data.text;
        },
        sorter: function (data) {
            return data.sort(function (a, b) {
                return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
            });
        },
        processResults: function (data, search) {
            return {
                results: $.map(data.data, function (item) {
                    return {
                        text: item.text,
                        id: item.id,
                        code: item.code,
                        tel: item.tel,
                        name: item.name
                    }
                })
            };
        },
    });

    $('#driver_id').on('select2:select', function (e) {
        var data = e.params.data;

        arraydriver.push({
            cn_req_job_driver_code: data.code,
            cn_req_job_driver_name: data.name,
            cn_req_job_driver_tel: data.tel,
        });

    });

}

$.Details = async function (citem) {

    $('#frm_data').find('input, select').prop("disabled", true);
    $('.hide_job_status').addClass('d-none');

    if (citem['record_status'] == "1") {
        $('#frm_data').find('#job_status').css('color', 'red');
    } else if (citem['record_status'] == "2") {
        $('#frm_data').find('#job_status').css('color', 'orange');
    } else if (citem['record_status'] == "3") {
        $('#frm_data').find('#job_status').css('color', 'green');
    } else if (citem['record_status'] == "4") {
        $('#frm_data').find('#job_status').css('color', 'green');
    } else if (citem['record_status'] == "5") {
        $('#frm_data').find('#job_status').css('color', 'red');
    } else if (citem['record_status'] == "0") {
        $('#frm_data').find('#job_status').css('color', '#FFC300');
    }

    let last_driver = jQuery.parseJSON(citem['cn_req_job_lastdriver']);

    setTimeout(() => {
        $('#frm_data').find('#driver_id').val(last_driver[0]['cn_req_job_driver_code']).trigger('change');
        $('#frm_data').find('#item_condition').val(citem['cn_req_job_last_item_condition']).trigger('change');
    }, "1000")

    $('#frm_data').find('#cn_datetime').val(moment(citem['created_date'], 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss')).prop("disabled", true);
    $('#frm_data').find('#job_status').val(citem['cn_req_job_status']).prop("disabled", true);
    $('#frm_data').find('#job_status_edit').val(citem['record_status']).trigger('change').prop("disabled", true);
    $('#frm_data').find('#job_assige').val(citem['cn_req_job_lastassige']).trigger('change').prop("disabled", true);
    $('#frm_data').find('#salefile_number').val(citem['number']).prop("disabled", true);
    $('#frm_data').find('#saletra_item_name').val(citem['stkname']).prop("disabled", true);
    $('#frm_data').find('#cn_qty').val(citem['cn_req_job_qty']).prop("disabled", true);
    //$('#frm_data').find('#source_site_code').val(citem['cn_req_job_source'] == 1 ? "รับคืน" : "หน้างาน").prop("disabled", true);
    $('#frm_data').find('#source_site_code').val(citem['cn_req_job_source']).trigger('change').prop("disabled", true);
    $('#frm_data').find('#pick_up_date').val(citem['pick_up_date']).prop("disabled", true);
    $('#frm_data').find('#driver_id').val(citem['driver_id']).trigger('change').prop("disabled", true);
    $('#frm_data').find('#job_status_edit').val(citem['record_status']).prop("disabled", true);
    $('#frm_data').find('#pick_up_remark').val(citem['cn_req_job_note']).prop("disabled", true);
    $('#frm_data').find('#created_by').val(citem['created_by']).prop("disabled", true);
    $('#frm_data').find('#job_comment').val(citem['cn_req_job_cause']).trigger('change')
    $('#frm_data').find('#pick_up_date').val(moment().format('DD/MM/YYYY HH:mm:ss'))

};

$.Souce_Update = async function (citem) {

    $('#btn-save-status').addClass('d-none').prop("disabled", true);
    $('#btn-save-souce').addClass('d-none').prop("disabled", true);
    $('#btn-save-driver').addClass('d-none').prop("disabled", true);
    $('#btn-save-assige').addClass('d-none').prop("disabled", true);
    $('#btn-save-condition').addClass('d-none').prop("disabled", true);

    $('#frm_data input').removeAttr('required');
    $('#frm_data select:not(#source_site_code)').removeAttr('required');
    $('#source_site_code').attr('required');

    $('.hide_job_status').addClass('d-none');
    $('#source_site_code').prop("disabled", false);
    $('#pick_up_remark').prop("disabled", false);

    $('#btn-save-souce').removeClass('d-none').prop("disabled", false);

    $('#btn-save-souce').on('click', function (e) {
        e.preventDefault();

        var frm_data = $('#frm_data').parsley();
        if (frm_data.isValid()) {

            $('#modal-frm_data').modal('hide');

            let add_data = {
                cn_req_job_jobno: citem['cn_req_job_jobno'],
                cn_req_job_source: $('#source_site_code').val(),
                cn_req_job_note: $('#pick_up_remark').val(),
                created_by: user_id
            };

            var params = [];
            for (const i in add_data) {
                params.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            fetch(api_soureupdate, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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

                    toastr.success('Save Successfully!', async function () {

                        $("#global-loader").fadeIn("slow");

                        oTable.destroy();

                        $('.btn-save_form').prop('disabled', false);
                        $("#frm_data").parsley().reset();

                        $('#modal-frm_data').modal('hide');
                        $.List();
                    });
                }

            }).catch((error) => {
                toastr.error(error, 'Error writing document');
                console.error('Error:', error);
            });

            return false;

        } else {
            frm_data.validate();
        }

    });

}

$.Assige_Update = async function (citem) {

    console.log(citem);

    $('#btn-save-status').addClass('d-none').prop("disabled", true);
    $('#btn-save-souce').addClass('d-none').prop("disabled", true);
    $('#btn-save-driver').addClass('d-none').prop("disabled", true);
    $('#btn-save-condition').addClass('d-none').prop("disabled", true);

    $('.hide_job_status').addClass('d-none');
    $('#frm_data input').removeAttr('required');
    $('#frm_data select:not(#job_assige)').removeAttr('required');
    $('#job_assige').attr('required');

    $('#job_assige').prop("disabled", false);
    $('#pick_up_remark').prop("disabled", false);

    $('#btn-save-assige').removeClass('d-none').prop("disabled", false);


    $('#btn-save-assige').on('click', function (e) {
        e.preventDefault();

        var frm_data = $('#frm_data').parsley();
        if (frm_data.isValid()) {

            let add_data = {
                cn_req_job_jobno: citem['cn_req_job_jobno'],
                cn_req_job_assige: $('#job_assige').val(),
                cn_req_job_note: $('#pick_up_remark').val(),
                created_by: user_id,
                record_status: 1,
            };

            var params = [];
            for (const i in add_data) {
                params.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            fetch(api_assigeupdate, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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

                    toastr.success('Save Successfully!', async function () {

                        $("#global-loader").fadeIn("slow");

                        oTable.destroy();

                        $('.btn-save_form').prop('disabled', false);
                        $("#frm_data").parsley().reset();

                        $('#modal-frm_data').modal('hide');
                        setTimeout(() => {
                            location.reload();
                        }, "1000")
                    });
                }

            }).catch((error) => {
                toastr.error(error, 'Error writing document');
                console.error('Error:', error);
            });

            return false;
        } else {
            frm_data.validate();
        }

        return false;

    });


}

$.Driver_Update = async function (citem) {

    $('#btn-save-status').addClass('d-none').prop("disabled", true);
    $('#btn-save-souce').addClass('d-none').prop("disabled", true);
    $('#btn-save-assige').addClass('d-none').prop("disabled", true);
    $('#btn-save-condition').addClass('d-none').prop("disabled", true);

    $('.hide_job_status').addClass('d-none');
    $('#frm_data input').removeAttr('required');
    $('#frm_data select:not(#driver_id)').removeAttr('required');
    $('#driver_id').attr('required');

    $('#driver_id').prop("disabled", false);
    $('#pick_up_remark').prop("disabled", false);

    $('#btn-save-driver').removeClass('d-none').prop("disabled", false);

    $('#btn-save-driver').on('click', function (e) {
        e.preventDefault();

        arraydriver[0].cn_req_job_received_date = moment().format('YYYY-MM-DD HH:mm:ss');

        var frm_data = $('#frm_data').parsley();

        let string_driver = JSON.stringify(arraydriver);

        console.log(string_driver);

        if (frm_data.isValid()) {
            let add_data = {
                cn_req_job_jobno: citem['cn_req_job_jobno'],
                cn_req_job_lastdriver: string_driver,
                cn_req_job_driver_code: arraydriver[0]['cn_req_job_driver_code'],
                cn_req_job_driver_name: arraydriver[0]['cn_req_job_driver_name'],
                cn_req_job_driver_tel: arraydriver[0]['cn_req_job_driver_tel'],
                cn_req_job_received_date: arraydriver[0]['cn_req_job_received_date'],
                cn_req_job_note: $('#pick_up_remark').val(),
                created_by: user_id,
                record_status: 1
            };

            var params = [];
            for (const i in add_data) {
                params.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            fetch(api_driverupdate, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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

                    toastr.success('Save Successfully!', async function () {

                        $("#global-loader").fadeIn("slow");

                        oTable.destroy();

                        $('.btn-save_form').prop('disabled', false);
                        $("#frm_data").parsley().reset();

                        $('#modal-frm_data').modal('hide');

                        setTimeout(() => {
                            location.reload();
                        }, "1000")
                    });

                }

            }).catch((error) => {
                toastr.error(error, 'Error writing document');
                console.error('Error:', error);
            });

        } else {
            frm_data.validate();
        }
        return false;

    })

}

$.Condition_Update = async function (citem) {

    $('#btn-save-status').addClass('d-none').prop("disabled", true);
    $('#btn-save-souce').addClass('d-none').prop("disabled", true);
    $('#btn-save-assige').addClass('d-none').prop("disabled", true);
    $('#btn-save-driver').addClass('d-none').prop("disabled", true);

    $('.hide_job_status').addClass('d-none');
    $('#frm_data input').removeAttr('required');
    $('#frm_data select:not(#item_condition)').removeAttr('required');
    $('#item_condition').attr('required');

    $('#item_condition').prop("disabled", false);
    $('#pick_up_remark').prop("disabled", false);

    $('#btn-save-condition').removeClass('d-none').prop("disabled", false);

    $('#btn-save-condition').on('click', function (e) {
        e.preventDefault();

        var frm_data = $('#frm_data').parsley();

        if (frm_data.isValid()) {
            let add_data = {
                cn_req_job_jobno: citem['cn_req_job_jobno'],
                cn_req_job_item_condition: $('#item_condition').val(),
                cn_req_job_note: $('#pick_up_remark').val(),
                created_by: user_id,
                record_status: 1
            };

            var params = [];
            for (const i in add_data) {
                params.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            fetch(api_conditionupdate, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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
                    toastr.success('Save Successfully!', async function () {

                        $("#global-loader").fadeIn("slow");

                        oTable.destroy();

                        $('.btn-save_form').prop('disabled', false);
                        $("#frm_data").parsley().reset();

                        $('#modal-frm_data').modal('hide');

                        setTimeout(() => {
                            location.reload();
                        }, "1000")
                    });

                }

            }).catch((error) => {
                toastr.error(error, 'Error writing document');
                console.error('Error:', error);
            });

        } else {
            frm_data.validate();
        }

        return false;

    })

}

$.Status_Update = async function (citem) {

    $('#btn-save-souce').addClass('d-none').prop("disabled", true);
    $('#btn-save-assige').addClass('d-none').prop("disabled", true);
    $('#btn-save-driver').addClass('d-none').prop("disabled", true);
    $('#btn-save-condition').addClass('d-none').prop("disabled", true);


    $('.hide_job_status').removeClass('d-none');
    $('#frm_data input').removeAttr('required');
    $('#frm_data select:not(#job_status_edit)').removeAttr('required');
    $('#job_status_edit').attr('required');

    $('#job_status_edit').prop("disabled", false);
    $('#pick_up_remark').prop("disabled", false);

    $('#btn-save-status').removeClass('d-none').prop("disabled", false);

    $('#btn-save-status').on('click', function (e) {
        e.preventDefault();

        var frm_data = $('#frm_data').parsley();

        if (frm_data.isValid()) {
            let add_data = {
                cn_req_job_jobno: citem['cn_req_job_jobno'],
                cn_req_job_note: $('#pick_up_remark').val(),
                created_by: user_id,
                record_status: $('#job_status_edit').val()
            };

            var params = [];
            for (const i in add_data) {
                params.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            fetch(api_status, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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
                    toastr.success('Save Successfully!', async function () {

                        $("#global-loader").fadeIn("slow");

                        oTable.destroy();

                        $('.btn-save_form').prop('disabled', false);
                        $("#frm_data").parsley().reset();

                        $('#modal-frm_data').modal('hide');

                        setTimeout(() => {
                            location.reload();
                        }, "1000")
                    });

                }

            }).catch((error) => {
                toastr.error(error, 'Error writing document');
                console.error('Error:', error);
            });

        } else {
            frm_data.validate();
        }

        return false;

    })

}

$.History = async function (citem) {
    $('#modal-frm_data').modal('hide');
    $('#modal-frm_history').modal('show');

    $.History_Souce(citem);
    $.History_Assige(citem);
    $.History_Status(citem);
    $.History_Driver(citem);
    $.History_Condition(citem);
    $.History_Remark(citem);

}

$.History_Souce = async function (citem) {

    let url_history_souce = new URL(api_lists_history_souce);

    url_history_souce.search = new URLSearchParams({
        cn_req_job_jobno: citem['cn_req_job_jobno']
    });

    fetch(url_history_souce).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }, function (isConfirmed) {
                if (isConfirmed) {

                    location.reload();

                }
            })


        } else {

            $('#tbl-list-history-souce').css({ "width": "100%" });

            history_Table = $('#tbl-list-history-souce').DataTable({
                data: result.data,
                //scrollX: true,
                //scrollCollapse: true,
                // autoWidth: true,
                info: false,
                searching: false,
                paging: false,
                columns: [
                    {
                        title: "created_date",
                        data: "created_date",
                        visible: false
                    }, //1
                    {
                        title: "<span style='font-size:11px;'>วันที่/เวลา</span>",
                        data: "created_date",
                        width: "30px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY HH:mm') + '<span/>';
                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>การรับแจ้ง</span>",
                        width: "33%",
                        class: "tx-center",
                        data: 'cn_req_job_source',
                        render: function (data, type, row, meta) {
                            return data == '1' ? '<span class="badge badge-info">รับคืน</span>' : data == '2' ? '<span class="badge badge-success">หน้างาน</span>' : '-';
                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>บันทึกโดย</span>",
                        width: "33%",
                        class: "tx-center",
                        data: 'created_by',
                        render: function (data, type, row, meta) {
                            return '<div class="tx-left">' + data + '</div>'
                        }
                    }
                ],

                order: [
                    [0, 'desc'],
                ],


            });

        }
    })
};

$.History_Assige = async function (citem) {

    let url_history_assige = new URL(api_lists_history_assige);

    url_history_assige.search = new URLSearchParams({
        cn_req_job_jobno: citem['cn_req_job_jobno']
    });

    fetch(url_history_assige).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }, function (isConfirmed) {
                if (isConfirmed) {

                    location.reload();

                }
            })


        } else {

            $('#tbl-list-history-assige').css({ "width": "100%" });

            history_assige_Table = $('#tbl-list-history-assige').DataTable({
                data: result.data,
                //scrollX: true,
                //scrollCollapse: true,
                // autoWidth: true,
                info: false,
                searching: false,
                paging: false,
                columns: [
                    {
                        title: "created_date",
                        data: "created_date",
                        visible: false
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>วันที่/เวลา</span>",
                        data: "created_date",
                        width: "33%",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '  ' + moment(data).format('HH:mm') + '<span/>';
                        }
                    }, //1
                    {
                        title: "<span style='font-size:11px;'>ผู้รับผิดชอบ</span>",
                        data: "cn_req_job_assige",
                        width: "33%",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>หมายเหตุ</span>",
                        data: "cn_req_job_note",
                        //width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return data != null ? '<span style="font-size:11px;">' + data + '</span>' : '';

                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>บันทึกโดย</span>",
                        width: "33%",
                        class: "tx-center",
                        data: 'created_by',
                        render: function (data, type, row, meta) {
                            return '<div class="tx-left">' + data + '</div>'
                        }
                    } //4

                ],
                order: [
                    [0, 'desc'],
                ],

            });

        }
    })
};

$.History_Driver = async function (citem) {

    let url_history_driver = new URL(api_lists_history_driver);

    url_history_driver.search = new URLSearchParams({
        cn_req_job_jobno: citem['cn_req_job_jobno']
    });

    fetch(url_history_driver).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }, function (isConfirmed) {
                if (isConfirmed) {

                    location.reload();

                }
            })


        } else {

            $('#tbl-list-history-driver').css({ "width": "100%" });

            history_drive_Table = $('#tbl-list-history-driver').DataTable({
                data: result.data,
                //scrollX: true,
                //scrollCollapse: true,
                // autoWidth: true,
                info: false,
                searching: false,
                paging: false,
                columns: [
                    {
                        title: "created_date",
                        data: "created_date",
                        visible: false
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>วันที่/เวลา</span>",
                        data: "created_date",
                        width: "33%",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '  ' + moment(data).format('HH:mm') + '<span/>';
                        }
                    }, //1
                    {
                        title: "<span style='font-size:11px;'>คนขับรถ</span>",
                        data: "cn_req_job_driver_code",
                        width: "33%",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            let tel = row.cn_req_job_driver_tel == null ? '' : row.cn_req_job_driver_tel == "" ? '' :  row.cn_req_job_driver_tel + " : ";

                            return '<div class="tx-left" style="font-size:11px;">' + data + ' : ' + tel + row.cn_req_job_driver_name + '<div/>'
                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>หมายเหตุ</span>",
                        data: "cn_req_job_note",
                        width: "33%",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return data != null ? '<div class="tx-left" style="font-size:11px;">' + data + '</div>' : '';

                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>บันทึกโดย</span>",
                        width: "33%",
                        class: "tx-center",
                        data: 'created_by',
                        render: function (data, type, row, meta) {
                            return '<div class="tx-left">' + data + '</div>'
                        }
                    } //4

                ],
                order: [
                    [0, 'desc'],
                ],

            });

        }
    })
};

$.History_Condition = async function (citem) {

    let url_history_condition = new URL(api_lists_history_condition);

    url_history_condition.search = new URLSearchParams({
        cn_req_job_jobno: citem['cn_req_job_jobno']
    });

    fetch(url_history_condition).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }, function (isConfirmed) {
                if (isConfirmed) {

                    location.reload();

                }
            })


        } else {

            $('#tbl-list-history-condition').css({ "width": "100%" });

            history_condition_Table = $('#tbl-list-history-condition').DataTable({
                data: result.data,
                //scrollX: true,
                //scrollCollapse: true,
                // autoWidth: true,
                info: false,
                searching: false,
                paging: false,
                columns: [
                    {
                        title: "created_date",
                        data: "created_date",
                        visible: false
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>วันที่/เวลา</span>",
                        data: "created_date",
                        width: "33%",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '  ' + moment(data).format('HH:mm') + '<span/>';
                        }
                    }, //1
                    {
                        title: "<span style='font-size:11px;'>สภาพสินค้า</span>",
                        data: "item_condition",
                        width: "33%",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return data != null ? '<div class="tx-left" style="font-size:11px;">' + data + '</div>' : '';

                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>หมายเหตุ</span>",
                        data: "cn_req_job_note",
                        width: "33%",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return data != null ? '<div class="tx-left" style="font-size:11px;">' + data + '</div>' : '';

                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>บันทึกโดย</span>",
                        width: "33%",
                        class: "tx-center",
                        data: 'created_by',
                        render: function (data, type, row, meta) {
                            return '<div class="tx-left">' + data + '</div>'
                        }
                    } //4

                ],
                order: [
                    [0, 'desc'],
                ],

            });




        }
    })
};

$.History_Status = async function (citem) {

    let url_history_status = new URL(api_lists_history_status);

    url_history_status.search = new URLSearchParams({
        cn_req_job_jobno: citem['cn_req_job_jobno']
    });

    fetch(url_history_status).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }, function (isConfirmed) {
                if (isConfirmed) {

                    location.reload();

                }
            })


        } else {

            $('#tbl-list-history-status').css({ "width": "100%" });

            history_status_Table = $('#tbl-list-history-status').DataTable({
                data: result.data,
                //scrollX: true,
                //scrollCollapse: true,
                // autoWidth: true,
                info: false,
                searching: false,
                paging: false,
                columns: [
                    {
                        title: "created_date",
                        data: "created_date",
                        visible: false
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>วันที่/เวลา</span>",
                        data: "created_date",
                        //width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '  ' + moment(data).format('HH:mm') + '<span/>';
                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>สถานะ</span>",
                        data: "cn_req_job_status",
                        //width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            let status_text
                            if (row.record_status == "1") {
                                status_text = '<span style="font-size:11px; color:red">' + data + '<span/>'
                            } else if (row.record_status == "2") {
                                status_text = '<span style="font-size:11px; color:orange">' + data + '<span/>'
                            } else if (row.record_status == "3") {
                                status_text = '<span style="font-size:11px; color:green">' + data + '<span/>'
                            } else if (row.record_status == "4") {
                                status_text = '<span style="font-size:11px; color:green">' + data + '<span/>'
                            } else if (row.record_status == "5") {
                                status_text = '<span style="font-size:11px; color:red">' + data + '<span/>'
                            } else if (row.record_status == "0") {
                                status_text = '<span style="font-size:11px; color:#FFC300">' + data + '<span/>'
                            }

                            return '<span">' + status_text + '</span>';
                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>บันทึกโดย</span>",
                        width: "10%",
                        class: "tx-center",
                        data: 'created_by',
                        render: function (data, type, row, meta) {
                            return '<div class="tx-left">' + data + '</div>'
                        }
                    }
                ],

            });

        }
    })
};

$.History_Remark = async function (citem) {

    let url_history_remark = new URL(api_lists_history_remark);

    url_history_remark.search = new URLSearchParams({
        cn_req_job_jobno: citem['cn_req_job_jobno']
    });

    fetch(url_history_remark).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }, function (isConfirmed) {
                if (isConfirmed) {

                    location.reload();

                }
            })


        } else {

            $('#tbl-list-history-remark').css({ "width": "100%" });

            history_remark_Table = $('#tbl-list-history-remark').DataTable({
                data: result.data,
                //scrollX: true,
                //scrollCollapse: true,
                // autoWidth: true,
                info: false,
                searching: false,
                paging: false,
                columns: [
                    {
                        title: "created_date",
                        data: "created_date",
                        visible: false
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>วันที่/เวลา</span>",
                        data: "created_date",
                        //width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '  ' + moment(data).format('HH:mm') + '<span/>';
                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>สถานะ</span>",
                        data: "record_status",
                        class: "tx-center job_status",
                        width: "50px",
                        render: function (data, type, row, meta) {
                            if (row.record_status == '1') {
                                return '<span style="color:red; font-size:11px;">Open</span>';
                            } else if (row.record_status == '2') {
                                return '<span style="color:orange; font-size:11px;">On Process</span>';
                            } else if (row.record_status == '3') {
                                return '<span style="color:green; font-size:11px;">Receive</span>';
                            } else if (row.record_status == '4') {
                                return '<span style="color:green; font-size:11px;">Complete</span>';
                            } else if (row.record_status == '5') {
                                return '<span style="color:red; font-size:11px;">Rejected</span>';
                            } else if (row.record_status == "0") {
                                return '<span style="color:#FFC300; font-size:11px;">Cancel</span>';
                            } else {
                                return '<span style="color:#000; font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>สาเหตุ</span>",
                        data: "cn_req_job_cause",
                        class: "tx-center",
                        width: "250px",
                        render: function (data, type, row, meta) {
                            let job_comment_obj = job_comment_dataSet.find(obj => obj.id === data);
                            console.log(job_comment_dataSet)
                            console.log(job_comment_obj)
                            return '<span style="font-size:11px;">' + job_comment_obj.text + '</span>';
                        }

                    }, //5
                    {
                        title: "<span style='font-size:11px;'>ผู้รับผิดชอบ</span>",
                        data: "cn_req_job_lastassige",
                        class: "tx-center assige",
                        width: "70px",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //6
                    {
                        title: "<span style='font-size:11px;'>การรับแจ้ง</span>",
                        data: "cn_req_job_source",
                        class: "tx-center job_type",
                        width: "80px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return data == '1' ? '<span class="badge badge-info">รับคืน</span>' : data == '2' ? '<span class="badge badge-success">หน้างาน</span>' : '-';
                        }
                    }, //7
                    {
                        title: "<span style='font-size:11px;'>หมายเหตุ</span>",
                        data: "cn_req_job_note",
                        //width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return data != null ? '<span style="font-size:11px;">' + data + '</span>' : '';

                        }
                    }, //8
                    {
                        title: "<span style='font-size:11px;'>บันทึกโดย</span>",
                        width: "10%",
                        class: "tx-center",
                        data: 'created_by',
                        render: function (data, type, row, meta) {
                            return '<div class="tx-left">' + data + '</div>'
                        }
                    }
                ],

            });

        }
    })
};

$.Load_cause = function () {
    let Get_comment = new URL(url_cn_req_cause_get);

    fetch(Get_comment).then(function (response) {
        return response.json();
    }).then(function (result) {
        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }, function (isConfirmed) {
                if (isConfirmed) {

                    location.reload();

                }
            })
        } else {

            $.each(result.data, function (key, val) {
                job_comment_dataSet.push({ id: val['lov_code'], text: val['lov_code'] + ' : ' + val['lov1'] });
                job_comment_dataSet_list.push({ id: val['lov_code'], text: val['lov1'] });

            });

            $('#job_comment').select2({
                width: '100%',
                height: '40px',
                data: job_comment_dataSet,
                templateResult: function (data) {
                    return data.text;
                },
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    });
                }
            });

            $('#cn_comment').select2({
                width: '100%',
                height: '40px',
                data: job_comment_dataSet,
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

$.Load_assige = function () {
    let Get_assige = new URL(url_cn_req_assige_get);

    fetch(Get_assige).then(function (response) {
        return response.json();
    }).then(function (result) {
        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }, function (isConfirmed) {
                if (isConfirmed) {

                    location.reload();

                }
            })
        } else {

            $.each(result.data, function (key, val) {
                job_assige_dataSet_list.push({ id: val['lov_code'], text: val['lov1'] });

            });

            $('#cn_pre_job_assige_search').select2({
                width: '100%',
                height: '40px',
                data: job_assige_dataSet_list,
                templateResult: function (data) {
                    return data.text;
                },
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    });
                }
            });

            $('#job_assige').select2({
                width: '100%',
                height: '40px',
                data: job_assige_dataSet_list,
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

$.Load_source = function () {
    let Get_source = new URL(url_cn_req_source_get);

    fetch(Get_source).then(function (response) {
        return response.json();
    }).then(function (result) {
        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }, function (isConfirmed) {
                if (isConfirmed) {

                    location.reload();

                }
            })
        } else {

            $.each(result.data, function (key, val) {
                job_source_dataSet.push({ id: val['lov_code'], text: val['lov1'] + ' : ' + val['lov2'] });
                job_source_dataSet_list.push({ id: val['lov_code'], text: val['lov1'] });

            });

            $('#source_site_code').select2({
                width: '100%',
                height: '40px',
                data: job_source_dataSet_list,
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

$.Load_status = function () {
    let get_status = new URL(url_cn_req_status_get);

    fetch(get_status).then(function (response) {
        return response.json();
    }).then(function (result) {
        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }, function (isConfirmed) {
                if (isConfirmed) {

                    location.reload();

                }
            })
        } else {

            $.each(result.data, function (key, val) {
                job_status_dataSet.push({ id: val['lov_code'], text: val['lov1'] + ' : ' + val['lov2'] });
                job_status_dataSet_list.push({ id: val['lov_code'], text: val['lov1'] });

            });

            $('#job_status_search').select2({
                width: '100%',
                height: '40px',
                data: job_status_dataSet,
                templateResult: function (data) {
                    return data.text;
                },
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    });
                }
            });

            $('#job_status_edit').select2({
                width: '100%',
                height: '40px',
                data: job_status_dataSet,
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

$.Invoice = async function (cn_req_job_jobno) {
    $('#modal-frm_data').modal('hide');

    let url = export_invoice + '&cn_req_job_jobno=' + cn_req_job_jobno;
    window.open(url, '_blank');

};

$.MM_Employee_Get = async function (code, positionName, groupName) {

    let result = await fetch(url_employee_movemax_get, {
        method: "POST",
        headers: {
            Authorization: api_key,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: null,
            code: code == "" ? null : code,
            firstname: null,
            lastname: null,
            positionName: positionName == "" ? null : positionName,
            groupName: groupName == "" ? null : groupName,
            employeeType: 1,
            distributionCenterCode: null,
            companyAcronym: null,
            subCode: null,
            pagination: {
                limitItem: 100,
                currentPage: 1,
            },
        }),
    }).then((response) => {
        return response.json();
    }).then((data) => {
        return data;

        //console.log(data)
    });

    return result;

};

function checkValue(value, arr) {
    var status = 'Not exist';

    for (var i = 0; i < arr.length; i++) {
        var name = arr[i];
        if (name == value) {
            status = 'Exist';
            break;
        }
    }

    return status;
}

function Driver_Find(code, name) {

    let full_name = ''

    $.ajax({
        async: false,
        url: 'https://vsk.tms-vcargo.com/api/tms/public/v1/driver/search',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({ 'code': code, 'name': name }),
        success: function (result) {

            if (result.object.length > 0) {

                $.each(result.object, function (key, val) {

                    full_name = val['code'] + ' : ' + val['firstNameTh'] + ' ' + val['lastNameTh'];
                    return false;

                });


            } else {

                full_name = code;
                return false;
            }

            return false;


        }

    });
    return full_name;

}

$(document).ready(async function () {

    $("#global-loader").fadeOut("slow");
    await $.init();
});

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
        var full_mail = user.email;
        name = full_mail.replace("@vskautoparts.com", "");

        //console.log('user', user.email);

    } else {

        window.location.assign('./login');

    }

});