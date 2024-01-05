const express = require("express");
const router = express.Router();
const prisma = require("../client");
const { verify } = require("../util");

router.get("/", verify,async (req, res, next) => {
    try{
        const orders = await prisma.order.findFirst({
            where: {
                user_id: req.user.id
            },
            include: {
                Cart: true
            }
        });
        res.status(200).send(orders)
    } catch(error){
        console.error(error)

    }
});

router.get("/:id", async (req, res, next) => {
    const {id} = req.params;
    try{
        const order = await prisma.order.findUnique({
            where: { 
               id: +id
            },
        });
        res.status(200).send(order);
    } catch(error){
        console.error(error);
    }
});

router.post("/", async (req, res, next) => {
    try{
        const orders = await prisma.order.findMany();
        res.status(200).send(orders)
    } catch(error){
        console.error(error)

    }
});

module.exports = router;