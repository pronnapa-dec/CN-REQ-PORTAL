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
const url_prnetfile_select2_search = url_api + "/v1/prnetfile_select2_search";

const url_dis_prnettra_action = url_api + "/v1/prnettra_action";
const url_prnettra_list = url_api + "/v1/prnettra_list";

const url_prnettra_import_file = url_api + "/v1/import_prnettra_tmpfile";
const url_prnettra_import_tra = url_api + "/v1/import_prnettra_tmptrans";
const url_prnettra_import_verify = url_api + "/v1/import_prnettra_tmpverify";
const url_prnettra_import_upload = url_api + "/v1/import_prnettra_tmpupload";

const url_emmas_List = url_api + "/v1/dis_emmas_List";

const url_prnetfile_list = url_api + "/v1/prnetfile_list";
const url_dis_prnetfile_action = url_api + "/v1/prnetfile_action";

const url_prnetfile_import_file = url_api + "/v1/import_prnetflie_tmpfile";
const url_prnetfile_import_tra = url_api + "/v1/import_prnetflie_tmptrans";
const url_prnetfile_import_verify = url_api + "/v1/import_prnetflie_tmpverify";
const url_prnetfile_import_upload = url_api + "/v1/import_prnetflie_tmpupload";

const url_prnetfile_import_tmptrans_emmas = url_api + "/v1/import_prnetflie_tmptrans_emmas";
const url_prnetfile_import_verify_emmas = url_api + "/v1/import_prnetflie_tmpverify_emmas";
const url_prnetfile_import_upload_emmas = url_api + "/v1/import_prnetflie_tmpupload_emmas";

let template_url = 'http://192.168.1.247/template/';
var ref_id = $.uuid();
let table_prnetfile, table_prnetfile_import, table_update_emmas_import, tbl_net_list, table_prnettra, table_emmas, username;
var item_stams;
const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const user_id = objProfile[0]['username'];
var ref_id_tra = $.uuid();
function filterGlobal() {
    table_prnetfile = $('#tbl-prnetfile-list').DataTable().search(
        $('#template_code').val().trim(),
        false,
        true
    ).draw();
}

$.init = async function () {

    $('#search_prnetfile').select2({
        minimumInputLength: 1,
        minimumResultsForSearch: 10,
        dropdownAutoWidth: true,
        delay: 500,
        ajax: {
            url: url_prnetfile_select2_search,
            dataType: 'json',
            width: 'resolve',
            data: function (params) {
                var query = {
                    id: "rtrim(code)",
                    text: "concat(rtrim(code),'-', rtrim(lname),'-',rtrim(remark))",
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
                            name: item.lname
                        }
                    })
                };
            },
        },
        escapeMarkup: function (markup) {
            return markup;
        },
    })

    $('#search_prnetfile').on('select2:select', async function (e) {

        //var data = e.params.data;
        //console.log('data', data);
        //window.location = './dis/netprice?ecode=' + data.id + '&lname=' + data.text;

        var data = e.params.data;

        console.log('search_prnetfile', data['text']);

        if ($('#search_prnetfile').val() !== '') {

            $('#tiltle-table').html('รายละเอียดตารางราคา NET : ' + '<span class="tx-primary">' + data['id'] + '  ' + data['name'] + '</span>')

            $.prnettra_list();

            $.emmas_list();

        }

    });

    $('#modal-prnetfile').on('shown.bs.modal', async function () {

        $('#template_code').on('keyup click', function (e) {
            $(this).val($(this).val().replace(/\s/g, '').toUpperCase());
            filterGlobal();
        });

        await $.prnetfile_import();

        await $.prnetfile_list();

        await $.prnetfile_emmas_import();

        $('.btn-create').attr("data-action", "create");

    })

    $('#modal-prnetfile').on('hidden.bs.modal', async function () {

        table_prnetfile.destroy();
        $('#frm_data').trigger('reset');
        $('#frm_data').find('input').val('').prop('disabled', false);
        $("#frm_data").parsley().reset();
        $('.btn-create').attr("data-action", "create");

        await setTimeout(function () {

            $.LoadingOverlay("hide");

            location.reload();

        }, 300);

    })

    $('#modal-prnettra_import').off('shown.bs.modal').on('shown.bs.modal', async function () {

        $('#modal-prnettra_import').find('.modal-title').html('ตารางกำหนดราคาสินค้า NET : ' + '<span class="tx-primary">' + $('#search_prnetfile').val() + '</span>');

        $('#btn_update-data').hide();

        await $.prnettra_import();

        await setTimeout(function () {
            $.LoadingOverlay("hide");
        }, 300);

    })

    $('#modal-prnettra_import').off('hidden.bs.modal').on('hidden.bs.modal', async function () {

        $.LoadingOverlay("show");

        $('#customFile').prop('disabled', false);

        $('#btn_update-data').prop('disabled', false);

        await setTimeout(function () {

            location.reload();

            $.LoadingOverlay("hide");

        }, 100);

    })

    $('.btn-create').on('click', function (e) {

        e.preventDefault();

        console.log('action', $('.btn-create').attr("data-action"))

        if ($('.btn-create').attr("data-action") == 'create') {

            console.log('create')
            $.prnetfile_create();

        } else if ($('.btn-create').attr("data-action") == 'update') {

            console.log('update')
            $.prnetfile_update();
        }

    });

    $('.pril-btn-action').on('click', function (e) {

        e.preventDefault();

        if ($('#search_itemmaster').val() !== '') {

            console.log('action', $('.pril-btn-action').attr("data-action"))

            if ($('.pril-btn-action').attr("data-action") == 'create') {

                console.log('create')

                //Swal.fire({
                //    title: 'Do you want to save the changes?',
                //    showDenyButton: true,
                //    showCancelButton: true,
                //    confirmButtonText: 'Save',
                //    denyButtonText: `Don't save`,
                //}).then((result) => {
                //    /* Read more about isConfirmed, isDenied below */
                //    if (result.isConfirmed) {

                $.prnettra_create();

                //    } else if (result.isDenied) {
                //        Swal.fire('Changes are not saved', '', 'info')
                //    }
                //})

            }
            else if ($('.pril-btn-action').attr("data-action") == 'update') {

                //Swal.fire({
                //    title: 'Do you want to save the changes?',
                //    showDenyButton: true,
                //    showCancelButton: true,
                //    confirmButtonText: 'Save',
                //    denyButtonText: `Don't save`,
                //}).then((result) => {
                //    if (result.isConfirmed) {
                console.log('update')

                $.prnettra_update();
                //        } else if (result.isDenied) {
                //            Swal.fire('Changes are not saved', '', 'info')
                //        }
                //    })
            }

        } else {

            //alert('false')
        }

    });

    $('.btn-reset').click(function (e) {

        e.preventDefault();

        $('.btn-create').attr("data-action", "create");
        $('#frm_data').trigger('reset');
        $('#frm_data').find('input').val('').prop('disabled', false);
        $("#frm_data").parsley().reset();

    });

    $('.pril-btn-reset').click(function (e) {

        e.preventDefault();

        $('.pril-btn-action').attr("data-action", "create");
        $('#frm_item').find('#search_itemmaster').val('').prop('disabled', false);
        $("#search_itemmaster option").remove();
        $('#search_itemmaster')
            .append($("<option>--- Select Search ---</option>"))
        $('#frm_item').find('#gunit').val('หน่วย')
        $('#frm_item').find('#avgcost').html('0.00')
        $('#frm_item').find('#nowcost').html('0.00')
        $('#frm_item').find('#difference').html('0%')
        $('#frm_item').find('#vat').html('')
        $('#frm_item').find('#nowcost').html('0.00')
        $('#frm_item').find('#suggested').html('0.00')

        $('#frm_item').trigger('reset');
        $('#frm_item').find('input').val('').prop('disabled', false);
        $("#frm_item").parsley().reset();
        $('#item_detail').html('');
        $('#tbl-net_list tbody tr').removeClass('bg-warning')

    });

    $('#btn_downloadtemplate').on('click', function (evt) {

        location.href = template_url + 'Template_UpdatePriceNet.xlsx';

        console.log("...downloadtemplate...");

    });

    $('#btn_prnetfile_downloadtemplate').on('click', function (evt) {

        location.href = template_url + 'Template_Code-Netprice.xlsx';

        console.log("...prnetfile_downloadtemplate...");

    });

    $('#btn_update_emmas_downloadtemplate').on('click', function (evt) {

        location.href = template_url + 'Template_Update-NetpriceToEmmas.xlsx';

        console.log("...prnetfile_downloadtemplate...");

    });

    $('#frm_item').find('#NetPrice').css('width', '100px');

    $('#frm_item').find('#Qty_A , #Qty_B').css('width', '90px');

    $("#Qty_A , #Qty_B").attr({ "min": 0 });

    $("#NetPrice").on("keypress keyup blur", function (event) {
        //this.value = this.value.replace(/[^0-9\.]/g,'');
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    $("#Qty_A , #Qty_B").on("keypress keyup blur", function (event) {
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    $('.swal2-container').css("z-index", '999999');
};


$.prnetfile_list = async function () {

    let url_prnetfile = new URL(url_prnetfile_list);

    url_prnetfile.search = new URLSearchParams({
        mode: 'list',
    });

    fetch(url_prnetfile).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log(result.data);

        let i = result.length;

        var data_prnetfile = [];

        $.each(result.data, function (key, val) {

            let data = JSON.stringify(val)

            data_prnetfile.push([
                i,
                val['prnetfile_code'],
                val['prnetfile_lname'],
                val['prnetfile_remark'],
                val['prnetfile_procdate'],
                val['prnetfile_userid'],
                "<div class='d-flex flex-row justify-content-center'>" +
                "<button onclick='$.prnetfile_view(" + data + ");' data-item='" + data + "' style='margin: .25rem .125rem; ' class='btn btn-outline-primary btn-sm edit-item update_item' data-action='update'  id='update_item" + i + "' type='button'>Edit</button>" +
                //"<button onclick='$.prnetfile_delete(" + data + ");' data-item='" + data + "' style='margin: .25rem .125rem; ' class='btn btn-outline-danger btn-sm delete-item delete_item' data-action='delete' id='delete_item" + i + "' type='button'>Delete</button>" +
                "</div>",
            ])

            i--;

        });

        console.log('data_prnetfile', data_prnetfile)

        table_prnetfile = $('#tbl-prnetfile-list').DataTable({
            "data": data_prnetfile,
            "dom": 'Bfrtip',
            //autoWidth : true,
            "deferRender": true,
            "order": [[0, "desc"]],
            "ordering": false,
            "pageLength": 5,
            buttons: [
                'copyHtml5',
                {
                    extend: 'excelHtml5',
                    title: '',
                    filename: 'Table_PriceNet_Code' + moment().format("YYYY/MM/DD hh:ss:mm"),
                    exportOptions: {
                        columns: [1, 2, 3, 4, 5]
                    },
                },
            ],
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

        table_prnetfile.columns.adjust();

        $.LoadingOverlay("hide");

    });

}

$.prnetfile_create = async function () {

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
            procby: '',
            named: '',
            TYPE: '',
            carbrand: '',
            chrcode: '',
            gmodel: '',
            typeb: '',
            created_by: user_id,
            //ref_id: ref_id,
            ref_id: $.uuid(),
        };

        console.log('add_data', add_data)

        var params = [];
        for (const i in add_data) {
            params.push(i + "=" + encodeURIComponent(add_data[i]));
        }

        fetch(url_dis_prnetfile_action, {
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

                    table_prnetfile.destroy();

                    $.prnetfile_list();

                    //$.LoadingOverlay("hide");
                    $(".modal-body").LoadingOverlay("hide", true);

                    $.clear_input_prnetfile();

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

                        table_prnetfile.destroy();

                        $.prnetfile_list();

                        $(".modal-body").LoadingOverlay("hide", true);

                        $.clear_input_prnetfile();

                    }, 800);

                });
            }

        }).catch((error) => {

            toastr.error(error, 'Error writing document');

        });

        return false;

    }
};

