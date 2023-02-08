'use strict';

//const url_api = 'http://localhost:49705';
const url_api_new = 'http://localhost:49705';
//const url_api_new = 'http://192.168.1.247:8899/mrp-api';

const url_api_mrp = 'http://192.168.1.247:8082/mrp-api';
const connect_url = 'http://192.168.1.247/intranet/acc-api';

const product_purplan_get = url_api_mrp + '/v1/MRP_ItemMaster_Get';
const url_mrp_itemsetup_get = url_api_mrp + '/v1/MRP_ItemSetup_Get';
const url_mrp_itemMaster_update = url_api_mrp + '/v1/MRP_ItemMaster_Update'
const url_mrp_itemMaster_vsk_sync = url_api_mrp + '/v1/MRP_ItemMaster_VSK_Sync'

const url_mrp_itemMaster_List = url_api_new + '/api/MRP_Item_Setup_List'
const url_mrp_itemsetup_Import = url_api_new + '/api/MRP_Item_Setup_Import'
const url_mrp_itemsetup_Verify = url_api_new + '/api/MRP_Item_Setup_Verify'
const url_mrp_itemsetup_Upload = url_api_new + '/api/MRP_Item_Setup_Upload'
const url_mrp_itemsetup_Refresh_All = url_api_new + '/api/MRP_Item_Setup_Refresh_All'

const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const user_id = objProfile[0]['username'];
//const urlParams = new URLSearchParams(queryString);

let fs = firebase.firestore();
let collection = 'mrp_opt_itemsetup';
let oTable;
let table_list, table_import;
let item_data = [];
let destination_site, source_site;
let genid = $.uuid();
let customElement = $("<div>", {
    "css": {
        "border": "2px solid",
        "font-size": "14px",
        "text-align": "center",
        "padding": '7px'

    },
    "text": 'Please Wait...'
});

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {


    } else {

        window.location.assign('./login');

    }

});

$(document).ready(async function () {

    await $.init();

    //  console.log($.MRP_MINMAX_MAIN(3, 6, 0, 0, 4));

});

$(document).on('click', '.btn_downloadtemplate', function () {

    location.href = 'http://192.168.1.247:8099/uploads/import_mrp_itemsetup_rev3.xlsx';

});

