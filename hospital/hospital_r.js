// load middleware
const middleAuth = require('../middlewares/auth.middleware');
const hospitalMid = require('./hospital_c');
const configLevel = require('../middlewares/secret.env'); 

const LV_ADMIN = configLevel.permisionLevels.SUPER_ADMIN;
const LV_USER = configLevel.permisionLevels.USER;

exports.routersConfig = (app) => {

    app.get('/v2/hospitals', [
        middleAuth.check_credential,
        middleAuth.check_permission_level([LV_ADMIN, LV_USER]),
        hospitalMid.get_all
    ]);
    
    app.get('/v2/hospital/:id', [
        middleAuth.check_credential,
        middleAuth.check_permission_level([LV_ADMIN, LV_USER]),
        hospitalMid.get_one
    ])
    
    app.post('/v2/hospital', [
        middleAuth.check_credential,
        middleAuth.check_permission_level([LV_ADMIN]),
        hospitalMid.create
    ]);
    
    app.patch('/v2/hospital/:id', [
        middleAuth.check_credential,
        middleAuth.check_permission_level([LV_ADMIN]),
        hospitalMid.update
    ]);
    
    app.delete('/v2/hospital/:id', [
        middleAuth.check_credential,
        middleAuth.check_permission_level(LV_ADMIN),
        hospitalMid.delete
    ]);

}