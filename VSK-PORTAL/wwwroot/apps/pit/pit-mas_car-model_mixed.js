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
let template_url = 'http://192.168.1.247/template/';
//let url_image = 'http://192.168.1.247:8899/image_carmodelmix/'
let url_image = 'http://localhost/image_carmodelmix/'
let url_item_image = 'http://localhost/image_item_242/'
let connect_url = 'http://192.168.1.247/intranet/acc-api';


const url_importdate_carmodelmix_tmp = url_api + "/api/ImportData_CarModelMix_Tmp";
const url_importdate_carmodelmix_tmptran = url_api + "/api/ImportData_CarModelMix_TmpTran";
const url_importdate_carmodelmix_verify = url_api + "/api/ImportData_CarModelMix_Verify";
const url_importdate_carmodelmix_verify_truck = url_api + "/api/ImportData_CarModelMix_Verify_Truck";
const url_importdate_carmodelmix_verify_car = url_api + "/api/ImportData_CarModelMix_Verify_Car";
const url_importdate_carmodelmix_upload = url_api + "/api/ImportData_CarModelMix_Upload";
const url_importdate_carmodelmix_get = url_api + "/api/ImportData_CarModelMix_Get";
const url_importdate_carmodelmix_action = url_api + "/api/ImportData_CarModelMix_Action";
const url_carmodelmix_master_get = url_api + "/api/CarModelMix_Master_Get";
const url_importdate_brand_get = url_api + "/api/Vehicle_Brand_Search";
const url_importdate_model_get = url_api + "/api/Vehicle_Model_Search";
const url_importdate_minor_get = url_api + "/api/Vehicle_Minor_Search";
const url_importdate_lovdata_get = url_api + "/api/Lov_Data_Search";
const url_importdate_gcode_get = url_api + "/api/Gcode_Get";
const url_importdate_upload_photo = url_api + "/api/CarModelMix_Master_Upload_Photo";
const url_importdate_photo_delete = url_api + "/api/CarModelMix_Master_Photo_Delete";
const url_importdate_photo_delete_sub = url_api + "/api/CarModelMix_Master_Photo_Delete_Sub";
const url_importdate_photo_delete_modelmix = url_api + "/api/CarModelMix_Master_Photo_Delete_Modelmix";
const url_carmodelmix_item_list = url_api + "/api/CarModelMix_Item_List";

let table_carnodel_import, tbl_carmodel_list, tbl_sub_carmodel, tbl_sub_photo, username, tbl_up_photo, tbl_model_photo, table_carmodel_item;
var item_disgroup, item_code_1, item_code_3, photo_data, photo_no, vehicle_segments;

function filterGlobal() {
    tbl_carmodel_list = $('#tbl-carmodel_list').DataTable().search(
        $('#global_filter').val().trim(),
        false,
        true
    ).draw();
}

function filterColumn(i) {
    tbl_carmodel_list = $('#tbl-carmodel_list').DataTable().column(i).search(
        $.trim($('#col' + i + '_filter').val()),
        false,
        true
    ).draw();
}

$(document).ready(async function () {

    await $.init();

});

$.init = async function () {

    let i;
    let year = new Date().getFullYear();
    for (i = year + 5; i > 1900; i--) {
        $('.year').append($('<option />').val(i).html(i));
    }

    $(".card-body").LoadingOverlay("show", {
        image: '',
        custom: customElement
    });

    await $.brand_get();

    await $.master_get();

    $('.year').select2()

    $('.search_vehicle_segments').select2({
        width: '100%',
        height: '40px',
        class: 'text-center',
    });

    $('.lightgallery_main').lightGallery();

    $('.car_gallery').lightGallery();

    $('#modal-frm_gallery').find('.img-responsive').on('click', function () {

    });

    $('#modal-frm_gallery_main').find('.img-responsive').on('click', function () {

    });

    $('#modal-carmodel_upload').off('hidden.bs.modal').on('hidden.bs.modal', async function () {

        await setTimeout(function () {

            location.reload();

        }, 100);

    });

    $('#modal-report').off('shown.bs.modal').on('shown.bs.modal', async function (e) {

    });

    $('#modal-report').off('hidden.bs.modal').on('hidden.bs.modal', async function () {

        await setTimeout(function () {

            location.reload();

        }, 100);

    });

    $('#modal-frm_data').on('hidden.bs.modal', function () {

        $("#btn-save_exit").removeClass('btn-danger')
        $("#btn-save_exit").text('Save').addClass('btn-primary')

    });

    $('#modal-upload_photo').off('shown.bs.modal').on('shown.bs.modal', async function (e) {

        $('#frm_upload_photo').find('.dropify').prop('disabled', true);
        $('#frm_upload_photo').find('.dropify-wrapper').css({ "height": "200px" });
        $('#frm_upload_photo').find('#up_photo_1').attr('src', 'assets/img/photos/1.jpg');
        $('#frm_upload_photo').find('#up_photo_2').attr('src', 'assets/img/photos/1.jpg');
        $('#frm_upload_photo').find('#up_photo_3').attr('src', 'assets/img/photos/1.jpg');
        $('#frm_upload_photo').find('#up_photo_4').attr('src', 'assets/img/photos/1.jpg');
        $('#frm_upload_photo').find('#up_photo_slide_1').attr('src', 'assets/img/photos/1.jpg');
        $('#frm_upload_photo').find('#up_photo_slide_2').attr('src', 'assets/img/photos/1.jpg');
        $('#frm_upload_photo').find('#up_photo_slide_3').attr('src', 'assets/img/photos/1.jpg');
        $('#frm_upload_photo').find('#up_photo_slide_4').attr('src', 'assets/img/photos/1.jpg');

        //$('#frm_upload_photo').find('#p_vehicle_segments').val($('#search_vehicle_segments').val()).trigger('change')//.prop('disabled', true);
        $('#frm_upload_photo').find('#p_vehicle_brand').val($('#search_vehicle_brand').val()).trigger('change').prop('disabled', true);

        //$.carmodelmix_select2($('#frm_upload_photo').find('#p_vehicle_segments').val());
        //$.carmodelmix_select2('');

    });

    $('#modal-upload_photo').off('hidden.bs.modal').on('hidden.bs.modal', async function (e) {

        await setTimeout(function () {

            $('#frm_upload_photo').find('#modelmix').html('');
            $("#tbl-up_photo_wrapper tbody").empty();
            $("#tbl-model_photo_wrapper").addClass('d-none');
            $("#tbl-model_photo_wrapper tbody").empty();

        }, 100);
    });

    $('#frm_upload_photo').find('#p_carmodelmix').off('select2:select').on('select2:select', function (evt) {

        evt.preventDefault();

        $(this).on('select2:select', function (evt) {
            evt.preventDefault();
        });

        photo_data = evt.params.data;

        //console.log('photo_data', photo_data)
    });

    $('.search_vehicle_segments').off('select2:select').on('select2:select', function (evt) {

        evt.preventDefault();

        $(this).on('select2:select', function (evt) {
            evt.preventDefault();
        });

        if ($(this).attr('id') == 'import_vehicle_segments') {

            if ($('#import_vehicle_segments').val() != '') {

                $('.file_upload').removeClass('d-none');

                $('#import_carmodel').html('Import Carmodel' + ' - ' + $('#import_vehicle_segments').val().toUpperCase())

                if ($('#import_vehicle_segments').val() == 'CAR') {

                    vehicle_segments = 'CAR'

                    $('#btn_template_truck').parent().addClass('d-none');
                    $('#btn_template_car').parent().removeClass('d-none');

                    $.carmodel_import();

                } else if ($('#import_vehicle_segments').val() == 'TRUCK') {

                    vehicle_segments = 'TRUCK'

                    $('#btn_template_car').parent().addClass('d-none');
                    $('#btn_template_truck').parent().removeClass('d-none');

                    $.carmodel_import();

                }

            } else {

                $('.file_upload').addClass('d-none');

            }

        } else if ($(this).attr('id') == 'search_vehicle_segments') {

            $.model_get($(this).val());

            if ($('#search_vehicle_segments').val() != '') {



                //    $.brand_get();

                //    $('#search_vehicle_model').prop('disabled', true);
                //    $("#search_vehicle_model option").remove();
                //    $("#search_vehicle_model").append("<option value=''>---select---</option>").attr("value", '')

                //    $('#search_vehicle_brand').prop('disabled', false);

            } else {

                //    $('#search_vehicle_brand').prop('disabled', true);
                //    $("#search_vehicle_brand option").remove();
                //    $("#search_vehicle_brand").append("<option value=''>---select---</option>").attr("value", '')
                //    $('#search_vehicle_model').prop('disabled', true);
                //    $("#search_vehicle_model option").remove();
                //    $("#search_vehicle_model").append("<option value=''>---select---</option>").attr("value", '')

            }

        }

    });

    $('#frm_search').find('#search_vehicle_brand').off('select2:select').on('select2:select', function (evt) {

        evt.preventDefault();

        $(this).on('select2:select', function (evt) {
            evt.preventDefault();
        });

        if ($('#search_vehicle_brand').val() != '') {

            $('#search_vehicle_model').prop('disabled', false);
            $('#search_vehicle_segments').prop('disabled', false);

            $("#search_vehicle_model option").remove();
            $("#search_vehicle_model").append("<option value=''>---select---</option>").attr("value", '')

            $("#search_vehicle_segments option").remove();
            $("#search_vehicle_segments").append("<option value=''>---select---</option>").attr("value", '')

            $.model_get($(this).val());

            $.segments_get($(this).val());

        } else {

            $('#search_vehicle_model').prop('disabled', true);
            $('#search_vehicle_segments').prop('disabled', true);

            $("#search_vehicle_model option").remove();
            $("#search_vehicle_model").append("<option value=''>---select---</option>").attr("value", '')

            $("#search_vehicle_segments option").remove();
            $("#search_vehicle_segments").append("<option value=''>---select---</option>").attr("value", '')

        }

    });

    $('#frm_search').find('#search_vehicle_model').off('select2:select').on('select2:select', function (evt) {

        evt.preventDefault();

        $(this).on('select2:select', function (evt) {
            evt.preventDefault();
        });

    });

    $('#p_vehicle_segments').off('select2:select').on('select2:select', function (evt) {

        evt.preventDefault();

        $(this).on('select2:select', function (evt) {
            evt.preventDefault();
        });

        if ($(this).val() != '') {
            //$('#p_vehicle_segments').val() == 'TRUCK' ? 'TruckModelMix' : 'CarModelMix'
            if ($(this).val() == 'TRUCK') {
                $.carmodelmix_select2('TruckModelMix')
            } else if ($(this).val() != 'TRUCK') {
                $.carmodelmix_select2('CarModelMix')
            }

        } else {

            $("#p_carmodelmix option").remove();
            $("#p_carmodelmix").append("<option value=''>---select---</option>").attr("value", '')

        }

    });

    $('.lg-close').on('click', function () {

        $('#modal-frm_gallery_main').modal({ keyboard: false, backdrop: 'static' });

    });

    $('#btn-search').on('click', async function (e) {

        e.preventDefault();

        $.LoadingOverlay("show", {
            image: '',
            custom: customElement
        });

        $('#frm_search').parsley().validate();

        if ($('#frm_search').parsley().isValid()) {

            $('#image_search_car').addClass('d-none')

            $('#accordion').removeClass('d-none');

            $('#btn-upload_photo').removeClass('d-none');

            await $.carmodel_list();

        } else {

            $.LoadingOverlay("hide", true);

        }

    });

    $('#btn-reset').click(function (e) {

        e.preventDefault();

        $('.search_global_filter').addClass('d-none');

        $("#report_vehicle_brand option").remove();
        $("#report_vehicle_brand").append("<option value=''>---select---</option>").attr("value", '')

        $("#report_vehicle_model option").remove();
        $("#report_vehicle_model").append("<option value=''>---select---</option>").attr("value", '')

        $("#report_vehicle_minor option").remove();
        $("#report_vehicle_minor").append("<option value=''>---select---</option>").attr("value", '')

        $.brand_get();
    });

    $('#btn-report').on('click', function (evt) {

        let brand

        if ($('#frm_search').find('#search_vehicle_brand').val() == '') {

            brand = ''

        } else {

            brand = $('#frm_search').find('#search_vehicle_brand :selected').text();

        }

        let url_report = "http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_PIA_CarmodelMix&rs:Command=Render&vehicle_brand=" + brand + "";

        window.open(url_report, '_blank');
    });

    $('.btn-search_item').on('click', async function (e) {

        e.preventDefault();

        let btn_search_item = $(this).attr('id');

        if (btn_search_item == 'search_item') {

            $.list_item();

        } else if (btn_search_item == 'search_reset') {

            $(".search_code option").remove();
            $(".search_code").append("<option value=''>---ทั้งหมด---</option>").attr("value", '')
            $.list_item();

        }

    });

    $('.btn_downloadtemplate').on('click', function (evt) {

        evt.preventDefault();

        if ($(this).attr('id') == 'btn_template_car') {

            location.href = template_url + 'Import_MasterData_CarModelMix.xlsx';

        } else if ($(this).attr('id') == 'btn_template_truck') {

            location.href = template_url + 'Import_MasterData_CarModelMix_Truck.xlsx';

        }

    });

    $('#p_carmodelmix').change(function (e) {

        e.preventDefault();

        $('#frm_upload_photo').find('#modelmix').html('');
        $('#frm_upload_photo').find('#modelmix').html($('#p_carmodelmix :selected').text()).css("color", "RoyalBlue");
        $('#frm_upload_photo').find('#up_photo_1').attr('src', 'assets/img/photos/1.jpg');
        $('#frm_upload_photo').find('#up_photo_2').attr('src', 'assets/img/photos/1.jpg');
        $('#frm_upload_photo').find('#up_photo_3').attr('src', 'assets/img/photos/1.jpg');
        $('#frm_upload_photo').find('#up_photo_4').attr('src', 'assets/img/photos/1.jpg');
        $('#frm_upload_photo').find('#up_photo_slide_1').attr('src', 'assets/img/photos/1.jpg');
        $('#frm_upload_photo').find('#up_photo_slide_2').attr('src', 'assets/img/photos/1.jpg');
        $('#frm_upload_photo').find('#up_photo_slide_3').attr('src', 'assets/img/photos/1.jpg');
        $('#frm_upload_photo').find('#up_photo_slide_4').attr('src', 'assets/img/photos/1.jpg');

        if ($(this).val() != '') {

            $.carmodel_photo_details_main();

        } else {

        }

    });

    $('#upload_photo_main').change(function (e) {

        e.preventDefault();

        if ($(this).val() != '') {

            $.carmodel_photo_upload_main($(this).val());

        } else {

        }

    });

    $('input.global_filter').on('keyup click', function () {

        filterGlobal();

    });

    $('input.column_filter').on('keyup', function () {

        filterColumn($(this).attr('data-column'));

    });

    $('.nav li a').click(function () {

        var data = $(this).attr("href");
        //alert(data)
        if (data == '#item') {

            setTimeout(function () {

                $.list_item();
                //$.master_get();

            }, 300);

        }
    });

    $(".card-body").LoadingOverlay("hide", true);
};

