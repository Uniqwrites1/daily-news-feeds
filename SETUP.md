# Nigeria Daily Security Brief - Complete Setup Guide

## System Overview

**What You're Building:**
A professional, zero-cost web dashboard that automatically aggregates Nigerian security news headlines daily.

**Technology Stack:**
- **Data Source:** Google News RSS feeds (free, no API key)
- **Processing:** Node.js script (runs locally or via GitHub Actions)
- **Storage:** Single JSON file
- **Hosting:** GitHub Pages (free, forever)
- **UI:** HTML + Tailwind CSS (no backend)
- **Total Cost:** $0

---

## Architecture Diagram

```
┌────────────────────────────────────────────────────────────┐
│                     YOUR WORKFLOW                          │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Every Day (7 AM West African Time):                      │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ GitHub Actions Trigger                              │  │
│  │ (Runs for free, 2000 mins/month included)          │  │
│  └───────────────────┬─────────────────────────────────┘  │
│                      │                                     │
│                      ▼                                     │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Node.js Script (fetch-news.js)                      │  │
│  │ ├─ Fetch Google News RSS feeds                      │  │
│  │ ├─ Filter by security keywords                      │  │
│  │ ├─ Remove duplicates                                │  │
│  │ ├─ Categorize headlines                             │  │
│  │ └─ Generate data.json                               │  │
│  └───────────────────┬─────────────────────────────────┘  │
│                      │                                     │
│                      ▼                                     │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ GitHub Commit (auto-push data.json)                 │  │
│  └───────────────────┬─────────────────────────────────┘  │
│                      │                                     │
│                      ▼                                     │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ GitHub Pages Deploys                                │  │
│  │ └─ Serves index.html and data.json                  │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  Executive Views Dashboard:                               │
│  https://username.github.io/daily-news-feeds/             │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## Step-by-Step Setup

### Phase 1: Local Development (5 minutes)

#### 1a. Install Node.js
- Visit [nodejs.org](https://nodejs.org)
- Download LTS version (recommended for stability)
- Install with defaults
- Verify: Open PowerShell and run `node --version`

#### 1b. Get the Code
```bash
# Option A: Clone from GitHub (if already there)
git clone https://github.com/YOUR-USERNAME/daily-news-feeds.git
cd daily-news-feeds

# Option B: Use the folder you already have
cd c:\Dev\node-projects\daily-news-feeds
```

#### 1c. Install Dependencies
```bash
npm install
```

This downloads `rss-parser` (the only library we need).

#### 1d. Generate Your First Report
```bash
npm run fetch
```

**What happens:**
- Fetches latest Nigerian security news
- Filters for keywords (banditry, kidnapping, attacks, etc.)
- Removes duplicates
- Generates `data.json` with ~150 headlines
- Takes ~30 seconds

**Expected output:**
```
Fetched 304 total items
Filtered to 154 security-related headlines
✓ Report generated: data.json
✓ Total security headlines: 154
✓ Dominant threat type: Security News
```

#### 1e. View Your Dashboard
```bash
# Option A: Direct open
# Double-click index.html in Explorer

