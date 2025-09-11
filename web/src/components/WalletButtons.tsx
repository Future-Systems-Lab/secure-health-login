// Rights Reserved, Unlicensed
'use client'

import { useEffect, useState } from 'react'
import { useConnect, useAccount } from 'wagmi'
import { injected } from '@wagmi/connectors'

export default function WalletButtons() {
  const { connectAsync } = useConnect({ connector: injected() })
  const { isConnected } = useAccount()

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const hasMetaMask =
    typeof window !== 'undefined' &&
    (window as any).ethereum &&
    (window as any).ethereum.isMetaMask === true

  if (isConnected) {
    return (
      <button className="px-4 py-2 rounded-xl bg-green-600 text-white">
        Connected
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {!hasMetaMask && (
        <a
          href="https://metamask.io/download/"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-center"
        >
          Install MetaMask
        </a>
      )}
      {hasMetaMask && (
        <button
          className="px-4 py-2 rounded-xl bg-purple-600 text-white"
          onClick={async () => {
            try {
              await connectAsync({ connector: injected() })
            } catch (err) {
              console.error(err)
            }
          }}
        >
          Connect with MetaMask
        </button>
      )}
    </div>
  )
}
