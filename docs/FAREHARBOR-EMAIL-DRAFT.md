# FareHarbor Webhook Setup Email

**TO:** support@fareharbor.com
**SUBJECT:** Webhook Setup Request - Rocky Mount Museum (rockymountmuseum)

---

**COPY AND SEND:**

---

Hi FareHarbor Support,

I'm the web administrator for Rocky Mount State Historic Site (shortname: **rockymountmuseum**).

We'd like to set up webhooks to track completed bookings on our website. Could you please:

1. **Enable webhooks** for our account for the following events:
   - `booking.created`
   - `booking.updated`
   - `booking.cancelled`

2. **Send webhooks to this endpoint:**

   ```
   https://tennesseestartshere.com/api/fareharbor-webhook
   ```

3. **Provide us with the HMAC webhook secret** so we can verify the signatures.

We're implementing GA4 purchase event tracking and need to fire analytics when bookings complete (not just when visitors click "Book Now").

Please let me know if you need any additional information.

Thank you,
Cody Boring
Executive Director
Rocky Mount State Historic Site
(423) 538-7396

---

## After Sending

When FareHarbor replies with the webhook secret:

1. Add to `.env.local`:

   ```
   FAREHARBOR_WEBHOOK_SECRET=your_secret_here
   ```

2. Add to Vercel environment variables (Production):
   - Go to: https://vercel.com/[your-team]/tennessee-starts-here/settings/environment-variables
   - Add: `FAREHARBOR_WEBHOOK_SECRET`

3. Redeploy to apply the new environment variable.

---

## GA4 Server-Side Tracking (Also Required)

The webhook now fires GA4 `purchase` and `refund` events. To enable this:

1. **Get GA4 API Secret:**
   - Go to: https://analytics.google.com
   - Admin → Data Streams → Select your stream
   - Measurement Protocol API secrets → Create

2. **Add to `.env.local`:**

   ```
   GA4_API_SECRET=your_api_secret_here
   ```

3. **Add to Vercel environment variables:**
   - Add: `GA4_API_SECRET`

4. **Verify in GA4:**
   - After a test booking, check Realtime → Events for `purchase` event
