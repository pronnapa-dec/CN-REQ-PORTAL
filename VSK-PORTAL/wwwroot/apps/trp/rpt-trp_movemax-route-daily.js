'use strict';

const url_api = "http://localhost:49705/";
const api_key = "cOaI7TF@3am9Gc?89hqC(18)h{{G$dsaVt0$FnxpCf0vO%I2{Fp8?Y7rBcRqNNzv";
const url_trp_tms_job_search = url_api + 'v1/trp_tms_job_search';
const url_tms_job_get = 'https://vsk.tms-vcargo.com/api/tms/v1/public/dailydelivery/report';
const url_employee_movemax_get = "https://vsk.movemax.me/public-api/tms/v1/employee";
const url_vehicle_movemax_get = "https://vsk.movemax.me/public-api/tms/v1/vehicle";
const url_routeline_movemax_get = "https://vsk.movemax.me/public-api/tms/v1/routeline";
const url_shipmentdaily_movemax_get = "https://vsk.movemax.me/public-api/tms/v1/shipmentdaily/search";

const url_vsk_manifestnoteroute_list = url_api + '/v1/MM_ManiFestNoteRoute_List';
const url_vsk_manifestnotejob_list = url_api + '/v1/MM_ManifestNote_List';

const URL_TMS_JOB_DELIVERY_DAILY_LIST = url_api + '/v1/TMS_JOB_DELIVERY_DAILY_LIST';

const objProfile = JSON.parse(localStorage.getItem('objProfile'));

let ShipmentdailyList, DriverMessengerList, PlateList, RoutelineList, MM_manifestNoteList, MM_manifestNoteMulit, ProductMulitList = [];
let table_list;
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

    await $.init();
    await $.list();
    await $.master_get();
});

$.init = async function () {

    DriverMessengerList = await $.MM_Employee_Get("" /*code*/, "" /*positionName*/, "พนักงานขับรถมอเตอร์ไซค์" /*groupName*/);
    RoutelineList = await $.MM_Routeline_Get("" /*code*/, "" /*name*/);
    PlateList = await $.MM_Plate_Get("" /*licensePlate*/, "" /*name*/, "" /*province*/, "" /*vehicleBrandName*/, "" /*vehicleModelName*/, "" /*vehicleKind*/);

    console.log('DriverMessengerList', DriverMessengerList.data);
    console.log('RoutelineList', RoutelineList.data);
    console.log('PlateList', PlateList.data);

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

        //ShipmentdailyList = await $.MM_Shipmentdaily_Get();

        //console.log('ShipmentdailyList', ShipmentdailyList.data);

        await $.list(); //after search

    });

};

$.list = async function () {

    let url = new URL(url_vsk_manifestnoteroute_list);

    let job_start_date = $('#job_date').val() != '' ? moment($('#job_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment().format('YYYY-MM-DD') + ' 00:00';  //ถ้าไม่เลือกจะเป็นค่าว่าง
    let job_end_date = $('#job_date').val() != '' ? moment($('#job_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';

    url.search = new URLSearchParams({
        mode: 'search',
        job_start_date: job_start_date,
        job_end_date: job_end_date,
        f_driverCode: $('#driver_id').val(),
        f_endRouteLineCode: $('#route_no').val(),
        f_vehicleCode: $('#job_plate').val(),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            $("#global-loader").fadeOut("slow");

        } else {

            table_list = $('#tbl-list').DataTable({
                data: result.data,
                bDestroy: true,
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
                            columns: [3, 6, 5, 7, 9, 10, 11, 12]
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
                        title: " วันที่",
                        data: "documentDate",
                        width: "10%",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return moment(data).format('DD/MM/YYYY');
                        }
                    }, //0
                    {
                        title: " สายส่ง",
                        data: "endRouteLineCode",
                        width: "10%",
                        class: "tx-left",
                        render: function (data, type, row, meta) {

                            let route_get = RoutelineList.data

                            let r_code = row.endRouteLineCode;

                            function isCherries(fruit) {
                                return fruit.code === r_code;
                            }

                            const r_data = route_get.find(isCherries)

                            return r_data.nameTh;
                        }
                    }, //0
                    {
                        title: " พนักงานขับรถ",
                        data: "driverCode",
                        width: "15%",
                        class: "tx-left",
                        render: function (data, type, row, meta) {

                            let driver_get = DriverMessengerList.data

                            let r_code = row.driverCode;

                            function isCherries(fruit) {
                                return fruit.code === r_code;
                            }

                            const r_data = driver_get.find(isCherries)

                            let driver_concat = $.trim(r_data.code + ' : ' + r_data.firstnameTh + ' ' + r_data.lastnameTh);

                            return driver_concat;
                        }
                    }, //0
                    {
                        title: " ทะเบียนรถ",
                        data: "vehicleCode",
                        width: "10%",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: " จำนวนจุดส่ง",
                        data: "receiver_code",
                        width: "100px",
                        class: "tx-right",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: " จำนวนบิล",
                        data: "orderNo",
                        width: "100px",
                        class: "tx-right",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: " จำนวนเงิน",
                        data: "deliveryPrice",
                        width: "100px",
                        class: "tx-right",
                        render: function (data, type, row, meta) {
                            return data.toFixed(2);
                        }
                    }, //0
                    {
                        title: " TMS Upload",
                        data: "created_date",
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

                            let url_report = "http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_MM_JOB_SHIPPING&rs:Command=Render&documentDate=" + moment(row.documentDate).format('YYYY/MM/DD') + "&endRouteLineCode=" + row.endRouteLineCode + "&driverCode=" + row.driverCode + "&vehicleCode=" + row.vehicleCode + "&rs:Format=pdf"
                            //let url_report = "http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_TRP_TMS_JOB&rs:Command=Render&ref_id=" + row.ref_id + "&rs:Format=pdf"
                            console.log('url_report', url_report)
                            return '<a href="' + url_report + '"  target="_blank"><span class="badge badge-primary"><i class="fas fa-print"></i></span></a>';

                        }
                    }, //0
                ],
                "order": [[0, "desc"]],
                "initComplete": function (settings, json) {
                    $("#global-loader").fadeOut("slow");


                },
            });

        }
    })

};

