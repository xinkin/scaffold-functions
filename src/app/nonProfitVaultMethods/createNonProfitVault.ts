// import { Address, zeroAddress } from 'viem';
// import { ContractConfig, ClientConfig, createClients } from '../viem-config';

// export async function createNonProfitVault(
//   contractConfig: ContractConfig,
//   projectId: bigint,
//   nonProfitAddress: Address,
//   clientConfig: ClientConfig = {},
// ): Promise<`0x${string}`> {
//   const { publicClient, walletClient } = createClients(clientConfig);

//   if (nonProfitAddress === zeroAddress) {
//     throw new Error('NonProfitAddressCanNotBeZero');
//   }

//   try {
//     const [account] = await walletClient.requestAddresses();
//     const { request } = await publicClient.simulateContract({
//       account,
//       address: contractConfig.address,
//       abi: contractConfig.abi,
//       functionName: 'createNonProfitVault',
//       args: [projectId, nonProfitAddress],
//     });
//     const txHash = await walletClient.writeContract(request);

//     return txHash;
//   } catch (error) {
//     console.error(`Error creating NonProfitVault: ${error}`);
//     throw error;
//   }
// }

import { ethers, ZeroAddress, InterfaceAbi } from 'ethers';

interface ContractConfig {
  address: string; // Address of the contract
  abi: InterfaceAbi; // ABI of the contract
}

// Create provider
const provider = new ethers.JsonRpcProvider('YOUR_RPC_URL');
// Create signer from private key
const signer = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

export async function createNonProfitVault(
  contractConfig: ContractConfig,
  signer: ethers.Signer,
  projectId: bigint,
  nonProfitAddress: string,
): Promise<any> {
  if (nonProfitAddress === ZeroAddress) {
    throw new Error('NonProfitAddressCanNotBeZero');
  }

  const contract = new ethers.Contract(
    contractConfig.address,
    contractConfig.abi,
    signer,
  );

  try {
    const tx = await contract.createNonProfitVault(projectId, nonProfitAddress);
    const receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.error(`Error creating NonProfitVault: ${error}`);
    throw error;
  }
}
