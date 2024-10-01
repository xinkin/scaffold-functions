import { Address, zeroAddress } from 'viem';
import { ContractConfig, ClientConfig, createClients } from '../viem-config';

export async function createNonProfitVault(
  contractConfig: ContractConfig,
  projectId: bigint,
  nonProfitAddress: Address,
  clientConfig: ClientConfig = {},
): Promise<`0x${string}`> {
  const { publicClient, walletClient } = createClients(clientConfig);

  if (nonProfitAddress === zeroAddress) {
    throw new Error('NonProfitAddressCanNotBeZero');
  }

  try {
    const [account] = await walletClient.requestAddresses();
    const { request } = await publicClient.simulateContract({
      account,
      address: contractConfig.address,
      abi: contractConfig.abi,
      functionName: 'createNonProfitVault',
      args: [projectId, nonProfitAddress],
    });
    const txHash = await walletClient.writeContract(request);

    return txHash;
  } catch (error) {
    console.error(`Error creating NonProfitVault: ${error}`);
    throw error;
  }
}
