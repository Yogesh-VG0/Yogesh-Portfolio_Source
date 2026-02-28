# 🚀 Yogesh Vadivel - Portfolio

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Portfolio-Live-brightgreen?style=for-the-badge&logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

[![Live Site](https://img.shields.io/badge/🌐-Live_Site-FF6B6B?style=for-the-badge)](https://yogeshv.me)
[![GitHub stars](https://img.shields.io/github/stars/Yogesh-VG0/Yogesh-Portfolio_Source?style=for-the-badge&logo=github)](https://github.com/Yogesh-VG0/Yogesh-Portfolio_Source)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

</div>

A stunning, modern personal portfolio website showcasing advanced web development capabilities with cutting-edge animations, responsive design, and exceptional user experience.

## ✨ Key Features

### 🎨 **Visual Excellence**
- **🌟 Aurora Background** - Beautiful animated gradient blobs in light mode, twinkling stars in dark mode
- **💫 Split Text Animation** - Character-by-character entrance effect for hero heading
- **⚡ Click Spark Effects** - Interactive particle effects on every click
- **🔢 Count Up Animations** - Numbers animate from 0 to target values on scroll
- **🎯 Spotlight Cursor Effects** - Dynamic glow that follows cursor on project cards
- **🌙 Theme System** - Smooth dark/light mode transitions with OLED black support

### 🛠️ **Technical Features**
- **📱 Fully Responsive** - Optimized for mobile, tablet, and desktop
- **⚡ Performance Optimized** - Lazy loading, code splitting, and efficient animations
- **🎭 Interactive Elements** - 3D tilt cards, hover effects, and micro-interactions
- **📊 GitHub Integration** - Live contribution graph with interactive tooltips
- **📧 Contact System** - Working contact form with EmailJS integration
- **🔍 SEO Optimized** - Meta tags, sitemap, and robots.txt
- **🎯 Accessibility** - ARIA labels, semantic HTML, keyboard navigation

### 📱 **Responsive Design**
- **Mobile-First Approach** - Designed for small screens, scaled up beautifully
- **Touch-Friendly** - Optimized touch targets and gestures
- **Adaptive Layouts** - Smart repositioning for different screen sizes
- **Performance** - Optimized images and animations for mobile networks

## 🛠️ Tech Stack

### 🎯 **Frontend Framework**
- **React 18** - Modern hooks-based architecture
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool

### 🎨 **Styling & UI**
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **Framer Motion** - Production-ready motion library
- **next-themes** - Perfect dark mode implementation

### ⚡ **Animations & Effects**
- **Framer Motion** - Smooth, performant animations
- **Canvas API** - Custom background animations
- **CSS Animations** - Hardware-accelerated effects
- **React GitHub Calendar** - Interactive contribution graph

### 🔧 **Development Tools**
- **ESLint** - Code quality and consistency
- **Vitest** - Modern testing framework
- **PostCSS** - CSS processing and optimization
- **GitHub Pages** - Static hosting

### 📧 **Services**
- **EmailJS** - Contact form functionality
- **GitHub API** - Real-time data fetching

## 📁 Project Architecture

```
📦 src/
├── 🎨 components/          # Reusable UI components
│   ├── 🎭 ui/             # shadcn/ui base components
│   ├── 🌟 Hero.tsx        # Hero section with animations
│   ├── 👤 About.tsx       # About section with GitHub graph
│   ├── 💼 Skills.tsx      # Skills showcase with categories
│   ├── 🚀 Projects.tsx    # Project cards with effects
│   ├── 💼 Experience.tsx  # Work experience timeline
│   ├── 🎓 Education.tsx   # Education & certifications
│   ├── 📧 Contact.tsx     # Contact form with validation
│   ├── 🌟 StarsBackground.tsx    # Dual-mode background
│   ├── ✨ SplitText.tsx   # Text animation component
│   ├── ⚡ ClickSpark.tsx  # Click effect component
│   ├── 🔢 CountUp.tsx     # Number animation
│   └── 🎯 ThemeToggle.tsx # Theme switcher
├── 📊 data/               # Static data and content
│   ├── 📁 projects.ts    # Project metadata
│   ├── 📁 skills.ts      # Skills categories
│   ├── 📁 socials.tsx    # Social links
│   └── 📁 projectEntries.tsx  # Detailed project data
├── 🪝 hooks/              # Custom React hooks
│   ├── 📱 use-mobile.ts  # Mobile detection
│   └── 🎯 use-theme.ts   # Theme utilities
├── 🔧 lib/                # Utility functions
│   ├── 🎭 motion.ts      # Animation presets
│   └── 🔧 utils.ts       # Helper functions
├── 📄 pages/              # Route components
│   ├── 🏠 Index.tsx       # Home page
│   ├── 📄 Resume.tsx     # Resume page
│   ├── 🚀 ProjectDetail.tsx  # Project details
│   └── 🚫 NotFound.tsx   # 404 page
├── 🎨 index.css           # Global styles & theme variables
├── ⚙️ main.tsx            # App entry point
└── 📱 vite-env.d.ts      # Vite type definitions
```

## 🌐 Deployment

### 🚀 Quick Deploy

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

### 📦 Build Process

1. **Development Build** - `npm run build:dev`
2. **Production Build** - `npm run build`
3. **Preview Locally** - `npm run preview`
4. **Deploy to Pages** - `npm run deploy`

The deployment process:
- Builds the project with Vite
- Optimizes assets and code splitting
- Pushes to `Yogesh-VG0.github.io` repository
- Automatically updates the live site

## ⚡ Performance & Optimization

### 🎯 **Performance Metrics**
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size**: < 500KB (gzipped)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s

### � **Optimizations**
- **Code Splitting** - Lazy loaded components and routes
- **Image Optimization** - WebP format, lazy loading, proper sizing
- **CSS Optimization** - Purge unused styles, minification
- **Tree Shaking** - Remove unused JavaScript
- **Caching Strategy** - Static asset caching with service worker
- **Critical CSS** - Inline critical styles, defer non-critical

### 📱 **Mobile Optimizations**
- **Touch Targets** - Minimum 44px touch areas
- **Viewport Meta** - Proper mobile viewport configuration
- **Responsive Images** - Srcset and sizes attributes
- **Reduced Motion** - Respect user's motion preferences

## 🌍 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 90+     | ✅ Full |
| Firefox | 88+     | ✅ Full |
| Safari  | 14+     | ✅ Full |
| Edge    | 90+     | ✅ Full |
| iOS     | 14+     | ✅ Full |
| Android | 10+     | ✅ Full |

## 📧 Contact & Configuration

### 🔄 **EmailJS Setup**

1. **Create Account** - Sign up at [EmailJS](https://www.emailjs.com/)
2. **Email Service** - Configure your email provider (Gmail, Outlook, etc.)
3. **Create Template** - Design your email template
4. **Update Credentials** in `src/components/Contact.tsx`:

```typescript
const EMAILJS_SERVICE_ID = "your_service_id";
const EMAILJS_TEMPLATE_ID = "your_template_id";
const EMAILJS_PUBLIC_KEY = "your_public_key";
```

### 🎨 **Theme Customization**

Colors and themes are defined in `src/index.css`:

```css
:root {
  --background: 220 20% 97%;    /* Light mode background */
  --foreground: 222 40% 8%;     /* Light mode text */
  --primary: 217 91% 55%;       /* Primary brand color */
}

.dark {
  --background: 0 0% 0%;        /* Dark mode background */
  --foreground: 210 20% 93%;    /* Dark mode text */
  --primary: 217 91% 60%;      /* Dark mode primary */
}
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### 📋 **Development Guidelines**
- Follow the existing code style and conventions
- Use TypeScript for all new code
- Add appropriate comments for complex logic
- Test on multiple screen sizes
- Ensure accessibility standards are met

## 🐛 Troubleshooting

### 🔧 **Common Issues**

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Animation Performance**
- Check browser's performance tab
- Reduce animation complexity on lower-end devices
- Use `will-change` property sparingly

**Mobile Issues**
- Test in Chrome DevTools device mode
- Check touch target sizes
- Verify viewport meta tag

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🌟 Show Your Support

If you find this portfolio helpful or inspiring:

- ⭐ **Star** the repository
- 🔄 **Fork** and customize it
- 📢 **Share** it with others
- 💬 **Provide feedback** for improvements

## 📬 Get in Touch

<div align="center">

[![Email](https://img.shields.io/badge/📧_Email-yogeshvadivel456@gmail.com-red?style=for-the-badge)](mailto:yogeshvadivel456@gmail.com)
[![LinkedIn](https://img.shields.io/badge/💼_LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/yogesh-vadivel-a287a6269/)
[![GitHub](https://img.shields.io/badge/🚀_GitHub-Follow-black?style=for-the-badge&logo=github)](https://github.com/Yogesh-VG0)
[![Portfolio](https://img.shields.io/badge/🌐_Portfolio-Visit-FF6B6B?style=for-the-badge)](https://yogeshv.me)

</div>

---

<div align="center">

**Made with ❤️ and ☕ by [Yogesh Vadivel](https://yogeshv.me)**

*Built with modern web technologies to showcase the art of frontend development*

</div>
