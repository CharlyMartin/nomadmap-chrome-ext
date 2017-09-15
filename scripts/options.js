const usernameInput = document.querySelector('input#username');
const saveBtn = document.querySelector('button#save');
const status = document.querySelector('div#status-container');


function storeData() {
  let username = usernameInput.value
  let callback;

  console.log(username)

  // Return if empty
  if (!username) {
    alert('No username specified');
    return;
  };

  // Check validity
  callback = checkValidity(username)
  console.log('callback: ',  callback)

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

function checkValidity(username) {
  let result;

  window.fetch(`https://www.nomadmap.co/api/v1/nomads/${username}`)
  .then(response => response.json())
  .then(data => {
    result = data
    console.log(result)
  });

  return result
};

function retrieveEmail() {
  console.log("Retrieving Email...");

  chrome.storage.sync.get({
    username: 'username'
  }, function(items) {
    username = items.username;
  });
};


// document.addEventListener('DOMContentLoaded', retrieveEmail);
saveBtn.addEventListener('click', storeData);
