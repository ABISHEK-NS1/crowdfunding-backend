import Stripe from 'stripe';

import 'dotenv/config';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
    try {
        const { amount, fullname, email } = req.body;
        const searchCustomer = await stripe.customers.list({
            email: email,
        });

        let customer;
        if (searchCustomer.data[0]) {
            customer = searchCustomer.data[0];
        } else {
            customer = await stripe.customers.create({
                name: fullname,
                email,
            });
        }
        const paymentIntent = await stripe.paymentIntents.create(
            {
                amount: Number(amount * 100),
                currency: 'inr',
                customer: customer.id,
            }
        );

        return res.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const cancelPaymentIntent = async (req, res) => {
    try {
        const { paymentIntentId } = req.body;
        const paymentIntent =
            await stripe.paymentIntents.cancel(paymentIntentId);
        return res.json({ paymentIntent });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const createConfirmIntent = async (req, res) => {
    const {
        amount,
        fundraiserId,
        fullname,
        paymentMethodId,
        email,
    } = req.body;
    const searchCustomer = await stripe.customers.list({
        email: email,
    });

    let customer;
    if (searchCustomer.data[0]) {
        customer = searchCustomer.data[0];
    } else {
        customer = await stripe.customers.create({
            name: fullname,
            email,
        });
    }
    try {
        const intent = await stripe.paymentIntents.create({
            confirm: true,
            amount: amount * 100,
            currency: 'inr',
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: { enabled: true },
            description: `Donation to fundraiser ${fundraiserId} by ${fullname}`,
            payment_method: paymentMethodId, // the PaymentMethod ID sent by your client
            return_url: 'https://example.com/order/123/complete',
            use_stripe_sdk: true,
            customer: customer.id,
        });

        res.json({
            client_secret: intent.client_secret,
            status: intent.status,
        });
    } catch (err) {
        res.json({
            error: err,
        });
    }
};

export {
    cancelPaymentIntent,
    createConfirmIntent,
    createPaymentIntent,
};
