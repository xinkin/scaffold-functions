import { Address, zeroAddress } from 'viem';
import { ContractConfig, ClientConfig, createClients } from '../viem-config';

export async function setTokenManager(
  contractConfig: ContractConfig,
  tokenManagerAddress: Address,
  clientConfig: ClientConfig = {},
): Promise<`0x${string}`> {
  const { publicClient, walletClient } = createClients(clientConfig);

  if (tokenManagerAddress === zeroAddress) {
    throw new Error('TokenManagerCanNotBeZero');
  }

  try {
    const [account] = await walletClient.requestAddresses();
    const { request } = await publicClient.simulateContract({
      account,
      address: contractConfig.address,
      abi: contractConfig.abi,
      functionName: 'setTokenManager',
      args: [tokenManagerAddress],
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  } catch (error) {
    console.error(`Error setting token manager: ${error}`);
    throw error;
  }
}
