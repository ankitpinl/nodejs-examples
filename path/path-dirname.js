var path = require('path');
var completePath = '/foo/bar/bas.html';

console.log(path.dirname(completePath));
// /foo/bar

console.log(path.basename(completePath));
// bas.html

console.log(path.extname(completePath));
// .html

console.log(path.join('foo', '/bar', 'bas'));
//foo/bar/bas

console.log(path.normalize('/foo/bar..'));
//\foo\bar..

console.log(path.normalize('/foo//bar/bas/..'));
//\foo\bar