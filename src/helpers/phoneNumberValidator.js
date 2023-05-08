export function phonenumberValidator(_phonenumber) {
const handlePhoneNumberChange = (value) => {
    // Remove all non-numeric characters from input
    const numericValue = value.replace(/[^0-9]/g, '');
    setPhoneNumber(numericValue);

    // Validate phone number
    if (numericValue.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
    } else {
      setError('');
    }
  }};