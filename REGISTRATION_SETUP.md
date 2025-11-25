# Registration System Setup Guide

## Current Implementation

Your registration page (`register.html`) is currently set up to send registration data via email using the **mailto:** protocol. When a user submits the registration form, it will:

1. Collect all the registration information (name, email, student ID, major, etc.)
2. Format it into an email
3. Open the user's default email client (Gmail, Outlook, Apple Mail, etc.)
4. Pre-fill the email with:
   - **To:** nithikroshan03@gmail.com
   - **Subject:** New IEEE Member Registration: [Student Name]
   - **Body:** All the registration details

The user then needs to click "Send" in their email client to complete the registration.

---

## Limitation of Current Setup

⚠️ **This method requires the user to have an email client installed** (like Outlook, Apple Mail, or Thunderbird). If they only use webmail (like Gmail in browser), the mailto: link may not work properly.

---

## Better Solutions for Production

For a real-world implementation where registrations are sent automatically without requiring users to send emails manually, you have several options:

### Option 1: EmailJS (Recommended - Free & Easy)

**EmailJS** allows you to send emails directly from your website without a backend server.

**Steps:**
1. Sign up at [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key

**Update register.html:**

```html
<!-- Add before closing </body> tag -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    // Initialize EmailJS
    emailjs.init('YOUR_PUBLIC_KEY');
</script>
```

**Replace the handleRegistration function:**

```javascript
function handleRegistration(event) {
    event.preventDefault();
    
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        studentId: document.getElementById('studentId').value,
        major: document.getElementById('major').value,
        year: document.getElementById('year').value,
        phone: document.getElementById('phone').value,
        ieeeNumber: document.getElementById('ieeeNumber').value,
        interests: document.getElementById('interests').value,
        mailingList: document.getElementById('mailingList').checked ? 'Yes' : 'No',
        timestamp: new Date().toLocaleString()
    };

    // Send email via EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
        .then(function(response) {
            console.log('SUCCESS!', response);
            document.getElementById('registrationForm').style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
        }, function(error) {
            console.error('FAILED...', error);
            alert('Registration failed. Please try again or contact us directly at nithikroshan03@gmail.com');
        });
}
```

**Pros:**
- ✅ Free tier available (200 emails/month)
- ✅ No backend required
- ✅ Easy to set up
- ✅ Works on all browsers

**Cons:**
- ❌ Limited to 200 emails/month on free plan
- ❌ Requires internet connection

---

### Option 2: Formspree (Alternative)

**Formspree** is another easy option that works directly with forms.

**Steps:**
1. Sign up at [https://formspree.io/](https://formspree.io/)
2. Create a new form
3. Get your form endpoint

**Update the form tag in register.html:**

```html
<form id="registrationForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <!-- Your form fields stay the same -->
    <input type="hidden" name="_replyto" value="nithikroshan03@gmail.com">
    <input type="hidden" name="_subject" value="New IEEE Member Registration">
    
    <!-- All your existing form fields... -->
</form>
```

**Pros:**
- ✅ Very simple - just change the form action
- ✅ Free tier available (50 submissions/month)
- ✅ No JavaScript required

**Cons:**
- ❌ Limited to 50 submissions/month on free plan
- ❌ Redirects to Formspree page after submission

---

### Option 3: Google Forms (Simplest)

Create a Google Form and embed it or link to it from your registration page.

**Pros:**
- ✅ Completely free
- ✅ Unlimited submissions
- ✅ Responses stored in Google Sheets
- ✅ Email notifications available

**Cons:**
- ❌ Less customizable design
- ❌ Users leave your website

---

### Option 4: Backend Server (Most Professional)

Create a backend server using Node.js, Python, or PHP that handles email sending.

**Example with Node.js + Nodemailer:**

```javascript
// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

app.post('/api/register', async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-app-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'nithikroshan03@gmail.com',
        subject: `New Registration: ${req.body.fullName}`,
        text: JSON.stringify(req.body, null, 2)
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.listen(3000);
```

**Pros:**
- ✅ Full control
- ✅ No submission limits
- ✅ Can add database storage
- ✅ Most professional

**Cons:**
- ❌ Requires server hosting
- ❌ More complex setup
- ❌ Ongoing maintenance

---

## My Recommendation

**For your IEEE Student Branch website, I recommend starting with EmailJS:**

1. **Easy to set up** (takes 10-15 minutes)
2. **No backend needed** (keeps it simple)
3. **200 emails/month is enough** for a student branch
4. **Professional looking** (no redirects, stays on your site)
5. **Free** for your use case

---

## Quick EmailJS Setup Instructions

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/) and sign up
2. Click "Add New Service" → Choose Gmail
3. Connect your Gmail account (nithikroshan03@gmail.com)
4. Create an email template with these variables:
   - `{{fullName}}`
   - `{{email}}`
   - `{{studentId}}`
   - `{{major}}`
   - `{{year}}`
   - `{{phone}}`
   - `{{ieeeNumber}}`
   - `{{interests}}`
   - `{{mailingList}}`
   - `{{timestamp}}`
5. Copy your Public Key, Service ID, and Template ID
6. Update the `register.html` file with the code shown in Option 1 above

---

## Testing Your Current Setup

The current mailto: implementation will work if:
- Users have Outlook, Apple Mail, or Thunderbird installed
- They click "Send" in their email client

To test it:
1. Open `register.html` in your browser
2. Fill out the form
3. Click "Complete Registration"
4. Your email client should open
5. Click "Send" to complete the test

---

## Need Help?

If you want to implement EmailJS or any other solution, let me know and I can update the code for you!

---

**Current Email:** nithikroshan03@gmail.com
**Registration Page:** register.html
