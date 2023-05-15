export function walletIdValidator(wallet) {
  if (!wallet) {
    return `Wallet Address can't be empty`;
  } else if (wallet.length !== 42) {
    return `This is not a valid wallet address`;
  }
};
