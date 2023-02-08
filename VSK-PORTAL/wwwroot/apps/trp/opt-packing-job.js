'use strict';
let fs = firebase.firestore();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const user_id = objProfile[0]['username'];
const url_api = "http://localhost:49705";
let url_trp = 'http://localhost:57916/'
//const url_api = "http://192.168.1.247:8089";

const url_Packing_Box_Detail = url_api + '/v1/Trp_Packing_Box_Detail';
const url_Packing_Box_Update = url_api + '/v1/Trp_Packing_Box_Update';
const url_Packing_Invoice = url_api + '/v1/Trp_Packing_Invoice';
const url_Packing_Check_Drop = url_api + '/v1/Trp_Packing_Check_Drop';
const url_Packing_Check_Address = url_api + '/v1/Trp_Packing_Check_Address';
const url_Packing_Job = url_api + '/v1/Trp_Packing_Job';
const url_Packing_Job_Detail = url_api + '/v1/Trp_Packing_Job_Detail';
const url_Packing_Invoice_List = url_api + '/v1/Trp_Packing_Invoice_List';
const url_Packing_Invoice_Create = url_api + '/v1/Trp_Packing_Invoice_Create';
const url_Packing_Invoice_Delete = url_api + '/v1/Trp_Packing_Invoice_Delete';
const url_Packing_Master = url_api + '/v1/Trp_Packing_Master';

const url_Packing_Remark_Create = url_api + '/v1/Trp_Packing_Remark_Create';
const url_Packing_Remark_Delete = url_api + '/v1/Trp_Packing_Remark_Delete';
const url_Packing_Remark_List = url_api + '/v1/Trp_Packing_Remark_List';

let table_inv, table_check;
let packing_box, packing_no, packing_temp, packing_trans, job_packing_ref, packing_transport_start;
let citem_detail;
let temp_id = $.uuid();

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

