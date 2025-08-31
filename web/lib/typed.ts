// Rights Reserved, Unlicensed
import type { Address } from "viem";
import { zeroAddress } from "viem";

export const EIP712Domain = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "SecureHealth",
  version: "1",
  chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID || 11155111),
  verifyingContract: zeroAddress
} as const;

export const types = {
  Login: [
    { name: "address", type: "address" },
    { name: "uri", type: "string" },
    { name: "nonce", type: "string" },
    { name: "issuedAt", type: "string" },
    { name: "chainId", type: "uint256" }
  ]
} as const;

export type LoginMessage = {
  address: Address;
  uri: string;
  nonce: string;
  issuedAt: string;
  chainId: bigint;
};
