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
let packing_job_get = url_api_new + 'v1/Packing_Job_Get';
let Delivery_Zone_Get = url_api_new + 'v1/Delivery_Zone_Get';
let provicne_get = url_api_acc + 'api/ACC/ACCGlb_Province_List_Get';
let amphur_get = url_api_acc + 'api/ACC/ACCGlb_Amphur_List_Get';
let district_get = url_api_acc + 'api/ACC/ACCGlb_District_List_Get';
let packing_job_delete = url_api_new + 'v1/Packing_Job_Delete';
let Box_Add = url_api_new + 'v1/Packing_Job_Box_Add';
let Box_Get = url_api_new + 'v1/Packing_Job_Box_Get';
let provinc_dataSet = [];
let amphur_dataSet = [];
let tumbol_dataSet = [];
let deliveryZone_dataSet = [];
let packing_id, packing_job_no = '', emmas_code, inv_number, emmas_name, trp_salefile_user_id;
var packingGet_start = '2020-11-01 00:00:00.0';
var packingGet_end = moment().format('YYYY-MM-DD') + ' 23:59:00.0';


$.init = function () {
    $.TrpSalefileGet();
    $.Provicne_Get();
    $.Amphur_Get();
    $.District_Get();

    $('.clear_btn').on('click', function (e) {
        e.preventDefault();

        $("#vendor_id option").remove();
        $("#emmas_sender_name").val('').trigger('change');
        $('#search_number').val('');
    })

    $.List();

    $("input.numbers").keypress(function (event) {
        return isNumber(event, this)
    });

    $('#vendor_id').on('change', function () {
        console.log('result', result.data);
    })
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
    $('#btn-search').click(function (e) {
        e.preventDefault();

        let trp_salefile_get_api = new URL(trp_salefile_get);

        trp_salefile_get_api.search = new URLSearchParams({
            number: $('#search_number').val()
        });

        $("#global-loader").fadeIn("slow");

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
                $("#global-loader").fadeOut("slow");

                //$.each(result.data, function (index, item) {
                //    let emmas_code = item.emmas_code
                //});
                $.Create_job(result.data);

            }
        });

    });
}

