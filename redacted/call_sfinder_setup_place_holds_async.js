const { exec } = require("child_process");

function promisifyExec(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve({ stdout, stderr });
        });
    });
}

async function call_sfinder_setup_place_holds(fumen, temp_pieces) {
    try {
        let pattern = "T" + temp_pieces;
        let n_pieces = pattern.length;

        let command = `java -jar sfinder.jar setup --tetfu ${fumen} --patterns ${pattern} --fill i --margin o --n-pieces ${n_pieces} --output-base output/setups/place_holds_setup.html`;

        const { stdout, stderr } = await promisifyExec(command);

        // // You can handle the result here or return it
        // console.log(`stdout: ${stdout}`);
        // console.log(`stderr: ${stderr}`);

        // return { stdout, stderr };
    } catch (error) {
        // Handle errors here
        console.error(`Error: ${error.message}`);
        throw error; // Optionally rethrow the error
    }
}

// let fumen = "v115@pglpC8VpD8TpE8yhH8whD8JeAgH"
//
// let temp_pieces = 'S'; // Read from the file for what temp pieces
//
// call_sfinder_setup_place_holds(fumen, temp_pieces);

module.exports = {call_sfinder_setup_place_holds};
