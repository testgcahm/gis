import { NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

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

export async function GET() {
  // Fetch all documents from the 'events' collection
  const eventsCol = collection(db, 'events');
  const eventsSnapshot = await getDocs(eventsCol);
  const eventsArray = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json({ eventsArray });
}

export async function POST(request: Request) {
  const auth = await verifyRequest(request);
  if (auth.error) {
    return NextResponse.json({ success: false, error: auth.error }, { status: 401 });
  }
  try {
    const data = await request.json();
    const docRef = await adminDb.collection('events').add(data);
    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  const auth = await verifyRequest(request);
  if (auth.error) {
    return NextResponse.json({ success: false, error: auth.error }, { status: 401 });
  }
  try {
    const body = await request.json();
    if (Array.isArray(body.order)) {
      const batch = adminDb.batch();
      body.order.forEach((item: { id: string, order: number }) => {
        const eventRef = adminDb.collection('events').doc(item.id);
        batch.update(eventRef, { order: item.order });
      });
      await batch.commit();
      return NextResponse.json({ success: true });
    } else {
      const { id, ...data } = body;
      if (!id) return NextResponse.json({ success: false, error: 'Missing event id' }, { status: 400 });
      const eventDoc = adminDb.collection('events').doc(id);
      await eventDoc.update(data);
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const auth = await verifyRequest(request);
  if (auth.error) {
    return NextResponse.json({ success: false, error: auth.error }, { status: 401 });
  }
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ success: false, error: 'Missing event id' }, { status: 400 });
    const eventDoc = adminDb.collection('events').doc(id);
    await eventDoc.delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
  }
}
