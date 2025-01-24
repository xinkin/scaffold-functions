import { ContractConfig, ClientConfig, createClients } from '../viem-config';

export async function revertUserWithdrawBatch(
  contractConfig: ContractConfig,
  withdrawIds: string[],
  clientConfig: ClientConfig = {},
): Promise<`0x${string}`> {
  const { publicClient, walletClient } = createClients(clientConfig);

  if (withdrawIds.length === 0) {
    throw new Error('WithdrawIdsCanNotBeEmpty');
  }

  try {
    const [account] = await walletClient.requestAddresses();
    const { request } = await publicClient.simulateContract({
      account,
      address: contractConfig.address,
      abi: contractConfig.abi,
      functionName: 'revertUserWithdrawBatch',
      args: [withdrawIds],
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  } catch (error) {
    console.error(`Error reverting user withdrawals: ${error}`);
    throw error;
  }
}
