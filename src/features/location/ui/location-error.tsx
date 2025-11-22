"use client";

import { AlertCircle, X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { cn } from "@/shared/lib/utils";

interface LocationErrorProps {
  error: string;
  onDismiss: () => void;
  className?: string;
}

export function LocationError({
  error,
  onDismiss,
  className,
}: LocationErrorProps) {
  return (
    <Card
      className={cn(
        "flex items-center gap-2 bg-destructive/10 border-destructive/20 backdrop-blur-sm py-2 px-3 text-sm",
        className,
      )}
    >
      <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
      <span className="flex-1 text-destructive">{error}</span>
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
