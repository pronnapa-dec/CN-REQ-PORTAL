'use strict';
let fs = firebase.firestore();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const user_id = objProfile[0]['username'];
const url_api = "http://localhost:49705";
const url_job = "http://localhost:57916";
//const url_api = "http://192.168.1.247:8089";

const url_Packing_Item_Job = url_api + '/v1/Trp_Packing_Item_Job';
const url_Packing_Item_Update = url_api + '/v1/Trp_Packing_Item_Update';
const url_Packing_Item_Status = url_api + '/v1/Trp_Packing_Item_Status';
const url_Packing_Job_Detail = url_api + '/v1/Trp_Packing_Job_Detail';
const url_Packing_Box_Detail = url_api + '/v1/Trp_Packing_Box_Detail';
const url_Packing_Box_Update = url_api + '/v1/Trp_Packing_Box_Update';
const url_Trp_Packing_Share_Box_Create = url_api + '/v1/Trp_Packing_Share_Box_Create';
const url_Trp_Packing_Share_Box_Detail = url_api + '/v1/Trp_Packing_Share_Box_Detail';
const url_Trp_Packing_Share_Box_Delete = url_api + '/v1/Trp_Packing_Share_Box_Delete';
const url_Trp_Packing_Share_Box_Verify = url_api + '/v1/Trp_Packing_Share_Box_Verify';
const url_Trp_Packing_Detail = url_api + '/v1/Trp_Packing_Detail';
const url_Trp_Packing_Box_Check = url_api + '/v1/Trp_Packing_Box_Check';

let packing_box, packing_no, packing_temp, packing_trans, job_packing_ref, box_trans_id, checkbox;
let packing_verify;
let oTable = $('#tbl-list').DataTable({ "order": [[0, "asc"]], "pageLength": 100 });

const BR_v1_s = 'http://192.168.1.247/intranet/public/sound/BR_v1_s.mp3';
const BR_v2_s = 'http://192.168.1.247/intranet/public/sound/BR_v2_s.mp3';
const BR_v3_s = 'http://192.168.1.247/intranet/public/sound/BR_v3_s.mp3';

function toThaiDateString(date) {
    let monthNames = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
        "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
        "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    let dayNames = ["วันอาทิตย์ที่", "วันจันทร์ที่", "วันอังคารที่", "วันพุธที่", "วันพฤหัสบดีที่", "วันศุกร์ที่", "วันเสาร์ที่"];

    let year = date.getFullYear() + 543;
    let month = monthNames[date.getMonth()];
    let numOfDay = date.getDate();
    let dayth = dayNames[date.getDay()]

    let hour = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let second = date.getSeconds().toString().padStart(2, "0");

    return `${dayth} ${numOfDay} ${month} ${year} ` +
        `${hour}:${minutes}:${second} น.`;
}

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {


    } else {

        window.location.assign('./login');

    }

});

$(document).ready(async function () {

    var datetime = null,
        date = new Date();

    var update = function () {
        date = new Date();
        datetime.html(toThaiDateString(date));
    };
    datetime = $('.time-today')
    update();
    setInterval(update, 1000);

    await $.init();
    await $.Detail();
    await $.Update();
    await $.Packing_Share_Box_Verify();
    //await $.Packing_Share_Box_Verify();

});

$(document).keyup(function (e) {

    if (e.keyCode == 9) {
        $('#frm_job').find('#keywords').focus();
    } else if (e.keyCode == 113) {
        $('#frm_job').find('#job_detail_qty').val('').focus();
    }

});

