import { Address } from 'viem';
import { ContractConfig, ClientConfig, createClients } from '../viem-config';

// Transfer scaffold function
export async function transferTokens(
  contractConfig: ContractConfig,
  token: Address,
  to: Address,
  amount: bigint,
  clientConfig: ClientConfig = {},
): Promise<`0x${string}`> {
  const { publicClient, walletClient } = createClients(clientConfig);

  try {
    const [account] = await walletClient.requestAddresses();
    const { request } = await publicClient.simulateContract({
      account,
      address: contractConfig.address,
      abi: contractConfig.abi,
      functionName: 'transfer',
      args: [token, to, amount],
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  } catch (error) {
    console.error(`Error transferring tokens: ${error}`);
    throw error;
  }
}
