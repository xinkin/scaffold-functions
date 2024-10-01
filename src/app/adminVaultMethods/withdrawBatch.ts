import { Address } from 'viem';
import { ContractConfig, ClientConfig, createClients } from '../viem-config';

// Withdraw scaffold function
export async function withdrawTokens(
  contractConfig: ContractConfig,
  tokens: Address[],
  amounts: bigint[],
  clientConfig: ClientConfig = {},
): Promise<`0x${string}`> {
  const { walletClient, publicClient } = createClients(clientConfig);

  if (tokens.length !== amounts.length) {
    throw new Error('TokenArrayLengthMismatchingAmountArrayLength');
  }

  try {
    const [account] = await walletClient.requestAddresses();
    const { request } = await publicClient.simulateContract({
      account,
      address: contractConfig.address,
      abi: contractConfig.abi,
      functionName: 'withdraw',
      args: [tokens, amounts],
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  } catch (error) {
    console.error(`Error withdrawing tokens: ${error}`);
    throw error;
  }
}
