//import { effects } from "./effects.js";
import { createWebsite } from "./website-factory.js";
import { effectsBackground as effects } from "./effects.js";

createWebsiteContainer().catch(console.error);

createForm().catch(console.error);

createMasterToggle().catch(console.error);

createNewWebsiteListeners().catch(console.error);

async function initializeMasterDelete(websites) {
    const masterDeleteButton = document.getElementById('master-delete-button');

    // When the master delete button is pressed
    masterDeleteButton.addEventListener('click', async () => {
        console.log("master delete pressed");
        let websites = await getWebsites();
        let checkboxes = document.querySelectorAll('.websites:checked');
        let indexesToDelete = Array.from(checkboxes, checkbox => parseInt(checkbox.id.replace('website-', '')));
        console.log(indexesToDelete);

        indexesToDelete.sort((a, b) => b - a); // Sort in descending order
        indexesToDelete.forEach(index => {
            websites.splice(index, 1);
        });

        await saveWebsites(websites);
        createWebsiteContainer().catch(console.error);
    });
}


async function createWebsiteContainer() {

    getWebsites().then(websites => {
        console.log(websites);
        // Select the container where you want to append the websites
        let container = document.getElementById('container-websites');

        // Clears container of stale websites
        container.innerHTML = '';

        websites.forEach((website, index) => {
            let div = document.createElement('div');
            let input = document.createElement('input');
            let label = document.createElement('label');
            let span = document.createElement('span');
            let button = document.createElement('button');
            // Add individual delete buttons for each website

            input.type = 'checkbox';
            input.id = `website-${index}`;
            input.className = "websites";
            span.textContent = website.name;    // Displays the name of the website

            button.textContent = "Delete";
            button.className = "delete-button";

            button.addEventListener('click', async () => {
                websites.splice(index, 1);
                await saveWebsites(websites);
                createWebsiteContainer().catch(console.error);
            });

            label.appendChild(input);
            label.appendChild(span);
            div.appendChild(label);
            div.appendChild(button);
            container.appendChild(div);
        });
        initializeMasterDelete(websites).catch(console.error);
    }).catch(console.error);
    
}

/**
 * Creates a form element to hold names and toggles for the extension's effects.
 * It sets toggles to checked or unchecked based on last session state
 * 
 * @see popup.html
 * @see main.css
 */
async function createForm() {

    // Gets the Set of active effects from last session
    const { activeEffects = effects.map(effect => effect.name) } =
        await chrome.storage.sync.get('activeEffects');
    const checked = new Set(activeEffects);

    // Creates the effect form
    const form = document.getElementById('container-items');
    for (const { name } of effects) {
        // Each effect has its own div
        const div = document.createElement('div');
        div.className = "container-effects";

        const span = document.createElement('span');
        span.textContent = name;

        const label = document.createElement('label');
        label.className = "switch";

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = checked.has(name);
        checkbox.name = name;
        checkbox.className = "toggle";
        checkbox.id = `item-${name}`;

        checkbox.addEventListener('click', (event) => {
          handleToggleClick(event).catch(console.error);
        });

    const sliderSpan = document.createElement('span');
    sliderSpan.className = "slider round";

    // Adds form and it's elements to popup.html
    label.appendChild(checkbox);
    label.appendChild(sliderSpan);
    div.appendChild(span);
    div.appendChild(label);
    form.appendChild(div);
    }
}

/**
 * This function is responsible for handling click events on our effect toggles.
 * The event is processed by:
 * <ul>
 *      <li> getting new values for the effect from the event </li>
 *      <li> generating a Set of all effects </li>
 *      <li> adding/deleting effects from the set based on "checked" attribute for an effect's associated toggle</li>
 *      <li> sets 'activeEffects' in chrome storage to updated active effects</li>
 * </ul>
 * 
 * @param {*} event the event object that triggered the checkbox
 */
async function handleToggleClick(event) {
    console.log("Toggle toggled");
    const checkbox = event.target;
    const key = checkbox.name;
    const enabled = checkbox.checked;
  
    // activeEffects is set to the current list of active effects
    const { activeEffects = effects.map(effect => effect.name) } =
        await chrome.storage.sync.get('activeEffects');
    const keySet = new Set(activeEffects);
    
    // keySet is updated to the new Set of active effects
    if (enabled) keySet.add(key);
    else keySet.delete(key);
  
    // Store new set of active effects in chrome storage
    await chrome.storage.sync.set({ activeEffects: [...keySet] });
}
async function handleCheckboxClick(event) {
    const checked = event.target;
}

/**
 * This function adds event listeners to the "add" buttton and "enter" key events.
 * These events trigger the adding of "blacklisted" URLS for the extension's effects to target
 */
async function createNewWebsiteListeners() {
    // Event listener for button click
    document.getElementById("button1").addEventListener("click", addItemToList);

    // Event listener for 'enter' keypress
    document.getElementById("itemForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents the default form submission behavior
        addItemToList();
    });
}

/**
 * This function creates a Master Toggle slider to affect all the effect toggles.
 * debounceTimeout is needed to assist in asyncronous transitions, else toggles can trigger
 * more than once
 */
async function createMasterToggle() {
    // Master-Toggle control
    let debounceTimeout;    // Needed as event listener triggered twice on a single click
    const masterToggle = document.getElementById("master-toggle");
    masterToggle.addEventListener("click", function (event) { 
        console.log(masterToggle.checked);
        event.stopPropagation();
        clearTimeout(debounceTimeout);

        // Handles master toggle click asynchronously with a 2 second timeout
        debounceTimeout = setTimeout(async function() {
            const toggles = document.querySelectorAll(".toggle");

            for (const toggle of toggles) {
                // Sets each toggle to the state of the master toggle
                toggle.checked = masterToggle.checked;
            }

            if (masterToggle.checked) {
                // Master toggle is active, set activeEffects to hold all effects
                const keys = effects.map(effect => effect.name)
                await chrome.storage.sync.set({ activeEffects: [...keys]});
            } else {
                // Master toggle is not active, set activeEffects to empty array
                await chrome.storage.sync.set({ activeEffects: []});
            }
        }, 200);
    });
}

/**
 * This function is responsible for adding a new item to the list of blacklisted websites.
 */
async function addItemToList() {
    var new_item = document.getElementById("newItem").value;
    var new_website = createWebsite(new_item);

    document.getElementById("newItem").value = ""; // Clears form element
    
    getWebsites().then(websites => {
        console.log(websites);
        
        websites.push(new_website);
        saveWebsites(websites);

        createWebsiteContainer().catch(console.error);

    }).catch(error => {
        console.error(error);
    });
}

/**
 * 
 * @returns {Promise} a promise that resolves to the user-defined URLs
 */
async function getWebsites() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get("blacklistURLS", function(data) {
            if (chrome.runtime.lastError) {
                console.log("hit");
                reject(chrome.runtime.lastError);
            } else {
                resolve(data.blacklistURLS || []);
            }
        });
    });
}

/**
 * 
 * @param {Array[Website]} blacklistURLS 
 */
async function saveWebsites(blacklistURLS) {
    chrome.storage.sync.set({ blacklistURLS: blacklistURLS }, function() {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
            console.log("User-defined URLs saved successfully");
        }
    });
}