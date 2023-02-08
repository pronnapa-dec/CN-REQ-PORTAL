'use strict';

let fs = firebase.firestore();
let oTable, name, oTable_inv, branch, cus_branch, citem;


const url_api_master = 'http://192.168.1.247/vsk-api-acc/';
const url_api_local = "http://localhost:49705/";

const company_get = url_api_local + '/v1/company_get';
const url_invfile_get = url_api_local + '/v1/inv_invfile_get';
const url_invtra_get = url_api_local + '/v1/inv_invtra_get';
const customer_select2_get = url_api_master + 'api/ACC/VSK_Emmas_Select2_GET';
const customer_get = url_api_master + 'api/ACC/VSK_Emmas_GET';
const rdfile_get = url_api_local + '/v1/rdfile_get';
const inv_header_get = url_api_local + '/v1/inv_header_get';
const inv_items_get = url_api_local + '/v1/inv_items_get';
const inv_header_create = url_api_local + 'v1/inv_header_create';
const inv_items_create = url_api_local + 'v1/inv_items_create';
let pricenet_all = 0, invsumtt = 0, invnet = 0, invvat = 0, trnprnet = 0, trnprice = 0, trnamo = 0;

$.init = async function () {

    $('#tbl-list').DataTable();
    $.Saletra_Get('');
    $.Company_Get();
    $.ItemsList('');

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

    $('#iv_number').keyup(async function (e) {

        e.preventDefault();
        $(this).val($(this).val().toUpperCase());

        if ($(this).val().length === 12) {

            if (e.keyCode >= 65 && e.keyCode <= 105) {

                $.Header_Get();
            }

        } else {

            //$('#frm_header input').val('')

        }

    });

    $('#emmas').select2({
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
            $.Customer_Get();
        }
    })

    $('input[type=radio][name=has_discount]').change(function () {
        if (this.value == '1') {
            $('#discount_bath').removeClass('hide');
            $('#discount_per').addClass('hide');
        } else if (this.value == '2') {
            $('#discount_bath').addClass('hide');
            $('#discount_per').removeClass('hide');
        }
    });

    $(".clear_btn").on('click', function () {
        $('#frm_header select').val('').trigger('change');
        $("#co_name option").removeAttr("selected").trigger('change');
        $("#co_name").val('').trigger('change');
        $('.btn-save').prop('disabled', true);
        $.ItemsList('');

    })

    $('#save').on('click', function (e) {
        e.preventDefault();
        $.Create();
    });

    $('#add-item').on('click', function (e) {
        e.preventDefault();

        let count_length = $("#tbl-list-item tr").length;

        let item1 = '<select class="form-control  select2 search_item_code" id="item' + count_length + '" data-row="' + count_length + '" style="width: 300px;" required data-parsley-error-message="กรุณาเลือก..."> <option value=""> Please select..</option></select>';
        let item = '<input class="form-control search_item_code" type="text" id="itemcode-' + count_length + '" data-row="' + count_length + '" style="width: 300px;" ><div id="suggesstion-box" class="list-group" style=" display: block;z-index: 9999999;position: absolute; height:150px; overflow-y: scroll;">'
        //let qty = '<input type="text" class="form-control" id="qty' + count_length + '" name="" data-row="' + count_length +'" value="" disabled>'
        //let inter = '<input type="text" class="form-control" id="inter' + count_length + '" name="" data-row="' + count_length +'" value="" disabled>'
        let qty = '<input type="text" class="form-control" id="unit-' + count_length + '">'
        let inter = '<input type="text" class="form-control" id="stktype-' + count_length + '" name="stktype' + count_length + '" data-row="' + count_length + '" value="">'
        let qty_no = '<input type="text" class="form-control discount" id="trnqty-' + count_length + '" name="" data-row="' + count_length + '" value="1">'
        let price_qty = '<input type="text" class="form-control discount" id="trnprice-' + count_length + '" name="trnprice' + count_length + '" data-row="' + count_length +'" value="0.0">'
        let pro_1per = '<input type="text" class="form-control discount" id="discount1-' + count_length + '" name="discount1' + count_length + '" data-row="' + count_length +'" value="0">'
        let pro_2per = '<input type="text" class="form-control discount" id="discount2-' + count_length + '" name="discount1' + count_length + '" data-row="' + count_length +'" value="0">'
        let price_tt1 = '<input type="text" class="form-control pricenet" id="pricenet-' + count_length + '" name="pricenet' + count_length + '" data-row="' + count_length +'" disabled value="0.0">'
        let price_tt = '<span type="text" class="pricenet" id="pricenet-' + count_length + '" name="pricenet' + count_length + '" data-row="' + count_length + '"></span><span id="dis-'+ count_length +'" class="dis hide"></span>'
        let action = '<button type="button" data-row="' + count_length + '" style="margin: .25rem .125rem;" class="btn btn-success">Save</button>' + '<button type="button" data-row="' + count_length +'" style="margin: .25rem .125rem;" class="btn btn-danger">Delete</button>';

        $('#tbl-list-item').append('<tr><td class=" tx-center">' + count_length + '</td><td class=" tx-center">' + item + '</td> <td class=" tx-center">' + qty + '</td> <td class=" tx-center">' + inter + '</td> <td class=" tx-center">' + qty_no + '</td> <td class=" tx-center">' + price_qty + '</td> <td class=" tx-center">' + pro_1per + '</td> <td class=" tx-center">' + pro_2per + '</td> <td class=" tx-center">' + price_tt + '</td> <td class=" tx-center">' + action + '</td>' + '</tr>')

        var search_text = "CONCAT(RTRIM(code),' - ',RTRIM(CHRCODE),' - ',RTRIM(name),' / ',RTRIM(gbarcode),' / ',RTRIM(SPCODES))"

        $("#suggesstion-box").hide();

        let dataItem

        $(".search_item_code").keyup(function () {
            let dataRow = $(this).data('row')
            $.ajax({
                url: url_api_local + 'v1/product_select',
                data: { id: 'RTRIM(code)', text: search_text, keywords: $(this).val() },
                beforeSend: function () {
                    $("#search-box").css("background", "#FFF");
                },
                success: function (result) {
                    $("#suggesstion-box").show();
                    $("#suggesstion-box a").remove();
                    var text_item
                    $.each(result.data, function (index, item) {
                        let code = item['id'];
                        text_item = item['text'];
                        let stringtify = JSON.stringify(item)
                        $("#suggesstion-box").append("<a data-item='" + stringtify + "' class='list-group-item list-group-item-action list-code' style='width: 300px; cursor: pointer;' data-code='" + code + "'>" + item['text'] + "</a>");

                    });


                    $('#suggesstion-box > a').on('click', function (e) {
                        e.preventDefault();
                        dataItem = $(this).data('item');
                        let stktype = dataItem['id'];
                        let dataRow = $(this).data('row')

                        $('#suggesstion-box > a').remove();

                        $('#itemcode-' + dataRow).val(dataItem['text']);
                        $('#unit-' + dataRow).val(dataItem['UOM']);
                        $('#stktype-' + dataRow).val(dataItem['ctype']);
                        //$('#uom-' + dataRow).val(dataItem['gprice']);
                        $('#trnprice-' + dataRow).val(dataItem['gprice']);
                        //$('#discount1-' + dataRow).val(dataItem['gprice']);
                        //$('#discount2-' + dataRow).val(dataItem['gprice']);
                        $('#pricenet-' + dataRow).html(dataItem['gprice']);

                    })
                }
            });
        });

        $('.discount').keyup(function () {

            let data = $(this).data('row');

            let discount1 = $("#discount1-" + data).val() != '' ? $("#discount1-" + data).val() : '0';
            let discount2 = $("#discount2-" + data).val() != '' ? $("#discount2-" + data).val() : '0';
            let trnqty = $("#trnqty-" + data).val() != '' ? $("#trnqty-" + data).val() : '0';
            let trnprice = $("#trnprice-" + data).val() != '' ? $("#trnprice-" + data).val() : '0';

            let count_pricenet = (parseInt(trnqty) * parseInt(trnprice))
            let discount1_count = ((parseInt(count_pricenet) * parseInt(discount1)) / 100)
            let discount2_count = ((parseInt(count_pricenet) * parseInt(discount2)) / 100)
            let count_pricett = (count_pricenet - discount1_count - discount2_count)

            let dis_item = ((((parseInt(trnprice) * parseInt(trnqty)) * discount1) / 100) + (((parseInt(trnprice) * parseInt(trnqty)) * discount2) / 100));

            $('#dis-' + data).html(dis_item).trigger('change');

            console.log('discount1', discount1)
            console.log('discount2', discount2)
            console.log('trnqty', trnqty)
            console.log('trnprice', trnprice)
            console.log('discound total', dis_item)
            console.log('count_pricenet', count_pricenet)
            console.log('count_pricett', count_pricett)

            $("#pricenet-" + data).html(count_pricett).trigger('change');

        })

        $('.pricenet').on('change', function () {

            setTimeout(function () {
                let count_price_all = 0
                let dis_all = 0;
                var dataTb = oTable.rows().data();

                console.log('tt chnage');

                $('#tbl-list-item tbody tr').each(function (index, val) {
                    //dataTb.each(function (value, index) {
                    var price = $('.pricenet', val).text();
                    //var dis_it = $('[name="dis-'+ index +'"]', index).data('dis');
                    var dis_it = $('.dis', val).html();
                    count_price_all += Number(price);
                    dis_all += Number(dis_it);

                });


                let vat = ((count_price_all * 7) / 100);
                let deposit = $("#deposit").val() != '' ? $("#deposit").val() : '0';
                let amo_bill = ((count_price_all + vat) - parseInt(deposit));
                let trade_discount = (count_price_all);


                $('#trade_discount').html(numberWithCommas(dis_all.toFixed(2))).trigger('change');
                $('#discount_total').html(numberWithCommas(count_price_all.toFixed(2))).trigger('change');
                $('#vat_total').html(numberWithCommas(vat.toFixed(2))).trigger('change');
                $('#deposit').html(numberWithCommas(parseInt(deposit).toFixed(2))).trigger('change');
                $('#price_net_total').html(numberWithCommas(amo_bill.toFixed(2))).trigger('change');


            }, 1000);
        })

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
                scrollX: true,
                scrollY: "410px",
                scrollCollapse: true,
                columns: [
                    {
                        title: "<span style='font-size:11px;'>ลำดับ</span>",
                        class: "tx-center",
                        width: "70px",
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
                            return '<span data-json="' + data_json +'" id="itemcode-' + data_row + '">' + data + '</span>';
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
                            //return '<input type="text" data-row="' + data_row+'" class="form-control discount" id="discount1-' + barcord + '" name="discount1" >'
                            return "<input type='text' data-json='" + data_json + "' value='" + data + "' data-row='" + data_row + "' class='form-control discount trnqty' id='trnqty-" + data_row + "' name='trnqty' >"
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
                            return "<span data-json='" + data_json + "' id='trnprice-" + data_row + "' data-dis='" + discout + "' data-row='" + data_row + "'>" + data + "</span>" + "<span class='hide dis' id='dis-" + data_row + "' data-json='" + data_json + "' name='dis-" + (meta.row + 1) + "' >" + discout + "</span>"
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
                            //return '<input type="text" data-row="' + data_row+'" class="form-control discount" id="discount1-' + barcord + '" name="discount1" >'
                            return "<input type='text' data-json='" + data_json + "' value='" + data + "' data-row='" + data_row + "' class='form-control discount' id='discount1-" + data_row + "' name='discount1' >"
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
                            return "<input type='text' data-json='" + data_json + "' value='" + data + "' data-row='" + data_row + "' class='form-control discount' id='discount2-" + data_row + "' name='discount2' >"
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
                            return "<span class='pricenet' data-json='" + data_json +"' data-row='" + data_row + "' id='pricenet-" + data_row + "' >" + data + "</span>" 
                        }
                    },
                    {
                        title: "<span style='font-size:11px;'>Action</span>",
                        class: "tx-center",
                        width: "150px",
                        render: function (data, type, row, meta) {
                            let data_row = meta.row + 1
                            let data_json = JSON.stringify(row)
                            //return '<button type="button" disabled style="margin: .25rem .125rem;" data-row="' + data_row + '"  class="btn btn-success">Save</button>' + '<button type="button" disabled style="margin: .25rem .125rem;" data-row="' + data_row + '" class="btn btn-danger">Delete</button>'
                            return "<button type='button' disabled style='margin: .25rem .125rem;' data-json='" + data_json +"' data-row='" + data_row + "'  class='btn btn-success'>Save</button>" + "<button type='button' disabled style='margin: .25rem .125rem;' data-row='" + data_row + "' class='btn btn-danger'>Delete</button>"
                        }

                    }
                ],
                //"order": [[1, "desc"]],
                "initComplete": function (settings, json) {

                    let price_discount_file = (trnprice - trnamo);


                    $('#trade_discount').html(numberWithCommas(price_discount_file.toFixed(2))).trigger('change');
                    $('#discount_total').html(numberWithCommas(invnet.toFixed(2))).trigger('change');
                    $('#vat_total').html(numberWithCommas(invvat.toFixed(2))).trigger('change');
                    $('#price_net_total').html(numberWithCommas(invsumtt.toFixed(2))).trigger('change');

                    $('.dis').addClass('hide');

                    $('.discount').keyup(function () {

                        let data = $(this).data('row');


                        let discount1 = $("#discount1-" + data).val() != '' ? $("#discount1-" + data).val() : '0';
                        let discount2 = $("#discount2-" + data).val() != '' ? $("#discount2-" + data).val() : '0';
                        let trnqty = $("#trnqty-" + data).val() != '' ? $("#trnqty-" + data).val() : '0';
                        let trnprice = $("#trnprice-" + data).html() != '' ? $("#trnprice-" + data).html() : '0';

                        let count_pricenet = (parseInt(trnqty) * parseInt(trnprice))
                        let discount1_count = ((parseInt(count_pricenet) * parseInt(discount1)) / 100)
                        let discount2_count = ((parseInt(count_pricenet) * parseInt(discount2)) / 100)
                        let count_pricett = (count_pricenet - discount1_count - discount2_count)

                        let dis_item = ((((parseInt(trnprice) * parseInt(trnqty)) * discount1) / 100) + (((parseInt(trnprice) * parseInt(trnqty)) * discount2) / 100));

                        $('#dis-' + data).html(dis_item).trigger('change');

                        //console.log('dis_item', dis_item)
                        //console.log('trnqty', $('#trnqty-' + data['stkcod']).val())
                        //console.log('trnprice', $('#trnprice-' + data['stkcod']).html())
                        //console.log('discount1', discount1_count)
                        //console.log('discount2', discount2_count)
                        //console.log('count_pricenet', count_pricenet)
                        //console.log('count_pricett', count_pricett)


                        $("#pricenet-" + data).html(count_pricett).trigger('change');

                    })

                    $('.pricenet').on('change', function () {

                        setTimeout(function () {
                            let count_price_all = 0
                            let dis_all = 0;
                            var dataTb = oTable.rows().data();

                            $('#tbl-list-item tbody tr').each(function (index, val) {
                            //dataTb.each(function (value, index) {
                                var price = $('.pricenet', val).text();
                                //var dis_it = $('[name="dis-'+ index +'"]', index).data('dis');
                                var dis_it = $('.dis', val).html();
                                count_price_all += Number(price);
                                dis_all += Number(dis_it);

                            });


                            let vat = ((count_price_all * 7) / 100);
                            let deposit = $("#deposit").val() != '' ? $("#deposit").val() : '0';
                            let amo_bill = ((count_price_all + vat) - parseInt(deposit));
                            let trade_discount = (count_price_all);


                            $('#trade_discount').html(numberWithCommas(dis_all.toFixed(2))).trigger('change');
                            $('#discount_total').html(numberWithCommas(count_price_all.toFixed(2))).trigger('change');
                            $('#vat_total').html(numberWithCommas(vat.toFixed(2))).trigger('change');
                            $('#deposit').html(numberWithCommas(parseInt(deposit).toFixed(2))).trigger('change');
                            $('#price_net_total').html(numberWithCommas(amo_bill.toFixed(2))).trigger('change');


                        }, 1000);


                    })


                    //$.Sumary();

                },

            });


        }
        
    });

}

