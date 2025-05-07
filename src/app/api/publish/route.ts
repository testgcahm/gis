import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';

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

export async function GET(request: Request) {
    const auth = await verifyRequest(request);
    if (auth.error) {
        return NextResponse.json({ success: false, error: auth.error }, { status: 401 });
    }
    
    try {
        // Revalidate the main events page
        revalidatePath('/events');
        
        // Get all events from Firestore to revalidate individual event pages
        const eventsSnapshot = await adminDb.collection('events').get();
        const eventSlugs = eventsSnapshot.docs.map(doc => doc.data().slug).filter(Boolean);
        
        // Revalidate each individual event page
        for (const slug of eventSlugs) {
            revalidatePath(`/events/${slug}`);
        }
        
        return NextResponse.json({ 
            success: true, 
            message: `Publish Successful. Revalidated /events and ${eventSlugs.length} individual event pages.` 
        });
    } catch (error) {
        console.error('Error during revalidation:', error);
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to revalidate pages' 
        }, { status: 500 });
    }
}