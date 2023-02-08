'use strict';

let fs = firebase.firestore();
let oTable, name, oTable_inv, branch, cus_branch, citem;


const url_api_master = 'http://192.168.1.247/vsk-api-acc/';
//const url_app_ui = "http://192.168.1.247/intranet/public/inv-app/tax-detail";
//const url_api_local = "http://192.168.1.247/vsk-api-inv";

 const url_api_local = "http://localhost:49705/";
 const url_app_ui = "http://localhost:57916/inv-app/tax-detail";

const customer_select2_get = url_api_master + 'api/ACC/VSK_Emmas_Select2_GET';
const company_get = url_api_local + '/v1/company_get';
const inv_header_get = url_api_local + '/v1/inv_header_get';
const inv_header_cancel = url_api_local + 'v1/inv_header_cancel';

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

    $.List();
    $.Company_Get();

    $('#add-inv-head').on('click', function () {
        window.open(url_app_ui + '?act=add');
    })

    $('#emmas_search').select2({
        ajax: {
            url: customer_select2_get,
            dataType: 'json',
            width: 'resolve',
            dropdownAutoWidth: true,
            minimumInputLength: 2,
            minimumResultsForSearch: 50,
            data: function (params) {
                var query = {
                    search: typeof params.term !== 'undefined' ? params.term : ' ',
                }
                //console.log(params);
                return query;
            },
            matcher: function (params, data) {
                return matchStart(params, data);
            },
            processResults: function (resulte, search) {
                return {
                    results: $.map(resulte.data, function (item) {
                        return {
                            text: item.text,
                            id: item.id
                        }
                    })
                };
            },
        }
    });

    $('#search-header').on('click', function (e) {
        e.preventDefault();
        $.List();
    })

    $('#frm_search').submit(async function (e) {

        e.preventDefault();
        $.List(); //after search

    });
};

$.List = async function () {
    $("#global-loader").fadeIn("slow");

    let url = new URL(inv_header_get);

    let search_start_date = $('#pk_date').val() != '' ? moment($('#pk_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 00:00' : moment().format('YYYY-MM-DD') + ' 00:00';  //ถ้าไม่เลือกจะเป็นค่าว่าง
    let search_end_date = $('#pk_date').val() != '' ? moment($('#pk_date').val().substring(11, 25), 'DD/MM/YYYY').format('YYYY-MM-DD') + ' 23:59' : moment().format('YYYY-MM-DD') + ' 23:59';

    url.search = new URLSearchParams({
        emmas_code: $('#emmas_search').val(),
        tax_number: $('#tax_number').val(),
        pk_number: $('#pk_number').val(),
        invapp_masterdata_company_id: $('#co_name_search').val(),
        pk_datetime_start: search_start_date,
        pk_datetime_end: search_end_date,
        record_status: '1',
        mode: 'Search'
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {
        //oTable.destroy();
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

            oTable = $('#tbl-list').DataTable({
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
                        title: "<span style='font-size:11px;'>เลขที่อ้างอิง</span>",
                        data: "inv_tax_jobno",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //2

                    {
                        title: "<span style='font-size:11px;'>เลขที่ใบเสร็จ</span>",
                        data: "pk_number",
                        width: "70px",
                        visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //2

                    {
                        title: "<span style='font-size:11px;'>เลขที่ใบงาน</span>",
                        data: "pu_no",
                        width: "100px",
                        visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            let pu_no = data != null ? data : '-'
                            return '<span style="font-size:11px;">' + pu_no + '</span>';
                        }
                    }, //3

                    {
                        title: "<span style='font-size:11px;'>ชื่อผู้ขาย</span>",
                        data: "co_name",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>ลูกค้า</span>",
                        data: "customer_name",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            return '<span style="font-size:11px;">' + data + '</span>';
                        }
                    }, //2

                    {
                        title: "<span style='font-size:11px;'>เลขที่ในกำกับภาษี</span>",
                        data: "tax_number",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            let tax_number = data != null ? data : '-'
                            let inv_tax_jobno = row.inv_tax_jobno
                            return '<a href="http://192.168.1.159/ReportServer/Pages/ReportViewer.aspx?%2fINV-Report%2fReport_tax1&rs:Command=Render&inv_tax_jobno=' + inv_tax_jobno +'&rs:Format=pdf", "_blank">' + '<span style="font-size:11px;">' + tax_number + '</span>' + '</a>';

                        }
                    }, //2
                    {
                        title: "<span style='font-size:11px;'>เลขที่ใบเสนอราคา</span>",
                        data: "quote_number",
                        width: "70px",
                        //visible: false,
                        class: "tx-center",
                        render: function (data, type, row, meta) {
                            let qo_number = data != null ? data : '-'
                            let inv_tax_jobno = row.inv_tax_jobno

                            return '<a href="http://192.168.1.159/ReportServer/Pages/ReportViewer.aspx?%2fINV-Report%2fReport_Qo&rs:Command=Render&inv_tax_jobno=' + inv_tax_jobno + '&rs:Format=pdf", "_blank">' + '<span style="font-size:11px;">' + qo_number + '</span>' + '</a>';
                        }
                    }, //2

                ],


                //"order": [[0, "desc"]],
                "initComplete": function (settings, json) {

                    $("#global-loader").fadeOut("slow");


                    $('#tbl-list tbody tr').hover(function () {
                        $(this).css('cursor', 'pointer');
                    });

                    $.contextMenu({
                        selector: '#tbl-list tbody tr',
                        callback: async function (key, options) {

                            let data = oTable.row(this).data();

                            let citem = {
                                id: data['id'],
                                pk_number: data['pk_number'],
                                pu_no: data['pu_no'],
                                pu_noemmas_code: data['emmas_code'],
                                upnetprice_id: data['upnetprice_id'],
                                stmas_id: data['stmas_id'],
                                quote_number: data['quote_number'],
                                inv_date: data['inv_date'],
                                invapp_masterdata_company_id: data['invapp_masterdata_company_id'],
                                payment_due: data['payment_due'],
                                sale_name: data['sale_name'],
                                claim_number: data['claim_number'],
                                credit: data['credit'],
                                payment_type: data['payment_type'],
                                has_discount: data['has_discount'],
                                discount_baht: data['discount_baht'],
                                discount_percent: data['discount_percent'],
                                car_number_plate: data['car_number_plate'],
                                has_promotion: data['has_promotion'],
                                deposit: data['deposit'],
                                status_inv: data['status_inv'],
                                reject_descript: data['reject_descript'],
                                pu_no: data['pu_no'],
                                pro_total: data['pro_total'],
                                price_net: data['price_net'],
                                trade_discount: data['trade_discount'],
                                discount_total: data['discount_total'],
                                vat_total: data['vat_total'],
                                deposit_total: data['deposit_total'],
                                price_net_total: data['price_net_total'],
                                record_status: data['record_status'],
                                created_by: data['created_by'],
                                created_datetime: data['created_datetime'],
                                updated_by: data['updated_by'],
                                updated_datetime: data['updated_datetime'],
                                invapp_sale_master_id: data['invapp_sale_master_id'],
                                vat_std: data['vat_std'],
                                co_name: data['co_name'],
                                co_shotname: data['co_shotname'],
                                tax_number: data['tax_number'],
                                inv_tax_jobno: data['inv_tax_jobno'],
                            };

                            $('#modal-frm_data').modal({

                                keyboard: false,
                                backdrop: 'static'

                            });

                            if (key === 'edit') {

                                window.open(url_app_ui + '?act=edit&pk=' + citem['pk_number'] + '&inv=' + citem['tax_number'], '_blank');

                            } else if (key === 'edit-pk') {

                                window.open(url_app_ui + '?act=editpk&pk=' + citem['pk_number'] + '&inv=' + citem['tax_number'], '_blank');

                            } else if (key === 'cancel') {

                                $.Delete(citem);

                            } else {

                                alert('ERROR');

                            }

                        },

                        items: {

                            "edit": { name: "Edit", icon: "edit edit-detail" },
                            "edit-pk": { name: "แก้ไขเลขที่ PK", icon: "edit edit-pk", disabled: true},
                            "cancel": { name: "cancel", icon: "cancel"},
                        }

                    });

                },
            });

        }
    })

};