$.init = async function () {

    if (urlParams.get('packing_job_no') === null) {

        $('#modal-frm_chk').modal({
            keyboard: false,
            backdrop: 'static'
        });

        $('#chk_number').focus()

    } else {

        $('#keywords').focus()

        $.Master_Get();

        setTimeout(function () {

            $.Box_Detail(urlParams.get('packing_job_no'));
            $.Invoice_List(urlParams.get('packing_job_no'))
            $.Packing_Job_Detail(urlParams.get('packing_job_no'));

        }, 100);

    }

    $('#frm_job').find('#shipping_company').off('select2:select').on('select2:select', function (evt) {

        evt.preventDefault();

        $(this).on('select2:select', function (evt) {
            evt.preventDefault();
        });

        if ($('#pck_number').val() != '') {

            if ($(this).val() != '') {

                $.Shipping_Company_Update();

            }

        } else {

            toastr.error('ไม่พบข้อมูลใบงาน');

        }

    });

    $('#frm_job').find('#freight').off('select2:select').on('select2:select', function (evt) {

        evt.preventDefault();

        $(this).on('select2:select', function (evt) {
            evt.preventDefault();
        });

        if ($('#pck_number').val() != '') {

            if ($(this).val() != '') {

                $.Delivery_Cost_Update();

            }

        } else {

            toastr.error('ไม่พบข้อมูลใบงาน');

        }

    });

    $('#chk_jobdate').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        },
    });

    $(".default-switches").on('click', function () {

        if ($(this).hasClass("on") == true) {
            $('.size_box').prop('disabled', false)
        } else {
            $('.size_box').prop('disabled', true)
        }

    })

    $('#btn-modal-check').on('click', async function (evt) {

        evt.preventDefault();

        $('#modal-frm_chk').modal({
            keyboard: false,
            backdrop: 'static'
        });

    });

    $('#modal-frm_chk').off('shown.bs.modal').on('shown.bs.modal', async function (e) {

        e.preventDefault();

        $('#chk_number').focus()

    });

    $('#btn-packing-box').on('click', async function (evt) {

        evt.preventDefault();

        $('#pck_qty , .size_box').removeClass('parsley-error');

        if ($('#pck_qty').val() > 0) {

            $.Box_Update();

        } else {

            toastr.error('กรุณากรอกข้อมูลกล่อง');
            $('#pck_qty , .size_box').addClass('parsley-error');

        }

    });

    $('#chk_number').keyup(async function (e) {

        e.preventDefault();

        this.value = this.value.toUpperCase().replace(' ', '').trim();

        if (e.keyCode == 13) {

            $.LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            if ($('#chk_number').val().substring(0, 2) == 'IV') {

                window.history.pushState({}, document.title, "/" + "trp/packing_job");

                $.Check_Drop();

            } else {

                window.history.pushState({}, document.title, "/" + "trp/packing_job");

                $('#modal-frm_chk').modal('hide');

                window.location.assign(window.location.href + '?packing_job_no=' + $('#chk_number').val() + '&packing_transport_start=' + packing_transport_start)

            }

        }

    });

    $('#btn-chk').on('click', function () {

        if ($('#chk_number').val().substring(0, 2) == 'IV') {

            window.history.pushState({}, document.title, "/" + "trp/packing_job");

            $.LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            $.Check_Drop();

        } else {

            window.history.pushState({}, document.title, "/" + "trp/packing_job");

            $.LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            $('#modal-frm_chk').modal('hide');

            window.location.assign(window.location.href + '?packing_job_no=' + $('#chk_number').val() + '&packing_transport_start=' + packing_transport_start)

        }

    });

    $('#frm_job').find('#btn-main').on('click', function (e) {

        e.preventDefault();

        window.history.pushState({}, document.title, "/" + "trp/packing_job");

        location.reload();
    });

    $('#frm_job').find('#keywords').keyup(async function (e) {

        e.preventDefault();

        $('#keywords').removeClass('parsley-error');

        this.value = this.value.toUpperCase().replace(' ', '').trim();

        if (e.keyCode == 13) {

            if ($('#pck_number').val() != '') {

                $.LoadingOverlay("show", {
                    image: '',
                    custom: customElement
                });

                $.Invoice_Get(packing_temp);

            } else {

                $('#frm_job').find('#keywords').val('')

                toastr.warning('กรุณาตรวจสอบเลขที่อ้างอิง');

                setTimeout(function () {

                    $('#modal-frm_chk').modal({
                        keyboard: false,
                        backdrop: 'static'
                    });

                    $('#chk_number').focus()

                }, 300);

            }

        }

    });

    $('.size_box').on('change', function (e) {

        e.preventDefault();

        $('#pck_qty , .size_box').removeClass('parsley-error');

        var sum = 0;

        $('.size_box').each(function () {
            sum += Number($(this).val());
        });

        $('#frm_job').find('#pck_qty').val(sum)

    });

    $('#frm_job').find('#btn-add').on('click', function () {

        $('#frm_job').parsley().validate();

        if ($('#frm_job').parsley().isValid()) {

            $.Packing_Success();

        } else {

            toastr.warning('โปรดใส่ข้อมูลไม่ครบก่อนบันทึก');
        }

    });

    $('#frm_job').find('#btn-edit').on('click', function () {

        $.Packing_Update();

    });

    $('#btn-packing-check').on('click', function () {

        let url_packing = url_trp + "trp/packing_item" + '?job_no=' + $('#pck_number').val() + '&temp_id=' + packing_temp + '&created_by' + user_id;

        //console.log(url_packing)

        window.open(url_packing, '_blank');
    });

    $('#btn-print').on('click', function (evt) {

        evt.preventDefault();

        //let url = 'http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_TRP_PACKING_PRODUCT_COVER_SHEET&rs:Command=Render&packing_job_no=' + packing_no + '&rs:Format=pdf';
        let url = 'http://192.168.1.247:8080/mpck/mod/step_5/print_pc.html?job_no=' + packing_no + '';

        window.open(url, '_blank');

    });

    $('#frm_job').find('#transport_start').select2()

    $('#frm_job').find('#freight').select2()

    $('#chk_round').select2()

    $("#chk_number").autocomplete({
        source: function (request, response) {
            $.ajax({
                dataType: "json",
                url: url_Packing_Master,
                data: {
                    mode: 'INVOICE',
                    keywords1: moment($('#chk_jobdate').val(), 'DD/MM/YYYY').format('YYYY-MM-DD'),
                    keywords: typeof request.term !== 'undefined' ? request.term : ' ',
                },
                success: function (data) {
                    $('#chk_number').removeClass('ui-autocomplete-loading');
                    // hide loading image
                    response($.map(data.data, function (item) {
                        return {
                            label: item.text.toUpperCase(),
                            value: item.id
                        }
                    }));
                },
                error: function (data) {
                    $('#chk_number').removeClass('ui-autocomplete-loading');
                }
            });
        },
        minLength: 1,
        open: function () { },
        close: function () { },
        focus: function (event, ui) { },
        select: function (event, ui) { }
    });

    $('#frm_job').find('#keywords').autocomplete({
        source: function (request, response) {
            $.ajax({
                dataType: "json",
                url: url_Packing_Master,
                data: {
                    mode: 'INVOICE',
                    keywords1: moment($('#chk_jobdate').val(), 'DD/MM/YYYY').format('YYYY-MM-DD'),
                    keywords: typeof request.term !== 'undefined' ? request.term : ' ',
                },
                success: function (data) {
                    $('#chk_number').removeClass('ui-autocomplete-loading');
                    // hide loading image
                    response($.map(data.data, function (item) {
                        return {
                            label: item.text.toUpperCase(),
                            value: item.id
                        }
                    }));
                },
                error: function (data) {
                    $('#chk_number').removeClass('ui-autocomplete-loading');
                }
            });
        },
        minLength: 1,
        open: function () { },
        close: function () { },
        focus: function (event, ui) { },
        select: function (event, ui) { }
    });
};

