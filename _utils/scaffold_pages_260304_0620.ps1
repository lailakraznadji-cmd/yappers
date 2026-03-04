# === CONFIG ===
$Log = ".\_output\scaffold_pages_log.txt"
# ==========================================

New-Item -ItemType Directory -Force -Path ".\_output" | Out-Null
$output = @()

$pages = @{
    ".\src\pages\requestSession.js" = "Request a Session";
    ".\src\pages\safety.js"         = "Safety Guidelines";
    ".\src\pages\submitStory.js"    = "Submit Your Story";
    ".\src\pages\admin.js"          = "Admin Dashboard"
}

foreach ($page in $pages.GetEnumerator()) {
    $path = $page.Key
    $title = $page.Value
    
    $content = @"
import HeaderFooter from "../component/HeaderFooter";

export default function $($title -replace ' ', '')() {
    return (
        <HeaderFooter>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">$title</h1>
                <p>This page is currently under development.</p>
            </div>
        </HeaderFooter>
    );
}
"@
    
    try {
        $content | Set-Content -Path $path -Encoding utf8
        $output += "Successfully scaffolded $path"
    }
    catch {
        $output += "Failed to write $path: $_"
    }
}

$output += "`n--- End ---"
$output += "Log saved to $Log"

$output | Out-File -FilePath $Log -Encoding utf8
Write-Host "Log saved to $Log"
