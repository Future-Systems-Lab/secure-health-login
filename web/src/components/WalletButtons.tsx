// Rights Reserved, Unlicensed
'use client';

import { useEffect, useState } from 'react';
import { useConnect } from 'wagmi';

export default function WalletButtons() {
  const { connectors, connect, status, error } = useConnect();

  const [mounted, setMounted] = useState(false);
  const [hasMetaMask, setHasMetaMask] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const eth = (window as any)?.ethereum;
      setHasMetaMask(Boolean(eth?.isMetaMask));
    }
  }, []);

  // In this project we use only injected()
  const injected = connectors.find((c) => c.id === 'injected');

  const canConnectMetaMask = mounted && hasMetaMask && injected;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
      {/* If MetaMask is present, connect via injected */}
      {canConnectMetaMask ? (
        <button
          onClick={() => connect({ connector: injected! })}
          disabled={status === 'pending'}
        >
          Connect with MetaMask{status === 'pending' ? '…' : ''}
        </button>
      ) : injected && (injected as any).ready ? (
        // Injected fallback when a different wallet is present
        <button
          onClick={() => connect({ connector: injected })}
          disabled={status === 'pending'}
        >
          Connect (Injected){status === 'pending' ? '…' : ''}
        </button>
      ) : (
        // No injected provider detected → prompt install
        <button onClick={() => window.open('https://metamask.io/download/', '_blank')}>
          Install MetaMask
        </button>
      )}

      {mounted && error && (
        <div style={{ color: 'red', fontSize: 12 }}>{error.message}</div>
      )}
    </div>
  );
}
