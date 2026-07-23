import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business & B2B Wholesale | Gryne Cashews",
  description: "Direct supply chain control from West Africa to India. We deliver premium wholesale cashews with precision grading and global export capabilities.",
};

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
