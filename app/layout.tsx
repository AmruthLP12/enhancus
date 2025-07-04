import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Support } from "@/components/Support";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Enhancus – Developer Tools Suite",
  description:
    "Enhancus is a powerful collection of online tools for developers. Use EnvBuddy to manage .env files, generate .env.example, or export JSON. More utilities coming soon!",
  keywords: [
    "EnvBuddy",
    ".env editor",
    "environment variables",
    ".env to JSON",
    "export env file",
    "developer tools online",
    "Enhancus",
    "QR code generator",
    "JSON formatter",
    "regex tester",
    "open source tools",
  ],
  openGraph: {
    title: "Enhancus – Dev Tools Suite (EnvBuddy, QR, JSON)",
    description:
      "Enhancus helps developers manage .env files, format JSON, generate QR codes, and more. Try EnvBuddy now!",
    url: "https://enhancus.vercel.app",
    siteName: "Enhancus",
    images: [
      {
        url: "https://enhancus.vercel.app/og-image.png", // recommended: 1200x630
        width: 1200,
        height: 630,
        alt: "Enhancus – Developer Tools",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enhancus – Online Dev Tools Suite",
    description:
      "Use EnvBuddy to manage .env files and other developer utilities like JSON formatter, QR generator, and more.",
    images: ["https://enhancus.vercel.app/og-image.png"],
  },
  other: {
    "google-site-verification": "m3gcO3z77CpmDFtlEBa5Qk-g2yMOUvIFj34TKqbJMoU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head >
        <meta name="apple-mobile-web-app-title" content="EnhancUS" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen">
            <Navbar />
            <main className="relative">{children}</main>
            <Support />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
