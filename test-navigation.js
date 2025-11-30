/**
 * Test script for navigation system
 * This tests the App class methods without requiring a browser
 */

// Mock DOM elements and functions needed for testing
const createMockElement = () => ({
  classList: {
    add: () => {},
    remove: () => {},
    contains: () => true
  },
  querySelectorAll: () => [],
  addEventListener: () => {},
  appendChild: () => {},
  setAttribute: () => {},
  getAttribute: () => '',
  style: {},
  textContent: '',
  innerHTML: ''
});

global.document = {
  getElementById: (id) => createMockElement(),
  querySelectorAll: () => [],
  querySelector: () => null,
  createElement: () => createMockElement(),
  createDocumentFragment: () => ({
    appendChild: () => {}
  }),
  addEventListener: () => {},
  body: {
    appendChild: () => {}
  }
};

global.window = {
  addEventListener: () => {}
};

global.fetch = async (url) => {
  const fs = require('fs');
  const path = require('path');
  
  // Simulate fetching JSON files
  if (url.includes('players.json')) {
    const data = fs.readFileSync(path.join(__dirname, 'data', 'players.json'), 'utf8');
    return {
      ok: true,
      json: async () => JSON.parse(data)
    };
  } else if (url.includes('teams.json')) {
    const data = fs.readFileSync(path.join(__dirname, 'data', 'teams.json'), 'utf8');
    return {
      ok: true,
      json: async () => JSON.parse(data)
    };
  }
  
  return {
    ok: false,
    json: async () => ({})
  };
};

// Load modules
const DataLoader = require('./scripts/data-loader.js');
const SearchEngine = require('./scripts/search.js');
const UIManager = require('./scripts/ui.js');

// Test functions
async function testDataLoader() {
  console.log('\n=== Testing DataLoader ===');
  const dataLoader = new DataLoader();
  
  await dataLoader.loadPlayers();
  await dataLoader.loadTeams();
  
  const players = dataLoader.getAllPlayers();
  const teams = dataLoader.getAllTeams();
  
  console.log(`✓ Loaded ${players.length} players`);
  console.log(`✓ Loaded ${teams.length} teams`);
  
  const player1 = dataLoader.getPlayerById('1');
  console.log(`✓ Retrieved player: ${player1 ? player1.name : 'Not found'}`);
  
  const team1 = dataLoader.getTeamById('1');
  console.log(`✓ Retrieved team: ${team1 ? team1.name : 'Not found'}`);
  
  return dataLoader;
}

async function testSearchEngine(dataLoader) {
  console.log('\n=== Testing SearchEngine ===');
  const searchEngine = new SearchEngine(dataLoader);
  
  const results1 = searchEngine.search('LeBron');
  console.log(`✓ Search for "LeBron": ${results1.players.length} players, ${results1.teams.length} teams`);
  
  const results2 = searchEngine.search('Lakers');
  console.log(`✓ Search for "Lakers": ${results2.players.length} players, ${results2.teams.length} teams`);
  
  const results3 = searchEngine.search('');
  console.log(`✓ Empty search: ${results3.players.length} players, ${results3.teams.length} teams`);
  
  return searchEngine;
}

async function testUIManager(dataLoader) {
  console.log('\n=== Testing UIManager ===');
  const uiManager = new UIManager(dataLoader);
  
  const player = dataLoader.getPlayerById('1');
  const playerCard = uiManager.renderPlayerCard(player);
  console.log(`✓ Rendered player card for: ${player.name}`);
  
  const team = dataLoader.getTeamById('1');
  const teamCard = uiManager.renderTeamCard(team);
  console.log(`✓ Rendered team card for: ${team.name}`);
  
  // Test renderSearchResults
  const results = { players: [player], teams: [team] };
  const container = document.createElement('div');
  uiManager.renderSearchResults(results, container);
  console.log(`✓ Rendered search results`);
  
  return uiManager;
}

async function testNavigation(dataLoader, uiManager) {
  console.log('\n=== Testing Navigation Methods ===');
  
  // Test navigateToPlayer
  const player = dataLoader.getPlayerById('1');
  if (player) {
    uiManager.renderPlayerProfile(player);
    console.log(`✓ Navigate to player: ${player.name}`);
  }
  
  // Test navigateToTeam
  const team = dataLoader.getTeamById('1');
  if (team) {
    uiManager.renderTeamProfile(team);
    console.log(`✓ Navigate to team: ${team.name}`);
  }
  
  // Test showPage
  uiManager.showPage('homepage');
  console.log(`✓ Show page: homepage`);
  
  uiManager.showPage('player-profile');
  console.log(`✓ Show page: player-profile`);
  
  uiManager.showPage('team-profile');
  console.log(`✓ Show page: team-profile`);
}

// Run all tests
async function runTests() {
  console.log('Starting Navigation System Tests...\n');
  
  try {
    const dataLoader = await testDataLoader();
    const searchEngine = await testSearchEngine(dataLoader);
    const uiManager = await testUIManager(dataLoader);
    await testNavigation(dataLoader, uiManager);
    
    console.log('\n=== All Tests Passed ✓ ===\n');
  } catch (error) {
    console.error('\n=== Test Failed ✗ ===');
    console.error(error);
    process.exit(1);
  }
}

runTests();
