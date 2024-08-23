import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const res = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A1:E1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            reqBody.nama,
            reqBody.alamat,
            reqBody.hp,
            reqBody.pernah,
            reqBody.kota,
          ],
        ],
      },
    });
    return NextResponse.json({ status: "Ok", data: res.data });
  } catch (error: any) {
    return NextResponse.json({
      status: "Error",
      data: error.message ?? "error ges",
    });
  }
}
