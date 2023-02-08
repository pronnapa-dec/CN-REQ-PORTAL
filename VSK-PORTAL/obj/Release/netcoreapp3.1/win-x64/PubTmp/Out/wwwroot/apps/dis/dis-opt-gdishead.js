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
const url_gdishead_select2_search = url_api + "/v1/gdishead_select2_search";
const url_prnettra_list = url_api + "/v1/prnettra_list";
const url_ediscount_list = url_api + "/v1/dis_ediscount_list";
const url_emmas_List = url_api + "/v1/dis_emmas_List";
const url_prnetfile_list = url_api + "/v1/dis_prnetfile_list";
const url_prnettra_import_verify = url_api + "/v1/prnettra_import_verify";

let table_prnetfile, table_prnettra, username, tbl_frm_gdishead;

let objProfile = JSON.parse(localStorage.getItem('objProfile'));
console.log("objProfile", objProfile);

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        console.log(user);

        var full_mail = user.email;
        username = full_mail.replace("@vskautoparts.com", "");

        $.init = async function () {

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
                },
                escapeMarkup: function (markup) {
                    return markup;
                },
            })

            $('#search_gdishead').on('select2:select', async function (e) {

                var data = e.params.data;
                console.log(data);

                window.location = './dis/gdis?ecode=' + data.id + '&lname=' + data.text;

            });

            if (urlParams.get('ecode') != null) {

                console.log(urlParams.get('lname'))

                $('#btn-item_import').removeClass('d-none');

                $('#tiltle-table').html('รายละเอียดตารางส่วนลด : ' + urlParams.get('lname'));

                let url = new URL(url_ediscount_list);

                url.search = new URLSearchParams({
                    mode: 'list',
                    ecode: urlParams.get('ecode'),
                });

                fetch(url).then(function (response) {
                    return response.json();
                }).then(function (result) {

                    console.log('result', result.data);

                    let i = result.length;

                    var data = [];

                    $.each(result.data, function (key, val) {
                        data.push([
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
                            '<div class="tx-left-f"><a href="javascript:void(0)"><span class="badge badge-danger"><i class="typcn typcn-minus"></i></span></a>' + '</div>',
                        ])

                        i--;
                    });

                    $('#tbl-ediscount_list').DataTable({
                        "data": data,
                        "dom": 'ifrtp',
                        deferRender: true,
                        scrollX: true,
                        scrollCollapse: true,
                        autoWidth: true,
                        "order": [[0, "desc"]],
                        "ordering": false,
                        "pageLength": 5,
                        "columnDefs": [{
                            "targets": 'no-sort',
                            "orderable": false,
                        },{
                            "width": "100px",
                            "targets": 2
                        }],
                        "initComplete": function (settings, json) {



                        }
                    });

                });

            }

            let url_emmas = new URL(url_emmas_List);

            url_emmas.search = new URLSearchParams({
                code: urlParams.get('ecode'),
                mode: 'egdis',
            });

            fetch(url_emmas).then(function (response) {
                return response.json();
            }).then(function (result) {

                console.log(result.data);

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

                console.log('data_emmas', data_emmas)

                $('#tbl-emmas_list').DataTable({
                    "data": data_emmas,
                    "dom": 'ifrtp',
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

            $('#modal-ediscount').on('shown.bs.modal', async function () {

                //await $.prnetfile_list();
                await setTimeout(function () {
                    $.LoadingOverlay("hide");
                }, 300);

            })

            $('#modal-ediscount').on('hidden.bs.modal', async function () {

                $.LoadingOverlay("show");
                //table_prnetfile.destroy();
                await setTimeout(function () {
                    $.LoadingOverlay("hide");
                }, 300);

            })

            $('#modal-ediscount_import').off('shown.bs.modal').on('shown.bs.modal', async function () {

                $('#modal-prnettra_import').find('.modal-title').html('ตารางส่วนลด : ' + urlParams.get('lname'));

                //await $.prnettra_import();
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

        };


        $(document).ready(async function () {

            await $.init();

        });


    } else {

        window.location.assign('./login');

    }

});