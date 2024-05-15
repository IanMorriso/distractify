chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.greeting === "hello") {
        sendResponse({ farewell: "goodbye" });
    }
});

chrome.webNavigation.onCompleted.addListener(async () => {
    console.log('onCompleted');
    let blacklistURLS;
    // Retrieves the user-defined URLs from storage
    await chrome.storage.sync.get("blacklistURLS", async function(data) {
        blacklistURLS = data.blacklistURLS || [];
        await console.log("Retrieved blacklistURLS:", blacklistURLS);
    });
    chrome.runtime.sendMessage({ greeting: "hello" }, (response) => {
        console.log(response);
    });
});


let registered = null;

async function registerScript(message) {

  let hosts = message.hosts;
  let code = message.code;

  if (registered) {
    registered.unregister();
  }

  registered = await browser.contentScripts.register({
    matches: hosts,
    js: [{code}],
    runAt: "document_idle"
  });

}

chrome.runtime.onMessage.addListener(registerScript);
  