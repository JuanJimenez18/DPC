const { decoder, encoder } = require('tetris-fumen');
const fs = require('fs').promises;  // Using fs.promises for Promise-based file operations

const {call_sfinder_setup_congruent} = require("./call_sfinder_setup_congruent_async");
const {read_congruent_setup} = require("./read_congruent_setup_async");
const {convert_cover_congruent} = require("./convert_cover_congruent");
const {sfinder_cover} = require("./call_sfinder_cover_sync");
const {read_cover} = require("./read_cover_sync");
const {convert_to_setup_congruent} = require("./convert_setup_congruent");
const {append_fumens} = require("./append_fumens_sync.txt");

// Used apply congruent to all no_hold tsd (found with another script)
async function main() {
    let filePath = 'input/my_no_hold_tsd.txt';
    let toFilePath = 'holds/my_no_hold_tsd_new.txt'
    let fumens = [];

    let hold_piece = 't'

    try {
        const data = await fs.readFile(filePath, 'utf8');

        const lines = data.split('\n');
        lines.forEach(line => {
            fumens.push(line.trim());
        });
    } catch (err) {
        console.error('Error reading or processing the file:', err);
    }

    let setup_fumen_congruent = [];

    for (let i = 0; i < fumens.length; i++) {
        setup_fumen_congruent.push(convert_to_setup_congruent(fumens[i]));
    }

    for (let i = 0; i < setup_fumen_congruent.length; i++) {
        // console.log(setup_fumen_congruent[i]);

        try {
            await call_sfinder_setup_congruent(setup_fumen_congruent[i], hold_piece);
            // console.log("call sfinder setup congruent complete " + i + "/" + setup_fumen_congruent.length)

        } catch (error) {
            console.error('Error in calling sfinder setup congruent', error);
        }

        // Call read congruents setup to read the html to find congruent fields

        let congruent_setups;

        try {
            congruent_setups = await read_congruent_setup();
            // console.log("read congruent setup complete ")

        } catch (error) {
            console.error('Error in read congruent setup', error);
        }

        // console.log(congruent_setups)

        // Convert the fumen of congruent setups in a list of glued fumens to apply cover to

        let cover_congruents = convert_cover_congruent(congruent_setups);

        // for (let i = 0; i < cover_congruents.length; i++) {
        //     console.log(cover_congruents[i]);
        // }

        // Call sfinder cover passing in the cover_congruents

        try {
            await sfinder_cover(cover_congruents, hold_piece);
            // console.log("run cover congruent setup complete ")

        } catch (error) {
            console.error('Error in read congruent setup', error);
        }

        let result;

        try {
            result = await read_cover();
        } catch (error) {
            console.error(error.message);
        }

        try {
            for (let i = 0; i < result.length; i++) {
                console.log("Appending to " + toFilePath + ": " + result[i]);
            }

            await append_fumens(toFilePath, result);

        } catch (error) {
            console.error('Error in appending fumens', error);
        }

    }
}

main()