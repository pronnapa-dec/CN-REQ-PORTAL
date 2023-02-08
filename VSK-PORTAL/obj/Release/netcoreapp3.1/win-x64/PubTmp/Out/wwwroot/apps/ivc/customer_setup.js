'use strict';

let fs = firebase.firestore();

let collection = 'lov_cn';
let oTable, oTable_trp, name;
let url_api = 'http://192.168.1.247/vsk-api-acc/';
let url_api_new = "http://localhost:49256/";
let customer_get = url_api + 'api/ACC/VSK_Emmas_GET';
let provicne_get = url_api + 'api/ACC/ACCGlb_Province_List_Get';
let amphur_get = url_api + 'api/ACC/ACCGlb_Amphur_List_Get';
let district_get = url_api + 'api/ACC/ACCGlb_District_List_Get';
let postcode_get = url_api + 'api/ACC/ACCGlb_Amphur_postcode_List_Get';
let customer_setup_add = url_api_new + 'v1/Customer_Setup_Add';
let customer_setup_get = url_api_new + 'v1/Customer_Setup_Get';
let Customer_Setup_Update = url_api_new + 'v1/Customer_Setup_Update';
let customer_setup_trp_add = url_api_new + 'v1/Customer_Setup_Trp_Add';
let customer_setup_trp_get = url_api_new + 'v1/Customer_Setup_Trp_Get';
let Customer_Setup_Trp_Update = url_api_new + 'v1/Customer_Setup_Trp_Update';
let Customer_Setup_Delete = url_api_new + 'v1/Customer_Setup_Delete';
let Customer_Setup_Trp_Delete = url_api_new + 'v1/Customer_Setup_Trp_Delete';
let Delivery_Zone_Get = url_api_new + 'v1/Delivery_Zone_Get';
let zone_get = url_api_new + 'v1/Zone_Get';
let route_get = url_api_new + 'v1/Route_Get';

let cus_address, cus_tumbol, cus_amphur, cus_provinc, cus_zip;
let tumbol_dataSet = [];
let amphur_dataSet = [];
let provinc_dataSet = [];
let delivery_zone_dataset = [];
let route_dataSet = [];
let zone_dataSet = [];
let customer_dataSet = [];

$.init = function () {
    $("#global-loader").fadeOut("slow");
    //$.Customer_Get();
    $("#tran_name option").remove();
    $('#tran_name').append($("<option>Please select..</option>"));

    $(".btn-search").on('click', function (e) {
        e.preventDefault();
        $.Customer_Get();
    })

    $(".provicne").on('change', function () {
        $(".amphur option").remove();
        $(".amphur").append('<option>Please select..</option>').attr("value", '');
        $.Amphur_Get($(this).val());
        $(".district").val('').trigger('change');;
        $('#postcode').val('');
    })

    $(".amphur").on('change', function () {
        $(".district option").remove();
        $(".district").append('<option>Please select..</option>').attr("value", '');
        $.District_Get($(this).val());
        $.Postcode_Get($(this).val());
    })

    $("#suggesstion-box").hide();

    $("#customer_code").keyup(function () {
        $.ajax({
            url: url_api + 'api/ACC/VSK_Emmas_Select2_GET',
            data: 'search=' + $(this).val(),
            beforeSend: function () {
                $("#search-box").css("background", "#FFF");
            },
            success: function (result) {
                console.log(result.data)
                $("#suggesstion-box").show();
                $("#suggesstion-box a").remove();

                $.each(result.data, function (index, item) {
                    let code = item['id'];
                    $("#suggesstion-box").append('<a class="list-group-item list-group-item-action list-code" style="width: 349px; cursor: pointer;" data-code="' + code + '">' + item['text'] +'</a>');

                });

                $('#suggesstion-box > a').on('click', function (e) {
                    e.preventDefault();
                    $("#customer_code").val($(this).data('code'));
                    $('#suggesstion-box > a').remove();

                    return false;
                })
            }
        });
    });

    $("#zone").on('change', function () {
        $("#route option").remove();
        $.Route_Get($(this).val());

    })
    $("#btn-item_reset").on('click', function () {
        $('#frm_cus').trigger('reset');
        $('#frm_cus').find('.main-toggle').removeClass('on disabled');
        $('#provicne').val('').trigger('change');
        $('#btn-item-create').prop('disabled', false);
        $('#btn-edit').prop('disabled', false);
        $('.btn-create').removeClass('hide');
        $('.btn-edit').addClass('hide');
        $('#frm_cus').find('input, textarea').attr('readonly', false);
        $('#frm_cus').find('select, input:radio').attr('disabled', false);

    })
    $("#btn-item-trp-cancle").on('click', function () {
        $('#frm_trans').trigger('reset');
        $('#tran_name').val('').trigger('change');
        $('#frm_trans').find('.main-toggle').removeClass('on disabled');
        $('#btn-item-trp-create').prop('disabled', false);
        $('#btn-edit-trp').prop('disabled', false);
        $('.btn-create-trp').removeClass('hide');
        $('.btn-edit-trp').addClass('hide');
        $('#frm_trans').find('input, textarea').attr('readonly', false);
        $('#frm_trans').find('select, input:radio').attr('disabled', false);

    })

    $('#tran_name').select2({
        ajax: {
            url: Delivery_Zone_Get,
            dataType: 'json',
            width: 'resolve',
            dropdownAutoWidth: true,
            minimumInputLength: 2,
            minimumResultsForSearch: 50,
            data: function (params) {
                var query = {
                    mode: 'Search',
                    record_status: 1,
                    name: typeof params.term !== 'undefined' ? params.term : ' ',
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
                            text: item.name,
                            id: item.id
                        }
                    })
                };
            },
        }
    });

    $('.main-toggle').on('click', function () {
        if ($(this).hasClass('disabled') == false) {
            $(this).toggleClass('on');
        }
    })

    $.Create();
    $.Create_trp();
    $.Zone_Get('search');

};

