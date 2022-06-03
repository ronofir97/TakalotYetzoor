const express = require('express')
const mongoose = require('mongoose')
const Bug = require('./model')
const bp = require('body-parser')
const cors = require('cors')
const PORT = 3000;
const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }))
const redirectUrl = 'http://127.0.0.1:5500/frontend/dashboard.html';

//#region The portthat  can to get the serever - here this is all the ports**
app.use(cors({
    origin: '*'
}));
//#endregion

//#region  Connection to the DB --- 
const uri = "mongodb+srv://ronofir97:ron123456@cluster0.4yo6b.mongodb.net/ProductionBugs?retryWrites=true&w=majority"
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
});
//#endregion

//#region get to root ('/') - only to check the server
app.get('/', (req, res) => {
    res.send('Hello from backend application!')
});
//#endregion

//#region Add bug to db
app.post('/add-bug', async (req, res) => {
    const bug = new Bug({
        BugId: req.body.BugId,
        Channel: req.body.Channel,
        Service: req.body.Service,
        Description: req.body.Description,
        NumberInSnow: req.body.NumberInSnow,
        Status: req.body.Status,
        NumberInTheSystem: req.body.NumberInTheSystem,
        VersionForProd: req.body.VersionForProd
    });
    await bug.save();
    console.log(req.body)
    res.send({ msg: "Bug added successfully!", data: bug });
});
//#endregion

//#region Retrive all bugs
app.get('/bugs', async (req, res) => {
    const bugs = await Bug.find({},{_id:0 , __v: 0});
    res.send({data: bugs});
});
//#endregion

//#region Delete bug from db
app.post('/delete-bug', async (req, res) => {
    await Bug.deleteOne({BugId: req.body.ID});
    console.log("Bug deleted successfully"+ ""+ req.body.ID);
    res.redirect({msg:"Bug" + req.body.ID+ "deleted OK"});
  });
  //#endregion
  
//#region Server-Listen to port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
//#endregion

//#region Edit -GET- bug
app.post('/edit-bug', async (req, res) => {
    var bug = await Bug.findOne({BugId: req.body.BugToUpdate},{_id:0 , __v: 0});
    console.log(req.body.BugToUpdate);
    console.log(bug);
    res.send({data:bug});
  });
  //#endregion

//#region Edit - POST (update) - bug
app.post('/edit-bug-update' , async (req, res) => {
    const filter = { BugId: req.body.BugId };
    const update = {
        Channel: req.body.Channel,
        Service: req.body.Service,
        Description: req.body.Description,
        NumberInSnow: req.body.NumberInSnow,
        Status: req.body.Status,
        NumberInTheSystem: req.body.NumberInTheSystem,
        VersionForProd: req.body.VersionForProd
    };
    var bug = await Bug.findOneAndUpdate(filter, update, { new: true});
    await bug.save();
    console.log("Update sucssefuly");
    res.send({data:bug});
  });

//#endregion