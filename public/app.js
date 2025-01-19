document.addEventListener('click', event => {
	if (event.target.dataset.type === 'remove') {
		const id = event.target.dataset.id;
		remove(id).then(() => {
			event.target.closest('li').remove();
		});
	}
});
async function remove(id) {
	await fetch(`/${id}`, { method: 'DELETE' });
}

document.addEventListener('click', event => {
	if (event.target.dataset.type === 'edit') {
		const id = event.target.dataset.id;
		console.log('this note will be edited', id);
		let newTitle = prompt('Enter new title:');
		if (!newTitle || newTitle === '') {
			return;
		}
		alert(`New title is ${newTitle}!!!`);
		editNote(id, newTitle)
			.then(() => {
				event.target.closest('li').querySelector('span').innerText = newTitle;
			})
			.then(() => (window.location = window.location.href));
	}
});

async function editNote(id, newTitle) {
	await fetch(`/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			title: newTitle,
			id,
		}),
	});
}