$.Customer_Get = async function () {
    let customer_get_api = new URL(customer_get);

    customer_get_api.search = new URLSearchParams({
        emmas_code: $('#customer_code').val(),
    });

    fetch(customer_get_api).then(function (response) {
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
            customer_dataSet = [];
            $.each(result.data, function (index, item) {
                //console.log('emmas', item['code']);
                $('#cus_code').val(item['code']);
                $('#cus_name').val(item['lname']);
                $('#cus_address_search').val(item['eaddress'] + '  ' + item['etumbol'] + '  ' + item['eamphur'] + '  ' + item['eprovinc'] + '  ' + item['ezip']);
                $('#send_form').val(); // ผู้ส่ง
                $('#sale').val(item['esale']);
                $('#tel').val(item['etel']);
                cus_address = item['eaddress'];
                cus_tumbol = item['etumbol'];
                cus_amphur = item['eamphur'];
                cus_provinc = item['eprovinc'];
                cus_zip = item['ezip'];
                $('.esave-group').html(item['esalegroup']);
                customer_dataSet = { code: item.code, text: item.code + ' ' + item.lname };
            });
            $.List_cus_addr();
            $.List_TRP();

        }

    });
    return false;
}

$.Zone_Get = async function (mode, zone) {
    let zone_get_api = new URL(zone_get);

    zone_get_api.search = new URLSearchParams({
        mode: mode,
        record_status: '1',
    });

    fetch(zone_get_api).then(function (response) {
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
            $.each(result.data, function (index, item) {
                if (mode != '') {
                    $('.zone')
                        .append($("<option>Please select..</option>")
                            .attr("value", item.lov_id)
                            .text(item.lov1));


                } else {
                    zone_dataSet.push({ id: item.lov_id, text: item.lov1 });
                }

            });

        }
    });

}

$.Delivery_Zone_Get = async function () {
    let zone_get_api = new URL(Delivery_Zone_Get);

    zone_get_api.search = new URLSearchParams({
        mode: 'Search',
    });

    fetch(zone_get_api).then(function (response) {
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
            $.each(result.data, function (index, item) {
                $('#tran_name')
                    .append($("<option>Please select..</option>")
                        .attr("value", item.id)
                        .text(item.name));


                delivery_zone_dataset.push({ id: item.id, zone: item.lov_zone_code, route: item.lov_route_code, text: item.name });
            });

        }
    });

}

