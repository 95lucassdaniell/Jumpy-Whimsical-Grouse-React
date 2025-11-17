# Minha T-Shirt - Full-Stack Lead Capture Platform

## Overview

This is a full-stack React + Node.js application for "Minha T-Shirt," a wholesale t-shirt business targeting Brazilian women entrepreneurs. The platform combines a marketing landing page with a complete lead capture system, including contact form validation, PostgreSQL database storage, and an administrative dashboard for lead management and analytics.

**Migration Status**: Successfully migrated from Vercel to Replit on November 16, 2025. Backend API added on November 17, 2025 with complete lead management system.

## Recent Changes

**November 17, 2025 - Lead Capture System**
- **Backend Infrastructure**: Added Node.js/Express server with PostgreSQL + Prisma ORM
- **Contact Form**: Implemented validated lead capture form (React Hook Form + Yup) in #contato section
- **Admin Dashboard**: Created `/admin` route with authentication and comprehensive analytics
- **Database Schema**: Created tables for leads (name, email, phone, UTM tracking), visits (session tracking), and admins
- **APIs**: POST /api/leads, GET /api/leads (with CSV export), GET /api/analytics/summary, auth endpoints
- **Analytics**: Automatic visit tracking integrated with GTM, conversion rate calculations
- **Security**: bcrypt password hashing, session-based authentication, protected admin routes
- **WhatsApp Integration**: Form submission unlocks WhatsApp button with personalized message
- **Admin Features**: Paginated lead table, CSV export, real-time metrics (visits, leads, conversions)
- **Deployment**: Configured concurrently to run frontend (5000) and backend (3001) together

**November 17, 2025 - Design Updates**
- Updated primary branding color to #ec56b5 (vibrant pink)
- Replaced text logo with colorful Minha T-Shirt logo image in navigation
- Enhanced team section: increased team photo to 140px with better styling
- Updated page title to "Minha T-Shirt - Atacado" with pt-BR language attribute
- Unified all CTA buttons to scroll to contact section (#contato) for conversion optimization
- Implemented Google Tag Manager tracking (GTM-P3RGJRKK) for analytics
- Fixed mobile hero image positioning and section spacing optimizations

## User Preferences

Preferred communication style: Simple, everyday language.
Branding: Primary color #ec56b5 (vibrant pink)

## Admin Access

**Login URL**: `/admin`
**Credentials**:
- Username: `admin`
- Password: `lucaslol321`

## Database Schema

**Leads Table**: Stores contact form submissions
- id, name, email, phone, createdAt
- UTM tracking: utmSource, utmMedium, utmCampaign
- whatsappClickedAt: Timestamp when user clicked WhatsApp button

**Visits Table**: Tracks page visits for analytics
- id, visitedAt, sessionId, ipHash, page
- UTM tracking and referrer information

**Admins Table**: Admin user authentication
- id, username, password (bcrypt hashed)

## System Architecture

### Frontend Architecture

**Framework & Rendering**
- **React 17.0.2** with React DOM for client-side rendering
- Single-page application (SPA) pattern with client-side routing
- No server-side rendering or static site generation
- Traditional Create React App foundation with CRACO customizations

**Routing Strategy**
- **React Router DOM 5.2.0** for client-side navigation
- Route structure:
  - `/` - Home page (primary landing page with contact form)
  - `/admin` - Protected admin dashboard (requires authentication)
  - `**` - Catch-all route redirecting to NotFound component
- Browser-based routing (BrowserRouter) for clean URLs without hash fragments

**Build System & Configuration**
- **CRACO (Create React App Configuration Override) 7.1.0** to customize CRA without ejecting
- Custom webpack configuration for CSS URL handling (disabled)
- Development server configured for Replit environment:
  - Host: `0.0.0.0` (accessible from external connections)
  - Port: `5000`
  - WebSocket URL: Auto-configured for hot module replacement (`auto://0.0.0.0:0/ws`)
  - Allowed hosts: `all` (permissive for cloud IDE environments)
- Deployment: Uses `serve` package to serve static build files on port 5000 (autoscale deployment target)

**Component Architecture**
- Functional components using React hooks pattern
- Component organization:
  - `/src/components/` - Reusable UI components (Navigation, Footer)
  - `/src/views/` - Page-level components (Home, NotFound)
- Co-located CSS files (component-name.css) for component-specific styles

**Styling Approach**
- CSS custom properties (CSS variables) for design tokens
- Global design system defined in `/src/style.css`:
  - Spacing scale (xs to 4xl)
  - Color palette (primary: #ec56b5, secondary: #053668, accent: #ff6b35)
  - Typography scale and font families
  - Border radius values
  - Shadow levels
  - Responsive section gaps using clamp()
- Component-scoped CSS with BEM-like naming conventions
- External font imports from Google Fonts (Inter, Noto Sans, STIX Two Text)
- Animation library: Animate.css 4.1.1 (CDN)

**Accessibility Features**
- Semantic HTML5 elements (nav, section, footer)
- ARIA labels and landmark roles
- Prefers-reduced-motion media query support for animation control
- Proper heading hierarchy

**HTML Rendering**
- `dangerous-html` package for controlled HTML injection in React components
- React Helmet for document head management (meta tags, titles, canonical URLs)

**Content Strategy**
- Portuguese language content (Brazilian Portuguese based on text samples)
- Business focus: Women's entrepreneurship and financial independence
- Brand messaging: "53 mil mulheres" (53,000 women) social proof

### External Dependencies

**Package Management**
- npm with package-lock.json (lockfileVersion 3)
- Node.js version requirement: >=18.x

**Core Runtime Dependencies**
- React & React DOM (17.0.2)
- React Router DOM (5.2.0) - Client-side routing
- React Helmet (6.1.0) - Document head management
- dangerous-html (0.1.13) - Controlled HTML injection
- @craco/craco (7.1.0) - Build configuration override

**Development Dependencies**
- react-scripts (5.0.1) - Build tooling from Create React App

**Migration Notes (November 16, 2025)**
- Removed incorrect Next.js dependency that was mistakenly included
- Configured CRACO dev server for Replit compatibility (0.0.0.0:5000)
- Added comprehensive .gitignore for Node.js projects
- Set up deployment configuration for production builds

**CDN Resources**
- Google Fonts API (Inter, Noto Sans, STIX Two Text)
- Animate.css (4.1.1) from unpkg CDN

**Browser Compatibility**
- Production: Modern browsers (>0.2% usage, excluding dead browsers and Opera Mini)
- Development: Latest versions of Chrome, Firefox, and Safari

**Internationalization**
- `/locales/en.json` placeholder exists but is empty
- Application content is hardcoded in Portuguese
- No active i18n library implementation

**Hosting Environment Assumptions**
- Configured for Replit cloud IDE deployment
- WebSocket support for development hot reload
- Static file serving for production build

**No Backend Services**
- Pure client-side application
- No API integrations
- No authentication or authorization mechanisms
- No database connections
- No state management libraries (Redux, MobX, etc.)
