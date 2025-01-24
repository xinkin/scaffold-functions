import { Address } from 'viem';
import { ContractConfig, ClientConfig, createClients } from '../viem-config';

export async function updateTokensStatus(
  contractConfig: ContractConfig,
  tokenAddresses: Address[],
  status: number, // 1: whitelist, 2: withdrawable only
  clientConfig: ClientConfig = {},
) {
  const { publicClient, walletClient } = createClients(clientConfig);

  if (tokenAddresses.length === 0) {
    throw new Error('TokenAddressesCanNotBeEmpty');
  }

  try {
    const [account] = await walletClient.requestAddresses();
    const { request } = await publicClient.simulateContract({
      account,
      address: contractConfig.address,
      abi: contractConfig.abi,
      functionName: 'updateTokensStatus',
      args: [tokenAddresses, status],
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  } catch (error) {
    console.error(`Error updating status: ${error}`);
    throw error;
  }
}
