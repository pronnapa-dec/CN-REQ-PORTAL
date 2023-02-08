'use strict';

let MRP_Dailydelivery_Get_URL = 'https://vsk.tms-vcargo.com/api/tms/v1/public/dailydelivery/report';

$.init = function () {

    (async () => {

        const rawResponseMo = await fetch(MRP_Dailydelivery_Get_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': 'zVSKWbx2bN2WFS74221w82o44GAEzms7xG0ApZfW'
            },
            body: JSON.stringify({
                "shippingNoteNumber": "",
                "manifestNoteNumber": "",
                "vehicle": "",
                "driver": "",
                "projectId": 1,
                "statusId": 4,
                "startDate": "2021-01-26 00:00:00",
                "endDate": "2021-01-26 23:59:59"
            })
        });
        const content_mo = await rawResponseMo.json();

        let citem_dailydelivery = [];

        $.each(content_mo.object, function (key, val) {

            citem_dailydelivery.push({
                tms_job_date: moment(val['createDate'], 'YYYY-MM-DD').format('YYYY-MM-DD 00:00:00'),
                tms_job_route: val['routeLineName'],
                tms_job_plate: val['vehicle'],
                tms_job_name: val['driver'],
                tms_job_no: val['shippingNoteNumber'],
                tms_job_cus_name: val['recipientName'],
                tms_job_created_date: val['createDate'],
                tms_job_delivery_date: val['currentStatusDate']
            });

        });

        const rawResponseTR = await fetch(MRP_Dailydelivery_Get_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': 'zVSKWbx2bN2WFS74221w82o44GAEzms7xG0ApZfW'
            },
            body: JSON.stringify({
                "shippingNoteNumber": "",
                "manifestNoteNumber": "",
                "vehicle": "",
                "driver": "",
                "projectId": 1,
                "statusId": 3,
                "startDate": "2021-01-26 00:00:00",
                "endDate": "2021-01-26 23:59:59"
            })
        });
        const content_tr = await rawResponseTR.json();

        $.each(content_tr.object, function (key, val) {

            citem_dailydelivery.push({
                tms_job_date: moment(val['createDate'],'YYYY-MM-DD' ).format('YYYY-MM-DD 00:00:00'),
                tms_job_route: val['routeLineName'],
                tms_job_plate: val['vehicle'],
                tms_job_name: val['driver'],
                tms_job_no: val['shippingNoteNumber'],
                tms_job_cus_name: val['recipientName'],
                tms_job_created_date: val['createDate'],
                tms_job_delivery_date: val['currentStatusDate']
            });

        });

        console.log(citem_dailydelivery);
   
        $.ajax({
            url: 'http://localhost:49705/v1/TRP_TMS_Sync_Add',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(citem_dailydelivery) ,
            success: function (result) {
              
            }
        });
   
    })();

};

$(document).ready(async function () {

    await $.init();

});


