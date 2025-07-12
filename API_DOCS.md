# 📚 API Documentation - Bubbly Chat

This document provides detailed information about all API endpoints in the Bubbly Chat Discord clone application.

## 🔐 Authentication

All API endpoints require authentication through Clerk. The authentication is handled by middleware that checks for valid user sessions.

### Headers Required

```
Authorization: Bearer <clerk-session-token>
Content-Type: application/json
```

## 🏠 Server Management

### Create Server

**POST** `/api/servers`

Creates a new Discord-like server with the authenticated user as admin.

#### Request Body

```json
{
  "name": "My Awesome Server",
  "imageUrl": "https://example.com/server-image.jpg"
}
```

#### Response (201 Created)

```json
{
  "id": "server-uuid",
  "name": "My Awesome Server",
  "imageUrl": "https://example.com/server-image.jpg",
  "inviteCode": "unique-invite-code",
  "profileId": "profile-uuid",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z",
  "channels": [
    {
      "id": "channel-uuid",
      "name": "general",
      "type": "TEXT",
      "profileId": "profile-uuid",
      "serverId": "server-uuid"
    }
  ],
  "members": [
    {
      "id": "member-uuid",
      "role": "ADMIN",
      "profileId": "profile-uuid",
      "serverId": "server-uuid"
    }
  ]
}
```

#### Error Responses

- `401 Unauthorized`: User not authenticated
- `500 Internal Error`: Server error

---

### Update Server

**PATCH** `/api/servers/[serverId]`

Updates server details. Only server owner can update.

#### Request Body

```json
{
  "name": "Updated Server Name",
  "imageUrl": "https://example.com/new-image.jpg"
}
```

#### Response (200 OK)

