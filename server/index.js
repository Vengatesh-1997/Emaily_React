const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookiesession = require('cookie-session');
const bodyParser = require('body-parser');
require('./models/User');
require('./services/passport');
const keys = require('./config/keys');


mongoose.connect(keys.mongoURI);
const app = express();
//const authRoutes = require('./routes/authRoutes');
//authRoutes(app);
//for the above code..it is shorthand as below:
app.use(bodyParser.json());
app.use(
    cookiesession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);