const userMid = require('./user_c');
const middleAuth = require('../middlewares/auth.middleware');
const config = require('../middlewares/secret.env');

const LV_ADMIN = config.permisionLevels.SUPER_ADMIN;
const LV_USER = config.permisionLevels.USER;

exports.routersConfig = (app) => {

    app.get('/v2/users', [
        middleAuth.check_credential,
        middleAuth.check_permission_level([LV_ADMIN, LV_USER]),
        userMid.get_all
    ]);

    app.post('/v2/user/reg', [
        userMid.create
    ]);

    app.patch('/v2/user/:id', [
        middleAuth.check_credential,
        middleAuth.check_permission_level([LV_ADMIN, LV_USER]),
        middleAuth.check_status_and_permission_level,
        userMid.update
    ]);


}


