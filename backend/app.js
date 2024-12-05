const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
app.use(express.json());

const adminRoutes = require('./routes/adminRoutes');


app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/admin', adminRoutes);


const mongoUrl = "mongodb+srv://nexusctc2020:chakra@cluster0.dbvsu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";

mongoose
    .connect(mongoUrl)
    .then(()=>{
        console.log("MongoDB connected");
    })
    .catch((e)=>{
        console.log("Error: ",e);
    })


require("./UserDetails");
const User = mongoose.model("UserInfo");


app.get("/",(req,res) => {
    res.send({status: "started" });
})

app.post("/register", async(req, res) => {
    const {name, email, mobile, password} = req.body;

    const oldUser = await User.findOne({email: email});
    if (oldUser) {
        return res.send({data: "User already exists!!"})
    }

    const encryptPassword = await bcrypt.hash(password,10);

    try {
        await User.create({
            name: name,
            email: email,
            mobile, //also write
            password: encryptPassword,
        });
        res.send({status: "ok", data: "User Created"});
    } catch (error) {
        res.send({status: "error",data: error});
    }
});

app.post("/login-user", async(req, res) => {
    const {email, password} = req.body;
    const oldUser = await User.findOne( {email: email} );

    if(!oldUser){
        return res.send({data: "User doesn't exits!!"})
    }
    if(await bcrypt.compare(password, oldUser.password)) {
        const token = jwt.sign({email: oldUser.email}, JWT_SECRET);
        if (res.status(201)) {
            return res.send({status: "ok", data: token});
        } else {
            return res.send({ error: "error"});
        }
    }
});

//to get data of user
app.post("/userdata", async(req, res) => {
    const {token} = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const useremail = user.email;
        User.findOne({email: useremail}).then((data) => {
            return res.send({ status: "Ok", data: data});
        })
    } catch(error) {
            return res.send({ error: error});
    }
})

//to update temples
app.put('/admin/update-temple/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedTemple = req.body;
      await Temple.findByIdAndUpdate(id, updatedTemple, { new: true });
      res.status(200).send({ message: 'Temple updated successfully!' });
    } catch (error) {
      res.status(500).send({ error: 'Failed to update temple.' });
    }
  });
  

app.listen(5001,() => {
    console.log("NodeJS server has started...")
})
