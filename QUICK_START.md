# 🚀 Quick Start Guide - Deploy to Netlify

## Your project is ready! ✅

All necessary files have been created and configured. Follow these simple steps:

## Step 1: Push to GitHub (5 minutes)

### If Git is not installed:
1. Download Git from [git-scm.com](https://git-scm.com/download/win)
2. Install with default settings
3. Restart your terminal

### Initialize and Push:

```bash
# Initialize Git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - ready for Netlify"

# Create repository on GitHub first, then:
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/property-ai-chatbot.git
git push -u origin main
```

**Replace `YOUR_USERNAME` with your GitHub username.**

## Step 2: Deploy to Netlify (3 minutes)

1. **Go to [netlify.com](https://www.netlify.com)**
   - Sign up/Login (use GitHub for easy setup)

2. **Click "Add new site" → "Import an existing project"**

3. **Connect GitHub:**
   - Choose "GitHub"
   - Authorize Netlify
   - Select repository: `property-ai-chatbot`

4. **Build Settings (Auto-detected):**
   - Build command: `npm run build` ✅
   - Publish directory: `dist` ✅
   - Click "Show advanced"
   - Node version: `18`

5. **Environment Variables:**
   Click "New variable" and add:
   - **Key:** `VITE_N8N_WEBHOOK_URL`
   - **Value:** `https://your-ngrok-url.ngrok.io/webhook`
   
   *(Get this from your n8n setup - see WEBHOOK_SETUP.md)*

6. **Deploy:**
   - Click "Deploy site"
   - Wait 2-3 minutes
   - Done! 🎉

## Step 3: Get Your Webhook URL

### Option A: Using ngrok (for local n8n)

```bash
# Install ngrok
npm install -g ngrok

# Start n8n (in another terminal)
npx n8n

# Start ngrok (in this terminal)
ngrok http 5678
```

Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)
Your webhook URL: `https://abc123.ngrok.io/webhook`

### Option B: Using Hosted n8n

Use your hosted n8n webhook URL directly.

## Step 4: Update Netlify Environment Variable

1. Go to **Site settings** → **Environment variables**
2. Edit `VITE_N8N_WEBHOOK_URL`
3. Update with your webhook URL
4. Click **Trigger deploy** → **Deploy site**

## ✅ That's It!

Your site is now live at: `https://your-site-name.netlify.app`

## 📚 Need More Help?

- **Deployment Details:** See [NETLIFY_DEPLOY.md](./NETLIFY_DEPLOY.md)
- **Webhook Setup:** See [WEBHOOK_SETUP.md](./WEBHOOK_SETUP.md)
- **Checklist:** See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

## 🎯 Files Ready for Deployment

✅ `netlify.toml` - Netlify configuration
✅ `.gitignore` - Git ignore rules
✅ `README.md` - Project documentation
✅ `NETLIFY_DEPLOY.md` - Detailed deployment guide
✅ `WEBHOOK_SETUP.md` - Webhook configuration
✅ `DEPLOYMENT_CHECKLIST.md` - Pre-deployment checklist
✅ `LICENSE` - MIT License
✅ `package.json` - Dependencies and scripts
✅ All source files in `src/`
✅ Build tested and working

**Everything is ready to go! 🚀**

