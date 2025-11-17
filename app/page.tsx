"use client";

import * as React from "react";

import { Map } from "@/entities/map";
import { stations } from "@/entities/map";
import { StationSearch } from "@/features/station-search";
import { useKeyboardShortcut } from "@/shared/hooks/use-keyboard-shortcut";
import { GithubLink } from "@/shared/ui/github-link";

export default function Home() {
  const [selectedStationId, setSelectedStationId] = React.useState<
    string | null
  >(null);

  // unselect on esc
  useKeyboardShortcut({
    key: "Escape",
    onPress: () => setSelectedStationId(null),
  });

  // navigate to previous station with left arrow
  useKeyboardShortcut({
    key: "ArrowLeft",
    onPress: () => {
      if (stations.length === 0) return;
      
      if (selectedStationId === null) {
        // If no station selected, go to the last one
        setSelectedStationId(stations[stations.length - 1].value);
      } else {
        // Find current index and go to previous (wrap to last if at start)
        const currentIndex = stations.findIndex(
          (s) => s.value === selectedStationId,
        );
        if (currentIndex === -1) {
          // Current selection not found, go to last station
          setSelectedStationId(stations[stations.length - 1].value);
        } else {
          const prevIndex =
            currentIndex === 0 ? stations.length - 1 : currentIndex - 1;
          setSelectedStationId(stations[prevIndex].value);
        }
      }
    },
    ignoreInputFields: true,
  });

  // navigate to next station with right arrow
  useKeyboardShortcut({
    key: "ArrowRight",
    onPress: () => {
      if (stations.length === 0) return;
      
      if (selectedStationId === null) {
        // If no station selected, go to the first one
        setSelectedStationId(stations[0].value);
      } else {
        // Find current index and go to next (wrap to first if at end)
        const currentIndex = stations.findIndex(
          (s) => s.value === selectedStationId,
        );
        if (currentIndex === -1) {
          // Current selection not found, go to first station
          setSelectedStationId(stations[0].value);
        } else {
          const nextIndex =
            currentIndex === stations.length - 1 ? 0 : currentIndex + 1;
          setSelectedStationId(stations[nextIndex].value);
        }
      }
    },
    ignoreInputFields: true,
  });

  return (
    <div className="h-screen relative">
      <div className="w-full h-full overflow-auto">
        <Map 
          highlightedStationId={selectedStationId}
          onUnselect={() => setSelectedStationId(null)}
        />
      </div>
      <div className="fixed inset-x-0 bottom-0 z-10 flex justify-center px-4 pb-4 pointer-events-none">
        <div className="w-full max-w-xl pointer-events-auto">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="flex-1">
              <StationSearch
                selectedStationId={selectedStationId}
                onStationSelect={setSelectedStationId}
              />
            </div>
            <GithubLink />
          </div>
        </div>
      </div>
    </div>
  );
}