$.Salefile_Get = async function () {
    fetch(url_invfile_get + '?number=' + $('#iv_number').val()).then(function (response) {

        return response.json();

    }).then(function (result) {
        if (result.length > 0) {
            let qo_num = Math.floor(Math.random() * 10000000000 + 1);
            $('#qo_num').val('QO' + qo_num);
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
            });

            $.ItemsList($('#iv_number').val());

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

                alert('no data')

            }

        }
        return false;

    });
    return false;
}

$.ItemsList = async function (number) {
    if (number == '') {
        oTable = $('#tbl-list-item').DataTable({
            data: [],
            paging: false,
            info: false,
            searching: false,
            autoWidth: true,
            destroy: true,
            scrollX: true,
            scrollY: "410px",
            scrollCollapse: true,
            columns: [
                {
                    title: "<span style='font-size:11px;'>ลำดับ</span>",
                    class: "tx-center", width: "70px"
                },
                {
                    title: "<span style='font-size:11px;'>Item</span>",
                    width: "200px"
                },
                {
                    title: "<span style='font-size:11px;'>หน่วยนับ</span>",
                    width: "70px"
                },
                {
                    title: "<span style='font-size:11px;'>แท้ห้าง/อื่นๆ</span>",
                    width: "70px"
                },
                {
                    title: "<span style='font-size:11px;'>จำนวนหน่วย</span>",
                    width: "70px"
                },
                {
                    title: "<span style='font-size:11px;'>ราคา/หน่วย</span>",
                    width: "70px"
                },
                {
                    title: "<span style='font-size:11px;'>ส่วนลด ระดับ 1 (%)</span>",
                    width: "70px"
                },
                {
                    title: "<span style='font-size:11px;'>ส่วนลด ระดับ 2 (%)</span>",
                    width: "70px"
                },
                {
                    title: "<span style='font-size:11px;'>จำนวนเงิน</span>",
                    width: "70px"
                },
                {
                    title: "<span style='font-size:11px;'>Action</span>",
                    class: "tx-center", width: "150px"
                }
            ]
        });

    } else {
        let inv_items_get_api = new URL(inv_items_get);

        inv_items_get_api.search = new URLSearchParams({
            iv_number: number,
            record_status: '1',
            mode: 'Search',
        });

        fetch(inv_items_get_api).then(function (response) {

            return response.json();

        }).then(function (result) {
            if (result.length > 0) {
                $.itemGet(result);
            } else {
                $.Saletra_Get(number)
            }
        });

    }


}

