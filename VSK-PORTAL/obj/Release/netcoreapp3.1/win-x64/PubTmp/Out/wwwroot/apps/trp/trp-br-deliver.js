'use strict';
var name;
let validator, table, options, item_action, item_id, deatailCondition;
let fs = firebase.firestore();
let oTable, history_Table, role_code, mode;
let inventorycode_dataset = [];
let invfrecode_dataset = [];
let invname_dataSet = [];
let invname_dataSet_list = [];
let job_comment_dataSet = [];
let job_route_dataSet = [];
let citem_job_point = [];
const objProfile = JSON.parse(localStorage.getItem('objProfile'));
const url_api = "http://localhost:49705/";
const url_brtra_get = url_api + '/api/Br_Brtra_Get';
const url_brtra_history = url_api + '/api/Br_Brtra_History';
const url_brtra_history_deliver = url_api + '/api/Br_Brtra_History_Deliver';
const url_brtra_lov = url_api + '/api/Br_Brtra_Lov';
const url_brtra_lov_route = url_api + '/api/Br_Lov_Route_Get';
const url_brtra_deliver_job = url_api + '/api/Br_Deliver_Job';
const url_brtra_lov_deiver = url_api + '/api/Br_Lov_Driver_Get';

$.init = function () {

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

    $('#btn-clear').on('click', function (e) {

        e.preventDefault();

        $('#frm_data').find('#deliver_driver').val('').prop('readonly', false);

        $('#frm_data #driver_name').html('');
        $('#frm_data #driver_id').html('');

    });

    $('#modal-frm_history').on('hidden.bs.modal', function () {

        history_Table.destroy();
    });

    $('#modal-frm_data').on('hidden.bs.modal', function () {

        $("#frm_data").parsley().reset();
    });

    $.List(); 

};

$.List = async function () {

    $.Load_user();

    let url = new URL(url_brtra_get);
    var trndate_start;
    var trndate_end;

    trndate_start = $('#job_date').val() != '' ? moment($('#job_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment('1991-01-01').format('YYYY-MM-DD') + ' 00:00';  //ถ้าไม่เลือกจะเป็นค่าว่าง
    trndate_end = $('#job_date').val() != '' ? moment($('#job_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';

    url.search = new URLSearchParams({

        trndate_start: trndate_start,
        trndate_end: trndate_end,
        job_no: $('#frm_search').find('#job_no').val() === '' ? '' : $('#frm_search').find('#job_no').val(),
        created_by: $('#frm_search').find('#created_by').val() === '' ? '' : $('#frm_search').find('#created_by').val(),
        invname: $('#frm_search').find('#invname').val() === '' ? '' : $('#frm_search').find('#invname').val(),
        status_qty: $('#frm_search').find('#status_qty').val() === '' ? '' : $('#frm_search').find('#status_qty').val(),

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
                //scrollX: true,
                //scrollCollapse: true,
                // autoWidth: true,
                paging: true,
                columns: [
                    {
                        title: "<span style='font-size:11px;'>วันที่ BR</span>",
                        data: "bl_job_date",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '<span/>';
                        }
                    }, //1 
                    {
                        title: "<span style='font-size:11px;'>เลขที่ BR</span>",
                        data: "bl_job_no",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>สาขา</span>",
                        data: "bl_invname",
                        width: "300px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>จำนวนปัจจุบัน</span>",
                        data: "bl_job_detail_qty",
                        class: "tx-center bl_job_detail_qty",
                        width: "70px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;  color:OrangeRed;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>จำนวนทั้งหมด</span>",
                        data: "bl_job_qty",
                        class: "tx-center bl_job_qty",
                        width: "70px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;  color:DarkGreen;">' + data + '</span>';
                        }
                    }, //5

                    {
                        title: "<span style='font-size:11px;'>สถานะ</span>",
                        data: "bl_status_qty",
                        class: "tx-center job_status",
                        width: "50px",
                        render: function (data, type, row, meta) {
                            if (data == 'success') {
                                return '<span class="badge badge-primary">สำเร็จ</span >'
                            } else if (data == 'pending') {
                                return '<span class="badge badge-danger">ไม่สำเร็จ</span >'

                            }
                        }
                    }, //6
                    {
                        title: "<span style='font-size:11px;'>บันทึกโดย</span>",
                        data: "bl_created_by",
                        class: "tx-center",
                        width: "100px",
                        // visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //7
                    {
                        title: "<span style='font-size:11px;'>การจัดส่ง</span>",
                        data: "deliver_status",
                        class: "tx-center job_status",
                        width: "50px",
                        render: function (data, type, row, meta) {
                            if (data == '1') {
                                return '<span title="กำลังจัดส่ง"><i class="fas fa-truck text-success"></i></span>' 
                            } else if (data == null) {
                                //return '<span class="badge badge-warning">รอดำเนินการ</span >'
                                return ''
                            } else {
                                return '-'
                            }
                        }
                    }, //8
                ],
                "order": [[1, "desc"]],
                "initComplete": function (settings, json) {

                    // $.LoadingOverlay("hide");

                    $("#global-loader").fadeOut("slow");

                    $.contextMenu({
                        selector: '#tbl-list tbody tr',
                        callback: async function (key, options) {

                            let data = oTable.row(this).data();
                            let citem = {
                                job_date: data['bl_job_date'],
                                job_no: data['bl_job_no'],
                                invname: data['bl_invname'],
                                job_qty: data['bl_job_qty'],
                                job_detail_qty: data['bl_job_detail_qty'],
                                created_by: data['bl_created_by'],
                                created_date: data['bl_created_date'],
                                record_status: data['bl_record_status'],
                            };

                            $('#modal-frm_data').modal({

                                keyboard: false,
                                backdrop: 'static'

                            });

                            if (key === 'edit') {

                                //await $.Details(citem);
                                await $.Edit(citem);

                            } else if (key === 'history') {
                                $("#global-loader").fadeIn("slow");
                                $.History(citem);

                            } else {

                                alert('ERROR');

                            }

                        },
                        items: {
                            //"view": { name: "View", icon: "fas fa-search" },
                            "edit": { name: "Edit", icon: "edit", disabled: true },
                            "history": { name: "History", icon: "fas fa-history" },
                        }
                    });

                    $("tbody").contextmenu(function (key) {
                        setTimeout(function () {

                            let bl_job_qty = $('.context-menu-active .bl_job_qty span').html();
                            let bl_job_detail_qty = $('.context-menu-active .bl_job_detail_qty span').html();

                            if (bl_job_qty == bl_job_detail_qty) {

                                $('.context-menu-icon-edit').removeClass('context-menu-disabled');

                            } else {

                                $('.context-menu-icon-edit').addClass('context-menu-disabled');

                            };

                        }, 200);
                    });

                },
            });



        }
    })

};

