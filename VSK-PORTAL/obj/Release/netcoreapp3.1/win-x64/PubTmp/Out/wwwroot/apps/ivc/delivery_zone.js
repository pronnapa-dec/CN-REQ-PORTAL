'use strict';

let fs = firebase.firestore();

let collection = 'lov_cn';
let oTable, name;
//let url_api = 'http://192.168.1.247/intranet/';
const url_api = "http://localhost:49256/";
let zone_get = url_api + 'v1/Zone_Get';
let route_get = url_api + 'v1/Route_Get';
let Create_Delivery_Zone = url_api + 'v1/Create_Delivery_Zone';
let Delivery_Zone_Check = url_api + 'v1/Delivery_Zone_Check';
let Delivery_Zone_Get = url_api + 'v1/Delivery_Zone_Get';
let Delivery_Zone_Update = url_api + 'v1/Delivery_Zone_Update';
let Delivery_Zone_Delete = url_api + 'v1/Delivery_Zone_Delete';
let route_dataSet = [];
let zone_dataSet = [];

$.init = function () {

    $.Zone_Get('Search');
    $.List();

    $('#frm_data input').removeClass('parsley-success');

    $("#zone_search").on('change', function () {
        $("#route_search option").remove();
        $.Route_Get($(this).val());
    })

    $("#zone").on('change', function () {
        $("#route option").remove();
        $.Route_Get($(this).val());

    })

    $("input.numbers").keypress(function (event) {
        return isNumber(event, this)
    });

    $(".event-time-from").timepicker({
        timeFormat: 'HH:mm',
    });

    $('#frm_search').submit(async function (e) {

        e.preventDefault();

        $("#global-loader").fadeIn("slow");
        oTable.destroy();
        $.List(); //after search

    });

    $(".clear_btn").on("click", function () {
        $("#route_search option").remove();
        $("#zone_search option").remove();
        setTimeout(function () {
            $('#zone_search').append($("<option>Please select..</option>").val(''));
            $('#route_search').append($("<option>Please select..</option>").val(''));
            $.Zone_Get('Search');
        }, 1000);

    });

    $("#btn-item_create").on("click", function () {
        $('#frm_data').find('input, textarea').attr('readonly', false);
        $('#frm_data').find('select, input:radio').attr('disabled', false);
        $('#btn-save_exit').html('บันทึก').show();
        $('#btn-save_new').html('บันทึกและสร้างใหม่').show();
        $('#frm_data').trigger('reset');
        $("#route option").remove();
        $("#zone option").remove();

        //$.Check('create');
        $.Check();
        setTimeout(function () {
            $('#zone').append($("<option>Please select..</option>"));
            $('#route').append($("<option>Please select..</option>"));
            $.Zone_Get('Search');
            $.Create();
            //$.Create();
        }, 500);

    });

    $('#modal-frm_data').on('hidden.bs.modal', function () {
        $("#route option").remove();
        $("#route_search option").remove();
        $('.check').addClass('d-none');
        $('#frm_data').find('#name_transprot').removeClass('bd-danger');
        $('.btn-save_form').prop('disabled', false);

    });

};

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

