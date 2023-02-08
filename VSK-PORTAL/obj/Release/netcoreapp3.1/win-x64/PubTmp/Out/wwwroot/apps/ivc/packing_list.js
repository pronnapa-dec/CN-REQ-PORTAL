'use strict';

let fs = firebase.firestore();

let collection = 'lov_cn';
let oTable, name, oTable_inv;
const url_tms_api = "http://192.168.1.247/tms-api/";
let url_api_new = "http://localhost:49256/";
let url_api_acc = 'http://192.168.1.247/vsk-api-acc/';

let customer_setup_trp_get = url_api_new + 'v1/Customer_Setup_Trp_Get';
let trp_salefile_get = url_tms_api + 'v1/trp_salefile_get';
let customer_setup_get = url_api_new + 'v1/Customer_Setup_Get';
let packing_job_add = url_api_new + 'v1/Packing_Job_Add';
let packing_job_update = url_api_new + 'v1/Packing_Job_Update';
let packing_job_get = url_api_new + 'v1/Packing_Job_Get';
let Delivery_Zone_Get = url_api_new + 'v1/Delivery_Zone_Get';
let provicne_get = url_api_acc + 'api/ACC/ACCGlb_Province_List_Get';
let amphur_get = url_api_acc + 'api/ACC/ACCGlb_Amphur_List_Get';
let district_get = url_api_acc + 'api/ACC/ACCGlb_District_List_Get';
let vsk_Emmas = url_api_acc + 'api/ACC/VSK_Emmas_Select2_GET';
let emmas_get = url_api_acc + 'api/ACC/VSK_Emmas_GET';
let packing_job_delete = url_api_new + 'v1/Packing_Job_Delete';
let packing_box_get = url_api_new + 'v1/Packing_Job_Box_Get';
let packing_job_invoice_get = url_api_new + 'v1/Packing_Job_Invoice_Get';
let provinc_dataSet = [];
let amphur_dataSet = [];
let tumbol_dataSet = [];
let packing_id, packing_job_no, emmas_code, packing_job_date = moment(new Date()).format('YYYY-MM-DD');
let toDate = new Date();
var packingGet_start = moment().format('YYYY-MM-DD') + ' 00:00:00.0';
var packingGet_end = moment().format('YYYY-MM-DD') + ' 23:59:00.0';
let trp_dataset = [];

$.init =  async function () {
    $('.clear_btn').on('click', function (e) {
        e.preventDefault();
        $("#frm_packing_search").trigger("reset");
        $("#emmas_code_search option").remove();
        $("#vendor_id_search option").remove();
        $('#vendor_id_search').append($("<option></option>").attr("value", '').text('Please select..'));
        $.emmas_trp_get();
        $('#packing_job_date_search').val(moment().format('DD/MM/YYYY') + '-' + moment().format('DD/MM/YYYY')).trigger('change')

    })
    await $.List();

    $('.fc-datepicker').datepicker({
        dateFormat: 'dd/mm/yy',
        autoclose: true,
    });
    $('.search_list').on('click', function () {
        $('#frm_packing_search').parsley().on('form:submit', function () {
            //alert('aa');
            $("#global-loader").fadeIn("slow");

            packing_job_date = $('#packing_job_date_search').val() != "" ? moment($('#packing_job_date_search').val(), 'DD/MM/YYYY').format('YYYY-MM-DD') : moment(toDate).format('YYYY-MM-DD');
            $.List();
            return false
        });
    })

    $.emmas_select2();
    $.Provicne_Get();
    $.Amphur_Get();
    $.District_Get();

    //$('#packing_job_date_search').val(moment(new Date()).format('DD/MM/YYYY')).trigger('change');
    $('#packing_job_date_search').val(moment().format('DD/MM/YYYY') + '-' + moment().format('DD/MM/YYYY'))

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

};

$.Provicne_Get = async function () {
    $(".provicne").append('<option>Please select..</option>').attr("value", '');

    let provicne_get_api = new URL(provicne_get);

    //provicne_get_api.search = new URLSearchParams({
    //    parent_lov_id: parent_lov_id
    //});
    $("#global-loader").fadeIn("slow");


    fetch(provicne_get_api).then(function (response) {
        return response.json();
    }).then(function (result) {
        $("#global-loader").fadeOut("slow");

        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                //footer: '<a href>Why do I have this issue?</a>'
            }).then((result) => {
                if (result.isConfirmed) {

                    location.reload();

                }
            })


        } else {
            $.each(result.data, function (index, item) {
                provinc_dataSet.push({ id: item.glb_province_id, text: item.glb_province_name });
            });

        }
    });

}