$.Route_Get = async function (parent_lov_id) {
    let route_get_api = new URL(route_get);

    route_get_api.search = new URLSearchParams({
        parent_lov_id: parent_lov_id
    });

    fetch(route_get_api).then(function (response) {
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
            $.each(result.data, function (index, item) {
                if (parent_lov_id != '') {
                    $('.route')
                        .append($("<option>Please select..</option>")
                            .attr("value", item.lov_id)
                            .text(item.lov1));

                } else {
                    
                    route_dataSet.push({ id: item.lov_id, text: item.lov1 });

                }
            });

        }
    });

}

$.Provicne_Get = async function () {
    $(".provicne").append('<option>Please select..</option>').attr("value", '');

    let provicne_get_api = new URL(provicne_get);

    //provicne_get_api.search = new URLSearchParams({
    //    parent_lov_id: parent_lov_id
    //});


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
                $('.provicne')
                        .append($("<option>Please select..</option>")
                            .attr("value", item.glb_province_id)
                            .text(item.glb_province_name));
                provinc_dataSet.push({ id: item.glb_province_id, text: item.glb_province_name });
            });

        }
    });

}

$.Amphur_Get = async function (provicne_id) {
    let amphur_get_api = new URL(amphur_get);

    amphur_get_api.search = new URLSearchParams({
        glb_province_id: provicne_id
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
                if (provicne_id == '' || provicne_id == null) {
                    amphur_dataSet.push({ id: item.glb_amphur_id, text: item.glb_amphur_name });

                } else {
                    $('.amphur')
                        .append($("<option>Please select..</option>")
                            .attr("value", item.glb_amphur_id)
                            .text(item.glb_amphur_name));

                }
            });

        }
    });

}

$.District_Get = async function (amphur_id) {
    let district_get_api = new URL(district_get);

    district_get_api.search = new URLSearchParams({
        glb_amphur_id: amphur_id
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
                if (amphur_id == '' || amphur_id == null) {
                    tumbol_dataSet.push({ id: item.glb_district_id, text: item.glb_district_name });

                } else {
                    $('.district')
                        .append($("<option>Please select..</option>")
                            .attr("value", item.glb_district_id)
                            .text(item.glb_district_name));

                }
            });
        } 
    });

}

$.Postcode_Get = async function (amphur_id) {
    let postcode_get_api = new URL(postcode_get);

    postcode_get_api.search = new URLSearchParams({
        glb_amphur_id: amphur_id
    });

    fetch(postcode_get_api).then(function (response) {
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
            if (amphur_id != '' || amphur_id != null) {
                $.each(result.data, function (index, item) {
                    $('#postcode').val(item.glb_amphur_postcode);
                });
            }

        }
    });

}

