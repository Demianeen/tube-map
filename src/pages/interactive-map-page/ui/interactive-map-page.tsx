"use client";

import * as React from "react";

import { Map } from "@/entities/map";
import { stations } from "@/entities/map";
import { StationSearch } from "@/features/station-search";
import { useNearestStation, LocateButton, NearestStationIndicator, LocationError } from "@/features/location";
import { useKeyboardShortcut } from "@/shared/hooks/use-keyboard-shortcut";
import { GithubLink } from "@/shared/ui/github-link";
import { Card } from "@/shared/ui/card";
import { useCallback, useEffect, useRef, useState } from "react";

function GeoTest() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not available in this browser");
      return;
    }
    navigator.permissions.query({ name: "geolocation" }).then(res => console.warn(res.state));

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        // log full error for debugging
        console.error("Geo error", err);
        setError(`${err.code}: ${err.message}`);
      }
    );
  }, []);

  return (
    <div>
      <h1>Geo test</h1>
      {position && (
        <p>
          {position.lat}, {position.lng}
        </p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default GeoTest;


export function InteractiveMapPage() {
  const [selectedStationId, setSelectedStationId] = useState<
    string | null
  >(null);
  
  const { nearestStation, status, error, locate, clear } = useNearestStation();
  const lastNearestStationRef = useRef<string | null>(null);

  // Update selected station when nearest station is found
  useEffect(() => {
    if (nearestStation && status === "success" && nearestStation.stationId !== lastNearestStationRef.current) {
      lastNearestStationRef.current = nearestStation.stationId;
      // Use setTimeout to avoid synchronous setState in effect
      setTimeout(() => {
        setSelectedStationId(nearestStation.stationId);
      }, 0);
    }
  }, [nearestStation, status]);

  // Derive UI state from hook state
  const showNearestStation = status === "success" && nearestStation !== null;
  const showError = status === "error" && error !== null;

  const handleLocate = useCallback(() => {
    locate();
  }, [locate]);

  const handleDismissNearestStation = useCallback(() => {
    clear();
    setSelectedStationId(null);
  }, [clear]);

  const handleDismissError = useCallback(() => {
    clear();
  }, [clear]);

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
    <div className="h-dvh relative">
      <div className="w-full h-full overflow-auto">
        <Map 
          highlightedStationId={selectedStationId}
          onUnselect={() => setSelectedStationId(null)}
        />
      </div>
      <div className="fixed inset-x-0 top-2 z-10 flex flex-col items-center gap-2 px-4 pb-4 pointer-events-none">
        <div className="w-full max-w-xl pointer-events-auto">
          <Card className="flex-row gap-3 bg-background/80 backdrop-blur-sm py-2 px-3">
            <div className="flex-1">
              <StationSearch
                selectedStationId={selectedStationId}
                onStationSelect={setSelectedStationId}
              />
            </div>
            <LocateButton
              onClick={handleLocate}
              isLoading={status === "locating"}
            />
            <GithubLink />
          </Card>
        </div>
        {showNearestStation && nearestStation && (
          <div className="w-full max-w-xl pointer-events-auto">
            <NearestStationIndicator
              stationId={nearestStation.stationId}
              distance={nearestStation.distance}
              onDismiss={handleDismissNearestStation}
            />
          </div>
        )}
        {showError && error && (
          <div className="w-full max-w-xl pointer-events-auto">
            <LocationError
              error={error}
              onDismiss={handleDismissError}
            />
          </div>
        )}
        <GeoTest />
      </div>
    </div>
  );
}

