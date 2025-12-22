/**
 * App - Main application controller
 * Coordinates between modules and handles navigation
 */
class App {
  constructor() {
    this.dataLoader = null;
    this.searchEngine = null;
    this.uiManager = null;
    this.initialized = false;
  }

  /**
   * Initialize the application
   * Load data and set up event listeners
   */
  async init() {
    try {
      // Initialize modules
      this.dataLoader = new DataLoader();
      this.searchEngine = new SearchEngine(this.dataLoader);
      this.uiManager = new UIManager(this.dataLoader);

      // Load data
      await Promise.all([
        this.dataLoader.loadPlayers(),
        this.dataLoader.loadTeams()
      ]);

      // Set up event listeners
      this.setupEventListeners();

      // Populate featured players on homepage
      this.populateFeaturedPlayers();

      // Set up tabs and video filters
      this.setupTabs();
      this.setupVideoFilters();

      this.initialized = true;
      console.log('Scout Hub initialized successfully');
    } catch (error) {
      console.error('Failed to initialize application:', error);
      this.showInitializationError();
    }
  }

  /**
   * Set up all event listeners
   */
  setupEventListeners() {
    // Set up search for homepage
    this.setupSearch('homeSearchInput', 'homeSearchResults', '.home-search-container');
    
    // Set up search for player profile page
    this.setupSearch('profileSearchInput', 'profileSearchResults', '.search-container');
    
    // Set up search for team profile page
    this.setupSearch('teamProfileSearchInput', 'teamProfileSearchResults', '.search-container');

    // Set up logo click to return to homepage
    document.querySelectorAll('.logo').forEach(logo => {
      logo.addEventListener('click', (e) => {
        e.preventDefault();
        this.showPage('homepage');
      });
    });

    // Set up back buttons
    document.querySelectorAll('.back-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.showPage('homepage');
      });
    });

    // Set up navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        
        if (pageId === 'teams-page') {
          this.showTeamsPage();
        } else if (pageId === 'stats-page') {
          this.showStatsPage();
        } else if (pageId === 'homepage') {
          this.showPage('homepage');
        }
      });
    });
  }

  /**
   * Set up search functionality for a specific input
   * @param {string} inputId - ID of the search input element
   * @param {string} resultsId - ID of the search results container
   * @param {string} containerClass - CSS class of the search container
   */
  setupSearch(inputId, resultsId, containerClass) {
    const searchInput = document.getElementById(inputId);
    const searchResults = document.getElementById(resultsId);
    const searchContainer = document.querySelector(containerClass);

    if (!searchInput || !searchResults || !searchContainer) {
      console.warn(`Search elements not found for ${inputId}`);
      return;
    }

    // Use debounced search
    const debouncedSearch = debounce((query) => {
      this.handleSearch(query, searchResults);
    }, 300);

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value;
      
      // Hide results immediately if query is empty
      if (!query || query.trim() === '') {
        searchResults.style.display = 'none';
        return;
      }

      debouncedSearch(query);
    });

    // Hide search results when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchContainer.contains(e.target)) {
        searchResults.style.display = 'none';
      }
    });
  }

  /**
   * Handle search input and render results
   * @param {string} query - Search query string
   * @param {HTMLElement} resultsContainer - Container to render results into
   */
  handleSearch(query, resultsContainer) {
    if (!query || query.trim() === '') {
      if (resultsContainer) {
        resultsContainer.style.display = 'none';
      }
      return;
    }

    // Perform search
    const results = this.searchEngine.search(query);

    // Render results in the specific container
    if (resultsContainer) {
      this.uiManager.renderSearchResults(results, resultsContainer);
      
      // Add click handlers to search results
      this.attachSearchResultHandlers(resultsContainer);
    }
  }

  /**
   * Attach click handlers to search results
   * @param {HTMLElement} container - Container with search results
   */
  attachSearchResultHandlers(container) {
    if (!container) return;

    // Handle player result clicks
    container.querySelectorAll('[data-player-id]').forEach(item => {
      item.addEventListener('click', () => {
        const playerId = item.getAttribute('data-player-id');
        this.navigateToPlayer(playerId);
        
        // Clear search and hide results
        this.clearAllSearchInputs();
        container.style.display = 'none';
      });
    });

    // Handle team result clicks
    container.querySelectorAll('[data-team-id]').forEach(item => {
      item.addEventListener('click', () => {
        const teamId = item.getAttribute('data-team-id');
        this.navigateToTeam(teamId);
        
        // Clear search and hide results
        this.clearAllSearchInputs();
        container.style.display = 'none';
      });
    });
  }

  /**
   * Clear all search inputs
   */
  clearAllSearchInputs() {
    const searchInputs = [
      document.getElementById('homeSearchInput'),
      document.getElementById('profileSearchInput'),
      document.getElementById('teamProfileSearchInput')
    ];

    searchInputs.forEach(input => {
      if (input) {
        input.value = '';
      }
    });
  }

  /**
   * Navigate to player profile page
   * @param {string} playerId - ID of the player to display
   */
  navigateToPlayer(playerId) {
    const player = this.dataLoader.getPlayerById(playerId);
    
    if (!player) {
      console.error(`Player not found: ${playerId}`);
      this.showNotFoundError('Player');
      return;
    }

    // Render player profile
    this.uiManager.renderPlayerProfile(player);
    
    // Show player profile page
    this.showPage('player-profile');
  }

  /**
   * Navigate to team profile page
   * @param {string} teamId - ID of the team to display
   */
  navigateToTeam(teamId) {
    const team = this.dataLoader.getTeamById(teamId);
    
    if (!team) {
      console.error(`Team not found: ${teamId}`);
      this.showNotFoundError('Team');
      return;
    }

    // Render team profile
    this.uiManager.renderTeamProfile(team);
    
    // Show team profile page
    this.showPage('team-profile');
  }

  /**
   * Show a specific page and hide others
   * @param {string} pageId - ID of the page to show
   */
  showPage(pageId) {
    this.uiManager.showPage(pageId);
  }

  /**
   * Populate featured players grid on homepage
   */
  populateFeaturedPlayers() {
    const playersGrid = document.getElementById('playersGrid');
    
    if (!playersGrid) {
      console.warn('Players grid element not found');
      return;
    }

    playersGrid.innerHTML = '';

    const allPlayers = this.dataLoader.getAllPlayers();
    
    if (allPlayers.length === 0) {
      playersGrid.innerHTML = '<p style="color: #888; text-align: center;">No players available</p>';
      return;
    }

    // Create document fragment for better performance
    const fragment = document.createDocumentFragment();

    allPlayers.forEach(player => {
      const playerCard = this.createFeaturedPlayerCard(player);
      fragment.appendChild(playerCard);
    });

    playersGrid.appendChild(fragment);
  }

  /**
   * Create a featured player card for the homepage
   * @param {Object} player - Player object
   * @returns {HTMLElement} Player card element
   */
  createFeaturedPlayerCard(player) {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.style.cursor = 'pointer';

    // Player image
    const image = document.createElement('div');
    image.className = 'player-card-image';
    image.style.background = `linear-gradient(135deg, ${player.color} 0%, #764ba2 100%)`;
    image.textContent = player.initials;

    // Player info container
    const info = document.createElement('div');
    info.className = 'player-card-info';

    // Player name
    const name = document.createElement('div');
    name.className = 'player-card-name';
    name.textContent = player.name;

    // Player team and position
    const team = document.createElement('div');
    team.className = 'player-card-team';
    team.textContent = `${player.team} • ${player.position}`;

    // Player stats
    const stats = document.createElement('div');
    stats.className = 'player-card-stats';

    const ptsStat = this.createStatElement(player.stats.pts, 'PTS');
    const rebStat = this.createStatElement(player.stats.reb, 'REB');
    const astStat = this.createStatElement(player.stats.ast, 'AST');

    stats.appendChild(ptsStat);
    stats.appendChild(rebStat);
    stats.appendChild(astStat);

    // Assemble card
    info.appendChild(name);
    info.appendChild(team);
    info.appendChild(stats);

    card.appendChild(image);
    card.appendChild(info);

    // Add click handler
    card.addEventListener('click', () => {
      this.navigateToPlayer(player.id);
    });

    return card;
  }

  /**
   * Create a stat element
   * @param {number} value - Stat value
   * @param {string} label - Stat label
   * @returns {HTMLElement} Stat element
   */
  createStatElement(value, label) {
    const stat = document.createElement('div');
    stat.className = 'stat';

    const statValue = document.createElement('div');
    statValue.className = 'stat-value';
    statValue.textContent = value;

    const statLabel = document.createElement('div');
    statLabel.className = 'stat-label';
    statLabel.textContent = label;

    stat.appendChild(statValue);
    stat.appendChild(statLabel);

    return stat;
  }

  /**
   * Set up tab switching functionality
   */
  setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(button => {
      button.addEventListener('click', () => {
        // Get the parent container to scope tab switching
        const parentPage = button.closest('.page');
        
        if (!parentPage) return;

        // Remove active class from all tabs and contents in this page
        parentPage.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        parentPage.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        const tabContent = document.getElementById(tabId);
        
        if (tabContent) {
          tabContent.classList.add('active');
        }
      });
    });
  }

  /**
   * Set up video filter functionality
   */
  setupVideoFilters() {
    document.querySelectorAll('.filter-btn').forEach(button => {
      button.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });

    // Simulate video play on thumbnail click
    document.querySelectorAll('.video-thumbnail, .video-item-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        alert('Video player would open here in the full version!');
      });
    });
  }

  /**
   * Show initialization error
   */
  showInitializationError() {
    const errorMessage = document.createElement('div');
    errorMessage.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #1a1a2e;
      color: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
      z-index: 10000;
      text-align: center;
      max-width: 400px;
    `;
    errorMessage.innerHTML = `
      <h2 style="margin: 0 0 15px 0; color: #e53e3e;">Initialization Error</h2>
      <p style="margin: 0 0 20px 0;">Failed to initialize Scout Hub. Please refresh the page.</p>
      <button onclick="location.reload()" style="
        background: #667eea;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
      ">Refresh Page</button>
    `;
    document.body.appendChild(errorMessage);
  }

  /**
   * Show not found error
   * @param {string} type - Type of entity not found (Player or Team)
   */
  showNotFoundError(type) {
    const errorMessage = document.createElement('div');
    errorMessage.style.cssText = `
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
    `;
    errorMessage.textContent = `${type} not found`;
    document.body.appendChild(errorMessage);

    // Remove error after 3 seconds
    setTimeout(() => {
      errorMessage.remove();
    }, 3000);
  }

  /**
   * Show Teams page with all teams
   */
  showTeamsPage() {
    this.showPage('teams-page');
    this.populateTeamsGrid();
  }

  /**
   * Populate teams grid on teams page
   */
  populateTeamsGrid() {
    const teamsGrid = document.getElementById('teamsGrid');
    
    if (!teamsGrid) {
      console.warn('Teams grid element not found');
      return;
    }

    teamsGrid.innerHTML = '';

    const allTeams = this.dataLoader.getAllTeams();
    
    if (allTeams.length === 0) {
      teamsGrid.innerHTML = '<p style="color: #888; text-align: center;">No teams available</p>';
      return;
    }

    // Create document fragment for better performance
    const fragment = document.createDocumentFragment();

    allTeams.forEach(team => {
      const teamCard = this.createTeamCard(team);
      fragment.appendChild(teamCard);
    });

    teamsGrid.appendChild(fragment);
  }

  /**
   * Create a team card for the teams page
   * @param {Object} team - Team object
   * @returns {HTMLElement} Team card element
   */
  createTeamCard(team) {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.style.cursor = 'pointer';

    // Card header with logo and info
    const header = document.createElement('div');
    header.className = 'team-card-header';

    // Team logo
    const logo = document.createElement('div');
    logo.className = 'team-card-logo';
    logo.style.background = team.color;
    logo.textContent = team.logo;

    // Team info
    const info = document.createElement('div');
    info.className = 'team-card-info';

    const name = document.createElement('div');
    name.className = 'team-card-name';
    name.textContent = team.name;

    const city = document.createElement('div');
    city.className = 'team-card-city';
    city.textContent = `${team.city} • ${team.conference} Conference`;

    info.appendChild(name);
    info.appendChild(city);

    header.appendChild(logo);
    header.appendChild(info);

    // Card stats
    const stats = document.createElement('div');
    stats.className = 'team-card-stats';

    const winsStat = this.createTeamStatElement(team.stats.wins, 'Wins');
    const lossesStat = this.createTeamStatElement(team.stats.losses, 'Losses');
    const ppgStat = this.createTeamStatElement(team.stats.ppg, 'PPG');
    const defStat = this.createTeamStatElement(team.stats.def_rating, 'DEF');

    stats.appendChild(winsStat);
    stats.appendChild(lossesStat);
    stats.appendChild(ppgStat);
    stats.appendChild(defStat);

    // Assemble card
    card.appendChild(header);
    card.appendChild(stats);

    // Add click handler
    card.addEventListener('click', () => {
      this.navigateToTeam(team.id);
    });

    return card;
  }

  /**
   * Create a team stat element
   * @param {number} value - Stat value
   * @param {string} label - Stat label
   * @returns {HTMLElement} Stat element
   */
  createTeamStatElement(value, label) {
    const stat = document.createElement('div');
    stat.className = 'team-stat';

    const statValue = document.createElement('div');
    statValue.className = 'team-stat-value';
    statValue.textContent = value;

    const statLabel = document.createElement('div');
    statLabel.className = 'team-stat-label';
    statLabel.textContent = label;

    stat.appendChild(statValue);
    stat.appendChild(statLabel);

    return stat;
  }

  /**
   * Show Stats page with league statistics
   */
  showStatsPage() {
    this.showPage('stats-page');
    this.populateStatsPage();
  }

  /**
   * Populate stats page with top performers
   */
  populateStatsPage() {
    const allPlayers = this.dataLoader.getAllPlayers();
    const allTeams = this.dataLoader.getAllTeams();

    // Helper to parse stats safely
    const parseStat = (val) => {
      if (val === '-' || val === undefined || val === null) return 0;
      return parseFloat(val) || 0;
    };

    // Top Scorers
    const topScorers = [...allPlayers]
      .sort((a, b) => parseStat(b.stats.pts) - parseStat(a.stats.pts))
      .slice(0, 10);
    this.renderStatsList('topScorers', topScorers, 'pts', 'PTS');

    // Top Rebounders
    const topRebounders = [...allPlayers]
      .sort((a, b) => parseStat(b.stats.reb) - parseStat(a.stats.reb))
      .slice(0, 10);
    this.renderStatsList('topRebounders', topRebounders, 'reb', 'REB');

    // Top Assisters
    const topAssisters = [...allPlayers]
      .sort((a, b) => parseStat(b.stats.ast) - parseStat(a.stats.ast))
      .slice(0, 10);
    this.renderStatsList('topAssisters', topAssisters, 'ast', 'AST');

    // Best Records
    const bestRecords = [...allTeams]
      .sort((a, b) => parseStat(b.stats.wins) - parseStat(a.stats.wins))
      .slice(0, 10);
    this.renderTeamStatsList('bestRecords', bestRecords);
  }

  /**
   * Render a stats list for players
   * @param {string} containerId - Container element ID
   * @param {Array} players - Array of player objects
   * @param {string} statKey - Stat key to display
   * @param {string} statLabel - Stat label
   */
  renderStatsList(containerId, players, statKey, statLabel) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    const fragment = document.createDocumentFragment();

    players.forEach((player, index) => {
      const item = document.createElement('div');
      item.className = 'stat-item';
      item.style.cursor = 'pointer';

      // Rank
      const rank = document.createElement('div');
      rank.className = 'stat-item-rank';
      rank.textContent = index + 1;

      // Info
      const info = document.createElement('div');
      info.className = 'stat-item-info';

      const name = document.createElement('div');
      name.className = 'stat-item-name';
      name.textContent = player.name;

      const team = document.createElement('div');
      team.className = 'stat-item-team';
      team.textContent = player.team;

      info.appendChild(name);
      info.appendChild(team);

      // Value
      const value = document.createElement('div');
      value.className = 'stat-item-value';
      value.textContent = player.stats[statKey];

      item.appendChild(rank);
      item.appendChild(info);
      item.appendChild(value);

      // Add click handler
      item.addEventListener('click', () => {
        this.navigateToPlayer(player.id);
      });

      fragment.appendChild(item);
    });

    container.appendChild(fragment);
  }

  /**
   * Render a stats list for teams
   * @param {string} containerId - Container element ID
   * @param {Array} teams - Array of team objects
   */
  renderTeamStatsList(containerId, teams) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    const fragment = document.createDocumentFragment();

    teams.forEach((team, index) => {
      const item = document.createElement('div');
      item.className = 'stat-item';
      item.style.cursor = 'pointer';

      // Rank
      const rank = document.createElement('div');
      rank.className = 'stat-item-rank';
      rank.textContent = index + 1;

      // Info
      const info = document.createElement('div');
      info.className = 'stat-item-info';

      const name = document.createElement('div');
      name.className = 'stat-item-name';
      name.textContent = team.name;

      const city = document.createElement('div');
      city.className = 'stat-item-team';
      city.textContent = team.city;

      info.appendChild(name);
      info.appendChild(city);

      // Value
      const value = document.createElement('div');
      value.className = 'stat-item-value';
      const record = (team.stats.wins === '-' || team.stats.losses === '-') 
        ? '-' 
        : `${team.stats.wins}-${team.stats.losses}`;
      value.textContent = record;

      item.appendChild(rank);
      item.appendChild(info);
      item.appendChild(value);

      // Add click handler
      item.addEventListener('click', () => {
        this.navigateToTeam(team.id);
      });

      fragment.appendChild(item);
    });

    container.appendChild(fragment);
  }
}

// Make navigateToPlayer and navigateToTeam available globally for roster clicks
let appInstance = null;

window.navigateToPlayer = function(playerId) {
  if (appInstance) {
    appInstance.navigateToPlayer(playerId);
  }
};

window.navigateToTeam = function(teamId) {
  if (appInstance) {
    appInstance.navigateToTeam(teamId);
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  appInstance = new App();
  await appInstance.init();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = App;
}
