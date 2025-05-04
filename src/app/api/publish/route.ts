import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

const merge = false;

let ALLOWED_EMAILS = [
    'abidahmed094@gmail.com',
    'muhammadosama1515@gmail.com'
];

const MERGE_EMAILS = [
    'abidahmed094@gmail.com',
    'muhammadosama1515@gmail.com',
    'hamzazubair.3111@gmail.com',
    'gmcislamicsociety1199@gmail.com',
    'aqsa59759@gmail.com'
]

const VERCEL_DEPLOY_HOOK_URL = process.env.VERCEL_DEPLOY_HOOK_URL + '?buildCache=false';

async function verifyRequest(request: Request) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { error: 'Missing or invalid Authorization header' };
    }
    const idToken = authHeader.split('Bearer ')[1];

    const allowedEmails = merge ? MERGE_EMAILS : ALLOWED_EMAILS;

    try {
        const decoded = await adminAuth.verifyIdToken(idToken);
        if (!decoded.email || !allowedEmails.includes(decoded.email)) {
            return { error: 'Unauthorized: Email not allowed' };
        }
        return { email: decoded.email };
    } catch (err) {
        return { error: 'Invalid or expired token' };
    }
}

async function triggerVercelBuild() {
    if (!VERCEL_DEPLOY_HOOK_URL || process.env.BASE_URL === 'http://localhost:3000/') return;
    try {
        await fetch(VERCEL_DEPLOY_HOOK_URL, { method: 'POST' });
    } catch (err) {
        // Optionally log error
    }
}

export async function GET(request: Request) {
    const auth = await verifyRequest(request);
    if (auth.error) {
        return NextResponse.json({ success: false, error: auth.error }, { status: 401 });
    }
    await triggerVercelBuild();
    return NextResponse.json({ success: true, message: 'Publish Successful, Wait for 2 minutes before seeing changes' });
}