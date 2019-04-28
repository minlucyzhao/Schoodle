

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
  ajaxPost()
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
function ajaxPost() {
  $('#userJoin').submit(function (e) {
    console.log("POST")
    e.preventDefault(); // avoid to execute the actual submit of the form.
    let form = $(this);
    let url = form.attr('action');
    let name = $("#userJoin input[name='name']").val();
    let location = $("#userJoin input[name='location']").val();
    let time = []
    $.each($("input[type='checkbox']:checked"), function () {
      time.push($(this).val());
    })
    console.log('name is', name)
    console.log('location is', location)
    console.log('time is time', time[0])
    $.ajax({
      type: "POST",
      url: url,
      data: { name, location, time },
    }).then(
      () => {
        let src = 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=MoustacheFancy&facialHairColor=Blonde&clotheType=BlazerSweater&clotheColor=Gray02&eyeType=Close&eyebrowType=Default&mouthType=Grimace&skinColor=DarkBrown';
        let $img = $('<img>').attr('src', src)
        $('.timeline div').append($img)
        let $username = name;
        $('.timeline div').append(`<span>${$username}</span>`)
      }



    )
  }

  )
}
function findCheckbox() {

}
