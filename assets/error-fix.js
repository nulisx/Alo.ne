/**
 * Alo.ne Error Fixes & Mock Authentication
 * Targeted fixes for missing DOM elements and default login credentials
 */

(function() {
  'use strict';

  // ============================================================================
  // MOCK AUTHENTICATION SYSTEM
  // Default credentials: username "im", password "ACK071675"
  // ============================================================================

  const DEFAULT_USERNAME = 'im';
  const DEFAULT_PASSWORD = 'ACK071675';

  // Generate mock JWT tokens
  function generateMockToken(username, expiresIn = 3600) {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };
    
    const payload = {
      username: username,
      nid: 'user_' + Math.random().toString(36).substr(2, 9),
      isModerator: false,
      isAdmin: false,
      isPremium: true,
      exp: Math.floor(Date.now() / 1000) + expiresIn,
      iat: Math.floor(Date.now() / 1000)
    };

    const signature = 'mock_signature_' + Math.random().toString(36).substr(2, 16);
    
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    
    return encodedHeader + '.' + encodedPayload + '.' + signature;
  }

  // Intercept fetch requests for authentication
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    const [url, options = {}] = args;
    
    // Check if this is a login request
    if (typeof url === 'string' && url.includes('/sign-in')) {
      return new Promise((resolve, reject) => {
        try {
          // Parse the request body
          const body = JSON.parse(options.body || '{}');
          const { username, password } = body;

          console.info('[Auth] Login attempt for username:', username);

          // Check if credentials match default account
          if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
            console.info('[Auth] ✓ Default account login successful');
            
            // Generate tokens
            const accessToken = generateMockToken(username, 3600); // 1 hour
            const refreshToken = generateMockToken(username, 86400 * 30); // 30 days

            // Return mock successful response
            const mockResponse = {
              ok: true,
              status: 200,
              statusText: 'OK',
              headers: new Headers({
                'Content-Type': 'application/json'
              }),
              json: async () => ({
                accessToken: accessToken,
                refreshToken: refreshToken,
                success: true
              }),
              text: async () => JSON.stringify({
                accessToken: accessToken,
                refreshToken: refreshToken,
                success: true
              })
            };

            resolve(mockResponse);
          } else {
            console.info('[Auth] ✗ Invalid credentials');
            
            // Return mock error response
            const errorResponse = {
              ok: false,
              status: 401,
              statusText: 'Unauthorized',
              headers: new Headers({
                'Content-Type': 'application/json'
              }),
              json: async () => ({
                error: 'Invalid credentials',
                message: 'Username or password is incorrect'
              }),
              text: async () => JSON.stringify({
                error: 'Invalid credentials',
                message: 'Username or password is incorrect'
              })
            };

            resolve(errorResponse);
          }
        } catch (error) {
          console.error('[Auth] Error processing login:', error);
          reject(error);
        }
      });
    }

    // For all other requests, use original fetch
    return originalFetch.apply(this, args);
  };

  // ============================================================================
  // MISSING DOM ELEMENTS FIX
  // ============================================================================

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

  // ============================================================================
  // ERROR HANDLING
  // ============================================================================

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

  console.info('[Alo.ne] Mock authentication system loaded. Default account: "im"');

})();
