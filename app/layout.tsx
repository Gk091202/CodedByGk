import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
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
  title: {
    default: "CodedByGK - Tech Blog",
    template: "%s | CodedByGK",
  },
  description: "Real talk, hot takes, and everything in between",
  metadataBase: new URL("https://www.codedbygk.tech"),
  icons: {
    icon: "/fav.jpg",
  },
  openGraph: {
    title: "CodedByGK - Tech Blog",
    description: "Real talk, hot takes, and everything in between",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodedByGK - Tech Blog",
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
          <AuthProvider>
            <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-zinc-900 dark:text-zinc-100 transition-colors">
              <Navigation />
              <main className="pt-20">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
