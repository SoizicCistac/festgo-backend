const router = require("express").Router();
const Festival = require("./../models/Festival.model")
const fileUpload = require('./../config/cloudinary.config');
const isAdmin = require("../middlewares/isAdmin");
const isAuthenticated = require("../middlewares/isAuthenticated");

// routes are prefixed by /api/festivals

// get all the festivals
router.get('/', async(req, res, next) => {
    try {
        const festivals = await Festival.find().sort({dateBeginning: 1})
        res.json(festivals)
    } catch (error) {
        next(error)
    }
})

// get one festival
router.get('/:id', async(req, res, next) => {
    try {
       const oneFestival = await Festival.findById(req.params.id)
       res.json(oneFestival) 
    } catch (error) {
        next(error)
    }
})

// send a picture
router.post("/images", isAuthenticated, isAdmin, fileUpload.single('picture'), (req, res, next) => {
    res.json({ picture: req.file.path });
  });

//   add a festival
router.post('/', isAuthenticated, isAdmin, async(req, res, next) => {

    try {
        const { name, dateBeginning, dateEnd, location, picture } = req.body
        console.log(req.body)
        const createdFestival = await Festival.create({name, dateBeginning, dateEnd, location, picture})
        res.status(201).json(createdFestival)
    } catch (error) {
        next(error)
    }
})

// update a festival
router.patch('/:id', isAuthenticated, isAdmin, async(req, res, next) => {
    try {
        const { id } = req.params
        const { name, dateBeginning, dateEnd, location, picture } = req.body
        const updatedFestival = await Festival.findByIdAndUpdate(
            id,
            { 
                name, 
                location, 
                dateBeginning, 
                dateEnd,
                picture
            },
            { new: true}
        )
        res.status(202).json(updatedFestival)
    } catch (error) {
        next(error)
    }
})

// delete a festival
router.delete('/:id', isAuthenticated, isAdmin, async(req, res, next) => {
    try {
        await Festival.findByIdAndDelete(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

module.exports = router;