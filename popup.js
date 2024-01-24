// After popup loads, add event listeners for form submissions
document.addEventListener("DOMContentLoaded", function(){
    
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
        { id: 1, name: "Obscure"},
        { id: 2, name: "Word-Scramble"},
        { id: 3, name: "Load-Blocker"},
        { id: 4, name: "Scroller"},
        { id: 5, name: "Bouncing Ball"},
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
    const masterToggle = document.getElementById("master-toggle");
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

    //const toggles = document.querySelectorAll("[class='container-effects']");
    const toggles = document.querySelectorAll("[id^='item-']");
    toggles.forEach(function(toggle) {
        toggle.addEventListener("change", function() {
            if (toggle.checked) {
                console.log(`${toggle.id} is checked`);
            } else {
                // Checkbox is unchecked
                console.log(`${toggle.id} is unchecked`);
            }
            });
    });

    chrome.runtime.sendMessage({ contentScriptLoaded: true });


    
});

