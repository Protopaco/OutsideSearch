exports.handler = async (event) => {
    const { game, video } = event;
    let response = { "error": "error with query params" };

    if (game) {
        const SQLCommand = `
        SELECT
        videos.*,
        (SELECT json_agg(json_build_object(
            'id', games.id,
            'name', games.name,
            'img_url', games.img_url,
            'info_url', games.info_url,
            'igdb_id', games.igdb_id
            ))
            FROM videos 
            JOIN videos_games ON videos_games.video_id = videos.id
            JOIN games ON videos_games.game_id = games.id)
        FROM games
        LEFT JOIN videos_games
        ON videos_games.game_id = games.id
        LEFT JOIN videos
        ON videos.id = video_id
        WHERE games.name ILIKE '%${game}%'
        GROUP BY videos.id, games.name
        AND public = true`;

        response = await db_client(SQLCommand);

    } else if (video) {
        const SQLCommand = `
        SELECT
        videos.*,
        (SELECT json_agg(json_build_object(
            'id', games.id,
            'name', games.name,
            'img_url', games.img_url,
            'info_url', games.info_url,
            'igdb_id', games.igdb_id
            ))
            FROM videos 
             JOIN videos_games ON videos_games.video_id = videos.id
            JOIN games ON videos_games.game_id = games.id)
        FROM videos
        WHERE description ILIKE '%w${video}%' OR title ILIKE '%w${video}%'
        GROUP BY videos.id
        ORDER BY videos.id
        AND public = true`;

        response = await db_client(SQLCommand);
    }

    return {
        statusCode: 200,
        body: response,
    };
};
