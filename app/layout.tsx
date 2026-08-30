import "./globals.css";

export const metadata = {
  title: "ConsentMesh Pro",
  description: "ConsentMesh SDK and Billing Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
