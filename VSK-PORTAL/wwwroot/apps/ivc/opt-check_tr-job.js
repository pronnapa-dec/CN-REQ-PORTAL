'use strict';

let fs = firebase.firestore();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const user_id = objProfile[0]['username'];
const url_api = "http://localhost:49705";
const url_job = "http://localhost:57916";
//const url_api = "http://192.168.1.247:8089";

const url_check_tr_create = url_api + '/api/Check_Tr_Create';
const url_check_tr_update = url_api + '/api/Check_Tr_Update';
const url_check_tr_remark_list = url_api + '/api/Check_Tr_Remark_List';
const url_check_tr_remark_create = url_api + '/api/Check_Tr_Remark_Create';
const url_check_tr_remark_delete = url_api + '/api/Check_Tr_Remark_Delete';
const url_check_tr_edit = url_api + '/api/Check_Tr_Edit';

let table_list, table_remark;

const BR_v1_s = 'http://192.168.1.247/intranet/public/sound/BR_v1_s.mp3';
const BR_v2_s = 'http://192.168.1.247/intranet/public/sound/BR_v2_s.mp3';
const BR_v3_s = 'http://192.168.1.247/intranet/public/sound/BR_v3_s.mp3';

let customElement = $("<div>", {
    "css": {
        "border": "2px solid",
        "font-size": "14px",
        "text-align": "center",
        "padding": '7px'

    },
    "text": 'Please Wait...'
});

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


$(document).ready(async function () {

    await $.init();

});

$(document).keyup(function (e) {

    if (e.keyCode == 9) {
        $('#frm_job').find('#tr_scan').focus();
    } else if (e.keyCode == 113) {
        $('#frm_job').find('#tr_qty').val('').focus();
    }

});

$.init = async function () {

    $('#tr_created_by').val(user_id);

    $('#frm_job').find('#tr_number').focus().keyup(async function (evt) {

        evt.preventDefault();

        this.value = this.value.toUpperCase().replace(' ', '').trim();

        if (evt.keyCode == 13) {

            $.LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            //await $.Create(this.value)

            await window.location.assign(window.location.href + '?tr_number=' + this.value)

        }

    });

    $('#frm_job').find('#tr_scan').focus().keyup(async function (evt) {

        evt.preventDefault();

        this.value = this.value.trim();

        if (evt.keyCode == 13) {

            $(".table-responsive").LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            $.Update(this.value)

        }

    });

    $('#remark_cause').off('change').on('change', async function (evt) {

        evt.preventDefault();

        if ($(this).val() == 'อื่นๆ') {
            $('#remark_more').parent().parent().parent().removeClass('d-none')
        } else {
            $('#remark_more').parent().parent().parent().addClass('d-none')
        }

    });

    $('#reset_location').off('click').on('click', async function (evt) {

        evt.preventDefault();

        await window.history.pushState({}, document.title, "/" + "ivc/opt/tr_check_job");

        await setTimeout(async function () {

            location.reload();

        }, 100);

    });

    $('#modal-frm_remark').off('hidden.bs.modal').on('hidden.bs.modal', async function () {

        await setTimeout(function () {

            $('#frm_remark').find('input').val('')
            $('#frm_remark').find('textarea').val('')
            $('#frm_remark').find('select').trigger('change').val('')
            $('#frm_remark').find('#remark_tr_qty').val('1')
            $("#frm_remark").parsley().reset();

        }, 100);

    });

    $('.btn-action').off('click').on('click', async function (evt) {

        evt.preventDefault();

        let action_id = evt.target.id

        if (action_id == 'bth-save_remark') {

            $('#frm_remark').parsley().validate();

            if ($('#frm_remark').parsley().isValid()) {

                await $.Remark_Create();

            }

        } else if (action_id == 'bth-delete_remark') {

            await $.Remark_Delete();

        } else if (action_id == 'bth-save_qty') {

            await $.Qty_Edit();
        }

    });

    if (urlParams.get('tr_number') != null) {

        $.LoadingOverlay("show", {
            image: '',
            custom: customElement
        });

        $('#frm_job').find('#tr_number').val(urlParams.get('tr_number')).focus();

        $.Create(urlParams.get('tr_number'));
    }

};

