import { ethers } from 'ethers';

interface SignatureGenerationResult {
  message: string;
  signature: string;
  address: string;
  error?: string;
}

interface SignaturePayload {
  message: string;
  privateKey: string;
}

export async function generateSignature(
  payload: SignaturePayload,
): Promise<SignatureGenerationResult> {
  try {
    // Create wallet instance from private key
    const wallet = new ethers.Wallet(payload.privateKey);

    const formattedMessage = '<Unique Payload>';

    // Sign the message
    const signature = await wallet.signMessage(formattedMessage);

    // Get the address from the wallet
    const address = wallet.address;

    return {
      message: formattedMessage,
      signature: signature,
      address: address,
    };
  } catch (error) {
    return {
      message: '',
      signature: '',
      address: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
