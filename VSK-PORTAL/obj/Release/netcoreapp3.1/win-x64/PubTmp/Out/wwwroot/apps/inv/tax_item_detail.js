'use strict';

let fs = firebase.firestore();
let oTable, oTable_history, oTablePk, name, oTable_inv, branch, cus_branch, citem;


const url_api_master = 'http://192.168.1.247/vsk-api-acc/';
//const url_app_ui = "http://192.168.1.247/intranet/public/inv-app/";
//const url_api_local = "http://192.168.1.247/vsk-api-inv/";

const url_api_local = "http://localhost:49705/";
const url_app_ui = "http://localhost:57916/inv-app/";

let url_report_inv = 'http://192.168.1.159/ReportServer/Pages/ReportViewer.aspx?%2fINV-Report%2fReport_tax1&rs:Command=Render'
let url_report_qo = 'http://192.168.1.159/ReportServer/Pages/ReportViewer.aspx?%2fINV-Report%2fReport_Qo&rs:Command=Render'

const company_get = url_api_local + 'v1/company_get';
const url_invfile_get = url_api_local + 'v1/inv_invfile_get';
const url_invtra_get = url_api_local + 'v1/inv_invtra_get';
const customer_select2_get = url_api_master + 'api/ACC/VSK_Emmas_Select2_GET';
const customer_get = url_api_master + 'api/ACC/VSK_Emmas_GET';
const rdfile_get = url_api_local + 'v1/rdfile_get';
const inv_header_get = url_api_local + 'v1/inv_header_get';
const inv_items_get = url_api_local + 'v1/inv_items_get';
const inv_pk_get = url_api_local + 'v1/inv_pk_number_get';
const inv_items_history = url_api_local + 'v1/inv_items_history';
const inv_header_create = url_api_local + 'v1/inv_header_create';
const inv_header_sum = url_api_local + 'v1/inv_header_sum';
const inv_header_update = url_api_local + 'v1/inv_header_update';
const inv_header_change = url_api_local + 'v1/inv_header_change_inv';
const inv_items_create = url_api_local + 'v1/inv_items_create';
const inv_items_update = url_api_local + 'v1/inv_items_update';
const inv_items_delete = url_api_local + 'v1/inv_items_delete';
const inv_pk_check = url_api_local + 'v1/inv_pk_check';
const inv_pk_create = url_api_local + 'v1/inv_pk_create';
const inv_pk_delete = url_api_local + 'v1/inv_pk_delete';
const url_emlocation_get = url_api_local + 'v1/em_location';
const tax_number_get = url_api_local + 'v1/inv_book_taxnum_get';
const tax_number_update = url_api_local + 'v1/inv_book_taxnum_update';
const product_select = url_api_local + 'v1/product_select';

const urlParams = new URLSearchParams(window.location.search);
const currentDate = new Date();
const convertDate = moment(currentDate).add(543, 'year').format("YYMM")
let pricenet_all = 0, invsumtt = 0, invnet = 0, invvat = 0, trnprnet = 0, trnprice = 0, trnamo = 0, price_bf_dis = 0;
let head_id, spcode = '', gbarcode = '', stkcod = '';


$.init = async function () {

    $('#tbl-list').DataTable();
    $.Saletra_Get('');

    // Datepicker
    $('.fc-datepicker').datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        dateFormat: 'dd/mm/YYYY'
    });
    $('#datepickerNoOfMonths').datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        numberOfMonths: 2
    });
    $('.combobox').combobox();

    $("input.numbers").keypress(function (event) {
        return isNumber(event, this)
    });

    $('.emmas').select2({
        tags: true,
        ajax: {
            url: customer_select2_get,
            dataType: 'json',
            width: 'resolve',
            dropdownAutoWidth: true,
            minimumInputLength: 2,
            minimumResultsForSearch: 50,
            data: function (params) {
                var query = {
                    search: typeof params.term !== 'undefined' ? params.term : ' ',
                }
                //console.log(params);
                return query;
            },
            matcher: function (params, data) {
                return matchStart(params, data);
            },
            processResults: function (resulte, search) {
                return {
                    results: $.map(resulte.data, function (item) {
                        return {
                            text: item.text,
                            id: item.id
                        }
                    })
                };
            },
        }
    });

    $('#co_name').on('change', function () {
        let co_branch = $(this).children("option:selected").data('branch');
        $('#co_branch').val(co_branch);
    })

    $('#emmas').on('change', function () {
        if ($(this).val() != '' || $(this).val() != null) {
            $.Customer_Get('branch', $(this).val());
        }
    })

    $('#emlocation').on('change', function () {
        if ($(this).val() != '' || $(this).val() != null) {
            $.Customer_Get('delivery', $(this).val());
        }
    })

    $(".clear_btn").on('click', function () {
        $('#frm_header select').val('').trigger('change');
        $("#co_name option").removeAttr("selected").trigger('change');
        $("#co_name").val('').trigger('change');
        $('.btn-save').prop('disabled', true);
        $.Saletra_Get('');

    })

    $('#save').on('click', function (e) {
        e.preventDefault();
        $.Create();
    });

    $('#update').on('click', function (e) {
        e.preventDefault();
        $.Update();
    });

    //$('#add-item').on('click', function () {
    //    $('.btn-update_form').addClass('hide');
    //    $('.btn-save_form').removeClass('hide');

    //    $('#frm_data .can-edit').prop('readonly', false);
    //    $('#frm_data .cant-edit').prop('readonly', true);
    //    $('#frm_data input').val('');

    //    $.Create_newitem();

    //});

    //$('#change_inv').on('click', function (e) {
    //    e.preventDefault();
    //    $.Change_inv();
    //})

    $.NewItemForm();

    if (urlParams.get('act') == 'edit') {

        $('#pk_number').val(urlParams.get("pk")).prop('readonly', true).trigger('change');
        $('#tax_number').addClass('hide');
        $('#tax_number_get').removeClass('hide');
        $('#tax_number_get').val(urlParams.get("inv")).trigger('change');
        $.Header_Get();
        $('.local-menu').html('/ แก้ไขใบกำกับภาษี');
        $('.btn-change').addClass('hide');
        $('#update').removeClass('hide');
        $('#save').addClass('hide');
        $('#btn-export').removeClass('hide');

        $('.pk_number').addClass('hide');
        $('.inv_tax_jobno').removeClass('hide');
        $('#add-pk').prop('disabled', false)
        $('.ab_pk').removeClass('hide')

        $.pk_modal();
        $.CreateNewPk();

    } else if (urlParams.get('act') == 'add') {
        $('#tax_number').removeClass('hide');
        $('#tax_number_get').addClass('hide');
        $('.local-menu').html('/ เพิ่มใบกำกับภาษี');
        $('.btn-change').addClass('hide');
        $('#update').addClass('hide');
        $('#save').removeClass('hide');
        $('#btn-export').addClass('hide');
        $('.pk_number').removeClass('hide');
        $('.inv_tax_jobno').addClass('hide');
        $('#add-pk').prop('disabled', true)
        $('.ab_pk').addClass('hide')

        $('#pk_number').keyup(async function (e) {

            e.preventDefault();
            $(this).val($(this).val().toUpperCase());

            if ($(this).val().length === 12) {

                if (e.keyCode >= 65 && e.keyCode <= 105) {
                    //$("#global-loader").fadeIn("slow");
                    let dup = CheckPk($(this).val());
                    if (dup == 0) {
                        $.Header_Get();
                    } else {
                        Swal.fire(
                            'PK นี้มีอยู่แล้ว',
                            'กรุณาลองใหม่อีกครั้ง!',
                            'info'
                        )
                    }
                }

            } else {

                $('#frm_header input:not(input#pk_number) , #frm_header select').val('').trigger('change');

            }

        });
    }

    $('#add-item').on('click', function (e) {
        e.preventDefault();
        $.Add_row()
    })

};

