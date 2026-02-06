'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Bookmark, ExternalLink, Folder } from 'lucide-react'
import type { Link as LinkType, Collection } from '@/types'

export default function PublicCollection({ params }: { params: { id: string } }) {
  const [collection, setCollection] = useState<Collection | null>(null)
  const [links, setLinks] = useState<LinkType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load from localStorage
    const savedCollections = localStorage.getItem('linkshelf_collections')
    const savedLinks = localStorage.getItem('linkshelf_links')
    
    if (savedCollections && savedLinks) {
      const collections: Collection[] = JSON.parse(savedCollections)
      const allLinks: LinkType[] = JSON.parse(savedLinks)
      
      const foundCollection = collections.find(c => c.id === params.id)
      
      if (foundCollection && foundCollection.isPublic) {
        setCollection(foundCollection)
        setLinks(allLinks.filter(link => link.collectionId === params.id))
      }
    }
    
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!collection || !collection.isPublic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
        <nav className="border-b border-white/10 backdrop-blur-sm bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <Bookmark className="w-8 h-8 text-teal-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                LinkShelf
              </span>
            </Link>
          </div>
        </nav>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-12">
            <Folder className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Collection Not Found</h1>
            <p className="text-slate-400 mb-6">
              This collection doesn&apos;t exist or isn&apos;t public.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-lg font-medium transition-all"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
      {/* Header */}
      <nav className="border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <Bookmark className="w-8 h-8 text-teal-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              LinkShelf
            </span>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Collection Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Folder className="w-8 h-8 text-teal-400" />
            <h1 className="text-4xl font-bold text-white">{collection.name}</h1>
          </div>
          <p className="text-slate-400">
            {links.length} {links.length === 1 ? 'link' : 'links'}
          </p>
        </div>

        {/* Links */}
        <div className="space-y-3">
          {links.length === 0 ? (
            <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-12 text-center">
              <Bookmark className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No links in this collection yet.</p>
            </div>
          ) : (
            links.map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 hover:border-teal-400/30 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium mb-2 group-hover:text-teal-400 transition-colors">
                      {link.title}
                    </h3>
                    <div className="text-slate-400 text-sm flex items-center gap-2 truncate">
                      <ExternalLink className="w-4 h-4 flex-shrink-0" />
                      {link.url}
                    </div>
                  </div>
                </div>
              </a>
            ))
          )}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-sm border border-teal-400/30 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Create your own collections
          </h2>
          <p className="text-slate-300 mb-6">
            Start organizing your links with LinkShelf
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-lg font-medium transition-all shadow-lg shadow-teal-500/20"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  )
}
