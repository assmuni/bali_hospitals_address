const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    address : {
        type: String,
        require: [true, 'hospital\'s address is required']
    },
    districts: {
        type: String,
        require: [true, 'districts is required']
    },
    postal_code: {
        type: Number,
        default: '0'
    },
    phone: {
        type: String,
        require: [true, 'phone number is required']
    },
    fax: {
        type: String,
        require: [true, 'fax number is required']
    },
    email: {
        type: String,
        require:  [true, 'email is required']
    }
});

const hospitalSchema = new Schema({
    code: {
        type: Number,
        require: [true, 'hospital\'s code is required']
    },
    name: {
        type: String,
        require: [true, 'hospital\'s name is required']
    },
    type: {
        type: String,
        require: [true, 'hospital\'s type is required']
    },
    class: {
        type: String,
        require: [true, 'hospital\'s class is required']
    },
    owner: {
        type: String,
        require: [true, 'hospital\'s owner is required']
    },
    location: locationSchema,
    last_update: {
        type: Date,
        defaul: '0000-00-00'
    }
});

const hospitalModels = mongoose.model('hospitals', hospitalSchema);
module.exports = hospitalModels;