$.Edit = async function (citem) {

    //$.Load_route();
    $.Load_driver();
    $.History_deliver(citem);

    $('.btn-save_form').show();
    $('.parsley-errors-list').remove();
    //$('#frm_data input').removeClass('parsley-success');
    $('#frm_data input').removeClass('parsley-error');
    $('#frm_data input').val('');
    $('#frm_data textarea').val('');
    $('#frm_data select').val('');
    $('#frm_data #driver_name').html('');
    $('#frm_data #driver_id').html('');


    //alert(invname);

    $('#frm_data').find('#deliver_driver').val('').prop('readonly', false);
    $('#frm_data').find('#brtra_number').val(citem['job_no']).prop('readonly', true);
    $('#frm_data').find('#deliver_route').val(citem['invname']).prop('readonly', true);
    //$('#tbl-list-deliver').find('tbody').html('')

    var created_date = moment(citem['created_date']).format('DD/MM/YYYY HH:mm:ss')
    $('#frm_data').find('#check_by').html(citem['created_by'] + ' (' + created_date + ') ');

    $('#btn-save_exit').on('click', function () {
        console.log('click');
        $('#frm_data').parsley().on('form:submit', function () {
            console.log('submit');

            $("#global-loader").fadeIn("slow");

            let invname = citem['invname']
            let branch;
            if (invname == 'SUPER PART CO.,LTD.') {
                branch = 'LKS';
            } else if (invname == 'SUPER PART CO.,LTD. (สาขา2)') {
                branch = 'KLH';
            } else if (invname == 'SUPER PART CO.,LTD.(สาขา LLK)') {
                branch = 'LLK';
            } else {
                branch = 'NWM'
            };

            let edit_data = {
                brtra_number: $('#frm_data').find('#brtra_number').val(),
                deliver_driver: $('#frm_data').find('#deliver_driver').val(),
                deliver_route: branch,
                deliver_remark: $('#frm_data').find('#deliver_remark').val() === '' ? '' : $('#frm_data').find('#deliver_remark').val(),
                created_by: name
            };

            var params = [];
            for (const i in edit_data) {
                params.push(i + "=" + encodeURIComponent(edit_data[i]));
            }

            fetch(url_brtra_deliver_job, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params.join("&"),
            }).then(data => {

                toastr.success('Save Successfully!', async function () {

                    await oTable.destroy();

                    await $.List();

                    $('.btn-save_form').prop('disabled', false);

                    $("#frm_data").parsley().reset();
                    //$('#frm_data')[0].reset();

                    $('#modal-frm_data').modal('hide');

                    if ("BR" == $('#frm_data').find('#brtra_number').val().substring(0, 2).toUpperCase()) {

                        var trndate_start;
                        var trndate_end;

                        trndate_start = $('#job_date').val() != '' ? moment($('#job_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment('1991-01-01').format('YYYY-MM-DD') + ' 00:00';  //ถ้าไม่เลือกจะเป็นค่าว่าง
                        trndate_end = $('#job_date').val() != '' ? moment($('#job_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';


                        $.ajax({
                            async: false,
                            url: url_brtra_get,
                            type: 'GET',
                            data: {
                                job_no: $('#frm_data').find('#brtra_number').val(),
                                trndate_start: trndate_start,
                                trndate_end: trndate_end,
                            },
                            success: function (result) {

                                if (result.data.length > 0) {

                                    console.log(result);

                                    $.each(result.data, function (key, val) {

                                        //$.LoadingOverlay("show");
                                       
                                        let citem_job = [
                                            {
                                                "deliveryProjectCode": "VSM-001",
                                                "underDistributionCenterCode": "VSM",
                                                "vehicleLicensePlate": $('#driver_id').html(),
                                                "vehicleFuelUseRate": 0,
                                                "vehiclePercentReFuel": 0,
                                                "addOnVehicleLicensePlate": "",
                                                "driverCode": $('#driver_id').html(),
                                                "driverName": "",
                                                "manifestNoteCreateDate": moment().format(),
                                                "manifestNoteStartType": 1,
                                                "startDistributionCenterCode": "VSM",
                                                "endRouteLineCode": "BR",
                                                "receiveProductDate": moment().format(),
                                                "shippingNoteList": [
                                                    {
                                                        "shippingNoteCode": $.trim(val['bl_job_no']),
                                                        "shippingNoteDescription": "Spare Part",
                                                        "deliveryDate": moment().format(),
                                                        "packageNumber": $.trim(val['bl_job_no']),
                                                        "productAmount": $.trim(val['bl_job_qty']),
                                                        "codPrice": 0,
                                                        "weight": 1,
                                                        "volume": 1,
                                                        "senderName": "VSK",
                                                        "receiverName": $.trim(val['bl_invname']),
                                                        "actualReceiverName": $.trim(val['bl_invname']),
                                                        "receiverContact": $.trim(val['evtel']),
                                                        "receiverAddress": "87/18-21 หมู่ 13 ถนนสุวินทวงศ์ แขวง มีนบุรี เขต มีนบุรี กรุงเทพมหานคร 10510",
                                                        "endRouteLineCode": "BR",
                                                        "lat": 13.8163198,
                                                        "lng": 100.7228919,
                                                        "productCode": $.trim(val['bl_job_no']),
                                                        "deliveryProjectCode": "VSM-001",
                                                        "startConsumerDistributionCenterCode": "DCC-001"
                                                    }
                                                ]
                                            }
                                        ];

                                        //$.ajax({
                                        //    async: false,
                                        //    url: 'https://vsk.tms-vcargo.com/api/tms/public/v1/manifestnote/create-shipping-note-and-create-manifest-customer',
                                        //    type: 'POST',
                                        //    contentType: "application/json; charset=utf-8",
                                        //    dataType: 'json',
                                        //    data: JSON.stringify({ 'manifestNoteList': citem_job }),
                                        //    success: function (result) {

                                        //        citem_job_point = [];

                                        //        citem_job_point.push({
                                        //            job_pod_id: $.uuid(),
                                        //            job_receive_name: $.trim(val['bl_invname']),
                                        //            job_pod_no: $('#driver_id').html(),
                                        //            job_pod_inv: $.trim(val['bl_job_no']),
                                        //            created_by: name
                                        //        });

                                        //    }

                                        //});


                                    });


                                } else {

                                    alert('ไม่พบข้อมูล !!!');
                                   

                                }

                            }

                        });
                    }
                });

            }).catch((error) => {
                console.error('Error:', error);
            });
            return false;

        });

    });

};

$.History = async function (citem) {

    let url_history = new URL(url_brtra_history);
    let job_detail_qty = citem['job_detail_qty'];
    let job_qty = citem['job_qty'];
    let sum_qty_item = (job_qty - job_detail_qty);

    $('#modal-frm_data').modal('hide');
    $('#no_br').html(citem['job_no'])

    $('#sum_qty_current').html(citem['job_detail_qty']).css("color", "#F39C12");
    $('#sum_qty_total').html(citem['job_qty']).css("color", "#138D75");
    $('#sum_qty_item').html(sum_qty_item).css("color", "#8A0006");

    url_history.search = new URLSearchParams({

        br_job_no: citem['job_no'],
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
            }).then((result) => {
                if (result.isConfirmed) {

                    location.reload();

                }
            })

        } else {

            $('#modal-frm_history').modal('show');
            //$('#tbl-list-history').css({ "table-layout": "fixed", "width": "100%" });
            $('#tbl-list-history').css({ "width": "100%" });

            $("#global-loader").fadeOut("slow");
            history_Table = $('#tbl-list-history').DataTable({
                data: result.data,
                scrollX: true,
                //"pageLength": 100,
                //scrollCollapse: true,
                //autoWidth: true,
                //paging: true,
                scrollY: "300px",
                scrollCollapse: true,
                paging: false,
                paging: true,
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'excel'
                ],
                columns: [
                    {
                        title: "<span style='font-size:11px;'>เลขที่ BR</span>",
                        data: "br_job_no",
                        //width: "70px",
                        visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span">' + data + '</span>';
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>ชื่อสินค้า</span>",
                        data: "stkname",
                        //width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span">' + data + '</span>';
                        }
                    }, //1
                    {
                        title: "<span style='font-size:11px;'>เลขอะไหล่</span>",
                        data: "spcodes",
                        width: "100px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span">' + data + '</span>';
                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>จำนวนปัจจุบัน</span>",
                        data: "job_detail_qty",
                        width: "80px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;  color:DarkGreen;">' + data + '</span>';
                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>จำนวนทั้งหมด</span>",
                        data: "trnqty",
                        width: "80px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;  color:#002259;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>หน่วย</span>",
                        data: "stkunit",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span">' + data + '</span>';
                        }
                    }, //5

                ],

            });
        }
    })
};

