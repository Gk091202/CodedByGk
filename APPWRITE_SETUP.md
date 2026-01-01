# Appwrite Setup Guide

This guide will walk you through setting up Appwrite for your blog.

## Step 1: Create Appwrite Account

1. Go to [cloud.appwrite.io](https://cloud.appwrite.io)
2. Sign up for a free account
3. Create a new project and name it (e.g., "My Blog")

## Step 2: Get Project Credentials

1. In your project dashboard, click on **Settings**
2. Copy your **Project ID** - you'll need this for `.env.local`

## Step 3: Create Database

1. Navigate to **Databases** in the left sidebar
2. Click **Create Database**
3. Name it "blog-data" or similar
4. Copy the **Database ID**

## Step 4: Create Collections

### Newsletter Collection

1. In your database, click **Create Collection**
2. Name: `newsletter`
3. Copy the **Collection ID** (or use "newsletter")
4. Add these attributes:

   - **email**: String, 255 characters, Required
   - **name**: String, 255 characters, Not Required
   - **subscribedAt**: String, 255 characters, Required

5. Set Permissions:
   - Click **Settings** → **Permissions**
   - **Create**: Select "Any"
   - **Read**: Select "Role:all" (or limit to admin)
   - **Update**: None
   - **Delete**: Admin only (or none)

### Comments Collection

1. Click **Create Collection** again
2. Name: `comments`
3. Copy the **Collection ID** (or use "comments")
4. Add these attributes:

   - **postSlug**: String, 255 characters, Required
   - **content**: String, 10000 characters, Required
   - **userId**: String, 255 characters, Required
   - **userName**: String, 255 characters, Required
   - **createdAt**: String, 255 characters, Required

5. Set Permissions:
   - **Create**: Select "Users" (any authenticated user)
   - **Read**: Select "Any"
   - **Update**: Select "Users" (for editing)
   - **Delete**: Select "Users" (creator can delete)

## Step 5: Enable Authentication

1. Navigate to **Auth** in the left sidebar
2. Click **Settings**
3. Make sure these are enabled:
   - Email/Password (should be enabled by default)
   - Session length: 365 days (or your preference)

## Step 6: Configure Environment Variables

1. In your project root, copy `.env.local.example` to `.env.local`:

   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```bash
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id-here
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your-database-id-here
   NEXT_PUBLIC_APPWRITE_NEWSLETTER_COLLECTION_ID=newsletter
   NEXT_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID=comments
   ```

## Step 7: Create Admin User

1. Go to **Auth** → **Users**
2. Either:
   - Create a new user with email/password, OR
   - Sign up through your blog's signup form
3. Click on the user
4. Scroll down to **Labels**
5. Add label: `admin`
6. Click **Update**

Now this user will have access to `/admin` route!

## Step 8: Test Everything

### Test Newsletter

1. Start your dev server: `npm run dev`
2. Go to home page
3. Try subscribing with an email
4. Check Appwrite Console → Databases → newsletter collection

### Test Authentication

1. Click "Login / Sign Up" in navigation
2. Create an account
3. Check Appwrite Console → Auth → Users

### Test Comments

1. Login to your account
2. Go to any blog post
3. Write a comment
4. Check Appwrite Console → Databases → comments collection

### Test Admin Dashboard

1. Login with admin account (with `admin` label)
2. Navigate to `/admin`
3. You should see the dashboard

## Troubleshooting

### "Unauthorized" errors

- Check that your Project ID is correct in `.env.local`
- Restart your dev server after changing env variables
- Check collection permissions in Appwrite Console

### Can't create account

- Go to Appwrite Console → Auth → Settings
- Make sure Email/Password auth is enabled
- Check password requirements (minimum 8 characters)

### Comments not showing

- Check collection permissions (Read should be "Any")
- Make sure COMMENTS_COLLECTION_ID matches in both .env and Appwrite

### Newsletter signup fails

- Check collection permissions (Create should be "Any")
- Verify Database ID and Collection ID match

## Next Steps

### Extend the Admin Dashboard

Edit `app/admin/page.tsx` to fetch real statistics:

```tsx
import { databases } from "@/lib/appwrite";

// Fetch newsletter count
const newsletterDocs = await databases.listDocuments(
  DATABASE_ID,
  NEWSLETTER_COLLECTION_ID
);
const subscriberCount = newsletterDocs.total;
```

### Add Email Notifications

Set up Appwrite Functions to send emails when:

- Someone subscribes to newsletter
- New comment is posted
- User signs up

### Add More Features

- Like/reaction system for posts
- User profiles
- Bookmarks/saved posts
- Search functionality with Appwrite queries

## Resources

- [Appwrite Documentation](https://appwrite.io/docs)
- [Next.js + Appwrite Guide](https://appwrite.io/docs/quick-starts/nextjs)
- [Appwrite Discord Community](https://appwrite.io/discord)

---

Need help? Check the Appwrite docs or open an issue!
