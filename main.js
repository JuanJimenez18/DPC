const {read_inputs_and_output_holds} = require('./read_inputs_and_output_async.js');

const {place_holds} = require('./place_holds')

const {call_sfinder_percent} = require('./call_sfinder_percent_async.js');

const {read_percents} = require('./read_percents_async.js');

const {convert_to_setup_congruent} = require('./convert_setup_congruent.js');

const {call_sfinder_setup_congruent} = require('./call_sfinder_setup_congruent_async.js');

const {read_congruent_setup} = require('./read_congruent_setup_async.js');

const { convert_cover_congruent} = require('./convert_cover_congruent.js');

const {sfinder_cover} = require('./call_sfinder_cover_sync.js');

const {read_cover} = require('./read_cover_sync.js');

const {append_fumens} = require('./append_fumens_sync.txt');


async function main() {
    let hold_dict;

    // Call the asynchronous read inputs and output holds and wait for it to complete
    try {
        hold_dict = await read_inputs_and_output_holds(); //return a dictionary containing a key held pieces and value of list of fumens
        console.log('Read inputs and output holds complete');
    } catch (error) {
        console.error('Error in calling read input and output holds', error);
    }


    //Make a function to iterate through every key in dict that's not no hold

    // for (const key in dict) {
    //     if(key === 'no') {
    //         continue; //skip this iteration of the for loop if this is a no hold key
    //     }
    //     for (let i = 0; i < dict[key].length ; i++) {
    //         dataArray.push(dict[key][i]); do stuff
    //     }
    // }

    // example fumen v115@ChRpg0BeglDeRpg0Q4AeglBtywh0R4hlBtwwzhQ4Je?AgH is index 13 in the hold Z key list
    // let fumen = 'v115@ChRpg0BeglDeRpg0Q4AeglBtywh0R4hlBtwwzhQ4Je?AgH';

    let hold_pieces = 'z' //Set to be the key value when iterating through the dict
    let fumen = hold_dict[hold_pieces][13];
    let hold_piece = 'z'

    console.log(fumen);

    // Call the function Place holds to generate the list of place holds fumens

    let place_holds_fumens = place_holds(fumen, hold_pieces);


    // Call sfinder percent to find the 100% setup fumen fields

    try {
        await call_sfinder_percent(place_holds_fumens);
        console.log("Call sfinder to find percents of hold fumens complete")

    } catch (error) {
        console.error('Error in calling sfinder percents', error);
    }

    // Call setup read percents to read the percent.txt files to find 100% fumen fields

    let setup_fumens_fields;

    try {
        setup_fumens_fields = await read_percents(place_holds_fumens);
        console.log("Read percents complete ")

    } catch (error) {
        console.error('Error in calling sfinder percents', error);
    }

    for (let i = 0; i < setup_fumens_fields.length; i++) {
        console.log(setup_fumens_fields[i]);
    }

    // Convert the 100% fumen fields to setup fields

    let setup_fumen_congruent = [];

    for (let i = 0; i < setup_fumens_fields.length; i++) {
        setup_fumen_congruent.push(convert_to_setup_congruent(setup_fumens_fields[i]));
    }

    console.log(setup_fumens_fields);

    for (let i = 0; i < setup_fumen_congruent.length; i++) {
        console.log(setup_fumen_congruent[i]);

        try {
            await call_sfinder_setup_congruent(setup_fumen_congruent[i], hold_piece);
            console.log("call sfinder setup congruent complete ")

        } catch (error) {
            console.error('Error in calling sfinder setup congruent', error);
        }

        // Call read congruents setup to read the html to find congruent fields

        let congruent_setups;

        try {
            congruent_setups = await read_congruent_setup();
            console.log("read congruent setup complete ")

        } catch (error) {
            console.error('Error in read congruent setup', error);
        }

        console.log(congruent_setups)

        // Convert the fumen of congruent setups in a list of glued fumens to apply cover to

        let cover_congruents = convert_cover_congruent(congruent_setups);

        for (let i = 0; i < cover_congruents.length; i++) {
            console.log(cover_congruents[i]);
        }

        // Call sfinder cover passing in the cover_congruents

        // turn call_sfinder_cover into an async function

        try {
            await sfinder_cover(cover_congruents, hold_piece);
            console.log("run cover congruent setup complete ")

        } catch (error) {
            console.error('Error in read congruent setup', error);
        }

        let result;

        try {
            result = await read_cover();


            for (let i = 0; i < result.length; i++) {
                console.log(result[i]);
            }
        } catch (error) {
            console.error(error.message);
        }

        try {
            await append_fumens(result);
            console.log("Appended fumens to hold_no_tsd.new.txt")

        } catch (error) {
            console.error('Error in appending fumens', error);
        }

    }

}



// Call the main function to start the process
main();