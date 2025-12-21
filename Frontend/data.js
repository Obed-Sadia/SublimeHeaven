const productsData = {
    // PAGE 1 : KIT ANTI-IMPERFECTIONS
    'visage': {
        title: "Fini les boutons masqués sous le maquillage.",
        subtitle: "Le protocole scientifique pour assécher les boutons et effacer les taches.",
        badge: "Best-Seller Anti-Acné",
        price: 22500,
        heroSlides: [
            { img: 'https://placehold.co/600x400/10B981/FFFFFF?text=KIT+VISAGE+ANTI-ACNE', text: 'Le Kit Complet Peau Nette' },
            { img: 'https://placehold.co/600x400/333333/FFFFFF?text=RESULTATS+VISIBLES', text: 'Efficacité prouvée' }
        ],
        steps: [
            { num: 1, name: "Savon Charbon de Bambou", desc: "Nettoie en profondeur et absorbe le sébum." },
            { num: 2, name: "Pâte Dentifrice Multi-Action", desc: "S'utilise en masque local pour sécher les boutons.", isSecret: true },
            { num: 3, name: "Huile de Serpent", desc: "Réduit les cicatrices et les inflammations." },
            { num: 4, name: "Lotion Rajeunissante", desc: "Rajeunit et illumine le teint." }
        ],
        // NOUVEAU : Preuve Sociale Spécifique
        reviews: [
            { name: "Aïcha K.", date: "Hier", text: "Je n'y croyais pas pour le dentifrice sur les boutons, mais ça marche vraiment ! En 3 jours, mon front était lisse." },
            { name: "Sarah M.", date: "Il y a 2 jours", text: "J'ai tout testé avant ça. C'est le seul kit qui a enlevé mes taches noires sans abîmer ma peau." },
            { name: "Marc D.", date: "Il y a 1 semaine", text: "Ma femme m'a offert ça pour mes boutons de rasage, c'est top." }
        ],
        faq: [
            { q: "Combien de temps pour les résultats ?", a: "Les boutons sèchent souvent en 48h. Pour les taches, comptez 21 jours." },
            { q: "Le dentifrice brule-t-il ?", a: "Non, il est à base de thé blanc et rafraîchit la peau sans brûler." }
        ]
    },

    // PAGE 2 : KIT TEINT ÉCLATANT
    'teint': {
        title: "Révélez votre lumière naturelle sans décaper.",
        subtitle: "Unifiez votre teint et éliminez les zones ternes avec la technologie Micro-billes.",
        badge: "Teint Lumineux & Uniforme",
        price: 26500,
        heroSlides: [
            { img: 'https://placehold.co/600x400/F59E0B/FFFFFF?text=KIT+TEINT+ECLAT', text: 'Kit Complet Glow Intense' },
            { img: 'https://placehold.co/600x400/FCD34D/FFFFFF?text=PEAU+LUMINEUSE', text: 'Sans hydroquinone' }
        ],
        steps: [
            { num: 1, name: "Savon Charbon", desc: "Élimine les impuretés et toxines." },
            { num: 2, name: "Gel Éclaircissant aux Billes", desc: "Éclaircit et unifie progressivement le teint." },
            { num: 3, name: "Lait Corps SOD", desc: "Hydrate, illumine et protège du vieillissement." },
            { num: 4, name: "Lotion Rajeunissante", desc: "Finit le soin pour un visage lisse et éclatant." }
        ],
        reviews: [
            { name: "Fatou S.", date: "Aujourd'hui", text: "Mon teint n'est pas devenu rouge, il est juste propre et lumineux. J'adore l'odeur du lait SOD." },
            { name: "Clarisse A.", date: "Il y a 3 jours", text: "Mes copines m'ont demandé ce que j'utilisais. Le Glow est réel !" }
        ],
        faq: [
            { q: "Est-ce que ça éclaircit beaucoup ?", a: "Ça unifie et rend le teint propre (clair naturel), ce n'est pas un produit décapant." },
            { q: "Puis-je l'utiliser au soleil ?", a: "Oui, le lait SOD contient des antioxydants qui protègent la peau." }
        ]
    },

    // PAGE 3 : KIT DOULEURS
    'douleur': {
        title: "Retrouvez votre liberté de mouvement.",
        subtitle: "La solution puissante contre les rhumatismes, l'arthrose et les douleurs musculaires.",
        badge: "Soulagement Immédiat",
        price: 9000,
        heroSlides: [
            { img: 'https://placehold.co/600x400/DC2626/FFFFFF?text=SOLUTIONS+DOULEURS', text: 'Duo Huile + Crème' },
            { img: 'https://placehold.co/600x400/EF4444/FFFFFF?text=SOULAGEMENT', text: 'Agit en quelques minutes' }
        ],
        steps: [
            { num: 1, name: "Huile de Serpent", desc: "Pénètre pour soulager douleurs musculaires et articulaires." },
            { num: 2, name: "Crème Anti-douleur", desc: "Apporte une sensation de chaleur rapide pour détendre." }
        ],
        reviews: [
            { name: "Papa Jean", date: "Hier", text: "Je ne pouvais plus plier le genou. Après le massage avec l'huile, j'ai dormi comme un bébé." },
            { name: "Hervé K.", date: "Il y a 4 jours", text: "Je suis sportif, j'utilise la crème après chaque match. La douleur part tout de suite." }
        ],
        faq: [
            { q: "Est-ce efficace pour l'arthrose ?", a: "Oui, l'huile de serpent est reconnue pour soulager les douleurs articulaires chroniques." },
            { q: "Ça chauffe ?", a: "La crème procure une sensation de chaleur apaisante immédiate." }
        ]
    },

    // PAGE 4 : KIT CHEVEUX
    'cheveux': {
        title: "Transformez vos cheveux durs en soie.",
        subtitle: "La routine réparatrice pour stopper la casse et activer la pousse.",
        badge: "Spécial Cheveux Afro/Secs",
        price: 13500,
        heroSlides: [
            { img: 'https://placehold.co/600x400/8B5CF6/FFFFFF?text=KIT+REPARATION+CAPILLAIRE', text: 'Duo Shampoing + Huile' },
            { img: 'https://placehold.co/600x400/A78BFA/FFFFFF?text=CHEVEUX+FORTS', text: 'Stop à la casse' }
        ],
        steps: [
            { num: 1, name: "Shampoing 2 en 1", desc: "Nettoie et répare les cheveux durs en une seule étape." },
            { num: 2, name: "Huile de Serpent (120ml)", desc: "Active la pousse, lutte contre les pellicules et nourrit." }
        ],
        reviews: [
            { name: "Aminata D.", date: "Il y a 2 jours", text: "Mes cheveux se cassaient au peigne. Maintenant ils sont souples et brillants." },
            { name: "Josiane T.", date: "Il y a 1 semaine", text: "L'huile a stoppé mes démangeaisons et mes pellicules. Je valide fort." }
        ],
        faq: [
            { q: "Est-ce bon pour les cheveux défrisés ?", a: "Oui, cela répare la fibre capillaire abîmée par les produits chimiques." },
            { q: "Comment l'utiliser ?", a: "Faites le shampoing 2x/semaine et appliquez l'huile en massage du cuir chevelu." }
        ]
    }
};