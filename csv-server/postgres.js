const pgp = require('pg-promise')(/* options */)
require('dotenv').config();

class Connection {

    static async open() {
        if (this.db) return this.db;
        const db = pgp(this.url)
        this.db = db;
        return this.db
    }

}
Connection.db = null
Connection.url = `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DB}`

module.exports = { Connection }