$.List_cus_addr = async function () {

    let url = new URL(customer_setup_get);

    url.search = new URLSearchParams({
        emmas_code: $('#customer_code').val(),
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

            oTable = $('#tbl-cus-list').DataTable({
                data: result.data,
                searching: false,
                scrollCollapse: true,
                paging: false,
                destroy: true,
                scrollX: false,
                scrollY: "410px",

                columns: [
                    {
                        title: "<span style='font-size:11px;'>ลำดับ</span>",
                        data:'id',
                        width: "70px",
                        visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return data
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
                        title: "<span style='font-size:11px;'>ที่อยู่</span>",
                        data: "eaddress",
                        width: "100px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            let tumbol, amphur
                            if (row.etumbol != '' && row.etumbol != null) {
                                let tumbol_obj = tumbol_dataSet.find((item, i) => {
                                    //console.log(item.id == val)
                                    if (item.id == row.etumbol) {
                                        return true; // stop searching
                                    }
                                });
                                tumbol = tumbol_obj.text
                            } else {
                                tumbol = '';
                            }
                            if (row.eamphur != '' && row.eamphur != null) {
                                let amphur_obj = amphur_dataSet.find((item, i) => {
                                    if (item.id == row.eamphur) {
                                        return true; // stop searching
                                    }
                                });
                                amphur = amphur_obj.text
                            } else {
                                amphur = '';
                            }
                            return '<span style="font-size:11px;">' + data + '  ' + tumbol + ' ' + amphur +'</span>';
                        }
                    }, //2

                    {
                        title: "<span style='font-size:11px;'>จังหวัด</span>",
                        data: "eprovinc",
                        width: "70px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data != '' && data != null) {
                                //let provinc_obj = provinc_dataSet.find(obj => obj.id === data);
                                let provinc_obj = provinc_dataSet.find((item, i) => {
                                    if (item.id == data) {
                                        return true; // stop searching
                                    }
                                });

                                return '<span style="font-size:11px;">' + provinc_obj.text + '</span>';

                            } else {
                                return '<span style="font-size:11px;">' + '-' + '</span>';

                            }
                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>รหัสไปษณีย์</span>",
                        data: "ezip",
                        width: "70px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>เรื่มต้น</span>",
                        data: "edefault",
                        width: "50px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data == 1) {
                                return '<input type="checkbox" class="editor-active" checked>';
                            } else if (data == 0) {
                                return '<input type="checkbox" class="editor-active">';

                            }                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>จัดการ</span>",
                        class: "tx-center ",
                        data: "id",
                        width: "50px",
                        render: function (data, type, row, meta) {
                            let data_row = JSON.stringify(row)
                            if (row.record_status == '1') {
                                return "<a type='button' style='margin: 0 5px 0 5px;' class='btn btn-lg action btn-circle btn-info' data-id='" + data + " 'data-toggle='dropdown'> <i style='color:#ecf0fa;' class='fas fa-edit'></i></a><div class='dropdown-menu'><a  class='dropdown-item btn-action' data-row='" + data_row + "' data-action='view' style='cursor: pointer;'>View<input type='file' style='display: none;' multiple=''></a><a  class='dropdown-item btn-action' data-row='" + data_row + "' data-action='edit' style='cursor: pointer;'>Edit<input type='file' style='display: none;' multiple=''></a></div></div><a style='margin: 0 5px 0 5px;' type='button' class='btn btn-lg action btn-circle btn-danger btn-action' data-row='" + data_row + "'data-action='delete'><i style='color:#ecf0fa;' class='fa fa-trash'></i></a>"
                            } else if (row.record_status == 'delete') {
                                return "<a type='button' style='margin: 0 5px 0 5px;' class='btn btn-lg action btn-circle btn-info' data-id='" + data + " 'data-toggle='dropdown'> <i style='color:#ecf0fa;' class='fas fa-edit'></i></a><div class='dropdown-menu'><a  class='dropdown-item btn-action' data-row='" + data_row + "' data-action='view' style='cursor: pointer;'>View<input type='file' style='display: none;' multiple=''></a><a  class='dropdown-item btn-action' data-row='" + data_row + "' data-action='edit' style='cursor: pointer;'>Edit<input type='file' style='display: none;' multiple=''></a></div></div>"
                            }
                        }
                    }, //5
                ],


                "order": [[1, "asc"]],
                "initComplete": function (settings, json) {

                    // $.LoadingOverlay("hide");

                    $("#global-loader").fadeOut("slow");

                    $('#tbl-list tbody tr').hover(function () {
                        $(this).css('cursor', 'pointer');
                    });
                    $('.btn-action').click(function () {
                        let id = $().data('id');
                        let data = $(this).data('row');
                        //let data_obj = $.parseJSON(data);

                        if ($(this).data('action') == "view") {
                            $.Details(data);
                        } else if ($(this).data('action') == "edit") {
                            $.Edit(data);
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

$.get_text_route = async function (data){
    delivery_zone_dataset.find((itemz, i) => {
        if (itemz.id == data) {
            route_dataSet.find((item, i) => {

                if (item.id == itemz.route) {
                    //console.log('route', item.id);
                    //console.log('zone', itemz.route);
                    //console.log('all', item.id == itemz.route);

                    return item.text;
                } else {
                    return false;
                }
            });

            //return true; // stop searching
        } else {
            return false;
        }
    });

}

$.List_TRP = async function () {

    let url = new URL(customer_setup_trp_get);

    url.search = new URLSearchParams({
        emmas_code: $('#customer_code').val(),
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
            oTable_trp = $('#tbl-trp-list').DataTable({
                data: result.data,
                searching: false,
                scrollCollapse: true,
                paging: false,
                destroy: true,
                scrollX: false,
                scrollY: "410px",
                columns: [
                    {
                        title: "<span style='font-size:11px;'>ลำดับ</span>",
                        data: 'id',
                        width: "70px",
                        visible: false,
                        class: "tx-center"

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
                        title: "<span style='font-size:11px;'>ชื่อขนส่งเอกชน</span>",
                        data: "name",
                        width: "100px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data != null) {
                                return '<span style="font-size:11px;">' + data + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + '-' + '</span>';
                            }
                        }
                    }, //2

                    {
                        title: "<span style='font-size:11px;'>ชำระค่าขนส่ง</span>",
                        data: "lov_deliverycost_code",
                        width: "70px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data == 1) {
                                return '<span style="font-size:11px;"> ต้นทาง </span>';
                            } else if (data == 2) {
                                return '<span style="font-size:11px;"> ปลายทาง </span>';

                            }
                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>Zone</span>",
                        data: "lov_zone_code",
                        width: "70px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data != null) {
                                return '<span style="font-size:11px;">' + data.replace("Z0", ""); + '</span>';
                            } else {
                                return '<span style="font-size:11px;">' + '-'; + '</span>';
                            }
                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>พื้นที่</span>",
                        data: "lov_route_code",
                        width: "50px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {

                            let route_text = route_dataSet.find((item, i) => {
                                if (item.id == data) {
                                    return true;

                                    //return item.text;
                                } else {
                                    return false;
                                }
                            });

                            return '<span style="font-size:11px;">' + route_text.text + '</span>';

                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>เริ่มต้น</span>",
                        data: "tdefault",
                        width: "50px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data == 1) {
                                return '<input type="checkbox" class="editor-active" checked>';
                            } else if (data == 0) {
                                return '<input type="checkbox" class="editor-active">';

                            }
                            //return '<span style="font-size:11px;">' + data + '</span>';

                        },
                    },
                    //{
                    //    title: "<span style='font-size:11px;'>เริ่มต้น</span>",
                    //    data: "tdefault",
                    //    width: "50px",
                    //    class: "tx-center",
                    //    render: function (data, type, row, meta) {
                    //        return '<span style="font-size:11px;">' + data + '</span>';
                    //    }
                    //}, //4
                    {
                        title: "<span style='font-size:11px;'>จัดการ</span>",
                        class: "tx-center",
                        css: 'style="border-top-width: auto;',
                        data: "id",
                        width: "50px",
                        render: function (data, type, row, meta) {
                            let data_row = JSON.stringify(row)
                            if (row.record_status == '1') {
                                return "<a type='button' style='margin: 0 5px 0 5px;'  class='btn btn-lg action btn-circle btn-info' data-id='" + data + " 'data-toggle='dropdown'> <i style='color:#ecf0fa;' class='fas fa-edit'></i></a><div class='dropdown-menu'><a  class='dropdown-item btn-action' data-row='" + data_row + "' data-action='view'>View<input type='file' style='display: none;' multiple=''></a><a  class='dropdown-item btn-action' data-row='" + data_row + "' data-action='edit'>Edit<input type='file' style='display: none;' multiple=''></a></div></div><a type='button' class='btn btn-lg btn-circle btn-danger btn-action' data-row='" + data_row + "'data-action='delete' style='color:red'><i style='color:#ecf0fa;' class='fa fa-trash'></i></a>"
                            } else if (row.record_status == 'delete'){
                                return "<a type='button' style='margin: 0 5px 0 5px;'  class='btn btn-lg action btn-circle btn-info' data-id='" + data + " 'data-toggle='dropdown'> <i style='color:#ecf0fa;' class='fas fa-edit'></i></a><div class='dropdown-menu'><a  class='dropdown-item btn-action' data-row='" + data_row + "' data-action='view'>View<input type='file' style='display: none;' multiple=''></a><a  class='dropdown-item btn-action' data-row='" + data_row + "' data-action='edit'>Edit<input type='file' style='display: none;' multiple=''></a></div></div>"
                            }
                        }
                    }, //5
                ],


                "order": [[1, "asc"]],
                "initComplete": function (settings, json) {

                    // $.LoadingOverlay("hide");

                    $("#global-loader").fadeOut("slow");

                    $('#tbl-trp-list tbody tr').hover(function () {
                        $(this).css('cursor', 'pointer');
                    });
                    $('#tbl-trp-list .btn-action').click(function () {
                        let id = $().data('id');
                        let data = $(this).data('row');
                        //let data_obj = $.parseJSON(data);

                        if ($(this).data('action') == "view") {
                            $.Details_Trp(data);
                        } else if ($(this).data('action') == "edit") {
                            $.Edit_Trp(data);
                        } else if ($(this).data('action') == "delete") {
                            $.Delete_Trp(data);
                            //} else {
                            //    alert($(this).data('action'));
                        }
                    });

                },
            });
        }
    })
}

