export function dateofJoiningValidator(dateOfJoining) {
const dateOfJoining = (value) => {
    setDateOfJoining(value);

    // Validate date of joining
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      setError('Please enter a valid date of joining (YYYY-MM-DD)');
    } else {
      setError('');
    }
  }};