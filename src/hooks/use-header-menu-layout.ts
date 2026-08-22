"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type MenuRow<T> = T[];

export interface HeaderMenuLayoutResult<T> {
  rows: MenuRow<T>[];
  isTwoRows: boolean;
  currentGap: number;
  isReady: boolean;
  recalculate: () => void;
  navContainerRef: React.RefObject<HTMLDivElement>;
  logoRef: React.RefObject<HTMLDivElement>;
  parentRef: React.RefObject<HTMLDivElement>;
  rightActionsRef: React.RefObject<HTMLDivElement>;
  itemRefs: React.RefObject<(HTMLElement | null)[]>;
}

const GAP_LARGE = 32;
const GAP_MEDIUM = 24;
const GAP_SMALL = 18;
const GAP_LEVELS = [GAP_LARGE, GAP_MEDIUM, GAP_SMALL];
const SAFETY_GAP = 16;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useHeaderMenuLayout<T extends Record<string, any>>(
  menus: T[],
): HeaderMenuLayoutResult<T> {
  const [rows, setRows] = useState<MenuRow<T>[]>([]);
  const [currentGap, setCurrentGap] = useState(GAP_LARGE);
  const [isReady, setIsReady] = useState(false);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const rightActionsRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const measureItemWidths = useCallback((): number[] => {
    return itemRefs.current.map((el) => {
      if (!el) return 0;
      return el.getBoundingClientRect().width;
    });
  }, []);

  const measureAvailableWidth = useCallback((): number => {
    const parent = parentRef.current;
    const logo = logoRef.current;
    const rightActions = rightActionsRef.current;
    if (!parent) return 0;

    const parentRect = parent.getBoundingClientRect();
    const logoWidth = logo ? logo.getBoundingClientRect().width : 0;
    const rightWidth = rightActions ? rightActions.getBoundingClientRect().width : 0;

    const style = window.getComputedStyle(parent);
    const paddingLeft = parseFloat(style.paddingLeft) || 0;
    const paddingRight = parseFloat(style.paddingRight) || 0;

    return (
      parentRect.width -
      logoWidth -
      rightWidth -
      paddingLeft -
      paddingRight -
      SAFETY_GAP
    );
  }, []);

  /**
   * Find the best split index that minimizes |row1Width - row2Width|
   * while both rows fit within availableWidth.
   * Returns:
   *   n           if all items fit in 1 row
   *   i (1..n-1)  if best split is at index i (row1 = [0,i), row2 = [i,n))
   *  -1           if no valid split found (even 2 rows can't fit)
   */
  const findBestSplit = useCallback(
    (itemWidths: number[], availableWidth: number, gap: number): number => {
      const n = itemWidths.length;
      if (n <= 1) return n;

      // Prefix sums for O(1) row width calculation
      const prefix: number[] = [0];
      for (const w of itemWidths) {
        prefix.push(prefix[prefix.length - 1] + w);
      }
      const total = prefix[n];

      // Check if all fit in 1 row
      const totalWithGaps = total + gap * (n - 1);
      if (totalWithGaps <= availableWidth) {
        return n;
      }

      // Find split that minimizes |row1Width - row2Width|
      let bestIndex = -1;
      let smallestDiff = Infinity;

      for (let i = 1; i < n; i++) {
        const row1Width = prefix[i] + gap * (i - 1);
        const row2Width = total - prefix[i] + gap * (n - i - 1);

        if (row1Width <= availableWidth && row2Width <= availableWidth) {
          const diff = Math.abs(row1Width - row2Width);
          if (diff < smallestDiff) {
            smallestDiff = diff;
            bestIndex = i;
          }
        }
      }

      return bestIndex;
    },
    [],
  );

  const calculate = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const itemWidths = measureItemWidths();
      const available = measureAvailableWidth();

      if (itemWidths.length === 0 || itemWidths.some((w) => w === 0)) {
        return;
      }

      for (const gap of GAP_LEVELS) {
        const splitIndex = findBestSplit(itemWidths, available, gap);

        if (splitIndex >= itemWidths.length) {
          // All fit in 1 row
          setRows([menus]);
          setCurrentGap(gap);
          setIsReady(true);
          return;
        }

        if (splitIndex > 0) {
          // Split into 2 rows
          setRows([menus.slice(0, splitIndex), menus.slice(splitIndex)]);
          setCurrentGap(gap);
          setIsReady(true);

          if (process.env.NODE_ENV === "development") {
            const row1Width =
              itemWidths.slice(0, splitIndex).reduce((a, b) => a + b, 0) +
              gap * (splitIndex - 1);
            const row2Width =
              itemWidths.slice(splitIndex).reduce((a, b) => a + b, 0) +
              gap * (itemWidths.length - splitIndex - 1);
            if (row1Width > available || row2Width > available) {
              console.warn(
                "Header navigation exceeds maximum 2-row capacity at gap",
                gap,
              );
            }
          }
          return;
        }
      }

      // Fallback: can't fit even in 2 rows with smallest gap
      // Best effort: split at midpoint to balance rows
      const mid = Math.floor(menus.length / 2);
      setRows([menus.slice(0, mid), menus.slice(mid)]);
      setCurrentGap(GAP_SMALL);
      setIsReady(true);

      if (process.env.NODE_ENV === "development") {
        console.warn(
          "Header navigation exceeds maximum 2-row capacity — using best effort split",
        );
      }
    });
  }, [menus, measureItemWidths, measureAvailableWidth, findBestSplit]);

  const recalculate = useCallback(() => {
    setIsReady(false);
    calculate();
  }, [calculate]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;

    let resizeTimer: number | null = null;
    let prevParentWidth = parent.getBoundingClientRect().width;
    let prevLogoWidth = logoRef.current ? logoRef.current.getBoundingClientRect().width : 0;

    const observer = new ResizeObserver((entries) => {
      const parentEntry = entries.find((e) => e.target === parent);
      const logoEntry = logoRef.current ? entries.find((e) => e.target === logoRef.current) : null;

      const newParentWidth = parentEntry ? parentEntry.contentRect.width : prevParentWidth;
      const newLogoWidth = logoEntry ? logoEntry.contentRect.width : prevLogoWidth;

      // Only trigger on width changes, not height
      if (Math.abs(newParentWidth - prevParentWidth) < 1 && Math.abs(newLogoWidth - prevLogoWidth) < 1) {
        return;
      }

      prevParentWidth = newParentWidth;
      prevLogoWidth = newLogoWidth;

      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        calculate();
      }, 100);
    });

    observer.observe(parent);
    if (logoRef.current) {
      observer.observe(logoRef.current);
    }

    return () => {
      observer.disconnect();
      if (resizeTimer) clearTimeout(resizeTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [calculate]);

  return {
    rows: isReady ? rows : [],
    isTwoRows: isReady && rows.length === 2,
    currentGap,
    isReady,
    recalculate,
    navContainerRef,
    logoRef,
    parentRef,
    rightActionsRef,
    itemRefs,
  };
}
