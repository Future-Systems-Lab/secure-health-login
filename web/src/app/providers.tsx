// Rights Reserved, Unlicensed
"use client"

import { WagmiConfig, createConfig } from "wagmi"
import { injected } from "@wagmi/connectors"

const config = createConfig({
  autoConnect: true,
  connectors: [injected()],
})

export default function Providers({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>
}
