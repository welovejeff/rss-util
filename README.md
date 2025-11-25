# rss-util

An RSS reader designed for maximum utility.

## Description

A simple desktop RSS reader application for Mac built with Electron. The application features a clean three-panel layout:
- **Left sidebar**: Feed subscriptions and folders
- **Middle panel**: Article list
- **Right panel**: Article preview/content

![Main Interface](screenshots/main-interface.png)

## Features

- Clean, intuitive three-panel interface
- Organize feeds into custom categories/folders
- Track read/unread status of articles
- Automatic feed refresh on startup
- Feed health monitoring
- OPML import/export support (coming soon)

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/busse/rss-util.git
cd rss-util
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required dependencies including Electron and the RSS parser.

### Step 3: Run the Application

```bash
npm start
```

The application will launch in a new window. On first launch, you'll see an empty state with no feeds subscribed.

![Empty State](screenshots/empty-state.png)

## Usage

### Adding Feeds

1. Click the **"Manage"** button in the top-left corner of the sidebar
2. Click the **"+ Add Feed"** button
3. Enter the RSS feed URL (e.g., `https://example.com/feed.xml`)
4. Optionally provide a custom name for the feed (otherwise it will use the feed's title)
5. Select a category/folder if you want to organize it
6. Click **"Add Feed"**

The feed will be fetched automatically and articles will appear in your reader.

### Organizing Feeds into Categories

1. Go to the Feed Management page (click "Manage" in the sidebar)
2. Click the **"+"** button next to "Categories" in the left sidebar
3. Enter a category name and choose an icon
4. Click **"Add Category"**
5. When adding or editing feeds, select the category from the dropdown

Feeds can be organized into multiple categories to help you stay organized.

### Reading Articles

1. Click on a feed in the left sidebar to view its articles
2. Click on an article in the middle panel to read it in the preview pane
3. Articles are automatically marked as read when you click on them
4. Unread articles are shown in bold with an unread count badge

### Navigation

- **Left Sidebar**: Browse feeds and categories
- **Middle Panel**: View article list for the selected feed/category
- **Right Panel**: Read article content
- **"All Articles"**: View all articles from all feeds in chronological order

![Feed Management](screenshots/feed-management.png)

### Feed Management

The Feed Management page allows you to:
- Add, edit, and delete feeds
- Create and organize categories
- Refresh individual feeds or all feeds at once
- Monitor feed health status
- Import/export OPML files (coming soon)

## Development

This project uses Electron to create a cross-platform desktop application. The main files are:

- `main.js` - Electron main process
- `index.html` - Main reader interface
- `manage.html` - Feed management interface
- `preload.js` - Secure IPC bridge between main and renderer processes

### Generating Screenshots

To regenerate screenshots for the README:

```bash
npm run screenshots
```

This will create screenshots in the `screenshots/` directory using Playwright.

## Contributing

We welcome contributions! If you have ideas for new features, improvements, or bug fixes, please:

1. **Request Features**: Open an issue on GitHub using the [Issues tab](https://github.com/yourusername/rss-util/issues) and describe the feature you'd like to see
2. **Report Bugs**: If you encounter any issues, please report them via the Issues tab
3. **Submit Pull Requests**: If you'd like to contribute code, fork the repository, make your changes, and submit a pull request

Your feedback and contributions help make rss-util better for everyone!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
