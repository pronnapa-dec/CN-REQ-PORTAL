'use strict';

let fs = firebase.firestore();
let collection = 'mrp_opt_purchaseplan';
let oTable, role_code, modeม, history_Table ;
let inventorycode_dataset = [];
let invfrecode_dataset = [];

const url_api = "http://localhost:49705/";

const lists_get = url_api + '/v1/BF_Cn_On_Job_Get';
const detail_get = url_api + '/v1/Cn_On_Job_Detail_Get';
const create_job = url_api + '/v1/cn_job_create';
const Cn_Lov_Get = url_api + '/v1/Cn_Lov_Get';

const objProfile = JSON.parse(localStorage.getItem('objProfile'));

var name;

let job_comment_dataSet = [];

let toDate = new Date();

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

    $('#btn-export').off('click').on('click', function (evt) {

        evt.preventDefault();

        $(this).on('click', function (evt) {
            evt.preventDefault();
        });

           let CNdate_start = $('#cn_date').val() != '' ? moment($('#cn_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + " 00:00" : moment().add(-365, 'days').format('YYYY-MM-DD') + " 00:00";
           let CNdate_end = $('#cn_date').val() != '' ? moment($('#cn_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + " 23:59" : moment().add(1, 'days').format('YYYY-MM-DD') + " 23:59";

           let url  = export_cn_job +
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
    $('#cn_date').val(moment().format('DD/MM/YYYY') + '-' + moment().format('DD/MM/YYYY'))

    $.getUserProfile = function () {

        $.each(objProfile.auth_role, function (key, val) {
            //console.log('role_code is:', val['role_code']);
            role_code = val['role_code'];
        });

    };
    $.getUserProfile();

    $('.hide').hide();

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

    let url = new URL(lists_get);
    var CNdate_start = $('#cn_date').val() != '' ? moment($('#cn_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment().format('YYYY-MM-DD') + ' 00:00';  //ถ้าไม่เลือกจะเป็นวันปัจจุบัน
    var CNdate_end = $('#cn_date').val() != '' ? moment($('#cn_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';

    url.search = new URLSearchParams({
        cn_pre_job_datetime_start: CNdate_start ,  
        cn_pre_job_datetime_end: CNdate_end,
        salefile_number: $('#invbook').val(),
        saletra_item_barcode: $('#barcode').val(),
        cn_pre_job_comment: $('#cn_comment').val(),
        created_by: $('#created_by_search').val(),
        cn_pre_job_jobno: $('#cn_pre_job_jobno_search').val(),
        record_status: '1',
        mode: mode
    });

    fetch(url).then(function (response) {
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

            oTable = $('#tbl-list').DataTable({
                data: result.data,
                //scrollX: true,
                //scrollCollapse: true,
                // autoWidth: true,
                destroy: true,
                paging: true,
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
                        title: "<span style='font-size:11px;'>Job No</span>",
                        data: "cn_pre_job_jobno",
                        width: "70px",
                        visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>วันที่/เวลา</span>",
                        data: "cn_pre_job_datetime",
                        width: "150px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '  ' + moment(data).format('hh:mm:ss') + '<span/>';
                        }
                    }, //3
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
                        title: "<span style='font-size:11px;'>ผู้รับผิดชอบ</span>",
                        data: "cn_pre_job_assige",
                        class: "tx-center assige",
                        width: "150px",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //6
                    {
                        title: "<span style='font-size:11px;'>เลขที่ใบเสร็จ</span>",
                        data: "salefile_number",
                        class: "tx-center",
                        width: "150px",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-uppercase" style="font-size:11px;">' + data + '</span>';
                        }
                    }, //7
                    {
                        title: "<span style='font-size:11px;'>รหัสลูกค้า</span>",
                        data: "salefile_invcode",
                        width: "70px",
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
                        title: "<span style='font-size:11px;'>ข้อมูลสินค้า</span>",
                        data: "saletra_item_name",
                        class: "tx-center",
                        width: "500px",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + row.saletra_item_barcode + " :" + data + "(" + row.saletra_item_spcodes + ")" + '</span>';
                        }
                    }, //10
                    {
                        title: "<span style='font-size:11px;'>Qty.</span>",
                        data: "cn_pre_job_qty",
                        class: "tx-center",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //11
                    {
                        title: "<span style='font-size:11px;'>การรับแจ้ง</span>",
                        data: "cn_pre_job_type",
                        class: "tx-center job_type",
                        width: "100px",
                        visible: false,
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
                        width: "200px",
                        visible: false,
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

                            //ohm edit : 06/11/2020 18:00
                            let job_comment_obj = job_comment_dataSet.find(obj => obj.id === data);
                            return '<span style="font-size:11px;">' + job_comment_obj.text + '</span>';

                            /*
                            if (data == 'EXT_CUS_01') {
                                return '<span>ลูกค้ายกเลิก สั่งซ้ำ ไม่ได้ใช้งาน </span>';
                            } else if (data == 'EXT_CUS_02') {
                                return '<span>ลูกค้าสั่งผิดรุ่น เปลี่ยนยี่ห้อใหม่ ไม่เหมือนตัวอย่าง</span>';
                            } else if (data == 'EXT_CUS_03') {
                                return '<span>ลูกค้าเปลี่ยนเอาแท้/เทียบ เปลี่ยนเอาแบบชุด</span>';
                            } else if (data == 'EXT_CUS_04') {
                                return '<span>รับคืนแบตเก่า</span>';
                            } else if (data == 'INT_SAL_01') {
                                return '<span>เซลล์จัดผิด ผิดรุ่น ผิดตำแหน่ง จัดเกิน จัดซ้ำ จัดไปเผื่อ</span>';
                            } else if (data == 'INT_SAL_02') {
                                return '<span>คืนสินค้าตัวอย่าง</span>';
                            } else if (data == 'INT_SUP_01') {
                                return '<span>คืนซัพพลาย</span>';
                            } else if (data == 'INT_SUP_02') {
                                return '<span>ชำรุด เป็นรอย เสียหาย แตกหัก รั่ว</span>';
                            } else {
                                return '-';
                            }
                            */
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
                        title: "<span style='font-size:11px;'>WH</span>",
                        data: "saletra_item_whdiscode",
                        class: "tx-center",
                        width: "70px",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //16
                    {
                        title: "<span style='font-size:11px;'>สถานะ</span>",
                        data: "cn_job_status",
                        class: "tx-center item_status",
                        width: "70px",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //17

                ],


                //"order": [[24, "desc"]],
                "initComplete": function (settings, json) {

                    // $.LoadingOverlay("hide");

                    $("#global-loader").fadeOut("slow");

                    //mode = '';
                    $.contextMenu({
                        selector: '#tbl-list tbody tr',
                        callback: async function (key, options) {

                            let data = oTable.row(this).data();
                            //console.log("key", key);
                            let citem = {
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
                                cn_on_job_id: data['cn_on_job_id'],
                                rettra_number: data['rettra_number'],
                            };

                            $('#modal-frm_data').modal({

                                keyboard: false,
                                backdrop: 'static'

                            });


                            if (key === 'view') {

                                $.Details(citem);
                            } else if (key === 'edit') {

                                await $.Details(citem);
                                await $.Edit(citem);

                            } else if (key === 'history') {

                                $.History(citem);

                            } else {

                                alert('ERROR');

                            }

                        },

                        items: {


                            "view": { name: "View", icon: "fas fa-search" },
                            "edit": { name: "Edit", icon: "edit edit-detail", disabled: true},
                            "sep1": "---------",
                            "history": { name: "History - ประวัติรายการ", icon: "fas fa-history"},
                        }

                    });


                    $("tbody").contextmenu(function (key) {
                        setTimeout(function () {
                            console.log('clicked', this);
                            let assige = $('.context-menu-active .assige span').html();
                            let status = $('.context-menu-active .item_status span').html();

                            if (role_code == assige || role_code == "CN-DEV") { //buttom edit
                                $('.context-menu-icon-edit').removeClass('context-menu-disabled');
                            } else {
                                $('.context-menu-icon-edit').addClass('context-menu-disabled');
                            }

                            //if (status != "complete") { //buttom history
                            //    $('.context-menu-icon-history').removeClass('context-menu-disabled');
                            //} else {
                            //    $('.context-menu-icon-history').addClass('context-menu-disabled');
                            //}

                        }, 200);
                    });
                },
            });
        }
    })

};

$.Details = async function (citem) {

    //console.log('Details', citem);
    //console.log('Details Start', new Date());
    let Get_Detail = new URL(detail_get);

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
            let array = result.data;
            if (array.length > 0) {
                let cn_on_job_type = array[array.length - 1].cn_on_job_type;
                $('#frm_data').find('#cn_on_job_type').val(cn_on_job_type);
            } else {
                $('#frm_data').find('#cn_on_job_type').val('');

            }
        }

    });


    $('.btn-save_form').hide();

    $('#frm_data').find('input').prop("readonly", true);
    $('#frm_data').find('select').prop("disabled", true);

    if (citem['cn_status'] == "open") {
        $('#frm_data').find('#job_status').css('color', 'red');
    } else if (citem['cn_status'] == "on_process") {
        $('#frm_data').find('#job_status').css('color', 'orange');
    } else if (citem['cn_status'] == "receive") {
        $('#frm_data').find('#job_status').css('color', 'green');
    }


    $('#frm_data').find('#cn_datetime').val(moment(citem['cn_datetime'], 'YYYY-MM-DD').format('DD/MM/YYYY') + "  " + moment(citem['cn_datetime']).format('HH:mm:ss')).prop("disabled", true);
    $('#frm_data').find('#job_status').val(citem['cn_status']).prop("disabled", true);
    $('#frm_data').find('#job_assige').val(citem['cn_job_assige']).prop("disabled", true);
    $('#frm_data').find('#salefile_number').val(citem['salefile_number']).prop("disabled", true);
    $('#frm_data').find('#saletra_item_name').val(citem['saletra_item_name']).prop("disabled", true);
    $('#frm_data').find('#cn_qty').val(citem['cn_qty']);
    $('#frm_data').find('#created_by').val(citem['created_by']);
    $('#frm_data').find('#source_site_code').val(citem['cn_type'] !== '2' ? 'รับคืน' : 'หน้างาน');
    $('#frm_data').find('#job_comment').val(citem['job_comment']).change().prop("disabled", true);
    if (citem['rettra_number'] != '') {
        $('#frm_data').find('#rettra_number').val(citem['rettra_number']);
        //$('#frm_data').find('select #claim').prop('disabled', true);
        //$('#frm_data').find('select #eo').prop('disabled', true);
        //$('#frm_data').find('select #cn').removeAttr('disabled');

    } else {
        $('#frm_data').find('#rettra_number').val('');
        //$('#frm_data').find('select #cn').prop('disabled', true);
        //$('#frm_data').find('select #claim').removeAttr('disabled');
        //$('#frm_data').find('select #eo').removeAttr('disabled');

    }
    
};

$.Summit_CN = function (citem) {
    $('#modal-frm_data').modal('hide');
    $("#global-loader").fadeIn("slow");
    let cn_on_job_assige, cn_on_job_status;

    if ($('#cn_on_job_type').val() == "CN") {
        cn_on_job_assige = "IVC";
        cn_on_job_status = "pending"
    } else if ($('#cn_on_job_type').val() == "claim") {
        cn_on_job_assige = "PT";
        cn_on_job_status = "pending"
    } else if ($('#cn_on_job_type').val() == "EO") {
        cn_on_job_assige = "ADM";
        cn_on_job_status = "pending"
    }

    // Model & Repo
    let add_data = {
        cn_pre_job_id: citem['cn_id'],
        cn_on_job_assige: cn_on_job_assige,
        cn_on_job_status: cn_on_job_status,
        cn_on_job_type: $('#cn_on_job_type').val(),
        cn_on_job_detail_remark: $('#cn_on_job_detail_remark').val(),
        record_status: '1',
        cn_pre_job_jobno: citem['cn_jobno'],
        cn_on_jobno: $('#rettra_number').val(),
        created_by: name,
        pMessage: ''

    };

    var params = [];
    for (const i in add_data) {
        params.push(i + "=" + encodeURIComponent(add_data[i]));
    }

    fetch(create_job, {
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
            toastr.error(data.error_message, async function () {
                $.List('Search');
            });

        } else {

            toastr.success('Save Successfully!', async function () {
                $('#btn-save_form').prop('disabled', false);
                $("#frm_data").parsley().reset(); 
                $.List('Search');
            });
        }

    }).catch((error) => {
        toastr.error(error, 'Error writing document');
        console.error('Error:', error);
    });

    return false;

}

$.Edit = async function (citem) {
    $('#frm_data #cn_on_job_type').prop("disabled", false);
    $('#frm_data #cn_on_job_detail_remark').removeAttr("readonly");

    $('.btn-save_form').show();

    $('#btn-save_exit').click(function (e) {
        $('#frm_data').parsley().on('form:submit', function () {

            $('#btn-save_form').prop('disabled', false);

            if ($('#cn_on_job_type').val() == "EO") { //ถ้าเลือกประเภทเป็น EO 
                if (citem['saletra_item_whdiscode'] == "EO") { //ประเภทของสินค้าในระบบ
                    $.Summit_CN(citem);
                } else {
                    toastr.error('ประเภทสินค้านี้ไม่ใช่ EO');
                }
            } else {
                //alert('else');
                $.Summit_CN(citem);
            }
            return false;
        });
    });


};

$.History = async function (citem) {

    let url_history = new URL(detail_get);


    $('#modal-frm_data').modal('hide');
    console.lo

    url_history.search = new URLSearchParams({
        cn_on_job_id: citem['cn_on_job_id'],
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


            history_Table = $('#tbl-list-history').DataTable({
                data: result.data,
                //scrollX: true,
                //scrollCollapse: true,
                // autoWidth: true,
                paging: true,
                columns: [
                    {
                        title: "<span style='font-size:11px;'>เลขที่ CN</span>",
                        data: "cn_on_jobno",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data == null) {
                                return '<span style="font-size:11px;"> </span>';
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //1 
                    {
                        title: "<span style='font-size:11px;'>วันที่/เวลา</span>",
                        data: "created_date",
                        class: "tx-center assige",
                        width: "150px",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '  ' + moment(data).format('HH:mm') + '<span/>';
                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>บันทึกโดย</span>",
                        data: "created_by",
                        class: "tx-center",
                        width: "150px",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //3

                    {
                        title: "<span style='font-size:11px;'>รับผิดชอบ</span>",
                        data: "cn_on_job_detail_assige",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>สถานะ</span>",
                        data: "cn_on_job_detail_status",
                        width: "150px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data == "pending") {
                                return '<span style="font-size:11px;">' + 'PT พิจรณาสินค้า' + '</span>';
                            } else if (data == "claimable") {
                                return '<span style="font-size:11px;">' + 'เคลมได้' + '</span>';
                            } else if (data == "return") {
                                return '<span style="font-size:11px;">' + 'ไม่รับเคลม' + '</span>';
                            } else if (data == "supplier") {
                                return '<span style="font-size:11px;">' + 'ส่งสินค้าให้ Supplier' + '</span>';
                            }else if (data == "complete") {
                                return '<span style="font-size:11px;">' + 'รอพิจารณา CN' + '</span>';
                            }
                        }
                    }, //5
                    {
                        title: "<span style='font-size:11px;'>หมายเหตุ</span>",
                        data: "cn_on_job_detail_remark",
                        class: "tx-center",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //6

                ],

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