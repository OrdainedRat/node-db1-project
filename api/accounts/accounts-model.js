const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts').where('id', id).first()
}

const create = async account => {
  const [accountid] = await db('accounts').insert(account)
  return getById(accountid)
}

const updateById = async (id, account) => {
  await db('accounts').where('id', id).update(account)
  return getById(id)
}

const deleteById = async id => {
  const deleted = await db('accounts').where('id', id).del()
  return deleted
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
