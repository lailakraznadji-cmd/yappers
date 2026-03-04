# === CONFIG ===
$Log = ".\_output\npm_install_log.txt"
# ==========================================

New-Item -ItemType Directory -Force -Path ".\_output" | Out-Null
$output = @()

try {
    $output += "--- Running npm install ---"
    $npmOutput = npm install 2>&1
    $output += $npmOutput
}
catch {
    $output += "Error during npm operations: $_"
}

$output += "`n--- End ---"
$output += "Log saved to $Log"

$output | Out-File -FilePath $Log -Encoding utf8
Write-Host "Log saved to $Log"