$.Create = async function (tr_number) {

    let add_data = {
        tr_number: tr_number,
        created_by: user_id,
    };

    var params = [];
    for (const i in add_data) {
        params.push(i + "=" + encodeURIComponent(add_data[i]));
    }

    fetch(url_check_tr_create, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params.join("&"),
    }).then(result => {
        return result.json();
    }).then(result => {

        if (result.status === 'Error') {

            $.LoadingOverlay("hide", true);

            toastr.error('Oops! An Error Occurred');

        } else {

            if (result.length > 0) {

                const audio = new Audio(BR_v1_s); audio.volume = 1; audio.play();

                $('#frm_job').find('#tr_number').prop('disabled', true);

                $('#frm_job').find('#tr_scan').addClass('bd-1 bd-warning')

                $('#frm_job').find('#tr_wh').val(result.data[0]['tr_detail_empcod']);

                $('#frm_job').find('#tr_date').val(moment(result.data[0]['tr_detail_trndate']).format('DD/MM/YYYY'));

                $.List(result);

                //window.location.assign(window.location.href + '?tr_number=' + tr_number)

            } else {

                $.LoadingOverlay("hide", true);
                var audio = new Audio(BR_v2_s); audio.volume = 1; audio.play();
                toastr.error('ไม่พบข้อมูล')
                $('#frm_job').find('#tr_number').val('');

            }
        }
    });

};

$.Update = async function () {

    $('#frm_job').find('#tr_scan').prop('disabled', true);

    let update_data = {
        tr_number: $('#frm_job').find('#tr_number').val(),
        tr_scan: $('#frm_job').find('#tr_scan').val(),
        tr_qty: $('#frm_job').find('#tr_qty').val() > 1 ? $('#frm_job').find('#tr_qty').val() : 1,
        updated_by: user_id,
    };

    var params = [];
    for (const i in update_data) {
        params.push(i + "=" + encodeURIComponent(update_data[i]));
    }

    fetch(url_check_tr_update, {
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
            $(".table-responsive").LoadingOverlay("hide", true);
            toastr.error(data.error_message);
            var audio = new Audio(BR_v2_s); audio.volume = 1; audio.play();

        } else {

            if ((result.data[0]['pMessage']) != null) {

                $(".table-responsive").LoadingOverlay("hide", true);

                toastr.error(result.data[0]['pMessage'])

                if (result.data[0]['pMessage'] == 'จำนวนสินค้าครบแล้ว') {
                    var audio = new Audio(BR_v3_s); audio.volume = 1; audio.play();
                } else {
                    var audio = new Audio(BR_v2_s); audio.volume = 1; audio.play();
                }

                $('#frm_job').find('#tr_scan').prop('disabled', false);
                $('#frm_job').find('#tr_scan').val("").focus();
                $('#frm_job').find('#tr_qty').val('1');

            } else {

                var audio = new Audio(BR_v1_s); audio.volume = 1; audio.play();

                toastr.success('Save Successfully!', async function () {

                    $.List(result);

                });

                $('#frm_job').find('#tr_scan').prop('disabled', false);
                $('#frm_job').find('#tr_scan').val("").focus();
                $('#frm_job').find('#tr_qty').val('1');

            }

        }

    }).catch((error) => {

        $(".table-responsive").LoadingOverlay("hide", true);
        var audio = new Audio(BR_v2_s); audio.volume = 1; audio.play();
        toastr.error(error, 'Error writing document');

    });

    return false;

};

