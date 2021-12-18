var express = require('express');
const { Users } = require('../db');
var router = express.Router();
const bcrypt  = require('bcrypt')

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (!req.session.auth) {
    res.render('auth', { title: 'Авторизация', auth: req.session });
  } else {
    res.redirect('/')
  }
});

router.post('/', async function(req, res, next) {
  try {
    if (!req.body.password) throw {
      error: 403,
      message: 'no_password'
    } 

    let password = req.body.password 

    console.log(password)
    const user = await Users.findOne({
      email: req.body.email
    })
    
    if (user) {
      console.log(user)
      let result = await bcrypt.compare(password, user.password)
       
      if (result) {
        req.session.userid = user._id
        req.session.auth = true
        req.session.admin = user.admin
        res.redirect('/')

      } else res.send(401)
    } else res.send(404)
  } catch (err) {
    console.error(err)
    res.send(500)
  }
});


module.exports = router;