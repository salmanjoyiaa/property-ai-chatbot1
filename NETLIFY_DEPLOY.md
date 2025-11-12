# 🚀 Netlify Deployment Guide

Complete step-by-step guide to deploy Property AI Chatbot to Netlify.

## 📋 Prerequisites

- GitHub account (free)
- Netlify account (free)
- Your n8n webhook URL (or ngrok for local n8n)

---

## Method 1: Git Integration (Recommended) ⭐

### Step 1: Prepare Your Code

1. **Ensure all files are ready:**
   - ✅ `netlify.toml` exists
   - ✅ `.gitignore` exists
   - ✅ `package.json` has build scripts
   - ✅ Code is working locally

2. **Test your build:**
   ```bash
   npm run build
   ```
   Verify the `dist` folder is created successfully.

### Step 2: Push to GitHub

1. **Initialize Git (if not already):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - ready for Netlify deployment"
   ```

2. **Create GitHub Repository:**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name: `property-ai-chatbot`
   - Choose Public or Private
   - **Don't** initialize with README (you already have one)
   - Click "Create repository"

3. **Push to GitHub:**
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/property-ai-chatbot.git
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` with your GitHub username.

### Step 3: Connect to Netlify

1. **Sign up/Login to Netlify:**
   - Go to [netlify.com](https://www.netlify.com)
   - Click "Sign up" → Choose "GitHub"
   - Authorize Netlify to access your GitHub

2. **Import Your Site:**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Authorize if prompted
   - Select repository: `property-ai-chatbot`

3. **Configure Build Settings:**
   
   Netlify should auto-detect:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   
   If not auto-detected, set manually:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18` (or leave default)

4. **Set Environment Variables:**
   
   Click "Show advanced" → "New variable"
   
   **Required:**
   - Key: `VITE_N8N_WEBHOOK_URL`
   - Value: `https://your-ngrok-url.ngrok.io/webhook`
     (or your actual webhook URL)
   
   **Optional:**
   - Key: `VITE_WEBHOOK_PATH`
   - Value: `webhook` (if different from default)

5. **Deploy:**
   - Click "Deploy site"
   - Wait 2-3 minutes for build to complete
   - Your site will be live! 🎉

### Step 4: Get Your Site URL

After deployment:
- Your site URL: `https://your-site-name.netlify.app`
- You can change the site name in: **Site settings** → **Change site name**

---

## Method 2: Netlify CLI

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Login

```bash
netlify login
```
Browser will open for authentication.

### Step 3: Initialize Site

```bash
netlify init
```

Follow prompts:
- **Create & configure a new site** → Yes
- **Team:** Select your team
- **Site name:** Press Enter for auto-generated name

### Step 4: Set Environment Variables

```bash
netlify env:set VITE_N8N_WEBHOOK_URL "https://your-webhook-url.com/webhook"
netlify env:set VITE_WEBHOOK_PATH "webhook"
```

### Step 5: Deploy

```bash
# Build and deploy
npm run build
netlify deploy --prod
```

---

## Method 3: Drag & Drop (Quick Test)

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Deploy:**
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag the `dist` folder to the deploy area
   - Your site will be live in seconds!

**Note:** This method doesn't support:
- Environment variables
- Auto-deployments
- Git integration

Use this only for quick testing.

---

## 🔧 Setting Up Your Webhook URL

### Option A: Using ngrok (for local n8n)

1. **Install ngrok:**
   ```bash
   npm install -g ngrok
   # or download from ngrok.com
   ```

2. **Start n8n:**
   ```bash
   n8n start
   # or npx n8n
   ```

3. **Start ngrok:**
   ```bash
   ngrok http 5678
   ```

4. **Copy the HTTPS URL:**
   - Example: `https://abc123.ngrok.io`
   - Your webhook URL: `https://abc123.ngrok.io/webhook`

5. **Add to Netlify:**
   - Go to **Site settings** → **Environment variables**
   - Add: `VITE_N8N_WEBHOOK_URL` = `https://abc123.ngrok.io/webhook`

### Option B: Using Hosted n8n

If you have n8n hosted (n8n.cloud or self-hosted):

1. Get your webhook URL from n8n
2. Add to Netlify environment variables
3. Make sure the URL is publicly accessible

---

## ✅ Post-Deployment Checklist

- [ ] Site is accessible at your Netlify URL
- [ ] Environment variables are set correctly
- [ ] Webhook URL is accessible (not localhost)
- [ ] Test sending a message
- [ ] Test microphone feature (requires HTTPS)
- [ ] Test on mobile device
- [ ] Check mobile responsiveness
- [ ] Verify markdown formatting works
- [ ] Test error handling

---

## 🔍 Troubleshooting

### Build Fails

**Problem:** Build fails with errors

**Solutions:**
- Check build logs in Netlify dashboard
- Ensure Node version is 18+ (set in `netlify.toml`)
- Verify all dependencies are in `package.json`
- Test build locally: `npm run build`

### Webhook Not Working

**Problem:** Messages fail to send

**Solutions:**
- Verify `VITE_N8N_WEBHOOK_URL` is set correctly
- Check webhook URL is accessible (not localhost)
- Ensure webhook returns `{ "reply": "..." }` format
- Check browser console for errors
- Verify CORS is enabled on your webhook

### Environment Variables Not Working

**Problem:** Variables not accessible in app

**Solutions:**
- Variables must start with `VITE_` prefix
- Redeploy after adding variables
- Check variable names match exactly (case-sensitive)
- Clear browser cache

### Site Not Loading

**Problem:** Blank page or 404 errors

**Solutions:**
- Check `netlify.toml` redirects are correct
- Verify `dist` folder is being published
- Check browser console for errors
- Ensure `index.html` exists in `dist` folder

### Microphone Not Working

**Problem:** Microphone button doesn't work

**Solutions:**
- Microphone requires HTTPS (Netlify provides this)
- Check browser permissions
- Verify you're using Chrome, Edge, or Safari
- Check browser console for errors

---

## 🔄 Updating Your Site

### Automatic Deployments

Once connected to GitHub:
- Every push to `main` branch triggers a new deployment
- Pull requests get preview deployments automatically

### Manual Updates

1. Make changes to your code
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update description"
   git push
   ```
3. Netlify will automatically rebuild and deploy

### Updating Environment Variables

1. Go to **Site settings** → **Environment variables**
2. Edit or add variables
3. Click **Trigger deploy** → **Deploy site**
4. Or wait for next automatic deployment

---

## 🌐 Custom Domain

### Add Custom Domain

1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter your domain name
4. Follow DNS configuration instructions
5. Wait for DNS propagation (up to 48 hours)

### SSL Certificate

- Netlify provides free SSL certificates automatically
- HTTPS is enabled by default
- Certificate renews automatically

---

## 📊 Monitoring

### Build Logs

- View in Netlify dashboard → **Deploys** → Click on deploy
- Check for errors or warnings
- Download logs if needed

### Function Logs

- If using Netlify Functions, check **Functions** tab
- View real-time logs
- Monitor performance

### Analytics

- Enable Netlify Analytics (paid feature)
- Or use Google Analytics
- Track site performance

---

## 🎉 Success!

Your Property AI Chatbot is now live on Netlify!

**Next Steps:**
- Share your site URL
- Monitor usage
- Update webhook URL if needed
- Add custom domain (optional)

---

## 📞 Need Help?

- Check [WEBHOOK_SETUP.md](./WEBHOOK_SETUP.md) for webhook issues
- Netlify Docs: [docs.netlify.com](https://docs.netlify.com)
- Open an issue on GitHub

---

**Happy Deploying! 🚀**

