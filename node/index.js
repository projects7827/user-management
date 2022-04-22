const express = require("express");

const mongoose = require("mongoose");
const db = "mongodb+srv://prateek:Ajstyles.p1@cluster0.oosbf.mongodb.net/pt?retryWrites=true&w=majority";
mongoose.connect(db).then(function () { console.log("database connected") }).catch((err) => { console.log(err) });
const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        mobile: Number,

    }
)
const employeeSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        mobile: Number,
        post: String,
        joining: String,
        priority: Number,
        company: String,
        department: String
    }
)

const userModel = new mongoose.model("users", userSchema);
const employeeModel = new mongoose.model("employees", employeeSchema);
const app = express();
const jsonParser = express.json()
app.use(jsonParser);
app.post("/login", function (req, res) {
    userModel.findOne({ "email": req.body.email }, (error, data) => {
        if (error) {
            res.send({ "response-type": "success", "data": req.body.email })
        }
        else {

            if (data == null) {
                res.send("incorrect-email")
            }
            else {
                console.log(data);
                console.log("password");
                userModel.findOne({ "password": req.body.password }, (err, data2) => {
                    console.log(data2)
                    if (data2 == null) {
                        res.send("incorrect-password")
                    }
                    else {

                        res.send({ "response-type": "success", "data": req.body.email })
                    }
                })
            }
        }

    })
});
app.post("/register", function (req, res) {
    // console.log(req.body.fullname)
    // console.log(req.body.name)
    // console.log(req.body.post)
    // console.log(req.body.phone)
    // console.log(req.body.email)
    // console.log(req.body.password)
});
app.get("/get-info", function (req, res) {
    employeeModel.find((err, data) => {
        res.send(data);
    })
});

app.listen(8080, function () {
    console.log("express connected")
});