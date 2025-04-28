import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('image') as File;
    if (!file) {
        return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }
    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ success: false, error: 'Invalid file type' }, { status: 400 });
    }
    if (file.size > 250 * 1024) {
        return NextResponse.json({ success: false, error: 'File too large' }, { status: 400 });
    }
    // Read file as base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    // Upload to Imgur
    const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;
    if (!IMGUR_CLIENT_ID) {
        return NextResponse.json({ success: false, error: 'Imgur Client ID not set' }, { status: 500 });
    }
    const imgurRes = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
            Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
        },
        body: new URLSearchParams({ image: base64 }),
    });
    const data = await imgurRes.json();
    if (!data.success) {
        return NextResponse.json({ success: false, error: 'Imgur upload failed' }, { status: 500 });
    }
    return NextResponse.json({ success: true, url: data.data.link });
}
