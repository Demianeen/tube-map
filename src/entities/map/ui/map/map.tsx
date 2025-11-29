"use client";

import Map from "@/shared/assets/map/map.svg";
import { StationHighlight } from "./station-highlight";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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
      className="w-full h-full"
      onClick={() => {
        if (onUnselect) {
          onUnselect();
        }
      }}
    >
      <TransformWrapper
        initialScale={1}
        minScale={0.25}
        maxScale={2}
        wheel={{ step: 0.1 }}
      >
        <TransformComponent
          wrapperStyle={{
            width: "100%",
            height: "100%",
          }}
        >
          <Map />
        </TransformComponent>
      </TransformWrapper>
      <StationHighlight
        mapContainerRef={mapContainerRef}
        highlightedStationId={highlightedStationId}
      />
    </div>
  );
};
