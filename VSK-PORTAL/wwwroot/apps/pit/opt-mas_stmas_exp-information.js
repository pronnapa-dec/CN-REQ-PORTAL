'use strict';

const url_api = 'http://localhost:49705';
//const url_api = "http://192.168.1.247:8899/pit-api";
const url_stmas_get = url_api + '/api/STMAS_GET';
const url_gcode_keywords_get = url_api + '/api/GCODE_KEYWORDS_GET';
const url_itemmater_search = url_api + '/api/ITEMMASTER_SREARCH';
const url_glb_vehicle_code5_get = url_api + '/api/GLB_VEHICLE_CODE5_GET';
const url_stmas_exp_import_create = url_api + '/api/STMAS_EXP_IMPORT_CREATE';
const url_stmas_exp_import_verify = url_api + '/api/STMAS_EXP_IMPORT_VERIFY';
const url_stmas_exp_import_get = url_api + '/api/STMAS_EXP_IMPORT_GET';
const url_stmas_exp_import_update = url_api + '/api/STMAS_EXP_IMPORT_UPDATE';
const url_stmas_exp_list = url_api + '/api/STMAS_EXP_LIST';

const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const user_id = objProfile[0]['username'];
let action_type = '';
let ref_id = ''
let table_list;
let url_location = window.location.href;

let gcode_a_name = '', gcode_b_name = '', gcode_c_name = '', gcode_d_name = '', gcode_e_name = '', code_e_select = '', sm_name = ''

let customElement = $("<div>", {
    "css": {
        "border": "2px solid",
        "font-size": "14px",
        "text-align": "center",
        "padding": '7px'

    },
    "text": 'Please Wait...'
});

let customChecking = $("<div>", {
    "css": {
        "border": "2px solid",
        "font-size": "14px",
        "text-align": "center",
        "padding": '7px'

    },
    "text": 'Checking...'
});

let customCreating = $("<div>", {
    "css": {
        "border": "2px solid",
        "font-size": "14px",
        "text-align": "center",
        "padding": '7px'

    },
    "text": 'Creating...'
});

let customUpdating = $("<div>", {
    "css": {
        "border": "2px solid",
        "font-size": "14px",
        "text-align": "center",
        "padding": '7px'

    },
    "text": 'Updating...'
});

$(document).ready(async function () {

    $('.btn-action').addClass('d-none');
    await $.init();
    await $.master();
    await $.gcode_get();

});

