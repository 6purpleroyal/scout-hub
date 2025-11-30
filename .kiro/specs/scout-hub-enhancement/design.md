# Design Document

## Overview

Scout Hub Enhancement transforms the existing single-page basketball scouting application into a comprehensive search and analytics platform. The design maintains the current dark theme aesthetic while adding team statistics, enhanced search capabilities, and a JSON-based data architecture that allows non-technical users to update player and team information.

The architecture follows a simple, maintainable approach using vanilla JavaScript with modern ES6+ features, external JSON data files, and modular code organization. This keeps the application lightweight, fast, and easy to deploy on any static hosting platform (GitHub Pages, Netlify, Vercel) at minimal or zero cost.

## Architecture

### High-Level Structure

```
scout-hub/
├── index.html              # Main HTML file (renamed from scout_hub.html)
├── styles/
│   └── main.css           # Extracted CSS for better organization
├── scripts/
│   ├── app.js             # Main application logic
│   ├── data-loader.js     # JSON data loading and caching
│   ├── search.js          # Search functionality
│   ├── ui.js              # UI rendering and updates
│   └── utils.js           # Utility functions (debounce, etc.)
└── data/
    ├── players.json       # Player database
    └── teams.json         # Team database
```

### Technology Stack Recommendation

**Recommended Stack: Vanilla JavaScript + JSON + Static Hosting**

Rationale:
- **Zero runtime costs**: Static hosting is free on GitHub Pages, Netlify, or Vercel
- **No build process needed**: Direct HTML/CSS/JS means instant updates
- **Easy data updates**: Edit JSON files directly or use a simple admin interface later
- **Fast performance**: No framework overhead, minimal bundle size
- **Simple deployment**: Just push files to repository

Alternative considered but not recommended:
- React/Vue: Adds complexity and build steps for minimal benefit at this scale
- Backend database: Adds hosting costs and complexity when JSON files suffice for hundreds of players

### Data Flow

1. **Page Load**: App initializes → Loads JSON files → Caches data in memory
2. **Search**: User types → Debounced search → Filter cached data → Render results
3. **Navigation**: User clicks result → Load profile data from cache → Render profile page
4. **Data Update**: Admin edits JSON → Commits to repo → Users get updates on next page load

## Components and Interfaces

### 1. Data Loader Module (`data-loader.js`)

**Purpose**: Centralized data loading and caching

**Interface**:
```javascript
class DataLoader {
  async loadPlayers()      // Returns: Promise<Player[]>
  async loadTeams()        // Returns: Promise<Team[]>
  getPlayerById(id)        // Returns: Player | null
  getTeamById(id)          // Returns: Team | null
  getAllPlayers()          // Returns: Player[]
  getAllTeams()            // Returns: Team[]
}
```

**Responsibilities**:
- Fetch JSON files using fetch API
- Cache data in memory to avoid repeated network requests
- Provide synchronous access to cached data
- Handle loading errors gracefully

### 2. Search Module (`search.js`)

**Purpose**: Unified search across players and teams

**Interface**:
```javascript
class SearchEngine {
  search(query)            // Returns: { players: Player[], teams: Team[] }
  searchPlayers(query)     // Returns: Player[]
  searchTeams(query)       // Returns: Team[]
}
```

**Responsibilities**:
- Perform case-insensitive substring matching
- Search across multiple fields (name, team, position)
- Return grouped results (players and teams separately)
- Limit results for performance (10 per category)

### 3. UI Module (`ui.js`)

**Purpose**: Render UI components and handle DOM updates

**Interface**:
```javascript
class UIManager {
  renderPlayerCard(player)           // Returns: HTMLElement
  renderTeamCard(team)               // Returns: HTMLElement
  renderSearchResults(results)       // Updates search dropdown
  renderPlayerProfile(player)        // Updates profile page
  renderTeamProfile(team)            // Updates team page
  showPage(pageId)                   // Navigation
}
```

**Responsibilities**:
- Generate HTML for cards, lists, and profiles
- Update DOM efficiently
- Handle page transitions
- Maintain consistent styling

### 4. App Module (`app.js`)

**Purpose**: Main application controller

