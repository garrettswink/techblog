const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const path = require('path');

const sequelize = require('./config/connection');
const SequelizeSrore = require('connect-session-sequelize');

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};



const exphbs = require('express-handlebars');




const app = express();
const PORT = process.env.PORT || 3000;



app.use(routes);

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));



sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
}
);
