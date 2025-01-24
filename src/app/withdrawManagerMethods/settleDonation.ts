import { Address } from 'viem';
import { ContractConfig, ClientConfig, createClients } from '../viem-config';

interface Settlement {
  token: `0x${string}`;
  adminShare: bigint;
  nonProfitWithdrawableFunds: bigint;
}

export async function setLockDuration(
  contractConfig: ContractConfig,
  settlements: Settlement[],
  nonprofitVault: Address,
  clientConfig: ClientConfig = {},
) {
  const { publicClient, walletClient } = createClients(clientConfig);

  try {
    const [account] = await walletClient.requestAddresses();
    const { request } = await publicClient.simulateContract({
      account,
      address: contractConfig.address,
      abi: contractConfig.abi,
      functionName: 'settleDonation',
      args: [settlements, nonprofitVault],
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  } catch (error) {
    console.error(`Error settling duration: ${error}`);
    throw error;
  }
}