$.List = async function (result) {

    console.log('data_list', result)

    table_list = $('#table_list').DataTable({
        data: result.data,
        dom: 'Bfrtip',
        deferRender: true,
        bDestroy: true,
        autoWidth: false,
        scrollY: '40vh',
        scrollCollapse: true,
        paging: false,
        buttons: [
            'copyHtml5',
            {
                extend: 'excelHtml5',
                title: '',
                filename: 'SCAN_TR_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                exportOptions: {
                    columns: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                }
            },
        ],
        columns: [
            {
                title: "<span class='tx-12'>#</span>",
                class: "tx-center align-middle",
                render: function (data, type, row, meta) {
                    return '<span class="tx-12">' + (meta.row + 1) + '</span>';
                }
            },
            {
                title: "<span class='tx-12'>temp_id</span>",
                data: "tr_detail_id",
                class: "tx-center align-middle",
                visible: false,
                render: function (data, type, row, meta) {
                    return '<span class="tx-12">' + data + '</span>';
                }
            },
            {
                title: "<span class='tx-12'>สถานที่</span>",
                data: "tr_detail_location",
                class: "tx-center align-middle",
                render: function (data, type, row, meta) {
                    return '<span class="tx-12">' + data + '</span>';
                }
            },
            {
                title: "<span class='tx-12'>ชื่อสินค้า</span>",
                data: "tr_detail_stkname",
                class: "tx-center align-middle",
                render: function (data, type, row, meta) {
                    return '<span class="tx-12 tx-left mg-l-2 ">' + data + '</span>';
                }
            },
            {
                title: "<span class='tx-12'>บาร์โค้ด</span>",
                data: "tr_detail_gbarcode",
                class: "tx-center align-middle tr_gbarcode",
                render: function (data, type, row, meta) {
                    return '<span class="tx-12">' + data + '</span>';
                }
            },
            {
                title: "<span class='tx-12'>เลขอะไหล่</span>",
                data: "tr_detail_spcodes",
                class: "tx-center align-middle",
                render: function (data, type, row, meta) {
                    return '<span class="tx-12">' + data + '</span>';
                }
            },
            {
                title: "<span class='tx-12'>ตรวจสอบ</span>",
                data: "tr_detail_qty",
                class: "tx-center align-middle",
                render: function (data, type, row, meta) {
                    return '<span class="tx-12">' + data + '</span>';
                }
            },
            {
                title: "<span class='tx-12'>ขาด</span>",
                data: "tr_detail_qty_remark",
                class: "tx-center align-middle",
                render: function (data, type, row, meta) {
                    return '<span class="tx-12">' + data + '</span>';
                }
            },
            {
                title: "<span class='tx-12'>ทั้งหมด</span>",
                data: "tr_detail_trnqty",
                class: "tx-center align-middle",
                render: function (data, type, row, meta) {
                    return '<span class="tx-12">' + data + '</span>';
                }
            },
            {
                title: "<span class='tx-12'>หน่วยนับ</span>",
                data: "tr_detail_stkunit",
                class: "tx-center align-middle",
                render: function (data, type, row, meta) {
                    return '<span class="tx-12">' + data + '</span>';
                }
            },
            {
                title: "<span class='tx-12'>สาเหตุ</span>",
                data: "tr_detail_remark",
                class: "tx-center align-middle",
                render: function (data, type, row, meta) {
                    let v_date = data == null ? '' : data
                    return '<span class="tx-12">' + v_date + '</span>';
                }
            },
        ],
        rowCallback: function (row, data) {

            if ((data.tr_detail_qty + data.tr_detail_qty_remark) == 0) {
                $('td:eq(5)', row).addClass('tx-danger');
                $('td:eq(1)', row).parent().addClass('bg-danger-transparent');
            } else if ((data.tr_detail_qty + data.tr_detail_qty_remark) < data.tr_detail_trnqty) {
                //$('td:eq(5)', row).addClass('tx-orange');
                $('td:eq(1)', row).parent().addClass('bg-warning-transparent');
            } else if ((data.tr_detail_qty + data.tr_detail_qty_remark) == data.tr_detail_trnqty) {
                //$('td:eq(5)', row).addClass('tx-success');
                $('td:eq(1)', row).parent().addClass('bg-success-transparent');
            } else {
                ''
            }

        },
        initComplete: function (settings, json) {

            $('#table_list tbody').off('dblclick', '.tr_gbarcode').on('dblclick', '.tr_gbarcode', async function (e) {

                e.preventDefault()

                var data = table_list.row($(this).parents('tr')).data();

                $('#tr_scan').val('')
                $('#tr_scan').val(data.tr_detail_gbarcode)
                $('#tr_scan').focus();

            });

            $.contextMenu({
                selector: '#table_list tbody tr',
                callback: async function (key, options) {
                    let citem = table_list.row(this).data();
                    if (key === 'Remark') {
                        let mode;
                        if (citem['tr_detail_qty'] == citem['tr_detail_trnqty']) {
                            mode = 'scan'
                            toastr.warning('สินค้าครบแล้ว')
                        } else if (citem['tr_detail_qty'] + citem['tr_detail_qty_remark'] == citem['tr_detail_trnqty'] && citem['tr_detail_qty_remark'] > 0) {
                            mode = 'scan_remark'
                            await $.Remark_Detail(mode, citem);
                            await $.Remark_List(citem);
                        } else {
                            mode = ''
                            await $.Remark_Detail(mode, citem);
                            await $.Remark_List(citem);
                        }
                    } else if (key === 'Qty') {
                        if (citem['tr_detail_qty'] == citem['tr_detail_trnqty']) {
                            await $('#modal-frm_edit').modal({
                                keyboard: false,
                                backdrop: 'static'
                            });
                            await $.Qty_Detail(citem);
                        } else {
                            toastr.warning('สินค้าไม่ครบ ไม่สามารถแก้ไขได้')
                        }
                    } else {
                        alert('ERROR');
                    }
                },
                items: {
                    "Remark": { name: "Remark", icon: "fas fa-edit" },
                    "Qty": { name: "Qty", icon: "fas fa-box" },
                }
            });

            let i = 0;
            let item_current = 0;
            let item_balance = 0;
            let item_cn = 0;

            $.each(result.data, function (key, val) {

                let add_qty = val['tr_detail_qty'];
                let cost_qty = val['tr_detail_trnqty'];
                let cn_qty = val['tr_detail_qty_remark'];

                item_current += parseFloat(add_qty)
                item_balance += parseFloat(cost_qty)
                item_cn += parseFloat(cn_qty)

                i++
            });

            const maxDate = new Date(
                Math.max(
                    ...result.data.map(element => {
                        return new Date(element.updated_datetime);
                    }),
                ),
            );

            //console.log('maxDate', moment(maxDate).format('DD/MM/YYYY hh:mm:ss a') )
            //console.log('maxDate', toThaiDateString(maxDate) )

            $('.time-today').html('ตรวจสอบล่าสุด : ' + moment(maxDate).format('DD/MM/YYYY hh:mm:ss a'));
            $('.item_total').html(i + ' / ' + item_balance);
            $('.item_current').html(item_current);
            $('.item_balance').html(item_balance - (item_current + item_cn));
            $('.item_cn').html(item_cn);

            $('#frm_job').find('#tr_scan').prop('disabled', false);
            $('#frm_job').find('#tr_qty').prop('disabled', false);
            $('#frm_job').find('#tr_scan').val("").focus();
            $('#frm_job').find('#tr_qty').val('1');

            setTimeout(function () {

                $(".table-responsive").LoadingOverlay("hide", true);

                $.LoadingOverlay("hide", true);

                if ($('.item_balance').html() == '0') {
                    $('#frm_job').find('#tr_scan').prop('disabled', true);
                    $('#frm_job').find('#tr_qty').prop('disabled', true);
                    swal({
                            title: 'การตรวจสอบสมบูรณ์!',
                            text: 'You clicked the button!',
                            type: 'success',
                            confirmButtonColor: '#57a94f'
                        })
                }

                $('#tr_scan').focus()

            }, 300);

        },
    });

    return false;

};

