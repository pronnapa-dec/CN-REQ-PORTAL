'use strict';

let fs = firebase.firestore();
const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const user_id = objProfile[0]['username'];

const url_api = "http://192.168.1.247/intranet/pur-api";
const url_api_uat = "http://localhost:49708";
const url_api_master = "http://192.168.1.247:8899/cn-branch-api";


const url_salefile_get = url_api_uat + '/api/Cn_Req_Saletra_Get';
const url_cn_req_daily_get = url_api_uat + '/api/Cn_Req_Job_Daily_Get';
const url_cn_req_create = url_api_uat + '/api/Cn_Req_Job_Create';
const url_cn_req_lov_get = url_api_uat + '/api/Cn_Req_Cause_Get';
const url_cn_req_cause_get = url_api_uat + '/api/Cn_Req_Cause_Master_Get';
const url_cn_req_assige_get = url_api_uat + '/api/Cn_Req_Assige_Master_Get';
const url_cn_req_source_get = url_api_uat + '/api/Cn_Req_Source_Master_Get';


let oTable = [];
let history_Table; //$('#tbl-list-history').DataTable({ "order": [[0, "desc"]], "pageLength": 50 });

let cn_pre_job_type_dataset = [];
let job_comment_dataSet = [], job_source_dataSet = [], job_status_dataSet = [];
let job_comment_dataSet_list = [], job_source_dataSet_list = [], job_status_dataSet_list = [];


$.init = async function () {


    await $.Load_cause();
    await $.Load_source();
    await $.List();
    $.SearchJob();
    $.Create();

    $("[name=saletra_item_list]").change(function () {
        let trnqty = $(this).find(':selected').data("trnqty");
        $("#saletra_qty").val("");
        $("#saletra_qty").attr({ "max": trnqty });
    });
    $('#created_by').val(user_id);

    $("#frm_data #reset").on('click', function (event) {

        //$("#frm_data input:not(#job_status , #created_by)").trigger('reset');
        $("#frm_data select").val('').trigger('change');
        $("#frm_data input:not(#job_status , #created_by)").val('');

        event.preventDefault();

    });

};

$.List = async function () {

    $('#tiltle-table').html("รายการ รับคืนประจำวัน" + "   " + moment().format('DD/MM/YYYY'))
    $('#last_update').html(moment().format('DD/MM/YYYY HH:mm:ss'))

    fetch(url_cn_req_daily_get).then(function (response) {

        return response.json();

    }).then(function (result) {

        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }, function (isConfirmed) {
                if (isConfirmed) {

                    location.reload();

                }
            })


        } else {

            oTable = $('#tbl-prejob_list').DataTable({
                data: result.data,
                //scrollX: true,
                //scrollY: "410px",
                scrollCollapse: true,
                destroy: true,
                paging: true,
                //pageLength: 20,
                columns: [{
                    title: "<span style='font-size:11px;'>เวลา</span>",
                    width: "7%",
                    class: "tx-center",
                    data: 'created_date',
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + moment(data).format('HH:mm:ss') + '</span>';
                    }
                },
                {
                    title: "<span style='font-size:11px;'>เลยที่ใบเสร็จ</span>",
                    class: "tx-center",
                    width: "9%",
                    data: 'number',
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + data + '</span>';
                    }
                }, //1
                {
                    title: "<div class='tx-center'><span style='font-size:11px;'>ข้อมูลสินค้า</span></div>",
                    data: "gbarcode",
                    width: "50px",
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        return '<span style="font-size:11px;">' + row.gbarcode + ': ' + row.stkname + ' (' + row.spcodes + ' )' + '</span>';
                    }
                }, //3
                {
                    title: "<span style='font-size:11px;'>QTY</span>",
                    data: "cn_req_job_qty",
                    class: "tx-center",
                    width: "3%",
                    render: function (data, type, row, meta) {
                        return '<div class="tx-left">' + data + '</div>';
                    }
                }, //4
                {
                    title: "<div class='tx-center'> <spanstyle='font-size:11px;'>WH</span></div>",
                    data: "whdiscode",
                    class: "tx-left",
                    width: "3%",
                    render: function (data, type, row, meta) {
                        console.log(typeof data)
                        console.log(data)
                        return data === 'ST' ? '<span class="badge badge-success">ST</span>' : '<span class="badge badge-danger">EO</span>';
                    }
                }, //5
                {
                    title: "<span style='font-size:11px;'>การรับแจ้ง</span>",
                    width: "10%",
                    class: "tx-center",
                    data: 'cn_req_job_source',
                    render: function (data, type, row, meta) {
                        return data == '1' ? '<span class="badge badge-info">รับคืน</span>' : data == '2' ? '<span class="badge badge-success">หน้างาน</span>' : '-';
                    }
                }, //6
                {
                    title: "<span style='font-size:11px;'>สาเหตุ</span>",
                    data: "cn_req_job_cause",
                    width: "15%",
                    class: "tx-center",
                    render: function (data, type, row, meta) {
                        let job_comment_obj = job_comment_dataSet.find(obj => obj.id === data);
                        return '<span style="font-size:11px;">' + job_comment_obj.text + '</span>';
                    }
                }, //7
                {
                    title: "<span style='font-size:11px;'>โดย</span>",
                    width: "10%",
                    class: "tx-center",
                    data: 'created_by',
                    render: function (data, type, row, meta) {
                        return '<div class="tx-left">' + data + '</div>'
                    }
                }],

                order: [
                    [1, 'asc'],
                ],

                "order": [[0, "asc"]],

            });



            $("#global-loader").fadeOut("slow");

        }

    });

};

