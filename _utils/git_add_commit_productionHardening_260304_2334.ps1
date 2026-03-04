# === CONFIG ===
$Log = ".\_output\git_add_commit_productionHardening_log.txt"
# ==========================================

New-Item -ItemType Directory -Force -Path ".\_output" | Out-Null
$output = @()

try {
    $output += "--- Running Git Add ---"
    $add = git add . 2>&1
    $output += $add

    $output += "`n--- Running Git Commit ---"
    $commit = git commit -m "Implement Production Hardening: Firebase rules, Safety page, Admin protection, 404 page" 2>&1
    $output += $commit
    
    $output += "`n--- Git Status After Commit ---"
    $statusAfter = git status 2>&1
    $output += $statusAfter

}
catch {
    $output += "Error during git operations: $_"
}

$output += "`n--- End ---"
$output += "Log saved to $Log"

$output | Out-File -FilePath $Log -Encoding utf8
Write-Host "Log saved to $Log"
