const fs =  require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

// const command = process.argv[2];

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}
const argv = yargs
                .command('add', 'Add a new note', {
                    title: titleOptions,
                    body: bodyOptions
                })
                .command('list', 'List all notes')
                .command('read', 'Read a note', {
                    title: titleOptions
                })
                .command('remove', 'Remove a note', {
                    title: titleOptions
                })
                .help()
                .argv;
const command = argv._[0];
let message = '';

var logNoteInfo = (note, description, message) => {
    console.log('___');
    console.log(`Command: ${description}`);
    console.log(`Note Title: ${note.title}`);
    console.log(`Note Body: ${note.body}`);
    console.log(`Response Message: ${message}`);
}

switch (command) {
    case 'add':  // node app.js add --title="add title here" --body="add body here"
        let addedNote = notes.addNote(argv.title, argv.body);
        message = addedNote === undefined ? 'Note already exists' : `New Note added - Title: ${addedNote.title}, Body: ${addedNote.body}`;
        logNoteInfo(argv, 'adding a new note', message);
    break;

    case 'list': // node app.js list
        let allNotes = notes.getAllNotes();
        console.log(`listing all ${allNotes.length} note(s)`);
        allNotes.forEach((note, index) => logNoteInfo(note, 'listing note', `List item ${index}`))
        break;

    case 'read': // node app.js read --title="add title here"
        let note = notes.getNote(argv.title);
        if(note === undefined){
            console.log(`Cannot find note ${argv.title}`);
        } else {
            message =  `${argv.title} selected. Body: ${note.body}`; 
            logNoteInfo(note, 'reading note', message);
        }
        break;

    case 'remove': // node app.js remove --title="add title here"
        console.log('removing a note');
        let noteDidDelete = notes.removeNote(argv.title);
        message = noteDidDelete ? `${argv.title} removed` : 'Cannot find note to delete'; 
        console.log('message:', message);
        break;

    default: 
        console.log('command not recognised');
        break;
}
