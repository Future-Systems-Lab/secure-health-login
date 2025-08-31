"use client";
import { createConfig, http, WagmiProvider } from "wagmi"; import { injected } from "wagmi/connectors";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
export const config = createConfig({
  chains: [sepolia],
  transports: { [sepolia.id]: http("https://rpc.sepolia.org") },
  connectors: [injected({ shimDisconnect: true })]
});
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
