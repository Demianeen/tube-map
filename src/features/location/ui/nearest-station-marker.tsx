"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useNearestStation } from "../model/use-nearest-station";
import {
  getMapSvg,
  getStationElement,
  queryMapElement,
  getStationCenter,
} from "@/entities/map";

interface NearestStationMarkerProps {
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
  zoomToStation: (stationId: string) => void;
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
  zoomToStation,
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
    const svg = getMapSvg(mapContainerRef.current);
    if (!svg) return;

    const wrapper = queryMapElement(
      svg,
      "nearest-station-wrapper",
    ) as SVGGElement | null;
    const pin = queryMapElement(
      svg,
      "nearest-station-pin",
    ) as SVGCircleElement | null;
    const pulse = queryMapElement(
      svg,
      "nearest-station-pulse",
    ) as SVGCircleElement | null;

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
    const stationElement = getStationElement(svg, stationId);
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

    // Zoom to the nearest station once, when it's first determined
    // Use cached station for immediate zoom, then update if live result differs
    if (!hasScrolledToNearestRef.current) {
      zoomToStation(stationId);
      hasScrolledToNearestRef.current = true;
    }
  }, [
    mapContainerRef,
    effectiveStationId,
    nearestStation,
    status,
    zoomToStation,
  ]);

  return null;
}
