// --- 0. CONFIGURATION SUPABASE ---
const supabaseConfig = {
    url: "https://nvhitmcdxshnofrukqqz.supabase.co", 
    key: "sb_publishable_TI-FsqgeAWvMW67mPGGQeQ_GDEHeEfe"
};

const productsData = {
    // --- LES RITUELS SIGNATURES (Landing Pages) ---

    'visage': {
        db_id: "KI001",
        title: "Fini les boutons masqués sous le maquillage.",
        subtitle: "Le Rituel Expert pour assécher les boutons et effacer les taches sans agresser.",
        badge: "Best-Seller Anti-Acné",
        price: 22500,
        // Produits suggérés en bas de page (Cross-selling intelligent)
        suggestions: ['dentifrice', 'gel_mains', 'creme_mains', 'spray_bouche'],
        heroSlides: [
            { img: 'https://placehold.co/600x400/10B981/FFFFFF?text=RITUEL+VISAGE+PEAU+NETTE', text: 'Le Rituel Peau Nette' },
            { img: 'https://placehold.co/600x400/333333/FFFFFF?text=RESULTATS+PROUVES', text: 'Efficacité ciblée' }
        ],
        steps: [
            { num: 1, name: "Savon Charbon de Bambou", desc: "Nettoie en profondeur et absorbe l'excès de sébum." },
            { num: 2, name: "Pâte Dentifrice Multi-Action", desc: "S'utilise en masque local (Le Secret !) pour sécher les boutons.", isSecret: true },
            { num: 3, name: "Huile de Serpent", desc: "Cicatrise, réduit les rougeurs et inflammations." },
            { num: 4, name: "Lotion Rajeunissante", desc: "Resserre les pores et illumine le teint." }
        ],
        reviews: [
            { name: "Aïcha K.", date: "Hier", text: "Je n'y croyais pas pour le dentifrice sur les boutons, mais ça marche vraiment ! En 3 jours, mon front était lisse." },
            { name: "Sarah M.", date: "Il y a 2 jours", text: "J'ai tout testé avant ça. C'est la seule routine qui a enlevé mes taches noires." }
        ],
        faq: [
            { q: "Combien de temps pour les résultats ?", a: "Les boutons sèchent souvent en 48h. Pour les taches, comptez 21 jours." },
            { q: "Le dentifrice brule-t-il ?", a: "Non, il est à base de thé blanc et rafraîchit la peau sans brûler." }
        ]
    },

    'teint': {
        db_id: "KI002",
        title: "Révélez votre lumière naturelle.",
        subtitle: "Unifiez votre teint et éliminez les zones ternes avec la technologie Micro-billes.",
        badge: "Teint Lumineux & Uniforme",
        price: 26500,
        suggestions: ['lait_sod', 'gel_douche', 'huile_bain', 'anti_moustique'],
        heroSlides: [
            { img: 'https://placehold.co/600x400/F59E0B/FFFFFF?text=RITUEL+GLOW+INTENSE', text: 'Rituel Glow Intense' },
            { img: 'https://placehold.co/600x400/FCD34D/FFFFFF?text=PEAU+LUMINEUSE', text: 'Sans hydroquinone' }
        ],
        steps: [
            { num: 1, name: "Savon Charbon", desc: "Détoxifie la peau et prépare au soin." },
            { num: 2, name: "Gel Éclaircissant aux Billes", desc: "Unifie le teint et traite les zones rebelles grâce aux micro-billes." },
            { num: 3, name: "Lait Corps SOD", desc: "Nourrit intensément, unifie et protège du vieillissement." },
            { num: 4, name: "Lotion Rajeunissante", desc: "Finit le soin pour une peau lisse et éclatante." }
        ],
        reviews: [
            { name: "Fatou S.", date: "Aujourd'hui", text: "Mon teint n'est pas devenu rouge, il est juste propre et lumineux. J'adore." },
            { name: "Clarisse A.", date: "Il y a 3 jours", text: "Mes copines m'ont demandé ce que j'utilisais. Le Glow est réel !" }
        ],
        faq: [
            { q: "Est-ce que ça éclaircit beaucoup ?", a: "Ça donne un teint 'propre' et lumineux. Ce n'est pas un produit décapant." },
            { q: "Puis-je l'utiliser au soleil ?", a: "Oui, le lait SOD contient des antioxydants qui protègent la peau." }
        ]
    },

    'douleur': {
        db_id: "KI003",
        title: "Retrouvez votre liberté de mouvement.",
        subtitle: "La solution puissante contre les rhumatismes, l'arthrose et les douleurs musculaires.",
        badge: "Soulagement Immédiat",
        price: 9000,
        suggestions: ['huile_serpent_120', 'creme_douleur', 'huile_bain', 'calcium'],
        heroSlides: [
            { img: 'https://placehold.co/600x400/DC2626/FFFFFF?text=SOLUTION+DOULEURS', text: 'Duo Huile + Crème' },
            { img: 'https://placehold.co/600x400/EF4444/FFFFFF?text=SOULAGEMENT', text: 'Agit en quelques minutes' }
        ],
        steps: [
            { num: 1, name: "Huile de Serpent", desc: "Pénètre pour soulager les inflammations articulaires." },
            { num: 2, name: "Crème Anti-douleur", desc: "Apporte une sensation de chaleur rapide pour détendre le muscle." }
        ],
        reviews: [
            { name: "Papa Jean", date: "Hier", text: "Je ne pouvais plus plier le genou. Après le massage, j'ai dormi comme un bébé." },
            { name: "Hervé K.", date: "Il y a 4 jours", text: "Je suis sportif, j'utilise la crème après chaque match." }
        ],
        faq: [
            { q: "Est-ce efficace pour l'arthrose ?", a: "Oui, l'huile de serpent est reconnue pour soulager les douleurs articulaires chroniques." },
            { q: "Ça chauffe ?", a: "La crème procure une sensation de chaleur apaisante immédiate." }
        ]
    },

    'cheveux': {
        db_id: "KI004",
        title: "Transformez vos cheveux durs en soie.",
        subtitle: "La routine réparatrice pour stopper la casse et activer la pousse.",
        badge: "Spécial Cheveux Afro/Secs",
        price: 13500,
        suggestions: ['shampoing_the', 'shampoing_2en1', 'huile_serpent_120', 'gel_douche'],
        heroSlides: [
            { img: 'https://placehold.co/600x400/8B5CF6/FFFFFF?text=RITUEL+CAPILLAIRE', text: 'Duo Shampoing + Huile' },
            { img: 'https://placehold.co/600x400/A78BFA/FFFFFF?text=CHEVEUX+FORTS', text: 'Stop à la casse' }
        ],
        steps: [
            { num: 1, name: "Shampoing 2 en 1", desc: "Nettoie et répare la fibre capillaire en une seule étape." },
            { num: 2, name: "Huile de Serpent (120ml)", desc: "Active la pousse, lutte contre les pellicules et nourrit." }
        ],
        reviews: [
            { name: "Aminata D.", date: "Il y a 2 jours", text: "Mes cheveux se cassaient au peigne. Maintenant ils sont souples." },
            { name: "Josiane T.", date: "Il y a 1 semaine", text: "L'huile a stoppé mes démangeaisons et mes pellicules." }
        ],
        faq: [
            { q: "Est-ce bon pour les cheveux défrisés ?", a: "Oui, cela répare la fibre capillaire abîmée par les produits chimiques." },
            { q: "Comment l'utiliser ?", a: "Faites le shampoing 2x/semaine et appliquez l'huile en bain d'huile." }
        ]
    }
};

