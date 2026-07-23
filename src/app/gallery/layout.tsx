import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Factory & Processing Gallery | Gryne Cashews",
  description: "Take a visual tour inside Gryne's Palasa and Anakapalli industrial units. Explore our modern cashew processing and sorting infrastructure.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
