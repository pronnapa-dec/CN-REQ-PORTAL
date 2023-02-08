'use strict';

let fs = firebase.firestore();
const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const user_id = objProfile[0]['username'];
const customElement = $("<div>", {
    "css": {
        "border": "2px solid",
        "font-size": "14px",
        "text-align": "center",
        "padding": '7px'
    },

    "text": 'Please Wait...'
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const url_api = "http://localhost:49705";
//const url_api = "http://192.168.1.247:8899/pit-api";
const url_importdate_carmodelmix_item_list = url_api + "/api/CarModelMix_Item_List";
const url_importdate_item_detail = url_api + "/api/CarModelMix_Item_Detail";
const url_importdate_carmodelmix_get = url_api + "/api/ImportData_CarModelMix_Get";
const url_carmodelmix_master_get = url_api + "/api/CarModelMix_Master_Get";
const url_importdate_brand_get = url_api + "/api/Vehicle_Brand_Search";
const url_importdate_model_get = url_api + "/api/Vehicle_Model_Search";
const url_importdate_minor_get = url_api + "/api/Vehicle_Minor_Search";
const url_importdate_lovdata_get = url_api + "/api/Lov_Data_Search";
const url_importdate_gcode_get = url_api + "/api/gcode_get";

const url_stmas_get = 'http://192.168.1.247/intranet/acc-api/v1/stmas_get';
const url_purplan_get = 'http://192.168.1.247/intranet/acc-api/v4/product_purplan_stock_factor_get';
const url_stockstatus_get = 'http://192.168.1.247/intranet/acc-api/v1/itemmaster_stockstatus_get';
const url_goodprice_get = 'http://192.168.1.247/intranet/acc-api/v1/itemmaster_goodprice_get';
//const url_importdate_carmodelmix_get = 'http://192.168.1.247:8899/pit-api/api/ImportData_CarModelMix_Get';

//let url_image = 'http://192.168.1.247:8899/image_carmodelmix/'
let url_image = 'http://localhost/image_item_242/'

let photo_dataSet = [];

var master_data = [];
var master_list = [];
var show_item = 0;
var no_result = 0;
let photo_data;
let table_list, table_model_line, table_gprice, table_carmodel_main;
var item_disgroup, item_code_1, item_code_3;
let search_vehicle_segments, search_vehicle_brand;

$(document).ready(async function () {

    await $.init();

});

$.init = async function () {

    $(".card-body").LoadingOverlay("show", {
        image: '',
        custom: customElement
    });

    $(window).scroll(async function () {

        if (Math.ceil($(window).scrollTop() + $(window).height()) == $(document).height()) {
            if ($('.item-carmodel').length > 0) {
                let item_carmodel = $('.item-carmodel').length
                show_item = (item_carmodel)
                if (no_result == 0) {
                    $('#show_more').removeClass('d-none')
                    $('#show_more').off('click').on('click', function (e) {
                        e.preventDefault();
                        $.list();
                    });
                }
            } else {
                //show_item = 1
            }
            //console.log('show_item', show_item)
            //console.log('length', $('.item-carmodel').length)
        }

    });

    $.brand_get();

    $('#search_item_code').prop('disabled', true)

    $('.select-gcode').prop('disabled', true)
    $('.select-product').prop('disabled', true)

    //$('#search_vehicle_brand').prop('disabled', false)
    $('#search_vehicle_segments').prop('disabled', true)
    $('#search_car_type').prop('disabled', true)
    $('#search_vehicle_model').prop('disabled', true)
    $('#search_vehicle_year').prop('disabled', true)
    $('#search_modification').prop('disabled', true)

    $('.car_gallery').lightGallery();

    $('.btn-search').on('click', async function (e) {

        e.preventDefault();

        $('#show_more').addClass('d-none')
        $('#frm_search').parsley().validate();
        $('#search_item_code1').prop('disabled', false)

        if ($('#frm_search').parsley().isValid()) {

            show_item = 0

            $('#items_list').empty();
            $('#search_item_code').prop('disabled', false)
            $('#accordion11').removeClass('d-none');

            await $('#image_search_car').addClass('d-none')
            await $.filters_search();
            await $.list();

        } else {

            $(".card-body").LoadingOverlay("hide", true);
        }

    });

    $('.btn-clear').off('click').on('click', async function (e) {

        e.preventDefault();

        //$(this).find('option').parent().remove();
        //$(this).parent().append("<option value=''>---ทั้งหมด---</option>").attr("value", '')
        $("#search_item_code1 option").remove();
        $("#search_item_code1").append("<option value=''>---โปรดเลือก---</option>");

    });

    $('#btn-reset-item').on('click', async function (e) {

        e.preventDefault();
        $(".select-item option").remove();
        $("#search_item_code").append("<option value=''>ค้นหา... ชื่อสินค้า, รหัสสินค้า, บาร์โค้ด, เลขอะไหล่</option>").attr("value", '')

    });

    $('#reset-gcode').on('click', async function (e) {

        e.preventDefault();

        $(".select-product option").remove();
        $("#search_item_code1 option").remove();
        $("#search_item_code1").append("<option value=''>---โปรดเลือก---</option>").attr("value", '')
        $("#search_product_division").append("<option value=''>---โปรดเลือก---</option>").attr("value", '')
        $("#search_main_category").append("<option value=''>---โปรดเลือก---</option>").attr("value", '').prop('disabled', true)
        $("#search_sub_category").append("<option value=''>---โปรดเลือก---</option>").attr("value", '').prop('disabled', true)
        $.product_division_get();

    });

    $('#reset-main').on('click', async function (e) {

        e.preventDefault();

        $(".select-main option").remove();
        $("#search_vehicle_brand").append("<option value=''>---โปรดเลือก---</option>").attr("value", '')
        $("#search_vehicle_segments").append("<option value=''>---โปรดเลือก---</option>").attr("value", '').prop('disabled', true)
        //$("#search_car_type").append("<option value=''>---ทั้งหมด---</option>").attr("value", '').prop('disabled', true)
        $("#search_vehicle_model").append("<option value=''>---โปรดเลือก---</option>").attr("value", '').prop('disabled', true)
        $("#search_vehicle_year").append("<option value=''>---ทั้งหมด---</option>").attr("value", '').prop('disabled', true)
        $("#search_modification").append("<option value=''>---ทั้งหมด---</option>").attr("value", '').prop('disabled', true)

        $.clear_select2_master();
        $.brand_get();
    });

    $('#reset-detail').on('click', async function (e) {

        e.preventDefault();

        $("#search_minor_chang option").remove();
        $("#search_minor_chang").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')
        $("#search_wheel option").remove();
        $("#search_wheel").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')
        $("#search_wheel_drive option").remove();
        $("#search_wheel_drive").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')
        $("#search_body_type option").remove();
        $("#search_body_type").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')
        $("#search_high_stant option").remove();
        $("#search_high_stant").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')
        $("#search_street_name option").remove();
        $("#search_street_name").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')
        $("#search_chassis_model option").remove();
        $("#search_chassis_model").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

        $.filters_search();
        //$.filters('reset');

    });

    $('.select-main').on('change', async function (e) {

        e.preventDefault();

        $.clear_select2_master();

    });

    $('#frm_search').find('#search_vehicle_brand').off('select2:select').on('select2:select', function (evt) {

        evt.preventDefault();

        $(this).on('select2:select', function (evt) {
            evt.preventDefault();
        });

        search_vehicle_brand = $(this).val();

        $('#search_vehicle_model').prop('disabled', true)
        $("#search_vehicle_model option").remove();
        $("#search_vehicle_model").append("<option value=''>---โปรดเลือก---</option>").attr("value", '')

        $('#search_vehicle_year').prop('disabled', true)
        $("#search_vehicle_year option").remove();
        $("#search_vehicle_year").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

        $('#search_modification').prop('disabled', true)
        $("#search_modification option").remove();
        $("#search_modification").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

        $.segments_get();

        $.clear_select2_master();

    });

    $('.search_vehicle_segments').off('select2:select').on('select2:select', function (evt) {

        evt.preventDefault();

        $(this).on('change', function (evt) {
            evt.preventDefault();
        });

        search_vehicle_segments = $(this).val();

        if ($(this).val() != '') {

            $.model_get();

            if ($(this).val() != 'TRUCK') {

                $('#search_car_type').parent().removeClass('d-none')
                $('#search_minor_chang').parent().removeClass('d-none')
                $('#search_high_stant').parent().removeClass('d-none')
                $('#search_wheel').parent().addClass('d-none')
                $('#search_horsepower').parent().addClass('d-none')
                $('#search_chassis_model').parent().addClass('d-none')

            } else if ($(this).val() == 'TRUCK') {

                $('#search_car_type').parent().addClass('d-none')
                $('#search_minor_chang').parent().addClass('d-none')
                $('#search_high_stant').parent().addClass('d-none')
                $('#search_wheel').parent().removeClass('d-none')
                $('#search_horsepower').parent().removeClass('d-none')
                $('#search_chassis_model').parent().removeClass('d-none')
            }

        }

        $("#search_vehicle_model option").remove();
        $("#search_vehicle_model").append("<option value=''>---โปรดเลือก---</option>").attr("value", '')
        $("#search_vehicle_year option").remove();
        $("#search_vehicle_year").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')
        $("#search_modification option").remove();
        $("#search_modification").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

        $(".select-product option").remove();
        $("#search_item_code1 option").remove();
        $("#search_item_code1").append("<option value=''>---โปรดเลือก---</option>").attr("value", '')
        $("#search_product_division").append("<option value=''>---โปรดเลือก---</option>").attr("value", '')
        $("#search_main_category").append("<option value=''>---โปรดเลือก---</option>").attr("value", '').prop('disabled', true)
        $("#search_sub_category").append("<option value=''>---โปรดเลือก---</option>").attr("value", '').prop('disabled', true)

        //$.product_division_get();

        $.clear_select2_master();

    });

    $('#frm_search').find('#search_vehicle_model').off('select2:select').on('select2:select', function (evt) {

        evt.preventDefault();

        $(this).on('select2:select', function (evt) {
            evt.preventDefault();
        });

        search_vehicle_segments = $(this).val();

        $('#search_vehicle_year').prop('disabled', false)
        $("#search_vehicle_year option").remove();
        $("#search_vehicle_year").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

        $('#search_modification').prop('disabled', false)
        $("#search_modification option").remove();
        $("#search_modification").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

        $.product_division_get();
        $.clear_select2_master();

        $.caryear_get();

    });

    $('#frm_search').find('#search_vehicle_year').off('change').on('change', function (evt) {

        evt.preventDefault();

        $(this).on('change', function (evt) {
            evt.preventDefault();
        });

        $.clear_select2_master();

        $.modification_get();

    });

    $('#frm_search').find('#search_modification').off('select2:select').on('select2:select', function (evt) {

        evt.preventDefault();

        $(this).on('select2:select', function (evt) {
            evt.preventDefault();
        });

        let modification_raw = $(this).val()
        const modification = modification_raw.split("$");

        let fuel_type = modification[0];
        let engine_displacement = modification[1];
        let engine_code = modification[2];
        let transmission_type = modification[3];

        //console.log('modification', modification)
        //console.log('fuel_type', fuel_type)
        //console.log('engine_displacement', engine_displacement)
        //console.log('engine_code', engine_code)
        //console.log('transmission_type', transmission_type)

        $.clear_select2_master();
    });

    $('#frm_search').find('#search_product_division').off('select2:select').on('select2:select', function (evt) {

        evt.preventDefault();

        $(this).on('select2:select', function (evt) {
            evt.preventDefault();
        });

        $('#search_main_category').prop('disabled', true)
        $('#search_sub_category').prop('disabled', true)

        $("#search_main_category option").remove();
        $("#search_main_category").append("<option value=''>---โปรดเลือก---</option>").attr("value", '')

        $("#search_sub_category option").remove();
        $("#search_sub_category").append("<option value=''>---โปรดเลือก---</option>").attr("value", '')

        if ($(this).val() == '') {

            $('#search_main_category').prop('disabled', true)

        } else {

            $.main_category_get($(this).val());

        }

    });

    $('#frm_search').find('#search_main_category').off('select2:select').on('select2:select', function (evt) {

        evt.preventDefault();

        $(this).on('select2:select', function (evt) {
            evt.preventDefault();
        });

        $('#search_sub_category').prop('disabled', true)

        $.sub_category_get($(this).val());

    });

    $('#frm_search').find('.select-master').off('select2:select').on('select2:select', function (evt) {

        //alert($(this).attr('id'))

        evt.preventDefault();

        $(this).on('select2:select', function (evt) {
            evt.preventDefault();
        });

        //$.filters($(this).attr('id'));
        //$.filters();

        $.filters_search();

    });

    $(".card-body").LoadingOverlay("hide", true);

};

$.list = async function () {

    master_list = ''

    $(".data_item").LoadingOverlay("show", {
        image: '',
        custom: customElement
    });

    let modification_raw = $('#frm_search').find('#search_modification').val();
    const modification = modification_raw.split("$");

    let fuel_type;
    let engine_displacement;
    let engine_code;
    let transmission_type;
    let horsepower;

    let pages_show = show_item == 0 ? 0 : show_item

    let url_item_list = new URL(url_importdate_carmodelmix_item_list);

    if ($('#frm_search').find('#search_vehicle_segments').val() == 'TRUCK') {

        fuel_type = (modification[0] == 'undefined' || modification[0] == '' || modification[0] == null || modification[0] == '-') ? '' : modification[0]
        engine_code = (modification[1] == 'undefined' || modification[1] == '' || modification[1] == null || modification[1] == '-') ? '' : modification[1]
        horsepower = (modification[2] == 'undefined' || modification[2] == '' || modification[2] == null || modification[2] == '-') ? '' : modification[2]
        transmission_type = (modification[3] == 'undefined' || modification[3] == '' || modification[3] == null || modification[3] == '-') ? '' : modification[3]

        url_item_list.search = new URLSearchParams({

            mode: 'search_truck',
            pages: pages_show,
            show: 24,
            gnamechr: $('#frm_search').find('#search_item_code1').val(),
            vehicle_segments: $('#frm_search').find('#search_vehicle_segments').val(),
            vehicle_brand: $('#frm_search').find('#search_vehicle_brand').val(),
            vehicle_model: $('#frm_search').find('#search_vehicle_model').val(),
            //minor_change: $('#frm_search').find('#search_minor_chang').val(),
            model_change: $('#frm_search').find('#search_vehicle_year').val(),
            fuel_type: fuel_type,
            //engine_displacement: engine_displacement,
            engine_code: engine_code,
            transmission_type: transmission_type,
            horsepower: horsepower,

            body_type: $('#frm_search').find('#search_body_type').val(),
            hign_stant: $('#frm_search').find('#search_high_stant').val(),
            wheel_drive: $('#frm_search').find('#search_wheel_drive').val(),
            street_name: $('#frm_search').find('#search_street_name').val(),

            product_division: $('#frm_search').find('#search_product_division').val(),
            main_category: $('#frm_search').find('#search_main_category').val(),
            sub_category: $('#frm_search').find('#search_sub_category').val(),

            wheel: $('#frm_search').find('#search_wheel').val(),
            chassis_model: $('#frm_search').find('#search_chassis_model').val(),

            code: $('#frm_search').find('#search_item_code').val(),
        });

    } else {

        fuel_type = (modification[0] == 'undefined' || modification[0] == '' || modification[0] == null || modification[0] == '-') ? '' : modification[0]
        engine_displacement = (modification[1] == 'undefined' || modification[1] == '' || modification[1] == null || modification[1] == '-') ? '' : modification[1]
        engine_code = (modification[2] == 'undefined' || modification[2] == '' || modification[2] == null || modification[2] == '-') ? '' : modification[2]
        transmission_type = (modification[3] == 'undefined' || modification[3] == '' || modification[3] == null || modification[3] == '-') ? '' : modification[3]

        url_item_list.search = new URLSearchParams({

            mode: 'search',
            pages: pages_show,
            show: 24,
            gnamechr: $('#frm_search').find('#search_item_code1').val(),
            vehicle_segments: $('#frm_search').find('#search_vehicle_segments').val(),
            vehicle_brand: $('#frm_search').find('#search_vehicle_brand').val(),
            vehicle_model: $('#frm_search').find('#search_vehicle_model').val(),
            minor_change: $('#frm_search').find('#search_minor_chang').val(),
            model_change: $('#frm_search').find('#search_vehicle_year').val(),
            fuel_type: fuel_type,
            engine_displacement: engine_displacement,
            engine_code: engine_code,
            transmission_type: transmission_type,
            // horsepower: horsepower,

            body_type: $('#frm_search').find('#search_body_type').val(),
            hign_stant: $('#frm_search').find('#search_high_stant').val(),
            wheel_drive: $('#frm_search').find('#search_wheel_drive').val() == '_ALL_' ? '' : $('#frm_search').find('#search_wheel_drive').val(),
            street_name: $('#frm_search').find('#search_street_name').val(),

            product_division: $('#frm_search').find('#search_product_division').val(),
            main_category: $('#frm_search').find('#search_main_category').val(),
            sub_category: $('#frm_search').find('#search_sub_category').val(),

            //wheel: $('#frm_search').find('#search_wheel').val(),
            //chassis_model: $('#frm_search').find('#search_chassis_model').val(),

            code: $('#frm_search').find('#search_item_code').val(),
        });

    }

    fetch(url_item_list).then(function (response) {
        return response.json();
    }).then(function (result) {

        $(".data_item").LoadingOverlay("hide", true);

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $('.search-results').html(result.length)

            console.log('search', result.data)

            $('#image_no_results').addClass('d-none');

            if (result.length > 0) {

                no_result = 0
                let i = 1;
                let card = '';

                master_list = result.data;

                $.each(result.data, function (key, val) {

                    let data = JSON.stringify(val);
                    let photo;
                    let gbarcode = val['gbarcode'];

                    $('#last_update').html('');
                    $('#last_update').html(moment(val['created_date']).format("DD/MM/YYYY hh:MM:ss"));
                    //$('#count_last_update').html(moment(val['created_date']).format("DD/MM/YYYY hh:MM:ss"));

                    card += "<div class='col-md-6 col-lg-6 col-xl-4  col-sm-6 item-carmodel'>"
                    card += "<div class='card'>"
                    card += "<div class='card-body'>"
                    card += "<div class='pro-img-box'>"
                    card += "<img class='w-100' id='photo_" + val['code'] + "' src='../../assets/img/ecommerce/01.jpg'>"
                    card += "<a onclick='$.details(" + data + ");' class='adtocart' data-item=" + data + " id='items_list_" + i + "' style='background: #02508A!important;' >"
                    card += "<i class='las la-digital-tachograph'></i>"
                    card += "</a>"
                    card += "</div>"
                    card += "<div class='text-center pt-3'>"
                    card += "<h3 class='h6 mb-2 mt-4 font-weight-bold text-uppercase d-none'>" + val['code'] + "</h3>"
                    card += "<h3 class='h6 mb-2 mt-4 font-weight-bold text-uppercase'>" + val['name'] + "</h3>"
                    card += "<h3 class='h6 mb-2 font-weight-bold text-uppercase '>" + '<span class="text-secondary">' + val['gbarcode'] + '</span>' + '<span class="text-dark"> / </span>' + '<span class="text-secondary">' + val['spcodes'] + '</span>' + "</h3>"

                    //card += "<h4 class='h5 mb-0 mt-2 text-center font-weight-bold text-danger'> " + numberWithCommas(val['gprice_f']) + " <span class='text-warning font-weight-normal tx-13 ml-1 prev-price'> " + numberWithCommas(val['gprice']) + "</span></h4>"
                    card += "</div>"
                    card += "</div>"
                    card += "</div>"
                    card += "</div>"

                    if (val['photo_item'] > 0) {
                        fetch(url_importdate_carmodelmix_item_list + '?mode=' + 'photo_list' + '&gbarcode=' + gbarcode).then(function (response) {
                            return response.json();
                        }).then(function (result_photo) {
                            if (result_photo.status === 'Error') {
                                toastr.error('Oops! An Error Occurred');
                            } else {
                                $.each(result_photo.data, function (key, val_photo) {

                                    photo = url_image + '/' + val_photo['photo_folder'] + '/' + val_photo['photo_name']

                                    $('#photo_' + val['code']).attr('src', photo)

                                    //console.log('photos', photo)
                                });
                            }
                        });
                    } else {
                        photo = '../../assets/img/ecommerce/01.jpg'
                    }

                    i++

                })

                //const datetime = $('#last_update').html()
                //const datetime = new Date()

                //var h = datetime.getHours()
                //var m = datetime.getMinutes()
                //var s = datetime.getSeconds()

                //$('#count_last_update').countdown({
                //    //outputPattern: h + " Hours " + m +" Minute " + s + " Seconds",
                //    //from: 60 * 24 * 3
                //    from: 3600,
                //    to: 0
                //});

                $('#items_list').append(card);

                $('.search-results').html($('.item-carmodel').length);

                $('.item-carmodel').css('cursor', 'pointer');

                $(".item-carmodel .card-body").hover(function () {
                    //$(this).append($("<span> ***</span>"));
                    $(this).addClass('bg-info-transparent');
                    //console.log($(this))
                }, function () {
                    //$(this).find("span").last().remove();
                    $(this).removeClass('bg-info-transparent');
                }
                );

                $.master_get();

            } else {

                $('#image_no_results').removeClass('d-none');
                $('#show_more').addClass('d-none');
                no_result = 1
            }

        }

    });

};

$.filters = async function (id_change) {

    $(".panel-group1").LoadingOverlay("show", {
        image: '',
        custom: customElement
    });

    master_data = ''

    let modification_raw = $('#frm_search').find('#search_modification').val();
    const modification = modification_raw.split("$");

    let fuel_type;
    let engine_displacement;
    let engine_code;
    let transmission_type;
    let horsepower;

    let vehicle_segments = $('#frm_search').find('#search_vehicle_segments').val();

    let url_item_list = new URL(url_importdate_carmodelmix_item_list);

    if (vehicle_segments == 'TRUCK') {

        fuel_type = (modification[0] == 'undefined' || modification[0] == '' || modification[0] == null || modification[0] == '-') ? '' : modification[0]
        engine_code = (modification[1] == 'undefined' || modification[1] == '' || modification[1] == null || modification[1] == '-') ? '' : modification[1]
        horsepower = (modification[2] == 'undefined' || modification[2] == '' || modification[2] == null || modification[2] == '-') ? '' : modification[2]
        transmission_type = (modification[3] == 'undefined' || modification[3] == '' || modification[3] == null || modification[3] == '-') ? '' : modification[3]

        url_item_list.search = new URLSearchParams({
            mode: 'filter_truck',//mode,
            vehicle_segments: $('#frm_search').find('#search_vehicle_segments').val(),
            vehicle_brand: $('#frm_search').find('#search_vehicle_brand').val(),
            vehicle_model: $('#frm_search').find('#search_vehicle_model').val(),
            model_change: $('#frm_search').find('#search_vehicle_year').val(),
            fuel_type: fuel_type,
            //engine_displacement: engine_displacement,
            engine_code: engine_code,
            transmission_type: transmission_type,
            horsepower: horsepower,
            wheel: $('#frm_search').find('#search_wheel').val(),
            wheel_drive: $('#frm_search').find('#search_wheel_drive').val(),
            body_type: $('#frm_search').find('#search_body_type').val(),
            chassis_model: $('#frm_search').find('#search_chassis_model').val(),
            street_name: $('#frm_search').find('#search_street_name').val(),
        });

    } else {

        fuel_type = (modification[0] == 'undefined' || modification[0] == '' || modification[0] == null || modification[0] == '-') ? '' : modification[0]
        engine_displacement = (modification[1] == 'undefined' || modification[1] == '' || modification[1] == null || modification[1] == '-') ? '' : modification[1]
        engine_code = (modification[2] == 'undefined' || modification[2] == '' || modification[2] == null || modification[2] == '-') ? '' : modification[2]
        transmission_type = (modification[3] == 'undefined' || modification[3] == '' || modification[3] == null || modification[3] == '-') ? '' : modification[3]

        url_item_list.search = new URLSearchParams({
            mode: 'filter',//mode,
            vehicle_segments: $('#frm_search').find('#search_vehicle_segments').val(),
            vehicle_brand: $('#frm_search').find('#search_vehicle_brand').val(),
            vehicle_model: $('#frm_search').find('#search_vehicle_model').val(),
            minor_change: $('#frm_search').find('#search_minor_chang').val(),
            model_change: $('#frm_search').find('#search_vehicle_year').val(),
            fuel_type: fuel_type,
            engine_displacement: engine_displacement,
            engine_code: engine_code,
            transmission_type: transmission_type,
            body_type: $('#frm_search').find('#search_body_type').val(),
            hign_stant: $('#frm_search').find('#search_high_stant').val(),
            wheel_drive: $('#frm_search').find('#search_wheel_drive').val() == '_ALL_' ? '' : $('#frm_search').find('#search_wheel_drive').val(),
            street_name: $('#frm_search').find('#search_street_name').val(),
        });

    }

    fetch(url_item_list).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            $(".panel-group1").LoadingOverlay("hide", true);

            toastr.error('Oops! An Error Occurred');

        } else {

            console.log('filter', result.data)

            if (result.length > 0) {

                let i = 1;

                master_data = result.data;

                $.minor_change_get();
                $.body_type_get();
                $.high_stant_get();
                $.street_name_get();
                $.wheel_drive_get();

                $.wheel_get();
                $.horsepower_get();
                $.chassis_model_get();

                $(".panel-group1").LoadingOverlay("hide", true);

            } else {

                $(".panel-group1").LoadingOverlay("hide", true);

                toastr.error('ไม่พบข้อมูลจากการค้นหา');
            }

        }

    });

};

