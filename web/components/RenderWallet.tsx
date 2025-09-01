'use client'
import WalletButtons from './WalletButtons'
export default function RenderWallet({
  isConnected, address, onLogin, onDisconnect, status,
}: { isConnected: boolean; address?: `0x${string}`; onLogin: () => void; onDisconnect: () => void; status?: string }) {
  return !isConnected ? (
    <WalletButtons />
  ) : (
    <div style={{ display:'grid', gap:12, maxWidth:520 }}>
      <div>Connected: {address}</div>
      <button onClick={onLogin}>Sign in with Ethereum</button>
      <button onClick={onDisconnect}>Disconnect</button>
      <div>Status: {status}</div>
    </div>
  )
}