$.Create = async function () {

    $("#saletra_qty").on("keypress keyup blur", function (event) {
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        } /// numeric only

        let max = parseInt($(this).attr('max'));
        let min = parseInt($(this).attr('min'));

        if ($("#saletra_qty").val() > max) {
            $("#saletra_qty").val(max);
        }
        else if ($("#saletra_qty").val() < min) {
            $("#saletra_qty").val(min);
        }
    });

    $('#btn-save-form').on('click', function (e) {
        e.preventDefault();

        var frm_data = $('#frm_data').parsley();
        if (frm_data.isValid()) {

            $('#btn-save-form').prop('disabled', true);

            let add_data = {
                cn_req_salefile_number: $('#frm_data').find('#salefile_number').val(),
                cn_req_salefile_stkcod: $('#saletra_item_list').find(":selected").data('stkcod'),
                cn_req_job_qty: $('#frm_data').find('#saletra_qty').val(),
                cn_req_job_cause: $('#frm_data').find('#job_comment').val(),
                cn_req_job_assige: $('#frm_data').find('#cn_pre_job_type').val() == '1' ? 'TRP' : 'IVC',
                cn_req_job_source: $('#frm_data').find('#cn_pre_job_type').val(),  //1 = รับคืน, 2 = หน้างาน
                cn_req_job_note: $('#frm_data').find('#cn_pre_job_detail_remark').val(),
                created_by: user_id,
                record_status: $('#frm_data').find('#cn_pre_job_type').val() == '1' ? 2 : 1  //1 = Open, 2 = OnProcess, 3 = Receive, 4 = Reject, 0 = Cancel
            };

            var params = [];
            for (const i in add_data) {
                params.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            fetch(url_cn_req_create, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params.join("&"),
            }).then(data => {
                return data.json();
            }).then(data => {

                if (data.status === 'Error') {
                    toastr.error(data.error_message);

                } else {

                    toastr.success('Save Successfully!', async function () {

                        $.List();

                        $('#frm_data input:not(#job_status , #created_by)').val('')
                        $('#frm_data select').val('').trigger('change')
                        $('#cn_pre_job_type').val('1').trigger('change.select2');
                        $('#btn-save-form').prop('disabled', false);

                        $('#saletra_item_list').empty();
                        $('#item_list').empty();

                        $('.saletra_item_list').addClass('d-none')
                        $('#saletra_item_list').removeAttr('required')

                        $('.item_list').removeClass('d-none')
                        $('#item_list').attr('required')
                        $("#saletra_qty").attr({ "max": "500" });


                    });
                }

            }).catch((error) => {
                toastr.error(error, 'Error writing document');
                console.error('Error:', error);
            });

            return false;

            //    return true;
        } else {
            frm_data.validate();
        }

    });
};

