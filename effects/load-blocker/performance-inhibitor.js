//setTimeout(handlePageChange, 8000);

function handlePageChange() {


  }
  
  // Introduce a delay after the DOMContentLoaded event
  document.addEventListener('DOMContentLoaded', function() {

    setTimeout(function() {
      handlePageChange();
    }, 8000);
  });
  
// Create a MutationObserver
  const observer = new MutationObserver(function() {

    setTimeout(function() {
      handlePageChange();
    }, 8000);
  });
  

  const observerConfig = {
    childList: true,  
    subtree: true     
  };
  
  // Start observing changes in the DOM
  observer.observe(document.body, observerConfig);