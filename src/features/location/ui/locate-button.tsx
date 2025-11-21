"use client";

import { Navigation } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

interface LocateButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

export function LocateButton({ onClick, isLoading, className }: LocateButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      variant="outline"
      size="icon"
      className={cn("relative", className)}
      aria-label="Locate nearest station"
    >
      <Navigation
        className={cn(
          "h-4 w-4 transition-transform",
          isLoading && "animate-spin",
        )}
      />
    </Button>
  );
}



