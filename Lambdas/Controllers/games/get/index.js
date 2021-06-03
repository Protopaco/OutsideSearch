const db_client = require('./db_client');

exports.handler = async (event) => {
    const { id, offset } = event.data;

    if (id) {
        const SQLCommand = `SELECT * FROM games WHERE id = '${id}'`;
        const { rows } = await db_client(SQLCommand);
        return {
            statusCode: 200,
            body: JSON.stringify(rows)
        };
    }


    const SQLCommand = `SELECT * FROM games ORDER BY name DESC LIMIT 25 OFFSET ${offset ? offset : 0}`;
    const { rows } = await db_client(SQLCommand);

    return {
        statusCode: 200,
        body: JSON.stringify(rows),
    };
};
