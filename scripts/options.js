'use strict';

// Saves options to chrome.storage

function save_options() {
    var email = document.getElementById('email').value;
    chrome.storage.sync.set({
	email: email
    }, function () {
	console.log("Email saved")
	var status = document.getElementById('status');
	status.textContent = 'Email saved';
    });
}

// Restores preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
	email: ''
    }, function (items) {
	document.getElementById('email').value = items.email;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
