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
const url_return_get = url_api + "/api/Return_Get";
const url_return_create = url_api + "/api/Return_Create";
const url_return_create_tran = url_api + "/api/Rt_Create_Tran";
const url_return_update = url_api + "/api/Return_Update";
let template_url = 'http://192.168.1.247/template/';
//var ref_id = $.uuid();
var temp_id = $.uuid();
let tbl_rt_view, tbl_rt_list, tbl_rt_import, username;
let objProfile = JSON.parse(localStorage.getItem('objProfile'));
//console.log("objProfile", objProfile);
var ref_id_tra = $.uuid();

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        var full_mail = user.email;

        username = full_mail.replace("@vskautoparts.com", "");

        $.init = async function () {

            $('#rt_branch').append(
                '<option value="VSM">VSM</option>' +
                '<option value="NWM">NWM</option>' +
                '<option value="LLK">LLK</option>' +
                '<option value="KSW">KSW</option>' +
                '<option value="KLH">KLH</option>'
            );

            $('#start_branch').append(
                '<option value="VSM">VSM</option>' +
                '<option value="NWM">NWM</option>' +
                '<option value="LLK">LLK</option>' +
                '<option value="KSW">KSW</option>' +
                '<option value="KLH">KLH</option>'
            );

            $('#end_branch').append(
                //'<option value="" selected>seletor</option>' +
                //'<option value="SUPER PART CO.,LTD.">SUPER PART CO.,LTD.</option>' +
                //'<option value="บริษัท ว.ศิริกาญออโตพาร์ท จำกัด">บริษัท ว.ศิริกาญออโตพาร์ท จำกัด</option>' +
                //'<option value="บริษัท ว.ศิริกาญออโตพาร์ท จำกัด (สาขา2)">บริษัท ว.ศิริกาญออโตพาร์ท จำกัด (สาขา2)</option>' +
                //'<option value="SUPER PART CO.,LTD.(สาขา LLK)">SUPER PART CO.,LTD.(สาขา LLK)</option>' +
                //'<option value="SUPER PART CO.,LTD. (สาขา2)">SUPER PART CO.,LTD. (สาขา2)</option>'
                '<option value="VSM" SELECTED>VSM</option>' +
                '<option value="NWM">NWM</option>' +
                '<option value="LLK">LLK</option>' +
                '<option value="KSW">KSW</option>' +
                '<option value="KLH">KLH</option>'
            );

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

            $('.step2').hide();

            $('#frm_upload').find('.branch').on('change', async function (evt) {

                evt.preventDefault();

                if ($('#start_branch').val() !== '' && $('#end_branch').val() !== '') {

                    if ($('#start_branch').val() !== $('#end_branch').val()) {

                        await $('.step2').show();
                        await $.return_import();

                    } else {
                        toastr.warning('ไม่สามารถเลือกสาขานี้ได้');
                        await $('.step2').hide();
                    }

                } else if ($('#start_branch').val() == '' || $('#end_branch').val() == '') {

                    await $('.step2').hide();

                } else {

                    await setTimeout(function () {

                        $('.step2').hide();

                    }, 300);
                }

            });

            $('#modal-return_upload').off('shown.bs.modal').on('shown.bs.modal', async function () {

                $('#modal-return_upload').find('.modal-title').html('ตารางนำเข้าข้อมูล IBT  ' + '<span class="tx-primary">' + '' + '</span>');

                $('#btn_update-data').hide();

                await setTimeout(function () {

                    $.LoadingOverlay("hide");

                }, 300);

            })

            $('#modal-return_upload').off('hidden.bs.modal').on('hidden.bs.modal', async function () {

                //$.LoadingOverlay("show", {
                //    image: '',
                //    custom: customElement
                //});

                $('#customFile').prop('disabled', false);

                $('#btn_update-data').prop('disabled', false);

                await setTimeout(function () {

                    location.reload();

                    $.LoadingOverlay("hide");

                }, 100);

            })

            $('.btn-reset').click(function (e) {

                e.preventDefault();

                $('#frm_data').trigger('reset');
                $('#frm_data').find('input').val('').prop('disabled', false);
                $("#frm_data").parsley().reset();

            });

            $('#btn_downloadtemplate').on('click', function (evt) {

                location.href = template_url + 'Template_UploadReturn.xlsx';

                console.log("...downloadtemplate...");

            });

            $('#frm_search').submit(async function (e) {

                e.preventDefault();

                tbl_rt_list.destroy();

                $.return_list();

            });

            $.return_user();

            $.return_list();

        };

        $.return_import = async function () {

            $(document).on('change', '#customFile', function (evt) {

                evt.preventDefault();

                $(".modal-body").LoadingOverlay("show", {
                    image: '',
                    custom: customElement
                });

                var path = $(this).val();
                var fileName = path.replace(/^.*\\/, "");
                $(this).next('.custom-file-label').html(fileName);

                if ($(this).val() !== '') {

                    $("#customFile").prop('disabled', true);
                    $('#start_branch').prop('disabled', true);
                    $('#end_branch').prop('disabled', true);

                    var start_branch = $('#start_branch').val();
                    var end_branch = $('#end_branch').val();
                    var rtfile_rt_no;
                    var rtfile_id;
                    var rtfile_temp_id;

                    fetch(url_return_create + '?mode=' + 'CREATE' + '&rtfile_start_branch=' + start_branch + '&rtfile_end_branch=' + end_branch + '&created_by=' + username + '&ref_id=' + fileName + '&temp_id=' + temp_id).then(function (response) {
                        return response.json();
                    }).then(function (result) {

                        rtfile_id = result.data[0]['rtfile_id'];
                        rtfile_temp_id = result.data[0]['rtfile_temp_id'];
                        rtfile_rt_no = result.data[0]['rtfile_rt_no'];
                        $('#modal-return_upload').find('.modal-title').html('ตารางนำเข้าข้อมูล IBT : ' + '<span class="tx-primary">' + 'RT' + '</span>'); $('#modal-return_upload').find('.modal-title').html('ตารางนำเข้าข้อมูล IBT : ' + '<span class="tx-primary">' + rtfile_rt_no + '</span>');
                    });

                    let citem_upload = [];

                    let uuid = $.uuid();

                    readXlsxFile(this.files[0], { dateFormat: 'YYYY/MM/DD_hh:mm:ss' }).then(async function (result) {

                        //console.log('readXlsxFile', result);

                        if (result.length > 2) {

                            let i = 0;

                            await $.each(result, async function (key, val) {

                                if (i > 0) {

                                    citem_upload.push({

                                        temp_id: temp_id,
                                        ref_id: rtfile_id,
                                        return_no: '',
                                        rttra_item_code: $.trim(val[0]),
                                        rttra_item_name: $.trim(val[1]),
                                        rttra_uom: $.trim(val[2]),
                                        rttra_qty: $.trim(val[3]),
                                        rttra_price: $.trim(val[4]),
                                        rttra_zone: $.trim(val[5]),
                                        rttra_location: $.trim(val[6]),
                                        rttra_branch: $.trim(val[7]),
                                        mode: $.trim(val[8]),
                                        created_by: username,
                                        item_length: result.length - 2
                                    });

                                }

                                i++

                            });

                            let rttra_branch;

                            await $.ajax({
                                url: url_return_create_tran,
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                data: JSON.stringify(citem_upload),
                                success: function (result) {

                                    let data_import = [];
                                    let i = 1;
                                    var success = 0;
                                    let all_information = 0;
                                    let wrong_information = 0;
                                    let success_information = 0;

                                    $.each(result.data, function (key, val) {

                                        let record_status = val['record_status'];
                                        let text_status = val['text_status'];
                                        rttra_branch = val['rttra_branch'];

                                        if (record_status == '1') {
                                            success_information += 1;
                                        } else {
                                            wrong_information += 1;
                                        }

                                        data_import.push([

                                            i,
                                            text_status,
                                            text_status,
                                            val['gbarcode'],
                                            val['rttra_item_code'],
                                            val['rttra_item_name'],
                                            val['rttra_uom'],
                                            val['rttra_qty'],
                                            val['rttra_price'],
                                            val['rttra_zone'],
                                            val['rttra_location'],
                                            val['rttra_branch'],
                                            val['rttra_temp_id']
                                        ])

                                        i++;

                                    });

                                    tbl_rt_import = $('#tbl-return_import').DataTable({
                                        "data": data_import,
                                        "dom": 'Bfrtip',
                                        "deferRender": true,
                                        "order": [[0, "desc"]],
                                        "ordering": false,
                                        //"pageLength": 5,
                                        //dom: 'Brti',
                                        buttons: [
                                            'copyHtml5',
                                            {
                                                extend: 'excelHtml5',
                                                title: '',
                                                filename: 'TablePriceNet',
                                            },
                                        ],
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
                                            "render": function (data, type, row, meta) {

                                                return (data === 'OK' ? '<span class="badge badge-pill badge-success">OK</span>' : '<span class="badge badge-pill badge-danger">ERROR</span>');

                                            }

                                        },
                                        {
                                            "targets": [2],
                                            "render": function (data, type, row, meta) {

                                                return (data === 'OK' ? '<span class="badge badge-pill badge-success"></span>' : '<span class="badge badge-pill badge-danger">' + data + '</span>');

                                            }

                                        },
                                        {
                                            "targets": [4],
                                            "render": function (data, type, row, meta) {

                                                return '<span style="color:blue;">' + data + '</span>'

                                            }

                                        },
                                        {
                                            "targets": [7],
                                            "render": function (data, type, row, meta) {

                                                if (data === 0) {
                                                    return '<span style="color:red;">' + data + '</span>'

                                                } else {

                                                    return '<span style="color:blue;">' + data + '</span>'
                                                }
                                            }

                                        },
                                        {
                                            "targets": [10],
                                            "render": function (data, type, row, meta) {

                                                return '<span style="color:blue;">' + data + '</span>'

                                            }

                                        },
                                        {
                                            "targets": [11],
                                            "render": function (data, type, row, meta) {
                                                if (data == start_branch) {
                                                    return '<span style="color:blue;">' + data + '</span>'
                                                } else {
                                                    return '<span style="color:red;">' + data + '</span>'
                                                }
                                                
                                            }

                                        },
                                        {
                                            "targets": [12],
                                            "searchable": false,
                                            "visible": false

                                        }],
                                        "initComplete": function (settings, json) {

                                            $('.tbl-return-import').removeClass('d-none');

                                        }

                                    });

                                    $('#all_information').html(i - 1);
                                    $('#success_information').html(success_information).css("color", "darkgreen");
                                    $('#wrong_information').html(wrong_information).css("color", "red");

                                    if (rttra_branch !== start_branch) {

                                        toastr.error('สาขาต้นทางไม่ตรงกัน');
                                        $('#btn_update-data').hide();

                                    } else if (wrong_information > 0) {

                                        toastr.error('กรุณาตรวจสอบจข้อมูล');
                                        $('#btn_update-data').hide();

                                    } else {

                                        $('#btn_update-data').show();
                                        $.return_export(temp_id);

                                    }

                                    tbl_rt_import.columns.adjust();

                                    //$('#btn_update-data').show();

                                    $(".modal-body").LoadingOverlay("hide", true);

                                }

                            });

                        } else {

                            $(".modal-body").LoadingOverlay("hide", true);
                            toastr.error('ไม่พบช้อมูลในเอกสาร');

                        }


                    });

                }

            });

        }

        $.return_export = function (temp_id) {

            $('#btn_update-data').on('click', function (e) {

                e.preventDefault();

                $(".modal-body").LoadingOverlay("show", {
                    image: '',
                    custom: customElement
                });

                fetch(url_return_update + '?temp_id=' + temp_id + '&updated_by=' + username).then(function (response) {
                    return response.json();
                }).then(function (result) {

                    if (result.status === 'Error') {

                        $(".modal-body").LoadingOverlay("hide", true);
                        toastr.error('Oops! An Error Occurred');

                    } else {

                        let url = 'http://192.168.1.159/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_Rt_Template&rs:Command=Render&temp_id=' + temp_id + '&rs:Format=excel'

                        $('#btn_update-data').prop('disabled', true);
                        $(".modal-body").LoadingOverlay("hide", true);
                        toastr.success('Save Successfully!', async function () {

                            //$('#modal-frm_data').modal('hide');

                            //$('#wizards').find('.btn_error_stmas_exp').on('click', function (evt) {

                            //location.href = 'http://192.168.1.159/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_Rt_Template&rs:Command=Render&temp_id=' + temp_id + '&rs:Format=excel';

                            window.open(url, '_blank');

                            console.log("...downloadtemplate");

                            //});

                            //await setTimeout(function () {
                            //    location.reload();
                            //    $.LoadingOverlay("hide");
                            //}, 900);

                        }, 300);

                    }

                }).catch(error => {

                    $(".modal-body").LoadingOverlay("hide", true);
                    toastr.error('Error, Please contact administrator.');

                });

            });

        };

        $.return_list = async function () {

            let url = new URL(url_return_get);

            var trndate_start;
            var trndate_end;

            trndate_start = $('#rt_date').val() != '' ? moment($('#rt_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment('1991-01-01').format('YYYY-MM-DD') + ' 00:00';  //ถ้าไม่เลือกจะเป็นค่าว่าง
            trndate_end = $('#rt_date').val() != '' ? moment($('#rt_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';

            url.search = new URLSearchParams({

                mode: 'rtfile_get',
                return_no: $('#frm_search').find('#rt_no').val(),
                trndate_start: trndate_start,
                trndate_end: trndate_end,
                created_by: $('#frm_search').find('#rt_createby').val() === '' || $('#frm_search').find('#rt_createby').val() === undefined ? '' : $('#frm_search').find('#rt_createby').val(),
                branch: $('#frm_search').find('#rt_branch').val() === '' || $('#frm_search').find('#rt_branch').val() === undefined ? '' : $('#frm_search').find('#rt_branch').val(),
                
            });

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {

                if (result.status === 'Error') {

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    })

                    $.LoadingOverlay("hide");

                } else {

                    tbl_rt_list = $('#tbl-rt_list').DataTable({
                        data: result.data,
                        "bDestroy": true,
                        "dom": 'Bfrtip',
                        "deferRender": true,
                        "order": [[0, "desc"]],
                        "ordering": false,
                        "pageLength": 5,
                        buttons: [
                            'copy', 'excel'
                        ],
                        columns: [
                            {
                                title: "<span style='font-size:11px;'>วันที่ RT</span>",
                                data: "rtfile_rt_date",
                                width: "70px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '<span/>';
                                }
                            }, //0
                            {
                                title: "<span style='font-size:11px;'>เลขที่ RT</span>",
                                data: "rtfile_rt_no",
                                width: "120px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    // return '<div data-placement="top" data-toggle="tooltip-primary">' + '<a href="http://localhost:57916/br/br_job?brtra_number=' + data + '" target="_blank"><b>' + data + '<b></a></div>'
                                    return '<div data-placement="top" data-toggle="tooltip-primary">' + '<a href="http://192.168.1.159/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_Rt_Template&rs:Command=Render&temp_id=' + row.rtfile_temp_id + '&rs:Format=excel' + '" target="_blank"><b>' + data + '<b></a></div>'
                                    //'http://192.168.1.159/ReportServer/Pages/ReportViewer.aspx?%2fReport+Project1%2fRPT_Rt_Template&rs:Command=Render&temp_id=' + temp_id + '&rs:Format=excel';

                                }
                            }, //1
                            {
                                title: "<span style='font-size:11px;'>สาขาต้นทาง</span>",
                                data: "rtfile_start_branch",
                                width: "90px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //2
                            {
                                title: "<span style='font-size:11px;'>สาขาปลายทาง</span>",
                                data: "rtfile_end_branch",
                                width: "90px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //3
                            {
                                title: "<span style='font-size:11px;'>จำนวนรายการ</span>",
                                data: "rtfile_item_amount",
                                class: "tx-center",
                                width: "100px",
                                //visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;  color:OrangeRed;">' + data + '</span>';
                                }
                            }, //4
                            {
                                title: "<span style='font-size:11px;'>จำนวนสินค้า</span>",
                                data: "rtfile_item_qty",
                                class: "tx-center",
                                width: "70px",
                                //visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;  color:Blue;">' + data + '</span>';
                                }
                            }, //5

                            {
                                title: "<span style='font-size:11px;'>สถานะ</span>",
                                data: "record_status",
                                class: "tx-center",
                                width: "70px",
                                render: function (data, type, row, meta) {
                                    if (data == '1') {
                                        return '<span class="badge badge-primary">ใช้งาน</span >'
                                    } else if (data == '0') {
                                        return '<span class="badge badge-danger">ยกเลิก</span >'

                                    }
                                }
                            }, //6
                            {
                                title: "<span style='font-size:11px;'>บันทึกโดย</span>",
                                data: "created_by",
                                class: "tx-center",
                                width: "150px",
                                // visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '<br>' + moment(row.created_date).format('DD/MM/YYYY hh:mm:ss') + '</span>';
                                }
                            }, //7
                            {
                                title: "<span style='font-size:11px;'>เวลาที่สร้าง</span>",
                                data: "created_date",
                                class: "tx-center",
                                //width: "100px",
                                visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY hh:mm:ss') + '</span>';
                                }
                            }, //8
                            {
                                title: "<span style='font-size:11px;'>ที่จัดเก็บไว้</span>",
                                data: "rtfile_ref_id",
                                class: "tx-center",
                                width: "120px",
                                //visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;  color:blue;">' + data + '</span>';
                                    //return '<div data-placement="top" data-toggle="tooltip-primary">' + '<a href="' + '' + '" target="_blank"><b>' + data + '<b></a></div>'
                                }
                            }, //9
                            {
                                title: "<span style='font-size:11px;'>Temp_id</span>",
                                data: "rtfile_temp_id",
                                class: "tx-center",
                                //width: "100px",
                                visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //9

                        ],
                        //"order": [[1, "desc"]],
                        "initComplete": function (settings, json) {

                            $.contextMenu({
                                selector: '#tbl-rt_list tbody tr',
                                callback: async function (key, options) {

                                    let data = tbl_rt_list.row(this).data();
                                    let citem = {
                                        rtfile_id: data['rtfile_id'],
                                        rtfile_rt_no: data['rtfile_rt_no'],
                                        rtfile_temp_id: data['rtfile_temp_id'],
                                    };

                                    $('#modal-return_list').modal({
                                        keyboard: false,
                                        backdrop: 'static'
                                    });

                                    if (key === 'view') {

                                        $.return_view(citem);

                                    } else {

                                        alert('ERROR');

                                    }

                                },
                                items: {

                                    "view": { name: "view", icon: "fas fa-file-alt" },
                                }
                            });

                        },

                    });
                    //$('#modal-return_list').modal('show');
                    $.LoadingOverlay("hide");
                }
            })

        }

        $.return_view = async function (citem) {

            //$(".modal-content").LoadingOverlay("show", {
            //    image: '',
            //    custom: customElement
            //});

            var rtfile_id = citem['rtfile_id']
            var rtfile_temp_id = citem['rtfile_temp_id']
            var rtfile_rt_no = citem['rtfile_rt_no']

            console.log(rtfile_id)
            console.log(rtfile_temp_id)
            console.log(rtfile_rt_no)

            $('#modal-return_list').find('.modal-title').html('ตารางนำเข้าข้อมูล IBT : ' + '<span class="tx-primary">' + rtfile_rt_no + '</span>');

            fetch(url_return_get + '?mode=' + 'rttra_get' + '&temp_id=' + rtfile_id).then(function (response) {
                return response.json();
            }).then(function (result) {

                let data_viwe = [];
                let i = 1;

                $.each(result.data, function (key, val) {

                    let record_status = val['record_status'];
                    let text_status = val['text_status'];

                    data_viwe.push([
                        i,
                        val['gbarcode'],
                        val['rttra_item_code'],
                        val['rttra_item_name'],
                        val['rttra_uom'],
                        val['rttra_qty'],
                        val['rttra_price'],
                        val['rttra_zone'],
                        val['rttra_location'],
                        val['rttra_branch'],
                        val['rttra_temp_id']
                    ])

                    i++;

                });

                tbl_rt_view = $('#tbl-return-list-detail').DataTable({
                    "data": data_viwe,
                    "dom": 'Bfrtip',
                    "deferRender": true,
                    "order": [[0, "desc"]],
                    "ordering": false,
                    destroy: true,
                    buttons: [
                        'copyHtml5',
                        {
                            extend: 'excelHtml5',
                            title: '',
                            filename: 'TablePriceNet',
                        },
                    ],
                    "columnDefs": [{
                        "targets": 'no-sort',
                        "orderable": false,
                    },
                    {
                        "targets": [0],
                        "searchable": false,
                        "visible": false

                    }],
                    "initComplete": function (settings, json) {

                    }
                });

                tbl_rt_view.columns.adjust();
                $(".modal-content").LoadingOverlay("hide", true);
            });

        };

        $.return_user = async function (citem) {

            let return_user_dataSet = [];

            fetch(url_return_get + '?mode=' + 'user_get').then(function (response) {
                return response.json();
            }).then(function (result) {

                $.each(result.data, function (key, val) {

                    return_user_dataSet.push({ id: val['created_by'], text: val['created_by'] });

                });

                $('.rt_createby').select2({
                    width: '100%',
                    height: '40px',
                    data: return_user_dataSet,
                    templateResult: function (data) {
                        return data.text;
                    },
                    sorter: function (data) {
                        return data.sort(function (a, b) {
                            return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                        });
                    }
                });

        
            });

        };

        $(document).ready(async function () {

            await $.init();

        });

    } else {

        window.location.assign('./login');

    }

});