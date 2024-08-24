import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { rowIndex } = await req.json(); // Get the rowIndex from the request body

        if (typeof rowIndex !== 'number' || rowIndex < 1) {
            return NextResponse.json({
                status: 'Error',
                data: 'Invalid row index',
            });
        }

        // Authenticate with Google Sheets API
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.file',
            ],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // Google Sheets ID and Sheet name
        const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID_TUMBLER;
        const SHEET_NAME = 'mug'; // Replace with your actual sheet name

        // Delete the row
        await sheets.spreadsheets.batchUpdate({
            spreadsheetId: SPREADSHEET_ID,
            requestBody: {
                requests: [
                    {
                        deleteDimension: {
                            range: {
                                sheetId: 0, // This is typically the ID for the first sheet. You can find this in the Sheet properties.
                                dimension: 'ROWS',
                                startIndex: rowIndex - 1, // Sheets API is 0-indexed, so subtract 1
                                endIndex: rowIndex, // Delete only one row
                            },
                        },
                    },
                ],
            },
        });

        return NextResponse.json({
            status: 'Success',
            data: `Row ${rowIndex} deleted successfully`,
        });

    } catch (error: any) {
        console.error('Error:', error.message);
        return NextResponse.json({
            status: 'Error',
            data: error.message ?? 'An unknown error occurred',
        });
    }
}
