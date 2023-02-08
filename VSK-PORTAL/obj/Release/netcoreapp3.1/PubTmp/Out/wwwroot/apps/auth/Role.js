'use strict';

let fs = firebase.firestore();
let collection = 'auth_role';
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

    $('#btn-item_create').click(function (e) {

        e.preventDefault();
        $.Create();

    });

    $('#modal-frm_data').on('hidden.bs.modal', function () {

        $('input').val('').prop('disabled',true);
        $("#frm_data").parsley().reset();
        $('#application_id').val('').trigger("change").prop('disabled', true);
    });

};

$.List = async function () {

    console.log('Index function Start', new Date());

    let dataSet = [];
    let query = await fs.collection(collection).where("record_status", "in", ["Y", "N"]);

    query.get().then(function (querySnapshot) {

        querySnapshot.forEach(function (doc) {

            dataSet.push([
                doc.data().application_id,    //0
                doc.data().role_code,           //1
                doc.data().role_name,           //2
                doc.data().record_status,       //3
                doc.data().role_id,             //4
                doc.data().created_by,          //5
                doc.data().created_date,        //6
                doc.data().updated_by,          //7
                doc.data().updated_date         //8
            ]);

        });

        oTable = $('#tbl-list').DataTable({
            data: dataSet,
            columns: [
                { title: "Application Code" },
                { title: "Role Code" },
                { title: "Role Name" },
                {
                    title: "Status",
                    render: function (data, type, row) {

                        return data === 'Y' ? '<span class="badge badge-success">Enable</span>' : '<span class="badge badge-danger">Disable</span>';

                    }
                },
                { title: "itemID" },
                { title: "created_by" },
                { title: "created_date" },
                { title: "updated_by" },
                { title: "updated_date" }
            ],
            columnDefs: [
                {
                    "targets": [4],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [5],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [6],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [7],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [8],
                    "visible": false,
                    "searchable": false
                }
            ],
            "order": [[5, "desc"]],
            "rowCallback": function (row, data) {

            },
            "initComplete": function (settings, json) {
                $.contextMenu({
                    selector: '#tbl-list tbody tr',
                    callback: function (key, options) {

                        let data = oTable.row(this).data();
                        let citem = {
                            role_id: data[4],
                            application_id: data[0],
                            role_code: data[1],
                            role_name: data[2],
                            record_status: data[3]
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

    $('#application_id').val('').trigger("change").prop('disabled', false);
    $('#frm_data input').val('').prop('disabled', false);
    $('#frm_data input').eq(0).focus();
    $('.record_status').eq(1).prop('checked', true);

    $('.btn-save_form').click(function (e) {

        let submit_action = $(this).data('action');

        $('#frm_data').parsley().on('form:submit', function () {

            $('.btn-save_form').prop('disabled', true);

            let uuid = $.uuid();

            let citem_data = {
                role_id: uuid,
                application_id: $('#application_id').val(),
                role_code: $('#role_code').val(),
                role_name: $('#role_name').val(),
                record_status: $('#frm_data').find('.record_status').prop("checked") === true ? 'Y' : 'N',
                created_by: "SYSTEM",
                created_date: new Date(),
                updated_by: "SYSTEM",
                updated_date: new Date()
            };

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

    $('.btn-save_form').hide();

    $('#application_id').val(citem['application_id']).trigger("change").prop('disabled', true);
    $('#role_code').val(citem['role_code']).prop('disabled', true);
    $('#role_name').val(citem['role_name']).prop('disabled', true);
    $('.record_status').prop('disabled', true);

    citem['record_status'] === 'Y'
        ? $('.record_status').eq(0).prop('checked', true)
        : $('.record_status').eq(1).prop('checked', true);

};

$.Edit = async function (citem) {

    $('#application_id').prop('disabled', false);
    $('input').prop('disabled', false);
    $('.record_status').prop('disabled', false);

    $('#btn-save_exit').html('Update').show();
    $('#btn-save_exit').removeClass('btn-danger').addClass('btn-primary');

    $('#btn-save_exit').click(function (e) {

        let submit_action = $(this).data('action');

        $('#frm_data').parsley().on('form:submit', function () {

            $('.btn-save_form').prop('disabled', true);

            let citem_data = {
                application_id: $('#application_id').val(),
                role_code: $('#role_code').val(),
                role_name: $('#role_name').val(),
                record_status: $('#frm_data').find('.record_status').prop("checked") === true ? 'Y' : 'N',
                updated_by: "SYSTEM",
                updated_date: new Date()
            };

            fs.collection(collection).doc(citem['role_id']).update(citem_data).then(function () {

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

            let application_citem = {
                record_status: 'D',
                updated_by: "SYSTEM",
                updated_date: new Date()
            };

            fs.collection(collection).doc(citem['application_id']).update(application_citem).then(function () {

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

