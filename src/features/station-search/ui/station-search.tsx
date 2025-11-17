"use client";

import * as React from "react";
import { Check, Search } from "lucide-react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCommandState } from "cmdk";

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
import { useRef, useEffect, useMemo } from "react";
import { useKeyboardShortcut } from "@/shared/hooks/use-keyboard-shortcut";

interface StationSearchProps {
  selectedStationId: string | null;
  onStationSelect: (stationId: string | null) => void;
}

function VirtualizedStationList({
  selectedStationId,
  onStationSelect,
  open,
}: {
  selectedStationId: string | null;
  onStationSelect: (stationId: string | null) => void;
  open: boolean;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  // Get search value and selected value from cmdk (must be inside Command context)
  const cmdkSearch = useCommandState((state) => state.search);
  const cmdkSelectedValue = useCommandState(
    (state) => state.value,
  ) as string | undefined;

  // Get filtered stations based on search
  const filteredStations = useMemo(() => {
    if (!cmdkSearch.trim()) return stations;
    const searchLower = cmdkSearch.toLowerCase();
    return stations.filter(
      (station) =>
        station.label.toLowerCase().includes(searchLower),
    );
  }, [cmdkSearch]);


  // Callback ref to find and store the scroll container
  const setListRef = React.useCallback((node: HTMLDivElement | null) => {
    listRef.current = node;
    if (node) {
      const scrollContainer = node.closest(
        '[data-slot="command-list"]',
      ) as HTMLElement;
      if (scrollContainer) {
        scrollContainerRef.current = scrollContainer;
      }
    }
  }, []);

  // Update scroll container when popover opens
  useEffect(() => {
    if (open && listRef.current) {
      const scrollContainer = listRef.current.closest(
        '[data-slot="command-list"]',
      ) as HTMLElement;
      if (scrollContainer) {
        scrollContainerRef.current = scrollContainer;
      }
    }
  }, [open]);

  // Virtualizer setup - use CommandList as scroll container
  const virtualizer = useVirtualizer({
    count: filteredStations.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => 36, // Approximate height of CommandItem
    overscan: 5, // Render 5 extra items above and below viewport
  });

  // Scroll to cmdk's selected item when it changes (for keyboard navigation)
  useEffect(() => {
    if (cmdkSelectedValue && open && listRef.current) {
      const index = filteredStations.findIndex(
        (s) => s.value === cmdkSelectedValue,
      );
      if (index !== -1) {
        virtualizer.scrollToIndex(index, {
          align: "center",
          behavior: "auto", // Use 'auto' for instant scroll during keyboard navigation
        });
      }
    }
  }, [cmdkSelectedValue, open, filteredStations, virtualizer]);

  return (
    <>
      {filteredStations.length === 0 && (
        <CommandEmpty>No station found.</CommandEmpty>
      )}
      {filteredStations.length > 0 && (
        <CommandGroup>
          <div
            ref={setListRef}
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const station = filteredStations[virtualRow.index];
              if (!station) return null;

              return (
                <div
                  key={station.value}
                  data-index={virtualRow.index}
                  ref={virtualizer.measureElement}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <CommandItem
                    value={station.value}
                    onSelect={(currentValue) => {
                      onStationSelect(
                        currentValue === selectedStationId
                          ? null
                          : currentValue,
                      );
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
                </div>
              );
            })}
          </div>
        </CommandGroup>
      )}
    </>
  );
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

  const handleStationSelect = React.useCallback(
    (stationId: string | null) => {
      onStationSelect(stationId);
      setOpen(false);
    },
    [onStationSelect],
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
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 shrink-0 opacity-50" />
            {selectedStation?.label || "Search for a station..."}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command shouldFilter={false}>
          <CommandInput ref={inputRef} placeholder="Search station..." />
          <CommandList>
            <VirtualizedStationList
              selectedStationId={selectedStationId}
              onStationSelect={handleStationSelect}
              open={open}
            />
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

