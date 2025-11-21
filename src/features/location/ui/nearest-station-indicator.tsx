"use client";

import { X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { stations } from "@/entities/map";
import { cn } from "@/shared/lib/utils";

interface NearestStationIndicatorProps {
  stationId: string;
  distance: number;
  onDismiss: () => void;
  className?: string;
}

export function NearestStationIndicator({
  stationId,
  distance,
  onDismiss,
  className,
}: NearestStationIndicatorProps) {
  const station = stations.find((s) => s.value === stationId);
  const stationName = station?.label || stationId;

  // Format distance
  const formatDistance = (meters: number): string => {
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    }
    return `${(meters / 1000).toFixed(1)}km`;
  };

  return (
    <Card
      className={cn(
        "flex items-center gap-2 bg-background/90 backdrop-blur-sm py-2 px-3 text-sm",
        className,
      )}
    >
      <span className="flex-1">
        You're near <strong>{stationName}</strong> ({formatDistance(distance)})
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={onDismiss}
        aria-label="Dismiss"
      >
        <X className="h-3 w-3" />
      </Button>
    </Card>
  );
}




