"use strict";
<<<<<<< HEAD
=======
navigator.permissions.query({name: 'camera'})
.then((permissionObj) => {
 console.log(permissionObj.state);
})
.catch((error) => {
 console.log('Got error :', error);
});
>>>>>>> 0ebad2fad0a4e7d6aa50eb03e7dad837eba54b15

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: "#3aa757" }, function () {
    console.log("The color is green.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
<<<<<<< HEAD
=======

>>>>>>> 0ebad2fad0a4e7d6aa50eb03e7dad837eba54b15
