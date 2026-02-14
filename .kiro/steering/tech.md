# Tech Stack & Build System

## Core Technologies

- **React 19.1.0** - Latest React with modern features
- **Vite 6.3.5** - Fast dev server and production bundling
- **TailwindCSS 4.1.7** - Utility-first styling with custom theme
- **Three.js 0.176.0** - 3D graphics and WebGL rendering
- **React Three Fiber 9.1.2** - React renderer for Three.js
- **GSAP 3.13.0** - Professional animation library

## Key Libraries

- **@react-three/drei** - Useful helpers for 3D rendering
- **@gsap/react** - React integration for GSAP animations
- **Lenis** - Smooth scroll library for enhanced UX
- **React Responsive** - Responsive design utilities
- **Maath** - Math utilities for 3D operations

## Development Tools

- **ESLint** - Code linting with React-specific rules
- **@iconify/react** - Icon system
- **TypeScript types** - Type definitions for React

## Common Commands

```bash
# Development
npm run dev          # Start development server (http://localhost:5173)

# Production
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint checks
```

## Build Configuration

- **Vite config** includes TailwindCSS and React plugins
- **ES modules** used throughout (type: "module" in package.json)
- **Font loading** optimized with font-display: swap
- **Custom animations** defined in CSS with Tailwind utilities