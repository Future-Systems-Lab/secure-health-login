"use client"
import VitaChart from "../components/VitaChart"
import dynamic from 'next/dynamic'
const WalletButtonsDynamic = dynamic(() => import('../components/WalletButtons'), { ssr: false })
import ClientOnly from '../components/ClientOnly'
import WalletButtons from '../components/WalletButtons'

/* Rights Reserved, Unlicensed */

import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect, useSignTypedData, useChainId } from "wagmi";
import { EIP712Domain, types, type LoginMessage } from "@/lib/typed";

export default function Page() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { signTypedDataAsync } = useSignTypedData();

  const [status, setStatus] = useState<string>("idle");
  const [nonce, setNonce] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/nonce", { cache: "no-store" });
        const j = await r.json();
        setNonce(j.nonce ?? "");
      } catch {
        setNonce("");
      }
    })();
  }, []);

  async function handleLogin() {
    if (!address || !nonce) return;
    setStatus("signing");
    const message: LoginMessage = {
      address,
      nonce,
      issuedAt: new Date().toISOString(),
      statement: "Secure login"
    };
    const signature = await signTypedDataAsync({
      domain: EIP712Domain,
      types,
      primaryType: "LoginMessage",
      message,
    });
    setStatus("verifying");
    const resp = await fetch("/api/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ address, message, signature }),
    });
    const json = await resp.json();
    setStatus(resp.ok ? `ok:${json.ok}` : `error:${json.error || "verify failed"}`);
  }

return (
  <main style={{ padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
    <h1 style={{ fontWeight: 600, marginBottom: 16 }}>Secure Health Login</h1>

    {!isConnected ? (
      <WalletButtons />
    ) : (
      <div style={{ display: "grid", gap: 12, maxWidth: 520 }}>
        <div>Connected: {address}</div>
        <button onClick={handleLogin}>Sign in with Ethereum</button>
        <button onClick={() => disconnect()}>Disconnect</button>
        <div>Status: {status}</div>
      </div>
    )}

    <h2 style={{ marginTop: 40 }}>VITA Transfers (180d)</h2>
    <VitaChart />
  </main>
);
}
