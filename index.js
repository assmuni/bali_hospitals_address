const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
// const router = express.Router();

// const userRouter = require('./user/user_r');
// const hospitalRouter = require('./hospital/hospital_r');

const authRouter = require('./auth/auth_r');
const hospitalRouter = require('./hospital/hospital_r');
const userRouter = require('./user/user_r');

mongoose.connect('mongodb://localhost/portofolio', { useNewUrlParser: true });
// mongoose.connect('mongodb://userHospital:hospital123@ds157509.mlab.com:57509/portofolio', { useNewUrlParser: true });

// middleware bodyparser
app.use(bodyParser.json());

// middleware_routing
// app.use('/auth', require('./middlewares/auth_r'));
// app.use('/v2', [userRouter, hospitalRouter]);

authRouter.routersConfig(app);
hospitalRouter.routersConfig(app);
userRouter.routersConfig(app);

// middleware_error_handling
app.use((err, req, res, next) => {
    res.status('422').send({message: err.message});
});

app.get('/', (req, res) => {
    res.json({message: 'connected'});
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port", this.address().port);
});