$.carmodel_gallery_sub = async function (citem) {

    $('#g_photo_1 , #g_photo_2 ,#g_photo_3 ,#g_photo_4').attr('src', 'assets/img/photos/1.jpg');
    $('#s_photo_1 , #s_photo_2 ,#s_photo_3 ,#s_photo_4').attr('data-src', 'assets/img/photos/1.jpg');
    $('#s_photo_1 , #s_photo_2 ,#s_photo_3 ,#s_photo_4').attr('data-responsive', 'assets/img/photos/1.jpg');

    await $('#modal-frm_gallery').modal({ keyboard: false, backdrop: 'static' });

    fetch(url_importdate_carmodelmix_get + '?mode=' + 'photo_sub' + '&modelmix=' + citem['model_id']).then(function (response) {
        return response.json();
    }).then(function (result) {

        let photo_url = url_image + citem['model_id'];
        let i = 1;

        $.each(result.data, function (key, val) {

            let photo_name = val['photo_name'];
            $('#g_photo_' + i).attr('src', photo_url + '/' + photo_name);
            $('#s_photo_' + i).attr('data-responsive', photo_url + '/' + photo_name);
            $('#s_photo_' + i).attr('data-src', photo_url + '/' + photo_name);

            i++
        });

    });

};

$.carmodel_gallery_main = async function (citem) {

    $('#frm_gallery_main').find('#modelmix , #text_modelmix').html('');

    $('#gm_photo_1 , #gm_photo_2 ,#gm_photo_3 ,#gm_photo_4, #gm_s_photo_1 , #gm_s_photo_2 ,#gm_s_photo_3 ,#gm_s_photo_4').attr('src', 'assets/img/photos/1.jpg');
    $('#m_photo_1 , #m_photo_2 ,#m_photo_3 ,#m_photo_4, #m_s_photo_1 , #m_s_photo_2 ,#m_s_photo_3 ,#m_s_photo_4').attr('data-src', 'assets/img/photos/1.jpg');
    $('#m_photo_1 , #m_photo_2 ,#m_photo_3 ,#m_photo_4, #m_s_photo_1 , #m_s_photo_2 ,#m_s_photo_3 ,#m_s_photo_4').attr('data-responsive', 'assets/img/photos/1.jpg');

    fetch(url_importdate_carmodelmix_get + '?mode=' + 'photo_modelmix' + '&modelmix=' + citem['model_id']).then(function (response) {
        return response.json();
    }).then(function (result) {

        //console.log('result', result.data)

        if (result.length > 0) {

            var photo_folder = result.data[0]['photo_folder']
            var photo_no = result.data[0]['photo_no']
            var model_id = result.data[0]['model_id']
            var modelmix = result.data[0]['modelmix']
            let photo_url = url_image + photo_folder;
            let i = 1;

            $('#frm_gallery_main').find('#modelmix').html(model_id + '  ' + modelmix);
            $('#frm_gallery_main').find('#text_modelmix').html(photo_no);

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

    fetch(url_importdate_carmodelmix_get + '?mode=' + 'photo_modelmix_sub' + '&modelmix=' + citem['model_id']).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.length > 0) {

            var photo_folder = result.data[0]['photo_folder']
            var model_id = result.data[0]['model_id']
            var modelmix = result.data[0]['modelmix']
            let photo_url = url_image + model_id;
            let i = 1;

            $('#frm_gallery_main').find('#modelmix').html(model_id + '  ' + modelmix);

            $.each(result.data, function (key, val) {

                let photo_name = val['photo_name'];
                $('#gm_s_photo_' + i).attr('src', photo_url + '/' + photo_name);
                $('#m_s_photo_' + i).attr('data-responsive', photo_url + '/' + photo_name);
                $('#m_s_photo_' + i).attr('data-src', photo_url + '/' + photo_name);
                $('#m_s_photo_' + i).attr('data-sub-html', 'CarModel_Sub ' + ' : ' + photo_name);

                i++
            });
        }

    });

    return false;
};

$.carmodel_photo_details_main = async function () {

    $('#frm_upload_photo').find('#up_photo_1').attr('src', 'assets/img/photos/1.jpg');
    $('#frm_upload_photo').find('#up_photo_2').attr('src', 'assets/img/photos/1.jpg');
    $('#frm_upload_photo').find('#up_photo_3').attr('src', 'assets/img/photos/1.jpg');
    $('#frm_upload_photo').find('#up_photo_4').attr('src', 'assets/img/photos/1.jpg');
    $('#frm_upload_photo').find('#up_photo_slide_1').attr('src', 'assets/img/photos/1.jpg');
    $('#frm_upload_photo').find('#up_photo_slide_2').attr('src', 'assets/img/photos/1.jpg');
    $('#frm_upload_photo').find('#up_photo_slide_3').attr('src', 'assets/img/photos/1.jpg');
    $('#frm_upload_photo').find('#up_photo_slide_4').attr('src', 'assets/img/photos/1.jpg');

    let p_carmodelmix = $('#p_carmodelmix').val();

    let modelmix_replace = p_carmodelmix.replaceAll(/[.*+?#^${}|[\]\\/]/g, ' ') //ลบ $

    let modelmix_folder = p_carmodelmix.replaceAll(/[.*+?^${}()|[\]\\/] /g, '') //ไม่ลบ $

    $('#tbl-model_photo').removeClass('d-none')

    setTimeout(function () {

        $('#frm_upload_photo').find('.dropify').prop('disabled', false);

    }, 100)

    fetch(url_importdate_carmodelmix_get + '?mode=' + 'photo_main' + '&modelmix=' + modelmix_replace).then(function (response) {
        return response.json();
    }).then(function (result) {

        //console.log('mode photo_main', result.data)

        let photo_url = url_image + modelmix_folder;
        let data_photo = [];
        let i = 1;

        $.each(result.data, function (key, val) {

            let data = JSON.stringify(val)

            let photo_id = val['photo_id'];
            let photo_name = val['photo_name'];

            $('#frm_upload_photo').find('#up_photo_' + i).attr('src', photo_url + '/' + photo_name);
            $('#frm_upload_photo').find('#up_photo_slide_' + i).attr({ src: photo_url + '/' + photo_name, 'data-id': photo_id });

            data_photo.push([
                i,
                "<div class='media'>" +
                "<div class='card-aside-img'><img src='" + photo_url + '/' + photo_name + "' alt='img' class='h-60 w-60'></div>" +
                "</div>",
                val['photo_name'],
                "<div class='d-flex flex-row justify-content-center p-2'>" +
                "<span class=''>" +
                "<a onclick='$.carmodel_photo_delete_main(" + data + ")' data-item='" + data + " class='delete_item_photo' data-action='delete' id='delete_item" + i + "' type='button'><i class='si si-trash text-danger mr-2' data-toggle='tooltip' title='' data-placement='top' data-original-title='Delete'></i></a>" +
                "</span>"
            ])

            i++

        });

        tbl_up_photo = $('#tbl-up_photo').DataTable({
            "data": data_photo,
            "dom": 't',
            "bDestroy": true,
            "deferRender": true,
            "order": [[0, "desc"]],
            "ordering": false,
            "columnDefs": [{
                "targets": 'no-sort',
                "orderable": false,
            }],
        });

        tbl_up_photo.columns.adjust();

    });

    fetch(url_importdate_carmodelmix_get + '?mode=' + 'photo' + '&modelmix=' + modelmix_replace).then(function (response) {
        return response.json();
    }).then(function (result) {

        let i = 1;
        let model_photo = [];

        $.each(result.data, function (key, val) {

            let data = JSON.stringify(val)

            model_photo.push([
                i,
                val['model_id'],
                val['modelmix'],
                val['photo_no'],
                "<div class='d-flex flex-row justify-content-center p-2'>" +
                "<span class='ml-auto'>" +
                "<a data-item='" + data + " class='delete_item_photo' data-action='delete' id='delete_item" + i + "' type='button'><i class='si si-trash text-danger mr-2' data-toggle='tooltip' title='' data-placement='top' data-original-title='Delete'></i></a>" +
                "</span>" +
                "</div>",
            ])

            i++

        });

        tbl_model_photo = $('#tbl-model_photo').DataTable({
            "data": model_photo,
            "bDestroy": true,
            "scrollY": "200px",
            "scrollCollapse": false,
            "order": [[0, "desc"]],
            "ordering": false,
            responsive: true,
            "paging": false
        });

        tbl_model_photo.columns.adjust();

    });

};

$.carmodel_photo_upload_main = function () {

    let p_carmodelmix = $('#p_carmodelmix').val();
    var modelmix_replace = p_carmodelmix.replaceAll(/[.*+?#^${}|[\]\\/]/g, ' ')

    fetch(url_importdate_carmodelmix_get + '?mode=' + 'photo_main' + '&modelmix=' + modelmix_replace).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.length >= '4') {

            swal({
                title: "ขออภัย",
                text: "คุณไม่สามารถอัพโหลดรูปภาพได้",
                type: 'error',
                timer: 2000,
                showConfirmButton: false
            });

            $('.dropify-clear').trigger('click');

            toastr.error('จำนวนภาพครบแล้ว!');

        } else {

            $('#btn-upload_pic').removeClass('d-none')

            $('#frm_upload_photo').find('#btn-upload_pic').off('click').on('click', function (evt) {

                evt.preventDefault();

                $(this).on('click', function (evt) {
                    evt.preventDefault();
                });

                var file_data = new FormData();
                var pic_file = $('#frm_upload_photo').find('#upload_photo_main').get(0).files

                if (pic_file.length > 0) {

                    file_data.append("postedFile", pic_file[0]);
                    file_data.append("pathname", p_carmodelmix);

                    $.ajax({
                        url: url_api + '/PictureUploads/UploadFile',
                        type: 'POST',
                        data: file_data,
                        contentType: false,
                        processData: false,
                        success: function (file_name) {

                            var citem_photo = [];

                            var pd_vehicle_model = photo_data.vehicle_model // == '' || photo_data.vehicle_model == null ? '_ALL_' : photo_data.vehicle_model
                            var pd_model_change = photo_data.model_change // == '' || photo_data.minor_change == null ? '_ALL_' : photo_data.minor_change
                            var pd_minor_change = photo_data.minor_change // == '' || photo_data.minor_change == null ? '_ALL_' : photo_data.minor_change
                            var pd_body_type = photo_data.body_type // == '' || photo_data.body_type == null ? '_ALL_' : photo_data.body_type
                            var pd_hign_stant = photo_data.hign_stant // == '' || photo_data.hign_stant == null ? '_ALL_' : photo_data.hign_stant
                            var pd_street_name = photo_data.street_name // == '' || photo_data.street_name == null ? '_ALL_' : photo_data.street_name
                            var pd_wheel_drive = photo_data.wheel_drive // == '' || photo_data.street_name == null ? '_ALL_' : photo_data.street_name
                            var pd_wheel = photo_data.wheel // == '' || photo_data.street_name == null ? '_ALL_' : photo_data.street_name
                            var pd_chassis_model = photo_data.chassis_model // == '' || photo_data.street_name == null ? '_ALL_' : photo_data.street_name

                            let p_vehicle_segments = $('#p_vehicle_segments').val();
                            let mode;

                            if (p_vehicle_segments != 'TRUCK') {

                                mode = 'main_carmodelmix'

                            } else if (p_vehicle_segments == 'TRUCK') {

                                mode = 'truck_carmodelmix'

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

                                //console.log(result.data)

                                $.each(result.data, async function (key, val) {

                                    citem_photo.push({

                                        'temp_id': $.uuid(),
                                        'model_id': val['model_id'],
                                        'modelmix': val['modelmix'],
                                        'photo_folder': p_carmodelmix,
                                        'photo_url': p_carmodelmix + '/' + file_name,
                                        'photo_type': 'main',
                                        'photo_no': modelmix_replace,
                                        'vehicle_model': pd_vehicle_model,
                                        'model_change': pd_model_change,
                                        'minor_change': pd_minor_change,
                                        'body_type': pd_body_type,
                                        'hign_stant': pd_hign_stant,
                                        'street_name': pd_street_name,

                                        'wheel_drive': pd_wheel_drive,
                                        'wheel': pd_wheel,
                                        'chassis_model': pd_chassis_model,

                                        'photo_name': file_name,
                                        'created_by': user_id

                                    });

                                });

                                $.ajax({
                                    url: url_importdate_upload_photo,
                                    type: 'POST',
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    data: JSON.stringify(citem_photo),
                                    success: function (data) {

                                        swal({
                                            title: "สำเร็จ!",
                                            text: "บันทึกสำเร็จ!",
                                            type: 'success',
                                            timer: 2000,
                                            showConfirmButton: false
                                        });

                                        toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {

                                            $.carmodel_list();

                                            $('#btn-upload_pic').addClass('d-none')

                                            $('.dropify-clear').trigger('click');

                                            $.carmodel_photo_details_main()

                                            await setTimeout(function () {

                                                $('.delete_item_photo').prop('disabled', false);

                                            }, 300);

                                        }, 2000);

                                    }
                                });

                            })

                        }

                    });

                }

                return false

            })

        }

    });

};

