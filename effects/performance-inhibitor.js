//setTimeout(handlePageChange, 8000);

function handlePageChange() {
    //alert('GitHub page changed!');
    // Add your logic to handle the page change here
  }
  
  // Introduce a delay after the DOMContentLoaded event
  document.addEventListener('DOMContentLoaded', function() {
    // Adjust the delay time as needed
    setTimeout(function() {
      // Call the function to handle the page change after the delay
      handlePageChange();
    }, 8000);
  });
  
  // Create a MutationObserver
  const observer = new MutationObserver(function() {
    // Trigger the delayed logic when a mutation is observed
    setTimeout(function() {
      handlePageChange();
    }, 8000);
  });
  
  // Define the configuration for the observer
  const observerConfig = {
    childList: true,  // Watch for changes in the child nodes of the target
    subtree: true     // Watch for changes in the entire subtree, not just direct children
  };
  
  // Start observing changes in the DOM
  observer.observe(document.body, observerConfig);