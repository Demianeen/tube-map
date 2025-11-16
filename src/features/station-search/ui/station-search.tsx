"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { stations } from "@/entities/map";
import { useRef, useEffect } from "react";
import { useKeyboardShortcut } from "@/shared/hooks/use-keyboard-shortcut";

interface StationSearchProps {
  selectedStationId: string | null;
  onStationSelect: (stationId: string | null) => void;
}

export function StationSearch({
  selectedStationId,
  onStationSelect,
}: StationSearchProps) {
  const [open, setOpen] = React.useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus search on "/" keypress
  useKeyboardShortcut({
    key: "/",
    onPress: () => setOpen(true),
    preventDefault: true,
    ignoreInputFields: true,
  });

  // Focus input when popover opens
  useEffect(() => {
    if (open) {
      // Small delay to ensure the popover is fully rendered
      const timeoutId = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [open]);

  const selectedStation = stations.find(
    (station) => station.value === selectedStationId,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedStation?.label || "Search for a station..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command>
          <CommandInput ref={inputRef} placeholder="Search station..." />
          <CommandList>
            <CommandEmpty>No station found.</CommandEmpty>
            <CommandGroup>
              {stations.map((station) => (
                <CommandItem
                  key={station.value}
                  value={station.value}
                  onSelect={(currentValue) => {
                    onStationSelect(
                      currentValue === selectedStationId ? null : currentValue,
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedStationId === station.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {station.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

