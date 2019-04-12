const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    address : {
        type: String,
        required: [true, 'hospital\'s address is required']
    },
    districts: {
        type: String,
        required: [true, 'districts is required']
    },
    postal_code: {
        type: Number,
        default: '0'
    },
    phone: {
        type: String
    },
    fax: {
        type: String,
        default: '0'
    },
    email: {
        type: String,
        required:  [true, 'email is required']
    }
});

const hospitalSchema = new Schema({
    code: {
        type: Number,
        required: [true, 'hospital\'s code is required']
    },
    name: {
        type: String,
        required: [true, 'hospital\'s name is required']
    },
    type: {
        type: String,
        required: [true, 'hospital\'s type is required']
    },
    class: {
        type: String,
        required: [true, 'hospital\'s class is required']
    },
    owner: {
        type: String,
        required: [true, 'hospital\'s owner is required']
    },
    location: locationSchema,
    last_update: {
        type: Date,
        required: true
    }
});

const hospitalModels = mongoose.model('hospitals', hospitalSchema);
module.exports = hospitalModels;