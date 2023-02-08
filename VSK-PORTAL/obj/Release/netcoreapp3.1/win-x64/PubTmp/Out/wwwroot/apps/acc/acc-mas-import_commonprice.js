'use strict';

let validator, oTable, table, options, item_action, item_id;

let objProfile = JSON.parse(localStorage.getItem('objProfile'));
console.log("objProfile", objProfile);

let template_url = 'http://localhost:8081/template/';
//let template_url = 'http://192.168.1.247/template/';

let connect_url = 'http://localhost:8081/vsk-portal-api';
//let connect_url = 'http://192.168.1.247/intranet/acc-api';

//let auth_get = connect_url + '/v1/itemmaster_lov_get';
//let stmas_get = connect_url + '/v1/importupdatedata_stmas_list_get';
//let ck_code = connect_url + '/v1/gcode_get';
//let ck_item = connect_url + '/v1/stmas_get';
//let gcode_url = connect_url + '/v1/gcode_get';
//let barcode_url = connect_url + '/v1/barcode_get';
//let uom_url = connect_url + '/v1/uom_get';
//let location_url = connect_url + '/v1/location_get';
//let printerzone_url = connect_url + '/v1/printerzone_get';
//let lovdata_url = connect_url + '/v1/itemmaster_lov_get';

let ItemMaster_ImportCommonPrice_Create = connect_url + '/v1/ImportCommonPrice_Create';
let ItemMaster_ImportCommonPriceTran_Create = connect_url + '/v1/ImportCommonPrice_Tran_Create';
let ItemMaster_ImportCommonPrice_TemplateGet = connect_url + '/v1/ItemMaster_ImportCommonPrice_TemplateGet';
let ItemMaster_ImportCommonPrice_CalcStatus = connect_url + '/v1/ItemMaster_ImportCommonPrice_CalcStatus';
let ItemMaster_ImportCommonPrice_Update = connect_url + '/v1/ItemMaster_ImportCommonPrice_Update';

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
                var name_txt = "";

                if (val['record_status'] == 0) {
                    name_txt = '-';
                    recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;">ERROR</span>';
                } else if (val['record_status'] == 1) {
                    name_txt = val['name'];
                    recordstatus_txt = '<span style="color: green;font-weight: bold;text-align: center;">OK</span>';
                } else if (val['record_status'] == 2) {
                    name_txt = val['name'];
                    recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                }


                if (val['branch'] == null) { var val_branch = ''; } else { var val_branch = val['branch']; }
                if (val['gprice_current'] == null) { var val_gprice_current = ''; } else { var val_gprice_current = val['gprice_current']; }
                if (val['gprice'] == null) { var val_gprice = ''; } else { var val_gprice = val['gprice']; }
                if (val['gpricea'] == null) { var val_gpricea = ''; } else { var val_gpricea = val['gpricea']; }
                if (val['gpriceb'] == null) { var val_gpriceb = ''; } else { var val_gpriceb = val['gpriceb']; }
                if (val['gpricec'] == null) { var val_gpricec = ''; } else { var val_gpricec = val['gpricec']; }
                if (val['gpriced'] == null) { var val_gpriced = ''; } else { var val_gpriced = val['gpriced']; }
                if (val['gpricee'] == null) { var val_gpricee = ''; } else { var val_gpricee = val['gpricee']; }
                if (val['gpricef'] == null) { var val_gpricef = ''; } else { var val_gpricef = val['gpricef']; }
                if (val['gpera'] == null) { var val_gpera = ''; } else { var val_gpera = val['gpera']; }
                if (val['gperb'] == null) { var val_gperb = ''; } else { var val_gperb = val['gperb']; }
                if (val['gperc'] == null) { var val_gperc = ''; } else { var val_gperc = val['gperc']; }
                if (val['gperd'] == null) { var val_gperd = ''; } else { var val_gperd = val['gperd']; }
                if (val['gpere'] == null) { var val_gpere = ''; } else { var val_gpere = val['gpere']; }
                if (val['gperf'] == null) { var val_gperf = ''; } else { var val_gperf = val['gperf']; }


                $('#tbl-list-temp tbody').append('<tr>' +
                    '<td class="tx-center">' + val['item'] + '</td>' +
                    '<td class="tx-center">' + recordstatus_txt + '</td>' +
                    '<td style="width: 150px;">' + val['code'] + '</td>' +
                    '<td style="width: 150px;">' + name_txt + '</td>' +
                    '<td class="tx-center">' + val_branch + '</td>' +
                    '<td class="tx-right">' + val_gprice_current + '</td>' +
                    '<td class="tx-right">' + val_gprice + '</td>' +
                    '<td class="tx-right">' + val_gpricea + '</td>' +
                    '<td class="tx-right">' + val_gpriceb + '</td>' +
                    '<td class="tx-right">' + val_gpricec + '</td>' +
                    '<td class="tx-right">' + val_gpriced + '</td>' +
                    '<td class="tx-right">' + val_gpricee + '</td>' +
                    '<td class="tx-right">' + val_gpricef + '</td>' +
                    '<td class="tx-center">' + val_gpera + '</td>' +
                    '<td class="tx-center">' + val_gperb + '</td>' +
                    '<td class="tx-center">' + val_gperc + '</td>' +
                    '<td class="tx-center">' + val_gperd + '</td>' +
                    '<td class="tx-center">' + val_gpere + '</td>' +
                    '<td class="tx-center">' + val_gperf + '</td>' +
                    '</tr>');

            });

        } else if (currentindex == 1) {

            $.each(temp_table, function (key, val) {

                if (val['record_status'] == 1) {

                    var recordstatus_txt = "";
                    var name_txt = "";

                    if (val['record_status'] == 0) {
                        name_txt = '-';
                        recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;">ERROR</span>';
                    } else if (val['record_status'] == 1) {
                        name_txt = val['name'];
                        recordstatus_txt = '<span style="color: green;font-weight: bold;text-align: center;">OK</span>';
                    } else if (val['record_status'] == 2) {
                        name_txt = val['name'];
                        recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                    }


                    if (val['branch'] == null) { var val_branch = ''; } else { var val_branch = val['branch']; }
                    if (val['gprice_current'] == null) { var val_gprice_current = ''; } else { var val_gprice_current = val['gprice_current']; }
                    if (val['gprice'] == null) { var val_gprice = ''; } else { var val_gprice = val['gprice']; }
                    if (val['gpricea'] == null) { var val_gpricea = ''; } else { var val_gpricea = val['gpricea']; }
                    if (val['gpriceb'] == null) { var val_gpriceb = ''; } else { var val_gpriceb = val['gpriceb']; }
                    if (val['gpricec'] == null) { var val_gpricec = ''; } else { var val_gpricec = val['gpricec']; }
                    if (val['gpriced'] == null) { var val_gpriced = ''; } else { var val_gpriced = val['gpriced']; }
                    if (val['gpricee'] == null) { var val_gpricee = ''; } else { var val_gpricee = val['gpricee']; }
                    if (val['gpricef'] == null) { var val_gpricef = ''; } else { var val_gpricef = val['gpricef']; }
                    if (val['gpera'] == null) { var val_gpera = ''; } else { var val_gpera = val['gpera']; }
                    if (val['gperb'] == null) { var val_gperb = ''; } else { var val_gperb = val['gperb']; }
                    if (val['gperc'] == null) { var val_gperc = ''; } else { var val_gperc = val['gperc']; }
                    if (val['gperd'] == null) { var val_gperd = ''; } else { var val_gperd = val['gperd']; }
                    if (val['gpere'] == null) { var val_gpere = ''; } else { var val_gpere = val['gpere']; }
                    if (val['gperf'] == null) { var val_gperf = ''; } else { var val_gperf = val['gperf']; }


                    $('#tbl-list-temp tbody').append('<tr>' +
                        '<td class="tx-center">' + val['item'] + '</td>' +
                        '<td class="tx-center">' + recordstatus_txt + '</td>' +
                        '<td style="width: 150px;">' + val['code'] + '</td>' +
                        '<td style="width: 150px;">' + name_txt + '</td>' +
                        '<td class="tx-center">' + val_branch + '</td>' +
                        '<td class="tx-right">' + val_gprice_current + '</td>' +
                        '<td class="tx-right">' + val_gprice + '</td>' +
                        '<td class="tx-right">' + val_gpricea + '</td>' +
                        '<td class="tx-right">' + val_gpriceb + '</td>' +
                        '<td class="tx-right">' + val_gpricec + '</td>' +
                        '<td class="tx-right">' + val_gpriced + '</td>' +
                        '<td class="tx-right">' + val_gpricee + '</td>' +
                        '<td class="tx-right">' + val_gpricef + '</td>' +
                        '<td class="tx-center">' + val_gpera + '</td>' +
                        '<td class="tx-center">' + val_gperb + '</td>' +
                        '<td class="tx-center">' + val_gperc + '</td>' +
                        '<td class="tx-center">' + val_gperd + '</td>' +
                        '<td class="tx-center">' + val_gpere + '</td>' +
                        '<td class="tx-center">' + val_gperf + '</td>' +
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

        fetch(ItemMaster_ImportCommonPrice_Update + '?temp_id=' + template_id + '&updated_by=' + username + '&updated_by2=' + fname).then(function (response) {
            return response.json();
        }).then(function (result) {

            console.log("updated");
            toastr.success('Updated data successfully');

            setTimeout(function () {
                $.LoadingOverlay("hide");
            }, 1000);

        }).then(function (result) {
            setTimeout(function () {
                $.LoadingOverlay("hide");
            }, 1000);
        });

        

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
            setTimeout(function () {
                location.reload();
            }, 1000);
        }
    });


    $('#wizards').find('#btn_downloadtemplate').on('click', function (evt) {
        location.href = template_url + 'Template_ImportCommonPrice.xlsx';
        console.log("...downloadtemplate...");
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

    //fetch(auth_get + '?lov_code=' + username + '&lov_group=Auth&lov_type=ItemMaster Information').then(function (response) {
    //    return response.json();
    //}).then(function (result) {
    //    //console.log("result", result);
    //    $.each(result.data, function (key, val) {
    //        authorize = val['lov2'];
    //    });
    //    console.log("authorize", authorize);
    //});


    $('#customFile').on('change', function (evt) {

        evt.preventDefault();

        if ($(this).val() !== '') {

            //alert("555");
            //return false;

            $('#wizards').find('#customFile').prop("disabled", true);

            let i = 0;

            readXlsxFile(this.files[0], { dateFormat: 'YYYY/MM/DD_hh:mm:ss' }).then(async function (result) {

                //console.log("Length: ", result.length);

                if (result.length > 2) {

                    $.LoadingOverlay("show", {
                        image: '',
                        custom: customElement
                    });

                    count_length = result.length - 2;
                    //console.log("count_length", count_length);
                    console.log("result", result);

                    let add_data = {
                        'temp_id': temp_id,
                        'countitem_all': count_length,
                        'created_by': username,
                        'created_by2': fname,
                    };

                    var params = [];
                    for (const i in add_data) {
                        params.push(i + "=" + encodeURIComponent(add_data[i]));
                    }

                    console.log("ItemMaster_ImportCommonPrice_Create", params);

                    fetch(ItemMaster_ImportCommonPrice_Create, {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        mode: 'no-cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        body: params.join("&"),
                    }).then(data => {

                        let count_row = 0;
                        let count_index = 0;

                        var citem_commonprice_tran_create = [];

                        $.each(result, function (key, val) {

                            if (i > 1) {

                                ++count_row;

                                if (val[9] == '0.00%' || val[9] == '0%' || val[9] == '-0.00%' || val[9] == '-0%') { var val_gpera = '-0.01%'; } else if (val[9] == '0.00%+7%K' || val[9] == '0%+7%' || val[9] == '-0.00%+7%K' || val[9] == '-0%+7%') { var val_gpera = '-0.01%+7%K'; } else { var val_gpera = val[9]; }
                                if (val[10] == '0.00%' || val[10] == '0%' || val[10] == '-0.00%' || val[10] == '-0%') { var val_gperb = '-0.01%'; } else if (val[10] == '0.00%+7%K' || val[10] == '0%+7%' || val[10] == '-0.00%+7%K' || val[10] == '-0%+7%') { var val_gperb = '-0.01%+7%K'; } else { var val_gperb = val[10]; }
                                if (val[11] == '0.00%' || val[11] == '0%' || val[11] == '-0.00%' || val[11] == '-0%') { var val_gperc = '-0.01%'; } else if (val[11] == '0.00%+7%K' || val[11] == '0%+7%' || val[11] == '-0.00%+7%K' || val[11] == '-0%+7%') { var val_gperc = '-0.01%+7%K'; } else { var val_gperc = val[11]; }
                                if (val[12] == '0.00%' || val[12] == '0%' || val[12] == '-0.00%' || val[12] == '-0%') { var val_gperd = '-0.01%'; } else if (val[12] == '0.00%+7%K' || val[12] == '0%+7%' || val[12] == '-0.00%+7%K' || val[12] == '-0%+7%') { var val_gperd = '-0.01%+7%K'; } else { var val_gperd = val[12]; }
                                if (val[13] == '0.00%' || val[13] == '0%' || val[13] == '-0.00%' || val[13] == '-0%') { var val_gpere = '-0.01%'; } else if (val[13] == '0.00%+7%K' || val[13] == '0%+7%' || val[13] == '-0.00%+7%K' || val[13] == '-0%+7%') { var val_gpere = '-0.01%+7%K'; } else { var val_gpere = val[13]; }
                                if (val[14] == '0.00%' || val[14] == '0%' || val[14] == '-0.00%' || val[14] == '-0%') { var val_gperf = '-0.01%'; } else if (val[14] == '0.00%+7%K' || val[14] == '0%+7%' || val[14] == '-0.00%+7%K' || val[14] == '-0%+7%') { var val_gperf = '-0.01%+7%K'; } else { var val_gperf = val[14]; }

                                citem_commonprice_tran_create.push({
                                    'temp_id': temp_id,
                                    'item': count_row,
                                    'code': val[0],
                                    'branch': val[1],
                                    'gprice': val[2],
                                    'gpriceA': val[3],
                                    'gpriceB': val[4],
                                    'gpriceC': val[5],
                                    'gpriceD': val[6],
                                    'gpriceE': val[7],
                                    'gpriceF': val[8],
                                    //'gperA': val[9],
                                    //'gperB': val[10],
                                    //'gperC': val[11],
                                    //'gperD': val[12],
                                    //'gperE': val[13],
                                    //'gperF': val[14],
                                    'gperA': val_gpera,
                                    'gperB': val_gperb,
                                    'gperC': val_gperc,
                                    'gperD': val_gperd,
                                    'gperE': val_gpere,
                                    'gperF': val_gperf,
                                    'created_by': username,
                                    'created_by2': fname,
                                });
                            }

                            i++

                        });


                        console.log("citem_commonprice_tran_create", citem_commonprice_tran_create);


                        $.ajax({
                            url: ItemMaster_ImportCommonPriceTran_Create,
                            type: 'POST',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify(citem_commonprice_tran_create),
                            success: function (data) {

                                console.log("ItemMaster_ImportCommonPriceTran_Create", data);

                                fetch(ItemMaster_ImportCommonPrice_TemplateGet + '?temp_id=' + temp_id + '&created_by=' + username + '&created_by2=' + fname).then(function (response) {
                                    return response.json();
                                }).then(function (result) {

                                    console.log("ItemMaster_ImportCommonPrice_TemplateGet", result.data);
                                    temp_table = result.data;

                                    //return false;

                                    $.each(result.data, function (key, val) {

                                        var recordstatus_txt = "";
                                        var name_txt = "";
                                        //var vat_txt = "";

                                        if (val['record_status'] == 0) {
                                            if (val['name'] == null || val['name'] == '') {
                                                name_txt = '-';
                                            } else {
                                                name_txt = val['name'];
                                            }

                                            if (val['error_id'] !== null && val['error_message'] !== null) {
                                                //recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center; data-placement="right" data-toggle="tooltip-primary" title="' + val['error_message'] + '">ERROR</span>';
                                                recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;">ERROR</span>&nbsp;&nbsp;<i class="fa fa-exclamation-triangle tx-danger" data-placement="right" data-toggle="tooltip-primary" title="' + val['error_message'] + '"></i>';
                                            } else {
                                                recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;">ERROR</span>';
                                            }
                                            //recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;">ERROR</span>';
                                        } else if (val['record_status'] == 1) {
                                            name_txt = val['name'];
                                            recordstatus_txt = '<span style="color: green;font-weight: bold;text-align: center;">OK</span>';
                                        } else if (val['record_status'] == 2) {
                                            name_txt = val['name'];
                                            if (val['error_id'] !== null && val['error_message'] !== null) {
                                                //recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;" data-placement="right" data-toggle="tooltip-primary" title="' + val['error_message'] + '">DUPLICATE</span><span style="text-align: center;font-size: 11px;"><br>' + val['error_message'] + '</span>';
                                                recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>&nbsp;&nbsp;<i class="fa fa-exclamation-triangle tx-danger" data-placement="right" data-toggle="tooltip-primary" title="' + val['error_message'] + '"></i>';
                                            } else {
                                                recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                                            }
                                        }

                                        //if (val['vat'] == 1) {
                                        //    vat_txt = '<span style="text-align: center;">VAT Exclude</span>';
                                        //} else if (val['vat'] == 2) {
                                        //    vat_txt = '<span style="text-align: center;">VAT Include</span>';
                                        //} else if (val['vat'] == 3) {
                                        //    vat_txt = '<span style="text-align: center;">VAT Exempted</span>';
                                        //}

                                        //console.log("lifecyclereviewdate", val['lifecyclereviewdate']);

                                        if (val['branch'] == null) { var val_branch = ''; } else { var val_branch = val['branch']; }
                                        if (val['gprice_current'] == null) { var val_gprice_current = ''; } else { var val_gprice_current = val['gprice_current']; }
                                        if (val['gprice'] == null) { var val_gprice = ''; } else { var val_gprice = val['gprice']; }
                                        if (val['gpricea'] == null) { var val_gpricea = ''; } else { var val_gpricea = val['gpricea']; }
                                        if (val['gpriceb'] == null) { var val_gpriceb = ''; } else { var val_gpriceb = val['gpriceb']; }
                                        if (val['gpricec'] == null) { var val_gpricec = ''; } else { var val_gpricec = val['gpricec']; }
                                        if (val['gpriced'] == null) { var val_gpriced = ''; } else { var val_gpriced = val['gpriced']; }
                                        if (val['gpricee'] == null) { var val_gpricee = ''; } else { var val_gpricee = val['gpricee']; }
                                        if (val['gpricef'] == null) { var val_gpricef = ''; } else { var val_gpricef = val['gpricef']; }
                                        if (val['gpera'] == null) { var val_gpera = ''; } else { var val_gpera = val['gpera']; }
                                        if (val['gperb'] == null) { var val_gperb = ''; } else { var val_gperb = val['gperb']; }
                                        if (val['gperc'] == null) { var val_gperc = ''; } else { var val_gperc = val['gperc']; }
                                        if (val['gperd'] == null) { var val_gperd = ''; } else { var val_gperd = val['gperd']; }
                                        if (val['gpere'] == null) { var val_gpere = ''; } else { var val_gpere = val['gpere']; }
                                        if (val['gperf'] == null) { var val_gperf = ''; } else { var val_gperf = val['gperf']; }


                                        $('#tbl-list-temp tbody').append('<tr>' +
                                            '<td class="tx-center">' + val['item'] + '</td>' +
                                            '<td class="tx-center">' + recordstatus_txt + '</td>' +
                                            '<td style="width: 150px;">' + val['code'] + '</td>' +
                                            '<td style="width: 150px;">' + name_txt + '</td>' +
                                            '<td class="tx-center">' + val_branch + '</td>' +
                                            '<td class="tx-right">' + val_gprice_current + '</td>' +
                                            '<td class="tx-right">' + val_gprice + '</td>' +
                                            '<td class="tx-right">' + val_gpricea + '</td>' +
                                            '<td class="tx-right">' + val_gpriceb + '</td>' +
                                            '<td class="tx-right">' + val_gpricec + '</td>' +
                                            '<td class="tx-right">' + val_gpriced + '</td>' +
                                            '<td class="tx-right">' + val_gpricee + '</td>' +
                                            '<td class="tx-right">' + val_gpricef + '</td>' +
                                            '<td class="tx-center">' + val_gpera + '</td>' +
                                            '<td class="tx-center">' + val_gperb + '</td>' +
                                            '<td class="tx-center">' + val_gperc + '</td>' +
                                            '<td class="tx-center">' + val_gperd + '</td>' +
                                            '<td class="tx-center">' + val_gpere + '</td>' +
                                            '<td class="tx-center">' + val_gperf + '</td>' +
                                            //'<td class="tx-center">' + vat_txt + '</td>' +
                                            '</tr>');


                                        $('[data-toggle="tooltip"]').tooltip();
                                        // colored tooltip
                                        $('[data-toggle="tooltip-primary"]').tooltip({
                                            template: '<div class="tooltip tooltip-primary" role="tooltip"><div class="arrow"><\/div><div class="tooltip-inner"><\/div><\/div>'
                                        });
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
                                    //                columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
                                    //            }
                                    //        },
                                    //    ],
                                    //});


                                    fetch(ItemMaster_ImportCommonPrice_CalcStatus + '?temp_id=' + temp_id + '&updated_by=' + username + '&updated_by2=' + fname).then(function (response) {
                                        return response.json();
                                    }).then(function (result) {

                                        $.each(result.data, function (key, val) {

                                            $("#wizards").find("#countitem_all").html(val['countitem_all']);
                                            $("#wizards").find("#countitem_incomplete").html(val['countitem_incomplete']);
                                            $("#wizards").find("#countitem_complete").html(val['countitem_complete']);
                                            $("#wizards").find("#countitem_problem").html(val['countitem_incomplete']);

                                            setTimeout(function () {
                                                $.LoadingOverlay("hide");
                                            }, 1200);
                                            console.log("success");

                                        });

                                    });

                                });

                            }
                        }).done(function () {


                        });

                    }).catch(error => {
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