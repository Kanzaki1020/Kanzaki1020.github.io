/*********************************↓ Massage Board ↓*********************************/
$(document).ready(function () {

    $('.submit').click(function () {
        var msg, guest, time, msg_time;

        time = new Date();
        //set month to string
        var month = new Array();
        month[0] = 'Jan'; month[1] = 'Feb'; month[2] = 'Mar'; month[3] = 'Apr'; month[4] = 'May';
        month[5] = 'Jun'; month[6] = 'Jul'; month[7] = 'Aug'; month[8] = 'Sep'; month[9] = 'Oct';
        month[10] = 'Nov'; month[11] = 'Dec';
        //set 1 minute to 01
        var minute;
        if (time.getMinutes() < 10) {
            minute = '0' + time.getMinutes();
        } else {
            minute = time.getMinutes();
        }
        //set date format: Month Date, Year Hour:Minute
        msg_time = time.getFullYear() + ' ' + month[time.getMonth()] + ' ' + time.getDate() + ' ' + ' ' + time.getHours() + ':' + minute;

        //add new massage in massage board
        msg = $('.textarea').val();
        guest = $('.guest-name').val();

        if (msg == '') {
            alert('請輸入內容');
        }
        else {
            if (guest == '') {
                guest = '匿名';
            }
            $('div.msg-container').append(
                '<div class="msg">' +
                '<div class="row">' +
                '<div class="col-md-auto date">' + msg_time + '</div>' +
                '<div class="col guest text-right">' + guest + '</div>' +
                '</div>' +
                '<div class="col guest-msg">' + msg + '</div>' +
                '</div>'
            );
        }
        //reset input area
        $('.guest-name').val('');
        $('.textarea').val('');
    });
});
/*********************************↑ Massage Board ↑*********************************/