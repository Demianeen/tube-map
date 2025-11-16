"use client";

import { useEffect, useRef } from "react";
import Map from "@/shared/assets/map/map.svg";

interface MapComponentProps {
  highlightedStationId?: string | null;
}

const queryMapElement = (svg: SVGSVGElement, elementId: string): SVGGraphicsElement | null => {
  return svg.querySelector(`#${elementId}`);
};

function highlightStation(
  svg: SVGSVGElement,
  stationId: string,
): void {
  const stationEl = queryMapElement(svg, stationId);
  console.log("stationEl", stationEl);

  if (!stationEl) return;

  highlightStationElement(svg, stationEl);
}

function highlightStationElement(
  svg: SVGSVGElement,
  stationEl: SVGGraphicsElement,
): void {
  const wrapper = queryMapElement(svg, "station-highlight-wrapper");
  const ring = queryMapElement(svg, "station-highlight-ring");
  
  console.log("highlightStationElement", svg, stationEl);
  console.log("ring", ring);
  if (!ring || !wrapper) return;

  try {
    const bbox = stationEl.getBBox();
    const cx = bbox.x + bbox.width / 2;
    const cy = bbox.y + bbox.height / 2;
    const r = Math.max(bbox.width, bbox.height) * 0.8 || 8;

    ring.setAttribute("r", String(r));
    ring.classList.add("visible");

    wrapper.setAttribute("transform", `translate(${cx}, ${cy})`);
  } catch {
    // getBBox might fail in some cases, fallback to hidden
    ring.classList.remove("visible");
  }
}

export const MapComponent = ({ highlightedStationId }: MapComponentProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    // Find the SVG element inside the container
    const svg = container.querySelector<SVGSVGElement>("svg");
    if (!svg) return;

    const ring = queryMapElement(svg, "station-highlight-ring");

    if (!highlightedStationId) {
      // Hide the ring when no station is selected
      if (ring) {
        ring.classList.remove("visible");
      }
      return;
    }

    // Highlight the selected station
    highlightStation(svg, highlightedStationId);

    // Find and scroll to the station element
    const stationElement = queryMapElement(svg, highlightedStationId);
    if (stationElement) {
      stationElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [highlightedStationId]);

  return (
    <div ref={mapContainerRef} className="w-full h-full overflow-auto">
      <Map />
    </div>
  );
};
