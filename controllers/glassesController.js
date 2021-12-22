const stripe = require("stripe")(process.env.STRIPE_SK);
const Glasses = require('./../models/Glasses')

exports.create = async (req, res) => {
  // Capturar los datos del formulario
  const { nombre, color, precio, descripcion, img } = req.body;
  // 1.- Stripe
  // New Product
  const newProductStripe = await stripe.products.create({
    name: nombre,
    description: descripcion,
    images: [img],
  })
  // Nuevo Precio
  const newProductStripeId = newProductStripe.id;
  const newProductStripeName = newProductStripe.name
  const newProductStripeDescription = newProductStripe.description
  const newProductStripeMetadataColor = newProductStripe.metadata.color
  const price = await stripe.prices.create({
    unit_amount: precio,
    currency: "usd",
    product: newProductStripeId,
    nickname: newProductStripeDescription,
    metadata: {
        'color': color
    }
  })
  const newProductPrice = price.id

  // 2.- Mongo DB
  const newGlasses = await Glasses.create({
    nombre: newProductStripeName,
    color: newProductStripeMetadataColor,
    descripcion: newProductStripeDescription,
    precioID: newProductPrice,
    productoID:newProductStripeId,
    img
  })
  res.json({
      msg: "Lentes creados con esxito",
      data: newGlasses
  })
}

exports.getOne = async (req, res) => {

	const { glassesID } = req.params

	try {

		const glasses = await Glasses.findById(glassesID)

		res.json({
			msg: "Lentes obtenidos con éxito.",
			data: glasses
		})

	} catch (error) {

		console.log(error)

		res.status(500).json({
			msg: "Hubo un error obteniendo los datos."
		})
	}
}

exports.getAll = async (req, res) => {

	try {

		const glasses = await Glasses.find({})

		res.json({
			msg: "Lentes obtenidos con éxito.",
			data: glasses
		})


	} catch (error) {

		console.log(error)

		res.status(500).json({
			msg: "Hubo un error obteniendo los datos"
		})

	}

}