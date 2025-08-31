import type { Metadata } from "next";
import Providers from "@/app/providers";

export const metadata: Metadata = { title: "SecureHealth Login" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