**Interface**:
```javascript
class App {
  async init()                       // Initialize application
  setupEventListeners()              // Attach event handlers
  handleSearch(query)                // Process search input
  navigateToPlayer(playerId)         // Show player profile
  navigateToTeam(teamId)             // Show team profile
}
```

**Responsibilities**:
- Coordinate between modules
- Handle routing/navigation
- Set up event listeners
- Manage application state

## Data Models

### Player Model

```json
{
  "id": "string",
  "name": "string",
  "team": "string",
  "teamId": "string",
  "position": "string",
  "height": "string",
  "weight": "string",
  "age": "number",
  "wingspan": "string",
  "stats": {
    "pts": "number",
    "reb": "number",
    "ast": "number",
    "fg_pct": "number",
    "three_pct": "number",
    "ft_pct": "number",
    "stl": "number",
    "blk": "number",
    "tov": "number"
  },
  "color": "string",
  "initials": "string",
  "bio": "string"
}
```

### Team Model

```json
{
  "id": "string",
  "name": "string",
  "city": "string",
  "conference": "string",
  "division": "string",
  "stats": {
    "wins": "number",
    "losses": "number",
    "ppg": "number",
    "oppg": "number",
    "def_rating": "number"
  },
  "roster": ["playerId1", "playerId2"],
  "color": "string",
  "logo": "string"
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Search filtering correctness
*For any* search query and database of players and teams, all returned results should match the query in at least one searchable field (name, team, position, or city)
**Validates: Requirements 1.1, 2.1**

### Property 2: Search result rendering completeness
*For any* player or team in search results, the rendered HTML should contain all required display fields (name, team/city, position/record, and key statistics)
**Validates: Requirements 1.2, 2.3, 2.4**

### Property 3: Navigation correctness
*For any* clickable search result or roster entry, clicking should navigate to the correct profile page matching the clicked entity's ID
**Validates: Requirements 1.3, 2.2, 2.5**

### Property 4: Data loading round-trip
*For any* valid JSON data file, loading the data should produce an in-memory structure that contains all entities from the file with all fields intact
**Validates: Requirements 3.1, 3.2**

### Property 5: Error handling for invalid data
*For any* malformed JSON input, the data loader should catch the error and return a user-friendly error message without crashing the application
**Validates: Requirements 3.5**

### Property 6: Search result grouping
*For any* search query that matches both players and teams, the results should be organized into separate groups with players in one section and teams in another
**Validates: Requirements 4.1, 4.3**

### Property 7: Category header presence
*For any* grouped search results containing multiple categories, each category should have a visible header label in the rendered HTML
**Validates: Requirements 4.2**

### Property 8: Result limiting
*For any* search query that matches more than 10 players or more than 10 teams, the returned results should contain at most 10 items per category
**Validates: Requirements 4.4**

### Property 9: Search debouncing
*For any* rapid sequence of search inputs within a short time window (< 300ms), the search function should execute at most once after the input stops
**Validates: Requirements 6.3**

## Error Handling

### Data Loading Errors

**Scenario**: JSON file fails to load or contains invalid JSON

**Handling**:
1. Catch fetch errors and JSON parsing errors
2. Log error to console for debugging
3. Display user-friendly message: "Unable to load data. Please refresh the page."
4. Provide fallback empty data structure to prevent crashes
5. Optionally retry after delay

**Implementation**:
```javascript
try {
  const response = await fetch('data/players.json');
  if (!response.ok) throw new Error('Network error');
  const data = await response.json();
  return data;
} catch (error) {
  console.error('Data loading failed:', error);
  showErrorMessage('Unable to load player data');
  return [];
}
```

### Search Errors

**Scenario**: Search function receives unexpected input

**Handling**:
1. Sanitize input (trim whitespace, handle special characters)
2. Return empty results for null/undefined input
3. Handle empty database gracefully
4. Never throw errors to user interface

### Navigation Errors

**Scenario**: User attempts to navigate to non-existent player/team

**Handling**:
1. Check if ID exists before rendering
2. Display "Player/Team not found" message
3. Provide link back to homepage
4. Log warning for debugging

## Testing Strategy

### Unit Testing

We'll use **Vitest** as the testing framework for its speed, modern API, and excellent ES modules support.

**Unit test coverage**:
- Data loader functions (load, cache, retrieve)
- Search filtering logic
- Debounce utility function
- HTML generation functions
- Error handling paths

**Example unit tests**:
```javascript
describe('SearchEngine', () => {
  it('should return empty results for empty query', () => {
    const search = new SearchEngine(mockData);
    expect(search.search('')).toEqual({ players: [], teams: [] });
  });

  it('should find player by partial name match', () => {
    const search = new SearchEngine(mockData);
    const results = search.search('Lebr');
    expect(results.players).toContainEqual(expect.objectContaining({
      name: 'LeBron James'
    }));
  });
});
```

### Property-Based Testing

We'll use **fast-check** for property-based testing, which integrates well with Vitest and provides excellent generators for JavaScript.

**Configuration**: Each property test should run a minimum of 100 iterations to ensure thorough coverage of the input space.

**Test tagging**: Each property-based test must include a comment explicitly referencing the correctness property from this design document using the format: `**Feature: scout-hub-enhancement, Property {number}: {property_text}**`

**Property test coverage**:
- Search filtering across random queries and databases
- Rendering completeness for random entities
- Navigation with random IDs
- Data loading with various JSON structures
- Error handling with malformed inputs
- Result grouping and limiting

**Example property test**:
```javascript
import fc from 'fast-check';

