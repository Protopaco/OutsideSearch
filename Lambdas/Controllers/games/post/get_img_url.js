const https = require("https");
const client_id = process.env.CLIENT_ID;

module.exports = (access_token, cover) => {

    const bodyString = `fields url, image_id; where id = ${cover};`
    const url = `https://api.igdb.com/v4/covers`;

    const options = {
        "method": "POST",
        timeout: 1000,
        headers: {
            "Client-ID": client_id,
            "Authorization": `Bearer ${access_token}`,
            "Accept": "application/json"
        }
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
        req.write(bodyString)
        req.end()
    })
}
