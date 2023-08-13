const fs = require('fs');
const csvParser = require('csv-parser');
const inputFilePath = 'Sample-Spreadsheet-500000-rows.csv';

// first Example
const convertCSVtoJSON = (inputFilePath) => {
	return new Promise((resolve, reject) => {
		const jsonData = [];
		const readStream = fs.createReadStream(inputFilePath);

		readStream.pipe(csvParser()).on('data', (row) => {
			jsonData.push(row);
		}).on('end', () => {
			resolve(jsonData);
		}).on('error', (error) => {
			reject(error);
		});

	});
}

convertCSVtoJSON(inputFilePath).then(data => {
	console.log('data =>', data);
}).catch((error) => {
	console.error('Error converting CSV to JSON:', error.message);
});

// second Example
const jsonArray1 = [];
const outputFilePath = 'file.json';

fs.createReadStream(inputFilePath).pipe(csvParser()).on('data', (row) => {
	jsonArray1.push(row);
}).on('end', (data) => {
	// Write the jsonArray to the output file as JSON
	const writeStream = fs.createWriteStream(outputFilePath);
	writeStream.write(JSON.stringify(jsonArray1, null, 2));
	writeStream.end();

	writeStream.on('finish', () => {
		console.log('CSV converted to JSON successfully.');
	});

	writeStream.on('error', (err) => {
		console.error('Error writing JSON file:', err);
	});
});

// third example
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const parseCsvAsync = promisify(parseCsv);
const findValueInJsonAsync = promisify(findValueInJson);

async function parseCsv(filePath) {
    const jsonArray = [];

    const readStream = fs.createReadStream(filePath);
    readStream.on('error', (err) => {
        throw new Error('Error reading CSV file:', err);
    });

    await new Promise((resolve, reject) => {
        readStream
            .pipe(csvParser())
            .on('data', (row) => {
                jsonArray.push(row);
            })
            .on('end', () => {
                resolve();
            })
            .on('error', (err) => {
                reject(err);
            });
    });

    return jsonArray;
}

async function findValueInJson(jsonArray, key, value) {
    for (const item of jsonArray) {
        if (item[key] === value) {
            return item;
        }
    }
    return null;
}

(async () => {
    try {
        const jsonArray = await parseCsvAsync(inputFilePath);
        const keyToFind = 'name'; // Replace with the key you want to search for
        const valueToFind = 'John'; // Replace with the value you want to find

        const foundItem = await findValueInJsonAsync(jsonArray, keyToFind, valueToFind);
        console.log('Found Item:', foundItem);
    } catch (err) {
        console.error('Error:', err);
    }
})();

// fourth Example
async function parseCsv(filePath) {
	const jsonArray = [];
  
	const readStream = fs.createReadStream(filePath);
	readStream.on('error', (err) => {
	  throw new Error('Error reading CSV file:', err);
	});
  
	for await (const row of readStream.pipe(csvParser())) {
	  jsonArray.push(row);
	}
  
	return jsonArray;
  }
  
  async function findValueInJson(jsonArray, key, value) {
	for (const item of jsonArray) {
	  if (item[key] === value) {
		return item;
	  }
	}
	return null;
  }
  
  (async () => {
	try {
	  const jsonArray = await parseCsv(inputFilePath);
	  const keyToFind = 'name'; // Replace with the key you want to search for
	  const valueToFind = 'John'; // Replace with the value you want to find
  
	  const foundItem = await findValueInJson(jsonArray, keyToFind, valueToFind);
	  console.log('Found Item:', foundItem);
	} catch (err) {
	  console.error('Error:', err);
	}
  })();