import { NextResponse } from 'next/server';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, writeBatch } from 'firebase/firestore';
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
        const body = await request.json();
        
        // Check if we're doing bulk order update
        if (Array.isArray(body.order)) {
            // Handle reordering multiple events
            const batch = writeBatch(db);
            
            // Update each event with its new order
            body.order.forEach((item: { id: string, order: number }) => {
                const { id, order } = item;
                const eventRef = doc(db, 'events', id);
                batch.update(eventRef, { order });
            });
            
            // Commit the batch write
            await batch.commit();
            return NextResponse.json({ success: true });
        } else {
            // Handle single event update
            const { id, ...data } = body;
            if (!id) return NextResponse.json({ success: false, error: 'Missing event id' }, { status: 400 });
            const eventDoc = doc(db, 'events', id);
            await updateDoc(eventDoc, data);
            return NextResponse.json({ success: true });
        }
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
