const fs = require("fs");
const path = require("path");

// Paths
const stationsPath = path.join(__dirname, "..", "src", "entities", "map", "model", "stations.ts");
const outputPath = path.join(__dirname, "..", "src", "entities", "map", "model", "station-geo.ts");

// TfL API endpoints for different transport modes
const TFL_API_BASE = "https://api.tfl.gov.uk";
const MODES = [
  "tube",
  "dlr", 
  "overground",
  "elizabeth-line",
  "tram",
];

/**
 * Normalize station name for matching
 * Converts to lowercase, removes common words, handles variations
 */
function normalizeStationName(name) {
  // Split on "/" and take first part (e.g., "Balham Station / Balham Station Road" -> "Balham Station")
  let normalized = name.split("/")[0].trim();
  
  return normalized
    .toLowerCase()
    // Handle specific patterns first
    .replace(/heathrow\s+airport\s+terminal\s+(\d)/g, "heathrow_$1") // Heathrow Airport Terminal 4 -> heathrow_4
    .replace(/king'?s\s+cross\s+st\.?\s*pancras/gi, "king_cross_st_pancras") // King's Cross St. Pancras
    .replace(/st\.?\s*john'?s/gi, "st_johns") // St. John's -> st_johns
    .replace(/st\.?\s*paul'?s/gi, "st_pauls") // St. Paul's -> st_pauls
    .replace(/st\.?\s*james'?s/gi, "st_jamess") // St. James's -> st_jamess
    .replace(/shepherd'?s/gi, "shepherds") // Shepherd's -> shepherds
    // Normalize abbreviations before removing special chars
    .replace(/\bstn\b/g, "station")
    .replace(/\bst\./g, "st") // St. -> st (before removing periods)
    .replace(/\bst\b/g, "street")
    .replace(/\brd\b/g, "road")
    .replace(/\bln\b/g, "lane")
    .replace(/\bctr\b/g, "center")
    .replace(/\btn\b/g, "town")
    // Handle special cases
    .replace(/h&c/gi, "hammersmithandcity")
    .replace(/&/g, "and")
    // Normalize apostrophes (King's -> kings)
    .replace(/'/g, "")
    // Replace periods with nothing (St. -> St)
    .replace(/\./g, "")
    // Replace hyphens with underscores for consistency
    .replace(/-/g, "_")
    // Replace spaces with underscores
    .replace(/\s+/g, "_")
    // Remove all non-alphanumeric except underscores (but keep underscores)
    .replace(/[^a-z0-9_]/g, "")
    // Remove common suffixes
    .replace(/_station$/, "")
    .replace(/_underground$/, "")
    .replace(/_tube$/, "")
    .replace(/_dlr$/, "")
    .replace(/_overground$/, "")
    .replace(/_rail$/, "")
    .replace(/_bus_station$/, "")
    .replace(/_tram_stop$/, "")
    .replace(/_main_entrance$/, "")
    .replace(/_entrance$/, "")
    // Clean up multiple underscores
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

/**
 * Extract base station name from our station ID
 * Removes suffixes like _deep, _circle, _district, etc.
 */
function getBaseStationId(stationId) {
  // Normalize hyphens to underscores first
  let normalized = stationId.replace(/-/g, "_");
  
  // Remove common suffixes (order matters - remove position suffixes BEFORE line-specific ones)
  let withoutSuffix = normalized.toLowerCase();
  
  // Remove position/level suffixes FIRST (iteratively to handle multiple suffixes like "deep_base")
  // Keep removing until no more position suffixes are found
  let previous;
  do {
    previous = withoutSuffix;
    withoutSuffix = withoutSuffix.replace(/_(top|base|mid|deep|surface|below_ground)$/i, "");
  } while (previous !== withoutSuffix);
  
  // Remove line-specific suffixes AFTER position suffixes
  withoutSuffix = withoutSuffix
    .replace(/_(piccadilly|district|circle|bakerloo|central|northern|victoria|jubilee|metropolitan|elizabeth|dlr|overground|hnc)$/i, "");
  
  // Remove other common suffixes
  withoutSuffix = withoutSuffix
    .replace(/_(nr|cr|hub|osi|validator|zone|tube|rail)$/i, "");
  
  // Remove special suffixes
  withoutSuffix = withoutSuffix
    .replace(/_(special|divider|shared|isi|tunnel)$/i, "");
  
  // Clean up multiple underscores
  withoutSuffix = withoutSuffix.replace(/_+/g, "_").replace(/^_|_$/g, "");
  
  return withoutSuffix;
}

/**
 * Match TfL station to our station ID
 */
function matchStation(tflStation, ourStationIds) {
  const originalName = (tflStation.commonName || tflStation.name || "").toLowerCase();
  const stopType = (tflStation.stopType || "").toLowerCase();
  
  // Skip bus stations, tram stops, and non-station stops
  if (stopType.includes("bus") || originalName.includes("bus station")) {
    return null;
  }
  
  if (stopType.includes("tram") && !stopType.includes("station")) {
    return null;
  }
  
  // Skip entrances and non-station stops (but allow Station types)
  if (stopType && !stopType.includes("station") && !stopType.includes("metro")) {
    return null;
  }
  
  // Special handling for specific stations (check BEFORE normalization)
  // King's Cross St. Pancras - handle various formats
  if ((originalName.includes("king") && originalName.includes("cross") && (originalName.includes("pancras") || originalName.includes("st pancras"))) ||
      originalName.includes("kings cross st pancras")) {
    const match = ourStationIds.find(id => {
      const idLower = id.toLowerCase();
      return idLower.includes("king_cross_st_pancras") || idLower === "kings_cross_st_pancras";
    });
    if (match) {
      console.log(`  Special match: "${tflStation.commonName || tflStation.name}" -> ${match}`);
      return match;
    }
  }
  
  // Heathrow terminals - handle various formats
  if (originalName.includes("heathrow")) {
    if (originalName.includes("terminal 4") || originalName.includes("t4") || originalName.includes("t 4") || originalName.match(/terminal\s*4/i)) {
      // Prefer piccadilly, then elizabeth
      const match = ourStationIds.find(id => id.toLowerCase() === "heathrow_4_piccadilly") ||
                   ourStationIds.find(id => id.toLowerCase() === "heathrow_4_elizabeth");
      if (match) {
        console.log(`  Special match: "${tflStation.commonName || tflStation.name}" -> ${match}`);
        return match;
      }
    }
    if (originalName.includes("terminal 5") || originalName.includes("t5") || originalName.includes("t 5") || originalName.match(/terminal\s*5/i)) {
      const match = ourStationIds.find(id => id.toLowerCase() === "heathrow_5_piccadilly") ||
                   ourStationIds.find(id => id.toLowerCase() === "heathrow_5_elizabeth");
      if (match) {
        console.log(`  Special match: "${tflStation.commonName || tflStation.name}" -> ${match}`);
        return match;
      }
    }
    if (originalName.includes("terminal 1") || originalName.includes("terminal 2") || originalName.includes("terminal 3") ||
        originalName.includes("terminals 1-2-3") || originalName.includes("terminals 1 2 3") ||
        originalName.match(/terminal\s*[123]/i)) {
      const match = ourStationIds.find(id => id.toLowerCase() === "heathrow_23");
      if (match) {
        console.log(`  Special match: "${tflStation.commonName || tflStation.name}" -> ${match}`);
        return match;
      }
    }
  }
  
  // Shepherd's Bush - match to tube variant
  if (originalName.includes("shepherd") && originalName.includes("bush")) {
    if (originalName.includes("central") || originalName.includes("tube")) {
      const match = ourStationIds.find(id => id.toLowerCase() === "shepherds_bush_tube");
      if (match) {
        console.log(`  Special match: "${tflStation.commonName || tflStation.name}" -> ${match}`);
        return match;
      }
    }
  }
  
  // Euston variants
  if (originalName.includes("euston")) {
    if (originalName.includes("overground") || originalName.includes("rail")) {
      const match = ourStationIds.find(id => id.toLowerCase() === "euston_overground_nr");
      if (match) {
        console.log(`  Special match: "${tflStation.commonName || tflStation.name}" -> ${match}`);
        return match;
      }
    }
    if (originalName.includes("northern") || originalName.includes("victoria")) {
      const match = ourStationIds.find(id => id.toLowerCase() === "euston_northern_victoria");
      if (match) {
        console.log(`  Special match: "${tflStation.commonName || tflStation.name}" -> ${match}`);
        return match;
      }
    }
  }
  
  // St James Street variants
  if (originalName.includes("st james") && originalName.includes("street")) {
    const match = ourStationIds.find(id => id.toLowerCase() === "st_james_street");
    if (match) {
      console.log(`  Special match: "${tflStation.commonName || tflStation.name}" -> ${match}`);
      return match;
    }
  }
  
  // Cutty Sark
  if (originalName.includes("cutty sark")) {
    const match = ourStationIds.find(id => id.toLowerCase().includes("cutty_sark"));
    if (match) {
      console.log(`  Special match: "${tflStation.commonName || tflStation.name}" -> ${match}`);
      return match;
    }
  }
  
  // Liverpool Street variants - match base/top variants
  if (originalName.includes("liverpool") && originalName.includes("street")) {
    // Try to match to any Liverpool Street variant
    const match = ourStationIds.find(id => {
      const idLower = id.toLowerCase();
      return idLower.includes("liverpool_street") && (idLower.includes("circle") || idLower.includes("elizabeth"));
    });
    if (match) {
      console.log(`  Special match: "${tflStation.commonName || tflStation.name}" -> ${match}`);
      return match;
    }
  }
  
  // Paddington variants - match base variants
  if (originalName.includes("paddington")) {
    if (originalName.includes("deep") || originalName.includes("elizabeth")) {
      // Match to appropriate variant
      const match = ourStationIds.find(id => {
        const idLower = id.toLowerCase();
        return (idLower.includes("paddington_deep") || idLower.includes("paddington_elizabeth")) && 
               (idLower.includes("base") || idLower.includes("deep") || idLower.includes("elizabeth"));
      });
      if (match) {
        console.log(`  Special match: "${tflStation.commonName || tflStation.name}" -> ${match}`);
        return match;
      }
    }
  }
  
  // Moorgate variants
  if (originalName.includes("moorgate")) {
    const match = ourStationIds.find(id => id.toLowerCase().includes("moorgate"));
    if (match) {
      console.log(`  Special match: "${tflStation.commonName || tflStation.name}" -> ${match}`);
      return match;
    }
  }
  
  // Eastcote variants
  if (originalName.includes("eastcote")) {
    if (originalName.includes("piccadilly")) {
      const match = ourStationIds.find(id => id.toLowerCase() === "eastcote_piccadilly");
      if (match) {
        console.log(`  Special match: "${tflStation.commonName || tflStation.name}" -> ${match}`);
        return match;
      }
    }
  }
  
  // Now normalize for regular matching
  // First normalize the TfL name, then get its base (same way we do for our station IDs)
  const tflNormalized = normalizeStationName(tflStation.commonName || tflStation.name);
  const tflBase = getBaseStationId(tflNormalized); // Apply same normalization as our station IDs
  
  // Try exact match first (comparing base-normalized names)
  for (const ourId of ourStationIds) {
    const ourBase = getBaseStationId(ourId);
    // Compare base-normalized names (this handles variants correctly)
    if (ourBase === tflBase) {
      return ourId;
    }
  }
  
  // Try partial match - check if base names match or contain each other
  const bestMatches = [];
  for (const ourId of ourStationIds) {
    const ourBase = getBaseStationId(ourId);
    
    // Exact match
    if (ourBase === tflBase) {
      bestMatches.push({ id: ourId, score: 100 });
    }
    // Contains match (e.g., "paddington" in "paddington_deep" -> both become "paddington")
    else if (ourBase.includes(tflBase) || tflBase.includes(ourBase)) {
      // Calculate similarity score
      const longer = Math.max(ourBase.length, tflBase.length);
      const shorter = Math.min(ourBase.length, tflBase.length);
      const score = shorter / longer * 50;
      bestMatches.push({ id: ourId, score });
    }
  }
  
  if (bestMatches.length > 0) {
    // Sort by score and return best match
    bestMatches.sort((a, b) => b.score - a.score);
    return bestMatches[0].id;
  }
  
  return null;
}

/**
 * Fetch stations from TfL API for a given mode
 * Uses cache if available, otherwise fetches from API
 */
async function fetchStationsForMode(mode, useCache, cacheMaxAge) {
  const cacheDir = path.join(__dirname, "..", "data", "tfl-api-response");
  const cacheFile = path.join(cacheDir, `${mode}.json`);
  
  // Check cache first
  if (useCache && fs.existsSync(cacheFile)) {
    try {
      const stats = fs.statSync(cacheFile);
      const age = Date.now() - stats.mtimeMs;
      
      if (age < cacheMaxAge) {
        console.log(`Using cached ${mode} stations (${Math.round(age / (60 * 60 * 1000))}h old)`);
        const cachedData = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
        const stations = cachedData.stopPoints || (Array.isArray(cachedData) ? cachedData : []);
        
        if (Array.isArray(stations)) {
          console.log(`  Found ${stations.length} ${mode} stations from cache`);
          return stations;
        }
      } else {
        console.log(`Cache expired for ${mode} (${Math.round(age / (24 * 60 * 60 * 1000))}d old), fetching fresh data...`);
      }
    } catch (error) {
      console.warn(`Error reading cache for ${mode}, fetching fresh data:`, error.message);
    }
  }
  
  // Fetch from API
  try {
    const url = `${TFL_API_BASE}/StopPoint/Mode/${mode}`;
    console.log(`Fetching ${mode} stations from: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Create directory if it doesn't exist
    fs.mkdirSync(cacheDir, { recursive: true });
    fs.writeFileSync(cacheFile, JSON.stringify(data, null, 2));
    console.log(`  Cached ${mode} stations to ${cacheFile}`);
    
    // TfL API returns { stopPoints: [...] }
    const stations = data.stopPoints || (Array.isArray(data) ? data : []);
    
    if (!Array.isArray(stations)) {
      console.warn(`  Warning: Expected array, got ${typeof stations}`);
      return [];
    }
    
    console.log(`  Found ${stations.length} ${mode} stations`);
    return stations;
  } catch (error) {
    console.error(`Error fetching ${mode} stations:`, error.message);
    
    // If fetch fails but cache exists, try to use cache anyway
    if (useCache && fs.existsSync(cacheFile)) {
      console.warn(`  Falling back to cached data...`);
      try {
        const cachedData = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
        const stations = cachedData.stopPoints || (Array.isArray(cachedData) ? cachedData : []);
        if (Array.isArray(stations)) {
          return stations;
        }
      } catch (cacheError) {
        console.error(`  Cache also failed:`, cacheError.message);
      }
    }
    
    return [];
  }
}

/**
 * Check if a station ID is a special entry that shouldn't be matched
 * Special entries include zones, dividers, tunnels, ISI, shared stations, etc.
 */
function isSpecialStation(stationId) {
  return stationId.includes('special') || 
         stationId.includes('zone') || 
         stationId.includes('divider') || 
         stationId.includes('isi') || 
         stationId.includes('tunnel') || 
         stationId.includes('shared') ||
         stationId.includes('Coach_Station');
}

/**
 * Read our station IDs from stations.ts
 * Filters out special entries that don't need coordinates
 */
function readOurStationIds() {
  const content = fs.readFileSync(stationsPath, "utf8");
  const matches = content.matchAll(/value:\s*"([^"]+)"/g);
  const allStationIds = Array.from(matches, (m) => m[1]);
  
  // Filter out special entries
  const regularStations = allStationIds.filter(id => !isSpecialStation(id));
  const specialStations = allStationIds.filter(id => isSpecialStation(id));
  
  console.log(`Found ${allStationIds.length} stations in our dataset`);
  console.log(`  Regular stations: ${regularStations.length}`);
  console.log(`  Special entries (skipped): ${specialStations.length}`);
  
  return regularStations;
}

/**
 * Main function
 */
async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const forceRefresh = args.includes("--refresh") || args.includes("-r");
  const cacheMaxAge = args.includes("--cache-age") 
    ? parseInt(args[args.indexOf("--cache-age") + 1]) * 24 * 60 * 60 * 1000
    : 30 * 24 * 60 * 60 * 1000; // Default: 30 days
  
  console.log("=".repeat(60));
  console.log("Fetching TfL Station Locations");
  if (forceRefresh) {
    console.log("⚠️  Force refresh mode: ignoring cache");
  } else {
    console.log("💾 Using cache if available (use --refresh to force update)");
  }
  console.log("=".repeat(60));
  
  // Read our station IDs
  const ourStationIds = readOurStationIds();
  
  // Fetch all stations from TfL API (or use cache)
  const allTflStations = [];
  for (const mode of MODES) {
    const stations = await fetchStationsForMode(mode, !forceRefresh, cacheMaxAge);
    allTflStations.push(...stations);
    // Small delay to avoid rate limiting (only if fetching from API)
    const cacheFile = path.join(__dirname, "..", "data", "tfl-api-response", `${mode}.json`);
    if (!fs.existsSync(cacheFile) || forceRefresh) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  
  console.log(`\nTotal TfL stations fetched: ${allTflStations.length}`);
  
  // Match TfL stations to our station IDs
  const matchedStations = new Map();
  const unmatchedTflStations = [];
  const tflStationMap = new Map(); // Track all TfL stations by normalized name
  
  // First pass: collect all TfL stations, preferring main stations over entrances
  for (const tflStation of allTflStations) {
    const lat = tflStation.lat;
    const lng = tflStation.lon;
    
    if (!lat || !lng) {
      continue;
    }
    
    const normalizedName = normalizeStationName(tflStation.commonName || tflStation.name);
    const isMainStation = tflStation.stopType && tflStation.stopType.includes("Station") && 
                         !tflStation.indicator?.toLowerCase().includes("entrance");
    
    // Prefer main stations over entrances
    if (!tflStationMap.has(normalizedName) || isMainStation) {
      tflStationMap.set(normalizedName, {
        station: tflStation,
        isMainStation,
      });
    }
  }
  
  // Create data directory if it doesn't exist
  const dataDir = path.join(__dirname, "..", "data");
  fs.mkdirSync(dataDir, { recursive: true });
  
  // Convert Map to object for JSON serialization
  const tflStationMapObj = Object.fromEntries(
    Array.from(tflStationMap.entries()).map(([key, value]) => [key, value])
  );
  fs.writeFileSync(path.join(dataDir, "tfl-station-map.json"), JSON.stringify(tflStationMapObj, null, 2));
  
  // Second pass: match to our station IDs
  for (const [_, { station: tflStation }] of tflStationMap) {
    const lat = tflStation.lat;
    const lng = tflStation.lon;
    const matchedId = matchStation(tflStation, ourStationIds);
    
    if (matchedId) {
      // If we already have this station ID, prefer main stations
      const existing = matchedStations.get(matchedId);
      const isMainStation = tflStation.stopType && tflStation.stopType.includes("Station") && 
                           !tflStation.indicator?.toLowerCase().includes("entrance");
      
      if (!existing || isMainStation) {
        matchedStations.set(matchedId, { 
          lat, 
          lng, 
          name: tflStation.commonName || tflStation.name 
        });
      }
    } else {
      unmatchedTflStations.push({
        name: tflStation.commonName || tflStation.name,
        id: tflStation.id,
        lat,
        lng,
      });
    }
  }
  
  // Third pass: Match variants that share the same base name and location
  // For unmatched stations, check if they're variants of matched stations
  let variantMatches = 0;
  const initialUnmatched = ourStationIds.filter(id => !matchedStations.has(id));
  
  // Keep iterating to catch multi-level variants (e.g., Liverpool_Street_elizabeth_base -> Liverpool_Street_circle_base)
  let previousUnmatchedCount = initialUnmatched.length;
  let iterations = 0;
  const maxIterations = 5; // Increased iterations to catch all variants
  
  while (iterations < maxIterations) {
    const currentUnmatched = ourStationIds.filter(id => !matchedStations.has(id));
    
    // Process matches first, then check if we made progress
    let iterationMatches = 0;
    
    for (const ourId of currentUnmatched) {
      const ourBase = getBaseStationId(ourId);
      
      // Skip if base is too short (not meaningful)
      if (ourBase.length <= 3) {
        continue;
      }
      
      // Check if any matched station shares the same base name
      for (const [matchedId, geo] of matchedStations.entries()) {
        const matchedBase = getBaseStationId(matchedId);
        
        // Only match if bases are exactly the same (strict matching)
        if (matchedBase === ourBase) {
          // This is a variant - use the same coordinates
          matchedStations.set(ourId, geo);
          variantMatches++;
          iterationMatches++;
          break;
        }
      }
    }
    
    // Check if we made progress
    const newUnmatchedCount = ourStationIds.filter(id => !matchedStations.has(id)).length;
    if (newUnmatchedCount === 0 || newUnmatchedCount === previousUnmatchedCount) {
      break; // No progress made
    }
    
    previousUnmatchedCount = newUnmatchedCount;
    iterations++;
  }
  
  if (variantMatches > 0) {
    console.log(`\n✅ Matched ${variantMatches} variant stations (sharing locations with matched stations)`);
  } else if (initialUnmatched.length > 0) {
    console.log(`\n⚠️  Variant matching: ${initialUnmatched.length} unmatched stations, but found 0 variant matches`);
  }
  
  // Fourth pass: Manual matches for stations that exist but need special handling
  const manualMatches = {
    // Euston_Northern_Victoria should share location with Euston (same physical station)
    'Euston_Northern_Victoria': 'Euston_Overground_NR',
  };
  
  let manualMatchCount = 0;
  for (const [unmatchedId, matchedId] of Object.entries(manualMatches)) {
    if (!matchedStations.has(unmatchedId) && matchedStations.has(matchedId)) {
      const geo = matchedStations.get(matchedId);
      matchedStations.set(unmatchedId, geo);
      manualMatchCount++;
    }
  }
  
  if (manualMatchCount > 0) {
    console.log(`\n✅ Manually matched ${manualMatchCount} stations`);
  }
  
  // Fifth pass: Add manual coordinates for stations not in TfL API but known to exist
  const manualCoordinates = {
    'Battersea_Park': { lat: 51.4775, lng: -0.1475, name: 'Battersea Park Rail Station' },
    'Castle_Bar_Park': { lat: 51.5236, lng: -0.3317, name: 'Castle Bar Park Rail Station' },
    'Drayton_Green': { lat: 51.5167, lng: -0.3317, name: 'Drayton Green Rail Station' },
    'Old_Oak_Common': { lat: 51.5194, lng: -0.2319, name: 'Old Oak Common (under construction)' },
    'South_Greenford': { lat: 51.542424, lng: -0.34605, name: 'South Greenford Rail Station' },
    'Surrey_Canal': { lat: 51.493196, lng: -0.047519, name: 'Surrey Canal (likely Surrey Quays)' },
  };
  
  let manualCoordCount = 0;
  for (const [stationId, coords] of Object.entries(manualCoordinates)) {
    if (!matchedStations.has(stationId)) {
      matchedStations.set(stationId, { lat: coords.lat, lng: coords.lng, name: coords.name });
      manualCoordCount++;
    }
  }
  
  if (manualCoordCount > 0) {
    console.log(`\n✅ Added ${manualCoordCount} stations with manual coordinates`);
  }
  
  // Convert Map to object for JSON serialization
  const matchedStationsObj = Object.fromEntries(matchedStations);
  fs.writeFileSync(path.join(dataDir, "matched-stations.json"), JSON.stringify(matchedStationsObj, null, 2));
  fs.writeFileSync(path.join(dataDir, "unmatched-stations.json"), JSON.stringify(unmatchedTflStations, null, 2));
  
  console.log(`\nMatched ${matchedStations.size} stations`);
  console.log(`Unmatched TfL stations: ${unmatchedTflStations.length}`);
  
  // Generate TypeScript file
  const lines = [
    "/**",
    " * Station geographic coordinates dataset.",
    " * Maps station IDs (matching stations.ts) to latitude/longitude coordinates.",
    " * ",
    " * Coordinates are in WGS84 format (decimal degrees).",
    " * Data fetched from TfL Unified API: https://api.tfl.gov.uk",
    " * Generated: " + new Date().toISOString(),
    " */",
    "",
    "export type StationGeo = {",
    "  lat: number;",
    "  lng: number;",
    "};",
    "",
    "/**",
    " * Map of station IDs to their geographic coordinates.",
    " * Only stations with known coordinates are included.",
    " * Missing stations will be skipped when finding nearest station.",
    " */",
    "export const stationGeo: Record<string, StationGeo> = {",
  ];
  
  // Sort by station ID for readability
  const sortedEntries = Array.from(matchedStations.entries()).sort((a, b) => 
    a[0].localeCompare(b[0])
  );
  
  for (const [stationId, geo] of sortedEntries) {
    lines.push(`  "${stationId}": { lat: ${geo.lat}, lng: ${geo.lng} }, // ${geo.name}`);
  }
  
  lines.push("};");
  lines.push("");
  lines.push("/**");
  lines.push(" * Get geographic coordinates for a station by its ID.");
  lines.push(" * Returns null if coordinates are not available.");
  lines.push(" */");
  lines.push("export function getStationGeo(stationId: string): StationGeo | null {");
  lines.push("  return stationGeo[stationId] || null;");
  lines.push("}");
  lines.push("");
  lines.push("/**");
  lines.push(" * Get all station IDs that have geographic coordinates.");
  lines.push(" */");
  lines.push("export function getStationsWithGeo(): string[] {");
  lines.push("  return Object.keys(stationGeo);");
  lines.push("}");
  lines.push("");
  
  // Write file
  fs.writeFileSync(outputPath, lines.join("\n"), "utf8");
  console.log(`\n✅ Generated ${outputPath}`);
  console.log(`   Contains ${matchedStations.size} stations with coordinates`);
  
  // Show some unmatched stations for manual review
  if (unmatchedTflStations.length > 0) {
    console.log("\n📋 Sample unmatched TfL stations (for manual review):");
    unmatchedTflStations.slice(0, 10).forEach((s) => {
      console.log(`   - ${s.name} (${s.lat}, ${s.lng})`);
    });
    if (unmatchedTflStations.length > 10) {
      console.log(`   ... and ${unmatchedTflStations.length - 10} more`);
    }
  }
  
  // Show coverage
  const coverage = ((matchedStations.size / ourStationIds.length) * 100).toFixed(1);
  console.log(`\n📊 Coverage: ${matchedStations.size}/${ourStationIds.length} stations (${coverage}%)`);
  
  console.log("\n" + "=".repeat(60));
  console.log("Done!");
  console.log("=".repeat(60));
}

// Run
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

