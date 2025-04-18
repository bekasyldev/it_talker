import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { ValidationError } from '@/types/form';

interface FormData {
    name: string;
    email: string;
    phone: string;
    promocode?: string;  // Added promocode as optional field
}

// Handle the private key properly - it needs to have actual newlines
const privateKey = process.env.GOOGLE_SHEET_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? '';

const client = new JWT({
    email: process.env.GOOGLE_SHEET_EMAIL,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth: client });
const spreadsheetId = process.env.GOOGLE_SHEET_ID;
const sheetName = 'Лист1';

function generateUniqueId() {
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(8, 14); // Extract HHMMSS
    const randomPart = uuidv4().slice(0, 4).toUpperCase(); // Shortened UUID
    return `${timestamp}${randomPart}`;
}

async function ensureHeaders() {
    const headers = ['ID', 'Дата', 'Имя', 'Телефон', 'Email', 'Промокод'];
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheetName}!A1:F1`,
    });

    if (!response.data.values || response.data.values[0].join(',') !== headers.join(',')) {
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${sheetName}!A1:F1`,
            requestBody: { values: [headers] },
            valueInputOption: 'RAW'
        });
    }
}

async function verifyServiceAccountAccess() {
    try {
        // First verify we can access the spreadsheet
        const spreadsheet = await sheets.spreadsheets.get({
            spreadsheetId,
        });

        console.log('Successfully accessed spreadsheet:', {
            name: spreadsheet.data.properties?.title,
            url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
            permissions: 'Verified access'
        });

        // Try to read the current sheets
        const sheetsList = spreadsheet.data.sheets?.map(s => s.properties?.title) || [];
        console.log('Available sheets:', sheetsList);

        return true;
    } catch (err) {
        const error = err as ValidationError;
        console.error('Service account access error:', {
            message: error.message
        });
        throw new Error(`Service account access failed: ${error.message}`);
    }
}

export async function POST(request: Request) {
    try {
        console.log('=== Starting form submission ===');
        console.log('Configuration:', {
            spreadsheetId,
            sheetName,
            serviceAccount: process.env.GOOGLE_SHEET_EMAIL
        });

        // First verify access
        await verifyServiceAccountAccess();

        const data: FormData = await request.json();
        console.log('Received form data:', data);

        // Ensure sheet exists and has headers
        await ensureHeaders();

        const uniqueId = generateUniqueId();
        const formattedDate = new Date().toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        const row = [
            uniqueId,
            formattedDate,
            data.name,
            data.phone,
            data.email,
            data.promocode || '' // Add promocode with fallback to empty string
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${sheetName}!A:F`, // Updated range to include column F
            requestBody: { values: [row] },
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS'
        });

        console.log('=== Submission completed successfully ===');

        return NextResponse.json({ success: true, id: uniqueId });
    } catch (err) {
        const error = err as ValidationError;
        console.error('=== Submission failed ===', {
            message: error.message,
        });

        return NextResponse.json(
            { success: false, error: 'Failed to save form data' },
            { status: 500 }
        );
    }
}