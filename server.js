const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/usersRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/movieRouter'))
app.use('/api', require('./routes/commentRouter'))



// Kết nối mongodb
const URI = process.env.MONGODB_URL
const connectDB = () => {
    try {
        mongoose.connect(URI, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("connected DB");
    }
    catch (error) {
        console.log(error.message);
    }
}
connectDB()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})