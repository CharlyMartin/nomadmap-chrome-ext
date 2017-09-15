const usernameInput = document.querySelector('input#username');
const saveBtn = document.querySelector('button#save');
const status = document.querySelector('div#status-container');


function empty(username) {
  if (!username) {
    alert('No username specified');
    return true;
  };
};

function fetching(username) {
  let result;

  window.fetch(`https://www.nomadmap.co/api/v1/nomads/${username}`)
  .then(response => response.json())
  .then(data => {
    result = data
    console.log(result)
  });

  return result
};

function invalid(json) {
  if (json.error) {
    alert('The username you specified does not exist on Nomadmap');
    return true
  };
};

function storeData() {
  // store data
  chrome.storage.sync.set({
    username: username,
  }, () => {
    status.textContent = 'Username saved!';

    window.setTimeout(() => {
      status.textContent = '';
    }, 4000);
  });
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
  let apiCallback = fetching(username)
  console.log(apiCallback)

  // Return if invalid username
  if (invalid(apiCallback)) {return}

  // storing username in local storage
  // store(username)
};

// document.addEventListener('DOMContentLoaded', retrieveEmail);
saveBtn.addEventListener('click', init);

// chrome-extension://hplnkkekimoegbellfpjmnekdkcjlkfg/pages/options.html
