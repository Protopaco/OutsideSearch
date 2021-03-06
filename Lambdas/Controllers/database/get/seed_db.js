const db_client = require('./db_client')

exports.handler = async (event) => {
    const { body } = event;

    console.log(body)

    if (body && body.name && body.img_url && body.info_url) {
        try {
            const SQLCommand = `INSERT INTO games (name, img_url, info_url) VALUES ('${body.name}', '${body.img_url}', '${body.info_url}') RETURNING *`
            console.log(SQLCommand)

            const { rows } = await db_client(SQLCommand)

            return {
                statusCode: 200,
                body: JSON.stringify(rows),
            };
        } catch (e) {
            console.log(e.message)
            return { statusCode: 500, body: JSON.stringify({ "error": e.message }) }
        }

    }

    return {
        statusCode: 500,
        body: JSON.stringify({ "error": "Invalid data" })
    }
};