$.filters_search = async function () {

    $(".panel-group1").LoadingOverlay("show", {
        image: '',
        custom: customElement
    });

    master_data = ''

    let modification_raw = $('#frm_search').find('#search_modification').val();
    const modification = modification_raw.split("$");

    let fuel_type;
    let engine_displacement;
    let engine_code;
    let transmission_type;
    let horsepower;

    let mode;
    let vehicle_segments = $('#frm_search').find('#search_vehicle_segments').val();

    if (vehicle_segments == 'TRUCK') {
        mode = 'filter_truck'
    } else {
        mode = 'filter'
    }

    let url_item_list = new URL(url_importdate_carmodelmix_item_list);

    if (vehicle_segments == 'TRUCK') {

        fuel_type = (modification[0] == 'undefined' || modification[0] == '' || modification[0] == null || modification[0] == '-') ? '' : modification[0]
        engine_code = (modification[1] == 'undefined' || modification[1] == '' || modification[1] == null || modification[1] == '-') ? '' : modification[1]
        horsepower = (modification[2] == 'undefined' || modification[2] == '' || modification[2] == null || modification[2] == '-') ? '' : modification[2]
        transmission_type = (modification[3] == 'undefined' || modification[3] == '' || modification[3] == null || modification[3] == '-') ? '' : modification[3]

        url_item_list.search = new URLSearchParams({
            mode: 'filter_truck',//mode,
            vehicle_segments: $('#frm_search').find('#search_vehicle_segments').val(),
            vehicle_brand: $('#frm_search').find('#search_vehicle_brand').val(),
            vehicle_model: $('#frm_search').find('#search_vehicle_model').val(),
            model_change: $('#frm_search').find('#search_vehicle_year').val(),
            fuel_type: fuel_type,
            //engine_displacement: engine_displacement,
            engine_code: engine_code,
            transmission_type: transmission_type,
            horsepower: horsepower,
            wheel: $('#frm_search').find('#search_wheel').val(),
            wheel_drive: $('#frm_search').find('#search_wheel_drive').val(),
            body_type: $('#frm_search').find('#search_body_type').val(),
            chassis_model: $('#frm_search').find('#search_chassis_model').val(),
            street_name: $('#frm_search').find('#search_street_name').val(),
        });

    } else {

        fuel_type = (modification[0] == 'undefined' || modification[0] == '' || modification[0] == null || modification[0] == '-') ? '' : modification[0]
        engine_displacement = (modification[1] == 'undefined' || modification[1] == '' || modification[1] == null || modification[1] == '-') ? '' : modification[1]
        engine_code = (modification[2] == 'undefined' || modification[2] == '' || modification[2] == null || modification[2] == '-') ? '' : modification[2]
        transmission_type = (modification[3] == 'undefined' || modification[3] == '' || modification[3] == null || modification[3] == '-') ? '' : modification[3]

        url_item_list.search = new URLSearchParams({
            mode: 'filter',//mode,
            vehicle_segments: $('#frm_search').find('#search_vehicle_segments').val(),
            vehicle_brand: $('#frm_search').find('#search_vehicle_brand').val(),
            vehicle_model: $('#frm_search').find('#search_vehicle_model').val(),
            minor_change: $('#frm_search').find('#search_minor_chang').val(),
            model_change: $('#frm_search').find('#search_vehicle_year').val(),
            fuel_type: fuel_type,
            engine_displacement: engine_displacement,
            engine_code: engine_code,
            transmission_type: transmission_type,
            body_type: $('#frm_search').find('#search_body_type').val(),
            hign_stant: $('#frm_search').find('#search_high_stant').val(),
            wheel_drive: $('#frm_search').find('#search_wheel_drive').val() == '_ALL_' ? '' : $('#frm_search').find('#search_wheel_drive').val(),
            street_name: $('#frm_search').find('#search_street_name').val(),
        });

    }

    fetch(url_item_list).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            $(".panel-group1").LoadingOverlay("hide", true);

            toastr.error('Oops! An Error Occurred');

        } else {

            console.log('filter', result.data)

            if (result.length > 0) {

                let i = 1;

                master_data = result.data;
                //console.log('master_data', master_data)
                let minor_change = _.uniq(master_data, 'minor_change');
                let body_type = _.uniq(master_data, 'body_type');
                let hign_stant = _.uniq(master_data, 'hign_stant');
                let street_name = _.uniq(master_data, 'street_name');
                let wheel_drive = _.uniq(master_data, 'wheel_drive');
                let wheel = _.uniq(master_data, 'wheel');
                let chassis_model = _.uniq(master_data, 'chassis_model');

                //if ($('#search_minor_chang').val() == '') {
                //    if (minor_change.length < 2) {
                //        $('#search_minor_chang').prop('disabled', true)
                //    } else {
                //        $('#search_minor_chang').prop('disabled', false)
                //        //$('#search_minor_chang').val(minor_change[0]['minor_change']);
                //    }
                //}

                //if ($('#search_body_type').val() == '' || $('#search_body_type').val() == '_ALL_') {
                //    if (body_type.length < 2) {
                //        $('#search_body_type').prop('disabled', true)
                //    } else {
                //        $('#search_body_type').prop('disabled', false)
                //        $('#search_body_type').val(body_type[0]['body_type']).trigger('change');
                //    }
                //}

                //if ($('#search_high_stant').val() == '' || $('#search_high_stant').val() == '_ALL_') {
                //    if (hign_stant.length < 2) {
                //        $('#search_high_stant').prop('disabled', true)
                //    } else {
                //        $('#search_high_stant').prop('disabled', false)
                //        $('#search_high_stant').val(hign_stant[0]['hign_stant']).trigger('change');
                //    }
                //}

                //if ($('#search_wheel_drive').val() == '' || $('#search_high_stant').val() == '_ALL_') {
                //    if (wheel_drive.length < 2) {
                //        $('#search_wheel_drive').prop('disabled', true)
                //    } else {
                //        $('#search_wheel_drive').prop('disabled', false)
                //        $('#search_wheel_drive').val(wheel_drive[0]['wheel_drive']).trigger('change');
                //    }
                //}

                //if ($('#search_street_name').val() == '' || $('#search_street_name').val() == '_ALL_') {
                //    if (street_name.length < 2) {
                //        $('#search_street_name').prop('disabled', true)
                //    } else {
                //        $('#search_street_name').prop('disabled', false)
                //        $('#search_street_name').val(street_name[0]['street_name']);
                //    }
                //} else {
                //    $('#search_street_name').prop('disabled', false)
                //    $('#search_street_name').val(street_name[0]['street_name']).trigger('change');
                //}

                //if ($('#search_wheel').val() == '') {
                //    if (wheel.length < 2) {
                //        $('#search_wheel').prop('disabled', true)
                //    } else {
                //        $('#search_wheel').prop('disabled', false)
                //        $('#search_wheel').val(wheel[0]['wheel']).trigger('change');
                //    }
                //}

                //if ($('#search_chassis_model').val() == '') {
                //    if (chassis_model.length < 2) {
                //        $('#search_chassis_model').prop('disabled', true)
                //    } else {
                //        $('#search_chassis_model').prop('disabled', false)
                //        $('#search_chassis_model').val(chassis_model[0]['chassis_model']).trigger('change');
                //    }
                //}

                $.minor_change_get();
                $.body_type_get();
                $.high_stant_get();
                $.street_name_get();
                $.wheel_drive_get();

                $.wheel_get();
                //$.horsepower_get();
                $.chassis_model_get();

                $(".panel-group1").LoadingOverlay("hide", true);

            } else {

                $(".panel-group1").LoadingOverlay("hide", true);

                toastr.error('ไม่พบข้อมูลจากการค้นหา');
            }

        }

    });

};