$.carmodel_photo_delete_main = async function (citem) {

    swal({
        title: "คุณแน่ใจหรือไม่",
        text: "คุณจะไม่สามารถเรียกข้อมูลนี้กลับมาได้",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-danger",
        confirmButtonText: "ใช่ ยืนยัน",
        closeOnConfirm: false
    },
        function () {

            let add_data = {
                'temp_id': $.uuid(),
                'model_id': citem['model_id'],
                'modelmix': citem['modelmix'],
                'photo_folder': citem['photo_folder'],
                'photo_url': citem['photo_url'],
                'photo_type': 'main',
                'photo_no': citem['photo_no'],
                'vehicle_model': citem['vehicle_model'],
                'model_change': citem['model_change'],
                'minor_change': citem['minor_change'],
                'body_type': citem['body_type'],
                'hign_stant': citem['hign_stant'],
                'street_name': citem['street_name'],
                'photo_name': citem['photo_name'],
                'created_by': user_id
            };

            var params = [];
            for (const i in add_data) {
                params.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            fetch(url_importdate_photo_delete, {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params.join("&"),
            }).then(data => {
                return data.json();
            }).then(data => {

                swal({
                    title: "สำเร็จ!",
                    text: "ทำรายการสำเร็จ",
                    type: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });

                toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {

                    $.carmodel_photo_details_main()

                    await setTimeout(function () {

                        $('.delete_item_photo').prop('disabled', false);

                    }, 300);

                }, 2000);

            })

        });

}

$.carmodel_photo_details_sub = async function () {

    $('#photo_1 , #photo_2 , #photo_3 , #photo_4').attr('src', 'assets/img/photos/1.jpg');
    $('#photo_mix_1 , #photo_mix_2 , #photo_mix_3 , #photo_mix_4').attr('src', 'assets/img/photos/1.jpg');
    $('#photo_slide_1 , #photo_slide_2 , #photo_slide_3 , #photo_slide_4').attr('src', 'assets/img/photos/1.jpg');
    $('#photo_slide_mix_1 , #photo_slide_mix_2 , #photo_slide_mix_3 , #photo_slide_mix_4').attr('src', 'assets/img/photos/1.jpg');

    let model_id = $('#frm_data').find('#model_id').html();

    fetch(url_importdate_carmodelmix_get + '?mode=' + 'photo_modelmix' + '&modelmix=' + model_id).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.length > 0) {

            var photo_folder = result.data[0]['photo_folder']
            let photo_url = url_image + photo_folder;
            let i = 1;

            $.each(result.data, function (key, val) {

                let data = JSON.stringify(val)

                let photo_id = val['photo_id'];
                let photo_name = val['photo_name'];

                $('#photo_' + i).attr('src', photo_url + '/' + photo_name);
                $('#photo_slide_' + i).attr({ src: photo_url + '/' + photo_name, 'data-id': photo_id });

                i++

            });

        }

    });

    fetch(url_importdate_carmodelmix_get + '?mode=' + 'photo_modelmix_sub' + '&modelmix=' + model_id).then(function (response) {
        return response.json();
    }).then(function (result) {

        let data_photo = [];

        if (result.length > 0) {

            let photo_url = url_image + model_id;

            let i = 1;

            $.each(result.data, function (key, val) {

                let data = JSON.stringify(val)
                let photo_id = val['photo_id'];
                let photo_name = val['photo_name'];

                $('#photo_mix_' + i).attr('src', photo_url + '/' + photo_name);
                $('#photo_slide_mix_' + i).attr({ src: photo_url + '/' + photo_name, 'data-id': photo_id });

                data_photo.push([
                    i,
                    "<div class='media'>" +
                    "<div class='card-aside-img'><img src='" + photo_url + '/' + photo_name + "' alt='img' class='h-60 w-60'></div>" +
                    "</div>",
                    val['photo_name'],
                    "<div class='d-flex flex-row justify-content-center'>" +
                    "<button onclick='$.carmodel_photo_delete_sub(" + data + ")' data-item='" + data + "' style='margin: .25rem .125rem; ' class='btn btn-outline-danger btn-sm delete_item_photo' data-action='delete' id='delete_item" + i + "' type='button'>Delete</button>" +
                    "</div>",
                ])

                i++

            });

            tbl_sub_photo = $('#tbl-photo').DataTable({
                "data": data_photo,
                "dom": 't',
                "bDestroy": true,
                "deferRender": true,
                "order": [[0, "desc"]],
                "ordering": false,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false,
                }],
            });

            tbl_sub_photo.columns.adjust();

            $('.delete_item_photo').prop('disabled', true);

        } else {

            tbl_sub_photo = $('#tbl-photo').DataTable({
                "data": data_photo,
                "dom": 't',
                "bDestroy": true,
                "deferRender": true,
                "order": [[0, "desc"]],
                "ordering": false,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false,
                }],
            });

            tbl_sub_photo.columns.adjust();

        }

    });

    return false;
};

$.carmodel_photo_upload_sub = function (citem) {

    let model_id = $('#frm_data').find('#model_id').html();

    fetch(url_importdate_carmodelmix_get + '?mode=' + 'photo_modelmix_sub' + '&modelmix=' + model_id).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.length >= '4') {

            swal({
                title: "ขออภัย",
                text: "คุณไม่สามารถอัพโหลดรูปภาพได้",
                type: 'error',
                timer: 2000,
                showConfirmButton: false
            });

            $('.dropify-clear').trigger('click');

            toastr.error('จำนวนภาพครบแล้ว!');

        } else {

            $('#btn-save_pic').removeClass('d-none')

            $('#frm_data').find('#btn-save_pic').off('click').on('click', function (evt) {

                evt.preventDefault();

                $(this).on('click', function (evt) {
                    evt.preventDefault();
                });

                var file_data = new FormData();
                var pic_file = $('#frm_data').find('#upload_photo_sub').get(0).files
                var citem_photo = [];

                if (pic_file.length > 0) {

                    file_data.append("postedFile", pic_file[0]);
                    file_data.append("pathname", $('#frm_data').find('#model_id').html());

                    $.ajax({
                        url: url_api + '/PictureUploads/UploadFile',
                        type: 'POST',
                        data: file_data,
                        contentType: false,
                        processData: false,
                        success: function (file_name) {

                            citem_photo.push({

                                'temp_id': $.uuid(),
                                'model_id': citem['model_id'],
                                'modelmix': citem['modelmix'],
                                'photo_folder': citem['model_id'],
                                'photo_url': citem['model_id'] + '/' + file_name,
                                'photo_type': 'sub',
                                'photo_no': '',
                                'vehicle_model': citem['vehicle_model'],
                                'minor_change': citem['minor_change'],
                                'body_type': citem['body_type'],
                                'hign_stant': citem['hign_stant'],
                                'street_name': citem['street_name'],
                                'photo_name': file_name,
                                'created_by': user_id

                            });


                            $.ajax({
                                url: url_importdate_upload_photo,
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                data: JSON.stringify(citem_photo),
                                success: function (data) {

                                    swal({
                                        title: "สำเร็จ!",
                                        text: "บันทึกสำเร็จ!",
                                        type: 'success',
                                        timer: 2000,
                                        showConfirmButton: false
                                    });

                                    toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {

                                        $.carmodel_list();

                                        $('#btn-save_pic').addClass('d-none')

                                        $('.dropify-clear').trigger('click');

                                        $.carmodel_photo_details_sub()

                                        await setTimeout(function () {

                                            $('.delete_item_photo').prop('disabled', false);

                                        }, 300);

                                    }, 2000);

                                }

                            });

                        }
                    });
                }

                return false

            })

        }

    });

    return false;
};

