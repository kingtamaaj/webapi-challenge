const express = require('express');
const router = express.Router();
const dbProject = require('./data/helpers/projectModel');



// GET all projects
router.get('/', (req, res) => {
	dbProject.get()
		.then(projects => {
			res.json(projects);
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: "No projects here, sorry!" })
		})
});


// GET each project
router.get('/:id', (req, res) => {
	const { id } = req.params;
	dbProject
		.get(id)
		.then(project => {
			if(project.id) {
				res.json(project)
			}
			else {
				res.status(404)
					.json({ message: "No project with this id had been found." })
			}
		})
		.catch(err => {
			res
				.status(500)
				.json({ message: "No projects here, sorry!" })
		})
});


// GET project actions
router.get('/:id/actions', (req, res) => {
	const { id } = req.params;
	dbProject
		.getProjectActions(id)
		.then(action => {
			if (action.length) {
				res.json(action);
			}
			else {
				res.status(404)
					.json({ message: "No project with this id had been found." })
			}
		})
		.catch(err => {
			res
				.status(500)
				.json({ message: "No projects here, sorry!" })
		})
});


// POST
router.post('/', (req, res) => {
	const { name, description } = req.body;
	const newProjectCreated = { name, description };
	if(!name || !description) {
		res.status(400)
			.json({ message: "Project name & description not found." })
	}
	else {
		dbProject
			.insert(newProjectCreated)
			.then(post => res.json(post))
			.catch(err => 
				res
					.status(500)
					.json({ error: "No projects here, sorry!" })
			);
	}
});


// PUT
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const newProjectCreated = req.body;
	dbProject
		.update(id, newProjectCreated)
		.then(project => {
			if(project) { 
				res.json(project) 
			}
			else {
				res
					.status(404)
					.json({ error: "No project with this id had been found." })
			}
		})
		.catch(err =>
			res
				.status(500)
				.json({ error: "No projects here, sorry!" })
		);
});


// DELETE
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	dbProject
		.remove(id)
		.then(count => {
			if(count) {
				res.json({ message: "This project was successfully deleted" })
			}
			else {
				res
					.status(404)
					.json({ error: "No project with this id had been found." })
			}
		})
		.catch(err =>
			res
				.status(500)
				.json({ error: "No projects here, sorry!" })
		);
});

module.exports = router; 