import { NextResponse } from 'next/server';
import { eventsArray } from './eventsData';

export async function GET() {
    return NextResponse.json(eventsArray);
}
