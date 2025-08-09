#!/bin/bash

echo "🔧 Configurando Git Flow y Conventional Commits..."

echo "📋 Configurando template de commits..."
git config commit.template .gitmessage
echo "✅ Template de commits configurado"

echo "📝 Configurando usuario Git..."
echo "📝 Configura tu información de Git:"
read -p "Tu nombre: " git_name
read -p "Tu email: " git_email

git config user.name "$git_name"
git config user.email "$git_email"
echo "✅ Usuario Git configurado"

echo "📋 Trabajando en rama master..."
# Asegurar que estamos en master
git checkout master 2>/dev/null || echo "Ya estás en master"
echo "✅ Rama master lista"

# Crear hook pre-commit para ejecutar tests
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "🧪 Ejecutando tests antes del commit..."

# Ejecutar tests del backend
cd backend
if ! composer test --quiet; then
    echo "❌ Tests del backend fallaron"
    exit 1
fi
cd ..

# Ejecutar tests del frontend
cd frontend
if ! npm run test:ci -- --silent; then
    echo "❌ Tests del frontend fallaron"
    exit 1
fi
cd ..

echo "✅ Todos los tests pasaron"
EOF

chmod +x .git/hooks/pre-commit
success "Hook pre-commit configurado"

echo ""
echo -e "${GREEN}🎉 Git Flow configurado correctamente!${NC}"
echo ""
echo -e "${BLUE}📝 Próximos pasos:${NC}"
echo "1. Crear feature: git checkout -b feat/nueva-funcionalidad"
echo "2. Hacer cambios y commit: git commit"
echo "3. Push: git push origin feat/nueva-funcionalidad"
echo "4. Crear Pull Request en GitHub"
echo ""
echo -e "${YELLOW}📋 Comandos útiles:${NC}"
echo "• git flow feature start nueva-funcionalidad"
echo "• git flow feature finish nueva-funcionalidad"
echo "• git flow release start 1.1.0"
echo "• git flow release finish 1.1.0"