$.itemGet = async function (result) {
    $('#add-item').prop('disabled', false);

    oTable = $('#tbl-list-item').DataTable({
        data: result.data,
        scrollCollapse: true,
        paging: false,
        info: false,
        destroy: true,
        searching: false,


        autoWidth: true,
        scrollX: true,
        scrollY: "410px",
        scrollCollapse: true,

        columns: [
            {
                title: "<span style='font-size:11px;'>ลำดับ</span>",
                class: "tx-center",
                width: "70px",
                render: function (data, type, row, meta) {
                    return (meta.row + 1);
                }

            },
            {
                title: "<span style='font-size:11px;'>Item</span>",
                width: "300px",
                class: "tx-center",
                data: "item_number",
                render: function (data, type, row, meta) {
                    let stkcod = row.stkcod != null ? row.stkcod : '-';
                    let data_json = JSON.stringify(row)
                    let data_row = meta.row + 1

                    return '<span data-json="' + data_json +'" id="itemcode-' + data_row +'">' + data + '</span>';
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

                    return '<span data-json="' + data_json +'" id="unit-' + data_row + '">' + data + '</span>';

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

                    return '<span data-json="' + data_json +'" id="stktype-' + data_row + '">' + data + '</span>';

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
                    return "<input type='text' data-json='" + data_json + "' value='" + data + "' data-row='" + data_row + "' class='form-control uom discount' id='trnqty-" + data_row + "' name='uom' >"
                //    return '<input type="text" value="' + data + '" data-row="' + data_row + '" class="form-control uom" id="uom-' + stkcod + "' name="uom" >'
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

                    return '<span id="trnprice-' + data_row +'">' + data + '</span">'
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
                    return "<input type='text' data-json='" + data_json +"' value='" + data + "' data-row='" + data_row + "' class='form-control discount' id='discount1-" + data_row + "' name='discount1' >"
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
                    return "<input type='text' data-json='" + data_json + "' value='" + data + "' data-row='" + data_row + "' class='form-control discount' id='discount2-" + data_row + "' name='discount2' >"
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
                    let discout = ((row.trnprice * row.trnqty) * (row.disone) / 100) + ((row.trnprice * row.trnqty) * (row.distwo) / 100)
                    return "<span class='pricenet' data-json='" + data_json + "' data-row='" + data_row + "' id='pricenet-" + data_row + "' >" + (row.qty * row.price_qty) + "</span>" + "<span class='hide dis' id='dis-" + data_row + "' name='dis-" + data_row + "' >" + discout + "</span>"
                }
            },
            {
                title: "<span style='font-size:11px;'>Action</span>",
                class: "tx-center",
                width: "150px",
                render: function (data, type, row, meta) {
                    let data_json = JSON.stringify(row)
                    let data_row = meta.row + 1
                    return '<button type="button" data-json="' + data_json +'" style="margin: .25rem .125rem;" data-row="' + data_row + '"  class="btn btn-success">Save</button>' + '<button type="button" style="margin: .25rem .125rem;" data-row="' + data_row + '" class="btn btn-danger">Delete</button>'
                }

            }
        ],
        //"order": [[1, "desc"]],
        "initComplete": function (settings, json) {

            $('.dis').addClass('hide');

            $.Sumary();

        },

    });

}

