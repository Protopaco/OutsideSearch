const db_client = require('./db_client')

exports.handler = async (event) => {
    const { body } = event;

    if (body && body.name && body.img_url && body.info_url && body.video_id) {
        try {
            const SQLCommand = `INSERT INTO games (name, img_url, info_url) VALUES ('${body.name}', '${body.img_url}', '${body.info_url}') RETURNING *`
            const { rows } = await db_client(SQLCommand);


            const SQLCommand2 = `INSERT INTO videos_games (video_id, game_id) VALUES(${body.video_id}, ${rows[0].id}) RETURNING *`;
            await db_client(SQLCommand2);

            return {
                statusCode: 200,
                body: JSON.stringify(rows),
            };
        } catch (e) {
            return { statusCode: 500, body: JSON.stringify({ "error": e.message }) }
        }
    }

    return {
        statusCode: 500,
        body: JSON.stringify({ "error": "Invalid data" })
    }
};
