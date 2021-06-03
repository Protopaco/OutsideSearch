const pg = require('pg');

exports.handler = async (event) => {

    const { SQLcommand } = event;
    // Use the pg Client
    const Client = pg.Client;
    // note: you will need to create the database!
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: "allow" && { rejectUnauthorized: false }
    });

    client.connect(err => {
        if (err) {
            console.error('connection error', err.stack)
        } else {
            console.log('connected')
        }
    })
    return await client.query(SQLcommand)
};
