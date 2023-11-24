const { spawn } = require('child_process');

function executeCommand(command) {
    return new Promise((resolve, reject) => {
        const process = spawn(command, { shell: true });

        let stdout = '';
        let stderr = '';

        process.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        process.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        process.on('close', (code) => {
            if (code === 0) {
                resolve({ stdout, stderr });
            } else {
                reject(new Error(`Command execution failed with code ${code}`));
            }
        });
    });
}

async function sfinder_cover(fumens, hold_piece) {
    try {
        const fumens_str = fumens.join(" ");
        // let temp_pieces = 'S'; // Read from the file for what temp pieces (Possible parameter for this call sfinder function)
        let pattern = hold_piece + "*p7";
        let command = "java -jar sfinder.jar cover --drop 180 --mode b2b --tetfu " + fumens_str + " --patterns " + pattern + " --log-path output/covers/cover.txt ";

        // console.log(command);
        const { stdout, stderr } = await executeCommand(command);

        if (stderr) {
            // console.error(`stderr: ${stderr}`);
            return;
        }

        // console.log(`stdout: ${stdout}`);
    } catch (error) {
        // console.error(`Error: ${error.message}`);
    }
}
//
// fumens = [
//     'v115@vhHmAJ8nB5oBFlBTpB3qB3rByxB',
//     'v115@vhHlAJTjB3kB8qBWtByuB3rBxxB',
//     'v115@vhHKFJzgBXjBcpB+tBlrB3sBRvB',
//     'v115@vhH8EJzgBXjBStB2uBlqB3rBxxB',
//     'v115@vhHTAJKmBXjBcpB+tBXqBlsBRwB',
//     'v115@vhHXAJ8lBXjBStBTpB2vBlrBxxB',
//     'v115@vhHTAJemBXjBcpBStBVvB3rBxxB',
//     'v115@vhH/FJamBTjBcpBWtBVvB3rBxxB',
//     'v115@vhHXAJKmBXjBcqB+tBTpBlsBRwB',
//     'v115@vhHTAJXjBcpB+tBVvBRrB3sBKrB',
//     'v115@vhHlAJXjBzkB8qBStB2uB3rBxxB',
//     'v115@vhHlAJ6oB8qBznBmpB3rB3pBxxB',
//     'v115@vhHTAJemB6oB1pB3rBUtB3sBxuB',
//     'v115@vhHTAJXjBcpBStBXqBlrBerBxxB',
//     'v115@vhHTDJcpBWtBXqBlrB/qBarBxxB',
//     'v115@vhHmAJ6oBcpBznBlqB3rBXqBxxB',
//     'v115@vhHmAJXjB1qBStBTpB3rBUqBxxB'
// ]
//
// // Call the async function
// runCoverCongruent(fumens);


module.exports = {sfinder_cover};