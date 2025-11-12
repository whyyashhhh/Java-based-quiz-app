# Simple API smoke test
$category = 'science'
Write-Host "GET /api/quiz/$category"
curl.exe -s http://localhost:8080/api/quiz/$category | ConvertFrom-Json | Format-List

Write-Host "\nPOST /api/quiz/submit -> expect score/total"
$payload = '[{"question":"What planet is known as the Red Planet?","answer":"Mars"}]'
curl.exe -s -H "Content-Type: application/json" -d $payload http://localhost:8080/api/quiz/submit | ConvertFrom-Json | Format-List
