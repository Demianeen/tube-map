"use client";

import { useRef } from "react";
import Map from "@/shared/assets/map/map.svg";
import { NearestStationMarker } from "@/features/location";
import { StationHighlight } from "./station-highlight";

interface MapComponentProps {
  highlightedStationId?: string | null;
  onUnselect?: () => void;
}

export const MapComponent = ({ highlightedStationId, onUnselect }: MapComponentProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

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
      <StationHighlight 
        mapContainerRef={mapContainerRef} 
        highlightedStationId={highlightedStationId}
      />
      <NearestStationMarker mapContainerRef={mapContainerRef} />
    </div>
  );
};
