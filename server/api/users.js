const router = require('express').Router()
const { models: { User, Order_Products, Product }} = require('../db');
const Order = require('../db/models/Order');
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
});


//another attempt at viewcart:
router.get('/viewcart/:userId', async (req, res, next) => {

  try{
    const {userId} = req.params;
    const openOrders = await Order.findOne({where:{
      status: 'open',
      userId: userId,
      include: {
        model: Order_Products
      }
    }});
    res.send(openOrders);
  }catch(err){
    next(err);
  }
});


//view all closed orders of a user
router.get('/vieworders/:userId', async (req, res, next) => {
  try{
    const {userId} = req.params;
    const openOrders = await Order.findOne({where:{
      status: 'closed',
      userId: userId,
      include: {
        model: Order_Products
      }
    }});
    res.send(openOrders);
  }catch(err){
    next(err);
  }
});




//creating a new User
router.post('/newUser', async (req, res, next) => {
  try{
    const {email, password, firstName, lastName, phoneNumber, shippingAddress, billingAddress} = req.body;
    const newUser = await User.create({email, password, firstName, lastName, phoneNumber, shippingAddress, billingAddress}) 
    res.send(newUser);
  }catch(err){
    next(err)
  }
});

//route to set order status from open to closed:
router.put('/checkout/:id', async (req, res, next) => {
  try{
    const {id} = req.params;
    const ordersToClose = await Order.findOne({where: {
    userId: id,
    status: 'open'
  }});
  await order.update({status: 'closed'});
  res.send(ordersToClose)
  }catch(err){
    next(err)
  }
});


router.put('/additem/:id', async (req, res, next) => {
  try{
    const product = await Product.findByPk(req.body.id);
    const {id} = req.params;
    const user = await User.findByPk(id, {
      include:{
        model: Order,
        where: {
          status: 'open'
        }
      }
    });
    const orderToAddTo = await Order.findByPk(user.order.id);
    await orderToAddTo.addProduct(product);
    res.send(orderToAddTo);
  }catch(err){
    next(err)
  }
});

//add item to cart:
router.put('/addToCart/:productId', async (req, res, next) => {
  try{
  const {userId} = req.body;
  const {productId} = req.params;
  const product = await Product.findByPk(productId);
  const order = await Order.findOne({where: {userId: userId, status:'open', include:{
    Order_Products
  }}});
  await order.addProduct(product);
  res.send(order);
  }catch(err){
    next(err);
  }
});

// //route to remove an item from a cart (open order)
// router.delete('/removeitem/:itemId', async (req, res, next) => {
//   try{
//     const {itemId} = req.params;
//     const item = await Order_Products.findByPk(itemId, {where:{
//       status: 'open' //put status to open to make sure we don't delete orders that are closed (past orders)
//     }});
//     await item.destroy();
//     res.send(item);
//   }catch(err){
//     next(err)
//   }
// });
//removing an item
router.put('/removeItem/:productId', async (req, res, next) => {
  try{
  const {userId} = req.body;
  const {productId} = req.params;
  const product = await Product.findByPk(productId);
  const order = await Order.findOne({where: {userId: userId, status:'open', include:{
    Order_Products
  }}});
  await order.removeProduct(product);
  res.send(order);
  }catch(err){
    next(err);
  }
});