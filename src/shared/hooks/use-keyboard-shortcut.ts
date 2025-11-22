import { useEffect } from "react";

type KeyboardShortcutOptions = {
  /**
   * The key to listen for (e.g., "Escape", "/", "Enter")
   */
  key: string;
  /**
   * Callback function to execute when the shortcut is pressed
   */
  onPress: (event: KeyboardEvent) => void;
  /**
   * Whether to prevent default behavior
   * @default false
   */
  preventDefault?: boolean;
  /**
   * Whether to ignore the shortcut when user is typing in an input field
   * @default false
   */
  ignoreInputFields?: boolean;
  /**
   * Whether the shortcut is enabled
   * @default true
   */
  enabled?: boolean;
};

/**
 * Hook for handling keyboard shortcuts
 *
 * @example
 * ```tsx
 * useKeyboardShortcut({
 *   key: "Escape",
 *   onPress: () => setSelectedStationId(null),
 * });
 * ```
 *
 * @example
 * ```tsx
 * useKeyboardShortcut({
 *   key: "/",
 *   onPress: () => setOpen(true),
 *   preventDefault: true,
 *   ignoreInputFields: true,
 * });
 * ```
 */
export function useKeyboardShortcut({
  key,
  onPress,
  preventDefault = false,
  ignoreInputFields = false,
  enabled = true,
}: KeyboardShortcutOptions) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (ignoreInputFields) {
        if (
          event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLTextAreaElement ||
          (event.target instanceof HTMLElement &&
            event.target.isContentEditable)
        ) {
          return;
        }
      }

      if (event.key === key) {
        if (preventDefault) {
          event.preventDefault();
        }
        onPress(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, onPress, preventDefault, ignoreInputFields, enabled]);
}
