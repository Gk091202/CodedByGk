import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Vibe Check - Gen-Z Blog",
  description: "Real talk, hot takes, and everything in between",
  metadataBase: new URL("https://yourdomain.vercel.app"),
  openGraph: {
    title: "Vibe Check - Gen-Z Blog",
    description: "Real talk, hot takes, and everything in between",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Check - Gen-Z Blog",
    description: "Real talk, hot takes, and everything in between",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-zinc-900 dark:text-zinc-100 transition-colors">
            <Navigation />
            <main className="pt-20">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
