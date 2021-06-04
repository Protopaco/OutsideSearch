const get_access_token = require('./get_access_token');
const search_twitch = require('./search_twitch');

exports.handler = async (event) => {
    const { search } = event;

    if (search) {

        const { access_token } = await get_access_token();
        const searchResults = await search_twitch(access_token, search);
        const parsedSearchResults = searchResults.map(({ id, cover, name, url }) => { return { igdb_id: id, cover, name, info_url: url } })

        return {
            statusCode: 200,
            body: JSON.stringify(parsedSearchResults),
        };
    }

    return {
        statusCode: 500,
        body: "No search terms"
    }
};
