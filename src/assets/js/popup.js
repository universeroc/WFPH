!function() {
  var button = document.querySelector('button');
  if (button) {
    button.addEventListener('click', function() {
      chrome.tabs.query({active:true}, function(tabs) {
        if (tabs) {
          var current = tabs[tabs.length-1];
          chrome.tabs.executeScript(current.tabId, {
            file: 'assets/js/free_the_fish.js'
          }, function() {
            var free_the_fish = document.querySelector('button');
            if (free_the_fish) {
              button.textContent = 'Fish is swimming';
            }
          });
        }
      });
    }, !0);
  }
}();

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message && message.command == 'shuffle_r') {
    // console.log(message);
    var fortune = document.querySelector('.fortune');

    var c = (function(raw) {
      return raw.split('"\n');
    })(message.fortune);

    if (fortune) {
      fortune.innerText = c[0];
    }

    var author = document.querySelector('.author');
    if (author) {
      author.innerText = (c[1] ? c[1] : '');
    }
  }
});
chrome.runtime.sendMessage({ command: 'shuffle' });
