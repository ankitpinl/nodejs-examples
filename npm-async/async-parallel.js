// When we have to run multiple tasks independent of each other without waiting until the previous task has completed, parallel comes into the picture.
const async = require('async');
const axios = require('axios');

async.parallel([
    function (callback) {
        setTimeout(async function () {
            const { data } = await axios({
                method: 'get',
                url: 'https://jsonplaceholder.typicode.com/todos/1'
            });
            callback(null, data);
        }, 100)
    },
    function (callback) {
        setTimeout(async function () {
            const { data } = await axios({
                method: 'get',
                url: 'https://jsonplaceholder.typicode.com/todos/2'
            });
            callback(null, data);
        }, 100)
    }
], function (err, results) {
    console.log('err =>', err);
    console.log('results =>', results);
})


// an example using an object instead of an array
async.parallel({
    task1: function (callback) {
        setTimeout(async function () {
            const { data } = await axios({
                method: 'get',
                url: 'https://jsonplaceholder.typicode.com/todos/1'
            });
            callback(null, data);
        }, 200);
    },
    task2: function (callback) {
        setTimeout(async function () {
            const { data } = await axios({
                method: 'get',
                url: 'https://jsonplaceholder.typicode.com/todos/2'
            });
            callback(null, data);
        }, 200);
    }
}, function (err, results) {
    console.log(results);
});