$.init = async function () {

    $('#frm_remark').find('#job_no').off('select2:select').on('select2:select', function (evt) {

        evt.preventDefault();

        $(this).on('select2:select', function (evt) {
            evt.preventDefault();
        });

        $('#frm_remark').find('input').val('')
        $('#frm_remark').find('textarea').val('')
        $('#frm_remark').find('input[type="checkbox"]').prop('disabled', true)

        if ($(this).val() != '') {

            $.Packing_Comment_Detail($('#frm_remark').find('#job_no :selected').text());

            $('#frm_remark').find('#btn-save').removeClass('d-none')

        }

    });

    $('#btn-share_box').off('click').on('click', async function (evt) {

        evt.preventDefault();

        $(this).on('click', function (evt) {
            evt.preventDefault();
        });

        await $('#modal-frm_remark').modal({
            keyboard: false,
            backdrop: 'static'
        });

    });

    $('#btn-share_box').parent().addClass('d-none');

    $('#job_detail_qty').prop('disabled', false);

    $('#frm_job').find('#job_no').keyup(function () {
        this.value = this.value.toUpperCase().replace(' ', '').trim();
    });

    $('#btn-print').on('click', function (evt) {

        evt.preventDefault();

        //let url = 'http://192.168.1.159/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_TRP_PACKING_JOB&rs:Command=Render&packing_job_no=' + urlParams.get('job_no') + '&rs:Format=pdf';
        //let url = 'http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_TRP_PACKING_PRODUCT_COVER_SHEET&rs:Command=Render&packing_job_no=' + urlParams.get('job_no') + '&rs:Format=pdf';
        let url = 'http://192.168.1.247:8080/mpck/mod/step_5/print_pc.html?job_no=' + packing_no + '';

        window.open(url, '_blank');

    });

    $('#frm_job').find('#btn-main').on('click', function (e) {

        e.preventDefault();

        window.history.pushState({}, document.title, "/" + "trp/packing_item");

        location.reload();
    });

    $('#btn-packing-job').off('click').on('click', async function (e) {

        e.preventDefault();

        let url_packing_job = url_job + "/trp/packing_job"
        //let url_packing_job = url_job + "/trp/packing_job?packing_job_no=" + urlParams.get('job_no');

        console.log(url_packing_job)

        window.open(url_packing_job, "_self");


    });

    $('#btn-packing_box').on('click', async function (evt) {

        evt.preventDefault();

        $('#pck_qty , .size_box').removeClass('parsley-error');

        if (packing_verify == 0) {

            if ($('#pck_qty').val() > 0) {

                $('#keywords').prop('disabled', true);
                $('#job_detail_qty').prop('disabled', true);

                $.Box_Update();

            } else {

                toastr.error('กรุณากรอกข้อมูลกล่อง');
                $('#pck_qty , .size_box').addClass('parsley-error');

            }

        } else {

            swal({
                title: "พบจำนวนกล่องในระบบ !",
                text: "ต้องการการแก้ไขใช่หรือไม่",
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

                    if ($('#pck_qty').val() > 0) {

                        $.Box_Update();

                    } else {

                        toastr.error('กรุณากรอกข้อมูลกล่อง');
                        $('#pck_qty , .size_box').addClass('parsley-error');

                    }

                } else {

                    swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                }

            });

        }

    });

    $('#btn-delete_box').on('click', async function (evt) {

        evt.preventDefault();

        $.Box_Delete();

    });

    $('.size_box').on('change', function (e) {

        e.preventDefault();

        $('#pck_qty , .size_box').removeClass('parsley-error');

        var sum = 0;

        $('.size_box').each(function () {
            //console.log($(this).val())
            sum += Number($(this).val());
        });

        $('#frm_job').find('#pck_qty').val(sum)

    });

    $(".default-switches").on('click', function () {

        if ($(this).hasClass("on") == true) {
            $('.size_box').prop('disabled', false)
        } else {
            $('.size_box').prop('disabled', true)
        }

    })

    $('input[type="checkbox"]').click(function () {

        $('input[type="checkbox"]').not(this).prop("checked", false);

        $("input:checkbox:checked").each(function () {
            //alert($(this).attr('id'));
            //checkbox = $(this).attr('id')

            if ($(this).attr('id') == 'size_A') {
                checkbox = 'a'
            } else if ($(this).attr('id') == 'size_B') {
                checkbox = 'b'
            } else if ($(this).attr('id') == 'size_C') {
                checkbox = 'c'
            } else if ($(this).attr('id') == 'size_D') {
                checkbox = 'd'
            } else if ($(this).attr('id') == 'size_E') {
                checkbox = 'e'
            } else if ($(this).attr('id') == 'size_F') {
                checkbox = 'f'
            } else if ($(this).attr('id') == 'size_Z') {
                checkbox = 'z'
            } else {
                checkbox = 'NaN'
            }

        });

    });

    $('#frm_remark').find('#btn-delete').off('click').on('click', async function (e) {

        e.preventDefault();

        await $.Packing_Share_Box_Delete();

    });

    if (urlParams.get('job_no') != null) {

        $('#frm_job').find('#job_number').val(urlParams.get('job_no')).focus();

        //$("#global-loader").fadeIn("slow");

        fetch(url_Packing_Item_Job + '?job_no=' + urlParams.get('job_no') + '&created_by=' + user_id + '&temp_id=' + urlParams.get('temp_id')).then(function (response) {

            return response.json();

        }).then(function (result) {

            console.log('result', result.data)

            if (result.length > 0) {

                //var audio = new Audio(BR_v1_s); audio.volume = 1; audio.play();
                $('#frm_job').find('#job_number').prop('disabled', true);
                $('#frm_job').find('.hideny').removeClass('d-none');

                $('#user').val(user_id);
                $('#emmas_code').val(result.data[0]['emmas_code']);
                $('#emmas_name').val(result.data[0]['packing_delivery_name']);
                $('#transport_start').val(result.data[0]['emmas_sender_name']);
                $('#emmas_address').val(result.data[0]['packing_delivery_emlocation']);
                $('#job_date').val(moment(result.data[0]['packing_job_date']).format('DD/MM/YYYY'));

                let i = 1;
                let bg_row;
                let sum_qty_current = 0;
                let sum_qty_total = 0;

                oTable.destroy();

                $.each(result.data, function (key, val) {

                    let add_qty = val['job_item_qty'];
                    let cost_qty = val['job_item_trnqty'];

                    sum_qty_current += parseFloat(add_qty)
                    sum_qty_total += parseFloat(cost_qty)

                    if (add_qty == '0') {
                        bg_row = '#FFC0CB';
                    } else if (add_qty < cost_qty) {
                        bg_row = '#FFFFCC';
                    } else if (add_qty == cost_qty) {
                        bg_row = '#66FF99';
                    } else {
                        alert('Erorr');
                    }

                    $('#tbl-list').find('tbody').append('<tr style="background-color: ' + bg_row + ';">' +
                        '<td class="d-none">' + val['job_detail_id'] + '</td>' +
                        '<td style="text-align:center">' + i + '</td>' +
                        '<td style="text-align:center">' + val['job_item_barcode'] + '</td>' +
                        '<td style="text-align:center">' + val['job_item_name'] + '</td>' +
                        '<td style="text-align:center">' + val['job_item_spcodes'] + '</td>' +
                        '<td style="text-align:center">' + '<span style="color:blue;">' + add_qty + '</span >' + ' ' + '/' + ' ' + '<span style="color:green;">' + cost_qty + '</span >' + '</td>' +
                        '<td class="d-none" style="text-align:center">' + '' + '</td>' +
                        '<td style="text-align:center">' + val['job_item_unit'] + '</td>' +
                        '<td style="text-align:center">' + val['updated_by'] + '</td>' +
                        '</tr>'
                    )

                    i++

                });

                oTable = $('#tbl-list').DataTable({
                    "order": [[1, "asc"]],
                    "pageLength": 100,
                    "bDestroy": true,
                    "columnDefs": [{
                        "targets": [1, 6],
                        "width": "45px"
                    },
                    { "targets": [3], "width": "350px" },
                    { "targets": [5], "width": "90px" }]
                });

                $('#frm_job').find('#keywords').focus();
                $('#frm_job').find('#job_detail_qty').val('1');
                $('#sum_qty_current').html(sum_qty_current).css("color", "#F39C12");
                $('#sum_qty_total').html(sum_qty_total).css("color", "#138D75");
                $('#sum_qty_item').html(i - 1);

                if (sum_qty_current === sum_qty_total) {

                    swal({
                        title: "จำนวนสินค้าครบแล้ว!",
                        type: "success",
                        showConfirmButton: false,
                        timer: 800
                    })

                    $('#job_detail_qty').prop('disabled', true);
                    //$('#frm_job').find('#keywords').prop('disabled', true)
                    $('#frm_job').find('#pck_list').removeClass('d-none');

                    fetch(url_Packing_Item_Status + '?job_no=' + urlParams.get('job_no') + '&created_by=' + user_id + '&temp_id=' + urlParams.get('temp_id')).then(function (response) {
                        return response.json();
                    }).then(function (result) { });

                } else {

                    $('#frm_job').find('#pck_list').addClass('d-none');

                }

                //$("#global-loader").fadeOut("slow");

            } else {

                var audio = new Audio(BR_v2_s); audio.volume = 1; audio.play();
                //$("#global-loader").fadeOut("slow");
                toastr.error('ไม่พบข้อมูล')
                $('#frm_job').find('#job_number').val('');

            }
        });

    }

};

