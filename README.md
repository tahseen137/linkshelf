# 🔖 LinkShelf

**Save links. Stay organized. Share collections.**

A beautiful, modern bookmark manager built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ Features

- 🚀 **Auto-Fetch Titles** - Just paste a URL and we automatically fetch the page title
- 📁 **Smart Collections** - Organize links into collections with drag-and-drop support
- 🌐 **Public Sharing** - Share collections publicly with beautiful read-only views
- 🔍 **Fast Search** - Quickly find any link across all your collections
- 🎨 **Beautiful Dark UI** - Glassmorphism design with teal/cyan accents
- 💾 **Client-Side Storage** - Uses localStorage for MVP (no backend required)

## 🚀 Live Demo

🔗 **Production:** https://linkshelf-2y4j13iny-tahseen-rahmans-projects-58bcf065.vercel.app

## 📦 Pages

1. **Landing Page** (`/`) - Hero section with features and pricing
2. **Dashboard** (`/dashboard`) - Main app interface for managing links and collections
3. **Public Collection** (`/c/[id]`) - Beautiful public view of shared collections
4. **API Routes** (`/api/links`, `/api/collections`) - Backend API endpoints

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Web Scraping:** Cheerio (for title fetching)
- **Deployment:** Vercel
- **Storage:** LocalStorage (MVP)

## 📋 Pricing

- **Free:** Up to 100 links, unlimited collections, public sharing
- **Pro ($5/mo):** Unlimited links, unlimited collections, priority support

## 🏗️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📂 Project Structure

```
linkshelf/
├── app/
│   ├── page.tsx              # Landing page
│   ├── dashboard/page.tsx    # Main dashboard
│   ├── c/[id]/page.tsx       # Public collection view
│   ├── api/
│   │   ├── links/route.ts    # Links API endpoint
│   │   └── collections/route.ts  # Collections API endpoint
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── types/
│   └── index.ts              # TypeScript types
└── public/                   # Static assets
```

## 🔗 Links

- **GitHub:** https://github.com/tahseen137/linkshelf
- **Vercel:** https://linkshelf-2y4j13iny-tahseen-rahmans-projects-58bcf065.vercel.app

## 📝 License

MIT License - feel free to use this project however you'd like!

---

Built with ❤️ for organizing the web
