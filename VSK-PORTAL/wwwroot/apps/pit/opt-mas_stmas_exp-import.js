'use strict';

const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const user_id = objProfile[0]['username'];

let template_url = 'http://192.168.1.247/template/';
//const url_api = "http://192.168.1.247:8899/pit-api";
const url_api = 'http://localhost:49705';

const url_stmas_exp_import_create = url_api + '/api/STMAS_EXP_IMPORT_CREATE';
const url_stmas_exp_import_verify = url_api + '/api/STMAS_EXP_IMPORT_VERIFY';
const url_stmas_exp_import_get = url_api + '/api/STMAS_EXP_IMPORT_GET';
const url_stmas_exp_import_update = url_api + '/api/STMAS_EXP_IMPORT_UPDATE';

let ref_id = $.uuid();
let table_list;
let count_length = 0;
let chk_index = 0

function objectPropInArray(list, prop, val) {
    if (list.length > 0) {
        for (i in list) {
            if (list[i][prop] === val) {
                return true;
            }
        }
    }
    return false;
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

$(document).ready(async function () {

    toastr.options = {
        "closeButton": false, // true/false
        "debug": false, // true/false
        "newestOnTop": false, // true/false
        "progressBar": true, // true/false
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "2000", // in milliseconds
        "hideDuration": "1000", // in milliseconds
        "timeOut": "1000", // in milliseconds
        "extendedTimeOut": "1000", // in milliseconds
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "show",
        "hideMethod": "hide"
    };

    await $.init();

    $('.actions').hide();

    // $.addLogEvent('', 'VSM', 'visit', '/master/stmas_exp_import', 'OK');

});

$.init = function () {

    $('.breadcrumb-header').append('<div class="pd-l-10 mb-6 mb-xl-0">' +
        '<button id="update_data_stmas" class="btn btn-danger btn-with-icon btn-block"><i class="fas fa-cloud-upload-alt"></i> UPDATE STMAS </button >' +
        '</div> ')

    $('#update_data_stmas').on('click', async function (e) {

        e.preventDefault();

        await $.LoadingOverlay("show", {
            image: '',
            custom: customElement
        });

        await fetch('http://192.168.1.247/intranet/acc-api/api/SYNC/ItemMaster_Information_Sync' + '?created_by=' + user_id).then(function (response) {
            return response.json();
        }).then(function (result) {

            if (result.status === 'Error') {

                $.LoadingOverlay("hide");

                toastr.error('Oops! An Error Occurred');

                swal(
                    {
                        title: 'Oops...',
                        text: 'Updated Data STMAS Incomplete!',
                        type: 'error',
                        confirmButtonColor: '#57a94f'
                    }
                )

            } else {

                $.LoadingOverlay("hide");

                toastr.success('Updated Data STMAS Successfully');

                swal(
                    {
                        title: 'Well done!',
                        text: 'You clicked the button!',
                        type: 'success',
                        confirmButtonColor: '#57a94f'
                    }
                )
            }

        });

    });

    $('.chk_code').hide();

    $('.btn_error_stmas_exp').hide();

    $('#wizard1').steps({
        headerTag: 'h3',
        bodyTag: 'section',
        autoFocus: true,
        titleTemplate: '<span class="number">#index#<\/span> <span class="title">#title#<\/span>',
        onStepChanged: function () {

            var chk_index = $('#wizard1').steps('getCurrentIndex');
            console.log("onStepChanged:currentIndex", chk_index);

            if (chk_index == 1) {

                $.import_step2_get();

            }

            if (chk_index == 2) {

                swal({
                    title: 'Are you sure?',
                    text: "to upload this order",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true
                }, function () {

                    $.import_upload()

                });

            }

        },
        onFinishing: function () {
            setTimeout(function () {
                location.reload();
            }, 1000);
        }
    });

    $('#wizards').find('#btn_downloadtemplate').on('click', function (evt) {

        location.href = template_url + 'Templete_Stmas_Exp_IMPORT.xlsx';

    });


    $('.btn_error_stmas_exp').on('click', function (evt) {

        evt.preventDefault();

        //let url = 'http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport-Template-Stmas-Exp%2fError-Stmas-Exp&rs:Command=Render&temp_id=' + ref_id + '&rs:Format=excel';
        let url = 'http://192.168.1.187/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_STMAS_EXP_IMPORT_ERROR&rs:Command=Render&ref_id=' + ref_id + '&rs:Format=excel';

        window.open(url, '_blank');

    });

    $('#customFile').on('change', function (evt) {

        evt.preventDefault();

        var path = $(this).val();
        var fileName = path.replace(/^.*\\/, "");
        $(this).next('.custom-file-label').html(fileName);

        if ($(this).val() !== '') {

            let i = 0;

            $('#customFile').prop('disabled', true);

            readXlsxFile(this.files[0], { dateFormat: 'YYYY/MM/DD_hh:mm:ss' }).then(async function (result) {

                let count_excel = result.length - 2

                if (count_excel > 3000) {

                    toastr.error('Can make transactions not more than 300. This file ' + count_excel + ' ');

                } else {

                    $.LoadingOverlay("show", {
                        image: '',
                        custom: customElement
                    });

                    $('.actions').show();

                    count_length = result.length - 2;

                    var data_import = [];

                    $.each(result, function (key, val) {

                        if (i > 1) {

                            data_import.push({

                                'ref_id': ref_id,
                                'code_sm': val[0],
                                'name_sm_compare': val[1],
                                'code_sm_e': val[2],
                                'name_sm_e_compare': val[3],
                                'code_a': val[4],
                                'code_e': val[5],
                                'code_c': val[6],
                                'code_b': val[7],
                                'code_d': val[8],
                                'cartype': val[9],
                                'UsagePerCar': val[10],
                                'gdescript': val[11],
                                'action_type': val[12],
                                'created_by': user_id,

                            });

                        }

                        i++

                    });

                    console.log("data_import", data_import)

                    $.import_create(data_import);

                }

            }).catch(error => {

                $.LoadingOverlay("hide");
                toastr.error('Error writing document');

            });

        }

        $.LoadingOverlay("hide");

    });

};

$.import_create = function (data_import) {

    $.ajax({
        url: url_stmas_exp_import_create,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(data_import),
        success: function (data) {

            console.log("data_import", data);

            if (data.status != 'Success') {

                $.LoadingOverlay("hide", true);

                toastr.error('Error, Please contact administrator.');

            } else {

                console.log('data', data)

                toastr.warning('กำลังวิเคราะห์ข้อมูล');

                $.LoadingOverlay("hide", true);

                swal({
                    title: 'กำลังดำเนินการ',
                    text: 'วิเคราะห์ข้อมูล',
                    type: "warning",
                    timer: 1000,
                    showConfirmButton: false
                }, async function () {

                    await $.LoadingOverlay("show", {
                        image: '',
                        custom: customElement
                    });

                    await $.import_verify();

                });


            }
        }

    });

};

$.import_verify = function () {

    let url = new URL(url_stmas_exp_import_verify);

    url.search = new URLSearchParams({
        ref_id: ref_id
        //ref_id: '57894c42-a563-4080-a427-cc26e39d849f'
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        if (result.status === 'Error') {

            toastr.error(status.error_message);

        } else {

            let i = 0;
            let item_success = 0;
            let item_error = 0;

            $.each(result.data, function (key, val) {

                if (val['record_status'] == 1) {
                    item_success++;
                } else if (val['record_status'] == 0) {
                    item_error++;
                }

                i++
            });

            $('#countitem_all').html(i);
            $('#countitem_incomplete').html(item_error);
            $('#countitem_complete').html(item_success);
            $('#countitem_problem').html(i - item_success);

            table_list = $('#tbl-list-1').DataTable({
                data: result.data,
                dom: '<Bf<t>lip>',
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "ค้นหา..."
                },
                //deferRender: true,
                // ordering: true,
                pageLength: 50,
                bDestroy: true,
                //scrollY: "400px",
                scrollX: true,
                scrollCollapse: true,
                //paging: false,
                autoWidth: true,
                buttons: [
                    'copyHtml5',
                    {
                        extend: 'excelHtml5',
                        title: '',
                        filename: 'Temp_Stmas-Exp_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                        exportOptions: {
                            columns: [0, 1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
                        }
                    },
                ],
                lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                columns: [
                    {
                        title: "#",
                        class: "tx-left",
                        //class: "tx-left align-middle",
                        render: function (data, type, row, meta) {
                            return (meta.row) + 1;
                        }
                    }, //0
                    {
                        title: "ปฏิบัติการ",
                        data: "action_type",
                        width: "70px",
                        class: "tx-center align-middle tx-bold",
                        render: function (data, type, row, meta) {
                            let tx = '';
                            if (data == 'CREATE_DATA') {
                                tx = '<span class="tx-success">' + data + '</span>'
                            } else if (data == 'UPDATE_DATA') {
                                tx = '<span class="tx-primary">' + data + '</span>'
                            } else if (data == 'DELETE_DATA') {
                                tx = '<span class="tx-danger">' + data + '</span>'
                            } else if (data == 'UPDATE_CARTYPE' || data == 'UPDATE_UPC') {
                                tx = '<span class="tx-purple">' + data + '</span>'
                            }
                            return tx;
                        }
                    }, //0    
                    {
                        title: "สถานะ",
                        data: "record_status",
                        width: "70px",
                        class: "tx-left",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "ข้อความ",
                        data: "text_status",
                        width: "100px",
                        class: "tx-left",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0 
                    {
                        title: "ข้อความไทย",
                        data: "text_status_th",
                        width: "100px",
                        class: "tx-left",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "สถานะ",
                        data: "record_status",
                        width: "120px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            let st = '', tx = ''
                            let record_status = row.record_status
                            let text_status_th = row.text_status_th
                            if (record_status == 1) {
                                st = '<span class="badge badge-pill badge-success w-100"> PASS </span>'
                                tx = '<span class="mt-1 badge bd bd-success w-100"> ' + text_status_th + ' </span>'
                            } else {
                                st = '<span class="badge badge-pill badge-danger w-100"> ERROR </span>'
                                tx = '<span class="mt-1 badge bd bd-danger bg-danger-transparent tx-bold tx-12 w-100"> ' + text_status_th + ' </span>'
                            }
                            return st + '<br>' + tx;
                        }
                    }, //0
                    {
                        title: "รหัสสินค้าหลัก",
                        data: "code_sm",
                        width: "150px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "ชื่อสินค้าหลัก",
                        data: "name_sm",
                        width: "180px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "รหัสสินค้าพ่วง",
                        data: "code_sm_e",
                        width: "150px",
                        class: "tx-left tx-bold",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "ชื่อสินค้าพ่วง",
                        data: "name_sm_e",
                        width: "180px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0 
                    {
                        title: "ชื่อสินค้าเปรียบเทียบ",
                        data: "name_sm_e_compare",
                        width: "170px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "ผลลัพธ์",
                        width: "60px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            let name_sm_e_compare = row.name_sm_e_compare;
                            let name_sm_e = row.name_sm_e;
                            let tx = '';
                            if (name_sm_e_compare == name_sm_e) { tx = '<span class="tx-success">ข้อมูลตรงกัน</span>' } else { tx = '<span class="tx-danger">ข้อมูลตรงกัน</span>' }
                            return tx;
                        }
                    }, //0
                    {
                        title: "บาร์โค้ด",
                        data: "gbarcode",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0 
                    {
                        title: "เลขอะไหล่",
                        data: "SPCODES",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "Code A",
                        data: "code_a_verify",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "GNAMECHR",
                        data: "code_a",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "Code E",
                        data: "code_e_verify",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "GOEM",
                        data: "code_e",
                        width: "120px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0 
                    {
                        title: "Code C",
                        data: "code_c_verify",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "TYPE",
                        data: "code_c",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "Code B",
                        data: "code_b_verify",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "GMODEL",
                        data: "code_b",
                        width: "90px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0 
                    {
                        title: "Code D",
                        data: "code_d_verify",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "GUSED",
                        data: "code_d",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "cartype",
                        data: "cartype",
                        width: "90px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "UsagePerCar",
                        data: "UsagePerCar",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "gdescript",
                        data: "gdescript",
                        width: "100px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                ],
                order: [[0, "desc"]],
                rowCallback: function (row, data) {

                    if ((data.record_status) == 0) {
                        $('td:eq(1)', row).parent().addClass('bg-warning-transparent');
                    } else if ((data.record_status) == 1) {
                        $('td:eq(1)', row).parent().addClass('bg-success-transparent');
                    } else {
                        ''
                    }

                },
                initComplete: function (settings, json) {
                    $("#global-loader").fadeOut("slow");
                    $.LoadingOverlay("hide", true);
                    toastr.success('วิเคราะห์ข้อมูลสำเร็จ');
                    swal({
                        title: 'สำเร็จ !',
                        text: 'วิเคราะห์ข้อมูลสำเร็จ',
                        type: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });
                    //$('.counter').countUp();
                    $('.btn_error_stmas_exp').show();
                },
            });

        }

    });

};

$.import_step2_get = function () {

    let url = new URL(url_stmas_exp_import_get);

    url.search = new URLSearchParams({
        ref_id: ref_id
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        if (result.status === 'Error') {

            toastr.error(status.error_message);

        } else {

            table_list = $('#tbl-list-2').DataTable({
                data: result.data,
                dom: '<Bf<t>lip>',
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "ค้นหา..."
                },
                //deferRender: true,
                // ordering: true,
                pageLength: 10,
                bDestroy: true,
                //scrollY: "400px",
                scrollX: true,
                scrollCollapse: true,
                //paging: false,
                autoWidth: true,
                buttons: [
                    'copyHtml5',
                    {
                        extend: 'excelHtml5',
                        title: '',
                        filename: 'Temp_Stmas-Exp_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                        exportOptions: {
                            columns: [0, 1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
                        }
                    },
                ],
                lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                columns: [
                    {
                        title: "#",
                        class: "tx-left",
                        //class: "tx-left align-middle",
                        render: function (data, type, row, meta) {
                            return (meta.row) + 1;
                        }
                    }, //0
                    {
                        title: "ปฏิบัติการ",
                        data: "action_type",
                        width: "70px",
                        class: "tx-center align-middle tx-bold",
                        render: function (data, type, row, meta) {
                            let tx = '';
                            if (data == 'CREATE_DATA') {
                                tx = '<span class="tx-success">' + data + '</span>'
                            } else if (data == 'UPDATE_DATA') {
                                tx = '<span class="tx-primary">' + data + '</span>'
                            } else if (data == 'DELETE_DATA') {
                                tx = '<span class="tx-danger">' + data + '</span>'
                            } else if (data == 'UPDATE_CARTYPE' || data == 'UPDATE_UPC') {
                                tx = '<span class="tx-purple">' + data + '</span>'
                            }
                            return tx;
                        }
                    }, //0    
                    {
                        title: "สถานะ",
                        data: "record_status",
                        width: "70px",
                        class: "tx-left",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "ข้อความ",
                        data: "text_status",
                        width: "100px",
                        class: "tx-left",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0 
                    {
                        title: "ข้อความไทย",
                        data: "text_status_th",
                        width: "100px",
                        class: "tx-left",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "สถานะ",
                        data: "record_status",
                        width: "120px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            let st = '', tx = ''
                            let record_status = row.record_status
                            let text_status_th = row.text_status_th
                            if (record_status == 1) {
                                st = '<span class="badge badge-pill badge-success w-100"> PASS </span>'
                                tx = '<span class="mt-1 badge bd bd-success w-100"> ' + text_status_th + ' </span>'
                            } else {
                                st = '<span class="badge badge-pill badge-danger w-100"> ERROR </span>'
                                tx = '<span class="mt-1 badge bd bd-danger bg-danger-transparent tx-bold tx-12 w-100"> ' + text_status_th + ' </span>'
                            }
                            return st + '<br>' + tx;
                        }
                    }, //0
                    {
                        title: "รหัสสินค้าหลัก",
                        data: "code_sm",
                        width: "150px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "ชื่อสินค้าหลัก",
                        data: "name_sm",
                        width: "180px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "รหัสสินค้าพ่วง",
                        data: "code_sm_e",
                        width: "150px",
                        class: "tx-left tx-bold",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "ชื่อสินค้าพ่วง",
                        data: "name_sm_e",
                        width: "180px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0 
                    {
                        title: "ชื่อสินค้าเปรียบเทียบ",
                        data: "name_sm_e_compare",
                        width: "170px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "ผลลัพธ์",
                        width: "60px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            let name_sm_e_compare = row.name_sm_e_compare;
                            let name_sm_e = row.name_sm_e;
                            let tx = '';
                            if (name_sm_e_compare == name_sm_e) { tx = '<span class="tx-success">ข้อมูลตรงกัน</span>' } else { tx = '<span class="tx-danger">ข้อมูลตรงกัน</span>' }
                            return tx;
                        }
                    }, //0
                    {
                        title: "บาร์โค้ด",
                        data: "gbarcode",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0 
                    {
                        title: "เลขอะไหล่",
                        data: "SPCODES",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "Code A",
                        data: "code_a_verify",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "GNAMECHR",
                        data: "code_a",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "Code E",
                        data: "code_e_verify",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "GOEM",
                        data: "code_e",
                        width: "120px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0 
                    {
                        title: "Code C",
                        data: "code_c_verify",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "TYPE",
                        data: "code_c",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "Code B",
                        data: "code_b_verify",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "GMODEL",
                        data: "code_b",
                        width: "90px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0 
                    {
                        title: "Code D",
                        data: "code_d_verify",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "GUSED",
                        data: "code_d",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "cartype",
                        data: "cartype",
                        width: "90px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "UsagePerCar",
                        data: "UsagePerCar",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "gdescript",
                        data: "gdescript",
                        width: "100px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                ],
                order: [[0, "desc"]],
                rowCallback: function (row, data) {

                    if ((data.record_status) == 0) {
                        $('td:eq(1)', row).parent().addClass('bg-warning-transparent');
                    } else if ((data.record_status) == 1) {
                        $('td:eq(1)', row).parent().addClass('bg-success-transparent');
                    } else {
                        ''
                    }

                },
                initComplete: function (settings, json) {
                    $("#global-loader").fadeOut("slow");
                    $.LoadingOverlay("hide", true);

                },
            });

        }

    });

};

$.import_step3_get = function () {

    let url = new URL(url_stmas_exp_import_get);

    url.search = new URLSearchParams({
        ref_id: ref_id
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        if (result.status === 'Error') {

            toastr.error(status.error_message);

        } else {

            table_list = $('#tbl-list-3').DataTable({
                data: result.data,
                dom: '<Bf<t>lip>',
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "ค้นหา..."
                },
                //deferRender: true,
                // ordering: true,
                pageLength: 10,
                bDestroy: true,
                //scrollY: "400px",
                scrollX: true,
                scrollCollapse: true,
                //paging: false,
                autoWidth: true,
                buttons: [
                    'copyHtml5',
                    {
                        extend: 'excelHtml5',
                        title: '',
                        filename: 'Temp_Stmas-Exp_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                        exportOptions: {
                            columns: [0, 1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
                        }
                    },
                ],
                lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                columns: [
                    {
                        title: "#",
                        class: "tx-left",
                        //class: "tx-left align-middle",
                        render: function (data, type, row, meta) {
                            return (meta.row) + 1;
                        }
                    }, //0
                    {
                        title: "ปฏิบัติการ",
                        data: "action_type",
                        width: "70px",
                        class: "tx-center align-middle tx-bold",
                        render: function (data, type, row, meta) {
                            let tx = '';
                            if (data == 'CREATE_DATA') {
                                tx = '<span class="tx-success">' + data + '</span>'
                            } else if (data == 'UPDATE_DATA') {
                                tx = '<span class="tx-primary">' + data + '</span>'
                            } else if (data == 'DELETE_DATA') {
                                tx = '<span class="tx-danger">' + data + '</span>'
                            } else if (data == 'UPDATE_CARTYPE' || data == 'UPDATE_UPC') {
                                tx = '<span class="tx-purple">' + data + '</span>'
                            }
                            return tx;
                        }
                    }, //0    
                    {
                        title: "สถานะ",
                        data: "record_status",
                        width: "70px",
                        class: "tx-left",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "ข้อความ",
                        data: "text_status",
                        width: "100px",
                        class: "tx-left",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0 
                    {
                        title: "ข้อความไทย",
                        data: "text_status_th",
                        width: "100px",
                        class: "tx-left",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "สถานะ",
                        data: "record_status",
                        width: "120px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            let st = '', tx = ''
                            let record_status = row.record_status
                            let text_status_th = row.text_status_th
                            if (record_status == 1) {
                                st = '<span class="badge badge-pill badge-success w-100"> PASS </span>'
                                tx = '<span class="mt-1 badge bd bd-success w-100"> ' + text_status_th + ' </span>'
                            } else {
                                st = '<span class="badge badge-pill badge-danger w-100"> ERROR </span>'
                                tx = '<span class="mt-1 badge bd bd-danger bg-danger-transparent tx-bold tx-12 w-100"> ' + text_status_th + ' </span>'
                            }
                            return st + '<br>' + tx;
                        }
                    }, //0
                    {
                        title: "รหัสสินค้าหลัก",
                        data: "code_sm",
                        width: "150px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "ชื่อสินค้าหลัก",
                        data: "name_sm",
                        width: "180px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "รหัสสินค้าพ่วง",
                        data: "code_sm_e",
                        width: "150px",
                        class: "tx-left tx-bold",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "ชื่อสินค้าพ่วง",
                        data: "name_sm_e",
                        width: "180px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0 
                    {
                        title: "ชื่อสินค้าเปรียบเทียบ",
                        data: "name_sm_e_compare",
                        width: "170px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "ผลลัพธ์",
                        width: "60px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            let name_sm_e_compare = row.name_sm_e_compare;
                            let name_sm_e = row.name_sm_e;
                            let tx = '';
                            if (name_sm_e_compare == name_sm_e) { tx = '<span class="tx-success">ข้อมูลตรงกัน</span>' } else { tx = '<span class="tx-danger">ข้อมูลตรงกัน</span>' }
                            return tx;
                        }
                    }, //0
                    {
                        title: "บาร์โค้ด",
                        data: "gbarcode",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0 
                    {
                        title: "เลขอะไหล่",
                        data: "SPCODES",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "Code A",
                        data: "code_a_verify",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "GNAMECHR",
                        data: "code_a",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "Code E",
                        data: "code_e_verify",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "GOEM",
                        data: "code_e",
                        width: "120px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0 
                    {
                        title: "Code C",
                        data: "code_c_verify",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "TYPE",
                        data: "code_c",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "Code B",
                        data: "code_b_verify",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "GMODEL",
                        data: "code_b",
                        width: "90px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0 
                    {
                        title: "Code D",
                        data: "code_d_verify",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "GUSED",
                        data: "code_d",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "cartype",
                        data: "cartype",
                        width: "90px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "UsagePerCar",
                        data: "UsagePerCar",
                        width: "70px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                    {
                        title: "gdescript",
                        data: "gdescript",
                        width: "100px",
                        class: "tx-left",
                        render: function (data, type, row, meta) {
                            return data;
                        }
                    }, //0
                ],
                order: [[0, "desc"]],
                rowCallback: function (row, data) {

                    if ((data.record_status) == 0) {
                        $('td:eq(1)', row).parent().addClass('bg-warning-transparent');
                    } else if ((data.record_status) == 1) {
                        $('td:eq(1)', row).parent().addClass('bg-success-transparent');
                    } else {
                        ''
                    }

                },
                initComplete: function (settings, json) {
                    $("#global-loader").fadeOut("slow");
                    $.LoadingOverlay("hide", true);

                },
            });

        }

    });

};


$.import_upload = function () {

    let url = new URL(url_stmas_exp_import_update);

    url.search = new URLSearchParams({
        ref_id: ref_id,
        updated_by: user_id
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        if (result.status === 'Error') {

            toastr.error(status.error_message);

            swal("เกิดข้อผิดพลาด", "นำเข้าข้อมูลไม่สำเร็จ", "error");

        } else {

            $.import_step3_get();

            swal(
                {
                    title: 'สำเร็จ!',
                    text: 'นำเข้าข้อมูลสำเร็จ',
                    type: 'success',
                    confirmButtonColor: '#57a94f'
                }
            )
        }

    });

};