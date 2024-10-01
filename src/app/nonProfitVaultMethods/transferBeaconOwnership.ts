import { Address, zeroAddress } from 'viem';
import { ContractConfig, ClientConfig, createClients } from '../viem-config';

export async function transferBeaconOwnership(
  contractConfig: ContractConfig,
  newBeaconOwner: Address,
  clientConfig: ClientConfig = {},
): Promise<`0x${string}`> {
  const { publicClient, walletClient } = createClients(clientConfig);

  if (newBeaconOwner === zeroAddress) {
    throw new Error('NewBeaconOwnerCanNotBeZero');
  }

  try {
    const [account] = await walletClient.requestAddresses();
    const { request } = await publicClient.simulateContract({
      account,
      address: contractConfig.address,
      abi: contractConfig.abi,
      functionName: 'transferBeaconOwnership',
      args: [newBeaconOwner],
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  } catch (error) {
    console.error(`Error transferring beacon ownership: ${error}`);
    throw error;
  }
}
