const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_URI = process.env.MONGODB_URI

const Festival = require('./../models/Festival.model')
const FoodStand = require('./../models/FoodStand.model')

const festivals = require('./../seeds/festivals.json')
const foodStands = require('./../seeds/foodstand.json')

mongoose
    .set("strictQuery", false)
    .connect(MONGO_URI)
    .then(async (x) => {
        try {
            const dbName = x.connections[0].name
            console.log(`Connected to Mongo! Database name: "${dbName}`)
            await Festival.deleteMany()
            const allFestivals = await Festival.create(festivals)

            await FoodStand.deleteMany()

            for (const foodstand of foodStands) {
                const oneFestival = await Festival.findOne({name: foodstand.festival})
                foodstand.festival = oneFestival._id
            }

            await FoodStand.create(foodStands)
            await mongoose.disconnect()
            console.log('Disconnected after creating Festivals and Food Stands')
        } catch (error) {
            console.error(error)
        }
    })