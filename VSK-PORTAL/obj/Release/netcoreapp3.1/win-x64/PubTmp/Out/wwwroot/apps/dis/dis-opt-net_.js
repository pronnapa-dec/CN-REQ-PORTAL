'use strict';

let fs = firebase.firestore();

const url_api = "http://localhost:49705";
const url_prnetfile_select2_search = url_api + "/v1/prnetfile_select2_search";
const url_prnettra_list = url_api + "/v1/prnettra_list";


//let oTable = $('#tbl-net_list').DataTable({ "order": [[0, "desc"]], "pageLength": 50 });


firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        console.log(user);

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

                //$('.prnettra_list').remove();

                let url = new URL(url_prnettra_list);

                url.search = new URLSearchParams({
                    ecode: data.id,
                });

                fetch(url).then(function (response) {
                    return response.json();
                }).then(function (result) {

                    console.log(result.data);

                    let i = result.length;

                    $.each(result.data, function (key, val) {


                        $('.prnettra_list').append(
                            '<tr>' +
                            '<td>' + i + '</td>' +
                            '<td class="tx-sm-10">' + val['gcode'] + '/' + val['gname'] + '/' + val['gpartno'] + '/' + val['gbarcode'] + '</td>' +
                            '<td>' + val['Qty_A'] + '</td>' +
                            '<td>' + val['Qty_B'] + '</td>' +
                            '<td>' + val['gunit'] + '</td>' +
                            '<td>' + val['gprice'] + '</td>' +
                            '<td>' + val['gprice'] + '</td>' +
                            '<td>0</td>' +
                            '<td>0</td>' +
                            '<td>' + val['NetPrice'] + '</td>' +
                            '<td><a href="javascript:void(0)"><span class="badge badge-danger"><i class="typcn typcn-minus"></i></span></a></td>' +
                            '</tr>')

                        i--;

                    });

                   

                });
            });

        };

        $(document).ready(async function () {

            //await $("#global-loader").css('opacity','0.5').fadeIn("slow");
            await $.init();

        });


    } else {

        window.location.assign('./login');

    }

});