$.MM_Employee_Get = async function (code, positionName, groupName) {

    let result = await fetch(url_employee_movemax_get, {
        method: "POST",
        headers: {
            Authorization: api_key,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: null,
            code: code == "" ? null : code,
            firstname: null,
            lastname: null,
            positionName: positionName == "" ? null : positionName,
            groupName: groupName == "" ? null : groupName,
            employeeType: 1,
            distributionCenterCode: null,
            companyAcronym: null,
            subCode: null,
            pagination: {
                limitItem: 100,
                currentPage: 1,
            },
        }),
    }).then((response) => {
        return response.json();
    }).then((data) => {
        return data;

        //console.log(data)
    });

    return result;

};

$.MM_Plate_Get = async function (licensePlate, name, province, vehicleBrandName, vehicleModelName, vehicleKind) {

    let result = await fetch(url_vehicle_movemax_get, {
        method: "POST",
        headers: {
            Authorization: api_key,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: null,
            licensePlate: licensePlate == "" ? null : licensePlate,
            name: name == "" ? null : name,
            province: province == "" ? null : province,
            vehicleBrandName: vehicleBrandName == "" ? null : vehicleBrandName,
            vehicleModelName: vehicleModelName == "" ? null : vehicleModelName,
            vehicleKind: vehicleKind == "" ? null : vehicleKind,
            vehicleTypeCode: null,
            vehicleGroupName: null,
            ownerType: null,
            vehicleCompanyAcronym: null,
            vehicleSubCode: null,
            pagination: {
                limitItem: 1000,
                currentPage: 1,
            },
        }),
    }).then((response) => {
        return response.json();
    }).then((data) => {
        return data;

        //console.log(data)
    });

    return result;

};

$.MM_Routeline_Get = async function (code, name) {

    let result = await fetch(url_routeline_movemax_get, {
        method: "POST",
        headers: {
            Authorization: api_key,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: null,
            code: code == "" ? null : code,
            name: null,
            pagination: {
                totalItem: 0,
                limitItem: 100,
                currentPage: 1,
            },
        }),
    }).then((response) => {
        return response.json();
    }).then((data) => {
        return data;

        //console.log(data)
    });

    return result;

};

$.master_get = async function () {

    if (DriverMessengerList.data != undefined) {

        let Master_dataSet = [];

        $.each(DriverMessengerList.data, function (key, val) {

            Master_dataSet.push({ id: val['code'], text: (val['code'] + ' : ' + val['firstnameTh'] + ' ' + val['lastnameTh']), tel: val['tel'], email: val['email'] });

        });

        $('#driver_id').select2({
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

    } else {

        toastr.warning('ไม่พบข้อมูลพนักงาน');

    }

    if (RoutelineList.data.length != undefined) {

        let Master_dataSet = [];

        $.each(RoutelineList.data, function (key, val) {

            Master_dataSet.push({ id: val['code'], text: val['nameTh'] });

        });

        $('#route_no').select2({
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

    } else {

        toastr.warning('ไม่พบข้อมูลทะเบียนรถ');

    }

    if (PlateList.data.length != undefined) {

        let Master_dataSet = [];

        $.each(PlateList.data, function (key, val) {

            Master_dataSet.push({ id: val['licensePlate'], text: val['licensePlate'] });

        });

        $('#job_plate').select2({
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

    } else {

        toastr.warning('ไม่พบข้อมูลทะเบียนรถ');

    }


    $('#emmas_code').select2({
        minimumInputLength: 1,
        minimumResultsForSearch: 10,
        dropdownAutoWidth: true,
        delay: 500,
        ajax: {
            url: 'http://192.168.1.247/vsk-api-acc/api/ACC/VSK_Emmas_Select2_GET',
            dataType: 'json',
            width: 'resolve',
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
        },
        escapeMarkup: function (markup) {
            return markup;
        },
    })

}
