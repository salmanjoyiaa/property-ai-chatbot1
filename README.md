# Property AI Chatbot

A beautiful, modern, and fully responsive AI chatbot interface for property inquiries. Built with React, Vite, and Tailwind CSS.

![Property AI Chatbot](https://img.shields.io/badge/React-18.3.1-blue) ![Vite](https://img.shields.io/badge/Vite-5.4.8-646CFF) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.13-38B2AC)

## ✨ Features

- 🎨 **Modern UI Design** - Beautiful, professional interface with smooth animations
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- 🎤 **Voice Input** - Speech-to-text functionality using Web Speech API
- 💬 **Real-time Chat** - Smooth chat interface with markdown support
- 📊 **Rich Formatting** - Tables, lists, code blocks, and more
- ⚡ **Fast Performance** - Optimized build with Vite
- 🌐 **PWA Ready** - Progressive Web App capabilities
- ♿ **Accessible** - Built with accessibility in mind

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/property-ai-chatbot.git
cd property-ai-chatbot
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_N8N_WEBHOOK_URL=https://your-webhook-url.com/webhook
VITE_WEBHOOK_PATH=webhook
```

4. Run development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## 📦 Project Structure

```
property-ai-chatbot/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ChatInput.jsx
│   │   ├── ChatMessage.jsx
│   │   ├── Header.jsx
│   │   └── TypingDots.jsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useAutoScroll.js
│   │   └── useChat.js
│   ├── styles/          # Global styles
│   │   └── globals.css
│   ├── utils/           # Utility functions
│   │   └── api.js
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── netlify.toml         # Netlify configuration
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json
```

## 🌐 Deployment

### Netlify (Recommended)

This project is pre-configured for Netlify deployment. See [NETLIFY_DEPLOY.md](./NETLIFY_DEPLOY.md) for detailed instructions.

**Quick Deploy:**
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy!

### Other Platforms

The project can be deployed to any static hosting service:
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_N8N_WEBHOOK_URL` | Full URL to your n8n webhook | Yes (production) | - |
| `VITE_WEBHOOK_PATH` | Webhook path name | No | `webhook` |

### Webhook Setup

The app expects your webhook to return JSON in this format:
```json
{
  "reply": "Your AI assistant's response here"
}
```

See [WEBHOOK_SETUP.md](./WEBHOOK_SETUP.md) for detailed webhook configuration.

## 🛠️ Tech Stack

- **React 18.3.1** - UI library
- **Vite 5.4.8** - Build tool
- **Tailwind CSS 3.4.13** - Styling
- **Framer Motion 11.3.17** - Animations
- **React Markdown 10.1.0** - Markdown rendering
- **Remark GFM 4.0.1** - GitHub Flavored Markdown

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Note:** Speech recognition requires Chrome, Edge, or Safari.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons and animations from [Framer Motion](https://www.framer.com/motion/)

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check [WEBHOOK_SETUP.md](./WEBHOOK_SETUP.md) for webhook configuration
- See [NETLIFY_DEPLOY.md](./NETLIFY_DEPLOY.md) for deployment help

---

Made with ❤️ for property management

