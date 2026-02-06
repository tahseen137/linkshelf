import { NextRequest, NextResponse } from 'next/server'

// This is a simple API endpoint for collections
// In a real app, this would interact with a database
// For MVP, we're using localStorage client-side

export async function GET() {
  return NextResponse.json({
    message: 'Collections API - Use localStorage in client for MVP'
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate collection data
    if (!body.name) {
      return NextResponse.json(
        { error: 'Collection name is required' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Collection created (client-side storage)'
    })
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
