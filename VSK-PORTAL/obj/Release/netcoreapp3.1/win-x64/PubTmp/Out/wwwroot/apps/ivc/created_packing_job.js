'use strict';

let fs = firebase.firestore();

let collection = 'lov_cn';
let oTable, name;
const url_tms_api = "http://192.168.1.247/tms-api/";
let url_api_new = "http://localhost:49256/";
let url_api_acc = 'http://192.168.1.247/vsk-api-acc/';

let customer_setup_trp_get = url_api_new + 'v1/Customer_Setup_Trp_Get';
let trp_salefile_get = url_tms_api + 'v1/trp_salefile_get';
let customer_setup_get = url_api_new + 'v1/Customer_Setup_Get';
let packing_job_add = url_api_new + 'v1/Packing_Job_Add';
let packing_job_update = url_api_new + 'v1/Packing_Job_Update';
let packing_job_invoice_get = url_api_new + 'v1/Packing_Job_Invoice_Get';
let packing_job_get = url_api_new + 'v1/Packing_Job_Get';
let Delivery_Zone_Get = url_api_new + 'v1/Delivery_Zone_Get';
let provicne_get = url_api_acc + 'api/ACC/ACCGlb_Province_List_Get';
let amphur_get = url_api_acc + 'api/ACC/ACCGlb_Amphur_List_Get';
let district_get = url_api_acc + 'api/ACC/ACCGlb_District_List_Get';
let packing_job_delete = url_api_new + 'v1/Packing_Job_Delete';
let Box_Add = url_api_new + 'v1/Packing_Job_Box_Add';
let Box_Get = url_api_new + 'v1/Packing_Job_Box_Get';
let packing_job_chk = url_api_new + 'v1/Packing_Job_Chk';
let packing_job_list = url_api_new + 'v1/Packing_Job_List';
let packing_job_invoice_add = url_api_new + 'v1/Packing_Job_Invoice_Add';
let packing_job_invoice_update = url_api_new + 'v1/Packing_Job_Invoice_Update';
let packing_job_invoice_delete = url_api_new + 'v1/Packing_Job_Invoice_Delete';
let provinc_dataSet = [];
let amphur_dataSet = [];
let tumbol_dataSet = [];
let deliveryZone_dataSet = [];
let packing_id, packing_job_no = '', emmas_code, inv_number, emmas_name, trp_salefile_user_id;
let detect = 0;
var packingGet_start = '2020-11-01 00:00:00.0';
var packingGet_end = moment().format('YYYY-MM-DD') + ' 23:59:00.0';