$.init = async function () {

    $('#btn-item_create').click(async function (e) {

        e.preventDefault();

        action_type = 'CREATE_DATA'

        ref_id = $.uuid();

        $('#frm_data').find('#sm_code').prop('disabled', false);
        $('#frm_data').find('#gcode_a').prop('disabled', false);
        $('#frm_data').find('#gcode_e').prop('disabled', false);
        $('#frm_data').find('#gcode_c').prop('disabled', false);
        $('#frm_data').find('#gcode_b').prop('disabled', false);
        $('#frm_data').find('#gcode_d').prop('disabled', false);
        $('#frm_data').find('#car_type').prop('disabled', false);
        $('#frm_data').find('#ussage_per_car').prop('disabled', false);
        $('#frm_data').find('#remarks').prop('disabled', false);

        $('#modal-frm_data').on('shown.bs.modal', async function () {

            $('#frm_data').find('#sm_e_code').val("");
            $('#frm_data').find('#sm_e_name').val("");
            $('#frm_data').find("#gcode_a option").remove();
            $('#frm_data').find("#gcode_b option").remove();
            $('#frm_data').find("#gcode_c option").remove();
            $('#frm_data').find("#gcode_d option").remove();
            $('#frm_data').find("#gcode_e option").remove();

        })

    });

    $('#modal-frm_data').on('hidden.bs.modal', async function () {
        await $('#frm_data').find('select').val('').trigger('change')
        await $('#frm_data').find('input').val('')
        $("#frm_data").parsley().reset();
        $('.alert-warning').addClass('d-none')
        $('.tx-alert').text('');
        $('.btn-action').addClass('d-none');
    });

    $('#frm_data').find('#sm_code').on('select2:select', async function (e) {

        e.preventDefault

        var a_data = e.params.data;
        var sm_data = a_data.sm_data;

        sm_name = sm_data.name

        $('#frm_data').find('input').val('');
        $('#frm_data').find('textarea').val('');

        $('#frm_data').find('#gbarcode').val(sm_data.gbarcode);
        $('#frm_data').find('#spcodes').val(sm_data.spcodes);
        $('#frm_data').find('#chrcode').val(sm_data.chrcode);
        $('#frm_data').find('#gcode_a').val(sm_data.gcode_a).trigger('change');
        $('#frm_data').find('#gcode_e').val(sm_data.gcode_e).trigger('change');
        $('#frm_data').find('#gcode_c').val(sm_data.gcode_c).trigger('change');
        $('#frm_data').find('#gcode_b').val(sm_data.gcode_b).trigger('change');
        $('#frm_data').find('#gcode_d').val(sm_data.gcode_d).trigger('change');
        $('#frm_data').find('#oem').val(sm_data.goem);
        $('#frm_data').find('#car_brand').val(sm_data.carbrand);
        $('#frm_data').find('#car_model').val(sm_data.carmodel);
        $('#frm_data').find('#car_year').val(sm_data.caryear);
        $('#frm_data').find('#car_type').val(sm_data.cartype);
        $('#frm_data').find('#qty').val(0);
        $('#frm_data').find('#uom').val(sm_data.uom);
        $('#frm_data').find('#g_model').val('');
        $('#frm_data').find('#car_fmyear').val(sm_data.carfmyear);
        $('#frm_data').find('#car_toyear').val(sm_data.cartoyear);
        $('#frm_data').find('#car_generation').val(sm_data.cargeneration);
        $('#frm_data').find('#car_engine').val(sm_data.carengine);
        $('#frm_data').find('#car_body').val(sm_data.carbody);
        $('#frm_data').find('#remarks').val('');
        $('#frm_data').find('#item_group').val(sm_data.itemgroup);
        $('#frm_data').find('#group_name').val(sm_data.groupname);

    });

    $('#frm_data').find('.gcode').on('change', async function (e) {

        e.preventDefault

        if (action_type == 'UPDATE_DATA') {
            $('#frm_data').find('#sm_e_name').val("");
        } else {
            $('#frm_data').find('#sm_e_code').val("");
            $('#frm_data').find('#sm_e_name').val("");
        }

        let code1 = $('#frm_data').find('#gcode_a').val() == null ? '' : $('#frm_data').find('#gcode_a').val()
        let code2 = $('#frm_data').find('#gcode_b').val() == null ? '' : $('#frm_data').find('#gcode_b').val()
        let code3 = $('#frm_data').find('#gcode_c').val() == null ? '' : $('#frm_data').find('#gcode_c').val()
        let code4 = $('#frm_data').find('#gcode_d').val() == null ? '' : $('#frm_data').find('#gcode_d').val()
        let code5 = $('#frm_data').find('#gcode_e').val() == null ? '' : $('#frm_data').find('#gcode_e').val()
        let name1 = '';
        let name2 = '';
        let name3 = '';
        let name4 = '';
        let name5 = '';

        await $('#frm_data').find('#gcode_a').off('select2:select').on('select2:select', async function (e) {

            e.preventDefault

            var a_data = e.params.data;
            code1 = a_data.id
            name1 = a_data.name
            gcode_a_name = a_data.name

        });

        await $('#frm_data').find('#gcode_b').off('select2:select').on('select2:select', async function (e) {

            e.preventDefault

            var a_data = e.params.data;
            code2 = a_data.id
            name2 = a_data.name
            gcode_b_name = a_data.name

        });

        await $('#frm_data').find('#gcode_c').off('select2:select').on('select2:select', async function (e) {

            e.preventDefault

            var a_data = e.params.data;
            code3 = a_data.id
            name3 = a_data.name
            gcode_c_name = a_data.name
        });

        await $('#frm_data').find('#gcode_d').off('select2:select').on('select2:select', async function (e) {

            e.preventDefault

            var a_data = e.params.data;
            code4 = a_data.id
            name4 = a_data.name
            gcode_d_name = a_data.name
        });

        await $('#frm_data').find('#gcode_e').off('select2:select').on('select2:select', async function (e) {

            e.preventDefault

            var a_data = e.params.data;
            code5 = a_data.id
            name5 = a_data.name
            gcode_e_name = a_data.name

            await fetch(url_glb_vehicle_code5_get + '?keywords=' + a_data.id).then(function (response) {
                return response.json();
            }).then(function (result) {

                if (result.status === 'Error') {

                    toastr.error('Oops! An Error Occurred');

                } else {

                    $('#frm_data').find('.glb_code_e').val('');

                    if (result.length > 0) {

                        $('#frm_data').find('#car_brand').val(result.data[0]['carbrand']);
                        $('#frm_data').find('#car_model').val(result.data[0]['model_name']);
                        $('#frm_data').find('#car_fmyear').val(result.data[0]['carFmyear']);
                        $('#frm_data').find('#car_toyear').val(result.data[0]['carToyear']);
                        $('#frm_data').find('#car_generation').val(result.data[0]['carGeneration']);
                        $('#frm_data').find('#car_type').val(result.data[0]['cartype']);

                    }

                }

            });

        });

        let concat_code = code1 + '-' + code2 + '-' + code3 + '-' + code4 + '-' + code5
        let concat_name = gcode_a_name + '-' + gcode_e_name + '-' + gcode_c_name + '-' + gcode_b_name + '-' + gcode_d_name;

        //if (action_type == 'CREATE_DATA' || action_type == 'UPDATE_DATA') {
        //    await $('#sm_e_code').val(concat_code)
        //    await $('#sm_e_name').val(concat_name)
        //}

        if (action_type == 'UPDATE_DATA') {
            $('#frm_data').find('#sm_e_name').val(concat_name);
        } else {
            $('#frm_data').find('#sm_e_code').val(concat_code);
            $('#frm_data').find('#sm_e_name').val(concat_name);
        }

        if ($('#frm_data').find('#sm_e_code').val().length == 25) {
            if (action_type == 'CREATE_DATA') {
                $('#btn-save_exit').removeClass('d-none');
            } else {
            }
        } else {
            $('.btn-action').addClass('d-none');
        }

    })

    $('#frm_data').find('.btn-create').click(function (e) {

        $('#frm_data').parsley().on('form:submit', function () {

            $('.btn-create').prop('disabled', true);

            $(".modal-content").LoadingOverlay("show", {
                image: '',
                custom: customCreating
            });

            var data_import = [];

            data_import.push({

                'ref_id': ref_id,
                'code_sm': $('#sm_code').val(),
                'name_sm_compare': sm_name,
                'code_sm_e': $('#sm_e_code').val(),
                'name_sm_e_compare': $('#sm_e_name').val(),
                'code_a': gcode_a_name,
                'code_e': gcode_e_name,
                'code_c': gcode_c_name,
                'code_b': gcode_b_name,
                'code_d': gcode_d_name,
                'cartype': $('#car_type').val(),
                'UsagePerCar': $('#ussage_per_car').val(),
                'gdescript': $('#remarks').val(),
                'action_type': action_type,
                'created_by': user_id,

            });

            console.log("data_import", data_import)

            $.import_create(data_import);

            return false;

        });

    });

    $('#btn-search').on('click', async function (e) {

        e.preventDefault();

        await $.list();

    });

    $.list();

}

