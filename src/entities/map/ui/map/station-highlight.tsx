"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { getStationCenter } from "../../model/station-center";
import {
  getMapSvg,
  getStationElement,
  queryMapElement,
} from "../../model/map-dom";

interface StationHighlightProps {
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
  highlightedStationId: string | null | undefined;
  zoomToStation: (stationId: string) => void;
  isMapReady: boolean;
}

function highlightStationElement(
  svg: SVGSVGElement,
  stationEl: SVGGraphicsElement,
): void {
  const wrapper = queryMapElement(svg, "station-highlight-wrapper");
  const ring = queryMapElement(svg, "station-highlight-ring");

  if (!ring || !wrapper) return;

  const center = getStationCenter(stationEl);

  if (center) {
    // Set the base radius as a CSS custom property
    const clampedRadius = Math.max(6, Math.min(center.radius, 14));
    ring.style.setProperty("--base-radius", String(clampedRadius));

    // Calculate end scale to achieve roughly constant pixel growth
    // Target: add ~25 SVG units of radius regardless of station size
    const targetDelta = 25;
    const endScale = 1 + targetDelta / clampedRadius;

    ring.style.setProperty("--highlight-scale", String(endScale));
    ring.classList.add("visible");
    wrapper.setAttribute("transform", `translate(${center.cx}, ${center.cy})`);
  } else {
    // If we can't determine the position, hide the ring
    console.warn("Could not determine position for station element", stationEl);
    ring.classList.remove("visible");
  }
}

/**
 * Component that manages the station highlight marker on the map.
 * This component handles:
 * - Highlighting the selected station with a pulsing ring
 * - Scrolling to the highlighted station
 * - Hiding the highlight when no station is selected
 */
export function StationHighlight({
  mapContainerRef,
  highlightedStationId,
  zoomToStation,
  isMapReady,
}: StationHighlightProps) {
  useEffect(() => {
    if (!isMapReady) return;

    const svg = getMapSvg(mapContainerRef.current);
    if (!svg) return;

    const ring = queryMapElement(svg, "station-highlight-ring");

    if (!highlightedStationId) {
      // Hide the ring when no station is selected
      if (ring) {
        ring.classList.remove("visible");
      }
      return;
    }

    // Find the station element
    const stationElement = getStationElement(svg, highlightedStationId);
    if (!stationElement) {
      console.warn(
        `[StationHighlight] Could not find station element: ${highlightedStationId}`,
      );
      if (ring) {
        ring.classList.remove("visible");
      }
      return;
    }

    posthog.capture("station-highlighted", {
      station_id: highlightedStationId,
    });

    // Highlight the selected station
    highlightStationElement(svg, stationElement);

    // Zoom to the station element
    zoomToStation(highlightedStationId);
  }, [mapContainerRef, highlightedStationId, zoomToStation, isMapReady]);

  // This component doesn't render anything - it just manipulates the SVG
  return null;
}