$.Detail = async function () {

    fetch(url_Trp_Packing_Detail + '?packing_job_no=' + urlParams.get('job_no')).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log('result', result.data)

        if (result.length > 0) {

            packing_no = ''
            packing_verify = ''
            packing_no = result.data[0]['packing_job_no']
            packing_temp = result.data[0]['temp_id']
            packing_trans = result.data[0]['trans_id']
            job_packing_ref = result.data[0]['job_packing_ref']

            $('#pck_qty').val(result.data[0]['packing_box_qty']);
            $('#size_A').val(result.data[0]['packing_box_a']);
            $('#size_B').val(result.data[0]['packing_box_b']);
            $('#size_C').val(result.data[0]['packing_box_c']);
            $('#size_D').val(result.data[0]['packing_box_d']);
            $('#size_E').val(result.data[0]['packing_box_e']);
            $('#size_F').val(result.data[0]['packing_box_f']);
            $('#size_Z').val(result.data[0]['packing_box_z']);

            if (result.data[0]['packing_status'] == 'SUCCESS') {

                packing_verify = 1

                $('#frm_job').find('.default-switches').removeClass('on');
                $('.size_box').prop('disabled', true)

            } else if (result.data[0]['packing_status'] == 'PENDING') {

                packing_verify = 0

            }

        } else {

            swal({
                title: "ขออภัย",
                text: "เกิดข้อผิดพลาด",
                type: 'error',
                timer: 2000,
                showConfirmButton: false
            });

            toastr.error('ไม่พบข้อมูลใบงาน');
        }

    });

};

