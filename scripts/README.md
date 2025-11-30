# Scout Hub Scripts

This directory contains the core JavaScript modules for the Scout Hub application.

## Modules

### Data Loader Module

#### Overview
The DataLoader class provides centralized data loading and caching for player and team data from JSON files.

## Usage

```javascript
// Create a new instance
const dataLoader = new DataLoader();

// Load players (async)
const players = await dataLoader.loadPlayers();

// Load teams (async)
const teams = await dataLoader.loadTeams();

// Get specific player by ID (sync - after loading)
const player = dataLoader.getPlayerById('1');

// Get specific team by ID (sync - after loading)
const team = dataLoader.getTeamById('1');

// Get all players (sync - after loading)
const allPlayers = dataLoader.getAllPlayers();

// Get all teams (sync - after loading)
const allTeams = dataLoader.getAllTeams();

// Check for errors
const errorMsg = dataLoader.getErrorMessage();
```

## Features

### In-Memory Caching
- Data is loaded once and cached in memory
- Subsequent calls to `loadPlayers()` or `loadTeams()` return cached data
- Improves performance by avoiding repeated network requests

### Error Handling
- Gracefully handles network errors and invalid JSON
- Displays user-friendly error messages
- Returns empty arrays as fallback on error
- Logs errors to console for debugging

### Synchronous Access
- After initial async load, data can be accessed synchronously
- Getter methods return immediately from cache
- Returns null/empty array if data not loaded yet

## Error Messages
When errors occur, a red notification banner appears at the top of the page with a user-friendly message:
- "Unable to load player data. Please refresh the page."
- "Unable to load team data. Please refresh the page."

## Testing
Open `test-data-loader.html` in a browser to run the test suite and verify functionality.

#### Requirements Satisfied
- Requirements 3.1: Reads player data from JSON file
- Requirements 3.2: Reads team data from JSON file
- Requirements 3.5: Handles invalid JSON gracefully with user-friendly messages

---

### Utils Module

#### Overview
The Utils module provides utility functions for string manipulation, formatting, and debouncing used throughout the Scout Hub application.

#### Usage

```javascript
// Debounce a function (useful for search input)
const debouncedSearch = debounce((query) => {
  performSearch(query);
}, 300);

// Capitalize strings
const name = capitalize('lebron'); // "Lebron"

// Format numbers with commas
const formatted = formatNumber(1234567); // "1,234,567"

// Truncate long strings
const short = truncate('This is a very long string...', 20); // "This is a very lo..."

// Format percentages
const pct = formatPercentage(0.456, 1); // "45.6%"

// Get initials from name
const initials = getInitials('LeBron James'); // "LJ"

// Check if string matches query (case-insensitive)
const matches = matchesQuery('LeBron James', 'lebron'); // true

// Sanitize HTML strings
const safe = sanitizeHTML('<script>alert("xss")</script>'); // Safe text only
```

#### Available Functions

- **debounce(func, delay)** - Limits how often a function can be called (default 300ms delay)
- **capitalize(str)** - Capitalizes the first letter of a string
- **formatNumber(num)** - Formats numbers with comma separators
- **truncate(str, maxLength)** - Truncates strings with ellipsis (default 100 chars)
- **sanitizeHTML(str)** - Sanitizes strings for safe HTML insertion
- **formatPercentage(value, decimals)** - Formats decimal values as percentages
- **formatHeight(height)** - Formats player height strings
- **getInitials(name)** - Extracts initials from full names
- **matchesQuery(str, query)** - Case-insensitive string matching

#### Testing
Open `test-utils.html` in a browser to run the test suite and verify functionality.

#### Requirements Satisfied
- Requirements 6.3: Debounces search input to reduce unnecessary processing
