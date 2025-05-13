const Customer = require('../models/Customer');
const mongoose = require('mongoose');

/**
 * Find customers matching the given segment rules
 * @param {Array} rules - Array of rule objects with field, operator, and value
 * @param {String} logicOperator - 'AND' or 'OR' to combine rules
 * @returns {Array} - Array of matching customer objects
 */
exports.findMatchingCustomers = async (rules, logicOperator) => {
  // Convert rules to MongoDB query format
  const conditions = rules.map(rule => {
    const { field, operator, value } = rule;
    
    // Handle date fields specially
    if (field === 'lastVisitDate') {
      const dateValue = new Date(value);
      
      switch (operator) {
        case '>':
          return { [field]: { $gt: dateValue } };
        case '<':
          return { [field]: { $lt: dateValue } };
        case '>=':
          return { [field]: { $gte: dateValue } };
        case '<=':
          return { [field]: { $lte: dateValue } };
        case '==':
          // For dates, we want to match the whole day
          const startOfDay = new Date(dateValue);
          startOfDay.setHours(0, 0, 0, 0);
          
          const endOfDay = new Date(dateValue);
          endOfDay.setHours(23, 59, 59, 999);
          
          return { [field]: { $gte: startOfDay, $lte: endOfDay } };
        case '!=':
          return { [field]: { $ne: dateValue } };
        default:
          return {};
      }
    }
    
    // Handle special case for checking inactive days
    if (field === 'inactiveDays') {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - parseInt(value));
      
      switch (operator) {
        case '>':
          return { lastVisitDate: { $lt: daysAgo } };
        case '<':
          return { lastVisitDate: { $gt: daysAgo } };
        case '>=':
          return { lastVisitDate: { $lte: daysAgo } };
        case '<=':
          return { lastVisitDate: { $gte: daysAgo } };
        case '==':
          // This doesn't make perfect sense for "equal to exactly X days"
          // but we'll interpret as "inactive for exactly X days"
          const oneDayLess = new Date(daysAgo);
          oneDayLess.setDate(oneDayLess.getDate() + 1);
          return { 
            lastVisitDate: { 
              $lt: oneDayLess,
              $gte: daysAgo 
            } 
          };
        case '!=':
          return { lastVisitDate: { $ne: daysAgo } };
        default:
          return {};
      }
    }

    // Handle numeric fields
    if (field === 'totalSpend' || field === 'visitCount') {
      const numValue = parseFloat(value);
      
      switch (operator) {
        case '>':
          return { [field]: { $gt: numValue } };
        case '<':
          return { [field]: { $lt: numValue } };
        case '>=':
          return { [field]: { $gte: numValue } };
        case '<=':
          return { [field]: { $lte: numValue } };
        case '==':
          return { [field]: numValue };
        case '!=':
          return { [field]: { $ne: numValue } };
        default:
          return {};
      }
    }
    
    // Default case (string fields)
    switch (operator) {
      case '==':
        return { [field]: value };
      case '!=':
        return { [field]: { $ne: value } };
      default:
        return {};
    }
  });

  // Combine conditions with AND or OR
  let query = {};
  if (logicOperator === 'OR') {
    query = { $or: conditions };
  } else {
    query = { $and: conditions };
  }

  // Find matching customers
  return await Customer.find(query);
};