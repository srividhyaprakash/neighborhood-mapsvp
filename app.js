// This function is to load the google maps API asynchronously
function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
        '&signed_in=false&callback=initialize';
    setTimeout(function() {
        try {
            if (!window.google || !window.google.maps) {
                throw 20;
            }
        } catch (e) {
            alert("Sorry Map hasnt loaded");
        }
    }, 5000);
    document.body.appendChild(script);
}
window.onload = loadScript;

// This defines the object containing the different propties of the places
var places = [{
    title: "TCS Peepul Park, Thiruvananthapuram, Kerala",
    lat: 8.552525,
    lng: 76.879843,
    streetAddress: "Near Cordial CC",
    cityAddress: "Thiruvananthapuram",
    id: "p1",
    visible: true,
    boolTest: true,
    newsAgency:  "espn",   // new property added
    sortby: "top"
}, {
    title: "TechnoPark Kerala\n",
    lat: 8.558096,
    lng: 76.880744,
    streetAddress: "A bit far from Cordial CC",
    cityAddress: "Thiruvananthapuram",
    id: "p2",
    visible: true,
    boolTest: true,
    newsAgency:  "entertainment-weekly",  // new property added
    sortby: "top"
}, {
    title: "TechnoPark Backgate Church",
    lat: 8.561622,
    lng: 76.876187,
    streetAddress: "Back gate of TechnoPark",
    cityAddress: "Thiruvananthapuram",
    id: "p3",
    visible: true,
    boolTest: true,
    newsAgency: "der-tagesspiegel",
    sortby: "latest"
}, {
    title: "Tata Elxsi",
    lat: 8.557028,
    lng: 76.879113,
    streetAddress: "Inside TechnoPark",
    cityAddress: "Thiruvananthapuram",
    id: "p4",
    visible: true,
    boolTest: true,
    newsAgency: "daily-mail",
    sortby: "top"
}, {
    title: "Oracle Pvt Ltd",
    lat: 8.560942,
    lng: 76.880789,
    streetAddress: "Inside Leela Building",
    cityAddress: "Thiruvananthapuram",
    id: "p5",
    visible: true,
    boolTest: true,
    newsAgency: "die-zeit",
    sortby: "latest"
}];
var j = 0; //variable for looping
var infowindow;
// var lists = document.getElementsByClassName("options");
// console.log(lists);
var lats = [];
var lngs = [];
var lattemp = [];
var lngtemp = [];
places.forEach(function(data) {
    lats.push(data.lat);
    lngs.push(data.lng);
    lattemp.push(data.lat);
    lngtemp.push(data.lng);
});
// ViewModel.query.subscribe(ViewModel.search);
var map;
var markers = [];
var infowindow = [];
var contentString = [];

var string = ['TCS Peepul Park, Thiruvananthapuram, Kerala', 'TechnoPark Kerala', 'TechnoPark Backgate Church', 'Tata Elxsi', 'Oracle Pvt Ltd'];
// Initialize the map and display it with the 5 locations/ markers
function initialize() {
    var myLatLng = {
        lat: lats[0],
        lng: lngs[0]
    };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: myLatLng
    });
     infowindow = new google.maps.InfoWindow({
        maxWidth: 300
    });

  places.forEach(function(place) {

  // create url for the agency
  var url = "https://newsapi.org/v1/articles?source=" + place.newsAgency +
    "&sortBy=" + place.sortby + "&apiKey=ddeb645e52134e719ed5dcb241db22d3";

  // run the AJAX request
  $.ajax({
    url: url,
    dataType: 'json',
    success: function(data) {
      // store the data as a property of the place object
      place.news = data.articles[0].description;

     // create the content string to use when a list view item or map marker is clicked.
      place.contentString = '<div id="content"><div id="siteNotice"></div>' +
        '<h1 id="firstHeading" class="firstHeading">' + place.title +
        '</h1><div id="bodyContent"><p><b>' + place.news + '</p></div></div>';
    }
  });
          infowindow[j] = new google.maps.InfoWindow({
            content: place.contentString,
            maxWidth: 300
        });
        j = j + 1;
});

    // The markers as well as the infowindows containing information about these locations is being added.
    for (var i = 0; i < places.length; i++) {

  myLatLng = {
    lat: places[i].lat,
    lng: places[i].lng
  };
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    animation: google.maps.Animation.DROP,
    zoom: 16,
    title: string[i]
  });

  places[i].marker = marker;

  google.maps.event.addListener(marker, 'click', (function(i) {
    return function() {
        toggleBounce(places[i].marker);  // add toggleBounce when marker is clicked
        infowindow.setContent(places[i].contentString),
        infowindow.open(map, places[i].marker)
    }
  })(i));
}

// Toggling feature of the marker when clicked
function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}


var ViewModel = {
    // places: ko.observableArray(),
    query: ko.observable('')
};

var tempArr = [];
ViewModel.places = ko.dependentObservable(function() {
    var search = this.query().toLowerCase();
    tempArr = [];
    var marker = [];
    lats = [];
    lngs = [];
    return ko.utils.arrayFilter(places, function(place) {
        if (place.title.toLowerCase().indexOf(search) >= 0) {
            tempArr.push(place.title.toLowerCase());
            lats.push(place.lat);
            // console.log(place.lat);
            lngs.push(place.lng);
            return place.title.toLowerCase().indexOf(search) >= 0;
        }

        console.log(tempArr);
        places.forEach(function(place){
            place.marker.setMap(null);
        });
        // To display the markers of the required/searched locations alone
        for (var i = 0; i < tempArr.length; i++) {
            for (var j = 0; j < places.length; j++) {
                if (tempArr[i] === places[j].title.toLowerCase()) {
                    myLatLng = {
                        lat: places[j].lat,
                        lng: places[j].lng
                    };
                    marker[j] = new google.maps.Marker({
                        position: myLatLng,
                        map: map,
                        zoom: 16,
                        animation: google.maps.Animation.DROP,
                        title: string[j]
                    });
                    marker[j].setMap(map);
                }
            }
        }
        console.log(markers);
        google.maps.event.addListener(marker, 'click', (function(i) {
    return function() {

        toggleBounce(places[i].marker);  // add toggleBounce when marker is clicked
        infowindow.setContent(places[i].contentString),
        infowindow.open(map, places[i].marker)
    }
  })(i));
    });
}, ViewModel);

ko.applyBindings(ViewModel);
}
$(document).ready(function(){
    $("#hide").click(function(){
        $("#searcher").hide();
        $("#hide").hide();
        $("#show").show();
    });
    $("#show").click(function(){
        $("#searcher").show();
        $("#hide").show();
        $("#show").hide();
    });
});
// To display the weather using openweather API and getJSON method. Error Handling has also been provided in case incorrect data is entered
// var url1 = "http://api.openweathermap.org/data/2.5/weather?lat=13&lon=8&appid=f5dfed972c4e75b54e8792be551813a0&units=metrics";
// $.getJSON(url1, function(data) {
//     console.log(data.main.temp - 273);
//     $("#tempdisp").html("Temp is: " + (data.main.temp - 273) + "&#8451" + "<br>Obtained from openweathermap");
// }).error(function(e) {
//     alert("Sorry the page could not be pulled as requested");
// });
