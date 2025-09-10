// Rights Reserved, Unlicensed
"use client";

import { useEffect, useState } from "react";
import { SiweMessage } from "siwe";
import { getAddress } from "viem";
import { getChartData } from "../lib/getChartData";
import VitaChart from "../components/VitaChart";

type Me = { address: string | null; role: "Patient" | "Practitioner" | null };

export default function Home() {
  const [status, setStatus] = useState("READY");
  const [addr, setAddr] = useState<string | null>(null);
  const [me, setMe] = useState<Me>({ address: null, role: null });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/me").then(r => r.json()).then(setMe).catch(() => {});
    getChartData().then(setChartData).catch(console.error);
  }, []);

  async function directConnect() {
    try {
      setErr(null);
      // @ts-ignore
      const eth = window.ethereum;
      if (!eth) { setStatus("NO_INJECTED_WALLET"); return; }
      try {
        await eth.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0xaa36a7" }] });
      } catch (e: any) {
        if (e?.code === 4902) {
          await eth.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: "0xaa36a7",
              chainName: "Sepolia",
              rpcUrls: ["https://rpc.ankr.com/eth_sepolia"],
              nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
              blockExplorerUrls: ["https://sepolia.etherscan.io"]
            }]
          });
        } else { throw e; }
      }
      const accs = await eth.request({ method: "eth_requestAccounts" });
      const a = accs?.[0] ?? null;
      setAddr(a);
      setStatus(a ? "CONNECTED" : "NO_ACCOUNTS");
    } catch (e: any) { setErr(e?.message ?? "connect_error"); }
  }

  async function siweSign() {
    try {
      setBusy(true); setErr(null);
      if (!addr) throw new Error("NO_ADDRESS");
      const { nonce } = await fetch("/api/siwe/nonce").then(r => r.json());
      const chk = getAddress(addr); // EIP-55 checksum
      const msg = new SiweMessage({
        domain: window.location.host,
        address: chk,
        statement: "Sign in with Ethereum to secure-health-login.",
        uri: window.location.origin,
        version: "1",
        chainId: 11155111,
        nonce,
        issuedAt: new Date().toISOString(),
      }).prepareMessage();

      // @ts-ignore
      const signature = await window.ethereum.request({ method: "personal_sign", params: [msg, chk] });

      const res = await fetch("/api/siwe/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: msg, signature }),
      });
      if (!res.ok) throw new Error("VERIFY_FAILED");
      const data = await res.json();
      setMe({ address: data.address, role: data.role });
      setStatus("SIWE_OK");
    } catch (e: any) { setErr(e?.message ?? "siwe_error"); }
    finally { setBusy(false); }
  }

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    setMe({ address: null, role: null }); setStatus("READY");
  }

  return (
    <main style={{ maxWidth: 640, margin: "40px auto", fontFamily: "ui-sans-serif" }}>
      <h1>secure-health-login</h1>
      <p>Status: {status}</p>
      <p>Wallet: {addr ?? "none"}</p>
      <p>Session: {me.address ? `${me.address} (${me.role})` : "none"}</p>

      {!addr ? (
        <button onClick={directConnect}>Connect Wallet</button>
      ) : me.address ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={siweSign} disabled={busy}>{busy ? "Signing…" : "Sign-In with Ethereum"}</button>
      )}

      {err && <p style={{ color: "crimson" }}>Error: {err}</p>}

      <hr style={{ margin: "40px 0" }} />
      <h2>VITA Token Activity</h2>
      <VitaChart data={chartData} />
    </main>
  );
}

