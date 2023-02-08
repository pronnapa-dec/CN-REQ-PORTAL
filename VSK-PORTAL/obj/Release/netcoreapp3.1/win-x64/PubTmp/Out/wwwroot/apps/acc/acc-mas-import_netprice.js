'use strict';

let validator, oTable, table, options, item_action, item_id;

let objProfile = JSON.parse(localStorage.getItem('objProfile'));

let connect_url = 'http://localhost:8081/vsk-portal-api';
//let connect_url = 'http://192.168.1.247/intranet/acc-api';

let ck_code = connect_url + '/v1/gcode_get';
let ck_item = connect_url + '/v1/stmas_get';
let stmas_url = connect_url + '/v1/stmas_get';
let gcode_url = connect_url + '/v1/gcode_get';
let barcode_url = connect_url + '/v1/barcode_get';
let uom_url = connect_url + '/v1/uom_get';
let location_url = connect_url + '/v1/location_get';
let printerzone_url = connect_url + '/v1/printerzone_get';
let lovdata_url = connect_url + '/v1/itemmaster_lov_get';

let ItemMaster_ImportNetPrice_url = connect_url + '/v1/ImportNetPrice_Create';

let objTable = {};
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
let citem_stmas = [];

let username = "";
let url_location = "";

url_location = window.location.href;
//console.log("location", url_location);

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

    $('#wizard1').steps({
        headerTag: 'h3',
        bodyTag: 'section',
        autoFocus: true,
        titleTemplate: '<span class="number">#index#<\/span> <span class="title">#title#<\/span>'
    });

    // $('#tbl-list-temp').DataTable();

    $.each(objProfile.auth_user_profile, function (key, val) {
        var email = val['user_email'];
        email = email.split("@");
        username = email[0];
        //console.log("username", username);
    });


    $('#customFile').on('change', function (evt) {

        evt.preventDefault();

        if ($(this).val() !== '') {

            //alert("555");
            //return false;

            let ii = 0;

            readXlsxFile(this.files[0], { dateFormat: 'YYYY/MM/DD_hh:mm:ss' }).then(async function (result) {

                //if (result.length > 0) {

                //    $.LoadingOverlay("show", {
                //        image: '',
                //        custom: customElement
                //    });

                //    console.log("result", result);

                //    await fetch(gcode_url + '?ctype=gcode_a').then(function (response) {
                //        return response.json();
                //    }).then(function (result) {
                //        citem_c1 = result.data
                //        console.log('C1', citem_c1);
                //    });

                //    await fetch(gcode_url + '?ctype=gcode_b').then(function (response) {
                //        return response.json();
                //    }).then(function (result) {
                //        citem_c2 = result.data
                //        console.log('C2', citem_c2);
                //    });

                //    await fetch(gcode_url + '?ctype=gcode_c').then(function (response) {
                //        return response.json();
                //    }).then(function (result) {
                //        citem_c3 = result.data
                //        console.log('C3', citem_c3);
                //    });

                //    await fetch(gcode_url + '?ctype=gcode_d').then(function (response) {
                //        return response.json();
                //    }).then(function (result) {
                //        citem_c4 = result.data
                //        console.log('C4', citem_c4);
                //    });

                //    await fetch(gcode_url + '?ctype=gcode_e').then(function (response) {
                //        return response.json();
                //    }).then(function (result) {
                //        citem_c5 = result.data
                //        console.log('C5', citem_c5);
                //    });

                //    //await fetch(barcode_url).then(function (response) {
                //    //    return response.json();
                //    //}).then(function (result) {
                //    //    citem_barcode = result.data
                //    //    console.log('Barcode', citem_barcode);
                //    //});

                //    //await fetch(stmas_url + '?item_code=').then(function (response) {
                //    //    return response.json();
                //    //}).then(function (result) {
                //    //    citem_barcode = result.data
                //    //    console.log('Barcode', citem_barcode);
                //    //});

                //    await fetch(uom_url).then(function (response) {
                //        return response.json();
                //    }).then(function (result) {
                //        citem_uom = result.data
                //        console.log('UOM', citem_uom);
                //    });

                //    //await fetch(lovdata_url + '?lov_group=VSK_PUR&lov_type=CarBrand').then(function (response) {
                //    //    return response.json();
                //    //}).then(function (result) {
                //    //    citem_carbrand = result.data
                //    //    //console.log('CarBrand', citem_carbrand);
                //    //});

                //    //await fetch(lovdata_url + '?lov_group=VSK_PUR&lov_type=CarModel').then(function (response) {
                //    //    return response.json();
                //    //}).then(function (result) {
                //    //    citem_carmodel = result.data
                //    //    //console.log('CarModel', citem_carmodel);
                //    //});

                //    //await fetch(lovdata_url + '?lov_group=VSK_PUR&lov_type=CarType').then(function (response) {
                //    //    return response.json();
                //    //}).then(function (result) {
                //    //    citem_cartype = result.data
                //    //    //console.log('CarModel', citem_carmodel);
                //    //});

                //}

                let count_i = 0;
                let count_index = 0;
                let params = [];

                var data = {};

                await $.each(result, function (key, val) {

                    if (ii > 0) {

                        data[count_index] = {
                            'item': count_i,
                            'code': val[0],
                            'qty_a': val[1],
                            'qty_b': val[2],
                            'qtysmall': val[3],
                            'UOM': val[4],
                            'prod_net': val[5],
                            'created_by': username,
                        };

                        //console.log("data: ", data);

                        /*
                        for (const i in data) {
                            params.push(data[i]);
                        }
                        */


                        //console.log("code: ", val[0]);

                        //var code = val['0'];
                        //console.log("code..", code);
                        //var code_val = code.split("-");
                        //var code1 = code_val[0];
                        //var code2 = code_val[1];
                        //var code3 = code_val[2];
                        //var code4 = code_val[3];
                        //var code5 = code_val[4];
                        //console.log("concat code", code1 + '/' + code2 + '/' + code3 + '/' + code4 + '/' + code5);

                        //let c1_gname = citem_c1.find(citem_c1 => citem_c1.code === code1);
                        //let c2_gname = citem_c2.find(citem_c2 => citem_c2.code === code2);
                        //let c3_gname = citem_c3.find(citem_c3 => citem_c3.code === code3);
                        //let c4_gname = citem_c4.find(citem_c4 => citem_c4.code === code4);
                        //let c5_gname = citem_c5.find(citem_c5 => citem_c5.code === code5);

                        //console.log("c1_gname", c1_gname);
                        //console.log("c2_gname", c2_gname);
                        //console.log("c3_gname", c3_gname);
                        //console.log("c4_gname", c4_gname);
                        //console.log("c5_gname", c5_gname);

                        ////var cartype_val = toUpperCase(val[9]);
                        ////var carbrand_val = toUpperCase(val[10]);
                        ////var carmodel_val = toUpperCase(val[11]);
                        ////console.log("cartype_val", cartype_val);
                        ////console.log("carbrand_val", carbrand_val);
                        ////console.log("carmodel_val", carmodel_val);

                        //$('#tbl-list-temp tbody').append('<tr>' +
                        //    '<td style="text-align: center;">' + i + '</td>' +
                        //    '<td>' + val[0] + '</td>' +
                        //    '<td>' + (citem_c1.some(citem_c1 => citem_c1.code === code1) ? '<span class="tx-primary">' + c1_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '-' +
                        //    (citem_c5.some(citem_c5 => citem_c5.code === code5) ? '<span class="tx-primary">' + c5_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '-' +
                        //    (citem_c3.some(citem_c3 => citem_c3.code === code3) ? '<span class="tx-primary">' + c3_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '-' +
                        //    (citem_c2.some(citem_c2 => citem_c2.code === code2) ? '<span class="tx-primary">' + c2_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '-' +
                        //    (citem_c4.some(citem_c4 => citem_c4.code === code4) ? '<span class="tx-primary">' + c4_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                        //    //'<td>' + (citem_c1.some(citem_c1 => citem_c1.code === val[1]) ? '<span class="tx-success">' + c1_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                        //    '<td style="text-align: center;">' + (val[1] === null ? '<span class="tx-danger">1</span>' : val[1]) + '</td>' +
                        //    '<td style="text-align: center;">' + (val[2] === null ? '<span class="tx-danger">1</span>' : val[2]) + '</td>' +
                        //    '<td style="text-align: right;">' + (val[5] === null ? '<span class="tx-danger">1</span>' : val[5]) + '</td>' +
                        //    '<td style="text-align: center;">' + (val[3] === null ? '<span class="tx-danger">1</span>' : val[3]) + '</td>' +
                        //    '<td style="text-align: center;">' + (val[4] === null ? '<span class="tx-danger">1</span>' : val[4]) + '</td>' +
                        //    '</tr>');

                        $.LoadingOverlay("hide");
                        console.log("111111");
                        count_index++;
                    }

                    ii++;
                    count_i++;


                });

                console.log("data", data);

                fetch(ItemMaster_ImportNetPrice_url, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'no-cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    body: data.join("&"),
                }).then(data => {

                    toastr.success('Save Successfully!', function () {

                        $.addLogEvent(citem['code'], 'VSM', 'edit', url_location, 'ok');

                        oTable.destroy();
                        $.List();

                        setTimeout(function () {

                            $('.btn-save_form').prop('disabled', false);
                            $("#frm_data").parsley().reset();
                            $('#modal-frm_data').modal('hide');

                        }, 1000);

                    });

                    //}).catch((error) => {
                    //    console.error('Error:', error);
                    //    //alert("5555");
                    //    $.addLogError(citem['code'], 'VSM', 'edit', 'ACC-MAS-ITEM', 'error');
                    //});

                    $.LoadingOverlay("hide");
                    console.log("222222");

                }).catch(error => {
                    toastr.error(error, 'Error writing document');
                    //console.error("Error writing document: ", error);
                });

            });

            console.log('objTable', objTable);

        }
    });
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