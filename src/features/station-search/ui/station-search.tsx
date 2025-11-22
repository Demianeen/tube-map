"use client";

import * as React from "react";
import { Check, Search } from "lucide-react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCommandState } from "cmdk";
import Fuse from "fuse.js";

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
import type { Station } from "@/entities/map/model/stations";
import { useKeyboardShortcut } from "@/shared/hooks/use-keyboard-shortcut";

type StationUsage = {
  count: number;
  lastUsed: number;
};

const STATION_USAGE_KEY = "tube-map/station-usage";

function sortStationsByUsage(
  list: Station[],
  stationUsage: Record<string, StationUsage>,
): Station[] {
  if (!stationUsage || Object.keys(stationUsage).length === 0) {
    return list;
  }

  return [...list].sort((a, b) => {
    const usageA = stationUsage[a.value];
    const usageB = stationUsage[b.value];

    // If neither has usage data, keep original relative order
    if (!usageA && !usageB) return 0;
    // Items with usage data come before those without
    if (!usageA) return 1;
    if (!usageB) return -1;

    // Higher count first
    if (usageA.count !== usageB.count) {
      return usageB.count - usageA.count;
    }

    // More recent lastUsed first
    return usageB.lastUsed - usageA.lastUsed;
  });
}

interface StationSearchProps {
  selectedStationId: string | null;
  onStationSelect: (stationId: string | null) => void;
}

function VirtualizedStationList({
  selectedStationId,
  onStationSelect,
  open,
  stationUsage,
}: {
  selectedStationId: string | null;
  onStationSelect: (stationId: string | null) => void;
  open: boolean;
  stationUsage: Record<string, StationUsage>;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  // Get search value and selected value from cmdk (must be inside Command context)
  const cmdkSearch = useCommandState((state) => state.search);
  const cmdkSelectedValue = useCommandState((state) => state.value) as
    | string
    | undefined;

  // Initialize Fuse instance for fuzzy search
  const fuse = useMemo(
    () =>
      new Fuse(stations, {
        keys: ["label"],
        threshold: 0.3, // Lower threshold = stricter matching (0.0 = exact, 1.0 = match anything)
        ignoreLocation: true, // Match regardless of where the pattern appears in the string
        minMatchCharLength: 1, // Minimum number of characters that must be matched
      }),
    [],
  );

  // Get filtered stations based on fuzzy search, sorted by usage (frecency)
  const filteredStations = useMemo(() => {
    if (!cmdkSearch.trim()) {
      return sortStationsByUsage(stations, stationUsage);
    }

    const results = fuse.search(cmdkSearch);
    const matched = results.map((result) => result.item as Station);
    return sortStationsByUsage(matched, stationUsage);
  }, [cmdkSearch, fuse, stationUsage]);

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
  const [stationUsage, setStationUsage] = React.useState<
    Record<string, StationUsage>
  >({});
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

  // Load station usage from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STATION_USAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Record<string, StationUsage> | null;
      if (parsed && typeof parsed === "object") {
        setStationUsage(parsed);
      }
    } catch (error) {
      console.error("[StationSearch] Failed to load station usage", error);
    }
  }, []);

  const selectedStation = stations.find(
    (station) => station.value === selectedStationId,
  );

  const handleStationSelect = React.useCallback(
    (stationId: string | null) => {
      if (stationId) {
        setStationUsage((prev) => {
          const now = Date.now();
          const existing = prev[stationId];
          const next: Record<string, StationUsage> = {
            ...prev,
            [stationId]: {
              count: (existing?.count ?? 0) + 1,
              lastUsed: now,
            },
          };

          if (typeof window !== "undefined") {
            try {
              window.localStorage.setItem(
                STATION_USAGE_KEY,
                JSON.stringify(next),
              );
            } catch (error) {
              console.error(
                "[StationSearch] Failed to persist station usage",
                error,
              );
            }
          }

          return next;
        });
      }

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
              stationUsage={stationUsage}
            />
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
