export function walletIdValidator(walletId) {
const handleWalletIdChange = (value) => {
    setWalletId(value);

    // Validate wallet ID
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      setError('Please enter a valid wallet ID');
    } else {
      setError('');
    }
  }};
