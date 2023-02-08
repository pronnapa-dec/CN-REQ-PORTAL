'use strict';

let fs = firebase.firestore();

const url_api = "http://192.168.1.247/intranet/pur-api";

const url_salefile_get = url_api + '/v1/salefile_get';
const url_saletra_get = url_api + '/v1/saletra_get';
const url_cn_pre_job_get = url_api + '/v1/cn_pre_job_get';
const url_cn_pre_job_create = url_api + '/v1/cn_pre_job_create';
const Cn_Lov_Get = url_api + '/v1/Cn_Lov_Get';
const lists_get = url_api + '/v1/Cn_Pre_Job_Get';

let oTable = $('#tbl-prejob_list').DataTable({ "order": [[0, "desc"]], "pageLength": 50 });
let history_Table;//$('#tbl-list-history').DataTable({ "order": [[0, "desc"]], "pageLength": 50 });

let cn_pre_job_type_dataset = [];
let job_comment_dataSet = [];
let job_comment_dataSet_list = [];


firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        console.log(user);

        $.Load_comment = function () {
            let Get_comment = new URL(Cn_Lov_Get); /// kung edit 27/11/20

            fetch(Get_comment).then(function (response) {
                return response.json();
            }).then(function (result) {
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

        $.init = async function () {

            // Start LOV JOB TYPE
            let job_type_query = fs.collection('lov_cn').where("active_flag", "==", "Y").where("lov_type", "==", "Case Type");

            job_type_query.get().then(function (querySnapshot) {

                querySnapshot.forEach(function (doc) {

                    cn_pre_job_type_dataset.push({ id: doc.data().lov_code, text: doc.data().lov1 });

                });

                console.log("cn_pre_job_type_dataset", cn_pre_job_type_dataset);



                $('#cn_pre_job_type').select2({
           
                    width: '100%',
                    minimumResultsForSearch: Infinity,
                    data: cn_pre_job_type_dataset,
                    templateResult: function (data) {
                        return data.text;
                    },
                    sorter: function (data) {
                        return data.sort(function (a, b) {
                            return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;  
                        });
                    }
                });


                $('#cn_pre_job_type').val('1').trigger('change.select2');


            });
            // End LOV JOB TYPE

            // Start LOV JOB COMMENT
            $.Load_comment();

            //let job_comment_query = fs.collection('lov_cn').where("active_flag", "==", "Y").where("lov_type", "==", "Pre Job Code");

            //job_comment_query.get().then(function (querySnapshot) {

            //    querySnapshot.forEach(function (doc) {

            //        job_comment_dataSet.push({ id: doc.data().lov_code, text: doc.data().lov_code + ' : ' + doc.data().lov1 });

            //    });

            //    $('#job_comment').select2({
            //        width: '100%',
            //        height: '40px',
            //        data: job_comment_dataSet,
            //        templateResult: function (data) {
            //            return data.text;
            //        },
            //        sorter: function (data) {
            //            return data.sort(function (a, b) {
            //                return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
            //            });
            //        }
            //    });



            //});
            // End LOV JOB COMMENT
        };

        $.List = async function (mode) {

            console.log('function $.List() ',job_comment_dataSet)

            let get_data = {
                cn_pre_job_datetime_start: moment().format('YYYY-MM-DD') + ' 00:00',
                cn_pre_job_datetime_end: moment().format('YYYY-MM-DD') + ' 23:59',
                record_status: 1,
                Mode: 'Search'
            };

            var params = [];
            for (const i in get_data) {
                params.push(i + "=" + encodeURIComponent(get_data[i]));
            }

            fetch(url_cn_pre_job_get + '?' + params.join("&")).then(function (response) {

                return response.json();

            }).then(function (result) {

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

                    $.each(result.data, async function (key, val) {

                        let job_comment_obj = fs.collection('lov_cn').where("active_flag", "==", "Y").where("lov_type", "==", "Pre Job Code").where("lov_code", "==", val['cn_pre_job_comment']);

                        job_comment_obj.get().then(function (querySnapshot) {

                            querySnapshot.forEach(function (doc) {

                                oTable.row.add([
                                    moment(val['cn_pre_job_datetime']).format('HH:mm:ss'),
                                    '<div data-placement="top" data-toggle="tooltip-primary" title="' + val['salefile_invcode'] + '"> ' + '<a href="http://192.168.1.247/intranet/report/cn-rpt/Pages/RPT_CN/RPT_CN_REINVOICE?cn_pre_job_jobno=' + val['cn_pre_job_jobno']+'&salefile_number=' + val['salefile_number'] + '&gbarcode=' + val['saletra_item_barcode'] + '&salefile_invcode=' + val['salefile_invcode'] +'" target="_blank"><b>'+ val['salefile_number'] + '<b></a></div>',
                                    '<div class="tx-left">' + val['saletra_item_barcode'] + ': ' + val['saletra_item_name'] + ' (' + val['saletra_item_spcodes'] + ')' + '</div>',
                                    val['cn_pre_job_qty'],
                                    (val['saletra_item_whdiscode'] === 'ST' ? '<span class="badge badge-success">ST</span>' : '<span class="badge badge-danger">EO</span>'),
                                    (val['cn_pre_job_type'] === '1' ? '<span class="badge badge-info">รับคืน</span>' : '<span class="badge badge-success">หน้างาน</span>'),
                                    '<div class="tx-left">' + doc.data().lov_code + ' : ' + doc.data().lov1 + '</div>',
                                    val['created_by']
                                ]).draw(false);



                            });
                        });

                    });

                    $("#global-loader").fadeOut("slow");

                }

            });

        };

        $.Create = async function () {

            var today = new Date();
            var dd = today.getDate();

            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }

            if (mm < 10) {
                mm = '0' + mm;
            }

            today = dd + '/' + mm + '/' + yyyy;

            $('#tiltle-table').html("รายการ รับคืนประจำวัน" + "   " + today)
            $('#last_update').html(moment().format('DD/MM/YYYY HH:mm:ss'))

            var full_mail = user.email;
            var name = full_mail.replace("@vskautoparts.com", "");

            $('#created_by').val(name);

            $('#salefile_number').keyup(async function (e) {

                e.preventDefault();
                $(this).val($(this).val().toUpperCase());

                if ($(this).val().length === 12) {

                    if (e.keyCode >= 65 && e.keyCode <= 105) {

                        fetch(url_salefile_get + '?number=' + $(this).val()).then(function (response) {

                            return response.json();

                        }).then(function (result) {
                            if (result.length > 0) {

                                $.each(result.data, function (key, val) {

                                    $('#salefile_invcode').val(val['invcode']);
                                    $('#salefile_invname').val(val['invname']);

                                });

                                fetch(url_saletra_get + '?number=' + $('#salefile_number').val()).then(function (response) {

                                    return response.json();

                                }).then(function (result) {

                                    console.log(result.data)

                                    $('#saletra_item_list').empty();

                                    $.each(result.data, function (key, val) {

                                        $('#saletra_item_list').append('<option value="' + $.trim(val['number']) + '" data-gbarcode="' + $.trim(val['gbarcode']) + '" data-whdiscode="' + $.trim(val['whdiscode']) + '" data-trnqty="' + $.trim(val['trnqty']) + '">' + $.trim(val['gbarcode']) + ' : ' + $.trim(val['stkname']) + ' (' + $.trim(val['spcodes']) + ')</option>')

                                    });
                                    $("#saletra_qty").attr({ "max": $("[name=saletra_item_list]").find(':selected').data("trnqty") });

                                });

                            } else {

                                $('#saletra_item_list').empty();
                                $('#salefile_invcode').val("");
                                $('#salefile_invname').val("");


                                console.log('No Data');

                            }

                        });

                    }

                } else {

                    $('#saletra_item_list').empty();
                    $('#salefile_invcode').val("");
                    $('#salefile_invname').val("");

                }

            });

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
            $("[name=saletra_item_list]").change(function () {
                let trnqty = $(this).find(':selected').data("trnqty");
                console.log(trnqty);
                $("#saletra_qty").val("");
                $("#saletra_qty").attr({"max": trnqty });
            });

            $('#btn-save_form').click(function (e) {

                $('#frm_data').parsley().on('form:submit', function () {

                    $('#btn-save_form').prop('disabled', true);

                    // oTable.destroy();

                    let uuid = $.uuid();

                    // Model & Repo ไปเปลี่ยนเอาเอง
                    let add_data = {
                        salefile_number: $('#frm_data').find('#salefile_number').val(),
                        salefile_invcode: $('#frm_data').find('#salefile_invcode').val(),
                        saletra_item_barcode: $('#saletra_item_list').find(":selected").data('gbarcode'),
                        cn_pre_job_qty: $('#frm_data').find('#saletra_qty').val(),
                        cn_pre_job_type: $('#frm_data').find('#cn_pre_job_type').val(),
                        cn_pre_job_comment: $('#frm_data').find('#job_comment').val(),
                        cn_pre_job_detail_remark: $('#frm_data').find('#cn_pre_job_detail_remark').val(),
                        record_status: '1',
                        created_by: name
                    };

                    var params = [];
                    for (const i in add_data) {
                        params.push(i + "=" + encodeURIComponent(add_data[i]));
                    }

                    var resStatus = 0;

                    fetch(url_cn_pre_job_create, {
                        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                        // mode: 'no-cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                        body: params.join("&"),
                    }).then(data => {
                        resStatus = data.status
                        return data.json();
                    }).then(data => {
                        resStatus = data.status;

                        if (data.status === 'Error') {
                            toastr.error(data.error_message);

                        } else {

                            toastr.success('Save Successfully!', async function () {

                                $('#btn-save_form').prop('disabled', false);
                                $("#frm_data").parsley().reset();  // kung edit 14/11/20
                                oTable.row.add([
                                    moment().format('HH:mm:ss'),
                                    $('#salefile_number').val(),
                                    '<div class="tx-left">' + $('#saletra_item_list').find(":selected").text() + '</div>',
                                    $('#saletra_qty').val(),
                                    ($('#saletra_item_list').find(":selected").data('whdiscode') === 'ST' ? '<span class="badge badge-success">ST</span>' : '<span class="badge badge-danger">EO</span>'),
                                    ($('#cn_pre_job_type').find(":selected").val() === '1' ? '<span class="badge badge-info">รับคืน</span>' : '<span class="badge badge-primary">หน้างาน</span>'),
                                    '<div class="tx-left">' + $('#job_comment').find(":selected").text() + '</div>',
                                    $('#created_by').val()
                                ]).draw();

                                $('#salefile_number').val('');
                                $('#saletra_item_list').empty();
                                $('#saletra_qty').val('');
                                $('#cn_pre_job_type').val('1').trigger('change.select2');
                                $('#job_comment').val('').trigger('change.select2');
                                $('#salefile_invcode').val("");
                                $('#salefile_invname').val("");
                                $('#cn_pre_job_detail_remark').val("");

                            });
                        }

                    }).catch((error) => {
                        toastr.error(error, 'Error writing document');
                        console.error('Error:', error);
                    });

                    return false;

                });

            });
        };

        $.History = async function () {

            $('#modal-frm_history').on('shown.bs.modal', function () {

                console.log('History', $('#salefile_number').val())

                let url = new URL(lists_get);
                var CNdate_start = '2020-11-01 00:00:00.0';
                var CNdate_end = moment().format('YYYY-MM-DD') + ' 23:59:00.0';
                url.search = new URLSearchParams({
                    cn_pre_job_datetime_start: CNdate_start,
                    cn_pre_job_datetime_end: CNdate_end,
                    salefile_number: $('#salefile_number').val(),
                    saletra_item_barcode: '',
                    cn_pre_job_comment: '',
                    created_by: '',
                    cn_pre_job_status: '',
                    cn_pre_job_jobno: '',
                    cn_pre_job_assige: '',
                    record_status: '1',
                    mode: 'search'
                });

                fetch(url).then(function (response) {
                    return response.json();
                }).then(function (result) {
                    $('#tbl-list-history').css({ "width": "100%" });

                    history_Table = $('#tbl-list-history').DataTable({
                        data: result.data,
                        //scrollX: true,
                        //scrollCollapse: true,
                        // autoWidth: true,
                        destroy:true,
                        paging: true,
                        columns: [
                            {
                                title: "<span style='font-size:11px;'>วันที่/เวลา</span>",
                                data: "created_date",
                                width: "70px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span style="font-size:11px;">' + moment(data).format('DD/MM/YYYY') + '  ' + moment(data).format('HH:mm') + '<span/>';
                                }
                            }, //1
                            {
                                title: "<span style='font-size:11px;'>สถานะ</span>",
                                data: "cn_pre_job_status",
                                width: "70px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {

                                    if (data == 'open') {
                                        return '<span style="color:red; ">Open</span>';
                                    } else if (data == "on_process") {
                                        return '<span style="color:orange;">On Process</span>';
                                    } else if (data == "receive") {
                                        return '<span style="color:green;">Receive</span>';
                                    } else if (data == "complete") {
                                        return '<span style="color:green;">Complete</span>';
                                    } else if (data == "rejected") {
                                        return '<span style="color:red;">Rejected</span>';
                                    } else if (data == "change") {
                                        return '<span style="color:#00AEFF;">Change</span>';
                                    } else if (data == "cancel") {
                                        return '<span style="color:#FFC300">Cancel</span>';
                                    } else {
                                        return '<span style="color:#000">' + data + '</span>';
                                    }

                                }
                            }, //2
                            {
                                title: "<span style='font-size:11px;'>ข้อมูลสินค้า</span>",
                                data: "saletra_item_name",
                                //width: "70px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span>' + data + '</span>';
                                }
                            }, //3
                            {
                                title: "<span style='font-size:11px;'>QTY</span>",
                                data: "cn_pre_job_qty",
                                //width: "70px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span>' + data + '</span>';
                                }
                            }, //4
                            {
                                title: "<span style='font-size:11px;'>WH</span>",
                                data: "saletra_item_whdiscode",
                                //width: "70px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    if (data === 'ST') {
                                        return '<span class="badge badge-success">' + data + '</span>';
                                    } else {
                                        return '<span class="badge badge-danger">' + data + '</span>';

                                    }
                                }
                            }, //5
                            {
                                title: "<span style='font-size:11px;'>การแจ้งรับ</span>",
                                data: "cn_pre_job_type",
                                //width: "70px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    if (data == '1') {
                                        return '<span>' + 'รับคืน' + '</span>';
                                    } else {
                                        return '<span>' + 'หน้างาน' + '</span>';

                                    }
                                }
                            }, //6
                            {
                                title: "<span style='font-size:11px;'>โดย</span>",
                                data: "created_by",
                                width: "70px",
                                //visible: false,
                                class: "tx-center",
                                render: function (data, type, row, meta) {
                                    return '<span>' + data + '</span>';
                                }
                            }, //7


                        ],

                    });

                });


            });

            $('#modal-frm_history').on('hidden.bs.modal', function () {


            });

        }

        $(document).ready(async function () {

            await $("#global-loader").css('opacity','0.5').fadeIn("slow");
            await $.init();
            await $.List();
            await $.Create();
            await $.History();

        });


    } else {

        window.location.assign('./login');

    }

});