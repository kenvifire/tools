// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://onlinebusiness.icbc.com/deas/WebDeasServlet/SelectApptAction
// @grant        none
// @require https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @require https://momentjs.com/downloads/moment.js
// ==/UserScript==


(function() {
    'use strict';

    // Your code here...
    function getCurrentTime() {
        var day = jQuery(jQuery(jQuery('html body form table tbody tr td center table tbody tr td table tbody tr td table')[2]).find('td')[7]).text().trim();

        var time = jQuery(jQuery(jQuery(jQuery('html body form table tbody tr td center table tbody tr td table tbody tr td table')[2])).find('td')[9]).text().trim();


        return moment(day + ' ' + time, 'ddd, MMM DD, YYYY, hh:mm a');

    }

    function getFirstAvailableTime() {
        var day = jQuery(jQuery(jQuery('html body form table tbody tr td center table tbody tr td table tbody tr td table')[1]).find('td')[9]).text().trim();
        var time = jQuery(jQuery(jQuery(jQuery('html body form table tbody tr td center table tbody tr td table tbody tr td table')[1])).find('td')[10]).text().trim();

        return moment(day + ' ' + time, 'ddd, MMM DD, YYYY, hh:mm a');

    }


    function mainLogic() {
        var current = getCurrentTime();
        var firstAva = getFirstAvailableTime();

        if(current.isValid() && firstAva.isValid() && firstAva.isBefore(current)) {
            console.log('trying to book:' + current.format('YYYY-MM-DD, hh:mm a'));
            bookAppointment();
        } else {
            console.log('current:' + (current.isValid() ? current.format('YYYY-MM-DD, hh:mm a') : 'N/A'));
            console.log('firstAva:' + (firstAva.isValid() ? firstAva.format('YYYY-MM-DD, hh:mm a') : 'N/A'));
            console.log('===========SKIPPED=================');
        }
    }

    function reload() {
        var prev = $('img[name="previousAppt"]');
        if(prev.length == 0) {
            loadSelectAppointmentPage(1);
        }else {
            loadSelectAppointmentPage(2);
        }
    }

    window.addEventListener('load', function() {
        mainLogic()
        setTimeout(reload, 2000)
    }, false);

})();