$.prnetfile_view = async function (citem) {

    console.log('citem', citem)

    var ref_id_update = JSON.stringify(citem)

    $('.btn-create').attr("data-action", "update");

    $('.btn-create').attr("data-id", ref_id_update);

    $('#frm_data').trigger('reset');
    $('#frm_data').find('input').val('').prop('disabled', false);
    $('#frm_data').find('select').val('').trigger('change.select2').prop('disabled', false);
    $("#frm_data").parsley().reset();

    $('#template_code').val(citem['prnetfile_code']).prop('disabled', true);
    $('#template_detail').val(citem['prnetfile_lname'])
    $('#template_remark').val(citem['prnetfile_remark'])

};

$.prnetfile_update = async function () {

    console.log($('.btn-create').data('id'))

    let citem = $('.btn-create').data('id');

    console.log('citem update', citem)

    $('#frm_data').parsley().validate();

    if ($('#frm_data').parsley().isValid()) {

        let update_data = {
            mode: 'UPDATE',
            code: $('#template_code').val(),
            lname: $('#template_detail').val(),
            remark: $('#template_remark').val(),
            created_by: user_id,
            updated_by: user_id,
            // ref_id: citem['ref_id'],
            ref_id: $.uuid(),
        };

        console.log('update_data', update_data)

        var params = [];
        for (const i in update_data) {
            params.push(i + "=" + encodeURIComponent(update_data[i]));
        }

        fetch(url_dis_prnetfile_action, {
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

                    table_prnetfile.destroy();

                    $.prnetfile_list();

                    $.LoadingOverlay("hide");

                    $(".modal-body").LoadingOverlay("hide", true);

                    $.clear_input_prnetfile();

                }, 800);

            } else {

                toastr.success('Save Successfully!', async function () {

                    $('#modal-frm_data').modal('hide');

                    setTimeout(function () {

                        table_prnetfile.destroy();

                        $.prnetfile_list();

                        $(".modal-body").LoadingOverlay("hide", true);

                        $('.btn-create').attr("data-action", "create");

                        $.clear_input_prnetfile();

                    }, 800);

                });
            }

        }).catch((error) => {

            toastr.error(error, 'Error writing document');

        });

        return false;

    }
};

$.prnetfile_delete = async function (citem) {

    console.log('citem', citem)

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

        if (result.isConfirmed) {

            $(".modal-body").LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            let delete_data = {

                mode: 'DELETE',
                code: citem['prnetfile_code'],
                lname: citem['prnetfile_lname'],
                remark: citem['prnetfile_remark'],
                created_by: user_id,
                updated_by: user_id,
                ref_id: $.uuid(),

            };

            var params = [];
            for (const i in delete_data) {
                params.push(i + "=" + encodeURIComponent(delete_data[i]));
            }

            fetch(url_dis_prnetfile_action, {
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

                        table_prnetfile.destroy();

                        $.prnetfile_list();

                        $.LoadingOverlay("hide");

                        $(".modal-body").LoadingOverlay("hide", true);

                        $.clear_input_prnetfile();

                    }, 800);

                } else {

                    toastr.success('Save Successfully!', async function () {

                        $('#modal-frm_data').modal('hide');

                        setTimeout(function () {

                            table_prnetfile.destroy();

                            $.prnetfile_list();

                            $(".modal-body").LoadingOverlay("hide", true);

                            $('.btn-create').attr("data-action", "create");

                            $.clear_input_prnetfile();

                        }, 800);

                    });
                }

            }).catch((error) => {
                toastr.error(error, 'Error writing document');
                console.log('Error:', error);
            });

            return false;
        }
    })

};


