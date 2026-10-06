import { uid, type CV } from "./types";

export const sampleFrenchBlue: CV = {
  personal: {
    name: "Sacha Dubois",
    email: "sacha.dubois@email.fr",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France",
    link: "linkedin.com/in/sachadubois",
  },
  title: "Chargée de Projet & Transformation Digitale",
  summary:
    "Professionnelle certifiée PMP avec 7 ans d'expérience dans la conduite de projets digitaux et transverses complexes. Reconnue pour sa capacité à fédérer des équipes pluridisciplinaires, optimiser les processus opérationnels et livrer des résultats quantifiables dans le respect strict des délais et budgets.",
  experiences: [
    {
      id: uid(),
      role: "Cheffe de Projet Digital Senior",
      company: "Groupe Nexus Innovations",
      start: "2022",
      end: "Présent",
      bullets: [
        "Direction du déploiement de la plateforme e-santé unifiée touchant plus de 450 000 utilisateurs actifs.",
        "Management agile d'une escouade de 14 personnes (développeurs, UX/UI, analystes QA).",
        "Réduction de 28 % du délai de mise en production (time-to-market) grâce à la rationalisation des cycles de sprint.",
        "Gestion d'un budget annuel de 1,4 M€ avec un taux d'adhérence financière de 98,5 %.",
      ],
    },
    {
      id: uid(),
      role: "Responsable de Projet Opérations",
      company: "Cabinet Altius Conseil",
      start: "2019",
      end: "2022",
      bullets: [
        "Pilotage de 8 projets de transformation numérique pour des acteurs bancaires et assurantiels majeurs.",
        "Conduite du changement auprès de 1 200 collaborateurs avec un taux d'adoption de 94 % à 6 mois.",
        "Automatisation de 15 flux de travail internes générant une économie estimée à 120 k€ par an.",
      ],
    },
    {
      id: uid(),
      role: "Coordinatrice de Projets Junior",
      company: "Agence Digitale Voxia",
      start: "2017",
      end: "2019",
      bullets: [
        "Suivi opérationnel des livrables de refonte de 12 sites web institutionnels et marchands.",
        "Animation quotidienne des rituels agiles (Scrum, Kanban) et rédaction des spécifications fonctionnelles.",
      ],
    },
  ],
  education: [
    {
      id: uid(),
      degree: "Master 2 Management International de Projets",
      school: "Université Paris-Dauphine",
      start: "2015",
      end: "2017",
    },
    {
      id: uid(),
      degree: "Licence Sciences de Gestion & Économie",
      school: "Université Panthéon-Sorbonne",
      start: "2012",
      end: "2015",
    },
  ],
  skills: [
    "Gestion de projet Agile (Scrum / Kanban)",
    "Planification stratégique & Roadmap",
    "Conduite du changement",
    "Gestion budgétaire & ROI",
    "Jira · Confluence · Asana",
    "Communication de crise",
    "Analyse fonctionnelle",
    "Management d'équipe transverse",
  ],
  languages: [
    "Français — langue maternelle",
    "Anglais — courant C1",
    "Espagnol — professionnel B2",
    "Allemand — intermédiaire B1",
  ],
  interests: [
    "Voyages & immersion culturelle",
    "Course à pied (semi-marathon)",
    "Mentorat associatif pour jeunes diplômés",
    "Photographie argentique",
  ],
};

