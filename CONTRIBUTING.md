# Contribution Guidelines

Want to improve the Nigeria Daily Security Brief? This guide explains how.

## Before Making Changes

Check if your idea aligns with the core purpose:

✓ **Good ideas:**
- Add more Nigerian news outlets to the RSS feed list
- Improve categorization accuracy
- Enhance the dashboard UI/readability
- Fix bugs in deduplication logic
- Add more security-related keywords
- Write better documentation
- Improve code comments

✗ **Out of scope:**
- Add real-time updates (defeats the "daily" model)
- Build backend services
- Add databases or storage
- Add user accounts/authentication
- Add predictive analytics
- Scrape websites directly
- Add paid APIs or services
- Build interactive maps
- Add social media integration

## How to Contribute

1. **Fork the repository** on GitHub
2. **Create a branch** for your changes
   ```bash
   git checkout -b feature/your-idea
   ```
3. **Make your changes**
4. **Test locally:**
   ```bash
   npm install
   npm run fetch
   ```
   Then open `index.html` to verify
5. **Commit with clear messages**
   ```bash
   git commit -m "feat: add XYZ" # or "fix:" or "docs:"
   ```
6. **Push and create a Pull Request**

## Code Style

- Keep it simple and readable
- Add comments for non-obvious logic
- Use meaningful variable names
- Test before submitting

## Testing

Run these before opening a PR:

```bash
npm run fetch  # Should complete without errors
```

Then visually check:
- `index.html` loads without errors (F12 dev tools)
- `data.json` was generated correctly
- Headlines display properly
- All links are clickable

## Reporting Issues

Found a bug? Open an issue with:
- What happened
- What you expected
- Steps to reproduce
- System info (Windows/Mac/Linux, Node version)

## Questions?

Read README.md or QUICKSTART.md first—your answer might be there.

Thanks for helping! 🙏
