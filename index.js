// const yargs = require('yargs');
// const pgk = require('./package.json');
// const { addNote, printNotes, removeNoteById } = require('./notes-controller');

// const { require } = require('yargs');

// yargs.version(pgk.version);

// yargs.command({
// 	command: 'add',
// 	describe: 'add new note to list',
// 	builder: {
// 		title: {
// 			type: 'string',
// 			describe: 'The note title',
// 			demandOption: true,
// 		},
// 	},
// 	handler({ title }) {
// 		addNote(title);
// 	},
// });

// yargs.command({
// 	command: 'list',
// 	describe: 'Print all notes',
// 	async handler() {
// 		await printNotes();
// 	},
// });

// yargs.command({
// 	command: 'remove',
// 	describe: 'Remove note by id',
// 	builder: {
// 		id: {
// 			type: 'string',
// 			describe: 'The note id',
// 			demandOption: true,
// 		},
// 	},
// 	handler({ id }) {
// 		removeNoteById(id);
// 	},
// });

// yargs.parse();

const express = require('express');
const chalk = require('chalk');
const path = require('path');
const {
	addNote,
	getNotes,
	removeNoteById,
	editNote,
} = require('./notes-controller');

const port = 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		// notes: [],
		created: false,
	});
});

app.post('/', async (req, res) => {
	await addNote(req.body.title);
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: true,
	});
});

app.put('/:id', async (req, res) => {
	await editNote(req.params.id, req.body.title);
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
	});
});

app.delete('/:id', async (req, res) => {
	await removeNoteById(req.params.id);
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
	});
});

app.listen(port, () => {
	console.log(chalk.inverse.yellow(`Server has been started on port ${port}`));
});
