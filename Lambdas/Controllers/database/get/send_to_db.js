const pg = require('pg');

module.exports = async (SQLCommand) => {
    const Client = pg.Client;

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: "allow" && { rejectUnauthorized: false }
    });

    client.connect(err => {
        if (err) {
            console.error('connection error', err.stack);
        } else {
            console.log('connected');
        }
    });

    return await client.query(SQLCommand);
};