$.Saletra_Get = async function (number) {


    fetch(url_invtra_get + '?number=' + number).then(function (response) {

        return response.json();

    }).then(function (result) {
        trnprice = 0;
        trnamo = 0;

        $.each(result.data, function (index, item) {
            let priceit = (item['trnprice'] * item['trnqty']);
            trnprice += priceit
            trnamo += Number(item['trnamo'])

        });


        if (result.length > 0) {

            oTable = $('#tbl-list-item').DataTable({
                data: result.data,
                paging: false,
                info: false,
                searching: false,
                autoWidth: true,
                destroy: true,
                //scrollX: true,
                //scrollY: "410px",
                scrollCollapse: true,
                columns: [
                    {
                        title: "<span style='font-size:11px;'>ลำดับ</span>",
                        class: "tx-center",
                        width: "50px",
                        render: function (data, type, row, meta) {
                            let partno = row.spcodes != null ? row.spcodes : '-';
                            let barcord = row.gbarcode != null ? row.gbarcode : '-';

                            return (meta.row + 1);
                        }

                    },
                    {
                        title: "<span style='font-size:11px;'>Item</span>",
                        width: "300px",
                        class: "tx-center",
                        data: "item",
                        render: function (data, type, row, meta) {
                            let data_row = meta.row + 1
                            let data_json = JSON.stringify(row)
                            let stkcod = row.stkcod != null ? row.stkcod + ' / ' : '';
                            let stkname = row.stkname != null ? row.stkname : '';
                            let gbarcode = row.gbarcode != null ? ' / ' + row.gbarcode + ' / ' : '';
                            let spcodes = row.spcodes != null ? row.spcodes : '';
                            let item_code = stkcod + stkname + gbarcode + spcodes

                            return '<span data-json="' + data_json + '" id="itemcode-' + data_row + '">' + item_code + '</span>';
                        }

                    },
                    {
                        title: "<span style='font-size:11px;'>หน่วยนับ</span>",
                        width: "70px",
                        class: "tx-center",
                        data: "stkunit",
                        render: function (data, type, row, meta) {
                            let stkcod = row.stkcod != null ? row.stkcod : '-';
                            //let data_row = JSON.stringify(row)
                            let data_row = meta.row + 1
                            return '<span>' + data + '</span>'

                        }

                    },
                    {
                        title: "<span style='font-size:11px;'>แท้ห้าง/อื่นๆ</span>",
                        width: "70px",
                        class: "tx-center",
                        data: "stktype",
                        render: function (data, type, row, meta) {
                            return '<span>' + data + '</span>'
                        }

                    },
                    {
                        title: "<span style='font-size:11px;'>จำนวนหน่วย</span>",
                        width: "70px",
                        class: "tx-center",
                        data: "trnqty",
                        render: function (data, type, row, meta) {
                            let stkcod = row.stkcod != null ? row.stkcod : '-';
                            let data_json = JSON.stringify(row)
                            let data_row = meta.row + 1
                            return "<span data-json='" + data_json + "' data-row='" + data_row + "' class='discount trnqty' id='trnqty-" + data_row + "' name='trnqty' >" + data + "<span>"
                            //    return "<input type='text' data-json='" + data_json + "' value='" + data + "' data-row='" + data_row + "' class='form-control discount trnqty' id='trnqty-" + data_row + "' name='trnqty' >"
                        }

                    },
                    {
                        title: "<span style='font-size:11px;'>ราคา/หน่วย</span>",
                        width: "70px",
                        class: "tx-center",
                        data: "trnprice",
                        render: function (data, type, row, meta) {
                            let stkcod = row.stkcod != null ? row.stkcod : '-';
                            let data_row = meta.row + 1
                            let data_json = JSON.stringify(row)
                            let discout = ((row.trnprice * row.trnqty) * (row.disone) / 100) + ((row.trnprice * row.trnqty) * (row.distwo) / 100)
                            return "<span class='trnprice' data-json='" + data_json + "' id='trnprice-" + data_row + "' data-dis='" + discout + "' data-row='" + data_row + "'>" + data + "</span>" + "<span class='hide dis' id='dis-" + data_row + "' data-json='" + data_json + "' name='dis-" + (meta.row + 1) + "' >" + discout + "</span>"
                        }

                    },
                    //{
                    //    title: "<span style='font-size:11px;'>ส่วนลด</span>",
                    //    visible: false,
                    //    class: "tx-center",
                    //    data: "trnprice",
                    //    render: function (data, type, row, meta) {
                    //        let stkcod = row.stkcod != null ? row.stkcod : '-';
                    //        let data_row = JSON.stringify(row)
                    //        let discout = ((row.trnprice * row.trnqty) * (row.disone) / 100) + ((row.trnprice * row.trnqty) * (row.distwo) / 100)
                    //        return "<span class='trnprice_it' id='trnprice-" + stkcod + "' data-row='" + data_row + "'>" + discout + "</span>"
                    //    }

                    //},
                    {
                        title: "<span style='font-size:11px;'>ส่วนลด ระดับ 1 (%)</span>",
                        width: "70px",
                        class: "tx-center",
                        data: "disone",
                        render: function (data, type, row, meta) {
                            let stkcod = row.stkcod != null ? row.stkcod : '-';
                            let data_row = meta.row + 1
                            let data_json = JSON.stringify(row)
                            return "<span data-json='" + data_json + "' value='" + data + "' data-row='" + data_row + "' class='discount' id='discount1-" + data_row + "' name='discount1' >" + data + "</span>"
                            //    return "<input type='text' data-json='" + data_json + "' value='" + data + "' data-row='" + data_row + "' class='form-control discount' id='discount1-" + data_row + "' name='discount1' >"
                        }
                    },
                    {
                        title: "<span style='font-size:11px;'>ส่วนลด ระดับ 2 (%)</span>",
                        width: "70px",
                        class: "tx-center",
                        data: "distwo",
                        render: function (data, type, row, meta) {
                            let stkcod = row.stkcod != null ? row.stkcod.trim() : '-';
                            let data_json = JSON.stringify(row)
                            let data_row = meta.row + 1
                            return "<span data-json='" + data_json + "' data-row='" + data_row + "' class='discount' id='discount2-" + data_row + "' name='discount2' >" + data + "</span>"
                            //    return "<input type='text' data-json='" + data_json + "' value='" + data + "' data-row='" + data_row + "' class='form-control discount' id='discount2-" + data_row + "' name='discount2' >"
                        }

                    },
                    {
                        title: "<span style='font-size:11px;'>จำนวนเงิน</span>",
                        class: "tx-center ",
                        width: "70px",
                        data: "trnamo",
                        render: function (data, type, row, meta) {
                            let stkcod = row.stkcod != null ? row.stkcod.trim() : '-';
                            let data_json = JSON.stringify(row)
                            let data_row = meta.row + 1
                            //let data_row = JSON.stringify(row)
                            //return '<span data-row="' + data_row +'" id="pricenet-' + barcord + '" >' + pricenet + '</span>'
                            return "<span class='pricenet' data-json='" + data_json + "' data-row='" + data_row + "' id='pricenet-" + data_row + "' >" + data + "</span>"
                        }
                    },
                    {
                        title: "<span style='font-size:11px;'>Action</span>",
                        class: "tx-center",
                        visible: false,
                        width: "100px",
                        render: function (data, type, row, meta) {
                            let data_row = meta.row + 1
                            let data_json = JSON.stringify(row)
                            return ''
                            //return '<button type="button" disabled style="margin: .25rem .125rem;" data-row="' + data_row + '"  class="btn btn-success">Save</button>' + '<button type="button" disabled style="margin: .25rem .125rem;" data-row="' + data_row + '" class="btn btn-danger">Delete</button>'
                        }

                    }
                ],
                //"order": [[1, "desc"]],
                "initComplete": function (settings, json) {

                    let price_discount_file = (trnprice - trnamo);

                    //price_bf_dis = $('.trnqty', val).html();
                    //alert('trnprice '+trnprice);
                    //alert('trnamo ' + trnamo);

                    $('#price_total').html(numberWithCommas(trnamo.toFixed(2))).trigger('change');
                    $('#trade_discount').html(numberWithCommas(price_discount_file.toFixed(2))).trigger('change');
                    $('#discount_total').html(numberWithCommas(invnet.toFixed(2))).trigger('change');
                    $('#vat_total').html(numberWithCommas(invvat.toFixed(2))).trigger('change');
                    $('#price_net_total').html(numberWithCommas(invsumtt.toFixed(2))).trigger('change');

                    //$('.chg_sum').on("keyup change", function () {

                    //    let discount_bath = 0, discount_per = 0;

                    //    let depen = $('#deposit').val() != '' ? $('#deposit').val() : '0';
                    //    depen = parseInt(depen);

                    //    let price_discount_all = (price_discount_file + discount_bath + discount_per)

                    //    let invnet_all = (invnet - (discount_bath + discount_per));

                    //    let vat_all = ((invnet_all * 7) / 100);

                    //    let at_invsumtt = (invnet_all + vat_all - depen)

                    //    $('#trade_discount').html(numberWithCommas(price_discount_all.toFixed(2))).trigger('change');
                    //    $('#discount_total').html(numberWithCommas(invnet_all.toFixed(2))).trigger('change');
                    //    $('#vat_total').html(numberWithCommas(vat_all.toFixed(2))).trigger('change');
                    //    $('#deposit_total').html(numberWithCommas(depen.toFixed(2))).trigger('change');
                    //    $('#price_net_total').html(numberWithCommas(at_invsumtt.toFixed(2))).trigger('change');

                    //})

                },

            });


        }

    });

}

$.EmLocation_Get = async function (code) {


    fetch(url_emlocation_get + '?code=' + $('#emmas').val()).then(function (response) {

        return response.json();

    }).then(function (result) {
        if (result.length > 0) {
            $.each(result.data, function (key, val) {

                $('#emlocation').val(val['emlocation']);
            });

        } else {

        }
    });

}

$.Salefile_Get = async function () {
    fetch(url_invfile_get + '?number=' + $('#pk_number').val()).then(function (response) {

        return response.json();

    }).then(function (result) {
        if (result.length > 0) {
            $('#save').prop('disabled', false);

            let qo_num = Math.floor(Math.random() * 10000 + 1);
            $('#qo_num').val('QUB' + convertDate + qo_num);

            //if (urlParams.get('act') == 'editpk') {
            //    let inv_number = urlParams.get("inv");
            //    $('#tax_number').val(inv_number);
            //} 

            invsumtt = 0
            invnet = 0
            invvat = 0

            $.each(result.data, function (key, val) {
                $('#invdate').val(moment(val['invdate'].substring(0, 10), 'YYYY/MM/DD').format('DD/MM/YYYY'));
                $('#userid').val(val['userid']);
                $("[name='invdue']").val(val['invdue'] + ' วัน');
                $('#clame').val(val['clame']);
                $('#tsno').val(val['tsno']);
                $('#discount').val(val['discount']);
                let std_date = moment(val['invdate'])
                let invdue = parseInt(val['invdue']);
                let due_date = std_date.add(invdue, 'days');
                $('#due_date').val(due_date.format('DD/MM/YYYY'));
                let invcode = val['invcode']
                let optionText = val['invcode'] + ' ' + val['invname']
                let branchcode = 'VSK'
                $("#co_name option[data-branchcode=" + branchcode + "]").attr("selected", "selected").trigger('change');
                $('#emmas').append(`<option value="${invcode}">${optionText}</option>`);
                $('#emmas').val(val['invcode']).trigger('change');
                invsumtt = val['invsumtt'];
                invnet = val['invnet'];
                invvat = val['invvat'];

                if (invvat == '' || invvat == 0) {
                    $('#vat').val('0');
                } else {
                    $('#vat').val('7');
                }


                //    $.EmLocation_Get(val['invcode']);
            });

            $.Saletra_Get($('#pk_number').val());

        } else {
            if (result.status === 'Error') {

                $.LoadingOverlay("hide");

                $("#global-loader").fadeOut("slow");

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

                //alert('no data')
                Swal.fire({
                    icon: 'info',
                    title: 'Data Not Found',
                    text: 'Please Check Your PK Number !',
                    //footer: '<a href>Why do I have this issue?</a>'
                }).then((result) => {
                    if (result.isConfirmed) {

                        location.reload();

                    }
                })
            }

        }
        return false;

    });
    return false;
}

