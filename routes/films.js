var express = require('express');
const { Films, Ganres } = require('../db');
var router = express.Router();

router.post('/', async function(req, res, next) {
  try {
    if (!req.body.filmName) throw {
      error: 403,
      message: 'no_ganre'
    } 

    let film = new Films({
      name: req.body.filmName,
      ganre: req.body.filmGanre ? req.body.filmGanre : null
    })
    film = await film.save()

    if (film) {
      res.json(film)
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

    let film = await Films.deleteOne({ _id: req.params.id })

    if (film) {
      res.json(film)
    } else res.sendStatus(403)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
});

module.exports = router;
