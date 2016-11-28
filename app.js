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
    boolTest: true
}, {
    title: "TechnoPark Kerala\n",
    lat: 8.558096,
    lng: 76.880744,
    streetAddress: "A bit far from Cordial CC",
    cityAddress: "Thiruvananthapuram",
    id: "p2",
    visible: true,
    boolTest: true
}, {
    title: "TechnoPark Backgate Church",
    lat: 8.561622,
    lng: 76.876187,
    streetAddress: "Back gate of TechnoPark",
    cityAddress: "Thiruvananthapuram",
    id: "p3",
    visible: true,
    boolTest: true
}, {
    title: "Tata Elxsi",
    lat: 8.557028,
    lng: 76.879113,
    streetAddress: "Inside TechnoPark",
    cityAddress: "Thiruvananthapuram",
    id: "p4",
    visible: true,
    boolTest: true
}, {
    title: "Oracle Pvt Ltd",
    lat: 8.560942,
    lng: 76.880789,
    streetAddress: "Inside Leela Building",
    cityAddress: "Thiruvananthapuram",
    id: "p5",
    visible: true,
    boolTest: true
}];

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
  //   var newsAgencies = [
  //       { name: "espn" },
  //       { name:"entertainment-weekly" },
  //       { name:"der-tagesspiegel" },
  //       { name: "daily-mail" },
  //       { name: "die-zeit" }
  //   ];
  //   newsAgencies.forEach(function(agency) {

  //       // create url for the agency
  //       var url = "https://newsapi.org/v1/articles?source=" + agency.name + "&sortBy=top&apiKey=ddeb645e52134e719ed5dcb241db22d3";

  // // run the AJAX request
  //       $.ajax({
  //           url: url,
  //           dataType: 'json',
  //           success: function(data) {
  //           // store the data as a property of the agency object
  //           agency.data = data.articles[0].description;
  //           }
  //       });
    var url0 = "https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=ddeb645e52134e719ed5dcb241db22d3";
    var url1 = "https://newsapi.org/v1/articles?source=entertainment-weekly&sortBy=top&apiKey=ddeb645e52134e719ed5dcb241db22d3";
    var url2 = "https://newsapi.org/v1/articles?source=der-tagesspiegel&sortBy=latest&apiKey=ddeb645e52134e719ed5dcb241db22d3";
    var url3 = "https://newsapi.org/v1/articles?source=daily-mail&sortBy=top&apiKey=ddeb645e52134e719ed5dcb241db22d3";
    var url4 = "https://newsapi.org/v1/articles?source=die-zeit&sortBy=latest&apiKey=ddeb645e52134e719ed5dcb241db22d3";
    var data0 = "";
    $.ajax({
            url: url0,
            async: false,
            dataType: 'json',
            success: function(data) {
                data0 = data.articles[0].description;
                console.log(data);
        }
    });
    $.ajax({
            url: url1,
            async: false,
            dataType: 'json',
            success: function(data) {
                data1 = data.articles[0].description;
        }
    });
    $.ajax({
            url: url2,
            async: false,
            dataType: 'json',
            success: function(data) {
                data2 = data.articles[0].description;
        }
    });
    $.ajax({
            url: url3,
            async: false,
            dataType: 'json',
            success: function(data) {
                data3 = data.articles[0].description;
        }
    });
    $.ajax({
            url: url4,
            async: false,
            dataType: 'json',
            success: function(data) {
                data4 = data.articles[0].description;
        }
    });

    var cont1 = '<div id="content">' + '<div id="siteNotice">' + '</div>' + '<h1 id="firstHeading" class="firstHeading">TCS</h1>' + '<div id="bodyContent">' + '<p><b>' + data0 + '</p>' + '</div>' + '</div>';

    var cont2 = '<div id="content">' + '<div id="siteNotice">' + '</div>' + '<h1 id="firstHeading" class="firstHeading">Technopark Thiruvananthapuram</h1>' + '<div id="bodyContent">' + '<p>' + data1 + '</p>' + '</div>' + '</div>';

    var cont3 = '<div id="content">' + '<div id="siteNotice">' + '</div>' + '<h1 id="firstHeading" class="firstHeading">Technopark Backgate Church</h1>' + '<div id="bodyContent">' + '<p><b>' + data2 +  '</p>' + '</div>' + '</div>';

    var cont4 = '<div id="content">' + '<div id="siteNotice">' + '</div>' + '<h1 id="firstHeading" class="firstHeading">Tata Elxsi</h1>' + '<div id="bodyContent">' + '<p>' + data3 + '</p>' + '</div>' + '</div>';

    var cont5 = '<div id="content">' + '<div id="siteNotice">' + '</div>' + '<h1 id="firstHeading" class="firstHeading">Oracle Pvt Ltd</h1>' + '<div id="bodyContent">' + '<p>' + data4 + '</p>' + '</div>' + '</div>';

    contentString = [cont1,cont2,cont3,cont4,cont5];
    for (var j = 0; j < lats.length; j++) {
        infowindow[j] = new google.maps.InfoWindow({
            content: contentString[j],
            maxWidth: 300
        });
    }
    var a = document.getElementById("p1");
    var b = document.getElementById("p2");
    var c = document.getElementById("p3");
    var d = document.getElementById("p4");
    var e = document.getElementById("p5");
    google.maps.event.addDomListener(a, 'click', function(){
        infowindow[0].open(map,markers[0]);
        toggleBounce(0);
    });
    google.maps.event.addDomListener(b, 'click', function(){
        infowindow[1].open(map,markers[1]);
        toggleBounce(1);
    });
    google.maps.event.addDomListener(c, 'click', function(){
        infowindow[2].open(map,markers[2]);
        toggleBounce(2);
    });
    google.maps.event.addDomListener(d, 'click', function(){
        infowindow[3].open(map,markers[3]);
        toggleBounce(3);
    });
    google.maps.event.addDomListener(e, 'click', function(){
        infowindow[4].open(map,markers[4]);
        toggleBounce(4);
    });
    // The markers as well as the infowindows containing information about these locations is being added.
    for (var i = 0; i < lats.length; i++) {
        myLatLng = {
            lat: lats[i],
            lng: lngs[i]
        };
        markers[i] = new google.maps.Marker({
            position: myLatLng,
            map: map,
            animation: google.maps.Animation.DROP,
            zoom: 16,
            title: string[i]
        });
    }
    markers[0].addListener('click', function() {
        infowindow[0].open(map, markers[0]);
    });
    markers[1].addListener('click', function() {
        infowindow[1].open(map, markers[1]);
    });
    markers[2].addListener('click', function() {
        infowindow[2].open(map, markers[2]);
    });
    markers[3].addListener('click', function() {
        infowindow[3].open(map, markers[3]);
    });
    markers[4].addListener('click', function() {
        infowindow[4].open(map, markers[4]);
    });
    markers[0].addListener('click', toggleBounce0);
    markers[1].addListener('click', toggleBounce1);
    markers[2].addListener('click', toggleBounce2);
    markers[3].addListener('click', toggleBounce3);
    markers[4].addListener('click', toggleBounce4);
}
// Toggling feature of the marker when clicked
function toggleBounce(i) {
    if (markers[i].getAnimation() !== null) {
        markers[i].setAnimation(null);
    } else {
        markers[i].setAnimation(google.maps.Animation.BOUNCE);
    }
}