// --- CATALOGUE BOUTIQUE (PRODUITS DIVERS) ---

const diverseProducts = [
    { 
        id: 'dentifrice', 
        db_id: 'PR001', // Série PR
        name: 'Pâte Dentifrice Multi-Action', 
        price: 4500, 
        category: 'Hygiène',
        img: 'https://placehold.co/300x300?text=Dentifrice',
        desc_short: 'Haleine fraîche & Soin gencives.',
        desc_long: 'Dentifrice multi-action conçu pour protéger les dents, renforcer les gencives et lutter contre la mauvaise haleine. Formule au thé blanc. Astuce : Sèche les boutons sur le visage.'
    },
    { 
        id: 'lait_sod', 
        db_id: 'PR002',
        name: 'Lait Corps SOD', 
        price: 5500, 
        category: 'Corps',
        img: 'https://placehold.co/300x300?text=Lait+SOD',
        desc_short: 'Réparateur & Hydratant.',
        desc_long: 'Enrichi en Super Oxyde Dismutase (SOD), il aide à lutter contre le vieillissement cutané, unifie le teint et laisse la peau douce. Idéal pour les vergetures et peaux sèches.'
    },
    { 
        id: 'gel_mains', 
        db_id: 'PR003',
        name: 'Gel Mains Désinfectant', 
        price: 4500, 
        category: 'Hygiène',
        img: 'https://placehold.co/300x300?text=Gel+Mains',
        desc_short: 'Doux & Non collant.',
        desc_long: 'Élimine 99.9% des bactéries tout en gardant les mains douces et hydratées. Texture légère et non collante.'
    },
    { 
        id: 'gel_douche', 
        db_id: 'PR004',
        name: 'Gel Douche aux Herbes', 
        price: 5000, 
        category: 'Corps',
        img: 'https://placehold.co/300x300?text=Gel+Douche',
        desc_short: 'Fraîcheur & Hydratation.',
        desc_long: 'Aux extraits de plantes pour nettoyer en douceur tout en nourrissant la peau. Propriétés antibactériennes naturelles.'
    },
    { 
        id: 'shampoing_the', 
        db_id: 'PR005',
        name: 'Shampoing Thé Blanc', 
        price: 5000, 
        category: 'Cheveux',
        img: 'https://placehold.co/300x300?text=Shampoing+The',
        desc_short: 'Pour cheveux mous/fragiles.',
        desc_long: 'Conçu pour renforcer et purifier les cheveux mous et fragiles. Apporte brillance et vitalité.'
    },
    { 
        id: 'shampoing_2en1', 
        db_id: 'PR006',
        name: 'Shampoing 2 en 1 Traitant', 
        price: 7500, 
        category: 'Cheveux',
        img: 'https://placehold.co/300x300?text=Shampoing+2en1',
        desc_short: 'Nettoie & Répare.',
        desc_long: 'Idéal pour cheveux durs, secs ou cassants. Nettoie et répare en une seule étape. Rend les cheveux souples et faciles à coiffer.'
    },
    { 
        id: 'spray_bouche', 
        db_id: 'PR007',
        name: 'Senteur Bouche Spray', 
        price: 3500, 
        category: 'Hygiène',
        img: 'https://placehold.co/300x300?text=Spray+Bouche',
        desc_short: 'Haleine fraîche immédiate.',
        desc_long: 'Élimine les odeurs après repas, cigarette ou boisson. Format pratique à transporter.'
    },
    { 
        id: 'huile_bain', 
        db_id: 'PR008',
        name: 'Huile de Bain Relaxante', 
        price: 12000, 
        category: 'Corps',
        img: 'https://placehold.co/300x300?text=Huile+Bain',
        desc_short: 'Luxe & Détente.',
        desc_long: 'Formulée à base d\'huile d\'olive. Nettoie, nourrit et apporte une sensation de détente absolue.'
    },
    { 
        id: 'creme_mains', 
        db_id: 'PR009',
        name: 'Crème Mains Réparatrice', 
        price: 5000, 
        category: 'Corps',
        img: 'https://placehold.co/300x300?text=Creme+Mains',
        desc_short: 'Mains douces.',
        desc_long: 'Riche en vitamines et protéines. Répare les mains sèches, abîmées ou exposées aux produits chimiques.'
    },
    { 
        id: 'gel_eclaircissant', 
        db_id: 'PR010',
        name: 'Gel Éclaircissant Billes', 
        price: 8500, 
        category: 'Corps',
        img: 'https://placehold.co/300x300?text=Gel+Eclaircissant',
        desc_short: 'Teint uniforme.',
        desc_long: 'Enrichi en micro-billes nourrissantes. Aide à réduire les taches, atténuer les imperfections et améliorer l\'éclat du teint.'
    },
    { 
        id: 'huile_serpent_80', 
        db_id: 'PR011',
        name: 'Huile de Serpent (80ml)', 
        price: 5500, 
        category: 'Santé',
        img: 'https://placehold.co/300x300?text=Huile+Serpent',
        desc_short: 'Douleurs & Cicatrisation.',
        desc_long: 'Huile polyvalente. Soulage douleurs musculaires, régénère la peau, réduit cicatrices et vergetures.'
    },
    { 
        id: 'huile_serpent_120', 
        db_id: 'PR012',
        name: 'Huile de Serpent (120ml)', 
        price: 6000, 
        category: 'Santé',
        img: 'https://placehold.co/300x300?text=Huile+Serpent+120',
        desc_short: 'Grand format Multi-usages.',
        desc_long: 'Le format familial. Idéal pour les cheveux (pousse, pellicules) et les douleurs articulaires. Améliore la circulation sanguine.'
    },
    { 
        id: 'creme_douleur', 
        db_id: 'PR013',
        name: 'Crème Anti-douleur', 
        price: 3000, 
        category: 'Santé',
        img: 'https://placehold.co/300x300?text=Creme+Douleur',
        desc_short: 'Soulagement rapide.',
        desc_long: 'Crème apaisante pour soulager rapidement les douleurs musculaires et articulaires. Sensation de chaleur/fraîcheur immédiate.'
    },
    { 
        id: 'anti_moustique',
        db_id: 'PR014', 
        name: 'Parfum Anti-Moustiques', 
        price: 4500, 
        category: 'Santé',
        img: 'https://placehold.co/300x300?text=Anti-Moustique',
        desc_short: 'Protection 8h & Parfum frais.',
        desc_long: 'Spray parfumé qui combine protection contre les moustiques (jusqu\'à 8h) et parfum agréable. Ne colle pas et n\'irrite pas la peau.'
    }
];

// --- 1. CONFIGURATION MARKETING (PLUG & PLAY) ---
const marketingConfig = {
    facebookPixelId: "1275911894302778", 
    tiktokPixelId: "", 
    currency: "XOF" 
};


// --- 2. CONFIGURATION LIVRAISON ---
const deliveryZones = [
    { id: 'abidjan_nord', name: 'Abidjan Nord (Cocody, Riviera, Bingerville)', price: 1000 },
    { id: 'abidjan_sud', name: 'Abidjan Sud (Marcory, Treichville, Koumassi)', price: 1500 },
    { id: 'abidjan_ouest', name: 'Abidjan Ouest (Yopougon, Abobo)', price: 2000 },
    { id: 'interieur', name: 'Expédition Intérieur (San Pedro, Yamoussoukro...)', price: 3000 }
];

// --- 3. CONFIGURATION DES CODES PROMO ---
const activePromoCodes = {
    'BIENVENUE': { type: 'percent', value: 10 }, // -10%
    'VIP2000':   { type: 'fixed', value: 2000 }, // -2000 FCFA
    'LIVRAISON': { type: 'fixed', value: 1000 }  // -1000 FCFA
};
