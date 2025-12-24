// --- GESTION MARKETING (PIXELS) ---
function initMarketing() {
    if (typeof marketingConfig !== 'undefined' && marketingConfig.facebookPixelId) {
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        
        fbq('init', marketingConfig.facebookPixelId);
        fbq('track', 'PageView');
    }

    if (typeof marketingConfig !== 'undefined' && marketingConfig.tiktokPixelId) {
        !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq.methods[i=0];i<ttq.methods.length;i++)ttq.setAndDefer(t,ttq.methods[i]);return t},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
            ttq.load(marketingConfig.tiktokPixelId);
            ttq.page();
        }(window, document, 'ttq');
    }
}

function trackEvent(eventName, params = {}) {
    if (typeof marketingConfig !== 'undefined') {
        if (marketingConfig.facebookPixelId && typeof fbq !== 'undefined') fbq('track', eventName, params);
        if (marketingConfig.tiktokPixelId && typeof ttq !== 'undefined') {
            let ttEvent = eventName === 'Purchase' ? 'CompletePayment' : eventName;
            ttq.track(ttEvent, params);
        }
    }
}

initMarketing();

// --- LOGIQUE ALPINE JS ---
document.addEventListener('alpine:init', () => {
    
    // 1. Outils de base
    const commonLogic = {
        zones: deliveryZones,
        selectedZoneId: deliveryZones[0].id, 
        cart: [],
        customer: { name: '', phone: '', city: '' },
        
        // VARIABLES PROMO
        promoInput: '',
        appliedPromo: null, 
        promoMessage: '',
        promoError: false,

        isInCart(id) { return this.cart.some(item => item.id === id); },

        toggleCart(item) {
            if (this.isInCart(item.id)) {
                this.cart = this.cart.filter(p => p.id !== item.id);
            } else {
                this.cart.push(item);
                trackEvent('AddToCart', { content_name: item.name, value: item.price, currency: marketingConfig.currency });
            }
        },

        // LOGIQUE D'APPLICATION DU CODE
        applyPromo() {
            // On nettoie l'entrée (majuscule, sans espace)
            const code = this.promoInput.trim().toUpperCase();
            
            if (!code) { 
                this.promoMessage = ''; 
                return; 
            }

            // activePromoCodes vient maintenant de data.js !
            if (typeof activePromoCodes !== 'undefined' && activePromoCodes[code]) {
                const rule = activePromoCodes[code];
                this.appliedPromo = { code: code, rule: rule };
                this.promoError = false;
                this.promoMessage = "Code appliqué avec succès ! 🎉";
            } else {
                this.appliedPromo = null;
                this.promoError = true;
                this.promoMessage = "Ce code n'est pas valide 😢";
            }
        },

        formatPrice(price) { return new Intl.NumberFormat('fr-FR').format(price); },

        generateWhatsappMsg(type, productTitle = null, productPrice = 0) {
            let msg = `*NOUVELLE COMMANDE ${type}* 🚀\n`;
            msg += `___________________\n`;
            msg += `👤 *Nom:* ${this.customer.name}\n`;
            msg += `📞 *Tel:* ${this.customer.phone}\n`;
            msg += `📍 *Lieu:* ${this.customer.city}\n`;
            msg += `🚚 *Zone:* ${this.activeZone.name}\n`;
            msg += `___________________\n`;
            
            if (productTitle) {
                msg += `📦 *PRINCIPAL:* ${productTitle} (${this.formatPrice(productPrice)} F)\n`;
            }

            if (this.cart.length > 0) {
                msg += `🛒 *PANIER AJOUTÉ:*\n`;
                this.cart.forEach(item => {
                    msg += `➕ ${item.name} (${this.formatPrice(item.price)} F)\n`;
                });
            }
            
            msg += `🛵 *LIVRAISON:* ${this.formatPrice(this.activeZone.price)} F\n`;
            
            // Ligne Promo dans le message
            if (this.appliedPromo) {
                msg += `🎁 *CODE PROMO (${this.appliedPromo.code}):* -${this.formatPrice(this.discountAmount)} F\n`;
            }

            msg += `___________________\n`;
            msg += `💰 *TOTAL À PAYER: ${this.formatPrice(this.total)} FCFA*\n`;
            return msg;
        },

        sendOrder(msg, totalValue) {
             if (!this.customer.name || !this.customer.phone) {
                alert('⚠️ Merci d\'indiquer votre Nom et Numéro.');
                return;
            }

            trackEvent('Purchase', { 
                value: totalValue, 
                currency: marketingConfig.currency,
                num_items: (this.cart.length + (this.product ? 1 : 0))
            });

            let whatsappNumber = '2250700000000'; // TON NUMERO
            
            setTimeout(() => {
                window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
            }, 300);
        }
    };

    // 2. LOGIQUE PAGES RITUELS
    Alpine.data('shopLogic', (productKey) => ({
        ...commonLogic,
        product: productsData[productKey],
        activeHeroSlide: 0,

        get activeZone() { return this.zones.find(z => z.id === this.selectedZoneId) || this.zones[0]; },

        get subtotal() {
            let cartTotal = this.cart.reduce((sum, item) => sum + item.price, 0);
            return this.product ? (this.product.price + cartTotal) : cartTotal;
        },

        get discountAmount() {
            if (!this.appliedPromo) return 0;
            if (this.appliedPromo.rule.type === 'fixed') return this.appliedPromo.rule.value;
            if (this.appliedPromo.rule.type === 'percent') return Math.round(this.subtotal * (this.appliedPromo.rule.value / 100));
            return 0;
        },

        get total() { 
            let t = this.subtotal + this.activeZone.price - this.discountAmount; 
            return t > 0 ? t : 0;
        },

        get extraProducts() {
            if (!this.product || !this.product.suggestions) return diverseProducts.slice(0, 4);
            return diverseProducts.filter(item => this.product.suggestions.includes(item.id));
        },

        init() {
            if (!this.product) return;
            trackEvent('ViewContent', { content_name: this.product.title, value: this.product.price, currency: marketingConfig.currency });
            setInterval(() => { this.activeHeroSlide = (this.activeHeroSlide + 1) % this.product.heroSlides.length; }, 3500);
        },

        submitOrder() {
            let msg = this.generateWhatsappMsg("RITUEL", this.product.badge, this.product.price);
            this.sendOrder(msg, this.total);
        }
    }));

    // 3. LOGIQUE BOUTIQUE
    Alpine.data('shopAll', () => ({
        ...commonLogic,
        items: diverseProducts,
        activeProduct: null,
        filter: 'Tout',
        
        get activeZone() { return this.zones.find(z => z.id === this.selectedZoneId) || this.zones[0]; },

        get subtotal() { return this.cart.reduce((sum, item) => sum + item.price, 0); },
        
        get discountAmount() {
            if (!this.appliedPromo) return 0;
            if (this.appliedPromo.rule.type === 'fixed') return this.appliedPromo.rule.value;
            if (this.appliedPromo.rule.type === 'percent') return Math.round(this.subtotal * (this.appliedPromo.rule.value / 100));
            return 0;
        },

        get total() { 
            let t = this.subtotal + this.activeZone.price - this.discountAmount;
            return t > 0 ? t : 0;
        },

        get filteredItems() {
            if (this.filter === 'Tout') return this.items;
            return this.items.filter(i => i.category === this.filter);
        },

        submitOrder() {
            if (this.cart.length === 0) { alert('⚠️ Panier vide'); return; }
            let msg = this.generateWhatsappMsg("BOUTIQUE");
            this.sendOrder(msg, this.total);
        }
    }));
});