$.init = async function () {

    console.log('genid', genid);

    source_site = $('#search_source_site_code').val().substring(0, 3) == '201' ? 'VSM' : ''

    $('#search_destination_site_code').off('change').on('change', function (e) {

        e.preventDefault();

        $('#btn-refresh-all').removeClass('d-none')

        let b_data = $(this).val();

        destination_site = $(this).val();

        //if (b_data.substring(0, 3) == '201' || b_data.substring(0, 3) == '202') {
        //    destination_site = 'VSK'
        //} else if (b_data.substring(0, 3) == '211') {
        //    destination_site = 'LKS'
        //} else if (b_data.substring(0, 3) == '212') {
        //    destination_site = 'KLH'
        //} else if (b_data.substring(0, 3) == '213') {
        //    destination_site = 'LLK'
        //} else if (b_data.substring(0, 3) == '214') {
        //    destination_site = 'NWM'
        //}

    });

    $('.btn-clear').off('click').on('click', function (e) {

        e.preventDefault();

        let data_clear = $(this).attr('data-clear')

        if (data_clear == 'search_itemmaster') {
            $("#search_itemmaster option").remove();
            $("#search_itemmaster").append("<option value=''>--- Select Search Code, Barcode, SPcode, Name ---</option>");
        } else if (data_clear == 'search_item_code1_abb') {
            $("#search_item_code1_abb option").remove();
            $("#search_item_code1_abb").append("<option value=''>--- Select Code 1 ---</option>");
        } else if (data_clear == 'search_item_code2') {
            $("#search_item_code2 option").remove();
            $("#search_item_code2").append("<option value=''>--- Select Code 2 ---</option>");
        } else if (data_clear == 'search_item_code3') {
            $("#search_item_code3 option").remove();
            $("#search_item_code3").append("<option value=''>--- Select Code 3 ---</option>");
        } else if (data_clear == 'search_item_code4') {
            $("#search_item_code4 option").remove();
            $("#search_item_code4").append("<option value=''>--- Select Code 4 ---</option>");
        } else if (data_clear == 'search_item_code5') {
            $("#search_item_code5 option").remove();
            $("#search_item_code5").append("<option value=''>--- Select Code 5 ---</option>");
        }

    })

    $('#btn-search').on('click', async function (e) {

        e.preventDefault();

        await $.List();

    });

    $('#modal-import').off('shown.bs.modal').on('shown.bs.modal', async function (e) {

        e.preventDefault();


    });

    $('#modal-import').off('hidden.bs.modal').on('hidden.bs.modal', async function (e) {

        e.preventDefault();

        await setTimeout(function () {

            location.reload();

            //$('#customFile').val('');
            //$('.counter').html('0');
            //$('#show_table_import').addClass('d-none')
            //$('#btn-upload').prop('disabled',true)

        }, 100);

    });

    $('#customFile').on('change', function (e) {

        e.preventDefault();

        var path = $(this).val();
        var fileName = path.replace(/^.*\\/, "");
        $(this).next('.custom-file-label').html(fileName);

        if ($(this).val() != '') {

            $('.modal-body').LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            $.Import();

        }

    });

    $('#btn-upload').off('click').on('click', function (e) {

        e.preventDefault();

        //$(this).prop('disabled',true)
        swal({
            title: "คุณแน่ใจหรือไม่",
            text: "ที่จะทำการอัพเดตข้อมูลนี้",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "ใช่, ยันยืน",
            cancelButtonText: "ไม่, ยกเลิก",
            cancelButtonColor: '#d33',
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {

                if (isConfirm) {

                    $.LoadingOverlay("show", {
                        image: '',
                        custom: customElement
                    });

                    $.Upload();

                } else {

                    swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                }

            });


    })

    $('#btn-refresh-all').off('click').on('click', function (e) {

        e.preventDefault();

        swal({
            title: "คุณแน่ใจหรือไม่",
            text: "ที่จะทำการอัพเดตข้อมูลสาขา " + destination_site ,
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "ใช่, ยันยืน",
            cancelButtonText: "ไม่, ยกเลิก",
            cancelButtonColor: '#d33',
            closeOnConfirm: false,
            closeOnCancel: false,
            showLoaderOnConfirm: true
        },
            function (isConfirm) {

                if (isConfirm) {

                    let url = new URL(url_mrp_itemsetup_Refresh_All);

                    url.search = new URLSearchParams({
                        BRANCH: destination_site,
                    });

                    fetch(url).then(function (response) {
                        return response.json();
                    }).then(function (result) {

                        if (result.status === 'Error') {

                            toastr.error('Oops! An Error Occurred');

                        } else {

                            swal({
                                title: "สำเร็จ!",
                                text: "ทำรายการสำเร็จ",
                                type: 'success',
                                timer: 2000,
                                showConfirmButton: false
                            });

                        }

                        $.List();

                        $.LoadingOverlay("hide");

                    });

                } else {

                    swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                }

            });

    })

    $('#report-mrp_branch').attr("href", "http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_MRP_GET&rs:Command=Render")
    $('#report-mr_data').attr("href", "http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_MRP_MRDATA_GET&rs:Command=Render")

    await $.List();
    await $.Master_Get();

    await $('#frm_search').find('#search_source_site_code').val('201 : VSK - Minburi');

    await $('#btn-item_create').click(async function (e) {

        e.preventDefault();

        $.LoadingOverlay("show", {
            image: '',
            custom: customElement
        });

        $('#modal-frm_data').on('shown.bs.modal', async function () {

            await $.Create();
            await setTimeout(function () {
                $.LoadingOverlay("hide");
            }, 300);

        })

    });

    await $('#modal-frm_data').on('hidden.bs.modal', function () {

        $('#frm_data').find('input').val('');
        $('#frm_data').find('#item_barcode').prop('disabled', true);
        $('#frm_data').find('select').val('').trigger('change.select2');

        $("#frm_data").parsley().reset();

    });

    await $('#btn-refresh').off('click').on('click', function (e) {

        e.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: "Want to Synchronize from VSM Data ?!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Synchronize!'
        }).then((result) => {

            if (result.isConfirmed) {

                $.LoadingOverlay("show", {
                    image: '',
                    custom: customElement
                });

                fetch(url_mrp_itemMaster_vsk_sync).then(function (response) {
                    return response.json();
                }).then(function (result) {
                    $.LoadingOverlay("hide")
                });
            }

        })

    })

};

