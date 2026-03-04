# === CONFIG ===
$Log = ".\_output\project_status_imports_260304_0611.txt"
# ==========================================

New-Item -ItemType Directory -Force -Path ".\_output" | Out-Null
$output = @()

$output += "--- Searching for imports in js files ---"
if (Test-Path ".\src") {
    $imports = Get-ChildItem -Path ".\src" -Recurse -Filter "*.js" | Select-String -Pattern "^import "
    if ($imports) {
        $output += $imports | Select-Object -ExpandProperty Line | Sort-Object -Unique | Out-String
    }
    else {
        $output += "No imports found."
    }
}
else {
    $output += "No src directory found."
}

$output += "`n--- End ---"
$output += "Log saved to $Log"
$output | Out-File -FilePath $Log -Encoding utf8
Write-Host "Log saved to $Log"
