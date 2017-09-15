// 1. Variables
const alarm = 'Daily Location Update';
let username = localStorage.getItem("username");
const optionPage = 'pages/options.html';

// 2. Functions
function createAlarm() {
  console.log(arguments.callee.name);

 chrome.alarms.create(alarm, {
   periodInMinutes: (1)
 });
};

function getBrowserLocation() {
  console.log(arguments.callee.name);

  if (!navigator.geolocation){
    alert("Geolocation is not supported by your browser");
    return;
  }
  navigator.geolocation.getCurrentPosition(success, error);
};

function success(position) {
  let lat = position.coords.latitude;
  let lgn = position.coords.longitude;
  fetch(lat, lgn);
};

function error() {
  alert("You did not give access to your position")
};

function fetch(lat, lgn) {
  json = {
    "username": username,
    "latitude": lat,
    "longitude": lgn
  }
  console.log(json)

  window.fetch(`https://www.nomadmap.co/api/v1/nomads/${username}`, {
    method: 'PUT',
    headers:  new Headers({
      'Content-Type': 'application/json',
      'token': `${Math.floor(json.lat)**Math.floor(json.lgn)}`
    }),
    body: {
      data: json
    }
  });
};

function empty(stuff) {
  if (stuff === null) {return true};
};

function open(tab) {
  chrome.tabs.create({url: tab});
}

// chrome.alarms.create("daily-location-update", {
//     "periodInMinutes": 60 * 12
// });

// chrome.alarms.onAlarm.addListener(function(alarm) {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(function (response) {
// 	    var xhr = new XMLHttpRequest();
// 	    var latitude = response.coords.latitude;
// 	    var longitude = response.coords.longitude;

// 	    getLocation(latitude, longitude);
// 	});
//     }
// });


// function getLocation(latitude, longitude) {
//     chrome.storage.sync.get({
//         email: ''
//     }, function (items) {
// 	if (items.email == null)
// 	    return;

// 	var json_upload = JSON.stringify({
// 	    longitude: longitude,
// 	    latitude: latitude,
// 	    email: items.email
// 	});

// 	function callback () {
// 	    console.log(this.responseText);
// 	}

// 	var xmlhttp = new XMLHttpRequest();
// 	xmlhttp.addEventListener("load", callback);
// 	xmlhttp.open("PUT", "https://digital-nomad-map.herokuapp.com/api/update");
// 	xmlhttp.setRequestHeader("Content-Type", "application/json");
// 	xmlhttp.send(json_upload);
//     });
// }

// 3. Events
chrome.alarms.onAlarm.addListener(getBrowserLocation);

chrome.runtime.onInstalled.addListener(function(details){
    if (empty(username)) {open(optionPage)};
    createAlarm();
});
