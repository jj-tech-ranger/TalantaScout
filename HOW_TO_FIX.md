# HOW TO FIX THE DUPLICATION ISSUES - QUICK START

## RUN THIS NOW:

```bash
# Clone the repo
git clone https://github.com/jj-tech-ranger/TalantaScout.git
cd TalantaScout

# Make script executable and run
chmod +x scripts/consolidate_duplicates.sh
./scripts/consolidate_duplicates.sh

# Commit the changes
git add -A
git commit -m "fix: Consolidate all duplicate files per development guide"
git push origin main
```

## What this does:
1. ✅ Creates proper folder structure (`assets/`, `player/`, `scout/`, `coach/`, `admin/`)
2. ✅ Copies gold tier files as base (most complete features)
3. ✅ Moves all CSS/JS/images to `assets/` folder
4. ✅ Fixes all file paths automatically
5. ✅ Ready for testing

## After running:
- Test the application
- Then delete old folders: `rm -rf templates/ css/ js/ img/`
- See CRITICAL_FIXES_REQUIRED.md for next steps on CSS/JS consolidation

**Time to fix: 5 minutes**
**Files reduced: From 170+ to ~30 files**
