const fs = require('fs').promises;
const {unglue} = require('./ungluer.js');

async function read_cover() {
    let filePath = 'output/covers/cover.txt';

    let result = [];

    try {
        // Read the file
        const fileContent = await fs.readFile(filePath, 'utf-8');

        let lines = fileContent.split('\n')

        let fumen_line = false;

        for (let i = 0; i < lines.length; i++) {
            let line_elements = lines[i].trim().split(" ");

            if (line_elements.length !== 0 && line_elements[0] === '>>>') {
                fumen_line = false;
            }

            if (line_elements.length !== 0 && line_elements[0] !== '0.00' && fumen_line) {
                let fumen = line_elements[line_elements.length - 1];
                fumen = fumen.substring(fumen.indexOf('?') + 1)
                result.push(fumen);
            }

            if (line_elements.length !== 0 && line_elements[0] === 'success:') {
                fumen_line = true;
            }
        }

    } catch (error) {
        console.error(`Error processing file ${filePath}: ${error.message}`);
    }

    return unglue(result);
}

module.exports = {read_cover};

// async function main() {
//     try {
//         const result = await read_cover();
//
//         for (let i = 0; i < result.length; i++) {
//             console.log(result[i]);
//         }
//     } catch (error) {
//         console.error(error.message);
//     }
// }

// main();