$.List = async function () {
    $('#frm_data input').removeClass('parsley-success');

    let url = new URL(Delivery_Zone_Get);

    url.search = new URLSearchParams({
        mode: 'Search',
        lov_zone_code: $('#zone_search').val() == '' || $('#zone_search').val() == null ? '' : $('#zone_search').val(),
        lov_route_code: $('#route_search').val() == '' || $('#route_search').val() == null ? '' : $('#route_search').val(),
        name: $('#name_transprot_search').val(),
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
                autoWidth: true,
                //"ordering": false,
                //"bDestroy": true,
                paging: false,
                //scrollX: false,
                //scrollY: "410px",

                columns: [
                    {
                        title: "<span style='font-size:11px;'>ลำดับ</span>",

                        visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return (meta.row + 1);
                        }

                    }, //0
                    {
                        title: "<span style='font-size:11px;'>ลำดับ</span>",
                        //width: "70px",
                        width: "10px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            let i = 0;
                            return '<span style="font-size:11px;">' + (meta.row + 1) + '</span>';
                        }

                    }, //1
                    {
                        title: "<center><span style='font-size:11px;'>ชื่อบริษัทขนส่งเอกชน</span></center>",
                        data: "name",
                        width: "300px",
                        //visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">&nbsp;&nbsp;' + data + '</span>';
                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>เวลาทำการ</span>",
                        data: "closetime",
                        width: "100px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            let opening = row.opening != null ? row.opening : '';
                            let closetime = row.closetime != null ? row.closetime : '';

                            return '<span style="font-size:11px;">' + opening + " - " + closetime + '</span>';
                        }
                    }, //3
                    {
                        title: "<span style='font-size:11px;'>Zone</span>",
                        data: "lov_zone_code",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data != '' && data != null) {
                                let zone_obj = zone_dataSet.find(obj => obj.id === data);
                                if (zone_obj) {
                                    return '<span style="font-size:11px;">' + zone_obj.text + '</span>';
                                } else {
                                    return '<span style="font-size:11px;"></span>';
                                }
                            } else {
                                return '<span style="font-size:11px;">' + '-' + '</span>';
                            }
                        }
                    }, //4
                    {
                        title: "<span style='font-size:11px;'>พื้นที่</span>",
                        data: "lov_route_code",
                        width: "70px",
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data != '' && data != null) {
                                let route_obj = route_dataSet.find(obj => obj.id === data);
                                return '<span style="font-size:11px;">' + route_obj.text + '</span>';

                            } else {
                                return '<span style="font-size:11px;">' + '-' + '</span>';

                            }

                        }
                    }, //5
                    {
                        title: "<span style='font-size:11px;'>สถานะ</span>",
                        data: "record_status",
                        class: "tx-center",
                        width: "60px",
                        render: function (data, type, row, meta) {
                            if (data == '1') {
                                return '<span class="label text-success">' + '<div class="dot-label bg-success mr-1"></div>' + 'ใช้งาน' + '</span >'
                            } else if (data == '0') {
                                return '<span class="label text-danger">' + '<div class="dot-label bg-danger  mr-1"></div>' + 'ไม่ใช้งาน' + '</span >'
                            } else {
                                return '-'
                            }
                        }
                    }, //6
                    {
                        title: "<span style='font-size:11px;'>จัดการ</span>",
                        class: "tx-center ",
                        data: "id",
                        width: "40px",
                        render: function (data, type, row, meta) {
                            let data_row = JSON.stringify(row)
                            //return '<a class="btn btn-info btn-sm glyphicon glyphicon-name" href=#/' + meta[0] + '>' + 'Edit' + '</a>';
                            //return "<a type='button' class='btn btn-lg action btn-circle btn-info' data-id='" + data + " 'data-toggle='dropdown'> <i style='color:#ecf0fa;' class='fas fa-edit'></i></a><div class='dropdown-menu'><a  class='dropdown-item btn-action' data-row='" + data_row + "' data-action='view'>View<input type='file' style='display: none;' multiple=''></a><a  class='dropdown-item btn-action' data-row='" + data_row + "' data-action='edit'>Edit<input type='file' style='display: none;' multiple=''></a><a  class='dropdown-item btn-action'  data-row='" + data_row + "'data-action='delete'>Delete<input type='file' style='display: none;' multiple=''></a></div></div>"
                            return "<a type='button' class='btn-sm btn action' data-id='" + data + "' data-toggle='dropdown'> <i style='color:;' class='fas fa-bars'></i></a><div class='dropdown-menu'><a  class='dropdown-item btn-action' data-row='" + data_row +
                                "'data-action='view'>View<input type='file' style='display: none;' multiple=''></a><a  class='dropdown-item btn-action' data-row='" + data_row +
                                "'data-action='edit'>Edit<input type='file' style='display: none;' multiple=''></a><a  class='dropdown-item btn-action'  data-row='" + data_row +
                                "'data-action='delete'>Delete<input type='file' style='display: none;' multiple=''></a></div></div>"
                        }
                    }, //7

                ],
                "order": [[1, "asc"]],
                "initComplete": function (settings, json) {

                    //$('#tbl-list thead tr').css({ "height": "10px" })
                    // $.LoadingOverlay("hide");

                    $("#global-loader").fadeOut("slow");

                    $('#tbl-list tbody tr').hover(function () {
                        $(this).css('cursor', 'pointer');
                    });

                    $('.btn-action').click(function () {
                        let id = $().data('id');
                        let data = $(this).data('row');
                        console.log(data);
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

$.Create = async function () {

    //alert('start create')

    $('.record_status').eq(1).prop('checked', true);

    $('.btn-save_form').click(function (e) {

        let submit_action = $(this).data('action');

        $('#frm_data').parsley().on('form:submit', function () {

            $('.btn-save_form').prop('disabled', true);

            // Model & Repo ไปเปลี่ยนเอาเอง
            let add_data = {
                lov_zone_code: $('#zone').val(),
                lov_route_code: $('#route').val(),
                name: $('#name_transprot').val().trim(),
                opening: $('#opening_time').val(),
                closetime: $('#close_time').val(),
                note: $('#remark').val(),
                record_status: $("#record_status_1").is(":checked") === true ? '1' : '0',
                created_by: name,
                pMessage: ''
            };

            var params = [];
            for (const i in add_data) {
                params.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            fetch(Create_Delivery_Zone, {
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
                        oTable.destroy();

                        if (submit_action === "save_exit") {

                            $('.btn-save_form').prop('disabled', false);
                            $('#modal-frm_data').modal('hide');
                            $("#zone").empty();
                            $("#zone_search").empty();
                            setTimeout(function () {
                                $('#zone').append($("<option>Please select..</option>").val(''));
                                $('#zone_search').append($("<option>Please select..</option>").val(''));
                                $.Zone_Get('Search');
                            }, 800);
                            $.List();

                        } else if (submit_action === "save_new") {

                            $('#frm_data').trigger('reset');
                            $("#route option").remove();
                            $('.btn-save_form').prop('disabled', false);
                            $("#zone").empty();
                            $("#zone_search").empty(); 
                            setTimeout(function () {
                                $('#zone').append($("<option>Please select..</option>").val(''));
                                $('#zone_search').append($("<option>Please select..</option>").val(''));
                                $.Zone_Get('Search');
                            }, 800);
                            $.List();

                        } else {

                            toastr.error('Error writing document');

                        }

                    });
                }

            }).catch((error) => {
                toastr.error(error, 'Error writing document');
                console.log('Error:', error);
            });

            return false;

        });

    });
};

$.Details = async function (citem) {

    $('#modal-frm_data').modal('show');

    $('.btn-save_form').hide();
    $('#frm_data').find('input, textarea').attr('readonly', true);
    $('#frm_data').find('select, input:radio').attr('disabled', true);

    $('#zone').val(citem['lov_zone_code']).trigger("change");
    $('#route').val(citem['lov_route_code']).trigger("change");
    $('#opening_time').val(citem['opening']);
    $('#close_time').val(citem['closetime']);
    $('#remark').val(citem['note']);
    $('#name_transprot').val(citem['name']);

    citem['record_status'] === '1'
        ? $('#record_status_1').prop('checked', true)
        : $('#record_status_0').prop('checked', true);

};

$.Edit = async function (citem) {
    $.Details(citem);
    console.log(citem);

    $('#modal-frm_data').modal('show');

    $('#btn-save_exit').html('บันทึก').show();
    $('#btn-save_exit').removeClass('btn-danger').addClass('btn-primary');

    $('#frm_data').find('input, textarea').attr('readonly', false);
    $('#frm_data').find('select, input:radio').attr('disabled', false);

    $('#btn-save_exit').click(function (e) {

        $('#frm_data').parsley().on('form:submit', function () {

            $('.btn-save_form').prop('disabled', true);
            let add_data = {
                id: citem['id'],
                lov_zone_code: $('#zone').val(),
                lov_route_code: $('#route').val(),
                name: $('#name_transprot').val().trim(),
                opening: $('#opening_time').val(),
                closetime: $('#close_time').val(),
                note: $('#remark').val(),
                record_status: $("#record_status_1").is(":checked") === true ? '1' : '0',
                updated_by: name,
            };

            var params = [];
            for (const i in add_data) {
                params.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            fetch(Delivery_Zone_Update, {
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
                        oTable.destroy();
                        $('.btn-save_form').prop('disabled', false);
                        $('#modal-frm_data').modal('hide');
                        $.List();
                        $("#route option").remove();
                        $("#route_search option").remove();
                    });
                }

            }).catch((error) => {
                toastr.error(error, 'Error writing document');
                console.log('Error:', error);
            });

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
                updated_by: name,
                pMessage: ''
            };

            var params = [];
            for (const i in add_data) {
                params.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            fetch(Delivery_Zone_Delete, {
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
                    Swal.fire(
                        'Deleted!',
                        'Your data has been deleted.',
                        'success'
                    )
                    oTable.destroy();
                    $('.btn-save_form').prop('disabled', false);
                    $('#modal-frm_data').modal('hide');
                    $.List();
                }

            }).catch((error) => {
                toastr.error(error, 'Error writing document');
                console.log('Error:', error);
            });
        }
    });

    return false;

};

