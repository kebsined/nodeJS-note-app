const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
	const notes = await getNotes();
	const note = {
		title,
		id: Date.now().toString(),
	};
	notes.push(note);
	await saveNotes(notes);
	console.log(chalk.bgGreen('Note was added successfully'));
}

async function getNotes() {
	const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
	const notes = await getNotes();
	console.log(chalk.inverse.yellow('Here is the notes list'));
	notes.forEach(note => {
		console.log(chalk.red(note.id, note.title));
	});
}

async function saveNotes(list) {
	await fs.writeFile(notesPath, JSON.stringify(list));
}

async function removeNoteById(id) {
	const notes = await getNotes();
	const updatedNotes = notes.reduce((acc, note) => {
		if (note.id !== id) {
			acc.push(note);
		}
		return acc;
	}, []);
	await saveNotes(updatedNotes);
	console.log(chalk.inverse.cyanBright('Note was removed successfully'));
}

module.exports = {
	addNote,
	printNotes,
	removeNoteById,
};
