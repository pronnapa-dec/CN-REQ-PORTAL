'use strict';

const objProfile = JSON.parse(localStorage.getItem('objAuth'));
const application_id = objProfile[0]['application'];
const user_id = objProfile[0]['username'];
const url_api = "http://localhost:49705";
//const url_api = "http://192.168.1.247:8899/ca-api";

let url_image = 'http://localhost/image_slip/'
//let url_image = 'http://192.168.1.247:8899/image_slip/'
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const url_slip_detail = url_api + '/v1/Slip_Detail';
const url_slip_create = url_api + '/v1/Slip_Create';
const url_slip_upload = url_api + '/v1/Slip_Upload';
const url_slip_update = url_api + '/v1/Slip_Update';
const url_slip_bill_create = url_api + '/v1/Slip_Bill_Create';
const url_slip_bill_list = url_api + '/v1/Slip_Bill_List';
const url_slip_bill_delete = url_api + '/v1/Slip_Bill_Delete';
const url_master_get = url_api + '/v1/Slip_Master';

let oTable = $('#tbl-list').DataTable();
let table_bill;

function isNumber(evt, element) {

    var charCode = (evt.which) ? evt.which : event.keyCode

    if (
        //(charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
        (charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        return false;

    return true;
}

let customElement = $("<div>", {
    "css": {
        "border": "2px solid",
        "font-size": "14px",
        "text-align": "center",
        "padding": '7px'

    },
    "text": 'Please Wait...'
});

firebase.auth().onAuthStateChanged(async function (user) {

    if (user) {

     
    } else {

        window.location.assign('./login');

    }

});

$(document).ready(async function () {

    await $.init();

    const detectImageForm = document.querySelector("#detectImageForm");
    const imageFile = detectImageForm.querySelector("#imageFile");
    const imagePreview = document.querySelector("#imagePreview");
    const result = document.querySelector("#result");

    const setImagePreview = async () => {
        const imageBase64String = await getImageBase64String();
        imagePreview.setAttribute("src", imageBase64String);
    };

    const detectImage = async () => {

        const imageBase64String = await getImageBase64String();
        const data = {
            requests: [
                {
                    image: {
                        content: imageBase64String.replace(/^data:.+;base64,/, "")
                    },

                    features: [{ type: "TEXT_DETECTION" }]

                }
            ]
        };
        const url = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCVSfuxagooLTAMfn8ZIkiHCo4mqeNjHCw";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const jsonResponse = await response.json();
        for (const value of jsonResponse.responses) {

            $(".modal-body").LoadingOverlay("hide", true);
            $('#btn-save_exit').show()
            console.log(value);

            result.textContent = value.fullTextAnnotation.text;


            let txtVerified = result.textContent.split(/\r\n|\n|\r/);
            console.log(txtVerified);

            let txtBankname = ''
            let txtResult = ''
            let txtLength = ''

            let raw_ref_datetime = '';
            let raw_ref_code = '';
            let raw_ref_start = '';
            let raw_ref_target = '';
            let raw_ref_total = '0';


            // K_BANK_START //
            if (txtVerified[3] == 'ธ.กสิกรไทย') {
                txtBankname = 'ธนาคารกสิกรไทย';
                if (txtVerified.length == 16) {
                    txtResult = 'k+bank-03-16-01'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[10]
                    raw_ref_start = txtVerified[2] + ' ( ' + txtBankname + ' ) ' + txtVerified[4]
                    raw_ref_target = txtVerified[6] + ' ( ' + txtVerified[7] + ' ) ' + txtVerified[8]
                    raw_ref_total = txtVerified[12] //(txtVerified[12] == null || txtVerified[12] == '') ? 0 : txtVerified[12]
                } else if (txtVerified.length == 17) {
                    if (txtVerified[5].search("จำนวน") >= 0) {
                        txtResult = 'k+bank-03-17-01'
                        raw_ref_datetime = txtVerified[1]
                        raw_ref_code = txtVerified[10]
                        raw_ref_start = txtVerified[2] + ' ( ' + txtBankname + ' ) ' + txtVerified[4]
                        raw_ref_target = txtVerified[6] + ' ( ' + txtVerified[7] + ' ) ' + txtVerified[8]
                        raw_ref_total = txtVerified[12]
                    } else {
                        txtResult = 'k+bank-03-17-02'
                        raw_ref_datetime = txtVerified[1]
                        raw_ref_code = txtVerified[10]
                        raw_ref_start = txtVerified[2] + ' ( ' + txtBankname + ' ) ' + txtVerified[4]
                        raw_ref_target = txtVerified[5] + ' ( ' + txtVerified[6] + ' ) ' + txtVerified[7]
                        raw_ref_total = txtVerified[13]
                    }
                } else {
                    txtResult = 'k+bank-03-00-00'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[10]
                    raw_ref_start = txtVerified[2] + ' ( ' + txtBankname + ' ) ' + txtVerified[4]
                    raw_ref_target = txtVerified[6] + ' ( ' + txtVerified[7] + ' ) ' + txtVerified[8]
                    raw_ref_total = txtVerified[12]
                }
            } else if (txtVerified[4] == 'ธ.กสิกรไทย') {
                txtBankname = 'ธนาคารกสิกรไทย';
                if (txtVerified.length == 16) {
                    txtResult = 'k+bank-04-16-01'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[10]
                    raw_ref_start = txtVerified[3] + ' ( ' + txtBankname + ' ) ' + txtVerified[5]
                    raw_ref_target = txtVerified[7] + ' ( ' + txtVerified[8] + ' ) ' + txtVerified[9]
                    raw_ref_total = (txtVerified[12].search("บาท") >= 0) ? txtVerified[12] : txtVerified[11]
                } else if (txtVerified.length == 17) {
                    txtResult = 'k+bank-04-17-01'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[7]
                    raw_ref_start = txtVerified[3] + ' ( ' + txtBankname + ' ) ' + txtVerified[5]
                    raw_ref_target = txtVerified[8] + ' ( ' + txtVerified[9] + ' ) ' + txtVerified[10]
                    raw_ref_total = (txtVerified[12].search("บาท") >= 0) ? txtVerified[12] : txtVerified[13]
                } else if (txtVerified.length == 18) {
                    txtResult = 'k+bank-04-18-01'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[11]
                    raw_ref_start = txtVerified[3] + ' ( ' + txtBankname + ' ) ' + txtVerified[5]
                    raw_ref_target = txtVerified[6] + ' ( ' + txtVerified[7] + ' ) ' + txtVerified[8]
                    raw_ref_total = (txtVerified[12].search("บาท") >= 0) ? txtVerified[12] : txtVerified[13]
                } else {
                    txtResult = 'k+bank-04-00-00'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[10]
                    raw_ref_start = txtVerified[3] + ' ( ' + txtBankname + ' ) ' + txtVerified[5]
                    raw_ref_target = txtVerified[7] + ' ( ' + txtVerified[8] + ' ) ' + txtVerified[9]
                    raw_ref_total = txtVerified[11]
                }
            } else if (txtVerified[5] == 'ธ.กสิกรไทย') {
                txtBankname = 'ธนาคารกสิกรไทย';
                if (txtVerified.length == 16) {
                    txtResult = 'k+bank-05-16-01'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[10]
                    raw_ref_start = txtVerified[4] + ' ( ' + txtBankname + ' ) ' + txtVerified[6]
                    raw_ref_target = txtVerified[8] + ' ( ' + txtVerified[9] + ' ) ' + txtVerified[10]
                    raw_ref_total = txtVerified[12]
                } else if (txtVerified.length == 17) {
                    txtResult = 'k+bank-05-17-01'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[11]
                    raw_ref_start = txtVerified[4] + ' ( ' + txtBankname + ' ) ' + txtVerified[6]
                    raw_ref_target = txtVerified[8] + ' ( ' + txtVerified[9] + ' ) ' + txtVerified[10]
                    raw_ref_total = (txtVerified[12].search("บาท") >= 0) ? txtVerified[12] : txtVerified[13]
                } else if (txtVerified.length == 18) {
                    txtResult = 'k+bank-05-18-01'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[12]
                    raw_ref_start = txtVerified[4] + ' ( ' + txtBankname + ' ) ' + txtVerified[6]
                    raw_ref_target = txtVerified[8] + ' ( ' + txtVerified[9] + ' ) ' + txtVerified[10]
                    raw_ref_total = (txtVerified[13].search("บาท") >= 0) ? txtVerified[13] : txtVerified[14]
                } else if (txtVerified.length == 19) {
                    txtResult = 'k+bank-05-19-01'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[11]
                    raw_ref_start = txtVerified[4] + ' ( ' + txtBankname + ' ) ' + txtVerified[6]
                    raw_ref_target = txtVerified[8] + ' ( ' + txtVerified[9] + ' ) ' + txtVerified[10]
                    raw_ref_total = txtVerified[13]
                } else {
                    txtResult = 'k+bank-05-00-00'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[11]
                    raw_ref_start = txtVerified[4] + ' ( ' + txtBankname + ' ) ' + txtVerified[6]
                    raw_ref_target = txtVerified[8] + ' ( ' + txtVerified[9] + ' ) ' + txtVerified[10]
                    raw_ref_total = txtVerified[12]
                }
            } else if (txtVerified[6] == 'ธ.กสิกรไทย') {
                txtBankname = 'ธนาคารกสิกรไทย';
                if (txtVerified.length == 16) {
                    txtResult = 'k+bank-06-16-01'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[10]
                    raw_ref_start = txtVerified[4] + ' ( ' + txtBankname + ' ) ' + txtVerified[6]
                    raw_ref_target = txtVerified[8] + ' ( ' + txtVerified[9] + ' ) ' + txtVerified[10]
                    raw_ref_total = txtVerified[12]
                } else if (txtVerified.length == 17) {
                    txtResult = 'k+bank-06-17-01'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[11]
                    raw_ref_start = txtVerified[4] + ' ( ' + txtBankname + ' ) ' + txtVerified[6]
                    raw_ref_target = txtVerified[8] + ' ( ' + txtVerified[9] + ' ) ' + txtVerified[10]
                    raw_ref_total = (txtVerified[12].search("บาท") >= 0) ? txtVerified[12] : txtVerified[13]
                } else if (txtVerified.length == 18) {
                    txtResult = 'k+bank-06-18-01'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[12]
                    raw_ref_start = txtVerified[4] + ' ( ' + txtBankname + ' ) ' + txtVerified[6]
                    raw_ref_target = txtVerified[8] + ' ( ' + txtVerified[9] + ' ) ' + txtVerified[10]
                    raw_ref_total = (txtVerified[13].search("บาท") >= 0) ? txtVerified[13] : txtVerified[14]
                } else if (txtVerified.length == 19) {
                    txtResult = 'k+bank-06-19-01'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[11]
                    raw_ref_start = txtVerified[5] + ' ( ' + txtBankname + ' ) ' + txtVerified[7]
                    raw_ref_target = txtVerified[8] + ' ( ' + txtVerified[9] + ' ) ' + txtVerified[10]
                    raw_ref_total = txtVerified[13]
                } else {
                    txtResult = 'k+bank-06-00-00'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[11]
                    raw_ref_start = txtVerified[4] + ' ( ' + txtBankname + ' ) ' + txtVerified[6]
                    raw_ref_target = txtVerified[8] + ' ( ' + txtVerified[9] + ' ) ' + txtVerified[10]
                    raw_ref_total = txtVerified[12]
                }
            }
            // K_BANK_END // 

            // SCB_START // 
            if (txtVerified[2] == 'SCB+' || txtVerified[2] == 'SCB' || txtVerified[2] == 'SCB.' || txtVerified[2] == 'SCB..') {
                txtBankname = 'ธนาคารไทยพาณิชย์';
                if (txtVerified.length == 14) {
                    if (txtVerified[4].search("รหัสอ้างอิง") >= 0) {
                        txtResult = 'scb-02-14-01'
                        raw_ref_datetime = txtVerified[3]
                        raw_ref_code = txtVerified[4]
                        raw_ref_start = txtVerified[7] + ' ( ' + txtBankname + ' ) ' + txtVerified[8]
                        raw_ref_target = txtVerified[9] + ' ( ' + ' ' + ' ) ' + txtVerified[12]
                        raw_ref_total = txtVerified[13]
                    } else {
                        txtResult = 'scb-02-14-02'
                        raw_ref_datetime = txtVerified[4]
                        raw_ref_code = txtVerified[5]
                        raw_ref_start = txtVerified[9] + ' ( ' + txtBankname + ' ) ' + txtVerified[10]
                        raw_ref_target = txtVerified[11] + ' ( ' + ' ' + ' ) ' + txtVerified[12]
                        raw_ref_total = txtVerified[13]
                    }
                } else if (txtVerified.length == 15) {
                    txtResult = 'scb-02-15-01'
                    raw_ref_datetime = txtVerified[4]
                    raw_ref_code = txtVerified[5]
                    raw_ref_start = txtVerified[7] + ' ( ' + txtBankname + ' ) ' + txtVerified[8]
                    raw_ref_target = txtVerified[9] + ' ( ' + ' ' + ' ) ' + txtVerified[10]
                    raw_ref_total = txtVerified[14]
                } else {
                    txtResult = 'scb-02-00-00'
                    raw_ref_datetime = txtVerified[4]
                    raw_ref_code = txtVerified[5]
                    raw_ref_start = txtVerified[9] + ' ( ' + txtBankname + ' ) ' + txtVerified[10]
                    raw_ref_target = txtVerified[11] + ' ( ' + ' ' + ' ) ' + txtVerified[12]
                    raw_ref_total = txtVerified[13]
                }
            } else if (txtVerified[3] == 'SCB+' || txtVerified[3] == 'SCB' || txtVerified[3] == 'SCB.' || txtVerified[3] == 'SCB..') {
                txtBankname = 'ธนาคารไทยพาณิชย์';
                if (txtVerified.length == 14) {
                    if (txtVerified[5].search("โอนเงิน") >= 0) {
                        txtResult = 'scb-03-14-01'
                        raw_ref_datetime = txtVerified[6]
                        raw_ref_code = txtVerified[7]
                        raw_ref_start = txtVerified[8] + ' ( ' + txtBankname + ' ) ' + txtVerified[9]
                        raw_ref_target = txtVerified[10] + ' ( ' + ' ' + ' ) ' + txtVerified[12]
                        raw_ref_total = txtVerified[13]
                    } else {
                        txtResult = 'scb-03-14-02'
                        raw_ref_datetime = txtVerified[5]
                        raw_ref_code = txtVerified[6]
                        raw_ref_start = txtVerified[7] + ' ( ' + txtBankname + ' ) ' + txtVerified[8]
                        raw_ref_target = txtVerified[9] + ' ( ' + ' ' + ' ) ' + txtVerified[12]
                        raw_ref_total = txtVerified[13]
                    }
                } else if (txtVerified.length == 15) {
                    txtResult = 'scb-03-15-01'
                    raw_ref_datetime = txtVerified[5]
                    raw_ref_code = txtVerified[6]
                    raw_ref_start = txtVerified[7] + ' ( ' + txtBankname + ' ) ' + txtVerified[8]
                    raw_ref_target = txtVerified[9] + ' ( ' + ' ' + ' ) ' + txtVerified[12]
                    raw_ref_total = txtVerified[13]
                } else {
                    txtResult = 'scb-03-00-00'
                    raw_ref_datetime = txtVerified[5]
                    raw_ref_code = txtVerified[6]
                    raw_ref_start = txtVerified[7] + ' ( ' + txtBankname + ' ) ' + txtVerified[8]
                    raw_ref_target = txtVerified[9] + ' ( ' + ' ' + ' ) ' + txtVerified[12]
                    raw_ref_total = txtVerified[13]
                }
            } else if (txtVerified[4] == 'SCB+' || txtVerified[4] == 'SCB +' || txtVerified[4] == 'SCB' || txtVerified[4] == 'SCB.' || txtVerified[4] == 'SCB..') {
                txtBankname = 'ธนาคารไทยพาณิชย์';
                if (txtVerified.length == 14) {
                    txtResult = 'scb-04-14-01'
                    raw_ref_datetime = txtVerified[4]
                    raw_ref_code = txtVerified[5]
                    raw_ref_start = txtVerified[9] + ' ( ' + txtBankname + ' ) ' + txtVerified[10]
                    raw_ref_target = txtVerified[11] + ' ( ' + ' ' + ' ) ' + txtVerified[12]
                    raw_ref_total = txtVerified[13]
                } else if (txtVerified.length == 15) {
                    txtResult = 'scb-04-15-01'
                    raw_ref_datetime = txtVerified[4]
                    raw_ref_code = txtVerified[5]
                    raw_ref_start = txtVerified[7] + ' ( ' + txtBankname + ' ) ' + txtVerified[8]
                    raw_ref_target = txtVerified[9] + ' ( ' + ' ' + ' ) ' + txtVerified[10]
                    raw_ref_total = txtVerified[14]
                } else if (txtVerified.length == 16) {
                    txtResult = 'scb-04-16-01'
                    raw_ref_datetime = txtVerified[7]
                    raw_ref_code = txtVerified[8]
                    raw_ref_start = txtVerified[11] + ' ( ' + txtBankname + ' ) ' + txtVerified[12]
                    raw_ref_target = txtVerified[13] + ' ( ' + ' ' + ' ) ' + txtVerified[14]
                    raw_ref_total = txtVerified[15]
                } else {
                    txtResult = 'scb-04-00-00'
                    raw_ref_datetime = txtVerified[4]
                    raw_ref_code = txtVerified[5]
                    raw_ref_start = txtVerified[9] + ' ( ' + txtBankname + ' ) ' + txtVerified[10]
                    raw_ref_target = txtVerified[11] + ' ( ' + ' ' + ' ) ' + txtVerified[12]
                    raw_ref_total = txtVerified[13]
                }
            } else if (txtVerified[5] == 'SCB+' || txtVerified[5] == 'SCB +' || txtVerified[5] == 'SCB' || txtVerified[5] == 'SCB.' || txtVerified[5] == 'SCB..') {
                txtBankname = 'ธนาคารไทยพาณิชย์';
                if (txtVerified.length == 14) {
                    txtResult = 'scb-05-14-01'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[2]
                    raw_ref_start = txtVerified[7] + ' ( ' + txtBankname + ' ) ' + txtVerified[8]
                    raw_ref_target = txtVerified[9] + ' ( ' + ' ' + ' ) ' + txtVerified[12]
                    raw_ref_total = txtVerified[13]
                } else if (txtVerified.length == 15) {
                    txtResult = 'scb-05-15-01'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[2]
                    raw_ref_start = txtVerified[7] + ' ( ' + txtBankname + ' ) ' + txtVerified[8]
                    raw_ref_target = txtVerified[9] + ' ( ' + ' ' + ' ) ' + txtVerified[13]
                    raw_ref_total = txtVerified[14]
                } else if (txtVerified.length == 16) {
                    txtResult = 'scb-05-16-01'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[2]
                    raw_ref_start = txtVerified[8] + ' ( ' + txtBankname + ' ) ' + txtVerified[9]
                    raw_ref_target = txtVerified[10] + ' ( ' + ' ' + ' ) ' + txtVerified[13]
                    raw_ref_total = txtVerified[14]
                } else if (txtVerified.length == 18) {
                    txtResult = 'scb-05-18-01'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[2]
                    raw_ref_start = txtVerified[8] + ' ( ' + txtBankname + ' ) ' + txtVerified[11]
                    raw_ref_target = txtVerified[12] + ' ( ' + ' ' + ' ) ' + txtVerified[16]
                    raw_ref_total = txtVerified[17]
                } else {
                    txtResult = 'scb-05-00-00'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[2]
                    raw_ref_start = txtVerified[8] + ' ( ' + txtBankname + ' ) ' + txtVerified[11]
                    raw_ref_target = txtVerified[12] + ' ( ' + ' ' + ' ) ' + txtVerified[16]
                    raw_ref_total = txtVerified[17]
                }
            } else if (txtVerified[6] == 'SCB+' || txtVerified[6] == 'SCB' || txtVerified[6] == 'SCB.') {
                txtBankname = 'ธนาคารไทยพาณิชย์';
                if (txtVerified.length == 16) {
                    txtResult = 'scb-06-16-01'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[2]
                    raw_ref_start = txtVerified[8] + ' ( ' + txtBankname + ' ) ' + txtVerified[9]
                    raw_ref_target = txtVerified[10] + ' ( ' + ' ' + ' ) ' + txtVerified[13]
                    raw_ref_total = txtVerified[14]
                } else if (txtVerified.length == 18) {
                    txtResult = 'scb-06-18-01'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[2]
                    raw_ref_start = txtVerified[8] + ' ( ' + txtBankname + ' ) ' + txtVerified[11]
                    raw_ref_target = txtVerified[12] + ' ( ' + ' ' + ' ) ' + txtVerified[16]
                    raw_ref_total = txtVerified[17]
                } else {
                    txtResult = 'scb-06-00-00'
                    raw_ref_datetime = txtVerified[1]
                    raw_ref_code = txtVerified[2]
                    raw_ref_start = txtVerified[8] + ' ( ' + txtBankname + ' ) ' + txtVerified[11]
                    raw_ref_target = txtVerified[12] + ' ( ' + ' ' + ' ) ' + txtVerified[16]
                    raw_ref_total = txtVerified[17]
                }
            }
            // SCB_END //

            // BAY_START // 
            if (txtVerified[0] == 'krungsri') {
                txtBankname = 'ธนาคารกรุงศรีอยธุยา';
                if (txtVerified.length == 19) {
                    txtResult = 'bay-00-19-01'
                    raw_ref_datetime = txtVerified[9]
                    raw_ref_code = txtVerified[11]
                    raw_ref_start = txtVerified[12] + ' ( ' + txtBankname + ' ) ' + txtVerified[13]
                    raw_ref_target = txtVerified[14] + ' ( ' + ' ' + ' ) ' + txtVerified[15]
                    raw_ref_total = txtVerified[16]
                } else if (txtVerified.length == 20) {
                    txtResult = 'bay-00-20-01'
                    raw_ref_datetime = txtVerified[7]
                    raw_ref_code = txtVerified[9]
                    raw_ref_start = txtVerified[12] + ' ( ' + txtBankname + ' ) ' + txtVerified[12]
                    raw_ref_target = txtVerified[13] + ' ( ' + ' ' + ' ) ' + txtVerified[14]
                    raw_ref_total = txtVerified[15]
                } else if (txtVerified.length == 23) {
                    txtResult = 'bay-00-23-01'
                    raw_ref_datetime = txtVerified[10]
                    raw_ref_code = txtVerified[11]
                    raw_ref_start = txtVerified[13] + ' ( ' + txtBankname + ' ) ' + txtVerified[14]
                    raw_ref_target = txtVerified[15] + ' ( ' + ' ' + ' ) ' + txtVerified[16]
                    raw_ref_total = txtVerified[17]
                } else {
                    txtResult = 'bay-00-00-00'
                    raw_ref_datetime = txtVerified[9]
                    raw_ref_code = txtVerified[11]
                    raw_ref_start = txtVerified[12] + ' ( ' + txtBankname + ' ) ' + txtVerified[13]
                    raw_ref_target = txtVerified[14] + ' ( ' + ' ' + ' ) ' + txtVerified[15]
                    raw_ref_total = txtVerified[16]
                }
            }
            // BAY_END //

            // BBL_START //
            if (txtVerified[2] == 'Bangkok Bank') {
                txtBankname = 'ธนาคารกรุงเทพ';
                if (txtVerified.length == 17) {
                    txtResult = 'bbl-02-17-01'
                    raw_ref_datetime = txtVerified[4]
                    raw_ref_code = txtVerified[11]
                    raw_ref_start = txtVerified[7] + ' ( ' + txtBankname + ' ) ' + txtVerified[8]
                    raw_ref_target = txtVerified[12] + ' ( ' + txtVerified[15] + ' ) ' + txtVerified[13]
                    raw_ref_total = txtVerified[6]
                } else if (txtVerified.length == 19) {
                    txtResult = 'bbl-02-19-01'
                    raw_ref_datetime = txtVerified[7]
                    raw_ref_code = txtVerified[17]
                    raw_ref_start = txtVerified[10] + ' ( ' + txtBankname + ' ) ' + txtVerified[14]
                    raw_ref_target = txtVerified[13] + ' ( ' + txtVerified[15] + ' ) ' + txtVerified[14]
                    raw_ref_total = txtVerified[9]
                } else {
                    txtResult = 'bbl-00-00-00'
                    raw_ref_datetime = txtVerified[7]
                    raw_ref_code = txtVerified[17]
                    raw_ref_start = txtVerified[10] + ' ( ' + txtBankname + ' ) ' + txtVerified[14]
                    raw_ref_target = txtVerified[13] + ' ( ' + txtVerified[15] + ' ) ' + txtVerified[14]
                    raw_ref_total = txtVerified[9]
                }
            } else if (txtVerified[3] == 'Bangkok Bank') {
                txtBankname = 'ธนาคารกรุงเทพ';
                if (txtVerified.length == 21) {
                    txtResult = 'bbl-03-21-01'
                    raw_ref_datetime = txtVerified[8]
                    raw_ref_code = txtVerified[19]
                    raw_ref_start = txtVerified[12] + ' ( ' + txtBankname + ' ) ' + txtVerified[13]
                    raw_ref_target = txtVerified[15] + ' ( ' + txtVerified[17] + ' ) ' + txtVerified[16]
                    raw_ref_total = txtVerified[11]
                } else {
                    txtResult = 'bbl-03-00-00'
                    raw_ref_datetime = txtVerified[8]
                    raw_ref_code = txtVerified[19]
                    raw_ref_start = txtVerified[12] + ' ( ' + txtBankname + ' ) ' + txtVerified[13]
                    raw_ref_target = txtVerified[15] + ' ( ' + txtVerified[17] + ' ) ' + txtVerified[16]
                    raw_ref_total = txtVerified[11]
                }
            } else if (txtVerified[6] == 'Bangkok Bank') {
                txtBankname = 'ธนาคารกรุงเทพ';
                if (txtVerified.length == 20) {
                    txtResult = 'bbl-06-20-01'
                    raw_ref_datetime = txtVerified[8]
                    raw_ref_code = txtVerified[18]
                    raw_ref_start = txtVerified[11] + ' ( ' + txtBankname + ' ) ' + txtVerified[12]
                    raw_ref_target = txtVerified[14] + ' ( ' + txtVerified[16] + ' ) ' + txtVerified[15]
                    raw_ref_total = txtVerified[10]
                } else {
                    txtResult = 'bbl-06-00-00'
                    raw_ref_datetime = txtVerified[8]
                    raw_ref_code = txtVerified[18]
                    raw_ref_start = txtVerified[11] + ' ( ' + txtBankname + ' ) ' + txtVerified[12]
                    raw_ref_target = txtVerified[14] + ' ( ' + txtVerified[16] + ' ) ' + txtVerified[15]
                    raw_ref_total = txtVerified[10]
                }
            } else if (txtVerified[8] == 'Bangkok Bank') {
                txtBankname = 'ธนาคารกรุงเทพ';
                if (txtVerified.length == 22) {
                    txtResult = 'bbl-08-22-01'
                    raw_ref_datetime = txtVerified[3]
                    raw_ref_code = txtVerified[20]
                    raw_ref_start = txtVerified[13] + ' ( ' + txtBankname + ' ) ' + txtVerified[14]
                    raw_ref_target = txtVerified[17] + ' ( ' + txtVerified[19] + ' ) ' + txtVerified[18]
                    raw_ref_total = txtVerified[5]
                } else {
                    txtResult = 'bbl-08-00-00'
                    raw_ref_datetime = txtVerified[3]
                    raw_ref_code = txtVerified[20]
                    raw_ref_start = txtVerified[13] + ' ( ' + txtBankname + ' ) ' + txtVerified[14]
                    raw_ref_target = txtVerified[17] + ' ( ' + txtVerified[19] + ' ) ' + txtVerified[18]
                    raw_ref_total = txtVerified[5]
                }
            }
            // BBL_END //

            // KTB_START //
            if (txtVerified[0] == 'Krungthai') {
                txtBankname = 'ธนาคารกรุงไทย';
                if (txtVerified.length == 16) {
                    txtResult = 'ktb-00-16-01'
                    raw_ref_datetime = txtVerified[15]
                    raw_ref_code = txtVerified[3]
                    raw_ref_start = txtVerified[4] + ' ( ' + txtBankname + ' ) ' + txtVerified[6]
                    raw_ref_target = txtVerified[7] + ' ( ' + txtVerified[8] + ' ) ' + txtVerified[9]
                    raw_ref_total = txtVerified[13]
                } else if (txtVerified.length == 18) {
                    txtResult = 'ktb-00-18-01'
                    raw_ref_datetime = txtVerified[17]
                    raw_ref_code = txtVerified[4]
                    raw_ref_start = txtVerified[5] + ' ( ' + txtBankname + ' ) ' + txtVerified[7]
                    raw_ref_target = txtVerified[8] + ' ( ' + txtVerified[9] + ' ) ' + txtVerified[10]
                    raw_ref_total = txtVerified[15]
                } else {
                    txtResult = 'ktb-00-00-00'
                    raw_ref_datetime = txtVerified[17]
                    raw_ref_code = txtVerified[4]
                    raw_ref_start = txtVerified[5] + ' ( ' + txtBankname + ' ) ' + txtVerified[7]
                    raw_ref_target = txtVerified[8] + ' ( ' + txtVerified[9] + ' ) ' + txtVerified[10]
                    raw_ref_total = txtVerified[15]
                }
            } else if (txtVerified[2] == 'Krungthai') {
                txtBankname = 'ธนาคารกรุงไทย';
                if (txtVerified.length == 17) {
                    txtResult = 'ktb-02-17-01'
                    raw_ref_datetime = txtVerified[16]
                    raw_ref_code = txtVerified[4]
                    raw_ref_start = txtVerified[5] + ' ( ' + txtBankname + ' ) ' + txtVerified[7]
                    raw_ref_target = txtVerified[8] + ' ( ' + txtVerified[9] + ' ) ' + txtVerified[10]
                    raw_ref_total = txtVerified[14]
                } else if (txtVerified.length == 19) {
                    txtResult = 'ktb-02-19-01'
                    raw_ref_datetime = txtVerified[18]
                    raw_ref_code = txtVerified[6]
                    raw_ref_start = txtVerified[7] + ' ( ' + txtBankname + ' ) ' + txtVerified[9]
                    raw_ref_target = txtVerified[10] + ' ( ' + txtVerified[11] + ' ) ' + txtVerified[12]
                    raw_ref_total = txtVerified[16]
                } else {
                    txtResult = 'ktb-02-00-00'
                    raw_ref_datetime = txtVerified[16]
                    raw_ref_code = txtVerified[4]
                    raw_ref_start = txtVerified[5] + ' ( ' + txtBankname + ' ) ' + txtVerified[7]
                    raw_ref_target = txtVerified[8] + ' ( ' + txtVerified[9] + ' ) ' + txtVerified[10]
                    raw_ref_total = txtVerified[14]
                }
            }
            // KTB_END //

            // TTB_START //
            if (txtVerified[1] == 'ttb') {
                txtBankname = 'ธนาคารทีเอ็มบีธนชาต';
                if (txtVerified.length == 15) {
                    txtResult = 'ktb-01-15-01'
                    raw_ref_datetime = txtVerified[11]
                    raw_ref_code = txtVerified[12]
                    raw_ref_start = txtVerified[4] + ' ( ' + txtBankname + ' ) ' + txtVerified[5]
                    raw_ref_target = txtVerified[6] + ' ( ' + txtVerified[8] + ' ) ' + txtVerified[7]
                    raw_ref_total = txtVerified[13]
                } else {
                    txtResult = 'ktb-00-00-00'
                    raw_ref_datetime = txtVerified[11]
                    raw_ref_code = txtVerified[12]
                    raw_ref_start = txtVerified[4] + ' ( ' + txtBankname + ' ) ' + txtVerified[5]
                    raw_ref_target = txtVerified[6] + ' ( ' + txtVerified[8] + ' ) ' + txtVerified[7]
                    raw_ref_total = txtVerified[13]
                }
            }
            // TTB_END //

            // GHBANK_START //
            if (txtVerified[0] == 'ทํารายการสําเร็จ') {
                txtBankname = 'ธนาคารอาคารสงเคราะห์';
                if (txtVerified.length == 15) {
                    txtResult = 'ghbank-00-16-01'
                    raw_ref_datetime = txtVerified[13]
                    raw_ref_code = txtVerified[14]
                    raw_ref_start = txtVerified[2] + ' ( ' + txtBankname + ' ) ' + txtVerified[4]
                    raw_ref_target = txtVerified[5] + ' ( ' + ' ' + ' ) ' + txtVerified[6]
                    raw_ref_total = txtVerified[10]
                } else {
                    txtResult = 'ghbank-00-00-00'
                    raw_ref_datetime = txtVerified[13]
                    raw_ref_code = txtVerified[14]
                    raw_ref_start = txtVerified[2] + ' ( ' + txtBankname + ' ) ' + txtVerified[4]
                    raw_ref_target = txtVerified[5] + ' ( ' + ' ' + ' ) ' + txtVerified[6]
                    raw_ref_total = txtVerified[10]
                }
            }
            // GHBANK_END //
            console.log(txtResult);

            let check_raw_ref_total = raw_ref_total == null || raw_ref_total == '' || raw_ref_total == 'undefined' || raw_ref_total == undefined ? '0' : raw_ref_total

            const reg = /[\u0E00-\u0E7Fa-zA-Z ,']/ig
            const str = check_raw_ref_total.replace(':', '').replace('THB', '').replace(' ', '').replace('บาท', '').replace('B', '').replace(',', '').replace('จำนวนเงิน', '').replace('un', '').replace('-', '')
            const newStr = str.replaceAll(reg, "");

            $('#ref_total').val(newStr);

            let ref_code = $('#ref_code').val().replace('รหัสอ้างอิง:', '').replace(' ', '').replace('จำนวน:', '')

            $('#ref_code').val(ref_code);
            let check_raw_ref_code = (raw_ref_code == '' || raw_ref_code == null) ? '0' : raw_ref_code
            let replace_ref_datetime = raw_ref_datetime
            let replace_ref_code = check_raw_ref_code.replace('รหัสอ้างอิง:', '').replace(' ', '').replace('จำนวน:', '').replace('สแกนเพื่อตรวจ', '').replace('รหัสอ้างอิง', '')
            let replace_ref_start = raw_ref_start.replace('() ', '').replace('()', '').replace('0 ', '').replace('@ ', '').replace('หมายเลขบัญชี', '').replace(':', '').replace('ชื่อบัญชี', '').replace('รอส ', '').replace('  : ', '')
            let replace_ref_target = raw_ref_target.replace('หมายเลขบัญชี', '').replace(':', '').replace('ชื่อบัญชี', '').replace('  : ', '')
            let replace_ref_total = check_raw_ref_total

            $('#ref_datetime').val(replace_ref_datetime);
            $('#ref_code').val(replace_ref_code);
            $('#ref_start').val(replace_ref_start);
            $('#ref_target').val(replace_ref_target)

            $('#text_raw').val(result.textContent);

            $('#detectImageForm').find('input').prop('disabled', false)
        }
    };
    const getImageBase64String = async () => {
        return await toBase64(imageFile.files[0]);
    };
    const toBase64 = file =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

    imageFile.addEventListener("change", e => {

        e.preventDefault();

        if ($('#imageFile').val() != '' || $('#imageFile').val() != null) {

            $('.dropify-render img').attr('style', 'max-height: 380px');

        }

        setTimeout(function () {

            //$('#btn-save_exit').show()

            //$('#detectImageForm').find('input').prop('disabled', false)

            $(".modal-body").LoadingOverlay("show", {
                image: '',
                custom: customElement
            });

            detectImage();

        }, 100);


    });

});

$.init = async function () {

    console.log(application_id)

    if ($('#bankslip_emmas').val() != '') {
        $('#frm_search').find("#bankslip_billno").focus();
    }
    //$.Master_Get();

    //$('select.nice-select').niceSelect();

    $("input.numbers").keypress(function (event) {
        return isNumber(event, this)
    });

    $('#detectImageForm').find("#ref_target").autocomplete({
        source: function (request, response) {
            $.ajax({
                dataType: "json",
                url: url_master_get,
                data: {
                    mode: 'bankaccount',
                    keywords: typeof request.term !== 'undefined' ? request.term : ' ',
                },
                success: function (data) {
                    console.log('data', data)
                    $('#ref_target').removeClass('ui-autocomplete-loading');
                    response($.map(data.data, function (item) {


                        return {
                            label: item.text.toUpperCase(),
                            value: item.id
                        }
                    }));
                },
                error: function (data) {
                    $('#ref_target').removeClass('ui-autocomplete-loading');
                }
            });
        },
        minLength: 1,
        open: function () { },
        close: function () { },
        focus: function (event, ui) { },
        select: function (event, ui) { }
    });

    $('#ref_total').keyup(function () {
        const reg = /[\u0E00-\u0E7Fa-zA-Z ,!@#$%^&><(/)*+']/ig
        const str = $('#ref_total').val().replace('THB', '').replace(' ', '').replace('บาท', '').replace('B', '').replace(',', '').replace('จำนวนเงิน', '').replace('un', '').replace('-', '')
        const newStr = str.replaceAll(reg, "");
        $('#ref_total').val(newStr);
    });

    $('#bankslip_branch').val(application_id.substring(0, 3))

    await setTimeout(function () {
        $.LoadingOverlay("hide");
        $('#btn-save_exit').hide()
    }, 1000);

    $('#frm_search').find('#bankslip_date').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        },
    });

    $('#modal-frm_data').off('hidden.bs.modal').on('hidden.bs.modal', async function () {

        await setTimeout(function () {

            $('#detectImageForm').find('input').val('')

            $('.dropify-clear').trigger('click');

        }, 100);

    });

    if (urlParams.get('jobno') === null) {

        $('#btn-item_create').removeClass('d-none');
        $('#bankslip_date').prop('disabled', true);
        $('#modal-frm_data').modal({
            keyboard: false,
            backdrop: 'static'
        });

    } else {

        $('#bankslip_billno').focus()
        $('#bankslip_date').prop('disabled', false);
        $('#btn-add').removeClass('d-none');

        await $.Slip_Detail(urlParams.get('jobno'));


        $('#bankslip_emmas').focus()

        $("#bankslip_emmas").autocomplete({
            source: function (request, response) {
                $.ajax({
                    dataType: "json",
                    url: 'http://192.168.1.247/vsk-api-acc/api/ACC/VSK_Emmas_Select2_GET',
                    data: {
                        search: typeof request.term !== 'undefined' ? request.term : ' ',
                    },
                    success: function (data) {
                        $('#bankslip_emmas').removeClass('ui-autocomplete-loading');
                        response($.map(data.data, function (item) {
                            return {
                                label: item.text.toUpperCase(),
                                value: item.id
                            }
                        }));
                    },
                    error: function (data) {
                        $('#bankslip_emmas').removeClass('ui-autocomplete-loading');
                    }
                });
            },
            minLength: 1,
            open: function () { },
            close: function () { },
            focus: function (event, ui) { },
            select: function (event, ui) { }
        });

        $("#bankslip_billno").autocomplete({
            source: function (request, response) {
                $.ajax({
                    dataType: "json",
                    url: url_master_get,
                    data: {
                        mode: 'inv',
                        //keywords1: $('#bankslip_emmas').val(),
                        keywords: typeof request.term !== 'undefined' ? request.term : ' ',
                    },
                    success: function (data) {
                        $('#bankslip_billno').removeClass('ui-autocomplete-loading');
                        // hide loading image
                        response($.map(data.data, function (item) {
                            return {
                                label: item.text.toUpperCase(),
                                value: item.id
                            }
                        }));
                    },
                    error: function (data) {
                        $('#bankslip_billno').removeClass('ui-autocomplete-loading');
                    }
                });
            },
            minLength: 1,
            open: function () { },
            close: function () { },
            focus: function (event, ui) { },
            select: function (event, ui) { }
        });

    }

    $('.dropify-clear').on('click', async function () {

        $("#detectImageForm").parsley().reset();
        $('#ref_datetime').val('');
        $('#ref_code').val('');
        $('#ref_start').val('');
        $('#ref_target').val('');
        $('#ref_total').val('');
        $('#text_raw').val('');
    });

    $('#btn-save_exit').off('click').on('click', async function (e) {

        e.preventDefault();

        $('#detectImageForm').parsley().validate();

        if ($('#detectImageForm').parsley().isValid()) {
            $.Slip_Create();
        }

    });

    $('#frm_search').find('#btn-add').on('click', function (e) {
        e.preventDefault();
        $('#frm_search').parsley().validate();
        if ($('#frm_search').parsley().isValid()) {
            let bankslip_billno = $('#bankslip_billno').val();
            if (bankslip_billno.length != 12) {
                toastr.error('กรุณาป้อนเลขที่บิลให้ครบ');
                $('#bankslip_billno').addClass('parsley-error');
            } else {

                $.Slip_Bill_Create();
            }
        }
    });

    $('#frm_search input').bind('keypress', function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            $('#frm_search').parsley().validate();
            if ($('#frm_search').parsley().isValid()) {
                let bankslip_billno = $('#bankslip_billno').val();

                if (bankslip_billno.length != 12) {
                    toastr.error('กรุณาป้อนเลขที่บิลให้ครบ');
                    $('#bankslip_billno').addClass('parsley-error');
                } else {
                    $.Slip_Bill_Create();
                }

            }
        } else if (code == 27) {
            window.history.pushState({}, document.title, "/" + "csh/opt/bankslip");
            location.reload();
        }
    });

    $('#frm_search').find('#btn-main').on('click', function (e) {

        e.preventDefault();

        window.history.pushState({}, document.title, "/" + "csh/opt/bankslip");

        location.reload();
    });

    $('#frm_search').find('#bankslip_emmas').off('select2:select').on('select2:select', function (evt) {

        evt.preventDefault();

        $(this).on('select2:select', function (evt) {
            evt.preventDefault();
        });

        if ($('#bankslip_jobno').val() != '') {

            $.Slip_Customer_Update();

        } else {

            toastr.error('ไม่พบข้อมูลใบงาน');

        }

    });

    $('.applyBtn').on('click', async function (evt) {

        evt.preventDefault();

        if ($('#bankslip_jobno').val() != '') {

            $.Slip_Jobdate_Update();

        } else {

            toastr.error('ไม่พบข้อมูลใบงาน');

        }

    });

    $(".img-gallery").lightGallery({ rel: true });

};

