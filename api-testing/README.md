# 🧪 API Testing Guide

This directory contains tools and examples for testing the Bubbly Chat API endpoints.

## 📋 Table of Contents

1. [Setup](#setup)
2. [Using cURL](#using-curl)
3. [Using Postman](#using-postman)
4. [Using Node.js Scripts](#using-nodejs-scripts)
5. [Authentication](#authentication)
6. [Common Test Scenarios](#common-test-scenarios)

## 🚀 Setup

### Prerequisites

- Your Discord clone application running locally on port 1420
- Valid Clerk authentication token
- Environment variables configured

### Getting Authentication Token

1. **Sign in to your app** through the frontend
2. **Open browser DevTools** (F12)
3. **Go to Application/Storage > Local Storage**
4. **Find your Clerk session token** or use the network tab to capture it from requests

## 💻 Using cURL

### Basic Examples

#### Create a Server

```bash
curl -X POST "http://localhost:1420/api/servers" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -d '{
    "name": "Test Server",
    "imageUrl": "https://example.com/server-image.jpg"
  }'
```

#### Get Messages from Channel

```bash
curl -X GET "http://localhost:1420/api/messages?channelId=YOUR_CHANNEL_ID" \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN"
```

#### Update Server

```bash
curl -X PATCH "http://localhost:1420/api/servers/YOUR_SERVER_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -d '{
    "name": "Updated Server Name",
    "imageUrl": "https://example.com/new-image.jpg"
  }'
```

#### Delete Channel

```bash
curl -X DELETE "http://localhost:1420/api/channels/YOUR_CHANNEL_ID?serverId=YOUR_SERVER_ID" \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN"
```

### Advanced Examples

#### Get Paginated Messages

```bash
curl -X GET "http://localhost:1420/api/messages?channelId=YOUR_CHANNEL_ID&cursor=YOUR_CURSOR" \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN"
```

#### Update Member Role

```bash
curl -X PATCH "http://localhost:1420/api/members/YOUR_MEMBER_ID?serverId=YOUR_SERVER_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  -d '{
    "role": "MODERATOR"
  }'
```

## 📮 Using Postman

### Import Collection

1. **Import the collection** from `postman-collection.json`
2. **Set up environment variables**:
   - `base_url`: `http://localhost:1420`
   - `auth_token`: Your Clerk authentication token
   - `server_id`: A valid server ID
   - `channel_id`: A valid channel ID
   - `member_id`: A valid member ID

### Environment Variables

Create a Postman environment with these variables:

```json
{
  "base_url": "http://localhost:1420",
  "auth_token": "your_clerk_token_here",
  "server_id": "server_uuid_here",
  "channel_id": "channel_uuid_here",
  "member_id": "member_uuid_here",
  "conversation_id": "conversation_uuid_here"
}
```

### Running Tests

1. **Start your local server**: `pnpm run dev`
2. **Get authentication token** from your browser
3. **Update environment variables** in Postman
4. **Run individual requests** or the entire collection

## 🟢 Using Node.js Scripts

### Setup

```bash
npm install axios dotenv
```

### Example Test Script

See `test-api.js` for a complete example that tests all endpoints.

### Running Tests

```bash
node test-api.js
```

## 🔐 Authentication

### Getting Clerk Token

#### Method 1: Browser DevTools

1. Open your app in browser
2. Sign in
3. Open DevTools (F12)
4. Go to Network tab
5. Make a request to any API endpoint
6. Copy the `Authorization` header value

#### Method 2: Clerk Dashboard

1. Go to your Clerk dashboard
2. Navigate to Users section
3. Find your user
4. Generate a session token for testing

#### Method 3: Frontend Console

```javascript
// Run in browser console while signed in
const token = await window.Clerk.session.getToken()
console.log(token)
```

## 🎯 Common Test Scenarios

### 1. Full Server Workflow

```bash
# 1. Create server
curl -X POST "http://localhost:1420/api/servers" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name": "Test Server", "imageUrl": "https://example.com/image.jpg"}'

# 2. Update server (use server ID from response)
curl -X PATCH "http://localhost:1420/api/servers/SERVER_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name": "Updated Server"}'

# 3. Generate new invite code
curl -X PATCH "http://localhost:1420/api/servers/SERVER_ID/invite-code" \
  -H "Authorization: Bearer YOUR_TOKEN"

# 4. Delete server
curl -X DELETE "http://localhost:1420/api/servers/SERVER_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Channel Management

```bash
# Update channel
curl -X PATCH "http://localhost:1420/api/channels/CHANNEL_ID?serverId=SERVER_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name": "new-channel-name", "type": "TEXT"}'

# Delete channel
curl -X DELETE "http://localhost:1420/api/channels/CHANNEL_ID?serverId=SERVER_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Message Retrieval

```bash
# Get channel messages
curl -X GET "http://localhost:1420/api/messages?channelId=CHANNEL_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get direct messages
curl -X GET "http://localhost:1420/api/direct-messages?conversationId=CONVERSATION_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Member Management

```bash
# Update member role
curl -X PATCH "http://localhost:1420/api/members/MEMBER_ID?serverId=SERVER_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"role": "MODERATOR"}'

# Remove member
curl -X DELETE "http://localhost:1420/api/members/MEMBER_ID?serverId=SERVER_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🐛 Debugging Tips

### Common Issues

1. **401 Unauthorized**: Check your authentication token
2. **400 Bad Request**: Verify request body and parameters
3. **500 Internal Error**: Check server logs and database connection
4. **CORS Issues**: Ensure your local server is running on port 1420

### Debug Headers

Add these headers to see more information:

```bash
curl -v -X GET "http://localhost:1420/api/messages?channelId=YOUR_CHANNEL_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Check Server Logs

Monitor your Next.js development server logs for detailed error messages.

## 📊 Response Examples

### Success Response

```json
{
  "id": "server-uuid",
  "name": "Test Server",
  "imageUrl": "https://example.com/image.jpg",
  "inviteCode": "ABC123",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Error Response

```json
{
  "error": "Unauthorized",
  "status": 401
}
```

## 🚀 Advanced Testing

### Load Testing

Use tools like:

- [Artillery](https://artillery.io/)
- [Apache Bench](https://httpd.apache.org/docs/2.4/programs/ab.html)
- [k6](https://k6.io/)

### Integration Testing

Consider using:

- [Jest](https://jestjs.io/) with [Supertest](https://github.com/visionmedia/supertest)
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/) for end-to-end tests

## 📝 Notes

- Always use HTTPS in production
- Implement rate limiting for production APIs
- Consider API versioning for future updates
- Monitor API performance and errors

For more detailed API documentation, see [API_DOCS.md](../API_DOCS.md).