$.carmodel_photo_main_mix_delete = async function (citem) {

    swal({
        title: "คุณแน่ใจหรือไม่",
        text: "คุณจะไม่สามารถเรียกข้อมูลนี้กลับมาได้",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-danger",
        confirmButtonText: "ใช่ ยืนยัน",
        closeOnConfirm: false
    },
        function () {

            let add_data = {

                'temp_id': $.uuid(),
                'model_id': citem['model_id'],
                'modelmix': citem['modelmix'],
                'photo_folder': citem['photo_folder'],
                'photo_url': citem['photo_url'],
                'photo_type': 'main',
                'photo_no': citem['photo_no'],
                'vehicle_model': citem['vehicle_model'],
                'minor_change': citem['minor_change'],
                'body_type': citem['body_type'],
                'hign_stant': citem['hign_stant'],
                'street_name': citem['street_name'],
                'photo_name': citem['photo_name'],
                'created_by': user_id
            };

            var params = [];
            for (const i in add_data) {
                params.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            fetch(url_importdate_photo_delete_modelmix, {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params.join("&"),
            }).then(data => {
                return data.json();
            }).then(data => {

                swal({
                    title: "สำเร็จ!",
                    text: "ทำรายการสำเร็จ",
                    type: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });

                toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {

                    $.carmodel_photo_details_main()

                    await setTimeout(function () {

                        $('.delete_item_photo').prop('disabled', false);

                    }, 300);

                }, 2000);

            })

        });

}

$.carmodel_photo_delete_sub = async function (citem) {

    swal({
        title: "คุณแน่ใจหรือไม่",
        text: "คุณจะไม่สามารถเรียกข้อมูลนี้กลับมาได้",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-danger",
        confirmButtonText: "ใช่ ยืนยัน",
        closeOnConfirm: false
    },
        function () {

            let add_data = {

                'temp_id': $.uuid(),
                'model_id': citem['model_id'],
                'modelmix': citem['modelmix'],
                'photo_folder': citem['photo_folder'],
                'photo_url': citem['photo_url'],
                'photo_type': 'sub',
                'photo_no': citem['photo_no'],
                'vehicle_model': citem['vehicle_model'],
                'minor_change': citem['minor_change'],
                'body_type': citem['body_type'],
                'hign_stant': citem['hign_stant'],
                'street_name': citem['street_name'],
                'photo_name': citem['photo_name'],
                'created_by': user_id
            };

            var params = [];
            for (const i in add_data) {
                params.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            fetch(url_importdate_photo_delete_sub, {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params.join("&"),
            }).then(data => {
                return data.json();
            }).then(data => {

                swal({
                    title: "สำเร็จ!",
                    text: "ทำรายการสำเร็จ",
                    type: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });

                toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {

                    $.carmodel_photo_details_sub()

                    await setTimeout(function () {

                        $('.delete_item_photo').prop('disabled', false);

                    }, 300);

                }, 2000);

            })

        });

}

$.carmodel_import = async function () {

    $(document).on('change', '#customFile', function (evt) {

        evt.preventDefault();

        var path = $(this).val();
        var fileName = path.replace(/^.*\\/, "");
        $(this).next('.custom-file-label').html(fileName);

        if ($(this).val() !== '') {

            $("#import_vehicle_segments").prop('disabled', true);
            $("#customFile").prop('disabled', true);

            $(".modal-body").LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            let uuid = $.uuid();

            let i = 0;

            readXlsxFile(this.files[0], { dateFormat: 'YYYY/MM/DD_hh:mm:ss' }).then(async function (result) {

                let count_length = result.length - 2;

                if (result.length > 2) {

                    var citem_import = [];

                    fetch(url_importdate_carmodelmix_tmp + '?temp_id=' + uuid + '&countitem_all=' + count_length + '&created_by=' + user_id + '&mode=' + 'PENDING').then(function (response) {
                        return response.json();
                    }).then(function (result) {

                        if (result.status === 'Error') {

                            toastr.error(status.error_message);

                        } else {

                            //toastr.error('Q P BOY');

                        }

                    });

                    $.each(result, async function (key, val) {

                        if (i > 1) {

                            if (vehicle_segments == 'CAR') {

                                citem_import.push({
                                    mode: 'IMPORT',
                                    temp_id: uuid,
                                    model_id: $.trim(val[0]),
                                    modelmixed: $.trim(val[1]),
                                    vehicle_brand: $.trim(val[2]),
                                    vehicle_model: $.trim(val[3]),
                                    vehicle_segments: $.trim(val[4]),
                                    model_change: $.trim(val[5]),
                                    minor_change: $.trim(val[6]),
                                    fuel_type: $.trim(val[7]),
                                    engine_displacement: val[8],
                                    engine_code: $.trim(val[9]),
                                    transmission_type: $.trim(val[10]),
                                    body_type: $.trim(val[11]),
                                    hign_stant: $.trim(val[12]),
                                    wheel_drive: $.trim(val[13]),
                                    street_name: $.trim(val[14]),
                                    model_code: $.trim(val[15]),
                                    remarks: $.trim(val[16]),
                                    action: $.trim(val[17]),
                                    created_by: user_id,
                                    car_models: $.trim(val[3]) + ' ' + $.trim(val[6]) + ' ' + $.trim(val[11]) + ' ' + $.trim(val[12]) + ' ' + $.trim(val[14]),
                                    car_models_ref: $.trim(val[3]) + '$' + $.trim(val[6]) + '$' + $.trim(val[11]) + '$' + $.trim(val[12]) + '$' + $.trim(val[14]),

                                });

                            } else if (vehicle_segments == 'TRUCK') {

                                citem_import.push({
                                    mode: 'IMPORT',
                                    temp_id: uuid,
                                    model_id: $.trim(val[0]),
                                    modelmixed: $.trim(val[1]),
                                    item: $.trim(val[2]),
                                    vehicle_brand: $.trim(val[3]),
                                    vehicle_segments: $.trim(val[4]),
                                    vehicle_model: $.trim(val[5]),
                                    chassis: $.trim(val[6]),
                                    model_change: $.trim(val[7]),
                                    minor_change: $.trim(val[8]),
                                    fuel_type: $.trim(val[9]),
                                    engine_displacement: val[10],
                                    engine_code: $.trim(val[11]),
                                    transmission_type: $.trim(val[12]),
                                    horsepower: $.trim(val[13]),
                                    body_type: $.trim(val[14]),
                                    wheel: $.trim(val[15]),
                                    wheel_drive: $.trim(val[16]),
                                    street_name: $.trim(val[17]),
                                    chassis_model: $.trim(val[18]),
                                    chassis_code: $.trim(val[19]),
                                    remarks: $.trim(val[20]),
                                    action: $.trim(val[21]),
                                    created_by: user_id,
                                    car_models: (
                                        $.trim(val[5]) + ' ' +
                                        $.trim(val[7]) + ' ' +
                                        '(' + $.trim(val[18]) + ')' + ' ' +
                                        $.trim(val[14]) + ' ' +
                                        $.trim(val[15]) + ' ' +
                                        $.trim(val[16]) + ' ' +
                                        $.trim(val[17])
                                    ),
                                    car_models_ref: (
                                        $.trim(val[5]) + '$' +
                                        $.trim(val[7]) + '$' +
                                        '(' + $.trim(val[18]) + ')' + '$' +
                                        $.trim(val[14]) + '$' +
                                        $.trim(val[15]) + '$' +
                                        $.trim(val[16]) + '$' +
                                        $.trim(val[17])
                                    ),
                                });

                            }

                        }

                        i++

                    });

                    //console.log('citem_import', citem_import)

                    await $.ajax({
                        url: url_importdate_carmodelmix_tmptran,
                        type: 'POST',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify(citem_import),
                        success: function (data) {

                            if (data.status === 'Error') {

                                $(".modal-body").LoadingOverlay("hide", true);

                                toastr.error('Error, Please contact administrator.');

                            } else {

                                if (vehicle_segments == 'CAR') {

                                    $.camodel_verrify_car(uuid, user_id);

                                } else if (vehicle_segments == 'TRUCK') {

                                    $.camodel_verrify_truck(uuid, user_id);

                                }

                            }
                        }

                    });

                }

            });

        }

    });

};

$.camodel_verrify_car = function (uuid, user_id) {

    fetch(url_importdate_carmodelmix_verify_car + '?temp_id=' + uuid + '&updated_by=' + user_id).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error(status.error_message);

        } else {

            let i = 1;
            let wrong_information = 0;
            let success_information = 0;

            $.each(result.data, function (key, val) {

                let record_status = val['record_status'];

                if (record_status == '1') {
                    success_information += 1;
                } else {
                    wrong_information += 1;
                }

                i++;

            });

            $('#all_information').html(i - 1);
            $('#success_information').html(success_information).css("color", "darkgreen");
            $('#wrong_information').html(wrong_information).css("color", "red");

            table_carnodel_import = $('#tbl-carmodel_import').DataTable({
                data: result.data,
                dom: '<Bf<t>lip>',
                pageLength: 5,
                bDestroy: true,
                autoWidth: false,
                buttons: [
                    'copyHtml5',
                    {
                        extend: 'excelHtml5',
                        title: '',
                        filename: 'Export_Temp_Varify_Carmodel',
                        //exportOptions: {
                        //    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
                        //}
                    },
                ],
                lengthMenu: [
                    [5, 10, 25, 50, -1],
                    ['5', '10', '25', '50', 'Show all']
                ],
                columns: [
                    {
                        title: "action",
                        data: "action",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "status",
                        class: "text-center align-middle",
                        width: "353px",
                        render: function (data, type, row, meta) {

                            let status

                            if (row.code_status == 'OK') {
                                status = '<a class="badge badge-success" href="javascript:void(0)">สำเร็จ</a>'
                            } else {
                                status = '<a class="badge badge-danger" href="javascript:void(0)">ไม่สำเร็จ</a>'
                            }

                            return status;
                        }
                    }, //
                    {
                        title: "text status",
                        data: "text_status",
                        class: "text-center align-middle",
                        width: "353px",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "car models",
                        data: "car_models",
                        class: "text-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "model id",
                        data: "model_id",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "modelmixed",
                        data: "modelmixed",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "item",
                        data: "item",
                        class: "text-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "vehicle brand",
                        data: "vehicle_brand",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "vehicle model",
                        data: "vehicle_model",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "vehicle segments",
                        data: "vehicle_segments",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "model change",
                        data: "model_change",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "minor change",
                        data: "minor_change",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "fuel type",
                        data: "fuel_type",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "engine displacement",
                        data: "engine_displacement",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "engine code",
                        data: "engine_code",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "transmission type",
                        data: "transmission_type",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "body type",
                        data: "body_type",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "hign stant",
                        data: "hign_stant",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "wheel drive",
                        data: "wheel_drive",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "street name",
                        data: "street_name",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "model code",
                        data: "model_code",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "remarks",
                        data: "remarks",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "trans id",
                        data: "trans_id",
                        class: "text-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                ],
                rowCallback: function (row, data) {

                    let cs = data.code_status;
                    let ac = data.action;

                    if (cs == 'OK') {
                        $('td:eq(1)', row).parent().addClass('bg-success-transparent');
                    } else if (cs == 'EXCEL_DUP' || cs == 'DATA_DUP' || cs == 'ERORR_ACTION' || cs == 'DATA_DNF') {
                        $('td:eq(1)', row).parent().addClass('bg-danger-transparent');
                    } else if (cs == 'MODELMIX_DNF') {
                        $('td:eq(1)', row).parent().addClass('bg-warning-transparent');
                    } else {
                        ''
                    }

                    if (ac == 'CREATE') {
                        $('td:eq(0)', row).addClass('tx-success');
                    } else if (ac == 'UPDATE') {
                        $('td:eq(0)', row).addClass('tx-primary');
                    } else if (ac == 'DELETE') {
                        $('td:eq(0)', row).addClass('tx-danger');
                    } else {
                        $('td:eq(0)', row).addClass('tx-dark');
                    }

                },
                initComplete: function (settings, json) {

                    $('#btn_update-data').show();

                    $('.tbl-carmodel-import').removeClass('d-none');

                    $.carmodel_upload(uuid);

                    $(".modal-body").LoadingOverlay("hide", true);
                }
            });

        }

    });

};

