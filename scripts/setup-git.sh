#!/bin/bash

echo "🔧 Configurando Git Flow y Conventional Commits..."

# Configurar template de commits
git config commit.template .gitmessage
echo "✅ Template de commits configurado"

# Configurar usuario (cambiar por tus datos)
echo "📝 Configura tu información de Git:"
read -p "Tu nombre: " git_name
read -p "Tu email: " git_email

git config user.name "$git_name"
git config user.email "$git_email"

echo "✅ Usuario Git configurado"

# Asegurar que estamos en master
git checkout master 2>/dev/null || echo "Ya estás en master"
echo "✅ Rama master configurada"

# Mostrar configuración
echo ""
echo "📋 Configuración actual:"
echo "Usuario: $(git config user.name) <$(git config user.email)>"
echo "Rama actual: $(git branch --show-current)"
echo "Template: $(git config commit.template)"

echo ""
echo "🎉 Git Flow configurado correctamente!"
echo ""
echo "📝 Próximos pasos:"
echo "1. Crear feature: git checkout -b feat/nueva-funcionalidad"
echo "2. Hacer cambios y commit: git commit"
echo "3. Push: git push origin feat/nueva-funcionalidad"