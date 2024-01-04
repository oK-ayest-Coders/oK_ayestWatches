const prisma = require("./src/server/client");
const bcrypt = require("bcrypt");

async function seed() {
  const password = await bcrypt.hash("123", 5)
  const bob = await prisma.user.create({
    data: {
      username: "bob",
      password: password

    },
  });

  const jill = await prisma.user.create({
    data: {
      username: "jill",
      password: password

    },
  });

  const anna = await prisma.user.create({
    data: {
      username: "anna",
      password: password

    },
  })
;
  const yatch_master = await prisma.watches.create({
    data: {
    image: "put link here",
    name: "Yatch-Master",
    brand: "rolex",
    type: "analog",
    craftdate: "2018",
    size: "L",
    in_stock: true,
    description: "To keep your heading, no matter the circumstance.",
    price: 50_000 
    }
  });

  const submariner = await prisma.watches.create({
    data: {
    image: "put link here",
    name: "submariner",
    brand: "rolex",
    type: "analog",
    craftdate: "2015",
    size: "m",
    in_stock: true,
    description: "The supreme divers watch",
    price: 35_000 
    }
  });

  const order = await prisma.order.create({
    data: {
    user_id: bob.id,
    completed: false
    }
  });

  const cart = await prisma.cart.create({
    data: {
    order_id: bob.id,
    watch_id: yatch_master.id,
    price: 50_000,
    quantity: 1
    }
  });
}

seed()
.then(async () => {
  await prisma.$disconnect();
})
.catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
})
