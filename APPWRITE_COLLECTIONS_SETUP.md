# Appwrite Collections Setup Guide

## Problem: Comments/Newsletter Not Working

The collection IDs in your `.env.local` are set to generic names (`newsletter`, `comments`), but they need to be the actual collection IDs from Appwrite.

## Step-by-Step Setup

### 1. Create Comments Collection

1. Go to https://cloud.appwrite.io/console
2. Select your project: `69567a79001ba4418033`
3. Click on **Databases** in the left sidebar
4. Select your database: `69567bbd001b5a838309`
5. Click **+ Create Collection**
6. Set **Collection Name**: `comments`
7. Click **Create**
8. **Copy the Collection ID** (it will look like: `659abc123def456789`)

### 2. Configure Comments Collection Attributes

After creating the collection, add these attributes:

| Attribute Key | Type   | Size | Required | Default |
| ------------- | ------ | ---- | -------- | ------- |
| `postSlug`    | String | 255  | Yes      | -       |
| `content`     | String | 5000 | Yes      | -       |
| `userId`      | String | 255  | Yes      | -       |
| `userName`    | String | 255  | Yes      | -       |
| `createdAt`   | String | 100  | Yes      | -       |

### 3. Set Comments Collection Permissions

Click on **Settings** tab in the collection:

**Read Access (Anyone):**

- Add role: `Any`
- Permission: `Read`

**Create Access (Authenticated Users):**

- Add role: `Users`
- Permission: `Create`

**Delete Access (Owner + Admin):**

- Add role: `Users`
- Permission: `Delete`

### 4. Create Indexes

Create an index for better query performance:

- **Key**: `postSlug_index`
- **Type**: Key
- **Attributes**: `postSlug` (Ascending)

### 5. Create Newsletter Collection (Optional)

Repeat steps 1-3 for newsletter collection with these attributes:

| Attribute Key  | Type   | Size | Required | Default |
| -------------- | ------ | ---- | -------- | ------- |
| `email`        | String | 320  | Yes      | -       |
| `name`         | String | 255  | No       | -       |
| `subscribedAt` | String | 100  | Yes      | -       |

**Newsletter Permissions:**

- Read: `Any`
- Create: `Any`
- Delete: Admin only

### 6. Update .env.local File

Replace the placeholder collection IDs with the actual IDs you copied:

```env
# BEFORE (❌ Wrong)
NEXT_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID=comments
NEXT_PUBLIC_APPWRITE_NEWSLETTER_COLLECTION_ID=newsletter

# AFTER (✅ Correct)
NEXT_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID=659abc123def456789
NEXT_PUBLIC_APPWRITE_NEWSLETTER_COLLECTION_ID=659xyz987fed654321
```

### 7. Restart Your Dev Server

After updating `.env.local`:

```bash
# Stop the server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

## Quick Check

Open browser console and run:

```javascript
console.log({
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
  commentsId: process.env.NEXT_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID,
});
```

All values should be alphanumeric IDs, not names!

## Common Issues

### "Collection not found"

- Check that the collection ID in `.env.local` matches exactly what's in Appwrite Console
- Make sure you restarted the dev server after updating `.env.local`

### "Unauthorized"

- Check collection permissions in Appwrite Console
- Ensure users are authenticated before posting comments

### "Attribute not found"

- Verify all required attributes are created in the collection
- Check spelling of attribute keys (case-sensitive!)

## Need Help?

Check the Appwrite Console → Your Database → Your Collection:

- The Collection ID is shown in the collection header
- Attributes tab shows all fields
- Settings tab shows permissions
