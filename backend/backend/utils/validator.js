/**
 * Validates email format
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
exports.isValidEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };
  
  /**
   * Validates if value is a number
   * @param {any} value - The value to validate
   * @returns {boolean} - True if valid number, false otherwise
   */
  exports.isNumber = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };
  
  /**
   * Validates if value is a valid date
   * @param {any} value - The value to validate
   * @returns {boolean} - True if valid date, false otherwise
   */
  exports.isValidDate = (value) => {
    const date = new Date(value);
    return !isNaN(date.getTime());
  };