$.Customer_Get = async function () {
    let customer_get_api = new URL(customer_get);

    customer_get_api.search = new URLSearchParams({
        emmas_code: $('#emmas').val().trim(),
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
                $('#ebranch').val(item['ebranch']);
            });

        }

    });
    return false;
}

$.Header_Get = async function () {
    let inv_header_get_api = new URL(inv_header_get);

    inv_header_get_api.search = new URLSearchParams({
        iv_number: $('#iv_number').val(),
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
            if (result.length > 0) {
                $.each(result.data, function (key, val) {
                    fetch(customer_select2_get + '?search=' + val['emmas_code']).then(function (response) {

                        return response.json();

                    }).then(function (result) {
                        $.each(result.data, function (key, data) {
                            $('#emmas').append(`<option value="${data['id']}">${data['text']}</option>`);
                            $('#emmas').val(data['id']).trigger('change');
                        })
                    })

                    $('#qo_num').val(val['quote_number']);
                    $('#invdate').val(moment(val['inv_date'].substring(0, 10), 'YYYY/MM/DD').format('DD/MM/YYYY'));
                    $('#co_name').val(val['invapp_masterdata_company_id']).trigger('change');
                    $('#due_date').val(moment(val['payment_due'].substring(0, 10), 'YYYY/MM/DD').format('DD/MM/YYYY'));
                    $('#clame').val(val['claim_number']);
                    $('#invdue').val(val['credit']);
                    $('#edue').val(val['payment_type']);
                    $("[name=has_discount][value='" + val['has_discount'] + "']").prop("checked", true).trigger('change');
                    $('#discount_per').val(val['discount_percent']);
                    $('#discount_baht').val(val['discount_baht']);
                    $('#tsno').val(val['car_number_plate']);
                    $("[name=pro][value='" + val['has_promotion'] + "']").prop("checked", true).trigger('change');
                    $("[name='invnet']").val(val['deposit_total']);
                    $("[name=status][value='" + val['status_inv'] + "']").prop("checked", true).trigger('change');
                    $('#reject_descript').val(val['reject_descript']);

                    let trade_discount = numberWithCommas(val['trade_discount'].toFixed(2))
                    let discount_total = numberWithCommas(val['discount_total'].toFixed(2))
                    let vat_total = numberWithCommas(val['vat_total'].toFixed(2))
                    let deposit_total = numberWithCommas(val['deposit_total'].toFixed(2))
                    let price_net_total = numberWithCommas(val['price_net_total'].toFixed(2))

                    $('#trade_discount').html(trade_discount).trigger('change');
                    $('#discount_total').html(discount_total).trigger('change');
                    $('#vat_total').html(vat_total).trigger('change');
                    $('#deposit_total').html(deposit_total).trigger('change');
                    $('#price_net_total').html(price_net_total).trigger('change');
                });
                $.ItemsList($('#iv_number').val());

                $('.btn-save').prop('disabled', false);
                $('#update').removeClass('hide');
                $('#save').addClass('hide');

            } else {

                $.Salefile_Get();
                $('.btn-save').prop('disabled', false);
                $('#update').addClass('hide');
                $('#save').removeClass('hide');
                $.ItemsList($('#iv_number').val());

            }


        }
        return false;

    });

}

