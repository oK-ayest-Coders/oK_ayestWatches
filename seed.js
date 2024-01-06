const { urlencoded } = require("body-parser");
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
    image:"put picture here",
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

  const skyDweller  = await prisma.watches.create({
    data: {
    image: "put link here",
    name: "skyDweller",
    brand: "rolex",
    type: "analog",
    craftdate: "2014",
    size: "m",
    in_stock: true,
    description: "Living in the sky",
    price: 45_000 
    }
  });

  const airKing = await prisma.watches.create({
    data: {
    image: "put link here",
    name: "airKing",
    brand: "rolex",
    type: "analog",
    craftdate: "2018",
    size: "m",
    in_stock: true,
    description: "The supreme flyer",
    price: 25_000 
    }
  });

  const seaDweller = await prisma.watches.create({
    data: {
    image: "put link here",
    name: "seaDweller",
    brand: "rolex",
    type: "analog",
    craftdate: "2015",
    size: "m",
    in_stock: true,
    description: "Monsters in the deep",
    price: 35_000 
    }
  });

  const dayDate = await prisma.watches.create({
    data: {
    image: "put link here",
    name: "dayDate",
    brand: "rolex",
    type: "analog",
    craftdate: "2015",
    size: "m",
    in_stock: true,
    description: "Walk in the park",
    price: 55_000 
    }
  });

  const explorer40 = await prisma.watches.create({
    data: {
    image: "put link here",
    name: "explorer40",
    brand: "rolex",
    type: "analog",
    craftdate: "2015",
    size: "m",
    in_stock: true,
    description: "Views from above",
    price: 35_000 
    }
  });

  const dateJust = await prisma.watches.create({
    data: {
    image: "put link here",
    name: "dateJust",
    brand: "rolex",
    type: "analog",
    craftdate: "2015",
    size: "m",
    in_stock: true,
    description: "A new day",
    price: 29_000 
    }
  });

  const gmtMaster = await prisma.watches.create({
    data: {
    image: "put link here",
    name: "gmtMaster",
    brand: "rolex",
    type: "analog",
    craftdate: "2015",
    size: "m",
    in_stock: true,
    description: "The best of the best",
    price: 75_000 
    }
  });

  const deepSea = await prisma.watches.create({
    data: {
    image: "put link here",
    name: "deepSea",
    brand: "rolex",
    type: "analog",
    craftdate: "2015",
    size: "m",
    in_stock: true,
    description: "Pirates are real",
    price: 45_000 
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
    quantity: 1,
    name: yatch_master.name
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
