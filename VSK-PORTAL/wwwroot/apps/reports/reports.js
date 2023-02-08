'use strict';

let fs = firebase.firestore();

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
const url_hr = "http://192.168.1.247:8899/hr-api";
const url_mrp = 'http://192.168.1.247:8082/mrp-api';
const url_report_get = url_api + "/api/Report_Get";
const url_master_data_customer = url_api + "/api/MasterDataCustomer";
const url_master_get = url_hr + '/api/Hr_Master_Get';
const url_mrp_itemMaster_vsk_sync = url_mrp + '/v1/MRP_ItemMaster_VSK_Sync'

let table_list;
const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const user_id = objProfile[0]['username'];
const application_id = objProfile[0]['application'];
const pos = application_id.split("-");

$(document).ready(async function () {

    await $.init();

});

$.init = async function () {

    $(".card-body").LoadingOverlay("show", {
        image: '',
        custom: customElement
    });

    console.log(urlParams.get('report_app'))
    console.log(pos[1])

    if (pos[1] == 'MRP') {

        $('.breadcrumb-header').append(
            '<div class="pd-l-10 mb-6 mb-xl-0">' +
            '<button id="btn-refresh" class="btn btn-danger btn-with-icon btn-block"><i class="fas fa-cloud-upload-alt"></i>Refresh VSM</button >' +
            '</div>'
        )
        $('#btn-refresh').addClass('d-none');
        $('#btn-refresh').off('click').on('click', function (e) {

            e.preventDefault();

            swal({
                title: 'Are you sure?',
                text: "Want to Synchronize from VSM Data ?!",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true
            }, function () {
                //setTimeout(function () {
                //    swal("Ajax request finished!");
                //}, 2000);
                fetch(url_mrp_itemMaster_vsk_sync).then(function (response) {
                    return response.json();
                }).then(function (result) {
                    //$.LoadingOverlay("hide")
                    swal(
                        {
                            title: 'Success!',
                            text: 'You clicked the button!',
                            type: 'success',
                            confirmButtonColor: '#57a94f'
                        }
                    )
                });
            });

            //Swal.fire({
            //    title: 'Are you sure?',
            //    text: "Want to Synchronize from VSM Data ?!",
            //    icon: 'warning',
            //    showCancelButton: true,
            //    confirmButtonColor: '#3085d6',
            //    cancelButtonColor: '#d33',
            //    confirmButtonText: 'Yes, Synchronize!'
            //}).then((result) => {
            //    if (result.isConfirmed) {
            //        $.LoadingOverlay("show", {
            //            image: '',
            //            custom: customElement
            //        });
            //        fetch(url_mrp_itemMaster_vsk_sync).then(function (response) {
            //            return response.json();
            //        }).then(function (result) {
            //            $.LoadingOverlay("hide")
            //        });
            //    }
            //})

        })
    }

    $('#modal-stl_target').off('hidden.bs.modal').on('hidden.bs.modal', async function () {

        await setTimeout(function () {

            location.reload();

        }, 100);

    });

    $('#modal-hr_pms').off('hidden.bs.modal').on('hidden.bs.modal', async function () {

        await setTimeout(function () {

            location.reload();

        }, 100);

    });

    $('#btn-search').on('click', async function (e) {

        e.preventDefault();

        //await tbl_carmodel_list.destroy();

        await $.report_list();

        $('.search_global_filter').removeClass('d-none');
        //await $.List('search');

    });

    $('.btn-reset').click(function (e) {

        e.preventDefault();

        $('.btn-gdishead-action').attr("data-action", "create");
        $('#frm_data').trigger('reset');
        $('#frm_data').find('input').val('').prop('disabled', false);
        $('#frm_data').find('select').val('').trigger('change.select2').prop('disabled', false);
        $("#frm_data").parsley().reset();

        $('.btn-ediscount-action').attr("data-action", "create");
        $('#frm_item').trigger('reset');
        $('#frm_item').find('input').val('').prop('disabled', false);
        $('#frm_item').find('select').val('').trigger('change.select2').prop('disabled', false);
        $("#frm_item").parsley().reset();

        $('.search_global_filter').addClass('d-none');
    });

    $.report_list();

    $(".card-body").LoadingOverlay("hide", true);
};

