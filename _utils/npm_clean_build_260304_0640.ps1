# === CONFIG ===
$Log = ".\_output\npm_clean_build_log.txt"
# ==========================================

New-Item -ItemType Directory -Force -Path ".\_output" | Out-Null
$output = @()

try {
    $output += "--- Removing .next cache ---"
    if (Test-Path ".\.next") {
        Remove-Item -Recurse -Force ".\.next"
        $output += "Successfully removed .next directory"
    }
    else {
        $output += ".next directory not found"
    }

    $output += "`n--- Running npm run build ---"
    $buildOutput = npm run build 2>&1
    $output += $buildOutput
}
catch {
    $output += "Error during operations: $_"
}

$output += "`n--- End ---"
$output += "Log saved to $Log"

$output | Out-File -FilePath $Log -Encoding utf8
Write-Host "Log saved to $Log"
