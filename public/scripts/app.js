

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
<<<<<<< HEAD
}
//LUCY ADDED HERE//

//Create the map
function initMap() {
  var map = new google.maps.Map(
    document.getElementById('map'), {
      center: { lat: 43.6584, lng: -79.3814 },
      zoom: 15
    });

  function addMarker(coordinates) {
    let marker = new google.maps.Marker({
      position: coordinates,
      map: map
    });
  }
  // Add Markers //
  addMarker({ lat: 43.6532, lng: -79.3832 }); //Toronto
  addMarker({ lat: 43.6600, lng: -79.3700 }); //Somewhere
  addMarker({ lat: 43.6608, lng: -79.3894 }); //Dundas Square
}

// Takes in map address
$(function () {
  let $button = $("#set-address");
  let $address = $("#input-address");
  $button.on('click', function (event) {
    console.log("hello");
    event.preventDefault();
    console.log("hello2");
    let newAddress = $address.val(); //.serialize() or JSON.stringify()
    // console.log(newAddress);
    $.ajax({
      type: 'POST',
      url: '/map',
      data: { address: newAddress },
      // data: {
      //   newAddress
      // },
      success: function () {
        // alert("posted to server successfully!");
        console.log(newAddress);
        // getCoordinates();
      }
    });
  })
});

function ajaxPost() {
  $('#userJoin').submit(function (e) {
    console.log("POST")
    e.preventDefault(); // avoid to execute the actual submit of the form.
    let form = $(this);
    let url = form.attr('action');
    let name = $("#userJoin input[name='name']").val();
    let location = $("#userJoin input[name='location']").val();
    let time = $("#userJoin input[name='checkbox']");
    console.log('name is', name)
    console.log('location is', location)
    console.log('time is time', time)
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

=======
}
>>>>>>> feature-mergefunctions
