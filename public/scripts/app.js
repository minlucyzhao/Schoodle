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
    console.log('submit works!!')
    e.preventDefault();
    const title = $("#user_info input[name='title']").val();
    const description = $("#user_info input[name='description']").val();
    const date = $("#user_info input[name='date']").val();
    const name = $("#user_info input[name='name']").val();
    const email = $("#user_info input[name='email']").val();
    $.ajax({
      method: 'POST',
      url: '/db',
      data: {
        title: title,
        description: description,
        date: date,
        name: name,
        email: email
      }
    })

  })
  ajax_get()
  timepicker()
})
function ajax_get() {
  $.get('/db', (data, status) => {
    console.log('get date', data)
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
  // initialize datepair
  $('#time-picker').datepair();
}
//
