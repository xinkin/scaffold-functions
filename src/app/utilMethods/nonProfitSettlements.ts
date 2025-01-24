import { ethers, InterfaceAbi } from 'ethers';

interface ContractConfig {
  address: string;
  abi: InterfaceAbi;
}

interface Settlement {
  token: `0x${string}`;
  adminShare: bigint;
  nonProfitWithdrawableFunds: bigint;
}

interface SettleDonationBatchArgs {
  settlements: Settlement[][];
  nonProfitVault: `0x${string}`;
}

export async function settleDonationBatch(
  contractConfig: ContractConfig,
  signer: ethers.Signer,
  args: SettleDonationBatchArgs,
): Promise<string> {
  const contract = new ethers.Contract(
    contractConfig.address,
    contractConfig.abi,
    signer,
  );

  try {
    const tx = await contract.settleDonationBatch(
      args.settlements,
      args.nonProfitVault,
    );
    const receipt = await tx.wait();
    return receipt.transactionHash;
  } catch (error) {
    console.error(`Error settling donation batch: ${error}`);
    throw error;
  }
}
