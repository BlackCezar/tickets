var express = require('express');
const { Users, Ganres, Films, Halls, Orders, Sessions } = require('../db');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {

  if (req.session.auth) {
    const users = await Users.find({admin: false})
    const ganres = await Ganres.find().populate('parent')
    const films = await Films.find().populate('ganre')
    const halls = await Halls.find()
    const sessions = await Sessions.find().populate('film').populate('hall')
    let orders = await Orders.find().populate('session').populate('user')

    for (order of orders) {
      if (order.session && order.session.film) order.session.film = await Films.findOne({_id: order.session.film})
    }

    console.log(orders[0])

    res.render('index', { title: 'Учет продаж', users, ganres, films, halls, sessions, orders, auth: req.session });
  } else {
    res.redirect('/auth')
  }
});


router.get('/logout', async (req, res) => {
  req.session.userid = null
  req.session.auth = null
  res.redirect('/auth')
})


module.exports = router;