$.Create = async function () {

    $('.btn-save_form').show();
    $('.btn-save_form').prop('disabled', false);
    $('#btn-save_exit').html('Save');
    $('#btn-save_exit').removeClass('btn-danger').addClass('btn-primary');

    $.MRP_ItemMaster_Search();

    $('#frm_data').find('#lead_time').val('3');

    $('.btn-save_form').click(function (e) {

        let submit_action = $(this).data('action');

        $('#frm_data').parsley().on('form:submit', function () {

            $('.btn-save_form').prop('disabled', true);

            // Insert to firebase
            fs.collection(collection).doc(item_data.trand_id).set(item_data).then(function () {

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

                        //oTable.destroy();
                        $.List();

                        $("#frm_data").parsley().reset();

                        item_data = [];

                        if (submit_action === "save_exit") {

                            $('.btn-save_form').prop('disabled', false);
                            $('#modal-frm_data').modal('hide');

                        } else if (submit_action === "save_new") {


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

    console.log('Detail citem', citem)

    $('#btn-save_exit').addClass('d-none');

    await $('#modal-frm_data').modal({

        keyboard: false,
        backdrop: 'static'

    });

    $('#frm_data').find('#source_site_code').val(citem['Source_Site']).prop('disabled', true);
    $('#frm_data').find('#destination_site_code').val(citem['Destination_Site']).prop('disabled', true);
    $('#frm_data').find('#item_barcode').append('<option value="' + citem['Barcode'] + '" selected>' + citem['Barcode'] + '-' + citem['Item_Name'] + '(' + citem['Spcodes'] + ')' + '</option>');
    $('#frm_data').find('#PackCodeRounding').val(citem['Pack_Code_Rounding']).prop('disabled', true);
    $('#frm_data').find('#PackCodeRounding').val(citem['Pack_Code_Rounding']).prop('disabled', true);
    $('#frm_data').find('#StockStatus').val(citem['Source_Site_Stock_Status']).prop('disabled', true);

    $('#frm_data').find('#Onhand').val(citem['Onhand_KLH']).prop('disabled', true);
    $('#frm_data').find('#item_pending_po').val(citem['item_pending_po']).prop('disabled', true);
    $('#frm_data').find('#lead_time').val(citem['LeadTimeItem']).prop('disabled', true);
    $('#frm_data').find('#ManualSafetyStockQty').val(citem['ManualSafetyStockQty']).prop('disabled', true);


    if (citem['Destination_Site'] === 'klh') {

        $('#frm_data').find('#item_status_site_setting').val(citem['Source_Site_Stock_Status']).prop('disabled', true);
        $('#frm_data').find('#MinQty').val(citem['MIN']).prop('disabled', true);
        $('#frm_data').find('#MaxQty').val(citem['MAX']).prop('disabled', true);
        $('#frm_data').find('#item_result_final').val($.MRP_MINMAX_MAIN(citem['MinQty_KLH'], citem['MaxQty_KLH'], citem['Onhand_KLH'], citem['item_pending_po'], citem['PackCodeRounding'])).prop('disabled', true);
        $('#frm_data').find('#item_goodsalesflag').val(citem['GoodSellerFlag_KLH']).prop('disabled', true);

    } else if (citem['Destination_Site'] === 'llk') {

        $('#frm_data').find('#item_status_site_setting').val(citem['Source_Site_Stock_Status']).prop('disabled', true);
        $('#frm_data').find('#MinQty').val(citem['MIN']).prop('disabled', true);
        $('#frm_data').find('#MaxQty').val(citem['MAX']).prop('disabled', true);
        $('#frm_data').find('#item_result_final').val($.MRP_MINMAX_MAIN(citem['MinQty_LLK'], citem['MaxQty_LLK'], citem['Onhand_LLK'], citem['item_pending_po'], citem['PackCodeRounding'])).prop('disabled', true);
        $('#frm_data').find('#item_goodsalesflag').val(citem['GoodSellerFlag_LLK']).prop('disabled', true);

    } else if (citem['Destination_Site'] === 'nwm') {

        $('#frm_data').find('#item_status_site_setting').val(citem['Source_Site_Stock_Status']).prop('disabled', true);
        $('#frm_data').find('#MinQty').val(citem['MIN']).prop('disabled', true);
        $('#frm_data').find('#MaxQty').val(citem['MAX']).prop('disabled', true);
        $('#frm_data').find('#item_result_final').val($.MRP_MINMAX_MAIN(citem['MinQty_KLH'], citem['MaxQty_KLH'], citem['Onhand_KLH'], citem['item_pending_po'], citem['PackCodeRounding'])).prop('disabled', true);
        $('#frm_data').find('#item_goodsalesflag').val(citem['GoodSellerFlag_KLH']).prop('disabled', true);

    } else if (citem['Destination_Site'] === '211 : SPP - Liab Klong Song') {

        $('#frm_data').find('#item_status_site_setting').val(citem['Source_Site_Stock_Status']).prop('disabled', true);
        $('#frm_data').find('#MinQty').val(citem['MIN']).prop('disabled', true);
        $('#frm_data').find('#MaxQty').val(citem['MAX']).prop('disabled', true);
        $('#frm_data').find('#item_result_final').val($.MRP_MINMAX_MAIN(citem['MinQty_LKS'], citem['MaxQty_LKS'], citem['Onhand_LKS'], citem['item_pending_po'], citem['PackCodeRounding'])).prop('disabled', true);
        $('#frm_data').find('#item_goodsalesflag').val(citem['GoodSellerFlag_LKS']).prop('disabled', true);
    }

    $('#frm_data').find('#item_reorder_point').val(citem['item_reorder_point']).prop('disabled', true);
    $('#frm_data').find('#item_reorder_qty').val(citem['item_reorder_qty']).prop('disabled', true);
    $('#frm_data').find('#item_result_final').val(citem['item_result_final']).prop('disabled', true);
    $('#frm_data').find('#item_reorder_qty').val(citem['item_reorder_qty']).prop('disabled', true);
    $('#frm_data').find('#site_remark').val(citem['Remark']).prop('disabled', true);

};

$.Edit = async function (citem) {

    $('#frm_data').find('#source_site_code').prop('disabled', true);
    $('#frm_data').find('#destination_site_code').prop('disabled', true);
    $('#frm_data').find('#item_barcode').prop('disabled', true);
    $('#frm_data').find('#Onhand').prop('disabled', true);
    $('#frm_data').find('#PackCodeRounding').prop('disabled', true);
    $('#frm_data').find('#item_pending_po').prop('disabled', true);
    $('#frm_data').find('#lead_time').prop('disabled', true);
    $('#frm_data').find('#ManualSafetyStockQty').prop('disabled', true);
    $('#frm_data').find('#StockStatus').prop('disabled', true);
    $('#frm_data').find('#item_status_site_setting').prop('disabled', true);
    $('#frm_data').find('#MinQty').prop('disabled', false);
    $('#frm_data').find('#MaxQty').prop('disabled', false);
    $('#frm_data').find('#item_reorder_point').prop('disabled', true);
    $('#frm_data').find('#item_reorder_qty').prop('disabled', true);
    $('#frm_data').find('#item_result_final').prop('disabled', true);
    $('#frm_data').find('#item_reorder_qty').prop('disabled', true);
    $('#frm_data').find('#item_result_final').prop('disabled', true);
    $('#frm_data').find('#item_goodsalesflag').prop('disabled', true);
    $('#frm_data').find('#site_remark').prop('disabled', false);
    //$('#btn-save_exit').removeClass('d-none');

    $('#btn-save_exit').off('click').on('click', function (e) {

        var full_mail = user.email;
        var name = full_mail.replace("@vskautoparts.com", "");

        e.preventDefault

        let update_data = {
            code: citem['code'],
            MaxQty_KLH: $('#frm_data').find('#MaxQty').val(),
            MinQty_KLH: $('#frm_data').find('#MinQty').val(),
            MaxQty_LLK: $('#frm_data').find('#MaxQty').val(),
            MinQty_LLK: $('#frm_data').find('#MinQty').val(),
            UserUpdate_SPC: name,
            site_remark: $('#frm_data').find('#site_remark').val(),
            destination_site_code: $('#frm_data').find('#destination_site_code').val(),
        };

        var params = [];
        for (const i in update_data) {
            params.push(i + "=" + encodeURIComponent(update_data[i]));
        }

        fetch(url_mrp_itemMaster_update, {
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
                    $.List();
                });
            }

        }).catch((error) => {
            toastr.error(error, 'Error writing document');
            console.log('Error:', error);
        });

        return false;

    });

};

$.List = async function (search) {

    console.log('List function Start', new Date());

    await $.LoadingOverlay("show", {
        image: '',
        custom: customElement
    });

    let url = new URL(url_mrp_itemMaster_List);

    url.search = new URLSearchParams({
        BRANCH: typeof destination_site == 'undefined' ? '' : destination_site,
        Barcode: typeof $('#search_itemmaster').val() == 'undefined' ? '' : $('#search_itemmaster').val(),
        Source_Site_Stock_Status: $('#search_stock_status').val(),
        Source_Site: 'VSM',
        Destination_Site: typeof destination_site == 'undefined' ? '' : destination_site,
    });

    await fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.length > 0) {
            $('.last-time').html(moment(result.data[0]['lastupdated']).format('DD-MM-YYYY HH:mm:ss a'));
            $('#btn-refresh-all').removeClass('d-none')
        }

        table_list = $('#table_list').removeAttr('width').DataTable({
            data: result.data,
            dom: '<Bf<t>lip>',
            bDestroy: true,
            deferRender: true,
            autoWidth: true,
            colReorder: true,
            scrollX: true,
            scrollCollapse: true,
            lengthMenu: [
                [10, 25, 50, 100, -1],
                ['10 rows', '25 rows', '50 rows', '100 rows', 'Show all']
            ],
            buttons: [
                'copyHtml5',
                // 'excelHtml5',
                {
                    extend: 'excelHtml5',
                    filename: 'Export_MRP_ItemSetup_' + destination_site + '_' + moment().format('DD-MM-YYYY HH:mm:ss'),
                    exportOptions: {
                        modifier: {
                            order: 'current',
                            page: 'all',
                            search: 'none'
                        },
                        //columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
                    },
                },
            ],
            columns: [
                {
                    title: "Item Code",
                    data: "Item_Code",
                    class: "tx-center",
                    width: "160px",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "<div class='tx-center'>Item Name</div>",
                    data: "Item_Name",
                    class: "mr-1 tx-left",
                    width: "300px",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "UOM",
                    data: "UOM",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "Transfer Qty Required",
                    data: "Transfer_Qty_Required",
                    class: "tx-center",
                    width: "50px",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "GCOST",
                    data: "GCOST",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "ZONE",
                    data: "ZONE",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "Pack Code Rounding",
                    data: "Pack_Code_Rounding",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "<div class='tx-center'>CODE 1</div>",
                    data: "CODE_1",
                    class: "tx-left",
                    width: "100px",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "<div class='tx-center'>CODE 2</div>",
                    data: "CODE_2",
                    class: "tx-left",
                    width: "100px",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "<div class='tx-center'>CODE 3</div>",
                    data: "CODE_3",
                    class: "tx-left",
                    width: "70px",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "<div class='tx-center'>CODE 4</div>",
                    data: "CODE_4",
                    class: "tx-left",
                    width: "150px",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "<div class='tx-center'>CODE 1-4</div>",
                    class: "tx-left",
                    width: "190px",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return (row.CODE_1 + row.CODE_2 + row.CODE_3 + row.CODE_4);
                    }
                }, //0
                {
                    title: "Barcode",
                    data: "Barcode",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "Spcodes",
                    data: "Spcodes",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "Source Site",
                    data: "Source_Site",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "Destination Site",
                    data: "Destination_Site",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "Source Site Stock Status",
                    data: "Source_Site_Stock_Status",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "Replenish Status",
                    data: "Replenish_Status",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "MIN",
                    data: "MIN",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "MAX",
                    data: "MAX",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "VSM SOM",
                    data: "VSM_SOM",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "On Hand Ratio",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {

                        let sum_data = (row.Transfer_Qty_Required / row.VSM_SOM)
                        let show_data
                        if (sum_data == 'Infinity' || sum_data == typeof NaN) {
                            show_data = 0
                        } else {
                            show_data = sum_data
                        }
                        return show_data;
                        //return (row.Transfer_Qty_Required / row.VSM_SOM);
                    }
                }, //0
                {
                    title: "SOH Destination",
                    data: "SOH_Destination",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "Pending PO",
                    data: "Pending_PO",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "Transit QTY",
                    data: "Transit_QTY",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "Backlog Ctrl",
                    data: "Backlog_Ctrl",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "Formula",
                    data: "Formula",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "Good Seller Flag",
                    data: "Good_Seller_Flag",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "Remark",
                    data: "Remark",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "lastupdated",
                    data: "lastupdated",
                    class: "tx-center",
                    //width: "15%",
                    visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0


            ],
            "rowCallback": function (row, data) {
            },
            "initComplete": function (settings, json) {

                $.LoadingOverlay("hide")

                //$.contextMenu({
                //    selector: '#table_list tbody tr',
                //    callback: async function (key, options) {

                //        let citem = table_list.row(this).data();

                //        if (key === 'view') {

                //            $.Details(citem);

                //        } else if (key === 'edit') {

                //            await $.Details(citem);
                //            await $.Edit(citem);

                //        } else {

                //            alert('ERROR');

                //        }

                //    },
                //    items: {
                //        "view": { name: "View", icon: "fas fa-search" },
                //        "edit": { name: "Edit", icon: "edit" },
                //    }

                //});

            },
            "drawCallback": function (settings) {

            }
        });

    });


};

$.Import = function () {

    var file_data = new FormData();
    var pic_file = $('#customFile').get(0).files
    file_data.append("postedFile", pic_file[0]);
    file_data.append("pathname", "" + "mrp_itemsetup" + "/" + "" + moment().format('L').replace('/', '-').replace('/', '-') + "");

    $.ajax({
        url: url_api_new + '/FileUploads/UploadFile',
        type: 'POST',
        data: file_data,
        contentType: false,
        processData: false,
        success: function (file_name) {

            console.log('file_name', file_name)

            var Import_data = new FormData();
            Import_data.append("ImportFilename", file_name);
            Import_data.append("ImportPathname", "" + "mrp_itemsetup" + "/" + "" + moment().format('L').replace('/', '-').replace('/', '-') + "");

            let url = new URL(url_mrp_itemsetup_Import);

            url.search = new URLSearchParams({
                ImportFilename: file_name,
                created_by: user_id,
                ImportPathname: "" + "mrp_itemsetup" + "/" + "" + moment().format('L').replace('/', '-').replace('/', '-') + "",
            });

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result_import) {

                console.log(result_import.data)

                if (result_import.length > 0) {

                    $('#show_table_import').removeClass('d-none');

                    $.Verify(result_import.data[0]['ImportFilename']);

                } else {

                    toastr.error('เกิดข้อผิดพลาด! ระหว่างตรวจสอบข้อมูล');

                    $('.modal-body').LoadingOverlay("hide");
                }

            });

        }

    });

};

