"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { stationGeo, getStationGeo } from "@/entities/map/model/station-geo";
import posthog from "posthog-js";

export type NearestStationStatus = "idle" | "locating" | "success" | "error";

export type NearestStationResult = {
  stationId: string | null;
  distance: number | null; // in meters
  status: NearestStationStatus;
  error: string | null;
};

/**
 * Calculate the distance between two geographic points using the Haversine formula.
 * Returns distance in meters.
 */
function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371000; // Earth's radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Find the nearest station to a given geographic location.
 * Returns the station ID and distance in meters, or null if no stations available.
 */
function findNearestStation(
  userLat: number,
  userLng: number,
): { stationId: string; distance: number } | null {
  const stationsWithGeo = Object.keys(stationGeo);

  console.log("[findNearestStation] Starting search...");
  console.log("[findNearestStation] User location:", {
    lat: userLat,
    lng: userLng,
  });
  console.log(
    "[findNearestStation] Stations with geo data:",
    stationsWithGeo.length,
  );

  if (stationsWithGeo.length === 0) {
    console.warn("[findNearestStation] No stations with geo data available!");
    return null;
  }

  let nearestStationId: string | null = null;
  let nearestDistance = Infinity;
  const distances: Array<{ stationId: string; distance: number }> = [];

  for (const stationId of stationsWithGeo) {
    const geo = getStationGeo(stationId);
    if (!geo) {
      console.warn(
        `[findNearestStation] No geo data for station: ${stationId}`,
      );
      continue;
    }

    const distance = haversineDistance(userLat, userLng, geo.lat, geo.lng);
    distances.push({ stationId, distance });

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestStationId = stationId;
    }
  }

  // Log top 5 closest stations for debugging
  const sortedDistances = distances
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5);
  console.log("[findNearestStation] Top 5 closest stations:", sortedDistances);

  if (nearestStationId === null) {
    console.error(
      "[findNearestStation] No nearest station found (all stations skipped?)",
    );
    return null;
  }

  console.log("[findNearestStation] Found nearest station:", {
    stationId: nearestStationId,
    distance: Math.round(nearestDistance),
    distanceKm: (nearestDistance / 1000).toFixed(2),
  });

  return {
    stationId: nearestStationId,
    distance: nearestDistance,
  };
}

/**
 * Hook to find the nearest station to the user's current location.
 *
 * Usage:
 * ```tsx
 * const { nearestStation, locate, status, error } = useNearestStation();
 *
 * // Trigger location request
 * locate();
 *
 * // Access result
 * if (nearestStation) {
 *   console.log(`Nearest station: ${nearestStation.stationId}, ${nearestStation.distance}m away`);
 * }
 * ```
 */
export function useNearestStation() {
  const [result, setResult] = useState<NearestStationResult>({
    stationId: null,
    distance: null,
    status: "idle",
    error: null,
  });

  const watchIdRef = useRef<number | null>(null);

  // Cleanup watch position on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, []);

  const locate = useCallback(async () => {
    console.log("[useNearestStation] locate() called");

    if (!navigator.geolocation) {
      console.error("[useNearestStation] Geolocation not supported");
      const errorMessage = "Geolocation is not supported by your browser";
      setResult({
        stationId: null,
        distance: null,
        status: "error",
        error: errorMessage,
      });
      posthog.capture("nearest_station_location_failed", {
        reason: "geolocation_not_supported",
        error_message: errorMessage,
      });
      return;
    }

    console.log("[useNearestStation] Requesting location...");
    console.log(
      "[useNearestStation] Note: Browser will prompt for location permission if not already granted",
    );
    setResult((prev) => ({
      ...prev,
      status: "locating",
      error: null,
    }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        console.log("[useNearestStation] Location obtained:", {
          latitude,
          longitude,
          accuracy: accuracy ? `${Math.round(accuracy)}m` : "unknown",
          timestamp: new Date(position.timestamp).toISOString(),
        });

        // Check if position is reasonably fresh (within 30 seconds)
        const positionAge = Date.now() - position.timestamp;
        console.log(
          "[useNearestStation] Position age:",
          `${Math.round(positionAge / 1000)}s`,
        );

        if (positionAge > 30000) {
          console.warn("[useNearestStation] Position too old:", positionAge);
          setResult({
            stationId: null,
            distance: null,
            status: "error",
            error: "Location data is too old",
          });
          posthog.capture("nearest_station_location_failed", {
            reason: "position_too_old",
            position_age_ms: positionAge,
          });
          return;
        }

        console.log("[useNearestStation] Searching for nearest station...");
        const nearest = findNearestStation(latitude, longitude);

        if (!nearest) {
          console.error("[useNearestStation] No nearest station found");
          setResult({
            stationId: null,
            distance: null,
            status: "error",
            error: "No stations with coordinates available",
          });
          posthog.capture("nearest_station_location_failed", {
            reason: "no_stations_found",
          });
          return;
        }

        console.log("[useNearestStation] Success! Setting result:", nearest);
        setResult({
          stationId: nearest.stationId,
          distance: nearest.distance,
          status: "success",
          error: null,
        });
        posthog.capture("nearest_station_location_success", {
          station_id: nearest.stationId,
          distance_meters: nearest.distance,
          user_accuracy_meters: accuracy,
          position_age_ms: positionAge,
        });
      },
      (error) => {
        console.error("[useNearestStation] Geolocation error:", {
          code: error.code,
          message: error.message,
          PERMISSION_DENIED: error.PERMISSION_DENIED,
          POSITION_UNAVAILABLE: error.POSITION_UNAVAILABLE,
          TIMEOUT: error.TIMEOUT,
        });

        let errorMessage = "Failed to get location";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location permission denied. Please check your browser settings and allow location access for this site, then try again.";
            console.error(
              "[useNearestStation] Permission denied - User needs to grant location permission",
            );
            console.error(
              "[useNearestStation] To fix: Chrome/Edge -> Settings -> Privacy -> Site Settings -> Location -> Allow localhost:3000",
            );
            console.error(
              "[useNearestStation] Or reset permissions: Click the lock icon in address bar -> Site settings -> Reset permissions",
            );
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            console.error("[useNearestStation] Position unavailable");
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            console.error("[useNearestStation] Timeout");
            break;
          default:
            console.error(
              "[useNearestStation] Unknown error code:",
              error.code,
            );
        }

        setResult({
          stationId: null,
          distance: null,
          status: "error",
          error: errorMessage,
        });
        posthog.capture("nearest_station_location_failed", {
          reason: "geolocation_api_error",
          error_code: error.code,
          error_message: errorMessage,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000, // Accept positions up to 30 seconds old
      },
    );
  }, []);

  const clear = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    setResult({
      stationId: null,
      distance: null,
      status: "idle",
      error: null,
    });
  }, []);

  return {
    nearestStation:
      result.status === "success" && result.stationId
        ? {
            stationId: result.stationId,
            distance: result.distance!,
          }
        : null,
    status: result.status,
    error: result.error,
    locate,
    clear,
  };
}
