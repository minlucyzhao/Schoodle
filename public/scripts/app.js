

$(document).ready(() => {
  timepicker()
  copyToClipboard()
  showInput()
  //////slide right
  $('.box_container button').click((e) => {
    e.preventDefault()
    $('.box_container').slideUp()
    $('.box2').show('slow')

  })
  //////slide left
  $('.box2 .left').click((e) => {
    e.preventDefault()
    $('.box_container').slideDown()
    $('.box2').slideUp()
  })
  ////slide next
  $('.box2 .right').click((e) => {
    e.preventDefault()
    $('#time-picker').show()
    $('.box2').slideUp()
  })
  /// silde back
  $('#time-picker .back').click((e) => {
    e.preventDefault()
    $('#time-picker').slideDown()
    $('.box2').show()
  })
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
  let count = 1;
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



$('.box2 left').click((e) => {
  e.preventDefault()
  $('.box_container').slideDown()
  $('.box2').slideUp()
})

