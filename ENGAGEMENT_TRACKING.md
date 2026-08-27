# JC Rural AUS — Engagement Tracking & Analytics Setup

## Overview

The JC Rural AUS landing page includes UTM (Urchin Tracking Module) parameters on all social and business profile links to monitor visitor engagement and traffic sources. This document outlines the tracking implementation, how to interpret the data, and best practices for monitoring performance.

---

## UTM Tracking Parameters

All external social and business profile links include standardized UTM parameters to track visitor engagement:

### Parameter Structure

| Parameter | Value | Purpose |
|-----------|-------|---------|
| `utm_source` | `jcruralaus_website` | Identifies the website as the traffic source |
| `utm_medium` | `social` or `business_profile` | Distinguishes between social media and business profile links |
| `utm_campaign` | `engagement` | Groups all engagement tracking under a single campaign |

### Link Examples

**Facebook Link (Contact Section & Footer):**
```
https://www.facebook.com/search/top/?q=JC%20RURAL%20AUS?utm_source=jcruralaus_website&utm_medium=social&utm_campaign=engagement
```

**Google Business Profile Link (Footer):**
```
https://www.google.com/search?q=JC+Rural+AUS+Tasmania?utm_source=jcruralaus_website&utm_medium=business_profile&utm_campaign=engagement
```

---

## Tracking Locations

The landing page includes tracked social and business profile links in two primary locations:

### 1. Contact Ledger (Main Contact Section)
- **Location:** Right-side contact information panel above the footer
- **Links:** Facebook profile link with tracking parameters
- **Purpose:** Direct engagement from the primary call-to-action area

### 2. Footer
- **Location:** Bottom of every page
- **Links:** 
  - Facebook icon link with tracking
  - Google Business Profile icon link with tracking
- **Purpose:** Secondary engagement opportunity for users scrolling to the bottom

---

## Monitoring Engagement in Google Analytics

To track visitor engagement from these links:

### Setup Instructions

1. **Ensure Google Analytics is Active**
   - The landing page includes the Umami analytics script in `client/index.html`
   - Verify the `VITE_ANALYTICS_WEBSITE_ID` environment variable is configured

2. **Access Your Analytics Dashboard**
   - Log in to your Google Analytics account
   - Navigate to the JC Rural AUS property

3. **View Traffic by Source**
   - Go to **Acquisition > Traffic Sources > UTM Parameters**
   - Filter by:
     - `utm_source: jcruralaus_website`
     - `utm_medium: social` (Facebook) or `utm_medium: business_profile` (Google)
     - `utm_campaign: engagement`

### Key Metrics to Monitor

| Metric | What It Measures | Interpretation |
|--------|------------------|-----------------|
| **Sessions** | Total visits from tracked links | Overall engagement volume |
| **Users** | Unique visitors from tracked links | Audience reach and growth |
| **Bounce Rate** | Percentage of single-page sessions | Link relevance and quality |
| **Conversion Rate** | Percentage completing desired actions (calls, emails) | Effectiveness of social/profile links |
| **Session Duration** | Average time spent on the site | Content engagement depth |

---

## Engagement Tracking Workflow

### Step 1: Link Clicks Recorded
When a visitor clicks a Facebook or Google Business Profile link from the landing page, the UTM parameters are appended to the destination URL.

### Step 2: Analytics Capture
The Umami analytics script captures the outbound link click event with the UTM parameters.

### Step 3: Data Aggregation
Analytics platforms (Google Analytics, Umami) aggregate the data by source, medium, and campaign.

### Step 4: Performance Review
Review the aggregated data weekly or monthly to assess:
- Which links drive the most engagement
- Whether visitors are converting (calling, emailing) after clicking social links
- Seasonal trends in engagement

---

## Best Practices for Engagement Monitoring

### 1. Regular Review Schedule
- **Weekly:** Check total clicks and bounce rates
- **Monthly:** Analyze conversion rates and session duration trends
- **Quarterly:** Compare performance across quarters to identify growth patterns

