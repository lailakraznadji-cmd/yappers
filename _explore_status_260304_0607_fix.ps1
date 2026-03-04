# === CONFIG ===
$Log = ".\_output\project_status_log_260304_0607_fix.txt"
# ==========================================

New-Item -ItemType Directory -Force -Path ".\_output" | Out-Null
$output = @()

$output += "--- Searching for package.json ---"
$pkg = Get-ChildItem -Path . -Filter "package.json" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1

if ($pkg) {
    $output += "Found at: $($pkg.FullName)"
    $output += "`n--- Package.json Preview ---"
    $output += (Get-Content $pkg.FullName -TotalCount 25) | Out-String
}
else {
    $output += "CRITICAL: No package.json found anywhere in the project."
}

$output += "`n--- End ---"
$output += "Log saved to $Log"
$output | Out-File -FilePath $Log -Encoding utf8
Write-Host "Log saved to $Log"
