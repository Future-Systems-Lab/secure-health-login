// Rights Reserved, Unlicensed

export const EIP712Domain = {
  name: "SecureHealth",
  version: "1",
  chainId: 11155111, // Sepolia
  verifyingContract: "0x0000000000000000000000000000000000000000",
};

export type LoginMessage = {
  address: string;
  timestamp: string;
};

export const types = {
  LoginMessage: [
    { name: "address", type: "address" },
    { name: "timestamp", type: "string" },
  ],
};
