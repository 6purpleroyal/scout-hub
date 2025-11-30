/**
 * DataLoader - Handles loading and caching of player and team data
 * Provides centralized data access with error handling
 */
class DataLoader {
  constructor() {
    this.players = [];
    this.teams = [];
    this.playersLoaded = false;
    this.teamsLoaded = false;
    this.errorMessage = null;
  }

  /**
   * Load players from embedded data
   * @returns {Promise<Array>} Array of player objects
   */
  async loadPlayers() {
    if (this.playersLoaded) {
      return this.players;
    }

    try {
      // Use embedded data instead of fetching from JSON file
      if (typeof PLAYERS_DATA !== 'undefined') {
        this.players = PLAYERS_DATA;
        this.playersLoaded = true;
        this.errorMessage = null;
        return this.players;
      } else {
        throw new Error('Player data not found');
      }
    } catch (error) {
      console.error('Failed to load player data:', error);
      this.errorMessage = 'Unable to load player data. Please refresh the page.';
      this.showErrorMessage(this.errorMessage);
      this.players = [];
      return this.players;
    }
  }

  /**
   * Load teams from embedded data
   * @returns {Promise<Array>} Array of team objects
   */
  async loadTeams() {
    if (this.teamsLoaded) {
      return this.teams;
    }

    try {
      // Use embedded data instead of fetching from JSON file
      if (typeof TEAMS_DATA !== 'undefined') {
        this.teams = TEAMS_DATA;
        this.teamsLoaded = true;
        this.errorMessage = null;
        return this.teams;
      } else {
        throw new Error('Team data not found');
      }
    } catch (error) {
      console.error('Failed to load team data:', error);
      this.errorMessage = 'Unable to load team data. Please refresh the page.';
      this.showErrorMessage(this.errorMessage);
      this.teams = [];
      return this.teams;
    }
  }

  /**
   * Get player by ID from cached data
   * @param {string} id - Player ID
   * @returns {Object|null} Player object or null if not found
   */
  getPlayerById(id) {
    if (!this.playersLoaded) {
      console.warn('Players not loaded yet. Call loadPlayers() first.');
      return null;
    }
    
    return this.players.find(player => player.id === id) || null;
  }

  /**
   * Get team by ID from cached data
   * @param {string} id - Team ID
   * @returns {Object|null} Team object or null if not found
   */
  getTeamById(id) {
    if (!this.teamsLoaded) {
      console.warn('Teams not loaded yet. Call loadTeams() first.');
      return null;
    }
    
    return this.teams.find(team => team.id === id) || null;
  }

  /**
   * Get all players from cached data
   * @returns {Array} Array of all player objects
   */
  getAllPlayers() {
    if (!this.playersLoaded) {
      console.warn('Players not loaded yet. Call loadPlayers() first.');
      return [];
    }
    
    return this.players;
  }

  /**
   * Get all teams from cached data
   * @returns {Array} Array of all team objects
   */
  getAllTeams() {
    if (!this.teamsLoaded) {
      console.warn('Teams not loaded yet. Call loadTeams() first.');
      return [];
    }
    
    return this.teams;
  }

  /**
   * Display error message to user
   * @param {string} message - Error message to display
   */
  showErrorMessage(message) {
    // Check if error container exists, if not create it
    let errorContainer = document.getElementById('data-error-message');
    
    if (!errorContainer) {
      errorContainer = document.createElement('div');
      errorContainer.id = 'data-error-message';
      errorContainer.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #e53e3e;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        max-width: 90%;
        text-align: center;
      `;
      document.body.appendChild(errorContainer);
    }
    
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
  }

  /**
   * Hide error message
   */
  hideErrorMessage() {
    const errorContainer = document.getElementById('data-error-message');
    if (errorContainer) {
      errorContainer.style.display = 'none';
    }
  }

  /**
   * Get current error message if any
   * @returns {string|null} Current error message or null
   */
  getErrorMessage() {
    return this.errorMessage;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DataLoader;
}
