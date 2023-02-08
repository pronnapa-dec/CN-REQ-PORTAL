'use strict';

let validator, oTable, table, options, item_action, item_id;

let objProfile = JSON.parse(localStorage.getItem('objProfile'));
console.log("objProfile", objProfile);

let template_url = 'http://localhost:8081/template/';
//let template_url = 'http://192.168.1.247/template/';

let connect_url = 'http://localhost:8081/vsk-portal-api';
//let connect_url = 'http://192.168.1.247/intranet/acc-api';

let auth_get = connect_url + '/v1/itemmaster_lov_get';
let stmas_get = connect_url + '/v1/importupdatedata_stmas_list_get';
let ck_code = connect_url + '/v1/gcode_get';
let ck_item = connect_url + '/v1/stmas_get';
let gcode_url = connect_url + '/v1/gcode_get';
let barcode_url = connect_url + '/v1/barcode_get';
let uom_url = connect_url + '/v1/uom_get';
let location_url = connect_url + '/v1/location_get';
let printerzone_url = connect_url + '/v1/printerzone_get';
let lovdata_url = connect_url + '/v1/itemmaster_lov_get';

let ImportPriceList_Update = connect_url + '/v1/ImportPriceList_Update';
let ImportPriceList_CalcStatus = connect_url + '/v1/ImportPriceList_CalcStatus';
let ImportPriceList_TemplateGet = connect_url + '/v1/ImportPriceList_TemplateGet';
let ImportPriceList_Create = connect_url + '/v1/ImportPriceList_Create';
let ImportPriceList_Tran_Create = connect_url + '/v1/ImportPriceList_Tran_Create';

let temp_table = [];
let objTable = {};
let citem_stmas = [];
let citem_c1 = [];
let citem_c2 = [];
let citem_c3 = [];
let citem_c4 = [];
let citem_c5 = [];
let citem_barcode = [];
let citem_uom = [];
let citem_location = [];
let citem_printerzone = [];
let citem_carmodel = [];
let citem_carbrand = [];
let citem_cartype = [];
let username = "";
let fname = "";
let authorize = "";
let temp_id = "";
let count_length = 0;
let chk_index = 0

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

