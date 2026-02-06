import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Fetch the page and extract title
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; LinkShelf/1.0; +https://linkshelf.app)'
        }
      })
      
      const html = await response.text()
      const $ = cheerio.load(html)
      
      // Try multiple ways to get the title
      let title = $('title').text().trim()
      
      if (!title) {
        title = $('meta[property="og:title"]').attr('content') || ''
      }
      
      if (!title) {
        title = $('meta[name="twitter:title"]').attr('content') || ''
      }
      
      if (!title) {
        title = $('h1').first().text().trim()
      }
      
      return NextResponse.json({ 
        title: title || url,
        success: true 
      })
    } catch {
      // If we can't fetch the page, just return the URL
      return NextResponse.json({ 
        title: url,
        success: false,
        error: 'Could not fetch page title'
      })
    }
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
