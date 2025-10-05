# Ask Me Again - Conversation Starter App

## Overview

Ask Me Again is a web application designed to facilitate meaningful conversations through deep, thoughtful prompts. The app presents users with various conversation themes (like vulnerability, attraction, identity, etc.) and provides carefully curated questions to spark authentic dialogue. It includes special "wildcard" prompts for more interactive experiences and features a clean, elegant interface with a warm color palette.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript running on Vite for fast development and building
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: shadcn/ui components built on Radix UI primitives with Tailwind CSS
- **State Management**: React hooks for local state, TanStack Query for server state management
- **Styling**: Custom brand colors (soft clay background, charcoal text, deep lavender accent) with Tailwind CSS
- **Fonts**: Inter for UI elements, Playfair Display and Lora for branding
- **Component Structure**: Modular components including CategorySelection, QuestionCard, QuestionEditor, and Logo components

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Build System**: ESBuild for production bundling, tsx for development
- **Static Assets**: Express static file serving for favicon and other assets
- **API Structure**: RESTful endpoints with basic health check endpoint
- **Development**: Vite middleware integration for hot module replacement
- **Storage**: In-memory storage implementation with interface for future database integration

### Data Architecture
- **Schema Definition**: Centralized schema in shared directory using Drizzle ORM
- **Question Categories**: Enum-based categorization (vulnerability, attraction, identity, etc.)
- **Question Storage**: Static data structure with category-based organization
- **Wildcard System**: Special interactive prompts stored separately from regular questions
- **User System**: Basic user schema prepared for future authentication

### Design Patterns
- **Monorepo Structure**: Client, server, and shared code in separate directories
- **Type Safety**: Full TypeScript coverage across frontend, backend, and shared schemas
- **Component Composition**: Reusable UI components with consistent theming
- **State Management**: Local component state with hooks, server state with React Query
- **Configuration Management**: Centralized configs for Tailwind, Vite, and TypeScript

## External Dependencies

### Database & ORM
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect configured
- **Neon Database**: Serverless PostgreSQL hosting (@neondatabase/serverless)
- **Connection**: Uses DATABASE_URL environment variable for connection

### UI & Styling
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom color variables
- **Class Variance Authority**: For creating consistent component variants
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Fast build tool and development server
- **ESBuild**: JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer
- **TypeScript**: Static type checking across the entire codebase

### Form & Validation
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation library integrated with Drizzle
- **Hookform Resolvers**: Zod integration for React Hook Form

### Utilities
- **clsx & tailwind-merge**: Conditional CSS class handling
- **date-fns**: Date manipulation and formatting
- **wouter**: Lightweight routing for React
- **nanoid**: Unique ID generation