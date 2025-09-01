// Rights Reserved, Unlicensed
'use client';

import { useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';

type EIP1193 = {
  isMetaMask?: boolean;
  providers?: EIP1193[];
  request?: (args: { method: string; params?: any[] | object }) => Promise<any>;
};

function pickMetaMask(): EIP1193 | null {
  const eth = (window as any)?.ethereum as EIP1193 | undefined;
  if (!eth) return null;
  if (eth.isMetaMask) return eth;
  const mm = eth.providers?.find((p) => p?.isMetaMask);
  return mm ?? null;
}

async function waitForEthereum(timeout = 3000): Promise<EIP1193 | null> {
  if (typeof window === 'undefined') return null;
  if (pickMetaMask()) return pickMetaMask();
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve(pickMetaMask());
    };
    window.addEventListener('ethereum#initialized', finish, { once: true });
    const id = setTimeout(finish, timeout);
    // extra micro-poll in case injection already happened
    setTimeout(finish, 50);
    setTimeout(finish, 150);
    // cleanup once finished
    const cleanup = () => { clearTimeout(id); window.removeEventListener('ethereum#initialized', finish as any); };
    setTimeout(cleanup, timeout + 100);
  });
}

export default function WalletButtons() {
  const { isConnected, address } = useAccount();
  const { connectors, connect, status, error } = useConnect();

  const injected = connectors.find((c) => c.id === 'injected');

  const [mounted, setMounted] = useState(false);
  const [hasMetaMask, setHasMetaMask] = useState(false);

  useEffect(() => {
    setMounted(true);
    (async () => {
      const mm = await waitForEthereum(3000);
      setHasMetaMask(Boolean(mm));
    })();
  }, []);

  async function connectMetaMask() {
    const mm = await waitForEthereum(3000);
    if (!mm) {
      window.open('https://metamask.io/download/', '_blank');
      return;
    }
    try {
      await mm.request?.({ method: 'eth_requestAccounts' }); // shows unlock/password
    } catch (_) { /* user may cancel; continue to wagmi which can re-prompt */ }
    if (injected) await connect({ connector: injected });
  }

  if (!mounted) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360 }}>
      {!hasMetaMask ? (
        <button onClick={() => window.open('https://metamask.io/download/', '_blank')}>
          Install MetaMask
        </button>
      ) : !isConnected ? (
        <button onClick={connectMetaMask} disabled={status === 'pending'}>
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
