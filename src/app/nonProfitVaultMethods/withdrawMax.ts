import { ContractConfig, defaultGasToken } from '../viem-config';
import { encodeFunctionData, Address } from 'viem';
import { PaymasterMode, BiconomySmartAccountV2 } from '@biconomy/account';

const GasToken_DAI = defaultGasToken;

interface WithdrawMaxArgs {
  tokens: Address[];
}

export async function withdrawMax(
  smartAccount: BiconomySmartAccountV2 | null,
  withdrawMaxData: WithdrawMaxArgs,
  contractConfig: ContractConfig,
) {
  if (!smartAccount) {
    throw new Error('Smart account is not available');
  }

  const encodeCallWithdrawMax = encodeFunctionData({
    abi: contractConfig.abi,
    functionName: 'withdraw',
    args: [withdrawMaxData.tokens],
  });

  const tx = {
    to: contractConfig.address,
    data: encodeCallWithdrawMax,
  };

  const userop = await smartAccount.sendTransaction(tx, {
    paymasterServiceData: {
      mode: PaymasterMode.ERC20,
      preferredToken: GasToken_DAI,
    },
  });

  const txnhash = await userop.waitForTxHash();

  const {
    receipt: { transactionHash },
    userOpHash,
    success,
  } = await userop.wait();

  if (success === 'true') {
    console.log('UserOp hash', userOpHash);
    console.log('Transaction hash', transactionHash);
    return { success: true, userOpHash, txnhash, transactionHash };
  } else {
    console.error('Initiate withdraw failed');
    return { success: false, error: 'Transaction failed' };
  }
}
