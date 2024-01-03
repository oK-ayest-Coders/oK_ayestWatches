const express = require("express");
const router = express.Router();
const prisma = require("../client");
const { verify } = require("../util");


router.post("/", verify, async (req, res, next) => {
    console.log(req.user)
    try{
        // Find the Order to add to
        const order = await prisma.order.findFirst({
            where: {
                user_id: req.user.id,
                completed: false
            }
        });
        // Create new Cart item with Order_id & product info
        const cart = await prisma.cart.create({
            data: {
                order_id: order.id,
                watch_id: "*",
                price: "*",
                quantity: "*",
                userId: req.user.id

            }
        });
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