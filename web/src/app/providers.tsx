/* Rights Reserved, Unlicensed */
"use client";

import type { ReactNode } from "react";
import { createConfig, http, WagmiProvider, cookieStorage, createStorage } from "wagmi";
import { injected } from "@wagmi/connectors";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = createConfig({
  chains: [sepolia],
  transports: { [sepolia.id]: http() },
  connectors: [injected()],
  storage: createStorage({ storage: cookieStorage }),
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  console.log("Providers mounted");
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div style={{position:"fixed",top:8,right:8,background:"#ff0",padding:"4px 8px",zIndex:9999}}>
          providers ok
        </div>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
