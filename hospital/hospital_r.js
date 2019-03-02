// load middleware
const middleAuth = require('../middlewares/auth.middleware');
const hospitalMid = require('./hospital_c');
const configLevel = require('../middlewares/secret.env'); 

const LV_ADMIN = configLevel.permisionLevels.SUPER_ADMIN;
const LV_USER = configLevel.permisionLevels.USER;

const query_check = (req, res, next) => {
    return next(req.query.search ? 'route' : null);
}

exports.routersConfig = (app) => {

    app.get('/v3/hospitals', [
        query_check,
        middleAuth.check_credential,
        middleAuth.check_permission_level([LV_ADMIN, LV_USER]),
        hospitalMid.get_all
    ]);
    
    app.get('/v3/hospital', [
        middleAuth.check_credential,
        middleAuth.check_permission_level([LV_ADMIN, LV_USER]),
        hospitalMid.get_search
    ]);
    
    app.get('/v3/hospital/:id', [
        middleAuth.check_credential,
        middleAuth.check_permission_level([LV_ADMIN, LV_USER]),
        hospitalMid.get_one
    ]);

    app.post('/v3/hospital', [
        middleAuth.check_credential,
        middleAuth.check_permission_level([LV_ADMIN]),
        hospitalMid.create
    ]);
    
    app.patch('/v3/hospital/:id', [
        middleAuth.check_credential,
        middleAuth.check_permission_level([LV_ADMIN]),
        hospitalMid.update
    ]);
    
    app.delete('/v3/hospital/:id', [
        middleAuth.check_credential,
        middleAuth.check_permission_level(LV_ADMIN),
        hospitalMid.delete
    ]);

}