// Rights Reserved, Unlicensed
import Providers from "@/app/providers";
export const metadata = { title: "secure-health-login" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