$.details = async function (citem) {

    console.log('details', citem)

    $(".modal-body").LoadingOverlay("show", {
        image: '',
        custom: customElement
    });

    await $('#modal-frm_data').modal({
        keyboard: false,
        backdrop: 'static'
    });

    $(".tx-detail").empty();

    $('#photo_1 , #photo_2 , #photo_3 , #photo_4').attr('src', 'assets/img/photos/1.jpg');
    $('#photo_mix_1 , #photo_mix_2 , #photo_mix_3 , #photo_mix_4').attr('src', 'assets/img/photos/1.jpg');
    $('#photo_slide_1 , #photo_slide_2 , #photo_slide_3 , #photo_slide_4').attr('src', 'assets/img/photos/1.jpg');
    $('#photo_slide_mix_1 , #photo_slide_mix_2 , #photo_slide_mix_3 , #photo_slide_mix_4').attr('src', 'assets/img/photos/1.jpg');

    $('#gm_photo_1 , #gm_photo_2 ,#gm_photo_3 ,#gm_photo_4, #gm_s_photo_1 , #gm_s_photo_2 ,#gm_s_photo_3 ,#gm_s_photo_4').attr('src', 'assets/img/photos/1.jpg');
    $('#m_photo_1 , #m_photo_2 ,#m_photo_3 ,#m_photo_4, #m_s_photo_1 , #m_s_photo_2 ,#m_s_photo_3 ,#m_s_photo_4').attr('data-src', 'assets/img/photos/1.jpg');
    $('#m_photo_1 , #m_photo_2 ,#m_photo_3 ,#m_photo_4, #m_s_photo_1 , #m_s_photo_2 ,#m_s_photo_3 ,#m_s_photo_4').attr('data-responsive', 'assets/img/photos/1.jpg');

    let url_item_detail = new URL(url_importdate_item_detail);

    url_item_detail.search = new URLSearchParams({

        code: citem['code'],
    });

    fetch(url_item_detail).then(function (response) {
        return response.json();
    }).then(function (result) {

        $(".modal-body").LoadingOverlay("hide", true);

        console.log('url_item_detail', result.data)

        let master_gprice = ''

        if (result.length > 0) {

            let line_data = [];
            let gprice_data = [];
            let carmodel_data_main = [];
            let i = 1;

            $.each(result.data, function (key, val) {

                let data = JSON.stringify(val)

                $('#frm_data').find('#dt_name').html(val['name']);
                $('#frm_data').find('#dt_item_code').html(val['code']);
                $('#frm_data').find('#dt_barcode').html(val['gbarcode']);
                $('#frm_data').find('#dt_spcodes').html(val['spcodes']);
                $('#frm_data').find('#dt_oem_code').html(val['codeoem']);
                $('#frm_data').find('#dt_chrcode').html(val['chrcode']);

                $('#frm_data').find('#dt_product_division').html(val['product_division']);
                $('#frm_data').find('#dt_main_category').html(val['main_category']);
                $('#frm_data').find('#dt_sub_category').html(val['sub_category']);

                $('#frm_data').find('#dt_vehicle_brand').html(val['vehicle_brand']);
                $('#frm_data').find('#dt_vehicle_model').html(val['vehicle_model']);
                $('#frm_data').find('#dt_vehicle_segments').html(val['vehicle_segments']);

                if (val['photo_item'] > 0) {

                    let img_arr = JSON.parse(val['images']);
                    //console.log(img_arr)
                    let p = 1;

                    $.each(img_arr.data, function (key, val) {

                        let photo_url = url_image + '/' + val['photo_folder'] + '/' + val['photo_name']

                        $('#photo_' + p).attr('src', photo_url);
                        $('#photo_slide_' + p).attr({ src: photo_url, 'data-id': val['photo_id'] });

                        $('#gm_photo_' + p).attr('src', photo_url);
                        $('#m_photo_' + p).attr('data-responsive', photo_url);
                        $('#m_photo_' + p).attr('data-src', photo_url);
                        $('#m_photo_' + p).attr('data-sub-html', 'CarModel_Main ' + ' : ' + val['photo_name']);

                        p++
                    })

                }

                gprice_data.push([
                    '',
                    val['gprice'].toFixed(2),
                    val['gprice_a'].toFixed(2),
                    val['gprice_b'].toFixed(2),
                    val['gprice_c'].toFixed(2),
                    val['gprice_d'].toFixed(2),
                    val['gprice_e'].toFixed(2),
                    val['gprice_f'].toFixed(2),
                ])

                if (val['vehicle_segments'] == 'TRUCK') {

                    $('#tbl-carmodel-main-truck').removeClass('d-none')
                    $('#tbl-carmodel-main').addClass('d-none')

                    carmodel_data_main.push([
                        '<i data-vehicle_model="' + val['vehicle_model'] +
                        '" data-model_change="' + val['model_change'] +
                        '" data-chassis_model="' + val['chassis_model'] +
                        '" data-body_type="' + val['body_type'] +
                        '" data-wheel="' + val['wheel'] +
                        '" data-wheel_drive="' + val['wheel_drive'] +
                        '" data-street_name="' + val['street_name'] +
                        '" class="si si si-plus show-detail tx-primary"></i>',
                        val['vehicle_model'],
                        val['model_change'],
                        val['chassis_model'],
                        val['body_type'],
                        val['wheel'],
                        val['wheel_drive'],
                        val['street_name'],
                    ]);

                } else if (val['vehicle_segments'] != 'TRUCK') {

                    $('#tbl-carmodel-main').removeClass('d-none')
                    $('#tbl-carmodel-main-truck').addClass('d-none')

                    carmodel_data_main.push([
                        '<i data-vehicle_model="' + val['vehicle_model'] +
                        '" data-minor_change="' + val['minor_change'] +
                        '" data-body_type="' + val['body_type'] +
                        '" data-hign_stant="' + val['hign_stant'] +
                        '" data-street_name="' + val['street_name'] +
                        '" class="si si si-plus show-detail tx-primary"></i>',
                        val['vehicle_model'],
                        val['model_change'],
                        val['minor_change'],
                        val['body_type'],
                        val['hign_stant'],
                        val['street_name'],
                    ]);

                }

                i++

            });

            var gprice_arr = _.uniq(gprice_data, _.property('gprice'))

            table_gprice = $('#tbl-gprice').DataTable({
                "data": gprice_arr,
                "dom": 't',
                "bDestroy": true,
                "deferRender": true,
                "order": [[0, "desc"]],
                "ordering": false,
                "columnDefs": [{
                    "targets": [0, 2, 3, 4, 5, 6, 7],
                    "class": 'tx-right',
                }],
            });

            table_gprice.columns.adjust();

            $('#tbl-gprice').addClass('d-none')

            let tbl;
            let vehicle_segments = result.data[0]['vehicle_segments'];

            if (vehicle_segments == 'TRUCK') {

                tbl = 'tbl-carmodel-main-truck'

                table_carmodel_main = $('#tbl-carmodel-main-truck').DataTable({
                    "data": carmodel_data_main,
                    "dom": 't',
                    "bDestroy": true,
                    "deferRender": true,
                    "order": [[0, "desc"]],
                    "ordering": false,
                    "columnDefs": [{
                        "targets": 'no-sort',
                        "orderable": false,
                    },
                    {
                        "targets": [0],
                        "searchable": false,
                        "class": "details-control tx-center",
                    }],
                });

            } else {

                tbl = 'tbl-carmodel-main'

                table_carmodel_main = $('#tbl-carmodel-main').DataTable({
                    "data": carmodel_data_main,
                    "dom": 't',
                    "bDestroy": true,
                    "deferRender": true,
                    "order": [[0, "desc"]],
                    "ordering": false,
                    "columnDefs": [{
                        "targets": 'no-sort',
                        "orderable": false,
                    },
                    {
                        "targets": [0],
                        "searchable": false,
                        "class": "details-control tx-center",
                    }],
                });

            }

            table_carmodel_main.columns.adjust();

            $('#' + tbl + ' tbody').off('click').on('click', 'td.details-control .show-detail', function (evt) {

                evt.preventDefault();

                var tr = $(this).closest('tr');
                var row = table_carmodel_main.row(tr);

                if (row.child.isShown()) {

                    row.child.hide();
                    tr.removeClass('shown');

                }
                else {

                    $.carmodel_sub_list_new(
                        row.child,
                        vehicle_segments,
                        $(this).attr('data-vehicle_model'),
                        $(this).attr('data-minor_change'),
                        $(this).attr('data-model_change'),
                        $(this).attr('data-chassis_model'),
                        $(this).attr('data-body_type'),
                        $(this).attr('data-hign_stant'),
                        $(this).attr('data-wheel'),
                        $(this).attr('data-wheel_drive'),
                        $(this).attr('data-street_name'),

                    );

                    //if (tbl == 'tbl-carmodel-main-truck') {

                    //    $.carmodel_sub_list(
                    //        row.child,
                    //        $(this).attr('data-vehicle_model'),
                    //        $(this).attr('data-model_change'),
                    //        $(this).attr('data-chassis_model'),
                    //        $(this).attr('data-body_type'),
                    //        $(this).attr('data-wheel'),
                    //        $(this).attr('wheel_drive'),
                    //        $(this).attr('data-street_name'),

                    //    );

                    //} else {

                    //    $.carmodel_sub_list(
                    //        row.child,
                    //        $(this).attr('data-vehicle_model'),
                    //        $(this).attr('data-minor_change'),
                    //        $(this).attr('data-body_type'),
                    //        $(this).attr('data-hign_stant'),
                    //        $(this).attr('data-street_name'),

                    //    );

                    //}

                    tr.addClass('shown');
                }
            });

        }
    });

};

