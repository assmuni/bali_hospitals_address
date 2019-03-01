const middleAuth =  require('../middlewares/auth.middleware');


exports.routersConfig = (app) => {

    app.post('/auth/login', [middleAuth.check_auth, middleAuth.create_token], (req, res) => {
        res.status(201).json({
            auth: true,
            token: req.token
        });
    });
    
    app.get('/auth/logout', (req, res) => {
        res.status(201).json({
            atuh: false,
            token: null
        });
    });

}
