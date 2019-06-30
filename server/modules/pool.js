const pg = require('pg');
const url = require('url');
let config = {};

if (process.env.DATABASE_URL) {
    // Heroku gives a url, not a connection object
    // https://github.com/brianc/node-pg-pool
    let params = url.parse(process.env.DATABASE_URL);
    let auth = params.auth.split(':');

    config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true, // heroku requires ssl to be true
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };

} else {
    // only change the things on the right side of the ||
    config = {
        user: process.env.PG_USER || null, //env var: PGUSER
        password: process.env.DATABASE_SECRET || null, //env var: PGPASSWORD
        host: process.env.DATABASE_SERVER || 'localhost', // Server hosting the postgres database
        port: process.env.DATABASE_PORT || 5432, //env var: PGPORT
        database: process.env.DATABASE_NAME || 'image_s3_upload', //env var: PGDATABASE or the name of your database (e.g. database: process.env.DATABASE_NAME || 'koala_holla',)
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };
}

module.exports = new pg.Pool(config);