$.Company_Get = async function () {
    let company_get_api = new URL(company_get);

    company_get_api.search = new URLSearchParams({
        mode: 'Search',
        record_status: 1
    });

    fetch(company_get_api).then(function (response) {
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
            $.each(result.data, function (index, item) {
                $('#co_name_search').append(`<option value="${item['invapp_masterdata_company_id']}" data-branch="${item['co_branchname']}" data-branchcode="${item['co_shotname']}" >${item['co_name']}</option>`);
            });

        }

    });
    return false;
}

$.Header_Get = async function () {
    //$("#global-loader").fadeIn("slow");

    let url = new URL(inv_header_get);

    url.search = new URLSearchParams({
        //emmas_code: $('#emmas_search').val(),
        //tax_number: $('#tax_number').val(),
        //pk_number: $('#pk_number').val(),
        //invapp_masterdata_company_id: $('#co_name_search').val(),
        record_status: '1',
        mode: 'Select2'
    });

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (result) {
        //oTable.destroy();
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
            $.each(result.data, function (index, item) {
                //$('#co_name_search').append(`<option value="${item['invapp_masterdata_company_id']}" data-branch="${item['co_branchname']}" data-branchcode="${item['co_shotname']}" >${item['co_name']}</option>`);
                //console.log('item: ', item);

                var ivOption = new Option(item['pk_number'], item['pk_number'], false, false);
                var taxOption = new Option(item['tax_number'], item['tax_number'], false, false);
                //$('#pk_number').append(ivOption).trigger('change');
                $('#pk_number').append(`<option value="${item['pk_number']}" data-date="${item['created_datetime']}" >${item['pk_number']}</option>`).trigger('change');
                $('#tax_number').append(taxOption).trigger('change');
            });

        }
    });
}

$.Delete = async function (citem) {
    Swal.fire({
        title: '<span style="font-size:18px;">ยืนยันการลบหรือไม่ ? </span>',
        html: '<div class="row"><label class="col-sm-3 col-form-label tx-16">สาเหตุยกเลิก</label><input type="text" class="form-control col-sm-9" id="reject_descript" name="reject_descript" value=""></div>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {

        if (result.isConfirmed) {
            let edit_data = {
                pk_number: citem['pk_number'],
                inv_tax_jobno: citem['inv_tax_jobno'],
                reject_descript: $('#reject_descript').val(),
                updated_by: name,
                record_status: '2',
                pMessage: ''
            };

            var params = [];
            for (const i in edit_data) {
                params.push(i + "=" + encodeURIComponent(edit_data[i]));
            }

            fetch(inv_header_cancel, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params.join("&"),
            }).then(data => {
                return data.json();
            }).then(data => {
                toastr.success('Delete Successfully!', async function () {

                    $.List();

                });

            }).catch(error => {
                toastr.error(error, 'Error writing document');
                //console.error("Error writing document: ", error);
            })
        }
    })

}

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
    await $.Header_Get();
});

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        var full_mail = user.email;
        name = full_mail.replace("@vskautoparts.com", "");

    } else {

        window.location.assign('./login');

    }

});