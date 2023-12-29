// After popup loads, add event listeners for form submissions
document.addEventListener("DOMContentLoaded", function(){
    function addItemToList() {
        var new_item = document.getElementById("newItem").value;
        // test
        console.log(new_item);
        document.getElementById("newItem").value = ""; // Clears form element
    }

    /**
     * Storage logic goes here
     * browser.storage.sync.set()
     */
    
    // Event listener for button click
    document.getElementById("button1").addEventListener("click", addItemToList);
    
    // Event listener for 'enter' keypress
    document.getElementById("itemForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents the default form submission behavior
        addItemToList();
    });
});