$.camodel_verrify_truck = function (uuid, user_id) {

    fetch(url_importdate_carmodelmix_verify_truck + '?temp_id=' + uuid + '&updated_by=' + user_id).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error(status.error_message);

        } else {

            let i = 1;
            let wrong_information = 0;
            let success_information = 0;

            $.each(result.data, function (key, val) {

                let record_status = val['record_status'];

                if (record_status == '1') {
                    success_information += 1;
                } else {
                    wrong_information += 1;
                }

                i++;

            });

            $('#all_information').html(i - 1);
            $('#success_information').html(success_information).css("color", "darkgreen");
            $('#wrong_information').html(wrong_information).css("color", "red");

            table_carnodel_import = $('#tbl-carmodel_import').DataTable({
                data: result.data,
                dom: '<Bf<t>lip>',
                pageLength: 5,
                bDestroy: true,
                autoWidth: false,
                buttons: [
                    'copyHtml5',
                    {
                        extend: 'excelHtml5',
                        title: '',
                        filename: 'Export_Temp_Varify_Carmodel',
                        //exportOptions: {
                        //    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
                        //}
                    },
                ],
                lengthMenu: [
                    [5, 10, 25, 50, -1],
                    ['5', '10', '25', '50', 'Show all']
                ],
                columns: [
                    {
                        title: "action",
                        data: "action",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "status",
                        class: "text-center align-middle",
                        width: "353px",
                        render: function (data, type, row, meta) {

                            let status

                            if (row.code_status == 'OK') {
                                status = '<a class="badge badge-success" href="javascript:void(0)">สำเร็จ</a>'
                            } else {
                                status = '<a class="badge badge-danger" href="javascript:void(0)">ไม่สำเร็จ</a>'
                            }

                            return status;
                        }
                    }, //
                    {
                        title: "text status",
                        data: "text_status",
                        class: "",
                        width: "353px",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "model id",
                        data: "model_id",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "modelmixed",
                        data: "modelmixed",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "item",
                        data: "item",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "vehicle brand",
                        data: "vehicle_brand",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "vehicle segments",
                        data: "vehicle_segments",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "vehicle model",
                        data: "vehicle_model",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "chassis",
                        data: "chassis",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "model change",
                        data: "model_change",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "minor change",
                        data: "minor_change",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "fuel type",
                        data: "fuel_type",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "engine displacement",
                        data: "engine_displacement",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "engine code",
                        data: "engine_code",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "transmission type",
                        data: "transmission_type",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "horsepower",
                        data: "horsepower",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "body type",
                        data: "body_type",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "wheel",
                        data: "wheel",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "wheel drive",
                        data: "wheel_drive",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "street name",
                        data: "street_name",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "chassis model",
                        data: "chassis_model",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "chassis code",
                        data: "chassis_code",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "remarks",
                        data: "remarks",
                        class: "text-center align-middle",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                    {
                        title: "code_status",
                        data: "code_status",
                        class: "text-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //
                ],
                rowCallback: function (row, data) {

                    let cs = data.code_status;
                    let ac = data.action;

                    if (cs == 'OK') {
                        $('td:eq(1)', row).parent().addClass('bg-success-transparent');
                    } else if (cs == 'EXCEL_DUP' || cs == 'DATA_DUP' || cs == 'ERORR_ACTION' || cs == 'DATA_DNF') {
                        $('td:eq(1)', row).parent().addClass('bg-danger-transparent');
                    } else if (cs == 'MODELMIX_DNF') {
                        $('td:eq(1)', row).parent().addClass('bg-warning-transparent');
                    } else {
                        ''
                    }

                    if (ac == 'CREATE') {
                        $('td:eq(0)', row).addClass('tx-success');
                    } else if (ac == 'UPDATE') {
                        $('td:eq(0)', row).addClass('tx-primary');
                    } else if (ac == 'DELETE') {
                        $('td:eq(0)', row).addClass('tx-danger');
                    } else {
                        $('td:eq(0)', row).addClass('tx-dark');
                    }

                },
                initComplete: function (settings, json) {

                    $('#btn_update-data').show();

                    $('.tbl-carmodel-import').removeClass('d-none');

                    $.carmodel_upload(uuid);

                    $(".modal-body").LoadingOverlay("hide", true);
                }
            });

        }

    });

};

$.carmodel_upload = function (uuid) {

    $("#btn_update-data").on('click', function (e) {

        e.preventDefault();

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

                    fetch(url_importdate_carmodelmix_upload + '?temp_id=' + uuid + '&updated_by=' + user_id).then(function (response) {
                        return response.json();
                    }).then(function (result) {

                        if (result.status === 'Error') {

                            toastr.error('Oops! An Error Occurred');

                        } else {

                            $('#btn_update-data').prop('disabled', true);

                            swal("สำเร็จ!", "บันทึกสำเร็จ!", "success");

                            toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {

                                await $('#btn_update-data').addClass('d-none')

                                await $('.tbl-carmodel-import .col-sm-12').html('<button id="btn-finished" class="btn btn-outline-success btn-block" type="button">Finished</button>')

                                await $('#btn-finished').on('click', function (evt) {

                                    evt.preventDefault();

                                    location.reload();

                                });

                            }, 300);

                        }

                        $.LoadingOverlay("hide", true);

                    }).catch(error => {

                        $.LoadingOverlay("hide", true);

                        toastr.error('Error, Please contact administrator.');

                    });

                } else {

                    swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                }

            });

    });

    return false;

};

