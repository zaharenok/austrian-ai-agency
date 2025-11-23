<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# Austrian AI Agency - Premium AI Consulting Website

A premium, modern, and responsive website for Austrian AI Agency, featuring Material Design 3 styling and multi-language support.

## 🌟 Features

### Modern Design
- **Animated Gradient Hero Section** - Eye-catching hero with smooth animations and gradient effects
- **Material Design 3 Styling** - Following Google's latest design guidelines for a premium look
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Typography** - Professional font pairing with Inter, Playfair Display, and Roboto

### Multi-Language Support
- **German** (Primary) - Complete German language support
- **English** - Full English translations
- **Russian** - Russian language capability
- **Dynamic Language Switching** - Seamless switching between languages with real-time content updates

### Service Showcase
- **6 Result-Focused Service Cards** - Detailed presentation of AI consulting services
- **Interactive Elements** - Hover effects and smooth transitions
- **Icon Integration** - Material Icons for enhanced visual communication

## 📁 Project Structure

```
├── index.html          # Main website HTML structure
├── styles.css          # CSS styles with Material Design 3
├── script.js           # JavaScript functionality and translations
├── README.md           # Project documentation
└── .gitignore          # Git ignore file
```

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools required - pure HTML/CSS/JavaScript

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/zaharenok/austrian-ai-agency.git
   ```

2. Navigate to the project directory:
   ```bash
   cd austrian-ai-agency
   ```

3. Open `index.html` in your browser:
   ```bash
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   
   # On Windows
   start index.html
   ```

## 🎨 Customization

### Branding
- **Primary Color**: Modify the CSS variables in `styles.css` to change the color scheme
- **Typography**: Update font imports in `index.html` for different font families
- **Content**: Edit the translation objects in `script.js` for different languages

### Styling
Key CSS variables to customize:
```css
:root {
    --md-sys-color-primary: #1e3a8a;        /* Primary brand color */
    --md-sys-color-secondary: #8b5cf6;      /* Secondary accent */
    --md-sys-color-surface: #ffffff;        /* Background color */
    --md-sys-color-on-surface: #1f2937;      /* Text color */
}
```

### Languages
Add new languages by extending the `translations` object in `script.js`:
```javascript
const translations = {
    newLang: {
        // Translation content here
    }
};
```

## 🛠️ Technologies Used

### Frontend Technologies
- **HTML5** - Semantic markup with modern elements
- **CSS3** - Advanced styling with CSS Grid, Flexbox, and custom properties
- **JavaScript (ES6+)** - Interactive functionality and language management
- **Material Icons** - Google's icon library for consistent iconography

### Design System
- **Material Design 3** - Google's comprehensive design system
- **Responsive Design** - Mobile-first approach with breakpoints
- **Animation Framework** - CSS transitions and JavaScript animations

## 🌐 Browser Support

- **Chrome 90+** ✓
- **Firefox 88+** ✓
- **Safari 14+** ✓
- **Edge 90+** ✓

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 767px and below

## 🔧 Development

### Code Style
- **HTML**: Semantic, accessible markup
- **CSS**: BEM-like naming conventions, CSS custom properties
- **JavaScript**: ES6+ features, clean function structure

### Performance Optimization
- **CSS**: Efficient selectors and minimal reflows
- **JavaScript**: Event delegation and debounced interactions
- **Assets**: No external dependencies except Google Fonts and Material Icons

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

Austrian AI Agency  
Website: https://github.com/zaharenok/austrian-ai-agency  
Location: Austria, DACH Region

---

**Built with ❤️ for premium AI consulting services in the DACH region.**
>>>>>>> 286f77f (Initial commit: Austrian AI Agency Website)
