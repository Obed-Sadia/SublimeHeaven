document.addEventListener('alpine:init', () => {
    Alpine.data('shopLogic', (productKey) => ({
        // Charge les données du produit spécifique depuis data.js
        product: productsData[productKey],
        
        // Données dynamiques
        activeHeroSlide: 0,
        cart: [],
        customer: { name: '', phone: '', city: '' },

        // LOGIQUE CROSS-SELLING INTELLIGENTE
        // Ne montre que les produits définis dans "suggestions" dans data.js
        get extraProducts() {
            if (!this.product || !this.product.suggestions) {
                // Fallback : retourne les 4 premiers produits si pas de suggestions
                return diverseProducts.slice(0, 4);
            }
            // Filtre la grande liste diverseProducts pour trouver les suggestions
            return diverseProducts.filter(item => this.product.suggestions.includes(item.id));
        },

        init() {
            if (!this.product) {
                console.error("Produit non trouvé : " + productKey);
                return;
            }
            // Slider auto pour le hero
            setInterval(() => {
                this.activeHeroSlide = (this.activeHeroSlide + 1) % this.product.heroSlides.length;
            }, 3500);
        },

        isInCart(id) { return this.cart.some(item => item.id === id); },

        toggleCart(item) {
            if (this.isInCart(item.id)) {
                this.cart = this.cart.filter(p => p.id !== item.id);
            } else {
                this.cart.push(item);
            }
        },

        get total() {
            let cartTotal = this.cart.reduce((sum, item) => sum + item.price, 0);
            return this.product.price + cartTotal;
        },

        formatPrice(price) { return new Intl.NumberFormat('fr-FR').format(price); },

        submitOrder() {
            if (!this.customer.name || !this.customer.phone) {
                alert('⚠️ Merci d\'indiquer votre Nom et Numéro.');
                return;
            }

            let msg = `*COMMANDE SUBLIME HAEVEN* 🌟\n`;
            msg += `___________________\n`;
            msg += `👤 *Client:* ${this.customer.name}\n`;
            msg += `📞 *Tel:* ${this.customer.phone}\n`;
            msg += `📍 *Ville:* ${this.customer.city}\n`;
            msg += `___________________\n`;
            msg += `📦 *RITUEL CHOISI:*\n`;
            msg += `👉 ${this.product.badge} (${this.formatPrice(this.product.price)} F)\n`;
            
            if (this.cart.length > 0) {
                msg += `\n🛒 *PRODUITS AJOUTÉS:*\n`;
                this.cart.forEach(item => {
                    msg += `➕ ${item.name} (${this.formatPrice(item.price)} F)\n`;
                });
            }

            msg += `___________________\n`;
            msg += `💰 *TOTAL: ${this.formatPrice(this.total)} FCFA*\n`;
            msg += `🚚 Paiement à la livraison`;

            let whatsappNumber = '2250700000000'; // TON NUMERO ICI
            window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
        }
    }))
});