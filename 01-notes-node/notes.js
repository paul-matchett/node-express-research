const fs = require('fs');

var fetchNotes = () => {
    try {
        let noteString = fs.readFileSync('notes-list.json');
        return JSON.parse(noteString);
    } catch(e) {
        console.log('No File Exists');
        return [];
    }
}

var saveNotes = (notes) => {
    fs.writeFileSync('notes-list.json', JSON.stringify(notes));
}

var addNote = (title, body) => {

    let notes = fetchNotes();
    let note = {
        title,
        body
    }
    
    let duplicateNotes = notes.filter((note) => note.title === title);
    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    } else {
        return undefined;
    }
}

var getAllNotes = () => {
    let notes = fetchNotes();
    return notes;
    console.log('Get all notes :', );
}

var getNote = (title) => {
    let notes = fetchNotes()
    let selectedNote = notes.filter((note) => note.title === title);
    return selectedNote[0];
}

var removeNote = (title) => {
    let notes = fetchNotes(); 
    let updatedNotes = notes.filter((note) => note.title !== title);
    saveNotes(updatedNotes);
    return updatedNotes.length !== notes.length;
}

module.exports = {
    addNote,
    getAllNotes,
    getNote,
    removeNote
};