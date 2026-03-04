# === CONFIG ===
$Log = ".\_output\write_package_json_nobom_log.txt"
# ==========================================

New-Item -ItemType Directory -Force -Path ".\_output" | Out-Null
$output = @()

$content = @"
{
  "name": "yappers",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "firebase": "^10.7.0"
  }
}
"@

try {
    $utf8NoBom = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText("$(Get-Location)\package.json", $content, $utf8NoBom)
    $output += "Successfully wrote to .\package.json without BOM"
}
catch {
    $output += "Failed to write to package.json: $_"
}

$output += "`n--- End ---"
$output += "Log saved to $Log"

$output | Out-File -FilePath $Log -Encoding utf8
Write-Host "Log saved to $Log"
