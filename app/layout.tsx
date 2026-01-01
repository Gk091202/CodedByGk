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
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/fav.jpg",
  },
  keywords: [
    "tech blog",
    "web development",
    "programming",
    "coding",
    "software engineering",
    "tech insights",
  ],
  authors: [{ name: "GK", url: "https://www.codedbygk.tech" }],
  creator: "GK",
  openGraph: {
    title: "CodedByGK - Tech Blog",
    description: "Real talk, hot takes, and everything in between",
    type: "website",
    locale: "en_US",
    siteName: "CodedByGK",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodedByGK - Tech Blog",
    description: "Real talk, hot takes, and everything in between",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

// Site-wide JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CodedByGK",
  description: "Real talk, hot takes, and everything in between",
  url: "https://www.codedbygk.tech",
  author: {
    "@type": "Person",
    name: "GK",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.codedbygk.tech/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Site-wide JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
        {/* 100% privacy-first analytics */}
        <script
          async
          src="https://scripts.simpleanalyticscdn.com/latest.js"
        ></script>
      </body>
    </html>
  );
}
