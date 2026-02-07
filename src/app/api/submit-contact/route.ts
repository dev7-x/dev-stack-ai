import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const gmail_user = process.env.GMAIL_USER;
const gmail_app_password = process.env.GMAIL_APP_PASSWORD;
const spreadsheet_id = process.env.SPREADSHEET_ID;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PROJECT_ID = process.env.GOOGLE_PROJECT_ID;

// Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmail_user,
    pass: gmail_app_password,
  },
});

interface ContactData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  message: string;
}

// Initialize Google Sheets API
async function appendToGoogleSheet(data: ContactData) {
  try {
    // Check if we have Google credentials
    if (!GOOGLE_PRIVATE_KEY || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PROJECT_ID) {
      console.warn("⚠️  Google Sheets credentials not configured. Skipping spreadsheet integration.");
      console.log("To enable, set: GOOGLE_PRIVATE_KEY, GOOGLE_CLIENT_EMAIL, GOOGLE_PROJECT_ID in .env.local");
      return null;
    }

    // Replace escaped newlines in private key
    const privateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");

    // Create JWT client
    const auth = new google.auth.JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    // Initialize Sheets API
    const sheets = google.sheets({ version: "v4", auth });

    // Format submission date
    const submissionDate = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    // Prepare row data - must match column order in sheet
    const fullPhone = `${data.countryCode}${data.phone}`;
    const values = [
      [
        data.name, // Full Name
        data.email, // Email
        fullPhone, // Phone (with country code)
        data.message, // Project Inquiry
        submissionDate, // Details Date
      ],
    ];

    // Append to sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheet_id,
      range: "Collaborations-2026!A:E", // Specify the sheet name and column range
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    /*
    console.log("✅ Data appended to spreadsheet:", {
      spreadsheet_id,
      updatedRange: response.data.updates?.updatedRange,
      updatedRows: response.data.updates?.updatedRows,
    });
    */

    return response.data;
  } catch (error) {
    console.error("❌ Error appending to Google Sheets:", {
      error: error instanceof Error ? error.message : String(error),
      spreadsheet_id,
    });
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactData = await request.json();

    // Format the submission date
    const submissionDate = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    // Format phone with country code
    const fullPhone = `${data.countryCode}${data.phone}`;

    // 1. Send email with user details
    const emailBody = `
<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
      <div style="text-align: center; border-bottom: 3px solid #fbbf24; padding-bottom: 20px; margin-bottom: 20px;">
        <h1 style="color: #fbbf24; margin: 0; font-size: 28px;">🎯 New Project Inquiry</h1>
        <p style="color: #666; margin: 5px 0 0 0;">From Dev-Stack AI Portfolio</p>
      </div>
      
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <div style="margin-bottom: 15px;">
          <label style="color: #666; font-weight: bold; font-size: 12px; text-transform: uppercase;">Full Name:</label>
          <p style="margin: 5px 0 0 0; font-size: 16px; color: #333;">${data.name}</p>
        </div>
        
        <div style="margin-bottom: 15px;">
          <label style="color: #666; font-weight: bold; font-size: 12px; text-transform: uppercase;">Email:</label>
          <p style="margin: 5px 0 0 0; font-size: 16px;"><a href="mailto:${data.email}" style="color: #fbbf24; text-decoration: none;">${data.email}</a></p>
        </div>
        
        <div style="margin-bottom: 15px;">
          <label style="color: #666; font-weight: bold; font-size: 12px; text-transform: uppercase;">Phone:</label>
          <p style="margin: 5px 0 0 0; font-size: 16px; color: #333;">${fullPhone}</p>
        </div>
        
        <div>
          <label style="color: #666; font-weight: bold; font-size: 12px; text-transform: uppercase;">Project Inquiry:</label>
          <p style="margin: 5px 0 0 0; font-size: 14px; color: #555; line-height: 1.6; background: white; padding: 12px; border-left: 4px solid #fbbf24; border-radius: 4px;">
            ${data.message.replace(/\n/g, "<br>")}
          </p>
        </div>
      </div>
      
      <div style="background: #f0f7ff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
        <p style="margin: 0; color: #333; font-size: 13px;">
          <strong>Submission Date:</strong> ${submissionDate}
        </p>
      </div>
      
      <div style="background: #fffaf0; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #fbbf24;">
        <p style="margin: 0 0 10px 0;"><strong style="color: #fbbf24;">📊 Tracking & Links</strong></p>
        <ul style="margin: 0; padding-left: 20px; color: #555;">
          <li style="margin: 5px 0;">
            <a href="https://docs.google.com/spreadsheets/d/1Ki62dIMvJMIxhuKBdDXcPhEwmV4D6Gt5maKlBj1IUo0/edit?usp=sharing" style="color: #fbbf24; text-decoration: none; font-weight: bold;">View Collaborations Spreadsheet →</a>
          </li>
          <li style="margin: 5px 0;">
            <a href="https://dev-stack-ai.vercel.app/" style="color: #fbbf24; text-decoration: none; font-weight: bold;">Portfolio Link →</a>
          </li>
        </ul>
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="color: #999; font-size: 12px; margin: 0;">
          Reply to this inquiry directly: <a href="mailto:${data.email}" style="color: #fbbf24; text-decoration: none;">${data.email}</a>
          <br><br>
          This is an automated email from Dev-Stack AI Portfolio System.
        </p>
      </div>
    </div>
  </body>
</html>
    `;

    await transporter.sendMail({
      from: gmail_user,
      to: "itsdevendra.m7@gmail.com",
      cc: gmail_user,
      subject: `🚀 New Project Inquiry from ${data.name} (${fullPhone})`,
      html: emailBody,
    });

    //console.log("✅ Email sent successfully to itsdevendra.m7@gmail.com");

    // 2. Append to Google Sheets
    let sheetResponse = null;
    try {
      sheetResponse = await appendToGoogleSheet(data);
    } catch (error) {
      console.error("Google Sheets append failed, but email was sent");
    }

    return NextResponse.json(
      {
        message: "Inquiry submitted successfully! Email sent and data logged.",
        phone: fullPhone,
        spreadsheetId: spreadsheet_id,
        sheetUpdated: sheetResponse ? true : false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      {
        message: "Failed to submit inquiry",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
