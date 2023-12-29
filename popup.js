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

            // Prints each URL to terminal for easy debugging
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



});