$.Check_Drop = async function () {

    if ($('#chk_number').val().substring(0, 2) == 'IV') {

        $('#chk_number').removeClass('parsley-error');

        fetch(url_Packing_Invoice + '?keywords=' + $('#chk_number').val()).then(function (response) {

            return response.json();

        }).then(async function (result) {

            //console.log('result', result.data)

            if (result.data[0]['pMessage'] != null) {

                $.LoadingOverlay("hide", true);
                toastr.error(result.data[0]['pMessage']);

            } else {

                window.history.pushState({}, document.title, "/" + "trp/packing_job");

                let invnumber = result.data[0]['invnumber']
                let invpkuser = result.data[0]['invpkuser']
                var val_addr;

                let chkinv = invnumber.substring(0, 3);

                if (chkinv == 'IVT') {
                    packing_transport_start = 'CPS'
                    //console.log('chkinv 1')
                } else if (chkinv == 'IVH') {
                    if (invpkuser.search(".ONL") >= 0 || invpkuser.search(".MWN") >= 0 || invpkuser.search(".MW") >= 0) {
                        packing_transport_start = 'ONL'
                        //console.log('chkinv 2')
                    } else {
                        packing_transport_start = 'VSK'
                        //console.log('chkinv 3')
                    }
                } else {
                    packing_transport_start = 'VSK'
                    //console.log('chkinv 4')
                }

                //console.log('packing_transport_start', packing_transport_start)

                let invemlocation

                if (result.data[0]['evcode'] != '') {

                    invemlocation = result.data[0]['evname'] + ' โทร ' + result.data[0]['evtel'] + ' ' + result.data[0]['evadd']

                    val_addr = {
                        invemlocation: invemlocation,
                        address_id: '',
                        emmas_code: $.trim(result.data[0]['invcode']),
                        location_name: $.trim(result.data[0]['invname']),
                        eaddress: $.trim(result.data[0]['eaddress']),
                        glb_amphur_name: '',
                        glb_district_name: '',
                        glb_province_name: '',
                        ezip: '',
                        vendor_id: '',
                        vendor_name: '',
                        lov_id: '',
                        lov_code: '',
                        lov1: '',
                        edefault: '',
                        tdefault: '',
                    }

                } else {

                    invemlocation = result.data[0]['invemlocation'];

                    let url = new URL(url_Packing_Check_Address);

                    url.search = new URLSearchParams({
                        emmas_code: $.trim(result.data[0]['invcode']),
                        invemlocation: $.trim(result.data[0]['invemlocation']),
                    });

                    await fetch(url).then(function (response) {
                        return response.json();
                    }).then(function (result_addr) {

                        //console.log('result_addr', result_addr)

                        if (result_addr.length > 0) {
                            val_addr = {
                                invemlocation: $.trim(result_addr.data[0]['invemlocation']),
                                address_id: $.trim(result_addr.data[0]['address_id']),
                                emmas_code: $.trim(result_addr.data[0]['emmas_code']),
                                location_name: $.trim(result_addr.data[0]['location_name']),
                                eaddress: $.trim(result_addr.data[0]['eaddress']),
                                glb_amphur_name: $.trim(result_addr.data[0]['glb_amphur_name']),
                                glb_district_name: $.trim(result_addr.data[0]['glb_district_name']),
                                glb_province_name: $.trim(result_addr.data[0]['glb_province_name']),
                                ezip: $.trim(result_addr.data[0]['ezip']),
                                vendor_id: $.trim(result_addr.data[0]['vendor_id']),
                                vendor_name: $.trim(result_addr.data[0]['vendor_name']),
                                lov_id: $.trim(result_addr.data[0]['lov_id']),
                                lov_code: $.trim(result_addr.data[0]['lov_code']),
                                lov1: $.trim(result_addr.data[0]['lov1']),
                                edefault: $.trim(result_addr.data[0]['edefault']),
                                tdefault: $.trim(result_addr.data[0]['tdefault']),
                            }
                        } else {

                            val_addr = {
                                invemlocation: invemlocation,
                                address_id: '',
                                emmas_code: $.trim(result.data[0]['invcode']),
                                location_name: $.trim(result.data[0]['invname']),
                                eaddress: $.trim(result.data[0]['eaddress']),
                                glb_amphur_name: '',
                                glb_district_name: '',
                                glb_province_name: '',
                                ezip: '',
                                vendor_id: '',
                                vendor_name: '',
                                lov_id: '',
                                lov_code: '',
                                lov1: '',
                                edefault: '',
                                tdefault: '',
                            }

                        }

                    });

                }

                //console.log('val_addr', val_addr)

                let invdate = result.data[0]['invdate']
                let invcode = result.data[0]['invcode']
                let invname = result.data[0]['invname']
                let invaddress = result.data[0]['invaddress']

                var val_inv;

                val_inv = {
                    invnumber: $.trim(result.data[0]['invnumber']),
                    invdate: $.trim(result.data[0]['invdate']),
                    invcode: $.trim(result.data[0]['invcode']),
                    invname: $.trim(result.data[0]['invname']),
                    invemlocation: $.trim(invemlocation),//result.data[0]['invemlocation'],
                    invaddress: $.trim(result.data[0]['invaddress']),
                    invevcode: $.trim(result.data[0]['evcode']),
                    invevname: $.trim(result.data[0]['evname']),
                    invtsno: $.trim(result.data[0]['tsno']),
                }

                //console.log('val_inv', val_inv)

                let chk_jobdate = moment($('#chk_jobdate').val(), 'DD/MM/YYYY').format('YYYY-MM-DD')
                let chk_round = $('#chk_round').val()

                let url = new URL(url_Packing_Check_Drop);

                url.search = new URLSearchParams({
                    emmas_code: result.data[0]['invcode'],
                    packing_delivery_addr: invemlocation,//result.data[0]['invemlocation'],
                    packing_job_date: chk_jobdate,
                    packing_round: chk_round,
                });

                await fetch(url).then(function (response) {

                    return response.json();

                }).then(function (result_chk) {

                    //console.log('result_chk', result_chk.data)

                    $.LoadingOverlay("hide", true);

                    if (result_chk.data[0]['pMessage'] != null) {

                        swal({
                            title: "ไม่พบที่อยู่จัดส่งในระบบ !",
                            text: "ต้องการการเปิดเอกสารนี้หรือไม่",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonClass: "btn-danger",
                            confirmButtonText: "ใช่, ยันยืน",
                            cancelButtonText: "ไม่, ยกเลิก",
                            cancelButtonColor: '#d33',
                            showLoaderOnConfirm: true,
                            closeOnConfirm: false,
                            closeOnCancel: false
                        }, function (isConfirm) {

                            if (isConfirm) {

                                $.Packing_Create(val_inv, val_addr, chk_round);

                                //$('.confirm').prop('disabled', true)

                            } else {

                                swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                            }

                        });

                    } else {

                        $.LoadingOverlay("hide", true);
                        window.history.pushState({}, document.title, "/" + "trp/packing_job");

                        toastr.success('นำส่ง ' + result_chk.data[0]['packing_job_no'])

                        packing_no = ''
                        packing_no = result_chk.data[0]['packing_job_no']

                        window.location.assign(window.location.href + '?packing_job_no=' + packing_no + '&packing_transport_start=' + packing_transport_start)

                    }

                });

            }

        });

    } else {

        $.LoadingOverlay("hide", true);

        toastr.error('กรุณาป้อนเลขที่บิลให้ถูกต้อง');
        $('#chk_number').addClass('parsley-error');
        $('#chk_number').val('')
    }

};

