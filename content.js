chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if (request.action == "sendMainPageDOM")
      sendResponse({farewell: document.body.innerHTML});
      return true;
  });
