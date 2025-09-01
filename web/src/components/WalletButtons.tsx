// Rights Reserved, Unlicensed
'use client';

import { useEffect, useRef, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';

type EIP1193 = {
  isMetaMask?: boolean;
  request?: (args: { method: string; params?: any[] | object }) => Promise<any>;
};
type EIP6963ProviderDetail = { info: { name: string; rdns?: string }; provider: EIP1193 };

export default function WalletButtons() {
  const { isConnected, address } = useAccount();
  const { connectors, connect, status, error } = useConnect();

  const injected = connectors.find((c) => c.id === 'injected');
  const [mounted, setMounted] = useState(false);
  const mmRef = useRef<EIP1193 | null>(null);

  // Collect EIP-6963 providers (MetaMask announces here)
  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    function onAnnounce(e: any) {
      const detail = e?.detail as EIP6963ProviderDetail | undefined;
      if (!detail) return;
      const isMM =
        detail.info.rdns === 'io.metamask' ||
        /metamask/i.test(detail.info.name || '');
      if (isMM) mmRef.current = detail.provider;
    }

    // Ask wallets to announce
    window.dispatchEvent(new Event('eip6963:requestProvider'));
    window.addEventListener('eip6963:announceProvider', onAnnounce as any);

    // Fallback to window.ethereum
    const eth = (window as any)?.ethereum as any;
    if (eth?.isMetaMask) mmRef.current = eth;
    else if (Array.isArray(eth?.providers)) {
      const mm = eth.providers.find((p: any) => p?.isMetaMask);
      if (mm) mmRef.current = mm;
    }

    return () =>
      window.removeEventListener('eip6963:announceProvider', onAnnounce as any);
  }, []);

  async function connectMetaMask() {
    // late discovery at click time
    if (typeof window !== 'undefined') {
      const eth = (window as any)?.ethereum as any;
      if (!mmRef.current && eth?.isMetaMask) mmRef.current = eth;
      if (!mmRef.current && Array.isArray(eth?.providers)) {
        mmRef.current = eth.providers.find((p: any) => p?.isMetaMask) ?? null;
      }
    }

    const mm = mmRef.current;
    if (!mm) {
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    // Trigger unlock / connect
    try {
      await mm.request?.({ method: 'eth_requestAccounts' });
    } catch (_) {
      // user may cancel; continue to wagmi which can re-prompt
    }

    // Hand off to wagmi injected connector if present
    if (injected) {
      try {
        await connect({ connector: injected });
      } catch {}
    }
  }

  if (!mounted) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360 }}>
      {!isConnected ? (
        <>
          <button onClick={connectMetaMask} disabled={status === 'pending'}>
            Connect with MetaMask{status === 'pending' ? '…' : ''}
          </button>
          <button onClick={() => window.open('https://metamask.io/download/', '_blank')}>
            Install MetaMask
          </button>
        </>
      ) : (
        <div style={{ fontSize: 12 }}>
          Connected: {address?.slice(0, 6)}…{address?.slice(-4)}
        </div>
      )}
      {error && <div style={{ color: 'red', fontSize: 12 }}>{error.message}</div>}
    </div>
  );
}