$.Update = async function () {

    $('#frm_job').find('#keywords').focus().keyup(async function (e) {

        e.preventDefault();

        if ($(this).val().length >= 3) {

            if (e.keyCode == 13) {

                if ($(this).val() == 'RESETDATA000') {

                    window.history.pushState({}, document.title, "/" + "trp/packing_item?job_no=" + urlParams.get('job_no') + "&temp_id=" + urlParams.get('temp_id'));

                    location.reload();

                } else if ($(this).val().substring(0, 2) == 'PB') {

                    let sum_qty_current = $('#sum_qty_current').html();
                    let sum_qty_total = $('#sum_qty_total').html();

                    if (sum_qty_current != sum_qty_total) {

                        toastr.error('การตรววจสอบไม่สมบรูณ์')
                        $(this).val('');

                    } else {

                        let box_name

                        if ($(this).val() == 'PB01') {
                            box_name = 'A'
                        } else if ($(this).val() == 'PB02') {
                            box_name = 'B'
                        } else if ($(this).val() == 'PB03') {
                            box_name = 'C'
                        } else if ($(this).val() == 'PB04') {
                            box_name = 'D'
                        } else if ($(this).val() == 'PB05') {
                            box_name = 'E'
                        } else if ($(this).val() == 'PB06') {
                            box_name = 'F'
                        } else if ($(this).val() == 'PB07') {
                            box_name = 'Z'
                        }

                        toastr.success('กล่องประเภท ' + box_name)
                        packing_box = '';

                        $('#frm_job').find('#keywords').val('')

                        let sum_qty_current = 1

                        sum_qty_current += parseFloat($('#frm_job').find('#size_' + box_name).val())

                        $('#frm_job').find('#size_' + box_name).val(sum_qty_current).trigger('change');

                    }
                } else if ($(this).val() == 'UPDATEBOX000') {

                    $('#btn-packing_box').trigger('click');
                    $(this).val('');

                } else if ($(this).val() == 'LINKJOB000') {

                    $('#btn-packing-job').trigger('click');
                    $(this).val('');

                } else {

                    let keywords = $('#frm_job').find('#keywords').val();

                    keywords = $.trim(keywords)

                    //$('#frm_job').find('#keywords').prop('disabled', true);
                    //$('#frm_job').find('#job_detail_qty').prop('disabled', true)

                    let update_data = {
                        job_no: $('#frm_job').find('#job_number').val(),
                        keywords: keywords,
                        job_detail_qty: $('#frm_job').find('#job_detail_qty').val() > 1 ? $('#frm_job').find('#job_detail_qty').val() : 1,
                        temp_id: urlParams.get('temp_id'),
                        updated_by: user_id,
                    };

                    var params = [];
                    for (const i in update_data) {
                        params.push(i + "=" + encodeURIComponent(update_data[i]));
                    }

                    fetch(url_Packing_Item_Update, {
                        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                        // mode: 'no-cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        body: params.join("&"),
                    }).then(result => {
                        return result.json();
                    }).then(result => {
                        //console.log('data is', result.data);
                        if (result.status === 'Error') {

                            toastr.error(data.error_message);
                            //กรุณาลองใหม่อีกครั้ง
                            var audio = new Audio(BR_v2_s); audio.volume = 1; audio.play();

                        } else {

                            if ((result.data[0]['pMessage']) != null) {

                                toastr.error(result.data[0]['pMessage'])

                                if (result.data[0]['pMessage'] == 'จำนวนสินค้าครบแล้ว') {
                                    //จำนวนสินค้าครบแล้ว
                                    var audio = new Audio(BR_v3_s); audio.volume = 1; audio.play();

                                } else {
                                    //ไม่พบรายการสินค้า
                                    var audio = new Audio(BR_v2_s); audio.volume = 1; audio.play();

                                }

                            } else {

                                oTable.destroy();

                                var audio = new Audio(BR_v1_s); audio.volume = 1; audio.play();

                                $('#tbl-list tbody').empty();

                                toastr.success('Save Successfully!', async function (sum_qty_current) {
                                    //$("#global-loader").fadeIn("slow");
                                    let i = 1;
                                    let bg_row;
                                    let tr_row = "block";

                                    $.each(result.data, function (key, val) {

                                        let add_qty = val['job_item_qty'];
                                        let cost_qty = val['job_item_trnqty'];

                                        if (add_qty == '0') {
                                            bg_row = '#FFC0CB';
                                        } else if (add_qty < cost_qty) {
                                            bg_row = '#FFFFCC';
                                        } else if (add_qty == cost_qty) {
                                            bg_row = '#66FF99';
                                        } else {
                                            alert('Erorr');
                                        }

                                        $('#tbl-list').find('tbody').append('<tr style="background-color: ' + bg_row + ';">' +
                                            '<td class="d-none">' + val['job_detail_id'] + '</td>' +
                                            '<td style="text-align:center">' + i + '</td>' +
                                            '<td style="text-align:center">' + val['job_item_barcode'] + '</td>' +
                                            '<td style="text-align:center">' + val['job_item_name'] + '</td>' +
                                            '<td style="text-align:center">' + val['job_item_spcodes'] + '</td>' +
                                            '<td style="text-align:center">' + '<span style="color:blue;">' + add_qty + '</span >' + ' ' + '/' + ' ' + '<span style="color:green;">' + cost_qty + '</span >' + '</td>' +
                                            '<td class="d-none" style="text-align:center">' + '' + '</td>' +
                                            '<td style="text-align:center">' + val['job_item_unit'] + '</td>' +
                                            '<td style="text-align:center">' + val['updated_by'] + '</td>' +
                                            '</tr>'
                                        )

                                        i++

                                    });

                                });
                                oTable = $('#tbl-list').DataTable({ "order": [[1, "asc"]], "bDestroy": true, "pageLength": 100 });
                                $('#sum_qty_current').html(parseFloat($('#sum_qty_current').html()) + parseFloat($('#job_detail_qty').val()));

                                let sum_qty_current = $('#sum_qty_current').html();
                                let sum_qty_total = $('#sum_qty_total').html();

                                if (sum_qty_current == sum_qty_total) {

                                    //toastr.warning('จำนวนสินค้าครบแล้ว')
                                    //swal({
                                    //    title: 'จำนวนสินค้าครบแล้ว',
                                    //    type: 'warning',
                                    //    closeOnConfirm: false,
                                    //})

                                    swal({
                                        title: "จำนวนสินค้าครบแล้ว!",
                                        type: "success",
                                        showConfirmButton: false,
                                        timer: 800
                                    })

                                    //$('#frm_job').find('#keywords').prop('disabled', true)

                                    $('#frm_job').find('#pck_list').removeClass('d-none');

                                    fetch(url_Packing_Item_Status + '?job_no=' + urlParams.get('job_no') + '&created_by=' + user_id + '&temp_id=' + urlParams.get('temp_id')).then(function (response) {
                                        return response.json();
                                    }).then(function (result) { });

                                    $.Packing_Share_Box_Verify();
                                } else {

                                    $('#frm_job').find('#keywords').prop('disabled', false);
                                    $('#frm_job').find('#pck_list').addClass('d-none');

                                }

                            }

                            $('#frm_job').find('#keywords').prop('disabled', false);
                            $('#frm_job').find('#keywords').val("").focus();
                            $('#frm_job').find('#job_detail_qty').val('1');
                            //$("#global-loader").fadeOut("slow");

                        }

                    }).catch((error) => {
                        var audio = new Audio(BR_v2_s); audio.volume = 1; audio.play();
                        toastr.error(error, 'Error writing document');
                        $('#frm_job').find('#keywords').prop('disabled', false);
                        $('#frm_job').find('#keywords').val("").focus();
                        $('#frm_job').find('#job_detail_qty').val('1');

                    });

                }

                return false;
            }

        } else {

            if (e.keyCode == 13) {
                var audio = new Audio(BR_v2_s); audio.volume = 1; audio.play();
                toastr.error('ไม่พบข้อมูล')
                $('#frm_job').find('#keywords').val('');
                //$("#global-loader").fadeOut("slow");
            }

        }

    });

};


