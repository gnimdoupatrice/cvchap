import { uid, type CV, type TemplateId } from "./types";

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
    "Développeur web et mobile spécialisé en front-end, je conçois et déploie des plateformes en conditions réelles. Je combine développement front-end moderne (React, Tailwind CSS) et outils d'intelligence artificielle, tout en développant mes compétences mobile (React Native, Flutter). Mon double profil juridique et technique m'apporte une rigueur unique dans la structuration des données et l'accessibilité des solutions numériques.",
  experiences: [
    {
      id: uid(),
      role: "Startup personnelle",
      company: "RECYC HUB TOGO",
      start: "2025",
      end: "Présent",
      bullets: [
        "Plateforme phygitale de gestion des déchets à Kara : rachat de plastiques au kilo (cash ou Mobile Money), enlèvement de déchets ménagers à domicile et signalement géolocalisé de dépotoirs sauvages. Volet B2B de pilotage de tournées pour entreprises de pré-collecte. Stack : React, Tailwind CSS, Vercel.",
      ],
    },
    {
      id: uid(),
      role: "Portfolio personnel",
      company: "Portfolio — Juriste et Développeur",
      start: "2025",
      end: "2026",
      bullets: [
        "Site vitrine personnel présentant le double profil en droit de l'environnement et en développement web, avec intégration des projets tech, des publications juridiques et un formulaire de contact direct. Stack : HTML5, CSS3, JavaScript, Vercel.",
      ],
    },
    {
      id: uid(),
      role: "Projet client",
      company: "Cabinet d'Avocats Essognim ASSI",
      start: "2025",
      end: "2026",
      bullets: [
        "Plateforme professionnelle complète pour un cabinet d'avocats togolais : présentation des domaines d'expertise, profils des associés, prise de rendez-vous en ligne et actualités juridiques. Stack : React, Tailwind CSS, Vercel.",
      ],
    },
    {
      id: uid(),
      role: "Projet d'entreprise",
      company: "AKAA GROUP — Entreprise BTP & Immobilier",
      start: "2025",
      end: "2026",
      bullets: [
        "Site institutionnel multi-pages pour une entreprise de BTP et promotion immobilière : catalogue de réalisations, présentation des services d'ingénierie et demande de devis en ligne. Stack : React, Tailwind CSS, Vercel.",
      ],
    },
    {
      id: uid(),
      role: "Projet institutionnel",
      company: "CMEP Togo — Collectif des Médecins Éco-Patriotes",
      start: "2025",
      end: "2026",
      bullets: [
        "Plateforme web pour une association de professionnels de santé engagés : diffusion des missions de santé communautaire, gestion des adhésions et publications d'articles scientifiques. Stack : React, Tailwind CSS, Vercel.",
      ],
    },
  ],
  education: [
    {
      id: uid(),
      degree: "Certificat de fin de formation Développeur Web et Mobile",
      school: "Institut Supérieur de Management et du Bâtiment (ISMB) — Kara, Togo",
      start: "2025",
      end: "2026",
    },
    {
      id: uid(),
      degree: "Master I en Droit — Parcours Justice et Droit du Procès",
      school: "Faculté de Droit et des Sciences Politiques, Université de Kara",
      start: "2024",
      end: "2025",
    },
  ],
  skills: [
    "HTML5 / CSS3",
    "JavaScript (ES6+)",
    "React / Next.js",
    "Tailwind CSS",
    "Git / GitHub",
    "Vercel Deployment",
    "Responsive Design",
    "Outils IA & No-Code",
    "React Native (notions)",
    "API REST",
    "Accessibilité Web",
  ],
  languages: [
    "Français — langue officielle (très bon niveau écrit et oral)",
    "Anglais — notions de base",
    "Kotokoli — langue maternelle",
    "Kabiyè — bonne pratique orale",
    "Éwé — bonne pratique orale",
  ],
  interests: [
    "Agroécologie & protection environnementale",
    "Recherche en droit du numérique et IA",
    "Lecture et vulgarisation technologique",
  ],
};