$.itemGet = async function (tex_inv_hearder_id) {
    //console.log('itemGet')
    let pk_number = urlParams.get('pk')
    let inv_items_get_api = new URL(inv_items_get);

    inv_items_get_api.search = new URLSearchParams({
        //pk_number: pk_number,
        tex_inv_hearder_id: tex_inv_hearder_id,
        record_status: '1',
        mode: 'Search',
    });

    fetch(inv_items_get_api).then(function (response) {

        return response.json();

    }).then(function (result) {
        oTable = $('#tbl-list-item').DataTable({
            data: result.data,
            scrollCollapse: true,
            paging: false,
            info: false,
            destroy: true,
            searching: false,
            autoWidth: true,
            //scrollX: true,
            //scrollY: "410px",
            scrollCollapse: true,
            columns: [
                {
                    title: "<span style='font-size:11px;'>ลำดับ</span>",
                    class: "tx-center",
                    width: "50px",
                    render: function (data, type, row, meta) {
                        return (meta.row + 1);
                    }

                },
                {
                    title: "<span style='font-size:11px;'>Item</span>",
                    width: "300px",
                    class: "tx-center",
                    data: "stkname",
                    render: function (data, type, row, meta) {
                        let stkcod = row.stkcod != null ? row.stkcod + ' / ' : '';
                        //let chrcode = row.chrcode != null ? row.chrcode+' / ' : '';
                        let stkname = row.stkname != null ? row.stkname : '';
                        let gbarcode = row.gbarcode != null ? ' / ' + row.gbarcode + ' / ' : '';
                        let spcodes = row.spcodes != null ? row.spcodes : '';
                        let data_json = JSON.stringify(row)
                        let data_row = meta.row + 1
                        let item_code = stkcod + stkname + gbarcode + spcodes
                        return '<span data-json="' + data_json + '" id="itemcode-' + data_row + '">' + item_code + '</span>';
                    }

                },
                {
                    title: "<span style='font-size:11px;'>หน่วยนับ</span>",
                    width: "70px",
                    class: "tx-center",
                    data: "unit",
                    render: function (data, type, row, meta) {
                        let stkcod = row.stkcod != null ? row.stkcod : '-';
                        let data_json = JSON.stringify(row)
                        let data_row = meta.row + 1

                        return '<span data-json="' + data_json + '" id="unit-' + data_row + '">' + data + '</span>';

                    }

                },
                {
                    title: "<span style='font-size:11px;'>แท้ห้าง/อื่นๆ</span>",
                    width: "70px",
                    class: "tx-center",
                    data: "stktype",
                    render: function (data, type, row, meta) {
                        let stkcod = row.stkcod != null ? row.stkcod : '-';
                        let data_json = JSON.stringify(row)
                        let data_row = meta.row + 1

                        return '<span data-json="' + data_json + '" id="stktype-' + data_row + '">' + data + '</span>';

                    }

                },
                {
                    title: "<span style='font-size:11px;'>จำนวนหน่วย</span>",
                    width: "70px",
                    class: "tx-center",
                    data: "qty",
                    render: function (data, type, row, meta) {
                        let stkcod = row.stkcod != null ? row.stkcod : '-';
                        let data_json = JSON.stringify(row)
                        let data_row = meta.row + 1
                        return "<span data-json='" + data_json + "' data-row='" + data_row + "' class='row-text trnqty uom discount row-text-" + data_row + " ' id='trnqty-" + data_row + "' name='uom' >" + data + "</span>" + "<input type='text'data-row='" + data_row + "' data-json='" + data_json + "' class='form-control count_tt hide uom-edit row-edit-" + data_row + "' id='trnqtyinput-" + data_row + "' name='uom-edit' value='" + data + "'>"
                        //    return "<input type='text' data-json='" + data_json + "' value='" + data + "' data-row='" + data_row + "' class='form-control uom discount' id='trnqty-" + data_row + "' name='uom' >"
                    }

                },
                {
                    title: "<span style='font-size:11px;'>ราคา/หน่วย</span>",
                    width: "70px",
                    class: "tx-center",
                    data: "price_qty",
                    render: function (data, type, row, meta) {
                        let data_json = JSON.stringify(row)
                        let data_row = meta.row + 1
                        let trnpricett = (parseFloat(data) * parseFloat(row.qty))
                        return "<span class='trnpricett hide'>" + trnpricett + "</span>" + "<span data-json='" + data_json + "' data-row='" + data_row + "' class='trnprice row-text-" + data_row + " ' id='trnprice-" + data_row + "' >" + data + "</span>" + "<input data-row='" + data_row + "' data-json='" + data_json + "' type='text' class='form-control hide count_tt trnpricett-edit row-edit-" + data_row + "' id='trnpriceinput-" + data_row + "' name='trnpricett-edit' value='" + data + "'>"
                    }

                },
                {
                    title: "<span style='font-size:11px;'>ส่วนลด ระดับ 1 (%)</span>",
                    width: "70px",
                    class: "tx-center",
                    data: "discount1",
                    render: function (data, type, row, meta) {
                        let stkcod = row.stkcod != null ? row.stkcod : '-';
                        let data_json = JSON.stringify(row)
                        let data_row = meta.row + 1
                        //return "<span data-json='" + data_json + "' data-row='" + data_row + "' class='row-text-" + row.id + " discount' id='discount1-" + data_row + "' name='discount1' >" + data + "</span>" + "<input type='text' class='hide discount2-edit row-edit-" + row.id + "' name='discount2-edit' value='" + data + "' "
                        return "<span data-json='" + data_json + "' data-row='" + data_row + "' class='row-text-" + data_row + " discount' id='discount1-" + data_row + "' name='discount1' >" + data + "</span>" + "<input type='text' data-row='" + data_row + "' data-json='" + data_json + "' value='" + data + "' class='form-control count_tt hide discount-edit row-edit-" + data_row + "' id='discountone-" + data_row + "' name='discount1-edit' >"
                    }
                },
                {
                    title: "<span style='font-size:11px;'>ส่วนลด ระดับ 2 (%)</span>",
                    width: "70px",
                    class: "tx-center",
                    data: "discount2",
                    render: function (data, type, row, meta) {
                        let stkcod = row.stkcod != null ? row.stkcod : '-';
                        let data_json = JSON.stringify(row)
                        let data_row = meta.row + 1
                        return "<span data-json='" + data_json + "' data-row='" + data_row + "' class='row-text discount row-text-" + data_row + " ' id='discount2-" + data_row + "' name='discount2' >" + data + "</span>" + "<input data-row='" + data_row + "' data-json='" + data_json + "' type='text'value='" + data + "' class='form-control count_tt hide discount-edit row-edit-" + data_row + "' id='discounttwo-" + data_row + "' name='discount2-edit' >"
                    }

                },
                {
                    title: "<span style='font-size:11px;'>จำนวนเงิน</span>",
                    class: "tx-center",
                    width: "70px",
                    data: 'net_amount',
                    render: function (data, type, row, meta) {
                        let stkcod = row.stkcod != null ? row.stkcod : '-';
                        let data_row = meta.row + 1
                        let data_json = JSON.stringify(row)
                        let discout = ((row.price_qty * row.qty) * (row.discount1) / 100) + ((row.price_qty * row.qty) * (row.discount2) / 100)
                        return "<span class='pricenet' data-json='" + data_json + "' data-row='" + data_row + "' id='pricenet-" + data_row + "' >" + data + "</span>" + "<span class='hide dis' id='dis-" + data_row + "' name='dis-" + data_row + "' >" + discout + "</span>"
                    }
                },
                {
                    title: "<span style='font-size:11px;'>Action</span>",
                    class: "tx-center",
                    width: "100px",
                    render: function (data, type, row, meta) {
                        let data_json = JSON.stringify(row)
                        let data_row = meta.row + 1
                        let btn_delete = "<button type='button' style='margin: .25rem .125rem;' data-json='" + data_json + "' data-row='" + data_row + "' class='btn btn btn-outline-danger btn-sm delete-item'>Delete</button>"
                        let btn_save = "<button type='button' onclick=' $.Edit(" + data_row + ");' style='margin: .25rem .125rem;' data-json='" + data_json + "' data-row='" + data_row + "' class='btn btn btn-outline-success btn-sm hide save-item' id='save-item-" + data_row + "'>Save</button>"
                        let btn_edit = "<button type='button' style='margin: .25rem .125rem;' data-json='" + data_json + "' data-row='" + data_row + "' class='btn btn btn-outline-primary  btn-sm edit-item' id='edit-item-" + data_row + "'>Edit</button>"
                        //return '<button type="button" data-json="' + data_json +'" style="margin: .25rem .125rem;" data-row="' + data_row + '"  class="btn btn-success">Save</button>' + '<button type="button" style="margin: .25rem .125rem;" data-row="' + data_row + '" class="btn btn-danger">Delete</button>'
                        return btn_delete + btn_edit + btn_save
                    }

                }
            ],
            //"order": [[1, "desc"]],
            "initComplete": function (settings, json) {

                $.SumTotal();

                $.Update_Summary();

                $('.dis').addClass('hide');

                $('.count_tt').keyup(async function (e) {
                    e.preventDefault();
                    let count_length = $(this).data('row');
                    console.log(count_length);
                    //console.log('trnqty', $("#trnqtyinput-" + count_length).val());
                    //console.log('trnprice', $("#trnpriceinput-" + count_length).val());
                    //console.log('discountone', $("#discountone-" + count_length).val());
                    //console.log('discounttwo', $("#discounttwo-" + count_length).val());

                    let qty_no_val = $("#trnqtyinput-" + count_length).val() != '' ? $("#trnqtyinput-" + count_length).val() : '0';
                    let price_qty_val = $("#trnpriceinput-" + count_length).val() != '' ? $("#trnpriceinput-" + count_length).val() : '0';
                    let pro_1per_val = $("#discountone-" + count_length).val() != '' ? $("#discountone-" + count_length).val() : '0';
                    let pro_2per_val = $("#discounttwo-" + count_length).val() != '' ? $("#discounttwo-" + count_length).val() : '0';

                    let count_pricenet = (parseInt(qty_no_val) * parseInt(price_qty_val))
                    let discount1_count = ((parseInt(count_pricenet) * parseInt(pro_1per_val)) / 100)
                    let discount2_count = ((parseInt(count_pricenet) * parseInt(pro_2per_val)) / 100)
                    let price_tt_count = (count_pricenet - (discount1_count + discount2_count))

                    $('#pricenet-' + count_length).html(price_tt_count)
                });

                $('.delete-item').on('click', function (e) {
                    e.preventDefault();
                    let citem = $(this).data('row');
                    $.Delete(citem);
                })

                $('.edit-item').on('click', function (e) {
                    e.preventDefault();
                    let data = $(this).data('json');
                    let count_length = $(this).data('row');
                    let itemdata = {
                        id: data['id'],
                        qty: $('#uom-' + count_length).val(),
                        trnprice: $('#trnpricett-' + count_length).val(),
                        discount1: $('#discount1-' + count_length).val(),
                        discount2: $('#discount2-' + count_length).val(),
                        pricenet: $('#pricenet-' + count_length).html(),
                    }

                    //console.log('edit id:' + citem['id'])
                    $('.row-edit-' + count_length).removeClass('hide');
                    $('.row-text-' + count_length).addClass('hide')
                    $('#edit-item-' + count_length).addClass('hide')
                    $('#save-item-' + count_length).removeClass('hide')


                })

                $.contextMenu({
                    selector: '#tbl-list-item tbody tr',
                    callback: async function (key, options) {

                        let data = oTable.row(this).data();

                        let citem = {
                            unit: data['unit'],
                            tex_inv_hearder_id: data['tex_inv_hearder_id'],
                            stktype: data['stktype'],
                            stkname: data['stkname'],
                            stkcod: data['stkcod'],
                            spcodes: data['spcodes'],
                            //chrcode: data['chrcode'],
                            qty: data['qty'],
                            promotion_qty: data['promotion_qty'],
                            price_qty: data['price_qty'],
                            net_amount: data['net_amount'],
                            pk_number: data['pk_number'],
                            item_number: data['item_number'],
                            id: data['id'],
                            gbarcode: data['gbarcode'],
                            discount1: data['discount1'],
                            discount2: data['discount2'],
                            record_status: data['record_status'],
                            created_by: data['created_by'],
                            created_datetime: data['created_date'],
                            pMessage: data['pMessage'],
                            updated_by: data['updated_by'],
                            updated_datetime: data['updated_date'],
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

                        } else if (key === 'history') {
                            $.itemHistory(citem);

                        } else if (key === 'delete') {

                            $.Delete(citem);

                        }
                        else {

                            alert('ERROR');

                        }

                    },

                    items: {
                        "view": { name: "View", icon: "fas fa-search" },
                        "edit": { name: "Edit", icon: "edit edit-detail" },
                        "history": { name: "History - ประวัติรายการ", icon: "fas fa-history" },
                        "sep1": "---------",
                        "delete": { name: "Delete", icon: "delete" },
                    }

                });


            },

        });
    });

}