# Option B: Local web server (better)
python -m http.server 8000
# Then open: http://localhost:8000
```

**What you see:**
- Professional dashboard with executive summary
- Total headlines, dominant threat type
- Categorized breakdown
- Clickable headline cards with sources
- Responsive design for desktop and mobile

---

### Phase 2: Deploy to GitHub Pages (10 minutes)

#### 2a. Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Name: `daily-news-feeds`
3. Description: "Daily Nigerian security news aggregation"
4. Public (so it can be viewed)
5. Create repository

#### 2b. Push Code to GitHub
```bash
cd c:\Dev\node-projects\daily-news-feeds

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Nigeria Daily Security Brief"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/daily-news-feeds.git
git branch -M main
git push -u origin main
```

*Replace `YOUR-USERNAME` with your actual GitHub username.*

#### 2c. Enable GitHub Pages
1. Go to your repo on GitHub
2. Click **Settings** (top right)
3. Scroll down to **Pages** (left sidebar)
4. Under "Source":
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 2-3 minutes for GitHub to build

**Your dashboard is now live at:**
```
https://YOUR-USERNAME.github.io/daily-news-feeds/
```

---

### Phase 3: Set Up Daily Automation (5 minutes)

#### 3a. Enable GitHub Actions
1. In your repo, click **Actions** tab (top menu)
2. Click **"I understand my workflows, go ahead and enable them"**
3. That's it—automation is now active

#### 3b. Verify the Workflow
1. Stay on the **Actions** tab
2. You should see a workflow called "Daily Security Brief Update"
3. The first run will happen at the next scheduled time (7 AM UTC = 8 AM WAT by default)
4. Or click **Run workflow** to test immediately

#### 3c. Check Recent Updates
1. Go to your repo's main page
2. Scroll down to see recent commits
3. Look for commits from "Daily Brief Bot" (the automated bot)
4. Each commit means `data.json` was updated

---

## How to Use the Dashboard

### For Executives
1. **Daily Routine:** Check dashboard every morning
2. **Time Required:** 2-5 minutes to scan headlines
3. **Action Items:** Click through to original sources for details
4. **Sharing:** Share the URL with your team
5. **Bookmark:** Add to browser bookmarks for quick access

### Key Dashboard Elements

| Element | Purpose |
|---------|---------|
| **Total Headlines** | How many security stories today |
| **Dominant Threat** | Primary threat type (Banditry, Kidnapping, etc.) |
| **Threat Breakdown** | Number of headlines per category |
| **Headline Cards** | Sorted by newest first, clickable links to sources |
| **Updated Indicator** | Green dot showing when last refreshed |

---

## Customization Guide

### Change the Update Time
Edit `.github/workflows/daily-brief.yml`:

```yaml
- cron: '0 6 * * *'  # Current: 6 AM UTC (7 AM WAT)
```

**Common times:**
- `'0 7 * * *'` – 7 AM UTC (8 AM WAT)
- `'0 8 * * *'` – 8 AM UTC (9 AM WAT)
- `'30 5 * * *'` – 5:30 AM UTC
- `'0 12 * * *'` – 12 PM UTC (1 PM WAT)
- `'0 17 * * *'` – 5 PM UTC (6 PM WAT)

[Full cron syntax reference](https://crontab.guru)

### Add More Security Keywords
Edit `fetch-news.js`:

```javascript
const SECURITY_KEYWORDS = [
  'banditry', 'kidnapping', 'attack', // ... existing ...
  'YOUR_NEW_KEYWORD', // Add here
];
```

### Add More News Sources
Edit `fetch-news.js`:

```javascript
const NIGERIAN_OUTLETS = [
  'https://www.pulse.ng/feed',
  'https://your-news-outlet.com/feed', // Add here
];
```

### Change Dashboard Colors
Edit `index.html`, the `<style>` section:

```html
<style>
  .stat-box {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    /* Change to different hex colors */
  }