$.Emmas_Get = async function (emmas_code) {

    let emmas_get_api = new URL(emmas_get);

    emmas_get_api.search = new URLSearchParams({
        emmas_code: emmas_code
    });

    fetch(emmas_get_api).then(function (response) {
        return response.json();
    }).then(function (result) {
        if (result.status === 'Error') {
            return '';

        } else {

        }
    });

}

$.Amphur_Get = async function () {
    $("#global-loader").fadeIn("slow");

    let amphur_get_api = new URL(amphur_get);

    amphur_get_api.search = new URLSearchParams({
        glb_province_id: ''
    });

    fetch(amphur_get_api).then(function (response) {
        return response.json();
    }).then(function (result) {
        $("#global-loader").fadeOut("slow");

        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                //footer: '<a href>Why do I have this issue?</a>'
            }).then((result) => {
                if (result.isConfirmed) {

                    location.reload();

                }
            })


        } else {
            $.each(result.data, function (index, item) {
                amphur_dataSet.push({ id: item.glb_amphur_id, text: item.glb_amphur_name });

            });

        }
    });

}

$.District_Get = async function () {
    let district_get_api = new URL(district_get);

    $("#global-loader").fadeIn("slow");

    district_get_api.search = new URLSearchParams({
        glb_amphur_id: ''
    });

    fetch(district_get_api).then(function (response) {
        return response.json();
    }).then(function (result) {
        $("#global-loader").fadeOut("slow");

        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                //footer: '<a href>Why do I have this issue?</a>'
            }).then((result) => {
                if (result.isConfirmed) {

                    location.reload();

                }
            })


        } else {
            $.each(result.data, function (index, item) {
                tumbol_dataSet.push({ id: item.glb_district_id, text: item.glb_district_name });
            });
        }
    });

}

$.emmas_select2 = async function () {
    $('#emmas_code_search').select2({
        ajax: {
            url: url_api_acc + 'api/ACC/VSK_Emmas_Select2_GET',
            dataType: 'json',
            width: 'resolve',
            dropdownAutoWidth: true,
            minimumInputLength: 2,
            minimumResultsForSearch: 50,
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
        }
    });

}

$.emmas_trp_get = async function () {
    let url = new URL(Delivery_Zone_Get);

    url.search = new URLSearchParams({
        record_status: '1',
        mode: 'Search'
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {
        //oTable.destroy();
        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                //footer: '<a href>Why do I have this issue?</a>'
            }).then((result) => {
                if (result.isConfirmed) {

                    location.reload();

                }
            })


        } else {

            $.each(result.data, function (index, item) {
                $('.vendor_id')
                    .append($("<option>Please select..</option>")
                        .attr("value", item['id'])
                        .text(item['name']));

            });
        }
    });
}

$.cus_addr = async function (pk_data) {

    let url = new URL(customer_setup_get);

    url.search = new URLSearchParams({
        id: pk_data['emmas_addr_id'],
        emmas_code: pk_data['emmas_code'],
        Mode: 'Search'
        //record_status: '1'
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {
        //oTable.destroy();
        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                //footer: '<a href>Why do I have this issue?</a>'
            }).then((result) => {
                if (result.isConfirmed) {

                    location.reload();

                }
            })


        } else {
            let provinc, amphur, tumbol;

            console.log('provinc_dataSet', result.data)
            if (provinc_dataSet != '') {
                let provinc_find = provinc_dataSet.find(obj => obj.id == result.data[0]['eprovinc']);
                console.log('provinc_dataSet', provinc_dataSet)
                console.log('provinc_find', provinc_find)
                console.log('eprovinc', result.data[0]['eprovinc'])
                provinc = provinc_find.text
            }
            if (amphur_dataSet) {
                let amphur_find = amphur_dataSet.find(obj => obj.id == result.data[0]['eamphur']);
                amphur = amphur_find.text
            }
            if (tumbol_dataSet) {
                let tumbol_find = tumbol_dataSet.find(obj => obj.id == result.data[0]['etumbol']);
                tumbol = tumbol_find.text
            }
            $('#emmas_addr').data('id', result.data[0]['id']);
            $('#emmas_addr').val(result.data[0]['eaddress'] + " ต." + tumbol + " อ." + amphur + " จ." + provinc + "  " + result.data[0]['ezip']);

            //$('#emmas_addr')
            //    .append($("<option>Please select..</option>")
            //        .attr("value", result.data[0]['id'])
            //        .text(result.data[0]['eaddress'] + " ต." + tumbol + " อ." + amphur + " จ." + provinc + "  " + result.data[0]['ezip']));
        }
    })

};

