# Reproduction fidèle du Modèle 1

## Résultat attendu
- Remplacer le catalogue actuel par un seul gabarit actif : « Français Simple Moderne Bleu ».
- Reproduire le SVG de référence sur une feuille A4 fixe de 210 × 297 mm, sans ajouter de blocs visuels.
- Conserver les données modifiables et l’export PDF vectoriel existants.

## Mise en œuvre
- Refaire la feuille avec les proportions exactes du modèle : colonne gauche à 31,6 %, découpe blanche centrale, portrait, textes, jauges et espacements.
- Ajouter la quatrième coordonnée avec l’icône web et afficher les langues sous forme de jauges bicolores.
- Recaler l’en-tête, les titres soulignés, la ligne chronologique, les pastilles, les dates, les établissements et les puces selon la référence.
- Retirer les trois anciens gabarits génériques de la sélection d’accueil et de l’éditeur ; convertir automatiquement les anciens choix vers le modèle principal.
- Mettre à jour les textes de l’accueil qui indiquent encore plusieurs modèles.

## Vérification
- Comparer des captures A4 du rendu et du SVG à 794 × 1123 px.
- Tester l’accueil, le chargement d’un exemple, l’éditeur et l’aperçu imprimable.
- Contrôler l’affichage sur ordinateur et mobile, puis vérifier l’absence d’erreur.

## Détails techniques
- Le rendu reste en HTML/CSS afin que le contenu soit éditable et que le texte du PDF demeure sélectionnable et compatible ATS.
- Le SVG fourni sert uniquement de référence visuelle ; il ne sera pas affiché comme image dans le CV.
