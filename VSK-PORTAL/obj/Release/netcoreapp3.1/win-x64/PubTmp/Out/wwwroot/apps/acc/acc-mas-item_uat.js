'use strict';

//import { isNull } from "util";
//import { isEmpty } from "underscore";

let oTable;
let inventorycode_dataset = [];
let invfrecode_dataset = [];
let objProfile = JSON.parse(localStorage.getItem('objProfile'));
//console.log("objProfile", objProfile);
//console.log("objProfile_auth_user_profile", objProfile.auth_user_profile);


//let stmas_search = 'http://192.168.1.247/intranet/acc-api/v1/stmas_search';
//let product_purplan_get = 'http://192.168.1.247/intranet/acc-api/v2/product_purplan_stock_factor_get';
//let inventorycode_get = 'http://localhost:49705/api/InventoryCode_Get';
//let invfrecode_get = 'http://localhost:49705/api/InvfreCode_Get';
//let stmas_search = 'http://localhost:8081/vsk-portal-api/v3/stmas_search_V3';

let connect_url = 'http://localhost:8081/vsk-portal-api';
//let connect_url = 'http://192.168.1.247/intranet/acc-api';

let prodpurplan_updatedby = "";
let prodpurplan_updatedby2 = "";
let role_code = "";
let username = "";
let product_search = connect_url + '/v1/product_purplan_stock_factor_list_get';
let stmas_get = connect_url + '/v1/stmas_get';
let product_purplan_get = connect_url + '/v4/product_purplan_stock_factor_get';
let product_replenishplan_klh_get = connect_url + '/v1/product_replenishplan_klh_get';
let apmas_get = connect_url + '/v1/apmas_get';
let lov_get = connect_url + '/v1/itemmaster_lov_get';
let role_get = connect_url + '/v1/itemmaster_lov_role_get';
let gcodea_get = connect_url + '/v1/gcodea_get';
let gcodec_get = connect_url + '/v1/gcodec_get';
let itemmaster_update = connect_url + '/v1/itemmaster_update_uat';
let productdivision_get = connect_url + '/v1/itemmaster_productdivision_get';
let maincategory_get = connect_url + '/v1/itemmaster_maincategory_get';
let subcategory_get = connect_url + '/v1/itemmaster_subcategory_get';
let stockstatus_history_get = connect_url + '/v1/itemmaster_stockstatus_get';
let vgrmindate_get = connect_url + '/v1/itemmaster_vgrmindate_get';
let vgrmaxdate_get = connect_url + '/v1/itemmaster_vgrmaxdate_get';
let grdate_get = connect_url + '/v1/grdate_get';
let goodprice_get = connect_url + '/v1/itemmaster_goodprice_get';
let select2_get = connect_url + '/v1/itemmaster_select2_get';

let search_gcodea = "";

let vatdiscmargin_list = [];
let carmodel_list = [];
let carbrand_list = [];
let costtype_list = [];
let cartype_list = [];
let skufocus_list = [];
let stockstatus_list = [];
let stockstatus_branch_list = [];
let infrecode_list = [];
let lifecycleaction_list = [];
let lockcode_list = [];
let relationshiptype_list = [];
let certificationstatus_list = [];
let purchase_list = [];
let apmas_list = [];
let gcodea_list = [];
let gcodec_list = [];
let discgroup_list = [];
let salediscgroup_list = [];
let purdiscgroup_list = [];
let transferunit_list = [];
let productcategory_list = [];
let productdivision_list = [];
let maincategory_list = [];
let sel2_maincategory_list = [];
let sel2_maincategory_list_val = [];
let subcategory_list = [];
let sel2_subcategory_list = [];
let sel2_subcategory_list_val = [];
//let subcategory_list = "";
//let subcategory_list = "";
let url_location = "";

