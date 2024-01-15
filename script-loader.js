document.addEventListener("DOMContentLoaded", function() {
    const scriptToggles = document.querySelectorAll("[id^='item-']");

    scriptToggles.forEach(script => {
        if (script.checked) {
            // Load script
        }
    });

});

function loadScript(script) {
    
}