'use strict';

let fs = firebase.firestore();
let collection = 'mrp_opt_purchaseplan';
let oTable, history_Table, role_code, mode;
let inventorycode_dataset = [];
let invfrecode_dataset = [];

let export_cn_job = 'http://localhost:49705/CnExport/Cn_Job_Detail_Export';
let lists_get = 'http://localhost:49705/v1/Cn_Pre_Job_Get';
let lists_history = 'http://localhost:49705/v1/Cn_Pre_Job_Detail_Get';
let update_detail = 'http://localhost:49705/v1/Cn_Pre_Job_Detail_Create';
let export_invoice = 'http://localhost/vsk-rpt/Pages/RPT_CN/RPT_CN_REINVOICE';
let Cn_Lov_Get = 'http://localhost:49705/v1/Cn_Lov_Get';

const objProfile = JSON.parse(localStorage.getItem('objProfile'));

let validator, table, options, item_action, item_id, deatailCondition;

let job_comment_dataSet = [];

let toDate = new Date();
var name;

$.Load_comment = function () {
    let Get_comment = new URL(Cn_Lov_Get); /// kung edit 27/11/20

    fetch(Get_comment).then(function (response) {
        return response.json();
    }).then(function (result) {
        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                //footer: '<a href>Why do I have this issue?</a>'
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            })
        } else {

            $.each(result.data, function (key, val) {
                job_comment_dataSet.push({ id: val['lov_code'], text: val['lov_code'] + ' : ' + val['lov1'] });

            });
            
            $('.cn_comment').select2({
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

$.init = function () {


    $('#cn_date').val(moment().format('DD/MM/YYYY') + '-' + moment().format('DD/MM/YYYY'))

    $('#job_status_search').append('<option value="complete">Complete - สำเร็จ </option>')

    $('#btn-export').off('click').on('click', function (evt) {

        evt.preventDefault();

        $(this).on('click', function (evt) {
            evt.preventDefault();
        });

        let CNdate_start = $('#cn_date').val() != '' ? moment($('#cn_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + " 00:00" : moment().add(-365, 'days').format('YYYY-MM-DD') + " 00:00";
        let CNdate_end = $('#cn_date').val() != '' ? moment($('#cn_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + " 23:59" : moment().add(1, 'days').format('YYYY-MM-DD') + " 23:59";

        let url = export_cn_job +
            '?salefile_number=' + $('#invbook').val() +
            '&saletra_item_barcode=' + $('#barcode').val() +
            '&saletra_item_whdiscode=' + $('#whdiscode').val() +
            '&cn_pre_job_datetime_start=' + CNdate_start +
            '&cn_pre_job_datetime_end=' + CNdate_end +
            '&cn_pre_job_comment=' + $('#cn_comment').val() +
            '&created_by=' + $('#created_by').val() +
            '&record_status=' + '1' +
            '&mode=' + 'Search';
        window.open(url, '_blank'); // kung edit 17/11/20

    });

    $.getUserProfile = function () {

        $.each(objProfile.auth_role, function (key, val) {
            //console.log('role_code is:', val['role_code']);
            role_code = val['role_code'];
        });

    };
    $.getUserProfile();

    if (role_code == 'TRP') {
        $('#cn_pre_job_assige_search').val('TRP')
    }

    //OHM Update 06/11/2020 18:00
    //let job_comment_query = fs.collection('lov_cn').where("active_flag", "==", "Y").where("lov_type", "==", "Pre Job Code");

    //job_comment_query.get().then(function (querySnapshot) {

    //    querySnapshot.forEach(function (doc) {

    //        job_comment_dataSet.push({ id: doc.data().lov_code, text: doc.data().lov1 });

    //    });

    //    $.getComment = function (val) {
    //        $('.cn_comment').select2({
    //            width: '100%',
    //            height: '40px',
    //            data: job_comment_dataSet,
    //            templateResult: function (data) {
    //                return data.id + ' : ' + data.text;
    //            },
    //            sorter: function (data) {
    //                return data.sort(function (a, b) {
    //                    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    //                });
    //            }
    //        });
    //    }
    //    $.getComment();
    //});

    $('.item_status').hide();

    $('#job_status_search').on("change", function () {
        if ($(this).val() == "receive") {
            $('.item_status').show();
        } else {
            $('.item_status').hide();
            $('#item_status').val('');
        }
    })

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

    $('#btn-item_create').click(function (e) {

        e.preventDefault();

        $.Create();

    });

    $('#modal-frm_data').on('hidden.bs.modal', function () {

        $('#site_code').val('').trigger('change').prop('disabled', false);
        $('#schedule_note').val('').prop('disabled', false);
        $('.schedule_day').prop('checked', false).prop('disabled', true);
        $('#schedule_all').prop('checked', false).prop('disabled', true);
        $('.record_status').prop('disabled', true);

        $("#frm_data").parsley().reset();

    });
    /*
    $.LoadingOverlay("show", {
        image: "assets/loading-mb-icon.png",
        //image: "assets/PikPng.png",
        imageAnimation: true,
        imageResizeFactor: 2,
        text: " loading... ",
        textColor: 'DodgerBlue'
        //fontawesome: "fas fa-dragon"
    });
    */
    $("#global-loader").fadeIn("slow");

    $.List(''); //before search

    $('#frm_search').submit(async function (e) {

        e.preventDefault();

        $("#global-loader").fadeIn("slow");
        /*
        $.LoadingOverlay("show", {
            image: "assets/loading-mb-icon.png",
            //image: "assets/PikPng.png",
            imageAnimation: true,
            imageResizeFactor: 2,
            text: " loading... ",
            textColor: 'DodgerBlue'
            //fontawesome: "fas fa-dragon"
        });
        */

        oTable.destroy();


        $.List('Search'); //after search

    });


    $('#modal-frm_history').on('hidden.bs.modal', function () {

        history_Table.destroy();
    });

};

$.List = async function (mode) {
    $.Load_comment();

    //console.log('Index function Start', new Date());

    // oTable = $('#tbl-list').DataTable();

    let url = new URL(lists_get);
    var CNdate_start
    var CNdate_end

    //CNdate_start = $('#cn_date').val() != '' ? moment($('#cn_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment().add(-365, 'days').format('YYYY-MM-DD') + ' 00:00';  //ถ้าไม่เลือกจะเป็นวันปัจจุบัน
    //CNdate_end = $('#cn_date').val() != '' ? moment($('#cn_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().add(1, 'days').format('YYYY-MM-DD') + ' 23:59';

    CNdate_start = $('#cn_date').val() != '' ? moment($('#cn_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment().format('YYYY-MM-DD') + ' 00:00';  //ถ้าไม่เลือกจะเป็นวันปัจจุบัน
    CNdate_end = $('#cn_date').val() != '' ? moment($('#cn_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';

    url.search = new URLSearchParams({
        cn_pre_job_datetime_start: CNdate_start,
        cn_pre_job_datetime_end: CNdate_end,
        salefile_number: $('#invbook').val(),
        saletra_item_barcode: $('#barcode').val(),
        //saletra_item_whdiscode: $('#whdiscode').val(),
        cn_pre_job_comment: $('#cn_comment').val(),
        created_by: $('#created_by_search').val(),
        cn_pre_job_status: $('#job_status_search').val(),
        //cn_pre_job_detail_item_condition: $('#item_status').val(),
        cn_pre_job_jobno: $('#cn_pre_job_jobno_search').val(),
        cn_pre_job_assige: $('#cn_pre_job_assige_search').val(),
        record_status: '1',
        mode: mode
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {
        //oTable.destroy();
        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                //footer: '<a href>Why do I have this issue?</a>'
            }).then((result) => {
                if (result.isConfirmed) {

                    location.reload();

                }
            })


        } else {

            oTable = $('#tbl-list').DataTable({
                data: result.data,
                scrollX: true,
                //"pageLength": 100,
                //scrollCollapse: true,
                //autoWidth: true,
                //paging: true,
                scrollY: "410px",
                scrollCollapse: true,
                paging: false,
                columns: [
                    {
                        title: "<span style='font-size:11px;'>Job ID</span>",
                        data: "cn_pre_job_id",
                        width: "70px",
                        visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //1 

                    {
                        title: "<span style='font-size:11px;'>เลขที่อ้างอิง</span>",
                        data: "cn_pre_job_jobno",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //2

                    {
                        title: "<span style='font-size:11px;'>วันที่/เวลา</span>",
                        data: "cn_pre_job_datetime",
                        width: "100px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '  ' + moment(data).format('hh:mm:ss') + '<span/>';
                        }
                    }, //3

                    {
                        title: "<span style='font-size:11px;'>CN No.</span>",
                        data: "pMessage",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //2


                    {
                        title: "<span style='font-size:11px;'>เวลา</span>",
                        data: "cn_pre_job_datetime",
                        class: "tx-center",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format('hh:mm:ss') + '<span/>';
                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>สถานะ</span>",
                        data: "cn_pre_job_status",
                        class: "tx-center job_status",
                        width: "50px",
                        render: function (data, type, row, meta) {
                            if (data == 'open') {
                                return '<span style="color:red; font-size:11px;">Open</span>';
                            } else if (data == 'on_process') {
                                return '<span style="color:orange; font-size:11px;">On Process</span>';
                            } else if (data == 'receive') {
                                return '<span style="color:green; font-size:11px;">Receive</span>';
                            } else if (data == 'complete') {
                                return '<span style="color:green; font-size:11px;">Complete</span>';
                            } else if (data == 'rejected') {
                                return '<span style="color:red; font-size:11px;">Rejected</span>';
                            } else if (data == "change") {
                                return '<span style="color:#00AEFF;">Change</span>';
                            } else if (data == "cancel") {
                                return '<span style="color:#FFC300; font-size:11px;">Cancel</span>';
                            } else {
                                return '<span style="color:#000; font-size:11px;">' + data + '</span>';

                            }

                        }
                    }, //5
                    {
                        title: "<span style='font-size:11px;'>ผู้รับผิดชอบ</span>",
                        data: "cn_pre_job_assige",
                        class: "tx-center assige",
                        width: "70px",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //6
                    {
                        title: "<span style='font-size:11px;'>รหัสลูกค้า</span>",
                        data: "saletra_empcod",
                        width: "80px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //2
                    {
                        title: "<span class='tx-center' style='font-size:11px;'>ชื่อลูกค้า</span>",
                        data: "saletra_empname",
                        width: "180px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>เลขที่ใบเสร็จ</span>",
                        data: "salefile_number",
                        class: "tx-center",
                        width: "100px",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-uppercase" style="font-size:11px;">' + data + '</span>';
                        }
                    }, //7
                    {
                        title: "<span style='font-size:11px;'>รหัสลูกค้า</span>",
                        data: "salefile_invcode",
                        width: "50px",
                        class: "tx-center",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //8 
                    {
                        title: "<span style='font-size:11px;'>Barcode</span>",
                        data: "saletra_item_barcode",
                        class: "tx-center",
                        visible: false,
                        width: "70px",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //9
                    {
                        title: "<span class='tx-center' style='font-size:11px;'>ข้อมูลสินค้า</span>",
                        data: "saletra_item_name",
                        class: "tx-left",
                        width: "300px",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + row.saletra_item_barcode + " :" + data + "(" + row.saletra_item_spcodes + ")" + '</span>';
                        }
                    }, //10
                    {
                        title: "<span style='font-size:11px;'>Qty.</span>",
                        data: "cn_pre_job_qty",
                        width: "60px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //11
                    {
                        title: "<span style='font-size:11px;'>การรับแจ้ง</span>",
                        data: "cn_pre_job_type",
                        class: "tx-center job_type",
                        width: "80px",
                        //visible: false,
                        render: function (data, type, row, meta) {

                            //ohm edit : 06/11/2020 18:00

                            return data == '1' ? '<span class="badge badge-info">รับคืน</span>' : data == '2' ? '<span class="badge badge-success">หน้างาน</span>' : '-';

                            /*
                            if (data == '1') {
                                return '<span style="color:blue; font-size:11px;">รับคืน</span>';
                            } else if (data == '2') {
                                return '<span style="color:green; font-size:11px;">หน้างาน</span>';
                            } else {
                                return '-';
                            }
                            */

                        }
                    }, //12
                    {
                        title: "<span style='font-size:11px;'>บันทึกโดย</span>",
                        data: "created_by",
                        class: "tx-center",
                        width: "100px",
                        // visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //13
                    {
                        title: "<span style='font-size:11px;'>สาเหตุ</span>",
                        data: "cn_pre_job_comment",
                        class: "tx-center",
                        width: "400px",

                        render: function (data, type, row, meta) {
                            data = $.trim(data);
                            //ohm edit : 06/11/2020 18:00
                            //kung edit : 28/77/20 17:30
                            let job_comment_obj = job_comment_dataSet.find(obj => obj.id === data);
                            return '<span style="font-size:11px;">' + job_comment_obj.text + '</span>';

                        }

                    }, //14 
                    {
                        title: "<span style='font-size:11px;'>Message</span>",
                        data: "pMessage",
                        class: "tx-center",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //15
                    {
                        title: "<span style='font-size:11px;'>สภาพสินค้า</span>",
                        data: "cn_pre_job_detail_item_condition",
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
                    }, //16
                ],


                "order": [[1, "desc"]],
                "initComplete": function (settings, json) {

                    // $.LoadingOverlay("hide");

                    $("#global-loader").fadeOut("slow");


                    $('#tbl-list tbody tr').hover(function () {
                        $(this).css('cursor', 'pointer');
                    });
                    //mode = '';
                    $.contextMenu({
                        selector: '#tbl-list tbody tr',
                        callback: async function (key, options) {

                            let data = oTable.row(this).data();
                            //console.log("key", key);
                            let citem = {
                                cn_pre_job_jobno: data['cn_pre_job_jobno'],
                                cn_datetime: data['cn_pre_job_datetime'],
                                cn_job_assige: data['cn_pre_job_assige'],
                                job_comment: data['cn_pre_job_comment'],
                                cn_datetime_end: data['cn_pre_job_datetime_end'],
                                cn_datetime_start: data['cn_pre_job_datetime_start'],
                                cn_id: data['cn_pre_job_id'],
                                cn_jobno: data['cn_pre_job_jobno'],
                                cn_qty: data['cn_pre_job_qty'],
                                cn_status: data['cn_pre_job_status'],
                                cn_type: data['cn_pre_job_type'],
                                created_by: data['created_by'],
                                created_date: data['created_date'],
                                pMessage: data['pMessage'],
                                record_status: data['record_status'],
                                salefile_invcode: data['salefile_invcode'],
                                salefile_number: data['salefile_number'],
                                saletra_item_barcode: data['saletra_item_barcode'],
                                saletra_item_name: data['saletra_item_name'],
                                saletra_item_spcodes: data['saletra_item_spcodes'],
                                saletra_item_whdiscode: data['saletra_item_whdiscode'],
                                updated_by: data['updated_by'],
                                updated_date: data['updated_date'],
                                saletra_empname: data['saletra_empname']
                            };

                            let cn_jobno = data['cn_pre_job_jobno'];
                            let salefile_number = data['salefile_number'];
                            let gbarcode = data['saletra_item_barcode'];
                            let salefile_invcode = data['salefile_invcode'];

                            $('#modal-frm_data').modal({

                                keyboard: false,
                                backdrop: 'static'

                            });


                            if (key === 'view') {

                                $.Details(citem);

                            } else if (key === 'edit') {

                                await $.Details(citem);
                                await $.Edit(citem);

                            } else if (key === 'delete') {

                                $.Details(citem);
                                $.Delete(citem);

                            }
                            else if (key === 'create') {

                                $.Create();
                            }
                            else if (key === 'history') {

                                $.History(citem);
                            }
                            else if (key === 'invoice') {

                                $.Invoice(cn_jobno, salefile_number, gbarcode, salefile_invcode);

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
                            else if (key === 'edit1') {

                                $.UpdateStatus(citem, 'เปลี่ยนแปลง "รับคืน" เป็น "หน้างาน"', 'IVC');

                            }
                            else if (key === 'edit2') {

                                $.UpdateStatus(citem, 'เปลี่ยนแปลง "หน้างาน" เป็น "รับคืน"', 'TRP');

                            }
                            else if (key === 'reject1') {

                                $.Reject(citem, 'Reject - ยกเลิกสินค้า');

                            }else {

                                alert('ERROR');

                            }

                        },

                        items: {
                            "view": { name: "View", icon: "fas fa-search" },
                            "edit": { name: "Edit", icon: "edit edit-detail", disabled: true },
                            "edit1": { name: "Update - เปลี่ยนแปลง 'รับคืน' เป็น 'หน้างาน'", icon: "edit change-status", },
                            "edit2": { name: "Update - เปลี่ยนแปลง 'หน้างาน' เป็น 'รับคืน'", icon: "edit change-status", },
                            "sep1": "---------",
                            "history": { name: "History - ประวัติรายการ", icon: "fas fa-history" },
                            "invoice": { name: "Invoice - สั่งพิมพ์ใบงาน", icon: "fas fa-copy" },
                            "sep2": "---------",
                            "cancel1": { name: "Cancel - บันทึกผิด", icon: "delete", disabled: true },
                            "cancel2": { name: "Cancel - เปลี่ยนการรับแจ้ง", icon: "delete", disabled: true },
                            "cancel3": { name: "Cancel - เปลี่ยนแปลงสาเหตุ", icon: "delete", disabled: true },
                            "cancel4": { name: "Cancel - ยกเลิกรับคืน", icon: "delete", disabled: true },
                            "reject1": { name: "Reject - ยกเลิกสินค้า", icon: "delete reject-status", disabled: true },
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
                            //console.log("role_code is ", role_code);
                            //console.log("Status_text is ", Status_text);
                            //console.log("type_text is ", type_text);
                            //console.log("assige is ", assige);
                            //console.log("item_status is ", item_status);

                            if ((assige == "IVC" && role_code == "IVC" && Status_text == "Open") || (assige == "TRP" && role_code == "TRP" && Status_text == "Open") || (assige == "TRP" && role_code == "TRP" && Status_text == "On Process") || (role_code == "IVC" && Status_text == "On Process") || (role_code == "IVC" && Status_text == "Receive")) {// kung edit 25/11/20
                                $('.context-menu-icon-edit').removeClass('context-menu-disabled');

                            } else {
                                $('.context-menu-icon-edit').addClass('context-menu-disabled');

                                if (assige == "TRP" && Status_text == "Open" && role_code == "IVC") {
                                    $('.context-menu-icon-edit').removeClass('context-menu-disabled');
                                }

                            }

                            if (role_code == "CN-ADMIN") {

                                $('.context-menu-icon-delete').removeClass('context-menu-disabled');

                                $('.change-status').removeClass('context-menu-disabled');


                            } else {

                                $('.context-menu-icon-delete').addClass('context-menu-disabled');

                                $('.change-status').addClass('context-menu-disabled');

                            }

                            if (name === 'ongkarn.s' || name === 'kritsana.j' || name === 'potjana.p') {

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

};

$.Details = async function (citem) {

    let Get_Detail = new URL(lists_history);

    Get_Detail.search = new URLSearchParams({
        cn_pre_job_id: citem['cn_id'],
        record_status: '1',
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
                text: 'Something went wrong!',
                //footer: '<a href>Why do I have this issue?</a>'
            }).then((result) => {
                if (result.isConfirmed) {

                    location.reload();

                }
            })


        } else {
            //get data deatil last one
            let array = result.data
            let deatailDriver = array[array.length - 1].cn_pre_job_detail_driver;
            let deatailPickupDate = array[array.length - 1].cn_pre_job_detail_pickup_date;
            let deatailRemark = array[array.length - 1].cn_pre_job_detail_remark;
            deatailCondition = array[array.length - 1].cn_pre_job_detail_item_condition;

            $('#frm_data').find('#pick_up_remark').val(deatailRemark);
            $('#frm_data').find('#driver_name').val(deatailDriver);
            $('#frm_data').find('#pick_up_date').val(moment(deatailPickupDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss'));

            if (deatailCondition == "1") { // get checked
                $('.item_condition').replaceWith('<div class="col-sm-9 item_condition"><input  class="col-sm-2" type="radio" id="item_good" name="item_condition" value="1" disabled  checked="checked" required><label for="good">สมบูรณ์</label><br><input class="col-sm-2" type="radio" id="item_bad" name="item_condition" value="2" disabled required><label for="bad">ไม่สมบูรณ์</label><br></div>');
                $('#frm_data').find('input').prop("disabled", true);
            } else if (deatailCondition == "2") {
                $('.item_condition').replaceWith('<div class="col-sm-9 item_condition"><input  class="col-sm-2" type="radio" id="item_good" name="item_condition" value="1" disabled required><label for="good">สมบูรณ์</label><br><input class="col-sm-2" type="radio" id="item_bad" name="item_condition" value="2" checked="checked" disabled required><label for="bad">ไม่สมบูรณ์</label><br></div>');
            } else {
                $('.item_condition').replaceWith('<div class="col-sm-9 item_condition"><input  class="col-sm-2" type="radio" id="item_good" name="item_condition" value="1" disabled required><label for="good">สมบูรณ์</label><br><input class="col-sm-2" type="radio" id="item_bad" name="item_condition" value="2" disabled required><label for="bad">ไม่สมบูรณ์</label><br></div>');
            }
        }

    });

    $('.hide_job_status').hide();

    $('#frm_data').find('input').prop("disabled", true);

    if (citem['cn_status'] == "open") {
        $('#frm_data').find('#job_status').css('color', 'red');
    } else if (citem['cn_status'] == "on_process") {
        $('#frm_data').find('#job_status').css('color', 'orange');
    } else if (citem['cn_status'] == "receive") {
        $('#frm_data').find('#job_status').css('color', 'green');
    } else if (citem['cn_status'] == "complete") {
        $('#frm_data').find('#job_status').css('color', 'green');
    } else if (citem['cn_status'] == "rejected") {
        $('#frm_data').find('#job_status').css('color', 'red');
    } else if (citem['cn_status'] == "cancel") {
        $('#frm_data').find('#job_status').css('color', '#FFC300');
    }

    //$('[name=item_condition]').on('change', function () {
    //    alert($('input[name=item_condition]:checked').val());
    //});

    $('#frm_data').find('#cn_datetime').val(moment(citem['cn_datetime'], 'YYYY-MM-DD').format('DD/MM/YYYY') + "  " + moment(citem['cn_datetime']).format('HH:mm:ss')).prop("disabled", true);
    $('#frm_data').find('#job_status').val(citem['cn_status']).prop("disabled", true);
    $('#frm_data').find('#job_assige').val(citem['cn_job_assige']).prop("disabled", true);
    $('#frm_data').find('#salefile_number').val(citem['salefile_number']).prop("disabled", true);
    $('#frm_data').find('#saletra_item_name').val(citem['saletra_item_name']).prop("disabled", true);
    $('#frm_data').find('#cn_qty').val(citem['cn_qty']);
    $('#frm_data').find('#created_by').val(citem['created_by']);
    $('#frm_data').find('#source_site_code').val(citem['cn_type'] !== '2' ? 'รับคืน' : 'หน้างาน');
    $('#frm_data').find('#job_comment').val(citem['job_comment']).change().prop("disabled", true);

};

$.Edit = async function (citem) {

    let status = citem['cn_status'];
    let cn_pre_job_detail_status;
    let cn_pre_job_detail_assige = citem['cn_job_assige'];
    let cn_type = citem['cn_type'];

    if (role_code == "IVC") {

        setTimeout(function () {
            $('input[name=item_condition]').prop('disabled', false);
            $('.hide_job_status').show();
            $('#pick_up_status').prop('disabled', false);
            $('#pick_up_remark').prop('disabled', false);
            $('#driver_name').prop('disabled', false); /// สามารถแก้ได้ทุกสถานะ
        }, 1000);

    } else {

        setTimeout(function () {
            $('input[name=item_condition]').removeAttr('required');
            $('#driver_name').prop('disabled', false);
            $('#pick_up_date').prop('disabled', true);
            $('#pick_up_status').prop('disabled', false);
            $('#pick_up_remark').prop('disabled', false);
        }, 1000);

    }

    if (role_code == "IVC") {

        cn_pre_job_detail_status = $('#job_status_edit option:selected').val();

        $('#job_status_edit').change(function () {
            cn_pre_job_detail_status = $('#job_status_edit option:selected').val();
        })


        cn_pre_job_detail_assige = "IVC"

    } else if (role_code == "TRP") {
        if (status == "open" && cn_type == "1") {
            cn_pre_job_detail_assige = "TRP" // เมื่อ TRP เข้ารับของแล้วจะส่งต่อให้ IVC
            cn_pre_job_detail_status = "on_process"
        }
        else if (status == "on_process" && cn_type == "1") {
            cn_pre_job_detail_assige = "TRP" // เมื่อ TRP เข้ารับของแล้วจะส่งต่อให้ IVC
            cn_pre_job_detail_status = "on_process"
        }
    }


    if (name === 'ongkarn.s' || name === 'kritsana.j' || name === 'potjana.p') {

        $('#frm_data').find('#job_comment').prop('disabled', false)
        //$('#frm_data').find('#cn_qty').prop('disabled', false)

    } else {

        $('#frm_data').find('#job_comment').prop('disabled', true)
        //$('#frm_data').find('#cn_qty').prop('disabled', true)
    } 

    

    $('#btn-save_exit').click(function (e) {
        $('#frm_data').parsley().on('form:submit', function () {
            $('#modal-frm_data').modal('hide');

            $("#global-loader").fadeIn("slow");

            $('.btn-save_form').prop('disabled', true);
            let item_condition = $('input[name=item_condition]:checked').val();

            if (item_condition == undefined) {
                item_condition = '';
            } else {
                item_condition = $('input[name=item_condition]:checked').val();
            }
            // Model & Repo
            let edit_data = {
                cn_pre_job_id: citem['cn_id'],
                cn_pre_job_detail_assige: cn_pre_job_detail_assige,
                cn_pre_job_detail_driver: $('#frm_data').find('#driver_name').val(),
                cn_pre_job_detail_pickup_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                cn_pre_job_detail_status: cn_pre_job_detail_status,
                cn_pre_job_detail_remark: $('#frm_data').find('#pick_up_remark').val(),
                cn_pre_job_detail_item_condition: item_condition,
                cn_pre_job_detail_comment: $('#job_comment').val(),
                created_by: name,
                updated_by: name,
                record_status: '1',
                pMessage: ''
            };

            var params = [];
            for (const i in edit_data) {
                params.push(i + "=" + encodeURIComponent(edit_data[i]));
            }

            var resStatus = 0;

            fetch(update_detail, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params.join("&"),
            }).then(data => {
                resStatus = data.status
                return data.json();
            }).then(data => {
                resStatus = data.status;

                if (data.status === 'Error') {

                    toastr.error(data.error_message, async function () {

                        $("#global-loader").fadeIn("slow");

                        oTable.destroy();

                        $('.btn-save_form').prop('disabled', false);
                        $("#frm_data").parsley().reset();

                        $('#modal-frm_data').modal('hide');
                        $.List('Search');

                    });

                } else {

                    toastr.success('Save Successfully!', async function () {

                        $("#global-loader").fadeIn("slow");

                        oTable.destroy();

                        $('.btn-save_form').prop('disabled', false);
                        $("#frm_data").parsley().reset();

                        // $.Invoice(cn_jobno, salefile_number, gbarcode, salefile_invcode)
                        //  $.Invoice(citem['cn_pre_job_jobno'], citem['salefile_number'], citem['saletra_item_barcode'], citem['salefile_invcode'])

                        $('#modal-frm_data').modal('hide');

                        $.List('Search');

                    });

                }

            }).catch(error => {
                toastr.error(error, 'Error writing document');
                //console.error("Error writing document: ", error);
            })

            return false;

        });
    });


};

$.History = async function (citem) {

    let url_history = new URL(lists_history);


    $('#modal-frm_data').modal('hide');


    url_history.search = new URLSearchParams({
        cn_pre_job_id: citem['cn_id'],
        record_status: '1',
    });

    fetch(url_history).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                //footer: '<a href>Why do I have this issue?</a>'
            }).then((result) => {
                if (result.isConfirmed) {

                    location.reload();

                }
            })


        } else {
            $('#modal-frm_history').modal('show');

            //$('#tbl-list-history').css({ "table-layout": "fixed", "width": "100%" });
            $('#tbl-list-history').css({ "width": "100%" });

            console.log(citem)

            $('#modal-frm_history').find('.modal-title').html('ประวัติรายการ :  ' + citem['salefile_number'] + ' - ' + citem['saletra_empname'])

            history_Table = $('#tbl-list-history').DataTable({
                data: result.data,
                //scrollX: true,
                //scrollCollapse: true,
                // autoWidth: true,
                paging: true,
                columns: [
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
                        title: "<span style='font-size:11px;'>ผู้รับผิดชอบ</span>",
                        data: "cn_pre_job_detail_assige",
                        //width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>คนขับรถ</span>",
                        data: "cn_pre_job_detail_driver",
                        //width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data == null) {
                                return '<span>' + "" + '</span>';

                            } else {
                                return '<span>' + data + '</span>';
                            }
                        }
                    }, //5
                    {
                        title: "<span style='font-size:11px;'>สถานะ</span>",
                        data: "cn_pre_job_detail_status",
                        //width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {

                            if (data == 'open') {
                                return '<span style="color:red; ">Open</span>';
                            } else if (data == "on_process") {
                                return '<span style="color:orange;">On Process</span>';
                            } else if (data == "receive") {
                                return '<span style="color:green;">Receive</span>';
                            } else if (data == "complete") {
                                return '<span style="color:green;">Complete</span>';
                            } else if (data == "rejected") {
                                return '<span style="color:red;">Rejected</span>';
                            } else if (data == "change") {
                                return '<span style="color:#00AEFF;">Change</span>';
                            } else if (data == "cancel") {
                                return '<span style="color:#FFC300">Cancel</span>';
                            } else {
                                return '<span style="color:#000">' + data + '</span>';
                            }

                        }
                    }, //6
                    {
                        title: "<span style='font-size:11px;'>สาเหตุ</span>",
                        data: "cn_pre_job_detail_comment",
                        width: "150px",
                        //visible: false,
                        class: "tx-center",

                        render: function (data, type, row, meta) {

                            let job_comment_obj = job_comment_dataSet.find(obj => obj.id === data);
                            return '<span style="font-size:11px;">' + job_comment_obj.text + '</span>';

                        }

                    }, //7
                    {
                        title: "<span style='font-size:11px;'>หมายเหตุ</span>",
                        data: "cn_pre_job_detail_remark",
                        //width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data == null) {
                                return '<span style="font-size:11px;">' + "" + '</span>';

                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //8
                    {
                        title: "<span style='font-size:11px;'>สภาพสินค้า</span>",
                        data: "cn_pre_job_detail_item_condition",
                        //width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data == "1") {
                                return '<span style="color:green;">สมบูรณ์ </span>';
                            } else if (data == "2") {
                                return '<span style="color:red;">ไม่สมบูรณ์ </span>';
                            } else {
                                return '<span> </span>';
                            }
                        }
                    }, //9

                ],

            });




        }
    })
};

$.Invoice = async function (cn_jobno, salefile_number, gbarcode, salefile_invcode) { // kung create function 17/11/20
    $('#modal-frm_data').modal('hide');
    //window.location.href = export_invoice +
    //    '?cn_pre_job_jobno=' + cn_jobno +
    //    '&salefile_number=' + salefile_number +
    //    '&gbarcode=' + gbarcode +
    //    '&salefile_invcode=' + salefile_invcode;

    let url = export_invoice + '?cn_pre_job_jobno=' + cn_jobno + '&salefile_number=' + salefile_number + '&gbarcode=' + gbarcode + '&salefile_invcode=' + salefile_invcode;
    window.open(url, '_blank');

    $.addLogEvent(cn_jobno, 'VSM', 'Print', 'cn/job_list', 'OK');
};

$.Cancel = async function (citem, job_cancel) {

    console.log(citem)

    $('#modal-frm_data').modal('hide');

    Swal.fire({
        title: '<span style="font-size:18px;">ยืนยันการยกเลิกใบงาน ' + citem['salefile_number'] + ' หรือไม่ ? </span>',
        html: '<span style="font-size:14px;">รหัสอ้างอิง ' + citem['cn_pre_job_jobno'] + '</span>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {

        if (result.isConfirmed) {

            let edit_data = {
                cn_pre_job_id: citem['cn_id'],
                cn_pre_job_detail_assige: 'ADM',
                cn_pre_job_detail_driver: '',
                cn_pre_job_detail_pickup_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                cn_pre_job_detail_status: 'cancel',
                cn_pre_job_detail_remark: job_cancel,
                cn_pre_job_detail_item_condition: '',
                cn_pre_job_detail_comment: citem['job_comment'],
                created_by: name,
                updated_by: name,
                record_status: '1',
                pMessage: ''
            };

            var params = [];
            for (const i in edit_data) {
                params.push(i + "=" + encodeURIComponent(edit_data[i]));
            }

            var resStatus = 0;

            fetch(update_detail, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params.join("&"),
            }).then(data => {
                resStatus = data.status
                return data.json();
            }).then(data => {
                resStatus = data.status;
                /*
                if (data.status === 'Error') {

                    toastr.error(data.error_message, async function () {

                        $("#global-loader").fadeIn("slow");

                        oTable.destroy();

                        $.List('Search');

                    });

                } else {
                */
                toastr.success('Save Successfully!', async function () {

                    $("#global-loader").fadeIn("slow");

                    oTable.destroy();

                    $.List('Search');

                });

                // }

            }).catch(error => {
                toastr.error(error, 'Error writing document');
                //console.error("Error writing document: ", error);
            })

            /*
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            */
        }
    })


    $.addLogEvent(citem, 'VSM', 'Cancel', 'cn/job_list', 'OK');

}

$.Reject = async function (citem, job_cancel) {

    console.log(citem)

    $('#modal-frm_data').modal('hide');

    Swal.fire({
        title: '<span style="font-size:18px;">ยืนยันการยกเลิกใบงาน ' + citem['salefile_number'] + ' หรือไม่ ? </span>',
        html: '<span style="font-size:14px;">รหัสอ้างอิง ' + citem['cn_pre_job_jobno'] + '</span>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {

        if (result.isConfirmed) {

            let edit_data = {
                cn_pre_job_id: citem['cn_id'],
                cn_pre_job_detail_assige: 'ADM',
                cn_pre_job_detail_driver: '',
                cn_pre_job_detail_pickup_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                cn_pre_job_detail_status: 'rejected',
                cn_pre_job_detail_remark: 'Reject - ยกเลิกสินค้า',
                cn_pre_job_detail_item_condition: '',
                cn_pre_job_detail_comment: citem['job_comment'],
                created_by: name,
                updated_by: name,
                record_status: '1',
                pMessage: ''
            };

            var params = [];
            for (const i in edit_data) {
                params.push(i + "=" + encodeURIComponent(edit_data[i]));
            }

            var resStatus = 0;

            fetch(update_detail, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params.join("&"),
            }).then(data => {
                resStatus = data.status
                return data.json();
            }).then(data => {
                resStatus = data.status;
                /*
                if (data.status === 'Error') {

                    toastr.error(data.error_message, async function () {

                        $("#global-loader").fadeIn("slow");

                        oTable.destroy();

                        $.List('Search');

                    });

                } else {
                */
                toastr.success('Save Successfully!', async function () {

                    $("#global-loader").fadeIn("slow");

                    oTable.destroy();

                    $.List('Search');

                });

                // }

            }).catch(error => {
                toastr.error(error, 'Error writing document');
                //console.error("Error writing document: ", error);
            })

            /*
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            */
        }
    })


    $.addLogEvent(citem, 'VSM', 'Reject', 'cn/job_list', 'OK');

}

$.Delete = async function (citem) {

    $('#btn-save_exit').html('Delete').show();
    $('#btn-save_exit').removeClass('btn-primary').addClass('btn-danger');

    $('#btn-save_exit').click(function (e) {

        let submit_action = $(this).data('action');

        $('#frm_data').parsley().on('form:submit', function () {

            $('.btn-save_form').prop('disabled', true);

            let data_citem = {
                record_status: 'D',
                updated_by: "SYSTEM",
                updated_date: new Date()
            };

            fs.collection(collection).doc(citem['schedule_id']).update(data_citem).then(function () {

                toastr.options = {
                    "closeButton": false, // true/false
                    "debug": false, // true/false
                    "newestOnTop": false, // true/false
                    "progressBar": true, // true/false
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300", // in milliseconds
                    "hideDuration": "500", // in milliseconds
                    "timeOut": "900", // in milliseconds
                    "extendedTimeOut": "900", // in milliseconds
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };

                toastr.success('Save Successfully!', function () {

                    setTimeout(function () {
                        $('#modal-frm_data').modal('hide');
                        location.reload();
                    }, 1000);

                });

            }).catch(function (error) {

                toastr.error(error, 'Error writing document');
                console.error("Error writing document: ", error);

            });

            return false;

        });

    });

};

$.UpdateStatus = async function (citem, comment, assige) {

    console.log(citem)

    $('#modal-frm_data').modal('hide');

    Swal.fire({
        title: '<span style="font-size:18px;">ยืนยันการ' + comment + ' ' + citem['salefile_number'] + ' หรือไม่ ? </span>',
        html: '<span style="font-size:14px;">รหัสอ้างอิง ' + citem['cn_pre_job_jobno'] + '</span>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {

        if (result.isConfirmed) {

            let edit_data = {
                cn_pre_job_id: citem['cn_id'],
                cn_pre_job_detail_assige: 'ADM',
                cn_pre_job_detail_driver: '',
                cn_pre_job_detail_pickup_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                cn_pre_job_detail_status: 'change',
                cn_pre_job_detail_remark: comment,
                cn_pre_job_detail_item_condition: '',
                cn_pre_job_detail_comment: citem['job_comment'],
                created_by: name,
                updated_by: name,
                record_status: '1',
                pMessage: ''
            };

            var params = [];
            for (const i in edit_data) {
                params.push(i + "=" + encodeURIComponent(edit_data[i]));
            }

            var resStatus = 0;

            fetch(update_detail, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params.join("&"),
            }).then(data => {
                resStatus = data.status
                return data.json();
            }).then(data => {
                resStatus = data.status;

                let edit_change_data

                if (assige == 'IVC') {

                    edit_change_data = {
                        cn_pre_job_id: citem['cn_id'],
                        cn_pre_job_detail_assige: 'IVC',
                        cn_pre_job_detail_driver: '',
                        cn_pre_job_detail_pickup_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                        cn_pre_job_detail_status: 'open',
                        cn_pre_job_detail_remark: comment,
                        cn_pre_job_detail_item_condition: '',
                        cn_pre_job_detail_comment: citem['job_comment'],
                        created_by: name,
                        updated_by: name,
                        record_status: '1',
                        pMessage: ''
                    };

                } else if (assige == 'TRP') {

                    edit_change_data = {
                        cn_pre_job_id: citem['cn_id'],
                        cn_pre_job_detail_assige: 'TRP',
                        cn_pre_job_detail_driver: '',
                        cn_pre_job_detail_pickup_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                        cn_pre_job_detail_status: 'open',
                        cn_pre_job_detail_remark: comment,
                        cn_pre_job_detail_item_condition: '',
                        cn_pre_job_detail_comment: citem['job_comment'],
                        created_by: name,
                        updated_by: name,
                        record_status: '1',
                        pMessage: ''
                    };

                }

                var params_change = [];
                for (const i in edit_change_data) {
                    params_change.push(i + "=" + encodeURIComponent(edit_change_data[i]));
                }

                var resStatus = 0;

                fetch(update_detail, {
                    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                    // mode: 'no-cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    body: params_change.join("&"),
                }).then(data => {
                    resStatus = data.status
                    return data.json();
                }).then(data => {
                    resStatus = data.status;

                    toastr.success('Save Successfully!', async function () {

                        $("#global-loader").fadeIn("slow");

                        oTable.destroy();

                        $.List('Search');

                    });


                }).catch(error => {
                    toastr.error(error, 'Error writing document');
                    //console.error("Error writing document: ", error);
                })


            }).catch(error => {
                toastr.error(error, 'Error writing document');
                //console.error("Error writing document: ", error);
            })

        }
    })


    $.addLogEvent(citem, 'VSM', 'Cancel', 'cn/job_list', 'OK');

}

$(document).ready(async function () {

    await $.init();
    //$.LoadingOverlay("show");
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