/**
 * UIManager - Handles UI rendering and DOM updates
 * Provides methods for rendering search results, player cards, and team cards
 */
class UIManager {
  constructor(dataLoader) {
    this.dataLoader = dataLoader;
  }

  /**
   * Render search results with grouped display (players and teams)
   * @param {Object} results - Object with players and teams arrays
   * @param {HTMLElement} container - Container element to render results into
   */
  renderSearchResults(results, container) {
    if (!container) {
      console.error('Container element not provided');
      return;
    }

    // Clear existing results
    container.innerHTML = '';

    const { players = [], teams = [] } = results;
    const hasPlayers = players.length > 0;
    const hasTeams = teams.length > 0;

    // If no results at all, show "No results found" message
    if (!hasPlayers && !hasTeams) {
      container.innerHTML = '<div class="search-result-item">No results found</div>';
      container.style.display = 'block';
      return;
    }

    // Create a document fragment for better performance
    const fragment = document.createDocumentFragment();

    // Render players section if there are player results
    if (hasPlayers) {
      // Add category header for players
      const playerHeader = document.createElement('div');
      playerHeader.className = 'search-category-header';
      playerHeader.textContent = 'Players';
      fragment.appendChild(playerHeader);

      // Render each player card
      players.forEach(player => {
        const playerCard = this.renderPlayerCard(player);
        fragment.appendChild(playerCard);
      });
    }

    // Render teams section if there are team results
    if (hasTeams) {
      // Add category header for teams
      const teamHeader = document.createElement('div');
      teamHeader.className = 'search-category-header';
      teamHeader.textContent = 'Teams';
      fragment.appendChild(teamHeader);

      // Render each team card
      teams.forEach(team => {
        const teamCard = this.renderTeamCard(team);
        fragment.appendChild(teamCard);
      });
    }

    // Append all results at once
    container.appendChild(fragment);
    container.style.display = 'block';
  }

  /**
   * Render a player card for search results
   * @param {Object} player - Player object
   * @returns {HTMLElement} Player card element
   */
  renderPlayerCard(player) {
    const card = document.createElement('div');
    card.className = 'search-result-item';
    card.setAttribute('data-player-id', player.id);
    card.setAttribute('data-type', 'player');

    // Create player image/avatar
    const image = document.createElement('div');
    image.className = 'search-result-image';
    image.style.background = `linear-gradient(135deg, ${player.color} 0%, #764ba2 100%)`;
    image.textContent = player.initials;

    // Create info container
    const info = document.createElement('div');
    info.className = 'search-result-info';

    // Player name
    const name = document.createElement('div');
    name.className = 'search-result-name';
    name.textContent = player.name;

    // Player team and position
    const teamPosition = document.createElement('div');
    teamPosition.className = 'search-result-team';
    teamPosition.textContent = `${player.team} • ${player.position}`;

    // Player stats
    const stats = document.createElement('div');
    stats.className = 'search-result-stats';
    stats.textContent = `${player.stats.pts} PTS • ${player.stats.reb} REB • ${player.stats.ast} AST`;

    // Assemble the card
    info.appendChild(name);
    info.appendChild(teamPosition);
    info.appendChild(stats);
    
    card.appendChild(image);
    card.appendChild(info);

    return card;
  }

  /**
   * Render a team card for search results
   * @param {Object} team - Team object
   * @returns {HTMLElement} Team card element
   */
  renderTeamCard(team) {
    const card = document.createElement('div');
    card.className = 'search-result-item';
    card.setAttribute('data-team-id', team.id);
    card.setAttribute('data-type', 'team');

    // Create team logo/avatar
    const logo = document.createElement('div');
    logo.className = 'search-result-image';
    logo.style.background = team.color;
    logo.textContent = team.logo;

    // Create info container
    const info = document.createElement('div');
    info.className = 'search-result-info';

    // Team name
    const name = document.createElement('div');
    name.className = 'search-result-name';
    name.textContent = team.name;

    // Team city and record
    const cityRecord = document.createElement('div');
    cityRecord.className = 'search-result-team';
    const record = (team.stats.wins === '-' || team.stats.losses === '-') 
      ? 'Record: -' 
      : `${team.stats.wins}-${team.stats.losses}`;
    cityRecord.textContent = `${team.city} • ${record}`;

    // Team stats
    const stats = document.createElement('div');
    stats.className = 'search-result-stats';
    const ppg = team.stats.ppg === '-' ? '-' : team.stats.ppg;
    const oppg = team.stats.oppg === '-' ? '-' : team.stats.oppg;
    const def = team.stats.def_rating === '-' ? '-' : team.stats.def_rating;
    stats.textContent = `${ppg} PPG • ${oppg} OPPG • ${def} DEF`;

    // Assemble the card
    info.appendChild(name);
    info.appendChild(cityRecord);
    info.appendChild(stats);
    
    card.appendChild(logo);
    card.appendChild(info);

    return card;
  }

