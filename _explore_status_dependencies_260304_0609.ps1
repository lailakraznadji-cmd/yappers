# === CONFIG ===
$Log = ".\_output\project_status_dependencies_260304_0609.txt"
# ==========================================

New-Item -ItemType Directory -Force -Path ".\_output" | Out-Null
$output = @()

$output += "--- Next config content ---"
if (Test-Path ".\next.config.js") {
    $output += Get-Content ".\next.config.js" | Out-String
}

$output += "`n--- Node Modules check ---"
if (Test-Path ".\node_modules") {
    $output += "node_modules exists. Checking for Next.js:"
    if (Test-Path ".\node_modules\next\package.json") {
        $output += (Get-Content ".\node_modules\next\package.json" | Select-String '"version":').ToString()
    }
    else {
        $output += "Next.js not found in node_modules."
    }
}
else {
    $output += "node_modules does not exist."
}

$output += "`n--- End ---"
$output += "Log saved to $Log"
$output | Out-File -FilePath $Log -Encoding utf8
Write-Host "Log saved to $Log"
