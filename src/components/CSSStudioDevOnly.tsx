"use client";

import { useEffect } from "react";

export function CSSStudioDevOnly() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // @ts-ignore - dev-only dependency, no types needed
      import("cssstudio").then((mod: any) => mod.startStudio());
    }
  }, []);

  return null;
}
