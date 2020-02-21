const express = require('express')
const userRouter = require('./routers/user')
const port = process.env.PORT
require('./db/db')

const app = express()

app.use(express.json())
app.use("/users", userRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})