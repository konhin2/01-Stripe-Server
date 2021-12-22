const express = require('express')
const app = express()

const connectDB = require('./config/db')
const cors = require('cors')

require('dotenv/config')
connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/checkout', require('./routes/checkout'))
app.use('/api/glasses', require('./routes/glasses'))

app.listen(process.env.PORT, () => {
    console.log(`Listen on port: https://localhost:${process.env.PORT}`)
})