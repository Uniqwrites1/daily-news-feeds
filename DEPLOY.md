# 🚀 Deployment Quick Reference

## For GitHub Pages Deployment

### 1️⃣ Create Repository (2 minutes)
```bash
# Go to github.com/new
# Name: daily-news-feeds
# Public checkbox: ✓ checked
# Create repository
```

### 2️⃣ Push Code (3 minutes)
```bash
cd c:\Dev\node-projects\daily-news-feeds
git init
git add .
git commit -m "Initial commit: Nigeria Daily Security Brief"
git remote add origin https://github.com/YOUR-USERNAME/daily-news-feeds.git
git branch -M main
git push -u origin main
```

### 3️⃣ Enable GitHub Pages (2 minutes)
1. Go to Settings → Pages
2. Source: Branch = `main`, Folder = `/ (root)`
3. Save
4. Wait 2-3 minutes

### 4️⃣ Enable GitHub Actions (1 minute)
1. Go to Actions tab
2. Click "I understand my workflows, go ahead and enable them"
3. Done!

### 5️⃣ Access Dashboard
```
https://YOUR-USERNAME.github.io/daily-news-feeds/
```

---

## System Status Checklist

After deployment, verify:

- [ ] Dashboard URL works and loads
- [ ] "Updated" indicator shows green
- [ ] Quick Insights panel shows numbers
- [ ] Headlines are displayed
- [ ] Click a headline → opens original article
- [ ] No browser console errors (F12)

---

## What Happens Next

**Daily Automation:**
- 7 AM UTC (8 AM WAT) every day
- GitHub Actions triggers automatically
- `npm run fetch` runs
- `data.json` updates
- GitHub Pages refreshes
- Your dashboard shows latest headlines

**No action needed** – it just works!

---

## Accessing Statistics

**To see what the system fetched:**
1. Go to Repository → Actions
2. Click latest workflow run
3. Scroll to "fetch and process news" section
4. See output: "Filtered to X headlines"

---

## One-Command Test

```bash
npm run fetch
```

Should output:
```
Fetched XXX total items
Filtered to XXX security-related headlines
✓ Report generated
✓ Total security headlines: XXX
✓ Dominant threat type: [Category]
```

---

## Emergency: Manual Data Update

If workflow fails, update manually:

```bash
npm run fetch
git add data.json
git commit -m "manual update: [date]"
git push
```

---

## Customization Checklist

Want to customize? Edit these files:

- **Update time:** `.github/workflows/daily-brief.yml` (line with `cron:`)
- **Keywords:** `fetch-news.js` (SECURITY_KEYWORDS array)
- **Colors:** `index.html` (<style> section)
- **Headlines limit:** `fetch-news.js` (`.slice(0, 50)`)

Then push to GitHub: `git push`

---

## Success Indicators

✅ System is live when:
- Dashboard URL is accessible
- Headline cards display
- Data updates daily
- No errors in browser console
- All links are clickable

---

**Total setup time: ~15 minutes**
**Ongoing maintenance: 0 hours/week (fully automated)**
