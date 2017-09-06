
console.log("Start");

chrome.alarms.create("daily-location-update", {
    "periodInMinutes": 60 * 12
});

chrome.alarms.onAlarm.addListener(function(alarm) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (response) {
	    var xhr = new XMLHttpRequest();
	    var latitude = response.coords.latitude;
	    var longitude = response.coords.longitude;

	    getLocation(latitude, longitude);
	});
    }
});


function getLocation(latitude, longitude) {
    chrome.storage.sync.get({
        email: ''
    }, function (items) {
	if (items.email == null)
	    return;

	var json_upload = JSON.stringify({
	    longitude: longitude,
	    latitude: latitude,
	    email: items.email
	});

	function callback () {
	    console.log(this.responseText);
	}

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.addEventListener("load", callback);
	xmlhttp.open("PUT", "https://digital-nomad-map.herokuapp.com/api/update");
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.send(json_upload);
    });
}


chrome.runtime.onInstalled.addListener(function(details){
    if (details.reason == "install"){
        chrome.tabs.create({
            url: "options.html"
	});
    }
});
