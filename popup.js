import Semaphore from "./semaphore.js";

// After popup loads, add event listeners for form submissions
document.addEventListener("DOMContentLoaded", function(){


    // Retrieves the user-defined URLs from storage
    //chrome.storage.sync.get("blacklistURLS", function(data) {
    //    blacklistURLS = data.blacklistURLS || [];
    //    console.log("Retrieved blacklistURLS:", blacklistURLS);
    //});


    function addItemToList() {
        var new_item = document.getElementById("newItem").value;
        let blacklistURLS;
        document.getElementById("newItem").value = ""; // Clears form element
        
        // Retrieves the user-defined URLs from storage
        chrome.storage.sync.get("blacklistURLS", function(data) {
            blacklistURLS = data.blacklistURLS || [];
            console.log("Retrieved blacklistURLS:", blacklistURLS);
            blacklistURLS.push(new_item);

            // Prints each URL to terminal
            blacklistURLS.forEach(function(url) {console.log(url)});
        
            // Saves the user-defined URLs to storage
            chrome.storage.sync.set({ blacklistURLS: blacklistURLS }, function() {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            } else {
                console.log("User-defined URLs saved successfully");
            }
            });
        });
    }

    
    // Event listener for button click
    document.getElementById("button1").addEventListener("click", addItemToList);
    
    // Event listener for 'enter' keypress
    document.getElementById("itemForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents the default form submission behavior
        addItemToList();
    });

    
    // temp list of effects
    const effects = [
        { id: 1, name: "Obscure", active: false},
        { id: 2, name: "Word Scramble", active: false},
        { id: 3, name: "Load Blocker", active: false},
        { id: 4, name: "Scroller", active: false},
        { id: 5, name: "Bouncing Ball", active: false},
    ];
    const itemsContainer = document.getElementById("container-items");

    // Creates a new div with a toggle switch for each effect
    effects.forEach(effect => {
        const toggleContainer = document.createElement("div");
        toggleContainer.classList.add("container-effects");
        toggleContainer.innerHTML = `
        <span>${effect.name}</span>
        <label class="switch">
            <input class="toggle" type="checkbox" id="item-${effect.name}">
            <span class="slider round"></span>
        </label>
        `;
        itemsContainer.appendChild(toggleContainer);
    });


    // Master-Toggle control
    let debounceTimeout;    // Needed as event listener triggered twice on a single click
    //const debouncedMasterToggleHandler = debounce(masterToggleHandler, 200);
    const masterToggle = document.getElementById("master-toggle");
    /*masterToggle.addEventListener("click", function(event) {
        event.stopPropagation();
        debouncedMasterToggleHandler();
    });*/
    masterToggle.addEventListener("click", function (event) { 
        console.log(masterToggle.checked);
        event.stopPropagation();
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(function() {
            const toggles = document.querySelectorAll("[id^='item-']");
            toggles.forEach(toggle => {
                const changeEvent = new Event("change", { bubbles: true });
                if (masterToggle.checked && !toggle.checked) {
                    toggle.checked = true;
                    toggle.dispatchEvent(changeEvent);      // Manual triggering of event change due to setTimeout interferance
                } else if (!masterToggle.checked && toggle.checked) {
                    toggle.checked = false;
                    toggle.dispatchEvent(changeEvent);      // Manual triggering of event change due to setTimeout interferance
                };              
            });
        }, 200);
    });

    function masterToggleHandler() {
        const toggles = document.querySelectorAll("[id^='item-']");
        toggles.forEach(toggle => {
            const changeEvent = new Event("change", { bubbles: true });
            if (masterToggle.checked && !toggle.checked) {
                toggle.checked = true;
                toggle.dispatchEvent(changeEvent);
            } else if (!masterToggle.checked && toggle.checked) {
                toggle.checked = false;
                toggle.dispatchEvent(changeEvent);
            }
        });
    }

    chrome.storage.sync.get(null, function(items) {
        console.log(items);
    });
    const sem = new Semaphore(1);
    const toggles = document.querySelectorAll("[id^='item-']");
    toggles.forEach(function(toggle) {
        toggle.addEventListener("change", async function() {
            if (toggle.checked) {
                console.log(`${toggle.id} is checked`);

            } else {
                // Checkbox is unchecked
                console.log(`${toggle.id} is unchecked`);
            }

            await chrome.storage.sync.get('tests', function(result) {
                checkAndSetToggles('tests', result, toggle);
            });
            /*
            await chrome.storage.sync.get('tests', async function(result) {
                if ('tests' in result && result.tests !== undefined) {
                    var retrievedObjs = JSON.parse(result.tests);
                    var objtoedit = retrievedObjs.find(o => o.name == toggle.id.split('-')[1]);
                    objtoedit.active = toggle.checked;
                    
                    await chrome.storage.sync.set({'tests':JSON.stringify(retrievedObjs)}, function() {
                        console.log("ya did it");
                    });
                } else {
                    console.log(" 'tests' not found in chrome.storage.sync");
                }
              });*/

        });

    });

    chrome.runtime.sendMessage({ contentScriptLoaded: true });   
});

async function checkAndSetToggles(tests, result, toggle) {
    if ('tests' in result && result.tests !== undefined) {
        var retrievedObjs = JSON.parse(result.tests);
        var objtoedit = retrievedObjs.find(o => o.name == toggle.id.split('-')[1]);
        objtoedit.active = toggle.checked;
        await console.log(retrievedObjs);
        await chrome.storage.sync.set({'tests':JSON.stringify(retrievedObjs)}, function() {
            console.log("ya did it");
        });
    } else {
        console.log(" 'tests' not found in chrome.storage.sync");
    }
}
