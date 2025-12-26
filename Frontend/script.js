// 1. CONFIGURATION SUPABASE & TRACKING
let supabaseClient = null;
if (typeof supabaseConfig !== 'undefined' && typeof window.supabase !== 'undefined') {
    supabaseClient = window.supabase.createClient(supabaseConfig.url, supabaseConfig.key);
}

// --- FONCTIONS UTILITAIRES ---
// Détection précise de l'OS pour ta table 'site_traffic'
function getOS() {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) return "Android";
    if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) return "iOS";
    if (/Win/.test(ua)) return "Windows";
    if (/Mac/.test(ua)) return "macOS";
    if (/Linux/.test(ua)) return "Linux";
    return "Autre";
}

// --- A. TRACKING VISITEURS ---
async function logVisit() {
    if (!supabaseClient) return;
    
    // Récupération des infos pour ta table site_traffic
    const ua = navigator.userAgent.toLowerCase();
    const isMobile = ua.includes("android") || ua.includes("iphone");
    
    // Gestion de la source marketing
    const urlParams = new URLSearchParams(window.location.search);
    let source = urlParams.get('source') || sessionStorage.getItem('saved_source') || 'Direct/Organique';
    
    // Si une nouvelle source est détectée dans l'URL, on met à jour la session
    if (urlParams.get('source')) {
        sessionStorage.setItem('saved_source', source);
    }

    // INSERTION STRICTE SELON TA TABLE site_traffic
    supabaseClient.from('site_traffic').insert([{
        page_url: window.location.pathname,
        source: source,          
        device_type: isMobile ? "Mobile" : "Desktop", 
        os: getOS(),             
        user_agent: navigator.userAgent 
    }]).then(({ error }) => { 
        if (error) console.warn("Erreur Tracking:", error.message); 
    });
}
logVisit();

// --- B. MARKETING (PIXELS) ---
function initMarketing() {
    if (typeof marketingConfig !== 'undefined') {
        if (marketingConfig.facebookPixelId) {
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', marketingConfig.facebookPixelId);
            fbq('track', 'PageView');
        }
        if (marketingConfig.tiktokPixelId) {
            !function (w, d, t) { w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq.methods[i=0];i<ttq.methods.length;i++)ttq.setAndDefer(t,ttq.methods[i]);return t},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)}; ttq.load(marketingConfig.tiktokPixelId); ttq.page(); }(window, document, 'ttq');
        }
    }
}
function trackEvent(name, params={}) {
    if (typeof marketingConfig === 'undefined') return;
    if (marketingConfig.facebookPixelId && typeof fbq !== 'undefined') fbq('track', name, params);
    if (marketingConfig.tiktokPixelId && typeof ttq !== 'undefined') {
        let ev = name === 'Purchase' ? 'CompletePayment' : name;
        ttq.track(ev, params);
    }
}
initMarketing();


// 2. LOGIQUE ALPINE JS (APPLICATION)

