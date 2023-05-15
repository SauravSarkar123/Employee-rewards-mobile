export function phoneNumberValidator(value) {
    // Remove all non-numeric characters from input
    const numericValue = value.replace(/[^0-9]/g, '');

    // Validate phone number
    if (numericValue.length !== 10) {
      return('Please enter a valid 10-digit phone number');
    } 
  }