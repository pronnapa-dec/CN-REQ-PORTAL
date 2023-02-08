'use strict';

let oTable;
let inventorycode_dataset = [];
let invfrecode_dataset = [];
let inventorycode_get = 'http://localhost:49705/api/InventoryCode_Get';
let invfrecode_get = 'http://localhost:49705/api/InvfreCode_Get';
//let stmas_search = 'http://192.168.1.247/intranet/acc-api/v1/stmas_search';
//let product_purplan_get = 'http://192.168.1.247/intranet/acc-api/v2/product_purplan_stock_factor_get';

let stmas_search = 'http://localhost:8081/vsk-portal-api//v2/stmas_search_V2';
let purplan_get = 'http://localhost:49705/api/PurPlan_Get';
let product_purplan_get = 'http://localhost:8081/vsk-portal-api/v3/product_purplan_stock_factor_get';

let lov_get = 'http://localhost:8081/vsk-portal-api/v1/itemmaster_lov_get';

let stockstatus_list = "";
let infrecode_list = "";
let lifecycleaction_list = "";
let lifecycleflag_list = "";
let lockcode_list = "";
let productactivity_list = "";
let relationshiptype_list = "";

$.init = function () {

    //$('#add1').find('#item_stockstatus').select2({ minimumResultsForSearch: -1 });
    //$('#add1').find('#item_stockstatus').select2();

    fetch(inventorycode_get).then(function (response) {
        return response.json();
    }).then(function (result) {
        $.each(result.data, function (key, val) {
            $('#invcode').append('<option value="' + val['invcode'] + '">' + val['invcode'] + '</option>');
        });
    });

    fetch(invfrecode_get).then(function (response) {
        return response.json();
    }).then(function (result) {
        $.each(result.data, function (key, val) {
            $('#invfrecode').append('<option value="' + val['invfrecode'] + '">' + val['invfrecode'] + '-' + val['description'] + '</option>');
        });
    });

    fetch(lov_get + '?lov_group=VSK_PUR').then(function (response) {
        return response.json();
    }).then(function (result) {
        console.log("lov_get", result.data);
        $.each(result.data, function (key, val) {
            if (val['lov_type'] == 'InventoryCode') {
                stockstatus_list += '<option value="' + val['lov_code'] + '">' + val['lov1'] + '</option>';
            } else if (val['lov_type'] == 'LifeCycleAction') {
                lifecycleaction_list += '<option value="' + val['lov_code'] + '">' + val['lov1'] + '</option>';
            } else if (val['lov_type'] == 'LifeCycleFlag') {
                lifecycleflag_list += '<option value="' + val['lov_code'] + '">' + val['lov1'] + '</option>';
            } else if (val['lov_type'] == 'LockCode') {
                lockcode_list += '<option value="' + val['lov_code'] + '">' + val['lov1'] + '</option>';
            } else if (val['lov_type'] == 'ProductActivity') {
                productactivity_list += '<option value="' + val['lov_code'] + '">' + val['lov1'] + '</option>';
            } else if (val['lov_type'] == 'RelationshipType') {
                relationshiptype_list += '<option value="' + val['lov_code'] + '">' + val['lov1'] + '</option>';
            }
            //else if (val['lov_type'] == 'InventoryFrequencyCode') {
            //    infrecode_list += '<option value="' + val['lov_code'] + '">' + val['lov1'] + '</option>';
            //} 
        });
        console.log("stockstatus_list", stockstatus_list);
        //console.log("infrecode_list", infrecode_list);
        console.log("lifecycleaction_list", lifecycleaction_list);
        console.log("lifecycleflag_list", lifecycleflag_list);
        console.log("lockcode_list", lockcode_list);
        console.log("productactivity_list", productactivity_list);
        console.log("relationshiptype_list", relationshiptype_list);

        $('#add1').find('#item_stockstatus').append(stockstatus_list);
        $('#add1').find('#item_lifecycleflag').append(lifecycleflag_list);
        $('#add1').find('#item_productactivity').append(productactivity_list);
        $('#add1').find('#item_lifecycleaction').append(lifecycleaction_list);
        $('#add1').find('#item_relationshiptype').append(relationshiptype_list);
        $('#add1').find('#item_lockcode').append(lockcode_list);
         
    });

    $.List();

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

    $('#frm_search').submit(async function (e) {

        e.preventDefault();

        let mode = 'search';

        await $("#global-loader").fadeIn("slow");

        await oTable.destroy();

        await $.List(mode);

    });

};