$.pkList = async function (hearder_id) {
    let inv_pk_get_api = new URL(inv_pk_get);

    inv_pk_get_api.search = new URLSearchParams({
        invapp_tax_hearder_id: hearder_id,
        //record_status: '1',
        mode: 'Search',
    });

    fetch(inv_pk_get_api).then(function (response) {

        return response.json();

    }).then(function (result) {
        oTablePk = $('#tbl-list-pk').DataTable({
            data: result.data,
            scrollCollapse: true,
            paging: false,
            info: false,
            destroy: true,
            searching: false,
            autoWidth: true,
            //scrollX: true,
            //scrollY: "410px",


            columns: [
                {
                    title: "<span style='font-size:11px;'>ลำดับ</span>",
                    class: "tx-center",
                    width: "50px",
                    render: function (data, type, row, meta) {
                        return (meta.row + 1);
                    }

                },
                {
                    title: "<span style='font-size:11px;'>เลขที่ PK</span>",
                    width: "100px",
                    class: "tx-center",
                    data: "pk_number",
                    render: function (data, type, row, meta) {
                        return "<span style='font-size:11px;'>" + data + "</span>";
                    }

                },
                {
                    title: "<span style='font-size:11px;'>สถานะ</span>",
                    width: "70px",
                    class: "tx-center",
                    data: "record_status",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return data == '1' ? '<span class="badge badge-success">ใช้งาน</span>' : data == '2' ? '<span class="badge badge-danger">ยกเลิก</span>' : '-';
                    }

                },
                {
                    title: "<span style='font-size:11px;'>ผู้บันทึก</span>",
                    width: "70px",
                    class: "tx-center",
                    data: "created_by",
                    render: function (data, type, row, meta) {
                        return '<span>' + data + '</span>';

                    }

                },

                {
                    title: "<span style='font-size:11px;'>Action</span>",
                    class: "tx-center",
                    width: "100px",
                    data: "id",
                    render: function (data, type, row, meta) {
                        let data_json = JSON.stringify(row)
                        let data_row = meta.row + 1
                        let invapp_tax_hearder_id = row.invapp_tax_hearder_id;
                        if (row.record_status == '1') {
                            return "<button type='button' data-row='" + data_json + "'  data-id='" + data + "' class='btn btn btn-outline-danger btn-sm delete-pk'>Delete</button>"
                        } else {
                            return "<button disabled type='button' data-row='" + data_json + "'  data-id='" + data + "' class='btn btn btn-outline-danger btn-sm delete-pk'>Delete</button>"
                        }
                        //return '<button type="button" data-json="' + data_json +'" style="margin: .25rem .125rem;" data-row="' + data_row + '"  class="btn btn-success">Save</button>' + '<button type="button" style="margin: .25rem .125rem;" data-row="' + data_row + '" class="btn btn-danger">Delete</button>'
                    }

                }

            ],
            //"order": [[1, "desc"]],
            "initComplete": function (settings, json) {

                $('.delete-pk').on('click', function () {

                    let data = $(this).data('row')
                    console.log("data", data);
                    let pkitem = {
                        pk_id: data['id'],
                        pk_number: data['pk_number'],
                        invapp_tax_hearder_id: data['invapp_tax_hearder_id'],
                        inv_tax_jobno: data['inv_tax_jobno'],
                        record_status: data['record_status'],
                        created_by: data['created_by'],
                        created_datetime: data['created_datetime'],
                        updated_by: data['updated_by'],
                        updated_datetime: data['updated_datetime'],
                    };

                    $.DeletePK(pkitem);

                })

                //$.contextMenu({
                //    selector: '#tbl-list-pk tbody tr',


                //callback: async function (key, options) {

                //    let data = oTablePk.row(this).data();

                //    let pkitem = {
                //        id: data['id'],
                //        pk_number: data['pk_number'],
                //        invapp_tax_hearder_id: data['invapp_tax_hearder_id'],
                //        record_status: data['record_status'],
                //        created_by: data['created_by'],
                //        updated_by: data['updated_by'],
                //        updated_datetime: data['updated_datetime'],
                //    };

                //    $('#modal-frm_data').modal({

                //        keyboard: false,
                //        backdrop: 'static'

                //    });


                //    if (key === 'view') {

                //    } else if (key === 'delete') {

                //    }
                //    else {

                //        alert('ERROR');

                //    }

                //},

                //items: {
                //    "view": { name: "View", icon: "fas fa-search" },
                //    "sep1": "---------",
                //    "delete": { name: "Delete", icon: "delete" },
                //}

                //});


            },

        });
    });

}

$.SumTotal = async function () {
    let discount_bath = 0, discount_per = 0;
    let count_price_all = 0;
    let dis_all = 0;
    let trnpricett = 0;

    $('#tbl-list-item tbody tr').each(function (index, val) {
        //dataTb.each(function (value, index) {
        var price = $('.pricenet', val).html();
        //var dis_it = $('[name="dis-'+ index +'"]', index).data('dis');
        var dis_it = $('.dis', val).html();
        var pricett = $('.trnpricett', val).html();

        trnpricett += Number(pricett);
        count_price_all += Number(price);
        dis_all += Number(dis_it);
        price_bf_dis = $('.trnqty', val).html();

    });

    let depen = $('#deposit').val() != '' ? $('#deposit').val() : '0';
    depen = parseInt(depen);

    let price_discount_all = (dis_all + discount_bath + discount_per)
    let vat = invvat != 0 ? ((count_price_all * 7) / 100) : 0;
    let deposit = $("#deposit").val() != '' ? $("#deposit").val() : '0';
    let amo_bill = ((count_price_all + vat) - parseInt(deposit));


    $('#price_total').html(numberWithCommas(trnpricett.toFixed(2))).trigger('change');
    $('#trade_discount').html(numberWithCommas(price_discount_all.toFixed(2))).trigger('change');
    $('#discount_total').html(numberWithCommas(count_price_all.toFixed(2))).trigger('change');
    $('#vat_total').html(numberWithCommas(vat.toFixed(2))).trigger('change');
    $('#deposit_total').html(numberWithCommas(parseInt(deposit).toFixed(2))).trigger('change');
    $('#price_net_total').html(numberWithCommas(amo_bill.toFixed(2))).trigger('change');
}

$.Customer_Get = async function (type, emmas_code) {
    let customer_get_api = new URL(customer_get);

    customer_get_api.search = new URLSearchParams({
        emmas_code: emmas_code.trim(),
    });

    fetch(customer_get_api).then(function (response) {
        return response.json();
    }).then(function (result) {
        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

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
            $.each(result.data, function (index, item) {
                if (type == 'branch') {
                    $('#ebranch').val(item['ebranch']);
                } else {
                    $('#emdelivery').val(item['eaddress'] + ' ' + item['etumbol'] + ' ' + item['eamphur'] + ' ' + item['eprovinc'] + ' ' + item['ezip']).trigger('change');
                }
                //    console.log('custo :' + item['eaddress'])
            });

        }

    });
    return false;
}

$.Header_Get = async function () {
    let inv_header_get_api = new URL(inv_header_get);

    inv_header_get_api.search = new URLSearchParams({
        pk_number: $('#pk_number').val(),
        mode: 'Search',
        record_status: '1'
    });
    fetch(inv_header_get_api).then(function (response) {

        return response.json();

    }).then(function (result) {
        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

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
            $("#global-loader").fadeOut("slow");
            $.rdfile_Get();
            //alert(result.length);


            if ((urlParams.get('act') == 'add')) {
                if (result.length > 0) {
                    $('.btn-save').prop('disabled', true);
                    $('#add-item').prop('disabled', true);
                    $('#update').removeClass('hide');
                    $('#save').addClass('hide');

                    Swal.fire({
                        icon: 'info',
                        title: 'PK นี้มีอยู่แล้ว',
                        text: 'คุณต้องการไปที่หน้าแก้ไขหรือไม่!',
                        //footer: '<a href>Why do I have this issue?</a>'
                    }).then((result) => {
                        if (result.isConfirmed) {

                            window.open(url_app_ui + 'tax-detail?act=edit&pk=' + $('#pk_number').val() + '&inv=' + $('#tax_number').val(), '_self');

                        }
                    })
                } else {

                    $.Salefile_Get();
                    return false;

                }
            } else {
                if (result.length > 0) {
                    $.each(result.data, function (key, val) {
                        $('#add-item').attr("data-id", val['id']);
                        $('#pk_number').attr("data-id", val['id']);
                        head_id = val['id'];

                        fetch(customer_select2_get + '?search=' + val['emmas_code']).then(function (response) {
                            return response.json();
                        }).then(function (result) {
                            $.each(result.data, function (key, data) {
                                $('#emmas').append(`<option value="${data['id']}">${data['text']}</option>`);
                                $('#emmas').val(data['id']).trigger('change');
                            })
                        })

                        fetch(customer_select2_get + '?search=' + val['emlocation']).then(function (response) {
                            return response.json();
                        }).then(function (result) {
                            $.each(result.data, function (key, data) {
                                $('#emlocation').append(`<option value="${data['id']}">${data['text']}</option>`);
                                $('#emlocation').val(data['id']).trigger('change');
                            })
                        })
                        $('#qo_num').val(val['quote_number']);
                        $('#invdate').val(moment(val['inv_date'].substring(0, 10), 'YYYY/MM/DD').format('DD/MM/YYYY'));
                        $('#due_date').val(moment(val['payment_due'].substring(0, 10), 'YYYY/MM/DD').format('DD/MM/YYYY'));
                        $('#clame').val(val['claim_number']);
                        $('#invdue').val(val['credit']);
                        $('#edue').val(val['payment_type']);
                        $('#discount_per').val(val['discount_percent']);
                        $('#discount_bath').val(val['discount_baht']);
                        $('#tsno').val(val['car_number_plate']);
                        $("[name=pro][value='" + val['has_promotion'] + "']").prop("checked", true).trigger('change');
                        $("[name='invnet']").val(val['deposit_total']);
                        $("#vat").val(val['vat_std']);
                        $('#tax_number').val(urlParams.get('inv')).prop('disabled', true).trigger('change');
                        $("#inv_tax_jobno").val(val['inv_tax_jobno']);
                        $('#userid').val(val['sale_name']);
                        $('#emlocation').val(val['emlocation']);
                        $('#deposit').val(val['deposit']);

                        setTimeout(function () {
                            console.log(val['invapp_masterdata_company_id'])
                            $('#co_name').val(val['invapp_masterdata_company_id']).trigger('change');
                        }, 500);

                        invsumtt = val['price_net_total'];
                        invnet = val['discount_total'];
                        invvat = val['vat_total'];

                        let trade_discount = numberWithCommas(val['trade_discount'].toFixed(2))
                        let discount_total = numberWithCommas(val['discount_total'].toFixed(2))
                        let vat_total = numberWithCommas(val['vat_total'].toFixed(2))
                        let deposit_total = numberWithCommas(val['deposit_total'].toFixed(2))
                        let price_net_total = numberWithCommas(val['price_net_total'].toFixed(2))

                        //$('#price_total').html(numberWithCommas(invsumtt.toFixed(2))).trigger('change');
                        //$('#trade_discount').html(trade_discount).trigger('change');
                        //$('#discount_total').html(discount_total).trigger('change');
                        //$('#vat_total').html(vat_total).trigger('change');
                        //$('#price_net_total').html(price_net_total).trigger('change');

                    });

                    $.itemGet(head_id);
                    $.pkList(head_id);

                    $('#add-item').prop('disabled', false);
                    $('.btn-save').prop('disabled', false);
                    $('#update').removeClass('hide');
                    $('#save').addClass('hide');
                } else {

                    Swal.fire({
                        icon: 'info',
                        title: 'ไม่พบข้อมูล',
                        //text: 'คุณต้องการไปที่หน้าแก้ไขหรือไม่!',
                        //footer: '<a href>Why do I have this issue?</a>'
                    })

                }
            }
        }
    });

}

$.Company_Get = async function () {
    let company_get_api = new URL(company_get);

    company_get_api.search = new URLSearchParams({
        mode: 'Search',
        record_status: '1'
    });

    fetch(company_get_api).then(function (response) {
        return response.json();
    }).then(function (result) {
        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

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
            $.each(result.data, function (index, item) {
                $('#co_name').append(`<option value="${item['invapp_masterdata_company_id']}" data-branch="${item['co_branchname']}" data-branchcode="${item['co_shotname']}" >${item['co_name']}</option>`);
            });

        }

    });
    return false;
}

