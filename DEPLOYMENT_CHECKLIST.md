# ✅ Deployment Checklist

Use this checklist before deploying to ensure everything is ready.

## Pre-Deployment

- [ ] Code is tested and working locally
- [ ] `npm run build` completes successfully
- [ ] `dist` folder is generated
- [ ] All environment variables are documented
- [ ] `.gitignore` includes sensitive files
- [ ] `README.md` is complete
- [ ] `netlify.toml` is configured

## Git Setup

- [ ] Git repository initialized
- [ ] All files committed
- [ ] `.gitignore` is working (no `node_modules` or `.env` committed)
- [ ] Code pushed to GitHub/GitLab/Bitbucket

## Netlify Configuration

- [ ] Repository connected to Netlify
- [ ] Build settings configured:
  - [ ] Build command: `npm run build`
  - [ ] Publish directory: `dist`
  - [ ] Node version: `18`
- [ ] Environment variables set:
  - [ ] `VITE_N8N_WEBHOOK_URL` (required)
  - [ ] `VITE_WEBHOOK_PATH` (optional)

## Webhook Setup

- [ ] n8n webhook is created and active
- [ ] Webhook URL is publicly accessible (not localhost)
- [ ] Webhook returns correct format: `{ "reply": "..." }`
- [ ] Webhook URL added to Netlify environment variables

## Post-Deployment Testing

- [ ] Site loads at Netlify URL
- [ ] No console errors
- [ ] Can send messages successfully
- [ ] AI responses are received
- [ ] Microphone feature works (if applicable)
- [ ] Mobile responsiveness works
- [ ] Markdown formatting displays correctly
- [ ] Tables render properly
- [ ] Error messages display correctly

## Security

- [ ] Environment variables are set (not hardcoded)
- [ ] No sensitive data in code
- [ ] HTTPS is enabled (automatic on Netlify)
- [ ] Security headers are configured (in netlify.toml)

## Documentation

- [ ] README.md is complete
- [ ] NETLIFY_DEPLOY.md has deployment instructions
- [ ] WEBHOOK_SETUP.md has webhook instructions
- [ ] .env.example file exists

## Final Steps

- [ ] Custom domain configured (if needed)
- [ ] Analytics set up (optional)
- [ ] Team members have access (if applicable)
- [ ] Backup/version control is set up

---

**Ready to Deploy! 🚀**

Once all items are checked, you're ready to deploy to Netlify!

