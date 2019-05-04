const fs = require('fs');
const chalk = require('chalk')
// file to store notes as json
const notesFile = 'notes.json';

//adds notes
const addNote = (title, body, dueDate) => {
    const notes = loadNotes();
    if (!notes.find(n => n.title === title)) {
        notes.push({
            title: title,
            body: body,
            dueDate: dueDate
        });
        saveNotes(notes);
        console.log('Added notes');
    } else {
        console.log('Sorry. A notes with same title exists');
    }
}

//Remove notes
const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(n => n.title !== title);
    if (notesToKeep.length == notes.length) {
        console.log(chalk.red("No notes with the title exists"));
    } else {
        saveNotes(notesToKeep);
        console.log(chalk.green("Notes removed"));
    }
}

// Returns array of notes
const loadNotes = () => {
    //use javascript's exception handling technique to return empty array when the required file does not exits
    try {
        const notesBuffer = fs.readFileSync(notesFile);
        return JSON.parse(notesBuffer.toString());
    } catch (e) {
        return [];
    }
}

// Saves notes into file
const saveNotes = (notes) => {
    fs.writeFileSync(notesFile, JSON.stringify(notes));
}

const listNotes = () => {
    const notes = loadNotes();
    notes.forEach(n => {
        console.log(chalk.inverse.green(n.title));
    })
}

const readNote = (title) => {
    const note = loadNotes().find(n => n.title === title)
    if (note) {
        console.log(chalk.inverse.green(title))
        console.log(`${note.body} - ${note.dueDate}`)
    } else {
        console.log(chalk.inverse.red('No note found with the given title!'))
    }
}

// Export multiple functions as an object
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}