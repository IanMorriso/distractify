// get the all of the js file pathes from the effects folders
const effectFiles = {
    '1': {
        name: "Word Scramble",
        path: "effects/wordScramble/wordScramble.js"
    },
    '2': {
        name: "Bouncing Ball",
        path: "effects/bouncingBall/bouncingBall.js"
    },
    '3': {
        name: "Load Blocker",
        path: "effects/load-blocker/load-blocker.js"
    },
    '4': {
        name: "Obscurify",
        path: "effects/obscurify/obscurify.js"
    },
}

// adds an effect to the matching tab if it is in the blacklisted sites
chrome.webNavigation.onCompleted.addListener((details) => {
    console.log("NAVIGATED");
    const sites = new Set()
    const effects = new Set();
    sites.add('wikipedia')
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
    // effects.add({id: '1', name: 'Word Scramble'})
    //effects.add({id: '2', name: 'Bouncing Ball'})
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
})

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

// adds the existing blacklisted sites and effects to the current context
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
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
            if (typeof storedData === 'string') {
                try {
                    storedData = JSON.parse(storedData)
                    storedData.forEach(effect => {
                        effects.add(effect);
                    })
                } catch (error) {
                    console.error("Error parsing JSON!: ", error);
                    return;
                }
            }    
        }
    });
});


    


// gets the data of the matching key
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

async function fetchData(key) {
    try {
        const data = await getStoredDataAsync(key);
        // check if object is undefined
        if (data === undefined) {
            throw new Error('No data found');
        }
        
        console.log('Data fetched successfully:', data);
        // Process data...
    } catch (error) {
        console.error('Error getting stored data:', error);
        throw new Error('catch above error');
    }
}
