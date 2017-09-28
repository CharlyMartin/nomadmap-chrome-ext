// 1. Variables
const optionPage = 'pages/options.html';

let username = localStorage.getItem('username'),
    email = localStorage.getItem('email'),
    token = localStorage.getItem('token');


// 2. Functions
function empty(stuff) {
  if (stuff === null) {return true};
};

function open(tab) {
  chrome.tabs.create({url: tab});
};



// Update API functions
function getBrowserLocation() {
  console.log(arguments.callee.name);

  if (!navigator.geolocation){
    alert("Geolocation is not supported by your browser");
    return;
  }
  navigator.geolocation.getCurrentPosition(success, error);
};

function success(response) {
  let lat = response.coords.latitude;
  let lgn = response.coords.longitude;
  updateAPI(lat, lgn);
};

function error() {
  alert("You did not give us access to your position.")
};

function updateAPI(lat, lgn) {
  payload = JSON.stringify({
    nomad: {
      latitude: lat,
      longitude: lgn
    }
  });

  window.fetch(`https://www.nomadmap.co/api/v1/nomads/${username}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Token': `${token}`,
      'X-User-Email': `${email}`
    },
    body: payload
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
  });
};


// 3. Events
chrome.runtime.onInstalled.addListener(function(details){
  if (empty(email) || empty(username) || empty(token)) {
    open(optionPage);
  };
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  console.log(alarm);
  getBrowserLocation();
});
