import { ethers } from 'ethers';

interface SignatureVerificationResult {
  isValid: boolean;
  recoveredAddress: string;
  error?: string;
}

interface SignaturePayload {
  message: string;
  signature: string;
  address: string;
}

export async function verifySignature(
  payload: SignaturePayload,
): Promise<SignatureVerificationResult> {
  try {
    if (!ethers.isAddress(payload.address)) {
      throw new Error('Invalid Ethereum address format');
    }

    const expectedAddress = payload.address.toLowerCase();

    // Recover the address from the signature
    const recoveredAddress = ethers
      .verifyMessage(payload.message, payload.signature)
      .toLowerCase();

    return {
      isValid: recoveredAddress === expectedAddress,
      recoveredAddress,
    };
  } catch (error) {
    return {
      isValid: false,
      recoveredAddress: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
