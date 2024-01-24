chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.greeting === "hello") {
        sendResponse({ farewell: "goodbye" });
    }
});

chrome.webNavigation.onCompleted.addListener(async () => {
    console.log('onCompleted');
    chrome.runtime.sendMessage({ greeting: "hello" }, (response) => {
        console.log(response);
    });
});

  