"use client";

import posthog from "posthog-js";
import { Map } from "@/entities/map";
import { stations } from "@/entities/map";
import { StationSearch } from "@/features/station-search";
import { NearestStationMarker } from "@/features/location";
import { useKeyboardShortcut } from "@/shared/hooks/use-keyboard-shortcut";
import { GithubLink } from "@/shared/ui/github-link";
import { Card } from "@/shared/ui/card";
import { useRef, useState } from "react";

export function InteractiveMapPage() {
  const [selectedStationId, setSelectedStationId] = useState<string | null>(
    null,
  );
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const handleStationSelectFromSearch = (stationId: string | null) => {
    if (stationId) {
      posthog.capture("station_selected", {
        station_id: stationId,
        source: "search",
      });
    }
    setSelectedStationId(stationId);
  };

  const handleUnselectFromMap = () => {
    if (selectedStationId) {
      posthog.capture("station_deselected", {
        method: "map_interaction",
        deselected_station_id: selectedStationId,
      });
    }
    setSelectedStationId(null);
  };

  // unselect on esc
  useKeyboardShortcut({
    key: "Escape",
    onPress: () => {
      if (selectedStationId) {
        posthog.capture("station_deselected", {
          method: "keyboard",
          deselected_station_id: selectedStationId,
        });
      }
      setSelectedStationId(null);
    },
  });

  // navigate to previous station with left arrow
  useKeyboardShortcut({
    key: "ArrowLeft",
    onPress: () => {
      if (stations.length === 0) return;

      let newStationId: string;
      if (selectedStationId === null) {
        // If no station selected, go to the last one
        newStationId = stations[stations.length - 1].value;
      } else {
        // Find current index and go to previous (wrap to last if at start)
        const currentIndex = stations.findIndex(
          (s) => s.value === selectedStationId,
        );
        if (currentIndex === -1) {
          // Current selection not found, go to last station
          newStationId = stations[stations.length - 1].value;
        } else {
          const prevIndex =
            currentIndex === 0 ? stations.length - 1 : currentIndex - 1;
          newStationId = stations[prevIndex].value;
        }
      }
      posthog.capture("station_selected", {
        station_id: newStationId,
        source: "keyboard_previous",
      });
      setSelectedStationId(newStationId);
    },
    ignoreInputFields: true,
  });

  // navigate to next station with right arrow
  useKeyboardShortcut({
    key: "ArrowRight",
    onPress: () => {
      if (stations.length === 0) return;

      let newStationId: string;
      if (selectedStationId === null) {
        // If no station selected, go to the first one
        newStationId = stations[0].value;
      } else {
        // Find current index and go to next (wrap to first if at end)
        const currentIndex = stations.findIndex(
          (s) => s.value === selectedStationId,
        );
        if (currentIndex === -1) {
          // Current selection not found, go to first station
          newStationId = stations[0].value;
        } else {
          const nextIndex =
            currentIndex === stations.length - 1 ? 0 : currentIndex + 1;
          newStationId = stations[nextIndex].value;
        }
      }
      posthog.capture("station_selected", {
        station_id: newStationId,
        source: "keyboard_next",
      });
      setSelectedStationId(newStationId);
    },
    ignoreInputFields: true,
  });

  return (
    <div className="h-dvh relative">
      <div className="w-full h-full overflow-auto">
        <Map
          mapContainerRef={mapContainerRef}
          highlightedStationId={selectedStationId}
          onUnselect={handleUnselectFromMap}
        />
        <NearestStationMarker mapContainerRef={mapContainerRef} />
      </div>
      <div className="fixed inset-x-0 top-2 z-10 flex flex-col items-center gap-2 px-4 pb-4 pointer-events-none">
        <div className="w-full max-w-xl pointer-events-auto">
          <Card className="flex-row gap-3 bg-background/80 backdrop-blur-sm py-2 px-3">
            <div className="flex-1">
              <StationSearch
                selectedStationId={selectedStationId}
                onStationSelect={handleStationSelectFromSearch}
              />
            </div>
            <GithubLink />
          </Card>
        </div>
      </div>
    </div>
  );
}
