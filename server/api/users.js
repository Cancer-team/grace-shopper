const router = require('express').Router()
const { models: { User, Order_Products }} = require('../db');
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


//view all open orders (cart) of a user
router.get('/viewcart/:id', async (req, res, next) => {
  try{
    const {id} = req.params;
    const user = await User.findByPk(id, {
      include:{
        model: Order,
        where: {
          status: 'open'
        }
      }
    });
    res.send(user);
  }catch(err){
    next(err)
  }
});


//view all closed orders of a user
router.get('/vieworders/:id', async (req, res, next) => {
  try{
    const {id} = req.params;
    const user = await User.findByPk(id, {
      include:{
        model: Order,
        where: {
          status: 'closed'
        }
      }
    });
    res.send(user);
  }catch(err){
    next(err)
  }
});


//how to create an admin user? We need to put the userType admin in the req.body.

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
    const ordersToClose = await Order.findAll({where: {
    foreignKey: id,
    status: open
  }});
  await ordersToClose.update({status: closed});
  res.send(ordersToClose);

  }catch(err){
    next(err)
  }
});

//route to remove an item from a cart (open order)
router.delete('/removeitem/:itemId', async (req, res, next) => {
  try{
    const {itemId} = req.params;
    const item = await Order_Products.findByPk(itemId, {where:{
      status: 'open' //put status to open to make sure we don't delete orders that are closed (past orders)
    }});
    await item.destroy();
    res.send(item);
  }catch(err){
    next(err)
  }
});
