"use client";
import { ReactNode, useEffect } from "react";
import { WagmiProvider, createConfig, http, cookieStorage, createStorage } from "wagmi";
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
  useEffect(() => { console.log("Providers mounted"); }, []);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