export const sampleJuristeNavy: CV = {
  personal: {
    name: "BEYELI AKOU GNIMDOU PATRICE",
    email: "beyeliakougnimdoupatrice13@gmail.com",
    phone: "+228 97 68 40 30",
    location: "Kaoyèlèlè, Kozah 1 — Kara, Togo",
    link: "juristedevfolio.vercel.app",
  },
  title: "Juriste environnementaliste",
  summary:
    "Juriste environnementaliste fort de trois années d'expérience en tant que coordonnateur du département Environnement et ODD au Centre d'Actions Juridiques et Sociales (CAJS Kara), je suis passionné par la transition écologique, l'agriculture durable et le développement communautaire.",
  experiences: [
    {
      id: uid(),
      role: "Coordonnateur Département Environnement et ODD",
      company: "Centre d'Actions Juridiques et Sociales (CAJS) — Kara, Togo",
      start: "2023",
      end: "Présent",
      bullets: [
        "Coordination des stagiaires.",
        "Animation des formations sur la rédaction des documents administratifs (rapport, mémo, compte-rendu).",
        "Animation sur la rédaction de projet et de termes de référence.",
        "Monitoring des droits humains.",
      ],
    },
    {
      id: uid(),
      role: "Programme Green Week — Plaidoyer et Action Climat",
      company: "",
      start: "2023",
      end: "Présent",
      bullets: [
        "Animation d'ateliers de renforcement de capacités sur les techniques de reboisement et d'entretien des plants.",
        "Coordination de webinaires sur les enjeux environnementaux à l'ère numérique.",
        "Coordination opérationnelle de campagnes de reboisement communautaire.",
      ],
    },
    {
      id: uid(),
      role: "Programme Eco-Kids — Éducation Environnementale",
      company: "",
      start: "2023",
      end: "Présent",
      bullets: [
        "Coordination de micro-projets de reboisement éducatif impliquant des enfants.",
        "Développement de programmes d'éveil écologique adaptés au jeune enfant.",
      ],
    },
  ],
  education: [
    {
      id: uid(),
      degree: "Master I Justice et Droit du Procès",
      school: "Université de Kara",
      start: "2024",
      end: "2025",
    },
    {
      id: uid(),
      degree: "Licence Droit Public",
      school: "Université de Kara",
      start: "2021",
      end: "2023",
    },
    {
      id: uid(),
      degree: "Certificat Développement Web et Mobile",
      school: "ISMB — Kara, Togo",
      start: "2025",
      end: "2026",
    },
    {
      id: uid(),
      degree: "Formation modulaire en maraîchage et compostage",
      school: "Ferme Les Trois Mages de Soumbou",
      start: "Juil. 2025",
      end: "Oct. 2025",
    },
  ],
  skills: [
    "Droit de l'environnement",
    "Veille réglementaire environnementale",
    "Rédaction d'actes juridiques et conventions",
    "ODD et cadres multilatéraux",
    "Finance climat et économie verte",
    "Gestion de partenariats multi-acteurs",
    "Compostage, bokashi",
    "Gestion des déchets agricoles",
    "Gestion de projet",
    "Solutions vertes",
    "Mobilisation communautaire",
    "Plaidoyer environnemental",
    "Négociation climatique",
    "Google Suite",
  ],
  languages: [
    "Français — courant (96%)",
    "Anglais — intermédiaire (58%)",
    "Kotokoli — bonne pratique orale (43%)",
    "Kabiyè — bonne pratique orale (43%)",
    "Éwé — bonne pratique orale (43%)",
  ],
  interests: ["Environnement & développement durable", "Agroécologie", "Lecture"],
  highlights: [
    {
      title: "Rigueur méthodologique",
      text: "La formation juridique m'a permis de développer une approche structurée de la gestion de projet : analyse de contexte, rédaction de termes de référence, suivi d'indicateurs. Des réflexes méthodologiques que j'applique également à la conduite de projets numériques.",
    },
    {
      title: "Terrain et outils numériques",
      text: "La coordination d'équipes de terrain a renforcé mes capacités de documentation, de communication et de reporting, des compétences directement transférables à la gestion de projets numériques et à la relation client.",
    },
  ],
};

export const sampleAlfredBold: CV = {
  personal: {
    name: "Alfred Bernard",
    email: "hello@reallygreatsite.com",
    phone: "+123-456-7890",
    location: "Paris, France",
    link: "www.reallygreatsite.com",
  },
  title: "Informaticien",
  summary:
    "Développeur full-stack et administrateur système rigoureux, passionné par la robustesse des infrastructures et la fluidité des interfaces. 10 ans d'expérience dans la conception d'architectures web résilientes et la maintenance de réseaux hautement sécurisés.",
  experiences: [
    {
      id: uid(),
      role: "Développeur full stack",
      company: "Messagem, Paris, France",
      start: "Février 2017",
      end: "Présent",
      bullets: [
        "Développement et maintenance d'applications web scalables à fort trafic.",
        "Collaboration étroite avec les équipes de design pour créer des interfaces utilisateur intuitives.",
        "Optimisation poussée des performances des applications et résolution des goulots d'étranglement.",
        "Mise en place de suites de tests automatisés (unitaires et e2e) garantissant zéro régression.",
      ],
    },
    {
      id: uid(),
      role: "Administrateur système et réseau",
      company: "Audio Stream - Lyon, France",
      start: "Août 2013",
      end: "Janvier 2017",
      bullets: [
        "Gestion quotidienne des infrastructures réseaux et des parcs de serveurs virtualisés.",
        "Déploiement et supervision des politiques de sécurité et pare-feux d'entreprise.",
        "Surveillance 24/7 des performances système et résolution rapide des incidents techniques critiques.",
        "Participation à la planification et à la mise en œuvre de projets d'infrastructure cloud.",
      ],
    },
  ],
  education: [
    {
      id: uid(),
      degree: "Master en Informatique",
      school: "École Amédé Autran, Paris, France",
      start: "2010",
      end: "2012",
    },
    {
      id: uid(),
      degree: "Licence en Informatique",
      school: "École Amédé Autran, Paris, France",
      start: "2007",
      end: "2010",
    },
  ],
  skills: [
    "Langages de programmation (JavaScript, Python, C++)",
    "Bases de données relationnelles & NoSQL",
    "Systèmes d'exploitation Linux & Windows Server",
    "Réseaux, sécurité & virtualisation Docker",
    "Excellentes compétences en résolution de problèmes et dépannage",
  ],
  languages: [
    "Français — langue maternelle",
    "Anglais — courant C1",
    "Espagnol — intermédiaire B1",
  ],
  interests: [
    "Veille technologique & Open Source",
    "Photographie de paysage",
    "Lecture scientifique",
  ],
};

