// Rights Reserved, Unlicensed
"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { injected } from "@wagmi/connectors";

export default function WalletButtons() {
  const { connect } = useConnect({ connectors: [injected()] });
  const { address, isConnected } = useAccount();
  const [hasProvider, setHasProvider] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      setHasProvider(true);
    }
  }, []);

  if (isConnected) {
    return <button disabled>Connected: {address}</button>;
  }

  if (!hasProvider) {
    return (
      <button
        onClick={() => window.open("https://metamask.io/download/", "_blank")}
      >
        Install MetaMask
      </button>
    );
  }

  return <button onClick={() => connect()}>Connect with MetaMask</button>;
}
