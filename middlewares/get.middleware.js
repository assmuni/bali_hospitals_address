const Hospital = require('../hospital/hospital_m');

exports.get_data = (req, res, next) => {
    if (!req.query.name) return next();

    Hospital.find({ name: { $regex: '.*' + req.query.name + '.*', $options: 'i'}}, (err, data) => {
        if (err) {
            res.status(402).json({message: err.message});
        } else {
            res.status(201).json({
                data: data
            });
        }
    });
}