$.init = function () {

    //toastr.warning('อยู่ระหว่างการทดสอบการใช้งานเท่านั้น (UAT Mode)');

    $('.container').find('.breadcrumb-header').append('<div class="d-flex my-xl-auto right-content"><div class= "mb-3 mb-xl-0" ><h4 style="color: red;">UAT Version</h4></div ></div >');


    $.fntemptable = function (currentindex) {

        $('#tbl-list-temp tbody').empty();

        if (currentindex == 0) {

            $.each(temp_table, function (key, val) {

                var recordstatus_txt = "";

                if (val['record_status'] == 0) {
                    recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;">ERROR</span>';
                } else if (val['record_status'] == 1) {
                    recordstatus_txt = '<span style="color: green;font-weight: bold;text-align: center;">OK</span>';
                } else if (val['record_status'] == 2) {
                    recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                }


                if (val['carbrand'] == null) { var val_carbrand = ''; } else { var val_carbrand = val['carbrand']; }
                if (val['goem'] == null) { var val_goem = ''; } else { var val_goem = val['goem']; }
                if (val['itemname_en'] == null) { var val_itemname_en = ''; } else { var val_itemname_en = val['itemname_en']; }
                if (val['itemname_th'] == null) { var val_itemname_th = ''; } else { var val_itemname_th = val['itemname_th']; }
                if (val['gprice'] == null) { var val_gprice = ''; } else { var val_gprice = val['gprice']; }
                //if (val['price_effectdate'] == null) { var val_price_effectdate = ''; } else { var val_price_effectdate = val['price_effectdate']; }
                if (val['price_effectdate'] == '0001-01-01T00:00:00') { var val_price_effectdate = ''; } else { var val_price_effectdate = moment(val['price_effectdate']).format('DD/MM/YYYY'); }


                $('#tbl-list-temp tbody').append('<tr>' +
                    '<td class="tx-center">' + val['item'] + '</td>' +
                    '<td class="tx-center">' + recordstatus_txt + '</td>' +
                    '<td style="width: 150px;">' + val['spcodes'] + '</td>' +
                    '<td class="tx-center">' + val_carbrand + '</td>' +
                    '<td class="tx-center">' + val_goem + '</td>' +
                    '<td style="width: 170px;">' + val_itemname_en + '</td>' +
                    '<td style="width: 170px;">' + val_itemname_th + '</td>' +
                    '<td class="tx-center">' + val_gprice + '</td>' +
                    '<td class="tx-center">' + val_price_effectdate + '</td>' +
                    '</tr>');

            });

        } else if (currentindex == 1) {

            $.each(temp_table, function (key, val) {
                //console.log("Val", val);
                if (val['record_status'] == 1) {

                    var recordstatus_txt = "";

                    if (val['record_status'] == 1) {
                        recordstatus_txt = '<span style="color: green;font-weight: bold;text-align: center;">OK</span>';
                    }


                    if (val['carbrand'] == null) { var val_carbrand = ''; } else { var val_carbrand = val['carbrand']; }
                    if (val['goem'] == null) { var val_goem = ''; } else { var val_goem = val['goem']; }
                    if (val['itemname_en'] == null) { var val_itemname_en = ''; } else { var val_itemname_en = val['itemname_en']; }
                    if (val['itemname_th'] == null) { var val_itemname_th = ''; } else { var val_itemname_th = val['itemname_th']; }
                    if (val['gprice'] == null) { var val_gprice = ''; } else { var val_gprice = val['gprice']; }
                    //if (val['price_effectdate'] == null) { var val_price_effectdate = ''; } else { var val_price_effectdate = val['price_effectdate']; }
                    if (val['price_effectdate'] == '0001-01-01T00:00:00') { var val_price_effectdate = ''; } else { var val_price_effectdate = moment(val['price_effectdate']).format('DD/MM/YYYY'); }


                    $('#tbl-list-temp tbody').append('<tr>' +
                        '<td class="tx-center">' + val['item'] + '</td>' +
                        '<td class="tx-center">' + recordstatus_txt + '</td>' +
                        '<td style="width: 150px;">' + val['spcodes'] + '</td>' +
                        '<td class="tx-center">' + val_carbrand + '</td>' +
                        '<td class="tx-center">' + val_goem + '</td>' +
                        '<td style="width: 170px;">' + val_itemname_en + '</td>' +
                        '<td style="width: 170px;">' + val_itemname_th + '</td>' +
                        '<td class="tx-center">' + val_gprice + '</td>' +
                        '<td class="tx-center">' + val_price_effectdate + '</td>' +
                        '</tr>');

                }
            });
        }
    };


    $.fnupdatedata = function (template_id) {

        $.LoadingOverlay("show", {
            image: '',
            custom: customElement
        });

        fetch(ImportPriceList_Update + '?temp_id=' + template_id + '&updated_by=' + username).then(function (response) {
            return response.json();
        }).then(function (result) {

            console.log("updated");
            toastr.success('Updated data successfully');

        });

        setTimeout(function () {
            $.LoadingOverlay("hide");
        }, 900);

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
            if (chk_index == 2) { $.fnupdatedata(temp_id); }

        },
        onFinishing: function () {
            location.reload();
        }
    });


    $('#wizards').find('#btn_downloadtemplate').on('click', function (evt) {

        location.href = template_url + 'PriceListTemplate.xlsx';

    });


    $.each(objProfile.auth_user_profile, function (key, val) {
        fname = val['user_fname'];
        var email = val['user_email'];
        email = email.split("@");
        username = email[0];
        //console.log("username", username);
    });

    temp_id = $.uuid();
    console.log("temp_id", temp_id);

    $('#customFile').on('change', function (evt) {

        evt.preventDefault();

        if ($(this).val() !== '') {

            let i = 0;

            readXlsxFile(this.files[0], { dateFormat: 'YYYY/MM/DD_hh:mm:ss' }).then(async function (result) {

                if (result.length > 2) {

                    $.LoadingOverlay("show", {
                        image: '',
                        custom: customElement
                    });

                    count_length = result.length - 2;
                    console.log("result", result);

                    let add_data = {
                        'temp_id': temp_id,
                        'countitem_all': count_length,
                        'created_by': username,
                    };

                    var params = [];
                    for (const i in add_data) {
                        params.push(i + "=" + encodeURIComponent(add_data[i]));
                    }

                    console.log("params", params);

                    fetch(ImportPriceList_Create, {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        mode: 'no-cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        body: params.join("&"),
                    }).then(data => {

                        console.log("ImportPriceList_Create", data);

                        let count_row = 0;
                        let count_index = 0;

                        var citem_pricelist_tran_create = [];

                        $.each(result, function (key, val) {

                            console.log("i", i);

                            if (i > 1) {

                                ++count_row;
                                console.log(count_row, ". spcodes: ", val[0]);

                                citem_pricelist_tran_create.push({
                                    'temp_id': temp_id,
                                    'item': count_row,
                                    'spcodes': val[0],
                                    'carbrand': val[1],
                                    'goem': val[2],
                                    'itemname_en': val[3],
                                    'itemname_th': val[4],
                                    'gprice': val[5],
                                    'price_effectdate': $.DateToDB(moment(val[6], 'DD/MM/YYYY').format('DD/MM/YYYY')),
                                    'created_by': username,
                                });
                                console.log("citem_pricelist_tran_create", citem_pricelist_tran_create);
                            }
                            i++
                        });

                        console.log("citem_pricelist_tran_create", citem_pricelist_tran_create);

                        $.ajax({
                            url: ImportPriceList_Tran_Create,
                            type: 'POST',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify(citem_pricelist_tran_create),
                            success: function (data) {

                                console.log("ImportPriceList_Tran_Create", data);

                                fetch(ImportPriceList_TemplateGet + '?temp_id=' + temp_id + '&created_by=' + username).then(function (response) {
                                    return response.json();
                                }).then(function (result) {

                                    console.log("ImportPriceList_TemplateGet", result.data);
                                    temp_table = result.data;

                                    $.each(result.data, function (key, val) {

                                        var recordstatus_txt = "";

                                        if (val['record_status'] == 0) {
                                            recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;">ERROR</span>';
                                        } else if (val['record_status'] == 1) {
                                            recordstatus_txt = '<span style="color: green;font-weight: bold;text-align: center;">OK</span>';
                                        } else if (val['record_status'] == 2) {
                                            recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                                        }

                                        //console.log("lifecyclereviewdate", val['lifecyclereviewdate']);

                                        if (val['carbrand'] == null) { var val_carbrand = ''; } else { var val_carbrand = val['carbrand']; }
                                        if (val['goem'] == null) { var val_goem = ''; } else { var val_goem = val['goem']; }
                                        if (val['itemname_en'] == null) { var val_itemname_en = ''; } else { var val_itemname_en = val['itemname_en']; }
                                        if (val['itemname_th'] == null) { var val_itemname_th = ''; } else { var val_itemname_th = val['itemname_th']; }
                                        if (val['gprice'] == null) { var val_gprice = ''; } else { var val_gprice = val['gprice']; }
                                        //if (val['price_effectdate'] == null) { var val_price_effectdate = ''; } else { var val_price_effectdate = val['price_effectdate']; }
                                        if (val['price_effectdate'] == '0001-01-01T00:00:00') { var val_price_effectdate = ''; } else { var val_price_effectdate = moment(val['price_effectdate']).format('DD/MM/YYYY'); }

                                        $('#tbl-list-temp tbody').append('<tr>' +
                                            '<td class="tx-center">' + val['item'] + '</td>' +
                                            '<td class="tx-center">' + recordstatus_txt + '</td>' +
                                            '<td style="width: 150px;">' + val['spcodes'] + '</td>' +
                                            '<td class="tx-center">' + val_carbrand + '</td>' +
                                            '<td class="tx-center">' + val_goem + '</td>' +
                                            '<td style="width: 170px;">' + val_itemname_en + '</td>' +
                                            '<td style="width: 170px;">' + val_itemname_th + '</td>' +
                                            '<td class="tx-center">' + val_gprice + '</td>' +
                                            '<td class="tx-center">' + val_price_effectdate + '</td>' +
                                            '</tr>');
                                    });

                                    $('#tbl-list-temp').DataTable({
                                        paging: false,
                                        dom: 'Brti',
                                        buttons: [
                                            'copyHtml5',
                                            {
                                                extend: 'excelHtml5',
                                                title: '',
                                                filename: 'Export_UpdateDataTemplate_' + authorize,
                                                exportOptions: {
                                                    columns: [2, 3, 4, 5, 6, 7, 8]
                                                }
                                            },
                                        ],
                                    });


                                    fetch(ImportPriceList_CalcStatus + '?temp_id=' + temp_id + '&updated_by=' + username).then(function (response) {
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

                            }
                        });

                    }).catch(error => {
                        console.log(error);
                        $.LoadingOverlay("hide");
                        toastr.error('Error writing document');
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
        console.log('objTable', objTable)

    });

    //$('#customFile').on('click', function (evt) {

    //    evt.preventDefault();



    //});
};


$(document).ready(async function () {

    await $.init();

});

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        console.log(user);

    } else {

        window.location.assign('./login');

    }

});