$.Get_TRP = async function (trp_data) {
    let url = new URL(customer_setup_trp_get);

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
            var vendor_arr = [];
            var trp_arr = [];
            $.each(result.data, function (index, item) {

                vendor_arr.push(item.vendor_id);

            });

            // Loop through array values
            for (var i = 0; i < vendor_arr.length; i++) {
                if (trp_arr.indexOf(vendor_arr[i]) === -1) {
                    trp_arr.push(vendor_arr[i]);
                    //console.log('trp_arr',trp_arr)
                }
            }

            $.each(trp_arr, function (index, item) {
                $.Delivery_Zone_Get(item);
            });
            console.log("trp", result.data);
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


            //$('#vendor_id').select2({
            //    width: '100%',
            //    height: '40px',
            //    data: result.data,
            //    templateResult: function (data) {
            //        return data.name;
            //    },
            //    sorter: function (data) {
            //        return data.sort(function (a, b) {
            //            return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
            //        });
            //    }
            //});

            $.each(result.data, function (key, val) {
                deliveryZone_dataSet.push({ id: val.id, text: val.name });

                //$('#vendor_id')
                //    .append($("<option>Please select..</option>")
                //        .attr("value", val['id'])
                //        .text(val['name']));
            });


            //$('#vendor_id').val(result.data[0]['id']).trigger('change.select2');

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
            let provinc, amphur, tumbol;

            if (provinc_dataSet) {
                let provinc_find = provinc_dataSet.find(obj => obj.id == result.data[0]['eprovinc']);
                //console.log('provinc_dataSet', provinc_dataSet)
                //console.log('provinc_find', provinc_find)
                //console.log('eprovinc', result.data[0]['eprovinc'])
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

$.Packing_Get = async function (trp_data,type) {

    let packing_job_get_api = new URL(packing_job_get);


    packing_job_get_api.search = new URLSearchParams({
        emmas_code: type == 'create' ? $.trim(trp_data[0]['invcode']) : trp_data['emmas_code'],
        record_status: '1',
        mode: 'Search',
        packing_job_start_date: packingGet_start,
        packing_job_end_date: packingGet_end,
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
            $.Details(result.data,type)
            $.Get_TRP(result.data);
            $.List_cus_addr(result.data);
            packing_id = result.data[0]['id'];
            packing_job_no = result.data[0]['packing_job_no'];
            inv_number = result.data[0]['inv_number'];
            emmas_name = result.data[0]['emmas_name'];
            emmas_code = result.data[0]['emmas_code'];
            $.Create();
            $("#save_detail").data("trp", result.data);
        }
    });

}

$.List = async function () {
    let url = new URL(packing_job_get);

    url.search = new URLSearchParams({
        record_status: '1',
        packing_job_no: packing_job_no,
        packing_job_start_date: packingGet_start,
        packing_job_end_date: packingGet_end,
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
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return (meta.row + 1);
                        }

                    }, //1 

                    {
                        title: "<span style='font-size:11px;'>วันที่บิล</span>",
                        data: "packing_job_date",
                        width: "100px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {

                            return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '</span>';
                        }
                    }, //2

                    {
                        title: "<span style='font-size:11px;'>เลขที่บิล</span>",
                        data: "inv_number",
                        width: "100px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>ใบสั่งจัด</span>",
                        data: "packing_job_no",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>จำนวน</span>",
                        data: "packing_box_qty",
                        width: "70px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';

                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>ผู้ออกใบเสร็จ</span>",
                        data: "trp_salefile_user_id",
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
                            //return '<a class="btn btn-info btn-sm glyphicon glyphicon-name" href=#/' + meta[0] + '>' + 'Edit' + '</a>';
                            return "<a type='button' class='btn-floating btn-lg blue action' data-id='" + data + " 'data-toggle='dropdown' style='color:#0162e8'> <i class='fas fa-minus-circle'></i></a><div class='dropdown-menu'><a  class='dropdown-item btn-action' data-row='" + data_row + "' data-action='view'>View<input type='file' style='display: none;' multiple=''></a><a  class='dropdown-item btn-action' data-row='" + data_row + "' data-action='edit'>Edit<input type='file' style='display: none;' multiple=''></a><a  class='dropdown-item btn-action'  data-row='" + data_row + "'data-action='delete'>Delete<input type='file' style='display: none;' multiple=''></a></div></div>"
                        }
                    }, //5
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
                            $("#vendor_id option").remove();
                            $.Packing_Get(data,'get');
                        } else if ($(this).data('action') == "edit") {
                            $("#vendor_id option").remove();
                            $.Packing_Get(data, 'edit');

                        } else if ($(this).data('action') == "delete") {
                            $.Delete(data);
                        //} else {
                        //    alert($(this).data('action'));
                        }
                    });

                },
            });

        }
    })

};

