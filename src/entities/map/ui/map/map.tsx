"use client";

import Map from "@/shared/assets/map/map.svg";
import { StationHighlight } from "./station-highlight";

interface MapComponentProps {
  highlightedStationId?: string | null;
  onUnselect?: () => void;
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
}

export const MapComponent = ({
  highlightedStationId,
  onUnselect,
  mapContainerRef,
}: MapComponentProps) => {
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
    </div>
  );
};
