@echo off
setlocal enabledelayedexpansion

set "PLUGIN_SLUG=interative-software-simulator"
set "WINRAR=C:\Program Files\WinRAR\WinRAR.exe"
set "STAGE_DIR=%~dp0dist-zip\%PLUGIN_SLUG%"
set "ZIP_OUT=%~dp0%PLUGIN_SLUG%.zip"

echo [1/4] Preparando ambiente e limpando arquivos temporarios...
if exist "%~dp0dist-zip" rmdir /s /q "%~dp0dist-zip"
if exist "%ZIP_OUT%" del /f /q "%ZIP_OUT%"

echo [2/4] Estruturando pacote limpo para WordPress...
mkdir "%STAGE_DIR%"
copy "%~dp0interative-software-simulator.php" "%STAGE_DIR%\" >nul
copy "%~dp0block.json" "%STAGE_DIR%\" >nul
copy "%~dp0readme.txt" "%STAGE_DIR%\" >nul
copy "%~dp0README.md" "%STAGE_DIR%\" >nul
copy "%~dp0LICENSE" "%STAGE_DIR%\" >nul

xcopy "%~dp0build" "%STAGE_DIR%\build\" /e /i /q >nul
xcopy "%~dp0assets" "%STAGE_DIR%\assets\" /e /i /q >nul
xcopy "%~dp0inc" "%STAGE_DIR%\inc\" /e /i /q >nul
xcopy "%~dp0languages" "%STAGE_DIR%\languages\" /e /i /q >nul

echo [3/4] Compactando plugin com WinRAR em formato ZIP...
cd /d "%~dp0dist-zip"
"%WINRAR%" a -afzip -r -ibck "%ZIP_OUT%" "%PLUGIN_SLUG%"

echo [4/4] Finalizando e limpando diretorio temporario...
cd /d "%~dp0"
rmdir /s /q "%~dp0dist-zip"

if exist "%ZIP_OUT%" (
    echo.
    echo =======================================================
    echo SUCESSO! Pacote ZIP do plugin gerado com sucesso:
    echo %ZIP_OUT%
    echo =======================================================
) else (
    echo.
    echo [ERRO] Nao foi possivel gerar o arquivo ZIP.
)

endlocal