$.List_inv = async function (pk_data) {
    let url = new URL(packing_job_invoice_get);

    url.search = new URLSearchParams({
        packing_job_id: pk_data['id'],
        packing_job_no: pk_data['packing_job_no'],
        //packing_job_end_date: packingGet_end,
        mode: 'Search'
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {
        //oTable.destroy();
        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                //footer: '<a href>Why do I have this issue?</a>'
            }).then((result) => {
                if (result.isConfirmed) {

                    location.reload();

                }
            })


        } else {
            oTable_inv = $('#tbl-list-detail').DataTable({
                data: result.data,
                scrollCollapse: true,
                paging: false,
                info: false,
                destroy: true,
                searching: false,
                scrollX: false,
                scrollY: "410px",
                columns: [
                    {
                        title: "<span style='font-size:11px;'>ลำดับ</span>",
                        width: "70px",
                        visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return (meta.row + 1);
                        }

                    }, //0
                    {
                        title: "<span style='font-size:11px;'>ลำดับ</span>",
                        width: "70px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return (meta.row + 1);
                        }

                    }, //1 

                    {
                        title: "<span style='font-size:11px;'>วันที่บิล</span>",
                        data: "salefile_startdate",
                        width: "100px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {

                            return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '</span>';
                        }
                    }, //2

                    {
                        title: "<span style='font-size:11px;'>เลขที่บิล</span>",
                        data: "salefile_number",
                        width: "100px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>ใบสั่งจัด</span>",
                        data: "salefile_invpo",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>จำนวน</span>",
                        data: "salefile_item",
                        width: "70px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';

                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>ผู้ออกใบเสร็จ</span>",
                        data: "salefile_userid",
                        width: "100px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //2

                    {
                        title: "<span style='font-size:11px;'>จัดการ</span>",
                        class: "tx-center ",
                        visible: false,
                        data: "id",
                        width: "50px",
                        render: function (data, type, row, meta) {
                            let data_row = JSON.stringify(row)
                            //return "<a type='button' class='btn-floating btn-lg blue action' data-id='" + data + " 'data-toggle='dropdown' style='color:#0162e8'> <i class='fas fa-minus-circle'></i></a><div class='dropdown-menu'><a  class='dropdown-item btn-action' data-row='" + data_row + "' data-action='view'>View<input type='file' style='display: none;' multiple=''></a><a  class='dropdown-item btn-action' data-row='" + data_row + "' data-action='edit'>Edit<input type='file' style='display: none;' multiple=''></a><a  class='dropdown-item btn-action'  data-row='" + data_row + "'data-action='delete'>Delete<input type='file' style='display: none;' multiple=''></a></div></div>"
                            return '<a type="button" class="btn-delete btn-floating btn-lg blue-gradient" data-id="' + data + '"><i class="fas fa-minus-circle" style="color: #FF0000;"></i></a>'
                        }
                    }, //5
                ],


                "order": [[1, "desc"]],
            });

        }
    })

};

