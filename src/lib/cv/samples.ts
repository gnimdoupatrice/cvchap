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
        "Réduction de 28 % du délai de mise en production grâce à la rationalisation des cycles de sprint.",
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
  ],
  skills: [
    "Gestion de projet Agile (Scrum / Kanban)",
    "Planification stratégique & Roadmap",
    "Conduite du changement",
    "Gestion budgétaire & ROI",
    "Jira · Confluence · Asana",
  ],
  languages: [
    "Français — langue maternelle",
    "Anglais — courant C1",
    "Espagnol — professionnel B2",
  ],
  interests: [
    "Voyages & immersion culturelle",
    "Course à pied (semi-marathon)",
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
        "Plateforme professionnelle complète pour un cabinet d'avocats togolais : domaines d'expertise, profils des associés, prise de rendez-vous en ligne et actualités juridiques. Stack : React, Tailwind CSS, Vercel.",
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
        "Animation des formations sur la rédaction des documents administratifs.",
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
        "Coordination opérationnelle de campagnes de reboisement communautaire.",
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
  ],
  skills: [
    "Droit de l'environnement",
    "Veille réglementaire environnementale",
    "Rédaction d'actes juridiques et conventions",
    "ODD et cadres multilatéraux",
    "Finance climat et économie verte",
    "Gestion de partenariats multi-acteurs",
    "Compostage, bokashi",
    "Plaidoyer environnemental",
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
      text: "La formation juridique m'a permis de développer une approche structurée de la gestion de projet.",
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
        "Optimisation poussée des performances des applications.",
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
  ],
  skills: [
    "Langages (JavaScript, Python, C++)",
    "Bases relationnelles & NoSQL",
    "Systèmes Linux & Windows Server",
    "Réseaux, sécurité & Docker",
  ],
  languages: [
    "Français — langue maternelle",
    "Anglais — courant C1",
    "Espagnol — intermédiaire B1",
  ],
  interests: ["Veille technologique & Open Source", "Photographie", "Lecture scientifique"],
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
        "Direction artistique de campagnes de communication à 360° pour des marques de luxe.",
        "Supervision d'une équipe de 5 designers juniors.",
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
  ],
  skills: [
    "Adobe Creative Cloud",
    "Figma & Prototypage UX/UI",
    "Direction artistique & Branding",
    "Typographie & Édition",
  ],
  languages: ["Anglais — bilingue", "Français — courant", "Espagnol — intermédiaire"],
  interests: ["Design typographique", "Expositions d'art contemporain"],
  references: [
    {
      name: "Alfredo Torres",
      company: "Directeur, Aldenaire & Partners",
      contact: "+123-456-7890",
    },
  ],
};

export const sampleMichaelHenson: CV = {
  personal: {
    name: "Michael Henson",
    email: "hello@reallygreatsite.com",
    phone: "+123-456-7890",
    location: "123 Anywhere St., Any City",
    link: "reallygreatsite.com",
  },
  title: "Commercial & Business Developer",
  summary:
    "Professionnel de la vente et du développement commercial avec 6 ans d'expérience dans l'acquisition de grands comptes, la négociation stratégique et la fidélisation client.",
  experiences: [
    {
      id: uid(),
      role: "Key Account Manager",
      company: "Giganet Telecom",
      start: "2021",
      end: "Présent",
      bullets: [
        "Croissance de +35 % du chiffre d'affaires sur le portefeuille grands comptes.",
        "Négociation de contrats cadres pluriannuels d'une valeur de plus de 2 M€.",
      ],
    },
  ],
  education: [
    {
      id: uid(),
      degree: "Master en Négociation Commerciale",
      school: "Business School Paris",
      start: "2017",
      end: "2019",
    },
  ],
  skills: [
    "Prospection B2B & Closing",
    "Gestion de portefeuille grands comptes",
    "CRM Salesforce & HubSpot",
    "Négociation contractuelle",
  ],
  languages: ["Français — langue maternelle", "Anglais — courant C1"],
  interests: ["Golf", "Économie internationale"],
};

export const sampleElviraMontanez: CV = {
  personal: {
    name: "Dr. Elvira Montanez, MD",
    email: "elvira.montanez@hospital.org",
    phone: "+1 555 019 2834",
    location: "Chicago, IL, États-Unis",
    link: "drelviramontanez.com",
  },
  title: "Médecin Spécialiste & Santé Publique",
  summary:
    "Praticienne hospitalière engagée avec plus de 9 ans d'expertise clinique, de coordination d'unités de soins intensifs et d'enseignement médical.",
  experiences: [
    {
      id: uid(),
      role: "Praticien Hospitalier Titulaire",
      company: "Chicago Central Hospital",
      start: "2019",
      end: "Présent",
      bullets: [
        "Coordination d'un service de 28 lits et encadrement de 6 internes.",
        "Mise en place de protocoles de soins réduisant les durées moyennes de séjour.",
      ],
    },
  ],
  education: [
    {
      id: uid(),
      degree: "Doctorat d'État en Médecine (MD)",
      school: "University of Illinois College of Medicine",
      start: "2010",
      end: "2016",
    },
  ],
  skills: [
    "Prise en charge clinique d'urgence",
    "Recherche translationnelle",
    "Coordination d'équipes soignantes",
    "Audit qualité hospitalier",
  ],
  languages: [
    "Anglais — langue maternelle",
    "Espagnol — bilingue",
    "Français — intermédiaire B2",
  ],
  interests: ["Humanitaire médical", "Violoncelle"],
};

