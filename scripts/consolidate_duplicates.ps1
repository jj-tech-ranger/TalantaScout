# TalantaScout Code Consolidation - Windows PowerShell Script
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "TalantaScout Code Consolidation Script" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Create proper folder structure
Write-Host "[1/7] Creating proper folder structure..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "assets/css" | Out-Null
New-Item -ItemType Directory -Force -Path "assets/js" | Out-Null
New-Item -ItemType Directory -Force -Path "assets/images" | Out-Null
New-Item -ItemType Directory -Force -Path "player" | Out-Null
New-Item -ItemType Directory -Force -Path "scout" | Out-Null
New-Item -ItemType Directory -Force -Path "coach" | Out-Null
New-Item -ItemType Directory -Force -Path "admin" | Out-Null

# Step 2: Copy player gold tier HTML files
Write-Host "[2/7] Consolidating Player HTML files..." -ForegroundColor Yellow
if (Test-Path "templates/player/gold") {
    Copy-Item -Path "templates/player/gold/*" -Destination "player/" -Force
}

# Step 3: Copy scout files
Write-Host "[3/7] Consolidating Scout HTML files..." -ForegroundColor Yellow
if (Test-Path "templates/scout/gold") {
    Copy-Item -Path "templates/scout/gold/*" -Destination "scout/" -Force
} elseif (Test-Path "templates/scout/platinum") {
    Copy-Item -Path "templates/scout/platinum/*" -Destination "scout/" -Force
}

# Step 4: Copy coach files
Write-Host "[4/7] Consolidating Coach HTML files..." -ForegroundColor Yellow
if (Test-Path "templates/coach/gold") {
    Copy-Item -Path "templates/coach/gold/*" -Destination "coach/" -Force
} elseif (Test-Path "templates/coach/platinum") {
    Copy-Item -Path "templates/coach/platinum/*" -Destination "coach/" -Force
}

# Step 5: Copy admin files
Write-Host "[5/7] Consolidating Admin HTML files..." -ForegroundColor Yellow
if (Test-Path "templates/admin") {
    Copy-Item -Path "templates/admin/*" -Destination "admin/" -Force -Recurse
}

# Step 6: Move assets
Write-Host "[6/7] Moving assets to proper locations..." -ForegroundColor Yellow
if (Test-Path "css") { Copy-Item -Path "css/*" -Destination "assets/css/" -Force }
if (Test-Path "js") { Copy-Item -Path "js/*" -Destination "assets/js/" -Force }
if (Test-Path "img") { Copy-Item -Path "img/*" -Destination "assets/images/" -Force }

# Step 7: Fix file paths
Write-Host "[7/7] Updating file paths in HTML files..." -ForegroundColor Yellow
$folders = @("player", "scout", "coach", "admin")
foreach ($folder in $folders) {
    if (Test-Path $folder) {
        Get-ChildItem -Path $folder -Filter *.html -Recurse | ForEach-Object {
            $content = Get-Content $_.FullName -Raw
            $content = $content -replace 'href="\.\./\.\./\.\./'css/', 'href="/assets/css/'
            $content = $content -replace 'src="\.\./\.\./\.\./'js/', 'src="/assets/js/'
            $content = $content -replace 'src="\.\./\.\./\.\./'img/', 'src="/assets/images/'
            $content = $content -replace 'href="\.\./\.\./\.\./'img/', 'href="/assets/images/'
            Set-Content -Path $_.FullName -Value $content
        }
    }
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host "Consolidation Complete!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Review the consolidated files in player/, scout/, coach/, admin/"
Write-Host "2. Delete old duplicate folders: Remove-Item -Recurse -Force templates,css,js,img"
Write-Host "3. See CRITICAL_FIXES_REQUIRED.md for CSS/JS consolidation"
Write-Host ""
Write-Host "IMPORTANT: Test thoroughly before deleting old files!" -ForegroundColor Yellow
