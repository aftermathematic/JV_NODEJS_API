const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Routing
const userRoutes = require('./src/routes/user.routes');
const contactRoutes = require('./src/routes/contact.routes');
app.use('/users', userRoutes);
app.use('/contacts', contactRoutes);
app.get('/', (req, res) => {
  res.send("Welcome to the API of Jan Vermeerbergen");
});

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


