//auth.jsx
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const prisma = require("../client");
const router = express.Router();

//make a route to handle login 
router.post("/login", async (req, res, next) => {
const {username, password } = req.body;
// make sure they enter a username and password then check if its in the database
if (!username || !password ){
    res.status(401).send({message: "Incorrect username or password"});
    return;
}
try{
    const user = await prisma.user.findUnique({
        where:{
            username,
        },
    });

const isValid = await bcrypt.compare(password, user.password);

if (!isValid){
    res.status(401).send({message: "Not authorized!"});
    return;
}
console.log(process.env.JWT_SECRET)
const token = jwt.sign(
    { id: user.id, username: user.name },
    process.env.JWT_SECRET
);
res.status(200).send({ token });
} catch (error) {
console.error(error);
}

});
// make a route for creating a user then make a token for that user do error checking 
router.post("/users", async (req, res, next) => {
    const { username, password } = req.body;
    const SALT_ROUNDS = 5;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });
        const token = jwt.sign(
            { id: user.id, username: user.name },
            process.env.JWT_SECRET
        );
        res.status(201).send({ token });
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;