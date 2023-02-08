$LogEventCreate = function (event_name,event_status,event_data) {

    console.log('LogEventCreate', new Date(), event_data);

    let objProfile = JSON.parse(localStorage.getItem('objProfile'));
    let event_id = $.uuid();

    $.ajax({
        url: 'http://localhost:49705/v2/LogEventCreate',
        type: 'POST',
        data: {
            event_id: event_id,
            app_name: objProfile['auth_permission'][0]['application_id'],
            user_id: objProfile['auth_user_profile'][0]['user_email'].replace("@vskautoparts.com", ""),
            screen_name: location.pathname,
            event_name: event_name,
            event_status: event_status,
            event_data: event_data
        },
        success: function (result) {

            console.log('LogEventCreate', new Date(), result)

        }
    });

  
}