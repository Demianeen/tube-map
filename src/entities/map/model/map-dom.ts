import { getStationCenter } from "./station-center";

/**
 * Gets the SVG element from a map container.
 * Returns null if container is null or SVG is not found.
 */
export function getMapSvg(
  container: HTMLDivElement | null,
): SVGSVGElement | null {
  if (!container) return null;
  return container.querySelector<SVGSVGElement>("svg");
}

/**
 * Finds a station element by ID within an SVG.
 * Returns null if not found.
 */
export function getStationElement(
  svg: SVGSVGElement,
  stationId: string,
): SVGGraphicsElement | null {
  return svg.querySelector<SVGGraphicsElement>(`#${stationId}`);
}

/**
 * Gets the center position of a station element.
 * Returns null if the element is not found or center cannot be determined.
 */
export function getStationCenterFromId(
  svg: SVGSVGElement,
  stationId: string,
): { cx: number; cy: number; radius: number } | null {
  const stationElement = getStationElement(svg, stationId);
  if (!stationElement) return null;
  return getStationCenter(stationElement);
}

/**
 * Finds an SVG element by ID within an SVG.
 * Useful for finding wrapper elements, markers, etc.
 */
export function queryMapElement(
  svg: SVGSVGElement,
  elementId: string,
): SVGGraphicsElement | null {
  return svg.querySelector(`#${elementId}`);
}
