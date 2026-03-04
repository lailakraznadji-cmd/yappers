# === CONFIG ===
$Log = ".\_output\git_diag_log.txt"
# ==========================================

New-Item -ItemType Directory -Force -Path ".\_output" | Out-Null

$output = @()
$output += "--- PATH Variable ---"
$output += $env:PATH -split ';'

$output += "`n--- Checking default Git installation paths ---"
$paths = @(
    "C:\Program Files\Git\cmd\git.exe",
    "C:\Program Files\Git\bin\git.exe",
    "C:\Program Files (x86)\Git\cmd\git.exe",
    $env:LOCALAPPDATA + "\Programs\Git\cmd\git.exe"
)

foreach ($p in $paths) {
    if (Test-Path $p) {
        $output += "Found git at: $p"
    }
}

$output += "`n--- Where git ---"
try {
    $where = where.exe git 2>$null
    if ($where) { $output += $where } else { $output += "where.exe found nothing" }
} catch {
    $output += "where.exe failed"
}

$output += "`n--- End ---"
$output += "Log saved to $Log"

$output | Out-File -FilePath $Log -Encoding utf8
Write-Host "Log saved to $Log"
