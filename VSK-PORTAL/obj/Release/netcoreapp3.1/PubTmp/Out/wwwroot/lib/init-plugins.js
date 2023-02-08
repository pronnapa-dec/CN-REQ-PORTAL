$.uuid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

$.dynamicSort = function (property) {

    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {


        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;



    };

};

$.getParams = function() {

    // Get the Full href of the page e.g. http://www.google.com/files/script.php?v=1.8.7&country=india
    var href = window.location.href;

    // Get the protocol e.g. http
    var protocol = window.location.protocol + "//";

    // Get the host name e.g. www.google.com
    var hostname = window.location.hostname;

    // Get the pathname e.g. /files/script.php
    var pathname = window.location.pathname;

    // Remove protocol part
    var queries = href.replace(protocol, '');

    // Remove host part
    queries = queries.replace(hostname, '');

    // Remove pathname part
    queries = queries.replace(pathname, '');

    // Presently, what is left in the variable queries is : ?v=1.8.7&country=india

    // Perform query functions if present
    if (queries != "" && queries != "?") {

        // Remove question mark '?'
        queries = queries.slice(1);

        // Split all the different queries
        queries = queries.split("&");

        // Get the number of queries
        var length = queries.length;

        // Declare global variables to store keys and elements
        $_GET_Params = new Array();
        $_GET = {};

        // Perform functions per query
        for (var i = 0; i < length; i++) {

            // Get the present query
            var key = queries[i];

            // Split the query and the value
            key = key.split("=");

            // Assign value to the $_GET variable
            $_GET[key[0]] = [key[1]];

            // Assign value to the $_GET_Params variable
            $_GET_Params[i] = key[0];
        }
    }
}