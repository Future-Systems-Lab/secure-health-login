// Rights Reserved, Unlicensed
'use client';

import { useConnect } from 'wagmi';

export default function WalletButtons() {
  const { connectors, connect, status, error } = useConnect();

  // Detect MetaMask in-browser
  const hasMetaMask =
    typeof window !== 'undefined' && (window as any)?.ethereum?.isMetaMask;

  // Find MetaMask & Injected connectors (if present)
  const mm = connectors.find(
    (c) => c.id === 'metaMask' || c.name.toLowerCase().includes('metamask')
  );
  const injected = connectors.find((c) => c.id === 'injected');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
      {/* MetaMask button */}
      {mm ? (
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

      {/* Injected fallback (only if available and not MetaMask-specific) */}
      {injected && (injected as any).ready && !hasMetaMask && (
        <button
          onClick={() => connect({ connector: injected })}
          disabled={status === 'pending'}
        >
          Connect (Injected){status === 'pending' ? '…' : ''}
        </button>
      )}

      {error && (
        <div style={{ color: 'red', fontSize: 12 }}>{error.message}</div>
      )}
    </div>
  );
}
