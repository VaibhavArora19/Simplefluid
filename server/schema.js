const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const permissionSchema = new Schema({
    operatorAddress: String,
    sender: String,
    permissions: [String],
    isRevoked: Boolean
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;