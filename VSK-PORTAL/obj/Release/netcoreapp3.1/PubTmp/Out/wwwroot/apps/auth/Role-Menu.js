'use strict';

let fs = firebase.firestore();
let collection = 'auth_role_menu';
let oTable;

$.init = function () {

    $.List();
    
    // Start Application List
    let application_query = fs.collection('auth_application').where("record_status", "in", ["Y", "N"]);
    application_query.get().then(function (querySnapshot) {

        let application_dataSet = [];

        querySnapshot.forEach(function (doc) {

            application_dataSet.push({ id: doc.data().application_id, text: doc.data().application_name });

        });

        $('#application_id').select2({
            width: '100%',
            height: '40px',
            dropdownParent: $("#modal-frm_data"),
            placeholder: {
                id: '0', // the value of the option
                text: '--- Select Application ---'
            },
            allowClear: true,
            data: application_dataSet,
            templateResult: function (data) {
                return data.text;
            },
            sorter: function (data) {
                return data.sort(function (a, b) {
                    return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                });
            }
        });

    });
    // End Application List

    // Start Role List
    $.LoadRoleList = function (application_id, role_id = '') {

        $('#role_menu_list').empty();

        $('#role_id').empty().select2().select2("destroy");

        let role_query = fs.collection('auth_role')
            .where("record_status", "==", "Y")
            .where("application_id", "==", application_id);

        role_query.get().then(function (querySnapshot) {

            let role_dataSet = [];

            querySnapshot.forEach(function (doc) {

                role_dataSet.push({ id: doc.data().role_id, text: doc.data().role_name });

            });

            $('#role_id').select2({
                width: '100%',
                height: '40px',
                dropdownParent: $("#modal-frm_data"),
                placeholder: {
                    id: '0', // the value of the option
                    text: '--- Select Role ---'
                },
                allowClear: true,
                data: role_dataSet,
                templateResult: function (data) {
                    return data.text;
                },
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    });
                }
            });

            $('#role_id').val(role_id).trigger("change");

        });
    };
    // End Role List

    // Start Menu List
    $.LoadMenuList = function (application_id, menu_id = []) {

        $('#role_menu_list').empty();

        let menu_query = fs.collection('auth_menu')
            .where("record_status", "==" , "Y")
            .where("application_id", "==", application_id);

        menu_query.get().then(function (querySnapshot) {

            let menu_main_dataSet = [];
            let menu_sub_dataSet = [];

            querySnapshot.forEach(function (doc) {

                if (doc.data().menu_parent === '0' || doc.data().menu_parent === null) {

                    menu_main_dataSet.push({
                        menu_id: doc.data().menu_id,
                        menu_name: doc.data().menu_name,
                        menu_parent: doc.data().menu_parent,
                        menu_url: doc.data().menu_url
                    });

                } else {

                    menu_sub_dataSet.push({
                        menu_id: doc.data().menu_id,
                        menu_name: doc.data().menu_name,
                        menu_parent: doc.data().menu_parent,
                        menu_url: doc.data().menu_url
                    });

                }

            });

            $.each(menu_main_dataSet, function (key, val_main) {

                $('#role_menu_list').append('<div class="row mg-t-10" id="checkbox-list-' + val_main['menu_id'] + '">\
                                                <div class="col-lg-6">\
                                                    <label class="ckbox" style="font-weight: bold;">\
                                                        <input type="checkbox" class="role_menu" name="role_menu[]" id="'+ val_main['menu_id'] + '" value="' + val_main['menu_id'] + '" ' + ($.inArray(val_main['menu_id'], menu_id) >= 0 ? "checked" : "") + ' >\
                                                        <span>' + val_main['menu_name'] + '</span>\
                                                    </label>\
                                                </div>\
                                            </div>');

                $.each(menu_sub_dataSet, function (key, val_sub) {

                    if (val_sub['menu_parent'] === val_main['menu_id']) {

                        $('#role_menu_list').append('<div class="row mg-t-10 mg-l-15">\
                                                        <div class="col-lg-6">\
                                                            <label class="ckbox"><input type="checkbox" class="role_menu" name="role_menu[]" id="'+ val_sub['menu_id'] + '" value="' + val_sub['menu_id'] + '" ' + ($.inArray(val_sub['menu_id'], menu_id) >= 0 ? "checked" : "") +' ><span>' + val_sub['menu_name'] + '</span></label>\
                                                        </div>\
                                                     <div>');

                    }


                });

            });

            menu_main_dataSet = [];

        });
        console.log(menu_id);
    };
    // End Role List

    $('#btn-item_create').click(function (e) {

        e.preventDefault();
        $.Create();

    });

    $('#application_id').on('select2:select', function (e) {

        e.preventDefault();

        $('#role_menu_list').empty();

        $.LoadRoleList($('#application_id').val());
        $.LoadMenuList($('#application_id').val());

    });


    $('#modal-frm_data').on('hidden.bs.modal', function () {

        $('#application_id').val('').trigger("change").prop('disabled', false);
        $('#role_id').empty().prop('disabled', false);
        $('#role_menu_list').empty();
        $("#frm_data").parsley().reset();

    });

};

