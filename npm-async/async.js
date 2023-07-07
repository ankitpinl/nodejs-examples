// https://medium.com/velotio-perspectives/understanding-node-js-async-flows-parallel-serial-waterfall-and-queues-6f9c4badbc17
const async = require('async');

async.parallel([
    async.reflect(async () => await Promise.resolve('Like')),
    async.reflect(async () => await Promise.resolve('Share')),
    async.reflect(async () => await Promise.reject('Dislike'))
]).then(response => {
    console.log('Response', response);
}).catch(err => console.log(err))