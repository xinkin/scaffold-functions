import { Address, zeroAddress } from 'viem';
import { ContractConfig, ClientConfig, createClients } from '../viem-config';

export async function setMVMNTManager(
  contractConfig: ContractConfig,
  MVMNTManagerAddress: Address,
  clientConfig: ClientConfig = {},
): Promise<`0x${string}`> {
  const { publicClient, walletClient } = createClients(clientConfig);

  if (MVMNTManagerAddress === zeroAddress) {
    throw new Error('MVMNTManagerCanNotBeZero');
  }

  try {
    const [account] = await walletClient.requestAddresses();
    const { request } = await publicClient.simulateContract({
      account,
      address: contractConfig.address,
      abi: contractConfig.abi,
      functionName: 'setMVMNTManager',
      args: [MVMNTManagerAddress],
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  } catch (error) {
    console.error(`Error setting MVMNT Manager: ${error}`);
    throw error;
  }
}
