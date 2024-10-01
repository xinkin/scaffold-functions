import { ContractConfig, ClientConfig, createClients } from '../viem-config';

export async function unpause(
  contractConfig: ContractConfig,
  clientConfig: ClientConfig = {},
): Promise<`0x${string}`> {
  const { publicClient, walletClient } = createClients(clientConfig);

  try {
    const [account] = await walletClient.requestAddresses();
    const { request } = await publicClient.simulateContract({
      account,
      address: contractConfig.address,
      abi: contractConfig.abi,
      functionName: 'unpause',
      args: [],
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  } catch (error) {
    console.error(`Error unpausing contract: ${error}`);
    throw error;
  }
}
