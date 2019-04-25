$(document).ready(() => {
  $('input.timepicker').timepicker({})
  timepicker()
  addDate()
}
)

///TimePicker Function
function timepicker() {
  // initialize input widgets first
  $('#time-picker .time').timepicker({
    'showDuration': true,
    'timeFormat': 'g:i a'
  });

  $('#time-picker .date').datepicker({
    'format': 'yyyy-m-d',
    'autoclose': true
  });
  // initialize datepair
}
function addDate() {
  $('#new_date').click((e) => {
    e.preventDefault()
    $('#time-picker').append("<input name='date' type='text' class='date start'>")
    $('#time-picker').append("<input name='from_time' type='text' class='time start'>")
    $('#time-picker').append("<input name='to_time' type='text' class='time end'>")
  })
}