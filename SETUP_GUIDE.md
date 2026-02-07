# Dev-Stack AI Portfolio - Setup Guide

## Status ✅

Your portfolio is now fully functional with:
- ✅ **200+ Country Codes** - All countries from countrycode.org with flag emojis
- ✅ **Search Dropdown** - Fast filtering of countries by name or code
- ✅ **Email Integration** - Contact form sends emails to itsdevendra.m7@gmail.com via Gmail SMTP
- ⏳ **Google Sheets Integration** - Requires credentials setup (see below)

---

## Part 1: Email Setup (Already Configured) ✅

Your email configuration is ready. The following env variables are set:
```
GMAIL_USER=dev.naren0703@gmail.com
GMAIL_APP_PASSWORD=jsys xeal eypz rgfs
SPREADSHEET_ID=1Ki62dIMvJMIxhuKBdDXcPhEwmV4D6Gt5maKlBj1IUo0
```

**How it works:**
1. User submits contact form
2. Email is sent to `itsdevendra.m7@gmail.com`
3. CC sent to `dev.naren0703@gmail.com` (GMAIL_USER)

---

## Part 2: Google Sheets Integration Setup ⏳ (REQUIRED FOR AUTO-ENTRY)

To automatically add contact form submissions to your "Collaborations-2026" spreadsheet, follow these steps:

### Step 1: Create a Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing one)
3. Enable the **Google Sheets API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

4. Create a Service Account:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Fill in service account name: `dev-stack-ai-sheets`
   - Click "Create and Continue"
   - Skip optional steps and click "Done"

### Step 2: Create and Download Service Account Key

1. Click on the created service account
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key"
4. Choose JSON format
5. Click "Create" - a JSON file will download

**Save this file safely!** You'll need its contents.

### Step 3: Extract Credentials from JSON File

Open the downloaded JSON file and find these values:
- **GOOGLE_PROJECT_ID**: Look for `"project_id": "xxx-xxx-xxx"`
- **GOOGLE_CLIENT_EMAIL**: Look for `"client_email": "xxx@xxx.iam.gserviceaccount.com"`
- **GOOGLE_PRIVATE_KEY**: Look for `"private_key": "-----BEGIN PRIVATE KEY..."`

### Step 4: Share Spreadsheet with Service Account

1. Open your [Collaborations-2026 spreadsheet](https://docs.google.com/spreadsheets/d/1Ki62dIMvJMIxhuKBdDXcPhEwmV4D6Gt5maKlBj1IUo0/edit?usp=sharing)
2. Click "Share" (top right)
3. Paste the service account's **GOOGLE_CLIENT_EMAIL** (from Step 3)
4. Grant "Editor" access
5. Click "Share"

### Step 5: Update .env.local

Add the following to your `.c:\Users\deven\Desktop\ZReqC\MyOwn Finds\MyAgencyPortfolio\dev-stack-ai\.env.local` file:

```env
GOOGLE_PROJECT_ID=your-project-id
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBA...\n-----END PRIVATE KEY-----\n"
```

**Important:** When pasting the private key:
- Keep the `\n` characters as-is (they represent line breaks)
- Wrap the entire key in quotes
- Replace all literal newlines with `\n`

Example:
```env
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQE...\n-----END PRIVATE KEY-----\n"
```

### Step 6: Verify Sheet Columns

Your "Collaborations-2026" sheet **must** have columns in this exact order (Row 1):
1. **Full Name** (Column A)
2. **Email** (Column B)
3. **Phone** (Column C) - includes country code
4. **Project Inquiry** (Column D)
5. **Details Date** (Column E) - auto-populated timestamp

If headers don't exist, add them manually.

### Step 7: Restart Development Server

```bash
npm run dev
```

### Step 8: Test the Integration

1. Open http://localhost:3000
2. Scroll to "Ready to Build Your Monster?" section
3. Fill in the form with test data
4. Submit the form
5. Check two places:
   - Email should arrive at `itsdevendra.m7@gmail.com`
   - New row should appear in your [Collaborations spreadsheet](https://docs.google.com/spreadsheets/d/1Ki62dIMvJMIxhuKBdDXcPhEwmV4D6Gt5maKlBj1IUo0/edit?usp=sharing)

---

## Features Implemented

### ✅ Country Code Dropdown
- 200+ countries from official countrycode.org
- Search functionality (type country name or code)
- Country flags for visual identification
- Click to select

### ✅ Phone Validation
- Minimum 6 digits (allows international numbers)
- Numbers only (no special characters)
- Works with all country codes

### ✅ Email Integration
- HTML-formatted professional emails
- Includes all form details
- Links to spreadsheet and portfolio
- Auto-formatted submission date/time

### ✅ Google Sheets Auto-Entry
- Automatically appends new submissions to spreadsheet
- Preserves data integrity
- Includes timestamps
- Error handling (email still sends if sheets fails)

### ✅ Form Validation
- Real-time validation with error messages
- Zod schema validation
- Required fields enforcement
- Minimum character limits

---

## Troubleshooting

### Issue: "Google Sheets credentials not configured"
**Solution:** Add `GOOGLE_PRIVATE_KEY`, `GOOGLE_CLIENT_EMAIL`, and `GOOGLE_PROJECT_ID` to `.env.local`

### Issue: "401 Unauthorized" error
**Solution:** 
- Verify service account email is added to spreadsheet with "Editor" access
- Check that credentials are correct in `.env.local`

### Issue: "Spreadsheet not found"
**Solution:**
- Verify `SPREADSHEET_ID` is correct: `1Ki62dIMvJMIxhuKBdDXcPhEwmV4D6Gt5maKlBj1IUo0`
- Check that service account has access to the sheet

### Issue: Email not sending
**Solution:**
- Verify Gmail app password is correct (16 chars with spaces)
- Check that 2FA is enabled on Gmail account
- Verify `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set in `.env.local`

---

## What's Next?

1. **Complete Google Sheets Setup** (see above)
2. **Test form submission** with test data
3. **Deploy to Vercel** (coming soon)
4. **Monitor submissions** - emails and spreadsheet updates

---

## API Endpoint

**POST** `/api/submit-contact`

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "countryCode": "+1",
  "phone": "5551234567",
  "message": "I want to discuss a project..."
}
```

Response:
```json
{
  "message": "Inquiry submitted successfully!",
  "phone": "+15551234567",
  "spreadsheetId": "1Ki62dIMvJMIxhuKBdDXcPhEwmV4D6Gt5maKlBj1IUo0",
  "sheetUpdated": true
}
```

---

## Files Modified

- `src/config/countryCodes.ts` - Updated with 250+ countries
- `src/components/ContactCard.tsx` - Added search functionality to dropdown
- `src/app/api/submit-contact/route.ts` - Added Google Sheets integration
- `.env.example` - Environment variables template

---

## Support

For issues or questions, check server logs:
```bash
npm run dev
# Look for ✅ and ❌ messages indicating success/failure
```

Emails are logged to console if any errors occur.