$.Invoice_Get = async function () {

    if ($('#frm_job').find('#keywords').val().substring(0, 2) == 'IV') {

        $.LoadingOverlay("hide", true);

        fetch(url_Packing_Invoice + '?keywords=' + $('#frm_job').find('#keywords').val()).then(function (response) {

            return response.json();

        }).then(function (result_inv) {

            //console.log('result_inv', result_inv.data)

            if (result_inv.data[0]['pMessage'] != null) {

                toastr.error(result_inv.data[0]['pMessage']);

            } else {

                let invemlocation

                if (result_inv.data[0]['evcode'] != '') {

                    invemlocation = result_inv.data[0]['evname'] + ' โทร ' + result_inv.data[0]['evtel'] + ' ' + result_inv.data[0]['evadd']

                } else {

                    invemlocation = result_inv.data[0]['invemlocation']

                }

                let inv_emmas_code = result_inv.data[0]['invcode']
                let inv_packing_delivery_emlocation = result_inv.data[0]['invemlocation']
                let drop_emmas_code = $('#customer_code').val()
                let drop_packing_delivery_emlocation = $('#delivery_address :selected').text()

                if (inv_emmas_code == drop_emmas_code && invemlocation == drop_packing_delivery_emlocation) {

                    $.Invoice_Create()

                } else {

                    toastr.error('ที่อยู่จัดส่งไม่ตรงกัน');
                    $('#frm_job').find('#keywords').addClass('parsley-error');
                    $('#frm_job').find('#keywords').val('')

                }

            }

        });

    } else {

        $.LoadingOverlay("hide", true);
        toastr.error('กรุณาป้อนเลขที่อ้างอิงให้ถูกต้อง');
        $('#frm_job').find('#keywords').addClass('parsley-error');
        $('#frm_job').find('#keywords').val('')
    }

};

$.Invoice_Create = async function () {

    let url = new URL(url_Packing_Invoice_Create);

    url.search = new URLSearchParams({
        keywords: $('#frm_job').find('#keywords').val(),
        temp_id: packing_temp,
        packing_job_id: packing_trans,
        packing_job_no: $('#pck_number').val(),
        salefile_evadd: $('#delivery_address :selected').text(),
        created_by: user_id
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        $.LoadingOverlay("hide", true);

        //console.log('result', result.data)

        if (result.data[0]['pMessage'] != null) {

            toastr.error(result.data[0]['pMessage']);

        } else {

            $('#keywords').focus()

            $('#keywords').removeClass('parsley-error');

            toastr.success('บันทึกเลขที่บิล ' + $('#frm_job').find('#keywords').val())

            $('#frm_job').find('#keywords').val('')

            $.Invoice_List(packing_no)
        }

    });

};