export const sampleEmmaBrooks: CV = {
  personal: {
    name: "Emma Brooks",
    email: "emma@brooksdesign.co",
    phone: "+44 20 7946 0912",
    location: "Londres, Royaume-Uni",
    link: "emmabrooks-interior.co.uk",
  },
  title: "Architecte d'Intérieur & Scénographe",
  summary:
    "Créatrice d'espaces habités alliant sensibilité des matières naturelles, optimisation de la lumière et intégration de concepts écologiques contemporains.",
  experiences: [
    {
      id: uid(),
      role: "Fondatrice & Directrice de Création",
      company: "Brooks Atelier Studio",
      start: "2020",
      end: "Présent",
      bullets: [
        "Conception et aménagement de plus de 30 résidences privées et boutiques haut de gamme.",
        "Gestion globale des chantiers de la phase esquisse jusqu'à la livraison finale.",
      ],
    },
  ],
  education: [
    {
      id: uid(),
      degree: "Master en Architecture d'Intérieur",
      school: "Royal College of Art, Londres",
      start: "2015",
      end: "2017",
    },
  ],
  skills: [
    "AutoCAD · SketchUp · Revit",
    "Conception de mobilier sur mesure",
    "Éco-conception & Matériaux biosourcés",
    "Suivi et coordination de chantier",
  ],
  languages: [
    "Anglais — langue maternelle",
    "Français — courant C1",
    "Italien — intermédiaire B1",
  ],
  interests: ["Céramique japonaise", "Design scandinave"],
};

export const sampleDrewFeig: CV = {
  personal: {
    name: "Drew Feig",
    email: "drew@feigmarketing.io",
    phone: "+1 415 889 0122",
    location: "San Francisco, CA",
    link: "drewfeig.marketing",
  },
  title: "Head of Growth & Performance Marketing",
  summary:
    "Leader marketing axé données avec 8 ans d'expérience dans la mise à l'échelle d'entreprises SaaS de 1 M$ à 25 M$ d'ARR. Expert en acquisition multicanale et optimisation du funnel de conversion.",
  experiences: [
    {
      id: uid(),
      role: "VP Marketing & Growth",
      company: "ScaleFlow Technologies",
      start: "2022",
      end: "Présent",
      bullets: [
        "Pilotage d'un budget d'acquisition digital annuel de 3,2 M$ avec un ROAS supérieur à 340 %.",
        "Direction d'une équipe de 8 spécialistes acquisition, SEO et content marketing.",
      ],
    },
  ],
  education: [
    {
      id: uid(),
      degree: "MBA in Strategic Marketing",
      school: "UC Berkeley Haas School of Business",
      start: "2016",
      end: "2018",
    },
  ],
  skills: [
    "Growth Hacking & Funnels",
    "Paid Search & Social Ads",
    "Analytics & Attribution (GA4, Mixpanel)",
    "Product-Led Growth (PLG)",
  ],
  languages: [
    "Anglais — bilingue (100%)",
    "Français — professionnel (80%)",
    "Allemand — notions (40%)",
  ],
  interests: ["Triathlon", "Angel Investing"],
  references: [
    {
      name: "Marcus Vance",
      company: "CEO, ScaleFlow Technologies",
      contact: "marcus@scaleflow.io",
    },
  ],
};

export const sampleMap: Record<TemplateId, CV> = {
  "french-blue": sampleFrenchBlue,
  "emerald-tech": sampleEmeraldTech,
  "juriste-navy": sampleJuristeNavy,
  "alfred-bold": sampleAlfredBold,
  "adeline-capsule": sampleAdelineCapsule,
  "sacha-dubois": sampleFrenchBlue,
  "michael-henson": sampleMichaelHenson,
  "elvira-montanez": sampleElviraMontanez,
  "emma-brooks": sampleEmmaBrooks,
  "drew-feig": sampleDrewFeig,
};

export const samples = [
  { id: "emerald-tech", label: "Développeur Web & Mobile (Émeraude)", cv: sampleEmeraldTech },
  { id: "juriste-navy", label: "Juriste & Cadre (Navy & Or)", cv: sampleJuristeNavy },
  { id: "alfred-bold", label: "Informaticien (Bold Minimal)", cv: sampleAlfredBold },
  { id: "adeline-capsule", label: "Designer Graphique (Capsules)", cv: sampleAdelineCapsule },
  { id: "sacha-dubois", label: "Management & Projets (Sacha)", cv: sampleFrenchBlue },
  { id: "michael-henson", label: "Commerce & Vente (Henson)", cv: sampleMichaelHenson },
  { id: "elvira-montanez", label: "Santé & Médical (Dr. Montanez)", cv: sampleElviraMontanez },
  { id: "emma-brooks", label: "Architecture (Brooks)", cv: sampleEmmaBrooks },
  { id: "drew-feig", label: "Dark Executive (Feig)", cv: sampleDrewFeig },
];