$.List = async function () {

    console.log('Index function Start', new Date());

    let dataSet = [];
    let query = await fs.collection(collection);

    query.get().then(function (querySnapshot) {

        querySnapshot.forEach(function (doc) {

            dataSet.push([
                doc.data().application_id,      //0
                doc.data().role_id,             //1
                doc.data().menu_id,             //2
                doc.data().role_menu_id,        //3
                doc.data().created_by,          //4
                doc.data().created_date,        //5
            ]);

        });

        oTable = $('#tbl-list').DataTable({
            data: dataSet,
            columns: [
                { title: "Application Code" },
                { title: "Role Name" },
                { title: "menu" },
                { title: "itemID" },
                { title: "created_by" },
                { title: "created_date" }
            ],

            columnDefs: [
                {
                    "targets": [2],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [3],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [4],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [5],
                    "visible": false,
                    "searchable": false
                }
            ],
            "order": [[5, "desc"]],

            "rowCallback": function (row, data) {

                fs.collection('auth_application').where("application_id", "==", data[0]).limit(1).get().then(function (querySnapshot) {

                    querySnapshot.forEach(function (doc) {

                        $('td:eq(0)', row).html(doc.data().application_name);

                    });

                }).catch(function (error) {

                    // Handle any errors

                });

                fs.collection('auth_role').where("role_id", "==", data[1]).limit(1).get().then(function (querySnapshot) {

                    querySnapshot.forEach(function (doc) {

                        $('td:eq(1)', row).html(doc.data().role_name);

                    });

                }).catch(function (error) {

                    // Handle any errors

                });


            },
            "initComplete": function (settings, json) {
                $.contextMenu({
                    selector: '#tbl-list tbody tr',
                    callback: function (key, options) {

                        let data = oTable.row(this).data();
                        let citem = {
                            role_menu_id: data[3],
                            application_id: data[0],
                            role_id: data[1],
                            menu_id: data[2]
                        };

                        $('#modal-frm_data').modal({

                            keyboard: false,
                            backdrop: 'static'

                        });

                        if (key === 'view') {

                            $.Details(citem);

                        } else if (key === 'edit') {

                            $.Details(citem);
                            $.Edit(citem);

                        } else if (key === 'delete') {

                            $.Details(citem);
                            $.Delete(citem);

                        }
                        else if (key === 'create') {

                            $.Create();

                        } else {

                            alert('ERROR');

                        }

                    },
                    items: {
                        "view": { name: "View", icon: "fas fa-search" },
                        "edit": { name: "Edit", icon: "edit" },

                        "delete": { name: "Delete", icon: "delete" },
                        "sep1": "---------",
                        "create": { name: "New Item", icon: "add" }
                    }

                });
            },
            "drawCallback": function (settings) {

            }
        });

    });

};

$.Create = async function () {

    $('.btn-save_form').show();
    $('.btn-save_form').prop('disabled', false);
    $('#btn-save_exit').html('Save');
    $('#btn-save_exit').removeClass('btn-danger').addClass('btn-primary');

    $('#frm_data input').val('').prop('disabled', false);
    $('#frm_data input').eq(0).focus();


    $('.btn-save_form').click(function (e) {

        //e.preventDefault();

        let submit_action = $(this).data('action');

        $('#frm_data').parsley().on('form:submit', function () {

            $('.btn-save_form').prop('disabled', true);

            let uuid = $.uuid();

            let role_menu_citem = $(".role_menu:checked").map(function () { return $(this).val() }).toArray();

            let citem_data = {
                role_menu_id: uuid,
                application_id: $('#application_id').val(),
                role_id: $('#role_id').val(),
                menu_id: role_menu_citem,
                created_by: "SYSTEM",
                created_date: new Date(),
            };

            console.log(citem_data)

            fs.collection(collection).doc(uuid).set(citem_data).then(function () {

                toastr.options = {
                    "closeButton": false, // true/false
                    "debug": false, // true/false
                    "newestOnTop": false, // true/false
                    "progressBar": true, // true/false
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300", // in milliseconds
                    "hideDuration": "500", // in milliseconds
                    "timeOut": "900", // in milliseconds
                    "extendedTimeOut": "900", // in milliseconds
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };

                toastr.success('Save Successfully!', function () {

                    setTimeout(function () {

                        oTable.destroy();
                        $.List();

                        $("#frm_data").parsley().reset();

                        if (submit_action === "save_exit") {

                            $('.btn-save_form').prop('disabled', false);
                            $('#modal-frm_data').modal('hide');

                        } else if (submit_action === "save_new") {

                            $('#application_id').val('');
                            $('#application_name').val('');

                            $('#frm_data input').val('').prop('disabled', false);
                            $('#frm_data input').eq(0).focus();
                            $('.record_status').eq(1).prop('checked', true);

                            $('.btn-save_form').prop('disabled', false);

                        } else {

                            toastr.error('Error writing document');

                        }

                    }, 1000);

                    //$.addLogEvent(collection);

                });

            }).catch(function (error) {

                toastr.error(error, 'Error writing document');
                console.error("Error writing document: ", error);

            });

            return false;

        });


    });

};

