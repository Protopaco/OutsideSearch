const https = require("https");
const api_key = process.env.API_KEY;

module.exports = async function (nextPageToken = null) {

    const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLoid6oOAGqMfzoVAf11mlbr0FaFjKfoDj&maxResults=50&key=${api_key}${nextPageToken ? `&pageToken=${nextPageToken}` : ""}`;


    return await new Promise((resolve, reject) => {
        let dataString = '';
        const req = https.get(url, function (res) {
            res.on('data', chunk => {
                dataString += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(dataString), null, 4);
            });
        });

        req.on('error', (e) => {
            reject({
                statusCode: 500,
                body: 'Something went wrong!'
            });
        });
    });
};
