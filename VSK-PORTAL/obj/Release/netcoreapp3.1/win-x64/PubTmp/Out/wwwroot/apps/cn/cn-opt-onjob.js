'use strict';

let fs = firebase.firestore();
let collection = 'mrp_opt_purchaseplan';
let oTable, role_code, mode, history_Table;
let inventorycode_dataset = [];
let invfrecode_dataset = [];

const url_api = "http://localhost:49705/";

const lists_get = url_api + '/v1/Cn_On_Job_Get';
const detail_get = url_api + '/v1/Cn_On_Job_Detail_Get';
const update_detail = url_api + '/v1/Cn_On_Job_Detail_Create';

const objProfile = JSON.parse(localStorage.getItem('objProfile')); 

var name;

let job_comment_dataSet = [];

let toDate = new Date();

$.init = function () {

    $('#cn_date').val(moment().format('DD/MM/YYYY') + '-' + moment().format('DD/MM/YYYY'))

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

    $.getUserProfile = function () {

        $.each(objProfile.auth_role, function (key, val) {
            //console.log('role_code is:', val['role_code']);
            role_code = val['role_code'];
        });

    };
    $.getUserProfile();

    $('.hide').hide();

    //OHM Update 06/11/2020 18:00
    let job_comment_query = fs.collection('lov_cn').where("active_flag", "==", "Y").where("lov_type", "==", "Pre Job Code");

    job_comment_query.get().then(function (querySnapshot) {

        querySnapshot.forEach(function (doc) {

            job_comment_dataSet.push({ id: doc.data().lov_code, text: doc.data().lov1 });

        });

        $.getComment = function (val) {
            $('.cn_comment').select2({
                width: '100%',
                height: '40px',
                data: job_comment_dataSet,
                templateResult: function (data) {
                    return data.id + ' : ' + data.text;
                },
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
                    });
                }
            });
        }
        $.getComment();
    });

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

    $.List(); //before search

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


        $.List(); //after search

    });


    $('#modal-frm_history').on('hidden.bs.modal', function () {

        history_Table.destroy();
    });

};

$.List = async function () {


    let url = new URL(lists_get);
    var CNdate_start = $('#cn_date').val() != '' ? moment($('#cn_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment().format('YYYY-MM-DD') + ' 00:00';  //ถ้าไม่เลือกจะเป็นวันปัจจุบัน
    var CNdate_end = $('#cn_date').val() != '' ? moment($('#cn_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';

    url.search = new URLSearchParams({
        //cn_pre_job_id: '',
        cn_on_job_datetime_start: CNdate_start,
        cn_on_job_datetime_end: CNdate_end,
        cn_on_jobno: $('#cn_jobno').val(),
        cn_on_job_assige: $('#cn_assige').val(),
        cn_on_job_status: $('#cn_on_job_status').val(),
        cn_pre_job_jobno: $('#cn_pre_job_jobno').val(),
        created_by: $('#created_by').val(),
        record_status: 1,
        mode: 'Search'
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
                paging: true,
                columns: [
                    {
                        title: "<span style='font-size:11px;'>เลขที่ CN</span>",
                        data: "cn_on_jobno",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //1 
                    {
                        title: "<span style='font-size:11px;'>วันที่ออก CN</span>",
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
                        data: "cn_on_job_assige",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>สถานะ</span>",
                        data: "cn_on_job_status",
                        width: "150px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data == "pending") {
                                return '<span style="font-size:11px;"> รอคลังตรวจสอบ </span>';
                            } else if (data == "successful"){
                                return '<span style="font-size:11px;"> สำเร้จ </span>';
                            }
                        }
                    }, //5
                    {
                        title: "<span style='font-size:11px;'>ประเภท CN</span>",
                        data: "cn_on_job_type",
                        class: "tx-center",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //6
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
                                cn_on_jobno: data['cn_on_jobno'],
                                cn_on_job_assige: data['cn_on_job_assige'],
                                cn_on_job_status: data['cn_on_job_status'],
                                cn_pre_job_id: data['cn_pre_job_id'],
                                cn_on_job_datetime: data['cn_on_job_datetime'],
                                cn_on_job_type: data['cn_on_job_type'],
                                created_by: data['created_by'],
                                created_date: data['created_date'],
                                updated_by: data['updated_by'],
                                updated_date: data['updated_date'],
                                record_status: data['record_status'],
                                cn_id: data['cn_on_job_id']
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
                            "edit": { name: "Edit", icon: "edit edit-detail"},
                            // "delete": { name: "Delete", icon: "delete" },
                            "sep1": "---------",
                            "history": { name: "History - ประวัติรายการ", icon: "fas fa-history" },
                        }

                    });


                    //$("tbody").contextmenu(function (key) {
                    //    setTimeout(function () {
                    //        let assige = $('.context-menu-active .assige span').html();
                    //        if (role_code == assige) { 
                    //            $('.context-menu-icon-edit').removeClass('context-menu-disabled');
                    //        } else {
                    //            $('.context-menu-icon-edit').addClass('context-menu-disabled');
                    //        }

                    //    }, 200);
                    //});
                },
            });
        }
    })

};

