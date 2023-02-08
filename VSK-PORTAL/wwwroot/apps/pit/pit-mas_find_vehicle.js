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
//let url_image = 'http://192.168.1.247:8899/image_carmodelmix/'
let url_image = 'http://localhost/image_carmodelmix/'
let url_item_image = 'http://localhost/image_item_242/'
let connect_url = 'http://192.168.1.247/intranet/acc-api';
const url_importdate_carmodelmix_get = url_api + "/api/ImportData_CarModelMix_Get";
const url_carmodelmix_item_list = url_api + "/api/CarModelMix_Item_List";
const url_carmodelmix_master_get = url_api + "/api/CarModelMix_Master_Get";
const url_importdate_brand_get = url_api + "/api/Vehicle_Brand_Search";
const url_importdate_model_get = url_api + "/api/Vehicle_Model_Search";
const url_importdate_minor_get = url_api + "/api/Vehicle_Minor_Search";
const url_importdate_lovdata_get = url_api + "/api/Lov_Data_Search";
const url_importdate_gcode_get = url_api + "/api/Gcode_Get";

let photo_dataSet = [];

let photo_data, photo_no;
let table_main_list, table_truck_list, table_model_line, table_model_line_truck, table_carmodel_item;
var item_disgroup, item_code_1, item_code_3;

function filterGlobal() {
    table_main_list = $('#tbl-main_list').DataTable().search(
        $('#global_filter').val().trim(),
        false,
        true
    ).draw();
}

$(document).ready(async function () {

    $LogEventCreate('view', 'OK', '')

    await $.init();

});

$.init = async function () {

    $(".card-body").LoadingOverlay("show", {
        image: '',
        custom: customElement
    });

    $('.car_gallery').lightGallery();

    $.brand_get();

    $('.search_vehicle_segments').select2({
        width: '100%',
        height: '40px',
        class: 'text-center',
    });

    $('#frm_search').find('#search_vehicle_brand').off('select2:select').on('select2:select', function (evt) {

        evt.preventDefault();

        $(this).on('select2:select', function (evt) {
            evt.preventDefault();
        });

        if ($('#search_vehicle_brand').val() != '') {

            $(".filter_sub option").remove();
            $(".filter_sub").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

            $("#search_vehicle_model option").remove();
            $("#search_vehicle_model").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

            $("#search_vehicle_segments option").remove();
            $("#search_vehicle_segments").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

            //$.model_get($(this).val());

            $.segments_get($(this).val());

        } else {

            //$('#search_vehicle_model').prop('disabled', true);
            //$('#search_vehicle_segments').prop('disabled', true);

            $("#search_vehicle_model option").remove();
            $("#search_vehicle_model").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

            $("#search_vehicle_segments option").remove();
            $("#search_vehicle_segments").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

        }

    });

    $('.search_vehicle_segments').off('select2:select').on('select2:select', function (evt) {
        //$('.search_vehicle_segments').off('change').on('change', function (evt) {

        evt.preventDefault();

        $(this).on('change', function (evt) {
            evt.preventDefault();
        });

        if ($(this).val() != '') {

            if ($(this).val() !== 'TRUCK') {

                $('#search_model_year').parent().removeClass('d-none')
                $('#search_minor_year').parent().removeClass('d-none')
                $('#search_body_type').parent().removeClass('d-none')
                $('#search_high_stant').parent().removeClass('d-none')
                $('#search_wheel').parent().addClass('d-none')
                $('#search_wheel_drive').parent().addClass('d-none')
                $('#search_chassis_model').parent().addClass('d-none')
                $('#search_street_name').parent().removeClass('d-none')

            } else if ($(this).val() == 'TRUCK') {

                $('#search_model_year').parent().removeClass('d-none')
                $('#search_minor_year').parent().addClass('d-none')
                $('#search_body_type').parent().removeClass('d-none')
                $('#search_high_stant').parent().addClass('d-none')
                $('#search_wheel').parent().removeClass('d-none')
                $('#search_wheel_drive').parent().removeClass('d-none')
                $('#search_chassis_model').parent().removeClass('d-none')
                $('#search_street_name').parent().removeClass('d-none')

            }

            //$.brand_get();

            $("#search_vehicle_model option").remove();
            $("#search_vehicle_model").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

            $(".filter_sub option").remove();
            $(".filter_sub").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

            $.model_get($(this).val());

        } else {

            $("#search_vehicle_model option").remove();
            $("#search_vehicle_model").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')
        }

    });

    $('#frm_search').find('#search_vehicle_model').off('select2:select').on('select2:select', function (evt) {

        evt.preventDefault();

        $(this).on('select2:select', function (evt) {
            evt.preventDefault();
        });

        //if ($(this).val() != '') {

        //    $('.filter_show').removeClass('d-none')

        $.model_change_get();
        $.minor_change_get();
        $.body_type_get();
        $.hign_stant_get();
        $.street_name_get();

        $.wheel_get();
        $.wheel_drive_get();
        $.chassis_model_get();

        //} else {

        //    $('.filter_show').addClass('d-none')

        //}

    });

    $('#modal-frm_data').off('hidden.bs.modal').on('hidden.bs.modal', async function (e) {

        e.preventDefault();

        $('#a details').removeClass('active')
        $('#a gallery').removeClass('active')
        $('#a item').removeClass('active')

        $('#details').removeClass('active')
        $('#gallery').removeClass('active')
        $('#item').removeClass('active')

    });

    $('#modal-frm_data').off('shown.bs.modal').on('shown.bs.modal', async function (e) {

        e.preventDefault();

        $('#a details').addClass('active')
        $('#details').addClass('active')
        $('.profile li a').hasClass('active') == true ? $('.profile li a').removeClass('active') : ''
        $('.profile li a').eq(0).addClass('active')

    });

    $('input.global_filter').on('keyup click', function () {

        filterGlobal();

    });

    $('.btn-search').on('click', async function (e) {

        e.preventDefault();

        $(".card-body").LoadingOverlay("show", {
            image: '',
            custom: customElement
        });

        $('#frm_search').parsley().validate();

        if ($('#frm_search').parsley().isValid()) {

            await $('#image_search_car').addClass('d-none')

           //await $.main_list();

            if ($('#search_vehicle_segments').val() != 'TRUCK') {

                await $.main_list_car();

            } else {

                await $.main_list_truck();

            }

            await $('#global_filter').prop('disabled', false);

        } else {

            await $(".card-body").LoadingOverlay("hide", true);

        }

    });

    $('.btn-reset').on('click', async function (e) {

        e.preventDefault();

        $.clear_main();
        $.clear_filter();
        $.brand_get();

    });

    $('.btn-search_item').on('click', async function (e) {

        e.preventDefault();

        //let btn_search_item = $('.btn-search_item').attr('id');
        let btn_search_item = $(this).attr('id');

        if (btn_search_item == 'search_item') {

            $.list_item();

        } else if (btn_search_item == 'search_reset') {

            $(".search_code option").remove();
            $(".search_code").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')
            $.list_item();

        }

    });

    $('.nav li a').click(function () {

        var data = $(this).attr("href");
        //alert(data)
        if (data == '#item') {

            setTimeout(function () {

                $.list_item();
                $.master_get();

            }, 300);

        }
        //else if (data == '#ex-with-icons-tabs-2') {

        //    mode = ''

        //    setTimeout(function () {

        //        $.list_item();

        //    }, 300);

        //}
    });

    $(".card-body").LoadingOverlay("hide", true);

};

