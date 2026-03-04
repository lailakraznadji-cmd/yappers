# === CONFIG ===
$Log = ".\_output\git_commit_log.txt"
# ==========================================

New-Item -ItemType Directory -Force -Path ".\_output" | Out-Null

$output = @()
try {
    $output += "--- Git Status Before Commit ---"
    $status = git status 2>&1
    $output += $status

    $output += "`n--- Running Git Commit ---"
    $commit = git commit -m "Initial commit" 2>&1
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
