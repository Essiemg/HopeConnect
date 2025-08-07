# Overview

VOH-CBO (Voices of Hope Community-Based Organisation) is a full-stack web application for a Kenyan non-profit organization focused on empowering women and girls through education, advocacy, and community programs. The platform features a modern, responsive design with comprehensive content management capabilities, donation processing, and administrative controls.

The application supports the organization's mission to amplify voices of women and girls by providing digital platforms for program showcase, team management, blog content, event coordination, and secure donation processing through Stripe integration.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design system
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **UI Components**: Radix UI primitives through shadcn/ui for accessible, customizable components

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Passport.js with local strategy and session-based authentication
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **API Design**: RESTful API endpoints with proper error handling and middleware

## Database Design
- **ORM**: Drizzle with PostgreSQL dialect for schema management and migrations
- **Schema Structure**: Modular design with separate tables for users, team members, blog posts, programs, events, donations, merchandise, contact messages, and gallery images
- **Data Validation**: Zod schemas for runtime validation and type safety
- **Relationships**: Proper foreign key relationships with cascading deletes where appropriate

## Authentication & Authorization
- **Strategy**: Session-based authentication using Passport.js local strategy
- **Password Security**: Scrypt hashing with salt for secure password storage
- **Session Management**: Server-side sessions stored in PostgreSQL with configurable expiration
- **Protected Routes**: Middleware-based route protection for admin functionality
- **Role-based Access**: Admin role system for content management capabilities

## Content Management System
- **Team Management**: Full CRUD operations for team member profiles with image uploads
- **Blog System**: Rich content management with draft/published states and slug generation
- **Program Management**: Category-based program organization with active/inactive states
- **Event Coordination**: Calendar-based event management with RSVP capabilities
- **Gallery Management**: Image organization with Cloudinary integration for optimized delivery

## Payment Processing
- **Payment Gateway**: M-Pesa integration for mobile money processing in Kenya
- **Payment Types**: Support for one-time donations via STK Push
- **Checkout Flow**: M-Pesa STK Push for seamless mobile payment experience
- **Transaction Tracking**: Database logging of all donation transactions with M-Pesa receipt numbers
- **Security**: Secure M-Pesa API integration with proper authentication and callback handling

# External Dependencies

## Database Services
- **PostgreSQL**: Primary database for all application data
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling

## Payment Processing
- **M-Pesa Daraja API**: Mobile money payment gateway for donation processing
- **STK Push**: Push payment requests directly to donor mobile phones

## Media Management
- **Cloudinary**: Cloud-based image and video management for team photos, gallery images, and blog thumbnails

## Email Services
- **Nodemailer**: Email sending for contact forms and volunteer applications
- **SMTP Configuration**: Environment-based email service configuration

## Development Tools
- **Drizzle Kit**: Database migration and schema management
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast JavaScript bundling for production builds
- **Vite**: Development server with hot module replacement

## UI Libraries
- **Radix UI**: Headless UI primitives for accessibility and keyboard navigation
- **Lucide React**: Consistent iconography throughout the application
- **Tailwind CSS**: Utility-first CSS framework for responsive design

## Authentication Dependencies
- **Passport.js**: Authentication middleware for Express
- **Express Session**: Session management with PostgreSQL storage
- **Connect PG Simple**: PostgreSQL session store adapter

## Validation & Forms
- **Zod**: Schema validation for both frontend and backend
- **React Hook Form**: Performance-optimized form library
- **Hookform Resolvers**: Zod integration for form validation