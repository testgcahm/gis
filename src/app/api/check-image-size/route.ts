import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;
    
    if (!url) {
      return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 });
    }

    // Use axios to download the file and get its size
    const response = await axios.get(url, { 
      responseType: 'arraybuffer'
    });
    
    const contentLength = response.data.byteLength;
    
    return NextResponse.json({
      success: true,
      size: contentLength,
      sizeKB: Math.round(contentLength / 1024),
      isOverLimit: contentLength > 250 * 1024
    });

  } catch (error) {
    console.error('Error checking image size:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to check image size'
    }, { status: 500 });
  }
}