$.report_list = async function () {

    let url = new URL(url_report_get);

    url.search = new URLSearchParams({

        report_app: pos[1],
        report_branch: pos[0] == 'VSK' ? 'VSM' : pos[0],

    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        table_list = $('#table-list').DataTable({
            data: result.data,
            dom: '<f<t>lip>',
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
                    filename: 'REPORT' + moment().format("YYYY/MM/DD hh:ss:mm"),
                    //exportOptions: {
                    //    columns: [3, 4, 6, 7, 8, 9, 10, 11, 12, 15, 16]
                    //}
                },
            ],
            columns: [
                {
                    title: "<span style='font-size:11px;'>โปรเจค</span>",
                    data: "report_app",
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '<span/>';
                    }
                }, //0

                {
                    title: "<span style='font-size:11px;'>สาขา</span>",
                    data: "report_branch",
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                }, //1
                {
                    title: "<span style='font-size:11px;'>ชื่อรายงาน</span>",
                    data: "report_name",
                    class: "tx-center",
                    render: function (data, type, row, meta) {

                        let badge = ''
                        if (row.report_versions == 'MRPVSM0002') {
                            badge = '<span class="badge badge-danger">New</span>'
                        }

                        return '<div data-placement="top" data-toggle="tooltip-primary">' + '<a href="' + row.report_link + '" target="_blank"><b>' + data + '<b> ' + badge+'</a></div>'
                    }
                }, //2
                {
                    title: "<span style='font-size:11px;'>ลิงค์</span>",
                    data: "report_link",
                    visible: false,
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<div data-placement="top" data-toggle="tooltip-primary">' + '<a href="' + data + '" target="_blank"><b>' + data + '<b></a></div>'
                    }
                }, //3
                {
                    title: "<span style='font-size:11px;'>เวอร์ชั่น</span>",
                    data: "report_versions",
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;  color:;">' + data + '</span>';
                    }
                }, //4
                {
                    title: "<span style='font-size:11px;'>สถานะ</span>",
                    data: "record_status",
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        if (data == 1) {
                            return '<span class="badge badge-primary">ใช้งาน</span>';
                        } else {
                            return '<span class="badge badge-danger">ไม่ใข้งาน</span>'; 
                        }
                    }
                }, //5
            ],
            "initComplete": async function (settings, json) {

                $.contextMenu({
                    selector: '#tbl-list tbody tr',
                    callback: async function (key, options) {

                        let citem = table_list.row(this).data();

                        if (key === 'view') {

                            $.modal(citem);

                        } else if (key === 'edit') {

                        } else if (key === 'delete') {

                        } else {

                            alert('ERROR');

                        }

                    },
                    items: {

                        "view": { name: "View", icon: "fas fa-search" },

                    }

                });

            }

        });

    });

};

$.modal = async function (citem) {

    console.log('modal', citem)

    if (urlParams.get('report_app') == 'STL') {

        $.stl_target(citem);

    } else if (urlParams.get('report_app') == 'HR') {

        $.hr_pms(citem);

    } else {

        console.log('ERORR')

    }

};

$.stl_target = async function (citem) {

    await $('#modal-stl_target').modal({
        keyboard: false,
        backdrop: 'static'
    });

    $.master_stl_get();

    //$('#url_report').attr('src', "http://192.168.1.159/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_STL_Customer_Target&rs:Command=Render&year=&sale=&area=&channel=")
    $('#url_report').attr('src', "http://192.168.1.159/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_STL_Customer_Target&rs:Command=Render&sh_year=&sh_sale=&sh_area=&sh_channel=")

    $('#btn-save').off('click').on('click', function (evt) {

        evt.preventDefault();

        $(this).on('click', function (evt) {
            evt.preventDefault();
        });

        let search_area = $('#frm_stl_target').find('#search_area').val()
        let search_sale = $('#frm_stl_target').find('#search_sale').val()
        let search_year = $('#frm_stl_target').find('#search_year').val()
        let search_channel = $('#frm_stl_target').find('#search_channel').val()

        $('#url_report').attr('src', "http://192.168.1.159/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_STL_Customer_Target&rs:Command=Render&sh_year=" + search_year + "&sh_sale=" + search_sale + "&sh_area=" + search_area + "&sh_channel=" + search_channel + "")

        return false;
    });

};

