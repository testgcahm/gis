import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Only use credentials from environment variable, never from seed
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
      console.error('GOOGLE_SERVICE_ACCOUNT_JSON is missing');
      return NextResponse.json({ success: false, error: 'Google service account credentials not set in environment' }, { status: 500 });
    }
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });
    const drive = google.drive({ version: 'v3', auth });
    // TODO: Replace with your actual folder ID
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_EVENTS_ID || '';
    if (!folderId) {
      console.error('GOOGLE_DRIVE_IMAGES_FOLDER_ID is missing');
      return NextResponse.json({ success: false, error: 'Google Drive folder ID not set in environment' }, { status: 500 });
    }
    const res = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: 'files(id, name, mimeType)',
      pageSize: 50,
    });
    const files = res.data.files || [];
    const images = files.map(file => ({
      id: file.id,
      name: file.name,
      url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`
    }));
    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error('Error in /api/drive-images:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch images';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