$.Company_Get = async function () {
    let company_get_api = new URL(company_get);

    company_get_api.search = new URLSearchParams({
        mode: 'Search',
        record_status: 1
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
        taxinvoice: $('#iv_number').val(),
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
    $("#global-loader").fadeIn("slow");

    let add_data = {
        emmas_code: $('#emmas').val().trim(),
        iv_number: $('#iv_number').val(),
        quote_number: $('#qo_num').val(),
        inv_date: moment($('#invdate').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD'),
        invapp_masterdata_company_id: $('#co_name').val(),
        payment_due: moment($('#due_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD'),
        sale_name: $('#sale_name').val(),
        claim_number: $('#clame').val(),
        credit: $('#invdue').val(),
        payment_type: $('#edue').val(),
        has_discount: $('input[name=has_discount]:checked').val(),
        discount_percent: $('input[name=has_discount]:checked').val() == 2 ? $('#discount_per').val() : '',
        discount_baht: $('input[name=has_discount]:checked').val() == 1 ? $('#discount_bath').val() : '',
        vat_std: $('#vat').val(),
        car_number_plate: $('#tsno').val(),
        has_promotion: $('input[name=pro]:checked').val(),
        deposit: $('#deposit').val(),
        status_inv: $('input[name=status]:checked').val(),
        reject_descript: $('input[name=status]:checked').val() == 'reject' ? $('#reject_descript').val() : '',
        pu_no: $('#pu_no').val(),
        trade_discount: $('#trade_discount').html().replaceAll(',', ''),
        discount_total: $('#discount_total').html().replaceAll(',', ''),
        vat_total: $('#vat_total').html().replaceAll(',', ''),
        deposit_total: $('#deposit_total').html().replaceAll(',', ''),
        price_net_total: $('#price_net_total').html().replaceAll(',', ''),
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

        //console.log("inv_header_create", data.data);
        if (data.length > 0) {
            let qo_num = Math.floor(Math.random() * 10000000000 + 1);
            $('#qo_num').val('QO' + qo_num);
            $.Create();

        } else {
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

$.Create_Item = async function () {

    fetch(url_invtra_get + '?number=' + $('#iv_number').val()).then(function (response) {

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
                    spcodes: partno,
                    gbarcode: barcord,
                    stkname: itemname,
                    stkcod: code,
                    iv_number: $('#iv_number').val(),
                    item_number: val['item'].replace(/\s/g, ''), //item_number.replace(/\s/g, ''),
                    unit: val['stkunit'].replace(/\s/g, ''),
                    qty: val['trnqty'],
                    stktype: val['stktype'].replace(/\s/g, ''),
                    price_qty: val['trnprice'],
                    discount1: $('#discount1-' + key).val(),
                    discount2: $('#discount2-' + key).val(),
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
                        console.log(key,': Save Successfully!')
                    }

                }).catch((error) => {
                    toastr.error(error, 'Error writing document');
                });

            })
        ).then(function () {
            // After loop ends.
            toastr.success('Save Successfully!', async function () {
                $.Header_Get();

            });
        });
    });

};

$.Sumary = async function () {

    $('.discount').keyup(function () {

        let data = $(this).data('row');

        let discount1 = $("#discount1-" + data).val() != '' ? $("#discount1-" + data).val() : '0';
        let discount2 = $("#discount2-" + data).val() != '' ? $("#discount2-" + data).val() : '0';
        let trnqty = $("#trnqty-" + data).val() != '' ? $("#trnqty-" + data).val() : '0';
        let trnprice = $("#trnprice-" + data).html() != '' ? $("#trnprice-" + data).html() : '0';

        let count_pricenet = (parseInt(trnqty) * parseInt(trnprice))
        let discount1_count = ((parseInt(count_pricenet) * parseInt(discount1)) / 100)
        let discount2_count = ((parseInt(count_pricenet) * parseInt(discount2)) / 100)
        let count_pricett = (count_pricenet - discount1_count - discount2_count)

        let dis_item = ((((parseInt(trnprice) * parseInt(trnqty)) * discount1) / 100) + (((parseInt(trnprice) * parseInt(trnqty)) * discount2) / 100));

        $('#dis-' + data).html(dis_item).trigger('change');

        console.log('discount1', discount1)
        console.log('discount2', discount2)
        console.log('trnqty', trnqty)
        console.log('trnprice', trnprice)
        console.log('discound total', dis_item)
        console.log('count_pricenet', count_pricenet)
        console.log('count_pricett', count_pricett)

        $("#pricenet-" + data).html(count_pricett).trigger('change');

    })

    $('.pricenet').on('change', function () {

        setTimeout(function () {
            let count_price_all = 0
            let dis_all = 0;
            var dataTb = oTable.rows().data();

            console.log('tt chnage');

            $('#tbl-list-item tbody tr').each(function (index, val) {
                //dataTb.each(function (value, index) {
                var price = $('.pricenet', val).text();
                //var dis_it = $('[name="dis-'+ index +'"]', index).data('dis');
                var dis_it = $('.dis', val).html();
                count_price_all += Number(price);
                dis_all += Number(dis_it);

            });


            let vat = ((count_price_all * 7) / 100);
            let deposit = $("#deposit").val() != '' ? $("#deposit").val() : '0';
            let amo_bill = ((count_price_all + vat) - parseInt(deposit));
            let trade_discount = (count_price_all);


            $('#trade_discount').html(numberWithCommas(dis_all.toFixed(2))).trigger('change');
            $('#discount_total').html(numberWithCommas(count_price_all.toFixed(2))).trigger('change');
            $('#vat_total').html(numberWithCommas(vat.toFixed(2))).trigger('change');
            $('#deposit').html(numberWithCommas(parseInt(deposit).toFixed(2))).trigger('change');
            $('#price_net_total').html(numberWithCommas(amo_bill.toFixed(2))).trigger('change');


        }, 1000);
    })

};

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