// When we have to run multiple tasks which depend on the output of the previous task, series comes to our rescue.
const async = require('async');
const axios = require('axios');


async.series([
    async function (callback) {
        const { data } = await axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/todos/1'
        });
        return data;
    },
    async function (callback) {
        const { data } = await axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/todos/2'
        });
        return data;
    },
    async function (callback) {
        const { data } = await axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/todos/3'
        });
        return data;
    }
], function (err, results) {
    console.log(results);
});

async.series({
    1: function (callback) {
        setTimeout(async function () {
            const { data } = await axios({
                method: 'get',
                url: 'https://jsonplaceholder.typicode.com/todos/1'
            });
            console.log(data);
            callback(null, data);
        }, 200);
    },
    2: function (callback) {
        setTimeout(async function () {
            const { data } = await axios({
                method: 'get',
                url: 'https://jsonplaceholder.typicode.com/todos/2'
            });
            console.log(data);
            callback(null, data);
        }, 200);
    },
    3: function (callback) {
        setTimeout(async function () {
            const { data } = await axios({
                method: 'get',
                url: 'https://jsonplaceholder.typicode.com/todos/3'
            });
            console.log(data);
            callback(null, data);
        }, 200);
    }
}, function (err, results) {
    console.log(results);
});