const email = document.querySelector('input#email').value;
const saveBtn = document.querySelector('button#save');
const status = document.querySelector('div#status-container');


function storeEmail() {
  console.log("Storing Email...")

  if (!email) {
    message('Error: No email specified');
    return;
  };

  chrome.storage.sync.set({
    email: email,
  }, () => {
    status.textContent = 'Email saved!';

    window.setTimeout(() => {
      status.textContent = '';
    }, 2000);
  });
};

function retrieveEmail() {
  console.log("Retrieving Email...");

  chrome.storage.sync.get({
    email: 'email'
  }, function(items) {
    email = items.email;
  });
};


document.addEventListener('DOMContentLoaded', retrieveEmail);
saveBtn.addEventListener('click', storeEmail);
