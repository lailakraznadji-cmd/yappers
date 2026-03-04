# === CONFIG ===
$Log = ".\_output\fix_tailwind_version_log.txt"
# ==========================================

New-Item -ItemType Directory -Force -Path ".\_output" | Out-Null
$output = @()

try {
    $output += "--- Running npm install Tailwind v3 ---"
    $npmOutput = npm install -D tailwindcss@^3.4.1 postcss autoprefixer 2>&1
    $output += $npmOutput
}
catch {
    $output += "Error during npm operations: $_"
}

$output += "`n--- End ---"
$output += "Log saved to $Log"

$output | Out-File -FilePath $Log -Encoding utf8
Write-Host "Log saved to $Log"
