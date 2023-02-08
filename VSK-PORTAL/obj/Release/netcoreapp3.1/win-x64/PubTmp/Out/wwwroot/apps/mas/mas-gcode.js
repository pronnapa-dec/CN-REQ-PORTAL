'use strict';

let fs = firebase.firestore();
let target = '';
let ck_target;
let oTable_gcode_a,
    oTable_gcode_aexp,
    oTable_gcode_b,
    oTable_gcode_bexp,
    oTable_gcode_c,
    oTable_gcode_cexp,
    oTable_gcode_d,
    oTable_gcode_dexp,
    oTable_gcode_e,
    oTable_gcode_eexp;
let table, options;
//const url_api = "http://localhost:49705/";
let url_location = "";
url_location = window.location.href;
const url_api = "http://localhost:49705/";
//const url_api = "http://192.168.1.247/vsk-api-stmas";
const url_gcode_get = url_api + '/api/Mas_gcode_get';
const url_gcode_chk = url_api + '/api/Mas_gcode_chk';
const url_gcode_action = url_api + '/api/Mas_gcode_action';
const objProfile = JSON.parse(localStorage.getItem('objProfile'));
var ck_code = 0;
var check_dup = 0;
var check_dup_code = 0;
var check_dup_name = 0;
var check_dup_chr = 0;

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

        var full_mail = user.email;

        var name = full_mail.replace("@vskautoparts.com", "");

        $.init = function () {

            toastr.warning('อยู่ระหว่างการทดสอบการใช้งานเท่านั้น (UAT Mode)');

            $('.btn-action').hide();

            $('.btn-action').prop('disabled', true);

            $('.btn-reset').removeClass('btn-secondary');

            $('.btn-reset').addClass('btn-danger');

            $('.fc-datepicker').datepicker({
                dateFormat: 'dd/mm/yy',
                autoclose: true,
            });

            $('.date-picker').daterangepicker({
                autoUpdateInput: false,
                showDropdowns: true,
                opens: "right",
                locale: { cancelLabel: 'Clear' },
            }, function (start, end, label) {

            });

            $('.date-picker').on('apply.daterangepicker', function (ev, picker) {
                $(this).val(picker.startDate.format('DD/MM/YYYY') + '-' + picker.endDate.format('DD/MM/YYYY'));
            });

            $.List_gcode_a();

            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

                $("#global-loader").fadeIn("slow");

                target = $(e.target).attr("href").replace('#', '')

                $('#' + target + '_code').parsley().destroy()
                $('#' + target + '_name').parsley().destroy()
                //$('#' + target + '_gnamechr').parsley().destroy()
                //$('#' + target + '_rec').parsley().destroy()
                $('#tbl-list_' + target + ' thead tr th').removeClass('sorting_asc')

                console.log("on tab", target);

                /* $('#tbl-list_gcode_a thead tr').css({ "height": "40px !important" })*/

                $('.ck-code').addClass('d-none');
                $('input').val('');
                $('.btn-action').hide();

                if (target == 'gcode_a') {

                    $('#' + target + '_code').parsley().destroy()
                    $('#' + target + '_name').parsley().destroy()
                    $('#' + target + '_gnamechr').parsley().destroy()
                    $('#' + target + '_rec').parsley().destroy()

                    $.List_gcode_a();

                    oTable_gcode_a.destroy();

                    $("#global-loader").fadeOut("slow");

                } else if (target == 'gcode_aexp') {
                    $('#tbl-list_gcode_a thead tr th').removeClass('sorting_asc !important')
                    $('#' + target + '_code').parsley().destroy()
                    $('#' + target + '_name').parsley().destroy()
                    $('#' + target + '_gnamechr').parsley().destroy()
                    $('#' + target + '_rec').parsley().destroy()

                    $.List_gcode_aexp();

                    $("#global-loader").fadeOut("slow");

                } else if (target == 'gcode_b') {

                    $.List_gcode_b();

                    $("#global-loader").fadeOut("slow");

                } else if (target === 'gcode_bexp') {

                    $.List_gcode_bexp();

                    $("#global-loader").fadeOut("slow");

                } else if (target === 'gcode_c') {

                    $.List_gcode_c();

                    $("#global-loader").fadeOut("slow");

                } else if (target === 'gcode_cexp') {

                    $.List_gcode_cexp();

                    $("#global-loader").fadeOut("slow");

                } else if (target === 'gcode_d') {

                    $.List_gcode_d();

                    $("#global-loader").fadeOut("slow");

                } else if (target === 'gcode_dexp') {

                    $.List_gcode_dexp();

                    $("#global-loader").fadeOut("slow");

                } else if (target === 'gcode_e') {

                    $.List_gcode_e();

                    $("#global-loader").fadeOut("slow");

                } else if (target === 'gcode_eexp') {

                    $.List_gcode_eexp();

                    $("#global-loader").fadeOut("slow");

                } else {

                    alert('พัง')

                    $("#global-loader").fadeOut("slow");

                }


                ck_target = target == '' ? 'gcode_a' : target;

                $('#' + ck_target + '_code').prop('disabled', true);
                $('#' + ck_target + '_name').prop('disabled', true);
                $('#' + ck_target + '_gnamechr').prop('disabled', true);
                $('#' + ck_target + '_rec').prop('disabled', true);
            });

            ck_target = target == '' ? 'gcode_a' : target;

            $('#' + ck_target + '_code').prop('disabled', true);
            $('#' + ck_target + '_name').prop('disabled', true);
            $('#' + ck_target + '_gnamechr').prop('disabled', true);
            $('#' + ck_target + '_rec').prop('disabled', true);

            $('.btn-event-create').click(function (e) {

                e.preventDefault();

                ck_target = target == '' ? 'gcode_a' : target;

                $('.ck-code').addClass('d-none');
                $('.btn-action').show();

                $('.d-btn-create').prop('disabled', false).show();
                $('.btn-create').prop('disabled', false).show();

                $('.d-btn-update').prop('disabled', true).hide();
                $('.btn-reset').prop('disabled', false);
                $('#' + ck_target + '_code').prop('disabled', false);
                $('#' + ck_target + '_name').prop('disabled', false);
                $('#' + ck_target + '_gnamechr').prop('disabled', false);
                $('#' + ck_target + '_rec').prop('disabled', false);
                $('input').val('');
                //$.Ck_code('create');
                $.Ck_code();

            });

            $('.btn-create').click(function (e) {

                e.preventDefault();

                $.Ck_create();

            });

            $('.btn-update').click(function (e) {

                e.preventDefault();

                $("#global-loader").fadeIn("slow");

                $.Update();

            });

            $('.reset').on("click", function (e) {

                $('input').val('');

                $('.ck-code').addClass('d-none');

                $('#' + target + '_code').parsley().destroy()
                $('#' + target + '_name').parsley().destroy()
                $('#' + target + '_gnamechr').parsley().destroy()
                $('#' + target + '_rec').parsley().destroy()

                e.preventDefault();

            });




        };

        $.List_gcode_a = async function () {
            $("#global-loader").fadeOut("slow");
            let url = new URL(url_gcode_get);

            url.search = new URLSearchParams({

                code: '',
                gname: '',
                codechr: '',
                ctype: target == '' ? 'gcode_a' : target,

            });

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {

                if (result.status === 'Error') {

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    })

                } else {

                    oTable_gcode_a = $('#tbl-list_gcode_a').DataTable({
                        data: result.data,
                        paging: true, "ordering": false,
                        "bDestroy": true,
                        //dom: 'iBfrtp',
                        //buttons: [
                        //    'copy', 'excel'
                        //],
                        lengthMenu: [
                            [10, 25, 50, -1],
                            ['10 rows', '25 rows', '50 rows', 'Show all']
                        ],
                        columns: [
                            {
                                title: "<span style='font-size:11px;'>Product Code</span>",
                                data: "code",
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //1 
                            {
                                title: "<span style='font-size:11px;'>Product Name</span>",
                                data: "gname",
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    if (data == null) {
                                        return ''
                                    } else {
                                        return '<span style="font-size:11px;">' + data + '</span>';
                                    }
                                }
                            }, //2
                            {
                                title: "<span style='font-size:11px;'> Product Definition</span>",
                                data: "codechr",
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //3
                            {
                                title: "<span style='font-size:11px;'>CREATED DATE</span>",
                                data: "startdate",
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '<span/>';
                                }
                            }, //5

                        ],
                        "order": [[3, "desc"]],
                        "initComplete": function (settings, json) {

                            $('#tbl-list_gcode_a thead tr').css({ "height": "40px" })

                            $.contextMenu({
                                selector: '#tbl-list_gcode_a tbody tr',
                                callback: async function (key, options) {

                                    let data = oTable_gcode_a.row(this).data();
                                    let citem = {
                                        code: data['code'],
                                        gname: data['gname'],
                                        codechr: data['codechr'],
                                        rec: data['rec'],
                                        startdate: data['startdate'],
                                    };

                                    if (key === 'view') {
                                        $('.btn-action').hide();
                                        //$('.btn-create').prop('disabled', true);
                                        //$('.btn-update').prop('disabled', true);
                                        //$('.btn-reset').prop('disabled', true);
                                        $('#' + ck_target + '_code').val(citem['code']).prop('disabled', true);
                                        $('#' + ck_target + '_name').val(citem['gname']).prop('disabled', true);
                                        $('#' + ck_target + '_gnamechr').val(citem['codechr']).prop('disabled', true);

                                        $('#' + ck_target + '_code').parsley().destroy()
                                        $('#' + ck_target + '_name').parsley().destroy()
                                        $('#' + ck_target + '_gnamechr').parsley().destroy()
                                        $('#' + ck_target + '_rec').parsley().destroy()
                                        //$('.btn-action').prop('disabled', true);
                                    } else if (key === 'edit') {
                                        $('.btn-action').show();
                                        $('.d-btn-create').hide();
                                        $('.btn-update').prop('disabled', false);
                                        $('.d-btn-update').show();
                                        $('.btn-reset').prop('disabled', false);
                                        $('#' + ck_target + '_code').val(citem['code']).prop('disabled', true);
                                        $('#' + ck_target + '_name').val(citem['gname']).prop('disabled', false);
                                        $('#' + ck_target + '_gnamechr').val(citem['codechr']).prop('disabled', false);
                                        $.Ck_code('update');
                                        //$('.btn-action').show();
                                        $('#' + ck_target + '_code').parsley().destroy()
                                        $('#' + ck_target + '_name').parsley().destroy()
                                        $('#' + ck_target + '_gnamechr').parsley().destroy()
                                        $('#' + ck_target + '_rec').parsley().destroy()
                                    } else if (key === 'delete') {
                                        $.Delete(citem);
                                    } else {
                                        alert('ERROR');
                                    }

                                },
                                items: {
                                    "view": { name: "View", icon: "fas fa-search" },
                                    /*   "create": { name: "Create", icon: "fas fa-plus" },*/
                                    "edit": { name: "Edit", icon: "edit" },
                                    "delete": { name: "Delete", icon: "delete" },
                                }
                            });



                        },
                    });


                }



            })


        };

        $.List_gcode_aexp = async function () {
            $("#global-loader").fadeOut("slow");
            let url = new URL(url_gcode_get);

            url.search = new URLSearchParams({

                code: '',
                gname: '',
                codechr: '',
                ctype: target == '' ? 'gcode_a' : target,

            });

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {

                if (result.status === 'Error') {



                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    })

                } else {

                    oTable_gcode_aexp = $('#tbl-list_gcode_aexp').DataTable({
                        data: result.data,
                        paging: true, "ordering": false,
                        "bDestroy": true,
                        //dom: 'iBfrtp',
                        //buttons: [
                        //    'copy', 'excel'
                        //],
                        lengthMenu: [
                            [10, 25, 50, -1],
                            ['10 rows', '25 rows', '50 rows', 'Show all']
                        ],
                        columns: [
                            {
                                title: "<span style='font-size:11px;'>Product Code</span>",
                                data: "code",
                                //width: "70px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //0
                            {
                                title: "<span style='font-size:11px;'>Product Name</span>",
                                data: "gname",
                                //width: "300px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    if (data == null) {
                                        return ''
                                    } else {
                                        return '<span style="font-size:11px;">' + data + '</span>';
                                    }
                                }
                            }, //1
                            {
                                title: "<span style='font-size:11px;'> Product Definition</span>",
                                data: "codechr",
                                class: "tx-center",
                                //width: "70px",
                                //visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //2
                            {
                                title: "<span style='font-size:11px;'>CREATED DATE</span>",
                                data: "startdate",
                                class: "tx-center",
                                // width: "100px",
                                // visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '<span/>';
                                }
                            }, //3

                        ],
                        "order": [[3, "desc"]],
                        "initComplete": function (settings, json) {

                            $('#tbl-list_' + target + ' thead tr').css({ "height": "40px" })

                            $.contextMenu({
                                selector: '#tbl-list_gcode_aexp tbody tr',
                                callback: async function (key, options) {

                                    let data = oTable_gcode_aexp.row(this).data();
                                    let citem = {
                                        code: data['code'],
                                        gname: data['gname'],
                                        codechr: data['codechr'],
                                        rec: data['rec'],
                                        startdate: data['startdate'],
                                    };

                                    if (key === 'view') {
                                        console.log(citem['code']);
                                        $('.btn-action').hide();

                                        //$('.btn-create').prop('disabled', true);
                                        //$('.btn-update').prop('disabled', true);
                                        //$('.btn-reset').prop('disabled', true);

                                        $('#' + target + '_code').val(citem['code']).prop('disabled', true);
                                        $('#' + target + '_name').val(citem['gname']).prop('disabled', true);
                                        $('#' + target + '_gnamechr').val(citem['codechr']).prop('disabled', true);

                                        $('#' + target + '_code').parsley().destroy()
                                        $('#' + target + '_name').parsley().destroy()
                                        $('#' + target + '_gnamechr').parsley().destroy()
                                        $('#' + target + '_rec').parsley().destroy()
                                    } else if (key === 'edit') {
                                        $('.btn-action').show();
                                        $('.d-btn-create').hide();
                                        $('.btn-update').prop('disabled', false);
                                        $('.d-btn-update').show();
                                        $('.btn-reset').prop('disabled', false);
                                        $('#' + target + '_code').val(citem['code']).prop('disabled', true);
                                        $('#' + target + '_name').val(citem['gname']).prop('disabled', false);
                                        $('#' + target + '_gnamechr').val(citem['codechr']).prop('disabled', false);
                                        $('#' + target + '_code').parsley().destroy()
                                        $('#' + target + '_name').parsley().destroy()
                                        $('#' + target + '_gnamechr').parsley().destroy()
                                        $('#' + target + '_rec').parsley().destroy()
                                        //$('.btn-action').show();
                                    } else if (key === 'delete') {
                                        $.Delete(citem);
                                    } else {
                                        alert('ERROR');
                                    }
                                },
                                items: {
                                    "view": { name: "View", icon: "fas fa-search" },
                                    /* "create": { name: "Create", icon: "fas fa-plus" },*/
                                    "edit": { name: "Edit", icon: "edit" },
                                    "delete": { name: "Delete", icon: "delete" },
                                }
                            });



                        },
                    });


                }

            })


        };

        $.List_gcode_b = async function () {

            let url = new URL(url_gcode_get);

            url.search = new URLSearchParams({

                code: '',
                gname: '',
                codechr: '',
                ctype: target == '' ? 'gcode_a' : target,

            });

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {

                if (result.status === 'Error') {



                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    })

                } else {

                    oTable_gcode_b = $('#tbl-list_gcode_b').DataTable({
                        data: result.data,
                        paging: true, "ordering": false,
                        "bDestroy": true,
                        //dom: 'iBfrtp',
                        //buttons: [
                        //    'copy', 'excel'
                        //],
                        lengthMenu: [
                            [10, 25, 50, -1],
                            ['10 rows', '25 rows', '50 rows', 'Show all']
                        ],
                        columns: [
                            {
                                title: "<span style='font-size:11px;'>Product Code</span>",
                                data: "code",
                                //width: "70px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //1 
                            {
                                title: "<span style='font-size:11px;'>Product Name</span>",
                                data: "gname",
                                //width: "300px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    if (data == null) {
                                        return ''
                                    } else {
                                        return '<span style="font-size:11px;">' + data + '</span>';
                                    }
                                }
                            }, //2
                            //{
                            //    title: "<span style='font-size:11px;'> Product Definition</span>",
                            //    data: "codechr",
                            //    class: "tx-center",
                            //    //width: "70px",
                            //    //visible: false,
                            //    render: function (data, type, row, meta) {
                            //        return '<span style="font-size:11px;">' + data + '</span>';
                            //    }
                            //}, //3
                            //{
                            //    title: "<span style='font-size:11px;'> Rec Code <br> รหัส Rec</span>",
                            //    data: "rec",
                            //    class: "tx-center",
                            //    //width: "70px",
                            //    //visible: false,
                            //    render: function (data, type, row, meta) {
                            //        return '<span style="font-size:11px;">' + data + '</span>';
                            //    }
                            //}, //4
                            {
                                title: "<span style='font-size:11px;'>CREATED DATE</span>",
                                data: "startdate",
                                class: "tx-center",
                                // width: "100px",
                                // visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '<span/>';
                                }
                            }, //5

                        ],
                        //"order": [[1, "desc"]],
                        "initComplete": function (settings, json) {

                            $('#tbl-list_' + target + ' thead tr').css({ "height": "40px" })

                            $.contextMenu({
                                selector: '#tbl-list_gcode_b tbody tr',
                                callback: async function (key, options) {

                                    let data = oTable_gcode_b.row(this).data();
                                    let citem = {
                                        code: data['code'],
                                        gname: data['gname'],
                                        codechr: data['codechr'],
                                        rec: data['rec'],
                                        startdate: data['startdate'],
                                    };

                                    if (key === 'view') {
                                        //$('.btn-action').show();
                                        $('.btn-action').hide();
                                        //$('.btn-create').prop('disabled', true);
                                        //$('.btn-update').prop('disabled', true);
                                        //$('.btn-reset').prop('disabled', true);
                                        $('#' + target + '_code').val(citem['code']).prop('disabled', true);
                                        $('#' + target + '_name').val(citem['gname']).prop('disabled', true);
                                        //$('#' + target + '_gnamechr').val(citem['codechr']).prop('disabled', true);

                                        $('#' + target + '_code').parsley().destroy()
                                        $('#' + target + '_name').parsley().destroy()
                                        //$('#' + target + '_gnamechr').parsley().destroy()
                                        //$('#' + target + '_rec').parsley().destroy()
                                    } else if (key === 'edit') {
                                        $('.btn-action').show();
                                        $('.d-btn-create').hide();
                                        $('.btn-update').prop('disabled', false);
                                        $('.d-btn-update').show();
                                        $('.btn-reset').prop('disabled', false);
                                        $('#' + target + '_code').val(citem['code']).prop('disabled', true);
                                        $('#' + target + '_name').val(citem['gname']).prop('disabled', false);
                                        //$('#' + target + '_gnamechr').val(citem['codechr']).prop('disabled', false);
                                        //$('.btn-action').show();
                                        $('#' + target + '_code').parsley().destroy()
                                        $('#' + target + '_name').parsley().destroy()
                                        //$('#' + target + '_gnamechr').parsley().destroy()
                                        //$('#' + target + '_rec').parsley().destroy()
                                    } else if (key === 'delete') {
                                        $.Delete(citem);
                                    } else {
                                        alert('ERROR');
                                    }
                                },
                                items: {
                                    "view": { name: "View", icon: "fas fa-search" },
                                    /* "create": { name: "Create", icon: "fas fa-plus" },*/
                                    "edit": { name: "Edit", icon: "edit" },
                                    "delete": { name: "Delete", icon: "delete" },
                                }
                            });



                        },
                    });


                }
            })


        };

        $.List_gcode_bexp = async function () {

            let url = new URL(url_gcode_get);

            url.search = new URLSearchParams({

                code: '',
                gname: '',
                codechr: '',
                ctype: target == '' ? 'gcode_a' : target,

            });

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {

                if (result.status === 'Error') {



                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    })

                } else {

                    oTable_gcode_bexp = $('#tbl-list_gcode_bexp').DataTable({
                        data: result.data,
                        paging: true, "ordering": false,
                        "bDestroy": true,
                        //dom: 'iBfrtp',
                        //buttons: [
                        //    'copy', 'excel'
                        //],
                        lengthMenu: [
                            [10, 25, 50, -1],
                            ['10 rows', '25 rows', '50 rows', 'Show all']
                        ],
                        columns: [
                            {
                                title: "<span style='font-size:11px;'>Product Code</span>",
                                data: "code",
                                //width: "70px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //1 
                            {
                                title: "<span style='font-size:11px;'>Product Name</span>",
                                data: "gname",
                                //width: "300px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    if (data == null) {
                                        return ''
                                    } else {
                                        return '<span style="font-size:11px;">' + data + '</span>';
                                    }
                                }
                            }, //2
                            //{
                            //    title: "<span style='font-size:11px;'> Product Definition</span>",
                            //    data: "codechr",
                            //    class: "tx-center",
                            //    //width: "70px",
                            //    //visible: false,
                            //    render: function (data, type, row, meta) {
                            //        return '<span style="font-size:11px;">' + data + '</span>';
                            //    }
                            //}, //3
                            //{
                            //    title: "<span style='font-size:11px;'> Rec Code <br> รหัส Rec</span>",
                            //    data: "rec",
                            //    class: "tx-center",
                            //    //width: "70px",
                            //    //visible: false,
                            //    render: function (data, type, row, meta) {
                            //        return '<span style="font-size:11px;">' + data + '</span>';
                            //    }
                            //}, //4
                            {
                                title: "<span style='font-size:11px;'>CREATED DATE</span>",
                                data: "startdate",
                                class: "tx-center",
                                // width: "100px",
                                // visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '<span/>';
                                }
                            }, //5

                        ],
                        //"order": [[1, "desc"]],
                        "initComplete": function (settings, json) {

                            $('#tbl-list_' + target + ' thead tr').css({ "height": "40px" })

                            $.contextMenu({
                                selector: '#tbl-list_gcode_bexp tbody tr',
                                callback: async function (key, options) {

                                    let data = oTable_gcode_bexp.row(this).data();
                                    let citem = {
                                        code: data['code'],
                                        gname: data['gname'],
                                        codechr: data['codechr'],
                                        rec: data['rec'],
                                        startdate: data['startdate'],
                                    };

                                    if (key === 'view') {
                                        //$('.btn-action').show();
                                        $('.btn-action').hide();
                                        //$('.btn-create').prop('disabled', true);
                                        //$('.btn-update').prop('disabled', true);
                                        //$('.btn-reset').prop('disabled', true);
                                        $('#' + target + '_code').val(citem['code']).prop('disabled', true);
                                        $('#' + target + '_name').val(citem['gname']).prop('disabled', true);
                                        //$('#' + target + '_gnamechr').val(citem['codechr']).prop('disabled', true);

                                        $('#' + target + '_code').parsley().destroy()
                                        $('#' + target + '_name').parsley().destroy()
                                        //$('#' + target + '_gnamechr').parsley().destroy()
                                        //$('#' + target + '_rec').parsley().destroy()
                                    } else if (key === 'edit') {
                                        $('.d-btn-update').show();
                                        $('.btn-action').show();
                                        $('.d-btn-create').hide();
                                        $('.btn-update').prop('disabled', false);
                                        $('.btn-reset').prop('disabled', false);
                                        $('#' + target + '_code').val(citem['code']).prop('disabled', true);
                                        $('#' + target + '_name').val(citem['gname']).prop('disabled', false);
                                        //$('#' + target + '_gnamechr').val(citem['codechr']).prop('disabled', false);
                                        //$('.btn-action').show();
                                        $('#' + target + '_code').parsley().destroy()
                                        $('#' + target + '_name').parsley().destroy()
                                        //$('#' + target + '_gnamechr').parsley().destroy()
                                        //$('#' + target + '_rec').parsley().destroy()
                                    } else if (key === 'delete') {
                                        $.Delete(citem);
                                    } else {
                                        alert('ERROR');
                                    }
                                },
                                items: {
                                    "view": { name: "View", icon: "fas fa-search" },
                                    /* "create": { name: "Create", icon: "fas fa-plus" },*/
                                    "edit": { name: "Edit", icon: "edit" },
                                    "delete": { name: "Delete", icon: "delete" },
                                }
                            });



                        },
                    });


                }
            })


        };

        $.List_gcode_c = async function () {

            let url = new URL(url_gcode_get);

            url.search = new URLSearchParams({

                code: '',
                gname: '',
                codechr: '',
                ctype: target == '' ? 'gcode_a' : target,

            });

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {

                if (result.status === 'Error') {



                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    })

                } else {

                    oTable_gcode_c = $('#tbl-list_gcode_c').DataTable({
                        data: result.data,
                        paging: true, "ordering": false,
                        "bDestroy": true,
                        //dom: 'iBfrtp',
                        //buttons: [
                        //    'copy', 'excel'
                        //],
                        lengthMenu: [
                            [10, 25, 50, -1],
                            ['10 rows', '25 rows', '50 rows', 'Show all']
                        ],
                        columns: [
                            {
                                title: "<span style='font-size:11px;'>Product Code</span>",
                                data: "code",
                                //width: "70px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //1 
                            {
                                title: "<span style='font-size:11px;'>Product Name</span>",
                                data: "gname",
                                //width: "300px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //2
                            {
                                title: "<span style='font-size:11px;'> Rec Code</span>",
                                data: "rec",
                                class: "tx-center",
                                //width: "70px",
                                //visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //3
                            {
                                title: "<span style='font-size:11px;'>CREATED DATE</span>",
                                data: "startdate",
                                class: "tx-center",
                                // width: "100px",
                                // visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '<span/>';
                                }
                            }, //4

                        ],
                        //"order": [[1, "desc"]],
                        "initComplete": function (settings, json) {

                            $('#tbl-list_' + target + ' thead tr').css({ "height": "40px" })
                            //$('#tbl-list_' + target + ' thead tr th').removeClass('sorting_asc !important')
                            $('#tbl-list_gcode_a thead tr th').removeClass('sorting_asc !important')

                            $.contextMenu({
                                selector: '#tbl-list_gcode_c tbody tr',
                                callback: async function (key, options) {

                                    let data = oTable_gcode_c.row(this).data();
                                    let citem = {
                                        code: data['code'],
                                        gname: data['gname'],
                                        codechr: data['codechr'],
                                        rec: data['rec'],
                                        startdate: data['startdate'],
                                    };

                                    if (key === 'view') {
                                        console.log(citem['code']);
                                        $('.btn-action').hide();
                                        /* $('.btn-action').show();*/
                                        //$('.btn-create').prop('disabled', true);
                                        //$('.btn-update').prop('disabled', true);
                                        //$('.btn-reset').prop('disabled', true);
                                        $('#' + target + '_code').val(citem['code']).prop('disabled', true);
                                        $('#' + target + '_name').val(citem['gname']).prop('disabled', true);
                                        //$('#' + target + '_rec').val(citem['rec']).prop('disabled', true);

                                        $('#' + target + '_code').parsley().destroy()
                                        $('#' + target + '_name').parsley().destroy()
                                        //$('#' + target + '_gnamechr').parsley().destroy()
                                        //$('#' + target + '_rec').parsley().destroy()
                                    } else if (key === 'edit') {
                                        $('.d-btn-update').show();
                                        $('.btn-action').show();
                                        $('.d-btn-create').hide();
                                        $('.btn-update').prop('disabled', false);
                                        $('.btn-reset').prop('disabled', false);
                                        $('#' + target + '_code').val(citem['code']).prop('disabled', true);
                                        $('#' + target + '_name').val(citem['gname']).prop('disabled', false);
                                        //$('#' + target + '_rec').val(citem['rec']).prop('disabled', false);
                                        $('#' + target + '_code').parsley().destroy()
                                        $('#' + target + '_name').parsley().destroy()
                                        //$('#' + target + '_gnamechr').parsley().destroy()
                                        //$('#' + target + '_rec').parsley().destroy()
                                        //$('.btn-action').show();
                                    } else if (key === 'delete') {
                                        $.Delete(citem);
                                    } else {
                                        alert('ERROR');
                                    }
                                },
                                items: {
                                    "view": { name: "View", icon: "fas fa-search" },
                                    /*"create": { name: "Create", icon: "fas fa-plus" },*/
                                    "edit": { name: "Edit", icon: "edit" },
                                    "delete": { name: "Delete", icon: "delete" },
                                }
                            });



                        },
                    });


                }
            })


        };

        $.List_gcode_cexp = async function () {

            let url = new URL(url_gcode_get);

            url.search = new URLSearchParams({

                code: '',
                gname: '',
                codechr: '',
                ctype: target == '' ? 'gcode_a' : target,

            });

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {

                if (result.status === 'Error') {



                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    })

                } else {

                    oTable_gcode_cexp = $('#tbl-list_gcode_cexp').DataTable({
                        data: result.data,
                        paging: true, "ordering": false,
                        "bDestroy": true,
                        //dom: 'iBfrtp',
                        //buttons: [
                        //    'copy', 'excel'
                        //],
                        lengthMenu: [
                            [10, 25, 50, -1],
                            ['10 rows', '25 rows', '50 rows', 'Show all']
                        ],
                        columns: [
                            {
                                title: "<span style='font-size:11px;'>Product Code</span>",
                                data: "code",
                                //width: "70px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //1 
                            {
                                title: "<span style='font-size:11px;'>Product Name</span>",
                                data: "gname",
                                //width: "300px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    if (data == null) {
                                        return ''
                                    } else {
                                        return '<span style="font-size:11px;">' + data + '</span>';
                                    }
                                }
                            }, //2
                            {
                                title: "<span style='font-size:11px;'> Rec Code</span>",
                                data: "rec",
                                class: "tx-center",
                                //width: "70px",
                                //visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //3
                            {
                                title: "<span style='font-size:11px;'>CREATED DATE</span>",
                                data: "startdate",
                                class: "tx-center",
                                // width: "100px",
                                // visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '<span/>';
                                }
                            }, //4

                        ],
                        //"order": [[1, "desc"]],
                        "initComplete": function (settings, json) {

                            $('#tbl-list_' + target + ' thead tr').css({ "height": "40px" })

                            $.contextMenu({
                                selector: '#tbl-list_gcode_cexp tbody tr',
                                callback: async function (key, options) {

                                    let data = oTable_gcode_cexp.row(this).data();
                                    let citem = {
                                        code: data['code'],
                                        gname: data['gname'],
                                        codechr: data['codechr'],
                                        rec: data['rec'],
                                        startdate: data['startdate'],
                                    };

                                    if (key === 'view') {
                                        console.log(citem['code']);
                                        $('.btn-action').hide();
                                        //$('.btn-action').show();
                                        //$('.btn-create').prop('disabled', true);
                                        //$('.btn-update').prop('disabled', true);
                                        //$('.btn-reset').prop('disabled', true);
                                        $('#' + target + '_code').val(citem['code']).prop('disabled', true);
                                        $('#' + target + '_name').val(citem['gname']).prop('disabled', true);
                                        //$('#' + target + '_rec').val(citem['rec']).prop('disabled', true);

                                        $('#' + target + '_code').parsley().destroy()
                                        $('#' + target + '_name').parsley().destroy()
                                        //$('#' + target + '_gnamechr').parsley().destroy()
                                        //$('#' + target + '_rec').parsley().destroy()
                                    } else if (key === 'edit') {
                                        $('.d-btn-update').show();
                                        $('.btn-action').show();
                                        $('.d-btn-create').hide();
                                        $('.btn-update').prop('disabled', false);
                                        $('.btn-reset').prop('disabled', false);
                                        $('#' + target + '_code').val(citem['code']).prop('disabled', true);
                                        $('#' + target + '_name').val(citem['gname']).prop('disabled', false);
                                        //$('#' + target + '_rec').val(citem['rec']).prop('disabled', false);
                                        //$('.btn-action').show();
                                        $('#' + target + '_code').parsley().destroy()
                                        $('#' + target + '_name').parsley().destroy()
                                        //$('#' + target + '_gnamechr').parsley().destroy()
                                        //$('#' + target + '_rec').parsley().destroy()
                                    } else if (key === 'delete') {
                                        $.Delete(citem);
                                    } else {
                                        alert('ERROR');
                                    }
                                },
                                items: {
                                    "view": { name: "View", icon: "fas fa-search" },
                                    /* "create": { name: "Create", icon: "fas fa-plus" },*/
                                    "edit": { name: "Edit", icon: "edit" },
                                    "delete": { name: "Delete", icon: "delete" },
                                }
                            });



                        },
                    });


                }
            })


        };

        $.List_gcode_d = async function () {

            let url = new URL(url_gcode_get);

            url.search = new URLSearchParams({

                code: '',
                gname: '',
                codechr: '',
                ctype: target == '' ? 'gcode_a' : target,

            });

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {

                if (result.status === 'Error') {



                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    })

                } else {

                    oTable_gcode_d = $('#tbl-list_gcode_d').DataTable({
                        data: result.data,
                        paging: true, "ordering": false,
                        "bDestroy": true,
                        //dom: 'iBfrtp',
                        //buttons: [
                        //    'copy', 'excel'
                        //],
                        lengthMenu: [
                            [10, 25, 50, -1],
                            ['10 rows', '25 rows', '50 rows', 'Show all']
                        ],
                        columns: [
                            {
                                title: "<span style='font-size:11px;'>Product Code</span>",
                                data: "code",
                                //width: "70px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //1 
                            {
                                title: "<span style='font-size:11px;'>Product Name</span>",
                                data: "gname",
                                //width: "300px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    if (data == null) {
                                        return ''
                                    } else {
                                        return '<span style="font-size:11px;">' + data + '</span>';
                                    }

                                }
                            }, //2
                            //{
                            //    title: "<span style='font-size:11px;'> Product Definition</span>",
                            //    data: "codechr",
                            //    class: "tx-center",
                            //    //width: "70px",
                            //    //visible: false,
                            //    render: function (data, type, row, meta) {
                            //        return '<span style="font-size:11px;">' + data + '</span>';
                            //    }
                            //}, //3
                            //{
                            //    title: "<span style='font-size:11px;'> Rec Code <br> รหัส Rec</span>",
                            //    data: "rec",
                            //    class: "tx-center",
                            //    //width: "70px",
                            //    //visible: false,
                            //    render: function (data, type, row, meta) {
                            //        return '<span style="font-size:11px;">' + data + '</span>';
                            //    }
                            //}, //4
                            {
                                title: "<span style='font-size:11px;'>CREATED DATE</span>",
                                data: "startdate",
                                class: "tx-center",
                                // width: "100px",
                                // visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '<span/>';
                                }
                            }, //5

                        ],
                        //"order": [[1, "desc"]],
                        "initComplete": function (settings, json) {

                            $('#tbl-list_' + target + ' thead tr').css({ "height": "40px" })

                            $.contextMenu({
                                selector: '#tbl-list_gcode_d tbody tr',
                                callback: async function (key, options) {

                                    let data = oTable_gcode_d.row(this).data();
                                    let citem = {
                                        code: data['code'],
                                        gname: data['gname'],
                                        codechr: data['codechr'],
                                        rec: data['rec'],
                                        startdate: data['startdate'],
                                    };

                                    if (key === 'view') {
                                        $('.btn-action').hide();
                                        //$('.btn-action').show();
                                        //$('.btn-create').prop('disabled', true);
                                        //$('.btn-update').prop('disabled', true);
                                        //$('.btn-reset').prop('disabled', true);
                                        $('#' + target + '_code').val(citem['code']).prop('disabled', true);
                                        $('#' + target + '_name').val(citem['gname']).prop('disabled', true);
                                        //$('#' + target + '_gnamechr').val(citem['codechr']).prop('disabled', true);
                                        $('#' + target + '_code').parsley().destroy()
                                        $('#' + target + '_name').parsley().destroy()
                                        //$('#' + target + '_gnamechr').parsley().destroy()
                                        //$('#' + target + '_rec').parsley().destroy()
                                    } else if (key === 'edit') {
                                        $('.d-btn-update').show();
                                        $('.btn-action').show();
                                        $('.d-btn-create').hide();
                                        $('.btn-update').prop('disabled', false);
                                        $('.btn-reset').prop('disabled', false);
                                        $('#' + target + '_code').val(citem['code']).prop('disabled', true);
                                        $('#' + target + '_name').val(citem['gname']).prop('disabled', false);
                                        //$('#' + target + '_gnamechr').val(citem['codechr']).prop('disabled', false);
                                        //$('.btn-action').show();
                                        $('#' + target + '_code').parsley().destroy()
                                        $('#' + target + '_name').parsley().destroy()
                                        //$('#' + target + '_gnamechr').parsley().destroy()
                                        //$('#' + target + '_rec').parsley().destroy()
                                    } else if (key === 'delete') {
                                        $.Delete(citem);
                                    } else {
                                        alert('ERROR');
                                    }
                                },
                                items: {
                                    "view": { name: "View", icon: "fas fa-search" },
                                    /* "create": { name: "Create", icon: "fas fa-plus" },*/
                                    "edit": { name: "Edit", icon: "edit" },
                                    "delete": { name: "Delete", icon: "delete" },
                                }
                            });



                        },
                    });


                }
            })


        };

        $.List_gcode_dexp = async function () {

            let url = new URL(url_gcode_get);

            url.search = new URLSearchParams({

                code: '',
                gname: '',
                codechr: '',
                ctype: target == '' ? 'gcode_a' : target,

            });

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {

                if (result.status === 'Error') {



                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    })

                } else {

                    oTable_gcode_dexp = $('#tbl-list_gcode_dexp').DataTable({
                        data: result.data,
                        paging: true, "ordering": false,
                        "bDestroy": true,
                        //dom: 'iBfrtp',
                        //buttons: [
                        //    'copy', 'excel'
                        //],
                        lengthMenu: [
                            [10, 25, 50, -1],
                            ['10 rows', '25 rows', '50 rows', 'Show all']
                        ],
                        columns: [
                            {
                                title: "<span style='font-size:11px;'>Product Code</span>",
                                data: "code",
                                //width: "70px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //1 
                            {
                                title: "<span style='font-size:11px;'>Product Name</span>",
                                data: "gname",
                                //width: "300px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    if (data == null) {
                                        return ''
                                    } else {
                                        return '<span style="font-size:11px;">' + data + '</span>';
                                    }
                                }
                            }, //2
                            //{
                            //    title: "<span style='font-size:11px;'> Product Definition</span>",
                            //    data: "codechr",
                            //    class: "tx-center",
                            //    //width: "70px",
                            //    //visible: false,
                            //    render: function (data, type, row, meta) {
                            //        return '<span style="font-size:11px;">' + data + '</span>';
                            //    }
                            //}, //3
                            //{
                            //    title: "<span style='font-size:11px;'> Rec Code <br> รหัส Rec</span>",
                            //    data: "rec",
                            //    class: "tx-center",
                            //    //width: "70px",
                            //    //visible: false,
                            //    render: function (data, type, row, meta) {
                            //        return '<span style="font-size:11px;">' + data + '</span>';
                            //    }
                            //}, //4
                            {
                                title: "<span style='font-size:11px;'>CREATED DATE</span>",
                                data: "startdate",
                                class: "tx-center",
                                // width: "100px",
                                // visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '<span/>';
                                }
                            }, //5

                        ],
                        //"order": [[1, "desc"]],
                        "initComplete": function (settings, json) {

                            $('#tbl-list_' + target + ' thead tr').css({ "height": "40px" })

                            $.contextMenu({
                                selector: '#tbl-list_gcode_dexp tbody tr',
                                callback: async function (key, options) {

                                    let data = oTable_gcode_dexp.row(this).data();
                                    let citem = {
                                        code: data['code'],
                                        gname: data['gname'],
                                        codechr: data['codechr'],
                                        rec: data['rec'],
                                        startdate: data['startdate'],
                                    };

                                    if (key === 'view') {
                                        //$('.btn-action').show();
                                        $('.btn-action').hide();
                                        //$('.btn-create').prop('disabled', true);
                                        //$('.btn-update').prop('disabled', true);
                                        //$('.btn-reset').prop('disabled', true);
                                        $('#' + target + '_code').val(citem['code']).prop('disabled', true);
                                        $('#' + target + '_name').val(citem['gname']).prop('disabled', true);
                                        //$('#' + target + '_gnamechr').val(citem['codechr']).prop('disabled', true);
                                        $('#' + target + '_code').parsley().destroy()
                                        $('#' + target + '_name').parsley().destroy()
                                        //$('#' + target + '_gnamechr').parsley().destroy()
                                        //$('#' + target + '_rec').parsley().destroy()
                                    } else if (key === 'edit') {
                                        $('.btn-action').show();
                                        $('.d-btn-update').show();
                                        $('.d-btn-create').hide();
                                        $('.btn-update').prop('disabled', false);
                                        $('.btn-reset').prop('disabled', false);
                                        $('#' + target + '_code').val(citem['code']).prop('disabled', true);
                                        $('#' + target + '_name').val(citem['gname']).prop('disabled', false);
                                        //$('#' + target + '_gnamechr').val(citem['codechr']).prop('disabled', false);
                                        //$('.btn-action').show();
                                        $('#' + target + '_code').parsley().destroy()
                                        $('#' + target + '_name').parsley().destroy()
                                        //$('#' + target + '_gnamechr').parsley().destroy()
                                        //$('#' + target + '_rec').parsley().destroy()
                                    } else if (key === 'delete') {
                                        $.Delete(citem);
                                    } else {
                                        alert('ERROR');
                                    }
                                },
                                items: {
                                    "view": { name: "View", icon: "fas fa-search" },
                                    /* "create": { name: "Create", icon: "fas fa-plus" },*/
                                    "edit": { name: "Edit", icon: "edit" },
                                    "delete": { name: "Delete", icon: "delete" },
                                }
                            });



                        },
                    });


                }
            })


        };

        $.List_gcode_e = async function () {

            let url = new URL(url_gcode_get);

            url.search = new URLSearchParams({

                code: '',
                gname: '',
                codechr: '',
                ctype: target == '' ? 'gcode_a' : target,

            });

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {

                if (result.status === 'Error') {



                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    })

                } else {

                    oTable_gcode_e = $('#tbl-list_gcode_e').DataTable({
                        data: result.data,
                        paging: true, "ordering": false,
                        "bDestroy": true,
                        //dom: 'iBfrtp',
                        //buttons: [
                        //    'copy', 'excel'
                        //],
                        lengthMenu: [
                            [10, 25, 50, -1],
                            ['10 rows', '25 rows', '50 rows', 'Show all']
                        ],
                        columns: [
                            {
                                title: "<span style='font-size:11px;'>Product Code</span>",
                                data: "code",
                                //width: "70px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //1 
                            {
                                title: "<span style='font-size:11px;'>Product Name</span>",
                                data: "gname",
                                //width: "300px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    if (data == null) {
                                        return ''
                                    } else {
                                        return '<span style="font-size:11px;">' + data + '</span>';
                                    }
                                }
                            }, //2
                            //{
                            //    title: "<span style='font-size:11px;'> Product Definition</span>",
                            //    data: "codechr",
                            //    class: "tx-center",
                            //    //width: "70px",
                            //    //visible: false,
                            //    render: function (data, type, row, meta) {
                            //        return '<span style="font-size:11px;">' + data + '</span>';
                            //    }
                            //}, //3
                            //{
                            //    title: "<span style='font-size:11px;'> Rec Code <br> รหัส Rec</span>",
                            //    data: "rec",
                            //    class: "tx-center",
                            //    //width: "70px",
                            //    //visible: false,
                            //    render: function (data, type, row, meta) {
                            //        return '<span style="font-size:11px;">' + data + '</span>';
                            //    }
                            //}, //4
                            {
                                title: "<span style='font-size:11px;'>CREATED DATE</span>",
                                data: "startdate",
                                class: "tx-center",
                                // width: "100px",
                                // visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '<span/>';
                                }
                            }, //5

                        ],
                        //"order": [[1, "desc"]],
                        "initComplete": function (settings, json) {

                            $('#tbl-list_' + target + ' thead tr').css({ "height": "40px" })

                            $.contextMenu({
                                selector: '#tbl-list_gcode_e tbody tr',
                                callback: async function (key, options) {

                                    let data = oTable_gcode_e.row(this).data();
                                    let citem = {
                                        code: data['code'],
                                        gname: data['gname'],
                                        codechr: data['codechr'],
                                        rec: data['rec'],
                                        startdate: data['startdate'],
                                    };

                                    if (key === 'view') {
                                        //$('.btn-action').show();
                                        $('.btn-action').hide();
                                        //$('.btn-create').prop('disabled', true);
                                        //$('.btn-update').prop('disabled', true);
                                        //$('.btn-reset').prop('disabled', true);
                                        $('#' + target + '_code').val(citem['code']).prop('disabled', true);
                                        $('#' + target + '_name').val(citem['gname']).prop('disabled', true);
                                        //$('#' + target + '_gnamechr').val(citem['codechr']).prop('disabled', true);
                                        $('#' + target + '_code').parsley().destroy()
                                        $('#' + target + '_name').parsley().destroy()
                                        //$('#' + target + '_gnamechr').parsley().destroy()
                                        //$('#' + target + '_rec').parsley().destroy()
                                    } else if (key === 'edit') {
                                        $('.d-btn-update').show();
                                        $('.btn-action').show();
                                        $('.d-btn-create').hide();
                                        $('.btn-update').prop('disabled', false);
                                        $('.btn-reset').prop('disabled', false);
                                        $('#' + target + '_code').val(citem['code']).prop('disabled', true);
                                        $('#' + target + '_name').val(citem['gname']).prop('disabled', false);
                                        //$('#' + target + '_gnamechr').val(citem['codechr']).prop('disabled', false);
                                        //$('.btn-action').show();
                                        $('#' + target + '_code').parsley().destroy()
                                        $('#' + target + '_name').parsley().destroy()
                                        //$('#' + target + '_gnamechr').parsley().destroy()
                                        //$('#' + target + '_rec').parsley().destroy()
                                    } else if (key === 'delete') {
                                        $.Delete(citem);
                                    } else {
                                        alert('ERROR');
                                    }
                                },
                                items: {
                                    "view": { name: "View", icon: "fas fa-search" },
                                    /* "create": { name: "Create", icon: "fas fa-plus" },*/
                                    "edit": { name: "Edit", icon: "edit" },
                                    "delete": { name: "Delete", icon: "delete" },
                                }
                            });



                        },
                    });


                }
            })


        };

        $.List_gcode_eexp = async function () {

            let url = new URL(url_gcode_get);

            url.search = new URLSearchParams({

                code: '',
                gname: '',
                codechr: '',
                ctype: target == '' ? 'gcode_a' : target,

            });

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (result) {

                if (result.status === 'Error') {



                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    })

                } else {

                    oTable_gcode_eexp = $('#tbl-list_gcode_eexp').DataTable({
                        data: result.data,
                        paging: true, "ordering": false,
                        "bDestroy": true,
                        //dom: 'iBfrtp',
                        //buttons: [
                        //    'copy', 'excel'
                        //],
                        lengthMenu: [
                            [10, 25, 50, -1],
                            ['10 rows', '25 rows', '50 rows', 'Show all']
                        ],
                        columns: [
                            {
                                title: "<span style='font-size:11px;'>Product Code</span>",
                                data: "code",
                                //width: "70px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + data + '</span>';
                                }
                            }, //1 
                            {
                                title: "<span style='font-size:11px;'>Product Name</span>",
                                data: "gname",
                                //width: "300px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    if (data == null) {
                                        return ''
                                    } else {
                                        return '<span style="font-size:11px;">' + data + '</span>';
                                    }
                                }
                            }, //2
                            //{
                            //    title: "<span style='font-size:11px;'> Product Definition</span>",
                            //    data: "codechr",
                            //    class: "tx-center",
                            //    //width: "70px",
                            //    //visible: false,
                            //    render: function (data, type, row, meta) {
                            //        return '<span style="font-size:11px;">' + data + '</span>';
                            //    }
                            //}, //3
                            //{
                            //    title: "<span style='font-size:11px;'> Rec Code <br> รหัส Rec</span>",
                            //    data: "rec",
                            //    class: "tx-center",
                            //    //width: "70px",
                            //    //visible: false,
                            //    render: function (data, type, row, meta) {
                            //        return '<span style="font-size:11px;">' + data + '</span>';
                            //    }
                            //}, //4
                            {
                                title: "<span style='font-size:11px;'>CREATED DATE</span>",
                                data: "startdate",
                                class: "tx-center",
                                // width: "100px",
                                // visible: false,
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '<span/>';
                                }
                            }, //5

                        ],
                        //"order": [[1, "desc"]],
                        "initComplete": function (settings, json) {

                            $('#tbl-list_' + target + ' thead tr').css({ "height": "40px" })

                            $.contextMenu({
                                selector: '#tbl-list_gcode_eexp tbody tr',
                                callback: async function (key, options) {

                                    let data = oTable_gcode_eexp.row(this).data();
                                    let citem = {
                                        code: data['code'],
                                        gname: data['gname'],
                                        codechr: data['codechr'],
                                        rec: data['rec'],
                                        startdate: data['startdate'],
                                    };

                                    if (key === 'view') {
                                        //$('.btn-action').show();
                                        $('.btn-action').hide();
                                        //$('.btn-create').prop('disabled', true);
                                        //$('.btn-update').prop('disabled', true);
                                        //$('.btn-reset').prop('disabled', true);
                                        $('#' + target + '_code').val(citem['code']).prop('disabled', true);
                                        $('#' + target + '_name').val(citem['gname']).prop('disabled', true);
                                        //$('#' + target + '_gnamechr').val(citem['codechr']).prop('disabled', true);
                                        $('#' + target + '_code').parsley().destroy()
                                        $('#' + target + '_name').parsley().destroy()
                                        //$('#' + target + '_gnamechr').parsley().destroy()
                                        //$('#' + target + '_rec').parsley().destroy()
                                    } else if (key === 'edit') {
                                        $('.btn-action').show();
                                        $('.d-btn-update').show();
                                        $('.d-btn-create').hide();
                                        $('.btn-update').prop('disabled', false);
                                        $('.btn-reset').prop('disabled', false);
                                        $('#' + target + '_code').val(citem['code']).prop('disabled', true);
                                        $('#' + target + '_name').val(citem['gname']).prop('disabled', false);
                                        //$('#' + target + '_gnamechr').val(citem['codechr']).prop('disabled', false);
                                        //$('.btn-action').show();
                                        $('#' + target + '_code').parsley().destroy()
                                        $('#' + target + '_name').parsley().destroy()
                                        //$('#' + target + '_gnamechr').parsley().destroy()
                                        //$('#' + target + '_rec').parsley().destroy()
                                    } else if (key === 'delete') {
                                        $.Delete(citem);
                                    } else {
                                        alert('ERROR');
                                    }
                                },
                                items: {
                                    "view": { name: "View", icon: "fas fa-search" },
                                    /* "create": { name: "Create", icon: "fas fa-plus" },*/
                                    "edit": { name: "Edit", icon: "edit" },
                                    "delete": { name: "Delete", icon: "delete" },
                                }
                            });



                        },
                    });


                }
            })


        };

        $.Create = async function () {

            $('.btn-create').prop('disabled', true);

            target = target === '' ? 'gcode_a' : target

            if (target == 'gcode_a' || target == 'gcode_aexp') {

                let add_data = {
                    ctype: target,
                    function_type: 'create',
                    code: $('#' + target + '_code').val() == '' ? '' : $('#' + target + '_code').val().replace(/\s/g, ""),
                    gname: $('#' + target + '_name').val() == '' ? '' : $('#' + target + '_name').val().replace(/\s/g, ""),
                    codechr: $('#' + target + '_gnamechr').val() == '' ? '' : $('#' + target + '_gnamechr').val().replace(/\s/g, ""),
                    //rec: $('#' + target + '_rec').val() == '' ? '' : $('#' + target + '_rec').val(),
                    rec: '',
                    userid: name,
                };

                console.log('add_data', add_data);

                var params = [];
                for (const i in add_data) {
                    params.push(i + "=" + encodeURIComponent(add_data[i]));
                }

                fetch(url_gcode_action, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    // mode: 'no-cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    body: params.join("&"),
                }).then(data => {

                    toastr.success('Save Successfully!', async function () {

                        let log_code = $('#' + target + '_code').val() == '' ? '' : $('#' + target + '_code').val().replace(/\s/g, "");
                        
                        $.addLogEvent(target + '-' + log_code, 'VSM', 'create', '/master/code', 'OK');

                        $('input').val('');

                        if (target === 'gcode_a' || target === 'gcode_aexp') {
                            if (target === 'gcode_a') {
                                await oTable_gcode_a.destroy();
                                await $.List_gcode_a();
                            } else if (target == 'gcode_aexp') {
                                await oTable_gcode_aexp.destroy();
                                await $.List_gcode_aexp();
                            } else {
                                alert('Erorr')
                            }
                            $('#' + target + '_code').parsley().destroy()
                            $('#' + target + '_name').parsley().destroy()
                        } else {
                            if (target == 'gcode_b') {
                                await oTable_gcode_b.destroy();
                                await $.List_gcode_b();
                            } else if (target == 'gcode_bexp') {
                                await oTable_gcode_bexp.destroy();
                                await $.List_gcode_bexp();
                            } else if (target == 'gcode_c') {
                                await oTable_gcode_c.destroy();
                                await $.List_gcode_c();
                            } else if (target == 'gcode_cexp') {
                                await oTable_gcode_cexp.destroy();
                                await $.List_gcode_cexp();
                            } else if (target == 'gcode_d') {
                                await oTable_gcode_d.destroy();
                                await $.List_gcode_d();
                            } else if (target == 'gcode_dexp') {
                                await oTable_gcode_dexp.destroy();
                                await $.List_gcode_dexp();
                            } else if (target == 'gcode_e') {
                                await oTable_gcode_e.destroy();
                                await $.List_gcode_e();
                            } else if (target == 'gcode_eexp') {
                                await oTable_gcode_eexp.destroy();
                                await $.List_gcode_eexp();
                            } else {
                                alert('พัง')
                            }
                            $('#' + target + '_code').parsley().destroy()
                            $('#' + target + '_name').parsley().destroy()
                            //$('#' + target + '_gnamechr').parsley().destroy()

                        }

                        $('.btn-create').prop('disabled', false);

                        //$('#' + target + '_gnamechr').parsley().destroy()
                        $("#global-loader").fadeOut("slow");
                    });

                }).catch((error) => {

                    console.error('Error:', error);

                    $("#global-loader").fadeOut("slow");

                });


            } else {

                let add_data = {
                    ctype: target,
                    function_type: 'create',
                    code: $('#' + target + '_code').val() == '' ? '' : $('#' + target + '_code').val().replace(/\s/g, ""),
                    gname: $('#' + target + '_name').val() == '' ? '' : $('#' + target + '_name').val().replace(/\s/g, ""),
                    //codechr: $('#' + target + '_gnamechr').val() == '' ? '' : $('#' + target + '_gnamechr').val().replace(/\s/g, ""),
                    //rec: $('#' + target + '_rec').val() == '' ? '' : $('#' + target + '_rec').val(),
                    rec: '',
                    userid: name,
                };

                console.log('add_data', add_data);

                var params = [];
                for (const i in add_data) {
                    params.push(i + "=" + encodeURIComponent(add_data[i]));
                }

                fetch(url_gcode_action, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    // mode: 'no-cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    body: params.join("&"),
                }).then(data => {

                    toastr.success('Save Successfully!', async function () {

                        let log_code = $('#' + target + '_code').val() == '' ? '' : $('#' + target + '_code').val().replace(/\s/g, "");

                        $.addLogEvent(target + '-' + log_code, 'VSM', 'create', '/master/code', 'OK');

                        $('input').val('');

                        if (target === 'gcode_a' || target === 'gcode_aexp') {
                            if (target === 'gcode_a') {
                                await oTable_gcode_a.destroy();
                                await $.List_gcode_a();
                            } else if (target == 'gcode_aexp') {
                                await oTable_gcode_aexp.destroy();
                                await $.List_gcode_aexp();
                            } else {
                                alert('Erorr')
                            }
                            $('#' + target + '_code').parsley().destroy()
                            $('#' + target + '_name').parsley().destroy()
                        } else {
                            if (target == 'gcode_b') {
                                await oTable_gcode_b.destroy();
                                await $.List_gcode_b();
                            } else if (target == 'gcode_bexp') {
                                await oTable_gcode_bexp.destroy();
                                await $.List_gcode_bexp();
                            } else if (target == 'gcode_c') {
                                await oTable_gcode_c.destroy();
                                await $.List_gcode_c();
                            } else if (target == 'gcode_cexp') {
                                await oTable_gcode_cexp.destroy();
                                await $.List_gcode_cexp();
                            } else if (target == 'gcode_d') {
                                await oTable_gcode_d.destroy();
                                await $.List_gcode_d();
                            } else if (target == 'gcode_dexp') {
                                await oTable_gcode_dexp.destroy();
                                await $.List_gcode_dexp();
                            } else if (target == 'gcode_e') {
                                await oTable_gcode_e.destroy();
                                await $.List_gcode_e();
                            } else if (target == 'gcode_eexp') {
                                await oTable_gcode_eexp.destroy();
                                await $.List_gcode_eexp();
                            } else {
                                alert('พัง')
                            }
                            $('#' + target + '_code').parsley().destroy()
                            $('#' + target + '_name').parsley().destroy()
                            //$('#' + target + '_gnamechr').parsley().destroy()

                        }

                        $('.btn-create').prop('disabled', false);

                        //$('#' + target + '_gnamechr').parsley().destroy()
                        $("#global-loader").fadeOut("slow");

                    });

                }).catch((error) => {

                    console.error('Error:', error);

                    $("#global-loader").fadeOut("slow");

                });

            }

            //if ($('#' + target + '_code').val() == '' || $('#' + target + '_name').val() == '' || $('#' + target + '_gnamechr').val() == '') {

            //    $('#' + target + '_code').parsley().validate()
            //    $('#' + target + '_name').parsley().validate()
            //    $('#' + target + '_gnamechr').parsley().validate()
            //    //$('#' + target + '_rec').parsley().validate()
            //    $("#global-loader").fadeOut("slow");

            //} else {

            return false;

            /*  }*/

        };

        $.Update = async function () {

            $('.ck-code').addClass('d-none');

            $('.btn-update').prop('disabled', true);

            target = target == '' ? 'gcode_a' : target


            if ($('#' + target + '_name').val() == '' || $('#' + target + '_gnamechr').val() == '') {

                $('#' + target + '_name').parsley().validate()
                $('#' + target + '_gnamechr').parsley().validate()
                //$('#' + target + '_rec').parsley().validate()
                $("#global-loader").fadeOut("slow");
                $('.btn-update').prop('disabled', false);

            } else {

                if (target == 'gcode_a' || target == 'gcode_aexp') {
                    let add_data = {
                        ctype: target,
                        function_type: 'update',
                        code: $('#' + target + '_code').val(),
                        gname: $('#' + target + '_name').val().replace(/\s/g, ""),
                        codechr: $('#' + target + '_gnamechr').val().replace(/\s/g, ""),
                        //rec: $('#' + target + '_rec').val(),
                        userid: name,
                    };

                    console.log('add_data', add_data);

                    var params = [];
                    for (const i in add_data) {
                        params.push(i + "=" + encodeURIComponent(add_data[i]));
                    }

                    fetch(url_gcode_action, {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        // mode: 'no-cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        body: params.join("&"),
                    }).then(data => {

                        toastr.success('Save Successfully!', async function () {

                            let log_code = $('#' + target + '_code').val() == '' ? '' : $('#' + target + '_code').val().replace(/\s/g, "");

                            $.addLogEvent(target + '-' + log_code, 'VSM', 'update', '/master/code', 'OK');

                            $('#' + target + '_code').prop('disabled', false);
                            $('input').val('');
                            $('.btn-update').prop('disabled', false);
                            if (target === 'gcode_a' || target === 'gcode_aexp') {

                                if (target === 'gcode_a') {
                                    await oTable_gcode_a.destroy();
                                    await $.List_gcode_a();
                                } else if (target == 'gcode_aexp') {
                                    await oTable_gcode_aexp.destroy();
                                    await $.List_gcode_aexp();
                                } else {
                                    alert('Erorr')
                                }

                                $('#' + target + '_code').parsley().destroy()
                                $('#' + target + '_name').parsley().destroy()

                            } else {

                                if (target == 'gcode_b') {
                                    await oTable_gcode_b.destroy();
                                    await $.List_gcode_b();
                                } else if (target == 'gcode_bexp') {
                                    await oTable_gcode_bexp.destroy();
                                    await $.List_gcode_bexp();
                                } else if (target == 'gcode_c') {
                                    await oTable_gcode_c.destroy();
                                    await $.List_gcode_c();
                                } else if (target == 'gcode_cexp') {
                                    await oTable_gcode_cexp.destroy();
                                    await $.List_gcode_cexp();
                                } else if (target == 'gcode_d') {
                                    await oTable_gcode_d.destroy();
                                    await $.List_gcode_d();
                                } else if (target == 'gcode_dexp') {
                                    await oTable_gcode_dexp.destroy();
                                    await $.List_gcode_dexp();
                                } else if (target == 'gcode_e') {
                                    await oTable_gcode_e.destroy();
                                    await $.List_gcode_e();
                                } else if (target == 'gcode_eexp') {
                                    await oTable_gcode_eexp.destroy();
                                    await $.List_gcode_eexp();
                                } else {
                                    alert('พัง')
                                }
                                $('#' + target + '_code').parsley().destroy()
                                $('#' + target + '_name').parsley().destroy()
                                //$('#' + target + '_gnamechr').parsley().destroy()

                            }

                            $("#global-loader").fadeOut("slow");
                        });

                    }).catch((error) => {

                        console.error('Error:', error);

                    });

                } else {

                    let add_data = {
                        ctype: target,
                        function_type: 'update',
                        code: $('#' + target + '_code').val(),
                        gname: $('#' + target + '_name').val().replace(/\s/g, ""),
                        //codechr: $('#' + target + '_gnamechr').val().replace(/\s/g, ""),
                        //rec: $('#' + target + '_rec').val(),
                        userid: name,
                    };

                    console.log('add_data', add_data);

                    var params = [];
                    for (const i in add_data) {
                        params.push(i + "=" + encodeURIComponent(add_data[i]));
                    }

                    fetch(url_gcode_action, {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        // mode: 'no-cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        body: params.join("&"),
                    }).then(data => {

                        toastr.success('Save Successfully!', async function () {

                            let log_code = $('#' + target + '_code').val() == '' ? '' : $('#' + target + '_code').val().replace(/\s/g, "");

                            $.addLogEvent(target + '-' + log_code, 'VSM', 'update', '/master/code', 'OK');

                            $('#' + target + '_code').prop('disabled', false);
                            $('input').val('');
                            $('.btn-update').prop('disabled', false);
                            if (target === 'gcode_a' || target === 'gcode_aexp') {
                                if (target === 'gcode_a') {
                                    await oTable_gcode_a.destroy();
                                    await $.List_gcode_a();
                                } else if (target == 'gcode_aexp') {
                                    await oTable_gcode_aexp.destroy();
                                    await $.List_gcode_aexp();
                                } else {
                                    alert('Erorr')
                                }
                                $('#' + target + '_code').parsley().destroy()
                                $('#' + target + '_name').parsley().destroy()
                            } else {
                                if (target == 'gcode_b') {
                                    await oTable_gcode_b.destroy();
                                    await $.List_gcode_b();
                                } else if (target == 'gcode_bexp') {
                                    await oTable_gcode_bexp.destroy();
                                    await $.List_gcode_bexp();
                                } else if (target == 'gcode_c') {
                                    await oTable_gcode_c.destroy();
                                    await $.List_gcode_c();
                                } else if (target == 'gcode_cexp') {
                                    await oTable_gcode_cexp.destroy();
                                    await $.List_gcode_cexp();
                                } else if (target == 'gcode_d') {
                                    await oTable_gcode_d.destroy();
                                    await $.List_gcode_d();
                                } else if (target == 'gcode_dexp') {
                                    await oTable_gcode_dexp.destroy();
                                    await $.List_gcode_dexp();
                                } else if (target == 'gcode_e') {
                                    await oTable_gcode_e.destroy();
                                    await $.List_gcode_e();
                                } else if (target == 'gcode_eexp') {
                                    await oTable_gcode_eexp.destroy();
                                    await $.List_gcode_eexp();
                                } else {
                                    alert('พัง')
                                }
                                $('#' + target + '_code').parsley().destroy()
                                $('#' + target + '_name').parsley().destroy()
                                //$('#' + target + '_gnamechr').parsley().destroy()

                            }

                            $("#global-loader").fadeOut("slow");
                        });

                    }).catch((error) => {

                        console.error('Error:', error);

                    });

                }
            }
        };

        $.Delete = async function (citem) {

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
                    let delete_data = {
                        code: citem['code'],
                        ctype: target,
                        function_type: 'delete',
                        userid: name,

                    };

                    var params = [];
                    for (const i in delete_data) {
                        params.push(i + "=" + encodeURIComponent(delete_data[i]));
                    }

                    fetch(url_gcode_action, {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        // mode: 'no-cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        body: params.join("&"),
                    }).then(data => {

                        toastr.success('Save Successfully!', async function () {

                            let log_code = $('#' + target + '_code').val() == '' ? '' : $('#' + target + '_code').val().replace(/\s/g, "");

                            $.addLogEvent(target + '-' + citem['code'], 'VSM', 'delete', '/master/code', 'OK');

                            $('#' + ck_target + '_code').prop('disabled', false);
                            $('#' + ck_target + '_name').prop('disabled', false);
                            $('#' + ck_target + '_gnamechr').prop('disabled', false);
                            $('input').val('');

                            if (target === 'gcode_a' || target === 'gcode_aexp') {
                                if (target === 'gcode_a') {
                                    await oTable_gcode_a.destroy();
                                    await $.List_gcode_a();
                                } else if (target == 'gcode_aexp') {
                                    await oTable_gcode_aexp.destroy();
                                    await $.List_gcode_aexp();
                                } else {
                                    alert('Erorr')
                                }
                                $('#' + target + '_code').parsley().destroy()
                                $('#' + target + '_name').parsley().destroy()
                            } else {
                                if (target == 'gcode_b') {
                                    await oTable_gcode_b.destroy();
                                    await $.List_gcode_b();
                                } else if (target == 'gcode_bexp') {
                                    await oTable_gcode_bexp.destroy();
                                    await $.List_gcode_bexp();
                                } else if (target == 'gcode_c') {
                                    await oTable_gcode_c.destroy();
                                    await $.List_gcode_c();
                                } else if (target == 'gcode_cexp') {
                                    await oTable_gcode_cexp.destroy();
                                    await $.List_gcode_cexp();
                                } else if (target == 'gcode_d') {
                                    await oTable_gcode_d.destroy();
                                    await $.List_gcode_d();
                                } else if (target == 'gcode_dexp') {
                                    await oTable_gcode_dexp.destroy();
                                    await $.List_gcode_dexp();
                                } else if (target == 'gcode_e') {
                                    await oTable_gcode_e.destroy();
                                    await $.List_gcode_e();
                                } else if (target == 'gcode_eexp') {
                                    await oTable_gcode_eexp.destroy();
                                    await $.List_gcode_eexp();
                                } else {
                                    alert('พัง')
                                }
                                $('#' + target + '_code').parsley().destroy(),
                                    $('#' + target + '_name').parsley().destroy()
                                //$('#' + target + '_gnamechr').parsley().destroy()
                            }
                            $('.ck-code').addClass('d-none');
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        });

                    }).catch((error) => {

                        console.error('Error:', error);
                    });
                }
            })

        };

        $.Ck_code = async function () {

            //if (type == 'create') {

            target = target === '' ? 'gcode_a' : target

            console.log("ck_code target", target);

            $('.btn-create').prop('disabled', true);

            $('#' + target + '_code').off('keyup').on('keyup', function (evt) {

                evt.preventDefault();

                $(document).keyup(function (evt) {
                    if (evt.keyCode == 32) {
                        evt.preventDefault();
                    }
                });

                if ($(this).val().replace(/\s/g, '') == '0' || $(this).val().replace(/\s/g, '') == '00' || $(this).val().replace(/\s/g, '') == '000' || $(this).val().replace(/\s/g, '') == '0000' || $(this).val().replace(/\s/g, '') == '00000' || $(this).val() == '000000') {

                    $('.btn-create').prop('disabled', true);
                    $('.alert-inner--text').html('<strong>' + 'Warning!' + '</strong>' + ' กรุณาเปลี่ยนรหัสสินค้าใหม่!');
                    $('.ck-code').removeClass('d-none');
                    check_dup_code = 0;

                } else {

                    if ($(this).val().length > 0) {

                        let get_ck = new URL(url_gcode_get);

                        get_ck.search = new URLSearchParams({

                            code: $('#' + target + '_code').val(),
                            ctype: target == '' ? 'gcode_a' : target,

                        });

                        fetch(get_ck).then(function (response) {

                            return response.json();

                        }).then(function (result) {

                            if (result.length > 0) {

                                check_dup_code = 1
                                $('.alert-inner--text').html('<strong>' + 'Warning!' + '</strong>' + ' รหัสสินค้าซ้ำ กรุณาเปลี่ยนใหม่!');
                                $('.ck-code').removeClass('d-none');
                                $('.btn-create').prop('disabled', true);
                                $('.btn-update').prop('disabled', true);
                                $('.btn-reset').prop('disabled', false);

                            } else {
                                check_dup_code = 0
                                $('.ck-code').addClass('d-none');
                                $('.btn-create').prop('disabled', false);
                                $('.btn-update').prop('disabled', false);
                            }

                        });

                    } else {

                        $('.ck-code').addClass('d-none');
                        $('.btn-create').prop('disabled', false);
                    }
                }

                /* return false;*/
            });

            $('#' + target + '_name').off('keyup').on('keyup', function (evt) {

                evt.preventDefault();

                if ($(this).val() == '' || $(this).val().length < 0) {

                    $('.btn-create').prop('disabled', true);

                    check_dup_code = 0;

                } else {

                    if ($(this).val().length > 0) {

                        let get_ck = new URL(url_gcode_get);

                        get_ck.search = new URLSearchParams({

                            gname: $('#' + target + '_name').val(),
                            ctype: target == '' ? 'gcode_a' : target,

                        });

                        fetch(get_ck).then(function (response) {

                            return response.json();

                        }).then(function (result) {

                            if (result.length > 0) {

                                check_dup_code = 1
                                $('.alert-inner--text').html('<strong>' + 'Warning!' + '</strong>' + ' ชื่อสินค้าซ้ำ กรุณาเปลี่ยนใหม่!');
                                $('.ck-code').removeClass('d-none');
                                $('.btn-create').prop('disabled', true);
                                $('.btn-update').prop('disabled', true);
                                $('.btn-reset').prop('disabled', false);

                            } else {
                                check_dup_code = 0
                                $('.ck-code').addClass('d-none');
                                $('.btn-create').prop('disabled', false);
                                $('.btn-update').prop('disabled', false);
                            }

                        });

                    } else {

                        $('.ck-code').addClass('d-none');
                        $('.btn-create').prop('disabled', false);
                    }
                }

                /* return false;*/
            });

            $('#' + target + '_gnamechr').off('keyup').on('keyup', function (evt) {

                evt.preventDefault();

                if ($(this).val() == '000') {

                    $('.btn-create').prop('disabled', true);

                    check_dup_code = 0;

                } else {

                    if ($(this).val().length > 0) {

                        let get_ck = new URL(url_gcode_get);

                        get_ck.search = new URLSearchParams({

                            codechr: $('#' + target + '_gnamechr').val(),
                            ctype: target == '' ? 'gcode_a' : target,

                        });

                        fetch(get_ck).then(function (response) {

                            return response.json();

                        }).then(function (result) {

                            if (result.length > 0) {

                                check_dup_code = 1
                                $('.alert-inner--text').html('<strong>' + 'Warning!' + '</strong>' + ' กลุ่มสินค้าซ้ำ กรุณาเปลี่ยนใหม่!');
                                $('.ck-code').removeClass('d-none');
                                $('.btn-create').prop('disabled', true);
                                $('.btn-update').prop('disabled', true);
                                $('.btn-reset').prop('disabled', false);

                            } else {
                                check_dup_code = 0
                                $('.ck-code').addClass('d-none');
                                $('.btn-create').prop('disabled', false);
                                $('.btn-update').prop('disabled', false);
                            }

                        });

                    } else {

                        $('.ck-code').addClass('d-none');
                        $('.btn-create').prop('disabled', false);
                    }
                }

                /*return false;*/
            });

            //}

            //console.log('type',type);
        };

        $.Ck_create = async function () {
            $("#global-loader").fadeIn("slow");
            //let url = new URL(url_gcode_chk);

            //if ($('#' + target + '_code').val().replace(/\s/g, "").length === 6) {

            //    url.search = new URLSearchParams({

            //        ctype: target == '' ? 'gcode_a' : target,
            //        code: $('#' + target + '_code').val() == '' ? '' : $('#' + target + '_code').val().replace(/\s/g, ""),
            //        gname: $('#' + target + '_name').val() == '' ? '' : $('#' + target + '_name').val(),
            //        codechr: $('#' + target + '_gnamechr').val() == '' ? '' : $('#' + target + '_gnamechr').val(),

            //    });

            //    fetch(url).then(function (response) {
            //        return response.json();
            //    }).then(function (result) {

            //        console.log('result', result)
            //        $.each(result.data, function (key, val) {

            //            if (val['chk_dup'] == 1) {

            //                $('.ck-code').removeClass('alert-warning');
            //                $('.ck-code').addClass('alert-danger text-center');
            //                $('.alert-inner--text').html('<strong>' + 'Warning!' + '</strong>' + ' ไม่สามารถสร้างรายการนี้ได้!');
            //                $('.ck-code').removeClass('d-none');
            //                $('.btn-create').prop('disabled', true);

            //            } else {

            //                $.Create();
            //                //alert('create')

            //            }

            //        });

            //    })


            //} else {

            //    $('.ck-code').removeClass('alert-warning');
            //    $('.ck-code').addClass('alert-danger text-center');
            //    $('.alert-inner--text').html('<strong>' + 'Warning!' + '</strong>' + ' ไม่สามารถสร้างรายการนี้ได้!');
            //    $('.ck-code').removeClass('d-none');
            //    $('.btn-create').prop('disabled', true);

            //    $('#' + target + '_code').val($('#' + target + '_code').val().replace(/\s/g, ""));

            //}




            if (target == 'gcode_a' || target == 'gcode_aexp') {

                if ($('#' + target + '_code').val().replace(/\s/g, "").length === 6) {

                    if ($('#' + target + '_code').val() == '' || $('#' + target + '_name').val() == '' || $('#' + target + '_gnamechr').val() == '') {

                        $('#' + target + '_code').parsley().validate()
                        $('#' + target + '_name').parsley().validate()
                        $('#' + target + '_gnamechr').parsley().validate()
                        $("#global-loader").fadeOut("slow");

                    } else {

                        let url = new URL(url_gcode_chk);

                        url.search = new URLSearchParams({

                            ctype: target == '' ? 'gcode_a' : target,
                            code: $('#' + target + '_code').val() == '' ? '' : $('#' + target + '_code').val().replace(/\s/g, ""),
                            gname: $('#' + target + '_name').val() == '' ? '' : $('#' + target + '_name').val().replace(/\s/g, ""),
                            codechr: $('#' + target + '_gnamechr').val() == '' ? '' : $('#' + target + '_gnamechr').val().replace(/\s/g, ""),
                            //code: $('#' + target + '_code').val() == '' ? '' : $('#' + target + '_code').val(),
                            //gname: $('#' + target + '_name').val() == '' ? '' : $('#' + target + '_name').val(),
                            //codechr: $('#' + target + '_gnamechr').val() == '' ? '' : $('#' + target + '_gnamechr').val(),
                        });

                        fetch(url).then(function (response) {
                            return response.json();
                        }).then(function (result) {

                            $.each(result.data, function (key, val) {

                                if (val['chk_dup'] > 0) {

                                    $('.ck-code').removeClass('alert-warning');
                                    $('.ck-code').addClass('alert-danger text-center');
                                    $('.alert-inner--text').html('<strong>' + 'Warning!' + '</strong>' + ' ไม่สามารถสร้างรายการนี้ได้!');
                                    $('.ck-code').removeClass('d-none');
                                    $('.btn-create').prop('disabled', true);
                                    $("#global-loader").fadeOut("slow");
                                    $('#' + target + '_code').val($('#' + target + '_code').val().replace(/\s/g, ""));
                                    $('#' + target + '_name').val($('#' + target + '_name').val().replace(/\s/g, ""));
                                    $('#' + target + '_gnamechr').val($('#' + target + '_gnamechr').val().replace(/\s/g, ""));

                                } else {
                                    $.Create();
                                    //alert('create')

                                }

                            });

                        })

                    }

                } else {

                    $('.ck-code').removeClass('alert-warning');
                    $('.ck-code').addClass('alert-danger text-center');
                    $('.alert-inner--text').html('<strong>' + 'Warning!' + '</strong>' + ' กรอกรหัสสินค้าไม่ครบ');
                    $('.ck-code').removeClass('d-none');
                    $('.btn-create').prop('disabled', true);
                    $('#' + target + '_code').val($('#' + target + '_code').val().replace(/\s/g, ""));
                    $('#' + target + '_name').val($('#' + target + '_name').val().replace(/\s/g, ""));
                    $('#' + target + '_gnamechr').val($('#' + target + '_gnamechr').val().replace(/\s/g, ""));
                    $("#global-loader").fadeOut("slow");
                }

            } else if (target == 'gcode_b' || target == 'gcode_bexp' || target == 'gcode_c' || target == 'gcode_cexp' || target == 'gcode_e' || target == 'gcode_eexp') {

                if ($('#' + target + '_code').val().replace(/\s/g, "").length === 4) {

                    if ($('#' + target + '_code').val() == '' || $('#' + target + '_name').val() == '') {

                        $('#' + target + '_code').parsley().validate()
                        $('#' + target + '_name').parsley().validate()
                        //$('#' + target + '_gnamechr').parsley().validate()
                        $("#global-loader").fadeOut("slow");

                    } else {

                        let url = new URL(url_gcode_chk);

                        url.search = new URLSearchParams({

                            ctype: target == '' ? 'gcode_a' : target,
                            code: $('#' + target + '_code').val() == '' ? '' : $('#' + target + '_code').val(),
                            gname: $('#' + target + '_name').val() == '' ? '' : $('#' + target + '_name').val(),
                            //codechr: $('#' + target + '_gnamechr').val() == '' ? '' : $('#' + target + '_gnamechr').val(),

                        });

                        fetch(url).then(function (response) {
                            return response.json();
                        }).then(function (result) {

                            $.each(result.data, function (key, val) {

                                if (val['chk_dup'] > 0) {

                                    $('.ck-code').removeClass('alert-warning');
                                    $('.ck-code').addClass('alert-danger text-center');
                                    $('.alert-inner--text').html('<strong>' + 'Warning!' + '</strong>' + ' ไม่สามารถสร้างรายการนี้ได้!');
                                    $('.ck-code').removeClass('d-none');
                                    $('.btn-create').prop('disabled', true);
                                    $("#global-loader").fadeOut("slow");
                                    $('#' + target + '_code').val($('#' + target + '_code').val().replace(/\s/g, ""));
                                    $('#' + target + '_name').val($('#' + target + '_name').val().replace(/\s/g, ""));
                                } else {
                                    $.Create();
                                    //alert('create')

                                }

                            });

                        })

                    }

                } else {

                    $('.ck-code').removeClass('alert-warning');
                    $('.ck-code').addClass('alert-danger text-center');
                    $('.alert-inner--text').html('<strong>' + 'Warning!' + '</strong>' + ' กรอกรหัสสินค้าไม่ครบ');
                    $('.ck-code').removeClass('d-none');
                    $('.btn-create').prop('disabled', true);
                    $('#' + target + '_code').val($('#' + target + '_code').val().replace(/\s/g, ""));
                    $('#' + target + '_name').val($('#' + target + '_name').val().replace(/\s/g, ""));
                    $("#global-loader").fadeOut("slow");
                }

                //if ($('#' + target + '_code').val() == '' || $('#' + target + '_name').val() == '') {

                //    $('#' + target + '_code').parsley().validate()
                //    $('#' + target + '_name').parsley().validate()
                //    $("#global-loader").fadeOut("slow");

                //} else {

                //    let url = new URL(url_gcode_chk);

                //    url.search = new URLSearchParams({

                //        ctype: target == '' ? 'gcode_a' : target,
                //        code: $('#' + target + '_code').val() == '' ? '' : $('#' + target + '_code').val(),
                //        gname: $('#' + target + '_name').val() == '' ? '' : $('#' + target + '_name').val(),
                //       /* codechr: $('#' + target + '_gnamechr').val() == '' ? '' : $('#' + target + '_gnamechr').val(),*/

                //    });

                //    fetch(url).then(function (response) {
                //        return response.json();
                //    }).then(function (result) {

                //        $.each(result.data, function (key, val) {

                //            if (val['chk_dup'] > 0) {

                //                $('.ck-code').removeClass('alert-warning');
                //                $('.ck-code').addClass('alert-danger text-center');
                //                $('.alert-inner--text').html('<strong>' + 'Warning!' + '</strong>' + ' ไม่สามารถสร้างรายการนี้ได้!');
                //                $('.ck-code').removeClass('d-none');
                //                $('.btn-create').prop('disabled', true);

                //            } else {

                //                $.Create();

                //            }

                //        });

                //    })

                //}
            } else {

                if ($('#' + target + '_code').val().replace(/\s/g, "").length === 3) {

                    if ($('#' + target + '_code').val() == '' || $('#' + target + '_name').val() == '') {

                        $('#' + target + '_code').parsley().validate()
                        $('#' + target + '_name').parsley().validate()
                        //$('#' + target + '_gnamechr').parsley().validate()
                        $("#global-loader").fadeOut("slow");

                    } else {

                        let url = new URL(url_gcode_chk);

                        url.search = new URLSearchParams({

                            ctype: target == '' ? 'gcode_a' : target,
                            code: $('#' + target + '_code').val() == '' ? '' : $('#' + target + '_code').val(),
                            gname: $('#' + target + '_name').val() == '' ? '' : $('#' + target + '_name').val(),
                            codechr: $('#' + target + '_gnamechr').val() == '' ? '' : $('#' + target + '_gnamechr').val(),

                        });

                        fetch(url).then(function (response) {
                            return response.json();
                        }).then(function (result) {

                            $.each(result.data, function (key, val) {

                                if (val['chk_dup'] > 0) {

                                    $('.ck-code').removeClass('alert-warning');
                                    $('.ck-code').addClass('alert-danger text-center');
                                    $('.alert-inner--text').html('<strong>' + 'Warning!' + '</strong>' + ' ไม่สามารถสร้างรายการนี้ได้!');
                                    $('.ck-code').removeClass('d-none');
                                    $('.btn-create').prop('disabled', true);
                                    $("#global-loader").fadeOut("slow");
                                    $('#' + target + '_code').val($('#' + target + '_code').val().replace(/\s/g, ""));
                                    $('#' + target + '_name').val($('#' + target + '_name').val().replace(/\s/g, ""));
                                } else {
                                    $.Create();
                                    //alert('create')

                                }

                            });

                        })

                    }

                } else {

                    $('.ck-code').removeClass('alert-warning');
                    $('.ck-code').addClass('alert-danger text-center');
                    $('.alert-inner--text').html('<strong>' + 'Warning!' + '</strong>' + ' กรอกรหัสสินค้าไม่ครบ');
                    $('.ck-code').removeClass('d-none');
                    $('.btn-create').prop('disabled', true);
                    $('#' + target + '_code').val($('#' + target + '_code').val().replace(/\s/g, ""));
                    $('#' + target + '_name').val($('#' + target + '_name').val().replace(/\s/g, ""));
                    $("#global-loader").fadeOut("slow");
                }
            }



        };

        $(document).ready(async function () {

            await $.init();

            $.addLogEvent('', 'VSM', 'visit', '/master/code', 'OK');

        });

    } else {

        window.location.assign('./login');

    }

});