$.Details = async function (citem) {

    let Get_Detail = new URL(detail_get);

    Get_Detail.search = new URLSearchParams({
        cn_on_job_id: citem['cn_id'],
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
            let detail_remark = array[array.length - 1].cn_on_job_detail_remark;
            $('#frm_data').find('#cn_on_job_detail_remark').val(detail_remark);
        }

    });


    $('#frm_data').find('select').prop("disabled", true);
    $('#frm_data').find('input').prop("readonly", true);
    
    $('.btn-save_form').hide();

    $('#frm_data').find('#created_date').val(moment(citem['created_date'], 'YYYY-MM-DD').format('DD/MM/YYYY') + "  " + moment(citem['created_date']).format('HH:mm:ss')).prop("disabled", true);
    $('#frm_data').find('#cn_on_job_assige').val(citem['cn_on_job_assige']).prop("disabled", true);
    $('#frm_data').find('#cn_on_job_status').val(citem['cn_on_job_status']).prop("disabled", true);
    $('#frm_data').find('#created_by').val(citem['created_by']).prop("disabled", true);
    $('#frm_data').find('#cn_on_jobno').val(citem['cn_on_jobno']).prop("disabled", true);


};

$.Edit = async function (citem) {

    $('.btn-save_form').show();
    $('#cn_on_job_status').removeAttr('disabled');
    $('#cn_on_job_detail_remark').removeAttr('readonly');
    let cn_on_job_detail_assige 

    $('#btn-save_exit').click(function (e) {
        $('#frm_data').parsley().on('form:submit', function () {
            $('#modal-frm_data').modal('hide');

            $("#global-loader").fadeIn("slow");
            $('.btn-save_form').prop('disabled', true);

            // Model & Repo
            let edit_data = {
                cn_on_job_id: citem['cn_id'],
                cn_on_job_detail_status: $('#cn_on_job_status').val(),
                cn_on_job_detail_remark: $('#cn_on_job_detail_remark').val(),
                cn_on_job_detail_datetime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                cn_on_job_detail_assige: role_code,
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
                        $.List();

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

                        $.List();

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

    let url_history = new URL(detail_get);


    $('#modal-frm_data').modal('hide');


    url_history.search = new URLSearchParams({
        cn_on_job_id: citem['cn_id'],
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
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //1 
                    {
                        title: "<span style='font-size:11px;'>เลขที่ CN</span>",
                        data: "cn_on_jobno",
                        width: "70px",
                        visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //1 
                    {
                        title: "<span style='font-size:11px;'>วันที่ออก CN</span>",
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
                                return '<span style="font-size:11px;"> รอคลังตรวจสอบ </span>';
                            } else if (data == "successful") {
                                return '<span style="font-size:11px;"> สำเร้จ </span>';
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