# Scripts

## `generate-stations.js`

Generates the station list from the SVG map file.

```bash
node scripts/generate-stations.js > src/entities/map/model/stations.ts
```

## `fetch-station-geo.js`

Fetches station geographic coordinates from the TfL Unified API and generates `station-geo.ts`.

**Usage:**
```bash
# Use cache if available (default)
node scripts/fetch-station-geo.js

# Force refresh from API (ignore cache)
node scripts/fetch-station-geo.js --refresh

# Set custom cache age (in days)
node scripts/fetch-station-geo.js --cache-age 30
```

**What it does:**
1. Reads station IDs from `src/entities/map/model/stations.ts`
2. Fetches station locations from TfL API for multiple modes (or uses cache):
   - Tube
   - DLR
   - Overground
   - Elizabeth Line
   - Tram
3. Caches API responses in `data/tfl-api-response/` (default: 7 days)
4. Matches TfL station names to our station IDs using fuzzy matching
5. Generates `src/entities/map/model/station-geo.ts` with coordinates

**Caching:**
- API responses are cached in `data/tfl-api-response/` to avoid repeated requests
- Cache expires after 7 days by default (configurable with `--cache-age`)
- Use `--refresh` to force fetching fresh data from the API
- If API fetch fails, the script falls back to cached data if available

**API Source:**
- TfL Unified API: https://api.tfl.gov.uk
- Endpoint: `/StopPoint/Mode/{mode}`
- Documentation: https://techforum.tfl.gov.uk/t/station-locations/3076

**Note:** The script matches ~83% of stations automatically. Remaining stations may need manual mapping if they use different naming conventions.

