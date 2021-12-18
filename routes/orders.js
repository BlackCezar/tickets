var express = require('express');
const { Orders, Ganres, Sessions, Users } = require('../db');
var router = express.Router();


router.post('/', async function(req, res, next) {
  try {
    if (!req.body.session) throw {
      error: 403,
      message: 'no_session'
    } 

    let order = new Orders({
      session: req.body.session,
      datetime: Date.now(),
      count: Number(req.body.count),
      points: req.body.points,
      user: req.session.userid,
      amount: Number(req.body.amount) 
    })

    order = await order.save()
    order.session = await Sessions.findOne({_id: order.session}).populate('film')
    order.user = await Users.findOne({_id: order.user})


    if (order) {
      res.json(order)
    } else res.sendStatus(403)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
});


router.delete('/:id', async function(req, res, next) {
  try {
    if (!req.params.id) throw {
      error: 403,
      message: 'no_id'
    } 

    let order = await Orders.deleteOne({ _id: req.params.id })

    if (order) {
      res.json(order)
    } else res.sendStatus(403)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
});


module.exports = router;
