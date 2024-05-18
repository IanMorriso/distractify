// get the all of the js file pathes from the effects folders
// TODO: make this and the popup.js file more modular
const effectFiles = {
    '0': {
        name: "Obscurify",
        path: "effects/obscurify/obscurify.js"
    },
    '1': {
        name: "Word Scramble",
        path: "effects/wordScramble/wordScramble.js"
    },
    '2': {
        name: "Load Blocker",
        path: "effects/load-blocker/load-blocker.js"
    },
    '3': {
        name: "Scroller",
        path: "effects/scroller/scroller.js"
    },
    '4': {
        name: "Bouncing Ball",
        path: "effects/bouncingBall/bouncingBall.js"
    },
}

/** adds an effect to the matching tab if it is in the blacklisted sites
 * @param details - callback function that is called when the navigation is completed
 *                  Contains the tabId and the url of the page that was navigated to
 */
chrome.webNavigation.onCompleted.addListener(async (details) => {
    console.log("NAVIGATED");
    const sites = new Set()
    const effects = new Set();

    try {
        const blacklistURLs = await getStoredDataAsync('blacklistURLS');
        if (blacklistURLs) {
            blacklistURLs.forEach(site => sites.add(site));
        }

        const activeEffects = await getStoredDataAsync('activeEffects');
        if (activeEffects) {
            activeEffects.forEach(effect => effects.add(effect));
        }

        sites.forEach(site => {
            if (details.url.includes(site)) {
                if (details.tabId) {
                    // loop over effects
                    effects.forEach(effect => {
                        // check if effect is in the current effect set
    
                        chrome.scripting.executeScript({
                            target: { tabId: details.tabId },
                            files: [effectFiles[effect].path]
                        })
                    })
                }
            }
        })
    } catch (error) {
        console.error('Error getting stored data:', error);
    }
});

// adds new sites that have been added from the UI
chrome.storage.onChanged.addListener((changes, namespace) => {
    console.log("STORAGE CHANGED")
    console.log(changes);
    const effects = new Set();
    const sites = new Set();
    getStoredData('blacklistURLS', (storedData) => {
        // Use your stored data here
        if (storedData !== undefined) {
            storedData.forEach(site => {
                sites.add(site)
            })
        }
    });

    getStoredData('activeEffects', (storedData) => {
        // Use your stored data here
        if (storedData !== undefined) {
            console.log(typeof storedData);
            
            storedData.forEach(effect => {
                effects.add(effect);
            })    
        }
    });
    sites.forEach(site => {
        if (details.url.includes(site)) {
            if (details.tabId) {
                // loop over effects
                effects.forEach(effect => {
                    // check if effect is in the current effect set

                    chrome.scripting.executeScript({
                        target: { tabId: details.tabId },
                        files: [effectFiles[effect].path]
                    })
                })
            }
        }
    })
});

// 
/**
 * gets the data of the matching key
 * @param {*} key 
 * @param {*} callback 
 * @deprecated
 */
function getStoredData(key, callback) {
    chrome.storage.sync.get(key, (result) => {
        if (chrome.runtime.lastError) {
            console.error(`Error fetching data: ${chrome.runtime.lastError}`);
            return;
        }
        console.log(`Fetching data: ${result}, ${result[key]}`);
        callback(result[key]);
    });
}

/**
 * Async gets the data of the matching key
 * @param the key to match the stored data 
 * @returns a promise that resolves to the stored data
 */
function getStoredDataAsync(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(key, (result) => {
            if (chrome.runtime.lastError) {
                reject(`Error fetching data: ${chrome.runtime.lastError}`);
            } else {
                resolve(result[key]);
            }
        });
    });
}
