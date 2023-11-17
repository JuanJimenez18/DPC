const fs = require('fs').promises;

async function append_fumens(filePath, dataToAppend) {
    try {
        // Join the array elements with newline characters
        const formattedData = dataToAppend.join('\n');

        // Append the formatted data to the file
        await fs.appendFile(filePath, formattedData + '\n');

        // console.log('Data has been appended to the file.');
    } catch (err) {
        console.error('Error appending to file:', err);
    }
}

// Call the function to append data to the file
// appendToFile();

module.exports = {append_fumens};