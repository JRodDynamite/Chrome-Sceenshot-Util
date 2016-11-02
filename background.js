function handleButtonClick(){
//  alert("hi");
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {action: "sendMainPageDOM"}, function(response) {
        console.log(chrome.runtime.lastError);
        response.farewell=response.farewell.replace(/\n/g,"");
        console.log('true response'+JSON.stringify(response));
        //console.log(response.farewell);
        //var doc = document.implementation.createHTMLDocument("example");
        //doc.documentElement.innerHTML = response.farewell;
        //  console.log('createdDoc response'+(doc.body));
      //  console.log('JSON text'+doc.body);
        html2canvas(response.farewell  , {
          useCORS: true,
          	allowTaint: true,
            logging:true,
          // proxy: 'http://localhost/',
          onrendered: function(canvas) {
            console.log('On rendered called');
            var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
            console.log(image);
            chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
            chrome.tabs.update(tab.id, {url: image});
            });

          }
        });


    });
  });

};



document.getElementById("myButton").addEventListener("click",handleButtonClick);
