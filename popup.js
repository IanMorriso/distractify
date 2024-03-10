import Semaphore from "./semaphore.js";
import { effects } from "./effects.js";
// After popup loads, add event listeners for form submissions
//chrome.storage.sync.clear();

createForm().catch(console.error);

createMasterToggle().catch(console.error);

async function createForm() {
    const { activeEffects = Object.keys(effects) } =
        await chrome.storage.sync.get('activeEffects');
    const checked = new Set(activeEffects);

    const form = document.getElementById('container-items');
    for (const [key, name] of Object.entries(effects)) {
        const div = document.createElement('div');
        div.className = "container-effects";

        const span = document.createElement('span');
        span.textContent = name;

        const label = document.createElement('label');
        label.className = "switch";

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = checked.has(key);
        checkbox.name = key;
        checkbox.className = "toggle";
        checkbox.id = `item-${name}`;

        checkbox.addEventListener('click', (event) => {
          handleCheckboxClick(event).catch(console.error);
        });
    
    const sliderSpan = document.createElement('span');
    sliderSpan.className = "slider round";

    label.appendChild(checkbox);
    label.appendChild(sliderSpan);
    div.appendChild(span);
    div.appendChild(label);
    form.appendChild(div);
    }
}

async function handleCheckboxClick(event) {
    const checkbox = event.target;
    const key = checkbox.name;
    const enabled = checkbox.checked;
  
    const { activeEffects = Object.keys(effects) } =
      await chrome.storage.sync.get('activeEffects');
    const keySet = new Set(activeEffects);
  
    if (enabled) keySet.add(key);
    else keySet.delete(key);
  
    await chrome.storage.sync.set({ activeEffects: [...keySet] });
}


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


async function createMasterToggle() {
    // Master-Toggle control
    let debounceTimeout;    // Needed as event listener triggered twice on a single click
    const masterToggle = document.getElementById("master-toggle");
    masterToggle.addEventListener("click", function (event) { 
        console.log(masterToggle.checked);
        event.stopPropagation();
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(async function() {
            const toggles = document.querySelectorAll(".toggle");
            const storageData = {};

            for (const toggle of toggles) {
                toggle.checked = masterToggle.checked;
            }

            if (masterToggle.checked) {
                const keys = Object.keys(effects);
                await chrome.storage.sync.set({ activeEffects: [...keys]});
            } else {
                await chrome.storage.sync.set({ activeEffects: []});
            }
        }, 200);
    });
}