$.init = function () {
    $.TrpSalefileGet();
    $.Provicne_Get();
    $.Amphur_Get();
    $.District_Get();

    $('.clear_btn').on('click', function (e) {
        e.preventDefault();

        $("#emmas_sender_name").val('').trigger('change');
        $('#search_number').val('');
        $('#frm_packing').trigger('reset');
        $("#emmas_addr_id option").remove();
        //    $('#emmas_addr_id').append($("<option>Please select..</option>"));
        $('#tbl-list').html('<tbody><tr class="odd" style="cursor: pointer;"><td valign="top" colspan="7" class="dataTables_empty">No data available in table</td></tr></tbody>');
        $('#save_detail').prop('disabled', false);
    })

    //$.List();

    $("input.numbers").keypress(function (event) {
        return isNumber(event, this)
    });

    $("input.use_box").keyup(function (event) {
        let size_a = $('#box_size_a').val() != '' ? parseInt($('#box_size_a').val()) : 0;
        let size_b = $('#box_size_b').val() != '' ? parseInt($('#box_size_b').val()) : 0;
        let size_c = $('#box_size_c').val() != '' ? parseInt($('#box_size_c').val()) : 0;
        let size_d = $('#box_size_d').val() != '' ? parseInt($('#box_size_d').val()) : 0;
        let size_e = $('#box_size_e').val() != '' ? parseInt($('#box_size_e').val()) : 0;
        let size_f = $('#box_size_f').val() != '' ? parseInt($('#box_size_f').val()) : 0;
        let size_other = $('#box_size_other').val() != '' ? parseInt($('#box_size_other').val()) : 0;

        let use_box = (size_a + size_b + size_c + size_d + size_e + size_f + size_other )
        $('#box_no').val(use_box);
    })

    $('#save_detail').on('click', function () {
        $('#frm_packing').parsley().on('form:submit', function () {

            $("#global-loader").fadeIn("slow");

            let lov_packing_box = [];
            if ($('#box_size_a').val() != '') {
                lov_packing_box.push({ lov_packing_box: 'PB01', packing_box_qty: $('#box_size_a').val()});
            }
            if ($('#box_size_b').val() != '') {
                lov_packing_box.push({ lov_packing_box: 'PB02', packing_box_qty: $('#box_size_b').val()});
            }
            if ($('#box_size_c').val() != '') {
                lov_packing_box.push({ lov_packing_box: 'PB03', packing_box_qty: $('#box_size_c').val()});
            }
            if ($('#box_size_d').val() != '') {
                lov_packing_box.push({ lov_packing_box: 'PB04', packing_box_qty: $('#box_size_d').val()});
            }
            if ($('#box_size_e').val() != '') {
                lov_packing_box.push({ lov_packing_box: 'PB05', packing_box_qty: $('#box_size_e').val()});
            }
            if ($('#box_size_f').val() != '') {
                lov_packing_box.push({ lov_packing_box: 'PB06', packing_box_qty: $('#box_size_f').val()});
            }
            if ($('#box_size_other').val() != '') {
                lov_packing_box.push({ lov_packing_box: 'PB07', packing_box_qty: $('#box_size_other').val()});
            }         

            $.Update();
            if (lov_packing_box == '') {
                $("#global-loader").fadeOut("slow");
                Swal.fire({
                    icon: 'warning',
                    title: 'ข้อมูลไม่ถูกต้อง',
                    text: 'กรุณาระบุจำนวนกล่อง !',
                    //footer: '<a href>Why do I have this issue?</a>'
                }).then((result) => {
                    if (result.isConfirmed) {

                        //location.reload();

                    }
                })
            } else {
                $.each(lov_packing_box, function (index, item) {
                    setTimeout(function () {
                        $.Create_Box(item);
                    }, 3000)
                });
            }
            return false;
        });
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

$.TrpSalefileGet = async function () {
    $('#btn-search').on('click',function (e) {
        e.preventDefault();

        $("#global-loader").fadeIn("slow");

        let packing_job_chk_api = new URL(packing_job_chk);

        packing_job_chk_api.search = new URLSearchParams({
            salefile_number: $('#search_number').val(),
            record_status: '1',
            mode: 'Search'

        });

        fetch(packing_job_chk_api).then(function (response) {
            return response.json();
        }).then(function (result) {

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
                if (result.length > 0) {
                    $("#global-loader").fadeOut("slow");

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'เลขที่บิลซ้ำ!',
                        //footer: '<a href>Why do I have this issue?</a>'
                    })
                } else {
                    let trp_salefile_get_api = new URL(trp_salefile_get);

                    trp_salefile_get_api.search = new URLSearchParams({
                        number: $('#search_number').val()
                    });

                    fetch(trp_salefile_get_api).then(function (response) {
                        return response.json();
                    }).then(function (result) {

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
                            let evname;
                            let invcode;

                            $.each(result.data, function (index, item) {
                                //$('#emmas_code').val(item['invcode'] + ' ' + item['invname']);
                                evname = $.trim(item['evname']);
                                invcode = $.trim(item['invcode']);

                                if (evname != '') {
                                    $('#emmas_addr').val(evname);
                                    if ($('#packing_job_no').val() == '') {
                                        $("#emmas_addr_id option").remove();
                                        $("#emmas_addr_id option:first").attr('selected', 'selected');
                                        $('#emmas_addr_id').append($("<option>Please select..</option>").attr("value", item['evadd']).text(item['evadd']));
                                    }
                                    detect = 1;
                                } else {
                                    $('#emmas_addr').val(invcode + ' ' + item['invname']);
                                    if ($('#packing_job_no').val() == '') {
                                        $("#emmas_addr_id option").remove();
                                        $("#emmas_addr_id option:first").attr('selected', 'selected');
                                    //    $('#emmas_addr_id').append($("<option>Please select..</option>"));
                                    }
                                    detect = 0;
                                }
                            });

                            if ($('#packing_job_no').val() == '') {
                                $.Create_job(result.data);
                            } else if ($('#emmas_code').data('evname') == evname || $('#emmas_code').data('code') == invcode) {
                                $.Create_Invoice_job(result.data);
                            } else {
                                $("#global-loader").fadeOut("slow");
                                Swal.fire({
                                    icon: 'error',
                                    title: 'กรุณาเช็คเลขที่บิล',
                                    text: 'กรุณากรอกเลขที่บิลที่จัดส่งลูกค้าเดียวกัน!',
                                    //footer: '<a href>Why do I have this issue?</a>'
                                })
                            }

                        }
                    });

                }
            }
        });
    });
}

