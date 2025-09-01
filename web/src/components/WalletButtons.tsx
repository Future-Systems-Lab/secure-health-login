// Rights Reserved, Unlicensed
'use client';

import { useEffect, useRef, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';

type EIP1193 = { isMetaMask?: boolean; request?: (a:{method:string;params?:any})=>Promise<any> };
type EIP6963Detail = { info:{ name:string; rdns?:string }, provider:EIP1193 };

export default function WalletButtons() {
  const { isConnected, address } = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const injected = connectors.find((c) => c.id === 'injected');

  const [mounted, setMounted] = useState(false);
  const mmRef = useRef<EIP1193|null>(null);
  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;
    function onAnnounce(e:any){
      const d = e?.detail as EIP6963Detail|undefined;
      if (!d) return;
      const isMM = d.info.rdns === 'io.metamask' || /metamask/i.test(d.info.name||'');
      if (isMM) mmRef.current = d.provider;
    }
    window.dispatchEvent(new Event('eip6963:requestProvider'));
    window.addEventListener('eip6963:announceProvider', onAnnounce as any);

    const eth:any = (window as any).ethereum;
    if (eth?.isMetaMask) mmRef.current = eth;
    else if (Array.isArray(eth?.providers)) {
      mmRef.current = eth.providers.find((p:any)=>p?.isMetaMask) ?? null;
    }
    return () => window.removeEventListener('eip6963:announceProvider', onAnnounce as any);
  }, []);

  async function connectMetaMask() {
    const eth:any = (window as any)?.ethereum;
    if (!mmRef.current && eth?.isMetaMask) mmRef.current = eth;
    if (!mmRef.current && Array.isArray(eth?.providers)) {
      mmRef.current = eth.providers.find((p:any)=>p?.isMetaMask) ?? null;
    }
    const mm = mmRef.current;
    if (!mm) { window.open('https://metamask.io/download/', '_blank'); return; }

    try { await mm.request?.({ method: 'eth_requestAccounts' }); } catch {}
    if (injected) { try { await connect({ connector: injected }); } catch {} }
  }

  async function openMetaMaskPopup() {
    // Force the browser extension popup even if wagmi misdetects
    const eth:any = (window as any)?.ethereum;
    const mm = mmRef.current || eth;
    if (!mm) { window.open('https://metamask.io/download/', '_blank'); return; }
    try { await mm.request?.({ method: 'eth_requestAccounts' }); } catch {}
  }

  if (!mounted) return null;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:8, maxWidth:360 }}>
      {!isConnected ? (
        <>
          <button onClick={connectMetaMask} disabled={status === 'pending'}>
            Connect with MetaMask{status === 'pending' ? '…' : ''}
          </button>
          <button onClick={openMetaMaskPopup}>Open MetaMask</button>
          <button onClick={() => window.open('https://metamask.io/download/', '_blank')}>
            Install MetaMask
          </button>
        </>
      ) : (
        <div style={{ fontSize:12 }}>
          Connected: {address?.slice(0,6)}…{address?.slice(-4)}
        </div>
      )}
      {error && <div style={{ color:'red', fontSize:12 }}>{error.message}</div>}
    </div>
  );
}
