# Quick Start Guide

## For Non-Technical Users

If you have Node.js installed, you can run this locally in 2 minutes:

```bash
# 1. Open PowerShell/Terminal in this folder
npm install
npm run fetch
```

Then **open `index.html` in your web browser**.

---

## Deploy to GitHub Pages

1. Sign up at [github.com](https://github.com) (free)
2. Create a new repository called `daily-news-feeds`
3. Upload all these files to that repository
4. Go to **Settings → Pages → Deploy from branch → main/root**
5. Your dashboard is now live at: `https://yourusername.github.io/daily-news-feeds/`

The dashboard will auto-update daily thanks to GitHub Actions (which runs for free).

---

## What This Does

Every day, this system:

1. ✓ Fetches Nigerian security news from Google News
2. ✓ Filters for security-related headlines only
3. ✓ Removes duplicate stories
4. ✓ Organizes by threat type (Banditry, Kidnapping, etc.)
5. ✓ Updates your dashboard

**Result:** A professional 1-page dashboard showing the day's security headlines.

---

## File Structure

```
daily-news-feeds/
├── index.html                      # Your dashboard (open in browser)
├── fetch-news.js                   # News fetching script
├── data.json                        # Generated headlines (updated daily)
├── package.json                     # Dependencies
├── README.md                        # Full documentation
├── QUICKSTART.md                    # This file
└── .github/workflows/
    └── daily-brief.yml              # Auto-update schedule
```

---

## If Something Goes Wrong

**Error: `npm: command not found`**
→ Download and install [Node.js](https://nodejs.org/) (choose LTS version)

**Error: `data.json not found`**
→ Run `npm install` then `npm run fetch`

**Dashboard shows no headlines**
→ Wait 30 seconds and refresh (F5)

---

## Key Limits (By Design)

- Updates once per day (not real-time)
- Shows top 50 headlines only
- Uses public RSS feeds only
- No prediction or analysis
- No historical data storage

This is a briefing tool, not an intelligence system.

---

**Questions?** Read the full README.md for detailed documentation.
