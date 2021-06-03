const get_from_google = require("./get_from_google");
const parse_video = require("./parse_video");
const format = require('pg-format');
const send_to_db = require("./send_to_db");

module.exports = async function () {

    let pageToken = null;
    let videoList = [];

    do {
        let { nextPageToken, items } = await get_from_google(pageToken);
        pageToken = nextPageToken;
        videoList = [...videoList, ...items.map(item => parse_video(item))];
    } while (pageToken);

    const clientQuery = format(`INSERT INTO videos (published_at, title, description, thumbnail_url, video_id, public) VALUES %L RETURNING *`, videoList);
    await send_to_db(clientQuery);
    return videoList.length;

};
