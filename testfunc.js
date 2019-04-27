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

console.log(getDate(date, ft, tt, eventid))