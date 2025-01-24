import { ethers, InterfaceAbi } from 'ethers';

interface ContractConfig {
  address: string; // Address of the contract
  abi: InterfaceAbi; // ABI of the contract
}

export async function withdrawableFunds(
  contractConfig: ContractConfig,
  provider: ethers.Provider,
  tokenAddress: string, // Address of the token
): Promise<bigint> {
  const contract = new ethers.Contract(
    contractConfig.address,
    contractConfig.abi,
    provider,
  );

  try {
    const result = await contract.withdrawableFunds(tokenAddress);
    return result;
  } catch (error) {
    console.error(`Error querying withdrawable funds: ${error}`);
    throw error;
  }
}