$.carmodel_sub_list_new = function format(callback,
    vehicle_segments,
    vehicle_model,
    minor_change,
    model_change,
    chassis_model,
    body_type,
    hign_stant,
    wheel,
    wheel_drive,
    street_name) {

    $(".modal-body").LoadingOverlay("show", {
        image: '',
        custom: customElement
    });

    let mode;

    if (vehicle_segments != 'TRUCK') {
        mode = 'model_line'
    } else if (vehicle_segments == 'TRUCK') {
        mode = 'model_line_truck'
    }

    let url = new URL(url_importdate_carmodelmix_get);

    url.search = new URLSearchParams({

        mode: mode,
        vehicle_model: vehicle_model,
        minor_change: minor_change,
        model_change: model_change,
        body_type: body_type,
        hign_stant: hign_stant,
        street_name: street_name,
        wheel_drive: wheel_drive,
        wheel: wheel,
        chassis_model: chassis_model,
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        $(".modal-body").LoadingOverlay("hide", true);

        if (result.length > 0) {

            let line_data = [];

            var data = result.data;
            var thead;

            if (vehicle_segments != 'TRUCK') {

                thead = "<th class='border-bottom-0'>#</th>" +
                    "<th class='border-bottom-0 tx-center'>Fuel Type</th>" +
                    "<th class='border-bottom-0 tx-center'>Engine Disp.</th>" +
                    "<th class='border-bottom-0 tx-center'>Engine Code</th>" +
                    "<th class='border-bottom-0 tx-center'>Transmission</th>" +
                    "<th class='border-bottom-0 tx-center'>Wheel Drive</th>" +
                    "<th class='border-bottom-0 tx-center'>Model Code</th>";

            } else if (vehicle_segments == 'TRUCK') {

                thead = "<th class='border-bottom-0'>#</th>" +
                    "<th class='border-bottom-0 tx-center'>Chassis</th>" +
                    "<th class='border-bottom-0 tx-center'>Fuel Type</th>" +
                    "<th class='border-bottom-0 tx-center'>Engine Disp.</th>" +
                    "<th class='border-bottom-0 tx-center'>Engine Code</th>" +
                    "<th class='border-bottom-0 tx-center'>Transmission</th>" +
                    "<th class='border-bottom-0 tx-center'>Horsepower</th>" +
                    "<th class='border-bottom-0 tx-center'>Chassis Code</th>";

            }

            var tbody = '';

            let i = result.length

            $.each(data, function (key, val) {

                if (vehicle_segments != 'TRUCK') {

                    tbody += "<tr>" +
                        "<td>" + '<span class="tx-primary">' + i + '</span>' + "</td>" +
                        "<td>" + val.fuel_type + "</td>" +
                        "<td>" + val.engine_displacement + "</td>" +
                        "<td>" + val.engine_code + "</td>" +
                        "<td>" + val.transmission_type + "</td>" +
                        "<td>" + val.wheel_drive + "</td>" +
                        "<td>" + val.model_code + "</td>" +
                        "</tr>";


                } else if (vehicle_segments == 'TRUCK') {

                    tbody += "<tr>" +
                        "<td>" + '<span class="tx-primary">' + i + '</span>' + "</td>" +
                        "<td>" + val.chassis + "</td>" +
                        "<td>" + val.fuel_type + "</td>" +
                        "<td>" + val.engine_displacement + "</td>" +
                        "<td>" + val.engine_code + "</td>" +
                        "<td>" + val.transmission_type + "</td>" +
                        "<td>" + val.horsepower + "</td>" +
                        "<td>" + val.chassis_code + "</td>" +
                        "</tr>";

                }

                i--

            });

            callback($('<table id="tbl-carmodel-sub" class="table text-md-nowrap">' + thead + tbody + '</table>')).show();

        }
    });


};