$.Check = async function () {

    /*    if ($('#zone_search').val() != '' && $('#route_search').val() != '') {*/

    $('#name_transprot').off('keyup').on('keyup', function (evt) {

        evt.preventDefault();

        if ($(this).val().replace(/\s/g, "").length > 0) {

            let get_ck = new URL(Delivery_Zone_Check);

            get_ck.search = new URLSearchParams({

                lov_zone_code: $('#zone_search').val() == '' || $('#zone_search').val() == null ? '' : $('#zone_search').val().replace(/\s/g, ""),
                lov_route_code: $('#route_search').val() == '' || $('#route_search').val() == null ? '' : $('#route_search').val().replace(/\s/g, ""),
                name: $(this).val().replace(/\s/g, ""),

            });

            fetch(get_ck).then(function (response) {

                return response.json();

            }).then(function (result) {

                console.log('name', $('#name_transprot').val().replace(/\s/g, ""))

                if (result.length > 0) {
                    console.log('ซ้ำ')
                    $('#frm_data').find('#name_transprot').addClass('bd-danger');
                    $('.alert-inner--text').html('<strong>' + 'Warning!' + '</strong>' + ' รหัสสินค้าซ้ำ กรุณาเปลี่ยนใหม่!');
                    $('#frm_data').find('.check').removeClass('d-none');
                    $('.btn-save_form').prop('disabled', true);
                    //$('#name_transprot').val($('#name_transprot').val().replace(/\s/g, ""))

                } else {
                    console.log('ไม่ซ้ำ')
                    $('.check').addClass('d-none');
                    $('#frm_data').find('#name_transprot').removeClass('bd-danger');
                    $('.btn-save_form').prop('disabled', false);
                    $('#frm_data input').removeClass('parsley-success');


                }

            });

        } else {

            console.log('ไม่ซ้ำ')
            $('.check').addClass('d-none');
            $('#frm_data').find('#name_transprot').removeClass('bd-danger');
            $('.btn-save_form').prop('disabled', false);

        }

        return false;

    });

    //}


};

$(document).ready(async function () {
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

function isNumber(evt, element) {

    var charCode = (evt.which) ? evt.which : event.keyCode

    if (
        //(charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
        //(charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        return false;

    return true;
}

$.Zone_Get('');
$.Route_Get('');
