//LUCY ADDED HERE//
  let map = null;
  let markers = [];

  //Create the map
  function initMap() {
    map = new google.maps.Map(
      document.getElementById('map'), {
        center: { lat: 43.6584, lng: -79.3814 },
        zoom: 11
      });
    addLocations();
  }
  
  // Add Markers // Format: { lat: 43.6584, lng: -79.3814 }
  function addMarker(coordinates) {
    let marker = new google.maps.Marker({
      position: coordinates,
      map: map
    });
    markers.push(marker);
  }

  // Delete ALL Existing Markers (before renderCoordinates) //
  function deleteMarkers() {
    alert("deleteMarkers");
    for (let i = 0; i < markers.length; i++) {
      console.log("delete one");
      markers[i].setMap(null);
    }
    markers=[];
  }

  // Load Map //
  function addLocations() {
    alert("addLocation has been called.")
    $.ajax({
    type: 'GET',
    url: '/map/position',
    datatype: 'json',
    success: renderCoordinates
  });
}

function renderCoordinates(coordinates) {
  alert("coordinates here");
  console.log(coordinates);
  deleteMarkers();
  for (let item in coordinates) {
      let latPin = coordinates[item].latitude;
      let lngPin = coordinates[item].longitude;
      // alert(typeof(lngPin));
      addMarker({ lat: Number(latPin), lng: Number(lngPin) });
      // addMarker({lat: 43.6532, lng: -79.3832});
    }
  }
  
  //creates the new point on google map
  // $("#tweets-container").empty();
  // for (let tweet of tweets) {
  //   $("#tweets-container").prepend(createTweetElement(tweet));

  // Takes in map address
  $(function () {
    let $button = $("#set-address");
    let $address = $("#input-address");
    $button.on('click', function (event) {
      console.log("app.post ran");
      event.preventDefault();
      let newAddress = $address.val(); //.serialize() or JSON.stringify()
      // console.log(newAddress);
      $.ajax({
        type: 'POST',
        url: '/map',
        data: { address: newAddress },
        // data: {
        //   newAddress
        // },
        // success: function () {
        //   // alert("posted to server successfully!");
        //   console.log(newAddress);
        //   addLocations();
        // }
      }).done(function()  {
        addLocations();
      });
    })
  });
  