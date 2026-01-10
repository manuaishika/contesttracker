# PowerShell script to set up .env file for Supabase
# Run this script: .\setup-env.ps1

$projectUrl = "https://gzucxffekdhheszunvdy.supabase.co"
Write-Host "Supabase Project URL: $projectUrl" -ForegroundColor Green

Write-Host "`nTo get your API keys:" -ForegroundColor Yellow
Write-Host "1. Go to: https://supabase.com/dashboard/project/gzucxffekdhheszunvdy/settings/api" -ForegroundColor Cyan
Write-Host "2. Look for 'Project API keys' section" -ForegroundColor Cyan
Write-Host "3. Find the 'anon public' key (or 'publishable' key) - it should start with 'eyJ...'" -ForegroundColor Cyan
Write-Host "4. Copy that key and paste it below" -ForegroundColor Cyan

$anonKey = Read-Host "`nEnter your anon/publishable key (starts with eyJ...): "

if ($anonKey -match "^eyJ") {
    $envContent = @"
VITE_SUPABASE_URL=$projectUrl
VITE_SUPABASE_ANON_KEY=$anonKey
"@
    
    Set-Content -Path ".env" -Value $envContent
    Write-Host "`n✅ .env file created successfully!" -ForegroundColor Green
    Write-Host "📄 File location: $(Resolve-Path .env)" -ForegroundColor Cyan
    Write-Host "`n⚠️  Important: Restart your dev server for changes to take effect!" -ForegroundColor Yellow
    Write-Host "   Run: npm run dev" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Error: The key should start with 'eyJ...' - please check your Supabase dashboard" -ForegroundColor Red
    Write-Host "Dashboard: https://supabase.com/dashboard/project/gzucxffekdhheszunvdy/settings/api" -ForegroundColor Cyan
}
