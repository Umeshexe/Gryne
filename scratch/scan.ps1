
Add-Type -AssemblyName System.Drawing
$dirs = 'public/assets/unit-1','public/assets/unit-2'
$files = Get-ChildItem -Path $dirs -Include *.jpg,*.png -Recurse
foreach ($f in $files) {
  try {
    $bmp = [System.Drawing.Bitmap]::FromFile($f.FullName)
    $w = $bmp.Width
    $h = $bmp.Height
    $aspect = [math]::Round($w / $h, 2)
    $bmp.Dispose()
    Write-Output "$($f.Directory.Name)|$($f.Name)|$w|$h|$aspect"
  } catch {}
}