$.Get_TRP = async function (trp_data) {
    let url = new URL(customer_setup_trp_get);

    url.search = new URLSearchParams({
        emmas_code: $.trim(trp_data[0]['emmas_code']),
        mode: 'Search',
        record_status: '1'
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
            $("#vendor_id option").remove();
            //$('#vendor_id').append($("<option></option>").attr({ "value": '', "data-type": '' }).text('Please select..'));
            $.each(result.data, function (index, item) {
                let name_obj = deliveryZone_dataSet.find(obj => obj.id === item.vendor_id);
                let name_delivery = name_obj.text;
                $('#vendor_id')
                    .append($("<option></option>").attr({ "value": item.vendor_id, "data-type": item.lov_deliverycost_code }).text(name_delivery));
            });

            setTimeout(function () {
                $("#vendor_id option:first").attr('selected', 'selected').trigger('change');
            }, 1000);

            $('#vendor_id').on('change', function () {
                $('#lov_deliverycost_code').val($('#vendor_id option:selected').data('type'));
            })
        }
    })
}

$.Delivery_Zone_Get = async function () {

    let url = new URL(Delivery_Zone_Get);

    url.search = new URLSearchParams({
        //record_status: '1',
        mode: 'Search',
        //id: trp_data
        //name: $('#name_transprot_search').val(),
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

            $.each(result.data, function (key, val) {
                deliveryZone_dataSet.push({ id: val.id, text: val.name });
            });
        }
    });

}

$.List_cus_addr = async function (trp_data) {

    let url = new URL(customer_setup_get);

    url.search = new URLSearchParams({
        emmas_code: $.trim(trp_data[0]['emmas_code']),
        mode: 'Search'
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
            if (result.length > 0) {
                let provinc, amphur, tumbol;

                if (provinc_dataSet) {
                    let provinc_find = provinc_dataSet.find(obj => obj.id == result.data[0]['eprovinc']);
                    //console.log('provinc_dataSet', provinc_dataSet)
                    //console.log('eprovinc', result.data[0]['eprovinc'])
                    //console.log('provinc_find', provinc_find)
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
                $('#emmas_addr_id').data('id', result.data[0]['id']);
                //$('#emmas_addr').val(result.data[0]['eaddress'] + " ต." + tumbol + " อ." + amphur + " จ." + provinc + "  " + result.data[0]['ezip']);
                //alert(result.data[0]['eaddress'] + " ต." + tumbol + " อ." + amphur + " จ." + provinc + "  " + result.data[0]['ezip']);
                let addr = result.data[0]['eaddress'] + " ต." + tumbol + " อ." + amphur + " จ." + provinc + "  " + result.data[0]['ezip'];
                $('#emmas_addr_id').append($("<option>Please select..</option>").attr("value", result.data[0]['id']).text(addr));
            }

        }
    })

};

$.Packing_Get = async function (trp_data,type) {

    let packing_job_get_api = new URL(packing_job_list);


    packing_job_get_api.search = new URLSearchParams({
        emmas_code: type == 'create' ? $.trim(trp_data[0]['invcode']) : trp_data['emmas_code'],
        record_status: '1',
        mode: 'Search',
        //packing_job_start_date: packingGet_start,
        //packing_job_end_date: packingGet_end,
        packing_job_no: type == 'create' ? '' : trp_data['packing_job_no'],
    });

    fetch(packing_job_get_api).then(function (response) {
        return response.json();
    }).then(function (result) {
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
            $("#global-loader").fadeOut("slow");

            $.Details(result.data)
            $.Get_TRP(result.data);
            $.List_cus_addr(result.data);
            packing_id = result.data[0]['id'];
            packing_job_no = result.data[0]['packing_job_no'];
            inv_number = result.data[0]['inv_number'];
            emmas_name = result.data[0]['emmas_name'];
            emmas_code = result.data[0]['emmas_code'];
            $.List();
            $("#save_detail").data("trp", result.data);
        }
    });

}