$.List = async function () {
    let url = new URL(packing_job_get);

    packingGet_start = $('#packing_job_date_search').val() != '' ? moment($('#packing_job_date_search').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment().format('YYYY-MM-DD') + ' 00:00';  //ถ้าไม่เลือกจะเป็นค่าว่าง
    packingGet_end = $('#packing_job_date_search').val() != '' ? moment($('#packing_job_date_search').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';

    url.search = new URLSearchParams({
        mode: 'Search',
        //record_status: '1',
        packing_job_no: $('#packing_job_no_search').val(),
        packing_ref_code: $('#packing_ref_code_search').val(),
        emmas_code: $('#emmas_code_search').val(),
        vendor_id: $('#vendor_id_search').val(),
        packing_delivery_name: $('#emmas_addr_id_search').val(),
        created_by: $('#created_by_search').val(),
        packing_job_start_date: packingGet_start,
        packing_job_end_date: packingGet_end,

    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {
        //oTable.destroy();
        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                //footer: '<a href>Why do I have this issue?</a>'
            }).then((result) => {
                if (result.isConfirmed) {

                    location.reload();

                }
            })


        } else {

            oTable = $('#tbl-list').DataTable({
                data: result.data,
                scrollX: true,
                //"pageLength": 100,
                //scrollCollapse: true,
                //autoWidth: true,
                //paging: true,
                scrollY: "410px",
                scrollCollapse: true,
                paging: false,
                destroy: true,
                columns: [
                    {
                        title: "<span style='font-size:11px;'>พิมพ์</span>",
                        data: "id",
                        width: "70px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            let data_row = JSON.stringify(row)
                            return '<a type="button" class="btn-floating btn-lg blue-gradient" data-id="' + data + '"><i class="fas fa-print"></i></a>'
                        }

                    }, //1 

                    {
                        title: "<span style='font-size:11px;'>วันที่บิล</span>",
                        data: "packing_job_date",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {

                            return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '</span>';
                        }
                    }, //2

                    {
                        title: "<span style='font-size:11px;'>ใบงาน</span>",
                        data: "packing_job_no",
                        width: "100px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            let data_row = JSON.stringify(row)

                            return "<a  class='dropdown-item btn-action' data-row='" + data_row + "' data-action='view' style='font-size: 11px;'>"+data+"<input type='file' style='display: none;' multiple=''></a>";
                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>รหัสลูกค้า</span>",
                        data: "emmas_code",
                        width: "70px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>ชื่อลูกค้า</span>",
                        data: "emmas_name",
                        width: "300px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //5
                    {
                        title: "<span style='font-size:11px;'>ผู้รับ</span>",
                        data: "packing_delivery_name",
                        width: "150px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //6
                    {
                        title: "<span style='font-size:11px;'>กล่อง</span>",
                        data: "packing_box_qty",
                        width: "70px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data == null) {
                                return '<span style="font-size:11px;">'+0+'</span>';
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //7
                    {
                        title: "<span style='font-size:11px;'>ใบเสร็จ</span>",
                        data: "inv_qty",
                        width: "70px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //8
                    {
                        title: "<span style='font-size:11px;'>บริษัทขนส่ง</span>",
                        data: "vendor_name",
                        width: "200px",
                        width: "100px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data == null) {
                                return '<span style="font-size:11px;">' + '' + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }

                        }
                    }, //9
                    {
                        title: "<span style='font-size:11px;'>บาร์โค้ดอ้างอิง</span>",
                        data: "packing_ref_code",
                        width: "100px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data == null) {
                                return '<span style="font-size:11px;"></span>';
                            } else {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            }
                        }
                    }, //10
                    {
                        title: "<span style='font-size:11px;'>ผู้บันทึก</span>",
                        data: "created_by",
                        width: "70px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //11
                    {
                        title: "<span style='font-size:11px;'>วันเวลา/บันทึก</span>",
                        data: "created_datetime",
                        width: "100px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY HH:mm') + '</span>';
                        }
                    }, //12
                    {
                        title: "<span style='font-size:11px;'>สถานะ</span>",
                        data: "record_status",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data == 1) {
                                return '<span style="font-size:11px; color:green">' + 'ใช้งาน' + '</span>';
                            } else if(data == 'delete'){
                                return '<span style="font-size:11px; color:red">' + 'ยกเลิก' + '</span>';
                            }
                        }
                    }, //13
                    {
                        title: "<span style='font-size:11px;'>จัดการ</span>",
                        class: "tx-center ",
                        data: "id",
                        width: "50px",
                        render: function (data, type, row, meta) {
                            let data_row = JSON.stringify(row)
                            //return '<a class="btn btn-info btn-sm glyphicon glyphicon-name" href=#/' + meta[0] + '>' + 'Edit' + '</a>';
                            if (row.record_status == '1') {
                                return "<a type='button' style='margin: 0 5px 0 5px;' class='btn btn-lg action btn-circle btn-info' data-id='" + data + " 'data-toggle='dropdown'> <i style='color:#ecf0fa;' class='fas fa-edit'></i></a><div class='dropdown-menu'><a  class='dropdown-item btn-action' data-row='" + data_row + "' data-action='view'>View<input type='file' style='display: none;' multiple=''></a><a  class='dropdown-item btn-action'  data-row='" + data_row + "'data-action='delete'>Cancel<input type='file' style='display: none;' multiple=''></a></div></div>"
                            } else if (row.record_status == 'delete') {
                                return "<a type='button' style='margin: 0 5px 0 5px;' class='btn btn-lg action btn-circle btn-info' data-id='" + data + " 'data-toggle='dropdown'> <i style='color:#ecf0fa;' class='fas fa-edit'></i></a><div class='dropdown-menu'><a  class='dropdown-item btn-action' data-row='" + data_row + "' data-action='view'>View<input type='file' style='display: none;' multiple=''></a></div></div>"
                            }
                        }
                    }, //14
                ],


                "order": [[1, "desc"]],
                "initComplete": function (settings, json) {
                    
                    // $.LoadingOverlay("hide");

                    $("#global-loader").fadeOut("slow");

                    $('#tbl-list tbody tr').hover(function () {
                        $(this).css('cursor', 'pointer');
                    });
                    $('.btn-action').click(function () {
                        let id = $().data('id');
                        let data = $(this).data('row');

                        if ($(this).data('action') == "view") {
                            $.Details(data,'get');
                        } else if ($(this).data('action') == "delete") {
                            $.Delete(data);
                        }

                        //if ($(this).data('action') == "view") {
                        //    $.Details(data,'get');
                        //} else if ($(this).data('action') == "edit") {
                        //    $.Details(data,'edit');
                        //} else if ($(this).data('action') == "delete") {
                        //    $.Delete(data);
                        //} else {
                        //    alert($(this).data('action'));
                        //}
                    });

                },
            });



        }
    })

};