$.Verify = function (file_name) {

    let url = new URL(url_mrp_itemsetup_Verify);

    url.search = new URLSearchParams({
        ImportFilename: file_name,
        created_by: user_id,
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log(result.data)

        if (result.length > 0) {

            let total_item = 0;
            let total_complete = 0;
            let total_incomplete = 0;

            $.each(result.data, function (key, val) {

                if (val['validate_code'] != 'PASS') {
                    total_incomplete += parseFloat(1)
                } else {
                    total_complete += parseFloat(1)
                }

                total_item++

            });

            $('#total-item').html(total_item)
            $('#total-complete').html(total_complete)
            $('#total-incomplete').html(total_incomplete)

        } else {


        }

        table_import = $('#table_import').removeAttr('width').DataTable({
            data: result.data,
            dom: '<Bf<t>lip>',
            bDestroy: true,
            deferRender: true,
            autoWidth: true,
            colReorder: true,
            scrollX: true,
            scrollCollapse: true,
            lengthMenu: [
                [10, 25, 50, 100, -1],
                ['10 rows', '25 rows', '50 rows', '100 rows', 'Show all']
            ],
            buttons: [
                'copyHtml5',
                {
                    extend: 'excelHtml5',
                    //text: 'Expot',
                    filename: 'REPORT_VALIDATE_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                    //filename: 'REPORT_VALIDATE_' + file_name + '_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                    exportOptions: {
                        modifier: {
                            order: 'current',
                            page: 'all',
                            search: 'none'
                        },
                        columns: [0, 1, 2, 3, 4, 5, 6, 7, 8,9]
                    },
                },
            ],
            columns: [

                {
                    title: "Destination_Site",
                    data: "Destination_Site",
                    class: "tx-center",
                    width: "160px",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return '<span class="badge badge-primary">' + data + '</span>';
                    }
                }, //0
                {
                    title: "validate code",
                    data: "validate_code",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //1
                {
                    title: "Item Code",
                    data: "Item_Code",
                    class: "tx-center",
                    width: "160px",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //2
                {
                    title: "MIN",
                    data: "MIN",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //3
                {
                    title: "MAX",
                    data: "MAX",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //4
                {
                    title: "Replenish Status",
                    data: "Replenish_Status",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //5
                {
                    title: "Remark",
                    data: "Remark",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //0
                {
                    title: "Action",
                    data: "Action",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        let tx_color
                        if (data == 'ADD') { tx_color = 'text-success' }
                        else if (data == 'ADJUCT') { tx_color = 'text-warning' }
                        else if (data == 'DELETE') { tx_color = 'text-danger' }
                        else { tx_color = 'text-secondary' }
                        return '<span class="' + tx_color + '">' + data;
                    }
                }, //6

                {
                    title: "created by",
                    data: "created_by",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //7
                {
                    title: "created date",
                    data: "created_date",
                    class: "tx-center",
                    //width: "15%",
                    //visible: false,
                    //searchable: false
                    render: function (data, type, row, meta) {
                        return data;
                    }
                }, //8

            ],
            rowCallback: function (row, data) {

                if ((data.validate_code) != 'PASS') {
                    $('td:eq(1)', row).addClass('tx-danger');
                    $('td:eq(1)', row).parent().addClass('bg-danger-transparent');
                } else {
                    $('td:eq(1)', row).addClass('tx-success');
                    $('td:eq(1)', row).parent().addClass('bg-success-transparent');
                }

            },
            initComplete: function (settings, json) {

                $('.modal-body').LoadingOverlay("hide")

                $('#btn-upload').prop('disabled', false);

                //$('.counter').countUp();

                $.Upload(file_name)

            },
            drawCallback: function (settings) {

                var api = this.api();

                // Output the data for the visible rows to the browser's console
                //console.log(api.rows({ page: 'current' }).data());
            }
        });

    });

};

$.Upload = function (file_name) {

    $('#btn-upload').off('click').on('click', function (e) {

        e.preventDefault();

        //$('#btn-upload').prop('disabled', true)
        $(this).prop('disabled', true)

        swal({
            title: "คุณแน่ใจหรือไม่",
            text: "ที่จะทำการอัพเดตข้อมูลนี้",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "ใช่, ยันยืน",
            cancelButtonText: "ไม่, ยกเลิก",
            cancelButtonColor: '#d33',
            closeOnConfirm: false,
            closeOnCancel: false,
            showLoaderOnConfirm: true
        },
            function (isConfirm) {

                if (isConfirm) {

                    let url = new URL(url_mrp_itemsetup_Upload);

                    url.search = new URLSearchParams({
                        ImportFilename: file_name,
                        created_by: user_id
                    });

                    fetch(url).then(function (response) {
                        return response.json();
                    }).then(function (result) {

                        if (result.status === 'Error') {

                            $('#btn-upload').prop('disabled', false)
                            toastr.error('Oops! An Error Occurred');

                            swal("เกิดข้อผิดพลาด", "กรุณาติดต่อเจ้าหน้าที่", "error");

                        } else {

                            swal({
                                title: "สำเร็จ!",
                                text: "ทำรายการสำเร็จ",
                                type: 'success',
                                timer: 2000,
                                showConfirmButton: false
                            });

                        }

                        $.LoadingOverlay("hide");

                    });

                } else {

                    swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                }

            });

    })

};

$.Master_Get = function () {


    // Start LOV MRP DATASET
    let lov_site_dataset = [];
    let lov_mrp_query = fs.collection('lov_mrp').where("active_flag", "in", ["Y"]);

    //lov_mrp_query.get().then(function (querySnapshot) {

    //    querySnapshot.forEach(function (doc) {
    //        if (doc.data().lov_code > 200 && doc.data().lov_code < 250) {
    //            lov_site_dataset.push({ id: doc.data().lov_code + ' : ' + doc.data().lov1, text: doc.data().lov_code + ' : ' + doc.data().lov1 });
    //        }
    //    });

    //    $('#search_destination_site_code').select2({
    //        width: '100%',
    //        height: '40px',
    //        placeholder: {
    //            id: '0', // the value of the option
    //            text: '--- Select Destination Site ---'
    //        },
    //        data: lov_site_dataset,
    //        templateResult: function (data) {
    //            return data.text;
    //        },
    //        sorter: function (data) {
    //            return data.sort(function (a, b) {
    //                return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
    //            });
    //        }
    //    });

    //});

    let search_dataSet = [
        { id: 'KLH', text: 'KLH' },
        { id: 'LLK', text: 'LLK' },
        { id: 'KSW', text: 'KSW' },
        { id: 'NWM', text: 'NWM' },
        { id: 'SNK', text: 'SNK' },
    ];

    $('#search_destination_site_code').select2({
        width: '100%',
        height: '40px',
        placeholder: {
            id: '0', // the value of the option
            text: '--- Select Destination Site ---'
        },
        data: search_dataSet,
        templateResult: function (data) {
            return data.text;
        },
        sorter: function (data) {
            return data.sort(function (a, b) {
                return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
            });
        }
    });
    
    // End LOV MRP List

    // Start LOV MRP DATASET
    let formula_dataset = [];
    let formula_query = fs.collection('mrp_mas_formula').where("record_status", "==", "Y");

    formula_query.get().then(function (querySnapshot) {

        querySnapshot.forEach(function (doc) {

            formula_dataset.push({ id: doc.data().formula_type, text: doc.data().formula_type });

        });

        $('#item_formula').select2({
            width: '100%',
            height: '40px',
            dropdownParent: $("#modal-frm_data"),
            placeholder: {
                id: '0', // the value of the option
                text: '--- Select Formula ---'
            },
            data: formula_dataset,
            templateResult: function (data) {
                return data.text;
            },
            sorter: function (data) {
                return data.sort(function (a, b) {
                    return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                });
            }
        });

        $('#item_formula').val('MINMAX').trigger('change.select2').prop('disabled', true); //เลือกชั่วคราว

        $('#search_item_formula').select2({
            width: '100%',
            height: '40px',
            placeholder: {
                id: '0', // the value of the option
                text: '--- Select Formula ---'
            },
            data: formula_dataset,
            templateResult: function (data) {
                return data.text;
            },
            sorter: function (data) {
                return data.sort(function (a, b) {
                    return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                });
            }
        });

    });
    // End LOV MRP List

    // Start Item master DATASET
    $('#search_itemmaster').select2({
        ajax: {
            url: url_api_mrp + '/v1/MRP_ItemMaster_Search',
            dataType: 'json',
            width: 'resolve',
            delay: 500,
            dropdownAutoWidth: true,
            minimumInputLength: 3,
            minimumResultsForSearch: 10,
            data: function (params) {
                var query = {
                    keywords: typeof params.term !== 'undefined' ? params.term : ' ',
                }
                //console.log(params);
                return query;
            },
            escapeMarkup: function (markup) {
                return markup;
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
    })
    // End Item master DATASET

    // Start CODE 1 - 5 
    $('#search_item_code1_abb').select2({
        width: 'resolve',
        class: "select-sm",
        ajax: {
            //url: connect_url + '/v1/gcode_select2_get?ctype=spcodes',
            url: connect_url + '/v1/itemmaster_select2_get?ctype=gcode_a',
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

    $('#search_item_code5').select2({
        ajax: {
            //url: connect_url + '/v1/gcode_select2_get?ctype=spcodes',
            url: connect_url + '/v1/itemmaster_select2_get?ctype=gcode_e',
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
            //url: connect_url + '/v1/gcode_select2_get?ctype=spcodes',
            url: connect_url + '/v1/itemmaster_select2_get?ctype=gcode_c',
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

    $('#search_item_code2').select2({
        ajax: {
            //url: connect_url + '/v1/gcode_select2_get?ctype=spcodes',
            url: connect_url + '/v1/itemmaster_select2_get?ctype=gcode_b',
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

    $('#search_item_code4').select2({
        ajax: {
            //url: connect_url + '/v1/gcode_select2_get?ctype=spcodes',
            url: connect_url + '/v1/itemmaster_select2_get?ctype=gcode_d',
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

    // End CODE 1 - 5 

};