$ErrorActionPreference = 'Stop'
$base = Split-Path -Parent $MyInvocation.MyCommand.Path
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

$html = [System.IO.File]::ReadAllText((Join-Path $base 'index.html'), $utf8NoBom)
$css = [System.IO.File]::ReadAllText((Join-Path $base 'styles.css'), $utf8NoBom)

$scripts = @(
  'vendor/phaser.min.js',
  'vendor/gsap.min.js',
  'js/contentData.js',
  'js/audio.js',
  'js/characters.js',
  'js/spriteFactory.js',
  'js/rigSystem.js',
  'js/uiCinematics.js',
  'js/phaserGame.js',
  'js/game.js'
)

$inlineScripts = New-Object System.Text.StringBuilder
foreach ($rel in $scripts) {
  $jsContent = [System.IO.File]::ReadAllText((Join-Path $base $rel), $utf8NoBom)
  $jsContent = $jsContent -replace '</script>', '<\/script>'
  [void]$inlineScripts.AppendLine("<script>")
  [void]$inlineScripts.AppendLine($jsContent)
  [void]$inlineScripts.AppendLine("</script>")
}

$html = $html.Replace('<link rel="stylesheet" href="styles.css">', "<style>`n$css`n</style>")
$scriptBlockPattern = '(?s)<script src="vendor/phaser\.min\.js"></script>.*?<script src="js/game\.js"></script>'
$html = [System.Text.RegularExpressions.Regex]::Replace($html, $scriptBlockPattern, [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $inlineScripts.ToString().TrimEnd() })

$outPath = Join-Path $base 'Milo_Bahce_Macerasi_TekDosya.html'
[System.IO.File]::WriteAllText($outPath, $html, $utf8NoBom)
Write-Output "Generated: $outPath ($($html.Length) chars)"
