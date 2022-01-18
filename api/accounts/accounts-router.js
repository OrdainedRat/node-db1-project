const router = require('express').Router()
const Accounts = require('./accounts-model')
const md = require('./accounts-middleware')


router.get('/', async (req, res, next) => {
  Accounts.getAll()
    .then(accounts => {
      res.status(200).json(accounts)
    })
    .catch(err => {
      next(err)
    })
})

router.get('/:id', md.checkAccountId,  async (req, res, next) => {
  console.log('working here ig', req.account)
  res.status(200).json(req.account)
})

router.post('/', md.checkAccountPayload, md.checkAccountNameUnique,  async (req, res, next) => {
  Accounts.create(req.body)
    .then(account => {
      res.status(201).json(account)
    })
    .catch(err => {
      next(err)
    })
})

router.put('/:id', md.checkAccountId, md.checkAccountPayload, md.checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.updateById(req.params.id)
    .then(updated => {
      res.status(200).json(updated)
    })
    .catch(err => {
      next(err)
    })
});

router.delete('/:id', md.checkAccountId, async (req, res, next) => {
  Accounts.deleteById(req.params.id)
    .then(deleted => {
      res.status(200).json(deleted)
    })
    .catch(err => {
      next(err)
    })
})

router.use((err, req, res, next) => { 
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
