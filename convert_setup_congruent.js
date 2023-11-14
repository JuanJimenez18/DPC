const {decoder, encoder} = require('tetris-fumen');

function convert_to_setup_congruent (fumen) {
    let pages = decoder.decode(fumen);

    let field_array = pages[0]._field.field.pieces;

    for (let i = 0; i < 60; i++) {
            let mino = field_array[i];
            if (mino !== 0) { // Convert all convert all nonempty to i mino
                field_array[i] = 1 // Garbage mino
            }

    }

    return encoder.encode(pages)

}

// let fumen = "v115@/gC8CeR4AeD8BeR4E8ywH8wwD8JeAAPMAyno2AlsCS?ASY9tC"
//
// console.log(convert_to_setup_congruent(fumen));

module.exports = {convert_to_setup_congruent};