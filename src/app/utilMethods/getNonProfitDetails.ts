import { ethers, InterfaceAbi } from 'ethers';

interface ContractConfig {
  address: string; // Address of the contract
  abi: InterfaceAbi; // ABI of the contract
}

export async function getNonProfitDetails(
  contractConfig: ContractConfig,
  provider: ethers.Provider,
  userAddress: string, // Address of the user
  tokenAddress: string, // Address of the token
): Promise<{ withdrawableFunds: bigint; unsettledDonations: bigint }> {
  const contract = new ethers.Contract(
    contractConfig.address,
    contractConfig.abi,
    provider,
  );

  try {
    const withdrawableFunds = await contract.withdrawableFunds(tokenAddress);
    const unsettledDonations = await contract.unsettledDonations(userAddress);
    return { withdrawableFunds, unsettledDonations };
  } catch (error) {
    console.error(`Error querying Non Profit Details: ${error}`);
    throw error;
  }
}
