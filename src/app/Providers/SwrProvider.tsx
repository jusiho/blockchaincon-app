"use client";
import useSWR, { SWRConfig, Cache } from "swr";

type Props = {
  children: React.ReactNode;
};

function localStorageProvider(): Cache<any> {
  // When initializing, we restore the data from `localStorage` into a map.
  const map: Map<string, any> = new Map(
    JSON.parse(localStorage.getItem("app-cache") || "[]")
  );

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem("app-cache", appCache);
  });

  // We still use the map for write & read for performance.
  return map;
}

export default function SwrProvider({ children }: Props) {
  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
      }}
    >
      {children}
    </SWRConfig>
  );
}
