const express = require('express')
const mongoose = require('mongoose')
const rootRoute = require('./routes/indexRoute')
//const registerRoute = require('./routes/registerRoute')

require('dotenv').config()
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/api/v1', rootRoute);
//app.use('/api/v1', registerRoute);



mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to the database')
}).catch(() => {
    console.log('There was an error connecting to your database')
})

const port = process.env.PORT || 5555
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})