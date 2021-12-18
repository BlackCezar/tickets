var express = require('express');
const { Users, Ganres } = require('../db');
var router = express.Router();
const bcrypt  = require('bcrypt')


router.post('/', async function(req, res, next) {
  try {
    if (!req.body.ganreName) throw {
      error: 403,
      message: 'no_ganre'
    } 

    let ganre = new Ganres({
      name: req.body.ganreName,
      parent: req.body.ganreParent ? req.body.ganreParent : null
    })
    ganre = await ganre.save()

    if (ganre) {
      res.json(ganre)
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

    let user = await Ganres.deleteOne({ _id: req.params.id })

    if (user) {
      res.json(user)
    } else res.sendStatus(403)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
});

module.exports = router;