$.List = async function () {
    let url = new URL(packing_job_invoice_get);

    url.search = new URLSearchParams({
        packing_job_id: packing_id,
        packing_job_no: packing_job_no,
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
            oTable = $('#tbl-list').DataTable({
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
                "initComplete": function (settings, json) {
                    
                    // $.LoadingOverlay("hide");

                    $("#global-loader").fadeOut("slow");

                    //$('#tbl-list tbody tr').hover(function () {
                    //    $(this).css('cursor', 'pointer');
                    //});

                    //$('.btn-action').click(function () {
                    //    let id = $().data('id');
                    //    let data = $(this).data('row');

                    //    if ($(this).data('action') == "view") {
                    //        //$("#vendor_id option").remove();
                    //        $.Packing_Get(data,'get');
                    //    } else if ($(this).data('action') == "edit") {
                    //        //$("#vendor_id option").remove();
                    //        $.Packing_Get(data, 'edit');

                    //    } else if ($(this).data('action') == "delete") {
                    //        $.Delete(data);
                    //    //} else {
                    //    //    alert($(this).data('action'));
                    //    }
                    //});
                    $('.btn-delete').on('click', function () {
                        let id = $(this).data('id');
                        $.Delete(id);
                    })
                },
            });

        }
    })

};

$.Create_job = async function (trp_data) {

    let delivery_name = (trp_data[0]['invcode'] + ' ' + trp_data[0]['invname']);

    let add_data = {
        emmas_code: $.trim(trp_data[0]['invcode']), 
        //packing_delivery_name: trp_data[0]['invname'],
        record_status: '1', //$("#record_status_1").is(":checked") === true ? '1' : '0',
        created_by: name,
        packing_delivery_addr: detect == 1 ? $.trim(trp_data[0]['evadd']) : '',
        packing_delivery_name: detect == 1 ? $.trim(trp_data[0]['evname']) : delivery_name,
        vendor_id: '',
        salefile_number: $.trim(trp_data[0]['number']),
        salefile_name: $.trim(trp_data[0]['invname']),
        salefile_invcode: $.trim(trp_data[0]['invcode']),
        salefile_invpo: $.trim(trp_data[0]['invpo']),
        salefile_userid: $.trim(trp_data[0]['userid']),
        salefile_startdate: $.trim(trp_data[0]['startdate']),
        salefile_evcode: $.trim(trp_data[0]['evcode']),
        salefile_evname: $.trim(trp_data[0]['evname']),
        salefile_evadd: $.trim(trp_data[0]['evadd']),
        salefile_tsno: $.trim(trp_data[0]['tsno']),
        salefile_item: $.trim(trp_data[0]['item']),
    };

    var params = [];
    for (const i in add_data) {
        params.push(i + "=" + encodeURIComponent(add_data[i]));
    }

    fetch(packing_job_add, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params.join("&"),
    }).then(data => {
        return data.json();
    }).then(data => {
        if (data.status === 'Error') {
            $("#global-loader").fadeOut("slow");
            toastr.error(data.error_message);

        } else {
            $("#global-loader").fadeOut("slow");
            $.Packing_Get(trp_data,'create')
        } 
    }).catch((error) => {
        toastr.error(error, 'Error writing document');
        console.log('Error:', error);
    });

};

