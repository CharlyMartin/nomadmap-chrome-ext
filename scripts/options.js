// 1. Variables
const saveBtn = document.querySelector('button#save');
const status = document.querySelector('#status-container');

const username = document.querySelector('input#username');
const token = document.querySelector('input#token');

const feedback = {
  'empty username': 'No username specified',
  'wrong username': 'The username you specified does not exist on Nomadmap',
  'empty token': 'No token given',
  'wrong token': 'The token you entered is incorrect.',
  'success': 'Your username is now synced. Feel free to move around, we got you covered!'
};


// 2. Functions
function print(stuff) {
  message = document.createElement("p");
  let content = document.createTextNode(stuff);
  message.appendChild(content);
  status.appendChild(message);

  window.setTimeout(() => {
    status.querySelector('p:first-child').remove();
  }, 4000);
};

function emptyInputs(un, t) {
  let emptyUsername = !un,
      emptyToken = !t;

  if (emptyUsername) {
    print(feedback['empty username']);
  };

  if (emptyToken) {
    print(feedback['empty token']);
  };

  if (emptyUsername || emptyToken) {return true};
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

function checkUsername() {
  window.fetch(`https://www.nomadmap.co/api/v1/nomads/${username.value}`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    if (invalid(data)) {return};
    localStorage.setItem('username', data.username);
    localStorage.setItem('email', data.email);
    localStorage.setItem('latitude', data.latitude);
    localStorage.setItem('longitude', data.longitude);

    // Check if PATCH is working. Saves token if so.
    checkToken();
  });
};

function checkToken() {
  let lat = parseInt(localStorage.getItem('latitude')),
      lgn = parseInt(localStorage.getItem('longitude')),
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
    localStorage.setItem('token', token.value);
    print(feedback['success']);
  });
};

function init() {
  // Return if one of inputs is empty
  if (emptyInputs(username.value, token.value)) {return};

  // Get API to validate username
  checkUsername(username.value);
};

// 3. Events
// document.addEventListener('DOMContentLoaded', retrieveEmail);
saveBtn.addEventListener('click', init);

// chrome-extension://hplnkkekimoegbellfpjmnekdkcjlkfg/pages/options.html
