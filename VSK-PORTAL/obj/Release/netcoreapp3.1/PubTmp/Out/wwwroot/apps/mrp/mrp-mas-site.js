'use strict';

let fs = firebase.firestore();
let collection = 'mrp_mas_site';
let oTable;
let lov_site_dataset = [];

$.init = function () {

    $.List();

    $('#btn-item_create').click(function (e) {

        e.preventDefault();

        $.Create();

    });

    $('#modal-frm_data').on('hidden.bs.modal', function () {

        $('#application_code').val('');
        $('#application_name').val('');

        $("#frm_data").parsley().reset();

    });

    // Start LOV MRP DATASET
    let lov_mrp_query = fs.collection('lov_mrp').where("active_flag", "in", ["Y"]);

    lov_mrp_query.get().then(function (querySnapshot) {

        querySnapshot.forEach(function (doc) {

            lov_site_dataset.push({ id: doc.data().lov_code, text: doc.data().lov_code + ' : ' + doc.data().lov1 });

        });

        $('#site_code').select2({
            width: '100%',
            height: '40px',
            dropdownParent: $("#modal-frm_data"),
            placeholder: {
                id: '0', // the value of the option
                text: '--- Select Site ---'
            },
            allowClear: true,
            data: lov_site_dataset,
            templateResult: function (data) {
                return data.text;
            },
            sorter: function (data) {
                return data.sort(function (a, b) {
                    return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                });
            }
        }).on('select2:select', function (e) {

            e.preventDefault();

            $('#site_description').val('');

            let data = e.params.data;

            $('#site_description').val(data['text']);

        });

    });
    // End LOV MRP List

};

