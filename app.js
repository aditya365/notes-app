const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes')

yargs.command({
    command: 'add',
    description: 'Adds notes to file',
    builder: {
        title: {
            description: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            description: 'Note Body',
            demandOption: true,
            type: 'string'
        },
        dueDate: {
            description: 'Notes due date',
            demandOption: true,
            type: 'date'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body, argv.dueDate);
    }
});
yargs.command({
    command: 'remove',
    description: 'Removes notes in a file',
    builder: {
        title: {
            description: 'title of notes to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
});
yargs.command({
    command: 'list',
    description: 'Lists notes to file',
    handler() {
        notes.listNotes();
    }
});
yargs.command({
    command: 'read',
    description: 'Reads notes to file',
    builder: {
        title: {
            description: 'title to read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
});

// Parses command args. Without this args won't by read from argv
// Should be after yargs commands
yargs.parse(); 
