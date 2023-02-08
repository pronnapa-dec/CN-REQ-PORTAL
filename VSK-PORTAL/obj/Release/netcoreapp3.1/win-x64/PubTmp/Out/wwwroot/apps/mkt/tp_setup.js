'use strict';

let fs = firebase.firestore();
const url_api = "http://localhost:49705/";
let Campaign_Setup_Add = url_api + 'v1/Campaign_Setup_Add';
let Check_Dup_Campaign = url_api + 'v1/Check_Dup_Campaign';
let Campaign_Setup_Get = url_api + 'v1/Campaign_Setup_Get';
let Campaign_Setup_Update = url_api + 'v1/Campaign_Setup_Update';
let detec_action = 0;
let application_dataSet = [];
let name;

let oTable;

$.init = function () {

    $.List();

    $('.fc-datepicker').datepicker({
        dateFormat: 'dd/mm/yy',
        showOtherMonths: true,
        selectOtherMonths: true
    });

    $('#campaign_type_1').click(function () {
        if ($(this).is(':checked')) {
            $('#campaign_discount').prop('readonly', false);
            $('#campaign_percent').prop('readonly', true)
            $('#campaign_discount').prop('required', true);
            $('#campaign_percent').prop('required', false);
        }
    });


    $('#campaign_type_2').click(function () {
        if ($(this).is(':checked')) {
            $('#campaign_discount').prop('readonly', true);
            $('#campaign_percent').prop('readonly', false)
            $('#campaign_discount').prop('required', false);
            $('#campaign_percent').prop('required',true);

        }
    });

    $("input.numbers").keypress(function (event) {
        return isNumber(event, this)
    });


    $('#btn-add').click(function (e) {

        e.preventDefault();

        $.Create();

        $('#frm_data').find('input, textarea').attr('readonly', false);
        $('#frm_data').find('select, input:radio, .fc-datepicker').attr('disabled', false);
        $('#frm_data').trigger('reset');
        $("#campaign_type_1").is(":checked") === true ? $('#campaign_discount').prop('readonly', false) : $('#campaign_discount').prop('readonly', true);
        $("#campaign_type_2").is(":checked") === true ? $('#campaign_percent').prop('readonly', false) : $('#campaign_percent').prop('readonly', true);
        $('#btn-save_exit').show().prop('disabled', false);
        $('#btn-edit_form').hide();

    });


};

