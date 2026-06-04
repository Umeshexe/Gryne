import type { Metadata } from "next";
import { Anton, Hanken_Grotesk, Space_Mono } from "next/font/google";
import { InquiryProvider } from "@/context/inquiry-context";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import WholesaleInquiryModal from "@/components/wholesale-inquiry-modal";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { CursorProvider } from "@/components/cursor/custom-cursor";
import "./globals.css";

// Configure Anton Font
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

// Configure Hanken Grotesk Font
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// Configure Space Mono Font
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "GRYNE CASHEWS | Bold By Nature",
  description:
    "Premium grade wholesale cashews sourced with uncompromising integrity. Controlling the direct supply chain from West African soils to precision mills in India.",
  keywords: ["cashews", "wholesale", "bulk cashew supply", "Africa to India", "B2B agriculture", "premium cashews", "Gryne"],
  authors: [{ name: "Gryne Cashews Syndicate" }],
  openGraph: {
    title: "GRYNE CASHEWS | Bold By Nature",
    description: "Premium wholesale grade cashews sourced directly from West Africa and precision milled in India.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${hanken.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-on-background selection:bg-electric-blue selection:text-white">
        {/* Providers wraps only the client-side subtree — layout stays a Server Component */}
        <Providers>
          <CursorProvider>
            <InquiryProvider>
              <NavBar />
              <main className="flex-grow pt-[84px]">
                {children}
              </main>
              <Footer />
              <WholesaleInquiryModal />
              <Toaster />
            </InquiryProvider>
          </CursorProvider>
        </Providers>
      </body>
    </html>
  );
}
