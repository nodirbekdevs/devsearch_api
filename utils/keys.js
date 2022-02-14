const {genSaltSync} = require('bcryptjs')

const PORT = 6000
const mongo_url = 'mongodb://localhost/devsearch'
const mongo_options = {useNewUrlParser: true, useUnifiedTopology: true}
const salt = genSaltSync(10)
const secret_jwt = 'dev-search-api-jwt'

module.exports = {PORT, mongo_url, mongo_options, salt, secret_jwt}
