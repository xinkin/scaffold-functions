import { ContractConfig, ClientConfig, createClients } from '../viem-config';
import { Address } from 'viem';

export async function recoverNonVerifiedDonations(
  contractConfig: ContractConfig,
  nonprofitVaults: Address[],
  tokens: Address[],
  amounts: bigint[],
  receiver: Address,
  clientConfig: ClientConfig = {},
): Promise<`0x${string}`> {
  const { publicClient, walletClient } = createClients(clientConfig);

  try {
    const [account] = await walletClient.requestAddresses();
    const { request } = await publicClient.simulateContract({
      account,
      address: contractConfig.address,
      abi: contractConfig.abi,
      functionName: 'recoverNonVerifiedDonations',
      args: [nonprofitVaults, tokens, amounts, receiver],
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  } catch (error) {
    console.error(`Error recovering non verified donations: ${error}`);
    throw error;
  }
}
