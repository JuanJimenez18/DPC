const {decoder, encoder} = require('tetris-fumen');

// // What we have
// field_array =  [4, 1, 1, 1, 1, 5, 7, 7, 6, 6, 4, 4, 2, 2, 5, 5, 5, 7, 7, 6, 0, 4, 2, 3, 3, 0, 0, 0, 0, 6, 0, 0, 2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//
// // Our goal
// field_array2 = [8, 8, 8, 8, 8, 1, 8, 8, 8, 8, 8, 8, 8, 8, 1, 1, 1, 8, 8, 8, 3, 8, 8, 8, 8, 3, 3, 3, 3, 8, 3, 3, 8, 8, 8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//
// // Goals convert all nonempty and non T to garbage mino
//
// // Convert T to the I mino
//
// // Convert all other minos less than 60 to yellow

function convert_to_setup_holds (fumen) {
    let pages = decoder.decode(fumen);

    let field_array = pages[0]._field.field.pieces

    for (let i = 0; i < 60; i++) { //Look at all the minos under a height of 6
        let mino = field_array[i];
        if (mino !== 0 && mino !== 5) { // Convert all  convert all nonempty and non T to garbage mino
            field_array[i] = 8 // Garbage mino
        } else if (mino === 5) { // If the mino is equal to the T mino
            field_array[i] = 1 //Set the mino to the i mino
        } else {
            field_array[i] = 3; //Set all other minos to yellow
        }
    }

    return encoder.encode(pages)
}

module.exports = {convert_to_setup_holds};

// let fumen = "v115@ChQ4DeglDeR4CeglBtywQ4i0hlBtwwzhg0JeAgH"
//
// console.log(convert_to_setup_field(fumen));

// function areArraysEqual(arr1, arr2) {
//     if (arr1.length !== arr2.length) {
//         return false;
//     }
//
//     for (let i = 0; i < arr1.length; i++) {
//         if (arr1[i] !== arr2[i]) {
//             console.log(i)
//             return false;
//         }
//     }
//
//     return true;
// }
//
// const array1 = field_array;
// const array2 = field_array2
//
// console.log(areArraysEqual(array1, array2)); // true
