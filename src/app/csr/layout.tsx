import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Social Responsibility | Gryne Cashews",
  description: "Our commitment to sustainable farming, fair labor practices, and community empowerment across West Africa and India.",
};

export default function CSRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
