"use client";

import { useEffect, useRef } from "react";
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
  const { nearestStation, status, locate } = useNearestStation();
  const hasScrolledToNearestRef = useRef(false);

  // Automatically locate user on mount
  useEffect(() => {
    locate();
  }, [locate]);

  // Update marker position when nearest station changes
  useEffect(() => {
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

    const stationId = nearestStation?.stationId ?? null;

    if (!stationId || status !== "success") {
      // Hide the marker when no station is found or location is not successful
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
    if (!hasScrolledToNearestRef.current) {
      stationElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
      hasScrolledToNearestRef.current = true;
    }
  }, [mapContainerRef, nearestStation, status]);

  return null;
}
