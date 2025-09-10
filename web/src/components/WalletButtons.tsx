// Rights Reserved, Unlicensed
"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { injected } from "@wagmi/connectors";

function Inner() {
  const { connect } = useConnect();
  const { address, isConnected } = useAccount();

  return (
    <div style={{border:"1px dashed #aaa", padding: 8, marginBottom: 12}}>
      <div style={{fontSize:12}}>wallet component ok</div>
      {isConnected ? (
        <button disabled>Connected: {address}</button>
      ) : (
        <button onClick={() => connect({ connector: injected() })}>
          Connect with MetaMask
        </button>
      )}
    </div>
  );
}

export default function WalletButtons() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{fontSize:12,opacity:.6}}>mounting wallet…</div>;
  return <Inner />;
}
