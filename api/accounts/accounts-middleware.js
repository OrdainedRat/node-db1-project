
const db = require('../../data/db-config')
exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const { name, budget } = req.body
    const length = name.trim().length()
    if(name === undefined || budget === undefined) {
      res.status(400).json({ message: "name and budget are required" })
    } else if(typeof budget !== 'number') {
      res.status(400).json({ message: "budget of account must be a number" })
    } else if ( length < 3 || length > 100) {
      res.status(400).json({ message: "name of account must be between 3 and 100" })
    } else if(budget < 0 || budget > 1000000) {
      res.status(400).json({ message: "budget of account is too large or too small" })
    } else {
      next()
    }
  } catch(err) {
  res.status(500).json(err)
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const exits = await db('accounts')
      .where('name', req.body.name.trim())
      .first()
    if(exits) {
      res.status(400).json({ message: "that name is taken" })
    }
  } catch(err) {
    next(err)
  }
}

exports.checkAccountId = (req, res, next) => {
  const { id } = req.params
  try{
    if(!id) {
      res.status(404).json({ message: "account not found" })
    } else {
      next()
    }
  } catch(err){
    res.status(500).json(err)
  }
}
}
