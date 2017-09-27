// 1. Variables
const usernameInput = document.querySelector('input#username');
const tokenInput = document.querySelector('input#token');
const saveBtn = document.querySelector('button#save');
const status = document.querySelector('#status-container');

const feedback = {
  'empty username': 'No username specified',
  'wrong username': 'The username you specified does not exist on Nomadmap',
  'empty token': 'No token given',
  'success': 'Your username was synced! Your position will be updated as you move around'
}


// 2. Functions
function print(detail) {
  message = document.createElement("li");
  let content = document.createTextNode(detail);
  message.appendChild(content);
  status.appendChild(message);


  window.setTimeout(() => {
    status.querySelector('li:first-child').remove();
  }, 1000);
};

function empty(username) {
  if (!username) {
    print(feedback['empty username']);
    return true
  };
};

function fetching(username) {
  window.fetch(`https://www.nomadmap.co/api/v1/nomads/${username}`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    if (invalid(data)) {return}
    store(data.username)
  });
};

function invalid(json) {
  if (json.error) {
    print(wrongUsername)
    return true
  };
};

function store(username) {
  localStorage.setItem('username', username);
  print(success)
};

// function retrieveEmail() {
//   console.log("Retrieving Email...");

//   chrome.storage.sync.get({
//     username: 'username'
//   }, function(items) {
//     username = items.username;
//   });
// };

function init() {
  let username = usernameInput.value;
  let token = tokenInput.value;
  console.log(username);

  // Return if empty
  if (empty(username)) {return};

  // calling API to get JSON
  fetching(username)
};

// 3. Events
// document.addEventListener('DOMContentLoaded', retrieveEmail);
saveBtn.addEventListener('click', init);

// chrome-extension://hplnkkekimoegbellfpjmnekdkcjlkfg/pages/options.html
