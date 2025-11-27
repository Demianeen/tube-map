"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useNearestStation } from "../model/use-nearest-station";
import { getStationCenter } from "@/entities/map/model/station-center";

interface NearestStationMarkerProps {
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Component that manages the nearest station marker on the map.
 * This component encapsulates all the logic for:
 * - Automatically locating the user on mount
 * - Finding the nearest station
 * - Displaying the marker on the map
 *
 * The marker is separate from the station selection highlight.
 */
export function NearestStationMarker({
  mapContainerRef,
}: NearestStationMarkerProps) {
  const { nearestStation, cachedNearestStation, status, locate } =
    useNearestStation();
  const hasScrolledToNearestRef = useRef(false);

  const effectiveStationId =
    nearestStation?.stationId ?? cachedNearestStation?.stationId ?? null;

  // Automatically locate user on mount
  useEffect(() => {
    locate();
  }, [locate]);

  // Update marker position when nearest station changes
  useLayoutEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    const svg = container.querySelector<SVGSVGElement>("svg");
    if (!svg) return;

    const wrapper = svg.querySelector<SVGGElement>("#nearest-station-wrapper");
    const pin = svg.querySelector<SVGCircleElement>("#nearest-station-pin");
    const pulse = svg.querySelector<SVGCircleElement>("#nearest-station-pulse");

    if (!wrapper || !pin || !pulse) {
      console.warn(
        "[NearestStationMarker] Could not find marker elements in SVG",
      );
      return;
    }

    const stationId = effectiveStationId;

    if (!stationId) {
      // Hide the marker when no station is found
      wrapper.setAttribute("visibility", "hidden");
      wrapper.classList.remove("visible");
      return;
    }

    // Find the station element
    const stationElement = svg.querySelector<SVGGraphicsElement>(
      `#${stationId}`,
    );
    if (!stationElement) {
      console.warn(
        `[NearestStationMarker] Could not find station element: ${stationId}`,
      );
      wrapper.setAttribute("visibility", "hidden");
      wrapper.classList.remove("visible");
      return;
    }

    // Get the center position of the station
    const center = getStationCenter(stationElement);
    if (!center) {
      console.warn(
        `[NearestStationMarker] Could not determine center for station: ${stationId}`,
      );
      wrapper.setAttribute("visibility", "hidden");
      wrapper.classList.remove("visible");
      return;
    }

    // Position the marker at the station center
    wrapper.setAttribute("transform", `translate(${center.cx}, ${center.cy})`);
    wrapper.setAttribute("visibility", "visible");
    wrapper.classList.add("visible");

    // Scroll to the nearest station once, when it's first determined
    // Use cached station for immediate scroll, then update if live result differs
    if (!hasScrolledToNearestRef.current) {
      stationElement.scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "center",
      });
      hasScrolledToNearestRef.current = true;
    }
  }, [mapContainerRef, effectiveStationId, nearestStation, status]);

  return null;
}
