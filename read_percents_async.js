const { decoder, encoder } = require('tetris-fumen');
const fs = require('fs').promises;

async function read_percents(fumens) {
    let results = [];
    let page_indexes = [];
    let page = 0;

    fumens = fumens.substring(fumens.indexOf('?') + 1);
    let pages = decoder.decode(fumens);

    let filePaths = [];
    for (let i = 0; i < pages.length; i++) {
        filePaths.push('output/percents/' + i + '.txt');
    }

    for (const filePath of filePaths) {
        try {
            // Read the file
            const fileContent = await fs.readFile(filePath, 'utf-8');

            let lines = fileContent.split('\n');

            for (let i = 0; i < lines.length; i++) {
                if (lines[i].trim() === 'success = 100.00% (5040/5040)') {
                    page_indexes.push(page);
                }
            }

            page += 1;

        } catch (error) {
            console.error(`Error processing file ${filePath}: ${error.message}`);
        }
    }

    for (let i = 0; i < page_indexes.length; i++) {
        results.push(encoder.encode([pages[page_indexes[i]]]));
    }

    // console.log(results);

    return results;
}

// Example usage
// const pages_length = 14; // The number of text files to read
// const fumens = "http://fumen.zui.jp/?v115@rgR4GeR4IeC8FeD8DeE8ywH8wwD8JeAgWIASQTABhA?9tCpgQ4IeR4IeQ4xhA8FexhB8DeC8BewSxwD8DewwC8KeAA?A9gwDAeC8CeR4wDwhC8BeR4B8whBewSxwD8DewwC8KeAAAu?gR4GeR4FeC8FeD8DeC8BewSxwA8xhA8DewwA8xhKeAAA6gQ?4DeC8xDR4BeC8whwDBeQ4C8BewSxwD8DewwC8KeAAA0gR4G?eR4C8FeD8BewDAeC8BewSxwxhB8DewwB8whKeAAAtgR4GeR?4GeC8FexhB8DeA8xhBewSxwD8DewwC8KeAAAxgQ4IeR4BeB?8whwDCeQ4AeB8xhDeC8BewSxwD8DewwC8KeAAAsgR4GeR4H?eC8CewDBeD8CewDwhB8BewSxwB8whA8DewwC8KeAAAtgQ4I?eR4FeA8xhQ4EeA8xhA8DeC8BewSxwD8DewwC8KeAAPIARQT?ABhA9tC5gQ4EeB8whAeR4CeC8whwDAeQ4AeC8BewSgWwwD8?DewwC8KeAAA/gC8BeR4BeD8BeQ4AeC8BewSwwgWwhC8Deww?A8whA8KeAAA4gQ4FeC8R4DeD8AeQ4BeC8BewSxwxhB8Deww?xhA8KeAAA/gC8AeR4CeD8AeQ4BeC8BewShWD8DewwwhB8Ke?AAA";
// //
//
// read_percents(fumens);

module.exports = {read_percents};