</style>
```

### Limit Headlines Shown
Edit `fetch-news.js`:

```javascript
.slice(0, 50) // Change 50 to your preferred number
```

---

## File Reference

| File | Purpose | Edit For |
|------|---------|----------|
| `fetch-news.js` | Core news fetching logic | Keywords, sources, categorization |
| `index.html` | Dashboard UI | Colors, layout, dashboard text |
| `.github/workflows/daily-brief.yml` | Automation schedule | Update time, frequency |
| `package.json` | Dependencies & scripts | Dependencies (rarely needed) |
| `data.json` | Generated headlines | ❌ Don't edit—auto-generated |
| `README.md` | Main documentation | Project description |
| `QUICKSTART.md` | Quick reference | Quick setup instructions |

---

## Troubleshooting

### Local Testing

**Problem:** `npm run fetch` fails with connection errors
```
Error fetching https://...: connect ETIMEDOUT
```
**Solution:**
- Check internet connection
- Try again in a few minutes (rate limiting)
- Some networks block Google News—try a different connection

**Problem:** `npm: command not found`
**Solution:**
- Install Node.js from nodejs.org
- Restart PowerShell after installation

**Problem:** `Cannot find module 'rss-parser'`
**Solution:**
```bash
npm install
```

**Problem:** `index.html` shows "No security headlines"
**Solution:**
1. Run `npm run fetch` again
2. Refresh the browser (Ctrl+R)
3. Check browser console (F12) for errors

---

### GitHub Deployment

**Problem:** GitHub Pages not showing updated content
**Solution:**
1. Wait 2-3 minutes for GitHub to rebuild
2. Hard refresh (Ctrl+Shift+R) to clear cache
3. Check GitHub **Actions** tab for errors

**Problem:** Workflow not running
**Solution:**
1. Check **Actions** tab—is workflow enabled?
2. Confirm the workflow file is in `.github/workflows/daily-brief.yml`
3. Try **Run workflow** button to test manually

**Problem:** Workflow runs but data.json doesn't update
**Solution:**
1. Check workflow run logs in **Actions** tab
2. Look for error messages
3. Verify GitHub Actions has write permissions (Settings → Actions → General)

**Problem:** "No security headlines found"
**Solution:**
- Google News feeds may be temporarily unavailable
- Wait 30 minutes and trigger workflow again
- Check if RSS feeds are accessible locally: `npm run fetch`

---

## Monitoring & Maintenance

### Weekly Checklist
- [ ] Dashboard loads without errors
- [ ] Headlines are updating daily
- [ ] Categorization seems accurate
- [ ] No broken links in headlines

### Monthly Checklist
- [ ] Review top threat categories
- [ ] Check if any keywords need adding
- [ ] Verify GitHub Actions is still enabled
- [ ] Update README if you've customized anything

### When to Intervene
- **Headline quality drops:** Add/remove keywords in `fetch-news.js`
- **Too many duplicates:** Improve deduplication logic
- **Wrong categories:** Adjust `THREAT_CATEGORIES` mappings
- **Missing news outlets:** Add RSS feeds to `NIGERIAN_OUTLETS`

---

## FAQ

**Q: How much does this cost?**
A: $0. GitHub Pages and GitHub Actions are included free. RSS feeds are free.

**Q: How often does it update?**
A: Once daily (default 7 AM WAT). Can be changed in the workflow file.

**Q: Is it real-time?**
A: No. By design, it's a daily briefing, not real-time surveillance.

**Q: Can I share this with my team?**
A: Yes. Just give them the URL. They don't need GitHub accounts.

**Q: What if a news feed goes down?**
A: The system will skip that feed and use others. Script is error-tolerant.

**Q: Can I add my own news feed?**
A: Yes. Edit `NIGERIAN_OUTLETS` in `fetch-news.js` and add the RSS URL.

**Q: Is this an intelligence system?**
A: No. It's a news aggregation tool. It doesn't predict or analyze—just filters and displays headlines.

**Q: Can I run this locally instead of GitHub?**
A: Yes. Just run `npm run fetch` manually whenever you want to update.

**Q: What about duplicates and false positives?**
A: The system removes near-duplicates and filters aggressively. Some false positives are normal (imperfect keyword matching).

**Q: Can I edit the categorization?**
A: Yes. Modify `THREAT_CATEGORIES` in `fetch-news.js`.

---

## Success Indicators

Your setup is complete when:

✓ `npm run fetch` completes without errors
✓ `index.html` shows headlines in your browser
✓ GitHub Pages URL is accessible
✓ Workflow runs daily (or manually triggered)
✓ `data.json` updates automatically
✓ Dashboard shows latest headlines
✓ All links are clickable
✓ UI looks professional

---

## Support Resources

1. **GitHub Issues:** Open an issue in your repository for bugs
2. **README.md:** Full technical documentation
3. **QUICKSTART.md:** Quick reference for common tasks
4. **Code Comments:** Scripts are heavily commented
5. **Cron Reference:** https://crontab.guru (for scheduling)

---

## Next Steps

1. ✅ **Done:** You have a working dashboard
2. ✅ **Done:** It's deployed on GitHub Pages
3. ✅ **Done:** It updates daily automatically
4. **Optional:** Customize colors, keywords, or schedule
5. **Optional:** Share with your organization
6. **Optional:** Monitor trends over time

---

## One-Page Summary

**What:** Daily Nigerian security news dashboard
**How:** RSS feeds → Node.js processing → Static HTML
**Cost:** $0 (GitHub Pages + GitHub Actions free tier)
**Update:** Automatic daily at 7 AM WAT (configurable)
**View:** https://username.github.io/daily-news-feeds/
**Maintain:** Update keywords in code as needed

---

**Built for busy executives who need security news in 5 minutes, not hours.**
