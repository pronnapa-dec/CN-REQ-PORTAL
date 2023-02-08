'use strict';

let fs = firebase.firestore();
let oTable, name, oTable_inv, branch, cus_branch, citem;


const url_api_master = 'http://192.168.1.247/vsk-api-acc/';
//const url_app_ui = "http://192.168.1.247/intranet/public/inv-app/tax-detail";
//const url_api_local = "http://192.168.1.247/vsk-api-inv";

const url_api_local = "http://localhost:49705/";
const url_app_ui = "http://localhost:57916/inv-app/tax-detail";

const inv_user_get = url_api_local + 'v1/inv_user_get';
const user_create = url_api_local + 'v1/inv_user_create';

$.init = async function () {
    $('#pk_date').val(moment().format('DD/MM/YYYY') + '-' + moment().format('DD/MM/YYYY'))

    // Datepicker
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
        //console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });

    $('.date-picker').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('DD/MM/YYYY') + '-' + picker.endDate.format('DD/MM/YYYY'));
    });

    $("input.numbers").keypress(function (event) {
        return isNumber(event, this)
    });

    $(".custom-file-input").on("change", function (ev) {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        fileReader(ev);
    });

    $('.capital').keyup(async function (e) {
        e.preventDefault();
        $(this).val($(this).val().toUpperCase());
    });

    $('.btn-save_form').on('click', function (e) {
        e.preventDefault();

        let submit_action = $(this).data('action');

        $.Create(submit_action);


    })

    $('#search-user').on('click', function (e) {
        e.preventDefault();
        $.List();
    });

    $.List();
};

$.List = async function () {
    $("#global-loader").fadeIn("slow");

    let url = new URL(inv_user_get);

    url.search = new URLSearchParams({
        user_firstname: $('#search_fname').val(),
        user_lastname: $('#search_lname').val(),
        mode: 'Search'
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {
        //oTable.destroy();
        $("#global-loader").fadeOut("slow");

        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                //footer: '<a href>Why do I have this issue?</a>'
            }).then((result) => {
                if (result.isConfirmed) {

                    location.reload();

                }
            })


        } else {

            oTable = $('#tbl-list-book-taxnum').DataTable({
                data: result.data,
                scrollX: true,
                scrollY: "410px",
                scrollCollapse: true,
                destroy: true,
                paging: true,
                columns: [
                    {
                        title: "<span style='font-size:11px;'>ลำดับ</span>",
                        class: "tx-center",
                        width: "70px",
                        render: function (data, type, row, meta) {
                            return (meta.row + 1);
                        }
                    }, //1 

                    {
                        title: "<span style='font-size:11px;'>พนีกงานขาย</span>",
                        data: "full_name",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //2

                    {
                        title: "<span style='font-size:11px;'>user_lastname</span>",
                        data: "user_firstname",
                        width: "100px",
                        class: "tx-center",
                        visible: false,
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //3

                    {
                        title: "<span style='font-size:11px;'>สถานะ</span>",
                        data: "record_status",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            if (data == '1') {
                                return '<span class="badge badge-success" style="font-size:11px;">Enabled</span>';
                            } else {
                                return '<span class="badge badge-danger" style="font-size:11px;">Disabled</span>';
                            }
                        }
                    }, //2

                ],


                //"order": [[0, "desc"]],
            });

        }
    })

};

$.Create = async function (submit_action) {

    $("#global-loader").fadeIn("slow")

    let add_data = {
        user_firstname: $('#fname').val(),
        user_lastname: $('#lname').val(),
        record_status: $(".record_status:checked").val(),
        created_by: name,
        pMessage: ''
    };

    var params = [];
    for (const i in add_data) {
        params.push(i + "=" + encodeURIComponent(add_data[i]));
    }

    fetch(user_create, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params.join("&"),
    }).then(data => {
        //console.log(data);
        return data.json();
    }).then(data => {

        if (data.status == 'Success') {

            toastr.success('Save Successfully!');

            if (submit_action === "save_exit") {
                $('.btn-save_form').prop('disabled', false);
                $('#modal-frm_user').modal('hide');
                $('#frm_user input').val('');
            } else if (submit_action === "save_new") {
                $('#frm_user input').val('');
                $('#frm_user input').eq(0).focus();
                $('.btn-save_form').prop('disabled', false);
            }

            $.List();
        }

        return false;

    }).catch((error) => {
        $("#global-loader").fadeOut("slow");
        // toastr.error(data.error_message);
        toastr.error(error);
    });
};

function isNumber(evt, element) {

    var charCode = (evt.which) ? evt.which : event.keyCode

    if (
        //(charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
        (charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(document).ready(async function () {
    await $.init();
});

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        var full_mail = user.email;
        name = full_mail.replace("@vskautoparts.com", "");

    } else {

        window.location.assign('./login');

    }

});