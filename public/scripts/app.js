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
});

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

//LUCY ADDED HERE//

//Create the map
function initMap() {
  var map = new google.maps.Map(
      document.getElementById('map'), {
          center: {lat: 43.6584, lng: -79.3814},
          zoom: 15
      });

      function addMarker(coordinates) {
        let marker = new google.maps.Marker ({
            position: coordinates,
            map: map
        });
    }
    // Add Markers //
    addMarker({lat: 43.6532, lng: -79.3832}); //Toronto
    addMarker({lat: 43.6600, lng: -79.3700}); //Somewhere
    addMarker({lat: 43.6608, lng: -79.3894}); //Dundas Square
  }

// Takes in map address
$(function() {
  let $button = $("#set-address");
  let $address = $("#input-address");
    $button.on('click', function (event) {
      console.log("hello");
        event.preventDefault();
        console.log("hello2");
        let newAddress = $address.val(); //.serialize() or JSON.stringify()
        // console.log(newAddress);
          $.ajax ({
            type: 'POST',
            url: '/map',
            data: {address: newAddress},
            // data: {
            //   newAddress
            // },
            success: function() {
                // alert("posted to server successfully!");
                console.log(newAddress);
                // getCoordinates();
            }
        });
      })
  });

// const getCoordinates = function() {
//   $.ajax({
//       type:'GET',
//       url: '/map',
//       datatype: 'json', //what does this do? convert the file into json directly?
//       success: renderCoordinates //this is a callback
//   })
// }

// function renderCoordinates(coordinates) {
//   //creates the new point on google map
//   $("#tweets-container").empty();
//   for (let tweet of tweets) {
//     $("#tweets-container").prepend(createTweetElement(tweet));
//   } 
// }

//-----------------