$.carmodel_sub_list = function format(callback, vehicle_model, minor_change, body_type, hign_stant, street_name) {

    $(".modal-body").LoadingOverlay("show", {
        image: '',
        custom: customElement
    });

    let url_carmodelmix_get = new URL(url_importdate_carmodelmix_get);

    url_carmodelmix_get.search = new URLSearchParams({

        mode: 'model_line',
        vehicle_model: vehicle_model,
        minor_change: minor_change,
        body_type: body_type,
        hign_stant: hign_stant,
        street_name: street_name,

    });

    fetch(url_carmodelmix_get).then(function (response) {
        return response.json();
    }).then(function (result) {

        $(".modal-body").LoadingOverlay("hide", true);

        var data = result.data;

        var thead = "<th class='border-bottom-0'>#</th>" +
            "<th class='border-bottom-0 tx-center'>Fuel Type</th>" +
            "<th class='border-bottom-0 tx-center'>Engine Disp.</th>" +
            "<th class='border-bottom-0 tx-center'>Engine Code</th>" +
            "<th class='border-bottom-0 tx-center'>Transmission</th>" +
            "<th class='border-bottom-0 tx-center'>Wheel Drive</th>" +
            "<th class='border-bottom-0 tx-center'>Model Code</th>";

        var tbody = '';
        let i = result.length
        let image = ''

        $.each(data, function (key, val) {

            let citem = JSON.stringify(val)

            tbody += "<tr>" +
                "<td>" + '<span class="tx-primary">' + i + '</span>' + "</td>" +
                "<td>" + val.fuel_type + "</td>" +
                "<td>" + val.engine_displacement + "</td>" +
                "<td>" + val.engine_code + "</td>" +
                "<td>" + val.transmission_type + "</td>" +
                "<td>" + val.wheel_drive + "</td>" +
                "<td>" + val.model_code + "</td>" +
                "</tr>";
            i--
        });

        callback($('<table id="tbl-carmodel-sub" class="table text-md-nowrap">' + thead + tbody + '</table>')).show();

    });

};

