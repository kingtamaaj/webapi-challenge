const express = require('express');
const router = express.Router();
const dbAction = require('./data/helpers/actionModel');


// GET all actions
router.get('/', (req, res) => {
	dbAction
		.get()
		.then(projects => {
			res.json(projects);
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: "ERROR!" })
		});
});


// GET one action
router.get('/:id', (req, res) => {
	const { id } = req.params;
	dbAction
		.get(id)
		.then(action => {
			if(action) {
				res.json(action)
			}
			else {
				res.status(404)
					.json({ message: "Not right now try again!" })
			}
		})
		.catch(err => {
			res
				.status(500)
				.json({ message: "ERROR!" })
		})
});


// POST
router.post('/', (req, res) => {
	const { project_id, description, notes } = req.body;
	const newActionCreated = { project_id, description, notes };
	if(!project_id || !description ||!notes) {
		res.status(400)
			.json({ message: "All project information is missing." })
	}
	else {
		dbAction
			.insert(newActionCreated)
			.then(post => res.json(post))
			.catch(err => 
				res
					.status(500)
					.json({ error: "ERROR!" })
			);
	}
});


// PUT
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const newActionCreated = req.body;
	dbAction
		.update(id, newActionCreated)
		.then(project => {
			if(project) { 
				res.json(project) 
			}
			else {
				res
					.status(404)
					.json({ error: "Not right now try again!" })
			}
		})
		.catch(err =>
			res
				.status(500)
				.json({ error: "ERROR!" })
		);
});


// DELETE
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	dbAction
		.remove(id)
		.then(count => {
			if(count) {
				res.json({ message: "Action deleted successfully!" })
			}
			else {
				res
					.status(404)
					.json({ error: "Not right now try again!" })
			}
		})
		.catch(err =>
			res
				.status(500)
				.json({ error: "ERROR!" })
		);
});

module.exports = router; 