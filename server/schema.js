const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const permissionSchema = new Schema({
    operatorAddress: String,
    sender: String,
    permissions: [String],
    isRevoked: Boolean
});

const idaSchema = new Schema({
    creator: String,
    indexId: String,
    subscribers: [String],
    units: String,
    isDistributed: Boolean
})

const Permission = mongoose.model('Permission', permissionSchema);
const Ida = mongoose.model('Ida', idaSchema);

module.exports = {
    Permission,
    Ida
};