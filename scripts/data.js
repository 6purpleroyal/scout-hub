/**
 * Embedded data for Scout Hub
 * This file contains all player and team data directly in JavaScript
 * to avoid CORS issues when loading from local files
 */

const PLAYERS_DATA = [
  {
    "id": "1",
    "name": "Paul George",
    "team": "LA Clippers",
    "teamId": "1",
    "position": "Small Forward",
    "height": "6'8\" (2.03m)",
    "weight": "220 lbs (100 kg)",
    "age": 33,
    "wingspan": "7'2\" (2.18m)",
    "stats": {
      "pts": 35.0,
      "reb": 6.5,
      "ast": 3.5,
      "fg_pct": 47.5,
      "three_pct": 38.2,
      "ft_pct": 87.3,
      "stl": 1.6,
      "blk": 0.4,
      "tov": 2.5
    },
    "color": "#667eea",
    "initials": "PG",
    "bio": "A versatile two-way wing with elite scoring and defensive instincts. Known for a smooth handle and clutch performance."
  },
  {
    "id": "2",
    "name": "LeBron James",
    "team": "Los Angeles Lakers",
    "teamId": "2",
    "position": "Small Forward",
    "height": "6'9\" (2.06m)",
    "weight": "250 lbs (113 kg)",
    "age": 39,
    "wingspan": "7'0\" (2.13m)",
    "stats": {
      "pts": 28.4,
      "reb": 8.2,
      "ast": 6.8,
      "fg_pct": 52.1,
      "three_pct": 35.8,
      "ft_pct": 75.2,
      "stl": 1.3,
      "blk": 0.6,
      "tov": 3.1
    },
    "color": "#e53e3e",
    "initials": "LJ",
    "bio": "One of the greatest players of all time with exceptional basketball IQ and versatility. A dominant force on both ends of the court."
  },
  {
    "id": "3",
    "name": "Stephen Curry",
    "team": "Golden State Warriors",
    "teamId": "3",
    "position": "Point Guard",
    "height": "6'2\" (1.88m)",
    "weight": "185 lbs (84 kg)",
    "age": 35,
    "wingspan": "6'4\" (1.93m)",
    "stats": {
      "pts": 32.1,
      "reb": 5.2,
      "ast": 6.1,
      "fg_pct": 48.3,
      "three_pct": 42.7,
      "ft_pct": 91.5,
      "stl": 1.2,
      "blk": 0.3,
      "tov": 2.8
    },
    "color": "#f6e05e",
    "initials": "SC",
    "bio": "Revolutionary shooter who changed the game with his deep three-point range and exceptional ball handling."
  },
  {
    "id": "4",
    "name": "Giannis Antetokounmpo",
    "team": "Milwaukee Bucks",
    "teamId": "4",
    "position": "Power Forward",
    "height": "6'11\" (2.11m)",
    "weight": "243 lbs (110 kg)",
    "age": 29,
    "wingspan": "7'3\" (2.21m)",
    "stats": {
      "pts": 31.5,
      "reb": 11.8,
      "ast": 5.7,
      "fg_pct": 55.3,
      "three_pct": 27.5,
      "ft_pct": 64.5,
      "stl": 1.2,
      "blk": 1.5,
      "tov": 3.4
    },
    "color": "#68d391",
    "initials": "GA",
    "bio": "The Greek Freak combines elite athleticism with improving skills. A two-time MVP and dominant paint presence."
  },
  {
    "id": "5",
    "name": "Kevin Durant",
    "team": "Phoenix Suns",
    "teamId": "5",
    "position": "Power Forward",
    "height": "6'10\" (2.08m)",
    "weight": "240 lbs (109 kg)",
    "age": 35,
    "wingspan": "7'5\" (2.26m)",
    "stats": {
      "pts": 29.1,
      "reb": 6.7,
      "ast": 5.0,
      "fg_pct": 52.3,
      "three_pct": 38.6,
      "ft_pct": 91.9,
      "stl": 0.9,
      "blk": 1.2,
      "tov": 3.3
    },
    "color": "#9f7aea",
    "initials": "KD",
    "bio": "One of the most skilled scorers in NBA history with an unguardable shooting stroke and elite length."
  },
  {
    "id": "6",
    "name": "Luka Doncic",
    "team": "Dallas Mavericks",
    "teamId": "6",
    "position": "Point Guard",
    "height": "6'7\" (2.01m)",
    "weight": "230 lbs (104 kg)",
    "age": 24,
    "wingspan": "7'2\" (2.18m)",
    "stats": {
      "pts": 33.9,
      "reb": 9.2,
      "ast": 9.8,
      "fg_pct": 48.7,
      "three_pct": 38.2,
      "ft_pct": 78.6,
      "stl": 1.4,
      "blk": 0.5,
      "tov": 4.0
    },
    "color": "#4299e1",
    "initials": "LD",
    "bio": "Young superstar with exceptional court vision and scoring ability. A triple-double threat every night."
  },
  {
    "id": "7",
    "name": "Joel Embiid",
    "team": "Philadelphia 76ers",
    "teamId": "7",
    "position": "Center",
    "height": "7'0\" (2.13m)",
    "weight": "280 lbs (127 kg)",
    "age": 29,
    "wingspan": "7'5\" (2.26m)",
    "stats": {
      "pts": 34.7,
      "reb": 11.0,
      "ast": 5.6,
      "fg_pct": 54.8,
      "three_pct": 35.0,
      "ft_pct": 88.3,
      "stl": 1.0,
      "blk": 1.7,
      "tov": 3.4
    },
    "color": "#ed64a6",
    "initials": "JE",
    "bio": "Dominant two-way center with elite post moves and surprising perimeter skills. MVP-caliber player."
  },
  {
    "id": "8",
    "name": "Jayson Tatum",
    "team": "Boston Celtics",
    "teamId": "8",
    "position": "Small Forward",
    "height": "6'8\" (2.03m)",
    "weight": "210 lbs (95 kg)",
    "age": 25,
    "wingspan": "6'11\" (2.11m)",
    "stats": {
      "pts": 27.0,
      "reb": 8.4,
      "ast": 4.9,
      "fg_pct": 46.6,
      "three_pct": 37.6,
      "ft_pct": 85.4,
      "stl": 1.1,
      "blk": 0.7,
      "tov": 2.5
    },
    "color": "#48bb78",
    "initials": "JT",
    "bio": "Rising star with a complete offensive game. Excellent scorer and improving playmaker."
  },
  {
    "id": "9",
    "name": "Nikola Jokic",
    "team": "Denver Nuggets",
    "teamId": "9",
    "position": "Center",
    "height": "6'11\" (2.11m)",
    "weight": "284 lbs (129 kg)",
    "age": 28,
    "wingspan": "7'3\" (2.21m)",
    "stats": {
      "pts": 26.4,
      "reb": 12.4,
      "ast": 9.0,
      "fg_pct": 58.3,
      "three_pct": 35.9,
      "ft_pct": 82.2,
      "stl": 1.3,
      "blk": 0.7,
      "tov": 3.0
    },
    "color": "#f6ad55",
    "initials": "NJ",
    "bio": "Three-time MVP with exceptional passing and basketball IQ. The most skilled passing big man in NBA history."
  },
  {
    "id": "10",
    "name": "Damian Lillard",
    "team": "Milwaukee Bucks",
    "teamId": "4",
    "position": "Point Guard",
    "height": "6'2\" (1.88m)",
    "weight": "195 lbs (88 kg)",
    "age": 33,
    "wingspan": "6'8\" (2.03m)",
    "stats": {
      "pts": 25.7,
      "reb": 4.3,
      "ast": 7.2,
      "fg_pct": 42.1,
      "three_pct": 37.1,
      "ft_pct": 91.6,
      "stl": 0.9,
      "blk": 0.3,
      "tov": 2.6
    },
    "color": "#fc8181",
    "initials": "DL",
    "bio": "Clutch performer with deep range and excellent leadership. Known for hitting big shots in crucial moments."
  },
  {
    "id": "11",
    "name": "Anthony Davis",
    "team": "Los Angeles Lakers",
    "teamId": "2",
    "position": "Center",
    "height": "6'10\" (2.08m)",
    "weight": "253 lbs (115 kg)",
    "age": 30,
    "wingspan": "7'6\" (2.29m)",
    "stats": {
      "pts": 24.7,
      "reb": 12.6,
      "ast": 3.5,
      "fg_pct": 55.6,
      "three_pct": 27.1,
      "ft_pct": 81.6,
      "stl": 1.2,
      "blk": 2.3,
      "tov": 2.0
    },
    "color": "#fbb6ce",
    "initials": "AD",
    "bio": "Elite defensive anchor with versatile offensive skills. One of the best shot blockers in the league."
  },
  {
    "id": "12",
    "name": "Kawhi Leonard",
    "team": "LA Clippers",
    "teamId": "1",
    "position": "Small Forward",
    "height": "6'7\" (2.01m)",
    "weight": "225 lbs (102 kg)",
    "age": 32,
    "wingspan": "7'3\" (2.21m)",
    "stats": {
      "pts": 23.7,
      "reb": 6.1,
      "ast": 3.6,
      "fg_pct": 52.5,
      "three_pct": 41.7,
      "ft_pct": 88.5,
      "stl": 1.6,
      "blk": 0.5,
      "tov": 1.6
    },
    "color": "#a0aec0",
    "initials": "KL",
    "bio": "Two-way superstar with elite defense and efficient scoring. Known for his massive hands and clutch performances."
  },
  {
    "id": "13",
    "name": "Devin Booker",
    "team": "Phoenix Suns",
    "teamId": "5",
    "position": "Shooting Guard",
    "height": "6'5\" (1.96m)",
    "weight": "206 lbs (93 kg)",
    "age": 27,
    "wingspan": "6'8\" (2.03m)",
    "stats": {
      "pts": 27.1,
      "reb": 4.5,
      "ast": 6.9,
      "fg_pct": 49.2,
      "three_pct": 36.4,
      "ft_pct": 88.6,
      "stl": 0.9,
      "blk": 0.4,
      "tov": 2.7
    },
    "color": "#e9d8a6",
    "initials": "DB",
    "bio": "Pure scorer with smooth shooting stroke and improving playmaking. Can take over games with his offensive arsenal."
  },
  {
    "id": "14",
    "name": "Kyrie Irving",
    "team": "Dallas Mavericks",
    "teamId": "6",
    "position": "Point Guard",
    "height": "6'2\" (1.88m)",
    "weight": "195 lbs (88 kg)",
    "age": 31,
    "wingspan": "6'4\" (1.93m)",
    "stats": {
      "pts": 25.6,
      "reb": 5.0,
      "ast": 5.2,
      "fg_pct": 49.7,
      "three_pct": 41.1,
      "ft_pct": 90.5,
      "stl": 1.3,
      "blk": 0.5,
      "tov": 2.1
    },
    "color": "#bee3f8",
    "initials": "KI",
    "bio": "Exceptional ball handler with elite finishing ability. One of the most skilled players in the league."
  },
  {
    "id": "15",
    "name": "Jaylen Brown",
    "team": "Boston Celtics",
    "teamId": "8",
    "position": "Shooting Guard",
    "height": "6'6\" (1.98m)",
    "weight": "223 lbs (101 kg)",
    "age": 27,
    "wingspan": "6'11\" (2.11m)",
    "stats": {
      "pts": 23.0,
      "reb": 5.5,
      "ast": 3.6,
      "fg_pct": 49.9,
      "three_pct": 35.4,
      "ft_pct": 70.3,
      "stl": 1.2,
      "blk": 0.5,
      "tov": 2.8
    },
    "color": "#c6f6d5",
    "initials": "JB",
    "bio": "Athletic wing with improving all-around game. Strong defender and explosive finisher at the rim."
  },
  {
    "id": "16",
    "name": "Jamal Murray",
    "team": "Denver Nuggets",
    "teamId": "9",
    "position": "Point Guard",
    "height": "6'4\" (1.93m)",
    "weight": "215 lbs (98 kg)",
    "age": 26,
    "wingspan": "6'7\" (2.01m)",
    "stats": {
      "pts": 21.2,
      "reb": 4.0,
      "ast": 6.5,
      "fg_pct": 45.6,
      "three_pct": 40.1,
      "ft_pct": 83.5,
      "stl": 1.0,
      "blk": 0.3,
      "tov": 2.3
    },
    "color": "#fed7d7",
    "initials": "JM",
    "bio": "Dynamic scorer with clutch gene. Perfect backcourt partner with excellent shooting and playmaking."
  },
  {
    "id": "17",
    "name": "Tyrese Maxey",
    "team": "Philadelphia 76ers",
    "teamId": "7",
    "position": "Point Guard",
    "height": "6'2\" (1.88m)",
    "weight": "200 lbs (91 kg)",
    "age": 23,
    "wingspan": "6'7\" (2.01m)",
    "stats": {
      "pts": 25.9,
      "reb": 3.7,
      "ast": 6.2,
      "fg_pct": 45.0,
      "three_pct": 37.3,
      "ft_pct": 86.8,
      "stl": 1.0,
      "blk": 0.4,
      "tov": 2.0
    },
    "color": "#e9d8fd",
    "initials": "TM",
    "bio": "Emerging star with blazing speed and improving shooting. High-energy player who impacts both ends."
  },
  {
    "id": "18",
    "name": "Klay Thompson",
    "team": "Golden State Warriors",
    "teamId": "3",
    "position": "Shooting Guard",
    "height": "6'6\" (1.98m)",
    "weight": "215 lbs (98 kg)",
    "age": 33,
    "wingspan": "6'9\" (2.06m)",
    "stats": {
      "pts": 17.9,
      "reb": 3.3,
      "ast": 2.3,
      "fg_pct": 43.2,
      "three_pct": 38.7,
      "ft_pct": 92.7,
      "stl": 0.6,
      "blk": 0.5,
      "tov": 1.6
    },
    "color": "#fefcbf",
    "initials": "KT",
    "bio": "Elite three-point shooter and strong perimeter defender. Part of the greatest shooting backcourt in NBA history."
  }
];

