const router = require("express").Router();
const FoodStand = require("./../models/FoodStand.model")
const Festival = require("./../models/Festival.model")

// routes are prefixed by /api/stand

router.get('/', async(req, res, next) => {
    try {
        const foodstands = await FoodStand.find()
        res.json(foodstands)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async(req, res, next) => {
    try {
       const oneFoodStand = await FoodStand.findById(req.params.id).populate('festival')
       res.json(oneFoodStand) 
    } catch (error) {
        next(error)
    }
})

router.post('/', async(req, res, next) => {
    try {
        const { name, description, festival } = req.body
        const createdFoodStand = await FoodStand.create({name, description, festival})
        res.status(201).json(createdFoodStand)
    } catch (error) {
        next(error)
    }
})

router.patch('/:id', async(req, res, next) => {
    try {
        const { id } = req.params
        const { name, description } = req.body

        const updatedFoodStand = await FoodStand.findByIdAndUpdate(
            id,
            { name, description },
            { new: true}
        )
        res.status(202).json(updatedFoodStand)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async(req, res, next) => {
    try {
        await FoodStand.findByIdAndDelete(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})


module.exports = router;