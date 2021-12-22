const stripe = require('stripe')(process.env.STRIPE_SK)
exports.createCheckoutSession = async (req, res) => {
    const {cart} = req.body
    // Crear una session de checkout de stripe
    const session = await stripe.checkout.sessions.create({

        // Carrito De Compras, podemos agregar varios line items y alterar la cantidad mandada por el cliente con un req.body
        // line_items: [{
        //     price: 'price_1K9DB2E0ABqaZmsnr9SGIcH1',// id del precio
        //     quantity: 1
        // }],
        line_items: cart,
        mode: 'payment',
        success_url: "http://localhost:3000/?success=true",
		cancel_url: "http://localhost:3000/?canceled=true",
    })
    res.json({
        session
    })
}