const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});


router.use('/auth', require('./auth.routes'))


router.use('/festivals', require('./festival.routes'))
router.use('/stand', require('./foodstand.routes'))

module.exports = router;