$.List = async function (mode) {

    console.log('Index function Start', new Date());

    let url = new URL(stmas_search);

    url.search = new URLSearchParams({
        item_code: $('#sitem_code').val() === '' ? '' : $('#sitem_code').val(),
        item_name: $('#sitem_name').val() === '' ? '' : $('#sitem_name').val(),
        item_CHRCODE: $('#sitem_CHRCODE').val() === '' ? '' : $('#sitem_CHRCODE').val(),
        item_SPCODES: $('#sitem_SPCODES').val() === '' ? '' : $('#sitem_SPCODES').val(),
        item_gbarcode: $('#sitem_gbarcode').val() === '' ? '' : $('#sitem_gbarcode').val(),
        mode: mode
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (mode === 'search') { $('#tbl-list').show(); } else { $('#tbl-list').hide(); }

        if (mode === 'search' && result.length === 0) {

            $('#tbl-list').hide();
            toastr.error('ไม่พบข้อมูลค้นหา !');
            $("#global-loader").fadeOut("slow");

        }

        //oTable.destroy();
        oTable = $('#tbl-list').DataTable({
            data: result.data,
            scrollX: true,
            scrollCollapse: true,
            autoWidth: true,
            paging: true,
            columns: [
                {
                    title: "Product Code",
                    data: "code",
                    width: "190px",
                },
                {
                    title: "Barcode",
                    data: "gbarcode",
                    width: "100px",

                },
                {
                    title: "ชื่อสินค้า Prod.Name",
                    data: "name",
                    width: "410px",

                },
                {
                    title: "SPCODES",
                    data: "SPCODES",

                },
                {
                    title: "CHRCODE",
                    data: "CHRCODE",
                },
                {
                    title: "StockStatus",
                    data: "Cartype",

                },
                {
                    title: "WH",
                    data: "glocat",
                },
                {
                    title: "AvgSalecost",
                    data: "AvgSalecost",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Avgcost",
                    data: "Avgcost",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "CHRCODE",
                    data: "CHRCODE",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "CarEngine",
                    data: "CarEngine",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "CarFyear",
                    data: "CarFyear",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "CarFyear_CarToyear",
                    data: "CarFyear_CarToyear",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "CarToyear",
                    data: "CarToyear",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Car_Type",
                    data: "Car_Type",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Carbody",
                    data: "Carbody",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Carbodycode",
                    data: "Carbodycode",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Carbrand",
                    data: "Carbrand",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Cargeneration",
                    data: "Cargeneration",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Carmodel",
                    data: "Carmodel",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Cartype",
                    data: "Cartype",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Category",
                    data: "Category",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "CodeOem",
                    data: "CodeOem",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "CountInvoiceAllBranch",
                    data: "CountInvoiceAllBranch",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "CountOfCustomersDistinctOpt1",
                    data: "CountOfCustomersDistinctOpt1",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "CountOfCustomersDistinct_Pre3M",
                    data: "CountOfCustomersDistinct_Pre3M",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "CountOfCustomersDistinct_Pre6M",
                    data: "CountOfCustomersDistinct_Pre6M",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "CountOfCustomersDistinct_Pre12M",
                    data: "CountOfCustomersDistinct_Pre12M",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "CountOfInvoiceOrderLines_KLH",
                    data: "CountOfInvoiceOrderLines_KLH",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "CountOfInvoiceOrderLines_LLK",
                    data: "CountOfInvoiceOrderLines_LLK",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "CountOfInvoiceOrderLines_SP1",
                    data: "CountOfInvoiceOrderLines_SP1",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "CountOfInvoiceOrderLines_VSK",
                    data: "CountOfInvoiceOrderLines_VSK",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "CountOfInvoiceOrderLines_VSK2",
                    data: "CountOfInvoiceOrderLines_VSK2",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "DefaultSupplierCode",
                    data: "DefaultSupplierCode",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "DefaultSupplierName",
                    data: "DefaultSupplierName",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "GDIMENSION",
                    data: "GDIMENSION",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "GUSED",
                    data: "GUSED",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Group",
                    data: "Group",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "InvoiceFreCode",
                    data: "InvoiceFreCode",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "InvoiceFreCodeDesc",
                    data: "InvoiceFreCodeDesc",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "InvoiceFreCodeDesc_Suggest",
                    data: "InvoiceFreCodeDesc_Suggest",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "ItemAged",
                    data: "ItemAged",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Item_Class",
                    data: "Item_Class",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "LastUpdateByPM",
                    data: "LastUpdateByPM",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "LeadTimeItem",
                    data: "LeadTimeItem",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "LeadTimeSupplier",
                    data: "LeadTimeSupplier",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "MOQ",
                    data: "MOQ",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Main_Category",
                    data: "Main_Category",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "ManualSafetyStockQty",
                    data: "ManualSafetyStockQty",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "MaxQtyWarehouse",
                    data: "MaxQtyWarehouse",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "MaxQty_D_Constant",
                    data: "MaxQty_D_Constant",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "MinQtyWarehouse",
                    data: "MinQtyWarehouse",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "MinQty_E_Constant",
                    data: "MinQty_E_Constant",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "MinStockByPM",
                    data: "MinStockByPM",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "OLDPARTS",
                    data: "OLDPARTS",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "OL_Ranking",
                    data: "OL_Ranking",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Onhandv",
                    data: "Onhandv",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Onpend",
                    data: "Onpend",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "PObranchPending_KLH",
                    data: "PObranchPending_KLH",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "PackCodeRounding",
                    data: "PackCodeRounding",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "PrefSupplierDisc",
                    data: "PrefSupplierDisc",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Product_Life_Cycle",
                    data: "Product_Life_Cycle",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Product_Positioning",
                    data: "Product_Positioning",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Product_division",
                    data: "Product_division",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "PurDiscGroup",
                    data: "PurDiscGroup",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "PurchaseCondition",
                    data: "PurchaseCondition",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "ReOderDate",
                    data: "ReOderDate",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "ReOrderQtyDaily",
                    data: "ReOrderQtyDaily",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "RemarkByPM",
                    data: "RemarkByPM",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "SaleFreqGrade",
                    data: "SaleFreqGrade",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Sale_Discount_Group",
                    data: "Sale_Discount_Group",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Salecost",
                    data: "Salecost",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Source_Type",
                    data: "Source_Type",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Status",
                    data: "Status",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "StockSettingProposal",
                    data: "StockSettingProposal",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "StockSettingProposalPhase",
                    data: "StockSettingProposalPhase",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "StockStatus",
                    data: "StockStatus",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "StockStatusChangeUser",
                    data: "StockStatusChangeUser",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "StockStatusReviewDate",
                    data: "StockStatusReviewDate",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Stock_Status_Suggest",
                    data: "Stock_Status_Suggest",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "StockingClass",
                    data: "StockingClass",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Sub_Category",
                    data: "Sub_Category",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Subcategory",
                    data: "Subcategory",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "SumOfSalesAmount_KLH",
                    data: "SumOfSalesAmount_KLH",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "SumOfSalesAmount_LLK",
                    data: "SumOfSalesAmount_LLK",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "SumOfSalesAmount_SP1",
                    data: "SumOfSalesAmount_SP1",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "SumOfSalesAmount_VSK",
                    data: "SumOfSalesAmount_VSK",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "SumOfSalesAmount_VSK2",
                    data: "SumOfSalesAmount_VSK2",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "TYPE",
                    data: "TYPE",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "Transfer_Unit",
                    data: "Transfer_Unit",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "UOM",
                    data: "UOM",
                    "visible": false,
                    "searchable": false

                },
                {
                    title: "UpdateMaxMin",
                    data: "UpdateMaxMin",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "apprice_apprice",
                    data: "apprice_apprice",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "apprice_apqty",
                    data: "apprice_apqty",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "bodyno",
                    data: "bodyno",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "code_a",
                    data: "code_a",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "code_b",
                    data: "code_b",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "code_c",
                    data: "code_c",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "code_d",
                    data: "code_d",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "code_e",
                    data: "code_e",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "codes",
                    data: "codes",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "costtype",
                    data: "costtype",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gOem",
                    data: "gOem",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gOem_New",
                    data: "gOem_New",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gamountv",
                    data: "gamountv",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gcondoth",
                    data: "gcondoth",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gcost",
                    data: "gcost",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gdescrip",
                    data: "gdescrip",
                    "visible": false,
                    "searchable": false
                },

                {
                    title: "gmodel",
                    data: "gmodel",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gnamechr",
                    data: "gnamechr",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "goodfree_gqty",
                    data: "goodfree_gqty",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "goodfree_greft",
                    data: "goodfree_greft",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "goodfree_gtype",
                    data: "goodfree_gtype",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "goodfree_name",
                    data: "goodfree_name",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "goodfree_named",
                    data: "goodfree_named",
                    "visible": false,
                    "searchable": false
                },
                //{
                //    title: "goodprice_goutput",
                //    data: "goodprice_goutput",
                //    "visible": false,
                //    "searchable": false
                //},
                //{
                //    title: "goodprice_gprice",
                //    data: "goodprice_gprice",
                //    "visible": false,
                //    "searchable": false
                //},
                //{
                //    title: "goodprice_gpriceA",
                //    data: "goodprice_gpriceA",
                //    "visible": false,
                //    "searchable": false
                //},
                //{
                //    title: "goodprice_gpriceB",
                //    data: "goodprice_gpriceB",
                //    "visible": false,
                //    "searchable": false
                //},
                //{
                //    title: "goodprice_gpriceC",
                //    data: "goodprice_gpriceC",
                //    "visible": false,
                //    "searchable": false
                //},
                //{
                //    title: "goodprice_gpriceD",
                //    data: "goodprice_gpriceD",
                //    "visible": false,
                //    "searchable": false
                //},
                //{
                //    title: "goodprice_gpriceE",
                //    data: "goodprice_gpriceE",
                //    "visible": false,
                //    "searchable": false
                //},
                //{
                //    title: "goodprice_gpriceF",
                //    data: "goodprice_gpriceF",
                //    "visible": false,
                //    "searchable": false
                //},
                {
                    title: "goodprice_gpricepur",
                    data: "goodprice_gpricepur",
                    "visible": false,
                    "searchable": false
                },
                //{
                //    title: "goodprice_gunit",
                //    data: "goodprice_gunit",
                //    "visible": false,
                //    "searchable": false
                //},
                //{
                //    title: "goodprice_prqty",
                //    data: "goodprice_prqty",
                //    "visible": false,
                //    "searchable": false
                //},
                //{
                //    title: "goodprice_purch",
                //    data: "goodprice_purch",
                //    "visible": false,
                //    "searchable": false
                //},
                //{
                //    title: "goodprice_qtysmall",
                //    data: "goodprice_qtysmall",
                //    "visible": false,
                //    "searchable": false
                //},
                {
                    title: "gperA",
                    data: "gperA",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gperB",
                    data: "gperB",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gperC",
                    data: "gperC",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gperD",
                    data: "gperD",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gperE",
                    data: "gperE",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gperF",
                    data: "gperF",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gprice",
                    data: "gprice",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gpriceA",
                    data: "gpriceA",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gpriceB",
                    data: "gpriceB",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gpriceC",
                    data: "gpriceC",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gpriceD",
                    data: "gpriceD",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gpriceE",
                    data: "gpriceE",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gpriceF",
                    data: "gpriceF",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gpricepur",
                    data: "gpricepur",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gpromotion_Fmdate",
                    data: "gpromotion_Fmdate",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gpromotion_gremark",
                    data: "gpromotion_gremark",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gpromotion_recnum",
                    data: "gpromotion_recnum",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gpromotion_todate",
                    data: "gpromotion_todate",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gremark",
                    data: "gremark",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "grtra_empcod",
                    data: "grtra_empcod",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "grtra_empname",
                    data: "grtra_empname",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "grtra_punumber",
                    data: "grtra_punumber",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "grtra_trndate",
                    data: "grtra_trndate",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "grtra_trnprnet",
                    data: "grtra_trnprnet",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "grtra_trnqty",
                    data: "grtra_trnqty",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gset",
                    data: "gset",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gvat",
                    data: "gvat",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "gzone",
                    data: "gzone",
                    "visible": false,
                    "searchable": false

                },
                {
                    title: "is_service",
                    data: "is_service",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "itemgroup",
                    data: "itemgroup",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "matchinno",
                    data: "matchinno",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "named",
                    data: "named",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "partcomp_exp_NAME",
                    data: "partcomp_exp_NAME",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "partcomp_exp_OLDPART",
                    data: "partcomp_exp_OLDPART",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "partcomp_exp_TYPE",
                    data: "partcomp_exp_TYPE",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "partcomp_exp_code",
                    data: "partcomp_exp_code",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "partcomp_exp_gmodel",
                    data: "partcomp_exp_gmodel",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "partcompare_NAME",
                    data: "partcompare_NAME",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "partcompare_OLDPART",
                    data: "partcompare_OLDPART",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "partcompare_TYPE",
                    data: "partcompare_TYPE",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "partcompare_gmodel",
                    data: "partcompare_gmodel",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "partcompare_greft",
                    data: "partcompare_greft",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "prodgroup",
                    data: "prodgroup",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "prodstatus_Ka",
                    data: "prodstatus_Ka",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "purchase",
                    data: "purchase",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "qtysmall",
                    data: "qtysmall",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "stmas_GVENDOR",
                    data: "stmas_GVENDOR",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "stmas_Onhandv",
                    data: "stmas_Onhandv",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "stmas_custconfirm",
                    data: "stmas_custconfirm",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "partcompare_greft",
                    data: "partcompare_greft",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "stmas_donotpur",
                    data: "stmas_donotpur",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "stmas_donotsale",
                    data: "stmas_donotsale",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "stmas_ginactive",
                    data: "stmas_ginactive",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "stmas_gvendorname",
                    data: "stmas_gvendorname",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "stmas_maxstock",
                    data: "stmas_maxstock",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "stmas_minstock",
                    data: "stmas_minstock",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "stmas_prodclass",
                    data: "stmas_prodclass",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "stmas_prodgroup",
                    data: "stmas_prodgroup",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "stmas_prodstatus",
                    data: "stmas_prodstatus",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "update_frecode",
                    data: "update_frecode",
                    "visible": false,
                    "searchable": false
                },
                {
                    title: "update_stockstatus",
                    data: "update_stockstatus",
                    "visible": false,
                    "searchable": false
                }

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

                            $('#information').find('input').prop("disabled", true);
                            $('#information').find('select').prop("disabled", true);
                            $('#information').find('#btn_duplicate').prop("disabled", true);
                            $('#detail').find('input').prop("disabled", true);
                            $('#detail').find('select').prop("disabled", true);
                            $('#detail').find('textarea').prop("disabled", true);
                            $('#price').find('input').prop("disabled", true);
                            $('#price').find('select').prop("disabled", true);
                            $('#price').find('#btn-save_price').prop("disabled", true);
                            $('#price').find('#btn-addnewqty').prop("disabled", true);
                            $('#stock').find('input').prop("disabled", true);
                            $('#stock').find('select').prop("disabled", true);
                            $('#stock').find('#btn-addnewstmaswh').prop("disabled", true);
                            $('#add1').find('input').prop("disabled", true);
                            $('#add1').find('select').prop("disabled", true);
                            $.Details(citem);

                        } else if (key === 'edit') {

                            $('#information').find('input').prop("disabled", true);
                            $('#information').find('select').prop("disabled", true);
                            $('#information').find('#btn_duplicate').prop("disabled", true);
                            $('#detail').find('input').prop("disabled", true);
                            $('#detail').find('select').prop("disabled", true);
                            $('#detail').find('textarea').prop("disabled", true);
                            $('#price').find('input').prop("disabled", true);
                            $('#price').find('select').prop("disabled", true);
                            $('#price').find('#btn-save_price').prop("disabled", true);
                            $('#price').find('#btn-addnewqty').prop("disabled", true);
                            $('#stock').find('input').prop("disabled", true);
                            $('#stock').find('select').prop("disabled", true);
                            $('#stock').find('#btn-addnewstmaswh').prop("disabled", true);
                            $('#add1').find('input').prop("disabled", false);
                            $('#add1').find('select').prop("disabled", false);
                            $.Details(citem);
                            $.Edit(citem);

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
                            $('#modal-frm_data').modal('hide');

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

                    }, 1000);

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

    console.log(citem);

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

    fetch(product_purplan_get + '?item_code=' + citem['code']).then(function (response) {

        return response.json();

    }).then(function (result) {

        console.log("result", result.data);

        $.each(result.data, function (key, val) {

            //#Tab1 - information
            $('#information').find('#item_prod_code').val(val['code']);
            $('#information').find('#item_prod_itemname').val(val['itemname']);
            $('#information').find('#item_barcode').val(val['barcode']);

            var item_uom_text = "<option value='" + citem['UOM'] + "' selected>" + citem['UOM'] + "</option>";
            $('#information').find('#item_uom').append(item_uom_text);

            var item_glocat_text = "<option value='" + citem['glocat'] + "' selected>" + citem['glocat'] + "</option>";
            $('#information').find('#item_glocat').append(item_glocat_text);

            var item_gzone_text = "<option value='" + citem['gzone'] + "' selected>" + citem['gzone'] + "</option>";
            $('#information').find('#item_gzone').append(item_gzone_text);

            $('#information').find('#item_c1').val(citem['gnamechr']);
            $('#information').find('#item_code1').val(citem['code_a']);

            $('#information').find('#item_c2').val(citem['gmodel']);
            $('#information').find('#item_code2').val(citem['code_b']);

            $('#information').find('#item_c3').val(citem['TYPE']);
            $('#information').find('#item_code3').val(citem['code_c']);

            $('#information').find('#item_c4').val(citem['GUSED']);
            $('#information').find('#item_code4').val(citem['code_d']);

            $('#information').find('#item_c5').val(citem['gOem']);
            $('#information').find('#item_code5').val(citem['code_e']);

            if (citem['gvat'] == '1' || citem['gvat'] == 1) {
                $('#information').find('#item_gvat_1').prop("checked", true);
            } else if (citem['gvat'] == '2' || citem['gvat'] == 2) {
                $('#information').find('#item_gvat_2').prop("checked", true);
            } else if (citem['gvat'] == '3' || citem['gvat'] == 3) {
                $('#information').find('#item_gvat_3').prop("checked", true);
            }

            $('#information').find('#item_onpend').val(citem['Onpend']);
            $('#information').find('#item_onhandv').val(citem['Onhandv']);
            $('#information').find('#item_gamountv').val(citem['gamountv']);

            //#Tab2 - detail
            $('#detail').find('#item_partno').val(citem['SPCODES']);
            $('#detail').find('#item_gremark').val(citem['gremark']);
            $('#detail').find('#item_codeoem').val(citem['CodeOem']);

            $('#detail').find('#item_engineno').val(citem['matchinno']);
            $('#detail').find('#item_car_cc').val(citem['bodyno']);
            $('#detail').find('#item_carbrand').val(citem['Carbrand']);

            $('#detail').find('#item_carmodel').val(citem['Carmodel']);
            $('#detail').find('#item_carfyear').val(citem['CarFyear']);
            $('#detail').find('#item_cartoyear').val(citem['CarToyear']);
            $('#detail').find('#item_carbodycode').val(citem['Carbodycode']);

            $('#detail').find('#item_gdimension').val(citem['GDIMENSION']);


            if (citem['named'] !== "" && citem['named'] !== null) {
                var item_named_text = "<option value='" + citem['named'] + "' selected>" + citem['named'] + "</option>";
                $('#detail').find('#item_named').append(item_named_text);
            }

            if (citem['itemgroup'] !== "" && citem['itemgroup'] !== null) {
                var item_itemgroup_text = "<option value='" + citem['itemgroup'] + "' selected>" + citem['itemgroup'] + "</option>";
                $('#detail').find('#item_itemgroup').append(item_itemgroup_text);
            }

            if (citem['Category'] !== "" && citem['Category'] !== null) {
                var item_category_text = "<option value='" + citem['Category'] + "' selected>" + citem['Category'] + "</option>";
                $('#detail').find('#item_category').append(item_category_text);
            }

            if (citem['Subcategory'] !== "" && citem['Subcategory'] !== null) {
                var item_subcategory_text = "<option value='" + citem['Subcategory'] + "' selected>" + citem['Subcategory'] + "</option>";
                $('#detail').find('#item_subcategory').append(item_subcategory_text);
            }

            if (citem['gcondoth'] !== "" && citem['gcondoth'] !== null) {
                var item_gcondoth_text = "<option value='" + citem['gcondoth'] + "' selected>" + citem['gcondoth'] + "</option>";
                $('#detail').find('#item_gcondoth').append(item_gcondoth_text);
            }

            if (citem['gset'] !== "" && citem['gset'] !== null) {
                var item_gset_text = "<option value='" + citem['gset'] + "' selected>" + citem['gset'] + "</option>";
                $('#detail').find('#item_gset').append(item_gset_text);
            }

            if (citem['gdescrip'] !== "" && citem['gdescrip'] !== null) {
                var item_gdescrip_text = "<option value='" + citem['gdescrip'] + "' selected>" + citem['gdescrip'] + "</option>";
                $('#detail').find('#item_gdescrip').append(item_gdescrip_text);
            }

            if (citem['stmas_prodgroup'] !== "" && citem['stmas_prodgroup'] !== null) {
                //var item_prodgroup_text = "<option value='" + citem['stmas_prodgroup'] + "' selected>" + citem['stmas_prodgroup'] + "</option>";
                //$('#detail').find('#item_prodgroup').append(item_prodgroup_text);
                $('#detail').find('#item_prodgroup').val(citem['stmas_prodgroup']);
            }

            if (citem['stmas_prodclass'] !== "" && citem['stmas_prodclass'] !== null) {
                //var item_prodclass_text = "<option value='" + citem['stmas_prodclass'] + "' selected>" + citem['stmas_prodclass'] + "</option>";
                //$('#detail').find('#item_prodclass').append(item_prodclass_text);
                $('#detail').find('#item_prodclass').val(citem['stmas_prodclass']);
            }

            if (citem['stmas_minstock'] !== "" && citem['stmas_minstock'] !== null) {
                //var item_minstock_text = "<option value='" + citem['stmas_minstock'] + "' selected>" + citem['stmas_minstock'] + "</option>";
                //$('#detail').find('#item_minstock').append(item_minstock_text);
                $('#detail').find('#item_minstock').val(citem['stmas_minstock']);
            }

            if (citem['stmas_maxstock'] !== "" && citem['stmas_maxstock'] !== null) {
                //var item_maxstock_text = "<option value='" + citem['stmas_maxstock'] + "' selected>" + citem['stmas_maxstock'] + "</option>";
                //$('#detail').find('#item_maxstock').append(item_maxstock_text);
                $('#detail').find('#item_maxstock').val(citem['stmas_maxstock']);
            }


            if (citem['stmas_donotpur'] !== "" && citem['stmas_donotpur'] !== null) {
                $('#detail').find('#donotpur').prop("checked", true);
            }

            if (citem['stmas_donotsale'] !== "" && citem['stmas_donotsale'] !== null) {
                $('#detail').find('#donotsale').prop("checked", true);
            }

            if (citem['stmas_ginactive'] !== "" && citem['stmas_ginactive'] !== null) {
                $('#detail').find('#inactive').prop("checked", true);
            }

            if (citem['stmas_custconfirm'] !== "" && citem['stmas_custconfirm'] !== null) {
                $('#detail').find('#custconfirm').prop("checked", true);
            }


            //#Tab3 - price
            $('#price').find('#item_gprice').val(citem['gprice']);
            $('#price').find('#item_gpricepur').val(citem['gpricepur']);

            $('#price').find('#item_gpricea').val(citem['gpriceA']);
            $('#price').find('#item_gpera').val(citem['gperA']);
            $('#price').find('#item_gpriceb').val(citem['gpriceB']);
            $('#price').find('#item_gperb').val(citem['gperB']);
            $('#price').find('#item_gpricec').val(citem['gpriceC']);
            $('#price').find('#item_gperc').val(citem['gperC']);
            $('#price').find('#item_gpriced').val(citem['gpriceD']);
            $('#price').find('#item_gperd').val(citem['gperD']);
            $('#price').find('#item_gpricee').val(citem['gpriceE']);
            $('#price').find('#item_gpere').val(citem['gperE']);
            $('#price').find('#item_gpricef').val(citem['gpriceF']);
            $('#price').find('#item_gperf').val(citem['gperF']);

            $('#price').find('#item_salecost').val(parseFloat(citem['Salecost']).toFixed(2));
            $('#price').find('#item_gcost').val(parseFloat(citem['gcost']).toFixed(2));
            $('#price').find('#item_avgsalecost').val(parseFloat(citem['AvgSalecost']).toFixed(2));
            $('#price').find('#item_avgcost').val(parseFloat(citem['Avgcost']).toFixed(2));
            $('#price').find('#item_qtysmall').val(citem['qtysmall']);
            $('#price').find('#item_costtype').val(citem['costtype']);

            if (citem['costtype'] == '1' || citem['costtype'] == 1) {
                $('#price').find('#item_costtype_1').prop("checked", true);
            } else if (citem['costtype'] == '2' || citem['costtype'] == 2) {
                $('#price').find('#item_costtype_2').prop("checked", true);
            }


            //#Tab4 - Stock
            $('#stock').find('#wh_st').val(citem['Onhandv']);
            $('#stock').find('#wh_eo').val(citem['WH02']);
            $('#stock').find('#wh_sp').val(citem['WH03']);
            $('#stock').find('#wh_z4').val(citem['WH04']);
            $('#stock').find('#wh_z5').val(citem['WH05']);
            $('#stock').find('#wh_z6').val(citem['WH06']);
            $('#stock').find('#wh_z7').val(citem['WH07']);
            $('#stock').find('#wh_z8').val(citem['WH08']);
            $('#stock').find('#wh_za').val(citem['WH09']);
            $('#stock').find('#wh_zb').val(citem['WH10']);
            $('#stock').find('#wh_zc').val(citem['WH11']);
            $('#stock').find('#wh_ls').val(citem['WH12']);


            //#Tab6 - Additions 1
            if (val['Planing_Type'] == 'Purchase') {
                $('#add1').find('#item_plantype_pur').prop("checked", true);
            } else if (val['Planing_Type'] == 'Inhouse') {
                $('#add1').find('#item_plantype_inh').prop("checked", true);
            }

            if (val['Source_Type'] == 'Local') {
                $('#add1').find('#item_sourcetype_loc').prop("checked", true);
            } else if (val['Source_Type'] == 'Import') {
                $('#add1').find('#item_sourcetype_imp').prop("checked", true);
            }


            $('#add1').find('#item_conmin').val(val['MinQty_E_Constant']);
            $('#add1').find('#item_conmax').val(val['MaxQty_D_Constant']);
            $('#add1').find('#item_moq').val(val['MOQ']);
            $('#add1').find('#item_purcon').val(val['PurchaseCondition']);

            $('#add1').find('#item_stocksettingproposal').val(val['StockSettingProposal']);
            $('#add1').find('#item_manualsafetystock').val(val['ManualSafetyStockQty']);
            $('#add1').find('#item_leadtimesupp').val(val['LeadTimeSupplier']);
            $('#add1').find('#item_leadtimeitem').val(val['LeadTimeItem']);
            $('#add1').find('#item_remarkbypm').val(val['RemarkByPM']);

            if (val['CountInvoiceAllBranch'] !== "" && val['CountInvoiceAllBranch'] !== null) {
                $('#add1').find('#total_inv').html(val['CountInvoiceAllBranch']);
            }

            if (val['CountOfCustomersDistinct_Pre3M'] !== "" && val['CountOfCustomersDistinct_Pre3M'] !== null) {
                $('#add1').find('#total_cust_pre3m').html(val['CountOfCustomersDistinct_Pre3M']);
            }

            if (val['CountOfCustomersDistinct_Pre12M'] !== "" && val['CountOfCustomersDistinct_Pre12M'] !== null) {
                $('#add1').find('#total_cust_pre12m').html(val['CountOfCustomersDistinct_Pre12M']);
            }


            //if (val['StockStatus'] !== "" && val['StockStatus'] !== null) {
            //    var item_stockstatus_text = "<option value='" + val['StockStatus'] + "' selected>" + val['StockStatus'] + "</option>";
            //    $('#add1').find('#item_stockstatus').append(item_stockstatus_text);
            //}
            $('#add1').find('#item_stockstatus').val(val['StockStatus']).trigger('change.select2');

            if (val['StockStatus_Suggest'] !== "" && val['StockStatus_Suggest'] !== null) {
                $('#add1').find('#item_StockStatussuggestion').html(val['StockStatus_Suggest']);
            }

            if (val['StockStatusReviewDate'] !== "" && val['StockStatusReviewDate'] !== null) {
                $('#add1').find('#item_StockStatusReviewDate').html(val['StockStatusReviewDate']);
            }

            if (val['StockStatusChangeUser'] !== "" && val['StockStatusChangeUser'] !== null) {
                $('#add1').find('#item_StockStatusChangeUser').html(val['StockStatusChangeUser']);
            }

            if (val['InvoiceFreCodeDesc'] !== "" && val['InvoiceFreCodeDesc'] !== null) {
                $('#add1').find('#item_invfrecodedesc').html(val['InvoiceFreCodeDesc']);
            }



            $('#add1').find('#item_skufocus').val(val['SkuFocus']);


            //if (val['ProductLifeCycle'] !== "" && val['ProductLifeCycle'] !== null) {
            //    var item_productlifecycle_text = "<option value='" + val['ProductLifeCycle'] + "' selected>" + val['ProductLifeCycle'] + "</option>";
            //    $('#add1').find('#item_productlifecycle').append(item_productlifecycle_text);
            //}
            $('#add1').find('#item_productlifecycle').val(val['ProductLifeCycle']);


            //if (val['LifeCycleFlag'] !== "" && val['LifeCycleFlag'] !== null) {
            //    var item_lifecycleflag_text = "<option value='" + val['LifeCycleFlag'] + "' selected>" + val['LifeCycleFlag'] + "</option>";
            //    $('#add1').find('#item_lifecycleflag').append(item_lifecycleflag_text);
            //}
            $('#add1').find('#item_lifecycleflag').val(val['LifeCycleFlag']).trigger('change.select2');


            //if (val['ProductActivity'] !== "" && val['ProductActivity'] !== null) {
            //    var item_productactivity_text = "<option value='" + val['ProductActivity'] + "' selected>" + val['ProductActivity'] + "</option>";
            //    $('#add1').find('#item_productactivity').append(item_productactivity_text);
            //}
            $('#add1').find('#item_productactivity').val(val['ProductActivity']).trigger('change.select2');



            //if (val['LifeCycleAction'] !== "" && val['LifeCycleAction'] !== null) {
            //    var item_lifecycleaction_text = "<option value='" + val['LifeCycleAction'] + "' selected>" + val['LifeCycleAction'] + "</option>";
            //    $('#add1').find('#item_lifecycleaction').append(item_lifecycleaction_text);
            //}
            $('#add1').find('#item_lifecycleaction').val(val['LifeCycleAction']).trigger('change.select2');


            //if (val['SupersessionBarcode'] !== "" && val['SupersessionBarcode'] !== null) {
            //    var item_superbarcode_text = "<option value='" + val['SupersessionBarcode'] + "' selected>" + val['SupersessionBarcode'] + "</option>";
            //    $('#add1').find('#item_superbarcode').append(item_superbarcode_text);
            //}
            $('#add1').find('#item_superbarcode').val(val['SupersessionBarcode']);


            if (val['RelationshipType'] !== "" && val['RelationshipType'] !== null) {
                var item_relationshiptype_text = "<option value='" + val['RelationshipType'] + "' selected>" + val['RelationshipType'] + "</option>";
                $('#add1').find('#item_relationshiptype').append(item_relationshiptype_text);
            }
            $('#add1').find('#item_relationshiptype').val(val['RelationshipType']).trigger('change.select2');



            if (val['LockCode'] !== "" && val['LockCode'] !== null) {
                var item_lockcode_text = "<option value='" + val['LockCode'] + "' selected>" + val['LockCode'] + "</option>";
                $('#add2').find('#item_lockcode').append(item_lockcode_text);
            }
            $('#add1').find('#item_lockcode').val(val['LockCode']).trigger('change.select2');

        });
    });

};

$.Edit = async function (citem) {

    //$('#invcode').prop('disabled', false);
    //$('#invfrecode').prop('disabled', false);

    //$('.plant').prop('disabled', false);
    //$('.sourcet').prop('disabled', false);

    //$('#suggest').prop('disabled', false);

    //$('#conmin').prop('disabled', false);
    //$('#conmax').prop('disabled', false);
    //$('#moq').prop('disabled', false);

    //$('#stockc').prop('disabled', false);
    //$('#olranking').prop('disabled', false);
    //$('#stocks').prop('disabled', false);

    //$('#safetystock').prop('disabled', false);
    //$('#ltsupp').prop('disabled', false);
    //$('#ltitem').prop('disabled', false);

    $('#btn-save_exit').html('Update').show();
    $('#btn-save_exit').removeClass('btn-danger').addClass('btn-primary');

    $('#btn-save_exit').click(function (e) {

        alert("555");

        var code = $('#txt_code').html();
        var fname = "ONGKARN (คุณโอม)";

        var plant = $('.plant:checked').val();
        if (plant !== "Purchase" && plant !== "Inhouse") {
            plant = null;
        }

        var sourcet = $('.sourcet:checked').val();
        if (sourcet !== "Local" && sourcet !== "Import") {
            sourcet = null;
        }

        var invcode = $('#invcode').val();
        // var purcon = $('#purcon').val();

        var purcon = '';

        var conmin = $('#conmin').val().replace(",", "");
        var conmax = $('#conmax').val().replace(",", "");
        var moq = $('#moq').val().replace(",", "");

        var stockc = $('#stockc').val();
        var olrank = $('#olranking').val();
        var stocks = $('#stocks').val();

        var safetystock = $('#safetystock').val().replace(",", "");
        var ltitem = $('#ltitem').val().replace(",", "");
        var ltsupp = $('#ltsupp').val().replace(",", "");

        var invfrecode = $('#invfrecode').val();
        var invfrecodedesc = $('#invfrecode option:selected').text();


        let submit_action = $(this).data('action');

        $('#frm_data').parsley().on('form:submit', function () {

            $('.btn-save_form').prop('disabled', true);

            var data = {
                'code': code,
                'fname': fname,
                'plant': plant,
                'sourcet': sourcet,
                'invcode': invcode,
                'purcon': purcon,
                'conmin': conmin,
                'conmax': conmax,
                'moq': moq,
                'stockc': stockc,
                'olrank': olrank,
                'stocks': stocks,
                'safetystock': safetystock,
                'ltitem': ltitem,
                'ltsupp': ltsupp,
                'invfrecode': invfrecode,
                'invfrecodedesc': invfrecodedesc
            };

            var params = [];
            for (const i in data) {
                params.push(i + "=" + encodeURIComponent(data[i]));
            }

            fetch('http://192.168.1.220:8080/PurchasePlan/pages/check/checkeditinventory.php', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params.join("&"),
            }).then(data => {

                toastr.success('Save Successfully!', function () {

                    oTable.destroy();
                    $.List();

                    setTimeout(function () {

                        $('.btn-save_form').prop('disabled', false);
                        $("#frm_data").parsley().reset();
                        $('#modal-frm_data').modal('hide');

                    }, 1000);

                });

            }).catch((error) => {
                console.error('Error:', error);
            });

            return false;

        });

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

                    }, 1000);

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

        console.log(user);

    } else {

        window.location.assign('./login');

    }

});