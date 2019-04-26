

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

}
function callBack(count) {
  console.log(count)
  $(`#time-picker span:nth-child(${count})`).show()

}