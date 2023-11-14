const { decoder, encoder } = require('tetris-fumen');
const gluer = require('./gluer.js');

function convert_cover_congruent(fumen) {
    // Substring to v155
    fumen = fumen.substring(fumen.indexOf('?') + 1);

    // console.log(fumen)

    let pages = decoder.decode(fumen);

    let fumens = [];
    for (let i = 0; i < pages.length; i++) {
        fumens.push(encoder.encode([pages[i]]));
    }

    return gluer.glue(fumens);
}

module.exports = {convert_cover_congruent};

// let fumen =
//     "http://fumen.zui.jp/?v115@/gi0CeAtwhAeywg0BeBtwhRpwwT4AtglwhRpT4ilwh?JeAgWRAS4IEBg3CwBgdjWCT3jPC0AAAA/gywCeRpAeR4wwA?tBeg0RpR4APhWR4g0glwwglxSQawhQ4whxSKeAAPRAROMVB?g3CwBgm3LCa9TWC0AAAA/gglRpCeR4AeAtglRpBeR4g0Btx?SAexwQ4AtQpAthHAPwSwwQ4whRpJeAAPRARuXOBg3CwBg8j?PCvujWCpAAAA/gAtRpCeR4AeBtRpBeR4glg0AtQphlR4glR?Lg0glAtglAtQ4whhHQLJeAAPRAR+oRBg3CwBgM8LCPtzPC0?AAAA/gRpglCeR4AeAtRpglBeR4g0BtQpAtQaglxwgWQaAtR?phWxhgWQaAtJeAAPRARYGLBg3CwBgs/wCMuaFDzAAAA/gR4?AtCeR4AeR4BtBeR4glSpwhQpxwglRLQpQaRpAtwwwhhHQLJ?eAAPRAR4REBg3CwBgM8LC6+ytCqAAAA/gRpg0CeR4AeAtRp?g0BeR4glBtgWQaglR4glRLAthWwhQpQ4whhHQaJeAAPRAR4?REBg3CwBgM8LCzvaFD0AAAA/gQ4hlCeRpAeAtR4glBeg0Rp?BtglAtAPR4g0RaAtwhhlwhQ4whhHQaJeAAPQA5CyAAlsKBA?vPltCsHUxC/gR4glCeR4AeR4AtglBeR4g0RpwSglAeglxwg?lRpQawSgHQaxhQaRpJeAAPQA55xAAlsKBAz/VWCJnLuC/gR?pglCeR4AeAtRpglBeR4g0BtgWgHQaxhQ4AeQaAthWwhAegl?Q4AeQaKeAAPQA2ikAAlsKBATt/VCJnjxC/gywCeR4AeRpww?AtBeR4glg0QpAewhglR4glRLg0glQpwhwwQ4whhHQLJeAAP?QA25xAAlsKBAzSNFDTn/wC/gywCehlAeR4wwAtBeRpglh0w?hRaR4QpAPQLQ4AtQpQaQpQ4whhHQaJeAAPQAWYkAAlsKBAv?SNFDTt/wC/gRpg0CehlAewwRpg0BeR4glxwAexhR4AtglAe?whhHAPQpR4AtwhglJeAAPQA1ctAAlsKBAaNstCKX9wC/gRp?g0CeR4AeAtRpg0BeR4glDtQaxwglBeAtglAtQpAewwwhhHQ?aJeAAPQASekAAlsKBAzSNPCUnLuC/gQ4hlCeRpAeAtR4glB?eg0RpDtQaxwg0RaAtQpBtAPwwwhhHQaJeAAPQASekAAlsKB?AvP9VC0H8tC/gi0CehlAeAtR4g0BeRpglBtgWRpR4QpAeQa?AtQpAegWwwQ4whQLhWJeAAPQAxfkAAlsKBAvSltCat/wC/g?i0CeR4AeBtwwg0BeR4glRpSaR4glBeQpQaxSwhQ4whhWQaJ?eAAPQARbkAAlsKBAzSltCv3/wC";
//
//
// console.log(convert_cover_congruent(fumen));