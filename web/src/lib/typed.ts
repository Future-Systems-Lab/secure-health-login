/* Rights Reserved, Unlicensed */
export type LoginMessage = {
  address: `0x${string}`;
  uri: string;
  nonce: string;
  issuedAt: string;
  chainId: number;
};

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
    { name: "uri", type: "string" },
    { name: "nonce", type: "string" },
    { name: "issuedAt", type: "string" },
    { name: "chainId", type: "uint256" },
  ],
} as const;
