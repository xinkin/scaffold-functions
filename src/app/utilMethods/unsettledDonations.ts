import { ethers, InterfaceAbi } from 'ethers';

interface ContractConfig {
  address: string; // Address of the contract
  abi: InterfaceAbi; // ABI of the contract
}

// Example of Provider
const provider = new ethers.JsonRpcProvider('YOUR_RPC_URL');

export async function unsettledDonations(
  contractConfig: ContractConfig,
  provider: ethers.Provider,
  inputAddress: string, // Address of the user
): Promise<bigint> {
  const contract = new ethers.Contract(
    contractConfig.address,
    contractConfig.abi,
    provider,
  );

  try {
    const result = await contract.unsettledDonations(inputAddress);
    return result;
  } catch (error) {
    console.error(`Error querying unsettled donations: ${error}`);
    throw error;
  }
}
