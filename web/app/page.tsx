// Rights Reserved, Unlicensed
"use client";
import { useAccount, useConnect, useDisconnect, useSignTypedData, useChainId } from "wagmi";
import { useEffect, useState } from "react";
import { EIP712Domain, types } from "../lib/typed";
import type { LoginMessage } from "@/lib/typed";

export default function Page() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { signTypedDataAsync } = useSignTypedData();
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  async function startLogin() {
    setStatus("requesting nonce");
    const n = await fetch("/api/nonce").then(r => r.json());
    const nonce: string = n.nonce;
    const issuedAt = new Date().toISOString();

    const message = {
      address: address!,
      uri: process.env.NEXT_PUBLIC_APP_URL!,
      nonce,
      issuedAt,
      chainId // number, not BigInt
    } as const;

    setStatus("signing typed data");
    const signature = await signTypedDataAsync({
      domain: EIP712Domain,
      types,
      primaryType: "LoginMessage",
      message
    });

    setStatus("verifying server-side");
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ address, signature, message })
    });

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setStatus(`login failed: ${j.error || res.status}`);
      return;
    }
    setStatus("login success");
  }

  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold">SecureHealth EIP-712 Login</h1>
        {!isConnected ? (
          <button className="px-4 py-2 rounded-2xl shadow" onClick={() => connect({ connector: connectors[0] })}>
            Connect Wallet
          </button>
        ) : (
          <div className="space-x-2">
            <button className="px-4 py-2 rounded-2xl shadow" onClick={startLogin}>Sign In (EIP-712)</button>
            <button className="px-4 py-2 rounded-2xl shadow" onClick={() => disconnect()}>Disconnect</button>
          </div>
        )}
        <div className="text-sm break-all">{status}</div>
        <div className="text-xs opacity-70">Address: {address || "not connected"}</div>
      </div>
    </main>
  );
}