$.Create = async function () {

    $('.btn-save_form').click(function () {
    //    alert('click');

        $('#frm_cus').parsley().on('form:submit', function () {
            if ($('#cus_code').val() == '') {
                Swal.fire(
                    'กรุณากรอกข้อมูลให้ถูกต้อง!',
                    'กรุณากรอกรหัสลูกค้า!',
                    'info'
                )
            } else {
                // Model & Repo ไปเปลี่ยนเอาเอง
                let add_data = {
                    emmas_code: $('#cus_code').val(),
                    ecate: '2',
                    eaddress: cus_address,
                    etumbol: $('#district').val(),
                    eamphur: $('#amphur').val(),
                    eprovinc: $('#provicne').val(),
                    ezip: $('#postcode').val(),
                    etel: $('#tel').val(),
                    edefault: $('.default-switches').hasClass("on") == true ? 1 : 0,
                    //record_status: $("#record_status_1").is(":checked") === true ? '1' : '0',
                    record_status: '1',
                    created_by: name,
                    pMessage: ''
                };

                var params = [];
                for (const i in add_data) {
                    params.push(i + "=" + encodeURIComponent(add_data[i]));
                }

                fetch(customer_setup_add, {
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
                            $('#frm_cus').find('input,select').val('');
                            $('#frm_cus').find('.parsley-success').removeClass('parsley-success');
                            $('#frm_cus').find('.default-switches').removeClass('on');
                            //$('#frm_cus').find('select, input:radio').attr('disabled', true);
                            $(".provicne option").remove();
                            $(".amphur option").remove();
                            $(".district option").remove();
                            $.Provicne_Get();
                            $.List_cus_addr();

                        });
                    }

                }).catch((error) => {
                    toastr.error(error, 'Error writing document');
                    console.log('Error:', error);
                });

            }
            return false;

        });

    });
};

