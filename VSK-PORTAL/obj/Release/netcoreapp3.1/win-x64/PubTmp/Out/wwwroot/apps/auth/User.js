'use strict';

let fs = firebase.firestore();
let collection = 'auth_user';
let oTable;
let dataSet = [];

$.init = function () {

    $.List();

    $('#btn-item_create').click(function (e) {

        e.preventDefault();

        $.Create();

    });

    $('#modal-frm_data').on('hidden.bs.modal', function () {

        $('input').val('');
        $("#frm_data").parsley().reset();

    });

};

$.List = async function () {

    console.log('Index function Start', new Date());

    let dataSet = [];
    let query = await fs.collection(collection).where("record_status", "in", ["Y", "N"]);

    query.get().then(function (querySnapshot) {

        querySnapshot.forEach(function (doc) {

            dataSet.push([
                doc.data().user_fname,      // 0
                doc.data().user_lname,      // 1
                doc.data().user_email,      // 2
                doc.data().record_status,   // 3
                doc.data().user_id,         // 4
                doc.data().created_by,      // 5
                doc.data().created_date,    // 6
                doc.data().updated_by,      // 7
                doc.data().updated_date,    // 8
                doc.data().user_uid              // 9
            ]);

        });

        oTable = $('#tbl-list').DataTable({
            data: dataSet,
            columns: [
                { title: "First Name" },
                { title: "Last Name" },
                { title: "Email" },
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
                { title: "updated_date" },
                { title: "uid" }
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
                },
                {
                    "targets": [9],
                    "visible": false,
                    "searchable": false
                }
            ],
            "order": [[6, "desc"]],
            "rowCallback": function (row, data) {

            },
            "initComplete": function (settings, json) {
                $.contextMenu({
                    selector: '#tbl-list tbody tr',
                    callback: function (key, options) {

                        let data = oTable.row(this).data();
                        let citem = {
                            user_fname: data[0],
                            user_lname: data[1],
                            user_email: data[2],
                            user_password: 'vsk_p@ssw0rd_01032535',
                            record_status: data[3],
                            user_id: data[4]
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
    $('.record_status').eq(1).prop('checked', true);


    $('.btn-save_form').click(function (e) {

        let submit_action = $(this).data('action');

        $('#frm_data').parsley().on('form:submit', function () {

            $('.btn-save_form').prop('disabled', true);

            let uuid = $.uuid();

            let citem_data = {
                user_id: uuid,
                user_fname: $('#user_fname').val(),
                user_lname: $('#user_lname').val(),
                user_email: $('#user_email').val(),
                user_password: $('#user_password').val(),
                user_uid: $('#user_uid').val(),
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

                            $('#application_code').val('');
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

    $('#user_fname').val(citem['user_fname']).prop('disabled', true);
    $('#user_lname').val(citem['user_lname']).prop('disabled', true);
    $('#user_email').val(citem['user_email']).prop('disabled', true);
    $('#user_password').val(citem['user_password']).prop('disabled', true);
    $('#user_uid').val(citem['user_uid']).prop('disabled', true);
    
    $('.record_status').prop('disabled', true);

    citem['record_status'] === 'Y'
        ? $('.record_status').eq(0).prop('checked', true)
        : $('.record_status').eq(1).prop('checked', true);

};

$.Edit = async function (citem) {

    $('#user_fname').prop('disabled', false);
    $('#user_lname').prop('disabled', false);
    $('#user_email').prop('disabled', false);
    $('#user_uid').prop('disabled', false);
    $('#user_password').prop('disabled', false);
    $('.record_status').prop('disabled', false);

    $('#btn-save_exit').html('Update').show();
    $('#btn-save_exit').removeClass('btn-danger').addClass('btn-primary');

    $('#btn-save_exit').click(function (e) {

        let submit_action = $(this).data('action');

        $('#frm_data').parsley().on('form:submit', function () {

            $('.btn-save_form').prop('disabled', true);

            let citem_data = {
                user_fname: $('#user_fname').val(),
                user_lname: $('#user_lname').val(),
                user_email: $('#user_email').val(),
                user_uid: $('#user_uid').val(),
                record_status: $('#frm_data').find('.record_status').prop("checked") === true ? 'Y' : 'N',
                updated_by: "SYSTEM",
                updated_date: new Date()
            };

            if ($('#user_password').val() !== 'vsk_p@ssw0rd_01032535') {

                citem_data.push({ user_password: $('#user_password').val() });

            }

            fs.collection(collection).doc(citem['user_id']).update(citem_data).then(function () {


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

            let citem_data = {
                record_status: 'D',
                updated_by: "SYSTEM",
                updated_date: new Date()
            };

            fs.collection(collection).doc(citem['user_id']).update(citem_data).then(function () {

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

