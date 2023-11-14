const { decoder, encoder, Mino} = require('tetris-fumen');

function verify_hold (fumen) {
    let pages = decoder.decode(fumen);

    let possible_field = true;

    let field_array = pages[0]._field.field.pieces

    for (let i = 60; i < 70; i++) { //Look at all the minos under a height of 7
        let mino = field_array[i];
        if (mino !== 0) { //If there exist a nonempty mino over the height 6 remove it
            possible_field = false;
        }
    }

    return possible_field;
}

function generate(base_field, hold_piece) {
    let results = new Set();

    for (let col = 0; col < 10; col++) {
        for (let row = 0; row < 6; row++) {
            for (let rotation_state of ['spawn', 'right', 'reverse', 'left']) {
                let mino = new Mino(hold_piece, rotation_state, col, row);
                if (mino.isValid()) {
                    let field = base_field.copy();
                    if (field.canLock(mino)) {
                        field.put(mino);
                        // field = grey_out(field);
                        if (verify_hold(encoder.encode([{field: field}]))) {
                            results.add(encoder.encode([{field: field}]))
                        }
                    }
                }

            }
        }
    }

    return Array.from(results);


}

let base_fumen = "v115@ChQ4DeglDeR4CeglBtywQ4i0hlBtwwzhg0JeAgH"
let hold_piece = "z"


let results = generate(decoder.decode(base_fumen)[0].field, hold_piece);

// console.log(results);

for (let result of results) {
    console.log(result);
}

