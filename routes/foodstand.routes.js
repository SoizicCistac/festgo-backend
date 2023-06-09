const router = require("express").Router();
const FoodStand = require("./../models/FoodStand.model")
const Festival = require("./../models/Festival.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdmin");

// routes are prefixed by /api/stand

// get all the food stands
router.get('/', async(req, res, next) => {
    try {
        const foodstands = await FoodStand.find().sort({name: 1})
        res.json(foodstands)
    } catch (error) {
        next(error)
    }
})

// get one food stand
router.get('/:id', async(req, res, next) => {
    try {
       const oneFoodStand = await FoodStand.findById(req.params.id).populate('festival')
       res.json(oneFoodStand) 
    } catch (error) {
        next(error)
    }
})

// add a food stand to a festival
router.post('/', isAuthenticated, isAdmin, async(req, res, next) => {
    try {
        const { name, description, festival, standType } = req.body
        const createdFoodStand = await FoodStand.create({name, description, festival, standType})
        res.status(201).json(createdFoodStand)
    } catch (error) {
        next(error)
    }
})

// update a food stand
router.patch('/:id', isAuthenticated, isAdmin, async(req, res, next) => {
    try {
        const { id } = req.params
        const { name, description, standType } = req.body

        const updatedFoodStand = await FoodStand.findByIdAndUpdate(
            id,
            { name, description, standType },
            { new: true}
        )
        res.status(202).json(updatedFoodStand)
    } catch (error) {
        next(error)
    }
})

// add a product to a stand
router.patch('/:id/addProduct', isAuthenticated, isAdmin, async(req, res, next) => {
    try {
        const { id } = req.params
        const { name, price } = req.body

        const addProduct = await FoodStand.updateOne(
            {_id : id},
            {$push : {products: { name, price }}},
        ).populate("products")
        res.status(202).json(addProduct)
    } catch (error) {
        next(error)
    }
})

// delete a stand
router.delete('/:id', isAuthenticated, isAdmin, async(req, res, next) => {
    try {
        await FoodStand.findByIdAndDelete(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})


module.exports = router;