'use strict';

const api_url = 'http://localhost:49705';
//const api_url = 'http://192.168.1.247:8082/mrp-api';
const path_img = 'http://192.168.1.247:8083/QV_Charts';

let customElement = $("<div>", {
    "css": {
        "border": "2px solid",
        "font-size": "14px",
        "text-align": "center",
        "padding": '7px'

    },
    "text": 'Please Wait...'
});

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        $.init = function () {

            var rpt_date = moment(new Date()).format('YYYY/MM/DD');
            let dir_year = rpt_date.format('YYYY');
            let dir_month = rpt_date.format('MM'); 
            let dir_day = rpt_date.format('DD');

           // let imageUrl = path_img + '/' + rpt_date + '/SALES_RPT01_20210125_152822.png';

            let imageUrl = path_img + '/2021/01/25/SALES_RPT02-20210125_110506.png';

            $('#load_rpt').css('background-image', 'url("' + imageUrl + '")').css('width', '1285px').css('height', '422px');
            $('#load_rpt').css('background-repeat','no-repeat')
            $('#load_rpt').css('background-position', 'center','center')


        };

        $.Search = async function () {

        }

        $(document).ready(async function () {

            await $.init();

        });

    } else {

        window.location.assign('./login');

    }

});