// Rights Reserved, Unlicensed
"use client"

import { injected } from "wagmi/connectors"
import { useConnect } from "wagmi"

export default function WalletButtons() {
  const { connectAsync } = useConnect({ connector: injected() })

  async function handleConnect() {
    await connectAsync({ connector: injected() })
  }

  return (
    <button
      onClick={handleConnect}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
    >
      Connect MetaMask
    </button>
  )
}
