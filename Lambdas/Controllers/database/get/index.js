
const seed_db = require("./seed_db")

exports.handler = async (event) => {

    const videos_imported = await seed_db();

    return {
        statusCode: 200,
        body: JSON.stringify({ videos_imported })

    };

};
