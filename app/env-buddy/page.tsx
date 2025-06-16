// ✅ This is a Server Component (no "use client")
import dynamic from "next/dynamic";
import type { Metadata } from "next";

// ✅ Metadata here (safe in server components)
export const metadata: Metadata = {
  title: "EnvBuddy – .env Manager & Exporter",
  description: "Easily manage and export environment variables as .env, .env.example, or JSON.",
  keywords: [".env manager", "envbuddy", "export .env", ".env.example", "JSON environment variables"],
};

// ✅ Lazy load the client component
const EnvBuddyPage = dynamic(() => import("./EnvBuddyPage"), { ssr: false });

export default function Page() {
  return <EnvBuddyPage />;
}
// Note: This page is a server component that dynamically imports the client component EnvBuddyPage.
// This allows you to keep the server-side benefits while still using client-side interactivity where needed.
// The dynamic import ensures that the client component is only loaded on the client side, avoiding hydration issues.