document.addEventListener('alpine:init', () => {

    // --- MOTEUR DE COMMANDE CENTRALISÉ ---
    const sharedOrderLogic = {
        isSubmitting: false,

        // Fonction principale qui gère tout (Promo incluse)
        async processOrder(type, customer, cartItems, totalAmount, activeZoneName, activeZonePrice, promoObj = null, discountVal = 0) {
            // 1. Validation
            if (!customer.name || !customer.phone) {
                alert('⚠️ Merci d\'indiquer votre Nom et Numéro de téléphone.');
                return;
            }

            this.isSubmitting = true;
            const refCode = Math.floor(1000 + Math.random() * 9000).toString();
            const trafficSource = sessionStorage.getItem('saved_source') || 'Direct/Organique';

            // 2. Supabase (Table ORDERS)
            let orderRows = [];
            cartItems.forEach(item => {
                if (item.db_id) {
                    orderRows.push({
                        customer_phone: customer.phone,
                        product_id: item.db_id,
                        quantity_sold: 1,
                        total_amount_cfa: item.price,
                        marketing_source: trafficSource,
                        status: `En attente (Ref:${refCode})`
                    });
                }
            });

            if (supabaseClient && orderRows.length > 0) {
                try {
                    const { error } = await supabaseClient.from('orders').insert(orderRows);
                    if (error) console.error("Erreur Supabase:", error.message);
                } catch (e) { console.error("Erreur connexion:", e); }
            }

            // 3. Pixel
            trackEvent('Purchase', { value: totalAmount, currency: 'XOF', num_items: cartItems.length });

            // 4. Message WhatsApp
            let msg = `*COMMANDE ${type}* (Ref: #${refCode}) 🚀\n`;
            msg += `___________________\n`;
            msg += `👤 ${customer.name}\n📞 ${customer.phone}\n📍 ${customer.city}\n`;
            msg += `🚚 Zone: ${activeZoneName}\n___________________\n`;
            
            cartItems.forEach(item => {
                msg += `📦 ${item.name || item.title} (${new Intl.NumberFormat('fr-FR').format(item.price)} F)\n`;
            });

            if (promoObj) {
                msg += `🎁 Code *${promoObj.code}* : -${new Intl.NumberFormat('fr-FR').format(discountVal)} F\n`;
            }

            msg += `🛵 Livraison: +${new Intl.NumberFormat('fr-FR').format(activeZonePrice)} F\n`;
            msg += `___________________\n💰 *TOTAL À PAYER: ${new Intl.NumberFormat('fr-FR').format(totalAmount)} FCFA*\n`;
            msg += `(Paiement à la livraison)`;

            // 5. Redirection
            const waNum = '22506394798';
            setTimeout(() => {
                window.location.href = `https://wa.me/${waNum}?text=${encodeURIComponent(msg)}`;
                this.isSubmitting = false;
            }, 500);
        }
    };

    
    // A. LOGIQUE DES KITS (Pages Visage, Teint...)
    
    Alpine.data('shopLogic', (productKey) => ({
        ...sharedOrderLogic,
        
        // Données liées (Vérification existence)
        product: productsData[productKey],
        zones: typeof deliveryZones !== 'undefined' ? deliveryZones : [],
        selectedZoneId: typeof deliveryZones !== 'undefined' ? deliveryZones[0].id : '',
        
        // État
        customer: { name: '', phone: '', city: '' },
        activeHeroSlide: 0,
        openModal: false, 

        // Gestion Promo
        promoInput: '',
        appliedPromo: null,
        promoMessage: '',
        promoError: false,

        stockLevel: Math.floor(Math.random() * (9 - 3 + 1)) + 3,

        // Calculs
        get activeZone() { return this.zones.find(z => z.id === this.selectedZoneId) || { price: 0, name: 'Standard' }; },
        
        get discountAmount() {
            if (!this.appliedPromo) return 0;
            const rule = this.appliedPromo.rule;
            if (rule.type === 'percent') return Math.round(this.product.price * (rule.value / 100));
            if (rule.type === 'fixed') return rule.value;
            return 0;
        },

        get totalPrice() { 
            let t = (this.product ? this.product.price : 0) + this.activeZone.price - this.discountAmount;
            return t > 0 ? t : 0;
        },

        formatPrice(p) { return new Intl.NumberFormat('fr-FR').format(p) + ' FCFA'; },

        init() {
            if (this.product) {
                trackEvent('ViewContent', { content_name: this.product.title, value: this.product.price, currency: 'XOF' });
                if (this.product.heroSlides) setInterval(() => { this.activeHeroSlide = (this.activeHeroSlide + 1) % this.product.heroSlides.length; }, 3500);
            }
        },

        // Appliquer Promo
        applyPromo() {
            const code = this.promoInput.trim().toUpperCase();
            if (typeof activePromoCodes !== 'undefined' && activePromoCodes[code]) {
                this.appliedPromo = { code: code, rule: activePromoCodes[code] };
                this.promoMessage = "Code valide ! 🎉";
                this.promoError = false;
            } else {
                this.appliedPromo = null;
                this.promoMessage = "Code invalide ❌";
                this.promoError = true;
            }
        },

        // Valider Commande
        submitOrder() {
            this.processOrder("RITUEL", this.customer, [this.product], this.totalPrice, this.activeZone.name, this.activeZone.price, this.appliedPromo, this.discountAmount);
        }
    }));


    
    // B. LOGIQUE BOUTIQUE 
   
    Alpine.data('shopData', () => ({
        ...sharedOrderLogic,
        
        products: typeof diverseProducts !== 'undefined' ? diverseProducts : [],
        zones: typeof deliveryZones !== 'undefined' ? deliveryZones : [],
        selectedZoneId: typeof deliveryZones !== 'undefined' ? deliveryZones[0].id : '',

        // État Panier
        search: '',
        filter: 'all',
        cart: [],
        cartOpen: false,
        openModal: false,
        customer: { name: '', phone: '', city: '' },

        // GESTION PROMO (Ajouté)
        promoInput: '',
        appliedPromo: null,
        promoMessage: '',
        promoError: false,

        initShop() { console.log("Boutique chargée 🛒"); },

        // Calculs
        get activeZone() { return this.zones.find(z => z.id === this.selectedZoneId) || { price: 0, name: 'Standard' }; },
        
        get cartTotal() { return this.cart.reduce((sum, i) => sum + i.price, 0); },

        // Calcul Réduction (Ajouté)
        get discountAmount() {
            if (!this.appliedPromo) return 0;
            const rule = this.appliedPromo.rule;
            if (rule.type === 'percent') return Math.round(this.cartTotal * (rule.value / 100)); 
            if (rule.type === 'fixed') return rule.value; 
            return 0;
        },

        get filteredProducts() {
            return this.products.filter(p => {
                return (this.filter === 'all' || p.category === this.filter) &&
                       p.name.toLowerCase().includes(this.search.toLowerCase());
            });
        },

        // Actions
        addToCart(product) {
            this.cart.push(product);
            trackEvent('AddToCart', { content_name: product.name, value: product.price, currency: 'XOF' });
            if (navigator.vibrate) navigator.vibrate(50);
        },
        removeFromCart(index) { this.cart.splice(index, 1); },
        
        // Appliquer Promo (Ajouté)
        applyPromo() {
            const code = this.promoInput.trim().toUpperCase();
            if (typeof activePromoCodes !== 'undefined' && activePromoCodes[code]) {
                this.appliedPromo = { code: code, rule: activePromoCodes[code] };
                this.promoMessage = "Code valide ! 🎉";
                this.promoError = false;
            } else {
                this.appliedPromo = null;
                this.promoMessage = "Code invalide ❌";
                this.promoError = true;
            }
        },

        formatPrice(p) { return new Intl.NumberFormat('fr-FR').format(p) + ' FCFA'; },

        // Envoi WhatsApp (Mis à jour avec Promo)
        checkoutWhatsApp() {
            if (this.cart.length === 0) return;
            if(!this.customer.name || !this.customer.phone) {
                alert("Pour valider, merci de remplir vos infos (Nom/Tel) dans le panier.");
                return;
            }
            
            // On envoie le Total calculé (Panier + Zone - Promo)
            const finalTotal = this.cartTotal + this.activeZone.price - this.discountAmount;

            this.processOrder(
                "BOUTIQUE", 
                this.customer, 
                this.cart, 
                finalTotal > 0 ? finalTotal : 0, 
                this.activeZone.name, 
                this.activeZone.price,
                this.appliedPromo, 
                this.discountAmount 
            );
        }
    }));
});