$.Load_user = function () {

    let Get_user = new URL(url_brtra_lov);

    Get_user.search = new URLSearchParams({
        lov_code: 'BR_USER',
    });

    fetch(Get_user).then(function (response) {
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
                job_comment_dataSet.push({ id: val['lov2'], text: val['lov2'] });

            });

            $('.created_by').select2({
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

//$.Load_route = function () {
//    let Get_route = new URL(url_brtra_lov_route);

//    Get_route.search = new URLSearchParams({
//        lov_type: 'Route No',
//    });

//    fetch(Get_route).then(function (response) {
//        return response.json();
//    }).then(function (result) {
//        if (result.status === 'Error') {

//            $.LoadingOverlay("hide");

//            $("#global-loader").fadeOut("slow");

//            Swal.fire({
//                icon: 'error',
//                title: 'Oops...',
//                text: 'Something went wrong!',
//                //footer: '<a href>Why do I have this issue?</a>'
//            }).then((result) => {
//                if (result.isConfirmed) {
//                    location.reload();
//                }
//            })
//        } else {

//            $.each(result.data, function (key, val) {
//                job_route_dataSet.push({ id: val['lov_code'], text: val['lov1'] });

//            });

//            $('#deliver_route').select2({
//                width: '100%',
//                height: '40px',
//                data: job_route_dataSet,
//                templateResult: function (data) {
//                    return data.text;
//                },
//                sorter: function (data) {
//                    return data.sort(function (a, b) {
//                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
//                    });
//                }
//            });
//        }

//    });

//}

$.Load_driver = function () {

    var driver_code = "";
    var driver_code_len = 0;

    $('#deliver_driver').off('keyup').on('keyup', function (e) {

        e.preventDefault();

        var code = (e.keyCode ? e.keyCode : e.which);

        //if ($(this).val().length > 0) {

        //    //if (code === 13) {

        //    if (driver_code_len == 6) {


        //        if (driver_code.charAt(0) == "d" || driver_code.charAt(0) == "D") {

        //            $.ajax({
        //                //async: false,
        //                //contentType: "application/json",
        //                url: url_brtra_lov_deiver,
        //                type: 'GET',
        //                dataType: 'json',
        //                data: {
        //                    'driver_code': driver_code,
        //                },
        //                success: function (result) {

        //                    if (result.data.length > 0) {

        //                        //$('#frm_data').find('#driver_name').removeClass('is-invalid');

        //                        $.each(result.data, function (key, val) {

        //                            $('#frm_data').find('#deliver_driver').val(val['driver_code']).addClass('kt-hidden');
        //                            $('#frm_data').find('#driver_name').html(val['driver_fullname']).removeClass('kt-hidden').prop('disabled', true);

        //                        });
        //                    } else if (result.data.length == 0) {
        //                        var message = "พัง";
        //                        alert(message);
        //                        $('#frm_data').find('#driver_name').val('');
        //                        $('#frm_data').find('#driver_name').addClass('is-invalid');
        //                        $('#frm_data').find('#driver_name').focus();
        //                    }

        //                }
        //            });

        //        }
        //    }

        //    //}
        //}
    });

    $('#deliver_driver').on('change', function (e) {
        e.preventDefault();
        driver_code = $('#frm_data').find('#deliver_driver').val();
        driver_code_len = driver_code.length;

        if ($(this).val().length > 0) {


            if (driver_code_len == 6) {


                if (driver_code.charAt(0) == "d" || driver_code.charAt(0) == "D") {

                    $.ajax({
                        //async: false,
                        //contentType: "application/json",
                        url: url_brtra_lov_deiver,
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            'driver_code': driver_code,
                        },
                        success: function (result) {

                            if (result.data.length > 0) {

                                //$('#frm_data').find('#driver_name').removeClass('is-invalid');

                                $.each(result.data, function (key, val) {

                                    $('#frm_data').find('#deliver_driver').val(val['driver_code']).addClass('kt-hidden');
                                    $('#frm_data').find('#driver_name').html(val['driver_fullname']).removeClass('kt-hidden').prop('disabled', true);
                                    $('#frm_data').find('#driver_id').html(val['HHID']).removeClass('kt-hidden').prop('disabled', true);
                                    $('#frm_data').find('#deliver_driver').val(val['driver_code']).prop('readonly', true);
                                });

                            } else {
                                toastr.error('ไม่พบข้อมูลคนขับรถ')
                            }

                        }
                    });

                }
            }

        }

    })
}

$.History_deliver = function (citem) {

    let Get_History_Deliver = new URL(url_brtra_history_deliver);

    Get_History_Deliver.search = new URLSearchParams({

        br_job_no: citem['job_no'],
        record_status: '1',

    });

    fetch(Get_History_Deliver).then(function (response) {
        return response.json();
    }).then(function (result) {
        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            }).then((result) => {
                if (result.isConfirmed) {

                    location.reload();

                }
            })

        } else {
            console.log(result.data);

            $('#tbl-list-deliver').find('tbody').html('')

            if (result.length > 0) {

                let i = 1;

                $.each(result.data, function (key, val) {

                    var deliver_br_job = val['deliver_br_job']
                    var deliver_driver = val['deliver_driver']
                    var deliver_route = val['deliver_route']
                    var deliver_remark = val['deliver_remark']
                    var created_date = val['created_date']
                    var created_date = moment(val['created_date']).format('DD/MM/YYYY HH:mm:ss')
                    $('#tbl-list-deliver').find('tbody').append('<tr>' +
                        '<td style="text-align:center">' + i + '</td>' +
                        '<td style="text-align:center">' + deliver_driver + '</td>' +
                        '<td style="text-align:center">' + deliver_route + '</td>' +
                        '<td style="text-align:center">' + deliver_remark + '</td>' +
                        '<td style="text-align:center">' + created_date + '</td>' +
                        '</tr>' 
                    )
                    i++
                });

            } else {

                $('#tbl-list-deliver').find('tbody').html('')

            }

        }

    });

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