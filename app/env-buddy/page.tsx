// app/env-buddy/page.tsx
import type { Metadata } from "next";
import EnvBuddyPage from "./EnvBuddyPage"; // Direct import, no dynamic

export const metadata: Metadata = {
  title: "EnvBuddy – .env Manager & Exporter",
  description: "Easily manage and export environment variables as .env, .env.example, or JSON.",
  keywords: [".env manager", "envbuddy", "export .env", ".env.example", "JSON environment variables"],
};

export default function Page() {
  return <EnvBuddyPage />;
}
// No dynamic import needed, directly render the component
// This allows Next.js to optimize the page without dynamic loading