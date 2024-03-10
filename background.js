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

// adds new sites that have been added from the UI
chrome.storage.onChanged.addListener((changes, namespace) => {
    
    sites.forEach(site => {
        console.log(site);
        sites.add(site)
    })

    effects.forEach(effect => {
        console.log(effect);
        effects.add(effect)
    })
  });

// adds the existing blacklisted sites and effects to the current context
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    getStoredData('blacklistURLS', (storedData) => {
        // Use your stored data here
        if (storedData !== undefined) {
            storedData.forEach(site => {
                sites.add(site)
            })
        }
    });
    getStoredData('effects', (storedData) => {
        // Use your stored data here
        if (storedData !== undefined) {
            storedData.forEach(effect => {
                effects.add(effect)
            })
        }
    });
});

// adds an effect to the matching tab if it is in the blacklisted sites
chrome.webNavigation.onCompleted.addListener((details) => {
    const sites = new Set()
    sites.add('wikipedia')
    getStoredData('blacklistURLS', (storedData) => {
        // Use your stored data here
        if (storedData !== undefined) {
            storedData.forEach(site => {
                sites.add(site)
            })
        }
    });
    const effects = new Set()
    // effects.add({id: '1', name: 'Word Scramble'})
    effects.add({id: '2', name: 'Bouncing Ball'})
    sites.forEach(site => {
        if (details.url.includes(site)) {
            if (details.tabId) {
                // loop over effects
                effects.forEach(effect => {
                    // check if effect is in the current effect set
                    if (effects.has(effect)) {
                        chrome.scripting.executeScript({
                            target: { tabId: details.tabId },
                            files: [effectFiles[effect.id].path]
                        })
                    }
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