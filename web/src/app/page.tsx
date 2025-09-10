// Rights Reserved, Unlicensed
"use client";

import WalletButtons from "@/components/WalletButtons";

export default function Page() {
  console.log("page: rendered");
  return (
    <main style={{ padding: 24 }}>
      <h1>Wallet test</h1>
      <WalletButtons />
    </main>
  );
}
