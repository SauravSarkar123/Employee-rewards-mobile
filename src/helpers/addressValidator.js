export function addressValidator(value) {
const handleAddressChange = (value) => {
    setAddress(value);

    // Validate address
    if (value.trim().length === 0) {
      setError('Please enter a valid address');
    } else {
      setError('');
    }
  }};