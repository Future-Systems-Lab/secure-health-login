// Rights Reserved, Unlicensed
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';

type EIP1193 = {
  isMetaMask?: boolean;
  providers?: EIP1193[];
  request?: (args: { method: string; params?: any[] | object }) => Promise<any>;
};

function getMetaMaskProvider(): EIP1193 | null {
  if (typeof window === 'undefined') return null;
  const eth = (window as any).ethereum as EIP1193 | undefined;
  if (!eth) return null;
  if (eth.isMetaMask) return eth;
  const mm = eth.providers?.find((p) => p?.isMetaMask);
  return mm ?? null;
}

export default function WalletButtons() {
  const { isConnected, address } = useAccount();
  const { connectors, connect, status, error } = useConnect();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const mmProvider = useMemo(getMetaMaskProvider, [mounted]);
  const hasMetaMask = Boolean(mmProvider);

  // Use injected() if present, but don't rely on it existing to show the button
  const injected = connectors.find((c) => c.id === 'injected');

  async function connectMetaMask() {
    const mm = getMetaMaskProvider();
    if (!mm) {
      window.open('https://metamask.io/download/', '_blank');
      return;
    }
    try {
      // This triggers the MetaMask unlock/password popup
      await mm.request?.({ method: 'eth_requestAccounts' });
    } catch (_) {
      // If user rejected, still attempt wagmi which will re-prompt if needed
    }
    try {
      if (injected) {
        await connect({ connector: injected });
      }
    } catch (_) {
      // No-op; UI below will surface wagmi error if present
    }
  }

  if (!mounted) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360 }}>
      {hasMetaMask ? (
        !isConnected ? (
          <button onClick={connectMetaMask} disabled={status === 'pending'}>
            Connect with MetaMask{status === 'pending' ? '…' : ''}
          </button>
        ) : (
          <div style={{ fontSize: 12 }}>
            Connected: {address?.slice(0, 6)}…{address?.slice(-4)}
          </div>
        )
      ) : (
        <button onClick={() => window.open('https://metamask.io/download/', '_blank')}>
          Install MetaMask
        </button>
      )}

      {error && <div style={{ color: 'red', fontSize: 12 }}>{error.message}</div>}
    </div>
  );
}
