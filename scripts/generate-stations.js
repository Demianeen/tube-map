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

// Extract all id="..." attributes
const idRegex = /id="([^"]+)"/g;
const ids = new Set();

for (const match of svg.matchAll(idRegex)) {
  const id = match[1];

  // Basic heuristic to keep things station-like; tweak as needed
  if (/^[A-Z][A-Za-z0-9_]+$/.test(id)) {
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
