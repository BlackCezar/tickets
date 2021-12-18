var express = require('express');
const { Halls } = require('../db');
var router = express.Router();


router.post('/', async function(req, res, next) {
  try {
    if (!req.body.hallName) throw {
      error: 403,
      message: 'no_name'
    } 

    let hall = new Halls({
      name: req.body.hallName,
      rows: req.body.hallRows,
      cols: req.body.hallCols,
    })
    hall = await hall.save()

    if (hall) {
      res.json(hall)
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

    let user = await Halls.deleteOne({ _id: req.params.id })

    if (user) {
      res.json(user)
    } else res.sendStatus(403)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
});

module.exports = router;