$.main_list = async function () {

    let url = new URL(url_importdate_carmodelmix_get);

    url.search = new URLSearchParams({

        mode: 'main_list',
        vehicle_segments: $('#frm_search').find('#search_vehicle_segments').val(),
        vehicle_brand: $('#frm_search').find('#search_vehicle_brand').val(),
        vehicle_model: $('#frm_search').find('#search_vehicle_model').val(),
        model_change: $('#frm_search').find('#search_model_year').val(),
        minor_change: $('#frm_search').find('#search_minor_year').val(),
        street_name: $('#frm_search').find('#search_street_name').val(),
        body_type: $('#frm_search').find('#search_body_type').val(),
        hign_stant: $('#frm_search').find('#search_high_stant').val(),
        wheel: $('#frm_search').find('#search_wheel').val(),
        wheel_drive: $('#frm_search').find('#search_wheel_drive').val(),
        chassis_model: $('#frm_search').find('#search_chassis_model').val(),

    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        table_main_list = $('#tbl-main_list').DataTable({
            data: result.data,
            dom: '<"top pd-b-40"i>t<"bottom pd-t-10"lp><"clear">',
            deferRender: true,
            ordering: false,
            pageLength: 5,
            bDestroy: true,
            responsive: true,
            lengthMenu: [
                [3, 5, 10, 25, 50, -1],
                ['3', '5', '10', '25', '50', 'Show all']
            ],
            columns: [
                {
                    title: "<center>images</center>",
                    data: "images",
                    class: "tx-center wd-300",
                    render: function (data, type, row, meta) {
                        //$('#carouselExample' + meta.row + '').lightGallery();

                        let str_img = '<div class="">';
                        str_img += '<div class="carousel slide" data-ride="carousel" id="carouselExample' + meta.row + '">';
                        str_img += '<div class="carousel-inner">';

                        if (row.check_photo > 0) {

                            let img_arr = JSON.parse(data);

                            let i = 1;

                            $.each(img_arr.data, function (key, val) {
                                let photo_url = url_image + val['photo_folder'];
                                let photo_active = 'active'
                                if (i > 1) {

                                    photo_active = '';
                                }

                                str_img += '<div  class="carousel-item ' + photo_active + '">'
                                str_img += '<img alt="img" style="max-height:250px !important" class="d-block w-100" id="show_photo_' + i + '" src="' + photo_url + '/' + val['photo_name'] + '">'
                                str_img += '</div >'

                                i++
                            })

                        } else {

                            str_img += '<div class="carousel-item active"><img alt="img" class="d-block w-100" style="max-height:200px !important" id="show_photo_1" src="../../assets/img/no_images.png"></div>'

                        }

                        str_img += '</div>';
                        str_img += '<a class="carousel-control-prev" href="#carouselExample' + meta.row + '" role="button" data-slide="prev"><i class="fa fa-angle-left fs-30" aria-hidden="true"></i></a >';
                        str_img += '<a class="carousel-control-next" href="#carouselExample' + meta.row + '" role="button" data-slide="next"><i class="fa fa-angle-right fs-30" aria-hidden="true"></i></a >';

                        str_img += '</div></div>';

                        return str_img

                    }
                },//0
                {
                    title: "<center data-toggle='tooltip' title='Modelmix'>Vehicle Model</center>",
                    class: "tx-left  wd-600",
                    render: function (data, type, row, meta) {
                    
                        return '<div class="">' +
                            '<div class="col-sm-12">' +

                            '<div class="mg-t-3 pd-b-10">' +
                            '<div class="tx-center">' +
                            '<a type="button" class="details_show"><span class="tx-20 tx-center">' + row.car_models + '</span></a>' +
                            '</div>' +
                            '</div>' +

                            '<div class="row mg-t-3">' +
                            '<label class="col-sm-2">Vehicle Brand:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.vehicle_brand + '</span>' +
                            '</div>' +
                            '<label class="col-sm-2">Vehicle Model:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.vehicle_model + '</span>' +
                            '</div>' +
                            '<label class="col-sm-2">Vehicle Cartype:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.vehicle_segments + '</span>' +
                            '</div>' +
                            '</div>' +

                            '<div class="row mg-t-3">' +
                            '<label class="col-sm-2">Model Change:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.model_change + '</span>' +
                            '</div>' +
                            '<label class="col-sm-2">Minor Change:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.minor_change + '</span>' +
                            '</div>' +
                            '<label class="col-sm-2">Body Type:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.body_type + '</span>' +
                            '</div>' +
                            '</div>' +

                            '<div class="row mg-t-3">' +
                            '<label class="col-sm-2">High Stant:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.hign_stant + '</span>' +
                            '</div>' +
                            '<label class="col-sm-2">Wheel:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.wheel + '</span>' +
                            '</div>' +
                            '<label class="col-sm-2">Wheel Drive:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.wheel_drive + '</span>' +
                            '</div>' +
                            '</div>' +

                            '<div class="row mg-t-3">' +
                            '<label class="col-sm-2">Street Name:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.street_name + '</span>' +
                            '</div>' +
                            '<label class="col-sm-2">Chassis Model:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.chassis_model + '</span>' +
                            '</div>' +

                            '</div>' +

                            '</div>' +
                            '</div>';

                    }
                },//1
                {
                    title: "<center>vehicle brand</center>",
                    data: "vehicle_brand",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//2
                {
                    title: "<center>vehicle model</center>",
                    data: "vehicle_model",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//3
                {
                    title: "<center>vehicle_segments</center>",
                    data: "vehicle_segments",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//4
                {
                    title: "<center>model change</center>",
                    data: "model_change",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//5
                {
                    title: "<center>minor change</center>",
                    data: "minor_change",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//6
                {
                    title: "<center>body type</center>",
                    data: "body_type",
                    class: "tx-center",
                    width: "40px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//7
                {
                    title: "<center>hign stant</center>",
                    data: "hign_stant",
                    class: "tx-center",
                    width: "40px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//8
                {
                    title: "<center>street name</center>",
                    data: "street_name",
                    class: "tx-center",
                    width: "40px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//9
                {
                    title: "<center>wheel</center>",
                    data: "wheel",
                    class: "tx-center",
                    width: "40px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//10
                {
                    title: "<center>wheel_drive</center>",
                    data: "wheel_drive",
                    class: "tx-center",
                    width: "40px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//11
                {
                    title: "<center>chassis_model</center>",
                    data: "chassis_model",
                    class: "tx-center",
                    width: "40px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//12
                {
                    title: "<center>check_photo</center>",
                    data: "check_photo",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//13
                {
                    title: "<center>car_models</center>",
                    data: "car_models",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//14
                {
                    title: "<center>car_models_ref</center>",
                    data: "car_models_ref",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//15
            ],
            "initComplete": async function (settings, json) {

                $(".card-body").LoadingOverlay("hide", true);

                $('#tbl-main_list tbody').off('dblclick', 'tr').on('dblclick', 'tr', async function (evt) {

                    evt.preventDefault();

                    $(this).on('dblclick', function (evt) {
                        evt.preventDefault();
                    });

                    var data = table_main_list.row(this).data();

                    await $.main_details(data);
                    await $.photo_main_details(data);
                    await $.carmodel_gallery_main(data);



                });

            }
        });

    });

};

$.main_list_car = async function () {

    let url = new URL(url_importdate_carmodelmix_get);

    url.search = new URLSearchParams({

        mode: 'main_list_car',
        vehicle_segments: $('#frm_search').find('#search_vehicle_segments').val(),
        vehicle_brand: $('#frm_search').find('#search_vehicle_brand').val(),
        vehicle_model: $('#frm_search').find('#search_vehicle_model').val(),
        minor_change: $('#frm_search').find('#search_minor_year').val(),
        model_change: $('#frm_search').find('#search_model_year').val(),
        street_name: $('#frm_search').find('#search_street_name').val(),
        body_type: $('#frm_search').find('#search_body_type').val(),
        hign_stant: $('#frm_search').find('#search_high_stant').val(),
        //street_name: $('#frm_search').find('#search_street_name').val() == '' || $('#frm_search').find('#search_street_name').val() == null ? '_ALL_' : $('#frm_search').find('#search_street_name').val(),
        //body_type: $('#frm_search').find('#search_body_type').val() == '' || $('#frm_search').find('#search_body_type').val() == null ? '_ALL_' : $('#frm_search').find('#search_body_type').val(),
        //hign_stant: $('#frm_search').find('#search_high_stant').val() == '' || $('#frm_search').find('#search_high_stant').val() == null ? '_ALL_' : $('#frm_search').find('#search_high_stant').val(),

    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        var citem = result.data;

        table_main_list = $('#tbl-main_list').DataTable({
            data: result.data,
            dom: '<"top pd-b-40"i>t<"bottom pd-t-10"lp><"clear">',
            deferRender: true,
            ordering: false,
            pageLength: 5,
            bDestroy: true,
            responsive: true,
            lengthMenu: [
                [3, 5, 10, 25, 50, -1],
                ['3', '5', '10', '25', '50', 'Show all']
            ],
            columns: [
                {
                    title: "<center>images</center>",
                    data: "images",
                    class: "tx-center wd-300",
                    //width: "300px",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        //$('#carouselExample' + meta.row + '').lightGallery();

                        let str_img = '<div class="">';
                        str_img += '<div class="carousel slide" data-ride="carousel" id="carouselExample' + meta.row + '">';
                        str_img += '<div class="carousel-inner">';

                        if (row.check_photo > 0) {

                            let img_arr = JSON.parse(data);

                            let i = 1;

                            $.each(img_arr.data, function (key, val) {
                                let photo_url = url_image + val['photo_folder'];
                                let photo_active = 'active'
                                if (i > 1) {

                                    photo_active = '';
                                }

                                str_img += '<div  class="carousel-item ' + photo_active + '">'
                                str_img += '<img alt="img" style="max-height:250px !important" class="d-block w-100" id="show_photo_' + i + '" src="' + photo_url + '/' + val['photo_name'] + '">'
                                str_img += '</div >'

                                i++
                            })

                        } else {

                            str_img += '<div class="carousel-item active"><img alt="img" class="d-block w-100" style="max-height:200px !important" id="show_photo_1" src="../../assets/img/no_images.png"></div>'

                        }

                        str_img += '</div>';
                        str_img += '<a class="carousel-control-prev" href="#carouselExample' + meta.row + '" role="button" data-slide="prev"><i class="fa fa-angle-left fs-30" aria-hidden="true"></i></a >';
                        str_img += '<a class="carousel-control-next" href="#carouselExample' + meta.row + '" role="button" data-slide="next"><i class="fa fa-angle-right fs-30" aria-hidden="true"></i></a >';

                        str_img += '</div></div>';

                        return str_img

                    }
                },//0
                {
                    title: "<center data-toggle='tooltip' title='Modelmix'>Vehicle Model</center>",
                    class: "tx-left  wd-600",
                    render: function (data, type, row, meta) {
                        //return ''

                        let body_type = row.body_type == null ? '' : row.body_type;
                        let hign_stant = row.hign_stant == null ? '' : row.hign_stant
                        let street_name = row.street_name == null ? '' : row.street_name

                        return '<div class="">' +
                            '<div class="col-sm-12">' +

                            '<div class="mg-t-3 pd-b-10">' +
                            '<div class="tx-center">' +
                            '<a type="button" class="details_show"><span class="tx-20 tx-center">' +
                            row.vehicle_model + ' ' +
                            row.minor_change + ' ' +
                            body_type + ' ' +
                            hign_stant + ' ' +
                            street_name + '</span></a>' +
                            '</div>' +
                            '</div>' +

                            '<div class="row mg-t-3">' +
                            '<label class="col-sm-2">Vehicle Brand:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.vehicle_brand + '</span>' +
                            '</div>' +
                            '<label class="col-sm-2">Vehicle Model:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.vehicle_model + '</span>' +
                            '</div>' +
                            '<label class="col-sm-2">Vehicle Cartype:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.vehicle_segments + '</span>' +
                            '</div>' +
                            '</div>' +

                            '<div class="row mg-t-3">' +
                            '<label class="col-sm-2">Model Change:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.model_change + '</span>' +
                            '</div>' +
                            '<label class="col-sm-2">Minor Change:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.minor_change + '</span>' +
                            '</div>' +
                            '</div>' +

                            '<div class="row mg-t-3">' +
                            '<label class="col-sm-2">Body Type:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + body_type + '</span>' +
                            '</div>' +
                            '<label class="col-sm-2">High Stant:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + hign_stant + '</span>' +
                            '</div>' +
                            '<label class="col-sm-2">Street Name:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + street_name + '</span>' +
                            '</div>' +
                            '</div>' +

                            '</div>' +
                            '</div>';

                    }
                },//1
                {
                    title: "<center>vehicle brand</center>",
                    data: "vehicle_brand",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//2
                {
                    title: "<center>vehicle model</center>",
                    data: "vehicle_model",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//3
                {
                    title: "<center>vehicle_segments</center>",
                    data: "vehicle_segments",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//4
                {
                    title: "<center>model change</center>",
                    data: "model_change",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//5
                {
                    title: "<center>minor change</center>",
                    data: "minor_change",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//6
                {
                    title: "<center data-toggle='tooltip' title='body type'>body type</center>",
                    data: "body_type",
                    class: "tx-center",
                    width: "40px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//7
                {
                    title: "<center data-toggle='tooltip' title='hign stant'>hign stant</center>",
                    data: "hign_stant",
                    class: "tx-center",
                    width: "40px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//8
                {
                    title: "<center data-toggle='tooltip' title='street name'>street name</center>",
                    data: "street_name",
                    class: "tx-center",
                    width: "40px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//9
                {
                    title: "<center data-toggle='tooltip' title='street name'>wheel</center>",
                    data: "wheel",
                    class: "tx-center",
                    width: "40px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//10
                {
                    title: "<center data-toggle='tooltip' title='street name'>wheel_drive</center>",
                    data: "wheel_drive",
                    class: "tx-center",
                    width: "40px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//11
                {
                    title: "<center data-toggle='tooltip' title='street name'>chassis_model</center>",
                    data: "chassis_model",
                    class: "tx-center",
                    width: "40px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//12
                {
                    title: "<center>check_photo</center>",
                    data: "check_photo",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//13
            ],
            "initComplete": async function (settings, json) {

                $(".card-body").LoadingOverlay("hide", true);

                $('#tbl-main_list tbody').off('dblclick', 'tr').on('dblclick', 'tr', async function (evt) {

                    evt.preventDefault();

                    $(this).on('dblclick', function (evt) {
                        evt.preventDefault();
                    });

                    var data = table_main_list.row(this).data();

                    await $.main_details(data);
                    await $.photo_main_details(data);
                    await $.carmodel_gallery_main(data);

                });

            }

        });

    });

};

$.main_list_truck = async function () {

    let url = new URL(url_importdate_carmodelmix_get);

    url.search = new URLSearchParams({

        mode: 'main_list_truck',
        vehicle_segments: $('#frm_search').find('#search_vehicle_segments').val(),
        vehicle_brand: $('#frm_search').find('#search_vehicle_brand').val(),
        vehicle_model: $('#frm_search').find('#search_vehicle_model').val(),
        model_change: $('#frm_search').find('#search_model_year').val(),
        street_name: $('#frm_search').find('#search_street_name').val(),
        body_type: $('#frm_search').find('#search_body_type').val(),
        wheel: $('#frm_search').find('#search_wheel').val(),
        wheel_drive: $('#frm_search').find('#search_wheel_drive').val(),
        chassis_model: $('#frm_search').find('#search_chassis_model').val(),

    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        table_main_list = $('#tbl-main_list').DataTable({
            data: result.data,
            dom: '<"top pd-b-40"i>t<"bottom pd-t-10"lp><"clear">',
            deferRender: true,
            ordering: false,
            pageLength: 5,
            bDestroy: true,
            responsive: true,
            lengthMenu: [
                [3, 5, 10, 25, 50, -1],
                ['3', '5', '10', '25', '50', 'Show all']
            ],
            columns: [
                {
                    title: "<center>images</center>",
                    data: "images",
                    class: "tx-center wd-300",
                    render: function (data, type, row, meta) {
                        //$('#carouselExample' + meta.row + '').lightGallery();

                        let str_img = '<div class="">';
                        str_img += '<div class="carousel slide" data-ride="carousel" id="carouselExample' + meta.row + '">';
                        str_img += '<div class="carousel-inner">';

                        if (row.check_photo > 0) {

                            let img_arr = JSON.parse(data);

                            let i = 1;

                            $.each(img_arr.data, function (key, val) {
                                let photo_url = url_image + val['photo_folder'];
                                let photo_active = 'active'
                                if (i > 1) {

                                    photo_active = '';
                                }

                                str_img += '<div  class="carousel-item ' + photo_active + '">'
                                str_img += '<img alt="img" style="max-height:250px !important" class="d-block w-100" id="show_photo_' + i + '" src="' + photo_url + '/' + val['photo_name'] + '">'
                                str_img += '</div >'

                                i++
                            })

                        } else {

                            str_img += '<div class="carousel-item active"><img alt="img" class="d-block w-100" style="max-height:200px !important" id="show_photo_1" src="../../assets/img/no_images.png"></div>'

                        }

                        str_img += '</div>';
                        str_img += '<a class="carousel-control-prev" href="#carouselExample' + meta.row + '" role="button" data-slide="prev"><i class="fa fa-angle-left fs-30" aria-hidden="true"></i></a >';
                        str_img += '<a class="carousel-control-next" href="#carouselExample' + meta.row + '" role="button" data-slide="next"><i class="fa fa-angle-right fs-30" aria-hidden="true"></i></a >';

                        str_img += '</div></div>';

                        return str_img

                    }
                },//0
                {
                    title: "<center data-toggle='tooltip' title='Modelmix'>Vehicle Model</center>",
                    class: "tx-left  wd-600",
                    render: function (data, type, row, meta) {
                        //return ''
                        return '<div class="">' +
                            '<div class="col-sm-12">' +

                            '<div class="mg-t-3 pd-b-10">' +
                            '<div class="tx-center">' +
                            '<a type="button" class="details_show"><span class="tx-20 tx-center">' + row.vehicle_model + ' ' + row.model_change + ' ' + '(' + row.chassis_model + ')' + ' ' + row.body_type + ' ' + row.wheel + ' ' + row.wheel_drive + ' ' + row.street_name + '</span></a>' +
                            '</div>' +
                            '</div>' +

                            '<div class="row mg-t-3">' +
                            '<label class="col-sm-2">Vehicle Brand:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.vehicle_brand + '</span>' +
                            '</div>' +
                            '<label class="col-sm-2">Vehicle Model:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.vehicle_model + '</span>' +
                            '</div>' +
                            '<label class="col-sm-2">Model Change:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.model_change + '</span>' +
                            '</div>' +
                            '</div>' +

                            //'<div class="row mg-t-3">' +
                            //'<label class="col-sm-2">Model Change:</label>' +
                            //'<div class="col-sm-2">' +
                            //'<span>' + row.model_change + '</span>' +
                            //'</div>' +
                            //'<label class="col-sm-2">Minor Change:</label>' +
                            //'<div class="col-sm-2">' +
                            //'<span>' + '' + '</span>' +
                            //'</div>' +
                            //'</div>' +

                            '<div class="row mg-t-3">' +
                            '<label class="col-sm-2">Body Type:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.body_type + '</span>' +
                            '</div>' +
                            '<label class="col-sm-2">Wheel:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.wheel + '</span>' +
                            '</div>' +
                            '<label class="col-sm-2">Wheel Drive:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.wheel_drive + '</span>' +
                            '</div>' +
                            '</div>' +

                            '<div class="row mg-t-3">' +
                            '<label class="col-sm-2">Street Name:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.street_name + '</span>' +
                            '</div>' +
                            '<label class="col-sm-2">Chassis Model:</label>' +
                            '<div class="col-sm-2">' +
                            '<span>' + row.chassis_model + '</span>' +
                            '</div>' +

                            '</div>' +

                            '</div>' +
                            '</div>';

                    }
                },//1
                {
                    title: "<center>vehicle brand</center>",
                    data: "vehicle_brand",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//2
                {
                    title: "<center>vehicle model</center>",
                    data: "vehicle_model",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//3
                {
                    title: "<center>vehicle_segments</center>",
                    data: "vehicle_segments",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//4
                {
                    title: "<center>model change</center>",
                    data: "model_change",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//5
                {
                    title: "<center>minor change</center>",
                    data: "minor_change",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//6
                {
                    title: "<center>body type</center>",
                    data: "body_type",
                    class: "tx-center",
                    width: "40px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//7
                {
                    title: "<center>hign stant</center>",
                    data: "hign_stant",
                    class: "tx-center",
                    width: "40px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//8
                {
                    title: "<center>street name</center>",
                    data: "street_name",
                    class: "tx-center",
                    width: "40px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//9
                {
                    title: "<center>wheel</center>",
                    data: "wheel",
                    class: "tx-center",
                    width: "40px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//10
                {
                    title: "<center>wheel_drive</center>",
                    data: "wheel_drive",
                    class: "tx-center",
                    width: "40px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//11
                {
                    title: "<center>chassis_model</center>",
                    data: "chassis_model",
                    class: "tx-center",
                    width: "40px",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//12
                {
                    title: "<center>check_photo</center>",
                    data: "check_photo",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//13
            ],
            "initComplete": async function (settings, json) {

                $(".card-body").LoadingOverlay("hide", true);

                $('#tbl-main_list tbody').off('dblclick', 'tr').on('dblclick', 'tr', async function (evt) {

                    evt.preventDefault();

                    $(this).on('dblclick', function (evt) {
                        evt.preventDefault();
                    });

                    var data = table_main_list.row(this).data();

                    await $.main_details(data);
                    await $.photo_main_details(data);
                    await $.carmodel_gallery_main(data);



                });

            }
        });

    });

};

$.main_details = async function (citem) {

    await $('#modal-frm_data').modal({
        keyboard: false,
        backdrop: 'static'
    });

    $(".tx-detail").empty();

    if (citem['vehicle_segments'] == 'TRUCK') {
        $('#tbl-model_line_truck').removeClass('d-none')
        $('#tbl-model_line').addClass('d-none')
        //$('#frm_data').find('#dt_modelmix').html(citem['vehicle_model'] + ' ' + citem['model_change'] + ' ' + citem['body_type'] + ' ' + citem['wheel'] + ' ' + citem['wheel_drive'] + ' ' + citem['street_name'] + ' ' + citem['chassis_model']);
    } else if (citem['vehicle_segments'] != 'TRUCK') {
        $('#tbl-model_line').removeClass('d-none')
        $('#tbl-model_line_truck').addClass('d-none')
        //$('#frm_data').find('#dt_modelmix').html(citem['vehicle_model'] + ' ' + citem['minor_change'] + ' ' + citem['body_type'] + ' ' + citem['hign_stant'] + ' ' + citem['street_name']);
    }

    photo_no = citem['car_models'];
    $('.modal-title').html('Car Model - ' + citem['car_models'])
    $('#frm_data').find('#dt_modelmix').html(citem['car_models']);
    $('#frm_data').find('#dt_vehicle_brand').html(citem['vehicle_brand']);
    $('#frm_data').find('#dt_vehicle_model').html(citem['vehicle_model']);
    $('#frm_data').find('#dt_vehicle_segments').html(citem['vehicle_segments']);
    $('#frm_data').find('#dt_model_change').html(citem['model_change']);
    $('#frm_data').find('#dt_minor_change').html(citem['minor_change']);
    $('#frm_data').find('#dt_body_type').html(citem['body_type']);
    $('#frm_data').find('#dt_high_stant').html(citem['hign_stant']);
    $('#frm_data').find('#dt_street_name').html(citem['street_name']);

    $('#frm_data').find('#dt_wheel').html(citem['wheel']);
    $('#frm_data').find('#dt_wheel_drive').html(citem['wheel_drive']);
    $('#frm_data').find('#dt_chassis_model').html(citem['chassis_model']);

    var p_vehicle_type = citem['vehicle_segments']
    var pd_vehicle_model = citem['vehicle_model'];
    var pd_model_change = citem['model_change'];
    var pd_minor_change = citem['minor_change'];
    var pd_body_type = citem['body_type'];
    var pd_hign_stant = citem['hign_stant'];
    var pd_street_name = citem['street_name'];
    var pd_wheel_drive = citem['wheel_drive'];
    var pd_wheel = citem['wheel'];
    var pd_chassis_model = citem['chassis_model'];

    //fetch(url_importdate_carmodelmix_get + '?mode=' + 'model_line' + '&vehicle_model=' + pd_vehicle_model + '&minor_change=' + pd_minor_change + '&body_type=' + pd_body_type + '&hign_stant=' + pd_hign_stant + '&street_name=' + pd_street_name).then(function (response) {
    //    return response.json();
    //}).then(function (result) {

    let mode;
    if (p_vehicle_type != 'TRUCK') {
        mode = 'model_line'
    } else if (p_vehicle_type == 'TRUCK') {
        mode = 'model_line_truck'
    }

    let url = new URL(url_importdate_carmodelmix_get);

    url.search = new URLSearchParams({

        mode: mode,
        vehicle_model: pd_vehicle_model,
        model_change: pd_model_change,
        minor_change: pd_minor_change,
        body_type: pd_body_type,
        hign_stant: pd_hign_stant,
        street_name: pd_street_name,
        wheel_drive: pd_wheel_drive,
        wheel: pd_wheel,
        chassis_model: pd_chassis_model,
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.length > 0) {

            let line_data = [];
            let i = 1;

            $.each(result.data, function (key, val) {

                if (p_vehicle_type != 'TRUCK') {

                    line_data.push([
                        i,
                        val['fuel_type'],
                        val['engine_displacement'],
                        val['engine_code'],
                        val['transmission_type'],
                        val['wheel_drive'],
                        val['model_code'],
                        val['remarks']
                    ])

                } else if (p_vehicle_type == 'TRUCK') {

                    line_data.push([
                        i,
                        val['chassis'],
                        val['fuel_type'],
                        val['engine_displacement'],
                        val['engine_code'],
                        val['transmission_type'],
                        val['horsepower'],
                        val['chassis_code'],
                        val['remarks']
                    ])

                }

                i++

            });

            if (p_vehicle_type != 'TRUCK') {

                table_model_line = $('#tbl-model_line').DataTable({
                    "data": line_data,
                    dom: 't',
                    "bDestroy": true,
                    "deferRender": true,
                    "order": [[0, "desc"]],
                    "ordering": false,
                    "columnDefs": [{
                        "targets": 'no-sort',
                        "orderable": false,
                    }],
                });

                table_model_line.columns.adjust();

            } else if (p_vehicle_type == 'TRUCK') {

                table_model_line_truck = $('#tbl-model_line_truck').DataTable({
                    "data": line_data,
                    dom: 't',
                    "bDestroy": true,
                    "deferRender": true,
                    "order": [[0, "desc"]],
                    "ordering": false,
                    "columnDefs": [{
                        "targets": 'no-sort',
                        "orderable": false,
                    }],
                });

                table_model_line_truck.columns.adjust();

            }
        }
    });

};

$.photo_main_details = async function (citem) {

    $('#photo_1 , #photo_2 , #photo_3 , #photo_4').attr('src', 'assets/img/photos/1.jpg');
    $('#photo_mix_1 , #photo_mix_2 , #photo_mix_3 , #photo_mix_4').attr('src', 'assets/img/photos/1.jpg');
    $('#photo_slide_1 , #photo_slide_2 , #photo_slide_3 , #photo_slide_4').attr('src', 'assets/img/photos/1.jpg');
    $('#photo_slide_mix_1 , #photo_slide_mix_2 , #photo_slide_mix_3 , #photo_slide_mix_4').attr('src', 'assets/img/photos/1.jpg');

    var vehicle_type = citem['vehicle_segments']
    let model_line;

    if (vehicle_type == 'TRUCK') {
        model_line = citem['vehicle_model'] + ' ' + citem['model_change'] + ' ' + citem['body_type'] + ' ' + citem['wheel_drive'] + ' ' + citem['wheel'] + ' ' + citem['street_name'] + ' ' + citem['chassis_model']
    } else if (vehicle_type == 'CAR') {
        model_line = citem['vehicle_model'] + ' ' + citem['minor_change'] + ' ' + citem['body_type'] + ' ' + citem['hign_stant'] + ' ' + citem['street_name']
    }

    let url = new URL(url_importdate_carmodelmix_get);

    url.search = new URLSearchParams({

        mode: 'photo_main',
        modelmix: citem['car_models'],
        //modelmix: model_line,

    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.length > 0) {

            var photo_folder = result.data[0]['photo_folder']
            let photo_url = url_image + photo_folder;
            let i = 1;

            $.each(result.data, function (key, val) {

                let photo_id = val['photo_id'];
                let photo_name = val['photo_name'];

                $('#photo_' + i).attr('src', photo_url + '/' + photo_name);
                $('#photo_slide_' + i).attr({ src: photo_url + '/' + photo_name, 'data-id': photo_id });

                i++

            });

        }

    });

};

$.carmodel_gallery_main = async function (citem) {

    $('#frm_data').find('#modelmix , #text_modelmix').html('');

    $('#gm_photo_1 , #gm_photo_2 ,#gm_photo_3 ,#gm_photo_4, #gm_s_photo_1 , #gm_s_photo_2 ,#gm_s_photo_3 ,#gm_s_photo_4').attr('src', 'assets/img/photos/1.jpg');
    $('#m_photo_1 , #m_photo_2 ,#m_photo_3 ,#m_photo_4, #m_s_photo_1 , #m_s_photo_2 ,#m_s_photo_3 ,#m_s_photo_4').attr('data-src', 'assets/img/photos/1.jpg');
    $('#m_photo_1 , #m_photo_2 ,#m_photo_3 ,#m_photo_4, #m_s_photo_1 , #m_s_photo_2 ,#m_s_photo_3 ,#m_s_photo_4').attr('data-responsive', 'assets/img/photos/1.jpg');

    var vehicle_type = citem['vehicle_segments']
    let model_line;

    if (vehicle_type == 'TRUCK') {
        model_line = citem['vehicle_model'] + ' ' + citem['model_change'] + ' ' + citem['body_type'] + ' ' + citem['wheel_drive'] + ' ' + citem['wheel'] + ' ' + citem['street_name'] + ' ' + citem['chassis_model']
    } else if (vehicle_type == 'CAR') {
        model_line = citem['vehicle_model'] + ' ' + citem['minor_change'] + ' ' + citem['body_type'] + ' ' + citem['hign_stant'] + ' ' + citem['street_name']
    }

    let url = new URL(url_importdate_carmodelmix_get);

    url.search = new URLSearchParams({

        mode: 'photo_main',
        modelmix: citem['car_models'],
        //modelmix: model_line,

    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

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

            $("#search_vehicle_segments option").remove();
            $("#search_vehicle_segments").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

            let model_dataSet = [];

            $.each(result.data, function (key, val) {

                model_dataSet.push({ id: val['code'], text: val['code'] });

            });

            $('#search_vehicle_segments').select2({
                width: '100%',
                height: '40px',
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
        //keywords: $('#search_vehicle_segments').val() == 'CAR' ? '' : 'TRUCK',
        keywords: $('#search_vehicle_segments').val(),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            let brand_dataSet = [];

            $("#search_vehicle_brand option").remove();
            $("#search_vehicle_brand").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

            $.each(result.data, function (key, val) {

                brand_dataSet.push({ id: val['code'], text: val['code'] });

            });

            $('#search_vehicle_brand').select2({
                width: '100%',
                height: '40px',
                data: brand_dataSet,
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

$.model_get = function (brand) {

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

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $("#search_vehicle_model option").remove();
            $("#search_vehicle_model").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

            let model_dataSet = [];

            $.each(result.data, function (key, val) {

                model_dataSet.push({ id: val['code'], text: val['code'] });

            });

            $('#search_vehicle_model').select2({
                width: '100%',
                height: '40px',
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

$.model_change_get = function () {

    let url = new URL(url_carmodelmix_master_get);

    url.search = new URLSearchParams({
        mode: 'model_change',
        keywords: $('#search_vehicle_brand').val(),
        keywords_1: $('#search_vehicle_model').val(),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $("#search_model_year option").remove();
            $("#search_model_year").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

            let search_dataSet = [];

            $.each(result.data, function (key, val) {

                search_dataSet.push({ id: val['code'], text: val['code'] });

            });

            $('#search_model_year').select2({
                width: '100%',
                height: '40px',
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

        }

    });

};

$.minor_change_get = function () {

    let url = new URL(url_carmodelmix_master_get);

    url.search = new URLSearchParams({
        mode: 'minor_change',
        keywords: $('#search_vehicle_brand').val(),
        keywords_1: $('#search_vehicle_model').val(),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $("#search_minor_year option").remove();

            $("#search_minor_year").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

            let search_dataSet = [];

            $.each(result.data, function (key, val) {

                search_dataSet.push({ id: val['code'], text: val['code'] });

            });

            $('#search_minor_year').select2({
                width: '100%',
                height: '40px',
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

        }

    });

};

$.body_type_get = function () {

    let url = new URL(url_carmodelmix_master_get);

    url.search = new URLSearchParams({
        mode: 'body_type',
        keywords: $('#search_vehicle_brand').val(),
        keywords_1: $('#search_vehicle_model').val(),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $("#search_body_type option").remove();

            $("#search_body_type").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')
            $("#search_body_type").append("<option value='-'>ธรรมดา</option>").attr("value", ' ')

            let search_dataSet = [];

            $.each(result.data, function (key, val) {

                search_dataSet.push({ id: val['code'], text: val['code'] });

            });

            $('#search_body_type').select2({
                width: '100%',
                height: '40px',
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

        }

    });

};

$.hign_stant_get = function () {

    let url = new URL(url_carmodelmix_master_get);

    url.search = new URLSearchParams({
        mode: 'hign_stant',
        keywords: $('#search_vehicle_brand').val(),
        keywords_1: $('#search_vehicle_model').val(),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $("#search_high_stant option").remove();
            $("#search_high_stant").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')
            $("#search_high_stant").append("<option value='-'>ธรรมดา</option>").attr("value", ' ')

            let search_dataSet = [];

            $.each(result.data, function (key, val) {

                search_dataSet.push({ id: val['code'], text: val['code'] });

            });

            $('#search_high_stant').select2({
                width: '100%',
                height: '40px',
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

        }

    });

};

$.street_name_get = function () {

    let url = new URL(url_carmodelmix_master_get);

    url.search = new URLSearchParams({
        mode: 'street_name',
        keywords: $('#search_vehicle_brand').val(),
        keywords_1: $('#search_vehicle_model').val(),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $("#search_street_name option").remove();

            $("#search_street_name").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')
            $("#search_street_name").append("<option value='-'>ธรรมดา</option>").attr("value", ' ')


            let search_dataSet = [];

            $.each(result.data, function (key, val) {

                search_dataSet.push({ id: val['code'], text: val['code'] });

            });

            $('#search_street_name').select2({
                width: '100%',
                height: '40px',
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

        }

    });

};

$.wheel_get = function () {

    let url = new URL(url_carmodelmix_master_get);

    url.search = new URLSearchParams({
        mode: 'wheel',
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

            $("#search_wheel option").remove();

            $("#search_wheel").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')
            $("#search_wheel").append("<option value='-'>ธรรมดา</option>").attr("value", ' ')


            let search_dataSet = [];

            $.each(result.data, function (key, val) {

                search_dataSet.push({ id: val['code'], text: val['code'] });

            });

            $('#search_wheel').select2({
                width: '100%',
                height: '40px',
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

        }

    });

};

$.wheel_drive_get = function () {

    let url = new URL(url_carmodelmix_master_get);

    url.search = new URLSearchParams({
        mode: 'wheel_drive',
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

            $("#search_wheel_drive option").remove();

            $("#search_wheel_drive").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')
            $("#search_wheel_drive").append("<option value='-'>ธรรมดา</option>").attr("value", ' ')


            let search_dataSet = [];

            $.each(result.data, function (key, val) {

                search_dataSet.push({ id: val['code'], text: val['code'] });

            });

            $('#search_wheel_drive').select2({
                width: '100%',
                height: '40px',
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

        }

    });

};

$.chassis_model_get = function () {

    let url = new URL(url_carmodelmix_master_get);

    url.search = new URLSearchParams({
        mode: 'chassis_model',
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

            $("#search_chassis_model option").remove();

            $("#search_chassis_model").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')
            $("#search_chassis_model").append("<option value='-'>ธรรมดา</option>").attr("value", ' ')


            let search_dataSet = [];

            $.each(result.data, function (key, val) {

                search_dataSet.push({ id: val['code'], text: val['code'] });

            });

            $('#search_chassis_model').select2({
                width: '100%',
                height: '40px',
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

        }

    });

};

$.clear_main = function () {

    //$("#search_vehicle_segments").val('').trigger('change');

    $("#search_vehicle_brand option").remove();
    $("#search_vehicle_brand").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

    $("#search_vehicle_segments option").remove();
    $("#search_vehicle_segments").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

    $("#search_vehicle_model option").remove();
    $("#search_vehicle_model").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

    $("#search_model_year option").remove();
    $("#search_model_year").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

    $("#search_minor_year option").remove();
    $("#search_minor_year").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')

};

$.clear_filter = function () {

    $("#search_body_type option").remove();
    $("#search_body_type").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')

    $("#search_high_stant option").remove();
    $("#search_high_stant").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')

    $("#search_wheel option").remove();
    $("#search_wheel").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')

    $("#search_wheel_drive option").remove();
    $("#search_wheel_drive").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')

    $("#search_chassis_model option").remove();
    $("#search_chassis_model").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')

    $("#search_street_name option").remove();
    $("#search_street_name").append("<option value='_ALL_'>---ทั้งหมด---</option>").attr("value", '')

};

$.list_item = async function () {

    $(".tab-content").LoadingOverlay("show", {
        image: '',
        custom: customElement
    });

    let url = new URL(url_carmodelmix_item_list);
    //let url = new URL(url_importdate_carmodelmix_get);

    url.search = new URLSearchParams({
        mode: 'carmodel_item',
        modelmix: photo_no,
        gnamechr: $('#search_item_code1_abb').val(),
        goem: $('#search_item_code5').val(),
        type: $('#search_item_code3').val(),
        gmodel: $('#search_item_code2').val(),
        gused: $('#search_item_code4').val(),
        //photo_no: photo_no,
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            $(".tab-content").LoadingOverlay("hide", true);

            toastr.error('Oops! An Error Occurred');

        } else {

            table_carmodel_item = $('#table-carmodel_item').DataTable({
                data: result.data,
                bDestroy: true,
                dom: '<lf<t>ip>',
                pageLength: 5,
                scrollY: '40vh',
                width: '100%',
                scrollCollapse: true,
                deferRender: true,
                paging: true,
                ordering: false,

                //buttons: [
                //    {
                //        extend: 'excelHtml5',
                //        title: '',
                //        filename: 'ITEM ' + photo_no ,
                //        //exportOptions: {
                //        //    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
                //        //}
                //    },
                //],
                lengthMenu: [
                    [5, 10, 25, 50, -1],
                    ['5', '10', '25', '50', 'Show all']
                ],
                columns: [
                    {
                        title: "<span class='tx-12'>IMAGE</span>",
                        class: "text-center align-middle",
                        width: "20%",
                        render: function (data, type, row, meta) {
                            let str_img = '';
                            str_img += '<div class="d-flex align-items-center lightgallery">'
                            str_img += '<a id="herf_' + row.gbarcode + '" href="../../assets/img/ecommerce/01.jpg" target="_blank">'
                            str_img += '<img  id="photo_' + row.gbarcode + '" src="../../assets/img/ecommerce/01.jpg" alt="" style="width: 100; height: 100px" class="img-fluid rounded" />'
                            str_img += '</a>';
                            str_img += '</div>';
                            return str_img;
                        }
                    },
                    {
                        title: "<span class='text-12'>detail</span>",
                        class: "text-left align-middle",
                        render: function (data, type, row, meta) {
                            let detail = '';
                            detail += '<span class="tx-12 tx-bold">Code : </span>' + '<span class="tx-12">' + row.code + '</span>'
                            detail += '<br>'
                            detail += '<span class="tx-12 tx-bold">Name : </span>' + '<span class="tx-12">' + row.name + '</span>'
                            detail += '<br>'
                            detail += '<span class="tx-12 tx-bold">Barcode : </span>' + '<span class="tx-12">' + row.gbarcode + '</span>'
                            detail += '<span class="tx-12 tx-bold mg-l-5">Spcode : </span>' + '<span class="tx-12">' + row.spcodes + '</span>'
                            return detail;
                        }
                    },
                    {
                        title: "<span class='text-12'>code</span>",
                        data: "code",
                        class: "text-left align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12 fw-bold">' + data + '</span>';
                        }
                    },
                    {
                        title: "<span class='text-12'>gbarcode</span>",
                        data: "gbarcode",
                        class: "text-left align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12 fw-bold">' + data + '</span>';
                        }
                    },
                    {
                        title: "<span class='text-12'>spcodes</span>",
                        data: "spcodes",
                        class: "text-left align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12 fw-bold">' + data + '</span>';
                        }
                    },
                    {
                        title: "<span class='text-12'>name</span>",
                        data: "name",
                        class: "text-left align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    },
                    {
                        title: "<span class='text-12'></span>",
                        data: "code",
                        class: "text-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return "<div class='text-center'><a href='#!' id='" + data + "' class='text-danger delete_item'><i class='fas fa-trash fa-lg'></i></a>  </div>";
                        }
                    },

                ],
                createdRow: function (row, data, dataIndex) {

                    //$(row).attr('data-column', dataIndex);
                    //$(row).attr('id', 'filter_col' + dataIndex);
                    let photo;
                    let url = new URL(url_carmodelmix_item_list);
                    url.search = new URLSearchParams({
                        mode: 'photo_list',
                        gbarcode: data.gbarcode,
                    });
                    fetch(url).then(function (response) {
                        return response.json();
                    }).then(function (result_photo) {
                        if (result_photo.status === 'Error') {
                        } else {
                            if (result_photo.length > 0) {
                                $.each(result_photo.data, function (key, val_photo) {
                                    photo = url_item_image + '/' + val_photo['photo_folder'] + '/' + val_photo['photo_name']
                                    $('#herf_' + data.gbarcode).attr('href', photo)
                                    $('#photo_' + data.gbarcode).attr('src', photo)
                                    console.log('photos', photo)
                                    $('.lightgallery').lightGallery({
                                        thumbnail: false
                                    });
                                });
                            }
                        }
                    });

                },
                initComplete: function (settings, json) {

                    $(".tab-content").LoadingOverlay("hide", true);

                    $('.lightgallery').lightGallery({
                        thumbnail: false
                    });

                },

            });

            //var subservices = result.data;

            //var results = [];

            //$.each(subservices, function (i, e) {
            //    var matchingItems = $.grep(results, function (item) {
            //        return item.chrcode === e.chrcode// && item.label === e.label;
            //    });
            //    if (matchingItems.length === 0) results.push(e);
            //});

            ////console.log(JSON.stringify(results));

            //let search_dataSet = [];

            //$.each(results, function (key, val) {

            //    search_dataSet.push({ id: val['chrcode'], text: val['chrcode'] });

            //});

            ////console.log(search_dataSet);
        }

    }).catch((error) => {

        $(".tab-content").LoadingOverlay("hide", true);

        toastr.error(error, 'ERROR');

    });

};

$.master_get = function () {

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

    $('#search_item_gbarcode').select2({
        ajax: {
            //url: connect_url + '/v1/gcode_select2_get?ctype=spcodes',
            url: connect_url + '/v1/itemmaster_select2_get?ctype=gbarcode',
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

    $('#search_item_spcodes').select2({
        ajax: {
            //url: connect_url + '/v1/gcode_select2_get?ctype=spcodes',
            url: connect_url + '/v1/itemmaster_select2_get?ctype=spcodes',
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

};
