# Rocky Mount Almanac

Ad-free weather utility for Tennessee, built for Rocky Mount State Historic Site.

**Route:** `/almanac`

---

## Features

| Feature | Status | Description |
|---------|--------|-------------|
| Weather Hero | Done | Current temp, feels like, conditions |
| Task Scores | Done | Sower, Shepherd, Keeper, Builder indices |
| NativePulse | Done | Seed stratification tracker |
| Frontier Sayings | Done | Weather-based period-appropriate quotes |
| Moon Phase | Done | Current lunar phase via SunCalc |
| Hourly Forecast | Done | Next 12 hours |
| 7-Day Outlook | Done | Week forecast |
| Location Picker | Done | Search by city/zip, localStorage persistence |
| Soil Temperature | Done | 6cm depth for planting decisions |
| Precipitation Radar | Done | RainViewer API with animation |
| Frost Alerts | Done | Risk assessment UI (backend not implemented) |
| PWA Manifest | Done | "Add to Home Screen" capability |
| OG/Twitter Meta | Done | Social sharing cards |

### Not Implemented
- Lo-Fi Hearth audio
- Easter egg commands
- TN 250 badge
- Frost Alert email/SMS backend

---

## Vercel Deployment

### Environment Variables

**None required.** All APIs used are free and public:
- Open-Meteo (weather) - No API key needed
- Open-Meteo Geocoding - No API key needed
- RainViewer (radar) - No API key needed

### Caching

The weather API route uses Next.js ISR caching:
```typescript
// app/api/weather/route.ts
fetch(url, { next: { revalidate: 300 } }) // 5-minute cache
```

This works automatically on Vercel. No configuration needed.

### API Rate Limits

| API | Limit | Notes |
|-----|-------|-------|
| Open-Meteo | 10,000/day | Shared between weather + geocoding |
| RainViewer | Unlimited | Public API |

For high-traffic sites, consider:
1. Increase cache duration (currently 5 min)
2. Add a CDN layer for static radar tiles

### Future: Frost Alert Backend

To implement email/SMS frost alerts, you'll need:

1. **Database** (Supabase recommended):
   ```sql
   CREATE TABLE frost_alert_subscribers (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     email TEXT UNIQUE NOT NULL,
     phone TEXT,
     latitude DECIMAL NOT NULL,
     longitude DECIMAL NOT NULL,
     verified BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

2. **Environment Variables** (add to Vercel):
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_anon_key
   SENDGRID_API_KEY=your_sendgrid_key  # or Resend/AWS SES
   ```

3. **Vercel Cron Job** (add to vercel.json):
   ```json
   {
     "crons": [{
       "path": "/api/frost-alerts/check",
       "schedule": "0 21 * * *"
     }]
   }
   ```
   Runs at 4 PM EST (21:00 UTC) daily to check forecasts and send alerts.

4. **API Routes to Create**:
   - `POST /api/frost-alerts/subscribe` - Add subscriber
   - `GET /api/frost-alerts/verify?token=xxx` - Verify email
   - `DELETE /api/frost-alerts/unsubscribe?token=xxx` - Remove subscriber
   - `GET /api/frost-alerts/check` - Cron job endpoint

---

## File Structure

```
app/
├── almanac/
│   ├── page.tsx         # Main page
│   ├── layout.tsx       # OG/Twitter meta
│   └── almanac.css      # Isolated styles
├── api/
│   └── weather/
│       └── route.ts     # Weather proxy with caching
└── manifest.ts          # PWA manifest

components/almanac/
├── AlmanacHero.tsx      # Temperature display
├── FrontierSaying.tsx   # Weather quotes
├── TaskScores.tsx       # Activity indices
├── WeatherDetails.tsx   # Hourly + daily
├── MoonPhase.tsx        # Lunar display
├── NativePulse.tsx      # Stratification tracker
├── LocationPicker.tsx   # Location search modal
├── SoilTemperature.tsx  # Soil temp display
├── PrecipitationRadar.tsx # Animated radar
└── FrostAlert.tsx       # Frost risk UI

lib/almanac/
├── types.ts             # TypeScript interfaces
├── weather.ts           # Data transformation
├── taskScores.ts        # Score calculations + NativePulse
├── sayings.ts           # Frontier quotes
├── moonPhase.ts         # SunCalc wrapper
├── geocoding.ts         # Location search
├── storage.ts           # localStorage helpers
└── weatherIcons.tsx     # Lucide icon mapping
```

---

## Dependencies

```json
{
  "suncalc": "^1.9.0",
  "lucide-react": "^0.x",
  "framer-motion": "^11.x",
  "clsx": "^2.x",
  "tailwind-merge": "^2.x"
}
```

---

## Local Development

```bash
npm run dev
# Open http://localhost:3000/almanac
```

### Testing Different Locations

1. Click the location name at top
2. Enter a city or zip code
3. Weather refetches for new location
4. Reset button returns to Sullivan County, TN

### Testing Frost Alerts

The frost alert UI shows when:
- Tonight's low <= 36°F (watch)
- Tonight's low <= 32°F (warning)
- Tonight's low <= 28°F (danger)

To test, change a location to somewhere cold or wait for winter.

---

## Attribution

- Weather data: [Open-Meteo](https://open-meteo.com/) (CC-BY 4.0)
- Radar data: [RainViewer](https://www.rainviewer.com/)
- Map tiles: [OpenStreetMap](https://www.openstreetmap.org/)
- Moon calculations: [SunCalc](https://github.com/mourner/suncalc)
