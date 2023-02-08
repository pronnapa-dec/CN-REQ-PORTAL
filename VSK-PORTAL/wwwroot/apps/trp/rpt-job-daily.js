'use strict';

const url_api = "http://localhost:49705/";

const url_report = "http://192.168.1.247/tms-rpt-test/ViewReport?";

const url_cn = "http://192.168.1.247/intranet/pur-api/v1/Cn_Pre_Job_Get?record_status=1&mode=search&cn_pre_job_datetime_start=2020-01-29"
const url_supplier = "http://192.168.1.247/vsk-api-acc/api/ACC/VSK_Apmas_GET?";
const url_br = 'http://192.168.1.247/intranet/br-api/api/Br_Brtra_Get_v1?';
const url_trp_tms_job_search = url_api + 'v1/trp_tms_job_search';
const url_tms_job_get = 'https://vsk.tms-vcargo.com/api/tms/v1/public/dailydelivery/report';

const URL_TMS_JOB_DELIVERY_DAILY_LIST = url_api + '/v1/TMS_JOB_DELIVERY_DAILY_LIST';

const objProfile = JSON.parse(localStorage.getItem('objProfile'));

let mode;
let table_list, name, validator, table, options, item_action, item_id;
let cn_salefile_number, cn_pre_job_jobno, cn_route_no, cn_route_name;
let add_data = [];
let citem_job = [];
let table_list_dataset = [];
let chk_dataset = [];
let driver_plate_list = [];

let customElement = $("<div>", {
    "css": {
        "border": "2px solid",
        "font-size": "14px",
        "text-align": "center",
        "padding": '7px'

    },
    "text": 'Please Wait...'
});

$(document).ready(async function () {

    await $.master_get();
    await $.init();
    await $.list();

    // alert('hello')
    //$.LoadingOverlay("show");
});

$.init = function () {

    $('#delivery_type').select2()

    $('.date-picker').daterangepicker({
        locale: {
            format: 'DD/MM/YYYY'
        },
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    });

    $('#frm_data').submit(async function (e) {

        e.preventDefault();

        $("#global-loader").fadeIn("slow");

        $.list(); //after search

    });

};