$.SearchJob = function () {

    $('#salefile_number').on('keypress keyup blur', function (e) {

        //e.preventDefault();
        $(this).val($(this).val().toUpperCase());

        if ($(this).val().length === 12) {

            if (e.which >= 65 && e.which <= 105) {

                $("#global-loader").fadeIn("slow");

                $('#btn-htr-iv').removeClass('d-none');
                $('#item_list').empty();

                $('.saletra_item_list').removeClass('d-none')
                $('#saletra_item_list').attr('required')

                $('.item_list').addClass('d-none')
                $('#item_list').removeAttr('required')

                fetch(url_salefile_get + '?cn_req_salefile_number=' + $(this).val()).then(function (response) {

                    return response.json();

                }).then(function (result) {
                    $("#global-loader").fadeOut("slow");

                    if (result.length > 0) {

                        $('#saletra_item_list').empty();
                        $('#item_list').empty();

                        $('.saletra_item_list').removeClass('d-none')
                        $('#saletra_item_list').attr('required')
                        $('#saletra_item_list').prop("disabled", false);

                        $('.item_list').addClass('d-none')
                        $('#item_list').removeAttr('required')

                        $('#salefile_invcode').val(result.data[0]['empcod']);
                        $('#salefile_invname').val(result.data[0]['empname']);

                        $.each(result.data, function (key, val) {
                            $('#saletra_item_list').append('<option value="' + $.trim(val['number']) + '" data-gbarcode="' + $.trim(val['gbarcode']) + '"data-name="' + $.trim(val['stkname']) + '"data-spcode="' + $.trim(val['spcodes']) + '" data-whdiscode="' + $.trim(val['whdiscode']) + '" data-trnqty="' + $.trim(val['item']) + '" data-stkcod="' + $.trim(val['stkcod']) + '">' + $.trim(val['gbarcode']) + ' : ' + $.trim(val['stkname']) + ' (' + $.trim(val['spcodes']) + ')</option>')
                        });

                        $("#saletra_qty").attr({ "max": $("[name=saletra_item_list]").find(':selected').data("trnqty") });

                    } else {

                        flex_iv = 0;

                        $('#saletra_item_list').prop("disabled", false);
                        $('#item_list').prop("disabled", false);
                        swal({
                            type: 'error',
                            title: 'ไม่พบเลขที่ใบเสร็จ',
                            text: 'กรุณาตรวจสอบเลขที่ใบเสร็จอีกครั้ง!',
                        }, function (isConfirmed) {
                            // if (isConfirmed) {

                            //     

                            // }
                        })

                    }

                });

            }

        } else if ($(this).val().length > 12) {
            flex_iv = 0;

            swal({
                type: 'error',
                title: 'เลขที่ใบเสร็จไม่ถูกต้อง',
                text: 'กรุณาตรวจสอบเลขที่ใบเสร็จอีกครั้ง!',
            }, function (isConfirmed) {
                // if (isConfirmed) {

                //     location.reload();

                // }
            })

        } else {

            flex_iv = 0;

            $('#btn-htr-iv').addClass('d-none');

            $('#saletra_item_list').empty();
            $('#item_list').empty();
            $('#salefile_invcode').val("");
            $('#salefile_invname').val("");

            $('.saletra_item_list').addClass('d-none')
            $('#saletra_item_list').removeAttr('required')

            $('.item_list').removeClass('d-none')
            $('#item_list').attr('required')
            $("#saletra_qty").attr({ "max": "500" });

            if ($(this).val().length === 0) {

                $('#item_list').prop("disabled", false);
            } else {
                $('#saletra_item_list').prop("disabled", true);
                $('#item_list').prop("disabled", true);
            }


        }

    });

}

