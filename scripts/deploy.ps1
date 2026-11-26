$ErrorActionPreference = "Stop"

Write-Host "Starting NG deploy..." -ForegroundColor Cyan

$currentBranch = git rev-parse --abbrev-ref HEAD

if ($currentBranch -ne "main") {
    Write-Host "You are on branch '$currentBranch'. Switch to main first." -ForegroundColor Red
    exit 1
}

$status = git status --porcelain

if ($status) {
    Write-Host "Working tree is not clean. Commit or discard changes first." -ForegroundColor Red
    git status
    exit 1
}

Write-Host "Building site from main..." -ForegroundColor Cyan
npm run build

$tempDeploy = Join-Path $env:TEMP "ng-deploy-temp"

if (Test-Path $tempDeploy) {
    Remove-Item $tempDeploy -Recurse -Force
}

New-Item -ItemType Directory -Path $tempDeploy | Out-Null

Write-Host "Preparing deploy files..." -ForegroundColor Cyan
Copy-Item -Path "dist\*" -Destination $tempDeploy -Recurse -Force

New-Item -ItemType Directory -Path "$tempDeploy\api" -Force | Out-Null
Copy-Item -Path "api\submit-lead.php" -Destination "$tempDeploy\api\submit-lead.php" -Force
Copy-Item -Path "api\request-sample.php" -Destination "$tempDeploy\api\request-sample.php" -Force
Copy-Item -Path "api\config.example.php" -Destination "$tempDeploy\api\config.example.php" -Force

@"
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  RewriteRule ^index\.html$ - [L]

  RewriteCond %{REQUEST_URI} ^/api/
  RewriteRule ^ - [L]

  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
"@ | Set-Content "$tempDeploy\.htaccess"

@"
node_modules/
dist/
.env
api/config.php
"@ | Set-Content "$tempDeploy\.gitignore"

Write-Host "Switching to deploy branch..." -ForegroundColor Cyan
git checkout deploy

Write-Host "Pulling latest deploy branch..." -ForegroundColor Cyan
git pull --ff-only origin deploy

Write-Host "Replacing deploy branch files..." -ForegroundColor Cyan
git rm -r . --ignore-unmatch | Out-Null

Copy-Item -Path "$tempDeploy\*" -Destination "." -Recurse -Force

git add -A

git diff --cached --quiet

if ($LASTEXITCODE -eq 0) {
    Write-Host "No deploy changes to commit." -ForegroundColor Yellow
} else {
    git commit -m "Deploy website update"
}

Write-Host "Pushing deploy branch..." -ForegroundColor Cyan
git push origin deploy

Write-Host "Returning to main branch..." -ForegroundColor Cyan
git checkout main

Remove-Item $tempDeploy -Recurse -Force

Write-Host "Deploy branch updated successfully." -ForegroundColor Green
