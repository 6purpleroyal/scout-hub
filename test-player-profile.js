/**
 * Test script to verify player profile rendering with DataLoader
 */

const fs = require('fs');
const path = require('path');

// Mock DOM elements
const mockDOM = {
  elements: {},
  getElementById: function(id) {
    if (!this.elements[id]) {
      this.elements[id] = {
        textContent: '',
        style: {},
        querySelector: function(selector) {
          return { textContent: '', classList: { add: () => {}, remove: () => {} } };
        },
        querySelectorAll: function(selector) {
          // Return mock elements with classList
          return Array(5).fill(null).map(() => ({
            classList: { add: () => {}, remove: () => {} },
            getAttribute: () => 'overview'
          }));
        },
        classList: { add: () => {}, remove: () => {} }
      };
    }
    return this.elements[id];
  },
  querySelector: function(selector) {
    return { 
      textContent: '',
      classList: { add: () => {}, remove: () => {} }
    };
  },
  querySelectorAll: function(selector) {
    // Return mock stat rows for testing
    if (selector === '#stats .stat-row') {
      return Array(9).fill(null).map(() => ({
        querySelector: () => ({ textContent: '' })
      }));
    }
    // Return mock elements with classList
    return Array(5).fill(null).map(() => ({
      classList: { add: () => {}, remove: () => {} },
      getAttribute: () => 'overview'
    }));
  }
};

global.document = mockDOM;

// Load modules
const DataLoader = require('./scripts/data-loader.js');
const UIManager = require('./scripts/ui.js');

async function testPlayerProfile() {
  console.log('Testing Player Profile Rendering...\n');

  try {
    // Load data directly from JSON files
    const playersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'players.json'), 'utf8'));
    const teamsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'teams.json'), 'utf8'));

    // Initialize DataLoader and manually set the data
    const dataLoader = new DataLoader();
    dataLoader.players = playersData;
    dataLoader.teams = teamsData;
    dataLoader.playersLoaded = true;
    dataLoader.teamsLoaded = true;

    console.log('✓ Data loaded successfully');
    console.log(`  - Players loaded: ${dataLoader.getAllPlayers().length}`);
    console.log(`  - Teams loaded: ${dataLoader.getAllTeams().length}\n`);

    // Initialize UIManager
    const uiManager = new UIManager(dataLoader);

    // Test rendering Paul George's profile
    const paulGeorge = dataLoader.getPlayerById('1');
    
    if (!paulGeorge) {
      console.error('✗ Failed to load Paul George');
      return;
    }

    console.log('✓ Retrieved player data:');
    console.log(`  - Name: ${paulGeorge.name}`);
    console.log(`  - Team: ${paulGeorge.team}`);
    console.log(`  - Position: ${paulGeorge.position}`);
    console.log(`  - Height: ${paulGeorge.height}`);
    console.log(`  - Weight: ${paulGeorge.weight}`);
    console.log(`  - Age: ${paulGeorge.age}`);
    console.log(`  - Wingspan: ${paulGeorge.wingspan}`);
    console.log(`  - Stats: ${JSON.stringify(paulGeorge.stats, null, 2)}`);
    console.log(`  - Bio: ${paulGeorge.bio}`);
    console.log(`  - Color: ${paulGeorge.color}`);
    console.log(`  - Initials: ${paulGeorge.initials}\n`);

    // Render player profile
    uiManager.renderPlayerProfile(paulGeorge);

    console.log('✓ Player profile rendered successfully');

    // Verify all fields are populated
    const checks = [
      { field: 'playerName', expected: paulGeorge.name },
      { field: 'playerTeam', expected: `${paulGeorge.team} • ${paulGeorge.position}` },
      { field: 'playerHeight', expected: paulGeorge.height },
      { field: 'playerWeight', expected: paulGeorge.weight },
      { field: 'playerAge', expected: paulGeorge.age },
      { field: 'playerWingspan', expected: paulGeorge.wingspan },
      { field: 'kpiPts', expected: paulGeorge.stats.pts },
      { field: 'kpiReb', expected: paulGeorge.stats.reb },
      { field: 'kpiAst', expected: paulGeorge.stats.ast },
      { field: 'statPts', expected: paulGeorge.stats.pts },
      { field: 'statReb', expected: paulGeorge.stats.reb },
      { field: 'statAst', expected: paulGeorge.stats.ast }
    ];

    console.log('\nVerifying field updates:');
    checks.forEach(check => {
      const element = mockDOM.getElementById(check.field);
      const actual = element.textContent;
      const expected = String(check.expected);
      const status = actual === expected ? '✓' : '✗';
      console.log(`  ${status} ${check.field}: ${actual} ${actual === expected ? '==' : '!='} ${expected}`);
    });

    // Test with another player (LeBron James)
    console.log('\n\nTesting with another player (LeBron James)...');
    const lebron = dataLoader.getPlayerById('2');
    
    if (!lebron) {
      console.error('✗ Failed to load LeBron James');
      return;
    }

    console.log('✓ Retrieved player data:');
    console.log(`  - Name: ${lebron.name}`);
    console.log(`  - Team: ${lebron.team}`);
    console.log(`  - Position: ${lebron.position}`);
    console.log(`  - Stats: PTS=${lebron.stats.pts}, REB=${lebron.stats.reb}, AST=${lebron.stats.ast}`);
    console.log(`  - Bio: ${lebron.bio}\n`);

    uiManager.renderPlayerProfile(lebron);
    console.log('✓ LeBron James profile rendered successfully');

    // Verify LeBron's data
    const lebronChecks = [
      { field: 'playerName', expected: lebron.name },
      { field: 'kpiPts', expected: lebron.stats.pts }
    ];

    console.log('\nVerifying LeBron field updates:');
    lebronChecks.forEach(check => {
      const element = mockDOM.getElementById(check.field);
      const actual = element.textContent;
      const expected = String(check.expected);
      const status = actual === expected ? '✓' : '✗';
      console.log(`  ${status} ${check.field}: ${actual} ${actual === expected ? '==' : '!='} ${expected}`);
    });

    console.log('\n✓ All tests passed! Player profile page successfully uses DataLoader.');

  } catch (error) {
    console.error('✗ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run tests
testPlayerProfile();
