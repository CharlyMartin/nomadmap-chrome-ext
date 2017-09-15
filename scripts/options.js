// 1. Variables
const usernameInput = document.querySelector('input#username');
const saveBtn = document.querySelector('button#save');
const status = document.querySelector('div#status-container');

const wrongUsername = 'The username you specified does not exist on Nomadmap &#x1F631'
const emptyData = 'No username specified &#x1F631'
const success = 'Your username was synced &#x1F64F Your position will be updated as you move around &#x1F4AA'

// 2. Functions
function print(message) {
  status.innerHTML = message

  window.setTimeout(() => {
    status.innerHTML = '';
  }, 5000);
};

function empty(username) {
  if (!username) {
    print(emptyData)
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