$.carmodel_sub_list_truck = function format(callback, vehicle_model, model_change, chassis_model, body_type, wheel, wheel_drive, street_name) {

    $(".modal-body").LoadingOverlay("show", {
        image: '',
        custom: customElement
    });

    let url_carmodelmix_get = new URL(url_importdate_carmodelmix_get);

    url_carmodelmix_get.search = new URLSearchParams({

        mode: 'model_line',
        vehicle_model: vehicle_model,
        minor_change: minor_change,
        body_type: body_type,
        hign_stant: hign_stant,
        street_name: street_name,

    });

    fetch(url_carmodelmix_get).then(function (response) {
        return response.json();
    }).then(function (result) {

        $(".modal-body").LoadingOverlay("hide", true);

        var data = result.data;

        var thead = "<th class='border-bottom-0'>#</th>" +
            "<th class='border-bottom-0 tx-center'>Fuel Type</th>" +
            "<th class='border-bottom-0 tx-center'>Engine Disp.</th>" +
            "<th class='border-bottom-0 tx-center'>Engine Code</th>" +
            "<th class='border-bottom-0 tx-center'>Transmission</th>" +
            "<th class='border-bottom-0 tx-center'>Wheel Drive</th>" +
            "<th class='border-bottom-0 tx-center'>Model Code</th>";

        var tbody = '';
        let i = result.length
        let image = ''

        $.each(data, function (key, val) {

            let citem = JSON.stringify(val)

            tbody += "<tr>" +
                "<td>" + '<span class="tx-primary">' + i + '</span>' + "</td>" +
                "<td>" + val.fuel_type + "</td>" +
                "<td>" + val.engine_displacement + "</td>" +
                "<td>" + val.engine_code + "</td>" +
                "<td>" + val.transmission_type + "</td>" +
                "<td>" + val.wheel_drive + "</td>" +
                "<td>" + val.model_code + "</td>" +
                "</tr>";
            i--
        });

        callback($('<table id="tbl-carmodel-sub" class="table text-md-nowrap">' + thead + tbody + '</table>')).show();

    });

};

$.carmodel_gallery_main = async function (citem) {

    $('#frm_data').find('#modelmix , #text_modelmix').html('');

    $('#gm_photo_1 , #gm_photo_2 ,#gm_photo_3 ,#gm_photo_4, #gm_s_photo_1 , #gm_s_photo_2 ,#gm_s_photo_3 ,#gm_s_photo_4').attr('src', 'assets/img/photos/1.jpg');
    $('#m_photo_1 , #m_photo_2 ,#m_photo_3 ,#m_photo_4, #m_s_photo_1 , #m_s_photo_2 ,#m_s_photo_3 ,#m_s_photo_4').attr('data-src', 'assets/img/photos/1.jpg');
    $('#m_photo_1 , #m_photo_2 ,#m_photo_3 ,#m_photo_4, #m_s_photo_1 , #m_s_photo_2 ,#m_s_photo_3 ,#m_s_photo_4').attr('data-responsive', 'assets/img/photos/1.jpg');

    let model_line = citem['vehicle_model'] + ' ' + citem['minor_change'] + ' ' + citem['body_type'] + ' ' + citem['hign_stant'] + ' ' + citem['street_name']

    fetch(url_importdate_carmodelmix_get + '?mode=' + 'photo_main' + '&modelmix=' + model_line).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log('photo_main', result.data)

        if (result.length > 0) {

            var photo_folder = result.data[0]['photo_folder']
            var photo_no = result.data[0]['photo_no']
            var model_id = result.data[0]['model_id']
            var modelmix = result.data[0]['modelmix']
            let photo_url = url_image + photo_folder;
            let i = 1;

            $('#frm_data').find('#modelmix').html(model_id + '  ' + modelmix);
            $('#frm_data').find('#text_modelmix').html(photo_no);

            $.each(result.data, function (key, val) {

                let photo_name = val['photo_name'];
                $('#gm_photo_' + i).attr('src', photo_url + '/' + photo_name);
                $('#m_photo_' + i).attr('data-responsive', photo_url + '/' + photo_name);
                $('#m_photo_' + i).attr('data-src', photo_url + '/' + photo_name);
                $('#m_photo_' + i).attr('data-sub-html', 'CarModel_Main ' + ' : ' + photo_name);

                i++
            });
        }
    });

};

$.modification_get = function () {

    let url = new URL(url_carmodelmix_master_get);

    let mode;
    if ($('#search_vehicle_segments').val() == 'TRUCK') {
        mode = 'modification_truck'
    } else {
        mode = 'modification'
    }

    url.search = new URLSearchParams({
        mode: mode,
        keywords: $('#search_vehicle_brand').val(),
        keywords_1: $('#search_vehicle_model').val(),
        keywords_2: $('#search_vehicle_year').val(),
        keywords_3: $('#search_vehicle_segments').val(),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        $('#search_modification').prop('disabled', false)

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $("#search_modification option").remove();
            $("#search_modification").append("<option value=''>---โปรดเลือก---</option>").attr("value", '')

            let model_dataSet = [];

            $.each(result.data, function (key, val) {

                let val_fuel_type;
                let val_engine_displacement;
                let val_engine_code;
                let val_transmission_type;
                let val_horsepower;

                if (mode == 'modification_truck') {

                    val_fuel_type = val['fuel_type'] == '' ? '-' : val['fuel_type']
                    val_engine_code = val['engine_code'] == '' ? '-' : val['engine_code']
                    val_horsepower = val['horsepower'] == '' ? '-' : val['horsepower']
                    val_transmission_type = val['transmission_type'] == '' ? '-' : val['transmission_type']

                    model_dataSet.push({

                        id: val_fuel_type + '$' + val_engine_code + '$' + val_horsepower + '$' + val_transmission_type,
                        text: val_fuel_type + '  ' + val_engine_code + '  ' + val_horsepower + ' ' + val_transmission_type,

                    });

                } else {

                    val_fuel_type = val['fuel_type'] == '' ? '-' : val['fuel_type']
                    val_engine_displacement = val['engine_displacement'] == '' ? '-' : val['engine_displacement']
                    val_engine_code = val['engine_code'] == '' ? '-' : val['engine_code']
                    val_transmission_type = val['transmission_type'] == '' ? '-' : val['transmission_type']

                    model_dataSet.push({
                        id: val_fuel_type + '$' + val_engine_displacement + '$' + val_engine_code + '$' + val_transmission_type,
                        text: val_fuel_type + ' ' + val_engine_displacement + 'L' + '  ' + val_engine_code + '  ' + val_transmission_type,

                    });

                }

            });

            $('#search_modification').select2({
                width: '100%',
                height: '40px',
                selectionCssClass: 'tx-bold',
                data: model_dataSet,
                templateResult: function (data) {
                    return data.text;
                },
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    });
                }
            });

        }

    });

};

$.segments_get = function () {

    let url = new URL(url_carmodelmix_master_get);

    url.search = new URLSearchParams({
        mode: 'vehicle_segments',
        keywords: $('#search_vehicle_brand').val(),
        keywords_1: $('#search_vehicle_model').val(),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $('#search_vehicle_segments').prop('disabled', false)
            $("#search_vehicle_segments option").remove();
            $("#search_vehicle_segments").append("<option value=''>---โปรดเลือก---</option>").attr("value", '')

            let model_dataSet = [];

            $.each(result.data, function (key, val) {

                model_dataSet.push({ id: val['code'], text: val['code'] });

            });

            $('#search_vehicle_segments').select2({
                width: '100%',
                height: '40px',
                selectionCssClass: 'tx-bold',
                data: model_dataSet,
                templateResult: function (data) {
                    return data.text;
                },
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    });
                }
            });

        }

    });

};

$.brand_get = function () {

    let url = new URL(url_carmodelmix_master_get);

    url.search = new URLSearchParams({
        mode: 'vehicle_brand',
        keywords: $('#search_vehicle_segments').val(),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            let brand_dataSet = [];

            $('#search_vehicle_brand').prop('disabled', false)
            $("#search_vehicle_brand option").remove();
            $("#search_vehicle_brand").append("<option value=''>---โปรดเลือก---</option>").attr("value", '')

            var baseUrl = "../../assets/img/car-brand";

            $.each(result.data, function (key, val) {

                brand_dataSet.push({ html: '<span ><img class="avatar-sm mr-1 my-auto" src="' + baseUrl + '/' + val['code'].toLowerCase() + '.png" class="img-flag" /> ' + ' ' + val['code'] + '</span>', id: val['code'], text: val['code'] });

            });

            $('#search_vehicle_brand').select2({
                width: '100%',
                height: '40px',
                //containerCssClass: "error",
                //dropdownCssClass:'tx-bold',
                selectionCssClass: 'tx-bold',
                data: brand_dataSet,
                templateResult: function (data) {
                    return data.html;
                },
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    });
                },
                escapeMarkup: function (markup) {
                    return markup;
                }
            });

        }

    });

};

$.model_get = function () {

    let url = new URL(url_carmodelmix_master_get);

    url.search = new URLSearchParams({
        mode: 'vehicle_model',
        keywords: $('#search_vehicle_brand').val(),
        keywords_1: $('#search_vehicle_segments').val(),
        //keywords_2: $('#search_vehicle_segments').val() == 'CAR' ? '' : 'TRUCK',
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        $('#search_vehicle_model').prop('disabled', false)

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $("#search_vehicle_model option").remove();
            $("#search_vehicle_model").append("<option value=''>---โปรดเลือก---</option>").attr("value", '')

            let model_dataSet = [];

            $.each(result.data, function (key, val) {

                model_dataSet.push({ id: val['code'], text: val['code'] });

            });

            $('#search_vehicle_model').select2({
                width: '100%',
                height: '40px',
                data: model_dataSet,
                selectionCssClass: 'tx-bold',
                templateResult: function (data) {
                    return data.text;
                },
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    });
                }
            });

        }

    });

};

$.caryear_get = function () {

    $('#search_vehicle_year').prop('disabled', false);

    let url = new URL(url_carmodelmix_master_get);

    url.search = new URLSearchParams({
        mode: 'car_year',
        keywords: $('#search_vehicle_brand').val(),
        keywords_1: $('#search_vehicle_model').val(),
        keywords_2: $('#search_vehicle_segments').val(),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $(".year option").remove();
            $(".year").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

            let i;
            let fmyear
            let toyear
            $.each(result.data, function (key, val) {
                fmyear = val['min_model_change'];
                toyear = val['max_model_change'];
            });
            for (i = toyear; i > fmyear - 1; i--) {
                $('.year').append($('<option />').val(i).html(i));
            }

            $(".year").select2({
                selectionCssClass: 'tx-bold',
            });

        }

    });

};