$.Box_Update = async function () {

    let pck_qty = $('#frm_job').find('#pck_qty').val();
    let size_a = $('#frm_job').find('#size_A').val();
    let size_b = $('#frm_job').find('#size_B').val();
    let size_c = $('#frm_job').find('#size_C').val();
    let size_d = $('#frm_job').find('#size_D').val();
    let size_e = $('#frm_job').find('#size_E').val();
    let size_f = $('#frm_job').find('#size_F').val();
    let size_z = $('#frm_job').find('#size_Z').val();

    let url = new URL(url_Packing_Box_Update);

    url.search = new URLSearchParams({
        packing_job_id: packing_trans,
        packing_job_no: urlParams.get('job_no'),
        packing_box_qty: pck_qty,
        packing_box_a: size_a,
        packing_box_b: size_b,
        packing_box_c: size_c,
        packing_box_d: size_d,
        packing_box_e: size_e,
        packing_box_f: size_f,
        packing_box_z: size_z,
        temp_id: urlParams.get('temp_id'),
        created_by: user_id
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        console.log(result.data)

        console.log(result.data[0]['pMessage'])

        if (result.data[0]['pMessage'] != null) {

            toastr.error(result.data[0]['pMessage']);

        } else {

            toastr.success('บรรจุกล่องสำเร็จ')
            swal({
                title: "สำเร็จ!",
                text: "ทำรายการสำเร็จ",
                type: "warning",
                showConfirmButton: false,
                timer: 1000
            })
            $('#frm_job').find('#pck_qty').val(result.data[0]['packing_box_qty']);
            $('#frm_job').find('#size_A').val(result.data[0]['packing_box_a']);
            $('#frm_job').find('#size_B').val(result.data[0]['packing_box_b']);
            $('#frm_job').find('#size_C').val(result.data[0]['packing_box_c']);
            $('#frm_job').find('#size_D').val(result.data[0]['packing_box_d']);
            $('#frm_job').find('#size_E').val(result.data[0]['packing_box_e']);
            $('#frm_job').find('#size_F').val(result.data[0]['packing_box_f']);
            $('#frm_job').find('#size_Z').val(result.data[0]['packing_box_z']);

            $('#frm_job').find('.default-switches').removeClass('on');
            //$('.size_box').prop('disabled', true)
            //$('#frm_job').find('#btn-add').removeClass('d-none');
            //$.Detail(result.data[0]['packing_job_no'])
            //$.Packing_Share_Box_Verify()
            $('#frm_job').find('.default-switches').removeClass('on');

            setTimeout(function () {

                location.reload();

            }, 100);
        }


    });

    return false;

};

