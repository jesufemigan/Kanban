const express = require('express')

const app = express()
app.use('/api/v1/boards/')

app.listen(5000, () => console.log('App is running'))