$.prnetfile_import = async function () {

    $(document).on('change', '#import_prnetfile', function (evt) {

        evt.preventDefault();

        console.log(this.files[0])

        var path = $(this).val();
        var fileName = path.replace(/^.*\\/, "");
        $(this).next('.custom-file-label').html(fileName);

        if ($(this).val() !== '') {

            $("#import_prnetfile").prop('disabled', true);

            $(".modal-body").LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            let citem_import = [];

            let uuid = $.uuid();

            let i = 0;

            readXlsxFile(this.files[0], { dateFormat: 'YYYY/MM/DD_hh:mm:ss' }).then(async function (result) {

                console.log('readXlsxFile', result);

                $(".modal-body").LoadingOverlay("hide", true);

                let count_length = result.length - 2;

                if (result.length > 2) {

                    $('.prnetfile-import').removeClass('d-none')

                    await $.each(result, async function (key, val) {

                        if (i > 1) {

                            citem_import.push({

                                code: $.trim(val[0]),
                                lname: $.trim(val[1]),
                                remark: $.trim(val[2]),
                                procby: '',
                                named: '',
                                TYPE: '',
                                carbrand: '',
                                chrcode: '',
                                gmodel: '',
                                typeb: '',
                                created_by: user_id,
                                mode: $.trim(val[3]),
                                ref_id: uuid

                            });

                        }

                        i++

                    });

                    fetch(url_prnetfile_import_file + '?ref_id=' + uuid + '&mode=' + 'IMPORT' + '&created_by=' + user_id + '&count_trans=' + count_length).then(function (response) {
                        return response.json();
                    }).then(function (result_file) {

                        $(".modal-body").LoadingOverlay("hide", true);

                        if (result_file.status === 'Error') {

                            toastr.error('Oops! An Error Occurred');

                        } else {

                            $.ajax({
                                url: url_prnetfile_import_tra,
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                data: JSON.stringify(citem_import),
                                success: function (result_tra) {

                                    if (result_tra.status === 'Error') {

                                        toastr.error('Oops! An Error Occurred');

                                    } else {

                                        fetch(url_prnetfile_import_verify + '?ref_id=' + uuid).then(function (response) {
                                            return response.json();
                                        }).then(function (result_verify) {

                                            console.log('result_verify', result_verify)

                                            let data_verify = [];
                                            let j = 1;
                                            let all_information = 0;
                                            let wrong_information = 0;
                                            let success_information = 0;

                                            $.each(result_verify.data, function (key, val) {

                                                let text_status = ''
                                                let record_status = val['record_status'];
                                                let tx_status_code = ''
                                                let tx_status_name = ''
                                                let tx_status_error_1 = ''

                                                if (record_status == '1') {
                                                    success_information += 1;
                                                } else {
                                                    wrong_information += 1;
                                                }

                                                let code = val['code'];
                                                let lname = val['lname']
                                                let remark = val['remark'];
                                                let event_name = val['event_name'];

                                                if (event_name == 'CREATE') {

                                                    if (val['tx_status_code'] != '1') {
                                                        tx_status_code = '<span class="tx-danger tx-center">' + 'รหัสซ้ำ' + '</span>'
                                                        code = '<span class="tx-danger tx-center">' + val['code'] + '</span>'
                                                    }
                                                    if (val['tx_status_name'] != '1') {
                                                        tx_status_name = '<span class="tx-warning tx-center">' + 'ชื่อซ้ำ' + '</span>'
                                                        lname = '<span class="tx-warning tx-center">' + val['lname'] + '</span>'
                                                    }
                                                    if (val['tx_status_error_1'] != '1') {
                                                        tx_status_error_1 = '<span class="tx-warning tx-center">' + 'ข้อมูลซ้ำในเอกสาร' + '</span>'
                                                        code = '<span class="tx-warning tx-center">' + val['code'] + '</span>'
                                                        lname = '<span class="tx-warning tx-center">' + val['lname'] + '</span>'
                                                        remark = '<span class="tx-warning tx-center">' + val['remark'] + '</span>'
                                                    }
                                                    if (val['record_status'] == '4') {
                                                        tx_status_code = '<span class="tx-danger tx-center">' + 'ไม่พบรหัสซ้ำ' + '</span>'
                                                    }

                                                    if (val['text_status'] != 'false') {
                                                        text_status = '<span class="tx-center">' + tx_status_code + ' ' + tx_status_name + ' ' + tx_status_error_1 + '</span>'
                                                    } else {
                                                        code = '<span class="tx-center">' + val['code'] + '</span>'
                                                        lname = '<span class="tx-center">' + val['lname'] + '</span>'
                                                        remark = '<span class="tx-center">' + val['remark'] + '</span>'
                                                        text_status = '<span class="tx-center">' + 'OK' + '</span>'
                                                    }
                                                }

                                                data_verify.push([
                                                    j,
                                                    record_status,
                                                    text_status,
                                                    code,
                                                    lname,
                                                    remark,
                                                    event_name
                                                ])

                                                j++

                                            });

                                            console.log('data_verify', data_verify)

                                            table_prnetfile_import = $('#tbl-prnetfile-import').DataTable({
                                                "data": data_verify,
                                                "dom": 'Bfrtip',
                                                "deferRender": true,
                                                "order": [[0, "desc"]],
                                                "ordering": false,
                                                "pageLength": 5,
                                                buttons: [
                                                    'copyHtml5',
                                                    {
                                                        extend: 'excelHtml5',
                                                        title: '',
                                                        filename: 'Import_TemplatePriceNet_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                                                    },
                                                ],
                                                "columnDefs": [{
                                                    "targets": 'no-sort',
                                                    "orderable": false,
                                                },
                                                {
                                                    "targets": [0],
                                                    "searchable": false,
                                                    "class": 'tx-center'

                                                },
                                                {
                                                    "targets": [1],
                                                    "class": 'tx-center',
                                                    "render": function (data, type, row, meta) {

                                                        return (data == '1' ? '<span class="badge badge-pill badge-success">OK</span>' : '<span class="badge badge-pill badge-danger">ERROR</span>');

                                                    }

                                                },
                                                {
                                                    "targets": [2],
                                                    "class": 'tx-center',
                                                    "searchable": false,
                                                },
                                                {
                                                    "targets": [3],
                                                    "searchable": false,
                                                    "class": 'tx-center',

                                                },
                                                {
                                                    "targets": [4],
                                                    "searchable": false,
                                                    "class": 'tx-center',

                                                },
                                                {
                                                    "targets": [5],
                                                    "searchable": false,
                                                    "class": 'tx-center',

                                                },
                                                {
                                                    "targets": [6],
                                                    "searchable": false,
                                                    "class": 'tx-center',

                                                }],
                                                "initComplete": function (settings, json) {

                                                    //$('#btn_update_prnetfile-data').removeClass('d-none');

                                                }
                                            });

                                            $('#prnetfile_all_information').html(j - 1);
                                            $('#prnetfile_sprnetfile_uccess_information').html(success_information).css("color", "darkgreen");
                                            $('#prnetfile_wrong_information').html(wrong_information).css("color", "red");

                                            table_prnetfile_import.columns.adjust();

                                            $(".modal-body").LoadingOverlay("hide", true);

                                            if ($('#prnetfile_wrong_information').html() != '0') {

                                                toastr.warning('พบข้อมูลผิดพลาก กรุณาตรวจสอบ');

                                            } else {

                                                toastr.success('ข้อมูลสมบูรณ์');
                                                $.prnetfile_upload(uuid);
                                                $('#btn_update_prnetfile-data').removeClass('d-none');

                                            }

                                            //$.prnetfile_upload(uuid);

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

$.prnetfile_upload = function (uuid) {

    $('#btn_update_prnetfile-data').on('click', function (e) {

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

                $('#btn_update_prnetfile-data').prop('disabled', true);

                fetch(url_prnetfile_import_upload + '?ref_id=' + uuid + '&updated_by=' + user_id).then(function (response) {
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


$.prnetfile_emmas_import = async function () {

    $(document).on('change', '#import_update_emmas', function (evt) {

        evt.preventDefault();

        console.log(this.files[0])

        var path = $(this).val();
        var fileName = path.replace(/^.*\\/, "");
        $(this).next('.custom-file-label').html(fileName);

        if ($(this).val() !== '') {

            $("#import_update_emmas").prop('disabled', true);

            $(".modal-body").LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            let citem_import = [];

            let uuid = $.uuid();

            let i = 0;

            readXlsxFile(this.files[0], { dateFormat: 'YYYY/MM/DD_hh:mm:ss' }).then(async function (result) {

                console.log('readXlsxFile', result);

                $(".modal-body").LoadingOverlay("hide", true);

                let count_length = result.length - 2;

                if (result.length > 2) {

                    $('.update_emmas-import').removeClass('d-none')

                    await $.each(result, async function (key, val) {

                        if (i > 1) {

                            citem_import.push({

                                emmas_code: $.trim(val[0]),
                                emmas_name: $.trim(val[1]),
                                netprice_code: $.trim(val[2]),
                                created_by: user_id,
                                mode: $.trim(val[3]),
                                ref_id: uuid

                            });

                        }

                        i++

                    });

                    fetch(url_prnetfile_import_file + '?ref_id=' + uuid + '&mode=' + 'UPDATE EMMAS' + '&created_by=' + user_id + '&count_trans=' + count_length).then(function (response) {
                        return response.json();
                    }).then(function (result_file) {

                        $(".modal-body").LoadingOverlay("hide", true);

                        if (result_file.status === 'Error') {

                            toastr.error('Oops! An Error Occurred');

                        } else {

                            $.ajax({
                                url: url_prnetfile_import_tmptrans_emmas,
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                data: JSON.stringify(citem_import),
                                success: function (result_tra) {

                                    if (result_tra.status === 'Error') {

                                        toastr.error('Oops! An Error Occurred');

                                    } else {

                                        fetch(url_prnetfile_import_verify_emmas + '?ref_id=' + uuid).then(function (response) {
                                            return response.json();
                                        }).then(function (result_verify) {

                                            console.log('result_verify', result_verify)

                                            let data_verify = [];
                                            let j = 1;
                                            let all_information = 0;
                                            let wrong_information = 0;
                                            let success_information = 0;

                                            $.each(result_verify.data, function (key, val) {

                                                let text_status = ''
                                                let text_status_compare = ''
                                                let record_status = val['record_status'];
                                                let tx_status_code_netprice = ''
                                                let tx_status_code_emmas = ''
                                                let tx_status_error_1 = ''
                                                let tx_status_error_2 = ''

                                                if (record_status == '1') {
                                                    success_information += 1;
                                                } else {
                                                    wrong_information += 1;
                                                }

                                                let event_name = ''
                                                if (val['event_name'] == 'CREATE' || val['event_name'] == 'UPDATE') {
                                                    event_name = '<span class="tx-success tx-center">' + val['event_name'] + '</span>'
                                                } else if (val['event_name'] == 'UPDATE') {
                                                    event_name = '<span class="tx-primary tx-center">' + val['event_name'] + '</span>'
                                                } else if (val['event_name'] == 'DELETE') {
                                                    event_name = '<span class="tx-danger tx-center">' + val['event_name'] + '</span>'
                                                } else {
                                                    event_name = '<span class="tx-dark tx-center">' + 'ERROR' + '</span>'
                                                }

                                                let netprice_code = val['netprice_code'];
                                                let netprice_name = val['netprice_name'];
                                                let emmas_code = val['emmas_code']
                                                let emmas_name = val['emmas_name']
                                                let emmas_name_veriry = val['emmas_name_veriry']

                                                if (val['tx_status_error_1'] != '1') {
                                                    tx_status_error_1 = '<span class="tx-warning tx-center" style="color:Tomato;">' + 'ข้อมูลซ้ำในเอกสาร' + '</span>'
                                                    netprice_code = '<span class="tx-warning tx-center" style="color:Tomato;">' + val['netprice_code'] + '</span>' + '<br>' + '( ' + '<span class="tx-center">' + netprice_name + '</span>' + ' )'
                                                    emmas_code = '<span class="tx-warning tx-center" style="color:Tomato;">' + val['emmas_code'] + '</span>'
                                                    emmas_name = '<span class="tx-warning tx-center" style="color:Tomato;">' + val['emmas_name'] + '</span>'
                                                }

                                                if (val['event_name'] == 'CREATE') {

                                                    if (val['tx_status_code_netprice'] != '1') {
                                                        tx_status_code_netprice = '<span class="tx-danger tx-center">' + 'ไม่พบรหัสเทมเพลต' + '</span>'
                                                        netprice_code = '<span class="tx-danger tx-center">' + val['netprice_code'] + '</span>' + '<br>' + '[ ' + '<span class="tx-center">' + netprice_name + '</span>' + ' ]'
                                                    }
                                                    if (val['tx_status_code_emmas'] != '1') {
                                                        tx_status_code_emmas = '<span class="tx-danger tx-center">' + 'ไม่พบรหัสลูกค้า' + '</span>'
                                                        emmas_code = '<span class="tx-danger tx-center">' + val['emmas_code'] + '</span>'
                                                    }

                                                    if ($.trim(val['emmas_name']) != $.trim(val['emmas_name_veriry'])) {
                                                        text_status_compare = '<span class="tx-warning tx-center" style="color:Tomato;">' + 'ชื่อลูกค้าไม่ถูกต้อง' + '</span>'
                                                        emmas_name = val['emmas_name'] + '<br>' + '( ' + '<span class="tx-center tx-success">' + emmas_name_veriry + '</span>' + ' )'
                                                    }

                                                    if (val['text_status'] != 'false') {
                                                        text_status = '<span class="tx-center">' + tx_status_code_netprice + ' ' + tx_status_code_emmas + ' ' + tx_status_error_1 + '</span>' +
                                                            '<br>' + '<span class="tx-center">' + text_status_compare + '</span>'
                                                    } else {
                                                        netprice_code = '<span class="tx-center">' + val['netprice_code'] + '</span>' + '<br>' + '( ' + '<span class="tx-center">' + netprice_name + '</span>' + ' )'
                                                        emmas_code = '<span class="tx-center">' + val['emmas_code'] + '</span>'
                                                        text_status = '<span class="tx-center">' + 'OK' + '<br>' + text_status_compare + '</span>'
                                                    }

                                                } else if (val['event_name'] == 'DELETE') {

                                                    if (val['tx_status_code_emmas'] != '1') {
                                                        tx_status_code_emmas = '<span class="tx-danger tx-center">' + 'ไม่พบรหัสลูกค้า' + '</span>'
                                                        emmas_code = '<span class="tx-danger tx-center">' + val['emmas_code'] + '</span>'
                                                    }

                                                    if (val['record_status'] != '1') {
                                                        text_status = '<span class="tx-center">' + tx_status_code_netprice + ' ' + tx_status_code_emmas + ' ' + tx_status_error_1 + '</span>'

                                                    } else {
                                                        netprice_code = '<span class="tx-center">' + val['netprice_code'] + '</span>' // + '<br>' + '( ' + '<span class="tx-center">' + netprice_name + '</span>' + ' )'
                                                        emmas_code = '<span class="tx-center">' + val['emmas_code'] + '</span>'
                                                        text_status = '<span class="tx-center">' + 'OK' + '<br>' + text_status_compare + '</span>'
                                                    }

                                                }

                                                data_verify.push([
                                                    j,
                                                    record_status,
                                                    text_status,
                                                    emmas_code,
                                                    emmas_name,
                                                    netprice_code,
                                                    event_name
                                                ])

                                                j++

                                            });

                                            console.log('data_verify', data_verify)

                                            table_update_emmas_import = $('#tbl-update_emmas-import').DataTable({
                                                "data": data_verify,
                                                "dom": 'Bfrtip',
                                                "deferRender": true,
                                                "order": [[0, "desc"]],
                                                "ordering": false,
                                                "pageLength": 5,
                                                buttons: [
                                                    'copyHtml5',
                                                    {
                                                        extend: 'excelHtml5',
                                                        title: '',
                                                        filename: 'Import_TemplatePriceNet_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                                                    },
                                                ],
                                                "columnDefs": [{
                                                    "targets": 'no-sort',
                                                    "orderable": false,
                                                },
                                                {
                                                    "targets": [0],
                                                    "searchable": false,
                                                    "class": 'tx-center'

                                                },
                                                {
                                                    "targets": [1],
                                                    "class": 'tx-center',
                                                    "render": function (data, type, row, meta) {

                                                        return (data == '1' ? '<span class="badge badge-pill badge-success">OK</span>' : '<span class="badge badge-pill badge-danger">ERROR</span>');

                                                    }

                                                },
                                                {
                                                    "targets": [2],
                                                    "class": 'tx-center',
                                                    "searchable": false,
                                                },
                                                {
                                                    "targets": [3],
                                                    "searchable": false,
                                                    "class": 'tx-center',

                                                },
                                                {
                                                    "targets": [4],
                                                    "searchable": false,
                                                    "class": 'tx-center',

                                                },
                                                {
                                                    "targets": [5],
                                                    "searchable": false,
                                                    "class": 'tx-center',

                                                },
                                                {
                                                    "targets": [6],
                                                    "searchable": false,
                                                    "class": 'tx-center',

                                                }],
                                                "initComplete": function (settings, json) {

                                                    //$('#btn_update_prnetfile-data').removeClass('d-none');

                                                }
                                            });

                                            $('#emmas_all_information').html(j - 1);
                                            $('#emmas_success_information').html(success_information).css("color", "darkgreen");
                                            $('#emmas_wrong_information').html(wrong_information).css("color", "red");

                                            table_update_emmas_import.columns.adjust();

                                            $(".modal-body").LoadingOverlay("hide", true);

                                            if ($('#emmas_wrong_information').html() != '0') {

                                                toastr.warning('พบข้อมูลผิดพลาก กรุณาตรวจสอบ');

                                            } else {

                                                toastr.success('ข้อมูลสมบูรณ์');
                                                $.prnetfile_emmas_upload(uuid);
                                                $('#btn_update_emmas-data').removeClass('d-none');

                                            }

                                            //$.prnetfile_upload(uuid);

                                        })

                                    }

                                }

                            })

                        }

                    })

                } else {

                    toastr.error('ไม่พบข้อมูลในเอกสาร');

                    $('#import_update_emmas').prop('disabled', false);

                }



            }).catch(error => {

                $(".modal-body").LoadingOverlay("hide", true);
                toastr.error('Error writing document');
                $('#import_update_emmas').prop('disabled', false);

            });

        }

    });

}

$.prnetfile_emmas_upload = function (uuid) {

    $('#btn_update_emmas-data').on('click', function (e) {

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

                $('#btn_update_emmas-data').prop('disabled', true);

                fetch(url_prnetfile_import_upload_emmas + '?ref_id=' + uuid + '&updated_by=' + user_id).then(function (response) {
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

                            //$.prnettra_file();

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


$.prnetfile_emmas_import_V1 = async function () {

    $(document).on('change', '#import_prnetfile_emmas', function (evt) {

        evt.preventDefault();

        console.log(this.files[0])

        var path = $(this).val();
        var fileName = path.replace(/^.*\\/, "");
        $(this).next('.custom-file-label').html(fileName);

        if ($(this).val() !== '') {

            $("#import_prnetfile_emmas").prop('disabled', true);

            $(".modal-body").LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            let citem_import = [];

            let uuid = $.uuid();

            let i = 0;

            readXlsxFile(this.files[0], { dateFormat: 'YYYY/MM/DD_hh:mm:ss' }).then(async function (result) {

                console.log('readXlsxFile', result);

                $(".modal-body").LoadingOverlay("hide", true);

                let count_length = result.length - 2;

                if (result.length > 2) {

                    $('.prnetfile-emmas-import').removeClass('d-none')

                    await $.each(result, async function (key, val) {

                        if (i > 1) {

                            citem_import.push({

                                code: $.trim(val[0]),
                                lname: $.trim(val[1]),
                                remark: $.trim(val[2]),
                                procby: '',
                                named: '',
                                TYPE: '',
                                carbrand: '',
                                chrcode: '',
                                gmodel: '',
                                typeb: '',
                                created_by: user_id,
                                mode: $.trim(val[3]),
                                ref_id: uuid

                            });

                        }

                        i++

                    });

                    fetch(url_prnetfile_import_file + '?ref_id=' + uuid + '&mode=' + 'IMPORT' + '&created_by=' + user_id + '&count_trans=' + count_length).then(function (response) {
                        return response.json();
                    }).then(function (result_file) {

                        $(".modal-body").LoadingOverlay("hide", true);

                        if (result_file.status === 'Error') {

                            toastr.error('Oops! An Error Occurred');

                        } else {

                            $.ajax({
                                url: url_prnetfile_import_tra,
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                data: JSON.stringify(citem_import),
                                success: function (result_tra) {

                                    if (result_tra.status === 'Error') {

                                        toastr.error('Oops! An Error Occurred');

                                    } else {

                                        fetch(url_prnetfile_import_verify + '?ref_id=' + uuid).then(function (response) {
                                            return response.json();
                                        }).then(function (result_verify) {

                                            console.log('result_verify', result_verify)

                                            let data_verify = [];
                                            let j = 1;
                                            let all_information = 0;
                                            let wrong_information = 0;
                                            let success_information = 0;

                                            $.each(result_verify.data, function (key, val) {

                                                let text_status = ''
                                                let record_status = val['record_status'];
                                                let tx_status_code = ''
                                                let tx_status_name = ''
                                                let tx_status_error_1 = ''

                                                if (record_status == '1') {
                                                    success_information += 1;
                                                } else {
                                                    wrong_information += 1;
                                                }

                                                let code = val['code'];
                                                let lname = val['lname']
                                                let remark = val['remark'];

                                                if (val['tx_status_code'] != '1') {
                                                    tx_status_code = '<span class="tx-danger tx-center">' + 'รหัสซ้ำ' + '</span>'
                                                    code = '<span class="tx-danger tx-center">' + val['code'] + '</span>'
                                                }
                                                if (val['tx_status_name'] != '1') {
                                                    tx_status_name = '<span class="tx-warning tx-center">' + 'ชื่อซ้ำ' + '</span>'
                                                    lname = '<span class="tx-warning tx-center">' + val['lname'] + '</span>'
                                                }
                                                if (val['tx_status_error_1'] != '1') {
                                                    tx_status_error_1 = '<span class="tx-warning tx-center">' + 'ข้อมูลซ้ำในเอกสาร' + '</span>'
                                                    code = '<span class="tx-warning tx-center">' + val['code'] + '</span>'
                                                    lname = '<span class="tx-warning tx-center">' + val['lname'] + '</span>'
                                                    remark = '<span class="tx-warning tx-center">' + val['remark'] + '</span>'
                                                }
                                                if (val['record_status'] == '4') {
                                                    tx_status_code = '<span class="tx-danger tx-center">' + 'ไม่พบรหัสซ้ำ' + '</span>'
                                                }

                                                if (val['text_status'] != 'false') {
                                                    text_status = '<span class="tx-center">' + tx_status_code + ' ' + tx_status_name + ' ' + tx_status_error_1 + '</span>'
                                                } else {
                                                    code = '<span class="tx-center">' + val['code'] + '</span>'
                                                    lname = '<span class="tx-center">' + val['lname'] + '</span>'
                                                    remark = '<span class="tx-center">' + val['remark'] + '</span>'
                                                    text_status = '<span class="tx-center">' + 'OK' + '</span>'
                                                }

                                                data_verify.push([
                                                    j,
                                                    record_status,
                                                    text_status,
                                                    code,
                                                    lname,
                                                    remark
                                                ])

                                                j++

                                            });

                                            console.log('data_verify', data_verify)

                                            table_prnetfile_import = $('#tbl-prnetfile-import').DataTable({
                                                "data": data_verify,
                                                "dom": 'Bfrtip',
                                                "deferRender": true,
                                                "order": [[0, "desc"]],
                                                "ordering": false,
                                                "pageLength": 5,
                                                buttons: [
                                                    'copyHtml5',
                                                    {
                                                        extend: 'excelHtml5',
                                                        title: '',
                                                        filename: 'Import_TemplatePriceNet_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                                                    },
                                                ],
                                                "columnDefs": [{
                                                    "targets": 'no-sort',
                                                    "orderable": false,
                                                },
                                                {
                                                    "targets": [0],
                                                    "searchable": false,
                                                    "class": 'tx-center'

                                                },
                                                {
                                                    "targets": [1],
                                                    "class": 'tx-center',
                                                    "render": function (data, type, row, meta) {

                                                        return (data == '1' ? '<span class="badge badge-pill badge-success">OK</span>' : '<span class="badge badge-pill badge-danger">ERROR</span>');

                                                    }

                                                },
                                                {
                                                    "targets": [2],
                                                    "class": 'tx-center',
                                                    "searchable": false,
                                                },
                                                {
                                                    "targets": [3],
                                                    "searchable": false,
                                                    "class": 'tx-center',

                                                },
                                                {
                                                    "targets": [4],
                                                    "searchable": false,
                                                    "class": 'tx-center',

                                                },
                                                {
                                                    "targets": [5],
                                                    "searchable": false,
                                                    "class": 'tx-center',

                                                }],
                                                "initComplete": function (settings, json) {

                                                    //$('#btn_update_prnetfile-data').removeClass('d-none');

                                                }
                                            });

                                            $('#prnetfile_all_information').html(j - 1);
                                            $('#prnetfile_sprnetfile_uccess_information').html(success_information).css("color", "darkgreen");
                                            $('#prnetfile_wrong_information').html(wrong_information).css("color", "red");

                                            table_prnetfile_import.columns.adjust();

                                            $(".modal-body").LoadingOverlay("hide", true);

                                            if ($('#prnetfile_wrong_information').html() != '0') {

                                                toastr.warning('พบข้อมูลผิดพลาก กรุณาตรวจสอบ');

                                            } else {

                                                toastr.success('ข้อมูลสมบูรณ์');
                                                $.prnetfile_upload(uuid);
                                                $('#btn_update_prnetfile-data').removeClass('d-none');

                                            }

                                            //$.prnetfile_upload(uuid);

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


$.prnettra_list = async function () {

    let search_prnetfile = $('#search_prnetfile').html();

    $('#btn-item_import').removeClass('d-none');

    let url = new URL(url_prnettra_list);

    url.search = new URLSearchParams({

        ecode: $('#search_prnetfile').val(),

    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log(result.data);

        let i = result.length;

        var data_prnettra = [];

        $.each(result.data, function (key, val) {

            let data = JSON.stringify(val)

            data_prnettra.push([
                i,
                '<div class="tx-left-f">' + val['gcode'] + '/' + val['gname'] + '/' + val['gpartno'] + '/' + val['gbarcode'] + '</div>',
                val['Qty_A'],
                val['Qty_B'],
                val['gunit'],

                new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2
                }).format(val['avgsalecost'].toFixed(2)),
                new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2
                }).format(val['stmas_AvgSalecost'].toFixed(2)),
                new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2
                }).format(val['avgsalecost'].toFixed(2) - val['stmas_AvgSalecost'].toFixed(2)),

                '',
                new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2
                }).format(val['avgsalecost'] + ((val['avgsalecost'] * 5) / 100)),

                new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2
                }).format(val['NetPrice'].toFixed(2)),

                "<div class='d-flex flex-row justify-content-center'>" +
                "<button onclick='$.prnettra_view(" + data + ");' data-item='" + data + "' style='margin: .25rem .125rem; ' class='btn  btn-outline-primary btn-sm edit-item update_item' data-action='update'  id='update_item" + i + "' type='button'>Edit</button>" +
                "<button onclick='$.prnettra_delete(" + data + ");' data-item='" + data + "' style='margin: .25rem .125rem; ' class='btn btn-outline-danger btn-sm delete-item delete_item' data-action='delete' id='delete_item" + i + "' type='button'>Delete</button>" +
                "</div>",
                //'<div class="tx-left-f"><a href="javascript:void(0)"><span class="badge badge-danger"><i class="typcn typcn-minus"></i></span></a>' + '</div>',
                //'<div class="tx-left-f"><button class="btn btn-outline-success btn-icon btn-action btn-create" data-action="create" id="create_item" type="submit"><i class="typcn typcn-document-add"></i></button><button class="btn btn-outline-success btn-icon btn-action btn-create" data-action="create" id="create_item" type="submit"><i class="typcn typcn-document-add"></i></button>' + '</div>',
            ])

            i--;

        });

        tbl_net_list = $('#tbl-net_list').DataTable({
            "data": data_prnettra,
            "dom": 'Bifrtp',
            "deferRender": true,
            scrollX: true,
            scrollCollapse: true,
            "order": [[0, "desc"]],
            "ordering": false,
            "pageLength": 5,
            "bDestroy": true,
            autoWidth: true,
            "info": false,
            buttons: [
                'copyHtml5',
                {
                    extend: 'excelHtml5',
                    title: '',
                    filename: "TablePriceNet " + $('#search_prnetfile').val() + " ",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5, 6, 7, 10]
                    },
                },
            ],
            "columnDefs": [{
                "targets": 'no-sort',
                "orderable": false,
            },
            {
                "targets": [8],
                "searchable": false,
                "visible": false

            },
            {
                "targets": [9],
                "searchable": false,
                "visible": false

            },
            ],
            "initComplete": function (settings, json) {

                $('#tbl-net_list tbody tr').on('click', '.edit-item', function () {

                    //$('#tbl-net_list tbody tr').removeClass('bg-warning').css('opacity', '1')
                    //$(this).addClass('bg-warning').css('opacity', '0.7')
                    //$(this).css('background-color','#000')
                    $('#tbl-net_list tbody tr').removeClass('bg-warning')
                    $(this).parent().parent().parent().addClass('bg-warning')

                });

                $('#tbl-net_list tbody tr').on('click', '.delete-item', function () {

                    //$('#tbl-net_list tbody tr').removeClass('bg-warning').css('opacity', '1')
                    //$(this).addClass('bg-warning').css('opacity', '0.7')
                    //$(this).css('background-color','#000')
                    $('#tbl-net_list tbody tr').removeClass('bg-warning')
                    $(this).parent().parent().parent().addClass('bg-warning')

                });

                $('#search_itemmaster').select2({
                    width: 'resolve',
                    delay: 500,
                    dropdownAutoWidth: true,
                    minimumInputLength: 3,
                    minimumResultsForSearch: 10,
                    ajax: {
                        url: url_stmas_select2_search,
                        dataType: 'json',
                        data: function (params) {
                            var query = {
                                id: "rtrim(code)",
                                text: "CONCAT(RTRIM(code),' - ',RTRIM(CHRCODE),' - ',RTRIM(name),' / ',RTRIM(gbarcode),' / ',RTRIM(SPCODES))",
                                keywords: typeof params.term !== 'undefined' ? params.term : ' ',
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
                                        uom: item.UOM,
                                        avgsalecost: item.AvgSalecost,
                                        name: item.name
                                    }
                                })
                            };
                        },
                    },
                    escapeMarkup: function (markup) {
                        return markup;
                    },
                });

                $('#search_itemmaster').on('select2:select', async function (e) {

                    item_stams = e.params.data;

                    var data = e.params.data;
                    var avgsalecost = data.avgsalecost;
                    var uom = data.uom;
                    console.log('search_itemmaster', data);
                    $("#frm_item").parsley().reset();
                    $('#Qty_A').val('1');
                    $('#Qty_B').val('100');
                    $('#gunit').val(uom.trim());
                    $('#avgcost').html(data.avgsalecost);
                    $('#nowcost').html(data.avgsalecost);
                    $('#item_detail').html(data.text);
                    $('#suggested').html(parseFloat(avgsalecost) + ((avgsalecost * 5) / 100));
                    // $('#suggested').html(((avgsalecost * 5) / 100) + (avgsalecost) );

                    //$('#NetPrice').val('0.00');
                    $('#NetPrice').val(data.avgsalecost);

                    $("#NetPrice").attr({
                        "min": data.avgsalecost
                    });

                });

            }

        });

    });

    //}

}

$.prnettra_view = async function (citem) {

    console.log('citem', citem)

    var ref_id_update = JSON.stringify(citem)
    var gunit = citem['gunit'];

    $('.pril-btn-action').attr("data-action", "update");

    $('.pril-btn-action').attr("data-id", ref_id_update);

    $.clear_input_prnettra();

    $("#search_itemmaster option").remove();
    $('#search_itemmaster')
        .append($("<option>--- Select Search ---</option>")
            .attr("value", citem['gcode'])
            .text(citem['gcode'] + ' - ' + citem['gname'] + ' - ' + citem['gname'] + ' - ' + citem['gbarcode'] + ' - ' + citem['gpartno'])
            .attr('name', citem['gname']));
    $('#item_detail').html(citem['gcode'] + ' - ' + citem['gname'] + ' - ' + citem['gbarcode'] + ' - ' + citem['gpartno']);
    $('#frm_item').find('#search_itemmaster').val(citem['gcode']).data('text', citem['gname']).trigger('change').prop('disabled', true);
    $('#Qty_A').val(citem['Qty_A']);
    $('#Qty_B').val(citem['Qty_B']);
    $('#gunit').val(gunit.trim());
    $('#avgcost').html(citem['stmas_AvgSalecost']);
    $('#suggested').html(parseFloat(citem['stmas_AvgSalecost']) + ((parseFloat(citem['stmas_AvgSalecost']) * 5) / 100));
    $('#nowcost').html(citem['avgsalecost']);
    $('#NetPrice').val(citem['NetPrice']);
    $("#NetPrice").attr({
        "min": citem['NetPrice']
    });

};

$.prnettra_create = async function () {

    $('#frm_item').parsley().validate();

    if ($('#frm_item').parsley().isValid()) {

        $(".modal-body").LoadingOverlay("show", {
            image: '',
            custom: customElement
        });

        let add_data = {
            mode: 'CREATE',
            gcode: item_stams.id,
            gname: item_stams.name,
            Qty_A: $('#Qty_A').val(),
            Qty_B: $('#Qty_B').val(),
            NetPrice: $('#NetPrice').val(),
            gunit: $('#gunit').val(),
            //gunit: item_stams.uom,
            created_by: user_id,
            ecode: $('#search_prnetfile').val(),
            //ecode: urlParams.get('ecode'),
            //ref_id: ref_id_tra,
            ref_id: $.uuid(),

        };

        console.log('add_data', add_data)

        var params = [];
        for (const i in add_data) {
            params.push(i + "=" + encodeURIComponent(add_data[i]));
        }

        fetch(url_dis_prnettra_action, {
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

                    $.clear_input_prnettra();

                    $.clear_create_prnettra();

                }, 800);

            } else if (data.status === 'Not_Found_Gunit') {

                toastr.error('ไม่พบหน่วยนับ');

                $("#frm_item").find('#gunit').addClass('parsley-error')

                setTimeout(function () {

                    $(".modal-body").LoadingOverlay("hide", true);

                    //$('#frm_item').trigger('reset');
                    //$("#frm_item").parsley().reset();

                    //$.clear_input_prnettra();

                    //$.clear_create_prnettra();

                    //$("#search_itemmaster option").remove();
                    //$('#search_itemmaster')
                    //    .append($("<option>--- Select Search ---</option>"))

                }, 800);

            } else if (data.status === 'Duplicate') {

                toastr.error('รหัสสินค้าซ้ำ');

                setTimeout(function () {

                    $(".modal-body").LoadingOverlay("hide", true);

                    $('#frm_item').trigger('reset');
                    $("#frm_item").parsley().reset();
                    $.clear_input_prnettra();

                    $.clear_create_prnettra();
                    $("#search_itemmaster option").remove();
                    $('#search_itemmaster')
                        .append($("<option>--- Select Search ---</option>"))
                }, 800);

            } else {

                toastr.success('Save Successfully!', async function () {

                    $('#modal-frm_data').modal('hide');

                    setTimeout(function () {

                        $(".modal-body").LoadingOverlay("hide", true);

                        $.clear_input_prnettra();

                        $.clear_create_prnettra();

                        tbl_net_list.destroy();

                        $.prnettra_list();

                    }, 800);

                });
            }

        }).catch((error) => {

            toastr.error(error, 'Error writing document');

        });

        return false;

    }
};

$.prnettra_update = async function () {

    console.log($('.pril-btn-action').data('id'))

    //let up_citem = $('.pril-btn-action').data('id');
    let citem = $('.pril-btn-action').attr('data-id');

    let up_citem = JSON.parse(citem)

    console.log('youname', JSON.parse(citem))

    $("#NetPrice").attr({
        "min": $('#avgcost').html()
    });

    $('#frm_item').parsley().validate();

    if ($('#frm_item').parsley().isValid()) {

        //alert('submit update')

        let update_data = {
            mode: 'UPDATE',
            gcode: up_citem['gcode'],
            gname: up_citem['gname'],
            Qty_A: $('#Qty_A').val(),
            Qty_B: $('#Qty_B').val(),
            NetPrice: $('#NetPrice').val(),
            gunit: $('#gunit').val(),
            //gunit: citem['gunit'],
            created_by: user_id,
            updated_by: user_id,
            ecode: up_citem['ecode'],
            ref_id: $.uuid(),
        };

        console.log('update_data', update_data)

        var params = [];
        for (const i in update_data) {
            params.push(i + "=" + encodeURIComponent(update_data[i]));
        }

        fetch(url_dis_prnettra_action, {
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

                    $.clear_input_prnettra();

                    $.clear_create_prnettra();

                    $('.pril-btn-action').attr("data-action", "create");
                    $('#frm_item').find('#search_itemmaster').val('').prop('disabled', false);
                    $("#search_itemmaster option").remove();
                    $('#search_itemmaster')
                        .append($("<option>--- Select Search ---</option>"))

                }, 800);

            } else if (data.status === 'Not_Found_Gunit') {

                toastr.error('ไม่พบหน่วยนับ');

                setTimeout(function () {

                    $.clear_input_prnettra();

                    $.clear_create_prnettra();

                    $('.pril-btn-action').attr("data-action", "create");
                    $('#frm_item').find('#search_itemmaster').val('').prop('disabled', false);
                    $("#search_itemmaster option").remove();
                    $('#search_itemmaster')
                        .append($("<option>--- Select Search ---</option>"))

                }, 800);

            } else {

                toastr.success('Save Successfully!', async function () {

                    $('#modal-frm_data').modal('hide');

                    setTimeout(function () {

                        $(".modal-body").LoadingOverlay("hide", true);

                        $.clear_input_prnettra();

                        $.clear_create_prnettra();

                        $('.pril-btn-action').attr("data-action", "create");
                        $('#frm_item').find('#search_itemmaster').val('').prop('disabled', false);
                        $("#search_itemmaster option").remove();
                        $('#search_itemmaster')
                            .append($("<option>--- Select Search ---</option>"))


                        tbl_net_list.destroy();

                        $.prnettra_list();

                    }, 800);

                });
            }

        }).catch((error) => {

            toastr.error(error, 'Error writing document');

        });

        return false;

    }
};

$.prnettra_delete = async function (citem) {

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
                gcode: citem['gcode'],
                gname: citem['gname'],
                Qty_A: citem['Qty_A'],
                Qty_B: citem['Qty_B'],
                NetPrice: citem['NetPrice'],
                gunit: citem['gunit'],
                created_by: user_id,
                updated_by: user_id,
                ecode: citem['ecode'],
                ref_id: $.uuid(),

            };

            var params = [];
            for (const i in delete_data) {
                params.push(i + "=" + encodeURIComponent(delete_data[i]));
            }

            fetch(url_dis_prnettra_action, {
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

                        $.clear_input_prnettra();

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

                            tbl_net_list.destroy();

                            $.prnettra_list();

                            $.clear_input_prnettra();

                            $(".modal-body").LoadingOverlay("hide", true);

                            $('.pril-btn-action').attr("data-action", "create");

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

//$.prnettra_import_OLD = async function () {

//    $(document).on('change', '#customFile', function (evt) {

//        evt.preventDefault();

//        console.log(this.files[0])

//        var path = $(this).val();
//        var fileName = path.replace(/^.*\\/, "");
//        $(this).next('.custom-file-label').html(fileName);

//        if ($(this).val() !== '') {

//            $("#customFile").prop('disabled', true);

//            $(".modal-body").LoadingOverlay("show", {
//                image: '',
//                custom: customElement
//            });

//            let citem_import = [];

//            let uuid = $.uuid();

//            readXlsxFile(this.files[0], { dateFormat: 'YYYY/MM/DD_hh:mm:ss' }).then(async function (result) {

//                console.log('readXlsxFile', result);

//                if (result.length > 1) {
//                    /*
//                    $.LoadingOverlay("show", {
//                        image: '',
//                        custom: customElement
//                    });
//                    */
//                    let i = 0;

//                    await $.each(result, async function (key, val) {

//                        if (i > 0) {
//                            citem_import.push({
//                                session_id: uuid,
//                                ecode: $('#search_prnetfile').val(),
//                                gcode: $.trim(val[0]),
//                                gname: $.trim(val[1]),
//                                gunit: $.trim(val[2]),
//                                Qty_A: $.trim(val[3]),
//                                Qty_B: $.trim(val[4]),
//                                NetPrice: $.trim(val[5]),
//                                userid: user_id,
//                                ref_id: uuid
//                            });
//                        }
//                        i++

//                    });

//                    await $.ajax({
//                        url: url_prnettra_import_verify,
//                        type: 'POST',
//                        contentType: "application/json; charset=utf-8",
//                        dataType: "json",
//                        // data: JSON.stringify(citem_data),
//                        data: JSON.stringify(citem_import),
//                        success: function (result) {

//                            let data_import = [];
//                            let i = 1;
//                            let all_information = 0;
//                            let wrong_information = 0;
//                            let success_information = 0;

//                            $.each(result.data, function (key, val) {

//                                //let verify = val['chk_gcode'] + val['chk_gname'] + val['chk_gunit'];
//                                let text_status = val['text_status'];
//                                let record_status = val['record_status'];

//                                if (record_status == '1') {
//                                    success_information += 1;
//                                } else {
//                                    wrong_information += 1;
//                                }

//                                let gcode = val['gcode'];
//                                let gname = val['gname']

//                                let gunit = val['gunit'];
//                                let Qty_A = val['Qty_A'];
//                                let Qty_B = val['Qty_B'];
//                                let avgcost = new Intl.NumberFormat('en-US', {
//                                    minimumFractionDigits: 2
//                                }).format(val['avgcost'].toFixed(2));
//                                let NetPrice = new Intl.NumberFormat('en-US', {
//                                    minimumFractionDigits: 2
//                                }).format(val['NetPrice'].toFixed(2));

//                                if (record_status == '2') {
//                                    gcode = '<span style="color: DarkTomato;font-weight: bold;text-align: center;">' + val['gcode'] + '</span>'
//                                    gname = '<span style="color: DarkTomato;font-weight: bold;text-align: center;">' + val['gname'] + '</span>'
//                                    gunit = '<span style="color: DarkTomato;font-weight: bold;text-align: center;">' + val['gunit'] + '</span>'
//                                    Qty_A = '<span style="color: DarkTomato;font-weight: bold;text-align: center;">' + val['Qty_A'] + '</span>'
//                                    Qty_B = '<span style="color: DarkTomato;font-weight: bold;text-align: center;">' + val['Qty_B'] + '</span>'
//                                    avgcost = '<span style="color: DarkTomato;font-weight: bold;text-align: center;">' + val['avgcost'] + '</span>'
//                                    NetPrice = '<span style="color: DarkTomato;font-weight: bold;text-align: center;">' + val['NetPrice'] + '</span>'
//                                } else if (record_status == '3') {
//                                    gcode = '<span style="color: red;font-weight: bold;text-align: center;">' + val['gcode'] + '</span>'
//                                    gname = '<span style="color: red;font-weight: bold;text-align: center;">' + val['gname'] + '</span>'
//                                } else if (record_status == '4') {
//                                    gcode = '<span style="color: red;font-weight: bold;text-align: center;">' + val['gcode'] + '</span>'
//                                    gname = '<span style="color: red;font-weight: bold;text-align: center;">' + val['gname'] + '</span>'
//                                    gunit = '<span style="color: red;font-weight: bold;text-align: center;">' + val['gunit'] + '</span>'
//                                    Qty_A = '<span style="color: red;font-weight: bold;text-align: center;">' + val['Qty_A'] + '</span>'
//                                    Qty_B = '<span style="color: red;font-weight: bold;text-align: center;">' + val['Qty_B'] + '</span>'
//                                    avgcost = '<span style="color: red;font-weight: bold;text-align: center;">' + val['avgcost'] + '</span>'
//                                    NetPrice = '<span style="color: red;font-weight: bold;text-align: center;">' + val['NetPrice'] + '</span>'
//                                } else if (record_status == '5') {
//                                    NetPrice = '<span style="color: red;font-weight: bold;text-align: center;">' + val['NetPrice'] + '</span>'
//                                } else if (record_status == '6') {
//                                    gunit = '<span style="color: red;font-weight: bold;text-align: center;">' + val['gunit'] + '</span>'
//                                }

//                                if (val['gname'] == null) { gname = ''; } else { gname = val['gname']; }

//                                data_import.push([
//                                    i,
//                                    text_status,
//                                    gcode,
//                                    gname,
//                                    gunit,
//                                    Qty_A,
//                                    Qty_B,
//                                    //val['avgcost'],
//                                    avgcost,
//                                    NetPrice,
//                                    text_status + val['chk_duplicate'],
//                                    val['session_id']
//                                ])

//                                i++

//                            });

//                            console.log('data_import', data_import)
//                            table_prnettra = $('#tbl-prnettra-import').DataTable({
//                                "data": data_import,
//                                "dom": 'Bfrtip',
//                                "deferRender": true,
//                                "order": [[0, "desc"]],
//                                "ordering": false,
//                                "pageLength": 5,
//                                //dom: 'Brti',
//                                buttons: [
//                                    'copyHtml5',
//                                    {
//                                        extend: 'excelHtml5',
//                                        title: '',
//                                        filename: 'TablePriceNet',
//                                    },
//                                ],
//                                "columnDefs": [{
//                                    "targets": 'no-sort',
//                                    "orderable": false,
//                                },
//                                {
//                                    "targets": [0],
//                                    "searchable": false,
//                                    "visible": false

//                                },
//                                {
//                                    "targets": [1],
//                                    "render": function (data, type, row, meta) {

//                                        return (data === 'OK' ? '<span class="badge badge-pill badge-success">OK</span>' : '<span class="badge badge-pill badge-danger">ERROR</span>');

//                                    }

//                                },
//                                {
//                                    "targets": [7],
//                                    "title": "AVGS COST",
//                                    "searchable": false,
//                                },
//                                {
//                                    "targets": [10],
//                                    "searchable": false,
//                                    "visible": false

//                                }],
//                                "initComplete": function (settings, json) {

//                                    $('.tbl-prnettra-import').removeClass('d-none');

//                                }
//                            });

//                            $('#all_information').html(i - 1);
//                            $('#success_information').html(success_information).css("color", "darkgreen");
//                            $('#wrong_information').html(wrong_information).css("color", "red");

//                            table_prnettra.columns.adjust();

//                            $(".modal-body").LoadingOverlay("hide", true);

//                            if ($('#wrong_information').html() != '0') {

//                                Swal.fire({
//                                    icon: 'error',
//                                    title: 'ผิดพลาด',
//                                    text: 'มีข้อมูลผิดพลาด ไม่สามารถสร้างรายการได้',
//                                })

//                                toastr.warning('กรุณาตรวจสอบข้อมูล');

//                            } else {

//                                $('#btn_update-data').show();

//                                $.prnettra_import_action(uuid);

//                            }

//                        }

//                    });
//                }

//                console.log('citem_import', citem_import);
//                $(".modal-body").LoadingOverlay("hide", true);
//            });

//        }

//    });

//}

//$.prnettra_import_action_OLD  = function (uuid) {

//    $('#btn_update-data').on('click', function (e) {

//        e.preventDefault();

//        Swal.fire({
//            title: 'คุณแน่ใจหรือไม่?',
//            text: "ที่จะทำการเพิ่มรายการสินค้า",
//            icon: 'warning',
//            showDenyButton: true,
//            showCancelButton: true,
//            confirmButtonColor: '#3085d6',
//            cancelButtonColor: '#d33',
//            confirmButtonText: 'ใช่ฉันแน่',
//            denyButtonText: `ยกเลิก`,
//        }).then((result) => {

//            $(".modal-body").LoadingOverlay("show", {
//                image: '',
//                custom: customElement
//            });

//            if (result.isConfirmed) {

//                fetch(url_prnettra_import_create + '?ref_id=' + uuid).then(function (response) {
//                    return response.json();
//                }).then(function (result) {

//                    if (result.status === 'Error') {

//                        $(".modal-body").LoadingOverlay("hide", true);
//                        toastr.error('Oops! An Error Occurred');

//                    } else {

//                        $('#btn_update-data').prop('disabled', true);

//                        toastr.success('Save Successfully!', async function () {

//                            $('#modal-frm_data').modal('hide');

//                            $(".modal-body").LoadingOverlay("hide", true);

//                            tbl_net_list.destroy();

//                            $.prnettra_list();

//                            //await setTimeout(function () {
//                            //    location.reload();
//                            //    $.LoadingOverlay("hide");
//                            //}, 900);

//                        }, 300);

//                    }

//                }).catch(error => {

//                    $(".modal-body").LoadingOverlay("hide", true);
//                    toastr.error('Error, Please contact administrator.');

//                });

//            } else if (result.isDenied) {

//                setTimeout(function () {
//                    $(".modal-body").LoadingOverlay("hide", true);
//                }, 900);

//            } else {

//                $(".modal-body").LoadingOverlay("hide", true);

//            }

//        })

//        $(".modal-body").LoadingOverlay("hide", true);

//    });

//};


$.prnettra_import = async function () {

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

                                session_id: uuid,
                                ecode: $('#search_prnetfile').val(),
                                gcode: $.trim(val[0]),
                                gname: $.trim(val[1]),
                                gunit: $.trim(val[2]),
                                Qty_A: $.trim(val[3]),
                                Qty_B: $.trim(val[4]),
                                NetPrice: $.trim(val[5]),
                                mode: $.trim(val[6]),
                                userid: user_id,
                                ref_id: uuid

                            });

                        }

                        i++

                    });

                    fetch(url_prnettra_import_file + '?ref_id=' + uuid + '&mode=' + 'IMPORT' + '&created_by=' + user_id + '&count_trans=' + count_length).then(function (response) {
                        return response.json();
                    }).then(function (result_file) {

                        if (result_file.status === 'Error') {

                            $(".modal-body").LoadingOverlay("hide", true);

                            toastr.error('Oops! An Error Occurred');

                        } else {

                            $.ajax({
                                url: url_prnettra_import_tra,
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                data: JSON.stringify(citem_import),
                                success: function (result_tra) {

                                    if (result_tra.status === 'Error') {

                                        $(".modal-body").LoadingOverlay("hide", true);

                                        toastr.error('Oops! An Error Occurred');

                                    } else {

                                        fetch(url_prnettra_import_verify + '?ref_id=' + uuid).then(function (response) {
                                            return response.json();
                                        }).then(function (result_verify) {

                                            console.log('result_verify', result_verify)

                                            let data_verify = [];
                                            let j = 1;
                                            let all_information = 0;
                                            let wrong_information = 0;
                                            let success_information = 0;

                                            $.each(result_verify.data, function (key, val) {

                                                let text_status = '';
                                                let record_status = val['record_status'];

                                                if (record_status == '1') {
                                                    success_information += 1;
                                                } else {
                                                    wrong_information += 1;
                                                }

                                                let created_by = val['created_by']
                                                let created_date = val['created_date']
                                                let event_status = val['event_status']
                                                let ref_id = val['ref_id']
                                                let updated_by = val['updated_by']
                                                let updated_date = val['updated_date']

                                                let chk_duplicate = ''
                                                let event_name = ''
                                                if (val['event_name'] == 'CREATE') {
                                                    event_name = '<span class="tx-success tx-center">' + val['event_name'] + '</span>'
                                                } else if (val['event_name'] == 'UPDATE') {
                                                    event_name = '<span class="tx-primary tx-center">' + val['event_name'] + '</span>'
                                                } else if (val['event_name'] == 'DELETE') {
                                                    event_name = '<span class="tx-danger tx-center">' + val['event_name'] + '</span>'
                                                } else {
                                                    event_name = '<span class="tx-dark tx-center">' + 'ERROR' + '</span>'
                                                }

                                                let gcode = val['gcode'];
                                                let gname = val['gname']

                                                let gunit = val['gunit'];
                                                let Qty_A = val['Qty_A'];
                                                let Qty_B = val['Qty_B'];
                                                let avgcost = new Intl.NumberFormat('en-US', {
                                                    minimumFractionDigits: 2
                                                }).format(val['avgcost'].toFixed(2));
                                                let NetPrice = new Intl.NumberFormat('en-US', {
                                                    minimumFractionDigits: 2
                                                }).format(val['NetPrice'].toFixed(2));

                                                if (val['event_name'] == 'CREATE') {
                                                    chk_duplicate = val['chk_duplicate']
                                                    if (record_status == '2') {
                                                        text_status = '<span style="color: red; font-weight: bold;text-align: center;">ข้อมูลซ้ำในเอกสาร</span>'
                                                        gcode = '<span style="color: DarkTomato;font-weight: bold;text-align: center;">' + val['gcode'] + '</span>'
                                                        gname = '<span style="color: DarkTomato;font-weight: bold;text-align: center;">' + val['gname'] + '</span>'
                                                        gunit = '<span style="color: DarkTomato;font-weight: bold;text-align: center;">' + val['gunit'] + '</span>'
                                                        Qty_A = '<span style="color: DarkTomato;font-weight: bold;text-align: center;">' + val['Qty_A'] + '</span>'
                                                        Qty_B = '<span style="color: DarkTomato;font-weight: bold;text-align: center;">' + val['Qty_B'] + '</span>'
                                                        avgcost = '<span style="color: DarkTomato;font-weight: bold;text-align: center;">' + val['avgcost'] + '</span>'
                                                        NetPrice = '<span style="color: DarkTomato;font-weight: bold;text-align: center;">' + val['NetPrice'] + '</span>'
                                                    } else if (record_status == '3') {
                                                        text_status = '<span style="color: red; font-weight: bold;text-align: center;">ไม่พบรายการสินค้า</span>'
                                                        gcode = '<span style="color: red;font-weight: bold;text-align: center;">' + val['gcode'] + '</span>'
                                                        gname = '<span style="color: red;font-weight: bold;text-align: center;">' + val['gname'] + '</span>'
                                                    } else if (record_status == '4') {
                                                        text_status = '<span style="color: red; font-weight: bold;text-align: center;">ข้อมูลซ้ำในระบบ</span>'
                                                        gcode = '<span style="color: red;font-weight: bold;text-align: center;">' + val['gcode'] + '</span>'
                                                        gname = '<span style="color: red;font-weight: bold;text-align: center;">' + val['gname'] + '</span>'
                                                        gunit = '<span style="color: red;font-weight: bold;text-align: center;">' + val['gunit'] + '</span>'
                                                        Qty_A = '<span style="color: red;font-weight: bold;text-align: center;">' + val['Qty_A'] + '</span>'
                                                        Qty_B = '<span style="color: red;font-weight: bold;text-align: center;">' + val['Qty_B'] + '</span>'
                                                        avgcost = '<span style="color: red;font-weight: bold;text-align: center;">' + val['avgcost'] + '</span>'
                                                        NetPrice = '<span style="color: red;font-weight: bold;text-align: center;">' + val['NetPrice'] + '</span>'
                                                    } else if (record_status == '5') {
                                                        text_status = '<span style="color: red; font-weight: bold;text-align: center;">Net_Price ต่ำกว่าเกณฑ์</span>'
                                                        NetPrice = '<span style="color: red;font-weight: bold;text-align: center;">' + val['NetPrice'] + '</span>'
                                                    } else if (record_status == '6') {
                                                        text_status = '<span style="color: red; font-weight: bold;text-align: center;">หน่วยสินค้าผิด</span>'
                                                        gunit = '<span style="color: red;font-weight: bold;text-align: center;">' + val['gunit'] + '</span>'
                                                    } else if (record_status == '1') {
                                                        text_status = '<span style="color: DarkGreen; font-weight: bold;text-align: center;">OK</span>'
                                                    }

                                                } else if (val['event_name'] == 'DELETE') {
                                                    chk_duplicate = ''
                                                    if (record_status == '7') {
                                                        text_status = '<span style="color: red; font-weight: bold;text-align: center;">ไม่พบรายการตาราง</span>'
                                                        //gunit = '<span style="color: red;font-weight: bold;text-align: center;">' + val['gunit'] + '</span>'
                                                    } else if (record_status == '1') {
                                                        text_status = '<span style="color: DarkGreen; font-weight: bold;text-align: center;">OK</span>'
                                                    }

                                                }

                                                if (val['gname'] == null) { gname = ''; } else { gname = val['gname']; }

                                                data_verify.push([
                                                    j,
                                                    record_status,//text_status,
                                                    gcode,
                                                    gname,
                                                    gunit,
                                                    Qty_A,
                                                    Qty_B,
                                                    //val['avgcost'],
                                                    avgcost,
                                                    NetPrice,
                                                    text_status + chk_duplicate,
                                                    event_name
                                                ])

                                                j++

                                            });

                                            console.log('data_verify', data_verify)

                                            table_prnettra = $('#tbl-prnettra-import').DataTable({
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

                                                },
                                                {
                                                    "targets": [7],
                                                    "title": "AVGS COST",
                                                    "searchable": false,
                                                },
                                                {
                                                    "targets": [10],
                                                    "searchable": false
                                                }],
                                                "initComplete": function (settings, json) {
                                                    $(".modal-body").LoadingOverlay("hide", true);
                                                    $('.tbl-prnettra-import').removeClass('d-none');

                                                }
                                            });

                                            $('#all_information').html(i - 2);
                                            $('#success_information').html(success_information).css("color", "darkgreen");
                                            $('#wrong_information').html(wrong_information).css("color", "red");

                                            table_prnettra.columns.adjust();

                                            // $(".modal-body").LoadingOverlay("hide", true);

                                            if ($('#wrong_information').html() != '0') {

                                                toastr.warning('พบข้อมูลผิดพลาก กรุณาตรวจสอบ');

                                            } else {

                                                toastr.success('ข้อมูลสมบูรณ์');

                                                $('#btn_update-data').show();

                                                $.prnettra_upload(uuid);

                                            }

                                            //$.prnetfile_upload(uuid);

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

$.prnettra_upload = function (uuid) {

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

                fetch(url_prnettra_import_upload + '?ref_id=' + uuid + '&updated_by=' + user_id).then(function (response) {
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
        //code: urlParams.get('ecode'),
        code: $('#search_prnetfile').val(),
        mode: 'netprice',
    });

    fetch(url_emmas).then(function (response) {
        return response.json();
    }).then(function (result) {

        //console.log(result.data);

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
                //'<div class="tx-left-f"><a href="javascript:void(0)"><span class="badge badge-danger"><i class="typcn typcn-minus"></i></span></a>' + '</div>',
            ])

            i--;

        });

        console.log('data_emmas', data_emmas)

        table_emmas = $('#tbl-emmas_list').DataTable({
            "data": data_emmas,
            "dom": 'ifrtp',
            "bDestroy": true,
            "deferRender": true,
            "order": [[0, "desc"]],
            "ordering": false,
            "pageLength": 5,
            "columnDefs": [{
                "targets": 'no-sort',
                "orderable": false,
            }],
            "initComplete": function (settings, json) {

            }
        });

    });


    //}



}


$.clear_create_prnettra = async function () {

    $('#frm_item').find('#gunit').val('')
    $('#frm_item').find('#avgcost').html('0.00')
    $('#frm_item').find('#nowcost').html('0.00')
    $('#frm_item').find('#difference').html('0%')
    $('#frm_item').find('#vat').html('')
    $('#frm_item').find('#nowcost').html('0.00')
    $('#frm_item').find('#suggested').html('0.00')
    $('#item_detail').html('');
};

$.clear_input_prnettra = async function () {

    $('#frm_item').trigger('reset');
    $('#frm_item').find('input').val('').prop('disabled', false);
    $("#frm_item").parsley().reset();
    $("#search_itemmaster option").remove();
    $('#search_itemmaster')
        .append($("<option>--- Select Search ---</option>")).prop('disabled', false);
    $('#item_detail').html('');
    //$('#frm_item').find('#search_itemmaster').val('').prop('disabled', false);
};

$.clear_input_prnetfile = async function () {

    $('#frm_data').trigger('reset');
    $('#frm_data').find('input').val('').prop('disabled', false);
    $("#frm_data").parsley().reset();
    $('#item_detail').html('');

};


$(document).ready(async function () {

    await $.init();

});