$.Create_trp = async function () {

    $('#btn-item-trp-create').click(function () {
        $('#frm_trans').parsley().on('form:submit', function () {
            if ($('#cus_code').val() == '') {
                if ($('#cus_code').val() == '') {
                    Swal.fire(
                        'กรุณากรอกข้อมูลให้ถูกต้อง!',
                        'กรุณากรอกรหัสลูกค้า!',
                        'info'
                    )
                }
            } else {
                let add_data = {
                    emmas_code: $('#cus_code').val(),
                    tdefault: $('.default-switches-trp').hasClass("on") === true ? 1 : 0,
                    vendor_id: $('#tran_name').val(),
                    lov_deliverycost_code: $("#lov_deliverycost_code_1").is(":checked") === true ? '1' : '2',
                    record_status: '1',
                    created_by: name,
                    pMessage: ''
                };

                var params = [];
                for (const i in add_data) {
                    params.push(i + "=" + encodeURIComponent(add_data[i]));
                }

                fetch(customer_setup_trp_add, {
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
                            $('#frm_trans').find('input,select').val('');
                            $('#frm_trans').find('.parsley-success').removeClass('parsley-success');
                            $('#frm_trans').find('.default-switches-trp').removeClass('on');
                            $("#lov_deliverycost_code").removeClass("checked");
                            $("#tran_name option").remove();
                            $('#tran_name').append($("<option>Please select..</option>"));
                            $.Delivery_Zone_Get();
                            $.List_TRP();
                        });
                    }

                }).catch((error) => {
                    toastr.error(error, 'Error writing document');
                    console.log('Error:', error);
                });

            }
            return false;

        });

    });
};

