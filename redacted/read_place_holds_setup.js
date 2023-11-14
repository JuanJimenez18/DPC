const fs = require('fs');
const { JSDOM } = require('jsdom');

function read_setup_holds () {
    // Read the HTML file
    const html = fs.readFileSync('output/setups/place_holds_setup.html', 'utf-8');

    // Parse the HTML using jsdom
    const dom = new JSDOM(html);

    // Select all links
    const link = dom.window.document.querySelector('a');

    // Get the href attribute of the first link
    const href = link.getAttribute('href');
    // console.log(href);

    return href;
}

// console.log(read_setup_holds());

module.exports = {read_setup_holds};