$.model_change_get = function () {

    if ($('#search_model_chang').val() == '') {
        $("#search_model_chang option").remove();
        $("#search_model_chang").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')
    } else {
    }

    let data = _.uniq(master_data, 'model_change')

    let search_dataSet = [];

    $.each(data, function (key, val) {

        search_dataSet.push({ id: val['model_change'], text: val['model_change'] });

    });
    //console.log('model_change_get', search_dataSet)
    $('#search_model_chang').select2({
        width: '100%',
        height: '40px',
        selectionCssClass: 'tx-bold',
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

};

$.minor_change_get = function () {

    if ($('#search_minor_chang').val() == '') {
        $("#search_minor_chang option").remove();
        $("#search_minor_chang").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')
    } else {
    }

    let data = _.uniq(master_data, 'minor_change')

    let search_dataSet = [];

    $.each(data, function (key, val) {

        search_dataSet.push({ id: val['minor_change'], text: val['minor_change'] });

    });

    //console.log('minor_change_get', search_dataSet)

    $('#search_minor_chang').select2({
        width: '100%',
        height: '40px',
        data: search_dataSet,
        selectionCssClass: 'tx-bold',
        templateResult: function (data) {
            return data.text;
        },
        sorter: function (data) {
            return data.sort(function (a, b) {
                return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
            });
        }
    });

    //if ($('#search_minor_chang').val() == '') {
    if (data.length < 2) {
        //$('#search_minor_chang').prop('disabled', true)
        $('#search_minor_chang').val(data[0]['minor_change']).trigger('change');
    } else {
        $('#search_minor_chang').prop('disabled', false)
        //$('#search_minor_chang').val(minor_change[0]['minor_change']);
    }
    //}

};

$.body_type_get = function () {

    if ($('#search_body_type').val() == '' || $('#search_body_type').val() == '_ALL_') {
        $("#search_body_type option").remove();
        $("#search_body_type").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')
    } else {

    }

    let data = _.uniq(master_data, 'body_type')

    let search_dataSet = [];

    $.each(data, function (key, val) {

        let d_val = val['body_type'] == '' || val['body_type'] == null || val['body_type'] == 'undefined' ? '-' : val['body_type'];
        let d_text = val['body_type'] == '' || val['body_type'] == null || val['body_type'] == 'undefined' ? 'ธรรมดา' : val['body_type'];;

        search_dataSet.push({ id: d_val, text: d_text });

    });

    console.log('body_type', search_dataSet)

    $('#search_body_type').select2({
        width: '100%',
        height: '40px',
        data: search_dataSet,
        selectionCssClass: 'tx-bold',
        templateResult: function (data) {
            return data.text;
        },
        sorter: function (data) {
            return data.sort(function (a, b) {
                return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
            });
        }
    });

    //if ($('#search_body_type').val() == '' || $('#search_body_type').val() == '_ALL_') {
    if (data.length < 2) {
        //$('#search_body_type').prop('disabled', true)
        //$('#search_body_type').val(data[0]['body_type']).trigger('change');
        $('#search_body_type').val(data[0]['body_type'] == '' || data[0]['body_type'] == null || data[0]['body_type'] == 'undefined' ? '_ALL_' : data[0]['body_type']).trigger('change');
    } else {
        $('#search_body_type').prop('disabled', false)
    }
    //}

};

$.high_stant_get = function () {

    if ($('#search_high_stant').val() == '') {
        $("#search_high_stant option").remove();
        $("#search_high_stant").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')
    } else {
    }

    let data = _.uniq(master_data, 'hign_stant')

    let search_dataSet = [];

    $.each(data, function (key, val) {

        let d_val = val['hign_stant'] == '' || val['hign_stant'] == null || val['hign_stant'] == 'undefined' ? '-' : val['hign_stant'];
        let d_text = val['hign_stant'] == '' || val['hign_stant'] == null || val['hign_stant'] == 'undefined' ? 'ธรรมดา' : val['hign_stant'];;

        search_dataSet.push({ id: d_val, text: d_text });

    });

    console.log('high_stant', search_dataSet)

    $('#search_high_stant').select2({
        width: '100%',
        height: '40px',
        selectionCssClass: 'tx-bold',
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

    //if ($('#search_high_stant').val() == '' || $('#search_high_stant').val() == '_ALL_') {
    if (data.length < 2) {
        //$('#search_high_stant').prop('disabled', true)
        //$('#search_high_stant').val(data[0]['hign_stant']).trigger('change');
        $('#search_high_stant').val(data[0]['hign_stant'] == '' || data[0]['hign_stant'] == null || data[0]['hign_stant'] == 'undefined' ? '_ALL_' : data[0]['hign_stant']).trigger('change');
    } else {
        $('#search_high_stant').prop('disabled', false)
    }
    //}

};

$.street_name_get = function () {

    if ($('#search_street_name').val() == '' || $('#search_street_name').val() == '_ALL_') {
        $("#search_street_name option").remove();
        $("#search_street_name").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')
    } else {
    }

    let data = _.uniq(master_data, 'street_name')

    let search_dataSet = [];

    $.each(data, function (key, val) {

        let d_val = val['street_name'] == '' || val['street_name'] == null || val['street_name'] == 'undefined' ? '-' : val['street_name'];
        let d_text = val['street_name'] == '' || val['street_name'] == null || val['street_name'] == 'undefined' ? 'ธรรมดา' : val['street_name'];;

        search_dataSet.push({ id: d_val, text: d_text });

    });

    console.log('street_name', search_dataSet)

    $('#search_street_name').select2({
        width: '100%',
        height: '40px',
        selectionCssClass: 'tx-bold',
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

    if (data.length < 2) {
        //$('#search_street_name').prop('disabled', true)
        $('#search_street_name').val(data[0]['street_name'] == '' || data[0]['street_name'] == null || data[0]['street_name'] == 'undefined' ? '_ALL_' : data[0]['street_name']).trigger('change');
        //alert(data[0]['street_name'])
    } else {
        $('#search_street_name').prop('disabled', false)
    }

};

$.wheel_drive_get = function () {

    if ($('#search_wheel_drive').val() == '') {
        $("#search_wheel_drive option").remove();
        $("#search_wheel_drive").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')
    } else {
    }

    let data = _.uniq(master_data, 'wheel_drive')

    let search_dataSet = [];

    $.each(data, function (key, val) {

        let d_val = val['wheel_drive'] == '' || val['wheel_drive'] == null || val['wheel_drive'] == 'undefined' ? '-' : val['wheel_drive'];
        let d_text = val['wheel_drive'] == '' || val['wheel_drive'] == null || val['wheel_drive'] == 'undefined' ? 'ธรรมดา' : val['wheel_drive'];;

        search_dataSet.push({ id: d_val, text: d_text });

    });
    console.log('wheel_drive', search_dataSet)

    $('#search_wheel_drive').select2({
        width: '100%',
        height: '40px',
        selectionCssClass: 'tx-bold',
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


    //if ($('#search_wheel_drive').val() == '' || $('#search_high_stant').val() == '_ALL_') {
    if (data.length < 2) {
        //$('#search_wheel_drive').prop('disabled', true)
        //$('#search_wheel_drive').val(data[0]['wheel_drive']).trigger('change');
        $('#search_wheel_drive').val(data[0]['wheel_drive'] == '' || data[0]['wheel_drive'] == null || data[0]['wheel_drive'] == 'undefined' ? '_ALL_' : data[0]['wheel_drive']).trigger('change');
    } else {
        $('#search_wheel_drive').prop('disabled', false)
    }
    //}

};


$.wheel_get = function () {

    let data = _.uniq(master_data, 'wheel')

    let search_dataSet = [];

    $.each(data, function (key, val) {

        search_dataSet.push({ id: val['wheel'], text: val['wheel'] });

    });

    console.log('wheel', search_dataSet)

    $('#search_wheel').select2({
        width: '100%',
        height: '40px',
        selectionCssClass: 'tx-bold',
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

    //if ($('#search_wheel').val() == '') {
    if (data.length < 2) {
        //$('#search_wheel').prop('disabled', true)
        $('#search_wheel').val(data[0]['wheel']).trigger('change');
    } else {
        $('#search_wheel').prop('disabled', false)

    }
    //}

};

$.horsepower_get = function () {

    let data = _.uniq(master_data, 'horsepower')

    let search_dataSet = [];

    $.each(data, function (key, val) {

        search_dataSet.push({ id: val['horsepower'], text: val['horsepower'] });

    });

    //console.log('horsepower', search_dataSet)

    $('#search_horsepower').select2({
        width: '100%',
        height: '40px',
        selectionCssClass: 'tx-bold',
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

};

$.chassis_model_get = function () {

    let data = _.uniq(master_data, 'chassis_model')

    let search_dataSet = [];

    $.each(data, function (key, val) {

        search_dataSet.push({ id: val['chassis_model'], text: val['chassis_model'] });

    });

    console.log('chassis_model', search_dataSet)

    $('#search_chassis_model').select2({
        width: '100%',
        height: '40px',
        selectionCssClass: 'tx-bold',
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

    //if ($('#search_chassis_model').val() == '') {
    if (data.length < 2) {
        //$('#search_chassis_model').prop('disabled', true)
        $('#search_chassis_model').val(data[0]['chassis_model']).trigger('change');
    } else {
        $('#search_chassis_model').prop('disabled', false)
    }
    //}
};


$.fuel_type_get = function () {

    if ($('#search_fuel_type').val() == '') {
        $("#search_fuel_type option").remove();
        $("#search_fuel_type").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')
    } else {
    }

    let data = _.uniq(master_data, 'fuel_type')

    let search_dataSet = [];

    $.each(data, function (key, val) {

        search_dataSet.push({ id: val['fuel_type'], text: val['fuel_type'] });

    });
    //console.log('fuel_type', search_dataSet)
    $('#search_fuel_type').select2({
        width: '100%',
        height: '40px',
        selectionCssClass: 'tx-bold',
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

};

$.engine_displacement_get = function () {

    if ($('#search_engine_displacement').val() == '') {
        $("#search_engine_displacement option").remove();
        $("#search_engine_displacement").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')
    } else {
    }

    let data = _.uniq(master_data, 'engine_displacement')

    let search_dataSet = [];

    $.each(data, function (key, val) {

        search_dataSet.push({ id: val['engine_displacement'], text: val['engine_displacement'] });

    });
    //console.log('engine_displacement', search_dataSet)
    $('#search_engine_displacement').select2({
        width: '100%',
        height: '40px',
        selectionCssClass: 'tx-bold',
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

};

$.engine_code_get = function () {

    if ($('#search_engine_code').val() == '') {
        $("#search_engine_code option").remove();
        $("#search_engine_code").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')
    } else {
    }

    let data = _.uniq(master_data, 'engine_code')

    let search_dataSet = [];

    $.each(data, function (key, val) {

        search_dataSet.push({ id: val['engine_code'], text: val['engine_code'] });

    });
    //console.log('engine_code', search_dataSet)
    $('#search_engine_code').select2({
        width: '100%',
        height: '40px',
        selectionCssClass: 'tx-bold',
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

};

$.transmission_type_get = function () {

    if ($('#search_transmission_type').val() == '') {
        $("#search_transmission_type option").remove();
        $("#search_transmission_type").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')
    } else {
    }

    let data = _.uniq(master_data, 'transmission_type')

    let search_dataSet = [];
    //console.log('search_dataSet', search_dataSet)
    $.each(data, function (key, val) {

        search_dataSet.push({ id: val['transmission_type'], text: val['transmission_type'] });

    });
    //console.log('transmission_type', search_dataSet)
    $('#search_transmission_type').select2({
        width: '100%',
        height: '40px',
        selectionCssClass: 'tx-bold',
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

};


$.product_division_get = function () {

    let url = new URL(url_carmodelmix_master_get);

    url.search = new URLSearchParams({
        mode: 'product_division',
        keywords: 'product_division',
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        $('#search_product_division').prop('disabled', false)

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $("#search_product_division option").remove();
            $("#search_product_division").append("<option value=''>---โปรดเลือก---</option>").attr("value", '')

            let model_dataSet = [];

            $.each(result.data, function (key, val) {

                model_dataSet.push({ id: val['code'], text: val['code'] });

            });

            $('#search_product_division').select2({
                width: '100%',
                height: '40px',
                selectionCssClass: 'tx-bold',
                data: model_dataSet,
                templateResult: function (data) {
                    return data.text;
                },
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    });
                }
            });

        }

    });

};

$.main_category_get = function (product_definition) {

    let url = new URL(url_carmodelmix_master_get);

    url.search = new URLSearchParams({
        mode: 'main_category',
        keywords: product_definition,
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        $('#search_main_category').prop('disabled', false)

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $("#search_main_category option").remove();
            $("#search_main_category").append("<option value=''>---โปรดเลือก---</option>").attr("value", '')

            let model_dataSet = [];

            $.each(result.data, function (key, val) {

                model_dataSet.push({ id: val['code'], text: val['code'] });

            });

            $('#search_main_category').select2({
                width: '100%',
                height: '40px',
                selectionCssClass: 'tx-bold',
                data: model_dataSet,
                templateResult: function (data) {
                    return data.text;
                },
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    });
                }
            });

        }

    });

};

$.sub_category_get = function (main_category) {

    let url = new URL(url_carmodelmix_master_get);

    url.search = new URLSearchParams({
        mode: 'sub_category',
        keywords: main_category,
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        $('#search_sub_category').prop('disabled', false)

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $("#search_sub_category option").remove();
            $("#search_sub_category").append("<option value=''>---โปรดเลือก---</option>").attr("value", '')

            let model_dataSet = [];

            $.each(result.data, function (key, val) {

                model_dataSet.push({ id: val['code'], text: val['code'] });

            });

            $('#search_sub_category').select2({
                width: '100%',
                height: '40px',
                selectionCssClass: 'tx-bold',
                data: model_dataSet,
                templateResult: function (data) {
                    return data.text;
                },
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    });
                }
            });

        }

    });

};

$.master_get = function () {

    $('#search_item_code1').select2({
        height: '40px',
        selectionCssClass: 'tx-bold',
        ajax: {
            url: 'http://192.168.1.247/intranet/acc-api/v1/itemmaster_select2_get?ctype=gcode_a',
            dataType: 'json',
            delay: 250,
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

    $('#search_item_code').select2({
        width: 'resolve',
        selectionCssClass: 'tx-bold',
        delay: 500,
        dropdownAutoWidth: true,
        minimumInputLength: 3,
        minimumResultsForSearch: 10,
        ajax: {
            url: url_importdate_carmodelmix_item_list,
            dataType: 'json',
            escapeMarkup: function (markup) {
                return markup;
            },
            data: function (params) {

                let modification_raw = $('#frm_search').find('#search_modification').val();

                const modification = modification_raw.split("$");

                let fuel_type;
                let engine_displacement;
                let engine_code;
                let transmission_type;
                let horsepower;

                var query

                //console.log(params);

                let vehicle_segments = $('#frm_search').find('#search_vehicle_segments').val();

                if (vehicle_segments == 'TRUCK') {

                    fuel_type = (modification[0] == 'undefined' || modification[0] == '' || modification[0] == null || modification[0] == '-') ? '' : modification[0]
                    engine_code = (modification[1] == 'undefined' || modification[1] == '' || modification[1] == null || modification[1] == '-') ? '' : modification[1]
                    transmission_type = (modification[2] == 'undefined' || modification[2] == '' || modification[2] == null || modification[2] == '-') ? '' : modification[2]
                    horsepower = (modification[3] == 'undefined' || modification[3] == '' || modification[3] == null || modification[3] == '-') ? '' : modification[3]

                    query = {
                        mode: 'item',
                        gnamechr: $('#frm_search').find('#search_item_code1').val(),
                        vehicle_brand: $('#frm_search').find('#search_vehicle_brand').val(),
                        vehicle_model: $('#frm_search').find('#search_vehicle_model').val(),
                        vehicle_segments: $('#frm_search').find('#search_vehicle_segments').val(),
                        model_change: $('#frm_search').find('#search_vehicle_year').val(),

                        fuel_type: fuel_type,
                        engine_code: engine_code,
                        transmission_type: transmission_type,
                        horsepower: horsepower,
                        wheel: $('#frm_search').find('#search_wheel').val(),
                        wheel_drive: $('#frm_search').find('#search_wheel_drive').val(),
                        body_type: $('#frm_search').find('#search_body_type').val(),
                        chassis_model: $('#frm_search').find('#search_chassis_model').val(),
                        street_name: $('#frm_search').find('#search_street_name').val(),
                        product_division: $('#frm_search').find('#search_product_division').val(),
                        main_category: $('#frm_search').find('#search_main_category').val(),
                        sub_category: $('#frm_search').find('#search_sub_category').val(),
                        code: $.trim(typeof params.term !== 'undefined' ? params.term : ' '),

                    }

                } else {

                    fuel_type = (modification[0] == 'undefined' || modification[0] == '' || modification[0] == null || modification[0] == '-') ? '' : modification[0]
                    engine_displacement = (modification[1] == 'undefined' || modification[1] == '' || modification[1] == null || modification[1] == '-') ? '' : modification[1]
                    engine_code = (modification[2] == 'undefined' || modification[2] == '' || modification[2] == null || modification[2] == '-') ? '' : modification[2]
                    transmission_type = (modification[3] == 'undefined' || modification[3] == '' || modification[3] == null || modification[3] == '-') ? '' : modification[3]

                    query = {
                        mode: 'item',
                        gnamechr: $('#frm_search').find('#search_item_code1').val(),
                        vehicle_brand: $('#frm_search').find('#search_vehicle_brand').val(),
                        vehicle_model: $('#frm_search').find('#search_vehicle_model').val(),
                        vehicle_segments: $('#frm_search').find('#search_vehicle_segments').val(),
                        minor_change: $('#frm_search').find('#search_minor_chang').val(),
                        model_change: $('#frm_search').find('#search_vehicle_year').val(),
                        fuel_type: fuel_type,
                        engine_displacement: engine_displacement,
                        engine_code: engine_code,
                        transmission_type: transmission_type,
                        body_type: $('#frm_search').find('#search_body_type').val(),
                        hign_stant: $('#frm_search').find('#search_high_stant').val(),
                        wheel_drive: $('#frm_search').find('#search_wheel_drive').val() == '_ALL_' ? '' : $('#frm_search').find('#search_wheel_drive').val(),
                        street_name: $('#frm_search').find('#search_street_name').val(),
                        product_division: $('#frm_search').find('#search_product_division').val(),
                        main_category: $('#frm_search').find('#search_main_category').val(),
                        sub_category: $('#frm_search').find('#search_sub_category').val(),
                        code: $.trim(typeof params.term !== 'undefined' ? params.term : ' '),
                    }

                }

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
                        //console.log(id);
                        if (id != 'X') {
                            icon = '<span style="color: #00810E">' + text + '</span>';
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

};

$.clear_select2_master = function () {

    $('#accordion11').addClass('d-none');

    $("#search_minor_chang option").remove();
    $("#search_minor_chang").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

    $("#search_wheel option").remove();
    $("#search_wheel").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

    $("#search_wheel_drive option").remove();
    $("#search_wheel_drive").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')

    $("#search_body_type option").remove();
    $("#search_body_type").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')

    $("#search_high_stant option").remove();
    $("#search_high_stant").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')

    $("#search_street_name option").remove();
    $("#search_street_name").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')

    $("#search_chassis_model option").remove();
    $("#search_chassis_model").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

};