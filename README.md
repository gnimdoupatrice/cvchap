# CV Spark

Créer une plateforme SaaS de génération intelligente de CV avec les spécifications suivantes :

1. DESIGN & INTERFACE (Standard de qualité Apple/Google) :
- Esthétique moderne et minimaliste (fond sobre #FAFAFA, conteneurs blancs, ombres douces et bordures fines).
- Desktop : vue Split-Screen avec panneau de travail à gauche et rendu réaliste de la feuille A4 à droite (avec zoom adaptatif).
- Mobile : navigation fluide par onglets (« Écrire » et « Aperçu A4 ») avec barre d'action fixe au bas de l'écran.

2. ONBOARDING & PARCOURS UTILISATEUR :
- Bouton « Charger un profil d'exemple » dès l'accueil pour tester l'outil en un clic (ex. Développeur, Chef de projet, Marketing).
- Sélection parmi 3 modèles de CV contrastés et équilibrés (Minimaliste épuré, Corporate institutionnel, Moderne bicolonne).
- Choix explicite entre deux modes de saisie :
  * Mode Formulaire classique : saisie structurée par sections (Coordonnées, Titre, Résumé, Expériences, Formations, Compétences).
  * Mode Coach IA : interview interactive guidée (3 questions simples par expérience : défi, action concrète, résultat mesurable).
- Validation interactive avec comparatif avant/après pour chaque suggestion de l'IA (mise en valeur des verbes d'action et résultats).
- Règle de pagination A4 : détection du débordement en direct avec alerte et bouton « Adapter à 1 page » (auto-ajustement des marges/interlignes).

3. EXPORT & VIABILITÉ :
- Mode invité complet : l'utilisateur peut tester, créer et exporter son premier CV en PDF sans être forcé de créer un compte (sauvegarde locale dans le navigateur).
- Génération PDF vectorielle immédiate, propre, avec texte sélectionnable et 100% lisible par les robots ATS.
- Quotas IA freemium (5 crédits d'optimisation offerts, puis invitation douce à se connecter ou passer en formule premium).
- Architecture modulaire prête pour les phases suivantes (Score ATS par offre, Pack candidature et Simulateur d'entretien).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7fcdbd57-a588-4121-926f-1f45cf34e8ce).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
Ma 