$.Clear_Input = async function () {

    $('#frm_search').trigger('reset');
    $('#frm_search').find('input').val('');
    $("#frm_search").parsley().reset();
    //$("#bankslip_emmas option").remove();
    //$('#bankslip_emmas')
    //    .append($("<option value=''>--- Select ---</option>")).prop('disabled', false);

};

$.Slip_Create = async function () {

    let slip_refno = $('#ref_code').val()

    const reg = /[\u0E00-\u0E7Fa-zA-Z ,']/ig
    const str = $('#ref_total').val().replace('THB', '').replace(' ', '').replace('บาท', '').replace('B', '').replace(',', '').replace('จำนวนเงิน', '').replace('un', '')
    const newStr = str.replaceAll(reg, "");

    let add_data = {
        slip_refno: slip_refno.replace(' ', '').replace('รหัสอ้างอิง:', ''),
        slip_datetime: $('#ref_datetime').val(),
        slip_total: newStr,
        slip_bank: $('#ref_target').val(),
        slip_cusname: $('#ref_start').val(),
        created_by: user_id,
        branch: application_id.substring(0, 3)
    };

    var params = [];
    for (const i in add_data) {
        params.push(i + "=" + encodeURIComponent(add_data[i]));
    }

    console.log('params', params.join("&"))

    fetch(url_slip_create, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params.join("&"),
    }).then(response => {
        return response.json();
    }).then(function (result) {

        $.each(result.data, function (key, val) {

            if (val['pMessage'] != null) {

                toastr.error(val['pMessage']);


            } else {

                let ref_id = '', job_no = '';

                ref_id = val['slip_refno']
                job_no = val['slip_jobno']

                var file_data = new FormData();
                var pic_file = $('#detectImageForm').find('#imageFile').get(0).files
                file_data.append("postedFile", pic_file[0]);
                file_data.append("pathname", val['slip_jobno']);

                $.ajax({
                    url: url_api + '/PictureUploads/UploadFile',
                    type: 'POST',
                    data: file_data,
                    contentType: false,
                    processData: false,
                    success: function (file_name) {

                        console.log('file_name', file_name)

                        let add_img = {
                            ref_id: ref_id,
                            job_no: job_no,
                            image_name: file_name,
                            created_by: user_id
                        };

                        var params_img = [];
                        for (const i in add_img) {
                            params_img.push(i + "=" + encodeURIComponent(add_img[i]));
                        }

                        console.log('params_img', params_img.join("&"))

                        fetch(url_slip_upload, {
                            method: 'POST', // *GET, POST, PUT, DELETE, etc.
                            // mode: 'no-cors', // no-cors, *cors, same-origin
                            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                            credentials: 'same-origin', // include, *same-origin, omit
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                            body: params_img.join("&"),
                        }).then(response => {
                            return response.json();
                        }).then(function (result) {

                            toastr.success('Save Successfully!', async function () {

                                window.location.assign(window.location.href + '?jobno=' + val['slip_jobno'])

                            });

                        });

                    }
                });

            }

        });


    });

    return false;

};