$.rdfile_Get = async function () {
    let rdfile_get_api = new URL(rdfile_get);

    rdfile_get_api.search = new URLSearchParams({
        taxinvoice: $('#pk_number').val(),
    });

    fetch(rdfile_get_api).then(function (response) {
        return response.json();
    }).then(function (result) {
        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

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
            $.each(result.data, function (index, item) {
                $('#invnet').val(item['invnet']);
            });

        }

    });
    return false;
}

$.Create = async function () {

    $('#frm_header').parsley().validate();

    if ($('#frm_header').parsley().isValid()) {


        $("#global-loader").fadeIn("slow");

        let add_data = {
            emmas_code: $('#emmas').val().trim(),
            emlocation: $('#emlocation').val(),
            pk_number: $('#pk_number').val(),
            quote_number: $('#qo_num').val(),
            inv_date: moment($('#invdate').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD'),
            invapp_masterdata_company_id: $('#co_name').val(),
            payment_due: moment($('#due_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD'),
            sale_name: $('#userid').val(),
            claim_number: $('#clame').val(),
            credit: $('#invdue').val(),
            payment_type: $('#edue').val(),
            //has_discount: $('input[name=has_discount]:checked').val(),
            //discount_percent: $('input[name=has_discount]:checked').val() == 2 ? $('#discount_per').val() : '',
            //discount_baht: $('input[name=has_discount]:checked').val() == 1 ? $('#discount_bath').val() : '',
            vat_std: $('#vat').val(),
            car_number_plate: $('#tsno').val(),
            has_promotion: $('input[name=promotion]:checked').val(),
            deposit: $('#deposit').val(),
            //status_inv: $('input[name=status]:checked').val() != '' ? $('input[name=status]:checked').val() : 'pending' ,
            //reject_descript: $('input[name=status]:checked').val() == 'reject' ? $('#reject_descript').val() : '',
            pu_no: $('#pu_no').val(),
            trade_discount: $('#trade_discount').html().replaceAll(',', ''),
            discount_total: $('#discount_total').html().replaceAll(',', ''),
            vat_total: $('#vat_total').html().replaceAll(',', ''),
            deposit_total: $('#deposit_total').html().replaceAll(',', ''),
            price_net: $('#price_net_total').html().replaceAll(',', ''),
            price_net_total: $('#price_net_total').html().replaceAll(',', ''),
            price_af_dis: $('#price_total').html().replaceAll(',', ''),
            tax_number: $('#tax_number').val(),
            record_status: '1',
            created_by: name
        };

        var params = [];
        for (const i in add_data) {
            params.push(i + "=" + encodeURIComponent(add_data[i]));
        }

        fetch(inv_header_create, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            //mode: 'no-cors', // no-cors, *cors, same-origin
            //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            body: params.join("&"),
        }).then(data => {
            //console.log(data);
            return data.json();
        }).then(data => {
            if (data.status === 'Error') {
                $.LoadingOverlay("hide");

                $("#global-loader").fadeOut("slow");

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
                $.LoadingOverlay("hide");

                $("#global-loader").fadeOut("slow");

                //console.log("inv_header_create", data.data);
                if (data.length > 0) {
                    $.Create();

                } else {
                    $("#global-loader").fadeOut("slow");
                    toastr.success('Save Successfully!', async function () {
                        $('.btn-save').prop('disabled', true);
                        window.open(url_app_ui + 'tax-detail?act=edit&pk=' + $('#pk_number').val() + '&inv=' + $('#tax_number').val(), '_self');

                    });
                }
            }

        }).catch((error) => {
            $("#global-loader").fadeOut("slow");
            // toastr.error(data.error_message);
            toastr.error(error);
        });

        return false;
    }
};

$.Change_inv = async function () {
    $("#global-loader").fadeIn("slow");

    let add_data = {
        tax_number_old: urlParams.get('act') == 'editpk' ? urlParams.get('inv') : '',
        pk_number_old: urlParams.get('act') == 'editpk' ? urlParams.get('pk') : '',
        emmas_code: $('#emmas').val().trim(),
        pk_number: $('#pk_number').val(),
        quote_number: $('#qo_num').val(),
        inv_date: moment($('#invdate').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD'),
        invapp_masterdata_company_id: $('#co_name').val(),
        payment_due: moment($('#due_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD'),
        sale_name: $('#userid').val(),
        claim_number: $('#clame').val(),
        credit: $('#invdue').val(),
        payment_type: $('#edue').val(),
        //has_discount: $('input[name=has_discount]:checked').val(),
        //discount_percent: $('input[name=has_discount]:checked').val() == 2 ? $('#discount_per').val() : '',
        //discount_baht: $('input[name=has_discount]:checked').val() == 1 ? $('#discount_bath').val() : '',
        vat_std: $('#vat').val(),
        car_number_plate: $('#tsno').val(),
        has_promotion: $('input[name=promotion]:checked').val(),
        deposit: $('#deposit').val(),
        //status_inv: $('input[name=status]:checked').val(),
        //reject_descript: $('input[name=status]:checked').val() == 'reject' ? $('#reject_descript').val() : '',
        pu_no: $('#pu_no').val(),
        trade_discount: $('#trade_discount').html().replaceAll(',', ''),
        discount_total: $('#discount_total').html().replaceAll(',', ''),
        vat_total: $('#vat_total').html().replaceAll(',', ''),
        deposit_total: $('#deposit_total').html().replaceAll(',', ''),
        price_net_total: $('#price_net_total').html().replaceAll(',', ''),
        price_af_dis: $('#price_total').html().replaceAll(',', ''),
        tax_number: $('#tax_number').val(),
        record_status: '1',
        updated_by: name,
        created_by: name
    };

    var params = [];
    for (const i in add_data) {
        params.push(i + "=" + encodeURIComponent(add_data[i]));
    }


    fetch(inv_header_change, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //mode: 'no-cors', // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params.join("&"),
    }).then(data => {
        //console.log(data);
        return data.json();
    }).then(data => {
        if (data.status === 'Error') {
            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

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
            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            toastr.success('Save Successfully!', async function () {
                $('.btn-save').prop('disabled', true);
                $.Create_Item();
                //$('#frm_header').find('input,select').val('');
                //$('#frm_header').find('.parsley-success').removeClass('parsley-success');

            });

        }

    }).catch((error) => {
        $("#global-loader").fadeOut("slow");
        // toastr.error(data.error_message);
        toastr.error(error);
    });

    return false;
};

$.Update = async function () {
    $("#global-loader").fadeIn("slow");
    $('.btn-save').prop('disabled', true);

    let add_data = {
        id: head_id,
        emmas_code: $('#emmas').val().trim(),
        inv_tax_jobno: $('#inv_tax_jobno').val(),
        invapp_masterdata_company_id: $('#co_name').val(),
        payment_due: moment($('#due_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD'),
        sale_name: $('#userid').val(),
        claim_number: $('#clame').val(),
        credit: $('#invdue').val(),
        payment_type: $('#edue').val(),
        //has_discount: $('input[name=has_discount]:checked').val(),
        //discount_percent: $('input[name=has_discount]:checked').val() == 2 ? $('#discount_per').val() : '',
        //discount_baht: $('input[name=has_discount]:checked').val() == 1 ? $('#discount_bath').val() : '',
        vat_std: $('#vat').val(),
        car_number_plate: $('#tsno').val(),
        has_promotion: $('input[name=promotion]:checked').val(),
        deposit: $('#deposit').val(),
        //status_inv: $('input[name=status]:checked').val(),
        //reject_descript: $('input[name=status]:checked').val() == 'reject' ? $('#reject_descript').val() : '',
        pu_no: $('#pu_no').val(),
        trade_discount: $('#trade_discount').html().replaceAll(',', ''),
        discount_total: $('#discount_total').html().replaceAll(',', ''),
        vat_total: $('#vat_total').html().replaceAll(',', ''),
        deposit_total: $('#deposit_total').html().replaceAll(',', ''),
        price_net_total: $('#price_net_total').html().replaceAll(',', ''),
        price_af_dis: $('#price_total').html().replaceAll(',', ''),
        record_status: '1',
        updated_by: name
    };

    var params = [];
    for (const i in add_data) {
        params.push(i + "=" + encodeURIComponent(add_data[i]));
    }


    fetch(inv_header_update, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //mode: 'no-cors', // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params.join("&"),
    }).then(data => {
        //console.log(data);
        return data.json();
    }).then(data => {
        if (data.status === 'Error') {
            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

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
            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            toastr.success('Save Successfully!', async function () {
                $('.btn-save').prop('disabled', false);
                $.Header_Get();
            });
        }

    }).catch((error) => {
        $("#global-loader").fadeOut("slow");
        // toastr.error(data.error_message);
        toastr.error(error);
    });

    return false;
};

$.Create_newitem = async function (dataRow) {

    let itemnameRow = $('#item-' + dataRow).val()
    let trnpriceRow = $('#trnprice-' + dataRow).val()
    let stktypeRow = $('#stktype-' + dataRow).val()
    let unitRow = $('#unit-' + dataRow).val()
    let trnqtyRow = $('#trnqty-' + dataRow).val()

    if (itemnameRow == '' || parseInt(trnqtyRow) <= 0 || stktypeRow == '' || unitRow == '' || parseFloat(trnpriceRow) <= 0.0) {

        let itemname_empty = itemnameRow == '' ? 'ชื่อสินค้า' : ''
        let unit_empty = unitRow == '' ? ', หน่วยนับ' : ''
        let stktype_empty = stktypeRow == '' ? ', แท้ห้าง' : ''
        let trnqty_empty = parseInt(trnqtyRow) <= 0 ? ', จำนวนหน่วย' : ''
        let trnprice_empty = parseFloat(trnpriceRow) <= 0.0 ? ', ราคา/หน่วย' : ''

        Swal.fire({
            title: '<span style="font-size:18px;">กรุณากรอกข้อมูลให้ครบถ้วน! </span>',
            html: '<span style="font-size:14px;">กรุณากรอก ' + itemname_empty + unit_empty + stktype_empty + trnqty_empty + trnprice_empty + '</span>',
            icon: 'warning',
        })
    } else {

        $("#global-loader").fadeIn("slow");
        let add_data = {
            tex_inv_hearder_id: head_id,
            pk_number: $('#pk_number').val(),
            //chrcode: $('#chrcode').val(),
            spcodes: spcode,
            gbarcode: gbarcode,
            stkname: $('#item-' + dataRow).val(),
            stkcod: stkcod,
            price_qty: $('#trnprice-' + dataRow).val(),
            //item_number: $('#search_name').val(),
            stktype: $('#stktype-' + dataRow).val(),
            unit: $('#unit-' + dataRow).val(),
            qty: $('#trnqty-' + dataRow).val(),
            discount1: $('#discount1-' + dataRow).val(),
            discount2: $('#discount2-' + dataRow).val(),
            net_amount: $('#pricenet-' + dataRow).html() != '' ? $('#pricenet-' + dataRow).html() : 0,
            record_status: '1',
            created_by: name,
            pMessage: ''
        };

        var params = [];
        for (const i in add_data) {
            params.push(i + "=" + encodeURIComponent(add_data[i]));
        }

        fetch(inv_items_create, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            // mode: 'no-cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            body: params.join("&"),
        }).then(data => {
            //console.log(data);
            return data.json();
        }).then(data => {
            $("#global-loader").fadeOut("slow");

            if (data.status == 'Success') {

                toastr.success('Save Successfully!', async function () {
                    location.reload();
                });
            } else {
                toastr.error('กรุณาลองใหม่อีกครั้ง');

            }

            return false;

        }).catch((error) => {
            $("#global-loader").fadeOut("slow");
            // toastr.error(data.error_message);
            toastr.error(error);
        });

        return false;

    }
};

$.Create_Item = async function () {

    fetch(url_invtra_get + '?number=' + $('#pk_number').val()).then(function (response) {

        return response.json();

    }).then(function (result) {
        $("#global-loader").fadeIn("slow");

        $.when(

            $.each(result.data, function (key, val) {
                let partno = val['spcodes'] != null ? val['spcodes'] : '-';
                let barcord = val['gbarcode'] != null ? val['gbarcode'] : '-';
                let itemname = val['stkname'] != null ? val['stkname'] : '-';
                let code = val['stkcod'] != null ? val['stkcod'] : '-';
                let item_number = partno + ' / ' + barcord + ' / ' + itemname + ' / ' + code;
                key++;

                let add_data = {
                    //tex_inv_hearder_id: hearder_id,
                    spcodes: partno,
                    inv_tax_jobno: $('#inv_tax_jobno').val(),
                    gbarcode: barcord,
                    stkname: itemname,
                    stkcod: code,
                    pk_number: $('#pk_number').val(),
                    item_number: val['item'].replace(/\s/g, ''), //item_number.replace(/\s/g, ''),
                    unit: val['stkunit'].replace(/\s/g, ''),
                    qty: val['trnqty'],
                    stktype: val['stktype'].replace(/\s/g, ''),
                    price_qty: val['trnprice'],
                    discount1: $('#discount1-' + key).html(),
                    discount2: $('#discount2-' + key).html(),
                    net_amount: $('#pricenet-' + key).html(),
                    record_status: '1',
                    created_by: name,
                    pMessage: ''
                };

                //console.log('add_data', add_data)

                var params = [];
                for (const i in add_data) {
                    params.push(i + "=" + encodeURIComponent(add_data[i]));
                }

                fetch(inv_items_create, {
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
                            console.log(key, ': Save Successfully!')
                        });

                        //    console.log(key, ': Save Successfully!')
                        //    console.log(key, item_number)
                        //    location.reload();

                    }

                }).catch((error) => {
                    toastr.error(error, 'Error writing document');
                });
            })
        ).then(function () {
            // After loop ends.
            toastr.success('Save Successfully!', async function () {
                //$.Header_Get();
                window.open(url_app_ui + 'tax-detail?act=edit&pk=' + $('#pk_number').val() + '&inv=' + $('#tax_number').val(), '_self');
            });
        });
    });

};

