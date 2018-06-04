const fs = require('fs');

let originalNote = {
    title: 'Title One',
    body: 'Body for Title One'
}
let originalNoteString = JSON.stringify(originalNote);

fs.writeFileSync('notes.json', originalNoteString);

let noteString = fs.readFileSync('notes.json');
let note = JSON.parse(noteString);

console.log('note :', note);