export const sampleAdelineCapsule: CV = {
  personal: {
    name: "Adeline Palmerston",
    email: "hello@reallygreatsite.com",
    phone: "+123-456-7890",
    location: "123 Anywhere St., Any City",
    link: "www.reallygreatsite.com",
  },
  title: "Graphic Designer",
  summary:
    "Directrice artistique et designer graphique polyvalente avec plus de 8 années d'expérience en agence créative et en studio. Experte en identité de marque, design éditorial et création d'expériences utilisateur mémorables.",
  experiences: [
    {
      id: uid(),
      role: "Lead Graphic Designer",
      company: "Aldenaire & Partners",
      start: "Jan 2021",
      end: "Présent",
      bullets: [
        "Direction artistique de campagnes de communication à 360° pour des marques de luxe et d'art de vivre.",
        "Supervision d'une équipe de 5 designers juniors et stagiaires.",
        "Refonte complète de l'identité visuelle de 6 grandes entreprises internationales.",
      ],
    },
    {
      id: uid(),
      role: "Senior Graphic Designer",
      company: "Warner & Spencer",
      start: "Jan 2020",
      end: "Dec 2020",
      bullets: [
        "Conception de chartes graphiques, packaging produits et supports imprimés haut de gamme.",
        "Création d'actifs visuels pour les campagnes digitales ayant augmenté l'engagement de 42 %.",
      ],
    },
    {
      id: uid(),
      role: "Junior Graphic Designer",
      company: "Ingoude Company",
      start: "Jan 2017",
      end: "Dec 2019",
      bullets: [
        "Création d'illustrations vectorielles, bannières web et typographies sur mesure.",
        "Préparation méticuleuse des fichiers d'exécution pour l'impression offset et numérique.",
      ],
    },
  ],
  education: [
    {
      id: uid(),
      degree: "Master of Design",
      school: "Really Great University — Any City",
      start: "2016",
      end: "2020",
    },
    {
      id: uid(),
      degree: "Bachelor of Design",
      school: "Really Great University — Any City",
      start: "2012",
      end: "2016",
    },
  ],
  skills: [
    "Adobe Creative Cloud (Photoshop, Illustrator, InDesign)",
    "Figma & Prototypage UX/UI",
    "Direction artistique & Branding",
    "Typographie & Design éditorial",
    "Créativité & Respect des délais",
    "Esprit d'équipe & Communication",
  ],
  languages: [
    "Anglais — bilingue",
    "Français — courant",
    "Espagnol — intermédiaire",
  ],
  interests: [
    "Design typographique",
    "Expositions d'art contemporain",
    "Céramique et arts appliqués",
  ],
};

export const sampleMap: Record<TemplateId, CV> = {
  "french-blue": sampleFrenchBlue,
  "emerald-tech": sampleEmeraldTech,
  "juriste-navy": sampleJuristeNavy,
  "alfred-bold": sampleAlfredBold,
  "adeline-capsule": sampleAdelineCapsule,
};

export const samples = [
  { id: "emerald-tech", label: "Développeur Web & Mobile (Émeraude)", cv: sampleEmeraldTech },
  { id: "juriste-navy", label: "Juriste & Cadre (Navy & Or)", cv: sampleJuristeNavy },
  { id: "alfred-bold", label: "Informaticien (Bold Minimal)", cv: sampleAlfredBold },
  { id: "adeline-capsule", label: "Designer Graphique (Capsules)", cv: sampleAdelineCapsule },
];