// In read_setup_congruent.js
const fs = require('fs').promises;
const { JSDOM } = require('jsdom');

async function read_congruent_setup() {
    let filePath = 'output/setups/congruent_setup.html';

    try {
        // Read the HTML file asynchronously
        const html = await fs.readFile(filePath, 'utf-8');

        // Parse the HTML using jsdom
        const dom = new JSDOM(html);

        // Select all links
        const link = dom.window.document.querySelector('a');

        // Get the href attribute of the first link
        const href = link.getAttribute('href');

        return href;
    } catch (error) {
        console.error(`Error reading setup file: ${error.message}`);
        throw error;
    }
}

module.exports = {read_congruent_setup };