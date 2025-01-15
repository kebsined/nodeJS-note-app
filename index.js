const yargs = require('yargs');
const pgk = require('./package.json');
const { addNote, printNotes, removeNoteById } = require('./notes-controller');

yargs.version(pgk.version);

yargs.command({
	command: 'add',
	describe: 'add new note to list',
	builder: {
		title: {
			type: 'string',
			describe: 'The note title',
			demandOption: true,
		},
	},
	handler({ title }) {
		addNote(title);
	},
});

yargs.command({
	command: 'list',
	describe: 'Print all notes',
	async handler() {
		await printNotes();
	},
});

yargs.command({
	command: 'remove',
	describe: 'Remove note by id',
	builder: {
		id: {
			type: 'string',
			describe: 'The note id',
			demandOption: true,
		},
	},
	handler({ id }) {
		removeNoteById(id);
	},
});

yargs.parse();
