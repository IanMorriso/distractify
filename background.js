import { effectsBackground as effects } from "./effects.js";

/** adds an effect to the matching tab if it is in the blacklisted sites
 * @param details - callback function that is called when the navigation is completed
 *                  Contains the tabId and the url of the page that was navigated to
 */
chrome.webNavigation.onCompleted.addListener(async (details) => {
    console.log("NAVIGATED");
    const sites = new Set()
    const effectsToProcess = new Set();

    try {
        const { blacklistURLS } = await getStoredDataAsync('blacklistURLS');
        if (blacklistURLS) {
            blacklistURLS.forEach(site => sites.add(site));
        }

        const { activeEffects } = await getStoredDataAsync('activeEffects');
        if (activeEffects) {
            activeEffects.forEach(effect => effectsToProcess.add(effect));
        }

        sites.forEach(site => {
            if (details.url.includes(site)) {
                if (details.tabId) {
                    // loop over effects
                    effectsToProcess.forEach(async effect => {
                        // check if effect is in the current effect set
                        const file = effects.find(e => e.name === effect).path;
                        await chrome.scripting.executeScript({
                            target: { tabId: details.tabId },
                            files: [file]
                        })
                        const messageToScript = {
                            action: 'start',
                            effect: effects.find(e => e.name === effect).name
                        };
                        console.log("sending message to script:", messageToScript);
                        chrome.tabs.sendMessage(details.tabId, messageToScript);
                    });
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
    const effectsToProcess = new Set();
    const sites = new Set();
    getStoredDataAsync('blacklistURLS', (storedData) => {
        // Use your stored data here
        if (storedData !== undefined) {
            storedData.forEach(site => {
                sites.add(site)
            })
        }
    });

    getStoredDataAsync('activeEffects', (storedData) => {
        // Use your stored data here
        if (storedData !== undefined) {
            console.log(typeof storedData);
            
            storedData.forEach(effect => {
                effectsToProcess.add(effect);
            })    
        }
    });
    sites.forEach(site => {
        if (details.url.includes(site)) {
            if (details.tabId) {
                // loop over effects
                effectsToProcess.forEach(effect => {
                    // check if effect is in the current effect set

                    chrome.scripting.executeScript({
                        target: { tabId: details.tabId },
                        files: [effects[effect].path]
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
        console.log(`Fetching data: ${result.toString()}`);
        callback(result);
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
                console.log(`Fetching data`);
                console.dir(result);
                resolve(result);
            }
        });
    });
}
