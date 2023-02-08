'use strict';

const url_api = 'http://localhost:49705';
//const api_url = 'http://192.168.1.247:8082/mrp-api';
const url_stmas_exp_get = url_api + '/api/Master_stmas_exp_get';
const url_item_master_get = url_api + '/api/ItemMaster_Search';
const url_gcode_get = url_api + '/api/Mas_gcode_get';
const url_gcode_get_select2 = url_api + '/api/Gcode_Get_Select2';
const url_mas_stmas_action = url_api + '/api/Mas_stmas_action';
const url_mas_chk = url_api + '/api/Master_Stams_Exp_Chk';
const url_stmas_exp_update = url_api + '/api/Stmas_Exp_Update';
const objProfile = JSON.parse(localStorage.getItem('objProfile'));

let url_location = "";
url_location = window.location.href;

let temp_id_create = "";
let temp_id_edit = "";
let temp_id_delete = "";

let fs = firebase.firestore();
let oTable;
var user_code;
var full_name;

let customElement = $("<div>", {
    "css": {
        "border": "2px solid",
        "font-size": "14px",
        "text-align": "center",
        "padding": '7px'

    },
    "text": 'Please Wait...'
});
let customChecking = $("<div>", {
    "css": {
        "border": "2px solid",
        "font-size": "14px",
        "text-align": "center",
        "padding": '7px'

    },
    "text": 'Checking...'
});
let customCreating = $("<div>", {
    "css": {
        "border": "2px solid",
        "font-size": "14px",
        "text-align": "center",
        "padding": '7px'

    },
    "text": 'Creating...'
});
let customUpdating = $("<div>", {
    "css": {
        "border": "2px solid",
        "font-size": "14px",
        "text-align": "center",
        "padding": '7px'

    },
    "text": 'Updating...'
});

