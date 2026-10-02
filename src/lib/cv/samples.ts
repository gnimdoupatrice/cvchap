import { uid, type CV } from "./types";

export const samples: { id: string; label: string; cv: CV }[] = [
  {
    id: "dev",
    label: "Développeur",
    cv: {
      personal: { name: "Léa Martin", email: "lea.martin@email.fr", phone: "06 12 34 56 78", location: "Lyon", link: "github.com/leamartin" },
      title: "Développeuse Full-Stack Senior",
      summary: "7 ans d'expérience dans la conception d'applications web à fort trafic. Spécialisée React, Node.js et architectures cloud, avec un goût prononcé pour la qualité du code et le mentorat.",
      experiences: [
        { id: uid(), role: "Lead Developer", company: "Fintech Nova", start: "2021", end: "Aujourd'hui", bullets: ["Refonte de l'application de paiement en React et TypeScript, -40 % de temps de chargement", "Encadrement d'une équipe de 5 développeurs et mise en place des revues de code", "Migration de l'infrastructure vers AWS, économie de 30 % sur les coûts annuels"] },
        { id: uid(), role: "Développeuse Full-Stack", company: "Agence Pixel", start: "2018", end: "2021", bullets: ["Développement de 12 sites e-commerce sous Node.js et Vue", "Création d'une bibliothèque de composants réutilisée sur tous les projets"] },
      ],
      education: [{ id: uid(), degree: "Master Informatique", school: "INSA Lyon", start: "2013", end: "2018" }],
      skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker", "CI/CD"],
    },
  },
  {
    id: "pm",
    label: "Chef de projet",
    cv: {
      personal: { name: "Karim Benali", email: "k.benali@email.fr", phone: "06 98 76 54 32", location: "Paris", link: "linkedin.com/in/kbenali" },
      title: "Chef de projet digital",
      summary: "Pilote de projets transverses depuis 9 ans, du cadrage au déploiement. Habitué aux environnements agiles et aux comités de direction.",
      experiences: [
        { id: uid(), role: "Chef de projet senior", company: "Groupe Horizon", start: "2019", end: "Aujourd'hui", bullets: ["Pilotage d'un programme de transformation de 2 M€ réunissant 25 personnes", "Livraison de la nouvelle plateforme client avec 3 semaines d'avance", "Mise en place de la méthode Scrum dans 4 équipes"] },
        { id: uid(), role: "Chef de projet", company: "Consulting Atlas", start: "2015", end: "2019", bullets: ["Gestion de 15 projets clients dans la banque et l'assurance", "Taux de satisfaction client de 94 %"] },
      ],
      education: [{ id: uid(), degree: "Master Management de projet", school: "ESSEC", start: "2013", end: "2015" }],
      skills: ["Scrum", "Jira", "Gestion budgétaire", "Conduite du changement", "PMP"],
    },
  },
  {
    id: "mkt",
    label: "Marketing",
    cv: {
      personal: { name: "Camille Durand", email: "camille.durand@email.fr", phone: "07 11 22 33 44", location: "Bordeaux", link: "camilledurand.fr" },
      title: "Responsable marketing digital",
      summary: "Spécialiste de l'acquisition et de la marque, j'aide les entreprises à croître grâce à des campagnes mesurables et créatives.",
      experiences: [
        { id: uid(), role: "Responsable acquisition", company: "Maison Lumière", start: "2020", end: "Aujourd'hui", bullets: ["Hausse du trafic organique de 120 % en 18 mois", "Gestion d'un budget média de 500 k€ avec un ROAS de 4,2", "Lancement de la marque sur 3 nouveaux marchés européens"] },
        { id: uid(), role: "Chargée de marketing", company: "Startup Vélo", start: "2017", end: "2020", bullets: ["Animation des réseaux sociaux, +35 000 abonnés", "Organisation de 8 événements de lancement produit"] },
      ],
      education: [{ id: uid(), degree: "Master Marketing digital", school: "KEDGE Business School", start: "2015", end: "2017" }],
      skills: ["SEO / SEA", "Google Analytics", "Meta Ads", "Brand content", "HubSpot"],
    },
  },
];