$.Invoice_List = async function (packing_job_no) {

    fetch(url_Packing_Invoice_List + '?packing_job_no=' + packing_job_no).then(function (response) {

        return response.json();

    }).then(function (result) {

        if (result.length > 0) {

            $('#frm_job').find('#btn-add').removeClass('d-none');

            $('#delivery_address').prop('disabled', true)

        } else {

            $('#frm_job').find('#btn-add').addClass('d-none');
            $('#delivery_address').prop('disabled', false)

        }

        let i = result.length;

        var data_inv = [];

        $.each(result.data, function (key, val) {

            let data = JSON.stringify(val)

            data_inv.push([
                val['trans_id'],
                i,
                val['salefile_startdate'],
                val['salefile_number'] + '<br>' + val['salefile_name'],
                val['salefile_invpo'],
                val['salefile_item'],
                val['salefile_userid'],
                val['created_by'] + '<br>' + moment(val['created_datetime'], 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss'),
                "<div class='d-flex flex-row justify-content-center'>" +
                "<button onclick='$.Invoice_Delete(" + data + ");' data-item='" + data + "' style='margin: .25rem .125rem; ' class='btn btn-outline-danger btn-sm delete_item' data-action='delete' id='delete_item" + i + "' type='button'>Delete</button>" +
                "</div>",

            ])

            i--;

        });

        //console.log('data_inv', data_inv)

        table_inv = $('#tbl-inv').DataTable({
            "data": data_inv,
            "dom": 'frtip',
            autoWidth: true,
            "bDestroy": true,
            "deferRender": true,
            "order": [[0, "desc"]],
            "ordering": false,
            "pageLength": 10,
            "columnDefs": [{
                "targets": 'no-sort',
                "orderable": false,
            },
            {
                "targets": [0],
                "searchable": false,
                "visible": false

            },
            {
                "targets": [1],
                "searchable": false,
                "class": "tx-center",
            },
            {
                "targets": [2],
                "searchable": false,
                "class": "tx-center",
                "render": function (data, type, row, meta) {
                    return (data != '0001-01-01T00:00:00' ? moment(data).format('DD/MM/YYYY HH:mm:ss') : '-');
                }
            },
            {
                "targets": [3],
                "searchable": false,
                "class": "tx-center",
            },
            {
                "targets": [4],
                "searchable": false,
                "class": "tx-center",
            },
            {
                "targets": [5],
                "searchable": false,
                "class": "tx-center",

            },
            {
                "targets": [6],
                "searchable": false,
                "class": "tx-center",

            },
            {
                "targets": [7],
                "searchable": false,
                "class": "tx-center",
            },
            {
                "targets": [8],
                "searchable": false,
                "class": "tx-center",
            },
            ],
            "initComplete": function (settings, json) {

            }
        });

        table_inv.columns.adjust();


    });

}

$.Invoice_Delete = async function (citem) {

    //console.log('citem', citem)

    let data_update = {
        trans_id: citem['trans_id'],
        temp_id: citem['temp_id'],
    };

    var params = [];
    for (const i in data_update) {
        params.push(i + "=" + encodeURIComponent(data_update[i]));
    }

    fetch(url_Packing_Invoice_Delete, {
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
                type: "warning",
                showConfirmButton: false,
                timer: 1000
            })

            toastr.warning('ลบเลขที่ INV สำเร็จ');

            $.Invoice_List(packing_no)
        }

    }).catch(error => {

        toastr.error('Error, Please contact administrator.');

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
        packing_job_no: packing_no,
        packing_box_qty: pck_qty,
        packing_box_a: size_a,
        packing_box_b: size_b,
        packing_box_c: size_c,
        packing_box_d: size_d,
        packing_box_e: size_e,
        packing_box_f: size_f,
        packing_box_z: size_z,
        temp_id: packing_temp,
        created_by: user_id
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        //console.log(result.data)

        //console.log(result.data[0]['pMessage'])

        if (result.data[0]['pMessage'] != null) {

            toastr.error(result.data[0]['pMessage']);

        } else {

            toastr.success('บรรจุกล่องสำเร็จ')

            $('#frm_job').find('#pck_qty').val(result.data[0]['packing_box_qty']);
            $('#frm_job').find('#size_A').val(result.data[0]['packing_box_a']);
            $('#frm_job').find('#size_B').val(result.data[0]['packing_box_b']);
            $('#frm_job').find('#size_C').val(result.data[0]['packing_box_c']);
            $('#frm_job').find('#size_D').val(result.data[0]['packing_box_d']);
            $('#frm_job').find('#size_E').val(result.data[0]['packing_box_e']);
            $('#frm_job').find('#size_F').val(result.data[0]['packing_box_f']);
            $('#frm_job').find('#size_Z').val(result.data[0]['packing_box_z']);
            $('#frm_job').find('.default-switches').removeClass('on');
            $('.size_box').prop('disabled', true)

            $.Packing_Job_Detail(packing_no)
        }

    });

    return false;

};

