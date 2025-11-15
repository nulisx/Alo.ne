# Alo.ne - Privacy Service Platform

## Overview
Alo.ne is a luxury privacy-based service platform that provides users with personalized bio-link services, image hosting, and email services. The application emphasizes safeguarding user information with style.

**Current State**: The application is fully extracted and running on port 5000.

## Recent Changes
- **November 15, 2025**: 
  - Extracted the Alo.ne application from the provided zip file
  - Installed Node.js 20 and http-server globally
  - Configured web server workflow to serve the static application on port 5000
  - Application is now accessible and running

## Project Architecture

### Technology Stack
- **Frontend Framework**: Vue.js (built/compiled)
- **Build Tool**: Vite (evidenced by the asset naming convention)
- **Web Server**: http-server (Node.js-based static file server)
- **Styling**: Custom CSS with dark theme

### Project Structure
```
/
├── assets/           # Compiled JavaScript and CSS files
│   ├── js/          # Core JavaScript files
│   ├── img/         # Images and logos
│   └── *.js/*.css   # Compiled Vue components and styles
├── bio/             # Bio link service pages
├── bio-socials/     # Social links management
├── dash/            # Dashboard pages
├── dashfiles/            # Dashboard files
├── file/            # File hosting service
├── imap/            # Email IMAP service
├── login/           # Login pages
├── loginselector/   # Login selector
├── mail/            # Email service pages
├── register/        # Registration pages
├── security/        # Security settings
├── store/           # Store/purchasing pages
└── index.html       # Main entry point
```

### Key Features
1. **Bio Link Service**: Personalized bio link pages for users
2. **File Hosting**: Image and file hosting capabilities
3. **Email Service**: IMAP-based email service
4. **User Authentication**: Login and registration system
5. **Dashboard**: User dashboard for managing services
6. **Security Settings**: Privacy and security management

### Current Workflow
- **Name**: web-server
- **Command**: `http-server -p 5000 -a 0.0.0.0 --cors -c-1`
- **Port**: 5000
- **Type**: Static file server with CORS enabled and cache disabled

## Known Issues
- Minor JavaScript error related to missing `sellembed.js` file (non-critical, doesn't affect main functionality)
- Some event listeners attempting to attach to null elements (likely related to missing optional features)

## Development Notes
- The application is a pre-built Vue.js SPA (Single Page Application)
- All source files are compiled/minified
- Cache is disabled (`-c-1`) to ensure fresh content delivery
- CORS is enabled for cross-origin requests
- Server binds to `0.0.0.0` to allow external access