$.Details = async function (citem) {

    console.log(citem);

    $('.btn-save_form').hide();

    $('#application_id').val(citem['application_id']).trigger("change").prop('disabled', true);

    $('#role_id').val(citem['role_id']).trigger("change").prop('disabled', true);

    $('.record_status').prop('disabled', true);

    $.LoadRoleList(citem['application_id'], citem['role_id']);
    $.LoadMenuList(citem['application_id'], citem['menu_id']);

    citem['record_status'] === 'Y'
        ? $('.record_status').eq(0).prop('checked', true)
        : $('.record_status').eq(1).prop('checked', true);

};

$.Edit = async function (citem) {

    $('#btn-save_exit').html('Update').show();
    $('#btn-save_exit').removeClass('btn-danger').addClass('btn-primary');

    $('#btn-save_exit').click(function (e) {

        $('#frm_data').parsley().on('form:submit', function () {

            $('.btn-save_form').prop('disabled', true);

            let role_menu_citem = $(".role_menu:checked").map(function () { return $(this).val() }).toArray();

            let citem_data = {
                role_menu_id: citem['role_menu_id'],
                application_id: $('#application_id').val(),
                role_id: $('#role_id').val(),
                menu_id: role_menu_citem,
                created_by: "SYSTEM",
                created_date: new Date(),
            };

            fs.collection(collection).doc(citem['role_menu_id']).delete().then(function () {

                fs.collection(collection).doc(citem['role_menu_id']).set(citem_data).then(function () {

                    toastr.options = {
                        "closeButton": false, // true/false
                        "debug": false, // true/false
                        "newestOnTop": false, // true/false
                        "progressBar": true, // true/false
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "300", // in milliseconds
                        "hideDuration": "500", // in milliseconds
                        "timeOut": "900", // in milliseconds
                        "extendedTimeOut": "900", // in milliseconds
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    };

                    toastr.success('Save Successfully!', function () {

                        oTable.destroy();
                        $.List();

                        setTimeout(function () {

                            $('.btn-save_form').prop('disabled', false);
                            $("#frm_data").parsley().reset();

                            $('#modal-frm_data').modal('hide');

                        }, 1000);

                    });

                }).catch(function (error) {

                    toastr.error(error, 'Error writing document');
                    console.error("Error writing document: ", error);

                });

            });

            return false;

        });

    });

};

$.Delete = async function (citem) {

    $('#btn-save_exit').html('Delete').show();
    $('#btn-save_exit').removeClass('btn-primary').addClass('btn-danger');

    $('#btn-save_exit').click(function (e) {

        let submit_action = $(this).data('action');

        $('#frm_data').parsley().on('form:submit', function () {

            $('.btn-save_form').prop('disabled', true);

            fs.collection(collection).doc(citem['role_menu_id']).delete().then(function () {

                toastr.options = {
                    "closeButton": false, // true/false
                    "debug": false, // true/false
                    "newestOnTop": false, // true/false
                    "progressBar": true, // true/false
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300", // in milliseconds
                    "hideDuration": "500", // in milliseconds
                    "timeOut": "900", // in milliseconds
                    "extendedTimeOut": "900", // in milliseconds
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };

                toastr.success('Save Successfully!', function () {

                    setTimeout(function () {

                        $('#modal-frm_data').modal('hide');
                        location.reload();

                    }, 1000);

                });

            }).catch(function (error) {

                toastr.error(error, 'Error writing document');
                console.error("Error writing document: ", error);

            });

            return false;

        });

    });

};

$(document).ready(async function () {

    await $.init();

});

