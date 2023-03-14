const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jsonWebToken = require('jsonwebtoken')
const User = require('./../models/User.model')
const isAuthenticated = require('./../middlewares/isAuthenticated')

// routes are prefixed with /api/auth

router.post('/signup', async (req, res, next) => {

    try {
        const { username, email, password } = req.body

        if(!username || !email || !password){
            return res
                .status(400)
                .json({ message: 'Please fill all the fields'})
        }

        const foundUser = await User.findOne({ email: email })
        if(foundUser){
            return res
                    .status(400)
                    .json({ message: 'this email is already registered'})
        }

        const generatedSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, generatedSalt)

        await User.create({
            username,
            email,
            password: hashedPassword
        })
        return res.status(201).json('The user was created')
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Something went wrong', error})
    }
  })

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password){
        res.status(400).json({ message: 'Please fill all the fields'})
        return
    }

    try {
      
      const foundUser = await User.findOne({ email })
      console.log("back-end auth", foundUser)
        if(!foundUser){
            res.status(401).json({ message: "User not found"})
            return
        }

        const passwordCorrect = bcrypt.compare(password, foundUser.password)

        if(!passwordCorrect){
            return res.status(401).json({ message: "Wrong credentials"})
        }

        const token = jsonWebToken.sign(
            { id: foundUser._id },
            process.env.TOKEN_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '2h'
            }
        )
        return res.status(200).json({ token, 
            message: 'Token created' })

    } catch (error) {
        next(error)
    }        
})

router.get('/profile', isAuthenticated, async (req, res, next) => {
    res.json(req.user)
})

//  route log out!!!!!
router.get('/logout', (req, res, next) => {
    req.session.destroy((error) => {
      if (error) {
        return next(error)
      }
      res.redirect('/login')
    })
  })
module.exports = router