# Fix "Failed to Fetch" Error - Appwrite Platform Setup

## The Problem

You're getting a "failed to fetch" error because localhost is not registered as a trusted platform in your Appwrite project.

## Solution - Add Platform in Appwrite Console

1. **Go to Appwrite Console**: https://cloud.appwrite.io/console

2. **Select your project**: `69567a79001ba4418033`

3. **Navigate to Settings**:

   - Click on your project
   - Go to "Settings" in the left sidebar
   - Click on "Platforms"

4. **Add Web Platform**:

   - Click "+ Add Platform"
   - Select "Web App"
   - Enter these details:
     - **Name**: `localhost` (or any name you prefer)
     - **Hostname**: `localhost`
     - **Port**: `3000` (or leave empty for any port)
   - Click "Next" or "Create"

5. **Save the platform**

## Alternative: Add Multiple Platforms

You might want to add these platforms:

- `localhost` (for development)
- `http://localhost:3000` (specific port)
- `127.0.0.1` (IP address)
- Your production domain when ready

## After Adding Platform

1. Refresh your browser at `http://localhost:3000`
2. Try logging in or signing up again
3. The authentication should now work!

## Verify Your Setup

Run this in browser console to test Appwrite connection:

```javascript
fetch("https://cloud.appwrite.io/v1/health")
  .then((r) => r.json())
  .then(console.log);
```

If you see a response with `status: "online"`, Appwrite is reachable!