$.Create_job = async function (trp_data) {

    $("#vendor_id option").remove();
    
    // Model & Repo ไปเปลี่ยนเอาเอง
    //let add_data = {
    //    vendor_id: vendor_id,
    //    lov_deliverycost_code: lov_deliverycost_code,
    //    emmas_code: emmas_code,
    //    emmas_sender_name: emmas_sender_name,
    //    emmas_addr_id: emmas_addr_id,
    //    packing_delivery_name: packing_delivery_name,
    //    packing_delivery_addr: packing_delivery_addr,
    //    packing_delivery_tumbol: packing_delivery_tumbol,
    //    packing_delivery_amphur: packing_delivery_amphur,
    //    packing_delivery_provinc: packing_delivery_provinc,
    //    packing_delivery_zip: packing_delivery_zip,
    //    packing_ref_code: packing_ref_code,
    //    record_status: '1', //$("#record_status_1").is(":checked") === true ? '1' : '0',
    //    created_by: name,
    //    pMessage: ''
    //};
    let lov_packing_box = [{
        PB01: $('#box_size_a').val(),
        PB02: $('#box_size_b').val(),
        PB03: $('#box_size_c').val(),
        PB04: $('#box_size_d').val(),
        PB05: $('#box_size_e').val(),
        PB06: $('#box_size_f').val(),
        PB07: $('#box_size_other').val()
    }];
    console.log(JSON.stringify(lov_packing_box))

    let add_data = {
        emmas_code: $.trim(trp_data[0]['invcode']), 
        inv_number: $('#search_number').val(),
        emmas_name: trp_data[0]['invname'],
        record_status: '1', //$("#record_status_1").is(":checked") === true ? '1' : '0',
        created_by: name,
        vendor_id: '',
        lov_packing_box: JSON.stringify(lov_packing_box),
        trp_salefile_user_id: trp_data[0]['userid']

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
            toastr.error(data.error_message);

        } else {
            $.Packing_Get(trp_data,'create')
        } 
    }).catch((error) => {
        toastr.error(error, 'Error writing document');
        console.log('Error:', error);
    });

};

$.Create = async function () {
    $('#save_detail').click(function () {
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

        $('#frm_packing').parsley().on('form:submit', function () {

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

$.Details = async function (pk_data, type) {

    if (type == 'get') {
        $('#frm_packing').find('input, textarea').attr('readonly', true);
        $('#frm_packing').find('select, input:radio').attr('disabled', true);
    } else {
        $('#frm_packing').find('#lov_deliverycost_code').prop('disabled', false);
        $('#frm_packing').find('#vendor_id').prop('disabled', false);
        $('#frm_packing').find('#emmas_sender_name').prop('disabled', false);
        $('#frm_packing').find('#emmas_addr_id').prop('readonly', false);
        $('#frm_packing').find('#emmas_addr').prop('readonly', false);
        $('#frm_packing').find('#box_no').prop('readonly', false);
        $('#frm_packing').find('#box_size_a').prop('readonly', false);
        $('#frm_packing').find('#box_size_b').prop('readonly', false);
        $('#frm_packing').find('#box_size_c').prop('readonly', false);
        $('#frm_packing').find('#box_size_d').prop('readonly', false);
        $('#frm_packing').find('#box_size_e').prop('readonly', false);
        $('#frm_packing').find('#box_size_f').prop('readonly', false);
        $('#frm_packing').find('#box_size_other').prop('readonly', false);
        $('#frm_packing').find('#packing_ref_code').prop('readonly', false);
    }

    $('#packing_job_no').val(pk_data[0]['packing_job_no']);
    $('#packing_job_date').val(moment(pk_data[0]['packing_job_date']).format('DD-MM-YYYY'));
    $('#created_by').val(pk_data[0]['created_by']);
    let lov_packing_box_get = JSON.parse(pk_data[0]['lov_packing_box']);

    $.each(lov_packing_box_get, function (index, item) {
        $('#box_size_a').val(item.PB01);
        $('#box_size_b').val(item.PB02);
        $('#box_size_c').val(item.PB03);
        $('#box_size_d').val(item.PB04);
        $('#box_size_e').val(item.PB05);
        $('#box_size_f').val(item.PB06);
        $('#box_size_other').val(item.PB07);
    });
    $('#box_no').val(pk_data[0]['packing_box_qty'])

    setTimeout(function () {
        $('#vendor_id').val(pk_data[0]['vendor_id']).trigger('change');
        $("#emmas_sender_name").val(pk_data[0]['emmas_sender_name']).trigger('change');
        $("#emmas_addr_id").val(pk_data[0]['emmas_name']);
        $("#packing_ref_code").val(pk_data[0]['packing_ref_code']);
        $("#lov_deliverycost_code").val(pk_data[0]['lov_deliverycost_code']).trigger('change');
    }, 500);

};

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