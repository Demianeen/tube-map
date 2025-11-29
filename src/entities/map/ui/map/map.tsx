"use client";

import MapSvg from "@/shared/assets/map/map.svg";

interface MapComponentProps {
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Base map entity component.
 *
 * This component is intentionally \"dumb\": it only renders the SVG map inside
 * a sized container. All interactive behavior (zooming, panning, markers,
 * nearest-station logic, etc.) should live in widgets or features that
 * compose this entity.
 */
export const MapComponent = ({ mapContainerRef }: MapComponentProps) => {
  return (
    <div ref={mapContainerRef} className="w-full h-full">
      <MapSvg />
    </div>
  );
};
