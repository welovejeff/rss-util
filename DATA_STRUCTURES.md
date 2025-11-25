# Data Structure Definitions

This document defines the data structures used for JSON file storage in the RSS reader application.

## File Locations

All data files are stored in the user data directory:
- **macOS**: `~/Library/Application Support/rss-util/data/`
- **Windows**: `%APPDATA%/rss-util/data/`
- **Linux**: `~/.config/rss-util/data/`

## feeds.json

Array of feed subscription objects.

```json
[
  {
    "id": "string (unique identifier)",
    "title": "string (feed name)",
    "url": "string (RSS/Atom feed URL)",
    "category": "string (category ID, optional)",
    "icon": "string (emoji or character, optional)",
    "lastUpdated": "string (ISO 8601 timestamp, optional)",
    "status": "string (healthy|warning|error, optional)"
  }
]
```

**Example:**
```json
[
  {
    "id": "feed-1",
    "title": "Tech News Daily",
    "url": "https://technews.example.com/feed",
    "category": "technology",
    "icon": "T",
    "lastUpdated": "2024-01-15T10:30:00Z",
    "status": "healthy"
  }
]
```

## categories.json

Array of category/folder objects.

```json
[
  {
    "id": "string (unique identifier)",
    "name": "string (category name)",
    "icon": "string (emoji, optional)"
  }
]
```

**Example:**
```json
[
  {
    "id": "technology",
    "name": "Technology",
    "icon": "💻"
  },
  {
    "id": "science",
    "name": "Science",
    "icon": "🔬"
  }
]
```

## read-states.json

Object mapping article IDs to their read status.

```json
{
  "articleId": {
    "read": "boolean",
    "readAt": "string (ISO 8601 timestamp, optional)"
  }
}
```

**Example:**
```json
{
  "article-123": {
    "read": true,
    "readAt": "2024-01-15T10:30:00Z"
  },
  "article-456": {
    "read": false
  }
}
```

## settings.json

Object containing application settings.

```json
{
  "refreshInterval": "number (minutes, optional)",
  "theme": "string (light|dark|auto, optional)",
  "autoRefresh": "boolean (optional)",
  "markAsReadOnScroll": "boolean (optional)"
}
```

**Example:**
```json
{
  "refreshInterval": 30,
  "theme": "auto",
  "autoRefresh": true,
  "markAsReadOnScroll": false
}
```

## Default Values

When files don't exist, the following defaults are returned:
- `feeds.json`: `[]` (empty array)
- `categories.json`: `[]` (empty array)
- `read-states.json`: `{}` (empty object)
- `settings.json`: `{}` (empty object)