$.Create_Invoice_job = async function (trp_data) {

    let delivery_name = (trp_data[0]['invcode'] + ' ' + trp_data[0]['invname']);

    let add_data = {
        packing_job_id: $('#packing_job_no').data('id'),
        packing_job_no: $('#packing_job_no').val(),
        salefile_number: $.trim(trp_data[0]['number']),
        salefile_name: $.trim(trp_data[0]['invname']),
        salefile_invcode: $.trim(trp_data[0]['invcode']),
        salefile_invpo: $.trim(trp_data[0]['invpo']),
        salefile_userid: $.trim(trp_data[0]['userid']),
        salefile_startdate: $.trim(trp_data[0]['startdate']),
        salefile_evcode: $.trim(trp_data[0]['evcode']),
        salefile_evname: $.trim(trp_data[0]['evname']),
        salefile_evadd: $.trim(trp_data[0]['evadd']),
        salefile_tsno: $.trim(trp_data[0]['tsno']),
        salefile_item: $.trim(trp_data[0]['item']),
        record_status: '1', //$("#record_status_1").is(":checked") === true ? '1' : '0',
        created_by: name

    };

    var params = [];
    for (const i in add_data) {
        params.push(i + "=" + encodeURIComponent(add_data[i]));
    }

    fetch(packing_job_invoice_add, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params.join("&"),
    }).then(data => {
        return data.json();
    }).then(data => {
        if (data.status === 'Error') {
            $("#global-loader").fadeOut("slow");
            toastr.error(data.error_message);

        } else {
            $("#global-loader").fadeOut("slow");
            $.List();
        }
    }).catch((error) => {
        toastr.error(error, 'Error writing document');
        console.log('Error:', error);
    });

};

$.Update = async function () {
    let add_data = {
        id: packing_id,
        vendor_id: $('#vendor_id').val(),
        lov_deliverycost_code: $('#lov_deliverycost_code').val(),
        emmas_code: emmas_code,
        emmas_sender_name: $('#emmas_sender_name').val(),
        emmas_addr_id: detect == 0 ? $('#emmas_addr_id').val() : '',
        packing_delivery_addr: detect == 1 ? $('#emmas_addr_id').val() : '',
        packing_delivery_name: $('#emmas_addr').val(),
        packing_ref_code: $('#packing_ref_code').val(),
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
            });
        }

    }).catch((error) => {
        toastr.error(error, 'Error writing document');
        console.log('Error:', error);
    });
}

$.Create_Box = async function (box_item) {
    let add_data = {
        packing_job_id: packing_id,
        packing_job_no: $('#packing_job_no').val(),
        lov_packing_box: box_item.lov_packing_box,
        packing_box_qty: box_item.packing_box_qty,
        record_status: '1',
        created_by: name
    };

    var params = [];
    for (const i in add_data) {
        params.push(i + "=" + encodeURIComponent(add_data[i]));
    }

    fetch(Box_Add, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
                $("#global-loader").fadeOut("slow");
                $('#save_detail').prop('disabled', true);
            });
        }

    }).catch((error) => {
        toastr.error(error, 'Error writing document');
        console.log('Error:', error);
    });
}

$.Details = async function (pk_data) {

    console.log(pk_data);

    $('#emmas_code').val(pk_data[0]['emmas_code'] + " " + pk_data[0]['emmas_name']);
    $('#packing_job_no').val(pk_data[0]['packing_job_no']);
    $('#packing_job_no').data('id',pk_data[0]['id']);
    $('#packing_job_date').val(moment(pk_data[0]['packing_job_date']).format('DD-MM-YYYY'));
    $('#created_by').val(pk_data[0]['created_by']);

    if (detect == 1) {
        $('#emmas_code').data('evname', pk_data[0]['packing_delivery_name']);
    } else {
        $('#emmas_code').data('code', pk_data[0]['emmas_code']);
    }
    //let lov_packing_box_get = JSON.parse(pk_data[0]['lov_packing_box']);
    //$.each(lov_packing_box_get, function (index, item) {
    //    $('#box_size_a').val(item.PB01);
    //    $('#box_size_b').val(item.PB02);
    //    $('#box_size_c').val(item.PB03);
    //    $('#box_size_d').val(item.PB04);
    //    $('#box_size_e').val(item.PB05);
    //    $('#box_size_f').val(item.PB06);
    //    $('#box_size_other').val(item.PB07);
    //});
    //$('#box_no').val(pk_data[0]['packing_box_qty'])

};

$.Delete = async function (id) {
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
                id: id,
                record_status: 'delete',
                updated_by: name,
            };

            var params = [];
            for (const i in add_data) {
                params.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            fetch(packing_job_invoice_delete, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
    $.Delivery_Zone_Get();
    await $.init();

});

function isNumber(evt, element) {

    var charCode = (evt.which) ? evt.which : event.keyCode

    if (
        //(charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
        //(charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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