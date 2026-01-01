# Fix Database Not Found Error

## The Problem

You're getting: "Database with the requested ID '69567bbd001b5a838309' could not be found."

This means either:

1. The database doesn't exist in your Appwrite project
2. The database ID in `.env.local` is incorrect

## Solution: Verify or Create Database

### Step 1: Check if Database Exists

1. Go to https://cloud.appwrite.io/console (or https://nyc.cloud.appwrite.io/console)
2. Login and select your project: `69567a79001ba4418033`
3. Click **Databases** in the left sidebar
4. Do you see any databases listed?

### Option A: Database Already Exists

If you see a database:

1. Click on it
2. Copy the **Database ID** from the URL or header (it looks like: `65abc123def456`)
3. Update your `.env.local` with this ID:
   ```env
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=65abc123def456
   ```

### Option B: Create New Database

If no database exists:

1. Click **+ Create Database**
2. Enter a name: `blog_database` (or any name you prefer)
3. Click **Create**
4. **Copy the Database ID** that appears
5. Update your `.env.local`:
   ```env
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=YOUR_NEW_DATABASE_ID
   ```

### Step 2: Create Collections in This Database

After confirming/creating the database, create two collections:

#### Comments Collection:

1. Click **+ Create Collection**
2. Name: `comments`
3. Copy the Collection ID
4. Add attributes:
   - `postSlug` (String, 255, Required)
   - `content` (String, 5000, Required)
   - `userId` (String, 255, Required)
   - `userName` (String, 255, Required)
   - `createdAt` (String, 100, Required)
5. Set Permissions:
   - Read: `Any`
   - Create: `Users`
   - Delete: `Users`

#### Newsletter Collection:

1. Click **+ Create Collection**
2. Name: `newsletter`
3. Copy the Collection ID
4. Add attributes:
   - `email` (String, 320, Required)
   - `name` (String, 255, Optional)
   - `subscribedAt` (String, 100, Required)
5. Set Permissions:
   - Read: `Any`
   - Create: `Any`

### Step 3: Update .env.local with Real IDs

Your `.env.local` should look like this (with actual IDs, not names):

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=69567a79001ba4418033

# Database IDs - MUST BE ACTUAL IDS FROM APPWRITE CONSOLE
NEXT_PUBLIC_APPWRITE_DATABASE_ID=65abc123def456789    # ← Get from Databases page
NEXT_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID=65xyz987fed654321  # ← Get from Collection
NEXT_PUBLIC_APPWRITE_NEWSLETTER_COLLECTION_ID=65mno456ghi123456  # ← Get from Collection
```

### Step 4: Restart Development Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

## Quick Verification

After setup, check browser console for errors. The database and collection IDs should all be alphanumeric strings (like `65abc123def456`), NOT names like "comments" or "newsletter".

## Still Having Issues?

1. **Check your endpoint**: Make sure it matches your Appwrite Console URL

   - If your console is at `https://cloud.appwrite.io/console` → use `https://cloud.appwrite.io/v1`
   - If your console is at `https://nyc.cloud.appwrite.io/console` → use `https://nyc.cloud.appwrite.io/v1`

2. **Verify Project ID**: Make sure `69567a79001ba4418033` is correct by checking the URL in Appwrite Console

3. **Check all IDs are copied correctly** - they're case-sensitive!
