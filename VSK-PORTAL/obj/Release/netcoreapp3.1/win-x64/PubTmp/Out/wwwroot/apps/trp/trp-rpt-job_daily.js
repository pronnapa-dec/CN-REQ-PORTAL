'use strict';

const url_api = "http://localhost:49705/";
const url_report = "http://localhost:55233/ViewReport?";
/*
const url_api = "http://192.168.1.247/tms-api/";
const url_report = "http://192.168.1.247/tms-rpt/ViewReport?";
*/
const url_cn = "http://192.168.1.247/intranet/pur-api/v1/Cn_Pre_Job_Get?record_status=1&mode=search&cn_pre_job_datetime_start=2020-01-29"
const url_supplier = "http://192.168.1.247/vsk-api-acc/api/ACC/VSK_Apmas_GET?";
const url_br = 'http://192.168.1.247/intranet/br-api/api/Br_Brtra_Get_v1?';
const url_trp_tms_job_search = url_api + 'v1/trp_tms_job_search';
const url_tms_job_get = 'https://vsk.tms-vcargo.com/api/tms/v1/public/dailydelivery/report';

const objProfile = JSON.parse(localStorage.getItem('objProfile'));

let mode;
let oTable, name, validator, table, options, item_action, item_id;
let cn_salefile_number, cn_pre_job_jobno, cn_route_no, cn_route_name;
let add_data = [];
let citem_job = [];
let oTable_dataset = [];
let chk_dataset = [];
let driver_plate_list = [];

