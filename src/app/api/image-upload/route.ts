import { NextRequest, NextResponse } from 'next/server';

function errorResponse(error: string, status = 500, details?: unknown) {
    console.error(error, details ?? '');
    return NextResponse.json({ success: false, error, details }, { status });
}

export async function POST(req: NextRequest) {
    try {
        let formData: FormData;
        try {
            formData = await req.formData();
        } catch (err) {
            return errorResponse('Invalid form data', 400, err);
        }

        const file = formData.get('image');
        if (!(file instanceof File)) {
            return errorResponse('No file uploaded or invalid file type', 400);
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            return errorResponse('Invalid file type', 400);
        }
        if (file.size > 250 * 1024) {
            return errorResponse('File too large (max 250KB)', 400);
        }

        let base64: string;
        try {
            const arrayBuffer = await file.arrayBuffer();
            base64 = Buffer.from(arrayBuffer).toString('base64');
        } catch (err) {
            return errorResponse('Failed to read and encode file', 500, err);
        }

        const IMGBB_API_KEY = process.env.IMGBB_API_KEY;
        if (!IMGBB_API_KEY) {
            return errorResponse('ImageBB API key not set in environment', 500);
        }

        let imgbbRes: Response;
        try {
            imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ image: base64 }),
            });
        } catch (err) {
            return errorResponse('Failed to connect to ImageBB', 502, err);
        }

        if (!imgbbRes.ok) {
            return errorResponse(`ImageBB API responded with status ${imgbbRes.status}`, imgbbRes.status);
        }

        let data: any;
        try {
            data = await imgbbRes.json();
        } catch (err) {
            return errorResponse('Failed to parse ImageBB response', 502, err);
        }

        if (!data.success || !data.data?.url) {
            return errorResponse('ImageBB upload failed', 500, data);
        }

        return NextResponse.json({ success: true, url: data.data.url });

    } catch (err) {
        return errorResponse('Unexpected server error', 500, err);
    }
}
