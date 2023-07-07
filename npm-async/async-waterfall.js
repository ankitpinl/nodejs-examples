// When we have to run multiple tasks which depend on the output of the previous task, Waterfall can be helpful.

const async = require('async');
const axios = require('axios');

async.waterfall([
    async function () {

        const { data: data1 } = await axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/todos/1'
        });

        const { data: data2 } = await axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/todos/2'
        });

        return [data1, data2]
    },
    async function (combineData) {
        let getUserTitle = await combineData.map(item => {
            return {
                title: item.title
            }
        });

        return getUserTitle;
    },
    function (getTitles, callback) {
        console.log('getTitles =>', getTitles)
        let arg3 = getTitles[0].title+getTitles[1].title;

        callback(arg3)
       // return arg3
    }
], function (result) {
    // result now equals to 'Task1 and Task2 completed'
    console.log('result', result);
});

// Or, with named functions:
async.waterfall([
    myFirstFunction,
    mySecondFunction,
    myLastFunction,
], function (err, result) {
    // result now equals 'Task1 and Task2 completed'
    console.log(result);
});

function myFirstFunction(callback) {
    callback(null, 'Task 1', 'Task 2');
}
function mySecondFunction(arg1, arg2, callback) {
    // arg1 now equals 'Task 1' and arg2 now equals 'Task 2'
    let arg3 = arg1 + ' and ' + arg2;
    callback(null, arg3);
}
function myLastFunction(arg1, callback) {
    // arg1 now equals 'Task1 and Task2'
    arg1 += ' completed';
    callback(null, arg1);
}