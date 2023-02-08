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
const url_prnettra_list = url_api + "/v1/prnettra_list";
const url_emmas_List = url_api + "/v1/dis_emmas_List";
const url_prnetfile_list = url_api + "/v1/dis_prnetfile_list";
const url_prnettra_import_verify = url_api + "/v1/prnettra_import_verify";

let table_prnetfile, table_prnettra, username;

let objProfile = JSON.parse(localStorage.getItem('objProfile'));
console.log("objProfile", objProfile);

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        console.log(user);

        var full_mail = user.email;
        username = full_mail.replace("@vskautoparts.com", "");

        $.init = async function () {

            // Start Icon List //
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

            $('#search_prnetfile').on('select2:select', async function (e) {

                var data = e.params.data;
                console.log(data);

                window.location = './dis/netprice?ecode=' + data.id + '&lname=' + data.text;

            });

            if (urlParams.get('ecode') != null) {

                console.log(urlParams.get('lname'))

                $('#btn-item_import').removeClass('d-none');

                $('#tiltle-table').html('รายละเอียดตารางราคา NET : ' + urlParams.get('lname'))

                let url = new URL(url_prnettra_list);

                url.search = new URLSearchParams({
                    ecode: urlParams.get('ecode'),
                });

                fetch(url).then(function (response) {
                    return response.json();
                }).then(function (result) {

                    console.log(result.data);

                    let i = result.length;

                    var data = [];

                    $.each(result.data, function (key, val) {

                        data.push([
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

                            '<div class="tx-left-f"><a href="javascript:void(0)"><span class="badge badge-danger"><i class="typcn typcn-minus"></i></span></a>' + '</div>',
                        ])

                        i--;

                    });

                    $('#tbl-net_list').DataTable({
                        "data": data,
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
                                                    UOM: item.UOM,
                                                    avgcost: item.avgcost
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

                                var data = e.params.data;
                                console.log('search_itemmaster', data);

                                $('#gunit').html(data.UOM);
                                $('#avgcost').html(data.avgcost);
                                $('#nowcost').html(data.avgcost);


                            });

                        }
                    });

                });

                let url_emmas = new URL(url_emmas_List);

                url_emmas.search = new URLSearchParams({
                    code: urlParams.get('ecode'),
                    mode: 'netprice',
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

            }

            $('#modal-prnetfile').on('shown.bs.modal', async function () {

                await $.prnetfile_list();
                await setTimeout(function () {
                    $.LoadingOverlay("hide");
                }, 300);

            })

            $('#modal-prnetfile').on('hidden.bs.modal', async function () {

                $.LoadingOverlay("show");
                table_prnetfile.destroy();
                await setTimeout(function () {
                    $.LoadingOverlay("hide");
                }, 300);

            })

            $('#modal-prnettra_import').off('shown.bs.modal').on('shown.bs.modal', async function () {

                $('#modal-prnettra_import').find('.modal-title').html('ตารางกำหนดราคาสินค้า NET : ' + urlParams.get('lname'));



                await $.prnettra_import();
                await setTimeout(function () {
                    $.LoadingOverlay("hide");
                }, 300);

            })

            $('#modal-prnettra_import').off('hidden.bs.modal').on('hidden.bs.modal', async function () {

                $.LoadingOverlay("show");

                await setTimeout(function () {
                    location.reload();
                    $.LoadingOverlay("hide");
                }, 100);

            })

        };

        $.prnettra_import = async function () {

            $(document).on('change', '#customFile', function (evt) {

                evt.preventDefault();

                console.log(this.files[0])

                if ($(this).val() !== '') {

                    let citem_import = [];

                    let uuid = $.uuid();

                    readXlsxFile(this.files[0], { dateFormat: 'YYYY/MM/DD_hh:mm:ss' }).then(async function (result) {

                        console.log('readXlsxFile', result);

                        if (result.length > 1) {
                            /*
                            $.LoadingOverlay("show", {
                                image: '',
                                custom: customElement
                            });
                            */
                            let i = 0;

                            await $.each(result, async function (key, val) {

                                if (i > 0) {
                                    citem_import.push({
                                        session_id: uuid,
                                        ecode: urlParams.get('ecode'),
                                        gcode: $.trim(val[0]),
                                        gname: $.trim(val[1]),
                                        gunit: $.trim(val[2]),
                                        Qty_A: $.trim(val[3]),
                                        Qty_B: $.trim(val[4]),
                                        NetPrice: $.trim(val[5]),
                                        userid: username
                                    });
                                }
                                i++

                            });

                            await $.ajax({
                                url: url_prnettra_import_verify,
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                // data: JSON.stringify(citem_data),
                                data: JSON.stringify(citem_import),
                                success: function (result) {

                                    let data_import = [];
                                    let i = 1;

                                    $.each(result.data, function (key, val) {

                                        let verify = val['chk_gcode'] + val['chk_gname'] + val['chk_gunit'];

                                        data_import.push([
                                            i,
                                            verify,
                                            val['gcode'],
                                            val['gname'],
                                            val['gunit'],
                                            val['Qty_A'],
                                            val['Qty_B'],
                                            new Intl.NumberFormat('en-US', {
                                                minimumFractionDigits: 2
                                            }).format(val['avgcost'].toFixed(2)),
                                            new Intl.NumberFormat('en-US', {
                                                minimumFractionDigits: 2
                                            }).format(val['NetPrice'].toFixed(2)),
                                            verify + val['chk_duplicate'],
                                            val['session_id']
                                        ])

                                        i++;

                                    });


                                    table_prnettra = $('#tbl-prnettra-import').DataTable({
                                        "data": data_import,
                                        "dom": 'ifrtp',
                                        "deferRender": true,
                                        "order": [[0, "desc"]],
                                        "ordering": false,
                                        "pageLength": 5,
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

                                                return (data === '' ? '<span class="badge badge-pill badge-success">OK</span>' : '<span class="badge badge-pill badge-danger">ERROR</span>');

                                            }

                                        },
                                        {
                                            "targets": [10],
                                            "searchable": false,
                                            "visible": false

                                        }],
                                        "initComplete": function (settings, json) {

                                            $('.tbl-prnettra-import').removeClass('d-none');

                                        }
                                    });

                                    table_prnettra.columns.adjust();
                                }
                            });
                        }

                        console.log('citem_import', citem_import);

                    });

                }

            });

        }

        $.prnetfile_list = async function () {

            $.LoadingOverlay("show");

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

                    data_prnetfile.push([
                        i,
                        val['prnetfile_code'],
                        val['prnetfile_lname'],
                        val['prnetfile_remark'],
                        val['prnetfile_procdate'],
                        val['prnetfile_userid'],
                        '<div class="tx-left-f"><a href="javascript:void(0)"><span class="badge badge-danger"><i class="typcn typcn-minus"></i></span></a>' + '</div>',
                    ])

                    i--;

                });

                console.log('data_prnetfile', data_prnetfile)

                table_prnetfile = $('#tbl-prnetfile-list').DataTable({
                    "data": data_prnetfile,
                    "dom": 'ifrtp',
                    //autoWidth : true,
                    "deferRender": true,
                    "order": [[0, "desc"]],
                    "ordering": false,
                    "pageLength": 5,
                    "columnDefs": [{
                        "targets": 'no-sort',
                        "orderable": false,
                    },
                    {
                        "targets": [4],
                        "searchable": false,
                        "render": function (data, type, row, meta) {
                            return (data != '0001-01-01T00:00:00' ? data : '-');
                        }
                    }],
                    "initComplete": function (settings, json) {

                    }
                });

                table_prnetfile.columns.adjust();

            });

        }

        $(document).ready(async function () {

            await $.init();

        });


    } else {

        window.location.assign('./login');

    }

});