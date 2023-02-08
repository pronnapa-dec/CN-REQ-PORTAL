'use strict';
'use strict';

//const api_url = 'http://localhost:49705';
const api_url = 'http://192.168.1.247:8082/mrp-api';
const product_purplan_get = api_url + '/v1/MRP_ItemMaster_Get';

let fs = firebase.firestore();
let collection = 'mrp_opt_itemsetup';
let oTable, destination_site_code;
let item_data = [];
let data_excel_item = [];
let item_data_import = [];
let dataImportSet = [];
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

        $.init = function () {

            /*
            var docRef = fs.collection(collection).doc("20210217-201-211");

            docRef.get().then(function (doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
            */
            $.List('load');

            $.MRP_Source_Site_Get();
            $.MRP_Desination_Site_Get();
            $.MRP_Formula_Get();
            $.MRP_ItemMaster_Search();

            $.Search();
            $.import_file_item();

            $('#btn-item_create').click(async function (e) {

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

            $('#modal-frm_data').on('hidden.bs.modal', function () {

                $('#frm_data').find('input').val('');
                $('#frm_data').find('#item_barcode').prop('disabled', true);
                $('#frm_data').find('select').val('').trigger('change.select2');

                $("#frm_data").parsley().reset();

            });



        };

        $.Search = async function () {

            console.log('Search function Start', new Date());

            $('#btn-search').on('click', function (e) {

                e.preventDefault();
                /*
                $.LoadingOverlay("show", {
                    image: '',
                    custom: customElement
                });
                */

                oTable.destroy();

                $.List('load');

            });

        }

        $.List = async function (type) {

            console.log('List function Start', new Date());

            let query = fs.collection(collection);
             /*
            let query = fs.collection(collection).where("record_status", "in", ["Y", "N"]);

            if ($('#search_source_site_code').val() != '') {
                query = fs.collection(collection).where("source_site_code", "==", $('#search_source_site_code').val());
            }

            if ($('#search_destination_site_code').val() != '') {
                query = fs.collection(collection).where("destination_site_code", "==", $('#search_destination_site_code').val());
            }

            if ($('#search_item_formula').val() != '') {
                query = fs.collection(collection).where("item_formula", "==", $('#search_item_formula').val());
            }

            if ($('#search_stock_status').val() != '') {
                query = fs.collection(collection).where("item_stockstatus", "==", $('#search_stock_status').val().toUpperCase());
            }

            if ($('#search_item_status_site_setting').val() != '') {
                query = fs.collection(collection).where("item_status_site_setting", "==", $('#search_item_status_site_setting').val().toUpperCase());
            }

            if ($('#search_itemmaster').val() != '0') {
                query = fs.collection(collection).where("item_gbarcode", "==", $('#search_itemmaster').val());
            }

            */

            if (type == 'load') {


                let dataSet = [];

                query.get("20210217-201-211").then(function (querySnapshot) {

                    console.log('querySnapshot', querySnapshot.data())

                    querySnapshot.forEach(function (doc) {

                        dataSet.push({
                            trand_id: doc.data().trand_id,                    //0
                            item_stkcod: doc.data().item_stkcod,                 //1
                            item_gbarcode: doc.data().item_gbarcode,               //2
                            item_name: doc.data().item_name,                   //3
                            item_spcodes: doc.data().item_spcodes,                //4
                            item_label: doc.data().item_label,                  //5
                            source_site_code: doc.data().source_site_code,            //6
                            destination_site_code: doc.data().destination_site_code,       //7
                            site_code: 'site_code',                            //8
                            item_stockstatus: doc.data().item_stockstatus,            //9
                            item_status_site_setting: doc.data().item_status_site_setting,    //10
                            stockstatus: 'stockstatus',                          //11
                            item_min_qty: doc.data().item_min_qty,                //12
                            item_max_qty: doc.data().item_max_qty,                //13
                            min_max: 'min_max',                              //14
                            item_stock_onhand: doc.data().item_stock_onhand,           //15
                            item_pending_po: doc.data().item_pending_po,             //16
                            item_pack_code_rounding: doc.data().item_pack_code_rounding,     //17
                            item_backlog_ctrl: doc.data().item_backlog_ctrl,           //18
                            record_status: doc.data().record_status,               //19
                            item_formula: doc.data().item_formula,                //20
                            item_result_final: doc.data().item_result_final,           //21
                            created_by: doc.data().created_by,                  //22
                            created_date: doc.data().created_date,                //23
                            updated_by: doc.data().updated_by,                  //24
                            updated_date: doc.data().updated_date,                 //25
                            import_status: ""
                        });

                    });

                    console.log('dataSet', dataSet)
                    $.GetTable(dataSet);
                });
            }else if(type == 'import'){
                $.GetTable (dataImportSet)
            }

        };

        $.GetTable = async function(dataSet){
            oTable = $('#tbl-list').DataTable({
                data: dataSet,
                scrollY: "450px",
                scrollX: true,
                scrollCollapse: true,
                autoWidth: true,
                paging: false,
                destroy: true,
                searching: true,
                dom: 'Bfrtip',
                colReorder: true,
                //stateSave: true,
                /*fixedColumns: {
                    leftColumns: 6,
                    rightColumns: 1
                },*/
                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 rows', '25 rows', '50 rows', 'Show all']
                ],
                buttons: [
                    'copyHtml5',
                    // 'excelHtml5',
                    {
                        extend: 'excelHtml5',
                        exportOptions: {
                            columns: [1, 2, 3, 4, 6, 7, 9, 10, 12, 13, 15, 16, 17, 18, 19, 20, 21]
                        }
                    },
                    'csvHtml5',
                    'pdfHtml5',
                    'print',
                ],
                columns: [
                    {
                        title: "ID",
                        data: "trand_id",
                        visible: false,
                        searchable: false
                    },
                    {
                        title: "Item Code",
                        data: "item_stkcod",
                        visible: false,
                    },
                    {
                        title: "Barcode",
                        data: "item_gbarcode",
                        visible: false,
                    },
                    {
                        title: "Item Name",
                        data: "item_name",
                        visible: false,
                    },
                    {
                        title: "SPCODE",
                        data: "item_spcodes",
                        visible: false,
                    },
                    {
                        title: "Item Name",
                        data: "item_label",
                        width: "250px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;  color:DarkGreen;">' + row.item_stkcod + '</span>' + '</br >' + '<span style="font-size:11px;  color:OrangeRed;">' + row.item_spcodes + '</span>' + ' / ' + '<span style="font-size:11px; color:DodgerBlue;">' + row.item_gbarcode + '</span>' + '</br >' + '<span style="font-size:11px;">' + data + '</span>';
                        }
                    },
                    {
                        title: "Source Site",
                        data: 'source_site_code',
                        visible: false
                    },
                    {
                        title: "Destination Site",
                        data: 'destination_site_code',
                        visible: false,
                    },
                    {
                        title: "Site",
                        width: "220px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {

                            return '<span style="font-size:11px;  color:DarkGreen;">' + row.source_site_code + '</span>' + ' -> ' + '<span style="font-size:11px;  color:OrangeRed;">' + row.destination_site_code + '</span>';
                        }
                    },
                    {
                        title: "Stock Status",
                        data: 'item_stockstatus',
                        visible: false,
                    },
                    {
                        title: "Site Setting Stock Status",
                        data: 'item_status_site_setting',
                        visible: false,
                    },
                    {
                        title: "Stock Status",
                        width: "120px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {

                            var stockstatus = "";
                            if (row.item_stockstatus === 'BACKLOG') {
                                stockstatus = '<span class="badge badge-secondary mg-l-25" style="width: 55px;">BACKLOG</span>';
                            } else if (row.item_stockstatus === 'PLAN') {
                                stockstatus = '<span class="badge badge-primary mg-l-25" style="width: 55px;">PLAN</span>';
                            } else if (row.item_stockstatus === 'STOCK') {
                                stockstatus = '<span class="badge badge-success mg-l-25" style="width: 55px;">STOCK</span>';
                            } else if (row.item_stockstatus === 'SERVICE') {
                                stockstatus = '<span class="badge badge-danger mg-l-25" style="width: 55px;">SERVICE</span>';
                            }

                            var sitesetting = "";
                            if (row.item_status_site_setting === 'BACKLOG') {
                                sitesetting = '<span class="badge badge-secondary mg-l-25" style="width: 55px;">BACKLOG</span>';
                            } else if (row.item_status_site_setting === 'STOCK') {
                                sitesetting = '<span class="badge badge-success mg-l-25" style="width: 55px;">STOCK</span>';
                            } else {
                                sitesetting = '-';
                            }
                            return stockstatus + ' / ' + sitesetting;


                        }
                    },
                    {
                        title: "MIN",
                        data: 'item_min_qty',
                        searchable: false,
                        visible: false,
                    },
                    {
                        title: "MAX",
                        data: 'item_max_qty',
                        searchable: false,
                        visible: false,
                    },
                    {
                        title: "Min/Max",
                        width: "70px",
                        class: "tx-center",
                        searchable: false,
                        render: function (data, type, row, meta) {

                            return '<span>' + row.item_min_qty + '</span>' + ' / ' + '<span">' + row.item_max_qty + '</span>';

                        }
                    },
                    {
                        title: "Stock On Hand",
                        data: 'item_stock_onhand',
                        class: "tx-center",
                        width: "70px",
                        searchable: false,
                    },
                    {
                        title: "Pending PO",
                        data: 'item_pending_po',
                        class: "tx-center",
                        width: "60px",
                        searchable: false,
                    },
                    {
                        title: "Pack Code Rounding",
                        data: 'item_pack_code_rounding',
                        class: "tx-center",
                        width: "60px",
                        searchable: false,
                    },
                    {
                        title: "Backlog Ctrl",
                        data: 'item_backlog_ctrl',
                        class: "tx-center",
                        width: "60px",
                        searchable: false,
                    },
                    {
                        title: "Active",
                        data: 'record_status',
                        class: "tx-center",
                        width: "60px"
                    },
                    {
                        title: "Formula",
                        data: 'item_formula',
                        class: "tx-center",
                        width: "80px"
                    },
                    {
                        title: "Result Final",
                        class: "tx-center",
                        render: function (data, type, row, meta) {

                            return $.MRP_MINMAX_MAIN(row.item_min_qty, row.item_max_qty, row.item_stock_onhand, row.item_pending_po, row.item_pack_code_rounding);
                        }
                    },
                     {
                         title: "Status Import",
                         class: "tx-center",
                         data: 'import_status',
                         render: function (data, type, row, meta) {
                             return '<span style="color:red">' + data + '</span>';
                         }
                     },
                    {
                        title: "Created By",
                        data: 'created_by',
                        searchable: false,
                        visible: false,
                    },
                    {
                        title: "Created Date",
                        data: 'created_date',
                        searchable: false,
                        visible: false,
                    },
                    {
                        title: "Updated By",
                        data: 'updated_by',
                        searchable: false,
                        visible: false,
                    },
                    {
                        title: "Updated Date",
                        data: 'updated_date',
                        searchable: false,
                        visible: false,
                    },
                ],
                "order": [[21, "asc"]],
                "rowCallback": function (row, data) {


                },
                "initComplete": function (settings, json) {

                    let $buttons = $('.dt-buttons').hide();

                    $('.btn-tbl_export').on('click', function (e) {

                        e.preventDefault();

                        let btnClass = '.buttons-' + $(this).data('export')

                        $buttons.find(btnClass).click();
                    });

                    $.contextMenu({
                        selector: '#tbl-list tbody tr',
                        callback: function (key, options) {

                            let data = oTable.row(this).data();

                            let citem = {
                                trand_id: data[0],
                                item_barcode: data[1],
                                item_name: data[2],
                                source_site_code: data[3],
                                destination_site_code: data[4],
                                item_min_qty: data[5],
                                item_max_qty: data[6],
                                item_stock_onhand: data[7],
                                item_pending_po: data[8],
                                item_reorder_point: data[9],
                                item_backlog_ctrl: data[10],
                                record_status: data[11],
                                item_result_final: data[12],
                                created_by: data[13],
                                created_date: data[14],
                                updated_by: data[15],
                                updated_date: data[16]
                            };



                            if (key === 'view') {

                                $('#modal-frm_data').modal({
                                    keyboard: false,
                                    backdrop: 'static'
                                });
                                $.Details(citem);

                            } else if (key === 'edit') {

                                $('#modal-frm_data').modal({
                                    keyboard: false,
                                    backdrop: 'static'
                                });
                                $.Details(citem);
                                $.Edit(citem);

                            } else if (key === 'delete') {

                                $('#modal-frm_data').modal({
                                    keyboard: false,
                                    backdrop: 'static'
                                });
                                $.Details(citem);
                                $.Delete(citem);

                            }
                            else if (key === 'create') {

                                $('#modal-frm_data').modal({
                                    keyboard: false,
                                    backdrop: 'static'
                                });
                                $.Create();

                            } else if (key === 'schedule') {

                                $('#modal-frm_schedule').modal({
                                    keyboard: false,
                                    backdrop: 'static'
                                });

                            } else {

                                alert('ERROR');

                            }

                        },
                        items: {
                            "view": { name: "View", icon: "fas fa-search" },
                            "edit": { name: "Edit", icon: "edit" },
                            //"delete": { name: "Delete", icon: "delete" },
                            //   "sep1": "---------",
                            //   "schedule": { name: "Schedule ", icon: "fas fa-calendar-week" },
                            //   "history": { name: "History", icon: "fas fa-history" },
                        }

                    });
                },
                "drawCallback": function (settings) {

                }
            });

        }

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

                                oTable.destroy();
                                $.List('load');

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

            console.log('Details function Start', new Date());
            console.log(citem, new Date());

            $('.btn-save_form').hide();

            $('#destination_site_code').val(citem['destination_site_code']).trigger('change.select2');

            await $.MRP_ItemMaster_Search();

            await setTimeout(function () {
                $.LoadingOverlay("hide");
            }, 300);

        };

        $.Edit = async function (citem) {

            $('#site_code').trigger('change').prop('disabled', false);
            $('#schedule_note').prop('disabled', false);
            $('.schedule_day').prop('disabled', false);
            $('#schedule_all').prop('disabled', false);
            $('.record_status').prop('disabled', false);

            $('#btn-save_exit').html('Update').show();
            $('#btn-save_exit').removeClass('btn-danger').addClass('btn-primary');

            $('#btn-save_exit').click(function (e) {

                let submit_action = $(this).data('action');

                $('#frm_data').parsley().on('form:submit', function () {

                    $('.btn-save_form').prop('disabled', true);

                    let data_citem = {
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

                            oTable.destroy();
                            $.List('load');

                            setTimeout(function () {

                                $('.btn-save_form').prop('disabled', false);
                                $("#frm_data").parsley().reset();

                                $('#modal-frm_data').modal('hide');

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

        $.MRP_ItemMaster_Search = async function () {

            $('#search_itemmaster').select2({
                ajax: {
                    url: api_url + '/v1/MRP_ItemMaster_Search',
                    dataType: 'json',
                    width: 'resolve',
                    dropdownAutoWidth: true,
                    minimumInputLength: 2,
                    minimumResultsForSearch: 50,
                    data: function (params) {
                        var query = {
                            keywords: typeof params.term !== 'undefined' ? params.term : ' ',
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
            })

            $('#frm_data').find('#item_barcode').select2({
                ajax: {
                    url: api_url + '/v1/MRP_ItemMaster_Search',
                    dataType: 'json',
                    width: '100%',
                    height: '40px',
                    dropdownParent: $("#modal-frm_data"),
                    dropdownAutoWidth: true,
                    minimumInputLength: 2,
                    minimumResultsForSearch: 50,
                    data: function (params) {
                        var query = {
                            keywords: typeof params.term !== 'undefined' ? params.term : ' ',
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
            }).on('select2:select', function (e) {

                e.preventDefault();

                var data = e.params.data;
                console.log(data);
                $.MRP_ItemMaster_Detail();

            });
        }

        $.MRP_ItemMaster_Detail = async function () {

            let url = new URL(product_purplan_get);

            url.search = new URLSearchParams({
                barcode: $('#frm_data').find('#item_barcode').val()
            });

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {

                let ResultFinal = 0;

                //console.log(moment(), 'START FUNCTION MRP_ItemMaster_Search', result)

                $('#frm_data').find('#PackCodeRounding').val((result.data[0]['PackCodeRounding'] > 0 ? result.data[0]['PackCodeRounding'] : 1));

                $('#frm_data').find('#StockStatus').val(result.data[0]['StockStatus']);

                if (result.data[0]['StockStatus'].toLowerCase() === 'stock') {
                    $('.item_backlog_ctrl').eq(1).attr('checked', 'checked');
                } else {
                    $('.item_backlog_ctrl').eq(0).attr('checked', 'checked');
                }

                $('#frm_data').find('#ManualSafetyStockQty').val(result.data[0]['ManualSafetyStockQty']);

                if ($('#destination_site_code').val() === '201 : VSK - Minburi') { // Minburi

                    $('#frm_data').find('#MinQty').val(result.data[0]['MinQty']);
                    $('#frm_data').find('#MaxQty').val(result.data[0]['MaxQty']);

                    $('#frm_data').find('#Onhand').val(result.data[0]['Onhand_VSK']);

                    ResultFinal = $.MRP_MINMAX_MAIN(result.data[0]['MinQty'], result.data[0]['MaxQty'], result.data[0]['Onhand_VSK'], $('#frm_data').find('#item_pending_po').val(), result.data[0]['PackCodeRounding']);

                } else if ($('#destination_site_code').val() === '202 : VSK - Suwintawong') { // Suwintawong

                    $('#frm_data').find('#MinQty').val(result.data[0]['MinQty_VSF']);
                    $('#frm_data').find('#MaxQty').val(result.data[0]['MaxQty_VSF']);

                    $('#frm_data').find('#Onhand').val(result.data[0]['Onhand_VSF']);

                    $('#frm_data').find('#item_goodsalesflag').val(result.data[0]['Onhand_VSF'])

                    ResultFinal = $.MRP_MINMAX_MAIN(result.data[0]['MinQty'], result.data[0]['MaxQty'], result.data[0]['Onhand_VSF'], $('#frm_data').find('#item_pending_po').val(), result.data[0]['PackCodeRounding']);

                } else if ($('#destination_site_code').val() === '211 : SPP - Liab Klong Song') { // LKS

                    $('#frm_data').find('#MinQty').val(result.data[0]['MinQty_LKS']);
                    $('#frm_data').find('#MaxQty').val(result.data[0]['MaxQty_LKS']);

                    $('#frm_data').find('#Onhand').val(result.data[0]['Onhand_LKS']);

                    $('#frm_data').find('#item_goodsalesflag').val(result.data[0]['Onhand_LKS'])

                    ResultFinal = $.MRP_MINMAX_MAIN(result.data[0]['MinQty'], result.data[0]['MaxQty'], result.data[0]['Onhand_LKS'], $('#frm_data').find('#item_pending_po').val(), result.data[0]['PackCodeRounding'])

                } else if ($('#destination_site_code').val() === '212 : SPP - Khlong Luang') { // KLH

                    $('#frm_data').find('#MinQty').val(result.data[0]['MinQty_KLH']);
                    $('#frm_data').find('#MaxQty').val(result.data[0]['MaxQty_KLH']);

                    $('#frm_data').find('#Onhand').val(result.data[0]['Onhand_KLH']);

                    $('#frm_data').find('#item_goodsalesflag').val(result.data[0]['Onhand_KLH'])

                    ResultFinal = $.MRP_MINMAX_MAIN(result.data[0]['MinQty'], result.data[0]['MaxQty'], result.data[0]['Onhand_KLH'], $('#frm_data').find('#item_pending_po').val(), result.data[0]['PackCodeRounding'])

                } else if ($('#destination_site_code').val() === '213 : SPP - Lamlukka') { // LLK

                    $('#frm_data').find('#MinQty').val(result.data[0]['MinQty_LLK']);
                    $('#frm_data').find('#MaxQty').val(result.data[0]['MaxQty_LLK']);

                    $('#frm_data').find('#Onhand').val(result.data[0]['Onhand_LLK']);

                    $('#frm_data').find('#item_goodsalesflag').val(result.data[0]['Onhand_LLK'])

                    $.MRP_MINMAX_MAIN(result.data[0]['MinQty'], result.data[0]['MaxQty'], result.data[0]['Onhand_LLK'], $('#frm_data').find('#item_pending_po').val(), result.data[0]['PackCodeRounding'])

                } else if ($('#destination_site_code').val() === '214 : SPP - Nawamin') { // NWM

                    $('#frm_data').find('#MinQty').val(result.data[0]['MinQty_NWM']);
                    $('#frm_data').find('#MaxQty').val(result.data[0]['MaxQty_NWM']);

                    $('#frm_data').find('#Onhand').val(result.data[0]['Onhand_NWM']);

                    $('#frm_data').find('#item_goodsalesflag').val(result.data[0]['Onhand_NWM'])

                    ResultFinal = $.MRP_MINMAX_MAIN(result.data[0]['MinQty'], result.data[0]['MaxQty'], result.data[0]['Onhand_NWM'], $('#frm_data').find('#item_pending_po').val(), result.data[0]['PackCodeRounding'])

                } else {

                    $('#frm_data').find('#MinQty').val(result.data[0]['MinQty']);
                    $('#frm_data').find('#MaxQty').val(result.data[0]['MaxQty']);
                    $('#frm_data').find('#Onhand').val('0');

                    ResultFinal = 0;

                }

                $('#frm_data').find('#item_result_final').val(ResultFinal);

                let uuid = $.uuid();
                // array to firebase
                item_data = {
                    trand_id: uuid,
                    source_site_code: $('#source_site_code').val(),
                    destination_site_code: $('#destination_site_code').val(),
                    item_stkcod: result.data[0]['code'],
                    item_gbarcode: result.data[0]['barcode'],
                    item_spcodes: result.data[0]['spcodes'],
                    item_name: result.data[0]['itemname'],
                    item_label: $('#item_barcode option:selected').text(),
                    item_formula: $('#item_formula').val(),
                    item_pack_code_rounding: $('#PackCodeRounding').val(),
                    item_stock_onhand: $('#Onhand').val(),
                    item_pending_po: $('#item_pending_po').val(),
                    item_lead_time: $('#lead_time').val(),
                    item_safetystockqty: $('#ManualSafetyStockQty').val(),
                    item_stockstatus: $('#StockStatus').val(),
                    item_status_site_setting: $('#item_status_site_setting').val(),
                    item_min_qty: $('#MinQty').val(),
                    item_max_qty: $('#MaxQty').val(),
                    item_reorder_point: $('#item_reorder_point').val(),
                    item_reorder_qty: $('#item_reorder_qty').val(),
                    item_spare_1: $('#item_spare_1').val(),
                    item_spare_2: $('#item_spare_2').val(),
                    item_spare_3: $('#item_spare_3').val(),
                    item_backlog_ctrl: $('#frm_data').find('.item_backlog_ctrl_yes').prop("checked") === true ? 'Y' : 'N',
                    item_result_final: $('#item_result_final').val(),
                    site_remark: $('#site_remark').val(),
                    record_status: $('#frm_data').find('.record_status').prop("checked") === true ? 'Y' : 'N',
                    created_by: "SYSTEM",
                    created_date: new Date(),
                    updated_by: "SYSTEM",
                    updated_date: new Date()
                };

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

                            oTable.destroy();
                            $.List('load');

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

            });

        }

        $.MRP_ItemMaster_ToFirebase = async function (barcode, destination_site_code) {
            $.LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            let url = new URL(product_purplan_get);

            url.search = new URLSearchParams({
                barcode: barcode
            });

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {

                let ResultFinal = 0;

                let uuid = $.uuid();
                let site_code, item_stock_onhand, item_stockstatus, item_min_qty, item_max_qty;

                if (destination_site_code == "VSF" && result.length > 0) {
                    site_code = '202 : VSK - Suwintawong';
                    item_stock_onhand = result.data[0]['Onhand_VSF'];
                    item_stockstatus = result.data[0]['StockStatus_VSF'];
                    item_min_qty = result.data[0]['MinQty_VSF'];
                    item_max_qty = result.data[0]['MaxQty_VSF'];
                    ResultFinal = $.MRP_MINMAX_MAIN(result.data[0]['MinQty'], result.data[0]['MaxQty'], result.data[0]['Onhand_VSF'], $('#frm_data').find('#item_pending_po').val(), result.data[0]['PackCodeRounding']);

                } else if (destination_site_code == "KLH" && result.length > 0) {
                    site_code = '212 : SPP - Khlong Luang';
                    item_stock_onhand = result.data[0]['Onhand_KLH'];
                    item_stockstatus = result.data[0]['StockStatus_KLH'];
                    item_min_qty = result.data[0]['MinQty_KLH'];
                    item_max_qty = result.data[0]['MaxQty_KLH'];
                    ResultFinal = $.MRP_MINMAX_MAIN(result.data[0]['MinQty'], result.data[0]['MaxQty'], result.data[0]['Onhand_KLH'], $('#frm_data').find('#item_pending_po').val(), result.data[0]['PackCodeRounding'])

                } else if (destination_site_code == "LKS" && result.length > 0) {
                    site_code = '211 : SPP - Liab Klong Song';
                    item_stock_onhand = result.data[0]['Onhand_LKS'];
                    item_stockstatus = result.data[0]['StockStatus_LKS'];
                    item_min_qty = result.data[0]['MinQty_LKS'];
                    item_max_qty = result.data[0]['MaxQty_LKS'];
                    ResultFinal = $.MRP_MINMAX_MAIN(result.data[0]['MinQty'], result.data[0]['MaxQty'], result.data[0]['Onhand_LKS'], $('#frm_data').find('#item_pending_po').val(), result.data[0]['PackCodeRounding'])

                } else if (destination_site_code == "LLK" && result.length > 0) {
                    site_code = '213 : SPP - Lamlukka';
                    item_stock_onhand = result.data[0]['Onhand_LLK'];
                    item_stockstatus = result.data[0]['StockStatus_LLK'];
                    item_min_qty = result.data[0]['MinQty_LLK'];
                    item_max_qty = result.data[0]['MaxQty_LLK'];
                    ResultFinal = $.MRP_MINMAX_MAIN(result.data[0]['MinQty'], result.data[0]['MaxQty'], result.data[0]['Onhand_LLK'], $('#frm_data').find('#item_pending_po').val(), result.data[0]['PackCodeRounding'])

                } else if (destination_site_code == "NWM" && result.length > 0) {
                    site_code = '214 : SPP - Nawamin';
                    item_stock_onhand = result.data[0]['Onhand_NWM'];
                    item_stockstatus = result.data[0]['StockStatus_NWM'];
                    item_min_qty = result.data[0]['MinQty_NWM'];
                    item_max_qty = result.data[0]['MaxQty_NWM'];
                    ResultFinal = $.MRP_MINMAX_MAIN(result.data[0]['MinQty'], result.data[0]['MaxQty'], result.data[0]['Onhand_NWM'], $('#frm_data').find('#item_pending_po').val(), result.data[0]['PackCodeRounding'])

                } else {
                    site_code = '';
                    item_stock_onhand = '';
                    item_stockstatus = '';
                    item_min_qty = '';
                    item_max_qty = '';
                    ResultFinal = 0;

                }

                item_data_import = {
                    trand_id: uuid,
                    source_site_code: "201 : VSK - Minburi",
                    destination_site_code: site_code,
                    item_stkcod: result.length > 0  ? result.data[0]['code'] : "",
                    item_gbarcode: result.length > 0 ? result.data[0]['barcode'] : "",
                    item_spcodes: result.length > 0 ? result.data[0]['spcodes'] : "",
                    item_name: result.length > 0 ? result.data[0]['itemname'] : "",
                    item_label: barcode,
                    item_formula: result.length > 0 ? result.data[0]['item_formula'] : "",
                    item_pack_code_rounding: result.length > 0 ? result.data[0]['PackCodeRounding'] : "",
                    item_stock_onhand: item_stock_onhand,
                    item_pending_po: result.length > 0 ? result.data[0]['item_pending_po'] : "",
                    item_lead_time: result.length > 0 ? result.data[0]['item_lead_time'] : "",
                    //item_safetystockqty: $('#ManualSafetyStockQty').val(),
                    item_stockstatus: item_stockstatus,
                    //item_status_site_setting: $('#item_status_site_setting').val(),
                    item_min_qty: item_min_qty,
                    item_max_qty: item_max_qty,
                    //item_reorder_point: result.data[0]['ReOrderQtyDaily'],
                    item_reorder_qty: result.length > 0 ? result.data[0]['ReOrderQtyDaily'] : "",
                    //item_spare_1: $('#item_spare_1').val(),
                    //item_spare_2: $('#item_spare_2').val(),
                    //item_spare_3: $('#item_spare_3').val(),
                    //item_backlog_ctrl: $('#frm_data').find('.item_backlog_ctrl_yes').prop("checked") === true ? 'Y' : 'N',
                    //item_result_final: $('#item_result_final').val(),
                    //site_remark: $('#site_remark').val(),
                    record_status: result.length > 0 ? result.data[0]['record_status'] : "",
                    import_status: result.length > 0 ? "" : "Not found In Acc+",
                    created_by: "SYSTEM",
                    created_date: new Date(),
                    updated_by: "SYSTEM",
                    updated_date: new Date()

                }
                dataImportSet.push({
                    trand_id: uuid,//0
                    item_stkcod: result.length > 0 ? result.data[0]['code'] : "-",//1
                    item_gbarcode: result.length > 0 ? result.data[0]['barcode'] : "-",//2
                    item_name: result.length > 0 ? result.data[0]['itemname'] : "-",//3
                    item_spcodes: result.length > 0 ? result.data[0]['spcodes'] : "-",//4
                    item_label: barcode,//5
                    source_site_code: "201 : VSK - Minburi",//6
                    destination_site_code: site_code,//7
                    site_code: 'site_code',//8
                    item_stockstatus: item_stockstatus,//9
                    item_status_site_setting: '',//10
                    stockstatus: 'stockstatus',//11
                    item_min_qty: item_min_qty,//12
                    item_max_qty: item_max_qty,//13
                    min_max: 'min_max',//14
                    item_stock_onhand:item_stock_onhand,//15
                    item_pending_po: result.length > 0 ? result.data[0]['item_pending_po'] : "-",//16
                    item_pack_code_rounding: result.length > 0 ? result.data[0]['PackCodeRounding'] : "-",//17
                    item_backlog_ctrl: '',           //18
                    record_status: result.length > 0 ? result.data[0]['record_status'] : "-",//19
                    item_formula: result.length > 0 ? result.data[0]['item_formula'] : "-",//20
                    item_result_final: '',//21
                    import_status: result.length > 0 ? "" : "Not found In Acc+",
                    created_by: "SYSTEM",
                    created_date: new Date(),
                    updated_by: "SYSTEM",
                    updated_date: new Date()
                });



                // Insert to firebase
                 fs.collection(collection).doc(item_data_import.trand_id).set(item_data_import).then(function () {

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
                         $.LoadingOverlay("hide");

                         $.List('import');

                         // setTimeout(function () {

                         //     oTable.destroy();
                         //     $.List('load');

                         //     item_data_import = [];

                         // }, 1000);

                         //$.addLogEvent(collection);

                     });

                 }).catch(function (error) {

                     toastr.error(error, 'Error writing document');
                     console.error("Error writing document: ", error);

                 });
            });

        }

        $.import_file_item = async function () {
            $('#file-upload').on("change", function () {
                var file_name = $('#file-upload')[0].files[0].name;
                var file = $('#file-upload')[0].files;
                // console.log("file ", $('#file-upload')[0].files);
                handleFileSelect(file);
                $('.custom-file label').text(file_name);
                //alert(file);
            });

            $('.btn-tbl_export').on('click', function (e) {
                e.preventDefault();
                //alert($(this).data("import"));
                data_excel_item = JSON.parse(data_excel_item);
                let site = $(this).data("import");
                if ($('#file-upload').val() != "") {
                    //console.log('data_excel_item', data_excel_item);
                    $.each(data_excel_item, function (key, obj) {
                        $.each(obj, function (key, value) {
                            if (key == "Barcode") {
                                //console.log(key + ": " + value);
                                $.MRP_ItemMaster_ToFirebase(value, site);

                            }
                        });
                    });

                } else {
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

                }
            });

        }
        var ExcelToJSON = function () {

            this.parseExcel = function (file) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                    workbook.SheetNames.forEach(function (sheetName) {
                        // Here is your object
                        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        var json_object = JSON.stringify(XL_row_object);
                        data_excel_item = json_object;
                    })
                };

                reader.onerror = function (ex) {
                    console.log(ex);
                };

                reader.readAsBinaryString(file);
            };
        };
        function handleFileSelect(files) {
            //console.log("files ", files);
            var xl2json = new ExcelToJSON();
            xl2json.parseExcel(files[0]);
        }

        $.MRP_Source_Site_Get = async function () {

            // Start LOV MRP DATASET
            let lov_site_dataset = [];
            let lov_mrp_query = fs.collection('lov_mrp').where("active_flag", "in", ["Y"]);

            lov_mrp_query.get().then(function (querySnapshot) {

                querySnapshot.forEach(function (doc) {

                    lov_site_dataset.push({ id: doc.data().lov_code + ' : ' + doc.data().lov1, text: doc.data().lov_code + ' : ' + doc.data().lov1 });

                });

                $('#source_site_code').select2({
                    width: '100%',
                    height: '40px',
                    dropdownParent: $("#modal-frm_data"),
                    placeholder: {
                        id: '0', // the value of the option
                        text: '--- Select Source Site ---'
                    },
                    data: lov_site_dataset,
                    templateResult: function (data) {
                        return data.text;
                    },
                    sorter: function (data) {
                        return data.sort(function (a, b) {
                            return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                        });
                    }
                });

                $('#source_site_code').val('201 : VSK - Minburi').trigger('change.select2').prop('disabled', true); //เลือกชั่วคราว

                $('#search_source_site_code').select2({
                    width: '100%',
                    height: '40px',
                    placeholder: {
                        id: '0', // the value of the option
                        text: '--- Select Source Site ---'
                    },
                    data: lov_site_dataset,
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

        }

        $.MRP_Desination_Site_Get = async function () {

            // Start LOV MRP DATASET
            let lov_site_dataset = [];
            let lov_mrp_query = fs.collection('lov_mrp').where("active_flag", "in", ["Y"]);

            lov_mrp_query.get().then(function (querySnapshot) {

                querySnapshot.forEach(function (doc) {
                    lov_site_dataset.push({ id: doc.data().lov_code + ' : ' + doc.data().lov1, text: doc.data().lov_code + ' : ' + doc.data().lov1 });
                });

                $('#destination_site_code').select2({
                    width: '100%',
                    height: '40px',
                    dropdownParent: $("#modal-frm_data"),
                    placeholder: {
                        id: '0', // the value of the option
                        text: '--- Select Destination Site ---'
                    },
                    data: lov_site_dataset,
                    templateResult: function (data) {
                        return data.text;
                    },
                    sorter: function (data) {
                        return data.sort(function (a, b) {
                            return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                        });
                    }
                }).on('select2:select', function (e) {

                    var data = e.params.data;

                    console.log(data.id)

                    if (data.id != '') {

                        $('#frm_data').find('#item_barcode').prop('disabled', false);

                    } else {

                        $('#frm_data').find('#item_barcode').prop('disabled', true);

                    }

                });

                $('#search_destination_site_code').select2({
                    width: '100%',
                    height: '40px',
                    placeholder: {
                        id: '0', // the value of the option
                        text: '--- Select Destination Site ---'
                    },
                    data: lov_site_dataset,
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

        }

        $.MRP_Formula_Get = async function () {

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

        }

        $.MRP_MINMAX_SUB1 = function (MinQty, MaxQty, StockOnHand, Pending_POorTransit) {

            let Answer = 0;

            if (MinQty > 0) {

                if (Number(StockOnHand) + Number(Pending_POorTransit) <= MinQty) {

                    if (MaxQty - StockOnHand - Pending_POorTransit > 0) {

                        Answer = MaxQty - StockOnHand - Pending_POorTransit
                        //console.log('Then MRP_MINMAX_SUB1 = ', Answer);

                    } else {
                        Answer = 0
                        //console.log('Else MRP_MINMAX_SUB1 = ', Answer);
                    }

                } else {

                    Answer = 0
                    // console.log('Else MRP_MINMAX_SUB1 = ', Answer);
                }
            }
            return Answer
        }

        $.MRP_MINMAX_SUB2 = function (MinQty, MaxQty, StockOnHand, Pending_POorTransit) {

            let Answer = 0;

            if (MinQty > 0) {

                if ((Number(StockOnHand) + Number(Pending_POorTransit)) <= MinQty) {

                    Answer = MaxQty - StockOnHand - Pending_POorTransit;
                    //console.log('Then MRP_MINMAX_SUB2 = ', Answer);

                } else {

                    Answer = 0;
                    //console.log('Else StockOnHand + Pending_POorTransit) <= MinQty MRP_MINMAX_SUB2 = ', Answer);
                }

            } else {
                //console.log('Else MinQty > 0 MRP_MINMAX_SUB2 = ', Answer);
                Answer = 0;
            }
            return Answer
        }

        $.MRP_MINMAX_SUB3 = function (MinQty, MaxQty, StockOnHand, Pending_POorTransit) {

            let Answer = 0;

            if (MinQty > 0) {
                if (StockOnHand + Pending_POorTransit <= MinQty) {
                    if ((MaxQty - StockOnHand - Pending_POorTransit) > 0) {
                        Answer = MaxQty - StockOnHand - Pending_POorTransit;
                        //console.log('Then MRP_MINMAX_SUB3 = ', Answer);

                    } else {
                        Answer = 0;
                        //console.log('Else (MaxQty - StockOnHand - Pending_POorTransit) > 0 MRP_MINMAX_SUB3 = ', Answer);
                    }
                } else {
                    Answer = 0;
                    // console.log('Else (StockOnHand + Pending_POorTransit <= MinQty) MRP_MINMAX_SUB3 = ', Answer);
                }
            } else {
                //console.log('Else MinQty > 0 MRP_MINMAX_SUB3 = ', Answer);
                Answer = 0;
            }
            return Answer
        }

        $.MRP_MINMAX_MAIN = function (MinQty, MaxQty, StockOnHand, Pending_POorTransit, PackCodeRounding) {

            let DestinationSiteActive = "YES";
            let ItemRecordActive = "YES";
            let AnswerFunc1 = 0;
            let AnswerFunc2 = 0;
            let AnswerFunc3 = 0;
            let Answer = 0;

            if (DestinationSiteActive === 'YES') {
                if (ItemRecordActive === "YES") {

                    AnswerFunc1 = $.MRP_MINMAX_SUB1(MinQty, MaxQty, StockOnHand, Pending_POorTransit);

                    if (AnswerFunc1 > (5 * PackCodeRounding)) {
                        AnswerFunc2 = $.MRP_MINMAX_SUB2(MinQty, MaxQty, StockOnHand, Pending_POorTransit);
                        Answer = $.MRP_MROUND(AnswerFunc2, PackCodeRounding) - PackCodeRounding;
                        //console.log("THEN OK")

                    } else {

                        AnswerFunc3 = $.MRP_MINMAX_SUB3(MinQty, MaxQty, StockOnHand, Pending_POorTransit);
                        Answer = AnswerFunc3;
                        //console.log("ELSE OK")
                    }
                } else {

                    Answer = 0;
                    console.log("ITEM NOT ACTIVE");
                }
            } else {
                Answer = 0;
                console.log("DESTINATION SITE NOT ACTIVE");
            }
            return Answer
        }

        $(document).ready(async function () {
            await $.init();
            //  console.log($.MRP_MINMAX_MAIN(3, 6, 0, 0, 4));
        });
    } else {
        window.location.assign('./login');
    }

});