import morton from "@/assets/cv/morton.jpg";
import sanchez from "@/assets/cv/sanchez.jpg";
import gallego from "@/assets/cv/gallego.jpg";
import martinez from "@/assets/cv/martinez.jpg";
import sanchezProduct from "@/assets/cv/sanchez-product.jpg";
import palmerston from "@/assets/cv/palmerston.jpg";
import { uid, type CV, type TemplateId } from "./types";

/* ==========================================================================
   Jeux de données d'exemple — un CV complet et réaliste par modèle.
   Chaque jeu est calibré pour remplir ~98 % de la première page A4.
   ========================================================================== */

export const sampleFrenchBlue: CV = {
  personal: {
    name: "Sacha Dubois",
    email: "hello@reallygreatsite.com",
    phone: "123-456-7890",
    location: "123 Anywhere St., Any City",
    link: "",
  },
  title: "Chargée de projet",
  summary:
    "Chargée de projet rigoureuse et fédératrice, je pilote des projets transverses de la planification à la livraison, en veillant au respect des délais, des budgets et de la qualité attendue.",
  experiences: [
    {
      id: uid(),
      role: "Chargée de Projet",
      company: "Really Great Company - Any City",
      start: "Depuis janvier",
      end: "2020",
      bullets: [
        "Élaboration du plan de projet et gestion des calendriers",
        "Gestion des ressources et du budget",
        "Gestion des risques (identification des risques, réaction aux imprévus)",
      ],
    },
    {
      id: uid(),
      role: "Assistante Chargée de Projet",
      company: "Really Great Company - Any City",
      start: "Septembre 2018",
      end: "Janvier 2020",
      bullets: [
        "Rédaction des rapports de progression",
        "Participation aux réunions de suivi de projet",
        "Suivi de l'avancement des projets en collaboration avec les équipes concernées",
      ],
    },
    {
      id: uid(),
      role: "Stagiaire Chargée de Projet",
      company: "Really Great Company - Any City",
      start: "Février 2018",
      end: "Juin 2018",
      bullets: [
        "Aide pour définir les objectifs et les périmètres du projet",
        "Participation à l'élaboration des plans de projet (échéanciers, jalons et livrables)",
      ],
    },
  ],
  education: [
    { id: uid(), degree: "Master en Management", school: "Really Great School - Any City", start: "2016", end: "2018" },
    { id: uid(), degree: "Licence en Gestion Administrative", school: "Really Great School - Any City", start: "2013", end: "2016" },
  ],
  skills: [
    "Gestion du temps",
    "Capacités d'organisation",
    "Communication",
    "Leadership",
    "Logiciels de gestion de projet",
    "Gestion de budget",
  ],
  languages: ["Anglais — courant (80%)", "Allemand — intermédiaire (55%)"],
  interests: ["Lecture", "Randonnée", "Gymnastique"],
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
      role: "Startup personnelle — Fondateur & développeur",
      company: "RECYC HUB TOGO",
      start: "2025",
      end: "Présent",
      bullets: [
        "Plateforme phygitale de gestion des déchets à Kara : rachat de plastiques au kilo (cash ou Mobile Money), enlèvement à domicile et signalement géolocalisé de dépotoirs sauvages.",
        "Volet B2B de pilotage de tournées pour les entreprises de pré-collecte. Stack : React, Tailwind CSS, Vercel.",
      ],
    },
    {
      id: uid(),
      role: "Projet client",
      company: "Cabinet d'Avocats Essognim ASSI",
      start: "2025",
      end: "2026",
      bullets: [
        "Plateforme professionnelle complète : domaines d'expertise, profils des associés, prise de rendez-vous en ligne et actualités juridiques.",
        "Optimisation SEO et accessibilité. Stack : React, Tailwind CSS, Vercel.",
      ],
    },
    {
      id: uid(),
      role: "Projet associatif",
      company: "Plateforme CAJS Kara",
      start: "2025",
      end: "2026",
      bullets: [
        "Site institutionnel du Centre d'Actions Juridiques et Sociales : programmes, actualités, formulaire de signalement et espace partenaires.",
      ],
    },
    {
      id: uid(),
      role: "Portfolio personnel",
      company: "Portfolio — Juriste et Développeur",
      start: "2025",
      end: "2026",
      bullets: [
        "Site vitrine présentant le double profil droit de l'environnement / développement web, publications juridiques et contact direct. Stack : HTML5, CSS3, JavaScript.",
      ],
    },
  ],
  education: [
    {
      id: uid(),
      degree: "Certificat Développeur Web et Mobile",
      school: "Institut Supérieur de Management et du Bâtiment (ISMB) — Kara",
      start: "2025",
      end: "2026",
    },
    {
      id: uid(),
      degree: "Master I en Droit — Justice et Droit du Procès",
      school: "Faculté de Droit et des Sciences Politiques, Université de Kara",
      start: "2024",
      end: "2025",
    },
    {
      id: uid(),
      degree: "Licence en Droit Public",
      school: "Université de Kara",
      start: "2021",
      end: "2023",
    },
  ],
  skills: [
    "HTML5 / CSS3",
    "JavaScript (ES6+)",
    "React / Next.js",
    "Tailwind CSS",
    "React Native / Flutter",
    "Git / GitHub",
    "Déploiement Vercel",
    "Responsive Design",
    "Outils IA & No-Code",
    "Accessibilité Web",
  ],
  languages: [
    "Français — courant (95%)",
    "Anglais — notions (40%)",
    "Kotokoli — maternelle (100%)",
    "Kabiyè — oral (70%)",
    "Éwé — oral (60%)",
  ],
  interests: [
    "Agroécologie & environnement",
    "Droit du numérique et IA",
    "Vulgarisation technologique",
  ],
  highlights: [
    { title: "Rigueur juridique appliquée au code", text: "" },
    { title: "Gestion de projet de bout en bout", text: "" },
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
    "Juriste environnementaliste fort de trois années d'expérience en tant que coordonnateur du département Environnement et ODD au Centre d'Actions Juridiques et Sociales (CAJS Kara), je suis passionné par la transition écologique, l'agriculture durable et le développement communautaire. J'accompagne les collectivités et les organisations dans la mise en conformité réglementaire et la conduite de projets à impact.",
  experiences: [
    {
      id: uid(),
      role: "Coordonnateur Département Environnement et ODD",
      company: "Centre d'Actions Juridiques et Sociales (CAJS) — Kara, Togo",
      start: "2023",
      end: "Présent",
      bullets: [
        "Coordination et encadrement des stagiaires du département.",
        "Animation des formations sur la rédaction des documents administratifs.",
        "Animation d'ateliers sur la rédaction de projets et de termes de référence.",
        "Monitoring des droits humains et rédaction de rapports trimestriels.",
      ],
    },
    {
      id: uid(),
      role: "Programme Green Week — Plaidoyer et Action Climat",
      company: "CAJS Kara & partenaires communautaires",
      start: "2023",
      end: "Présent",
      bullets: [
        "Animation d'ateliers de renforcement de capacités sur les techniques de reboisement et d'entretien des plants.",
        "Coordination opérationnelle de campagnes de reboisement communautaire.",
        "Sensibilisation des jeunes au compostage et au bokashi.",
      ],
    },
    {
      id: uid(),
      role: "Stagiaire juriste",
      company: "Clinique juridique — Université de Kara",
      start: "2022",
      end: "2023",
      bullets: [
        "Accueil, écoute et orientation juridique des justiciables.",
        "Recherche documentaire et rédaction de notes juridiques.",
      ],
    },
  ],
  education: [
    { id: uid(), degree: "Master I Justice et Droit du Procès", school: "Université de Kara", start: "2024", end: "2025" },
    { id: uid(), degree: "Licence Droit Public", school: "Université de Kara", start: "2021", end: "2023" },
    { id: uid(), degree: "Certificat Développeur Web et Mobile", school: "ISMB — Kara", start: "2025", end: "2026" },
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
    "Kotokoli — oral (43%)",
    "Kabiyè — oral (43%)",
    "Éwé — oral (43%)",
  ],
  interests: ["Environnement & développement durable", "Agroécologie", "Lecture"],
  highlights: [
    { title: "Rigueur méthodologique", text: "" },
    { title: "Animation & pédagogie", text: "" },
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
    "Développeur full-stack et administrateur système rigoureux, passionné par la robustesse des infrastructures et la fluidité des interfaces. Plus de dix ans d'expérience dans la conception d'architectures web résilientes et la maintenance de réseaux hautement sécurisés.",
  experiences: [
    {
      id: uid(),
      role: "Développeur full stack",
      company: "Messagem, Paris, France",
      start: "Février 2017",
      end: "Présent",
      bullets: [
        "Développement et maintenance d'applications web à fort trafic.",
        "Collaboration avec les équipes de conception pour créer des interfaces utilisateur intuitives.",
        "Optimisation des performances et réduction de 40 % des temps de chargement.",
      ],
    },
    {
      id: uid(),
      role: "Administrateur système et réseau",
      company: "Audio Stream, Lyon, France",
      start: "Août 2013",
      end: "Janvier 2017",
      bullets: [
        "Gestion des infrastructures réseau et des serveurs virtualisés.",
        "Mise en place des politiques de sécurité et des pare-feux d'entreprise.",
        "Support technique de niveau 2 auprès de 250 collaborateurs.",
      ],
    },
    {
      id: uid(),
      role: "Technicien informatique",
      company: "Datacom Services, Lyon, France",
      start: "Septembre 2012",
      end: "Juillet 2013",
      bullets: [
        "Installation et configuration des postes de travail et périphériques.",
        "Diagnostic et résolution des incidents matériels et logiciels.",
      ],
    },
  ],
  education: [
    { id: uid(), degree: "Master en Informatique", school: "École Amédé Autran, Paris", start: "2010", end: "2012" },
    { id: uid(), degree: "Licence en Informatique", school: "Université Lumière, Lyon", start: "2007", end: "2010" },
  ],
  skills: [
    "Langages de programmation (JavaScript, Python, C++)",
    "Bases de données SQL & NoSQL",
    "Systèmes d'exploitation Linux & Windows Server",
    "Réseaux, sécurité & Docker",
    "Excellentes compétences en résolution de problèmes et en dépannage",
  ],
  languages: ["Français — langue maternelle", "Anglais — courant", "Espagnol — intermédiaire"],
  interests: ["Technologie", "Photographie", "Lecture"],
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
    "Designer graphique polyvalente avec plus de huit années d'expérience en agence et en studio. Experte en identité de marque, design éditorial et création d'expériences visuelles mémorables, je transforme les objectifs de mes clients en univers graphiques cohérents et impactants.",
  experiences: [
    {
      id: uid(),
      role: "Lead Graphic Designer",
      company: "Aldenaire & Partners",
      start: "2021",
      end: "Présent",
      bullets: [
        "Direction artistique de campagnes de communication à 360° pour des marques premium.",
        "Supervision et accompagnement d'une équipe de 5 designers juniors.",
        "Création de chartes graphiques complètes pour 12 nouveaux clients.",
      ],
    },
    {
      id: uid(),
      role: "Graphic Designer",
      company: "Borcelle Studio",
      start: "2018",
      end: "2021",
      bullets: [
        "Conception d'identités visuelles, packagings et supports imprimés.",
        "Collaboration étroite avec les équipes marketing et les clients.",
        "Production de visuels pour les réseaux sociaux et le web.",
      ],
    },
    {
      id: uid(),
      role: "Junior Graphic Designer",
      company: "Fauget Agency",
      start: "2016",
      end: "2018",
      bullets: [
        "Mise en page de catalogues, brochures et rapports annuels.",
        "Retouche photo et préparation des fichiers pour l'impression.",
      ],
    },
  ],
  education: [
    { id: uid(), degree: "Master of Design", school: "Really Great University", start: "2014", end: "2016" },
    { id: uid(), degree: "Bachelor of Fine Arts", school: "Wardiere University", start: "2011", end: "2014" },
  ],
  skills: [
    "Adobe Creative Cloud",
    "Figma & prototypage UX/UI",
    "Direction artistique",
    "Identité de marque",
    "Typographie & édition",
    "Motion design",
    "Gestion de projet créatif",
  ],
  languages: ["Anglais — bilingue", "Français — courant", "Espagnol — intermédiaire"],
  interests: ["Design typographique", "Art contemporain"],
  references: [
    { name: "Alfredo Torres", company: "Directeur, Aldenaire & Partners", contact: "+123-456-7890" },
    { name: "Harumi Kobayashi", company: "CEO, Borcelle Studio", contact: "hello@reallygreatsite.com" },
  ],
};

export const sampleMichaelHenson: CV = {
  personal: {
    name: "Michael Henson",
    email: "hello@reallygreatsite.com",
    phone: "+123-456-7890",
    location: "123 Anywhere St., Any City",
    link: "www.reallygreatsite.com",
  },
  title: "Sales Representative",
  summary:
    "Commercial expérimenté qui initie et entretient des relations durables avec les clients. Interlocuteur privilégié, j'accompagne chaque client du premier contact jusqu'à la signature, avec une approche fondée sur l'écoute, la négociation et le suivi.",
  experiences: [
    {
      id: uid(),
      role: "Sales Representative",
      company: "Timmerman Industries",
      start: "2020",
      end: "2023",
      bullets: [
        "Offre de packages de biens de consommation aux entreprises et clients.",
        "Rencontres trimestrielles avec les clients pour mettre à jour les services.",
        "Formation des commerciaux juniors.",
      ],
    },
    {
      id: uid(),
      role: "FMCG Sales Agent",
      company: "Timmerman Industries",
      start: "2017",
      end: "2019",
      bullets: [
        "Visites des bureaux clients pour présenter les derniers produits.",
        "Relations clients durables pour atteindre les objectifs de vente.",
      ],
    },
    {
      id: uid(),
      role: "Sales Agent",
      company: "Timmerman Industries",
      start: "2014",
      end: "2017",
      bullets: [
        "Prospection de nouveaux comptes entreprises.",
        "Renouvellement trimestriel des contrats de service.",
      ],
    },
  ],
  education: [
    { id: uid(), degree: "Bachelor of Business Management", school: "Borcelle University", start: "2016", end: "2020" },
    { id: uid(), degree: "Bachelor of Business Management", school: "Wardiere University", start: "2012", end: "2016" },
  ],
  skills: [
    "Client Acquisition",
    "B2B Sales",
    "Negotiation",
    "Relationship Management",
    "Market Analysis",
    "Problem-Solving",
    "Time Management",
    "Networking",
  ],
  languages: ["English — native", "German — basic"],
  interests: ["Golf", "Économie internationale"],
  references: [
    { name: "Bailey Dupont", company: "Wardiere Inc. / CEO", contact: "123-456-7890" },
    { name: "Harumi Kobayashi", company: "Wardiere Inc. / CEO", contact: "123-456-7890" },
  ],
};

export const sampleElviraMontanez: CV = {
  personal: {
    name: "Dr. Elvira Montanez, MD",
    email: "hello@reallygreatsite.com",
    phone: "+123-456-7890",
    location: "www.reallygreatsite.com",
    link: "linkedin.com/in/name",
  },
  title: "Geriatric Medicine",
  summary:
    "Médecin gériatre attentive et engagée, spécialisée dans la prise en charge globale des patients âgés, les soins palliatifs et la prévention en santé publique.",
  experiences: [
    {
      id: uid(),
      role: "Physician",
      company: "East Forge Medical",
      start: "Mars 2022",
      end: "Août 2025",
      bullets: [
        "Supervision des médecins en formation, en hausse annuelle de 30 %.",
        "Éducation sanitaire du public : baisse de 5 % des grippes sévères.",
        "Dossiers médicaux complets : efficacité améliorée de 30 %.",
      ],
    },
    {
      id: uid(),
      role: "Resident Physician",
      company: "Roseton General Hospital",
      start: "2021",
      end: "2022",
      bullets: [
        "Prise en charge de 20 patients gériatriques par jour.",
        "Participation aux réunions pluridisciplinaires de soins palliatifs.",
      ],
    },
  ],
  education: [
    { id: uid(), degree: "Doctor of Medicine", school: "University of Roseton", start: "", end: "Class of 2021" },
    { id: uid(), degree: "Bachelor of Science in Human Biology", school: "De Loureigh University", start: "", end: "Class of 2015" },
  ],
  skills: [
    "Hospice and Palliative Care",
    "Rheumatology",
    "Geriatric Medicine",
    "Chronic Disease Management",
    "Patient Education",
  ],
  languages: ["English — native", "Spanish — fluent"],
  interests: [],
  highlights: [
    { title: "Member, Society of Hospice and Palliative Medicine", text: "2022 to Present" },
    { title: "Volunteer Physician, Lily River Children's Foundation", text: "2021" },
  ],
};

export const sampleEmmaBrooks: CV = {
  personal: {
    name: "Emma Brooks",
    email: "hello@reallygreatsite.com",
    phone: "+123-456-7890",
    location: "123 Anywhere St., Any City",
    link: "",
  },
  title: "Interior Architect",
  summary:
    "Architecte d'intérieur forte de 9 ans d'expérience dans la conception d'espaces hôteliers, professionnels et résidentiels. Je crée des environnements fonctionnels qui concilient besoins des usagers, caractère des matériaux et objectifs commerciaux.",
  experiences: [
    {
      id: uid(),
      role: "Senior Interior Architect",
      company: "Innovation Systems",
      start: "2022",
      end: "Present",
      bullets: [
        "Pilotage du développement des concepts et de la livraison des projets hôteliers et tertiaires. Coordination d'équipes pluridisciplinaires, de la planification à la réception.",
      ],
    },
    {
      id: uid(),
      role: "Interior Architect",
      company: "Collab Studio",
      start: "2019",
      end: "2022",
      bullets: [
        "Conception d'espaces de travail et d'intérieurs hôteliers : plans d'aménagement, concepts matériaux et dossiers techniques. Réduction de 21 % des déchets de chantier.",
      ],
    },
    {
      id: uid(),
      role: "Junior Designer",
      company: "Creative Collective",
      start: "2016",
      end: "2019",
      bullets: [
        "Plans d'aménagement, présentations, documentation et concepts mobilier pour des intérieurs résidentiels et commerciaux.",
      ],
    },
  ],
  education: [
    { id: uid(), degree: "MA Interior Architecture", school: "Northbridge University", start: "", end: "2016" },
    { id: uid(), degree: "BA Spatial Design", school: "Westbrook College", start: "", end: "2014" },
  ],
  skills: [
    "Concept Development",
    "Space Planning",
    "Material Strategy",
    "Design Documentation",
    "Site Coordination",
    "Client Presentation",
  ],
  languages: ["English — Native", "Spanish — Professional", "Italian — Conversational"],
  interests: [],
  certifications: ["Hotel", "Creative Workplace", "Private Residence"],
};

export const sampleDrewFeig: CV = {
  personal: {
    name: "Drew Feig",
    email: "hello@reallygreatsite.com",
    phone: "+123-456-7890",
    location: "123 Anywhere St., Any City",
    link: "",
  },
  title: "Marketing Manager",
  summary:
    "Responsable marketing orienté résultats, je conçois et pilote des stratégies d'acquisition et de marque qui transforment l'audience en clients fidèles. J'allie créativité, analyse de données et leadership pour faire grandir les équipes et les marques que j'accompagne.",
  experiences: [
    {
      id: uid(),
      role: "Marketing Manager",
      company: "Borcelle Company",
      start: "2020",
      end: "2024",
      bullets: [
        "Pilotage de la stratégie marketing multicanale et d'un budget annuel de 1,2 M€. Hausse de 45 % des leads qualifiés et encadrement d'une équipe de 6 personnes.",
      ],
    },
    {
      id: uid(),
      role: "Digital Marketing Specialist",
      company: "Fauget Agency",
      start: "2017",
      end: "2020",
      bullets: [
        "Gestion des campagnes SEA et réseaux sociaux pour 15 clients. Optimisation des parcours utilisateurs et des tunnels de conversion (+28 % de conversion).",
      ],
    },
  ],
  education: [
    { id: uid(), degree: "Master in Marketing Management", school: "Wardiere University", start: "", end: "2017" },
    { id: uid(), degree: "Bachelor of Communication", school: "Borcelle University", start: "", end: "2015" },
  ],
  skills: ["UI/UX", "User flow", "Process flow", "Visual design", "Leadership", "Coaching"],
  languages: ["Spanish — native (100%)", "English — fluent (85%)"],
  interests: [],
  references: [{ name: "Lorna Alvarado", company: "CEO, Borcelle Company", contact: "Phone : +123-456-7890" }],
};


const contact = { email: "hello@reallygreatsite.com", phone: "+123-456-7890", location: "123 Anywhere St., Any City" };

export const sampleDanielMorton: CV = {
  personal: { name: "Daniel Morton", ...contact, link: "@reallygreatsite", photo: morton },
  title: "Design Graphic",
  summary: "Motivated and detail-oriented fresh graduate with a strong passion for learning, professional growth, and continuous improvement. Possesses excellent communication, organizational, and problem-solving abilities, with the capability to work effectively both independently and within a team.",
  experiences: [{ id: uid(), role: "Business Development Project", company: "", start: "", end: "", bullets: ["Collaborated with a team to identify business opportunities and develop strategic recommendations for sustainable growth."] }],
  education: [{ id: uid(), degree: "Bachelor of Business Administration", school: "North Primary School", start: "2023", end: "2025" }],
  skills: ["Communication", "Teamwork", "Leadership", "Time Management", "Critical Thinking"],
  languages: [],
  interests: ["Research & Data Analysis", "Digital Content Creation"],
  highlights: [
    { title: "Professional Development", text: "Completed training focused on workplace readiness, communication, and professional growth." },
    { title: "Management Fundamentals", text: "Completed foundational training in project planning, organization, and execution." },
  ],
  certifications: ["Academic Excellence Recognition", "Outstanding Team Project Award", "Leadership Participation Recognition"],
};

export const sampleRichardSanchez: CV = {
  personal: { name: "Richard Sanchez", ...contact, link: "www.reallygreatsite.com", photo: sanchez },
  title: "Marketing Manager",
  summary: "Marketing manager with a proven record of building brands and leading high-performing teams. I design data-driven campaigns that align with business goals, grow qualified audiences and keep brand messaging consistent across every channel.",
  experiences: [
    { id: uid(), role: "Marketing Manager & Specialist", company: "Borcelle Studio", start: "2030", end: "Present", bullets: ["Develop and execute comprehensive marketing strategies and campaigns that align with the company's goals and objectives.", "Lead, mentor, and manage a high-performing marketing team, fostering a collaborative and results-driven work environment.", "Monitor brand consistency across marketing channels and materials."] },
    { id: uid(), role: "Marketing Manager & Specialist", company: "Fauget Studio", start: "2025", end: "2029", bullets: ["Create and manage the marketing budget, ensuring efficient allocation of resources and optimizing ROI.", "Oversee market research to identify emerging trends, customer needs, and competitor strategies.", "Monitor brand consistency across marketing channels and materials."] },
  ],
  education: [
    { id: uid(), degree: "Master of Business Management", school: "Wardiere University", start: "2029", end: "2030" },
    { id: uid(), degree: "Bachelor of Business · GPA 3.8 / 4.0", school: "Wardiere University", start: "2025", end: "2029" },
  ],
  skills: ["Project Management", "Public Relations", "Teamwork", "Time Management", "Leadership", "Effective Communication", "Critical Thinking"],
  languages: [],
  interests: [],
  references: [
    { name: "Estelle Darcy", company: "Wardiere Inc. / CTO", contact: "123-456-7890" },
    { name: "Harper Richard", company: "Wardiere Inc. / CEO", contact: "123-456-7890" },
  ],
};

export const sampleDanielGallego: CV = {
  personal: { name: "Daniel Gallego", ...contact, link: "www.reallygreatsite.com", photo: gallego },
  title: "Graphic Designer",
  summary: "Creative and detail-oriented graphic designer with over 5 years of experience creating visual solutions for brands and businesses. Passionate about transforming ideas into impactful designs while maintaining strong attention to detail and aesthetics.",
  experiences: [
    { id: uid(), role: "Graphic Designer", company: "Arowwai Industries", start: "2022", end: "Present", bullets: ["Designed marketing materials for digital and print campaigns", "Developed branding concepts for small and medium businesses", "Collaborated with marketing teams to create engaging visual content"] },
    { id: uid(), role: "Junior Graphic Designer", company: "Studio Shodwe", start: "2020", end: "2022", bullets: ["Assisted senior designers in creating advertising materials", "Designed social media graphics and promotional content", "Maintained brand consistency across different platforms"] },
  ],
  education: [
    { id: uid(), degree: "Bachelor of Graphic Design", school: "University Borcelle", start: "2018", end: "2022" },
    { id: uid(), degree: "High School Diploma", school: "Borcelle institute", start: "2015", end: "2018" },
  ],
  skills: ["Problem Solving", "Creative Thinking", "Adaptability", "Team Collaboration", "Time Management"],
  languages: ["English", "German", "Spanish"],
  interests: [],
  references: [{ name: "Marceline Anderson", company: "Creative Director Arowwai Industries", contact: "123-456-7890 · hello@reallygreatsite.com" }],
};

export const sampleDaniMartinez: CV = {
  personal: { name: "Dani Martinez", ...contact, link: "", photo: martinez },
  title: "Marketing Manager",
  summary: "Marketing manager focused on brand growth and measurable results. I combine creativity, digital strategy and negotiation to lead teams and deliver campaigns that convert.",
  experiences: [
    { id: uid(), role: "Sydney - Australia", company: "Arowwai Industries", start: "2020", end: "2022", bullets: ["Led multichannel campaigns and grew qualified leads while coordinating creative, sales and digital teams around shared objectives."] },
    { id: uid(), role: "Sydney - Australia", company: "Wardiere Inc.", start: "2016", end: "2020", bullets: ["Managed brand positioning and partnerships, negotiating key agreements and improving campaign return on investment."] },
    { id: uid(), role: "Sydney - Australia", company: "Studio Showde", start: "2010", end: "2015", bullets: ["Produced digital marketing content and analysed audience data to refine messaging and strengthen customer engagement."] },
  ],
  education: [
    { id: uid(), degree: "Bachelor of Business Management", school: "Borcelle University", start: "2020", end: "2023" },
    { id: uid(), degree: "Master of Business Management", school: "Borcelle University", start: "2016", end: "2020" },
  ],
  skills: ["Management Skills", "Creativity", "Digital Marketing", "Negotiation", "Critical Thinking", "Leadership"],
  languages: ["English", "German (basic)"],
  interests: [],
  certifications: ["Oct 2019 | Ingoude Company — The Best Employee of the Year"],
  references: [
    { name: "Bailey Dupont", company: "Wardiere Inc. / CEO", contact: "123-456-7890 · hello@reallygreatsite.com" },
    { name: "Harumi Kobayashi", company: "Wardiere Inc. / CEO", contact: "123-456-7890 · hello@reallygreatsite.com" },
  ],
};

export const sampleSanchezProduct: CV = {
  personal: { name: "Richard Sanchez", email: "hello@reallygreatsite.com", phone: "+123-456-7890", location: "123 Anywhere St., Any City", link: "", photo: sanchezProduct },
  title: "Product Designer",
  summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet quam rhoncus, egestas dui eget, malesuada justo. Ut aliquam augue dui.",
  experiences: [
    { id: uid(), company: "Arowwai Industries", role: "Sydney - Australia", start: "2020", end: "2022", bullets: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet quam rhoncus, egestas dui eget, malesuada justo. Ut aliquam augue."] },
    { id: uid(), company: "Wardiere Inc.", role: "Sydney - Australia", start: "2016", end: "2020", bullets: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet quam rhoncus, egestas dui eget, malesuada justo. Ut aliquam augue."] },
    { id: uid(), company: "Studio Showde", role: "Sydney - Australia", start: "2010", end: "2015", bullets: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet quam rhoncus, egestas dui eget, malesuada justo. Ut aliquam augue."] },
  ],
  education: [
    { id: uid(), school: "Borcelle University", degree: "Bachelor of Business Management", start: "2014", end: "2023" },
    { id: uid(), school: "Borcelle University", degree: "Master of Business Management", start: "2014", end: "2018" },
  ],
  skills: ["Management Skills", "Creativity", "Digital Marketing", "Negotiation", "Critical Thinking", "Leadership"],
  languages: ["English", "Germany (basic)", "Spain (basic)"],
  interests: [],
  highlights: [{ title: "Design Process", text: "78" }, { title: "Project Management", text: "81" }],
};

export const sampleAdelinePalmerston: CV = {
  personal: { name: "Adeline Palmerston", email: "hello@reallygreatsite.com", phone: "+123-456-7890", location: "123 Anywhere Street., Any City", link: "", photo: palmerston },
  title: "Graphics Designer",
  summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum.",
  experiences: [
    { id: uid(), role: "Senior Graphic Designer", company: "Fauget studio", start: "2020", end: "2024", bullets: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet."] },
    { id: uid(), role: "Senior Graphic Designer", company: "larana, inc", start: "2017", end: " 2019", bullets: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet."] },
  ],
  education: [
    { id: uid(), school: "Wardiere University", degree: "Bachelor of Design", start: "2011", end: "2015", note: "3.65" },
    { id: uid(), school: "Wardiere University", degree: "Bachelor of Design", start: "2014", end: "2019", note: "3.99" },
  ],
  skills: ["Web Design", "Branding", "Graphic Design", "SEO", "Marketing"],
  languages: ["English", "French"],
  interests: [],
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
  "daniel-morton": sampleDanielMorton,
  "richard-sanchez": sampleRichardSanchez,
  "daniel-gallego": sampleDanielGallego,
  "dani-martinez": sampleDaniMartinez,
  "sanchez-product": sampleSanchezProduct,
  "adeline-palmerston": sampleAdelinePalmerston,
};

export const samples = [
  { id: "emerald-tech", label: "Développeur Web & Mobile", cv: sampleEmeraldTech },
  { id: "juriste-navy", label: "Juriste & Cadre ODD", cv: sampleJuristeNavy },
  { id: "alfred-bold", label: "Informaticien", cv: sampleAlfredBold },
  { id: "adeline-capsule", label: "Designer Graphique", cv: sampleAdelineCapsule },
  { id: "sacha-dubois", label: "Chargée de projet", cv: sampleFrenchBlue },
  { id: "michael-henson", label: "Commercial", cv: sampleMichaelHenson },
  { id: "elvira-montanez", label: "Médecin", cv: sampleElviraMontanez },
  { id: "emma-brooks", label: "Architecte d'intérieur", cv: sampleEmmaBrooks },
  { id: "drew-feig", label: "Marketing Manager", cv: sampleDrewFeig },
  { id: "daniel-morton", label: "Jeune diplômé", cv: sampleDanielMorton },
  { id: "richard-sanchez", label: "Responsable marketing", cv: sampleRichardSanchez },
  { id: "daniel-gallego", label: "Graphiste", cv: sampleDanielGallego },
  { id: "dani-martinez", label: "Manager", cv: sampleDaniMartinez },
  { id: "sanchez-product", label: "Product Designer", cv: sampleSanchezProduct },
  { id: "adeline-palmerston", label: "Graphiste", cv: sampleAdelinePalmerston },
];