export const sampleEmeraldTech: CV = {
  personal: {
    name: "Beyeli Akou Gnimdou Patrice",
    email: "beyeliakougnimdoupatrice13@gmail.com",
    phone: "+228 97 68 40 30",
    location: "Kaoyèlèlè, Kozah 1 — Kara, Togo",
    link: "juristedevfolio.vercel.app",
  },
  title: "Développeur Web & Mobile — Juriste Environnementaliste",
  summary:
    "Développeur web et mobile spécialisé en front-end, je conçois et déploie des sites et plateformes en conditions réelles, notamment des portfolios professionnels, des sites vitrines et des plateformes institutionnelles multi-pages. Je combine développement front-end (React, Tailwind CSS) et outils no-code associés à l'intelligence artificielle, tout en développant progressivement mes compétences en développement mobile et back-end (React Native, Flutter). Mon double profil de juriste et de développeur m'apporte une rigueur particulière dans la structuration des contenus et l'accessibilité des solutions numériques.",
  experiences: [
    {
      id: uid(),
      role: "Startup personnelle",
      company: "RECYC HUB TOGO",
      start: "2025",
      end: "Présent",
      bullets: [
        "Plateforme phygitale de gestion des déchets à Kara : rachat de plastiques au kilo (cash ou Mobile Money), enlèvement de déchets ménagers à domicile et signalement géolocalisé de dépotoirs sauvages. Volet B2B de pilotage de tournées pour entreprises de pré-collecte et Green Academy. Stack : React, Tailwind CSS, Vercel.",
      ],
    },
    {
      id: uid(),
      role: "Portfolio personnel",
      company: "Portfolio — Juriste et Développeur",
      start: "2025",
      end: "2026",
      bullets: [
        "Site vitrine présentant mon double profil de juriste environnementaliste et de développeur, structuré pour mettre en évidence, en un seul espace, mes compétences juridiques et mes réalisations techniques. Stack : React, Tailwind CSS, Vercel.",
      ],
    },
    {
      id: uid(),
      role: "Commande client",
      company: "Portfolio — Essognim ASSI",
      start: "2025",
      end: "2026",
      bullets: [
        "Site vitrine multi-pages pour une leader environnementale et humanitaire, fondatrice du Comité International Éco Challenge et de l'association FEGA Compassion. Navigation bilingue (français/anglais) et module de prise de contact intégré.",
      ],
    },
    {
      id: uid(),
      role: "Vitrine entreprise",
      company: "AKAA GROUP",
      start: "2025",
      end: "2026",
      bullets: [
        "Site vitrine pour AKAA GROUP, structure togolaise spécialisée dans le packaging carton et papier, la communication digitale et la distribution de produits technologiques. Stack : React, Tailwind CSS, Vercel.",
      ],
    },
    {
      id: uid(),
      role: "Plateforme institutionnelle",
      company: "CMEP Togo",
      start: "2025",
      end: "2026",
      bullets: [
        "Plateforme multi-pages pour le Chris Mentorship & Empowerment Program (CMEP) : cinq axes stratégiques, opportunités de formation, témoignages de bénéficiaires et module WhatsApp d'insertion. Stack : React, Tailwind, Vercel.",
      ],
    },
  ],
  education: [
    {
      id: uid(),
      degree: "Certificat Développement Web et Mobile",
      school: "ISMB",
      start: "2025",
      end: "2026",
    },
    {
      id: uid(),
      degree: "Master en Droit de l'Environnement",
      school: "Université de Kara",
      start: "2020",
      end: "2023",
    },
  ],
  skills: [
    "HTML · CSS · JS",
    "React · Next.js",
    "Tailwind CSS",
    "React Native",
    "Flutter (Dart)",
    "Node.js",
    "Firebase · Supabase",
    "SQL & PostgreSQL",
    "Git · GitHub",
    "No-code / IA",
    "Déploiement Vercel",
  ],
  languages: [
    "Français — courant",
    "Anglais — intermédiaire",
    "Kotokoli — bonne pratique orale",
    "Kabiyè — bonne pratique orale",
    "Éwé — bonne pratique orale",
  ],
  interests: [
    "Écologie & recyclage des plastiques",
    "Veille Intelligence Artificielle",
    "Droit numérique & protection des données",
  ],
};

export const samples: { id: string; label: string; cv: CV }[] = [
  { id: "french-blue", label: "Profil Sacha (Modèle Bleu)", cv: sampleFrenchBlue },
  { id: "emerald-tech", label: "Profil Patrice (Modèle Tech)", cv: sampleEmeraldTech },
];