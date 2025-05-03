import { NextResponse } from 'next/server';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET() {
    // Fetch all documents from the 'events' collection
    const eventsCol = collection(db, 'events');
    const eventsSnapshot = await getDocs(eventsCol);
    const eventsArray = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ eventsArray });
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        // Add the new event to the 'events' collection
        const eventsCol = collection(db, 'events');
        const docRef = await addDoc(eventsCol, data);
        return NextResponse.json({ success: true, id: docRef.id });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, ...data } = await request.json();
        if (!id) return NextResponse.json({ success: false, error: 'Missing event id' }, { status: 400 });
        const eventDoc = doc(db, 'events', id);
        await updateDoc(eventDoc, data);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        if (!id) return NextResponse.json({ success: false, error: 'Missing event id' }, { status: 400 });
        const eventDoc = doc(db, 'events', id);
        await deleteDoc(eventDoc);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}
