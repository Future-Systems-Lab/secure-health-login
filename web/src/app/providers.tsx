/* Rights Reserved, Unlicensed */
"use client";
import { createConfig, http, cookieStorage, createStorage, WagmiProvider } from "wagmi";
import { injected } from "@wagmi/connectors";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = createConfig({
  chains: [sepolia],
  transports: { [sepolia.id]: http("https://rpc.sepolia.org") },
  connectors: [injected()],
  storage: createStorage({ storage: cookieStorage }),
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
