const knex = require('knex')

const configSQLite3 = {
    client: 'sqlite3',
    connection: {
        filename: './database/chat.sqlite'
    },
}
const database = knex(configSQLite3)

module.exports = database