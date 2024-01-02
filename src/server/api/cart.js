const express = require("express");
const router = express.Router();
const prisma = require("../client")

router.post("/", async (req, res, next) => {
    try{
        const order = await prisma.order.findUnique({
            where: {
                user_id: 
            }
        });
        const cart = await prisma.cart.findMany();
        res.status(200).send(cart)
    } catch(error){
        console.error(error)

    }
});

router.delete("/", async (req, res, next) => {
    try{
        const cart = await prisma.cart.findMany();
        res.status(200).send(cart)
    } catch(error){
        console.error(error)

    }
});

router.put("/", async (req, res, next) => {
    try{
        const cart = await prisma.cart.findMany();
        res.status(200).send(cart)
    } catch(error){
        console.error(error)

    }
});

module.exports = router;