$.Box_Delete = async function () {

    let pck_qty = 0 //$('#frm_job').find('#pck_qty').val();
    let size_a = 0 //$('#frm_job').find('#size_A').val();
    let size_b = 0 //$('#frm_job').find('#size_B').val();
    let size_c = 0 //$('#frm_job').find('#size_C').val();
    let size_d = 0 //$('#frm_job').find('#size_D').val();
    let size_e = 0 //$('#frm_job').find('#size_E').val();
    let size_f = 0 //$('#frm_job').find('#size_F').val();
    let size_z = 0 //$('#frm_job').find('#size_Z').val();

    let url = new URL(url_Packing_Box_Update);

    url.search = new URLSearchParams({
        packing_job_id: packing_trans,
        packing_job_no: urlParams.get('job_no'),
        packing_box_qty: pck_qty,
        packing_box_a: size_a,
        packing_box_b: size_b,
        packing_box_c: size_c,
        packing_box_d: size_d,
        packing_box_e: size_e,
        packing_box_f: size_f,
        packing_box_z: size_z,
        temp_id: urlParams.get('temp_id'),
        created_by: user_id
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        console.log(result.data)

        console.log(result.data[0]['pMessage'])

        if (result.data[0]['pMessage'] != null) {

            toastr.error(result.data[0]['pMessage']);

        } else {

            swal({
                title: "สำเร็จ!",
                text: "ทำรายการสำเร็จ",
                type: "warning",
                showConfirmButton: false,
                timer: 1000
            })

            $('#frm_job').find('#pck_qty').val(result.data[0]['packing_box_qty']);
            $('#frm_job').find('#size_A').val(result.data[0]['packing_box_a']);
            $('#frm_job').find('#size_B').val(result.data[0]['packing_box_b']);
            $('#frm_job').find('#size_C').val(result.data[0]['packing_box_c']);
            $('#frm_job').find('#size_D').val(result.data[0]['packing_box_d']);
            $('#frm_job').find('#size_E').val(result.data[0]['packing_box_e']);
            $('#frm_job').find('#size_F').val(result.data[0]['packing_box_f']);
            $('#frm_job').find('#size_Z').val(result.data[0]['packing_box_z']);

            $('#frm_job').find('.default-switches').removeClass('on');
            //$('.size_box').prop('disabled', true)
            //$('#frm_job').find('#btn-add').removeClass('d-none');
            $.Packing_Share_Box_Verify();
            $.Detail(result.data[0]['packing_job_no'])
            $('#frm_job').find('.default-switches').removeClass('on');


            setTimeout(function () {

                location.reload();

            }, 100);
        }

    });

};

