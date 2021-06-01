const fetch = require('node-fetch');

exports.handler = async (event) => {

    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => console.log(response.body))

    if (event.queryStringParameters && event.queryStringParameters.id) {
        console.log(event.queryStringParameters.id)

        const id = event.queryStringParameters.id;
        return { body: JSON.stringify({ id }) }
    }

    return getWorld();
};


const getWorld = () => {

    return {
        statusCode: 200,
        body: JSON.stringify({ "greeting": `Hello World!` })
    }
}