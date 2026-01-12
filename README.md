# Nigeria Daily Security Brief

A simple, zero-cost web dashboard that aggregates Nigerian security-related news headlines into a professional executive brief.

## What It Does

- Fetches headlines daily from Google News (Nigeria)
- Filters for security-related topics using keyword matching
- Removes duplicate stories
- Categorizes headlines by threat type (Banditry, Kidnapping, Insurgency, etc.)
- Generates a clean, professional dashboard
- Runs entirely free on GitHub Pages

## Architecture

```
┌─────────────────┐
│   GitHub Pages  │
│   (index.html)  │ ◄── Served for free
└────────┬────────┘
         │ loads
         ▼
┌─────────────────┐
│   data.json     │ ◄── Generated daily by GitHub Actions
│  (static data)  │
└─────────────────┘
         ▲
         │ updated by
┌────────┴────────┐
│  GitHub Actions │ ◄── Runs daily (free tier)
│  (Node.js       │
│   script)       │
└─────────────────┘
```

## Quick Start

### Local Setup (5 minutes)

```bash
# 1. Clone the repository
git clone https://github.com/YOUR-USERNAME/daily-news-feeds.git
cd daily-news-feeds

# 2. Install dependencies
npm install

# 3. Generate the first report
npm run fetch

# 4. View the dashboard
# Open index.html in your browser
# or: python -m http.server 8000
# then visit http://localhost:8000
```

### Files Explained

| File | Purpose |
|------|---------|
| `fetch-news.js` | Fetches RSS feeds, filters, categorizes, generates data.json |
| `index.html` | Executive dashboard (single-page app, no backend needed) |
| `data.json` | Generated daily, contains headlines and metadata |
| `.github/workflows/daily-brief.yml` | GitHub Actions automation (runs daily) |

## How It Works

### 1. Data Collection
Fetches from Google News Nigeria RSS feeds:
- `https://news.google.com/rss/search?q=Nigeria+security` (and variations)

### 2. Filtering
Uses keyword matching to identify security-related stories:
- Banditry, kidnapping, attacks, gunfire
- Military operations, police actions
- Insurgency, terrorism references
- And 30+ related keywords

### 3. Deduplication
Removes near-duplicate headlines using substring matching.

### 4. Categorization
Assigns each headline to a threat category:
- **Banditry** – Armed robbery, rustling
- **Kidnapping** – Abductions, captives, ransoms
- **Insurgency** – Boko Haram, ISWAP, terrorism
- **Military/Security Operations** – Official operations, raids
- **Armed Conflict** – Attacks, gunfire, violence
- **Law Enforcement** – Arrests, police actions

### 5. Dashboard
The `index.html` file displays:
- **Quick Stats** – Total headlines, dominant threat type, breakdown by category
- **Headline Feed** – Cards with title, source, publication time, clickable links
- **Professional UI** – Tailwind CSS, responsive, executive-friendly

## Deployment to GitHub Pages

### Option 1: Automated (Recommended)
GitHub Actions automatically updates `data.json` daily.

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/daily-news-feeds.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository Settings
   - Scroll to "Pages"
   - Select "Deploy from a branch"
   - Choose branch: `main`, folder: `/ (root)`
   - Save

3. **Enable GitHub Actions**
   - Go to "Actions" tab
   - Click "I understand my workflows, go ahead and enable them"
   - The workflow will run daily at 7 AM WAT (6 AM UTC)

4. **Access your dashboard**
   ```
   https://YOUR-USERNAME.github.io/daily-news-feeds/
   ```

### Option 2: Manual Updates
Run locally and push data.json:

```bash
npm run fetch
git add data.json
git commit -m "update daily brief"
git push
```

## Customization

### Change Update Time
Edit `.github/workflows/daily-brief.yml`:
```yaml
- cron: '0 6 * * *'  # Change the time here (crontab format)
```

Examples:
- `'0 6 * * *'` – 6 AM UTC (7 AM WAT)
- `'0 12 * * *'` – 12 PM UTC (1 PM WAT)
- `'30 5 * * *'` – 5:30 AM UTC

### Add/Remove Keywords
Edit `fetch-news.js`, the `SECURITY_KEYWORDS` array.

### Add More RSS Feeds
In `fetch-news.js`, add URLs to `RSS_FEEDS` or `NIGERIAN_OUTLETS`.

### Change Dashboard Style
Edit `index.html` – the Tailwind CSS is inline.

## Data Output Format (data.json)

```json
{
  "timestamp": "2026-01-12T06:30:00.000Z",
  "generatedAt": "12/1/2026, 7:30:00 AM",
  "totalHeadlines": 24,
  "dominantThreat": "Banditry",
  "categoryCounts": {
    "Banditry": 8,
    "Kidnapping": 6,
    "Military/Security Operations": 5,
    "Armed Conflict": 5
  },
  "headlines": [
    {
      "title": "Armed bandits kill 15 in Kaduna attack",
      "link": "https://example.com/article",
      "source": "Premium Times",
      "pubDate": "2026-01-12T05:30:00.000Z",
      "category": "Banditry"
    }
    // ... more headlines
  ]
}
```

## Troubleshooting

### `npm run fetch` fails
- Check internet connection
- Google News feeds may be temporarily blocked in your region
- Try running again in a few minutes (rate limiting)

### Dashboard shows "No security headlines"
- RSS feeds may be slow to update
- Try running `npm run fetch` again
- Check that `data.json` exists

### GitHub Actions workflow not running
- Make sure you've enabled Actions in your repository settings
- Workflows run on GitHub servers (not locally)
- Check the "Actions" tab for workflow status
- Workflows only run if you push code to GitHub

### "Unable to load headlines" on dashboard
- Make sure `data.json` exists in the root directory
- Check browser console for errors (F12)
- Make sure index.html and data.json are in the same directory

## Limitations

This is intentionally simple. By design, it does NOT:

- Perform real-time updates (runs once daily)
- Provide predictive analysis or intelligence
- Track individual incidents over time
- Provide detailed context (links to sources only)
- Require user authentication
- Store user data
- Make claims of accuracy or completeness

It aggregates public news headlines only—for serious intelligence analysis, consult professional intelligence providers.

## Free Tier Guarantee

This system is completely free because:

- ✓ No backend server (uses static files)
- ✓ No database (JSON file only)
- ✓ GitHub Pages hosting (free)
- ✓ GitHub Actions (free tier: 2,000 minutes/month)
- ✓ RSS feeds (no API keys needed)
- ✓ Tailwind CSS (free CDN)

## License

MIT – feel free to use, modify, deploy.

## Support

For issues or suggestions:
1. Check the "Troubleshooting" section above
2. Review the code comments
3. Open an issue on GitHub

---

**Built for busy executives who need 5-minute daily security news briefings without visiting multiple websites.**