$.Details = async function (citem) {

    $('#btn-item-create').prop('disabled', true);
    $('#btn-edit').prop('disabled', true);

    $('.btn-create').removeClass('hide');
    $('.btn-edit').addClass('hide');

    $('#frm_cus').find('input, textarea').attr('readonly', true); 
    $('#frm_cus').find('select, input:radio').attr('disabled', true);
    $('#frm_cus').find('.main-toggle').addClass('disabled');

    $('#customer_code').val(citem['emmas_code']);
    $('#cus_address').val(citem['eaddress']);
    $('#provicne').val(citem['eprovinc']).trigger('change');
    setTimeout(function () {
        $('#amphur').val(citem['eamphur']).trigger('change');
    }, 500);

    setTimeout(function () {
        $('#district').val(citem['etumbol']).trigger('change');
    }, 1000);

    $('#postcode').val(citem['ezip']);
    citem['edefault'] == '1' ? $('.default-switches').addClass('on') : $('.default-switches').removeClass('on');

};

$.Details_Trp = async function (citem) {
    $('#btn-item-trp-create').prop('disabled', true);
    $('#btn-edit-trp').prop('disabled', true);

    $('.btn-create-trp').removeClass('hide');
    $('.btn-edit-trp').addClass('hide');

    $('#frm_trans').find('input, textarea').attr('readonly', true);
    $('#frm_trans').find('select, input:radio').attr('disabled', true);
    $('#frm_trans').find('.main-toggle').addClass('disabled');
    $('#tran_name').val(citem['vendor_id']).trigger('change');
    citem['tdefault'] == 1 ? $('.default-switches-trp').addClass('on') : $('.default-switches-trp').removeClass('on');
    if (citem['lov_deliverycost_code'] == '1') {
        $("#lov_deliverycost_code_1").prop('checked', true);
    } else if (citem['lov_deliverycost_code'] == '2') {
        $("#lov_deliverycost_code_2").prop('checked', true);

    }
};

$.Edit = async function (citem) {
    $.Details(citem);

    $('#btn-item-create').prop('disabled', false);
    $('#btn-edit').prop('disabled', false);

    $('.btn-create').addClass('hide');
    $('.btn-edit').removeClass('hide');

    $('#frm_cus').find('input, textarea').removeAttr('readonly');
    $('#frm_cus').find('select, input:radio').removeAttr('disabled');

    $('#btn-edit').click(function (e) {
        $('#frm_cus').parsley().on('form:submit', function () {
            if ($('#cus_code').val() == '') {
                $("#global-loader").fadeOut("slow");

                Swal.fire(
                    'กรุณากรอกข้อมูลให้ถูกต้อง!',
                    'กรุณากรอกรหัสลูกค้า!',
                    'info'
                )
            } else {
                $("#global-loader").fadeIn("slow");
                let add_data = {
                    id: citem['id'],
                    emmas_code: $('#cus_code').val(),
                    ecate: '2',
                    eaddress: $('#cus_address').val(),
                    etumbol: $('#district').val(),
                    eamphur: $('#amphur').val(),
                    eprovinc: $('#provicne').val(),
                    ezip: $('#postcode').val(),
                    etel: $('#tel').val(),
                    edefault: $('.default-switches').hasClass("on") === true ? 1 : 0,
                    record_status: '1',
                    updated_by: name,
                };

                var params = [];
                for (const i in add_data) {
                    params.push(i + "=" + encodeURIComponent(add_data[i]));
                }

                fetch(Customer_Setup_Update, {
                    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                    // mode: 'no-cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    body: params.join("&"),
                }).then(data => {
                    return data.json();
                }).then(data => {
                    $("#global-loader").fadeOut("slow");

                    if (data.status === 'Error') {
                        toastr.error(data.error_message);

                    } else {

                        toastr.success('Save Successfully!', async function () {
                            oTable.destroy();
                            $.List_cus_addr();
                        });
                    }

                }).catch((error) => {
                    toastr.error(error, 'Error writing document');
                    console.log('Error:', error);
                });

            }
            return false;

        });

    });

};

