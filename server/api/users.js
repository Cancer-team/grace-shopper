const router = require("express").Router();
const {
  models: { User, Product, Order },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "email"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//viewing cart

router.get("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const cart = await user.getCart();
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

//view all closed orders of a user

router.get("/orders", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const closedOrders = await Order.findAll({
      where: {
        status: "closed",
        userId: user.id,
      },
      include: {
        model: Product,
      },
    });
    res.send(closedOrders);
  } catch (err) {
    next(err);
  }
});

//creating a new User
router.post("/newUser", async (req, res, next) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      shippingAddress,
      billingAddress,
    } = req.body;
    const newUser = await User.create({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      shippingAddress,
      billingAddress,
    });

    await newUser.getCart();
    res.status(201).send(newUser);
  } catch (err) {
    next(err);
  }
});

//route to set order status from open to closed:

router.put("/checkout", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const ordersToClose = await Order.findOne({
      where: {
        userId: user.id,
        status: "open",
      },
    });
    await ordersToClose.update({ status: "closed" });
    res.send(ordersToClose);
  } catch (err) {
    next(err);
  }
});

//add item to cart:
// Quick question - Do we actually need this route? Since we are going to make an as

router.post("/addToCart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    let cart = await user.getCart();
    let cartId = cart.dataValues.id;

    // ORDER
    cart = await Order.findByPk(cartId, {
      include: {
        model: Product
      }
    });
 
    let productsInCartIDs = cart.products.map(product => product.dataValues.id);
   

    // PRODUCT
    let addThisProductToCart = req.body;
    let productId = addThisProductToCart.id;
    const productInfo = await Product.findByPk(productId);
    const product = productInfo.dataValues;
    
    let productIsInTheCartAlready = productsInCartIDs.includes(product.id);
    
    if (!productIsInTheCartAlready) {
      let updatedCart = await cart.addProduct(productInfo);
    }
    
    //
    // if (!cartProducts.includes(req.body)) 
    //
    // cart.setOrCreateProduct(req.body, {through: {quantity: quantity + 1}})

   
    // cart.addProduct(req.body, {through: {quantity: quantity++}});
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

//remove item from cart

router.put("/removeToCart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const cart = await user.removeFromCart(req.body);
    res.send(cart);
  } catch (err) {
    next(err);
  }
});