$.Details = async function (citem) {

    $('.btn-save_form').addClass('hide');
    $('.btn-update_form').addClass('hide');

    $('#frm_newitem').modal('show');
    $('#frm_data input').prop('readonly', true);

    $('#search_name').val(citem['item_number']);
    $('#unit').val(citem['unit']);
    $('#stktype').val(citem['stktype']);
    $('#trnqty').val(citem['qty']);
    $('#trnprice').val(citem['price_qty']);
    $('#discount1').val(citem['discount1']);
    $('#discount2').val(citem['discount2']);
    $('#pricenet').val(citem['net_amount']);
    //$('#chrcode').val(citem['chrcode']);
    $('#spcode').val(citem['spcodes']);
    $('#gbarcode').val(citem['gbarcode']);
    $('#search_name').val(citem['stkname']);
    $('#item-code').val(citem['stkcod']);

};

$.Edit = async function (dataRow) {

    let data = $('#save-item-' + dataRow).data('json');
    let trnpriceRow = $('#trnpriceinput-' + dataRow).val()
    let trnqtyRow = $('#trnqtyinput-' + dataRow).val()

    if (parseInt(trnqtyRow) <= 0 || parseFloat(trnpriceRow) <= 0.0) {

        let trnqty_empty = parseInt(trnqtyRow) <= 0 ? 'จำนวนหน่วย' : ''
        let trnprice_empty = parseFloat(trnpriceRow) <= 0.0 ? ', ราคา/หน่วย' : ''

        Swal.fire({
            title: '<span style="font-size:18px;">กรุณากรอกข้อมูลให้ครบถ้วน! </span>',
            html: '<span style="font-size:14px;">กรุณากรอก ' + trnqty_empty + trnprice_empty + '</span>',
            icon: 'warning',
        })
    } else {
        $("#global-loader").fadeIn("slow");
        let add_data = {
            id: data['id'],
            pk_number: data['pk_number'],
            inv_tax_jobno: data['inv_tax_jobno'],
            stkcod: data['stkcod'],
            stkname: data['stkname'],
            gbarcode: data['gbarcode'],
            spcodes: data['spcodes'],
            stktype: data['stktype'],
            unit: data['unit'],
            inv_tax_jobno: $('#inv_tax_jobno').val(),
            price_qty: $('#trnpriceinput-' + dataRow).val(),
            qty: $('#trnqtyinput-' + dataRow).val(),
            discount1: $('#discountone-' + dataRow).val(),
            discount2: $('#discounttwo-' + dataRow).val(),
            net_amount: $('#pricenet-' + dataRow).html(),
            record_status: '1',
            created_by: name,
            updated_by: name,
            pMessage: ''
        };

        var params = [];
        for (const i in add_data) {
            params.push(i + "=" + encodeURIComponent(add_data[i]));
        }

        fetch(inv_items_update, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            // mode: 'no-cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            body: params.join("&"),
        }).then(data => {
            //console.log(data);
            return data.json();
        }).then(data => {
            $("#global-loader").fadeOut("slow");

            if (data.status == 'Success') {

                location.reload();

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

            return false;

        }).catch((error) => {
            $("#global-loader").fadeOut("slow");
            // toastr.error(data.error_message);
            toastr.error(error);
        });

        return false;

    }
};

$.Delete = async function (citem) {
    Swal.fire({
        title: '<span style="font-size:18px;">ยืนยันการลบหรือไม่ ? </span>',
        //html: '<span style="font-size:14px;">รหัสอ้างอิง ' + citem['cn_pre_job_jobno'] + '</span>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {

        if (result.isConfirmed) {
            let edit_data = {
                id: citem['id'],
                updated_by: name,
                record_status: '2',
                pMessage: ''
            };

            var params = [];
            for (const i in edit_data) {
                params.push(i + "=" + encodeURIComponent(edit_data[i]));
            }

            fetch(inv_items_delete, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params.join("&"),
            }).then(data => {
                return data.json();
            }).then(data => {
                toastr.success('Delete Successfully!', async function () {

                    //$.itemGet();
                    location.reload();

                });

            }).catch(error => {
                toastr.error(error, 'Error writing document');
                //console.error("Error writing document: ", error);
            })
        }
    })

}

$.NewItemForm = async function () {
    $("#suggesstion-box").hide();

    var search_text = "CONCAT(RTRIM(code),' / ',RTRIM(CHRCODE),' / ',RTRIM(name),' / ',RTRIM(gbarcode),' / ',RTRIM(SPCODES))"

    $("#search_name").keyup(function () {
        $('#item-code').val('').trigger('change');
        $('#gbarcode').val('').trigger('change');
        $('#spcode').val('').trigger('change');

        $.ajax({
            url: url_api_local + 'v1/product_select',
            data: { id: 'RTRIM(code)', text: search_text, keywords: $(this).val() },
            beforeSend: function () {
                $("#search-box").css("background", "#FFF");
            },
            success: function (result) {
                $("#suggesstion-box").show();
                $("#suggesstion-box a").remove();
                $.each(result.data, function (index, item) {
                    let code = item['id'];
                    let stringtify = JSON.stringify(item)
                    $("#suggesstion-box").append("<a data-row='" + stringtify + "' class='list-group-item list-group-item-action list-code' style='width: 371px; cursor: pointer;' data-code='" + code + "'>" + item['text'] + "</a>");

                });


                $('#suggesstion-box > a').on('click', function (e) {
                    e.preventDefault();
                    let dataRow = $(this).data('row')
                    console.log(dataRow)
                    //$('.btn-save_form').attr("data-id", JSON.stringify(dataRow)).trigger('change');
                    $('#item-code').val(dataRow['id']).trigger('change');
                    //$('#chrcode').val(dataRow['codechr']).trigger('change');
                    $('#gbarcode').val(dataRow['gbarcode']).trigger('change');
                    $('#spcode').val(dataRow['SPCODE']).trigger('change');

                    $('#suggesstion-box > a').remove();

                    $('#search_name').val(dataRow['name']).trigger('change');
                    $('#unit').val(dataRow['UOM']).trigger('change');
                    $('#trnqty').val('1').trigger('change');
                    $('#stktype').val(dataRow['ctype']).trigger('change');
                    $('#stktype').val(dataRow['ctype']).trigger('change');
                    //$('#uom').val(dataRow['gprice']);
                    $('#trnprice').val(dataRow['gprice']).trigger('change');
                    //$('#discount1').val(dataRow['gprice']);
                    //$('#discount2').val(dataRow['gprice']);
                    $('#pricenet').val(dataRow['gprice']).trigger('change');
                })
            }
        });
    });

    $('.discount').keyup(function () {
        let discount1 = $("#discount1").val() != '' ? $("#discount1").val() : '0';
        let discount2 = $("#discount2").val() != '' ? $("#discount2").val() : '0';
        let trnqty = $("#trnqty").val() != '' ? $("#trnqty").val() : '0';
        let trnprice = $("#trnprice").val() != '' ? $("#trnprice").val() : '0';
        let count_pricenet = (parseInt(trnqty) * parseInt(trnprice))
        let discount1_count = ((parseInt(count_pricenet) * parseInt(discount1)) / 100)
        let discount2_count = ((parseInt(count_pricenet) * parseInt(discount2)) / 100)
        let count_pricett = (count_pricenet - discount1_count - discount2_count)


        $("#pricenet").val(count_pricett).trigger('change');

    })

}

$.Update_Summary = async function () {
    let add_data = {
        id: $('#pk_number').data('id'),
        trade_discount: $('#trade_discount').html().replaceAll(',', ''),
        discount_total: $('#discount_total').html().replaceAll(',', ''),
        vat_total: $('#vat_total').html().replaceAll(',', ''),
        deposit_total: $('#deposit_total').html().replaceAll(',', ''),
        price_net_total: $('#price_net_total').html().replaceAll(',', ''),
        price_af_dis: $('#price_total').html().replaceAll(',', ''),
        updated_by: name,
        pMessage: ''
    };

    var params = [];
    for (const i in add_data) {
        params.push(i + "=" + encodeURIComponent(add_data[i]));
    }

    fetch(inv_header_sum, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params.join("&"),
    }).then(data => {
        //console.log(data);
        return data.json();
    }).then(data => {
        //$("#global-loader").fadeOut("slow");

        if (data.status == 'Success') {

            console.log('update summary :' + data.data)

        } else {
            $.Update_Summary();
            console.log('update summary :' + data.data)

        }

        return false;

    }).catch((error) => {
        $("#global-loader").fadeOut("slow");
        // toastr.error(data.error_message);
        toastr.error(error);
    });

    return false;
}