$.Slip_Detail = async function (refno) {

    console.log('Detail refno', refno)

    fetch(url_slip_detail + '?slip_jobno=' + refno).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log('result', result.data)

        if (result.length > 0) {

            $('#bankslip_branch').val(application_id.substring(0, 3))

            $.each(result.data, function (key, val) {

                var slip_jobdate = moment(val['slip_jobdate']).format('DD/MM/YYYY');
                var slip_datetime = val['slip_datetime'];

                $('#bankslip_date').val(slip_jobdate);
                $('#bankslip_jobno').val(val['slip_jobno']);
                $('#bankslip_ref').val(val['slip_refno']);
                $('#bankslip_number').val(val['slip_bank']);
                $('#bankslip_payindate').val(slip_datetime);
                $('#bankslip_total').val(val['slip_total']);

                $('#bankslip_gallery').attr('data-src', url_image + val['image_no'] + '/' + val['image_name']);
                $('#bankslip_image').attr('src', url_image + val['image_no'] + '/' + val['image_name']);

                $('#bankslip_emmas').val(val['slip_cuscode'])
                $('#sum_qty_total').html(val['slip_total']).css("color", "#138D75")

                $.Slip_Bill_List(urlParams.get('jobno'));

                //$("#bankslip_emmas option").remove();

                //fetch('http://192.168.1.247/vsk-api-acc/api/ACC/VSK_Emmas_Select2_GET?search=' + val['slip_cuscode']).then(function (response) {
                //    return response.json();
                //}).then(function (result) {
                //    console.log('emmas', result.data)
                //    if (result.length > 0) {

                //        //$('#bankslip_emmas').attr("value", result.data[0]['id'])
                //        $('#bankslip_emmas').attr("value", result.data[0]['text'])
                //        //$('#bankslip_emmas').val(result.data[0]['id'] + ' ' + result.data[0]['text'])

                //    }

                //});



            });

        } else {

            swal({
                title: "ขออภัย",
                text: "เกิดข้อผิดพลาด",
                type: 'error',
                timer: 2000,
                showConfirmButton: false
            });

            toastr.error('ไม่พบข้อมูลใบงาน');
        }

    });

};

