const express = require("express");
const router = express.Router();
const prisma = require("../client");
const { verify } = require("../util");

router.post("/", verify, async (req, res, next) => {
  console.log(req.user);
  try {
    // Find the Order to add to
    const order = await prisma.order.findFirst({
      where: {
        user_id: req.user.id,
        completed: false,
      },
    });
    // Create new Cart item with Order_id & product info
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
// DELETE /api/cart/:id
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCart = await prisma.cart.delete({
      where: {
        id: +id,
      },
    });
    res.status(200).send(deletedCart);
  } catch (error) {
    console.error(error);
  }
});

router.put("/update/inc", verify, async (req, res, next) => {
  const { watchId } = req.body;
  try {
    const order = await prisma.order.findFirst({
      where: {
        user_id: req.user.id,
        completed: false,
      },
    });
    const update = await prisma.cart.findFirst({
      where: {
        order_id: order.id,
        watch_id: watchId,
      },
    });

    const updatedItem = await prisma.cart.update({
      where: {
        id: update.id,
      },
      data: {
        quantity: update.quantity + 1,
      },
    });
    res.status(200).send(updatedItem);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
