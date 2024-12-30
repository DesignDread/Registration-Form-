import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from 'bcryptjs';
import Employee from "./model/employee.model.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Student", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

app.post("/register", async (req, res) => {
    const { name, email, password, confirmPassword, dob, address, city, gender } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    bcrypt.hash(password, 10).then((hash) => {
        Employee.create({ name, email, password: hash, dob, address, city, gender })
            .then(employee => res.json(employee))
            .catch(err => res.status(400).json(err));
    });
});

app.post("/login", async (req, res) => {
    const { password } = req.body;
    Employee.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (error, result) => {
                    if (result) {
                        res.status(200).json("Success");
                    } else {
                        res.status(401).json("Invalid password");
                    }
                });
            } else {
                res.status(404).json("User not registered");
            }
        })
        .catch(err => res.status(400).json(err));
});

app.get("/", (req, res) => {
    Employee.find().then(employees => {
        res.json(employees);
    }).catch(err => res.status(400).json(err));
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