describe('Property: Search filtering correctness', () => {
  it('should only return results matching the query', () => {
    /**
     * Feature: scout-hub-enhancement, Property 1: Search filtering correctness
     */
    fc.assert(
      fc.property(
        fc.array(playerArbitrary),
        fc.string(),
        (players, query) => {
          const search = new SearchEngine({ players, teams: [] });
          const results = search.search(query);
          
          results.players.forEach(player => {
            const matches = 
              player.name.toLowerCase().includes(query.toLowerCase()) ||
              player.team.toLowerCase().includes(query.toLowerCase()) ||
              player.position.toLowerCase().includes(query.toLowerCase());
            expect(matches).toBe(true);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Integration Testing

**Scope**: Test interactions between modules
- Data loading → Search → UI rendering flow
- Search → Navigation → Profile rendering flow
- Error scenarios across module boundaries

**Approach**: Use jsdom or happy-dom to simulate browser environment in tests

## Performance Considerations

### Data Loading
- Load JSON files once on initialization
- Cache in memory for instant access
- Consider lazy loading for large datasets (future enhancement)

### Search Performance
- Debounce input (300ms delay)
- Limit results to 10 per category
- Use simple string matching (sufficient for hundreds of players)
- For thousands of players, consider: Fuse.js for fuzzy search or indexing

### Rendering Performance
- Use document fragments for batch DOM updates
- Avoid layout thrashing (read then write DOM)
- Reuse existing elements when possible
- Virtual scrolling for long lists (future enhancement)

### Bundle Size
- Current approach: ~50KB total (HTML + CSS + JS)
- No external dependencies for core functionality
- Testing libraries only in dev dependencies

## Deployment Strategy

### Recommended: GitHub Pages (Free)

**Setup**:
1. Create GitHub repository
2. Enable GitHub Pages in settings
3. Push code to main branch
4. Access at: `https://username.github.io/scout-hub`

**Data Updates**:
1. Edit JSON files in `data/` directory
2. Commit and push changes
3. Changes live within minutes

### Alternative: Netlify/Vercel (Free tier)

**Benefits**:
- Automatic deployments on push
- Custom domains
- Preview deployments for PRs
- Better performance (CDN)

**Setup**:
1. Connect GitHub repository
2. Configure build settings (none needed for static site)
3. Deploy

## Future Enhancements

### Phase 2 (Optional)
- Advanced filters (age range, stat thresholds)
- Comparison tool (compare 2-3 players side-by-side)
- Favorites/watchlist with localStorage
- Export player data to PDF

### Phase 3 (Optional)
- Simple admin interface for JSON editing
- Image uploads for player photos
- Video embed support (YouTube/Vimeo)
- Social sharing features

### Scalability Considerations
- Current design handles 100-500 players/teams efficiently
- For 1000+ players: Consider backend API (Firebase, Supabase)
- For real-time updates: Consider WebSocket or polling
- For user accounts: Add authentication layer