```json
{
  "id": "server-uuid",
  "name": "Updated Server Name",
  "imageUrl": "https://example.com/new-image.jpg",
  "inviteCode": "existing-invite-code",
  "profileId": "profile-uuid",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

#### Error Responses

- `401 Unauthorized`: User not authenticated or not server owner
- `500 Internal Server Error`: Server error

---

### Delete Server

**DELETE** `/api/servers/[serverId]`

Deletes a server. Only server owner can delete.

#### Response (200 OK)

```json
{
  "id": "server-uuid",
  "name": "Deleted Server",
  "imageUrl": "https://example.com/image.jpg",
  "inviteCode": "invite-code",
  "profileId": "profile-uuid",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

#### Error Responses

- `401 Unauthorized`: User not authenticated or not server owner
- `400 Bad Request`: Server ID missing
- `500 Internal Server Error`: Server error

---

### Regenerate Invite Code

**PATCH** `/api/servers/[serverId]/invite-code`

Generates a new invite code for the server. Only server owner can regenerate.

#### Response (200 OK)

```json
{
  "id": "server-uuid",
  "name": "My Server",
  "imageUrl": "https://example.com/image.jpg",
  "inviteCode": "new-unique-invite-code",
  "profileId": "profile-uuid",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T11:15:00Z"
}
```

#### Error Responses

- `401 Unauthorized`: User not authenticated or not server owner
- `400 Bad Request`: Server ID missing
- `500 Internal Error`: Server error

---

### Leave Server

**PATCH** `/api/servers/[serverId]/leave`

Allows a user to leave a server. Server owner cannot leave their own server.

#### Response (200 OK)

```json
{
  "id": "server-uuid",
  "name": "Server Name",
  "imageUrl": "https://example.com/image.jpg",
  "inviteCode": "invite-code",
  "profileId": "profile-uuid",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T11:20:00Z"
}
```

#### Error Responses

- `401 Unauthorized`: User not authenticated
- `500 Internal Server Error`: Server error

---

## 📺 Channel Management

### Update Channel

**PATCH** `/api/channels/[channelId]?serverId=[serverId]`

Updates channel details. Only admins and moderators can update channels.

#### Query Parameters

- `serverId`: Server ID (required)

#### Request Body

```json
{
  "name": "updated-channel-name",
  "type": "TEXT" // or "AUDIO" or "VIDEO"
}
```

#### Response (200 OK)

```json
{
  "id": "server-uuid",
  "name": "My Server",
  "imageUrl": "https://example.com/image.jpg",
  "inviteCode": "invite-code",
  "profileId": "profile-uuid",
  "channels": [
    {
      "id": "channel-uuid",
      "name": "updated-channel-name",
      "type": "TEXT",
      "profileId": "profile-uuid",
      "serverId": "server-uuid"
    }
  ],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T11:25:00Z"
}
```

#### Error Responses

- `401 Unauthorized`: User not authenticated or insufficient permissions
- `400 Bad Request`: Server ID or Channel ID missing, or trying to name channel "general"
- `500 Internal Error`: Server error

---

### Delete Channel

**DELETE** `/api/channels/[channelId]?serverId=[serverId]`

Deletes a channel. Only admins and moderators can delete channels. Cannot delete "general" channel.

#### Query Parameters

- `serverId`: Server ID (required)

#### Response (200 OK)

```json
{
  "id": "server-uuid",
  "name": "My Server",
  "imageUrl": "https://example.com/image.jpg",
  "inviteCode": "invite-code",
  "profileId": "profile-uuid",
  "channels": [
    // remaining channels after deletion
  ],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T11:30:00Z"
}
```

#### Error Responses

- `401 Unauthorized`: User not authenticated or insufficient permissions
- `400 Bad Request`: Server ID or Channel ID missing
- `500 Internal Error`: Server error

---

## 👥 Member Management

### Update Member Role

**PATCH** `/api/members/[memberId]?serverId=[serverId]`

Updates a member's role in the server. Only server owner can update member roles.

#### Query Parameters

- `serverId`: Server ID (required)

#### Request Body

```json
{
  "role": "MODERATOR" // or "ADMIN" or "GUEST"
}
```

#### Response (200 OK)

```json
{
  "id": "server-uuid",
  "name": "My Server",
  "imageUrl": "https://example.com/image.jpg",
  "inviteCode": "invite-code",
  "profileId": "profile-uuid",
  "members": [
    {
      "id": "member-uuid",
      "role": "MODERATOR",
      "profileId": "profile-uuid",
      "serverId": "server-uuid",
      "profile": {
        "id": "profile-uuid",
        "userId": "clerk-user-id",
        "name": "User Name",
        "imageUrl": "https://example.com/avatar.jpg",
        "email": "user@example.com"
      }
    }
  ],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T11:35:00Z"
}
```

#### Error Responses

- `401 Unauthorized`: User not authenticated or not server owner
- `400 Bad Request`: Server ID or Member ID missing
- `500 Internal Error`: Server error

---

### Remove Member

**DELETE** `/api/members/[memberId]?serverId=[serverId]`

Removes a member from the server. Only server owner can remove members.

#### Query Parameters

- `serverId`: Server ID (required)

#### Response (200 OK)

```json
{
  "id": "server-uuid",
  "name": "My Server",
  "imageUrl": "https://example.com/image.jpg",
  "inviteCode": "invite-code",
  "profileId": "profile-uuid",
  "members": [
    // remaining members after removal
  ],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T11:40:00Z"
}
```

#### Error Responses

- `401 Unauthorized`: User not authenticated or not server owner
- `400 Bad Request`: Server ID or Member ID missing
- `500 Internal Error`: Server error

---

## 💬 Message Management

### Get Channel Messages

**GET** `/api/messages?channelId=[channelId]&cursor=[cursor]`

Retrieves paginated messages from a channel.

#### Query Parameters

- `channelId`: Channel ID (required)
- `cursor`: Cursor for pagination (optional)

#### Response (200 OK)

```json
{
  "items": [
    {
      "id": "message-uuid",
      "content": "Hello everyone!",
      "fileUrl": null,
      "deleted": false,
      "memberId": "member-uuid",
      "channelId": "channel-uuid",
      "createdAt": "2024-01-15T12:00:00Z",
      "updatedAt": "2024-01-15T12:00:00Z",
      "member": {
        "id": "member-uuid",
        "role": "ADMIN",
        "profileId": "profile-uuid",
        "serverId": "server-uuid",
        "profile": {
          "id": "profile-uuid",
          "userId": "clerk-user-id",
          "name": "User Name",
          "imageUrl": "https://example.com/avatar.jpg",
          "email": "user@example.com"
        }
      }
    }
  ],
  "nextCursor": "next-cursor-id" // null if no more messages
}
```

#### Error Responses

- `401 Unauthorized`: User not authenticated
- `400 Bad Request`: Channel ID missing
- `500 Internal Error`: Server error

---

### Get Direct Messages

**GET** `/api/direct-messages?conversationId=[conversationId]&cursor=[cursor]`

Retrieves paginated direct messages from a conversation.

#### Query Parameters

- `conversationId`: Conversation ID (required)
- `cursor`: Cursor for pagination (optional)

#### Response (200 OK)

```json
{
  "items": [
    {
      "id": "direct-message-uuid",
      "content": "Hey, how are you?",
      "fileUrl": null,
      "deleted": false,
      "memberId": "member-uuid",
      "conversationId": "conversation-uuid",
      "createdAt": "2024-01-15T12:30:00Z",
      "updatedAt": "2024-01-15T12:30:00Z",
      "member": {
        "id": "member-uuid",
        "role": "GUEST",
        "profileId": "profile-uuid",
        "serverId": "server-uuid",
        "profile": {
          "id": "profile-uuid",
          "userId": "clerk-user-id",
          "name": "User Name",
          "imageUrl": "https://example.com/avatar.jpg",
          "email": "user@example.com"
        }
      }
    }
  ],
  "nextCursor": "next-cursor-id" // null if no more messages
}
```

#### Error Responses

- `401 Unauthorized`: User not authenticated
- `400 Bad Request`: Conversation ID missing
- `500 Internal Error`: Server error

---

## 📎 File Upload

### Upload Files

**POST** `/api/uploadthing`

Handles file uploads for server images and message attachments.

#### Upload Types

- `serverImage`: Server icons (images only, max 4MB)
- `messageFile`: Message attachments (images and PDFs)

#### Request

Multipart form data with file upload.

#### Response (200 OK)

```json
{
  "url": "https://uploadthing.com/f/uploaded-file-url",
  "key": "file-key",
  "name": "original-filename.jpg",
  "size": 1234567
}
```

#### Error Responses

- `401 Unauthorized`: User not authenticated
- `413 Payload Too Large`: File too large
- `415 Unsupported Media Type`: Invalid file type
- `500 Internal Error`: Upload failed

---

## 🎥 LiveKit Integration (Optional)

### Get Access Token

**GET** `/api/livekit?room=[roomId]&username=[username]`

Generates LiveKit access token for video/audio calls.

> **Note**: This endpoint is currently commented out in the codebase. Uncomment and configure LiveKit environment variables to use.

#### Query Parameters

- `room`: Room ID (required)
- `username`: Username (required)

#### Response (200 OK)

```json
{
  "token": "livekit-jwt-token"
}
```

#### Error Responses

- `400 Bad Request`: Missing room or username parameter
- `500 Server misconfigured`: Missing LiveKit environment variables

---

## 🔧 Environment Variables

The following environment variables are required:

```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# File Upload
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="app_id"
UPLOADTHING_TOKEN="token"

# LiveKit (Optional)
LIVEKIT_API_KEY="api_key"
LIVEKIT_API_SECRET="api_secret"
NEXT_PUBLIC_LIVEKIT_URL="wss://..."
```

---

## 🚀 Rate Limiting

Currently, no rate limiting is implemented. Consider adding rate limiting for production use.

## 📊 Error Handling

All endpoints follow consistent error response format:

```json
{
  "error": "Error message",
  "status": 400
}
```

Common HTTP status codes:

- `200 OK`: Success
- `201 Created`: Resource created
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## 🔍 Testing

See the main README for information about testing the API endpoints with tools like Postman or curl.

For questions or issues, please refer to the main project repository.
