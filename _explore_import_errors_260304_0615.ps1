# === CONFIG ===
$Log = ".\_output\project_status_imports_detailed_260304_0615.txt"
# ==========================================

New-Item -ItemType Directory -Force -Path ".\_output" | Out-Null
$output = @()

$output += "--- Searching for broken internal imports ---"
if (Test-Path ".\src") {
    $imports = Get-ChildItem -Path ".\src" -Recurse -Filter "*.js" | Select-String -Pattern "components/"
    if ($imports) {
        $output += $imports | Out-String
    }
    else {
        $output += "No broken internal imports found."
    }
}
else {
    $output += "No src directory found."
}

$output += "`n--- End ---"
$output += "Log saved to $Log"
$output | Out-File -FilePath $Log -Encoding utf8
Write-Host "Log saved to $Log"
