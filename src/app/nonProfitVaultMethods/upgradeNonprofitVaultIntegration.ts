import { Address, zeroAddress } from 'viem';
import { ContractConfig, ClientConfig, createClients } from '../viem-config';

export async function upgradeNonProfitVaultImplementation(
  contractConfig: ContractConfig,
  newImplementationAddress: Address,
  clientConfig: ClientConfig = {},
): Promise<`0x${string}`> {
  const { publicClient, walletClient } = createClients(clientConfig);

  if (newImplementationAddress === zeroAddress) {
    throw new Error('NewImplementationAddressCanNotBeZero');
  }

  try {
    const [account] = await walletClient.requestAddresses();
    const { request } = await publicClient.simulateContract({
      account,
      address: contractConfig.address,
      abi: contractConfig.abi,
      functionName: 'upgradeNonProfitVaultImplementation',
      args: [newImplementationAddress],
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  } catch (error) {
    console.error(`Error upgrading NonProfitVault implementation: ${error}`);
    throw error;
  }
}
