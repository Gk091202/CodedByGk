# Quick Start Guide

## ⚡ Get Started in 5 Minutes

### 1. Clone & Install

```bash
git clone your-repo-url
cd Blog\ web
npm install
```

### 2. Set Up Appwrite (Required for full features)

#### Option A: Skip for now (develop locally without backend)

The site will build and run, but newsletter, auth, and comments won't work until you configure Appwrite.

#### Option B: Set up Appwrite now (recommended)

1. Go to [cloud.appwrite.io](https://cloud.appwrite.io)
2. Create a free account
3. Create a new project
4. Follow the detailed guide: [APPWRITE_SETUP.md](./APPWRITE_SETUP.md)

### 3. Configure Environment

```bash
# Copy the example env file
cp .env.local.example .env.local

# Edit .env.local with your Appwrite credentials
# (Skip this if you're not setting up Appwrite yet)
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## What You Get

### Without Appwrite Setup

- ✅ Full blog with MDX support
- ✅ Dark/light mode toggle
- ✅ Tag filtering
- ✅ Reading time calculation
- ✅ Responsive design
- ❌ Newsletter signup (won't save)
- ❌ Authentication
- ❌ Comments
- ❌ Admin dashboard

### With Appwrite Setup

- ✅ Everything above PLUS:
- ✅ Working newsletter signup
- ✅ User authentication
- ✅ Comments on posts
- ✅ Admin dashboard
- ✅ Premium content gating

## Add Your First Blog Post

Create a new `.mdx` file in `content/posts/`:

```mdx
---
title: "My Awesome Post"
description: "This is what my post is about"
date: "2026-01-01"
author: "Your Name"
tags: ["tech", "tutorial"]
---

# Hello World

Your content goes here...
```

Restart the dev server and your post will appear!

## Deploy to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables (if using Appwrite)
5. Click "Deploy"

Done! Your site is live in ~60 seconds.

## Next Steps

1. **Customize Design**: Edit colors in [tailwind.config.js](tailwind.config.js)
2. **Set Up Appwrite**: Follow [APPWRITE_SETUP.md](APPWRITE_SETUP.md)
3. **Add Content**: Create more blog posts in `content/posts/`
4. **Configure Domain**: Add custom domain in Vercel dashboard

## Need Help?

- 📖 Full setup guide: [APPWRITE_SETUP.md](APPWRITE_SETUP.md)
- 📚 Feature overview: [INTEGRATION_SUMMARY.md](INTEGRATION_SUMMARY.md)
- 📝 Main docs: [README.md](README.md)

## Common Issues

### Build errors about Appwrite

Normal if you haven't set up `.env.local` yet. The site will still build, features just won't work without Appwrite configuration.

### Newsletter/Comments not working

You need to set up Appwrite and configure environment variables. See [APPWRITE_SETUP.md](APPWRITE_SETUP.md).

### Can't access /admin

You need to:

1. Set up Appwrite
2. Create a user account
3. Add `admin` label to that user in Appwrite Console

---

**Ready to go?** Run `npm run dev` and start building! 🚀
