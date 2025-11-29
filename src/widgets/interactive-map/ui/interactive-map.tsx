"use client";

import MapSvg from "@/shared/assets/map/map.svg";
import { StationHighlight } from "@/entities/map/ui/map/station-highlight";
import { NearestStationMarker } from "@/features/location";

import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchContentRef,
} from "react-zoom-pan-pinch";

interface InteractiveMapProps {
  highlightedStationId?: string | null;
  onUnselect?: () => void;
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
}

export function InteractiveMap({
  highlightedStationId,
  onUnselect,
  mapContainerRef,
}: InteractiveMapProps) {
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
        {({ zoomToElement }: ReactZoomPanPinchContentRef) => {
          // Wrapper that abstracts zoom implementation details from children
          const zoomToStation = (stationId: string) => {
            zoomToElement(stationId, 1, 400, "easeOut");
          };

          return (
            <>
              <TransformComponent
                wrapperStyle={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <MapSvg />
              </TransformComponent>
              <StationHighlight
                mapContainerRef={mapContainerRef}
                highlightedStationId={highlightedStationId}
                zoomToStation={zoomToStation}
              />
              <NearestStationMarker
                mapContainerRef={mapContainerRef}
                zoomToStation={zoomToStation}
              />
            </>
          );
        }}
      </TransformWrapper>
    </div>
  );
}


