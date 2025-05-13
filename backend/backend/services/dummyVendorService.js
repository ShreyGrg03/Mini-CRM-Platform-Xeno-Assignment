const axios = require('axios');

/**
 * Simulates sending a message to a customer through a vendor API
 * @param {String} logId - The ID of the communication log entry
 * @param {String} recipientEmail - The email of the recipient
 * @param {String} message - The message content
 * @returns {Promise} - Promise resolving to delivery result
 */
exports.sendMessage = async (logId, recipientEmail, message) => {
  // In a real system, this would call an actual vendor API
  // For this implementation, we'll simulate success/failure

  // Wait a short time to simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulate ~90% success rate
  const isSuccessful = Math.random() < 0.9;
  const status = isSuccessful ? 'SENT' : 'FAILED';
  
  try {
    // Call back to our own delivery receipt endpoint
    const response = await axios.post(
      `${process.env.API_URL || 'http://localhost:5000'}/api/delivery-receipt`,
      {
        logId,
        status
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error in dummy vendor service:', error.message);
    throw new Error('Failed to process message delivery');
  }
};