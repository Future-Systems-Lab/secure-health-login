// Rights Reserved, Unlicensed
"use client";

import { useAccount, useConnect } from "wagmi";
import { injected } from "@wagmi/connectors";

export default function WalletButtons() {
  const { connect } = useConnect({ connector: injected() });
  const { address, isConnected } = useAccount();

  if (isConnected) {
    return <button disabled>Connected: {address}</button>;
  }

  return (
    <button onClick={() => connect()}>
      Connect with MetaMask
    </button>
  );
}