$.Load_cause = function () {
    let Get_comment = new URL(url_cn_req_cause_get);

    fetch(Get_comment).then(function (response) {
        return response.json();
    }).then(function (result) {
        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }, function (isConfirmed) {
                if (isConfirmed) {

                    location.reload();

                }
            })
        } else {

            $.each(result.data, function (key, val) {
                job_comment_dataSet.push({ id: val['lov_code'], text: val['lov_code'] + ' : ' + val['lov1'] });
                job_comment_dataSet_list.push({ id: val['lov_code'], text: val['lov1'] });

            });

            $('#job_comment').select2({
                width: '100%',
                height: '40px',
                data: job_comment_dataSet,
                templateResult: function (data) {
                    return data.text;
                },
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    });
                }
            });
        }

    });
}

$.Load_comment = function () {
    let Get_comment = new URL(url_cn_req_lov_get);

    //Get_comment.search = new URLSearchParams({
    //    lov_type: 'Pre Job Code'
    //});

    fetch(Get_comment).then(function (response) {
        return response.json();
    }).then(function (result) {
        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }, function (isConfirmed) {
                if (isConfirmed) {

                    location.reload();

                }
            })
        } else {

            $.each(result.data, function (key, val) {
                job_comment_dataSet.push({ id: val['lov_code'], text: val['lov_code'] + ' : ' + val['lov1'] });
                job_comment_dataSet_list.push({ id: val['lov_code'], text: val['lov1'] });

            });

            $('#job_comment').select2({
                width: '100%',
                height: '40px',
                data: job_comment_dataSet,
                templateResult: function (data) {
                    return data.text;
                },
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    });
                }
            });
        }

    });


}

$.Load_source = function () {
    let Get_source = new URL(url_cn_req_source_get);

    fetch(Get_source).then(function (response) {
        return response.json();
    }).then(function (result) {
        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }, function (isConfirmed) {
                if (isConfirmed) {

                    location.reload();

                }
            })
        } else {

            $.each(result.data, function (key, val) {
                job_source_dataSet.push({ id: val['lov_code'], text: val['lov1'] + ' : ' + val['lov2'] });
                job_source_dataSet_list.push({ id: val['lov_code'], text: val['lov1'] });

            });

            $('#cn_pre_job_type').select2({
                width: '100%',
                height: '40px',
                data: job_source_dataSet_list,
                templateResult: function (data) {
                    return data.text;
                },
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    });
                }
            });
        }

    });
}

$.Load_status = function () {
    let get_status = new URL(url_cn_req_status_get);

    fetch(get_status).then(function (response) {
        return response.json();
    }).then(function (result) {
        if (result.status === 'Error') {

            $.LoadingOverlay("hide");

            $("#global-loader").fadeOut("slow");

            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }, function (isConfirmed) {
                if (isConfirmed) {

                    location.reload();

                }
            })
        } else {

            $.each(result.data, function (key, val) {
                job_status_dataSet.push({ id: val['lov_code'], text: val['lov1'] + ' : ' + val['lov2'] });
                job_status_dataSet_list.push({ id: val['lov_code'], text: val['lov1'] });

            });

            $('#job_status_search').select2({
                width: '100%',
                height: '40px',
                data: job_status_dataSet,
                templateResult: function (data) {
                    return data.text;
                },
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    });
                }
            });

            $('#job_status_edit').select2({
                width: '100%',
                height: '40px',
                data: job_status_dataSet,
                templateResult: function (data) {
                    return data.text;
                },
                sorter: function (data) {
                    return data.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    });
                }
            });
        }

    });
}


firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        $(document).ready(async function () {

            await $("#global-loader").css('opacity', '0.5').fadeIn("slow");
            $("#global-loader").fadeOut("slow");
            await $.init();
            //await $.List();
            //await $.Create();

        });


    } else {

        window.location.assign('./login');

    }

});