$.carmodel_list = async function () {

    $('#global_filter').focus();

    let val_vehicle_model = $('#frm_search').find('#search_vehicle_model').val() == '---select---' ? '' : $('#frm_search').find('#search_vehicle_model').val()

    let url = new URL(url_importdate_carmodelmix_get);

    url.search = new URLSearchParams({

        mode: 'carmodelmix',
        vehicle_brand: $('#frm_search').find('#search_vehicle_brand').val() != '' ? $('#frm_search').find('#search_vehicle_brand :selected').text() : '',
        vehicle_model: val_vehicle_model,
        vehicle_segments: $('#search_vehicle_segments').val(),

    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        tbl_carmodel_list = $('#tbl-carmodel_list').DataTable({
            data: result.data,
            dom: '<Bf<t>lip>',
            deferRender: true,
            ordering: true,
            pageLength: 10,
            bDestroy: true,
            lengthMenu: [
                [5, 10, 25, 50, -1],
                ['5', '10', '25', '50', 'Show all']
            ],
            buttons: [
                'copyHtml5',
                {
                    extend: 'excelHtml5',
                    title: '',
                    filename: 'CarModelMix_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                    exportOptions: {
                        columns: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
                    }
                },
            ],
            columns: [
                {
                    title: "<center>images</center>",
                    data: "images",
                    class: "tx-center wd-300",
                    render: function (data, type, row, meta) {

                        let str_img = '<div class="" style="width:100px !important ; height:80px !important;">';
                        str_img += '<div class="carousel slide" data-ride="carousel" id="carouselExample' + meta.row + '">';
                        str_img += '<div class="carousel-inner">';

                        if (row.check_photo > 0 && data != '') {

                            let img_arr = JSON.parse(data);
                            let i = 1;

                            $.each(img_arr.data, function (key, val) {
                                let photo_url = url_image + val['photo_folder'];
                                let photo_active = 'active'
                                if (i > 1) {

                                    photo_active = '';
                                }

                                str_img += '<div  class="carousel-item ' + photo_active + '">'
                                str_img += '<img alt="img" style="max-height:80px !important" class="d-block w-100" id="show_photo_' + i + '" src="' + photo_url + '/' + val['photo_name'] + '">'
                                str_img += '</div >'

                                i++
                            })

                        } else {

                            str_img += '<div class="carousel-item active"><img alt="img" style="max-height:80px !important" class="d-block w-100" id="show_photo_1" src="../../assets/img/no_images.png"></div>'

                        }

                        str_img += '</div>';
                        str_img += '<a class="carousel-control-prev" href="#carouselExample' + meta.row + '" role="button" data-slide="prev"><i class="fa fa-angle-left fs-30" aria-hidden="true"></i></a >';
                        str_img += '<a class="carousel-control-next" href="#carouselExample' + meta.row + '" role="button" data-slide="next"><i class="fa fa-angle-right fs-30" aria-hidden="true"></i></a >';

                        str_img += '</div></div>';

                        return str_img

                    }
                },//0
                {
                    title: "<center>vehicle model</center>",
                    data: "car_models",
                    class: "tx-center",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<p style="font-size:11px;">' + data + '</p>';
                    }
                },//1
                {
                    title: "<center>car model ref</center>",
                    data: "car_models_ref",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//2
                {
                    title: "<center>model id</center>",
                    data: "model_id",
                    class: "tx-center",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//3
                {
                    title: "<center>modelmix</center>",
                    data: "modelmix",
                    class: "tx-center",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//4
                {
                    title: "<center>vehicle brand</center>",
                    data: "vehicle_brand",
                    class: "tx-center",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//5
                {
                    title: "<center>Vehicle Segments</center>",
                    data: "vehicle_segments",
                    class: "tx-center",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + (data == null ? '' : data) + '</span>';
                    }
                },//6
                {
                    title: "<center>vehicle name</center>",
                    data: "vehicle_model",
                    class: "tx-center",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//7
                {
                    title: "<center> </center>",
                    data: "vehicle_model",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + '' + '</span>';
                    }
                },//8
                {
                    title: "<center>chassis</center>",
                    data: "chassis",
                    class: "tx-center",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + (data == null ? '' : data) + '</span>';
                    }
                },//9
                {
                    title: "<center>model change</center>",
                    data: "model_change",
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//10
                {
                    title: "<center>minor change</center>",
                    data: "minor_change",
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//11
                {
                    title: "<center>fuel type</center>",
                    data: "fuel_type",
                    class: "tx-center",
                    width: "40px",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//12
                {
                    title: "<center>engine displacement</center>",
                    data: "engine_displacement",
                    class: "tx-center",
                    width: "40px",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//13
                {
                    title: "<center>transmission type</center>",
                    data: "transmission_type",
                    class: "tx-center",
                    width: "40px",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//14
                {
                    title: "<center>body type</center>",
                    data: "body_type",
                    class: "tx-center",
                    width: "40px",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//15
                {
                    title: "<center>horsepower</center>",
                    data: "horsepower",
                    class: "tx-center",
                    width: "40px",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + (data == null ? '' : data) + '</span>';
                    }
                },//16
                {
                    title: "<center>hign stant</center>",
                    data: "hign_stant",
                    class: "tx-center",
                    width: "40px",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + (data == null ? '' : data) + '</span>';
                    }
                },//17
                {
                    title: "<center>engine code</center>",
                    data: "engine_code",
                    class: "tx-center",
                    width: "40px",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//18
                {
                    title: "<center>wheel drive</center>",
                    data: "wheel_drive",
                    class: "tx-center",
                    width: "40px",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//19
                {
                    title: "<center>wheel</center>",
                    data: "wheel",
                    class: "tx-center",
                    width: "40px",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + (data == null ? '' : data) + '</span>';
                    }
                },//20
                {
                    title: "<center>chassis code</center>",
                    data: "chassis_code",
                    class: "tx-center",
                    width: "40px",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + (data == null ? '' : data) + '</span>';
                    }
                },//21
                {
                    title: "<center>chassis model</center>",
                    data: "chassis_model",
                    class: "tx-center",
                    width: "40px",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + (data == null ? '' : data) + '</span>';
                    }
                },//22
                {
                    title: "<center>street name</center>",
                    data: "street_name",
                    class: "tx-center",
                    width: "40px",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + (data == null ? '' : data) + '</span>';
                    }
                },//23
                {
                    title: "<center>model code</center>",
                    data: "model_code",
                    class: "tx-center",
                    width: "40px",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + (data == null ? '' : data) + '</span>';
                    }
                },//25
                {
                    title: "<center>remarks</center>",
                    data: "remarks",
                    class: "tx-center",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//27
                {
                    title: "<center>record_status</center>",
                    data: "record_status",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//28
                {
                    title: "<center>created_by</center>",
                    data: "created_by",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//29
                {
                    title: "<center>created_datetime</center>",
                    data: "created_datetime",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '</span>';
                    }
                },//30
                {
                    title: "<center>updated_by</center>",
                    data: "updated_by",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//31
                {
                    title: "<center>updated_datetime</center>",
                    data: "updated_datetime",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '</span>';
                    }
                },//32
                {
                    title: "<center>check_photo</center>",
                    data: "check_photo",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//33
                {
                    title: "<center>code 5</center>",
                    data: "code_e",
                    class: "tx-center",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//34
            ],
            rowCallback: function (row, data) {

                //console.log('row', row)

            },
            createdRow: function (row, data, dataIndex) {

                //$(row).attr('data-column', dataIndex);
                //$(row).attr('id', 'filter_col' + dataIndex);

            },
            initComplete: async function (settings, json) {

                $.LoadingOverlay("hide", true);

                $.contextMenu({
                    selector: '#tbl-carmodel_list tbody tr',
                    callback: async function (key, options) {

                        let citem = tbl_carmodel_list.row(this).data();

                        if (key === 'view') {

                            await $.carmodel_details(citem);

                            await $.carmodel_photo_details_sub()

                            await $.carmodel_gallery_main(citem)

                        } else if (key === 'edit') {

                            await $.carmodel_details(citem)

                            await $.carmodel_update(citem);

                        } else if (key === 'delete') {

                            await $.carmodel_details(citem);

                            await $.carmodel_delete(citem);

                        } else {

                            $LogEventCreate('create', result['status'], JSON.stringify(citem))

                            alert('ERROR');

                        }

                    },
                    items: {
                        "view": { name: "View", icon: "fas fa-search" },
                        "edit": { name: "Edit", icon: "edit" },
                        "delete": { name: "Delete", icon: "delete" },
                    }
                });

                var api = this.api();

                $('.filterhead', api.table().header()).each(function (i) {
                    var column = api.column(i);
                    var select = $('<select><option value=""></option></select>')
                        .appendTo($(this).empty())
                        .on('change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );

                            column
                                .search(val ? '^' + val + '$' : '', true, false)
                                .draw();
                        });

                    column.data().unique().sort().each(function (d, j) {
                        select.append('<option value="' + d + '">' + d + '</option>');
                    });
                });

                $('#tbl-carmodel_list tbody').off('click').on('click', 'td.details-control .show-detail', function (evt) {

                    evt.preventDefault();

                    var tr = $(this).closest('tr');
                    var row = tbl_carmodel_list.row(tr);

                    if (row.child.isShown()) {

                        row.child.hide();
                        tr.removeClass('shown');

                    }
                    else {

                        $.carmodel_sub_list(row.child, $(this).attr('data-modelmix'), $(this).attr('data-minor_change'), $(this).attr('data-engine_displacement'));
                        $.carmodel_sub_list_v2(result.data);

                        tr.addClass('shown');
                    }
                });

            }
        });

    });

};

$.carmodel_details = async function (citem) {

    await $('#modal-frm_data').modal({
        keyboard: false,
        backdrop: 'static'
    });

    //console.log('citem', citem)

    photo_no = citem['car_models'];

    $('#frm_data').find('#model_id').html(citem['model_id']).prop('disabled', true);
    $('#frm_data').find('#model_name').html(citem['modelmix']).prop('disabled', true);

    $('#frm_data').find('.dropify').prop('disabled', true);
    $('#frm_data').find('.photo_1').prop('disabled', true);

    $('#frm_data').find('#btn-save_exit').hide();

    $('.delete_item_photo').prop('disabled', false);

    $('#frm_data').find('#detail_model_id').val(citem['model_id']).trigger('change').prop('disabled', true);
    $('#frm_data').find('#detail_modelmix').val(citem['modelmix']).trigger('change').prop('disabled', true);
    $('#frm_data').find('#detail_vehicle_brand').val(citem['vehicle_brand']).trigger('change').prop('disabled', true);
    $('#frm_data').find('#detail_vehicle_segments').val(citem['vehicle_segments']).trigger('change').prop('disabled', true);
    $('#frm_data').find('#detail_vehicle_model').val(citem['vehicle_model']).trigger('change').prop('disabled', true);
    $('#frm_data').find('#detail_chassis').val(citem['chassis']).prop('disabled', true);
    $('#frm_data').find('#detail_minor_start').val(citem['minor_start']).trigger('change').prop('disabled', true);
    $('#frm_data').find('#detail_minor_end').val(citem['minor_end']).trigger('change').prop('disabled', true);
    $('#frm_data').find('#detail_model_start').val(citem['model_start']).trigger('change').prop('disabled', true);
    $('#frm_data').find('#detail_model_end').val(citem['model_end']).trigger('change').prop('disabled', true);
    $('#frm_data').find('#detail_fuel_type').val(citem['fuel_type']).trigger('change').prop('disabled', true);
    $('#frm_data').find('#detail_engine_displacement').val(citem['engine_displacement']).trigger('change').prop('disabled', true);
    $('#frm_data').find('#detail_engine_code').val(citem['engine_code']).prop('disabled', true);
    $('#frm_data').find('#detail_transmission_type').val(citem['transmission_type']).trigger('change').prop('disabled', true);
    $('#frm_data').find('#detail_body_type').val(citem['body_type']).prop('disabled', true);
    $('#frm_data').find('#detail_horsepower').val(citem['horsepower']).prop('disabled', true);
    $('#frm_data').find('#detail_hign_stant').val(citem['hign_stant']).prop('disabled', true);
    $('#frm_data').find('#detail_wheel_drive').val(citem['wheel_drive']).trigger('change').prop('disabled', true);
    $('#frm_data').find('#detail_wheel').val(citem['wheel']).prop('disabled', true);
    $('#frm_data').find('#detail_chassis_model').val(citem['chassis_model']).prop('disabled', true);
    $('#frm_data').find('#detail_chassis_code').val(citem['chassis_code']).prop('disabled', true);
    $('#frm_data').find('#detail_transmission').val(citem['transmission']).prop('disabled', true);
    $('#frm_data').find('#detail_gross_vehicle_weight').val(citem['gross_vehicle_weight']).prop('disabled', true);
    $('#frm_data').find('#detail_street_name').val(citem['street_name']).prop('disabled', true);
    $('#frm_data').find('#detail_model_code').val(citem['model_code']).prop('disabled', true);
    $('#frm_data').find('#remarks').val(citem['remarks']).prop('disabled', true);

    return false;

};

$.carmodel_update = async function (citem) {

    setTimeout(function () {

        $('.delete_item_photo').prop('disabled', false);
        $('#frm_data').find('#btn-save_exit').show();
        $('#frm_data').find('input').prop("disabled", true);
        $('#frm_data').find('select').prop("disabled", true);
        $('#frm_data').find('textarea').prop("disabled", false);
        $('#frm_data').find('.dropify').prop('disabled', false);
        $('#frm_data').find('.photo_1').prop('disabled', true);

    }, 500)

    $('#upload_photo_sub').change(function (e) {

        e.preventDefault();

        if ($(this).val() != '') {

            $.carmodel_photo_upload_sub(citem);

        } else {

        }

    });

    $("#btn-save_exit").on('click', function (e) {

        e.preventDefault();

        $('#frm_data').parsley().validate();

        if ($('#frm_data').parsley().isValid()) {

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
            }, function (isConfirm) {

                if (isConfirm) {

                    let val_model_id = $('#frm_data').find('#detail_model_id').val();
                    let val_vehicle_brand = $('#frm_data').find('#detail_vehicle_brand').val();
                    let val_modelmix = $('#frm_data').find('#detail_modelmix').val();
                    let val_vehicle_segments = $('#frm_data').find('#detail_vehicle_segments').val();
                    let val_vehicle_model = $('#frm_data').find('#detail_vehicle_model').val();
                    let val_chassis = $('#frm_data').find('#detail_chassis').val();
                    let val_model_start = $('#frm_data').find('#detail_model_start').val();
                    let val_model_end = $('#frm_data').find('#detail_model_end').val();
                    let val_minor_start = $('#frm_data').find('#detail_minor_start').val();
                    let val_minor_end = $('#frm_data').find('#detail_minor_end').val();
                    let val_fuel_type = $('#frm_data').find('#detail_fuel_type').val();
                    let val_engine_displacement = $('#frm_data').find('#detail_engine_displacement').val();
                    let val_engine_code = $('#frm_data').find('#detail_engine_code').val();
                    let val_transmission_type = $('#frm_data').find('#detail_transmission_type').val();
                    let val_body_type = $('#frm_data').find('#detail_body_type').val();
                    let val_horsepower = $('#frm_data').find('#detail_horsepower').val();
                    let val_hign_stant = $('#frm_data').find('#detail_hign_stant').val();
                    let val_wheel_drive = $('#frm_data').find('#detail_wheel_drive').val();
                    let val_wheel = $('#frm_data').find('#detail_wheel').val();

                    let val_chassis_model = $('#frm_data').find('#detail_chassis_model').val();
                    let val_chassis_code = $('#frm_data').find('#detail_chassis_code').val();
                    let val_transmission = $('#frm_data').find('#detail_transmission').val();
                    let val_gross_vehicle_weight = $('#frm_data').find('#detail_gross_vehicle_weight').val();
                    let val_street_name = $('#frm_data').find('#detail_street_name').val();
                    let val_model_code = $('#frm_data').find('#detail_model_code').val();
                    let remarks = $('#frm_data').find('#remarks').val();

                    let url_action = new URL(url_importdate_carmodelmix_action);

                    if (val_vehicle_segments != 'TRUCK') {

                        url_action.search = new URLSearchParams({

                            mode: 'UPDATE',
                            temp_id: $.uuid(),
                            model_id: citem['model_id'],
                            modelmixed: val_modelmix,
                            // cartype: val_cartype,
                            //vehicle_brand: val_vehicle_brand,
                            //vehicle_model: val_vehicle_model,
                            //vehicle_segments: val_vehicle_segments == '' ? 'CAR' : val_vehicle_segments,
                            vehicle_segments: val_vehicle_segments,
                            //minor_change: minor_change,
                            //model_change: model_change,
                            fuel_type: val_fuel_type == '' || val_fuel_type == null ? '' : val_fuel_type,
                            engine_displacement: val_engine_displacement == '' || val_engine_displacement == null ? '' : val_engine_displacement,
                            engine_code: val_engine_code == '' || val_engine_code == null ? '' : val_engine_code,
                            transmission_type: val_transmission_type == '' || val_transmission_type == null ? '' : val_transmission_type,
                            //body_type: val_body_type == '' || val_body_type == null ? '' : val_body_type,
                            //hign_stant: val_hign_stant == '' || val_hign_stant == null ? '' : val_hign_stant,
                            wheel_drive: val_wheel_drive == '' || val_wheel_drive == null ? '' : val_wheel_drive,
                            //street_name: val_street_name == '' || val_street_name == null ? '' : val_street_name,
                            model_code: val_model_code == '' || val_model_code == null ? '' : val_model_code,
                            remarks: remarks == '' || remarks == null ? '' : remarks,
                            created_by: user_id,
                            action: 'UPDATE',

                        });

                    } else if (val_vehicle_segments == 'TRUCK') {

                        url_action.search = new URLSearchParams({

                            mode: 'UPDATE',
                            temp_id: $.uuid(),
                            model_id: citem['model_id'],
                            //modelmixed: val_modelmix,
                            //cartype: val_cartype,
                            //vehicle_brand: val_vehicle_brand,
                            //vehicle_model: val_vehicle_model,
                            vehicle_segments: val_vehicle_segments,
                            //minor_change: minor_change,
                            //model_change: model_change,
                            //fuel_type: val_fuel_type == '' || val_fuel_type == null ? '' : val_fuel_type,
                            //engine_displacement: val_engine_displacement == '' || val_engine_displacement == null ? '' : val_engine_displacement,
                            //engine_code: val_engine_code == '' || val_engine_code == null ? '' : val_engine_code,
                            //transmission_type: val_transmission_type == '' || val_transmission_type == null ? '' : val_transmission_type,
                            //body_type: val_body_type == '' || val_body_type == null ? '' : val_body_type,
                            //hign_stant: val_hign_stant == '' || val_hign_stant == null ? '' : val_hign_stant,
                            //wheel_drive: val_wheel_drive == '' || val_wheel_drive == null ? '' : val_wheel_drive,
                            //street_name: val_street_name == '' || val_street_name == null ? '' : val_street_name,
                            //model_code: val_model_code == '' || val_model_code == null ? '' : val_model_code,
                            remarks: remarks == '' || remarks == null ? '' : remarks,

                            //chassis: val_chassis == '' || val_chassis == null ? '' : val_chassis,
                            //horsepower: val_horsepower == '' || val_horsepower == null ? '' : val_horsepower,
                            //wheel: val_wheel == '' || val_wheel == null ? '' : val_wheel,
                            //chassis_model: val_chassis_model == '' || val_chassis_model == null ? '' : val_chassis_model,
                            //chassis_code: val_chassis_code == '' || val_chassis_code == null ? '' : val_chassis_code,
                            //transmission: val_transmission == '' || val_transmission == null ? '' : val_transmission,
                            //gross_vehicle_weight: val_gross_vehicle_weight == '' || val_gross_vehicle_weight == null ? '' : val_gross_vehicle_weight,

                            created_by: user_id,
                            action: 'UPDATE',

                        });

                    } else {

                        alert('ERROR');

                    }

                    fetch(url_action).then(function (response) {
                        return response.json();
                    }).then(function (result) {

                        if (result.status === 'Error') {

                            toastr.error('Oops! An Error Occurred');

                        } else {

                            if ((result.data[0]['pMessage']) == 'DUPLICATE') {

                                toastr.error('ข้อมูลซ้ำ ไม่สามารถทำรายการได้')

                                swal("ขออภัย", "คุณไม่สามารถบันทึกรายการนี้ได้", "error");

                            } else {

                                swal({
                                    title: "สำเร็จ!",
                                    text: "ทำรายการสำเร็จ",
                                    type: 'success',
                                    timer: 2000,
                                    showConfirmButton: false
                                });

                                toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {

                                    $.carmodel_list();

                                    await setTimeout(function () {

                                        $('#modal-frm_data').modal('hide');

                                    }, 900);

                                }, 2000);

                            }
                        }

                    }).catch(error => {

                        toastr.error('Error, Please contact administrator.');

                    });

                } else {

                    swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                }

            });

        }
    });

}

$.carmodel_delete = async function (citem) {

    $('#frm_data').find('#btn-save_exit').show();
    $("#btn-save_exit").removeClass('btn-primary')
    $("#btn-save_exit").text('Delete').addClass('btn-danger')
    $('#frm_data').find('.dropify').prop('disabled', true);
    $('#frm_data').find('.photo_1').prop('disabled', true);

    $("#btn-save_exit").on('click', function (e) {

        e.preventDefault();

        swal({
            title: "คุณแน่ใจหรือไม่",
            text: "คุณจะไม่สามารถเรียกข้อมูลนี้กลับมาได้",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn btn-danger",
            confirmButtonText: "ใช่ ยืนยัน",
            closeOnConfirm: false
        },
            function () {

                let url_action = new URL(url_importdate_carmodelmix_action);

                url_action.search = new URLSearchParams({

                    mode: 'DELETE',
                    temp_id: $.uuid(),
                    model_id: citem['model_id'],
                    modelmixed: citem['modelmix'],
                    vehicle_brand: citem['vehicle_brand'],
                    vehicle_model: citem['vehicle_model'],
                    minor_change: citem['minor_change'],
                    model_change: citem['model_change'],
                    fuel_type: citem['fuel_type'],
                    engine_displacement: citem['engine_displacement'],
                    engine_code: citem['engine_code'],
                    transmission_type: citem['transmission_type'],
                    body_type: citem['body_type'],
                    hign_stant: citem['hign_stant'],
                    wheel_drive: citem['wheel_drive'],
                    street_name: citem['street_name'],
                    model_code: citem['model_code'],
                    remarks: citem['remarks'],
                    vehicle_segments: citem['vehicle_segments'],
                    chassis: citem['chassis'],
                    horsepower: citem['horsepower'],
                    wheel: citem['wheel'],
                    chassis_model: citem['chassis_model'],
                    chassis_code: citem['chassis_code'],
                    transmission: citem['transmission'],
                    gross_vehicle_weight: citem['gross_vehicle_weight'],
                    created_by: user_id,
                    action: 'DELETE',

                });

                fetch(url_action).then(function (response) {
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

                        toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {

                            $.carmodel_list();

                            $('#modal-frm_data').modal('hide');

                        }, 2000);

                    }

                }).catch(error => {

                    toastr.error('Error, Please contact administrator.');

                });



            });

    });

}

