//users.js
const express = require("express");
const router = express.Router();
const prisma = require("../client")
const bcrypt = require('bcrypt');



router.post("/users", async (req, res) => {
    const { username, password } = req.body;
    const SALT_ROUNDS = 5;
    try {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS); // Hash the password
  
      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });
  
      res.status(201).json({ message: "Registration successful" });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

// GET /api/users
router.get("/", async (req, res, next) => {
    try{
        const users = await prisma.user.findMany();
        res.status(200).send(users)
    } catch(error){
        console.error(error)

    }
});

router.get("/:id", async (req, res, next) => {
    const {id} = req.params;
    try{
        const user = await prisma.user.findUnique({
            where: { 
               id: +id
            },
        });
        res.status(200).send(user);
    } catch(error){
        console.error(error);
    }
});

module.exports = router;