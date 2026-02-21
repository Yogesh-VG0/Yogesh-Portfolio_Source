# Yogesh Vadivel - Portfolio

A modern, responsive personal portfolio website built with React, TypeScript, and Tailwind CSS.

🌐 **Live Site:** [yogeshv.me](https://yogeshv.me)

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)

## ✨ Features

- **Modern UI** - Clean, minimalist design with glassmorphism effects
- **Dark/Light Mode** - Theme toggle with smooth transitions
- **Animations** - Typewriter effect, scroll progress, 3D tilt cards
- **Responsive** - Fully responsive design for all devices
- **Contact Form** - Working contact form with EmailJS integration
- **Form Validation** - Real-time validation with error messages

## 🛠️ Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Build Tool:** Vite
- **Email Service:** EmailJS

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Yogesh-VG0/Yogesh-Portfolio_Source.git

# Navigate to project directory
cd Yogesh-Portfolio_Source

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be running at `http://localhost:8080`

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── Hero.tsx        # Hero section with typewriter
│   ├── About.tsx       # About section
│   ├── Skills.tsx      # Skills with icons
│   ├── Projects.tsx    # Project cards with tilt effect
│   ├── Experience.tsx  # Work experience
│   ├── Education.tsx   # Education & certifications
│   ├── Contact.tsx     # Contact form with validation
│   └── ...
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
└── index.css           # Global styles & CSS variables
```

## 🌐 Deployment

### Deploy to GitHub Pages

```bash
npm run deploy
```

This builds the project and pushes to the `Yogesh-VG0.github.io` repository.

## 📧 Contact Form Setup

The contact form uses EmailJS. To configure:

1. Create an account at [emailjs.com](https://www.emailjs.com/)
2. Set up an email service and template
3. Update credentials in `src/components/Contact.tsx`:

```typescript
const EMAILJS_SERVICE_ID = "your_service_id";
const EMAILJS_TEMPLATE_ID = "your_template_id";
const EMAILJS_PUBLIC_KEY = "your_public_key";
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📬 Contact

- **Email:** yogeshvadivel456@gmail.com
- **LinkedIn:** [yogesh-vadivel](https://www.linkedin.com/in/yogesh-vadivel-a287a6269/)
- **GitHub:** [Yogesh-VG0](https://github.com/Yogesh-VG0)

---

Made with ❤️ by Yogesh Vadivel
