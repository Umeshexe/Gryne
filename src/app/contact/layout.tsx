import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Wholesale Inquiry | Gryne Cashews",
  description: "Get in touch with Gryne Cashews for B2B wholesale orders, partnership opportunities, or supply chain inquiries.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
