let stopButton = document.querySelector("#stop")
let continueButton = document.querySelector("#continue")


stopButton.addEventListener('click',() => {
    chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,'stop');
    });
})

continueButton.addEventListener('click', () => {
    chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,'continue');
    });
})