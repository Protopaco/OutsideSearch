const db_client = require("./db_client");

exports.handler = async (event) => {
    const { id } = event;

    if (id) {
        const SQLCommand = `UPDATE videos SET public = true WHERE id = '${id}' RETURNING *`;

        const { rows } = await db_client(SQLCommand);

        return {
            statusCode: 200,
            body: JSON.stringify(rows)
        }
    }
    // TODO implement
    return {
        statusCode: 400,
        body: { "error": "Invalid Id" },
    };
};
