var fs = require('fs');

// using unlink
fs.unlink('./test.txt', function (err) {
    if (err) {
        console.log('Error: ', err);
    } else {
        console.log('test.txt successfully deleted');
    }
});


// using unlinkSync
try {
    fs.unlinkSync('./test.txt');
    console.log('test.txt successfully deleted');
} catch (err) {
    console.log('Error:', err);
}