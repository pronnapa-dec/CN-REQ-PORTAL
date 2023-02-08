'use strict';

let fs = firebase.firestore();
const url_api = "http://localhost:49705/";
//const url_api = 'http://192.168.1.247:8085/mkt-api/';
let Voucher_Redeem_Add = url_api + 'v1/Voucher_Redeem_Add';
let Voucher_Redeem_Get = url_api + 'v1/Voucher_Redeem_Get';
let Voucher_Redeem_Salefile_Get = url_api + 'v1/Voucher_Redeem_Salefile_Get';
let Campaign_Setup_Get = url_api + 'v1/Campaign_Setup_Get';
let Check_Campaign_Setup = url_api + 'v1/Check_Campaign_Setup';
let mkt_dataSet = [];
let oTable, name;

$.init = function () {

    $.List();
    $.Create();
    // Start Icon List //
};

$.mkt_setup = async function () {
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

            $.each(result.data, function (index, item) {
                mkt_dataSet.push({ id: item.id, text: item.campaign_name });
            });

        }
    })

};

$.List = async function () {
    let url = new URL(Voucher_Redeem_Salefile_Get);

    url.search = new URLSearchParams({
        mode: 'Search',
        //    record_status: 1,
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
                scrollCollapse: true,
                paging: true,
                info: true,
                destroy: true,
                searching: true,
                columns: [
                    {
                        title: "<span style='font-size:11px;'>#</span>",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return (meta.row + 1);
                        }

                    }, //1 

                    {
                        title: "<span style='font-size:11px;'>วัน/เวลา</span>",
                        data: "created_datetime",
                        width: "100px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY HH:mm') + '</span>';
                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>รหัสคูปอง</span>",
                        data: "campaign_code",
                        width: "100px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>แคมเปญ</span>",
                        data: "campaign_name",
                        width: "100px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }

                        //    render: function (data, type, row, meta) {
                        //        //return '<span style="font-size:11px;">' + data + '</span>';
                        //        if (data == '' || data == null) {
                        //            return '<span style="font-size:11px;">' + '' + '</span>';
                        //        } else {
                        //            let mkt_obj = mkt_dataSet.find((item, i) => {
                        //                if (item.id == data) {
                        //                    return true; // stop searching
                        //                }
                        //            });
                        //            if (mkt_obj) {
                        //                return '<span style="font-size:11px;">' + mkt_obj.text + '</span>';
                        //            } else {
                        //                return '<span style="font-size:11px;"></span>';

                        //            }

                        //        }

                        //    }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>เลขที่ใบเสร็จ</span>",
                        data: "number",
                        width: "100px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }

                    }, //5
                    {
                        title: "<span style='font-size:11px;'>ชื่อลูกค้า</span>",
                        data: "invname",
                        width: "140px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }

                    }, //6
                    {
                        title: "<span style='font-size:11px;'>จำนวนเงิน</span>",
                        data: "invsumtt",
                        width: "70px",
                        class: "text-right",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + numberWithCommas(data) + '</span>';
                        }

                    }, //7
                    {
                        title: "<span style='font-size:11px;'>ผู้บันทึก</span>",
                        data: "userid",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
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
                            //console.log("key", key);
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
                                record_status: data['record_status'],
                            };

                            $('#modal-frm_data').modal({

                                keyboard: false,
                                backdrop: 'static'

                            });


                            if (key === 'view') {

                                $.Details(citem, 'view');

                            } else if (key === 'edit') {

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
    })

};

$.Add_Data = async function (campaign_id) {
    let add_data = {
        campaign_id: campaign_id,
        redeem_code: $("#redeem_code").val(),
        record_status: 1,
        created_by: name,
        pMessage: ''
    };

    var params = [];
    for (const i in add_data) {
        params.push(i + "=" + encodeURIComponent(add_data[i]));
    }

    fetch(Voucher_Redeem_Add, {
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
                $("#global-loader").fadeOut("slow");
                $.List();
                $('#frm_add').trigger('reset');
            });
        }

    }).catch((error) => {
        toastr.error(error, 'Error writing document');
        console.log('Error:', error);
    });
}

$.Create = async function () {
    $("#global-loader").fadeIn("slow");

    $("#frm_add").validate({
        rules: {
            redeem_code: "required",
        },
        // Specify validation error messages
        messages: {
            redeem_code: "กรุณากรอกคูปอง ",
        },
        submitHandler: function (form) {
            let url = new URL(Check_Campaign_Setup);

            url.search = new URLSearchParams({
                mode: 'Search'
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

                            //location.reload();

                        }
                    })


                } else {
                    if (result.length > 0) {
                        //console.log(result.data[0]['id']);
                        let campaign_id = result.data[0]['id'];
                        $.Add_Data(campaign_id);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'ไม่มีแคมเปญในช่วงวเลานี้',
                            //footer: '<a href>Why do I have this issue?</a>'
                        }).then((result) => {
                            if (result.isConfirmed) {

                                //location.reload();
                                $.List();
                                $('#frm_add').trigger('reset');


                            }
                        })
                    }
                }
            })
        }
    });
};

$(document).ready(async function () {
    //await $.mkt_setup();
    $.init();

});

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        var full_mail = user.email;
        name = full_mail.replace("@vskautoparts.com", "");

    } else {

        window.location.assign('./login');

    }

});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

