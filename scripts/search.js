/**
 * SearchEngine - Unified search across players and teams
 * Provides filtering and grouping of search results
 */
class SearchEngine {
  constructor(dataLoader) {
    this.dataLoader = dataLoader;
  }

  /**
   * Search across both players and teams
   * @param {string} query - Search query string
   * @returns {Object} Object with players and teams arrays
   */
  search(query) {
    // Return empty results for empty or null query
    if (!query || typeof query !== 'string' || query.trim() === '') {
      return { players: [], teams: [] };
    }

    const normalizedQuery = query.toLowerCase().trim();
    
    const players = this.searchPlayers(normalizedQuery);
    const teams = this.searchTeams(normalizedQuery);

    return {
      players,
      teams
    };
  }

  /**
   * Search for players by name, team, or position
   * @param {string} query - Search query string (should be normalized)
   * @returns {Array} Array of matching player objects (max 10)
   */
  searchPlayers(query) {
    if (!query || typeof query !== 'string' || query.trim() === '') {
      return [];
    }

    const normalizedQuery = query.toLowerCase().trim();
    const allPlayers = this.dataLoader.getAllPlayers();

    const matchingPlayers = allPlayers.filter(player => {
      // Search across name, team, and position
      const nameMatch = player.name.toLowerCase().includes(normalizedQuery);
      const teamMatch = player.team.toLowerCase().includes(normalizedQuery);
      const positionMatch = player.position.toLowerCase().includes(normalizedQuery);

      return nameMatch || teamMatch || positionMatch;
    });

    // Limit to 10 results
    return matchingPlayers.slice(0, 10);
  }

  /**
   * Search for teams by name or city
   * @param {string} query - Search query string (should be normalized)
   * @returns {Array} Array of matching team objects (max 10)
   */
  searchTeams(query) {
    if (!query || typeof query !== 'string' || query.trim() === '') {
      return [];
    }

    const normalizedQuery = query.toLowerCase().trim();
    const allTeams = this.dataLoader.getAllTeams();

    const matchingTeams = allTeams.filter(team => {
      // Search across name and city
      const nameMatch = team.name.toLowerCase().includes(normalizedQuery);
      const cityMatch = team.city.toLowerCase().includes(normalizedQuery);

      return nameMatch || cityMatch;
    });

    // Limit to 10 results
    return matchingTeams.slice(0, 10);
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SearchEngine;
}
