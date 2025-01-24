import { ContractConfig, ClientConfig, createClients } from '../viem-config';

export async function setLockDuration(
  contractConfig: ContractConfig,
  lockDuration: string,
  clientConfig: ClientConfig = {},
) {
  const { publicClient, walletClient } = createClients(clientConfig);

  try {
    const [account] = await walletClient.requestAddresses();
    const { request } = await publicClient.simulateContract({
      account,
      address: contractConfig.address,
      abi: contractConfig.abi,
      functionName: 'setLockDuration',
      args: [lockDuration],
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  } catch (error) {
    console.error(`Error setting lock duration: ${error}`);
    throw error;
  }
}
