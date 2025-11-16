"use client";

import { useEffect, useRef } from "react";
import Map from "@/shared/assets/map/map.svg";

interface MapComponentProps {
  highlightedStationId?: string | null;
  onUnselect?: () => void;
}

const queryMapElement = (svg: SVGSVGElement, elementId: string): SVGGraphicsElement | null => {
  return svg.querySelector(`#${elementId}`);
};

function highlightStation(
  svg: SVGSVGElement,
  stationId: string,
): void {
  const stationEl = queryMapElement(svg, stationId);

  if (!stationEl) return;

  highlightStationElement(svg, stationEl);
}

/**
 * Gets the center position of a station element, handling different positioning methods:
 * - <use> elements with x/y attributes
 * - <use> elements with transform attributes
 * - <g> elements (groups)
 * - Any other SVG element
 */
function getStationCenter(
  element: SVGGraphicsElement,
): { cx: number; cy: number; radius: number } | null {
  // Method 1: For <use> elements, prioritize parsing attributes over getBBox()
  // because getBBox() can return coordinates in transformed coordinate space
  // when rotation is involved, which gives incorrect results
  if (element instanceof SVGUseElement) {
    // Get the referenced element to determine its size
    const href = element.getAttribute("href") || element.getAttribute("xlink:href");
    let refBBox: DOMRect | null = null;
    
    if (href) {
      const refId = href.replace("#", "");
      const refElement = element.ownerSVGElement?.querySelector(`#${refId}`);
      if (refElement instanceof SVGGraphicsElement) {
        try {
          refBBox = refElement.getBBox();
        } catch {
          // Reference element bbox unavailable
        }
      }
    }

    // Try x/y attributes first
    const x = element.x?.baseVal?.value ?? parseFloat(element.getAttribute("x") || "0");
    const y = element.y?.baseVal?.value ?? parseFloat(element.getAttribute("y") || "0");
    
    if ((x !== 0 || y !== 0) && !isNaN(x) && !isNaN(y)) {
      // For <use> elements, x/y position the (0,0) point of the referenced element
      // Since referenced elements are centered at (0,0), the center is at (x, y)
      // But we need to account for the bounding box offset to get the visual center
      if (refBBox) {
        // refBBox is relative to the referenced element's (0,0) point
        // The center of refBBox relative to (0,0) is: (refBBox.x + refBBox.width/2, refBBox.y + refBBox.height/2)
        // So the center in SVG coordinates is: (x, y) + (refBBox center relative to 0,0)
        return {
          cx: x + refBBox.x + refBBox.width / 2,
          cy: y + refBBox.y + refBBox.height / 2,
          radius: Math.max(refBBox.width, refBBox.height) * 0.8 || 8,
        };
      }
      // Fallback: assume referenced element is centered at (0,0)
      return { cx: x, cy: y, radius: 8 };
    }

    // Method 2: Try to parse transform attribute
    // For <use> elements, always prefer translate values directly since getBBox()
    // may include connection lines or other elements, not just the station symbol
    const transform = element.getAttribute("transform");
    if (transform) {
      // Match translate() even if it's followed by other transforms like rotate()
      const translateMatch = transform.match(/translate\(([^,]+),\s*([^)]+)\)/);
      if (translateMatch) {
        const tx = parseFloat(translateMatch[1]);
        const ty = parseFloat(translateMatch[2]);
        if (!isNaN(tx) && !isNaN(ty)) {
          // For <use> elements, SVG symbols are typically centered at (0,0)
          // The translate values position the symbol's center, so use them directly
          // Only use refBBox for radius calculation, not for position offset
          const radius = refBBox 
            ? Math.max(refBBox.width, refBBox.height) * 0.8 || 8
            : 8;
          return { cx: tx, cy: ty, radius };
        }
      }
    }

    // Method 3: Fallback to getBBox() for <use> elements if attribute parsing failed
    // Note: This may give incorrect results if rotation is involved
    try {
      const bbox = element.getBBox();
      if (bbox.width > 0 && bbox.height > 0 && !isNaN(bbox.x) && !isNaN(bbox.y)) {
        const cx = bbox.x + bbox.width / 2;
        const cy = bbox.y + bbox.height / 2;
        const radius = Math.max(bbox.width, bbox.height) * 0.8 || 8;
        return { cx, cy, radius };
      }
    } catch {
      // getBBox() failed, continue to next method
    }
  }

  // Method 4: Try getBBox() for non-<use> elements (works for most cases)
  try {
    const bbox = element.getBBox();
    // Check if bbox is valid (has positive dimensions)
    if (bbox.width > 0 && bbox.height > 0 && !isNaN(bbox.x) && !isNaN(bbox.y)) {
      const cx = bbox.x + bbox.width / 2;
      const cy = bbox.y + bbox.height / 2;
      const radius = Math.max(bbox.width, bbox.height) * 0.8 || 8;
      
      return { cx, cy, radius };
    }
  } catch (e) {
    // getBBox() might fail if element is not rendered or has issues
    console.debug("getBBox() failed, trying fallback methods", e);
  }

  // Method 5: For <g> elements, try to get bounding box of children
  if (element instanceof SVGGElement) {
    const children = Array.from(element.children) as SVGGraphicsElement[];
    if (children.length > 0) {
      // Try to get bounding box of all children combined
      try {
        const bbox = element.getBBox();
        if (bbox.width > 0 && bbox.height > 0) {
          return {
            cx: bbox.x + bbox.width / 2,
            cy: bbox.y + bbox.height / 2,
            radius: Math.max(bbox.width, bbox.height) * 0.8 || 8,
          };
        }
      } catch {
        // If getBBox fails, try recursively on children
        for (const child of children) {
          const childCenter = getStationCenter(child);
          if (childCenter) {
            return childCenter;
          }
        }
      }
    }
  }

  return null;
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

  const center = getStationCenter(stationEl);
  console.log("center", center);
  
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

export const MapComponent = ({ highlightedStationId, onUnselect }: MapComponentProps) => {
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
    <div
      ref={mapContainerRef}
      className="w-full h-full overflow-auto"
      onClick={() => {
        if (onUnselect) {
          onUnselect();
        }
      }}
    >
      <Map />
    </div>
  );
};