$.Qty_Detail = async function (citem) {

    console.log('Qty_Detail', citem)

    $('#e_tr_number').val(citem['tr_detail_no'])
    $('#e_tr_item').val(citem['tr_detail_stkcode'] + ' : ' + citem['tr_detail_stkname'])
    $('#e_tr_barcode').val(citem['tr_detail_gbarcode'])

    let tr_detail_trnqty = citem['tr_detail_trnqty']

    $("#e_tr_qty").attr({
        "max": tr_detail_trnqty
    });

    return false;

};

$.Qty_Edit = async function (citem) {

    let add_data = {
        tr_number: $('#e_tr_number').val(),
        tr_scan: $('#e_tr_barcode').val(),
        tr_qty: $('#e_tr_qty').val(),
        updated_by: user_id,
    };

    var params = [];
    for (const i in add_data) {
        params.push(i + "=" + encodeURIComponent(add_data[i]));
    }

    fetch(url_check_tr_edit, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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

            toastr.warning('แก้ไขสำเร็จ');
            $.List(result)
            $('#modal-frm_edit').modal('hide');

        }

    }).catch(error => {

        toastr.error('Error, Please contact administrator.');

    });

    return false;

};

$.Remark_Detail = async function (mode, citem) {

    await $('#modal-frm_remark').modal({
        keyboard: false,
        backdrop: 'static'
    });

    console.log('Remark_Detail', citem)

    if (mode == 'scan_remark') {

        $("#remark_tr_qty").prop('disabled', true);
        $("#remark_cause").prop('disabled', true);
        $('#bth-save_remark').addClass('d-none');
        $('#bth-delete_remark').removeClass('d-none');

        $("#remark_cause").val(citem['tr_detail_remark'])
        $("#remark_tr_qty").val(citem['tr_detail_qty_remark'])
    }
    else {
        $("#remark_tr_qty").prop('disabled', false);
        $("#remark_cause").prop('disabled', false);
        $('#bth-save_remark').removeClass('d-none');
        $('#bth-delete_remark').addClass('d-none');
    }

    $('#remark_tr_number').val(citem['tr_detail_no'])
    $('#remark_tr_item').val(citem['tr_detail_stkcode'] + ' : ' + citem['tr_detail_stkname'])
    $('#remark_tr_barcode').val(citem['tr_detail_gbarcode'])

    let tr_detail_qty = citem['tr_detail_qty']
    let tr_detail_trnqty = citem['tr_detail_trnqty']
    let tr_detail_qty_remark = citem['tr_detail_qty_remark']
    let max_qty = (tr_detail_trnqty - tr_detail_qty)

    $("#remark_tr_qty").attr({
        "max": max_qty
    });

    return false;

};

