const stripe = require('stripe')(process.env.STRIPE_APIKEY);
const Product = require('../models/Product');

exports.successPayment = async (req, res) => {
    res.status(200).json('Success !')
};
exports.cancelPayment = async (req, res) => {
    res.status(400).json('Cancel...')
};

exports.addPayment = async (req, res) => {
    try {
        const data = req.body;
        const products = await Product.find();
        const session = await stripe.checkout.sessions.create({
            line_items: data.items.map((item) => {
                const productData = products.find(product => product._id.toString() === item.productid);                
                let productPrice, newPrice;
                if (Number.isInteger(productData.price)) {
                    productPrice = productData.price*100;
                    newPrice = productPrice;
                } else {
                    productPrice = productData.price*100;
                    newPrice = productPrice.toFixed(0);
                };
                return {
                    price_data: {
                        currency: 'eur',
                        unit_amount: newPrice,
                        product_data: {
                            name: productData.title,
                            images: [productData.img]
                        },
                    },
                    quantity: item.quantity
                }
            }),
            mode: 'payment',
            payment_method_types: ['card'],
            success_url: `${process.env.CLIENT_URL}/payment/success`,
            cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
        });
        console.log('session=>',session);
        res.status(200).json({ url: session.url });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message, error });
    }
};