const db_client = require('./db_client');

exports.handler = async (event) => {
    const { name, img_url, info_url, video_id, igdb_id } = event;

    if (name && img_url && info_url && video_id && igdb_id) {
        let game_info;
        try {
            const findGameSQL = `SELECT * FROM games where igdb_id = ${igdb_id}`;
            const findResponse = await db_client(findGameSQL);

            if (findResponse.rows.length === 0) {
                const insertGameSQL = `INSERT INTO games (name, img_url, info_url, igdb_id) VALUES ('${name}', '${img_url}', '${info_url}', ${igdb_id}) RETURNING *`;
                const insertResponse = await db_client(insertGameSQL);

                game_info = insertResponse.rows[0];
            } else {
                game_info = findResponse.rows[0];
            }


            const insertJoinSQL = `INSERT INTO videos_games (video_id, game_id) VALUES(${video_id}, ${game_info.id}) RETURNING *`;
            await db_client(insertJoinSQL);

            return {
                statusCode: 200,
                body: JSON.stringify(game_info),
            };
        } catch (e) {
            return { statusCode: 500, body: JSON.stringify({ "error": e.message }) };
        }
    }

    return {
        statusCode: 500,
        body: JSON.stringify(event)
    };
};
