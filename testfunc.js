function getDate(date, time1, time2, eventID) {
    let q = []
    for (i = 0; i < date.length; i++) {
        q.push({
            event_id: eventID, from_time: time1[i], to_time: time2[i], day: date[i]

        })

    }
    return q
}
function toDate(dateStr) {
    var from = dateStr.split("/")
    var f = [from[2], from[0], from[1]].join('-')
    return f
}
ft = ['00:00', '00:30']
tt = ['01:30', '01:00']
date = ['04/02/2019', '04/06/2019']
eventid = 2


function dateGet(today) {
    const dd = today.getDate();
    const mm = today.getMonth()
    const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    const month = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return `${month[mm]} ${dd} ${yyyy}`
}
let t = new Date('2019-05-16T00:00:00.000Z')
console.log(dateGet(t))