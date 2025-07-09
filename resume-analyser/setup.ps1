# Resume Analyzer Setup Script
Write-Host "🚀 Setting up Resume Analyzer Application..." -ForegroundColor Green

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if .NET SDK is installed
Write-Host "Checking .NET SDK installation..." -ForegroundColor Yellow
try {
    $dotnetVersion = dotnet --version
    Write-Host "✅ .NET SDK found: $dotnetVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ .NET SDK not found. Please install .NET 8 SDK from https://dotnet.microsoft.com/" -ForegroundColor Red
    exit 1
}

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}

# Navigate to backend and restore packages
Write-Host "Setting up backend..." -ForegroundColor Yellow
Set-Location "ResumeAnalyzer.API"
dotnet restore
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend packages restored successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to restore backend packages" -ForegroundColor Red
    exit 1
}

# Go back to root directory
Set-Location ".."

Write-Host "`n🎉 Setup completed successfully!" -ForegroundColor Green
Write-Host "`n📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Start the backend: cd ResumeAnalyzer.API && dotnet run" -ForegroundColor White
Write-Host "2. Start the frontend: npm start" -ForegroundColor White
Write-Host "3. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host "`n📚 For more information, see README.md" -ForegroundColor Cyan 