$.Slip_Customer_Update = async function () {

    let slip_cuscode = $('#frm_search').find('#bankslip_emmas').val();

    swal({
        title: "คุณแน่ใจหรือไม่?",
        text: "ที่จะทำการอัพเดตข้อมูลลูกค้า",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-danger",
        confirmButtonText: "Yes, save it!",
        closeOnConfirm: false
    },
        function () {

            var slip_jobdate = moment($('#bankslip_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD')

            let add_data = {
                slip_jobno: urlParams.get('jobno'),
                slip_cuscode: slip_cuscode,
                slip_jobdate: slip_jobdate,
                updated_by: user_id
            };

            var params_img = [];
            for (const i in add_data) {
                params_img.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            console.log('params_img', params_img.join("&"))

            fetch(url_slip_update, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params_img.join("&"),
            }).then(response => {
                return response.json();
            }).then(function (result) {

                toastr.success('Save Successfully!', async function () {

                    swal("สำเร็จ!", "บันทึกสำเร็จ", "success");

                });



            });


        });

    return false;

};

$.Slip_Jobdate_Update = async function () {

    let slip_cuscode = $('#frm_search').find('#bankslip_emmas').val();

    swal({
        title: "คุณแน่ใจหรือไม่?",
        text: "ที่จะทำการอัพเดตวันที่สลิป",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-danger",
        confirmButtonText: "Yes, save it!",
        closeOnConfirm: false
    },
        function () {

            var slip_jobdate = moment($('#bankslip_date').val().substring(0, 10), 'DD/MM/YYYY').format('YYYY-MM-DD')

            let add_data = {
                //slip_jobno: urlParams.get('jobno'),
                //slip_jobdate: slip_jobdate,
                //updated_by: user_id
                slip_jobno: urlParams.get('jobno'),
                slip_cuscode: slip_cuscode,
                slip_jobdate: slip_jobdate,
                updated_by: user_id
            };

            var params_img = [];
            for (const i in add_data) {
                params_img.push(i + "=" + encodeURIComponent(add_data[i]));
            }

            console.log('params_img', params_img.join("&"))

            fetch(url_slip_update, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params_img.join("&"),
            }).then(response => {
                return response.json();
            }).then(function (result) {

                toastr.success('Save Successfully!', async function () {

                    swal("สำเร็จ!", "บันทึกสำเร็จ", "success");

                });



            });


        });

    return false;

};

