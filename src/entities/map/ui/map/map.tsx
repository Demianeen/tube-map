"use client";

import Map from "@/shared/assets/map/map.svg";
import { StationHighlight } from "./station-highlight";
import { NearestStationMarker } from "@/features/location";

import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchContentRef,
} from "react-zoom-pan-pinch";

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
        {({ zoomToElement }: ReactZoomPanPinchContentRef) => {
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
                <Map />
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
};
