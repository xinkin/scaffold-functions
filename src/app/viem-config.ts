import {
  PublicClient,
  WalletClient,
  createPublicClient,
  createWalletClient,
  http,
  custom,
  Chain,
  Abi,
  Address,
} from 'viem';
import { baseSepolia } from 'viem/chains';

// Types
export type ContractConfig = {
  address: Address;
  abi: Abi;
};

export type ClientConfig = {
  chain?: Chain;
  rpcUrl?: string;
};

// Default configuration
const defaultChain = baseSepolia;
const defaultRpcUrl = 'https://sepolia.base.org';
export const defaultGasToken = '0x7683022d84f726a96c4a6611cd31dbf5409c0ac9';

// Create configurable clients
export function createClients(config: ClientConfig = {}): {
  publicClient: any;
  walletClient: WalletClient;
} {
  const chain = config.chain || defaultChain;
  const rpcUrl = config.rpcUrl || defaultRpcUrl;

  // Ensure window.ethereum exists in the environment
  if (typeof window === 'undefined' || !(window as any).ethereum) {
    throw new Error(
      'Ethereum wallet not detected. Ensure MetaMask or another wallet is installed.',
    );
  }

  const publicClient = createPublicClient({
    chain,
    transport: http(rpcUrl),
  });

  const walletClient = createWalletClient({
    chain,
    transport: custom((window as any).ethereum),
  });

  return { publicClient, walletClient };
}
