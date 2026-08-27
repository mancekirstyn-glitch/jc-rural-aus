# JC Rural AUS — Lead Capture & Contact Form Workflow

## Overview

The JC Rural AUS landing page now features a professional contact form designed to capture lead information directly from potential clients. This document outlines the form's functionality, data submission process, and how to access and manage the captured leads.

---

## Contact Form Functionality

### Fields Included

The contact form collects the following essential information:

- **Your name:** Full name of the inquirer.
- **Phone number:** Primary contact phone number.
- **Email address:** Primary contact email address.
- **What service do you need?:** A dropdown selection of services (Lamb marking, Fencing, Shearing support, Livestock handling, Tractor operations, General farm labour, Other / Multiple services).
- **Tell us about the job:** A free-text area for detailed job descriptions, location, timing, and other relevant information.

### Validation

Each field includes client-side validation to ensure data quality:
- **Required fields:** All fields are mandatory.
- **Phone number format:** Basic validation for numerical and common phone characters.
- **Email address format:** Standard email regex validation.
- **Message length:** Minimum of 10 characters required for the job description.

### Submission Status

- **Success:** A green success message is displayed upon successful submission, confirming receipt of the inquiry.
- **Error:** A red error message is displayed if submission fails, advising the user to call directly or try again.

---

## Lead Submission Process

### 1. Data Collection
When a user submits the form, the collected data includes:
- All form field values (name, phone, email, service, message).
- **UTM parameters:** Automatically appended from the page URL (`utm_source`, `utm_medium`, `utm_campaign`).
- **Timestamp:** `submitted_at` (ISO string).
- **Page URL:** `page_url` (the exact URL where the form was submitted).

### 2. Manus Forge API Integration

The form submits data to the Manus Forge API, which handles secure storage and notification:
- **Endpoint:** `${import.meta.env.VITE_FRONTEND_FORGE_API_URL}/api/forms/submit`
- **Method:** `POST`
- **Authentication:** Uses `Bearer ${import.meta.env.VITE_FRONTEND_FORGE_API_KEY}` for secure API access.
- **Payload:** Includes `form_type` (`contact_form`), `app_id` (`import.meta.env.VITE_APP_ID`), and the `data` object containing all collected information.

### 3. Lead Notification (Manus Forge)
Upon successful submission to the Forge API, you will typically receive notifications (e.g., email, internal dashboard alerts) configured within your Manus project settings. This ensures you are promptly informed of new inquiries.

### 4. Analytics Tracking (Umami)

Successful form submissions are tracked as events in Umami analytics:
- **Event Name:** `form_submission`
- **Event Data:** Includes `form_type: 'contact_form'` and `service: <selected_service>`.
- **Purpose:** Allows you to track the volume of form submissions and identify which services generate the most inquiries.

---

## Accessing & Managing Leads

### Manus Forge Dashboard

All submitted form data is securely stored and accessible via the Manus Forge dashboard:

1. **Log in to Manus:** Access your Manus account.
2. **Navigate to your project:** Select the "JC Rural AUS" project.
3. **Access Forms/Data:** Look for a "Forms" or "Data" section where submissions are listed.
4. **Export Data:** Most dashboards allow you to view, filter, and export lead data (e.g., as CSV) for further processing or CRM integration.

### Email Notifications

Ensure your Manus project is configured to send email notifications for form submissions. This provides immediate alerts for new leads.

---

## Best Practices for Lead Management

### 1. Prompt Follow-Up
- Respond to all inquiries within 24 hours to maximize conversion rates.
- Personalize your responses based on the details provided in the "Tell us about the job" field.

### 2. CRM Integration
- For larger volumes of leads, consider integrating your Manus Forge data with a Customer Relationship Management (CRM) system (e.g., HubSpot, Salesforce).
- This allows for automated lead nurturing, task assignment, and comprehensive client management.

### 3. A/B Test Form Elements
- Experiment with different field labels, placeholder text, or button copy to optimize conversion rates.
- Test the impact of adding or removing optional fields.

### 4. Monitor Form Performance
- Regularly check Umami analytics for `form_submission` events to track conversion rates.
- Analyze which traffic sources (via UTM parameters) lead to the most form submissions.
- Monitor form error rates to identify potential usability issues.

### 5. Data Privacy
- Ensure your website's privacy policy clearly states how user data is collected, stored, and used.
- Comply with relevant data protection regulations (e.g., GDPR, CCPA).

---

## Troubleshooting Form Issues

### Form Not Submitting
- **Check browser console:** Look for JavaScript errors related to form validation or API calls.
- **Verify API key:** Ensure `VITE_FRONTEND_FORGE_API_KEY` is correctly configured in your project environment variables.
- **Network tab:** Inspect network requests in your browser's developer tools to see if the API call is being made and what response it receives.

### No Notifications Received
- **Manus project settings:** Confirm that email or other notification channels are set up for form submissions in your Manus dashboard.
- **Spam folder:** Check your email spam or junk folder.

### Validation Errors
- **Review `ContactForm.tsx`:** Ensure validation logic matches your requirements.
- **Test edge cases:** Try submitting with empty fields, invalid emails, or short messages to verify error messages.

---

## Next Steps

1. **Test the form:** Submit a test inquiry to ensure it functions correctly and you receive notifications.
2. **Configure notifications:** Set up desired lead notifications in your Manus project settings.
3. **Monitor analytics:** Keep an eye on Umami events for `form_submission` to track lead volume.
4. **Integrate with CRM (Optional):** If needed, explore options for connecting Manus Forge data to your CRM.

---

## Support & Resources

### Useful Links

- **Manus Forge API Documentation:** [Link to Manus Forge API docs]
- **Umami Analytics Documentation:** [Link to Umami docs]
- **UTM Parameter Best Practices:** [Link to Semrush article]
