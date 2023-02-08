'use strict';

let fs = firebase.firestore();
let collection = 'mrp_opt_purchaseplan';
let oTable;
let inventorycode_dataset = [];
let invfrecode_dataset = [];
let purplan_get = 'http://localhost:49705/api/PurPlan_Get';
let inventorycode_get = 'http://localhost:49705/api/InventoryCode_Get';
let invfrecode_get = 'http://localhost:49705/api/InvfreCode_Get';

$.init = function () {

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

        oTable.destroy();

        $.List();

    });

};

$.List = async function () {

    console.log('Index function Start', new Date());

    // oTable = $('#tbl-list').DataTable();

    let url = new URL(purplan_get);

    url.search = new URLSearchParams({
        code: $('#s_product_code').val() === '' ? '0' : $('#s_product_code').val(),
        CHRCODE: $('#s_code_1_abb').val() === '' ? '0' : $('#s_code_1_abb').val(),
        spcodes: $('#s_part_no').val() === '' ? '0' : $('#s_part_no').val(),
        barcode: $('#s_barcode').val() === '' ? '0' : $('#s_barcode').val()
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        //oTable.destroy();
        oTable = $('#tbl-list').DataTable({
            data: result.data,
            scrollX: true,
            scrollCollapse: true,
            autoWidth: true,
            paging: true,
            columns: [
                {
                    title: "<span style='font-size:11px;'>code</span>",
                    data: "code",
                    width: "130px",
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                }, //0
                {
                    title: "<span style='font-size:11px;'>barcode</span>",
                    data: "barcode",
                    width: "20px",
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                }, //1
                {
                    title: "<span style='font-size:11px;'>Part Number</span>",
                    data: "spcodes",
                    width: "50px",
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                }, //2
                {
                    title: "<span style='font-size:11px;'>Code 1 (Abb.)</span>",
                    data: "CHRCODE",
                    width: "50px",
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                }, //3
                {
                    title: "<span style='font-size:11px;'>Product Name</span>",
                    data: "itemname",
                    width: "200px",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                }, //4
                {
                    title: "code1_gnamechr",
                    data: "code1_gnamechr",
                    visible: false
                }, //5
                {
                    title: "MinQty",
                    data: "MinQty",
                    visible: false
                }, //6
                {
                    title: "MaxQty",
                    data: "MaxQty",
                    visible: false
                }, //7
                {
                    title: "StockSettingProposal",
                    data: "StockSettingProposal",
                    visible: false
                }, //8
                {
                    title: "<span style='font-size:11px;'>Planing Type</span>",
                    data: "Planing_Type",
                    width: "40px",
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                }, //9
                {
                    title: "<span style='font-size:11px;'>Source Type</span>",
                    data: "Source_Type",
                    width: "40px",
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                }, //10
                {
                    title: "PurchaseCondition",
                    data: "PurchaseCondition",
                    visible: false
                }, //11
                {
                    title: "MOQ",
                    data: "MOQ",
                    visible: false
                }, //12
                {
                    title: "StockingClass",
                    data: "StockingClass",
                    visible: false
                }, //13
                {
                    title: "OL_Ranking",
                    data: "OL_Ranking",
                    visible: false
                }, //14
                {
                    title: "InvoiceFreCode_Suggest",
                    data: "InvoiceFreCode_Suggest",
                    visible: false
                }, //15
                {
                    title: "InvoiceFreCodeDesc_Suggest",
                    data: "InvoiceFreCodeDesc_Suggest",
                    visible: false
                }, //16
                {
                    title: "InvoiceFreCode",
                    data: "InvoiceFreCode",
                    visible: false
                }, //17
                {
                    title: "<span style='font-size:11px;'>Invoice<br/>Frequency<br/>Code</span>",
                    data: "InvoiceFreCodeDesc",
                    width: "100px",
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                }, //18
                {
                    title: "CountOfCustomersDistinct",
                    data: "CountOfCustomersDistinct",
                    visible: false
                }, //19
                {
                    title: "CountOfCustomersDistinctOpt1",
                    data: "CountOfCustomersDistinctOpt1",
                    visible: false
                }, //20
                {
                    title: "SumOfSalesAmount",
                    data: "SumOfSalesAmount",
                    visible: false
                }, //21
                {
                    title: "CountInvoiceAllBranch",
                    data: "CountInvoiceAllBranch",
                    visible: false
                }, //22
                {
                    title: "Team",
                    data: "Team",
                    visible: false
                }, //23
                {
                    title: "prodgroup",
                    data: "prodgroup",
                    visible: false
                }, //24
                {
                    title: "<span style='font-size:11px;'>Stock Status</span>",
                    data: "StockStatus",
                    width: "40px",
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                }, //25
                {
                    title: "StockStatus_Kfrank.",
                    data: "StockStatus_Kfrank",
                    visible: false
                }, //26
                {
                    title: "<span style='font-size:11px;'>Stock<br/>Status<br/>Suggest</span>",
                    data: "StockStatus_Suggest",
                    width: "40px",
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                }, //27
                {
                    title: "ItemAged",
                    data: "ItemAged",
                    visible: false
                }, //28
                {
                    title: "count_customer",
                    data: "count_customer",
                    visible: false
                }, //29
                {
                    title: "count_invoice",
                    data: "count_invoice",
                    visible: false

                }, //30
                {
                    title: "<span style='font-size:11px;'>Total<br>Customer</span>",
                    data: "CountOfCustomersDistinct_Pre12M",
                    width: "50px",
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                }, //31
                {
                    title: "<span style='font-size:11px;'>Manual<br>Safety<br>Stock</span>",
                    data: "ManualSafetyStockQty",
                    width: "50px",
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                }, //32
                {
                    title: "<span style='font-size:11px;'>Lead<br>Time<br>Item</span>",
                    data: "LeadTimeItem",
                    width: "50px",
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                }, //33
                {
                    title: "<span style='font-size:11px;'>Lead<br>Time<br>Supplier</span>",
                    data: "LeadTimeSupplier",
                    width: "50px",
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                }, //34
                {
                    title: "CountOfCustomersDistinct_Pre3M",
                    data: "CountOfCustomersDistinct_Pre3M",
                    visible: false
                }, //35
                {
                    title: "insert_date",
                    data: "insert_date",
                    visible: false
                }, //36
                {
                    title: "StockStatusReviewDate",
                    data: "StockStatusReviewDate",
                    visible: false
                }, //37
                {
                    title: "StockStatusChangeUser",
                    data: "StockStatusChangeUser",
                    visible: false
                }, //38
                {
                    title: "RemarkByPM",
                    data: "RemarkByPM",
                    visible: false
                } //39
            ],
            "order": [[37, "desc"]],
            "initComplete": function (settings, json) {
                $.contextMenu({
                    selector: '#tbl-list tbody tr',
                    callback: function (key, options) {

                        let data = oTable.row(this).data();
                        let citem = {
                            code: data['code'],
                            barcode: data['barcode'],
                            spcodes: data['spcodes'],
                            itemname: data['itemname'],
                            CHRCODE: data['CHRCODE'],
                            code1_gnamechr: data['code1_gnamechr'],
                            MinQty: data['MinQty'],
                            MaxQty: data['MaxQty'],
                            StockSettingProposal: data['StockSettingProposal'],
                            Planing_Type: data['Planing_Type'],
                            Source_Type: data['Source_Type'],
                            PurchaseCondition: data['PurchaseCondition'],
                            MOQ: data['MOQ'],
                            StockingClass: data['StockingClass'],
                            OL_Ranking: data['OL_Ranking'],
                            InvoiceFreCode_Suggest: data['InvoiceFreCode_Suggest'],
                            InvoiceFreCodeDesc_Suggest: data['InvoiceFreCodeDesc_Suggest'],
                            InvoiceFreCode: data['InvoiceFreCode'],
                            InvoiceFreCodeDesc: data['InvoiceFreCodeDesc'],
                            CountOfCustomersDistinct: data['CountOfCustomersDistinct'],
                            CountOfCustomersDistinctOpt1: data['CountOfCustomersDistinctOpt1'],
                            SumOfSalesAmount: data['SumOfSalesAmount'],
                            CountInvoiceAllBranch: data['CountInvoiceAllBranch'],
                            Team: data['Team'],
                            prodgroup: data['prodgroup'],
                            StockStatus: data['StockStatus'],
                            StockStatus_Kfrank: data['StockStatus_Kfrank'],
                            StockStatus_Suggest: data['StockStatus_Suggest'],
                            ItemAged: data['ItemAged'],
                            count_customer: data['count_customer'],
                            count_invoice: data['count_invoice'],
                            ManualSafetyStockQty: data['ManualSafetyStockQty'],
                            LeadTimeSupplier: data['LeadTimeSupplier'],
                            LeadTimeItem: data['LeadTimeItem'],
                            CountOfCustomersDistinct_Pre12M: data['CountOfCustomersDistinct_Pre12M'],
                            CountOfCustomersDistinct_Pre3M: data['CountOfCustomersDistinct_Pre3M'],
                            insert_date: data['insert_date'],
                            StockStatusReviewDate: data['StockStatusReviewDate'],
                            StockStatusChangeUser: data['StockStatusChangeUser'],
                            RemarkByPM: data['RemarkByPM'],

                        };

                        $('#modal-frm_data').modal({

                            keyboard: false,
                            backdrop: 'static'

                        });

                        if (key === 'view') {

                            $.Details(citem);

                        } else if (key === 'edit') {

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

    $('#txt_code').html(citem['code']);
    $('#txt_itemname').html(citem['itemname']);
    $('#txt_ItemAged').html(citem['ItemAged']);
    $('#txt_InvoiceFreCodeDesc').html(citem['InvoiceFreCodeDesc']);
    $('#txt_RemarkByPM').html(citem['RemarkByPM']);

    $('#txt_CountInvoiceAllBranch').html(citem['CountInvoiceAllBranch']);

    $('#txt_CountOfCustomersDistinct_Pre3M').html(citem['CountOfCustomersDistinct_Pre3M']);
    $('#txt_CountOfCustomersDistinct_Pre12M').html(citem['CountOfCustomersDistinct_Pre12M']);

    $('#txt_StockStatusReviewDate').html(citem['StockStatusReviewDate']);
    $('#txt_StockStatusChangeUser').html(citem['StockStatusChangeUser']);

    $('#invcode').val(citem['StockStatus']).prop('disabled', true);

    $('#invfrecode').val(citem['InvoiceFreCode']).prop('disabled', true);

    $('.plant').prop('disabled', true);
    $('.sourcet').prop('disabled', true);

    citem['Planing_Type'] === 'Purchase' ? $('.plant').eq(0).prop('checked', true) : $('.plant').eq(1).prop('checked', true);
    citem['Source_Type'] === 'Local' ? $('.sourcet').eq(0).prop('checked', true) : $('.sourcet').eq(1).prop('checked', true);

    $('#suggest').val(citem['StockStatus_Suggest']).prop('disabled', true);

    $('#conmin').val(citem['MinQty']).prop('disabled', true);
    $('#conmax').val(citem['MaxQty']).prop('disabled', true);
    $('#moq').val(citem['MOQ']).prop('disabled', true);

    $('#stockc').val(citem['StockingClass']).prop('disabled', true);
    $('#olranking').val(citem['OL_Ranking']).prop('disabled', true);
    $('#stocks').val(citem['StockSettingProposal']).prop('disabled', true);

    $('#safetystock').val(citem['ManualSafetyStockQty']).prop('disabled', true);
    $('#ltsupp').val(citem['LeadTimeSupplier']).prop('disabled', true);
    $('#ltitem').val(citem['LeadTimeItem']).prop('disabled', true);

};

$.Edit = async function (citem) {

    $('#invcode').prop('disabled', false);
    $('#invfrecode').prop('disabled', false);

    $('.plant').prop('disabled', false);
    $('.sourcet').prop('disabled', false);

    $('#suggest').prop('disabled', false);

    $('#conmin').prop('disabled', false);
    $('#conmax').prop('disabled', false);
    $('#moq').prop('disabled', false);

    $('#stockc').prop('disabled', false);
    $('#olranking').prop('disabled', false);
    $('#stocks').prop('disabled', false);

    $('#safetystock').prop('disabled', false);
    $('#ltsupp').prop('disabled', false);
    $('#ltitem').prop('disabled', false);

    $('#btn-save_exit').html('Update').show();
    $('#btn-save_exit').removeClass('btn-danger').addClass('btn-primary');

    $('#btn-save_exit').click(function (e) {

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