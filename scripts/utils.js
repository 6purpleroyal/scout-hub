/**
 * Utility functions for Scout Hub
 */

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} - The debounced function
 */
function debounce(func, delay = 300) {
  let timeoutId;
  
  return function(...args) {
    // Clear the previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    // Set a new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * Capitalize the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} - The capitalized string
 */
function capitalize(str) {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Format a number with commas for thousands
 * @param {number} num - The number to format
 * @returns {string} - The formatted number
 */
function formatNumber(num) {
  if (num === null || num === undefined || isNaN(num)) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Truncate a string to a specified length with ellipsis
 * @param {string} str - The string to truncate
 * @param {number} maxLength - The maximum length
 * @returns {string} - The truncated string
 */
function truncate(str, maxLength = 100) {
  if (!str || typeof str !== 'string') return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Sanitize a string for safe HTML insertion
 * @param {string} str - The string to sanitize
 * @returns {string} - The sanitized string
 */
function sanitizeHTML(str) {
  if (!str || typeof str !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Format a percentage value
 * @param {number} value - The decimal value (e.g., 0.456)
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} - The formatted percentage (e.g., "45.6%")
 */
function formatPercentage(value, decimals = 1) {
  if (value === null || value === undefined || isNaN(value)) return '0.0%';
  return (value * 100).toFixed(decimals) + '%';
}

/**
 * Format a player's height (e.g., "6'8\"")
 * @param {string} height - The height string
 * @returns {string} - The formatted height
 */
function formatHeight(height) {
  if (!height || typeof height !== 'string') return '';
  return height;
}

/**
 * Create initials from a name
 * @param {string} name - The full name
 * @returns {string} - The initials (e.g., "LJ" for "LeBron James")
 */
function getInitials(name) {
  if (!name || typeof name !== 'string') return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Check if a string matches a query (case-insensitive)
 * @param {string} str - The string to check
 * @param {string} query - The search query
 * @returns {boolean} - True if the string contains the query
 */
function matchesQuery(str, query) {
  if (!str || !query) return false;
  return str.toLowerCase().includes(query.toLowerCase());
}

// Make functions available globally in browser
if (typeof window !== 'undefined') {
  window.debounce = debounce;
  window.capitalize = capitalize;
  window.formatNumber = formatNumber;
  window.truncate = truncate;
  window.sanitizeHTML = sanitizeHTML;
  window.formatPercentage = formatPercentage;
  window.formatHeight = formatHeight;
  window.getInitials = getInitials;
  window.matchesQuery = matchesQuery;
}

// Export for use in Node.js/testing environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    debounce,
    capitalize,
    formatNumber,
    truncate,
    sanitizeHTML,
    formatPercentage,
    formatHeight,
    getInitials,
    matchesQuery
  };
}
