require('dotenv').config()

const express = require("express")
const app = express()
const cors = require('cors');
const mongoose = require("mongoose")

app.use('/uploads', express.static('uploads')); // Serve uploaded files

app.use(cors());

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to database"))

app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const productsRouter = require('./routes/products')
app.use('/products', productsRouter)

const filesRouter = require('./routes/files')
app.use('/files', filesRouter)

const authenticationRouter = require('./routes/authentication')
app.use('/auth', authenticationRouter)

const port = process.env.PORT;
app.listen(port, console.log("Server started "))