url_location = window.location.href;
//console.log("location", url_location);


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

    $.LoadingOverlay("show", {
        image: '',
        custom: customElement
    });

    //$('#search_item_gbarcode_2').val('97051455');
    //$('#search_item_code_2').val('T00002-T002-0000-000-0000');
    $('#search_item_code1_2').val('สคทส');

    $('#frm_search').find('#search_item_maincategory').prop("disabled", true);
    $('#frm_search').find('#search_item_subcategory').prop("disabled", true);

    $('.date-picker').datepicker({
        dateFormat: 'dd/mm/yy',
        autoclose: true,
    });

    //$('.date-picker').daterangepicker({
    //    autoUpdateInput: false,
    //    showDropdowns: true,
    //    opens: "right",
    //    zIndexOffset: "10000",
    //    locale: { cancelLabel: 'Clear' },
    //}, function (start, end, label) {
    //    //console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    //});

    //$('.date-picker').on('apply.daterangepicker', function (ev, picker) {
    //    $(this).val(picker.startDate.format('DD/MM/YYYY') + '-' + picker.endDate.format('DD/MM/YYYY'));
    //});

    $.each(objProfile.auth_user_profile, function (key, val) {
        prodpurplan_updatedby = val['user_fname'];
        var email = val['user_email'];
        email = email.split("@");
        prodpurplan_updatedby2 = email[0];
        //console.log("prodpurplan_updatedby", prodpurplan_updatedby);
    });

    $.each(objProfile.auth_role, function (key, val) {
        role_code = val['role_code'];
        //console.log("role_code", role_code);
    });

    $.addLogEvent('', 'VSM', 'visit', url_location, 'ok');

    $('.input-cash').autoNumeric('init', {
        vMin: '-99999999'
    });

    //fetch(subcategory_get).then(function (response) {
    //    return response.json();
    //}).then(function (result) {

    //    $.each(result.data, function (key, val) {
    //        subcategory_list.push({ id: val['SubCategory'], text: val['SubCategory'] });
    //    });

    //    //console.log("gcodea_get", result.data);

    //    $('#search_item_subcategory').select2({
    //        //width: '235px',  
    //        height: '40px',
    //        dropdownParent: $(".div_search_item_subcategory"),
    //        placeholder: {
    //            id: '0', // the value of the option
    //            text: 'Please select..'
    //        },
    //        allowClear: true,
    //        data: subcategory_list,
    //        templateResult: function (data) {
    //            return data.text;
    //        },
    //    });
    //});

    //fetch(maincategory_get).then(function (response) {
    //    return response.json();
    //}).then(function (result) {

    //    $.each(result.data, function (key, val) {
    //        maincategory_list.push({ id: val['MainCategory'], text: val['MainCategory'] });
    //    });

    //    //console.log("gcodea_get", result.data);

    //    $('#search_item_maincategory').select2({
    //        //width: '235px',
    //        height: '40px',
    //        dropdownParent: $(".div_search_item_maincategory"),
    //        placeholder: {
    //            id: '0', // the value of the option
    //            text: 'Please select..'
    //        },
    //        allowClear: true,
    //        data: maincategory_list,
    //        templateResult: function (data) {
    //            return data.text;
    //        },
    //    });
    //});

    //fetch(productdivision_get).then(function (response) {
    //    return response.json();
    //}).then(function (result) {

    //    $.each(result.data, function (key, val) {
    //        productdivision_list.push({ id: val['ProductDivision'], text: val['ProductDivision'] });
    //    });

    //    //console.log("gcodea_get", result.data);

    //    $('#search_item_productdivision').select2({
    //        //width: '235px',
    //        height: '40px',
    //        dropdownParent: $(".div_search_item_productdivision"),
    //        placeholder: {
    //            id: '0', // the value of the option
    //            text: 'Please select..'
    //        },
    //        allowClear: true,
    //        data: productdivision_list,
    //        templateResult: function (data) {
    //            return data.text;
    //        },
    //    });
    //});

    //$('#search_item_code1').keyup(function () {
    //    search_gcodea = $('#frm_search').find("#search_item_code1").val();

    //    console.log("Keyup", search_gcodea);
    //});

    $('#search_item_spcodes_2').select2({
        ajax: {
            url: connect_url + '/v1/gcode_select2_get?ctype=spcodes',
            dataType: 'json',
            //delay: 250,
            minimumInputLength: 2,
            minimumResultsForSearch: 10,
            data: function (params) {
                var query = {
                    codechr: typeof params.term !== 'undefined' ? params.term : ' ',
                }
                //console.log(params);
                return query;
            },
            matcher: function (params, data) {
                return matchStart(params, data);
            },
            processResults: function (data, search) {
                //console.log(data);
                return {
                    results: $.map(data.data, function (item) {
                        return {
                            text: item.text,
                            id: item.id
                        }
                    })
                };
            },
        }
    });

    function matchStart(params, data) {
        params.term = params.term || '';
        if (data.text.toUpperCase().indexOf(params.term.toUpperCase()) == 0) {
            return data;
        }
        return false;
    }

    $('#search_item_code1').select2({
        ajax: {
            url: connect_url + '/v1/gcode_select2_get?ctype=gcode_a',
            dataType: 'json',
            //delay: 250,
            minimumInputLength: 2,
            minimumResultsForSearch: 10,
            data: function (params) {
                var query = {
                    codechr: typeof params.term !== 'undefined' ? params.term : ' ',
                }
                //console.log(params);
                return query;
            },
            matcher: function (params, data) {
                return matchStart(params, data);
            },
            processResults: function (data, search) {
                //console.log(data);
                return {
                    results: $.map(data.data, function (item) {
                        return {
                            text: item.text,
                            id: item.id
                        }
                    })
                };
            },
        }
    });

    $('#search_item_code3').select2({
        ajax: {
            url: connect_url + '/v1/gcode_select2_get?ctype=gcode_c',
            dataType: 'json',
            //delay: 250,
            minimumInputLength: 2,
            minimumResultsForSearch: 10,
            data: function (params) {
                var query = {
                    codechr: typeof params.term !== 'undefined' ? params.term : ' ',
                }
                //console.log(params);
                return query;
            },
            matcher: function (params, data) {
                return matchStart(params, data);
            },
            processResults: function (data, search) {
                //console.log(data);
                return {
                    results: $.map(data.data, function (item) {
                        return {
                            text: item.text,
                            id: item.id
                        }
                    })
                };
            },
        }
    });



    fetch(apmas_get).then(function (response) {
        return response.json();
    }).then(function (result) {

        $.each(result.data, function (key, val) {
            apmas_list.push({ id: val['code'], text: val['code'] + ' ' + val['lname'] });
        });

        //        console.log("apmas_get", result.data);

        $('#prodpurplan_prefsuppliercode').select2({
            width: '100%',
            height: '40px',
            dropdownParent: $(".div_prodpurplan_prefsuppliercode"),
            placeholder: {
                id: '0', // the value of the option
                text: 'Please select..'
            },
            allowClear: false,
            data: apmas_list,
            templateResult: function (data) {
                return data.text;
            },
        });
    });


    fetch(lov_get + '?lov_group=VSK_PUR&auth_username=' + prodpurplan_updatedby2).then(function (response) {
        return response.json();
    }).then(function (result) {

        //console.log("lov_get", result.data);

        $.each(result.data, function (key, val) {

            if (val['lov_type'] == 'InventoryCode') {
                if (val['lov_code'] == 'BACKLOG' || val['lov_code'] == 'STOCK') {
                    stockstatus_branch_list.push({ id: val['lov_code'], text: val['lov1'] });
                }
                stockstatus_list.push({ id: val['lov_code'], text: val['lov1'] });
            } else if (val['lov_type'] == 'LifeCycleAction') {
                //lifecycleaction_list.push({ id: val['lov_code'], text: val['lov1'] });
            } else if (val['lov_type'] == 'LockCode') {
                //lockcode_list.push({ id: val['lov_code'], text: val['lov1'] });
            } else if (val['lov_type'] == 'RelationshipType') {
                //relationshiptype_list.push({ id: val['lov_code'], text: val['lov1'] });
            } else if (val['lov_type'] == 'Purchase') {
                purchase_list.push({ id: val['lov_code'], text: val['lov1'] + ' - ' + val['lov2'] });
            } else if (val['lov_type'] == 'CertificationStatus') {
                //certificationstatus_list.push({ id: val['lov_code'], text: val['lov1'] });
            } else if (val['lov_type'] == 'DiscGroup') {
                discgroup_list.push({ id: val['lov_code'], text: val['lov1'] });
            } else if (val['lov_type'] == 'PurDiscGroup') {
                purdiscgroup_list.push({ id: val['lov_code'], text: val['lov1'] });
            } else if (val['lov_type'] == 'SaleDiscGroup') {
                salediscgroup_list.push({ id: val['lov_code'], text: val['lov1'] });
            } else if (val['lov_type'] == 'TransferUnit') {
                transferunit_list.push({ id: val['lov_code'], text: val['lov1'] });
            } else if (val['lov_type'] == 'CarType') {
                cartype_list.push({ id: val['lov_code'], text: val['lov1'] });
            } else if (val['lov_type'] == 'CostType') {
                costtype_list.push({ id: val['lov_code'], text: val['lov1'] });
            } else if (val['lov_type'] == 'CarBrand') {
                carbrand_list.push({ id: val['lov_code'], text: val['lov1'] });
            } else if (val['lov_type'] == 'CarModel') {
                carmodel_list.push({ id: val['lov_code'], text: val['lov1'] });
            } else if (val['lov_type'] == 'SkuFocus') {
                skufocus_list.push({ id: val['lov_code'], text: val['lov1'] });
            } else if (val['lov_type'] == 'Sel2_SubCategory') {
                subcategory_list.push({ subcategory: val['lov1'], maincategory: val['lov2'], productdivision: val['lov3'] });
            } else if (val['lov_type'] == 'Sel2_MainCategory') {
                maincategory_list.push({ maincategory: val['lov2'], productdivision: val['lov3'] });
            } else if (val['lov_type'] == 'Sel2_ProductDivision') {
                productdivision_list.push({ id: val['lov_code'], text: val['lov3'] });
            } else if (val['lov_type'] == 'VATDiscMargin') {
                vatdiscmargin_list.push({ id: val['lov_code'], text: val['lov1'] });
            }



            //else if (val['lov_type'] == 'ProductCategory') {
            //    productcategory_list.push({ subcategory: val['lov1'], maincategory: val['lov2'], productdivision: val['lov3'] });
            //    productdivision_list.push({ id: val['lov3'], text: val['lov3'] });
            //    //productdivision_list.push({ id: val['lov3'], text: val['lov3'] });
            //    maincategory_list.push({ id: val['lov2'], text: val['lov2'] });
            //    subcategory_list.push({ id: val['lov1'], text: val['lov1'] });
            //}

            //else if (val['lov_type'] == 'ItemClass') {
            //    itemclass_list.push({ id: val['lov_code'], text: val['lov1'] });
            //}

        });

        console.log("vatdiscmargin_list", vatdiscmargin_list);
        //console.log("productdivision_list", productdivision_list);
        //console.log("maincategory_list", maincategory_list);
        //console.log("subcategory_list", subcategory_list);
        //console.log("productcategory_list", productcategory_list);
        //console.log("stockstatus_list", stockstatus_list);
        //console.log("lifecycleaction_list", lifecycleaction_list);
        //console.log("lockcode_list", lockcode_list);
        //console.log("relationshiptype_list", relationshiptype_list);
        //console.log("itemclass_list", itemclass_list);
        //console.log("purchase_list", purchase_list);
        //console.log("transferunit_list", transferunit_list);
        //console.log("costtype_list", costtype_list);

        //$('#inventory1').find('#prodpurplan_stockstatus').append(stockstatus_list);

        $('#prodpurplan_carmodel').select2({
            //width: '235px',
            height: '40px',
            dropdownParent: $(".div_prodpurplan_carmodel"),
            placeholder: {
                id: '0', // the value of the option
                text: 'Please select..'
            },
            allowClear: true,
            data: carmodel_list,
            searchable: false,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('#prodpurplan_carbrand').select2({
            //width: '235px',
            height: '40px',
            dropdownParent: $(".div_prodpurplan_carbrand"),
            placeholder: {
                id: '0', // the value of the option
                text: 'Please select..'
            },
            allowClear: true,
            data: carbrand_list,
            searchable: false,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('#prodpurplan_vatdiscmargin').select2({
            //width: '235px',
            height: '40px',
            dropdownParent: $(".div_prodpurplan_vatdiscmargin"),
            placeholder: {
                id: '0', // the value of the option
                text: 'Please select..'
            },
            allowClear: false,
            data: vatdiscmargin_list,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('#search_item_productdivision').select2({
            //width: '235px',
            height: '40px',
            dropdownParent: $(".div_search_item_productdivision"),
            placeholder: {
                id: '0', // the value of the option
                text: 'Please select..'
            },
            allowClear: true,
            data: productdivision_list,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('#search_item_carmodel').select2({
            //width: '235px',
            height: '40px',
            dropdownParent: $(".div_search_item_carmodel"),
            placeholder: {
                id: '0', // the value of the option
                text: 'Please select..'
            },
            allowClear: true,
            data: carmodel_list,
            searchable: false,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('#search_item_carbrand').select2({
            //width: '235px',
            height: '40px',
            dropdownParent: $(".div_search_item_carbrand"),
            placeholder: {
                id: '0', // the value of the option
                text: 'Please select..'
            },
            allowClear: true,
            data: carbrand_list,
            searchable: false,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('#stmas_costtype').select2({
            width: '100%',
            height: '40px',
            dropdownParent: $(".div_stmas_costtype"),
            placeholder: {
                id: '0', // the value of the option
                text: 'Please select..'
            },
            allowClear: false,
            data: costtype_list,
            searchable: false,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('#prodpurplan_cartype').select2({
            width: '100%',
            height: '40px',
            dropdownParent: $(".div_prodpurplan_cartype"),
            placeholder: {
                id: '0', // the value of the option
                text: 'Please select..'
            },
            allowClear: false,
            data: cartype_list,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('#prodpurplan_transferunit').select2({
            width: '100%',
            height: '40px',
            dropdownParent: $(".div_prodpurplan_transferunit"),
            placeholder: {
                id: '0', // the value of the option
                text: 'Please select..'
            },
            allowClear: false,
            data: transferunit_list,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('#prodpurplan_discgroup').select2({
            width: '100%',
            height: '40px',
            dropdownParent: $(".div_prodpurplan_discgroup"),
            placeholder: {
                id: '0', // the value of the option
                text: 'Please select..'
            },
            allowClear: false,
            data: discgroup_list,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('#prodpurplan_purdiscgroup').select2({
            width: '100%',
            height: '40px',
            dropdownParent: $(".div_prodpurplan_purdiscgroup"),
            placeholder: {
                id: '0', // the value of the option
                text: 'Please select..'
            },
            allowClear: false,
            data: purdiscgroup_list,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('#prodpurplan_salediscgroup').select2({
            width: '100%',
            height: '40px',
            dropdownParent: $(".div_prodpurplan_salediscgroup"),
            placeholder: {
                id: '0', // the value of the option
                text: 'Please select..'
            },
            allowClear: false,
            data: salediscgroup_list,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('#prodpurplan_skufocus').select2({
            width: '100%',
            height: '40px',
            dropdownParent: $(".div_prodpurplan_skufocus"),
            placeholder: {
                id: '0', // the value of the option
                text: 'Please select..'
            },
            allowClear: false,
            data: skufocus_list,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('#search_item_skufocus').select2({
            width: '100%',
            height: '40px',
            dropdownParent: $(".div_search_item_skufocus"),
            placeholder: {
                id: '0', // the value of the option
                text: 'Please select..'
            },
            allowClear: false,
            data: skufocus_list,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('#search_item_stockstatus').select2({
            width: '100%',
            height: '10px',
            dropdownParent: $(".div_search_item_stockstatus"),
            placeholder: {
                id: '0', // the value of the option
                text: 'Please select..'
            },
            allowClear: true,
            data: stockstatus_list,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('#prodpurplan_stockstatus').select2({
            width: '100%',
            height: '40px',
            dropdownParent: $(".div_prodpurplan_stockstatus"),
            //placeholder: {
            //    id: '0', // the value of the option
            //    text: 'Please select..'
            //},
            allowClear: false,
            data: stockstatus_list,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('#prodpurplan_lifecycleaction').select2({
            width: '100%',
            height: '10px',
            dropdownParent: $(".div_prodpurplan_lifecycleaction"),
            placeholder: {
                id: '0', // the value of the option
                text: 'Please select..'
            },
            allowClear: false,
            data: lifecycleaction_list,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('#prodpurplan_lockcode').select2({
            width: '100%',
            height: '40px',
            dropdownParent: $(".div_prodpurplan_lockcode"),
            placeholder: {
                id: '0', // the value of the option
                text: 'Please select..'
            },
            allowClear: false,
            data: lockcode_list,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('#prodpurplan_relationshiptype').select2({
            width: '100%',
            height: '40px',
            dropdownParent: $(".div_prodpurplan_relationshiptype"),
            placeholder: {
                id: '0', // the value of the option
                text: 'Please select..'
            },
            allowClear: false,
            data: relationshiptype_list,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('#prodpurplan_purchase').select2({
            width: '100%',
            height: '40px',
            dropdownParent: $(".div_prodpurplan_purchase"),
            placeholder: {
                id: '0', // the value of the option
                text: 'Please select..'
            },
            allowClear: false,
            data: purchase_list,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('#prodpurplan_certificationstatus').select2({
            width: '100%',
            //height: '40px',
            dropdownParent: $(".div_prodpurplan_certificationstatus"),
            placeholder: {
                id: '0', // the value of the option
                text: 'Please select..'
            },
            allowClear: false,
            data: certificationstatus_list,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('.prodrepplan_stockstatus_vsm').select2({
            width: '100%',
            height: '40px',
            dropdownParent: $(".div_prodrepplan_stockstatus"),
            //placeholder: {
            //    id: '0', // the value of the option
            //    text: 'Please select..'
            //},
            searchable: false,
            allowClear: false,
            data: stockstatus_list,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('.prodrepplan_stockstatus').select2({
            width: '100%',
            height: '40px',
            dropdownParent: $(".div_prodrepplan_stockstatus"),
            //placeholder: {
            //    id: '0', // the value of the option
            //    text: 'Please select..'
            //},
            searchable: false,
            allowClear: false,
            data: stockstatus_branch_list,
            //data: stockstatus_list,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('#search_item_maincategory').select2({
            //width: '235px',
            height: '40px',
            dropdownparent: $(".div_search_item_maincategory"),
            placeholder: {
                id: '0', // the value of the option
                text: 'please select..'
            },
            allowclear: true,
            //data: maincategory_list,
            templateresult: function (data) {
                return data.text;
            },
        });

        $('#search_item_subcategory').select2({
            //width: '235px',
            height: '40px',
            dropdownParent: $(".div_search_item_subcategory"),
            placeholder: {
                id: '0', // the value of the option
                text: 'Please select..'
            },
            allowClear: true,
            //data: subcategory_list,
            templateResult: function (data) {
                return data.text;
            },
        });

        $('#inventory1').find('#prodpurplan_lifecycleaction').append(lifecycleaction_list);
        $('#inventory1').find('#prodpurplan_certificationstatus').append(certificationstatus_list);
        $('#inventory1').find('#prodpurplan_lockcode').append(lockcode_list);
        $('#inventory1').find('#prodpurplan_relationshiptype').append(relationshiptype_list);
        $('#inventory2').find('#prodpurplan_purchase').append(purchase_list);

    });

    $.List();

    $('#btn-item_create').click(function (e) {

        e.preventDefault();

        $.Create();

        //alert("290");

    });

    $('#modal-frm_data').on('hidden.bs.modal', function () {

        $('#information').find('input').val('');
        $('#information').find('textarea').val('');
        $('#information').find('select').val('').trigger('change.select2');
        $('#information').find('.stmas_checkbox').prop("checked", false);

        $('#stockprice').find('input').val('');
        $('#stockprice').find('select').val('').trigger('change.select2');
        $('#stockprice').find('#tbl_goodprice').html("");

        $('#inventory1').find('input').val('');
        $('#inventory1').find('textarea').val('');
        $('#inventory1').find('select').val('').trigger('change.select2');
        $('#inventory1').find('.tx-value').text('');

        $('#inventory2').find('input').val('');
        $('#inventory2').find('select').val('').trigger('change.select2');
        $('#inventory2').find('.stmas_radiobox').prop("checked", false);
        $('#inventory2').find('.tx-value').text('');

        $('#salesinfo').find('.tx-value').text('');

        $('#site_code').val('').trigger('change').prop('disabled', false);
        $('#schedule_note').val('').prop('disabled', false);
        $('.schedule_day').prop('checked', false).prop('disabled', true);
        $('#schedule_all').prop('checked', false).prop('disabled', true);
        $('.record_status').prop('disabled', true);

        $('#frm_stockstatus_history').find('#tbl_stockstatus_history').html("");

        $("#frm_data").parsley().reset();

        $("#frm_data").find('.nav-link').removeClass('active');
        $("#frm_data").find('.tab-pane').removeClass('active');
        $("#frm_data").find('#nav1').addClass('active')
        $("#frm_data").find('#information').addClass('active')

    });

    $('#frm_search').submit(async function (e) {

        e.preventDefault();

        $.LoadingOverlay("show", {
            image: '',
            custom: customElement
        });

        //var search_item_code = '';
        ////var search_item_code = $('#frm_search').find('#search_item_code').val();
        //var search_item_code = isEmpty($('#frm_search').find('#search_item_code').val()) ? '' : $('#frm_search').find('#search_item_code').val();

        //var search_item_gbarcode = '';
        ////var search_item_gbarcode = $('#frm_search').find('#search_item_gbarcode').val();
        //var search_item_gbarcode = isEmpty($('#frm_search').find('#search_item_gbarcode').val()) ? '' : $('#frm_search').find('#search_item_gbarcode').val();

        //var search_item_spcodes = '';
        ////var search_item_spcodes = $('#frm_search').find('#search_item_spcodes').val();
        //var search_item_spcodes = isEmpty($('#frm_search').find('#search_item_spcodes').val()) ? '' : $('#frm_search').find('#search_item_spcodes').val();

        var search_item_code1_val = isEmpty($('#frm_search').find('#search_item_code1').val()) ? '' : $('#frm_search').find('#search_item_code1').val();
        var search_item_code3_val = isEmpty($('#frm_search').find('#search_item_code3').val()) ? '' : $('#frm_search').find('#search_item_code3').val();
        var search_item_productdivision_val = isEmpty($('#frm_search').find('#search_item_productdivision').val()) ? '' : $('#frm_search').find('#search_item_productdivision').val();
        var search_item_maincategory_val = isEmpty($('#frm_search').find('#search_item_maincategory').val()) ? '' : $('#frm_search').find('#search_item_maincategory').val();
        var search_item_subcategory_val = isEmpty($('#frm_search').find('#search_item_subcategory').val()) ? '' : $('#frm_search').find('#search_item_subcategory').val();
        var search_item_carmodel_val = $('#frm_search').find('#search_item_carmodel').val();
        var search_item_carbrand_val = isEmpty($('#frm_search').find('#search_item_carbrand').val()) ? '' : $('#frm_search').find('#search_item_carbrand').val();
        var search_item_stockstatus_val = isEmpty($('#frm_search').find('#search_item_stockstatus').val()) ? '' : $('#frm_search').find('#search_item_stockstatus').val();
        var search_item_skufocus_val = isEmpty($('#frm_search').find('#search_item_skufocus').val()) ? '' : $('#frm_search').find('#search_item_skufocus').val();

        //console.log("search_item_subcategory_val", search_item_subcategory_val);
        var search_item_code1 = search_item_code1_val.join(",");
        var search_item_code3 = search_item_code3_val.join(",");
        var search_item_productdivision = search_item_productdivision_val.join(",");
        var search_item_maincategory = search_item_maincategory_val.join(",");
        var search_item_subcategory = search_item_subcategory_val.join(",");
        var search_item_carmodel = search_item_carmodel_val.join(",");
        var search_item_carbrand = search_item_carbrand_val.join(",");
        var search_item_stockstatus = search_item_stockstatus_val.join(",");
        var search_item_skufocus = search_item_skufocus_val.join(",");
        //console.log("search_item_subcategory", search_item_subcategory);

        //if (search_item_gbarcode !== "" || search_item_spcodes !== "" || search_item_code !== "" || search_item_code1 !== "" || search_item_code3 !== "" || search_item_productdivision !== "" || search_item_maincategory !== "" || search_item_subcategory !== "" || search_item_carbrand !== "" || search_item_carmodel !== "") {
        if (search_item_code1 !== "" || search_item_code3 !== "" || search_item_productdivision !== "" || search_item_maincategory !== "" || search_item_subcategory !== "" || search_item_carbrand !== "" || search_item_carmodel !== "" || search_item_stockstatus !== "" || search_item_skufocus !== "") {

            let mode1 = 'search';

            await $("#global-loader").fadeIn("slow");

            await oTable.destroy();

            await $.List(mode1);


        } else {
            setTimeout(function () {
                $.LoadingOverlay("hide");
            }, 900);
            toastr.error('Please enter something to search a products.');
        }

    });

    $('#frm_search').find('#btn_reset').click(function (e) {

        e.preventDefault();

        $('#frm_search').find('input').val('');
        $('#frm_search').find('.select2_condb').empty();
        $('#frm_search').find('.select2_notcondb').val();
        $('#frm_search').find('.select2_notcondb').select2('refresh');

    });


    $('#frm_search2').submit(async function (e) {

        e.preventDefault();

        $.LoadingOverlay("show", {
            image: '',
            custom: customElement
        });

        var search_item_code_2 = $('#frm_search2').find('#search_item_code_2').val();
        var search_item_gbarcode_2 = $('#frm_search2').find('#search_item_gbarcode_2').val();
        var search_item_spcodes_2 = $('#frm_search2').find('#search_item_spcodes_2').val();
        var search_item_code1_2 = $('#frm_search2').find('#search_item_code1_2').val();
        var search_item_code3_2 = $('#frm_search2').find('#search_item_code3_2').val();

        if (search_item_code_2 !== "" || search_item_gbarcode_2 !== "" || search_item_spcodes_2 !== "" || search_item_code1_2 !== "" || search_item_code3_2 !== "") {

            let mode2 = 'search2';

            await $("#global-loader").fadeIn("slow");

            await oTable.destroy();

            await $.List(mode2);


        } else {
            setTimeout(function () {
                $.LoadingOverlay("hide");
            }, 900);
            toastr.error('Please enter something to search a products.');
        }

    });

    $('#frm_search2').find('#btn_reset').click(function (e) {

        e.preventDefault();

        $('#frm_search2').find('input').val('');
        $('#frm_search2').find('select').val('').trigger('change.select2');
        $('#frm_search2').find('select').select2('refresh');
        $('#frm_search2').find('select').empty();

    });

    setTimeout(function () {
        $.LoadingOverlay("hide");
    }, 900);

    //$('#div_search_item_productdivision').find('#search_item_productdivision').on("change", function (e) {

    //    e.preventDefault();

    //    console.log("product division");

    //});

    //console.log("555555");

    $('.div_search_item_productdivision').find('#search_item_productdivision').on('select2:select select2:unselect', function (e) {
        e.preventDefault();
        //console.log('Product Division --> ' + $(this).val());
        $.fnchangeproddiv($(this).val());

    });

    $.fnchangeproddiv = function (proddiv_val) {
        var i = 0;
        sel2_maincategory_list = [];
        var proddiv_val_count = 0;
        proddiv_val_count = proddiv_val.length;
        //console.log("proddiv_val", proddiv_val_count + ' ' + proddiv_val);

        if (proddiv_val_count == 0) {
            $(".div_search_item_maincategory").find('#search_item_maincategory').empty().prop("disabled", true);
            $(".div_search_item_subcategory").find('#search_item_subcategory').empty().prop("disabled", true);
            //console.log("Empty");
        } else {

            if (i <= proddiv_val_count) {
                $.each(proddiv_val, function (key, val) {
                    $.each(maincategory_list, function (key, val2) {
                        if (val2['productdivision'] == val) {
                            sel2_maincategory_list.push({ id: val + '>' + val2['maincategory'], text: val + ' > ' + val2['maincategory'] });
                            sel2_maincategory_list_val.push({ id: val2['maincategory'], text: val + ' > ' + val2['maincategory'] });
                        }
                    });
                    //console.log("val" + i, val);
                    ++i;
                });

                //console.log("sel2_maincategory_list", sel2_maincategory_list);

                $(".div_search_item_maincategory").find('#search_item_maincategory').prop("disabled", false);
                $('#search_item_maincategory').select2({
                    //width: '235px',
                    height: '40px',
                    dropdownParent: $(".div_search_item_maincategory"),
                    placeholder: {
                        id: '0', // the value of the option
                        text: 'Please select..'
                    },
                    allowClear: true,
                    data: sel2_maincategory_list,
                    templateResult: function (data) {
                        return data.text;
                    },
                });

            }
        }
    }


    $('.div_search_item_maincategory').find('#search_item_maincategory').on('select2:select select2:unselect', function (e) {
        e.preventDefault();
        //console.log('Main Category --> ' + $(this).val());
        $.fnchangemaincategory($(this).val());

    });

    $.fnchangemaincategory = function (maincat_val) {

        var i = 0;
        sel2_subcategory_list = [];
        var maincat_val_count = 0;
        maincat_val_count = maincat_val.length;
        //console.log("maincat_val", maincat_val_count + ' ' + maincat_val);

        if (maincat_val_count == 0) {

            $(".div_search_item_subcategory").find('#search_item_subcategory').empty().prop("disabled", true);
            //console.log("Empty");

        } else {

            if (i <= maincat_val_count) {
                $.each(maincat_val, function (key, val) {
                    var vmaincat = val.split(">");
                    $.each(subcategory_list, function (key, val2) {
                        if (val2['maincategory'] == vmaincat[1]) {
                            sel2_subcategory_list.push({ id: vmaincat[1] + '>' + val2['subcategory'], text: vmaincat[1] + ' > ' + val2['subcategory'] });
                            sel2_subcategory_list_val.push({ id: val2['subcategory'], text: vmaincat[1] + ' > ' + val2['subcategory'] });
                        }
                    });
                    //console.log("val" + i, val);
                    ++i;
                });

                //console.log("sel2_subcategory_list", sel2_subcategory_list);

                $(".div_search_item_subcategory").find('#search_item_subcategory').prop("disabled", false);
                $('#search_item_subcategory').select2({
                    //width: '235px',
                    height: '40px',
                    dropdownParent: $(".div_search_item_subcategory"),
                    placeholder: {
                        id: '0', // the value of the option
                        text: 'Please select..'
                    },
                    allowClear: true,
                    data: sel2_subcategory_list,
                    templateResult: function (data) {
                        return data.text;
                    },
                });

            }
        }
    }

};


$.List = async function (mode) {

    //console.log('Index function Start', new Date());

    let url = new URL(product_search);

    url.search = new URLSearchParams({
        //search_item_gbarcode: $('#frm_search').find('#search_item_gbarcode').val() === '' ? '' : $('#search_item_gbarcode').val(),
        //search_item_spcodes: $('#frm_search').find('#search_item_spcodes').val() === '' ? '' : $('#search_item_spcodes').val(),
        //search_item_code: $('#frm_search').find('#search_item_code').val() === '' ? '' : $('#search_item_code').val(),
        search_item_code1: isEmpty($('#frm_search').find('#search_item_code1').val()) ? '' : $('#frm_search').find('#search_item_code1').val(),
        search_item_code3: isEmpty($('#frm_search').find('#search_item_code3').val()) ? '' : $('#frm_search').find('#search_item_code3').val(),
        search_item_productdivision: isEmpty($('#frm_search').find('#search_item_productdivision').val()) ? '' : $('#frm_search').find('#search_item_productdivision').val(),
        search_item_maincategory: isEmpty($('#frm_search').find('#search_item_maincategory').val()) ? '' : $('#frm_search').find('#search_item_maincategory').val(),
        search_item_subcategory: isEmpty($('#frm_search').find('#search_item_subcategory').val()) ? '' : $('#frm_search').find('#search_item_subcategory').val(),
        search_item_carmodel: isEmpty($('#frm_search').find('#search_item_carmodel').val()) ? '' : $('#frm_search').find('#search_item_carmodel').val(),
        search_item_carbrand: isEmpty($('#frm_search').find('#search_item_carbrand').val()) ? '' : $('#frm_search').find('#search_item_carbrand').val(),
        search_item_stockstatus: isEmpty($('#frm_search').find('#search_item_stockstatus').val()) ? '' : $('#frm_search').find('#search_item_stockstatus').val(),
        search_item_skufocus: isEmpty($('#frm_search').find('#search_item_skufocus').val()) ? '' : $('#frm_search').find('#search_item_skufocus').val(),
        search_item_code_2: isEmpty($('#frm_search2').find('#search_item_code_2').val()) ? '' : $('#frm_search2').find('#search_item_code_2').val(),
        search_item_gbarcode_2: isEmpty($('#frm_search2').find('#search_item_gbarcode_2').val()) ? '' : $('#frm_search2').find('#search_item_gbarcode_2').val(),
        search_item_spcodes_2: isEmpty($('#frm_search2').find('#search_item_spcodes_2').val()) ? '' : $('#frm_search2').find('#search_item_spcodes_2').val(),
        search_item_code1_2: isEmpty($('#frm_search2').find('#search_item_code1_2').val()) ? '' : $('#frm_search2').find('#search_item_code1_2').val(),
        search_item_code3_2: isEmpty($('#frm_search2').find('#search_item_code3_2').val()) ? '' : $('#frm_search2').find('#search_item_code3_2').val(),
        mode: mode
        //search_item_gbarcode: $('#search_item_gbarcode').val() === '' ? '' : $('#search_item_gbarcode').val(),
        //search_item_spcodes: $('#search_item_spcodes').val() === '' ? '' : $('#search_item_spcodes').val(),
        //search_item_code: $('#search_item_code').val() === '' ? '' : $('#search_item_code').val(),
        //search_item_code1: $('#search_item_code1').val() === '' ? '' : $('#search_item_code1').val(),
        //search_item_code3: $('#search_item_code3').val() === '' ? '' : $('#search_item_code3').val(),
        //search_item_productdivision: $('#search_item_productdivision').val() === '' ? '' : $('#search_item_productdivision').val(),
        //search_item_maincategory: $('#search_item_maincategory').val() === '' ? '' : $('#search_item_maincategory').val(),
        //search_item_subcategory: $('#search_item_subcategory').val() === '' ? '' : $('#search_item_subcategory').val(),
        //search_item_carmodel: $('#search_item_carmodel').val() === '' ? '' : $('#search_item_carmodel').val(),
        //search_item_carbrand: $('#search_item_carbrand').val() === '' ? '' : $('#search_item_carbrand').val(),
        //mode: mode
    });

    fetch(url).then(function (response) {
        return response.json();
        //alert("1");
    }).then(function (result) {

        //alert("2");
        //if (mode === 'search') { $('#tbl-list').show(); } else { $('#tbl-list').hide(); }

        if (mode === 'search' && result.length === 0) {

            toastr.error('ไม่พบข้อมูลค้นหา !');
            $("#global-loader").fadeOut("slow");

            $.addLogError('', 'VSM', 'search', url_location, 'error');

        } else if (mode === 'search' && result.length > 0) {
            $.addLogEvent('', 'VSM', 'search', url_location, 'ok');
        }

        console.log("oTable", result.data);

        //oTable.destroy();
        oTable = $('#tbl-list').DataTable({
            data: result.data,
            scrollY: "394px",
            scrollX: true,
            scrollCollapse: true,
            autoWidth: true,
            paging: true,
            dom: 'Bfrtip',
            colReorder: true,
            stateSave: true,
            lengthMenu: [
                [10, 25, 50, -1],
                ['10 rows', '25 rows', '50 rows', 'Show all']
            ],
            buttons: [
                'pageLength', 'copy', 'excel', 'colvis'
                , {
                    extend: 'excel',
                    text: 'Save in EXCEL',
                    filename: 'td900',
                    customize: function (xlsx) {
                        var sheet = xlsx.xl.worksheets['sheet1.xml'];
                        // $('c[r=A1] t', sheet).text( 'Custom text' );

                        // Loop over the cells in column `F`
                        $('row c[r^="G"] ', sheet).each(function () {
                            // Get the value and strip the non numeric characters

                            if ($(this).text() !== "needed Adjustment") {
                                $(this).attr('s', '20');
                            }

                        });
                    }


                }
            ],
            //fixedColumns: {
            //    //leftColumns: 2,
            //    //rightColumns: 2
            //},
            columns: [
                {
                    title: "<center>รหัสสินค้า</center>",
                    data: "code",
                    width: "150px",
                },
                {
                    title: "<center>ชื่อสินค้า</center>",
                    data: "itemname",
                    width: "300px",

                },
                {
                    title: "<center>บาร์โค้ด</center>",
                    data: "barcode",
                    width: "70px",

                },
                {
                    title: "<center>รหัสผู้ผลิต</center>",
                    data: "spcodes",
                    width: "70px",

                },
                {
                    title: "<center>Car Model</center>",
                    data: "carmodel",
                    width: "80px",

                },
                {
                    title: "<center>Year</center>",
                    data: "carFmyear",
                    width: "50px",
                    class: "",
                    render: function (data, type, row, meta) {
                        //var stockstatus_val = data;
                        var carfmyear = row.carFmyear;
                        var cartoyear = row.carToyear;
                        var caryear = "";
                        //var caryear = carfmyear + "-" + cartoyear;
                        if (carfmyear == "" && cartoyear == "") { caryear = "ไม่ระบุ"; }
                        else if (carfmyear !== "" && cartoyear == "") { caryear = carfmyear + "-ไม่ระบุ"; }
                        else if (carfmyear == "" && cartoyear !== "") { caryear = "ไม่ระบุ-" + cartoyear; }
                        else if (carfmyear !== "" && cartoyear !== "") { caryear = carfmyear + "-" + cartoyear; }
                        else { caryear = "-"; }
                        return caryear;
                    }

                },
                {
                    title: "<center>Stock Status</center>",
                    data: "StockStatus",
                    width: "88px",
                    class: "",
                    render: function (data, type, row, meta) {
                        //var stockstatus_val = data;
                        var stockstatus = "";
                        if (data == 'BACKLOG') {
                            stockstatus = '<span class="badge badge-secondary mg-l-25" style="width: 55px;">BACKLOG</span>';
                        } else if (data == 'PLAN') {
                            stockstatus = '<span class="badge badge-primary mg-l-25" style="width: 55px;">PLAN</span>';
                        } else if (data == 'STOCK') {
                            stockstatus = '<span class="badge badge-success mg-l-25" style="width: 55px;">STOCK</span>';
                        } else if (data == 'SERVICE') {
                            stockstatus = '<span class="badge badge-danger mg-l-25" style="width: 55px;">SERVICE</span>';
                        }
                        return stockstatus;
                    }

                },
                {
                    title: "<center>Item Class</center>",
                    data: "Item_Class",
                    width: "75px",
                    render: function (data, type, row, meta) {
                        //var stockstatus_val = data;
                        var itemclass = "";
                        if (data == 'Aftermarket') {
                            itemclass = '<span class="badge badge-warning mg-l-20" style="width: 40px;">REM</span>';
                        } else if (data == 'OEM') {
                            itemclass = '<span class="badge badge-info mg-l-20" style="width: 40px;">OEM</span>';
                        }
                        return itemclass;
                    }
                },
                {
                    title: "<center>Product Division</center>",
                    data: "Product_Division",
                    width: "115px",
                },
                {
                    title: "<center>Main Category</center>",
                    data: "Main_Category",
                    width: "105px",
                },
                {
                    title: "<center>Sub Category</center>",
                    data: "Sub_Category",
                    width: "105px",
                },
                {
                    title: "<center>VSM-ST</center>",
                    data: "OnhandST",
                    width: "45px",
                    class: "tx-center",
                    //render: function (data, type, row, meta) {
                    //    return '<span class="mg-r-25">' + data + '</span>'
                    //}
                },
                {
                    title: "<center>&nbsp;VSF</center>",
                    data: "Onhand_VSF",
                    width: "25px",
                    class: "tx-center",
                },
                {
                    title: "<center>&nbsp;LKS</center>",
                    data: "Onhand_LKS",
                    width: "25px",
                    class: "tx-center",
                },
                {
                    title: "<center>&nbsp;KLH</center>",
                    data: "Onhand_KLH",
                    width: "25px",
                    class: "tx-center",
                },
                {
                    title: "<center>&nbsp;&nbsp;LLK</center>",
                    data: "Onhand_LLK",
                    width: "25px",
                    class: "tx-center",
                },
                //{
                //    title: "<center>&nbsp;&nbsp;LLK</center>",
                //    data: "Onhand_LLK",
                //    width: "25px",
                //    class: "tx-center",
                //},
            ],
            "order": [[0, "desc"]],
            "initComplete": function (settings, json) {

                $("#global-loader").fadeOut("slow");
                mode = '';

                $.contextMenu({
                    selector: '#tbl-list tbody tr',
                    callback: function (key, options) {

                        let citem = oTable.row(this).data();

                        $('#modal-frm_data').modal({

                            keyboard: false,
                            backdrop: 'static'

                        });

                        if (key === 'view') {

                            $.LoadingOverlay("show", {
                                image: '',
                                custom: customElement
                            });

                            $('#information').find('input').prop("disabled", true);
                            $('#information').find('select').prop("disabled", true);
                            $('#information').find('textarea').prop("disabled", true);
                            $('#information').find('.not_use').prop("disabled", true);
                            $('#information').find('#prodpurplan_cartype').show();
                            //$('#information').find('#prodpurplan_cartype').prop("disabled", true);

                            $('#stockprice').find('input').prop("disabled", true);
                            $('#stockprice').find('select').prop("disabled", true);
                            $('#stockprice').find('textarea').prop("disabled", true);
                            $('#stockprice').find('.not_use').prop("disabled", true);

                            $('#inventory1').find('input').prop("disabled", true);
                            $('#inventory1').find('select').prop("disabled", true);
                            $('#inventory1').find('textarea').prop("disabled", true);
                            $('#inventory1').find('.not_use').prop("disabled", true);

                            $('#inventory2').find('input').prop("disabled", true);
                            $('#inventory2').find('select').prop("disabled", true);
                            $('#inventory2').find('textarea').prop("disabled", true);
                            $('#inventory2').find('.not_use').prop("disabled", true);

                            $.Details(citem);
                            $.addLogEvent(citem['code'], 'VSM', 'view', url_location, 'ok');

                            setTimeout(function () {
                                $.LoadingOverlay("hide");
                            }, 100);

                        } else if (key === 'edit') {

                            $.LoadingOverlay("show", {
                                image: '',
                                custom: customElement
                            });

                            $('#information').find('input').prop("disabled", true);
                            $('#information').find('select').prop("disabled", true);
                            $('#information').find('textarea').prop("disabled", true);
                            $('#information').find('.not_use').prop("disabled", true);
                            //$('#information').find('#prodpurplan_cartype').hide();
                            //$('#information').find('#prodpurplan_cartype').prop("disabled", false);
                            //$('#information').find('#prodpurplan_usagepercar').prop("disabled", false);
                            //$('#information').find('#prodpurplan_serviceyear').prop("disabled", false);

                            $('#stockprice').find('input').prop("disabled", true);
                            $('#stockprice').find('select').prop("disabled", true);
                            $('#stockprice').find('textarea').prop("disabled", true);
                            $('#stockprice').find('.not_use').prop("disabled", true);

                            $('#inventory1').find('input').prop("disabled", false);
                            $('#inventory1').find('select').prop("disabled", false);
                            $('#inventory1').find('textarea').prop("disabled", false);
                            $('#inventory1').find('.not_use').prop("disabled", true);

                            $('#inventory2').find('input').prop("disabled", false);
                            $('#inventory2').find('select').prop("disabled", false);
                            $('#inventory2').find('textarea').prop("disabled", false);
                            $('#inventory2').find('.not_use').prop("disabled", true);

                            $.Details(citem);
                            $.Edit(citem);
                            $.addLogEvent(citem['code'], 'VSM', 'view', url_location, 'ok');

                            setTimeout(function () {
                                $.LoadingOverlay("hide");
                            }, 100);

                            //$('#salesinfo').find('#prodpurplan_countofinvoiceorderlines_vsm').hide();

                        } else if (key === 'delete') {

                            $.Details(citem);
                            $.Delete(citem);

                        }
                        else if (key === 'create') {

                            $.Create();

                        } else {

                            alert('ERROR');

                        }

                    },
                    items: {
                        "view": { name: "View", icon: "fas fa-search" },
                        "edit": { name: "Edit", icon: "edit" },

                        // "delete": { name: "Delete", icon: "delete" },
                        // "sep1": "---------",
                        // "create": { name: "New Item", icon: "add" }
                    }

                });
            },
        });

        $('#modal-frm_search').modal('hide');

        setTimeout(function () {
            $.LoadingOverlay("hide");
        }, 100);
        //}, 900);

    });

};


$.Create = async function () {

    $('.btn-save_form').show();
    $('.btn-save_form').prop('disabled', false);
    $('#btn-save_exit').html('Save');
    $('#btn-save_exit').removeClass('btn-danger').addClass('btn-primary');

    $('#frm_data input').val('').prop('disabled', false);
    $('#frm_data input').eq(0).focus();
    $('.record_status').eq(1).prop('checked', true);

    $('#schedule_all').on("change", function (e) {

        e.preventDefault();

        if ($(this).prop("checked") === true) {
            $('.schedule_day').prop('checked', true);
        } else {
            $('.schedule_day').prop('checked', false);
        }

    });

    $('.schedule_day').on("change", function (e) {

        e.preventDefault();

        if ($('.schedule_day:checked').length === 7) {
            $('#schedule_all').prop('checked', true);
        } else {
            $('#schedule_all').prop('checked', false);
        }

    });


    $('.btn-save_form').click(function (e) {

        let submit_action = $(this).data('action');

        $('#frm_data').parsley().on('form:submit', function () {

            $('.btn-save_form').prop('disabled', true);

            let uuid = $.uuid();

            let data_citem = {
                schedule_id: uuid,
                site_code: $('#site_code').val(),
                site_name: $('#site_code option:selected').text(),
                schedule_mon: $('#frm_data').find('#schedule_mon').prop("checked") === true ? 'Y' : 'N',
                schedule_tue: $('#frm_data').find('#schedule_tue').prop("checked") === true ? 'Y' : 'N',
                schedule_wed: $('#frm_data').find('#schedule_wed').prop("checked") === true ? 'Y' : 'N',
                schedule_thu: $('#frm_data').find('#schedule_thu').prop("checked") === true ? 'Y' : 'N',
                schedule_fri: $('#frm_data').find('#schedule_fri').prop("checked") === true ? 'Y' : 'N',
                schedule_sat: $('#frm_data').find('#schedule_sat').prop("checked") === true ? 'Y' : 'N',
                schedule_sun: $('#frm_data').find('#schedule_sun').prop("checked") === true ? 'Y' : 'N',
                schedule_note: $('#schedule_note').val(),
                record_status: $('#frm_data').find('.record_status').prop("checked") === true ? 'Y' : 'N',
                created_by: "SYSTEM",
                created_date: new Date(),
                updated_by: "SYSTEM",
                updated_date: new Date()
            };

            fs.collection(collection).doc(uuid).set(data_citem).then(function () {

                toastr.options = {
                    "closeButton": false, // true/false
                    "debug": false, // true/false
                    "newestOnTop": false, // true/false
                    "progressBar": true, // true/false
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300", // in milliseconds
                    "hideDuration": "500", // in milliseconds
                    "timeOut": "900", // in milliseconds
                    "extendedTimeOut": "900", // in milliseconds
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };

                toastr.success('Save Successfully!', function () {

                    setTimeout(function () {

                        oTable.destroy();
                        $.List();

                        $("#frm_data").parsley().reset();

                        if (submit_action === "save_exit") {

                            $('.btn-save_form').prop('disabled', false);
                            //$('#modal-frm_data').modal('hide');
                            $('#modal-frm_search').modal('hide');

                        } else if (submit_action === "save_new") {

                            $('#site_code').val('').trigger('change');
                            $('#schedule_note').val('').prop('disabled', false);
                            $('.schedule_day').prop('checked', false);
                            $('#schedule_all').prop('checked', false);

                            $('#frm_data input').val('').prop('disabled', false);
                            $('#frm_data input').eq(0).focus();
                            $('.record_status').eq(1).prop('checked', true);

                            $('.btn-save_form').prop('disabled', false);

                        } else {

                            toastr.error('Error writing document');

                        }

                    }, 900);

                    //$.addLogEvent(collection);

                });

            }).catch(function (error) {

                toastr.error(error, 'Error writing document');
                console.error("Error writing document: ", error);

            });

            return false;

        });

    });

};


$.Details = async function (citem) {

    //console.log(citem);

    $.LoadingOverlay("show", {
        image: '',
        custom: customElement
    });


    $('#information').find('#prodpurplan_carbrand').select2({
        dropdownParent: $('.div_prodpurplan_carbrand'),
        placeholder: "Please select",
        tags: true,
        ajax: {
            url: select2_get + '?lov_type=CarBrand',//เพิ่มตัวแปรไปด้านหลัง
            dataType: 'json',
            data: function (params) {
                var query = {
                    search: typeof params.term !== 'undefined' ? params.term : ' ',
                }
                //console.log(params);
                return query;
            },
            processResults: function (data, search) {
                //console.log(data);
                return {
                    results: $.map(data.data, function (item) {
                        return {
                            text: item.text,
                            id: item.id
                        }
                    })
                };
            },
            templateSelection: function (data, container) {
                // Add custom attributes to the <option> tag for the selected option
                $(data.element).attr('data-custom-attribute', data.customValue);
                return data.text;
            },
            complete: function (result) {
                //alert("Succeed");
            }
        }
    });


    $('#information').find('#prodpurplan_carmodel').select2({
        dropdownParent: $('.div_prodpurplan_carmodel'),
        placeholder: "Please select",
        tags: true,
        ajax: {
            url: select2_get + '?lov_type=CarModel',//เพิ่มตัวแปรไปด้านหลัง
            dataType: 'json',
            data: function (params) {
                var query = {
                    search: typeof params.term !== 'undefined' ? params.term : ' ',
                }
                //console.log(params);
                return query;
            },
            processResults: function (data, search) {
                //console.log(data);
                return {
                    results: $.map(data.data, function (item) {
                        return {
                            text: item.text,
                            id: item.id
                        }
                    })
                };
            },
            templateSelection: function (data, container) {
                // Add custom attributes to the <option> tag for the selected option
                $(data.element).attr('data-custom-attribute', data.customValue);
                return data.text;
            },
            complete: function (result) {
                //alert("Succeed");
            }
        }
    });


    $('#inventory1').find('#prodpurplan_skufocus').select2({
        dropdownParent: $('#div_prodpurplan_skufocus'),
        placeholder: "Please select",
        tags: true,
        ajax: {
            //url: api_config['url'] + api_config['service'] + api_config['controller'] + '/ACCPayment_ChequeName_Select2_Get',//เพิ่มตัวแปรไปด้านหลัง
            url: select2_get + '?lov_type=SKUFocus',//เพิ่มตัวแปรไปด้านหลัง
            dataType: 'json',
            data: function (params) {
                var query = {
                    search: typeof params.term !== 'undefined' ? params.term : ' ',
                }
                //console.log(params);
                return query;
            },
            processResults: function (data, search) {
                //console.log(data);
                return {
                    results: $.map(data.data, function (item) {
                        return {
                            text: item.text,
                            id: item.id
                        }
                    })
                };
            },
            templateSelection: function (data, container) {
                // Add custom attributes to the <option> tag for the selected option
                $(data.element).attr('data-custom-attribute', data.customValue);
                return data.text;
            },
            complete: function (result) {
                //alert("Succeed");
            }
        }
    });


    $('#inventory2').find('#prodpurplan_discgroup').select2({
        dropdownParent: $('.div_prodpurplan_discgroup'),
        placeholder: "Please select",
        tags: true,
        ajax: {
            url: select2_get + '?lov_type=DiscGroup',//เพิ่มตัวแปรไปด้านหลัง
            dataType: 'json',
            data: function (params) {
                var query = {
                    search: typeof params.term !== 'undefined' ? params.term : ' ',
                }
                //console.log(params);
                return query;
            },
            processResults: function (data, search) {
                //console.log(data);
                return {
                    results: $.map(data.data, function (item) {
                        return {
                            text: item.text,
                            id: item.id
                        }
                    })
                };
            },
            templateSelection: function (data, container) {
                // Add custom attributes to the <option> tag for the selected option
                $(data.element).attr('data-custom-attribute', data.customValue);
                return data.text;
            },
            complete: function (result) {
                //alert("Succeed");
            }
        }
    });


    $('#inventory2').find('#prodpurplan_purdiscgroup').select2({
        dropdownParent: $('.div_prodpurplan_purdiscgroup'),
        placeholder: "Please select",
        tags: true,
        ajax: {
            url: select2_get + '?lov_type=PurDiscGroup',//เพิ่มตัวแปรไปด้านหลัง
            dataType: 'json',
            data: function (params) {
                var query = {
                    search: typeof params.term !== 'undefined' ? params.term : ' ',
                }
                //console.log(params);
                return query;
            },
            processResults: function (data, search) {
                //console.log(data);
                return {
                    results: $.map(data.data, function (item) {
                        return {
                            text: item.text,
                            id: item.id
                        }
                    })
                };
            },
            templateSelection: function (data, container) {
                // Add custom attributes to the <option> tag for the selected option
                $(data.element).attr('data-custom-attribute', data.customValue);
                return data.text;
            },
            complete: function (result) {
                //alert("Succeed");
            }
        }
    });


    $('#inventory2').find('#prodpurplan_salediscgroup').select2({
        dropdownParent: $('.div_prodpurplan_salediscgroup'),
        placeholder: "Please select",
        tags: true,
        ajax: {
            url: select2_get + '?lov_type=SaleDiscGroup',//เพิ่มตัวแปรไปด้านหลัง
            dataType: 'json',
            data: function (params) {
                var query = {
                    search: typeof params.term !== 'undefined' ? params.term : ' ',
                }
                //console.log(params);
                return query;
            },
            processResults: function (data, search) {
                //console.log(data);
                return {
                    results: $.map(data.data, function (item) {
                        return {
                            text: item.text,
                            id: item.id
                        }
                    })
                };
            },
            templateSelection: function (data, container) {
                // Add custom attributes to the <option> tag for the selected option
                $(data.element).attr('data-custom-attribute', data.customValue);
                return data.text;
            },
            complete: function (result) {
                //alert("Succeed");
            }
        }
    });


    $('#frm_data').find('.modal-title').html("Item Master Form : " + citem['barcode'] + ' ' + citem['itemname']);

    $('.btn-save_form').hide();

    $('#btn-addnewqty').click(function () {

        $('#modal-frm_data_addnewqty').modal({

            keyboard: false,
            backdrop: 'static'

        });

        return false;
    });

    $('#btn-addnewstmaswh').click(function () {

        $('#modal-frm_data_addnewstmaswh').modal({

            keyboard: false,
            backdrop: 'static'

        });

        return false;
    });


    fetch(stmas_get + '?item_code=' + citem['code']).then(function (response) {

        return response.json();

    }).then(function (result) {

        if (result.length > 0) {
            $.each(result.data, function (key, val) {

                //#Tab1 - information
                $('#information').find('#stmas_code').val(val['code']);
                $('#information').find('#stmas_name').val(val['name']);
                $('#information').find('#stmas_gnamechr').val(val['gnamechr']);
                $('#information').find('#stmas_code_a').val(val['code_a']);
                $('#information').find('#stmas_goem').val(val['gOem']);
                $('#information').find('#stmas_code_e').val(val['code_e']);
                $('#information').find('#stmas_type').val(val['TYPE']);
                $('#information').find('#stmas_code_c').val(val['code_c']);
                $('#information').find('#stmas_gused').val(val['GUSED']);
                $('#information').find('#stmas_code_d').val(val['code_d']);
                $('#information').find('#stmas_gmodel').val(val['gmodel']);
                $('#information').find('#stmas_code_b').val(val['code_b']);

                $('#information').find('#stmas_gbarcode').val(val['gbarcode']);
                $('#information').find('#stmas_spcodes').val(val['SPCODES']);

                $('#information').find('#stmas_uom').val(val['UOM']);
                $('#information').find('#stmas_codeoem').val(val['CodeOem']);
                $('#information').find('#stmas_gdimension').val(val['GDIMENSION']);

                $('#information').find('#stmas_cargeneration').val(val['Cargeneration']);

                $('#information').find('#stmas_matchinno').val(val['matchinno']);
                $('#information').find('#stmas_bodyno').val(val['bodyno']);
                $('#information').find('#stmas_carengine').val(val['CarEngine']);

                $('#information').find('#stmas_carbody').val(val['Carbody']);
                $('#information').find('#stmas_carbodycode').val(val['Carbodycode']);
                $('#information').find('#stmas_carfyear').val(val['CarFmyear']);

                $('#information').find('#stmas_cartoyear').val(val['CarToyear']);

                $('#information').find('#stmas_gdescrip').val(val['gdescript']);

                $('#information').find('#stmas_glocat').val(val['glocat']);
                $('#information').find('#stmas_gzone').val(val['gzone']);

                $('#information').find('#stmas_onpend').val($.addCommas(val['Onpend']));
                $('#information').find('#stmas_onhandv').val($.addCommas(val['Onhandv']));
                $('#information').find('#stmas_gamountv').val($.addCommas(val['gamountv']));


                //#Tab2 - Stock & Price
                //$('#stockprice').find('#stmas_onhandv').val($.addCommas(citem['Onhandv']));
                $('#stockprice').find('#stmas_onhandv').val($.addCommas(val['Onhandv']));
                $('#stockprice').find('#stmas_wh02').val($.addCommas(val['WH02']));
                $('#stockprice').find('#stmas_wh03').val($.addCommas(val['WH03']));
                $('#stockprice').find('#stmas_wh04').val($.addCommas(val['WH04']));
                $('#stockprice').find('#stmas_wh05').val($.addCommas(val['WH05']));
                $('#stockprice').find('#stmas_wh06').val($.addCommas(val['WH06']));
                $('#stockprice').find('#stmas_wh07').val($.addCommas(val['WH07']));
                $('#stockprice').find('#stmas_wh08').val($.addCommas(val['WH08']));
                $('#stockprice').find('#stmas_wh09').val($.addCommas(val['WH09']));
                $('#stockprice').find('#stmas_wh10').val($.addCommas(val['WH10']));
                $('#stockprice').find('#stmas_wh11').val($.addCommas(val['WH11']));
                $('#stockprice').find('#stmas_wh12').val($.addCommas(val['WH12']));

                var stmas_gpricea = parseFloat(val['gpriceA']).toFixed(2);
                var stmas_gpriceb = parseFloat(val['gpriceB']).toFixed(2);
                var stmas_gpricec = parseFloat(val['gpriceC']).toFixed(2);
                var stmas_gpriced = parseFloat(val['gpriceD']).toFixed(2);
                var stmas_gpricee = parseFloat(val['gpriceE']).toFixed(2);
                var stmas_gpricef = parseFloat(val['gpriceF']).toFixed(2);

                $('#stockprice').find('#stmas_gpricea').val($.addCommas(stmas_gpricea));
                $('#stockprice').find('#stmas_gpera').val(val['gperA']);
                if (val['gpriceA'] > 0 && val['AvgSalecost'] > 0) {
                    var gprofita = (((val['gpriceA'] - val['AvgSalecost']) / val['gpriceA']) * 100);
                    $('#stockprice').find('#gprofita').val(parseFloat(gprofita).toFixed(2) + '%');
                    $('#stockprice').find('#gprofita').css('text-align', 'right');
                } else {
                    $('#stockprice').find('#gprofita').val('-');
                    $('#stockprice').find('#gprofita').css('text-align', 'center');
                }

                $('#stockprice').find('#stmas_gpriceb').val($.addCommas(stmas_gpriceb));
                $('#stockprice').find('#stmas_gperb').val(val['gperB']);
                if (val['gpriceB'] > 0 && val['AvgSalecost'] > 0) {
                    var gprofitb = (((val['gpriceB'] - val['AvgSalecost']) / val['gpriceB']) * 100);
                    $('#stockprice').find('#gprofitb').val(parseFloat(gprofitb).toFixed(2) + '%');
                    $('#stockprice').find('#gprofitb').css('text-align', 'right');
                } else {
                    $('#stockprice').find('#gprofitb').val('-');
                    $('#stockprice').find('#gprofitb').css('text-align', 'center');
                }

                $('#stockprice').find('#stmas_gpricec').val($.addCommas(stmas_gpricec));
                $('#stockprice').find('#stmas_gperc').val(val['gperC']);
                if (val['gpriceC'] > 0 && val['AvgSalecost'] > 0) {
                    var gprofitc = (((val['gpriceC'] - val['AvgSalecost']) / val['gpriceC']) * 100);
                    $('#stockprice').find('#gprofitc').val(parseFloat(gprofitc).toFixed(2) + '%');
                    $('#stockprice').find('#gprofitc').css('text-align', 'right');
                } else {
                    $('#stockprice').find('#gprofitc').val('-');
                    $('#stockprice').find('#gprofitc').css('text-align', 'center');
                }

                $('#stockprice').find('#stmas_gpriced').val($.addCommas(stmas_gpriced));
                $('#stockprice').find('#stmas_gperd').val(val['gperD']);
                if (val['gpriceD'] > 0 && val['AvgSalecost'] > 0) {
                    var gprofitd = (((val['gpriceD'] - val['AvgSalecost']) / val['gpriceD']) * 100);
                    $('#stockprice').find('#gprofitd').val(parseFloat(gprofitd).toFixed(2) + '%');
                    $('#stockprice').find('#gprofitd').css('text-align', 'right');
                } else {
                    $('#stockprice').find('#gprofitd').val('-');
                    $('#stockprice').find('#gprofitd').css('text-align', 'center');
                }

                $('#stockprice').find('#stmas_gpricee').val($.addCommas(stmas_gpricee));
                $('#stockprice').find('#stmas_gpere').val(val['gperE']);
                if (val['gpriceE'] > 0 && val['AvgSalecost'] > 0) {
                    var gprofite = (((val['gpriceE'] - val['AvgSalecost']) / val['gpriceE']) * 100);
                    $('#stockprice').find('#gprofite').val(parseFloat(gprofite).toFixed(2) + '%');
                    $('#stockprice').find('#gprofite').css('text-align', 'right');
                } else {
                    $('#stockprice').find('#gprofite').val('-');
                    $('#stockprice').find('#gprofite').css('text-align', 'center');
                }

                $('#stockprice').find('#stmas_gpricef').val($.addCommas(stmas_gpricef));
                $('#stockprice').find('#stmas_gperf').val(val['gperF']);
                if (val['gpriceF'] > 0 && val['AvgSalecost'] > 0) {
                    var gprofitf = (((val['gpriceF'] - val['AvgSalecost']) / val['gpriceF']) * 100);
                    $('#stockprice').find('#gprofitf').val(parseFloat(gprofitf).toFixed(2) + '%');
                    $('#stockprice').find('#gprofitf').css('text-align', 'right');
                } else {
                    $('#stockprice').find('#gprofitf').val('-');
                    $('#stockprice').find('#gprofitf').css('text-align', 'center');
                }

                var stmas_gprice = parseFloat(val['gprice']).toFixed(2);
                var stmas_gpricepur = parseFloat(val['gpricepur']).toFixed(2);
                var stmas_salecost = parseFloat(val['Salecost']).toFixed(2);
                var stmas_gcost = parseFloat(val['gcost']).toFixed(2);
                var stmas_avgsalecost = parseFloat(val['AvgSalecost']).toFixed(2);
                var stmas_avgcost = parseFloat(val['Avgcost']).toFixed(2);
                var stmas_qtysmall = parseFloat(val['qtysmall']).toFixed(2);

                $('#stockprice').find('#stmas_gprice').val($.addCommas(stmas_gprice));
                $('#stockprice').find('#stmas_gpricepur').val($.addCommas(stmas_gpricepur));
                $('#stockprice').find('#stmas_salecost').val($.addCommas(stmas_salecost));
                $('#stockprice').find('#stmas_gcost').val($.addCommas(stmas_gcost));
                $('#stockprice').find('#stmas_avgsalecost').val($.addCommas(stmas_avgsalecost));
                $('#stockprice').find('#stmas_avgcost').val($.addCommas(stmas_avgcost));
                $('#stockprice').find('#stmas_qtysmall').val($.addCommas(stmas_qtysmall));
                $('#stockprice').find('#stmas_costtype').val(val['costtype']).trigger('change.select2');

                //$('#inventory1').find('#stmas_donotpur').val(val['donotpur']);
                //$('#inventory1').find('#stmas_donotsale').val(val['donotsale']);
                //$('#inventory1').find('#stmas_ginactive').val(val['ginactive']);
                //$('#inventory1').find('#stmas_custconfirm').val(val['custconfirm']);

                if (val['donotpur'] == '1' || val['donotpur'] == 1) {
                    $('#inventory1').find('#stmas_donotpur').prop("checked", true);
                } else {
                    $('#inventory1').find('#stmas_donotpur').prop("checked", false);
                }

                if (val['donotsale'] == '1' || val['donotsale'] == 1) {
                    $('#inventory1').find('#stmas_donotsale').prop("checked", true);
                } else {
                    $('#inventory1').find('#stmas_donotsale').prop("checked", false);
                }

                if (val['ginactive'] == '1' || val['ginactive'] == 1) {
                    $('#inventory1').find('#stmas_ginactive').prop("checked", true);
                } else {
                    $('#inventory1').find('#stmas_ginactive').prop("checked", false);
                }

                if (val['custconfirm'] == '1' || val['custconfirm'] == 1) {
                    $('#inventory1').find('#stmas_custconfirm').prop("checked", true);
                } else {
                    $('#inventory1').find('#stmas_custconfirm').prop("checked", false);
                }


                fetch(product_purplan_get + '?item_code=' + citem['code']).then(function (response) {

                    return response.json();

                }).then(function (result) {

                    console.log("product_purplan_get", result.data);

                    $.each(result.data, function (key, val) {

                        //#Tab1 - Information
                        $('#information').find('#prodpurplan_cartype').val(val['Cartype']).trigger('change.select2');
                        $('#information').find('#prodpurplan_carbrand').val(val['carbrand']).trigger('change.select2');
                        $('#information').find('#prodpurplan_carbrand_txt').html("[" + val['carbrand'] + "]");
                        $('#information').find('#prodpurplan_carmodel').val(val['carmodel']).trigger('change.select2');
                        $('#information').find('#prodpurplan_carmodel_txt').html("[" + val['carmodel'] + "]");
                        $('#information').find('#prodpurplan_usagepercar').val(val['UsagePerCar']);
                        $('#information').find('#prodpurplan_serviceyear').val(val['ServiceYear']);


                        //#Tab2 - Stock & Price
                        $('#stockprice').find('#prodplan_onhandvsk').val($.addCommas(val['Onhand_VSK']));
                        $('#stockprice').find('#prodplan_onhandvsf').val($.addCommas(val['Onhand_VSF']));
                        $('#stockprice').find('#prodplan_onhandlks').val($.addCommas(val['Onhand_LKS']));
                        $('#stockprice').find('#prodplan_onhandklh').val($.addCommas(val['Onhand_KLH']));
                        $('#stockprice').find('#prodplan_onhandllk').val($.addCommas(val['Onhand_LLK']));

                        $('#stockprice').find('#prodrepplan_vsm_stockstatus').val(val['StockStatus']).trigger('change.select2');
                        $('#stockprice').find('#prodrepplan_vsm_minqty').val(val['MinQty']);
                        $('#stockprice').find('#prodrepplan_vsm_maxqty').val(val['MaxQty']);

                        $('#stockprice').find('#prodrepplan_vsf_stockstatus').val(val['StockStatus_VSF']).trigger('change.select2');
                        $('#stockprice').find('#prodrepplan_vsf_minqty').val(val['MinQty_VSF']);
                        $('#stockprice').find('#prodrepplan_vsf_maxqty').val(val['MaxQty_VSF']);

                        $('#stockprice').find('#prodrepplan_lks_stockstatus').val(val['StockStatus_LKS']).trigger('change.select2');
                        $('#stockprice').find('#prodrepplan_lks_minqty').val(val['MinQty_LKS']);
                        $('#stockprice').find('#prodrepplan_lks_maxqty').val(val['MaxQty_LKS']);

                        $('#stockprice').find('#prodrepplan_klh_stockstatus').val(val['StockStatus_KLH']).trigger('change.select2');
                        $('#stockprice').find('#prodrepplan_klh_minqty').val(val['MinQty_KLH']);
                        $('#stockprice').find('#prodrepplan_klh_maxqty').val(val['MaxQty_KLH']);

                        $('#stockprice').find('#prodrepplan_llk_stockstatus').val(val['StockStatus_LLK']).trigger('change.select2');
                        $('#stockprice').find('#prodrepplan_llk_minqty').val(val['MinQty_LLK']);
                        $('#stockprice').find('#prodrepplan_llk_maxqty').val(val['MaxQty_LLK']);

                        $('#stockprice').find('#prodrepplan_nwm_stockstatus').val(val['StockStatus_NWM']).trigger('change.select2');
                        $('#stockprice').find('#prodrepplan_nwm_minqty').val(val['MinQty_NWM']);
                        $('#stockprice').find('#prodrepplan_nwm_maxqty').val(val['MaxQty_NWM']);

                        $('#stockprice').find('#prodpurplan_productsize').val($.addCommas(val['ProductSize']));
                        $('#stockprice').find('#prodpurplan_productqtyperpack').val($.addCommas(val['ProductQtyPerPack']));

                        var prodpurplan_maxdiscountpercent = parseFloat(val['MaxDiscountPercent']).toFixed(2);
                        var prodpurplan_minmarginpercent = parseFloat(val['MinMarginPercent']).toFixed(2);

                        $('#stockprice').find('#prodpurplan_maxdiscountpercent').val($.addCommas(prodpurplan_maxdiscountpercent));
                        $('#stockprice').find('#prodpurplan_minmarginpercent').val($.addCommas(prodpurplan_minmarginpercent));
                        $('#stockprice').find('#prodpurplan_vatdiscmargin').val(val['VAT_DiscMargin']).trigger('change.select2');


                        //#Tab3 - Inventory #1
                        $('#inventory1').find('#prodpurplan_stockstatus').val(val['StockStatus']).trigger('change.select2');
                        $('#inventory1').find('#prodpurplan_stockstatussuggest').text(val['StockStatus_Suggest']);
                        //$('#inventory1').find('#prodpurplan_stockstatusreviewdate').text(moment(val['StockStatusReviewDate'], 'MMMM DD YYYY').format('DD/MM/YYYY'));
                        $('#inventory1').find('#prodpurplan_stockstatusreviewdate').text(moment(val['StockStatusReviewDate'], 'YYYY/MM/DD').format('DD/MM/YYYY'));
                        $('#inventory1').find('#prodpurplan_stockstatuschangeuser').text(val['StockStatusChangeUser']);
                        //$('#inventory1').find('#prodpurplan_remarkbypm').val(val['RemarkByPM']);
                        $('#inventory1').find('#prodpurplan_remarkbypm').val(isEmpty(val['RemarkByPM']) ? '' : val['RemarkByPM']);
                        $('#inventory1').find('#prodpurplan_skufocus').val(val['SkuFocus']).trigger('change.select2');

                        $('#inventory1').find('#prodpurplan_invoicefrecodedesc').text(val['InvoiceFreCodeDesc']);
                        $('#inventory1').find('#prodpurplan_invoicefrecodedesc_suggest').text(val['InvoiceFreCodeDesc_Suggest']);
                        $('#inventory1').find('#prodpurplan_update_frecode').text(moment(val['update_frecode'], 'YYYY-MM-DD').format('DD/MM/YYYY'));

                        $('#inventory1').find('#prodpurplan_productdivision').text(val['Product_Division']);
                        $('#inventory1').find('#prodpurplan_maincategory').text(val['Main_Category']);
                        $('#inventory1').find('#prodpurplan_subcategory').text(val['Sub_Category']);

                        var itemclass_val = val['Item_Class'];
                        var itemclass = "";
                        if (itemclass_val == 'Aftermarket') {
                            itemclass = '<span class="badge badge-warning" style="width: 40px;">REM</span>';
                        } else if (itemclass_val == 'OEM') {
                            itemclass = '<span class="badge badge-info" style="width: 40px;">OEM</span>';
                        }
                        $('#inventory1').find('#prodpurplan_itemclass').html(itemclass);
                        $('#inventory1').find('#prodpurplan_itemaged').text(val['ItemAged']);
                        //$('#inventory1').find('#prodpurplan_itemclass').text(val['Item_Class']);
                        $('#inventory1').find('#prodpurplan_lifecycleflag').text(val['LifeCycleFlag']);
                        $('#inventory1').find('#prodpurplan_productactivity').text(val['ProductActivity']);
                        $('#inventory1').find('#prodpurplan_lifecycleaction').val(val['LifeCycleAction']).trigger('change.select2');
                        //$('#inventory1').find('#prodpurplan_lifecyclereviewdate').val(moment(val['LifeCycleReviewDate'], 'MM/DD/YYYY').format("DD/MM/YYYY"));
                        $('#inventory1').find('#prodpurplan_lifecyclereviewdate').val(val['LifeCycleReviewDate'] === null ? '' : moment(val['LifeCycleReviewDate'], 'MM/DD/YYYY').format('DD/MM/YYYY'));
                        $('#inventory1').find('#prodpurplan_certificationstatus').val('CertificationStatus').trigger('change.select2');
                        //if (val['CertificationStatus'] !== "" && val['CertificationStatus'] !== null) {
                        //    $('#inventory1').find('#prodpurplan_certificationstatus').val('CertificationStatus').trigger('change.select2');
                        //}
                        $('#inventory1').find('#prodpurplan_lockcode').val(val['LockCode']).trigger('change.select2');
                        $('#inventory1').find('#prodpurplan_supersessionbarcode').val(val['SupersessionBarcode']);
                        $('#inventory1').find('#prodpurplan_relationshiptype').val(val['RelationshipType']).trigger('change.select2');


                        //#Tab4 - Inventory #2
                        if (val['Planing_Type'] == 'Purchase') {
                            $('#inventory2').find('#prodpurplan_plantype_pur').prop("checked", true);
                        } else if (val['Planing_Type'] == 'Inhouse') {
                            $('#inventory2').find('#prodpurplan_plantype_inh').prop("checked", true);
                        } else {
                            $('#inventory2').find('.plantype').prop("checked", false);
                        }

                        if (val['Source_Type'] == 'Local') {
                            $('#inventory2').find('#prodpurplan_sourcetype_loc').prop("checked", true);
                        } else if (val['Source_Type'] == 'Import') {
                            $('#inventory2').find('#prodpurplan_sourcetype_imp').prop("checked", true);
                        } else {
                            $('#inventory2').find('.sourcetype').prop("checked", false);
                        }

                        $('#inventory2').find('#prodpurplan_manualsafetystock').val(val['ManualSafetyStockQty']);
                        $('#inventory2').find('#prodpurplan_moq').val(val['MOQ']);
                        $('#inventory2').find('#prodpurplan_leadtimesupplier').val(val['LeadTimeSupplier']);
                        $('#inventory2').find('#prodpurplan_leadtimeitem').val(val['LeadTimeItem']);
                        $('#inventory2').find('#prodpurplan_minqtyconst').val(val['MinQty']);
                        $('#inventory2').find('#prodpurplan_maxqtyconst').val(val['MaxQty']);
                        $('#inventory2').find('#prodpurplan_reorderqtydaily').text($.addCommas(val['ReOrderQtyDaily']));
                        $('#inventory2').find('#prodpurplan_reorderdate').text(moment(val['ReOderDate'], 'YYYY-MM-DD').format('DD/MM/YYYY'));
                        $('#inventory2').find('#prodpurplan_packcoderounding').text($.addCommas(val['PackCodeRounding']));
                        $('#inventory2').find('#prodpurplan_purchase').val(val['purchase']).trigger('change.select2');
                        $('#inventory2').find('#prodpurplan_purcon').val(val['PurchaseCondition']);

                        $('#inventory2').find('#prodpurplan_prefsuppliercode').val(val['PrefSupplierCode']).trigger('change.select2');
                        $('#inventory2').find('#prodpurplan_prefsupplierdisc').val(val['PrefSupplierDisc']);
                        $('#inventory2').find('#prodpurplan_discgroup').val(val['DiscGroup']).trigger('change.select2');
                        $('#inventory2').find('#prodpurplan_purdiscgroup').val(val['PurDiscGroup']).trigger('change.select2');
                        $('#inventory2').find('#prodpurplan_salediscgroup').val(val['SaleDiscGroup']).trigger('change.select2');

                        $('#inventory2').find('#prodpurplan_transferunit').val(val['Transfer_Unit']).trigger('change.select2');
                        $('#inventory2').find('#prodpurplan_minqtywarehouse').val(val['MinQtyWarehouse']);
                        $('#inventory2').find('#prodpurplan_maxqtywarehouse').val(val['MaxQtyWarehouse']);


                        //#Tab5 - Sales Info
                        var prodpurplan_countofcustomersdistnct_opt1 = val['CountOfCustomersDistinctOpt1'];
                        var prodpurplan_countofcustomersdistnct_pre3m = val['CountOfCustomersDistinct_Pre3M'];
                        var prodpurplan_countofcustomersdistnct_pre6m = val['CountOfCustomersDistinct_Pre6M'];
                        var prodpurplan_countofcustomersdistnct_pre12m = val['CountOfCustomersDistinct_Pre12M'];

                        $('#salesinfo').find('#prodpurplan_countofcustomersdistnct_opt1').text($.addCommas(prodpurplan_countofcustomersdistnct_opt1));
                        $('#salesinfo').find('#prodpurplan_countofcustomersdistnct_pre3m').text($.addCommas(prodpurplan_countofcustomersdistnct_pre3m));
                        $('#salesinfo').find('#prodpurplan_countofcustomersdistnct_pre6m').text($.addCommas(prodpurplan_countofcustomersdistnct_pre6m));
                        $('#salesinfo').find('#prodpurplan_countofcustomersdistnct_pre12m').text($.addCommas(prodpurplan_countofcustomersdistnct_pre12m));


                        var prodpurplan_countofinvoiceorderlines_vsm = val['CountOfInvoiceOrderLines_VSK'];
                        var prodpurplan_countofinvoiceorderlines_vsf = val['CountOfInvoiceOrderLines_VSK2'];
                        var prodpurplan_countofinvoiceorderlines_lks = val['CountOfInvoiceOrderLines_SP1'];
                        var prodpurplan_countofinvoiceorderlines_klh = val['CountOfInvoiceOrderLines_KLH'];
                        var prodpurplan_countofinvoiceorderlines_llk = val['CountOfInvoiceOrderLines_LLK'];
                        var prodpurplan_countinvoiceallbranch = val['CountInvoiceAllBranch'];

                        $('#salesinfo').find('#prodpurplan_countofinvoiceorderlines_vsm').text($.addCommas(prodpurplan_countofinvoiceorderlines_vsm));
                        $('#salesinfo').find('#prodpurplan_countofinvoiceorderlines_vsf').text($.addCommas(prodpurplan_countofinvoiceorderlines_vsf));
                        $('#salesinfo').find('#prodpurplan_countofinvoiceorderlines_lks').text($.addCommas(prodpurplan_countofinvoiceorderlines_lks));
                        $('#salesinfo').find('#prodpurplan_countofinvoiceorderlines_klh').text($.addCommas(prodpurplan_countofinvoiceorderlines_klh));
                        $('#salesinfo').find('#prodpurplan_countofinvoiceorderlines_llk').text($.addCommas(prodpurplan_countofinvoiceorderlines_llk));
                        $('#salesinfo').find('#prodpurplan_countinvoiceallbranch').text($.addCommas(prodpurplan_countinvoiceallbranch));


                        var prodpurplan_sumofsalesamount_vsm = parseFloat(val['SumOfSalesAmount_VSK']).toFixed(2);
                        var prodpurplan_sumofsalesamount_vsf = parseFloat(val['SumOfSalesAmount_VSK2']).toFixed(2);
                        var prodpurplan_sumofsalesamount_lks = parseFloat(val['SumOfSalesAmount_SP1']).toFixed(2);
                        var prodpurplan_sumofsalesamount_klh = parseFloat(val['SumOfSalesAmount_KLH']).toFixed(2);
                        var prodpurplan_sumofsalesamount_llk = parseFloat(val['SumOfSalesAmount_LLK']).toFixed(2);

                        $('#salesinfo').find('#prodpurplan_sumofsalesamount_vsm').text($.addCommas(prodpurplan_sumofsalesamount_vsm));
                        $('#salesinfo').find('#prodpurplan_sumofsalesamount_vsf').text($.addCommas(prodpurplan_sumofsalesamount_vsf));
                        $('#salesinfo').find('#prodpurplan_sumofsalesamount_lks').text($.addCommas(prodpurplan_sumofsalesamount_lks));
                        $('#salesinfo').find('#prodpurplan_sumofsalesamount_klh').text($.addCommas(prodpurplan_sumofsalesamount_klh));
                        $('#salesinfo').find('#prodpurplan_sumofsalesamount_llk').text($.addCommas(prodpurplan_sumofsalesamount_llk));




                        fetch(stockstatus_history_get + '?item_code=' + citem['code']).then(function (response) {

                            return response.json();

                        }).then(function (result) {

                            console.log("stockstatus_history_get", result.data);

                            if (result.length > 0) {

                                var count_row = 0;
                                var table_txt = "";

                                $('#frm_stockstatus_history').find('#tbl_stockstatus_history').append('<table class="table table-hover card card-primary" border="0" id="tbl_stockstatus_history_txt">' +
                                    '<tr style="text-align: center;height: 30px;">' +
                                    '<th style="width: 160px;">UPDATED BY</th>' +
                                    '<th style="width: 145px;">UPDATED DATE</th>' +
                                    '<th style="width: 110px;">STOCK STATUS<br>(Current)</th>' +
                                    '<th style="width: 110px;">Movements<br>(Current)</th>' +
                                    '<th style="width: 160px;">UPDATED BY<br>(Current)</th>' +
                                    '<th style="width: 145px;">UPDATED DATE<br>(Previous)</th>' +
                                    '<th style="width: 110px;">STOCK STATUS<br>(Previous)</th>' +
                                    '<th style="width: 110px;">Movements<br>(Previous)</th>' +
                                    '<th style="width: 400px;">REMARK BY PM <button aria-label="Close" class="close" data-dismiss="modal" type="button"><span aria-hidden="true">&times;</span></button>' +
                                    '</th></tr>');

                                $.each(result.data, function (key, val) {

                                    ++count_row;

                                    var stockstatus_val = val['stockstatus'];
                                    var stockstatus = "";
                                    if (stockstatus_val == 'BACKLOG') {
                                        stockstatus = '<span class="badge badge-secondary" style="width: 55px;">BACKLOG</span>';
                                    } else if (stockstatus_val == 'PLAN') {
                                        stockstatus = '<span class="badge badge-primary" style="width: 55px;">PLAN</span>';
                                    } else if (stockstatus_val == 'STOCK') {
                                        stockstatus = '<span class="badge badge-success" style="width: 55px;">STOCK</span>';
                                    } else if (stockstatus_val == 'SERVICE') {
                                        stockstatus = '<span class="badge badge-warning" style="width: 55px;">SERVICE</span>';
                                    }


                                    var stockstatus_pre_val = val['stockstatus_pre'];
                                    var stockstatus_pre = "";
                                    if (stockstatus_pre_val == 'BACKLOG') {
                                        stockstatus_pre = '<span class="badge badge-secondary" style="width: 55px;">BACKLOG</span>';
                                    } else if (stockstatus_pre_val == 'PLAN') {
                                        stockstatus_pre = '<span class="badge badge-primary" style="width: 55px;">PLAN</span>';
                                    } else if (stockstatus_pre_val == 'STOCK') {
                                        stockstatus_pre = '<span class="badge badge-success" style="width: 55px;">STOCK</span>';
                                    } else if (stockstatus_pre_val == 'SERVICE') {
                                        stockstatus_pre = '<span class="badge badge-warning" style="width: 55px;">SERVICE</span>';
                                    }

                                    var review_date = moment(val['review_date']).format('YYYY/MM/DD HH:mm');
                                    var remarkbypm = isEmpty(val['remarkbypm']) ? '' : val['remarkbypm'];

                                    $('#frm_stockstatus_history').find('#tbl_stockstatus_history_txt').append('<tr style="height: 30px;">' +
                                        '<td style="width: 200px;text-align: left;">&nbsp;&nbsp;' + val['change_user'] + '</td>' +
                                        '<td style="width: 145px;text-align: center;">' + moment(review_date).format('DD/MM/YYYY') + '</td>' +
                                        '<td style="width: 120px;text-align: center;">' + stockstatus + '</td>' +
                                        '<td style="width: 110px;text-align: center;">' + val['movement'] + '</td>' +
                                        '<td style="width: 200px;text-align: left;">&nbsp;&nbsp;' + (isEmpty(val['stockstatuschangeuser_pre']) ? '' : val['stockstatuschangeuser_pre']) + '</td>' +
                                        '<td style="width: 145px;text-align: center;">' + (isEmpty(val['stockstatusreviewdate_pre']) ? '' : moment(val['stockstatusreviewdate_pre']).format('DD/MM/YYYY')) + '</td>' +
                                        '<td style="width: 120px;text-align: center;">' + stockstatus_pre + '</td>' +
                                        '<td style="width: 110px;text-align: center;">' + (isEmpty(val['movement_pre']) ? '' : val['movement_pre']) + '</td>' +
                                        '<td style="width: 400px;text-align: left;">&nbsp;&nbsp;' + remarkbypm + '</td></tr>');

                                });

                                $('#frm_stockstatus_history').find('#tbl_stockstatus_history').append('</table>');


                            } else {

                                $('#frm_stockstatus_history').find('#tbl_stockstatus_history').append('<table class="table table-hover card card-primary" border="0" id="tbl_stockstatus_history_txt">' +
                                    '<tr style="text-align: center;height: 25px;"><th style="width: 160px;">UPDATED BY</th><th style="width: 145px;">UPDATED DATE</th><th style="width: 120px;">STOCK STATUS</th>' +
                                    '<th style="width: 587px;" > REMARK BY PM < button aria-label="Close" class="close" data-dismiss="modal" type="button"> <span aria-hidden="true">&times;</span></button ></th ></tr >' +
                                    '<tr><td colspan="4" style="text-align: center;">No items found</td></tr>' +
                                    '</table>');
                            }

                            fetch(goodprice_get + '?item_code=' + citem['code']).then(function (response) {

                                return response.json();

                            }).then(function (result) {

                                console.log("goodprice_get", result.data);

                                $('#stockprice').find('#tbl_goodprice').append('<tr><th class="tx-bold" style="width: 10%;">หน่วยนับ</th>' +
                                    '<th class="tx-bold" style="width: 5%;">จำนวน</th>' +
                                    '<th class="tx-bold" style="width: 10%;">ชื่อหน่วยนับ</th>' +
                                    '<th class="tx-bold" style="width: 10%;">ตัว x หน่วยย่อย</th>' +
                                    '<th class="tx-bold" style="width: 8%;">ราคาตั้งซื้อ</th>' +
                                    '<th class="tx-bold" style="width: 8%;">ราคาตั้งขาย</th>' +
                                    '<th class="tx-bold" style="width: 8%;">ราคา A</th>' +
                                    '<th class="tx-bold" style="width: 8%;">ราคา B</th>' +
                                    '<th class="tx-bold" style="width: 8%;">ราคา C</th>' +
                                    '<th class="tx-bold" style="width: 8%;">ราคา D</th>' +
                                    '<th class="tx-bold" style="width: 8%;">ราคา E</th>' +
                                    '<th class="tx-bold" style="width: 8%;">ราคา F</th></tr>');

                                if (result.length > 0) {

                                    $.each(result.data, function (key, val) {

                                        var stp_prqty = parseFloat(val['prqty']).toFixed(2);
                                        stp_prqty = $.addCommas(stp_prqty);
                                        var stp_qtysmalls = parseFloat(val['qtysmall']).toFixed(2);
                                        stp_qtysmalls = $.addCommas(stp_qtysmalls);
                                        var stp_gpricepur = parseFloat(val['gpricepur']).toFixed(2);
                                        stp_gpricepur = $.addCommas(stp_gpricepur);
                                        var stp_gprice = parseFloat(val['gprice']).toFixed(2);
                                        stp_gprice = $.addCommas(stp_gprice);
                                        var stp_gpriceA = parseFloat(val['gpriceA']).toFixed(2);
                                        stp_gpriceA = $.addCommas(stp_gpriceA);
                                        var stp_gpriceB = parseFloat(val['gpriceB']).toFixed(2);
                                        stp_gpriceB = $.addCommas(stp_gpriceB);
                                        var stp_gpriceC = parseFloat(val['gpriceC']).toFixed(2);
                                        stp_gpriceC = $.addCommas(stp_gpriceC);
                                        var stp_gpriceD = parseFloat(val['gpriceD']).toFixed(2);
                                        stp_gpriceD = $.addCommas(stp_gpriceD);
                                        var stp_gpriceE = parseFloat(val['gpriceE']).toFixed(2);
                                        stp_gpriceE = $.addCommas(stp_gpriceE);
                                        var stp_gpriceF = parseFloat(val['gpriceF']).toFixed(2);
                                        stp_gpriceF = $.addCommas(stp_gpriceF);

                                        $('#stockprice').find('#tbl_goodprice').append('<tr><th class="tx-normal tx-left pd-l-20-f" style="width: 10%;">' + val['goutput'] + '</th>' +
                                            '<th class="tx-normal" style="width: 5%;">' + stp_prqty + '</th>' +
                                            '<th class="tx-normal" style="width: 10%;">' + val['gunit'] + '</th>' +
                                            '<th class="tx-normal" style="width: 10%;">' + stp_qtysmalls + '</th>' +
                                            '<th class="tx-normal" style="width: 8%;">' + stp_gpricepur + '</th>' +
                                            '<th class="tx-normal" style="width: 8%;">' + stp_gprice + '</th>' +
                                            '<th class="tx-normal" style="width: 8%;">' + stp_gpriceA + '</th>' +
                                            '<th class="tx-normal" style="width: 8%;">' + stp_gpriceB + '</th>' +
                                            '<th class="tx-normal" style="width: 8%;">' + stp_gpriceC + '</th>' +
                                            '<th class="tx-normal" style="width: 8%;">' + stp_gpriceD + '</th>' +
                                            '<th class="tx-normal" style="width: 8%;">' + stp_gpriceE + '</th>' +
                                            '<th class="tx-normal" style="width: 8%;">' + stp_gpriceF + '</th></tr>');

                                    });
                                } else {
                                    $('#stockprice').find('#tbl_goodprice').append('<tr><td colspan="12"><label class="col-form-label tx-left tx-value">ไม่พบข้อมูลสินค้าหน่วยใหญ่</label></td ></tr>');
                                }

                                fetch(role_get + '?auth_username=' + prodpurplan_updatedby2).then(function (response) {

                                    return response.json();

                                }).then(function (result) {

                                    console.log("role_get", result.data);

                                    if (result.length > 0) {

                                        var role_lov = "";

                                        $.each(result.data, function (key, val) {

                                            //role_lov = val['auth_role'];

                                            if (val['auth_role'] == 'H') {
                                                if (val['parent_lov_id'] == 'text') {
                                                    $('#' + val['lov_type']).find('#' + val['lov_code']).html('<span class="badge badge-light" style="width: 75px;">Not Available</span>');
                                                } else {
                                                    $('#' + val['lov_type']).find('#' + val['lov_code']).prop('disabled', true).hide();
                                                }
                                            } else if (val['auth_role'] == 'V') {
                                                $('#' + val['lov_type']).find('#' + val['lov_code']).prop('disabled', true).show();
                                            } else if (val['auth_role'] == 'VU') {
                                                $('#' + val['lov_type']).find('#' + val['lov_code']).prop('disabled', false).show();
                                            }

                                        });

                                    }

                                    //fetch(product_replenishplan_klh_get + '?item_code=' + citem['code']).then(function (response) {
                                    //    return response.json();
                                    //}).then(function (result) {
                                    //    $.each(result.data, function (key, val) {
                                    //        $('#stockprice').find('#prodrepplan_klh_stockstatus').val(val['StockStatus']).trigger('change.select2');
                                    //        $('#stockprice').find('#prodrepplan_klh_minqty').val(val['MinQty']);
                                    //        $('#stockprice').find('#prodrepplan_klh_maxqty').val(val['MaxQty']);
                                    //    });
                                    //});

                                    setTimeout(function () {
                                        $.LoadingOverlay("hide");
                                    }, 900);

                                    fetch(grdate_get + '?item_code=' + citem['code']).then(function (response) {

                                        return response.json();

                                    }).then(function (result) {

                                        console.log("grdate_get", result.data);

                                        if (result.length > 0) {
                                            $.each(result.data, function (key, val) {

                                                var GRdateMin_txt = "";

                                                if (val['is_GRZ'] == 1 || val['is_GRZ'] == "1") {
                                                    GRdateMin_txt = " (ยอดยกมา)";
                                                }

                                                $('#inventory1').find('#vgrmindate_grmindate').text(isEmpty(val['GRdateMin']) ? '-' : moment(val['GRdateMin']).format('DD/MM/YYYY') + GRdateMin_txt);
                                                $('#inventory1').find('#vgrmaxdate_grmaxdate').text(isEmpty(val['GRdateMax']) ? '-' : moment(val['GRdateMax']).format('DD/MM/YYYY'));
                                            });
                                        }
                                    });

                                });

                            });
                        });
                    });
                });
            });
        } else if (result.length == 0) {
            $.LoadingOverlay("hide");
            $('#modal-frm_data').modal('hide');
            setTimeout(function () {
                toastr.error('ไม่พบข้อมูลรายการสินค้านี้ในตารางข้อมูลสินค้าหลัก');
            }, 100);
        }
    });

    $('#btn-export_goodprice').off('click').on('click', function (evt) {

        evt.preventDefault();

        $(this).on('click', function (evt) {
            evt.preventDefault();
        });

        window.location = connect_url + '/Export/ItemMaster_Goodprice_Get' + '?code=' + citem['code'];

        return false;

    });

};


$.Edit = async function (citem) {

    //console.log("edit - citem - code", citem);

    $('#btn-save_exit').html('Update').show();
    $('#btn-save_exit').removeClass('btn-danger').addClass('btn-primary');

    $('#btn-save_exit').click(function (e) {

        $.LoadingOverlay("show", {
            image: '',
            custom: customElement
        });

        //alert(prodpurplan_plantype);
        //alert(prodpurplan_sourcetype);

        //return false;

        //=> Tab1 - Information
        var prodpurplan_cartype = $('#information').find('#prodpurplan_cartype').val();
        var prodpurplan_usagepercar = $('#information').find('#prodpurplan_usagepercar').val();
        var prodpurplan_serviceyear = $('#information').find('#prodpurplan_serviceyear').val();
        var stmas_spcodes = $('#information').find('#stmas_spcodes').val();
        var stmas_codeoem = $('#information').find('#stmas_codeoem').val();
        var stmas_gdimension = $('#information').find('#stmas_gdimension').val();
        var prodpurplan_carbrand = $('#information').find('#prodpurplan_carbrand').val();
        var prodpurplan_carmodel = $('#information').find('#prodpurplan_carmodel').val();
        var stmas_cargeneration = $('#information').find('#stmas_cargeneration').val();
        var stmas_matchinno = $('#information').find('#stmas_matchinno').val();
        var stmas_bodyno = $('#information').find('#stmas_bodyno').val();
        var stmas_carengine = $('#information').find('#stmas_carengine').val();
        var stmas_carbody = $('#information').find('#stmas_carbody').val();
        var stmas_carbodycode = $('#information').find('#stmas_carbodycode').val();
        var stmas_carfyear = $('#information').find('#stmas_carfyear').val();
        var stmas_cartoyear = $('#information').find('#stmas_cartoyear').val();
        var stmas_gdescrip = $('#information').find('#stmas_gdescrip').val();



        //=> Tab2 - Stock Price
        var prodrepplan_vsf_stockstatus = $('#stockprice').find('#prodrepplan_vsf_stockstatus').val();
        var prodrepplan_vsf_minqty = $('#stockprice').find('#prodrepplan_vsf_minqty').val();
        var prodrepplan_vsf_maxqty = $('#stockprice').find('#prodrepplan_vsf_maxqty').val();

        var prodrepplan_lks_stockstatus = $('#stockprice').find('#prodrepplan_lks_stockstatus').val();
        var prodrepplan_lks_minqty = $('#stockprice').find('#prodrepplan_lks_minqty').val();
        var prodrepplan_lks_maxqty = $('#stockprice').find('#prodrepplan_lks_maxqty').val();

        var prodrepplan_klh_stockstatus = $('#stockprice').find('#prodrepplan_klh_stockstatus').val();
        var prodrepplan_klh_minqty = $('#stockprice').find('#prodrepplan_klh_minqty').val();
        var prodrepplan_klh_maxqty = $('#stockprice').find('#prodrepplan_klh_maxqty').val();

        var prodrepplan_llk_stockstatus = $('#stockprice').find('#prodrepplan_llk_stockstatus').val();
        var prodrepplan_llk_minqty = $('#stockprice').find('#prodrepplan_llk_minqty').val();
        var prodrepplan_llk_maxqty = $('#stockprice').find('#prodrepplan_llk_maxqty').val();

        var prodrepplan_nwm_stockstatus = $('#stockprice').find('#prodrepplan_nwm_stockstatus').val();
        var prodrepplan_nwm_minqty = $('#stockprice').find('#prodrepplan_nwm_minqty').val();
        var prodrepplan_nwm_maxqty = $('#stockprice').find('#prodrepplan_nwm_maxqty').val();

        var prodpurplan_productsize = $('#stockprice').find('#prodpurplan_productsize').val();
        var prodpurplan_productqtyperpack = $('#stockprice').find('#prodpurplan_productqtyperpack').val();
        var prodpurplan_maxdiscountpercent = $('#stockprice').find('#prodpurplan_maxdiscountpercent').val();
        var prodpurplan_minmarginpercent = $('#stockprice').find('#prodpurplan_minmarginpercent').val();
        var prodpurplan_vatdiscmargin = $('#stockprice').find('#prodpurplan_vatdiscmargin').val();


        //=> Tab3 - Inventory#1
        var prodpurplan_stockstatus = $('#inventory1').find('#prodpurplan_stockstatus').val();
        var prodpurplan_remarkbypm = $('#inventory1').find('#prodpurplan_remarkbypm').val();
        var prodpurplan_skufocus = $('#inventory1').find('#prodpurplan_skufocus').val();

        //console.log("stmas_donotpur_1", $('#inventory1').find('#stmas_donotpur').val());
        //console.log("stmas_donotsale_1", $('#inventory1').find('#stmas_donotsale').val());
        //console.log("stmas_ginactive_1", $('#inventory1').find('#stmas_ginactive').val());
        //console.log("stmas_custconfirm_1", $('#inventory1').find('#stmas_custconfirm').val());
        //if ($('#inventory1').find('#stmas_donotpur').val() == 'on') { var stmas_donotpur = 1; } else { var stmas_donotpur = 0; }
        //if ($('#inventory1').find('#stmas_donotsale').val() == 'on') { var stmas_donotsale = 1; } else { var stmas_donotsale = 0; }
        //if ($('#inventory1').find('#stmas_ginactive').val() == 'on') { var stmas_ginactive = 1; } else { var stmas_ginactive = 0; }
        //if ($('#inventory1').find('#stmas_custconfirm').val() == 'on') { var stmas_custconfirm = 1; } else { var stmas_custconfirm = 0; }

        if ($('#inventory1').find('#stmas_donotpur').is(':checked')) { var stmas_donotpur = 1; } else { var stmas_donotpur = 0; }
        if ($('#inventory1').find('#stmas_donotsale').is(':checked')) { var stmas_donotsale = 1; } else { var stmas_donotsale = 0; }
        if ($('#inventory1').find('#stmas_ginactive').is(':checked')) { var stmas_ginactive = 1; } else { var stmas_ginactive = 0; }
        if ($('#inventory1').find('#stmas_custconfirm').is(':checked')) { var stmas_custconfirm = 1; } else { var stmas_custconfirm = 0; }
        //console.log("stmas_donotpur_2", stmas_donotpur);
        //console.log("stmas_donotsale_2", stmas_donotsale);
        //console.log("stmas_ginactive_2", stmas_ginactive);
        //console.log("stmas_custconfirm_2", stmas_custconfirm);

        //var prodpurplan_lifecycleaction = $('#inventory1').find('#prodpurplan_lifecycleaction').val();
        var prodpurplan_lifecyclereviewdate = $('#inventory1').find('#prodpurplan_lifecyclereviewdate').val();
        //var prodpurplan_certificationstatus = $('#inventory1').find('#prodpurplan_certificationstatus').val();
        var prodpurplan_supersessionbarcode = $('#inventory1').find('#prodpurplan_supersessionbarcode').val();
        //var prodpurplan_relationshiptype = $('#inventory1').find('#prodpurplan_relationshiptype').val();
        //var prodpurplan_lockcode = $('#inventory1').find('#prodpurplan_lockcode').val();


        //=> Tab4 - Inventory#2
        //var prodpurplan_plantype = $('input[name=prodpurplan_plantype]:checked', '.plantype').val()
        ////var prodpurplan_plantype = $('#inventory2').find('.plantype:checked').val();
        //console.log("1.prodpurplan_plantype", prodpurplan_plantype);
        ////alert(prodpurplan_plantype);
        //if (prodpurplan_plantype !== "Purchase" && prodpurplan_plantype !== "Inhouse") {
        //    prodpurplan_plantype = "Purchase";
        //    console.log("-------1");
        //}

        //var prodpurplan_sourcetype = $('input[name=prodpurplan_sourcetype]:checked', '.sourcetype').val()
        ////var prodpurplan_sourcetype = $('#inventory2').find('.sourcetype:checked').val();
        //console.log("1.prodpurplan_sourcetype", prodpurplan_sourcetype);
        ////alert(prodpurplan_sourcetype);
        //if (prodpurplan_sourcetype !== "Local" && prodpurplan_sourcetype !== "Import") {
        //    prodpurplan_sourcetype = "Local";
        //    console.log("-------2");
        //}

        //console.log("2.prodpurplan_plantype", prodpurplan_plantype);
        //console.log("2.prodpurplan_sourcetype", prodpurplan_sourcetype);

        var prodpurplan_manualsafetystock = $('#inventory2').find('#prodpurplan_manualsafetystock').val();
        var prodpurplan_moq = $('#inventory2').find('#prodpurplan_moq').val();
        var prodpurplan_leadtimesupplier = $('#inventory2').find('#prodpurplan_leadtimesupplier').val();
        var prodpurplan_leadtimeitem = $('#inventory2').find('#prodpurplan_leadtimeitem').val();
        var prodpurplan_minqtyconst = $('#inventory2').find('#prodpurplan_minqtyconst').val();
        var prodpurplan_maxqtyconst = $('#inventory2').find('#prodpurplan_maxqtyconst').val();
        var prodpurplan_purchase = $('#inventory2').find('#prodpurplan_purchase').val();
        var prodpurplan_purcon = $('#inventory2').find('#prodpurplan_purcon').val();

        var prodpurplan_prefsuppliercode = $('#inventory2').find('#prodpurplan_prefsuppliercode').val();
        var prodpurplan_prefsupplierdisc = $('#inventory2').find('#prodpurplan_prefsupplierdisc').val();
        var prodpurplan_discgroup = $('#inventory2').find('#prodpurplan_discgroup').val();
        var prodpurplan_purdiscgroup = $('#inventory2').find('#prodpurplan_purdiscgroup').val();
        var prodpurplan_salediscgroup = $('#inventory2').find('#prodpurplan_salediscgroup').val();

        var prodpurplan_transferunit = $('#inventory2').find('#prodpurplan_transferunit').val();
        var prodpurplan_minqtywarehouse = $('#inventory2').find('#prodpurplan_minqtywarehouse').val();
        var prodpurplan_maxqtywarehouse = $('#inventory2').find('#prodpurplan_maxqtywarehouse').val();

        //console.log("before change");
        //$('.div_prodrepplan_stockstatus').find('.prodrepplan_stockstatus').on("change", function (e) {

        //    e.preventDefault();
        //    console.log("change");

        //});

        $('#frm_data').parsley().on('form:submit', function () {

            $('.btn-save_form').prop('disabled', true);

            var data = {
                'stmas_code': citem['code'],
                'prodpurplan_cartype': prodpurplan_cartype,
                'prodpurplan_usagepercar': prodpurplan_usagepercar,
                'prodpurplan_serviceyear': prodpurplan_serviceyear,
                'stmas_spcodes': stmas_spcodes,
                'stmas_codeoem': stmas_codeoem,
                'stmas_gdimension': stmas_gdimension,
                'prodpurplan_carbrand': prodpurplan_carbrand,
                'prodpurplan_carmodel': prodpurplan_carmodel,
                'stmas_cargeneration': stmas_cargeneration,
                'stmas_matchinno': stmas_matchinno,
                'stmas_bodyno': stmas_bodyno,
                'stmas_carengine': stmas_carengine,
                'stmas_carbody': stmas_carbody,
                'stmas_carbodycode': stmas_carbodycode,
                'stmas_carfyear': stmas_carfyear,
                'stmas_cartoyear': stmas_cartoyear,
                'stmas_gdescrip': stmas_gdescrip,
                'prodrepplan_vsf_stockstatus': prodrepplan_vsf_stockstatus,
                'prodrepplan_vsf_minqty': prodrepplan_vsf_minqty,
                'prodrepplan_vsf_maxqty': prodrepplan_vsf_maxqty,
                'prodrepplan_lks_stockstatus': isEmpty(prodrepplan_lks_stockstatus) ? '' : prodrepplan_lks_stockstatus,
                'prodrepplan_lks_minqty': isEmpty(prodrepplan_lks_minqty) ? 0 : prodrepplan_lks_minqty,
                'prodrepplan_lks_maxqty': isEmpty(prodrepplan_lks_maxqty) ? 0 : prodrepplan_lks_maxqty,
                'prodrepplan_klh_stockstatus': prodrepplan_klh_stockstatus,
                'prodrepplan_klh_minqty': prodrepplan_klh_minqty,
                'prodrepplan_klh_maxqty': prodrepplan_klh_maxqty,
                'prodrepplan_llk_stockstatus': prodrepplan_llk_stockstatus,
                'prodrepplan_llk_minqty': prodrepplan_llk_minqty,
                'prodrepplan_llk_maxqty': prodrepplan_llk_maxqty,
                'prodrepplan_nwm_stockstatus': prodrepplan_nwm_stockstatus,
                'prodrepplan_nwm_minqty': prodrepplan_nwm_minqty,
                'prodrepplan_nwm_maxqty': prodrepplan_nwm_maxqty,
                'prodpurplan_productsize': prodpurplan_productsize,
                'prodpurplan_productqtyperpack': prodpurplan_productqtyperpack,
                'prodpurplan_maxdiscountpercent': prodpurplan_maxdiscountpercent,
                'prodpurplan_minmarginpercent': prodpurplan_minmarginpercent,
                'prodpurplan_vatdiscmargin': prodpurplan_vatdiscmargin,
                'prodpurplan_stockstatus': prodpurplan_stockstatus,
                'prodpurplan_remarkbypm': prodpurplan_remarkbypm,
                'prodpurplan_skufocus': prodpurplan_skufocus,
                'stmas_donotpur': isEmpty(stmas_donotpur) ? 0 : stmas_donotpur,
                'stmas_donotsale': isEmpty(stmas_donotsale) ? 0 : stmas_donotsale,
                'stmas_ginactive': isEmpty(stmas_ginactive) ? 0 : stmas_ginactive,
                'stmas_custconfirm': isEmpty(stmas_custconfirm) ? 0 : stmas_custconfirm,
                //'prodpurplan_lifecycleaction': prodpurplan_lifecycleaction,
                'prodpurplan_lifecyclereviewdate': $.DateToDB(prodpurplan_lifecyclereviewdate),
                //'prodpurplan_certificationstatus': prodpurplan_certificationstatus,
                'prodpurplan_supersessionbarcode': prodpurplan_supersessionbarcode,
                //'prodpurplan_relationshiptype': prodpurplan_relationshiptype,
                //'prodpurplan_lockcode': prodpurplan_lockcode,
                //'prodpurplan_plantype': prodpurplan_plantype,
                //'prodpurplan_sourcetype': prodpurplan_sourcetype,
                'prodpurplan_plantype': $('#inventory2').find('#prodpurplan_plantype_pur').prop("checked") === true ? 'Purchase' : 'Inhouse',
                'prodpurplan_sourcetype': $('#inventory2').find('#prodpurplan_sourcetype_loc').prop("checked") === true ? 'Local' : 'Import',
                'prodpurplan_manualsafetystock': prodpurplan_manualsafetystock,
                'prodpurplan_moq': prodpurplan_moq,
                'prodpurplan_leadtimesupplier': prodpurplan_leadtimesupplier,
                'prodpurplan_leadtimeitem': prodpurplan_leadtimeitem,
                'prodpurplan_minqtyconst': isEmpty(prodpurplan_minqtyconst) ? 0 : prodpurplan_minqtyconst,
                'prodpurplan_maxqtyconst': isEmpty(prodpurplan_maxqtyconst) ? 0 : prodpurplan_maxqtyconst,
                'prodpurplan_purchase': prodpurplan_purchase,
                'prodpurplan_purcon': prodpurplan_purcon,
                'prodpurplan_prefsuppliercode': prodpurplan_prefsuppliercode,
                'prodpurplan_prefsupplierdisc': prodpurplan_prefsupplierdisc,
                'prodpurplan_discgroup': isEmpty(prodpurplan_discgroup) ? null : prodpurplan_discgroup,
                //'prodpurplan_discgroup': prodpurplan_discgroup,
                'prodpurplan_purdiscgroup': prodpurplan_purdiscgroup,
                'prodpurplan_salediscgroup': prodpurplan_salediscgroup,
                'prodpurplan_transferunit': prodpurplan_transferunit,
                'prodpurplan_minqtywarehouse': isEmpty(prodpurplan_minqtywarehouse) ? 0 : prodpurplan_minqtywarehouse,
                'prodpurplan_maxqtywarehouse': isEmpty(prodpurplan_maxqtywarehouse) ? 0 : prodpurplan_maxqtywarehouse,
                'prodpurplan_updatedby': prodpurplan_updatedby,
                'prodpurplan_updatedby2': prodpurplan_updatedby2,
            };

            var params = [];
            for (const i in data) {
                params.push(i + "=" + encodeURIComponent(data[i]));
            }

            fetch(itemmaster_update, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params.join("&"),
            }).then(data => {

                console.log("itemmaster_update", data);

                toastr.success('Save Successfully!', function () {

                    $.addLogEvent(citem['code'], 'VSM', 'edit', url_location, 'ok');

                    //oTable.destroy();
                    //$.List();

                    setTimeout(function () {

                        $('.btn-save_form').prop('disabled', false);
                        $("#frm_data").parsley().reset();
                        $('#modal-frm_data').modal('hide');

                    }, 900);

                });

            }).catch((error) => {
                console.error('Error:', error);
                $.addLogError(citem['code'], 'VSM', 'edit', url_location, 'error');
            });

            return false;

        });

        setTimeout(function () {
            $.LoadingOverlay("hide");
        }, 900);

    });

};


$.Delete = async function (citem) {

    $('#btn-save_exit').html('Delete').show();
    $('#btn-save_exit').removeClass('btn-primary').addClass('btn-danger');

    $('#btn-save_exit').click(function (e) {

        let submit_action = $(this).data('action');

        $('#frm_data').parsley().on('form:submit', function () {

            $('.btn-save_form').prop('disabled', true);

            let data_citem = {
                record_status: 'D',
                updated_by: "SYSTEM",
                updated_date: new Date()
            };

            fs.collection(collection).doc(citem['schedule_id']).update(data_citem).then(function () {

                toastr.options = {
                    "closeButton": false, // true/false
                    "debug": false, // true/false
                    "newestOnTop": false, // true/false
                    "progressBar": true, // true/false
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300", // in milliseconds
                    "hideDuration": "500", // in milliseconds
                    "timeOut": "900", // in milliseconds
                    "extendedTimeOut": "900", // in milliseconds
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };

                toastr.success('Save Successfully!', function () {

                    setTimeout(function () {

                        $('#modal-frm_data').modal('hide');
                        location.reload();

                    }, 900);

                });

            }).catch(function (error) {

                toastr.error(error, 'Error writing document');
                console.error("Error writing document: ", error);

            });

            return false;

        });

    });

};


$(document).ready(async function () {

    await $.init();

});


firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        //console.log(user);

    } else {

        window.location.assign('./login');

    }

});