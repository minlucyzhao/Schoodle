

$(document).ready(() => {
  timepicker()
  copyToClipboard()
  showInput()
})

function timepicker() {
  // initialize input widgets first
  $('#time-picker .time').timepicker({
    'showDuration': true,
    'timeFormat': 'H:i'
  });

  $('#time-picker .date').datepicker({
    'format': 'yyyy-m-d',
    minDate: 0,
    'autoclose': true
  });
}

function copyToClipboard() {
  const $copyText = $('#urls')
  $copyText.select();
  document.execCommand("copy");
}

function showInput() {
  let count = 7;
  $('#new_date').click((e) => {
    e.preventDefault()
    callBack(count)
    count++
  })
<<<<<<< HEAD
=======

>>>>>>> 9e433f0f99d84ff4e3b2ccb6e5916af7a6ae0d59
}
function callBack(count) {
  console.log(count)
  $(`#time-picker span:nth-child(${count})`).show()
<<<<<<< HEAD
=======

>>>>>>> 9e433f0f99d84ff4e3b2ccb6e5916af7a6ae0d59
}