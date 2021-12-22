const {Schema, model} = require('mongoose')

const glassesSchema = Schema({
    nombre: {
		type: "String",
		required: true
	},
	color: {
		type: "String"
	},
	precioID: {
		type: String,
		required: true
	},
	productoID: {
		type: String,
		required: true
	},
	descripcion: 'String',
	img: 'String'
})

const Glasses = model('Glasses', glassesSchema)

module.exports = Glasses