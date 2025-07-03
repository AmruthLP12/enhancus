"use client";

import { useEffect, useState } from "react";

interface CounterProps {
  page: string; // e.g. "tailwindforge-basic"
  label?: string;
  oncePerSession?: boolean;
  className?: string;
}

export default function Counter({
  page,
  label = "Views",
  oncePerSession = true,
  className = "",
}: CounterProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const namespace = "enhancus";
    const sessionKey = `abacus-hit-${namespace}-${page}`;
    const shouldSend = !oncePerSession || !sessionStorage.getItem(sessionKey);

    const fetchCount = async () => {
      try {
        const url = shouldSend
          ? `https://abacus.jasoncameron.dev/hit/${namespace}/${page}`
          : `https://abacus.jasoncameron.dev/get/${namespace}/${page}`;

        const res = await fetch(url);
        const data = await res.json();
        setCount(data.value);

        if (oncePerSession && shouldSend) {
          sessionStorage.setItem(sessionKey, "true");
        }
      } catch (err) {
        console.error("Visit counter error:", err);
        setCount(null);
      }
    };

    fetchCount();
  }, [page, oncePerSession]);

  return (
    <div className={`text-sm text-muted-foreground ${className}`}>
      {label && <span className="mr-1 font-medium">{label}:</span>}
      {count !== null ? <span>{count}</span> : <span>...</span>}
    </div>
  );
}
