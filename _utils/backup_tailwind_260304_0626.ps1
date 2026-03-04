# === CONFIG ===
$Log = ".\_output\backup_tailwind_log.txt"
$Targets = @(
    ".\package.json",
    ".\src\pages\index.js"
)
$BackupDir = ".\.archive\backup_tailwind_$(Get-Date -Format 'yyMMdd_HHmmss')"
# ==========================================

New-Item -ItemType Directory -Force -Path ".\_output" | Out-Null
New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null

$output = @()
$output += "--- Backup Operation ---"
$output += "Destination: $BackupDir"

foreach ($target in $Targets) {
    if (Test-Path $target) {
        $destPath = Join-Path -Path $BackupDir -ChildPath (Split-Path $target -Leaf)
        Copy-Item -Path $target -Destination $destPath -Force
        $output += "Backed up: $target -> $destPath"
    }
    else {
        $output += "Warning: Target not found: $target"
    }
}

$output += "`n--- End ---"
$output += "Log saved to $Log"

$output | Out-File -FilePath $Log -Encoding utf8
Write-Host "Log saved to $Log"