$.Details = async function (pk_data, type) {
    $.Box_Get(pk_data)
    $.List_inv(pk_data);

    if (pk_data['emmas_addr_id'] == null || pk_data['emmas_addr_id'] == '') {
        $('#emmas_addr').val(pk_data['packing_delivery_addr']);
    } else {
        $.cus_addr(pk_data);
    }

    $('#modal-frm_data').modal('show');
    if (type == 'get') {
        $('.btn-save_form').addClass('hide');
        $('#frm_data').find('input, textarea').attr('readonly', true);
        $('#frm_data').find('select, input:radio').attr('disabled', true);
    } else {
        $('.btn-save_form').removeClass('hide');
        $('#frm_data').find('#lov_deliverycost_code').prop('disabled', false);
        $('#frm_data').find('#vendor_id').prop('disabled', false);
        $('#frm_data').find('#emmas_sender_name').prop('disabled', false);
        $('#frm_data').find('#emmas_addr_id').prop('readonly', false);
        $('#frm_data').find('#emmas_addr').prop('readonly', false);
        $('#frm_data').find('#box_no').prop('readonly', false);
        $('#frm_data').find('#box_size_a').prop('readonly', false);
        $('#frm_data').find('#box_size_b').prop('readonly', false);
        $('#frm_data').find('#box_size_c').prop('readonly', false);
        $('#frm_data').find('#box_size_d').prop('readonly', false);
        $('#frm_data').find('#box_size_e').prop('readonly', false);
        $('#frm_data').find('#box_size_f').prop('readonly', false);
        $('#frm_data').find('#box_size_other').prop('readonly', false);
        $('#frm_data').find('#packing_ref_code').prop('readonly', false);
    }

    $('#packing_job_no').val(pk_data['packing_job_no']);    
    $('#packing_job_date').val(moment(pk_data['packing_job_date']).format('DD-MM-YYYY HH:mm'));
    $('#created_by').val(pk_data['created_by']);
    $('#lov_deliverycost_code').val(pk_data['lov_deliverycost_code']).trigger('change');
    $('#vendor_id').val(pk_data['vendor_id']).trigger('change');
    $('#emmas_sender_name').val(pk_data['emmas_sender_name']).trigger('change');
    $('#emmas_addr_id').val(pk_data['packing_delivery_name']);
    $('#box_no').val(pk_data['packing_box_qty']);
    $('#packing_ref_code').val(pk_data['packing_ref_code']);
    $('#emmas_code').val(pk_data['emmas_code'] + " " + pk_data['emmas_name']);
    $('#emmas_code').val(pk_data['emmas_code'] + " " + pk_data['emmas_name']);
    if (pk_data['record_status'] == '1') {
        $('.record_status').text('ใช้งาน').css('color', 'green');
    } else {
        $('.record_status').text('ยกเลิก').css('color', 'red');
    }
};

