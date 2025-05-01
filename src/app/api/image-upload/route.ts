import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('image');

        if (!(file instanceof File)) {
            console.error('No valid file provided.');
            return NextResponse.json({ success: false, error: 'No file uploaded or invalid file type' }, { status: 400 });
        }

        // Validate file type and size
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            console.error('Invalid file type:', file.type);
            return NextResponse.json({ success: false, error: 'Invalid file type' }, { status: 400 });
        }

        if (file.size > 250 * 1024) {
            console.error('File too large:', file.size);
            return NextResponse.json({ success: false, error: 'File too large (max 250KB)' }, { status: 400 });
        }

        // Convert file to base64
        let base64: string;
        try {
            const arrayBuffer = await file.arrayBuffer();
            base64 = Buffer.from(arrayBuffer).toString('base64');
        } catch (err) {
            console.error('Failed to read/encode file:', err);
            return NextResponse.json({ success: false, error: 'Failed to read or encode file', details: String(err) }, { status: 500 });
        }

        // Check API key
        const IMGBB_API_KEY = process.env.IMGBB_API_KEY;
        if (!IMGBB_API_KEY) {
            console.error('IMGBB API key not set in environment');
            return NextResponse.json({ success: false, error: 'ImageBB API key not set' }, { status: 500 });
        }

        // Upload to ImageBB
        let imgbbResponse;
        try {
            imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ image: base64 }),
            });
        } catch (err) {
            console.error('Failed to connect to ImageBB:', err);
            return NextResponse.json({ success: false, error: 'Failed to connect to ImageBB', details: String(err) }, { status: 502 });
        }

        let data;
        try {
            data = await imgbbResponse.json();
        } catch (err) {
            console.error('Failed to parse ImageBB response:', err);
            return NextResponse.json({ success: false, error: 'Failed to parse ImageBB response', details: String(err) }, { status: 502 });
        }

        if (!data.success) {
            console.error('ImageBB upload failed:', data);
            return NextResponse.json({
                success: false,
                error: data.error?.message || 'ImageBB upload failed',
                details: data,
            }, { status: 500 });
        }

        return NextResponse.json({ success: true, url: data.data.url });
    } catch (err) {
        console.error('Unexpected server error:', err);
        return NextResponse.json({ success: false, error: 'Unexpected server error', details: String(err) }, { status: 500 });
    }
}