$.List = async function () {

    console.log('Index function Start', new Date());

    let dataSet = [];
    let query = await fs.collection(collection).where("record_status", "in", ["Y", "N"]);

    query.get().then(function (querySnapshot) {

        querySnapshot.forEach(function (doc) {

            dataSet.push([
                doc.data().site_id,                      // 0
                doc.data().site_code,                    // 1
                doc.data().site_description,             // 2
                doc.data().site_contact_name,            // 3
                doc.data().site_contact_email,           // 4
                doc.data().site_contact_phone,           // 5
               
                doc.data().site_acc_hw_code,             // 6
                doc.data().site_source_allowed,          // 7
                doc.data().site_user_control,            // 8
                doc.data().site_lead_time,               // 9
               
                doc.data().site_spare_1,                 // 10
                doc.data().site_spare_2,                 // 11
                doc.data().site_remark,                  // 12
                doc.data().record_status,                // 13
                doc.data().created_by,                   // 14
                doc.data().created_date,                 // 15
                doc.data().updated_by,                   // 16
                doc.data().updated_date                  // 17
            ]);

        });

        oTable = $('#tbl-list').DataTable({
            "data": dataSet,
            "scrollX": true,
            "autoWidth": false, 
            "columns": [
                { title: "site_id" },
                { title: "Site Code" },
                { title: "Site Description" },
                { title: "Contact Name" },
                { title: "Contact Email" },
                { title: "Contact Phone" },
                {
                    title: "ACC+ WH Code",
                    className: "dt-center"
                },
                {
                    title: "Source Allowed",
                    className: "dt-center",
                    render: function (data, type, row) {

                        return data === 'Y' ? '<span class="badge badge-success">Yes</span>' : '<span class="badge badge-danger">No</span>';

                    }
                },
                { title: "User Control" },
                { title: "site_lead_time" },
                { title: "Spare 1" },
                { title: "Spare 2" },
              
                { title: "Remark" },
                {
                    title: "Status",
                    className: "dt-center",
                    render: function (data, type, row) {

                        return data === 'Y' ? '<span class="badge badge-success">Enable</span>' : '<span class="badge badge-danger">Disable</span>';

                    }
                },
                { title: "created_by" },
                { title: "created_date" },
                { title: "updated_by" },
                { title: "updated_date" }
               
            ],
            "columnDefs": [
                {
                    "targets": [0],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [1],
                    "visible": false,
 
                },
                {
                    "targets": [9],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [10],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [11],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [12],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [14],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [15],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [16],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [17],
                    "visible": false,
                    "searchable": false
                },

            ],
            "order": [[15, "desc"]],
            "rowCallback": function (row, data) {

            },
            "initComplete": function (settings, json) {
                $.contextMenu({
                    selector: '#tbl-list tbody tr',
                    callback: function (key, options) {

                        let data = oTable.row(this).data();
                        let citem = {
                            site_id: data[0],
                            site_code: data[1],
                            site_description: data[2],
                            site_contact_name: data[3],
                            site_contact_email: data[4],
                            site_contact_phone: data[5],

                            site_acc_hw_code: data[6],
                            site_source_allowed: data[7],
                            site_user_control: data[8],
                            site_lead_time: data[9],
                       
                            site_spare_1: data[10],
                            site_spare_2: data[11],
                            site_remark: data[12],
                            record_status: data[13],
                            created_by: data[14],
                            created_date: data[15],
                            updated_by: data[16],
                            updated_date: data[17]
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

    $('#frm_search').submit(function (e) {

        e.preventDefault();

        $('input.column_filter').each(function () {

            $.filterColumn($(this).data('column'), $(this).attr('id'));

        });
    });

    $.filterColumn = function (col, id) {

        oTable.column(col).search(

            $('#' + id).val(),

        ).draw();

        if ($('#s_site_source_allowed_yes').prop("checked") === true) {

            oTable.column(7).search('Y').draw();

        } else if ($('#s_site_source_allowed_no').prop("checked") === true) {

            oTable.column(7).search('N').draw();

        } else {

            oTable.column(7).search('').draw();

        }

    };

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

            let data_citem = { 
                site_id: uuid,
                site_code: $('#site_code').val(),
                site_contact_name: $('#site_contact_name').val(),
                site_description: $('#site_description').val(),
                site_contact_email: $('#site_contact_email').val(),
                site_acc_hw_code: $('#site_acc_hw_code').val(),
                site_contact_phone: $('#site_contact_phone').val(),
                site_user_control: $('#site_user_control').val(),
                site_lead_time: $('#site_lead_time').val(),
                site_source_allowed: $('.site_source_allowed').prop("checked") === true ? 'Y' : 'N',
                site_spare_1: $('#site_spare_1').val(),
                site_spare_2: $('#site_spare_2').val(),
                site_remark: $('#site_remark').val(),
                record_status: $('.record_status').prop("checked") === true ? 'Y' : 'N',
                created_by: "SYSTEM",
                created_date: new Date(),
                updated_by: "SYSTEM",
                updated_date: new Date()
            };

            fs.collection(collection).doc(uuid).set(data_citem).then(function () {

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

    $('#site_code').val(citem['site_code']).trigger('change').prop('disabled', true);
    $('#site_description').val(citem['site_description']).prop('disabled', true);
    $('#site_contact_name').val(citem['site_contact_name']).prop('disabled', true);
    $('#site_contact_email').val(citem['site_contact_email']).prop('disabled', true);
    $('#site_contact_phone').val(citem['site_contact_phone']).prop('disabled', true);
    $('#site_acc_hw_code').val(citem['site_acc_hw_code']).prop('disabled', true);

    citem['site_source_allowed'] === 'Y'
        ? $('.site_source_allowed').eq(0).prop('checked', true)
        : $('.site_source_allowed').eq(1).prop('checked', true);

    $('.site_source_allowed').prop('disabled', true);

    $('#site_user_control').val(citem['site_user_control']).prop('disabled', true);
    $('#site_lead_time').val(citem['site_lead_time']).prop('disabled', true);
    $('#site_spare_1').val(citem['site_spare_1']).prop('disabled', true);
    $('#site_spare_2').val(citem['site_spare_2']).prop('disabled', true);
    $('#site_remark').val(citem['site_remark']).prop('disabled', true);

    citem['record_status'] === 'Y'
        ? $('.record_status').eq(0).prop('checked', true)
        : $('.record_status').eq(1).prop('checked', true);
    $('.record_status').prop('disabled', true);

};

$.Edit = async function (citem) {

    $('#site_code').prop('disabled', false);
    $('#site_description').prop('disabled', false);
    $('#site_contact_name').prop('disabled', false);
    $('#site_contact_email').prop('disabled', false);
    $('#site_contact_phone').prop('disabled', false);
    $('#site_acc_hw_code').prop('disabled', false);

    $('.site_source_allowed').prop('disabled', false);

    $('#site_user_control').prop('disabled', false);
    $('#site_lead_time').prop('disabled', false);
    $('#site_spare_1').prop('disabled', false);
    $('#site_spare_2').prop('disabled', false);
    $('#site_remark').prop('disabled', false);

    $('.record_status').prop('disabled', false);

    $('#btn-save_exit').html('Update').show();
    $('#btn-save_exit').removeClass('btn-danger').addClass('btn-primary');

    $('#btn-save_exit').click(function (e) {

        let submit_action = $(this).data('action');

        $('#frm_data').parsley().on('form:submit', function () {

            $('.btn-save_form').prop('disabled', true);

            let data_citem = {
                site_code: $('#site_code').val(),
                site_contact_name: $('#site_contact_name').val(),
                site_description: $('#site_description').val(),
                site_contact_email: $('#site_contact_email').val(),
                site_acc_hw_code: $('#site_acc_hw_code').val(),
                site_contact_phone: $('#site_contact_phone').val(),
                site_user_control: $('#site_user_control').val(),
                site_lead_time: $('#site_lead_time').val(),
                site_source_allowed: $('.site_source_allowed').prop("checked") === true ? 'Y' : 'N',
                site_spare_1: $('#site_spare_1').val(),
                site_spare_2: $('#site_spare_2').val(),
                site_remark: $('#site_remark').val(),
                record_status: $('.record_status').prop("checked") === true ? 'Y' : 'N',
                updated_by: "SYSTEM",
                updated_date: new Date()
            };

            fs.collection(collection).doc(citem['site_id']).update(data_citem).then(function () {

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

            let data_citem = {
                record_status: 'D',
                updated_by: "SYSTEM",
                updated_date: new Date()
            };

            fs.collection(collection).doc(citem['site_id']).update(data_citem).then(function () {

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

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        console.log(user);

    } else {

        window.location.assign('./login');

    }

});