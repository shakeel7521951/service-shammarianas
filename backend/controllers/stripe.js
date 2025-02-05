import Stripe from 'stripe';
const stripeInstance = new Stripe(process.env.STRIPE_SECRET);

export const stripeCheckout = async (req, res) => {
    try {
        const products = req.body;

        const lineItems = products.map((product) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.title,
                    images: [product.stockImageUrl]
                },
                unit_amount: product.price * 100,
            },
            quantity: 1, 
        }));

        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'], 
            line_items: lineItems,
            mode: 'payment',
            success_url: 'https://yourwebsite.com/success',
            cancel_url: 'https://yourwebsite.com/cancel',
        });

        res.status(200).json({ sessionId: session.id });
    } catch (error) {
        console.error("Stripe Checkout Error:", error);
        res.status(500).json({ error: error.message });
    }
};
