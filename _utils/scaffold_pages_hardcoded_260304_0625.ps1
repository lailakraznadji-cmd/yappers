# === CONFIG ===
$Log = ".\_output\scaffold_pages_log.txt"
# ==========================================

New-Item -ItemType Directory -Force -Path ".\_output" | Out-Null
$output = @()

$requestSession = @"
import HeaderFooter from '../component/HeaderFooter';

export default function RequestASession() {
    return (
        <HeaderFooter>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Request a Session</h1>
                <p>This page is currently under development.</p>
            </div>
        </HeaderFooter>
    );
}
"@

$safety = @"
import HeaderFooter from '../component/HeaderFooter';

export default function SafetyGuidelines() {
    return (
        <HeaderFooter>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Safety Guidelines</h1>
                <p>This page is currently under development.</p>
            </div>
        </HeaderFooter>
    );
}
"@

$submitStory = @"
import HeaderFooter from '../component/HeaderFooter';

export default function SubmitYourStory() {
    return (
        <HeaderFooter>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Submit Your Story</h1>
                <p>This page is currently under development.</p>
            </div>
        </HeaderFooter>
    );
}
"@

$admin = @"
import HeaderFooter from '../component/HeaderFooter';

export default function AdminDashboard() {
    return (
        <HeaderFooter>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
                <p>This page is currently under development.</p>
            </div>
        </HeaderFooter>
    );
}
"@

try {
    $requestSession | Set-Content -Path ".\src\pages\requestSession.js" -Encoding utf8
    $output += "Successfully scaffolded requestSession.js"
    
    $safety | Set-Content -Path ".\src\pages\safety.js" -Encoding utf8
    $output += "Successfully scaffolded safety.js"
    
    $submitStory | Set-Content -Path ".\src\pages\submitStory.js" -Encoding utf8
    $output += "Successfully scaffolded submitStory.js"
    
    $admin | Set-Content -Path ".\src\pages\admin.js" -Encoding utf8
    $output += "Successfully scaffolded admin.js"
}
catch {
    $output += "Failed to write files: $_"
}

$output += "`n--- End ---"
$output += "Log saved to $Log"

$output | Out-File -FilePath $Log -Encoding utf8
Write-Host "Log saved to $Log"