firebase.auth().onAuthStateChanged(function (user) {

    var full_mail = user.email;
    var name = full_mail.replace("@vskautoparts.com", "");
    let user_fname = objProfile.auth_user_profile[0]['user_fname'];
    let code_raw = objProfile.auth_user_profile[0]['user_lname'];

    user_code = code_raw.substring(code_raw.length - 5, code_raw.length);
    full_name = user_fname + '-' + user_code

    if (user) {

        $.init = async function () {

            toastr.warning('อยู่ระหว่างการทดสอบการใช้งานเท่านั้น (UAT Mode)');
            //$('.container').find('.breadcrumb-header').append('<div class="d-flex my-xl-auto right-content"><div class= "mb-3 mb-xl-0" ><h4 style="color: red;">UAT Version</h4></div ></div >');

            $('.chk_code').hide();
            $('.chk_name').hide();

            await $.List('');

            await $.Select2();

            await $.Search();

            await $('#btn-item_create').click(async function (e) {

                e.preventDefault();

                $('#frm_data').find('input').val('').prop('disabled', false);
                $('#frm_data').find('.remarks').val('').prop('disabled', false);
                $('#modal-frm_data').on('shown.bs.modal', async function () {

                    await $.Create();
                    await setTimeout(function () {
                        $.LoadingOverlay("hide");
                    }, 300);

                })

            });

            await $('#modal-frm_data').on('hidden.bs.modal', function () {

                $('#frm_data').find('input').val('').prop('disabled', false);
                $('#frm_data').find('select').val('').trigger('change.select2').prop('disabled', false);
                $("#frm_data").parsley().reset();
                $('.chk_code').hide();
                $('.chk_name').hide();
                $('#item_code').removeClass('bd-danger tx-danger');
                $('.main_product_view').removeClass('d-none');

                $('.main_product_view').addClass('d-none');
                $('.main_product_view').addClass('d-none');
            });

        };

        $.Search = async function () {

            //console.log('Search function Start', new Date());

            $('#btn-search').on('click', async function (e) {

                e.preventDefault();

                await oTable.destroy();

                await $.List();
                //await $.List('search');

            });

        }

        $.Select2 = function () {

            var search_text = "CONCAT(RTRIM(code),' - ',RTRIM(CHRCODE),' - ',RTRIM(name),' / ',RTRIM(gbarcode),' / ',RTRIM(SPCODES))"
            var create_text = "CONCAT(RTRIM(code),' - ',RTRIM(name))"

            $('#search_item_code').select2({
                width: 'resolve',
                delay: 500,
                dropdownAutoWidth: true,
                minimumInputLength: 3,
                minimumResultsForSearch: 10,
                ajax: {
                    url: url_api + '/api/ItemMaster_Search',
                    dataType: 'json',
                    escapeMarkup: function (markup) {
                        return markup;
                    },
                    data: function (params) {
                        var query = {
                            id: 'RTRIM(code)',
                            text: search_text,
                            keywords: $.trim(typeof params.term !== 'undefined' ? params.term : ' '),
                        }
                        //console.log(params);
                        return query;
                    },
                    matcher: function (params, data) {
                        return matchStart(params, data);
                    },
                    processResults: function (data, search) {

                        return {
                            results: $.map(data.data, function (item) {
                                let icon;
                                let text = item.text;
                                let id = item.id.substring(0, 1)
                                console.log(id);
                                if (id != 'X') {
                                    icon = '<span style="color: #00810E">' + text + '</span>';
                                    // icon = text.css("background-color")
                                } else {
                                    icon = '<span style="color: #FF5733">' + text + '</span>';
                                }

                                return {
                                    text: icon,
                                    id: item.id
                                }
                            })
                        };
                    },
                },
                escapeMarkup: function (markup) {
                    return markup;
                },
            })

            $('#main_product_create').select2({
                width: 'resolve',
                delay: 500,
                dropdownAutoWidth: true,
                minimumInputLength: 3,
                minimumResultsForSearch: 10,
                ajax: {
                    url: url_api + '/api/Product_Main_Search',
                    dataType: 'json',
                    data: function (params) {
                        var query = {
                            id: 'RTRIM(code)',
                            text: create_text,
                            keywords: $.trim(typeof params.term !== 'undefined' ? params.term : ' '),
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
                                //console.log('item', item);
                                return {
                                    text: item.text,
                                    id: item.id
                                }
                            })
                        };
                    },
                }
            })

        }

        $.Gcode_Get = function () {

            $('.gcode_a').select2({
                width: 'resolve',
                delay: 500,
                dropdownAutoWidth: true,
                minimumInputLength: 3,
                minimumResultsForSearch: 10,
                ajax: {
                    url: url_api + '/api/Gcode_Get_Select2',
                    dataType: 'json',
                    data: function (params) {
                        var query = {
                            ctype: 'gcode_aexp',
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
                                //console.log('item', item);
                                return {
                                    text: item.code.trim() + ' - ' + item.gname.trim(),
                                    //text: item.gname.trim(),
                                    id: item.code,
                                    name: item.gname.trim(),
                                }
                            })
                        };
                    },
                    //success: function (result) {
                    //    $.each(result.data, function (key, val) {
                    //        $('.gcode_a').attr('data', wikiTopicId);
                    //        console.log('aj', val['gname'])
                    //    });
                    //}
                }
            })

            $('.gcode_b').select2({
                width: 'resolve',
                delay: 500,
                dropdownAutoWidth: true,
                minimumInputLength: 3,
                minimumResultsForSearch: 10,
                ajax: {
                    url: url_api + '/api/Gcode_Get_Select2',
                    dataType: 'json',
                    data: function (params) {
                        var query = {
                            ctype: 'gcode_b',
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
                                //console.log('item', item);
                                return {
                                    text: item.code.trim() + ' - ' + item.gname.trim(),
                                    //text: item.gname.trim(),
                                    id: item.code,
                                    name: item.gname.trim()
                                }
                            })
                        };
                    },

                }
            })

            $('.gcode_c').select2({
                width: 'resolve',
                delay: 500,
                dropdownAutoWidth: true,
                minimumInputLength: 3,
                minimumResultsForSearch: 10,
                ajax: {
                    url: url_api + '/api/Gcode_Get_Select2',
                    dataType: 'json',
                    data: function (params) {
                        var query = {
                            ctype: 'gcode_c',
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
                                //console.log('item', item);
                                return {
                                    //text: item.gname.trim(),
                                    text: item.code.trim() + ' - ' + item.gname.trim(),
                                    id: item.code,
                                    name: item.gname.trim()
                                }
                            })
                        };
                    },
                }
            })

            $('.gcode_d').select2({
                width: 'resolve',
                delay: 500,
                dropdownAutoWidth: true,
                minimumInputLength: 3,
                minimumResultsForSearch: 10,
                ajax: {
                    url: url_api + '/api/Gcode_Get_Select2',
                    dataType: 'json',
                    data: function (params) {
                        var query = {
                            ctype: 'gcode_d',
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
                                //console.log('item', item);
                                return {
                                    text: item.code.trim() + ' - ' + item.gname.trim(),
                                    //text: item.gname.trim(),
                                    id: item.code,
                                    name: item.gname.trim()
                                }
                            })
                        };
                    },
                }
            })

            $('.gcode_e').select2({
                width: 'resolve',
                delay: 500,
                dropdownAutoWidth: true,
                minimumInputLength: 3,
                minimumResultsForSearch: 10,
                ajax: {
                    url: url_api + '/api/Gcode_Get_Select2',
                    dataType: 'json',
                    data: function (params) {
                        var query = {
                            ctype: 'gcode_e',
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
                                //console.log('item', item);
                                return {
                                    text: item.code.trim() + ' - ' + item.gname.trim(),
                                    //text: item.gname.trim(),
                                    id: item.code,
                                    name: item.gname.trim()
                                }
                            })
                        };
                    },
                }
            })

        }

        $.Main_product_get = async function () {

            $('#frm_data').find('#main_product_create').off('select2:select').on('select2:select', function (evt) {

                evt.preventDefault();

                $(this).on('select2:select', function (evt) {
                    evt.preventDefault();
                });

                $(".modal-content").LoadingOverlay("show", {
                    image: '',
                    custom: customElement
                });

                $('#frm_data').find('#main_product_create').prop('disabled', true);
                $('#frm_data').find('#item_code').prop('disabled', true);
                $('#frm_data').find('#item_name').prop('disabled', true);
                $('#frm_data').find('#barcode').prop('disabled', true);
                $('#frm_data').find('#spcodes').prop('disabled', true);
                $('#frm_data').find('#uom').prop('disabled', true);
                $('#frm_data').find('#qty').prop('disabled', true);
                // $('#frm_data').find('#cartype').prop('disabled', true);

                let Get_Main_product = new URL(url_stmas_exp_get);

                Get_Main_product.search = new URLSearchParams({

                    Mode: 'stmas',
                    code: $('#frm_data').find('#main_product_create').val(),

                });

                fetch(Get_Main_product).then(function (response) {
                    return response.json();
                }).then(function (result) {
                    if (result.status === 'Error') {

                        $.LoadingOverlay("hide");

                        //$("#global-loader").fadeOut("slow");

                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'ไม่สามารถเรียกข้อมูลได้'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                location.reload();
                            }
                        })

                    } else {

                        console.log('Get_Detail', result.data);

                        $.each(result.data, function (key, val) {

                            $("#gcode_a option").remove();
                            $("#gcode_b option").remove();
                            $("#gcode_c option").remove();
                            $("#gcode_d option").remove();
                            $("#gcode_e option").remove();

                            $('#gcode_a')
                                .append($("<option>Please select..</option>")
                                    .attr("value", val['code_aexp'])
                                    //.text(val['code_aexp'] + ' - ' + val['code_aexp_name'])
                                    .text(val['code_aexp_name'])
                                    .data('text', val['code_aexp_name']));
                            $('#gcode_b')
                                .append($("<option>Please select..</option>")
                                    .attr("value", val['code_b'])
                                    //.text(val['code_b'] + ' - ' + val['code_b_name'])
                                    .text(val['code_b_name'])
                                    .data('text', val['code_b_name']));
                            $('#gcode_c')
                                .append($("<option>Please select..</option>")
                                    .attr("value", val['code_c'])
                                    //.text(val['code_c'] + ' - ' + val['code_c_name'])
                                    .text(val['code_c_name'])
                                    .data('text', val['code_c_name']));
                            $('#gcode_d')
                                .append($("<option>Please select..</option>")
                                    .attr("value", val['code_d'])
                                    //.text(val['code_d'] + ' - ' + val['code_d_name'])
                                    .text(val['code_d_name'])
                                    .data('text', val['code_d_name']));
                            $('#gcode_e')
                                .append($("<option>Please select..</option>")
                                    .attr("value", val['code_e'])
                                    //.text(val['code_e'] + ' - ' + val['code_e_name'])
                                    .text(val['code_e_name'])
                                    .data('text', val['code_e_name']));

                            //$('#frm_data').find('#gcode_a').val(val['code_a']).trigger('change').prop('disabled', false);
                            $('#frm_data').find('#gcode_a').trigger('change').prop('disabled', false);
                            $('#frm_data').find('#gcode_b').val(val['code_b']).trigger('change').prop('disabled', false);
                            $('#frm_data').find('#gcode_c').val(val['code_c']).trigger('change').prop('disabled', false);
                            $('#frm_data').find('#gcode_d').val(val['code_d']).trigger('change').prop('disabled', false);
                            $('#frm_data').find('#gcode_e').val(val['code_e']).trigger('change').prop('disabled', false);

                            $('#frm_data').find('#oem').val(val['codeOem']).prop('disabled', true);
                            $('#frm_data').find('#year').val(val['serviceyear']).prop('disabled', false);
                            $('#frm_data').find('#car_brand').val(val['carbrand']).prop('disabled', false);
                            $('#frm_data').find('#g_model').val(val['gmodel']).prop('disabled', false);
                            $('#frm_data').find('#car_model').val(val['carmodel']).prop('disabled', false);
                            $('#frm_data').find('#carfmyear').val(val['carfmyear']).prop('disabled', false);
                            $('#frm_data').find('#cartoyear').val(val['cartoyear']).prop('disabled', false);
                            $('#frm_data').find('#car_generation').val(val['carGeneration']).prop('disabled', false);
                            $('#frm_data').find('#car_engine').val(val['carEngine']).prop('disabled', false);
                            $('#frm_data').find('#car_body').val(val['carBody']).prop('disabled', false);

                            $('#frm_data').find('#barcode').val(val['gbarcode']).prop('disabled', true);
                            $('#frm_data').find('#spcodes').val(val['spcodes']).prop('disabled', true);
                            $('#frm_data').find('#price').val(val['gprice']).prop('disabled', true);
                            $('#frm_data').find('#uom').val(val['UOM']).prop('disabled', true);
                            $('#frm_data').find('#qty').val(val['qtysmall']).prop('disabled', true);
                            $('#frm_data').find('#cartype').val(val['cartype']).prop('disabled', false);

                            let gcode_a = $('#frm_data').find('#gcode_a').val();
                            let gcode_b = $('#frm_data').find('#gcode_b').val();
                            let gcode_c = $('#frm_data').find('#gcode_c').val();
                            let gcode_d = $('#frm_data').find('#gcode_d').val();
                            let gcode_e = $('#frm_data').find('#gcode_e').val();

                            gcode_a = gcode_a == '' || gcode_a == null || gcode_a == 'undefined' || gcode_a == 'Please select..' ? '' : gcode_a
                            gcode_b = gcode_b == '' || gcode_b == null || gcode_b == 'undefined' || gcode_b == 'Please select..' ? '' : gcode_b
                            gcode_c = gcode_c == '' || gcode_c == null || gcode_c == 'undefined' || gcode_c == 'Please select..' ? '' : gcode_c
                            gcode_d = gcode_d == '' || gcode_d == null || gcode_d == 'undefined' || gcode_d == 'Please select..' ? '' : gcode_d
                            gcode_e = gcode_e == '' || gcode_e == null || gcode_e == 'undefined' || gcode_e == 'Please select..' ? '' : gcode_e

                            let gcode_a_name = $('#gcode_a').children("option:selected").data('text');
                            let gcode_b_name = $('#gcode_b').children("option:selected").data('text');
                            let gcode_c_name = $('#gcode_c').children("option:selected").data('text');
                            let gcode_d_name = $('#gcode_d').children("option:selected").data('text');
                            let gcode_e_name = $('#gcode_e').children("option:selected").data('text');

                            //var gcode_a_name = ('#gcode_a').data("text");
                            //$(".gcode_a").text(gcode_a_name);

                            //let gcode_a_name = $('#gcode_a').text().trim();
                            //let gcode_b_name = $('#gcode_b').text().trim();
                            //let gcode_c_name = $('#gcode_c').text().trim();
                            //let gcode_d_name = $('#gcode_d').text().trim();
                            //let gcode_e_name = $('#gcode_e').text().trim();

                            gcode_a_name = gcode_a_name == '' || gcode_a_name == null || gcode_a_name == 'undefined' || gcode_a_name == 'Please select..' ? '' : gcode_a_name
                            gcode_b_name = gcode_b_name == '' || gcode_b_name == null || gcode_b_name == 'undefined' || gcode_b_name == 'Please select..' ? '' : gcode_b_name
                            gcode_c_name = gcode_c_name == '' || gcode_c_name == null || gcode_c_name == 'undefined' || gcode_c_name == 'Please select..' ? '' : gcode_c_name
                            gcode_d_name = gcode_d_name == '' || gcode_d_name == null || gcode_d_name == 'undefined' || gcode_d_name == 'Please select..' ? '' : gcode_d_name
                            gcode_e_name = gcode_e_name == '' || gcode_e_name == null || gcode_e_name == 'undefined' || gcode_e_name == 'Please select..' ? '' : gcode_e_name

                            //let gcode_code = gcode_a + '-' + gcode_e + '-' + gcode_c + '-' + gcode_d + '-' + gcode_b
                            let gcode_code = gcode_a + '-' + gcode_b + '-' + gcode_c + '-' + gcode_d + '-' + gcode_e
                            let gcode_name = gcode_a_name + '-' + gcode_e_name + '-' + gcode_c_name + '-' + gcode_b_name + '-' + gcode_d_name;

                            $('#frm_data').find('#item_code').val(gcode_code).prop('disabled', true);
                            $('#frm_data').find('#item_name').val(gcode_name).prop('disabled', true);

                        });

                        $(".modal-content").LoadingOverlay("hide", true);



                        //$('#frm_data').find('.gcode').on('select2:select', async function (e) {

                        //    //$(this).on('change', function (e) {
                        //    //    e.preventDefault();
                        //    //});
                        //    $(this).on('select2:select', function (e) {
                        //        e.preventDefault();
                        //    });



                        //    console.log('item_code', gcode_code)
                        //    console.log('item_name', gcode_name)
                        //});

                        $.Check();


                    }

                });


            });

        };

        $.Check = async function () {

            $('.btn-create').prop('disabled', true);

            await $('#frm_data').find('.gcode').off('select2:select').on('select2:select', function (evt) {

                $(this).on('select2:select', function (evt) {
                    evt.preventDefault();
                });
                 
                $(".modal-content").LoadingOverlay("show", {
                    image: '',
                    custom: customChecking
                });

                $('#frm_data').find('#item_code').val("");

                $('#frm_data').find('#item_name').val("");

                //alert($('#frm_data').find('#item_name').val())

                $('#gcode_a').on('select2:select', function (e) {
                    var data = e.params.data;
                    $("#gcode_a option[value=" + data.id + "]").data('text', data.name);
                    $("#gcode_a").trigger('change');
                });

                $('#gcode_b').on('select2:select', function (e) {
                    var data = e.params.data;
                    $("#gcode_b option[value=" + data.id + "]").data('text', data.name);
                    $("#gcode_b").trigger('change');
                });

                $('#gcode_c').on('select2:select', function (e) {
                    var data = e.params.data;
                    $("#gcode_c option[value=" + data.id + "]").data('text', data.name);
                    $("#gcode_c").trigger('change');
                });

                $('#gcode_d').on('select2:select', function (e) {
                    var data = e.params.data;
                    $("#gcode_d option[value=" + data.id + "]").data('text', data.name);
                    $("#gcode_d").trigger('change');
                });

                $('#gcode_e').on('select2:select', function (e) {

                    var data = e.params.data;
                    $("#gcode_e option[value=" + data.id + "]").data('text', data.name);
                    $("#gcode_e").trigger('change');

                    let code_e = $('#frm_data').find('#gcode_e').val()
                    //alert(code_e)
                    fetch(url_stmas_exp_get + '?Mode=' + 'code_5' + '&code=' + code_e).then(function (response) {
                        return response.json();
                    }).then(function (result) {
                        //alert(code_e)
                        console.log('code_5', result.data)

                        $('#frm_data').find('#car_brand').val('').prop('disabled', false);
                        $('#frm_data').find('#car_model').val('').prop('disabled', false);
                        $('#frm_data').find('#carfmyear').val('').prop('disabled', false);
                        $('#frm_data').find('#cartoyear').val('').prop('disabled', false);
                        $('#frm_data').find('#car_generation').val('').prop('disabled', false);
                        $('#frm_data').find('#cartype').val('').prop('disabled', true);

                        $.each(result.data, function (key, val) {

                            $('#frm_data').find('#car_brand').val('').prop('disabled', false);
                            $('#frm_data').find('#car_model').val('').prop('disabled', false);
                            $('#frm_data').find('#carfmyear').val('').prop('disabled', false);
                            $('#frm_data').find('#cartoyear').val('').prop('disabled', false);
                            $('#frm_data').find('#car_generation').val('').prop('disabled', false);
                            $('#frm_data').find('#cartype').val('').prop('disabled', true);

                            $('#frm_data').find('#car_brand').val(val['c5_carbrand']).prop('disabled', false);
                            $('#frm_data').find('#car_model').val(val['c5_model_name']).prop('disabled', false);
                            $('#frm_data').find('#carfmyear').val(val['c5_carFmyear']).prop('disabled', false);
                            $('#frm_data').find('#cartoyear').val(val['c5_carToyear']).prop('disabled', false);
                            $('#frm_data').find('#car_generation').val(val['c5_carGeneration']).prop('disabled', false);
                            $('#frm_data').find('#cartype').val(val['c5_cartype']).prop('disabled', true);

                            //console.log("success");
                            $.LoadingOverlay("hide");

                        });

                    });

                });

                setTimeout(function () {

                    let gcode_a = $('#frm_data').find('#gcode_a').val();
                    let gcode_b = $('#frm_data').find('#gcode_b').val();
                    let gcode_c = $('#frm_data').find('#gcode_c').val();
                    let gcode_d = $('#frm_data').find('#gcode_d').val();
                    let gcode_e = $('#frm_data').find('#gcode_e').val();

                    gcode_a = gcode_a == '' || gcode_a == null || gcode_a == 'undefined' || gcode_a == 'Please select..' ? '' : gcode_a
                    gcode_b = gcode_b == '' || gcode_b == null || gcode_b == 'undefined' || gcode_b == 'Please select..' ? '' : gcode_b
                    gcode_c = gcode_c == '' || gcode_c == null || gcode_c == 'undefined' || gcode_c == 'Please select..' ? '' : gcode_c
                    gcode_d = gcode_d == '' || gcode_d == null || gcode_d == 'undefined' || gcode_d == 'Please select..' ? '' : gcode_d
                    gcode_e = gcode_e == '' || gcode_e == null || gcode_e == 'undefined' || gcode_e == 'Please select..' ? '' : gcode_e

                    let gcode_a_name = $('#gcode_a').children("option:selected").data('text');
                    let gcode_b_name = $('#gcode_b').children("option:selected").data('text');
                    let gcode_c_name = $('#gcode_c').children("option:selected").data('text');
                    let gcode_d_name = $('#gcode_d').children("option:selected").data('text');
                    let gcode_e_name = $('#gcode_e').children("option:selected").data('text');

                    //let gcode_a_name = $('#gcode_a').text().trim();
                    //let gcode_b_name = $('#gcode_b').text().trim();
                    //let gcode_c_name = $('#gcode_c').text().trim();
                    //let gcode_d_name = $('#gcode_d').text().trim();
                    //let gcode_e_name = $('#gcode_e').text().trim();

                    gcode_a_name = gcode_a_name == '' || gcode_a_name == null || gcode_a_name == 'undefined' || gcode_a_name == 'Please select..' ? '' : gcode_a_name
                    gcode_b_name = gcode_b_name == '' || gcode_b_name == null || gcode_b_name == 'undefined' || gcode_b_name == 'Please select..' ? '' : gcode_b_name
                    gcode_c_name = gcode_c_name == '' || gcode_c_name == null || gcode_c_name == 'undefined' || gcode_c_name == 'Please select..' ? '' : gcode_c_name
                    gcode_d_name = gcode_d_name == '' || gcode_d_name == null || gcode_d_name == 'undefined' || gcode_d_name == 'Please select..' ? '' : gcode_d_name
                    gcode_e_name = gcode_e_name == '' || gcode_e_name == null || gcode_e_name == 'undefined' || gcode_e_name == 'Please select..' ? '' : gcode_e_name

                    //let gcode_code = gcode_a + '-' + gcode_e + '-' + gcode_c + '-' + gcode_d + '-' + gcode_b
                    let gcode_code = gcode_a + '-' + gcode_b + '-' + gcode_c + '-' + gcode_d + '-' + gcode_e
                    let gcode_name = gcode_a_name + '-' + gcode_e_name + '-' + gcode_c_name + '-' + gcode_b_name + '-' + gcode_d_name;

                    $('#frm_data').find('#item_code').val(gcode_code).prop('disabled', true);
                    $('#frm_data').find('#item_name').val(gcode_name).prop('disabled', true);


                    $.CheckData();

                }, 300);


            });


        };

        $.List = async function () {

            $(".card-body").LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            let url = new URL(url_stmas_exp_get);

            url.search = new URLSearchParams({
                mode: $('#search_item_code').val().trim() === '' ? '' : 'search',
                code: $('#search_item_code').val().trim() === '' ? '' : $('#search_item_code').val().trim(),
            });

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {

                oTable = $('#tbl-list').DataTable({
                    //data: result.data,
                    //"bDestroy": true,
                    //autoWidth: true,
                    //paging: true,
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
                            filename: 'stmas_exp',
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
                    columns: [
                        {
                            title: "<center>Item Code</center>",
                            data: "code",
                            width: "150px",
                            class: "tx-center code_main",
                            render: function (data, type, row, meta) {
                                //return '<span style="font-size:11px;">' + data + '</span>';
                                return '<span style="font-size:11px;  color:DarkGreen;">' + data + '</span>' + '</br >' + '/' +
                                    '<span style="font-size:11px;  color:Red;">' + row.gbarcode + '</span>' + ' / ' +
                                    '<span style="font-size:11px;  color:Blue;">' + row.spcodes + '</span>'
                            }
                        },//0
                        {
                            title: "<center>Item Name</center>",
                            data: "name",
                            width: "250px",
                            class: "tx-center",
                            render: function (data, type, row, meta) {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        },//1
                        {
                            title: "<center>Barcode</center>",
                            class: "tx-center",
                            data: "gbarcode",
                            visible: false,
                            render: function (data, type, row, meta) {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        },//2
                        {
                            title: "<center>SPCODE</center>",
                            data: "spcodes",
                            visible: false,
                            class: "tx-center",
                            render: function (data, type, row, meta) {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        },//3
                        {
                            title: "<center>code_a</center>",
                            data: "code_a",
                            //visible: false,
                            class: "tx-center",
                            render: function (data, type, row, meta) {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        },//3
                        {
                            title: "<center>code_b</center>",
                            data: "code_b",
                            //visible: false,
                            class: "tx-center",
                            render: function (data, type, row, meta) {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        },//3
                        {
                            title: "<center>code_c</center>",
                            data: "code_c",
                            //visible: false,
                            class: "tx-center",
                            render: function (data, type, row, meta) {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        },//3
                        {
                            title: "<center>code_d</center>",
                            data: "code_d",
                            //visible: false,
                            class: "tx-center",
                            render: function (data, type, row, meta) {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        },//3
                        {
                            title: "<center>code_e</center>",
                            data: "code_e",
                            //visible: false,
                            class: "tx-center",
                            render: function (data, type, row, meta) {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        },//3
                        {
                            title: "<center>Car Model</center>",
                            data: "carmodel",
                            class: "tx-center",
                            width: "100px",
                            //visible: false,
                            render: function (data, type, row, meta) {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        },//4
                        {
                            title: "<center>carFmyear</center>",
                            data: "carfmyear",
                            class: "tx-center",
                            width: "100px",
                            //visible: false,
                            render: function (data, type, row, meta) {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        },//5
                        {
                            title: "<center>carToyear</center>",
                            data: "cartoyear",
                            class: "tx-center",
                            width: "100px",
                            //visible: false,
                            render: function (data, type, row, meta) {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        },//6
                        {
                            title: "<center>gmodel</center>",
                            data: "gmodel",
                            class: "tx-center",
                            width: "100px",
                            //visible: false,
                            render: function (data, type, row, meta) {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        },//7
                        {
                            title: "<center>carbrand</center>",
                            data: "carbrand",
                            class: "tx-center",
                            width: "100px",
                            //visible: false,
                            render: function (data, type, row, meta) {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        },//8
                        {
                            title: "<center>carGeneration</center>",
                            data: "carGeneration",
                            class: "tx-center",
                            width: "100px",
                            //visible: false,
                            render: function (data, type, row, meta) {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        },//9
                        {
                            title: "<center>carEngine</center>",
                            data: "carEngine",
                            class: "tx-center",
                            width: "100px",
                            //visible: false,
                            render: function (data, type, row, meta) {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        },//10
                        {
                            title: "<center>carBody</center>",
                            data: "carBody",
                            class: "tx-center",
                            width: "100px",
                            //visible: false,
                            render: function (data, type, row, meta) {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        },//11
                        {
                            title: "<center>codeOem</center>",
                            data: "codeOem",
                            class: "tx-center",
                            //visible: false,
                            render: function (data, type, row, meta) {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        },//12
                        {
                            title: "<center>serviceyear</center>",
                            data: "serviceyear",
                            class: "tx-center",
                            width: "100px",
                            //visible: false,
                            render: function (data, type, row, meta) {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        },//13
                        //{
                        //    title: "<center>UOM</center>",
                        //    data: "UOM",
                        //    class: "tx-center",
                        //    //visible: false,
                        //    render: function (data, type, row, meta) {
                        //        return '<span style="font-size:11px;">' + data + '</span>';
                        //    }
                        //},//14
                        {
                            title: "<center>Strat date</center>",
                            data: "startdate",
                            class: "tx-center",
                            width: "100px",
                            //visible: false,
                            render: function (data, type, row, meta) {
                                return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '</span>';
                            }
                        },//14
                        {
                            title: "<center>Remark</center>",
                            data: 'gremark',
                            width: "200px",
                            render: function (data, type, row, meta) {
                                if (data == '' || data == null) {
                                    return '';
                                } else {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }
                        },//15
                    ],
                    //"order": [[21, "asc"]],
                    "initComplete": function (settings, json) {
                        //let citem;
                        $.contextMenu({
                            selector: '#tbl-list tbody tr',
                            callback: async function (key, options) {

                                let citem = oTable.row(this).data();

                                if (key === 'view') {
                                    console.log('citem list', citem)
                                    $.Details(citem);

                                } else if (key === 'edit') {

                                    await $.Details(citem);
                                    await $.Edit(citem);

                                } else if (key === 'delete') {

                                    await $.Delete(citem);

                                } else {

                                    alert('ERROR');

                                }

                            },
                            items: {

                                "view": { name: "View", icon: "fas fa-search" },
                                "edit": { name: "Edit", icon: "edit", disabled: true },
                                "delete": { name: "Delete", icon: "delete", disabled: true },
                            }

                        });

                        $("tbody").contextmenu(function () {

                            setTimeout(function () {

                                let code_main = $('.context-menu-active .code_main span').html();
                                code_main = code_main.substring(0, 1);

                                console.log(code_main)

                                if (code_main != 'X') {
                                    $('.context-menu-icon-edit').addClass('context-menu-disabled');
                                    $('.context-menu-icon-delete').addClass('context-menu-disabled');
                                } else {
                                    $('.context-menu-icon-edit').removeClass('context-menu-disabled');
                                    $('.context-menu-icon-delete').removeClass('context-menu-disabled');
                                };

                            }, 200);
                        });

                        $(".card-body").LoadingOverlay("hide", true);
                    },
                });

            });

        };

        $.Details = async function (citem) {

            await $('#modal-frm_data').modal({

                keyboard: false,
                backdrop: 'static'

            });

            $('.btn-action').hide();

            $("#main_product_create option").remove();

            $('#main_product_create')
                .append($("<option>Please select..</option>")
                    .attr("value", citem['coderef'])
                    .text(citem['coderef'] + ' ' + citem['code_name'])
                    .data('text', citem['coderef']));

            $("#gcode_a option").remove();
            $("#gcode_b option").remove();
            $("#gcode_c option").remove();
            $("#gcode_d option").remove();
            $("#gcode_e option").remove();

            $('#gcode_a')
                .append($("<option>Please select..</option>")
                    .attr("value", citem['code_aexp'])
                    .text(citem['code_aexp'] + ' - ' + citem['code_aexp_name'])
                    .data('text', citem['code_aexp_name']));
            $('#gcode_b')
                .append($("<option>Please select..</option>")
                    .attr("value", citem['code_b'])
                    .text(citem['code_b'] + ' - ' + citem['code_b_name'])
                    .data('text', citem['code_b_name']));
            $('#gcode_c')
                .append($("<option>Please select..</option>")
                    .attr("value", citem['code_c'])
                    .text(citem['code_c'] + ' - ' + citem['code_c_name'])
                    .data('text', citem['code_c_name']));
            $('#gcode_d')
                .append($("<option>Please select..</option>")
                    .attr("value", citem['code_d'])
                    .text(citem['code_d'] + ' - ' + citem['code_d_name'])
                    .data('text', citem['code_d_name']));
            $('#gcode_e')
                .append($("<option>Please select..</option>")
                    .attr("value", citem['code_e'])
                    .text(citem['code_e'] + ' - ' + citem['code_e_name'])
                    .data('text', citem['code_e_name']));

            $('#frm_data').find('#main_product_create').val(citem['coderef']).prop('disabled', true);
            $('#frm_data').find('#item_name').val(citem['name']).prop('disabled', true);
            $('#frm_data').find('#item_code').val(citem['code']).prop('disabled', true);
            $('#frm_data').find('#barcode').val(citem['gbarcode']).prop('disabled', true);
            $('#frm_data').find('#spcodes').val(citem['spcodes']).prop('disabled', true);
            $('#frm_data').find('#gcode_a').val(citem['code_aexp']).prop('disabled', true);
            $('#frm_data').find('#gcode_b').val(citem['code_b']).prop('disabled', true);
            $('#frm_data').find('#gcode_c').val(citem['code_c']).prop('disabled', true);
            $('#frm_data').find('#gcode_d').val(citem['code_d']).prop('disabled', true);
            $('#frm_data').find('#gcode_e').val(citem['code_e']).prop('disabled', true);
            $('#frm_data').find('#remarks').val(citem['gremark']).prop('disabled', true);
            $('#frm_data').find('#oem').val(citem['codeOem']).prop('disabled', true);
            $('#frm_data').find('#spcodes').val(citem['spcodes']).prop('disabled', true);
            $('#frm_data').find('#price').val(citem['gprice']).prop('disabled', true);
            $('#frm_data').find('#uom').val(citem['UOM']).prop('disabled', true);
            $('#frm_data').find('#qty').val(citem['qtysmall']).prop('disabled', true);
            $('#frm_data').find('#cartype').val(citem['cartype']).prop('disabled', true);
            $('#frm_data').find('#year').val(citem['serviceyear']).prop('disabled', true);
            $('#frm_data').find('#car_brand').val(citem['carbrand']).prop('disabled', true);
            $('#frm_data').find('#g_model').val(citem['gmodel']).prop('disabled', true);
            $('#frm_data').find('#car_model').val(citem['carmodel']).prop('disabled', true);
            $('#frm_data').find('#carfmyear').val(citem['carfmyear']).prop('disabled', true);
            $('#frm_data').find('#cartoyear').val(citem['cartoyear']).prop('disabled', true);
            $('#frm_data').find('#car_generation').val(citem['carGeneration']).prop('disabled', true);
            $('#frm_data').find('#car_engine').val(citem['carEngine']).prop('disabled', true);
            $('#frm_data').find('#car_body').val(citem['carBody']).prop('disabled', true);

            return false;
        };

        $.Create = async function () {

            temp_id_create = $.uuid();

            $('.btn-create').show();
            $('.btn-update').hide();
            $('.btn-create').prop('disabled', true);

            await $.Gcode_Get();
            await $.Main_product_get();

            $('.btn-create').click(function (e) {

                let submit_action = $(this).data('action');

                $('#frm_data').parsley().on('form:submit', function () {

                    $('.btn-create').prop('disabled', true);

                    $(".modal-content").LoadingOverlay("show", {
                        image: '',
                        custom: customCreating
                    });
                    $(".modal-content").LoadingOverlay("show");

                    // Model & Repo ไปเปลี่ยนเอาเอง
                    let add_data = {
                        //temp_id: temp_id_create,
                        temp_id: $.uuid(),
                        coderef: $('#main_product_create').val(),
                        code: $('#item_code').val(),
                        name: $('#item_name').val(),
                        codeoem: $('#oem').val(),
                        car_brand: $('#car_brand').val(),
                        car_model: $('#car_model').val(),
                        g_model: $('#g_model').val(),
                        car_fm: $('#carfmyear').val(),
                        car_to: $('#cartoyear').val(),
                        car_generation: $('#car_generation').val().trim() === ' ' ? '' : $('#car_generation').val().trim(),
                        car_engine: $('#car_engine').val().trim() === ' ' ? '' : $('#car_engine').val().trim(),
                        car_body: $('#car_body').val().trim() === ' ' ? '' : $('#car_body').val().trim(),
                        code_a: $('#gcode_a').val(),
                        code_b: $('#gcode_b').val(),
                        code_c: $('#gcode_c').val(),
                        code_d: $('#gcode_d').val(),
                        code_e: $('#gcode_e').val(),
                        gremark: $('#remarks').val(),
                        created_by: name,
                        created_by2: full_name,
                        Mode: 'create',
                    };
                    console.log('add_data', add_data)
                    var params = [];
                    for (const i in add_data) {
                        params.push(i + "=" + encodeURIComponent(add_data[i]));
                    }

                    fetch(url_mas_stmas_action, {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
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

                            setTimeout(function () {


                                oTable.destroy();

                                $.List();

                                $(".modal-content").LoadingOverlay("hide", true);


                            }, 800);


                        } else {

                            toastr.success('Save Successfully!', async function () {

                                let log_code = $('#item_code').val();

                                if (submit_action === "save_exit") {

                                    $('.btn-create').prop('disabled', false);

                                    $('#modal-frm_data').modal('hide');

                                    //$.Update_data_create();

                                    $.addLogEvent(log_code, 'VSM', 'create', '/master/stmas_exp', 'OK');

                                    setTimeout(function () {


                                        oTable.destroy();

                                        $.List();

                                        $(".modal-content").LoadingOverlay("hide", true);


                                    }, 800);

                                } else if (submit_action === "save_new") {

                                    $('#frm_data').trigger('reset');
                                    $('.btn-create').prop('disabled', false);
                                    $('#frm_data').find('input').val('').prop('disabled', false);
                                    $('#frm_data').find('select').val('').trigger('change.select2').prop('disabled', false);
                                    $("#frm_data").parsley().reset();

                                    //$.Update_data_create();
                                    $.addLogEvent(log_code, 'VSM', 'create', '/master/stmas_exp', 'OK');

                                    setTimeout(function () {

                                        $(".modal-content").LoadingOverlay("hide", true);

                                        oTable.destroy();

                                        $.List();

                                    }, 800);

                                } else {

                                    toastr.error('Error writing document');

                                }

                            });
                        }

                    }).catch((error) => {

                        toastr.error(error, 'Error writing document');

                    });

                    return false;

                });

            });

        };

        $.Edit = async function (citem) {

            temp_id_edit = $.uuid();
            await $.Main_product_get();
            await $.Gcode_Get();

            $('.btn-crearte').hide();
            $('.btn-update').show();

            $('#frm_data').find('#gcode_a').prop('disabled', true);
            $('#frm_data').find('#gcode_b').prop('disabled', true);
            $('#frm_data').find('#gcode_c').prop('disabled', true);
            $('#frm_data').find('#gcode_d').prop('disabled', true);
            $('#frm_data').find('#gcode_e').prop('disabled', true);
            $('#frm_data').find('#oem').prop('disabled', false);
            $('#frm_data').find('#remarks').prop('disabled', false);
            $('#frm_data').find('#car_brand').prop('disabled', false);
            $('#frm_data').find('#g_model').prop('disabled', false);
            $('#frm_data').find('#car_model').prop('disabled', false);
            $('#frm_data').find('#carfmyear').prop('disabled', false);
            $('#frm_data').find('#cartoyear').prop('disabled', false);
            $('#frm_data').find('#car_generation').prop('disabled', false);
            $('#frm_data').find('#car_engine').prop('disabled', false);
            $('#frm_data').find('#car_body').prop('disabled', false);

            $('#btn-update').off('click').on('click', function (e) {

                e.preventDefault

                $(".modal-content").LoadingOverlay("show", {
                    image: '',
                    custom: customUpdating
                });

                $(".modal-content").LoadingOverlay("show");

                $('#btn-update').prop('disabled', true);

                let update_data = {
                    //temp_id: temp_id_edit,
                    temp_id: $.uuid(),
                    coderef: $('#main_product_create').val(),
                    code: $('#item_code').val(),
                    name: $('#item_name').val(),
                    codeoem: $('#oem').val(),
                    car_brand: $('#car_brand').val(),
                    car_model: $('#car_model').val(),
                    g_model: $('#g_model').val(),
                    car_fm: $('#carfmyear').val(),
                    car_to: $('#cartoyear').val(),
                    car_generation: $('#car_generation').val(),
                    car_engine: $('#car_engine').val(),
                    car_body: $('#car_body').val(),
                    code_a: $('#gcode_a').val(),
                    code_b: $('#gcode_b').val(),
                    code_c: $('#gcode_c').val(),
                    code_d: $('#gcode_d').val(),
                    code_e: $('#gcode_e').val(),
                    gremark: $('#remarks').val(),
                    created_by: name,
                    created_by2: full_name,
                    Mode: 'update',
                };

                var params = [];
                for (const i in update_data) {
                    params.push(i + "=" + encodeURIComponent(update_data[i]));
                }

                fetch(url_mas_stmas_action, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
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

                        oTable.destroy();
                        $.List();
                        $('#btn-update').prop('disabled', false);
                        $(".modal-content").LoadingOverlay("hide", true);

                    } else {
                        let log_code = $('#item_code').val();
                        toastr.success('Save Successfully!', async function () {

                            $('#btn-update').prop('disabled', false);

                            $('#modal-frm_data').modal('hide');

                            //$.Update_data_edit();
                            $.addLogEvent(log_code, 'VSM', 'update', '/master/stmas_exp', 'OK');

                            setTimeout(function () {

                                oTable.destroy();

                                $.List();

                                $(".modal-content").LoadingOverlay("hide", true);

                            }, 800);

                        });
                    }

                }).catch((error) => {
                    toastr.error(error, 'Error writing document');
                    console.log('Error:', error);
                });
                return false;

            });

        };

        $.Delete = async function (citem) {

            temp_id_delete = $.uuid();

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {

                if (result.isConfirmed) {

                    $.LoadingOverlay("show", {
                        image: '',
                        custom: customElement
                    });

                    let delete_data = {

                        //coderef: citem['coderef'],
                        //code: citem['code'],
                        //Mode: 'delete',
                        //created_by: name,
                        //updated_by: name,

                        //temp_id: temp_id_delete,
                        temp_id: $.uuid(),
                        coderef: citem['coderef'],
                        code: citem['code'],
                        name: citem['name'],
                        codeoem: citem['codeOem'],
                        car_brand: citem['carbrand'],
                        car_model: citem['carmodel'],
                        g_model: citem['gmodel'],
                        car_fm: citem['carfmyear'],
                        car_to: citem['cartoyear'],
                        car_generation: citem['carGeneration'],
                        car_engine: citem['carEngine'],
                        car_body: citem['carBody'],
                        code_a: citem['code_a'],
                        code_b: citem['code_b'],
                        code_c: citem['code_c'],
                        code_d: citem['code_d'],
                        code_e: citem['code_e'],
                        gremark: citem['gremark'],
                        created_by: name,
                        created_by2: full_name,
                        Mode: 'delete',

                    };

                    var params = [];
                    for (const i in delete_data) {
                        params.push(i + "=" + encodeURIComponent(delete_data[i]));
                    }

                    fetch(url_mas_stmas_action, {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
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

                                $('#btn-update').prop('disabled', false);

                                $('#modal-frm_data').modal('hide');

                                //$.Update_data_delete();
                                $.addLogEvent(citem['code'], 'VSM', 'delete', '/master/stmas_exp', 'OK');

                                setTimeout(function () {

                                    oTable.destroy();

                                    $.List();

                                    $.LoadingOverlay("hide")

                                }, 800);

                            });
                        }

                    }).catch((error) => {
                        toastr.error(error, 'Error writing document');
                        console.log('Error:', error);
                    });

                    return false;
                }
            })

        };

        $.CheckData = async function () {

            let get_ck = new URL(url_mas_chk);
            let chk = 0;

            get_ck.search = new URLSearchParams({

                code: $('#frm_data').find('#item_code').val() == '' || $('#frm_data').find('#item_code').val() == null ? '' : $('#frm_data').find('#item_code').val().trim(),
                name: $('#frm_data').find('#item_name').val() == '' || $('#frm_data').find('#item_name').val() == null ? '' : $('#frm_data').find('#item_name').val().trim(),

            });

            fetch(get_ck).then(function (response) {

                return response.json();

            }).then(function (result) {

                //console.log('name', $('#frm_data').find('#item_code').val().replace(/\s/g, ""))

                $.each(result.data, function (key, val) {

                    var code_dup = val['code_dup']
                    var name_dup = val['name_dup']

                    console.log('name', $('#frm_data').find('#item_name').val().replace(/\s/g, ""));
                    console.log('code_dup', code_dup);
                    console.log('name_dup', name_dup);
                    if (code_dup === 'true' || name_dup === 'false') {

                        chk = 1; // รหัสซ้ำ

                    } else if (code_dup == 'false' || name_dup == 'true') {

                        chk = 2; // ชื่อซ้ำ

                    } else if (code_dup == 'true' && name_dup == 'true') {

                        chk = 3; // รหัสและชื่อซ้ำ

                    } else {

                        chk = 0; // ไม่มีข้อมูลซ้ำ

                    }

                });

                if (chk == 1) {

                    alert('รหัสซ้ำ');
                    console.log('รหัสซ้ำ');
                    $('.chk_code').show();
                    $('.btn-create').prop('disabled', true);
                    $('#item_code').addClass('bd-danger tx-danger');
                    $(".modal-content").LoadingOverlay("hide", true);

                } else if (chk == 2) {

                    alert('ชื่อซ้ำ');
                    console.log('ชื่อซ้ำ');
                    $('.chk_name').show();
                    $('.btn-create').prop('disabled', true);
                    $('#item_name').addClass('bd-danger tx-danger');
                    $(".modal-content").LoadingOverlay("hide", true);

                } else if (chk == 3) {

                    alert('ชื่อและรหัสซ้ำ');
                    console.log('ชื่อและรหัสซ้ำ');
                    $('.chk_code').show();
                    $('.chk_name').show();
                    $('.btn-create').prop('disabled', true);
                    $('#item_code').addClass('bd-danger tx-danger');
                    $('#item_name').addClass('bd-danger tx-danger');
                    $(".modal-content").LoadingOverlay("hide", true);

                } else {

                    alert('ไม่ซ้ำ');
                    console.log('ไม่ซ้ำ');
                    $('.chk_code').hide();
                    $('.chk_name').hide();
                    $('#item_code').removeClass('bd-danger tx-danger');
                    $('#item_name').removeClass('bd-danger tx-danger');
                    $('.btn-create').prop('disabled', false);
                    $(".modal-content").LoadingOverlay("hide", true);
                }


                console.log(chk)
            });

        };

        //$.Update_data_create = function () {

        //    $.LoadingOverlay("show", {
        //        image: '',
        //        custom: customElement
        //    });



        //    fetch(url_stmas_exp_update + '?temp_id=' + temp_id_create + '&updated_by=' + name + '&updated_by2=' + '').then(function (response) {
        //        return response.json();
        //    }).then(function (result) {

        //        if (result.status === 'Error') {

        //            $.LoadingOverlay("hide");
        //            toastr.error(data.error_message);

        //        } else {

        //            $.LoadingOverlay("hide");
        //            console.log("updated");
        //            toastr.success('Updated data successfully');

        //        }

        //    }).catch(error => {
        //        $.LoadingOverlay("hide");
        //        toastr.error('Error, Please contact administrator.');
        //    });

        //};

        //$.Update_data_edit = function () {

        //    $.LoadingOverlay("show", {
        //        image: '',
        //        custom: customElement
        //    });

        //    fetch(url_stmas_exp_update + '?temp_id=' + temp_id_edit + '&updated_by=' + name + '&updated_by2=' + '').then(function (response) {
        //        return response.json();
        //    }).then(function (result) {

        //        if (result.status === 'Error') {

        //            $.LoadingOverlay("hide");
        //            toastr.error(data.error_message);

        //        } else {

        //            $.LoadingOverlay("hide");
        //            console.log("updated");
        //            toastr.success('Updated data successfully');

        //        }

        //    }).catch(error => {
        //        $.LoadingOverlay("hide");
        //        toastr.error('Error, Please contact administrator.');
        //    });

        //};

        //$.Update_data_delete = function () {

        //    $.LoadingOverlay("show", {
        //        image: '',
        //        custom: customElement
        //    });

        //    fetch(url_stmas_exp_update + '?temp_id=' + temp_id_delete + '&updated_by=' + name + '&updated_by2=' + '').then(function (response) {
        //        return response.json();
        //    }).then(function (result) {

        //        if (result.status === 'Error') {

        //            $.LoadingOverlay("hide");
        //            toastr.error(data.error_message);

        //        } else {

        //            $.LoadingOverlay("hide");
        //            console.log("updated");
        //            toastr.success('Updated data successfully');

        //        }

        //    }).catch(error => {
        //        $.LoadingOverlay("hide");
        //        toastr.error('Error, Please contact administrator.');
        //    });

        //};

        $(document).ready(async function () {

            await $.init();

            $.addLogEvent('', 'VSM', 'visit', '/master/stmas_exp', 'OK');

        });

    } else {

        window.location.assign('./login');

    }

});