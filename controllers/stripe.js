const Stripe = require('stripe');
require('dotenv').config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const stripeController = {
    async hacerPago(req, res) {
        const { amount, currency } = req.body;

        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency,
            });
            res.status(200).json({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            console.error('Error creating PaymentIntent:', error);
            res.status(500).json({ error: error.message });
        }
    },
}

module.exports=stripeController;