const TEAMS_DATA = [
  {
    "id": "1",
    "name": "Clippers",
    "city": "Los Angeles",
    "conference": "Western",
    "division": "Pacific",
    "stats": {
      "wins": 44,
      "losses": 28,
      "ppg": 115.6,
      "oppg": 111.2,
      "def_rating": 112.5
    },
    "roster": ["1", "12"],
    "color": "#C8102E",
    "logo": "LAC"
  },
  {
    "id": "2",
    "name": "Lakers",
    "city": "Los Angeles",
    "conference": "Western",
    "division": "Pacific",
    "stats": {
      "wins": 47,
      "losses": 35,
      "ppg": 117.3,
      "oppg": 115.8,
      "def_rating": 115.2
    },
    "roster": ["2", "11"],
    "color": "#552583",
    "logo": "LAL"
  },
  {
    "id": "3",
    "name": "Warriors",
    "city": "Golden State",
    "conference": "Western",
    "division": "Pacific",
    "stats": {
      "wins": 46,
      "losses": 36,
      "ppg": 118.0,
      "oppg": 116.3,
      "def_rating": 114.8
    },
    "roster": ["3", "18"],
    "color": "#1D428A",
    "logo": "GSW"
  },
  {
    "id": "4",
    "name": "Bucks",
    "city": "Milwaukee",
    "conference": "Eastern",
    "division": "Central",
    "stats": {
      "wins": 49,
      "losses": 33,
      "ppg": 119.1,
      "oppg": 114.5,
      "def_rating": 113.2
    },
    "roster": ["4", "10"],
    "color": "#00471B",
    "logo": "MIL"
  },
  {
    "id": "5",
    "name": "Suns",
    "city": "Phoenix",
    "conference": "Western",
    "division": "Pacific",
    "stats": {
      "wins": 49,
      "losses": 33,
      "ppg": 116.2,
      "oppg": 113.5,
      "def_rating": 112.8
    },
    "roster": ["5", "13"],
    "color": "#1D1160",
    "logo": "PHX"
  },
  {
    "id": "6",
    "name": "Mavericks",
    "city": "Dallas",
    "conference": "Western",
    "division": "Southwest",
    "stats": {
      "wins": 50,
      "losses": 32,
      "ppg": 117.9,
      "oppg": 114.6,
      "def_rating": 113.5
    },
    "roster": ["6", "14"],
    "color": "#00538C",
    "logo": "DAL"
  },
  {
    "id": "7",
    "name": "76ers",
    "city": "Philadelphia",
    "conference": "Eastern",
    "division": "Atlantic",
    "stats": {
      "wins": 47,
      "losses": 35,
      "ppg": 114.6,
      "oppg": 111.8,
      "def_rating": 111.2
    },
    "roster": ["7", "17"],
    "color": "#006BB6",
    "logo": "PHI"
  },
  {
    "id": "8",
    "name": "Celtics",
    "city": "Boston",
    "conference": "Eastern",
    "division": "Atlantic",
    "stats": {
      "wins": 64,
      "losses": 18,
      "ppg": 120.6,
      "oppg": 110.6,
      "def_rating": 110.6
    },
    "roster": ["8", "15"],
    "color": "#007A33",
    "logo": "BOS"
  },
  {
    "id": "9",
    "name": "Nuggets",
    "city": "Denver",
    "conference": "Western",
    "division": "Northwest",
    "stats": {
      "wins": 57,
      "losses": 25,
      "ppg": 114.9,
      "oppg": 110.9,
      "def_rating": 111.5
    },
    "roster": ["9", "16"],
    "color": "#0E2240",
    "logo": "DEN"
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PLAYERS_DATA, TEAMS_DATA };
}
