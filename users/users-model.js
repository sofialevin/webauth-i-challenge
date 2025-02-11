const db = require('../data/db-config.js');

function find() {
  return db('users').select('id', 'username');
}

function findBy(filter) {
  return db("users")
    .select("id", "username", "password")
    .where(filter)
    .first();
}

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}

module.exports = {
  add,
  find,
  findBy,
  findById,
};