const fs = require('fs');
const path = require('path');

const fileName = 'files/Get_Started_With_Smallpdf.pdf';


if (path.parse(fileName).ext !== null && path.parse(fileName).ext !== undefined && path.parse(fileName).ext !== '') {

    const name = path.parse(fileName).name;
    const ext = path.parse(fileName).ext;

    const file = fs.readFileSync(fileName);
    const str = file.toString("hex");

    //let newStr = str.replace("00", "FF");

    let buffer = Buffer.from(str, "hex");
    fs.writeFileSync(`copyfiles/${name}-copy${ext}`, buffer);

} else {
    console.log('file extension does not exist.')
}