$.Remark_List = async function (citem) {

    let url = new URL(url_check_tr_remark_list);

    url.search = new URLSearchParams({
        tr_number: citem['tr_detail_no'],
        tr_remark_gbarcode: citem['tr_detail_gbarcode'],
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            table_remark = $('#table_remark').DataTable({
                data: result.data,
                dom: 'frtip',
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "ค้นหา..."
                },
                deferRender: true,
                ordering: true,
                scrollY: '50vh',
                scrollCollapse: true,
                paging: false,
                bDestroy: true,
                autoWidth: false,
                columns: [
                    {
                        title: "<span class='tx-12'>#</span>",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + (meta.row + 1) + '</span>';
                        }
                    }, //0
                    {
                        title: "<span class='tx-12'>สาเหตุ</span>",
                        data: "tr_remark_detail",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //1
                    {
                        title: "<span class='tx-12'>จำนวน</span>",
                        data: "tr_remark_qty",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //2
                    {
                        title: "<span class='tx-12'>ผู้บันทึก</span>",
                        data: "created_by",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //11
                    {
                        title: "<span class='tx-12'>เวลาบันทึก</span>",
                        data: "created_datetime",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + moment(data, 'YYYY/MM/DD hh:mm:ss').format('DD/MM/YYYY hh:mm:ss') + '</span>';
                        }
                    }, //12
                    {
                        title: "<span class='tx-12'>สถานะ</span>",
                        data: "record_status",
                        class: "tx-center align-middle",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            let status
                            if (data == 1) {
                                status = '<span class="tx-12 tx-success">' + '<i class="las la-check"></i>' + '</span>';
                            } else {
                                status = '<span class="tx-12 tx-danger">' + '<i class="las la-times"></i>' + '</span>';
                            }

                            return status;
                        }
                    }, //12
                ],
                "initComplete": function (settings, json) {


                },
            });

        }

    });

    return false;

};

$.Remark_Create = async function () {

    let add_data = {
        tr_number: $('#remark_tr_number').val(),
        tr_scan: $('#remark_tr_barcode').val(),
        r_remark: $('#frm_remark').find('#remark_cause').val() == 'อื่นๆ' ? $('#frm_remark').find('#remark_more').val() : $('#frm_remark').find('#remark_cause').val(),
        r_qty: $('#remark_tr_qty').val(),
        created_by: user_id,
    };

    var params = [];
    for (const i in add_data) {
        params.push(i + "=" + encodeURIComponent(add_data[i]));
    }

    fetch(url_check_tr_remark_create, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params.join("&"),
    }).then(result => {
        return result.json();
    }).then(result => {

        if (result.status === 'Error') {

            $.LoadingOverlay("hide", true);

            toastr.error('Oops! An Error Occurred');

        } else {

            toastr.success('บันทึกสำเร็จ')

            $.List(result)

            $('#modal-frm_remark').modal('hide');


        }

    });

};

$.Remark_Delete = async function () {

    let add_data = {
        tr_number: $('#remark_tr_number').val(),
        tr_scan: $('#remark_tr_barcode').val(),
        created_by: user_id,
    };

    var params = [];
    for (const i in add_data) {
        params.push(i + "=" + encodeURIComponent(add_data[i]));
    }

    fetch(url_check_tr_remark_delete, {
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

            if (result.data[0]['tr_detail_qty_remark'] > 0) {

                toastr.error('ลบไม่สำเร็จ');

            } else {

                toastr.warning('ลบสำเร็จ');
                $.List(result)
                $('#modal-frm_remark').modal('hide');
            }
        }

    }).catch(error => {

        toastr.error('Error, Please contact administrator.');

    });

};

