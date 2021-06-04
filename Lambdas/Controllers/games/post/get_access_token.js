const https = require("https");

module.exports = () => {
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;

    const url = `https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`;

    const options = {
        "method": "POST",
        timeout: 1000
    }

    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            if (res.statusCode < 200 || res.statusCode > 299) {
                return reject(new Error(`HTTP status code ${res.statusCode}`))
            }

            const body = []
            res.on('data', (chunk) => body.push(chunk))
            res.on('end', () => {
                const resString = Buffer.concat(body).toString()
                resolve(JSON.parse(resString))
            })
        })

        req.on('error', (err) => {
            reject(err)
        })

        req.on('timeout', () => {
            req.destroy()
            reject(new Error('Request time out'))
        })

        req.end()
    })
}
