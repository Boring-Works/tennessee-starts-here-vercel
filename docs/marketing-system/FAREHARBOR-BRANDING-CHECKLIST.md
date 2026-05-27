# FareHarbor Branding Consistency Checklist

**Created:** January 29, 2026
**Task:** Verify FareHarbor dashboard matches new site branding

---

## FareHarbor Integration Details

**Default Booking URL:** `https://fareharbor.com/embeds/book/rockymountmuseum/`

**How it's used:**
- Events with `requiresTicket: true` link to this URL
- Custom `ticketUrl` can override for specific events
- Implemented in `lib/data/ticketUrl.ts`

---

## Manual Verification Checklist

Login to FareHarbor dashboard and verify:

### 1. Company Branding
- [ ] Company name: "Rocky Mount State Historic Site" or "Rocky Mount Museum"
- [ ] Tagline: "Tennessee Starts Here" (if field exists)
- [ ] Logo matches new branding (if uploaded)

### 2. Tour Product Naming
- [ ] Main tour product called: **"Guided Living History Tour"** (not "Tour" or "General Admission")
- [ ] Description mentions: "Where Tennessee's government began" or similar 2026 messaging
- [ ] Hours listed: **Wednesday–Saturday, 10am–5pm**
- [ ] Last tour time: **4pm**

### 3. Event Products
Check each ticketed event (26 events in 2026):
- [ ] Event names match `events.json` exactly
- [ ] Descriptions use 2026 commemorative language
- [ ] Pricing consistent with site content

### 4. Booking Flow Copy
- [ ] Confirmation emails reference "Tennessee Starts Here"
- [ ] Booking page header/footer match new site design
- [ ] No references to old branding or outdated messaging

### 5. Key Messaging to Update (if found)

**OLD messaging to replace:**
- "Rocky Mount Museum" → "Rocky Mount State Historic Site"
- Any references to "1791" as founding year → "1790"
- Generic "historic site tour" → "Guided Living History Tour"
- Old taglines → "Tennessee Starts Here"

**NEW messaging to ensure:**
- "Where Tennessee's government began"
- "First capital of the Southwest Territory (1790-1792)"
- "America 250 commemorative events"
- "Tennessee's 230th birthday (June 1, 2026)"

---

## Products to Verify

Based on `events.json`, these events require FareHarbor tickets:

### Signature Events
1. **Road to 250** (March 4) - Season opener
2. **Stitching Independence** (June 13-14) - Flag weekend
3. **Colonial Independence Day** (July 4) - America 250 peak
4. **First Families Reunion** (Sept 11-13)
5. **Candlelight Christmas** (Dec 4-12)

### Festivals
6. **Early Frontier Days** (May 23-25)
7. **Woolly Days** (May 2-4)
8. **Harvest Fest** (Oct 10-11)

### Camps
9. **Summer Camp Week 1-4** (June-July)

### Workshops
10. **Blacksmith Workshops** (recurring)
11. **Hearth Cooking Classes** (recurring)
12. **Twilight Tours** (recurring)

---

## If Mismatches Found

**Can't edit directly in code?**
- FareHarbor content must be updated in their dashboard
- Login at: https://fareharbor.com/dashboard/
- Navigate to: Items → Edit each product

**Update priority:**
1. Main tour product name/description (HIGH)
2. Signature event descriptions (HIGH)
3. Confirmation email templates (MEDIUM)
4. Minor copy updates (LOW)

---

## Testing Recommendations

After updating FareHarbor:

1. **Test booking flow:**
   - Book a test tour from `/visit` page
   - Verify confirmation email branding
   - Check mobile experience

2. **Test event booking:**
   - Book test ticket for signature event
   - Verify event description matches site
   - Check pricing displays correctly

3. **Cross-device:**
   - Desktop: Chrome, Safari, Edge
   - Mobile: iOS Safari, Android Chrome

---

## Notes

- FareHarbor embed may cache content (15-30 min delay for updates)
- Hard refresh users' browsers if they report old branding
- Contact FareHarbor support if embed issues persist

---

**Status:** ⏳ Awaiting manual verification in FareHarbor dashboard

**Next:** Once verified, mark Task #6 complete
