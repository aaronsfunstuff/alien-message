const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const alienAlphabet = 'ZYXWVUTSRQPONMLKJIHGFEDCBA'; 

function caesarCipher(message, shift) {
    shift = shift % 26;
    let encodedMessage = '';
    for (let i = 0; i < message.length; i++) {
        let char = message[i];
        if (alphabet.includes(char.toUpperCase())) {
            let index = alphabet.indexOf(char.toUpperCase());
            let newIndex = (index + shift + 26) % 26;
            encodedMessage += (char === char.toUpperCase()) ? alphabet[newIndex] : alphabet[newIndex].toLowerCase();
        } else {
            encodedMessage += char;
        }
    }
    return encodedMessage;
}

function vigenereCipher(message, key, decode = false) {
    key = key.toUpperCase();
    let keyIndex = 0;
    let encodedMessage = '';
    for (let i = 0; i < message.length; i++) {
        let char = message[i];
        if (alphabet.includes(char.toUpperCase())) {
            let index = alphabet.indexOf(char.toUpperCase());
            let shift = alphabet.indexOf(key[keyIndex]);
            let newIndex = decode
                ? (index - shift + 26) % 26
                : (index + shift) % 26;
            encodedMessage += (char === char.toUpperCase()) ? alphabet[newIndex] : alphabet[newIndex].toLowerCase();
            keyIndex = (keyIndex + 1) % key.length;
        } else {
            encodedMessage += char;
        }
    }
    return encodedMessage;
}

function encodeMessage(message, cipherType, key) {
    message = message.toUpperCase();
    let encodedMessage = '';

    switch (cipherType) {
        case 'reverse':
            for (let i = 0; i < message.length; i++) {
                let char = message[i];
                if (alphabet.includes(char)) {
                    let index = alphabet.indexOf(char);
                    encodedMessage += alienAlphabet[index];
                } else {
                    encodedMessage += char;
                }
            }
            break;
        case 'caesar':
            encodedMessage = caesarCipher(message, parseInt(key) || 0);
            break;
        case 'vigenere':
            encodedMessage = vigenereCipher(message, key || 'KEY', true);
            break;
        default:
            encodedMessage = message;
    }
    return encodedMessage;
}

function decodeMessage() {
    const inputText = document.getElementById('input-text').value;
    const cipherType = document.getElementById('cipher-type').value;
    const key = document.getElementById('key').value;
    const decodedMessage = encodeMessage(inputText, cipherType, key);
    document.getElementById('decoded-message').innerText = decodedMessage;
    document.getElementById('decoded-message').classList.add('fadeInText');


    setTimeout(() => {
        document.getElementById('decoded-message').classList.remove('fadeInText');
    }, 1000);
}
