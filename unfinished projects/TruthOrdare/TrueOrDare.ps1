$path = "demo.txt"
$questionObject = [pscustomobject]@{}

if (Test-Path $path -PathType Leaf) {
    $regexMatches = Get-Content -Path $path | select-string -pattern '(?:(?<number>[0-9]+)|(?<letter>[a-zA-Z]+))+.*?:.*?(?<text>\S.*\S)' -AllMatches
    $regexMatches.Matches | Foreach-Object {
        $questionObject | Add-Member -NotePropertyName $($_.Groups['number'].Value + $_.Groups['letter'].Value) -NotePropertyValue $_.Groups['text'].Value
    }
    do {
        $userInput = Read-Host -Prompt 'Enter the number and letter or type exit, to exit'
        Clear-Host
        $regexMatch = $userInput | select-string -pattern '(?:(?<number>[0-9]+)|(?<letter>[a-zA-Z]+))+'
        if ($regexMatch.Matches.Groups[1].Success -eq 'True' -and $regexMatch.Matches.Groups[2].Success -eq 'True') {
            $numberLetter = $($regexMatch.Matches.Groups[1].Value + $regexMatch.Matches.Groups[2].Value)
            try {
                $question = ($questionObject | Select-Object -ExpandProperty $numberLetter -ErrorAction Stop)
                write-host "Question with id: $numberLetter"
                write-host "`n"
                write-host $question -BackgroundColor Green
            }
            catch {
                Write-Warning "No question with the id you entered exists"
            }
            write-host "`n"
        }
    } while ($userInput.ToLower() -ne "exit")
} else {
    Write-warning "The demo.txt file is missing"
}