$.report = async function (citem) {

    await $('#modal-report').modal({
        keyboard: false,
        backdrop: 'static'
    });

    $('#frm_report').find('#report_vehicle_brand').off('select2:select').on('select2:select', function (evt) {

        evt.preventDefault();

        $(this).on('select2:select', function (evt) {
            evt.preventDefault();
        });

        $.model_get($(this).val());

    });

    $('#frm_report').find('#report_vehicle_model').off('select2:select').on('select2:select', function (evt) {

        evt.preventDefault();

        $(this).on('select2:select', function (evt) {
            evt.preventDefault();
        });

        $.minor_get($(this).val());

    });

    $('#btn-save-report').off('click').on('click', function (evt) {

        evt.preventDefault();

        $(this).on('click', function (evt) {
            evt.preventDefault();
        });

        let brand = $('#frm_search').find('#search_vehicle_brand').val() != '' ? $('#frm_search').find('#search_vehicle_brand :selected').text() : ''
        let model = $('#frm_report').find('#report_vehicle_model').val()
        let minor = $('#frm_report').find('#report_vehicle_minor').val()
        let engine = $('#frm_report').find('#report_engine_displacement').val()

        $('#url_report').attr('src', "http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_PIA_CarmodelMix&rs:Command=Render&vehicle_brand=" + brand + "&vehicle_model=" + model + "&minor_change=" + minor + "&engine_code=" + engine + "")

        return false;
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

            $("#search_vehicle_brand option").remove();
            $("#search_vehicle_brand").append("<option value=''>---select---</option>").attr("value", '')

            $("#p_vehicle_brand option").remove();
            $("#p_vehicle_brand").append("<option value=''>---select---</option>").attr("value", '')

            $("#report_vehicle_brand option").remove();
            $("#report_vehicle_brand").append("<option value=''>---select---</option>").attr("value", '')

            $("#photo_vehicle_brand option").remove();
            $("#photo_vehicle_brand").append("<option value=''>---select---</option>").attr("value", '')

            let brand_dataSet = [];

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

            $('#p_vehicle_brand').select2({
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

            $('#report_vehicle_brand').select2({
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

            $('#photo_vehicle_brand').select2({
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
        keywords_1: $('#search_vehicle_segments').val()
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $("#search_vehicle_model option").remove();
            $("#search_vehicle_model").append("<option value=''>---select---</option>").attr("value", '')

            $("#report_vehicle_model option").remove();
            $("#report_vehicle_model").append("<option value=''>---select---</option>").attr("value", '')

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

            $('#report_vehicle_model').select2({
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
            $("#search_vehicle_segments").append("<option value=''>---select---</option>").attr("value", '')

            $("#p_vehicle_segments option").remove();
            $("#p_vehicle_segments").append("<option value=''>---select---</option>").attr("value", '')

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

            $('#p_vehicle_segments').select2({
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

$.minor_get = function (model) {

    let url = new URL(url_carmodelmix_master_get);

    url.search = new URLSearchParams({
        mode: 'glb_vehicle_minor',
        keywords: model
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $("#search_vehicle_minor option").remove();

            $("#search_vehicle_minor").append("<option value=''>---select---</option>").attr("value", '')

            $("#report_vehicle_minor option").remove();

            $("#report_vehicle_minor").append("<option value=''>---select---</option>").attr("value", '')

            let minor_dataSet = [];

            $.each(result.data, function (key, val) {

                minor_dataSet.push({ id: val['minor_code'], text: val['minor_name'] });

            });

            $('#search_vehicle_minor').select2({
                width: '100%',
                height: '40px',
                data: minor_dataSet,
                templateResult: function (data) {
                    return data.text;
                },
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    });
                }
            });

            $('#report_vehicle_minor').select2({
                width: '100%',
                height: '40px',
                data: minor_dataSet,
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

    let url_EngineDisplacement = new URL(url_carmodelmix_master_get);
    let url_EngineCode = new URL(url_carmodelmix_master_get);
    let url_StreetName = new URL(url_carmodelmix_master_get);
    let url_Gcode = new URL(url_carmodelmix_master_get);
    let url_Brand = new URL(url_carmodelmix_master_get);
    let url_Model = new URL(url_carmodelmix_master_get);
    let url_Minor = new URL(url_carmodelmix_master_get);
    let url_CarType = new URL(url_carmodelmix_master_get);
    let url_FuelType = new URL(url_carmodelmix_master_get);
    let url_WheelDrive = new URL(url_carmodelmix_master_get);
    let url_TransmissionType = new URL(url_carmodelmix_master_get);

    /*EngineDisplacement*/
    url_EngineDisplacement.search = new URLSearchParams({
        mode: 'EngineDisplacement'
    });
    fetch(url_EngineDisplacement).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $("#detail_engine_displacement option").remove();
            $("#detail_engine_displacement").append("<option value=''>---select---</option>").attr("value", ' ')

            let engine_displacement_dataSet = [];

            $.each(result.data, function (key, val) {

                engine_displacement_dataSet.push({ id: val['lov_code'], text: val['lov1'] });

            });

            $('#detail_engine_displacement').select2({
                width: '100%',
                height: '40px',
                data: engine_displacement_dataSet,
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
    /*EngineDisplacement*/

    /*EngineCode*/
    //url_EngineCode.search = new URLSearchParams({
    //    mode: 'EngineCode',
    //});
    //fetch(url_EngineCode).then(function (response) {
    //    return response.json();
    //}).then(function (result) {

    //    if (result.status === 'Error') {

    //        toastr.error('Oops! An Error Occurred');

    //    } else {

    //        $("#search_engine_code option").remove();
    //        $("#search_engine_code").append("<option value=''>---select---</option>").attr("value", '')

    //        $("#engine_code option").remove();
    //        $("#engine_code").append("<option>---select---</option>").attr("value", '')

    //        let engine_code_dataSet = [];

    //        $.each(result.data, function (key, val) {

    //            engine_code_dataSet.push({ id: val['lov_code'], text: val['lov_code'] });

    //        });

    //        $('#search_engine_code').select2({
    //            width: '100%',
    //            height: '40px',
    //            data: engine_code_dataSet,
    //            templateResult: function (data) {
    //                return data.text;
    //            },
    //            sorter: function (data) {
    //                return data.sort(function (a, b) {
    //                    return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
    //                });
    //            }
    //        });

    //        $('#engine_code').select2({
    //            width: '100%',
    //            height: '40px',
    //            data: engine_code_dataSet,
    //            templateResult: function (data) {
    //                return data.text;
    //            },
    //            sorter: function (data) {
    //                return data.sort(function (a, b) {
    //                    return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
    //                });
    //            }
    //        });

    //    }

    //});
    /*EngineCode*/

    /*StreetName*/
    //url_StreetName.search = new URLSearchParams({
    //    mode: 'StreetName',
    //});
    //fetch(url_StreetName).then(function (response) {
    //    return response.json();
    //}).then(function (result) {

    //    if (result.status === 'Error') {

    //        toastr.error('Oops! An Error Occurred');

    //    } else {

    //        $("#search_street_name option").remove();
    //        $("#search_street_name").append("<option value=''>---select---</option>").attr("value", '')

    //        //$("#street_name option").remove();
    //        //$("#street_name").append("<option>---select---</option>").attr("value", '')

    //        let street_name_dataSet = [];

    //        $.each(result.data, function (key, val) {

    //            street_name_dataSet.push({ id: val['lov_code'], text: val['lov_code'] });

    //        });

    //        $('#search_street_name').select2({
    //            width: '100%',
    //            height: '40px',
    //            data: street_name_dataSet,
    //            templateResult: function (data) {
    //                return data.text;
    //            },
    //            sorter: function (data) {
    //                return data.sort(function (a, b) {
    //                    return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
    //                });
    //            }
    //        });

    //        //$('#street_name').select2({
    //        //    width: '100%',
    //        //    height: '40px',
    //        //    data: street_name_dataSet,
    //        //    templateResult: function (data) {
    //        //        return data.text;
    //        //    },
    //        //    sorter: function (data) {
    //        //        return data.sort(function (a, b) {
    //        //            return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
    //        //        });
    //        //    }
    //        //});

    //    }

    //});
    /*StreetName*/

    ///*Gcode*/
    //url_Gcode.search = new URLSearchParams({
    //    mode: 'gcode_a',
    //});
    //fetch(url_Gcode).then(function (response) {
    //    return response.json();
    //}).then(function (result) {

    //    if (result.status === 'Error') {

    //        toastr.error('Oops! An Error Occurred');

    //    } else {

    //        $("#gnamechr option").remove();

    //        $("#gnamechr").append("<option value=''>---select---</option>").attr("value", '')

    //        let gcode_dataSet = [];

    //        $.each(result.data, function (key, val) {

    //            gcode_dataSet.push({ id: val['codechr'], text: val['codechr'] });

    //        });

    //        $('#gnamechr').select2({
    //            width: '100%',
    //            height: '40px',
    //            data: gcode_dataSet,
    //            templateResult: function (data) {
    //                return data.text;
    //            },
    //            sorter: function (data) {
    //                return data.sort(function (a, b) {
    //                    return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
    //                });
    //            }
    //        });

    //    }

    //});
    ///*Gcode*/

    /*Brand*/
    //url_Brand.search = new URLSearchParams({
    //    mode: 'glb_vehicle_brand',
    //});
    //fetch(url_Brand).then(function (response) {
    //    return response.json();
    //}).then(function (result) {

    //    if (result.status === 'Error') {

    //        toastr.error('Oops! An Error Occurred');

    //    } else {

    //        $("#vehicle_brand option").remove();

    //        $("#vehicle_brand").append("<option value=''>---select---</option>").attr("value", '')

    //        let brand_dataSet = [];

    //        $.each(result.data, function (key, val) {

    //            brand_dataSet.push({ id: val['brand_name'], text: val['brand_name'] });

    //        });

    //        $('#vehicle_brand').select2({
    //            width: '100%',
    //            height: '40px',
    //            data: brand_dataSet,
    //            templateResult: function (data) {
    //                return data.text;
    //            },
    //            sorter: function (data) {
    //                return data.sort(function (a, b) {
    //                    return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
    //                });
    //            }
    //        });

    //    }

    //});
    /*Brand*/

    ///*Model*/
    //url_Model.search = new URLSearchParams({
    //    mode: 'glb_vehicle_model',
    //});
    //fetch(url_Model).then(function (response) {
    //    return response.json();
    //}).then(function (result) {

    //    if (result.status === 'Error') {

    //        toastr.error('Oops! An Error Occurred');

    //    } else {

    //        $("#vehicle_model option").remove();

    //        $("#vehicle_model").append("<option value=''>---select---</option>").attr("value", '')

    //        let model_dataSet = [];

    //        $.each(result.data, function (key, val) {

    //            model_dataSet.push({ id: val['model_code'], text: val['model_name'] });

    //        });

    //        $('#vehicle_model').select2({
    //            width: '100%',
    //            height: '40px',
    //            data: model_dataSet,
    //            templateResult: function (data) {
    //                return data.text;
    //            },
    //            sorter: function (data) {
    //                return data.sort(function (a, b) {
    //                    return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
    //                });
    //            }
    //        });

    //    }

    //});
    ///*Model*/

    ///*Minor*/
    //url_Minor.search = new URLSearchParams({
    //    mode: 'glb_vehicle_minor',
    //});
    //fetch(url_Minor).then(function (response) {
    //    return response.json();
    //}).then(function (result) {

    //    if (result.status === 'Error') {

    //        toastr.error('Oops! An Error Occurred');

    //    } else {

    //        //$("#minor_change option").remove();

    //        //$("#minor_change").append("<option>---select---</option>").attr("value", '')

    //        let model_dataSet = [];

    //        $.each(result.data, function (key, val) {

    //            model_dataSet.push({ id: val['minor_code'], text: val['minor_name'] });

    //        });

    //        //$('#minor_change').select2({
    //        //    width: '100%',
    //        //    height: '40px',
    //        //    data: model_dataSet,
    //        //    templateResult: function (data) {
    //        //        return data.text;
    //        //    },
    //        //    sorter: function (data) {
    //        //        return data.sort(function (a, b) {
    //        //            return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
    //        //        });
    //        //    }
    //        //});

    //    }

    //});
    ///*Model*/

    ///*CarType*/
    //url_CarType.search = new URLSearchParams({
    //    mode: 'CarType',
    //});
    //fetch(url_CarType).then(function (response) {
    //    return response.json();
    //}).then(function (result) {

    //    if (result.status === 'Error') {

    //        toastr.error('Oops! An Error Occurred');

    //    } else {

    //        $("#cartype option").remove();

    //        $("#cartype").append("<option value=''>---select---</option>").attr("value", '')

    //        let model_dataSet = [];

    //        $.each(result.data, function (key, val) {

    //            model_dataSet.push({ id: val['lov_code'], text: val['lov1'] });

    //        });

    //        $('#cartype').select2({
    //            width: '100%',
    //            height: '40px',
    //            data: model_dataSet,
    //            templateResult: function (data) {
    //                return data.text;
    //            },
    //            sorter: function (data) {
    //                return data.sort(function (a, b) {
    //                    return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
    //                });
    //            }
    //        });

    //    }

    //});
    ///*CarType*/

    ///*FuelType*/
    url_FuelType.search = new URLSearchParams({
        mode: 'FuelType',
    });
    fetch(url_FuelType).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            let fuel_dataSet = [];

            $.each(result.data, function (key, val) {

                fuel_dataSet.push({ id: val['lov_code'], text: val['lov_code'] });

            });

            $('#detail_fuel_type').select2({
                width: '100%',
                height: '40px',
                data: fuel_dataSet,
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
    ///*FuelType*/

    ///*WheelDrive*/
    url_WheelDrive.search = new URLSearchParams({
        mode: 'WheelDrive',
    });
    fetch(url_WheelDrive).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $("#detail_wheel_drive option").remove();

            $("#detail_wheel_drive").append("<option value=''>---select---</option>").attr("value", '')

            let model_dataSet = [];

            $.each(result.data, function (key, val) {

                model_dataSet.push({ id: val['lov_code'], text: val['lov1'] });

            });

            $('#detail_wheel_drive').select2({
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
    ///*WheelDrive*/

    ///*TransmissionType*/
    url_TransmissionType.search = new URLSearchParams({
        mode: 'TransmissionType',
    });
    fetch(url_TransmissionType).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $("#detail_transmission_type option").remove();

            $("#detail_transmission_type").append("<option value=''>---select---</option>").attr("value", '')

            let model_dataSet = [];

            $.each(result.data, function (key, val) {

                model_dataSet.push({ id: val['lov_code'], text: val['lov1'] });

            });

            $('#detail_transmission_type').select2({
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
    ///*TransmissionType*/

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

$.carmodelmix_select2 = function (mode) {

    let url_CarmodelMix = new URL(url_carmodelmix_master_get);

    url_CarmodelMix.search = new URLSearchParams({
        //mode: $('#p_vehicle_segments').val() == 'TRUCK' ? 'TruckModelMix' : 'CarModelMix',
        mode: mode,
        keywords: $('#search_vehicle_brand').val(),
    });

    fetch(url_CarmodelMix).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $("#p_carmodelmix option").remove();

            $("#p_carmodelmix").append("<option value=''>---select---</option>").attr("value", '')

            let photo_dataSet = [];

            $.each(result.data, function (key, val) {

                let ref_photo_main = val['ref_photo_main'];
                let val_ref_photo_main = ref_photo_main.replaceAll(/[.*+?^#${}()|[\]\\/]/g, ' ')
                let val_car_models = val['car_models'];

                var vehicle_model = val['vehicle_model'] == '' || val['vehicle_model'] == 'undefined' ? '' : val['vehicle_model']
                var minor_change = val['minor_change'] == '' || val['minor_change'] == 'undefined' ? '' : val['minor_change']
                var model_change = val['model_change'] == '' || val['model_change'] == 'undefined' ? '' : val['model_change']
                var body_type = val['body_type'] == '' || val['body_type'] == 'undefined' ? '' : val['body_type']
                var hign_stant = val['hign_stant'] == '' || val['hign_stant'] == 'undefined' ? '' : val['hign_stant']
                var wheel_drive = val['wheel_drive'] == '' || val['wheel_drive'] == 'undefined' ? '' : val['wheel_drive']
                var wheel = val['wheel'] == '' || val['wheel'] == 'undefined' ? '' : val['wheel']
                var chassis_model = val['chassis_model'] == '' || val['chassis_model'] == 'undefined' ? '' : val['chassis_model']
                var street_name = val['street_name'] == '' || val['street_namestreet_name'] == 'undefined' ? '' : val['street_name']

                let p_vehicle_segments = $('#p_vehicle_segments').val();

                if (p_vehicle_segments != 'TRUCK') {

                    photo_dataSet.push({
                        id: ref_photo_main,
                        text: val_car_models,
                        vehicle_model: vehicle_model,
                        minor_change: minor_change,
                        body_type: body_type,
                        hign_stant: hign_stant,
                        street_name: street_name
                    });

                } else if (p_vehicle_segments == 'TRUCK') {

                    photo_dataSet.push({
                        id: ref_photo_main,
                        text: val_car_models,
                        vehicle_model: vehicle_model,
                        model_change: model_change,
                        body_type: body_type,
                        wheel_drive: wheel_drive,
                        wheel: wheel,
                        street_name: street_name,
                        chassis_model: chassis_model
                    });

                }

                $('#p_carmodelmix').attr("data-vehicle_model", vehicle_model);
                $('#p_carmodelmix').attr("data-minor_change", minor_change);
                $('#p_carmodelmix').attr("data-model_change", model_change);
                $('#p_carmodelmix').attr("data-body_type", body_type);
                $('#p_carmodelmix').attr("data-hign_stant", hign_stant);
                $('#p_carmodelmix').attr("data-street_name", street_name);
                $('#p_carmodelmix').attr("data-wheel_drive", wheel_drive);
                $('#p_carmodelmix').attr("data-wheel", wheel);
                $('#p_carmodelmix').attr("data-chassis_model", chassis_model);

            });

            $('#p_carmodelmix').select2({
                width: '100%',
                height: '40px',
                data: photo_dataSet,
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

$.list_item = async function () {

    $(".tab-content").LoadingOverlay("show", {
        image: '',
        custom: customElement
    });

    let url = new URL(url_carmodelmix_item_list);
    //let url = new URL(url_importdate_carmodelmix_get);

    url.search = new URLSearchParams({
        mode: 'modelmix_item',
        modelmix: $('#model_name').html(),
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
                        title: "<span class='tx-left'>IMAGE</span>",
                        class: "text-left align-middle",
                        width: "10%",
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
                                    //console.log('photos', photo)
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


