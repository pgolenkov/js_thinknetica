const key = 'sqnzbeuigvxtmhfpdcjyoakwlr';

const encoded_string = 'isnxbcj ibcfbj fe yib nfmpoybc cbaftoygfh gj s qffx ql jybabh tbal sqfoy isnxbc notyocb gy ksj poqtgjibz gh usczbh ngyl hbk lfcx ql hbccsk mshgvsgmb zfoqtbzsl tbal zbjncgqbj yib pbfptb yib msnighbj shz yib babhyj yisy zbeghbz yib isnxbc notyocb shz yib isnxbc byign ecfm yib bsctl msghecsmb isnxbcj sy mgy yf yib jbte mszb isczkscb isnxbcj shz usmb isnxbcj gmmbzgsybtl efttfkghu gj s qcgbe fabcagbk fe yib gjjobj shz gzbsj yisy scb qcfouiy efckscz ql jybabh tbalj qffx sj kbtt sj s mfcb zbysgtbz ghybcpcbysygfh fe bsni nispybc fe yib qffx mbhygfhghu jfmb fe yib pcghngpst niscsnybcj shz babhyj'

const keyCodeA = 'a'.charCodeAt(0);

let decoded_string = "";

for (let i = 0; i < encoded_string.length; i++) {
    let symbol = encoded_string[i];
    let index = key.indexOf(symbol);

    if (index > -1)
        decoded_string += String.fromCharCode(keyCodeA + index);
    else
        decoded_string += ' ';
}

console.log(decoded_string);
