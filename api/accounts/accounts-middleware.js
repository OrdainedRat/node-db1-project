const Accounts = require('./accounts-model')
const db = require('../../data/db-config')
exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const { name, budget } = req.body
    console.log('budget here', budget)
    if(name === undefined || budget === undefined) {
      res.status(400).json({ message: "name and budget are required" })
    } else if(typeof budget !== 'number') {
      res.status(400).json({ message: "budget of account must be a number" })
    } else if ( name.trim().length < 3 || name.trim().length > 100) {
      res.status(400).json({ message: "name of account must be between 3 and 100" })
    } else if(budget < 0 || budget > 1000000) {
      res.status(400).json({ message: "budget of account is too large or too small" })
    } else {
      req.body.name = name.trim()
      next()
    }
  } catch(err) {
    next(err)
}
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const exits = await db('accounts')
      .where('name', req.body.name.trim())
      .first()
    if(exits) {
      next({status: 400, message: 'that name is taken'})
    } else {
      next()
    }
  } catch(err) {
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  try{
    const account = await Accounts.getById(req.params.id)
    console.log('account', account)
    if(!account) {
      next({ status: 404, message: "account not found"})
    } else {
      req.account = account
      next()
    }
  } catch(err){
    next(err)
  }
}