$.Box_Get = async function (pk_data) {
    let url = new URL(packing_box_get);

    url.search = new URLSearchParams({
        packing_job_id: pk_data['id']
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {
        //oTable.destroy();
        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                //footer: '<a href>Why do I have this issue?</a>'
            }).then((result) => {
                if (result.isConfirmed) {

                    location.reload();

                }
            })


        } else {

            $.each(result.data, function (index, item) {
                console.log('box', item)
                if (item['lov_packing_box'] == 'PB01') {

                    $('#box_size_a').val(item['packing_box_qty']);

                } else if (item['lov_packing_box'] == 'PB02') {

                    $('#box_size_b').val(item['packing_box_qty']);

                } else if (item['lov_packing_box'] == 'PB03') {

                    $('#box_size_c').val(item['packing_box_qty']);

                } else if (item['lov_packing_box'] == 'PB04') {

                    $('#box_size_d').val(item['packing_box_qty']);

                } else if (item['lov_packing_box'] == 'PB05') {

                    $('#box_size_e').val(item['packing_box_qty']);

                } else if (item['lov_packing_box'] == 'PB06') {

                    $('#box_size_f').val(item['packing_box_qty']);

                } else if (item['lov_packing_box'] == 'PB07') {

                    $('#box_size_other').val(item['packing_box_qty']);

                }

            });
        }
    });
}

$.Create = async function () {
    $('.btn-save_form').click(function () {
        //    alert('click');
        let lov_packing_box = [{
            PB01: $('#box_size_a').val(),
            PB02: $('#box_size_b').val(),
            PB03: $('#box_size_c').val(),
            PB04: $('#box_size_d').val(),
            PB05: $('#box_size_e').val(),
            PB06: $('#box_size_f').val(),
            PB07: $('#box_size_other').val()
        }];

        $('#frm_data').parsley().on('form:submit', function () {

            let add_data = {
                id: packing_id,
                packing_job_no: packing_job_no,
                vendor_id: $('#vendor_id').val(),
                lov_deliverycost_code: $('#lov_deliverycost_code').val(),
                emmas_code: emmas_code,
                emmas_sender_name: $('#emmas_sender_name').val(),
                emmas_addr_id: $('#emmas_addr').data('id'),
                packing_delivery_name: $('#emmas_addr_id').val(),
                packing_ref_code: $('#packing_ref_code').val(),
                packing_box_qty: $('#box_no').val(),
                lov_packing_box: JSON.stringify(lov_packing_box),
                emmas_name: emmas_name,
                inv_number: inv_number,
                record_status: '1',
                updated_by: name,
            };

            var params = [];
            for (const i in add_data) {
                params.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            fetch(packing_job_update, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params.join("&"),
            }).then(data => {
                return data.json();
            }).then(data => {
                if (data.status === 'Error') {
                    toastr.error(data.error_message);

                } else {

                    toastr.success('Save Successfully!', async function () {
                        $(".provicne option").remove();
                        $(".amphur option").remove();
                        $(".district option").remove();
                        $("#frm_packing").trigger("reset");
                        $("#vendor_id option").remove();
                        $("#emmas_sender_name").val('').trigger('change');
                        $('#search_number').val('');
                        $.Provicne_Get();
                        $.List();

                    });
                }

            }).catch((error) => {
                toastr.error(error, 'Error writing document');
                console.log('Error:', error);
            });

            return false;

        });

    });

}

$.Delete = async function (trp_data) {
    swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            let add_data = {
                id: trp_data['id'],
                record_status: 'delete',
                updated_by: name,
            };

            var params = [];
            for (const i in add_data) {
                params.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            fetch(packing_job_delete, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params.join("&"),
            }).then(data => {
                return data.json();
            }).then(data => {
                if (data.status === 'Error') {
                    toastr.error(data.error_message);

                } else {
                    swal.fire("Done!", "It was succesfully deleted!", "success");
                    $.List();

                }

            }).catch((error) => {
                swal.fire("Error deleting!" + error, "Please try again", "error");
                console.log('Error:', error);
            });
        }

    });

    return false;

};

$(document).ready(async function () {
    $.emmas_trp_get();
    await $.init();

});

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        var full_mail = user.email;
        name = full_mail.replace("@vskautoparts.com", "");

    } else {

        window.location.assign('./login');

    }

});