'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bookmark, Plus, Folder, Search, Trash2, ExternalLink, Share2, Home } from 'lucide-react'
import type { Link as LinkType, Collection } from '@/types'

export default function Dashboard() {
  const [links, setLinks] = useState<LinkType[]>([])
  const [collections, setCollections] = useState<Collection[]>([])
  const [newLinkUrl, setNewLinkUrl] = useState('')
  const [newCollectionName, setNewCollectionName] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)
  const [isAddingLink, setIsAddingLink] = useState(false)
  const [isAddingCollection, setIsAddingCollection] = useState(false)

  // Load from localStorage
  useEffect(() => {
    const savedLinks = localStorage.getItem('linkshelf_links')
    const savedCollections = localStorage.getItem('linkshelf_collections')
    
    if (savedLinks) setLinks(JSON.parse(savedLinks))
    if (savedCollections) setCollections(JSON.parse(savedCollections))
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('linkshelf_links', JSON.stringify(links))
  }, [links])

  useEffect(() => {
    localStorage.setItem('linkshelf_collections', JSON.stringify(collections))
  }, [collections])

  const addLink = async () => {
    if (!newLinkUrl.trim()) return
    
    setIsAddingLink(true)
    try {
      // Fetch title from URL
      const response = await fetch(`/api/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: newLinkUrl })
      })
      
      const data = await response.json()
      
      const newLink: LinkType = {
        id: Date.now().toString(),
        url: newLinkUrl,
        title: data.title || newLinkUrl,
        collectionId: selectedCollection || undefined,
        createdAt: new Date().toISOString()
      }
      
      setLinks([newLink, ...links])
      setNewLinkUrl('')
    } catch (error) {
      console.error('Error adding link:', error)
      // Add anyway with URL as title
      const newLink: LinkType = {
        id: Date.now().toString(),
        url: newLinkUrl,
        title: newLinkUrl,
        collectionId: selectedCollection || undefined,
        createdAt: new Date().toISOString()
      }
      setLinks([newLink, ...links])
      setNewLinkUrl('')
    } finally {
      setIsAddingLink(false)
    }
  }

  const addCollection = () => {
    if (!newCollectionName.trim()) return
    
    const newCollection: Collection = {
      id: Date.now().toString(),
      name: newCollectionName,
      isPublic: false,
      createdAt: new Date().toISOString()
    }
    
    setCollections([...collections, newCollection])
    setNewCollectionName('')
    setIsAddingCollection(false)
  }

  const deleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id))
  }

  const deleteCollection = (id: string) => {
    setCollections(collections.filter(col => col.id !== id))
    // Remove collection from links
    setLinks(links.map(link => 
      link.collectionId === id ? { ...link, collectionId: undefined } : link
    ))
  }

  const toggleCollectionPublic = (id: string) => {
    setCollections(collections.map(col =>
      col.id === id ? { ...col, isPublic: !col.isPublic } : col
    ))
  }

  const moveToCollection = (linkId: string, collectionId: string | null) => {
    setLinks(links.map(link =>
      link.id === linkId ? { ...link, collectionId: collectionId || undefined } : link
    ))
  }

  // Filter links
  const filteredLinks = links.filter(link => {
    const matchesSearch = link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         link.url.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCollection = selectedCollection === null || link.collectionId === selectedCollection
    return matchesSearch && matchesCollection
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
      {/* Header */}
      <nav className="border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <Bookmark className="w-8 h-8 text-teal-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                LinkShelf
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-400">
                {links.length} / 100 links
              </div>
              <Link
                href="/"
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-all backdrop-blur-sm border border-white/10 flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Collections */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-white mb-4">Collections</h2>
              
              <button
                onClick={() => setSelectedCollection(null)}
                className={`w-full text-left px-4 py-2 rounded-lg mb-2 transition-all ${
                  selectedCollection === null
                    ? 'bg-teal-500/20 text-teal-400 border border-teal-400/30'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                All Links
              </button>

              <div className="space-y-1 mb-4">
                {collections.map(collection => (
                  <div key={collection.id} className="group">
                    <button
                      onClick={() => setSelectedCollection(collection.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all flex items-center justify-between ${
                        selectedCollection === collection.id
                          ? 'bg-teal-500/20 text-teal-400 border border-teal-400/30'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Folder className="w-4 h-4" />
                        <span className="truncate">{collection.name}</span>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {collection.isPublic && (
                          <Link
                            href={`/c/${collection.id}`}
                            className="p-1 hover:bg-white/10 rounded"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleCollectionPublic(collection.id)
                          }}
                          className="p-1 hover:bg-white/10 rounded"
                        >
                          <Share2 className={`w-3 h-3 ${collection.isPublic ? 'text-teal-400' : ''}`} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteCollection(collection.id)
                          }}
                          className="p-1 hover:bg-red-500/20 rounded"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </button>
                  </div>
                ))}
              </div>

              {isAddingCollection ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addCollection()}
                    placeholder="Collection name"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={addCollection}
                      className="flex-1 px-3 py-1.5 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setIsAddingCollection(false)}
                      className="flex-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsAddingCollection(true)}
                  className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 text-teal-400 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Collection
                </button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Add Link */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Add Link</h2>
              <div className="flex gap-3">
                <input
                  type="url"
                  value={newLinkUrl}
                  onChange={(e) => setNewLinkUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !isAddingLink && addLink()}
                  placeholder="Paste a URL..."
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                  disabled={isAddingLink}
                />
                <button
                  onClick={addLink}
                  disabled={isAddingLink || !newLinkUrl.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-600 text-white rounded-lg font-medium transition-all shadow-lg shadow-teal-500/20 disabled:shadow-none flex items-center gap-2"
                >
                  {isAddingLink ? (
                    <>Loading...</>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Add
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search links..."
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>

            {/* Links Grid */}
            <div className="space-y-3">
              {filteredLinks.length === 0 ? (
                <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-12 text-center">
                  <Bookmark className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">
                    {searchQuery ? 'No links found' : 'No links yet. Add your first one above!'}
                  </p>
                </div>
              ) : (
                filteredLinks.map(link => (
                  <div
                    key={link.id}
                    className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium mb-1 truncate">{link.title}</h3>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-400 text-sm hover:underline flex items-center gap-1 truncate"
                        >
                          {link.url}
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </a>
                        {link.collectionId && (
                          <div className="mt-2">
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-teal-500/20 text-teal-400 rounded text-xs">
                              <Folder className="w-3 h-3" />
                              {collections.find(c => c.id === link.collectionId)?.name}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <select
                          value={link.collectionId || ''}
                          onChange={(e) => moveToCollection(link.id, e.target.value || null)}
                          className="px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-sm focus:outline-none focus:border-teal-400"
                        >
                          <option value="">No collection</option>
                          {collections.map(col => (
                            <option key={col.id} value={col.id}>{col.name}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => deleteLink(link.id)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-all text-slate-400 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