$.hr_pms = async function (citem) {

    await $('#modal-hr_pms').modal({
        keyboard: false,
        backdrop: 'static'
    });

    $.master_hr_get();

    // $('#frm_hr_pms').find('#url_report').attr('src', "http://192.168.1.159/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_HR_ASSESS_FINAL&rs:Command=Render&")
    $('#frm_hr_pms').find('#url_report').attr('src', "http://192.168.1.159/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_HR_ASSESS_FINAL&rs:Command=Render&data_quarter=&data_employee_assess=&data_leader_assess=&employee_sec=&employee_dept=&employee_pos=&count_leader_assess=")


    $('#frm_hr_pms').find('#btn-search').off('click').on('click', function (evt) {

        evt.preventDefault();

        $(this).on('click', function (evt) {
            evt.preventDefault();
        });
        $('#frm_hr_pms').parsley().validate();
        let data_leader_assess = $('#frm_hr_pms').find('#search_leader').val() === '' ? '' : $('#frm_hr_pms').find('#search_leader').val()
        let data_employee_assess = $('#frm_hr_pms').find('#search_employee').val() === '' ? '' : $('#frm_hr_pms').find('#search_employee').val()
        let count_leader_assess = $('#frm_hr_pms').find('#search_status').val() === '' ? '' : $('#frm_hr_pms').find('#search_status').val()
        let employee_sec = $('#frm_hr_pms').find('#search_section').val() === '' ? '' : $('#frm_hr_pms').find('#search_section').val()
        let employee_dept = $('#frm_hr_pms').find('#search_department').val() === '' ? '' : $('#frm_hr_pms').find('#search_department').val()
        let employee_pos = $('#frm_hr_pms').find('#search_position').val() === '' ? '' : $('#frm_hr_pms').find('#search_position').val()
        let data_quarter = $('#frm_hr_pms').find('#search_quarter').val() === '' ? '' : $('#frm_hr_pms').find('#search_quarter').val()

        $('#frm_hr_pms').find('#url_report').attr('src', "http://192.168.1.159/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_HR_ASSESS_FINAL&rs:Command=Render&data_quarter=" + data_quarter + "&data_employee_assess=" + data_employee_assess + "&data_leader_assess=" + data_leader_assess + "&employee_sec=" + employee_sec + "&employee_dept=" + employee_dept + "&employee_pos=" + employee_pos + "&count_leader_assess=" + count_leader_assess + "")

        return false;
    });

};

