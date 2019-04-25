// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

$(document).ready(() => {
  $('#user_info').submit((e) => {
    timepicker()
  })
}

function timepicker() {
  // initialize input widgets first
  $('#time-picker .time').timepicker({
    'showDuration': true,
    'timeFormat': 'g:ia'
  });

  $('#time-picker .date').datepicker({
    'format': 'yyyy-m-d',
    'autoclose': true
  });
}
//
