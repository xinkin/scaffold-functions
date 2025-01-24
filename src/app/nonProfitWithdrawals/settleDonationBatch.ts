import { ContractConfig, ClientConfig, createClients } from '../viem-config';
import { Address } from 'viem';

interface Settlement {
  token: Address;
  adminShare: bigint;
  nonProfitWithdrawableFunds: bigint;
}

interface SettleDonationBatchArgs {
  settlements: Settlement[][];
  nonProfitVault: Address;
}

export async function settleDonationBatch(
  contractConfig: ContractConfig,
  clientConfig: ClientConfig = {},
  args: SettleDonationBatchArgs,
): Promise<`0x${string}`> {
  const { publicClient, walletClient } = createClients(clientConfig);

  try {
    const [account] = await walletClient.getAddresses();
    const { request } = await publicClient.simulateContract({
      account,
      address: contractConfig.address,
      abi: contractConfig.abi,
      functionName: 'settleDonationBatch',
      args: [args.settlements, args.nonProfitVault],
    });
    const hash = await walletClient.writeContract(request);
    return hash;
  } catch (error) {
    console.error(`Error settling donation batch: ${error}`);
    throw error;
  }
}
