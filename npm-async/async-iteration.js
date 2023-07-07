const async = require('async');
const fetch = require('node-fetch');

const testArray = [1, 2, 3, 4, 5];
const responses = [];

async.forEachLimit(testArray, 2, (value, index, callback) => {
    setTimeout(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/'+value).then(res => res.json()).then(json => {
            responses[index] = json;
            callback(null);
        }).catch(err => {
            callback(err)
        })
    }, 1000 * index)
}).then(() => console.log(response)).catch(err => console.log(err))