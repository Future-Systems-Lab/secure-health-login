/* Rights Reserved, Unlicensed */
export type LoginMessage = { address: `0x${string}`; timestamp: string };

export const EIP712Domain = {
  name: "SecureHealth",
  version: "1",
  chainId: 11155111,
} as const;

export const types = {
  EIP712Domain: [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
  ],
  LoginMessage: [
    { name: "address", type: "address" },
    { name: "timestamp", type: "string" },
  ],
} as const;
