const fs = require("fs");
const path = require("path");

// Path to the SVG map file
const svgPath = path.join(
  __dirname,
  "..",
  "src",
  "shared",
  "assets",
  "map",
  "map.svg",
);

const svg = fs.readFileSync(svgPath, "utf8");

// --- Heuristics for deciding which SVG ids are "real" stations ---

// Manually force include / exclude specific ids if needed
const MANUAL_INCLUDE = new Set([
  // e.g. "Some_Special_Station_Id",
]);

const MANUAL_EXCLUDE = new Set([
  // Obvious non-station helper ids from the SVG
  "AETRAM",
  "CONTf",
  "STRg",
]);

/**
 * Returns true if an SVG id is likely to represent a user-facing station,
 * and false if it's more likely a line/route/zone/decoration helper.
 */
function isProbablyStationId(id) {
  if (MANUAL_INCLUDE.has(id)) return true;
  if (MANUAL_EXCLUDE.has(id)) return false;

  // Must look like a name: start with an uppercase letter
  if (!/^[A-Z]/.test(id)) return false;

  // Exclude all-caps codes (e.g. "AETRAM") unless manually included
  if (!/[a-z]/.test(id)) return false;

  const denyPatterns = [
    // Network lines / branches / routes
    /_line_/i,
    /line_route/i,
    /_route/i,
    /route_/i,
    /_branch/i,
    /branch_/i,
    /_routes\b/i,

    // Blinks / toggles / "off" layers
    /blink/i,
    /_off\b/i,
    /_off_/i,

    // Styling / helper shapes
    /_stripe/i,
    /stripe_/i,

    // Collections / groups rather than single stations
    /_stations\b/i, // e.g. "Central_line_stations"
    /\bstations_/i,
    /_group\b/i,

    // Zone overlays and OSI/validator helpers
    /_zone\b/i,
    /_validator\b/i,
    /_osi\b/i,
    /_osi_/i,
    /_osi_base\b/i,

    // Misc map helpers
    /_separator\b/i,
    /_continuation\b/i,
    /_special_fare\b/i,
    /_boundary\b/i,
    /_path\b/i,
  ];

  if (denyPatterns.some((re) => re.test(id))) {
    return false;
  }

  return true;
}

// Extract all id="..." attributes
const idRegex = /id="([^"]+)"/g;
const ids = new Set();

for (const match of svg.matchAll(idRegex)) {
  const id = match[1];

  if (isProbablyStationId(id)) {
    ids.add(id);
  }
}

// Convert an ID into a human-readable label
function makeLabel(id) {
  // Strip some common suffixes for different station variants
  const withoutSuffix = id.replace(
    /_(nr|elizabeth|deep|surface|circle_top|cr|tube|top)$/i,
    "",
  );

  const withSpaces = withoutSuffix.replace(/_/g, " ");

  // Simple title-case
  return withSpaces.replace(/\b\w/g, (c) => c.toUpperCase());
}

const stations = Array.from(ids)
  .sort()
  .map((id) => ({
    value: id,
    label: makeLabel(id),
  }));

// Print out TypeScript content for src/entities/map/stations.ts
console.log("export type Station = {");
console.log("  value: string;");
console.log("  label: string;");
console.log("};");
console.log();
console.log("export const stations: Station[] = [");
for (const s of stations) {
  console.log(`  { value: "${s.value}", label: "${s.label}" },`);
}
console.log("];");
