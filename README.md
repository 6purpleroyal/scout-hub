# Scout Hub - Basketball Talent Discovery Platform

A modern basketball scouting platform with detailed player analytics, performance metrics, and team statistics.

## Features

- 🔍 **Advanced Search** - Search for players by name, team, or position
- 👥 **Team Profiles** - View team statistics, rosters, and performance metrics
- 📊 **Player Analytics** - Detailed player stats, vitals, and scouting reports
- 📱 **Mobile Responsive** - Optimized for all devices and screen sizes
- ⚡ **Fast Performance** - Instant search and navigation with in-memory caching

## Live Demo

Visit the live application: [Your Vercel URL will appear here after deployment]

## Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with custom properties
- **Data**: Embedded JavaScript data (no backend required)
- **Hosting**: Vercel (static hosting)

## Project Structure

```
scout-hub/
├── index.html              # Main application page
├── styles/
│   └── main.css           # All styles including responsive design
├── scripts/
│   ├── data.js            # Embedded player and team data
│   ├── data-loader.js     # Data loading and caching
│   ├── search.js          # Search functionality
│   ├── ui.js              # UI rendering and updates
│   ├── utils.js           # Utility functions (debounce, etc.)
│   └── app.js             # Main application controller
├── data/
│   ├── players.json       # Player data (backup)
│   └── teams.json         # Team data (backup)
└── vercel.json            # Vercel deployment configuration
```

## Local Development

1. Clone the repository
2. Open `index.html` in a web browser
3. No build process or dependencies required!

For local development with live reload, you can use any static server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to link your project

### Option 2: Deploy via GitHub

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it as a static site
6. Click "Deploy"

### Option 3: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Drag and drop your project folder
4. Click "Deploy"

## Features Overview

### Search Functionality
- Real-time search across players and teams
- Filters by name, team, position, and city
- Grouped results with category headers
- Debounced input for optimal performance
- Maximum 10 results per category

### Player Profiles
- Comprehensive player statistics
- Physical vitals (height, weight, wingspan, age)
- Performance metrics (PTS, REB, AST, FG%, 3P%, FT%)
- Scouting summaries and bios
- Tabbed interface (Overview, Stats, Video)

### Team Profiles
- Team statistics and records
- Complete roster with player links
- Performance metrics (PPG, OPPG, Defensive Rating)
- Win-loss records and percentages

### Mobile Responsiveness
- Optimized for screens from 320px to 1440px+
- Touch-friendly interface with 44x44px touch targets
- Responsive breakpoints for mobile, tablet, and desktop
- No horizontal scrolling on any device

## Data Management

Player and team data is embedded directly in `scripts/data.js` for optimal performance and to avoid CORS issues. To update data:

1. Edit `scripts/data.js`
2. Update the `PLAYERS_DATA` or `TEAMS_DATA` arrays
3. Redeploy to Vercel (automatic if using GitHub integration)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Search: < 5ms per operation
- Data retrieval: < 0.1ms (in-memory cache)
- Rendering: < 20ms per page
- Total bundle size: ~50KB

## Testing

Comprehensive test suites are included:

- `test-final-comprehensive.html` - 54 automated tests
- `test-mobile-responsiveness.html` - Mobile testing
- `test-performance-large-dataset.html` - Performance benchmarks
- `run-all-tests.html` - Central test runner

Open any test file in a browser to run the tests.

## Requirements Validation

All requirements have been validated:
- ✅ Player search by name, team, position
- ✅ Team statistics and rosters
- ✅ JSON data management (now embedded)
- ✅ Search result filtering and grouping
- ✅ Mobile responsiveness
- ✅ Modern JavaScript practices

## License

This project is for demonstration purposes.

## Contact

For questions or feedback, please contact your development team.

---

**Built with ❤️ for basketball scouts, coaches, and fans**
