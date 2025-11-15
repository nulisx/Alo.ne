/**
 * Alo.ne Error Fixes
 * Targeted fixes for missing DOM elements referenced by compiled Vue components
 */

(function() {
  'use strict';

  // Create missing DOM elements before Vue app mounts
  // This must happen early in the page load cycle
  function createMissingElements() {
    // HomeView expects an email check form
    if (!document.getElementById('email-check-form')) {
      const form = document.createElement('form');
      form.id = 'email-check-form';
      form.style.display = 'none';
      form.addEventListener('submit', function(e) {
        e.preventDefault();
      });
      document.body.appendChild(form);
      console.info('[Error Fix] Created missing element: email-check-form');
    }

    // Create other commonly referenced elements
    const missingIds = [
      'sell-embed-container',
      'sellembed',
      'notification-container',
      'modal-container'
    ];

    missingIds.forEach(function(id) {
      if (!document.getElementById(id)) {
        const div = document.createElement('div');
        div.id = id;
        div.style.display = 'none';
        document.body.appendChild(div);
      }
    });
  }

  // Run immediately if DOM is already loaded, otherwise wait
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createMissingElements);
  } else {
    createMissingElements();
  }

  // Gracefully handle missing script load errors
  window.addEventListener('error', function(event) {
    if (event.message && event.message.includes('Script load error')) {
      console.info('[Error Fix] Optional script not loaded:', event.filename || event.message);
      event.preventDefault();
      return true;
    }
  }, true);

  // Handle unhandled promise rejections from script loading
  window.addEventListener('unhandledrejection', function(event) {
    if (event.reason && event.reason.message && 
        event.reason.message.includes('Script load error')) {
      console.info('[Error Fix] Optional script promise rejected');
      event.preventDefault();
    }
  });

})();
