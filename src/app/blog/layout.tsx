import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Industry News | Gryne Cashews Blog",
  description: "Read the latest insights on the global cashew market, grading standards, supply chain dynamics, and agricultural trends from Gryne.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