$.Update_TaxNum = async function (item) {
    let add_data = {
        number: $('#tax_number').val(),
        inv_tax_jobno: item['inv_tax_header_number'],
        updated_by: name,
        record_status: '1',
        pMessage: ''
    };

    var params = [];
    for (const i in add_data) {
        params.push(i + "=" + encodeURIComponent(add_data[i]));
    }

    fetch(tax_number_update, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params.join("&"),
    }).then(data => {
        //console.log(data);
        return data.json();
    }).then(data => {
        //$("#global-loader").fadeOut("slow");

        //if (data.status == 'Success') {

        //    console.log('update summary :'+data.data)

        //} else {
        //    console.log('update summary :' + data.data)

        //}

        return false;

    }).catch((error) => {
        $("#global-loader").fadeOut("slow");
        // toastr.error(data.error_message);
        toastr.error(error);
    });

    return false;
}

$.itemHistory = async function (citem) {
    $('#frm_history').modal('show');
    $('#item_history').html(citem['stkname']);

    let inv_items_history_api = new URL(inv_items_history);

    inv_items_history_api.search = new URLSearchParams({
        invapp_tax_item_id: citem['id'],
        //pk_number: citem['pk_number'],
        mode: 'Search',
    });

    fetch(inv_items_history_api).then(function (response) {

        return response.json();

    }).then(function (result) {
        oTable_history = $('#tbl-history').DataTable({
            data: result.data,
            scrollCollapse: false,
            paging: false,
            info: false,
            destroy: true,
            searching: false,
            //autoWidth: true,
            //scrollX: true,
            //scrollY: "410px",
            //scrollCollapse: true,

            columns: [
                {
                    title: "<span style='font-size:11px;'>ลำดับ</span>",
                    class: "tx-center",
                    width: "0px",
                    render: function (data, type, row, meta) {
                        return (meta.row + 1);
                    }

                },
                {
                    title: "<span style='font-size:11px;'>Item</span>",
                    width: "300px",
                    class: "tx-center",
                    visible: false,
                    data: "stkname",
                    render: function (data, type, row, meta) {
                        let stkcod = row.stkcod != null ? row.stkcod + ' / ' : '';
                        //let chrcode = row.chrcode != null ? row.chrcode+' / ' : '';
                        let stkname = row.stkname != null ? row.stkname : '';
                        let gbarcode = row.gbarcode != null ? ' / ' + row.gbarcode + ' / ' : '';
                        let spcodes = row.spcodes != null ? row.spcodes : '';
                        let data_json = JSON.stringify(row)
                        let data_row = meta.row + 1
                        let item_code = stkcod + stkname + gbarcode + spcodes
                        return '<span data-json="' + data_json + '" id="itemcode-' + data_row + '">' + data + '</span>';
                    }

                },
                {
                    title: "<span style='font-size:11px;'>หน่วยนับ</span>",
                    width: "70px",
                    //visible: false,
                    class: "tx-center",
                    data: "unit",
                    render: function (data, type, row, meta) {
                        let stkcod = row.stkcod != null ? row.stkcod : '-';
                        let data_json = JSON.stringify(row)
                        let data_row = meta.row + 1

                        return '<span data-json="' + data_json + '" id="unit-' + data_row + '">' + data + '</span>';

                    }

                },
                {
                    title: "<span style='font-size:11px;'>แท้ห้าง/อื่นๆ</span>",
                    width: "70px",
                    class: "tx-center",
                    visible: false,
                    data: "stktype",
                    render: function (data, type, row, meta) {
                        let stkcod = row.stkcod != null ? row.stkcod : '-';
                        let data_json = JSON.stringify(row)
                        let data_row = meta.row + 1

                        return '<span data-json="' + data_json + '" id="stktype-' + data_row + '">' + data + '</span>';

                    }

                },
                {
                    title: "<span style='font-size:11px;'>จำนวนหน่วย</span>",
                    width: "70px",
                    class: "tx-center",
                    data: "qty",
                    render: function (data, type, row, meta) {
                        let stkcod = row.stkcod != null ? row.stkcod : '-';
                        let data_json = JSON.stringify(row)
                        let data_row = meta.row + 1
                        return "<span data-json='" + data_json + "' data-row='" + data_row + "' class='trnqty uom discount' id='trnqty-" + data_row + "' name='uom' >" + data + "</span>"
                        //    return "<input type='text' data-json='" + data_json + "' value='" + data + "' data-row='" + data_row + "' class='form-control uom discount' id='trnqty-" + data_row + "' name='uom' >"
                    }

                },
                {
                    title: "<span style='font-size:11px;'>ราคา/หน่วย</span>",
                    width: "70px",
                    class: "tx-center",
                    data: "price_qty",
                    render: function (data, type, row, meta) {
                        let data_json = JSON.stringify(row)
                        let data_row = meta.row + 1
                        let trnpricett = (parseFloat(data) * parseFloat(row.qty))
                        return '<span class="trnprice" id="trnprice-' + data_row + '">' + data + '</span">' + '<span class="trnpricett hide" id="trnpricett-' + data_row + '">' + trnpricett + '</span">'
                    }

                },
                {
                    title: "<span style='font-size:11px;'>ส่วนลด ระดับ 1 (%)</span>",
                    width: "70px",
                    class: "tx-center",
                    data: "discount1",
                    render: function (data, type, row, meta) {
                        let stkcod = row.stkcod != null ? row.stkcod : '-';
                        let data_json = JSON.stringify(row)
                        let data_row = meta.row + 1
                        return "<span data-json='" + data_json + "' data-row='" + data_row + "' class='discount' id='discount1-" + data_row + "' name='discount1' >" + data + "</span>"
                        //    return "<input type='text' data-json='" + data_json +"' value='" + data + "' data-row='" + data_row + "' class='form-control discount' id='discount1-" + data_row + "' name='discount1' >"
                    }
                },
                {
                    title: "<span style='font-size:11px;'>ส่วนลด ระดับ 2 (%)</span>",
                    width: "70px",
                    class: "tx-center",
                    data: "discount2",
                    render: function (data, type, row, meta) {
                        let stkcod = row.stkcod != null ? row.stkcod : '-';
                        let data_json = JSON.stringify(row)
                        let data_row = meta.row + 1
                        return "<span data-json='" + data_json + "' data-row='" + data_row + "' class='discount' id='discount2-" + data_row + "' name='discount2' >" + data + "</span>"
                    }

                },
                {
                    title: "<span style='font-size:11px;'>จำนวนเงิน</span>",
                    class: "tx-center",
                    width: "70px",
                    data: 'net_amount',
                    render: function (data, type, row, meta) {
                        let stkcod = row.stkcod != null ? row.stkcod : '-';
                        let data_row = meta.row + 1
                        let data_json = JSON.stringify(row)
                        let discout = ((row.price_qty * row.qty) * (row.discount1) / 100) + ((row.price_qty * row.qty) * (row.discount2) / 100)
                        return "<span class='pricenet' data-json='" + data_json + "' data-row='" + data_row + "' id='pricenet-" + data_row + "' >" + data + "</span>" + "<span class='hide dis' id='dis-" + data_row + "' name='dis-" + data_row + "' >" + discout + "</span>"
                    }
                },
                {
                    title: "<span style='font-size:11px;'>สถานะ</span>",
                    class: "tx-center",
                    width: "70px",
                    data: 'record_status',
                    render: function (data, type, row, meta) {
                        return data == '1' ? '<span class="badge badge-success">ใช้งาน</span>' : data == '2' ? '<span class="badge badge-danger">ยกเลิก</span>' : '-';

                    }
                },
                {
                    title: "<span style='font-size:11px;'>บันทึกโดย</span>",
                    class: "tx-center",
                    width: "70px",
                    data: 'created_by',
                    render: function (data, type, row, meta) {
                        if (row.updated_by == '' || row.updated_by == null) {
                            return "<span>" + data + "</span>";
                        } else {
                            return "<span>" + row.updated_by + "</span>";
                        }

                    }
                },

            ],
        });
    });

}

$.Tax_number_Get = async function () {

    $('#tax_number').children('option:not(:first)').remove();

    let url = new URL(tax_number_get);

    url.search = new URLSearchParams({
        status: 'ready',
        mode: 'Search'
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {
        //oTable.destroy();
        $("#global-loader").fadeOut("slow");

        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

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
            console.log('Tax_number_Get success');

            $.each(result.data, function (key, val) {
                $('#tax_number').append(`<option value="${val['number']}">${val['number']}</option>`);
            })
        }
    })
}

