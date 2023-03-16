// const User = require('./../models/User.model')
// const jsonWebToken = require('jsonwebtoken')

async function isAdmin(req, res, next) {
  try {
    console.log("------------------------------------", req.user)
    if (req.user.userType === "admin") {
        next()
    }
    // Everything went well go to the next route
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Invalid Token.', error })
  }
}

module.exports = isAdmin