$.list = async function () {

    let url = new URL(URL_TMS_JOB_DELIVERY_DAILY_LIST);

    let job_start_date = $('#job_date').val() != '' ? moment($('#job_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00:00.000' : moment().format('YYYY-MM-DD') + ' 00:00:00.000';  //ถ้าไม่เลือกจะเป็นค่าว่าง
    let job_end_date = $('#job_date').val() != '' ? moment($('#job_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59:59.000' : moment().format('YYYY-MM-DD') + ' 23:59:59.000';

    url.search = new URLSearchParams({
        mode: 'MAIN_LIST',
        job_start_date: job_start_date,
        job_end_date: job_end_date,
        route_no: $('#route_no').val() === '' ? '' : $('#route_no').val(),
        driver_id: $('#driver_id').val() === '' ? '' : $('#driver_id').val(),
        job_plate: $('#job_plate').val() === '' ? '' : $('#job_plate').val(),
        delivery_type: $('#delivery_type').val() === '' ? '' : $('#delivery_type').val(),
        job_no: $('#job_no').val() === '' ? '' : $('#job_no').val(),
        job_number: $('#job_number').val() === '' ? '' : $('#job_number').val(),
        ref_id: '',
        payment_type: '',

    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        if (result.status === 'Error') {

            $("#global-loader").fadeOut("slow");

        } else {

            table_list = $('#table-list').DataTable({
                "data": result.data,
                dom: '<Bf<t>lip>',
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "ค้นหา..."
                },
                deferRender: true,
                ordering: true,
                pageLength: 10,
                bDestroy: true,
                autoWidth: false,
                buttons: [
                    'copyHtml5',
                    {
                        extend: 'excelHtml5',
                        title: '',
                        filename: 'REPORT_Job_Daily_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                        exportOptions: {
                            columns: [2, 3, 4, 5, 8, 9, 10, 11, 13, 14, 15, 17, 19, 20, 21, 24]
                        }
                    },
                ],
                lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                columns: [
                    {
                        title: "#",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            // return (meta.row) + 1;
                            return '<a href="javascript:void(0)"><i class="si si si-plus show-detail tx-primary tx-15"></i></a>';
                        }
                    }, //0
                    {
                        title: "trans_id",
                        data: "trans_id",
                        class: "tx-center align-middle",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //0
                    {
                        title: "<div class='text-center'>เลขที่เอกสาร</div>",
                        data: "job_no",
                        class: "tx-left align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<div class='text-center'>วันที่เอกสาร</div>",
                        data: "job_date",
                        class: "align-middle",
                        width: "45px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-center tx-12">' + moment(data, 'YYYY/MM/DD').format('DD/MM/YYYY') + '<span/>';
                        }
                    }, //2
                    {
                        title: "<div class='text-center'>เลขที่ใบสั่งซื้อ</div>",
                        data: "job_invoice_no",
                        class: "tx-left align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<div class='text-center'>เลขที่ใบสั่งจัด</div>",
                        data: "job_pk_no",
                        class: "tx-left align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<div class='text-center'>เลขที่อ้างอิง</div>",
                        class: "tx-left align-end",
                        width: "150px",
                        //visible: false,
                        render: function (data, type, row, meta) {

                            let job_type;

                            if (row.route_name === 'ส่งสินค้าด่วน') {
                                job_type = 'primary'
                            } else if (row.route_name === 'รับสินค้า Supplier') {
                                job_type = 'info'
                            } else if (row.route_name === 'จัดส่งสินค้าสาขา') {
                                job_type = 'warning'
                            } else if (row.route_name === 'รับคืนสินค้าลูกค้า') {
                                job_type = 'dark'
                            }

                            return '<span class="tx-12 tx-bold mr-1 mb-1">เอกสาร : </span> <span style="font-size:13px;" class="text-primary tx-bold">' + row.job_no + '</span>' +
                                '<br>' +
                                '<hr class="mb-1 mt-1">' +
                                '<span class="tx-12 tx-bold mr-2">สั่งซื้อ : </span> <span class="tx-12 tx-bold">' + row.job_invoice_no + '</span>' +
                                '<br>' +
                                '<span class="tx-12 tx-bold mr-2">สั่งจัด : </span> <span class="tx-12 tx-secondary tx-bold">' + row.job_pk_no + '</span>' +
                                '<br>' +
                                '<div class="tx-center">' +
                                '<span class="mt-1 w-100 badge badge-primary">' + row.route_name + '</span>' +
                                '<\div>'
                        }
                    }, //4
                    {
                        title: "<div class='text-center'>ลูกค้า ที่อยู่</div>",
                        class: "tx-left align-end",
                        width: "500px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            let job_emmas_addres = ''
                            let d_job_emmas_addres = (row.job_emmas_addres == null) ? '' : row.job_emmas_addres
                            if (row.job_emmas_addres == row.job_delivery_addr) {
                                job_emmas_addres == ''
                            } else {
                                job_emmas_addres = d_job_emmas_addres
                            }

                            return '<span class="tx-12 tx-bold mr-1 mb-1">รหัส : </span> <span class="tx-12 tx-left tx-bold mb-1 mr-1">' + row.invcode + '</span>' +
                                '<br>' +
                                '<span class="tx-12 tx-bold mr-1 mb-1">ชื่อ : </span><span class="tx-12 tx-left">' + row.job_delivery_name + '</span>' +
                                '<br>' +
                                '<span class="tx-12 tx-bold mr-1 mb-1">ที่อยู่ : </span><span class="tx-12 tx-left">' + d_job_emmas_addres + '</span>' +
                                '<hr class="mb-1 mt-1">' +
                                '<span class="tx-12 tx-bold">จัดส่ง : </span>' + '<span class="tx-12 tx-left">' + row.job_delivery_addr + '</span>';
                        }
                    }, //show
                    {
                        title: "<div class='text-center'>รหัสลูกค้า</div>",
                        data: "invcode",
                        class: "tx-left align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //hide
                    {
                        title: "<div class='text-center'>ชื่อลูกค้า</div>",
                        data: "job_delivery_name",
                        class: "tx-left align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //hide
                    {
                        title: "<div class='text-center'>ที่อยู่เดิมลูกค้า</div>",
                        data: "job_emmas_addres",
                        class: "tx-left align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //hide
                    {
                        title: "<div class='text-center'>ที่อยู่จัดส่ง</div>",
                        data: "job_delivery_addr",
                        class: "tx-left align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //hide
                    {
                        title: "<div class='text-center'>ข้อมูลพนักงาน</div>",
                        class: "tx-left align-end",
                        width: "130px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12 tx-bold mr-1 mb-1">เบอร์ : </span> <span class="tx-12 tx-right mb-1">' + row.driver_id + '</span>' +
                                '<br>' +
                                '<hr class="mb-1 mt-1">' +
                                '<span class="tx-12 tx-bold mr-1 mb-1">ชื่อ : </span> <span class="tx-12 tx-left">' + row.driver_fullname + '</span>' +
                                '<br>' +
                                '<span class="tx-12 tx-bold mr-1 mb-1">ทะเบียน : </span> <span class="tx-12 tx-left">' + row.plate_name + '</span>';

                        }
                    }, //show
                    {
                        title: "<div class='text-center'>รหัสพนักงาน</div>",
                        data: "driver_id",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //hide
                    {
                        title: "<div class='text-center'>ชื่อพนักงาน</div>",
                        data: "driver_fullname",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //hide

                    {
                        title: "<div class='text-center'>ประเภท</div>",
                        data: "route_name",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //hide
                    {
                        title: "ประเภท",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            let job_type;

                            if (row.route_name === 'ส่งสินค้าด่วน') {
                                job_type = 'primary'
                            } else if (row.route_name === 'รับสินค้า Supplier') {
                                job_type = 'info'
                            } else if (row.route_name === 'จัดส่งสินค้าสาขา') {
                                job_type = 'wanring'
                            } else if (row.route_name === 'รับคืนสินค้าลูกค้า') {
                                job_type = 'dark'
                            }

                            return '<span class="badge badge-' + job_type + '">' + row.route_name + '</span>';
                        }
                    }, //hide
                    {
                        title: "COD",
                        data: "cod_price",
                        class: "tx-right align-end",
                        render: function (data, type, row, meta) {

                            let cod_price_full = numberWithCommas(data);

                            cod_price_full = cod_price_full > '0' ? '<p class="tx-bold tx-danger"><u class="tx-bold tx-success mr-1">' + cod_price_full + '</u>฿</p>' : cod_price_full

                            return cod_price_full;
                        }
                    }, //show
                    {
                        title: "สร้าง",
                        data: "created_by",
                        class: "tx-center align-end",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + row.created_by + '<hr class="mb-1 mt-1">' + moment(row.created_datetime).format("DD/MM/YYYY HH:mm:ss") + '</span>';
                        }
                    }, //show
                    {
                        title: "ผู้สร้างเอกสาร",
                        data: "created_by",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + data + '</span>';
                        }
                    }, //hide
                    {
                        title: "เวลาที่สร้าง",
                        data: "created_datetime",
                        class: "tx-center align-middle",
                        //width: "190px",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span class="tx-12">' + moment(data).format("DD/MM/YYYY HH:mm:ss") + '<span/>';
                        }
                    }, //hide
                    {
                        title: "สถานะ",
                        class: "tx-center align-end",
                        //width: "190px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            let tx, cl = ''
                            if (row.statusId == '1' || row.statusId == '2') {
                                cl = 'dark'
                            } else if (row.statusId == '3' || row.statusId == '4') {
                                cl = 'success'
                            } else if (row.statusId == '5') {
                                cl = 'danger'
                            } else {
                                cl = 'secondary'
                            }
                            let status = row.status == null ? '-' : row.status

                            return '<div class="row justify-content-center">' +
                                '<div class="col-12">' +
                                '<span class="tx-12 w-100 badge badge-primary">' + 'เปิดเอกสาร' + '</span>' +
                                '<span class="tx-12 w-50 badge badge-warning">' + row.created_by + '</span>' +
                                '<span class="tx-9 w-50 badge badge-warning">' + moment(row.created_datetime).format("DD/MM/YYYY HH:mm:ss") + '</span>' +
                                '<hr class="mb-1 mt-1">' +
                                '<span class="tx-12 w-100 badge badge-' + cl + '">' + status + '</span>' +
                                '<span class="tx-9 w-100 badge bd bd-1 bd-' + cl + '">' + moment(row.currentStatusDate).format("DD/MM/YYYY HH:mm:ss") + '</span>' +
                                '</div >' +

                                '</div >';
                        }
                    }, //show
                    {
                        title: "record_status",
                        data: "record_status",
                        visible: false
                    }, //hide      
                    {
                        title: "job_plate",
                        data: "job_plate",
                        visible: false
                    }, //hide       
                    {
                        title: "status",
                        data: "status",
                        visible: false
                    }, //hide
                    {
                        title: "statusId",
                        data: "statusId",
                        visible: false
                    }, //hide
                    {
                        title: "currentStatusDate",
                        data: "currentStatusDate",
                        visible: false
                    }, //hide
                    {
                        title: " ทะเบียนรถ",
                        data: "plate_name",
                        width: "150px",
                        class: "tx-center",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //hide
                ],
                initComplete: function (settings, json) {

                    $(".loader-spinner").addClass("d-none");

                    $("#global-loader").fadeOut("slow");

                    $('#table-list tbody').off('click', '.show-detail').on('click', '.show-detail', async function (e) {

                        e.preventDefault()

                        var data = table_list.row($(this).parents('tr')).data();
                        var tr = $(this).closest('tr');
                        var row = table_list.row(tr);
                        console.log(data)
                        //$.Frm_Memo(data.job_no);

                        if (row.child.isShown()) {

                            row.child.hide();
                            tr.removeClass('shown');

                        }
                        else {

                            $.pck_inv(row.child,data);
                            tr.addClass('shown');
                        }

                    });

                },
            });

        }
    })

};

$.pck_inv = function format(callback,citem) {

    let url = new URL(URL_TMS_JOB_DELIVERY_DAILY_LIST);

    let job_start_date = $('#job_date').val() != '' ? moment($('#job_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00:00.000' : moment().format('YYYY-MM-DD') + ' 00:00:00.000';  //ถ้าไม่เลือกจะเป็นค่าว่าง
    let job_end_date = $('#job_date').val() != '' ? moment($('#job_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59:59.000' : moment().format('YYYY-MM-DD') + ' 23:59:59.000';

    url.search = new URLSearchParams({
        mode: 'PCK_INV',
        job_start_date: job_start_date,
        job_end_date: job_end_date,
        ref_id: citem.job_pk_no,

    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        //$(".modal-body").LoadingOverlay("hide", true);

        if (result.length > 0) {

            let line_data = [];

            var data = result.data;
            var thead;


            thead = "<tr class='bg-warning tx-dark'>" + "<th class='border-bottom-0'>#</th>" +
                "<th class='border-bottom-0 tx-center'>วันที่บิล</th>" +
                "<th class='border-bottom-0 tx-center'>ใบซื้อ</th>" +
                "<th class='border-bottom-0 tx-center'>ใบจัด</th>" +
                "<th class='border-bottom-0 tx-center'>รหัส</th>" +
                "<th class='border-bottom-0 tx-center'>ชื่อ</th>" +
                "<th class='border-bottom-0 tx-center'>จำนวน</th>" + "</tr>" ;


            var tbody = '';

            let i = result.length

            $.each(data, function (key, val) {

                let salefile_number = val.salefile_number == null ? '' : val.salefile_number
                let salefile_name = val.salefile_name == null ? '' : val.salefile_name
                let salefile_invcode = val.salefile_invcode == null ? '' : val.salefile_invcode
                let salefile_invpo = val.salefile_invpo == null ? '' : val.salefile_invpo
                let salefile_item = val.salefile_item == null ? '' : val.salefile_item
                let salefile_startdate = val.salefile_startdate == null ? '' : val.salefile_startdate

                tbody += "<tr>" +
                    "<td>" + '<span class="tx-primary">' + i + '</span>' + "</td>" +
                    "<td>" + moment(salefile_startdate).format("DD/MM/YYYY")  + "</td>" +
                    "<td>" + salefile_number + "</td>" +
                    "<td>" + salefile_invpo + "</td>" +
                    "<td>" + salefile_invcode + "</td>" +
                    "<td>" + salefile_name + "</td>" +
                    "<td>" + salefile_item + "</td>" +
                    "</tr>";

                i--

            });

            callback($('<table id="table-pck_inv" class="table text-md-nowrap mb-0">' + thead + tbody + '</table>')).show();

        }
    });


};

$.master_get = async function () {

    fetch('http://192.168.1.247/vsk-api-job/api/TRP/TRP_Lov_Get?lov_type=Route%20No').then(function (response) {

        return response.json();

    }).then(function (result) {

        let driver_route_list = [];

        if (result.length > 0) {

            console.log(result)

            $.each(result.data, function (key, val) {
                if (val['active_flag'] === 'Y') {
                    driver_route_list.push({ id: val['lov2'], text: val['lov1'] });
                }
            });

            $('#route_no').select2({
                width: '100%',
                height: '40px',
                data: driver_route_list,
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

    fetch('http://192.168.1.247/vsk-api-job/api/TRP/TRP_Lov_Get?lov_type=Plate%20No').then(function (response) {

        return response.json();

    }).then(function (result) {

        let driver_plate_list = [];

        if (result.length > 0) {

            console.log(result)

            $.each(result.data, function (key, val) {
                if (val['active_flag'] === 'Y') {
                    driver_plate_list.push({ id: val['lov_code'], text: val['lov1'] });
                }
            });

            $('#job_plate').select2({
                width: '100%',
                height: '40px',
                data: driver_plate_list,
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

    fetch('https://vsk.tms-vcargo.com/api/tms/public/v1/driver/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code: "",
            name: ""
        })
    }).then(function (response) {

        return response.json();

    }).then(function (result) {

        if (result.statusCode === 200) {

            console.log(result)

            $.each(result.object, function (key, val) {

                driver_plate_list.push({ id: val['code'], text: val['firstNameTh'] + ' ' + val['lastNameTh'] + ' (' + val['code'] + ')' });

            });

            $('#driver_id').select2({
                width: '100%',
                height: '40px',
                data: driver_plate_list,
                templateResult: function (data) {
                    return data.text;
                }
            });

        }

    });

}

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        console.log(user);
        var full_mail = user.email;
        name = full_mail.replace("@vskautoparts.com", "");

    } else {

        window.location.assign('./login');

    }

});