const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3200
const path = require('path')
const connectDB = require('./config/database');
connectDB()


app.use(express.json())

app.use(cors())
app.get('/',(req,res)=>{
    res.send("server is running")

})

app.use('/', express.static(path.join(__dirname, 'static')))
app.use('/routes',require('./route/admin/auth'))
app.use('/routes',require('./route/auth'))

app.listen(PORT,console.log(`server is Running On Port ${PORT}`));