'use strict';

let fs = firebase.firestore();
let collection = 'mrp_opt_purchaseplan';
let oTable, mode;
let inventorycode_dataset = [];
let invfrecode_dataset = [];

let purpod_get = 'http://localhost:49705/api/PR_POD_IV_GR_bySale';

let export_pod = 'http://localhost:49705/PurExport/Pur_Pod_Export';

let update_pod = 'http://localhost:49705/api/PK_PO_IV_bySale_Update';

let validator, table, options, item_action, item_id;
$.init = function () {

    $('.fc-datepicker').datepicker({
        dateFormat: 'dd/mm/yy',
        autoclose: true,
    });

    $('#btn-export').off('click').on('click', function (evt) {

        evt.preventDefault();

        $(this).on('click', function (evt) {
            evt.preventDefault();
        });

        var POdate_start = $('#POdate').val() !== '' ? moment($('#POdate').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm') : moment().add(-365, 'days').format('YYYY-MM-DD');
        var POdate_end = $('#POdate').val() !== '' ? moment($('#POdate').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm') : moment().add(1, 'days').format('YYYY-MM-DD');

        var receive_date_est_start = $('#po_date').val() !== '' ? moment($('#po_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm') : '';
        var receive_date_est_end = $('#po_date').val() !== '' ? moment($('#po_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm') : '';

        var GR_date_start = $('#GR_date').val() !== '' ? moment($('#GR_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm') : '';
        var GR_date_end = $('#GR_date').val() !== '' ? moment($('#GR_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm') : '';



        window.location = export_pod +
            '?PO_no=' + $('#PO_no').val() +
            '&item_code=' + $('#item_code').val() +
            '&item_spcodes=' + $('#item_spcodes').val() +
            '&POdate_start=' + POdate_start +
            '&POdate_end=' + POdate_end +
            '&receive_date_est_start=' + receive_date_est_start +
            '&receive_date_est_end=' + receive_date_est_end +
            '&GR_no=' + $('#GR_no').val() +
            '&GR_date_start=' + GR_date_start +
            '&GR_date_end=' + GR_date_end +
            '&pr_receive_type=' + $('#pr_receive_type').val() +
            '&PO_type=' + ($('#PO_type').val() === '' ? '' : $('#PO_type').val()) +
            '&StockStatus=' + ($('#StockStatus').val() === '' ? '' : $('#StockStatus').val()) +
            '&PO_Panding=' + $('#PO_Panding').val() +
            '&Vendor_code=' + $('#vendor_code').val() +
            '&gbarcode=' + $('#gbarcode').val() +
            '&Buyer_Po_User=' + $('#Buyer_Po_User').val() +
            '&mode=' + 'Search';

    });

    $('.date-picker').daterangepicker({
        autoUpdateInput: false,
        showDropdowns: true,
        opens: "right",
        locale: { cancelLabel: 'Clear' },
    }, function (start, end, label) {
        //console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });

    $('.date-picker').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('DD/MM/YYYY') + '-' + picker.endDate.format('DD/MM/YYYY'));
    });

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

    $.LoadingOverlay("show", {
        image: "assets/loading-mb-icon.png",
        //image: "assets/PikPng.png",
        imageAnimation: true,
        imageResizeFactor: 2,
        text: " loading... ",
        textColor: 'DodgerBlue'
        //fontawesome: "fas fa-dragon"
    });

    $.List();

    $('#frm_search').submit(async function (e) {

        e.preventDefault();

        $.LoadingOverlay("show", {
            image: "assets/loading-mb-icon.png",
            //image: "assets/PikPng.png",
            imageAnimation: true,
            imageResizeFactor: 2,
            text: " loading... ",
            textColor: 'DodgerBlue'
            //fontawesome: "fas fa-dragon"
        });

        oTable.destroy();

        mode = 'Search'

        $.List();

    });

};

$.List = async function () {


    console.log('Index function Start', new Date());

    // oTable = $('#tbl-list').DataTable();

    let url = new URL(purpod_get);

    var POdate_start = $('#POdate').val() !== '' ? moment($('#POdate').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') : moment().add(-365, 'days').format('YYYY-MM-DD');
    var POdate_end = $('#POdate').val() !== '' ? moment($('#POdate').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') : moment().add(1, 'days').format('YYYY-MM-DD');

    var receive_date_est_start = $('#po_date').val() !== '' ? moment($('#po_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') : '';
    var receive_date_est_end = $('#po_date').val() !== '' ? moment($('#po_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') : '';

    var GR_date_start = $('#GR_date').val() !== '' ? moment($('#GR_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm') : '';
    var GR_date_end = $('#GR_date').val() !== '' ? moment($('#GR_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm') : '';

    if ($('#POdate').val() === '' && $('#po_date').val() === '' && $('#GR_date').val() === '') {
             
    };


    url.search = new URLSearchParams({

        PO_no: $('#PO_no').val(),
        item_code: $('#item_code').val(),
        item_spcodes: $('#item_spcodes').val(),
        POdate_start: POdate_start,
        POdate_end: POdate_end,
        receive_date_est_start: receive_date_est_start,
        receive_date_est_end: receive_date_est_end,
        GR_no: $('#GR_no').val(),
        GR_date_start: GR_date_start,
        GR_date_end: GR_date_end,
        pr_receive_type: $('#pr_receive_type').val(),
        PO_type: $('#PO_type').val() === '' ? '' : $('#PO_type').val(),
        StockStatus: $('#StockStatus').val() === '' ? '' : $('#StockStatus').val(),
        PO_Panding: $('#PO_Panding').val(),
        Vendor_code: $('#vendor_code').val(),
        gbarcode: $('#gbarcode').val(),
        Buyer_Po_User: $('#Buyer_Po_User').val(),
        mode: mode
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {
        //oTable.destroy();

        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

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


        } else {
            oTable = $('#tbl-list').DataTable({
                data: result.data,
                //scrollX: true,
                //scrollCollapse: true,
                // autoWidth: true,
                paging: true,
                columns: [
                    {
                        title: "<span style='font-size:11px;'>STK CODE</span>",
                        data: "stkcod",
                        width: "70px",
                        visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //0  
                    {
                        title: "<span style='font-size:11px;'>Gbarcode</span>",
                        data: "gbarcode",
                        width: "70px",
                        visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>item spcodes</span>",
                        data: "item_spcodes",
                        width: "70px",
                        visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>item code</span>",
                        data: "item_code",
                        class: "tx-center",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>item</span>",
                        data: "item_name",
                        class: "tx-center",
                        width: "200px",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;  color:DarkGreen;">' + row.stkcod + '</span>' + '</br >' + '<span style="font-size:11px;  color:OrangeRed;">' + row.item_spcodes + '</span>' + ' / ' + '<span style="font-size:11px; color:DodgerBlue;">' + row.item_code + '</span>' + '</br >' + '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>Stock Status</span>",
                        data: "StockStatus",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data == 'PLAN') {
                                return '<span class="badge badge-primary">PLAN</span>';
                            } else if (data == 'BACKLOG') {
                                return '<span class="badge badge-danger">BACKLOG</span>';
                            } else if (data == 'STOCK') {
                                return '<span class="badge badge-success">STOCK</span>';
                            } else {
                                return '-';
                            }
                        }
                    }, //0 
                    {
                        title: "<span style='font-size:11px;'>PO_no</span>",
                        data: "PO_no",
                        width: "70px",
                        class: "tx-center",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //0 
                    {
                        title: "<span style='font-size:11px;'>PO</span>",
                        data: "POdate",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (moment(data).format('DD/MM/YYYY') === '01/01/0001') {
                                return '-';
                            } else {
                                return '<span style="font-size:11px;  color:SaddleBrown;">' + row.PO_no + '</span>' + '</br >' + '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '<span/>';
                            }
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>PO_qty</span>",
                        data: "PO_qty",
                        class: "tx-center",
                        width: "20px",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>Vendor code</span>",
                        data: "Vendor_code",
                        class: "tx-center",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //0 
                    {
                        title: "<span style='font-size:11px;'>Vendor</span>",
                        data: "Vendor_name",
                        class: "tx-center",
                        width: "100px",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;  color:SaddleBrown;">' + row.Vendor_code + '</span>' + '</br >' + '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>PO/CUS Code.</span>",
                        data: "POdate",
                        class: "tx-center",
                        visible: false,
                        render: function (data, type, row, meta) {
                            //return '<span style="font-size:11px;">' + data + '</span>';
                            if (moment(data).format('DD/MM/YYYY') === '01/01/0001') {

                                return '-';

                            } else {

                                return '<p style="color:Brown; font-size:11px;">' + row.invcustpo + '<p/>' + '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '<span/>';
                            }
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>Buyer PO User</span>",
                        data: "Buyer_Po_User",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>Receive Date(est.)</span>",
                        data: "pr_receive_date",
                        class: "tx-center",
                        visible: false,
                        render: function (data, type, row, meta) {

                            if (data === '0001-01-01T00:00:00') {

                                return '-';

                            } else {

                                return '<span style="font-size:11px" >' + moment(data).format('DD/MM/YYYY') + '<span/>';
                            }
                        }
                    }, //0 
                    {
                        title: "<span style='font-size:11px;'>Est.</span>",
                        data: "podatesend",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            //return '<span style="font-size:11px;">' + data + '</span>';


                            return '<span style="font-size:11px; color:blue; ">' + moment(data).format('DD/MM/YYYY') + '<span/>' + '</br>' + '<span style="font-size:11px; color:red;">' + (row.pr_receive_date !== '0001-01-01T00:00:00' ? moment(row.pr_receive_date, 'YYYY-MM-DD').format('DD/MM/YYYY') : '-') + '</span>';

                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>GR NO</span>",
                        data: "GR_no",
                        class: "tx-center",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>GR</span>",
                        data: "GR_date",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (moment(data).format('DD/MM/YYYY') === '01/01/0001') {
                                return '-';
                            } else {
                                return '<span style="font-size:11px;  color:SaddleBrown;">' + row.GR_no + '</span>' + '</br >' + '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '<span/>';
                            }
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>GR_qty</span>",
                        data: "GR_qty",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>PO qty pending</span>",
                        data: "PO_qty_pending",
                        class: "tx-center",
                        width: "40px",
                        render: function (data, type, row, meta) {
                            if (data < 0) {
                                return '<span style="font-size:11px; color:blue; font-weight:900;" >' + data + '</span>';
                            } else if (data > 0) {
                                return '<span style="font-size:11px; color:red; font-weight:900;" >' + data + '</span>';
                            } else {
                                return '<span style="font-size:11px; color:green; font-weight:900;" >' + data + '</span>';
                            }
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>Order</span>",
                        data: "WH",
                        class: "tx-center",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>Status</span>",
                        data: "pr_receive_type",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data == '2') {
                                return '<span class="badge badge-primary">BACKORDER</span>';
                            } else if (data == '1') {
                                return '<span class="badge badge-warning">PENDING</span>';
                            } else if (data == '3') {
                                return '<span class="badge badge-danger">Cancel</span>';
                            } else {
                                return '-';
                            }
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>remark</span>",
                        data: "pr_receive_comment",
                        width: "120px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data == null) {
                                return '';
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //0
                    {
                        title: "<span style='font-size:11px;'>invcustpo</span>",
                        data: "invcustpo",
                        visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //0

                ],

                //"order": [[0, "desc"]],
                "initComplete": function (settings, json) {

                    $.LoadingOverlay("hide");

                    mode = '';

                    $.contextMenu({
                        selector: '#tbl-list tbody tr',
                        callback: async function (key, options) {

                            let data = oTable.row(this).data();
                            let citem = {
                                stkcod: data['stkcod'],
                                itemcode: data['item_code'],
                                item_name: data['item_name'],
                                StockStatus: data['StockStatus'],
                                PO_no: data['PO_no'],
                                PO_qty: data['PO_qty'],
                                Vendor_code: data['Vendor_code'],
                                Vendor_name: data['Vendor_name'],
                                POdate: data['POdate'],
                                Buyer_Po_User: data['Buyer_Po_User'],
                                Receive_date_est: data['Receive_date_est'],
                                GR_no: data['GR_no'],
                                GR_date: data['GR_date'],
                                GR_qty: data['GR_qty'],
                                PO_qty_pending: data['PO_qty_pending'],
                                WH: data['WH'],
                                pr_receive_date: data['pr_receive_date'],
                                pr_receive_type: data['pr_receive_type'],
                                pr_receive_comment: data['pr_receive_comment'],
                                invcustpo: data['invcustpo'],
                                podatesend: data['podatesend'],
                                gbarcode: data['gbarcode']
                            };

                            $('#modal-frm_data').modal({

                                keyboard: false,
                                backdrop: 'static'

                            });

                            if (key === 'view') {

                                $.Details(citem);

                            } else if (key === 'edit') {

                                await $.Details(citem);
                                await $.Edit(citem);

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
        }
    })

};



$.Details = async function (citem) {

    console.log('Details', citem);
    console.log('Details Start', new Date());
    console.log(moment(GR_date, 'DD/MM/YYYY', true).format());

    $('.btn-save_form').hide();

    $('#frm_data').find('#PO_no').val(citem['PO_no']).prop("disabled", true);
    $('#frm_data').find('#POdate').val(moment(citem['POdate'], 'YYYY-MM-DD').format('DD/MM/YYYY')).prop("disabled", true);
    $('#frm_data').find('#item_code').val(citem['itemcode']).prop("disabled", true);
    $('#frm_data').find('#item_name').val(citem['item_name']).prop("disabled", true);
    $('#frm_data').find('#Buyer_Po_User').val(citem['Buyer_Po_User']).prop("disabled", true);
    $('#frm_data').find('#GR_no').val(citem['GR_no']).prop("disabled", true);
    $('#frm_data').find('#GR_date').val(citem['GR_date'] !== '0001-01-01T00:00:00' ? moment(citem['GR_date'], 'YYYY-MM-DD').format('DD/MM/YYYY') : '').prop('readonly', true);
    $('#frm_data').find('#est_date').val(citem['pr_receive_date'] !== '0001-01-01T00:00:00' ? moment(citem['pr_receive_date'], 'YYYY-MM-DD').format('DD/MM/YYYY') : '').prop("disabled", true);
    $('#frm_data').find('#pr_receive_type').val(citem['pr_receive_type']).prop("disabled", true);
    $('#frm_data').find('#pr_receive_comment').val(citem['pr_receive_comment']).prop("disabled", true);

};

$.Edit = async function (citem) {

    console.log('Edit Start', new Date());



    $('.btn-save_form').show();
    $('.btn-save_form').prop('disabled', false);

    $('#frm_data').find('#PO_no').prop("disabled", true);
    $('#frm_data').find('#POdate').prop("disabled", true);
    $('#frm_data').find('#item_code').prop("disabled", true);
    $('#frm_data').find('#item_name').prop("disabled", true);
    $('#frm_data').find('#Buyer_Po_User').prop("disabled", true);
    $('#frm_data').find('#GR_no').prop("disabled", true);
    $('#frm_data').find('#GR_date').prop('readonly', true);
    $('#frm_data').find('#est_date').prop("disabled", false);
    $('#frm_data').find('#pr_receive_type').prop("disabled", false);
    $('#frm_data').find('#pr_receive_comment').prop("disabled", false);

    $('#frm_data').parsley().on('form:submit', function () {

        $('.btn-save_form').prop('disabled', true);

        // Model & Repo
        let edit_data = {
            PO_no: $('#frm_data').find('#PO_no').val(),
            item_code: $('#frm_data').find('#item_code').val(),
            GR_no: $('#frm_data').find('#GR_no').val(),
            pr_receive_type: $('#frm_data').find('#pr_receive_type').val(),
            pr_receive_comment: $('#frm_data').find('#pr_receive_comment').val(),
            Receive_date_est: moment($('#frm_data').find('#est_date').val(), 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm'),
            updated_by: "SYSTEM"
        };

        var params = [];
        for (const i in edit_data) {
            params.push(i + "=" + encodeURIComponent(edit_data[i]));
        }

        fetch(update_pod, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            // mode: 'no-cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            body: params.join("&"),
        }).then(data => {

            toastr.success('Save Successfully!', async function () {

                mode = 'Search';

                await $.LoadingOverlay("show", {
                    image: "assets/loading-mb-icon.png",
                    //image: "assets/PikPng.png",
                    imageAnimation: true,
                    imageResizeFactor: 2,
                    text: " loading... ",
                    textColor: 'DodgerBlue'
                    //fontawesome: "fas fa-dragon"
                });

                await oTable.destroy();

                await $.List();

                await setTimeout(function () {

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
    //$.LoadingOverlay("show");
});

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        console.log(user);

    } else {

        window.location.assign('./login');

    }

});