$.Box_Detail = async function (refno) {

    //console.log('Box_Detail', refno)

    fetch(url_Packing_Box_Detail + '?packing_job_no=' + refno).then(function (response) {
        return response.json();
    }).then(function (result) {

        $.LoadingOverlay("hide", true);

        //console.log('result', result.data)

        if (result.length > 0) {

            citem_detail = result.data;

            $('#frm_job').find('#pck_qty').val(result.data[0]['packing_box_qty']);
            $('#frm_job').find('#size_A').val(result.data[0]['packing_box_a']);
            $('#frm_job').find('#size_B').val(result.data[0]['packing_box_b']);
            $('#frm_job').find('#size_C').val(result.data[0]['packing_box_c']);
            $('#frm_job').find('#size_D').val(result.data[0]['packing_box_d']);
            $('#frm_job').find('#size_E').val(result.data[0]['packing_box_e']);
            $('#frm_job').find('#size_F').val(result.data[0]['packing_box_f']);
            $('#frm_job').find('#size_Z').val(result.data[0]['packing_box_z']);

            $('#frm_job').find('.default-switches').removeClass('on');
            $('.size_box').prop('disabled', true)

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

$.Packing_Create = async function (val_inv, val_addr, chk_round) {

    let vendor_id = '' //$('#frm_job').find('#shipping_company').val();
    let lov_deliverycost_code = '' // $('#frm_job').find('#freight').val();
    let emmas_code = $('#frm_job').find('#customer_code').val();
    let emmas_sender_name = $('#frm_job').find('#transport_end').val();
    let transport_start = ''//$('#frm_job').find('#transport_start').val();
    let packing_delivery_name = $('#frm_job').find('#transport_end').val();
    let packing_delivery_addr = $('#frm_job').find('#delivery_address').val();
    let chk_jobdate = moment($('#chk_jobdate').val(), 'DD/MM/YYYY').format('YYYY-MM-DD')

    //console.log('Packing_Create val_inv', val_inv)
    //console.log('Packing_Create val_addr', val_addr)

    let data_update = {
        temp_id: temp_id,
        vendor_id: $.trim(val_addr['address_id']) == '' ? vendor_id : $.trim(val_addr['vendor_id']),
        packing_job_date: chk_jobdate,
        packing_round: chk_round,
        lov_deliverycost_code: $.trim(val_addr['address_id']) == '' ? lov_deliverycost_code : $.trim(val_addr['lov_id']),
        packing_delivery_name: $.trim(val_inv['invname']),
        packing_delivery_addr: $.trim(val_inv['invaddress']),
        // packing_delivery_emlocation: $.trim(val_inv['invemlocation']),
        packing_delivery_emlocation: $.trim(val_addr['address_id']) == '' ? $.trim(val_inv['invemlocation']) : $.trim(val_addr['invemlocation']),
        emmas_code: $.trim(val_inv['invcode']),
        emmas_sender_name: packing_transport_start,
        created_by: user_id,
        packing_type: $.trim(val_inv['invevcode']) == '' ? 'ACC' : 'ประกัน',
        packing_evcode: $.trim(val_inv['invevcode']),
        packing_evname: $.trim(val_inv['invevname']),
        packing_tsno: $.trim(val_inv['invtsno']),
        emmas_addr_id: $.trim(val_addr['address_id']) == '' ? '' : $.trim(val_addr['address_id']),
        packing_delivery_tumbol: $.trim(val_addr['address_id']) == '' ? '' : $.trim(val_addr['glb_district_name']),
        packing_delivery_amphur: $.trim(val_addr['address_id']) == '' ? '' : $.trim(val_addr['glb_amphur_name']),
        packing_delivery_provinc: $.trim(val_addr['address_id']) == '' ? '' : $.trim(val_addr['glb_province_name']),
        packing_delivery_zip: $.trim(val_addr['address_id']) == '' ? '' : $.trim(val_addr['ezip']),
        mode: 'CREATE'
    };

    //console.log('CREATE', data_update)

    var params = [];
    for (const i in data_update) {
        params.push(i + "=" + encodeURIComponent(data_update[i]));
    }

    fetch(url_Packing_Job, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params.join("&"),
    }).then(data => {
        return data.json();
    }).then(result => {

        //console.log(result.data)

        if (result.status === 'Error') {

            toastr.error('เกิดข้อผิดพลาด!');

            swal(
                {
                    title: 'เกิดข้อผิดพลาด!',
                    text: 'กรุณาติดต่อเจ้าหน้าที่!',
                    type: 'error',
                    confirmButtonColor: '#57a94f'
                }
            )

        } else {

            $.each(result.data, function (key, val) {

                //console.log(val['pMessage'])

                if (val['pMessage'] != null) {

                    toastr.error(val['pMessage']);

                } else {

                    toastr.success('บันทึกใบแปะหน้าสำเร็จ')

                    swal({
                        title: "สำเร็จ!",
                        text: "ทำรายการสำเร็จ",
                        type: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    });

                    packing_no = ''
                    packing_no = val['packing_job_no']

                    window.location.assign(window.location.href + '?packing_job_no=' + packing_no + '&packing_transport_start=' + packing_transport_start)
                }

            });

        }

    });

    return false;

};

$.Packing_Update = async function (val_inv) {

    let vendor_id = $('#frm_job').find('#shipping_company').val();
    let lov_deliverycost_code = $('#frm_job').find('#freight').val();
    let transport_start = $('#frm_job').find('#transport_start').val();

    //console.log('Packing_Create', val_inv)

    let data_update = {
        temp_id: packing_temp,
        updated_by: user_id,
        packing_job_date: moment().format('YYYY-MM-DD'),
        mode: 'UPDATE'
    };

    var params = [];
    for (const i in data_update) {
        params.push(i + "=" + encodeURIComponent(data_update[i]));
    }

    fetch(url_Packing_Job, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params.join("&"),
    }).then(data => {
        return data.json();
    }).then(result => {

        //console.log(result.data)

        $.each(result.data, function (key, val) {

            //console.log(val['pMessage'])

            if (val['pMessage'] != null) {

                toastr.error(val['pMessage']);

            } else {

                toastr.warning('แก้ไขข้อมูล')

                $('#keywords').prop('disabled', false)

                $('.delete_item').prop('disabled', false)

                $.Packing_Job_Detail(val['packing_job_no'])
            }

        });

    });

    return false;

};

$.Packing_Success = async function (val_inv) {

    let vendor_id = $('#frm_job').find('#shipping_company').val();
    let lov_deliverycost_code = $('#frm_job').find('#freight').val();
    let transport_start = $('#frm_job').find('#transport_start').val();

    //console.log('Packing_Create', val_inv)

    let data_update = {
        temp_id: packing_temp,
        vendor_id: vendor_id,
        lov_deliverycost_code: lov_deliverycost_code,
        emmas_sender_name: transport_start,
        updated_by: user_id,
        packing_job_date: moment().format('YYYY-MM-DD'),
        mode: 'SUCCESS'
    };

    var params = [];
    for (const i in data_update) {
        params.push(i + "=" + encodeURIComponent(data_update[i]));
    }

    fetch(url_Packing_Job, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params.join("&"),
    }).then(data => {
        return data.json();
    }).then(result => {

        //console.log(result.data)

        $.each(result.data, function (key, val) {

            //console.log(val['pMessage'])

            if (val['pMessage'] != null) {

                toastr.error(val['pMessage']);

            } else {

                toastr.success('บันทึกใบแปะหน้าสำเร็จ')

                swal({
                    title: "สำเร็จ!",
                    text: "ทำรายการสำเร็จ",
                    type: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });

                let url_packing = url_trp + "trp/packing_item" + '?job_no=' + $('#pck_number').val() + '&temp_id=' + packing_temp + '&created_by' + user_id;

                //console.log(url_packing)

                //window.open(url_packing, '_blank');
                window.open(url_packing, "_self");

                $.Packing_Job_Detail(val['packing_job_no'])

                $('#frm_job').find('#btn-add').addClass('d-none');
                $('#btn-print').removeClass('d-none');
                $('#frm_job').find('input').prop('disabled', true)
                $('#frm_job').find('select').prop('disabled', true)
                $("#frm_job").parsley().reset();
                $('.delete_item').prop('disabled', true)

            }

        });

    });

    return false;

};

$.Packing_Job_Detail = async function (refno) {

    //console.log('Detail refno', refno)

    $('#keywords').focus()

    fetch(url_Packing_Job_Detail + '?packing_job_no=' + refno).then(async function (response) {
        return response.json();
    }).then(function (result) {

        $.LoadingOverlay("hide", true);

        //console.log('result', result.data)

        if (result.length > 0) {

            $.Delivery_Address_Get(result.data[0]['packing_delivery_addr'], result.data[0]['packing_delivery_emlocation']);

            citem_detail = result.data;

            packing_no = ''
            packing_no = result.data[0]['packing_job_no']
            packing_temp = result.data[0]['temp_id']
            packing_trans = result.data[0]['trans_id']
            job_packing_ref = result.data[0]['job_packing_ref']

            $('#pck_user').val(result.data[0]['created_by']);
            $('#transport_end').val(result.data[0]['packing_delivery_name']);
            $('#customer_code').val(result.data[0]['emmas_code']);
            $('#pck_number').val(result.data[0]['packing_job_no']);
            $('#inv_date').val(moment(result.data[0]['packing_job_date']).format("DD/MM/YYYY"));
            $('#shipping_company').val(result.data[0]['vendor_id']).trigger('change');
            $('#freight').val(result.data[0]['lov_deliverycost_code']).trigger('change');
            $('#packing_round').html('ครั้งที่ : ' + result.data[0]['packing_round'])

            $('#frm_job').find('#keywords').val('')

            $('#transport_start').val((urlParams.get('packing_transport_start') == '' || urlParams.get('packing_transport_start') == null) ? result.data[0]['emmas_sender_name'] : urlParams.get('packing_transport_start')).trigger('change')

            if (result.data[0]['event_status'] == 'PENDING' && result.data[0]['packing_status'] == 'PENDING') {

            } else if (result.data[0]['event_status'] == 'PENDING' && result.data[0]['packing_status'] == 'SUCCESS') {

                $('#frm_job').find('#btn-add').removeClass('d-none');

                $('#frm_job').find('#btn-edit').addClass('d-none');

            } else if (result.data[0]['event_status'] == 'SUCCESS' && result.data[0]['packing_status'] == 'PENDING') {

                $('#frm_job').find('#btn-add').addClass('d-none');

                $('#frm_job').find('#btn-packing-check').removeClass('d-none');

                setTimeout(function () {

                    $('#frm_job').find('#btn-add').addClass('d-none');
                    $('#btn-print').removeClass('d-none');
                    $('#frm_job').find('input').prop('disabled', true)
                    $('#frm_job').find('select').prop('disabled', true)
                    $("#frm_job").parsley().reset();
                    $('.delete_item').prop('disabled', true)

                }, 300);

            } else if (result.data[0]['event_status'] == 'SUCCESS' && result.data[0]['packing_status'] == 'SUCCESS') {

                $("#alert_action").removeClass('alert-warning');
                $("#alert_action").addClass('alert-success');
                $('#alert_head').html('เลขที่อ้างอิง ' + result.data[0]['packing_job_no']);
                $('#alert_body').html(' เอกสารสมบรูณ์');
                $('#alert_action').removeClass('d-none');
                $('#frm_job').find('#btn-packing-check').removeClass('d-none');
                $("#frm_job").find('#btn-packing-check').html("สินค้า");

                setTimeout(function () {

                    $('#frm_job').find('#btn-add').addClass('d-none');
                    $('#btn-print').removeClass('d-none');
                    $('#frm_job').find('input').prop('disabled', true)
                    $('#frm_job').find('select').prop('disabled', true)
                    $("#frm_job").parsley().reset();
                    $('.delete_item').prop('disabled', true)

                }, 100);
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

$.Shipping_Company_Update = async function () {

    let shipping_company = $('#frm_job').find('#shipping_company').val();
    let chk_jobdate = moment($('#chk_jobdate').val(), 'DD/MM/YYYY').format('YYYY-MM-DD')

    let data_shipping_company = {
        temp_id: packing_temp,
        packing_job_date: chk_jobdate, //ใช้เฉยๆกัน ERORR
        vendor_id: shipping_company,
        mode: 'SHIPPING_COMPANY'
    };

    var params = [];
    for (const i in data_shipping_company) {
        params.push(i + "=" + encodeURIComponent(data_shipping_company[i]));
    }

    fetch(url_Packing_Job, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params.join("&"),
    }).then(data => {
        return data.json();
    }).then(result => {

        //console.log(result.data)

        if (result.data[0]['pMessage'] != null) {

            toastr.error(result.data[0]['pMessage']);

        } else {

            toastr.success('บันทึก บริษัทขนส่งสำเร็จ')

            $.Packing_Job_Detail(packing_no)
        }

    });

    return false;

};

$.Delivery_Cost_Update = async function () {

    let shipping_company = $('#frm_job').find('#shipping_company').val();
    let chk_jobdate = moment($('#chk_jobdate').val(), 'DD/MM/YYYY').format('YYYY-MM-DD')
    let lov_deliverycost_code = $('#frm_job').find('#freight').val();

    let data_shipping_company = {
        temp_id: packing_temp,
        packing_job_date: chk_jobdate, //ใช้เฉยๆกัน ERORR
        lov_deliverycost_code: lov_deliverycost_code,
        mode: 'DELIVERY_COST'
    };

    var params = [];
    for (const i in data_shipping_company) {
        params.push(i + "=" + encodeURIComponent(data_shipping_company[i]));
    }

    fetch(url_Packing_Job, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params.join("&"),
    }).then(data => {
        return data.json();
    }).then(result => {

        //console.log(result.data)

        if (result.data[0]['pMessage'] != null) {

            toastr.error(result.data[0]['pMessage']);

        } else {

            toastr.success('บันทึก ค่าขนส่งสำเร็จ')

            $.Packing_Job_Detail(packing_no)
        }

    });

    return false;

};

$.Master_Get = async function () {

    let url_Master = new URL(url_Packing_Master);

    url_Master.search = new URLSearchParams({
        mode: 'VENDOR',
    });
    fetch(url_Master).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            let Master_dataSet = [];

            $.each(result.data, function (key, val) {

                Master_dataSet.push({ id: val['id'], text: val['text'] });

            });

            $('#frm_job').find('#shipping_company').select2({
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

$.Delivery_Address_Get = async function (default_addr, default_emlocation) {

    let url_Master = new URL(url_Packing_Master);

    url_Master.search = new URLSearchParams({
        mode: 'DELIVERY_ADDRESS',
        keywords: $('#customer_code').val(),
    });
    fetch(url_Master).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            let Master_dataSet = [];

            $("#delivery_address option").remove();
            $("#delivery_address").append("<option value=''>--SELECT--</option>").attr("value", '')
            $("#delivery_address").append("<option value=" + default_addr + ">" + default_addr + "</option>").attr("value", '')
            $("#delivery_address").append("<option value=" + default_emlocation + " selected>" + default_emlocation + "</option>").attr("value", '')

            $.each(result.data, function (key, val) {

                Master_dataSet.push({ id: val['id'], text: val['text'] });

            });

            $('#frm_job').find('#delivery_address').select2({
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

    $("#transport_start option").remove();
    $("#transport_start").append("<option value=''>--SELECT--</option>").attr("value", '')
    $("#transport_start").append("<option value='VSK' selected>VSK</option>")
    $("#transport_start").append("<option value='VSF'>VSF</option>")
    $("#transport_start").append("<option value='LLK'>LLK</option>")
    $("#transport_start").append("<option value='NWM'>NWM</option>")
    $("#transport_start").append("<option value='KSW'>KSW</option>")
    $("#transport_start").append("<option value='KLH'>KLH</option>")
    $("#transport_start").append("<option value='CPS'>CPS</option>")
    $("#transport_start").append("<option value='ONL'>ONL</option>")
    $("#transport_start").append("<option value='MW'>MW</option>")

    await $.init();

});