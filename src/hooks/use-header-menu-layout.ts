"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type MenuRow<T> = T[];

export interface HeaderMenuLayoutResult<T> {
  rows: MenuRow<T>[];
  isTwoRows: boolean;
  currentGap: number;
  rowGaps: number[];
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
  const [rowGaps, setRowGaps] = useState<number[]>([]);
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


  const findBestSplit = useCallback(
    (itemWidths: number[], availableWidth: number, gap: number): number => {
      const n = itemWidths.length;
      if (n <= 1) return n;

      const prefix: number[] = [0];
      for (const w of itemWidths) {
        prefix.push(prefix[prefix.length - 1] + w);
      }

      // Find the largest k (top row count) that fits; n means all fit in 1 row
      for (let k = n; k >= 1; k--) {
        const row1Width = prefix[k] + gap * (k - 1);
        if (row1Width > availableWidth) continue;

<<<<<<< HEAD
        if (k === n) return n;

        const row2Width = (prefix[n] - prefix[k]) + gap * (n - k - 1);
        if (row2Width <= availableWidth) {
          return k;
=======
      // Fill row 1 as much as possible, then put the rest in row 2
      // Find the largest i where row1 fits, and row2 also fits
      let bestIndex = -1;

      for (let i = n - 1; i >= 1; i--) {
        const row1Width = prefix[i] + gap * (i - 1);
        const row2Width = total - prefix[i] + gap * (n - i - 1);

        if (row1Width <= availableWidth && row2Width <= availableWidth) {
          bestIndex = i;
          break;
>>>>>>> f0e2f84 (fix: resolve image CORS issues, add storage rewrite, fix hero banner layout)
        }
      }

      return -1;
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

      const n = itemWidths.length;

      for (const gap of GAP_LEVELS) {
        const splitIndex = findBestSplit(itemWidths, available, gap);

        if (splitIndex === n) {
          setRows([menus]);
          setCurrentGap(gap);
          setRowGaps([gap]);
          setIsReady(true);
          return;
        }

        if (splitIndex > 0) {
          setRows([menus.slice(0, splitIndex), menus.slice(splitIndex)]);
          setCurrentGap(gap);
          setRowGaps([gap, gap]);
          setIsReady(true);
          return;
        }
      }

      // Fallback: split at midpoint using the smallest fixed gap
      const mid = Math.floor(n / 2);
      setRows([menus.slice(0, mid), menus.slice(mid)]);
      setCurrentGap(GAP_SMALL);
      setRowGaps([GAP_SMALL, GAP_SMALL]);
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
    rowGaps,
    isReady,
    recalculate,
    navContainerRef,
    logoRef,
    parentRef,
    rightActionsRef,
    itemRefs,
  };
}
