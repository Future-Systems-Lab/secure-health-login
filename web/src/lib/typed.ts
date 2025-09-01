// Rights Reserved, Unlicensed
export const EIP712Domain = {
  name: "SecureHealth",
  version: "1",} satisfies { name: string; version: string };

export const types = {
  LoginMessage: [
    { name: "address", type: "address" },
    { name: "nonce", type: "string" },
    { name: "issuedAt", type: "string" },
    { name: "statement", type: "string" }
  ],
} as const;

export type LoginMessage = {
  address: `0x${string}`;
  nonce: string;
  issuedAt: string;
  statement: string;
};
