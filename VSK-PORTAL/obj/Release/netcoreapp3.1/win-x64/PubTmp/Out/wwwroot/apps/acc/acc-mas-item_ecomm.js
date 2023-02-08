'use strict';

const api_url = 'http://localhost:49705';
const url_lazada_list = api_url + '/v1/lazada_list';
const url_lazada_search = api_url + '/v1/lazada_search';
let fs = firebase.firestore();
let collection = '';
let oTable;
let item_data = [];

let customElement = $("<div>", {
    "css": {
        "border": "2px solid",
        "font-size": "14px",
        "text-align": "center",
        "padding": '7px'

    },
    "text": 'Please Wait...'
});

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        $.init = async function () {

            //alert('hello')
            await $.List();

        };

        $.List = async function (search) {

            console.log('List function Start', new Date());

            let url = new URL(url_lazada_list);

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {

                oTable = $('#tbl-list_lazada').DataTable({
                    data: result.data,
                    //scrollY: "625px",
                    scrollX: true,
                    //scrollCollapse: true,
                    autoWidth: false,
                    //paging: false,
                    pagingType: "simple",
                    dom: 'frtip',
                    destroy: true,
                    pageLength: 15,
                    searching: true,
                    columns: [
                        {
                            title: "ID",
                            data: "trans_id",
                            visible: false,
                            searchable: false
                        },//0
                        {
                            title: "#",
                            data: "row_no",
                  
                            searchable: false,
                            render: function (data, type, row, meta) {
                                return '<span style="font-size:10px;">' + data + '</span>';
                            }
                        },//0
                        {
                            title: "SKU",
                            data: "onl_itemsetup_SellerSku",
                            //searchable: false,
                            render: function (data, type, row, meta) {
                                return '<span style="font-size:10px;">' + data + '</span>';
                            }
                        },//0
                        {
                            title: "Name",
                            data: "onl_itemsetup_name",
                            render: function (data, type, row, meta) {

                                if (row.onl_itemsetup_parent != row.onl_itemsetup_SellerSku) {
                                    return '<span style="font-size:10px; color:#ff6900;">' + data + '</span>';
                                } else {
                                    return '<span style="font-size:10px; color:DarkGreen;">' + data + '</span>';
                                }

                            }
                        },//0
                        {
                            title: "parent",
                            data: "onl_itemsetup_parent",
                            visible: false,
                        },//0

                    ],
                    "order": [[1, "ASC"]],
                    "rowCallback": function (row, data) {


                    },
                    "initComplete": function (settings, json) {

                        $.contextMenu({
                            selector: '#tbl-list_lazada tbody tr',
                            callback: async function (key, options) {

                                let citem = oTable.row(this).data();

                                if (key === 'view') {

                                    $.Details(citem);

                                } else {

                                    alert('ERROR');

                                }

                            },
                            items: {
                                "view": { name: "View", icon: "fas fa-search" },
                            }

                        });

                        $.LoadingOverlay("hide")

                    },
                    "drawCallback": function (settings) {

                    }
                });

            });

        };

        $.Details = async function (citem) {

            $('#lazada_detail').find('input').val('');
            $('#lazada_detail').find('textarea').html('');

            console.log('Detail citem', citem)

            let url = new URL(url_lazada_search);

            url.search = new URLSearchParams({
                onl_itemsetup_SellerSku: citem['onl_itemsetup_SellerSku']
            });

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {

                console.log(result);

                $.each(result.data, function (key, val) {

                    $('#lazada').find('#item_name').html(val['onl_itemsetup_SellerSku'] +' '+val['onl_itemsetup_name']);
                    $('#lazada').find('#onl_itemsetup_SellerSku').val(val['onl_itemsetup_SellerSku']);
                    $('#lazada').find('#onl_itemsetup_PrimaryCategory').val(val['onl_itemsetup_PrimaryCategory']);
                    $('#lazada').find('#onl_itemsetup_name').val(val['onl_itemsetup_name']);
                    $('#lazada').find('#onl_itemsetup_short_description').val(val['onl_itemsetup_short_description']);
                    $('#lazada').find('#onl_itemsetup_description').val(val['onl_itemsetup_description']);
                    $('#lazada').find('#onl_itemsetup_warranty_type').val(val['onl_itemsetup_warranty_type']);
                    $('#lazada').find('#onl_itemsetup_warranty').val(val['onl_itemsetup_warranty']);
                    $('#lazada').find('#onl_itemsetup_brand').val(val['onl_itemsetup_brand']);
                    $('#lazada').find('#onl_itemsetup_quantity').val(val['onl_itemsetup_quantity']);
                    $('#lazada').find('#onl_itemsetup_price').val(val['onl_itemsetup_price']);
                    $('#lazada').find('#onl_itemsetup_special_price').val(val['onl_itemsetup_special_price']);
                    $('#lazada').find('#onl_itemsetup_package_weight').val(val['onl_itemsetup_package_weight']);
                    $('#lazada').find('#onl_itemsetup_package_length').val(val['onl_itemsetup_package_length']);
                    $('#lazada').find('#onl_itemsetup_package_width').val(val['onl_itemsetup_package_width']);
                    $('#lazada').find('#onl_itemsetup_package_height').val(val['onl_itemsetup_package_height']);


                    $('#lazada').find('#onl_itemsetup_MainImage').attr('src', val['onl_itemsetup_MainImage']);

                    if (val['onl_itemsetup_Image2'] === null) {
                        $('#lazada').find('#onl_itemsetup_Image2').attr('src', '../assets/img/photos/1.jpg');
                    } else {
                        $('#lazada').find('#onl_itemsetup_Image2').attr('src', val['onl_itemsetup_Image2']);
                    }

                    if (val['onl_itemsetup_Image3'] === null) {
                        $('#lazada').find('#onl_itemsetup_Image3').attr('src', '../assets/img/photos/1.jpg');
                    } else {
                        $('#lazada').find('#onl_itemsetup_Image3').attr('src', val['onl_itemsetup_Image3']);
                    }

                    if (val['onl_itemsetup_Image4'] === null) {
                        $('#lazada').find('#onl_itemsetup_Image4').attr('src', '../assets/img/photos/1.jpg');
                    } else {
                        $('#lazada').find('#onl_itemsetup_Image4').attr('src', val['onl_itemsetup_Image4']);
                    }
  
                });


            });

        };

        $(document).ready(async function () {

            await $.init();

        });

    } else {

        window.location.assign('./login');

    }

});