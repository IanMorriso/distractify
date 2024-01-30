// get information from chrome.sync
const sites = new Set()

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        sites.add(newValue)
        console.log(
            `Storage key "${key}" in namespace "${namespace}" changed.`,
            `Old value was "${oldValue}", new value is "${newValue}".`
        );
    }
  });

chrome.webNavigation.onCompleted.addListener((details) => {
    console.log("navigated to a website")
    console.log(details);
    if (details.tabId) {
        chrome.scripting.executeScript({
            target: { tabId: details.tabId },
            files: ["effects/obscurify/obscurify.js"]
        })
    }
})