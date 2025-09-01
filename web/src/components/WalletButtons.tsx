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

  const mm = connectors.find(
    (c) => c.id === 'metaMask' || c.name.toLowerCase().includes('metamask')
  );
  const injected = connectors.find((c) => c.id === 'injected');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
      {/* MetaMask */}
      {mounted && mm ? (
        hasMetaMask || (mm as any).ready ? (
          <button
            onClick={() => connect({ connector: mm })}
            disabled={status === 'pending'}
          >
            Connect with MetaMask{status === 'pending' ? '…' : ''}
          </button>
        ) : (
          <button onClick={() => window.open('https://metamask.io/download/', '_blank')}>
            Install MetaMask
          </button>
        )
      ) : null}

      {/* Injected fallback when MetaMask not present */}
      {mounted && injected && (injected as any).ready && !hasMetaMask && (
        <button
          onClick={() => connect({ connector: injected })}
          disabled={status === 'pending'}
        >
          Connect (Injected){status === 'pending' ? '…' : ''}
        </button>
      )}

      {mounted && error && (
        <div style={{ color: 'red', fontSize: 12 }}>{error.message}</div>
      )}
    </div>
  );
}
