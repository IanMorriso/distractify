// mirrors the data we get from chrome.sync for the sites
const sites = new Set()

// adds new sites that have been added from the UI
chrome.storage.onChanged.addListener((changes, namespace) => {
    // for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    //     sites.add(newValue)
    //     console.log(
    //         `Storage key "${key}" in namespace "${namespace}" changed.`,
    //         `Old value was "${oldValue}", new value is "${newValue}".`
    //     );
    // }
    // console.log("hello these are the sites from storage listener: ");
    sites.forEach(site => {
        console.log(site);
        sites.add(site)
    })
  });

  // adds the existing blacklisted sites to the current context
  chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    getStoredData('blacklistURLS', (storedData) => {
        // console.log("About to navigate to a website");
        // console.log(details);
        
        // Use your stored data here
        // console.log("Stored data:", storedData);
        storedData.forEach(site => {
            sites.add(site)
        })
    });
  })

// adds an effect to the matching tab if it is in the blacklisted sites
chrome.webNavigation.onCompleted.addListener((details) => {
    // console.log("navigated to a website")
    // console.log(details);
    // console.log("hello these are the sites from webNav listener: ");
    // console.log(sites)
    sites.forEach(site => {
        if (details.url.includes(site)) {
            if (details.tabId) {
                chrome.scripting.executeScript({
                    target: { tabId: details.tabId },
                    files: ["effects/bouncingBall/bouncingBall.js"]
                })
            }
        }
    })
    
})

// gets the data of the matching key
function getStoredData(key, callback) {
    chrome.storage.sync.get(key, (result) => {
        if (chrome.runtime.lastError) {
            console.error(`Error fetching data: ${chrome.runtime.lastError}`);
            return;
        }
        callback(result[key]);
    });
}
