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

const url_stmas_select2_search = url_api + "/v1/stmas_select2_search";
const url_gdishead_select2_search = url_api + "/v1/gdishead_select2_search";
const url_discgroup_select2_search = url_api + "/v1/discgroup_select2_search";
const url_gcode_a_select2_search = url_api + "/v1/gcode_a_select2_search";
const url_gcode_c_select2_search = url_api + "/v1/gcode_c_select2_search";

const url_emmas_List = url_api + "/v1/dis_emmas_List";

const url_gdishead_list = url_api + "/v1/gdishead_list";
const url_gdishead_action = url_api + "/v1/gdishead_action";

const url_ediscount_list = url_api + "/v1/ediscount_list";
const url_ediscount_action = url_api + "/v1/ediscount_action";

//const url_ediscount_import_verify = url_api + "/v1/ediscount_import_verify";
//const url_ediscount_import_upload = url_api + "/v1/ediscount_import_upload";

const url_ediscount_import_file = url_api + "/v1/import_ediscount_tmpfile";
const url_ediscount_import_tra = url_api + "/v1/import_ediscount_tmptrans";
const url_ediscount_import_verify = url_api + "/v1/import_ediscount_tmpverify";
const url_ediscount_import_upload = url_api + "/v1/import_ediscount_tmpupload";

let template_url = 'http://192.168.1.247/template/';
let table_ediscount, table_gdishead, username, tbl_frm_gdishead, tbl_ediscount_import;
var item_disgroup, item_code_1, item_code_3;
const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const user_id = objProfile[0]['username'];

