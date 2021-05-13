const express = require('express');
const routes = require('./routes');

// import sequelize connection
const sequelize = require('./config/connection'); // added in by Jason 

const app = express();
const PORT = process.env.PORT || 3006; // was originally 3001. Changed to 3006 because that is what mySQL connects with on test

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});

