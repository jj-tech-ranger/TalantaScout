#!/bin/bash
# TalantaScout Code Consolidation Script
# This script consolidates duplicate files per the development guide

echo "========================================"
echo "TalantaScout Code Consolidation Script"
echo "========================================"
echo ""

# Step 1: Create proper folder structure
echo "[1/7] Creating proper folder structure..."
mkdir -p assets/css assets/js assets/images
mkdir -p player scout coach admin

# Step 2: Copy gold tier HTML files as base (most complete)
echo "[2/7] Consolidating Player HTML files..."
cp templates/player/gold/*.html player/

echo "[3/7] Consolidating Scout HTML files..."
cp templates/scout/gold/*.html scout/ 2>/dev/null || cp templates/scout/platinum/*.html scout/ 2>/dev/null || echo "Scout gold/platinum not found"

echo "[4/7] Consolidating Coach HTML files..."
cp templates/coach/gold/*.html coach/ 2>/dev/null || cp templates/coach/platinum/*.html coach/ 2>/dev/null || echo "Coach gold/platinum not found"

echo "[5/7] Consolidating Admin HTML files..."
cp templates/admin/*.html admin/ 2>/dev/null || echo "Admin files not found"

# Step 3: Move assets
echo "[6/7] Moving assets to proper locations..."
mv css/* assets/css/ 2>/dev/null
mv js/* assets/js/ 2>/dev/null
mv img/* assets/images/ 2>/dev/null

# Step 4: Update file paths in HTML files
echo "[7/7] Updating file paths in HTML files..."
find player scout coach admin -name "*.html" -type f -exec sed -i.bak 's|href="../../../css/|href="/assets/css/|g' {} \;
find player scout coach admin -name "*.html" -type f -exec sed -i.bak 's|src="../../../js/|src="/assets/js/|g' {} \;
find player scout coach admin -name "*.html" -type f -exec sed -i.bak 's|src="../../../img/|src="/assets/images/|g' {} \;
find player scout coach admin -name "*.html" -type f -exec sed -i.bak 's|href="\.\./\.\./\.\./img/|href="/assets/images/|g' {} \;

# Remove backup files
find player scout coach admin -name "*.bak" -type f -delete

echo ""
echo "========================================"
echo "Consolidation Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Review the consolidated files in player/, scout/, coach/, admin/"
echo "2. Delete old duplicate folders: rm -rf templates/ css/ js/ img/"
echo "3. Consolidate CSS files (see consolidate_css.sh)"
echo "4. Consolidate JS files (see consolidate_js.sh)"
echo "5. Add dynamic package detection in JavaScript"
echo ""
echo "IMPORTANT: Test thoroughly before deleting old files!"
