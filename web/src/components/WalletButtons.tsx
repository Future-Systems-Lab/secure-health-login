// Rights Reserved, Unlicensed
'use client';

import { useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';

export default function WalletButtons() {
  const { isConnected, address } = useAccount();
  const { connectors, connect, status, error } = useConnect();

  const [mounted, setMounted] = useState(false);
  const [hasMetaMask, setHasMetaMask] = useState(false);

  useEffect(() => {
    setMounted(true);
    const eth = (typeof window !== 'undefined' && (window as any).ethereum) || null;
    setHasMetaMask(Boolean(eth?.isMetaMask));
  }, []);

  // We use injected() per the working config
  const injected = connectors.find((c) => c.id === 'injected');

  // Auto-open MetaMask once on mount if present and not connected
  useEffect(() => {
    if (!mounted) return;
    if (!hasMetaMask) return;
    if (!injected) return;
    if (isConnected) return;
    if (status !== 'idle') return;
    connect({ connector: injected });
  }, [mounted, hasMetaMask, injected, isConnected, status, connect]);

  if (!mounted) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360 }}>
      {!hasMetaMask ? (
        <button onClick={() => window.open('https://metamask.io/download/', '_blank')}>
          Install MetaMask
        </button>
      ) : !isConnected ? (
        <button
          onClick={() => injected && connect({ connector: injected })}
          disabled={status === 'pending'}
        >
          Connect with MetaMask{status === 'pending' ? '…' : ''}
        </button>
      ) : (
        <div style={{ fontSize: 12 }}>
          Connected: {address?.slice(0, 6)}…{address?.slice(-4)}
        </div>
      )}

      {error && <div style={{ color: 'red', fontSize: 12 }}>{error.message}</div>}
    </div>
  );
}