function toggleBounce0() {
    toggleBounce(0);
}

function toggleBounce1() {
    toggleBounce(1);
}

function toggleBounce2() {
    toggleBounce(2);
}

function toggleBounce3() {
    toggleBounce(3);
}

function toggleBounce4() {
    toggleBounce(4);
}
// var myNumber;
// function toggleBounce(myNumber) {
//     toggleBounce(myNumber);
// }
// toggleBounce(0);
// toggleBounce(1);
// toggleBounce(2);
// toggleBounce(3);
// toggleBounce(4);
// KNOCKOUT.JS --> This follows the MVVM mode and takes care of the query/search in a continous manner and renders the information directly to the page without loading it
var ViewModel = {
    // places: ko.observableArray(),
    query: ko.observable('')
};

var tempArr = [];
ViewModel.places = ko.dependentObservable(function() {
    var search = this.query().toLowerCase();
    tempArr = [];
    lats = [];
    lngs = [];
    return ko.utils.arrayFilter(places, function(place) {
        if (place.title.toLowerCase().indexOf(search) >= 0) {
            tempArr.push(place.title.toLowerCase());
            lats.push(place.lat);
            lngs.push(place.lng);
            return place.title.toLowerCase().indexOf(search) >= 0;
        }

        console.log(tempArr);
        for (var j = 0; j < markers.length; j++) {
            markers[j].setMap(null);
        }
        // To display the markers of the required/searched locations alone
        for (var i = 0; i < tempArr.length; i++) {
            for (var j = 0; j < places.length; j++) {
                if (tempArr[i] === places[j].title.toLowerCase()) {
                    myLatLng = {
                        lat: places[j].lat,
                        lng: places[j].lng
                    };
                    markers[j] = new google.maps.Marker({
                        position: myLatLng,
                        map: map,
                        zoom: 16,
                        animation: google.maps.Animation.DROP,
                        title: string[j]
                    });
                    markers[j].setMap(map);
                }
            }
        }
        console.log(markers);
        markers[0].addListener('click', function() {
            infowindow[0].open(map, markers[0]);
        });
        markers[1].addListener('click', function() {
            infowindow[1].open(map, markers[1]);
        });
        markers[2].addListener('click', function() {
            infowindow[2].open(map, markers[2]);
        });
        markers[3].addListener('click', function() {
            infowindow[3].open(map, markers[3]);
        });
        markers[4].addListener('click', function() {
            infowindow[4].open(map, markers[4]);
        });
        markers[0].addListener('click', toggleBounce0);
        markers[1].addListener('click', toggleBounce1);
        markers[2].addListener('click', toggleBounce2);
        markers[3].addListener('click', toggleBounce3);
        markers[4].addListener('click', toggleBounce4);
    });
}, ViewModel);

ko.applyBindings(ViewModel);

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
