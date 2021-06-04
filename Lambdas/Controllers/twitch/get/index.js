const get_access_token = require('./get_access_token');
const search_twitch = require('./search_twitch');

exports.handler = async (event) => {
    const { search } = event;

    if (search) {

        const { access_token } = await get_access_token();
        const searchResults = await search_twitch(access_token, search);

        return {
            statusCode: 200,
            body: JSON.stringify(searchResults),
        };
    }

    return {
        statusCode: 500,
        body: "No search terms"
    }
};
