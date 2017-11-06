// TODO(): Detect current locale of Browser

var locale = 'en';
var fortunes = {};

function asynRead(locale, callback) {
  var url = chrome.extension.getURL('fortunes/'+locale+'/fortunes');
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.onerror = function() {
    console.log("an error occurred");
  };
  req.onload = function() {
    callback(this);
  };
  req.send(null);
}

asynRead(locale, function(r) {
  var f = r.responseText;
  var a = f.split('\n%\n');
  fortunes[locale] = a;
})

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message && message.command == 'shuffle') {
    var i = Math.round(Math.random()*fortunes[locale].length);
    // console.log(i, fortunes[locale][i]);
    chrome.runtime.sendMessage({ command: 'shuffle_r', fortune: fortunes[locale][i]});
  }
});
