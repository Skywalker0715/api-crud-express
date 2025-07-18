const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000
const postRoutes = require('./routes/postRoutes.js'); // Import postRoutes

app.get('/', (req, res) => {
  res.send('Hello World Testing!')
})

// Middleware untuk parsing JSON
app.use(bodyParser.json());

app.use('/api', postRoutes); // Gunakan postRoutes pada path '/api'

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})