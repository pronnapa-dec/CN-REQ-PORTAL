'use strict';

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        $('#btn-signout').click(function (e) {

            e.preventDefault();

            Swal.fire({
                title: 'Are you sure?',
                text: "You have been logged out!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33', 
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Logout!'
            }).then((result) => {
                if (result.value) {
                    firebase.auth().signOut().then(function () {

                        localStorage.clear();

                        window.location.assign('./login');

                    }).catch(function (error) {
                        // An error happened.
                    });
                }
            })

        });

    } else {

        window.location.assign('./login');

    }



});