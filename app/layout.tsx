import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import LoadingScreen from "@/components/LoadingScreen";
import NavigationProgress from "@/components/ui/NavigationProgress";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Gading's Portfolio",
  description: "Welcome to my portfolio. A modern, thoughtful portfolio built with Next.js, Tailwind CSS, and TypeScript.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "min-h-screen",
        "bg-background",
        "text-foreground",
        "antialiased",
        "dark",
        geistSans.variable,
        geistMono.variable,
        "font-sans"
      )}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background" suppressHydrationWarning={true}>
        <NavigationProgress />
        <LoadingScreen />
        <Script
          id="theme-init"
          strategy="beforeInteractive"
        >
          {`
            try {
              const theme = localStorage.getItem('theme') || 'dark';
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (e) {}
          `}
        </Script>
        <ThemeProvider>
          <Navbar />
          <main id="main-content" className="flex flex-1 flex-col gap-20 sm:gap-28">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

