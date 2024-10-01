import {
  PublicClient,
  WalletClient,
  createPublicClient,
  createWalletClient,
  http,
  custom,
  Chain,
  Abi,
} from 'viem';
import { baseSepolia } from 'viem/chains';

// Types
export type ContractConfig = {
  address: `0x${string}`;
  abi: Abi;
};

export type ClientConfig = {
  chain?: Chain;
  rpcUrl?: string;
};

// Default configuration
const defaultChain = baseSepolia;
const defaultRpcUrl = 'https://sepolia.base.org';

// Create configurable clients
export function createClients(config: ClientConfig = {}): {
  publicClient: PublicClient;
  walletClient: WalletClient;
} {
  const chain = config.chain || defaultChain;
  const rpcUrl = config.rpcUrl || defaultRpcUrl;

  const publicClient = createPublicClient({
    chain: chain,
    transport: http(),
  });

  const walletClient = createWalletClient({
    chain: chain,
    transport: custom((window as any).ethereum),
  });

  return { publicClient, walletClient };
}
