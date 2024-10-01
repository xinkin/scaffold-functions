import { Address } from 'viem';
import { ContractConfig, ClientConfig, createClients } from '../viem-config';

export async function setWithdrawManager(
  contractConfig: ContractConfig,
  withdrawManagerAddress: Address,
  clientConfig: ClientConfig = {},
): Promise<`0x${string}`> {
  const { publicClient, walletClient } = createClients(clientConfig);

  try {
    const [account] = await walletClient.requestAddresses();
    const { request } = await publicClient.simulateContract({
      account,
      address: contractConfig.address,
      abi: contractConfig.abi,
      functionName: 'setWithdrawManager',
      args: [withdrawManagerAddress],
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  } catch (error) {
    console.error(`Error setting withdraw manager: ${error}`);
    throw error;
  }
}