$.Slip_Bill_List = async function (data) {

    console.log('Slip_Bill_Detail data', data)

    let data_jobno = $('#bankslip_jobno').val()
    let bankslip_total = $('#bankslip_total').val()

    fetch(url_slip_bill_list + '?ref_id=' + data).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log('result', result.data)

        if (result.length > 0) {

            let i = result.length;
            var data_slip_bill = [];
            let sum_qty_current = 0;
            let sum_qty_total = 0;

            $.each(result.data, function (key, val) {

                let data = JSON.stringify(val)
                sum_qty_current += parseFloat(val['bill_invtotal'])
                let bill_invtotal = val['bill_invtotal']
                data_slip_bill.push([
                    i,
                    val['bill_invdate'],
                    val['bill_no'],
                    val['bill_invcode'],
                    val['bill_invname'],
                    bill_invtotal.toFixed(2),
                    val['bill_invpay'],
                    val['bill_userid'],
                    val['bill_branch'],
                    val['created_by'],
                    val['created_datetime'],
                    "<div class='d-flex flex-row justify-content-center'>" +
                    "<button onclick='$.Slip_Bill_Delete(" + data + ");' data-item='" + data + "' style='margin: .25rem .125rem; ' class='btn btn-outline-danger btn-sm delete-item delete_item' data-action='delete' id='delete_item" + i + "' type='button'>Delete</button>" +
                    "</div>",
                    val['trans_id'],
                    val['ref_id'],
                    val['record_status'],

                ])

                i--;

            });

            $('#sum_qty_current').html(sum_qty_current.toFixed(2)).css("color", "#F39C12");
            let sum_qty_item = (bankslip_total - sum_qty_current)
            $('#text_qty_item').html('')
            if (sum_qty_item < 0) {
                $('#text_qty_item').html('ยอดส่วนต่าง')
            } else {
                $('#text_qty_item').html('ยอดคงเหลือ')
            }
            $('#sum_qty_item').html(sum_qty_item.toFixed(2));

            console.log('data_slip_bill', data_slip_bill)

            table_bill = $('#tbl-bill').DataTable({
                "data": data_slip_bill,
                "dom": 'ifrtp',
                //autoWidth : true,
                "bDestroy": true,
                "deferRender": true,
                "order": [[0, "desc"]],
                "ordering": false,
                "pageLength": 5,
                "columnDefs": [{
                    "targets": 'no-sort',
                    "orderable": false,
                },
                {
                    "targets": [0],
                    "searchable": false,
                    "class": "tx-center",
                },
                {
                    "targets": [1],
                    "searchable": false,
                    "class": "tx-center",
                    "render": function (data, type, row, meta) {
                        return (data != '0001-01-01T00:00:00' ? moment(data).format('DD/MM/YYYY') : '-');
                    }
                },
                {
                    "targets": [2],
                    "searchable": false,
                    "class": "tx-center",
                },
                {
                    "targets": [3],
                    "searchable": false,
                    "class": "tx-center",
                },
                {
                    "targets": [4],
                    "searchable": false,
                    "class": "tx-center",
                    //"visible": false

                },
                {
                    "targets": [5],
                    "searchable": false,
                    "class": "tx-right",
                    //"visible": false

                },
                {
                    "targets": [6],
                    "searchable": false,
                    "class": "tx-center",
                    "render": function (data, type, row, meta) {
                        let status
                        if (data == 'paycash') {
                            status = '<span class="tx-primary">' + 'เงินสด' + '</span>'
                        } else if (data == 'paytran') {
                            status = '<span class="tx-success">' + 'เงินโอน' + '</span>'
                        } else if (data == 'paycard') {
                            status = '<span class="tx-warning">' + 'เครดิต' + '</span>'
                        } else if (data == 'payoth') {
                            status = '<span class="tx-dark">' + 'อื่นๆ' + '</span>'
                        } else {
                            status = '<span class="tx-danger">' + '' + '</span>'
                        }
                        return status;
                    },
                    //"visible": false

                },
                {
                    "targets": [7],
                    "searchable": false,
                    "class": "tx-center",
                    //"visible": false

                },
                {
                    "targets": [8],
                    "searchable": false,
                    "class": "tx-center font-weight-bold",
                    //"visible": false

                },
                {
                    "targets": [9],
                    "searchable": false,
                    "class": "tx-center",
                    //"visible": false

                },
                {
                    "targets": [10],
                    "searchable": false,
                    "class": "tx-center",
                    "render": function (data, type, row, meta) {
                        return (data != '0001-01-01T00:00:00' ? moment(data).format('DD/MM/YYYY HH:mm:ss') : '-');
                    }

                },
                {
                    "targets": [11],
                    "searchable": false,
                    "class": "tx-center",
                },
                {
                    "targets": [12],
                    "searchable": false,
                    "visible": false

                },
                {
                    "targets": [13],
                    "searchable": false,
                    "visible": false

                },
                {
                    "targets": [14],
                    "searchable": false,
                    "visible": false

                }],
                "initComplete": function (settings, json) {

                }
            });

            table_bill.columns.adjust();

            //$.LoadingOverlay("hide");

        }

    });

};

