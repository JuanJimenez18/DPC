const { exec } = require("child_process");

async function call_sfinder_setup_congruent(fumen, hold_piece) {
    return new Promise((resolve, reject) => {
        let pattern = hold_piece + "*p7";
        let command = `java -jar sfinder.jar setup --tetfu ${fumen} --patterns ${pattern} --fill i --output-base output/setups/congruent_setup.html`;

        console.log(command);
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(`Error: ${error.message}`));
                return;
            }
            if (stderr) {
                reject(new Error(`stderr: ${stderr}`));
                return;
            }
            resolve(stdout);
        });
    });
}

// Example usage:
let fumen = "v115@/gyhCexhAezhBeGiJeAAPMAyno2AlsCSASY9tC";
let temp_pieces = 'S'; // Read from the file for what temp pieces


// console.log("attempting to find congruents for this board state: " + fumen)
// call_sfinder_setup_congruent(fumen, temp_pieces)

    //
    // .then(result => console.log(`stdout: ${result}`))
    // .catch(error => console.error(error));

module.exports = {call_sfinder_setup_congruent};