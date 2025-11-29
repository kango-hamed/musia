# Guide de contribution

## Workflow Git

1. Créer une branche depuis `develop`
```bash
git checkout develop
git pull origin develop
git checkout -b feature/123-ma-fonctionnalité
```

2. Développer et commiter
```bash
git add .
git commit -m "feat(module): description"
```

3. Push et créer PR
```bash
git push origin feature/123-ma-fonctionnalité
# Créer PR sur GitHub vers develop
```

## Conventions de nommage
[Voir section normes du cahier des charges]

## Tests
- Ajouter tests pour toute nouvelle fonctionnalité
- Maintenir couverture > 80%
- Tests doivent passer avant merge

## Code Review
- Reviewer dans les 24h
- Commentaires constructifs
- Approuver ou demander modifications
```

9. **Setup Notion/Confluence**
```
Créer espaces :
- 📋 Cahier des charges
- 🏗️ Architecture technique
- 📚 Documentation API
- 🎓 Guides et tutoriels
- 📝 Comptes-rendus de réunions
- 📊 Retrospectives

Pages initiales :
- Onboarding nouveaux développeurs
- Liens utiles (repos, outils, accès)
- Architecture système (diagrammes)
- Conventions de développement