require('dotenv').config('env');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');

const Permission = require("./schema");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const mongodbURI = process.env.MONGODB_URI;

mongoose.connect(mongodbURI, {useNewUrlParser: true})
.then(result => {
    console.log('Database connected');
})
.catch(err => {
    console.error(err);
});

app.get('/viewPermissions/:sender', async (req, res, next) => {
    const {sender} = req.params;

    const permissions = await Permission.find({sender});

    res.json(permissions);
});


app.post('/grantPermission', async (req, res, next) => {

    const {operatorAddress, sender, permissionType} = req.body;

    const availablePermission = await Permission.findOne({operatorAddress: operatorAddress, sender: sender});

    if(!availablePermission) {
        const newPermission = new Permission({
            operatorAddress,
            sender,
            permissions: [permissionType]
        });

        newPermission.save();
        
        res.json('Permission created successfully');
        return;
    }

    if(availablePermission.permissions.includes(permissionType)) {
        res.json('Permission already granted');
        return;
    }

    availablePermission.permissions.push(permissionType);
    availablePermission.save();
    res.json('Permission sucessfully granted');
});

app.post('/revokePermission', async (req, res, next) => {

    const {operatorAddress, sender} = req.body;

    const availablePermission = await Permission.findOne({operatorAddress: operatorAddress, sender: sender});

    if(!availablePermission) {
        res.json('Permission does not exist');
        return;
    }

    const deletePermission = await Permission.deleteOne({operatorAddress: operatorAddress, sender: sender}); 

    res.json('Permission deleted Sucessfully');
});



app.listen(8080, console.log("Listening on port 8080"));