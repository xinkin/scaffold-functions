import { Address, zeroAddress } from 'viem';
import { ContractConfig, ClientConfig, createClients } from '../viem-config';

export async function setBaseStableCoin(
  contractConfig: ContractConfig,
  baseStableCoinAddress: Address,
  clientConfig: ClientConfig = {},
) {
  const { publicClient, walletClient } = createClients(clientConfig);

  if (baseStableCoinAddress === zeroAddress) {
    throw new Error('BaseStableCoinCanNotBeZero');
  }

  try {
    const [account] = await walletClient.requestAddresses();
    const { request } = await publicClient.simulateContract({
      account,
      address: contractConfig.address,
      abi: contractConfig.abi,
      functionName: 'setBaseStableCoin',
      args: [baseStableCoinAddress],
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  } catch (error) {
    console.error(`Error setting base stable coin: ${error}`);
    throw error;
  }
}
