'use strict';
/*
const url_api = "http://localhost:49705/";
const url_report = "http://localhost:55233/ViewReport?";
*/
//const url_api = "http://192.168.1.247/tms-api/";
//const url_api = "http://192.168.1.247/tms-api-test/";
//const url_report = "http://192.168.1.247/tms-rpt-test/ViewReport?";

const url_api = "http://localhost:49705/";

const url_cn = "http://192.168.1.247/intranet/pur-api/v1/Cn_Pre_Job_Get?record_status=1&mode=search&cn_pre_job_datetime_start=2020-01-29"
const url_supplier = "http://192.168.1.247/vsk-api-acc/api/ACC/VSK_Apmas_GET?";
const url_br = 'http://192.168.1.247/intranet/br-api/api/Br_Brtra_Get_v1?';
const url_trp_tms_job_route_search = url_api + 'v1/trp_tms_job_route_search';

const objProfile = JSON.parse(localStorage.getItem('objProfile'));

let table_list, mode;
let name, validator, table, options, item_action, item_id;
let cn_salefile_number, cn_pre_job_jobno, cn_route_no, cn_route_name;
let add_data = [];
let citem_job = [];

let customElement = $("<div>", {
    "css": {
        "border": "2px solid",
        "font-size": "14px",
        "text-align": "center",
        "padding": '7px'

    },
    "text": 'Please Wait...'
});

$.init = function () {

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

        await table_list.destroy();

        await $.List(); //after search

    });

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

        let driver_plate_list = [];

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
                },/*
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    });
                }
                */
            });

        }
    });
};

$.List = async function () {

    let url = new URL(url_trp_tms_job_route_search);

    let job_start_date = $('#job_date').val() != '' ? moment($('#job_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment().format('YYYY-MM-DD') + ' 00:00';  //ถ้าไม่เลือกจะเป็นค่าว่าง
    let job_end_date = $('#job_date').val() != '' ? moment($('#job_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';

    url.search = new URLSearchParams({
        mode: 'search',
        job_start_date: job_start_date,
        job_end_date: job_end_date,
        route_no: $('#route_no').val() === '' ? '' : $('#route_no').val(),
        driver_id: $('#driver_id').val() === '' ? '' : $('#driver_id').val(),
        job_plate: $('#job_plate').val() === '' ? '' : $('#job_plate').val()
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            $("#global-loader").fadeOut("slow");

        } else {

            table_list = $('#tbl-list').DataTable({
                data: result.data,
                scrollY: "450px",
                //scrollX: true,
                scrollCollapse: true,
                //autoWidth: true,
                paging: false,
                dom: '<Bf<t>lip>',
                colReorder: true,
                buttons: [
                    {
                        extend: 'excelHtml5',
                        title: '',
                        filename: 'Report_Route_Daily_' + moment().format("YYYY/MM/DD HH:mm:ss"),
                        exportOptions: {
                            columns: [3,6,5,7,9,10,11,12]
                        }
                    },
                ],
                columns: [
                    {
                        title: "#",
                        class: "tx-center align-middle",
                        render: function (data, type, row, meta) {
                            return (meta.row) + 1;
                        }
                    }, //0
                    {
                        title: "ref_id",
                        data: "ref_id",
                        visible: false
                    }, //0
                    {
                        title: "job_date",
                        data: "job_date",
                        visible: false
                    }, //0
                    {
                        title: " วันที่",
                        data: "job_date",
                        width: "100px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return moment(data).format('DD/MM/YYYY');
                        }
                    }, //0
                    {
                        title: " route_no",
                        data: "route_no",
                        visible: false

                    }, //0
                    {
                        title: " สายส่ง",
                        data: "route_name",
                        width: "150px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "driver_id",
                        data: "driver_id",
                        visible: false
                    }, //0
                    {
                        title: " พนักงานขับรถ",
                        data: "driver_fullname",
                        width: "140px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "job_plate",
                        data: "job_plate",
                        visible: false
                    }, //0
                    {
                        title: " ทะเบียนรถ",
                        data: "plate_name",
                        width: "110px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: " จำนวนจุดส่ง",
                        data: "truck_count",
                        width: "100px",
                        class: "tx-right",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: " จำนวนบิล",
                        data: "bill_count",
                        width: "100px",
                        class: "tx-right",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: " จำนวนเงิน",
                        data: "cod_price",
                        width: "100px",
                        class: "tx-right",
                        render: function (data, type, row, meta) {
                            return data.toFixed(2);
                        }
                    }, //0
                    {
                        title: " TMS Upload",
                        data: "upload_datetime",
                        width: "120px",
                        class: "tx-right",
                        render: function (data, type, row, meta) {
                            if (moment(data).format('DD/MM/YYYY HH:mm') === '01/01/1900 00:00' || moment(data).format('DD/MM/YYYY HH:mm') === '01/01/0001 00:00') {
                                return '-';
                            } else {
                                return moment(data).format('DD/MM/YYYY HH:mm');
                            }
                        }
                    }, //0
                    {
                        title: " พิมพ์ใบงาน",
                        data: "route_name",
                        width: "105px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {

                            let get_data = {
                                job_date: moment(row.job_date).format('YYYY-MM-DD'),
                                route_no: row.route_no,
                                driver_id: row.driver_id,
                                job_plate: row.job_plate
                            };

                            var params = [];
                            for (const i in get_data) {
                                params.push(i + "=" + encodeURIComponent(get_data[i]));
                            }

                            let url_report = "http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_TRP_TMS_JOB&rs:Command=Render&ref_id=" + row.ref_id + "&rs:Format=pdf"

                            return '<a href="' + url_report + '"><span class="badge badge-primary"><i class="fas fa-print"></i></span></a>';

                        }
                    }, //0
                ],
                "order": [[0, "desc"]],
                "initComplete": function (settings, json) {

                   
                },
            });

        }
    })

};

$(document).ready(async function () {

    await $.init();
    await $.List();

    // alert('hello')
    //$.LoadingOverlay("show");
});

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        console.log(user);
        var full_mail = user.email;
        name = full_mail.replace("@vskautoparts.com", "");

    } else {

        window.location.assign('./login');

    }

});