$.Create = async function () {

    $('#btn-save_exit').click(function (e) {

        let submit_action = $(this).data('action');

        if ($('#campaign_type_1').is(':checked')) {
            $('#campaign_discount').prop('required', true);
            $('#campaign_percent').prop('required', false);
        } else {
            $('#campaign_discount').prop('required', false);
            $('#campaign_percent').prop('required', true);
        }

        $('#frm_data').parsley().on('form:submit', function () {

            $("#global-loader").fadeIn("slow");

            if (submit_action === "save_exit") {

                let url = new URL(Check_Dup_Campaign);

                url.search = new URLSearchParams({
                    campaign_id: '',
                    campaign_start_datetime: moment($("#campaign_start_datetime").val(), 'DD-MM-YYYY').format('YYYY-MM-DD'),
                    campaign_end_datetime: moment($("#campaign_end_datetime").val(), 'DD-MM-YYYY').format('YYYY-MM-DD'),
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
                        $("#global-loader").fadeOut("slow");

                        if (result.length == 0) {
                            alert('ข้อมูล record แรก')

                            let add_data = {
                                campaign_name: $("#campaign_name").val(),
                                campaign_start_datetime: moment($("#campaign_start_datetime").val(), 'DD-MM-YYYY').format('YYYY-MM-DD'),
                                campaign_end_datetime: moment($("#campaign_end_datetime").val(), 'DD-MM-YYYY').format('YYYY-MM-DD'),
                                campaign_type: $("#campaign_type_1").is(":checked") === true ? '1' : '2',
                                campaign_discount: $("#campaign_discount").val(),
                                campaign_percent: $("#campaign_percent").val(),
                                campaign_minprice: $("#campaign_minprice").val(),
                                campaign_maxdiscount: $("#campaign_maxdiscount").val(),
                                campaign_qty: $("#campaign_qty").val(),
                                campaign_code: $("#campaign_code").val(),
                                record_status: $("#record_status_1").is(":checked") === true ? '1' : '0',
                                created_by: name,
                            };

                            var params = [];
                            for (const i in add_data) {
                                params.push(i + "=" + encodeURIComponent(add_data[i]));
                            }

                            fetch(Campaign_Setup_Add, {
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
                                        $('#modal-frm_data').modal('hide');
                                        $('#frm_data').find('input, textarea, select').trigger('reset');
                                        $.List();
                                    });

                                }

                            }).catch((error) => {
                                toastr.error(error, 'Error writing document');
                                console.log('Error:', error);
                            });
                        } else {

                            $("#global-loader").fadeOut("slow");

                            let check_dup_date;

                            $.each(result.data, function (index, item) {
                                if (item.check_dup_start == 1 || item.check_dup_end == 1) {
                                    check_dup_date = 1;
                                    return false;
                                } else {
                                    check_dup_date = 0;
                                }
                            });

                            if (check_dup_date == 0) {
                                let add_data = {
                                    campaign_name: $("#campaign_name").val(),
                                    campaign_start_datetime: moment($("#campaign_start_datetime").val(), 'DD-MM-YYYY').format('YYYY-MM-DD'),
                                    campaign_end_datetime: moment($("#campaign_end_datetime").val(), 'DD-MM-YYYY').format('YYYY-MM-DD'),
                                    campaign_type: $("#campaign_type_1").is(":checked") === true ? '1' : '2',
                                    campaign_discount: $("#campaign_discount").val(),
                                    campaign_percent: $("#campaign_percent").val(),
                                    campaign_minprice: $("#campaign_minprice").val(),
                                    campaign_maxdiscount: $("#campaign_maxdiscount").val(),
                                    campaign_qty: $("#campaign_qty").val(),
                                    campaign_code: $("#campaign_code").val(),
                                    record_status: $("#record_status_1").is(":checked") === true ? '1' : '0',
                                    created_by: name,
                                };

                                var params = [];
                                for (const i in add_data) {
                                    params.push(i + "=" + encodeURIComponent(add_data[i]));
                                }

                                fetch(Campaign_Setup_Add, {
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
                                            $('#modal-frm_data').modal('hide');
                                            // $('#btn-save_exit').prop('disabled', true);
                                            $('#frm_data').find('input, textarea, select').trigger('reset');
                                            $.List();
                                        });

                                    }

                                }).catch((error) => {
                                    toastr.error(error, 'Error writing document');
                                    console.log('Error:', error);
                                });
                                return false;

                            } else {
                                $('#modal-frm_data').modal('hide');

                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'กรุณาเลือกช่วงเวลาอื่น!',
                                    //footer: '<a href>Why do I have this issue?</a>'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        $('#modal-frm_data').modal('show');
                                        $('#btn-save_exit').show().prop('disabled', false);

                                    }
                                })

                            }

                        }
                    }
                })


            }



            return false;

        });

    });
}