$.Slip_Bill_Create = async function () {

    let add_data = {
        ref_id: $('#bankslip_jobno').val(),
        bill_no: $('#bankslip_billno').val(),
        //branch: application_id.substring(0, 3), 
        branch: $('#bankslip_branch').val(),
        created_by: user_id
    };

    var params = [];
    for (const i in add_data) {
        params.push(i + "=" + encodeURIComponent(add_data[i]));
    }

    console.log('params', params.join("&"))

    fetch(url_slip_bill_create, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params.join("&"),
    }).then(response => {
        return response.json();
    }).then(function (result) {

        console.log(result.data)

        $('#bankslip_branch').val(application_id.substring(0, 3))

        if (result.length > 0) {

            $.each(result.data, function (key, val) {

                console.log(val['pMessage'])

                if (val['pMessage'] != null) {

                    toastr.error(val['pMessage']);
                    $('#bankslip_billno').addClass('parsley-error');

                } else {

                    toastr.success('Save Successfully!', async function () {

                        //table_bill.destroy();
                        $.Clear_Input();

                        $.Slip_Detail(val['ref_id']);
                        //$.Slip_Bill_List(val['ref_id']);
                        $('#bankslip_billno').focus()
                    });

                }

            })

        } else {

            toastr.error(error, 'Error writing document');
        }

    }).catch((error) => {

        toastr.error(error, 'ไม่พบข้อมูลเลขที่บิลกรุณาตรวจสอบ');

    });

    return false;
};