$.list = async function () {

    $(".card-body").LoadingOverlay("show", {
        image: '',
        custom: customElement
    });

    let url = new URL(url_stmas_exp_list);

    url.search = new URLSearchParams({
        code: $('#search_item_code').val().trim() == '' ? '' : $('#search_item_code').val().trim(),
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {

        table_list = $('#tbl-list').DataTable({
            bDestroy: true,
            data: result.data,
            //scrollY: "394px",
            scrollX: true,
            scrollCollapse: true,
            autoWidth: true,
            paging: true,
            dom: 'Bfrtip',
            buttons: [
                'copyHtml5',
                {
                    extend: 'excelHtml5',
                    title: '',
                    filename: 'Temp_Stmas-Exp_' + moment().format("YYYY/MM/DD hh:ss:mm"),
                    exportOptions: {
                        columns: [0, 1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,25]
                    }
                },
            ],
            pageLength: 10,
            lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
            columns: [
                {
                    title: "<center>Item Code</center>",
                    data: "code",
                    width: "150px",
                    class: "tx-center code_main",
                    render: function (data, type, row, meta) {
                        //return '<span style="font-size:11px;">' + data + '</span>';
                        return '<span style="font-size:11px;  color:DarkGreen;">' + data + '</span>' + '</br >' + '/' +
                            '<span style="font-size:11px;  color:Red;">' + row.gbarcode + '</span>' + ' / ' +
                            '<span style="font-size:11px;  color:Blue;">' + row.SPCODES + '</span>'
                    }
                },//0
                {
                    title: "<center>Item Name</center>",
                    data: "name",
                    width: "250px",
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//1
                {
                    title: "<center>Barcode</center>",
                    class: "tx-center",
                    data: "gbarcode",
                    visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//2
                {
                    title: "<center>SPCODE</center>",
                    data: "SPCODES",
                    visible: false,
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//3
                {
                    title: "<center>code_a</center>",
                    data: "code_a",
                    //visible: false,
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//3  
                {
                    title: "<center>gnamechr</center>",
                    data: "gnamechr",
                    //visible: false,
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//3
                {
                    title: "<center>code_b</center>",
                    data: "code_b",
                    //visible: false,
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//3
                {
                    title: "<center>gmodel</center>",
                    data: "gmodel",
                    //visible: false,
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//3
                {
                    title: "<center>code_c</center>",
                    data: "code_c",
                    //visible: false,
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//3
                {
                    title: "<center>TYPE</center>",
                    data: "TYPE",
                    //visible: false,
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//3
                {
                    title: "<center>code_d</center>",
                    data: "code_d",
                    //visible: false,
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//3
                {
                    title: "<center>GUSED</center>",
                    data: "GUSED",
                    //visible: false,
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//3
                {
                    title: "<center>code_e</center>",
                    data: "code_e",
                    //visible: false,
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//3
                {
                    title: "<center>gOem</center>",
                    data: "gOem",
                    //visible: false,
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//3
                {
                    title: "<center>Car Model</center>",
                    data: "carmodel",
                    class: "tx-center",
                    width: "100px",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//4
                {
                    title: "<center>carFmyear</center>",
                    data: "carFmyear",
                    class: "tx-center",
                    width: "100px",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//5
                {
                    title: "<center>carToyear</center>",
                    data: "carToyear",
                    class: "tx-center",
                    width: "100px",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//6
                {
                    title: "<center>gmodel</center>",
                    data: "gmodel",
                    class: "tx-center",
                    width: "100px",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//7
                {
                    title: "<center>carbrand</center>",
                    data: "carbrand",
                    class: "tx-center",
                    width: "100px",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//8
                {
                    title: "<center>carGeneration</center>",
                    data: "carGeneration",
                    class: "tx-center",
                    width: "100px",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//9
                {
                    title: "<center>carEngine</center>",
                    data: "carEngine",
                    class: "tx-center",
                    width: "100px",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//10
                {
                    title: "<center>carBody</center>",
                    data: "carBody",
                    class: "tx-center",
                    width: "100px",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//11
                {
                    title: "<center>codeOem</center>",
                    data: "codeOem",
                    class: "tx-center",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                },//12
                //{
                //    title: "<center>serviceyear</center>",
                //    data: "serviceyear",
                //    class: "tx-center",
                //    width: "100px",
                //    //visible: false,
                //    render: function (data, type, row, meta) {
                //        return '<span style="font-size:11px;">' + data + '</span>';
                //    }
                //},//13
                //{
                //    title: "<center>UOM</center>",
                //    data: "UOM",
                //    class: "tx-center",
                //    //visible: false,
                //    render: function (data, type, row, meta) {
                //        return '<span style="font-size:11px;">' + data + '</span>';
                //    }
                //},//14
                {
                    title: "<center>Strat date</center>",
                    data: "startdate",
                    class: "tx-center",
                    width: "100px",
                    //visible: false,
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '</span>';
                    }
                },//14
                {
                    title: "<center>gdescript</center>",
                    data: 'gdescript',
                    width: "200px",
                    render: function (data, type, row, meta) {
                        if (data == '' || data == null) {
                            return '';
                        } else {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }
                },//15  
                {
                    title: "<center>UssagePerCar</center>",
                    data: 'UssagePerCar',
                    width: "200px",
                    render: function (data, type, row, meta) {
                        if (data == '' || data == null) {
                            return '';
                        } else {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }
                },//15
            ],
            "initComplete": function (settings, json) {
                $.contextMenu({
                    selector: '#tbl-list tbody tr',
                    callback: async function (key, options) {

                        let citem = table_list.row(this).data();

                        if (key === 'view') {

                            $.detail(citem);

                        } else if (key === 'edit') {

                            await $.detail(citem);
                            await $.update(citem);

                        } else if (key === 'delete') {

                            await $.detail(citem);
                            await $.delete(citem);

                        } else {

                            alert('ERROR');

                        }

                    },
                    items: {

                        "view": { name: "View", icon: "fas fa-search" },
                        "edit": { name: "Edit", icon: "edit", disabled: true },
                        "delete": { name: "Delete", icon: "delete", disabled: true },
                    }

                });

                $("tbody").contextmenu(function () {

                    setTimeout(function () {

                        let code_main = $('.context-menu-active .code_main span').html();
                        code_main = code_main.substring(0, 1);

                        console.log(code_main)

                        if (code_main != 'X') {
                            $('.context-menu-icon-edit').addClass('context-menu-disabled');
                            $('.context-menu-icon-delete').addClass('context-menu-disabled');
                        } else {
                            $('.context-menu-icon-edit').removeClass('context-menu-disabled');
                            $('.context-menu-icon-delete').removeClass('context-menu-disabled');
                        };

                    }, 200);
                });

                $(".card-body").LoadingOverlay("hide", true);
            },
        });

    });

};

$.detail = async function (citem) {

    await $('#modal-frm_data').modal({
        keyboard: false,
        backdrop: 'static'
    });

    action_type = ''

    console.log('detail', citem);

    $('#frm_data').find('input').val('').prop('disabled', true)
    $('#frm_data').find('textarea').val('').prop('disabled', true)
    $('#frm_data').find('select').val('').prop('disabled', true)
    $('#frm_data').find('.btn-action').addClass('d-none');

    $('#frm_data').find('#sm_code')
        .append($("<option>Please select..</option>")
            .attr("value", citem['coderef'])
            .text(citem['coderef'] + ' : ' + citem['nameref'])
            .data('text', citem['nameref']));

    $('#frm_data').find('#gcode_a')
        .append($("<option>Please select..</option>")
            .attr("value", citem['code_a'])
            .text(citem['code_a'] + ' - ' + citem['gnamechr'])
            .data('text', citem['gnamechr']));
    $('#frm_data').find('#gcode_b')
        .append($("<option>Please select..</option>")
            .attr("value", citem['code_b'])
            .text(citem['code_b'] + ' - ' + citem['gmodel'])
            .data('text', citem['gmodel']));
    $('#frm_data').find('#gcode_c')
        .append($("<option>Please select..</option>")
            .attr("value", citem['code_c'])
            .text(citem['code_c'] + ' - ' + citem['TYPE'])
            .data('text', citem['TYPE']));
    $('#frm_data').find('#gcode_d')
        .append($("<option>Please select..</option>")
            .attr("value", citem['code_d'])
            .text(citem['code_d'] + ' - ' + citem['GUSED'])
            .data('text', citem['GUSED']));
    $('#frm_data').find('#gcode_e')
        .append($("<option>Please select..</option>")
            .attr("value", citem['code_e'])
            .text(citem['code_e'] + ' - ' + citem['gOem'])
            .data('text', citem['gOem']));

    $('#frm_data').find('#sm_code').val(citem['coderef']).trigger('change');

    $('#frm_data').find('#gbarcode').val(citem.gbarcode);
    $('#frm_data').find('#spcodes').val(citem.SPCODES);
    $('#frm_data').find('#chrcode').val(citem.CHRCODE);
    $('#frm_data').find('#gcode_a').val(citem.code_a).trigger('change');
    $('#frm_data').find('#gcode_e').val(citem.code_e).trigger('change');
    $('#frm_data').find('#gcode_c').val(citem.code_c).trigger('change');
    $('#frm_data').find('#gcode_b').val(citem.code_b).trigger('change');
    $('#frm_data').find('#gcode_d').val(citem.code_d).trigger('change');
    $('#frm_data').find('#oem').val(citem.codeOem);
    $('#frm_data').find('#car_brand').val(citem.carbrand);
    $('#frm_data').find('#car_model').val(citem.carmodel);
    $('#frm_data').find('#car_year').val(citem.caryear);
    $('#frm_data').find('#car_type').val(citem.cartype);
    $('#frm_data').find('#qty').val(0);
    $('#frm_data').find('#uom').val(citem.UOM);
    $('#frm_data').find('#car_fmyear').val(citem.carFmyear);
    $('#frm_data').find('#car_toyear').val(citem.carToyear);
    $('#frm_data').find('#car_generation').val(citem.carGeneration);
    $('#frm_data').find('#car_engine').val(citem.carEngine);
    $('#frm_data').find('#car_body').val(citem.carBody);
    $('#frm_data').find('#remarks').val(citem.gdescrip);
    $('#frm_data').find('#item_group').val(citem.ITEMGROUP);
    $('#frm_data').find('#group_name').val(citem.GROUPNAME);

    $('#frm_data').find('#ussage_per_car').val(citem.UssagePerCar)

    setTimeout(function () {
        $('#sm_e_code').val(citem.code)
        $('#sm_e_name').val(citem.name)
    }, 100);

    return false;
};

$.update = async function (citem) {

    console.log('update', citem);

    ref_id = $.uuid();
    action_type = 'UPDATE_DATA'

    $('#frm_data').find('.btn-update').removeClass('d-none');
    $('#frm_data').find('#sm_code').prop('disabled', false);
    $('#frm_data').find('#gcode_a').prop('disabled', false);
    $('#frm_data').find('#gcode_e').prop('disabled', false);
    $('#frm_data').find('#gcode_c').prop('disabled', false);
    $('#frm_data').find('#gcode_b').prop('disabled', false);
    $('#frm_data').find('#gcode_d').prop('disabled', false);
    $('#frm_data').find('#car_type').prop('disabled', false);
    $('#frm_data').find('#ussage_per_car').prop('disabled', false);
    $('#frm_data').find('#remarks').prop('disabled', false);

    //gcode_a_name = citem.code_a
    //gcode_e_name = citem.code_e
    //gcode_c_name = citem.code_c
    //gcode_b_name = citem.code_b
    //gcode_d_name = citem.code_d
    gcode_a_name = citem.gnamechr
    gcode_e_name = citem.gOem
    gcode_c_name = citem.TYPE
    gcode_b_name = citem.gmodel
    gcode_d_name = citem.GUSED
    sm_name = citem.nameref

    $('#btn-update').off('click').on('click', function (e) {

        e.preventDefault

        $(".modal-content").LoadingOverlay("show", {
            image: '',
            custom: customUpdating
        });

        $(".modal-content").LoadingOverlay("show");

        $('#btn-update').prop('disabled', true);

        var data_import = [];

        data_import.push({

            'ref_id': ref_id,
            'code_sm': $('#sm_code').val(),
            'name_sm_compare': sm_name,
            'code_sm_e': citem.code,
            'name_sm_e_compare': $('#sm_e_name').val(),
            'code_a': gcode_a_name,
            'code_e': gcode_e_name,
            'code_c': gcode_c_name,
            'code_b': gcode_b_name,
            'code_d': gcode_d_name,
            'cartype': $('#car_type').val(),
            'UsagePerCar': $('#ussage_per_car').val(),
            'gdescript': $('#remarks').val(),
            'action_type': action_type,
            'created_by': user_id,

        });

        console.log("data_import", data_import)

        $.import_create(data_import);

        return false;

    });

};

$.delete = async function (citem) {

    console.log('delete', citem);

    swal({
        title: "โปรดยืนยันอีกครั้ง !",
        text: "ต้องการการลบเอกสารนี้หรือไม่",
        type: "warning",
        showCancelButton: true,
        showLoaderOnConfirm: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "ใช่, ยันยืน",
        cancelButtonText: "ไม่, ยกเลิก",
        cancelButtonColor: '#d33',
        closeOnConfirm: false,
        closeOnCancel: false

    }, function (isConfirm) {

        if (isConfirm) {

            ref_id = $.uuid();
            action_type = 'DELETE_DATA'

            gcode_a_name = citem.gnamechr
            gcode_e_name = citem.gOem
            gcode_c_name = citem.TYPE
            gcode_b_name = citem.gmodel
            gcode_d_name = citem.GUSED
            sm_name = citem.nameref

            var data_import = [];

            data_import.push({

                'ref_id': ref_id,
                'code_sm': $('#sm_code').val(),
                'name_sm_compare': sm_name,
                'code_sm_e': citem.code,
                'name_sm_e_compare': $('#sm_e_name').val(),
                'code_a': gcode_a_name,
                'code_e': gcode_e_name,
                'code_c': gcode_c_name,
                'code_b': gcode_b_name,
                'code_d': gcode_d_name,
                'cartype': $('#car_type').val(),
                'UsagePerCar': $('#ussage_per_car').val(),
                'gdescript': $('#remarks').val(),
                'action_type': action_type,
                'created_by': user_id,

            });

            console.log("data_import", data_import)

            $.import_create(data_import);

        } else {

            swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

        }

    });

    ref_id = $.uuid();
    action_type = 'UPDATE_DATA'

    gcode_a_name = citem.gnamechr
    gcode_e_name = citem.gOem
    gcode_c_name = citem.TYPE
    gcode_b_name = citem.gmodel
    gcode_d_name = citem.GUSED
    sm_name = citem.nameref




    $('#btn-update').off('click').on('click', function (e) {

        e.preventDefault

        $(".modal-content").LoadingOverlay("show", {
            image: '',
            custom: customUpdating
        });

        $(".modal-content").LoadingOverlay("show");

        $('#btn-update').prop('disabled', true);

      
        return false;

    });

};

$.import_create = function (data_import) {

    $.ajax({
        url: url_stmas_exp_import_create,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(data_import),
        success: function (data) {

            console.log("data_import", data);

            if (data.status != 'Success') {

                $.LoadingOverlay("hide", true);
                $(".modal-content").LoadingOverlay("hide", true);
                toastr.error('Error, Please contact administrator.');
                $('.btn-action').prop('disabled', false);

            } else {

                console.log('data', data)

                toastr.warning('กำลังวิเคราะห์ข้อมูล');
                $(".modal-content").LoadingOverlay("hide", true);
                $.LoadingOverlay("hide", true);

                swal({
                    title: 'กำลังดำเนินการ',
                    text: 'วิเคราะห์ข้อมูล',
                    type: "warning",
                    timer: 1000,
                    showConfirmButton: false
                }, async function () {

                    $(".modal-content").LoadingOverlay("show", {
                        image: '',
                        custom: customChecking
                    });

                    $.import_verify();

                });


            }
        }

    });

};

$.import_verify = function () {

    let url = new URL(url_stmas_exp_import_verify);

    url.search = new URLSearchParams({
        ref_id: ref_id
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        if (result.status === 'Error') {

            $('.btn-action').prop('disabled', false);
            toastr.error(status.error_message);
            $("#global-loader").fadeOut("slow");
            $(".modal-content").LoadingOverlay("hide", true);

        } else {

            console.log('import_verify', result)

            if (result.data[0]['record_status'] == 0) {

                $(".modal-content").LoadingOverlay("hide", true);

                $('.alert-warning').removeClass('d-none')
                $('.tx-alert').text(result.data[0]['text_status_th']);

                toastr.error(result.data[0]['text_status_th']);

                swal({
                    title: 'เกิดข้อผิดพลาด',
                    text: result.data[0]['text_status_th'],
                    type: "warning",
                    timer: 2000,
                    showConfirmButton: false
                })

                $('.btn-action').prop('disabled', false);


            } else {

                toastr.success('วิเคราะห์ข้อมูลสำเร็จ');

                swal({
                    title: 'สำเร็จ !',
                    text: 'วิเคราะห์ข้อมูลสำเร็จ',
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });

                $(".modal-content").LoadingOverlay("show", {
                    image: '',
                    custom: customChecking
                });

                $.import_upload();

            }

        }

    });

};

$.import_upload = function () {

    let url = new URL(url_stmas_exp_import_update);

    url.search = new URLSearchParams({
        ref_id: ref_id,
        updated_by: user_id
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(async function (result) {

        if (result.status === 'Error') {

            $(".modal-content").LoadingOverlay("hide", true);

            toastr.error(status.error_message);

            swal("เกิดข้อผิดพลาด", "นำเข้าข้อมูลไม่สำเร็จ", "error");

            $('.btn-action').prop('disabled', false);

        } else {

            $(".modal-content").LoadingOverlay("hide", true);

            swal(
                {
                    title: 'สำเร็จ!',
                    text: 'นำเข้าข้อมูลสำเร็จ',
                    type: 'success',
                    timer: 1000,
                    confirmButtonColor: '#57a94f'
                }
            )

            await $.list();

            $('.btn-action').prop('disabled', false);

            $('#modal-frm_data').modal('hide');

            //$.addLogEvent(log_code, 'VSM', 'create', '/master/stmas_exp', 'OK');

        }

    });

};

$.master = async function () {

    $('#sm_code').select2({
        width: 'resolve',
        delay: 500,
        dropdownAutoWidth: true,
        minimumInputLength: 3,
        minimumResultsForSearch: 10,
        ajax: {
            url: url_stmas_get,
            dataType: 'json',
            data: function (params) {
                let cd = "RTRIM(code)";
                let tx = "CONCAT(RTRIM(code),' - ',RTRIM(name))";
                var query = {
                    id: cd,
                    text: tx,
                    keywords: $.trim(typeof params.term !== 'undefined' ? params.term : ' '),
                }
                return query;
            },
            matcher: function (params, data) {
                return matchStart(params, data);
            },
            processResults: function (data, search) {
                return {
                    results: $.map(data.data, function (item) {
                        sm_name = $.trim(item.name)
                        let citem = {
                            id: $.trim(item.code),
                            text: $.trim(item.code) + ' : ' + $.trim(item.name),
                            name: $.trim(item.name),
                            gbarcode: $.trim(item.gbarcode),
                            spcodes: $.trim(item.SPCODES),
                            chrcode: $.trim(item.CHRCODE),
                            gzone: $.trim(item.gzone),
                            code_a: $.trim(item.code_a),
                            code_b: $.trim(item.code_b),
                            code_c: $.trim(item.code_c),
                            code_d: $.trim(item.code_d),
                            code_e: $.trim(item.code_e),
                            goem: $.trim(item.gOem),
                            carbrand: $.trim(item.carbrand),
                            carmodel: $.trim(item.carmodel),
                            carfmyear: $.trim(item.carFmyear),
                            cartoyear: $.trim(item.carToyear),
                            cargeneration: $.trim(item.carGeneration),
                            carengine: $.trim(item.carEngine),
                            carbody: $.trim(item.carBody),
                            carbodycode: $.trim(item.CarBodyCode),
                            codeoem: $.trim(item.codeOem),
                            uom: $.trim(item.UOM),
                            cartype: $.trim(item.cartype),
                            itemgroup: $.trim(item.ITEMGROUP),
                            groupname: $.trim(item.GROUPNAME),
                        }
                        return {
                            sm_data: citem,
                            text: citem.text,
                            id: citem.id
                        }
                    })
                };
            },
        }
    })

    $('#search_item_code').select2({
        width: 'resolve',
        delay: 500,
        dropdownAutoWidth: true,
        minimumInputLength: 3,
        minimumResultsForSearch: 10,
        ajax: {
            url: url_itemmater_search,
            dataType: 'json',
            escapeMarkup: function (markup) {
                return markup;
            },
            data: function (params) {
                let cd = "RTRIM(code)";
                let tx = "CONCAT(RTRIM(code),' - ',RTRIM(CHRCODE),' - ',RTRIM(name),' / ',RTRIM(gbarcode),' / ',RTRIM(SPCODES))";
                var query = {
                    id: cd,
                    text: tx,
                    keywords: $.trim(typeof params.term !== 'undefined' ? params.term : ' '),
                }
                //console.log(params);
                return query;
            },
            matcher: function (params, data) {
                return matchStart(params, data);
            },
            processResults: function (data, search) {
                return {
                    results: $.map(data.data, function (item) {
                        let icon;
                        let text = item.text;
                        let id = item.id.substring(0, 1)
                        if (id != 'X') {
                            icon = '<span style="color: #00810E">' + text + '</span>';
                        } else {
                            icon = '<span style="color: #FF5733">' + text + '</span>';
                        }
                        return {
                            text: icon,
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

};

$.gcode_get = async function () {

    $('.gcode_a').select2({
        width: 'resolve',
        delay: 500,
        dropdownAutoWidth: true,
        minimumInputLength: 3,
        minimumResultsForSearch: 10,
        ajax: {
            url: url_gcode_keywords_get,
            dataType: 'json',
            data: function (params) {
                var query = {
                    ctype: 'gcode_aexp',
                    keywords: typeof params.term !== 'undefined' ? params.term : ' ',
                }
                return query;
            },
            matcher: function (params, data) {
                return matchStart(params, data);
            },
            processResults: function (data, search) {
                return {
                    results: $.map(data.data, function (item) {
                        gcode_a_name = $.trim(item.gname)
                        return {
                            text: $.trim(item.code) + ' - ' + $.trim(item.gname),
                            id: item.code,
                            name: $.trim(item.gname),
                        }
                    })
                };
            },
        }
    })

    $('.gcode_b').select2({
        width: 'resolve',
        delay: 500,
        dropdownAutoWidth: true,
        minimumInputLength: 3,
        minimumResultsForSearch: 10,
        ajax: {
            url: url_gcode_keywords_get,
            dataType: 'json',
            data: function (params) {
                var query = {
                    ctype: 'gcode_b',
                    keywords: typeof params.term !== 'undefined' ? params.term : ' ',
                }
                return query;
            },
            matcher: function (params, data) {
                return matchStart(params, data);
            },
            processResults: function (data, search) {
                return {
                    results: $.map(data.data, function (item) {
                        gcode_b_name = $.trim(item.gname)

                        return {
                            text: $.trim(item.code) + ' - ' + $.trim(item.gname),
                            id: item.code,
                            name: $.trim(item.gname)
                        }
                    })
                };
            },

        }
    })

    $('.gcode_c').select2({
        width: 'resolve',
        delay: 500,
        dropdownAutoWidth: true,
        minimumInputLength: 3,
        minimumResultsForSearch: 10,
        ajax: {
            url: url_gcode_keywords_get,
            dataType: 'json',
            data: function (params) {
                var query = {
                    ctype: 'gcode_c',
                    keywords: typeof params.term !== 'undefined' ? params.term : ' ',
                }
                return query;
            },
            matcher: function (params, data) {
                return matchStart(params, data);
            },
            processResults: function (data, search) {
                return {
                    results: $.map(data.data, function (item) {
                        gcode_c_name = $.trim(item.gname)
                        return {
                            text: $.trim(item.code) + ' - ' + $.trim(item.gname),
                            id: item.code,
                            name: $.trim(item.gname)
                        }
                    })
                };
            },
        }
    })

    $('.gcode_d').select2({
        width: 'resolve',
        delay: 500,
        dropdownAutoWidth: true,
        minimumInputLength: 3,
        minimumResultsForSearch: 10,
        ajax: {
            url: url_gcode_keywords_get,
            dataType: 'json',
            data: function (params) {
                var query = {
                    ctype: 'gcode_d',
                    keywords: typeof params.term !== 'undefined' ? params.term : ' ',
                }
                return query;
            },
            matcher: function (params, data) {
                return matchStart(params, data);
            },
            processResults: function (data, search) {
                return {
                    results: $.map(data.data, function (item) {
                        gcode_d_name = $.trim(item.gname)
                        return {
                            text: $.trim(item.code) + ' - ' + $.trim(item.gname),
                            id: item.code,
                            name: $.trim(item.gname)
                        }
                    })
                };
            },
        }
    })

    $('.gcode_e').select2({
        width: 'resolve',
        delay: 500,
        dropdownAutoWidth: true,
        minimumInputLength: 3,
        minimumResultsForSearch: 10,
        ajax: {
            url: url_gcode_keywords_get,
            dataType: 'json',
            data: function (params) {
                var query = {
                    ctype: 'gcode_e',
                    keywords: typeof params.term !== 'undefined' ? params.term : ' ',
                }
                return query;
            },
            matcher: function (params, data) {
                return matchStart(params, data);
            },
            processResults: function (data, search) {
                return {
                    results: $.map(data.data, function (item) {
                        code_e_select = $.trim(item.code)
                        gcode_e_name = $.trim(item.gname)
                        return {
                            text: $.trim(item.code) + ' - ' + $.trim(item.gname),
                            id: item.code,
                            name: $.trim(item.gname)
                        }
                    })
                };
            },
        }
    })

}