$.Box_Check_Get = async function (citem) {

    let url = new URL(url_Trp_Packing_Box_Check);

    url.search = new URLSearchParams({
        //packing_job_date: moment($('#job_date').val()).format('YYYY-MM-DD'),
        packing_job_date: moment($('#job_date').val(), 'DD/MM/YYYY').format('YYYY-MM-DD'),
        emmas_code: $('#emmas_code').val(),
        packing_delivery_emlocation: $('#emmas_address').val(),

    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            //toastr.error('Oops! An Error Occurred');

        } else {

            let Master_dataSet = [];

            $('#frm_remark').find("#job_no option").remove();
            $('#frm_remark').find("#job_no").append("<option value=''>--SELECT--</option>").attr("value", '')

            $.each(result.data, function (key, val) {

                Master_dataSet.push({ id: val['packing_job_id'], text: val['packing_job_no'] });

                box_trans_id = val['box_trans_id']

            });

            $('#frm_remark').find('#job_no').select2({
                width: '100%',
                height: '40px',
                data: Master_dataSet,
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

}


$.Packing_Comment_Detail = async function (job_no) {

    fetch(url_Trp_Packing_Detail + '?packing_job_no=' + job_no).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log('result', result.data)

        if (result.length > 0) {

            $.each(result.data, function (key, val) {

                $('#frm_remark').find('#invcode').val(val['emmas_code']);
                $('#frm_remark').find('#invname').val(val['emmas_sender_name']);
                $('#frm_remark').find('#invaddress').val(val['packing_delivery_emlocation']);
                $('#frm_remark').find('#pck_qty').val(val['packing_box_qty']);

                val['packing_box_a'] <= 0 ? $('#frm_remark').find('#size_A').prop('disabled', true) : $('#frm_remark').find('#size_A').prop('disabled', false);
                val['packing_box_b'] <= 0 ? $('#frm_remark').find('#size_B').prop('disabled', true) : $('#frm_remark').find('#size_B').prop('disabled', false);
                val['packing_box_c'] <= 0 ? $('#frm_remark').find('#size_C').prop('disabled', true) : $('#frm_remark').find('#size_C').prop('disabled', false);
                val['packing_box_d'] <= 0 ? $('#frm_remark').find('#size_D').prop('disabled', true) : $('#frm_remark').find('#size_D').prop('disabled', false);
                val['packing_box_e'] <= 0 ? $('#frm_remark').find('#size_E').prop('disabled', true) : $('#frm_remark').find('#size_E').prop('disabled', false);
                val['packing_box_f'] <= 0 ? $('#frm_remark').find('#size_F').prop('disabled', true) : $('#frm_remark').find('#size_F').prop('disabled', false);
                val['packing_box_z'] <= 0 ? $('#frm_remark').find('#size_Z').prop('disabled', true) : $('#frm_remark').find('#size_Z').prop('disabled', false);
            });

        } else {

            swal({
                title: "ขออภัย",
                text: "เกิดข้อผิดพลาด",
                type: 'error',
                timer: 2000,
                showConfirmButton: false
            });

            toastr.error('ไม่พบข้อมูลใบงาน');
        }

    });

};

$.Packing_Share_Box_Verify = async function () {

    let url = new URL(url_Trp_Packing_Share_Box_Verify);

    url.search = new URLSearchParams({
        packing_job_no: urlParams.get('job_no')
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log('result', result.data)

        if (result.data[0]['pMessage'] == 'กล่องถูกบรรจุแล้ว') {

            toastr.warning(result.data[0]['pMessage']);

            $('#btn-share_box').prop('disabled', true)
            $('#keywords').prop('disabled', true)

        } else if (result.data[0]['pMessage'] == 'กล่องถูกใช้ร่วมแล้ว') {

            toastr.warning(result.data[0]['pMessage']);

            $('#btn-packing_box').prop('disabled', true)
            $('#btn-delete_box').prop('disabled', true)
            $('#keywords').prop('disabled', true)
            $('#btn-packing_box').parent().addClass('d-none')
            $('#btn-delete_box').parent().addClass('d-none')
            $('#btn-share_box').parent().removeClass('d-none')

            $.Packing_Share_Box_Detail(urlParams.get('job_no'))

        } else if (result.data[0]['pMessage'] == 'ไม่พบการบรรจุ') {

            $('#btn-share_box').parent().removeClass('d-none')
            $('#btn-delete_box').parent().addClass('d-none')
            $('#keywords').prop('disabled', false)

            setTimeout(async function () {

                await $.Box_Check_Get();

            }, 300);

            $.Packing_Share_Box_Create()

        } else {

            toastr.warning(result.data[0]['pMessage']);

        }


    });

};

$.Packing_Share_Box_Create = async function () {

    $('#frm_remark').find('#btn-save').off('click').on('click', async function (e) {

        e.preventDefault();

        var numChecked = $("input:checkbox:checked").length;

        if (numChecked > 0) {

            let url = new URL(url_Trp_Packing_Share_Box_Create);

            url.search = new URLSearchParams({
                packing_job_id: packing_trans,
                packing_job_no: urlParams.get('job_no'),
                packing_share_job_id: $('#frm_remark').find('#job_no').val(),
                packing_share_job_no: $('#frm_remark').find('#job_no :selected').text(),
                packing_share_box_id: box_trans_id,
                packing_share_box_name: checkbox,
                packing_share_box_qty: $('#frm_remark').find('#pck_qty').val(),
                temp_id: packing_temp,
                created_by: user_id,
                packing_share_desrcipt: $('#frm_remark').find('#remark').val(),
            });

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {

                console.log('result', result.data)

                if (result.length > 0) {

                    swal({
                        title: "สำเร็จ!",
                        text: "ทำรายการสำเร็จ",
                        type: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    });

                    $('#modal-frm_remark').modal('hide');

                    toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {
                        //table_bill.destroy();
                        await location.reload();
                        //$.Packing_List();
                        //$.Detail();

                    }, 1000);

                } else {

                    swal({
                        title: "ขออภัย",
                        text: "เกิดข้อผิดพลาด",
                        type: 'error',
                        timer: 2000,
                        showConfirmButton: false
                    });

                    toastr.error('ไม่พบข้อมูลใบงาน');
                }

            });

        } else {

        }

    });

};

