# Project Structure & Organization

## Root Structure

```
├── public/                 # Static assets
│   ├── assets/            # Project images and media
│   ├── fonts/             # Custom font files (Amiamie, Eunomia)
│   ├── images/            # General images
│   └── models/            # 3D models for Three.js
├── src/                   # Source code
│   ├── components/        # Reusable UI components
│   ├── sections/          # Page sections (main content blocks)
│   ├── constants/         # Static data and configuration
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles and theme
└── [config files]        # Vite, ESLint, package.json
```

## Component Architecture

### Sections (`src/sections/`)
Main page sections that compose the full portfolio experience:
- `Hero.jsx` - 3D hero with planet animation
- `Navbar.jsx` - Navigation with staggered animations
- `ServiceSummary.jsx` - Scroll-triggered service overview
- `Services.jsx` - Detailed service listings
- `About.jsx` - About section with clip-path reveals
- `Works.jsx` - Portfolio projects with hover effects
- `ContactSummary.jsx` - Marquee-based contact CTA
- `Contact.jsx` - Contact form and information

### Components (`src/components/`)
Reusable UI components:
- `Planet.jsx` - 3D planet component for hero
- `Marquee.jsx` - Animated marquee text component
- `SimpleMarquee.jsx` - Basic marquee implementation
- `AnimatedHeaderSection.jsx` - Animated section headers
- `AnimatedTextLines.jsx` - Text animation utilities

### Constants (`src/constants/`)
- `index.js` - Contains `servicesData`, `projects`, and `socials` arrays

## Styling Approach

- **TailwindCSS** for utility-first styling
- **Custom CSS variables** defined in `@theme` block
- **Custom utilities** for responsive text sizing and animations
- **Font loading** with multiple weights and styles
- **Animation keyframes** for marquee and scroll effects

## Asset Organization

- **Fonts**: `/public/fonts/` with OTF/TTF variants
- **Images**: `/public/assets/` organized by feature
- **3D Models**: `/public/models/` for Three.js scenes
- **Backgrounds**: Separate folder for background images

## Data Flow

- Static data centralized in `constants/index.js`
- Components import data as needed
- No external state management (uses React built-ins)
- Smooth scroll handled by ReactLenis wrapper