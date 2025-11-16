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
import { stations } from "@/entities/map/model/stations";
import { Map } from "@/entities/map";
import { useEffect } from "react";

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const [selectedStationId, setSelectedStationId] = React.useState<
    string | null
  >(null);
  
  // unselect on esc
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedStationId(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 border-b">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedStationId
                ? stations.find(
                    (station) => station.value === selectedStationId,
                  )?.label
                : "Search for a station..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
            <Command>
              <CommandInput placeholder="Search station..." />
              <CommandList>
                <CommandEmpty>No station found.</CommandEmpty>
                <CommandGroup>
                  {stations.map((station) => (
                    <CommandItem
                      key={station.value}
                      value={station.value}
                      onSelect={(currentValue) => {
                        setSelectedStationId(
                          currentValue === selectedStationId
                            ? null
                            : currentValue,
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
      </div>
      <div className="flex-1 overflow-auto">
        <Map highlightedStationId={selectedStationId} />
      </div>
    </div>
  );
}