$.Slip_Bill_Delete = async function (citem) {

    console.log('citem', citem)

    swal({
        title: "คุณแน่ใจหรือไม่",
        text: "ที่จะทำการอัพเดตข้อมูลนี้",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "ใช่, ยันยืน",
        cancelButtonText: "ไม่, ยกเลิก",
        cancelButtonColor: '#d33',
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {

        if (isConfirm) {

            let data_update = {
                trans_id: citem['trans_id'],
                ref_id: citem['ref_id'],
                updated_by: user_id,
            };

            var params = [];
            for (const i in data_update) {
                params.push(i + "=" + encodeURIComponent(data_update[i]));
            }

            fetch(url_slip_bill_delete, {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: params.join("&"),
            }).then(data => {
                return data.json();
            }).then(result => {
                if (result.status === 'Error') {

                    toastr.error('Oops! An Error Occurred');

                } else {

                    swal({
                        title: "สำเร็จ!",
                        text: "ทำรายการสำเร็จ",
                        type: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    });

                    toastr.success('สำเร็จ บันทึกสำเร็จ!', async function () {
                        //table_bill.destroy();
                        await location.reload();
                        //$.Slip_Bill_List(urlParams.get('jobno'));

                    }, 1000);

                }

            }).catch(error => {

                toastr.error('Error, Please contact administrator.');

            });

        } else {

            swal("ยกเลิก", "ข้อมูลนี้ไม่ถูกทำรายการ", "error");

        }

    });

};

$.Master_Get = async function () {

    let url_Master = new URL(url_master_get);

    url_Master.search = new URLSearchParams({
        mode: 'branch',
    });
    fetch(url_Master).then(function (response) {
        return response.json();
    }).then(function (result) {

        if (result.status === 'Error') {

            toastr.error('Oops! An Error Occurred');

        } else {

            let Master_dataSet = [];

            $("#bankslip_branch option").remove();
            //$("#bankslip_branch").append("<option value=''>--SELECT--</option>");

            $.each(result.data, function (key, val) {

                Master_dataSet.push({ id: val['id'], text: val['name'] });

                $("#bankslip_branch").append("<option value='" + val['id'] + "'>" + val['name'] +"</option>");

            });

            //$('#bankslip_branch').select2({
            //    width: '100%',
            //    height: '40px',
            //    data: Master_dataSet,
            //    class:'bd-primary',
            //    templateResult: function (data) {
            //        return data.text;
            //    },
            //    //sorter: function (data) {
            //    //    return data.sort(function (a, b) {
            //    //        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
            //    //    });
            //    //}
            //});

        }

    });

}