### 2. A/B Testing Considerations
If you modify link placement or styling, consider:
- Keeping UTM parameters consistent for accurate historical comparison
- Testing one change at a time (e.g., button color, link text)
- Allowing at least 2–4 weeks of data collection before drawing conclusions

### 3. Conversion Tracking
To measure whether social/profile link clicks lead to actual business inquiries:
- Set up conversion goals for phone calls (track via call tracking service)
- Set up conversion goals for emails (track via form submissions if added)
- Use UTM parameters in email signatures and follow-up communications to maintain attribution

### 4. Mobile vs. Desktop Performance
Monitor performance separately for mobile and desktop visitors:
- Mobile users may click social links more frequently
- Desktop users may have higher conversion rates
- Adjust link placement and styling based on device-specific insights

---

## Customizing UTM Parameters

To modify tracking parameters for specific campaigns or tests:

1. **Edit the tracking constants** in `client/src/pages/Home.tsx`:
   ```typescript
   const trackingParams = {
     facebook: "?utm_source=jcruralaus_website&utm_medium=social&utm_campaign=engagement",
     googleBusiness: "?utm_source=jcruralaus_website&utm_medium=business_profile&utm_campaign=engagement",
   };
   ```

2. **Common customizations:**
   - Change `utm_campaign` to `seasonal_promo` or `summer_campaign` for time-limited campaigns
   - Add `utm_content` parameter to distinguish between multiple links of the same type
   - Add `utm_term` for keyword-specific tracking (if applicable)

3. **Example custom parameter:**
   ```typescript
   facebook: "?utm_source=jcruralaus_website&utm_medium=social&utm_campaign=spring_2026&utm_content=footer_link",
   ```

---

## Troubleshooting

### Links Not Being Tracked
- **Verify UTM parameters:** Check that the URL includes all four parameters
- **Check analytics setup:** Ensure the analytics script is active and the website ID is correct
- **Allow time for data:** Analytics data can take 24–48 hours to appear in dashboards

### Unusually High Bounce Rates
- **Review link relevance:** Ensure the Facebook and Google Business Profile pages are current and relevant
- **Check destination pages:** Verify that the destination pages load quickly and are mobile-friendly
- **Consider user intent:** Users clicking social links may have different intent than other visitors

### Low Conversion Rates
- **Optimize call-to-action:** Ensure phone and email links are prominent and easy to click
- **Test link placement:** Experiment with moving links to higher-visibility areas
- **Add follow-up:** Consider adding a form or chat option to capture leads who don't call immediately

---

## Analytics Platforms

### Umami (Built-in)
- **Status:** Active on all pages
- **Data:** Captures page views, outbound link clicks, and session data
- **Access:** View through Umami dashboard (if configured)

### Google Analytics (Recommended Addition)
- **Setup:** Add Google Analytics 4 property ID to environment variables
- **Benefits:** Advanced segmentation, conversion tracking, and detailed audience insights
- **Cost:** Free tier available

### Facebook Pixel (Optional)
- **Setup:** Add Facebook Pixel ID to track conversions on Facebook
- **Benefits:** Retarget website visitors on Facebook with ads
- **Cost:** Free to set up

---

## Next Steps

1. **Verify Analytics Setup:** Confirm that the Umami analytics script is active and collecting data
2. **Set Up Google Analytics:** Add a Google Analytics 4 property for advanced tracking
3. **Create a Monitoring Schedule:** Establish a weekly or monthly review process
4. **Test Links:** Click each tracked link to verify UTM parameters are appended correctly
5. **Document Baseline:** Record initial engagement metrics to establish a baseline for comparison

---

## Support & Questions

For questions about engagement tracking or analytics setup, consult:
- [Google Analytics UTM Documentation](https://support.google.com/analytics/answer/1033173)
- [Umami Analytics Documentation](https://umami.is/docs)
- [UTM Parameter Best Practices](https://www.semrush.com/blog/utm-parameters/)
