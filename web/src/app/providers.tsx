// Rights Reserved, Unlicensed
"use client";
import { PropsWithChildren, useState } from "react";
import type { Connector } from "wagmi";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { cookieStorage, createStorage } from "wagmi";
import { injected } from "@wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


// widen connector type to wagmi Connector[]
const _connectors = [injected({ shimDisconnect: true })] as unknown as Connector[];

const config = createConfig({
  chains: [sepolia],
  transports: { [sepolia.id]: http("https://rpc.ankr.com/eth_sepolia") },
  connectors: _connectors,
  storage: createStorage({ storage: cookieStorage }),
});

export default function Providers({ children }: PropsWithChildren) {
  const [qc] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={qc}>
      <WagmiProvider config={config}>{children}</WagmiProvider>
    </QueryClientProvider>
  );
}
