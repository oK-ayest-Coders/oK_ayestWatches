const express = require("express");
const router = express.Router();
const prisma = require("../client")

router.get("/", async (req, res, next) => {
    try{
        const watches = await prisma.watches.findMany();
        res.status(200).send(watches)
    } catch(error){
        console.error(error)

    }
});

router.get("/:id", async (req, res, next) => {
    const {id} = req.params;
    try{
        const watch = await prisma.watches.findUnique({
            where: { 
               id: +id
            },
        });
        res.status(200).send(watch);
    } catch(error){
        console.error(error);
    }
});

module.exports = router;