  /**
   * Show a specific page and hide others
   * @param {string} pageId - ID of the page to show
   */
  showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active');
    }
  }

  /**
   * Render player profile page
   * @param {Object} player - Player object
   */
  renderPlayerProfile(player) {
    if (!player) {
      console.error('Player not found');
      return;
    }

    // Update player name and team
    const playerNameEl = document.getElementById('playerName');
    const playerTeamEl = document.getElementById('playerTeam');
    
    if (playerNameEl) playerNameEl.textContent = player.name;
    if (playerTeamEl) playerTeamEl.textContent = `${player.team} • ${player.position}`;

    // Update player photo
    const playerPhotoEl = document.getElementById('playerPhoto');
    if (playerPhotoEl) {
      playerPhotoEl.style.background = `linear-gradient(135deg, ${player.color} 0%, #764ba2 100%)`;
      playerPhotoEl.textContent = player.initials;
    }

    // Update vitals
    const heightEl = document.getElementById('playerHeight');
    const weightEl = document.getElementById('playerWeight');
    const ageEl = document.getElementById('playerAge');
    const wingspanEl = document.getElementById('playerWingspan');
    
    if (heightEl) heightEl.textContent = player.height;
    if (weightEl) weightEl.textContent = player.weight;
    if (ageEl) ageEl.textContent = player.age;
    if (wingspanEl) wingspanEl.textContent = player.wingspan;

    // Update KPI stats
    const kpiPtsEl = document.getElementById('kpiPts');
    const kpiRebEl = document.getElementById('kpiReb');
    const kpiAstEl = document.getElementById('kpiAst');
    
    if (kpiPtsEl) kpiPtsEl.textContent = player.stats.pts;
    if (kpiRebEl) kpiRebEl.textContent = player.stats.reb;
    if (kpiAstEl) kpiAstEl.textContent = player.stats.ast;

    // Update detailed stats in Stats tab
    const statPtsEl = document.getElementById('statPts');
    const statRebEl = document.getElementById('statReb');
    const statAstEl = document.getElementById('statAst');
    
    if (statPtsEl) statPtsEl.textContent = player.stats.pts;
    if (statRebEl) statRebEl.textContent = player.stats.reb;
    if (statAstEl) statAstEl.textContent = player.stats.ast;

    // Update additional stats from JSON data
    const statRows = document.querySelectorAll('#stats .stat-row');
    if (statRows.length >= 9) {
      // Field Goal %
      const fgPctSpan = statRows[3].querySelector('span:last-child');
      if (fgPctSpan) fgPctSpan.textContent = `${player.stats.fg_pct}%`;
      
      // 3-Point %
      const threePctSpan = statRows[4].querySelector('span:last-child');
      if (threePctSpan) threePctSpan.textContent = `${player.stats.three_pct}%`;
      
      // Free Throw %
      const ftPctSpan = statRows[5].querySelector('span:last-child');
      if (ftPctSpan) ftPctSpan.textContent = `${player.stats.ft_pct}%`;
      
      // Steals
      const stlSpan = statRows[6].querySelector('span:last-child');
      if (stlSpan) stlSpan.textContent = player.stats.stl;
      
      // Blocks
      const blkSpan = statRows[7].querySelector('span:last-child');
      if (blkSpan) blkSpan.textContent = player.stats.blk;
      
      // Turnovers
      const tovSpan = statRows[8].querySelector('span:last-child');
      if (tovSpan) tovSpan.textContent = player.stats.tov;
    }

    // Update scouting summary with bio from JSON
    const scoutingSummary = document.querySelector('#overview .scouting-summary p');
    if (scoutingSummary && player.bio) {
      scoutingSummary.textContent = player.bio;
    }

    // Update featured video title
    const featuredVideoTitleEl = document.getElementById('featuredVideoTitle');
    if (featuredVideoTitleEl) {
      featuredVideoTitleEl.textContent = `${player.name} - 2024 Season Highlights`;
    }

    // Reset to Overview tab when navigating to a new player
    this.resetPlayerProfileTabs();
  }

  /**
   * Reset player profile tabs to show Overview tab
   */
  resetPlayerProfileTabs() {
    const playerProfilePage = document.getElementById('player-profile');
    if (!playerProfilePage) return;

    // Remove active class from all tabs and contents
    playerProfilePage.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    playerProfilePage.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Activate Overview tab
    const overviewBtn = playerProfilePage.querySelector('.tab-btn[data-tab="overview"]');
    const overviewContent = document.getElementById('overview');
    
    if (overviewBtn) overviewBtn.classList.add('active');
    if (overviewContent) overviewContent.classList.add('active');
  }

  /**
   * Render team profile page
   * @param {Object} team - Team object
   */
  renderTeamProfile(team) {
    if (!team) {
      console.error('Team not found');
      return;
    }

    // Update team name and city
    const teamNameEl = document.getElementById('teamName');
    const teamCityEl = document.getElementById('teamCity');
    
    if (teamNameEl) teamNameEl.textContent = team.name;
    if (teamCityEl) teamCityEl.textContent = `${team.city} • ${team.conference} Conference`;

    // Update team logo
    const teamLogoEl = document.getElementById('teamLogo');
    if (teamLogoEl) {
      teamLogoEl.style.background = team.color;
      teamLogoEl.textContent = team.logo;
    }

    // Update vitals
    const teamWinsEl = document.getElementById('teamWins');
    const teamLossesEl = document.getElementById('teamLosses');
    const teamPpgEl = document.getElementById('teamPpg');
    const teamOppgEl = document.getElementById('teamOppg');
    
    if (teamWinsEl) teamWinsEl.textContent = team.stats.wins;
    if (teamLossesEl) teamLossesEl.textContent = team.stats.losses;
    if (teamPpgEl) teamPpgEl.textContent = team.stats.ppg;
    if (teamOppgEl) teamOppgEl.textContent = team.stats.oppg;

    // Update KPI stats
    const kpiWinsEl = document.getElementById('kpiWins');
    const kpiLossesEl = document.getElementById('kpiLosses');
    const kpiDefRatingEl = document.getElementById('kpiDefRating');
    
    if (kpiWinsEl) kpiWinsEl.textContent = team.stats.wins;
    if (kpiLossesEl) kpiLossesEl.textContent = team.stats.losses;
    if (kpiDefRatingEl) kpiDefRatingEl.textContent = team.stats.def_rating;

    // Calculate win percentage
    const winPct = ((team.stats.wins / (team.stats.wins + team.stats.losses)) * 100).toFixed(1);

    // Update overview tab stats
    const overviewPpgEl = document.getElementById('overviewPpg');
    const overviewOppgEl = document.getElementById('overviewOppg');
    const overviewDefRatingEl = document.getElementById('overviewDefRating');
    const overviewWinPctEl = document.getElementById('overviewWinPct');
    
    if (overviewPpgEl) overviewPpgEl.textContent = team.stats.ppg;
    if (overviewOppgEl) overviewOppgEl.textContent = team.stats.oppg;
    if (overviewDefRatingEl) overviewDefRatingEl.textContent = team.stats.def_rating;
    if (overviewWinPctEl) overviewWinPctEl.textContent = `${winPct}%`;

    // Update stats tab
    const statsWinsEl = document.getElementById('statsWins');
    const statsLossesEl = document.getElementById('statsLosses');
    const statsPpgEl = document.getElementById('statsPpg');
    const statsOppgEl = document.getElementById('statsOppg');
    const statsDefRatingEl = document.getElementById('statsDefRating');
    const statsWinPctEl = document.getElementById('statsWinPct');
    
    if (statsWinsEl) statsWinsEl.textContent = team.stats.wins;
    if (statsLossesEl) statsLossesEl.textContent = team.stats.losses;
    if (statsPpgEl) statsPpgEl.textContent = team.stats.ppg;
    if (statsOppgEl) statsOppgEl.textContent = team.stats.oppg;
    if (statsDefRatingEl) statsDefRatingEl.textContent = team.stats.def_rating;
    if (statsWinPctEl) statsWinPctEl.textContent = `${winPct}%`;

    // Render roster
    this.renderRoster(team);
  }

  /**
   * Render team roster with player names and positions
   * @param {Object} team - Team object
   */
  renderRoster(team) {
    const rosterListEl = document.getElementById('rosterList');
    if (!rosterListEl) {
      console.error('Roster list element not found');
      return;
    }

    // Clear existing roster
    rosterListEl.innerHTML = '';

    // Check if team has roster
    if (!team.roster || team.roster.length === 0) {
      rosterListEl.innerHTML = '<div class="stat-row">No players on roster</div>';
      return;
    }

    // Create document fragment for better performance
    const fragment = document.createDocumentFragment();

    // Render each player in the roster
    team.roster.forEach(playerId => {
      const player = this.dataLoader.getPlayerById(playerId);
      
      if (player) {
        const rosterItem = document.createElement('div');
        rosterItem.className = 'stat-row roster-item';
        rosterItem.setAttribute('data-player-id', playerId);
        rosterItem.style.cursor = 'pointer';
        
        // Player name
        const nameSpan = document.createElement('span');
        nameSpan.textContent = player.name;
        
        // Player position
        const positionSpan = document.createElement('span');
        positionSpan.textContent = player.position;
        
        rosterItem.appendChild(nameSpan);
        rosterItem.appendChild(positionSpan);
        
        fragment.appendChild(rosterItem);
      }
    });

    // Append all roster items at once
    rosterListEl.appendChild(fragment);

    // Add click handlers to roster items for navigation
    rosterListEl.querySelectorAll('.roster-item').forEach(item => {
      item.addEventListener('click', () => {
        const playerId = item.getAttribute('data-player-id');
        if (playerId && window.navigateToPlayer) {
          window.navigateToPlayer(playerId);
        }
      });
    });
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UIManager;
}