$.List = async function () {
    $("#global-loader").fadeIn("slow");

    let url = new URL(Campaign_Setup_Get);

    url.search = new URLSearchParams({
        mode: 'Search',
        record_status: 1,
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
            $("#global-loader").fadeOut("slow");

            oTable = $('#tbl-list').DataTable({
                data: result.data,
                scrollCollapse: true,
                paging: false,
                info: false,
                destroy: true,
                searching: false,
                columns: [
                    {
                        title: "<span style='font-size:11px;'>ลำดับ</span>",
                        width: "70px",
                        visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return (meta.row + 1);
                        }

                    }, //1 

                    {
                        title: "<span style='font-size:11px;'>รายการ</span>",
                        data: "campaign_name",
                        width: "100px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //2

                    {
                        title: "<span style='font-size:11px;'>เริ่มต้น</span>",
                        data: "campaign_start_datetime",
                        width: "100px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data,'DD-MM-YYYY').format('DD/MM/YYYY') + '</span>';
                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>สิ้นสุด</span>",
                        data: "campaign_end_datetime",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data, 'DD-MM-YYYY').format('DD/MM/YYYY') + '</span>';
                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>มูลค่า</span>",
                        data: "campaign_discount",
                        width: "70px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + numberWithCommas(data) + '</span>';

                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>% ส่วนลด</span>",
                        data: "campaign_percent",
                        width: "100px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + ' %' + '</span>';
                        }
                    }, //2

                    {
                        title: "<span style='font-size:11px;'>ซื้อขั้นต่ำ</span>",
                        class: "tx-center ",
                        data: "campaign_minprice",
                        width: "50px",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + numberWithCommas(data) + '</span>';
                        }
                    }, //5
                    {
                        title: "<span style='font-size:11px;'>ลดสูงสุด</span>",
                        class: "tx-center ",
                        data: "campaign_maxdiscount",
                        width: "50px",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + numberWithCommas(data) + '</span>';
                        }
                    }, //6
                    {
                        title: "<span style='font-size:11px;'>จำนวน</span>",
                        class: "tx-center ",
                        data: "campaign_qty",
                        width: "50px",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + numberWithCommas(data) + '</span>';
                        }
                    }, //7
                    {
                        title: "<span style='font-size:11px;'>คงเหลือ</span>",
                        class: "tx-center ",
                        data: "campaign_balance",
                        width: "50px",
                        render: function (data, type, row, meta) {
                            let data_int = parseInt(data);
                            //return '<span style="font-size:11px;">' + numberwithcommas(data_int) + '</span>';
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //8
                ],


                //"order": [[1, "desc"]],
                "initComplete": function (settings, json) {

                    // $.LoadingOverlay("hide");

                    $("#global-loader").fadeOut("slow");

                    $('#tbl-list tbody tr').hover(function () {
                        $(this).css('cursor', 'pointer');
                    });
                    //$('.btn-action').click(function () {
                    //    let id = $().data('id');
                    //    let data = $(this).data('row');

                    //    if ($(this).data('action') == "view") {
                    //        $("#vendor_id option").remove();
                    //        $.Packing_Get(data, 'get');
                    //    } else if ($(this).data('action') == "edit") {
                    //        $("#vendor_id option").remove();
                    //        $.Packing_Get(data, 'edit');

                    //    } else if ($(this).data('action') == "delete") {
                    //        $.Delete(data);
                    //        //} else {
                    //        //    alert($(this).data('action'));
                    //    }
                    //});                    //$('.btn-action').click(function () {
                    //    let id = $().data('id');
                    //    let data = $(this).data('row');

                    //    if ($(this).data('action') == "view") {
                    //        $("#vendor_id option").remove();
                    //        $.Packing_Get(data, 'get');
                    //    } else if ($(this).data('action') == "edit") {
                    //        $("#vendor_id option").remove();
                    //        $.Packing_Get(data, 'edit');

                    //    } else if ($(this).data('action') == "delete") {
                    //        $.Delete(data);
                    //        //} else {
                    //        //    alert($(this).data('action'));
                    //    }
                    //});

                    $.contextMenu({
                        selector: '#tbl-list tbody tr',
                        callback: async function (key, options) {

                            let data = oTable.row(this).data();

                            let citem = {
                                id: data['id'],
                                campaign_name: data['campaign_name'],
                                campaign_start_datetime: data['campaign_start_datetime'],
                                campaign_end_datetime: data['campaign_end_datetime'],
                                campaign_type: data['campaign_type'],
                                campaign_discount: data['campaign_discount'],
                                campaign_percent: data['campaign_percent'],
                                campaign_minprice: data['campaign_minprice'],
                                campaign_maxdiscount: data['campaign_maxdiscount'],
                                campaign_qty: data['campaign_qty'],
                                campaign_code: data['campaign_code'],
                                record_status: data['record_status'],
                            };

                            $('#modal-frm_data').modal({

                                keyboard: false,
                                backdrop: 'static'

                            });


                            if (key === 'view') {

                                $.Details(citem, 'view');

                            } else if (key === 'edit') {
                                $('#btn-edit_form').show().prop('disabled', false);
                                $('#btn-save_exit').hide();

                                await $.Details(citem, 'edit');
                                await $.Edit(citem);

                            } else {

                                alert('ERROR');

                            }

                        },

                        items: {
                            "view": { name: "View", icon: "fas fa-search" },
                            "edit": { name: "Edit", icon: "edit edit-detail" },
                        }

                    });

                },
            });

        }
    });
}

