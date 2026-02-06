import Link from 'next/link'
import { Bookmark, FolderOpen, Share2, Zap, Shield, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-8 h-8 text-teal-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                LinkShelf
              </span>
            </div>
            <Link 
              href="/dashboard"
              className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-lg font-medium transition-all shadow-lg shadow-teal-500/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-6xl sm:text-7xl font-bold text-white leading-tight">
            Save links.
            <br />
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Stay organized.
            </span>
            <br />
            Share collections.
          </h1>
          
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            The beautiful bookmark manager that fetches titles automatically, 
            organizes your links, and lets you share collections with the world.
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl font-semibold text-lg transition-all shadow-xl shadow-teal-500/30 hover:scale-105"
            >
              Start Organizing
            </Link>
            <a
              href="#features"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold text-lg transition-all backdrop-blur-sm border border-white/10"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="grid md:grid-cols-3 gap-6 mt-32">
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Auto-Fetch Titles</h3>
            <p className="text-slate-300">
              Just paste a URL. We automatically fetch and save the page title for you.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mb-4">
              <FolderOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Smart Collections</h3>
            <p className="text-slate-300">
              Organize links into collections. Drag, drop, and keep everything tidy.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mb-4">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Share Publicly</h3>
            <p className="text-slate-300">
              Make collections public and share beautiful link pages with anyone.
            </p>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-32">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Simple, transparent pricing
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-teal-400" />
                <h3 className="text-2xl font-bold text-white">Free</h3>
              </div>
              <div className="text-4xl font-bold text-white mb-4">$0<span className="text-lg text-slate-400">/mo</span></div>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                  Up to 100 links
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                  Unlimited collections
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                  Public sharing
                </li>
              </ul>
              <Link
                href="/dashboard"
                className="mt-6 w-full block text-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all"
              >
                Get Started
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-sm border border-teal-400/30 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Sparkles className="w-5 h-5 text-teal-400" />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-teal-400" />
                <h3 className="text-2xl font-bold text-white">Pro</h3>
              </div>
              <div className="text-4xl font-bold text-white mb-4">$5<span className="text-lg text-slate-400">/mo</span></div>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                  Unlimited links
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                  Unlimited collections
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                  Priority support
                </li>
              </ul>
              <Link
                href="/dashboard"
                className="mt-6 w-full block text-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-lg font-medium transition-all shadow-lg shadow-teal-500/20"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-400">
          <p>Built with ❤️ for organizing the web</p>
        </div>
      </footer>
    </div>
  )
}
