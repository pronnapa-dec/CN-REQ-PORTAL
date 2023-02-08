'use strict';

let fs = firebase.firestore();
let oTable,  role_code, mode;

const url_api = "http://192.168.1.247/intranet/pur-api";

const objProfile = JSON.parse(localStorage.getItem('objProfile'));


$.init = function () {

    $.List();

};

$.List = async function (mode) {

    let url = new URL(lists_get);
    var CNdate_start
    var CNdate_end

    CNdate_start = $('#cn_date').val() != '' ? moment($('#cn_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment().format('YYYY-MM-DD') + ' 00:00';  //ถ้าไม่เลือกจะเป็นค่าว่าง
    CNdate_end = $('#cn_date').val() != '' ? moment($('#cn_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';

    url.search = new URLSearchParams({
        cn_pre_job_datetime_start: CNdate_start,
        cn_pre_job_datetime_end: CNdate_end,
        salefile_number: $('#invbook').val(),
        saletra_item_barcode: $('#barcode').val(),
        cn_pre_job_comment: $('#cn_comment').val(),
        created_by: $('#created_by_search').val(),
        cn_pre_job_status: $('#job_status_search').val(),
        cn_pre_job_jobno: $('#cn_pre_job_jobno_search').val(),
        cn_pre_job_assige: $('#cn_pre_job_assige_search').val(),
        record_status: '1',
        mode: 'search'
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
                        /*
                                                render: function (data, type, row, meta) {
                        
                                                    //ohm edit : 06/11/2020 18:00
                                                    let job_comment_obj = job_comment_dataSet.find(obj => obj.id === data);
                                                    return '<span style="font-size:11px;">' + job_comment_obj.text + '</span>';
                                                }
                        */
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
                                saletra_empname: data['saletra_empname'],
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
                            else if (key === 'reject1') {

                                $.Reject(citem, 'Reject - ยกเลิกสินค้า');

                            }
                            else if (key === 'edit2') {

                                $.UpdateStatus(citem, 'เปลี่ยนแปลง "หน้างาน" เป็น "รับคืน"', 'TRP');

                            }
                            else {

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
                            "sep3": "---------",
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

                            if ((assige == "IVC" && role_code == "IVC" && Status_text == "Open") || (assige == "TRP" && role_code == "TRP" && Status_text == "Open") || (role_code == "IVC" && Status_text == "On Process") || (assige == "TRP" && Status_text == "On Process") || (role_code == "IVC" && Status_text == "Receive")) {// kung edit 25/11/20
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