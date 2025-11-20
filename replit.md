# Minha T-Shirt - Full-Stack Lead Capture Platform

## Overview

"Minha T-Shirt" is a full-stack React and Node.js application designed for a wholesale t-shirt business targeting Brazilian women entrepreneurs. Its core purpose is to serve as a comprehensive lead capture platform, integrating a marketing landing page with robust lead management functionalities. The platform features contact form validation, PostgreSQL database storage, an administrative dashboard for lead oversight and analytics, and sophisticated Facebook Ads tracking capabilities. The business vision is to empower women entrepreneurs, leveraging the platform to streamline lead generation, improve conversion rates, and provide valuable insights into marketing campaign performance.

## User Preferences

Preferred communication style: Simple, everyday language.
Branding: Primary color #ec56b5 (vibrant pink)

## System Architecture

### UI/UX Decisions
The platform features a modern, clean design with a vibrant pink (#ec56b5) as the primary branding color. The navigation is simplified, focusing on the brand logo and clear Call-to-Action (CTA) buttons. Key UI elements include floating label input fields with a minimal design, responsive layouts optimized for mobile (e.g., hero image overlay effect), and visual growth indicators in the admin dashboard. Accessibility is considered with semantic HTML5 and ARIA labels.

### Technical Implementations
The frontend is built with **React 17.0.2**, using functional components and hooks for state management. **React Router DOM 5.2.0** handles client-side navigation. Styling leverages CSS custom properties for a global design system, component-scoped CSS, and Animate.css for animations. **CRACO** is used for Create React App configuration overrides.
The backend is powered by **Node.js/Express**, utilizing **PostgreSQL** with **Prisma ORM** for database interactions. It provides APIs for lead submission, analytics, and admin functionalities. Authentication uses bcrypt for password hashing and session-based authentication. **Google Tag Manager** is integrated for analytics tracking.

### Feature Specifications
- **Lead Capture System**: Validated contact forms with storage in PostgreSQL, including comprehensive UTM and Facebook Ads tracking parameters (utm_source, utm_medium, utm_campaign, utmContent, utmTerm, fbclid, campaignId, adId, adsetId).
- **Admin Dashboard**: Secure `/admin` route with authentication, providing real-time analytics (visits, unique visitors, leads, conversion rates), paginated lead tables, and CSV export functionality.
- **Analytics & Tracking**: Automatic session-based visit tracking, unique visitor identification, and conversion rate calculation (Leads / Unique Visitors). Includes growth indicators comparing current vs. previous periods for key metrics.
- **WhatsApp Integration**: Personalized WhatsApp button becomes available post-form submission.
- **Abandoned Signups**: System tracks incomplete form submissions and automatically marks them as completed if a matching lead is subsequently created by email or phone.
- **Post-Form Redirect System**: Configurable automatic redirect after form submission with a countdown timer, managed via an admin settings panel.
- **Content Updates**: Dynamic statistics updates (e.g., "80k Revendedoras," "200 mil pedidos entregues"), revised benefit messaging, and optimized page flow for conversion.
- **Mobile Enhancements**: Specific mobile layout adjustments, including a unique hero image overlay effect and responsive spacing.

### System Design Choices
The application follows a full-stack architecture, with a clear separation between the React frontend and Node.js/Express backend. Data persistence is handled by PostgreSQL, accessed via Prisma ORM for type-safe database queries. The system prioritizes lead conversion and comprehensive marketing attribution, integrating detailed tracking from various sources. The admin dashboard is central to managing and analyzing business performance.

## External Dependencies

- **Database**: PostgreSQL
- **ORM**: Prisma
- **Frontend Framework**: React 17.0.2
- **Routing**: React Router DOM 5.2.0
- **Form Management**: React Hook Form, Yup (for validation)
- **Authentication**: bcrypt (for password hashing)
- **Build Tooling**: CRACO 7.1.0, react-scripts 5.0.1
- **Analytics**: Google Tag Manager (GTM-P3RGJRKK)
- **CDN Resources**: Google Fonts API (Inter, Noto Sans, STIX Two Text), Animate.css 4.1.1 (from unpkg CDN)
- **Node.js**: Version >=18.x