function filterGlobal() {
    table_gdishead = $('#tbl-gdishead-list').DataTable().search(
        $('#template_code').val().trim(),
        false,
        true
    ).draw();
}

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        //console.log(user);

        var full_mail = user.email;
        username = full_mail.replace("@vskautoparts.com", "").substring(0, 10);

        $.init = async function () {

            $('#vat').val('7');

            $('#tbl-frm_gdishead').DataTable({
                dom: 'rt',
                deferRender: true,
                scrollX: true,
                scrollCollapse: true,
                autoWidth: true,

            });

            $('#search_gdishead').select2({
                minimumInputLength: 1,
                minimumResultsForSearch: 10,
                dropdownAutoWidth: true,
                delay: 500,
                ajax: {
                    url: url_gdishead_select2_search,
                    dataType: 'json',
                    width: 'resolve',
                    data: function (params) {
                        var query = {
                            id: "rtrim(code)",
                            text: "concat(rtrim(code),'-', rtrim(lname),'-',rtrim(remark))",
                            keywords: typeof params.term !== 'undefined' ? params.term : ' ',
                            name: " rtrim(lname)",
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
                                    id: item.id,
                                    name: item.name
                                }
                            })
                        };
                    },
                },
                escapeMarkup: function (markup) {
                    return markup;
                },
            })

            $('#search_gdishead').on('select2:select', async function (e) {

                var data = e.params.data;

                $.clear_create_ediscount();
                $.clear_input_ediscount();

                //console.log('search_gdishead', data['text']);

                if ($('#search_gdishead').val() !== '') {

                    $('#tiltle-table').html('รายละเอียดตารางส่วนลด : ' + '<span class="tx-primary">' + data['id'] + '  ' + data['name'] + '</span>')

                    $('#modal-ediscount_import').find('.modal-title').html('ตารางส่วนลด : ' + data['name']);

                    $('#vat').val('7');

                    $.ediscount_select2();

                    $.ediscount_list();

                    $.emmas_list();

                }

            });

            $('#modal-ediscount').on('shown.bs.modal', async function () {

                $('#template_code').on('keyup click', function (e) {
                    $(this).val($(this).val().replace(/\s/g, '').toUpperCase());
                    filterGlobal();
                });

                await $.gdishead_list();

                await setTimeout(function () {
                    $.LoadingOverlay("hide");
                }, 300);

            })

            $('#modal-ediscount').on('hidden.bs.modal', async function () {

                await table_gdishead.destroy();

                $('#frm_data').trigger('reset');
                $('#frm_data').find('input').val('').prop('disabled', false);
                $("#frm_data").parsley().reset();
                $('.btn-gdishead-action').attr("data-action", "create");

                await setTimeout(function () {
                    $.LoadingOverlay("hide");
                }, 300);

            })

            $('#modal-ediscount_import').off('shown.bs.modal').on('shown.bs.modal', async function (e) {

                await $.ediscount_import();

                await setTimeout(function () {
                    $.LoadingOverlay("hide");
                }, 300);

            })

            $('#modal-ediscount_import').off('hidden.bs.modal').on('hidden.bs.modal', async function () {

                $.LoadingOverlay("show");

                await setTimeout(function () {
                    location.reload();
                    $.LoadingOverlay("hide");
                }, 100);

            })

            $('.btn-gdishead-action').on('click', function (e) {

                e.preventDefault();

                // console.log('gdishead_action', $('.btn-gdishead-action').attr("data-action"))

                if ($('.btn-gdishead-action').attr("data-action") == 'create') {

                    //console.log('create')
                    $.gdishead_create();

                } else if ($('.btn-gdishead-action').attr("data-action") == 'update') {

                    //console.log('update')
                    $.gdishead_update();
                }

            });

            $('.btn-ediscount-action').on('click', function (e) {

                e.preventDefault();

                if ($('#search_gdishead').val() !== '') {

                    //console.log('action', $('.btn-ediscount-action').attr("data-action"))

                    if ($('.btn-ediscount-action').attr("data-action") == 'create') {

                        //console.log('create')

                        $.ediscount_create();

                    } else if ($('.btn-ediscount-action').attr("data-action") == 'update') {

                        //console.log('update')

                        $.ediscount_update();

                    }

                } else {

                    //alert('false')
                }

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
                $('#vat').val('7');

                $('#tbl-ediscount_list tbody tr').removeClass('bg-warning')
            });

            $('#btn_downloadtemplate').on('click', function (evt) {

                location.href = template_url + 'Template_UpdatePercentage.xlsx';

                console.log("...downloadtemplate...");

            });

            $('#btn_mas_disgroup').on('click', function (evt) {

                location.href = template_url + 'MASTER_DISGROUP.xlsx';

                console.log("...MASTER_DISGROUP...");

            });

            //$('#template_code').on('keyup click', function () {



            //});

            $('.swal2-container').css("z-index", '999999');
        };

        $.ediscount_select2 = async function (citem) {

            $('#search_code3').select2({
                minimumInputLength: 1,
                minimumResultsForSearch: 10,
                dropdownAutoWidth: true,
                delay: 500,
                ajax: {
                    url: url_gcode_c_select2_search,
                    dataType: 'json',
                    width: 'resolve',
                    data: function (params) {
                        var query = {
                            id: "rtrim(TYPE)",
                            text: "rtrim(TYPE)",
                            keywords: typeof params.term !== 'undefined' ? params.term : ' ',
                        }
                        //console.log(params);
                        return query;
                    },
                    matcher: function (params, data) {
                        return matchStart(params, data);
                    },
                    processResults: function (data, search) {
                        // console.log(data);
                        return {
                            results: $.map(data.data, function (item) {
                                return {
                                    text: item.text,
                                    id: item.id,
                                    gname: item.gname,

                                }
                            })
                        };
                    },
                },
                escapeMarkup: function (markup) {
                    return markup;
                },
            })

            $('#search_code1').select2({
                minimumInputLength: 1,
                minimumResultsForSearch: 10,
                dropdownAutoWidth: true,
                delay: 500,
                ajax: {
                    url: url_gcode_a_select2_search,
                    dataType: 'json',
                    width: 'resolve',
                    data: function (params) {
                        var query = {
                            id: "rtrim(code)",
                            text: "rtrim(gname)",
                            keywords: typeof params.term !== 'undefined' ? params.term : ' ',
                        }
                        //console.log(params);
                        return query;
                    },
                    matcher: function (params, data) {
                        return matchStart(params, data);
                    },
                    processResults: function (data, search) {
                        console.log(data);
                        return {
                            results: $.map(data.data, function (item) {
                                return {
                                    text: item.text,
                                    id: item.id,
                                    gname: item.gname,
                                    codechr: item.codechr,
                                }
                            })
                        };
                    },
                },
                escapeMarkup: function (markup) {
                    return markup;
                },
            })



            $('#search_code3').on('select2:select', async function (e) {

                e.preventDefault();

                item_code_3 = e.params.data;

                $('#search_lov_disgroup').select2({
                    //  minimumInputLength: 1,
                    //  minimumResultsForSearch: 10,
                    dropdownAutoWidth: true,
                    delay: 500,
                    ajax: {
                        url: url_discgroup_select2_search,
                        dataType: 'json',
                        width: 'resolve',
                        data: function (params) {
                            var query = {
                                //mode: item_code_3['id'],
                                mode: $('#search_code3').val(),
                                id: "rtrim(named)",
                                text: "rtrim(named)",
                                keywords: typeof params.term !== 'undefined' ? params.term : ' ',
                            }
                            //console.log(params);
                            return query;
                        },
                        matcher: function (params, data) {
                            return matchStart(params, data);
                        },
                        processResults: function (data, search) {
                            console.log(data);
                            return {
                                results: $.map(data.data, function (item) {
                                    return {
                                        text: item.text,
                                        id: item.id,
                                        lov_code: item.lov_code,
                                    }
                                })
                            };
                        },
                    },
                    escapeMarkup: function (markup) {
                        return markup;
                    },
                })

            });

            $('#search_code1').on('select2:select', async function (e) {

                e.preventDefault();

                item_code_1 = e.params.data;




            });

            $('#search_lov_disgroup').on('select2:select', async function (e) {

                e.preventDefault();

                item_disgroup = e.params.data;

            });
        };


        $.gdishead_list = async function () {

            let url_gdishead = new URL(url_gdishead_list);

            url_gdishead.search = new URLSearchParams({
                mode: 'list',
            });

            fetch(url_gdishead).then(function (response) {
                return response.json();
            }).then(function (result) {

                // console.log(result.data);

                let i = result.length;

                var data_gdishead = [];

                $.each(result.data, function (key, val) {

                    let data = JSON.stringify(val)

                    data_gdishead.push([
                        i,
                        val['code'],
                        val['lname'],
                        val['remark'],
                        val['procdate'],
                        val['userid'],
                        "<div class='d-flex flex-row justify-content-center'>" +
                        "<button onclick='$.gdishead_view(" + data + ");' data-item='" + data + "' style='margin: .25rem .125rem; ' class='btn btn-outline-primary btn-sm edit-item update_item' data-action='update'  id='update_item" + i + "' type='button'>Edit</button>" +
                        "<button onclick='$.gdishead_delete(" + data + ");' data-item='" + data + "' style='margin: .25rem .125rem; ' class='btn btn-outline-danger btn-sm delete-item delete_item' data-action='delete' id='delete_item" + i + "' type='button'>Delete</button>" +
                        "</div>",
                    ])

                    i--;

                });

                // console.log('data_prnetfile', data_gdishead)

                table_gdishead = $('#tbl-gdishead-list').DataTable({
                    "data": data_gdishead,
                    "dom": 'ifrtp',
                    autoWidth: true,
                    "deferRender": true,
                    "order": [[0, "desc"]],
                    "ordering": false,
                    "pageLength": 5,
                    "bDestroy": true,
                    "columnDefs": [{
                        "targets": 'no-sort',
                        "orderable": false,
                    },
                    {
                        "targets": [4],
                        "searchable": false,
                        "class": "tx-center",
                        "render": function (data, type, row, meta) {
                            return (data != '0001-01-01T00:00:00' ? moment(data).format('DD/MM/YYYY HH:mm:ss') : '-');
                        }
                    }],
                    "initComplete": function (settings, json) {

                    }
                });

                table_gdishead.columns.adjust();

                $.LoadingOverlay("hide");

            });

        }

        $.gdishead_create = async function () {

            $('#frm_data').parsley().validate();

            if ($('#frm_data').parsley().isValid()) {

                $(".modal-body").LoadingOverlay("show", {
                    image: '',
                    custom: customElement
                });

                let add_data = {
                    mode: 'CREATE',
                    code: $('#template_code').val(),
                    lname: $('#template_detail').val(),
                    remark: $('#template_remark').val(),
                    created_by: user_id,
                    //ref_id: ref_id,
                    ref_id: $.uuid(),
                };

                //console.log('add_data', add_data)

                var params = [];
                for (const i in add_data) {
                    params.push(i + "=" + encodeURIComponent(add_data[i]));
                }

                fetch(url_gdishead_action, {
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    body: params.join("&"),
                }).then(data => {
                    return data.json();
                }).then(data => {

                    if (data.status === 'Error') {

                        toastr.error('Oops! An Error Occurred');

                        setTimeout(function () {

                            table_gdishead.destroy();

                            $.gdishead_list();

                            //$.LoadingOverlay("hide");
                            $(".modal-body").LoadingOverlay("hide", true);

                            $.clear_input_gdishead();

                        }, 800);

                    } else if (data.status === 'Duplicate') {

                        toastr.error('รหัส Template ซ้ำ');

                        setTimeout(function () {

                            $(".modal-body").LoadingOverlay("hide", true);
                            $("#frm_data").parsley().reset();

                        }, 800);

                    } else {

                        toastr.success('Save Successfully!', async function () {

                            $('#modal-frm_data').modal('hide');

                            setTimeout(function () {

                                table_gdishead.destroy();

                                $.gdishead_list();

                                $(".modal-body").LoadingOverlay("hide", true);

                                $.clear_input_gdishead();

                            }, 800);

                        });
                    }

                }).catch((error) => {

                    toastr.error(error, 'Error writing document');

                });

                return false;

            }
        };

        $.gdishead_view = async function (citem) {

            // console.log('citem', citem)

            var ref_id_update = JSON.stringify(citem)

            $('.btn-gdishead-action').attr("data-action", "update");

            $('.btn-gdishead-action').attr("data-id", ref_id_update);

            $('#frm_data').trigger('reset');
            $('#frm_data').find('input').val('').prop('disabled', false);
            $('#frm_data').find('select').val('').trigger('change.select2').prop('disabled', false);
            $("#frm_data").parsley().reset();

            $('#template_code').val(citem['code']).prop('disabled', true);
            $('#template_detail').val(citem['lname'])
            $('#template_remark').val(citem['remark'])


        };

        $.gdishead_update = async function () {

            //console.log($('.btn-gdishead-action').data('id'))

            //let citem = $('.btn-gdishead-action').data('id');
            let up_citem = $('.btn-gdishead-action').attr('data-id');
            let citem = JSON.parse(up_citem)

            console.log('citem update', citem)
            //console.log('citem update', citem)

            $('#frm_data').parsley().validate();

            if ($('#frm_data').parsley().isValid()) {

                let update_data = {
                    mode: 'UPDATE',
                    code: $('#template_code').val(),
                    lname: $('#template_detail').val(),
                    remark: $('#template_remark').val(),
                    created_by: user_id,
                    updated_by: user_id,
                    ref_id: $.uuid(),
                    //ref_id: citem['ref_id'],
                };

                //console.log('update_data', update_data)

                var params = [];
                for (const i in update_data) {
                    params.push(i + "=" + encodeURIComponent(update_data[i]));
                }

                fetch(url_gdishead_action, {
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

                        toastr.error('Oops! An Error Occurred');

                        setTimeout(function () {

                            table_gdishead.destroy();

                            $.gdishead_list();

                            $.LoadingOverlay("hide");

                            $(".modal-body").LoadingOverlay("hide", true);

                            $.clear_input_gdishead();

                        }, 800);

                    } else {

                        toastr.success('Save Successfully!', async function () {

                            $('#modal-frm_data').modal('hide');

                            setTimeout(function () {

                                table_gdishead.destroy();

                                $.gdishead_list();

                                $(".modal-body").LoadingOverlay("hide", true);

                                $('.btn-gdishead-action').attr("data-action", "create");

                                $.clear_input_gdishead();

                            }, 800);

                        });
                    }

                }).catch((error) => {

                    toastr.error(error, 'Error writing document');

                });

                return false;

            }


        };

        $.gdishead_delete = async function (citem) {

            //console.log('citem', citem)

            let code = citem['code']

            swal({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, Cancel",
                cancelButtonColor: '#d33',
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {

                if (isConfirm) {

                    $(".modal-body").LoadingOverlay("show", {
                        image: '',
                        custom: customElement
                    });

                    let delete_data = {

                        mode: 'DELETE',
                        code: citem['code'],
                        lname: citem['lname'],
                        remark: citem['remark'],
                        procby: citem['procby'],
                        created_by: user_id,
                        updated_by: user_id,
                        ref_id: $.uuid(),

                    };

                    var params = [];
                    for (const i in delete_data) {
                        params.push(i + "=" + encodeURIComponent(delete_data[i]));
                    }

                    fetch(url_gdishead_action, {
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

                            toastr.error('Oops! An Error Occurred');

                            setTimeout(function () {

                                table_gdishead.destroy();

                                $.gdishead_list();

                                $.LoadingOverlay("hide");

                                $(".modal-body").LoadingOverlay("hide", true);

                                $.clear_input_gdishead();

                            }, 800);

                        } else {

                            toastr.success('Save Successfully!', async function () {

                                $('#modal-frm_data').modal('hide');

                                setTimeout(function () {

                                    table_gdishead.destroy();

                                    $.gdishead_list();

                                    $(".modal-body").LoadingOverlay("hide", true);

                                    $('.btn-gdishead-action').attr("data-action", "create");

                                    $.clear_input_gdishead();

                                }, 800);

                                swal({
                                    title: "Succeed!",
                                    text: "ทำรายการสำเร็จ",
                                    type: 'success',
                                    timer: 2000,
                                    showConfirmButton: false
                                });
                            });
                        }

                    }).catch((error) => {
                        toastr.error(error, 'Error writing document');
                        //console.log('Error:', error);
                    });

                    return false;

                }else {

                    swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                }
            })

        };



        $.ediscount_list = async function () {

            $('#btn-item_import').removeClass('d-none');

            let url = new URL(url_ediscount_list);

            url.search = new URLSearchParams({
                mode: 'list',
                ecode: $('#search_gdishead').val(),
            });

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {

                //console.log('result', result.data);

                let i = result.length;

                var data_ediscount = [];

                $.each(result.data, function (key, val) {

                    let data = JSON.stringify(val)

                    data_ediscount.push([
                        i,
                        $.trim(val['code']),
                        $.trim(val['cargroup']),
                        $.trim(val['chrcode']),
                        val['adis1'],
                        val['adis2'],
                        val['adis3'],
                        val['bdis1'],
                        val['bdis2'],
                        val['bdis3'],
                        val['cdis1'],
                        val['cdis2'],
                        val['cdis3'],
                        val['ddis1'],
                        val['ddis2'],
                        val['ddis3'],
                        val['edis1'],
                        val['edis2'],
                        val['edis3'],
                        val['dvat'],
                        "<div class='d-flex flex-row justify-content-center'>" +
                        "<button onclick='$.ediscount_view(" + data + ");' data-item='" + data + "' style='margin: .25rem .125rem; ' class='btn  btn-outline-primary btn-sm edit-item update_item' data-action='update'  id='update_item" + i + "' type='button'>Edit</button>" +
                        "<button onclick='$.ediscount_delete(" + data + ");' data-item='" + data + "' style='margin: .25rem .125rem; ' class='btn btn-outline-danger btn-sm delete-item delete_item' data-action='delete' id='delete_item" + i + "' type='button'>Delete</button>" +
                        "</div>",])

                    i--;
                });


                table_ediscount = $('#tbl-ediscount_list').DataTable({
                    "data": data_ediscount,
                    "dom": 'Bifrtp',
                    "deferRender": true,
                    scrollX: true,
                    scrollCollapse: true,
                    "order": [[0, "desc"]],
                    "ordering": false,
                    "pageLength": 5,
                    "bDestroy": true,
                    //"paging": false,
                    "info": false,
                    autoWidth: true,
                    buttons: [
                        'copyHtml5',
                        {
                            extend: 'excelHtml5',
                            title: '',
                            filename: "TablePercentage " + $('#search_gdishead').val() + " ",
                            exportOptions: {
                                columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
                            },
                        },
                    ],
                    "columnDefs": [{
                        "targets": 'no-sort',
                        "orderable": false,
                    }],
                    "initComplete": function (settings, json) {

                        $('#tbl-ediscount_list tbody tr').on('click', '.edit-item', function () {

                            //$('#tbl-net_list tbody tr').removeClass('bg-warning').css('opacity', '1')
                            //$(this).addClass('bg-warning').css('opacity', '0.7')
                            //$(this).css('background-color','#000')
                            $('#tbl-ediscount_list tbody tr').removeClass('bg-warning')
                            $(this).parent().parent().parent().addClass('bg-warning')

                        });

                        $('#tbl-ediscount_list tbody tr').on('click', '.delete-item', function () {

                            //$('#tbl-net_list tbody tr').removeClass('bg-warning').css('opacity', '1')
                            //$(this).addClass('bg-warning').css('opacity', '0.7')
                            //$(this).css('background-color','#000')
                            $('#tbl-ediscount_list tbody tr').removeClass('bg-warning')
                            $(this).parent().parent().parent().addClass('bg-warning')

                        });
                    }


                });

            });

        }

        $.ediscount_view = async function (citem) {

            console.log('citem', citem)

            var ref_id_update = JSON.stringify(citem)

            $('.btn-ediscount-action').attr("data-action", "update");

            $('.btn-ediscount-action').attr("data-id", ref_id_update);

            //$.clear_input_ediscount();

            $("#search_code3 option").remove();
            $("#search_lov_disgroup option").remove();
            $("#search_code1 option").remove();

            $('#search_code3')
                .append($("<option>--- Select Search ---</option>")
                    .attr("value", citem['code'])
                    .text(citem['code'])
                    .attr('name', citem['code']));

            $('#search_lov_disgroup')
                .append($("<option>--- Select Search ---</option>")
                    .attr("value", citem['cargroup'])
                    .text(citem['cargroup'])
                    .attr('name', citem['cargroup']));

            $('#search_code1')
                .append($("<option>--- Select Search ---</option>")
                    .attr("value", citem['chrcode'])
                    .text(citem['chrcode'])
                    .attr('name', citem['chrcode']));

            $('#frm_item').find('#search_code3').val(citem['code']).data('text', citem['code']).trigger('change').prop('disabled', true);
            $('#frm_item').find('#search_lov_disgroup').val(citem['cargroup']).data('text', citem['cargroup']).trigger('change').prop('disabled', true);
            $('#frm_item').find('#search_code1').val(citem['chrcode']).data('text', citem['chrcode']).trigger('change').prop('disabled', true);

            $('#st_dis1').val(citem['adis1']);
            $('#st_dis2').val(citem['adis2']);
            $('#st_dis3').val(citem['adis3']);

            $('#eo_dis1').val(citem['bdis1']);
            $('#eo_dis2').val(citem['bdis2']);
            $('#eo_dis3').val(citem['bdis3']);

            $('#sp_dis1').val(citem['cdis1']);
            $('#sp_dis2').val(citem['cdis2']);
            $('#sp_dis3').val(citem['cdis3']);

            $('#z4_dis1').val(citem['ddis1']);
            $('#z4_dis2').val(citem['ddis2']);
            $('#z4_dis3').html(citem['ddis3']);

            $('#z5_dis1').val(citem['edis1']);
            $('#z5_dis2').val(citem['edis2']);
            $('#z5_dis3').val(citem['edis3']);

            $('#vat').val(citem['dvat']);

        };

        $.ediscount_create = async function () {

            $('#frm_item').parsley().validate();

            if ($('#frm_item').parsley().isValid()) {

                $(".modal-body").LoadingOverlay("show", {
                    image: '',
                    custom: customElement
                });

                let add_data = {
                    mode: 'CREATE',
                    code: item_code_3['gname'],
                    cargroup: $('#search_lov_disgroup').val() == '' || $('#search_lov_disgroup').val() == '--- Select Search ---' ? '' : $('#frm_item').find('#search_lov_disgroup :selected').text().trim(),
                    chrcode: '', //$('#search_code1').val() == '' || $('#search_code1').val() == '--- Select Search ---' ? '' : $('#frm_item').find('#search_code1 :selected').text().trim(),
                    //chrcode: '',
                    adis1: $('#st_dis1').val(),
                    adis2: $('#st_dis2').val(),
                    adis3: $('#st_dis3').val(),
                    bdis1: $('#eo_dis1').val(),
                    bdis2: $('#eo_dis2').val(),
                    bdis3: $('#eo_dis3').val(),
                    cdis1: $('#sp_dis1').val(),
                    cdis2: $('#sp_dis2').val(),
                    cdis3: $('#sp_dis3').val(),
                    ddis1: $('#z4_dis1').val(),
                    ddis2: $('#z4_dis2').val(),
                    ddis3: $('#z4_dis3').val(),
                    edis1: $('#z5_dis1').val(),
                    edis2: $('#z5_dis2').val(),
                    edis3: $('#z5_dis3').val(),
                    dvat: $('#vat').val(),
                    ecode: $('#search_gdishead').val(),
                    userid: user_id,
                    created_by: user_id,
                    ref_id: $.uuid(),
                };

                console.log('add_data', add_data)

                var params = [];
                for (const i in add_data) {
                    params.push(i + "=" + encodeURIComponent(add_data[i]));
                }

                fetch(url_ediscount_action, {
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    body: params.join("&"),
                }).then(data => {
                    return data.json();
                }).then(data => {

                    if (data.status === 'Error') {

                        toastr.error('Oops! An Error Occurred');

                        setTimeout(function () {

                            $(".modal-body").LoadingOverlay("hide", true);

                            $.clear_input_ediscount();

                            $.clear_create_ediscount();

                        }, 800);

                    } else if (data.status === 'Duplicate') {

                        toastr.error('รหัสสินค้าซ้ำ');

                        setTimeout(function () {

                            $(".modal-body").LoadingOverlay("hide", true);

                            $('#frm_item').trigger('reset');
                            $("#frm_item").parsley().reset();
                            $.clear_input_ediscount();

                            $.clear_create_ediscount();
                        }, 800);

                    } else {

                        toastr.success('Save Successfully!', async function () {

                            $('#modal-frm_data').modal('hide');

                            setTimeout(function () {

                                $(".modal-body").LoadingOverlay("hide", true);

                                $.clear_input_ediscount();

                                $.clear_create_ediscount();

                                table_ediscount.destroy();

                                $.ediscount_list();

                            }, 800);

                        });
                    }

                }).catch((error) => {

                    toastr.error(error, 'Error writing document');

                });

                return false;

            }
        };

        $.ediscount_update = async function () {

            console.log($('.btn-ediscount-action').data('id'))

            //let citem = $('.btn-ediscount-action').data('id');

            let up_citem = $('.btn-ediscount-action').attr('data-id');

            let citem = JSON.parse(up_citem)

            console.log('citem update', citem)

            $('#frm_item').parsley().validate();

            if ($('#frm_item').parsley().isValid()) {

                //alert('submit update')

                let update_data = {
                    mode: 'UPDATE',
                    code: citem['code'],
                    cargroup: citem['cargroup'],
                    //chrcode: citem['chrcode'],
                    chrcode: $('#frm_item').find('#search_code1 :selected').text().trim(),
                    adis1: $('#st_dis1').val(),
                    adis2: $('#st_dis2').val(),
                    adis3: $('#st_dis3').val(),
                    bdis1: $('#eo_dis1').val(),
                    bdis2: $('#eo_dis2').val(),
                    bdis3: $('#eo_dis3').val(),
                    cdis1: $('#sp_dis1').val(),
                    cdis2: $('#sp_dis2').val(),
                    cdis3: $('#sp_dis3').val(),
                    ddis1: $('#z4_dis1').val(),
                    ddis2: $('#z4_dis2').val(),
                    ddis3: $('#z4_dis3').val(),
                    edis1: $('#z5_dis1').val(),
                    edis2: $('#z5_dis2').val(),
                    edis3: $('#z5_dis3').val(),
                    dvat: $('#vat').val(),
                    ecode: citem['ecode'],
                    userid: user_id,
                    created_by: user_id,
                    ref_id: $.uuid(),
                };

                console.log('update_data', update_data)

                var params = [];
                for (const i in update_data) {
                    params.push(i + "=" + encodeURIComponent(update_data[i]));
                }

                fetch(url_ediscount_action, {
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

                        toastr.error('Oops! An Error Occurred');

                        setTimeout(function () {

                            $(".modal-body").LoadingOverlay("hide", true);

                            $.clear_input_ediscount();

                            //$.clear_create_ediscount();

                            $('.btn-ediscount-action').attr("data-action", "update");

                            //$('#frm_item').find('#search_itemmaster').val('').prop('disabled', false);
                            //$("#search_itemmaster option").remove();
                            //$('#search_itemmaster')
                            //    .append($("<option>--- Select Search ---</option>"))

                        }, 800);

                    } else {

                        toastr.success('Save Successfully!', async function () {

                            $('#modal-frm_data').modal('hide');

                            setTimeout(function () {

                                $(".modal-body").LoadingOverlay("hide", true);

                                $.clear_input_ediscount();

                                $.clear_create_ediscount();

                                $('.btn-ediscount-action').attr("data-action", "create");

                                //$('#frm_item').find('#search_itemmaster').val('').prop('disabled', false);
                                //$("#search_itemmaster option").remove();
                                //$('#search_itemmaster')
                                //    .append($("<option>--- Select Search ---</option>"))


                                table_ediscount.destroy();

                                $.ediscount_list();

                            }, 800);

                        });
                    }

                }).catch((error) => {

                    toastr.error(error, 'Error writing document');

                });

                return false;

            }
        };

        $.ediscount_delete = async function (citem) {

            console.log('citem', citem)

            swal({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, Cancel",
                cancelButtonColor: '#d33',
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {

                if (isConfirm) {

                    $(".modal-body").LoadingOverlay("show", {
                        image: '',
                        custom: customElement
                    });

                    let delete_data = {

                        mode: 'DELETE',
                        code: citem['code'],
                        cargroup: citem['cargroup'],
                        chrcode: citem['chrcode'],
                        adis1: citem['adis1'],
                        adis2: citem['adis2'],
                        adis3: citem['adis3'],
                        bdis1: citem['bdis1'],
                        bdis2: citem['bdis2'],
                        bdis3: citem['bdis3'],
                        cdis1: citem['cdis1'],
                        cdis2: citem['cdis2'],
                        cdis3: citem['cdis3'],
                        ddis1: citem['ddis1'],
                        ddis2: citem['ddis2'],
                        ddis3: citem['ddis3'],
                        edis1: citem['edis1'],
                        edis2: citem['edis2'],
                        edis3: citem['edis3'],
                        dvat: citem['dvat'],
                        ecode: citem['ecode'],
                        userid: user_id,
                        created_by: user_id,
                        updated_by: user_id,
                        ref_id: $.uuid(),

                    };

                    var params = [];
                    for (const i in delete_data) {
                        params.push(i + "=" + encodeURIComponent(delete_data[i]));
                    }

                    fetch(url_ediscount_action, {
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

                            toastr.error('Oops! An Error Occurred');

                            setTimeout(function () {

                                $.LoadingOverlay("hide");

                                $(".modal-body").LoadingOverlay("hide", true);

                                $.clear_input_ediscount();

                            }, 800);

                        } else {

                            toastr.success('Save Successfully!', async function () {

                                $('#modal-frm_data').modal('hide');

                                swal({
                                    title: "Succeed!",
                                    text: "ทำรายการสำเร็จ",
                                    type: 'success',
                                    timer: 2000,
                                    showConfirmButton: false
                                });

                                setTimeout(function () {

                                    table_ediscount.destroy();

                                    $.ediscount_list();

                                    $.clear_input_ediscount();

                                    $(".modal-body").LoadingOverlay("hide", true);

                                    $('.btn-ediscount-action').attr("data-action", "create");

                                }, 800);

                            });
                        }

                    }).catch((error) => {
                        toastr.error(error, 'Error writing document');
                        console.log('Error:', error);
                    });

                    return false;

                } else {

                    swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                }
            })

        };

        $.ediscount_importOLD = async function () {

            $(document).on('change', '#customFile', function (evt) {

                evt.preventDefault();

                console.log(this.files[0])

                var path = $(this).val();
                var fileName = path.replace(/^.*\\/, "");
                $(this).next('.custom-file-label').html(fileName);

                if ($(this).val() !== '') {

                    $("#customFile").prop('disabled', true);

                    $(".modal-body").LoadingOverlay("show", {
                        image: '',
                        custom: customElement
                    });

                    let citem_import = [];

                    let uuid = $.uuid();

                    readXlsxFile(this.files[0], { dateFormat: 'YYYY/MM/DD_hh:mm:ss' }).then(async function (result) {

                        console.log('readXlsxFile', result);

                        if (result.length > 2) {

                            $(".modal-body").LoadingOverlay("show", {
                                image: '',
                                custom: customElement
                            });

                            let i = 0;

                            await $.each(result, async function (key, val) {

                                if (i > 1) {

                                    citem_import.push({
                                        mode: 'IMPORT',
                                        code: $.trim(val[0]),
                                        cargroup: $.trim(val[1]),
                                        chrcode: $.trim(val[2]),
                                        adis1: $.trim(val[3]),
                                        adis2: $.trim(val[4]),
                                        adis3: $.trim(val[5]),
                                        bdis1: $.trim(val[6]),
                                        bdis2: $.trim(val[7]),
                                        bdis3: $.trim(val[8]),
                                        cdis1: $.trim(val[9]),
                                        cdis2: $.trim(val[10]),
                                        cdis3: $.trim(val[11]),
                                        ddis1: $.trim(val[12]),
                                        ddis2: $.trim(val[13]),
                                        ddis3: $.trim(val[14]),
                                        edis1: $.trim(val[15]),
                                        edis2: $.trim(val[16]),
                                        edis3: $.trim(val[17]),
                                        dvat: $.trim(val[18]),
                                        ecode: $('#search_gdishead').val(),
                                        created_by: user_id,
                                        ref_id: uuid
                                    });

                                }

                                i++

                            });

                            console.log('citem_import', citem_import)

                            await $.ajax({
                                url: url_ediscount_import_verify,
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                // data: JSON.stringify(citem_data),
                                data: JSON.stringify(citem_import),
                                success: function (result) {

                                    if (result.status === 'Error') {

                                        $(".modal-body").LoadingOverlay("hide", true);

                                        toastr.error('Error, Please contact administrator.');

                                    } else {

                                        let data_import = [];
                                        let all_information = 0;
                                        let wrong_information = 0;
                                        let success_information = 0;

                                        let i = 1;

                                        $.each(result.data, function (key, val) {

                                            let code = val['code'];
                                            let cargroup = val['cargroup'];
                                            let chrcode = val['chrcode'];

                                            let record_status = val['record_status'];
                                           // let text_status = val['text_status'];
                                            let text_status = ''
                                            let chk_duplicate = ''
                                            let low_val = ''

                                            let adis1 = val['adis1'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['adis1'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['adis1'] + '</span>'
                                            let adis2 = val['adis2'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['adis2'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['adis2'] + '</span>'
                                            let adis3 = val['adis3'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['adis3'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['adis3'] + '</span>'
                                            let bdis1 = val['bdis1'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['bdis1'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['bdis1'] + '</span>'
                                            let bdis2 = val['bdis2'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['bdis2'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['bdis2'] + '</span>'
                                            let bdis3 = val['bdis3'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['bdis3'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['bdis3'] + '</span>'
                                            let cdis1 = val['cdis1'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['cdis1'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['cdis1'] + '</span>'
                                            let cdis2 = val['cdis2'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['cdis2'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['cdis2'] + '</span>'
                                            let cdis3 = val['cdis3'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['cdis3'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['cdis3'] + '</span>'
                                            let ddis1 = val['ddis1'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['ddis1'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['ddis1'] + '</span>'
                                            let ddis2 = val['ddis2'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['ddis2'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['ddis2'] + '</span>'
                                            let ddis3 = val['ddis3'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['ddis3'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['ddis3'] + '</span>'
                                            let edis1 = val['edis1'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['edis1'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['edis1'] + '</span>'
                                            let edis2 = val['edis2'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['edis2'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['edis2'] + '</span>'
                                            let edis3 = val['edis3'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['edis3'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['edis3'] + '</span>'
                                            //let dvat = val['dvat'] != '0' || val['dvat'] != '7' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['dvat'] + '</span>' : val['dvat'];
                                            let dvat = val['dvat'];

                                            if (val['event_name'] == 'CREATE') {
                                                event_name = '<span class="tx-success tx-center">' + val['event_name'] + '</span>'
                                            } else if (val['event_name'] == 'UPDATE') {
                                                event_name = '<span class="tx-primary tx-center">' + val['event_name'] + '</span>'
                                            } else if (val['event_name'] == 'DELETE') {
                                                event_name = '<span class="tx-danger tx-center">' + val['event_name'] + '</span>'
                                            } else {
                                                event_name = '<span class="tx-dark tx-center">' + 'ERROR' + '</span>'
                                            } if (val['event_name'] == 'CREATE') {
                                                event_name = '<span class="tx-success tx-center">' + val['event_name'] + '</span>'
                                            } else if (val['event_name'] == 'UPDATE') {
                                                event_name = '<span class="tx-primary tx-center">' + val['event_name'] + '</span>'
                                            } else if (val['event_name'] == 'DELETE') {
                                                event_name = '<span class="tx-danger tx-center">' + val['event_name'] + '</span>'
                                            } else {
                                                event_name = '<span class="tx-dark tx-center">' + 'ERROR' + '</span>'
                                            }

                                            if (val['event_name'] == 'CREATE') {

                                                if (record_status == 2) {
                                                    text_status = '<span style="color: DarkOrange;font-weight: bold;text-align: center;">' + 'ข้อมูลซ้ำในเอกสาร' + '</span>'
                                                    code = '<span style="color: DarkOrange;font-weight: bold;text-align: center;">' + val['code'] + '</span>'
                                                    cargroup = '<span style="color: DarkOrange;font-weight: bold;text-align: center;">' + val['cargroup'] + '</span>'
                                                    chrcode = '<span style="color: DarkOrange;font-weight: bold;text-align: center;">' + val['chrcode'] + '</span>'
                                                } else if (record_status == 3) {
                                                    text_status = '<span style="color: red;font-weight: bold;text-align: center;">' + 'ไม่พบยี่ห้อสินค้า' + '</span>'
                                                    code = '<span style="color: red;font-weight: bold;text-align: center;">' + val['code'] + '</span>'
                                                } else if (record_status == 4) {
                                                    text_status = '<span style="color: red;font-weight: bold;text-align: center;">' + 'ไม่พบกลุ่มสินค้า' + '</span>'
                                                    chrcode = '<span style="color: red;font-weight: bold;text-align: center;">' + val['chrcode'] + '</span>'
                                                } else if (record_status == 5) {
                                                    text_status = '<span style="color: red;font-weight: bold;text-align: center;">' + 'ไม่พบชื่อย่อสินค้า' + '</span>'
                                                    cargroup = '<span style="color: red;font-weight: bold;text-align: center;">' + val['cargroup'] + '</span>'
                                                } else if (record_status == 6) {
                                                    text_status = '<span style="color: red;font-weight: bold;text-align: center;">' + 'ข้อมูลซ้ำในระบบ' + '</span>'
                                                    code = '<span style="color: red;font-weight: bold;text-align: center;">' + val['code'] + '</span>'
                                                    cargroup = '<span style="color: red;font-weight: bold;text-align: center;">' + val['cargroup'] + '</span>'
                                                    chrcode = '<span style="color: red;font-weight: bold;text-align: center;">' + val['chrcode'] + '</span>'
                                                } else if (record_status == 8) {
                                                    text_status = '<span style="color: red;font-weight: bold;text-align: center;">' + 'ค่า vat ไม่ใช่ 0หรือ7' + '</span>'
                                                    dvat = '<span style="color: red;font-weight: bold;text-align: center;">' + val['dvat'] + '</span>'
                                                } else if (record_status == 9) {
                                                    text_status = '<span style="color: red;font-weight: bold;text-align: center;">' + 'ข้อมูลไม่สัมพันธ์กัน' + '</span>'
                                                    code = '<span style="color: red;font-weight: bold;text-align: center;">' + val['code'] + '</span>'
                                                    cargroup = '<span style="color: red;font-weight: bold;text-align: center;">' + val['cargroup'] + '</span>'
                                                }

                                                if (val['adis1'] < 0 || val['adis2'] < 0 || val['adis3'] < 0 || val['bdis1'] < 0 || val['bdis2'] < 0 || val['bdis3'] < 0 || val['cdis1'] < 0 || val['cdis2'] < 0 || val['cdis3'] < 0 || val['ddis1'] < 0 || val['ddis2'] < 0 || val['ddis3'] < 0 || val['edis1'] < 0 || val['edis2'] < 0 || val['edis3'] < 0 /*|| val['dvat'] < 0 */) {
                                                    $('#btn_update-data').prop('disabled', true);
                                                    text_status = 'มีค่าข้อมูลที่ ติดลบ'
                                                    toastr.error('มีค่าข้อมูลที่ ติดลบ');
                                                }

                                                chk_duplicate = val['chk_duplicate']

                                            } else if (val['event_name'] == 'DELETE') {

                                                if (record_status == 10) {
                                                    text_status = '<span style="color: DarkOrange;font-weight: bold;text-align: center;">' + 'ไม่พบข้อมูล' + '</span>'
                                                    code = '<span style="color: DarkOrange;font-weight: bold;text-align: center;">' + val['code'] + '</span>'
                                                    cargroup = '<span style="color: DarkOrange;font-weight: bold;text-align: center;">' + val['cargroup'] + '</span>'
                                                    chrcode = '<span style="color: DarkOrange;font-weight: bold;text-align: center;">' + val['chrcode'] + '</span>'
                                                }

                                                chk_duplicate = ''
                                            }




                                            if (record_status == '1') {
                                                success_information += 1;
                                            } else {
                                                wrong_information += 1;
                                            }

                                            data_import.push([
                                                i,
                                                text_status,
                                                text_status + chk_duplicate,
                                                code,
                                                cargroup,
                                                chrcode,
                                                adis1,
                                                adis2,
                                                adis3,
                                                bdis1,
                                                bdis2,
                                                bdis3,
                                                cdis1,
                                                cdis2,
                                                cdis3,
                                                ddis1,
                                                ddis2,
                                                ddis3,
                                                edis1,
                                                edis2,
                                                edis3,
                                                dvat,
                                                val['ecode'],
                                                val['ref_id']
                                            ])

                                            i++;

                                        });

                                        tbl_ediscount_import = $('#tbl-ediscount-import').DataTable({
                                            "data": data_import,
                                            "dom": 'Bfrtip',
                                            "deferRender": true,
                                            "order": [[0, "desc"]],
                                            "ordering": false,
                                            "pageLength": 5,
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

                                            }
                                                //{
                                                //    "targets": [],
                                                //    "searchable": false,
                                                //    "visible": false

                                                //    }
                                            ],
                                            "initComplete": function (settings, json) {

                                                $('.tbl-ediscount-import').removeClass('d-none');

                                            }
                                        });

                                        tbl_ediscount_import.columns.adjust();

                                        $(".modal-body").LoadingOverlay("hide", true);

                                        $('#all_information').html(i - 1);
                                        $('#success_information').html(success_information).css("color", "darkgreen");
                                        $('#wrong_information').html(wrong_information).css("color", "red");

                                        if ($('#wrong_information').html() != '0') {

                                            Swal.fire({
                                                icon: 'error',
                                                title: 'ผิดพลาด',
                                                text: 'มีข้อมูลผิดพลาด ไม่สามารถสร้างรายการได้',
                                            })
                                            toastr.warning('กรุณาตรวจสอบข้อมูล');
                                            $('#btn_update-data').prop('disabled', true);
                                        } else {

                                            //$('#btn_update-data').show();

                                            $.ediscount_upload(uuid);

                                        }

                                    }
                                }
                            });

                        } else {

                            console.log('error')

                        }

                        $(".modal-body").LoadingOverlay("hide", true);
                    });

                }

            });

        }

        $.ediscount_uploadOLD = function (uuid) {

            $('#btn_update-data').on('click', function (e) {

                e.preventDefault();

                Swal.fire({
                    title: 'คุณแน่ใจหรือไม่?',
                    text: "ที่จะทำการเพิ่มรายการสินค้า",
                    icon: 'warning',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'ใช่ฉันแน่',
                    denyButtonText: `ยกเลิก`,
                }).then((result) => {

                    $(".modal-body").LoadingOverlay("show", {
                        image: '',
                        custom: customElement
                    });

                    if (result.isConfirmed) {

                        fetch(url_ediscount_import_upload + '?ref_id=' + uuid).then(function (response) {
                            return response.json();
                        }).then(function (result) {

                            if (result.status === 'Error') {

                                $(".modal-body").LoadingOverlay("hide", true);
                                toastr.error('Oops! An Error Occurred');

                            } else {

                                $('#btn_update-data').prop('disabled', true);

                                toastr.success('Save Successfully!', async function () {

                                    $('#modal-frm_data').modal('hide');

                                    $(".modal-body").LoadingOverlay("hide", true);

                                    table_ediscount.destroy();

                                    $.ediscount_list();

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

                    } else if (result.isDenied) {

                        setTimeout(function () {

                            $(".modal-body").LoadingOverlay("hide", true);

                        }, 900);

                    } else {

                        $(".modal-body").LoadingOverlay("hide", true);

                    }

                })

                $(".modal-body").LoadingOverlay("hide", true);

            });

        };



        $.ediscount_import = async function () {

            $(document).on('change', '#customFile', function (evt) {

                evt.preventDefault();

                console.log(this.files[0])

                var path = $(this).val();
                var fileName = path.replace(/^.*\\/, "");
                $(this).next('.custom-file-label').html(fileName);

                if ($(this).val() !== '') {

                    $("#customFile").prop('disabled', true);

                    $(".modal-body").LoadingOverlay("show", {
                        image: '',
                        custom: customElement
                    });

                    let citem_import = [];

                    let uuid = $.uuid();

                    let i = 0;

                    readXlsxFile(this.files[0], { dateFormat: 'YYYY/MM/DD_hh:mm:ss' }).then(async function (result) {

                        console.log('readXlsxFile', result);

                        let count_length = result.length - 2;

                        if (result.length > 2) {

                            //$('.prnetfile-import').removeClass('d-none')

                            await $.each(result, async function (key, val) {

                                if (i > 1) {

                                    citem_import.push({

                                        mode: $.trim(val[19]),
                                        code: $.trim(val[0]),
                                        cargroup: $.trim(val[1]),
                                        chrcode: $.trim(val[2]),
                                        adis1: $.trim(val[3]),
                                        adis2: $.trim(val[4]),
                                        adis3: $.trim(val[5]),
                                        bdis1: $.trim(val[6]),
                                        bdis2: $.trim(val[7]),
                                        bdis3: $.trim(val[8]),
                                        cdis1: $.trim(val[9]),
                                        cdis2: $.trim(val[10]),
                                        cdis3: $.trim(val[11]),
                                        ddis1: $.trim(val[12]),
                                        ddis2: $.trim(val[13]),
                                        ddis3: $.trim(val[14]),
                                        edis1: $.trim(val[15]),
                                        edis2: $.trim(val[16]),
                                        edis3: $.trim(val[17]),
                                        dvat: $.trim(val[18]),
                                        ecode: $('#search_gdishead').val(),
                                        created_by: user_id,
                                        ref_id: uuid

                                    });

                                }

                                i++

                            });

                            fetch(url_ediscount_import_file + '?ref_id=' + uuid + '&mode=' + 'IMPORT' + '&created_by=' + user_id + '&count_trans=' + count_length).then(function (response) {
                                return response.json();
                            }).then(function (result_file) {

                                if (result_file.status === 'Error') {

                                    $(".modal-body").LoadingOverlay("hide", true);

                                    toastr.error('Oops! An Error Occurred');

                                } else {

                                    $.ajax({
                                        url: url_ediscount_import_tra,
                                        type: 'POST',
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        data: JSON.stringify(citem_import),
                                        success: function (result_tra) {

                                            if (result_tra.status === 'Error') {

                                                $(".modal-body").LoadingOverlay("hide", true);

                                                toastr.error('Oops! An Error Occurred');

                                            } else {

                                                fetch(url_ediscount_import_verify + '?ref_id=' + uuid).then(function (response) {
                                                    return response.json();
                                                }).then(function (result_verify) {

                                                    console.log('result_verify', result_verify)

                                                    let data_verify = [];
                                                    let j = 1;
                                                    let all_information = 0;
                                                    let wrong_information = 0;
                                                    let success_information = 0;

                                                    $.each(result_verify.data, function (key, val) {

                                                        let code = val['code'];
                                                        let cargroup = val['cargroup'];
                                                        let chrcode = val['chrcode'];

                                                        let record_status = val['record_status'];
                                                        let event_name = val['event_name'];
                                                        // let text_status = val['text_status'];
                                                        let text_status = ''
                                                        let chk_duplicate = ''
                                                        let low_val = ''

                                                        let adis1 = val['adis1'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['adis1'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['adis1'] + '</span>'
                                                        let adis2 = val['adis2'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['adis2'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['adis2'] + '</span>'
                                                        let adis3 = val['adis3'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['adis3'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['adis3'] + '</span>'
                                                        let bdis1 = val['bdis1'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['bdis1'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['bdis1'] + '</span>'
                                                        let bdis2 = val['bdis2'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['bdis2'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['bdis2'] + '</span>'
                                                        let bdis3 = val['bdis3'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['bdis3'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['bdis3'] + '</span>'
                                                        let cdis1 = val['cdis1'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['cdis1'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['cdis1'] + '</span>'
                                                        let cdis2 = val['cdis2'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['cdis2'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['cdis2'] + '</span>'
                                                        let cdis3 = val['cdis3'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['cdis3'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['cdis3'] + '</span>'
                                                        let ddis1 = val['ddis1'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['ddis1'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['ddis1'] + '</span>'
                                                        let ddis2 = val['ddis2'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['ddis2'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['ddis2'] + '</span>'
                                                        let ddis3 = val['ddis3'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['ddis3'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['ddis3'] + '</span>'
                                                        let edis1 = val['edis1'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['edis1'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['edis1'] + '</span>'
                                                        let edis2 = val['edis2'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['edis2'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['edis2'] + '</span>'
                                                        let edis3 = val['edis3'] < '0' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['edis3'] + '</span>' : '<span style="color: ;font-weight: bold;text-align: center;">' + val['edis3'] + '</span>'
                                                        //let dvat = val['dvat'] != '0' || val['dvat'] != '7' ? '<span style="color: red;font-weight: bold;text-align: center;">' + val['dvat'] + '</span>' : val['dvat'];
                                                        let dvat = val['dvat'];

                                                        if (val['event_name'] == 'CREATE') {
                                                            event_name = '<span class="tx-success tx-center">' + val['event_name'] + '</span>'
                                                        } else if (val['event_name'] == 'UPDATE') {
                                                            event_name = '<span class="tx-primary tx-center">' + val['event_name'] + '</span>'
                                                        } else if (val['event_name'] == 'DELETE') {
                                                            event_name = '<span class="tx-danger tx-center">' + val['event_name'] + '</span>'
                                                        } else {
                                                            event_name = '<span class="tx-dark tx-center">' + 'ERROR' + '</span>'
                                                        } if (val['event_name'] == 'CREATE') {
                                                            event_name = '<span class="tx-success tx-center">' + val['event_name'] + '</span>'
                                                        } else if (val['event_name'] == 'UPDATE') {
                                                            event_name = '<span class="tx-primary tx-center">' + val['event_name'] + '</span>'
                                                        } else if (val['event_name'] == 'DELETE') {
                                                            event_name = '<span class="tx-danger tx-center">' + val['event_name'] + '</span>'
                                                        } else {
                                                            event_name = '<span class="tx-dark tx-center">' + 'ERROR' + '</span>'
                                                        }

                                                        if (val['event_name'] == 'CREATE') {

                                                            if (record_status == 2) {
                                                                text_status = '<span style="color: DarkOrange;font-weight: bold;text-align: center;">' + 'ข้อมูลซ้ำในเอกสาร' + '</span>'
                                                                code = '<span style="color: DarkOrange;font-weight: bold;text-align: center;">' + val['code'] + '</span>'
                                                                cargroup = '<span style="color: DarkOrange;font-weight: bold;text-align: center;">' + val['cargroup'] + '</span>'
                                                                chrcode = '<span style="color: DarkOrange;font-weight: bold;text-align: center;">' + val['chrcode'] + '</span>'
                                                            } else if (record_status == 3) {
                                                                text_status = '<span style="color: red;font-weight: bold;text-align: center;">' + 'ไม่พบยี่ห้อสินค้า' + '</span>'
                                                                code = '<span style="color: red;font-weight: bold;text-align: center;">' + val['code'] + '</span>'
                                                            } else if (record_status == 4) {
                                                                text_status = '<span style="color: red;font-weight: bold;text-align: center;">' + 'ไม่พบกลุ่มสินค้า' + '</span>'
                                                                chrcode = '<span style="color: red;font-weight: bold;text-align: center;">' + val['chrcode'] + '</span>'
                                                            } else if (record_status == 5) {
                                                                text_status = '<span style="color: red;font-weight: bold;text-align: center;">' + 'ไม่พบชื่อย่อสินค้า' + '</span>'
                                                                cargroup = '<span style="color: red;font-weight: bold;text-align: center;">' + val['cargroup'] + '</span>'
                                                            } else if (record_status == 6) {
                                                                text_status = '<span style="color: red;font-weight: bold;text-align: center;">' + 'ข้อมูลซ้ำในระบบ' + '</span>'
                                                                code = '<span style="color: red;font-weight: bold;text-align: center;">' + val['code'] + '</span>'
                                                                cargroup = '<span style="color: red;font-weight: bold;text-align: center;">' + val['cargroup'] + '</span>'
                                                                chrcode = '<span style="color: red;font-weight: bold;text-align: center;">' + val['chrcode'] + '</span>'
                                                            } else if (record_status == 8) {
                                                                text_status = '<span style="color: red;font-weight: bold;text-align: center;">' + 'ค่า vat ไม่ใช่ 0หรือ7' + '</span>'
                                                                dvat = '<span style="color: red;font-weight: bold;text-align: center;">' + val['dvat'] + '</span>'
                                                            } else if (record_status == 9) {
                                                                text_status = '<span style="color: red;font-weight: bold;text-align: center;">' + 'ข้อมูลไม่สัมพันธ์กัน' + '</span>'
                                                                code = '<span style="color: red;font-weight: bold;text-align: center;">' + val['code'] + '</span>'
                                                                cargroup = '<span style="color: red;font-weight: bold;text-align: center;">' + val['cargroup'] + '</span>'
                                                            }

                                                            if (val['adis1'] < 0 || val['adis2'] < 0 || val['adis3'] < 0 || val['bdis1'] < 0 || val['bdis2'] < 0 || val['bdis3'] < 0 || val['cdis1'] < 0 || val['cdis2'] < 0 || val['cdis3'] < 0 || val['ddis1'] < 0 || val['ddis2'] < 0 || val['ddis3'] < 0 || val['edis1'] < 0 || val['edis2'] < 0 || val['edis3'] < 0 /*|| val['dvat'] < 0 */) {
                                                                $('#btn_update-data').prop('disabled', true);
                                                                text_status = 'มีค่าข้อมูลที่ ติดลบ'
                                                                toastr.error('มีค่าข้อมูลที่ ติดลบ');
                                                            }

                                                            chk_duplicate = val['chk_duplicate']

                                                        } else if (val['event_name'] == 'DELETE') {

                                                            if (record_status == 10) {
                                                                text_status = '<span style="color: DarkOrange;font-weight: bold;text-align: center;">' + 'ไม่พบข้อมูล' + '</span>'
                                                                code = '<span style="color: DarkOrange;font-weight: bold;text-align: center;">' + val['code'] + '</span>'
                                                                cargroup = '<span style="color: DarkOrange;font-weight: bold;text-align: center;">' + val['cargroup'] + '</span>'
                                                                chrcode = '<span style="color: DarkOrange;font-weight: bold;text-align: center;">' + val['chrcode'] + '</span>'
                                                            }

                                                            chk_duplicate = ''
                                                        }


                                                        if (record_status == '1') {
                                                            success_information += 1;
                                                        } else {
                                                            wrong_information += 1;
                                                        }


                                                        data_verify.push([
                                                            j,
                                                            record_status,
                                                            text_status + chk_duplicate,
                                                            code,
                                                            cargroup,
                                                            chrcode,
                                                            adis1,
                                                            adis2,
                                                            adis3,
                                                            bdis1,
                                                            bdis2,
                                                            bdis3,
                                                            cdis1,
                                                            cdis2,
                                                            cdis3,
                                                            ddis1,
                                                            ddis2,
                                                            ddis3,
                                                            edis1,
                                                            edis2,
                                                            edis3,
                                                            dvat,
                                                            val['ecode'],
                                                            event_name
                                                        ])

                                                        j++

                                                    });

                                                    console.log('data_verify', data_verify)

                                                    tbl_ediscount_import = $('#tbl-ediscount-import').DataTable({
                                                        "data": data_verify,
                                                        "dom": 'Bfrtip',
                                                        "deferRender": true,
                                                        "order": [[0, "desc"]],
                                                        "ordering": false,
                                                        "pageLength": 5,
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

                                                                return (data == '1' ? '<span class="badge badge-pill badge-success">OK</span>' : '<span class="badge badge-pill badge-danger">ERROR</span>');

                                                            }

                                                        }],
                                                        "initComplete": function (settings, json) {
                                                            $(".modal-body").LoadingOverlay("hide", true);
                                                            $('.tbl-ediscount-import').removeClass('d-none');
                                                        }
                                                    });

                                                    tbl_ediscount_import.columns.adjust();

                                                    $(".modal-body").LoadingOverlay("hide", true);

                                                    $('#all_information').html(i - 2);
                                                    $('#success_information').html(success_information).css("color", "darkgreen");
                                                    $('#wrong_information').html(wrong_information).css("color", "red");

                                                    if ($('#wrong_information').html() != '0') {

                                                       
                                                        toastr.warning('กรุณาตรวจสอบข้อมูล');
                                                        $('#btn_update-data').prop('disabled', true);

                                                    } else {

                                                        //$('#btn_update-data').show();
                                                        toastr.success('ข้อมูลสมบูรณ์');

                                                        $('#btn_update-data').show();

                                                        $.ediscount_upload(uuid);

                                                    }

                                                })

                                            }

                                        }

                                    })

                                }

                            })

                        } else {

                            toastr.error('ไม่พบข้อมูลในเอกสาร');

                            $('#import_prnetfile').prop('disabled', false);

                        }

                    }).catch(error => {

                        $(".modal-body").LoadingOverlay("hide", true);
                        toastr.error('Error writing document');
                        $('#import_prnetfile').prop('disabled', false);

                    });

                }

            });

        }

        $.ediscount_upload = function (uuid) {

            $('#btn_update-data').on('click', function (e) {

                e.preventDefault();

                swal({
                    title: "คุณแน่ใจหรือไม่",
                    text: "ที่จะทำการอัพเดตข้อมูลนี้",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "ใช่, ยันยืน",
                    cancelButtonText: "ไม่, ยกเลิก",
                    cancelButtonColor: '#d33',
                    closeOnConfirm: false,
                    closeOnCancel: false
                }, function (isConfirm) {

                    if (isConfirm) {

                        $('#btn_update-data').prop('disabled', true);

                        fetch(url_ediscount_import_upload + '?ref_id=' + uuid + '&updated_by=' + user_id).then(function (response) {
                            return response.json();
                        }).then(function (result) {

                            $(".modal-body").LoadingOverlay("hide", true);

                            if (result.status === 'Error') {

                                toastr.error('ไม่สามารถอัพโหลดข้อมูลนี้');

                            } else {

                                toastr.success('Save Successfully!', async function () {

                                    swal({
                                        title: "สำเร็จ!",
                                        text: "ทำรายการสำเร็จ",
                                        type: 'success',
                                        timer: 2000,
                                        showConfirmButton: false
                                    });

                                    $('#modal-frm_data').modal('hide');

                                    $(".modal-body").LoadingOverlay("hide", true);
                                    $.prnetfile_list();

                                }, 300);

                            }

                        }).catch(error => {

                            toastr.error('Error, Please contact administrator.');

                        });

                    } else {

                        swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

                    }

                });


            });

        };


        $.emmas_list = async function () {

            let url_emmas = new URL(url_emmas_List);

            url_emmas.search = new URLSearchParams({
                code: $('#search_gdishead').val(),
                mode: 'egdis',
            });

            fetch(url_emmas).then(function (response) {
                return response.json();
            }).then(function (result) {

                // console.log(result.data);

                let i = result.length;

                var data_emmas = [];

                $.each(result.data, function (key, val) {

                    data_emmas.push([
                        i,
                        val['emmas_code'],
                        val['emmas_lname'],
                        val['emmas_address'],
                        val['emmas_tumbol'],
                        val['emmas_eamphur'],
                        val['emmas_eprovinc'],
                        val['emmas_zip'],
                        '<div class="tx-left-f"><a href="javascript:void(0)"><span class="badge badge-danger"><i class="typcn typcn-minus"></i></span></a>' + '</div>',
                    ])

                    i--;

                });

                // console.log('data_emmas', data_emmas)

                $('#tbl-emmas_list').DataTable({
                    "data": data_emmas,
                    "dom": 'ifrtp',
                    "deferRender": true,
                    "order": [[0, "desc"]],
                    "ordering": false,
                    "bDestroy": true,
                    "pageLength": 5,
                    "columnDefs": [{
                        "targets": 'no-sort',
                        "orderable": false,
                    }],
                    "initComplete": function (settings, json) {

                    }
                });

            });

        }

        $.clear_input_gdishead = async function () {

            $('#frm_data').trigger('reset');
            $('#frm_data').find('input').val('').prop('disabled', false);
            $("#frm_data").parsley().reset();
            $('#vat').val('7');
        };

        $.clear_create_ediscount = async function () {

            $('#vat').val('7');

            $('#frm_item').find('#search_code3').val('').prop('disabled', false);
            $("#search_code3 option").remove();
            $('#search_code3')
                .append($("<option value=''>--- Select Search ---</option>"))

            $('#frm_item').find('#search_lov_disgroup').val('').prop('disabled', false);
            $("#search_lov_disgroup option").remove();
            $('#search_lov_disgroup')
                .append($("<option value=''>--- Select Search ---</option>"))

            $('#frm_item').find('#search_code1').val('').prop('disabled', false);
            $("#search_code1 option").remove();
            $('#search_code1')
                .append($("<option value=''>--- Select Search ---</option>"))

            item_code_1 = ""
            //$('#tbl-ediscount_list tbody tr').removeClass('bg-warning')
        };

        $.clear_input_ediscount = async function () {

            $('#frm_item').trigger('reset');
            $('#frm_item').find('input').val('').prop('disabled', false);
            $("#frm_item").parsley().reset();
            $('#vat').val('7');
        };

        $(document).ready(async function () {

            await $.init();

        });

    } else {

        window.location.assign('./login');

    }

});