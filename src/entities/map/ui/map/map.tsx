"use client";

import { useEffect, useRef } from "react";
import Map from "@/shared/assets/map/map.svg";

interface MapComponentProps {
  highlightedStationId?: string | null;
}

const queryStationElement = (container: HTMLDivElement, stationId: string) => {
  return container.querySelector(`#map_svg__${stationId}`);
};

export const MapComponent = ({ highlightedStationId }: MapComponentProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const previousHighlightedRef = useRef<string | null>(null);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    // Remove highlight from previously highlighted station
    if (previousHighlightedRef.current) {
      const previousElement = queryStationElement(container, previousHighlightedRef.current);
      if (previousElement) {
        previousElement.classList.remove("station-highlight");
      }
    }

    if (!highlightedStationId) {
      previousHighlightedRef.current = null;
      return;
    }

    // Find and highlight the selected station
    const stationElement = queryStationElement(container, highlightedStationId);
    console.log("stationElement", stationElement);

    if (stationElement) {
      // Add highlight class
      stationElement.classList.add("station-highlight");

      // Scroll into view
      stationElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });

      previousHighlightedRef.current = highlightedStationId;
    }
  }, [highlightedStationId]);

  return (
    <div ref={mapContainerRef} className="w-full h-full overflow-auto">
      <Map />
    </div>
  );
};
