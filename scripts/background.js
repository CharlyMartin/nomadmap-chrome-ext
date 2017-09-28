// 1. Variables
const optionPage = 'pages/options.html';

let username = localStorage.getItem('username'),
    email = localStorage.getItem('email'),
    token = localStorage.getItem('username');


// 2. Functions
function empty(stuff) {
  if (stuff === null) {return true};
};

function open(tab) {
  chrome.tabs.create({url: tab});
};


// 3. Events
chrome.runtime.onInstalled.addListener(function(details){
  if (empty(email) || empty(username) || empty(token)) {
    open(optionPage);
  };
});

chrome.alarms.onAlarm.addListener(console.log('coco'));
