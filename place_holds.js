const { decoder, encoder, Mino} = require('tetris-fumen');

// Made by swng
function generate(base_field, hold_piece) {
    let results = new Set();

    for (let col = 0; col < 10; col++) {
        for (let row = 0; row < 6; row++) {
            for (let rotation_state of ['spawn', 'right', 'reverse', 'left']) {
                let mino = new Mino(hold_piece, rotation_state, col, row);
                if (mino.isValid()) {
                    let field = base_field.copy();
                    if (field.canLock(mino)) {
                        let positions = mino.positions();
                        good = true;
                        for (position of positions) {
                            if (position.y >= 6) good = false;
                        }
                        if (good) {
                            field.put(mino);
                            // field = grey_out(field);
                            results.add(encoder.encode([{
                                field: field
                            }]))
                        }
                    }
                }

            }
        }
    }

    return results;

}

// Made by swng
function generate_d2(base_field, piece_1, piece_2) {
    let results = new Set();
    let d1_results = generate(base_field, piece_1); // d1 set
    for (let d1_result_fumen of d1_results) { // each of these is a fumen
        let temp = generate(decoder.decode(d1_result_fumen)[0].field, piece_2); // a set
        // add all of these members of this set to the main big set
        results = new Set([...results, ...temp]);
    }
    return results;
}

// Made by jj
function place_holds (base_fumen, hold_pieces){

    let results = new Set();

    if(hold_pieces.length === 1) {
        results = generate(decoder.decode(base_fumen)[0].field, hold_pieces);
    }

    if(hold_pieces.length === 2) {
        let set1 = generate_d2(decoder.decode(base_fumen)[0].field, hold_pieces[0], hold_pieces[1]);
        let set2 = generate_d2(decoder.decode(base_fumen)[0].field, hold_pieces[1], hold_pieces[0]);

        results = new Set([...set1, ...set2]);

    }


    return Array.from(results);

}

// let base_fumen = 'v115@vhAAgH'
// let hold_pieces = "t"
//
// let results = place_holds(base_fumen, hold_pieces);

// console.log(results);
//
// console.log(results.length);
//
// for (let result of results) {
//     console.log(result);
// }

module.exports = {place_holds};


//
// console.log(hold_piece[0])
// console.log(hold_piece[1])

// let base_fumen = "v115@ChRpg0BeglDeRpg0Q4AeglBtywh0R4hlBtwwzhQ4Je?AgH"
// let hold_piece = "z"
//
//
// let results = generate(decoder.decode(base_fumen)[0].field, hold_piece);
//
// // console.log(results);
//
// for (let result of results) {
//     console.log(result);
// }