$.Details = async function (item,type) {
    if (type == 'view') {
        $('#btn-save_exit').hide();
        $('#frm_data').find('input, textarea').attr('readonly', true);
        $('#frm_data').find('select, input:radio, .fc-datepicker').attr('disabled', true);

    } else {
        detec_action = 1;
        $('#btn-edit').show();
        $('#btn-save_exit').hide();
        $('#btn-edit').show().prop('disabled', false);
        $('#frm_data').find('input, textarea').attr('readonly', false);
        $('#frm_data').find('select, input:radio, .fc-datepicker').attr('disabled', false);

    }

    $("#campaign_name").val(item['campaign_name']);
    $("#campaign_start_datetime").val(moment(item['campaign_start_datetime'], 'DD-MM-YYYY').format('DD-MM-YYYY'));
    $("#campaign_end_datetime").val(moment(item['campaign_end_datetime'], 'DD-MM-YYYY').format('DD-MM-YYYY'));
    //console.log(item['campaign_code'])
    $("#campaign_code").val(item['campaign_code']);

    if (item['campaign_type'] == "1") { // get checked
        $("#campaign_type_1").prop('checked', true);
        $('#campaign_percent').prop('readonly', true);
    } else if (item['record_status'] == "2") {
        $("#campaign_type_2").prop('checked', true);
        $('#campaign_discount').prop('readonly', true);
    } else {
        $("#campaign_type_2").prop('checked', true);
        $('#campaign_discount').prop('readonly', true);
    }

    $("#campaign_discount").val(item['campaign_discount']);
    $("#campaign_percent").val(item['campaign_percent']);
    $("#campaign_maxdiscount").val(item['campaign_maxdiscount']);
    $("#campaign_minprice").val(item['campaign_minprice']);
    $("#campaign_qty").val(item['campaign_qty']);
    if (item['record_status'] == "1") { // get checked
        $("#record_status_1").prop('checked', true);
    } else if (item['record_status'] == "2") {
        $("#record_status_2").prop('checked', true);
    } else {
        $("#record_status_2").prop('checked', true);
    }


}

