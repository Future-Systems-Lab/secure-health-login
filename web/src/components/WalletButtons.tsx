"use client";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { injected } from "@wagmi/connectors";

export default function WalletButtons() {
  const [mounted, setMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect, connectors, status, error } = useConnect();

  useEffect(() => {
    setMounted(true);
    console.log("wallet-mount", { connectors });
  }, [connectors]);

  if (!mounted) return <div style={{padding:8,border:"1px solid #ccc"}}>mounting…</div>;

  return (
    <div style={{margin:"12px 0",padding:12,border:"2px dashed #999"}}>
      <div style={{fontSize:12,opacity:.7}}>isConnected: {String(isConnected)} | addr: {address ?? "-"}</div>
      {!isConnected ? (
        <button
          id="connect-btn"
          onClick={() => connect({ connector: injected() })}
          style={{padding:"8px 12px",border:"1px solid #333",borderRadius:6,marginTop:8}}
          disabled={status === "pending"}
        >
          {status === "pending" ? "Connecting…" : "Connect with MetaMask"}
        </button>
      ) : (
        <button disabled style={{padding:"8px 12px",border:"1px solid #333",borderRadius:6,marginTop:8}}>
          Connected: {address}
        </button>
      )}
      {error ? <div style={{color:"red",marginTop:8}}>Error: {error.shortMessage || error.message}</div> : null}
    </div>
  );
}
