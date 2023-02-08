'use strict';

let validator, oTable, table, options, item_action, item_id;

let objProfile = JSON.parse(localStorage.getItem('objProfile'));

let connect_url = 'http://localhost:8081/vsk-portal-api';
//let connect_url = 'http://192.168.1.247/intranet/acc-api';

let ck_code = connect_url + '/v1/gcode_get';
let ck_item = connect_url + '/v1/stmas_get';
let gcode_url = connect_url + '/v1/gcode_get';
let barcode_url = connect_url + '/v1/barcode_get';
let uom_url = connect_url + '/v1/uom_get';
let location_url = connect_url + '/v1/location_get';
let printerzone_url = connect_url + '/v1/printerzone_get';
let lovdata_url = connect_url + '/v1/itemmaster_lov_get';

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


    $('#customFile').on('change', function (evt) {

        evt.preventDefault();

        if ($(this).val() !== '') {

            //alert("555");
            //return false;

            let i = 0;

            readXlsxFile(this.files[0], { dateFormat: 'YYYY/MM/DD_hh:mm:ss' }).then( async function (result) {

                if (result.length > 0) {

                    $.LoadingOverlay("show", {
                        image: '',
                        custom: customElement
                    });

                    console.log("result", result);

                    await fetch(gcode_url + '?ctype=gcode_a').then(function (response) {
                        return response.json();
                    }).then(function (result) {
                        citem_c1 = result.data
                        console.log('C1', citem_c1);
                    });

                    await fetch(gcode_url + '?ctype=gcode_b').then(function (response) {
                        return response.json();
                    }).then(function (result) {
                        citem_c2 = result.data
                        console.log('C2', citem_c2);
                    });

                    await fetch(gcode_url + '?ctype=gcode_c').then(function (response) {
                        return response.json();
                    }).then(function (result) {
                        citem_c3 = result.data
                        console.log('C3', citem_c3);
                    });

                    await fetch(gcode_url + '?ctype=gcode_d').then(function (response) {
                        return response.json();
                    }).then(function (result) {
                        citem_c4 = result.data
                        console.log('C4', citem_c4);
                    });

                    await fetch(gcode_url + '?ctype=gcode_e').then(function (response) {
                        return response.json();
                    }).then(function (result) {
                        citem_c5 = result.data
                        console.log('C5', citem_c5);
                    });

                    //await fetch(barcode_url).then(function (response) {
                    //    return response.json();
                    //}).then(function (result) {
                    //    citem_barcode = result.data
                    //    console.log('Barcode', citem_barcode);
                    //});

                    //await fetch(uom_url).then(function (response) {
                    //    return response.json();
                    //}).then(function (result) {
                    //    citem_uom = result.data
                    //    console.log('UOM', citem_uom);
                    //});

                    //await fetch(lovdata_url + '?lov_group=VSK_PUR&lov_type=CarBrand').then(function (response) {
                    //    return response.json();
                    //}).then(function (result) {
                    //    citem_carbrand = result.data
                    //    //console.log('CarBrand', citem_carbrand);
                    //});

                    //await fetch(lovdata_url + '?lov_group=VSK_PUR&lov_type=CarModel').then(function (response) {
                    //    return response.json();
                    //}).then(function (result) {
                    //    citem_carmodel = result.data
                    //    //console.log('CarModel', citem_carmodel);
                    //});

                    //await fetch(lovdata_url + '?lov_group=VSK_PUR&lov_type=CarType').then(function (response) {
                    //    return response.json();
                    //}).then(function (result) {
                    //    citem_cartype = result.data
                    //    //console.log('CarModel', citem_carmodel);
                    //});

                }

                await $.each(result, function (key, val) {

                    if (i > 0) {

                        console.log("code: ", val[0]);

                        let c1_gname = citem_c1.find(citem_c1 => citem_c1.code === val[1]);
                        let c2_gname = citem_c2.find(citem_c2 => citem_c2.code === val[2]);
                        let c3_gname = citem_c3.find(citem_c3 => citem_c3.code === val[3]);
                        let c4_gname = citem_c4.find(citem_c4 => citem_c4.code === val[4]);
                        let c5_gname = citem_c5.find(citem_c5 => citem_c5.code === val[5]);

                        console.log("c1_gname", c1_gname);
                        console.log("c2_gname", c2_gname);
                        console.log("c3_gname", c3_gname);
                        console.log("c4_gname", c4_gname);
                        console.log("c5_gname", c5_gname);

                        //var cartype_val = toUpperCase(val[9]);
                        //var carbrand_val = toUpperCase(val[10]);
                        //var carmodel_val = toUpperCase(val[11]);
                        //console.log("cartype_val", cartype_val);
                        //console.log("carbrand_val", carbrand_val);
                        //console.log("carmodel_val", carmodel_val);

                        $('#tbl-list-temp tbody').append('<tr>' +
                            //0-2
                            '<td>' + i + '</td>' +
                            '<td>' + val[0] + '</td>' +
                            //'<td>' + '-' + '</td>' +
                            //3-10
                            '<td>' + (citem_c1.some(citem_c1 => citem_c1.code === val[1]) ? '<span class="tx-primary">' + c1_gname['gname'] + '</span>' : '<span class="tx-danger">' + val[1] + '</span>') + '-' +
                            (citem_c5.some(citem_c5 => citem_c5.code === val[5]) ? '<span class="tx-primary">' + c5_gname['gname'] + '</span>' : '<span class="tx-danger">' + val[5] + '</span>') + '-' +
                            (citem_c3.some(citem_c3 => citem_c3.code === val[3]) ? '<span class="tx-primary">' + c3_gname['gname'] + '</span>' : '<span class="tx-danger">' + val[3] + '</span>') + '-' +
                            (citem_c2.some(citem_c2 => citem_c2.code === val[2]) ? '<span class="tx-primary">' + c2_gname['gname'] + '</span>' : '<span class="tx-danger">' + val[2] + '</span>') + '-' +
                            (citem_c4.some(citem_c4 => citem_c4.code === val[4]) ? '<span class="tx-primary">' + c4_gname['gname'] + '</span>' : '<span class="tx-danger">' + val[4] + '</span>') + '</td>' +
                            '<td>' + (citem_c1.some(citem_c1 => citem_c1.code === val[1]) ? '<span class="tx-success">' + c1_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                            '<td>' + (citem_c1.some(citem_c1 => citem_c1.code === val[1]) ? '<span class="tx-success">' + val[1] + '</span>' : '<span class="tx-danger">' + val[1] + '</span>') + '</td>' +
                            '<td>' + (citem_c1.some(citem_c1 => citem_c1.code === val[1]) ? '<span class="tx-success">' + c1_gname['codechr'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                            '<td>' + (citem_c2.some(citem_c2 => citem_c2.code === val[2]) ? '<span class="tx-success">' + c2_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                            '<td>' + (citem_c2.some(citem_c2 => citem_c2.code === val[2]) ? '<span class="tx-success">' + val[2] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                            '<td>' + (citem_c3.some(citem_c3 => citem_c3.code === val[3]) ? '<span class="tx-success">' + c3_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                            '<td>' + (citem_c3.some(citem_c3 => citem_c3.code === val[3]) ? '<span class="tx-success">' + val[3] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                            //11-15
                            '<td>' + (citem_c4.some(citem_c4 => citem_c4.code === val[4]) ? '<span class="tx-success">' + c4_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                            '<td>' + (citem_c4.some(citem_c4 => citem_c4.code === val[4]) ? '<span class="tx-success">' + val[4] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                            '<td>' + (citem_c5.some(citem_c5 => citem_c5.code === val[5]) ? '<span class="tx-success">' + c5_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                            '<td>' + (citem_c5.some(citem_c5 => citem_c5.code === val[5]) ? '<span class="tx-success">' + val[5] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                            '<td>' + (citem_barcode.some(citem_barcode => citem_barcode.gbarcode === val[6]) ? '<span class="tx-success">' + val[6] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                            //16-20
                            '<td>' + (citem_uom.some(citem_uom => citem_uom.code === val[7]) ? '<span class="tx-success">' + val[7] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                            '<td>' + (val[8] === null ? '' : val[8]) + '</td>' +
                            //'<td>' + (val[9] === null ? '' : val[9]) + '</td>' +
                            '<td>' + (citem_cartype.some(citem_cartype => citem_cartype.lov_code === cartype_val) ? '<span class="tx-success">' + cartype_val + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                            //'<td>' + (val[10] === null ? '' : val[10]) + '</td>' +
                            //'<td>' + (citem_carbrand.some(citem_carbrand => citem_carbrand.lov_code === val[10]) ? '<span class="tx-success">' + val[10] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                            '<td>' + (citem_carbrand.some(citem_carbrand => citem_carbrand.lov_code === carbrand_val) ? '<span class="tx-success">' + carbrand_val + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                            //'<td>' + (val[11] === null ? '' : val[11]) + '</td>' +
                            //'<td>' + (citem_carmodel.some(citem_carmodel => citem_carmodel.lov_code === val[11]) ? '<span class="tx-success">' + val[11] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                            '<td>' + (citem_carmodel.some(citem_carmodel => citem_carmodel.lov_code === carmodel_val) ? '<span class="tx-success">' + carmodel_val + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                            //21-25
                            '<td>' + (val[12] === null ? '' : val[12]) + '</td>' +
                            '<td>' + (val[13] === null ? '' : val[13]) + '</td>' +
                            '<td>' + (val[14] === null ? '' : val[14]) + '</td>' +
                            '<td>' + (val[15] === null ? '' : val[15]) + '</td>' +
                            '<td>' + (val[16] === null ? '' : val[16]) + '</td>' +
                            //26-30
                            '<td>' + (citem_barcode.some(citem_barcode => citem_barcode.gbarcode === val[17]) ? '<span class="tx-success">' + val[17] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                            //'<td>' + (citem_location.some(citem_location => citem_location.code === val[18]) ? '<span class="tx-success">' + val[18] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                            '<td></td>' +
                            '<td></td>' +
                            //'<td>' + (val[16] === null ? '' : val[16]) + '</td>' +
                            //31-36
                            '</tr>');


                        //$('#tbl-list-temp tbody').append('<tr>' +
                        //    //0-2
                        //    '<td>' + i + '</td>' +
                        //    '<td>' + val[0] + '</td>' +
                        //    '<td>' + '-' + '</td>' +
                        //    //3-10
                        //    '<td>' + (citem_c1.some(citem_c1 => citem_c1.code === val[1]) ? '<span class="tx-primary">' + c1_gname['gname'] + '</span>' : '<span class="tx-danger">' + val[1] + '</span>') + '-' +
                        //    (citem_c5.some(citem_c5 => citem_c5.code === val[5]) ? '<span class="tx-primary">' + c5_gname['gname'] + '</span>' : '<span class="tx-danger">' + val[5] + '</span>') + '-' +
                        //    (citem_c3.some(citem_c3 => citem_c3.code === val[3]) ? '<span class="tx-primary">' + c3_gname['gname'] + '</span>' : '<span class="tx-danger">' + val[3] + '</span>') + '-' +
                        //    (citem_c2.some(citem_c2 => citem_c2.code === val[2]) ? '<span class="tx-primary">' + c2_gname['gname'] + '</span>' : '<span class="tx-danger">' + val[2] + '</span>') + '-' +
                        //    (citem_c4.some(citem_c4 => citem_c4.code === val[4]) ? '<span class="tx-primary">' + c4_gname['gname'] + '</span>' : '<span class="tx-danger">' + val[4] + '</span>') + '</td>' +
                        //    '<td>' + (citem_c1.some(citem_c1 => citem_c1.code === val[1]) ? '<span class="tx-success">' + c1_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                        //    '<td>' + (citem_c1.some(citem_c1 => citem_c1.code === val[1]) ? '<span class="tx-success">' + val[1] + '</span>' : '<span class="tx-danger">' + val[1] + '</span>') + '</td>' +
                        //    '<td>' + (citem_c1.some(citem_c1 => citem_c1.code === val[1]) ? '<span class="tx-success">' + c1_gname['codechr'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                        //    '<td>' + (citem_c2.some(citem_c2 => citem_c2.code === val[2]) ? '<span class="tx-success">' + c2_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                        //    '<td>' + (citem_c2.some(citem_c2 => citem_c2.code === val[2]) ? '<span class="tx-success">' + val[2] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                        //    '<td>' + (citem_c3.some(citem_c3 => citem_c3.code === val[3]) ? '<span class="tx-success">' + c3_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                        //    '<td>' + (citem_c3.some(citem_c3 => citem_c3.code === val[3]) ? '<span class="tx-success">' + val[3] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                        //    //11-15
                        //    '<td>' + (citem_c4.some(citem_c4 => citem_c4.code === val[4]) ? '<span class="tx-success">' + c4_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                        //    '<td>' + (citem_c4.some(citem_c4 => citem_c4.code === val[4]) ? '<span class="tx-success">' + val[4] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                        //    '<td>' + (citem_c5.some(citem_c5 => citem_c5.code === val[5]) ? '<span class="tx-success">' + c5_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                        //    '<td>' + (citem_c5.some(citem_c5 => citem_c5.code === val[5]) ? '<span class="tx-success">' + val[5] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                        //    '<td>' + (citem_barcode.some(citem_barcode => citem_barcode.gbarcode === val[6]) ? '<span class="tx-success">' + val[6] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                        //    //16-20
                        //    '<td>' + (citem_uom.some(citem_uom => citem_uom.code === val[7]) ? '<span class="tx-success">' + val[7] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                        //    '<td>' + (val[8] === null ? '' : val[8]) + '</td>' +
                        //    //'<td>' + (val[9] === null ? '' : val[9]) + '</td>' +
                        //    '<td>' + (citem_cartype.some(citem_cartype => citem_cartype.lov_code === cartype_val) ? '<span class="tx-success">' + cartype_val + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                        //    //'<td>' + (val[10] === null ? '' : val[10]) + '</td>' +
                        //    //'<td>' + (citem_carbrand.some(citem_carbrand => citem_carbrand.lov_code === val[10]) ? '<span class="tx-success">' + val[10] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                        //    '<td>' + (citem_carbrand.some(citem_carbrand => citem_carbrand.lov_code === carbrand_val) ? '<span class="tx-success">' + carbrand_val + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                        //    //'<td>' + (val[11] === null ? '' : val[11]) + '</td>' +
                        //    //'<td>' + (citem_carmodel.some(citem_carmodel => citem_carmodel.lov_code === val[11]) ? '<span class="tx-success">' + val[11] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                        //    '<td>' + (citem_carmodel.some(citem_carmodel => citem_carmodel.lov_code === carmodel_val) ? '<span class="tx-success">' + carmodel_val + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                        //    //21-25
                        //    '<td>' + (val[12] === null ? '' : val[12]) + '</td>' +
                        //    '<td>' + (val[13] === null ? '' : val[13]) + '</td>' +
                        //    '<td>' + (val[14] === null ? '' : val[14]) + '</td>' +
                        //    '<td>' + (val[15] === null ? '' : val[15]) + '</td>' +
                        //    '<td>' + (val[16] === null ? '' : val[16]) + '</td>' +
                        //    //26-30
                        //    '<td>' + (citem_barcode.some(citem_barcode => citem_barcode.gbarcode === val[17]) ? '<span class="tx-success">' + val[17] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                        //    //'<td>' + (citem_location.some(citem_location => citem_location.code === val[18]) ? '<span class="tx-success">' + val[18] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                        //    '<td></td>' +
                        //    '<td></td>' +
                        //    //'<td>' + (val[16] === null ? '' : val[16]) + '</td>' +
                        //    //31-36
                        //    '</tr>');


                        //$('#tbl-list-temp tbody').append('<tr>' +
                        //    '<td>' + i + '</td>' +
                        //    '<td>' + (citem_c1.some(citem_c1 => citem_c1.code === val[0]) ? '<span class="tx-primary">' + val[0] + '</span>' : '<span class="tx-danger">' + val[0] + '</span>') + '-' +
                        //    (citem_c2.some(citem_c2 => citem_c2.code === val[1]) ? '<span class="tx-primary">' + val[1] + '</span>' : '<span class="tx-danger">' + val[1] + '</span>') + '-' +
                        //    (citem_c3.some(citem_c3 => citem_c3.code === val[2]) ? '<span class="tx-primary">' + val[2] + '</span>' : '<span class="tx-danger">' + val[2] + '</span>') + '-' +
                        //    (citem_c4.some(citem_c4 => citem_c4.code === val[3]) ? '<span class="tx-primary">' + val[3] + '</span>' : '<span class="tx-danger">' + val[3] + '</span>') + '-' +
                        //    (citem_c5.some(citem_c5 => citem_c5.code === val[4]) ? '<span class="tx-primary">' + val[4] + '</span>' : '<span class="tx-danger">' + val[4] + '</span>') + '</td>' +

                        //    '<td>' + (citem_c1.some(citem_c1 => citem_c1.code === val[0]) ? '<span class="tx-primary">' + c1_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '-' +
                        //    (citem_c2.some(citem_c2 => citem_c2.code === val[1]) ? '<span class="tx-primary">' + c2_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '-' +
                        //    (citem_c3.some(citem_c3 => citem_c3.code === val[2]) ? '<span class="tx-primary">' + c3_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '-' +
                        //    (citem_c4.some(citem_c4 => citem_c4.code === val[3]) ? '<span class="tx-primary">' + c4_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '-' +
                        //    (citem_c5.some(citem_c5 => citem_c5.code === val[4]) ? '<span class="tx-primary">' + c5_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +

                        //    '<td>' + (citem_c1.some(citem_c1 => citem_c1.code === val[0]) ? '<span class="tx-success">' + val[0] + '</span>' : '<span class="tx-danger">' + val[0] + '</span>') + '</td>' +
                        //    '<td>' + (citem_c1.some(citem_c1 => citem_c1.code === val[0]) ? '<span class="tx-success">' + c1_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +

                        //    '<td>' + (citem_c2.some(citem_c2 => citem_c2.code === val[1]) ? '<span class="tx-success">' + val[1] + '</span>' : '<span class="tx-danger">' + val[1] + '</span>') + '</td>' +
                        //    '<td>' + (citem_c2.some(citem_c2 => citem_c2.code === val[1]) ? '<span class="tx-success">' + c2_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +

                        //    '<td>' + (citem_c3.some(citem_c3 => citem_c3.code === val[2]) ? '<span class="tx-success">' + val[2] + '</span>' : '<span class="tx-danger">' + val[2] + '</span>') + '</td>' +
                        //    '<td>' + (citem_c3.some(citem_c3 => citem_c3.code === val[2]) ? '<span class="tx-success">' + c3_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +
                            
                        //    '<td>' + (citem_c4.some(citem_c4 => citem_c4.code === val[3]) ? '<span class="tx-success">' + val[3] + '</span>' : '<span class="tx-danger">' + val[3] + '</span>') + '</td>' +
                        //    '<td>' + (citem_c4.some(citem_c4 => citem_c4.code === val[3]) ? '<span class="tx-success">' + c4_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +

                        //    '<td>' + (citem_c5.some(citem_c5 => citem_c5.code === val[4]) ? '<span class="tx-success">' + val[4] + '</span>' : '<span class="tx-danger">' + val[4] + '</span>') + '</td>' +
                        //    '<td>' + (citem_c5.some(citem_c5 => citem_c5.code === val[4]) ? '<span class="tx-success">' + c5_gname['gname'] + '</span>' : '<span class="tx-danger">ไม่พบข้อมูล !</span>') + '</td>' +

                        //    '<td>' + (val[5] === null ? '' : val[5]) + '</td>' +
                        //    '<td style="width:50px;">' + (val[6] === null ? '' : val[6]) + '</td>' +
                        //    '<td>' + (val[7] === null ? '' : val[7]) + '</td>' +
                        //    '<td>' + (val[8] === null ? '' : val[8]) + '</td>' +
                        //    '<td>' + (val[9] === null ? '' : val[9]) + '</td>' +
                        //    '<td>' + (val[10] === null ? '' : val[10]) + '</td>' +
                        //    '<td>' + (val[11] === null ? '' : val[11]) + '</td>' +
                        //    '<td>' + (val[12] === null ? '' : val[12]) + '</td>' +
                        //    '<td>' + (val[13] === null ? '' : val[13]) + '</td>' +
                        //    '<td>' + (val[14] === null ? '' : val[14]) + '</td>' +
                        //    '<td>' + (val[15] === null ? '' : val[15]) + '</td>' +
                        //    '<td>' + (val[16] === null ? '' : val[16]) + '</td>' +
                        //    '<td>' + val[17] + '</td>' +
                        //    '<td>' + val[18] + '</td>' +
                        //    '<td>' + val[19] + '</td>' +
                        //    '<td>' + (val[20] === null ? '' : val[20]) + '</td>' +
                        //    '<td>' + (val[21] === null ? '' : val[21]) + '</td>' +
                        //    '<td>' + (val[22] === null ? '' : val[22]) + '</td>' +
                        //    '<td>' + (val[23] === null ? '' : val[23]) + '</td>' +
                        //    '<td>' + (val[24] === null ? '' : val[24]) + '</td>' +
                        //    '<td>' + val[25] + '</td>' +
                        //    '<td>' + val[26] + '</td>' +
                        //    '<td>' + (val[27] === null ? '' : val[27]) + '</td>' +
                        //    '<td>' + (val[28] === null ? '' : val[28]) + '</td>' +
                        //    '<td>' + (val[29] === null ? '' : val[29]) + '</td>' +
                        //    '<td>' + (val[30] === null ? '' : val[30]) + '</td>' +
                        //    '<td>' + (val[31] === null ? '0' : val[31]) + '</td>' +
                        //    '<td>' + (val[32] === null ? '0' : val[32]) + '</td>' +
                        //    '<td>' + (val[33] === null ? '0' : val[33]) + '</td>' +
                        //    '<td>' + val[34] + '</td>' +
                        //    '<td>' + (val[35] === null ? '' : val[35]) + '</td>' +
                        //    '<td>' + (val[36] === null ? '0' : val[36]) + '</td>' +
                        //    '<td>' + (val[37] === null ? '0' : val[37]) + '</td>' +
                        //    '<td>' + (val[38] === null ? '0' : val[38]) + '</td>' +
                        //    '<td>' + (val[39] === null ? '0' : val[39]) + '</td>' +
                        //    '<td>' + (val[40] === null ? '0' : val[40]) + '</td>' +
                        //    '<td>' + (val[41] === null ? '0' : val[41]) + '</td>' +
                        //    '<td>' + (val[42] === null ? '0' : val[42]) + '</td>' +
                        //    '<td>' + (val[43] === null ? '0' : val[43]) + '</td>' +
                        //    '<td>' + (val[44] === null ? '' : val[44]) + '</td>' +
                        //    '<td>' + (val[45] === null ? '' : val[45]) + '</td>' +
                        //    '<td>' + (val[46] === null ? '' : val[46]) + '</td>' +
                        //    '<td>' + (val[47] === null ? '' : val[47]) + '</td>' +
                        //    '<td>' + (val[48] === null ? '' : val[48]) + '</td>' +
                        //    '<td>' + (val[49] === null ? '' : val[49]) + '</td>' +
                        //    '<td>' + (val[50] === null ? '0' : val[50]) + '</td>' +
                        //    '<td>' + (val[51] === null ? '0' : val[51]) + '</td>' +
                        //    '<td>' + (val[52] === null ? '0' : val[52]) + '</td>' +
                        //    '<td>' + (val[53] === null ? '0' : val[53]) + '</td>' +
                        //    '<td>' + (val[54] === null ? '1' : val[54]) + '</td>' +
                        //    '<td>' + (val[55] === null ? '2' : val[55]) + '</td>' +
                        //    '<td>' + (val[56] === null ? '0' : val[56]) + '</td>' +
                        //    '<td>' + (val[57] === null ? '0' : val[57]) + '</td>' +
                        //    '<td>' + (val[58] === null ? '0' : val[58]) + '</td>' +
                        //    '<td>' + (val[59] === null ? '0' : val[59]) + '</td>' +
                        //    '<td>' + (val[60] === null ? '0' : val[60]) + '</td>' +
                        //    '<td>' + (val[61] === null ? '0' : val[61]) + '</td>' +
                        //    '<td>' + (val[62] === null ? '0' : val[62]) + '</td>' +
                        //    '<td>' + (val[63] === null ? '0' : val[63]) + '</td>' +
                        //    '<td>' + (val[64] === null ? '0' : val[64]) + '</td>' +
                        //    '<td>' + (val[65] === null ? '0' : val[65]) + '</td>' +
                        //    '<td>' + (val[66] === null ? '0' : val[66]) + '</td>' +
                        //    '<td>' + (val[67] === null ? '0' : val[67]) + '</td>' +
                        //    '<td>' + (val[68] === null ? '0' : val[68]) + '</td>' +
                        //    '<td>' + (val[69] === null ? '0' : val[69]) + '</td>' +
                        //    '<td>' + (val[70] === null ? '0' : val[70]) + '</td>' +
                        //    '<td>' + (val[71] === null ? '0' : val[71]) + '</td>' +
                        //    '<td>' + (val[72] === null ? '0' : val[72]) + '</td>' +
                        //    '<td>' + (val[73] === null ? '0' : val[73]) + '</td>' +
                        //    '<td>' + (val[74] === null ? '0' : val[74]) + '</td>' + 
                        //    '<td>' + (val[75] === null ? '0' : val[75]) + '</td>' + 
                        //    '<td>' + (val[76] === null ? '0' : val[76]) + '</td>' + 
                        //    '<td>' + (val[77] === null ? '0' : val[77]) + '</td>' + 
                        //    '<td>' + (val[78] === null ? '0' : val[78]) + '</td>' + 
                        //    '<td>' + (val[79] === null ? '0' : val[79]) + '</td>' + 
                        //    '<td>' + (val[80] === null ? '0' : val[80]) + '</td>' + 
                        //    '<td>' + (val[81] === null ? '0' : val[81]) + '</td>' +
                        //    '<td>' + (val[82] === null ? '0' : val[82]) + '</td>' + 
                        //    '<td>' + (val[83] === null ? '0' : val[83]) + '</td>' + 
                        //    '<td>' + (val[84] === null ? '0' : val[84]) + '</td>' + 
                        //    '<td>' + (val[85] === null ? '0' : val[85]) + '</td>' + 
                        //    '<td>' + (val[86] === null ? '0' : val[86]) + '</td>' +
                        //    '<td>' + (val[87] === null ? ''  : val[87]) + '</td>' +
                        //    '<td>' + (val[88] === null ? ''  : val[88]) + '</td>' + 
                        //    '<td>' + (val[89] === null ? '0' : val[89]) + '</td>' + 
                        //    '<td>' +  val[90] + '</td>' +
                        //    '<td>' + (val[91] === null ? 'admin' : val[91]) + '</td>' +
                        //    '<td>' + (val[92] === null ? '0' : val[92]) + '</td>' +
                        //    '<td>' + (val[93] === null ? '0' : val[93]) + '</td>' +
                        //    '<td>' + (val[94] === null ? '0' : val[94]) + '</td>' +
                        //    '<td>' + (val[95] === null ? '0' : val[95]) + '</td>' +
                        //    '<td>' + (val[96] === null ? '0' : val[96]) + '</td>' +
                        //    '<td>' + (val[97] === null ? '0' : val[97]) + '</td>' +
                        //    '<td>' + (val[98] === null ? '0' : val[98]) + '</td>' +
                        //    '<td>' + (val[99] === null ? '0' : val[99]) + '</td>' +
                        //    '<td>' + (val[100] === null ? '0' : val[100]) + '</td>' +
                        //    '<td>' + (val[101] === null ? '0' : val[101]) + '</td>' +
                        //    '<td>' + (val[102] === null ? '' : val[102]) + '</td>' +
                        //    '<td>' + (val[103] === null ? '0' : val[103]) + '</td>' +
                        //    '<td>' + (val[104] === null ? '' : val[104]) + '</td>' +
                        //    '<td>' + (val[105] === null ? '' : val[105]) + '</td>' +
                        //    '<td>' + (val[106] === null ? '' : val[106]) + '</td>' +
                        //    '<td>' + (val[107] === null ? '' : val[107]) + '</td>' +
                        //    '<td>' + (val[108] === null ? '' : val[108]) + '</td>' +
                        //    '<td>' + (val[109] === null ? '' : val[109]) + '</td>' +
                        //    '<td>' + (val[110] === null ? '' : val[110]) + '</td>' +
                        //    '<td>' + (val[111] === null ? '0' : val[111]) + '</td>' +
                        //    '<td>' + (val[112] === null ? '' : val[112]) + '</td>' +
                        //    '<td>' + (val[113] === null ? '' : val[113]) + '</td>' +
                        //    '<td>' + (val[114] === null ? '' : val[114]) + '</td>' +
                        //    '<td>' + (val[115] === null ? '' : val[115]) + '</td>' +
                        //    '<td>' + (val[116] === null ? '0' : val[116]) + '</td>' +
                        //    '<td>' + (val[117] === null ? '0' : val[117]) + '</td>' +
                        //    '<td>' + (val[118] === null ? '0' : val[118]) + '</td>' +
                        //    '<td>' + (val[119] === null ? '' : val[119]) + '</td>' +
                        //    '<td>' + (val[120] === null ? '0' : val[120]) + '</td>' +
                        //    '<td>' + (val[121] === null ? '0' : val[121]) + '</td>' +
                        //    '<td>' + (val[122] === null ? '' : val[122]) + '</td>' +
                        //    '<td>' + (val[123] === null ? '' : val[123]) + '</td>' +
                        //    '<td>' + (val[124] === null ? '' : val[124]) + '</td>' +
                        //    '<td>' + (val[125] === null ? '' : val[125]) + '</td>' +
                        //    '<td>' + (val[126] === null ? '0' : val[126]) + '</td>' +
                        //    '<td>' + (val[127] === null ? '' : val[127]) + '</td>' +
                        //    '<td>' + (val[128] === null ? '' : val[128]) + '</td>' +
                        //    '<td>' + (val[129] === null ? '' : val[129]) + '</td>' +
                        //    '<td>' + (val[130] === null ? '0' : val[130]) + '</td>' +
                        //    '<td>' + (val[131] === null ? '' : val[131]) + '</td>' +
                        //    '<td>' + (val[132] === null ? '' : val[132])+ '</td>' +
                        //    '<td>' + (val[133] === null ? '' : val[133]) + '</td>' +
                        //    '<td>' + (val[134] === null ? '' : val[134]) + '</td>' +
                        //    '<td>' + (val[135] === null ? '' : val[135]) + '</td>' +
                        //    '<td>' + (val[136] === null ? '' : val[136]) + '</td>' +
                        //    '<td>' + (val[137] === null ? '' : val[137]) + '</td>' +
                        //    '<td>' + (val[138] === null ? '0' : val[138]) + '</td>' +
                        //    '<td>' + (val[139] === null ? '0' : val[139]) + '</td>' +
                        //    '<td>' + (val[140] === null ? '0' : val[140]) + '</td>' +
                        //    '<td>' + (val[141] === null ? '0' : val[141]) + '</td>' +
                        //    '<td>' + (val[142] === null ? '0' : val[142]) + '</td>' +
                        //    '<td>' + (val[143] === null ? '0' : val[143]) + '</td>' +
                        //    '<td>' + (val[144] === null ? '0' : val[144]) + '</td>' +
                        //    '<td>' + (val[145] === null ? '0' : val[145]) + '</td>' +
                        //    '<td>' + (val[146] === null ? '0' : val[146]) + '</td>' +
                        //    '<td>' + (val[147] === null ? '0' : val[147]) + '</td>' +
                        //    '<td>' + (val[148] === null ? '0' : val[148]) + '</td>' +
                        //    '<td>' + (val[149] === null ? '0' : val[149]) + '</td>' +
                        //    '<td>' + (val[150] === null ? '0' : val[150]) + '</td>' +
                        //    '<td>' + (val[151] === null ? '0' : val[151]) + '</td>' +
                        //    '<td>' + (val[152] === null ? '0' : val[152])+ '</td>' +
                        //    '<td>' + (val[153] === null ? '0' : val[153])+ '</td>' +
                        //    '<td>' + (val[154] === null ? '0' : val[154])+ '</td>' +
                        //    '<td>' + (val[155] === null ? '0' : val[155])  + '</td>' +
                        //    '<td>' + (val[156] === null ? '0' : val[156]) + '</td>' +
                        //    '<td>' + (val[157] === null ? '0' : val[157]) + '</td>' +
                        //    '<td>' + (val[158] === null ? '' : val[158]) + '</td>' +
                        //    '<td>' + (val[159] === null ? '0' : val[159]) + '</td>' +
                        //    '<td>' + (val[160] === null ? '0' : val[160]) + '</td>' +
                        //    '<td>' + (val[161] === null ? '' : val[161]) + '</td>' +
                        //    '<td>' + '<a href="#" class="btn btn-sm btn-primary">' + '<i class="las la-search"></i>' + '</a>' + '</td>' +
                        //    '<td>' + '<a href="#" class="btn btn-sm btn-info">' + '<i class="las la-pen"></i>' + '</a>' + '</td>' +
                        //    '<td>' + '<a href="#" class="btn btn-sm btn-danger">' + '<i class="las la-trash"></i>' + '</a>' + '</td>' +


                        //    '</tr>'
                        //);

                        $.LoadingOverlay("hide");
                        console.log("111111");

                    }

                    i++

                });

                $.LoadingOverlay("hide");
                console.log("222222");

            }).catch(error => {
                toastr.error(error, 'Error writing document');
                //console.error("Error writing document: ", error);
            });

        }

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