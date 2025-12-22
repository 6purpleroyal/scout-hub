const fs = require('fs');
const path = require('path');

const playersPath = path.join(__dirname, 'data', 'players1.json');
const teamsPath = path.join(__dirname, 'data', 'teams1.json');
const destPath = path.join(__dirname, 'scripts', 'data.js');

try {
  const playersData = fs.readFileSync(playersPath, 'utf8');
  const teamsData = fs.readFileSync(teamsPath, 'utf8');

  const content = `/**
 * Embedded data for Scout Hub
 * This file contains all player and team data directly in JavaScript
 * to avoid CORS issues when loading from local files
 */

const PLAYERS_DATA = ${playersData};

const TEAMS_DATA = ${teamsData};
`;

  fs.writeFileSync(destPath, content);
  console.log('scripts/data.js updated successfully');
} catch (error) {
  console.error('Error updating data:', error);
  process.exit(1);
}
