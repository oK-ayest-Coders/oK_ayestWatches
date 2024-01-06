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
    console.log(req.user);
  try {
    // Find the Order to add to
    const order = await prisma.order.findFirst({
      where: {
        user_id: req.user.id,
        completed: false,
      },
    });
    const cart = await prisma.cart.create({
        data: {
          order_id: order.id,
          watch_id: req.body.watch_id,
          price: req.body.price,
          quantity: req.body.quantity,
          name: req.body.name,
          userId: req.user.id,
        },
      });
    res.status(200).send(cart);
} catch (error) {
  console.error(error);
}
});

module.exports = router;