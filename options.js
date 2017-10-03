// 1. Variables
const saveBtn = document.querySelector('button#save'),
      status = document.querySelector('#status-container'),
      alarmName = 'Daily Location Update',
      username = document.querySelector('input#username'),
      token = document.querySelector('input#token'),
      feedback = {
        'empty username': 'No username specified',
        'wrong username': 'The username you specified does not exist on Nomadmap',
        'empty token': 'No token given',
        'wrong token': 'The token you entered is incorrect.',
        'success': 'Your username is now synced. Feel free to move around, we got you covered!'
      };


// 2. Functions
function print(stuff) {
  message = document.createElement("h3");
  let content = document.createTextNode(stuff);
  message.appendChild(content);
  status.appendChild(message);

  window.setTimeout(() => {
    status.querySelector('h3:first-child').remove();
  }, 5000);
};

function emptyInputs(name, key) {
  let emptyUsername = !name,
      emptyToken = !key;

  if (emptyUsername) {
    print(feedback['empty username']);
  };

  if (emptyToken) {
    print(feedback['empty token']);
  };

  if (emptyUsername || emptyToken) {return true};
};

function createAlarm() {
  console.log(arguments.callee.name);
  chrome.alarms.create(alarmName, {
    delayInMinutes: (60 * 6),
    periodInMinutes: (60 * 6)
  });
};

function invalid(data) {
  let error = data.error
  if (error === "Internal Server Error") {
    print(feedback['wrong username'])
    return true
  };
  if (error === "You need to sign in or sign up before continuing.") {
    print(feedback['wrong token'])
    return true
  };
};

function persist(key, value) {
  localStorage.setItem(key, value)
};

function checkUsername() {
  window.fetch(`https://www.nomadmap.co/api/v1/nomads/${username.value}`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    if (invalid(data)) {return};
    persist('username', data.username);
    persist('email', data.email);
    persist('latitude', data.latitude);
    persist('longitude', data.longitude);

    // Check if PATCH is working. Saves token if so.
    checkToken();
  });
};

function checkToken() {
  let lat = parseFloat(localStorage.getItem('latitude')),
      lgn = parseFloat(localStorage.getItem('longitude')),
      payload = JSON.stringify({
        nomad: {
          latitude: lat,
          longitude: lgn
        }
      });

  window.fetch(`https://www.nomadmap.co/api/v1/nomads/${username.value}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Token': `${token.value}`,
      'X-User-Email': `${localStorage.getItem('email')}`
    },
    body: payload
  })
  .then(response => response.json())
  .then(data => {
    if (invalid(data)) {return};
    persist('token', token.value);
    print(feedback['success']);
    createAlarm();
  });
};

function init() {
  if (emptyInputs(username.value, token.value)) {return};
  checkUsername(username.value);
};


// 3. Events
saveBtn.addEventListener('click', init);

// chrome-extension://hplnkkekimoegbellfpjmnekdkcjlkfg/options.html