$.master_stl_get = function () {

    /*Channel*/
    let url_channel = new URL(url_master_data_customer);

    url_channel.search = new URLSearchParams({
        mode: 'Channel'
    });

    fetch(url_channel).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $("#search_channel option").remove();
            $("#search_channel").append("<option value=''>---select---</option>")

            let dataSet = [];

            $.each(result.data, function (key, val) {

                dataSet.push({ id: val['channel'], text: val['channel'] });

            });

            $('#search_channel').select2({
                width: '100%',
                height: '40px',
                data: dataSet,
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
    /*Channel*/

    /*Area*/
    let url_area = new URL(url_master_data_customer);

    url_area.search = new URLSearchParams({
        mode: 'Area'
    });

    fetch(url_area).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $("#search_area option").remove();
            $("#search_area").append("<option value=''>---select---</option>")

            let dataSet = [];

            $.each(result.data, function (key, val) {

                dataSet.push({ id: val['area'], text: val['area'] });

            });

            $('#search_area').select2({
                width: '100%',
                height: '40px',
                data: dataSet,
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
    /*Area*/

    /*Sale*/
    let url_sale = new URL(url_master_data_customer);

    url_sale.search = new URLSearchParams({
        mode: 'Sale'
    });

    fetch(url_sale).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $("#search_sale option").remove();
            $("#search_sale").append("<option value=''>---select---</option>")

            let dataSet = [];

            $.each(result.data, function (key, val) {

                dataSet.push({ id: val['sales_representative'], text: val['sales_representative'] });

            });

            $('#search_sale').select2({
                width: '100%',
                height: '40px',
                data: dataSet,
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
    /*Sale*/

    /*Year*/
    let url_year = new URL(url_master_data_customer);

    url_year.search = new URLSearchParams({
        mode: 'Year'
    });

    fetch(url_year).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            $("#search_year option").remove();
            $("#search_year").append("<option value=''>---select---</option>")

            let dataSet = [];

            $.each(result.data, function (key, val) {

                dataSet.push({ id: val['year'], text: val['year'] });

            });

            $('#search_year').select2({
                width: '100%',
                height: '40px',
                data: dataSet,
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
    /*Year*/


};

$.master_hr_get = async function () {

    let url_Master = new URL(url_master_get);

    url_Master.search = new URLSearchParams({
        mode: 'employee_all',
    });
    fetch(url_Master).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            let Master_dataSet = [];

            //$("#search_employee option").remove();
            //$("#search_employee").append("<option value='' selected>--SELECT ALL--</option>").attr("value", '')

            $.each(result.data, function (key, val) {

                Master_dataSet.push({ id: val['id'], text: val['code'] + ' ' + val['text'] });

            });

            $('#frm_hr_pms').find('#search_employee').select2({
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

    url_Master.search = new URLSearchParams({
        mode: 'leader_all',
    });
    fetch(url_Master).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            let Master_dataSet = [];

            //$("#search_employee option").remove();
            //$("#search_employee").append("<option value='' selected>--SELECT ALL--</option>").attr("value", '')

            $.each(result.data, function (key, val) {

                Master_dataSet.push({ id: val['id'], text: val['code'] + ' ' + val['text'] });

            });

            $('#frm_hr_pms').find('#search_leader').select2({
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

    url_Master.search = new URLSearchParams({
        mode: 'quarter',
    });
    fetch(url_Master).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            let Master_dataSet = [];

            //$("#search_employee option").remove();
            //$("#search_employee").append("<option value='' selected>--SELECT ALL--</option>").attr("value", '')

            $.each(result.data, function (key, val) {

                Master_dataSet.push({ id: val['id'], text: val['text'] });

            });

            $('#frm_hr_pms').find('#search_quarter').select2({
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

    url_Master.search = new URLSearchParams({
        mode: 'job_all',
        keywords: '1',
    });
    fetch(url_Master).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            let Master_dataSet = [];

            //$("#search_section option").remove();
            //$("#search_section").append("<option value='' selected>--SELECT ALL--</option>").attr("value", '')

            $.each(result.data, function (key, val) {

                Master_dataSet.push({ id: val['id'], text: val['text'] });

            });

            $('#frm_hr_pms').find('#search_section').select2({
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

    url_Master.search = new URLSearchParams({
        mode: 'job_all',
        keywords: '2',
    });
    fetch(url_Master).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            let Master_dataSet = [];

            //$("#search_section option").remove();
            //$("#search_section").append("<option value='' selected>--SELECT ALL--</option>").attr("value", '')

            $.each(result.data, function (key, val) {

                Master_dataSet.push({ id: val['id'], text: val['text'] });

            });

            $('#frm_hr_pms').find('#search_department').select2({
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

    url_Master.search = new URLSearchParams({
        mode: 'job_all',
        keywords: '3',
    });
    fetch(url_Master).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            let Master_dataSet = [];

            //$("#search_section option").remove();
            //$("#search_section").append("<option value='' selected>--SELECT ALL--</option>").attr("value", '')

            $.each(result.data, function (key, val) {

                Master_dataSet.push({ id: val['id'], text: val['text'] });

            });

            $('#frm_hr_pms').find('#search_position').select2({
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
