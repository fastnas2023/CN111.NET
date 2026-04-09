"use client";

import * as React from "react";

/**
 * SSR-safe reduced-motion hook.
 *
 * - On the server it always returns `false` (no reduced motion), avoiding `window` usage.
 * - On the client it subscribes to `(prefers-reduced-motion: reduce)` changes.
 * - The initial client render also starts with `false` to avoid hydration mismatch,
 *   then updates after mount.
 */
export function useReducedMotion(defaultValue = false): boolean {
  const [reducedMotion, setReducedMotion] = React.useState<boolean>(defaultValue);

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setReducedMotion(mediaQuery.matches);
    update();

    // Safari < 14 uses addListener/removeListener.
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", update);
      return () => mediaQuery.removeEventListener("change", update);
    }

    (mediaQuery as unknown as { addListener: (cb: () => void) => void }).addListener(
      update,
    );
    return () =>
      (
        mediaQuery as unknown as { removeListener: (cb: () => void) => void }
      ).removeListener(update);
  }, []);

  return reducedMotion;
}
