import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Gryne | Heritage & Facilities",
  description: "Learn about the Gryne Cashews syndicate, our deep roots in the global cashew trade, and our precision processing facilities in India.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
