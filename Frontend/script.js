document.addEventListener('alpine:init', () => {
    Alpine.data('shopLogic', (productKey) => ({
        // Charge les données du produit spécifique depuis data.js
        product: productsData[productKey],
        
        // Données dynamiques
        activeHeroSlide: 0,
        
        // CATALOGUE ADDITIONNEL (Reste le même pour tout le monde)
        extraProducts: [
            { id: 'lait_sod', name: 'Lait Corps SOD', price: 5500, desc: 'Hydrate et unifie le teint', img: 'https://placehold.co/150x150?text=Lait+SOD' },
            { id: 'spray_moustique', name: 'Parfum Anti-Moustiques', price: 4500, desc: 'Protection 8h & Parfum frais', img: 'https://placehold.co/150x150?text=Anti-Moustique' },
            { id: 'gel_mains', name: 'Gel Mains', price: 4500, desc: 'Désinfectant doux & hydratant', img: 'https://placehold.co/150x150?text=Gel+Mains' },
            { id: 'spray_bouche', name: 'Senteur Bouche', price: 3500, desc: 'Haleine fraîche instantanée', img: 'https://placehold.co/150x150?text=Spray+Bouche' }
        ],

        cart: [],
        customer: { name: '', phone: '', city: '' },

        init() {
            // Sécurité : si la clé produit n'existe pas, on redirige ou on met une erreur
            if (!this.product) {
                console.error("Produit non trouvé : " + productKey);
                return;
            }
            
            // Slider auto
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
            msg += `📦 *PRODUIT PRINCIPAL:*\n`;
            msg += `👉 ${this.product.badge} (${this.formatPrice(this.product.price)} F)\n`;
            
            if (this.cart.length > 0) {
                msg += `\n🛒 *AJOUTS:*\n`;
                this.cart.forEach(item => {
                    msg += `➕ ${item.name} (${this.formatPrice(item.price)} F)\n`;
                });
            }

            msg += `___________________\n`;
            msg += `💰 *TOTAL: ${this.formatPrice(this.total)} FCFA*\n`;
            msg += `🚚 Paiement à la livraison`;

            let whatsappNumber = '2250700000000'; // TON NUMERO
            window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
        }
    }))
});