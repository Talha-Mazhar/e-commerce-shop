import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

//env config
dotenv.config()

// Initialize Express application
const app = express()

// Connect to MongoDB
connectDB()

// Define port
const port = process.env.PORT || 5000

// Middleware
app.use(express.json()) // Parse JSON bodies
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies
app.use(cookieParser()) // Parse cookies

// Allow requests from localhost:3000 during development
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

// Routes
app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
