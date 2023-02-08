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

let ItemMaster_ImportUpdateData_Update = connect_url + '/v1/ItemMaster_ImportUpdateData_Update_UAT';
let ItemMaster_ImportUpdateData_CalcStatus = connect_url + '/v1/ItemMaster_ImportUpdateData_CalcStatus';
let ItemMaster_ImportUpdateData_TemplateGet = connect_url + '/v1/ItemMaster_ImportUpdateData_TemplateGet';
let ItemMaster_ImportUpdateData_Create = connect_url + '/v1/ImportUpdateData_Create';
let ItemMaster_ImportUpdateDataTran_Create = connect_url + '/v1/ImportUpdateData_Tran_Create_UAT';

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

    //$('.container').find('.breadcrumb-header').append('<div class="d-flex my-xl-auto right-content"><div class= "mb-3 mb-xl-0" ><h4 style="color: red;">UAT Version</h4></div ></div >');


    $.fntemptable = function (currentindex) {

        $('#tbl-list-temp tbody').empty();

        if (currentindex == 0) {

            $.each(temp_table, function (key, val) {

                //console.log("Val", val);
                var recordstatus_txt = "";
                var name_txt = "";
                var prefsuppliername_txt = "";

                if (val['record_status'] == 0) {
                    name_txt = '-';
                    prefsuppliername_txt = '-';
                    recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;">ERROR</span>';
                } else if (val['record_status'] == 1) {
                    name_txt = val['name'];
                    prefsuppliername_txt = val['prefsuppliername'];
                    recordstatus_txt = '<span style="color: green;font-weight: bold;text-align: center;">OK</span>';
                } else if (val['record_status'] == 2) {
                    name_txt = val['name'];
                    prefsuppliername_txt = val['prefsuppliername'];
                    recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                }


                if (val['cartype'] == null) { var val_cartype = ''; } else { var val_cartype = val['cartype']; }
                if (val['usagepercar'] == null) { var val_usagepercar = ''; } else { var val_usagepercar = val['usagepercar']; }
                if (val['serviceyear'] == null) { var val_serviceyear = ''; } else { var val_serviceyear = val['serviceyear']; }
                if (val['productqtyperpack'] == null) { var val_productqtyperpack = ''; } else { var val_productqtyperpack = val['productqtyperpack']; }
                if (val['productsize'] == null) { var val_productsize = ''; } else { var val_productsize = val['productsize']; }
                if (val['maxdiscountpercent'] == null) { var val_maxdiscountpercent = ''; } else { var val_maxdiscountpercent = val['maxdiscountpercent']; }
                if (val['minmarginpercent'] == null) { var val_minmarginpercent = ''; } else { var val_minmarginpercent = val['minmarginpercent']; }
                if (val['vatdiscmargin'] == null) { var val_vatdiscmargin = ''; } else { var val_vatdiscmargin = val['vatdiscmargin']; }
                if (val['stockstatus'] == null) { var val_stockstatus = ''; } else { var val_stockstatus = val['stockstatus']; }
                if (val['remarkbypm'] == null) { var val_remarkbypm = ''; } else { var val_remarkbypm = val['remarkbypm']; }
                if (val['skufocus'] == null) { var val_skufocus = ''; } else { var val_skufocus = val['skufocus']; }
                if (val['donotpur'] == null) { var val_donotpur = ''; } else { var val_donotpur = val['donotpur']; }
                if (val['donotsale'] == null) { var val_donotsale = ''; } else { var val_donotsale = val['donotsale']; }
                if (val['ginactive'] == null) { var val_ginactive = ''; } else { var val_ginactive = val['ginactive']; }
                if (val['custconfirm'] == null) { var val_custconfirm = ''; } else { var val_custconfirm = val['custconfirm']; }
                if (val['lifecycleaction'] == null) { var val_lifecycleaction = ''; } else { var val_lifecycleaction = val['lifecycleaction']; }
                if (val['lifecyclereviewdate'] == '0001-01-01T00:00:00') { var val_lifecyclereviewdate = ''; } else { var val_lifecyclereviewdate = moment(val['lifecyclereviewdate']).format('DD/MM/YYYY'); }
                if (val['certificationstatus'] == null) { var val_certificationstatus = ''; } else { var val_certificationstatus = val['certificationstatus']; }
                if (val['lockcode'] == null) { var val_lockcode = ''; } else { var val_lockcode = val['lockcode']; }
                if (val['supersessionbarcode'] == null) { var val_supersessionbarcode = ''; } else { var val_supersessionbarcode = val['supersessionbarcode']; }
                if (val['relationshiptype'] == null) { var val_relationshiptype = ''; } else { var val_relationshiptype = val['relationshiptype']; }
                if (val['planing_type'] == null) { var val_planing_type = ''; } else { var val_planing_type = val['planing_type']; }
                if (val['source_type'] == null) { var val_source_type = ''; } else { var val_source_type = val['source_type']; }
                if (val['manualsafetystock'] == null) { var val_manualsafetystock = ''; } else { var val_manualsafetystock = val['manualsafetystock']; }
                if (val['moq'] == null) { var val_moq = ''; } else { var val_moq = val['moq']; }
                if (val['leadtimesupplier'] == null) { var val_leadtimesupplier = ''; } else { var val_leadtimesupplier = val['leadtimesupplier']; }
                if (val['leadtimeitem'] == null) { var val_leadtimeitem = ''; } else { var val_leadtimeitem = val['leadtimeitem']; }
                if (val['minqtyconst'] == null) { var val_minqtyconst = ''; } else { var val_minqtyconst = val['minqtyconst']; }
                if (val['maxqtyconst'] == null) { var val_maxqtyconst = ''; } else { var val_maxqtyconst = val['maxqtyconst']; }
                if (val['purchase'] == null) { var val_purchase = ''; } else { var val_purchase = val['purchase']; }
                if (val['purcon'] == null) { var val_purcon = ''; } else { var val_purcon = val['purcon']; }
                if (val['prefsuppliercode'] == null) { var val_prefsuppliercode = ''; var val_prefsuppliername = ''; } else { var val_prefsuppliercode = val['prefsuppliercode']; var val_prefsuppliername = val['prefsuppliername']; }
                if (val['prefsupplierdisc'] == null) { var val_prefsupplierdisc = ''; } else { var val_prefsupplierdisc = val['prefsupplierdisc']; }
                if (val['discgroup'] == null) { var val_discgroup = ''; } else { var val_discgroup = val['discgroup']; }
                if (val['purdiscgroup'] == null) { var val_purdiscgroup = ''; } else { var val_purdiscgroup = val['purdiscgroup']; }
                if (val['salediscgroup'] == null) { var val_salediscgroup = ''; } else { var val_salediscgroup = val['salediscgroup']; }
                if (val['transferunit'] == null) { var val_transferunit = ''; } else { var val_transferunit = val['transferunit']; }
                if (val['minqtywarehouse'] == null) { var val_minqtywarehouse = ''; } else { var val_minqtywarehouse = val['minqtywarehouse']; }
                if (val['maxqtywarehouse'] == null) { var val_maxqtywarehouse = ''; } else { var val_maxqtywarehouse = val['maxqtywarehouse']; }
                if (val['spcodes'] == null) { var val_spcodes = ''; } else { var val_spcodes = val['spcodes']; }
                if (val['codeoem'] == null) { var val_codeoem = ''; } else { var val_codeoem = val['codeoem']; }
                if (val['gdimension'] == null) { var val_gdimension = ''; } else { var val_gdimension = val['gdimension']; }
                if (val['carbrand'] == null) { var val_carbrand = ''; } else { var val_carbrand = val['carbrand']; }
                if (val['carmodel'] == null) { var val_carmodel = ''; } else { var val_carmodel = val['carmodel']; }
                if (val['cargeneration'] == null) { var val_cargeneration = ''; } else { var val_cargeneration = val['cargeneration']; }
                if (val['matchinno'] == null) { var val_matchinno = ''; } else { var val_matchinno = val['matchinno']; }
                if (val['bodyno'] == null) { var val_bodyno = ''; } else { var val_bodyno = val['bodyno']; }
                if (val['carengine'] == null) { var val_carengine = ''; } else { var val_carengine = val['carengine']; }
                if (val['carbody'] == null) { var val_carbody = ''; } else { var val_carbody = val['carbody']; }
                if (val['carbodycode'] == null) { var val_carbodycode = ''; } else { var val_carbodycode = val['carbodycode']; }
                if (val['carfmyear'] == null) { var val_carfmyear = ''; } else { var val_carfmyear = val['carfmyear']; }
                if (val['cartoyear'] == null) { var val_cartoyear = ''; } else { var val_cartoyear = val['cartoyear']; }
                if (val['gdescript'] == null) { var val_gdescript = ''; } else { var val_gdescript = val['gdescript']; }


                $('#tbl-list-temp tbody').append('<tr>' +
                    '<td class="tx-center">' + val['item'] + '</td>' +
                    '<td class="tx-center">' + recordstatus_txt + '</td>' +
                    '<td style="width: 150px;">' + val['code'] + '</td>' +
                    '<td style="width: 150px;">' + name_txt + '</td>' +
                    '<td class="tx-center">' + val_cartype + '</td>' +
                    '<td class="tx-center">' + val_usagepercar + '</td>' +
                    '<td class="tx-center">' + val_serviceyear + '</td>' +
                    '<td class="tx-center">' + val_productqtyperpack + '</td>' +
                    '<td class="tx-center">' + val_productsize + '</td>' +
                    '<td class="tx-center">' + val_maxdiscountpercent + '</td>' +
                    '<td class="tx-center">' + val_minmarginpercent + '</td>' +
                    '<td class="tx-center">' + val_vatdiscmargin + '</td>' +
                    '<td class="tx-center">' + val_stockstatus + '</td>' +
                    '<td>' + val_remarkbypm + '</td>' +
                    '<td class="tx-center">' + val_skufocus + '</td>' +
                    '<td class="tx-center">' + val_donotpur + '</td>' +
                    '<td class="tx-center">' + val_donotsale + '</td>' +
                    '<td class="tx-center">' + val_ginactive + '</td>' +
                    '<td class="tx-center">' + val_custconfirm + '</td>' +
                    '<td class="tx-center">' + val_lifecycleaction + '</td>' +
                    '<td class="tx-center">' + val_lifecyclereviewdate + '</td>' +
                    '<td class="tx-center">' + val_certificationstatus + '</td>' +
                    '<td class="tx-center">' + val_supersessionbarcode + '</td>' +
                    '<td class="tx-center">' + val_relationshiptype + '</td>' +
                    '<td class="tx-center">' + val_lockcode + '</td>' +
                    '<td class="tx-center">' + val_planing_type + '</td>' +
                    '<td class="tx-center">' + val_source_type + '</td>' +
                    '<td class="tx-center">' + val_manualsafetystock + '</td>' +
                    '<td class="tx-center">' + val_moq + '</td>' +
                    '<td class="tx-center">' + val_leadtimesupplier + '</td>' +
                    '<td class="tx-center">' + val_leadtimeitem + '</td>' +
                    '<td class="tx-center">' + val_minqtyconst + '</td>' +
                    '<td class="tx-center">' + val_maxqtyconst + '</td>' +
                    '<td class="tx-center">' + val_purchase + '</td>' +
                    '<td>' + val_purcon + '</td>' +
                    '<td>' + val_prefsuppliercode + '</td>' +
                    '<td style="width: 150px;">' + val_prefsuppliername + '</td>' +
                    '<td class="tx-center">' + val_prefsupplierdisc + '</td>' +
                    '<td class="tx-center">' + val_discgroup + '</td>' +
                    '<td class="tx-center">' + val_purdiscgroup + '</td>' +
                    '<td class="tx-center">' + val_salediscgroup + '</td>' +
                    '<td class="tx-center">' + val_transferunit + '</td>' +
                    '<td class="tx-center">' + val_minqtywarehouse + '</td>' +
                    '<td class="tx-center">' + val_maxqtywarehouse + '</td>' +
                    '<td class="tx-center">' + val_spcodes + '</td>' +
                    '<td class="tx-center">' + val_codeoem + '</td>' +
                    '<td class="tx-center">' + val_gdimension + '</td>' +
                    '<td class="tx-center">' + val_carbrand + '</td>' +
                    '<td class="tx-center">' + val_carmodel + '</td>' +
                    '<td class="tx-center">' + val_cargeneration + '</td>' +
                    '<td class="tx-center">' + val_matchinno + '</td>' +
                    '<td class="tx-center">' + val_bodyno + '</td>' +
                    '<td class="tx-center">' + val_carengine + '</td>' +
                    '<td class="tx-center">' + val_carbody + '</td>' +
                    '<td class="tx-center">' + val_carbodycode + '</td>' +
                    '<td class="tx-center">' + val_carfmyear + '</td>' +
                    '<td class="tx-center">' + val_cartoyear + '</td>' +
                    '<td class="tx-center">' + val_gdescript + '</td>' +
                    '</tr>');


                //$('#tbl-list-temp tbody').append('<tr>' +
                //    '<td>' + val['item'] + '</td>' +
                //    '<td>' + recordstatus_txt + '</td>' +
                //    '<td>' + val['code'] + '</td>' +
                //    '<td>' + name_txt + '</td>' +
                //    '<td>' + val['cartype'] + '</td>' +
                //    '<td>' + val['usagepercar'] + '</td>' +
                //    '<td>' + val['serviceyear'] + '</td>' +
                //    '<td>' + val['productqtyperpack'] + '</td>' +
                //    '<td>' + val['productsize'] + '</td>' +
                //    '<td>' + val['stockstatus'] + '</td>' +
                //    '<td>' + val['remarkbypm'] + '</td>' +
                //    '<td>' + val['skufocus'] + '</td>' +
                //    '<td>' + val['donotpur'] + '</td>' +
                //    '<td>' + val['donotsale'] + '</td>' +
                //    '<td>' + val['ginactive'] + '</td>' +
                //    '<td>' + val['custconfirm'] + '</td>' +
                //    '<td>' + val['lifecycleaction'] + '</td>' +
                //    '<td>' + moment(val['lifecyclereviewdate'], 'YYYY-dd-MM').format('DD/MM/YYYY') + '</td>' +
                //    '<td>' + val['certificationstatus'] + '</td>' +
                //    '<td>' + val['lockcode'] + '</td>' +
                //    '<td>' + val['supersessionbarcode'] + '</td>' +
                //    '<td>' + val['relationshiptype'] + '</td>' +
                //    '<td>' + val['planing_type'] + '</td>' +
                //    '<td>' + val['source_type'] + '</td>' +
                //    '<td>' + val['manualsafetystock'] + '</td>' +
                //    '<td>' + val['moq'] + '</td>' +
                //    '<td>' + val['leadtimesupplier'] + '</td>' +
                //    '<td>' + val['leadtimeitem'] + '</td>' +
                //    '<td>' + val['minqtyconst'] + '</td>' +
                //    '<td>' + val['maxqtyconst'] + '</td>' +
                //    '<td>' + val['purchase'] + '</td>' +
                //    '<td>' + val['purcon'] + '</td>' +
                //    '<td>' + val['prefsuppliercode'] + '</td>' +
                //    '<td>' + prefsuppliername_txt + '</td>' +
                //    '<td>' + val['prefsupplierdisc'] + '</td>' +
                //    '<td>' + val['discgroup'] + '</td>' +
                //    '<td>' + val['purdiscgroup'] + '</td>' +
                //    '<td>' + val['salediscgroup'] + '</td>' +
                //    '<td>' + val['transferunit'] + '</td>' +
                //    '<td>' + val['minqtywarehouse'] + '</td>' +
                //    '<td>' + val['maxqtywarehouse'] + '</td>' +
                //    '</tr>');
            });

        } else if (currentindex == 1) {
            $.each(temp_table, function (key, val) {
                //console.log("Val", val);
                if (val['record_status'] == 1) {

                    var recordstatus_txt = "";
                    var name_txt = "";
                    var prefsuppliername_txt = "";

                    if (val['record_status'] == 1) {
                        name_txt = val['name'];
                        prefsuppliername_txt = val['prefsuppliername'];
                        recordstatus_txt = '<span style="color: green;font-weight: bold;text-align: center;">OK</span>';
                    }


                    if (val['cartype'] == null) { var val_cartype = ''; } else { var val_cartype = val['cartype']; }
                    if (val['usagepercar'] == null) { var val_usagepercar = ''; } else { var val_usagepercar = val['usagepercar']; }
                    if (val['serviceyear'] == null) { var val_serviceyear = ''; } else { var val_serviceyear = val['serviceyear']; }
                    if (val['productqtyperpack'] == null) { var val_productqtyperpack = ''; } else { var val_productqtyperpack = val['productqtyperpack']; }
                    if (val['productsize'] == null) { var val_productsize = ''; } else { var val_productsize = val['productsize']; }
                    if (val['maxdiscountpercent'] == null) { var val_maxdiscountpercent = ''; } else { var val_maxdiscountpercent = val['maxdiscountpercent']; }
                    if (val['minmarginpercent'] == null) { var val_minmarginpercent = ''; } else { var val_minmarginpercent = val['minmarginpercent']; }
                    if (val['vatdiscmargin'] == null) { var val_vatdiscmargin = ''; } else { var val_vatdiscmargin = val['vatdiscmargin']; }
                    if (val['stockstatus'] == null) { var val_stockstatus = ''; } else { var val_stockstatus = val['stockstatus']; }
                    if (val['remarkbypm'] == null) { var val_remarkbypm = ''; } else { var val_remarkbypm = val['remarkbypm']; }
                    if (val['skufocus'] == null) { var val_skufocus = ''; } else { var val_skufocus = val['skufocus']; }
                    if (val['donotpur'] == null) { var val_donotpur = ''; } else { var val_donotpur = val['donotpur']; }
                    if (val['donotsale'] == null) { var val_donotsale = ''; } else { var val_donotsale = val['donotsale']; }
                    if (val['ginactive'] == null) { var val_ginactive = ''; } else { var val_ginactive = val['ginactive']; }
                    if (val['custconfirm'] == null) { var val_custconfirm = ''; } else { var val_custconfirm = val['custconfirm']; }
                    if (val['lifecycleaction'] == null) { var val_lifecycleaction = ''; } else { var val_lifecycleaction = val['lifecycleaction']; }
                    if (val['lifecyclereviewdate'] == '0001-01-01T00:00:00') { var val_lifecyclereviewdate = ''; } else { var val_lifecyclereviewdate = moment(val['lifecyclereviewdate']).format('DD/MM/YYYY'); }
                    if (val['certificationstatus'] == null) { var val_certificationstatus = ''; } else { var val_certificationstatus = val['certificationstatus']; }
                    if (val['lockcode'] == null) { var val_lockcode = ''; } else { var val_lockcode = val['lockcode']; }
                    if (val['supersessionbarcode'] == null) { var val_supersessionbarcode = ''; } else { var val_supersessionbarcode = val['supersessionbarcode']; }
                    if (val['relationshiptype'] == null) { var val_relationshiptype = ''; } else { var val_relationshiptype = val['relationshiptype']; }
                    if (val['planing_type'] == null) { var val_planing_type = ''; } else { var val_planing_type = val['planing_type']; }
                    if (val['source_type'] == null) { var val_source_type = ''; } else { var val_source_type = val['source_type']; }
                    if (val['manualsafetystock'] == null) { var val_manualsafetystock = ''; } else { var val_manualsafetystock = val['manualsafetystock']; }
                    if (val['moq'] == null) { var val_moq = ''; } else { var val_moq = val['moq']; }
                    if (val['leadtimesupplier'] == null) { var val_leadtimesupplier = ''; } else { var val_leadtimesupplier = val['leadtimesupplier']; }
                    if (val['leadtimeitem'] == null) { var val_leadtimeitem = ''; } else { var val_leadtimeitem = val['leadtimeitem']; }
                    if (val['minqtyconst'] == null) { var val_minqtyconst = ''; } else { var val_minqtyconst = val['minqtyconst']; }
                    if (val['maxqtyconst'] == null) { var val_maxqtyconst = ''; } else { var val_maxqtyconst = val['maxqtyconst']; }
                    if (val['purchase'] == null) { var val_purchase = ''; } else { var val_purchase = val['purchase']; }
                    if (val['purcon'] == null) { var val_purcon = ''; } else { var val_purcon = val['purcon']; }
                    if (val['prefsuppliercode'] == null) { var val_prefsuppliercode = ''; var val_prefsuppliername = ''; } else { var val_prefsuppliercode = val['prefsuppliercode']; var val_prefsuppliername = val['prefsuppliername']; }
                    if (val['prefsupplierdisc'] == null) { var val_prefsupplierdisc = ''; } else { var val_prefsupplierdisc = val['prefsupplierdisc']; }
                    if (val['discgroup'] == null) { var val_discgroup = ''; } else { var val_discgroup = val['discgroup']; }
                    if (val['purdiscgroup'] == null) { var val_purdiscgroup = ''; } else { var val_purdiscgroup = val['purdiscgroup']; }
                    if (val['salediscgroup'] == null) { var val_salediscgroup = ''; } else { var val_salediscgroup = val['salediscgroup']; }
                    if (val['transferunit'] == null) { var val_transferunit = ''; } else { var val_transferunit = val['transferunit']; }
                    if (val['minqtywarehouse'] == null) { var val_minqtywarehouse = ''; } else { var val_minqtywarehouse = val['minqtywarehouse']; }
                    if (val['maxqtywarehouse'] == null) { var val_maxqtywarehouse = ''; } else { var val_maxqtywarehouse = val['maxqtywarehouse']; }
                    if (val['spcodes'] == null) { var val_spcodes = ''; } else { var val_spcodes = val['spcodes']; }
                    if (val['codeoem'] == null) { var val_codeoem = ''; } else { var val_codeoem = val['codeoem']; }
                    if (val['gdimension'] == null) { var val_gdimension = ''; } else { var val_gdimension = val['gdimension']; }
                    if (val['carbrand'] == null) { var val_carbrand = ''; } else { var val_carbrand = val['carbrand']; }
                    if (val['carmodel'] == null) { var val_carmodel = ''; } else { var val_carmodel = val['carmodel']; }
                    if (val['cargeneration'] == null) { var val_cargeneration = ''; } else { var val_cargeneration = val['cargeneration']; }
                    if (val['matchinno'] == null) { var val_matchinno = ''; } else { var val_matchinno = val['matchinno']; }
                    if (val['bodyno'] == null) { var val_bodyno = ''; } else { var val_bodyno = val['bodyno']; }
                    if (val['carengine'] == null) { var val_carengine = ''; } else { var val_carengine = val['carengine']; }
                    if (val['carbody'] == null) { var val_carbody = ''; } else { var val_carbody = val['carbody']; }
                    if (val['carbodycode'] == null) { var val_carbodycode = ''; } else { var val_carbodycode = val['carbodycode']; }
                    if (val['carfmyear'] == null) { var val_carfmyear = ''; } else { var val_carfmyear = val['carfmyear']; }
                    if (val['cartoyear'] == null) { var val_cartoyear = ''; } else { var val_cartoyear = val['cartoyear']; }
                    if (val['gdescript'] == null) { var val_gdescript = ''; } else { var val_gdescript = val['gdescript']; }


                    $('#tbl-list-temp tbody').append('<tr>' +
                        '<td class="tx-center">' + val['item'] + '</td>' +
                        '<td class="tx-center">' + recordstatus_txt + '</td>' +
                        '<td style="width: 150px;">' + val['code'] + '</td>' +
                        '<td style="width: 150px;">' + name_txt + '</td>' +
                        '<td class="tx-center">' + val_cartype + '</td>' +
                        '<td class="tx-center">' + val_usagepercar + '</td>' +
                        '<td class="tx-center">' + val_serviceyear + '</td>' +
                        '<td class="tx-center">' + val_productqtyperpack + '</td>' +
                        '<td class="tx-center">' + val_productsize + '</td>' +
                        '<td class="tx-center">' + val_maxdiscountpercent + '</td>' +
                        '<td class="tx-center">' + val_minmarginpercent + '</td>' +
                        '<td class="tx-center">' + val_vatdiscmargin + '</td>' +
                        '<td class="tx-center">' + val_stockstatus + '</td>' +
                        '<td>' + val_remarkbypm + '</td>' +
                        '<td class="tx-center">' + val_skufocus + '</td>' +
                        '<td class="tx-center">' + val_donotpur + '</td>' +
                        '<td class="tx-center">' + val_donotsale + '</td>' +
                        '<td class="tx-center">' + val_ginactive + '</td>' +
                        '<td class="tx-center">' + val_custconfirm + '</td>' +
                        '<td class="tx-center">' + val_lifecycleaction + '</td>' +
                        '<td class="tx-center">' + val_lifecyclereviewdate + '</td>' +
                        '<td class="tx-center">' + val_certificationstatus + '</td>' +
                        '<td class="tx-center">' + val_supersessionbarcode + '</td>' +
                        '<td class="tx-center">' + val_relationshiptype + '</td>' +
                        '<td class="tx-center">' + val_lockcode + '</td>' +
                        '<td class="tx-center">' + val_planing_type + '</td>' +
                        '<td class="tx-center">' + val_source_type + '</td>' +
                        '<td class="tx-center">' + val_manualsafetystock + '</td>' +
                        '<td class="tx-center">' + val_moq + '</td>' +
                        '<td class="tx-center">' + val_leadtimesupplier + '</td>' +
                        '<td class="tx-center">' + val_leadtimeitem + '</td>' +
                        '<td class="tx-center">' + val_minqtyconst + '</td>' +
                        '<td class="tx-center">' + val_maxqtyconst + '</td>' +
                        '<td class="tx-center">' + val_purchase + '</td>' +
                        '<td>' + val_purcon + '</td>' +
                        '<td style="width: 150px;">' + val_prefsuppliercode + '</td>' +
                        '<td>' + val_prefsuppliername + '</td>' +
                        '<td class="tx-center">' + val_prefsupplierdisc + '</td>' +
                        '<td class="tx-center">' + val_discgroup + '</td>' +
                        '<td class="tx-center">' + val_purdiscgroup + '</td>' +
                        '<td class="tx-center">' + val_salediscgroup + '</td>' +
                        '<td class="tx-center">' + val_transferunit + '</td>' +
                        '<td class="tx-center">' + val_minqtywarehouse + '</td>' +
                        '<td class="tx-center">' + val_maxqtywarehouse + '</td>' +
                        '<td class="tx-center">' + val_spcodes + '</td>' +
                        '<td class="tx-center">' + val_codeoem + '</td>' +
                        '<td class="tx-center">' + val_gdimension + '</td>' +
                        '<td class="tx-center">' + val_carbrand + '</td>' +
                        '<td class="tx-center">' + val_carmodel + '</td>' +
                        '<td class="tx-center">' + val_cargeneration + '</td>' +
                        '<td class="tx-center">' + val_matchinno + '</td>' +
                        '<td class="tx-center">' + val_bodyno + '</td>' +
                        '<td class="tx-center">' + val_carengine + '</td>' +
                        '<td class="tx-center">' + val_carbody + '</td>' +
                        '<td class="tx-center">' + val_carbodycode + '</td>' +
                        '<td class="tx-center">' + val_carfmyear + '</td>' +
                        '<td class="tx-center">' + val_cartoyear + '</td>' +
                        '<td class="tx-center">' + val_gdescript + '</td>' +
                        '</tr>');


                    //$('#tbl-list-temp tbody').append('<tr>' +
                    //    '<td>' + val['item'] + '</td>' +
                    //    '<td>' + recordstatus_txt + '</td>' +
                    //    '<td>' + val['code'] + '</td>' +
                    //    '<td>' + name_txt + '</td>' +
                    //    '<td>' + val['cartype'] + '</td>' +
                    //    '<td>' + val['usagepercar'] + '</td>' +
                    //    '<td>' + val['serviceyear'] + '</td>' +
                    //    '<td>' + val['productqtyperpack'] + '</td>' +
                    //    '<td>' + val['productsize'] + '</td>' +
                    //    '<td>' + val['stockstatus'] + '</td>' +
                    //    '<td>' + val['remarkbypm'] + '</td>' +
                    //    '<td>' + val['skufocus'] + '</td>' +
                    //    '<td>' + val['donotpur'] + '</td>' +
                    //    '<td>' + val['donotsale'] + '</td>' +
                    //    '<td>' + val['ginactive'] + '</td>' +
                    //    '<td>' + val['custconfirm'] + '</td>' +
                    //    '<td>' + val['lifecycleaction'] + '</td>' +
                    //    '<td>' + moment(val['lifecyclereviewdate'], 'YYYY-dd-MM').format('DD/MM/YYYY') + '</td>' +
                    //    '<td>' + val['certificationstatus'] + '</td>' +
                    //    '<td>' + val['lockcode'] + '</td>' +
                    //    '<td>' + val['supersessionbarcode'] + '</td>' +
                    //    '<td>' + val['relationshiptype'] + '</td>' +
                    //    '<td>' + val['planing_type'] + '</td>' +
                    //    '<td>' + val['source_type'] + '</td>' +
                    //    '<td>' + val['manualsafetystock'] + '</td>' +
                    //    '<td>' + val['moq'] + '</td>' +
                    //    '<td>' + val['leadtimesupplier'] + '</td>' +
                    //    '<td>' + val['leadtimeitem'] + '</td>' +
                    //    '<td>' + val['minqtyconst'] + '</td>' +
                    //    '<td>' + val['maxqtyconst'] + '</td>' +
                    //    '<td>' + val['purchase'] + '</td>' +
                    //    '<td>' + val['purcon'] + '</td>' +
                    //    '<td>' + val['prefsuppliercode'] + '</td>' +
                    //    '<td>' + prefsuppliername_txt + '</td>' +
                    //    '<td>' + val['prefsupplierdisc'] + '</td>' +
                    //    '<td>' + val['discgroup'] + '</td>' +
                    //    '<td>' + val['purdiscgroup'] + '</td>' +
                    //    '<td>' + val['salediscgroup'] + '</td>' +
                    //    '<td>' + val['transferunit'] + '</td>' +
                    //    '<td>' + val['minqtywarehouse'] + '</td>' +
                    //    '<td>' + val['maxqtywarehouse'] + '</td>' +
                    //    '</tr>');
                }
            });
        }
    };


    $.fnupdatedata = function (template_id) {

        $.LoadingOverlay("show", {
            image: '',
            custom: customElement
        });

        fetch(ItemMaster_ImportUpdateData_Update + '?temp_id=' + template_id + '&updated_by=' + username + '&updated_by2=' + fname).then(function (response) {
            return response.json();
        }).then(function (result) {

            console.log("updated");
            toastr.success('Updated data successfully');
            //setTimeout(function () {
                $.LoadingOverlay("hide");
            //}, 2000);

        }).catch(error => {
            $.LoadingOverlay("hide");
            toastr.error('Error, Please contact administrator.');
        });

        //setTimeout(function () {
        //    $.LoadingOverlay("hide");
        //}, 2000);

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
        if (authorize == 'ITM-PIT-02' || authorize == 'ITM-PM-01' || authorize == 'ITM-PM-02' || authorize == 'ITM-PUR-01' || authorize == 'ITM-PUR-02' || authorize == 'ITM-PM-03') {

            location.href = template_url + 'Import_UpdateData_' + authorize + '.xlsx';
            console.log("...downloadtemplate...");

        } else if (authorize == 'ITM-MIS-01' || authorize == 'ITM-PIT-01') {

            location.href = template_url + 'Import_UpdateData_' + authorize + '_UAT.xlsx';
            console.log("...downloadtemplate...");

        } else {
            toastr.error("No Template for your permission.");
        }
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

    fetch(auth_get + '?lov_code=' + username + '&lov_group=Auth&lov_type=ItemMaster Information').then(function (response) {
        return response.json();
    }).then(function (result) {
        //console.log("result", result);
        $.each(result.data, function (key, val) {
            authorize = val['lov2'];
        });
        console.log("authorize", authorize);
    });


    $('#customFile').on('change', function (evt) {

        evt.preventDefault();

        if ($(this).val() !== '') {

            //alert("555");
            //return false;

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

                    fetch(ItemMaster_ImportUpdateData_Create, {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        mode: 'no-cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        body: params.join("&"),
                    }).then(data => {

                        let count_row = 0;
                        let count_index = 0;

                        var citem_updateprice_tran_create = [];
                        console.log("authorize2", authorize);

                        $.each(result, function (key, val) {

                            if (i > 1) {

                                ++count_row;
                                //console.log("code: ", val[0]);

                                if (authorize == 'ITM-MIS-01') {

                                    console.log("ITM-MIS-01")

                                    citem_updateprice_tran_create.push({
                                        'auth': authorize,
                                        'temp_id': temp_id,
                                        'item': count_row,
                                        'code': val[0],
                                        'cartype': val[1],
                                        'usagepercar': val[2],
                                        'serviceyear': val[3],
                                        'productsize': val[4],
                                        'productqtyperpack': val[5],
                                        'stockstatus': val[6],
                                        'remarkbypm': val[7],
                                        'skufocus': val[8],
                                        'donotpur': val[9],
                                        'donotsale': val[10],
                                        'ginactive': val[11],
                                        'custconfirm': val[12],
                                        'lifecycleaction': val[13],
                                        'lifecyclereviewdate': $.DateToDB(moment(val[14], 'DD/MM/YYYY').format('DD/MM/YYYY')),
                                        'certificationstatus': val[15],
                                        'supersessionbarcode': val[16],
                                        'relationshiptype': val[17],
                                        'lockcode': val[18],
                                        'planing_type': val[19],
                                        'source_type': val[20],
                                        'manualsafetystock': val[21],
                                        'moq': val[22],
                                        'leadtimesupplier': val[23],
                                        'leadtimeitem': val[24],
                                        'minqtyconst': val[25],
                                        'maxqtyconst': val[26],
                                        'purchase': val[27],
                                        'purcon': val[28],
                                        'prefsuppliercode': val[29],
                                        'prefsupplierdisc': val[30],
                                        'discgroup': val[31],
                                        'purdiscgroup': val[32],
                                        'salediscgroup': val[33],
                                        'transferunit': val[34],
                                        'minqtywarehouse': val[35],
                                        'maxqtywarehouse': val[36],
                                        'maxdiscountpercent': val[37],
                                        'minmarginpercent': val[38],
                                        'vatdiscmargin': val[39],
                                        'spcodes': val[40],
                                        'codeoem': val[41],
                                        'gdimension': val[42],
                                        'carbrand': val[43],
                                        'carmodel': val[44],
                                        'cargeneration': val[45],
                                        'matchinno': val[46],
                                        'bodyno': val[47],
                                        'carengine': val[48],
                                        'carbody': val[49],
                                        'carbodycode': val[50],
                                        'carfmyear': val[51],
                                        'cartoyear': val[52],
                                        'gdescript': val[53],
                                        'created_by': username,
                                        'created_by2': fname,
                                    });

                                } else if (authorize == 'ITM-PIT-01') {

                                    console.log("ITM-PIT-01");

                                    citem_updateprice_tran_create.push({
                                        'auth': authorize,
                                        'temp_id': temp_id,
                                        'item': count_row,
                                        'code': val[0],
                                        'cartype': val[1],
                                        'usagepercar': val[2],
                                        'serviceyear': val[3],
                                        'spcodes': val[4],
                                        'codeoem': val[5],
                                        'gdimension': val[6],
                                        'carbrand': val[7],
                                        'carmodel': val[8],
                                        'cargeneration': val[9],
                                        'matchinno': val[10],
                                        'bodyno': val[11],
                                        'carengine': val[12],
                                        'carbody': val[13],
                                        'carbodycode': val[14],
                                        'carfmyear': val[15],
                                        'cartoyear': val[16],
                                        'gdescript': val[17],
                                        'created_by': username,
                                        'created_by2': fname,
                                    });

                                } else if (authorize == 'ITM-PIT-02') {

                                    citem_updateprice_tran_create.push({
                                        'auth': authorize,
                                        'temp_id': temp_id,
                                        'item': count_row,
                                        'code': val[0],
                                        'cartype': val[1],
                                        'usagepercar': val[2],
                                        'serviceyear': val[3],
                                        'created_by': username,
                                        'created_by2': fname,
                                    });

                                } else if (authorize == 'ITM-PM-01') {

                                    citem_updateprice_tran_create.push({
                                        'auth': authorize,
                                        'temp_id': temp_id,
                                        'item': count_row,
                                        'code': val[0],
                                        'usagepercar': val[1],
                                        'productsize': val[2],
                                        'productqtyperpack': val[3],
                                        'remarkbypm': val[4],
                                        'skufocus': val[5],
                                        'donotpur': val[6],
                                        'donotsale': val[7],
                                        'ginactive': val[8],
                                        'custconfirm': val[9],
                                        'lifecycleaction': val[10],
                                        'certificationstatus': val[11],
                                        'supersessionbarcode': val[12],
                                        'relationshiptype': val[13],
                                        'lockcode': val[14],
                                        'prefsuppliercode': val[15],
                                        'prefsupplierdisc': val[16],
                                        'discgroup': val[17],
                                        'purdiscgroup': val[18],
                                        'salediscgroup': val[19],
                                        'maxdiscountpercent': val[20],
                                        'minmarginpercent': val[21],
                                        'vatdiscmargin': val[22],
                                        'created_by': username,
                                        'created_by2': fname,
                                    });

                                } else if (authorize == 'ITM-PM-02') {

                                    citem_updateprice_tran_create.push({
                                        'auth': authorize,
                                        'temp_id': temp_id,
                                        'item': count_row,
                                        'code': val[0],
                                        'usagepercar': val[1],
                                        'productsize': val[2],
                                        'productqtyperpack': val[3],
                                        'remarkbypm': val[4],
                                        'skufocus': val[5],
                                        'donotsale': val[6],
                                        'ginactive': val[7],
                                        'lifecycleaction': val[8],
                                        'certificationstatus': val[9],
                                        'lockcode': val[10],
                                        'maxdiscountpercent': val[11],
                                        'minmarginpercent': val[12],
                                        'vatdiscmargin': val[13],
                                        'created_by': username,
                                        'created_by2': fname,
                                    });

                                } else if (authorize == 'ITM-PUR-01') {

                                    citem_updateprice_tran_create.push({
                                        'auth': authorize,
                                        'temp_id': temp_id,
                                        'item': count_row,
                                        'code': val[0],
                                        'stockstatus': val[1],
                                        'remarkbypm': val[2],
                                        'donotpur': val[3],
                                        'custconfirm': val[4],
                                        'lifecycleaction': val[5],
                                        'lifecyclereviewdate': $.DateToDB(moment(val[6], 'DD/MM/YYYY').format('DD/MM/YYYY')),
                                        'supersessionbarcode': val[7],
                                        'relationshiptype': val[8],
                                        'lockcode': val[9],
                                        'planing_type': val[10],
                                        'source_type': val[11],
                                        'manualsafetystock': val[12],
                                        'moq': val[13],
                                        'leadtimesupplier': val[14],
                                        'leadtimeitem': val[15],
                                        'minqtyconst': val[16],
                                        'maxqtyconst': val[17],
                                        'purchase': val[18],
                                        'purcon': val[19],
                                        'prefsuppliercode': val[20],
                                        'prefsupplierdisc': val[21],
                                        'purdiscgroup': val[22],
                                        'created_by': username,
                                        'created_by2': fname,
                                    });

                                } else if (authorize == 'ITM-PUR-02') {

                                    citem_updateprice_tran_create.push({
                                        'auth': authorize,
                                        'temp_id': temp_id,
                                        'item': count_row,
                                        'code': val[0],
                                        'prefsuppliercode': val[1],
                                        'prefsupplierdisc': val[2],
                                        'purdiscgroup': val[3],
                                        'created_by': username,
                                        'created_by2': fname,
                                    });

                                } else if (authorize == 'ITM-PM-03') {

                                    citem_updateprice_tran_create.push({
                                        'auth': authorize,
                                        'temp_id': temp_id,
                                        'item': count_row,
                                        'code': val[0],
                                        'usagepercar': val[1],
                                        'productsize': val[2],
                                        'productqtyperpack': val[3],
                                        'remarkbypm': val[4],
                                        'skufocus': val[5],
                                        'donotsale': val[6],
                                        'ginactive': val[7],
                                        'lifecycleaction': val[8],
                                        'certificationstatus': val[9],
                                        'lockcode': val[10],
                                        'prefsuppliercode': val[11],
                                        'prefsupplierdisc': val[12],
                                        'discgroup': val[13],
                                        'purdiscgroup': val[14],
                                        'salediscgroup': val[15],
                                        'maxdiscountpercent': val[16],
                                        'minmarginpercent': val[17],
                                        'vatdiscmargin': val[18],
                                        'created_by': username,
                                        'created_by2': fname,
                                    });

                                }
                            }

                            i++

                        });


                        console.log("citem_updateprice_tran_create", citem_updateprice_tran_create)


                        $.ajax({
                            url: ItemMaster_ImportUpdateDataTran_Create,
                            type: 'POST',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify(citem_updateprice_tran_create),
                            success: function (data) {

                                console.log("ItemMaster_ImportUpdateDataTran_Create", data);

                                fetch(ItemMaster_ImportUpdateData_TemplateGet + '?temp_id=' + temp_id + '&created_by=' + username + '&created_by2=' + fname).then(function (response) {
                                    return response.json();
                                }).then(function (result) {

                                    console.log("ItemMaster_ImportUpdateData_TemplateGet", result.data);
                                    temp_table = result.data;

                                    $.each(result.data, function (key, val) {

                                        var recordstatus_txt = "";
                                        var name_txt = "";
                                        var prefsuppliername_txt = "";

                                        if (val['record_status'] == 0) {
                                            name_txt = '-';
                                            prefsuppliername_txt = '-';
                                            recordstatus_txt = '<span style="color: red;font-weight: bold;text-align: center;">ERROR</span>';
                                        } else if (val['record_status'] == 1) {
                                            name_txt = val['name'];
                                            prefsuppliername_txt = val['prefsuppliername'];
                                            recordstatus_txt = '<span style="color: green;font-weight: bold;text-align: center;">OK</span>';
                                        } else if (val['record_status'] == 2) {
                                            name_txt = val['name'];
                                            prefsuppliername_txt = val['prefsuppliername'];
                                            recordstatus_txt = '<span style="color: orange;font-weight: bold;text-align: center;">DUPLICATE</span>';
                                        }

                                        //console.log("lifecyclereviewdate", val['lifecyclereviewdate']);

                                        if (val['cartype'] == null) { var val_cartype = ''; } else { var val_cartype = val['cartype']; }
                                        if (val['usagepercar'] == null) { var val_usagepercar = ''; } else { var val_usagepercar = val['usagepercar']; }
                                        if (val['serviceyear'] == null) { var val_serviceyear = ''; } else { var val_serviceyear = val['serviceyear']; }
                                        if (val['productqtyperpack'] == null) { var val_productqtyperpack = ''; } else { var val_productqtyperpack = val['productqtyperpack']; }
                                        if (val['productsize'] == null) { var val_productsize = ''; } else { var val_productsize = val['productsize']; }
                                        if (val['maxdiscountpercent'] == null) { var val_maxdiscountpercent = ''; } else { var val_maxdiscountpercent = val['maxdiscountpercent']; }
                                        if (val['minmarginpercent'] == null) { var val_minmarginpercent = ''; } else { var val_minmarginpercent = val['minmarginpercent']; }
                                        if (val['vatdiscmargin'] == null) { var val_vatdiscmargin = ''; } else { var val_vatdiscmargin = val['vatdiscmargin']; }
                                        if (val['stockstatus'] == null) { var val_stockstatus = ''; } else { var val_stockstatus = val['stockstatus']; }
                                        if (val['remarkbypm'] == null) { var val_remarkbypm = ''; } else { var val_remarkbypm = val['remarkbypm']; }
                                        if (val['skufocus'] == null) { var val_skufocus = ''; } else { var val_skufocus = val['skufocus']; }
                                        if (val['donotpur'] == null) { var val_donotpur = ''; } else { var val_donotpur = val['donotpur']; }
                                        if (val['donotsale'] == null) { var val_donotsale = ''; } else { var val_donotsale = val['donotsale']; }
                                        if (val['ginactive'] == null) { var val_ginactive = ''; } else { var val_ginactive = val['ginactive']; }
                                        if (val['custconfirm'] == null) { var val_custconfirm = ''; } else { var val_custconfirm = val['custconfirm']; }
                                        if (val['lifecycleaction'] == null) { var val_lifecycleaction = ''; } else { var val_lifecycleaction = val['lifecycleaction']; }
                                        if (val['lifecyclereviewdate'] == '0001-01-01T00:00:00') { var val_lifecyclereviewdate = ''; } else { var val_lifecyclereviewdate = moment(val['lifecyclereviewdate']).format('DD/MM/YYYY'); }
                                        if (val['certificationstatus'] == null) { var val_certificationstatus = ''; } else { var val_certificationstatus = val['certificationstatus']; }
                                        if (val['lockcode'] == null) { var val_lockcode = ''; } else { var val_lockcode = val['lockcode']; }
                                        if (val['supersessionbarcode'] == null) { var val_supersessionbarcode = ''; } else { var val_supersessionbarcode = val['supersessionbarcode']; }
                                        if (val['relationshiptype'] == null) { var val_relationshiptype = ''; } else { var val_relationshiptype = val['relationshiptype']; }
                                        if (val['planing_type'] == null) { var val_planing_type = ''; } else { var val_planing_type = val['planing_type']; }
                                        if (val['source_type'] == null) { var val_source_type = ''; } else { var val_source_type = val['source_type']; }
                                        if (val['manualsafetystock'] == null) { var val_manualsafetystock = ''; } else { var val_manualsafetystock = val['manualsafetystock']; }
                                        if (val['moq'] == null) { var val_moq = ''; } else { var val_moq = val['moq']; }
                                        if (val['leadtimesupplier'] == null) { var val_leadtimesupplier = ''; } else { var val_leadtimesupplier = val['leadtimesupplier']; }
                                        if (val['leadtimeitem'] == null) { var val_leadtimeitem = ''; } else { var val_leadtimeitem = val['leadtimeitem']; }
                                        if (val['minqtyconst'] == null) { var val_minqtyconst = ''; } else { var val_minqtyconst = val['minqtyconst']; }
                                        if (val['maxqtyconst'] == null) { var val_maxqtyconst = ''; } else { var val_maxqtyconst = val['maxqtyconst']; }
                                        if (val['purchase'] == null) { var val_purchase = ''; } else { var val_purchase = val['purchase']; }
                                        if (val['purcon'] == null) { var val_purcon = ''; } else { var val_purcon = val['purcon']; }
                                        if (val['prefsuppliercode'] == null) { var val_prefsuppliercode = ''; var val_prefsuppliername = ''; } else { var val_prefsuppliercode = val['prefsuppliercode']; var val_prefsuppliername = val['prefsuppliername']; }
                                        if (val['prefsupplierdisc'] == null) { var val_prefsupplierdisc = ''; } else { var val_prefsupplierdisc = val['prefsupplierdisc']; }
                                        if (val['discgroup'] == null) { var val_discgroup = ''; } else { var val_discgroup = val['discgroup']; }
                                        if (val['purdiscgroup'] == null) { var val_purdiscgroup = ''; } else { var val_purdiscgroup = val['purdiscgroup']; }
                                        if (val['salediscgroup'] == null) { var val_salediscgroup = ''; } else { var val_salediscgroup = val['salediscgroup']; }
                                        if (val['transferunit'] == null) { var val_transferunit = ''; } else { var val_transferunit = val['transferunit']; }
                                        if (val['minqtywarehouse'] == null) { var val_minqtywarehouse = ''; } else { var val_minqtywarehouse = val['minqtywarehouse']; }
                                        if (val['maxqtywarehouse'] == null) { var val_maxqtywarehouse = ''; } else { var val_maxqtywarehouse = val['maxqtywarehouse']; }
                                        if (val['spcodes'] == null) { var val_spcodes = ''; } else { var val_spcodes = val['spcodes']; }
                                        if (val['codeoem'] == null) { var val_codeoem = ''; } else { var val_codeoem = val['codeoem']; }
                                        if (val['gdimension'] == null) { var val_gdimension = ''; } else { var val_gdimension = val['gdimension']; }
                                        if (val['carbrand'] == null) { var val_carbrand = ''; } else { var val_carbrand = val['carbrand']; }
                                        if (val['carmodel'] == null) { var val_carmodel = ''; } else { var val_carmodel = val['carmodel']; }
                                        if (val['cargeneration'] == null) { var val_cargeneration = ''; } else { var val_cargeneration = val['cargeneration']; }
                                        if (val['matchinno'] == null) { var val_matchinno = ''; } else { var val_matchinno = val['matchinno']; }
                                        if (val['bodyno'] == null) { var val_bodyno = ''; } else { var val_bodyno = val['bodyno']; }
                                        if (val['carengine'] == null) { var val_carengine = ''; } else { var val_carengine = val['carengine']; }
                                        if (val['carbody'] == null) { var val_carbody = ''; } else { var val_carbody = val['carbody']; }
                                        if (val['carbodycode'] == null) { var val_carbodycode = ''; } else { var val_carbodycode = val['carbodycode']; }
                                        if (val['carfmyear'] == null) { var val_carfmyear = ''; } else { var val_carfmyear = val['carfmyear']; }
                                        if (val['cartoyear'] == null) { var val_cartoyear = ''; } else { var val_cartoyear = val['cartoyear']; }
                                        if (val['gdescript'] == null) { var val_gdescript = ''; } else { var val_gdescript = val['gdescript']; }



                                        $('#tbl-list-temp tbody').append('<tr>' +
                                            '<td class="tx-center">' + val['item'] + '</td>' +
                                            '<td class="tx-center">' + recordstatus_txt + '</td>' +
                                            '<td style="width: 150px;">' + val['code'] + '</td>' +
                                            '<td style="width: 150px;">' + name_txt + '</td>' +
                                            '<td class="tx-center">' + val_cartype + '</td>' +
                                            '<td class="tx-center">' + val_usagepercar + '</td>' +
                                            '<td class="tx-center">' + val_serviceyear + '</td>' +
                                            '<td class="tx-center">' + val_productqtyperpack + '</td>' +
                                            '<td class="tx-center">' + val_productsize + '</td>' +
                                            '<td class="tx-center">' + val_maxdiscountpercent + '</td>' +
                                            '<td class="tx-center">' + val_minmarginpercent + '</td>' +
                                            '<td class="tx-center">' + val_vatdiscmargin + '</td>' +
                                            '<td class="tx-center">' + val_stockstatus + '</td>' +
                                            '<td>' + val_remarkbypm + '</td>' +
                                            '<td class="tx-center">' + val_skufocus + '</td>' +
                                            '<td class="tx-center">' + val_donotpur + '</td>' +
                                            '<td class="tx-center">' + val_donotsale + '</td>' +
                                            '<td class="tx-center">' + val_ginactive + '</td>' +
                                            '<td class="tx-center">' + val_custconfirm + '</td>' +
                                            '<td class="tx-center">' + val_lifecycleaction + '</td>' +
                                            '<td class="tx-center">' + val_lifecyclereviewdate + '</td>' +
                                            '<td class="tx-center">' + val_certificationstatus + '</td>' +
                                            '<td class="tx-center">' + val_supersessionbarcode + '</td>' +
                                            '<td class="tx-center">' + val_relationshiptype + '</td>' +
                                            '<td class="tx-center">' + val_lockcode + '</td>' +
                                            '<td class="tx-center">' + val_planing_type + '</td>' +
                                            '<td class="tx-center">' + val_source_type + '</td>' +
                                            '<td class="tx-center">' + val_manualsafetystock + '</td>' +
                                            '<td class="tx-center">' + val_moq + '</td>' +
                                            '<td class="tx-center">' + val_leadtimesupplier + '</td>' +
                                            '<td class="tx-center">' + val_leadtimeitem + '</td>' +
                                            '<td class="tx-center">' + val_minqtyconst + '</td>' +
                                            '<td class="tx-center">' + val_maxqtyconst + '</td>' +
                                            '<td class="tx-center">' + val_purchase + '</td>' +
                                            '<td>' + val_purcon + '</td>' +
                                            '<td>' + val_prefsuppliercode + '</td>' +
                                            '<td style="width: 150px;">' + val_prefsuppliername + '</td>' +
                                            '<td class="tx-center">' + val_prefsupplierdisc + '</td>' +
                                            '<td class="tx-center">' + val_discgroup + '</td>' +
                                            '<td class="tx-center">' + val_purdiscgroup + '</td>' +
                                            '<td class="tx-center">' + val_salediscgroup + '</td>' +
                                            '<td class="tx-center">' + val_transferunit + '</td>' +
                                            '<td class="tx-center">' + val_minqtywarehouse + '</td>' +
                                            '<td class="tx-center">' + val_maxqtywarehouse + '</td>' +
                                            '<td class="tx-center">' + val_spcodes + '</td>' +
                                            '<td class="tx-center">' + val_codeoem + '</td>' +
                                            '<td class="tx-center">' + val_gdimension + '</td>' +
                                            '<td class="tx-center">' + val_carbrand + '</td>' +
                                            '<td class="tx-center">' + val_carmodel + '</td>' +
                                            '<td class="tx-center">' + val_cargeneration + '</td>' +
                                            '<td class="tx-center">' + val_matchinno + '</td>' +
                                            '<td class="tx-center">' + val_bodyno + '</td>' +
                                            '<td class="tx-center">' + val_carengine + '</td>' +
                                            '<td class="tx-center">' + val_carbody + '</td>' +
                                            '<td class="tx-center">' + val_carbodycode + '</td>' +
                                            '<td class="tx-center">' + val_carfmyear + '</td>' +
                                            '<td class="tx-center">' + val_cartoyear + '</td>' +
                                            '<td class="tx-center">' + val_gdescript + '</td>' +
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
                                                    columns: [0, 1, 2, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 39, 40, 41, 42, 9, 10,]
                                                }
                                            },
                                        ],
                                    });


                                    fetch(ItemMaster_ImportUpdateData_CalcStatus + '?temp_id=' + temp_id + '&updated_by=' + username + '&updated_by2=' + fname).then(function (response) {
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