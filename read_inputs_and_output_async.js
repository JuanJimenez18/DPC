const { decoder, encoder } = require('tetris-fumen');
const fs = require('fs').promises;  // Using fs.promises for Promise-based file operations
const {unglue} = require('./ungluer.js');

const read_inputs_and_output_holds = async () => {

    const filePath = 'input/inputFumens.txt';
    let pieces = 'zstlijzo';
    let fumens = [];
    let dict = {};

    try {
        const data = await fs.readFile(filePath, 'utf8');

        const lines = data.split('\n');
        lines.forEach(line => {
            fumens.push(line.trim());
        });

        for (let i = 0; i < fumens.length; i++) {
            let fumen = fumens[i];
            let page = decoder.decode(fumen);

            let temp_pieces = pieces;
            for (let i = 0; i < page.length; i++) {
                temp_pieces = temp_pieces.replace(page[i].operation.type.toLowerCase(), '');
            }

            if (temp_pieces.length !== 0) {
                check_sequence(dict, temp_pieces, fumens[i]);
            } else {
                check_sequence(dict, 'no', fumens[i]);
            }
        }

        convert_unglue(dict);

        let outputFilePath;

        for (const key in dict) {
            outputFilePath = 'holds/hold_' + key + '_tsd.txt';
            await write_hold(dict[key], outputFilePath);

        }
    } catch (err) {
        console.error('Error reading or processing the file:', err);
    }


    let outputFilePath = 'holds/holds_all_tsd.txt'
    let dataArray = [];

    for (const key in dict) {
        if(key === 'no') {
            continue; //skip this iteration of the for loop if this is a no hold key
        }
        for (let i = 0; i < dict[key].length ; i++) {
            dataArray.push(dict[key][i]);
        }
    }

    await write_hold(dataArray, outputFilePath);

    outputFilePath = 'holds/holds_no_tsd_new.txt'
    await write_hold([], outputFilePath);

    return dict;
};

const write_hold = async (dataArray, outputFilePath) => {
    try {
        await fs.writeFile(outputFilePath, dataArray.join('\n'));
        // console.log('All elements have been written to the file.');
    } catch (err) {
        console.error('Error writing to the file:', err);
    }
};

const check_sequence = (dict, key, value) => {
    let sort_key = key.split('').sort().join('');
    if (sort_key in dict) {
        dict[sort_key].push(value);
    } else {
        dict[sort_key] = [value];
    }
};

const convert_unglue = (dict) => {
    for (let key in dict) {
        dict[key] = unglue(dict[key]);
    }
};

// Call the main function to start the process
// read_inputs_and_output_holds();

module.exports = { read_inputs_and_output_holds };