'use client'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
export default function WalletButtons() {
  const { isConnected } = useAccount()
  const { connectors, connect, isPending, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  if (isConnected) return null
  return (
    <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
      {connectors.map((c) => (
        <button key={c.id} type="button" style={{ cursor: 'pointer' }} onClick={async () => {
  try { await connect({ connector: c }) } catch(e) { console.error(e) }
}}>
          {c.name}{status === 'pending' ? '…' : ''}
        </button>
      ))}
      {error ? <p style={{ color:'red' }}>{String(error?.message || error)}</p> : null}
    </div>
  )
}