$.Edit_Trp = async function (citem) {
    $.Details_Trp(citem);
     
    $('#btn-item-trp-create').prop('disabled', false);
    $('#btn-edit-trp').prop('disabled', false);

    $('.btn-create-trp').addClass('hide');
    $('.btn-edit-trp').removeClass('hide');

    $('#frm_trans').find('input, textarea').removeAttr('readonly');
    $('#frm_trans').find('select, input:radio').removeAttr('disabled');

    $('#btn-edit-trp').click(function (e) {
        $('#frm_trans').parsley().on('form:submit', function () {
            if ($('#cus_code').val() == '') {
                if ($('#cus_code').val() == '') {
                    Swal.fire(
                        'กรุณากรอกข้อมูลให้ถูกต้อง!',
                        'กรุณากรอกรหัสลูกค้า!',
                        'info'
                    )
                }
            } else {
                let add_data = {
                    id: citem['id'],
                    emmas_code: $('#cus_code').val(),
                    tdefault: $('.default-switches-trp').hasClass("on") === true ? 1 : 0,
                    vendor_id: $('#tran_name').val(),
                    lov_deliverycost_code: $("#lov_deliverycost_code_1").is(":checked") === true ? '1' : '2',
                    record_status: '1',
                    updated_by: name,
                };

                var params = [];
                for (const i in add_data) {
                    params.push(i + "=" + encodeURIComponent(add_data[i]));
                }

                fetch(Customer_Setup_Trp_Update, {
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
                            $('#frm_trans').find('input,select').val('');
                            $('#frm_trans').find('.parsley-success').removeClass('parsley-success');
                            $('#frm_trans').find('.default-switches-trp').removeClass('on');
                            $("#lov_deliverycost_code").removeClass("checked");
                            $("#tran_name option").remove();
                            $('#tran_name').append($("<option>Please select..</option>"));
                            $.Delivery_Zone_Get();
                            $.List_TRP();
                        });
                    }

                }).catch((error) => {
                    toastr.error(error, 'Error writing document');
                    console.log('Error:', error);
                });

            }
            return false;

        });

    });

};

$.Delete = async function (citem) {
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
                id: citem['id'],
                record_status: 'delete',
                pMessage: '',
                updated_by: name,
            };

            var params = [];
            for (const i in add_data) {
                params.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            fetch(Customer_Setup_Delete, {
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

                    oTable.destroy();
                    $.List_cus_addr();
                    swal.fire("Done!", "It was succesfully deleted!", "success");

                }

            }).catch((error) => {
                //toastr.error(error, 'Error writing document');
                console.log('Error:', error);
                swal.fire("Error deleting!" + error, "Please try again", "error");
            });
        }
    });
    return false;

};

$.Delete_Trp = async function (citem) {
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
                id: citem['id'],
                record_status: 'delete',
                pMessage: '',
                updated_by: name,
            };

            var params = [];
            for (const i in add_data) {
                params.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            fetch(Customer_Setup_Trp_Delete, {
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

                    oTable_trp.destroy();
                    $.List_TRP();
                    swal.fire("Done!", "It was succesfully deleted!", "success");

                }

            }).catch((error) => {
                //toastr.error(error, 'Error writing document');
                console.log('Error:', error);
                swal.fire("Error deleting!" + error, "Please try again", "error");
            });
        }
    });
    return false;

};

$(document).ready(async function () {
    await $.District_Get('');
    await $.Provicne_Get();
    await $.Amphur_Get('');
    await $.Zone_Get('');
    await $.Route_Get('');
    await $.Delivery_Zone_Get();
    await $.init();

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