$.Packing_Share_Box_Detail = async function (citem) {

    $('#frm_remark').find('input').prop('disabled', true);
    $('#frm_remark').find('textarea').prop('disabled', true);
    $('#frm_remark').find('select').prop('disabled', true);
    $('#frm_remark').find('#btn-delete').removeClass('d-none')
    $('#box_job_no').html(urlParams.get('job_no'))

    let url = new URL(url_Trp_Packing_Share_Box_Detail);

    url.search = new URLSearchParams({
        packing_job_no: urlParams.get('job_no'),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log('result', result.data)

        if (result.length > 0) {

            $.each(result.data, async function (key, val) {


                $('#frm_remark').find('#invcode').val(val['emmas_code'])
                $('#frm_remark').find('#invname').val(val['emmas_sender_name'])
                $('#frm_remark').find('#invaddress').val(val['packing_delivery_emlocation'])
                $('#frm_remark').find('#pck_qty').val(val['packing_share_box_qty']);

                $('#frm_remark').find('#size_' + val['packing_share_box_name'].toUpperCase()).attr('checked', true);

                $('#frm_remark').find('#remark').val(val['packing_share_desrcipt']);

                await setTimeout(function () {

                    $('#frm_remark').find("#job_no option").remove();
                    $('#frm_remark').find("#job_no").append("<option value='" + val['packing_share_job_id'] + "' selected>" + val['packing_share_job_no'] + "</option>")

                }, 100);
            });

        } else {

            swal({
                title: "ขออภัย",
                text: "เกิดข้อผิดพลาด",
                type: 'error',
                timer: 2000,
                showConfirmButton: false
            });

            toastr.error('ไม่พบข้อมูลใบงาน');
        }

    });

};

$.Packing_Share_Box_Delete = async function () {

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

            let data_update = {
                packing_job_no: $('#box_job_no').html(),
                updated_by: user_id,
            };

            var params = [];
            for (const i in data_update) {
                params.push(i + "=" + encodeURIComponent(data_update[i]));
            }

            fetch(url_Trp_Packing_Share_Box_Delete, {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params.join("&"),
            }).then(data => {
                return data.json();
            }).then(result => {
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
                    $('#modal-frm_remark').modal('hide');

                    toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {

                        await location.reload();

                    }, 1000);

                }

            }).catch(error => {

                toastr.error('Error, Please contact administrator.');

            });

        } else {

            swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

        }

    });

};