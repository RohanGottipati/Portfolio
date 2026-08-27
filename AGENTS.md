# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview
This is a modern, interactive 3D portfolio website built with React, Three.js, and Tailwind CSS. The portfolio showcases projects, experience, and skills through an engaging user interface with 3D elements and animations.

## Tech Stack
- **Frontend**: React 18 + Vite
- **3D Graphics**: Three.js via React Three Fiber (@react-three/fiber) and Drei (@react-three/drei)
- **Styling**: Tailwind CSS with custom theming
- **Animations**: Framer Motion
- **UI Components**: Radix UI (via shadcn/ui components)
- **Email Service**: EmailJS
- **Build Tool**: Vite with custom SPA fallback plugin
- **Deployment**: Vercel

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Start development server (runs on port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### File Structure Commands
```bash
# View component structure
ls src/components/

# View canvas/3D components
ls src/components/canvas/

# View UI components (shadcn/ui)
ls src/components/ui/

# View constants and data
cat src/constants/index.js
```

## Architecture Overview

### Core Application Structure
- **App.jsx**: Main router component with React Router setup for SPA navigation
- **main.jsx**: Entry point with React StrictMode
- **index.css**: Global styles including Tailwind CSS and custom CSS variables

### Component Architecture

#### Layout Components
- **Navbar.jsx**: Fixed navigation with responsive mobile menu using Sheet component
- **Footer.jsx**: Social links and copyright information
- **ScrollToTop.jsx**: Handles scroll-to-top on route changes

#### Page Components (Routes)
- **Hero.jsx**: Landing page with ProfileCard and about information
- **Projects.jsx**: Project showcase with ProjectCards and TechBalls sections
- **Experience.jsx**: Vertical timeline of work experience
- **Resume.jsx**: Resume display component

#### 3D/Canvas Components (`src/components/canvas/`)
- **Ball.jsx**: Interactive 3D technology balls
- **Computers.jsx**: 3D computer model for contact page
- **Earth.jsx**: 3D Earth component
- **Stars.jsx**: Animated star field background

#### Specialized Components
- **ProjectCards.jsx**: Tilt-enabled cards displaying projects with links
- **TechBalls.jsx**: Grid of 3D balls representing technologies
- **ProfileCard.jsx**: Custom profile card with Discord-like styling
- **Dither.jsx**: Custom dithering effect background
- **ErrorBoundary.jsx**: Error handling for 3D components

### Data Management
- **src/constants/index.js**: Centralized data store for:
  - Navigation links
  - Technologies and skills
  - Work experiences
  - Project information
  - Education details
  - Profile information

### Styling System
- **src/styles.js**: Consistent styling classes for typography and spacing
- **tailwind.config.cjs**: Custom theme with:
  - Extended color palette (tertiary, black-100/200, white-100, blue-primary/secondary)
  - Custom breakpoints (xs: 450px)
  - Shadow utilities
  - CSS variables for dynamic theming
- **components.json**: shadcn/ui configuration with path aliases

### Utilities
- **src/utils/motion.js**: Framer Motion animation variants (textVariant, fadeIn, zoomIn, slideIn, staggerContainer)
- **src/lib/utils.js**: Utility functions including cn() for className merging
- **src/hoc/SectionWrapper.jsx**: Higher-order component for consistent section styling and animations

## Key Development Patterns

### 3D Component Integration
- All Three.js components are wrapped with Suspense and ErrorBoundary
- Canvas components use React Three Fiber with Drei helpers
- Fallback UI provided for failed 3D component loads

### Animation System
- Framer Motion used extensively for page transitions and scroll animations
- Custom motion variants in `utils/motion.js` provide consistent animation patterns
- SectionWrapper HOC applies staggered animations to sections

### Responsive Design
- Mobile-first approach with Tailwind breakpoints
- 3D components adapt to screen sizes
- Navigation switches to mobile sheet menu on smaller screens

### Data-Driven Content
- All content (projects, experience, technologies) defined in constants
- Easy to update portfolio information by modifying constants/index.js
- Logo paths use both local assets and external URLs

### Path Alias System
- `@/` resolves to `src/` directory
- Configured in both jsconfig.json and Vite config
- Used extensively for component imports

## Environment Configuration

### Required Environment Variables (for EmailJS)
```
VITE_APP_EMAILJS_SERVICE_ID=your_service_id
VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id  
VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

### Build Configuration
- **vite.config.js** includes custom SPA fallback plugin for client-side routing
- Vercel deployment configured via vercel.json with catch-all routing
- Custom asset handling for favicon and images

## Adding New Content

### Adding Projects
Edit `src/constants/index.js` projects array:
```javascript
{
  name: "Project Name",
  description: "Project description",
  tags: [{ name: "React", color: "blue-text-gradient" }],
  image: "/path/to/image.png",
  links: [{ url: "https://github.com/...", logo: null }]
}
```

### Adding Experience
Edit `src/constants/index.js` experiences array with title, company, date, and points.

### Adding Technologies
Edit skills array in `src/components/TechBalls.jsx` and logoMap for 3D ball display.

## Performance Considerations
- 3D components lazy-loaded with Suspense
- Images optimized and include fallback placeholders
- Custom SPA routing prevents full page reloads
- Asset optimization configured in Vite build settings

## Common File Paths
- Components: `src/components/`
- 3D Assets: `public/` directory (referenced absolutely)
- Static assets: `src/assets/`
- Logo files: `public/logos/`
- Resume PDF: `public/resume.pdf`