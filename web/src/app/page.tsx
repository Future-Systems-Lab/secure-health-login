// Rights Reserved, Unlicensed
"use client"

import WalletButtons from "../components/WalletButtons"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold">🔐 Secure Health Login</h1>
      <WalletButtons />
    </main>
  )
}