$.Add_row = async function () {

    let count_length = $("#tbl-list-item tr").length;
    var pageParamTable = $('#tbl-list-item').DataTable();

    let item1 = '<select class="select2 form-control search_item_code" id="item-' + count_length + '" data-row="' + count_length + '" style="width: 300px;" required data-parsley-error-message="กรุณาเลือก..."> <option value=""> Please select..</option></select>';
    let item = '<input class="form-control search_item_code" type="text" id="itemcode-' + count_length + '" data-row="' + count_length + '" style="width: 300px;" ><div id="suggesstion-box" class="list-group" style=" display: block;z-index: 9999999;position: absolute; height:150px; overflow-y: scroll;">'
    let item2 = '<div class="search_item_code ui fluid search selection dropdown">< input type = "hidden" name = "country" ><i class="dropdown icon"></i><div class="default text">Select Country</div><div class="menu"></div></div >'
    //let qty = '<input type="text" class="form-control" id="qty' + count_length + '" name="" data-row="' + count_length +'" value="" disabled>'
    //let inter = '<input type="text" class="form-control" id="inter' + count_length + '" name="" data-row="' + count_length +'" value="" disabled>'
    let qty = '<input type="text" class="form-control" id="unit-' + count_length + '">'
    let inter = '<input type="text" class="form-control" id="stktype-' + count_length + '" name="stktype' + count_length + '" data-row="' + count_length + '" value="">'
    let qty_no = '<input type="text" class="form-control discount count_tt" id="trnqty-' + count_length + '" name="" data-row="' + count_length + '" value="1">'
    let price_qty = '<input type="text" class="form-control discount count_tt" id="trnprice-' + count_length + '" name="trnprice' + count_length + '" data-row="' + count_length + '" value="0.0">'
    let pro_1per = '<input type="text" class="form-control discount count_tt" id="discount1-' + count_length + '" name="discount1' + count_length + '" data-row="' + count_length + '" value="0">'
    let pro_2per = '<input type="text" class="form-control discount count_tt" id="discount2-' + count_length + '" name="discount1' + count_length + '" data-row="' + count_length + '" value="0">'
    let price_tt1 = '<input type="text" class="form-control pricenet" id="pricenet-' + count_length + '" name="pricenet' + count_length + '" data-row="' + count_length + '" disabled value="0.0">'
    let price_tt = '<span type="text" class="pricenet" id="pricenet-' + count_length + '" name="pricenet' + count_length + '" data-row="' + count_length + '"></span><span id="dis-' + count_length + '" class="dis hide"></span>'
    //let action = '<button type="button" data-row="' + count_length + '" style="margin: .25rem .125rem;" class="btn btn-success">Save</button>' + '<button type="button" data-row="' + count_length + '" style="margin: .25rem .125rem;" class="btn btn-danger">Delete</button>';
    let btn_add = '<button  onclick="$.Create_newitem(' + count_length + ');" type="button" style="margin: .25rem .125rem;" data-row="' + count_length + '" class="btn btn btn-outline-success btn-sm add-item">Add</button>';
    let btn_delete = '<button type="button" style="margin: .25rem .125rem;" data-row="' + count_length + '"id="delete-item-' + count_length + '" class="btn btn btn-outline-danger btn-sm delete-item">Delete</button>';

    $('#tbl-list-item').append('<tr data-row="' + count_length + '" class="row-' + count_length + '"><td class=" tx-center">' + count_length + '</td><td class=" tx-center">' + item1 + '</td> <td class=" tx-center">' + qty + '</td> <td class=" tx-center">' + inter + '</td> <td class=" tx-center">' + qty_no + '</td> <td class=" tx-center">' + price_qty + '</td> <td class=" tx-center">' + pro_1per + '</td> <td class=" tx-center">' + pro_2per + '</td> <td class=" tx-center">' + price_tt + '</td> <td class=" tx-center">' + btn_add + btn_delete + '</td>' + '</tr>')

    var search_text = "CONCAT(RTRIM(code),' - ',RTRIM(CHRCODE),' - ',RTRIM(name),' / ',RTRIM(gbarcode),' / ',RTRIM(SPCODES))"

    $('.count_tt').keyup(async function (e) {
        e.preventDefault();
        let qty_no_val = $("#trnqty-" + count_length).val() != '' ? $("#trnqty-" + count_length).val() : '0';
        let price_qty_val = $("#trnprice-" + count_length).val() != '' ? $("#trnprice-" + count_length).val() : '0';
        let pro_1per_val = $("#discount1-" + count_length).val() != '' ? $("#discount1-" + count_length).val() : '0';
        let pro_2per_val = $("#discount2-" + count_length).val() != '' ? $("#discount2-" + count_length).val() : '0';

        let count_pricenet = (parseInt(qty_no_val) * parseInt(price_qty_val))
        let discount1_count = ((parseInt(count_pricenet) * parseInt(pro_1per_val)) / 100)
        let discount2_count = ((parseInt(count_pricenet) * parseInt(pro_2per_val)) / 100)
        let price_tt_count = (count_pricenet - (discount1_count + discount2_count))

        $('#pricenet-' + count_length).html(price_tt_count)
    });


    $('#item-' + count_length).select2({
        tags: true,
        ajax: {
            url: url_api_local + 'v1/product_select',
            dataType: 'json',
            width: 'resolve',
            dropdownAutoWidth: true,
            minimumInputLength: 2,
            minimumResultsForSearch: 50,
            data: function (params) {
                var query = {
                    id: 'RTRIM(code)',
                    text: search_text,
                    keywords: typeof params.term !== 'undefined' ? params.term : ''
                }
                //console.log(params);
                return query;
            },
            matcher: function (params, data) {
                return matchStart(params, data);
            },
            processResults: function (resulte, search) {
                return {
                    results: $.map(resulte.data, function (item) {
                        return {
                            text: item.text,
                            item_id: item.id,
                            id: item.name,
                            spcode: item.SPCODE,
                            unit: item.UOM,
                            gbarcode: item.gbarcode,
                            stktype: item.ctype
                        }
                    })
                };
            },
        }

    });

    $('#item-' + count_length).on('select2:select', function (e) {
        var data = e.params.data;
        spcode = data.spcode ? data.spcode : '';
        gbarcode = data.gbarcode ? data.gbarcode : '';
        stkcod = data.item_id ? data.item_id : '';

        $('#unit-' + count_length).val(data.unit)
        $('#stktype-' + count_length).val(data.stktype)
    });

    $('#tbl-list-item').on('click', '.delete-item', function () {
        let row = $(this).data('row')
        $('.row-' + row).remove()
    });


    //$('.add-item').one('click', function (event) {
    //    alert("The " + event.type + " event happened!");        

    //    event.preventDefault();
    //    $(this).off('click');

    //    let datarow = $(this).data('row')

    //    //console.log('row', datarow)
    //    //console.log('item', $('#item-' + datarow).val())
    //    //console.log('trnprice', $('#trnprice-' + datarow).val())
    //    //console.log('stktype', $('#stktype-' + datarow).val())
    //    //console.log('unit', $('#unit-' + datarow).val())
    //    //console.log('trnqty', $('#trnqty-' + datarow).val())
    //    //console.log('discount1', $('#discount1-' + datarow).val())
    //    //console.log('discount2', $('#discount2-' + datarow).val())
    //    //console.log('pricenet', $('#pricenet-' + datarow).html())


    //    //$.Create_newitem(datarow)
    //});

}

$.pk_modal = async function () {

    $('#frm_add_pk').on('hidden.bs.modal', function () {
        $('#frm_addpk input').val('')
    });

    $('#pk_number_new').keyup(async function (e) {

        e.preventDefault();
        $(this).val($(this).val().toUpperCase());

        //if (e.keyCode >= 65 && e.keyCode <= 105) {
        if ($(this).val().length === 12) {

            //$("#global-loader").fadeIn("slow");
            $('.btn-save-formpk').prop('disabled', true);

            let dup = CheckPk($(this).val());

            console.log('pk dup: ' + dup);

            if (dup == 0) {
                $('.btn-save-formpk').prop('disabled', false);

            } else if (dup == 1) {
                $('.btn-save-formpk').prop('disabled', true);

                Swal.fire(
                    'PK นี้มีอยู่แล้ว',
                    'กรุณาลองใหม่อีกครั้ง!',
                    'info'
                )

            } else if (dup == 2) {
                $('.btn-save-formpk').prop('disabled', true);

                Swal.fire(
                    'PK นี้ไม่ถูกต้อง',
                    'กรุณาตรวจสอบลูกค้าของรายการ PK นี้!',
                    'info'
                )
            }
        }

        //}

    });
}

$.CreateNewPk = async function () {

    $('.btn-save-formpk').on('click', function (e) {
        e.preventDefault();


        let submit_action = $(this).data('action');

        $('#frm_addpk').parsley().validate();

        //alert($('#frm_addpk').parsley().isValid())

        if ($('#frm_addpk').parsley().isValid()) {

            let inv_tax_jobno = $('#frm_header #inv_tax_jobno').val()
            //alert(inv_tax_jobno);

            //$("#global-loader").fadeIn("slow");

            let add_data = {
                invapp_tax_hearder_id: head_id,
                inv_tax_jobno: inv_tax_jobno,
                pk_number: $('#frm_addpk #pk_number_new').val(),
                record_status: '1',
                created_by: name,
                pMessage: ''
            };

            var params = [];
            for (const i in add_data) {
                params.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            fetch(inv_pk_create, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                //mode: 'no-cors', // no-cors, *cors, same-origin
                //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                //credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params.join("&"),
            }).then(data => {
                //console.log(data);
                return data.json();
            }).then(data => {
                console.log(data.status);

                if (data.status === 'Error') {
                    $.LoadingOverlay("hide");

                    $("#global-loader").fadeOut("slow");

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
                    //$.LoadingOverlay("hide");
                    //$("#global-loader").fadeOut("slow");
                    $('.btn-save-formpk').prop('disabled', true);


                    if (submit_action === "save_exit") {
                        toastr.success('Save Successfully!', async function () {
                            $('.btn-save-formpk').prop('disabled', false);
                            $('#frm_add_pk').modal('hide');
                            $.Header_Get();

                        });

                    } else if (submit_action === "save_new") {
                        toastr.success('Save Successfully!', async function () {
                            $.Header_Get();

                            $('#frm_addpk input').val('');
                            $('#frm_addpk input').eq(0).focus();
                            $('.btn-save-formpk').prop('disabled', false);
                        });
                    } else {
                        toastr.error('Error writing document');
                    }

                }

            }).catch((error) => {
                $("#global-loader").fadeOut("slow");
                // toastr.error(data.error_message);
                toastr.error(error);
            });

            return false;
        }

    })

};

$.DeletePK = async function (pkitem) {
    Swal.fire({
        title: '<span style="font-size:18px;">ยืนยันการลบหรือไม่ ? </span>',
        //html: '<span style="font-size:14px;">รหัสอ้างอิง ' + citem['cn_pre_job_jobno'] + '</span>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {

        if (result.isConfirmed) {
            let edit_data = {
                id: pkitem['pk_id'],
                pk_number: pkitem['pk_number'],
                invapp_tax_hearder_id: pkitem['invapp_tax_hearder_id'],
                inv_tax_jobno: $('#inv_tax_jobno').val(),
                updated_by: name,
                record_status: '2',
                pMessage: ''
            };

            var params = [];
            for (const i in edit_data) {
                params.push(i + "=" + encodeURIComponent(edit_data[i]));
            }

            fetch(inv_pk_delete, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params.join("&"),
            }).then(data => {
                return data.json();
            }).then(data => {
                toastr.success('Delete Successfully!', async function () {

                    ////$.itemGet();
                    location.reload();

                });

            }).catch(error => {
                toastr.error(error, 'Error writing document');
                //console.error("Error writing document: ", error);
            })
        }
    })

}


function viewReport(report) {
    let inv_tax_jobno = $('#inv_tax_jobno').val()
    if (report == 'inv') {
        location.href = url_report_inv + '&inv_tax_jobno=' + inv_tax_jobno;
    } else {
        location.href = url_report_qo + '&inv_tax_jobno=' + inv_tax_jobno;
    }
}


function CheckPk(pk_number) {
    var dup
    $.ajax({
        url: inv_pk_check,
        type: "get",
        dataType: "json",
        data: {
            pk_number: pk_number,
            emmas_code: $('#emmas').val(),
            record_status: '1'
        },
        async: false,
        success: function (results) {
            $.each(results.data, function (index, data) {
                if (data['dup_pk'] == '1') {
                    dup = 1
                } else if ((data['dup_emmas'] == '0' && data['emmas_code'] != null)) {
                    dup = 2
                } else {
                    dup = 0
                }
            });

            // = data.length;
        }
    });
    return dup;

    //$("#global-loader").fadeIn("slow");

    //let inv_pk_get_api = new URL(inv_pk_get);

    //inv_pk_get_api.search = new URLSearchParams({
    //    pk_number: pk_number,
    //    mode: 'Search',
    //    record_status: '1'
    //});
    //fetch(inv_pk_get_api).then(function (response) {

    //    return response.json();

    //}).then(function (result) {
    //    $.LoadingOverlay("hide");
    //    $("#global-loader").fadeOut("slow");

    //    if (result.status === 'Error') {

    //        Swal.fire({
    //            icon: 'error',
    //            title: 'Oops...',
    //            text: 'Something went wrong!',
    //            //footer: '<a href>Why do I have this issue?</a>'
    //        }).then((result) => {
    //            if (result.isConfirmed) {

    //                location.reload();

    //            }
    //        })


    //    } else {

    //        if (result.length > 0) {
    //            //alert(1)
    //            return 1;
    //        } else {
    //            //alert(0)
    //            return 0;
    //        }

    //    }
    //});

}

function isNumber(evt, element) {

    var charCode = (evt.which) ? evt.which : event.keyCode

    if (
        //(charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
        (charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(document).ready(async function () {
    await $.Tax_number_Get();
    await $.Company_Get();
    await $.init();
});

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        var full_mail = user.email;
        name = full_mail.replace("@vskautoparts.com", "");

    } else {

        window.location.assign('./login');

    }

});