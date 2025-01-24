import { ethers, InterfaceAbi } from 'ethers';

interface ContractConfig {
  address: string; // Address of the contract
  abi: InterfaceAbi; // ABI of the contract
}

interface RE2Donation {
  nonprofitVault: string;
  totalAmount: bigint;
  adminShare: bigint;
}

interface Settlements {
  user: string;
  settlementId: string;
  donations: RE2Donation[];
}

// Create provider
const provider = new ethers.JsonRpcProvider('YOUR_RPC_URL');
// Create signer from private key
const signer = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

export async function re2DonationSettlements(
  contractConfig: ContractConfig,
  signer: ethers.Signer,
  tokenAddress: string,
  settlements: Settlements[],
): Promise<any> {
  const contract = new ethers.Contract(
    contractConfig.address,
    contractConfig.abi,
    signer,
  );

  try {
    const tx = await contract.re2DonationSettlements(tokenAddress, settlements);
    const receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.error(`Error creating NonProfitVault: ${error}`);
    throw error;
  }
}
