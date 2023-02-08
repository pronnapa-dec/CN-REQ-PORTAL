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
const trp_tms_job_pktotms_search = url_api + 'v1/trp_tms_job_pktotms_search';
const url_tms_job_get = 'https://vsk.tms-vcargo.com/api/tms/v1/public/dailydelivery/report';

const objProfile = JSON.parse(localStorage.getItem('objProfile'));

let mode;
let oTable,name, validator, table, options, item_action, item_id;
let cn_salefile_number, cn_pre_job_jobno, cn_route_no, cn_route_name;
let add_data = [];
let citem_job = [];

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

                driver_plate_list.push({ id: val['code'], text: val['firstNameTh'] + ' ' + val['firstNameTh'] + ' (' + val['code'] + ')' });

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

    $.LoadingOverlay("show", {
        image: '',
        custom: customElement
    });

    let url = new URL(trp_tms_job_pktotms_search);

    let job_start_date = $('#job_date').val() != '' ? moment($('#job_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00:00' : moment().format('YYYY-MM-DD') + ' 00:00:00';  //ถ้าไม่เลือกจะเป็นค่าว่าง
    let job_end_date = $('#job_date').val() != '' ? moment($('#job_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59:59' : moment().format('YYYY-MM-DD') + ' 23:59:59';
    let toption = $('#toption').val() != '' ? $('#toption').val()  : 99

    url.search = new URLSearchParams({
        mode: 'search',
        job_start_date: job_start_date,
        job_end_date: job_end_date,
        toption: toption
    });

    let oTable_dataset = [];

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
                scrollX: true,
                scrollCollapse: true,
                autoWidth: true,
                paging: false,
                dom: 'iBfrtp',
                colReorder: true,
                buttons: [
                    {
                        extend: 'excelHtml5',
                        /*
                        exportOptions: {
                            columns: [1, 3, 11, 9, 5, 4, 15, 6, 7, 12, 13, 14]
                            // วันที่,สายส่ง,ทะเบียนรถ,เลขที่บิล,เลขที่ใบงาน
                            // 
                        }
                        */
                    },
                ],
                columns: [
                    {
                        title: "invdate",
                        data: "invdate",
                        visible: false
                    }, //0
                    {
                        title: " วันที่",
                        data: "invdate",
                        width: "100px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return moment(data).format('DD/MM/YYYY');
                        }
                    }, //1
                    {
                        title: " เลขที่บิล",
                        data: "number",
                        width: "100px",
                        class: "tx-center",

                    },//2
                    {
                        title: " ใบสั่งจัด",
                        data: "invpo",
                        width: "120px",
                        class: "tx-center",

                    },//2
                    {
                        title: "รหัสลูกค้า",
                        data: "invcode",
                        width: "120px",
                        class: "tx-center",

                    },//2
                    {
                        title: "ลูกค้า",
                        data: "invname",
                        width: "120px",
                        class: "tx-center",

                    },//2

                    {
                        title: " วัน/เวลา สั่งจัด",
                        data: "inv_startdate",
                        width: "120px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return moment(data).format('DD/MM/YYYY HH:mm');
                        }
                    }, //1
                    {
                        title: "ตรวจสอบ โดย",
                        data: "chkuserid",
                        width: "100px",
                        class: "tx-center",

                    },//2
                    {
                        title: " วัน/เวลา ตรวจสอบ",
                        data: "chktime",
                        width: "120px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return moment(data).format('DD/MM/YYYY HH:mm');
                        }
                    }, //1
                    {
                        title: "ระยะเวลาจัดสินค้า",
                        data: "chktime",
                        width: "120px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {

                          
                            var inv_startdate = row.inv_startdate;
                            var chktime = row.chktime;
                     
                            let str_h = moment.utc(moment(chktime).diff(moment(inv_startdate))).format("HH");

                            let str_m = moment.utc(moment(chktime).diff(moment(inv_startdate))).format("mm");

                            let str_s = moment.utc(moment(chktime).diff(moment(inv_startdate))).format("ss");

                            if (Math.round(Number(str_m) + (Number(str_h) * 60) + (str_s / 60)) >= '1438' || Math.round(Number(str_m) + (Number(str_h) * 60) + (str_s / 60)) <= '1440') {
                                return '0'
                            } else {
                                return Math.round(Number(str_m) + (Number(str_h) * 60) + (str_s / 60));
                            }

                            

                            //return moment.utc(moment(chktime).diff(moment(inv_startdate))).format("HH:mm:ss")
                        }
                    }, //1
                   
                    {
                        title: "ออกบิล โดย",
                        data: "userid",
                        width: "100px",
                        class: "tx-center",

                    },//2

                    {
                        title: " วัน/เวลา ออกบิล",
                        data: "startdate",
                        width: "120px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return moment(data).format('DD/MM/YYYY HH:mm');
                        }
                    }, //1
                    {
                        title: "ระยะเวลาออกบิล",
                        data: "chktime",
                        width: "120px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {


                            var chktime = row.chktime;
                            var startdate = row.startdate;

                            let str_h = moment.utc(moment(startdate).diff(moment(chktime))).format("HH");

                            let str_m = moment.utc(moment(startdate).diff(moment(chktime))).format("mm");

                            let str_s = moment.utc(moment(startdate).diff(moment(chktime))).format("ss");

                            if (Math.round(Number(str_m) + (Number(str_h) * 60) + (str_s / 60)) >= '1438' || Math.round(Number(str_m) + (Number(str_h) * 60) + (str_s / 60)) <= '1440') {
                                return '0'
                            } else {
                                return Math.round(Number(str_m) + (Number(str_h) * 60) + (str_s / 60));
                            }


                           // return moment.utc(moment(startdate).diff(moment(chktime))).format("HH:mm:ss")
                        }
                    }, //1
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
                            if (moment(data).format('DD/MM/YYYY HH:mm') === '01/01/1900 00:00' || moment(data).format('DD/MM/YYYY HH:mm') === '01/01/0001 00:00') {
                                return '-';
                            } else {
                                return moment(data).format('DD/MM/YYYY HH:mm');
                            }
                        }
                    },//6
                    {
                        title: "ระยะเวลารับงาน",
                        data: "created_date",
                        width: "120px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {

                            if (moment(data).format('DD/MM/YYYY HH:mm') === '01/01/1900 00:00' || moment(data).format('DD/MM/YYYY HH:mm') === '01/01/0001 00:00') {
                                return '-';
                            } else {
                                var startdate = row.startdate;
                                var created_date = row.created_date;

                                let str_h = moment.utc(moment(created_date).diff(moment(startdate))).format("HH");

                                let str_m = moment.utc(moment(created_date).diff(moment(startdate))).format("mm");

                                let str_s = moment.utc(moment(created_date).diff(moment(startdate))).format("ss");

                                return Math.round(Number(str_m) + (Number(str_h) * 60) + (str_s / 60));

                                //return moment.utc(moment(created_date).diff(moment(startdate))).format("HH:mm:ss")
                            }

                         
                        }
                    }, //1
                    {
                        title: "จัดส่งสำเร็จ",
                        data: "tms_job_delivery_date",
                        width: "140px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {

                            if (moment(data).format('DD/MM/YYYY HH:mm') === '01/01/1900 00:00' || moment(data).format('DD/MM/YYYY HH:mm') === '01/01/0001 00:00') {
                                return '-';
                            } else {
                                return moment(data).format('DD/MM/YYYY HH:mm');
                            }

                        }
                    },//7

                    {
                        title: "ระยะเวลาจัดส่ง",
                        data: "tms_job_delivery_date",
                        width: "120px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {

                            if (moment(data).format('DD/MM/YYYY HH:mm') === '01/01/1900 00:00' || moment(data).format('DD/MM/YYYY HH:mm') === '01/01/0001 00:00') {
                                return '-';
                            } else {
                                var tms_job_delivery_date = row.tms_job_delivery_date;
                                var created_date = row.created_date;


                                let str_h = moment.utc(moment(tms_job_delivery_date).diff(moment(created_date))).format("HH");

                                let str_m = moment.utc(moment(tms_job_delivery_date).diff(moment(created_date))).format("mm");

                                let str_s = moment.utc(moment(tms_job_delivery_date).diff(moment(created_date))).format("ss");

                                return Math.round(Number(str_m) + (Number(str_h) * 60) + (str_s / 60));


                                //return moment.utc(moment(tms_job_delivery_date).diff(moment(created_date))).format("HH:mm:ss")
                            }

                        }
                    }, //1

                    {
                        title: "ระยะเวลาสั่งจัด-ส่งมอบ",
                        data: "tms_job_delivery_date",
                        width: "120px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {

                            if (moment(data).format('DD/MM/YYYY HH:mm') === '01/01/1900 00:00' || moment(data).format('DD/MM/YYYY HH:mm') === '01/01/0001 00:00') {
                                return '-';
                            } else {
                                var tms_job_delivery_date = row.tms_job_delivery_date;
                                var inv_startdate = row.inv_startdate;

                                let str_h = moment.utc(moment(tms_job_delivery_date).diff(moment(inv_startdate))).format("HH");

                                let str_m = moment.utc(moment(tms_job_delivery_date).diff(moment(inv_startdate))).format("mm");

                                let str_s = moment.utc(moment(tms_job_delivery_date).diff(moment(inv_startdate))).format("ss");

                                return Math.round(Number(str_m) + (Number(str_h) * 60) + (str_s /60));

                               // return moment.utc(moment(tms_job_delivery_date).diff(moment(inv_startdate))).format("HH:mm:ss")
                            }

                        }
                    }, //1
                    {
                        title: " พนักงานขับรถ",
                        data: "driver_fullname",
                        width: "150px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {


                            if (data.substring(0, 1) == '0') {

                                let objDriver = JSON.parse(localStorage.getItem('objTRPDriver'));

                                let driver_name = objDriver.filter(obj => obj.id === data);

                                return driver_name[0]['text']

                            } else {
                                return data;
                            }
                            
                        }
                    }, //9   
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