/*
let oTable = $('#tbl-list').DataTable({
    scrollY: "450px",
    scrollX: true,
    scrollCollapse: true,
    autoWidth: true,
    paging: false,
    dom: 'iBfrtp',
    colReorder: true,
    buttons: [
        'copy', 'excel'
    ],
});
*/
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
        autoUpdateInput: false,
        showDropdowns: true,
        opens: "right",
        locale: { cancelLabel: 'Clear' },
    }, function (start, end, label) {
        //console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });

    $('.date-picker').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('DD/MM/YYYY') + '-' + picker.endDate.format('DD/MM/YYYY'));
    });

    $('#frm_data').submit(async function (e) {

        e.preventDefault();

        await oTable.destroy();
        await $.LoadingOverlay("show");
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




};


$.List = async function () {

    let url = new URL(url_trp_tms_job_search);

    let job_start_date = $('#job_date').val() != '' ? moment($('#job_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00:00.000' : moment().format('YYYY-MM-DD') + ' 00:00:00.000';  //ถ้าไม่เลือกจะเป็นค่าว่าง
    let job_end_date = $('#job_date').val() != '' ? moment($('#job_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59:59.000' : moment().format('YYYY-MM-DD') + ' 23:59:59.000';

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
    }).then(async function (result) {

        if (result.status === 'Error') {

            $("#global-loader").fadeOut("slow");

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }).then((result) => {
                if (result.isConfirmed) {

                    location.reload();

                }
            })

        } else {


            oTable = $('#tbl-list').DataTable({
                data: result.data,
                scrollY: "450px",
                scrollX: false,
                scrollCollapse: true,
                autoWidth: true,
                paging: false,
                dom: 'iBfrtp',
                colReorder: true,
                buttons: [
                    {
                        extend: 'excelHtml5',
                        exportOptions: {
                            columns: [1, 3, 11, 9, 5, 4, 15, 16, 17, 18, 12, 13, 14]
                            // วันที่,สายส่ง,ทะเบียนรถ,เลขที่บิล,เลขที่ใบงาน
                            // 
                        }
                    },
                ],
                columns: [
                    {
                        title: "job_date",
                        data: "job_date",
                        visible: false
                    }, //0
                    {
                        title: " วันที่",
                        data: "job_date",
                        width: "120px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return moment(data).format('DD/MM/YYYY');
                        }
                    }, //1
                    {
                        title: " route_no",
                        data: "route_no",
                        visible: false

                    },//2
                    {
                        title: " สายส่ง",
                        data: "route_name",
                        width: "143px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    },//3
                    {
                        title: "เลขที่บิล",
                        data: "job_invoice_no",
                        width: "120px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    },//4
                    {
                        title: "เลขที่ใบงาน",
                        data: "job_no",
                        width: "130px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    },//5
                    {

                        title: "วัน/เวลา สร้าง",
                        data: "created_date",
                        width: "150px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return moment(data).format('DD/MM/YYYY HH:mm');
                        }
                    },//6
                    {
                        title: "จัดส่งสำเร็จ",
                        data: "tms_job_delivery_date",
                        width: "140px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {

                            if (moment(data).format('DD/MM/YYYY HH:mm') === '01/01/1900 00:00') {
                                return '-';
                            } else {
                                return moment(data).format('DD/MM/YYYY HH:mm');
                            }

                        }
                    },//7
                    {
                        title: "driver_id",
                        data: "driver_id",
                        visible: false
                    }, //8
                    {
                        title: " พนักงานขับรถ",
                        data: "driver_fullname",
                        width: "150px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {

                            /*
                            if (data.substring(0, 1) == '0') {

                                let objDriver = JSON.parse(localStorage.getItem('objTRPDriver'));

                                let driver_name = objDriver.filter(obj => obj.id === data);

                                return driver_name[0]['text']

                            } else {
                                return data;
                            }
                            */
                            if (data != null) {

                                if (data.substring(0, 1) == '0') {

                                    let objDriver = JSON.parse(localStorage.getItem('objTRPDriver'));

                                    let driver_name = objDriver.filter(obj => obj.id === data);

                                    return driver_name[0]['text']

                                } else {
                                    return data;
                                }

                            } else {

                                return data;
                            }

                        }
                    }, //9
                    {
                        title: "job_plate",
                        data: "job_plate",
                        visible: false
                    }, //10
                    {
                        title: " ทะเบียนรถ",
                        data: "plate_name",
                        width: "150px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //11
                    {
                        title: " เลขไมล์เริ่มต้น",
                        data: "startMile",
                        width: "150px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //12
                    {
                        title: " เลขไมล์สิ้นสุด",
                        data: "endMile",
                        width: "150px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //13
                    {
                        title: " รวมระยะทาง",
                        data: "totalMile",
                        width: "150px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //14
                    {
                        title: "ชื่อผู้รับ",
                        data: "job_delivery_name",
                        visible: false
                    },//15
                    {

                        title: "เวลาสร้าง",
                        data: "created_date",
                        width: "150px",
                        class: "tx-center",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return moment(data).format('HH:mm');
                        }
                    },//6
                    {
                        title: "จัดส่งสำเร็จ",
                        data: "tms_job_delivery_date",
                        width: "140px",
                        class: "tx-center",
                        visible: false,
                        render: function (data, type, row, meta) {

                            if (moment(data).format('DD/MM/YYYY HH:mm') === '01/01/1900 00:00') {
                                return '-';
                            } else {
                                return moment(data).format('HH:mm');
                            }

                        }
                    },//7


                    {
                        title: "สถานะจัดส่ง",
                        data: "tms_job_delivery_date",
                        width: "140px",
                        class: "tx-center",
                        visible: false,
                        render: function (data, type, row, meta) {

                            if (moment(data).format('DD/MM/YYYY HH:mm') === '01/01/1900 00:00') {
                                return 'รับสินค้าขึ้นรถ';
                            } else {
                                return row.status;
                            }

                        }
                    },//7
                    {
                        title: "สถานะจัดส่ง",
                        data: "status",
                        visible: false,
                    },//7

                ],
                "order": [[0, "desc"]],
                "initComplete": function (settings, json) {

                    let $buttons = $('.dt-buttons').hide();
                    $.LoadingOverlay("hide");
                    $('.btn-tbl_export').on('click', function (e) {

                        e.preventDefault();

                        let btnClass = '.buttons-' + $(this).data('export')

                        $buttons.find(btnClass).click();
                    });
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