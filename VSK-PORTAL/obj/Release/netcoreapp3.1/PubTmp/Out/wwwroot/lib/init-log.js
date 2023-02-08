$.addLogEvent = function (collection) {

    console.log('addLogEvent', new Date(), collection);

    let db = firebase.database();

    let chatRef = db.ref('log_event_' + 'mis-portal' + '_' + collection);

    let citem = {
        event_id: $.uuid(),
        event_date: new Date(),
        app_name: 'mis-portal',
        user_id: 'system'
    };

    chatRef.child(moment(new Date()).toDate().getTime()).set(citem).then(function () {

    });

}