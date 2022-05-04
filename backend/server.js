const express = require('express')
const mongoose = require('mongoose')
const Bug = require('./model')
const bp = require('body-parser')
const cors = require('cors')

const PORT = 3000;

const app = express();

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(cors({
    origin: '*'
}));

const uri = "mongodb+srv://ronofir97:ron123456@cluster0.4yo6b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});


app.get('/', (req, res) => {
    res.send('Hello from backend application!')
});

app.post('/add-bug', async (req,res) => {
    const bug = new Bug({
        BugId : req.body.BugId,
        Channel : req.body.Channel,
        Service : req.body.Service,
        Description : req.body.Description
    });

    // console.log("CounterID",counter_id);

    await bug.save();
    console.log(req.body)

    res.send({msg: "Bug added successfully!", data: bug});

});

app.get('/bugs', async (req,res) => {
    const bugs = await Bug.find();
    res.send(bugs)
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

