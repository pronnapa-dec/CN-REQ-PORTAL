'use strict';

let fs = firebase.firestore();
let collection = 'mrp_opt_schedule';
let oTable;
let lov_site_dataset = [];

$.init = function () {

    $.List();

    $('#btn-item_create').click(function (e) {

        e.preventDefault();

        $.Create();

    });

    $('#modal-frm_data').on('hidden.bs.modal', function () {

        $('#site_code').val('').trigger('change').prop('disabled', false);
        $('#schedule_note').val('').prop('disabled', false);
        $('.schedule_day').prop('checked', false).prop('disabled', true);
        $('#schedule_all').prop('checked', false).prop('disabled', true);
        $('.record_status').prop('disabled', true);

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
                doc.data().schedule_id,     //0
                doc.data().site_code,       //1
                doc.data().site_name,       //2
                doc.data().schedule_note,   //3 
                doc.data().schedule_mon,    //4 
                doc.data().schedule_tue,    //5 
                doc.data().schedule_wed,    //6 
                doc.data().schedule_thu,    //7 
                doc.data().schedule_fri,    //8 
                doc.data().schedule_sat,    //9 
                doc.data().schedule_sun,    //10
                doc.data().record_status,   //11
                doc.data().created_by,      //12
                doc.data().created_date,    //13
                doc.data().updated_by,      //14
                doc.data().updated_date     //15
            ]);

        });

        oTable = $('#tbl-list').DataTable({
            data: dataSet,
            columns: [
                { title: "schedule_id" },
                { title: "Site Code" },
                { title: "Site Name", "width": "20%" },
                { title: "schedule_note" },
                {
                    title: "MON",
                    className: "tx-center",
                    render: function (data, type, row) {

                        return data === 'Y' ? '<span class="badge badge-success"><i class="fas fa-check"></i></span>' : '<span class="badge badge-danger"><i class="fas fa-times"></i></span>';

                    }
                },
                {
                    title: "TUE",
                    className: "tx-center",
                    render: function (data, type, row) {

                        return data === 'Y' ? '<span class="badge badge-success"><i class="fas fa-check"></i></span>' : '<span class="badge badge-danger"><i class="fas fa-times"></i></span>';

                    }
                },
                {
                    title: "WED",
                    className: "tx-center",
                    render: function (data, type, row) {

                        return data === 'Y' ? '<span class="badge badge-success"><i class="fas fa-check"></i></span>' : '<span class="badge badge-danger"><i class="fas fa-times"></i></span>';

                    }
                },
                {
                    title: "THU",
                    className: "tx-center",
                    render: function (data, type, row) {

                        return data === 'Y' ? '<span class="badge badge-success"><i class="fas fa-check"></i></span>' : '<span class="badge badge-danger"><i class="fas fa-times"></i></span>';

                    }
                },
                {
                    title: "FRI",
                    className: "tx-center",
                    render: function (data, type, row) {

                        return data === 'Y' ? '<span class="badge badge-success"><i class="fas fa-check"></i></span>' : '<span class="badge badge-danger"><i class="fas fa-times"></i></span>';

                    }
                },
                {
                    title: "SAT",
                    className: "tx-center",
                    render: function (data, type, row) {

                        return data === 'Y' ? '<span class="badge badge-success"><i class="fas fa-check"></i></span>' : '<span class="badge badge-danger"><i class="fas fa-times"></i></span>';

                    }
                },
                {
                    title: "SUN",
                    className: "tx-center",
                    render: function (data, type, row) {

                        return data === 'Y' ? '<span class="badge badge-success"><i class="fas fa-check"></i></span>' : '<span class="badge badge-danger"><i class="fas fa-times"></i></span>';

                    }
                },
                {
                    title: "Status",
                    className: "tx-center",
                    render: function (data, type, row) {

                        return data === 'Y' ? '<span class="badge badge-success">Enable</span>' : '<span class="badge badge-danger">Disable</span>';

                    }
                },
                { title: "created_by" },
                { title: "created_date" },
                { title: "updated_by" },
                { title: "updated_date" }
            ],
            columnDefs: [
                {
                    "targets": [0],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [1],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [3],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [12],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [13],
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

            ],
            "order": [[13, "desc"]],
            "rowCallback": function (row, data) {

             
            },
            "initComplete": function (settings, json) {
                $.contextMenu({
                    selector: '#tbl-list tbody tr',
                    callback: function (key, options) {

                        let data = oTable.row(this).data();

                        let citem = {
                            schedule_id: data[0],
                            site_code: data[1],
                            site_name: data[2],
                            schedule_note: data[3],
                            schedule_mon: data[4],
                            schedule_tue: data[5],
                            schedule_wed: data[6],
                            schedule_thu: data[7],
                            schedule_fri: data[8],
                            schedule_sat: data[9],
                            schedule_sun: data[10],
                            record_status: data[11],
                            created_by: data[12],
                            created_date: data[13],
                            updated_by: data[14],
                            updated_date: data[15]
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

    $('#schedule_all').on("change", function (e) {

        e.preventDefault();

        if ($(this).prop("checked") === true) {
            $('.schedule_day').prop('checked', true);
        } else {
            $('.schedule_day').prop('checked', false);
        }

    });

    $('.schedule_day').on("change", function (e) {

        e.preventDefault();

        if ($('.schedule_day:checked').length === 7) {
            $('#schedule_all').prop('checked', true);
        } else {
            $('#schedule_all').prop('checked', false);
        }

    });


    $('.btn-save_form').click(function (e) {

        let submit_action = $(this).data('action');

        $('#frm_data').parsley().on('form:submit', function () {

            $('.btn-save_form').prop('disabled', true);

            let uuid = $.uuid();

            let data_citem = {
                schedule_id: uuid,
                site_code: $('#site_code').val(),
                site_name: $('#site_code option:selected').text(),
                schedule_mon: $('#frm_data').find('#schedule_mon').prop("checked") === true ? 'Y' : 'N',
                schedule_tue: $('#frm_data').find('#schedule_tue').prop("checked") === true ? 'Y' : 'N',
                schedule_wed: $('#frm_data').find('#schedule_wed').prop("checked") === true ? 'Y' : 'N',
                schedule_thu: $('#frm_data').find('#schedule_thu').prop("checked") === true ? 'Y' : 'N',
                schedule_fri: $('#frm_data').find('#schedule_fri').prop("checked") === true ? 'Y' : 'N',
                schedule_sat: $('#frm_data').find('#schedule_sat').prop("checked") === true ? 'Y' : 'N',
                schedule_sun: $('#frm_data').find('#schedule_sun').prop("checked") === true ? 'Y' : 'N',
                schedule_note: $('#schedule_note').val(),
                record_status: $('#frm_data').find('.record_status').prop("checked") === true ? 'Y' : 'N',
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

                            $('#site_code').val('').trigger('change');
                            $('#schedule_note').val('').prop('disabled', false);
                            $('.schedule_day').prop('checked', false);
                            $('#schedule_all').prop('checked', false);

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
    $('#schedule_note').val(citem['schedule_note']).prop('disabled', true);

    citem['schedule_mon'] === 'Y' ? $('#schedule_mon').prop('checked', true).prop('disabled', true) : $('#schedule_mon').prop('checked', false).prop('disabled', true);
    citem['schedule_tue'] === 'Y' ? $('#schedule_tue').prop('checked', true).prop('disabled', true) : $('#schedule_tue').prop('checked', false).prop('disabled', true);
    citem['schedule_wed'] === 'Y' ? $('#schedule_wed').prop('checked', true).prop('disabled', true) : $('#schedule_wed').prop('checked', false).prop('disabled', true);
    citem['schedule_thu'] === 'Y' ? $('#schedule_thu').prop('checked', true).prop('disabled', true) : $('#schedule_thu').prop('checked', false).prop('disabled', true);
    citem['schedule_fri'] === 'Y' ? $('#schedule_fri').prop('checked', true).prop('disabled', true) : $('#schedule_fri').prop('checked', false).prop('disabled', true);
    citem['schedule_sat'] === 'Y' ? $('#schedule_sat').prop('checked', true).prop('disabled', true) : $('#schedule_sat').prop('checked', false).prop('disabled', true);
    citem['schedule_sun'] === 'Y' ? $('#schedule_sun').prop('checked', true).prop('disabled', true) : $('#schedule_sun').prop('checked', false).prop('disabled', true);

    citem['record_status'] === 'Y' ? $('.record_status').eq(0).prop('checked', true) : $('.record_status').eq(1).prop('checked', true);

    $('#schedule_all').prop('disabled', true) ;

    if ($('.schedule_day:checked').length === 7) {
        $('#schedule_all').prop('checked', true);
    } else {
        $('#schedule_all').prop('checked', false);
    }

};

$.Edit = async function (citem) {

    $('#site_code').trigger('change').prop('disabled', false);
    $('#schedule_note').prop('disabled', false);
    $('.schedule_day').prop('disabled', false);
    $('#schedule_all').prop('disabled', false);
    $('.record_status').prop('disabled', false);

    $('#btn-save_exit').html('Update').show();
    $('#btn-save_exit').removeClass('btn-danger').addClass('btn-primary');

    $('#btn-save_exit').click(function (e) {

        let submit_action = $(this).data('action');

        $('#frm_data').parsley().on('form:submit', function () {

            $('.btn-save_form').prop('disabled', true);

            let data_citem = {
                site_code: $('#site_code').val(),
                site_name: $('#site_code option:selected').text(),
                schedule_mon: $('#frm_data').find('#schedule_mon').prop("checked") === true ? 'Y' : 'N',
                schedule_tue: $('#frm_data').find('#schedule_tue').prop("checked") === true ? 'Y' : 'N',
                schedule_wed: $('#frm_data').find('#schedule_wed').prop("checked") === true ? 'Y' : 'N',
                schedule_thu: $('#frm_data').find('#schedule_thu').prop("checked") === true ? 'Y' : 'N',
                schedule_fri: $('#frm_data').find('#schedule_fri').prop("checked") === true ? 'Y' : 'N',
                schedule_sat: $('#frm_data').find('#schedule_sat').prop("checked") === true ? 'Y' : 'N',
                schedule_sun: $('#frm_data').find('#schedule_sun').prop("checked") === true ? 'Y' : 'N',
                schedule_note: $('#schedule_note').val(),
                record_status: $('#frm_data').find('.record_status').prop("checked") === true ? 'Y' : 'N',
                updated_by: "SYSTEM",
                updated_date: new Date()
            };

            fs.collection(collection).doc(citem['schedule_id']).update(data_citem).then(function () {

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

            fs.collection(collection).doc(citem['schedule_id']).update(data_citem).then(function () {

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