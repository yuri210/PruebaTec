@echo off
echo 🔧 Configurando Git Flow y Conventional Commits...

REM Configurar template de commits
git config commit.template .gitmessage
echo ✅ Template de commits configurado

REM Configurar usuario
echo 📝 Configura tu información de Git:
set /p git_name="Tu nombre: "
set /p git_email="Tu email: "

git config user.name "%git_name%"
git config user.email "%git_email%"
echo ✅ Usuario Git configurado

REM Asegurar que estamos en master
git checkout master 2>nul || echo Ya estás en master
echo ✅ Rama master configurada

REM Mostrar configuración
echo.
echo 📋 Configuración actual:
git config user.name
git config user.email
git branch --show-current

echo.
echo 🎉 Git Flow configurado correctamente!
echo.
echo 📝 Próximos pasos:
echo 1. Crear feature: git checkout -b feat/nueva-funcionalidad
echo 2. Hacer cambios y commit: git commit
echo 3. Push: git push origin feat/nueva-funcionalidad
echo 4. Merge a master cuando esté listo
pause