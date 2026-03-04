# === CONFIG ===
$Log = ".\_output\project_status_log_260304_0607.txt"
# ==========================================

New-Item -ItemType Directory -Force -Path ".\_output" | Out-Null
$output = @()

$output += "--- Project Root Structure ---"
$output += (Get-ChildItem -Path . -Force -Depth 1 | Select-Object -ExpandProperty Name) | Out-String

$output += "`n--- Source Code Structure ---"
if (Test-Path ".\src") {
    $output += (Get-ChildItem -Path ".\src" -Recurse -Force | Select-Object -ExpandProperty FullName) | Select-String -Pattern "yappers" | Out-String
}
else {
    $output += "No src directory found."
}

$output += "`n--- Package.json Preview ---"
if (Test-Path ".\package.json") {
    $output += (Get-Content ".\package.json" -TotalCount 25) | Out-String
}
else {
    $output += "No package.json found."
}

$output += "`n--- End ---"
$output += "Log saved to $Log"
$output | Out-File -FilePath $Log -Encoding utf8
Write-Host "Log saved to $Log"
