"use client";

import * as React from "react";

import { Map } from "@/entities/map";
import { StationSearch } from "@/features/station-search";
import { useKeyboardShortcut } from "@/shared/hooks/use-keyboard-shortcut";

export default function Home() {
  const [selectedStationId, setSelectedStationId] = React.useState<
    string | null
  >(null);

  // unselect on esc
  useKeyboardShortcut({
    key: "Escape",
    onPress: () => setSelectedStationId(null),
  });

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 border-b">
        <StationSearch
          selectedStationId={selectedStationId}
          onStationSelect={setSelectedStationId}
        />
      </div>
      <div className="flex-1 overflow-auto">
        <Map highlightedStationId={selectedStationId} />
      </div>
    </div>
  );
}