$.Edit = async function (citem) {

    $('#btn-edit_form').click(function (e) {

        let submit_action = $(this).data('action');

        if ($('#campaign_type_1').is(':checked')) {
            $('#campaign_discount').prop('required', true);
            $('#campaign_percent').prop('required', false);
        } else {
            $('#campaign_discount').prop('required', false);
            $('#campaign_percent').prop('required', true);
        }

        $('#frm_data').parsley().on('form:submit', function () {

            if (submit_action === "save_edit") {
                $("#global-loader").fadeIn("slow");

                let url = new URL(Check_Dup_Campaign);

                url.search = new URLSearchParams({
                    campaign_start_datetime: moment($("#campaign_start_datetime").val(), 'DD-MM-YYYY').format('YYYY-MM-DD'),
                    campaign_end_datetime: moment($("#campaign_end_datetime").val(), 'DD-MM-YYYY').format('YYYY-MM-DD'),
                    id: citem['id']   
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

                        $("#global-loader").fadeOut("slow");

                        if (result.length == 0) {

                            let add_data = {
                                id: citem['id'],
                                campaign_name: $("#campaign_name").val(),
                                campaign_start_datetime: moment($("#campaign_start_datetime").val(), 'DD-MM-YYYY').format('YYYY-MM-DD'),
                                campaign_end_datetime: moment($("#campaign_end_datetime").val(), 'DD-MM-YYYY').format('YYYY-MM-DD'),
                                campaign_type: $("#campaign_type_1").is(":checked") === true ? '1' : '2',
                                campaign_discount: $("#campaign_discount").val(),
                                campaign_percent: $("#campaign_percent").val(),
                                campaign_minprice: $("#campaign_minprice").val(),
                                campaign_maxdiscount: $("#campaign_maxdiscount").val(),
                                campaign_qty: $("#campaign_qty").val(),
                                record_status: $("#record_status_1").is(":checked") === true ? '1' : '0',
                                created_by: name,
                            };

                            var params = [];
                            for (const i in add_data) {
                                params.push(i + "=" + encodeURIComponent(add_data[i]));
                            }

                            fetch(Campaign_Setup_Update, {
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
                                        $('#modal-frm_data').modal('hide');
                                        $('#btn-save_exit').prop('disabled', true);
                                        $('#frm_data').find('input, textarea, select').trigger('reset');
                                        $.List();
                                    });

                                }

                            }).catch((error) => {
                                toastr.error(error, 'Error writing document');
                                console.log('Error:', error);
                            });

                        } else {

                            $("#global-loader").fadeOut("slow");

                            let check_dup_date;

                            $.each(result.data, function (index, item) {
                                if (item.check_dup_start == 0 && item.check_dup_end == 0) {
                                    check_dup_date = 0;
                                } else {
                                    check_dup_date = 1;
                                }
                            });
                            //console.log('check_dup_date is: ', check_dup_date);
                            //console.log('check_dup_date == 0 is: ', check_dup_date == 0);
                            if (check_dup_date == 0) {

                                let add_data = {
                                    id: citem['id'],
                                    campaign_name: $("#campaign_name").val(),
                                    campaign_start_datetime: moment($("#campaign_start_datetime").val(), 'DD-MM-YYYY').format('YYYY-MM-DD'),
                                    campaign_end_datetime: moment($("#campaign_end_datetime").val(), 'DD-MM-YYYY').format('YYYY-MM-DD'),
                                    campaign_type: $("#campaign_type_1").is(":checked") === true ? '1' : '2',
                                    campaign_discount: $("#campaign_discount").val(),
                                    campaign_percent: $("#campaign_percent").val(),
                                    campaign_minprice: $("#campaign_minprice").val(),
                                    campaign_maxdiscount: $("#campaign_maxdiscount").val(),
                                    campaign_qty: $("#campaign_qty").val(),
                                    record_status: $("#record_status_1").is(":checked") === true ? '1' : '0',
                                    created_by: name,
                                };

                                var params = [];
                                for (const i in add_data) {
                                    params.push(i + "=" + encodeURIComponent(add_data[i]));
                                }

                                fetch(Campaign_Setup_Update, {
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
                                            $('#modal-frm_data').modal('hide');
                                            // $('#btn-save_exit').prop('disabled', true);
                                            $('#frm_data').find('input, textarea, select').trigger('reset');
                                            $.List();
                                        });

                                    }

                                }).catch((error) => {
                                    toastr.error(error, 'Error writing document');
                                    console.log('Error:', error);
                                });
                            } else {
                                $('#modal-frm_data').modal('hide');
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'กรุณาเลือกช่วงเวลาอื่น!',
                                    //footer: '<a href>Why do I have this issue?</a>'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        $('#modal-frm_data').modal('show');
                                    }
                                })

                            }


                        }


                    }
                })

                
            }



            return false;

        });


    });
}

$(document).ready(async function () {

    await $.init();

});

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        var full_mail = user.email;
        name = full_mail.replace("@vskautoparts.com", "");

    } else {

        window.location.assign('./login');

    }

});

function isNumber(evt, element) {

    var charCode = (evt.which) ? evt.which : event.keyCode

    if (
        //(charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
        (charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
